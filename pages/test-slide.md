---
layout: slide-simple
permalink: /slide
context_menu: false
author: 垃圾残渣
show_date: true
---

# Jekyll Tree Slides v1.2 使用说明（中文）

## 概述

**`jekyll-tree-slides-v1.2.js`** 是一个专门用于 **Jekyll / Markdown 页面树状幻灯片展示** 的独立脚本。

它只处理 **tree 模式**，即：

- **`h1`** 表示 **大节**（major section）
- **`h2`** 表示 **小节 / slide**

脚本会直接重构目标内容块的显示方式，把原页面内容改为一页一页的 slide 视图，同时保留原站点的颜色、背景和大部分排版继承。

---

## 已实现功能

### 1. 树状 slide 解析

脚本只识别如下结构：

- **`h1 -> h2 -> 内容`**

当前版本的规则是：

- 只有当某个 **`h1`** 下方 **至少有一个 `h2`** 时，它才会被视为一个 **major section**。
- 如果某个 **`h1`** 下没有 **`h2`**，那么这个 **`h1`** 及其对应内容 **不会参与 tree 模式**。
- **`h1`** 与它的第一个 **`h2`** 之间的所有内容，都会被**直接剔除**。
- 因此，一个大节的**第一页永远是第一个 `h2`**。

这使得逻辑保持简单：

- **大节**：由 `h1` 定义
- **分页**：只由 `h2` 定义
- **正文**：只取每个 `h2` 下方直到下一个 `h2` 或下一个 `h1` 之前的内容

---

### 2. 幻灯片显示

页面加载后，脚本会：

- 找到主内容块
- 解析其中的 `h1 / h2`
- 把页面改造成 slide 视图
- **默认直接显示第一页**

slide 视图由两部分组成：

- **`jsd-heading`**：当前 `h2` 标题
- **`jsd-slide-body`**：当前小节正文

其中：

- **`jsd-heading`** 使用独立的 **`div`**，不是 `strong`
- 标题为 **加粗、居中显示**
- 标题字号可通过配置倍率控制

---

### 3. 右下角悬浮控件

脚本会在页面 **右下角** 生成一个独立悬浮控件，包含：

- 标题栏
- 小地图（mini-map）
- 4 个控制按钮

特点：

- **`position: fixed`** 固定在右下角
- 可拖动
- 不插入正文流中
- 不破坏正文布局

---

### 4. 小地图（mini-map）

小地图用于显示树状结构：

- **纵向**：表示大节之间的上下关系
- **横向**：表示同一大节内部小节之间的左右关系

显示规则：

- 每个大节的**第一个小节**使用**空心大圆点**
- 其他小节使用**实心小圆点**
- 当前页会被高亮显示

透明度规则：

- 平时整体透明度：**`0.2`**
- 鼠标悬停时整体透明度：**`0.7`**

---

### 5. 控制按钮

tree 模式下有 **4 个按钮**：

- `<<`：上一大节
- `<`：上一页
- `>`：下一页
- `>>`：下一大节

按钮文字不是 emoji，而是普通字符。

对应键盘绑定：

- `ArrowUp`：上一大节
- `ArrowLeft`：上一页
- `ArrowRight`：下一页
- `ArrowDown`：下一大节

---

### 6. 循环切换

切换是**循环**的：

- 最后一页的下一页会回到第一页
- 第一页的上一页会回到最后一页
- 上一大节 / 下一大节也会循环

---

### 7. 切换动画

每次切换 slide 时，会在 3 种简单动画中随机选择一种：

- 淡入
- 向上浮入
- 轻微缩放淡入

动画时长可配置。

---

### 8. 手机兼容

脚本内置手机模式判断。

当屏幕宽度小于等于 **`mobileBreakpoint`** 时：

- **`jsd-heading`** 的 padding 自动变为 `0`
- **`jsd-slide-body`** 的 padding 自动变为 `0`

这使得手机上不会因为左右边距过大而挤压正文。

---

## 引入方式

把脚本放到站点静态目录，例如：

```html
<script src="/assets/js/jekyll-tree-slides-v1.2.js"></script>
```

脚本会在页面加载后自动尝试启动。

---

## 默认查找的内容块

脚本只会取**第一个匹配到的主内容块**。

默认查找顺序为：

```js
[
  '#main-content',
  '.post-content',
  '.page-content',
  'article',
  'main',
  '.markdown-body',
  '.content',
  '#content'
]
```

如果需要指定，可以通过配置覆盖。

---

## 基本用法

```html
<script src="/assets/js/jekyll-tree-slides-v1.2.js"></script>
<script>
  updateTreeConfig({
    targetSelectors: ['.post-content']
  });
</script>
```

---

## 配置项

### 1. `targetSelectors`

用于指定目标内容块的选择器数组。

```js
updateTreeConfig({
  targetSelectors: ['.post-content']
});
```

---

### 2. `headingPadding`

控制 **`jsd-heading`** 的位置。

```js
updateTreeConfig({
  headingPadding: { top: 16, right: 24, bottom: 12, left: 24 }
});
```

等价于给 `jsd-heading` 设置：

```css
padding: top right bottom left;
```

---

### 3. `bodyPadding`

控制 **`jsd-slide-body`** 的位置。

```js
updateTreeConfig({
  bodyPadding: { top: 0, right: 48, bottom: 0, left: 48 }
});
```

---

### 4. `titleScale`

控制标题字号倍率，默认值为 **`1.8`**。

```js
updateTreeConfig({
  titleScale: 1.8
});
```

