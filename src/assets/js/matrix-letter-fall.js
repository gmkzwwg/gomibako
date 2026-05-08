/*!
 * matrix-letter-fall.js
 *
 * Introduction:
 *   Renders a low-overhead Matrix-style falling text background on a canvas.
 *
 * Usage:
 *   Include this file with defer. It creates its own DOM layer and starts automatically.
 *   Default behavior can be customized by editing DEFAULT_CONFIG below.
 *   Runtime behavior can be customized before loading with window.MatrixBackgroundConfig.
 *   Runtime behavior can be customized after loading with window.MatrixBackground.updateConfig().
 *
 * Global API:
 *   window.MatrixBackground.start(config)
 *   window.MatrixBackground.stop()
 *   window.MatrixBackground.destroy()
 *   window.MatrixBackground.rebuild()
 *   window.MatrixBackground.updateConfig(config)
 *   window.MatrixBackground.getConfig()
 *
 * Notes:
 *   Default nodes: #matrix-bg and #matrix-bg-canvas.
 *   This file intentionally contains all Liquid-adjustable values inside DEFAULT_CONFIG.
 *   Performance is controlled mainly by fps, dprMax, fontSize, and maxColumns.
 *   For a visible page background, body/html backgrounds should not fully cover this layer.
 */

(function (window, document) {
  "use strict";

  if (!window || !document) return;
  if (window.__matrixBackgroundInitialized__) return;
  window.__matrixBackgroundInitialized__ = true;

  const DEFAULT_CONFIG = {
    enabled: true, // Enables the effect globally.
    autoStart: true, // Starts automatically after script load / DOM ready.
    createLayer: true, // Creates missing layer and canvas nodes.
    injectStyle: true, // Injects required compact CSS.
    styleId: "matrix-background-style", // Injected style element ID.
    respectReducedMotion: true, // Stops animation for prefers-reduced-motion users.
    pauseWhenHidden: true, // Stops RAF while the tab is hidden.
    removeLayerOnDestroy: true, // Removes created/existing layer on destroy().

    layer: {
      id: "matrix-bg", // Root background layer ID.
      canvasId: "matrix-bg-canvas", // Canvas ID.
      parent: "body", // Parent selector for auto-created layer.
      zIndex: -1, // Background stacking level.
      background: "#000" // Layer and canvas clear color.
    },

    text: "ABCDEFGHIJKLMNOPQRSTUVWXYZ01", // Former site.ui.background.text / matrixText value.
    fallbackText: "ABCDEFGHIJKLMNOPQRSTUVWXYZ01", // Used when text is empty.
    fontSize: 16, // Former include.font_size.
    fps: 24, // Former include.fps; lower than 60 for reduced CPU use.
    errorChance: 0.0008, // Former include.error_chance.
    resetChance: 0.0015, // Former include.reset_chance.
    trailAlpha: 0.09, // Former include.trail_alpha.

    dprMax: 1.25, // Caps high-DPI canvas cost.
    maxColumns: 180, // Caps draw calls on wide screens; 0 disables the cap.
    columnScale: 1, // Column width = fontSize * columnScale unless maxColumns widens it.
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace", // Canvas font family.
    fontWeight: 500, // Canvas font weight.
    textBaseline: "top", // Canvas text baseline.

    greenColor: "#23ef23", // Main glyph color.
    whiteColor: "#f0e8e8", // Highlight glyph color.
    errorColor: "#e81d1d", // ERROR glyph color.
    whiteChance: 0.14, // Chance the current glyph is white.
    headWhiteChance: 0.22, // Chance to add a white head glyph one row above.

    errorText: "ERROR", // Error word drawn across columns.
    errorFrames: 4, // Number of render frames to keep an error word.
    errorAlignIndex: 2, // Character index aligned to the stream column.

    minSpeedFrames: 1, // Minimum frames per row step.
    maxSpeedFrames: 2, // Maximum frames per row step.
    initialRowJitter: 20, // Random negative start rows.
    resetRowMin: 2, // Minimum negative rows after reset.
    resetRowMax: 14, // Maximum negative rows after reset.
    resizeDebounce: 160 // Resize rebuild debounce in ms.
  };

  let config = deepMerge({}, DEFAULT_CONFIG, getPreloadConfig());
  let chars = [];

  const state = {
    running: false,
    destroyed: false,
    paused: false,
    root: null,
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    dpr: 1,
    columnWidth: 16,
    columns: 0,
    streams: [],
    rafId: 0,
    lastTime: 0,
    resizeTimer: 0,
    createdRoot: false,
    createdCanvas: false
  };

  /* Deep-merges plain objects; params: ...objects<object>. */
  function deepMerge() {
    const output = {};

    Array.prototype.slice.call(arguments).forEach(function (object) {
      Object.keys(object || {}).forEach(function (key) {
        const value = object[key];
        const current = output[key];
        const isPlainObject = value && typeof value === "object" && !Array.isArray(value);
        const currentIsPlainObject = current && typeof current === "object" && !Array.isArray(current);

        output[key] = isPlainObject
          ? deepMerge(currentIsPlainObject ? current : {}, value)
          : value; // Arrays and primitives replace old values.
      });
    });

    return output;
  }

  /* Returns optional preload config; params: none. */
  function getPreloadConfig() {
    const legacyText = typeof window.matrixText !== "undefined" ? { text: window.matrixText } : {};

    return deepMerge(
      {},
      legacyText,
      window.MatrixBackgroundConfig || window.matrixBackgroundConfig || {}
    );
  }

  /* Returns a random float; params: min<number>, max<number>. */
  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  /* Returns a random integer; params: min<number>, max<number>. */
  function randInt(min, max) {
    return Math.floor(rand(min, max + 1));
  }

  /* Clamps a number into a range; params: value<number>, min<number>, max<number>. */
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  /* Normalizes positive numeric config; params: value<any>, fallback<number>, min<number>, max<number>. */
  function toNumber(value, fallback, min, max) {
    const number = Number(value);

    if (!Number.isFinite(number)) return fallback;
    return clamp(number, min, max);
  }

  /* Checks reduced-motion preference; params: none. */
  function shouldReduceMotion() {
    return Boolean(
      config.respectReducedMotion &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  /* Builds the character pool from config text; params: none. */
  function prepareChars() {
    const text = String(config.text || config.fallbackText || "01");

    chars = Array.from(text); // Unicode-safe split.
    if (!chars.length) chars = Array.from(String(config.fallbackText || "01"));
    if (!chars.length) chars = ["0", "1"];
  }

  /* Returns one random character; params: none. */
  function pickChar() {
    return chars[(Math.random() * chars.length) | 0];
  }

  /* Returns one stream color; params: none. */
  function pickColor() {
    return Math.random() < config.whiteChance ? config.whiteColor : config.greenColor;
  }

  /* Resolves layer parent; params: none. */
  function resolveLayerParent() {
    return document.querySelector(config.layer.parent) || document.body || document.documentElement;
  }

  /* Injects CSS for the background layer; params: none. */
  function injectStyle() {
    if (!config.injectStyle) return;

    let style = document.getElementById(config.styleId);

    if (!style) {
      style = document.createElement("style");
      style.id = config.styleId;
      document.head.appendChild(style);
    }

    style.textContent = [
      "#" + config.layer.id + " {",
      "  position: fixed;",
      "  inset: 0;",
      "  z-index: " + config.layer.zIndex + ";",
      "  overflow: hidden;",
      "  pointer-events: none;",
      "  background: " + config.layer.background + ";",
      "  contain: strict;",
      "}",
      "#" + config.layer.id + " > #" + config.layer.canvasId + " {",
      "  display: block;",
      "  width: 100%;",
      "  height: 100%;",
      "}"
    ].join("\n");
  }

  /* Creates or resolves DOM nodes; params: none. */
  function resolveElements() {
    let root = document.getElementById(config.layer.id);
    let canvas = document.getElementById(config.layer.canvasId);
    const parent = resolveLayerParent();

    if (!root && config.createLayer && parent) {
      root = document.createElement("div");
      root.id = config.layer.id;
      root.setAttribute("aria-hidden", "true");
      parent.appendChild(root);
      state.createdRoot = true;
    }

    if (!root) return false;

    if (!canvas && config.createLayer) {
      canvas = document.createElement("canvas");
      canvas.id = config.layer.canvasId;
      root.appendChild(canvas);
      state.createdCanvas = true;
    } else if (canvas && canvas.parentNode !== root) {
      root.appendChild(canvas); // Keep the configured canvas inside the root.
    }

    if (!canvas) return false;

    state.root = root;
    state.canvas = canvas;
    state.ctx = canvas.getContext("2d", { alpha: false, desynchronized: true }) || canvas.getContext("2d", { alpha: false });

    return Boolean(state.ctx);
  }

  /* Reads viewport size once per rebuild; params: none. */
  function readViewport() {
    state.width = window.innerWidth || document.documentElement.clientWidth || 0;
    state.height = window.innerHeight || document.documentElement.clientHeight || 0;
  }

  /* Computes column spacing and count; params: none. */
  function computeColumns() {
    const fontSize = toNumber(config.fontSize, DEFAULT_CONFIG.fontSize, 6, 96);
    const maxColumns = Math.floor(toNumber(config.maxColumns, DEFAULT_CONFIG.maxColumns, 0, 1000));
    const naturalWidth = Math.max(1, fontSize * toNumber(config.columnScale, DEFAULT_CONFIG.columnScale, 0.25, 8));
    const cappedWidth = maxColumns > 0 && state.width > 0 ? Math.ceil(state.width / maxColumns) : naturalWidth;

    state.columnWidth = Math.max(naturalWidth, cappedWidth); // Wider columns reduce draw calls.
    state.columns = Math.max(1, Math.ceil(state.width / state.columnWidth));
  }

  /* Creates one stream state object; params: index<number>. */
  function makeStream(index) {
    return {
      x: index * state.columnWidth,
      row: -randInt(0, Math.max(1, config.initialRowJitter)), // Row-based movement avoids subpixel work.
      speedFrames: randInt(config.minSpeedFrames, config.maxSpeedFrames),
      frameCounter: 0,
      errorFrames: 0,
      errorRow: 0
    };
  }

  /* Resets one stream; params: stream<object>. */
  function resetStream(stream) {
    stream.row = -randInt(config.resetRowMin, config.resetRowMax);
    stream.speedFrames = randInt(config.minSpeedFrames, config.maxSpeedFrames);
    stream.frameCounter = 0;
    stream.errorFrames = 0;
    stream.errorRow = 0;
  }

  /* Rebuilds canvas dimensions and streams; params: none. */
  function setupCanvas() {
    if (!state.canvas || !state.ctx) return;

    const fontSize = toNumber(config.fontSize, DEFAULT_CONFIG.fontSize, 6, 96);

    readViewport();
    computeColumns();

    state.dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, toNumber(config.dprMax, DEFAULT_CONFIG.dprMax, 1, 3)));
    state.canvas.width = Math.max(1, Math.floor(state.width * state.dpr));
    state.canvas.height = Math.max(1, Math.floor(state.height * state.dpr));
    state.canvas.style.width = state.width + "px";
    state.canvas.style.height = state.height + "px";

    state.ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    state.ctx.font = config.fontWeight + " " + fontSize + "px " + config.fontFamily;
    state.ctx.textBaseline = config.textBaseline;
    state.ctx.fillStyle = config.layer.background;
    state.ctx.fillRect(0, 0, state.width, state.height);

    state.streams = new Array(state.columns);

    for (let index = 0; index < state.columns; index += 1) {
      state.streams[index] = makeStream(index);
    }
  }

  /* Draws an error word on one stream; params: stream<object>. */
  function drawError(stream) {
    const fontSize = toNumber(config.fontSize, DEFAULT_CONFIG.fontSize, 6, 96);
    const y = stream.errorRow * fontSize;
    const startX = stream.x - config.errorAlignIndex * state.columnWidth;

    state.ctx.fillStyle = config.errorColor;
    state.ctx.fillText(config.errorText, startX, y);

    stream.errorFrames -= 1;
    if (stream.errorFrames <= 0) resetStream(stream);
  }

  /* Draws and advances one normal stream; params: stream<object>. */
  function drawStream(stream) {
    const fontSize = toNumber(config.fontSize, DEFAULT_CONFIG.fontSize, 6, 96);
    const y = stream.row * fontSize;

    state.ctx.fillStyle = pickColor();
    state.ctx.fillText(pickChar(), stream.x, y);

    if (Math.random() < config.headWhiteChance) {
      state.ctx.fillStyle = config.whiteColor;
      state.ctx.fillText(pickChar(), stream.x, y - fontSize);
    }

    if (Math.random() < config.errorChance) {
      stream.errorFrames = Math.max(1, Math.floor(config.errorFrames));
      stream.errorRow = stream.row;
      return;
    }

    stream.frameCounter += 1;

    if (stream.frameCounter >= stream.speedFrames) {
      stream.row += 1; // Fixed grid step.
      stream.frameCounter = 0;
    }

    if (y > state.height + fontSize || Math.random() < config.resetChance) {
      resetStream(stream);
    }
  }

  /* Draws one throttled animation frame; params: now<number>. */
  function renderFrame(now) {
    if (!state.running || state.destroyed) return;

    const fps = toNumber(config.fps, DEFAULT_CONFIG.fps, 1, 60);
    const frameInterval = 1000 / fps;

    if (!state.lastTime) state.lastTime = now;

    if (now - state.lastTime >= frameInterval) {
      state.lastTime = now - ((now - state.lastTime) % frameInterval); // Keeps pacing stable.
      state.ctx.globalAlpha = toNumber(config.trailAlpha, DEFAULT_CONFIG.trailAlpha, 0.01, 1);
      state.ctx.fillStyle = config.layer.background;
      state.ctx.fillRect(0, 0, state.width, state.height);
      state.ctx.globalAlpha = 1;

      for (let index = 0; index < state.streams.length; index += 1) {
        const stream = state.streams[index];

        if (stream.errorFrames > 0) {
          drawError(stream);
        } else {
          drawStream(stream);
        }
      }
    }

    state.rafId = window.requestAnimationFrame(renderFrame);
  }

  /* Starts the RAF loop; params: none. */
  function startLoop() {
    if (state.rafId || !state.running || state.paused) return;

    state.lastTime = 0;
    state.rafId = window.requestAnimationFrame(renderFrame);
  }

  /* Stops the RAF loop; params: none. */
  function stopLoop() {
    window.cancelAnimationFrame(state.rafId);
    state.rafId = 0;
    state.lastTime = 0;
  }

  /* Debounces canvas rebuild on resize; params: none. */
  function onResize() {
    window.clearTimeout(state.resizeTimer);

    state.resizeTimer = window.setTimeout(function () {
      if (state.running) setupCanvas();
    }, config.resizeDebounce);
  }

  /* Pauses or resumes when page visibility changes; params: none. */
  function onVisibilityChange() {
    if (!config.pauseWhenHidden) return;

    state.paused = document.hidden;

    if (state.paused) {
      stopLoop(); // Avoid hidden-tab RAF churn.
    } else if (state.running) {
      startLoop();
    }
  }

  /* Adds global listeners; params: none. */
  function addListeners() {
    document.addEventListener("visibilitychange", onVisibilityChange, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });
  }

  /* Removes global listeners; params: none. */
  function removeListeners() {
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onResize);
  }

  /* Starts the Matrix background; params: nextConfig<object>. */
  function start(nextConfig) {
    config = deepMerge(config, nextConfig || {});

    if (!config.enabled || shouldReduceMotion()) return getConfig();

    injectStyle();
    prepareChars();

    if (!resolveElements()) return getConfig();

    state.destroyed = false;
    state.running = true;
    state.paused = Boolean(config.pauseWhenHidden && document.hidden);

    setupCanvas();
    addListeners();
    startLoop();

    return getConfig();
  }

  /* Stops animation and listeners but keeps DOM nodes; params: none. */
  function stop() {
    state.running = false;

    stopLoop();
    removeListeners();
    window.clearTimeout(state.resizeTimer);

    return getConfig();
  }

  /* Stops animation and optionally removes DOM nodes; params: none. */
  function destroy() {
    stop();

    state.destroyed = true;
    state.streams = [];

    if (config.removeLayerOnDestroy && state.root && state.root.isConnected) {
      state.root.remove();
    } else if (state.createdCanvas && state.canvas && state.canvas.isConnected) {
      state.canvas.remove();
    }

    state.root = null;
    state.canvas = null;
    state.ctx = null;
    state.createdRoot = false;
    state.createdCanvas = false;

    return getConfig();
  }

  /* Rebuilds characters, style, canvas, and streams; params: none. */
  function rebuild() {
    injectStyle();
    prepareChars();

    if (state.running) {
      resolveElements();
      setupCanvas();
    }

    return getConfig();
  }

  /* Updates runtime config; params: nextConfig<object>. */
  function updateConfig(nextConfig) {
    config = deepMerge(config, nextConfig || {});

    rebuild();

    if (!state.running && config.autoStart && config.enabled && !shouldReduceMotion()) {
      start();
    }

    return getConfig();
  }

  /* Returns active configuration copy; params: none. */
  function getConfig() {
    return deepMerge({}, config);
  }

  /* Runs automatic startup; params: none. */
  function onReady() {
    if (config.autoStart) start();
  }

  window.MatrixBackground = {
    start: start,
    stop: stop,
    destroy: destroy,
    rebuild: rebuild,
    updateConfig: updateConfig,
    getConfig: getConfig
  };

  window.MatrixBg = window.MatrixBackground; // Short alias.

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady, { once: true });
  } else {
    onReady();
  }
})(window, document);
