/*!
 * hacked-splash.js
 *
 * Introduction:
 *   Draws one canvas-based ASCII splash and a lightweight floating-word overlay.
 *
 * Usage:
 *   Keep the critical HTML minimal. The layer may contain temporary fallback text;
 *   this script does not rely on that text and removes it only after the first
 *   canvas frame has been drawn successfully.
 *
 * Global API:
 *   window.HackedSplash.start(config?)
 *   window.HackedSplash.stop()
 *   window.HackedSplash.destroy()
 *   window.HackedSplash.updateConfig(config)
 *   window.HackedSplash.getConfig()
 *
 * Notes:
 *   No <pre>, no CSS animation, no CSS transition, no animationend/transitionend.
 *   Cleanup is controlled by one lifecycle function and JavaScript timers only.
 */

(function (window, document) {
  "use strict";

  if (!window || !document) return;

  const FACE_LIBRARY = [
    [
      "                                                                                ",
      "                -:-                           :-:                           -:- ",
      "                :::                     ..    :::                           ::: ",
      "                                    .---+=--:                                   ",
      "                                  :-==++++=+::::.                               ",
      "                                .=++***+++++-:...                               ",
      "                               :=+*##+***+#*+-::                                ",
      "                              :+*+***++==+**=-::....                            ",
      "                              =+***+++++=+**+-::.-::                            ",
      " :=:                         =*@@@#**++*#+++*=::-:           :=:                ",
      " -::            .            %#@@%**#%#%%%%%@#*=:.  .        -::            .   ",
      "                            *=*@@@@%+**+*+++*++%#-.                             ",
      "                           +*%%@#%#**%#++++=+*+***+                             ",
      "                          .#@######+-.         :++*+                            ",
      "                          #@**+#=            .. .=+*-                           ",
      "                         -#**-              .::-. -*+:                          ",
      "                         =*:       .=:-....::   .  =+:                          ",
      "   .            --:      :+..    -      -.    -#+   +-.        .            --: ",
      "               .::-  -++***+-  .  -:   -#+. .=#+:   =:     ...             .::- ",
      "                  .=**#**#+#=-:.   -++=-**=*++-     :.     :::.                 ",
      "                 =###***+*##%=-     .++*=====:      +        .:::.              ",
      "                :*%#**=*=-=+=**-      +*++-+      .*:         :--:              ",
      "               .=*#*=++*+=-*-=.--:.            ::=:          .--:::             ",
      "              :+*###+++#+**#+=+=:-:  .      -=-:            . :..:::.           ",
      "              :=-++----+----=-+++*.       -.   :             :=  :-:.           ",
      "             .++=+*= .-+==+%+=+**# .... -:     +-       .    .:---::::        . ",
      " -:-.       :**=++=-  .--::-:-**#@.. ...-:    .%  . ..:..    *+*+-.::-          ",
      "           :=*+==-=-  .-:.:-:-==++ :.::.:=:-=--#   .:...     :=---:::-.         ",
      "          .==**+=--:   ..::-:-==++ :::::-+:==:-*  ..::=-:    .==--:::-:.        ",
      "         =++-=+==:-.   ..--=----== :::::-*--=:-#    .:  .   .--+=-:::=-.        ",
      "         -.=+++*=..      ::=.:=-+= -: .--*:-=::#.   .-.      :==--:::=-         ",
      "        :=+===*#=..      ::-.:===-:==-:--*--=::#.     .. .:..:--::::  -.        ",
      "       -::-:..:-:.       .:::%@@@@%@+: .:*--=:-#  ...-:       :-: .-=--::       ",
      "     .=+:-==**--::        .*@@@@+*@@: . -%:.: :#.   ..         -. . .::::.      ",
      "     ==+-*#*#%@@@%@##@@% =@@@@@+@@*%*:  -##..+@@@@#-.:    -==:-.:***+=-=-  .::- ",
      "     -++##***#%#@**%#%=+@@@@@*%@@= .=-. .-:@+:=@%*%%=#+=%%%#+=-++++*==+-:   ::  ",
      "     .=++*+*+--:-+**#*=@@@=.=#%-         :*= =+..#-=#:. :=++#-:..:. :::-.       ",
      "      .-++==-:::-++=+=.-=.  :---==++*%#%%%+ -+ .#.-+        ==    ..            ",
      "                 ..  ..    - .:..       :+     =  :         =.                  ",
      "                                                                                ",
      "                                                                                ",
      "                   .                                                           .",
      " -:-                          .:::                           -:-                ",
      "-++=-::::::::::---::::::::::::-++=-::::::::::--:::::::::::::-++=-::::::::::--:::",
      "#######%@####################################################%%%%%%%%%%%%%#%####",
      "#%%%%%%%%%%%%%##################################################################"
    ],
    [
      "                                 :+##########*-                                 ",
      "                            =#%%%%%%%%%%%%%%%%%%%%%*                            ",
      "                         *%%%%%%%%%%%%%%%%%%%%%%%%%%%%#                         ",
      "                      =%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#                       ",
      "                   :#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+                     ",
      "                  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#                    ",
      "                -%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                   ",
      "               =%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#                  ",
      "              .%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                 ",
      "              %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#                ",
      "             -%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=               ",
      "             #%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#               ",
      "            .%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%:              ",
      "            =%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*              ",
      "            +%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%              ",
      "            =%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%              ",
      "             %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%              ",
      "             #%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%              ",
      "             :%%%%%# #%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#*%%%:              ",
      "              %%%%#  #%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -%%#               ",
      "              :%%- .#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+ %%+               ",
      "               :+#%%%%%%+:. :+%%%%%%%%%%%%%%%%#-.      :+%%%%#==                ",
      "              %%%%%%%=           #%%%%%%%%%%#             .%%%%%#               ",
      "              %%%%%*              +%%%%%%%%%                %%%%*               ",
      "              -%%%+                %%%%%%%%#                *%%%=               ",
      "               %%%:                %%%%%%%%#                +%%%*               ",
      "               #%%+              =%%%%%%%%%%%*              #%%%%               ",
      "               %%%%*         .+%%%%%%%##%%%%%%%%+        :*%%%%%#               ",
      "              =%%%%%%*=--=*%%%%%%%%%%-.+ %%%%%%%%%%%%%%%%%%%%%%#                ",
      "              :%%%%%%%%%%%%%%%%%%%%%# :+ =%%%%%%%%%%%%%%%%%%%%*                 ",
      "               +%%%%%%%%%%%%%%%%%%%%  =#  #%%%%%%%%%%%%%%%%%%#                  ",
      "                 =#%%%%%%%%%%%%%%%%#  %%  =%%%%%%%%%%%%%%%%%%*                  ",
      "        +%*                =%%%%%%%%+:%%+-%%%%%%%%%+-+%%%%%%*       :##*%%*    ",
      "      %%%%%-               *%%%%%%%%%%%%%%%%%%%%%%%                #%%%%%%%     ",
      "     +%%%%%%+              %%%%%%%%%%%%%%%%%%%%%%%%:              +%%%%%%%%     ",
      "   #%%%%%%%%%%%#-          *%%%%%%%%%%%%%%%%%%%%%%%:           :*%%%%%%%%%%%%-  ",
      "   %%%%%%%%%%%%%%%%#=       -%%%%%%%%%%%%%%%%%#%*        :*%%%%%%%%%%%%%%%%%%#  ",
      "   %%%%%%%%%%%%%%%%%%%%%=      *%*=%%%*#%%#=%#       =%%%%%%%%%%%%%%%%%%%%%%%=  ",
      "   =#%%%%%%%%%%%%%%%%%%%%%%%+.                   +%%%%%%%%%%%%%#*+=:.           ",
      "               .=*#%%%%%%%%%%%%%*.          -#%%%%%%%%%#+-                      ",
      "                      =*%%%%%%%%%%%%#=.=#%%%%%%%%%%+.                           ",
      "                           =#%%%%%%%%%%%%%%%%%%+.                               ",
      "                           .*%%%%%%%%%%%%%%%%%%*-                                ",
      "                     .+%%%%%%%%%%%%%%#%%%%%%%%%%%%%%%%#=.                       ",
      "   .            =#%%%%%%%%%%%%%#+:       =*%%%%%%%%%%%%%%%%%%%+:          -     ",
      ":%%%%%+   :*%%%%%%%%%%%%%%#+.                 =*%%%%%%%%%%%%%%%%%%%%%%#%%%%%#.  ",
      "%%%%%%%%%%%%%%%%%%%%%#+                            +#%%%%%%%%%%%%%%%%%%%%%%%%*  ",
      "=%%%%%%%%%%%%%%%#=                                      =*#%%%%%%%%%%%%%%%%%%   ",
      "  #%%%%%%%%%%%                                                :*#%%%%%%%%%%%%=  ",
      "  #%%%%%%%%%#                                                      =#%%%%%%%%%%=",
      "  #%%%%%%%#.                                                          :#%%%%%%%#",
      "   *#%%%#:                                                               :#%%%# ",
      "                                                                                "
    ],
    [
      "             . :                                                  .             ",
      "            :  :                                                :  .            ",
      "           .   :                                                :  :            ",
      "           .                                                    .   .           ",
      "           .  .                                                 .   -           ",
      "          :   .:                                                :   ::          ",
      "          -    :                                                .   :=          ",
      "          -.   :                 .           :                  .   -=          ",
      "         .++:  :-                =:          -=                =. .-+*          ",
      "          +-    .                *=          =+                ..  :++:         ",
      "          ==    :=              .+-          ++:              -.  .:++          ",
      "          +*++-  ...           =+*:    -     :++.           :...:+++*+          ",
      "           ++===:-=-          .:.-            :.-.         .:: .-=+**.          ",
      "           +++++++=:.-         .-             ::. .       :  .-=+=+*+           ",
      "           :++===..:+=.          ..:... .:.::.           :.=+.:.-***:           ",
      "            .**+***+= ==:    ...   .-.. .:-:. ...:.    . -===+*****             ",
      "             .+***++==++= .. .....   ::.-:.   ::.::.:.:= :==+=**#*.             ",
      "              +#****+=-.:- ---=::     ..-:    :.-=--=  : ..-*****=              ",
      "              :+**#**#=**--==-.+.     : =-      = ::+.-**=*####*+-              ",
      "                :*##*****=+:.... ...  = :=  ..  .   :==***####*=                ",
      "    :    .       -*#####*##*+    :=     :.   =    -+*##+*#*##*+       :    :    ",
      "    =.      -:----=+**###+..:+:. -     :=     =.:-+-.:*###**+:==+===:      =    ",
      "    :=       :-=*+.:-*##*=+- .==-:  :  .=  =  =-++. =**###=-..**++-       =:    ",
      "     +-      .=+=+::-=**+=++: .+*=:   ==+-  .=**+..=*++**+--.:*+*+:      -+:    ",
      "     =+:        ++=+--+++= =+=+:-+: ::+=*+:-:-+==*++*:++*+==+=++  .     :++     ",
      "     .+=         ++- :=-=+=---=+= :.  ==+-: :- +*+==:++:==- -++       . -*:     ",
      "      .+=. .     -#+ .:-.:+=. .++-++=-*=*+-++==++ .-++:.-- .+#=     -::=+-      ",
      "       .*+=:..---+**: ::=. =:+: .+: :.-=+--.:=+: -+-+ .---.=#*+=+++=+++*=       ",
      "        .**++==+*+==:++=: ::   -  ==: :++- -=- -:  .=:.-+*=:*+*********:        ",
      "          :==++*+=-.=#####+ .   ..=. =*+#*: .= :   :.*#####-==*****++-          ",
      "            *+====.:####%%%#+        ==:++-   .   -#%%%%###*-:*+++**            ",
      "             .-:=+ =####%%%%%#=   .-=+*###+-=    #%%%%%%####- #++:              ",
      "                -+ =+.*#%%%%%%%#*****#= .-#*+**##%%%%%%%%*-*-=*-                ",
      "                  :++-#%%%%%%%%%%%###*= .*####%%%%%%%%%%#+=+*..                 ",
      "                 =+=:=-####%#%%%%%##*++=#***##%%%%%#%##%#==-+++                 ",
      "               :-==:.--.*######%#*+***%%%#+**+*#%%%####+.-=:-==-:               ",
      "                -=-:-:  .:-   :+++=+*%%#%%%++++++-  :=-   -=-===                ",
      "                .**++*+=-=+*+- .+*=+#%%#%%%#++#+.:=***+=+**+*#*                 ",
      "                   =**######**=*+***%%%*%%%%****#+*########*-                   ",
      "                   :*#**###*+*=+=+**###=*####**=*+#*#####*#*-                   ",
      "                      ++#%%%*-==:.==:-+*++=:++ .+*-#%%%#+-                      ",
      "                       -*#%%#+-=..=:**+##**+.= -==*%%%%*-                       ",
      "                        *#%%%#++- +=  ++*= .=+ +=##%%%*+                        ",
      "                        .*###= . =++:--=-=+ *++   #%%#*                         ",
      "                         ++*#= . *+  =.==    += :-+#*++                         ",
      "                         +*=*==+.*-    :     =*:++**=++                         ",
      "                        =##+**::-#%##*+#++**#%*::-***##:                        ",
      "                           *-*+   -.=#####** -   +*=+                           ",
      "                            =#+=-==.   = . : +-==*#*                            ",
      "                            +*#**#*#*+++*++##*#**#+:                            ",
      "                            -.++*##############+*=..                            ",
      "                              =*+*############*+*+                              ",
      "                               -*#***#***##**###.                               ",
      "                                %#.:.+**#*-.-.#%                                ",
      "                                .  .*******#:  .                                ",
      "                                   -  *##* ..                                   ",
      "                                       *=                                       ",
      "                                                                                ",
      "                                                                                "
    ]
  ];

  const DEFAULT_CONFIG = {
    autoStart: true,
    injectStyle: true,
    styleId: "hacked-splash-style",
    layerParent: "body",
    removeLayersOnFinish: true,

    face: {
      enabled: true,
      layerId: "hacked-face-layer",
      canvasId: "hacked-splash-canvas",
      duration: 900,
      fadeDuration: 420,
      hardCleanupDelay: 3600,
      dprMax: 1.6,
      mobileDprMax: 1.15,
      canvasPixelMax: 1800000,
      mobileBreakpoint: 800,
      mobileCellScale: 0.7,
      cellMin: 12,
      cellMinMobile: 8,
      cellMax: 25,
      targetGridWidth: 155,
      targetGridHeight: 82,
      minCols: 52,
      minRows: 30,
      dissolveStartRatio: 0.45,
      dissolveEndRatio: 0.92,
      backgroundColor: "#000",
      faceBaseColor: "rgba(245,255,245,",
      faceNoiseColor: "rgba(110,255,150,",
      backgroundNoiseColor: "rgba(30,170,70,",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace"
    },

    flash: {
      enabled: true,
      layerId: "hacked-flash-layer",
      startDelay: 90,
      spawnDuration: 580,
      wordLifeMin: 520,
      wordLifeMax: 1150,
      count: null,
      densityDivisor: 11500,
      minCount: 18,
      maxCount: 120,
      spawnIntervalMin: 36,
      spawnIntervalMax: 72,
      batchMin: 2,
      batchMax: 5,
      mobileBreakpoint: 800,
      mobileScale: 0.72,
      largeChance: 0.05,
      mediumChance: 0.22,
      smallRatioMin: 0.01,
      smallRatioMax: 0.03,
      mediumRatioMin: 0.03,
      mediumRatioMax: 0.04,
      largeRatioMin: 0.06,
      largeRatioMax: 0.08,
      smallClampMin: 14,
      smallClampMax: 22,
      mediumClampMin: 20,
      mediumClampMax: 32,
      largeClampMin: 32,
      largeClampMax: 46,
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
      deriveGlowFromColor: true,
      glowAlpha: 0.98,
      words: [
        { text: "[ALERT] INJECTION DETECTED", color: "#0fca1c" },
        { text: "[CRITICAL] CORE DUMPED", color: "#E71D36" },
        { text: "[WARNING] MEMORY RUPTURED", color: "#f8ca00" },
        { text: "[BREACH] CONTROL LOST", color: "#d2cccc" },
        { text: "[FAULT] SESSION SEIZED", color: "#E71D36" },
        { text: "[SYS] ROOT PERMISSION TAKEN", color: "#0fca1c" }
      ]
    }
  };

  const ASCII_PALETTE = Array.from({ length: 94 }, function (_, index) {
    return String.fromCharCode(index + 33);
  });

  let config = normalizeConfig(merge(merge({}, DEFAULT_CONFIG), window.HackedSplashConfig || window.hackedSplashConfig || {}));

  const state = {
    phase: "idle",
    raf: 0,
    hardTimer: 0,
    fadeTimer: 0,
    resizeTimer: 0,
    flashSpawnTimer: 0,
    flashTimers: [],
    width: 0,
    height: 0,
    layer: null,
    canvas: null,
    ctx: null,
    flashLayer: null,
    dpr: 1,
    cellW: 10,
    cellH: 14,
    cols: 0,
    rows: 0,
    cells: [],
    startedAt: 0,
    lastFrameAt: 0,
    spawnedWords: 0
  };

  if (window.HackedSplash && typeof window.HackedSplash.destroy === "function") {
    try { window.HackedSplash.destroy(); } catch (_) {}
  }

  function merge(base, patch) {
    Object.keys(patch || {}).forEach(function (key) {
      const value = patch[key];
      const previous = base[key];

      if (value && typeof value === "object" && !Array.isArray(value) && previous && typeof previous === "object" && !Array.isArray(previous)) {
        base[key] = merge(merge({}, previous), value);
      } else if (Array.isArray(value)) {
        base[key] = value.slice();
      } else {
        base[key] = value;
      }
    });

    return base;
  }

  function normalizeConfig(input) {
    const next = merge({}, input || {});
    const flash = next.flash || {};
    const alpha = finiteNumber(flash.glowAlpha, 0.98);

    flash.words = (Array.isArray(flash.words) ? flash.words : []).map(function (word) {
      const item = merge({}, word || {});
      item.color = item.color || "#fff";
      item.glow = flash.deriveGlowFromColor || !item.glow ? colorToGlow(item.color, alpha) : item.glow;
      return item;
    });

    next.flash = flash;
    return next;
  }

  function finiteNumber(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function colorToGlow(color, alpha) {
    let value = String(color || "").trim();
    if (value.charAt(0) === "#") value = value.slice(1);
    if (value.length === 3) value = value.split("").map(function (char) { return char + char; }).join("");
    if (!/^[0-9a-fA-F]{6}$/.test(value)) return color || "rgba(255,255,255," + alpha + ")";

    const number = parseInt(value, 16);
    return "rgba(" + ((number >> 16) & 255) + "," + ((number >> 8) & 255) + "," + (number & 255) + "," + alpha + ")";
  }

  function now() {
    return window.performance && typeof window.performance.now === "function" ? window.performance.now() : Date.now();
  }

  function raf(callback) {
    return window.requestAnimationFrame ? window.requestAnimationFrame(callback) : window.setTimeout(function () { callback(now()); }, 16);
  }

  function cancelRaf(id) {
    if (!id) return;
    if (window.cancelAnimationFrame) window.cancelAnimationFrame(id);
    else window.clearTimeout(id);
  }

  function rand(min, max) { return min + Math.random() * (max - min); }
  function randInt(min, max) { return Math.floor(rand(min, max + 1)); }
  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function sample(list) { return list[Math.floor(Math.random() * list.length)]; }
  function randomAscii() { return ASCII_PALETTE[Math.floor(Math.random() * ASCII_PALETTE.length)]; }

  function readViewport() {
    state.width = window.innerWidth || document.documentElement.clientWidth || 1024;
    state.height = window.innerHeight || document.documentElement.clientHeight || 768;
  }

  function parentElement() {
    const parent = config.layerParent;
    if (parent && parent.nodeType === 1) return parent;
    if (typeof parent === "string" && parent !== "body") return document.querySelector(parent) || document.body || document.documentElement;
    return document.body || document.documentElement;
  }

  function byId(id) { return document.getElementById(id); }

  function injectStyle() {
    if (!config.injectStyle) return;

    let style = byId(config.styleId);
    if (!style) {
      style = document.createElement("style");
      style.id = config.styleId;
      document.head.appendChild(style);
    }

    style.textContent = [
      "#" + config.face.layerId + "{position:fixed;inset:0;z-index:999998;display:block;overflow:hidden;pointer-events:none;background:" + config.face.backgroundColor + ";opacity:1;visibility:visible;}",
      "#" + config.face.canvasId + "{position:absolute;inset:0;width:100%;height:100%;display:block;}",
      "#" + config.flash.layerId + "{position:fixed;inset:0;z-index:999999;display:block;overflow:hidden;pointer-events:none;}",
      ".hacked-splash__word{position:absolute;left:var(--x);top:var(--y);transform:translate(-50%,-50%) rotate(var(--r)) scale(var(--s));font-family:" + config.flash.fontFamily + ";font-size:var(--size);font-weight:900;line-height:1;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;padding:.1em .4em;border:1px solid currentColor;background:rgba(0,0,0,.22);color:var(--color);text-shadow:0 0 .4em var(--glow),0 0 1.2em var(--glow);box-shadow:0 0 .5em var(--glow),inset 0 0 .5em rgba(255,255,255,.04);pointer-events:none;user-select:none;}"
    ].join("\n");
  }

  function prepareLayer() {
    const parent = parentElement();
    let layer = byId(config.face.layerId);

    if (!layer) {
      layer = document.createElement("div");
      layer.id = config.face.layerId;
      layer.setAttribute("aria-hidden", "true");
      parent.appendChild(layer);
    }

    let canvas = byId(config.face.canvasId);
    if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);

    canvas = document.createElement("canvas");
    canvas.id = config.face.canvasId;
    layer.appendChild(canvas);

    const ctx = canvas.getContext ? canvas.getContext("2d", { alpha: false }) || canvas.getContext("2d") : null;
    if (!ctx) return false;

    state.layer = layer;
    state.canvas = canvas;
    state.ctx = ctx;
    return true;
  }

  function removeFallbackContent() {
    if (!state.layer || !state.canvas) return;

    Array.prototype.slice.call(state.layer.childNodes).forEach(function (node) {
      if (node !== state.canvas) node.parentNode.removeChild(node);
    });
  }

  function pickFace() {
    const raw = FACE_LIBRARY.length ? sample(FACE_LIBRARY) : [""];
    const maxLen = Math.max.apply(null, raw.map(function (line) { return line.length; }));
    return raw.map(function (line) { return line.padEnd(maxLen, " "); });
  }

  function resizeCanvas() {
    const face = config.face;
    readViewport();

    const viewportDpr = window.devicePixelRatio || 1;
    const cap = state.width < face.mobileBreakpoint ? config.face.mobileDprMax : config.face.dprMax;
    const areaCap = Math.sqrt(Math.max(1, face.canvasPixelMax) / Math.max(1, state.width * state.height));

    state.dpr = Math.max(1, Math.min(viewportDpr, cap, areaCap));
    state.canvas.width = Math.ceil(state.width * state.dpr);
    state.canvas.height = Math.ceil(state.height * state.dpr);
    state.canvas.style.width = state.width + "px";
    state.canvas.style.height = state.height + "px";
    state.ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    state.ctx.textAlign = "left";
    state.ctx.textBaseline = "top";

    const scale = state.width < face.mobileBreakpoint ? face.mobileCellScale : 1;
    const minCell = state.width < face.mobileBreakpoint ? face.cellMinMobile : face.cellMin;

    state.cellW = clamp(Math.min(state.width / face.targetGridWidth, state.height / face.targetGridHeight) * scale, minCell, face.cellMax);
    state.cellH = state.cellW * 1.4;
    state.cols = Math.max(face.minCols, Math.floor(state.width / state.cellW));
    state.rows = Math.max(face.minRows, Math.floor(state.height / state.cellH));
  }

  function buildGrid() {
    const lines = pickFace();
    const faceH = lines.length;
    const faceW = lines[0] ? lines[0].length : 0;
    const offsetX = Math.floor((state.cols - faceW) / 2);
    const offsetY = Math.floor((state.rows - faceH) / 2);

    state.cells = [];

    for (let y = 0; y < state.rows; y += 1) {
      for (let x = 0; x < state.cols; x += 1) {
        state.cells.push({ x: x, y: y, face: false, base: " ", char: randomAscii(), gone: false, nextFlip: rand(0, 80) });
      }
    }

    for (let y = 0; y < faceH; y += 1) {
      for (let x = 0; x < faceW; x += 1) {
        const char = lines[y][x];
        if (char === " ") continue;

        const px = offsetX + x;
        const py = offsetY + y;
        if (px < 0 || py < 0 || px >= state.cols || py >= state.rows) continue;

        const cell = state.cells[py * state.cols + px];
        cell.face = true;
        cell.base = char;
        cell.char = Math.random() < 0.78 ? char : randomAscii();
        cell.nextFlip = rand(0, 24);
      }
    }
  }

  function updateCells(elapsed, delta) {
    const face = config.face;
    const start = face.duration * face.dissolveStartRatio;
    const end = face.duration * face.dissolveEndRatio;
    const dissolve = elapsed <= start ? 0 : clamp((elapsed - start) / Math.max(1, end - start), 0, 1);
    const frameFactor = clamp(delta / 16.67, 0.35, 2.25);

    for (let i = 0; i < state.cells.length; i += 1) {
      const cell = state.cells[i];
      if (cell.gone) continue;

      if (elapsed >= cell.nextFlip) {
        if (cell.face) {
          cell.char = elapsed < 170 ? randomAscii() : (Math.random() < 0.66 ? cell.base : randomAscii());
          cell.nextFlip += rand(18, 64);
        } else {
          cell.char = randomAscii();
          cell.nextFlip += rand(50, 150);
        }
      }

      if (dissolve > 0) {
        const chance = cell.face ? (0.0035 + dissolve * 0.064) * frameFactor : (0.0007 + dissolve * 0.011) * frameFactor;
        if (Math.random() < chance) cell.gone = true;
      }
    }
  }

  function draw() {
    const face = config.face;
    const ctx = state.ctx;

    ctx.clearRect(0, 0, state.width, state.height);
    ctx.fillStyle = face.backgroundColor;
    ctx.fillRect(0, 0, state.width, state.height);
    ctx.font = "700 " + state.cellW + "px " + face.fontFamily;

    for (let i = 0; i < state.cells.length; i += 1) {
      const cell = state.cells[i];
      if (cell.gone) continue;

      const x = cell.x * state.cellW;
      const y = cell.y * state.cellH;

      if (cell.face) {
        const base = cell.char === cell.base;
        ctx.fillStyle = (base ? face.faceBaseColor : face.faceNoiseColor) + (base ? rand(0.88, 1) : rand(0.52, 0.82)) + ")";
      } else {
        ctx.fillStyle = face.backgroundNoiseColor + rand(0.05, 0.16) + ")";
      }

      ctx.fillText(cell.char, x, y);
    }
  }

  function frame(timestamp) {
    if (state.phase !== "running") return;

    if (!state.startedAt) {
      state.startedAt = timestamp;
      state.lastFrameAt = timestamp;
      startFlash();
    }

    const elapsed = timestamp - state.startedAt;
    const delta = state.lastFrameAt ? timestamp - state.lastFrameAt : 16.67;
    state.lastFrameAt = timestamp;

    updateCells(elapsed, delta);
    draw();

    if (elapsed < config.face.duration) state.raf = raf(frame);
    else finish("complete");
  }

  function setupAndDrawFirstFrame() {
    if (!prepareLayer()) return false;

    resizeCanvas();
    buildGrid();
    draw();
    removeFallbackContent();
    return true;
  }

  function startFlash() {
    const flash = config.flash;
    if (!flash.enabled || state.flashLayer) return;

    const layer = document.createElement("div");
    layer.id = flash.layerId;
    layer.setAttribute("aria-hidden", "true");
    parentElement().appendChild(layer);
    state.flashLayer = layer;
    state.spawnedWords = 0;

    const startTimer = window.setTimeout(spawnFlashBatch, Math.max(0, flash.startDelay));
    state.flashTimers.push(startTimer);
  }

  function flashLimit() {
    const flash = config.flash;
    if (flash.count !== null && flash.count !== undefined && flash.count !== "") return Math.floor(clamp(Number(flash.count) || 0, 0, flash.maxCount));
    readViewport();
    return Math.min(flash.maxCount, Math.max(flash.minCount, Math.floor((state.width * state.height) / flash.densityDivisor)));
  }

  function flashScale() {
    readViewport();
    return state.width < config.flash.mobileBreakpoint ? config.flash.mobileScale : 1;
  }

  function spawnFlashBatch() {
    if (state.phase !== "running" || !state.flashLayer) return;

    const flash = config.flash;
    const elapsed = now() - state.startedAt;

    if (elapsed > flash.startDelay + flash.spawnDuration || state.spawnedWords >= flashLimit()) return;

    const fragment = document.createDocumentFragment();
    const count = randInt(flash.batchMin, flash.batchMax);

    for (let i = 0; i < count && state.spawnedWords < flashLimit(); i += 1) {
      fragment.appendChild(createWord());
      state.spawnedWords += 1;
    }

    state.flashLayer.appendChild(fragment);
    state.flashSpawnTimer = window.setTimeout(spawnFlashBatch, rand(flash.spawnIntervalMin, flash.spawnIntervalMax));
  }

  function createWord() {
    const flash = config.flash;
    const word = sample(flash.words.length ? flash.words : DEFAULT_CONFIG.flash.words);
    const scale = flashScale();
    const large = Math.random() < flash.largeChance;
    const medium = !large && Math.random() < flash.mediumChance;
    let size;

    if (large) size = clamp(state.width * rand(flash.largeRatioMin, flash.largeRatioMax) * scale, flash.largeClampMin, flash.largeClampMax);
    else if (medium) size = clamp(state.width * rand(flash.mediumRatioMin, flash.mediumRatioMax) * scale, flash.mediumClampMin, flash.mediumClampMax);
    else size = clamp(state.width * rand(flash.smallRatioMin, flash.smallRatioMax) * scale, flash.smallClampMin, flash.smallClampMax);

    const element = document.createElement("span");
    element.className = "hacked-splash__word";
    element.textContent = decorate(word.text || "[SYS] SIGNAL LOST");
    element.style.setProperty("--x", rand(1, 99) + "%");
    element.style.setProperty("--y", rand(2, 98) + "%");
    element.style.setProperty("--r", rand(-20, 20) + "deg");
    element.style.setProperty("--s", String(rand(0.55, 0.95)));
    element.style.setProperty("--size", size + "px");
    element.style.setProperty("--color", word.color || "#fff");
    element.style.setProperty("--glow", word.glow || colorToGlow(word.color || "#fff", flash.glowAlpha));

    const timer = window.setTimeout(function () {
      if (element.parentNode) element.parentNode.removeChild(element);
    }, rand(flash.wordLifeMin, flash.wordLifeMax));

    state.flashTimers.push(timer);
    return element;
  }

  function decorate(text) {
    const suffix = Math.random() < 0.5 ? "" : " :: 0x" + randInt(0, 65535).toString(16).toUpperCase();
    return "//// " + text + suffix + " ////";
  }

  function fadeThenRemove(element, duration, done) {
    if (!element || !element.isConnected) { if (done) done(); return; }

    const start = now();
    const total = Math.max(0, duration || 0);

    function step() {
      if (!element.isConnected) { if (done) done(); return; }
      const progress = total <= 0 ? 1 : clamp((now() - start) / total, 0, 1);
      element.style.opacity = String(1 - progress);

      if (progress < 1) window.setTimeout(step, 16);
      else {
        if (element.parentNode) element.parentNode.removeChild(element);
        if (done) done();
      }
    }

    step();
  }

  function finish(reason) {
    if (state.phase !== "running") return;
    state.phase = "finishing";

    cancelRaf(state.raf);
    state.raf = 0;
    window.clearTimeout(state.hardTimer);
    window.clearTimeout(state.resizeTimer);
    window.clearTimeout(state.flashSpawnTimer);
    state.flashTimers.forEach(function (timer) { window.clearTimeout(timer); });
    state.flashTimers = [];
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onResize);

    if (state.flashLayer && state.flashLayer.parentNode) state.flashLayer.parentNode.removeChild(state.flashLayer);
    state.flashLayer = null;

    fadeThenRemove(state.layer, config.face.fadeDuration, resetState);
  }

  function resetState() {
    state.phase = "idle";
    state.layer = null;
    state.canvas = null;
    state.ctx = null;
    state.cells = [];
    state.startedAt = 0;
    state.lastFrameAt = 0;
    state.spawnedWords = 0;
  }

  function onResize() {
    if (state.phase !== "running") return;
    window.clearTimeout(state.resizeTimer);
    state.resizeTimer = window.setTimeout(function () {
      if (state.phase !== "running") return;
      resizeCanvas();
      buildGrid();
      draw();
    }, 120);
  }

  function start(nextConfig) {
    if (nextConfig) config = normalizeConfig(merge(config, nextConfig));
    stop();
    injectStyle();

    state.phase = "running";
    state.startedAt = 0;
    state.lastFrameAt = 0;

    if (!config.face.enabled || !setupAndDrawFirstFrame()) {
      finish("setup-failed");
      return getConfig();
    }

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });

    state.hardTimer = window.setTimeout(function () { finish("hard-cleanup"); }, Math.max(1000, config.face.hardCleanupDelay));
    state.raf = raf(frame);

    return getConfig();
  }

  function stop() {
    cancelRaf(state.raf);
    window.clearTimeout(state.hardTimer);
    window.clearTimeout(state.fadeTimer);
    window.clearTimeout(state.resizeTimer);
    window.clearTimeout(state.flashSpawnTimer);
    state.flashTimers.forEach(function (timer) { window.clearTimeout(timer); });
    state.flashTimers = [];
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onResize);

    if (state.flashLayer && state.flashLayer.parentNode) state.flashLayer.parentNode.removeChild(state.flashLayer);
    if (state.layer && state.layer.parentNode && config.removeLayersOnFinish !== false) state.layer.parentNode.removeChild(state.layer);

    resetState();
    return getConfig();
  }

  function destroy() { return stop(); }

  function updateConfig(nextConfig) {
    config = normalizeConfig(merge(config, nextConfig || {}));
    injectStyle();
    return getConfig();
  }

  function getConfig() { return normalizeConfig(merge({}, config)); }

  window.HackedSplash = { start: start, stop: stop, destroy: destroy, updateConfig: updateConfig, getConfig: getConfig };

  if (config.autoStart) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { start(); }, { once: true });
    else start();
  }
})(window, document);