其作用等价于：

```css
font-size: calc(1em * titleScale);
```

---

### 5. `mobileBreakpoint`

控制手机模式断点，默认值为 **`768`**。

```js
updateTreeConfig({
  mobileBreakpoint: 768
});
```

---

### 6. `widgetPosition`

控制右下角控件默认位置。

```js
updateTreeConfig({
  widgetPosition: { right: 20, bottom: 20 }
});
```

---

### 7. `widgetSize`

控制控件尺寸。

```js
updateTreeConfig({
  widgetSize: { width: 260, mapHeight: 120 }
});
```

---

### 8. `opacityIdle` 与 `opacityHover`

控制悬浮控件透明度。

```js
updateTreeConfig({
  opacityIdle: 0.2,
  opacityHover: 0.7
});
```

---

### 9. `animationMs`

控制切换动画时长。

```js
updateTreeConfig({
  animationMs: 260
});
```

---

### 10. `labels`

控制按钮文字。

```js
updateTreeConfig({
  labels: {
    prevMajor: '<<',
    prevSlide: '<',
    nextSlide: '>',
    nextMajor: '>>'
  }
});
```

---

## 完整配置示例

```html
<script src="/assets/js/jekyll-tree-slides-v1.2.js"></script>
<script>
  updateTreeConfig({
    targetSelectors: ['.post-content'],
    widgetPosition: { right: 20, bottom: 20 },
    widgetSize: { width: 260, mapHeight: 120 },
    opacityIdle: 0.2,
    opacityHover: 0.7,
    mobileBreakpoint: 768,
    headingPadding: { top: 16, right: 24, bottom: 12, left: 24 },
    bodyPadding: { top: 0, right: 48, bottom: 0, left: 48 },
    animationMs: 260,
    titleScale: 1.8,
    labels: {
      prevMajor: '<<',
      prevSlide: '<',
      nextSlide: '>',
      nextMajor: '>>'
    }
  });
</script>
```

---

## 推荐的 Markdown 结构

```md
# Part 1
Some intro text here will be discarded.

## Slide 1
Content A

## Slide 2
Content B

# Part 2
## Slide 1
Content C
```

在这个结构中：

- `# Part 1` 是一个大节
- `Some intro text here will be discarded.` 会被剔除
- `## Slide 1` 才是这个大节的第一页

---

## 不会显示的内容

以下内容不会出现在 tree slide 中：

- 页面最开头、但还没进入任何 `h1` 的内容
- 某个 `h1` 下没有 `h2` 的整段内容
- `h1` 与第一个 `h2` 之间的内容

---

## 公共接口

### `updateTreeConfig({...})`

更新配置并重建。

### `window.JSDTreeSlides.rebuild({...})`

重建 slide 结构。

### `window.JSDTreeSlides.destroy()`

销毁 slide 模式，并恢复原始 DOM。

### `window.JSDTreeSlides.getState()`

获取当前状态，包括：

- 当前大节索引
- 当前页索引
- 大节总数
- 总页数

### `window.JSDTreeSlides.getConfig()`

获取当前配置。

---

## 限制说明

1. 当前版本只支持 **tree 模式**。
2. 只会处理**一个目标内容块**，即第一个匹配到的元素。
3. slide 分页只识别 **`h1 / h2`**，不会识别 `h3` 作为独立分页层级。
4. 小地图和控件是独立浮层，不会插入正文，但可能受页面自身 `z-index` 体系影响。
5. 如果页面中不存在合法的 **`h1 -> h2`** 结构，脚本将不会重构页面。


# Jekyll Tree Slides v1.2 Guide (English)

## Overview

**`jekyll-tree-slides-v1.2.js`** is a standalone script for turning a **Jekyll / Markdown page** into a **tree-structured slide view**.

It handles **tree mode only**, with the following meaning:

- **`h1`** = **major section**
- **`h2`** = **subsection / slide**

The script restructures the display of the selected content block into a slide-based interface while keeping the site's original color scheme, background, and most inherited typography.

---

## Implemented features

### 1. Tree slide parsing

The script only recognizes this structure:

- **`h1 -> h2 -> content`**

The current rules are:

- A **`h1`** is treated as a **major section** only if it contains **at least one `h2`**.
- If a **`h1`** has no **`h2`**, that entire block is **ignored** in tree mode.
- Any content between a **`h1`** and its first **`h2`** is **discarded**.
- Therefore, the **first slide** of a major section is always its **first `h2`**.

This keeps the logic simple:

- **Major sections** are defined by `h1`
- **Slides** are defined only by `h2`
- **Body content** is the content under each `h2`, up to the next `h2` or the next `h1`

---

### 2. Slide display

After the page loads, the script will:

- find the main content block
- parse its `h1 / h2`
- convert the page into a slide view
- **show the first slide immediately**

The slide view has two main parts:

- **`jsd-heading`**: the current `h2` title
- **`jsd-slide-body`**: the current slide body

Details:

- **`jsd-heading`** is a standalone **`div`**, not a `strong`
- the title is **bold** and **centered**
- the title size can be controlled by a scale factor

---

### 3. Floating widget in the bottom-right corner

The script creates an independent floating widget in the **bottom-right corner** of the page. It contains:

- a header bar
- a mini-map
- 4 control buttons

Characteristics:

- fixed with **`position: fixed`**
- draggable
- not inserted into the article flow
- does not disrupt the main document layout

---

### 4. Mini-map

The mini-map shows the tree structure:

- **vertical direction** = relation among major sections
- **horizontal direction** = relation among slides inside the same major section

