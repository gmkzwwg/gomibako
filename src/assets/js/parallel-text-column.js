/*!
 * parallel-text-columnsjs
 *
 * Introduction:
 *   Rebuilds Markdown/Jekyll content into compact parallel text rows: one body block plus
 *   following blockquotes becomes a multi-column comparison row. Consecutive generated rows
 *   can be separated by a compact <hr> helper line.
 *
 * Usage:
 *   1) Plug-and-play: include this file after the target content or anywhere in the page;
 *      it auto-initializes after DOMContentLoaded.
 *   2) Customize by editing DEFAULT_CONFIG at the top of this file.
 *   3) Customize at runtime with window.parallelTextColumns.updateConfig({...}).
 *   4) Optional pre-load config: window.ParallelTextColumnsConfig = {...} before this file.
 *
 * Global API:
 *   parallelTextColumns.init(options)
 *   parallelTextColumns.updateConfig(options, runtimeOptions)
 *   parallelTextColumns.enable(target?)
 *   parallelTextColumns.disable(target?)
 *   parallelTextColumns.toggle(target?)
 *   parallelTextColumns.refresh(target?)
 *   parallelTextColumns.destroy(target?)
 *   parallelTextColumns.bindToggleButton(buttonTarget, containerTarget?)
 *   parallelTextColumns.setFontSize(fontSize, target?)
 *   parallelTextColumns.setVerticalAlign(verticalAlign, target?)
 *   parallelTextColumns.setColumnRatios(columnRatios, target?)
 *   parallelTextColumns.setCompactText(compactText, target?)
 *   parallelTextColumns.setBlockSpacing(blockSpacing, target?)
 *   parallelTextColumns.getConfig()
 *
 * Notes:
 *   - The script scans direct child elements of each configured content container.
 *   - Tables and their immediately following blockquotes are skipped by default.
 *   - The layout uses CSS Grid; unsupported browsers degrade to normal block flow.
 *   - For strict CSP, pass styleNonce or set injectStyle:false and load the CSS file manually.
 *   - For SSR/hydrated apps, load this after framework hydration or target static content only.
 */

