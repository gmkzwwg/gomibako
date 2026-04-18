(function () {
  'use strict';

  const CONFIG = {
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
    widgetSize: { width: 260, mapHeight: 120 },
    opacityIdle: 0.2,
    opacityHover: 0.7,
    mobileBreakpoint: 768,
    headingPadding: { top: 16, right: 24, bottom: 12, left: 24 },
    bodyPadding: { top: 0, right: 48, bottom: 0, left: 48 },
    animationMs: 260,
    titleScale: 1.8,
    labels: {
      prevMajor: '<<',
      prevSlide: '<',
      nextSlide: '>',
      nextMajor: '>>'
    }
  };

  const state = {
    config: deepClone(CONFIG),
    target: null,
    data: null,
    currentMajor: 0,
    currentSlide: 0,
    dom: {},
    drag: null,
    originalHTML: ''
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
    const existing = document.getElementById('jsd-tree-style');
    if (existing) existing.remove();

    const mobile = isMobile();
    const style = document.createElement('style');
    style.id = 'jsd-tree-style';
    style.textContent = `
      .jsd-tree-root {
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
        animation: jsdTreeFade ${state.config.animationMs}ms ease;
      }
      .jsd-slide-anim-up {
        animation: jsdTreeUp ${state.config.animationMs}ms ease;
      }
      .jsd-slide-anim-zoom {
        animation: jsdTreeZoom ${state.config.animationMs}ms ease;
      }
      @keyframes jsdTreeFade {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes jsdTreeUp {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes jsdTreeZoom {
        from { opacity: 0; transform: scale(0.985); }
        to { opacity: 1; transform: scale(1); }
      }
      .jsd-tree-widget {
        position: fixed;
        right: ${state.config.widgetPosition.right}px;
        bottom: ${state.config.widgetPosition.bottom}px;
        width: ${state.config.widgetSize.width}px;
        box-sizing: border-box;
        opacity: ${state.config.opacityIdle};
        transition: opacity 180ms ease;
        z-index: 9999;
        border: 1px solid currentColor;
        background: inherit;
        color: inherit;
        user-select: none;
      }
      .jsd-tree-widget:hover,
      .jsd-tree-widget.is-active {
        opacity: ${state.config.opacityHover};
      }
      .jsd-tree-widget-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 6px 8px;
        border-bottom: 1px solid currentColor;
        cursor: move;
        font-size: 0.95em;
      }
      .jsd-tree-widget-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 700;
      }
      .jsd-tree-widget-count {
        flex: 0 0 auto;
        font-size: 0.85em;
      }
      .jsd-tree-map {
        display: block;
        width: 100%;
        height: ${state.config.widgetSize.mapHeight}px;
        border-bottom: 1px solid currentColor;
      }
      .jsd-tree-buttons {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 4px;
        padding: 6px;
      }
      .jsd-tree-btn {
        appearance: none;
        -webkit-appearance: none;
        border: 1px solid currentColor;
        background: transparent;
        color: inherit;
        padding: 4px 0;
        line-height: 1;
        cursor: pointer;
        font: inherit;
      }
      .jsd-tree-btn:focus-visible {
        outline: 1px solid currentColor;
        outline-offset: 1px;
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

  function parseSlides(target) {
    const nodes = Array.from(target.childNodes);
    const majors = [];

    function createMajor(title) {
      return {
        title: (title || '').trim(),
        seenFirstH2: false,
        subs: []
      };
    }

    function createSub(title) {
      return {
        title: (title || '').trim(),
        nodes: []
      };
    }

    let currentMajor = null;
    let currentSub = null;

    nodes.forEach(function (node) {
      const isElement = node.nodeType === Node.ELEMENT_NODE;
      const tag = isElement ? node.tagName.toUpperCase() : '';

      if (tag === 'H1') {
        currentMajor = createMajor(node.textContent || '');
        majors.push(currentMajor);
        currentSub = null;
        return;
      }

      if (tag === 'H2') {
        if (!currentMajor) return;
        currentMajor.seenFirstH2 = true;
        currentSub = createSub(node.textContent || '');
        currentMajor.subs.push(currentSub);
        return;
      }

      if (!currentMajor || !currentMajor.seenFirstH2 || !currentSub) {
        return;
      }

      currentSub.nodes.push(node.cloneNode(true));
    });

    const validMajors = majors.filter(function (major) {
      return major.subs.length > 0;
    }).map(function (major) {
      return {
        title: major.title,
        subs: major.subs
      };
    });

    return {
      majors: validMajors,
      totalSlides: validMajors.reduce(function (sum, major) {
        return sum + major.subs.length;
      }, 0)
    };
  }

  function randomAnimClass() {
    const names = ['jsd-slide-anim-fade', 'jsd-slide-anim-up', 'jsd-slide-anim-zoom'];
    return names[Math.floor(Math.random() * names.length)];
  }

  function getCurrentMajor() {
    return state.data.majors[state.currentMajor];
  }

  function getSlideCountInMajor(majorIndex) {
    const major = state.data.majors[majorIndex];
    return major ? major.subs.length : 0;
  }

  function getCurrentSlideData() {
    const major = getCurrentMajor();
    const slideCountInMajor = getSlideCountInMajor(state.currentMajor);
    const sub = major.subs[state.currentSlide];
    return {
      heading: sub ? sub.title : '',
      nodes: sub ? sub.nodes : [],
      slideType: 'sub',
      majorTitle: major.title,
      slideIndexInMajor: state.currentSlide + 1,
      slideCountInMajor: slideCountInMajor
    };
  }

  function makeNodeFragment(nodes) {
    const fragment = document.createDocumentFragment();
    nodes.forEach(function (node) {
      fragment.appendChild(node.cloneNode(true));
    });
    return fragment;
  }

  function getGlobalIndex(majorIndex, slideIndex) {
    let count = 0;
    for (let i = 0; i < majorIndex; i += 1) {
      count += getSlideCountInMajor(i);
    }
    return count + slideIndex;
  }

  function setByGlobalIndex(globalIndex) {
    const total = state.data.totalSlides;
    let normalized = globalIndex % total;
    if (normalized < 0) normalized += total;

    let offset = 0;
    for (let m = 0; m < state.data.majors.length; m += 1) {
      const count = getSlideCountInMajor(m);
      if (normalized < offset + count) {
        state.currentMajor = m;
        state.currentSlide = normalized - offset;
        return;
      }
      offset += count;
    }
  }

  function goPrevSlide() {
    setByGlobalIndex(getGlobalIndex(state.currentMajor, state.currentSlide) - 1);
    render();
  }

  function goNextSlide() {
    setByGlobalIndex(getGlobalIndex(state.currentMajor, state.currentSlide) + 1);
    render();
  }

  function goPrevMajor() {
    const totalMajors = state.data.majors.length;
    state.currentMajor = (state.currentMajor - 1 + totalMajors) % totalMajors;
    state.currentSlide = 0;
    render();
  }

  function goNextMajor() {
    const totalMajors = state.data.majors.length;
    state.currentMajor = (state.currentMajor + 1) % totalMajors;
    state.currentSlide = 0;
    render();
  }

  function renderMap() {
    const map = state.dom.map;
    const width = state.config.widgetSize.width;
    const height = state.config.widgetSize.mapHeight;
    const padX = 16;
    const padY = 18;
    const rowGap = state.data.majors.length > 1
      ? Math.max(24, (height - padY * 2) / (state.data.majors.length - 1))
      : 0;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');

    state.data.majors.forEach(function (major, mIndex) {
      const y = padY + rowGap * mIndex;
      const slideCount = major.subs.length > 0 ? major.subs.length : 1;
      const usableWidth = width - padX * 2;
      const step = slideCount > 1 ? usableWidth / (slideCount - 1) : 0;

      if (mIndex < state.data.majors.length - 1) {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', padX);
        line.setAttribute('y1', y);
        line.setAttribute('x2', padX);
        line.setAttribute('y2', y + rowGap);
        line.setAttribute('stroke', 'currentColor');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('opacity', '0.65');
        svg.appendChild(line);
      }

      if (slideCount > 1) {
        const hLine = document.createElementNS(svgNS, 'line');
        hLine.setAttribute('x1', padX);
        hLine.setAttribute('y1', y);
        hLine.setAttribute('x2', padX + step * (slideCount - 1));
        hLine.setAttribute('y2', y);
        hLine.setAttribute('stroke', 'currentColor');
        hLine.setAttribute('stroke-width', '1');
        hLine.setAttribute('opacity', '0.4');
        svg.appendChild(hLine);
      }

      for (let sIndex = 0; sIndex < slideCount; sIndex += 1) {
        const x = padX + step * sIndex;
        const current = mIndex === state.currentMajor && sIndex === state.currentSlide;
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('stroke', 'currentColor');
        circle.setAttribute('vector-effect', 'non-scaling-stroke');

        if (sIndex === 0) {
          circle.setAttribute('r', current ? '6.5' : '5.2');
          circle.setAttribute('fill', 'transparent');
          circle.setAttribute('stroke-width', current ? '2' : '1.4');
        } else {
          circle.setAttribute('r', current ? '4.8' : '3.4');
          circle.setAttribute('fill', 'currentColor');
          circle.setAttribute('stroke-width', current ? '1.6' : '1');
        }
        circle.setAttribute('opacity', current ? '1' : '0.8');
        svg.appendChild(circle);
      }
    });

    map.innerHTML = '';
    map.appendChild(svg);
  }

  function renderWidgetTitle(slideData) {
    const title = slideData.majorTitle || 'Section';
    const countText = slideData.slideIndexInMajor + '/' + slideData.slideCountInMajor;
    state.dom.widgetTitle.textContent = title;
    state.dom.widgetCount.textContent = countText;
  }

  function render() {
    if (!state.data || !state.dom.heading || !state.dom.body) return;

    const slideData = getCurrentSlideData();
    state.dom.heading.textContent = slideData.heading || '';
    state.dom.body.innerHTML = '';
    state.dom.body.appendChild(makeNodeFragment(slideData.nodes));

    const animClass = randomAnimClass();
    state.dom.body.classList.remove('jsd-slide-anim-fade', 'jsd-slide-anim-up', 'jsd-slide-anim-zoom');
    void state.dom.body.offsetWidth;
    state.dom.body.classList.add(animClass);

    renderWidgetTitle(slideData);
    renderMap();
  }

  function onKeyDown(event) {
    if (!state.data) return;
    const tag = event.target && event.target.tagName ? event.target.tagName.toUpperCase() : '';
    const isInput = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (event.target && event.target.isContentEditable);
    if (isInput) return;

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      goPrevMajor();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrevSlide();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNextSlide();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      goNextMajor();
    }
  }

  function startDrag(event) {
    if (event.button !== 0 && event.pointerType !== 'touch') return;
    const widget = state.dom.widget;
    const rect = widget.getBoundingClientRect();
    state.drag = {
      startX: event.clientX,
      startY: event.clientY,
      left: rect.left,
      top: rect.top
    };
    widget.classList.add('is-active');
    widget.style.left = rect.left + 'px';
    widget.style.top = rect.top + 'px';
    widget.style.right = 'auto';
    widget.style.bottom = 'auto';
    try { state.dom.widgetHeader.setPointerCapture(event.pointerId); } catch (e) { /* ignore */ }
  }

  function duringDrag(event) {
    if (!state.drag) return;
    const dx = event.clientX - state.drag.startX;
    const dy = event.clientY - state.drag.startY;
    const left = state.drag.left + dx;
    const top = state.drag.top + dy;
    state.dom.widget.style.left = left + 'px';
    state.dom.widget.style.top = top + 'px';
  }

  function endDrag(event) {
    if (!state.drag) return;
    try { state.dom.widgetHeader.releasePointerCapture(event.pointerId); } catch (e) { /* ignore */ }
    state.drag = null;
    state.dom.widget.classList.remove('is-active');
  }

  function buildDOM(target) {
    state.originalHTML = target.innerHTML;
    target.innerHTML = '';

    const root = document.createElement('div');
    root.className = 'jsd-tree-root';

    const heading = document.createElement('div');
    heading.className = 'jsd-heading';

    const body = document.createElement('div');
    body.className = 'jsd-slide-body';

    root.appendChild(heading);
    root.appendChild(body);
    target.appendChild(root);

    const widget = document.createElement('div');
    widget.className = 'jsd-tree-widget';

    const widgetHeader = document.createElement('div');
    widgetHeader.className = 'jsd-tree-widget-header';

    const widgetTitle = document.createElement('div');
    widgetTitle.className = 'jsd-tree-widget-title';

    const widgetCount = document.createElement('div');
    widgetCount.className = 'jsd-tree-widget-count';

    widgetHeader.appendChild(widgetTitle);
    widgetHeader.appendChild(widgetCount);

    const map = document.createElement('div');
    map.className = 'jsd-tree-map';

    const buttons = document.createElement('div');
    buttons.className = 'jsd-tree-buttons';

    const prevMajorBtn = document.createElement('button');
    prevMajorBtn.type = 'button';
    prevMajorBtn.className = 'jsd-tree-btn';
    prevMajorBtn.textContent = state.config.labels.prevMajor;
    prevMajorBtn.addEventListener('click', goPrevMajor);

    const prevSlideBtn = document.createElement('button');
    prevSlideBtn.type = 'button';
    prevSlideBtn.className = 'jsd-tree-btn';
    prevSlideBtn.textContent = state.config.labels.prevSlide;
    prevSlideBtn.addEventListener('click', goPrevSlide);

    const nextSlideBtn = document.createElement('button');
    nextSlideBtn.type = 'button';
    nextSlideBtn.className = 'jsd-tree-btn';
    nextSlideBtn.textContent = state.config.labels.nextSlide;
    nextSlideBtn.addEventListener('click', goNextSlide);

    const nextMajorBtn = document.createElement('button');
    nextMajorBtn.type = 'button';
    nextMajorBtn.className = 'jsd-tree-btn';
    nextMajorBtn.textContent = state.config.labels.nextMajor;
    nextMajorBtn.addEventListener('click', goNextMajor);

    buttons.appendChild(prevMajorBtn);
    buttons.appendChild(prevSlideBtn);
    buttons.appendChild(nextSlideBtn);
    buttons.appendChild(nextMajorBtn);

    widget.appendChild(widgetHeader);
    widget.appendChild(map);
    widget.appendChild(buttons);
    document.body.appendChild(widget);

    widgetHeader.addEventListener('pointerdown', startDrag);
    window.addEventListener('pointermove', duringDrag);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    state.dom = {
      root: root,
      heading: heading,
      body: body,
      widget: widget,
      widgetHeader: widgetHeader,
      widgetTitle: widgetTitle,
      widgetCount: widgetCount,
      map: map,
      buttons: buttons,
      prevMajorBtn: prevMajorBtn,
      prevSlideBtn: prevSlideBtn,
      nextSlideBtn: nextSlideBtn,
      nextMajorBtn: nextMajorBtn
    };
  }

  function cleanupDOM() {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('pointermove', duringDrag);
    window.removeEventListener('pointerup', endDrag);
    window.removeEventListener('pointercancel', endDrag);
    if (state.dom.widget && state.dom.widget.parentNode) {
      state.dom.widget.parentNode.removeChild(state.dom.widget);
    }
    const style = document.getElementById('jsd-tree-style');
    if (style) style.remove();
    state.dom = {};
  }

  function restoreOriginalIfNeeded() {
    if (state.target && typeof state.originalHTML === 'string' && state.originalHTML !== '') {
      state.target.innerHTML = state.originalHTML;
    }
  }

  function rebuild(nextConfig) {
    if (nextConfig) merge(state.config, nextConfig);
    cleanupDOM();
    restoreOriginalIfNeeded();

    state.target = findTarget();
    if (!state.target) return false;

    state.data = parseSlides(state.target);
    if (!state.data || !state.data.majors.length || !state.data.totalSlides) {
      state.data = null;
      return false;
    }

    state.currentMajor = 0;
    state.currentSlide = 0;

    injectStyle();
    buildDOM(state.target);
    render();
    window.addEventListener('keydown', onKeyDown);
    return true;
  }

  function destroy() {
    cleanupDOM();
    restoreOriginalIfNeeded();
    state.target = null;
    state.data = null;
  }

  function updateTreeConfig(nextConfig) {
    return rebuild(nextConfig);
  }

  window.JSDTreeSlides = {
    rebuild: rebuild,
    destroy: destroy,
    getState: function () {
      return {
        currentMajor: state.currentMajor,
        currentSlide: state.currentSlide,
        totalMajors: state.data ? state.data.majors.length : 0,
        totalSlides: state.data ? state.data.totalSlides : 0
      };
    },
    getConfig: function () {
      return deepClone(state.config);
    }
  };

  window.updateTreeConfig = updateTreeConfig;

  function boot() {
    rebuild();
    window.addEventListener('resize', function () {
      if (!state.data) return;
      injectStyle();
      render();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
