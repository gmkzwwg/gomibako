/*!
 * Introduction:
 *   Highlights TODO fragments in article text and creates a floating TODO summary panel.
 *
 * Usage:
 *   Include this file on the page. It runs automatically with DEFAULT_CONFIG.
 *   Default behavior can be customized by editing DEFAULT_CONFIG below.
 *   Runtime behavior can be customized with window.TodoCollector.updateConfig().
 *
 * Global API:
 *   window.TodoCollector.apply(selectorOrElements, options)
 *   window.TodoCollector.updateConfig(config)
 *   window.TodoCollector.getConfig()
 *   window.TodoCollector.clear()
 *   window.initTodoCollector(selectorOrElements, options)
 *
 * Notes:
 *   This script injects its own compact CSS.
 *   It preserves the original class names for compatibility.
 *   It skips script, style, code, pre, textarea, existing highlights, and its own floating UI.
 *   The floating panel uses backdrop-filter to blur content behind it.
 */

(function (window, document) {
  "use strict";

  if (!window || !document) return;

  const DEFAULT_CONFIG = {
    selector: ".post_content", // Default container selector.
    autoApply: true, // Apply automatically after the script is loaded.
    todoPattern: /TODO:[^\n\r]*/g, // Pattern used to find TODO fragments.
    highlightClass: "todo-highlight", // Class used for highlighted TODO text.
    activeClass: "todo-highlight-active", // Class used when jumping to a TODO.
    panelClass: "todo-floating-box", // Class used for the floating panel.
    headerClass: "todo-floating-header", // Class used for the draggable panel header.
    titleClass: "todo-floating-title", // Class used for the panel title.
    closeClass: "todo-floating-close", // Class used for the close button.
    bodyClass: "todo-floating-body", // Class used for the panel body.
    listClass: "todo-floating-list", // Class used for the summary list.
    reopenClass: "todo-reopen-button", // Class used for the reopen button.
    styleId: "todo-collector-styles", // ID of the injected style element.
    panelId: "todo-floating-box", // ID of the floating panel.
    panelTitle: "TODO 汇总", // Floating panel title.
    reopenText: "TODOs", // Reopen button text.
    closeLabel: "关闭 TODO 汇总", // Close button accessibility label.
    noSectionText: "TODO: at the beginning", // Fallback text when no heading is found.
    todoTextMaxLength: 15, // Maximum TODO text length in the summary.
    sectionTitleMaxLength: 15, // Maximum section title length in the summary.
    flashDuration: 1600, // Active highlight duration in milliseconds.
    scrollBehavior: "smooth", // Scroll behavior when clicking a summary link.
    scrollBlock: "center", // Scroll alignment when jumping to a TODO.
    enableHashUpdate: true, // Update URL hash when jumping to a TODO.
    enableDragging: true, // Enable dragging the floating panel.
    injectStyle: true, // Inject built-in CSS.
    backdropBlur: "14px", // Blur strength behind the floating panel.
    panelBackground: "rgba(255, 255, 255, 0.52)", // Glass-like panel background.
    headerBackground: "rgba(255, 255, 255, 0.36)", // Glass-like header background.
    borderColor: "rgba(255, 255, 255, 0.42)", // Panel border color.
    shadow: "0 18px 48px rgba(0, 0, 0, 0.22)", // Panel shadow.
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
      ".todo-floating-box",
      ".todo-highlight",
      ".todo-reopen-button",
      "[data-todo-ignore]"
    ].join(","), // Ancestors that disable TODO scanning.
    headingSelector: "h1, h2, h3, h4, h5, h6" // Heading selector for section lookup.
  };

  let config = merge({}, DEFAULT_CONFIG); // Active runtime config.
  let todoGlobalCounter = 0; // Unique TODO ID counter.
  let floatingPanelCreated = false; // Floating UI creation flag.
  let floatingListEl = null; // Summary list element.
  let floatingBoxEl = null; // Floating panel element.
  let reopenButtonEl = null; // Reopen button element.
  let currentTodos = []; // Last collected TODO records.

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

  /* Converts array-like values to arrays; params: value<ArrayLike>. */
  function toArray(value) {
    return Array.prototype.slice.call(value || []);
  }

  /* Normalizes selector, element, NodeList, or array into elements; params: selectorOrElements<any>. */
  function normalizeContainers(selectorOrElements) {
    if (!selectorOrElements) {
      return toArray(document.querySelectorAll(config.selector));
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

  /* Applies TODO collection to matching containers; params: selectorOrElements<any>, userOptions<object>. */
  function apply(selectorOrElements, userOptions) {
    const runtimeConfig = merge(config, userOptions || {});
    const containers = normalizeContainers(selectorOrElements || runtimeConfig.selector);
    const todos = [];

    injectStyles(runtimeConfig);

    containers.forEach(function (container, containerIndex) {
      const containerTodos = processContainer(container, containerIndex, runtimeConfig);
      todos.push.apply(todos, containerTodos);
    });

    currentTodos = todos;

    if (todos.length > 0) {
      ensureFloatingPanel(runtimeConfig);
      renderFloatingSummary(todos, runtimeConfig);
    }

    return todos;
  }

  /* Scans and processes one container; params: container<Element>, containerIndex<number>, runtimeConfig<object>. */
  function processContainer(container, containerIndex, runtimeConfig) {
    const todos = [];
    const textNodes = collectTodoTextNodes(container, runtimeConfig);

    textNodes.forEach(function (textNode) {
      highlightTodosInTextNode(textNode, todos, container, containerIndex, runtimeConfig);
    });

    return todos;
  }

  /* Collects text nodes containing TODO matches; params: container<Element>, runtimeConfig<object>. */
  function collectTodoTextNodes(container, runtimeConfig) {
    const textNodes = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !runtimeConfig.todoPattern.test(node.nodeValue)) {
          runtimeConfig.todoPattern.lastIndex = 0; // Reset global regex state.
          return NodeFilter.FILTER_REJECT;
        }

        runtimeConfig.todoPattern.lastIndex = 0; // Reset after test.

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

  /* Highlights TODO matches in one text node; params: textNode<Text>, todos<Array>, container<Element>, containerIndex<number>, runtimeConfig<object>. */
  function highlightTodosInTextNode(textNode, todos, container, containerIndex, runtimeConfig) {
    const text = textNode.nodeValue;
    const regex = new RegExp(runtimeConfig.todoPattern.source, runtimeConfig.todoPattern.flags);
    const fragment = document.createDocumentFragment();
    let match = regex.exec(text);
    let lastIndex = 0;
    let hasMatch = false;

    while (match !== null) {
      hasMatch = true;

      appendText(fragment, text.slice(lastIndex, match.index));

      const todoText = match[0].trim();
      const sectionTitle = getSectionTitle(textNode, container, runtimeConfig);
      const hasTitle = Boolean(sectionTitle);
      const shortTodoText = truncateText(todoText, runtimeConfig.todoTextMaxLength);
      const displayTitle = hasTitle
        ? truncateText(sectionTitle, runtimeConfig.sectionTitleMaxLength)
        : runtimeConfig.noSectionText;
      const displayText = shortTodoText + " [" + displayTitle + "]";
      const todoId = "todo-" + containerIndex + "-" + (++todoGlobalCounter);
      const highlight = document.createElement("mark");

      highlight.className = runtimeConfig.highlightClass;
      highlight.id = todoId;
      highlight.setAttribute("tabindex", "-1");
      highlight.textContent = todoText;

      fragment.appendChild(highlight);

      todos.push({
        id: todoId,
        text: todoText,
        displayText: displayText,
        sectionTitle: sectionTitle,
        displayTitle: displayTitle
      });

      lastIndex = match.index + match[0].length;
      match = regex.exec(text);
    }

    if (!hasMatch) return;

    appendText(fragment, text.slice(lastIndex));

    textNode.parentNode.replaceChild(fragment, textNode);
  }

  /* Appends a text node when text is non-empty; params: fragment<DocumentFragment>, text<string>. */
  function appendText(fragment, text) {
    if (text) {
      fragment.appendChild(document.createTextNode(text));
    }
  }

  /* Finds the nearest previous section heading; params: textNode<Text>, container<Element>, runtimeConfig<object>. */
  function getSectionTitle(textNode, container, runtimeConfig) {
    let element = textNode.parentElement;

    while (element && element !== container) {
      let previous = element.previousElementSibling;

      while (previous) {
        const heading = findLastHeadingInside(previous, runtimeConfig);

        if (heading) {
          return cleanText(heading.textContent);
        }

        previous = previous.previousElementSibling;
      }

      element = element.parentElement;
    }

    let previous = textNode.parentElement ? textNode.parentElement.previousElementSibling : null;

    while (previous) {
      const heading = findLastHeadingInside(previous, runtimeConfig);

      if (heading) {
        return cleanText(heading.textContent);
      }

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

  /* Normalizes whitespace in text; params: text<string>. */
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

  /* Ensures floating panel and reopen button exist; params: runtimeConfig<object>. */
  function ensureFloatingPanel(runtimeConfig) {
    if (floatingPanelCreated) return;

    const box = document.createElement("div");
    const header = document.createElement("div");
    const title = document.createElement("div");
    const closeButton = document.createElement("button");
    const body = document.createElement("div");
    const list = document.createElement("ol");
    const reopenButton = document.createElement("button");

    box.className = runtimeConfig.panelClass;
    box.id = runtimeConfig.panelId;

    header.className = runtimeConfig.headerClass;
    title.className = runtimeConfig.titleClass;
    title.textContent = runtimeConfig.panelTitle;

    closeButton.type = "button";
    closeButton.className = runtimeConfig.closeClass;
    closeButton.setAttribute("aria-label", runtimeConfig.closeLabel);
    closeButton.textContent = "×";
    closeButton.addEventListener("click", hideFloatingPanel);

    body.className = runtimeConfig.bodyClass;
    list.className = runtimeConfig.listClass;

    body.appendChild(list);
    header.appendChild(title);
    header.appendChild(closeButton);
    box.appendChild(header);
    box.appendChild(body);
    document.body.appendChild(box);

    reopenButton.type = "button";
    reopenButton.className = runtimeConfig.reopenClass;
    reopenButton.textContent = runtimeConfig.reopenText;
    reopenButton.style.display = "none";
    reopenButton.addEventListener("click", showFloatingPanel);
    document.body.appendChild(reopenButton);

    if (runtimeConfig.enableDragging) {
      makeDraggable(box, header);
    }

    floatingBoxEl = box;
    floatingListEl = list;
    reopenButtonEl = reopenButton;
    floatingPanelCreated = true;
  }

  /* Hides the floating panel and shows the reopen button; params: none. */
  function hideFloatingPanel() {
    if (floatingBoxEl) {
      floatingBoxEl.style.display = "none";
    }

    if (reopenButtonEl) {
      reopenButtonEl.style.display = "inline-flex";
    }
  }

  /* Shows the floating panel and hides the reopen button; params: none. */
  function showFloatingPanel() {
    if (floatingBoxEl) {
      floatingBoxEl.style.display = "block";
    }

    if (reopenButtonEl) {
      reopenButtonEl.style.display = "none";
    }
  }

  /* Renders the floating TODO summary; params: todos<Array>, runtimeConfig<object>. */
  function renderFloatingSummary(todos, runtimeConfig) {
    if (!floatingListEl) return;

    floatingListEl.innerHTML = "";

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
      floatingListEl.appendChild(item);
    });
  }

  /* Scrolls to and flashes one TODO item; params: todoId<string>, runtimeConfig<object>. */
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

  /* Temporarily highlights a target TODO item; params: target<Element>, runtimeConfig<object>. */
  function flashTarget(target, runtimeConfig) {
    target.classList.add(runtimeConfig.activeClass);

    window.setTimeout(function () {
      target.classList.remove(runtimeConfig.activeClass);
    }, runtimeConfig.flashDuration);
  }

  /* Makes a floating box draggable with pointer events; params: box<Element>, handle<Element>. */
  function makeDraggable(box, handle) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    handle.addEventListener("pointerdown", function (event) {
      if (event.target && event.target.closest("." + config.closeClass)) return;

      const rect = box.getBoundingClientRect();

      isDragging = true;
      startX = event.clientX;
      startY = event.clientY;
      startLeft = rect.left;
      startTop = rect.top;

      box.style.left = rect.left + "px";
      box.style.top = rect.top + "px";
      box.style.right = "auto";
      box.style.bottom = "auto";

      handle.setPointerCapture(event.pointerId);
      event.preventDefault();
    });

    handle.addEventListener("pointermove", function (event) {
      if (!isDragging) return;

      const nextLeft = clamp(startLeft + event.clientX - startX, 0, window.innerWidth - box.offsetWidth);
      const nextTop = clamp(startTop + event.clientY - startY, 0, window.innerHeight - box.offsetHeight);

      box.style.left = nextLeft + "px";
      box.style.top = nextTop + "px";
    });

    handle.addEventListener("pointerup", function (event) {
      isDragging = false;

      if (handle.hasPointerCapture(event.pointerId)) {
        handle.releasePointerCapture(event.pointerId);
      }
    });

    handle.addEventListener("pointercancel", function () {
      isDragging = false;
    });
  }

  /* Clamps a number into a range; params: value<number>, min<number>, max<number>. */
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), Math.max(min, max));
  }

  /* Injects or updates built-in CSS; params: runtimeConfig<object>. */
  function injectStyles(runtimeConfig) {
    if (!runtimeConfig.injectStyle) return;

    const highlightClass = escapeCssClass(runtimeConfig.highlightClass);
    const activeClass = escapeCssClass(runtimeConfig.activeClass);
    const panelClass = escapeCssClass(runtimeConfig.panelClass);
    const headerClass = escapeCssClass(runtimeConfig.headerClass);
    const titleClass = escapeCssClass(runtimeConfig.titleClass);
    const closeClass = escapeCssClass(runtimeConfig.closeClass);
    const bodyClass = escapeCssClass(runtimeConfig.bodyClass);
    const listClass = escapeCssClass(runtimeConfig.listClass);
    const reopenClass = escapeCssClass(runtimeConfig.reopenClass);
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
      "  backdrop-filter: blur(" + runtimeConfig.backdropBlur + ") saturate(1.18);",
      "  -webkit-backdrop-filter: blur(" + runtimeConfig.backdropBlur + ") saturate(1.18);",
      "  border-radius: 0;",
      "  box-shadow: " + runtimeConfig.shadow + ";",
      "  overflow: hidden;",
      "  font-size: 14px;",
      "  color: inherit;",
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
      "." + reopenClass + " {",
      "  position: fixed;",
      "  right: 16px;",
      "  bottom: 16px;",
      "  z-index: " + runtimeConfig.zIndex + ";",
      "  border: 1px solid " + runtimeConfig.borderColor + ";",
      "  background: " + runtimeConfig.panelBackground + ";",
      "  backdrop-filter: blur(" + runtimeConfig.backdropBlur + ") saturate(1.18);",
      "  -webkit-backdrop-filter: blur(" + runtimeConfig.backdropBlur + ") saturate(1.18);",
      "  border-radius: 0;",
      "  box-shadow: " + runtimeConfig.shadow + ";",
      "  padding: 10px 14px;",
      "  font-size: 14px;",
      "  font-weight: 600;",
      "  line-height: 1;",
      "  cursor: pointer;",
      "  color: inherit;",
      "}",
      "." + highlightClass + " {",
      "  background: rgba(255, 236, 153, 0.82);",
      "  color: inherit;",
      "  padding: 0 3px;",
      "  border-radius: 0;",
      "}",
      "." + activeClass + " {",
      "  outline: 2px solid currentColor;",
      "  transition: outline 0.2s ease;",
      "}",
      "@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {",
      "  ." + panelClass + ",",
      "  ." + reopenClass + " {",
      "    background: rgba(255, 255, 255, 0.88);",
      "  }",
      "}"
    ].join("\n");
  }

  /* Updates runtime config and reapplies collection; params: nextConfig<object>. */
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

  /* Removes floating UI and active references; params: none. */
  function clear() {
    if (floatingBoxEl && floatingBoxEl.parentNode) {
      floatingBoxEl.parentNode.removeChild(floatingBoxEl);
    }

    if (reopenButtonEl && reopenButtonEl.parentNode) {
      reopenButtonEl.parentNode.removeChild(reopenButtonEl);
    }

    floatingPanelCreated = false;
    floatingListEl = null;
    floatingBoxEl = null;
    reopenButtonEl = null;
    currentTodos = [];
  }

  /* Runs plug-and-play behavior when DOM is ready; params: none. */
  function onReady() {
    if (!config.autoApply) return;

    apply(config.selector);
  }

  window.TodoCollector = {
    apply: apply,
    updateConfig: updateConfig,
    getConfig: getConfig,
    clear: clear
  };

  window.initTodoCollector = function (selectorOrElements, options) {
    return apply(selectorOrElements, options);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})(window, document);