(function (win, doc) {
  'use strict';

  var DEFAULT_CONFIG = {
    selectors: ['.post-content', '.page-content', '.post-body', 'article .content', '.markdown-body'],
    autoEnable: true,
    autoRefresh: false,
    autoRefreshDelay: 80,
    includeHeadings: false,
    skipSelectors: ['table'],
    bodyTags: ['P', 'UL', 'OL', 'DL'],
    headingTags: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
    fontSize: '15px',
    compactText: true,
    verticalAlign: 'start',
    columnGap: '0.85rem',
    mobileColumnGap: '0.45rem',
    blockSpacing: '0.9rem',
    dividerInset: '0.1rem',
    dividerThickness: '1px',
    dividerOpacity: 0.24,
    rowRuleEnabled: true,
    rowRuleMargin: '0.22rem 0',
    rowRuleThickness: '1px',
    rowRuleOpacity: 0.24,
    responsiveBreakpointPx: 900,
    injectStyle: true,
    styleId: 'parallel-text-columns-style',
    styleNonce: '',
    columnRatios: {
      1: [1],
      2: [1.7, 1],
      3: [1.7, 1, 1.3],
      default: [1.7, 1, 1.3]
    }
  };

  var CLASS = {
    scope: 'ptc-scope',
    row: 'ptc-row',
    col: 'ptc-col',
    divider: 'ptc-divider',
    rowRule: 'ptc-row-rule'
  };

  var ATTR = {
    enabled: 'data-ptc-enabled',
    compact: 'data-ptc-compact',
    cols: 'data-ptc-cols',
    ratios: 'data-ptc-ratios'
  };

  var state = {
    initialized: false,
    options: null,
    containers: [],
    resizeBound: false,
    resizeHandler: null,
    loadHandler: null,
    resizeObserver: null,
    mutationObserver: null,
    styleId: null,
    pendingRefresh: [],
    pendingTimer: null
  };

  /* Merge objects into a new object; parameters: one or more source objects. */
  function mergeObjects() {
    var out = {};
    for (var i = 0; i < arguments.length; i += 1) {
      var src = arguments[i];
      if (!src) continue;
      for (var key in src) {
        if (Object.prototype.hasOwnProperty.call(src, key)) out[key] = src[key]; // Shallow merge is intentional.
      }
    }
    return out;
  }

  /* Convert array-like values to arrays; parameters: value. */
  function toArray(value) {
    return Array.prototype.slice.call(value || []);
  }

  /* Return whether a value is a DOM element; parameters: node. */
  function isElement(node) {
    return !!node && node.nodeType === 1;
  }

  /* Return a safe tag name; parameters: node. */
  function tagName(node) {
    return isElement(node) && node.tagName ? String(node.tagName).toUpperCase() : '';
  }

  /* Check for a CSS class without requiring classList; parameters: element, className. */
  function hasClass(el, className) {
    if (!isElement(el)) return false;
    return (' ' + el.className + ' ').indexOf(' ' + className + ' ') !== -1;
  }

  /* Add a CSS class without requiring classList; parameters: element, className. */
  function addClass(el, className) {
    if (!isElement(el) || hasClass(el, className)) return;
    el.className = el.className ? el.className + ' ' + className : className; // Preserve existing classes.
  }

  /* Remove a CSS class without requiring classList; parameters: element, className. */
  function removeClass(el, className) {
    if (!isElement(el)) return;
    el.className = (' ' + el.className + ' ').replace(' ' + className + ' ', ' ').replace(/^\s+|\s+$/g, '');
  }

  /* Match an element against a selector with vendor fallbacks; parameters: element, selector. */
  function matchesSelector(el, selector) {
    if (!isElement(el) || !selector) return false;
    var fn = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    if (!fn) return false;
    try {
      return !!fn.call(el, selector);
    } catch (err) {
      return false; // Invalid selectors are ignored.
    }
  }

  /* Query descendants safely; parameters: root, selector. */
  function safeQueryAll(root, selector) {
    if (!root || !selector || !root.querySelectorAll) return [];
    try {
      return toArray(root.querySelectorAll(selector));
    } catch (err) {
      return []; // Invalid selectors should not break the page.
    }
  }

  /* Normalize a value into a string array; parameters: value, fallback. */
  function normalizeStringArray(value, fallback) {
    var list = Array.isArray(value) ? value.slice() : [value];
    var out = [];
    for (var i = 0; i < list.length; i += 1) {
      if (typeof list[i] === 'string' && list[i].replace(/^\s+|\s+$/g, '')) out.push(list[i].replace(/^\s+|\s+$/g, ''));
    }
    return out.length ? out : fallback.slice();
  }

  /* Normalize tag names into uppercase strings; parameters: value, fallback. */
  function normalizeTagList(value, fallback) {
    var list = normalizeStringArray(value, fallback);
    for (var i = 0; i < list.length; i += 1) list[i] = list[i].toUpperCase(); // Tag matching uses uppercase names.
    return list;
  }

  /* Normalize CSS size values; parameters: value, fallback. */
  function normalizeSize(value, fallback) {
    if (typeof value === 'number' && isFinite(value)) return value + 'px';
    if (typeof value === 'string' && value.replace(/^\s+|\s+$/g, '')) return value.replace(/^\s+|\s+$/g, '');
    return fallback;
  }

  /* Normalize opacity into 0-1 range; parameters: value, fallback. */
  function normalizeOpacity(value, fallback) {
    var n = Number(value);
    if (!isFinite(n)) return fallback;
    if (n < 0) return 0;
    if (n > 1) return 1;
    return n;
  }

  /* Normalize vertical alignment; parameters: value. */
  function normalizeVerticalAlign(value) {
    var v = String(value || 'start').replace(/^\s+|\s+$/g, '').toLowerCase();
    if (v === 'center' || v === 'middle') return 'center';
    if (v === 'end' || v === 'bottom' || v === 'flex-end') return 'flex-end';
    return 'flex-start';
  }

  /* Sanitize ratio arrays; parameters: list. */
  function sanitizeRatios(list) {
    var out = [];
    if (!Array.isArray(list) || !list.length) return [1];
    for (var i = 0; i < list.length; i += 1) {
      var n = Number(list[i]);
      out.push(isFinite(n) && n > 0 ? n : 1);
    }
    return out.length ? out : [1];
  }

  /* Normalize ratio map; parameters: input. */
  function normalizeRatioMap(input) {
    var result = {};
    var key;
    if (Array.isArray(input)) result.default = sanitizeRatios(input);
    else if (input && typeof input === 'object') {
      for (key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key)) result[key] = sanitizeRatios(input[key]);
      }
    }
    if (!result.default) result.default = [1, 1, 1];
    if (!result[1]) result[1] = [1];
    if (!result[2]) result[2] = [1, 1];
    if (!result[3]) result[3] = [1, 1, 1];
    return result;
  }

  /* Resolve column ratios for a row; parameters: count, options. */
  function getRatiosForCount(count, options) {
    var map = options.columnRatios || {};
    var ratios = sanitizeRatios(map[count] || map[String(count)] || map.default || [1]);
    var out = ratios.slice(0, count);
    while (out.length < count) out.push(1); // Missing ratios become equal-weight columns.
    return out;
  }

  /* Return pre-load global config; parameters: none. */
  function getPreloadConfig() {
    return win.ParallelTextColumnsConfig || win.parallelTextColumnsConfig || null;
  }

  /* Normalize all configuration; parameters: input. */
  function normalizeConfig(input) {
    var cfg = mergeObjects(DEFAULT_CONFIG, input || {});
    cfg.selectors = normalizeStringArray(cfg.selectors, DEFAULT_CONFIG.selectors);
    cfg.skipSelectors = normalizeStringArray(cfg.skipSelectors, DEFAULT_CONFIG.skipSelectors);
    cfg.bodyTags = normalizeTagList(cfg.bodyTags, DEFAULT_CONFIG.bodyTags);
    cfg.headingTags = normalizeTagList(cfg.headingTags, DEFAULT_CONFIG.headingTags);
    cfg.fontSize = normalizeSize(cfg.fontSize, DEFAULT_CONFIG.fontSize);
    cfg.columnGap = normalizeSize(cfg.columnGap, DEFAULT_CONFIG.columnGap);
    cfg.mobileColumnGap = normalizeSize(cfg.mobileColumnGap, DEFAULT_CONFIG.mobileColumnGap);
    cfg.blockSpacing = normalizeSize(cfg.blockSpacing, DEFAULT_CONFIG.blockSpacing);
    cfg.dividerInset = normalizeSize(cfg.dividerInset, DEFAULT_CONFIG.dividerInset);
    cfg.dividerThickness = normalizeSize(cfg.dividerThickness, DEFAULT_CONFIG.dividerThickness);
    cfg.rowRuleMargin = normalizeSize(cfg.rowRuleMargin, DEFAULT_CONFIG.rowRuleMargin);
    cfg.rowRuleThickness = normalizeSize(cfg.rowRuleThickness, DEFAULT_CONFIG.rowRuleThickness);
    cfg.dividerOpacity = normalizeOpacity(cfg.dividerOpacity, DEFAULT_CONFIG.dividerOpacity);
    cfg.rowRuleOpacity = normalizeOpacity(cfg.rowRuleOpacity, DEFAULT_CONFIG.rowRuleOpacity);
    cfg.responsiveBreakpointPx = Math.max(1, parseInt(cfg.responsiveBreakpointPx, 10) || DEFAULT_CONFIG.responsiveBreakpointPx);
    cfg.autoRefreshDelay = Math.max(20, parseInt(cfg.autoRefreshDelay, 10) || DEFAULT_CONFIG.autoRefreshDelay);
    cfg.verticalAlign = normalizeVerticalAlign(cfg.verticalAlign);
    cfg.columnRatios = normalizeRatioMap(cfg.columnRatios);
    cfg.autoEnable = cfg.autoEnable !== false;
    cfg.autoRefresh = cfg.autoRefresh === true;
    cfg.includeHeadings = cfg.includeHeadings === true;
    cfg.compactText = cfg.compactText !== false;
    cfg.rowRuleEnabled = cfg.rowRuleEnabled !== false;
    cfg.injectStyle = cfg.injectStyle !== false;
    cfg.styleId = typeof cfg.styleId === 'string' && cfg.styleId.replace(/^\s+|\s+$/g, '') ? cfg.styleId.replace(/^\s+|\s+$/g, '') : DEFAULT_CONFIG.styleId;
    cfg.styleNonce = typeof cfg.styleNonce === 'string' ? cfg.styleNonce : '';
    return cfg;
  }

  /* Run after DOM is parse-ready; parameters: callback. */
  function onReady(callback) {
    if (doc.readyState === 'loading') {
      doc.addEventListener('DOMContentLoaded', callback, false);
      return;
    }
    callback();
  }

  /* Build injected CSS text; parameters: options. */
  function buildCSS(options) {
    var bp = options.responsiveBreakpointPx + 'px';
    return [
      '.' + CLASS.scope + ' {',
      ' --ptc-font-size: 15px;',
      ' --ptc-gap: 0.85rem;',
      ' --ptc-mobile-gap: 0.45rem;',
      ' --ptc-block-spacing: 0.9rem;',
      ' --ptc-divider-inset: 0.1rem;',
      ' --ptc-divider-thickness: 1px;',
      ' --ptc-divider-opacity: 0.24;',
      ' --ptc-row-rule-margin: 0.22rem 0;',
      ' --ptc-row-rule-thickness: 1px;',
      ' --ptc-row-rule-opacity: 0.24;',
      ' --ptc-col-justify: flex-start;',
      '}',
      '.' + CLASS.scope + ' p, .' + CLASS.scope + ' ul, .' + CLASS.scope + ' ol, .' + CLASS.scope + ' dl, .' + CLASS.scope + ' li, .' + CLASS.scope + ' blockquote {',
      ' font-size: var(--ptc-font-size) !important;',
      '}',
      '.' + CLASS.scope + '[' + ATTR.compact + '="true"] p, .' + CLASS.scope + '[' + ATTR.compact + '="true"] ul, .' + CLASS.scope + '[' + ATTR.compact + '="true"] ol, .' + CLASS.scope + '[' + ATTR.compact + '="true"] dl, .' + CLASS.scope + '[' + ATTR.compact + '="true"] li, .' + CLASS.scope + '[' + ATTR.compact + '="true"] blockquote {',
      ' margin: 0 !important;',
      ' padding: 0 !important;',
      ' border: 0 !important;',
      '}',
      '.' + CLASS.scope + '[' + ATTR.compact + '="true"] ul, .' + CLASS.scope + '[' + ATTR.compact + '="true"] ol { list-style-position: inside; }',
      '.' + CLASS.scope + '[' + ATTR.compact + '="true"] li > ul, .' + CLASS.scope + '[' + ATTR.compact + '="true"] li > ol, .' + CLASS.scope + '[' + ATTR.compact + '="true"] li > dl { margin-top: 0 !important; margin-bottom: 0 !important; }',
      '.' + CLASS.scope + '[' + ATTR.compact + '="true"] blockquote > :first-child { margin-top: 0 !important; }',
      '.' + CLASS.scope + '[' + ATTR.compact + '="true"] blockquote > :last-child { margin-bottom: 0 !important; }',
      '.' + CLASS.row + ' {',
      ' display: grid;',
      ' gap: var(--ptc-gap);',
      ' align-items: stretch;',
      ' position: relative;',
      ' margin: 0 !important;',
      '}',
      '.' + CLASS.col + ' {',
      ' min-width: 0;',
      ' position: relative;',
      ' display: flex;',
      ' flex-direction: column;',
      ' justify-content: var(--ptc-col-justify);',
      ' align-self: stretch;',
      '}',
      '.' + CLASS.col + ' > :first-child { margin-top: 0 !important; }',
      '.' + CLASS.col + ' > :last-child { margin-bottom: 0 !important; }',
      '.' + CLASS.divider + ' {',
      ' position: absolute;',
      ' pointer-events: none;',
      ' opacity: var(--ptc-divider-opacity);',
      ' background: repeating-linear-gradient(to bottom, var(--ptc-divider-color, var(--theme-color, var(--accent-color, var(--primary-color, var(--link-color, currentColor))))) 0 2px, transparent 2px 6px);',
      '}',
      '.' + CLASS.scope + ' > * + * { margin-top: var(--ptc-block-spacing) !important; }',
      '.' + CLASS.rowRule + ' {',
      ' display: block;',
      ' height: var(--ptc-row-rule-thickness);',
      ' padding: 0;',
      ' border: 0;',
      ' opacity: var(--ptc-row-rule-opacity, var(--ptc-divider-opacity));',
      ' margin: var(--ptc-row-rule-margin) !important;',
      ' background: repeating-linear-gradient(to right, var(--ptc-divider-color, var(--theme-color, var(--accent-color, var(--primary-color, var(--link-color, currentColor))))) 0 2px, transparent 2px 6px);',
      '}',
      '.' + CLASS.scope + ' > .' + CLASS.row + ' + .' + CLASS.rowRule + ' { margin: var(--ptc-row-rule-margin) !important; }',
      '.' + CLASS.scope + ' > .' + CLASS.rowRule + ' + .' + CLASS.row + ' { margin-top: 0 !important; }',
      '@media (max-width: ' + bp + ') {',
      ' .' + CLASS.row + ' { grid-template-columns: 1fr !important; gap: var(--ptc-mobile-gap); }',
      ' .' + CLASS.divider + ' { background: repeating-linear-gradient(to right, var(--ptc-divider-color, var(--theme-color, var(--accent-color, var(--primary-color, var(--link-color, currentColor))))) 0 2px, transparent 2px 6px); }',
      '}'
    ].join('\n');
  }

  /* Insert or update CSS; parameters: options. */
  function upsertStyle(options) {
    if (state.styleId && state.styleId !== options.styleId) {
      var stale = doc.getElementById(state.styleId);
      if (stale && stale.parentNode) stale.parentNode.removeChild(stale); // Remove stale style when styleId changes.
    }
    state.styleId = options.styleId;
    var oldStyle = doc.getElementById(options.styleId);
    if (!options.injectStyle) {
      if (oldStyle && oldStyle.parentNode) oldStyle.parentNode.removeChild(oldStyle); // External CSS mode.
      return;
    }
    var css = buildCSS(options);
    var style = oldStyle || doc.createElement('style');
    style.id = options.styleId;
    style.type = 'text/css';
    if (options.styleNonce) style.setAttribute('nonce', options.styleNonce); // CSP-compatible style tag.
    if (style.styleSheet) style.styleSheet.cssText = css;
    else {
      while (style.firstChild) style.removeChild(style.firstChild);
      style.appendChild(doc.createTextNode(css));
    }
    if (!oldStyle) (doc.head || doc.getElementsByTagName('head')[0]).appendChild(style);
  }

  /* Apply visual CSS variables to one container; parameters: container, options. */
  function applyContainerOptions(container, options) {
    if (!isElement(container)) return;
    addClass(container, CLASS.scope);
    container.style.setProperty('--ptc-font-size', options.fontSize);
    container.style.setProperty('--ptc-gap', options.columnGap);
    container.style.setProperty('--ptc-mobile-gap', options.mobileColumnGap);
    container.style.setProperty('--ptc-block-spacing', options.blockSpacing);
    container.style.setProperty('--ptc-divider-inset', options.dividerInset);
    container.style.setProperty('--ptc-divider-thickness', options.dividerThickness);
    container.style.setProperty('--ptc-divider-opacity', String(options.dividerOpacity));
    container.style.setProperty('--ptc-row-rule-margin', options.rowRuleMargin);
    container.style.setProperty('--ptc-row-rule-thickness', options.rowRuleThickness);
    container.style.setProperty('--ptc-row-rule-opacity', String(options.rowRuleOpacity));
    container.style.setProperty('--ptc-col-justify', options.verticalAlign);
    container.setAttribute(ATTR.compact, options.compactText ? 'true' : 'false');
  }

  /* Remove visual markers from one container; parameters: container. */
  function clearContainerOptions(container) {
    if (!isElement(container)) return;
    removeClass(container, CLASS.scope);
    container.removeAttribute(ATTR.compact);
    container.style.removeProperty('--ptc-font-size');
    container.style.removeProperty('--ptc-gap');
    container.style.removeProperty('--ptc-mobile-gap');
    container.style.removeProperty('--ptc-block-spacing');
    container.style.removeProperty('--ptc-divider-inset');
    container.style.removeProperty('--ptc-divider-thickness');
    container.style.removeProperty('--ptc-divider-opacity');
    container.style.removeProperty('--ptc-row-rule-margin');
    container.style.removeProperty('--ptc-row-rule-thickness');
    container.style.removeProperty('--ptc-row-rule-opacity');
    container.style.removeProperty('--ptc-col-justify');
  }

  /* Return containers matching configured selectors; parameters: options. */
  function collectContainers(options) {
    var found = [];
    for (var i = 0; i < options.selectors.length; i += 1) {
      var nodes = safeQueryAll(doc, options.selectors[i]);
      for (var j = 0; j < nodes.length; j += 1) {
        if (found.indexOf(nodes[j]) === -1) found.push(nodes[j]); // Avoid duplicate selector matches.
      }
    }
    return found;
  }

  /* Normalize target input to containers; parameters: target. */
  function normalizeContainerInput(target) {
    if (!target) return state.containers.slice();
    if (typeof target === 'string') return safeQueryAll(doc, target);
    if (isElement(target)) return [target];
    if (Array.isArray(target)) {
      var out = [];
      for (var i = 0; i < target.length; i += 1) if (isElement(target[i])) out.push(target[i]);
      return out;
    }
    return [];
  }

  /* Return whether a node is blockquote; parameters: node. */
  function isBlockquote(node) {
    return tagName(node) === 'BLOCKQUOTE';
  }

  /* Return whether a node is a list; parameters: node. */
  function isList(node) {
    var tag = tagName(node);
    return tag === 'UL' || tag === 'OL' || tag === 'DL';
  }

  /* Return whether a node should be skipped; parameters: node, options. */
  function isSkippedElement(node, options) {
    if (!isElement(node)) return false;
    if (tagName(node) === 'TABLE') return true;
    for (var i = 0; i < options.skipSelectors.length; i += 1) {
      if (matchesSelector(node, options.skipSelectors[i])) return true;
    }
    return false;
  }

  /* Return whether a node can start a body block; parameters: node, options. */
  function isBodyStarter(node, options) {
    var tag = tagName(node);
    if (options.bodyTags.indexOf(tag) !== -1) return true;
    return options.includeHeadings && options.headingTags.indexOf(tag) !== -1;
  }

  /* Collect one body block from direct children; parameters: children, startIndex, options. */
  function collectBodyBlock(children, startIndex, options) {
    var collected = [];
    var start = children[startIndex];
    if (!isBodyStarter(start, options)) return collected;
    collected.push(start);
    var i = startIndex + 1;
    while (i < children.length && isList(children[i])) {
      collected.push(children[i]); // Paragraph/list chains are treated as one source block.
      i += 1;
    }
    return collected;
  }

  /* Create a column element and move nodes into it; parameters: nodes. */
  function createColumn(nodes) {
    var col = doc.createElement('div');
    col.className = CLASS.col;
    for (var i = 0; i < nodes.length; i += 1) col.appendChild(nodes[i]);
    return col;
  }

  /* Create an internal column divider; parameters: none. */
  function createDivider() {
    var divider = doc.createElement('div');
    divider.className = CLASS.divider;
    divider.setAttribute('aria-hidden', 'true');
    return divider;
  }

  /* Create a compact row separator; parameters: options. */
  function createRowRule(options) {
    var hr = doc.createElement('hr');
    hr.className = CLASS.rowRule;
    hr.setAttribute('aria-hidden', 'true');
    if (!options.rowRuleEnabled) hr.style.display = 'none'; // Keeps DOM predictable when disabled.
    return hr;
  }

  /* Create a parallel row from column groups; parameters: groups, options. */
  function createRow(groups, options) {
    var row = doc.createElement('div');
    var ratios = getRatiosForCount(groups.length, options);
    var cols = [];
    row.className = CLASS.row;
    row.setAttribute(ATTR.cols, String(groups.length));
    row.setAttribute(ATTR.ratios, ratios.join(','));
    for (var i = 0; i < ratios.length; i += 1) cols.push('minmax(0, ' + ratios[i] + 'fr)');
    row.style.gridTemplateColumns = cols.join(' '); // Inline grid columns allow per-row ratios.
    for (var j = 0; j < groups.length; j += 1) row.appendChild(createColumn(groups[j]));
    for (var k = 1; k < groups.length; k += 1) row.appendChild(createDivider());
    return row;
  }

  /* Return direct row columns; parameters: row. */
  function getDirectColumns(row) {
    var out = [];
    var children = toArray(row.children);
    for (var i = 0; i < children.length; i += 1) if (hasClass(children[i], CLASS.col)) out.push(children[i]);
    return out;
  }

  /* Return direct row dividers; parameters: row. */
  function getDirectDividers(row) {
    var out = [];
    var children = toArray(row.children);
    for (var i = 0; i < children.length; i += 1) if (hasClass(children[i], CLASS.divider)) out.push(children[i]);
    return out;
  }

  /* Resolve rendered gap in px; parameters: row. */
  function getGapPx(row) {
    var styles = win.getComputedStyle ? win.getComputedStyle(row) : null;
    if (!styles) return 0;
    var columnGap = parseFloat(styles.columnGap || styles.gridColumnGap);
    if (isFinite(columnGap)) return columnGap;
    var gap = parseFloat(styles.gap);
    return isFinite(gap) ? gap : 0;
  }

  /* Return whether columns are stacked by responsive CSS; parameters: columns. */
  function isStackedLayout(columns) {
    if (columns.length < 2) return false;
    return Math.round(columns[1].offsetTop) > Math.round(columns[0].offsetTop);
  }

  /* Update divider geometry for one row; parameters: row. */
  function updateRowDividers(row) {
    if (!isElement(row) || !(doc.documentElement || doc.body).contains(row)) return;
    var columns = getDirectColumns(row);
    var dividers = getDirectDividers(row);
    if (columns.length <= 1) {
      for (var d = 0; d < dividers.length; d += 1) dividers[d].style.display = 'none';
      return;
    }
    var gapPx = getGapPx(row);
    var stacked = isStackedLayout(columns);
    var rowStyles = win.getComputedStyle ? win.getComputedStyle(row) : null;
    var thickness = rowStyles ? rowStyles.getPropertyValue('--ptc-divider-thickness').replace(/^\s+|\s+$/g, '') : '1px';
    var inset = rowStyles ? rowStyles.getPropertyValue('--ptc-divider-inset').replace(/^\s+|\s+$/g, '') : '0.1rem';
    thickness = thickness || '1px';
    inset = inset || '0.1rem';
    for (var i = 0; i < dividers.length; i += 1) {
      var divider = dividers[i];
      divider.style.display = 'block';
      if (stacked) {
        var nextCol = columns[i + 1];
        divider.style.left = '0';
        divider.style.right = '0';
        divider.style.top = (nextCol.offsetTop - gapPx / 2) + 'px';
        divider.style.bottom = 'auto';
        divider.style.width = 'auto';
        divider.style.height = thickness;
      } else {
        var nextColumn = columns[i + 1];
        divider.style.left = (nextColumn.offsetLeft - gapPx / 2) + 'px';
        divider.style.right = 'auto';
        divider.style.top = inset;
        divider.style.bottom = inset;
        divider.style.width = thickness;
        divider.style.height = 'auto';
      }
    }
  }

  /* Update all row dividers in a container; parameters: container. */
  function updateContainerDividers(container) {
    if (!isElement(container)) return;
    var rows = safeQueryAll(container, '.' + CLASS.row);
    for (var i = 0; i < rows.length; i += 1) updateRowDividers(rows[i]);
  }

  /* Schedule divider updates after layout; parameters: container. */
  function scheduleDividerUpdate(container) {
    var raf = win.requestAnimationFrame || function (fn) { return win.setTimeout(fn, 16); };
    raf(function () { updateContainerDividers(container); }); // Wait for layout to settle.
  }

  /* Observe one row for size changes; parameters: row. */
  function observeRow(row) {
    if (!('ResizeObserver' in win)) return;
    if (!state.resizeObserver) {
      state.resizeObserver = new win.ResizeObserver(function (entries) {
        for (var i = 0; i < entries.length; i += 1) updateRowDividers(entries[i].target);
      });
    }
    state.resizeObserver.observe(row);
  }

  /* Stop observing one row; parameters: row. */
  function unobserveRow(row) {
    if (state.resizeObserver && row) state.resizeObserver.unobserve(row);
  }

  /* Bind global layout refresh events; parameters: none. */
  function bindGlobalResize() {
    if (state.resizeBound) return;
    state.resizeBound = true;
    state.resizeHandler = function () {
      for (var i = 0; i < state.containers.length; i += 1) scheduleDividerUpdate(state.containers[i]);
    };
    state.loadHandler = state.resizeHandler;
    win.addEventListener('resize', state.resizeHandler, false);
    win.addEventListener('load', state.loadHandler, false);
  }

  /* Unbind global layout refresh events; parameters: none. */
  function unbindGlobalResize() {
    if (!state.resizeBound) return;
    win.removeEventListener('resize', state.resizeHandler, false);
    win.removeEventListener('load', state.loadHandler, false);
    state.resizeBound = false;
    state.resizeHandler = null;
    state.loadHandler = null;
  }

  /* Find configured containers related to a node; parameters: node. */
  function findContainersForNode(node) {
    var out = [];
    if (!isElement(node)) node = node && node.parentNode;
    if (!isElement(node) || !state.options) return out;
    for (var i = 0; i < state.options.selectors.length; i += 1) {
      var selector = state.options.selectors[i];
      var cursor = node;
      if (matchesSelector(cursor, selector) && out.indexOf(cursor) === -1) out.push(cursor);
      while (cursor && cursor !== doc && isElement(cursor)) {
        if (matchesSelector(cursor, selector) && out.indexOf(cursor) === -1) out.push(cursor);
        cursor = cursor.parentNode;
      }
      var descendants = safeQueryAll(node, selector);
      for (var j = 0; j < descendants.length; j += 1) if (out.indexOf(descendants[j]) === -1) out.push(descendants[j]);
    }
    return out;
  }

  /* Add containers to the debounced refresh queue; parameters: containers. */
  function queueRefresh(containers) {
    for (var i = 0; i < containers.length; i += 1) {
      if (state.pendingRefresh.indexOf(containers[i]) === -1) state.pendingRefresh.push(containers[i]);
    }
    if (state.pendingTimer) win.clearTimeout(state.pendingTimer);
    state.pendingTimer = win.setTimeout(function () {
      var pending = state.pendingRefresh.slice();
      state.pendingRefresh = [];
      state.pendingTimer = null;
      for (var j = 0; j < pending.length; j += 1) refresh(pending[j]);
    }, state.options.autoRefreshDelay);
  }

  /* Start dynamic-content observation; parameters: none. */
  function startAutoRefresh() {
    stopAutoRefresh();
    if (!state.options || !state.options.autoRefresh || !('MutationObserver' in win) || !doc.body) return;
    state.mutationObserver = new win.MutationObserver(function (records) {
      var containers = [];
      for (var i = 0; i < records.length; i += 1) {
        var added = records[i].addedNodes || [];
        for (var j = 0; j < added.length; j += 1) {
          var node = added[j];
          if (!isElement(node) || hasClass(node, CLASS.row) || hasClass(node, CLASS.rowRule)) continue; // Ignore generated nodes.
          var related = findContainersForNode(node);
          for (var k = 0; k < related.length; k += 1) if (containers.indexOf(related[k]) === -1) containers.push(related[k]);
        }
      }
      if (containers.length) queueRefresh(containers);
    });
    state.mutationObserver.observe(doc.body, { childList: true, subtree: true });
  }

  /* Stop dynamic-content observation; parameters: none. */
  function stopAutoRefresh() {
    if (state.mutationObserver) state.mutationObserver.disconnect();
    state.mutationObserver = null;
    if (state.pendingTimer) win.clearTimeout(state.pendingTimer);
    state.pendingTimer = null;
    state.pendingRefresh = [];
  }

  /* Run DOM mutation work while observer is paused; parameters: callback. */
  function withAutoRefreshPaused(callback) {
    var shouldRestart = !!(state.options && state.options.autoRefresh && state.mutationObserver);
    if (shouldRestart) stopAutoRefresh();
    try {
      callback();
    } finally {
      if (shouldRestart) startAutoRefresh();
    }
  }

  /* Rebuild a container into parallel rows; parameters: container, options. */
  function rebuildContainer(container, options) {
    if (!isElement(container)) return;
    applyContainerOptions(container, options);
    var children = toArray(container.children);
    var fragment = doc.createDocumentFragment();
    var i = 0;
    var previousWasGeneratedRow = false;
    while (i < children.length) {
      var current = children[i];
      if (!isElement(current)) {
        i += 1;
        continue;
      }
      if (hasClass(current, CLASS.rowRule)) {
        i += 1;
        continue; // Old generated rules are discarded on rebuild.
      }
      if (hasClass(current, CLASS.row)) {
        previousWasGeneratedRow = true;
        fragment.appendChild(current);
        i += 1;
        continue;
      }
      if (isSkippedElement(current, options)) {
        fragment.appendChild(current);
        previousWasGeneratedRow = false;
        i += 1;
        while (i < children.length && isBlockquote(children[i])) {
          fragment.appendChild(children[i]); // Preserve table-related blockquotes.
          i += 1;
        }
        continue;
      }
      if (!isBodyStarter(current, options)) {
        fragment.appendChild(current);
        previousWasGeneratedRow = false;
        i += 1;
        continue;
      }
      var bodyNodes = collectBodyBlock(children, i, options);
      var groups = [bodyNodes];
      i += bodyNodes.length;
      while (i < children.length && isBlockquote(children[i])) {
        groups.push([children[i]]);
        i += 1;
      }
      if (previousWasGeneratedRow && options.rowRuleEnabled) fragment.appendChild(createRowRule(options)); // Compact HR between adjacent generated rows.
      fragment.appendChild(createRow(groups, options));
      previousWasGeneratedRow = true;
    }
    while (container.firstChild) container.removeChild(container.firstChild); // Drop whitespace and stale generated nodes.
    container.appendChild(fragment);
    container.setAttribute(ATTR.enabled, 'true');
    var rows = safeQueryAll(container, '.' + CLASS.row);
    for (var r = 0; r < rows.length; r += 1) observeRow(rows[r]);
    scheduleDividerUpdate(container);
  }

  /* Restore a processed container to original document order; parameters: container. */
  function restoreContainer(container) {
    if (!isElement(container) || !container.hasAttribute(ATTR.enabled)) return;
    var nodes = toArray(container.childNodes);
    var fragment = doc.createDocumentFragment();
    for (var i = 0; i < nodes.length; i += 1) {
      var node = nodes[i];
      if (isElement(node) && hasClass(node, CLASS.row)) {
        unobserveRow(node);
        var children = toArray(node.children);
        for (var j = 0; j < children.length; j += 1) {
          if (isElement(children[j]) && hasClass(children[j], CLASS.col)) {
            while (children[j].firstChild) fragment.appendChild(children[j].firstChild); // Move original content back.
          }
        }
      } else if (isElement(node) && hasClass(node, CLASS.rowRule)) {
        continue; // Generated <hr> separators are not source content.
      } else {
        fragment.appendChild(node);
      }
    }
    while (container.firstChild) container.removeChild(container.firstChild);
    container.appendChild(fragment);
    container.removeAttribute(ATTR.enabled);
  }

  /* Ensure API calls have initialized state; parameters: none. */
  function ensureInitialized() {
    if (!state.initialized) init();
  }

  /* Enable parallel layout; parameters: target optional container selector/element/list. */
  function enable(target) {
    ensureInitialized();
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    withAutoRefreshPaused(function () {
      for (var i = 0; i < containers.length; i += 1) {
        if (!isElement(containers[i])) continue;
        applyContainerOptions(containers[i], state.options);
        if (!containers[i].hasAttribute(ATTR.enabled)) rebuildContainer(containers[i], state.options);
      }
    });
    return api;
  }

  /* Disable parallel layout and restore source order; parameters: target optional container selector/element/list. */
  function disable(target) {
    ensureInitialized();
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    withAutoRefreshPaused(function () {
      for (var i = 0; i < containers.length; i += 1) restoreContainer(containers[i]);
    });
    return api;
  }

  /* Toggle parallel layout; parameters: target optional container selector/element/list. */
  function toggle(target) {
    ensureInitialized();
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    for (var i = 0; i < containers.length; i += 1) {
      if (containers[i].hasAttribute(ATTR.enabled)) disable(containers[i]);
      else enable(containers[i]);
    }
    return api;
  }

  /* Refresh and rebuild layout; parameters: target optional container selector/element/list. */
  function refresh(target) {
    ensureInitialized();
    var containers = normalizeContainerInput(target);
    if (!containers.length) {
      state.containers = collectContainers(state.options);
      containers = state.containers.slice();
    }
    withAutoRefreshPaused(function () {
      for (var i = 0; i < containers.length; i += 1) {
        if (!isElement(containers[i])) continue;
        if (containers[i].hasAttribute(ATTR.enabled)) restoreContainer(containers[i]);
        rebuildContainer(containers[i], state.options);
      }
    });
    return api;
  }

  /* Initialize the script; parameters: userOptions optional config object. */
  function init(userOptions) {
    if (state.initialized) return updateConfig(userOptions || {}, { rebuild: true });
    state.options = normalizeConfig(mergeObjects(getPreloadConfig(), userOptions || {}));
    upsertStyle(state.options);
    bindGlobalResize();
    state.containers = collectContainers(state.options);
    for (var i = 0; i < state.containers.length; i += 1) applyContainerOptions(state.containers[i], state.options);
    state.initialized = true;
    if (state.options.autoEnable) enable();
    startAutoRefresh();
    return api;
  }

  /* Update runtime configuration; parameters: options, runtimeOptions. */
  function updateConfig(options, runtimeOptions) {
    var controls = runtimeOptions || {};
    var rebuild = controls.rebuild !== false;
    var wasInitialized = state.initialized;
    var oldContainers = state.containers.slice();
    var enabled = [];
    if (!wasInitialized) return init(options || {});
    for (var i = 0; i < oldContainers.length; i += 1) if (oldContainers[i].hasAttribute(ATTR.enabled)) enabled.push(oldContainers[i]);
    state.options = normalizeConfig(mergeObjects(state.options, options || {}));
    upsertStyle(state.options);
    state.containers = collectContainers(state.options);
    for (var a = 0; a < state.containers.length; a += 1) applyContainerOptions(state.containers[a], state.options);
    if (rebuild) {
      withAutoRefreshPaused(function () {
        for (var b = 0; b < enabled.length; b += 1) restoreContainer(enabled[b]);
        var targetContainers = state.options.autoEnable ? state.containers : enabled;
        for (var c = 0; c < targetContainers.length; c += 1) rebuildContainer(targetContainers[c], state.options);
      });
    }
    startAutoRefresh();
    return api;
  }

  /* Destroy generated layout and listeners; parameters: target optional container selector/element/list. */
  function destroy(target) {
    ensureInitialized();
    var scoped = !!target;
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    withAutoRefreshPaused(function () {
      for (var i = 0; i < containers.length; i += 1) {
        restoreContainer(containers[i]);
        clearContainerOptions(containers[i]);
      }
    });
    if (!scoped) {
      stopAutoRefresh();
      unbindGlobalResize();
      if (state.resizeObserver) state.resizeObserver.disconnect();
      state.resizeObserver = null;
      state.containers = [];
      state.options = null;
      state.initialized = false;
    }
    return api;
  }

  /* Bind click handlers to toggles; parameters: buttonTarget, containerTarget. */
  function bindToggleButton(buttonTarget, containerTarget) {
    ensureInitialized();
    var buttons = normalizeContainerInput(buttonTarget);
    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener('click', function () { toggle(containerTarget); }, false);
    }
    return api;
  }

  /* Set body/list/blockquote font size; parameters: fontSize, target. */
  function setFontSize(fontSize, target) {
    ensureInitialized();
    state.options.fontSize = normalizeSize(fontSize, state.options.fontSize);
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    for (var i = 0; i < containers.length; i += 1) {
      addClass(containers[i], CLASS.scope);
      containers[i].style.setProperty('--ptc-font-size', state.options.fontSize);
      scheduleDividerUpdate(containers[i]);
    }
    return api;
  }

  /* Set vertical column alignment; parameters: verticalAlign, target. */
  function setVerticalAlign(verticalAlign, target) {
    ensureInitialized();
    state.options.verticalAlign = normalizeVerticalAlign(verticalAlign);
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    for (var i = 0; i < containers.length; i += 1) {
      addClass(containers[i], CLASS.scope);
      containers[i].style.setProperty('--ptc-col-justify', state.options.verticalAlign);
      scheduleDividerUpdate(containers[i]);
    }
    return api;
  }

  /* Set column ratios and rebuild enabled containers; parameters: columnRatios, target. */
  function setColumnRatios(columnRatios, target) {
    ensureInitialized();
    state.options.columnRatios = normalizeRatioMap(columnRatios);
    refresh(target);
    return api;
  }

  /* Set compact text mode; parameters: compactText, target. */
  function setCompactText(compactText, target) {
    ensureInitialized();
    state.options.compactText = compactText !== false;
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    for (var i = 0; i < containers.length; i += 1) {
      containers[i].setAttribute(ATTR.compact, state.options.compactText ? 'true' : 'false');
      scheduleDividerUpdate(containers[i]);
    }
    return api;
  }

  /* Set direct-child block spacing; parameters: blockSpacing, target. */
  function setBlockSpacing(blockSpacing, target) {
    ensureInitialized();
    state.options.blockSpacing = normalizeSize(blockSpacing, state.options.blockSpacing);
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    for (var i = 0; i < containers.length; i += 1) {
      addClass(containers[i], CLASS.scope);
      containers[i].style.setProperty('--ptc-block-spacing', state.options.blockSpacing);
      scheduleDividerUpdate(containers[i]);
    }
    return api;
  }

  /* Return a copy of the active config; parameters: none. */
  function getConfig() {
    ensureInitialized();
    return mergeObjects(state.options);
  }

  var api = {
    init: init,
    updateConfig: updateConfig,
    enable: enable,
    disable: disable,
    toggle: toggle,
    refresh: refresh,
    destroy: destroy,
    bindToggleButton: bindToggleButton,
    setFontSize: setFontSize,
    setVerticalAlign: setVerticalAlign,
    setColumnRatios: setColumnRatios,
    setCompactText: setCompactText,
    setBlockSpacing: setBlockSpacing,
    getConfig: getConfig,
    classes: mergeObjects(CLASS),
    defaults: mergeObjects(DEFAULT_CONFIG)
  };

  win.parallelTextColumns = api;

  onReady(function () {
    if (!state.initialized) init(); // Plug-and-play default behavior.
  });
})(window, document);
/*!
 * parallel-text-columns.industrial.js
 *
 * Introduction:
 *   Rebuilds Markdown/Jekyll content into compact parallel text rows: one body block plus
 *   following blockquotes becomes a multi-column comparison row. Consecutive generated rows
 *   can be separated by a compact <hr> helper line.
 *
 * Usage:
 *   1) Plug-and-play: include this file after the target content or anywhere in the page;
 *      it auto-initializes after DOMContentLoaded.
 *   2) Customize by editing DEFAULT_CONFIG at the top of this file.
 *   3) Customize at runtime with window.parallelTextColumns.updateConfig({...}).
 *   4) Optional pre-load config: window.ParallelTextColumnsConfig = {...} before this file.
 *
 * Global API:
 *   parallelTextColumns.init(options)
 *   parallelTextColumns.updateConfig(options, runtimeOptions)
 *   parallelTextColumns.enable(target?)
 *   parallelTextColumns.disable(target?)
 *   parallelTextColumns.toggle(target?)
 *   parallelTextColumns.refresh(target?)
 *   parallelTextColumns.destroy(target?)
 *   parallelTextColumns.bindToggleButton(buttonTarget, containerTarget?)
 *   parallelTextColumns.setFontSize(fontSize, target?)
 *   parallelTextColumns.setVerticalAlign(verticalAlign, target?)
 *   parallelTextColumns.setColumnRatios(columnRatios, target?)
 *   parallelTextColumns.setCompactText(compactText, target?)
 *   parallelTextColumns.setBlockSpacing(blockSpacing, target?)
 *   parallelTextColumns.getConfig()
 *
 * Notes:
 *   - The script scans direct child elements of each configured content container.
 *   - Tables and their immediately following blockquotes are skipped by default.
 *   - The layout uses CSS Grid; unsupported browsers degrade to normal block flow.
 *   - For strict CSP, pass styleNonce or set injectStyle:false and load the CSS file manually.
 *   - For SSR/hydrated apps, load this after framework hydration or target static content only.
 */

