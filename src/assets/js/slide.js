(function () {
  const DEFAULTS = {
    rootSelector: ".content", // 选中 class="content" 的正文容器
    titleSelector: "h1",      // 每个 h1 作为一页的开始

    slideClass: "slide-section",
    activeClass: "is-active",
    animClassPrefix: "slide-anim-", // 动画类名前缀

    startIndex: 0,            // 初始页，从 0 开始
    loop: true,               // 是否循环翻页

    keyboard: true,           // 是否启用键盘翻页
    showControls: true,       // 是否显示右下角按钮

    controlsClass: "slide-controls",
    buttonClass: "slide-btn",
    prevButtonText: "◀",      // 上一页按钮文字
    nextButtonText: "▶",      // 下一页按钮文字
    prevButtonLabel: "上一页",
    nextButtonLabel: "下一页",

    prevKeys: ["ArrowLeft", "PageUp", "Backspace"], // 上一页按键
    nextKeys: ["ArrowRight", "PageDown", " ", "Enter"], // 下一页按键

    allowTypingTarget: false, // 输入框聚焦时是否仍响应翻页键

    animations: ["fade-up", "zoom-in", "slide-in-right"], // 3 种动画，随机选 1 种
    onInit: null,
    onRender: null
  };

  function mergeOptions(userOptions) {
    const options = { ...DEFAULTS, ...(userOptions || {}) };

    options.nextKeys = Array.isArray(userOptions?.nextKeys)
      ? userOptions.nextKeys
      : DEFAULTS.nextKeys.slice();

    options.prevKeys = Array.isArray(userOptions?.prevKeys)
      ? userOptions.prevKeys
      : DEFAULTS.prevKeys.slice();

    options.animations = Array.isArray(userOptions?.animations) && userOptions.animations.length
      ? userOptions.animations.slice()
      : DEFAULTS.animations.slice();

    return options;
  }

  function isTypingTarget(el) {
    if (!el) return false;
    const tag = el.tagName;
    return (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT" ||
      el.isContentEditable
    );
  }

  function clampIndex(index, count, loop) {
    if (count <= 0) return 0;
    if (loop) {
      return ((index % count) + count) % count;
    }
    return Math.max(0, Math.min(index, count - 1));
  }

  function createSlides(root, titleSelector, slideClass) {
    const nodes = Array.from(root.children);
    const slides = [];
    const fragment = document.createDocumentFragment();
    let currentSlide = null;

    for (const node of nodes) {
      if (node.matches(titleSelector)) {
        currentSlide = document.createElement("section");
        currentSlide.className = slideClass;
        slides.push(currentSlide);
        fragment.appendChild(currentSlide);
      }

      if (currentSlide) {
        currentSlide.appendChild(node);
      }
    }

    if (slides.length === 0) {
      const single = document.createElement("section");
      single.className = slideClass;

      while (root.firstChild) {
        single.appendChild(root.firstChild);
      }

      root.appendChild(single);
      return [single];
    }

    root.innerHTML = "";
    root.appendChild(fragment);
    return slides;
  }

  function createControls(options) {
    const controls = document.createElement("div");
    controls.className = options.controlsClass;
    controls.innerHTML = `
      <button
        type="button"
        class="${options.buttonClass}"
        data-slide-action="prev"
        aria-label="${options.prevButtonLabel}"
      >${options.prevButtonText}</button>
      <button
        type="button"
        class="${options.buttonClass}"
        data-slide-action="next"
        aria-label="${options.nextButtonLabel}"
      >${options.nextButtonText}</button>
    `;
    document.body.appendChild(controls);
    return controls;
  }

  function pickRandomAnimation(options) {
    const list = options.animations;
    const i = Math.floor(Math.random() * list.length);
    return options.animClassPrefix + list[i];
  }

  function clearAnimationClasses(slide, options) {
    options.animations.forEach(function (name) {
      slide.classList.remove(options.animClassPrefix + name);
    });
  }

  function init(userOptions = {}) {
    const options = mergeOptions(userOptions);
    const root = document.querySelector(options.rootSelector);

    if (!root) {
      console.warn("[JekyllSlides] root not found:", options.rootSelector);
      return null;
    }

    const slides = createSlides(root, options.titleSelector, options.slideClass);
    const count = slides.length;

    let index = clampIndex(options.startIndex, count, options.loop);
    let controls = null;
    let destroyed = false;

    function render() {
      slides.forEach((slide, i) => {
        slide.classList.toggle(options.activeClass, i === index);
        clearAnimationClasses(slide, options);
      });

      const activeSlide = slides[index];
      const animClass = pickRandomAnimation(options);

      // 强制浏览器重新计算，保证重复进入同一类动画时也能播放
      void activeSlide.offsetWidth;

      activeSlide.classList.add(animClass);

      if (typeof options.onRender === "function") {
        options.onRender({
          index,
          count,
          slide: activeSlide,
          slides,
          animationClass: animClass
        });
      }
    }

    function goTo(nextIndex) {
      if (destroyed) return;
      index = clampIndex(nextIndex, count, options.loop);
      render();
    }

    function next() {
      goTo(index + 1);
    }

    function prev() {
      goTo(index - 1);
    }

    function onKeydown(e) {
      if (!options.keyboard) return;

      if (!options.allowTypingTarget && isTypingTarget(document.activeElement)) {
        return;
      }

      if (options.nextKeys.includes(e.key)) {
        e.preventDefault();
        next();
        return;
      }

      if (options.prevKeys.includes(e.key)) {
        e.preventDefault();
        prev();
      }
    }

    function onControlClick(e) {
      const action = e.target.closest("[data-slide-action]")?.dataset.slideAction;
      if (!action) return;

      if (action === "next") next();
      if (action === "prev") prev();
    }

    if (options.showControls) {
      controls = createControls(options);
      controls.addEventListener("click", onControlClick);
    }

    if (options.keyboard) {
      document.addEventListener("keydown", onKeydown);
    }

    render();

    const api = {
      next,
      prev,
      goTo,
      render,
      getIndex() {
        return index;
      },
      getCount() {
        return count;
      },
      destroy() {
        if (destroyed) return;
        destroyed = true;

        document.removeEventListener("keydown", onKeydown);

        if (controls) {
          controls.removeEventListener("click", onControlClick);
          controls.remove();
        }
      }
    };

    if (typeof options.onInit === "function") {
      options.onInit({
        index,
        count,
        slide: slides[index],
        slides,
        api
      });
    }

    return api;
  }

  window.JekyllSlides = { init };
})();