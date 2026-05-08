/*!
 * hacked-splash.js
 *
 * Introduction:
 *   Renders two independent effects: an ASCII face splash and floating alert words.
 *
 * Usage:
 *   Include this file on the page. It creates its own DOM layers and runs automatically.
 *   Default behavior can be customized by editing DEFAULT_CONFIG below.
 *   Runtime behavior can be customized before loading with window.HackedSplashConfig.
 *   Runtime behavior can be customized after loading with window.HackedSplash.updateConfig().
 *
 * Global API:
 *   window.HackedSplash.start(config)
 *   window.HackedSplash.startFace(config)
 *   window.HackedSplash.startFlash(config)
 *   window.HackedSplash.stop()
 *   window.HackedSplash.destroy()
 *   window.HackedSplash.updateConfig(config)
 *   window.HackedSplash.getConfig()
 *
 * Notes:
 *   No _include wrapper is required; required layers are created when absent.
 *   Existing #hacked-face-layer, #hacked-splash-canvas, and #hacked-flash-layer nodes are reused.
 *   The face and flash effects have separate timers and separate parameters.
 *   The face layer fades as a whole, including the black mask/background.
 *   Flash word count is controlled by flash.count or viewport-based density.
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
    autoStart: true, // Start both enabled effects automatically.
    injectStyle: true, // Inject required compact CSS.
    styleId: "hacked-splash-style", // Injected style element ID.
    createLayers: true, // Create required DOM layers when missing.
    layerParent: "body", // Parent for generated layers; use "body" or a selector string.
    respectReducedMotion: true, // Disable animation when prefers-reduced-motion is active.
    removeLayersOnFinish: true, // Remove effect layers after each effect finishes.
    dprMax: 2, // Maximum canvas DPR.
    mobileDprMax: 1.25, // Lower DPR cap on mobile/tablet to avoid canvas allocation failure.
    canvasPixelMax: 2500000, // Maximum internal canvas pixels before DPR is reduced.

    face: {
      enabled: true, // Enable ASCII face module.
      layerId: "hacked-face-layer", // Face layer containing black mask/background and canvas.
      canvasId: "hacked-splash-canvas", // Canvas for ASCII face.
      duration: 600, // Face drawing duration in ms.
      fadeDuration: 520, // Whole face module fade duration in ms.
      dissolveStartRatio: 0.42, // Ratio of duration when random disappearance begins.
      dissolveEndRatio: 0.92, // Ratio of duration when disappearance reaches full strength.
      mobileBreakpoint: 600, // Width below which face font shrinks.
      mobileCellScale: 0.72, // Face cell scaling on mobile.
      cellMin: 12, // Minimum desktop cell size.
      cellMinMobile: 8, // Minimum mobile cell size.
      cellMax: 25, // Maximum cell size.
      targetGridWidth: 155, // Virtual grid width.
      targetGridHeight: 82, // Virtual grid height.
      minCols: 52, // Minimum grid columns.
      minRows: 30, // Minimum grid rows.
      backgroundColor: "#000", // Canvas background color.
      faceBaseColor: "rgba(245,255,245,", // Stable face character color prefix.
      faceNoiseColor: "rgba(110,255,150,", // Noisy face character color prefix.
      backgroundNoiseColor: "rgba(30,170,70,", // Background noise color prefix.
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace", // Canvas font.
      failSafeExtraDelay: 1000 // Force face removal if RAF/canvas stalls on mobile.
    },

    flash: {
      enabled: true, // Enable floating alert words.
      layerId: "hacked-flash-layer", // Flash word layer.
      startDelay: 0, // Delay before flash generation starts.
      spawnDuration: 600, // Duration of flash word generation in ms.
      holdDuration: 200, // Extra hold time after generation before random decay.
      regularDecayDuration: 1000, // Random disappearance duration for normal words.
      count: null, // Fixed max word count; null means viewport-based.
      densityDivisor: 9800, // Larger means fewer viewport-based words.
      minCount: 32, // Minimum viewport-based count.
      maxCount: 220, // Hard maximum count.
      spawnIntervalMin: 28, // Minimum interval between batches.
      spawnIntervalMax: 56, // Maximum interval between batches.
      batchMin: 3, // Minimum words per batch.
      batchMax: 6, // Maximum words per batch.
      outMin: 260, // Minimum normal exit duration.
      outMax: 460, // Maximum normal exit duration.

      finalCountMin: 1, // Minimum number of final long-glitch words.
      finalCountMax: 3, // Maximum number of final long-glitch words.
      finalDurationMin: 2000, // Minimum final long-glitch duration.
      finalDurationMax: 4000, // Maximum final long-glitch duration.
      finalBlinkMin: 6, // Minimum final hide/show cycles.
      finalBlinkMax: 12, // Maximum final hide/show cycles.
      finalHideMin: 80, // Minimum hidden time per blink in ms.
      finalHideMax: 260, // Maximum hidden time per blink in ms.
      finalShowMin: 90, // Minimum visible time per blink in ms.
      finalShowMax: 320, // Maximum visible time per blink in ms.
      finalReskinChance: 0.45, // Chance to switch to another alert style when reappearing.
      finalSwitchMin: 1, // Minimum number of forced style/text switches.
      finalSwitchMax: 2, // Maximum number of forced style/text switches.

      mobileBreakpoint: 600, // Width below which flash font shrinks.
      mobileScale: 0.72, // Flash font scaling on mobile.
      largeChance: 0.06, // Probability of large flash words.
      mediumChance: 0.22, // Probability of medium flash words when not large.
      smallRatioMin: 0.01, // Small word viewport-width font ratio.
      smallRatioMax: 0.03, // Small word viewport-width font ratio.
      mediumRatioMin: 0.03, // Medium word viewport-width font ratio.
      mediumRatioMax: 0.04, // Medium word viewport-width font ratio.
      largeRatioMin: 0.06, // Large word viewport-width font ratio; 10% smaller than previous 0.07.
      largeRatioMax: 0.08, // Large word viewport-width font ratio; 10% smaller than previous 0.11.
      smallClampMin: 10, // Small word minimum px.
      smallClampMax: 26, // Small word maximum px.
      mediumClampMin: 20, // Medium word minimum px.
      mediumClampMax: 52, // Medium word maximum px.
      largeClampMin: 34, // Large word minimum px.
      largeClampMax: 86, // Large word maximum px; about 10% smaller than previous 96.
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace", // Flash word font.

      words: [
        { text: "[ALERT] INJECTION DETECTED", color: "#00ff66", glow: "rgba(0,255,102,0.98)" },
        { text: "[CRITICAL] CORE DUMPED", color: "#ff2a2a", glow: "rgba(255,42,42,0.98)" },
        { text: "[WARNING] MEMORY RUPTURED", color: "#ffd84a", glow: "rgba(255,216,74,0.98)" },
        { text: "[BREACH] CONTROL LOST", color: "#ffffff", glow: "rgba(255,255,255,0.98)" },
        { text: "[FAULT] SESSION SEIZED", color: "#ff4d4d", glow: "rgba(255,77,77,0.98)" },
        { text: "[SYS] ROOT PERMISSION TAKEN", color: "#00ff66", glow: "rgba(0,255,102,0.98)" }
      ] // Floating alert word pool.
    }
  };

  const ASCII_PALETTE = Array.from({ length: 94 }, function (_, index) {
    return String.fromCharCode(index + 33);
  });

  let config = deepMerge({}, DEFAULT_CONFIG, getPreloadConfig());

  const state = {
    destroyed: false,
    faceRunning: false,
    flashRunning: false,
    faceLayer: null,
    flashLayer: null,
    canvas: null,
    ctx: null,
    dpr: 1,
    width: 0,
    height: 0,
    cellW: 10,
    cellH: 14,
    cols: 0,
    rows: 0,
    cells: [],
    faceStart: 0,
    faceLastFrame: 0,
    faceRaf: 0,
    flashStart: 0,
    flashTimer: 0,
    resizeTimer: 0,
    flashDecayStarted: false,
    activeFlashWords: [],
    timeouts: []
  };

  /* Deep-merges plain objects; params: ...objects<object>. */
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
        } else if (value && typeof value === "object" && !Array.isArray(value)) {
          output[key] = deepMerge({}, value);
        } else {
          output[key] = value;
        }
      });
    });

    return output;
  }

  /* Returns optional preload config; params: none. */
  function getPreloadConfig() {
    return window.HackedSplashConfig || window.hackedSplashConfig || {};
  }

  /* Returns a random float; params: min<number>, max<number>. */
  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  /* Returns a random integer; params: min<number>, max<number>. */
  function randInt(min, max) {
    return Math.floor(rand(min, max + 1));
  }

  /* Clamps a number into a range; params: value<number>, min<number>, max<number>. */
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  /* Returns a random array item; params: array<Array>. */
  function sample(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /* Returns a shuffled array copy; params: array<Array>. */
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

  /* Tracks timeout for clean destroy; params: callback<Function>, delay<number>. */
  function setTrackedTimeout(callback, delay) {
    const id = window.setTimeout(function () {
      removeTimeout(id);
      callback();
    }, delay);

    state.timeouts.push(id);

    return id;
  }

  /* Removes timeout id from tracking; params: id<number>. */
  function removeTimeout(id) {
    const index = state.timeouts.indexOf(id);

    if (index !== -1) {
      state.timeouts.splice(index, 1);
    }
  }

  /* Clears tracked timeouts; params: none. */
  function clearTrackedTimeouts() {
    state.timeouts.forEach(function (id) {
      window.clearTimeout(id);
    });

    state.timeouts = [];
  }

  /* Checks reduced-motion preference; params: none. */
  function shouldReduceMotion() {
    return Boolean(
      config.respectReducedMotion &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  /* Returns one random ASCII character; params: none. */
  function randomAscii() {
    return ASCII_PALETTE[Math.floor(Math.random() * ASCII_PALETTE.length)];
  }

  /* Picks and normalizes one face; params: none. */
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

  /* Injects CSS for generated/reused layers; params: none. */
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
      "  background: #000;",
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
      "}",
      "#" + config.face.layerId + ".is-leaving {",
      "  pointer-events: none;",
      "  animation: hackedSplashFaceLeave var(--hacked-face-fade, 520ms) ease forwards;",
      "}",
      "#" + config.face.layerId + ".is-leaving #" + config.face.canvasId + " {",
      "  animation: hackedSplashFaceLeave var(--hacked-face-fade, 520ms) ease forwards;",
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
      "  mix-blend-mode: screen;",
      "  text-shadow: 0 0 0.4em var(--glow), 0 0 1.2em var(--glow);",
      "  box-shadow: 0 0 0.5em var(--glow), inset 0 0 0.5em rgba(255,255,255,0.04);",
      "  pointer-events: none;",
      "  user-select: none;",
      "  will-change: opacity, transform, filter;",
      "  animation: hackedSplashFlashIn var(--dur) steps(2, end) both;",
      "}",
      ".hacked-splash__flash.is-decaying {",
      "  animation: hackedSplashFlashOut var(--outdur) ease forwards;",
      "}",
      "@keyframes hackedSplashFaceLeave {",
      "  0% { opacity: 1; }",
      "  100% { opacity: 0; }",
      "}",
      "@keyframes hackedSplashFlashIn {",
      "  0% { opacity: 0; filter: contrast(2); transform: translate(-50%, -50%) rotate(var(--r)) scale(0.84); }",
      "  55% { opacity: 1; }",
      "  100% { opacity: 1; filter: contrast(1); transform: translate(-50%, -50%) rotate(var(--r)) scale(var(--settle)); }",
      "}",
      "@keyframes hackedSplashFlashOut {",
      "  0% { opacity: 1; filter: contrast(1.3); }",
      "  100% { opacity: 0; filter: contrast(2.2) blur(0.08em); transform: translate(-50%, -50%) rotate(var(--r)) scale(0.92); }",
      "}"
    ].join("\n");
  }

  /* Resolves parent for generated layers; params: none. */
  function resolveLayerParent() {
    const parent = config.layerParent;

    if (parent && parent.nodeType === 1) return parent;
    if (typeof parent === "string" && parent !== "body") {
      return document.querySelector(parent) || document.body || document.documentElement;
    }

    return document.body || document.documentElement;
  }

  /* Returns an existing element or creates it; params: tagName<string>, id<string>, parent<Element>. */
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

  /* Resolves or creates face DOM nodes; params: none. */
  function resolveFaceElements() {
    const parent = resolveLayerParent();

    state.faceLayer = ensureElementById("div", config.face.layerId, parent);

    if (!state.faceLayer) return false;

    state.faceLayer.setAttribute("aria-hidden", "true");
    state.canvas = document.getElementById(config.face.canvasId);

    if (!state.canvas && config.createLayers) {
      state.canvas = document.createElement("canvas");
      state.canvas.id = config.face.canvasId;
      state.faceLayer.appendChild(state.canvas);
    }

    if (state.canvas && state.canvas.getContext) {
      try {
        state.ctx = state.canvas.getContext("2d", { alpha: false, desynchronized: true }); // Faster opaque canvas path when supported.
      } catch (error) {
        state.ctx = state.canvas.getContext("2d"); // Compatibility fallback.
      }
    } else {
      state.ctx = null;
    }

    if (!state.ctx && config.createLayers && state.faceLayer && state.faceLayer.isConnected) {
      state.faceLayer.remove(); // Avoid a permanent black mask when canvas context creation fails.
    }

    return Boolean(state.faceLayer && state.canvas && state.ctx);
  }

  /* Resolves or creates flash DOM node; params: none. */
  function resolveFlashElements() {
    const parent = resolveLayerParent();

    state.flashLayer = ensureElementById("div", config.flash.layerId, parent);

    if (state.flashLayer) {
      state.flashLayer.setAttribute("aria-hidden", "true");
    }

    return Boolean(state.flashLayer);
  }

  /* Reads viewport size; params: none. */
  function readViewport() {
    state.width = window.innerWidth || document.documentElement.clientWidth || 1024;
    state.height = window.innerHeight || document.documentElement.clientHeight || 768;
  }

  /* Rebuilds face canvas and grid; params: none. */
  function resizeFace() {
    const face = config.face;

    if (!state.canvas || !state.ctx) return;

    readViewport();

    const viewportDpr = window.devicePixelRatio || 1;
    const mobileCap = state.width < face.mobileBreakpoint ? config.mobileDprMax : config.dprMax;
    const dprCap = Number.isFinite(Number(mobileCap)) ? Number(mobileCap) : config.dprMax;
    const pixelMax = Math.max(1, Number(config.canvasPixelMax) || 2500000);
    const areaDpr = Math.sqrt(pixelMax / Math.max(1, state.width * state.height));

    state.dpr = Math.max(1, Math.min(viewportDpr, dprCap, areaDpr)); // Prevent oversized mobile canvas.
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

    buildFaceGrid();
  }

  /* Debounces face resize; params: none. */
  function scheduleResizeFace() {
    window.clearTimeout(state.resizeTimer);

    state.resizeTimer = window.setTimeout(function () {
      resizeFace();
    }, 80);
  }

  /* Builds face/background cell data; params: none. */
  function buildFaceGrid() {
    const faceLines = pickFace();
    const faceH = faceLines.length;
    const faceW = faceLines[0] ? faceLines[0].length : 0;
    const offsetX = Math.floor((state.cols - faceW) / 2);
    const offsetY = Math.floor((state.rows - faceH) / 2);

    state.cells = [];

    for (let y = 0; y < state.rows; y += 1) {
      for (let x = 0; x < state.cols; x += 1) {
        state.cells.push({
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

        const cell = state.cells[py * state.cols + px];

        cell.face = true;
        cell.base = char;
        cell.char = Math.random() < 0.78 ? char : randomAscii();
        cell.gone = false;
        cell.nextFlip = rand(0, 24);
      }
    }
  }

  /* Updates face cells with original random disappearance logic; params: elapsed<number>, deltaMs<number>. */
  function updateFaceCells(elapsed, deltaMs) {
    const face = config.face;
    const dissolveStart = face.duration * face.dissolveStartRatio;
    const dissolveEnd = face.duration * face.dissolveEndRatio;
    const dissolveProgress = elapsed <= dissolveStart
      ? 0
      : clamp((elapsed - dissolveStart) / Math.max(1, dissolveEnd - dissolveStart), 0, 1);
    const frameFactor = clamp(deltaMs / 16.67, 0.35, 2.25);

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

  /* Draws face canvas; params: none. */
  function drawFaceGrid() {
    const face = config.face;
    const ctx = state.ctx;

    if (!ctx) return;

    ctx.clearRect(0, 0, state.width, state.height);
    ctx.fillStyle = face.backgroundColor;
    ctx.fillRect(0, 0, state.width, state.height);
    ctx.font = "700 " + state.cellW + "px " + face.fontFamily;

    for (let index = 0; index < state.cells.length; index += 1) {
      const cell = state.cells[index];

      if (cell.gone) continue;

      const px = cell.x * state.cellW;
      const py = cell.y * state.cellH;

      if (cell.face) {
        const isBase = cell.char === cell.base;
        const alpha = isBase ? rand(0.88, 1) : rand(0.52, 0.82);

        ctx.fillStyle = (isBase ? face.faceBaseColor : face.faceNoiseColor) + alpha + ")";
      } else {
        ctx.fillStyle = face.backgroundNoiseColor + rand(0.05, 0.16) + ")";
      }

      ctx.fillText(cell.char, px, py);
    }
  }

  /* Runs one face animation frame; params: now<number>. */
  function drawFaceFrame(now) {
    if (!state.faceRunning || state.destroyed) return;

    const elapsed = now - state.faceStart;
    const deltaMs = state.faceLastFrame ? now - state.faceLastFrame : 16.67;

    state.faceLastFrame = now;

    try {
      updateFaceCells(elapsed, deltaMs);
      drawFaceGrid();
    } catch (error) {
      leaveFace(); // Never leave the full-screen mask stuck after a drawing error.
      if (window.console && window.console.error) {
        window.console.error("[HackedSplash] face draw failed", error);
      }
      return;
    }

    if (elapsed < config.face.duration) {
      state.faceRaf = window.requestAnimationFrame(drawFaceFrame);
    } else {
      leaveFace();
    }
  }

  /* Fades and removes the whole face module; params: none. */
  function leaveFace() {
    state.faceRunning = false;
    window.cancelAnimationFrame(state.faceRaf);

    if (state.faceLayer && state.faceLayer.isConnected) {
      state.faceLayer.style.setProperty("--hacked-face-fade", config.face.fadeDuration + "ms");
      state.faceLayer.classList.add("is-leaving");
    }

    setTrackedTimeout(function () {
      if (config.removeLayersOnFinish && state.faceLayer && state.faceLayer.isConnected) {
        state.faceLayer.remove();
      }
    }, config.face.fadeDuration);
  }

  /* Starts only the face module; params: nextConfig<object>. */
  function startFace(nextConfig) {
    config = deepMerge(config, nextConfig || {});

    if (!config.face.enabled || shouldReduceMotion()) return getConfig();
    if (!resolveFaceElements()) return getConfig();

    injectStyle();

    state.destroyed = false;
    state.faceRunning = true;
    state.faceLastFrame = 0;

    try {
      resizeFace();
    } catch (error) {
      if (state.faceLayer && state.faceLayer.isConnected) {
        state.faceLayer.remove(); // Clean up if mobile canvas sizing fails before RAF starts.
      }
      if (window.console && window.console.error) {
        window.console.error("[HackedSplash] face setup failed", error);
      }
      return getConfig();
    }

    state.faceStart = performance.now();

    setTrackedTimeout(function () {
      if (state.faceRunning) {
        leaveFace(); // Failsafe for mobile RAF throttling or canvas stalls.
      }
    }, config.face.duration + config.face.fadeDuration + config.face.failSafeExtraDelay);

    window.addEventListener("resize", scheduleResizeFace, { passive: true });
    window.addEventListener("orientationchange", scheduleResizeFace, { passive: true });

    state.faceRaf = window.requestAnimationFrame(drawFaceFrame);

    return getConfig();
  }

  /* Decorates alert text; params: text<string>. */
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

  /* Returns max flash word count; params: none. */
  function getFlashLimit() {
    const flash = config.flash;
    const fixed = flash.count;

    if (fixed !== null && fixed !== undefined && fixed !== "") {
      const value = Number(fixed);

      if (Number.isFinite(value) && value >= 0) {
        return Math.floor(clamp(value, 0, flash.maxCount));
      }
    }

    readViewport();

    const viewportLimit = Math.floor((state.width * state.height) / flash.densityDivisor);

    return Math.min(flash.maxCount, Math.max(flash.minCount, viewportLimit));
  }

  /* Returns current flash mobile scale; params: none. */
  function getFlashScale() {
    readViewport();

    return state.width < config.flash.mobileBreakpoint ? config.flash.mobileScale : 1;
  }

  /* Creates one flash word; params: none. */
  function createFlashWord() {
    const flash = config.flash;

    if (!state.flashLayer || !state.flashLayer.isConnected) return null;
    if (state.flashDecayStarted) return null;
    if (state.activeFlashWords.length >= getFlashLimit()) return null;

    readViewport();

    const picked = sample(flash.words);
    const span = document.createElement("span");
    const scale = getFlashScale();
    const large = Math.random() < flash.largeChance;
    const medium = !large && Math.random() < flash.mediumChance;
    let size = 0;

    if (large) {
      size = clamp(state.width * rand(flash.largeRatioMin, flash.largeRatioMax) * scale, flash.largeClampMin, flash.largeClampMax);
    } else if (medium) {
      size = clamp(state.width * rand(flash.mediumRatioMin, flash.mediumRatioMax) * scale, flash.mediumClampMin, flash.mediumClampMax);
    } else {
      size = clamp(state.width * rand(flash.smallRatioMin, flash.smallRatioMax) * scale, flash.smallClampMin, flash.smallClampMax);
    }

    span.className = "hacked-splash__flash";
    span.textContent = decorateFlashText(picked.text);
    span.style.setProperty("--x", rand(1, 99) + "%");
    span.style.setProperty("--y", rand(2, 98) + "%");
    span.style.setProperty("--r", rand(-20, 20) + "deg");
    span.style.setProperty("--size", size + "px");
    span.style.setProperty("--dur", rand(90, 180) + "ms");
    span.style.setProperty("--settle", String(rand(0.55, 0.95)));
    span.style.setProperty("--outdur", rand(flash.outMin, flash.outMax) + "ms");
    span.style.setProperty("--color", picked.color);
    span.style.setProperty("--glow", picked.glow);

    state.activeFlashWords.push(span);

    return span;
  }

  /* Adds a flash word batch; params: none. */
  function addFlashBatch() {
    const fragment = document.createDocumentFragment();
    const count = randInt(config.flash.batchMin, config.flash.batchMax);

    for (let index = 0; index < count; index += 1) {
      const word = createFlashWord();

      if (word) {
        fragment.appendChild(word);
      }
    }

    if (fragment.childNodes.length && state.flashLayer && state.flashLayer.isConnected) {
      state.flashLayer.appendChild(fragment);
    }
  }

  /* Schedules flash word generation; params: none. */
  function scheduleFlashSpawn() {
    if (!state.flashRunning || state.destroyed || state.flashDecayStarted) return;

    const elapsed = performance.now() - state.flashStart;

    if (elapsed <= config.flash.startDelay + config.flash.spawnDuration) {
      if (elapsed >= config.flash.startDelay) {
        addFlashBatch();
      }

      if (state.activeFlashWords.length < getFlashLimit()) {
        state.flashTimer = window.setTimeout(scheduleFlashSpawn, rand(config.flash.spawnIntervalMin, config.flash.spawnIntervalMax));
      }
    }
  }

  /* Replaces one flash word style/text at same position; params: element<Element>. */
  function reskinFlashWord(element) {
    if (!element || !element.isConnected) return;

    const picked = sample(config.flash.words);

    element.textContent = decorateFlashText(picked.text);
    element.style.setProperty("--color", picked.color);
    element.style.setProperty("--glow", picked.glow);
  }

  /* Starts normal flash word disappearance; params: element<Element>. */
  function decayFlashWord(element) {
    if (!element || !element.isConnected) return;

    element.classList.add("is-decaying");

    const index = state.activeFlashWords.indexOf(element);

    if (index !== -1) {
      state.activeFlashWords.splice(index, 1);
    }

    const outDur = parseFloat(element.style.getPropertyValue("--outdur")) || config.flash.outMax;

    setTrackedTimeout(function () {
      if (element.isConnected) {
        element.remove();
      }
    }, outDur + 30);
  }

  /* Runs final hide/show blinking with optional reskin on reappearance; params: element<Element>, duration<number>. */
  function finalGlitchThenDecay(element, duration) {
    const flash = config.flash;

    if (!element || !element.isConnected) return;

    const totalDuration = clamp(duration, flash.finalDurationMin, flash.finalDurationMax);
    const cycleCount = randInt(flash.finalBlinkMin, flash.finalBlinkMax);
    const forcedSwitchCount = randInt(flash.finalSwitchMin, flash.finalSwitchMax);
    const forcedSwitchSteps = [];
    let elapsed = 0;

    element.classList.remove("is-decaying");
    element.style.animation = "none";
    element.style.opacity = "1";
    element.style.visibility = "visible";
    element.style.filter = "contrast(1.15) saturate(1.15)";
    element.style.transition = "none";

    for (let index = 0; index < forcedSwitchCount; index += 1) {
      forcedSwitchSteps.push(randInt(0, Math.max(0, cycleCount - 1)));
    }

    for (let cycle = 0; cycle < cycleCount; cycle += 1) {
      const remaining = Math.max(0, totalDuration - elapsed);
      const averageRemaining = remaining / Math.max(1, cycleCount - cycle);
      const hideDuration = Math.min(rand(flash.finalHideMin, flash.finalHideMax), averageRemaining * 0.65);
      const showDuration = Math.min(rand(flash.finalShowMin, flash.finalShowMax), averageRemaining * 0.85);
      const hideAt = elapsed;
      const showAt = elapsed + hideDuration;
      const shouldForceSwitch = forcedSwitchSteps.indexOf(cycle) !== -1;
      const shouldRandomSwitch = Math.random() < flash.finalReskinChance;

      setTrackedTimeout(function () {
        if (!element || !element.isConnected) return;

        element.style.visibility = "hidden";
        element.style.opacity = "0";
      }, hideAt);

      setTrackedTimeout(function () {
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

    setTrackedTimeout(function () {
      if (!element || !element.isConnected) return;

      element.style.visibility = "visible";
      element.style.opacity = "1";
      element.style.filter = "";
      element.style.transition = "";
      element.style.animation = "";
      decayFlashWord(element);
    }, Math.max(totalDuration, elapsed) + rand(80, 180));
  }

  /* Starts random flash word decay and preserves final glitch words for the visible ending; params: none. */
  function beginFlashDecay() {
    const flash = config.flash;

    if (state.flashDecayStarted) return;

    state.flashDecayStarted = true;
    window.clearTimeout(state.flashTimer);

    const queue = shuffled(state.activeFlashWords);

    if (!queue.length) {
      setTrackedTimeout(removeFlashLayer, flash.regularDecayDuration);
      return;
    }

    const finalCount = Math.min(queue.length, randInt(flash.finalCountMin, flash.finalCountMax));
    const finalWords = queue.slice(-finalCount);
    const normalWords = queue.slice(0, Math.max(0, queue.length - finalCount));
    const finalDuration = rand(flash.finalDurationMin, flash.finalDurationMax);
    const finalStartDelay = flash.regularDecayDuration + flash.outMax + rand(180, 420);

    normalWords.forEach(function (element) {
      const delay = Math.pow(Math.random(), 0.78) * flash.regularDecayDuration + rand(0, 90);

      setTrackedTimeout(function () {
        decayFlashWord(element);
      }, delay);
    });

    finalWords.forEach(function (element, index) {
      const stagger = index * rand(160, 360);

      setTrackedTimeout(function () {
        finalGlitchThenDecay(element, finalDuration + rand(-260, 260));
      }, finalStartDelay + stagger);
    });

    setTrackedTimeout(
      removeFlashLayer,
      finalStartDelay + finalDuration + flash.outMax + 1200
    );
  }

  /* Removes flash layer when configured; params: none. */
  function removeFlashLayer() {
    state.flashRunning = false;

    if (config.removeLayersOnFinish && state.flashLayer && state.flashLayer.isConnected) {
      state.flashLayer.remove();
    }
  }

  /* Starts only the flash module; params: nextConfig<object>. */
  function startFlash(nextConfig) {
    config = deepMerge(config, nextConfig || {});

    if (!config.flash.enabled || shouldReduceMotion()) return getConfig();
    if (!resolveFlashElements()) return getConfig();

    injectStyle();

    state.destroyed = false;
    state.flashRunning = true;
    state.flashDecayStarted = false;
    state.activeFlashWords = [];
    state.flashStart = performance.now();

    scheduleFlashSpawn();

    setTrackedTimeout(function () {
      beginFlashDecay();
    }, config.flash.startDelay + config.flash.spawnDuration + config.flash.holdDuration);

    return getConfig();
  }

  /* Starts both enabled modules; params: nextConfig<object>. */
  function start(nextConfig) {
    config = deepMerge(config, nextConfig || {});

    if (shouldReduceMotion()) {
      destroy();
      return getConfig();
    }

    if (config.face.enabled) {
      startFace();
    }

    if (config.flash.enabled) {
      startFlash();
    }

    return getConfig();
  }

  /* Stops timers and animation but keeps current DOM layers; params: none. */
  function stop() {
    state.faceRunning = false;
    state.flashRunning = false;

    window.cancelAnimationFrame(state.faceRaf);
    window.clearTimeout(state.flashTimer);
    window.clearTimeout(state.resizeTimer);
    clearTrackedTimeouts();

    window.removeEventListener("resize", scheduleResizeFace);
    window.removeEventListener("orientationchange", scheduleResizeFace);

    return getConfig();
  }

  /* Stops and removes splash layers; params: none. */
  function destroy() {
    stop();

    state.destroyed = true;
    state.cells = [];
    state.activeFlashWords = [];

    if (state.faceLayer && state.faceLayer.isConnected) {
      state.faceLayer.remove();
    }

    if (state.flashLayer && state.flashLayer.isConnected) {
      state.flashLayer.remove();
    }

    return getConfig();
  }

  /* Updates runtime config; params: nextConfig<object>. */
  function updateConfig(nextConfig) {
    config = deepMerge(config, nextConfig || {});

    if (config.injectStyle) {
      injectStyle();
    }

    return getConfig();
  }

  /* Returns active configuration; params: none. */
  function getConfig() {
    return deepMerge({}, config);
  }

  /* Runs automatic startup; params: none. */
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