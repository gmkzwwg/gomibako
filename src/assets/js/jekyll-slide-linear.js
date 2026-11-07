/*
 * simple-slide.js — single-file Markdown/Jekyll slide reader
 * API: window.simpleSlide.toggle('.post-content')
 * Views: original <-> slides. Slides open on the index page.
 * v1.3: use existing .post-meta as the sticky navigation host; no width measurement.
 * No dependencies; original DOM nodes are preserved, never serialized.
 */
(function (win, doc) {
  'use strict';
  if (!win || !doc) return;

  const DEFAULTS = {
    targetSelector: '.post-content',
    autoStart: true,
    indexPage: { headingText: "Here's Index" },
    indexLabel: 'index',
    previousLabel: '◂ prev',
    nextLabel: 'next ▸',
    viewOriginalLabel: 'View Original',
    fromBeginningLabel: 'From Beginning',
    navTop: 1,
    metaSelector: '.post-meta', // Reuse article metadata as the navigation host.
    menuMaxHeight: 1200, // v1.2: 320px; increased by 120%.
    titleScale: 1.8,
    headingPadding: [16, 24, 12, 24],
    bodyPadding: [0, 48, 0, 48],
    mobileBreakpoint: 768,
    animationMs: 260,
    animation: 'fade',
    styleId: 'simple-slide-style'
  };

  const options = Object.assign({}, DEFAULTS, win.SimpleSlideConfig || {});
  let active = false;
  let target = null;
  let originals = null; // DocumentFragment stores the *same* source nodes.
  let slideRoot = null;
  let nav = null;
  let slides = [];
  let currentPage = 0; // 0 = index; 1..N = content pages.
  let started = false;
  let metaHost = null;
  let metaOriginals = null; // Preserve real metadata nodes, including event listeners.
  let metaCreated = false;
  let menuButton = null;
  let menuPanel = null;

  const cssLength = value => (typeof value === 'number' ? value + 'px' : String(value));
  const safeLength = (value, fallback) => {
    const n = Number(value);
    return Number.isFinite(n) && n >= 0 ? n : fallback;
  };
  const cssPadding = values => (Array.isArray(values) && values.length === 4
    ? values.map(v => cssLength(v)).join(' ') : '0');

  function injectStyle() {
    if (doc.getElementById(options.styleId)) return;
    const style = doc.createElement('style');
    style.id = options.styleId;
    style.textContent = `
      .ssv-root { display:block; min-width:0; width:100%; box-sizing:border-box; }
      .ssv-root, .ssv-root * { box-sizing:border-box; }
      /* The existing metadata element supplies native width and horizontal
         positioning. Sticky preserves these bounds and pins during article scroll. */
      .post-meta.ssv-meta-host {
        display:block !important;
        position:sticky !important;
        top:${cssLength(options.navTop)} !important;
        z-index:9998 !important;
        min-width:0 !important;
        max-width:100% !important;
        box-sizing:border-box !important;
        overflow:visible !important;
        isolation:isolate;
      }
      .ssv-meta-host > .ssv-nav.ssv-nav {
        position:relative !important; top:auto !important; left:auto !important;
        right:auto !important; bottom:auto !important;
        width:100% !important; max-width:100% !important;
        display:grid !important; grid-template-columns:repeat(3,minmax(0,1fr)) !important;
        align-items:start; justify-items:stretch; z-index:9998; gap:0;
        box-sizing:border-box !important; margin:0 !important; padding:0 !important;
        min-width:0 !important; border:0 !important;
        background:transparent !important; transform:none !important;
        pointer-events:auto; color:var(--ssv-text, inherit);
        font-family:var(--ssv-font-family, inherit);
        font-weight:var(--ssv-font-weight, inherit);
        line-height:var(--ssv-line-height, normal);
      }
      .ssv-nav.ssv-nav > button {
        appearance:none !important; -webkit-appearance:none !important;
        display:block !important; position:static !important;
        width:100% !important; max-width:100% !important; min-width:0 !important;
        min-height:0 !important; flex:none !important;
        box-sizing:border-box !important; margin:0 !important; padding:7px 2px !important;
        border:0 !important; border-radius:0 !important;
        background:transparent !important; box-shadow:none !important;
        color:inherit !important; font:inherit !important;
        font-size:var(--ssv-nav-font-size, 14px) !important;
        line-height:1.25 !important; text-transform:none !important;
        letter-spacing:normal !important; white-space:nowrap !important;
        overflow:hidden !important; text-overflow:ellipsis !important;
        cursor:pointer; pointer-events:auto;
      }
      .ssv-nav-prev { text-align:left !important; }
      .ssv-nav-index { text-align:center !important; }
      .ssv-nav-next { text-align:right !important; }
      .ssv-index-actions > button {
        appearance:none !important; -webkit-appearance:none !important;
        display:inline-block !important; position:static !important;
        width:auto !important; min-width:0 !important; max-width:100% !important;
        margin:0 !important; padding:7px 5px !important;
        cursor:pointer; font:inherit !important; font-size:0.92em !important;
        line-height:1.2 !important; white-space:normal !important;
        color:inherit !important; background:transparent !important;
        border:0 !important; border-radius:0 !important; box-shadow:none !important;
      }
      .ssv-nav > button:hover, .ssv-index-actions button:hover { text-decoration:underline; }
      .ssv-nav > button:focus-visible, .ssv-index-actions button:focus-visible,
      .ssv-index-list a:focus-visible, .ssv-nav-menu button:focus-visible {
        outline:2px solid currentColor; outline-offset:-2px;
      }
      .ssv-nav-menu.ssv-nav-menu {
        display:block; position:absolute !important; left:50% !important; top:calc(100% + 6px) !important;
        right:auto !important; bottom:auto !important;
        transform:translateX(-50%) !important;
        width:min(360px,100%) !important; min-width:0 !important;
        max-width:100% !important; max-height:${safeLength(options.menuMaxHeight,704)}px !important;
        overflow-y:auto; overflow-x:hidden;
        background:var(--ssv-surface, #fff) !important;
        color:var(--ssv-text, #222) !important;
        border:1px solid var(--ssv-border-color, currentColor) !important;
        border-radius:var(--ssv-border-radius, 4px) !important;
        box-sizing:border-box !important;
        box-shadow:0 5px 16px rgba(0,0,0,.10);
        pointer-events:auto; padding:4px 0; z-index:1;
        font-size:var(--ssv-menu-font-size, 14px);
        font-family:var(--ssv-font-family, inherit);
      }
      .ssv-nav-menu[hidden] { display:none !important; }
      .ssv-nav-menu.ssv-nav-menu button {
        display:block !important; width:100% !important; min-width:0 !important;
        max-width:100% !important; box-sizing:border-box !important;
        appearance:none !important; -webkit-appearance:none !important;
        border:0 !important; border-radius:0 !important;
        margin:0 !important; padding:9px 12px !important;
        text-align:left !important; background:transparent !important;
        color:inherit !important; font:inherit !important; line-height:1.3 !important;
        white-space:normal !important; overflow-wrap:anywhere;
        text-transform:none !important; cursor:pointer;
      }
      .ssv-nav-menu.ssv-nav-menu button:hover,
      .ssv-nav-menu.ssv-nav-menu button[aria-current="page"] {
        background:var(--ssv-hover-color, rgba(127,127,127,.12)) !important;
      }
      .ssv-viewport { width:100%; min-width:0; padding-top:52px; }
      .ssv-heading {
        text-align:center; font-weight:700; line-height:1.25;
        font-size:calc(1em * ${Number(options.titleScale) || 1.8});
        padding:${cssPadding(options.headingPadding)};
        margin:0 0 0.8em; max-width:100%;
      }
      .ssv-body { width:100%; min-width:0; padding:${cssPadding(options.bodyPadding)}; }
      .ssv-index-list { display:flex; flex-direction:column; margin:0; padding:0; list-style:none; gap:0; }
      .ssv-index-list li { list-style:none; margin:0; padding:0; }
      .ssv-index-list a { display:block; padding:9px 12px; text-decoration:none; color:inherit; }
      .ssv-index-list a:hover { background:rgba(127,127,127,0.1); text-decoration:underline; }
      .ssv-index-number { display:inline-block; min-width:2.8em; font-weight:700; }
      .ssv-index-actions { display:flex; justify-content:center; flex-wrap:wrap; gap:12px; margin:12px 0 24px; }
      @keyframes ssvFade { from {opacity:0} to {opacity:1} }
      .ssv-fade { animation:ssvFade ${safeLength(options.animationMs,260)}ms ease both; }
      @media (max-width:${safeLength(options.mobileBreakpoint,768)}px) {
        .ssv-heading, .ssv-body { padding:0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .ssv-fade { animation:none !important; }
      }`;
    (doc.head || doc.documentElement).appendChild(style);
  }

  function resolveTarget(input) {
    if (input && input.nodeType === 1) return input;
    if (typeof input === 'string') {
      try { return doc.querySelector(input); } catch (_) { return null; }
    }
    if (target && target.isConnected) return target;
    try { return doc.querySelector(options.targetSelector); } catch (_) { return null; }
  }

  function headingEligible(el) {
    // Section headings in a quotation, table, or code example are not slide boundaries.
    return !el.closest('blockquote, table, pre, code, [data-simple-slide-ignore]');
  }

  function parseSlides(fragment) {
    const headings = Array.from(fragment.querySelectorAll('h1,h2,h3,h4,h5,h6'))
      .filter(headingEligible);
    const minLevel = headings.length
      ? Math.min(...headings.map(h => Number(h.tagName.slice(1)))) : null;
    const boundaries = minLevel
      ? headings.filter(h => Number(h.tagName.slice(1)) === minLevel) : [];

    if (!boundaries.length) {
      const range = doc.createRange();
      range.selectNodeContents(fragment);
      const template = range.cloneContents();
      range.detach?.();
      return [{ title: 'Page 1', template, hasHeading: false }];
    }

    // Ranges handle nested headings without flattening/losing surrounding markup.
    // By design, everything preceding the first section heading is excluded.
    return boundaries.map((heading, index) => {
      const range = doc.createRange();
      range.setStartBefore(heading);
      if (index + 1 < boundaries.length) range.setEndBefore(boundaries[index + 1]);
      else range.setEnd(fragment, fragment.childNodes.length);
      const template = range.cloneContents();
      range.detach?.();
      return {
        title: heading.textContent.trim() || `Page ${index + 1}`,
        template,
        hasHeading: true,
        headingLevel: minLevel
      };
    });
  }

  function emit(name, container) {
    doc.dispatchEvent(new win.CustomEvent(name, {
      detail: { container, source: 'simple-slide' }
    }));
  }

  function createButton(text, className, handler, ariaLabel) {
    const button = doc.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.className = className;
    if (ariaLabel) button.setAttribute('aria-label', ariaLabel);
    button.addEventListener('click', handler);
    return button;
  }

  // Reuse the site's already-correct post-meta box instead of deriving
  // its dimensions from nested article/content containers.
  function findMetaHost(content) {
    const article = content.closest('article') || content.parentElement;
    if (!article) return null;
    let candidates;
    try { candidates = article.querySelectorAll(options.metaSelector || '.post-meta'); }
    catch (_) { candidates = article.querySelectorAll('.post-meta'); }
    return Array.from(candidates).find(node => !content.contains(node)) || null;
  }

  function mountNav(content, controls) {
    const found = findMetaHost(content);
    let host = found;
    let created = false;
    if (!host) {
      host = doc.createElement('aside');
      host.className = 'post-meta';
      host.setAttribute('aria-label', 'Slide navigation');
      content.parentNode.insertBefore(host, content);
      created = true;
    }
    const contents = doc.createDocumentFragment();
    while (host.firstChild) contents.appendChild(host.firstChild);
    host.classList.add('ssv-meta-host');
    host.appendChild(controls);
    return { host, contents, created };
  }

  function restoreNavHost() {
    if (!metaHost) return;
    nav?.remove();
    if (metaCreated) metaHost.remove();
    else {
      metaHost.classList.remove('ssv-meta-host');
      if (metaOriginals) metaHost.appendChild(metaOriginals);
    }
    metaHost = null;
    metaOriginals = null;
    metaCreated = false;
  }

  function hasVisiblePaint(color) {
    if (!color || color === 'transparent') return false;
    const rgba = color.match(/^rgba?\(([^)]+)\)/i);
    if (!rgba) return color !== 'none';
    const parts = rgba[1].split(',');
    return parts.length < 4 || Number(parts[3].trim()) > 0.01;
  }

  // Derive dropdown colours from actual site styles. No geometry observation:
  // position and size are entirely controlled by the native post-meta box.
  function syncTheme() {
    if (!nav || !metaHost || !target) return;
    const metaStyle = win.getComputedStyle(metaHost);
    const article = target.closest('article') || target;
    const articleStyle = win.getComputedStyle(article);
    let surface = '';
    for (let el = metaHost; el; el = el.parentElement) {
      const candidate = win.getComputedStyle(el).backgroundColor;
      if (hasVisiblePaint(candidate)) { surface = candidate; break; }
    }
    if (!surface) surface = win.getComputedStyle(doc.body).backgroundColor;
    if (!hasVisiblePaint(surface)) surface = '#fff';
    const color = metaStyle.color || articleStyle.color || '#222';
    nav.style.setProperty('--ssv-text', color);
    nav.style.setProperty('--ssv-surface', surface);
    nav.style.setProperty('--ssv-border-color', `color-mix(in srgb, ${color} 24%, transparent)`);
    nav.style.setProperty('--ssv-hover-color', `color-mix(in srgb, ${color} 10%, transparent)`);
    nav.style.setProperty('--ssv-border-radius', articleStyle.borderRadius !== '0px' ? articleStyle.borderRadius : '4px');
    nav.style.setProperty('--ssv-font-family', metaStyle.fontFamily);
    nav.style.setProperty('--ssv-font-weight', metaStyle.fontWeight);
    nav.style.setProperty('--ssv-line-height', metaStyle.lineHeight);
    nav.style.setProperty('--ssv-menu-font-size', metaStyle.fontSize);
    const width = metaHost.clientWidth;
    const size = Math.min((parseFloat(metaStyle.fontSize)||16)*.92, Math.max(9,width/17));
    nav.style.setProperty('--ssv-nav-font-size', size + 'px');
  }

  function closeMenu() {
    if (!menuPanel || menuPanel.hidden) return;
    menuPanel.hidden = true;
    menuButton?.setAttribute('aria-expanded', 'false');
  }

  function fitMenuToViewport() {
    if (!menuPanel || menuPanel.hidden) return;
    const top = menuPanel.getBoundingClientRect().top;
    const remaining = Math.max(40, (win.innerHeight || doc.documentElement.clientHeight) - top - 10);
    const maximum = safeLength(options.menuMaxHeight, 704);
    menuPanel.style.setProperty('max-height', Math.min(remaining, maximum) + 'px', 'important');
  }

  function toggleMenu() {
    if (!menuPanel || !menuButton) return;
    menuPanel.hidden = !menuPanel.hidden;
    menuButton.setAttribute('aria-expanded', String(!menuPanel.hidden));
    if (!menuPanel.hidden) { syncTheme(); updateMenuCurrent(); fitMenuToViewport(); }
  }

  function updateMenuCurrent() {
    if (!menuPanel) return;
    menuPanel.querySelectorAll('[data-ssv-page]').forEach(button => {
      if (Number(button.dataset.ssvPage) === currentPage) {
        button.setAttribute('aria-current', 'page');
      } else {
        button.removeAttribute('aria-current');
      }
    });
  }

  function onOutsidePointer(event) {
    if (nav && !nav.contains(event.target)) closeMenu();
  }

  function onMenuKey(event) {
    if (event.key !== 'Escape' || !menuPanel || menuPanel.hidden) return;
    closeMenu();
    menuButton?.focus();
    event.preventDefault();
  }

  function makeNav(sectionSlides) {
    const bar = doc.createElement('nav');
    bar.className = 'ssv-nav';
    bar.setAttribute('aria-label', 'Slide navigation');
    const previous = createButton(options.previousLabel, 'ssv-nav-prev', prev, 'Previous page');
    const index = createButton(options.indexLabel, 'ssv-nav-index', toggleMenu, 'Choose a section');
    const following = createButton(options.nextLabel, 'ssv-nav-next', next, 'Next page');
    index.setAttribute('aria-haspopup', 'true');
    index.setAttribute('aria-expanded', 'false');
    index.setAttribute('aria-controls', 'ssv-section-menu');
    const dropdown = doc.createElement('div');
    dropdown.className = 'ssv-nav-menu';
    dropdown.id = 'ssv-section-menu';
    dropdown.setAttribute('role', 'group');
    dropdown.setAttribute('aria-label', 'Sections');
    dropdown.hidden = true;

    const addEntry = (label, page, handler) => {
      const button = createButton(label, 'ssv-nav-menu-item', () => {
        closeMenu();
        handler();
      });
      button.dataset.ssvPage = String(page);
      dropdown.appendChild(button);
    };
    addEntry('Index', 0, showIndex);
    sectionSlides.forEach((section, indexNumber) => {
      addEntry(section.title, indexNumber + 1, () => goTo(indexNumber));
    });
    bar.append(previous, index, following, dropdown);
    menuButton = index;
    menuPanel = dropdown;
    return bar;
  }

  function makeIndex(viewport) {
    const heading = doc.createElement('h1');
    heading.className = 'ssv-heading';
    heading.textContent = options.indexHeading != null
      ? String(options.indexHeading)
      : String(options.indexPage?.headingText ?? "Here's Index");
    viewport.appendChild(heading);

    const actions = doc.createElement('div');
    actions.className = 'ssv-index-actions';
    actions.append(
      createButton(options.viewOriginalLabel, '', () => disable(), 'Show original article'),
      createButton(options.fromBeginningLabel, '', () => goTo(0), 'Start from the first section')
    );
    viewport.appendChild(actions);

    const body = doc.createElement('div');
    body.className = 'ssv-body';
    const list = doc.createElement('ol');
    list.className = 'ssv-index-list';
    slides.forEach((slide, i) => {
      const item = doc.createElement('li');
      const anchor = doc.createElement('a');
      anchor.href = '#simple-slide-page-' + (i + 1);
      const number = doc.createElement('span');
      number.className = 'ssv-index-number';
      number.textContent = (i + 1) + '.';
      const title = doc.createElement('span');
      title.textContent = slide.title;
      anchor.append(number, title);
      anchor.addEventListener('click', event => {
        event.preventDefault();
        goTo(i);
      });
      item.appendChild(anchor);
      list.appendChild(item);
    });
    body.appendChild(list);
    viewport.appendChild(body);
    return body;
  }

  function makeContent(viewport, pageIndex) {
    const slide = slides[pageIndex];
    const body = doc.createElement('div');
    body.className = 'ssv-body';
    if (options.animation !== 'none') body.classList.add('ssv-fade');
    const fragment = slide.template.cloneNode(true);
    // Preserve actual heading markup, including links, emphasis, code and IDs.
    if (slide.hasHeading) {
      const firstHeading = fragment.querySelector('h' + slide.headingLevel);
      if (firstHeading) firstHeading.classList.add('ssv-heading');
    }
    body.appendChild(fragment);
    viewport.appendChild(body);
    return body;
  }

  function render() {
    if (!active || !slideRoot) return;
    const oldViewport = slideRoot.querySelector('.ssv-viewport');
    if (oldViewport) oldViewport.remove();
    const viewport = doc.createElement('section');
    viewport.className = 'ssv-viewport';
    viewport.setAttribute('aria-label', currentPage === 0 ? 'Index' : `Page ${currentPage}`);
    const body = currentPage === 0
      ? makeIndex(viewport)
      : makeContent(viewport, currentPage - 1);
    slideRoot.appendChild(viewport);
    updateMenuCurrent();
    emit('content:rendered', body);
  }

  function scrollToTop() {
    if (!active || !slideRoot) return;
    // Scrolling after rendering avoids landing halfway into the next slide.
    const top = slideRoot.getBoundingClientRect().top + win.scrollY;
    win.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
  }

  function goTo(index) {
    if (!active) return false;
    const numeric = Number(index);
    if (!Number.isInteger(numeric) || numeric < 0 || numeric >= slides.length) return false;
    currentPage = numeric + 1;
    render();
    scrollToTop();
    return true;
  }

  function showIndex() {
    if (!active) return false;
    currentPage = 0;
    render();
    scrollToTop();
    return true;
  }

  function next() {
    if (!active) return false;
    currentPage = (currentPage + 1) % (slides.length + 1);
    render();
    scrollToTop();
    return true;
  }

  function prev() {
    if (!active) return false;
    currentPage = (currentPage + slides.length) % (slides.length + 1);
    render();
    scrollToTop();
    return true;
  }

  function enable(input) {
    const nextTarget = resolveTarget(input);
    if (!nextTarget) return false;
    if (active && target === nextTarget) return true;
    if (active) disable();

    // Ask any existing plugins to undo their own transformations before capture.
    emit('content:prepare', nextTarget);

    const fragment = doc.createDocumentFragment();
    let tentativeRoot = null;
    let tentativeControls = null;
    let mountedMeta = null;
    while (nextTarget.firstChild) fragment.appendChild(nextTarget.firstChild);
    try {
      const parsed = parseSlides(fragment);
      const root = doc.createElement('div');
      root.className = 'ssv-root';
      tentativeRoot = root;
      const controls = makeNav(parsed);
      tentativeControls = controls;
      nextTarget.appendChild(root);
      injectStyle();
      mountedMeta = mountNav(nextTarget, controls);

      originals = fragment;
      target = nextTarget;
      slideRoot = root;
      nav = controls;
      metaHost = mountedMeta.host;
      metaOriginals = mountedMeta.contents;
      metaCreated = mountedMeta.created;
      slides = parsed;
      currentPage = 0; // Always open on Index, not on the first content page.
      active = true;
      doc.addEventListener('pointerdown', onOutsidePointer, true);
      doc.addEventListener('keydown', onMenuKey);
      win.addEventListener('resize', fitMenuToViewport, { passive: true });
      syncTheme();
      render();
      return true;
    } catch (error) {
      // The exception path also restores the exact source nodes and state.
      if (active && target === nextTarget) disable();
      else {
        tentativeControls?.remove();
        if (mountedMeta) {
          if (mountedMeta.created) mountedMeta.host.remove();
          else {
            mountedMeta.host.classList.remove('ssv-meta-host');
            mountedMeta.host.appendChild(mountedMeta.contents);
          }
        }
        tentativeRoot?.remove();
        nextTarget.insertBefore(fragment, nextTarget.firstChild);
        menuButton = null;
        menuPanel = null;
      }
      throw error;
    }
  }

  function disable() {
    if (!active || !target) return false;
    const restoredTarget = target;
    // Remove only nodes created by this script. The originals were never cloned.
    closeMenu();
    restoreNavHost();
    if (slideRoot && slideRoot.parentNode) slideRoot.remove();
    if (originals) restoredTarget.insertBefore(originals, restoredTarget.firstChild);
    doc.removeEventListener('pointerdown', onOutsidePointer, true);
    doc.removeEventListener('keydown', onMenuKey);
    win.removeEventListener('resize', fitMenuToViewport);
    active = false;
    target = null;
    originals = null;
    slideRoot = null;
    nav = null;
    menuButton = null;
    menuPanel = null;
    slides = [];
    currentPage = 0;
    emit('content:restored', restoredTarget);
    return true;
  }

  function toggle(input) {
    const selected = resolveTarget(input);
    if (active && (!input || selected === target)) return disable();
    return enable(input);
  }

  function refresh() {
    if (!active || !originals) return false;
    const previousPage = currentPage;
    slides = parseSlides(originals);
    currentPage = Math.min(previousPage, slides.length);
    render();
    return true;
  }

  function updateConfig(changes) {
    if (changes && typeof changes === 'object') Object.assign(options, changes);
    const wasActive = active;
    const oldTarget = target;
    if (wasActive) disable();
    doc.getElementById(options.styleId)?.remove();
    if (wasActive) enable(oldTarget);
    return getConfig();
  }

  function destroy() {
    disable();
    doc.getElementById(options.styleId)?.remove();
  }

  function getState() {
    return {
      mode: active ? 'slide' : 'original',
      currentPage, // 0 = index, 1..N = content pages
      currentSlideIndex: active && currentPage > 0 ? currentPage - 1 : -1,
      contentPages: slides.length,
      totalPages: active ? slides.length + 1 : 0,
      titles: slides.map(slide => slide.title)
    };
  }

  function getConfig() { return Object.assign({}, options); }

  const api = {
    toggle, enable, disable, refresh, destroy, updateConfig,
    next, prev, goTo, showIndex, fromBeginning: () => goTo(0),
    getState, getConfig
  };
  win.simpleSlide = api;

  function boot() {
    if (started) return;
    started = true;
    if (options.autoStart) enable(options.targetSelector);
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})(window, document);
