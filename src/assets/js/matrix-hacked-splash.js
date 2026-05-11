/*!
 * hacked-splash.js
 *
 * Introduction:
 *   Draws an ASCII face splash on canvas, then shows floating alert words.
 *
 * Usage:
 *   The HTML layer must be an empty black mask:
 *   <div id="hacked-face-layer" aria-hidden="true"></div>
 *
 * Global API:
 *   window.HackedSplash.start(config?)
 *   window.HackedSplash.stop()
 *   window.HackedSplash.destroy()
 *   window.HackedSplash.updateConfig(config)
 *   window.HackedSplash.getConfig()
 *
 * Notes:
 *   No <pre>.
 *   No Android animation-scale probing.
 *   No CSS animation/transition event is required for cleanup.
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

    dprMax: 2,
    mobileDprMax: 1.25,
    canvasPixelMax: 2500000,

    face: {
      enabled: true,
      layerId: "hacked-face-layer",
      canvasId: "hacked-splash-canvas",

      duration: 900,
      fadeDuration: 420,
      firstFrameTimeout: 220,
      hardCleanupDelay: 5200,

      dissolveStartRatio: 0.42,
      dissolveEndRatio: 0.92,

      mobileBreakpoint: 800,
      mobileCellScale: 0.7,
      cellMin: 12,
      cellMinMobile: 8,
      cellMax: 25,
      targetGridWidth: 155,
      targetGridHeight: 82,
      minCols: 52,
      minRows: 30,

      backgroundColor: "#000",
      faceBaseColor: "rgba(245,255,245,",
      faceNoiseColor: "rgba(110,255,150,",
      backgroundNoiseColor: "rgba(30,170,70,",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace"
    },

    flash: {
      enabled: true,
      layerId: "hacked-flash-layer",

      spawnDuration: 700,
      holdDuration: 260,
      fadeDuration: 520,

      densityDivisor: 9800,
      minCount: 28,
      maxCount: 180,
      spawnIntervalMin: 32,
      spawnIntervalMax: 58,
      batchMin: 3,
      batchMax: 6,

      mobileBreakpoint: 800,
      mobileScale: 0.7,

      largeChance: 0.06,
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
        { text: "[ALERT] INJECTION DETECTED", color: "#0fca1c", glow: "rgba(15,202,28,0.98)" },
        { text: "[CRITICAL] CORE DUMPED", color: "#E71D36", glow: "rgba(231,29,54,0.98)" },
        { text: "[WARNING] MEMORY RUPTURED", color: "#f8ca00", glow: "rgba(248,202,0,0.98)" },
        { text: "[BREACH] CONTROL LOST", color: "#d2cccc", glow: "rgba(210,204,204,0.98)" },
        { text: "[FAULT] SESSION SEIZED", color: "#E71D36", glow: "rgba(231,29,54,0.98)" },
        { text: "[SYS] ROOT PERMISSION TAKEN", color: "#0fca1c", glow: "rgba(15,202,28,0.98)" }
      ]
    }
  };

  const ASCII_PALETTE = Array.from({ length: 94 }, function (_, index) {
    return String.fromCharCode(index + 33);
  });

  let config = normalizeConfig(deepMerge({}, DEFAULT_CONFIG, getPreloadConfig()));

  const state = {
    generation: 0,
    destroyed: false,
    raf: 0,
    timers: new Set(),

    width: 0,
    height: 0,

    faceLayer: null,
    canvas: null,
    ctx: null,

    flashLayer: null,
    flashWords: [],

    faceCells: [],
    faceStarted: false,
    faceStartTime: 0,
    faceLastFrameTime: 0,

    dpr: 1,
    cellW: 10,
    cellH: 14,
    cols: 0,
    rows: 0
  };

  if (window.HackedSplash && typeof window.HackedSplash.destroy === "function") {
    try {
      window.HackedSplash.destroy();
    } catch (error) {
      reportError("previous instance destroy failed", error);
    }
  }

  function reportError(message, error) {
    if (window.console && window.console.error) {
      window.console.error("[HackedSplash] " + message, error);
    }
  }

  function getPreloadConfig() {
    return window.HackedSplashConfig || window.hackedSplashConfig || {};
  }

  function cloneValue(value) {
    if (Array.isArray(value)) return value.map(cloneValue);
    if (value && typeof value === "object") return deepMerge({}, value);
    return value;
  }

  function deepMerge() {
    const output = {};

    Array.prototype.slice.call(arguments).forEach(function (object) {
      Object.keys(object || {}).forEach(function (key) {
        const value = object[key];
        const current = output[key];

        if (
          value &&
          typeof value === "object" &&
          !Array.isArray(value) &&
          current &&
          typeof current === "object" &&
          !Array.isArray(current)
        ) {
          output[key] = deepMerge(current, value);
        } else {
          output[key] = cloneValue(value);
        }
      });
    });

    return output;
  }

  function normalizeConfig(nextConfig) {
    const normalized = deepMerge({}, nextConfig || {});
    const flash = normalized.flash || {};
    const words = Array.isArray(flash.words) ? flash.words : [];
    const alpha = Number.isFinite(Number(flash.glowAlpha)) ? Number(flash.glowAlpha) : 0.98;

    flash.words = words.map(function (word) {
      const normalizedWord = deepMerge({}, word || {});
      const color = normalizedWord.color || "#ffffff";

      if (flash.deriveGlowFromColor || !normalizedWord.glow) {
        normalizedWord.glow = colorToGlow(color, alpha);
      }

      return normalizedWord;
    });

    normalized.flash = flash;
    return normalized;
  }

  function hexToRgb(color) {
    let value = String(color || "").trim();

    if (value.charAt(0) === "#") value = value.slice(1);

    if (value.length === 3) {
      value = value.split("").map(function (char) {
        return char + char;
      }).join("");
    }

    if (!/^[0-9a-fA-F]{6}$/.test(value)) return null;

    const number = parseInt(value, 16);

    return {
      r: (number >> 16) & 255,
      g: (number >> 8) & 255,
      b: number & 255
    };
  }

  function colorToGlow(color, alpha) {
    const rgb = hexToRgb(color);
    if (!rgb) return color || "rgba(255,255,255," + alpha + ")";

    return "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + alpha + ")";
  }

  function now() {
    return window.performance && typeof window.performance.now === "function"
      ? window.performance.now()
      : Date.now();
  }

  function requestFrame(callback) {
    if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);

    return window.setTimeout(function () {
      callback(now());
    }, 16);
  }

  function cancelFrame(id) {
    if (!id) return;

    if (window.cancelAnimationFrame) {
      window.cancelAnimationFrame(id);
    } else {
      window.clearTimeout(id);
    }
  }

  function setManagedTimeout(callback, delay) {
    const generation = state.generation;

    const id = window.setTimeout(function () {
      state.timers.delete(id);

      if (state.destroyed || generation !== state.generation) return;

      callback();
    }, Math.max(0, Number(delay) || 0));

    state.timers.add(id);
    return id;
  }

  function clearManagedTimers() {
    state.timers.forEach(function (id) {
      window.clearTimeout(id);
    });

    state.timers.clear();
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function randInt(min, max) {
    return Math.floor(rand(min, max + 1));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function sample(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function randomAscii() {
    return ASCII_PALETTE[Math.floor(Math.random() * ASCII_PALETTE.length)];
  }

  function readViewport() {
    state.width = window.innerWidth || document.documentElement.clientWidth || 1024;
    state.height = window.innerHeight || document.documentElement.clientHeight || 768;
  }

  function getLayerParent() {
    const parent = config.layerParent;

    if (parent && parent.nodeType === 1) return parent;

    if (typeof parent === "string" && parent !== "body") {
      return document.querySelector(parent) || document.body || document.documentElement;
    }

    return document.body || document.documentElement;
  }

  function injectStyle() {
    if (!config.injectStyle) return;

    let style = document.getElementById(config.styleId);

    if (!style) {
      style = document.createElement("style");
      style.id = config.styleId;
      document.head.appendChild(style);
    }

    style.textContent = [
      "#" + config.face.layerId + " {",
      "  position: fixed;",
      "  inset: 0;",
      "  z-index: 999998;",
      "  display: block;",
      "  overflow: hidden;",
      "  pointer-events: none;",
      "  background: " + config.face.backgroundColor + ";",
      "  opacity: 1;",
      "  visibility: visible;",
      "}",
      "#" + config.face.canvasId + " {",
      "  position: absolute;",
      "  inset: 0;",
      "  width: 100%;",
      "  height: 100%;",
      "  display: block;",
      "}",
      "#" + config.flash.layerId + " {",
      "  position: fixed;",
      "  inset: 0;",
      "  z-index: 999999;",
      "  display: block;",
      "  overflow: hidden;",
      "  pointer-events: none;",
      "}",
      ".hacked-splash__flash {",
      "  position: absolute;",
      "  left: var(--x);",
      "  top: var(--y);",
      "  transform: translate(-50%, -50%) rotate(var(--r)) scale(var(--scale));",
      "  transform-origin: center center;",
      "  font-family: " + config.flash.fontFamily + ";",
      "  font-size: var(--size);",
      "  font-weight: 900;",
      "  line-height: 1;",
      "  letter-spacing: 0.08em;",
      "  text-transform: uppercase;",
      "  white-space: nowrap;",
      "  padding: 0.1em 0.4em;",
      "  border: 1px solid currentColor;",
      "  background: rgba(0, 0, 0, 0.22);",
      "  color: var(--color);",
      "  text-shadow: 0 0 0.4em var(--glow), 0 0 1.2em var(--glow);",
      "  box-shadow: 0 0 0.5em var(--glow), inset 0 0 0.5em rgba(255,255,255,0.04);",
      "  opacity: 1;",
      "  visibility: visible;",
      "  pointer-events: none;",
      "  user-select: none;",
      "}"
    ].join("\n");
  }

  function setupLayers() {
    const parent = getLayerParent();
    let faceLayer = document.getElementById(config.face.layerId);

    if (!faceLayer) {
      faceLayer = document.createElement("div");
      faceLayer.id = config.face.layerId;
      faceLayer.setAttribute("aria-hidden", "true");
      parent.appendChild(faceLayer);
    }

    faceLayer.innerHTML = "";

    const canvas = document.createElement("canvas");
    canvas.id = config.face.canvasId;
    faceLayer.appendChild(canvas);

    let flashLayer = document.getElementById(config.flash.layerId);

    if (!flashLayer) {
      flashLayer = document.createElement("div");
      flashLayer.id = config.flash.layerId;
      flashLayer.setAttribute("aria-hidden", "true");
      parent.appendChild(flashLayer);
    }

    flashLayer.textContent = "";

    const ctx = canvas.getContext("2d", { alpha: false });

    if (!ctx) return false;

    state.faceLayer = faceLayer;
    state.canvas = canvas;
    state.ctx = ctx;
    state.flashLayer = flashLayer;

    return true;
  }

  function sizeCanvasAndGrid() {
    const faceConfig = config.face;

    readViewport();

    const viewportDpr = window.devicePixelRatio || 1;
    const mobileCap = state.width < faceConfig.mobileBreakpoint ? config.mobileDprMax : config.dprMax;
    const dprCap = Number.isFinite(Number(mobileCap)) ? Number(mobileCap) : config.dprMax;
    const pixelMax = Math.max(1, Number(config.canvasPixelMax) || 2500000);
    const areaDpr = Math.sqrt(pixelMax / Math.max(1, state.width * state.height));

    state.dpr = Math.max(1, Math.min(viewportDpr, dprCap, areaDpr));

    state.canvas.width = Math.ceil(state.width * state.dpr);
    state.canvas.height = Math.ceil(state.height * state.dpr);
    state.canvas.style.width = state.width + "px";
    state.canvas.style.height = state.height + "px";

    state.ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    state.ctx.textAlign = "left";
    state.ctx.textBaseline = "top";

    const scale = state.width < faceConfig.mobileBreakpoint ? faceConfig.mobileCellScale : 1;
    const minCell = state.width < faceConfig.mobileBreakpoint ? faceConfig.cellMinMobile : faceConfig.cellMin;

    state.cellW = clamp(
      Math.min(state.width / faceConfig.targetGridWidth, state.height / faceConfig.targetGridHeight) * scale,
      minCell,
      faceConfig.cellMax
    );

    state.cellH = state.cellW * 1.4;
    state.cols = Math.max(faceConfig.minCols, Math.floor(state.width / state.cellW));
    state.rows = Math.max(faceConfig.minRows, Math.floor(state.height / state.cellH));

    buildFaceGrid();
  }

  function pickFace() {
    if (!FACE_LIBRARY.length) return [""];

    const raw = sample(FACE_LIBRARY);
    const maxLen = Math.max.apply(null, raw.map(function (line) {
      return line.length;
    }));

    return raw.map(function (line) {
      return line.padEnd(maxLen, " ");
    });
  }

  function buildFaceGrid() {
    const faceLines = pickFace();
    const faceH = faceLines.length;
    const faceW = faceLines[0] ? faceLines[0].length : 0;
    const offsetX = Math.floor((state.cols - faceW) / 2);
    const offsetY = Math.floor((state.rows - faceH) / 2);

    state.faceCells = [];

    for (let y = 0; y < state.rows; y += 1) {
      for (let x = 0; x < state.cols; x += 1) {
        state.faceCells.push({
          x: x,
          y: y,
          face: false,
          base: " ",
          char: randomAscii(),
          gone: false,
          nextFlip: rand(0, 80)
        });
      }
    }

    for (let fy = 0; fy < faceH; fy += 1) {
      for (let fx = 0; fx < faceW; fx += 1) {
        const char = faceLines[fy][fx];

        if (char === " ") continue;

        const px = offsetX + fx;
        const py = offsetY + fy;

        if (px < 0 || py < 0 || px >= state.cols || py >= state.rows) continue;

        const cell = state.faceCells[py * state.cols + px];

        cell.face = true;
        cell.base = char;
        cell.char = Math.random() < 0.78 ? char : randomAscii();
        cell.gone = false;
        cell.nextFlip = rand(0, 24);
      }
    }
  }

  function updateFaceCells(elapsed, deltaMs) {
    const faceConfig = config.face;
    const dissolveStart = faceConfig.duration * faceConfig.dissolveStartRatio;
    const dissolveEnd = faceConfig.duration * faceConfig.dissolveEndRatio;

    const dissolveProgress = elapsed <= dissolveStart
      ? 0
      : clamp((elapsed - dissolveStart) / Math.max(1, dissolveEnd - dissolveStart), 0, 1);

    const frameFactor = clamp(deltaMs / 16.67, 0.35, 2.25);

    for (let index = 0; index < state.faceCells.length; index += 1) {
      const cell = state.faceCells[index];

      if (cell.gone) continue;

      if (elapsed >= cell.nextFlip) {
        if (cell.face) {
          cell.char = elapsed < 170
            ? randomAscii()
            : Math.random() < 0.66 ? cell.base : randomAscii();

          cell.nextFlip += rand(18, 64);
        } else {
          cell.char = randomAscii();
          cell.nextFlip += rand(50, 150);
        }
      }

      if (dissolveProgress > 0) {
        const chance = cell.face
          ? (0.0035 + dissolveProgress * 0.064) * frameFactor
          : (0.0007 + dissolveProgress * 0.011) * frameFactor;

        if (Math.random() < chance) cell.gone = true;
      }
    }
  }

  function drawFaceGrid() {
    const faceConfig = config.face;
    const ctx = state.ctx;

    if (!ctx) return;

    ctx.clearRect(0, 0, state.width, state.height);
    ctx.fillStyle = faceConfig.backgroundColor;
    ctx.fillRect(0, 0, state.width, state.height);
    ctx.font = "700 " + state.cellW + "px " + faceConfig.fontFamily;

    for (let index = 0; index < state.faceCells.length; index += 1) {
      const cell = state.faceCells[index];

      if (cell.gone) continue;

      const px = cell.x * state.cellW;
      const py = cell.y * state.cellH;

      if (cell.face) {
        const isBase = cell.char === cell.base;
        const alpha = isBase ? rand(0.88, 1) : rand(0.52, 0.82);

        ctx.fillStyle = (isBase ? faceConfig.faceBaseColor : faceConfig.faceNoiseColor) + alpha + ")";
      } else {
        ctx.fillStyle = faceConfig.backgroundNoiseColor + rand(0.05, 0.16) + ")";
      }

      ctx.fillText(cell.char, px, py);
    }
  }

  function faceLoop(frameTime) {
    if (state.destroyed) return;

    if (!state.faceStarted) {
      state.faceStarted = true;
      state.faceStartTime = frameTime;
      state.faceLastFrameTime = frameTime;

      startFlash();
    }

    const elapsed = frameTime - state.faceStartTime;
    const deltaMs = state.faceLastFrameTime ? frameTime - state.faceLastFrameTime : 16.67;

    state.faceLastFrameTime = frameTime;

    updateFaceCells(elapsed, deltaMs);
    drawFaceGrid();

    if (elapsed < config.face.duration) {
      state.raf = requestFrame(faceLoop);
    } else {
      fadeRemoveFaceLayer();
    }
  }

  function startFace() {
    sizeCanvasAndGrid();
    drawFaceGrid();

    state.faceStarted = false;
    state.faceStartTime = 0;
    state.faceLastFrameTime = 0;

    state.raf = requestFrame(faceLoop);

    setManagedTimeout(function () {
      if (!state.faceStarted) {
        fadeRemoveFaceLayer();
      }
    }, config.face.firstFrameTimeout);
  }

  function startFlash() {
    if (!config.flash.enabled || !state.flashLayer) return;

    state.flashLayer.textContent = "";
    state.flashWords = [];

    const startTime = now();

    function spawnLoop() {
      const elapsed = now() - startTime;

      if (elapsed > config.flash.spawnDuration) {
        setManagedTimeout(fadeRemoveFlashLayer, config.flash.holdDuration);
        return;
      }

      addFlashBatch();

      setManagedTimeout(spawnLoop, rand(config.flash.spawnIntervalMin, config.flash.spawnIntervalMax));
    }

    spawnLoop();
  }

  function decorateFlashText(text) {
    const variants = [
      "//// " + text + " ////",
      "//// " + text + " :: " + randInt(0, 9999).toString(16).toUpperCase() + " ////",
      "//// " + text + " :: 0x" + randInt(0, 65535).toString(16).toUpperCase() + " ////",
      "//// " + text + " :: /SYS/CORE ////",
      "//// " + text + " :: PROC-FAIL ////"
    ];

    return sample(variants);
  }

  function getFlashLimit() {
    readViewport();

    const limit = Math.floor((state.width * state.height) / config.flash.densityDivisor);

    return Math.min(config.flash.maxCount, Math.max(config.flash.minCount, limit));
  }

  function getFlashScale() {
    readViewport();

    return state.width < config.flash.mobileBreakpoint ? config.flash.mobileScale : 1;
  }

  function pickFlashWord() {
    const words = Array.isArray(config.flash.words) && config.flash.words.length
      ? config.flash.words
      : DEFAULT_CONFIG.flash.words;

    return sample(words);
  }

  function addFlashBatch() {
    if (!state.flashLayer || state.flashWords.length >= getFlashLimit()) return;

    const fragment = document.createDocumentFragment();
    const count = randInt(config.flash.batchMin, config.flash.batchMax);

    for (let index = 0; index < count; index += 1) {
      if (state.flashWords.length >= getFlashLimit()) break;

      const word = createFlashWord();

      if (word) {
        state.flashWords.push(word);
        fragment.appendChild(word);
      }
    }

    if (fragment.childNodes.length) {
      state.flashLayer.appendChild(fragment);
    }
  }

  function createFlashWord() {
    const flashConfig = config.flash;
    const item = pickFlashWord();
    const span = document.createElement("span");
    const scale = getFlashScale();
    const large = Math.random() < flashConfig.largeChance;
    const medium = !large && Math.random() < flashConfig.mediumChance;

    let size;

    if (large) {
      size = clamp(
        state.width * rand(flashConfig.largeRatioMin, flashConfig.largeRatioMax) * scale,
        flashConfig.largeClampMin,
        flashConfig.largeClampMax
      );
    } else if (medium) {
      size = clamp(
        state.width * rand(flashConfig.mediumRatioMin, flashConfig.mediumRatioMax) * scale,
        flashConfig.mediumClampMin,
        flashConfig.mediumClampMax
      );
    } else {
      size = clamp(
        state.width * rand(flashConfig.smallRatioMin, flashConfig.smallRatioMax) * scale,
        flashConfig.smallClampMin,
        flashConfig.smallClampMax
      );
    }

    span.className = "hacked-splash__flash";
    span.textContent = decorateFlashText(item.text || "[SYS] SIGNAL LOST");
    span.style.setProperty("--x", rand(1, 99) + "%");
    span.style.setProperty("--y", rand(2, 98) + "%");
    span.style.setProperty("--r", rand(-20, 20) + "deg");
    span.style.setProperty("--scale", String(rand(0.55, 0.95)));
    span.style.setProperty("--size", size + "px");
    span.style.setProperty("--color", item.color || "#ffffff");
    span.style.setProperty("--glow", item.glow || colorToGlow(item.color || "#ffffff", flashConfig.glowAlpha));

    return span;
  }

  function fadeRemoveFaceLayer() {
    cancelFrame(state.raf);
    state.raf = 0;

    fadeRemoveElement(state.faceLayer, config.face.fadeDuration, function () {
      if (state.faceLayer && state.faceLayer.isConnected && config.removeLayersOnFinish !== false) {
        state.faceLayer.remove();
      }
      state.faceLayer = null;
      state.canvas = null;
      state.ctx = null;
    });
  }

  function fadeRemoveFlashLayer() {
    fadeRemoveElement(state.flashLayer, config.flash.fadeDuration, function () {
      if (state.flashLayer && state.flashLayer.isConnected && config.removeLayersOnFinish !== false) {
        state.flashLayer.remove();
      }
      state.flashLayer = null;
      state.flashWords = [];
    });
  }

  function fadeRemoveElement(element, duration, onFinish) {
    if (!element) {
      if (onFinish) onFinish();
      return;
    }

    const totalDuration = Math.max(0, Number(duration) || 0);
    const startTime = now();

    function step() {
      if (!element || !element.isConnected) {
        if (onFinish) onFinish();
        return;
      }

      const progress = clamp((now() - startTime) / Math.max(1, totalDuration), 0, 1);

      element.style.opacity = String(1 - progress);

      if (progress < 1) {
        setManagedTimeout(step, 16);
      } else {
        element.style.visibility = "hidden";
        if (onFinish) onFinish();
      }
    }

    step();
  }

  function hardCleanup() {
    cancelFrame(state.raf);
    state.raf = 0;

    const faceLayer = document.getElementById(config.face.layerId);
    const flashLayer = document.getElementById(config.flash.layerId);

    if (faceLayer && faceLayer.isConnected) faceLayer.remove();
    if (flashLayer && flashLayer.isConnected) flashLayer.remove();

    state.faceLayer = null;
    state.canvas = null;
    state.ctx = null;
    state.flashLayer = null;
    state.flashWords = [];
  }

  function handleResize() {
    if (!state.canvas || !state.ctx || !state.faceLayer) return;

    sizeCanvasAndGrid();
    drawFaceGrid();
  }

  function start(nextConfig) {
    if (nextConfig) {
      config = normalizeConfig(deepMerge(config, nextConfig));
    }

    stop();

    state.destroyed = false;
    state.generation += 1;

    injectStyle();

    if (!config.face.enabled) return getConfig();

    if (!setupLayers()) {
      hardCleanup();
      return getConfig();
    }

    try {
      startFace();
    } catch (error) {
      reportError("start failed", error);
      hardCleanup();
      return getConfig();
    }

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    setManagedTimeout(hardCleanup, config.face.hardCleanupDelay);

    return getConfig();
  }

  function stop() {
    state.generation += 1;

    cancelFrame(state.raf);
    state.raf = 0;

    clearManagedTimers();

    window.removeEventListener("resize", handleResize);
    window.removeEventListener("orientationchange", handleResize);

    hardCleanup();

    return getConfig();
  }

  function destroy() {
    stop();
    state.destroyed = true;

    return getConfig();
  }

  function updateConfig(nextConfig) {
    config = normalizeConfig(deepMerge(config, nextConfig || {}));

    if (config.injectStyle) {
      injectStyle();
    }

    return getConfig();
  }

  function getConfig() {
    return normalizeConfig(deepMerge({}, config));
  }

  window.HackedSplash = {
    start: start,
    stop: stop,
    destroy: destroy,
    updateConfig: updateConfig,
    getConfig: getConfig
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      if (config.autoStart) start();
    }, { once: true });
  } else if (config.autoStart) {
    start();
  }
})(window, document);