---
layout: post
title: Jekyll Markdown + HTML Feature Test
author: 垃圾残渣
show_date: true
category: TEST
subclass: Markdown 测试
post_list: date
toc: "chart"
toc_depth: 6
comment: true
home_btn: true
btn_text: true
footer: true
bilingual: true
encrypted_text: true
permalink: /test
date: 2019-5-25 # YYYY-MM-DD
excerpt: "This is excerpt." # string
abstract: "This is abstract. Abstract is blank by default." # string
---

# Heading 1

**Paragraph** 
  - **bold**, *italic*, ~~strikethrough~~, `inline code`
  - ==highlight== (requires the kramdown extension), $$H_2~O$$ (quires katex)

**Line break** *(two trailing spaces)*  
New line.
  - Line break in lists *(two trailing spaces)*  
    New line.

New Paragraph *(separated by a blank line)*.

**Decrypt and encrypt** text (access token: 233):
<p class="encrypted" id="/MZAf/PKx9jpw8/Jnp7XQQFki2ibGnArZP46W+keVThXquhWwFROEFnbY8eC57Tw==">Encrypted content!</p>

**Blockquote**
> Single-line quote.
{: data-bt="0"}
> Multi-line quote *(two trailing spaces)*  
> continuing the same block.
{: data-bt="0"}

Values: tags {{page.tags}}

New page with HTML5 + CSS 3:

<div style="break-after: page;"></div>

## Heading 2

