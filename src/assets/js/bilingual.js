/* bilingual-toggle.js
 *
 * 更新点：
 * 1) 可在 JS 配置是否显示“单独按钮”（showButton，默认 true）。
 *    - showButton=false：目标标签彻底隐藏（display:none），不插入任何按钮。
 * 2) toggle 按钮在目标标签外（作为其外层 wrapper 的第一个子节点），点击直接展开/隐藏整个标签。
 * 3) JS 一加载（DOM ready 后）默认把所有目标标签隐藏；若 showButton=true 则留下展开按钮。
 *
 * 用法（head 中也可）：
 *   <script>
 *     window.BilingualToggleConfig = {
 *       selector: "blockquote",      // 目标选择器
 *       defaultCollapsed: true,      // 默认折叠（你的需求）
 *       showButton: true,            // 默认显示按钮；false 则彻底隐藏
 *       buttonIndentEm: 1.4          // 按钮占位缩进（展开时给标签补的左内边距，单位 em）
 *     };
 *   </script>
 *   <script src="/assets/bilingual-toggle.js"></script>
 *
 * API：
 *   BilingualToggle.expandAll()
 *   BilingualToggle.collapseAll()
 *   BilingualToggle.toggleAll()
 *   BilingualToggle.toggle(el)        // el 可为目标元素或其外层 wrapper
 *   BilingualToggle.refresh()         // 动态内容再扫描
 */

