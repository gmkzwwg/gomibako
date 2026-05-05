---
title: JavaScript - Quick Reference Guide
categories: Notes
subclass: Webdev
---




## JavaScript

### JavaScript Aesthetics

1. **Consistent Naming**:
   * Use `camelCase` for variables and functions, `PascalCase` for classes, and `ALL_CAPS` for constants.
   * Choose `descriptive names` that clearly indicate the `purpose` of the variable or function.
2. **Modularize Code**:
   * Separate code into functions and modules to make it more readable and reusable.
   * Avoid long functions; instead, break them down into smaller, single-purpose functions.
3. **Consistent Indentation and Spacing**:
   * Use 2 or 4 spaces per indentation level.
   * Use blank lines between blocks of code for better readability.
4. **Use ES6+ Syntax**:
   * Use `let` and `const` instead of `var`.
   * Use arrow functions for cleaner syntax, especially for callbacks.
   * Utilize destructuring, template literals, and default parameters for more concise code.
5. **Avoid Global Variables**:
   * Wrap code in functions or modules to avoid polluting the global namespace.
   * Use IIFEs (Immediately Invoked Function Expressions) or modules to encapsulate code.
6. **Consistent Commenting**:
   * Use comments to explain complex code, but avoid over-commenting.
   * Document functions with JSDoc-style comments to describe their purpose, parameters, and return values.
7. **Error Handling**:
   * Use `try...catch` for handling errors in code that may fail.
   * Log informative messages to make debugging easier.
8. **Consistent Formatting**:
   * Follow a consistent style guide like Airbnb’s JavaScript Style Guide.
   * Use tools like Prettier and ESLint to enforce code formatting.
9. **Avoid Nested Callbacks (Callback Hell)**:
   * Use Promises or async/await for asynchronous operations to avoid deeply nested callbacks.
10. **Keep Functions Pure**:
    * Write pure functions that depend on their inputs and avoid side effects when possible. This makes code easier to test and debug.

### Example JavaScript

```javascript
// Constants
const API_URL = 'https://api.example.com/data';

// Utility function to fetch data
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Main function
async function displayData() {
  try {
    const data = await fetchData('items');
    data.forEach(item => renderItem(item));
  } catch (error) {
    console.error('Display error:', error);
  }
}

// Render function
function renderItem(item) {
  const itemElement = document.createElement('div');
  itemElement.className = 'item';
  itemElement.textContent = item.name;
  document.body.appendChild(itemElement);
}

// Execute main function
displayData();
```

Using these CSS and JavaScript aesthetic practices will make your codebase more readable, maintainable, and efficient.

## javascript

### 模式

| 模式                                           | 核心思想                                  | 优点                           | 缺点                                                    | 典型场景                         |
| -------------------------------------------- | ------------------------------------- | ---------------------------- | ----------------------------------------------------- | ---------------------------- |
| IIFE（立即执行函数表达式）                              | 用闭包创建私有作用域，选择性把 API 挂到全局              | 无构建环境也能“私有+导出”；避免全局变量泄漏；兼容性好 | 仍需要全局入口（若要从 HTML 调用）；依赖管理不如模块系统清晰                     | 静态站点脚本、老项目、需要 `window.*` API |
| 直接挂全局（Global Export）                         | 直接给 `window.X = ...`                  | 最简单；HTML/控制台调用最直接            | 容易污染全局；命名冲突风险高；内部变量也容易外泄（若写得不谨慎）                      | 小脚本、一次性页面逻辑                  |
| 命名空间（Namespace）                              | 全局只占一个根对象，如 `window.Site.*`           | 降低命名冲突；结构清晰；仍可直接 HTML 调用     | 仍是全局；命名空间治理需要约定（避免被覆盖）                                | 多个脚本共存的静态站点                  |
| Revealing Module（揭示模块）                       | 用闭包私有化，实现后返回一个 API 对象                 | 私有状态清晰；导出表面简洁；便于测试（可注入依赖）    | 通常仍要挂全局或通过模块系统导入；多实例时需工厂化                             | 中小型组件化脚本、需要私有状态              |
| 工厂函数（Factory Function）                       | `createX()` 返回对象；可多实例；可用闭包持有私有状态      | 多实例自然；组合友好；便于 DI/测试          | API 共享不如 prototype（但多数场景无关紧要）                         | 可复用组件、同页多个实例                 |
| 构造器+原型（Constructor/Prototype）                | `new X()` + `X.prototype.method` 共享方法 | 方法共享节省内存；传统 JS 兼容性强          | 写法偏旧；继承/this 易踩坑                                      | 大量实例、偏传统 OOP 风格              |
| class（ES6 类）                                 | 原型模式语法糖；用 `class` 定义类型与方法             | 语义清晰；继承更直观（`extends`）        | 可能过度 OOP；仍需处理 DOM/副作用边界                               | 复杂组件、需要明确类型边界                |
| ESM（ES Modules）                              | 文件即模块；`export/import` 显式依赖            | 作用域天然私有；依赖显式；易拆分与复用          | HTML 需 `type="module"`；默认不挂到 `window`（内联 onclick 不方便） | 现代浏览器、可接受模块脚本引用方式            |
| CommonJS                                     | `module.exports/require`（Node 生态）     | Node/打包工具中常用；生态成熟            | 浏览器原生不支持（需打包）                                         | Node 或经 bundler 的前端          |
| AMD                                          | `define([...], factory)`（早期浏览器模块）     | 早期浏览器异步加载方案                  | 现在相对少用；样板较多                                           | 老代码、RequireJS                |
| UMD                                          | 同时兼容 AMD/CommonJS/全局                  | 发布库“一份通吃”                    | 样板很长；静态站点脚本通常过度                                       | 需要分发为通用库                     |
| 依赖注入（DI）                                     | 把依赖（window/document/服务）通过参数传入         | 测试友好；解耦全局；可复用性高              | 调用处需要组装依赖；初看更啰嗦                                       | 可测试组件、想避免硬绑全局                |
| 函数式组织（FP：Functional Core / Imperative Shell） | 核心逻辑做纯函数；副作用集中在边界                     | 易测试、可推理；副作用可控                | 对 DOM 操作仍需命令式外壳；需要分层习惯                                | 逻辑增长、希望降低维护成本                |
| PubSub / Observer（事件总线）                      | 通过事件解耦触发者与执行者                         | 组件解耦；扩展点自然（监听/取消监听）          | 调试链路变长；事件名治理需要约定                                      | 多个组件协作、需要插件式扩展               |
| MVC/MVP/MVVM/Flux（架构模式）                      | 分离状态/动作/视图更新                          | 大型交互可维护；职责分明                 | 对小脚本过重；样板多                                            | 页面变“应用”时（状态复杂、交互多）           |