Display rules:

- the **first slide** of a major section is shown as a **large hollow dot**
- the other slides are shown as **small solid dots**
- the current slide is highlighted

Opacity rules:

- idle opacity: **`0.2`**
- hover opacity: **`0.7`**

---

### 5. Control buttons

In tree mode there are **4 buttons**:

- `<<` = previous major section
- `<` = previous slide
- `>` = next slide
- `>>` = next major section

They use plain text characters, not emoji.

Keyboard bindings:

- `ArrowUp` = previous major section
- `ArrowLeft` = previous slide
- `ArrowRight` = next slide
- `ArrowDown` = next major section

---

### 6. Loop navigation

Navigation is **cyclic**:

- advancing past the last slide returns to the first slide
- moving backward from the first slide returns to the last slide
- previous / next major section also loop

---

### 7. Transition animations

Each slide switch randomly selects one of 3 simple animations:

- fade in
- upward fade in
- slight zoom fade in

The animation duration is configurable.

---

### 8. Mobile support

The script includes a mobile mode rule.

When the screen width is less than or equal to **`mobileBreakpoint`**:

- the padding of **`jsd-heading`** becomes `0`
- the padding of **`jsd-slide-body`** becomes `0`

This prevents excessive side spacing on small screens.

---

## Include the script

Place the script in your static assets directory, for example:

```html
<script src="/assets/js/jekyll-tree-slides-v1.2.js"></script>
```

The script will try to start automatically after the page loads.

---

## Default target lookup

The script uses only the **first matched main content block**.

The default selector order is:

```js
[
  '#main-content',
  '.post-content',
  '.page-content',
  'article',
  'main',
  '.markdown-body',
  '.content',
  '#content'
]
```

You can override this with configuration.

---

## Basic usage

```html
<script src="/assets/js/jekyll-tree-slides-v1.2.js"></script>
<script>
  updateTreeConfig({
    targetSelectors: ['.post-content']
  });
</script>
```

---

## Configuration options

### 1. `targetSelectors`

An array of selectors used to find the target content block.

```js
updateTreeConfig({
  targetSelectors: ['.post-content']
});
```

---

### 2. `headingPadding`

Controls the position of **`jsd-heading`**.

```js
updateTreeConfig({
  headingPadding: { top: 16, right: 24, bottom: 12, left: 24 }
});
```

This is equivalent to setting:

```css
padding: top right bottom left;
```

---

### 3. `bodyPadding`

Controls the position of **`jsd-slide-body`**.

```js
updateTreeConfig({
  bodyPadding: { top: 0, right: 48, bottom: 0, left: 48 }
});
```

---

### 4. `titleScale`

Controls the title font-size multiplier. The default value is **`1.8`**.

```js
updateTreeConfig({
  titleScale: 1.8
});
```

Its effect is equivalent to:

```css
font-size: calc(1em * titleScale);
```

---

### 5. `mobileBreakpoint`

Controls the mobile breakpoint. The default value is **`768`**.

```js
updateTreeConfig({
  mobileBreakpoint: 768
});
```

---

### 6. `widgetPosition`

Controls the default position of the floating widget.

```js
updateTreeConfig({
  widgetPosition: { right: 20, bottom: 20 }
});
```

---

### 7. `widgetSize`

Controls the widget dimensions.

```js
updateTreeConfig({
  widgetSize: { width: 260, mapHeight: 120 }
});
```

---

### 8. `opacityIdle` and `opacityHover`

Control the opacity of the floating widget.

```js
updateTreeConfig({
  opacityIdle: 0.2,
  opacityHover: 0.7
});
```

---

### 9. `animationMs`

Controls the transition duration.

```js
updateTreeConfig({
  animationMs: 260
});
```

---

### 10. `labels`

Controls the button labels.

```js
updateTreeConfig({
  labels: {
    prevMajor: '<<',
    prevSlide: '<',
    nextSlide: '>',
    nextMajor: '>>'
  }
});
```

---

## Full configuration example

```html
<script src="/assets/js/jekyll-tree-slides-v1.2.js"></script>
<script>
  updateTreeConfig({
    targetSelectors: ['.post-content'],
    widgetPosition: { right: 20, bottom: 20 },
    widgetSize: { width: 260, mapHeight: 120 },
    opacityIdle: 0.2,
    opacityHover: 0.7,
    mobileBreakpoint: 768,
    headingPadding: { top: 16, right: 24, bottom: 12, left: 24 },
    bodyPadding: { top: 0, right: 48, bottom: 0, left: 48 },
    animationMs: 260,
    titleScale: 1.8,
    labels: {
      prevMajor: '<<',
      prevSlide: '<',
      nextSlide: '>',
      nextMajor: '>>'
    }
  });
</script>
```

---

## Recommended Markdown structure

```md
# Part 1
Some intro text here will be discarded.

## Slide 1
Content A

## Slide 2
Content B

# Part 2
## Slide 1
Content C
```

In this structure:

- `# Part 1` is a major section
- `Some intro text here will be discarded.` is removed
- `## Slide 1` is the true first slide of that major section

---

## Content that will not be shown

The following content will not appear in tree slide mode:

- content before the first valid `h1`
- an entire `h1` block that has no `h2`
- content between a `h1` and its first `h2`

---

## Public API

### `updateTreeConfig({...})`

Updates the configuration and rebuilds the slide layout.

### `window.JSDTreeSlides.rebuild({...})`

Rebuilds the slide structure.

### `window.JSDTreeSlides.destroy()`

