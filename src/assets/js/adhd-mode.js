/*!
 * ADHD Read Mode v4-lite
 *
 * Introduction:
 * A compact plug-and-play ADHD reading helper for long-form pages.
 * It keeps the mature English word-anchor behavior and adds a lightweight CJK character animation effect.
 *
 * Usage:
 * Include this file after page content or before DOMContentLoaded. It runs automatically when enabled is true.
 * Customize by editing CONFIG below, or call ADHDReadMode.updateConfig({ ... }) later.
 *
 * Global API:
 * window.ADHDReadMode.toggle(force?)  - Toggle enabled/disabled state. Optional boolean force is supported.
 * window.ADHDReadMode.updateConfig()  - Merge config, clean old output, and rebuild.
 * window.ADHDReadMode.getConfig()     - Return a cloned runtime config.
 * window.updateConfig()               - Convenience alias for ADHDReadMode.updateConfig().
 *
 * Notes:
 * English word anchors persist until disabled/rebuilt. CJK effects temporarily wrap exactly one visible CJK
 * character, pre-color it, play one balanced random animation, and restore it to normal text.
 */
(function () {
  "use strict";

  const CONFIG = {
    enabled: true,

    rootSelectors: [".post-content"],
    contentSelectors: ["p", "li", "td", "th", "blockquote", "dd", "dt", "figcaption"],
    excludeSelectors: [
      "pre", "code", "strong", "em", "kbd", "samp", "script", "style", "textarea", "input", "select", "option",
      "button", "svg", "canvas", "math", "mjx-container", ".math", ".MathJax", ".katex", ".katex-display",
      ".mermaid", ".highlight", ".rouge-code", ".rouge-table", ".lineno", ".no-adhd", ".adhd-ignore",
      ".jsd-linear-toolbar", ".jsd-tree-widget", "[data-adhd-rm='1']", ".adhd-cjk-live", ".adhd-fx-snowflake"
    ],

    colorPool: [
      "#8B929E", "#4857fa", "#C6F94A", "#CBD5E1", "#38F8FF", "#27f9a8", "#8a076d", "#FF5D73", "#7DD6A8",
      "#9844f2", "#FF4D6D", "#FFD166", "#4DA3FF", "#D26BFF", "#E6EDF3", "#7D8590", "#FF9F43"
    ],

    style: {
      color: true,
      fontWeight: false,
      fontWeightProbability: 0.2,
      fontWeightValue: "700"
    },

    wordMode: {
      enabled: true,
      minLength: 4,
      sampleRate: 1,
      batchSize: 8,
      batchDelayMs: 16,
      maxTextLengthPerElement: 180000
    },

    cjkEffect: {
      enabled: true,
      intervalMs: 5000,
      preColorMs: 2000,
      jumpMs: 1200,
      shiverMs: 1000,
      growMs: 1200,
      snowflakeMin: 3,
      snowflakeMax: 6,
      maxVisibleBlocks: 80,
      maxTextNodesPerTick: 180
    },

    dynamic: {
      eventNames: ["content:rendered"]
    },

    random: {
      mode: "stable",
      seed: "adhd-read-mode-v4-lite"
    },

    css: {
      styleId: "adhd-read-mode-style",
      wordClass: "adhd-word-mark",
      wordAttr: "data-adhd-word-signature"
    },

    globalApiName: "updateConfig",
    zIndex: 2147483000
  };

  const MARK_ATTR = "data-adhd-rm";

  const state = {
    config: clone(CONFIG),
    enabled: Boolean(CONFIG.enabled),
    roots: [],
    wordQueue: [],
    wordTimer: 0,
    cjkTimer: 0,
    activeChars: new Set(),
    activeFx: new Set(),
    effectBag: [],
    eventCleanups: [],
    rngState: 2463534242,
    configVersion: 1,
    applying: false
  };

  /** Clones plain config objects. */
  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /** Deep-merges source into target; arrays are replaced. */
  function merge(target, source) {
    if (!source || typeof source !== "object") return target;
    Object.keys(source).forEach(function (key) {
      const value = source[key];
      if (value && typeof value === "object" && !Array.isArray(value)) {
        if (!target[key] || typeof target[key] !== "object" || Array.isArray(target[key])) target[key] = {};
        merge(target[key], value);
      } else {
        target[key] = value;
      }
    });
    return target;
  }

  /** Normalizes arrays. */
  function asArray(value) {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (typeof value === "string" && value.trim()) return [value.trim()];
    return [];
  }

  /** Clamps a number. */
  function clamp(value, min, max, fallback) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(min, Math.min(max, number));
  }

  /** Normalizes runtime config. */
  function normalizeConfig() {
    const cfg = state.config;
    cfg.rootSelectors = asArray(cfg.rootSelectors);
    cfg.contentSelectors = asArray(cfg.contentSelectors);
    cfg.excludeSelectors = asArray(cfg.excludeSelectors);
    cfg.colorPool = normalizeColorPool(cfg.colorPool);

    cfg.style = cfg.style || {};
    cfg.style.color = cfg.style.color !== false;
    cfg.style.fontWeightProbability = clamp(cfg.style.fontWeightProbability, 0, 1, 0.2);
    cfg.style.fontWeightValue = cfg.style.fontWeightValue || "700";

    cfg.wordMode = cfg.wordMode || {};
    cfg.wordMode.enabled = cfg.wordMode.enabled !== false;
    cfg.wordMode.minLength = Math.max(0, Math.floor(Number(cfg.wordMode.minLength) || 0));
    cfg.wordMode.sampleRate = clamp(cfg.wordMode.sampleRate, 0, 1, 1);
    cfg.wordMode.batchSize = Math.max(1, Math.floor(Number(cfg.wordMode.batchSize) || 8));
    cfg.wordMode.batchDelayMs = Math.max(0, Math.floor(Number(cfg.wordMode.batchDelayMs) || 16));
    cfg.wordMode.maxTextLengthPerElement = Math.max(1000, Math.floor(Number(cfg.wordMode.maxTextLengthPerElement) || 180000));

    cfg.cjkEffect = cfg.cjkEffect || {};
    cfg.cjkEffect.enabled = cfg.cjkEffect.enabled !== false;
    cfg.cjkEffect.intervalMs = Math.max(600, Math.floor(Number(cfg.cjkEffect.intervalMs) || 3000));
    cfg.cjkEffect.preColorMs = Math.max(0, Math.floor(Number(cfg.cjkEffect.preColorMs) || 2000));
    cfg.cjkEffect.jumpMs = Math.max(300, Math.floor(Number(cfg.cjkEffect.jumpMs) || 1450));
    cfg.cjkEffect.shiverMs = Math.max(300, Math.floor(Number(cfg.cjkEffect.shiverMs) || 1700));
    cfg.cjkEffect.growMs = Math.max(300, Math.floor(Number(cfg.cjkEffect.growMs) || 1500));
    cfg.cjkEffect.snowflakeMin = Math.max(0, Math.floor(Number(cfg.cjkEffect.snowflakeMin) || 3));
    cfg.cjkEffect.snowflakeMax = Math.max(cfg.cjkEffect.snowflakeMin, Math.floor(Number(cfg.cjkEffect.snowflakeMax) || 6));
    cfg.cjkEffect.maxVisibleBlocks = Math.max(1, Math.floor(Number(cfg.cjkEffect.maxVisibleBlocks) || 80));
    cfg.cjkEffect.maxTextNodesPerTick = Math.max(1, Math.floor(Number(cfg.cjkEffect.maxTextNodesPerTick) || 180));

    cfg.dynamic = cfg.dynamic || {};
    cfg.dynamic.eventNames = asArray(cfg.dynamic.eventNames);
  }

  /** Keeps valid-looking hex colors and removes duplicates. */
  function normalizeColorPool(pool) {
    const seen = Object.create(null);
    const list = asArray(pool).filter(function (color) {
      const value = String(color).trim();
      const ok = value.charAt(0) === "#" && (value.length === 4 || value.length === 7 || value.length === 9);
      const key = value.toLowerCase();
      if (!ok || seen[key]) return false;
      seen[key] = true;
      return true;
    });
    return list.length ? list : CONFIG.colorPool.slice();
  }

  /** Returns true if an element matches any selector. */
  function matchesAny(element, selectors) {
    if (!element || element.nodeType !== 1) return false;
    const list = asArray(selectors);
    for (let i = 0; i < list.length; i += 1) {
      try {
        if (element.matches(list[i])) return true;
      } catch (e) {
        /* Ignore invalid selectors. */
      }
    }
    return false;
  }

  /** Returns true if a node has an excluded ancestor before boundary. */
  function hasExcludedAncestor(node, boundary) {
    let element = node && node.nodeType === 1 ? node : node.parentElement;
    while (element) {
      if (matchesAny(element, state.config.excludeSelectors)) return true;
      if (element === boundary) break;
      element = element.parentElement;
    }
    return false;
  }

  /** Suppresses self-triggered cleanup side effects. */
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

  /** Injects CSS. */
  function injectStyle() {
    if (document.getElementById(state.config.css.styleId)) return;
    const style = document.createElement("style");
    style.id = state.config.css.styleId;
    style.textContent = [
      ".adhd-word-mark{text-decoration:none;}",
      ".adhd-cjk-live{display:inline-block;will-change:color,transform,opacity;transition:color var(--adhd-precolor-ms) ease;transform-origin:center center;}",
      ".adhd-cjk-jump{animation:adhd-cjk-jump var(--adhd-effect-ms) cubic-bezier(.22,.75,.25,1) forwards;transform-origin:center bottom;}",
      "@keyframes adhd-cjk-jump{0%{transform:translate3d(0,0,0) scale(1,1)}16%{transform:translate3d(0,.08em,0) scale(1.12,.78)}28%{transform:translate3d(0,0,0) scale(.9,1.16)}54%{transform:translate3d(0,-1.25em,0) scale(1,1)}76%{transform:translate3d(0,-.38em,0) scale(1,1)}90%{transform:translate3d(0,.04em,0) scale(1.06,.9)}100%{transform:translate3d(0,0,0) scale(1,1)}}",
      ".adhd-cjk-shiver{animation:adhd-cjk-shiver var(--adhd-effect-ms) linear forwards;}",
      "@keyframes adhd-cjk-shiver{0%{transform:translate3d(0,0,0)}8.33%{transform:translate3d(-.28em,0,0)}16.66%{transform:translate3d(.28em,0,0)}25%{transform:translate3d(-.23em,0,0)}33.33%{transform:translate3d(.23em,0,0)}41.66%{transform:translate3d(-.18em,0,0)}50%{transform:translate3d(.18em,0,0)}58.33%{transform:translate3d(-.13em,0,0)}66.66%{transform:translate3d(.13em,0,0)}75%{transform:translate3d(-.08em,0,0)}83.33%{transform:translate3d(.08em,0,0)}91.66%{transform:translate3d(-.03em,0,0)}100%{transform:translate3d(0,0,0)}}",
      ".adhd-cjk-grow{animation:adhd-cjk-grow var(--adhd-effect-ms) linear forwards;transform-origin:center center;}",
      "@keyframes adhd-cjk-grow{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(2.45)}}",
      ".adhd-fx-snowflake{position:fixed;pointer-events:none;will-change:transform,opacity;z-index:" + state.config.zIndex + ";animation:adhd-fx-snowflake 1200ms ease-out forwards;color:#E6EDF3;text-shadow:0 0 .35em currentColor;}",
      "@keyframes adhd-fx-snowflake{0%{opacity:1;transform:translate3d(0,0,0) scale(.85)}100%{opacity:0;transform:translate3d(var(--adhd-snow-x),var(--adhd-snow-y),0) scale(1.18)}}"
    ].join("");
    document.head.appendChild(style);
  }

  /** Removes injected CSS. */
  function removeStyle() {
    const style = document.getElementById(state.config.css.styleId);
    if (style) style.remove();
  }

  /** Returns a deterministic hash. */
  function hashString(str) {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i += 1) {
      hash ^= str.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash >>> 0;
  }

  /** Deterministic random for wordMode. */
  function nextRandomUnit(ctx) {
    let x = ctx.rngState || 2463534242;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    ctx.rngState = x >>> 0;
    return (ctx.rngState % 1000000) / 1000000;
  }

  /** Runtime random for effects. */
  function randomUnit() {
    let x = state.rngState || 2463534242;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    state.rngState = x >>> 0;
    return (state.rngState % 1000000) / 1000000;
  }

  /** Runtime integer random. */
  function randomInt(min, max) {
    return min + Math.floor(randomUnit() * (max - min + 1));
  }

  /** Picks one item. */
  function pickOne(list) {
    if (!list.length) return null;
    return list[Math.floor(randomUnit() * list.length) % list.length];
  }

  /** Shuffles a small array. */
  function shuffled(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(randomUnit() * (i + 1));
      const value = copy[i];
      copy[i] = copy[j];
      copy[j] = value;
    }
    return copy;
  }

  /** Returns next balanced CJK effect id: 0 jump, 1 shiver, 2 grow. */
  function nextEffectId() {
    if (!state.effectBag.length) state.effectBag = shuffled([0, 1, 2]);
    return state.effectBag.pop();
  }

  /** Checks common CJK glyph ranges. */
  function isCjk(ch) {
    const code = ch.charCodeAt(0);
    return (code >= 0x3400 && code <= 0x4DBF) ||
      (code >= 0x4E00 && code <= 0x9FFF) ||
      (code >= 0xF900 && code <= 0xFAFF) ||
      (code >= 0x3040 && code <= 0x30FF) ||
      (code >= 0xAC00 && code <= 0xD7AF);
  }

  /** Checks word letters; excludes CJK. */
  function isWordLetter(ch) {
    if (isCjk(ch)) return false;
    const code = ch.charCodeAt(0);
    return (code >= 65 && code <= 90) ||
      (code >= 97 && code <= 122) ||
      (code >= 0x00C0 && code <= 0x024F) ||
      (code >= 0x0370 && code <= 0x03FF) ||
      (code >= 0x0400 && code <= 0x052F) ||
      (code >= 0x0600 && code <= 0x06FF);
  }

  /** Checks connector chars inside word tokens. */
  function isWordConnector(ch) {
    return ch === "-" || ch === "_" || ch === "’" || ch === String.fromCharCode(39);
  }

  /** Reads one word token. */
  function readWordToken(text, start) {
    if (!isWordLetter(text.charAt(start))) return null;
    let i = start + 1;
    while (i < text.length) {
      const ch = text.charAt(i);
      if (isWordLetter(ch)) {
        i += 1;
        continue;
      }
      if (isWordConnector(ch) && i + 1 < text.length && isWordLetter(text.charAt(i + 1))) {
        i += 1;
        continue;
      }
      break;
    }
    return { token: text.slice(start, i), end: i };
  }

  /** Counts word letters. */
  function countWordLetters(token) {
    let count = 0;
    for (let i = 0; i < token.length; i += 1) {
      if (isWordLetter(token.charAt(i))) count += 1;
    }
    return count;
  }

  /** Splits a token after letterLimit letters. */
  function splitAfterLetters(token, letterLimit) {
    let count = 0;
    for (let i = 0; i < token.length; i += 1) {
      if (isWordLetter(token.charAt(i))) count += 1;
      if (count >= letterLimit) return [token.slice(0, i + 1), token.slice(i + 1)];
    }
    return [token, ""];
  }

  /** Returns true when a word candidate passes sampling. */
  function passesWordSample(ctx) {
    const rate = state.config.wordMode.sampleRate;
    if (rate >= 1) return true;
    if (rate <= 0) return false;
    return nextRandomUnit(ctx) < rate;
  }

  /** Picks a stable word color. */
  function pickStableColor(text, ctx) {
    const pool = state.config.colorPool;
    if (!pool.length) return "";
    if (state.config.random.mode === "random") return pool[Math.floor(nextRandomUnit(ctx) * pool.length) % pool.length];
    const raw = state.config.random.seed + ":" + state.configVersion + ":" + ctx.markIndex + ":" + ctx.nodeIndex + ":" + text;
    return pool[hashString(raw) % pool.length];
  }

  /** Picks a runtime effect color. */
  function pickRuntimeColor() {
    return state.config.colorPool[randomInt(0, state.config.colorPool.length - 1)] || "#38F8FF";
  }

  /** Creates a word mark. */
  function createWordMark(text, ctx) {
    const span = document.createElement("span");
    const style = state.config.style;
    span.className = state.config.css.wordClass;
    span.setAttribute(MARK_ATTR, "1");
    span.textContent = text;

    if (style.color !== false) span.style.color = pickStableColor(text, ctx);
    if (style.fontWeight === true && nextRandomUnit(ctx) < style.fontWeightProbability) {
      span.style.fontWeight = String(style.fontWeightValue || "700");
    } else if (style.fontWeight !== null && style.fontWeight !== undefined && style.fontWeight !== false && style.fontWeight !== true) {
      span.style.fontWeight = String(style.fontWeight);
    }

    ctx.markIndex += 1;
    return span;
  }

  /** Appends text if non-empty. */
  function appendText(fragment, text) {
    if (text) fragment.appendChild(document.createTextNode(text));
  }

  /** Transforms one text node for wordMode. */
  function transformWordTextNode(textNode, ctx) {
    const text = textNode.nodeValue || "";
    if (!text.trim()) return null;

    const fragment = document.createDocumentFragment();
    let changed = false;
    let i = 0;

    while (i < text.length) {
      const ch = text.charAt(i);
      if (state.config.wordMode.enabled && isWordLetter(ch)) {
        const word = readWordToken(text, i);
        const letterCount = countWordLetters(word.token);
        if (letterCount > state.config.wordMode.minLength && passesWordSample(ctx)) {
          const parts = splitAfterLetters(word.token, Math.floor(letterCount / 2));
          fragment.appendChild(createWordMark(parts[0], ctx));
          appendText(fragment, parts[1]);
          changed = true;
        } else {
          appendText(fragment, word.token);
        }
        i = word.end;
        continue;
      }
      appendText(fragment, ch);
      i += 1;
    }

    return changed ? fragment : null;
  }

  /** Gets current root elements. */
  function getRoots() {
    const roots = [];
    state.config.rootSelectors.forEach(function (selector) {
      try {
        document.querySelectorAll(selector).forEach(function (root) {
          if (roots.indexOf(root) < 0) roots.push(root);
        });
      } catch (e) {
        /* Ignore invalid selectors. */
      }
    });
    state.roots = roots;
    return roots;
  }

  /** Collects leaf-like content elements. */
  function collectContentElements() {
    const roots = getRoots();
    const selector = state.config.contentSelectors.join(",");
    const elements = [];
    const seen = new Set();

    function add(element) {
      if (!element || seen.has(element)) return;
      if (matchesAny(element, state.config.excludeSelectors)) return;
      if (hasExcludedAncestor(element.parentElement || element, null)) return;
      try {
        if (element.querySelector(selector)) return;
      } catch (e) {
        /* Keep element. */
      }
      seen.add(element);
      elements.push(element);
    }

    roots.forEach(function (root) {
      if (matchesAny(root, state.config.contentSelectors)) add(root);
      try {
        root.querySelectorAll(selector).forEach(add);
      } catch (e) {
        /* Ignore invalid selectors. */
      }
    });

    return elements;
  }

  /** Collects eligible text nodes inside one element. */
  function collectTextNodes(element) {
    const nodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (hasExcludedAncestor(node, element)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node = walker.nextNode();
    while (node) {
      nodes.push(node);
      node = walker.nextNode();
    }
    return nodes;
  }

  /** Builds a word processing signature. */
  function getElementSignature(element) {
    return String(state.configVersion) + ":" + String(hashString(element.textContent || ""));
  }

  /** Processes word anchors in one element. */
  function processWordElement(element) {
    if (!element || !element.isConnected) return;
    if ((element.textContent || "").length > state.config.wordMode.maxTextLengthPerElement) return;

    const attr = state.config.css.wordAttr;
    const signature = getElementSignature(element);
    if (element.getAttribute(attr) === signature) return;

    unwrapWordMarks(element);

    const textNodes = collectTextNodes(element);
    const ctx = {
      markIndex: 0,
      nodeIndex: 0,
      rngState: hashString((element.textContent || "") + ":" + state.config.random.seed)
    };

    withMutationPaused(function () {
      textNodes.forEach(function (textNode) {
        ctx.nodeIndex += 1;
        const fragment = transformWordTextNode(textNode, ctx);
        if (fragment && textNode.parentNode) textNode.parentNode.replaceChild(fragment, textNode);
      });
      element.setAttribute(attr, signature);
    });
  }

  /** Schedules word anchor processing in small chunks. */
  function processWordAnchors() {
    if (!state.config.wordMode.enabled) return;
    state.wordQueue = collectContentElements();
    processWordBatch();
  }

  /** Processes one word anchor batch. */
  function processWordBatch() {
    window.clearTimeout(state.wordTimer);
    if (!state.enabled || !state.wordQueue.length) return;

    const limit = state.config.wordMode.batchSize;
    for (let i = 0; i < limit && state.wordQueue.length; i += 1) {
      processWordElement(state.wordQueue.shift());
    }

    if (state.wordQueue.length) {
      state.wordTimer = window.setTimeout(processWordBatch, state.config.wordMode.batchDelayMs);
    }
  }

  /** Unwraps generated word marks. */
  function unwrapWordMarks(scope) {
    if (!scope || scope.nodeType !== 1) return;
    const parents = new Set();
    const marks = Array.from(scope.querySelectorAll("." + state.config.css.wordClass));
    marks.forEach(function (mark) {
      const parent = mark.parentNode;
      if (!parent) return;
      parents.add(parent);
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
    });
    parents.forEach(function (parent) {
      parent.normalize();
    });

    const attr = state.config.css.wordAttr;
    if (scope.hasAttribute && scope.hasAttribute(attr)) scope.removeAttribute(attr);
    try {
      scope.querySelectorAll("[" + attr + "]").forEach(function (node) {
        node.removeAttribute(attr);
      });
    } catch (e) {
      /* Ignore attr edge cases. */
    }
  }

  /** Cleans word anchors in all roots. */
  function cleanWordAnchors() {
    getRoots().forEach(unwrapWordMarks);
  }

  /** Returns whether a rect intersects the viewport. */
  function isRectVisible(rect) {
    return rect && rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.right >= 0 &&
      rect.top <= window.innerHeight && rect.left <= window.innerWidth;
  }

  /** Collects visible blocks for CJK effects. */
  function collectVisibleBlocks() {
    const blocks = [];
    const selector = state.config.contentSelectors.join(",");
    const seen = new Set();

    function add(block) {
      if (!block || seen.has(block)) return;
      if (matchesAny(block, state.config.excludeSelectors)) return;
      if (hasExcludedAncestor(block.parentElement || block, null)) return;
      if (!isRectVisible(block.getBoundingClientRect())) return;
      seen.add(block);
      blocks.push(block);
    }

    getRoots().forEach(function (root) {
      if (matchesAny(root, state.config.contentSelectors)) add(root);
      try {
        root.querySelectorAll(selector).forEach(add);
      } catch (e) {
        /* Ignore invalid selectors. */
      }
    });

    return blocks.slice(0, state.config.cjkEffect.maxVisibleBlocks);
  }

  /** Returns true if a node contains CJK. */
  function nodeHasCjk(node) {
    const text = node.nodeValue || "";
    for (let i = 0; i < text.length; i += 1) {
      if (isCjk(text.charAt(i))) return true;
    }
    return false;
  }

  /** Collects visible CJK text nodes. */
  function collectVisibleTextNodes(blocks) {
    const nodes = [];
    for (let i = 0; i < blocks.length && nodes.length < state.config.cjkEffect.maxTextNodesPerTick; i += 1) {
      const block = blocks[i];
      const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, {
        acceptNode: function (node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          if (hasExcludedAncestor(node, block)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      let node = walker.nextNode();
      while (node && nodes.length < state.config.cjkEffect.maxTextNodesPerTick) {
        if (nodeHasCjk(node)) nodes.push(node);
        node = walker.nextNode();
      }
    }
    return nodes;
  }

  /** Picks one CJK character index. */
  function pickCjkIndex(text) {
    const indexes = [];
    for (let i = 0; i < text.length; i += 1) {
      if (isCjk(text.charAt(i))) indexes.push(i);
    }
    return pickOne(indexes);
  }

  /** Wraps one original CJK character for temporary animation. */
  function wrapCjkChar(textNode, index) {
    if (!textNode || !textNode.parentNode) return null;
    const text = textNode.nodeValue || "";
    if (index < 0 || index >= text.length || !isCjk(text.charAt(index))) return null;

    const parent = textNode.parentNode;
    const before = text.slice(0, index);
    const after = text.slice(index + 1);
    const span = document.createElement("span");

    span.className = "adhd-cjk-live";
    span.setAttribute(MARK_ATTR, "1");
    span.textContent = text.charAt(index);
    span.style.setProperty("--adhd-precolor-ms", state.config.cjkEffect.preColorMs + "ms");

    withMutationPaused(function () {
      if (before) parent.insertBefore(document.createTextNode(before), textNode);
      parent.insertBefore(span, textNode);
      if (after) parent.insertBefore(document.createTextNode(after), textNode);
      parent.removeChild(textNode);
    });

    state.activeChars.add(span);
    return span;
  }

  /** Restores an animated CJK span back to plain text. */
  function restoreCjkChar(span) {
    if (!span || !span.parentNode) return;
    const parent = span.parentNode;
    withMutationPaused(function () {
      parent.replaceChild(document.createTextNode(span.textContent || ""), span);
      parent.normalize();
    });
    state.activeChars.delete(span);
  }

  /** Spawns snowflakes beside the selected text. */
  function spawnSnowflakes(rect, fontSize) {
    const count = randomInt(state.config.cjkEffect.snowflakeMin, state.config.cjkEffect.snowflakeMax);
    const baseLeft = rect.left + rect.width;
    const baseTop = rect.top + rect.height * 0.15;

    for (let i = 0; i < count; i += 1) {
      const snow = document.createElement("span");
      snow.className = "adhd-fx-snowflake";
      snow.textContent = "❄";
      snow.setAttribute(MARK_ATTR, "1");
      snow.style.left = (baseLeft + randomInt(-8, 28)) + "px";
      snow.style.top = (baseTop + randomInt(-18, 18)) + "px";
      snow.style.fontSize = Math.max(12, fontSize * randomInt(70, 105) / 100) + "px";
      snow.style.setProperty("--adhd-snow-x", randomInt(-24, 36) + "px");
      snow.style.setProperty("--adhd-snow-y", randomInt(-36, 24) + "px");
      document.body.appendChild(snow);
      state.activeFx.add(snow);
      snow.addEventListener("animationend", function () {
        state.activeFx.delete(snow);
        snow.remove();
      }, { once: true });
    }
  }

  /** Plays one balanced random CJK effect after pre-coloring. */
  function playCjkEffect(span) {
    if (!span || !span.parentNode) return;
    const effect = nextEffectId();
    const rect = span.getBoundingClientRect();
    const style = window.getComputedStyle(span);
    const fontSize = parseFloat(style.fontSize) || 16;
    const ms = effect === 0 ? state.config.cjkEffect.jumpMs : effect === 1 ? state.config.cjkEffect.shiverMs : state.config.cjkEffect.growMs;

    span.style.transition = "none";
    span.style.setProperty("--adhd-effect-ms", ms + "ms");

    if (effect === 0) {
      span.classList.add("adhd-cjk-jump");
    } else if (effect === 1) {
      span.classList.add("adhd-cjk-shiver");
      spawnSnowflakes(rect, fontSize);
    } else {
      span.classList.add("adhd-cjk-grow");
    }

    span.addEventListener("animationend", function () {
      restoreCjkChar(span);
    }, { once: true });
  }

  /** Performs one CJK effect tick. */
  function tickCjkEffect() {
    if (!state.enabled || !state.config.cjkEffect.enabled) return;
    const nodes = collectVisibleTextNodes(collectVisibleBlocks());
    const textNode = pickOne(nodes);
    if (!textNode) return;

    const index = pickCjkIndex(textNode.nodeValue || "");
    if (index === null || index === undefined) return;

    const span = wrapCjkChar(textNode, index);
    if (!span) return;

    window.requestAnimationFrame(function () {
      span.style.color = pickRuntimeColor();
    });

    window.setTimeout(function () {
      playCjkEffect(span);
    }, state.config.cjkEffect.preColorMs);
  }

  /** Starts the CJK timer. */
  function startCjkTimer() {
    stopCjkTimer();
    if (!state.config.cjkEffect.enabled) return;
    state.cjkTimer = window.setInterval(tickCjkEffect, state.config.cjkEffect.intervalMs);
  }

  /** Stops the CJK timer. */
  function stopCjkTimer() {
    if (state.cjkTimer) window.clearInterval(state.cjkTimer);
    state.cjkTimer = 0;
  }

  /** Binds lightweight custom render events. */
  function bindRenderEvents() {
    state.eventCleanups.forEach(function (cleanup) { cleanup(); });
    state.eventCleanups = [];

    state.config.dynamic.eventNames.forEach(function (name) {
      const handler = function () {
        if (!state.enabled || state.applying) return;
        cleanWordAnchors();
        processWordAnchors();
      };
      document.addEventListener(name, handler);
      state.eventCleanups.push(function () {
        document.removeEventListener(name, handler);
      });
    });
  }

  /** Clears active animations. */
  function clearActiveEffects() {
    Array.from(state.activeChars).forEach(restoreCjkChar);
    state.activeFx.forEach(function (node) { node.remove(); });
    state.activeFx.clear();
    state.effectBag = [];
  }

  /** Rebuilds enabled behavior. */
  function rebuild() {
    normalizeConfig();
    injectStyle();
    bindRenderEvents();
    cleanWordAnchors();
    processWordAnchors();
    clearActiveEffects();
    startCjkTimer();
  }

  /** Disables all behavior and restores DOM. */
  function disable() {
    state.enabled = false;
    state.config.enabled = false;
    window.clearTimeout(state.wordTimer);
    stopCjkTimer();
    clearActiveEffects();
    cleanWordAnchors();
    removeStyle();
    return api;
  }

  /** Enables all behavior. */
  function enable() {
    state.enabled = true;
    state.config.enabled = true;
    rebuild();
    return api;
  }

  /** Toggles enabled state. */
  function toggle(force) {
    if (typeof force === "boolean") return force ? enable() : disable();
    return state.enabled ? disable() : enable();
  }

  /** Updates config and rebuilds. */
  function updateConfig(nextConfig) {
    if (nextConfig && typeof nextConfig === "object") merge(state.config, nextConfig);
    state.configVersion += 1;
    return state.config.enabled === false ? disable() : enable();
  }

  /** Returns cloned runtime config. */
  function getConfig() {
    return clone(state.config);
  }

  const api = {
    toggle: toggle,
    updateConfig: updateConfig,
    getConfig: getConfig
  };

  /** Boots the script. */
  function boot() {
    normalizeConfig();
    window.ADHDReadMode = api;
    if (state.config.globalApiName) window[state.config.globalApiName] = updateConfig;
    if (state.enabled) rebuild();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
