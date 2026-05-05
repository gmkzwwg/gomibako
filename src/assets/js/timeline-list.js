/*!
 * Introduction:
 *   Highlights TODO fragments in article text and creates a glass-style floating TODO summary panel.
 *
 * Usage:
 *   Include this file on the page. It runs automatically with DEFAULT_CONFIG.
 *   Default behavior can be customized by editing DEFAULT_CONFIG below.
 *   Runtime behavior can be customized with window.TodoSummary.updateConfig().
 *
 * Global API:
 *   window.TodoSummary.apply(selectorOrElements, options)
 *   window.TodoSummary.updateConfig(config)
 *   window.TodoSummary.getConfig()
 *   window.TodoSummary.clear(options)
 *
 * Notes:
 *   This script injects its own compact CSS.
 *   It does not preserve the old initTodoCollector() API or old todo-* class names.
 *   It skips script, style, code, pre, textarea, existing TODO marks, and its own floating UI.
 *   The floating panel uses a lightweight backdrop-filter with a solid fallback.
 */

(function (window, document) {
  "use strict";

  if (!window || !document) return;

  const DEFAULT_CONFIG = {
    selector: ".post-content", // Default content container selector.
    autoApply: true, // Apply automatically after script loading.
    todoPattern: /TODO:[^\n\r]*/g, // Pattern used to find TODO fragments.
    headingSelector: "h1, h2, h3, h4, h5, h6", // Headings used for section titles.

    panelId: "todo-summary-panel", // Floating panel ID.
    triggerId: "todo-summary-trigger", // Reopen trigger ID.
    styleId: "todo-summary-style", // Injected style element ID.

    markClass: "todo-mark", // Class for highlighted TODO text.
    markActiveClass: "todo-mark--active", // Class for active jumped TODO.
    panelClass: "todo-summary", // Class for floating panel.
    panelDraggingClass: "todo-summary--dragging", // Class added while dragging.
    headerClass: "todo-summary__header", // Class for panel header.
    titleClass: "todo-summary__title", // Class for panel title.
    closeClass: "todo-summary__close", // Class for close button.
    bodyClass: "todo-summary__body", // Class for scrollable panel body.
    listClass: "todo-summary__list", // Class for TODO list.
    triggerClass: "todo-summary__trigger", // Class for reopen button.

    panelTitle: "TODO 汇总", // Floating panel title.
    triggerText: "TODOs", // Reopen trigger text.
    closeLabel: "Close TODO summary", // Close button aria-label.
    noSectionText: "TODO: at the beginning", // Fallback title when no section heading exists.
    todoTextMaxLength: 15, // Maximum TODO text length in the panel.
    sectionTitleMaxLength: 15, // Maximum section title length in the panel.

    flashDuration: 1600, // Active mark duration in milliseconds.
    scrollBehavior: "smooth", // Scroll behavior when clicking a summary item.
    scrollBlock: "center", // Scroll target alignment.
    enableHashUpdate: true, // Update URL hash after jumping.
    enableDragging: true, // Enable floating panel dragging.
    injectStyle: true, // Inject built-in CSS.

    backdropBlur: "8px", // Lightweight background blur behind floating UI.
    backdropSaturate: "1.08", // Lightweight saturation for glass effect.
    panelBackground: "rgba(255, 255, 255, 0.58)", // Glass panel background.
    headerBackground: "rgba(255, 255, 255, 0.34)", // Glass header background.
    fallbackBackground: "rgba(255, 255, 255, 0.88)", // Fallback when backdrop-filter is unsupported.
    borderColor: "rgba(255, 255, 255, 0.42)", // Floating UI border color.
    shadow: "0 14px 36px rgba(0, 0, 0, 0.18)", // Floating UI shadow.
    highlightBackground: "rgba(255, 236, 153, 0.82)", // Inline TODO mark background.
    zIndex: 99999, // Floating UI z-index.

    skipAncestorSelector: [
      "script",
      "style",
      "noscript",
      "textarea",
      "input",
      "select",
      "button",
      "pre",
      "code",
      "[data-todo-ignore]",
      ".todo-summary",
      ".todo-summary__trigger",
      ".todo-mark"
    ].join(",") // Ancestors that disable TODO scanning.
  };

  let config = merge({}, DEFAULT_CONFIG); // Active runtime configuration.
  let todoCounter = 0; // Unique TODO ID counter.
  let panelEl = null; // Floating panel element.
  let listEl = null; // Floating list element.
  let triggerEl = null; // Reopen trigger element.
  let dragOffsetX = 0; // Persistent panel transform X.
  let dragOffsetY = 0; // Persistent panel transform Y.

  /* Merges objects from left to right; params: ...objects<object>. */
  function merge() {
    const output = {};

    Array.prototype.slice.call(arguments).forEach(function (object) {
      Object.keys(object || {}).forEach(function (key) {
        output[key] = object[key];
      });
    });

    return output;
  }

  /* Converts array-like values into arrays; params: value<ArrayLike>. */
  function toArray(value) {
    return Array.prototype.slice.call(value || []);
  }

  /* Normalizes selector, element, NodeList, or array into elements; params: selectorOrElements<any>. */
  function normalizeContainers(selectorOrElements, runtimeConfig) {
    if (!selectorOrElements) {
      return toArray(document.querySelectorAll(runtimeConfig.selector));
    }

    if (typeof selectorOrElements === "string") {
      return toArray(document.querySelectorAll(selectorOrElements));
    }

    if (selectorOrElements instanceof Element) {
      return [selectorOrElements];
    }

    if (selectorOrElements.length) {
      return toArray(selectorOrElements);
    }

    return [];
  }

  /* Escapes CSS class names when possible; params: value<string>. */
  function escapeCssClass(value) {
    if (window.CSS && typeof window.CSS.escape === "function") {
      return window.CSS.escape(value);
    }

    return String(value).replace(/[^a-zA-Z0-9_-]/g, "\\$&"); // Minimal fallback.
  }

  /* Applies TODO highlighting and summary rendering; params: selectorOrElements<any>, userOptions<object>. */
  function apply(selectorOrElements, userOptions) {
    const runtimeConfig = merge(config, userOptions || {});
    const containers = normalizeContainers(selectorOrElements || runtimeConfig.selector, runtimeConfig);
    let todos = [];

    injectStyles(runtimeConfig);

    containers.forEach(function (container, containerIndex) {
      processContainer(container, containerIndex, runtimeConfig);
      todos = todos.concat(collectMarks(container, runtimeConfig));
    });

    todos = dedupeTodos(todos);

    if (todos.length > 0) {
      ensurePanel(runtimeConfig);
      renderSummary(todos, runtimeConfig);
      showPanel();
    }

    return todos;
  }

  /* Processes one container by marking raw TODO text nodes; params: container<Element>, containerIndex<number>, runtimeConfig<object>. */
  function processContainer(container, containerIndex, runtimeConfig) {
    const textNodes = collectTodoTextNodes(container, runtimeConfig);

    textNodes.forEach(function (textNode) {
      markTodosInTextNode(textNode, container, containerIndex, runtimeConfig);
    });
  }

  /* Collects raw text nodes containing TODO fragments; params: container<Element>, runtimeConfig<object>. */
  function collectTodoTextNodes(container, runtimeConfig) {
    const textNodes = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !regexHasMatch(runtimeConfig.todoPattern, node.nodeValue)) {
          return NodeFilter.FILTER_REJECT;
        }

        if (!node.parentElement) {
          return NodeFilter.FILTER_REJECT;
        }

        if (node.parentElement.closest(runtimeConfig.skipAncestorSelector)) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    });

    let current = walker.nextNode();

    while (current) {
      textNodes.push(current);
      current = walker.nextNode();
    }

    return textNodes;
  }

  /* Safely tests a regex and resets state; params: regex<RegExp>, text<string>. */
  function regexHasMatch(regex, text) {
    regex.lastIndex = 0;

    const result = regex.test(text);

    regex.lastIndex = 0;

    return result;
  }

  /* Marks TODO fragments inside one text node; params: textNode<Text>, container<Element>, containerIndex<number>, runtimeConfig<object>. */
  function markTodosInTextNode(textNode, container, containerIndex, runtimeConfig) {
    const text = textNode.nodeValue;
    const regex = new RegExp(runtimeConfig.todoPattern.source, runtimeConfig.todoPattern.flags);
    const fragment = document.createDocumentFragment();
    let match = regex.exec(text);
    let lastIndex = 0;
    let hasMatch = false;

    while (match !== null) {
      const todoText = match[0].trim();
      const sectionTitle = getSectionTitle(textNode, container, runtimeConfig);
      const displayTitle = sectionTitle
        ? truncateText(sectionTitle, runtimeConfig.sectionTitleMaxLength)
        : runtimeConfig.noSectionText;
      const displayText = truncateText(todoText, runtimeConfig.todoTextMaxLength) + " [" + displayTitle + "]";
      const mark = document.createElement("mark");

      hasMatch = true;
      appendText(fragment, text.slice(lastIndex, match.index));

      mark.className = runtimeConfig.markClass;
      mark.id = "todo-summary-item-" + containerIndex + "-" + (++todoCounter);
      mark.tabIndex = -1;
      mark.textContent = todoText;
      mark.dataset.todoText = todoText;
      mark.dataset.todoSectionTitle = sectionTitle || "";
      mark.dataset.todoDisplayText = displayText;

      fragment.appendChild(mark);

      lastIndex = match.index + match[0].length;
      match = regex.exec(text);
    }

    if (!hasMatch) return;

    appendText(fragment, text.slice(lastIndex));
    textNode.parentNode.replaceChild(fragment, textNode);
  }

  /* Appends a text node when non-empty; params: fragment<DocumentFragment>, text<string>. */
  function appendText(fragment, text) {
    if (text) {
      fragment.appendChild(document.createTextNode(text));
    }
  }

  /* Collects existing TODO marks; params: container<Element>, runtimeConfig<object>. */
  function collectMarks(container, runtimeConfig) {
    const selector = "." + escapeCssClass(runtimeConfig.markClass);

    return toArray(container.querySelectorAll(selector)).map(function (mark) {
      const sectionTitle = mark.dataset.todoSectionTitle || "";
      const displayTitle = sectionTitle
        ? truncateText(sectionTitle, runtimeConfig.sectionTitleMaxLength)
        : runtimeConfig.noSectionText;

      return {
        id: mark.id,
        text: mark.dataset.todoText || mark.textContent || "",
        displayText: mark.dataset.todoDisplayText || truncateText(mark.textContent, runtimeConfig.todoTextMaxLength) + " [" + displayTitle + "]",
        sectionTitle: sectionTitle,
        displayTitle: displayTitle
      };
    });
  }

  /* Removes duplicate TODO records by id; params: todos<Array>. */
  function dedupeTodos(todos) {
    const seen = {};
    const output = [];

    todos.forEach(function (todo) {
      if (!todo.id || seen[todo.id]) return;

      seen[todo.id] = true;
      output.push(todo);
    });

    return output;
  }

  /* Finds the nearest previous section heading; params: textNode<Text>, container<Element>, runtimeConfig<object>. */
  function getSectionTitle(textNode, container, runtimeConfig) {
    let element = textNode.parentElement;

    while (element && element !== container) {
      let previous = element.previousElementSibling;

      while (previous) {
        const heading = findLastHeadingInside(previous, runtimeConfig);

        if (heading) return cleanText(heading.textContent);

        previous = previous.previousElementSibling;
      }

      element = element.parentElement;
    }

    let previous = textNode.parentElement ? textNode.parentElement.previousElementSibling : null;

    while (previous) {
      const heading = findLastHeadingInside(previous, runtimeConfig);

      if (heading) return cleanText(heading.textContent);

      previous = previous.previousElementSibling;
    }

    return "";
  }

  /* Finds the last heading inside an element; params: element<Element>, runtimeConfig<object>. */
  function findLastHeadingInside(element, runtimeConfig) {
    if (!element || !element.querySelectorAll) return null;
    if (element.matches(runtimeConfig.headingSelector)) return element;

    const headings = element.querySelectorAll(runtimeConfig.headingSelector);

    return headings.length ? headings[headings.length - 1] : null;
  }

  /* Normalizes text whitespace; params: text<string>. */
  function cleanText(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  /* Truncates text with ellipsis; params: text<string>, maxLength<number>. */
  function truncateText(text, maxLength) {
    const clean = cleanText(text);
    const limit = Number(maxLength) || 0;

    if (!clean) return "";
    if (limit <= 0 || clean.length <= limit) return clean;

    return clean.slice(0, limit) + "...";
  }

  /* Ensures floating UI exists; params: runtimeConfig<object>. */
  function ensurePanel(runtimeConfig) {
    if (panelEl && listEl && triggerEl) return;

    const panel = document.createElement("aside");
    const header = document.createElement("div");
    const title = document.createElement("div");
    const close = document.createElement("button");
    const body = document.createElement("div");
    const list = document.createElement("ol");
    const trigger = document.createElement("button");

    panel.id = runtimeConfig.panelId;
    panel.className = runtimeConfig.panelClass;
    panel.setAttribute("aria-label", runtimeConfig.panelTitle);

    header.className = runtimeConfig.headerClass;
    title.className = runtimeConfig.titleClass;
    title.textContent = runtimeConfig.panelTitle;

    close.type = "button";
    close.className = runtimeConfig.closeClass;
    close.setAttribute("aria-label", runtimeConfig.closeLabel);
    close.textContent = "×";
    close.addEventListener("click", hidePanel);

    body.className = runtimeConfig.bodyClass;
    list.className = runtimeConfig.listClass;

    body.appendChild(list);
    header.appendChild(title);
    header.appendChild(close);
    panel.appendChild(header);
    panel.appendChild(body);
    document.body.appendChild(panel);

    trigger.id = runtimeConfig.triggerId;
    trigger.type = "button";
    trigger.className = runtimeConfig.triggerClass;
    trigger.textContent = runtimeConfig.triggerText;
    trigger.hidden = true;
    trigger.addEventListener("click", showPanel);
    document.body.appendChild(trigger);

    if (runtimeConfig.enableDragging) {
      makeDraggable(panel, header, runtimeConfig);
    }

    panelEl = panel;
    listEl = list;
    triggerEl = trigger;
    applyPanelTransform();
  }

  /* Hides panel and shows trigger; params: none. */
  function hidePanel() {
    if (panelEl) panelEl.hidden = true;
    if (triggerEl) triggerEl.hidden = false;
  }

  /* Shows panel and hides trigger; params: none. */
  function showPanel() {
    if (panelEl) panelEl.hidden = false;
    if (triggerEl) triggerEl.hidden = true;
  }

  /* Renders floating summary list; params: todos<Array>, runtimeConfig<object>. */
  function renderSummary(todos, runtimeConfig) {
    if (!listEl) return;

    listEl.innerHTML = "";

    todos.forEach(function (todo) {
      const item = document.createElement("li");
      const link = document.createElement("a");

      link.href = "#" + todo.id;
      link.textContent = todo.displayText;
      link.title = todo.sectionTitle
        ? todo.text + " [" + todo.sectionTitle + "]"
        : todo.text + " [" + runtimeConfig.noSectionText + "]";

      link.addEventListener("click", function (event) {
        event.preventDefault();
        jumpToTodo(todo.id, runtimeConfig);
      });

      item.appendChild(link);
      listEl.appendChild(item);
    });
  }

  /* Jumps to and flashes one TODO mark; params: todoId<string>, runtimeConfig<object>. */
  function jumpToTodo(todoId, runtimeConfig) {
    const target = document.getElementById(todoId);

    if (!target) return;

    target.scrollIntoView({
      behavior: runtimeConfig.scrollBehavior,
      block: runtimeConfig.scrollBlock
    });

    target.focus({ preventScroll: true });
    flashTarget(target, runtimeConfig);

    if (!runtimeConfig.enableHashUpdate) return;

    if (history.pushState) {
      history.pushState(null, "", "#" + todoId);
    } else {
      location.hash = todoId;
    }
  }

  /* Temporarily activates a TODO mark; params: target<Element>, runtimeConfig<object>. */
  function flashTarget(target, runtimeConfig) {
    target.classList.add(runtimeConfig.markActiveClass);

    window.setTimeout(function () {
      target.classList.remove(runtimeConfig.markActiveClass);
    }, runtimeConfig.flashDuration);
  }

  /* Makes a panel draggable via transform; params: panel<Element>, handle<Element>, runtimeConfig<object>. */
  function makeDraggable(panel, handle, runtimeConfig) {
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startOffsetX = 0;
    let startOffsetY = 0;

    handle.addEventListener("pointerdown", function (event) {
      if (event.target && event.target.closest("." + escapeCssClass(runtimeConfig.closeClass))) return;

      dragging = true;
      startX = event.clientX;
      startY = event.clientY;
      startOffsetX = dragOffsetX;
      startOffsetY = dragOffsetY;

      panel.classList.add(runtimeConfig.panelDraggingClass);
      handle.setPointerCapture(event.pointerId);
      event.preventDefault();
    });

    handle.addEventListener("pointermove", function (event) {
      if (!dragging) return;

      const nextX = startOffsetX + event.clientX - startX;
      const nextY = startOffsetY + event.clientY - startY;
      const rect = panel.getBoundingClientRect();
      const minX = -rect.left + dragOffsetX;
      const maxX = window.innerWidth - rect.right + dragOffsetX;
      const minY = -rect.top + dragOffsetY;
      const maxY = window.innerHeight - rect.bottom + dragOffsetY;

      dragOffsetX = clamp(nextX, minX, maxX);
      dragOffsetY = clamp(nextY, minY, maxY);

      applyPanelTransform();
    });

    handle.addEventListener("pointerup", function (event) {
      dragging = false;
      panel.classList.remove(runtimeConfig.panelDraggingClass);

      if (handle.hasPointerCapture(event.pointerId)) {
        handle.releasePointerCapture(event.pointerId);
      }
    });

    handle.addEventListener("pointercancel", function () {
      dragging = false;
      panel.classList.remove(runtimeConfig.panelDraggingClass);
    });
  }

  /* Applies the current transform offset to the panel; params: none. */
  function applyPanelTransform() {
    if (!panelEl) return;

    panelEl.style.transform = "translate3d(" + dragOffsetX + "px, " + dragOffsetY + "px, 0)";
  }

  /* Clamps a number into a valid range; params: value<number>, min<number>, max<number>. */
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), Math.max(min, max));
  }

  /* Injects or updates built-in CSS; params: runtimeConfig<object>. */
  function injectStyles(runtimeConfig) {
    if (!runtimeConfig.injectStyle) return;

    const panelClass = escapeCssClass(runtimeConfig.panelClass);
    const panelDraggingClass = escapeCssClass(runtimeConfig.panelDraggingClass);
    const headerClass = escapeCssClass(runtimeConfig.headerClass);
    const titleClass = escapeCssClass(runtimeConfig.titleClass);
    const closeClass = escapeCssClass(runtimeConfig.closeClass);
    const bodyClass = escapeCssClass(runtimeConfig.bodyClass);
    const listClass = escapeCssClass(runtimeConfig.listClass);
    const triggerClass = escapeCssClass(runtimeConfig.triggerClass);
    const markClass = escapeCssClass(runtimeConfig.markClass);
    const markActiveClass = escapeCssClass(runtimeConfig.markActiveClass);
    let style = document.getElementById(runtimeConfig.styleId);

    if (!style) {
      style = document.createElement("style");
      style.id = runtimeConfig.styleId;
      document.head.appendChild(style);
    }

    style.textContent = [
      "." + panelClass + " {",
      "  position: fixed;",
      "  right: 16px;",
      "  bottom: 16px;",
      "  width: 360px;",
      "  max-width: calc(100vw - 24px);",
      "  max-height: min(60vh, 520px);",
      "  z-index: " + runtimeConfig.zIndex + ";",
      "  border: 1px solid " + runtimeConfig.borderColor + ";",
      "  background: " + runtimeConfig.panelBackground + ";",
      "  backdrop-filter: blur(" + runtimeConfig.backdropBlur + ") saturate(" + runtimeConfig.backdropSaturate + ");",
      "  -webkit-backdrop-filter: blur(" + runtimeConfig.backdropBlur + ") saturate(" + runtimeConfig.backdropSaturate + ");",
      "  border-radius: 0;",
      "  box-shadow: " + runtimeConfig.shadow + ";",
      "  overflow: hidden;",
      "  font-size: 14px;",
      "  color: inherit;",
      "}",
      "." + panelClass + "[hidden],",
      "." + triggerClass + "[hidden] {",
      "  display: none;",
      "}",
      "." + panelClass + "." + panelDraggingClass + " {",
      "  will-change: transform;",
      "}",
      "." + headerClass + " {",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: space-between;",
      "  padding: 10px 12px;",
      "  border-bottom: 1px solid " + runtimeConfig.borderColor + ";",
      "  background: " + runtimeConfig.headerBackground + ";",
      "  cursor: move;",
      "  user-select: none;",
      "  touch-action: none;",
      "}",
      "." + titleClass + " {",
      "  font-weight: 700;",
      "}",
      "." + closeClass + " {",
      "  border: none;",
      "  background: transparent;",
      "  color: inherit;",
      "  font-size: 20px;",
      "  line-height: 1;",
      "  cursor: pointer;",
      "  padding: 0 2px;",
      "}",
      "." + bodyClass + " {",
      "  overflow: auto;",
      "  max-height: calc(min(60vh, 520px) - 48px);",
      "  padding: 10px 12px 12px;",
      "}",
      "." + listClass + " {",
      "  margin: 0;",
      "  padding-left: 20px;",
      "}",
      "." + listClass + " li + li {",
      "  margin-top: 8px;",
      "}",
      "." + listClass + " a {",
      "  text-decoration: underline;",
      "  cursor: pointer;",
      "  color: inherit;",
      "  word-break: break-word;",
      "}",
      "." + triggerClass + " {",
      "  position: fixed;",
      "  right: 16px;",
      "  bottom: 16px;",
      "  z-index: " + runtimeConfig.zIndex + ";",
      "  border: 1px solid " + runtimeConfig.borderColor + ";",
      "  background: " + runtimeConfig.panelBackground + ";",
      "  backdrop-filter: blur(" + runtimeConfig.backdropBlur + ") saturate(" + runtimeConfig.backdropSaturate + ");",
      "  -webkit-backdrop-filter: blur(" + runtimeConfig.backdropBlur + ") saturate(" + runtimeConfig.backdropSaturate + ");",
      "  border-radius: 0;",
      "  box-shadow: " + runtimeConfig.shadow + ";",
      "  padding: 10px 14px;",
      "  font-size: 14px;",
      "  font-weight: 600;",
      "  line-height: 1;",
      "  cursor: pointer;",
      "  color: inherit;",
      "}",
      "." + markClass + " {",
      "  background: " + runtimeConfig.highlightBackground + ";",
      "  color: inherit;",
      "  padding: 0 3px;",
      "  border-radius: 0;",
      "}",
      "." + markActiveClass + " {",
      "  outline: 2px solid currentColor;",
      "  transition: outline 0.2s ease;",
      "}",
      "@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {",
      "  ." + panelClass + ",",
      "  ." + triggerClass + " {",
      "    background: " + runtimeConfig.fallbackBackground + ";",
      "  }",
      "}"
    ].join("\n");
  }

  /* Updates runtime config and reapplies behavior; params: nextConfig<object>. */
  function updateConfig(nextConfig) {
    config = merge(config, nextConfig || {});

    injectStyles(config);

    if (config.autoApply) {
      apply(config.selector);
    }

    return getConfig();
  }

  /* Returns a copy of active config; params: none. */
  function getConfig() {
    return merge({}, config);
  }

  /* Clears floating UI and optionally unwraps marks; params: options<object>. */
  function clear(options) {
    const opts = merge({ unwrapMarks: false }, options || {});

    if (opts.unwrapMarks) {
      unwrapMarks(config);
    }

    if (panelEl && panelEl.parentNode) {
      panelEl.parentNode.removeChild(panelEl);
    }

    if (triggerEl && triggerEl.parentNode) {
      triggerEl.parentNode.removeChild(triggerEl);
    }

    panelEl = null;
    listEl = null;
    triggerEl = null;
    dragOffsetX = 0;
    dragOffsetY = 0;
  }

  /* Replaces generated marks with plain text; params: runtimeConfig<object>. */
  function unwrapMarks(runtimeConfig) {
    const selector = "." + escapeCssClass(runtimeConfig.markClass);
    const marks = toArray(document.querySelectorAll(selector));

    marks.forEach(function (mark) {
      mark.replaceWith(document.createTextNode(mark.textContent || ""));
    });
  }

  /* Runs plug-and-play behavior when DOM is ready; params: none. */
  function onReady() {
    if (!config.autoApply) return;

    apply(config.selector);
  }

  window.TodoSummary = {
    apply: apply,
    updateConfig: updateConfig,
    getConfig: getConfig,
    clear: clear
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})(window, document);