(function () {
  class TextGlitchFx {
    constructor(options = {}) {
      this.options = {
        selector: "h1, h2",
        interval: 8, // 固定秒数；如果设置了 intervalRange，则优先用 intervalRange
        intervalRange: null, // 例如 [6, 12]
        duration: 420, // 每次效果持续时间，毫秒
        effects: ["scramble", "blocks", "blink", "error"],
        errorTexts: [
          "ERROR 418",
          "FATAL: NULL",
          "SYSTEM GLITCH",
          "SIGNAL LOST",
          "404 THOUGHTS",
          "DATA CORRUPTED"
        ],
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*+-=?/<>[]{}█▓▒░",
        maxCharChangeRatio: 0.55, // 最多替换多少字符，越低越不影响观看
        skipHidden: true, // 元素不可见时跳过
        respectReducedMotion: true, // 尊重 prefers-reduced-motion
        ...options
      };

      this.timer = null;
      this.running = false;
      this._injectStyle();
    }

    start() {
      if (this.running) return;
      if (
        this.options.respectReducedMotion &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }
      this.running = true;
      this._scheduleNext();
    }

    stop() {
      this.running = false;
      if (this.timer) clearTimeout(this.timer);
      this.timer = null;
    }

    triggerNow() {
      const elements = this._getEligibleElements();
      if (!elements.length) return;

      const el = elements[Math.floor(Math.random() * elements.length)];
      const effect =
        this.options.effects[
          Math.floor(Math.random() * this.options.effects.length)
        ];

      this._applyEffect(el, effect);
    }

    _scheduleNext() {
      if (!this.running) return;

      const delay = this._getNextDelay();
      this.timer = setTimeout(() => {
        this.triggerNow();
        this._scheduleNext();
      }, delay);
    }

    _getNextDelay() {
      const { interval, intervalRange } = this.options;
      if (
        Array.isArray(intervalRange) &&
        intervalRange.length === 2 &&
        intervalRange[0] <= intervalRange[1]
      ) {
        const min = intervalRange[0] * 1000;
        const max = intervalRange[1] * 1000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      return Math.max(300, interval * 1000);
    }

    _getEligibleElements() {
      const nodes = Array.from(document.querySelectorAll(this.options.selector));
      return nodes.filter((el) => {
        const text = (el.textContent || "").trim();
        if (!text) return false;
        if (this.options.skipHidden && !this._isVisible(el)) return false;
        if (el.dataset.glitchBusy === "1") return false;
        return true;
      });
    }

    _isVisible(el) {
      const style = window.getComputedStyle(el);
      if (
        style.display === "none" ||
        style.visibility === "hidden" ||
        style.opacity === "0"
      ) {
        return false;
      }
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    }

    _applyEffect(el, effect) {
      const original = el.textContent;
      const duration = this.options.duration;
      el.dataset.glitchBusy = "1";

      switch (effect) {
        case "scramble":
          this._effectScramble(el, original, duration);
          break;
        case "blocks":
          this._effectBlocks(el, original, duration);
          break;
        case "blink":
          this._effectBlink(el, original, duration);
          break;
        case "error":
          this._effectError(el, original, duration);
          break;
        default:
          this._effectScramble(el, original, duration);
      }
    }

    _cleanup(el, original) {
      el.textContent = original;
      el.classList.remove("tgfx-blink");
      delete el.dataset.glitchBusy;
    }

    _effectScramble(el, original, duration) {
      const steps = 7;
      let currentStep = 0;
      const stepTime = Math.max(24, Math.floor(duration / steps));

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        el.textContent = this._scrambleText(original, progress);

        if (currentStep >= steps) {
          clearInterval(timer);
          this._cleanup(el, original);
        }
      }, stepTime);
    }

    _effectBlocks(el, original, duration) {
      const replaced = this._blockText(original);
      el.textContent = replaced;

      setTimeout(() => {
        // 末尾加一个很短的闪回，效果更自然
        el.textContent = this._scrambleText(original, 0.75);
        setTimeout(() => {
          this._cleanup(el, original);
        }, 60);
      }, Math.max(120, duration - 60));
    }

    _effectBlink(el, original, duration) {
      el.classList.add("tgfx-blink");

      const a = setTimeout(() => {
        el.textContent = this._scrambleText(original, 0.55);
      }, 70);

      const b = setTimeout(() => {
        el.textContent = original;
      }, 150);

      const c = setTimeout(() => {
        el.textContent = this._blockText(original);
      }, 220);

      const d = setTimeout(() => {
        clearTimeout(a);
        clearTimeout(b);
        clearTimeout(c);
        this._cleanup(el, original);
      }, duration);
    }

    _effectError(el, original, duration) {
      const errorText =
        this.options.errorTexts[
          Math.floor(Math.random() * this.options.errorTexts.length)
        ];

      el.textContent = errorText;
      el.classList.add("tgfx-blink");

      setTimeout(() => {
        el.textContent = this._scrambleText(original, 0.7);
      }, Math.max(80, duration * 0.5));

      setTimeout(() => {
        this._cleanup(el, original);
      }, duration);
    }

    _scrambleText(text, progress = 0.5) {
      const chars = this.options.chars;
      const arr = text.split("");
      const maxRatio = this.options.maxCharChangeRatio;
      const activeRatio = Math.max(0.08, (1 - progress) * maxRatio);

      return arr
        .map((ch) => {
          if (ch === " ") return ch;
          if (Math.random() < activeRatio) {
            return chars[Math.floor(Math.random() * chars.length)];
          }
          return ch;
        })
        .join("");
    }

    _blockText(text) {
      const blockChars = ["█", "▓", "▒"];
      const ratio = Math.min(0.6, this.options.maxCharChangeRatio + 0.08);

      return text
        .split("")
        .map((ch) => {
          if (ch === " ") return ch;
          if (Math.random() < ratio) {
            return blockChars[Math.floor(Math.random() * blockChars.length)];
          }
          return ch;
        })
        .join("");
    }

    _injectStyle() {
      if (document.getElementById("tgfx-style")) return;

      const style = document.createElement("style");
      style.id = "tgfx-style";
      style.textContent = `
        .tgfx-blink {
          animation: tgfxBlink 0.08s linear 3;
          will-change: opacity, filter, transform;
          filter: contrast(1.2) saturate(1.1);
        }
        @keyframes tgfxBlink {
          0%   { opacity: 1; transform: translateX(0); }
          25%  { opacity: 0.2; transform: translateX(-0.5px); }
          50%  { opacity: 1; transform: translateX(0.5px); }
          75%  { opacity: 0.35; transform: translateX(-0.5px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  window.TextGlitchFx = TextGlitchFx;
})();