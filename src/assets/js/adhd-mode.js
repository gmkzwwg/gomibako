/*!
 * ADHD Read Mode v4-lite
 *
 * Introduction:
 * A compact plug-and-play ADHD reading helper for long-form pages.
 * English word mode colors the first half of eligible word-based tokens.
 * Chinese/CJK sentence mode periodically highlights one visible sentence with a color + bold transition.
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
 * English word anchors persist until disabled/rebuilt.
 * CJK sentence highlights are lightweight: every n seconds, one visible block gets one sentence highlighted.
 * At most maxActiveBlocks blocks are highlighted at the same time, and one block never receives duplicate highlights.
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
      ".jsd-linear-toolbar", ".jsd-tree-widget", "[data-adhd-rm='1']"
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

    sentenceMode: {
      enabled: true,
      intervalMs: 3000,
      maxActiveBlocks: 3,
      fadeMs: 700,
      minCjkChars: 2,
      maxVisibleBlocks: 80,
      maxTextNodesPerTick: 160,
      delimiters: "。！？.!?"
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
      sentenceClass: "adhd-cn-sentence",
      wordAttr: "data-adhd-word-signature"
    },

    globalApiName: "updateConfig"
  };

  const MARK_ATTR = "data-adhd-rm";

  const state = {
    config: clone(CONFIG),
    enabled: Boolean(CONFIG.enabled),
    roots: [],
    wordQueue: [],
    wordTimer: 0,
    sentenceTimer: 0,
    activeHighlights: [],
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

    cfg.sentenceMode = cfg.sentenceMode || {};
    cfg.sentenceMode.enabled = cfg.sentenceMode.enabled !== false;
    cfg.sentenceMode.intervalMs = Math.max(800, Math.floor(Number(cfg.sentenceMode.intervalMs) || 3000));
    cfg.sentenceMode.maxActiveBlocks = Math.max(1, Math.floor(Number(cfg.sentenceMode.maxActiveBlocks) || 3));
    cfg.sentenceMode.fadeMs = Math.max(0, Math.floor(Number(cfg.sentenceMode.fadeMs) || 700));
    cfg.sentenceMode.minCjkChars = Math.max(1, Math.floor(Number(cfg.sentenceMode.minCjkChars) || 2));
    cfg.sentenceMode.maxVisibleBlocks = Math.max(1, Math.floor(Number(cfg.sentenceMode.maxVisibleBlocks) || 80));
    cfg.sentenceMode.maxTextNodesPerTick = Math.max(1, Math.floor(Number(cfg.sentenceMode.maxTextNodesPerTick) || 160));
    cfg.sentenceMode.delimiters = String(cfg.sentenceMode.delimiters || "。！？；：.!?;:");

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

  /** Returns true if a node is or belongs to a protected inline element. */
  function isProtectedInlineNode(node) {
    const element = node && node.nodeType === 1 ? node : node && node.parentElement;
    return Boolean(element && matchesAny(element, ['em', 'strong', 'code']));
  }

  /** Returns previous non-empty sibling. */
  function previousMeaningfulSibling(node) {
    let prev = node ? node.previousSibling : null;
    while (prev && prev.nodeType === 3 && !prev.nodeValue.trim()) prev = prev.previousSibling;
    return prev;
  }

  /** Returns next non-empty sibling. */
  function nextMeaningfulSibling(node) {
    let next = node ? node.nextSibling : null;
    while (next && next.nodeType === 3 && !next.nodeValue.trim()) next = next.nextSibling;
    return next;
  }

  /** Returns true if a sentence candidate touches em/strong/code across a text-node boundary. */
  function touchesProtectedInline(textNode, start, end) {
    const text = textNode.nodeValue || '';
    const beforeIsEmpty = !text.slice(0, start).trim();
    const afterIsEmpty = !text.slice(end).trim();
    return (beforeIsEmpty && isProtectedInlineNode(previousMeaningfulSibling(textNode))) ||
      (afterIsEmpty && isProtectedInlineNode(nextMeaningfulSibling(textNode)));
  }

  /** Runs a DOM write while suppressing self-trigger side effects. */
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
      ".adhd-cn-sentence{transition:color var(--adhd-cn-fade) ease,text-shadow var(--adhd-cn-fade) ease,font-weight var(--adhd-cn-fade) ease;text-decoration:none;}",
      ".adhd-cn-sentence.is-active{text-shadow:0 0 .28em currentColor;}"
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

  /** Runtime random for sentence picking. */
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

  /** Picks a runtime sentence color. */
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
  function collectTextNodes(element, maxNodes) {
    const nodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (hasExcludedAncestor(node, element)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node = walker.nextNode();
    while (node && (!maxNodes || nodes.length < maxNodes)) {
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

    unwrapMarks(element, state.config.css.wordClass);

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

  /** Unwraps generated marks by class name. */
  function unwrapMarks(scope, className) {
    if (!scope || scope.nodeType !== 1) return;
    const parents = new Set();
    const marks = Array.from(scope.querySelectorAll("." + className));
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
    if (className === state.config.css.wordClass) {
      if (scope.hasAttribute && scope.hasAttribute(attr)) scope.removeAttribute(attr);
      try {
        scope.querySelectorAll("[" + attr + "]").forEach(function (node) {
          node.removeAttribute(attr);
        });
      } catch (e) {
        /* Ignore attr edge cases. */
      }
    }
  }

  /** Cleans word anchors in all roots. */
  function cleanWordAnchors() {
    getRoots().forEach(function (root) {
      unwrapMarks(root, state.config.css.wordClass);
    });
  }

  /** Removes one active sentence highlight. */
  function removeSentenceHighlight(item) {
    if (!item || !item.span || !item.span.parentNode) return;
    const parent = item.span.parentNode;
    withMutationPaused(function () {
      while (item.span.firstChild) parent.insertBefore(item.span.firstChild, item.span);
      parent.removeChild(item.span);
      parent.normalize();
    });
  }

  /** Clears all sentence highlights. */
  function clearSentenceHighlights() {
    state.activeHighlights.forEach(removeSentenceHighlight);
    state.activeHighlights = [];
  }

  /** Returns whether a block already has a sentence highlight. */
  function isBlockActive(block) {
    return state.activeHighlights.some(function (item) {
      return item.block === block && item.span && item.span.isConnected;
    });
  }

  /** Returns whether a rect intersects the viewport. */
  function isRectVisible(rect) {
    return rect && rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.right >= 0 &&
      rect.top <= window.innerHeight && rect.left <= window.innerWidth;
  }

  /** Collects visible blocks not currently highlighted. */
  function collectSentenceBlocks() {
    return collectContentElements().filter(function (block) {
      if (isBlockActive(block)) return false;
      return isRectVisible(block.getBoundingClientRect());
    }).slice(0, state.config.sentenceMode.maxVisibleBlocks);
  }

  /** Counts CJK glyphs in a string. */
  function countCjk(text) {
    let count = 0;
    for (let i = 0; i < text.length; i += 1) {
      if (isCjk(text.charAt(i))) count += 1;
    }
    return count;
  }

  /** Splits text-node content into sentence candidates. */
  function sentenceCandidatesFromNode(textNode) {
    const text = textNode.nodeValue || "";
    const delimiters = state.config.sentenceMode.delimiters;
    const candidates = [];
    let start = 0;

    for (let i = 0; i < text.length; i += 1) {
      if (delimiters.indexOf(text.charAt(i)) === -1) continue;
      addSentenceCandidate(candidates, textNode, start, i + 1);
      start = i + 1;
    }
    addSentenceCandidate(candidates, textNode, start, text.length);
    return candidates;
  }

  /** Adds a sentence candidate if it has enough CJK content. */
  function addSentenceCandidate(list, textNode, start, end) {
    const raw = (textNode.nodeValue || "").slice(start, end);
    const leftTrim = raw.length - raw.replace(/^\s+/, "").length;
    const rightTrim = raw.length - raw.replace(/\s+$/, "").length;
    const realStart = start + leftTrim;
    const realEnd = end - rightTrim;
    if (realEnd <= realStart) return;

    const text = (textNode.nodeValue || "").slice(realStart, realEnd);
    if (countCjk(text) < state.config.sentenceMode.minCjkChars) return;
    if (touchesProtectedInline(textNode, realStart, realEnd)) return;
    list.push({ node: textNode, start: realStart, end: realEnd });
  }

  /** Picks one sentence from a block. */
  function pickSentence(block) {
    const nodes = collectTextNodes(block, state.config.sentenceMode.maxTextNodesPerTick);
    const candidates = [];
    nodes.forEach(function (node) {
      sentenceCandidatesFromNode(node).forEach(function (candidate) {
        candidates.push(candidate);
      });
    });
    return pickOne(candidates);
  }

  /** Highlights one sentence by wrapping it in a transition span. */
  function highlightSentence(candidate, block) {
    if (!candidate || !candidate.node || !candidate.node.parentNode) return;
    const node = candidate.node;
    const text = node.nodeValue || "";
    const parent = node.parentNode;
    const before = text.slice(0, candidate.start);
    const target = text.slice(candidate.start, candidate.end);
    const after = text.slice(candidate.end);
    const span = document.createElement("span");

    span.className = state.config.css.sentenceClass;
    span.setAttribute(MARK_ATTR, "1");
    span.textContent = target;
    span.style.setProperty("--adhd-cn-fade", state.config.sentenceMode.fadeMs + "ms");

    withMutationPaused(function () {
      if (before) parent.insertBefore(document.createTextNode(before), node);
      parent.insertBefore(span, node);
      if (after) parent.insertBefore(document.createTextNode(after), node);
      parent.removeChild(node);
    });

    state.activeHighlights.push({ block: block, span: span });
    trimSentenceHighlights();

    window.requestAnimationFrame(function () {
      span.style.color = pickRuntimeColor();
      span.style.fontWeight = "700";
      span.classList.add("is-active");
    });
  }

  /** Ensures active sentence highlights do not exceed maxActiveBlocks. */
  function trimSentenceHighlights() {
    const max = state.config.sentenceMode.maxActiveBlocks;
    while (state.activeHighlights.length > max) {
      removeSentenceHighlight(state.activeHighlights.shift());
    }
  }

  /** Runs one sentence highlight tick. */
  function tickSentenceMode() {
    if (!state.enabled || !state.config.sentenceMode.enabled) return;
    state.activeHighlights = state.activeHighlights.filter(function (item) {
      return item.span && item.span.isConnected;
    });

    const block = pickOne(collectSentenceBlocks());
    if (!block) return;
    highlightSentence(pickSentence(block), block);
  }

  /** Starts sentence mode timer. */
  function startSentenceTimer() {
    stopSentenceTimer();
    if (!state.config.sentenceMode.enabled) return;
    state.sentenceTimer = window.setInterval(tickSentenceMode, state.config.sentenceMode.intervalMs);
  }

  /** Stops sentence mode timer. */
  function stopSentenceTimer() {
    if (state.sentenceTimer) window.clearInterval(state.sentenceTimer);
    state.sentenceTimer = 0;
  }

  /** Binds lightweight custom render events. */
  function bindRenderEvents() {
    state.eventCleanups.forEach(function (cleanup) { cleanup(); });
    state.eventCleanups = [];

    state.config.dynamic.eventNames.forEach(function (name) {
      const handler = function () {
        if (!state.enabled || state.applying) return;
        cleanWordAnchors();
        clearSentenceHighlights();
        processWordAnchors();
      };
      document.addEventListener(name, handler);
      state.eventCleanups.push(function () {
        document.removeEventListener(name, handler);
      });
    });
  }

  /** Rebuilds enabled behavior. */
  function rebuild() {
    normalizeConfig();
    injectStyle();
    bindRenderEvents();
    cleanWordAnchors();
    clearSentenceHighlights();
    processWordAnchors();
    startSentenceTimer();
  }

  /** Disables all behavior and restores DOM. */
  function disable() {
    state.enabled = false;
    state.config.enabled = false;
    window.clearTimeout(state.wordTimer);
    stopSentenceTimer();
    clearSentenceHighlights();
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
