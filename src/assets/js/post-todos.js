(() => {
  'use strict';

  const panel = document.getElementById('post-todos');
  const toggle = document.querySelector('[data-todo-toggle]');
  if (!panel || !toggle) return;
  const action = toggle.closest('[data-todo-action]');
  const list = panel.querySelector('[data-todo-items]');
  const hasNotes = Boolean(list.querySelector('.post-todos__note'));
  const entries = new Map();
  const skip = 'script,style,noscript,textarea,input,select,button,pre,code,svg,math,[data-todo-ignore],.post-todo-mark';
  let nextId = 0;

  function updateToggle() {
    action.hidden = !hasNotes && entries.size === 0;
  }

  function collect(container) {
    if (!container) return;
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode: node => node.data.includes('TODO:') && !node.parentElement.closest(skip)
        ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      let offset = 0;
      for (const match of node.data.matchAll(/TODO:/g)) {
        fragment.append(document.createTextNode(node.data.slice(offset, match.index)));
        const mark = document.createElement('mark');
        do { mark.id = 'post-todo-' + (++nextId); } while (document.getElementById(mark.id));
        mark.className = 'post-todo-mark';
        mark.tabIndex = -1;
        mark.textContent = 'TODO:';
        fragment.append(mark);
        offset = match.index + match[0].length;
      }
      fragment.append(document.createTextNode(node.data.slice(offset)));
      node.replaceWith(fragment);
    });
    container.querySelectorAll('.post-todo-mark').forEach(mark => {
      if (entries.has(mark.id)) return;
      const block = mark.closest('p,li,dd,dt,td,th,figcaption,h1,h2,h3,h4,h5,h6,.jsd-heading') || mark.parentElement;
      const range = document.createRange();
      range.selectNodeContents(block);
      range.setStartAfter(mark);
      const text = range.toString().split(/TODO:|[\r\n]/)[0].trim();
      entries.set(mark.id, 'TODO: ' + text);
    });
    updateToggle();
  }

  function collectArticle() {
    document.querySelectorAll('#main_atcl .post-content').forEach(collect);
  }

  function renderList() {
    list.querySelectorAll('[data-todo-link]').forEach(item => item.remove());
    entries.forEach((text, id) => {
      const item = document.createElement('li');
      item.dataset.todoLink = '';
      const link = document.createElement('a');
      link.href = '#' + id;
      link.textContent = text;
      item.append(link);
      list.append(item);
    });
    const empty = list.children.length === 0;
    list.hidden = empty;
    panel.querySelector('[data-todo-empty]').hidden = !empty;
  }

  toggle.addEventListener('click', () => {
    collectArticle();
    renderList();
    panel.showModal();
    toggle.setAttribute('aria-expanded', 'true');
  });
  panel.querySelector('[data-todo-close]').addEventListener('click', () => panel.close());
  panel.addEventListener('close', () => toggle.setAttribute('aria-expanded', 'false'));
  panel.addEventListener('click', event => {
    if (event.target === panel) panel.close();
    const link = event.target.closest('[data-todo-link] a');
    if (!link) return;
    event.preventDefault();
    const id = link.hash.slice(1);
    window.JSDLinearSlides?.reveal?.(id);
    window.JSDTreeSlides?.reveal?.(id);
    const target = document.getElementById(id);
    if (!target) return;
    for (let parent = target.parentElement; parent; parent = parent.parentElement) {
      if (parent.tagName === 'DETAILS') parent.open = true;
      if (parent.classList.contains('bt-collapsed')) window.BilingualToggle?.toggle?.(parent);
    }
    const languageCell = target.closest('.bmd-cell');
    if (languageCell && !languageCell.getClientRects().length) {
      const side = languageCell.classList.contains('bmd-cell-right') ? 'right' : 'left';
      languageCell.closest('.bmd-wrapper').querySelector('.bmd-button-' + side)?.click();
    }
    panel.close();
    target.focus({preventScroll: true});
    target.scrollIntoView({block: 'center', behavior: 'auto'});
    history.replaceState(null, '', '#' + id);
  });

  // Index the complete source before slide engines cache and replace it.
  updateToggle();
  document.addEventListener('content:prepare', event => collect(event.detail.container));
  document.addEventListener('content:rendered', event => collect(event.detail.container));
  document.addEventListener('DOMContentLoaded', collectArticle, {once: true});
})();
