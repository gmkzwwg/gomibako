/*!
 * Introduction:
 *   Creates a full-screen matrix-style letter rain and burst animation on a canvas overlay.
 *
 * Usage:
 *   Include this file on the page. It starts automatically with DEFAULT_CONFIG.
 *   Default behavior can be customized by editing DEFAULT_CONFIG below.
 *   Runtime behavior can be customized with window.MatrixLetterRain.updateConfig().
 *
 * Global API:
 *   window.MatrixLetterRain.start(config)
 *   window.MatrixLetterRain.stop()
 *   window.MatrixLetterRain.destroy()
 *   window.MatrixLetterRain.updateConfig(config)
 *   window.MatrixLetterRain.getConfig()
 *
 * Notes:
 *   This script creates and manages its own fixed canvas.
 *   The canvas is pointer-events:none and does not block page interaction.
 *   The script respects prefers-reduced-motion by default.
 */

(function (window, document) {
  "use strict";

  if (!window || !document) return;

  const DEFAULT_CONFIG = {
    autoStart: true, // Start automatically after script loading.
    respectReducedMotion: true, // Disable animation when reduced motion is requested.

    startDelaySeconds: 3, // Delay before the first spawn.
    intervalSeconds: 5, // Time between new drops.
    immediateStart: true, // Spawn immediately after delay finishes.

    candidates: "αβγδεζηθικλμνξοπρστυφχψωℂℍℚℝℕℙℤⅈⅉⅇℼℽℵ", // Character pool.
    color: "#0fca1c", // Letter and trail color.
    fontFamily: null, // Custom font family; null means inherit from page.
    fontSize: 15, // Letter size in pixels.

    zIndex: 999999, // Canvas z-index.
    canvasClass: "matrix-letter-rain", // Canvas class name.
    canvasId: "matrix-letter-rain-canvas", // Canvas element ID.

    minSpeed: 220, // Minimum falling speed.
    maxSpeed: 420, // Maximum falling speed.
    speedMultiplier: 3.2, // Global speed multiplier.

    minExplodeLetters: 6, // Minimum letters created by one burst.
    maxExplodeLetters: 10, // Maximum letters created by one burst.
    minExplodeHeightRatio: 0.22, // Minimum explosion height ratio.
    maxExplodeHeightRatio: 0.82, // Maximum explosion height ratio.

    minParticleLife: 0.45, // Minimum particle lifetime.
    maxParticleLife: 0.9, // Maximum particle lifetime.
    minParticleSpeed: 360, // Minimum particle burst speed.
    maxParticleSpeed: 900, // Maximum particle burst speed.

    glow: true, // Enable glow shadow.
    dropShadowBlur: 12, // Drop shadow blur.
    particleShadowBlur: 10, // Particle shadow blur.
    maxFrameDelta: 0.033, // Maximum frame delta to avoid jumps after tab restore.
    clearAlpha: 1 // Canvas clear alpha; 1 means fully clear every frame.
  };

  let activeConfig = merge({}, DEFAULT_CONFIG); // Active runtime configuration.
  let instance = null; // Current animation instance.

  /* Merges objects from left to right; params: ...objects<object>. */
  function merge() {
    const output = {};

    Array.prototype.slice.call(arguments).forEach(function (object) {
      Object.keys(object || {}).forEach(function (key) {
        output[key] = object[key];
      });
    });

    return output;
  }

  /* Checks reduced-motion preference; params: config<object>. */
  function shouldReduceMotion(config) {
    return Boolean(
      config.respectReducedMotion &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  /* Creates one matrix rain animation instance; params: options<object>. */
  class MatrixLetterRainEffect {
    constructor(options) {
      this.options = merge({}, DEFAULT_CONFIG, options || {}); // Instance config.
      this.candidates = this.normalizeCandidates(this.options.candidates); // Normalized character pool.
      this.drops = []; // Falling letters.
      this.particles = []; // Burst particles.
      this.running = false; // Runtime state flag.
      this.lastTime = 0; // Last animation timestamp.
      this.spawnTimer = 0; // Timer for drop spawning.
      this.delayRemaining = Math.max(0, Number(this.options.startDelaySeconds) || 0); // Start delay counter.
      this.startedSpawning = false; // Whether spawning has begun.

      this.pageFontSize = this.resolvePageFontSize(); // Page fallback font size.
      this.pageFontFamily = this.resolvePageFontFamily(); // Page fallback font family.

      this.handleResize = this.handleResize.bind(this);
      this.loop = this.loop.bind(this);

      this.createCanvas();
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
    }

    /* Normalizes candidate characters; params: candidates<string|Array>. */
    normalizeCandidates(candidates) {
      if (Array.isArray(candidates)) {
        return candidates.map(function (value) {
          return String(value);
        }).filter(Boolean);
      }

      if (typeof candidates === "string") {
        return Array.from(candidates).filter(Boolean);
      }

      return ["0", "1"];
    }

    /* Returns a random candidate character; params: none. */
    randomFromCandidates() {
      return this.candidates[Math.floor(Math.random() * this.candidates.length)] || "0";
    }

    /* Returns a random float in range; params: min<number>, max<number>. */
    rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    /* Returns a random integer in range; params: min<number>, max<number>. */
    randInt(min, max) {
      return Math.floor(this.rand(min, max + 1));
    }

    /* Returns the validated speed multiplier; params: none. */
    getSpeedMultiplier() {
      const value = Number(this.options.speedMultiplier);

      return Number.isFinite(value) && value > 0 ? value : 1;
    }

    /* Resolves the page font size; params: none. */
    resolvePageFontSize() {
      const bodyStyle = document.body ? window.getComputedStyle(document.body) : null;
      const htmlStyle = window.getComputedStyle(document.documentElement);
      const bodySize = bodyStyle ? parseFloat(bodyStyle.fontSize) : NaN;
      const htmlSize = parseFloat(htmlStyle.fontSize);

      if (Number.isFinite(bodySize) && bodySize > 0) return bodySize;
      if (Number.isFinite(htmlSize) && htmlSize > 0) return htmlSize;

      return 16;
    }

    /* Resolves the page font family; params: none. */
    resolvePageFontFamily() {
      const bodyStyle = document.body ? window.getComputedStyle(document.body) : null;
      const htmlStyle = window.getComputedStyle(document.documentElement);
      const bodyFamily = bodyStyle && bodyStyle.fontFamily ? bodyStyle.fontFamily.trim() : "";
      const htmlFamily = htmlStyle && htmlStyle.fontFamily ? htmlStyle.fontFamily.trim() : "";

      return bodyFamily || htmlFamily || "monospace";
    }

    /* Returns active font size; params: none. */
    getFontSize() {
      const custom = Number(this.options.fontSize);

      if (Number.isFinite(custom) && custom > 0) return custom;

      return this.pageFontSize;
    }

    /* Returns active font family; params: none. */
    getFontFamily() {
      return this.options.fontFamily || this.pageFontFamily || "monospace";
    }

    /* Creates and attaches the canvas; params: none. */
    createCanvas() {
      this.canvas = document.createElement("canvas");
      this.canvas.id = this.options.canvasId;
      this.canvas.className = this.options.canvasClass;
      this.canvas.setAttribute("aria-hidden", "true");

      Object.assign(this.canvas.style, {
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: String(this.options.zIndex)
      });

      document.documentElement.appendChild(this.canvas);
      this.ctx = this.canvas.getContext("2d");
    }

    /* Handles viewport and DPR changes; params: none. */
    handleResize() {
      const dpr = Math.max(1, window.devicePixelRatio || 1);

      this.dpr = dpr;
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.canvas.width = Math.floor(this.width * dpr);
      this.canvas.height = Math.floor(this.height * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      this.pageFontSize = this.resolvePageFontSize();
      this.pageFontFamily = this.resolvePageFontFamily();
    }

    /* Creates one falling drop; params: none. */
    createDrop() {
      const size = this.getFontSize();
      const speedMultiplier = this.getSpeedMultiplier();
      const x = this.rand(size, Math.max(size, this.width - size));
      const speed = this.rand(this.options.minSpeed, this.options.maxSpeed) * speedMultiplier;
      const explodeY = this.rand(
        this.height * this.options.minExplodeHeightRatio,
        this.height * this.options.maxExplodeHeightRatio
      );

      return {
        x: x,
        y: -size,
        size: size,
        speed: speed,
        char: this.randomFromCandidates(),
        changeIn: this.rand(0.04, 0.12),
        rotation: this.rand(-0.08, 0.08),
        angle: this.rand(-0.1, 0.1),
        explodeY: explodeY
      };
    }

    /* Adds one drop to the scene; params: none. */
    spawnDrop() {
      this.drops.push(this.createDrop());
    }

    /* Creates burst particles at a point; params: x<number>, y<number>, baseSize<number>. */
    explode(x, y, baseSize) {
      const count = this.randInt(this.options.minExplodeLetters, this.options.maxExplodeLetters);
      const patterns = ["ring", "cone", "burst", "cross"];
      const pattern = patterns[this.randInt(0, patterns.length - 1)];
      const baseAngle = this.rand(0, Math.PI * 2);
      const speedMultiplier = this.getSpeedMultiplier();

      for (let index = 0; index < count; index += 1) {
        const motion = this.getParticleMotion(pattern, index, count, baseAngle);
        const life = this.rand(this.options.minParticleLife, this.options.maxParticleLife);
        const speed = motion.speed * speedMultiplier;

        this.particles.push({
          x: x,
          y: y,
          px: x,
          py: y,
          vx: Math.cos(motion.angle) * speed,
          vy: Math.sin(motion.angle) * speed,
          size: baseSize,
          char: this.randomFromCandidates(),
          alpha: 1,
          life: life,
          maxLife: life,
          drag: this.rand(0.92, 0.975),
          spin: this.rand(-7, 7),
          rotation: this.rand(0, Math.PI * 2),
          changeIn: this.rand(0.03, 0.1),
          streak: this.rand(10, 26)
        });
      }
    }

    /* Returns angle and speed for one particle; params: pattern<string>, index<number>, count<number>, baseAngle<number>. */
    getParticleMotion(pattern, index, count, baseAngle) {
      if (pattern === "ring") {
        return {
          angle: baseAngle + (Math.PI * 2 * index) / count + this.rand(-0.18, 0.18),
          speed: this.rand(380, 760)
        };
      }

      if (pattern === "cone") {
        return {
          angle: baseAngle + this.rand(-0.45, 0.45),
          speed: this.rand(420, 860)
        };
      }

      if (pattern === "cross") {
        const baseSet = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];

        return {
          angle: baseSet[index % 4] + this.rand(-0.22, 0.22),
          speed: this.rand(450, 800)
        };
      }

      return {
        angle: this.rand(0, Math.PI * 2),
        speed: this.rand(this.options.minParticleSpeed, this.options.maxParticleSpeed)
      };
    }

    /* Updates one falling drop; params: drop<object>, deltaTime<number>. */
    updateDrop(drop, deltaTime) {
      drop.y += drop.speed * deltaTime;
      drop.angle += drop.rotation * deltaTime * 60;
      drop.changeIn -= deltaTime;

      if (drop.changeIn <= 0) {
        drop.char = this.randomFromCandidates();
        drop.changeIn = this.rand(0.04, 0.12);
      }

      if (drop.y >= drop.explodeY) {
        this.explode(drop.x, drop.y, drop.size);
        return false;
      }

      if (drop.y >= this.height - drop.size * 0.5) {
        this.explode(drop.x, this.height - drop.size * 0.5, drop.size);
        return false;
      }

      return true;
    }

    /* Updates one burst particle; params: particle<object>, deltaTime<number>. */
    updateParticle(particle, deltaTime) {
      particle.px = particle.x;
      particle.py = particle.y;

      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;
      particle.vx *= Math.pow(particle.drag, deltaTime * 60);
      particle.vy *= Math.pow(particle.drag, deltaTime * 60);
      particle.rotation += particle.spin * deltaTime * 0.05;
      particle.life -= deltaTime;
      particle.alpha = Math.max(0, particle.life / particle.maxLife);
      particle.changeIn -= deltaTime;

      if (particle.changeIn <= 0) {
        particle.char = this.randomFromCandidates();
        particle.changeIn = this.rand(0.03, 0.1);
      }

      return particle.life > 0;
    }

    /* Draws one falling drop; params: drop<object>. */
    drawDrop(drop) {
      const ctx = this.ctx;

      ctx.save();
      ctx.translate(drop.x, drop.y);
      ctx.rotate(drop.angle);
      ctx.font = "700 " + drop.size + "px " + this.getFontFamily();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = this.options.color;

      if (this.options.glow) {
        ctx.shadowColor = this.options.color;
        ctx.shadowBlur = this.options.dropShadowBlur;
      }

      ctx.fillText(drop.char, 0, 0);
      ctx.restore();
    }

    /* Draws one burst particle; params: particle<object>. */
    drawParticle(particle) {
      const ctx = this.ctx;
      const dx = particle.x - particle.px;
      const dy = particle.y - particle.py;
      const length = Math.hypot(dx, dy) || 1;
      const tailX = particle.x - (dx / length) * particle.streak;
      const tailY = particle.y - (dy / length) * particle.streak;

      ctx.save();
      ctx.globalAlpha = particle.alpha;
      ctx.strokeStyle = this.options.color;
      ctx.lineWidth = Math.max(1, particle.size * 0.08);

      if (this.options.glow) {
        ctx.shadowColor = this.options.color;
        ctx.shadowBlur = this.options.particleShadowBlur;
      }

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(particle.x, particle.y);
      ctx.stroke();

      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.font = "700 " + particle.size + "px " + this.getFontFamily();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = this.options.color;
      ctx.fillText(particle.char, 0, 0);
      ctx.restore();
    }

    /* Clears the canvas; params: none. */
    clear() {
      if (this.options.clearAlpha >= 1) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        return;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, Math.min(1, this.options.clearAlpha));
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.restore();
    }

    /* Runs one animation frame; params: timestamp<number>. */
    loop(timestamp) {
      if (!this.running) return;

      if (!this.lastTime) {
        this.lastTime = timestamp;
      }

      const deltaTime = Math.min(
        this.options.maxFrameDelta,
        (timestamp - this.lastTime) / 1000
      );

      this.lastTime = timestamp;
      this.clear();
      this.updateSpawning(deltaTime);

      this.drops = this.drops.filter((drop) => this.updateDrop(drop, deltaTime));
      this.particles = this.particles.filter((particle) => this.updateParticle(particle, deltaTime));

      this.drops.forEach((drop) => this.drawDrop(drop));
      this.particles.forEach((particle) => this.drawParticle(particle));

      window.requestAnimationFrame(this.loop);
    }

    /* Updates delayed and interval spawning; params: deltaTime<number>. */
    updateSpawning(deltaTime) {
      if (!this.startedSpawning) {
        this.delayRemaining -= deltaTime;

        if (this.delayRemaining <= 0) {
          this.startedSpawning = true;
          this.spawnTimer = 0;

          if (this.options.immediateStart) {
            this.spawnDrop();
          }
        }

        return;
      }

      this.spawnTimer += deltaTime;

      const interval = Math.max(0.05, Number(this.options.intervalSeconds) || 5);

      if (this.spawnTimer >= interval) {
        this.spawnTimer -= interval;
        this.spawnDrop();
      }
    }

    /* Starts the animation; params: none. */
    start() {
      if (this.running) return;

      this.running = true;
      this.lastTime = 0;
      this.spawnTimer = 0;
      this.delayRemaining = Math.max(0, Number(this.options.startDelaySeconds) || 0);
      this.startedSpawning = this.delayRemaining <= 0;

      if (this.startedSpawning && this.options.immediateStart) {
        this.spawnDrop();
      }

      window.requestAnimationFrame(this.loop);
    }

    /* Stops the animation loop without removing canvas; params: none. */
    stop() {
      this.running = false;
    }

    /* Removes canvas and event listeners; params: none. */
    destroy() {
      this.stop();
      window.removeEventListener("resize", this.handleResize);

      if (this.canvas && this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }

      this.drops = [];
      this.particles = [];
    }

    /* Updates instance options; params: nextOptions<object>. */
    updateConfig(nextOptions) {
      this.options = merge(this.options, nextOptions || {});

      if (Object.prototype.hasOwnProperty.call(nextOptions || {}, "candidates")) {
        this.candidates = this.normalizeCandidates(this.options.candidates);
      }

      this.pageFontSize = this.resolvePageFontSize();
      this.pageFontFamily = this.resolvePageFontFamily();

      if (Object.prototype.hasOwnProperty.call(nextOptions || {}, "startDelaySeconds") && !this.startedSpawning) {
        this.delayRemaining = Math.max(0, Number(this.options.startDelaySeconds) || 0);
      }

      return this.getConfig();
    }

    /* Returns a copy of instance config; params: none. */
    getConfig() {
      return merge({}, this.options);
    }
  }

  /* Creates a new instance; params: options<object>. */
  function createInstance(options) {
    if (instance) {
      instance.destroy();
    }

    instance = new MatrixLetterRainEffect(options);

    return instance;
  }

  /* Starts the global animation instance; params: options<object>. */
  function start(options) {
    activeConfig = merge(activeConfig, options || {});

    if (shouldReduceMotion(activeConfig)) {
      return null;
    }

    createInstance(activeConfig);
    instance.start();

    return instance;
  }

  /* Stops the global animation instance; params: none. */
  function stop() {
    if (instance) {
      instance.stop();
    }
  }

  /* Destroys the global animation instance; params: none. */
  function destroy() {
    if (instance) {
      instance.destroy();
      instance = null;
    }
  }

  /* Updates global config and active instance; params: nextConfig<object>. */
  function updateConfig(nextConfig) {
    activeConfig = merge(activeConfig, nextConfig || {});

    if (instance) {
      instance.updateConfig(activeConfig);
    }

    return getConfig();
  }

  /* Returns a copy of the active global config; params: none. */
  function getConfig() {
    return merge({}, activeConfig);
  }

  /* Runs plug-and-play behavior when DOM is ready; params: none. */
  function onReady() {
    if (!activeConfig.autoStart) return;

    start();
  }

  window.MatrixLetterRain = {
    start: start,
    stop: stop,
    destroy: destroy,
    updateConfig: updateConfig,
    getConfig: getConfig
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})(window, document);