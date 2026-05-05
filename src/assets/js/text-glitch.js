/*!
 * Introduction:
 *   Applies randomized glitch effects to selected text elements.
 *
 * Usage:
 *   Include this file on the page. It starts automatically with DEFAULT_CONFIG.
 *   Default behavior can be customized by editing DEFAULT_CONFIG below.
 *   Runtime behavior can be customized with window.TextGlitchFx.updateConfig().
 *
 * Global API:
 *   window.TextGlitchFx                  Constructor for manual instances.
 *   window.TextGlitchFx.updateConfig()   Update the default auto instance config.
 *   window.TextGlitchFx.start()          Start the default auto instance.
 *   window.TextGlitchFx.stop()           Stop the default auto instance.
 *   window.TextGlitchFx.triggerNow()     Trigger one glitch immediately.
 *   window.TextGlitchFx.getConfig()      Get the active auto instance config.
 *
 * Notes:
 *   The script injects its own compact CSS.
 *   The default auto instance respects prefers-reduced-motion.
 *   Elements with data-glitch-disabled="true" are skipped.
 */

(function (window, document) {
  "use strict";

  const DEFAULT_CONFIG = {
    selector: "h1, h2, h3, h4, .abstract, .post-abstract, .post-meta__text, .cli-header__label, .cli-header__title, .cli-header__owner, .cli-header__mode", // Target text elements.
    interval: 8, // Fixed interval in seconds when intervalRange is not used.
    intervalRange: [2, 4], // Random trigger interval range in seconds.
    duration: 800, // Effect duration in milliseconds.
    effects: ["scramble", "blocks", "blink", "error"], // Enabled effect names.
    errorTexts: [
      "ERROR 418",
      "FATAL: NULL",
      "SYSTEM GLITCH",
      "SIGNAL LOST",
      "404 THOUGHTS",
      "DATA CORRUPTED"
    ], // Temporary text values for the error effect.
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*+-=?/<>[]{}█▓▒░", // Character pool for scrambling.
    maxCharChangeRatio: 0.48, // Maximum ratio of characters changed per effect.
    skipHidden: true, // Skip invisible elements.
    respectReducedMotion: true, // Respect prefers-reduced-motion.
    autoStart: true, // Start automatically after inclusion.
    injectStyle: true, // Inject required CSS from this file.
    styleId: "tgfx-style", // ID of the injected style element.
    busyAttribute: "data-glitch-busy", // Attribute used to avoid overlapping effects.
    disabledAttribute: "data-glitch-disabled", // Attribute used to disable a specific element.
    blinkClass: "tgfx-blink" // CSS class used by blink-like effects.
  };

  let autoInstance = null; // Default plug-and-play instance.
  let autoConfig = Object.assign({}, DEFAULT_CONFIG); // Active auto instance config.

  /* Creates a text glitch effect instance; params: options<object>. */
  class TextGlitchFx {
    constructor(options = {}) {
      this.options = Object.assign({}, DEFAULT_CONFIG, options); // Instance config.
      this.timer = null; // Timer for the next scheduled effect.
      this.running = false; // Runtime state flag.

      this._injectStyle(); // Ensure required CSS exists.
    }

    /* Starts the instance loop; params: none. */
    start() {
      if (this.running) return;

      if (this._shouldRespectReducedMotion()) return;

      this.running = true;
      this._scheduleNext();
    }

    /* Stops the instance loop; params: none. */
    stop() {
      this.running = false;

      if (this.timer) {
        window.clearTimeout(this.timer);
      }

      this.timer = null;
    }

    /* Updates this instance config and restarts if needed; params: nextOptions<object>. */
    updateConfig(nextOptions = {}) {
      const wasRunning = this.running;

      this.stop();
      this.options = Object.assign({}, this.options, nextOptions); // Merge new options.
      this._injectStyle();

      if (wasRunning || this.options.autoStart) {
        this.start();
      }

      return this.getConfig();
    }

    /* Returns a copy of this instance config; params: none. */
    getConfig() {
      return Object.assign({}, this.options);
    }

    /* Triggers one random effect immediately; params: none. */
    triggerNow() {
      const elements = this._getEligibleElements();

      if (!elements.length) return;

      const element = elements[Math.floor(Math.random() * elements.length)];
      const effect = this._getRandomEffect();

      this._applyEffect(element, effect);
    }

    /* Checks reduced-motion preference; params: none. */
    _shouldRespectReducedMotion() {
      return (
        this.options.respectReducedMotion &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }

    /* Schedules the next random effect; params: none. */
    _scheduleNext() {
      if (!this.running) return;

      const delay = this._getNextDelay();

      this.timer = window.setTimeout(() => {
        this.triggerNow();
        this._scheduleNext();
      }, delay);
    }

    /* Computes the next delay in milliseconds; params: none. */
    _getNextDelay() {
      const interval = Number(this.options.interval) || DEFAULT_CONFIG.interval;
      const intervalRange = this.options.intervalRange;

      if (
        Array.isArray(intervalRange) &&
        intervalRange.length === 2 &&
        Number(intervalRange[0]) <= Number(intervalRange[1])
      ) {
        const min = Math.max(0.3, Number(intervalRange[0])) * 1000;
        const max = Math.max(0.3, Number(intervalRange[1])) * 1000;

        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      return Math.max(300, interval * 1000);
    }

    /* Returns eligible target elements; params: none. */
    _getEligibleElements() {
      const nodes = Array.from(document.querySelectorAll(this.options.selector));

      return nodes.filter((element) => {
        const text = (element.textContent || "").trim();

        if (!text) return false;
        if (element.getAttribute(this.options.disabledAttribute) === "true") return false;
        if (element.getAttribute(this.options.busyAttribute) === "1") return false;
        if (this.options.skipHidden && !this._isVisible(element)) return false;

        return true;
      });
    }

    /* Checks whether an element is visible; params: element<Element>. */
    _isVisible(element) {
      const style = window.getComputedStyle(element);

      if (
        style.display === "none" ||
        style.visibility === "hidden" ||
        style.opacity === "0"
      ) {
        return false;
      }

      const rect = element.getBoundingClientRect();

      return rect.width > 0 && rect.height > 0;
    }

    /* Selects one random enabled effect; params: none. */
    _getRandomEffect() {
      const effects = Array.isArray(this.options.effects) && this.options.effects.length
        ? this.options.effects
        : DEFAULT_CONFIG.effects;

      return effects[Math.floor(Math.random() * effects.length)];
    }

    /* Applies one named effect to an element; params: element<Element>, effect<string>. */
    _applyEffect(element, effect) {
      const original = element.textContent;
      const duration = Math.max(80, Number(this.options.duration) || DEFAULT_CONFIG.duration);

      element.setAttribute(this.options.busyAttribute, "1");

      switch (effect) {
        case "scramble":
          this._effectScramble(element, original, duration);
          break;
        case "blocks":
          this._effectBlocks(element, original, duration);
          break;
        case "blink":
          this._effectBlink(element, original, duration);
          break;
        case "error":
          this._effectError(element, original, duration);
          break;
        default:
          this._effectScramble(element, original, duration);
      }
    }

    /* Restores an element after an effect; params: element<Element>, original<string>. */
    _cleanup(element, original) {
      element.textContent = original;
      element.classList.remove(this.options.blinkClass);
      element.removeAttribute(this.options.busyAttribute);
    }

    /* Applies the scramble effect; params: element<Element>, original<string>, duration<number>. */
    _effectScramble(element, original, duration) {
      const steps = 7;
      let currentStep = 0;
      const stepTime = Math.max(24, Math.floor(duration / steps));

      const timer = window.setInterval(() => {
        currentStep += 1;

        const progress = currentStep / steps;

        element.textContent = this._scrambleText(original, progress);

        if (currentStep >= steps) {
          window.clearInterval(timer);
          this._cleanup(element, original);
        }
      }, stepTime);
    }

    /* Applies the block replacement effect; params: element<Element>, original<string>, duration<number>. */
    _effectBlocks(element, original, duration) {
      element.textContent = this._blockText(original);

      window.setTimeout(() => {
        element.textContent = this._scrambleText(original, 0.75);

        window.setTimeout(() => {
          this._cleanup(element, original);
        }, 60);
      }, Math.max(120, duration - 60));
    }

    /* Applies the blink effect; params: element<Element>, original<string>, duration<number>. */
    _effectBlink(element, original, duration) {
      element.classList.add(this.options.blinkClass);

      const firstTimer = window.setTimeout(() => {
        element.textContent = this._scrambleText(original, 0.55);
      }, 70);

      const secondTimer = window.setTimeout(() => {
        element.textContent = original;
      }, 150);

      const thirdTimer = window.setTimeout(() => {
        element.textContent = this._blockText(original);
      }, 220);

      window.setTimeout(() => {
        window.clearTimeout(firstTimer);
        window.clearTimeout(secondTimer);
        window.clearTimeout(thirdTimer);
        this._cleanup(element, original);
      }, duration);
    }

    /* Applies the error-text effect; params: element<Element>, original<string>, duration<number>. */
    _effectError(element, original, duration) {
      const errorText = this._getRandomErrorText();

      element.textContent = errorText;
      element.classList.add(this.options.blinkClass);

      window.setTimeout(() => {
        element.textContent = this._scrambleText(original, 0.7);
      }, Math.max(80, duration * 0.5));

      window.setTimeout(() => {
        this._cleanup(element, original);
      }, duration);
    }

    /* Selects one random error text; params: none. */
    _getRandomErrorText() {
      const errorTexts = Array.isArray(this.options.errorTexts) && this.options.errorTexts.length
        ? this.options.errorTexts
        : DEFAULT_CONFIG.errorTexts;

      return errorTexts[Math.floor(Math.random() * errorTexts.length)];
    }

    /* Returns scrambled text; params: text<string>, progress<number>. */
    _scrambleText(text, progress = 0.5) {
      const chars = this.options.chars || DEFAULT_CONFIG.chars;
      const arr = String(text || "").split("");
      const maxRatio = Number(this.options.maxCharChangeRatio) || DEFAULT_CONFIG.maxCharChangeRatio;
      const activeRatio = Math.max(0.08, (1 - progress) * maxRatio);

      return arr
        .map((char) => {
          if (char === " ") return char;

          if (Math.random() < activeRatio) {
            return chars[Math.floor(Math.random() * chars.length)];
          }

          return char;
        })
        .join("");
    }

    /* Returns block-masked text; params: text<string>. */
    _blockText(text) {
      const blockChars = ["█", "▓", "▒"];
      const ratio = Math.min(0.6, Number(this.options.maxCharChangeRatio) + 0.08);

      return String(text || "")
        .split("")
        .map((char) => {
          if (char === " ") return char;

          if (Math.random() < ratio) {
            return blockChars[Math.floor(Math.random() * blockChars.length)];
          }

          return char;
        })
        .join("");
    }

    /* Injects the compact CSS needed by the effect; params: none. */
    _injectStyle() {
      if (!this.options.injectStyle) return;
      if (document.getElementById(this.options.styleId)) return;

      const style = document.createElement("style");

      style.id = this.options.styleId;
      style.textContent = `
        .${this.options.blinkClass} {
          animation: tgfxBlink 0.08s linear 3;
          will-change: opacity, filter, transform;
          filter: contrast(1.2) saturate(1.1);
        }

        @keyframes tgfxBlink {
          0% { opacity: 1; transform: translateX(0); }
          25% { opacity: 0.2; transform: translateX(-0.5px); }
          50% { opacity: 1; transform: translateX(0.5px); }
          75% { opacity: 0.35; transform: translateX(-0.5px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `;

      document.head.appendChild(style);
    }
  }

  /* Creates the default auto instance; params: none. */
  function createAutoInstance() {
    if (autoInstance) return autoInstance;

    autoInstance = new TextGlitchFx(autoConfig);

    return autoInstance;
  }

  /* Starts the default auto instance; params: none. */
  function start() {
    const instance = createAutoInstance();

    instance.start();

    return instance;
  }

  /* Stops the default auto instance; params: none. */
  function stop() {
    if (!autoInstance) return;

    autoInstance.stop();
  }

  /* Triggers one effect on the default auto instance; params: none. */
  function triggerNow() {
    const instance = createAutoInstance();

    instance.triggerNow();
  }

  /* Updates default auto instance config; params: nextConfig<object>. */
  function updateConfig(nextConfig = {}) {
    autoConfig = Object.assign({}, autoConfig, nextConfig);

    if (!autoInstance) {
      autoInstance = new TextGlitchFx(autoConfig);
    } else {
      autoInstance.updateConfig(autoConfig);
    }

    return getConfig();
  }

  /* Returns the default auto instance config; params: none. */
  function getConfig() {
    return Object.assign({}, autoConfig);
  }

  /* Runs the plug-and-play default behavior; params: none. */
  function onReady() {
    if (!autoConfig.autoStart) return;

    start();
  }

  window.TextGlitchFx = TextGlitchFx;
  window.TextGlitchFx.updateConfig = updateConfig;
  window.TextGlitchFx.start = start;
  window.TextGlitchFx.stop = stop;
  window.TextGlitchFx.triggerNow = triggerNow;
  window.TextGlitchFx.getConfig = getConfig;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})(window, document);