/*!
 * Introduction:
 *   Creates a full-screen matrix-style letter rain with configurable multi-burst explosions on a canvas overlay.
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
 *   The script creates and manages its own fixed canvas.
 *   The canvas is pointer-events:none and does not block page interaction.
 *   Multi-burst explosions are scheduled inside the animation loop, not with extra timers.
 *   The script caps DPR, particles, and drops to avoid high-DPI or overlapping-animation cost spikes.
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

    candidates: "ABCDEFGHIJKLMNOPQRSTUVWXYZ01", // Character pool.
    color: null, // Backward-compatible alias; null uses greenColor.
    greenColor: "#23ef23", // Main glyph color and first explosion color.
    whiteColor: "#f0e8e8", // White explosion color.
    errorColor: "#e81d1d", // Red ERROR-style explosion color.
    yellowColor: "#f8ca00", // Yellow explosion color.
    fontFamily: null, // Custom font family; null means inherit from page.
    fontSize: 15, // Letter size in pixels.

    zIndex: 999999, // Canvas z-index.
    canvasClass: "matrix-letter-rain", // Canvas class name.
    canvasId: "matrix-letter-rain-canvas", // Canvas element ID.
    dprMax: 1.4, // Maximum device-pixel-ratio used by the canvas.

    minSpeed: 250, // Minimum falling speed.
    maxSpeed: 400, // Maximum falling speed.
    speedMultiplier: 3, // Global speed multiplier.
    maxDrops: 6, // Maximum simultaneous falling letters.

    minExplodeLetters: 6, // Minimum letters created by first burst.
    maxExplodeLetters: 10, // Maximum letters created by first burst.
    minExplodeHeightRatio: 0.22, // Minimum explosion height ratio.
    maxExplodeHeightRatio: 0.82, // Maximum explosion height ratio.

    burstCountWeights: [0.45, 0.25, 0.15, 0.15], // Probability for 1, 2, 3, or 4 bursts.
    multiBurstDelayMin: 0.5, // Minimum delay between repeated bursts in seconds.
    multiBurstDelayMax: 0.5, // Maximum delay between repeated bursts in seconds.
    multiBurstScaleStep: 0.2, // Each later burst grows by this ratio.
    multiBurstLetterStep: 1, // Each later burst emits this many extra letters.

    minParticleLife: 0.4, // Minimum particle lifetime.
    maxParticleLife: 0.8, // Maximum particle lifetime.
    minParticleSpeed: 300, // Minimum particle burst speed.
    maxParticleSpeed: 700, // Maximum particle burst speed.
    maxParticles: 180, // Hard cap for active burst particles.

    glow: true, // Enable glow shadow.
    dropShadowBlur: 10, // Drop shadow blur.
    particleShadowBlur: 8, // Particle shadow blur.
    maxFrameDelta: 0.033, // Maximum frame delta to avoid jumps after tab restore.
    clearAlpha: 1, // Canvas clear alpha; 1 means fully clear every frame.
    pauseWhenHidden: true, // Stop RAF while the document is hidden.
    resizeDebounceMs: 120 // Debounce delay for resize rebuilds.
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
      this.pendingBursts = []; // Delayed repeated bursts.
      this.running = false; // Runtime state flag.
      this.lastTime = 0; // Last animation timestamp.
      this.rafId = 0; // Active RAF id.
      this.spawnTimer = 0; // Timer for drop spawning.
      this.resizeTimer = 0; // Debounced resize timer.
      this.delayRemaining = Math.max(0, Number(this.options.startDelaySeconds) || 0); // Start delay counter.
      this.startedSpawning = false; // Whether spawning has begun.

      this.pageFontSize = this.resolvePageFontSize(); // Page fallback font size.
      this.pageFontFamily = this.resolvePageFontFamily(); // Page fallback font family.
      this.fontFamilyCache = this.getFontFamily(); // Cached font family for frame drawing.

      this.handleResize = this.handleResize.bind(this);
      this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
      this.loop = this.loop.bind(this);

      this.createCanvas();
      window.addEventListener("resize", this.handleResize, { passive: true });
      document.addEventListener("visibilitychange", this.handleVisibilityChange, { passive: true });
      this.resizeNow();
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

    /* Clamps a number into a range; params: value<number>, min<number>, max<number>. */
    clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    /* Returns a shuffled array copy; params: array<Array>. */
    shuffled(array) {
      const copy = array.slice();

      for (let index = copy.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        const value = copy[index];

        copy[index] = copy[swapIndex];
        copy[swapIndex] = value;
      }

      return copy;
    }

    /* Returns the validated speed multiplier; params: none. */
    getSpeedMultiplier() {
      const value = Number(this.options.speedMultiplier);

      return Number.isFinite(value) && value > 0 ? value : 1;
    }

    /* Returns the main green color with legacy color fallback; params: none. */
    getGreenColor() {
      return this.options.color || this.options.greenColor || "#23ef23";
    }

    /* Returns the repeated-burst color sequence; params: burstCount<number>. */
    getBurstColors(burstCount) {
      const accentColors = this.shuffled([
        this.options.errorColor || "#e81d1d",
        this.options.yellowColor || "#f8ca00",
        this.options.whiteColor || "#f0e8e8"
      ]);

      return [this.getGreenColor()].concat(accentColors.slice(0, Math.max(0, burstCount - 1)));
    }

    /* Picks 1-4 bursts from configured weights; params: none. */
    pickBurstCount() {
      const weights = this.options.burstCountWeights || DEFAULT_CONFIG.burstCountWeights;
      const roll = Math.random();
      let total = 0;

      for (let index = 0; index < 4; index += 1) {
        total += Number(weights[index]) || 0;

        if (roll < total) {
          return index + 1;
        }
      }

      return 4;
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
      const oldCanvas = document.getElementById(this.options.canvasId);

      if (oldCanvas && oldCanvas.parentNode) {
        oldCanvas.parentNode.removeChild(oldCanvas); // Avoid duplicate canvases after restart.
      }

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
      this.ctx = this.canvas.getContext("2d", { alpha: true, desynchronized: true }) || this.canvas.getContext("2d");
    }

    /* Handles debounced viewport and DPR changes; params: none. */
    handleResize() {
      window.clearTimeout(this.resizeTimer);

      this.resizeTimer = window.setTimeout(() => {
        this.resizeNow();
      }, Math.max(0, Number(this.options.resizeDebounceMs) || 0));
    }

    /* Applies viewport and DPR changes immediately; params: none. */
    resizeNow() {
      const dprMax = Math.max(1, Number(this.options.dprMax) || DEFAULT_CONFIG.dprMax);
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, dprMax));

      this.dpr = dpr;
      this.width = window.innerWidth || document.documentElement.clientWidth || 1;
      this.height = window.innerHeight || document.documentElement.clientHeight || 1;

      this.canvas.width = Math.max(1, Math.floor(this.width * dpr));
      this.canvas.height = Math.max(1, Math.floor(this.height * dpr));
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      this.pageFontSize = this.resolvePageFontSize();
      this.pageFontFamily = this.resolvePageFontFamily();
      this.fontFamilyCache = this.getFontFamily();
    }

    /* Pauses or resumes RAF on visibility changes; params: none. */
    handleVisibilityChange() {
      if (!this.options.pauseWhenHidden) return;

      if (document.hidden) {
        window.cancelAnimationFrame(this.rafId);
        this.rafId = 0;
        this.lastTime = 0;
        return;
      }

      if (this.running && !this.rafId) {
        this.rafId = window.requestAnimationFrame(this.loop);
      }
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

    /* Adds one drop while respecting maxDrops; params: none. */
    spawnDrop() {
      const maxDrops = Math.max(1, Number(this.options.maxDrops) || DEFAULT_CONFIG.maxDrops);

      if (this.drops.length >= maxDrops) {
        this.drops.shift(); // Drop oldest instead of allowing unbounded work.
      }

      this.drops.push(this.createDrop());
    }

    /* Creates and schedules a 1-4 stage explosion sequence; params: x<number>, y<number>, baseSize<number>. */
    explode(x, y, baseSize) {
      const burstCount = this.pickBurstCount();
      const colors = this.getBurstColors(burstCount);
      let delay = 0;

      for (let burstIndex = 0; burstIndex < burstCount; burstIndex += 1) {
        if (burstIndex > 0) {
          delay += this.rand(this.options.multiBurstDelayMin, this.options.multiBurstDelayMax);
        }

        this.pendingBursts.push({
          x: x,
          y: y,
          baseSize: baseSize,
          burstIndex: burstIndex,
          color: colors[burstIndex],
          delay: delay
        });
      }
    }

    /* Runs due repeated-burst events; params: deltaTime<number>. */
    updatePendingBursts(deltaTime) {
      let write = 0;

      for (let index = 0; index < this.pendingBursts.length; index += 1) {
        const burst = this.pendingBursts[index];

        burst.delay -= deltaTime;

        if (burst.delay <= 0) {
          this.explodeOnce(burst.x, burst.y, burst.baseSize, burst.burstIndex, burst.color);
        } else {
          this.pendingBursts[write] = burst;
          write += 1;
        }
      }

      this.pendingBursts.length = write;
    }

    /* Creates one burst particle batch; params: x<number>, y<number>, baseSize<number>, burstIndex<number>, color<string>. */
    explodeOnce(x, y, baseSize, burstIndex, color) {
      const scale = 1 + burstIndex * this.options.multiBurstScaleStep;
      const baseCount = this.randInt(this.options.minExplodeLetters, this.options.maxExplodeLetters);
      const count = Math.max(1, baseCount + burstIndex * this.options.multiBurstLetterStep);
      const patterns = ["ring", "cone", "burst", "cross"];
      const pattern = patterns[this.randInt(0, patterns.length - 1)]; // New pattern for every burst.
      const baseAngle = this.rand(0, Math.PI * 2);
      const speedMultiplier = this.getSpeedMultiplier();

      for (let index = 0; index < count; index += 1) {
        const motion = this.getParticleMotion(pattern, index, count, baseAngle);
        const life = this.rand(this.options.minParticleLife, this.options.maxParticleLife);
        const speed = motion.speed * speedMultiplier * scale;

        this.particles.push({
          x: x,
          y: y,
          px: x,
          py: y,
          vx: Math.cos(motion.angle) * speed,
          vy: Math.sin(motion.angle) * speed,
          size: baseSize * scale,
          color: color,
          char: this.randomFromCandidates(),
          alpha: 1,
          life: life,
          maxLife: life,
          drag: this.rand(0.92, 0.975),
          spin: this.rand(-7, 7),
          rotation: this.rand(0, Math.PI * 2),
          changeIn: this.rand(0.03, 0.1),
          streak: this.rand(10, 26) * scale
        });
      }

      this.trimParticles();
    }

    /* Removes oldest particles when over budget; params: none. */
    trimParticles() {
      const maxParticles = Math.max(1, Number(this.options.maxParticles) || DEFAULT_CONFIG.maxParticles);
      const overflow = this.particles.length - maxParticles;

      if (overflow > 0) {
        this.particles.splice(0, overflow);
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
      const color = this.getGreenColor();

      ctx.save();
      ctx.translate(drop.x, drop.y);
      ctx.rotate(drop.angle);
      ctx.font = "700 " + drop.size + "px " + this.fontFamilyCache;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = color;

      if (this.options.glow) {
        ctx.shadowColor = color;
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
      const length = Math.sqrt(dx * dx + dy * dy) || 1;
      const tailX = particle.x - (dx / length) * particle.streak;
      const tailY = particle.y - (dy / length) * particle.streak;

      ctx.save();
      ctx.globalAlpha = particle.alpha;
      ctx.strokeStyle = particle.color;
      ctx.lineWidth = Math.max(1, particle.size * 0.08);

      if (this.options.glow) {
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = this.options.particleShadowBlur;
      }

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(particle.x, particle.y);
      ctx.stroke();

      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.font = "700 " + particle.size + "px " + this.fontFamilyCache;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = particle.color;
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
      this.ctx.globalAlpha = this.clamp(Number(this.options.clearAlpha) || 0, 0, 1);
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.restore();
    }

    /* Compact-updates an array in place; params: array<Array>, updater<Function>, deltaTime<number>. */
    compactUpdate(array, updater, deltaTime) {
      let write = 0;

      for (let index = 0; index < array.length; index += 1) {
        const item = array[index];

        if (updater.call(this, item, deltaTime)) {
          array[write] = item;
          write += 1;
        }
      }

      array.length = write;
    }

    /* Runs one animation frame; params: timestamp<number>. */
    loop(timestamp) {
      if (!this.running) return;

      if (this.options.pauseWhenHidden && document.hidden) {
        this.rafId = 0;
        this.lastTime = 0;
        return;
      }

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
      this.updatePendingBursts(deltaTime);
      this.compactUpdate(this.drops, this.updateDrop, deltaTime);
      this.compactUpdate(this.particles, this.updateParticle, deltaTime);

      for (let index = 0; index < this.drops.length; index += 1) {
        this.drawDrop(this.drops[index]);
      }

      for (let index = 0; index < this.particles.length; index += 1) {
        this.drawParticle(this.particles[index]);
      }

      this.rafId = window.requestAnimationFrame(this.loop);
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

      this.rafId = window.requestAnimationFrame(this.loop);
    }

    /* Stops the animation loop without removing canvas; params: none. */
    stop() {
      this.running = false;
      window.cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }

    /* Removes canvas and event listeners; params: none. */
    destroy() {
      this.stop();
      window.clearTimeout(this.resizeTimer);
      window.removeEventListener("resize", this.handleResize);
      document.removeEventListener("visibilitychange", this.handleVisibilityChange);

      if (this.canvas && this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }

      this.drops = [];
      this.particles = [];
      this.pendingBursts = [];
    }

    /* Updates instance options; params: nextOptions<object>. */
    updateConfig(nextOptions) {
      nextOptions = nextOptions || {};
      this.options = merge(this.options, nextOptions);

      if (Object.prototype.hasOwnProperty.call(nextOptions, "candidates")) {
        this.candidates = this.normalizeCandidates(this.options.candidates);
      }

      this.pageFontSize = this.resolvePageFontSize();
      this.pageFontFamily = this.resolvePageFontFamily();
      this.fontFamilyCache = this.getFontFamily();

      if (Object.prototype.hasOwnProperty.call(nextOptions, "startDelaySeconds") && !this.startedSpawning) {
        this.delayRemaining = Math.max(0, Number(this.options.startDelaySeconds) || 0);
      }

      if (
        Object.prototype.hasOwnProperty.call(nextOptions, "dprMax") ||
        Object.prototype.hasOwnProperty.call(nextOptions, "fontSize") ||
        Object.prototype.hasOwnProperty.call(nextOptions, "fontFamily")
      ) {
        this.resizeNow();
      }

      this.trimParticles();

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
    document.addEventListener("DOMContentLoaded", onReady, { once: true });
  } else {
    onReady();
  }
})(window, document);
