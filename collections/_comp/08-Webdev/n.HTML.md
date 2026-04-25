---
title: HTML - Quick Reference
categories: Notes
subclass: Webdev
todos: 给出技术趋势和技术栈的解析，如为什么ts代替js
---


## Introduction to HTML

HTML is the structural language of the Web. It defines what content is, how it is organized, and what that content means. In practice, HTML is almost never used alone: modern web development is built on the combination of HTML for structure, CSS for presentation, and JavaScript for behavior. MDN describes HTML as the basic building block of the Web, and the WHATWG standard treats HTML as a living standard that continues to evolve rather than a frozen specification. ([MDN Web Docs][1])

What HTML is

HTML stands for HyperText Markup Language. “Markup” means that it marks pieces of content with elements such as headings, paragraphs, links, images, lists, tables, forms, and sections. A browser reads these elements and builds a document tree, which is then styled by CSS and manipulated by JavaScript. Proper HTML is not only about display. It also carries semantics, meaning machine-readable structure that matters for accessibility, search engines, browser features, and maintainability. MDN explicitly emphasizes that HTML should define both structure and semantics. ([MDN Web Docs][1])

A simple example

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple HTML Page</title>
  </head>
  <body>
    <header>
      <h1>Welcome</h1>
      <nav>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <main>
      <section id="about">
        <h2>About</h2>
        <p>This is a paragraph of content.</p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <form>
          <label for="email">Email</label>
          <input id="email" type="email" />
          <button type="submit">Send</button>
        </form>
      </section>
    </main>
  </body>
