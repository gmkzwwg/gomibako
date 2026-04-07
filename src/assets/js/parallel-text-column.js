/*!
 * parallel-text-columns.js
 *
 * 功能概述
 * -----------
 * 本脚本用于把 Markdown / Jekyll 页面中的正文内容，按“正文块 + 后续 blockquote”的规则，
 * 自动重组为 1-n 栏并列显示的紧凑布局，适合原文 / 译文 / 注释对照阅读。
 *
 * 已实现规则
 * -----------
 * 1. 正文块识别规则
 *    - 默认把 p / ul / ol / dl 识别为正文块起点。
 *    - 若某个段落 p 后紧跟列表 ul / ol / dl，则这些列表并入该段落，视为同一个正文块。
 *    - 若某处只有列表，则该列表（以及连续同级列表）视为一个正文块。
 *
 * 2. blockquote 并列规则
 *    - 若正文块后没有 blockquote，则该正文块独占一列。
 *    - 若正文块后紧跟 n 个 blockquote，则“正文块 + n 个 blockquote”并列显示为 n+1 列。
 *    - 适用于例如：
 *      正文中文 + blockquote 英文 + blockquote 法文
 *      正文中文 + blockquote 英文 + blockquote 重点词汇
 *
 * 3. 表格跳过规则
 *    - table 不参与并列处理。
 *    - table 后连续的 blockquote 也不参与并列处理，保持原样。
 *
 * 4. 分割线规则
 *    - 各列之间显示淡色、点状（dotline）分割线。
 *    - 分割线基于整节（整行）定位，高度按该节最高列计算，
 *      不再依赖某一栏自身高度。
 *
 * 5. 紧凑排版规则
 *    - 可统一设置正文、列表、blockquote 的字体大小。
 *    - 默认统一字号为 15px。
 *    - 统一字号只作用于：
 *        p / ul / ol / dl / li / blockquote
 *      不作用于：
 *        h1-h6 标题
 *    - 可选紧凑模式：
 *      去除上述正文、列表、blockquote 的 margin / padding / border，
 *      以得到更紧凑的对照布局。
 *
 * 6. 垂直对齐规则
 *    - 各列内容默认顶部对齐。
 *    - 可选把各栏内容在本节内部上下居中显示。
 *
 * 7. 响应式规则
 *    - 宽屏下按多列并列显示。
 *    - 窄屏下自动改为单列堆叠显示。
 *    - 窄屏下列间纵向分割线会自动变成横向分隔线。
 *
 * 可直接调用的方法
 * -----------------
 * 1. 初始化
 *    parallelTextColumns.init(options)
 *    - 初始化并扫描目标容器。
 *    - 若 autoEnable = true，则初始化后自动启用并列布局。
 *
 * 2. 启用并列布局
 *    parallelTextColumns.enable(target?)
 *    - 对指定容器或默认容器启用并列布局。
 *
 * 3. 恢复正常布局
 *    parallelTextColumns.disable(target?)
 *    - 取消并列布局，恢复原始文档顺序。
 *
 * 4. 切换布局
 *    parallelTextColumns.toggle(target?)
 *    - 在并列布局与正常布局之间切换。
 *
 * 5. 重新扫描并重建
 *    parallelTextColumns.refresh(target?)
 *    - 适用于页面内容动态变更后重新构建布局。
 *
 * 6. 绑定按钮切换
 *    parallelTextColumns.bindToggleButton(buttonTarget, containerTarget?)
 *    - 将按钮点击事件绑定为布局切换。
 *
 * 7. 动态设置字号
 *    parallelTextColumns.setFontSize(fontSize, target?)
 *    - 动态修改正文 / 列表 / blockquote 的统一字号。
 *
 * 8. 动态设置垂直对齐
 *    parallelTextColumns.setVerticalAlign(verticalAlign, target?)
 *    - 动态修改各栏内容上下对齐方式。
 *
 * 9. 动态设置列宽比例
 *    parallelTextColumns.setColumnRatios(columnRatios, target?)
 *    - 动态修改不同列数情况下的默认列宽比例。
 *
 * 10. 动态设置紧凑模式
 *    parallelTextColumns.setCompactText(compactText, target?)
 *    - 动态开启或关闭紧凑排版。
 *
 * 可定制参数
 * ----------
 * 以下参数可在 parallelTextColumns.init({...}) 中传入：
 *
 * 1. selectors
 *    类型：string[]
 *    默认：['.post-content', '.page-content', '.post-body', 'article .content', '.markdown-body']
 *    作用：指定需要扫描并处理的正文容器选择器。
 *
 * 2. autoEnable
 *    类型：boolean
 *    默认：true
 *    作用：初始化后是否自动启用并列布局。
 *
 * 3. includeHeadings
 *    类型：boolean
 *    默认：false
 *    作用：是否允许标题 h1-h6 参与“正文块”识别与并列布局。
 *    注意：即使开启，也不会自动修改标题字号。
 *
 * 4. skipSelectors
 *    类型：string[]
 *    默认：['table']
 *    作用：指定需要跳过并列处理的元素选择器。
 *    例如可扩展为 ['table', '.table-wrapper']。
 *
 * 5. bodyTags
 *    类型：string[]
 *    默认：['P', 'UL', 'OL', 'DL']
 *    作用：定义哪些标签可作为正文块起点。
 *
 * 6. headingTags
 *    类型：string[]
 *    默认：['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
 *    作用：在 includeHeadings = true 时，定义哪些标题标签参与布局。
 *
 * 7. fontSize
 *    类型：string | number
 *    默认：'15px'
 *    作用：统一设置 p / ul / ol / dl / li / blockquote 的字号。
 *    示例：15, '15px', '0.95rem'
 *
 * 8. compactText
 *    类型：boolean
 *    默认：true
 *    作用：是否启用紧凑模式。
 *    开启后会去掉正文、列表、blockquote 的 margin / padding / border。
 *
 * 9. verticalAlign
 *    类型：string
 *    默认：'start'
 *    可选值：'start' | 'center' | 'end'
 *    作用：控制各栏内容在本节内部的垂直对齐方式。
 *    - start  = 顶部对齐
 *    - center = 上下居中
 *    - end    = 底部对齐
 *
 * 10. columnGap
 *     类型：string | number
 *     默认：'0.85rem'
 *     作用：控制列与列之间的距离。
 *
 * 11. dividerInset
 *     类型：string | number
 *     默认：'0.1rem'
 *     作用：控制分割线距离本节顶部和底部的内缩量。
 *     数值越大，分割线越短。
 *
 * 12. dividerThickness
 *     类型：string | number
 *     默认：'1px'
 *     作用：控制分割线粗细。
 *
 * 13. columnRatios
 *     类型：object
 *     默认：
 *     {
 *       1: [1],
 *       2: [1, 1],
 *       3: [1, 1, 1],
 *       default: [1, 1, 1]
 *     }
 *     作用：按“列数”定义各栏默认宽度比例。
 *     示例：
 *     {
 *       2: [1.3, 1],
 *       3: [1.5, 1, 1],
 *       default: [1, 1, 1]
 *     }
 *
 * 14.  blockSpacing
 * “块之间的距离”控制的是正文容器里相邻直接子块的距离，所以会统一作用于：
 * 并列后的 ptc-row；未处理的 table；标题；其他直接子元素
 *
 *
 *
 * 使用示例
 * --------
 * parallelTextColumns.init({
 *   selectors: ['.post-content'],
 *   fontSize: '15px',
 *   compactText: true,
 *   verticalAlign: 'center',
 *   columnGap: '0.85rem',
 *   dividerInset: '0.1rem',
 *   dividerThickness: '1px',
 *   columnRatios: {
 *     2: [1.3, 1],
 *     3: [1.5, 1, 1],
 *     default: [1, 1, 1]
 *   }
 * });
 *
 * 备注
 * ----
 * - 本脚本按“正文容器的直接子元素”进行扫描与重组，不递归处理更深层级容器。
 * - 若页面内容由前端异步插入，应在插入完成后调用 refresh()。
 * - 若主题样式对列表、blockquote 有额外强覆盖，可能仍需少量 CSS 微调。
 */

