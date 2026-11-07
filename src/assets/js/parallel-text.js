/*
 * parallel-text.js — reversible three-mode parallel-text layout for Markdown/Jekyll.
 *
 * Default state machine (one call to toggle() advances one state):
 *   hidden -> original -> columns -> hidden -> ...
 *
 * Modes:
 *   hidden:   hide blockquotes; otherwise leave the original DOM/styles alone.
 *   original: display the original HTML with its original styles and DOM order.
 *   columns:  put each paragraph (+ attached lists) and its following
 *             blockquote(s) (+ attached lists) into side-by-side columns.
 *
 * The multi-column mode never automatically stacks columns. On narrow screens
 * its rows scroll horizontally instead. All original nodes are moved, never
 * cloned, and placeholder comments allow an exact DOM-node-order restoration.
 *
 * Usage: load this ONE script on the page; it initializes automatically.
 * window.parallelTextColumns.toggle();              // hidden -> original
 * window.parallelTextColumns.toggle();              // original -> columns
 * window.parallelTextColumns.toggle();              // columns -> hidden
 * window.parallelTextColumns.setMode('original');
 * window.parallelTextColumns.getMode();              // 'hidden' | 'original' | 'columns'
 *
 * Configure before loading:
 * window.ParallelTextColumnsConfig = {
 *   selectors: ['.post-content'], initialMode: 'hidden',
 *   columnRatios: { 2: [1.7, 1], 3: [1.7, 1, 1.3], default: [1, 1, 1] }
 * };
 */