</html>
```

This example already shows several core HTML ideas: document metadata in `head`, visible content in `body`, semantic sectioning with `header`, `nav`, `main`, and `section`, and native form controls.

Core concepts to understand first
1. Elements and tags

An HTML element is usually written with a start tag and an end tag, such as `<p>...</p>`. Some elements, like `img` or `meta`, are void elements and do not have closing tags.
2. Attributes

Attributes provide extra information. Examples include `href` for links, `src` for images, `alt` for alternative text, and `class` or `id` for styling and scripting hooks.
3. Document structure

A valid HTML page normally includes:
* `<!doctype html>` to tell the browser to use standards mode
* `html` as the root element
* `head` for metadata
* `body` for visible content
4. Semantics

Semantic HTML means using the right element for the right purpose. For example:
* `h1` to `h6` for headings
* `button` for clickable actions
* `a` for navigation to another resource
* `article` for self-contained content
* `nav` for navigation blocks
* `label` linked to form controls

This matters because browsers and assistive technologies rely on these meanings. MDN specifically recommends “the right element for the right job” as a basis for accessibility. ([MDN Web Docs][2])

Key HTML building blocks

Text structure

The most basic content elements include headings, paragraphs, emphasis, quotations, code blocks, and lists. These create readable information hierarchy.

Links and navigation

The `a` element is one of the most fundamental HTML features. Hypertext means documents are connected. Links are therefore not an add-on but part of HTML’s original purpose. The HTML standard also documents advanced link behavior, including the rule that links can wrap whole sections as long as invalid nested interactive content is avoided. ([HTML Living Standard][3])

Images and media

HTML supports images with `img`, audio with `audio`, and video with `video`. Media elements should be used together with descriptive text, captions, and alternative content where appropriate.

Lists and tables

Lists are for ordered or unordered collections. Tables are for tabular data, not for page layout. Table accessibility depends on correct headers and structure.

Forms

Forms are a major part of HTML. Native controls include text fields, email inputs, checkboxes, radio buttons, selects, textareas, and buttons. Good HTML forms use labels, input types, validation attributes, and accessible grouping.

Metadata

The `head` section contains title, character encoding, viewport settings, SEO metadata, social sharing metadata, and resource links such as stylesheets.

The related key technologies

HTML is only one part of the web platform. The main related technologies are these:

CSS

CSS controls layout, spacing, color, typography, responsive design, animations, and more. Without CSS, HTML still works as content and structure, which is one reason semantic HTML remains important.

JavaScript

JavaScript controls behavior: user interaction, dynamic updates, data fetching, state management, client-side routing, and application logic.

DOM

The Document Object Model (DOM) is the browser’s in-memory representation of the HTML document. JavaScript usually interacts with HTML through the DOM.

HTTP / HTTPS

HTML documents are delivered over the web through HTTP or HTTPS. Understanding request-response flow is important for web performance and application architecture.

URL and navigation

Links, routing, resource loading, and history all depend on URLs.

Accessibility technologies

Screen readers, keyboard navigation, ARIA, and platform accessibility APIs all depend on correct semantic HTML. The HTML standard and MDN both connect HTML structure to accessibility semantics. ([MDN Web Docs][2])

Web Components

The modern platform includes custom elements, shadow DOM, and element internals. The HTML Living Standard includes support for custom elements and form-associated custom elements, showing that HTML now interacts with component-based architectures more directly than before. ([HTML Living Standard][4])

Common technologies around HTML

These are the technologies most often learned and used together with HTML:
* CSS, Sass, Tailwind CSS
* JavaScript, TypeScript
* DOM APIs, Fetch API, Web Storage
* Accessibility practices and ARIA
* Responsive design
* Browser DevTools
* Build tools such as Vite, Webpack, Parcel
* Package managers such as npm, pnpm, yarn
* Testing tools such as Playwright, Cypress, Vitest, Jest
* Templating systems such as Handlebars, EJS, Pug
* Static site tools such as Astro, Eleventy, Hugo
* UI libraries and frameworks such as React, Vue, Angular, Svelte
* Backend rendering environments such as Node.js, Deno, Bun, PHP, Python frameworks, Java frameworks, Ruby on Rails, and others

Common technology stacks
1. Basic front-end stack

HTML + CSS + JavaScript

This is the foundational stack. It is enough for static websites, small interactive pages, and learning the platform correctly.
2. Modern front-end stack

HTML + CSS + JavaScript/TypeScript + build tool

A typical example is:
* HTML
* CSS or Tailwind CSS
* TypeScript
* Vite
* npm or pnpm

This is common for modern single-page or component-based applications.
3. React ecosystem stack

HTML + CSS + JavaScript/TypeScript + React + Next.js

Typical tools:
* HTML and JSX
* CSS Modules, Tailwind CSS, or styled systems
* TypeScript
* React
* Next.js
* Node.js

This is a common production stack for dashboards, SaaS apps, and content sites with server rendering.
4. Vue ecosystem stack

HTML + CSS + JavaScript/TypeScript + Vue + Nuxt

Used for both small and large apps, especially where a structured but approachable framework is preferred.
5. Angular stack

HTML templates + CSS/SCSS + TypeScript + Angular

Angular is more opinionated and often used in enterprise settings.
6. Static site / content stack

HTML + CSS + Markdown + static site generator

Typical tools:
* Astro
* Eleventy
* Hugo

This stack is common for blogs, documentation sites, landing pages, and performance-focused sites.
7. Traditional server-rendered stack

HTML templates rendered on the server + backend framework + database

Examples:
* PHP + Laravel + Blade
* Python + Django + templates
* Ruby on Rails + ERB
* Java + Spring + template engine

This remains important because many business systems are still rendered on the server, and HTML is the final output.
8. Full-stack JavaScript stack

HTML + CSS + TypeScript + React/Vue/Svelte + Node.js + database

Often paired with:
* Express, NestJS, or framework backends
* PostgreSQL or MongoDB
* API layers such as REST or GraphQL

Why HTML still matters even when frameworks are used

Even in React, Vue, Angular, or server-side frameworks, the final UI still depends on HTML concepts. Framework abstractions sit on top of the platform. A developer who does not understand native HTML usually has weaker accessibility, SEO, form design, and semantic structure. In other words, framework knowledge cannot replace HTML knowledge.

Important technical areas connected to HTML

Semantic HTML

This is the most important advanced beginner topic. It improves accessibility, SEO, maintainability, and interoperability. MDN repeatedly highlights semantics as central rather than optional. ([MDN Web Docs][5])

Accessibility

Accessible HTML includes proper headings, labels, landmark elements, meaningful link text, alt text, keyboard support, and correct document order. A large amount of accessibility can be achieved with correct HTML before adding any ARIA.

SEO

Search engines use document structure, metadata, headings, links, canonical information, and content organization. Semantic HTML helps machines understand the page.

Performance

Lightweight HTML, efficient resource loading, correct image markup, and progressive enhancement all affect loading performance. The State of HTML 2025 survey identifies performance as an important pain-point area in the HTML ecosystem. ([State of HTML 2025][6])

Forms and validation

Native HTML forms remain powerful. They provide built-in semantics, validation, browser integration, and accessibility. Modern standards work also extends this area through form-associated custom elements. ([HTML Living Standard][4])

Interoperability

One historic difficulty of web development has been browser inconsistency. Current standards work strongly emphasizes cross-browser interoperability. Interop 2025 and Interop 2026 explicitly focus on improving compatibility across engines, while Baseline helps developers judge which web platform features are safe to use broadly. ([web.dev][7])

A brief historical outline

Early web

HTML began as a simple document markup language for linked academic documents.

Growth of presentational HTML

Older HTML often mixed content with presentation. Many presentational practices are now considered outdated because CSS took over visual control.

HTML5 era

“HTML5” became the popular name for the modern expansion of the platform: semantic elements, multimedia, forms, APIs, and richer web apps.

Living standard era

Today HTML is maintained as a living standard by WHATWG. This means the platform evolves continuously, not only through rare version-number milestones. ([HTML Living Standard][8])

Technology development trends
1. Stronger emphasis on semantic correctness and accessibility

This is not a niche concern anymore. It is a mainstream engineering requirement. MDN learning materials continue to center semantic HTML and accessibility as foundational practice. ([MDN Web Docs][5])
2. More reliance on the native web platform

There is a visible trend away from unnecessary abstraction when the platform already provides a good solution. Native dialogs, better forms, declarative markup patterns, and platform features that are now broadly supported all encourage simpler architectures. Baseline is part of this trend because it gives teams more confidence in native features that have become interoperable. ([web.dev][9])
3. Interoperability as a first-class goal

Interop 2025 and 2026 show that browser vendors are coordinating on feature support and developer pain points. This reduces the historical cost of building directly on platform standards. ([web.dev][7])
4. Component models closer to web standards

Web Components, custom elements, shadow DOM, and element internals are becoming more practical. Even when teams use React or Vue, the general industry direction is toward better alignment with platform-level components rather than complete isolation from them. The HTML standard’s support for form-associated custom elements is a good example. ([HTML Living Standard][4])
5. Continued coexistence of SSR, SSG, and client interactivity

The field is not moving in only one direction. Static generation, server-side rendering, partial hydration, and islands architecture are all active patterns. HTML remains central because all of them ultimately produce or enhance HTML documents.
6. Performance-conscious HTML delivery

Modern development increasingly values smaller bundles, faster first paint, less JavaScript, and better content-first delivery. This generally benefits approaches that treat HTML as the primary delivery format rather than as an afterthought. The State of HTML survey’s performance pain-point section reflects this pressure. ([State of HTML 2025][6])
7. Standards are ongoing, not finished

The HTML standard is still updated. That matters conceptually: HTML should be treated as a living platform embedded in a broader evolving web standard ecosystem. ([HTML Living Standard][8])

How HTML should be learned

A good learning order is:
* HTML document structure
* Text, lists, links, images
* Semantic sectioning
* Tables and forms
* Accessibility basics
* CSS fundamentals
* JavaScript and DOM manipulation
* Responsive design
* Build tools and frameworks
* Performance, SEO, and testing

A practical principle

Learn HTML as a content and meaning system first, not just as syntax. The central question is not “Which tag can make this look right?” but “What is this content, structurally and semantically?” Once that is correct, CSS and JavaScript become easier and more reliable.

Common mistakes and easily confused points
* Using `div` for everything instead of semantic elements like `nav`, `main`, `article`, or `button`
* Using a link (`a`) where a button is needed, or a button where a link is needed
* Thinking HTML is only for appearance rather than structure and meaning
* Treating accessibility as something added later instead of something built into correct HTML
* Overusing frameworks before understanding native HTML forms, inputs, and document structure
* Confusing HTML with the entire front end; HTML is only one layer of the web platform
* Assuming “HTML5” is the main current formal model; in standards terms, the more accurate idea today is the HTML Living Standard

## HTML5 Design Philosophy: Why It Recommends Some Things and Discourages Others

**Definition**: **HTML5** is not just a larger set of tags. It reflects a design philosophy about what the web should be: **semantic**, **device-independent**, **forward-compatible**, **accessible**, and **separated by responsibility**.

**Core claim**: Most HTML5 recommendations follow one deep rule:

> **HTML should describe meaning and structure, not visual appearance or device-specific behavior.**

Once this principle is understood, many “recommended vs discouraged” choices become easy to explain.

---

### **1. The central design model of HTML5**

**Analysis**: HTML5 assumes that a web document is not only seen by a person in one browser on one screen. It may also be consumed by:
* search engines
* screen readers
* browsers with different default styles
* mobile devices
* parsers, readers, and extraction tools
* future software not yet written

Because of this, HTML5 prefers markup that answers questions like:
* What is this content?
* What role does this part play?
* How are these parts related?

It does **not** want HTML to answer questions like:
* Should this text be green?
* Should this image sit 5 pixels from the edge?
* Should this text be bold because I want emphasis, or just because I want thick letters?

Those presentation questions belong mostly to **CSS**. Behavioral questions belong mostly to **JavaScript**.

**Conclusion**: HTML5 is built around **separation of concerns**:
* **HTML** = structure and meaning
* **CSS** = presentation
* **JavaScript** = behavior

This is the single most important underlying principle.

---

### **2. Why HTML5 discourages presentational markup**

**Background**: Older HTML often mixed content and presentation. For example:

```html
<font color="red" size="4">Warning</font>
<center><b>Hello</b></center>
<img align="right" hspace="5">
```

This style made sense in a much earlier web, when CSS was weak or inconsistently supported. But HTML5 moved away from that model.

#### **Why this is discouraged**

**First**, presentational markup is fragile. If appearance is embedded directly into HTML, changing the site’s design becomes slow and repetitive.

**Second**, presentational markup is semantically poor. `<font color="red">Warning</font>` tells the browser what it should look like, but not what it means. Is it a warning? A label? A critical error? A decorative phrase?

**Third**, presentation is context-dependent. A mobile layout, a dark theme, a print stylesheet, and a screen reader all need different output behavior. Hard-coding appearance in HTML interferes with this flexibility.

#### **Bad example**

```html
<center>
  <font color="green" size="5">My Blog</font>