Destroys the slide mode and restores the original DOM.

### `window.JSDTreeSlides.getState()`

Returns the current state, including:

- current major index
- current slide index
- total number of major sections
- total number of slides

### `window.JSDTreeSlides.getConfig()`

Returns the current configuration.

---

## Limitations

1. The current version supports **tree mode only**.
2. It processes only **one target content block**, namely the first matched element.
3. Slide pagination recognizes only **`h1 / h2`**; it does not treat `h3` as another paging level.
4. The mini-map and widget are independent floating layers. They do not enter the article flow, but they may still be affected by the page's own `z-index` system.
5. If the page does not contain a valid **`h1 -> h2`** structure, the script will not rebuild the page.

# Jekyll Linear Slides v1.2 使用说明（中文）

## 1. 概述

`jekyll-linear-slides-v1.2.js` 是一个面向 **Jekyll / Markdown 页面** 的前端注入脚本。
它通过 **JavaScript + CSS 重构 DOM** 的方式，把页面主内容区改造成 **线性幻灯片（linear slides）**。

这个脚本只负责 **linear 系列模式**，不包含 tree 模式。

它的设计目标是：

- **尽量保留原站样式**，只控制内容组织、显示/隐藏、标题显示和悬浮控件。
- **引入即生效**。
- 可通过页面中的 `updateLinearConfig()` 覆盖默认配置。
- 使用一个统一的控件体系，通过不同 `mode` 和 `controls` 配置派生出不同交互样式。

---

## 2. 已实现的功能

### 2.1 基础功能

- 自动寻找页面中的**主内容容器**。
- 将容器中的内容解析为一组**线性 slide**。
- 打开页面后**直接显示第一页**。
- 使用独立的 `div.jsd-heading` 作为标题区域，**加粗、居中显示**。
- 使用 `div.jsd-slide-body` 作为正文区域。
- 标题与正文的位置可以通过 padding 配置控制。
- 页面切换带有**随机动画**，内置 3 种：
  - fade
  - up
  - zoom
- 支持**循环翻页**。
- 控件固定在**右下角悬浮显示**，且可拖动。

### 2.2 控件相关功能

控件系统内置 6 个按钮位：

1. `menu`：菜单 / 选页
2. `first`：第一页
3. `prev`：上一页
4. `next`：下一页
5. `last`：最后一页
6. `autoplay`：自动播放

这些按钮都可以通过 `config.controls` 控制：

- 是否显示：`show`
- 显示文字：`label`

默认字符为：

- `menu`: `≣`
- `first`: `«`
- `prev`: `‹`
- `next`: `›`
- `last`: `»`
- `autoplay`: `▸`

### 2.3 自动播放

- 点击自动播放按钮后，每隔 `n` 秒跳到下一页。
- 自动循环播放。
- 间隔由 `autoplayInterval` 指定，单位为秒。

### 2.4 菜单功能

- 菜单按钮可展开**标题菜单**。
- 菜单项默认按 slide 顺序列出。
- 点击菜单项可直接跳转到对应 slide。
- 菜单滚动条内置了细滚动条样式，兼容：
  - `scrollbar-width`
  - `scrollbar-color`
  - `::-webkit-scrollbar`

### 2.5 透明度与悬浮

- widget 在非 hover 状态下默认透明度为 **`0.4`**。
- hover 后默认透明度为 **`0.7`**。
- 二者都可通过配置修改：
  - `opacityIdle`
  - `opacityHover`

### 2.6 手机兼容

- 通过 `mobileBreakpoint` 判断是否进入手机模式。
- 手机模式下：
  - `headingPadding` 自动视为 `0`
  - `bodyPadding` 自动视为 `0`
- 这样可以避免标题和正文在小屏幕上被挤压。

### 2.7 键盘支持

默认支持：

- `ArrowLeft`：上一页
- `ArrowRight`：下一页
- `Home`：第一页
- `End`：最后一页
- `Escape`：关闭菜单

在输入框、文本域、下拉框、可编辑元素中不会抢键盘事件。

---

## 3. 模式说明

这个脚本通过 `mode` 派生出不同表现。

### 3.1 `linear`

标准线性模式。

默认按钮：

- `prev`
- `next`

即默认显示：

- `‹`
- `›`

### 3.2 `simple`

简化线性模式。

当前版本中，`simple` 的默认控件布局与 `linear` 一样：

- `prev`
- `next`

它的意义主要是作为一个**语义化预设**，便于你在后续页面中明确指定“只保留前后翻页”。

### 3.3 `language`

语言切换模式。

默认按钮：

- `menu`

菜单按钮默认显示文字：

- `Language`

此模式下：

- 每个**直接子级 `h1`** 被视为一个语言块。
- `h1` 文本作为菜单标题。
- 每个语言块中的**第一个 `h2`~`h6`** 会被取出作为 `jsd-heading`。
- 该标题节点本身不会在正文中重复显示。

### 3.4 `annotation`

注释模式。

默认按钮：

- `first`
- `next`

默认文字：

- `Original`
- `Annotation`

注意：

- `annotation` 当前是一个**控件预设模式**。
- 它本身不引入单独的解析器。
- slide 的解析逻辑仍然来自普通 linear 解析。
- 也就是说，它适合“你已经把正文 / 注释写成线性 slide”的场景。

---

## 4. 解析规则

### 4.1 linear / simple / annotation 的解析规则

脚本会优先寻找目标容器**直接子级标题**中的最外层标题级别。

例如：