[Link](https://example.com) and autolink <https://example.com>, as well as email <a href="mailto:test@example.com">mail</a>.

![Alt text]({{site.img}}/phys/cosmos/observable-universe-logarithmic-map.png "title")

Blockquote for bilingual support. Click Bilingual Button or set page.bilingual `false` to show.
> Blockquote: used for bilingual folding test. First paragraph.
>
> Second paragraph (multi-paragraph).
{: .lang-alt}

> Skip processing
{: data-bt="0"}

### Multi-Language Test

`简体中文 (Simplified Chinese)` — 你好，世界！这是一个**多语言测试页面**。*守望先锋* 的**天使**非常*可爱*。

`繁體中文 (Traditional Chinese)` — 你好，世界！這是一個**多語言測試頁面**。*守望先鋒* 的**天使**非常*可愛*。

`English` — Hello, world! This is a **multilingual test page**. *Mercy* from **Overwatch** is very *cute*.

`日本語 (Japanese)` — こんにちは、世界！これは**多言語テストページ**です。*オーバーウォッチ* の**エンジェル**はとても*かわいい*です。

`한국어 (Korean)` — 안녕하세요, 세계! 이것은 **다국어 테스트 페이지**입니다. *오버워치* 의 **메르시**는 매우 *귀여워요*.

`Español (Spanish)` — ¡Hola, mundo! Esta es una **página de prueba multilingüe**. *Mercy* de **Overwatch** es muy *linda*.

`Français (French)` — Bonjour, le monde ! Ceci est une **page de test multilingue**. *Mercy* d'**Overwatch** est très *mignonne*.

`Deutsch (German)` — Hallo, Welt! Dies ist eine **mehrsprachige Testseite**. *Mercy* aus **Overwatch** ist sehr *süß*.

`Русский (Russian)` — Привет, мир! Это **многоязычная тестовая страница**. *Ангел* из **Overwatch** очень *милая*.

`العربية (Arabic)` — مرحبا بالعالم! هذه **صفحة اختبار متعددة اللغات**. *ميرشي* من **أوفر ووتش** لطيفة *جداً*.

`हिन्दी (Hindi)` — नमस्ते, दुनिया! यह एक **बहुभाषी परीक्षण पृष्ठ** है। *ओवरवॉच* की **मर्सी** बहुत *प्यारी* है।

`ไทย (Thai)` — สวัสदीโลก! นี่คือหน้าเว็บ**ทดสอบหลายภาษา** *เมอร์ซี่* จาก **โอเวอร์วอッチ** น่ารัก*มาก*

`Tiếng Việt (Vietnamese)` — Xin chào thế giới! Đây là **trang kiểm tra đa ngôn ngữ**. *Mercy* trong **Overwatch** rất *dễ thương*.

`Português (Portuguese)` — Olá, mundo! Esta é uma **página de teste multilíngue**. *Mercy* de **Overwatch** é muito *fofa*.

`Italiano (Italian)` — Ciao, mondo! Questa è una **pagina di test multilingue**. *Mercy* di **Overwatch** è molto *carina*.


#### Heading 4

##### Heading 5

###### Heading 6

**Formulas** (KaTeX or MathJax)
1. Bayes’ theorem (including the evidence term)

   $$
   p(\theta\mid x)=\frac{p(x\mid \theta)p(\theta)}{p(x)},\qquad
   p(x)=\int p(x\mid \theta)p(\theta),d\theta
   $$

2. Relationship between KL divergence and cross-entropy

   $$
   D_{\mathrm{KL}}(p\Vert q)=\int p(x)\log\frac{p(x)}{q(x)},dx
   ,\qquad
   H(p,q)=H(p)+D_{\mathrm{KL}}(p\Vert q)
   $$

3. Evidence Lower Bound (ELBO)
   
   $$
   \log p(x)=\mathcal{L}(q)+D_{\mathrm{KL}}!\bigl(q(z)\Vert p(z\mid x)\bigr),
   \qquad
   \mathcal{L}(q)=\mathbb{E}_{q(z)}[\log p(x,z)-\log q(z)]
   $$

4. Multivariate Gaussian density
   
   $$
   \mathcal{N}(x\mid \mu,\Sigma)=\frac{1}{(2\pi)^{d/2},|\Sigma|^{1/2}}
   \exp!\left(-\frac12(x-\mu)^\top\Sigma^{-1}(x-\mu)\right)
   $$

5. Closed-form solution of linear regression (least squares)
   
   $$
   \hat{\beta}=\arg\min_{\beta}|y-X\beta|_2^2
   \quad\Rightarrow\quad
   \hat{\beta}=(X^\top X)^{-1}X^\top y
   $$

6. Lagrangian duality (primal–dual–KKT skeleton)
   
   $$
   \min_x f(x)\ \text{s.t.}\ g_i(x)\le 0,\ h_j(x)=0
   $$
   $$
   L(x,\lambda,\nu)=f(x)+\sum_i \lambda_i g_i(x)+\sum_j \nu_j h_j(x),\qquad
   \max_{\lambda\ge 0,\nu}\ \inf_x L(x,\lambda,\nu)
   $$

7. Euler–Lagrange equation (calculus of variations / classical mechanics)
   
   $$
   \frac{\partial \mathcal{L}}{\partial q}-\frac{d}{dt}\left(\frac{\partial \mathcal{L}}{\partial \dot q}\right)=0
   $$

8. Maxwell’s equations (SI)
   
   $$
   \nabla\cdot \mathbf{E}=\frac{\rho}{\varepsilon_0},\quad
   \nabla\cdot \mathbf{B}=0,\quad
   \nabla\times \mathbf{E}=-\frac{\partial \mathbf{B}}{\partial t},\quad
   \nabla\times \mathbf{B}=\mu_0\mathbf{J}+\mu_0\varepsilon_0\frac{\partial \mathbf{E}}{\partial t}
   $$

## Lists and Tables

### Ordered and Unordered Lists

- Unordered 1
- Unordered 2
  - Nested 2.1
  - Nested 2.2
  > Third paragraph used for bilingual folding test.
  {: .lang-alt}

1. Ordered 1
2. Ordered 2
   1. Nested 2.1
   > Fourth paragraph used for bilingual folding test.

- [x] Task done
- [ ] Task todo
> Fifth paragraph used for bilingual folding test.

### Definition Lists (kramdown)

Term A
: Definition A
> Sixth paragraph used for bilingual folding test.
: Definition A2
: Definition A3
  : Definition A 3.1

1. Term B
: Definition B
2. Term C
   1. Term C 1.1
   : Definition
   - Term C 1.2
   : Definition

### Tables

| colA | colB | colC |
| :--: | ---: | :--- |
|   a  |    1 | left |
|   b  |   20 | text |

## Code

Inline: `const x = 1;`

```js
// fenced code
function hello(name){ return `hi ${name}`; }
````

```python
# another block
print("ok")
```

## Footnotes (kramdown)

Footnote example[^1] and the second one[^two].

[^1]: This is footnote 1.

[^two]: This is footnote two.

## Horizontal Rules & Escapes

\*Asterisks not italic\*  
\_underscores not italic\_  
\# not a heading  
\> not a blockquote  
\- not a list item  
\+ not a list item  
1\. not an ordered list  
\[not a link\]\(not a URL\)  
\!\[not an image\]\(not a URL\)  
\`not code\`  
\\ not an escape start  
\| not a table cell  
\: not table alignment  
\~\~not strikethrough\~\~  
\<not an HTML tag\>  
\& not an entity  
\=\=not highlight\=\=  
\^\[not a footnote\]  
\$not math\$.

```markdown
\*Asterisks not italic\*  
\_underscores not italic\_  
\# not a heading  
\> not a blockquote  
\- not a list item  
\+ not a list item  
1\. not an ordered list  
\[not a link\]\(not a URL\)  
\!\[not an image\]\(not a URL\)  
\`not code\`  
\\ not an escape start  
\| not a table cell  
\: not table alignment  
\~\~not strikethrough\~\~  
\<not an HTML tag\>  
\& not an entity  
\=\=not highlight\=\=  
\^\[not a footnote\]  
\$not math\$.
```

## Inline HTML (common elements)

<div class="note">
  <strong>HTML block:</strong> div / strong / em / span / br<br>
  <em>Emphasis</em> and <span style="text-decoration:underline;">underline</span>
</div>

<details>
  <summary>details/summary</summary>
  <p>Collapsed content (native HTML).</p>
</details>

<blockquote class="lang-alt" data-bt-default="expanded">
  <p>Pure HTML blockquote (with class/attr), testing linkage with JS selectors.</p>
</blockquote>

## Anchors / IDs

### Subsection heading {#custom-id}

Jump to the [custom anchor](#custom-id)。