(function (w, d) {
  "use strict";

  var DEFAULTS = {
    selector: "blockquote",
    defaultCollapsed: true,

    // 新增：是否显示外置按钮
    showButton: false,

    collapsedText: "▸",
    expandedText: "▾",

    // 外置按钮不占行：用绝对定位叠在目标标签左上角，并给目标标签增加左内边距避让
    buttonIndentEm: 1.4,

    // 折叠时尽量去掉常见缩进/边框（不同主题差异大）
    stripStyleWhenCollapsed: true,

    styleId: "bilingual-toggle-style"
  };

  var state = {
    inited: false,
    options: null
  };

  function assign(a, b) {
    var o = {};
    var k;
    for (k in a) o[k] = a[k];
    if (b) for (k in b) o[k] = b[k];
    return o;
  }

  function onReady(fn) {
    if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", fn, { once: true });
    else fn();
  }

  function injectStyle(id, cssText) {
    if (d.getElementById(id)) return;
    var style = d.createElement("style");
    style.id = id;
    style.type = "text/css";
    style.appendChild(d.createTextNode(cssText));
    d.head.appendChild(style);
  }

  function buildCSS(opts) {
    var strip = opts.stripStyleWhenCollapsed ? 1 : 0;
    var indent = Number(opts.buttonIndentEm);
    if (!isFinite(indent) || indent < 0) indent = 1.4;

    return (
      "/* bilingual-toggle injected css */\n" +
      ".bt-wrap{position:relative;}\n" +
      ".bt-wrap .bt-toggle{" +
        "appearance:none;-webkit-appearance:none;border:0;background:transparent;" +
        "padding:0;margin:0;cursor:pointer;font:inherit;line-height:1;" +
        "display:inline-block;" +
      "}\n" +
      ".bt-wrap .bt-toggle:focus{outline:2px solid currentColor;outline-offset:2px;}\n" +

      /* 按钮外置：叠在目标标签左上角，不单独占一行（不额外推高内容行） */
      ".bt-wrap.bt-has-button>.bt-toggle{" +
        "position:absolute;left:0;top:0;" +
      "}\n" +
      ".bt-wrap.bt-has-button>.bt-target{" +
        "padding-left:" + indent + "em !important;" +
      "}\n" +

      /* 折叠：隐藏整个标签，只留按钮 */
      ".bt-target.bt-collapsed{display:none !important;}\n" +
      ".bt-wrap.bt-collapsed>.bt-target{display:none !important;}\n" +

      /* 若不显示按钮：彻底隐藏（同样用 bt-collapsed 控制） */
      ".bt-target.bt-fully-hidden{display:none !important;}\n" +

      (strip
        ? ".bt-wrap.bt-collapsed{margin:0 !important;padding:0 !important;}\n" +
          ".bt-wrap.bt-collapsed>.bt-toggle{position:static !important;}\n"
        : "")
    );
  }

  function makeButton() {
    var btn = d.createElement("button");
    btn.type = "button";
    btn.className = "bt-toggle";
    btn.textContent = "";
    return btn;
  }

  function getWrapAndTarget(el) {
    if (!el || el.nodeType !== 1) return null;

    if (el.classList.contains("bt-wrap")) {
      var t = el.querySelector(":scope > .bt-target") || el.querySelector(".bt-target");
      return t ? { wrap: el, target: t } : null;
    }

    if (el.classList.contains("bt-target")) {
      var p = el.parentElement;
      if (p && p.classList.contains("bt-wrap")) return { wrap: p, target: el };
      return { wrap: null, target: el };
    }

    return null;
  }

  function setButtonState(btn, collapsed, opts) {
    if (!btn) return;
    if (collapsed) {
      btn.textContent = opts.collapsedText;
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Expand");
    } else {
      btn.textContent = opts.expandedText;
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Collapse");
    }
  }

  function setCollapsedByTarget(targetEl, collapsed, opts) {
    if (!targetEl) return;

    var info = getWrapAndTarget(targetEl);
    var wrap = info ? info.wrap : null;
    var target = info ? info.target : targetEl;

    if (collapsed) target.classList.add("bt-collapsed");
    else target.classList.remove("bt-collapsed");

    if (wrap) {
      if (collapsed) wrap.classList.add("bt-collapsed");
      else wrap.classList.remove("bt-collapsed");

      var btn = wrap.querySelector(":scope > .bt-toggle");
      setButtonState(btn, collapsed, opts);
    }
  }

  function toggleOne(el, opts) {
    var info = getWrapAndTarget(el);
    if (!info) return;
    var target = info.target;
    var collapsed = target.classList.contains("bt-collapsed");
    setCollapsedByTarget(target, !collapsed, opts);
  }

  function processOne(targetEl, opts) {
    if (!targetEl || targetEl.nodeType !== 1) return;
    if (targetEl.getAttribute("data-bt") === "0") return;
    if (targetEl.getAttribute("data-bt-skip") === "1") return;
    if (targetEl.getAttribute("data-bt-processed") === "1") return;

    targetEl.setAttribute("data-bt-processed", "1");
    targetEl.classList.add("bt-target");

    // 初始折叠状态：允许 data-bt-default="expanded|collapsed" 覆盖
    var override = targetEl.getAttribute("data-bt-default");
    var startCollapsed = opts.defaultCollapsed;
    if (override === "expanded") startCollapsed = false;
    if (override === "collapsed") startCollapsed = true;

    // showButton=false：彻底隐藏，不插按钮、不包 wrapper
    if (!opts.showButton || targetEl.getAttribute("data-bt-button") === "0") {
      if (startCollapsed) {
        targetEl.classList.add("bt-fully-hidden");
      } else {
        targetEl.classList.remove("bt-fully-hidden");
      }
      // 仍允许 API 后续控制：用 bt-collapsed 来切换显示
      if (startCollapsed) targetEl.classList.add("bt-collapsed");
      else targetEl.classList.remove("bt-collapsed");
      return;
    }

    // showButton=true：创建 wrapper，把按钮放在标签外，并能控制整个标签的 display
    var wrap = d.createElement("span");
    wrap.className = "bt-wrap bt-has-button";

    var btn = makeButton();

    // 将 wrapper 插入到 targetEl 原位置，并把 targetEl 移入 wrapper
    var parent = targetEl.parentNode;
    if (!parent) return;
    parent.insertBefore(wrap, targetEl);
    wrap.appendChild(btn);
    wrap.appendChild(targetEl);

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      toggleOne(wrap, opts);
    });

    // 初始状态
    if (startCollapsed) {
      wrap.classList.add("bt-collapsed");
      targetEl.classList.add("bt-collapsed");
      setButtonState(btn, true, opts);
    } else {
      wrap.classList.remove("bt-collapsed");
      targetEl.classList.remove("bt-collapsed");
      setButtonState(btn, false, opts);
    }
  }

  function scanAndProcess(opts) {
    var nodes = d.querySelectorAll(opts.selector);
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      processOne(el, opts);
    }
  }

  function ensureInit() {
    if (!state.inited) init();
  }

  function getProcessedTargets(selectorOverride) {
    var sel = selectorOverride || (state.options ? state.options.selector : DEFAULTS.selector);
    var nodes = d.querySelectorAll(sel);
    var out = [];
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].getAttribute("data-bt-processed") === "1") out.push(nodes[i]);
    }
    return out;
  }

  function init(userOptions) {
    var cfg = w.BilingualToggleConfig || null;
    state.options = assign(DEFAULTS, assign(cfg || {}, userOptions || {}));

    if (!d.head) return;

    injectStyle(state.options.styleId, buildCSS(state.options));
    scanAndProcess(state.options);

    // 初始化时按需求默认折叠（若用户配置 defaultCollapsed=true）
    state.inited = true;
  }

  w.BilingualToggle = {
    init: function (options) { init(options); },

    refresh: function () {
      ensureInit();
      scanAndProcess(state.options);
    },

    toggle: function (el) {
      ensureInit();
      if (!el) return;

      // 允许传入：目标元素 / wrapper / CSS 选择器字符串（取第一个匹配）
      if (typeof el === "string") {
        var found = d.querySelector(el);
        if (!found) return;
        el = found;
      }

      // 若是目标元素但未处理，先处理（便于直接 toggle 某个 blockquote）
      if (el.nodeType === 1 && el.matches && el.matches(state.options.selector)) {
        if (el.getAttribute("data-bt-processed") !== "1") processOne(el, state.options);
      }

      toggleOne(el, state.options);
    },

    expandAll: function (selectorOverride) {
      ensureInit();
      var els = getProcessedTargets(selectorOverride);
      for (var i = 0; i < els.length; i++) {
        els[i].classList.remove("bt-fully-hidden");
        setCollapsedByTarget(els[i], false, state.options);
      }
    },

    collapseAll: function (selectorOverride) {
      ensureInit();
      var els = getProcessedTargets(selectorOverride);
      for (var i = 0; i < els.length; i++) {
        // showButton=false 时也要“彻底隐藏”
        if (!state.options.showButton) els[i].classList.add("bt-fully-hidden");
        setCollapsedByTarget(els[i], true, state.options);
      }
    },

    toggleAll: function (selectorOverride, expandIfMixed) {
      ensureInit();
      var els = getProcessedTargets(selectorOverride);
      var anyCollapsed = false, anyExpanded = false;

      for (var i = 0; i < els.length; i++) {
        if (els[i].classList.contains("bt-collapsed")) anyCollapsed = true;
        else anyExpanded = true;
      }

      var shouldCollapse;
      if (anyCollapsed && anyExpanded) shouldCollapse = !(expandIfMixed === true);
      else shouldCollapse = !anyCollapsed;

      for (var j = 0; j < els.length; j++) {
        if (shouldCollapse && !state.options.showButton) els[j].classList.add("bt-fully-hidden");
        if (!shouldCollapse) els[j].classList.remove("bt-fully-hidden");
        setCollapsedByTarget(els[j], shouldCollapse, state.options);
      }
    }
  };

  onReady(function () { init(); });

})(window, document);

