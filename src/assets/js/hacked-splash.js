(function () {
  const faceLayer = document.getElementById("hacked-face-layer");
  const flashLayer = document.getElementById("hacked-flash-layer");
  const canvas = document.getElementById("hacked-splash-canvas");

  if (!faceLayer || !flashLayer || !canvas) return;

  const ctx = canvas.getContext("2d");

  const ASCII_PALETTE = Array.from({ length: 94 }, (_, i) =>
    String.fromCharCode(i + 33),
  );

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

  const WORDS = [
    { text: "[ALERT] HACKED", color: "#00ff66", glow: "rgba(0,255,102,0.98)" },
    {
      text: "[ERROR] MEMORY CORRUPTION",
      color: "#ff2a2a",
      glow: "rgba(255,42,42,0.98)",
    },
    {
      text: "[WARNING] RISK INJECTION DETECTED",
      color: "#ffd84a",
      glow: "rgba(255,216,74,0.98)",
    },
    {
      text: "[CRITICAL] ROOT ACCESS OVERRIDE",
      color: "#ffffff",
      glow: "rgba(255,255,255,0.98)",
    },
    {
      text: "[FAULT] KERNEL HOOK DETECTED",
      color: "#ff4d4d",
      glow: "rgba(255,77,77,0.98)",
    },
    {
      text: "[SYS] UNAUTHORIZED PAYLOAD",
      color: "#00ff66",
      glow: "rgba(0,255,102,0.98)",
    },
  ];

  const TIMING = {
    total: 400, // 整个“脸部动画阶段”的总时长，单位毫秒；到这个时间后，脸层停止绘制并准备退场
    dissolveStart: 160, // 从第 150ms 开始，脸部字符和背景字符进入“随机消失”阶段
    fadeStart: 500, // 原本用于控制消失进度计算的后段时间点；通常应不小于 total，否则会出现时间逻辑不协调
    faceFade: 200, // 脸层开始退场后，淡出到完全消失所需的时间，单位毫秒
    flashTail: 1000, // 脸和黑背景消失后，FlashWord 还额外保留的时间，单位毫秒；之后再逐个慢慢消失
  };

  let dpr = 1;
  let width = 0;
  let height = 0;
  let cellW = 10;
  let cellH = 10;
  let cols = 0;
  let rows = 0;
  let cells = [];
  let startTime = 0;
  let rafId = 0;
  let flashDecayStarted = false;
  let activeFlashWords = [];

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = (Math.random() * (i + 1)) | 0;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function randomAscii() {
    return ASCII_PALETTE[(Math.random() * ASCII_PALETTE.length) | 0];
  }

  function pickFace() {
    const raw = FACE_LIBRARY[(Math.random() * FACE_LIBRARY.length) | 0];
    const maxLen = Math.max(...raw.map((line) => line.length));
    return raw.map((line) => line.padEnd(maxLen, " "));
  }

  function getFlashLimit() {
    return Math.min(2200, Math.max(700, Math.floor((width * height) / 2600)));
  }

  function resize() {
    dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.ceil(width * dpr);
    canvas.height = Math.ceil(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    cellW = clamp(Math.min(width / 155, height / 82), 12, 25);
    cellH = cellW * 1.1;

    cols = Math.max(56, Math.floor(width / cellW));
    rows = Math.max(32, Math.floor(height / cellH));

    buildGrid();
  }

  function buildGrid() {
    cells = [];

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        cells.push({
          x,
          y,
          face: false,
          base: " ",
          char: randomAscii(),
          gone: false,
          nextFlip: rand(0, 80),
        });
      }
    }

    const face = pickFace();
    const faceH = face.length;
    const faceW = face[0].length;

    const offsetX = Math.floor((cols - faceW) / 2);
    const offsetY = Math.floor((rows - faceH) / 2);

    for (let fy = 0; fy < faceH; fy += 1) {
      for (let fx = 0; fx < faceW; fx += 1) {
        const ch = face[fy][fx];
        if (ch === " ") continue;

        const px = offsetX + fx;
        const py = offsetY + fy;

        if (px < 0 || py < 0 || px >= cols || py >= rows) continue;

        const cell = cells[py * cols + px];
        cell.face = true;
        cell.base = ch;
        cell.char = Math.random() < 0.78 ? ch : randomAscii();
        cell.gone = false;
        cell.nextFlip = rand(0, 24);
      }
    }
  }

  function updateCells(elapsed) {
    const dissolveProgress =
      elapsed <= TIMING.dissolveStart
        ? 0
        : clamp(
            (elapsed - TIMING.dissolveStart) /
              (TIMING.fadeStart - TIMING.dissolveStart),
            0,
            1,
          );

    for (let i = 0; i < cells.length; i += 1) {
      const cell = cells[i];

      if (!cell.gone && elapsed >= cell.nextFlip) {
        if (cell.face) {
          if (elapsed < 170) {
            cell.char = randomAscii();
          } else {
            cell.char = Math.random() < 0.66 ? cell.base : randomAscii();
          }
          cell.nextFlip += rand(16, 58);
        } else {
          cell.char = randomAscii();
          cell.nextFlip += rand(36, 120);
        }
      }

      if (!cell.gone && elapsed > TIMING.dissolveStart) {
        const chance = cell.face
          ? 0.004 + dissolveProgress * 0.07
          : 0.0008 + dissolveProgress * 0.012;

        if (Math.random() < chance) {
          cell.gone = true;
        }
      }
    }
  }

  function drawGrid() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    ctx.font =
      `700 ${cellW}px ui-monospace, SFMono-Regular, Menlo, Monaco, ` +
      `Consolas, "Courier New", monospace`;

    for (let i = 0; i < cells.length; i += 1) {
      const cell = cells[i];
      if (cell.gone) continue;

      const px = cell.x * cellW;
      const py = cell.y * cellH;

      if (cell.face) {
        const isBase = cell.char === cell.base;
        const alpha = isBase ? rand(0.88, 1.0) : rand(0.52, 0.82);

        if (isBase) {
          ctx.fillStyle = `rgba(245,255,245,${alpha})`;
        } else {
          ctx.fillStyle = `rgba(110,255,150,${alpha})`;
        }
      } else {
        const alpha = rand(0.06, 0.22);
        ctx.fillStyle = `rgba(30,170,70,${alpha})`;
      }

      ctx.fillText(cell.char, px, py);
    }
  }

  function decorateFlashText(text) {
    const variants = [
      `//// ${text} ////`,
      `//// ${text} :: ${Math.floor(Math.random() * 9999)
        .toString(16)
        .toUpperCase()} ////`,
      `//// ${text} :: 0x${Math.floor(Math.random() * 65535)
        .toString(16)
        .toUpperCase()} ////`,
      `//// ${text} :: /SYS/CORE ////`,
      `//// ${text} :: PROC-FAIL ////`,
    ];

    return variants[(Math.random() * variants.length) | 0];
  }

  function createFlashWord() {
    if (!flashLayer.isConnected) return;
    if (flashDecayStarted) return;
    if (activeFlashWords.length >= getFlashLimit()) return;

    const picked = WORDS[(Math.random() * WORDS.length) | 0];
    const span = document.createElement("span");
    span.className = "hacked-splash__flash";
    span.textContent = decorateFlashText(picked.text);

    const large = Math.random() < 0.08;
    const medium = !large && Math.random() < 0.24;

    let size;
    if (large) {
      size = clamp(width * rand(0.08, 0.13), 56, 120);
    } else if (medium) {
      size = clamp(width * rand(0.03, 0.06), 24, 60);
    } else {
      size = clamp(width * rand(0.012, 0.028), 12, 30);
    }

    span.style.setProperty("--x", `${rand(1, 99)}%`);
    span.style.setProperty("--y", `${rand(2, 98)}%`);
    span.style.setProperty("--r", `${rand(-20, 20)}deg`);
    span.style.setProperty("--size", `${size}px`);
    span.style.setProperty("--dur", `${rand(90, 180)}ms`);
    span.style.setProperty("--settle", `${rand(0.55, 0.95)}`);
    span.style.setProperty("--outdur", `${rand(260, 420)}ms`);
    span.style.setProperty("--color", picked.color);
    span.style.setProperty("--glow", picked.glow);

    flashLayer.appendChild(span);
    activeFlashWords.push(span);
  }

  function flashAddLoop() {
    if (!flashLayer.isConnected) return;
    if (flashDecayStarted) return;

    const elapsed = performance.now() - startTime;
    if (elapsed > TIMING.fadeStart) return;

    let count;
    const roll = Math.random();

    if (roll < 0.18) {
      count = 20;
    } else if (roll < 0.45) {
      count = 16;
    } else if (roll < 0.78) {
      count = 12;
    } else {
      count = 8;
    }

    for (let i = 0; i < count; i += 1) {
      createFlashWord();
    }

    window.setTimeout(flashAddLoop, rand(6, 14));
  }

  function decayFlashWord(el) {
    if (!el || !el.isConnected) return;

    el.classList.add("is-decaying");

    const idx = activeFlashWords.indexOf(el);
    if (idx !== -1) {
      activeFlashWords.splice(idx, 1);
    }

    const outDur = parseFloat(el.style.getPropertyValue("--outdur")) || 320;

    window.setTimeout(() => {
      el.remove();
    }, outDur + 20);
  }

  function beginFlashDecay() {
    if (flashDecayStarted) return;
    flashDecayStarted = true;

    const queue = shuffle(activeFlashWords.slice());
    const total = TIMING.flashTail;

    if (queue.length === 0) {
      window.setTimeout(() => {
        if (flashLayer.isConnected) flashLayer.remove();
      }, total);
      return;
    }

    queue.forEach((el, index) => {
      const progress = queue.length === 1 ? 1 : index / (queue.length - 1);

      // 先快后慢：前面大量挤在前半段，后面越来越稀
      const eased = Math.pow(progress, 2);

      const delay = eased * total + rand(0, 40);

      window.setTimeout(() => {
        decayFlashWord(el);
      }, delay);
    });

    window.setTimeout(() => {
      if (flashLayer.isConnected) flashLayer.remove();
    }, total + 500);
  }

  function leaveFaceLayer() {
    cancelAnimationFrame(rafId);
    faceLayer.classList.add("is-leaving");

    window.setTimeout(() => {
      if (faceLayer.isConnected) {
        faceLayer.remove();
      }
      beginFlashDecay();
    }, TIMING.faceFade);
  }

  function drawFrame(now) {
    const elapsed = now - startTime;

    updateCells(elapsed);
    drawGrid();

    if (elapsed < TIMING.total) {
      rafId = requestAnimationFrame(drawFrame);
    } else {
      leaveFaceLayer();
    }
  }

  function start() {
    resize();
    startTime = performance.now();
    rafId = requestAnimationFrame(drawFrame);
    flashAddLoop();
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("orientationchange", resize);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
