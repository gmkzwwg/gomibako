(() => {
  if (window.MatrixLetterRain) return;

  class MatrixLetterRainEffect {
    constructor(options = {}) {
      this.options = {
        intervalSeconds: 5,
        startDelaySeconds: 0,
        candidates: ['0', '1', 'A', 'B', 'C', 'D', 'E', 'F'],
        color: '#74ff7a',
        fontFamily: null,
        fontSize: null,
        zIndex: 999999,
        minSpeed: 220,
        maxSpeed: 420,
        minExplodeLetters: 6,
        maxExplodeLetters: 10,
        minExplodeHeightRatio: 0.22,
        maxExplodeHeightRatio: 0.82,
        immediateStart: true,
        glow: true,
        speedMultiplier: 1,
        ...options
      };

      this.candidates = this.normalizeCandidates(this.options.candidates);
      this.drops = [];
      this.particles = [];
      this.running = false;
      this.lastTime = 0;
      this.spawnTimer = 0;
      this.delayRemaining = Math.max(0, Number(this.options.startDelaySeconds) || 0);
      this.startedSpawning = false;

      this.pageFontSize = this.resolvePageFontSize();
      this.pageFontFamily = this.resolvePageFontFamily();

      this.createCanvas();
      this.handleResize = this.handleResize.bind(this);
      this.loop = this.loop.bind(this);

      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }

    normalizeCandidates(candidates) {
      if (Array.isArray(candidates)) {
        return candidates.map(v => String(v)).filter(Boolean);
      }
      if (typeof candidates === 'string') {
        return [...candidates].filter(Boolean);
      }
      return ['0', '1'];
    }

    randomFromCandidates() {
      return this.candidates[Math.floor(Math.random() * this.candidates.length)];
    }

    rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    randInt(min, max) {
      return Math.floor(this.rand(min, max + 1));
    }

    getSpeedMultiplier() {
      const n = Number(this.options.speedMultiplier);
      return Number.isFinite(n) && n > 0 ? n : 1;
    }

    resolvePageFontSize() {
      const bodyStyle = document.body ? getComputedStyle(document.body) : null;
      const htmlStyle = getComputedStyle(document.documentElement);

      const bodySize = bodyStyle ? parseFloat(bodyStyle.fontSize) : NaN;
      const htmlSize = parseFloat(htmlStyle.fontSize);

      if (Number.isFinite(bodySize) && bodySize > 0) return bodySize;
      if (Number.isFinite(htmlSize) && htmlSize > 0) return htmlSize;
      return 16;
    }

    resolvePageFontFamily() {
      const bodyStyle = document.body ? getComputedStyle(document.body) : null;
      const htmlStyle = getComputedStyle(document.documentElement);

      const bodyFamily = bodyStyle?.fontFamily?.trim();
      const htmlFamily = htmlStyle?.fontFamily?.trim();

      if (bodyFamily) return bodyFamily;
      if (htmlFamily) return htmlFamily;
      return 'monospace';
    }

    getFontSize() {
      const custom = Number(this.options.fontSize);
      if (Number.isFinite(custom) && custom > 0) return custom;
      return this.pageFontSize;
    }

    getFontFamily() {
      return this.options.fontFamily || this.pageFontFamily || 'monospace';
    }

    createCanvas() {
      this.canvas = document.createElement('canvas');
      this.canvas.setAttribute('aria-hidden', 'true');

      Object.assign(this.canvas.style, {
        position: 'fixed',
        inset: '0',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: String(this.options.zIndex)
      });

      document.documentElement.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');
    }

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

    createDrop() {
      const size = this.getFontSize();
      const speedMul = this.getSpeedMultiplier();
      const x = this.rand(size, this.width - size);
      const speed = this.rand(this.options.minSpeed, this.options.maxSpeed) * speedMul;
      const explodeY = this.rand(
        this.height * this.options.minExplodeHeightRatio,
        this.height * this.options.maxExplodeHeightRatio
      );

      return {
        x,
        y: -size,
        size,
        speed,
        char: this.randomFromCandidates(),
        changeIn: this.rand(0.04, 0.12),
        rotation: this.rand(-0.08, 0.08),
        angle: this.rand(-0.1, 0.1),
        explodeY
      };
    }

    spawnDrop() {
      this.drops.push(this.createDrop());
    }

    explode(x, y, baseSize) {
      const count = this.randInt(
        this.options.minExplodeLetters,
        this.options.maxExplodeLetters
      );

      const patterns = ['ring', 'cone', 'burst', 'cross'];
      const pattern = patterns[this.randInt(0, patterns.length - 1)];
      const baseAngle = this.rand(0, Math.PI * 2);
      const speedMul = this.getSpeedMultiplier();

      for (let i = 0; i < count; i++) {
        let angle;
        let speed;

        if (pattern === 'ring') {
          angle = baseAngle + (Math.PI * 2 * i) / count + this.rand(-0.18, 0.18);
          speed = this.rand(380, 760);
        } else if (pattern === 'cone') {
          angle = baseAngle + this.rand(-0.45, 0.45);
          speed = this.rand(420, 860);
        } else if (pattern === 'cross') {
          const baseSet = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
          angle = baseSet[i % 4] + this.rand(-0.22, 0.22);
          speed = this.rand(450, 800);
        } else {
          angle = this.rand(0, Math.PI * 2);
          speed = this.rand(360, 900);
        }

        speed *= speedMul;

        const life = this.rand(0.45, 0.9);
        const size = baseSize;

        this.particles.push({
          x,
          y,
          px: x,
          py: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
          char: this.randomFromCandidates(),
          alpha: 1,
          life,
          maxLife: life,
          drag: this.rand(0.92, 0.975),
          spin: this.rand(-7, 7),
          rotation: this.rand(0, Math.PI * 2),
          changeIn: this.rand(0.03, 0.1),
          streak: this.rand(10, 26)
        });
      }
    }

    updateDrop(drop, dt) {
      drop.y += drop.speed * dt;
      drop.angle += drop.rotation * dt * 60;
      drop.changeIn -= dt;

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

    updateParticle(p, dt) {
      p.px = p.x;
      p.py = p.y;

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      p.vx *= Math.pow(p.drag, dt * 60);
      p.vy *= Math.pow(p.drag, dt * 60);

      p.rotation += p.spin * dt * 0.05;
      p.life -= dt;
      p.alpha = Math.max(0, p.life / p.maxLife);

      p.changeIn -= dt;
      if (p.changeIn <= 0) {
        p.char = this.randomFromCandidates();
        p.changeIn = this.rand(0.03, 0.1);
      }

      return p.life > 0;
    }

    drawDrop(drop) {
      const ctx = this.ctx;

      ctx.save();
      ctx.translate(drop.x, drop.y);
      ctx.rotate(drop.angle);
      ctx.font = `700 ${drop.size}px ${this.getFontFamily()}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = this.options.color;

      if (this.options.glow) {
        ctx.shadowColor = this.options.color;
        ctx.shadowBlur = 12;
      }

      ctx.fillText(drop.char, 0, 0);
      ctx.restore();
    }

    drawParticle(p) {
      const ctx = this.ctx;

      ctx.save();
      ctx.globalAlpha = p.alpha;

      const dx = p.x - p.px;
      const dy = p.y - p.py;
      const len = Math.hypot(dx, dy) || 1;
      const tx = p.x - (dx / len) * p.streak;
      const ty = p.y - (dy / len) * p.streak;

      ctx.strokeStyle = this.options.color;
      ctx.lineWidth = Math.max(1, p.size * 0.08);

      if (this.options.glow) {
        ctx.shadowColor = this.options.color;
        ctx.shadowBlur = 10;
      }

      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();

      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.font = `700 ${p.size}px ${this.getFontFamily()}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = this.options.color;
      ctx.fillText(p.char, 0, 0);

      ctx.restore();
    }

    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }

    loop(ts) {
      if (!this.running) return;

      if (!this.lastTime) this.lastTime = ts;
      const dt = Math.min(0.033, (ts - this.lastTime) / 1000);
      this.lastTime = ts;

      this.clear();

      if (!this.startedSpawning) {
        this.delayRemaining -= dt;
        if (this.delayRemaining <= 0) {
          this.startedSpawning = true;
          this.spawnTimer = 0;

          if (this.options.immediateStart) {
            this.spawnDrop();
          }
        }
      } else {
        this.spawnTimer += dt;
        const interval = Math.max(0.05, Number(this.options.intervalSeconds) || 5);

        if (this.spawnTimer >= interval) {
          this.spawnTimer -= interval;
          this.spawnDrop();
        }
      }

      this.drops = this.drops.filter(drop => this.updateDrop(drop, dt));
      this.particles = this.particles.filter(p => this.updateParticle(p, dt));

      for (const drop of this.drops) this.drawDrop(drop);
      for (const p of this.particles) this.drawParticle(p);

      requestAnimationFrame(this.loop);
    }

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

      requestAnimationFrame(this.loop);
    }

    stop() {
      this.running = false;
    }

    destroy() {
      this.stop();
      window.removeEventListener('resize', this.handleResize);
      this.canvas?.remove();
      this.drops = [];
      this.particles = [];
    }

    updateOptions(nextOptions = {}) {
      this.options = { ...this.options, ...nextOptions };

      if (nextOptions.candidates) {
        this.candidates = this.normalizeCandidates(nextOptions.candidates);
      }

      this.pageFontSize = this.resolvePageFontSize();
      this.pageFontFamily = this.resolvePageFontFamily();

      if ('startDelaySeconds' in nextOptions && !this.startedSpawning) {
        this.delayRemaining = Math.max(0, Number(this.options.startDelaySeconds) || 0);
      }
    }
  }

  window.MatrixLetterRain = {
    instance: null,

    start(options = {}) {
      if (this.instance) {
        this.instance.destroy();
      }
      this.instance = new MatrixLetterRainEffect(options);
      this.instance.start();
      return this.instance;
    },

    stop() {
      this.instance?.stop();
    },

    destroy() {
      this.instance?.destroy();
      this.instance = null;
    },

    update(options = {}) {
      if (!this.instance) return;
      this.instance.updateOptions(options);
    }
  };
})();