</center>
```

#### **Better example**

```html
<h1 class="site-title">My Blog</h1>
```

```css
.site-title {
  text-align: center;
  color: green;
  font-size: 2rem;
}
```

**Why the second is better**:
* HTML now says: “this is the main heading”
* CSS says: “center it and make it green”
* meaning and presentation are no longer fused

---

### **3. Why HTML5 prefers semantic elements**

**Definition**: A **semantic element** is an element whose name communicates its role in the document.

Examples include:
* `<header>`
* `<nav>`
* `<main>`
* `<article>`
* `<section>`
* `<aside>`
* `<footer>`

Older markup often used many generic `<div>` elements:

```html
<div class="top">
  <div class="menu">...</div>
  <div class="content">...</div>
</div>
```

HTML5 does not ban `<div>`, but it encourages replacing generic containers with meaningful ones when possible.

#### **Bad example**

```html
<div class="post">
  <div class="title">On Reading</div>
  <div class="body">...</div>
  <div class="info">April 16, 2026</div>
</div>
```

#### **Better example**

```html
<article class="post">
  <h2>On Reading</h2>
  <div class="post-body">...</div>
  <footer>
    <time datetime="2026-04-16">April 16, 2026</time>
  </footer>
</article>
```

**Analysis**: The better version gives structure to the content:
* this whole thing is an **article**
* its title is a **heading**
* its date is a **time**
* the date is in the **footer** of the article

This improves:
* accessibility
* machine readability
* maintainability
* search and extraction quality

**Conclusion**: HTML5 favors semantic elements because meaning scales better than presentation.

---

### **4. Why HTML5 favors accessibility-friendly structure**

**Background**: HTML5 assumes the web should work for more than sighted mouse users. This is not a secondary concern. It is one of the architectural assumptions of the platform.

That is why HTML5 strongly favors:
* correct headings
* labels for forms
* alt text for images
* meaningful buttons and links
* structural landmarks like `<main>` and `<nav>`

#### **Bad example**

```html
<div onclick="submitForm()">Submit</div>
```

#### **Better example**

```html
<button type="submit">Submit</button>
```

**Why the second is better**:
* it is keyboard-friendly by default
* screen readers recognize it as a button
* browsers know how to interact with it
* less custom code is needed

This shows another major HTML5 principle:

> **Prefer native semantics and native browser behavior over re-creating them manually.**

#### **Another bad example**

```html
<img src="author.jpg">
```

#### **Better example**

```html
<img src="author.jpg" alt="Portrait of the author">
```

Or, if the image is decorative:

```html
<img src="divider.png" alt="">
```

**Analysis**: HTML5 does not want the meaning of an image to be left ambiguous. The browser needs explicit help.

---

### **5. Why HTML5 discourages obsolete attributes**

Attributes such as:
* `align`
* `bgcolor`
* `hspace`
* `vspace`
* `border`
* many uses of `width` and `height` for styling purposes

are discouraged or obsolete in modern HTML practice.

#### **Underlying reason**

These attributes are mostly remnants of an earlier web where layout and style were done in HTML because CSS was not mature enough.

HTML5 moved the platform toward a cleaner model:
* structural meaning in HTML
* visual control in CSS

#### **Bad example**

```html
<img src="avatar.png" align="right" hspace="5" vspace="5">
```

#### **Better example**

```html
<img src="avatar.png" alt="Author avatar" class="avatar">
```

```css
.avatar {
  float: right;
  margin: 5px;
}
```

**Conclusion**: HTML5 discourages obsolete presentational attributes because they mix responsibilities and reduce flexibility.

---

### **6. Why HTML5 treats headings as document structure, not just big text**

**Analysis**: A heading is not “text that should look large.” A heading defines the outline and hierarchy of a document.

That is why HTML5 prefers:

```html
<h1>Main title</h1>
<h2>Section title</h2>
<h3>Subsection title</h3>
```

instead of:

```html
<p class="big-bold">Main title</p>
<p class="medium-bold">Section title</p>
```

The second version can be made to look similar, but it does not communicate hierarchy as clearly.

#### **Bad example**

```html
<div class="title">Course Notes</div>
<div class="subtitle">Week 1</div>
```

#### **Better example**

```html
<h1>Course Notes</h1>
<h2>Week 1</h2>
```

**Why this matters**:
* screen readers navigate by headings
* search tools infer importance from headings
* styling can still be customized later with CSS

#### **Important nuance**

HTML5 does **not** require you to accept default heading appearance. It only wants you to use headings for heading roles.

So this is perfectly good:

```html
<h2 class="post-title">A Theory of Reading</h2>
```

```css
.post-title {
  font-size: 1.1rem;
  font-weight: 600;
}
```

**Conclusion**: HTML5 encourages semantic structure even when the final visual style differs from browser defaults.

---

### **7. Why HTML5 favors meaningful form markup**

Forms are a strong example of HTML5’s design logic. A form is not just a set of boxes. It is a structured interaction between user and system.

That is why HTML5 encourages:
* `<label>`
* semantic input types such as `email`, `url`, `date`
* `<fieldset>` and `<legend>` when grouping related controls
* native validation where suitable

#### **Bad example**

```html
<div>Email</div>
<input>
```

#### **Better example**

```html
<label for="email">Email</label>
<input id="email" type="email" name="email">
```

The better version has:
* an explicit label
* an input type with semantic meaning
* a named field that can be submitted properly

HTML5’s preference here follows the same principle: **describe intent, not only shape**.

---

### **8. Why HTML5 likes native elements more than custom re-creation**

**Analysis**: A major HTML5 principle is that native browser elements are valuable because they already come with behavior, semantics, keyboard support, accessibility support, and predictable interaction.

#### **Bad example**

```html
<div class="fake-link" onclick="location.href='/about'">About</div>
```

#### **Better example**

```html
<a href="/about">About</a>
```

#### **Bad example**

```html
<div class="fake-checkbox"></div>
```

#### **Better example**

```html
<input type="checkbox" id="agree">
<label for="agree">I agree</label>
```

**Conclusion**: HTML5 prefers native elements because they encode tested platform behavior. Replacing them without need often creates weaker, less accessible interfaces.

---

### **9. Why HTML5 tolerates generic containers but prefers purposeful ones**

HTML5 does not reject `<div>` or `<span>`. They are still necessary. But it treats them as **generic containers of last resort**.

#### **Use `<div>` and `<span>` when**
* there is no suitable semantic element
* you need a styling or scripting hook
* the role is purely structural and not semantically distinct

#### **Do not overuse them when**
* a semantic element exists
* you are masking real document structure

#### **Bad example**

```html
<div class="navigation">
  <div class="navigation-item"><a href="/">Home</a></div>