- 如果直接子级里有 `h2`，没有 `h1`，那么最外层标题级别就是 `h2`
- 如果直接子级里有 `h3`，没有 `h1/h2`，那么最外层标题级别就是 `h3`

随后：

- 每遇到一个该级别标题，就开始一个新的 slide
- 该标题文字会作为：
  - `menuTitle`
  - `jsd-heading`
- 直到下一个同级标题出现之前的内容，都属于当前 slide

如果目标容器里完全没有标题：

- 整个容器内容会被视为一个 slide
- `jsd-heading` 为空

### 4.2 language 的解析规则

- 只识别目标容器的**直接子级 `h1`**
- 每个 `h1` 开始一个语言 slide
- `h1` 文字用作菜单标题
- 对应语言块内部第一个 `h2`~`h6`：
  - 其文本会被提取为 `jsd-heading`
  - 该标题节点本身会从正文中移除
- 如果没有任何 `h1`，会退回到普通 linear 解析

---

## 5. 接入方式

### 5.1 直接引入

把脚本放到站点静态目录，例如：

```html
<script src="/assets/js/jekyll-linear-slides-v1.2.js"></script>
```

引入后，脚本会在页面加载完成后自动生效。

### 5.2 页面内覆盖配置

```html
<script>
  updateLinearConfig({
    mode: 'linear',
    titleScale: 1.8,
    headingPadding: { top: 16, right: 24, bottom: 12, left: 24 },
    bodyPadding: { top: 0, right: 48, bottom: 0, left: 48 }
  });
</script>
```

---

## 6. 最大 Config（完整配置示例）

下面是当前版本可用的完整配置对象：

```js
updateLinearConfig({
  mode: 'linear',

  targetSelectors: [
    '#main-content',
    '.post-content',
    '.page-content',
    'article',
    'main',
    '.markdown-body',
    '.content',
    '#content'
  ],

  widgetPosition: {
    right: 20,
    bottom: 20
  },

  opacityIdle: 0.4,
  opacityHover: 0.7,

  dragHandleLabel: '✥',
  buttonFontScale: 1.22,

  mobileBreakpoint: 768,
  titleScale: 1.8,

  headingPadding: {
    top: 16,
    right: 24,
    bottom: 12,
    left: 24
  },

  bodyPadding: {
    top: 0,
    right: 48,
    bottom: 0,
    left: 48
  },

  animationMs: 260,
  autoplayInterval: 5,
  menuMaxHeight: 240,

  controls: {
    menu: { show: false, label: '≣' },
    first: { show: false, label: '«' },
    prev: { show: true, label: '‹' },
    next: { show: true, label: '›' },
    last: { show: false, label: '»' },
    autoplay: { show: false, label: '▸' }
  },

  labels: {
    languageMenu: 'Language',
    annotationOriginal: 'Original',
    annotationNext: 'Annotation'
  }
});
```

### 6.1 各配置项说明

#### `mode`

可选值：

- `linear`
- `simple`
- `language`
- `annotation`

#### `targetSelectors`

用于自动寻找主内容容器。只会使用**第一个匹配到的元素**。

#### `widgetPosition`

控制右下角悬浮控件的位置：

- `right`
- `bottom`

单位为像素。

#### `opacityIdle`

控件在非 hover 状态下的透明度。

默认：`0.4`

#### `opacityHover`

控件 hover 状态下的透明度。

默认：`0.7`

#### `dragHandleLabel`

拖拽把手的显示字符。

默认：`✥`

#### `buttonFontScale`

控制按钮字符的字号缩放。

它只放大**按钮内字符**，不会等比例放大整个 widget。

默认：`1.22`

#### `mobileBreakpoint`

手机模式断点，单位 px。

默认：`768`

#### `titleScale`

`jsd-heading` 的字号倍数。

默认：`1.8`

#### `headingPadding`

标题区域 padding：

- `top`
- `right`
- `bottom`
- `left`

#### `bodyPadding`

正文区域 padding：

- `top`
- `right`
- `bottom`
- `left`

#### `animationMs`

切换动画时长，单位 ms。

#### `autoplayInterval`

自动播放间隔，单位秒。

#### `menuMaxHeight`

标题菜单最大高度，单位 px。

#### `controls`

控制六个按钮的显示与文字。

字段：

- `menu`
- `first`
- `prev`
- `next`
- `last`
- `autoplay`

每个字段结构：

```js
{ show: true, label: '文字' }
```

#### `labels`

模式预设中使用的文字：

- `languageMenu`
- `annotationOriginal`
- `annotationNext`

---

## 7. 模式预设与 controls 的关系

脚本内部会先根据 `mode` 应用一层默认控件预设，然后再把你传入的 `controls` 合并进去。

这意味着：

- 你可以先用 `mode` 得到一个大体布局
- 再用 `controls` 精细覆盖

例如：

```html
<script>
  updateLinearConfig({
    mode: 'language',
    controls: {
      menu: { show: true, label: 'Lang' },
      prev: { show: true, label: '‹' },
      next: { show: true, label: '›' }
    }
  });
</script>
```

这样会得到一个“language 模式基础上，额外显示 prev / next”的变体。

---

## 8. 常见用法示例

### 8.1 标准 linear

```html
<script src="/assets/js/jekyll-linear-slides-v1.2.js"></script>
<script>
  updateLinearConfig({
    mode: 'linear'
  });
</script>
```

### 8.2 simple 模式

```html
<script>
  updateLinearConfig({
    mode: 'simple'
  });
</script>
```

### 8.3 language 模式

