/*!
 * ADHD Read Mode v3
 *
 * Introduction:
 * A plug-and-play reading enhancer for long-form pages. It colors the first half of long English words and
 * punctuation-split Chinese clause segments, creating visual anchors without rewriting layout.
 *
 * Usage:
 * Include this file after the page content or before DOMContentLoaded. It runs automatically by default.
 * Customize by editing CONFIG below, or call updateConfig({ ... }) / ADHDReadMode.updateConfig({ ... }) later.
 *
 * Global API:
 * window.ADHDReadMode.enable()        - Enable and process the current page.
 * window.ADHDReadMode.disable()       - Disable and remove generated marks.
 * window.ADHDReadMode.toggle()        - Toggle between enabled and disabled states.
 * window.ADHDReadMode.rebuild()       - Re-scan current DOM without changing config.
 * window.ADHDReadMode.destroy()       - Remove marks, observers, style, timers, and public event listeners.
 * window.ADHDReadMode.updateConfig()  - Merge new config, clean old marks, and reprocess immediately.
 * window.ADHDReadMode.getConfig()     - Return a cloned runtime config.
 * window.ADHDReadMode.getState()      - Return lightweight runtime state.
 * window.updateConfig()               - Convenience alias for ADHDReadMode.updateConfig().
 *
 * Notes:
 * The script avoids innerHTML string replacement. It uses TreeWalker + DocumentFragment, skips code/math/UI
 * regions, unwraps its own spans before reprocessing, and uses viewport-first batched rendering for long pages.
 * v3 keeps only color and probabilistic bold styling. Chinese marking is clause-based: punctuation splits
 * clauses, and each clause is marked according to its Han-character length.
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Config
  // ---------------------------------------------------------------------------

  const CONFIG = {
    enabled: true,

    rootSelectors: ['.post-content'],
    contentSelectors: [
      'p',
      'li',
      'td',
      'th',
      'blockquote',
      'dd',
      'dt',
      'figcaption'
    ],
    excludeSelectors: [
      'pre',
      'code',
      'strong',
      'em',
      'kbd',
      'samp',
      'script',
      'style',
      'textarea',
      'input',
      'select',
      'option',
      'button',
      'svg',
      'canvas',
      'math',
      'mjx-container',
      '.math',
      '.MathJax',
      '.katex',
      '.katex-display',
      '.mermaid',
      '.highlight',
      '.rouge-code',
      '.rouge-table',
      '.lineno',
      '.no-adhd',
      '.adhd-ignore',
      '.jsd-linear-toolbar',
      '.jsd-tree-widget',
      '[data-adhd-rm="1"]'
    ],

    colorPool: [
      '#8B929E',
      '#4857fa',
      '#C6F94A',
      '#CBD5E1',
      '#38F8FF',
      '#27f9a8',
      '#8a076d',
      '#FF5D73',
      '#7DD6A8',
      '#9844f2',
      '#FF4D6D',
      '#FFD166',
      '#4DA3FF',
      '#D26BFF',
      '#E6EDF3',
      '#7D8590',
      '#FF9F43'
    ],

    style: {
      color: true,
      fontWeight: false,
      fontWeightProbability: 0.2,
      fontWeightValue: '700'
    },

    english: {
      enabled: true,
      minLength: 3,
      sampleRate: 1
    },

    chinese: {
      enabled: true,
      shortClauseMax: 4,
      mediumClauseMax: 9,
      shortClauseEvery: 2,
      headMin: 3,
      headMax: 5,
      gapMin: 3,
      gapMax: 5,
      runMin: 3,
      runMax: 5,
      sampleRate: 1
    },

    viewport: {
      enabled: true,
      rootMargin: '400px 0px',
      observeOnce: true
    },

    dynamic: {
      observe: true,
      debounceMs: 10,
      eventNames: ['content:rendered']
    },

    random: {
      mode: 'stable',
      seed: 'adhd-read-mode-v3'
    },

    performance: {
      minTextLength: 2,
      maxTextLengthPerElement: 180000,
      batchSize: 6,
      batchBudgetMs: 8,
      idleTimeoutMs: 500,
      maxQueueSize: 4000
    },

    startup: {
      delaySeconds: 0
    },

    css: {
      styleId: 'adhd-read-mode-style',
      markClass: 'adhd-rm-mark',
      processedAttr: 'data-adhd-rm-signature'
    },

    globalApiName: 'updateConfig'
  };

  const MARK_ATTR = 'data-adhd-rm';
  const MARK_SELECTOR = '[data-adhd-rm="1"]';

  const state = {
    config: deepClone(CONFIG),
    enabled: Boolean(CONFIG.enabled),
    destroyed: false,
    applying: false,
    hasBooted: false,
    configVersion: 1,

    roots: [],
    mutationObserver: null,
    viewportObserver: null,
    observedSet: new WeakSet(),

    queue: [],
    queueSet: new WeakSet(),
    queueTimer: null,
    queueTimerType: '',
    scanTimer: null,
    bootTimer: null,

    eventCleanups: [],

    lastScanAt: 0,
    lastQueueAt: 0,
    processedElements: 0,
    processedTextNodes: 0
  };

  /** Deep-clones plain config objects. */
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /** Deep-merges source into target; arrays are replaced. */
  function merge(target, source) {
    if (!source || typeof source !== 'object') return target;
    Object.keys(source).forEach(function (key) {
      const value = source[key];
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) target[key] = {};
        merge(target[key], value);
      } else {
        target[key] = value;
      }
    });
    return target;
  }

  /** Returns a safe array from a selector config value. */
  function asArray(value) {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (typeof value === 'string' && value.trim()) return [value.trim()];
    return [];
  }

  /** Clamps a numeric value. */
  function clampNumber(value, min, max, fallback) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(min, Math.min(max, number));
  }

  /** Keeps valid-looking hex colors and removes duplicates. */
  function normalizeColorPool(pool) {
    const seen = Object.create(null);
    const list = asArray(pool).filter(function (color) {
      const value = String(color).trim();
      const ok = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value);
      const key = value.toLowerCase();
      if (!ok || seen[key]) return false;
      seen[key] = true;
      return true;
    });
    return list.length ? list : CONFIG.colorPool.slice();
  }

  /** Normalizes config once before rebuild or update. */
  function normalizeConfig() {
    const cfg = state.config;

    cfg.rootSelectors = asArray(cfg.rootSelectors);
    cfg.contentSelectors = asArray(cfg.contentSelectors);
    cfg.excludeSelectors = asArray(cfg.excludeSelectors);
    cfg.colorPool = normalizeColorPool(cfg.colorPool);

    if (!cfg.style || typeof cfg.style !== 'object') cfg.style = {};
    cfg.style.color = cfg.style.color !== false;
    cfg.style.fontWeightProbability = clampNumber(cfg.style.fontWeightProbability, 0, 1, 0.2);
    cfg.style.fontWeightValue = cfg.style.fontWeightValue || '700';

    if (!cfg.english || typeof cfg.english !== 'object') cfg.english = {};
    cfg.english.enabled = cfg.english.enabled !== false;
    cfg.english.minLength = Math.max(0, Math.floor(Number(cfg.english.minLength) || 0));
    cfg.english.sampleRate = clampNumber(cfg.english.sampleRate, 0, 1, 1);

    if (!cfg.chinese || typeof cfg.chinese !== 'object') cfg.chinese = {};
    cfg.chinese.enabled = cfg.chinese.enabled !== false;
    cfg.chinese.shortClauseMax = Math.max(1, Math.floor(Number(cfg.chinese.shortClauseMax) || 3));
    cfg.chinese.mediumClauseMax = Math.max(cfg.chinese.shortClauseMax + 1, Math.floor(Number(cfg.chinese.mediumClauseMax) || 10));
    cfg.chinese.shortClauseEvery = Math.max(1, Math.floor(Number(cfg.chinese.shortClauseEvery) || 2));
    cfg.chinese.headMin = Math.max(1, Math.floor(Number(cfg.chinese.headMin) || 3));
    cfg.chinese.headMax = Math.max(cfg.chinese.headMin, Math.floor(Number(cfg.chinese.headMax) || cfg.chinese.headMin));
    cfg.chinese.gapMin = Math.max(0, Math.floor(Number(cfg.chinese.gapMin) || 3));
    cfg.chinese.gapMax = Math.max(cfg.chinese.gapMin, Math.floor(Number(cfg.chinese.gapMax) || cfg.chinese.gapMin));
    cfg.chinese.runMin = Math.max(1, Math.floor(Number(cfg.chinese.runMin) || 3));
    cfg.chinese.runMax = Math.max(cfg.chinese.runMin, Math.floor(Number(cfg.chinese.runMax) || cfg.chinese.runMin));
    cfg.chinese.sampleRate = clampNumber(cfg.chinese.sampleRate, 0, 1, 1);

    if (!cfg.dynamic || typeof cfg.dynamic !== 'object') cfg.dynamic = {};
    cfg.dynamic.debounceMs = Math.max(0, Math.floor(Number(cfg.dynamic.debounceMs) || 0));
    cfg.dynamic.eventNames = asArray(cfg.dynamic.eventNames);

    if (!cfg.performance || typeof cfg.performance !== 'object') cfg.performance = {};
    cfg.performance.minTextLength = Math.max(0, Math.floor(Number(cfg.performance.minTextLength) || 0));
    cfg.performance.maxTextLengthPerElement = Math.max(1000, Math.floor(Number(cfg.performance.maxTextLengthPerElement) || 180000));
    cfg.performance.batchSize = Math.max(1, Math.floor(Number(cfg.performance.batchSize) || 6));
    cfg.performance.batchBudgetMs = Math.max(1, Math.floor(Number(cfg.performance.batchBudgetMs) || 8));
    cfg.performance.idleTimeoutMs = Math.max(100, Math.floor(Number(cfg.performance.idleTimeoutMs) || 500));
    cfg.performance.maxQueueSize = Math.max(100, Math.floor(Number(cfg.performance.maxQueueSize) || 4000));

    if (!cfg.viewport || typeof cfg.viewport !== 'object') cfg.viewport = {};
    cfg.viewport.enabled = cfg.viewport.enabled !== false;
    cfg.viewport.rootMargin = cfg.viewport.rootMargin || '900px 0px';

    if (!cfg.startup || typeof cfg.startup !== 'object') cfg.startup = {};
    cfg.startup.delaySeconds = Math.max(0, Number(cfg.startup.delaySeconds) || 0);
  }

  /** Joins selector arrays. */
  function selectorList(selectors) {
    return asArray(selectors).join(',');
  }

  /** Returns true if an element matches at least one selector. */
  function matchesAny(element, selectors) {
    if (!element || element.nodeType !== 1) return false;
    const list = asArray(selectors);
    for (let i = 0; i < list.length; i += 1) {
      try {
        if (element.matches(list[i])) return true;
      } catch (e) {
        /* Ignore invalid user selectors. */
      }
    }
    return false;
  }

  /** Returns a timestamp with performance fallback. */
  function nowMs() {
    return window.performance && typeof window.performance.now === 'function'
      ? window.performance.now()
      : Date.now();
  }

  // ---------------------------------------------------------------------------
  // 2. DOM Discovery
  // ---------------------------------------------------------------------------

  /** Refreshes and caches configured root elements. */
  function refreshRoots() {
    const roots = [];
    state.config.rootSelectors.forEach(function (selector) {
      try {
        document.querySelectorAll(selector).forEach(function (node) {
          if (roots.indexOf(node) < 0) roots.push(node);
        });
      } catch (e) {
        /* Ignore invalid user selectors. */
      }
    });
    state.roots = roots;
    return roots;
  }

  /** Returns cached roots, refreshing only when empty or detached. */
  function getRoots() {
    if (!state.roots.length || state.roots.some(function (root) { return !root.isConnected; })) return refreshRoots();
    return state.roots;
  }

  /** Returns true if element is inside configured roots. */
  function isInsideRoots(element, roots) {
    if (!element || !roots || !roots.length) return false;
    return roots.some(function (root) {
      return root === element || root.contains(element);
    });
  }

  /** Returns true if node has an excluded ancestor before boundary. */
  function hasExcludedAncestor(node, boundary) {
    let element = node && node.nodeType === 1 ? node : node.parentElement;
    while (element) {
      if (matchesAny(element, state.config.excludeSelectors)) return true;
      if (element === boundary) break;
      element = element.parentElement;
    }
    return false;
  }

  /** Collects eligible leaf-like content elements under a scope. */
  function collectContentElements(scope, roots) {
    const currentRoots = roots || getRoots();
    const base = scope && scope.nodeType === 1 ? scope : document;
    const selector = selectorList(state.config.contentSelectors);
    if (!selector || !currentRoots.length) return [];

    const raw = [];
    const seen = new Set();

    function add(element) {
      if (!element || seen.has(element)) return;
      seen.add(element);
      raw.push(element);
    }

    if (base.nodeType === 1 && matchesAny(base, state.config.contentSelectors)) add(base);

    try {
      base.querySelectorAll(selector).forEach(add);
    } catch (e) {
      return [];
    }

    return raw.filter(function (element) {
      if (!isInsideRoots(element, currentRoots)) return false;
      if (matchesAny(element, state.config.excludeSelectors)) return false;
      if (hasExcludedAncestor(element.parentElement || element, null)) return false;
      try {
        return !element.querySelector(selector); // Match the older jtimeline-compatible leaf-block behavior.
      } catch (e) {
        return true;
      }
    });
  }

  /** Removes generated marks and processed signatures inside a scope. */
  function unwrapMarks(scope) {
    if (!scope || scope.nodeType !== 1) return;

    const parents = new Set();
    const marks = Array.from(scope.querySelectorAll(MARK_SELECTOR));
    marks.forEach(function (mark) {
      const parent = mark.parentNode;
      if (!parent) return;
      parents.add(parent);
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
    });
    parents.forEach(function (parent) {
      parent.normalize(); // Merge adjacent text nodes once per parent.
    });

    const attr = state.config.css.processedAttr || CONFIG.css.processedAttr;
    if (scope.hasAttribute && scope.hasAttribute(attr)) scope.removeAttribute(attr);
    try {
      scope.querySelectorAll('[' + attr + ']').forEach(function (node) {
        node.removeAttribute(attr);
      });
    } catch (e) {
      /* Ignore invalid attr edge cases. */
    }
  }

  /** Cleans all configured roots. */
  function cleanAll() {
    const roots = getRoots();
    withMutationPaused(function () {
      roots.forEach(unwrapMarks);
    });
  }

  /** Injects minimal CSS for generated marks. */
  function injectStyle() {
    const id = state.config.css.styleId || CONFIG.css.styleId;
    const old = document.getElementById(id);
    if (old) old.remove();

    const style = document.createElement('style');
    style.id = id;
    style.textContent = '.' + (state.config.css.markClass || CONFIG.css.markClass) + '{text-decoration:none;}';
    document.head.appendChild(style);
  }

  /** Removes injected CSS. */
  function removeStyle() {
    const id = state.config.css.styleId || CONFIG.css.styleId;
    const style = document.getElementById(id);
    if (style) style.remove();
  }

  // ---------------------------------------------------------------------------
  // 3. Text Transform
  // ---------------------------------------------------------------------------

  /** Returns a deterministic unsigned hash. */
  function hashString(str) {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i += 1) {
      hash ^= str.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash >>> 0;
  }

  /** Returns a deterministic pseudo-random number in [0, 1). */
  function nextRandomUnit(ctx) {
    let x = ctx.rngState || 2463534242;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    ctx.rngState = x >>> 0;
    return (ctx.rngState % 1000000) / 1000000;
  }

  /** Returns an integer in [min, max]. */
  function randomInt(ctx, min, max) {
    return min + Math.floor(nextRandomUnit(ctx) * (max - min + 1));
  }

  /** Returns true when a candidate mark passes sampling. */
  function passesSample(ctx, rate) {
    if (rate >= 1) return true;
    if (rate <= 0) return false;
    return nextRandomUnit(ctx) < rate;
  }

  /** Picks a mark color. */
  function pickColor(text, ctx) {
    const pool = state.config.colorPool;
    if (!pool.length) return '';
    if (state.config.random.mode === 'random') return pool[Math.floor(nextRandomUnit(ctx) * pool.length) % pool.length];
    const raw = state.config.random.seed + ':' + state.configVersion + ':' + ctx.markIndex + ':' + ctx.nodeIndex + ':' + text;
    return pool[hashString(raw) % pool.length];
  }

  /** Creates a generated mark span with only color/bold styling. */
  function createMark(text, ctx) {
    const span = document.createElement('span');
    const style = state.config.style;

    span.className = state.config.css.markClass || CONFIG.css.markClass;
    span.setAttribute(MARK_ATTR, '1');
    span.textContent = text;

    if (style.color !== false) span.style.color = pickColor(text, ctx); // Stable visual anchor.

    if (style.fontWeight === true) {
      if (nextRandomUnit(ctx) < style.fontWeightProbability) span.style.fontWeight = String(style.fontWeightValue || '700');
    } else if (style.fontWeight !== null && style.fontWeight !== undefined && style.fontWeight !== false) {
      span.style.fontWeight = String(style.fontWeight); // Exact-value compatibility.
    }

    ctx.markIndex += 1;
    return span;
  }

  /** Appends a text node if text is non-empty. */
  function appendText(fragment, text) {
    if (text) fragment.appendChild(document.createTextNode(text));
  }

  /** Checks ASCII English letters. */
  function isAsciiLetter(ch) {
    const code = ch.charCodeAt(0);
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
  }

  /** Checks English token connector characters. */
  function isEnglishConnector(ch) {
    return ch === '-' || ch === '\'' || ch === '’';
  }

  /** Reads one English-like token from text. */
  function readEnglishToken(text, start) {
    if (!isAsciiLetter(text.charAt(start))) return null;
    let i = start + 1;
    while (i < text.length) {
      const ch = text.charAt(i);
      if (isAsciiLetter(ch)) {
        i += 1;
        continue;
      }
      if (isEnglishConnector(ch) && i + 1 < text.length && isAsciiLetter(text.charAt(i + 1))) {
        i += 1;
        continue;
      }
      break;
    }
    return { token: text.slice(start, i), end: i };
  }

  /** Counts ASCII letters in a token. */
  function countLetters(token) {
    let count = 0;
    for (let i = 0; i < token.length; i += 1) {
      if (isAsciiLetter(token.charAt(i))) count += 1;
    }
    return count;
  }

  /** Splits a token after a given number of letters. */
  function splitAfterLetters(token, letterLimit) {
    let count = 0;
    for (let i = 0; i < token.length; i += 1) {
      if (isAsciiLetter(token.charAt(i))) count += 1;
      if (count >= letterLimit) return [token.slice(0, i + 1), token.slice(i + 1)];
    }
    return [token, ''];
  }

  /** Checks common CJK ideographs. */
  function isHan(ch) {
    const code = ch.charCodeAt(0);
    return (code >= 0x3400 && code <= 0x4DBF) ||
      (code >= 0x4E00 && code <= 0x9FFF) ||
      (code >= 0xF900 && code <= 0xFAFF);
  }

  /** Checks punctuation that splits Chinese clauses. */
  function isChineseClausePunctuation(ch) {
    return /[、。！？；：，,.!?;:()[\]{}"'“”‘’《》〈〉「」『』—…·\-]/.test(ch);
  }

  /** Counts Han characters in text. */
  function countHan(text) {
    let count = 0;
    for (let i = 0; i < text.length; i += 1) {
      if (isHan(text.charAt(i))) count += 1;
    }
    return count;
  }

  /** Reads a Chinese clause from a Han start until punctuation. */
  function readChineseClause(text, start) {
    let end = start;
    while (end < text.length && !isChineseClausePunctuation(text.charAt(end))) {
      end += 1;
    }
    return { token: text.slice(start, end), end: end };
  }

  /** Returns the string index just after the nth Han char from start. */
  function indexAfterHanCount(text, start, hanCount) {
    let seen = 0;
    for (let i = start; i < text.length; i += 1) {
      if (!isHan(text.charAt(i))) continue;
      seen += 1;
      if (seen >= hanCount) return i + 1;
    }
    return text.length;
  }

  /** Appends one possibly marked Chinese clause by length rules. */
  function appendChineseClause(fragment, clause, ctx) {
    const cfg = state.config.chinese;
    const hanCount = countHan(clause);

    if (!cfg.enabled || !hanCount) {
      appendText(fragment, clause);
      return false;
    }

    if (hanCount <= cfg.shortClauseMax) {
      ctx.shortClauseIndex += 1;
      const shouldMark = ((ctx.shortClauseIndex + ctx.shortClauseOffset) % cfg.shortClauseEvery) === 0;
      if (shouldMark && passesSample(ctx, cfg.sampleRate)) {
        fragment.appendChild(createMark(clause, ctx)); // Short clauses are marked as a whole, intermittently.
        return true;
      }
      appendText(fragment, clause);
      return false;
    }

    if (hanCount <= cfg.mediumClauseMax) {
      const headCount = Math.min(hanCount, randomInt(ctx, cfg.headMin, cfg.headMax));
      const headEnd = indexAfterHanCount(clause, 0, headCount);
      const head = clause.slice(0, headEnd);
      const rest = clause.slice(headEnd);

      if (passesSample(ctx, cfg.sampleRate)) {
        fragment.appendChild(createMark(head, ctx));
        appendText(fragment, rest);
        return true;
      }

      appendText(fragment, clause);
      return false;
    }

    let changed = false;
    let cursor = 0;
    let first = true;

    while (cursor < clause.length) {
      const isHeadRun = first;
      if (first) {
        first = false;
      } else {
        const gapCount = randomInt(ctx, cfg.gapMin, cfg.gapMax);
        const gapEnd = indexAfterHanCount(clause, cursor, gapCount);
        appendText(fragment, clause.slice(cursor, gapEnd));
        cursor = gapEnd;
        if (cursor >= clause.length) break;
      }

      const runCount = isHeadRun ? randomInt(ctx, cfg.headMin, cfg.headMax) : randomInt(ctx, cfg.runMin, cfg.runMax);
      const runEnd = indexAfterHanCount(clause, cursor, runCount);
      const run = clause.slice(cursor, runEnd);

      if (run && passesSample(ctx, cfg.sampleRate)) {
        fragment.appendChild(createMark(run, ctx));
        changed = true;
      } else {
        appendText(fragment, run);
      }

      cursor = runEnd;
    }

    return changed;
  }

  /** Converts one text node into a marked fragment when needed. */
  function transformTextNode(textNode, ctx) {
    const text = textNode.nodeValue || '';
    if (text.length < state.config.performance.minTextLength || !text.trim()) return null;

    const fragment = document.createDocumentFragment();
    let changed = false;
    let i = 0;

    while (i < text.length) {
      const ch = text.charAt(i);

      if (state.config.english.enabled && isAsciiLetter(ch)) {
        const word = readEnglishToken(text, i);
        const letterCount = countLetters(word.token);

        if (letterCount > state.config.english.minLength && passesSample(ctx, state.config.english.sampleRate)) {
          const prefixLen = Math.floor(letterCount / 2); // 4/5 -> 2, 6/7 -> 3, 8/9 -> 4.
          const pair = splitAfterLetters(word.token, prefixLen);
          fragment.appendChild(createMark(pair[0], ctx));
          appendText(fragment, pair[1]);
          changed = true;
        } else {
          appendText(fragment, word.token);
        }

        i = word.end;
        continue;
      }

      if (isHan(ch)) {
        const clause = readChineseClause(text, i);
        if (appendChineseClause(fragment, clause.token, ctx)) changed = true;
        i = clause.end;
        continue;
      }

      appendText(fragment, ch); // Punctuation and non-Han text pass through without Chinese gap cost.
      i += 1;
    }

    return changed ? fragment : null;
  }

  /** Collects eligible text nodes inside one element. */
  function collectTextNodes(element) {
    const nodes = [];
    const filter = {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (hasExcludedAncestor(node, element)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    };

    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, filter);
    let node = walker.nextNode();
    while (node) {
      nodes.push(node);
      node = walker.nextNode();
    }
    return nodes;
  }

  /** Builds a skip-safe element signature. */
  function getElementSignature(element) {
    return String(state.configVersion) + ':' + String(hashString(element.textContent || ''));
  }

  /** Processes one eligible element. */
  function processElement(element) {
    if (!element || element.nodeType !== 1 || !document.documentElement.contains(element)) return false;
    if ((element.textContent || '').length > state.config.performance.maxTextLengthPerElement) return false;

    const attr = state.config.css.processedAttr || CONFIG.css.processedAttr;
    const signature = getElementSignature(element);
    if (element.getAttribute(attr) === signature) return false;

    unwrapMarks(element);

    const textNodes = collectTextNodes(element);
    if (!textNodes.length) {
      element.setAttribute(attr, signature);
      return false;
    }

    const ctx = {
      markIndex: 0,
      nodeIndex: 0,
      rngState: hashString((element.textContent || '') + ':' + state.config.random.seed),
      shortClauseIndex: 0,
      shortClauseOffset: 0
    };

    let changed = false;
    textNodes.forEach(function (textNode) {
      ctx.nodeIndex += 1;
      const fragment = transformTextNode(textNode, ctx);
      if (!fragment || !textNode.parentNode) return;
      textNode.parentNode.replaceChild(fragment, textNode);
      state.processedTextNodes += 1;
      changed = true;
    });

    element.setAttribute(attr, signature);
    if (changed) state.processedElements += 1;
    return changed;
  }

  // ---------------------------------------------------------------------------
  // 4. Scheduler
  // ---------------------------------------------------------------------------

  /** Suppresses observer feedback while this script writes DOM. */
  function withMutationPaused(fn) {
    state.applying = true;
    try {
      fn();
    } finally {
      window.setTimeout(function () {
        state.applying = false;
      }, 0);
    }
  }

  /** Clears queued processing timer. */
  function clearQueueTimer() {
    if (!state.queueTimer) return;
    if (state.queueTimerType === 'idle' && window.cancelIdleCallback) window.cancelIdleCallback(state.queueTimer);
    else window.clearTimeout(state.queueTimer);
    state.queueTimer = null;
    state.queueTimerType = '';
  }

  /** Schedules one queue-processing slice. */
  function scheduleQueue() {
    if (!state.enabled || state.destroyed || state.queueTimer || !state.queue.length) return;

    if (window.requestIdleCallback) {
      state.queueTimerType = 'idle';
      state.queueTimer = window.requestIdleCallback(processQueue, { timeout: state.config.performance.idleTimeoutMs });
      return;
    }

    state.queueTimerType = 'timeout';
    state.queueTimer = window.setTimeout(function () {
      processQueue(null);
    }, 16);
  }

  /** Processes a bounded queue slice. */
  function processQueue(deadline) {
    state.queueTimer = null;
    state.queueTimerType = '';
    if (!state.enabled || state.destroyed) return;

    const start = nowMs();
    const budget = state.config.performance.batchBudgetMs;
    const maxItems = state.config.performance.batchSize;
    let count = 0;

    withMutationPaused(function () {
      while (state.queue.length && count < maxItems) {
        const elapsed = nowMs() - start;
        const hasIdleTime = !deadline || deadline.timeRemaining() > 2 || deadline.didTimeout;
        if (count > 0 && (elapsed >= budget || !hasIdleTime)) break; // Yield to browser.

        const element = state.queue.shift();
        state.queueSet.delete(element);
        processElement(element);
        count += 1;
      }
    });

    state.lastQueueAt = Date.now();
    if (state.queue.length) scheduleQueue();
  }

  /** Adds elements to queue in supplied order. */
  function enqueueElements(elements, priority) {
    const accepted = [];
    const list = Array.isArray(elements) ? elements : [];

    list.forEach(function (element) {
      if (!element || element.nodeType !== 1 || state.queueSet.has(element)) return;
      if (state.queue.length + accepted.length >= state.config.performance.maxQueueSize) return; // Runaway guard.
      state.queueSet.add(element);
      accepted.push(element);
    });

    if (!accepted.length) return;
    state.queue = priority ? accepted.concat(state.queue) : state.queue.concat(accepted); // Block prepend preserves order.
    scheduleQueue();
  }

  /** Adds one element to queue. */
  function enqueueElement(element, priority) {
    enqueueElements([element], priority);
  }

  /** Sorts elements by visual page position. Used only for viewport entries. */
  function sortByPagePosition(elements) {
    return elements.slice().sort(function (a, b) {
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      const ay = ar.top + window.pageYOffset;
      const by = br.top + window.pageYOffset;
      if (ay !== by) return ay - by;
      return (ar.left + window.pageXOffset) - (br.left + window.pageXOffset);
    });
  }

  /** Observes or queues content elements under a scope. */
  function enqueueScope(scope, priority) {
    if (!state.enabled || state.destroyed) return;

    const elements = collectContentElements(scope || document, getRoots());
    if (!elements.length) return;

    if (!state.config.viewport.enabled || !window.IntersectionObserver || !state.viewportObserver) {
      enqueueElements(elements, priority);
      return;
    }

    elements.forEach(function (element) {
      if (state.observedSet.has(element)) return;
      state.observedSet.add(element);
      state.viewportObserver.observe(element); // Processing happens after intersection.
    });
  }

  /** Handles viewport intersections. */
  function onViewportEntries(entries) {
    const visible = [];
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      if (state.config.viewport.observeOnce && state.viewportObserver) state.viewportObserver.unobserve(entry.target);
      visible.push(entry.target);
    });

    if (visible.length) enqueueElements(sortByPagePosition(visible), true); // Top-to-bottom for visible batch.
  }

  /** Sets up viewport observer. */
  function setupViewportObserver() {
    if (state.viewportObserver) state.viewportObserver.disconnect();
    state.viewportObserver = null;
    state.observedSet = new WeakSet();

    if (!state.config.viewport.enabled || !window.IntersectionObserver) return;

    state.viewportObserver = new IntersectionObserver(onViewportEntries, {
      root: null,
      rootMargin: state.config.viewport.rootMargin || '900px 0px',
      threshold: 0
    });
  }

  /** Schedules a debounced scan after dynamic DOM changes. */
  function scheduleScan(scope) {
    if (!state.enabled || state.destroyed || state.applying) return;
    window.clearTimeout(state.scanTimer);
    state.scanTimer = window.setTimeout(function () {
      if (!getRoots().length) refreshRoots(); // Low-frequency root refresh after DOM replacement.
      enqueueScope(scope || document, true);
      state.lastScanAt = Date.now();
    }, state.config.dynamic.debounceMs);
  }

  /** Handles MutationObserver records without processing immediately. */
  function onMutations(mutations) {
    if (state.applying || !state.enabled) return;

    for (let i = 0; i < mutations.length; i += 1) {
      const mutation = mutations[i];
      const target = mutation.target && mutation.target.nodeType === 1 ? mutation.target : mutation.target.parentElement;
      if (target && target.closest && target.closest(MARK_SELECTOR)) continue;
      scheduleScan(target || document);
      return;
    }
  }

  /** Sets up MutationObserver on roots, or body until roots appear. */
  function setupMutationObserver() {
    if (state.mutationObserver) state.mutationObserver.disconnect();
    state.mutationObserver = null;

    if (!state.config.dynamic.observe || !window.MutationObserver) return;

    const roots = getRoots();
    const targets = roots.length ? roots : (document.body ? [document.body] : []);
    if (!targets.length) return;

    state.mutationObserver = new MutationObserver(onMutations);
    targets.forEach(function (target) {
      state.mutationObserver.observe(target, { childList: true, subtree: true, characterData: true });
    });
  }

  /** Binds render events emitted by dynamic renderers. */
  function bindRenderEvents() {
    state.eventCleanups.forEach(function (cleanup) { cleanup(); });
    state.eventCleanups = [];

    asArray(state.config.dynamic.eventNames).forEach(function (name) {
      const handler = function (event) {
        const container = event && event.detail && event.detail.container;
        scheduleScan(container && container.nodeType === 1 ? container : document);
      };
      document.addEventListener(name, handler);
      state.eventCleanups.push(function () {
        document.removeEventListener(name, handler);
      });
    });
  }

  /** Clears queue, timers, and viewport observer. */
  function resetQueueAndViewport() {
    clearQueueTimer();
    window.clearTimeout(state.scanTimer);
    state.scanTimer = null;
    state.queue = [];
    state.queueSet = new WeakSet();
    state.observedSet = new WeakSet();
    if (state.viewportObserver) state.viewportObserver.disconnect();
    state.viewportObserver = null;
  }

  /** Clears all runtime timers. */
  function clearRuntimeTimers() {
    clearQueueTimer();
    window.clearTimeout(state.scanTimer);
    window.clearTimeout(state.bootTimer);
    state.scanTimer = null;
    state.bootTimer = null;
  }

  // ---------------------------------------------------------------------------
  // 5. Public API and Lifecycle
  // ---------------------------------------------------------------------------

  /** Rebuilds runtime immediately; startup delay is not applied here. */
  function rebuild() {
    if (state.destroyed) return api;

    normalizeConfig();
    refreshRoots();
    injectStyle();
    bindRenderEvents();
    resetQueueAndViewport();
    setupViewportObserver();
    setupMutationObserver();
    enqueueScope(document, false);

    return api;
  }

  /** Enables and rebuilds immediately. */
  function enable() {
    state.enabled = true;
    state.config.enabled = true;
    return rebuild();
  }

  /** Disables and removes generated marks. */
  function disable() {
    state.enabled = false;
    state.config.enabled = false;
    clearRuntimeTimers();
    resetQueueAndViewport();
    cleanAll();
    return api;
  }

  /** Toggles enabled state. */
  function toggle(force) {
    if (typeof force === 'boolean') return force ? enable() : disable();
    return state.enabled ? disable() : enable();
  }

  /** Updates config and rebuilds immediately. */
  function updateConfig(nextConfig) {
    if (nextConfig && typeof nextConfig === 'object') merge(state.config, nextConfig);
    state.configVersion += 1;
    state.enabled = state.config.enabled !== false;
    clearRuntimeTimers();
    resetQueueAndViewport();
    cleanAll();
    return state.enabled ? rebuild() : api;
  }

  /** Fully destroys runtime and generated marks. */
  function destroy() {
    state.destroyed = true;
    clearRuntimeTimers();
    resetQueueAndViewport();

    if (state.mutationObserver) state.mutationObserver.disconnect();
    state.mutationObserver = null;

    state.eventCleanups.forEach(function (cleanup) { cleanup(); });
    state.eventCleanups = [];

    cleanAll();
    removeStyle();
    return null;
  }

  /** Returns cloned config. */
  function getConfig() {
    return deepClone(state.config);
  }

  /** Returns lightweight state. */
  function getState() {
    return {
      enabled: state.enabled,
      destroyed: state.destroyed,
      hasBooted: state.hasBooted,
      configVersion: state.configVersion,
      rootCount: getRoots().length,
      queueLength: state.queue.length,
      viewportEnabled: Boolean(state.config.viewport.enabled && window.IntersectionObserver),
      processedElements: state.processedElements,
      processedTextNodes: state.processedTextNodes,
      lastScanAt: state.lastScanAt,
      lastQueueAt: state.lastQueueAt
    };
  }

  const api = {
    enable: enable,
    disable: disable,
    toggle: toggle,
    rebuild: rebuild,
    destroy: destroy,
    updateConfig: updateConfig,
    getConfig: getConfig,
    getState: getState
  };

  /** Exposes public API. */
  function exposeApi() {
    window.ADHDReadMode = api;
    if (state.config.globalApiName) window[state.config.globalApiName] = updateConfig;
  }

  /** Starts first runtime after startup delay. */
  function startAfterInitialDelay() {
    if (state.destroyed || !state.enabled) return;

    state.hasBooted = true;
    const delay = state.config.startup.delaySeconds;

    if (delay > 0) {
      state.bootTimer = window.setTimeout(function () {
        state.bootTimer = null;
        if (state.enabled && !state.destroyed) rebuild();
      }, delay * 1000);
      return;
    }

    rebuild();
  }

  /** Boots after DOM readiness. */
  function boot() {
    normalizeConfig();
    exposeApi();
    if (state.enabled) startAfterInitialDelay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