(function (win, doc) {
  'use strict';
  if (!win || !doc) return;
  if (win.parallelTextColumns && win.parallelTextColumns.__version === '2.0.0') return;

  var MODES = ['hidden', 'original', 'columns'];
  var MODE_ATTR = 'data-ptc-mode';
  var STYLE_ID = 'parallel-text-v2-styles';
  var DEFAULTS = {
    selectors: ['.post-content'],
    initialMode: 'hidden',
    includeHeadings: false,
    skipSelectors: ['table'],
    fontSize: '14px',                  // Only applied in columns mode.
    compactText: true,                // Only applied in columns mode.
    verticalAlign: 'center',          // 'start', 'center', or 'end'.
    columnGap: '0.9rem',
    minColumnWidth: 220,              // px per column; enables horizontal scrolling.
    blockSpacing: '1.5rem',
    separatorColor: 'var(--theme-color, var(--accent-color, var(--primary-color, var(--link-color, currentColor))))',
    separatorThickness: '1px',
    separatorOpacity: 0.3,
    rowRuleEnabled: true,
    columnRatios: { 1: [1], 2: [1.7, 1], 3: [1.7, 1, 1.3], default: [1.7, 1, 1.3] },
    autoRefresh: false,              // Observe newly inserted direct children if enabled.
    autoRefreshDelay: 80,
    injectStyle: true,
    styleId: STYLE_ID,
    styleNonce: '',
    autoInit: true
  };

  var CSS = [
    // No font/margin/position declarations affect hidden or original modes.
    '[' + MODE_ATTR + '="hidden"] blockquote { display: none !important; }',
    '.ptc-viewport { box-sizing: border-box; display: block; width: 100%; max-width: 100%; overflow-x: auto; margin-block: var(--ptc-block-spacing); }',
    '.ptc-row { display: grid; align-items: stretch; gap: var(--ptc-column-gap); box-sizing: border-box; }',
    '.ptc-col { display: flex; flex-direction: column; min-width: 0; justify-content: var(--ptc-align); }',
    '.ptc-col > :first-child { margin-top: 0 !important; }',
    '.ptc-col > :last-child { margin-bottom: 0 !important; }',
    '.ptc-col + .ptc-col { position: relative; }',
    '.ptc-col + .ptc-col::before { content: ""; position: absolute; inset-block: 0; inset-inline-start: 0; border-inline-start: var(--ptc-separator-thickness) dashed var(--ptc-separator-color); opacity: var(--ptc-separator-opacity); pointer-events: none; }',
    '.ptc-row :is(p, ul, ol, dl, li, blockquote) { font-size: var(--ptc-font-size) !important; }',
    '.ptc-row[data-ptc-compact="true"] :is(p, ul, ol, dl, li, blockquote) { margin: 0 !important; padding: 0 !important; border: 0 !important; }',
    '.ptc-row[data-ptc-compact="true"] :is(ul, ol) { padding-inline-start: 1.35em !important; list-style-position: outside; }',
    '.ptc-row[data-ptc-compact="true"] dl dd { margin-inline-start: 1.35em; }',
    '.ptc-viewport[data-ptc-rule="true"] + .ptc-viewport[data-ptc-rule="true"]::before { content: ""; display: block; border-block-start: var(--ptc-separator-thickness) dashed var(--ptc-separator-color); opacity: var(--ptc-separator-opacity); margin-bottom: 0.4rem; }'
  ].join('\n');

  var settings = null;
  var initialized = false;
  var ownedStyle = null;
  var managed = new Map();           // Element -> { mode, originalAttr, rows, observer, timer }.
  var toggleListeners = [];         // [{ button, handler }], removed on global destroy.
  var api;

  function asArray(value) { return Array.prototype.slice.call(value || []); }
  function isElement(node) { return Boolean(node && node.nodeType === 1); }
  function tag(node) { return isElement(node) ? node.tagName.toUpperCase() : ''; }
  function isList(node) { return /^(UL|OL|DL)$/.test(tag(node)); }
  function isQuote(node) { return tag(node) === 'BLOCKQUOTE'; }
  function validMode(mode) { return MODES.indexOf(mode) !== -1; }
  function safeAll(root, selector) {
    try { return asArray(root.querySelectorAll(selector)); }
    catch (_) { return []; }
  }
  function safeMatches(element, selector) {
    try { return Boolean(element.matches(selector)); }
    catch (_) { return false; }
  }
  function trim(value) { return String(value).trim(); }
  function asCSSSize(value, fallback) {
    if (typeof value === 'number' && Number.isFinite(value)) return value + 'px';
    return typeof value === 'string' && trim(value) ? trim(value) : fallback;
  }
  function normalizeArray(value, fallback) {
    var items = Array.isArray(value) ? value : [value];
    var output = items.filter(function (x) { return typeof x === 'string' && !!trim(x); }).map(trim);
    return output.length ? output : fallback.slice();
  }
  function normalizeRatios(value) {
    var input = Array.isArray(value) ? { default: value } : value || {};
    var out = {};
    Object.keys(input).forEach(function (key) {
      if (!Array.isArray(input[key])) return;
      out[key] = input[key].map(function (x) {
        var number = Number(x);
        return Number.isFinite(number) && number > 0 ? number : 1;
      });
    });
    if (!out.default || !out.default.length) out.default = [1, 1, 1];
    return out;
  }
  function normalize(input) {
    var x = Object.assign({}, DEFAULTS, input || {});
    x.selectors = normalizeArray(x.selectors, DEFAULTS.selectors);
    x.skipSelectors = normalizeArray(x.skipSelectors, DEFAULTS.skipSelectors);
    x.initialMode = validMode(x.initialMode) ? x.initialMode : DEFAULTS.initialMode;
    x.includeHeadings = x.includeHeadings === true;
    x.fontSize = asCSSSize(x.fontSize, DEFAULTS.fontSize);
    x.columnGap = asCSSSize(x.columnGap, DEFAULTS.columnGap);
    x.blockSpacing = asCSSSize(x.blockSpacing, DEFAULTS.blockSpacing);
    x.separatorThickness = asCSSSize(x.separatorThickness, DEFAULTS.separatorThickness);
    x.separatorColor = typeof x.separatorColor === 'string' && trim(x.separatorColor) ? trim(x.separatorColor) : DEFAULTS.separatorColor;
    x.separatorOpacity = Math.max(0, Math.min(1, Number.isFinite(Number(x.separatorOpacity)) ? Number(x.separatorOpacity) : DEFAULTS.separatorOpacity));
    x.verticalAlign = ['start', 'center', 'end'].indexOf(x.verticalAlign) >= 0 ? x.verticalAlign : DEFAULTS.verticalAlign;
    x.minColumnWidth = Math.max(0, Number.isFinite(Number(x.minColumnWidth)) ? Number(x.minColumnWidth) : DEFAULTS.minColumnWidth);
    x.columnRatios = normalizeRatios(x.columnRatios);
    x.autoRefreshDelay = Math.max(20, parseInt(x.autoRefreshDelay, 10) || DEFAULTS.autoRefreshDelay);
    x.compactText = x.compactText !== false;
    x.rowRuleEnabled = x.rowRuleEnabled !== false;
    x.autoRefresh = x.autoRefresh === true;
    x.injectStyle = x.injectStyle !== false;
    x.autoInit = x.autoInit !== false;
    x.styleId = typeof x.styleId === 'string' && trim(x.styleId) ? trim(x.styleId) : STYLE_ID;
    x.styleNonce = typeof x.styleNonce === 'string' ? x.styleNonce : '';
    return x;
  }

  function styleUpsert() {
    if (ownedStyle && (!settings.injectStyle || ownedStyle.id !== settings.styleId)) {
      ownedStyle.remove();
      ownedStyle = null;
    }
    if (!settings.injectStyle) return;
    if (!ownedStyle) {
      ownedStyle = doc.createElement('style');
      ownedStyle.id = settings.styleId;
      ownedStyle.setAttribute('data-ptc-owned', 'true');
      (doc.head || doc.documentElement).appendChild(ownedStyle);
    }
    if (settings.styleNonce) ownedStyle.setAttribute('nonce', settings.styleNonce);
    else ownedStyle.removeAttribute('nonce');
    ownedStyle.textContent = CSS;
  }

  function discover() {
    var result = [];
    settings.selectors.forEach(function (selector) {
      safeAll(doc, selector).forEach(function (node) {
        if (result.indexOf(node) < 0) result.push(node);
      });
    });
    return result;
  }
  function resolve(target) {
    if (target == null) {
      var found = discover();
      managed.forEach(function (_, node) { if (found.indexOf(node) < 0) found.push(node); });
      return found;
    }
    if (typeof target === 'string') return safeAll(doc, target);
    if (isElement(target)) return [target];
    if (typeof target.length === 'number') {
      return asArray(target).filter(isElement);
    }
    return [];
  }
  function stopObserver(record) {
    if (record.observer) record.observer.disconnect();
    if (record.timer != null) win.clearTimeout(record.timer);
    record.timer = null;
  }
  function startObserver(record) {
    stopObserver(record);
    if (!settings.autoRefresh || !win.MutationObserver) return;
    record.observer = record.observer || new win.MutationObserver(function (changes) {
      if (!changes.some(function (change) { return change.type === 'childList'; })) return;
      if (record.timer != null) win.clearTimeout(record.timer);
      record.timer = win.setTimeout(function () {
        record.timer = null;
        // Only changes to the container's direct children trigger a rebuild.
        refresh(record.container);
      }, settings.autoRefreshDelay);
    });
    record.observer.observe(record.container, { childList: true });
  }
  function recordFor(container) {
    var record = managed.get(container);
    if (record) return record;
    record = {
      container: container,
      mode: null,
      originalAttr: container.getAttribute(MODE_ATTR),
      rows: [],
      observer: null,
      timer: null
    };
    managed.set(container, record);
    return record;
  }

  function skipped(element) {
    if (tag(element) === 'TABLE') return true;
    return settings.skipSelectors.some(function (selector) { return safeMatches(element, selector); });
  }
  function isSource(element) {
    var name = tag(element);
    return name === 'P' || (settings.includeHeadings && /^H[1-6]$/.test(name));
  }
  function isAttachableList(element) { return isList(element) && !skipped(element); }

  // IMPORTANT: a list is NEVER a new source block. Its nested lists stay inside
  // the same DOM node; successive sibling lists attach to the preceding source
  // or quote, rather than creating another column or row.
  function findGroups(container) {
    var children = asArray(container.children);
    var result = [];
    var i = 0;
    while (i < children.length) {
      if (skipped(children[i]) || !isSource(children[i])) { i += 1; continue; }
      var groups = [[children[i]]];
      var j = i + 1;
      while (j < children.length && isAttachableList(children[j])) {
        groups[0].push(children[j++]);
      }
      while (j < children.length && isQuote(children[j]) && !skipped(children[j])) {
        var quoteGroup = [children[j++]];
        while (j < children.length && isAttachableList(children[j])) {
          quoteGroup.push(children[j++]);
        }
        groups.push(quoteGroup);
      }
      if (groups.length > 1) result.push(groups);
      i = j;
    }
    return result;
  }
  function ratiosFor(count) {
    var ratios = settings.columnRatios[count] || settings.columnRatios.default || [1];
    var output = ratios.slice(0, count);
    while (output.length < count) output.push(1);
    return output;
  }
  function styleRow(viewport, row, count) {
    var alignment = { start: 'flex-start', center: 'center', end: 'flex-end' }[settings.verticalAlign];
    viewport.style.setProperty('--ptc-font-size', settings.fontSize);
    viewport.style.setProperty('--ptc-column-gap', settings.columnGap);
    viewport.style.setProperty('--ptc-block-spacing', settings.blockSpacing);
    viewport.style.setProperty('--ptc-align', alignment);
    viewport.style.setProperty('--ptc-separator-color', settings.separatorColor);
    viewport.style.setProperty('--ptc-separator-thickness', settings.separatorThickness);
    viewport.style.setProperty('--ptc-separator-opacity', String(settings.separatorOpacity));
    viewport.setAttribute('data-ptc-rule', String(settings.rowRuleEnabled));
    row.setAttribute('data-ptc-compact', String(settings.compactText));
    row.style.gridTemplateColumns = ratiosFor(count).map(function (ratio) {
      return 'minmax(0, ' + ratio + 'fr)';
    }).join(' ');
    row.style.minWidth = count * settings.minColumnWidth + 'px';
  }

  function buildColumns(record) {
    var plans = findGroups(record.container);
    var rows = [];
    plans.forEach(function (groups) {
      var viewport = doc.createElement('div');
      viewport.className = 'ptc-viewport';
      var row = doc.createElement('div');
      row.className = 'ptc-row';
      viewport.appendChild(row);
      var entries = [];
      // Put the generated row at the exact position of the first source node.
      var firstNode = groups[0][0];
      firstNode.parentNode.insertBefore(viewport, firstNode);
      groups.forEach(function (group) {
        var col = doc.createElement('div');
        col.className = 'ptc-col';
        row.appendChild(col);
        group.forEach(function (originalNode) {
          var anchor = doc.createComment('ptc-original-node');
          originalNode.parentNode.insertBefore(anchor, originalNode);
          col.appendChild(originalNode);
          entries.push({ node: originalNode, anchor: anchor, column: col });
        });
      });
      styleRow(viewport, row, groups.length);
      rows.push({ viewport: viewport, row: row, entries: entries, count: groups.length });
    });
    record.rows = rows;
  }

  function restoreColumns(record) {
    record.rows.forEach(function (plan) {
      // Restore the actual original node at its saved position. This preserves
      // identity, original whitespace, comments, attributes, event listeners,
      // nested lists and inline styles, instead of recreating them from HTML.
      plan.entries.forEach(function (entry) {
        if (entry.anchor.parentNode) {
          entry.anchor.parentNode.replaceChild(entry.node, entry.anchor);
        } else if (plan.viewport.parentNode) {
          // Fallback if external code has removed an anchor.
          plan.viewport.parentNode.insertBefore(entry.node, plan.viewport);
        }
      });
      // Preserve nodes externally added directly inside a generated column.
      // Place them after the last original node from that column when possible.
      var columns = asArray(plan.row.children);
      columns.forEach(function (col) {
        if (!col.childNodes.length) return;
        var originals = plan.entries.filter(function (entry) { return entry.column === col; });
        var last = originals.length && originals[originals.length - 1].node;
        var destination = (last && last.parentNode) || plan.viewport.parentNode;
        if (!destination) return;
        var before = last && last.parentNode ? last.nextSibling : plan.viewport;
        while (col.firstChild) destination.insertBefore(col.firstChild, before);
      });
      plan.viewport.remove();
    });
    record.rows = [];
  }

  function applyMode(record, mode, forceRebuild) {
    stopObserver(record);
    if (record.mode === 'columns' && (mode !== 'columns' || forceRebuild)) {
      restoreColumns(record);
    }
    // In original mode no existing content nodes receive styles, classes or attributes.
    if (mode === 'columns' && (record.mode !== 'columns' || forceRebuild)) {
      buildColumns(record);
    }
    record.container.setAttribute(MODE_ATTR, mode);
    record.mode = mode;
    startObserver(record);
  }
  function initialize() {
    if (!initialized) init();
  }
  function init(userOptions) {
    if (initialized) {
      return updateConfig(userOptions || {});
    }
    var preload = win.ParallelTextColumnsConfig || win.parallelTextColumnsConfig || {};
    settings = normalize(Object.assign({}, preload, userOptions || {}));
    styleUpsert();
    initialized = true;
    discover().forEach(function (container) {
      applyMode(recordFor(container), settings.initialMode, false);
    });
    return api;
  }
  function setMode(mode, target) {
    if (!validMode(mode)) throw new RangeError('Unknown parallel text mode: ' + mode);
    initialize();
    resolve(target).forEach(function (container) {
      applyMode(recordFor(container), mode, false);
    });
    return api;
  }
  function getMode(target) {
    initialize();
    var elements = resolve(target);
    return elements.length ? (managed.get(elements[0]) || {}).mode || null : null;
  }
  function toggle(target) {
    initialize();
    resolve(target).forEach(function (container) {
      var record = recordFor(container);
      var current = validMode(record.mode) ? record.mode : settings.initialMode;
      applyMode(record, MODES[(MODES.indexOf(current) + 1) % MODES.length], false);
    });
    return api;
  }
  function refresh(target) {
    initialize();
    resolve(target).forEach(function (container) {
      var record = recordFor(container);
      applyMode(record, record.mode || settings.initialMode, record.mode === 'columns');
    });
    return api;
  }
  function updateConfig(userOptions, runtimeOptions) {
    initialize();
    var rebuild = !runtimeOptions || runtimeOptions.rebuild !== false;
    settings = normalize(Object.assign({}, settings, userOptions || {}));
    styleUpsert();
    resolve(null).forEach(function (container) {
      var record = recordFor(container);
      if (rebuild && record.mode === 'columns') {
        applyMode(record, 'columns', true);
      } else {
        record.rows.forEach(function (plan) {
          styleRow(plan.viewport, plan.row, plan.count);
        });
        startObserver(record);
        if (record.mode == null) applyMode(record, settings.initialMode, false);
      }
    });
    return api;
  }
  function destroy(target) {
    if (!initialized) return api;
    var all = target == null;
    var elements = all ? Array.from(managed.keys()) : resolve(target);
    elements.forEach(function (container) {
      var record = managed.get(container);
      if (!record) return;
      stopObserver(record);
      if (record.mode === 'columns') restoreColumns(record);
      if (record.originalAttr === null) container.removeAttribute(MODE_ATTR);
      else container.setAttribute(MODE_ATTR, record.originalAttr);
      managed.delete(container);
    });
    if (all) {
      toggleListeners.forEach(function (entry) {
        entry.button.removeEventListener('click', entry.handler);
      });
      toggleListeners = [];
      if (ownedStyle) ownedStyle.remove();
      ownedStyle = null;
      initialized = false;
      settings = null;
    }
    return api;
  }
  function bindToggleButton(buttonTarget, containerTarget) {
    initialize();
    resolve(buttonTarget).forEach(function (button) {
      if (toggleListeners.some(function (entry) { return entry.button === button && entry.target === containerTarget; })) return;
      var handler = function () { toggle(containerTarget); };
      button.addEventListener('click', handler);
      toggleListeners.push({ button: button, handler: handler, target: containerTarget });
    });
    return api;
  }
  function getConfig() {
    initialize();
    var copy = Object.assign({}, settings);
    copy.selectors = settings.selectors.slice();
    copy.skipSelectors = settings.skipSelectors.slice();
    copy.columnRatios = {};
    Object.keys(settings.columnRatios).forEach(function (key) {
      copy.columnRatios[key] = settings.columnRatios[key].slice();
    });
    return copy;
  }

  api = {
    __version: '2.0.0',
    modes: MODES.slice(),
    init: init,
    setMode: setMode,
    getMode: getMode,
    toggle: toggle,
    refresh: refresh,
    updateConfig: updateConfig,
    destroy: destroy,
    bindToggleButton: bindToggleButton,
    enable: function (target) { return setMode('columns', target); },
    disable: function (target) { return setMode('original', target); },
    setFontSize: function (value) { return updateConfig({ fontSize: value }, { rebuild: false }); },
    setVerticalAlign: function (value) { return updateConfig({ verticalAlign: value }, { rebuild: false }); },
    setColumnRatios: function (value) { return updateConfig({ columnRatios: value }, { rebuild: false }); },
    setCompactText: function (value) { return updateConfig({ compactText: value }, { rebuild: false }); },
    setBlockSpacing: function (value) { return updateConfig({ blockSpacing: value }, { rebuild: false }); },
    getConfig: getConfig,
    defaults: normalize(DEFAULTS)
  };
  win.parallelTextColumns = api;

  var pre = win.ParallelTextColumnsConfig || win.parallelTextColumnsConfig || {};
  if (pre.autoInit !== false) {
    if (doc.readyState === 'loading') {
      doc.addEventListener('DOMContentLoaded', function () { if (!initialized) init(); }, { once: true });
    } else {
      init();
    }
  }
})(window, document);
