/*!
 * hacked-splash.js
 *
 * Introduction:
 *   Renders two independent effects: an ASCII face splash and floating alert words.
 *
 * This rewritten version keeps the user's latest visual configuration while
 * consolidating lifecycle cleanup, restart safety, and color-derived glow values.
 * Critical cleanup never depends on CSS animation/transition events.
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
    injectStyle: true,
    styleId: "hacked-splash-style",
    createLayers: true,
    layerParent: "body",
    removeLayersOnFinish: true,
    dprMax: 2,
    mobileDprMax: 1.25,
    canvasPixelMax: 2500000,

    face: {
      enabled: true,
      layerId: "hacked-face-layer",
      canvasId: "hacked-splash-canvas",
      duration: 800,
      fadeDuration: 400,
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
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
      failSafeExtraDelay: 1000
    },

    flash: {
      enabled: true,
      layerId: "hacked-flash-layer",
      startDelay: 0,
      spawnDuration: 600,
      holdDuration: 200,
      regularDecayDuration: 1000,
      count: null,
      densityDivisor: 9800,
      minCount: 32,
      maxCount: 220,
      spawnIntervalMin: 28,
      spawnIntervalMax: 56,
      batchMin: 3,
      batchMax: 6,
      outMin: 260,
      outMax: 460,

      finalCountMin: 1,
      finalCountMax: 2,
      finalDurationMin: 2000,
      finalDurationMax: 3000,
      finalBlinkMin: 6,
      finalBlinkMax: 12,
      finalHideMin: 80,
      finalHideMax: 260,
      finalShowMin: 90,
      finalShowMax: 320,
      finalReskinChance: 0.5,
      finalSwitchMin: 1,
      finalSwitchMax: 5,

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
      mixBlendMode: "screen",

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

  if (window.HackedSplash && typeof window.HackedSplash.destroy === "function") {
    try {
      window.HackedSplash.destroy();
    } catch (error) {
      reportError("previous instance destroy failed", error);
    }
  }

  let config = normalizeConfig(deepMerge({}, DEFAULT_CONFIG, getPreloadConfig()));

  const state = {
    destroyed: false,
    width: 0,
    height: 0,
    face: {
      started: false,
      running: false,
      layer: null,
      canvas: null,
      ctx: null,
      dpr: 1,
      cellW: 10,
      cellH: 14,
      cols: 0,
      rows: 0,
      cells: [],
      start: 0,
      lastFrame: 0,
      raf: 0,
      fadeRaf: 0,
      resizeTimer: 0,
      hardRemoveTimer: 0,
      timeouts: []
    },
    flash: {
      running: false,
      layer: null,
      start: 0,
      spawnTimer: 0,
      decayStarted: false,
      activeWords: [],
      timeouts: []
    }
  };

  function reportError(message, error) {
    if (window.console && window.console.error) {
      window.console.error("[HackedSplash] " + message, error);
    }
  }

  function cloneValue(value) {
    if (Array.isArray(value)) {
      return value.map(cloneValue);
    }

    if (value && typeof value === "object") {
      return deepMerge({}, value);
    }

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

    if (value.charAt(0) === "#") {
      value = value.slice(1);
    }

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

  function getPreloadConfig() {
    return window.HackedSplashConfig || window.hackedSplashConfig || {};
  }

  function now() {
    return window.performance && typeof window.performance.now === "function"
      ? window.performance.now()
      : Date.now();
  }

  function requestFrame(callback) {
    if (window.requestAnimationFrame) {
      return window.requestAnimationFrame(callback);
    }

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

  function shuffled(array) {
    const copy = array.slice();

    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      const current = copy[index];

      copy[index] = copy[swapIndex];
      copy[swapIndex] = current;
    }

    return copy;
  }

  function setModuleTimeout(moduleState, callback, delay) {
    const id = window.setTimeout(function () {
      removeModuleTimeout(moduleState, id);
      callback();
    }, Math.max(0, Number(delay) || 0));

    moduleState.timeouts.push(id);

    return id;
  }

  function removeModuleTimeout(moduleState, id) {
    const index = moduleState.timeouts.indexOf(id);

    if (index !== -1) {
      moduleState.timeouts.splice(index, 1);
    }
  }

  function clearModuleTimeouts(moduleState) {
    moduleState.timeouts.forEach(function (id) {
      window.clearTimeout(id);
    });

    moduleState.timeouts = [];
  }

  function setFaceTimeout(callback, delay) {
    return setModuleTimeout(state.face, callback, delay);
  }

  function setFlashTimeout(callback, delay) {
    return setModuleTimeout(state.flash, callback, delay);
  }

  function randomAscii() {
    return ASCII_PALETTE[Math.floor(Math.random() * ASCII_PALETTE.length)];
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

  function readViewport() {
    state.width = window.innerWidth || document.documentElement.clientWidth || 1024;
    state.height = window.innerHeight || document.documentElement.clientHeight || 768;
  }

  function hideElement(element) {
    if (!element) return;

    element.style.opacity = "0";
    element.style.visibility = "hidden";
    element.style.pointerEvents = "none";
  }

  function showElement(element) {
    if (!element) return;

    element.style.opacity = "1";
    element.style.visibility = "visible";
    element.style.pointerEvents = "none";
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
      "  overflow: hidden;",
      "  pointer-events: none;",
      "  opacity: 1;",
      "  visibility: visible;",
      "  background: #000;",
      "  contain: layout paint style;",
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
      "  overflow: hidden;",
      "  pointer-events: none;",
      "  contain: layout paint style;",
      "}",
      "#" + config.face.layerId + ".is-leaving {",
      "  pointer-events: none;",
      "}",
      ".hacked-splash__flash {",
      "  position: absolute;",
      "  left: var(--x);",
      "  top: var(--y);",
      "  transform: translate(-50%, -50%) rotate(var(--r)) scale(var(--settle));",
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
      "  mix-blend-mode: var(--blend-mode, screen);",
      "  text-shadow: 0 0 0.4em var(--glow), 0 0 1.2em var(--glow);",
      "  box-shadow: 0 0 0.5em var(--glow), inset 0 0 0.5em rgba(255,255,255,0.04);",
      "  pointer-events: none;",
      "  user-select: none;",
      "  will-change: opacity, transform;",
      "  contain: layout paint style;",
      "}",
      ".hacked-splash__flash.is-decaying {",
      "  opacity: 0;",
      "  visibility: hidden;",
      "}"
    ].join("\n");
  }

  function resolveLayerParent() {
    const parent = config.layerParent;

    if (parent && parent.nodeType === 1) return parent;
    if (typeof parent === "string" && parent !== "body") {
      return document.querySelector(parent) || document.body || document.documentElement;
    }

    return document.body || document.documentElement;
  }

  function ensureElementById(tagName, id, parent) {
    let element = document.getElementById(id);

    if (element) return element;
    if (!config.createLayers || !parent) return null;

    element = document.createElement(tagName);
    element.id = id;
    element.setAttribute("aria-hidden", "true");
    parent.appendChild(element);

    return element;
  }

  function clearFaceHardRemoveTimer() {
    if (state.face.hardRemoveTimer) {
      window.clearTimeout(state.face.hardRemoveTimer);
      state.face.hardRemoveTimer = 0;
    }
  }

  function clearFaceRuntimeTimers(clearHardTimer) {
    const face = state.face;

    cancelFrame(face.raf);
    cancelFrame(face.fadeRaf);
    window.clearTimeout(face.resizeTimer);
    clearModuleTimeouts(face);

    face.raf = 0;
    face.fadeRaf = 0;
    face.resizeTimer = 0;

    if (clearHardTimer !== false) {
      clearFaceHardRemoveTimer();
    }
  }

  function cleanupFace(options) {
    const opts = options || {};
    const shouldRemove = opts.remove !== false;
    const shouldClearHard = opts.clearHard !== false;
    const face = state.face;
    const layer = face.layer || document.getElementById(config.face.layerId);

    face.running = false;
    clearFaceRuntimeTimers(shouldClearHard);

    window.removeEventListener("resize", scheduleResizeFace);
    window.removeEventListener("orientationchange", scheduleResizeFace);

    if (layer) {
      layer.classList.remove("is-leaving");

      if (shouldRemove && layer.isConnected) {
        layer.remove();
      } else {
        hideElement(layer);
      }
    }

    face.layer = null;
    face.canvas = null;
    face.ctx = null;
    face.dpr = 1;
    face.cellW = 10;
    face.cellH = 14;
    face.cols = 0;
    face.rows = 0;
    face.cells = [];
    face.start = 0;
    face.lastFrame = 0;
    face.started = false;
  }

  function finishFace() {
    cleanupFace({ remove: config.removeLayersOnFinish !== false });
  }

  function scheduleFaceHardRemove(delay) {
    clearFaceHardRemoveTimer();

    state.face.hardRemoveTimer = window.setTimeout(function () {
      finishFace();
    }, Math.max(0, Number(delay) || 0));
  }

  function resolveFaceElements() {
    const parent = resolveLayerParent();
    const face = state.face;

    face.layer = ensureElementById("div", config.face.layerId, parent);

    if (!face.layer) return false;

    face.layer.setAttribute("aria-hidden", "true");
    face.layer.classList.remove("is-leaving");
    showElement(face.layer);

    face.canvas = document.getElementById(config.face.canvasId);

    if (!face.canvas && config.createLayers) {
      face.canvas = document.createElement("canvas");
      face.canvas.id = config.face.canvasId;
      face.layer.appendChild(face.canvas);
    } else if (face.canvas && face.canvas.parentNode !== face.layer) {
      face.layer.appendChild(face.canvas);
    }

    if (face.canvas && face.canvas.getContext) {
      try {
        face.ctx = face.canvas.getContext("2d", { alpha: false });
      } catch (error) {
        face.ctx = face.canvas.getContext("2d");
      }
    } else {
      face.ctx = null;
    }

    if (!face.ctx) {
      cleanupFace({ remove: true });
      return false;
    }

    return true;
  }

  function resizeFace() {
    const faceConfig = config.face;
    const face = state.face;

    if (!face.canvas || !face.ctx) return;

    readViewport();

    const viewportDpr = window.devicePixelRatio || 1;
    const mobileCap = state.width < faceConfig.mobileBreakpoint ? config.mobileDprMax : config.dprMax;
    const dprCap = Number.isFinite(Number(mobileCap)) ? Number(mobileCap) : config.dprMax;
    const pixelMax = Math.max(1, Number(config.canvasPixelMax) || 2500000);
    const areaDpr = Math.sqrt(pixelMax / Math.max(1, state.width * state.height));

    face.dpr = Math.max(1, Math.min(viewportDpr, dprCap, areaDpr));
    face.canvas.width = Math.ceil(state.width * face.dpr);
    face.canvas.height = Math.ceil(state.height * face.dpr);
    face.canvas.style.width = state.width + "px";
    face.canvas.style.height = state.height + "px";

    face.ctx.setTransform(face.dpr, 0, 0, face.dpr, 0, 0);
    face.ctx.textAlign = "left";
    face.ctx.textBaseline = "top";

    const scale = state.width < faceConfig.mobileBreakpoint ? faceConfig.mobileCellScale : 1;
    const minCell = state.width < faceConfig.mobileBreakpoint ? faceConfig.cellMinMobile : faceConfig.cellMin;

    face.cellW = clamp(Math.min(state.width / faceConfig.targetGridWidth, state.height / faceConfig.targetGridHeight) * scale, minCell, faceConfig.cellMax);
    face.cellH = face.cellW * 1.4;
    face.cols = Math.max(faceConfig.minCols, Math.floor(state.width / face.cellW));
    face.rows = Math.max(faceConfig.minRows, Math.floor(state.height / face.cellH));

    buildFaceGrid();
  }

  function scheduleResizeFace() {
    const face = state.face;

    window.clearTimeout(face.resizeTimer);

    face.resizeTimer = window.setTimeout(function () {
      resizeFace();
    }, 80);
  }

  function buildFaceGrid() {
    const face = state.face;
    const faceLines = pickFace();
    const faceH = faceLines.length;
    const faceW = faceLines[0] ? faceLines[0].length : 0;
    const offsetX = Math.floor((face.cols - faceW) / 2);
    const offsetY = Math.floor((face.rows - faceH) / 2);

    face.cells = [];

    for (let y = 0; y < face.rows; y += 1) {
      for (let x = 0; x < face.cols; x += 1) {
        face.cells.push({
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

        if (px < 0 || py < 0 || px >= face.cols || py >= face.rows) continue;

        const cell = face.cells[py * face.cols + px];

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
    const face = state.face;
    const dissolveStart = faceConfig.duration * faceConfig.dissolveStartRatio;
    const dissolveEnd = faceConfig.duration * faceConfig.dissolveEndRatio;
    const dissolveProgress = elapsed <= dissolveStart
      ? 0
      : clamp((elapsed - dissolveStart) / Math.max(1, dissolveEnd - dissolveStart), 0, 1);
    const frameFactor = clamp(deltaMs / 16.67, 0.35, 2.25);

    for (let index = 0; index < face.cells.length; index += 1) {
      const cell = face.cells[index];

      if (cell.gone) continue;

      if (elapsed >= cell.nextFlip) {
        if (cell.face) {
          if (elapsed < 170) {
            cell.char = randomAscii();
          } else {
            cell.char = Math.random() < 0.66 ? cell.base : randomAscii();
          }

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

        if (Math.random() < chance) {
          cell.gone = true;
        }
      }
    }
  }

  function drawFaceGrid() {
    const faceConfig = config.face;
    const face = state.face;
    const ctx = face.ctx;

    if (!ctx) return;

    ctx.clearRect(0, 0, state.width, state.height);
    ctx.fillStyle = faceConfig.backgroundColor;
    ctx.fillRect(0, 0, state.width, state.height);
    ctx.font = "700 " + face.cellW + "px " + faceConfig.fontFamily;

    for (let index = 0; index < face.cells.length; index += 1) {
      const cell = face.cells[index];

      if (cell.gone) continue;

      const px = cell.x * face.cellW;
      const py = cell.y * face.cellH;

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

  function drawFaceFrame(frameTime) {
    const face = state.face;

    if (!face.running || state.destroyed) return;

    if (!face.started) {
      face.started = true;
      face.start = frameTime;
      face.lastFrame = frameTime;

      clearFaceHardRemoveTimer();
      scheduleFaceHardRemove(
        config.face.duration +
        config.face.fadeDuration +
        config.face.failSafeExtraDelay
      );
    }

    const elapsed = frameTime - face.start;
    const deltaMs = face.lastFrame ? frameTime - face.lastFrame : 16.67;

    face.lastFrame = frameTime;

    try {
      updateFaceCells(elapsed, deltaMs);
      drawFaceGrid();
    } catch (error) {
      leaveFace();
      reportError("face draw failed", error);
      return;
    }

    if (elapsed < config.face.duration) {
      face.raf = requestFrame(drawFaceFrame);
    } else {
      leaveFace();
    }
  }

  function leaveFace() {
    const face = state.face;
    const layer = face.layer;
    const fadeDuration = Math.max(0, Number(config.face.fadeDuration) || 0);

    face.running = false;
    cancelFrame(face.raf);
    cancelFrame(face.fadeRaf);
    face.raf = 0;
    face.fadeRaf = 0;

    if (!layer || !layer.isConnected) {
      finishFace();
      return;
    }

    layer.classList.add("is-leaving");
    layer.style.setProperty("--hacked-face-fade", fadeDuration + "ms");

    if (fadeDuration <= 0) {
      finishFace();
      return;
    }

    const startedAt = now();

    const step = function (frameTime) {
      if (!layer.isConnected) return;

      const progress = clamp((frameTime - startedAt) / fadeDuration, 0, 1);

      layer.style.opacity = String(1 - progress);

      if (progress < 1) {
        face.fadeRaf = requestFrame(step);
      } else {
        finishFace();
      }
    };

    face.fadeRaf = requestFrame(step);
    scheduleFaceHardRemove(fadeDuration + 180);
  }

  function startFace(nextConfig) {
    if (nextConfig) {
      config = normalizeConfig(deepMerge(config, nextConfig));
    }

    cleanupFace({ remove: true });

    if (!config.face.enabled) return getConfig();
    if (!resolveFaceElements()) return getConfig();

    injectStyle();

    const face = state.face;

    state.destroyed = false;
    face.running = true;
    face.lastFrame = 0;

    try {
      resizeFace();
    } catch (error) {
      finishFace();
      reportError("face setup failed", error);
      return getConfig();
    }

    face.started = false;
    face.start = 0;
    face.lastFrame = 0;

    /* Draw one static frame immediately, so Android Chrome does not show
       an empty black canvas while waiting for the first rAF callback. */
    try {
      drawFaceGrid();
    } catch (error) {
      finishFace();
      reportError("face first draw failed", error);
      return getConfig();
    }

    /* Absolute safety cleanup. This is only a hard fallback.
       The real animation clock is anchored in the first rAF frame. */
    scheduleFaceHardRemove(
      config.face.duration +
      config.face.fadeDuration +
      config.face.failSafeExtraDelay +
      1600
    );

    window.addEventListener("resize", scheduleResizeFace, { passive: true });
    window.addEventListener("orientationchange", scheduleResizeFace, { passive: true });

    face.raf = requestFrame(drawFaceFrame);

    return getConfig();
  }

  function resolveFlashElements() {
    const parent = resolveLayerParent();
    const flash = state.flash;

    flash.layer = ensureElementById("div", config.flash.layerId, parent);

    if (!flash.layer) return false;

    flash.layer.textContent = "";
    flash.layer.setAttribute("aria-hidden", "true");
    showElement(flash.layer);

    return true;
  }

  function clearFlashRuntimeTimers() {
    const flash = state.flash;

    window.clearTimeout(flash.spawnTimer);
    clearModuleTimeouts(flash);

    flash.spawnTimer = 0;
  }

  function cleanupFlash(options) {
    const opts = options || {};
    const shouldRemove = opts.remove !== false;
    const flash = state.flash;
    const layer = flash.layer || document.getElementById(config.flash.layerId);

    flash.running = false;
    flash.decayStarted = false;
    clearFlashRuntimeTimers();

    if (layer) {
      if (shouldRemove && layer.isConnected) {
        layer.remove();
      } else {
        layer.textContent = "";
        hideElement(layer);
      }
    }

    flash.layer = null;
    flash.start = 0;
    flash.activeWords = [];
  }

  function finishFlash() {
    cleanupFlash({ remove: config.removeLayersOnFinish !== false });
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
    const flashConfig = config.flash;
    const fixed = flashConfig.count;

    if (fixed !== null && fixed !== undefined && fixed !== "") {
      const value = Number(fixed);

      if (Number.isFinite(value) && value >= 0) {
        return Math.floor(clamp(value, 0, flashConfig.maxCount));
      }
    }

    readViewport();

    const viewportLimit = Math.floor((state.width * state.height) / flashConfig.densityDivisor);

    return Math.min(flashConfig.maxCount, Math.max(flashConfig.minCount, viewportLimit));
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

  function applyFlashWordStyle(element, word) {
    const picked = word || pickFlashWord();
    const color = picked.color || "#ffffff";
    const glow = picked.glow || colorToGlow(color, config.flash.glowAlpha || 0.98);

    element.textContent = decorateFlashText(picked.text || "[SYS] SIGNAL LOST");
    element.style.setProperty("--color", color);
    element.style.setProperty("--glow", glow);
    element.style.setProperty("--blend-mode", config.flash.mixBlendMode || "screen");
  }

  function createFlashWord() {
    const flashConfig = config.flash;
    const flash = state.flash;

    if (!flash.layer || !flash.layer.isConnected) return null;
    if (flash.decayStarted) return null;
    if (flash.activeWords.length >= getFlashLimit()) return null;

    readViewport();

    const span = document.createElement("span");
    const scale = getFlashScale();
    const large = Math.random() < flashConfig.largeChance;
    const medium = !large && Math.random() < flashConfig.mediumChance;
    let size = 0;

    if (large) {
      size = clamp(state.width * rand(flashConfig.largeRatioMin, flashConfig.largeRatioMax) * scale, flashConfig.largeClampMin, flashConfig.largeClampMax);
    } else if (medium) {
      size = clamp(state.width * rand(flashConfig.mediumRatioMin, flashConfig.mediumRatioMax) * scale, flashConfig.mediumClampMin, flashConfig.mediumClampMax);
    } else {
      size = clamp(state.width * rand(flashConfig.smallRatioMin, flashConfig.smallRatioMax) * scale, flashConfig.smallClampMin, flashConfig.smallClampMax);
    }

    span.className = "hacked-splash__flash";
    span.style.setProperty("--x", rand(1, 99) + "%");
    span.style.setProperty("--y", rand(2, 98) + "%");
    span.style.setProperty("--r", rand(-20, 20) + "deg");
    span.style.setProperty("--size", size + "px");
    span.style.setProperty("--settle", String(rand(0.55, 0.95)));
    span.style.setProperty("--outdur", rand(flashConfig.outMin, flashConfig.outMax) + "ms");
    span.style.opacity = "1";
    span.style.visibility = "visible";

    applyFlashWordStyle(span);
    flash.activeWords.push(span);

    return span;
  }

  function addFlashBatch() {
    const fragment = document.createDocumentFragment();
    const count = randInt(config.flash.batchMin, config.flash.batchMax);

    for (let index = 0; index < count; index += 1) {
      const word = createFlashWord();

      if (word) {
        fragment.appendChild(word);
      }
    }

    if (fragment.childNodes.length && state.flash.layer && state.flash.layer.isConnected) {
      state.flash.layer.appendChild(fragment);
    }
  }

  function scheduleFlashSpawn() {
    const flash = state.flash;

    if (!flash.running || state.destroyed || flash.decayStarted) return;

    const elapsed = now() - flash.start;

    if (elapsed <= config.flash.startDelay + config.flash.spawnDuration) {
      if (elapsed >= config.flash.startDelay) {
        addFlashBatch();
      }

      if (flash.activeWords.length < getFlashLimit()) {
        flash.spawnTimer = window.setTimeout(scheduleFlashSpawn, rand(config.flash.spawnIntervalMin, config.flash.spawnIntervalMax));
      }
    }
  }

  function reskinFlashWord(element) {
    if (!element || !element.isConnected) return;

    applyFlashWordStyle(element);
  }

  function decayFlashWord(element) {
    const flash = state.flash;

    if (!element || !element.isConnected) return;

    element.classList.add("is-decaying");
    element.style.opacity = "0";
    element.style.visibility = "hidden";

    const index = flash.activeWords.indexOf(element);

    if (index !== -1) {
      flash.activeWords.splice(index, 1);
    }

    const outDur = parseFloat(element.style.getPropertyValue("--outdur")) || config.flash.outMax;

    setFlashTimeout(function () {
      if (element.isConnected) {
        element.remove();
      }
    }, outDur + 30);
  }

  function finalGlitchThenDecay(element, duration) {
    const flashConfig = config.flash;

    if (!element || !element.isConnected) return;

    const totalDuration = clamp(duration, flashConfig.finalDurationMin, flashConfig.finalDurationMax);
    const cycleCount = randInt(flashConfig.finalBlinkMin, flashConfig.finalBlinkMax);
    const forcedSwitchCount = randInt(flashConfig.finalSwitchMin, flashConfig.finalSwitchMax);
    const forcedSwitchSteps = [];
    let elapsed = 0;

    element.classList.remove("is-decaying");
    element.style.animation = "none";
    element.style.transition = "none";
    element.style.opacity = "1";
    element.style.visibility = "visible";
    element.style.filter = "contrast(1.15) saturate(1.15)";

    for (let index = 0; index < forcedSwitchCount; index += 1) {
      forcedSwitchSteps.push(randInt(0, Math.max(0, cycleCount - 1)));
    }

    for (let cycle = 0; cycle < cycleCount; cycle += 1) {
      const remaining = Math.max(0, totalDuration - elapsed);
      const averageRemaining = remaining / Math.max(1, cycleCount - cycle);
      const hideDuration = Math.min(rand(flashConfig.finalHideMin, flashConfig.finalHideMax), averageRemaining * 0.65);
      const showDuration = Math.min(rand(flashConfig.finalShowMin, flashConfig.finalShowMax), averageRemaining * 0.85);
      const hideAt = elapsed;
      const showAt = elapsed + hideDuration;
      const shouldForceSwitch = forcedSwitchSteps.indexOf(cycle) !== -1;
      const shouldRandomSwitch = Math.random() < flashConfig.finalReskinChance;

      setFlashTimeout(function () {
        if (!element || !element.isConnected) return;

        element.style.visibility = "hidden";
        element.style.opacity = "0";
      }, hideAt);

      setFlashTimeout(function () {
        if (!element || !element.isConnected) return;

        if (shouldForceSwitch || shouldRandomSwitch) {
          reskinFlashWord(element);
        }

        element.style.visibility = "visible";
        element.style.opacity = "1";
        element.style.filter = Math.random() < 0.5
          ? "contrast(1.35) saturate(1.35)"
          : "contrast(1.1) saturate(1.15)";
        element.style.transform =
          "translate(-50%, -50%) rotate(var(--r)) scale(" +
          rand(0.92, 1.06).toFixed(3) +
          ")";
      }, showAt);

      elapsed += hideDuration + showDuration;

      if (elapsed >= totalDuration) {
        break;
      }
    }

    setFlashTimeout(function () {
      if (!element || !element.isConnected) return;

      element.style.visibility = "visible";
      element.style.opacity = "1";
      element.style.filter = "";
      element.style.transition = "";
      element.style.animation = "";
      decayFlashWord(element);
    }, Math.max(totalDuration, elapsed) + rand(80, 180));
  }

  function beginFlashDecay() {
    const flashConfig = config.flash;
    const flash = state.flash;

    if (flash.decayStarted) return;

    flash.decayStarted = true;
    window.clearTimeout(flash.spawnTimer);
    flash.spawnTimer = 0;

    const queue = shuffled(flash.activeWords);

    if (!queue.length) {
      setFlashTimeout(finishFlash, flashConfig.regularDecayDuration);
      return;
    }

    const finalCount = Math.min(queue.length, randInt(flashConfig.finalCountMin, flashConfig.finalCountMax));
    const finalWords = queue.slice(-finalCount);
    const normalWords = queue.slice(0, Math.max(0, queue.length - finalCount));
    const finalDuration = rand(flashConfig.finalDurationMin, flashConfig.finalDurationMax);
    const finalStartDelay = flashConfig.regularDecayDuration + flashConfig.outMax + rand(180, 420);

    normalWords.forEach(function (element) {
      const delay = Math.pow(Math.random(), 0.78) * flashConfig.regularDecayDuration + rand(0, 90);

      setFlashTimeout(function () {
        decayFlashWord(element);
      }, delay);
    });

    finalWords.forEach(function (element, index) {
      const stagger = index * rand(160, 360);

      setFlashTimeout(function () {
        finalGlitchThenDecay(element, finalDuration + rand(-260, 260));
      }, finalStartDelay + stagger);
    });

    setFlashTimeout(
      finishFlash,
      finalStartDelay + finalDuration + flashConfig.outMax + 1200
    );
  }

  function startFlash(nextConfig) {
    if (nextConfig) {
      config = normalizeConfig(deepMerge(config, nextConfig));
    }

    cleanupFlash({ remove: true });

    if (!config.flash.enabled) return getConfig();
    if (!resolveFlashElements()) return getConfig();

    injectStyle();

    const flash = state.flash;

    state.destroyed = false;
    flash.running = true;
    flash.decayStarted = false;
    flash.activeWords = [];
    flash.start = now();

    scheduleFlashSpawn();

    setFlashTimeout(function () {
      beginFlashDecay();
    }, config.flash.startDelay + config.flash.spawnDuration + config.flash.holdDuration);

    return getConfig();
  }

  function start(nextConfig) {
    if (nextConfig) {
      config = normalizeConfig(deepMerge(config, nextConfig));
    }

    state.destroyed = false;

    if (config.face.enabled) {
      startFace();
    } else {
      cleanupFace({ remove: true });
    }

    if (config.flash.enabled) {
      startFlash();
    } else {
      cleanupFlash({ remove: true });
    }

    return getConfig();
  }

  function stop() {
    cleanupFace({ remove: true });
    cleanupFlash({ remove: true });

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

  function onReady() {
    if (!config.autoStart) return;

    start();
  }

  window.HackedSplash = {
    start: start,
    startFace: startFace,
    startFlash: startFlash,
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