(function (win, doc) {
  'use strict';

  var DEFAULT_CONFIG = {
    selectors: ['.post-content', '.page-content', '.post-body', 'article .content', '.markdown-body'],
    autoEnable: true,
    autoRefresh: false,
    autoRefreshDelay: 80,
    includeHeadings: false,
    skipSelectors: ['table'],
    bodyTags: ['P', 'UL', 'OL', 'DL'],
    headingTags: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
    fontSize: '15px',
    compactText: true,
    verticalAlign: 'start',
    columnGap: '0.85rem',
    mobileColumnGap: '0.45rem',
    blockSpacing: '0.9rem',
    dividerInset: '0.1rem',
    dividerThickness: '1px',
    dividerOpacity: 0.24,
    rowRuleEnabled: true,
    rowRuleMargin: '0.22rem 0',
    rowRuleThickness: '1px',
    rowRuleOpacity: 0.24,
    responsiveBreakpointPx: 900,
    injectStyle: true,
    styleId: 'parallel-text-columns-style',
    styleNonce: '',
    columnRatios: {
      1: [1],
      2: [1.7, 1],
      3: [1.7, 1, 1.3],
      default: [1.7, 1, 1.3]
    }
  };

  var CLASS = {
    scope: 'ptc-scope',
    row: 'ptc-row',
    col: 'ptc-col',
    divider: 'ptc-divider',
    rowRule: 'ptc-row-rule'
  };

  var ATTR = {
    enabled: 'data-ptc-enabled',
    compact: 'data-ptc-compact',
    cols: 'data-ptc-cols',
    ratios: 'data-ptc-ratios'
  };

  var state = {
    initialized: false,
    options: null,
    containers: [],
    resizeBound: false,
    resizeHandler: null,
    loadHandler: null,
    resizeObserver: null,
    mutationObserver: null,
    styleId: null,
    pendingRefresh: [],
    pendingTimer: null
  };

  /* Merge objects into a new object; parameters: one or more source objects. */
  function mergeObjects() {
    var out = {};
    for (var i = 0; i < arguments.length; i += 1) {
      var src = arguments[i];
      if (!src) continue;
      for (var key in src) {
        if (Object.prototype.hasOwnProperty.call(src, key)) out[key] = src[key]; // Shallow merge is intentional.
      }
    }
    return out;
  }

  /* Convert array-like values to arrays; parameters: value. */
  function toArray(value) {
    return Array.prototype.slice.call(value || []);
  }

  /* Return whether a value is a DOM element; parameters: node. */
  function isElement(node) {
    return !!node && node.nodeType === 1;
  }

  /* Return a safe tag name; parameters: node. */
  function tagName(node) {
    return isElement(node) && node.tagName ? String(node.tagName).toUpperCase() : '';
  }

  /* Check for a CSS class without requiring classList; parameters: element, className. */
  function hasClass(el, className) {
    if (!isElement(el)) return false;
    return (' ' + el.className + ' ').indexOf(' ' + className + ' ') !== -1;
  }

  /* Add a CSS class without requiring classList; parameters: element, className. */
  function addClass(el, className) {
    if (!isElement(el) || hasClass(el, className)) return;
    el.className = el.className ? el.className + ' ' + className : className; // Preserve existing classes.
  }

  /* Remove a CSS class without requiring classList; parameters: element, className. */
  function removeClass(el, className) {
    if (!isElement(el)) return;
    el.className = (' ' + el.className + ' ').replace(' ' + className + ' ', ' ').replace(/^\s+|\s+$/g, '');
  }

  /* Match an element against a selector with vendor fallbacks; parameters: element, selector. */
  function matchesSelector(el, selector) {
    if (!isElement(el) || !selector) return false;
    var fn = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    if (!fn) return false;
    try {
      return !!fn.call(el, selector);
    } catch (err) {
      return false; // Invalid selectors are ignored.
    }
  }

  /* Query descendants safely; parameters: root, selector. */
  function safeQueryAll(root, selector) {
    if (!root || !selector || !root.querySelectorAll) return [];
    try {
      return toArray(root.querySelectorAll(selector));
    } catch (err) {
      return []; // Invalid selectors should not break the page.
    }
  }

  /* Normalize a value into a string array; parameters: value, fallback. */
  function normalizeStringArray(value, fallback) {
    var list = Array.isArray(value) ? value.slice() : [value];
    var out = [];
    for (var i = 0; i < list.length; i += 1) {
      if (typeof list[i] === 'string' && list[i].replace(/^\s+|\s+$/g, '')) out.push(list[i].replace(/^\s+|\s+$/g, ''));
    }
    return out.length ? out : fallback.slice();
  }

  /* Normalize tag names into uppercase strings; parameters: value, fallback. */
  function normalizeTagList(value, fallback) {
    var list = normalizeStringArray(value, fallback);
    for (var i = 0; i < list.length; i += 1) list[i] = list[i].toUpperCase(); // Tag matching uses uppercase names.
    return list;
  }

  /* Normalize CSS size values; parameters: value, fallback. */
  function normalizeSize(value, fallback) {
    if (typeof value === 'number' && isFinite(value)) return value + 'px';
    if (typeof value === 'string' && value.replace(/^\s+|\s+$/g, '')) return value.replace(/^\s+|\s+$/g, '');
    return fallback;
  }

  /* Normalize opacity into 0-1 range; parameters: value, fallback. */
  function normalizeOpacity(value, fallback) {
    var n = Number(value);
    if (!isFinite(n)) return fallback;
    if (n < 0) return 0;
    if (n > 1) return 1;
    return n;
  }

  /* Normalize vertical alignment; parameters: value. */
  function normalizeVerticalAlign(value) {
    var v = String(value || 'start').replace(/^\s+|\s+$/g, '').toLowerCase();
    if (v === 'center' || v === 'middle') return 'center';
    if (v === 'end' || v === 'bottom' || v === 'flex-end') return 'flex-end';
    return 'flex-start';
  }

  /* Sanitize ratio arrays; parameters: list. */
  function sanitizeRatios(list) {
    var out = [];
    if (!Array.isArray(list) || !list.length) return [1];
    for (var i = 0; i < list.length; i += 1) {
      var n = Number(list[i]);
      out.push(isFinite(n) && n > 0 ? n : 1);
    }
    return out.length ? out : [1];
  }

  /* Normalize ratio map; parameters: input. */
  function normalizeRatioMap(input) {
    var result = {};
    var key;
    if (Array.isArray(input)) result.default = sanitizeRatios(input);
    else if (input && typeof input === 'object') {
      for (key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key)) result[key] = sanitizeRatios(input[key]);
      }
    }
    if (!result.default) result.default = [1, 1, 1];
    if (!result[1]) result[1] = [1];
    if (!result[2]) result[2] = [1, 1];
    if (!result[3]) result[3] = [1, 1, 1];
    return result;
  }

  /* Resolve column ratios for a row; parameters: count, options. */
  function getRatiosForCount(count, options) {
    var map = options.columnRatios || {};
    var ratios = sanitizeRatios(map[count] || map[String(count)] || map.default || [1]);
    var out = ratios.slice(0, count);
    while (out.length < count) out.push(1); // Missing ratios become equal-weight columns.
    return out;
  }

  /* Return pre-load global config; parameters: none. */
  function getPreloadConfig() {
    return win.ParallelTextColumnsConfig || win.parallelTextColumnsConfig || null;
  }

  /* Normalize all configuration; parameters: input. */
  function normalizeConfig(input) {
    var cfg = mergeObjects(DEFAULT_CONFIG, input || {});
    cfg.selectors = normalizeStringArray(cfg.selectors, DEFAULT_CONFIG.selectors);
    cfg.skipSelectors = normalizeStringArray(cfg.skipSelectors, DEFAULT_CONFIG.skipSelectors);
    cfg.bodyTags = normalizeTagList(cfg.bodyTags, DEFAULT_CONFIG.bodyTags);
    cfg.headingTags = normalizeTagList(cfg.headingTags, DEFAULT_CONFIG.headingTags);
    cfg.fontSize = normalizeSize(cfg.fontSize, DEFAULT_CONFIG.fontSize);
    cfg.columnGap = normalizeSize(cfg.columnGap, DEFAULT_CONFIG.columnGap);
    cfg.mobileColumnGap = normalizeSize(cfg.mobileColumnGap, DEFAULT_CONFIG.mobileColumnGap);
    cfg.blockSpacing = normalizeSize(cfg.blockSpacing, DEFAULT_CONFIG.blockSpacing);
    cfg.dividerInset = normalizeSize(cfg.dividerInset, DEFAULT_CONFIG.dividerInset);
    cfg.dividerThickness = normalizeSize(cfg.dividerThickness, DEFAULT_CONFIG.dividerThickness);
    cfg.rowRuleMargin = normalizeSize(cfg.rowRuleMargin, DEFAULT_CONFIG.rowRuleMargin);
    cfg.rowRuleThickness = normalizeSize(cfg.rowRuleThickness, DEFAULT_CONFIG.rowRuleThickness);
    cfg.dividerOpacity = normalizeOpacity(cfg.dividerOpacity, DEFAULT_CONFIG.dividerOpacity);
    cfg.rowRuleOpacity = normalizeOpacity(cfg.rowRuleOpacity, DEFAULT_CONFIG.rowRuleOpacity);
    cfg.responsiveBreakpointPx = Math.max(1, parseInt(cfg.responsiveBreakpointPx, 10) || DEFAULT_CONFIG.responsiveBreakpointPx);
    cfg.autoRefreshDelay = Math.max(20, parseInt(cfg.autoRefreshDelay, 10) || DEFAULT_CONFIG.autoRefreshDelay);
    cfg.verticalAlign = normalizeVerticalAlign(cfg.verticalAlign);
    cfg.columnRatios = normalizeRatioMap(cfg.columnRatios);
    cfg.autoEnable = cfg.autoEnable !== false;
    cfg.autoRefresh = cfg.autoRefresh === true;
    cfg.includeHeadings = cfg.includeHeadings === true;
    cfg.compactText = cfg.compactText !== false;
    cfg.rowRuleEnabled = cfg.rowRuleEnabled !== false;
    cfg.injectStyle = cfg.injectStyle !== false;
    cfg.styleId = typeof cfg.styleId === 'string' && cfg.styleId.replace(/^\s+|\s+$/g, '') ? cfg.styleId.replace(/^\s+|\s+$/g, '') : DEFAULT_CONFIG.styleId;
    cfg.styleNonce = typeof cfg.styleNonce === 'string' ? cfg.styleNonce : '';
    return cfg;
  }

  /* Run after DOM is parse-ready; parameters: callback. */
  function onReady(callback) {
    if (doc.readyState === 'loading') {
      doc.addEventListener('DOMContentLoaded', callback, false);
      return;
    }
    callback();
  }

  /* Build injected CSS text; parameters: options. */
  function buildCSS(options) {
    var bp = options.responsiveBreakpointPx + 'px';
    return [
      '.' + CLASS.scope + ' {',
      ' --ptc-font-size: 15px;',
      ' --ptc-gap: 0.85rem;',
      ' --ptc-mobile-gap: 0.45rem;',
      ' --ptc-block-spacing: 0.9rem;',
      ' --ptc-divider-inset: 0.1rem;',
      ' --ptc-divider-thickness: 1px;',
      ' --ptc-divider-opacity: 0.24;',
      ' --ptc-row-rule-margin: 0.22rem 0;',
      ' --ptc-row-rule-thickness: 1px;',
      ' --ptc-row-rule-opacity: 0.24;',
      ' --ptc-col-justify: flex-start;',
      '}',
      '.' + CLASS.scope + ' p, .' + CLASS.scope + ' ul, .' + CLASS.scope + ' ol, .' + CLASS.scope + ' dl, .' + CLASS.scope + ' li, .' + CLASS.scope + ' blockquote {',
      ' font-size: var(--ptc-font-size) !important;',
      '}',
      '.' + CLASS.scope + '[' + ATTR.compact + '="true"] p, .' + CLASS.scope + '[' + ATTR.compact + '="true"] ul, .' + CLASS.scope + '[' + ATTR.compact + '="true"] ol, .' + CLASS.scope + '[' + ATTR.compact + '="true"] dl, .' + CLASS.scope + '[' + ATTR.compact + '="true"] li, .' + CLASS.scope + '[' + ATTR.compact + '="true"] blockquote {',
      ' margin: 0 !important;',
      ' padding: 0 !important;',
      ' border: 0 !important;',
      '}',
      '.' + CLASS.scope + '[' + ATTR.compact + '="true"] ul, .' + CLASS.scope + '[' + ATTR.compact + '="true"] ol { list-style-position: inside; }',
      '.' + CLASS.scope + '[' + ATTR.compact + '="true"] li > ul, .' + CLASS.scope + '[' + ATTR.compact + '="true"] li > ol, .' + CLASS.scope + '[' + ATTR.compact + '="true"] li > dl { margin-top: 0 !important; margin-bottom: 0 !important; }',
      '.' + CLASS.scope + '[' + ATTR.compact + '="true"] blockquote > :first-child { margin-top: 0 !important; }',
      '.' + CLASS.scope + '[' + ATTR.compact + '="true"] blockquote > :last-child { margin-bottom: 0 !important; }',
      '.' + CLASS.row + ' {',
      ' display: grid;',
      ' gap: var(--ptc-gap);',
      ' align-items: stretch;',
      ' position: relative;',
      ' margin: 0 !important;',
      '}',
      '.' + CLASS.col + ' {',
      ' min-width: 0;',
      ' position: relative;',
      ' display: flex;',
      ' flex-direction: column;',
      ' justify-content: var(--ptc-col-justify);',
      ' align-self: stretch;',
      '}',
      '.' + CLASS.col + ' > :first-child { margin-top: 0 !important; }',
      '.' + CLASS.col + ' > :last-child { margin-bottom: 0 !important; }',
      '.' + CLASS.divider + ' {',
      ' position: absolute;',
      ' pointer-events: none;',
      ' opacity: var(--ptc-divider-opacity);',
      ' background: repeating-linear-gradient(to bottom, var(--ptc-divider-color, var(--theme-color, var(--accent-color, var(--primary-color, var(--link-color, currentColor))))) 0 2px, transparent 2px 6px);',
      '}',
      '.' + CLASS.scope + ' > * + * { margin-top: var(--ptc-block-spacing) !important; }',
      '.' + CLASS.rowRule + ' {',
      ' display: block;',
      ' height: var(--ptc-row-rule-thickness);',
      ' padding: 0;',
      ' border: 0;',
      ' opacity: var(--ptc-row-rule-opacity, var(--ptc-divider-opacity));',
      ' margin: var(--ptc-row-rule-margin) !important;',
      ' background: repeating-linear-gradient(to right, var(--ptc-divider-color, var(--theme-color, var(--accent-color, var(--primary-color, var(--link-color, currentColor))))) 0 2px, transparent 2px 6px);',
      '}',
      '.' + CLASS.scope + ' > .' + CLASS.row + ' + .' + CLASS.rowRule + ' { margin: var(--ptc-row-rule-margin) !important; }',
      '.' + CLASS.scope + ' > .' + CLASS.rowRule + ' + .' + CLASS.row + ' { margin-top: 0 !important; }',
      '@media (max-width: ' + bp + ') {',
      ' .' + CLASS.row + ' { grid-template-columns: 1fr !important; gap: var(--ptc-mobile-gap); }',
      ' .' + CLASS.divider + ' { background: repeating-linear-gradient(to right, var(--ptc-divider-color, var(--theme-color, var(--accent-color, var(--primary-color, var(--link-color, currentColor))))) 0 2px, transparent 2px 6px); }',
      '}'
    ].join('\n');
  }

  /* Insert or update CSS; parameters: options. */
  function upsertStyle(options) {
    if (state.styleId && state.styleId !== options.styleId) {
      var stale = doc.getElementById(state.styleId);
      if (stale && stale.parentNode) stale.parentNode.removeChild(stale); // Remove stale style when styleId changes.
    }
    state.styleId = options.styleId;
    var oldStyle = doc.getElementById(options.styleId);
    if (!options.injectStyle) {
      if (oldStyle && oldStyle.parentNode) oldStyle.parentNode.removeChild(oldStyle); // External CSS mode.
      return;
    }
    var css = buildCSS(options);
    var style = oldStyle || doc.createElement('style');
    style.id = options.styleId;
    style.type = 'text/css';
    if (options.styleNonce) style.setAttribute('nonce', options.styleNonce); // CSP-compatible style tag.
    if (style.styleSheet) style.styleSheet.cssText = css;
    else {
      while (style.firstChild) style.removeChild(style.firstChild);
      style.appendChild(doc.createTextNode(css));
    }
    if (!oldStyle) (doc.head || doc.getElementsByTagName('head')[0]).appendChild(style);
  }

  /* Apply visual CSS variables to one container; parameters: container, options. */
  function applyContainerOptions(container, options) {
    if (!isElement(container)) return;
    addClass(container, CLASS.scope);
    container.style.setProperty('--ptc-font-size', options.fontSize);
    container.style.setProperty('--ptc-gap', options.columnGap);
    container.style.setProperty('--ptc-mobile-gap', options.mobileColumnGap);
    container.style.setProperty('--ptc-block-spacing', options.blockSpacing);
    container.style.setProperty('--ptc-divider-inset', options.dividerInset);
    container.style.setProperty('--ptc-divider-thickness', options.dividerThickness);
    container.style.setProperty('--ptc-divider-opacity', String(options.dividerOpacity));
    container.style.setProperty('--ptc-row-rule-margin', options.rowRuleMargin);
    container.style.setProperty('--ptc-row-rule-thickness', options.rowRuleThickness);
    container.style.setProperty('--ptc-row-rule-opacity', String(options.rowRuleOpacity));
    container.style.setProperty('--ptc-col-justify', options.verticalAlign);
    container.setAttribute(ATTR.compact, options.compactText ? 'true' : 'false');
  }

  /* Remove visual markers from one container; parameters: container. */
  function clearContainerOptions(container) {
    if (!isElement(container)) return;
    removeClass(container, CLASS.scope);
    container.removeAttribute(ATTR.compact);
    container.style.removeProperty('--ptc-font-size');
    container.style.removeProperty('--ptc-gap');
    container.style.removeProperty('--ptc-mobile-gap');
    container.style.removeProperty('--ptc-block-spacing');
    container.style.removeProperty('--ptc-divider-inset');
    container.style.removeProperty('--ptc-divider-thickness');
    container.style.removeProperty('--ptc-divider-opacity');
    container.style.removeProperty('--ptc-row-rule-margin');
    container.style.removeProperty('--ptc-row-rule-thickness');
    container.style.removeProperty('--ptc-row-rule-opacity');
    container.style.removeProperty('--ptc-col-justify');
  }

  /* Return containers matching configured selectors; parameters: options. */
  function collectContainers(options) {
    var found = [];
    for (var i = 0; i < options.selectors.length; i += 1) {
      var nodes = safeQueryAll(doc, options.selectors[i]);
      for (var j = 0; j < nodes.length; j += 1) {
        if (found.indexOf(nodes[j]) === -1) found.push(nodes[j]); // Avoid duplicate selector matches.
      }
    }
    return found;
  }

  /* Normalize target input to containers; parameters: target. */
  function normalizeContainerInput(target) {
    if (!target) return state.containers.slice();
    if (typeof target === 'string') return safeQueryAll(doc, target);
    if (isElement(target)) return [target];
    if (Array.isArray(target)) {
      var out = [];
      for (var i = 0; i < target.length; i += 1) if (isElement(target[i])) out.push(target[i]);
      return out;
    }
    return [];
  }

  /* Return whether a node is blockquote; parameters: node. */
  function isBlockquote(node) {
    return tagName(node) === 'BLOCKQUOTE';
  }

  /* Return whether a node is a list; parameters: node. */
  function isList(node) {
    var tag = tagName(node);
    return tag === 'UL' || tag === 'OL' || tag === 'DL';
  }

  /* Return whether a node should be skipped; parameters: node, options. */
  function isSkippedElement(node, options) {
    if (!isElement(node)) return false;
    if (tagName(node) === 'TABLE') return true;
    for (var i = 0; i < options.skipSelectors.length; i += 1) {
      if (matchesSelector(node, options.skipSelectors[i])) return true;
    }
    return false;
  }

  /* Return whether a node can start a body block; parameters: node, options. */
  function isBodyStarter(node, options) {
    var tag = tagName(node);
    if (options.bodyTags.indexOf(tag) !== -1) return true;
    return options.includeHeadings && options.headingTags.indexOf(tag) !== -1;
  }

  /* Collect one body block from direct children; parameters: children, startIndex, options. */
  function collectBodyBlock(children, startIndex, options) {
    var collected = [];
    var start = children[startIndex];
    if (!isBodyStarter(start, options)) return collected;
    collected.push(start);
    var i = startIndex + 1;
    while (i < children.length && isList(children[i])) {
      collected.push(children[i]); // Paragraph/list chains are treated as one source block.
      i += 1;
    }
    return collected;
  }

  /* Create a column element and move nodes into it; parameters: nodes. */
  function createColumn(nodes) {
    var col = doc.createElement('div');
    col.className = CLASS.col;
    for (var i = 0; i < nodes.length; i += 1) col.appendChild(nodes[i]);
    return col;
  }

  /* Create an internal column divider; parameters: none. */
  function createDivider() {
    var divider = doc.createElement('div');
    divider.className = CLASS.divider;
    divider.setAttribute('aria-hidden', 'true');
    return divider;
  }

  /* Create a compact row separator; parameters: options. */
  function createRowRule(options) {
    var hr = doc.createElement('hr');
    hr.className = CLASS.rowRule;
    hr.setAttribute('aria-hidden', 'true');
    if (!options.rowRuleEnabled) hr.style.display = 'none'; // Keeps DOM predictable when disabled.
    return hr;
  }

  /* Create a parallel row from column groups; parameters: groups, options. */
  function createRow(groups, options) {
    var row = doc.createElement('div');
    var ratios = getRatiosForCount(groups.length, options);
    var cols = [];
    row.className = CLASS.row;
    row.setAttribute(ATTR.cols, String(groups.length));
    row.setAttribute(ATTR.ratios, ratios.join(','));
    for (var i = 0; i < ratios.length; i += 1) cols.push('minmax(0, ' + ratios[i] + 'fr)');
    row.style.gridTemplateColumns = cols.join(' '); // Inline grid columns allow per-row ratios.
    for (var j = 0; j < groups.length; j += 1) row.appendChild(createColumn(groups[j]));
    for (var k = 1; k < groups.length; k += 1) row.appendChild(createDivider());
    return row;
  }

  /* Return direct row columns; parameters: row. */
  function getDirectColumns(row) {
    var out = [];
    var children = toArray(row.children);
    for (var i = 0; i < children.length; i += 1) if (hasClass(children[i], CLASS.col)) out.push(children[i]);
    return out;
  }

  /* Return direct row dividers; parameters: row. */
  function getDirectDividers(row) {
    var out = [];
    var children = toArray(row.children);
    for (var i = 0; i < children.length; i += 1) if (hasClass(children[i], CLASS.divider)) out.push(children[i]);
    return out;
  }

  /* Resolve rendered gap in px; parameters: row. */
  function getGapPx(row) {
    var styles = win.getComputedStyle ? win.getComputedStyle(row) : null;
    if (!styles) return 0;
    var columnGap = parseFloat(styles.columnGap || styles.gridColumnGap);
    if (isFinite(columnGap)) return columnGap;
    var gap = parseFloat(styles.gap);
    return isFinite(gap) ? gap : 0;
  }

  /* Return whether columns are stacked by responsive CSS; parameters: columns. */
  function isStackedLayout(columns) {
    if (columns.length < 2) return false;
    return Math.round(columns[1].offsetTop) > Math.round(columns[0].offsetTop);
  }

  /* Update divider geometry for one row; parameters: row. */
  function updateRowDividers(row) {
    if (!isElement(row) || !(doc.documentElement || doc.body).contains(row)) return;
    var columns = getDirectColumns(row);
    var dividers = getDirectDividers(row);
    if (columns.length <= 1) {
      for (var d = 0; d < dividers.length; d += 1) dividers[d].style.display = 'none';
      return;
    }
    var gapPx = getGapPx(row);
    var stacked = isStackedLayout(columns);
    var rowStyles = win.getComputedStyle ? win.getComputedStyle(row) : null;
    var thickness = rowStyles ? rowStyles.getPropertyValue('--ptc-divider-thickness').replace(/^\s+|\s+$/g, '') : '1px';
    var inset = rowStyles ? rowStyles.getPropertyValue('--ptc-divider-inset').replace(/^\s+|\s+$/g, '') : '0.1rem';
    thickness = thickness || '1px';
    inset = inset || '0.1rem';
    for (var i = 0; i < dividers.length; i += 1) {
      var divider = dividers[i];
      divider.style.display = 'block';
      if (stacked) {
        var nextCol = columns[i + 1];
        divider.style.left = '0';
        divider.style.right = '0';
        divider.style.top = (nextCol.offsetTop - gapPx / 2) + 'px';
        divider.style.bottom = 'auto';
        divider.style.width = 'auto';
        divider.style.height = thickness;
      } else {
        var nextColumn = columns[i + 1];
        divider.style.left = (nextColumn.offsetLeft - gapPx / 2) + 'px';
        divider.style.right = 'auto';
        divider.style.top = inset;
        divider.style.bottom = inset;
        divider.style.width = thickness;
        divider.style.height = 'auto';
      }
    }
  }

  /* Update all row dividers in a container; parameters: container. */
  function updateContainerDividers(container) {
    if (!isElement(container)) return;
    var rows = safeQueryAll(container, '.' + CLASS.row);
    for (var i = 0; i < rows.length; i += 1) updateRowDividers(rows[i]);
  }

  /* Schedule divider updates after layout; parameters: container. */
  function scheduleDividerUpdate(container) {
    var raf = win.requestAnimationFrame || function (fn) { return win.setTimeout(fn, 16); };
    raf(function () { updateContainerDividers(container); }); // Wait for layout to settle.
  }

  /* Observe one row for size changes; parameters: row. */
  function observeRow(row) {
    if (!('ResizeObserver' in win)) return;
    if (!state.resizeObserver) {
      state.resizeObserver = new win.ResizeObserver(function (entries) {
        for (var i = 0; i < entries.length; i += 1) updateRowDividers(entries[i].target);
      });
    }
    state.resizeObserver.observe(row);
  }

  /* Stop observing one row; parameters: row. */
  function unobserveRow(row) {
    if (state.resizeObserver && row) state.resizeObserver.unobserve(row);
  }

  /* Bind global layout refresh events; parameters: none. */
  function bindGlobalResize() {
    if (state.resizeBound) return;
    state.resizeBound = true;
    state.resizeHandler = function () {
      for (var i = 0; i < state.containers.length; i += 1) scheduleDividerUpdate(state.containers[i]);
    };
    state.loadHandler = state.resizeHandler;
    win.addEventListener('resize', state.resizeHandler, false);
    win.addEventListener('load', state.loadHandler, false);
  }

  /* Unbind global layout refresh events; parameters: none. */
  function unbindGlobalResize() {
    if (!state.resizeBound) return;
    win.removeEventListener('resize', state.resizeHandler, false);
    win.removeEventListener('load', state.loadHandler, false);
    state.resizeBound = false;
    state.resizeHandler = null;
    state.loadHandler = null;
  }

  /* Find configured containers related to a node; parameters: node. */
  function findContainersForNode(node) {
    var out = [];
    if (!isElement(node)) node = node && node.parentNode;
    if (!isElement(node) || !state.options) return out;
    for (var i = 0; i < state.options.selectors.length; i += 1) {
      var selector = state.options.selectors[i];
      var cursor = node;
      if (matchesSelector(cursor, selector) && out.indexOf(cursor) === -1) out.push(cursor);
      while (cursor && cursor !== doc && isElement(cursor)) {
        if (matchesSelector(cursor, selector) && out.indexOf(cursor) === -1) out.push(cursor);
        cursor = cursor.parentNode;
      }
      var descendants = safeQueryAll(node, selector);
      for (var j = 0; j < descendants.length; j += 1) if (out.indexOf(descendants[j]) === -1) out.push(descendants[j]);
    }
    return out;
  }

  /* Add containers to the debounced refresh queue; parameters: containers. */
  function queueRefresh(containers) {
    for (var i = 0; i < containers.length; i += 1) {
      if (state.pendingRefresh.indexOf(containers[i]) === -1) state.pendingRefresh.push(containers[i]);
    }
    if (state.pendingTimer) win.clearTimeout(state.pendingTimer);
    state.pendingTimer = win.setTimeout(function () {
      var pending = state.pendingRefresh.slice();
      state.pendingRefresh = [];
      state.pendingTimer = null;
      for (var j = 0; j < pending.length; j += 1) refresh(pending[j]);
    }, state.options.autoRefreshDelay);
  }

  /* Start dynamic-content observation; parameters: none. */
  function startAutoRefresh() {
    stopAutoRefresh();
    if (!state.options || !state.options.autoRefresh || !('MutationObserver' in win) || !doc.body) return;
    state.mutationObserver = new win.MutationObserver(function (records) {
      var containers = [];
      for (var i = 0; i < records.length; i += 1) {
        var added = records[i].addedNodes || [];
        for (var j = 0; j < added.length; j += 1) {
          var node = added[j];
          if (!isElement(node) || hasClass(node, CLASS.row) || hasClass(node, CLASS.rowRule)) continue; // Ignore generated nodes.
          var related = findContainersForNode(node);
          for (var k = 0; k < related.length; k += 1) if (containers.indexOf(related[k]) === -1) containers.push(related[k]);
        }
      }
      if (containers.length) queueRefresh(containers);
    });
    state.mutationObserver.observe(doc.body, { childList: true, subtree: true });
  }

  /* Stop dynamic-content observation; parameters: none. */
  function stopAutoRefresh() {
    if (state.mutationObserver) state.mutationObserver.disconnect();
    state.mutationObserver = null;
    if (state.pendingTimer) win.clearTimeout(state.pendingTimer);
    state.pendingTimer = null;
    state.pendingRefresh = [];
  }

  /* Run DOM mutation work while observer is paused; parameters: callback. */
  function withAutoRefreshPaused(callback) {
    var shouldRestart = !!(state.options && state.options.autoRefresh && state.mutationObserver);
    if (shouldRestart) stopAutoRefresh();
    try {
      callback();
    } finally {
      if (shouldRestart) startAutoRefresh();
    }
  }

  /* Rebuild a container into parallel rows; parameters: container, options. */
  function rebuildContainer(container, options) {
    if (!isElement(container)) return;
    applyContainerOptions(container, options);
    var children = toArray(container.children);
    var fragment = doc.createDocumentFragment();
    var i = 0;
    var previousWasGeneratedRow = false;
    while (i < children.length) {
      var current = children[i];
      if (!isElement(current)) {
        i += 1;
        continue;
      }
      if (hasClass(current, CLASS.rowRule)) {
        i += 1;
        continue; // Old generated rules are discarded on rebuild.
      }
      if (hasClass(current, CLASS.row)) {
        previousWasGeneratedRow = true;
        fragment.appendChild(current);
        i += 1;
        continue;
      }
      if (isSkippedElement(current, options)) {
        fragment.appendChild(current);
        previousWasGeneratedRow = false;
        i += 1;
        while (i < children.length && isBlockquote(children[i])) {
          fragment.appendChild(children[i]); // Preserve table-related blockquotes.
          i += 1;
        }
        continue;
      }
      if (!isBodyStarter(current, options)) {
        fragment.appendChild(current);
        previousWasGeneratedRow = false;
        i += 1;
        continue;
      }
      var bodyNodes = collectBodyBlock(children, i, options);
      var groups = [bodyNodes];
      i += bodyNodes.length;
      while (i < children.length && isBlockquote(children[i])) {
        groups.push([children[i]]);
        i += 1;
      }
      if (previousWasGeneratedRow && options.rowRuleEnabled) fragment.appendChild(createRowRule(options)); // Compact HR between adjacent generated rows.
      fragment.appendChild(createRow(groups, options));
      previousWasGeneratedRow = true;
    }
    while (container.firstChild) container.removeChild(container.firstChild); // Drop whitespace and stale generated nodes.
    container.appendChild(fragment);
    container.setAttribute(ATTR.enabled, 'true');
    var rows = safeQueryAll(container, '.' + CLASS.row);
    for (var r = 0; r < rows.length; r += 1) observeRow(rows[r]);
    scheduleDividerUpdate(container);
  }

  /* Restore a processed container to original document order; parameters: container. */
  function restoreContainer(container) {
    if (!isElement(container) || !container.hasAttribute(ATTR.enabled)) return;
    var nodes = toArray(container.childNodes);
    var fragment = doc.createDocumentFragment();
    for (var i = 0; i < nodes.length; i += 1) {
      var node = nodes[i];
      if (isElement(node) && hasClass(node, CLASS.row)) {
        unobserveRow(node);
        var children = toArray(node.children);
        for (var j = 0; j < children.length; j += 1) {
          if (isElement(children[j]) && hasClass(children[j], CLASS.col)) {
            while (children[j].firstChild) fragment.appendChild(children[j].firstChild); // Move original content back.
          }
        }
      } else if (isElement(node) && hasClass(node, CLASS.rowRule)) {
        continue; // Generated <hr> separators are not source content.
      } else {
        fragment.appendChild(node);
      }
    }
    while (container.firstChild) container.removeChild(container.firstChild);
    container.appendChild(fragment);
    container.removeAttribute(ATTR.enabled);
  }

  /* Ensure API calls have initialized state; parameters: none. */
  function ensureInitialized() {
    if (!state.initialized) init();
  }

  /* Enable parallel layout; parameters: target optional container selector/element/list. */
  function enable(target) {
    ensureInitialized();
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    withAutoRefreshPaused(function () {
      for (var i = 0; i < containers.length; i += 1) {
        if (!isElement(containers[i])) continue;
        applyContainerOptions(containers[i], state.options);
        if (!containers[i].hasAttribute(ATTR.enabled)) rebuildContainer(containers[i], state.options);
      }
    });
    return api;
  }

  /* Disable parallel layout and restore source order; parameters: target optional container selector/element/list. */
  function disable(target) {
    ensureInitialized();
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    withAutoRefreshPaused(function () {
      for (var i = 0; i < containers.length; i += 1) restoreContainer(containers[i]);
    });
    return api;
  }

  /* Toggle parallel layout; parameters: target optional container selector/element/list. */
  function toggle(target) {
    ensureInitialized();
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    for (var i = 0; i < containers.length; i += 1) {
      if (containers[i].hasAttribute(ATTR.enabled)) disable(containers[i]);
      else enable(containers[i]);
    }
    return api;
  }

  /* Refresh and rebuild layout; parameters: target optional container selector/element/list. */
  function refresh(target) {
    ensureInitialized();
    var containers = normalizeContainerInput(target);
    if (!containers.length) {
      state.containers = collectContainers(state.options);
      containers = state.containers.slice();
    }
    withAutoRefreshPaused(function () {
      for (var i = 0; i < containers.length; i += 1) {
        if (!isElement(containers[i])) continue;
        if (containers[i].hasAttribute(ATTR.enabled)) restoreContainer(containers[i]);
        rebuildContainer(containers[i], state.options);
      }
    });
    return api;
  }

  /* Initialize the script; parameters: userOptions optional config object. */
  function init(userOptions) {
    if (state.initialized) return updateConfig(userOptions || {}, { rebuild: true });
    state.options = normalizeConfig(mergeObjects(getPreloadConfig(), userOptions || {}));
    upsertStyle(state.options);
    bindGlobalResize();
    state.containers = collectContainers(state.options);
    for (var i = 0; i < state.containers.length; i += 1) applyContainerOptions(state.containers[i], state.options);
    state.initialized = true;
    if (state.options.autoEnable) enable();
    startAutoRefresh();
    return api;
  }

  /* Update runtime configuration; parameters: options, runtimeOptions. */
  function updateConfig(options, runtimeOptions) {
    var controls = runtimeOptions || {};
    var rebuild = controls.rebuild !== false;
    var wasInitialized = state.initialized;
    var oldContainers = state.containers.slice();
    var enabled = [];
    if (!wasInitialized) return init(options || {});
    for (var i = 0; i < oldContainers.length; i += 1) if (oldContainers[i].hasAttribute(ATTR.enabled)) enabled.push(oldContainers[i]);
    state.options = normalizeConfig(mergeObjects(state.options, options || {}));
    upsertStyle(state.options);
    state.containers = collectContainers(state.options);
    for (var a = 0; a < state.containers.length; a += 1) applyContainerOptions(state.containers[a], state.options);
    if (rebuild) {
      withAutoRefreshPaused(function () {
        for (var b = 0; b < enabled.length; b += 1) restoreContainer(enabled[b]);
        var targetContainers = state.options.autoEnable ? state.containers : enabled;
        for (var c = 0; c < targetContainers.length; c += 1) rebuildContainer(targetContainers[c], state.options);
      });
    }
    startAutoRefresh();
    return api;
  }

  /* Destroy generated layout and listeners; parameters: target optional container selector/element/list. */
  function destroy(target) {
    ensureInitialized();
    var scoped = !!target;
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    withAutoRefreshPaused(function () {
      for (var i = 0; i < containers.length; i += 1) {
        restoreContainer(containers[i]);
        clearContainerOptions(containers[i]);
      }
    });
    if (!scoped) {
      stopAutoRefresh();
      unbindGlobalResize();
      if (state.resizeObserver) state.resizeObserver.disconnect();
      state.resizeObserver = null;
      state.containers = [];
      state.options = null;
      state.initialized = false;
    }
    return api;
  }

  /* Bind click handlers to toggles; parameters: buttonTarget, containerTarget. */
  function bindToggleButton(buttonTarget, containerTarget) {
    ensureInitialized();
    var buttons = normalizeContainerInput(buttonTarget);
    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener('click', function () { toggle(containerTarget); }, false);
    }
    return api;
  }

  /* Set body/list/blockquote font size; parameters: fontSize, target. */
  function setFontSize(fontSize, target) {
    ensureInitialized();
    state.options.fontSize = normalizeSize(fontSize, state.options.fontSize);
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    for (var i = 0; i < containers.length; i += 1) {
      addClass(containers[i], CLASS.scope);
      containers[i].style.setProperty('--ptc-font-size', state.options.fontSize);
      scheduleDividerUpdate(containers[i]);
    }
    return api;
  }

  /* Set vertical column alignment; parameters: verticalAlign, target. */
  function setVerticalAlign(verticalAlign, target) {
    ensureInitialized();
    state.options.verticalAlign = normalizeVerticalAlign(verticalAlign);
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    for (var i = 0; i < containers.length; i += 1) {
      addClass(containers[i], CLASS.scope);
      containers[i].style.setProperty('--ptc-col-justify', state.options.verticalAlign);
      scheduleDividerUpdate(containers[i]);
    }
    return api;
  }

  /* Set column ratios and rebuild enabled containers; parameters: columnRatios, target. */
  function setColumnRatios(columnRatios, target) {
    ensureInitialized();
    state.options.columnRatios = normalizeRatioMap(columnRatios);
    refresh(target);
    return api;
  }

  /* Set compact text mode; parameters: compactText, target. */
  function setCompactText(compactText, target) {
    ensureInitialized();
    state.options.compactText = compactText !== false;
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    for (var i = 0; i < containers.length; i += 1) {
      containers[i].setAttribute(ATTR.compact, state.options.compactText ? 'true' : 'false');
      scheduleDividerUpdate(containers[i]);
    }
    return api;
  }

  /* Set direct-child block spacing; parameters: blockSpacing, target. */
  function setBlockSpacing(blockSpacing, target) {
    ensureInitialized();
    state.options.blockSpacing = normalizeSize(blockSpacing, state.options.blockSpacing);
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    for (var i = 0; i < containers.length; i += 1) {
      addClass(containers[i], CLASS.scope);
      containers[i].style.setProperty('--ptc-block-spacing', state.options.blockSpacing);
      scheduleDividerUpdate(containers[i]);
    }
    return api;
  }

  /* Return a copy of the active config; parameters: none. */
  function getConfig() {
    ensureInitialized();
    return mergeObjects(state.options);
  }

  var api = {
    init: init,
    updateConfig: updateConfig,
    enable: enable,
    disable: disable,
    toggle: toggle,
    refresh: refresh,
    destroy: destroy,
    bindToggleButton: bindToggleButton,
    setFontSize: setFontSize,
    setVerticalAlign: setVerticalAlign,
    setColumnRatios: setColumnRatios,
    setCompactText: setCompactText,
    setBlockSpacing: setBlockSpacing,
    getConfig: getConfig,
    classes: mergeObjects(CLASS),
    defaults: mergeObjects(DEFAULT_CONFIG)
  };

  win.parallelTextColumns = api;

  onReady(function () {
    if (!state.initialized) init(); // Plug-and-play default behavior.
  });
})(window, document);
