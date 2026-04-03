/*
  todo_highlighter_summary.js

  用法：
  1. 页面加载后调用 initTodoCollector('.your-class')
  2. 它会在匹配的容器中：
     - 高亮所有 "TODO:" 开始的文本片段
     - 在页面右下角插入一个可关闭的悬浮汇总窗
     - 关闭后保留一个 "TODOs" 按钮用于重新展开
     - 汇总列表按顺序列出，并可点击跳转
     - 每条 TODO 后附带其所在节标题的前 8 个字；若超过 8 个字则加 ...
     - 若未找到该节标题，则显示 "TODO: at the begining"

  说明：
  - 默认按文本节点扫描，避免粗暴替换整个 innerHTML。
  - 默认将最近的 h1-h6 视为“该节标题”。
*/

(function () {
  let todoGlobalCounter = 0;
  let floatingPanelCreated = false;
  let floatingListEl = null;
  let floatingBoxEl = null;
  let reopenButtonEl = null;

  function initTodoCollector(targetSelector) {
    const containers = document.querySelectorAll(targetSelector);
    const allTodos = [];

    containers.forEach((container, containerIndex) => {
      const todos = processContainer(container, containerIndex);
      allTodos.push(...todos);
    });

    if (allTodos.length > 0) {
      ensureFloatingPanel();
      renderFloatingSummary(allTodos);
      injectStyles();
    }
  }

  function processContainer(container, containerIndex) {
    const todos = [];
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.nodeValue || !node.nodeValue.includes('TODO:')) {
            return NodeFilter.FILTER_REJECT;
          }
          if (!node.parentElement) {
            return NodeFilter.FILTER_REJECT;
          }
          if (
            node.parentElement.closest('.todo-floating-box') ||
            node.parentElement.closest('.todo-highlight') ||
            node.parentElement.closest('.todo-reopen-button')
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    let current;
    while ((current = walker.nextNode())) {
      textNodes.push(current);
    }

    textNodes.forEach((textNode) => {
      highlightTodosInTextNode(textNode, todos, container, containerIndex);
    });

    return todos;
  }

  function highlightTodosInTextNode(textNode, todos, container, containerIndex) {
    const text = textNode.nodeValue;
    const regex = /TODO:[^\n\r]*/g;
    let match;
    let lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let hasMatch = false;

    while ((match = regex.exec(text)) !== null) {
      hasMatch = true;

      const beforeText = text.slice(lastIndex, match.index);
      if (beforeText) {
        fragment.appendChild(document.createTextNode(beforeText));
      }

      const todoText = match[0].trim();
      const sectionTitle = getSectionTitle(textNode, container);
      const hasTitle = !!sectionTitle;
      const shortTodoText = truncateTitle(todoText, 15);
      const displayTitle = hasTitle ? truncateTitle(sectionTitle, 15) : 'TODO: at the begining';
      const displayText = `${shortTodoText} [${displayTitle}]`;
      const todoId = `todo-${containerIndex}-${++todoGlobalCounter}`;

      const span = document.createElement('mark');
      span.className = 'todo-highlight';
      span.id = todoId;
      span.setAttribute('tabindex', '-1');
      span.textContent = todoText;

      fragment.appendChild(span);
      todos.push({
        id: todoId,
        text: todoText,
        displayText,
        sectionTitle,
        displayTitle
      });

      lastIndex = match.index + match[0].length;
    }

    if (!hasMatch) {
      return;
    }

    const remainingText = text.slice(lastIndex);
    if (remainingText) {
      fragment.appendChild(document.createTextNode(remainingText));
    }

    textNode.parentNode.replaceChild(fragment, textNode);
  }

  function getSectionTitle(textNode, container) {
    let el = textNode.parentElement;
    while (el && el !== container) {
      let prev = el.previousElementSibling;
      while (prev) {
        const heading = findLastHeadingInside(prev);
        if (heading) {
          return cleanText(heading.textContent);
        }
        prev = prev.previousElementSibling;
      }
      el = el.parentElement;
    }

    let prev = textNode.parentElement ? textNode.parentElement.previousElementSibling : null;
    while (prev) {
      const heading = findLastHeadingInside(prev);
      if (heading) {
        return cleanText(heading.textContent);
      }
      prev = prev.previousElementSibling;
    }

    return '';
  }

  function findLastHeadingInside(element) {
    if (!element || !element.querySelectorAll) {
      return null;
    }

    if (isHeading(element)) {
      return element;
    }

    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    return headings.length ? headings[headings.length - 1] : null;
  }

  function isHeading(element) {
    return /^H[1-6]$/.test(element.tagName);
  }

  function cleanText(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
  }

  function truncateTitle(text, maxLen) {
    const clean = cleanText(text);
    if (!clean) return '';
    if (clean.length <= maxLen) return clean;
    return clean.slice(0, maxLen) + '...';
  }

  function ensureFloatingPanel() {
    if (floatingPanelCreated) {
      return;
    }

    const box = document.createElement('div');
    box.className = 'todo-floating-box';
    box.id = 'todo-floating-box';

    const header = document.createElement('div');
    header.className = 'todo-floating-header';

    const title = document.createElement('div');
    title.className = 'todo-floating-title';
    title.textContent = 'TODO 汇总';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'todo-floating-close';
    closeBtn.setAttribute('aria-label', '关闭 TODO 汇总');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', function () {
      hideFloatingPanel();
    });

    const body = document.createElement('div');
    body.className = 'todo-floating-body';

    const list = document.createElement('ol');
    list.className = 'todo-floating-list';

    body.appendChild(list);
    header.appendChild(title);
    header.appendChild(closeBtn);
    box.appendChild(header);
    box.appendChild(body);
    document.body.appendChild(box);

    const reopenButton = document.createElement('button');
    reopenButton.type = 'button';
    reopenButton.className = 'todo-reopen-button';
    reopenButton.textContent = 'TODOs';
    reopenButton.style.display = 'none';
    reopenButton.addEventListener('click', function () {
      showFloatingPanel();
    });
    document.body.appendChild(reopenButton);

    makeDraggable(box, header);

    floatingBoxEl = box;
    floatingListEl = list;
    reopenButtonEl = reopenButton;
    floatingPanelCreated = true;
  }

  function hideFloatingPanel() {
    if (floatingBoxEl) {
      floatingBoxEl.style.display = 'none';
    }
    if (reopenButtonEl) {
      reopenButtonEl.style.display = 'inline-flex';
    }
  }

  function showFloatingPanel() {
    if (floatingBoxEl) {
      floatingBoxEl.style.display = 'block';
    }
    if (reopenButtonEl) {
      reopenButtonEl.style.display = 'none';
    }
  }

  function renderFloatingSummary(todos) {
    if (!floatingListEl) {
      return;
    }

    floatingListEl.innerHTML = '';

    todos.forEach((todo) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${todo.id}`;
      link.textContent = todo.displayText;
      link.title = todo.sectionTitle ? `${todo.text} [${todo.sectionTitle}]` : `${todo.text} [TODO: at the begining]`;

      link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = document.getElementById(todo.id);
        if (!target) return;

        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.focus({ preventScroll: true });
        flashTarget(target);

        if (history.pushState) {
          history.pushState(null, '', `#${todo.id}`);
        } else {
          location.hash = todo.id;
        }
      });

      item.appendChild(link);
      floatingListEl.appendChild(item);
    });
  }

  function flashTarget(target) {
    target.classList.add('todo-highlight-active');
    setTimeout(() => {
      target.classList.remove('todo-highlight-active');
    }, 1600);
  }

  function makeDraggable(box, handle) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    handle.addEventListener('mousedown', function (event) {
      if (event.target && event.target.closest('.todo-floating-close')) {
        return;
      }

      isDragging = true;
      const rect = box.getBoundingClientRect();
      startX = event.clientX;
      startY = event.clientY;
      startLeft = rect.left;
      startTop = rect.top;

      box.style.left = rect.left + 'px';
      box.style.top = rect.top + 'px';
      box.style.right = 'auto';
      box.style.bottom = 'auto';

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      event.preventDefault();
    });

    function onMouseMove(event) {
      if (!isDragging) return;

      const nextLeft = startLeft + (event.clientX - startX);
      const nextTop = startTop + (event.clientY - startY);
      box.style.left = Math.max(0, nextLeft) + 'px';
      box.style.top = Math.max(0, nextTop) + 'px';
    }

    function onMouseUp() {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }

  function injectStyles() {
    if (document.getElementById('todo-collector-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'todo-collector-styles';
    style.textContent = `
      .todo-floating-box {
        position: fixed;
        right: 16px;
        bottom: 16px;
        width: 360px;
        max-width: calc(100vw - 24px);
        max-height: min(60vh, 520px);
        z-index: 99999;
        border: 1px solid currentColor;
        background: #ffffff;
        border-radius: 0;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
        overflow: hidden;
        font-size: 14px;
        color: inherit;
      }

      .todo-floating-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        border-bottom: 1px solid currentColor;
        background: #ffffff;
        cursor: move;
        user-select: none;
      }

      .todo-floating-title {
        font-weight: 700;
      }

      .todo-floating-close {
        border: none;
        background: transparent;
        color: inherit;
        font-size: 20px;
        line-height: 1;
        cursor: pointer;
        padding: 0 2px;
      }

      .todo-floating-body {
        overflow: auto;
        max-height: calc(min(60vh, 520px) - 48px);
        padding: 10px 12px 12px;
      }

      .todo-floating-list {
        margin: 0;
        padding-left: 20px;
      }

      .todo-floating-list li + li {
        margin-top: 8px;
      }

      .todo-floating-list a {
        text-decoration: underline;
        cursor: pointer;
        color: inherit;
        word-break: break-word;
      }

      .todo-reopen-button {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 99999;
        border: 1px solid currentColor;
        background: #ffffff;
        border-radius: 0;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
        padding: 10px 14px;
        font-size: 14px;
        font-weight: 600;
        line-height: 1;
        cursor: pointer;
        color: inherit;
      }

      .todo-highlight {
        background: #ffec99;
        color: inherit;
        padding: 0 3px;
        border-radius: 0;
      }

      .todo-highlight-active {
        outline: 2px solid currentColor;
        transition: outline 0.2s ease;
      }
    `;

    document.head.appendChild(style);
  }

  window.initTodoCollector = initTodoCollector;
})();

/*
  示例：
  document.addEventListener('DOMContentLoaded', function () {
    initTodoCollector('.article-body');
  });
*/
