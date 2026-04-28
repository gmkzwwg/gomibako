(function () {
  'use strict';

  const CONFIG = {
    mode: 'linear',
    targetSelectors: [
      '#main-content',
      '.post-content',
      '.page-content',
      'article',
      'main',
      '.markdown-body',
      '.content',
      '#content'
    ],
    widgetPosition: { right: 20, bottom: 20 },
    opacityIdle: 0.4,
    opacityHover: 0.7,
    dragHandleLabel: '✥',
    buttonFontScale: 1.22,
    mobileBreakpoint: 768,
    titleScale: 1.8,
    headingPadding: { top: 16, right: 24, bottom: 12, left: 24 },
    bodyPadding: { top: 0, right: 48, bottom: 0, left: 48 },
    indexPage: {
      enabled: true,
      position: 'last',
      menuTitle: 'Index',
      headingText: "Here's Index & Thanks!"
    },
    animationMs: 260,
    autoplayInterval: 5,
    menuMaxHeight: 240,
    controls: {
      menu: { show: false, label: '≣' },
      first: { show: false, label: '«' },
      prev: { show: true, label: '‹' },
      next: { show: true, label: '›' },
      last: { show: false, label: '»' },
      autoplay: { show: false, label: '▸' }
    },
    labels: {
      languageMenu: 'Language',
      annotationOriginal: 'Original',
      annotationNext: 'Annotation'
    }
  };

  const state = {
    userConfig: {},
    config: deepClone(CONFIG),
    target: null,
    originalHTML: '',
    slides: [],
    currentIndex: 0,
    dom: {},
    drag: null,
    autoplayTimer: null,
    resizeBound: false,
    keyBound: false,
    outsideClickBound: false,
    dragCleanup: null
  };

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function merge(target, source) {
    if (!source || typeof source !== 'object') return target;
    Object.keys(source).forEach(function (key) {
      const value = source[key];
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) {
          target[key] = {};
        }
        merge(target[key], value);
      } else {
        target[key] = value;
      }
    });
    return target;
  }

  function buildConfig() {
    const conf = deepClone(CONFIG);
    merge(conf, state.userConfig || {});
    applyModePreset(conf);
    if (state.userConfig && state.userConfig.controls) merge(conf.controls, state.userConfig.controls);
    return conf;
  }

  function applyModePreset(conf) {
    if (conf.mode === 'simple') {
      conf.controls = {
        menu: { show: false, label: '≣' },
        first: { show: false, label: '«' },
        prev: { show: true, label: '‹' },
        next: { show: true, label: '›' },
        last: { show: false, label: '»' },
        autoplay: { show: false, label: '▸' }
      };
      return;
    }
    if (conf.mode === 'language') {
      conf.controls = {
        menu: { show: true, label: conf.labels.languageMenu || 'Language' },
        first: { show: false, label: '«' },
        prev: { show: false, label: '‹' },
        next: { show: false, label: '›' },
        last: { show: false, label: '»' },
        autoplay: { show: false, label: '▸' }
      };
      return;
    }
    if (conf.mode === 'annotation') {
      conf.controls = {
        menu: { show: false, label: '≣' },
        first: { show: true, label: conf.labels.annotationOriginal || 'Original' },
        prev: { show: false, label: '‹' },
        next: { show: true, label: conf.labels.annotationNext || 'Annotation' },
        last: { show: false, label: '»' },
        autoplay: { show: false, label: '▸' }
      };
      return;
    }
    conf.controls = {
      menu: { show: false, label: '≣' },
      first: { show: false, label: '«' },
      prev: { show: true, label: '‹' },
      next: { show: true, label: '›' },
      last: { show: false, label: '»' },
      autoplay: { show: false, label: '▸' }
    };
  }

  function isMobile() {
    return window.matchMedia('(max-width: ' + state.config.mobileBreakpoint + 'px)').matches;
  }

  function getPaddingString(obj, forceZero) {
    if (forceZero) return '0px';
    const top = Number(obj.top || 0);
    const right = Number(obj.right || 0);
    const bottom = Number(obj.bottom || 0);
    const left = Number(obj.left || 0);
    return top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px';
  }

  function injectStyle() {
    const existing = document.getElementById('jsd-linear-style');
    if (existing) existing.remove();

    const mobile = isMobile();
    const style = document.createElement('style');
    style.id = 'jsd-linear-style';
    style.textContent = `
      .jsd-linear-root {
        width: 100%;
        min-height: inherit;
      }
      .jsd-heading {
        display: block;
        width: 100%;
        box-sizing: border-box;
        text-align: center;
        font-weight: 700;
        font-size: calc(1em * ${state.config.titleScale});
        line-height: 1.25;
        padding: ${getPaddingString(state.config.headingPadding, mobile)};
      }
      .jsd-slide-body {
        width: 100%;
        box-sizing: border-box;
        padding: ${getPaddingString(state.config.bodyPadding, mobile)};
      }
      .jsd-slide-anim-fade {
        animation: jsdLinearFade ${state.config.animationMs}ms ease;
      }
      .jsd-slide-anim-up {
        animation: jsdLinearUp ${state.config.animationMs}ms ease;
      }
      .jsd-slide-anim-zoom {
        animation: jsdLinearZoom ${state.config.animationMs}ms ease;
      }
      @keyframes jsdLinearFade {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes jsdLinearUp {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes jsdLinearZoom {
        from { opacity: 0; transform: scale(0.985); }
        to { opacity: 1; transform: scale(1); }
      }
      .jsd-linear-toolbar {
        position: fixed;
        right: ${state.config.widgetPosition.right}px;
        bottom: ${state.config.widgetPosition.bottom}px;
        display: inline-flex;
        align-items: stretch;
        gap: 0;
        box-sizing: border-box;
        opacity: ${state.config.opacityIdle};
        transition: opacity 180ms ease;
        z-index: 9999;
        border: 1px solid currentColor;
        background: inherit;
        backdrop-filter: blur(10px); // 毛玻璃效果
        color: inherit;
        user-select: none;
      }
      .jsd-linear-toolbar:hover,
      .jsd-linear-toolbar.is-active,
      .jsd-linear-toolbar.is-open,
      .jsd-linear-toolbar.is-playing {
        opacity: ${state.config.opacityHover};
      }
      .jsd-linear-drag {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 18px;
        padding: 0 4px;
        border-right: 1px solid currentColor;
        cursor: move;
        line-height: 1;
        font-size: 1.05em;
      }
      .jsd-linear-controls {
        display: inline-flex;
        align-items: stretch;
        position: relative;
      }
      .jsd-linear-button {
        appearance: none;
        -webkit-appearance: none;
        border: 0;
        border-left: 1px solid currentColor;
        background: transparent;
        color: inherit;
        padding: 6px 10px;
        min-height: 30px;
        line-height: 1;
        cursor: pointer;
        font-family: inherit;
        font-weight: inherit;
        font-size: calc(1em * ${state.config.buttonFontScale});
        white-space: nowrap;
      }
      .jsd-linear-controls .jsd-linear-button:first-child {
        border-left: 0;
      }
      .jsd-linear-button:focus-visible {
        outline: 1px solid currentColor;
        outline-offset: -1px;
      }
      .jsd-linear-button.is-active {
        font-weight: 700;
      }
      .jsd-linear-menu {
        position: absolute;
        right: 0;
        bottom: calc(100% + 6px);
        min-width: 180px;
        max-height: ${Number(state.config.menuMaxHeight || 240)}px;
        overflow: auto;
        border: 1px solid currentColor;
        background: inherit;
        color: inherit;
        display: none;
        scrollbar-width: thin;
        scrollbar-color: currentColor rgba(127, 127, 127, 0.08);
      }
      .jsd-linear-menu::-webkit-scrollbar {
        width: 4.5px;
        height: 4.5px;
      }
      .jsd-linear-menu::-webkit-scrollbar-thumb {
        background-color: currentColor;
        border-radius: 999px;
      }
      .jsd-linear-menu::-webkit-scrollbar-track {
        background-color: rgba(127, 127, 127, 0.08);
        border-radius: 999px;
      }
      .jsd-linear-menu::-webkit-scrollbar-corner {
        background: transparent;
      }
      .jsd-linear-menu.is-open {
        display: block;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(10px); // 毛玻璃效果
      }
      .jsd-linear-menu-item {
        width: 100%;
        display: block;
        border: 0;
        border-bottom: 1px solid currentColor;
        background: transparent;
        color: inherit;
        padding: 8px 10px;
        text-align: left;
        cursor: pointer;
        font: inherit;
      }
      .jsd-linear-menu-item:last-child {
        border-bottom: 0;
      }
      .jsd-linear-menu-item.is-current {
        font-weight: 700;
      }
      .jsd-index-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        box-sizing: border-box;
      }
      .jsd-index-item {
        display: block;
        width: 100%;
      }
      .jsd-index-button {
        width: 100%;
        display: block;
        text-align: left;
        box-sizing: border-box;
        border: 1px solid currentColor;
        background: transparent;
        color: inherit;
        padding: 10px 12px;
        font: inherit;
        cursor: pointer;
      }
      .jsd-index-button:focus-visible {
        outline: 1px solid currentColor;
        outline-offset: -1px;
      }
      .jsd-index-button-num {
        display: inline-block;
        min-width: 2.6em;
        font-weight: 700;
      }
      .jsd-linear-empty {
        display: none;
      }
    `;
    document.head.appendChild(style);
  }

  function findTarget() {
    const selectors = state.config.targetSelectors || [];
    for (let i = 0; i < selectors.length; i += 1) {
      const node = document.querySelector(selectors[i]);
      if (node) return node;
    }
    return null;
  }

  function isDirectHeading(node, level) {
    return node && node.nodeType === 1 && node.tagName && node.tagName.toUpperCase() === 'H' + level;
  }

  function getDirectHeadingLevels(container) {
    return Array.from(container.childNodes)
      .filter(function (node) {
        return node.nodeType === 1 && /^H[1-6]$/.test(node.tagName);
      })
      .map(function (node) {
        return Number(node.tagName.slice(1));
      });
  }

  function getMinHeadingLevel(container) {
    const directLevels = getDirectHeadingLevels(container);
    if (directLevels.length) return Math.min.apply(Math, directLevels);

    const all = Array.from(container.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(function (node) {
      return Number(node.tagName.slice(1));
    });
    if (all.length) return Math.min.apply(Math, all);
    return null;
  }

  function parseLinearSlides(container) {
    const level = getMinHeadingLevel(container);
    const nodes = Array.from(container.childNodes);
    const slides = [];
    let current = null;

    if (!level) {
      const fallback = {
        key: 'slide-0',
        menuTitle: '',
        heading: '',
        nodes: nodes.map(function (node) { return node.cloneNode(true); })
      };
      slides.push(fallback);
      return slides;
    }

    nodes.forEach(function (node) {
      if (isDirectHeading(node, level)) {
        current = {
          key: 'slide-' + slides.length,
          menuTitle: node.textContent.trim(),
          heading: node.textContent.trim(),
          nodes: []
        };
        slides.push(current);
        return;
      }
      if (current) current.nodes.push(node.cloneNode(true));
    });

    return slides;
  }

  function parseLanguageSlides(container) {
    const nodes = Array.from(container.childNodes);
    const slides = [];
    let current = null;

    nodes.forEach(function (node) {
      if (isDirectHeading(node, 1)) {
        current = {
          key: 'lang-' + slides.length,
          menuTitle: node.textContent.trim(),
          heading: '',
          nodes: []
        };
        slides.push(current);
        return;
      }
      if (current) current.nodes.push(node.cloneNode(true));
    });

    if (!slides.length) return parseLinearSlides(container);
    return slides;
  }

  function parseSlidesFromOriginal() {
    const scratch = document.createElement('div');
    scratch.innerHTML = state.originalHTML;
    if (state.config.mode === 'language') return parseLanguageSlides(scratch);
    return parseLinearSlides(scratch);
  }

  function shouldAddIndexPage() {
    const cfg = state.config.indexPage || {};
    if (cfg.enabled === false) return false;
    const position = String(cfg.position || 'last').toLowerCase();
    return position === 'first' || position === 'last';
  }

  function getIndexPosition() {
    const cfg = state.config.indexPage || {};
    const position = String(cfg.position || 'last').toLowerCase();
    if (position === 'first') return 'first';
    if (position === 'none') return 'none';
    return 'last';
  }

  function createIndexSlide() {
    const cfg = state.config.indexPage || {};
    const headingText = typeof cfg.headingText === 'string' ? cfg.headingText : '';
    return {
      key: 'index-slide',
      type: 'index',
      menuTitle: String(cfg.menuTitle || 'Index'),
      heading: headingText,
      nodes: []
    };
  }

  function applyIndexPage(slides) {
    const nextSlides = Array.isArray(slides) ? slides.slice() : [];
    if (!shouldAddIndexPage()) return nextSlides;
    const indexSlide = createIndexSlide();
    if (getIndexPosition() === 'first') nextSlides.unshift(indexSlide);
    else nextSlides.push(indexSlide);
    return nextSlides;
  }

  function clearAutoplay() {
    if (state.autoplayTimer) {
      window.clearInterval(state.autoplayTimer);
      state.autoplayTimer = null;
    }
    if (state.dom.toolbar) state.dom.toolbar.classList.remove('is-playing');
    if (state.dom.autoplaybutton) state.dom.autoplaybutton.classList.remove('is-active');
  }

  function startAutoplay() {
    clearAutoplay();
    const seconds = Number(state.config.autoplayInterval || 0);
    if (!(seconds > 0) || state.slides.length < 2) return;
    state.autoplayTimer = window.setInterval(function () {
      nextSlide();
    }, seconds * 1000);
    if (state.dom.toolbar) state.dom.toolbar.classList.add('is-playing');
    if (state.dom.autoplaybutton) state.dom.autoplaybutton.classList.add('is-active');
  }

  function toggleAutoplay() {
    if (state.autoplayTimer) {
      clearAutoplay();
    } else {
      startAutoplay();
    }
  }

  function closeMenu() {
    if (state.dom.menu) state.dom.menu.classList.remove('is-open');
    if (state.dom.toolbar) state.dom.toolbar.classList.remove('is-open');
  }

  function openMenu() {
    if (!state.dom.menu) return;
    state.dom.menu.classList.add('is-open');
    if (state.dom.toolbar) state.dom.toolbar.classList.add('is-open');
  }

  function toggleMenu() {
    if (!state.dom.menu) return;
    if (state.dom.menu.classList.contains('is-open')) closeMenu();
    else openMenu();
  }

  function getMenuItemTitle(slide, index) {
    const title = (slide.menuTitle || slide.heading || '').trim();
    if (title) return title;
    return 'Page ' + (index + 1);
  }

  function renderMenu() {
    if (!state.dom.menu) return;
    state.dom.menu.innerHTML = '';
    state.slides.forEach(function (slide, index) {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'jsd-linear-menu-item' + (index === state.currentIndex ? ' is-current' : '');
      item.textContent = getMenuItemTitle(slide, index);
      item.addEventListener('click', function () {
        goTo(index);
        closeMenu();
      });
      state.dom.menu.appendChild(item);
    });
  }

  function getAnimationClass() {
    const classes = ['jsd-slide-anim-fade', 'jsd-slide-anim-up', 'jsd-slide-anim-zoom'];
    return classes[Math.floor(Math.random() * classes.length)];
  }

  function renderIndexBody(body) {
    const list = document.createElement('div');
    list.className = 'jsd-index-list';

    state.slides.forEach(function (slide, index) {
      if (slide.type === 'index') return;

      const item = document.createElement('div');
      item.className = 'jsd-index-item';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'jsd-index-button';

      const num = document.createElement('span');
      num.className = 'jsd-index-button-num';
      num.textContent = String(index + 1) + '.';

      const title = document.createElement('span');
      title.className = 'jsd-index-button-title';
      title.textContent = getMenuItemTitle(slide, index);

      button.appendChild(num);
      button.appendChild(title);
      button.addEventListener('click', function () {
        goTo(index);
      });

      item.appendChild(button);
      list.appendChild(item);
    });

    body.appendChild(list);
  }

  function renderCurrent() {
    const slide = state.slides[state.currentIndex];
    if (!slide || !state.dom.root) return;

    state.dom.root.innerHTML = '';

    const showHeading = slide.type === 'index'
      ? Boolean((slide.heading || '').trim())
      : state.config.mode !== 'language' && Boolean((slide.heading || '').trim());

    let heading = null;
    if (showHeading) {
      heading = document.createElement('div');
      heading.className = 'jsd-heading';
      heading.textContent = slide.heading || '';
      state.dom.root.appendChild(heading);
    }

    const body = document.createElement('div');
    body.className = 'jsd-slide-body ' + getAnimationClass();

    if (slide.type === 'index') {
      renderIndexBody(body);
    } else {
      slide.nodes.forEach(function (node) {
        body.appendChild(node.cloneNode(true));
      });
    }

    state.dom.root.appendChild(body);
    state.dom.heading = heading;
    state.dom.body = body;
    renderMenu();
  }

  function normalizeIndex(index) {
    const total = state.slides.length;
    if (!total) return 0;
    let next = index % total;
    if (next < 0) next += total;
    return next;
  }

  function goTo(index) {
    if (!state.slides.length) return;
    state.currentIndex = normalizeIndex(index);
    renderCurrent();
  }

  function firstSlide() {
    goTo(0);
  }

  function prevSlide() {
    goTo(state.currentIndex - 1);
  }

  function nextSlide() {
    goTo(state.currentIndex + 1);
  }

  function lastSlide() {
    if (!state.slides.length) return;
    goTo(state.slides.length - 1);
  }

  function updateToolbarState() {
    if (!state.dom.toolbar) return;
    if (state.autoplayTimer) state.dom.toolbar.classList.add('is-playing');
    else state.dom.toolbar.classList.remove('is-playing');
  }

  function createButton(key, text, handler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'jsd-linear-button jsd-linear-button-' + key;
    button.textContent = text;
    button.addEventListener('click', handler);
    return button;
  }

  function attachDragging(toolbar, handle) {
    if (typeof state.dragCleanup === 'function') state.dragCleanup();

    const onMouseDown = function (event) {
      state.drag = {
        pointerX: event.clientX,
        pointerY: event.clientY,
        startLeft: toolbar.offsetLeft,
        startTop: toolbar.offsetTop
      };
      toolbar.classList.add('is-active');
      toolbar.style.left = toolbar.offsetLeft + 'px';
      toolbar.style.top = toolbar.offsetTop + 'px';
      toolbar.style.right = 'auto';
      toolbar.style.bottom = 'auto';
      event.preventDefault();
    };

    const onMouseMove = function (event) {
      if (!state.drag) return;
      const dx = event.clientX - state.drag.pointerX;
      const dy = event.clientY - state.drag.pointerY;
      toolbar.style.left = state.drag.startLeft + dx + 'px';
      toolbar.style.top = state.drag.startTop + dy + 'px';
    };

    const onMouseUp = function () {
      if (!state.drag) return;
      state.drag = null;
      toolbar.classList.remove('is-active');
    };

    handle.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    state.dragCleanup = function () {
      handle.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }

  function buildToolbar() {
    if (state.dom.toolbar) state.dom.toolbar.remove();

    const toolbar = document.createElement('div');
    toolbar.className = 'jsd-linear-toolbar';

    const drag = document.createElement('div');
    drag.className = 'jsd-linear-drag';
    drag.textContent = state.config.dragHandleLabel || '✥';

    const controls = document.createElement('div');
    controls.className = 'jsd-linear-controls';

    const menu = document.createElement('div');
    menu.className = 'jsd-linear-menu';

    controls.appendChild(menu);

    if (state.config.controls.menu.show) {
      const menubutton = createButton('menu', state.config.controls.menu.label, toggleMenu);
      controls.appendChild(menubutton);
      state.dom.menubutton = menubutton;
    } else {
      state.dom.menubutton = null;
    }

    if (state.config.controls.first.show) {
      controls.appendChild(createButton('first', state.config.controls.first.label, function () {
        firstSlide();
      }));
    }

    if (state.config.controls.prev.show) {
      controls.appendChild(createButton('prev', state.config.controls.prev.label, function () {
        prevSlide();
      }));
    }

    if (state.config.controls.next.show) {
      controls.appendChild(createButton('next', state.config.controls.next.label, function () {
        nextSlide();
      }));
    }

    if (state.config.controls.last.show) {
      controls.appendChild(createButton('last', state.config.controls.last.label, function () {
        lastSlide();
      }));
    }

    if (state.config.controls.autoplay.show) {
      const autoplaybutton = createButton('autoplay', state.config.controls.autoplay.label, function () {
        toggleAutoplay();
        updateToolbarState();
      });
      controls.appendChild(autoplaybutton);
      state.dom.autoplaybutton = autoplaybutton;
    } else {
      state.dom.autoplaybutton = null;
    }

    toolbar.appendChild(drag);
    toolbar.appendChild(controls);
    document.body.appendChild(toolbar);

    state.dom.toolbar = toolbar;
    state.dom.controls = controls;
    state.dom.menu = menu;

    attachDragging(toolbar, drag);
  }

  function mountRoot() {
    const root = document.createElement('div');
    root.className = 'jsd-linear-root';
    state.target.innerHTML = '';
    state.target.appendChild(root);
    state.dom.root = root;
  }

  function onResize() {
    injectStyle();
    renderCurrent();
  }

  function onKeydown(event) {
    const tag = event.target && event.target.tagName ? event.target.tagName.toUpperCase() : '';
    const editable = event.target && (event.target.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT');
    if (editable) return;

    if (event.key === 'ArrowLeft') {
      prevSlide();
      return;
    }
    if (event.key === 'ArrowRight') {
      nextSlide();
      return;
    }
    if (event.key === 'Home') {
      firstSlide();
      return;
    }
    if (event.key === 'End') {
      lastSlide();
      return;
    }
    if (event.key === 'Escape') {
      closeMenu();
    }
  }

  function bindGlobals() {
    if (!state.resizeBound) {
      window.addEventListener('resize', onResize);
      state.resizeBound = true;
    }
    if (!state.keyBound) {
      document.addEventListener('keydown', onKeydown);
      state.keyBound = true;
    }
    if (!state.outsideClickBound) {
      document.addEventListener('click', function (event) {
        if (!state.dom.toolbar || !state.dom.toolbar.contains(event.target)) closeMenu();
      });
      state.outsideClickBound = true;
    }
  }

  function initState() {
    const nextTarget = findTarget();
    if (!nextTarget) return false;
    if (state.target !== nextTarget) {
      state.target = nextTarget;
      state.originalHTML = nextTarget.innerHTML;
    } else if (!state.originalHTML) {
      state.originalHTML = nextTarget.innerHTML;
    }
    state.slides = applyIndexPage(parseSlidesFromOriginal());
    state.currentIndex = 0;
    return true;
  }

  function rebuild(nextConfig) {
    if (nextConfig && typeof nextConfig === 'object') {
      merge(state.userConfig, nextConfig);
    }
    state.config = buildConfig();

    clearAutoplay();
    closeMenu();

    if (!initState()) return null;

    injectStyle();
    mountRoot();
    buildToolbar();
    bindGlobals();
    renderCurrent();
    return api;
  }

  function destroy() {
    clearAutoplay();
    closeMenu();
    if (typeof state.dragCleanup === 'function') state.dragCleanup();
    state.dragCleanup = null;
    if (state.dom.toolbar) state.dom.toolbar.remove();
    const style = document.getElementById('jsd-linear-style');
    if (style) style.remove();
    if (state.target && typeof state.originalHTML === 'string') {
      state.target.innerHTML = state.originalHTML;
    }
    state.dom = {};
  }

  function getState() {
    return {
      currentIndex: state.currentIndex,
      totalSlides: state.slides.length,
      mode: state.config.mode,
      slideTitles: state.slides.map(function (slide, index) {
        return getMenuItemTitle(slide, index);
      }),
      autoplay: Boolean(state.autoplayTimer)
    };
  }

  function getConfig() {
    return deepClone(state.config);
  }

  const api = {
    rebuild: rebuild,
    destroy: destroy,
    getState: getState,
    getConfig: getConfig,
    next: nextSlide,
    prev: prevSlide,
    first: firstSlide,
    last: lastSlide,
    goTo: goTo,
    startAutoplay: startAutoplay,
    stopAutoplay: clearAutoplay,
    toggleAutoplay: toggleAutoplay
  };

  window.updateLinearConfig = function (nextConfig) {
    return rebuild(nextConfig || {});
  };
  window.JSDLinearSlides = api;

  function boot() {
    rebuild({});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
