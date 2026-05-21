/*!
 * matrix-letter-rain.v2-lite.js
 *
 * Introduction:
 *   Full-screen matrix-style letter rain with falling glyphs, fixed-delay multi-burst explosions,
 *   and an optional Pac-Man-style chomper that eats debris after the first burst.
 *
 * Usage:
 *   Include this file on the page. It starts automatically when autoStart is true.
 *   Use window.MatrixLetterRain.toggle(active) to sync it with a UI button.
 *
 * Global API:
 *   window.MatrixLetterRain.start(config?)
 *   window.MatrixLetterRain.toggle(force?, config?)
 *   window.MatrixLetterRain.updateConfig(config)
 *   window.MatrixLetterRain.getConfig()
 *
 * Notes:
 *   Public API is intentionally small. toggle(false) removes the canvas. start()/toggle(true) are idempotent.
 *   multiBurstScaleStep is removed. Burst delay is fixed with multiBurstDelaySeconds.
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
    multiBurstDelaySeconds: 0.5,
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
    pauseWhenHidden: true,
    resizeDebounceMs: 120
  };

  let activeConfig = mergeNested({}, DEFAULT_CONFIG);
  let instance = null;
  let waitTimer = 0;
  let manuallyStopped = false;

  function mergeNested(base, override) {
    const output = Object.assign({}, base || {});
    Object.keys(override || {}).forEach(function (key) {
      const value = override[key];
      const current = output[key];
      if (isPlainObject(value) && isPlainObject(current)) output[key] = mergeNested(current, value);
      else output[key] = value;
    });
    return output;
  }

  function isPlainObject(value) {
    return value && typeof value === "object" && !Array.isArray(value);
  }

  function toNumber(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function isMobileViewport(config) {
    const width = window.innerWidth || document.documentElement.clientWidth || 1024;
    return width <= Math.max(1, toNumber(config.mobileBreakpoint, 800));
  }

  function runtimeConfig(config) {
    const next = mergeNested(DEFAULT_CONFIG, config || {});
    if (next.mobilePerformanceMode && isMobileViewport(next)) {
      next.dprMax = Math.min(Math.max(1, toNumber(next.dprMax, 1.2)), Math.max(1, toNumber(next.mobileDprMax, 1)));
      next.maxDrops = Math.min(Math.max(1, toNumber(next.maxDrops, 4)), Math.max(1, toNumber(next.mobileMaxDrops, 3)));
      next.maxParticles = Math.min(Math.max(1, toNumber(next.maxParticles, 120)), Math.max(1, toNumber(next.mobileMaxParticles, 80)));
      next.glow = Boolean(next.mobileGlow);
      next.dropShadowBlur = next.glow ? next.dropShadowBlur : 0;
      next.particleShadowBlur = next.glow ? next.particleShadowBlur : 0;
    }
    return next;
  }

  function shouldReduceMotion(config) {
    return Boolean(config.respectReducedMotion && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function clearWaitTimer() {
    if (waitTimer) window.clearTimeout(waitTimer);
    waitTimer = 0;
  }

  function parentNode() {
    return document.body || document.documentElement;
  }

  class MatrixLetterRainEffect {
    constructor(config) {
      this.options = runtimeConfig(config);
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
      this.delayRemaining = Math.max(0, toNumber(this.options.startDelaySeconds, 0));
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
      if (this.options.chomper && this.options.chomper.enabled) this.preparePacmanSprites();
      this.resizeNow();
      window.addEventListener("resize", this.handleResize, { passive: true });
      document.addEventListener("visibilitychange", this.handleVisibilityChange, { passive: true });
    }

    normalizeCandidates(candidates) {
      if (Array.isArray(candidates)) return candidates.map(String).filter(Boolean);
      if (typeof candidates === "string") return Array.from(candidates).filter(Boolean);
      return ["0", "1"];
    }

    rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    randInt(min, max) {
      return Math.floor(this.rand(min, max + 1));
    }

    pick(list) {
      return list[this.randInt(0, list.length - 1)];
    }

    shuffled(list) {
      const copy = list.slice();
      for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = this.randInt(0, i);
        const value = copy[i];
        copy[i] = copy[j];
        copy[j] = value;
      }
      return copy;
    }

    createCanvas() {
      const old = document.getElementById(this.options.canvasId);
      if (old && old.parentNode) old.parentNode.removeChild(old);

      this.canvas = document.createElement("canvas");
      this.canvas.id = this.options.canvasId;
      this.canvas.className = this.options.canvasClass || DEFAULT_CONFIG.canvasClass;
      this.canvas.setAttribute("aria-hidden", "true");
      Object.assign(this.canvas.style, {
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100vh",
        display: "block",
        pointerEvents: "none",
        zIndex: String(this.options.zIndex)
      });
      parentNode().appendChild(this.canvas);

      try {
        this.ctx = this.canvas.getContext("2d", { alpha: true }) || this.canvas.getContext("2d");
      } catch (error) {
        this.ctx = this.canvas.getContext("2d");
      }
    }

    resolvePageFont() {
      const html = window.getComputedStyle(document.documentElement);
      const body = document.body ? window.getComputedStyle(document.body) : null;
      const htmlSize = parseFloat(html.fontSize);
      const bodySize = body ? parseFloat(body.fontSize) : NaN;
      this.pageFontSize = Number.isFinite(bodySize) && bodySize > 0 ? bodySize : Number.isFinite(htmlSize) && htmlSize > 0 ? htmlSize : 16;
      this.pageFontFamily = body && body.fontFamily ? body.fontFamily : html.fontFamily || "monospace";
      this.fontFamilyCache = this.options.fontFamily || this.pageFontFamily || "monospace";
    }

    resizeNow() {
      if (!this.canvas || !this.ctx) return;
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, Math.max(1, toNumber(this.options.dprMax, 1.2))));
      this.dpr = dpr;
      this.width = window.innerWidth || document.documentElement.clientWidth || 1;
      this.height = window.innerHeight || document.documentElement.clientHeight || 1;
      this.canvas.width = Math.max(1, Math.floor(this.width * dpr));
      this.canvas.height = Math.max(1, Math.floor(this.height * dpr));
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.resolvePageFont();
      this.trimAll();
    }

    handleResize() {
      window.clearTimeout(this.resizeTimer);
      this.resizeTimer = window.setTimeout(() => {
        if (this.disposed) return;
        this.options = runtimeConfig(this.options);
        this.resizeNow();
      }, Math.max(0, toNumber(this.options.resizeDebounceMs, 120)));
    }

    handleVisibilityChange() {
      if (!this.options.pauseWhenHidden) return;
      if (document.hidden) {
        if (this.rafId) window.cancelAnimationFrame(this.rafId);
        this.rafId = 0;
        this.lastTime = 0;
        return;
      }
      if (this.running && !this.rafId) this.rafId = window.requestAnimationFrame(this.loop);
    }

    fontSize() {
      const size = Number(this.options.fontSize);
      return Number.isFinite(size) && size > 0 ? size : this.pageFontSize;
    }

    green() {
      return this.options.color || this.options.greenColor || "#23ef23";
    }

    speedMultiplier() {
      return Math.max(0.01, toNumber(this.options.speedMultiplier, 1));
    }

    maxDrops() {
      return Math.max(1, toNumber(this.options.maxDrops, 4));
    }

    maxParticles() {
      return Math.max(1, toNumber(this.options.maxParticles, 120));
    }

    maxChompers() {
      return Math.max(0, toNumber((this.options.chomper || {}).maxChompers, 3));
    }

    trimAll() {
      this.trim(this.drops, this.maxDrops());
      this.trim(this.particles, this.maxParticles());
      this.trim(this.chompers, this.maxChompers());
    }

    trim(list, max) {
      const overflow = list.length - max;
      if (overflow > 0) list.splice(0, overflow);
    }

    randomChar() {
      return this.candidates[Math.floor(Math.random() * this.candidates.length)] || "0";
    }

    createDrop() {
      const size = this.fontSize();
      return {
        x: this.rand(size, Math.max(size, this.width - size)),
        y: -size,
        size: size,
        speed: this.rand(this.options.minSpeed, this.options.maxSpeed) * this.speedMultiplier(),
        char: this.randomChar(),
        changeIn: this.rand(0.04, 0.12),
        angle: this.rand(-0.1, 0.1),
        rotation: this.rand(-0.08, 0.08),
        explodeY: this.rand(this.height * this.options.minExplodeHeightRatio, this.height * this.options.maxExplodeHeightRatio)
      };
    }

    spawnDrop() {
      this.drops.push(this.createDrop());
      this.trim(this.drops, this.maxDrops());
    }

    burstCount() {
      const weights = Array.isArray(this.options.burstCountWeights) ? this.options.burstCountWeights : DEFAULT_CONFIG.burstCountWeights;
      const roll = Math.random();
      let total = 0;
      for (let i = 0; i < 4; i += 1) {
        total += Number(weights[i]) || 0;
        if (roll < total) return i + 1;
      }
      return 4;
    }

    burstColors(count) {
      const colors = this.shuffled([this.options.errorColor, this.options.yellowColor, this.options.whiteColor]);
      return [this.green()].concat(colors.slice(0, Math.max(0, count - 1)));
    }

    explode(x, y, baseSize) {
      const count = this.burstCount();
      const colors = this.burstColors(count);
      const fixedDelay = Math.max(0, toNumber(this.options.multiBurstDelaySeconds, 0.5));

      for (let i = 0; i < count; i += 1) {
        this.pendingBursts.push({
          x: x,
          y: y,
          baseSize: baseSize,
          burstIndex: i,
          color: colors[i],
          delay: i * fixedDelay
        });
      }
    }

    updatePendingBursts(dt) {
      let write = 0;
      for (let i = 0; i < this.pendingBursts.length; i += 1) {
        const burst = this.pendingBursts[i];
        burst.delay -= dt;
        if (burst.delay <= 0) this.explodeOnce(burst);
        else this.pendingBursts[write++] = burst;
      }
      this.pendingBursts.length = write;
    }

    explodeOnce(burst) {
      const baseCount = this.randInt(this.options.minExplodeLetters, this.options.maxExplodeLetters);
      const count = Math.max(1, baseCount + burst.burstIndex * this.options.multiBurstLetterStep);
      const pattern = this.pick(["ring", "cone", "burst", "cross"]);
      const baseAngle = this.rand(0, Math.PI * 2);

      if (burst.burstIndex === 0) this.maybeSpawnChomper(burst.x, burst.y, burst.baseSize);

      for (let i = 0; i < count; i += 1) {
        const motion = this.particleMotion(pattern, i, count, baseAngle);
        const life = this.rand(this.options.minParticleLife, this.options.maxParticleLife);
        const speed = motion.speed * this.speedMultiplier();
        this.particles.push({
          x: burst.x,
          y: burst.y,
          px: burst.x,
          py: burst.y,
          vx: Math.cos(motion.angle) * speed,
          vy: Math.sin(motion.angle) * speed,
          size: burst.baseSize,
          color: burst.color,
          char: this.randomChar(),
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
      this.trim(this.particles, this.maxParticles());
    }

    particleMotion(pattern, index, count, baseAngle) {
      if (pattern === "ring") return { angle: baseAngle + (Math.PI * 2 * index) / count + this.rand(-0.18, 0.18), speed: this.rand(380, 760) };
      if (pattern === "cone") return { angle: baseAngle + this.rand(-0.45, 0.45), speed: this.rand(420, 860) };
      if (pattern === "cross") {
        const set = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
        return { angle: set[index % 4] + this.rand(-0.22, 0.22), speed: this.rand(450, 800) };
      }
      return { angle: this.rand(0, Math.PI * 2), speed: this.rand(this.options.minParticleSpeed, this.options.maxParticleSpeed) };
    }

    debrisSymbol() {
      const symbols = Array.from((this.options.chomper || {}).debrisSymbols || ";·,.");
      return this.pick(symbols) || ".";
    }

    maybeSpawnChomper(x, y, baseSize) {
      const cfg = this.options.chomper || {};
      if (!cfg.enabled || Math.random() >= toNumber(cfg.chance, 0.4) || this.maxChompers() <= 0) return;
      if (this.chompers.length >= this.maxChompers()) this.chompers.shift();

      const base = Math.max(8, baseSize || this.fontSize());
      const padding = Math.max(12, toNumber(cfg.padding, 36));
      const debrisCount = this.randInt(Math.max(1, toNumber(cfg.debrisMin, 1)), Math.max(1, toNumber(cfg.debrisMax, 4)));
      const rowY = clamp(y, padding, this.height - padding);
      const centerX = clamp(x, padding, this.width - padding);
      const debris = [];
      const gap = base * toNumber(cfg.debrisGapRatio, 1.05);
      const spaceW = base * toNumber(cfg.debrisSpaceWidthRatio, 0.55);
      let total = 0;
      const offsets = [0];

      for (let i = 1; i < debrisCount; i += 1) {
        total += gap + this.randInt(toNumber(cfg.debrisSpaceMin, 1), toNumber(cfg.debrisSpaceMax, 2)) * spaceW;
        offsets.push(total);
      }

      const firstX = centerX - total / 2;
      for (let i = 0; i < debrisCount; i += 1) {
        debris.push({ x: clamp(firstX + offsets[i], padding, this.width - padding), y: rowY, char: this.debrisSymbol(), alive: true });
      }

      const side = this.pick(["left", "right", "top", "bottom"]);
      const leftX = Math.min.apply(null, debris.map(d => d.x));
      const rightX = Math.max.apply(null, debris.map(d => d.x));
      const sweepFromLeft = side === "left" || (side !== "right" && Math.random() < 0.5);
      const sweepX = sweepFromLeft ? leftX - padding : rightX + padding;
      const endX = sweepFromLeft ? this.width + padding : -padding;
      const dir = sweepFromLeft ? "right" : "left";
      const segments = [];

      if (side === "left") segments.push(this.segment(-padding, rowY, this.width + padding, rowY, "right"));
      else if (side === "right") segments.push(this.segment(this.width + padding, rowY, -padding, rowY, "left"));
      else if (side === "top") {
        segments.push(this.segment(sweepX, -padding, sweepX, rowY, "down"));
        segments.push(this.segment(sweepX, rowY, endX, rowY, dir));
      } else {
        segments.push(this.segment(sweepX, this.height + padding, sweepX, rowY, "up"));
        segments.push(this.segment(sweepX, rowY, endX, rowY, dir));
      }

      this.chompers.push({
        variant: this.pick(Array.isArray(cfg.pacmanVariants) && cfg.pacmanVariants.length ? cfg.pacmanVariants : ["crown", "santaHat", "tuftHair"]),
        x: segments[0].fromX,
        y: segments[0].fromY,
        direction: segments[0].direction,
        size: base * toNumber(cfg.sizeRatio, 1.45),
        debrisSize: base * toNumber(cfg.debrisSizeRatio, 1),
        debris: debris,
        segments: segments,
        segmentIndex: 0,
        segmentDistance: 0,
        biteElapsed: 0,
        mouthOpen: true
      });
    }

    segment(fromX, fromY, toX, toY, direction) {
      const dx = toX - fromX;
      const dy = toY - fromY;
      return { fromX, fromY, toX, toY, direction, length: Math.sqrt(dx * dx + dy * dy) || 1 };
    }

    updateChomper(chomper, dt) {
      const cfg = this.options.chomper || {};
      const segment = chomper.segments[chomper.segmentIndex];
      if (!segment) return false;

      chomper.biteElapsed += dt;
      if (chomper.biteElapsed >= Math.max(0.04, toNumber(cfg.biteInterval, 0.12))) {
        chomper.biteElapsed = 0;
        chomper.mouthOpen = !chomper.mouthOpen;
      }

      chomper.segmentDistance += Math.max(20, toNumber(cfg.speed, 230)) * dt;
      const p = clamp(chomper.segmentDistance / segment.length, 0, 1);
      chomper.x = segment.fromX + (segment.toX - segment.fromX) * p;
      chomper.y = segment.fromY + (segment.toY - segment.fromY) * p;
      chomper.direction = segment.direction;

      const eatRadius = chomper.size * toNumber(cfg.eatRadiusRatio, 0.8);
      chomper.debris.forEach(function (d) {
        if (!d.alive) return;
        const dx = chomper.x - d.x;
        const dy = chomper.y - d.y;
        if (Math.sqrt(dx * dx + dy * dy) <= eatRadius) d.alive = false;
      });

      if (p >= 1) {
        chomper.segmentIndex += 1;
        chomper.segmentDistance = 0;
      }
      return chomper.segmentIndex < chomper.segments.length;
    }

    updateDrop(drop, dt) {
      drop.y += drop.speed * dt;
      drop.angle += drop.rotation * dt * 60;
      drop.changeIn -= dt;
      if (drop.changeIn <= 0) {
        drop.char = this.randomChar();
        drop.changeIn = this.rand(0.04, 0.12);
      }
      if (drop.y >= drop.explodeY || drop.y >= this.height - drop.size * 0.5) {
        this.explode(drop.x, Math.min(drop.y, this.height - drop.size * 0.5), drop.size);
        return false;
      }
      return true;
    }

    updateParticle(particle, dt) {
      particle.px = particle.x;
      particle.py = particle.y;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vx *= Math.pow(particle.drag, dt * 60);
      particle.vy *= Math.pow(particle.drag, dt * 60);
      particle.rotation += particle.spin * dt * 0.05;
      particle.life -= dt;
      particle.alpha = Math.max(0, particle.life / particle.maxLife);
      particle.changeIn -= dt;
      if (particle.changeIn <= 0) {
        particle.char = this.randomChar();
        particle.changeIn = this.rand(0.03, 0.1);
      }
      return particle.life > 0;
    }

    compact(list, updater, dt) {
      let write = 0;
      for (let i = 0; i < list.length; i += 1) {
        if (updater.call(this, list[i], dt)) list[write++] = list[i];
      }
      list.length = write;
    }

    clear() {
      if (this.ctx) this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawDrop(drop) {
      const color = this.green();
      const ctx = this.ctx;
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

    drawParticle(p) {
      const ctx = this.ctx;
      const dx = p.x - p.px;
      const dy = p.y - p.py;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = Math.max(1, p.size * 0.08);
      if (this.options.glow) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = this.options.particleShadowBlur;
      }
      ctx.beginPath();
      ctx.moveTo(p.x - (dx / len) * p.streak, p.y - (dy / len) * p.streak);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.font = "700 " + p.size + "px " + this.fontFamilyCache;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = p.color;
      ctx.fillText(p.char, 0, 0);
      ctx.restore();
    }

    drawChompers() {
      for (let i = 0; i < this.chompers.length; i += 1) this.drawChomperDebris(this.chompers[i]);
      for (let i = 0; i < this.chompers.length; i += 1) this.drawChomper(this.chompers[i]);
    }

    drawChomperDebris(chomper) {
      const cfg = this.options.chomper || {};
      const color = cfg.debrisColor || "#23ef23";
      const ctx = this.ctx;
      ctx.save();
      ctx.font = "700 " + chomper.debrisSize + "px " + (cfg.debrisFontFamily || this.fontFamilyCache);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = color;
      if (this.options.glow) {
        ctx.shadowColor = color;
        ctx.shadowBlur = this.options.particleShadowBlur;
      }
      chomper.debris.forEach(function (d) {
        if (d.alive) ctx.fillText(d.char, d.x, d.y);
      });
      ctx.restore();
    }

    preparePacmanSprites() {
      const variants = ["crown", "santaHat", "tuftHair"];
      const states = ["open", "closed"];
      const sprites = {};

      for (let i = 0; i < variants.length; i += 1) {
        const variant = variants[i];
        sprites[variant] = {};
        for (let j = 0; j < states.length; j += 1) {
          const mouthState = states[j];
          const image = new Image();
          image.decoding = "async";
          image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(this.buildPacmanSvg(variant, mouthState));
          sprites[variant][mouthState] = image;
        }
      }

      this.pacmanSprites = sprites;
    }

    getPacmanSprite(variant, mouthState) {
      const safeVariant = this.pacmanSprites[variant] ? variant : "crown";
      const safeState = mouthState === "closed" ? "closed" : "open";
      return this.pacmanSprites[safeVariant] && this.pacmanSprites[safeVariant][safeState];
    }

    buildPacmanSvg(variant, mouthState) {
      const cfg = this.options.chomper || {};
      const svg = cfg.pacmanSvg || {};
      const bodyColor = this.escapeSvg(cfg.pacmanColor || "#23ef23");
      const eyeColor = this.escapeSvg(svg.eyeColor || "#111111");
      const mouthPath = mouthState === "closed"
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
      const cfg = this.options.chomper || {};
      const svg = cfg.pacmanSvg || {};

      if (variant === "santaHat") {
        const red = this.escapeSvg(svg.santaRedColor || "#e81d1d");
        const white = this.escapeSvg(svg.santaWhiteColor || "#f0e8e8");
        const stroke = this.escapeSvg(svg.santaStrokeColor || "#111111");
        return `<path d="M29 39 C42 17 66 8 96 24 C78 27 61 35 43 47 Z" fill="${red}" stroke="${stroke}" stroke-width="2" stroke-linejoin="round"/>
  <path d="M32 40 C49 31 70 25 91 25" fill="none" stroke="${white}" stroke-width="9" stroke-linecap="round"/>
  <circle cx="98" cy="24" r="8" fill="${white}" stroke="${stroke}" stroke-width="1.5"/>`;
      }

      if (variant === "tuftHair") {
        const hair = this.escapeSvg(svg.hairColor || "#111111");
        return `<path d="M43 33 C36 19 45 13 47 5" fill="none" stroke="${hair}" stroke-width="5" stroke-linecap="round"/>
  <path d="M56 30 C52 15 61 10 61 2" fill="none" stroke="${hair}" stroke-width="5" stroke-linecap="round"/>
  <path d="M69 32 C72 17 82 14 85 6" fill="none" stroke="${hair}" stroke-width="5" stroke-linecap="round"/>`;
      }

      const crown = this.escapeSvg(svg.crownColor || "#f8ca00");
      const stroke = this.escapeSvg(svg.crownStrokeColor || "#111111");
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

    drawChomper(chomper) {
      const cfg = this.options.chomper || {};
      const ctx = this.ctx;
      const color = cfg.pacmanColor || "#23ef23";
      const angle = this.directionAngle(chomper.direction);
      const mouthState = chomper.mouthOpen ? "open" : "closed";
      const sprite = this.getPacmanSprite(chomper.variant, mouthState);
      const size = chomper.size;

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
        this.drawFallbackChomper(chomper, color);
      }

      ctx.restore();
    }

    drawFallbackChomper(chomper, color) {
      const ctx = this.ctx;
      const radius = chomper.size * 0.42;
      const mouth = chomper.mouthOpen ? Math.PI * 0.28 : Math.PI * 0.04;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, mouth, Math.PI * 2 - mouth, false);
      ctx.closePath();
      ctx.fill();
      this.drawChomperEye(radius);
    }

    directionAngle(direction) {
      if (direction === "left") return Math.PI;
      if (direction === "up") return -Math.PI / 2;
      if (direction === "down") return Math.PI / 2;
      return 0;
    }

    updateSpawning(dt) {
      if (!this.startedSpawning) {
        this.delayRemaining -= dt;
        if (this.delayRemaining <= 0) {
          this.startedSpawning = true;
          this.spawnElapsed = 0;
          if (this.options.immediateStart) this.spawnDrop();
        }
        return;
      }
      this.spawnElapsed += dt;
      const interval = Math.max(0.05, toNumber(this.options.intervalSeconds, 5));
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
      if (!this.lastTime) this.lastTime = timestamp;
      const dt = Math.min(toNumber(this.options.maxFrameDelta, 0.033), (timestamp - this.lastTime) / 1000);
      this.lastTime = timestamp;

      this.clear();
      this.updateSpawning(dt);
      this.updatePendingBursts(dt);
      this.compact(this.drops, this.updateDrop, dt);
      this.compact(this.particles, this.updateParticle, dt);
      this.compact(this.chompers, this.updateChomper, dt);

      for (let i = 0; i < this.drops.length; i += 1) this.drawDrop(this.drops[i]);
      for (let i = 0; i < this.particles.length; i += 1) this.drawParticle(this.particles[i]);
      this.drawChompers();
      this.rafId = window.requestAnimationFrame(this.loop);
    }

    start() {
      if (this.running || this.disposed) return;
      this.running = true;
      this.lastTime = 0;
      this.spawnElapsed = 0;
      this.delayRemaining = Math.max(0, toNumber(this.options.startDelaySeconds, 0));
      this.startedSpawning = this.delayRemaining <= 0;
      if (this.startedSpawning && this.options.immediateStart) this.spawnDrop();
      this.rafId = window.requestAnimationFrame(this.loop);
    }

    destroy() {
      this.running = false;
      this.disposed = true;
      if (this.rafId) window.cancelAnimationFrame(this.rafId);
      window.clearTimeout(this.resizeTimer);
      window.removeEventListener("resize", this.handleResize);
      document.removeEventListener("visibilitychange", this.handleVisibilityChange);
      if (this.canvas && this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
      this.canvas = null;
      this.ctx = null;
      this.drops = [];
      this.particles = [];
      this.pendingBursts = [];
      this.chompers = [];
    }

    updateConfig(nextConfig) {
      if (this.disposed) return this.getConfig();
      this.options = runtimeConfig(mergeNested(this.options, nextConfig || {}));
      if (Object.prototype.hasOwnProperty.call(nextConfig || {}, "candidates")) this.candidates = this.normalizeCandidates(this.options.candidates);
      if (Object.prototype.hasOwnProperty.call(nextConfig || {}, "chomper") && this.options.chomper && this.options.chomper.enabled) {
        this.preparePacmanSprites();
      }
      this.resizeNow();
      this.trimAll();
      return this.getConfig();
    }

    getConfig() {
      return mergeNested({}, this.options);
    }
  }

  function active() {
    return Boolean(instance || waitTimer);
  }

  function destroyInstance() {
    if (instance) instance.destroy();
    instance = null;
  }

  function startNow(config) {
    if (instance) return instance;
    manuallyStopped = false;
    clearWaitTimer();
    activeConfig = mergeNested(activeConfig, config || {});
    if (shouldReduceMotion(activeConfig)) {
      destroyInstance();
      return null;
    }
    instance = new MatrixLetterRainEffect(activeConfig);
    instance.start();
    return instance;
  }

  function splashGone() {
    return !document.getElementById(activeConfig.splashFaceLayerId) && !document.getElementById(activeConfig.splashFlashLayerId);
  }

  function waitThenStart(config) {
    if (active()) return instance;
    manuallyStopped = false;
    clearWaitTimer();
    activeConfig = mergeNested(activeConfig, config || {});
    if (shouldReduceMotion(activeConfig)) return null;

    const startedAt = Date.now();
    const timeout = Math.max(0, toNumber(activeConfig.splashWaitTimeoutMs, 6000));
    const poll = Math.max(16, toNumber(activeConfig.splashPollMs, 80));

    function check() {
      if (manuallyStopped) return;
      if (splashGone() || Date.now() - startedAt >= timeout) {
        waitTimer = 0;
        startNow();
        return;
      }
      waitTimer = window.setTimeout(check, poll);
    }

    check();
    return null;
  }

  function start(config) {
    if (active()) return instance;
    activeConfig = mergeNested(activeConfig, config || {});
    return activeConfig.waitForSplash ? waitThenStart() : startNow();
  }

  function stopNow() {
    manuallyStopped = true;
    clearWaitTimer();
    destroyInstance();
    return null;
  }

  function toggle(force, config) {
    if (config && typeof config === "object") activeConfig = mergeNested(activeConfig, config);
    const shouldStart = typeof force === "boolean" ? force : !active();
    if (shouldStart && active()) return instance;
    if (!shouldStart && !active()) return null;
    return shouldStart ? start() : stopNow();
  }

  function updateConfig(config) {
    activeConfig = mergeNested(activeConfig, config || {});
    if (instance) instance.updateConfig(activeConfig);
    return getConfig();
  }

  function getConfig() {
    return mergeNested({}, activeConfig);
  }

  window.MatrixLetterRain = {
    start: start,
    toggle: toggle,
    updateConfig: updateConfig,
    getConfig: getConfig
  };

  function boot() {
    if (activeConfig.autoStart) start();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})(window, document);