```html
<script>
  updateLinearConfig({
    mode: 'language',
    labels: {
      languageMenu: 'Language'
    }
  });
</script>
```

### 8.4 annotation 模式

```html
<script>
  updateLinearConfig({
    mode: 'annotation',
    labels: {
      annotationOriginal: 'Original',
      annotationNext: 'Annotation'
    }
  });
</script>
```

### 8.5 打开全部 6 个按钮

```html
<script>
  updateLinearConfig({
    mode: 'linear',
    controls: {
      menu: { show: true, label: '≣' },
      first: { show: true, label: '«' },
      prev: { show: true, label: '‹' },
      next: { show: true, label: '›' },
      last: { show: true, label: '»' },
      autoplay: { show: true, label: '▸' }
    }
  });
</script>
```

### 8.6 自定义透明度、拖拽字符、按钮字号

```html
<script>
  updateLinearConfig({
    opacityIdle: 0.4,
    opacityHover: 0.8,
    dragHandleLabel: '✥',
    buttonFontScale: 1.3
  });
</script>
```

---

## 9. 公共接口

脚本暴露了以下接口：

### `updateLinearConfig(nextConfig)`

合并新配置并重建。

### `window.JSDLinearSlides.rebuild(nextConfig)`

重建 slide 系统，可附带新的配置。

### `window.JSDLinearSlides.destroy()`

销毁 slide 系统，并恢复原始 DOM。

### `window.JSDLinearSlides.getState()`

返回当前运行状态，包括：

- `mode`
- `currentIndex`
- `totalSlides`
- `autoplay`
- `slideTitles`

### `window.JSDLinearSlides.getConfig()`

返回当前实际生效的配置对象。

---

## 10. 限制与注意事项

### 10.1 linear 主要依赖直接子级标题

`linear / simple / annotation` 主要按**目标容器的直接子级标题**分页。

如果你的标题被包在别的容器里，例如：

```html
<div>
  <h2>Title</h2>
</div>
```

那么当前版本不会把这个 `h2` 识别为顶层 slide 起点。

### 10.2 annotation 是控件预设，不是专用解析器

当前 `annotation` 更准确地说是：

- 一个按钮布局预设
- 一个默认文案预设

它不自动理解“正文 / 注释”语义结构。
如果需要更强的正文-注释对应关系，需要后续单独扩展解析逻辑。

### 10.3 language 只认直接子级 `h1`

如果语言标题不是直接子级 `h1`，就不会进入 language 的分块逻辑。

### 10.4 颜色与背景尽量继承原站

脚本没有强行重写页面主色、背景色，只处理：

- 布局容器
- 标题显示
- 悬浮控件
- 动画
- 菜单滚动条

因此它更适合在已有 Jekyll 主题上直接叠加使用。

---

## 11. 推荐 Markdown 结构

### 11.1 linear / simple / annotation

当最外层标题是 `h2` 时：

```md
## Section 1
Content A

## Section 2
Content B

## Section 3
Content C
```

当最外层标题是 `h3` 时：

```md
### Part 1
Content A

### Part 2
Content B
```

### 11.2 language

```md
# zh Chinese
## 标题
中文内容

# fr French
## Titre
Contenu français
```

---

## 12. 最短接入示例

```html
<script src="/assets/js/jekyll-linear-slides-v1.2.js"></script>
<script>
  updateLinearConfig({ mode: 'linear' });
</script>
```

# Jekyll Linear Slides v1.2 Manual (English)

## 1. Overview

`jekyll-linear-slides-v1.2.js` is a front-end injection script for **Jekyll / Markdown pages**.
It transforms the main content area into a **linear slide system** by restructuring the DOM with **JavaScript + CSS**.

This script is dedicated to the **linear family of modes** and does not include tree mode.

Design goals:

- **Preserve the original site style as much as possible** and only control content grouping, visibility, heading rendering, and the floating widget.
- **Work immediately after inclusion**.
- Allow runtime customization through `updateLinearConfig()`.
- Use a unified control system, then derive different UI variants through `mode` and `controls`.

---

## 2. Implemented Features

### 2.1 Core features

- Automatically locate the **main content container**.
- Parse the container into a sequence of **linear slides**.
- **Open on the first slide** by default.
- Render the title inside a dedicated `div.jsd-heading`, displayed as **bold and centered**.
- Render the main content inside `div.jsd-slide-body`.
- Allow heading and body positions to be controlled through padding configuration.
- Use **random transition animations** on slide change. Three built-in animations are included:
  - fade
  - up
  - zoom
- Support **cyclic navigation**.
- Display the widget as a **floating draggable control bar** anchored to the bottom-right corner.

### 2.2 Control system

The widget has six built-in control slots:

1. `menu`: menu / jump list
2. `first`: first slide
3. `prev`: previous slide
4. `next`: next slide
5. `last`: last slide
6. `autoplay`: autoplay toggle

Each control can be configured through `config.controls`:

- visibility: `show`
- displayed text: `label`

Default labels:

- `menu`: `≣`
- `first`: `«`
- `prev`: `‹`
- `next`: `›`
- `last`: `»`
- `autoplay`: `▸`

### 2.3 Autoplay

- Clicking the autoplay button advances to the next slide every `n` seconds.
- Playback loops automatically.
- The interval is controlled by `autoplayInterval` in seconds.

### 2.4 Menu

- The menu button opens a **title list**.
- Menu items are listed in slide order.
- Clicking a menu item jumps directly to the corresponding slide.
- The menu includes a built-in thin scrollbar style compatible with:
  - `scrollbar-width`
  - `scrollbar-color`
  - `::-webkit-scrollbar`

