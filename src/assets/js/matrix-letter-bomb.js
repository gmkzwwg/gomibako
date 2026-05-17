/*!
 * matrix-letter-rain.v1.js
 *
 * Introduction:
 *   Creates a full-screen matrix-style letter rain with randomized multi-burst explosions.
 *   A small optional Pac-Man-style chomper effect may appear after the first burst:
 *   debris symbols are spawned on one row and eaten by a chomper entering from a screen edge.
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
 *   - Pac-Man chomper effect is rendered from embedded SVG data inside the same canvas; no extra DOM layer is created.
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

    chomper: {
      enabled: true,
      chance: 0.4,

      debrisSymbols: ";·,.",
      debrisMin: 1,
      debrisMax: 4,
      debrisGapRatio: 1.05,
      debrisSpaceMin: 1,
      debrisSpaceMax: 2,
      debrisSpaceWidthRatio: 0.55,
      debrisSizeRatio: 1,

      maxChompers: 3,
      speed: 230,
      padding: 36,
      sizeRatio: 1.45,
      eatRadiusRatio: 0.8,
      biteInterval: 0.12,

      pacmanColor: "#23ef23",
      debrisColor: "#23ef23",
      debrisFontFamily: null,

      pacmanVariants: ["crown", "santaHat", "tuftHair"],
      pacmanSvg: {
        eyeColor: "#111111",
        mouthColor: "#000000",
        crownColor: "#f8ca00",
        crownStrokeColor: "#111111",
        santaRedColor: "#e81d1d",
        santaWhiteColor: "#f0e8e8",
        santaStrokeColor: "#111111",
        hairColor: "#111111"
      }
    },

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

  function mergeNested(base, override) {
    const output = merge({}, base || {});

    Object.keys(override || {}).forEach(function (key) {
      const value = override[key];
      const current = output[key];

      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        current &&
        typeof current === "object" &&
        !Array.isArray(current)
      ) {
        output[key] = mergeNested(current, value);
      } else {
        output[key] = value;
      }
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
    const next = mergeNested(DEFAULT_CONFIG, config || {});

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
      this.chompers = [];
      this.pacmanSprites = {};

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
      this.preparePacmanSprites();
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

    getMaxChompers() {
      const chomper = this.options.chomper || {};

      return Math.max(0, toFiniteNumber(chomper.maxChompers, 3));
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
      this.trimChompers();
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

    trimChompers() {
      const overflow = this.chompers.length - this.getMaxChompers();

      if (overflow > 0) {
        this.chompers.splice(0, overflow);
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

      if (burstIndex === 0) {
        this.maybeSpawnChomper(x, y, baseSize);
      }

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

    randomDebrisSymbol() {
      const chomper = this.options.chomper || {};
      const symbols = typeof chomper.debrisSymbols === "string" && chomper.debrisSymbols
        ? Array.from(chomper.debrisSymbols)
        : [";", "·", ",", "."];

      return symbols[this.randInt(0, symbols.length - 1)] || ".";
    }

    pickChomperEntrySide() {
      const sides = ["left", "right", "top", "bottom"];

      return sides[this.randInt(0, sides.length - 1)];
    }

    createSegment(fromX, fromY, toX, toY, direction) {
      const dx = toX - fromX;
      const dy = toY - fromY;
      const length = Math.sqrt(dx * dx + dy * dy) || 1;

      return {
        fromX: fromX,
        fromY: fromY,
        toX: toX,
        toY: toY,
        direction: direction,
        length: length
      };
    }

    maybeSpawnChomper(x, y, baseSize) {
      const chomperConfig = this.options.chomper || {};

      if (!chomperConfig.enabled) return;
      if (Math.random() >= toFiniteNumber(chomperConfig.chance, 0.2)) return;

      const maxChompers = this.getMaxChompers();

      if (maxChompers <= 0) return;

      if (this.chompers.length >= maxChompers) {
        this.chompers.shift();
      }

      const debrisMin = Math.max(1, Math.floor(toFiniteNumber(chomperConfig.debrisMin, 1)));
      const debrisMax = Math.max(debrisMin, Math.floor(toFiniteNumber(chomperConfig.debrisMax, 4)));
      const debrisCount = this.randInt(debrisMin, debrisMax);

      const padding = Math.max(12, toFiniteNumber(chomperConfig.padding, 36));
      const base = Math.max(8, baseSize || this.getFontSize());
      const gap = base * toFiniteNumber(chomperConfig.debrisGapRatio, 1.05);
      const spaceMin = Math.max(0, Math.floor(toFiniteNumber(chomperConfig.debrisSpaceMin, 1)));
      const spaceMax = Math.max(spaceMin, Math.floor(toFiniteNumber(chomperConfig.debrisSpaceMax, 2)));
      const spaceWidth = base * toFiniteNumber(chomperConfig.debrisSpaceWidthRatio, 0.55);
      const rowY = clamp(y, padding, this.height - padding);
      const centerX = clamp(x, padding + gap, this.width - padding - gap);
      const debrisOffsets = [0];
      const debris = [];
      let totalWidth = 0;

      for (let index = 1; index < debrisCount; index += 1) {
        const randomSpaces = this.randInt(spaceMin, spaceMax);
        const step = gap + randomSpaces * spaceWidth;

        totalWidth += step;
        debrisOffsets.push(totalWidth);
      }

      const firstX = centerX - totalWidth / 2;

      for (let index = 0; index < debrisCount; index += 1) {
        debris.push({
          x: clamp(firstX + debrisOffsets[index], padding, this.width - padding),
          y: rowY,
          char: this.randomDebrisSymbol(),
          alive: true
        });
      }

      const leftX = Math.min.apply(null, debris.map(function (item) {
        return item.x;
      }));
      const rightX = Math.max.apply(null, debris.map(function (item) {
        return item.x;
      }));

      const side = this.pickChomperEntrySide();
      const sweepFromLeft = side === "left" || (side !== "right" && Math.random() < 0.5);
      const sweepStartX = sweepFromLeft ? leftX - padding : rightX + padding;
      const offscreenEndX = sweepFromLeft ? this.width + padding : -padding;
      const horizontalDirection = sweepFromLeft ? "right" : "left";
      const segments = [];

      if (side === "left") {
        segments.push(this.createSegment(-padding, rowY, this.width + padding, rowY, "right"));
      } else if (side === "right") {
        segments.push(this.createSegment(this.width + padding, rowY, -padding, rowY, "left"));
      } else if (side === "top") {
        segments.push(this.createSegment(sweepStartX, -padding, sweepStartX, rowY, "down"));
        segments.push(this.createSegment(sweepStartX, rowY, offscreenEndX, rowY, horizontalDirection));
      } else {
        segments.push(this.createSegment(sweepStartX, this.height + padding, sweepStartX, rowY, "up"));
        segments.push(this.createSegment(sweepStartX, rowY, offscreenEndX, rowY, horizontalDirection));
      }

      this.chompers.push({
        variant: this.pickChomperVariant(),
        x: segments[0].fromX,
        y: segments[0].fromY,
        direction: segments[0].direction,
        size: base * toFiniteNumber(chomperConfig.sizeRatio, 1.45),
        debrisSize: base * toFiniteNumber(chomperConfig.debrisSizeRatio, 1),
        debris: debris,
        segments: segments,
        segmentIndex: 0,
        segmentDistance: 0,
        biteElapsed: 0,
        mouthOpen: true
      });

      this.trimChompers();
    }

    updateChomper(chomper, deltaTime) {
      const chomperConfig = this.options.chomper || {};
      const speed = Math.max(20, toFiniteNumber(chomperConfig.speed, 520));
      const biteInterval = Math.max(0.04, toFiniteNumber(chomperConfig.biteInterval, 0.12));
      const eatRadius = chomper.size * toFiniteNumber(chomperConfig.eatRadiusRatio, 0.8);
      const segment = chomper.segments[chomper.segmentIndex];

      if (!segment) return false;

      chomper.biteElapsed += deltaTime;

      if (chomper.biteElapsed >= biteInterval) {
        chomper.biteElapsed = 0;
        chomper.mouthOpen = !chomper.mouthOpen;
      }

      chomper.segmentDistance += speed * deltaTime;

      const progress = clamp(chomper.segmentDistance / segment.length, 0, 1);

      chomper.x = segment.fromX + (segment.toX - segment.fromX) * progress;
      chomper.y = segment.fromY + (segment.toY - segment.fromY) * progress;
      chomper.direction = segment.direction;

      chomper.debris.forEach(function (debris) {
        if (!debris.alive) return;

        const dx = chomper.x - debris.x;
        const dy = chomper.y - debris.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= eatRadius) {
          debris.alive = false;
        }
      });

      if (progress >= 1) {
        chomper.segmentIndex += 1;
        chomper.segmentDistance = 0;
      }

      return chomper.segmentIndex < chomper.segments.length;
    }

    updateChompers(deltaTime) {
      let write = 0;

      for (let index = 0; index < this.chompers.length; index += 1) {
        const chomper = this.chompers[index];

        if (this.updateChomper(chomper, deltaTime)) {
          this.chompers[write] = chomper;
          write += 1;
        }
      }

      this.chompers.length = write;
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

    getSvgConfig() {
      const chomper = this.options.chomper || {};
      return chomper.pacmanSvg || {};
    }

    pickChomperVariant() {
      const chomper = this.options.chomper || {};
      const variants = Array.isArray(chomper.pacmanVariants) && chomper.pacmanVariants.length
        ? chomper.pacmanVariants
        : ["crown", "santaHat", "tuftHair"];

      return variants[this.randInt(0, variants.length - 1)] || "crown";
    }

    preparePacmanSprites() {
      const variants = ["crown", "santaHat", "tuftHair"];
      const states = ["open", "closed"];
      const sprites = {};

      for (let variantIndex = 0; variantIndex < variants.length; variantIndex += 1) {
        const variant = variants[variantIndex];
        sprites[variant] = {};

        for (let stateIndex = 0; stateIndex < states.length; stateIndex += 1) {
          const state = states[stateIndex];
          const image = new Image();
          const svg = this.buildPacmanSvg(variant, state);

          image.decoding = "async";
          image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
          sprites[variant][state] = image;
        }
      }

      this.pacmanSprites = sprites;
    }

    getPacmanSprite(variant, state) {
      const safeVariant = this.pacmanSprites[variant] ? variant : "crown";
      const safeState = state === "closed" ? "closed" : "open";

      return this.pacmanSprites[safeVariant] && this.pacmanSprites[safeVariant][safeState];
    }

    buildPacmanSvg(variant, state) {
      const chomper = this.options.chomper || {};
      const svgConfig = this.getSvgConfig();
      const bodyColor = this.escapeSvg(chomper.pacmanColor || "#23ef23");
      const eyeColor = this.escapeSvg(svgConfig.eyeColor || "#111111");
      const mouthPath = state === "closed"
        ? "M58 70 L124 60 L108 66 L124 70 L108 74 L124 80 Z"
        : "M58 70 L126 26 L107 47 L123 58 L105 70 L123 82 L107 93 L126 114 Z";
      const accessory = this.buildPacmanAccessorySvg(variant);

      return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <mask id="mouthMask">
      <rect x="0" y="0" width="128" height="128" fill="white"/>
      <path d="${mouthPath}" fill="black"/>
    </mask>
  </defs>
  <circle cx="58" cy="70" r="42" fill="${bodyColor}" mask="url(#mouthMask)"/>
  <circle cx="52" cy="49" r="5.5" fill="${eyeColor}"/>
  ${accessory}
</svg>`;
    }

    buildPacmanAccessorySvg(variant) {
      const svgConfig = this.getSvgConfig();

      if (variant === "santaHat") {
        const red = this.escapeSvg(svgConfig.santaRedColor || "#e81d1d");
        const white = this.escapeSvg(svgConfig.santaWhiteColor || "#f0e8e8");
        const stroke = this.escapeSvg(svgConfig.santaStrokeColor || "#111111");

        return `<path d="M29 39 C42 17 66 8 96 24 C78 27 61 35 43 47 Z" fill="${red}" stroke="${stroke}" stroke-width="2" stroke-linejoin="round"/>
  <path d="M32 40 C49 31 70 25 91 25" fill="none" stroke="${white}" stroke-width="9" stroke-linecap="round"/>
  <circle cx="98" cy="24" r="8" fill="${white}" stroke="${stroke}" stroke-width="1.5"/>`;
      }

      if (variant === "tuftHair") {
        const hair = this.escapeSvg(svgConfig.hairColor || "#111111");

        return `<path d="M43 33 C36 19 45 13 47 5" fill="none" stroke="${hair}" stroke-width="5" stroke-linecap="round"/>
  <path d="M56 30 C52 15 61 10 61 2" fill="none" stroke="${hair}" stroke-width="5" stroke-linecap="round"/>
  <path d="M69 32 C72 17 82 14 85 6" fill="none" stroke="${hair}" stroke-width="5" stroke-linecap="round"/>`;
      }

      const crown = this.escapeSvg(svgConfig.crownColor || "#f8ca00");
      const stroke = this.escapeSvg(svgConfig.crownStrokeColor || "#111111");

      return `<path d="M27 34 L38 14 L49 34 L60 14 L71 34 L82 14 L93 34 L90 41 L30 41 Z" fill="${crown}" stroke="${stroke}" stroke-width="2" stroke-linejoin="round"/>
  <circle cx="38" cy="31" r="2.5" fill="${stroke}"/>
  <circle cx="60" cy="29" r="2.5" fill="${stroke}"/>
  <circle cx="82" cy="31" r="2.5" fill="${stroke}"/>`;
    }

    escapeSvg(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    getDirectionAngle(direction) {
      if (direction === "left") return Math.PI;
      if (direction === "up") return -Math.PI / 2;
      if (direction === "down") return Math.PI / 2;

      return 0;
    }

    drawFallbackPacman(ctx, size, color, mouthOpen) {
      const radius = size * 0.42;
      const mouth = mouthOpen ? Math.PI * 0.28 : Math.PI * 0.04;

      ctx.save();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, mouth, Math.PI * 2 - mouth, false);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    drawChomperDebris(chomper) {
      const ctx = this.ctx;
      const chomperConfig = this.options.chomper || {};
      const color = chomperConfig.debrisColor || "#f0e8e8";

      ctx.save();
      ctx.font = "700 " + chomper.debrisSize + "px " + (chomperConfig.debrisFontFamily || this.fontFamilyCache);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = color;

      if (this.options.glow) {
        ctx.shadowColor = color;
        ctx.shadowBlur = this.options.particleShadowBlur;
      }

      chomper.debris.forEach(function (debris) {
        if (!debris.alive) return;

        ctx.fillText(debris.char, debris.x, debris.y);
      });

      ctx.restore();
    }

    drawChomper(chomper) {
      const ctx = this.ctx;
      const chomperConfig = this.options.chomper || {};
      const color = chomperConfig.pacmanColor || "#23ef23";
      const state = chomper.mouthOpen ? "open" : "closed";
      const sprite = this.getPacmanSprite(chomper.variant, state);
      const size = chomper.size;
      const angle = this.getDirectionAngle(chomper.direction || "right");

      ctx.save();
      ctx.translate(chomper.x, chomper.y);
      ctx.rotate(angle);

      if (this.options.glow) {
        ctx.shadowColor = color;
        ctx.shadowBlur = this.options.dropShadowBlur;
      }

      if (sprite && sprite.complete && sprite.naturalWidth > 0) {
        ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
      } else {
        this.drawFallbackPacman(ctx, size, color, chomper.mouthOpen);
      }

      ctx.restore();
    }

    drawChompers() {
      for (let index = 0; index < this.chompers.length; index += 1) {
        this.drawChomperDebris(this.chompers[index]);
      }

      for (let index = 0; index < this.chompers.length; index += 1) {
        this.drawChomper(this.chompers[index]);
      }
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
      this.updateChompers(deltaTime);

      for (let index = 0; index < this.drops.length; index += 1) {
        this.drawDrop(this.drops[index]);
      }

      for (let index = 0; index < this.particles.length; index += 1) {
        this.drawParticle(this.particles[index]);
      }

      this.drawChompers();

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
      this.chompers = [];
    }

    updateConfig(nextConfig) {
      if (this.disposed) return this.getConfig();

      nextConfig = nextConfig || {};
      this.options = getRuntimeConfig(mergeNested(this.options, nextConfig));

      if (Object.prototype.hasOwnProperty.call(nextConfig, "chomper")) {
        this.preparePacmanSprites();
      }

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
      this.trimChompers();

      return this.getConfig();
    }

    getConfig() {
      return mergeNested({}, this.options);
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

    activeConfig = mergeNested(activeConfig, config || {});

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
    activeConfig = mergeNested(activeConfig, config || {});

    if (instance) {
      instance.updateConfig(activeConfig);
    }

    return getConfig();
  }

  function getConfig() {
    return mergeNested({}, activeConfig);
  }

  function isSplashGone() {
    const face = document.getElementById(activeConfig.splashFaceLayerId);
    const flash = document.getElementById(activeConfig.splashFlashLayerId);

    return !face && !flash;
  }

  function startAfterSplash(config) {
    manuallyStopped = false;
    clearWaitTimer();

    activeConfig = mergeNested(activeConfig, config || {});

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