</div>
```

#### **Better example**

```html
<nav>
  <a href="/">Home</a>
</nav>
```

**Principle**: Use generic containers when necessary, but not as a substitute for meaning.

---

### **10. Why HTML5 values machine-readable annotations**

HTML5 often encourages forms of markup that help software interpret content, even when the user sees almost no difference.

Examples include:
* `datetime` on `<time>`
* `alt` on images
* `lang` on documents or sections
* `type="email"` on inputs
* `meta` tags for document information

#### **Example**

```html
<time datetime="2026-04-16">April 16, 2026</time>
```

This does more than display a date. It tells machines what the date *is* in normalized form.

This reflects a deep HTML5 assumption:

> **Documents should be understandable both visually and structurally.**

---

### **11. Why HTML5 prefers progressive enhancement over brittle dependence**

**Definition**: **Progressive enhancement** means starting with a functional semantic base, then adding styling and interactivity on top.

HTML5 fits this philosophy well because semantic markup can stand on its own better than purely visual or script-dependent markup.

#### **Bad example**

```html
<div class="menu-button" onclick="toggleMenu()">Menu</div>
<div id="menu" style="display:none">...</div>
```

#### **Better example**

```html
<button type="button" aria-expanded="false" aria-controls="menu">Menu</button>
<nav id="menu">...</nav>
```

Then JavaScript can enhance the behavior.

**Analysis**: HTML5 prefers resilient structure. If CSS or JavaScript fails, the underlying document should still be meaningful and as usable as possible.

---

### **12. Why some old patterns feel “wrong” in HTML5 even if they still work**

This is an important point. Many discouraged patterns are not forbidden because browsers must remain backward-compatible. The web cannot break old pages too easily.

So HTML5 often tolerates bad legacy markup, but does not recommend it.

This means:
* **working** is not the same as **good**
* browser support is not the same as semantic quality
* backward compatibility should not be mistaken for modern best practice

#### **Example**

```html
<table>
  <tr>
    <td><b>Title</b></td>
  </tr>
