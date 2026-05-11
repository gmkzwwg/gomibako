/*!
 * hacked-splash.js
 *
 * Conservative industrial rewrite.
 *
 * Design:
 *   1. Keep the stable lifecycle of the old working version.
 *   2. Never remove/recreate the first-paint face layer before startup.
 *   3. Do not depend on animationend/transitionend for cleanup.
 *   4. Avoid high DOM pressure from the old flash-word loop.
 *   5. If system motion is effectively disabled, skip the full effect and fade out the face layer.
 */

(function (window, document) {
  "use strict";

  if (!window || !document) return;

  if (window.HackedSplash && typeof window.HackedSplash.destroy === "function") {
    try {
      window.HackedSplash.destroy();
    } catch (_) {
      // Ignore previous-instance cleanup errors.
    }
  }

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
      "      .-++==-:::-++=+=.-=.  :---==++*#%%%+ -+ .#.-+        ==    ..            ",
      "                 ..  ..    - .:..       :+     =  :         =.                  ",
      "                                                                                ",
      "                                                                                ",
      "                   .                                                           .",
      " -:-                          .:::                           -:-                ",
      "-++=-::::::::::---::::::::::::-++=-::::::::::--:::::::::::::-++=-::::::::::--:::",
      "#######%@####################################################%%%%%%%%%%%%%#%####",
      "#%%%%%%%%%%%%%##################################################################",
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
      "                                                                                ",
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
      "                                                                                ",
    ],
  ];

  const DEFAULT_CONFIG = {
    autoStart: true,
    createMissingLayers: true,
    removeLayersOnFinish: true,

    layerParent: "body",
    styleId: "hacked-splash-style",

    faceLayerId: "hacked-face-layer",
    flashLayerId: "hacked-flash-layer",
    canvasId: "hacked-splash-canvas",

    dprMax: 2,
    mobileDprMax: 1.25,
    mobileBreakpoint: 800,
    canvasPixelMax: 2200000,

    motion: {
      respectReducedMotion: true,
      probeAnimationOff: true,
      probeDelay: 72,
      probeDuration: 1000,
      probeOffRatio: 0.72,
      skipFadeDuration: 360,
      skipFadeSteps: 16,
    },

    timing: {
      faceDuration: 800,
      dissolveStart: 340,
      dissolveEnd: 760,
      faceFade: 360,
      flashSpawnDuration: 620,
      flashHold: 180,
      flashTail: 1200,
      failSafeExtra: 1800,
    },

    grid: {
      targetWidth: 155,
      targetHeight: 82,
      minCols: 52,
      minRows: 30,
      cellMin: 12,
      cellMinMobile: 8,
      cellMax: 25,
      mobileCellScale: 0.72,
      backgroundSampleRate: 0.72,
    },

    colors: {
      background: "#000",
      faceBase: "rgba(245,255,245,",
      faceNoise: "rgba(110,255,150,",
      backgroundNoise: "rgba(30,170,70,",
    },

    flash: {
      enabled: true,
      maxWordsDesktop: 130,
      maxWordsMobile: 64,
      densityDivisor: 9800,
      batchMin: 3,
      batchMax: 6,
      spawnIntervalMin: 28,
      spawnIntervalMax: 56,

      outMin: 260,
      outMax: 460,

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

      mobileScale: 0.72,
      mixBlendMode: "screen",

      words: [
        { text: "[ALERT] INJECTION DETECTED", color: "#0fca1c", glow: "rgba(15,202,28,0.98)" },
        { text: "[CRITICAL] CORE DUMPED", color: "#E71D36", glow: "rgba(231,29,54,0.98)" },
        { text: "[WARNING] MEMORY RUPTURED", color: "#f8ca00", glow: "rgba(248,202,0,0.98)" },
        { text: "[BREACH] CONTROL LOST", color: "#d2cccc", glow: "rgba(210,204,204,0.98)" },
        { text: "[FAULT] SESSION SEIZED", color: "#E71D36", glow: "rgba(231,29,54,0.98)" },
        { text: "[SYS] ROOT PERMISSION TAKEN", color: "#0fca1c", glow: "rgba(15,202,28,0.98)" },
      ],
    },
  };

  const ASCII_PALETTE = Array.from({ length: 94 }, function (_, index) {
    return String.fromCharCode(index + 33);
  });

  let config = mergeConfig(DEFAULT_CONFIG, window.HackedSplashConfig || window.hackedSplashConfig || {});

  const state = {
    destroyed: false,
    started: false,
    skipMode: false,

    faceLayer: null,
    flashLayer: null,
    canvas: null,
    ctx: null,

    width: 0,
    height: 0,
    dpr: 1,

    cellW: 10,
    cellH: 14,
    cols: 0,
    rows: 0,
    cells: [],
    faceLines: null,

    startTime: 0,
    rafId: 0,

    flashDecayStarted: false,
    activeFlashWords: [],

    timers: new Set(),
    hardCleanupTimer: 0,
    resizeTimer: 0,
  };

  function mergeConfig(base, patch) {
    const output = {};
    const sourceList = [base || {}, patch || {}];

    sourceList.forEach(function (source) {
      Object.keys(source).forEach(function (key) {
        const value = source[key];
        const current = output[key];

        if (
          value &&
          typeof value === "object" &&
          !Array.isArray(value) &&
          current &&
          typeof current === "object" &&
          !Array.isArray(current)
        ) {
          output[key] = mergeConfig(current, value);
        } else if (Array.isArray(value)) {
          output[key] = value.map(function (item) {
            return item && typeof item === "object" ? mergeConfig({}, item) : item;
          });
        } else {
          output[key] = value;
        }
      });
    });

    return output;
  }

  function setManagedTimeout(callback, delay) {
    const id = window.setTimeout(function () {
      state.timers.delete(id);
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

  function clearHardCleanupTimer() {
    if (state.hardCleanupTimer) {
      window.clearTimeout(state.hardCleanupTimer);
      state.hardCleanupTimer = 0;
    }
  }

  function now() {
    return window.performance && typeof window.performance.now === "function"
      ? window.performance.now()
      : Date.now();
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

  function shuffle(array) {
    const copy = array.slice();

    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      const current = copy[index];

      copy[index] = copy[swapIndex];
      copy[swapIndex] = current;
    }

    return copy;
  }

  function randomAscii() {
    return ASCII_PALETTE[Math.floor(Math.random() * ASCII_PALETTE.length)];
  }

  function isMobileViewport() {
    return state.width < config.mobileBreakpoint;
  }

  function getParent() {
    const parent = config.layerParent;

    if (parent && parent.nodeType === 1) return parent;

    if (typeof parent === "string" && parent !== "body") {
      return document.querySelector(parent) || document.body || document.documentElement;
    }

    return document.body || document.documentElement;
  }

  function showLayer(element) {
    if (!element) return;

    element.style.opacity = "1";
    element.style.visibility = "visible";
    element.style.pointerEvents = "none";
  }

  function hideLayer(element) {
    if (!element) return;

    element.style.opacity = "0";
    element.style.visibility = "hidden";
    element.style.pointerEvents = "none";
  }

  function removeOrHide(element) {
    if (!element) return;

    if (config.removeLayersOnFinish !== false && element.isConnected) {
      element.remove();
    } else {
      hideLayer(element);
    }
  }

  function injectStyle() {
    let style = document.getElementById(config.styleId);

    if (!style) {
      style = document.createElement("style");
      style.id = config.styleId;
      document.head.appendChild(style);
    }

    style.textContent = [
      "#" + config.faceLayerId + " {",
      "  position: fixed;",
      "  inset: 0;",
      "  z-index: 999998;",
      "  overflow: hidden;",
      "  pointer-events: none;",
      "  opacity: 1;",
      "  visibility: visible;",
      "  background: " + config.colors.background + ";",
      "  contain: layout paint style;",
      "}",
      "#" + config.canvasId + " {",
      "  position: absolute;",
      "  inset: 0;",
      "  display: block;",
      "  width: 100%;",
      "  height: 100%;",
      "}",
      "#" + config.flashLayerId + " {",
      "  position: fixed;",
      "  inset: 0;",
      "  z-index: 999999;",
      "  overflow: hidden;",
      "  pointer-events: none;",
      "  contain: layout paint style;",
      "}",
      ".hacked-splash__flash {",
      "  position: absolute;",
      "  left: var(--x);",
      "  top: var(--y);",
      "  transform: translate(-50%, -50%) rotate(var(--r)) scale(var(--settle));",
      "  transform-origin: center center;",
      "  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace;",
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
      "  mix-blend-mode: var(--blend-mode, screen);",
      "  text-shadow: 0 0 0.4em var(--glow), 0 0 1.2em var(--glow);",
      "  box-shadow: 0 0 0.5em var(--glow), inset 0 0 0.5em rgba(255,255,255,0.04);",
      "  opacity: 0;",
      "  visibility: visible;",
      "  pointer-events: none;",
      "  user-select: none;",
      "  contain: layout paint style;",
      "  animation: hackedSplashFlashIn var(--dur) steps(2, end) both;",
      "}",
      ".hacked-splash__flash.is-decaying {",
      "  opacity: 0;",
      "  visibility: hidden;",
      "  transform: translate(-50%, -50%) rotate(var(--r)) scale(0.96);",
      "  transition: opacity var(--outdur) ease, transform var(--outdur) ease, visibility 0s linear var(--outdur);",
      "}",
      "@keyframes hackedSplashFlashIn {",
      "  0% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--r)) scale(0.8); }",
      "  45% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--r)) scale(1.04); }",
      "  100% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--r)) scale(var(--settle)); }",
      "}",
    ].join("\n");
  }

  function ensureDom() {
    const parent = getParent();

    state.faceLayer = document.getElementById(config.faceLayerId);

    if (!state.faceLayer && config.createMissingLayers) {
      state.faceLayer = document.createElement("div");
      state.faceLayer.id = config.faceLayerId;
      state.faceLayer.setAttribute("aria-hidden", "true");
      parent.appendChild(state.faceLayer);
    }

    if (!state.faceLayer) return false;

    state.canvas = document.getElementById(config.canvasId);

    if (!state.canvas && config.createMissingLayers) {
      state.canvas = document.createElement("canvas");
      state.canvas.id = config.canvasId;
    }

    if (!state.canvas) return false;

    Array.prototype.slice.call(state.faceLayer.childNodes).forEach(function (node) {
      if (node !== state.canvas) {
        node.remove();
      }
    });

    if (state.canvas.parentNode !== state.faceLayer) {
      state.faceLayer.appendChild(state.canvas);
    }

    state.flashLayer = document.getElementById(config.flashLayerId);

    if (!state.flashLayer && config.createMissingLayers) {
      state.flashLayer = document.createElement("div");
      state.flashLayer.id = config.flashLayerId;
      state.flashLayer.setAttribute("aria-hidden", "true");
      parent.appendChild(state.flashLayer);
    }

    if (state.flashLayer) {
      state.flashLayer.textContent = "";
      state.flashLayer.setAttribute("aria-hidden", "true");
      showLayer(state.flashLayer);
    }

    showLayer(state.faceLayer);

    try {
      state.ctx = state.canvas.getContext("2d", { alpha: false });
    } catch (_) {
      state.ctx = state.canvas.getContext("2d");
    }

    return Boolean(state.ctx);
  }

  function readViewport() {
    state.width = window.innerWidth || document.documentElement.clientWidth || 1024;
    state.height = window.innerHeight || document.documentElement.clientHeight || 768;
  }

  function pickFace() {
    const raw = sample(FACE_LIBRARY);
    const maxLen = Math.max.apply(null, raw.map(function (line) {
      return line.length;
    }));

    return raw.map(function (line) {
      return line.padEnd(maxLen, " ");
    });
  }

  function resizeCanvasAndGrid() {
    const ctx = state.ctx;

    if (!state.canvas || !ctx) return;

    readViewport();

    const viewportDpr = window.devicePixelRatio || 1;
    const dprCap = isMobileViewport() ? config.mobileDprMax : config.dprMax;
    const areaCap = Math.sqrt(config.canvasPixelMax / Math.max(1, state.width * state.height));

    state.dpr = Math.max(1, Math.min(viewportDpr, dprCap, areaCap));

    state.canvas.width = Math.ceil(state.width * state.dpr);
    state.canvas.height = Math.ceil(state.height * state.dpr);
    state.canvas.style.width = state.width + "px";
    state.canvas.style.height = state.height + "px";

    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    const scale = isMobileViewport() ? config.grid.mobileCellScale : 1;
    const cellMin = isMobileViewport() ? config.grid.cellMinMobile : config.grid.cellMin;

    state.cellW = clamp(
      Math.min(state.width / config.grid.targetWidth, state.height / config.grid.targetHeight) * scale,
      cellMin,
      config.grid.cellMax
    );

    state.cellH = state.cellW * 1.4;
    state.cols = Math.max(config.grid.minCols, Math.floor(state.width / state.cellW));
    state.rows = Math.max(config.grid.minRows, Math.floor(state.height / state.cellH));

    buildGrid();
  }

  function buildGrid() {
    const face = state.faceLines || pickFace();

    state.faceLines = face;
    state.cells = [];

    for (let y = 0; y < state.rows; y += 1) {
      for (let x = 0; x < state.cols; x += 1) {
        state.cells.push({
          x: x,
          y: y,
          face: false,
          bgVisible: Math.random() < config.grid.backgroundSampleRate,
          base: " ",
          char: randomAscii(),
          gone: false,
          nextFlip: rand(0, 80),
        });
      }
    }

    const faceH = face.length;
    const faceW = face[0] ? face[0].length : 0;
    const offsetX = Math.floor((state.cols - faceW) / 2);
    const offsetY = Math.floor((state.rows - faceH) / 2);

    for (let fy = 0; fy < faceH; fy += 1) {
      for (let fx = 0; fx < faceW; fx += 1) {
        const char = face[fy][fx];

        if (char === " ") continue;

        const px = offsetX + fx;
        const py = offsetY + fy;

        if (px < 0 || py < 0 || px >= state.cols || py >= state.rows) continue;

        const cell = state.cells[py * state.cols + px];

        cell.face = true;
        cell.bgVisible = true;
        cell.base = char;
        cell.char = Math.random() < 0.78 ? char : randomAscii();
        cell.gone = false;
        cell.nextFlip = rand(0, 24);
      }
    }
  }

  function updateCells(elapsed, deltaMs) {
    const timing = config.timing;
    const dissolveProgress = elapsed <= timing.dissolveStart
      ? 0
      : clamp((elapsed - timing.dissolveStart) / Math.max(1, timing.dissolveEnd - timing.dissolveStart), 0, 1);

    const frameFactor = clamp(deltaMs / 16.67, 0.35, 2.2);

    for (let index = 0; index < state.cells.length; index += 1) {
      const cell = state.cells[index];

      if (cell.gone) continue;

      if (elapsed >= cell.nextFlip) {
        if (cell.face) {
          if (elapsed < 170) {
            cell.char = randomAscii();
          } else {
            cell.char = Math.random() < 0.66 ? cell.base : randomAscii();
          }

          cell.nextFlip += rand(18, 64);
        } else if (cell.bgVisible) {
          cell.char = randomAscii();
          cell.nextFlip += rand(50, 150);
        }
      }

      if (dissolveProgress > 0) {
        const chance = cell.face
          ? (0.0035 + dissolveProgress * 0.064) * frameFactor
          : (0.0006 + dissolveProgress * 0.009) * frameFactor;

        if (Math.random() < chance) {
          cell.gone = true;
        }
      }
    }
  }

  function drawGrid() {
    const ctx = state.ctx;

    if (!ctx) return false;

    ctx.clearRect(0, 0, state.width, state.height);
    ctx.fillStyle = config.colors.background;
    ctx.fillRect(0, 0, state.width, state.height);

    ctx.font =
      "700 " +
      state.cellW +
      "px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace";

    for (let index = 0; index < state.cells.length; index += 1) {
      const cell = state.cells[index];

      if (cell.gone || (!cell.face && !cell.bgVisible)) continue;

      const px = cell.x * state.cellW;
      const py = cell.y * state.cellH;

      if (cell.face) {
        const isBase = cell.char === cell.base;
        const alpha = isBase ? rand(0.88, 1) : rand(0.52, 0.82);

        ctx.fillStyle = (isBase ? config.colors.faceBase : config.colors.faceNoise) + alpha + ")";
      } else {
        ctx.fillStyle = config.colors.backgroundNoise + rand(0.05, 0.15) + ")";
      }

      ctx.fillText(cell.char, px, py);
    }

    return true;
  }

  function decorateFlashText(text) {
    const variants = [
      "//// " + text + " ////",
      "//// " + text + " :: " + randInt(0, 9999).toString(16).toUpperCase() + " ////",
      "//// " + text + " :: 0x" + randInt(0, 65535).toString(16).toUpperCase() + " ////",
      "//// " + text + " :: /SYS/CORE ////",
      "//// " + text + " :: PROC-FAIL ////",
    ];

    return sample(variants);
  }

  function getFlashLimit() {
    const baseMax = isMobileViewport() ? config.flash.maxWordsMobile : config.flash.maxWordsDesktop;
    const densityLimit = Math.floor((state.width * state.height) / config.flash.densityDivisor);

    return Math.max(12, Math.min(baseMax, densityLimit));
  }

  function createFlashWord() {
    if (!config.flash.enabled) return;
    if (!state.flashLayer || !state.flashLayer.isConnected) return;
    if (state.flashDecayStarted) return;
    if (state.activeFlashWords.length >= getFlashLimit()) return;

    const word = sample(config.flash.words);
    const span = document.createElement("span");
    const scale = isMobileViewport() ? config.flash.mobileScale : 1;
    const large = Math.random() < config.flash.largeChance;
    const medium = !large && Math.random() < config.flash.mediumChance;

    let size;

    if (large) {
      size = clamp(
        state.width * rand(config.flash.largeRatioMin, config.flash.largeRatioMax) * scale,
        config.flash.largeClampMin,
        config.flash.largeClampMax
      );
    } else if (medium) {
      size = clamp(
        state.width * rand(config.flash.mediumRatioMin, config.flash.mediumRatioMax) * scale,
        config.flash.mediumClampMin,
        config.flash.mediumClampMax
      );
    } else {
      size = clamp(
        state.width * rand(config.flash.smallRatioMin, config.flash.smallRatioMax) * scale,
        config.flash.smallClampMin,
        config.flash.smallClampMax
      );
    }

    span.className = "hacked-splash__flash";
    span.textContent = decorateFlashText(word.text || "[SYS] SIGNAL LOST");
    span.style.setProperty("--x", rand(1, 99) + "%");
    span.style.setProperty("--y", rand(2, 98) + "%");
    span.style.setProperty("--r", rand(-20, 20) + "deg");
    span.style.setProperty("--size", size + "px");
    span.style.setProperty("--dur", rand(90, 180) + "ms");
    span.style.setProperty("--settle", String(rand(0.55, 0.95)));
    span.style.setProperty("--outdur", rand(config.flash.outMin, config.flash.outMax) + "ms");
    span.style.setProperty("--color", word.color || "#fff");
    span.style.setProperty("--glow", word.glow || "rgba(255,255,255,0.98)");
    span.style.setProperty("--blend-mode", config.flash.mixBlendMode || "screen");

    state.flashLayer.appendChild(span);
    state.activeFlashWords.push(span);
  }

  function flashAddLoop() {
    if (!state.started || state.destroyed) return;
    if (!state.flashLayer || !state.flashLayer.isConnected) return;
    if (state.flashDecayStarted) return;

    const elapsed = now() - state.startTime;

    if (elapsed > config.timing.flashSpawnDuration) return;

    const batchCount = randInt(config.flash.batchMin, config.flash.batchMax);
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < batchCount; index += 1) {
      if (state.activeFlashWords.length >= getFlashLimit()) break;

      const before = state.activeFlashWords.length;
      createFlashWord();

      if (state.activeFlashWords.length > before) {
        fragment.appendChild(state.activeFlashWords[state.activeFlashWords.length - 1]);
      }
    }

    if (fragment.childNodes.length && state.flashLayer && state.flashLayer.isConnected) {
      state.flashLayer.appendChild(fragment);
    }

    setManagedTimeout(flashAddLoop, rand(config.flash.spawnIntervalMin, config.flash.spawnIntervalMax));
  }

  function decayFlashWord(element) {
    if (!element || !element.isConnected) return;

    element.classList.add("is-decaying");

    const index = state.activeFlashWords.indexOf(element);

    if (index !== -1) {
      state.activeFlashWords.splice(index, 1);
    }

    const outDur = parseFloat(element.style.getPropertyValue("--outdur")) || config.flash.outMax;

    setManagedTimeout(function () {
      if (element.isConnected) {
        element.remove();
      }
    }, outDur + 40);
  }

  function beginFlashDecay() {
    if (state.flashDecayStarted) return;

    state.flashDecayStarted = true;

    const queue = shuffle(state.activeFlashWords.slice());
    const total = config.timing.flashTail;

    if (!queue.length) {
      setManagedTimeout(function () {
        if (state.flashLayer) {
          removeOrHide(state.flashLayer);
        }
      }, total);
      return;
    }

    queue.forEach(function (element, index) {
      const progress = queue.length === 1 ? 1 : index / (queue.length - 1);
      const eased = Math.pow(progress, 2);
      const delay = eased * total + rand(0, 50);

      setManagedTimeout(function () {
        decayFlashWord(element);
      }, delay);
    });

    setManagedTimeout(function () {
      if (state.flashLayer) {
        removeOrHide(state.flashLayer);
      }
    }, total + config.flash.outMax + 300);
  }

  function jsFadeOut(element, duration, steps, onFinish) {
    if (!element) {
      if (onFinish) onFinish();
      return;
    }

    const totalDuration = Math.max(0, Number(duration) || 0);
    const totalSteps = Math.max(1, Math.floor(Number(steps) || 16));
    const interval = totalDuration / totalSteps;
    let step = 0;

    showLayer(element);

    if (totalDuration <= 0) {
      element.style.opacity = "0";
      element.style.visibility = "hidden";
      if (onFinish) onFinish();
      return;
    }

    function tick() {
      if (!element.isConnected) {
        if (onFinish) onFinish();
        return;
      }

      step += 1;

      const progress = clamp(step / totalSteps, 0, 1);
      element.style.opacity = String(1 - progress);

      if (progress >= 1) {
        element.style.visibility = "hidden";
        if (onFinish) onFinish();
      } else {
        setManagedTimeout(tick, interval);
      }
    }

    setManagedTimeout(tick, interval);
  }

  function leaveFaceLayer() {
    if (!state.started) return;

    state.started = false;

    if (state.rafId) {
      window.cancelAnimationFrame(state.rafId);
      state.rafId = 0;
    }

    jsFadeOut(state.faceLayer, config.timing.faceFade, 18, function () {
      if (state.faceLayer) {
        removeOrHide(state.faceLayer);
      }

      beginFlashDecay();
    });
  }

  function drawFrame(frameTime) {
    if (!state.started || state.destroyed) return;

    const elapsed = frameTime - state.startTime;
    const deltaMs = state.lastFrameTime ? frameTime - state.lastFrameTime : 16.67;

    state.lastFrameTime = frameTime;

    try {
      updateCells(elapsed, deltaMs);
      drawGrid();
    } catch (error) {
      reportError("draw failed", error);
      skipSplash();
      return;
    }

    if (elapsed < config.timing.faceDuration) {
      state.rafId = window.requestAnimationFrame(drawFrame);
    } else {
      leaveFaceLayer();
    }
  }

  function scheduleResize() {
    if (state.resizeTimer) {
      window.clearTimeout(state.resizeTimer);
    }

    state.resizeTimer = window.setTimeout(function () {
      state.resizeTimer = 0;

      if (!state.ctx || !state.canvas) return;

      try {
        resizeCanvasAndGrid();
        drawGrid();
      } catch (error) {
        reportError("resize failed", error);
        skipSplash();
      }
    }, 100);
  }

  function armHardCleanup() {
    clearHardCleanupTimer();

    state.hardCleanupTimer = window.setTimeout(function () {
      forceCleanup();
    }, config.timing.faceDuration + config.timing.faceFade + config.timing.flashTail + config.timing.failSafeExtra);
  }

  function prefersReducedMotion() {
    if (!config.motion.respectReducedMotion) return false;
    if (!window.matchMedia) return false;

    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (_) {
      return false;
    }
  }

  function probeAnimationOff(callback) {
    if (!config.motion.probeAnimationOff) {
      callback(false);
      return;
    }

    if (!document.body || typeof Element === "undefined" || !Element.prototype.animate) {
      callback(false);
      return;
    }

    const probe = document.createElement("div");
    let animation = null;
    let done = false;

    probe.style.position = "fixed";
    probe.style.left = "-1px";
    probe.style.top = "-1px";
    probe.style.width = "1px";
    probe.style.height = "1px";
    probe.style.opacity = "0";
    probe.style.pointerEvents = "none";

    document.body.appendChild(probe);

    function finish(result) {
      if (done) return;

      done = true;

      try {
        if (animation) {
          animation.cancel();
        }
      } catch (_) {
        // Ignore.
      }

      if (probe.isConnected) {
        probe.remove();
      }

      callback(Boolean(result));
    }

    try {
      animation = probe.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        {
          duration: config.motion.probeDuration,
          fill: "both",
        }
      );
    } catch (_) {
      finish(false);
      return;
    }

    window.setTimeout(function () {
      let currentTime = 0;
      let playState = "";

      try {
        currentTime = Number(animation.currentTime) || 0;
        playState = animation.playState || "";
      } catch (_) {
        finish(false);
        return;
      }

      const ratio = currentTime / Math.max(1, config.motion.probeDuration);
      const looksDisabled = playState === "finished" || ratio >= config.motion.probeOffRatio;

      finish(looksDisabled);
    }, Math.max(30, Number(config.motion.probeDelay) || 72));
  }

  function shouldSkipMotion(callback) {
    if (prefersReducedMotion()) {
      callback(true);
      return;
    }

    probeAnimationOff(callback);
  }

  function skipSplash() {
    state.skipMode = true;
    state.started = false;

    if (state.rafId) {
      window.cancelAnimationFrame(state.rafId);
      state.rafId = 0;
    }

    if (state.flashLayer) {
      state.flashLayer.textContent = "";
      removeOrHide(state.flashLayer);
    }

    jsFadeOut(
      state.faceLayer,
      config.motion.skipFadeDuration,
      config.motion.skipFadeSteps,
      function () {
        if (state.faceLayer) {
          removeOrHide(state.faceLayer);
        }
        clearHardCleanupTimer();
      }
    );
  }

  function startNormal() {
    if (state.destroyed) return;

    injectStyle();

    if (!ensureDom()) {
      forceCleanup();
      return;
    }

    state.skipMode = false;
    state.started = true;
    state.flashDecayStarted = false;
    state.activeFlashWords = [];
    state.faceLines = pickFace();
    state.lastFrameTime = 0;

    try {
      resizeCanvasAndGrid();
      drawGrid();
    } catch (error) {
      reportError("setup failed", error);
      skipSplash();
      return;
    }

    state.startTime = now();

    armHardCleanup();

    state.rafId = window.requestAnimationFrame(drawFrame);

    if (config.flash.enabled && state.flashLayer) {
      flashAddLoop();
    }
  }

  function start(nextConfig) {
    if (nextConfig) {
      config = mergeConfig(config, nextConfig);
    }

    stopRuntimeOnly();

    state.destroyed = false;

    injectStyle();

    if (!ensureDom()) {
      forceCleanup();
      return getConfig();
    }

    shouldSkipMotion(function (skip) {
      if (state.destroyed) return;

      if (skip) {
        skipSplash();
      } else {
        startNormal();
      }
    });

    return getConfig();
  }

  function stopRuntimeOnly() {
    if (state.rafId) {
      window.cancelAnimationFrame(state.rafId);
      state.rafId = 0;
    }

    if (state.resizeTimer) {
      window.clearTimeout(state.resizeTimer);
      state.resizeTimer = 0;
    }

    clearManagedTimers();
    clearHardCleanupTimer();

    state.started = false;
    state.skipMode = false;
    state.flashDecayStarted = false;
    state.activeFlashWords = [];
    state.cells = [];
    state.faceLines = null;
    state.startTime = 0;
    state.lastFrameTime = 0;
  }

  function forceCleanup() {
    stopRuntimeOnly();

    if (state.faceLayer) {
      removeOrHide(state.faceLayer);
    }

    if (state.flashLayer) {
      state.flashLayer.textContent = "";
      removeOrHide(state.flashLayer);
    }

    state.ctx = null;
    state.canvas = null;
    state.faceLayer = null;
    state.flashLayer = null;
  }

  function stop() {
    forceCleanup();
    return getConfig();
  }

  function destroy() {
    forceCleanup();

    state.destroyed = true;

    window.removeEventListener("resize", scheduleResize);
    window.removeEventListener("orientationchange", scheduleResize);

    return getConfig();
  }

  function updateConfig(nextConfig) {
    config = mergeConfig(config, nextConfig || {});
    injectStyle();
    return getConfig();
  }

  function getConfig() {
    return mergeConfig({}, config);
  }

  function reportError(message, error) {
    if (window.console && window.console.error) {
      window.console.error("[HackedSplash] " + message, error);
    }
  }

  window.HackedSplash = {
    start: start,
    stop: stop,
    destroy: destroy,
    updateConfig: updateConfig,
    getConfig: getConfig,
  };

  window.addEventListener("resize", scheduleResize, { passive: true });
  window.addEventListener("orientationchange", scheduleResize, { passive: true });

  function onReady() {
    if (config.autoStart) {
      start();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady, { once: true });
  } else {
    onReady();
  }
})(window, document);