### 2.5 Opacity and hover behavior

- Default widget opacity in non-hover state: **`0.4`**
- Default widget opacity on hover: **`0.7`**
- Both values are configurable through:
  - `opacityIdle`
  - `opacityHover`

### 2.6 Mobile compatibility

- Mobile mode is determined by `mobileBreakpoint`.
- In mobile mode:
  - `headingPadding` is forced to `0`
  - `bodyPadding` is forced to `0`
- This prevents padding from squeezing the content on small screens.

### 2.7 Keyboard support

Built-in keyboard shortcuts:

- `ArrowLeft`: previous slide
- `ArrowRight`: next slide
- `Home`: first slide
- `End`: last slide
- `Escape`: close the menu

Keyboard interception is disabled inside editable elements such as inputs, textareas, selects, and contenteditable regions.

---

## 3. Modes

The script derives several variants from a single implementation via `mode`.

### 3.1 `linear`

Standard linear mode.

Default visible controls:

- `prev`
- `next`

Default labels:

- `‹`
- `›`

### 3.2 `simple`

Simplified linear mode.

In the current version, the default control layout is the same as `linear`:

- `prev`
- `next`

Its primary value is semantic clarity: it explicitly states that the page should behave as a minimal previous/next presentation.

### 3.3 `language`

Language-switching mode.

Default visible control:

- `menu`

Default menu button text:

- `Language`

Behavior in this mode:

- Each **direct child `h1`** is treated as one language block.
- The `h1` text becomes the menu title.
- The **first `h2`~`h6`** inside that block becomes the `jsd-heading`.
- That extracted heading node is removed from the slide body to avoid duplication.

### 3.4 `annotation`

Annotation mode.

Default visible controls:

- `first`
- `next`

Default labels:

- `Original`
- `Annotation`

Important note:

- `annotation` is currently a **control preset mode**.
- It does not introduce a dedicated parser.
- Slide parsing still follows the normal linear parser.
- This mode is intended for pages where the content has already been organized into linear slides representing original text and annotations.

---

## 4. Parsing Rules

### 4.1 Parsing rules for `linear` / `simple` / `annotation`

The script first looks for the **outermost heading level among direct child headings** of the target container.

Examples:

- If the direct children contain `h2` but no `h1`, then `h2` becomes the slide boundary level.
- If the direct children contain `h3` but no `h1` or `h2`, then `h3` becomes the slide boundary level.

Then:

- Every heading at that level starts a new slide.
- Its text is used as:
  - `menuTitle`
  - `jsd-heading`
- All content until the next heading of the same level belongs to that slide.

If the target container has no headings at all:

- The entire container becomes a single slide.
- `jsd-heading` remains empty.

### 4.2 Parsing rules for `language`

- Only **direct child `h1`** nodes are recognized.
- Each `h1` starts a language slide.
- The `h1` text is used as the menu title.
- Inside each language block, the first `h2`~`h6` is extracted:
  - its text becomes `jsd-heading`
  - the heading node itself is removed from the slide body
- If no `h1` exists, the script falls back to normal linear parsing.

---

## 5. Installation

### 5.1 Basic inclusion

Place the script in your static assets directory, for example:

```html
<script src="/assets/js/jekyll-linear-slides-v1.2.js"></script>
```

The script initializes automatically after the page loads.

### 5.2 Override configuration in a page

```html
<script>
  updateLinearConfig({
    mode: 'linear',
    titleScale: 1.8,
    headingPadding: { top: 16, right: 24, bottom: 12, left: 24 },
    bodyPadding: { top: 0, right: 48, bottom: 0, left: 48 }
  });
</script>
```

---

## 6. Maximum Config (Complete Example)

The following object shows the full configuration surface currently supported by this version:

```js
updateLinearConfig({
  mode: 'linear',

  targetSelectors: [
    '#main-content',
    '.post-content',
    '.page-content',
    'article',
    'main',
    '.markdown-body',
    '.content',
    '#content'
  ],

  widgetPosition: {
    right: 20,
    bottom: 20
  },

  opacityIdle: 0.4,
  opacityHover: 0.7,

  dragHandleLabel: '✥',
  buttonFontScale: 1.22,

  mobileBreakpoint: 768,
  titleScale: 1.8,

  headingPadding: {
    top: 16,
    right: 24,
    bottom: 12,
    left: 24
  },

  bodyPadding: {
    top: 0,
    right: 48,
    bottom: 0,
    left: 48
  },

  animationMs: 260,
  autoplayInterval: 5,
  menuMaxHeight: 240,

  controls: {
    menu: { show: false, label: '≣' },
    first: { show: false, label: '«' },
    prev: { show: true, label: '‹' },
    next: { show: true, label: '›' },
    last: { show: false, label: '»' },
    autoplay: { show: false, label: '▸' }
  },

  labels: {
    languageMenu: 'Language',
    annotationOriginal: 'Original',
    annotationNext: 'Annotation'
  }
});
```

### 6.1 Field reference

#### `mode`

Supported values:

- `linear`
- `simple`
- `language`
- `annotation`

#### `targetSelectors`

Selectors used to locate the main content container. Only the **first matched element** is used.

#### `widgetPosition`

Controls the floating widget position:

- `right`
- `bottom`

Units: pixels.

#### `opacityIdle`

Widget opacity in non-hover state.

Default: `0.4`

#### `opacityHover`

Widget opacity in hover state.

Default: `0.7`

#### `dragHandleLabel`