</table>
```

This may render. But if the purpose is layout rather than tabular data, HTML5 considers it poor practice.

#### **Better**

Use tables for actual data tables, not page layout.

---

### **13. Abstract principles behind HTML5 recommendations**

Here are the deeper principles that explain most of HTML5’s advice.

#### **Principle 1: Meaning before appearance**

Markup should say what something *is*, not merely how it should look.

#### **Principle 2: Separate concerns**

Structure belongs to HTML, style to CSS, behavior to JavaScript.

#### **Principle 3: Prefer built-in semantics**

Native elements are usually better than handcrafted imitations.

#### **Principle 4: Design for multiple consumers**

Documents are read by humans, browsers, assistive tools, search engines, parsers, and future systems.

#### **Principle 5: Keep documents resilient**

A page should remain understandable even if style or script is reduced or changed.

#### **Principle 6: Favor maintainability**

Semantic, structured markup is easier to scale and refactor than presentation-heavy markup.

---

### **14. Good vs bad examples in one place**

#### **A. Image alignment**

**Bad**

```html
<img src="photo.jpg" align="right" hspace="5" vspace="5">
```

**Good**

```html
<img src="photo.jpg" alt="Portrait photo" class="side-image">
```

```css
.side-image {
  float: right;
  margin: 5px;
}
```

---

#### **B. Text styling**

**Bad**

```html
<font color="red"><b>Important</b></font>
```

**Good**

```html
<strong class="warning-text">Important</strong>
```

```css
.warning-text {
  color: red;
}
```

**Analysis**: `<strong>` expresses importance. CSS expresses redness.

---

#### **C. Page layout**

**Bad**

```html
<table>
  <tr>
    <td>Sidebar</td>
    <td>Main content</td>
  </tr>
