---
category: Notes
title: HTML - Quick Reference
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