Displayed text for the drag handle.

Default: `✥`

#### `buttonFontScale`

Scales the button text size.

It enlarges the **button glyphs only** and does not proportionally enlarge the whole widget.

Default: `1.22`

#### `mobileBreakpoint`

Mobile breakpoint in pixels.

Default: `768`

#### `titleScale`

Font scale multiplier for `jsd-heading`.

Default: `1.8`

#### `headingPadding`

Padding of the heading area:

- `top`
- `right`
- `bottom`
- `left`

#### `bodyPadding`

Padding of the body area:

- `top`
- `right`
- `bottom`
- `left`

#### `animationMs`

Transition duration in milliseconds.

#### `autoplayInterval`

Autoplay interval in seconds.

#### `menuMaxHeight`

Maximum menu height in pixels.

#### `controls`

Controls visibility and labels for all six control slots.

Fields:

- `menu`
- `first`
- `prev`
- `next`
- `last`
- `autoplay`

Each field uses this shape:

```js
{ show: true, label: 'text' }
```

#### `labels`

Preset labels used by modes:

- `languageMenu`
- `annotationOriginal`
- `annotationNext`

---

## 7. Relationship Between `mode` and `controls`

The script first applies a mode preset, then merges your custom `controls` overrides on top of it.

This means you can:

- start with a preset layout via `mode`
- then refine the exact button layout via `controls`

Example:

```html
<script>
  updateLinearConfig({
    mode: 'language',
    controls: {
      menu: { show: true, label: 'Lang' },
      prev: { show: true, label: '‹' },
      next: { show: true, label: '›' }
    }
  });
</script>
```

This produces a language-oriented layout that also exposes previous/next buttons.

---

## 8. Common Usage Examples

### 8.1 Standard `linear`

```html
<script src="/assets/js/jekyll-linear-slides-v1.2.js"></script>
<script>
  updateLinearConfig({
    mode: 'linear'
  });
</script>
```

### 8.2 `simple` mode

```html
<script>
  updateLinearConfig({
    mode: 'simple'
  });
</script>
```

### 8.3 `language` mode

```html
<script>
  updateLinearConfig({
    mode: 'language',
    labels: {
      languageMenu: 'Language'
    }
  });
</script>
```

### 8.4 `annotation` mode

```html
<script>
  updateLinearConfig({
    mode: 'annotation',
    labels: {
      annotationOriginal: 'Original',
      annotationNext: 'Annotation'
    }
  });
</script>
```

### 8.5 Enable all six controls

```html
<script>
  updateLinearConfig({
    mode: 'linear',
    controls: {
      menu: { show: true, label: '≣' },
      first: { show: true, label: '«' },
      prev: { show: true, label: '‹' },
      next: { show: true, label: '›' },
      last: { show: true, label: '»' },
      autoplay: { show: true, label: '▸' }
    }
  });
</script>
```

### 8.6 Custom opacity, drag label, and button text scale

```html
<script>
  updateLinearConfig({
    opacityIdle: 0.4,
    opacityHover: 0.8,
    dragHandleLabel: '✥',
    buttonFontScale: 1.3
  });
</script>
```

---

## 9. Public API

The script exposes the following API:

### `updateLinearConfig(nextConfig)`

Merge new configuration and rebuild the slide system.

### `window.JSDLinearSlides.rebuild(nextConfig)`

Rebuild the slide system, optionally with additional configuration.

### `window.JSDLinearSlides.destroy()`

Destroy the slide system and restore the original DOM.

### `window.JSDLinearSlides.getState()`

Return the current runtime state, including:

- `mode`
- `currentIndex`
- `totalSlides`
- `autoplay`
- `slideTitles`

### `window.JSDLinearSlides.getConfig()`

Return the currently effective configuration object.

---

## 10. Limitations and Notes

### 10.1 Linear parsing mainly depends on direct child headings

`linear / simple / annotation` mainly paginate by **direct child headings** of the target container.

If your heading is wrapped inside another element, for example:

```html
<div>
  <h2>Title</h2>
</div>
```

then this `h2` will not be treated as a top-level slide boundary by the current version.

### 10.2 `annotation` is a control preset, not a dedicated parser

At present, `annotation` is more accurately described as:

- a button layout preset
- a default label preset

It does not automatically understand original-text vs annotation semantics.
If stronger pairing logic is needed, that would require a future parser extension.

### 10.3 `language` only recognizes direct child `h1`

If language titles are not direct child `h1` elements, the language grouping logic will not activate.

### 10.4 Colors and backgrounds are inherited when possible

The script does not aggressively override the main theme colors or page background. It mainly manages:

- layout containers
- heading rendering
- floating controls
- transitions
- menu scrollbar styling

This makes it suitable for overlaying on an existing Jekyll theme.

---

## 11. Recommended Markdown Structures

### 11.1 `linear` / `simple` / `annotation`

When the outermost title level is `h2`:

```md
## Section 1
Content A

## Section 2
Content B

## Section 3
Content C
```

When the outermost title level is `h3`:

```md
### Part 1
Content A

### Part 2
Content B
```

### 11.2 `language`

```md
# zh Chinese
## Title
Chinese content

# fr French
## Titre
French content
```

---

## 12. Smallest Working Example

```html
<script src="/assets/js/jekyll-linear-slides-v1.2.js"></script>
<script>
  updateLinearConfig({ mode: 'linear' });
</script>
```




# Part 5
Some intro text here will be discarded.

## Slide 1
Content A

## Slide 2
Content B

# Part 6
## Slide 1
Content C