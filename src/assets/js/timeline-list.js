(function (window, document) {
  'use strict';

  if (!window || !document) return;

  var STYLE_ID = 'jekyll-timeline-styles';
  var INSTANCE_CLASS = 'jtimeline';
  var DEFAULT_SELECTOR = '[data-timeline], .js-timeline';

  var BASE_DEFAULTS = {
    selector: DEFAULT_SELECTOR,
    autoInit: true,
    fallbackTitlePrefix: '事件 '
  };

  var AUTO_INIT_OPTIONS = {
    summaryWidth: '11%',
    gap: '1rem',
    axisWidth: '1.15rem',
    lineWidth: '2px',
    detailRadius: '14px',
    detailPadding: '0.62rem 0.78rem',
    detailGroupGap: '0.48rem',
    leftTitleMinHeight: '2.2rem',
    summaryTopLineOffset: '0.2rem',
    summaryTopLineGap: '0.36rem',
    summaryTopLineWidth: '1px',
    boxConnectorWidth: '1px',
    boxConnectorBallSize: '0.52rem',
    lineColor: 'rgba(120, 150, 180, 0.34)',
    detailColorMode: 'random', // 'sequential' | 'random'
    palette: [
      { name: 'lake-blue', accent: '#58b7d8', accentSoft: 'rgba(88, 183, 216, 0.12)', accentBgStrong: 'rgba(88, 183, 216, 0.16)' },
      { name: 'royal-blue', accent: '#5a8dee', accentSoft: 'rgba(90, 141, 238, 0.11)', accentBgStrong: 'rgba(90, 141, 238, 0.15)' },
      { name: 'ink-blue', accent: '#4f7ac8', accentSoft: 'rgba(79, 122, 200, 0.11)', accentBgStrong: 'rgba(79, 122, 200, 0.15)' },
      { name: 'teal-cyan', accent: '#42bfb7', accentSoft: 'rgba(66, 191, 183, 0.11)', accentBgStrong: 'rgba(66, 191, 183, 0.15)' },
      { name: 'deep-cyan', accent: '#3da7c7', accentSoft: 'rgba(61, 167, 199, 0.11)', accentBgStrong: 'rgba(61, 167, 199, 0.15)' },
      { name: 'sea-glass', accent: '#69c3a5', accentSoft: 'rgba(105, 195, 165, 0.10)', accentBgStrong: 'rgba(105, 195, 165, 0.14)' },
      { name: 'emerald-mist', accent: '#54b887', accentSoft: 'rgba(84, 184, 135, 0.10)', accentBgStrong: 'rgba(84, 184, 135, 0.14)' },
      { name: 'olive-sage', accent: '#7ea66a', accentSoft: 'rgba(126, 166, 106, 0.10)', accentBgStrong: 'rgba(126, 166, 106, 0.14)' },
      { name: 'mist-indigo', accent: '#7c9cff', accentSoft: 'rgba(124, 156, 255, 0.11)', accentBgStrong: 'rgba(124, 156, 255, 0.15)' },
      { name: 'aurora-violet', accent: '#a283ff', accentSoft: 'rgba(162, 131, 255, 0.10)', accentBgStrong: 'rgba(162, 131, 255, 0.14)' },
      { name: 'iris-purple', accent: '#8f7ae6', accentSoft: 'rgba(143, 122, 230, 0.10)', accentBgStrong: 'rgba(143, 122, 230, 0.14)' },
      { name: 'orchid', accent: '#b67bd6', accentSoft: 'rgba(182, 123, 214, 0.10)', accentBgStrong: 'rgba(182, 123, 214, 0.14)' },
      { name: 'rose-quartz', accent: '#d684a2', accentSoft: 'rgba(214, 132, 162, 0.10)', accentBgStrong: 'rgba(214, 132, 162, 0.14)' },
      { name: 'berry-rose', accent: '#c96d8f', accentSoft: 'rgba(201, 109, 143, 0.10)', accentBgStrong: 'rgba(201, 109, 143, 0.14)' },
      { name: 'coral-red', accent: '#d97a6c', accentSoft: 'rgba(217, 122, 108, 0.10)', accentBgStrong: 'rgba(217, 122, 108, 0.14)' },
      { name: 'ruby-red', accent: '#c96878', accentSoft: 'rgba(201, 104, 120, 0.10)', accentBgStrong: 'rgba(201, 104, 120, 0.14)' },
      { name: 'amber-gold', accent: '#cfa45f', accentSoft: 'rgba(207, 164, 95, 0.10)', accentBgStrong: 'rgba(207, 164, 95, 0.14)' },
      { name: 'champagne-gold', accent: '#bda36e', accentSoft: 'rgba(189, 163, 110, 0.10)', accentBgStrong: 'rgba(189, 163, 110, 0.14)' },
      { name: 'bronze-copper', accent: '#b88366', accentSoft: 'rgba(184, 131, 102, 0.10)', accentBgStrong: 'rgba(184, 131, 102, 0.14)' },
      { name: 'frost-silver', accent: '#6ea9c7', accentSoft: 'rgba(110, 169, 199, 0.10)', accentBgStrong: 'rgba(110, 169, 199, 0.14)' },
      { name: 'slate-gray', accent: '#7d90a6', accentSoft: 'rgba(125, 144, 166, 0.10)', accentBgStrong: 'rgba(125, 144, 166, 0.14)' },
      { name: 'graphite', accent: '#8391a3', accentSoft: 'rgba(131, 145, 163, 0.10)', accentBgStrong: 'rgba(131, 145, 163, 0.14)' }
    ]
  };

  function extend() {
    var out = {};
    for (var i = 0; i < arguments.length; i += 1) {
      var obj = arguments[i] || {};
      Object.keys(obj).forEach(function (key) {
        out[key] = obj[key];
      });
    }
    return out;
  }

  function toArray(listLike) {
    return Array.prototype.slice.call(listLike || []);
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.' + INSTANCE_CLASS + ' {',
      '  --jt-summary-width: 11%;',
      '  --jt-gap: 1rem;',
      '  --jt-axis-width: 1.15rem;',
      '  --jt-line-width: 2px;',
      '  --jt-detail-radius: 14px;',
      '  --jt-detail-padding: 0.62rem 0.78rem;',
      '  --jt-detail-group-gap: 0.48rem;',
      '  --jt-left-title-min-height: 2.2rem;',
      '  --jt-summary-top-line-offset: 0.2rem;',
      '  --jt-summary-top-line-gap: 0.36rem;',
      '  --jt-summary-top-line-width: 1px;',
      '  --jt-box-connector-width: 1px;',
      '  --jt-box-connector-ball-size: 0.52rem;',
      '  --jt-line-color: rgba(120, 150, 180, 0.34);',
      '  position: relative;',
      '  display: grid;',
      '  gap: 0.82rem;',
      '  margin: 1.5rem 0;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '::before {',
      "  content: '';",
      '  position: absolute;',
      '  top: 0.55rem;',
      '  bottom: 0.55rem;',
      '  left: calc(var(--jt-summary-width) + var(--jt-gap) + (var(--jt-axis-width) / 2) - (var(--jt-line-width) / 2));',
      '  width: var(--jt-line-width);',
      '  background: var(--jt-line-color);',
      '  pointer-events: none;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__event {',
      '  --jt-event-accent: #58b7d8;',
      '  --jt-event-soft: rgba(88, 183, 216, 0.12);',
      '  --jt-event-bg-strong: rgba(88, 183, 216, 0.16);',
      '  position: relative;',
      '  display: grid;',
      '  grid-template-columns: minmax(4rem, var(--jt-summary-width)) var(--jt-axis-width) minmax(0, 1fr);',
      '  column-gap: var(--jt-gap);',
      '  align-items: stretch;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__summary {',
      '  position: relative;',
      '  min-height: var(--jt-left-title-min-height);',
      '  height: 100%;',
      '  display: flex;',
      '  align-items: flex-start;',
      '  justify-content: flex-start;',
      '  align-self: stretch;',
      '  text-align: left;',
      '  font-weight: 700;',
      '  font-size: clamp(0.92rem, 0.88rem + 0.18vw, 1.04rem);',
      '  line-height: 1.45;',
      '  letter-spacing: 0.01em;',
      '  color: var(--jt-event-accent);',
      '  padding-top: calc(var(--jt-summary-top-line-offset) + var(--jt-summary-top-line-gap));',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__summary::before {',
      "  content: '';",
      '  position: absolute;',
      '  top: var(--jt-summary-top-line-offset);',
      '  left: 0;',
      '  right: 0;',
      '  height: var(--jt-summary-top-line-width);',
      '  background: var(--jt-line-color);',
      '  opacity: 0.9;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__summary > *:first-child {',
      '  margin-top: 0;',
      '  margin-bottom: 0;',
      '  width: 100%;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__summary strong {',
      '  font-weight: 800;',
      '  font-size: inherit;',
      '  color: inherit;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__axis {',
      '  position: relative;',
      '  min-height: 100%;',
      '  align-self: stretch;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__details {',
      '  min-width: 0;',
      '  display: grid;',
      '  gap: var(--jt-detail-group-gap);',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-box {',
      '  position: relative;',
      '  min-width: 0;',
      '  padding: var(--jt-detail-padding);',
      '  border: 1px solid var(--jt-event-accent);',
      '  border-radius: var(--jt-detail-radius);',
      '  background: linear-gradient(180deg, var(--jt-event-soft), var(--jt-event-bg-strong));',
      '  color: var(--jt-event-accent);',
      '  box-shadow: 0 0 0 1px rgba(255,255,255,0.04) inset;',
      '  backdrop-filter: blur(8px);',
      '  -webkit-backdrop-filter: blur(8px);',
      '  overflow: visible;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-box::before {',
      "  content: '';",
      '  position: absolute;',
      '  top: 50%;',
      '  left: calc(-1 * (var(--jt-gap) + (var(--jt-axis-width) / 2)));',
      '  width: calc(var(--jt-gap) + (var(--jt-axis-width) / 2));',
      '  height: var(--jt-box-connector-width);',
      '  transform: translateY(-50%);',
      '  background: var(--jt-line-color);',
      '  opacity: 0.95;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-box::after {',
      "  content: '';",
      '  position: absolute;',
      '  top: 50%;',
      '  left: calc(-1 * (var(--jt-gap) + (var(--jt-axis-width) / 2) + (var(--jt-box-connector-ball-size) / 2)));',
      '  width: var(--jt-box-connector-ball-size);',
      '  height: var(--jt-box-connector-ball-size);',
      '  transform: translateY(-50%);',
      '  border-radius: 999px;',
      '  background: var(--jt-line-color);',
      '  box-shadow: 0 0 0 1px rgba(255,255,255,0.04);',
      '  opacity: 0.95;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-box > :first-child {',
      '  margin-top: 0;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-box > :last-child {',
      '  margin-bottom: 0;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-root-list {',
      '  margin: 0;',
      '  padding-left: 0;',
      '  list-style: none;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-root-item {',
      '  margin: 0;',
      '  list-style: none;',
      '  color: inherit;',
      '  font-weight: 700;',
      '  line-height: 1.62;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-root-item::marker {',
      '  content: "";',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-root-item > ul,',
      '.' + INSTANCE_CLASS + '__detail-root-item > ol {',
      '  margin: 0.34rem 0 0 0;',
      '  padding-left: 1.2rem;',
      '  list-style-position: outside;',
      '  font-weight: 400;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-root-item > ul > li,',
      '.' + INSTANCE_CLASS + '__detail-root-item > ol > li {',
      '  margin: 0.24rem 0;',
      '  font-weight: 400;',
      '  line-height: 1.62;',
      '  list-style: inherit;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-box p,',
      '.' + INSTANCE_CLASS + '__detail-box span,',
      '.' + INSTANCE_CLASS + '__detail-box strong,',
      '.' + INSTANCE_CLASS + '__detail-box em,',
      '.' + INSTANCE_CLASS + '__detail-box b,',
      '.' + INSTANCE_CLASS + '__detail-box i,',
      '.' + INSTANCE_CLASS + '__detail-box small,',
      '.' + INSTANCE_CLASS + '__detail-box div,',
      '.' + INSTANCE_CLASS + '__detail-box h1,',
      '.' + INSTANCE_CLASS + '__detail-box h2,',
      '.' + INSTANCE_CLASS + '__detail-box h3,',
      '.' + INSTANCE_CLASS + '__detail-box h4,',
      '.' + INSTANCE_CLASS + '__detail-box h5,',
      '.' + INSTANCE_CLASS + '__detail-box h6 {',
      '  color: inherit;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-box a {',
      '  color: inherit;',
      '  text-decoration-color: currentColor;',
      '  text-underline-offset: 0.14em;',
      '  text-decoration-thickness: 1px;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-box code {',
      '  color: inherit;',
      '  border: 1px solid currentColor;',
      '  border-radius: 0.36rem;',
      '  background: rgba(255,255,255,0.04);',
      '  padding: 0.06rem 0.34rem;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-box pre {',
      '  color: inherit;',
      '  border: 1px solid currentColor;',
      '  border-radius: 0.62rem;',
      '  background: rgba(255,255,255,0.04);',
      '  padding: 0.72rem 0.82rem;',
      '  overflow: auto;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-box pre code {',
      '  border: 0;',
      '  background: transparent;',
      '  padding: 0;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-box blockquote {',
      '  color: inherit;',
      '  border-left: 3px solid currentColor;',
      '  margin: 0.55rem 0;',
      '  padding-left: 0.7rem;',
      '  opacity: 0.95;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-box table {',
      '  width: 100%;',
      '  border-collapse: collapse;',
      '  color: inherit;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '__detail-box th,',
      '.' + INSTANCE_CLASS + '__detail-box td {',
      '  color: inherit;',
      '  border: 1px solid color-mix(in srgb, currentColor 50%, transparent 50%);',
      '  padding: 0.38rem 0.48rem;',
      '}',
      '',
      '.' + INSTANCE_CLASS + '[data-jt-empty-details="true"] .' + INSTANCE_CLASS + '__details {',
      '  display: none;',
      '}',
      '',
      '@media (max-width: 780px) {',
      '  .' + INSTANCE_CLASS + '::before {',
      '    left: calc((var(--jt-axis-width) / 2) - (var(--jt-line-width) / 2));',
      '  }',
      '',
      '  .' + INSTANCE_CLASS + '__event {',
      '    grid-template-columns: var(--jt-axis-width) minmax(0, 1fr);',
      '    row-gap: 0.34rem;',
      '  }',
      '',
      '  .' + INSTANCE_CLASS + '__summary {',
      '    grid-column: 2;',
      '    grid-row: 1;',
      '    min-height: auto;',
      '  }',
      '',
      '  .' + INSTANCE_CLASS + '__axis {',
      '    grid-column: 1;',
      '    grid-row: 1 / span 2;',
      '  }',
      '',
      '  .' + INSTANCE_CLASS + '__details {',
      '    grid-column: 2;',
      '    grid-row: 2;',
      '  }',
      '',
      '  .' + INSTANCE_CLASS + '__detail-box::before {',
      '    left: calc(-1 * (var(--jt-gap) + (var(--jt-axis-width) / 2)));',
      '    width: calc(var(--jt-gap) + (var(--jt-axis-width) / 2));',
      '  }',
      '',
      '  .' + INSTANCE_CLASS + '__detail-box::after {',
      '    left: calc(-1 * (var(--jt-gap) + (var(--jt-axis-width) / 2) + (var(--jt-box-connector-ball-size) / 2)));',
      '  }',
      '}',
      '',
      '@supports not (color: color-mix(in srgb, white 50%, black 50%)) {',
      '  .' + INSTANCE_CLASS + '__detail-box th,',
      '  .' + INSTANCE_CLASS + '__detail-box td {',
      '    border-color: currentColor;',
      '  }',
      '}',
      ''
    ].join('\n');

    document.head.appendChild(style);
  }

  function isTimelineMarker(el) {
    if (!el) return false;
    if (el.childElementCount > 0) return false;
    return /^timeline:\s*$/i.test((el.textContent || '').trim());
  }

  function normalizeContainers(selectorOrElements) {
    if (!selectorOrElements) {
      return toArray(document.querySelectorAll(DEFAULT_SELECTOR));
    }

    if (typeof selectorOrElements === 'string') {
      return toArray(document.querySelectorAll(selectorOrElements));
    }

    if (selectorOrElements instanceof Element) {
      return [selectorOrElements];
    }

    if (selectorOrElements.length) {
      return toArray(selectorOrElements);
    }

    return [];
  }

  function getEligibleLists(container) {
    var results = [];

    if (!container) return results;

    if ((container.tagName === 'UL' || container.tagName === 'OL') && isTimelineMarker(container.previousElementSibling)) {
      results.push({
        marker: container.previousElementSibling,
        list: container
      });
      return results;
    }

    var nodes = toArray(container.querySelectorAll('*'));
    nodes.forEach(function (node) {
      if (!isTimelineMarker(node)) return;
      var next = node.nextElementSibling;
      if (!next) return;
      if (next.tagName !== 'UL' && next.tagName !== 'OL') return;
      results.push({
        marker: node,
        list: next
      });
    });

    return results;
  }

  function getDirectChildLists(li) {
    return toArray(li.children).filter(function (el) {
      return el.tagName === 'UL' || el.tagName === 'OL';
    });
  }

  function createFragmentFromNodes(nodes) {
    var frag = document.createDocumentFragment();
    nodes.forEach(function (node) {
      frag.appendChild(node.cloneNode(true));
    });
    return frag;
  }

  function getSummaryNodes(li) {
    var summaryNodes = [];

    toArray(li.childNodes).forEach(function (node) {
      if (node.nodeType === 1 && (node.tagName === 'UL' || node.tagName === 'OL')) return;
      if (node.nodeType === 3 && !node.textContent.trim()) return;
      summaryNodes.push(node);
    });

    return summaryNodes;
  }

  function buildSummary(li, index, options) {
    var summary = document.createElement('div');
    summary.className = INSTANCE_CLASS + '__summary';

    var summaryNodes = getSummaryNodes(li);

    if (!summaryNodes.length) {
      var strong = document.createElement('strong');
      strong.textContent = options.fallbackTitlePrefix + String(index + 1);
      summary.appendChild(strong);
      return summary;
    }

    var wrapper = document.createElement('div');
    wrapper.appendChild(createFragmentFromNodes(summaryNodes));

    if (!wrapper.querySelector('strong')) {
      var strongWrap = document.createElement('strong');
      while (wrapper.firstChild) {
        strongWrap.appendChild(wrapper.firstChild);
      }
      wrapper.appendChild(strongWrap);
    }

    summary.appendChild(wrapper);
    return summary;
  }

  function buildAxis() {
    var axis = document.createElement('div');
    axis.className = INSTANCE_CLASS + '__axis';
    return axis;
  }

  function buildDetails(li) {
    var details = document.createElement('div');
    details.className = INSTANCE_CLASS + '__details';

    var childLists = getDirectChildLists(li);
    if (!childLists.length) return details;

    childLists.forEach(function (list) {
      var childItems = toArray(list.children).filter(function (child) {
        return child.tagName === 'LI';
      });

      if (!childItems.length) return;

      childItems.forEach(function (item) {
        var box = document.createElement('div');
        box.className = INSTANCE_CLASS + '__detail-box';

        var rootList = document.createElement('ul');
        rootList.className = INSTANCE_CLASS + '__detail-root-list';

        var clonedItem = item.cloneNode(true);
        clonedItem.classList.add(INSTANCE_CLASS + '__detail-root-item');

        rootList.appendChild(clonedItem);
        box.appendChild(rootList);
        details.appendChild(box);
      });
    });

    return details;
  }

  function applyTimelineVars(root, options) {
    root.style.setProperty('--jt-summary-width', options.summaryWidth);
    root.style.setProperty('--jt-gap', options.gap);
    root.style.setProperty('--jt-axis-width', options.axisWidth);
    root.style.setProperty('--jt-line-width', options.lineWidth);
    root.style.setProperty('--jt-detail-radius', options.detailRadius);
    root.style.setProperty('--jt-detail-padding', options.detailPadding);
    root.style.setProperty('--jt-detail-group-gap', options.detailGroupGap);
    root.style.setProperty('--jt-left-title-min-height', options.leftTitleMinHeight);
    root.style.setProperty('--jt-summary-top-line-offset', options.summaryTopLineOffset);
    root.style.setProperty('--jt-summary-top-line-gap', options.summaryTopLineGap);
    root.style.setProperty('--jt-summary-top-line-width', options.summaryTopLineWidth);
    root.style.setProperty('--jt-box-connector-width', options.boxConnectorWidth);
    root.style.setProperty('--jt-box-connector-ball-size', options.boxConnectorBallSize);
    root.style.setProperty('--jt-line-color', options.lineColor);
  }

  function applyEventTheme(event, theme) {
    event.style.setProperty('--jt-event-accent', theme.accent);
    event.style.setProperty('--jt-event-soft', theme.accentSoft || 'rgba(88, 183, 216, 0.12)');
    event.style.setProperty('--jt-event-bg-strong', theme.accentBgStrong || 'rgba(88, 183, 216, 0.16)');
  }

  function pickTheme(options, state) {
    var palette = options.palette || [];
    if (!palette.length) {
      return {
        theme: {
          accent: '#58b7d8',
          accentSoft: 'rgba(88, 183, 216, 0.12)',
          accentBgStrong: 'rgba(88, 183, 216, 0.16)'
        },
        index: 0
      };
    }

    var mode = String(options.detailColorMode || 'sequential').toLowerCase();
    var index;

    if (mode === 'random') {
      if (palette.length === 1) {
        index = 0;
      } else {
        do {
          index = Math.floor(Math.random() * palette.length);
        } while (index === state.lastThemeIndex);
      }
    } else {
      index = state.themeCursor % palette.length;
      state.themeCursor += 1;
    }

    state.lastThemeIndex = index;
    return {
      theme: palette[index],
      index: index
    };
  }

  function transformList(list, marker, options, state) {
    if (!list || list.dataset.timelineProcessed === 'true') return null;

    var items = toArray(list.children).filter(function (child) {
      return child.tagName === 'LI';
    });

    if (!items.length) return null;

    var timeline = document.createElement('section');
    timeline.className = INSTANCE_CLASS;
    timeline.dataset.timelineProcessed = 'true';
    applyTimelineVars(timeline, options);

    var hasAnyDetails = false;

    items.forEach(function (li, itemIndex) {
      var event = document.createElement('article');
      event.className = INSTANCE_CLASS + '__event';

      var summary = buildSummary(li, itemIndex, options);
      var axis = buildAxis();
      var details = buildDetails(li);
      var picked = pickTheme(options, state);

      applyEventTheme(event, picked.theme);

      if (details.children.length) hasAnyDetails = true;

      event.appendChild(summary);
      event.appendChild(axis);
      event.appendChild(details);

      timeline.appendChild(event);
    });

    timeline.dataset.jtEmptyDetails = hasAnyDetails ? 'false' : 'true';

    list.replaceWith(timeline);
    if (marker && marker.parentNode) {
      marker.parentNode.removeChild(marker);
    }

    return timeline;
  }

  function init(selectorOrElements, userOptions) {
    injectStyles();

    var options = extend(BASE_DEFAULTS, userOptions || {});
    if (!options.palette || !options.palette.length) {
      options.palette = AUTO_INIT_OPTIONS.palette.slice();
    }

    var containers = normalizeContainers(selectorOrElements || options.selector);
    var transformed = [];
    var state = {
      themeCursor: 0,
      lastThemeIndex: -1
    };

    containers.forEach(function (container) {
      var eligible = getEligibleLists(container);
      eligible.forEach(function (entry) {
        var timeline = transformList(entry.list, entry.marker, options, state);
        if (timeline) {
          transformed.push(timeline);
        }
      });
    });

    return transformed;
  }

  window.JekyllTimeline = {
    init: init,
    defaults: BASE_DEFAULTS,
    initOptions: AUTO_INIT_OPTIONS
  };

  if (BASE_DEFAULTS.autoInit) {
    document.addEventListener('DOMContentLoaded', function () {
      init(BASE_DEFAULTS.selector, AUTO_INIT_OPTIONS);
    });
  }
})(window, document);
