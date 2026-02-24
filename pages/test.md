---
layout: default
title: Jekyll Markdown + HTML Feature Test
author: 垃圾残渣
show_date: true
category: 测试页面
tags: Markdown 测试
publish: true
post_list: false
toc: false
toc_depth: 6
comment: true
home_btn: true
btn_text: true
footer: true
highlight: false
bilingual: true
encrypted_text: true
permalink: /test
date: 2019-5-25 # YYYY-MM-DD
excerpt: "This is excerpt." # string
abstract: "This is abstract. Abstract is blank by default." # string
---


# H1 标题 / Heading 1

段落：**粗体**、*斜体*、~~删除线~~、`行内代码`、==高亮==（依赖 kramdown 扩展）、$$H_2~O$$、

公式（Katex or Mathjax）
1. 贝叶斯公式（含证据项）
   $$
   p(\theta\mid x)=\frac{p(x\mid \theta)p(\theta)}{p(x)},\qquad
   p(x)=\int p(x\mid \theta)p(\theta),d\theta
   $$

2. KL 散度与交叉熵关系
   $$
   D_{\mathrm{KL}}(p\Vert q)=\int p(x)\log\frac{p(x)}{q(x)},dx
   ,\qquad
   H(p,q)=H(p)+D_{\mathrm{KL}}(p\Vert q)
   $$

3. 变分下界（ELBO）
   $$
   \log p(x)=\mathcal{L}(q)+D_{\mathrm{KL}}!\bigl(q(z)\Vert p(z\mid x)\bigr),
   \qquad
   \mathcal{L}(q)=\mathbb{E}_{q(z)}[\log p(x,z)-\log q(z)]
   $$

4. 多元高斯密度
   $$
   \mathcal{N}(x\mid \mu,\Sigma)=\frac{1}{(2\pi)^{d/2},|\Sigma|^{1/2}}
   \exp!\left(-\frac12(x-\mu)^\top\Sigma^{-1}(x-\mu)\right)
   $$

5. 线性回归的闭式解（最小二乘）
   $$
   \hat{\beta}=\arg\min_{\beta}|y-X\beta|_2^2
   \quad\Rightarrow\quad
   \hat{\beta}=(X^\top X)^{-1}X^\top y
   $$

6. 拉格朗日对偶（原始—对偶—KKT骨架）
   $$
   \min_x f(x)\ \text{s.t.}\ g_i(x)\le 0,\ h_j(x)=0
   $$
   $$
   L(x,\lambda,\nu)=f(x)+\sum_i \lambda_i g_i(x)+\sum_j \nu_j h_j(x),\qquad
   \max_{\lambda\ge 0,\nu}\ \inf_x L(x,\lambda,\nu)
   $$

7. 欧拉—拉格朗日方程（变分法/经典力学）
   $$
   \frac{\partial \mathcal{L}}{\partial q}-\frac{d}{dt}\left(\frac{\partial \mathcal{L}}{\partial \dot q}\right)=0
   $$

8. 麦克斯韦方程组（SI）
   $$
   \nabla\cdot \mathbf{E}=\frac{\rho}{\varepsilon_0},\quad
   \nabla\cdot \mathbf{B}=0,\quad
   \nabla\times \mathbf{E}=-\frac{\partial \mathbf{B}}{\partial t},\quad
   \nabla\times \mathbf{B}=\mu_0\mathbf{J}+\mu_0\varepsilon_0\frac{\partial \mathbf{E}}{\partial t}
   $$


换行（两个空格结尾）  
新行。

Decrypt and encrypt text (access token: 233):
<p class="encrypted" id="/MZAf/PKx9jpw8/Jnp7XQQFki2ibGnArZP46W+keVThXquhWwFROEFnbY8eC57Tw==">Encrypted content!</p>


## H2 标题

### H3 标题

[链接](https://example.com) 与自动链接 <https://example.com>，以及邮箱 <a href="mailto:test@example.com">mail</a>。

![图片替代文本]({{site.img}}/phys/cosmos/observable-universe-logarithmic-map.png "title")

> Blockquote：用于双语折叠测试。第一段。
>
> 第二段（多段落）。
{: .lang-alt}

> 跳过处理
{: data-bt="0"}


## 列表 / Lists

- 无序 1
- 无序 2
  - 嵌套 2.1
  - 嵌套 2.2
  > 第三段 用于双语折叠测试。
  {: .lang-alt}

1. 有序 1
2. 有序 2
   1. 嵌套 2.1
   > 第四段 用于双语折叠测试。

- [x] Task done
- [ ] Task todo
> 第五段 用于双语折叠测试。

### 定义列表 / Definition List (kramdown)

术语 A
: 定义 A
> 第六段 用于双语折叠测试。

术语 B
: 定义 B

## 代码 / Code

行内：`const x = 1;`

```js
// fenced code
function hello(name){ return `hi ${name}`; }
```

```python
# another block
print("ok")
```
## 表格 / Table

| colA | colB | colC |
| :--: | ---: | :--- |
|   a  |    1 | left |
|   b  |   20 | text |

## 脚注 / Footnotes (kramdown)

脚注示例[^1] 与第二个[^two]。

[^1]: 这是脚注 1。

[^two]: 这是脚注 two。

## 引用与引用块 / Quotes

> 单行引用。
{: data-bt="0"}
> 多行引用
> 继续同一块。
{: data-bt="0"}

## 分隔与转义 / HR & Escapes

*星号不斜体*，_下划线不斜体_，# 不当标题。

## 内联 HTML（常用元素） / Inline HTML

<div class="note">
  <strong>HTML 区块：</strong> div / strong / em / span / br<br>
  <em>强调</em> 与 <span style="text-decoration:underline;">下划线</span>
</div>

<details>
  <summary>details/summary</summary>
  <p>折叠内容（HTML 原生）。</p>
</details>

<blockquote class="lang-alt" data-bt-default="expanded">
  <p>纯 HTML blockquote（含 class/attr），测试与 JS 选择器联动。</p>
</blockquote>

## 锚点 / IDs

### 小节标题 {#custom-id}

跳转到 [自定义锚点](#custom-id)。

## 分割线与空行压力测试

段落 A。

段落 B（空行分隔）。

<span id="inline-anchor"></span>
跳转到 [inline anchor](#inline-anchor)。

```