</table>
```

**Good**

```html
<div class="layout">
  <aside>Sidebar</aside>
  <main>Main content</main>
</div>
```

```css
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
}
```

**Reason**: Tables are for tabular data, not layout structure.

---

#### **D. Clickable controls**

**Bad**

```html
<div onclick="save()">Save</div>
```

**Good**

```html
<button type="button">Save</button>
```

---

#### **E. Document structure**

**Bad**

```html
<div class="header">My Notes</div>
<div class="section-title">Chapter 1</div>
```

**Good**

```html
<h1>My Notes</h1>
<h2>Chapter 1</h2>
```

---

#### **F. Metadata**

**Bad**

```html
<span>2026-04-16</span>
```

**Good**

```html
<time datetime="2026-04-16">2026-04-16</time>
```

---

### **15. A useful rule of thumb**

When writing HTML, ask two questions:

**Question 1**: *If all CSS disappeared, would this still have understandable structure?*
If the answer is no, the HTML may be too presentational or too generic.

**Question 2**: *Am I using this element because of what it means, or only because of how it looks by default?*
If it is only about appearance, the choice is probably weak.

This is a very effective test.

---

### **16. The deepest abstraction**

**Conclusion**: The deepest principle behind HTML5 is this:

> **A web document is not a painted canvas first. It is a structured, meaningful information object first.**

Visual design still matters greatly. But HTML5 assumes that visual styling should be layered on top of semantic structure, not baked into the structure itself.

That is why HTML5 tends to recommend:
* semantic elements
* native controls
* proper headings
* CSS for presentation
* JavaScript for behavior
* metadata and accessibility support

And it tends to discourage:
* obsolete presentational attributes
* layout tables
* fake controls
* generic containers used where semantic ones exist
* styling decisions embedded directly into markup

---

### **Final summary**

**HTML5 recommends** what improves:
* semantic clarity
* accessibility
* maintainability
* interoperability
* resilience
* multi-device and multi-tool compatibility

**HTML5 discourages** what confuses:
* structure with style
* meaning with appearance
* native semantics with custom imitation
* presentational hacks with durable markup

In one sentence:

***Good HTML5 describes the document; bad HTML pretends to style the document from inside the document.***

I can also turn this into a more formal **style guide chapter** with sections like **semantic structure**, **obsolete patterns**, **accessibility logic**, and **migration advice from old HTML to HTML5**.