(function () {
  "use strict";
  var STYLE_ID = "parallel-text-columns-style";
  var ROW_CLASS = "ptc-row";
  var COL_CLASS = "ptc-col";
  var DIVIDER_CLASS = "ptc-divider";
  var SCOPE_CLASS = "ptc-scope";
  var PROCESSED_ATTR = "data-ptc-enabled";
  var defaultOptions = {
    selectors: [
      ".post-content",
      ".page-content",
      ".post-body",
      "article .content",
      ".markdown-body",
    ],
    autoEnable: true,
    includeHeadings: false,
    skipSelectors: ["table"],
    bodyTags: ["P", "UL", "OL", "DL"],
    headingTags: ["H1", "H2", "H3", "H4", "H5", "H6"],
    fontSize: "15px",
    compactText: true,
    verticalAlign: "start",
    columnGap: "0.85rem",
    blockSpacing: "0.9rem",
    dividerInset: "0.1rem",
    dividerThickness: "1px",
    columnRatios: {
      1: [1],
      2: [1.7, 1],
      3: [1.7, 1, 1.3],
      default: [1.7, 1, 1.3],
    },
  };
  var state = {
    options: null,
    containers: [],
    resizeBound: false,
    resizeObserver: null,
  };
  function mergeOptions(userOptions) {
    var merged = Object.assign({}, defaultOptions, userOptions || {});
    merged.selectors = Array.isArray(merged.selectors)
      ? merged.selectors.slice()
      : [merged.selectors];
    merged.skipSelectors = Array.isArray(merged.skipSelectors)
      ? merged.skipSelectors.slice()
      : [merged.skipSelectors];
    merged.bodyTags = Array.isArray(merged.bodyTags)
      ? merged.bodyTags.slice()
      : [merged.bodyTags];
    merged.headingTags = Array.isArray(merged.headingTags)
      ? merged.headingTags.slice()
      : [merged.headingTags];
    merged.columnRatios = normalizeRatioMap(merged.columnRatios);
    merged.fontSize = normalizeSize(merged.fontSize || "15px");
    merged.columnGap = normalizeSize(merged.columnGap || "0.85rem");
    merged.blockSpacing = normalizeSize(merged.blockSpacing || "0.9rem");
    merged.dividerInset = normalizeSize(merged.dividerInset || "0.1rem");
    merged.dividerThickness = normalizeSize(merged.dividerThickness || "1px");
    merged.verticalAlign = normalizeVerticalAlign(merged.verticalAlign);
    return merged;
  }
  function normalizeRatioMap(input) {
    var result = {};
    if (Array.isArray(input)) {
      result.default = sanitizeRatios(input);
      if (!result.default.length) result.default = [1];
      if (!result[1]) result[1] = [1];
      if (!result[2]) result[2] = [1, 1];
      if (!result[3]) result[3] = [1, 1, 1];
      return result;
    }
    if (input && typeof input === "object") {
      Object.keys(input).forEach(function (key) {
        result[key] = sanitizeRatios(input[key]);
      });
    }
    if (!result.default) result.default = [1, 1, 1];
    if (!result[1]) result[1] = [1];
    if (!result[2]) result[2] = [1, 1];
    if (!result[3]) result[3] = [1, 1, 1];
    return result;
  }
  function sanitizeRatios(list) {
    if (!Array.isArray(list) || !list.length) return [1];
    return list.map(function (value) {
      var n = Number(value);
      return Number.isFinite(n) && n > 0 ? n : 1;
    });
  }
  function getRatiosForCount(count, options) {
    var ratioMap = (options && options.columnRatios) || {};
    var ratios =
      ratioMap[count] ||
      ratioMap[String(count)] ||
      ratioMap.default ||
      new Array(count).fill(1);
    ratios = sanitizeRatios(ratios).slice(0, count);
    while (ratios.length < count) {
      ratios.push(1);
    }
    return ratios;
  }
  function normalizeSize(value) {
    if (typeof value === "number") return value + "px";
    if (typeof value === "string" && value.trim()) return value.trim();
    return "15px";
  }
  function normalizeVerticalAlign(value) {
    var v = String(value || "start")
      .trim()
      .toLowerCase();
    if (v === "center" || v === "middle") return "center";
    if (v === "end" || v === "bottom") return "flex-end";
    return "flex-start";
  }
  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      "." + SCOPE_CLASS + " {",
      " --ptc-font-size: 15px;",
      " --ptc-gap: 0.85rem;",
      " --ptc-divider-inset: 0.1rem;",
      " --ptc-block-spacing: 0.9rem;",
      " --ptc-divider-thickness: 1px;",
      " --ptc-col-justify: flex-start;",
      "}",
      "." + SCOPE_CLASS + " p,",
      "." + SCOPE_CLASS + " ul,",
      "." + SCOPE_CLASS + " ol,",
      "." + SCOPE_CLASS + " dl,",
      "." + SCOPE_CLASS + " li,",
      "." + SCOPE_CLASS + " blockquote {",
      " font-size: var(--ptc-font-size) !important;",
      "}",
      "." + SCOPE_CLASS + '[data-ptc-compact="true"] p,',
      "." + SCOPE_CLASS + '[data-ptc-compact="true"] ul,',
      "." + SCOPE_CLASS + '[data-ptc-compact="true"] ol,',
      "." + SCOPE_CLASS + '[data-ptc-compact="true"] dl,',
      "." + SCOPE_CLASS + '[data-ptc-compact="true"] li,',
      "." + SCOPE_CLASS + '[data-ptc-compact="true"] blockquote {',
      " margin: 0 !important;",
      " padding: 0 !important;",
      " border: 0 !important;",
      "}",
      "." + SCOPE_CLASS + '[data-ptc-compact="true"] ul,',
      "." + SCOPE_CLASS + '[data-ptc-compact="true"] ol {',
      " list-style-position: inside;",
      "}",
      "." + SCOPE_CLASS + '[data-ptc-compact="true"] li > ul,',
      "." + SCOPE_CLASS + '[data-ptc-compact="true"] li > ol,',
      "." + SCOPE_CLASS + '[data-ptc-compact="true"] li > dl {',
      " margin-top: 0 !important;",
      " margin-bottom: 0 !important;",
      "}",
      "." +
        SCOPE_CLASS +
        '[data-ptc-compact="true"] blockquote > :first-child {',
      " margin-top: 0 !important;",
      "}",
      "." +
        SCOPE_CLASS +
        '[data-ptc-compact="true"] blockquote > :last-child {',
      " margin-bottom: 0 !important;",
      "}",
      "." + ROW_CLASS + " {",
      " display: grid;",
      " gap: var(--ptc-gap);",
      " align-items: stretch;",
      " position: relative;",
      " margin: 0 !important;",
      "}",
      "." + COL_CLASS + " {",
      " min-width: 0;",
      " position: relative;",
      " display: flex;",
      " flex-direction: column;",
      " justify-content: var(--ptc-col-justify);",
      " align-self: stretch;",
      "}",
      "." + COL_CLASS + " > :first-child { margin-top: 0 !important; }",
      "." + COL_CLASS + " > :last-child { margin-bottom: 0 !important; }",
      "." + DIVIDER_CLASS + " {",
      " position: absolute;",
      " pointer-events: none;",
      " opacity: 0.24;",
      " background: repeating-linear-gradient(",
      " to bottom,",
      " var(--ptc-divider-color, var(--theme-color, var(--accent-color, var(--primary-color, var(--link-color, currentColor))))) 0 2px,",
      " transparent 2px 6px",
      " );",
      "}",
      "@media (max-width: 900px) {",
      " ." + ROW_CLASS + " {",
      " grid-template-columns: 1fr !important;",
      " gap: 0.45rem;",
      " }",
      " ." + DIVIDER_CLASS + " {",
      " background: repeating-linear-gradient(",
      " to right,",
      " var(--ptc-divider-color, var(--theme-color, var(--accent-color, var(--primary-color, var(--link-color, currentColor))))) 0 2px,",
      " transparent 2px 6px",
      " );",
      " }",
      "}",
      "." + SCOPE_CLASS + " > * + * {",
      "  margin-top: var(--ptc-block-spacing) !important;",
      "}",
    ].join("\n");
    document.head.appendChild(style);
  }
  function normalizeContainerInput(target) {
    if (!target) return state.containers.slice();
    if (typeof target === "string")
      return Array.from(document.querySelectorAll(target));
    if (target instanceof Element) return [target];
    if (Array.isArray(target)) {
      return target.filter(function (item) {
        return item instanceof Element;
      });
    }
    return [];
  }
  function collectContainers(options) {
    var selectors = options.selectors || [];
    var seen = new Set();
    var found = [];
    selectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        if (!seen.has(el)) {
          seen.add(el);
          found.push(el);
        }
      });
    });
    return found;
  }
  function applyContainerVisualOptions(container, options) {
    container.classList.add(SCOPE_CLASS);
    container.style.setProperty("--ptc-font-size", options.fontSize || "15px");
    container.style.setProperty("--ptc-gap", options.columnGap || "0.85rem");
    container.style.setProperty('--ptc-block-spacing', options.blockSpacing || '0.9rem');
      container.style.setProperty(
      "--ptc-divider-inset",
      options.dividerInset || "0.1rem",
    );
    container.style.setProperty(
      "--ptc-divider-thickness",
      options.dividerThickness || "1px",
    );
    container.style.setProperty(
      "--ptc-col-justify",
      options.verticalAlign || "flex-start",
    );
    container.setAttribute(
      "data-ptc-compact",
      options.compactText ? "true" : "false",
    );
  }
  function isElement(node) {
    return node && node.nodeType === 1;
  }
  function tagName(node) {
    return isElement(node) ? node.tagName.toUpperCase() : "";
  }
  function isBlockquote(node) {
    return tagName(node) === "BLOCKQUOTE";
  }
  function isList(node) {
    var tag = tagName(node);
    return tag === "UL" || tag === "OL" || tag === "DL";
  }
  function isTableLike(node, options) {
    if (!isElement(node)) return false;
    if (tagName(node) === "TABLE") return true;
    return (options.skipSelectors || []).some(function (selector) {
      try {
        return node.matches(selector);
      } catch (err) {
        return false;
      }
    });
  }
  function isBodyStarter(node, options) {
    if (!isElement(node)) return false;
    var tag = tagName(node);
    if (options.bodyTags.indexOf(tag) !== -1) return true;
    if (options.includeHeadings && options.headingTags.indexOf(tag) !== -1)
      return true;
    return false;
  }
  function collectBodyBlock(children, startIndex, options) {
    var start = children[startIndex];
    var collected = [];
    if (!isBodyStarter(start, options)) return collected;
    collected.push(start);
    if (isList(start)) {
      var i = startIndex + 1;
      while (i < children.length && isList(children[i])) {
        collected.push(children[i]);
        i += 1;
      }
      return collected;
    }
    var j = startIndex + 1;
    while (j < children.length && isList(children[j])) {
      collected.push(children[j]);
      j += 1;
    }
    return collected;
  }
  function createColumn(nodes) {
    var col = document.createElement("div");
    col.className = COL_CLASS;
    nodes.forEach(function (node) {
      col.appendChild(node);
    });
    return col;
  }
  function createDivider() {
    var divider = document.createElement("div");
    divider.className = DIVIDER_CLASS;
    return divider;
  }
  function createRow(groups, options) {
    var row = document.createElement("div");
    row.className = ROW_CLASS;
    var ratios = getRatiosForCount(groups.length, options);
    row.setAttribute("data-ptc-cols", String(groups.length));
    row.setAttribute("data-ptc-ratios", ratios.join(","));
    row.style.gridTemplateColumns = ratios
      .map(function (ratio) {
        return "minmax(0, " + ratio + "fr)";
      })
      .join(" ");
    groups.forEach(function (group) {
      row.appendChild(createColumn(group));
    });
    for (var i = 1; i < groups.length; i += 1) {
      row.appendChild(createDivider());
    }
    return row;
  }
  function getDirectColumns(row) {
    return Array.from(row.children).filter(function (child) {
      return isElement(child) && child.classList.contains(COL_CLASS);
    });
  }
  function getDirectDividers(row) {
    return Array.from(row.children).filter(function (child) {
      return isElement(child) && child.classList.contains(DIVIDER_CLASS);
    });
  }
  function getGapPx(row) {
    var styles = window.getComputedStyle(row);
    var columnGap = parseFloat(styles.columnGap);
    if (Number.isFinite(columnGap)) return columnGap;
    var gap = parseFloat(styles.gap);
    if (Number.isFinite(gap)) return gap;
    return 0;
  }
  function isStackedLayout(columns) {
    if (columns.length < 2) return false;
    return Math.round(columns[1].offsetTop) > Math.round(columns[0].offsetTop);
  }
  function updateRowDividers(row) {
    if (!row || !row.isConnected) return;
    var columns = getDirectColumns(row);
    var dividers = getDirectDividers(row);
    if (columns.length <= 1) {
      dividers.forEach(function (divider) {
        divider.style.display = "none";
      });
      return;
    }
    var gapPx = getGapPx(row);
    var stacked = isStackedLayout(columns);
    var rowStyles = getComputedStyle(row);
    var thickness =
      rowStyles.getPropertyValue("--ptc-divider-thickness").trim() || "1px";
    var inset =
      rowStyles.getPropertyValue("--ptc-divider-inset").trim() || "0.1rem";
    dividers.forEach(function (divider, index) {
      divider.style.display = "block";
      if (stacked) {
        var nextCol = columns[index + 1];
        var top = nextCol.offsetTop - gapPx / 2;
        divider.style.left = "0";
        divider.style.right = "0";
        divider.style.top = top + "px";
        divider.style.bottom = "auto";
        divider.style.width = "auto";
        divider.style.height = thickness;
      } else {
        var nextColumn = columns[index + 1];
        var left = nextColumn.offsetLeft - gapPx / 2;
        divider.style.left = left + "px";
        divider.style.right = "auto";
        divider.style.top = inset;
        divider.style.bottom = inset;
        divider.style.width = thickness;
        divider.style.height = "auto";
      }
    });
  }
  function updateContainerDividers(container) {
    if (!container) return;
    Array.from(container.querySelectorAll("." + ROW_CLASS)).forEach(
      function (row) {
        updateRowDividers(row);
      },
    );
  }
  function observeRow(row) {
    if (!("ResizeObserver" in window)) return;
    if (!state.resizeObserver) {
      state.resizeObserver = new ResizeObserver(function (entries) {
        entries.forEach(function (entry) {
          updateRowDividers(entry.target);
        });
      });
    }
    state.resizeObserver.observe(row);
  }
  function unobserveRow(row) {
    if (state.resizeObserver && row) {
      state.resizeObserver.unobserve(row);
    }
  }
  function bindGlobalResize() {
    if (state.resizeBound) return;
    state.resizeBound = true;
    window.addEventListener("resize", function () {
      state.containers.forEach(function (container) {
        updateContainerDividers(container);
      });
    });
    window.addEventListener("load", function () {
      state.containers.forEach(function (container) {
        updateContainerDividers(container);
      });
    });
  }
  function rebuildContainer(container, options) {
    applyContainerVisualOptions(container, options);
    var children = Array.from(container.children);
    var fragment = document.createDocumentFragment();
    var i = 0;
    while (i < children.length) {
      var current = children[i];
      if (!isElement(current)) {
        i += 1;
        continue;
      }
      if (current.classList.contains(ROW_CLASS)) {
        fragment.appendChild(current);
        i += 1;
        continue;
      }
      if (isTableLike(current, options)) {
        fragment.appendChild(current);
        i += 1;
        while (i < children.length && isBlockquote(children[i])) {
          fragment.appendChild(children[i]);
          i += 1;
        }
        continue;
      }
      if (!isBodyStarter(current, options)) {
        fragment.appendChild(current);
        i += 1;
        continue;
      }
      var bodyNodes = collectBodyBlock(children, i, options);
      i += bodyNodes.length;
      var groups = [bodyNodes];
      while (i < children.length && isBlockquote(children[i])) {
        groups.push([children[i]]);
        i += 1;
      }
      fragment.appendChild(createRow(groups, options));
    }
    container.appendChild(fragment);
    container.setAttribute(PROCESSED_ATTR, "true");
    Array.from(container.querySelectorAll("." + ROW_CLASS)).forEach(
      function (row) {
        observeRow(row);
        updateRowDividers(row);
      },
    );
  }
  function restoreContainer(container) {
    if (!container.hasAttribute(PROCESSED_ATTR)) return;
    var nodes = Array.from(container.childNodes);
    var fragment = document.createDocumentFragment();
    nodes.forEach(function (node) {
      if (isElement(node) && node.classList.contains(ROW_CLASS)) {
        unobserveRow(node);
        Array.from(node.children).forEach(function (child) {
          if (isElement(child) && child.classList.contains(COL_CLASS)) {
            while (child.firstChild) {
              fragment.appendChild(child.firstChild);
            }
          }
        });
        node.remove();
      } else {
        fragment.appendChild(node);
      }
    });
    container.appendChild(fragment);
    container.removeAttribute(PROCESSED_ATTR);
  }
  function enable(target) {
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    containers.forEach(function (container) {
      if (!container) return;
      applyContainerVisualOptions(container, state.options);
      if (container.hasAttribute(PROCESSED_ATTR)) return;
      rebuildContainer(container, state.options);
    });
  }
  function disable(target) {
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    containers.forEach(function (container) {
      if (!container) return;
      applyContainerVisualOptions(container, state.options);
      restoreContainer(container);
    });
  }
  function toggle(target) {
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    containers.forEach(function (container) {
      if (!container) return;
      applyContainerVisualOptions(container, state.options);
      if (container.hasAttribute(PROCESSED_ATTR)) {
        restoreContainer(container);
      } else {
        rebuildContainer(container, state.options);
      }
    });
  }
  function init(userOptions) {
    state.options = mergeOptions(userOptions);
    ensureStyle();
    bindGlobalResize();
    state.containers = collectContainers(state.options);
    state.containers.forEach(function (container) {
      applyContainerVisualOptions(container, state.options);
    });
    if (state.options.autoEnable) {
      enable();
    }
    return api;
  }
  function refresh(target) {
    var containers = normalizeContainerInput(target);
    if (!containers.length) {
      state.containers = collectContainers(state.options || mergeOptions());
      containers = state.containers.slice();
    }
    containers.forEach(function (container) {
      applyContainerVisualOptions(container, state.options);
      if (container.hasAttribute(PROCESSED_ATTR)) {
        restoreContainer(container);
      }
      rebuildContainer(container, state.options);
      updateContainerDividers(container);
    });
  }
  function bindToggleButton(buttonTarget, containerTarget) {
    var buttons = normalizeContainerInput(buttonTarget);
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        toggle(containerTarget);
      });
    });
  }
  function setFontSize(fontSize, target) {
    state.options.fontSize = normalizeSize(fontSize);
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    containers.forEach(function (container) {
      container.classList.add(SCOPE_CLASS);
      container.style.setProperty("--ptc-font-size", state.options.fontSize);
      updateContainerDividers(container);
    });
  }
  function setVerticalAlign(verticalAlign, target) {
    state.options.verticalAlign = normalizeVerticalAlign(verticalAlign);
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    containers.forEach(function (container) {
      container.classList.add(SCOPE_CLASS);
      container.style.setProperty(
        "--ptc-col-justify",
        state.options.verticalAlign,
      );
      updateContainerDividers(container);
    });
  }
  function setColumnRatios(columnRatios, target) {
    state.options.columnRatios = normalizeRatioMap(columnRatios);
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    containers.forEach(function (container) {
      if (container.hasAttribute(PROCESSED_ATTR)) {
        restoreContainer(container);
        rebuildContainer(container, state.options);
      }
      updateContainerDividers(container);
    });
  }
  function setCompactText(compactText, target) {
    state.options.compactText = !!compactText;
    var containers = normalizeContainerInput(target);
    if (!containers.length) containers = state.containers.slice();
    containers.forEach(function (container) {
      container.setAttribute(
        "data-ptc-compact",
        state.options.compactText ? "true" : "false",
      );
      updateContainerDividers(container);
    });
  }
  var api = {
    init: init,
    enable: enable,
    disable: disable,
    toggle: toggle,
    refresh: refresh,
    bindToggleButton: bindToggleButton,
    setFontSize: setFontSize,
    setVerticalAlign: setVerticalAlign,
    setColumnRatios: setColumnRatios,
    setCompactText: setCompactText,
    setBlockSpacing: setBlockSpacing,
    classes: {
      row: ROW_CLASS,
      col: COL_CLASS,
      divider: DIVIDER_CLASS,
      scope: SCOPE_CLASS,
    },
  };
  window.parallelTextColumns = api;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      if (!state.options) init();
    });
  } else {
    init();
  }
})();

function setBlockSpacing(blockSpacing, target) {
  state.options.blockSpacing = normalizeSize(blockSpacing);

  var containers = normalizeContainerInput(target);
  if (!containers.length) containers = state.containers.slice();

  containers.forEach(function (container) {
    container.classList.add(SCOPE_CLASS);
    container.style.setProperty('--ptc-block-spacing', state.options.blockSpacing);
    updateContainerDividers(container);
  });
}