1. IIFE（含导出到 window）

```js
(function (w, d) {
  "use strict";

  function expandAll() {}
  function collapseAll() {}

  w.BilingualToggle = { expandAll, collapseAll };
})(window, document);
```
1. 直接挂全局（Global Export）

```js
"use strict";

function expandAll() {}
function collapseAll() {}

window.BilingualToggle = { expandAll, collapseAll };
```
1. 命名空间（Namespace）

```js
"use strict";

window.Site = window.Site || {};
Site.BilingualToggle = Site.BilingualToggle || {};

Site.BilingualToggle.expandAll = function () {};
Site.BilingualToggle.collapseAll = function () {};
```
1. Revealing Module（揭示模块）

```js
"use strict";

window.BilingualToggle = (function () {
  function expandAll() {}
  function collapseAll() {}

  return { expandAll, collapseAll };
})();
```
1. 工厂函数（可多实例）

```js
"use strict";

function createBilingualToggle(opts) {
  function expandAll() {}
  function collapseAll() {}
  return { expandAll, collapseAll };
}

const bt = createBilingualToggle({ selector: "blockquote" });
bt.expandAll();
```
1. 构造器 + 原型

```js
"use strict";

function BilingualToggle(opts) {
  this.opts = opts || {};
}

BilingualToggle.prototype.expandAll = function () {};
BilingualToggle.prototype.collapseAll = function () {};

const bt = new BilingualToggle({ selector: "blockquote" });
bt.expandAll();
```
1. class

```js
"use strict";

class BilingualToggle {
  constructor(opts = {}) {
    this.opts = opts;
  }
  expandAll() {}
  collapseAll() {}
}

const bt = new BilingualToggle({ selector: "blockquote" });
bt.expandAll();
```
1. ESM（ES Modules）
   `/assets/bilingual-toggle.js`

```js
export function expandAll() {}
export function collapseAll() {}
```

HTML：

```html
<script type="module">
  import * as BT from "/assets/bilingual-toggle.js";
  BT.expandAll();
</script>
```

如果仍想支持 `onclick="BilingualToggle.expandAll()"`，可显式挂到 window：

```html
<script type="module">
  import * as BT from "/assets/bilingual-toggle.js";
  window.BilingualToggle = BT;
</script>
```
1. CommonJS（Node / 打包环境）

```js
function expandAll() {}
function collapseAll() {}

module.exports = { expandAll, collapseAll };
// 使用：const BT = require("./bilingual-toggle");
```
1. AMD（RequireJS）

```js
define([], function () {
  function expandAll() {}
  function collapseAll() {}
  return { expandAll, collapseAll };
});
```
1. UMD（库分发骨架）

```js
(function (root, factory) {
  if (typeof define === "function" && define.amd) define([], factory);
  else if (typeof module === "object" && module.exports) module.exports = factory();
  else root.BilingualToggle = factory();
})(this, function () {
  function expandAll() {}
  function collapseAll() {}
  return { expandAll, collapseAll };
});
```
1. 依赖注入（DI）

