/*!
 * matrix-letter-rain.v1.js
 *
 * Introduction:
 *   Creates a full-screen matrix-style letter rain with randomized multi-burst explosions.
 *
 * Usage:
 *   Include this file on the page. It starts automatically when autoStart is true.
 *   Runtime behavior can be customized with window.MatrixLetterRain.updateConfig().
 *
 * Global API:
 *   window.MatrixLetterRain.start(config?)
 *   window.MatrixLetterRain.startAfterSplash(config?)
 *   window.MatrixLetterRain.pause()
 *   window.MatrixLetterRain.stop()
 *   window.MatrixLetterRain.destroy()
 *   window.MatrixLetterRain.updateConfig(config)
 *   window.MatrixLetterRain.getConfig()
 *
 * Notes:
 *   - Multi-burst explosions are preserved.
 *   - Random burst count, random burst pattern, random color sequence are preserved.
 *   - stop() removes the canvas.
 *   - pause() only pauses the animation loop.
 *   - The canvas is created only when start() actually runs.
 *   - No desynchronized canvas context is used.
 */

(function (window, document) {
  "use strict";

  if (!window || !document) return;

  const DEFAULT_CONFIG = {
    autoStart: true,
    respectReducedMotion: true,

    waitForSplash: true,
    splashFaceLayerId: "hacked-face-layer",
    splashFlashLayerId: "hacked-flash-layer",
    splashWaitTimeoutMs: 6000,
    splashPollMs: 80,

    startDelaySeconds: 3,
    intervalSeconds: 5,
    immediateStart: true,

    candidates: "ABCDEFGHIJKLMNOPQRSTUVWXYZ01",
    color: null,
    greenColor: "#23ef23",
    whiteColor: "#f0e8e8",
    errorColor: "#e81d1d",
    yellowColor: "#f8ca00",

    fontFamily: null,
    fontSize: 15,

    zIndex: 1,
    canvasClass: "matrix-letter-rain",
    canvasId: "matrix-letter-rain-canvas",

    dprMax: 1.2,

    mobilePerformanceMode: true,
    mobileBreakpoint: 800,
    mobileDprMax: 1,
    mobileMaxDrops: 3,
    mobileMaxParticles: 80,
    mobileGlow: false,

    minSpeed: 250,
    maxSpeed: 400,
    speedMultiplier: 3,
    maxDrops: 4,

    minExplodeLetters: 6,
    maxExplodeLetters: 10,
    minExplodeHeightRatio: 0.22,
    maxExplodeHeightRatio: 0.82,

    burstCountWeights: [0.45, 0.25, 0.15, 0.15],
    multiBurstDelayMin: 0.5,
    multiBurstDelayMax: 0.5,
    multiBurstScaleStep: 0.2,
    multiBurstLetterStep: 1,

    minParticleLife: 0.4,
    maxParticleLife: 0.8,
    minParticleSpeed: 300,
    maxParticleSpeed: 700,
    maxParticles: 120,

    glow: true,
    dropShadowBlur: 10,
    particleShadowBlur: 8,

    maxFrameDelta: 0.033,
    clearAlpha: 1,
    pauseWhenHidden: true,
    resizeDebounceMs: 120
  };

  let activeConfig = merge({}, DEFAULT_CONFIG);
  let instance = null;
  let waitTimer = 0;
  let manuallyStopped = false;

  function merge() {
    const output = {};

    Array.prototype.slice.call(arguments).forEach(function (source) {
      Object.keys(source || {}).forEach(function (key) {
        output[key] = source[key];
      });
    });

    return output;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function toFiniteNumber(value, fallback) {
    const number = Number(value);

    return Number.isFinite(number) ? number : fallback;
  }

  function isMobileViewport(config) {
    const width = window.innerWidth || document.documentElement.clientWidth || 1024;
    const breakpoint = Math.max(1, toFiniteNumber(config.mobileBreakpoint, 800));

    return width <= breakpoint;
  }

  function getRuntimeConfig(config) {
    const next = merge({}, DEFAULT_CONFIG, config || {});

    if (next.mobilePerformanceMode && isMobileViewport(next)) {
      next.dprMax = Math.min(
        Math.max(1, toFiniteNumber(next.dprMax, DEFAULT_CONFIG.dprMax)),
        Math.max(1, toFiniteNumber(next.mobileDprMax, 1))
      );

      next.maxDrops = Math.min(
        Math.max(1, toFiniteNumber(next.maxDrops, DEFAULT_CONFIG.maxDrops)),
        Math.max(1, toFiniteNumber(next.mobileMaxDrops, 3))
      );

      next.maxParticles = Math.min(
        Math.max(1, toFiniteNumber(next.maxParticles, DEFAULT_CONFIG.maxParticles)),
        Math.max(1, toFiniteNumber(next.mobileMaxParticles, 80))
      );

      next.glow = Boolean(next.mobileGlow);
      next.dropShadowBlur = next.glow ? next.dropShadowBlur : 0;
      next.particleShadowBlur = next.glow ? next.particleShadowBlur : 0;
    }

    return next;
  }

  function shouldReduceMotion(config) {
    return Boolean(
      config.respectReducedMotion &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function clearWaitTimer() {
    if (waitTimer) {
      window.clearTimeout(waitTimer);
      waitTimer = 0;
    }
  }

  function getParent() {
    return document.body || document.documentElement;
  }

  class MatrixLetterRainEffect {
    constructor(config) {
      this.options = getRuntimeConfig(config);
      this.candidates = this.normalizeCandidates(this.options.candidates);

      this.canvas = null;
      this.ctx = null;

      this.width = 1;
      this.height = 1;
      this.dpr = 1;

      this.drops = [];
      this.particles = [];
      this.pendingBursts = [];

      this.running = false;
      this.disposed = false;
      this.rafId = 0;
      this.lastTime = 0;

      this.spawnElapsed = 0;
      this.delayRemaining = Math.max(0, toFiniteNumber(this.options.startDelaySeconds, 0));
      this.startedSpawning = false;

      this.resizeTimer = 0;

      this.pageFontSize = 16;
      this.pageFontFamily = "monospace";
      this.fontFamilyCache = "monospace";

      this.handleResize = this.handleResize.bind(this);
      this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
      this.loop = this.loop.bind(this);

      this.createCanvas();
      this.resolvePageFont();
      this.resizeNow();

      window.addEventListener("resize", this.handleResize, { passive: true });
      document.addEventListener("visibilitychange", this.handleVisibilityChange, { passive: true });
    }

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

    randomFromCandidates() {
      return this.candidates[Math.floor(Math.random() * this.candidates.length)] || "0";
    }

    rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    randInt(min, max) {
      return Math.floor(this.rand(min, max + 1));
    }

    shuffled(array) {
      const copy = array.slice();

      for (let index = copy.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        const current = copy[index];

        copy[index] = copy[swapIndex];
        copy[swapIndex] = current;
      }

      return copy;
    }

    createCanvas() {
      const oldCanvas = document.getElementById(this.options.canvasId);

      if (oldCanvas && oldCanvas.parentNode) {
        oldCanvas.parentNode.removeChild(oldCanvas);
      }

      this.canvas = document.createElement("canvas");
      this.canvas.id = this.options.canvasId;
      this.canvas.setAttribute("aria-hidden", "true");

      this.applyCanvasStyle();

      getParent().appendChild(this.canvas);

      try {
        this.ctx = this.canvas.getContext("2d", { alpha: true }) || this.canvas.getContext("2d");
      } catch (error) {
        this.ctx = this.canvas.getContext("2d");
      }
    }

    applyCanvasStyle() {
      if (!this.canvas) return;

      this.canvas.className = this.options.canvasClass || DEFAULT_CONFIG.canvasClass;

      Object.assign(this.canvas.style, {
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100vh",
        display: "block",
        pointerEvents: "none",
        zIndex: String(this.options.zIndex)
      });
    }

    resolvePageFont() {
      const htmlStyle = window.getComputedStyle(document.documentElement);
      const bodyStyle = document.body ? window.getComputedStyle(document.body) : null;

      const htmlSize = parseFloat(htmlStyle.fontSize);
      const bodySize = bodyStyle ? parseFloat(bodyStyle.fontSize) : NaN;

      const htmlFamily = htmlStyle.fontFamily ? htmlStyle.fontFamily.trim() : "";
      const bodyFamily = bodyStyle && bodyStyle.fontFamily ? bodyStyle.fontFamily.trim() : "";

      this.pageFontSize =
        Number.isFinite(bodySize) && bodySize > 0
          ? bodySize
          : Number.isFinite(htmlSize) && htmlSize > 0
            ? htmlSize
            : 16;

      this.pageFontFamily = bodyFamily || htmlFamily || "monospace";
      this.fontFamilyCache = this.getFontFamily();
    }

    getFontSize() {
      const custom = Number(this.options.fontSize);

      return Number.isFinite(custom) && custom > 0 ? custom : this.pageFontSize;
    }

    getFontFamily() {
      return this.options.fontFamily || this.pageFontFamily || "monospace";
    }

    getGreenColor() {
      return this.options.color || this.options.greenColor || "#23ef23";
    }

    getSpeedMultiplier() {
      const value = Number(this.options.speedMultiplier);

      return Number.isFinite(value) && value > 0 ? value : 1;
    }

    getMaxDrops() {
      return Math.max(1, toFiniteNumber(this.options.maxDrops, DEFAULT_CONFIG.maxDrops));
    }

    getMaxParticles() {
      return Math.max(1, toFiniteNumber(this.options.maxParticles, DEFAULT_CONFIG.maxParticles));
    }

    getBurstColors(burstCount) {
      const accentColors = this.shuffled([
        this.options.errorColor || "#e81d1d",
        this.options.yellowColor || "#f8ca00",
        this.options.whiteColor || "#f0e8e8"
      ]);

      return [this.getGreenColor()].concat(accentColors.slice(0, Math.max(0, burstCount - 1)));
    }

    pickBurstCount() {
      const weights = Array.isArray(this.options.burstCountWeights)
        ? this.options.burstCountWeights
        : DEFAULT_CONFIG.burstCountWeights;

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

    resizeNow() {
      if (!this.canvas || !this.ctx) return;

      const dprMax = Math.max(1, toFiniteNumber(this.options.dprMax, DEFAULT_CONFIG.dprMax));
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, dprMax));

      this.dpr = dpr;
      this.width = window.innerWidth || document.documentElement.clientWidth || 1;
      this.height = window.innerHeight || document.documentElement.clientHeight || 1;

      this.canvas.width = Math.max(1, Math.floor(this.width * dpr));
      this.canvas.height = Math.max(1, Math.floor(this.height * dpr));

      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      this.resolvePageFont();
      this.trimDrops();
      this.trimParticles();
    }

    handleResize() {
      window.clearTimeout(this.resizeTimer);

      this.resizeTimer = window.setTimeout(() => {
        if (this.disposed) return;

        this.options = getRuntimeConfig(this.options);
        this.applyCanvasStyle();
        this.resizeNow();
      }, Math.max(0, toFiniteNumber(this.options.resizeDebounceMs, 120)));
    }

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

    trimDrops() {
      const overflow = this.drops.length - this.getMaxDrops();

      if (overflow > 0) {
        this.drops.splice(0, overflow);
      }
    }

    trimParticles() {
      const overflow = this.particles.length - this.getMaxParticles();

      if (overflow > 0) {
        this.particles.splice(0, overflow);
      }
    }

    spawnDrop() {
      this.drops.push(this.createDrop());
      this.trimDrops();
    }

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

    explodeOnce(x, y, baseSize, burstIndex, color) {
      const scale = 1 + burstIndex * this.options.multiBurstScaleStep;
      const baseCount = this.randInt(this.options.minExplodeLetters, this.options.maxExplodeLetters);
      const count = Math.max(1, baseCount + burstIndex * this.options.multiBurstLetterStep);
      const pattern = this.pickExplosionPattern();
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

    pickExplosionPattern() {
      const patterns = ["ring", "cone", "burst", "cross"];

      return patterns[this.randInt(0, patterns.length - 1)];
    }

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

    clear() {
      if (!this.ctx) return;

      this.ctx.clearRect(0, 0, this.width, this.height);
    }

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

    updateSpawning(deltaTime) {
      if (!this.startedSpawning) {
        this.delayRemaining -= deltaTime;

        if (this.delayRemaining <= 0) {
          this.startedSpawning = true;
          this.spawnElapsed = 0;

          if (this.options.immediateStart) {
            this.spawnDrop();
          }
        }

        return;
      }

      this.spawnElapsed += deltaTime;

      const interval = Math.max(0.05, toFiniteNumber(this.options.intervalSeconds, 5));

      if (this.spawnElapsed >= interval) {
        this.spawnElapsed -= interval;
        this.spawnDrop();
      }
    }

    loop(timestamp) {
      if (!this.running || this.disposed) return;

      if (this.options.pauseWhenHidden && document.hidden) {
        this.rafId = 0;
        this.lastTime = 0;
        return;
      }

      if (!this.lastTime) {
        this.lastTime = timestamp;
      }

      const deltaTime = Math.min(
        toFiniteNumber(this.options.maxFrameDelta, DEFAULT_CONFIG.maxFrameDelta),
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

    start() {
      if (this.running || this.disposed) return;

      this.running = true;
      this.lastTime = 0;
      this.spawnElapsed = 0;
      this.delayRemaining = Math.max(0, toFiniteNumber(this.options.startDelaySeconds, 0));
      this.startedSpawning = this.delayRemaining <= 0;

      if (this.startedSpawning && this.options.immediateStart) {
        this.spawnDrop();
      }

      this.rafId = window.requestAnimationFrame(this.loop);
    }

    pause() {
      this.running = false;
      this.lastTime = 0;

      if (this.rafId) {
        window.cancelAnimationFrame(this.rafId);
        this.rafId = 0;
      }
    }

    destroy() {
      this.pause();
      this.disposed = true;

      window.clearTimeout(this.resizeTimer);
      window.removeEventListener("resize", this.handleResize);
      document.removeEventListener("visibilitychange", this.handleVisibilityChange);

      if (this.canvas && this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }

      this.canvas = null;
      this.ctx = null;
      this.drops = [];
      this.particles = [];
      this.pendingBursts = [];
    }

    updateConfig(nextConfig) {
      if (this.disposed) return this.getConfig();

      nextConfig = nextConfig || {};
      this.options = getRuntimeConfig(merge(this.options, nextConfig));

      if (Object.prototype.hasOwnProperty.call(nextConfig, "candidates")) {
        this.candidates = this.normalizeCandidates(this.options.candidates);
      }

      if (Object.prototype.hasOwnProperty.call(nextConfig, "startDelaySeconds") && !this.startedSpawning) {
        this.delayRemaining = Math.max(0, toFiniteNumber(this.options.startDelaySeconds, 0));
      }

      this.applyCanvasStyle();
      this.resolvePageFont();

      if (
        Object.prototype.hasOwnProperty.call(nextConfig, "dprMax") ||
        Object.prototype.hasOwnProperty.call(nextConfig, "mobileDprMax") ||
        Object.prototype.hasOwnProperty.call(nextConfig, "fontSize") ||
        Object.prototype.hasOwnProperty.call(nextConfig, "fontFamily")
      ) {
        this.resizeNow();
      }

      this.trimDrops();
      this.trimParticles();

      return this.getConfig();
    }

    getConfig() {
      return merge({}, this.options);
    }
  }

  function destroyInstance() {
    if (instance) {
      instance.destroy();
      instance = null;
    }
  }

  function createInstance(config) {
    destroyInstance();
    instance = new MatrixLetterRainEffect(config);

    return instance;
  }

  function start(config) {
    manuallyStopped = false;
    clearWaitTimer();

    activeConfig = merge(activeConfig, config || {});

    if (shouldReduceMotion(activeConfig)) {
      destroyInstance();
      return null;
    }

    createInstance(activeConfig);
    instance.start();

    return instance;
  }

  function pause() {
    clearWaitTimer();

    if (instance) {
      instance.pause();
    }
  }

  function stop() {
    manuallyStopped = true;
    clearWaitTimer();
    destroyInstance();
  }

  function destroy() {
    stop();
  }

  function updateConfig(config) {
    activeConfig = merge(activeConfig, config || {});

    if (instance) {
      instance.updateConfig(activeConfig);
    }

    return getConfig();
  }

  function getConfig() {
    return merge({}, activeConfig);
  }

  function isSplashGone() {
    const face = document.getElementById(activeConfig.splashFaceLayerId);
    const flash = document.getElementById(activeConfig.splashFlashLayerId);

    return !face && !flash;
  }

  function startAfterSplash(config) {
    manuallyStopped = false;
    clearWaitTimer();

    activeConfig = merge(activeConfig, config || {});

    if (shouldReduceMotion(activeConfig)) {
      destroyInstance();
      return null;
    }

    const startedAt = Date.now();
    const timeout = Math.max(0, toFiniteNumber(activeConfig.splashWaitTimeoutMs, 6000));
    const poll = Math.max(16, toFiniteNumber(activeConfig.splashPollMs, 80));

    function check() {
      if (manuallyStopped) return;

      if (isSplashGone() || Date.now() - startedAt >= timeout) {
        waitTimer = 0;
        start();
        return;
      }

      waitTimer = window.setTimeout(check, poll);
    }

    check();

    return null;
  }

  function onReady() {
    if (!activeConfig.autoStart) return;

    if (activeConfig.waitForSplash) {
      startAfterSplash();
      return;
    }

    start();
  }

  window.MatrixLetterRain = {
    start: start,
    startAfterSplash: startAfterSplash,
    pause: pause,
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