```js
function createBilingualToggle(env, opts) {
  const d = env.document;

  function expandAll() {
    d.querySelectorAll(opts.selector).forEach(() => {});
  }

  return { expandAll };
}

const BT = createBilingualToggle({ window, document }, { selector: "blockquote" });
BT.expandAll();
```
1. FP：Functional Core / Imperative Shell

```js
// core（纯函数）
function computeTargets(root, selector) {
  return Array.from(root.querySelectorAll(selector));
}

function nextCollapsed(prevCollapsed) {
  return !prevCollapsed;
}

// shell（副作用边界）
function expandAll(document, selector) {
  const els = computeTargets(document, selector);
  els.forEach(el => { el.classList.remove("collapsed"); });
}
```
1. PubSub / Observer（事件总线）

```js
const bus = new EventTarget();

bus.addEventListener("bt:expandAll", () => {
  // expandAll(...)
});

function requestExpandAll() {
  bus.dispatchEvent(new Event("bt:expandAll"));
}
```
1. MVC/Flux（极简骨架）

```js
// store（状态）
const store = {
  state: { collapsed: true },
  listeners: [],
  subscribe(fn) { this.listeners.push(fn); },
  setState(next) { this.state = next; this.listeners.forEach(fn => fn(this.state)); }
};

// actions（动作）
function toggleAllAction() {
  store.setState({ collapsed: !store.state.collapsed });
}

// view（视图更新）
store.subscribe((state) => {
  // 根据 state.collapsed 更新 DOM
});
```

如果只面向你当前的 Jekyll 静态站点脚本需求（head 引用 + HTML 上按钮调用 + 少量状态），通常最稳的组合是：IIFE 或 Revealing Module + 单一全局入口（可用命名空间封装）。

### 代码模板

```js
/*!
 * @file xxx.js @summary One-line summary.
 * @purpose Why this exists (context).
 * @features 1) ... 2) ... 3) ...
 * @non-goals Not doing ...
 * @usage <script>window.XConfig={...}</script><script src="xxx.js" data-x-flag="true"></script>
 * @config Priority: init(opts) > window.XConfig > script data-*/query > DEFAULTS
 * @api X.init(opts?) X.refresh() X.noConflict() (+ others you expose)
 * @compat ES? DOMReady? deps?
 * @a11y aria-* focus?
 * @version 0.0.0 @license MIT
 */
(function (root, doc) {
  "use strict";

  // IDENTITY / EXPORT
  var NAME = "X", VERSION = "0.0.0", prev = root[NAME];

  // DEFAULTS / STATE
  var DEFAULTS = { debug:false, styleId:NAME+"-style", classPrefix:"x-", /* ... */ };
  var S = { inited:false, opt:null };

  // UTILS
  function assign(a,b){var o={},k;for(k in a)o[k]=a[k];if(b)for(k in b)o[k]=b[k];return o;}
  function ready(fn){doc.readyState==="loading"?doc.addEventListener("DOMContentLoaded",fn,{once:true}):fn();}
  function log(o,m){o&&o.debug&&root.console&&console.log&&console.log("["+NAME+"] "+m);}
  function curScript(){return doc.currentScript||doc.getElementsByTagName("script")[doc.getElementsByTagName("script").length-1]||null;}
  function pBool(v){if(v===true||v===false)return v;if(v==null)return null;v=(""+v).trim().toLowerCase();if(!v)return null;return v==="1"||v==="true"||v==="yes"||v==="on";}
  function cfgFromScript(s){var c={}; if(!s)return c; var b=pBool(s.getAttribute("data-x-flag")); if(b!==null)c.flag=b; var src=s.getAttribute("src")||"",i=src.indexOf("?"); if(i>-1){var q=src.slice(i+1).split("&"); for(var j=0;j<q.length;j++){var kv=q[j].split("="); if((decodeURIComponent(kv[0]||"").toLowerCase())==="flag"){b=pBool(decodeURIComponent(kv[1]||"")); if(b!==null)c.flag=b;}}} return c;}
  function resolve(user){var g=root[NAME+"Config"]||null, s=cfgFromScript(curScript()); return assign(assign(assign(DEFAULTS,g||{}),s||{}),user||{});}

  // CSS
  function css(o){return "/* minimal css */\n";}
  function inject(o){if(doc.getElementById(o.styleId))return; var st=doc.createElement("style"); st.id=o.styleId; st.appendChild(doc.createTextNode(css(o))); doc.head.appendChild(st);}

  // CORE (DOM ops)
  function processAll(o){ /* query + mutate */ }

  // INIT / API
  function init(user){S.opt=resolve(user); if(!doc.head)return; inject(S.opt); processAll(S.opt); S.inited=true; log(S.opt,"init "+VERSION);}
  function ensure(){if(!S.inited)init();}
  var api = {
    version: VERSION,
    init: function (o) { init(o); },
    refresh: function () { ensure(); processAll(S.opt); },
    noConflict: function(){ root[NAME]=prev; return api; }
    // add: toggle/expandAll/collapseAll etc.
  };

  root[NAME] = api;
  ready(function(){ init(); });

})(window, document);
```
