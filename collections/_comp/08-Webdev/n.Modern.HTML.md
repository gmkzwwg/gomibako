---
title: Modern HTML - Quick Reference Guide
categories: Notes
subclass: Webdev
---

## PART 1 — Macro Analysis, Philosophy, Tool Fit, and Technical Trends — HTML5, Living Standard, evergreen browsers

This part establishes the conceptual model for **HTML5** as a professional markup system: what it is, why it exists, how it interacts with browsers and adjacent technologies, and where modern HTML practice is moving. Scope follows the requested **HTML5 professional reference** brief. 

### What HTML5 Is — markup, semantics, document structure, browser contract

**Definition:** **HTML5** is the modern family name for HTML as used on the contemporary web, but the active specification is no longer best understood as a frozen “HTML5 version.” The authoritative model is the **WHATWG HTML Living Standard**, which is continuously maintained; the current standard page identifies itself as a *Living Standard* and was updated on **May 4, 2026**. 

HTML is a **declarative markup language** for describing the structure, semantics, metadata, and embedded resources of a web document or application shell. It does not primarily “program behavior.” Instead, it declares a document tree that browsers parse into the `DOM`, expose to accessibility tools, style through CSS, and enhance through JavaScript.

A professional way to think about HTML is:

| Layer                | HTML’s role                                                                                 | Adjacent system                    |
| -------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------- |
| Document structure   | Defines elements, hierarchy, sections, forms, tables, media, links, metadata                | Browser parser, `DOM`              |
| Meaning              | Communicates semantic purpose: heading, article, navigation, form control, table header     | Accessibility tree, search engines |
| Resource declaration | Loads scripts, stylesheets, images, media, icons, manifests, preloads                       | Network stack, preload scanner     |
| Interaction baseline | Provides native controls such as links, buttons, forms, `details`, `dialog`, media controls | Browser UI, JavaScript enhancement |
| Integration boundary | Supplies stable hooks through `id`, `class`, `data-*`, custom elements, slots, templates    | CSS, JavaScript, frameworks        |

**Key conclusion:** HTML is not “just tags.” It is the browser-facing contract for document semantics, accessibility, metadata, navigation, forms, resource loading, and safe integration with CSS and JavaScript.

*Common Pitfalls: Treating HTML as a visual layout language produces fragile documents, poor accessibility, weak SEO, and avoidable JavaScript dependence.*

### The Problem HTML Solves — interoperable documents, hyperlinks, forms, media, application shells

HTML solves a very specific platform problem: **how to represent linked, structured, machine-readable documents that can be parsed, rendered, navigated, indexed, submitted, embedded, inspected, and progressively enhanced across user agents**.

Its core problems are:

| Problem                    | HTML mechanism                                                       |
| -------------------------- | -------------------------------------------------------------------- |
| Portable documents         | Standard elements and attributes                                     |
| Hypertext navigation       | `a`, URLs, fragments, link relations                                 |
| Machine-readable structure | Headings, sectioning elements, landmarks, metadata                   |
| User input                 | Forms, controls, constraints, labels, submission semantics           |
| Embedded media             | `img`, `picture`, `audio`, `video`, `track`, `iframe`, `canvas`, SVG |
| Resource orchestration     | `link`, `script`, preload hints, module scripts                      |
| Accessibility baseline     | Native roles, names, states, focus behavior                          |
| Search and sharing         | `title`, `meta`, canonical links, structured data                    |
| Progressive enhancement    | Usable baseline markup enhanced by CSS and JavaScript                |

Modern HTML is unusually powerful because it is **fault-tolerant**, **backward-compatible**, and **platform-native**. Browsers aggressively recover from malformed markup, which keeps pages rendering but can hide serious structural errors.

**Tradeoff:** HTML’s error recovery improves compatibility, but it can make invalid markup appear to work while silently damaging the `DOM`, accessibility tree, form behavior, or layout assumptions.

*Common Pitfalls: Browser rendering is not proof of correctness; invalid HTML can render acceptably while breaking assistive technology, forms, scripts, or SEO.*

### Core Mental Model — source HTML, parser, DOM, accessibility tree, rendering

The essential runtime model is:

```text
HTML source
  -> HTML parser
  -> DOM tree
  -> CSSOM + layout + paint
  -> accessibility tree
  -> JavaScript interaction and mutation
```

The **source HTML** is not always the same as the final `DOM`. Browsers normalize omitted tags, repair invalid nesting, close elements implicitly, and insert missing structure such as `tbody` in tables. JavaScript can further mutate the `DOM` after initial parsing.

For professional work, four representations must be distinguished:

| Representation     | What it is                                        | Why it matters                                       |
| ------------------ | ------------------------------------------------- | ---------------------------------------------------- |
| Source HTML        | Bytes sent by server or written in a file         | Validation, SSR quality, crawlability                |
| Parsed `DOM`       | Browser’s interpreted document tree               | Scripting, CSS selectors, DevTools inspection        |
| Render tree/layout | Visual boxes after CSS processing                 | Performance, layout, visual correctness              |
| Accessibility tree | Platform-facing semantic model for assistive tech | Screen readers, keyboard workflows, accessible names |

**Important implication:** good HTML is not only about visual output. It must produce the intended `DOM`, expose correct semantics, support keyboard and assistive technology, and load resources efficiently.

*Common Pitfalls: Debugging only the visual page misses parser repair, inaccessible names, incorrect roles, hidden focus traps, and resource-loading defects.*

### Main Abstractions — elements, attributes, content categories, metadata, resources

HTML’s primary abstractions are simple but highly structured.

| Abstraction              | Meaning                                                   | Examples                                                  |
| ------------------------ | --------------------------------------------------------- | --------------------------------------------------------- |
| Element                  | Semantic or structural unit                               | `main`, `article`, `form`, `input`, `table`, `img`        |
| Attribute                | Element modifier or data value                            | `href`, `src`, `alt`, `type`, `name`, `required`, `lang`  |
| Content category         | Rule set for where elements may appear                    | Flow, phrasing, sectioning, embedded, interactive         |
| Metadata                 | Machine-readable document information                     | `title`, `meta`, `link rel="canonical"`                   |
| Form control             | User-input primitive with submission semantics            | `input`, `select`, `textarea`, `button`                   |
| Resource reference       | External dependency or embedded asset                     | stylesheet, script, image, video, icon                    |
| Link relation            | Semantic relationship to another resource                 | `canonical`, `preload`, `stylesheet`, `manifest`          |
| Global attribute         | Cross-element modifier                                    | `id`, `class`, `hidden`, `lang`, `dir`, `data-*`, `inert` |
| ARIA role/state/property | Accessibility annotation when native HTML is insufficient | `role`, `aria-label`, `aria-expanded`                     |

MDN’s HTML element reference groups elements by function, including metadata, sectioning, text content, inline semantics, images and multimedia, embedded content, SVG/MathML, scripting, tables, forms, interactive elements, web components, and obsolete/deprecated elements. This functional grouping is useful because professional HTML selection is usually a **semantic choice**, not a memorized tag-list exercise. 

**Key conclusion:** the central skill is choosing the most specific native element and attribute combination that accurately represents the document’s purpose.

*Common Pitfalls: Overusing `div` and `span` erases semantics that browsers, assistive technologies, search engines, forms, and automation tools can otherwise use for free.*

### Design Philosophy — declarative, semantic, forgiving, backward-compatible

HTML’s design philosophy is shaped by the web’s constraints: untrusted documents, legacy content, partial implementation, broken markup, slow networks, diverse devices, and accessibility requirements.

| Principle                | Meaning                                         | Professional consequence                                           |
| ------------------------ | ----------------------------------------------- | ------------------------------------------------------------------ |
| Declarative structure    | Say what the document is, not how to compute it | Prefer native elements and attributes before JavaScript            |
| Semantic markup          | Element choice should encode meaning            | Use `button` for actions, `a` for navigation, `label` for controls |
| Fault tolerance          | Browsers repair invalid documents               | Validate because rendering is not enough                           |
| Backward compatibility   | Old content should keep working                 | New features must degrade carefully                                |
| Progressive enhancement  | Baseline content should work before enhancement | Avoid JS-only access to critical content or forms                  |
| Separation of concerns   | HTML structure, CSS presentation, JS behavior   | Avoid presentational markup and fake controls                      |
| Native platform leverage | Built-in browser behavior is valuable           | Prefer native forms, media, dialogs, details, validation, focus    |

The WHATWG developer edition explicitly treats HTML as a broad platform specification, covering not only markup but also web application APIs, parsing, semantics, scripting integration, security, and browser behavior. 

**Professional judgment:** HTML is most maintainable when it is boring, explicit, valid, semantic, and designed to survive CSS/JS failure.

*Common Pitfalls: Replacing native behavior with custom components often recreates worse versions of built-in browser features, especially for keyboard interaction, focus management, form submission, and accessibility.*

### Historical Background — from document markup to application platform

HTML began as a simple hypertext document language and evolved into the structural foundation of the web application platform. The historical arc matters because many modern HTML rules are compromises between **document publishing**, **application UI**, **browser interoperability**, and **legacy compatibility**.

| Era                 | Character                                                                         | Lasting effect                                                             |
| ------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Early HTML          | Hypertext documents, headings, paragraphs, links, images                          | Document-first semantics                                                   |
| Table/layout era    | Markup used for visual layout                                                     | Many obsolete anti-patterns remain in old codebases                        |
| XHTML influence     | XML-style strictness, lowercase habits, self-closing syntax expectations          | Some conventions persist, but HTML parsing differs from XML                |
| HTML5 era           | Native media, semantic sectioning, forms, canvas, storage-related platform growth | Reduced dependency on plugins and proprietary extensions                   |
| Living Standard era | Continuous evolution across browser engines                                       | “HTML version” matters less than feature support and Baseline availability |

The practical result is that modern HTML combines two identities: it is still a **document markup language**, and it is also the declarative substrate of **web applications**.

**Key conclusion:** professional HTML must satisfy both publishing-grade semantics and application-grade integration constraints.

*Common Pitfalls: Applying either a pure document mindset or a pure app-shell mindset universally leads to poor outcomes; most production pages need both semantic content and robust application hooks.*

### Current Technical Development Trends — Living Standard, Baseline, native UI primitives, performance metadata

Modern HTML development is moving toward **continuous standardization**, **native UI primitives**, **better cross-browser feature clarity**, and **resource-loading precision**.

| Trend                          | What is changing                                                                         | Practical significance                                                                               |
| ------------------------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Living Standard model          | HTML evolves continuously rather than through rare fixed releases                        | Professionals should check current feature support, not rely on “HTML5” as a frozen version          |
| Baseline compatibility model   | Web Platform Baseline identifies features considered safe to use across current browsers | Helps teams decide whether a feature can be used without heavy compatibility research  |
| Native layered UI              | `dialog`, `popover`, top-layer behavior, declarative controls                            | Reduces custom JavaScript for modals, menus, teaching bubbles, and transient UI                      |
| Declarative interaction        | More behavior controlled by attributes                                                   | Cleaner HTML/JS boundaries                                                                           |
| Accessibility-first components | Native elements expose roles, states, keyboard behavior, and names                       | Less need for fragile ARIA-heavy custom widgets                                                      |
| Performance-aware markup       | `loading`, `decoding`, `fetchpriority`, `preload`, `preconnect`, module loading          | Markup now directly influences Core Web Vitals and network scheduling                                |
| Security-aware embedding       | `sandbox`, `allow`, `referrerpolicy`, `rel`, CSP integration                             | Markup participates in browser security boundaries                                                   |

The `popover` attribute is a good example of this direction. MDN describes the Popover API as a standardized mechanism for displaying popover content above other page content, controllable by HTML attributes or JavaScript.  MDN also marks the `popover` global attribute as **Baseline 2024**, while noting that some parts may have varying support levels.  Web.dev’s Baseline material similarly frames feature availability as a practical decision aid for projects targeting current browser engines. 

**Practical reading:** the trend is not “HTML replaces JavaScript.” The trend is that more common UI and loading behavior can begin declaratively in HTML and then be enhanced with JavaScript only where necessary.

*Common Pitfalls: Treating every new Baseline feature as universally safe for all users ignores enterprise browsers, embedded webviews, old devices, accessibility bugs, and partial implementation details.*

### Tool Fit — when HTML is the right tool

HTML is the right tool when the primary problem is **document structure, semantic UI skeleton, navigation, metadata, forms, media embedding, or resource declaration**.

| Use case                | Why HTML fits                                                 |
| ----------------------- | ------------------------------------------------------------- |
| Public content pages    | Semantic headings, articles, metadata, crawlable text         |
| Documentation           | Structured sections, tables, code blocks, anchors, navigation |
| Forms                   | Native controls, labels, validation, autocomplete, submission |
| Media pages             | Native image, picture, audio, video, captions, lazy loading   |
| App shells              | Root structure, mount points, metadata, resource loading      |
| Accessible UI baselines | Native roles, names, keyboard behavior                        |
| SEO-sensitive pages     | Crawlable content, metadata, canonical URLs, structured data  |
| Progressive enhancement | Baseline functionality before framework hydration             |

A strong production rule is: **use HTML for the invariant meaning of the interface; use CSS for presentation; use JavaScript for stateful behavior and enhancement.**

*Common Pitfalls: Using JavaScript-rendered markup for content that could be delivered as semantic HTML can harm initial load, resilience, indexing, accessibility, and debugging.*

### Tool Misfit — when HTML is the wrong tool

HTML is the wrong primary tool when the problem is **computation, styling logic, application state, data persistence, authorization, business rules, graphics programming, or backend workflow**.

| Need                                     | Better primary tool                                            |
| ---------------------------------------- | -------------------------------------------------------------- |
| Complex behavior and state transitions   | JavaScript / TypeScript                                        |
| Visual layout and responsive styling     | CSS                                                            |
| Server-side validation and authorization | Backend language/framework                                     |
| Data modeling and querying               | Database / query language                                      |
| Reusable component logic                 | Framework/component system                                     |
| Graphics rendering                       | Canvas, SVG, WebGL, CSS, or graphics library depending on use  |
| Security enforcement                     | Server controls, CSP, permissions policy, authentication layer |
| Dynamic personalization                  | Server rendering or client application logic                   |

HTML can declare constraints such as `required`, `pattern`, `min`, and `max`, but these are **usability features**, not security controls. Any security-sensitive validation must be repeated server-side or in a trusted execution context.

*Common Pitfalls: Relying on client-side HTML constraints for security allows trivial bypass through DevTools, scripted requests, disabled JavaScript, or crafted HTTP clients.*

### Strengths, Weaknesses, and Tradeoffs — semantics, compatibility, limits

| Dimension       | Strength                                               | Weakness / Tradeoff                                                  |
| --------------- | ------------------------------------------------------ | -------------------------------------------------------------------- |
| Semantics       | Encodes meaning directly                               | Requires discipline; visual result may not reveal semantic errors    |
| Accessibility   | Native elements provide strong defaults                | Custom widgets can easily break accessibility                        |
| Compatibility   | Extremely backward-compatible                          | Legacy quirks and parser recovery can hide defects                   |
| Performance     | HTML can stream and render early                       | Poor resource hints or blocking scripts can harm load performance    |
| SEO             | Search engines can process semantic, crawlable content | Metadata cannot compensate for poor content or client-only rendering |
| Forms           | Built-in controls, labels, validation, submission      | Browser UI varies; complex form UX still needs JS                    |
| Security        | Supports sandboxing, referrer controls, link relations | Markup can also create navigation, injection, and embedding risks    |
| Maintainability | Stable document structure integrates well with CSS/JS  | Over-generic markup becomes hard to refactor                         |
| Extensibility   | `data-*`, custom elements, templates, slots            | Web Components require separate lifecycle and styling knowledge      |
| Error recovery  | Pages continue working despite malformed input         | Invalid markup can produce unexpected `DOM` trees                    |

**Key conclusion:** HTML’s greatest strength is also its most common professional failure mode: it is easy to write something that appears to work. Production HTML must be validated, inspected, tested with keyboard navigation, and checked through the accessibility tree.

*Common Pitfalls: “Looks correct in Chrome on my machine” is not an HTML quality criterion.*

### HTML in the Web Stack — CSS, JavaScript, DOM, HTTP, accessibility, SEO

HTML is the **structural center** of the browser stack, but it is rarely used alone in production systems.

| Adjacent system    | Relationship to HTML                             | Common confusion                                                  |
| ------------------ | ------------------------------------------------ | ----------------------------------------------------------------- |
| CSS                | Selects and styles HTML elements                 | Using HTML elements for appearance instead of CSS                 |
| JavaScript         | Reads, mutates, and enhances the `DOM`           | Using JS to recreate native HTML behavior                         |
| DOM                | Parsed object model produced from HTML           | Assuming source HTML and `DOM` are identical                      |
| HTTP               | Delivers HTML and linked resources               | Ignoring headers, caching, compression, content type              |
| Accessibility APIs | Receive semantics from parsed HTML               | Assuming visual labels equal accessible names                     |
| Search engines     | Index crawlable content and metadata             | Assuming structured data replaces semantic content                |
| Browser DevTools   | Inspect DOM, network, performance, accessibility | Inspecting only Elements without validating source                |
| Frameworks         | Generate or hydrate HTML                         | Treating framework components as a substitute for semantic output |

A component framework can generate HTML, but it does not remove the need to understand HTML. The browser ultimately receives elements, attributes, text, resources, and scripts.

*Common Pitfalls: Framework fluency without HTML fluency often produces invalid nesting, fake controls, hydration mismatches, inaccessible components, and SEO regressions.*

### HTML vs Adjacent Technologies — role boundaries, interoperability, confusion points

No explicit `COMPARE_WITH` target was configured, so the useful comparison is between HTML and its closest adjacent technologies.

| Technology    | Primary purpose              | Execution model                   | Data/structure model                | Strength                                      | Common confusion                                           |
| ------------- | ---------------------------- | --------------------------------- | ----------------------------------- | --------------------------------------------- | ---------------------------------------------------------- |
| HTML          | Structure and semantics      | Parsed by browser into `DOM`      | Element tree                        | Accessibility, documents, forms, metadata     | Mistaken for visual layout or programming logic            |
| CSS           | Presentation and layout      | Cascading style resolution        | Rule sets applied to elements       | Responsive layout, typography, visual systems | Used to hide structural problems instead of fixing markup  |
| JavaScript    | Behavior and state           | Executed by JS engine             | Objects, functions, events, modules | Interactivity, computation, dynamic UI        | Used where native HTML behavior is enough                  |
| SVG           | Vector graphics markup       | Parsed into SVG DOM               | Graphic element tree                | Icons, diagrams, scalable graphics            | Used as generic HTML replacement                           |
| Markdown      | Lightweight authoring syntax | Converted to HTML                 | Limited document structure          | Writing speed, content workflows              | Cannot express full HTML semantics safely                  |
| JSX/templates | HTML-like generation syntax  | Compiled/rendered to HTML/DOM     | Component tree                      | Reuse and composition                         | Looks like HTML but has different syntax and runtime rules |
| ARIA          | Accessibility annotations    | Interpreted by accessibility APIs | Roles, states, properties           | Fills semantic gaps                           | Used to override native semantics unnecessarily            |

**Rule of thumb:** HTML should carry durable meaning. CSS should handle appearance. JavaScript should handle behavior that cannot be expressed declaratively. ARIA should repair or supplement semantics only when native HTML cannot express the required accessibility contract.

*Common Pitfalls: ARIA does not add keyboard behavior, validation, form submission, or correct interaction semantics by itself.*

### Professional HTML Quality Criteria — correctness, accessibility, resilience, performance

Professional HTML should be evaluated through multiple criteria, not just visual rendering.

| Criterion               | Question                                                                        |
| ----------------------- | ------------------------------------------------------------------------------- |
| Validity                | Does the markup conform to the HTML parser and content-model rules?             |
| Semantics               | Does each element accurately represent the content or control?                  |
| Accessibility           | Are names, roles, states, headings, landmarks, labels, and focus order correct? |
| Keyboard support        | Can interactive content be reached and operated without a pointer?              |
| Resource loading        | Are scripts, styles, images, fonts, and preloads scheduled intentionally?       |
| Security                | Are links, embeds, forms, referrers, and permissions constrained?               |
| SEO/social              | Are title, description, canonical, structured data, and share metadata correct? |
| Internationalization    | Are `lang`, `dir`, encoding, and localized text handled correctly?              |
| Maintainability         | Are hooks, IDs, classes, `data-*`, and component boundaries predictable?        |
| Progressive enhancement | Does core content or workflow degrade acceptably without full JS execution?     |

**Key conclusion:** professional HTML is a systems interface, not a static file format.

*Common Pitfalls: Passing a visual review while failing validation, keyboard testing, accessibility-tree inspection, or network-performance review is common in production defects.*

### Strategic Summary — HTML5 as the semantic substrate of the web

HTML5, in current professional usage, means **modern HTML as continuously evolved through the Living Standard and implemented across evergreen browsers**. It is the semantic substrate of web documents and applications. Its core value is not syntactic convenience but **interoperable meaning**: browsers, assistive technologies, search engines, crawlers, automation tools, CSS, JavaScript, and network schedulers all depend on the structure HTML provides.

The most productive professional stance is:

| Principle             | Operational habit                                                                |
| --------------------- | -------------------------------------------------------------------------------- |
| Native first          | Choose the correct built-in element before inventing a custom one                |
| Semantic first        | Encode meaning before styling or scripting                                       |
| Validated always      | Use validators and DevTools because browsers hide errors                         |
| Accessible by default | Test names, roles, headings, labels, focus, and keyboard behavior                |
| Resource-aware        | Treat `script`, `link`, media, preload, and lazy loading as performance-critical |
| Security-conscious    | Constrain embeds, links, referrers, permissions, and user-generated markup       |
| Enhancement-oriented  | Keep baseline content and workflows resilient where practical                    |

**Bottom line:** HTML is easy to start and hard to master because its correctness is distributed across parsing, semantics, accessibility, resource loading, security, compatibility, and maintainability. Professional HTML is not verbose markup; it is precise markup.
## PART 2 — Table Quick Reference Guide — installment 1, document architecture, metadata, semantics, links, images

This installment covers the first slice of the requested **HTML5 professional reference**: document structure, metadata, content categories, semantic element selection, links, and images. It follows the requested coverage-first, matrix-heavy format for **Modern HTML5 in current evergreen browsers**. 

This part treats HTML as the browser-facing contract for the `DOM`, metadata, accessibility semantics, navigation, and resource discovery. The WHATWG HTML specification is maintained as a Living Standard, and MDN organizes HTML elements by functional categories such as metadata, sectioning, text content, inline semantics, media, forms, interactive elements, and obsolete/deprecated elements. 

---

### Document Model — `<!doctype html>`, parser, DOM, conformance, source vs rendered tree

**Conceptual frame:** HTML is parsed into a `DOM` tree. Browsers recover from malformed markup, but recovery is not correctness. A document can appear visually correct while producing an unintended `DOM`, broken headings, invalid nesting, inaccessible controls, or script selector failures.

| Concept             | Meaning                                                 | Professional consequence                                                         |
| ------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `<!doctype html>`   | Triggers standards mode in modern browsers              | Always include it; avoids quirks-mode layout behavior                            |
| Source HTML         | The original markup bytes                               | Validate this when checking server-rendered output                               |
| Parsed `DOM`        | Browser-created tree after parsing and repair           | Inspect this in DevTools; it may differ from source                              |
| Content model       | Rule describing what descendants an element may contain | Prevents invalid nesting such as block content inside improper phrasing contexts |
| Flow content        | Broad category for most body content                    | Used by many container elements                                                  |
| Phrasing content    | Text-level inline content                               | Used inside paragraphs, labels, links, buttons, and inline semantics             |
| Interactive content | Elements intended for user interaction                  | Avoid nesting interactive controls inside each other                             |
| Metadata content    | Elements that describe the document or resources        | Usually belongs in `head`                                                        |
| Sectioning content  | Elements that define document regions                   | Affects outline-like structure and accessibility landmarks when used properly    |

The HTML specification defines broad content categories including metadata, flow, sectioning, heading, phrasing, embedded, interactive, palpable, and script-supporting elements. These categories help define allowed descendants and valid element placement. 

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Example document</title>
</head>
<body>
  <main>
    <h1>Example document</h1>
    <p>This is valid flow content inside the main landmark.</p>
  </main>
</body>
</html>
```

*Common Pitfalls: Assuming browser rendering proves validity; browsers repair bad markup silently, which can create unexpected `DOM` structure and accessibility defects.*

---

### Minimal Production Document Skeleton — `html`, `head`, `body`, `meta`, `title`, viewport

**Conceptual frame:** A production HTML document should establish language, encoding, viewport behavior, metadata, resource loading, and the main content landmark before any decorative or framework-specific structure.

```html
<!doctype html>
<html lang="en">
<head>
  <!-- [portability] Use UTF-8 before text content that may contain non-ASCII characters. -->
  <meta charset="utf-8">

  <!-- [functionality] Required for predictable responsive layout on mobile browsers. -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- [seo] Keep title specific, human-readable, and unique per page. -->
  <title>HTML5 Reference — Document Structure</title>

  <!-- [seo] Useful for search result snippets, though not a ranking guarantee. -->
  <meta name="description" content="A professional HTML5 reference for semantic document structure.">

  <!-- [identity] Canonical URL helps consolidate duplicate or parameterized URLs. -->
  <link rel="canonical" href="https://example.com/html-reference">

  <!-- [performance] Stylesheets usually belong before render-critical content. -->
  <link rel="stylesheet" href="/assets/site.css">

  <!-- [functionality] Defer classic scripts that do not need to block parsing. -->
  <script src="/assets/site.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to main content</a>

  <header>
    <nav aria-label="Primary">
      <a href="/">Home</a>
      <a href="/docs">Docs</a>
    </nav>
  </header>

  <main id="main">
    <h1>HTML5 Reference</h1>
    <p>Use semantic HTML as the stable contract for documents and interfaces.</p>
  </main>

  <footer>
    <small>&copy; 2026 Example Organization</small>
  </footer>
</body>
</html>
```

| Skeleton item             |                              Required? | Purpose                                                               | Caveat                                    |
| ------------------------- | -------------------------------------: | --------------------------------------------------------------------- | ----------------------------------------- |
| `<!doctype html>`         |                                    Yes | Standards mode                                                        | Must appear before `html`                 |
| `html lang="en"`          |                      Strongly required | Document language for assistive tech, translation, spellcheck, search | Use the actual page language              |
| `meta charset="utf-8"`    |                      Strongly required | Character encoding                                                    | Put early in `head`                       |
| `meta name="viewport"`    | Strongly required for responsive sites | Mobile viewport scaling                                               | Not a substitute for responsive CSS       |
| `title`                   |                   Required in practice | Browser tab, search result title, accessibility context               | Must be unique and descriptive            |
| `meta name="description"` |                            Recommended | Search/share snippet candidate                                        | Avoid keyword stuffing                    |
| `link rel="canonical"`    |          Recommended for indexed pages | Canonical URL signal                                                  | Must match intended indexable URL         |
| `main`                    |                   Strongly recommended | Primary page content landmark                                         | Use only for dominant page content        |
| Skip link                 |     Recommended for complex navigation | Keyboard bypass of repeated navigation                                | Needs visible focus styling in CSS        |
| `script defer`            |                   Commonly recommended | Avoid parser-blocking classic scripts                                 | Execution order rules differ from `async` |

MDN’s HTML element reference groups document metadata elements separately from body content, reflecting the practical distinction between document description in `head` and rendered content in `body`. 

*Common Pitfalls: Omitting `lang`, `title`, or viewport metadata creates avoidable accessibility, SEO, and mobile rendering issues even when the visible page appears normal.*

---

### Top-Level Document Elements — `html`, `head`, `body`, metadata, visible content

**Conceptual frame:** The top-level document structure should be boring and predictable. Frameworks, components, and build tools may generate this structure, but the browser still consumes ordinary HTML.

| Element  | Category               | Purpose                                                  | Typical children                                   | Professional caveat                                                      |
| -------- | ---------------------- | -------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------ |
| `html`   | Root                   | Root element of the document                             | `head`, `body`                                     | Set `lang`; optionally `dir` for bidirectional documents                 |
| `head`   | Metadata container     | Document metadata and resource declarations              | `meta`, `title`, `link`, `script`, `style`, `base` | Do not place visible content here                                        |
| `body`   | Document body          | User-visible content and app shell                       | Flow content                                       | Avoid putting metadata-only elements here unless allowed and intentional |
| `title`  | Metadata               | Page title                                               | Text only                                          | Required for useful browser/search/accessibility context                 |
| `meta`   | Metadata               | Encoding, viewport, description, robots, social metadata | Void element                                       | Values are convention-heavy; invalid names may be ignored                |
| `link`   | Metadata/resource link | Stylesheets, canonical, icons, preload, manifest         | Void element                                       | `rel` controls meaning; wrong `rel` changes behavior                     |
| `script` | Scripting              | Inline or external JavaScript/data block                 | Text or `src`                                      | Loading strategy matters for performance and execution order             |
| `style`  | Metadata/style         | Inline CSS                                               | CSS text                                           | Prefer external CSS for caching unless critical CSS is intentional       |
| `base`   | Metadata               | Base URL and default target                              | Void element                                       | Can unexpectedly affect every relative URL                               |

*Common Pitfalls: Misusing `base` can silently rewrite link, image, form, and script resolution across the entire document.*

---

### Metadata Pattern Matrix — `title`, `meta`, `link`, SEO, social, browser integration

**Conceptual frame:** Metadata is not decoration. It controls page identity, indexing hints, sharing previews, browser UI, resource discovery, installability, and canonicalization. Metadata cannot compensate for inaccessible or non-crawlable body content.

| Pattern             | Markup                                                                 | Purpose                               | Notes                                           |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------- | ----------------------------------------------- |
| Character encoding  | `<meta charset="utf-8">`                                               | Unicode document encoding             | Place early                                     |
| Responsive viewport | `<meta name="viewport" content="width=device-width, initial-scale=1">` | Mobile layout scaling                 | Do not disable zoom for normal pages            |
| Page title          | `<title>Product API Reference</title>`                                 | Browser/search/accessibility title    | Unique per page                                 |
| Description         | `<meta name="description" content="...">`                              | Search/share snippet candidate        | Human-readable, page-specific                   |
| Canonical URL       | `<link rel="canonical" href="https://example.com/page">`               | Duplicate URL consolidation           | Use absolute canonical URL in production        |
| Robots              | `<meta name="robots" content="index,follow">`                          | Indexing/crawling directive candidate | Site-wide rules may also exist in `robots.txt`  |
| Theme color         | `<meta name="theme-color" content="#ffffff">`                          | Browser UI color hint                 | Verify contrast and platform behavior           |
| Favicon             | `<link rel="icon" href="/favicon.ico" sizes="any">`                    | Browser tab/bookmark icon             | Use multiple icon formats if needed             |
| Web app manifest    | `<link rel="manifest" href="/site.webmanifest">`                       | PWA/install metadata                  | Requires valid manifest and icons               |
| Open Graph title    | `<meta property="og:title" content="...">`                             | Social sharing title                  | Use with `og:description`, `og:image`, `og:url` |
| Open Graph image    | `<meta property="og:image" content="https://example.com/cover.jpg">`   | Social preview image                  | Use absolute URL                                |
| Structured data     | `<script type="application/ld+json">...</script>`                      | Machine-readable entity data          | Must match visible content                      |

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Secure Embed Patterns — Example Docs</title>
  <meta name="description" content="Reference patterns for secure iframe embeds in HTML.">
  <link rel="canonical" href="https://example.com/docs/secure-embeds">

  <meta property="og:title" content="Secure Embed Patterns">
  <meta property="og:description" content="Reference patterns for sandboxed iframe embeds.">
  <meta property="og:image" content="https://example.com/assets/secure-embeds-cover.jpg">
  <meta property="og:url" content="https://example.com/docs/secure-embeds">

  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="manifest" href="/site.webmanifest">
</head>
```

*Common Pitfalls: Duplicating conflicting metadata, using generic titles across many pages, or adding structured data that does not match visible content can create inconsistent indexing and sharing behavior.*

---

### Content Category Matrix — metadata, flow, sectioning, heading, phrasing, embedded, interactive

**Conceptual frame:** Content categories are not visual categories. They are specification categories that define where elements are allowed and how they behave in the document model. MDN describes content categories as groupings that help define an element’s permitted descendants and shared behavior. 

| Category            | Meaning                                   | Common elements                                               | Use case                          | Caveat                                        |
| ------------------- | ----------------------------------------- | ------------------------------------------------------------- | --------------------------------- | --------------------------------------------- |
| Metadata content    | Describes document or relationships       | `title`, `meta`, `link`, `style`, `script`, `base`            | `head` configuration              | Mostly not visible                            |
| Flow content        | Most body-level content                   | `p`, `div`, `section`, `article`, `ul`, `table`, `form`       | General document body             | Very broad; not a semantic decision by itself |
| Sectioning content  | Defines major document regions            | `article`, `section`, `nav`, `aside`                          | Logical page regions              | Requires meaningful heading strategy          |
| Heading content     | Section headings                          | `h1`–`h6`, `hgroup`                                           | Titles and subsection labels      | Do not pick heading level for font size       |
| Phrasing content    | Text-level content                        | `a`, `em`, `strong`, `span`, `code`, `img`, `input`           | Inline text and controls          | Cannot contain arbitrary flow content         |
| Embedded content    | Imports external or non-HTML content      | `img`, `picture`, `iframe`, `video`, `audio`, `canvas`, `svg` | Media, embeds, graphics           | Needs fallback/accessibility text             |
| Interactive content | User-operable content                     | `a[href]`, `button`, `input`, `select`, `textarea`, `details` | Controls and navigation           | Avoid nested interactive elements             |
| Palpable content    | Content that is perceivable or meaningful | Many visible/content-bearing elements                         | Conformance guidance              | Not all technical containers are palpable     |
| Script-supporting   | Supports scripts/templates                | `script`, `template`                                          | Script and inert template content | May not render visible content directly       |

*Common Pitfalls: Invalidly placing flow content inside phrasing-only contexts such as `p`, `label`, or certain inline elements causes browser parser repair and unpredictable DOM structure.*

---

### Sectioning and Landmark Decision Matrix — `main`, `header`, `footer`, `nav`, `section`, `article`, `aside`

**Conceptual frame:** Sectioning HTML should express the information architecture of the page. A section is not just a box. Use sectioning and landmark-like elements to make navigation, scanning, accessibility, and maintenance easier.

| Need                          | Prefer                     | Avoid                               | Rationale                                                          |
| ----------------------------- | -------------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| Dominant page content         | `main`                     | `div id="main"` without landmark    | Native landmark improves assistive navigation                      |
| Site/page masthead            | `header`                   | Generic `div`                       | Represents introductory content for page or section                |
| Page/site footer              | `footer`                   | Generic `div`                       | Represents footer metadata, links, authorship, legal info          |
| Primary navigation            | `nav aria-label="Primary"` | List of links in anonymous `div`    | Indicates navigation region                                        |
| Self-contained article        | `article`                  | `section` for syndicateable content | Suitable for posts, docs, comments, cards with independent meaning |
| Thematic document region      | `section` with heading     | `section` used only for styling     | Section should normally have a heading                             |
| Tangential/supporting content | `aside`                    | `section` for side notes            | Represents complementary content                                   |
| Generic styling wrapper       | `div`                      | Misused `section` or `article`      | `div` is correct when there is no semantic meaning                 |
| Inline generic hook           | `span`                     | Misused text semantic element       | Use when no stronger inline semantic exists                        |

```html
<body>
  <header>
    <nav aria-label="Primary">
      <a href="/products">Products</a>
      <a href="/docs">Docs</a>
      <a href="/support">Support</a>
    </nav>
  </header>

  <main>
    <article>
      <header>
        <h1>HTML Sectioning Reference</h1>
        <p>Updated <time datetime="2026-05-05">May 5, 2026</time></p>
      </header>

      <section aria-labelledby="semantic-structure">
        <h2 id="semantic-structure">Semantic structure</h2>
        <p>Choose elements by meaning before styling requirements.</p>
      </section>
    </article>

    <aside aria-label="Related references">
      <a href="/docs/forms">Forms reference</a>
    </aside>
  </main>

  <footer>
    <small>&copy; 2026 Example Docs</small>
  </footer>
</body>
```

| Heading pattern | Good                                                   | Bad                                                            |
| --------------- | ------------------------------------------------------ | -------------------------------------------------------------- |
| Page title      | One clear `h1` for the page’s main subject             | Multiple unrelated `h1`s used for visual size                  |
| Subsection      | `h2` after `h1`, `h3` inside `h2` topic                | Jumping from `h1` to `h4` for styling                          |
| Card headings   | Use appropriate heading level within page hierarchy    | Using headings for decorative labels                           |
| Hidden headings | Use visually hidden CSS only when needed for landmarks | Removing headings entirely because design lacks visible titles |

*Common Pitfalls: Using `section` as a layout wrapper without a heading creates weak structure; using headings for font size instead of hierarchy breaks navigation for screen-reader and keyboard users.*

---

### Text Semantics Matrix — `p`, `em`, `strong`, `small`, `abbr`, `time`, `code`, `kbd`, `samp`, `mark`, `cite`, `dfn`

**Conceptual frame:** Text-level semantics communicate meaning inside prose. They should not be chosen for default styling. Use CSS to change appearance; use semantic elements to encode meaning.

| Element       | Meaning                         | Minimal example                                        | Avoid using it for                   |
| ------------- | ------------------------------- | ------------------------------------------------------ | ------------------------------------ |
| `p`           | Paragraph                       | `<p>HTML encodes document structure.</p>`              | Wrapping arbitrary block structures  |
| `em`          | Stress emphasis                 | `<em>Do not</em> nest interactive controls.`           | Italics only                         |
| `strong`      | Strong importance               | `<strong>Server-side validation is required.</strong>` | Bold only                            |
| `small`       | Side comments, legal notes      | `<small>Terms apply.</small>`                          | Making any text visually small       |
| `abbr`        | Abbreviation                    | `<abbr title="HyperText Markup Language">HTML</abbr>`  | Tooltips for arbitrary text          |
| `time`        | Machine-readable date/time      | `<time datetime="2026-05-05">May 5, 2026</time>`       | Decorative dates without valid value |
| `code`        | Code fragment                   | `<code>input[type="email"]</code>`                     | Monospace styling for non-code       |
| `kbd`         | User input                      | Press <code><kbd>Ctrl</kbd></code>                     | General keyboard-like styling        |
| `samp`        | Program output                  | `<samp>404 Not Found</samp>`                           | Arbitrary quoted text                |
| `mark`        | Highlighted/relevant text       | `<mark>matching result</mark>`                         | Permanent brand highlight            |
| `cite`        | Title of creative work          | `<cite>HTML Living Standard</cite>`                    | Person names in normal prose         |
| `dfn`         | Defining instance               | `<dfn>Flow content</dfn>`                              | Any bolded term                      |
| `br`          | Line break                      | Address/poetry line breaks                             | Paragraph spacing                    |
| `wbr`         | Optional line break opportunity | Long tokens/URLs                                       | Manual layout control everywhere     |
| `sub` / `sup` | Subscript/superscript           | `H<sub>2</sub>O`, `x<sup>2</sup>`                      | Decorative vertical alignment        |

```html
<p>
  The <dfn>accessible name</dfn> is the name exposed to assistive technologies.
  Use <code>&lt;label&gt;</code> for form controls instead of relying on placeholder text.
</p>

<p>
  Last reviewed <time datetime="2026-05-05">May 5, 2026</time>.
</p>
```

*Common Pitfalls: Choosing `em`, `strong`, `small`, or `code` for their browser default appearance instead of their semantic meaning creates misleading markup.*

---

### Grouping Content Matrix — `div`, `p`, `ul`, `ol`, `li`, `figure`, `figcaption`, `blockquote`, `pre`, `hr`

**Conceptual frame:** Grouping elements organize body content into paragraphs, lists, quotations, figures, and thematic breaks. Use the most specific grouping element before falling back to `div`.

| Element      | Meaning                               | Typical use                                   | Caveat                                                       |
| ------------ | ------------------------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| `div`        | Generic flow container                | Styling, layout, component wrapper            | No semantics; do not use when a native semantic element fits |
| `p`          | Paragraph                             | Prose blocks                                  | Cannot contain arbitrary flow content                        |
| `ul`         | Unordered list                        | Navigation links, feature lists, bullet lists | Use only when items form a list                              |
| `ol`         | Ordered list                          | Steps, rankings, ordered procedures           | Use when order changes meaning                               |
| `li`         | List item                             | Child of `ul`, `ol`, `menu`                   | Must be inside a list context                                |
| `figure`     | Self-contained referenced content     | Images, diagrams, code listings               | Not only for images                                          |
| `figcaption` | Figure caption                        | Caption/legend for `figure`                   | Should be first or last child                                |
| `blockquote` | Extended quotation                    | Quoted passage from another source            | Use `cite` attribute or visible citation where appropriate   |
| `pre`        | Preformatted text                     | Code blocks, logs, whitespace-sensitive text  | Escape HTML-sensitive characters inside                      |
| `hr`         | Thematic break                        | Scene/topic transition                        | Not a decorative line                                        |
| `address`    | Contact info for nearest article/body | Author/site contact details                   | Not all postal addresses                                     |
| `dl`         | Description list                      | Terms/definitions, metadata pairs             | Not a generic two-column layout                              |

```html
<figure>
  <pre><code>npm run validate:html</code></pre>
  <figcaption>Example validation command used in a documentation workflow.</figcaption>
</figure>

<ol>
  <li>Write semantic HTML.</li>
  <li>Validate the document.</li>
  <li>Inspect the accessibility tree.</li>
</ol>
```

*Common Pitfalls: Using `div` for lists, captions, quotations, and figures discards structure that browsers and assistive technologies can otherwise expose.*

---

### Link and Navigation Matrix — `a`, `href`, fragments, downloads, external links, `rel`

**Conceptual frame:** A link navigates. A button performs an action. This distinction is one of the most important professional HTML rules because it affects keyboard behavior, semantics, browser UI, context menus, history, and accessibility.

| Need                 | Correct element              | Example                                                    | Caveat                                   |
| -------------------- | ---------------------------- | ---------------------------------------------------------- | ---------------------------------------- |
| Navigate to page     | `a[href]`                    | `<a href="/docs">Docs</a>`                                 | Without `href`, `a` is not a normal link |
| Navigate to fragment | `a[href="#section-id"]`      | `<a href="#install">Install</a>`                           | Target `id` must be unique               |
| External link        | `a[href]`                    | `<a href="https://example.com">External</a>`               | Consider visible indication for users    |
| New tab/window       | `target="_blank"` plus `rel` | `<a href="..." target="_blank" rel="noopener noreferrer">` | Avoid unnecessary new tabs               |
| Download file        | `download`                   | `<a href="/report.pdf" download>Download report</a>`       | Cross-origin behavior may vary           |
| Email link           | `mailto:`                    | `<a href="mailto:support@example.com">Email support</a>`   | Exposes address to scraping              |
| Telephone link       | `tel:`                       | `<a href="tel:+15551234567">Call</a>`                      | Use international format                 |
| Perform UI action    | `button`                     | `<button type="button">Open menu</button>`                 | Do not use `a href="#"` for actions      |

| `rel` value  | Typical context                   | Meaning                                                            |
| ------------ | --------------------------------- | ------------------------------------------------------------------ |
| `noopener`   | External new-tab links            | Prevents opener access                                             |
| `noreferrer` | Privacy-sensitive external links  | Suppresses referrer and implies opener protection in many contexts |
| `nofollow`   | User-generated or untrusted links | Search-engine relationship hint                                    |
| `ugc`        | User-generated content links      | Search-engine relationship hint                                    |
| `sponsored`  | Paid/sponsored links              | Search-engine relationship hint                                    |
| `canonical`  | `link` in `head`                  | Preferred URL for the page                                         |
| `preload`    | `link` in `head`                  | High-priority resource fetch                                       |
| `stylesheet` | `link` in `head`                  | CSS stylesheet                                                     |

```html
<nav aria-label="Documentation">
  <a href="/docs/html">HTML</a>
  <a href="/docs/forms">Forms</a>
  <a href="/docs/accessibility">Accessibility</a>
</nav>

<a
  href="https://external.example/report"
  target="_blank"
  rel="noopener noreferrer"
>
  Open external report
</a>

<button type="button" aria-expanded="false" aria-controls="filters">
  Toggle filters
</button>
```

*Common Pitfalls: Using `<a href="#">` as a fake button creates broken navigation semantics and often causes keyboard, history, scrolling, and accessibility problems.*

---

### Global Attributes First Pass — `id`, `class`, `lang`, `dir`, `hidden`, `data-*`, `tabindex`, `title`

**Conceptual frame:** Global attributes are accepted on all HTML elements, but “accepted” does not mean “useful everywhere.” MDN describes global attributes as common to all HTML elements, including non-standard elements, though their effects may vary by element. 

| Attribute         | Purpose                              | Good use                                      | Caveat                                                    |
| ----------------- | ------------------------------------ | --------------------------------------------- | --------------------------------------------------------- |
| `id`              | Unique document identifier           | Fragment targets, labels, ARIA references     | Must be unique                                            |
| `class`           | Classification hook                  | CSS and JS grouping                           | Do not encode unstable visual implementation details only |
| `lang`            | Language of element content          | `<span lang="fr">bonjour</span>`              | Use actual language, not user locale blindly              |
| `dir`             | Text direction                       | `dir="rtl"` or `dir="auto"`                   | Important for Arabic, Hebrew, mixed-direction content     |
| `hidden`          | Hide irrelevant content              | Temporarily unavailable panels                | Hidden content is not normally exposed                    |
| `data-*`          | Custom private data                  | `data-product-id="sku_123"`                   | Not for secrets or large state blobs                      |
| `tabindex`        | Focus order/focusability             | `tabindex="-1"` for programmatic focus target | Avoid positive values                                     |
| `title`           | Advisory information                 | Expanding abbreviations in limited cases      | Poor primary accessibility mechanism                      |
| `style`           | Inline CSS                           | Rare dynamic or critical cases                | Hurts maintainability when overused                       |
| `contenteditable` | User-editable content                | Rich-text editor surface                      | Complex accessibility and sanitization concerns           |
| `inert`           | Disable interaction/focus in subtree | Background content behind modal UI            | Requires careful state management                         |
| `popover`         | Designates popover element           | Declarative transient UI                      | Baseline support is modern but older browsers may vary    |

MDN marks the `popover` global attribute as Baseline 2024 and notes that it designates an element as a popover; as with any newer UI primitive, compatibility and partial behavior should be verified for the project’s target browsers and webviews. 

```html
<section lang="en" aria-labelledby="profile-heading">
  <h2 id="profile-heading">Profile</h2>

  <button popovertarget="profile-help" type="button">
    What is this?
  </button>

  <div id="profile-help" popover>
    This information is used to personalize your account experience.
  </div>
</section>
```

*Common Pitfalls: Positive `tabindex` values create unnatural focus order; use document order and native controls instead.*


### Images and Responsive Images Matrix — `img`, `alt`, `picture`, `source`, `srcset`, `sizes`, lazy loading

**Conceptual frame:** Images are content, layout participants, network resources, and accessibility objects. Correct image markup requires deciding whether the image is meaningful, decorative, responsive, art-directed, lazy-loaded, or high priority.

MDN explains that responsive image selection with `srcset` and `sizes` lets browsers consider conditions such as screen size, pixel density, zoom, orientation, and network behavior before choosing an image candidate. 

| Need                   | Markup pattern                  | Use when                               | Caveat                                       |
| ---------------------- | ------------------------------- | -------------------------------------- | -------------------------------------------- |
| Basic meaningful image | `<img src="..." alt="...">`     | Image conveys content                  | `alt` must communicate purpose, not filename |
| Decorative image       | `<img src="..." alt="">`        | Image adds no information              | Usually also avoid focus/interactive role    |
| Responsive resolution  | `srcset` with width descriptors | Same image at multiple widths          | Requires accurate `sizes`                    |
| Art direction          | `picture` + `source media`      | Different crop/composition by viewport | Always include fallback `img`                |
| Modern formats         | `picture` + `source type`       | AVIF/WebP fallback strategy            | Verify encoding quality and fallback         |
| Lazy loading           | `loading="lazy"`                | Below-the-fold images                  | Do not lazy-load likely LCP hero image       |
| Decode hint            | `decoding="async"`              | Non-critical images                    | Browser may treat as hint                    |
| Priority hint          | `fetchpriority="high"`          | Critical hero/LCP image                | Overuse harms prioritization                 |
| Fixed dimensions       | `width` + `height`              | Prevent layout shift                   | Use intrinsic ratio-compatible values        |
| Figure with caption    | `figure` + `figcaption`         | Image needs visible caption            | Caption does not replace `alt`               |

```html
<figure>
  <picture>
    <source
      type="image/avif"
      srcset="
        /assets/dashboard-640.avif 640w,
        /assets/dashboard-1280.avif 1280w
      "
      sizes="(max-width: 700px) 100vw, 700px"
    >
    <source
      type="image/webp"
      srcset="
        /assets/dashboard-640.webp 640w,
        /assets/dashboard-1280.webp 1280w
      "
      sizes="(max-width: 700px) 100vw, 700px"
    >
    <img
      src="/assets/dashboard-1280.jpg"
      srcset="
        /assets/dashboard-640.jpg 640w,
        /assets/dashboard-1280.jpg 1280w
      "
      sizes="(max-width: 700px) 100vw, 700px"
      width="1280"
      height="720"
      alt="Analytics dashboard showing conversion rate, revenue, and active-user charts."
      loading="lazy"
      decoding="async"
    >
  </picture>
  <figcaption>Example analytics dashboard used in the reporting interface.</figcaption>
</figure>
```

| `alt` situation                    | Recommended value                   | Example                                             |
| ---------------------------------- | ----------------------------------- | --------------------------------------------------- |
| Informative image                  | Concise equivalent meaning          | `alt="Quarterly revenue chart showing 18% growth"`  |
| Linked image                       | Link destination/function           | `alt="Download quarterly report"`                   |
| Icon-only button image             | Control purpose                     | `alt="Search"` or better use accessible button text |
| Decorative flourish                | Empty string                        | `alt=""`                                            |
| Image with adjacent duplicate text | Often empty                         | Avoid repeating same text twice                     |
| Complex chart                      | Short `alt` plus nearby explanation | `alt="Revenue chart"` and provide table/summary     |

MDN’s `img` reference states that `alt` provides text replacement for images and is important for accessibility; it is also shown when the image cannot load. 

*Common Pitfalls: Supplying `srcset` without accurate `sizes` causes browsers to choose inefficient resources; writing `alt="image"` or duplicating nearby text creates poor accessible output.*


### Forms Mental Model — `form`, controls, names, values, submission, validation

**Conceptual frame:** HTML forms are not just UI containers. A form defines a **data submission contract**: controls contribute name/value pairs, the browser performs native validation unless bypassed, and submission sends an encoded entry list to a target endpoint. The WHATWG forms section defines `action`, `enctype`, `method`, `name`, `novalidate`, `target`, and `rel` as form-related attributes, and MDN describes `input` as one of the most powerful and complex HTML elements because its behavior depends heavily on type and attributes. 

| Concept               | Meaning                                          | Professional consequence                                               |
| --------------------- | ------------------------------------------------ | ---------------------------------------------------------------------- |
| `form`                | Submission boundary for controls                 | Controls inside it submit together unless associated with another form |
| Successful controls   | Controls whose values are included in submission | Disabled controls and unnamed controls are usually not submitted       |
| `name`                | Submission key for a control                     | Required for server-side data receipt                                  |
| `value`               | Submitted value                                  | User-visible text is not always the submitted value                    |
| `label`               | Accessible/user-visible name for a control       | Prefer explicit `for` + matching `id`                                  |
| Constraint validation | Browser validation before submission             | UX feature, not security                                               |
| `method`              | Submission HTTP method variant                   | Usually `get`, `post`, or `dialog` in relevant contexts                |
| `enctype`             | Encoding of submitted data                       | Required for file upload behavior                                      |
| `autocomplete`        | Autofill meaning hints                           | Important for usability and accessibility                              |
| `form` attribute      | Associates a control with a form by `id`         | Allows controls outside the visual form container                      |

```html
<form action="/account/profile" method="post" autocomplete="on">
  <div>
    <label for="display-name">Display name</label>
    <input
      id="display-name"
      name="displayName"
      type="text"
      autocomplete="name"
      required
      minlength="2"
      maxlength="80"
    >
  </div>

  <div>
    <label for="email">Email address</label>
    <input
      id="email"
      name="email"
      type="email"
      autocomplete="email"
      required
    >
  </div>

  <button type="submit">Save profile</button>
</form>
```

| Element    | Purpose                               | Key attributes                                                        | Caveat                                               |
| ---------- | ------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------- |
| `form`     | Groups submission controls            | `action`, `method`, `enctype`, `autocomplete`, `novalidate`, `target` | Do not nest forms                                    |
| `label`    | Labels form controls                  | `for`                                                                 | Text inside placeholder is not a label               |
| `input`    | Single-line or specialized control    | `type`, `name`, `value`, validation attributes                        | Behavior varies dramatically by `type`               |
| `textarea` | Multi-line text control               | `name`, `rows`, `cols`, `maxlength`                                   | Text value is element content, not `value` attribute |
| `select`   | Option picker                         | `name`, `multiple`, `required`                                        | Placeholder-like option needs careful value handling |
| `option`   | Selectable option                     | `value`, `selected`, `disabled`                                       | Submitted value may differ from visible text         |
| `optgroup` | Groups options                        | `label`, `disabled`                                                   | Useful for long selects                              |
| `button`   | Button control                        | `type`, `name`, `value`, form override attributes                     | Default `type` is `submit` inside forms              |
| `fieldset` | Groups related controls               | `disabled`, `form`, `name`                                            | Useful for radio/checkbox groups                     |
| `legend`   | Caption for `fieldset`                | —                                                                     | Important for grouped control accessibility          |
| `output`   | Calculation/result output             | `for`, `name`                                                         | Not a substitute for server-calculated values        |
| `progress` | Task progress                         | `value`, `max`                                                        | For progress, not generic meters                     |
| `meter`    | Scalar measurement within known range | `min`, `max`, `low`, `high`, `optimum`                                | Not for task progress                                |

*Common Pitfalls: Form controls without `name` may look correct but submit no data; placeholder text is not a durable accessible label.*

---

### Input Type Matrix — `text`, `email`, `url`, `number`, `date`, `file`, `checkbox`, `radio`, hidden

**Conceptual frame:** `input type` controls the browser’s widget, validation behavior, mobile keyboard hints, expected value format, and sometimes UI affordances. Choosing the wrong type creates avoidable validation, accessibility, keyboard, and data-quality problems.

| `type`           | Typical use                         | Native validation / behavior           | Mobile/user-agent effect                 | Professional caveat                                          |
| ---------------- | ----------------------------------- | -------------------------------------- | ---------------------------------------- | ------------------------------------------------------------ |
| `text`           | General single-line text            | None beyond attributes                 | Generic keyboard                         | Use more specific type when semantics are known              |
| `search`         | Search query                        | Text-like                              | Search keyboard/action hints             | Not automatically tied to site search behavior               |
| `email`          | Email address                       | Email syntax check; `multiple` allowed | Email-optimized keyboard                 | Still validate server-side                                   |
| `url`            | URL                                 | URL syntax check                       | URL keyboard                             | Requires absolute-ish valid URL syntax depending UA behavior |
| `tel`            | Telephone number                    | No universal phone validation          | Phone keypad                             | Phone formats are locale-sensitive                           |
| `password`       | Secret text entry                   | Obscured display                       | Password manager integration             | Use `autocomplete` correctly                                 |
| `number`         | Numeric input with spinbox behavior | Numeric constraints                    | Numeric keyboard in many UAs             | Bad for credit cards, ZIP codes, IDs                         |
| `range`          | Approximate numeric slider          | `min`, `max`, `step`                   | Slider UI                                | Poor for precise values unless paired with output            |
| `date`           | Calendar date                       | Date value constraints                 | Date picker where supported              | UI and locale display vary                                   |
| `time`           | Time of day                         | Time constraints                       | Time picker where supported              | Value format differs from displayed locale format            |
| `datetime-local` | Local date/time                     | Local datetime constraints             | Date/time picker where supported         | No timezone information                                      |
| `month`          | Month/year                          | Month constraints                      | Picker where supported                   | Support/display may vary                                     |
| `week`           | ISO week                            | Week constraints                       | Picker where supported                   | Week numbering can confuse users                             |
| `color`          | Color picker                        | Color value                            | Color picker                             | Accessibility and design-system constraints still apply      |
| `file`           | File upload                         | File picker                            | File picker/camera integration sometimes | Requires `multipart/form-data` for normal form upload        |
| `checkbox`       | Boolean or multi-select option      | Checked controls submit value          | Native checkbox                          | Unchecked checkbox submits nothing                           |
| `radio`          | Single choice in named group        | One selected value per group           | Native radio group                       | All group options share same `name`                          |
| `hidden`         | Non-visible submitted value         | Submitted silently                     | Not visible                              | Never trust it for security                                  |
| `submit`         | Submit button                       | Submits form                           | Button                                   | Prefer `button type="submit"` for flexible content           |
| `reset`          | Reset button                        | Resets form controls                   | Button                                   | Often harmful; users can lose work                           |
| `button`         | Generic button                      | No default form action                 | Button                                   | Usually prefer `<button type="button">`                      |

```html
<form action="/billing" method="post">
  <label for="cardholder">Cardholder name</label>
  <input
    id="cardholder"
    name="cardholder"
    type="text"
    autocomplete="cc-name"
    required
  >

  <label for="card-number">Card number</label>
  <input
    id="card-number"
    name="cardNumber"
    type="text"
    inputmode="numeric"
    autocomplete="cc-number"
    pattern="[0-9 ]{12,23}"
    required
  >

  <button type="submit">Continue</button>
</form>
```

**Professional note:** Credit card numbers, postal codes, account IDs, and other numeric-looking identifiers should usually use `type="text"` with `inputmode`, not `type="number"`, because they may contain leading zeros, spaces, fixed lengths, or non-arithmetic semantics.

*Common Pitfalls: Using `type="number"` for identifiers corrupts user expectations because identifiers are not quantities; they should not have spin buttons, exponent notation, or arithmetic semantics.*

---

### Form Control Attributes Matrix — `required`, `pattern`, `min`, `max`, `step`, `maxlength`, `readonly`, `disabled`

**Conceptual frame:** Form attributes express client-side constraints and browser behavior. They improve usability, but every security-sensitive rule must be enforced again on the server or another trusted boundary.

| Attribute        | Applies commonly to       | Purpose                                | Caveat                                                              |
| ---------------- | ------------------------- | -------------------------------------- | ------------------------------------------------------------------- |
| `required`       | Many controls             | Requires non-empty valid value         | Checkbox/radio group behavior needs testing                         |
| `minlength`      | Text-like controls        | Minimum text length                    | User agent validation only                                          |
| `maxlength`      | Text-like controls        | Maximum text length                    | Server must also enforce                                            |
| `pattern`        | Text-like controls        | Regex-like constraint                  | Pattern applies to entire value; UX can be poor without explanation |
| `min`            | Number/date/time/range    | Minimum value                          | Type-dependent parsing                                              |
| `max`            | Number/date/time/range    | Maximum value                          | Type-dependent parsing                                              |
| `step`           | Number/date/time/range    | Allowed increments                     | Default step can surprise for dates/times                           |
| `placeholder`    | Text-like controls        | Example/hint                           | Not a label                                                         |
| `readonly`       | Text-like controls        | Prevent editing while submitting value | Not same as `disabled`                                              |
| `disabled`       | Most controls             | Prevent interaction and submission     | Disabled values are usually not submitted                           |
| `multiple`       | `email`, `file`, `select` | Allow multiple values                  | Server parsing must match                                           |
| `accept`         | `file`                    | Hints acceptable file types            | Not secure validation                                               |
| `capture`        | `file`                    | Hints capture source on devices        | Device behavior varies                                              |
| `checked`        | Checkbox/radio            | Initial selected state                 | Submitted state depends on current UI state                         |
| `selected`       | `option`                  | Initial option state                   | Dynamic state may differ from source                                |
| `autofocus`      | Form/control elements     | Initial focus                          | Can harm navigation and screen-reader flow                          |
| `inputmode`      | Text-like controls        | Virtual keyboard hint                  | Does not enforce validation                                         |
| `enterkeyhint`   | Text-like controls        | Virtual keyboard action label          | Hint only                                                           |
| `form`           | Form-associated controls  | Associate with external form by `id`   | Can make visual structure misleading                                |
| `formaction`     | Submit buttons            | Override form `action`                 | Only for submit buttons/image submit                                |
| `formmethod`     | Submit buttons            | Override form `method`                 | Useful for alternate submit actions                                 |
| `formenctype`    | Submit buttons            | Override form `enctype`                | Useful when one button uploads differently                          |
| `formnovalidate` | Submit buttons            | Bypass validation for that submission  | Useful for “Save draft”                                             |

```html
<form id="article-form" action="/articles" method="post">
  <label for="title">Article title</label>
  <input
    id="title"
    name="title"
    type="text"
    required
    minlength="8"
    maxlength="120"
  >

  <label for="slug">URL slug</label>
  <input
    id="slug"
    name="slug"
    type="text"
    pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
    aria-describedby="slug-hint"
    required
  >
  <p id="slug-hint">Use lowercase letters, numbers, and hyphens only.</p>

  <button type="submit">Publish</button>
  <button type="submit" formaction="/articles/drafts" formnovalidate>
    Save draft
  </button>
</form>
```

*Common Pitfalls: A `pattern` without visible help often creates unexplained validation failure; client-side constraints should guide users, not merely reject them.*

---

### Form Submission Matrix — `method`, `enctype`, `action`, `target`, `novalidate`

**Conceptual frame:** Form submission converts controls into an entry list, encodes it, and sends it to an `action` destination. The `method` and `enctype` combination determines how the browser packages data. The WHATWG form section identifies `enctype` as the entry-list encoding type and `method` as the submission variant. 

| `method` | Data location              | Typical use                           | Caveat                                   |
| -------- | -------------------------- | ------------------------------------- | ---------------------------------------- |
| `get`    | URL query string           | Search, filters, idempotent retrieval | Do not use for secrets or large payloads |
| `post`   | Request body               | Create/update actions, login, uploads | Server must validate CSRF/auth/data      |
| `dialog` | Closes containing `dialog` | Dialog-local form interaction         | Does not submit to network endpoint      |

| `enctype`                           | Works with              | Use case                                  | Caveat                                    |
| ----------------------------------- | ----------------------- | ----------------------------------------- | ----------------------------------------- |
| `application/x-www-form-urlencoded` | Usually `post`; default | Normal forms                              | Spaces and special characters are encoded |
| `multipart/form-data`               | `post`                  | File uploads and mixed binary/text fields | Required for normal file upload forms     |
| `text/plain`                        | `post`                  | Debugging/simple inspection               | Not suitable for production data parsing  |

| Attribute        | Purpose                                    | Example                               | Caveat                                                   |
| ---------------- | ------------------------------------------ | ------------------------------------- | -------------------------------------------------------- |
| `action`         | Submission URL                             | `action="/contact"`                   | Empty or omitted behavior depends on current URL context |
| `target`         | Submission browsing context                | `target="_blank"`                     | Can create security/usability issues                     |
| `novalidate`     | Disable native validation                  | `<form novalidate>`                   | Use only when custom validation is robust                |
| `rel`            | Link-type relationship for form submission | e.g. opener/referrer related contexts | Less common; understand target behavior                  |
| `accept-charset` | Character encodings                        | Rare in modern UTF-8 sites            | UTF-8 is the practical default                           |

```html
<form
  action="/support/tickets"
  method="post"
  enctype="multipart/form-data"
>
  <label for="summary">Issue summary</label>
  <input id="summary" name="summary" type="text" required maxlength="140">

  <label for="attachment">Attachment</label>
  <input
    id="attachment"
    name="attachment"
    type="file"
    accept="image/png,image/jpeg,application/pdf"
  >

  <button type="submit">Create ticket</button>
</form>
```

*Common Pitfalls: File inputs in ordinary form submissions require `method="post"` and `enctype="multipart/form-data"`; `accept` is only a picker hint, not a security filter.*

---

### Autocomplete and Autofill Matrix — `autocomplete`, identity, address, payment, one-time-code

**Conceptual frame:** `autocomplete` describes what a value represents, not merely whether autofill is enabled. The HTML Standard describes `autocomplete` as indicating what the user-entered value actually represents; MDN similarly states that it helps browsers understand expected information and provide autofill assistance. 

| Value / pattern    | Use case                  | Example field   | Caveat                                               |
| ------------------ | ------------------------- | --------------- | ---------------------------------------------------- |
| `name`             | Full name                 | Profile form    | Use specific tokens when needed                      |
| `given-name`       | First/given name          | Registration    | Avoid culturally rigid assumptions                   |
| `family-name`      | Family name               | Registration    | Naming conventions vary globally                     |
| `email`            | Email address             | Login/contact   | Use with `type="email"`                              |
| `username`         | Account username          | Login           | Often paired with password manager behavior          |
| `current-password` | Existing password         | Login           | Helps password managers                              |
| `new-password`     | New password              | Signup/reset    | Helps generated password workflows                   |
| `one-time-code`    | OTP/security code         | MFA             | Usually paired with `inputmode="numeric"`            |
| `organization`     | Company/org name          | Billing/contact | Useful for B2B forms                                 |
| `street-address`   | Multi-line street address | Checkout        | Use address-level tokens for granular forms          |
| `address-line1`    | First address line        | Checkout        | Regional forms vary                                  |
| `address-level1`   | State/province/region     | Checkout        | Locale-dependent meaning                             |
| `postal-code`      | Postal/ZIP code           | Checkout        | Use text input, not number                           |
| `country`          | Country code/name         | Checkout        | Often better as select/autocomplete combo            |
| `cc-name`          | Cardholder name           | Payment         | Payment security rules still apply                   |
| `cc-number`        | Card number               | Payment         | Use `type="text"` plus `inputmode`                   |
| `cc-exp`           | Expiration                | Payment         | Consider split fields only if processor expects them |
| `tel`              | Telephone number          | Contact         | Pair with `type="tel"`                               |

```html
<form action="/login" method="post">
  <label for="login-email">Email</label>
  <input
    id="login-email"
    name="email"
    type="email"
    autocomplete="username"
    required
  >

  <label for="login-password">Password</label>
  <input
    id="login-password"
    name="password"
    type="password"
    autocomplete="current-password"
    required
  >

  <button type="submit">Sign in</button>
</form>
```

*Common Pitfalls: Disabling autocomplete on login and payment flows often harms password managers, accessibility, and conversion without providing real security.*

---

### Accessible Form Structure — `label`, `fieldset`, `legend`, help text, errors

**Conceptual frame:** A professional form must expose names, grouping, descriptions, errors, and state clearly to both visual and non-visual users. Native labels and grouping should come before ARIA.

| Need                | Preferred HTML                    | Example                                    | Caveat                                         |
| ------------------- | --------------------------------- | ------------------------------------------ | ---------------------------------------------- |
| Control name        | `label for` + control `id`        | `<label for="email">Email</label>`         | Placeholder is not enough                      |
| Group name          | `fieldset` + `legend`             | Shipping method radio group                | Especially important for radio/checkbox groups |
| Help text           | Visible text + `aria-describedby` | Password rules                             | Keep it concise and near the field             |
| Required indication | `required` plus visible cue       | “Email required”                           | Do not rely only on color or asterisk          |
| Error message       | Visible error + associated field  | `aria-describedby` or live region patterns | Avoid announcing too much                      |
| Submit action       | Explicit submit button            | `<button type="submit">Save</button>`      | Avoid ambiguous button text                    |
| Optional field      | Visible “optional” cue            | Label text                                 | Do not mark every required field only          |

```html
<form action="/newsletter" method="post">
  <fieldset>
    <legend>Email preferences</legend>

    <div>
      <input id="weekly" name="frequency" type="radio" value="weekly" required>
      <label for="weekly">Weekly digest</label>
    </div>

    <div>
      <input id="monthly" name="frequency" type="radio" value="monthly">
      <label for="monthly">Monthly digest</label>
    </div>
  </fieldset>

  <div>
    <label for="newsletter-email">Email address <span aria-hidden="true">*</span></label>
    <input
      id="newsletter-email"
      name="email"
      type="email"
      autocomplete="email"
      aria-describedby="newsletter-email-help"
      required
    >
    <p id="newsletter-email-help">Use an address where you can receive subscription updates.</p>
  </div>

  <button type="submit">Subscribe</button>
</form>
```

*Common Pitfalls: Radio buttons and checkboxes without `fieldset`/`legend` can leave users unable to understand the question that the options answer.*

---

### Tables Mental Model — `table`, relationships, headers, captions, data only

**Conceptual frame:** HTML tables are for **data relationships**, not page layout. A correct table encodes relationships between data cells and header cells so browsers and assistive technologies can navigate the grid. MDN’s table accessibility guidance emphasizes `scope` and `headers`; the WHATWG table model defines `th`, `colspan`, `rowspan`, `headers`, and `scope` as participating in header/data relationships. 

| Element    | Purpose                 | Professional use                         |
| ---------- | ----------------------- | ---------------------------------------- |
| `table`    | Data table container    | Use only for tabular data                |
| `caption`  | Table title/description | First child of `table`; improves context |
| `thead`    | Header row group        | Column headers                           |
| `tbody`    | Body row group          | Main data rows                           |
| `tfoot`    | Footer row group        | Totals, summaries                        |
| `tr`       | Table row               | Contains cells                           |
| `th`       | Header cell             | Use `scope` for simple tables            |
| `td`       | Data cell               | Use for ordinary data                    |
| `colgroup` | Column grouping         | Styling/semantic grouping of columns     |
| `col`      | Column definition       | Column-level styling/metadata            |

```html
<table>
  <caption>Quarterly support ticket volume by severity</caption>
  <thead>
    <tr>
      <th scope="col">Quarter</th>
      <th scope="col">Low</th>
      <th scope="col">Medium</th>
      <th scope="col">High</th>
      <th scope="col">Critical</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Q1 2026</th>
      <td>312</td>
      <td>104</td>
      <td>31</td>
      <td>6</td>
    </tr>
    <tr>
      <th scope="row">Q2 2026</th>
      <td>287</td>
      <td>98</td>
      <td>26</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
```

| Situation                     | Preferred header technique        | Example                      |
| ----------------------------- | --------------------------------- | ---------------------------- |
| Simple column headers         | `th scope="col"`                  | Header row at top            |
| Simple row headers            | `th scope="row"`                  | First cell names row         |
| Column groups                 | `scope="colgroup"`                | Multi-column grouped header  |
| Row groups                    | `scope="rowgroup"`                | Grouped sections             |
| Complex irregular headers     | `id` on `th` + `headers` on cells | Financial/statistical tables |
| Visual-only table-like layout | CSS Grid/Flexbox, not `table`     | Cards, pricing layouts       |

*Common Pitfalls: Tables used for layout create incorrect reading order and semantics; data tables without `caption` and header associations are hard to navigate non-visually.*

---

### Advanced Table Header Matrix — `scope`, `headers`, `id`, `colspan`, `rowspan`

**Conceptual frame:** Simple tables should usually use `scope`. Complex tables may need explicit `id`/`headers` mapping. Do not overcomplicate simple tables; do not under-specify complex ones.

| Attribute          | Applies to | Purpose                        | Use when                        |
| ------------------ | ---------- | ------------------------------ | ------------------------------- |
| `scope="col"`      | `th`       | Header applies to column       | Simple column header            |
| `scope="row"`      | `th`       | Header applies to row          | Simple row header               |
| `scope="colgroup"` | `th`       | Header applies to column group | Grouped column headings         |
| `scope="rowgroup"` | `th`       | Header applies to row group    | Grouped row headings            |
| `headers`          | `td`, `th` | References header-cell IDs     | Complex multi-level tables      |
| `id`               | `th`       | Target for `headers`           | Complex header relationships    |
| `colspan`          | `td`, `th` | Cell spans columns             | Grouped headings or merged data |
| `rowspan`          | `td`, `th` | Cell spans rows                | Grouped headings or merged data |
| `abbr`             | `th`       | Abbreviated header label       | Long headers in dense tables    |

```html
<table>
  <caption>Regional revenue by product line</caption>
  <thead>
    <tr>
      <th id="region" rowspan="2">Region</th>
      <th id="software" colspan="2">Software</th>
      <th id="services" colspan="2">Services</th>
    </tr>
    <tr>
      <th id="software-new">New</th>
      <th id="software-renewal">Renewal</th>
      <th id="services-consulting">Consulting</th>
      <th id="services-support">Support</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="apac" headers="region" scope="row">APAC</th>
      <td headers="apac software software-new">$1.2M</td>
      <td headers="apac software software-renewal">$2.8M</td>
      <td headers="apac services services-consulting">$900K</td>
      <td headers="apac services services-support">$1.1M</td>
    </tr>
  </tbody>
</table>
```

*Common Pitfalls: Overusing merged cells makes tables harder to parse, style, export, and navigate; prefer simpler table structures when possible.*

---

### Native Interactive Elements — `button`, `details`, `summary`, `dialog`, `popover`

**Conceptual frame:** Native interactive elements provide built-in semantics, keyboard behavior, focus behavior, and platform integration. Use them before creating custom JavaScript widgets. MDN describes `dialog` as representing modal or non-modal dialog boxes and notes broad availability since 2022, while the `popover` global attribute is marked Baseline 2024 and may not work in older browsers or devices. 

| Element / feature      | Purpose                       | Use case                                 | Caveat                                     |
| ---------------------- | ----------------------------- | ---------------------------------------- | ------------------------------------------ |
| `button`               | User action                   | Submit, open, close, toggle              | Set `type`; default inside forms is submit |
| `details`              | Disclosure widget             | Expandable FAQ/details panel             | First `summary` is label                   |
| `summary`              | Disclosure label              | Heading-like label for `details`         | Must be meaningful                         |
| `dialog`               | Modal or non-modal dialog     | Confirmation, focused task, modal form   | Requires JS methods for modal workflows    |
| `form method="dialog"` | Dialog-local form closing     | Confirm/cancel buttons in dialog         | Does not submit to server                  |
| `popover`              | Declarative non-modal popover | Tooltips-like panels, menus, teaching UI | Newer feature; compatibility review needed |
| `popovertarget`        | Declarative popover trigger   | Button opens associated popover          | Target must reference popover element `id` |
| `popovertargetaction`  | Popover action                | `show`, `hide`, `toggle`                 | Behavior should match user expectations    |

```html
<details>
  <summary>What data is exported?</summary>
  <p>The export includes profile fields, billing metadata, and audit timestamps.</p>
</details>
```

```html
<button type="button" popovertarget="export-help">
  Explain export
</button>

<div id="export-help" popover>
  Exports are generated asynchronously and expire after 24 hours.
</div>
```

```html
<dialog id="confirm-delete">
  <form method="dialog">
    <h2>Delete project?</h2>
    <p>This removes the project from the active workspace.</p>

    <button value="cancel">Cancel</button>
    <button value="confirm">Delete</button>
  </form>
</dialog>

<button type="button" id="open-delete-dialog">
  Delete project
</button>

<script>
  const dialog = document.querySelector("#confirm-delete");
  const openButton = document.querySelector("#open-delete-dialog");

  openButton.addEventListener("click", () => {
    dialog.showModal();
  });
</script>
```

| Need                      | Prefer                    | Avoid                                                |
| ------------------------- | ------------------------- | ---------------------------------------------------- |
| Navigate somewhere        | `a href="..."`            | `button` with JS navigation unless necessary         |
| Submit a form             | `button type="submit"`    | Click handler that manually serializes basic forms   |
| Generic action            | `button type="button"`    | `div role="button"` unless unavoidable               |
| Expand/collapse content   | `details`/`summary`       | Custom disclosure without keyboard handling          |
| Modal task                | `dialog.showModal()`      | Absolute-positioned `div` without focus management   |
| Non-modal transient panel | `popover` where supported | Custom popover without escape/light-dismiss behavior |

*Common Pitfalls: A `div` with `onclick` is not a button; it lacks native keyboard activation, disabled behavior, form semantics, and default accessibility guarantees.*

---

### Dialog, Details, and Popover Boundary Matrix — modal, non-modal, disclosure

**Conceptual frame:** `details`, `dialog`, and `popover` overlap superficially, but they express different interaction models. Choose based on whether the content is persistent disclosure, a modal decision/task, or a transient non-modal layer. MDN’s Popover API guidance distinguishes popovers as non-modal and points to `dialog` for modal behavior. 

| Requirement                        | Best fit                                      | Why                                     | Caveat                                       |
| ---------------------------------- | --------------------------------------------- | --------------------------------------- | -------------------------------------------- |
| Expand/collapse inline explanation | `details`                                     | Native disclosure semantics             | Not suitable for modal content               |
| FAQ item                           | `details`                                     | Compact, keyboard-operable disclosure   | Styling marker can require CSS care          |
| Confirmation modal                 | `dialog.showModal()`                          | Modal semantics and top-layer behavior  | Manage initial focus and close behavior      |
| Non-modal inspector panel          | `dialog.show()` or popover depending behavior | Allows interaction outside if non-modal | Test focus and escape behavior               |
| Small transient help panel         | `popover`                                     | Declarative show/hide and top layer     | Not modal                                    |
| Menu-like transient content        | Popover plus correct semantics/JS if needed   | Layering is handled natively            | Popover alone is not a complete menu pattern |
| Tooltip for critical info          | Usually visible text or disclosure            | Tooltips can be inaccessible            | Do not hide essential instructions           |

```html
<section>
  <h2>Export settings</h2>

  <details>
    <summary>Advanced compression options</summary>
    <p>Compression reduces file size but may increase export generation time.</p>
  </details>

  <button type="button" popovertarget="retention-help">
    Retention policy help
  </button>
  <aside id="retention-help" popover>
    Retention controls how long generated export files remain available.
  </aside>
</section>
```

*Common Pitfalls: Using popovers for modal workflows can leave background content interactive when the user should be forced to complete or dismiss a focused task.*

### Embedded Content Model — `img`, `picture`, `iframe`, `embed`, `object`, `canvas`, `svg`

**Conceptual frame:** Embedded content imports another resource, rendering context, document, or media surface into the HTML document. These elements often cross boundaries: network, origin, accessibility tree, media pipeline, graphics pipeline, or permission boundary.

| Element   | Purpose                                   | Typical use                                 | Accessibility requirement                                | Security/performance caveat                                              |
| --------- | ----------------------------------------- | ------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------ |
| `img`     | Raster/vector image resource              | Content image, icon, diagram                | Meaningful `alt` or empty `alt=""` for decorative images | Set `width`/`height`; optimize format and size                           |
| `picture` | Responsive/art-directed image wrapper     | Format fallback, viewport-specific crop     | Accessibility still belongs to fallback `img`            | `source` ordering matters                                                |
| `source`  | Candidate media/image source              | `picture`, `audio`, `video`                 | No independent accessible name                           | Use correct `type`, `media`, `srcset`                                    |
| `iframe`  | Nested browsing context/content navigable | Third-party app, map, video, sandboxed page | Provide `title`                                          | Needs `sandbox`, `allow`, `referrerpolicy` review                        |
| `embed`   | External resource/plugin-like embed       | Legacy/simple embedded content              | Often weak accessibility                                 | Prefer `iframe`, `img`, `video`, or `object` when semantically clearer   |
| `object`  | External resource with fallback content   | PDFs, legacy content, fallback-rich embed   | Include fallback content                                 | Complex behavior; validate MIME assumptions                              |
| `canvas`  | Script-driven bitmap drawing surface      | Charts, games, visualizations               | Provide fallback or accessible alternative               | Drawing is invisible to accessibility tree unless represented separately |
| `svg`     | Inline vector markup                      | Icons, diagrams, illustrations              | Use `title`, `desc`, or accessible hiding as appropriate | Inline SVG can contain script/style interactions                         |
| `math`    | MathML                                    | Mathematical notation                       | Use semantic math where supported                        | Compatibility and rendering vary by feature                              |

The HTML Standard describes `iframe` as representing its *content navigable*, with `src` specifying the URL to contain in that nested context; the same section defines `srcdoc`, navigation behavior, `sandbox`, `allow`, and related security-sensitive attributes. 

```html id="w7ex1h"
<figure>
  <svg
    role="img"
    aria-labelledby="chart-title chart-desc"
    viewBox="0 0 400 160"
    width="400"
    height="160"
  >
    <title id="chart-title">Monthly usage trend</title>
    <desc id="chart-desc">Line chart showing steady usage growth over four months.</desc>
    <!-- SVG paths omitted for brevity. -->
  </svg>
  <figcaption>Usage increased steadily during the migration period.</figcaption>
</figure>
```

*Common Pitfalls: Embedded visual content frequently lacks a usable text alternative; if the information is important, provide equivalent text, a caption, a data table, or accessible SVG semantics.*

---

### Audio and Video Matrix — `audio`, `video`, `source`, `track`, captions, preload

**Conceptual frame:** Media elements are native browser players. Professional usage requires format fallback, captions/subtitles, preload control, poster images, dimensions, and autoplay restraint.

| Element / attribute  | Applies to                  | Purpose                                               | Professional caveat                                             |
| -------------------- | --------------------------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| `audio`              | Audio player                | Native audio playback                                 | Provide transcript for important spoken content                 |
| `video`              | Video player                | Native video playback                                 | Provide captions and dimensions                                 |
| `source`             | `audio`, `video`, `picture` | Multiple candidate sources                            | Browser chooses first supported candidate                       |
| `track`              | `audio`, `video`            | Captions, subtitles, descriptions, chapters, metadata | `kind`, `srclang`, and `label` matter                           |
| `controls`           | `audio`, `video`            | Show native controls                                  | Prefer native controls unless custom player is fully accessible |
| `preload="none"`     | `audio`, `video`            | Avoid eager media load                                | Good for non-critical media                                     |
| `preload="metadata"` | `audio`, `video`            | Load metadata only                                    | Useful for duration/dimensions                                  |
| `preload="auto"`     | `audio`, `video`            | Hint full preload                                     | Can waste bandwidth                                             |
| `poster`             | `video`                     | Placeholder image before playback                     | Needs correct dimensions and meaningful design                  |
| `muted`              | `video`, `audio`            | Start muted                                           | Often required for autoplay policies                            |
| `autoplay`           | `audio`, `video`            | Start automatically                                   | Usually blocked unless muted; can harm UX                       |
| `playsinline`        | `video`                     | Avoid forced fullscreen on mobile                     | Important for inline mobile video                               |
| `loop`               | `audio`, `video`            | Repeat playback                                       | Avoid for disruptive media                                      |

```html id="8s8qhq"
<figure>
  <video
    controls
    preload="metadata"
    poster="/assets/demo-poster.jpg"
    width="1280"
    height="720"
  >
    <source src="/assets/product-demo.webm" type="video/webm">
    <source src="/assets/product-demo.mp4" type="video/mp4">

    <track
      kind="captions"
      src="/assets/product-demo.en.vtt"
      srclang="en"
      label="English captions"
      default
    >

    <p>
      Your browser does not support embedded video.
      <a href="/assets/product-demo.mp4">Download the video</a>.
    </p>
  </video>
  <figcaption>Product workflow demonstration with captions.</figcaption>
</figure>
```

| `track kind`   | Meaning                                            | Use case                    |
| -------------- | -------------------------------------------------- | --------------------------- |
| `captions`     | Transcription plus sound effects for same language | Deaf/hard-of-hearing access |
| `subtitles`    | Translation or transcription for another language  | Localization                |
| `descriptions` | Audio descriptions of visual content               | Blind/low-vision access     |
| `chapters`     | Navigation points                                  | Long instructional videos   |
| `metadata`     | Machine-readable timed metadata                    | Custom scripting            |

*Common Pitfalls: Shipping video without captions or transcript excludes users and often violates accessibility requirements; using `autoplay` for non-essential media creates avoidable usability and performance problems.*

---

### Iframe Reference Matrix — `iframe`, `src`, `srcdoc`, `title`, `loading`, `referrerpolicy`

**Conceptual frame:** An `iframe` embeds another navigable document. This makes it powerful and risky: it can load third-party code, create nested browsing contexts, request permissions, affect page load, and complicate focus/navigation.

| Attribute          | Purpose                                               | Example                                            | Caveat                                             |
| ------------------ | ----------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `src`              | URL of embedded document                              | `src="https://player.example/video"`               | Validate trust and origin                          |
| `srcdoc`           | Inline HTML document source                           | `srcdoc="<p>Preview</p>"`                          | Escape carefully; treat as document content        |
| `title`            | Accessible label for iframe                           | `title="Map showing office location"`              | Required for meaningful assistive navigation       |
| `name`             | Names navigable target                                | `name="preview-frame"`                             | Can be targeted by links/forms                     |
| `width` / `height` | Dimension hints                                       | `width="640" height="360"`                         | Use CSS for responsive behavior but preserve ratio |
| `loading="lazy"`   | Lazy-load offscreen iframe                            | `loading="lazy"`                                   | Do not lazy-load critical above-fold content       |
| `referrerpolicy`   | Controls referrer sent by iframe fetch                | `referrerpolicy="strict-origin-when-cross-origin"` | Must match privacy/security policy                 |
| `sandbox`          | Applies restrictions                                  | `sandbox="allow-scripts"`                          | Start restrictive; add tokens intentionally        |
| `allow`            | Permissions Policy for iframe                         | `allow="fullscreen; clipboard-write"`              | Cannot grant what parent is not allowed to use     |
| `allowfullscreen`  | Legacy/convenience fullscreen permission              | `allowfullscreen`                                  | Prefer understanding `allow` and policy behavior   |
| `credentialless`   | Load iframe in credentialless context where supported | `credentialless`                                   | Newer, specialized privacy/isolation behavior      |

```html id="4p7n6f"
<iframe
  title="Product onboarding video"
  src="https://video.example.com/embed/onboarding"
  width="1280"
  height="720"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  sandbox="allow-scripts allow-same-origin allow-presentation"
  allow="fullscreen; picture-in-picture"
  allowfullscreen
>
</iframe>
```

The HTML Standard states that `sandbox`, when specified, enables extra restrictions on content hosted by an `iframe`; it also notes that changing or removing `sandbox` dynamically is ill-advised because it makes allowed behavior difficult to reason about. 

*Common Pitfalls: Embedding third-party content without `title`, `sandbox`, `allow`, and `referrerpolicy` review creates accessibility, privacy, and security risk.*

---

### Iframe Sandbox Matrix — `sandbox`, restrictions, allow tokens

**Conceptual frame:** `sandbox` starts by restricting many capabilities, then selectively restores capabilities through tokens. This is safer than embedding trusted-by-default documents. For untrusted or semi-trusted embeds, start with empty `sandbox` and add only what is required.

| `sandbox` token                           | Restores / allows                     | Use case                                         | Risk                                                             |
| ----------------------------------------- | ------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| Empty `sandbox`                           | Strong restrictions                   | Untrusted static preview                         | Many features disabled                                           |
| `allow-scripts`                           | Script execution                      | Interactive embed                                | Scripts can attack within granted limits                         |
| `allow-same-origin`                       | Preserve same-origin treatment        | Same-origin app embed needing storage/API access | Dangerous with `allow-scripts` for same-origin untrusted content |
| `allow-forms`                             | Form submission                       | Embedded form                                    | Data exfiltration / unwanted submission                          |
| `allow-popups`                            | Popups                                | OAuth/payment/help windows                       | Popup abuse                                                      |
| `allow-popups-to-escape-sandbox`          | Popups not sandboxed                  | Ads/OAuth flows                                  | Escapes restrictions                                             |
| `allow-modals`                            | Modal dialogs                         | Legacy alert/print flows                         | Disruptive UI                                                    |
| `allow-downloads`                         | Downloads                             | File export embed                                | Drive-by download risk                                           |
| `allow-presentation`                      | Presentation sessions                 | Video casting/presentation                       | Device/privacy consideration                                     |
| `allow-top-navigation`                    | Top-level navigation                  | Rare trusted embeds                              | Clickjacking/navigation abuse                                    |
| `allow-top-navigation-by-user-activation` | Top navigation only after user action | Payment/auth redirect flows                      | Still navigates parent                                           |
| `allow-storage-access-by-user-activation` | Storage Access API after activation   | Third-party auth/content                         | Privacy-sensitive                                                |

| Embed trust level                 | Suggested posture                                                               |
| --------------------------------- | ------------------------------------------------------------------------------- |
| Fully same-origin, controlled app | Maybe no sandbox, or narrow sandbox if isolating risky feature                  |
| Trusted third-party video         | Sandbox plus minimal scripts/presentation/fullscreen permissions                |
| User-generated HTML preview       | Empty or highly restricted sandbox; avoid `allow-same-origin` + `allow-scripts` |
| Ad/analytics widget               | Sandbox and permissions policy review                                           |
| Payment/auth provider             | Minimal tokens required by provider; test redirect/popup flow                   |
| Internal admin tool               | Avoid iframe unless isolation is useful; review same-origin risks               |

```html id="hjna83"
<iframe
  title="User-generated HTML preview"
  src="/preview/sandboxed/123"
  sandbox=""
  referrerpolicy="no-referrer"
  width="800"
  height="450"
></iframe>
```

```html id="aq2bvl"
<iframe
  title="Trusted payment provider"
  src="https://payments.example/checkout/session_abc"
  sandbox="allow-forms allow-scripts allow-popups allow-top-navigation-by-user-activation"
  referrerpolicy="strict-origin-when-cross-origin"
  allow="payment"
  width="420"
  height="720"
></iframe>
```

*Common Pitfalls: Combining `allow-scripts` and `allow-same-origin` on untrusted same-origin content can effectively remove much of the sandbox’s protective value.*

---

### Iframe Permissions Policy Matrix — `allow`, `allowfullscreen`, feature delegation

**Conceptual frame:** The `allow` attribute controls which policy-controlled browser features may be used by the iframe. It is not a universal permission grant. The parent page and browser policy still constrain what can happen. The HTML Standard states that `allow` determines the container policy used when permissions policy for the iframe document is initialized, and that `allow`/`allowfullscreen` cannot grant a feature if the parent document itself is not already allowed to use it. 

| Feature need       | `allow` pattern                                | Typical use                   | Caveat                                        |
| ------------------ | ---------------------------------------------- | ----------------------------- | --------------------------------------------- |
| Fullscreen video   | `allow="fullscreen"` plus/or `allowfullscreen` | Video players, presentations  | Also needs user/browser support               |
| Clipboard write    | `allow="clipboard-write"`                      | Embedded editor               | Privacy/user activation constraints may apply |
| Camera             | `allow="camera"`                               | Video calls, document capture | Highly privacy-sensitive                      |
| Microphone         | `allow="microphone"`                           | Calls, recording              | Highly privacy-sensitive                      |
| Geolocation        | `allow="geolocation"`                          | Map/location widgets          | Avoid unless essential                        |
| Payment            | `allow="payment"`                              | Payment providers             | Requires secure context and browser support   |
| Picture-in-picture | `allow="picture-in-picture"`                   | Video players                 | Browser behavior varies                       |
| Autoplay           | `allow="autoplay"`                             | Muted/controlled media        | Avoid surprising playback                     |

```html id="pn63rh"
<iframe
  title="Embedded support chat"
  src="https://support.example.com/chat"
  sandbox="allow-scripts allow-forms allow-popups"
  allow="clipboard-write"
  referrerpolicy="strict-origin-when-cross-origin"
  width="360"
  height="640"
></iframe>
```

*Common Pitfalls: Adding broad `allow` permissions “just in case” increases privacy and security exposure; delegate only the features the embedded document actually needs.*

---

### Template and Inert Markup — `template`, document fragments, cloning

**Conceptual frame:** `template` stores inert markup. Its contents are not rendered when the page loads; scripts can clone and insert the content later. This is useful for component templates, repeated UI fragments, and progressive enhancement.

| Feature                  | Meaning                              | Use case                          | Caveat                                          |
| ------------------------ | ------------------------------------ | --------------------------------- | ----------------------------------------------- |
| `template`               | Inert HTML subtree                   | Reusable card/row/modal structure | Content is not visible or active until cloned   |
| `template.content`       | `DocumentFragment`                   | JavaScript cloning                | IDs inside cloned templates must be managed     |
| Declarative placeholder  | HTML structure before JS enhancement | Components, list items            | Do not hide essential content only in templates |
| Server-rendered fallback | Visible fallback outside template    | Progressive enhancement           | Keep baseline content usable                    |

```html id="a9f5mx"
<template id="notification-template">
  <article class="notification" data-notification>
    <h2 data-title></h2>
    <p data-message></p>
    <button type="button" data-dismiss>Dismiss</button>
  </article>
</template>

<script type="module">
  const template = document.querySelector("#notification-template");

  export function createNotification({ title, message }) {
    const fragment = template.content.cloneNode(true);

    fragment.querySelector("[data-title]").textContent = title;
    fragment.querySelector("[data-message]").textContent = message;

    return fragment;
  }
</script>
```

*Common Pitfalls: Cloning template content that contains fixed `id` values can create duplicate IDs and break labels, ARIA references, fragment links, and scripts.*

---

### Custom Elements and Web Component Boundaries — `template`, `slot`, custom element names

**Conceptual frame:** HTML supports Web Component architecture, but HTML alone does not define a component’s lifecycle, styling isolation, or behavior. Custom elements require JavaScript registration. Markup conventions still matter because unresolved custom elements are parsed as elements but have no custom behavior until upgraded.

| Primitive           | Purpose                           | Example                      | Caveat                                         |
| ------------------- | --------------------------------- | ---------------------------- | ---------------------------------------------- |
| Custom element name | Defines custom tag with hyphen    | `<user-card>`                | Hyphen required for valid custom element names |
| `slot`              | Placeholder for light DOM content | `<slot name="title"></slot>` | Slotting works with Shadow DOM                 |
| `template`          | Reusable inert markup             | Component shadow template    | Needs JS to clone/attach                       |
| Light DOM           | Children supplied by page author  | `<user-card>...</user-card>` | Still part of outer document                   |
| Shadow DOM          | Encapsulated DOM subtree          | Created by JS                | Requires separate styling/accessibility care   |
| Attributes          | Declarative configuration         | `<user-card user-id="42">`   | Attribute/property reflection needs JS         |
| `data-*`            | Private hooks/config              | `data-user-id="42"`          | Not a public component API by default          |

```html id="77ji0q"
<user-card user-id="42">
  <span slot="name">Ada Lovelace</span>
  <span slot="role">Research Engineer</span>
</user-card>

<template id="user-card-template">
  <article class="user-card">
    <h2><slot name="name">Unnamed user</slot></h2>
    <p><slot name="role">No role provided</slot></p>
  </article>
</template>
```

**Professional boundary:** a short HTML guide should cover how `template`, `slot`, and custom-element markup are structured. Full custom elements require a separate guide covering `customElements.define`, lifecycle callbacks, Shadow DOM, form-associated custom elements, styling, testing, and accessibility.

*Common Pitfalls: Treating custom elements as automatically accessible native controls is wrong; custom semantics, keyboard behavior, form behavior, and accessible names still require deliberate implementation.*

---

### Script Element Matrix — `script`, classic scripts, modules, `async`, `defer`, data blocks

**Conceptual frame:** `script` is both a code-loading primitive and a parser/performance control. The loading attributes determine whether HTML parsing is blocked, whether execution order is preserved, and when code runs relative to document parsing.

MDN states that scripts are not render-blocking by default; a classic `script` without `type="module"`, `async`, or `defer` blocks parsing rather than rendering, and only `script` elements in `head` can possibly block rendering. 

| Pattern                                              | Parsing behavior                               | Execution order                                               | Typical use                          | Caveat                                         |
| ---------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------- | ------------------------------------ | ---------------------------------------------- |
| `<script src="app.js"></script>`                     | Parser-blocking classic script                 | In document order                                             | Rare critical inline/bootstrap cases | Delays parsing                                 |
| `<script src="app.js" defer></script>`               | Does not block parsing                         | Preserves order; runs after parsing before `DOMContentLoaded` | Default for many classic scripts     | External classic scripts only                  |
| `<script src="analytics.js" async></script>`         | Does not block parsing while fetching          | Executes when ready; order not guaranteed                     | Independent analytics/ads            | Can race with DOM/dependencies                 |
| `<script type="module" src="app.js"></script>`       | Module behavior; deferred by default           | Module graph evaluation                                       | Modern app code                      | CORS/module semantics apply                    |
| `<script type="module" async src="app.js"></script>` | Async module                                   | Executes when module graph ready                              | Independent modules                  | Ordering not guaranteed                        |
| `<script nomodule src="legacy.js"></script>`         | Legacy fallback                                | Classic behavior                                              | Older browser fallback               | Usually unnecessary for evergreen-only targets |
| `<script type="application/ld+json">`                | Data block, not JS execution                   | Not executed as JS                                            | Structured data                      | Must contain valid JSON-LD                     |
| Inline script                                        | Immediate inline execution depending placement | Position-dependent                                            | Small bootstrap/config               | CSP and XSS risk                               |

```html id="8q9t7o"
<head>
  <link rel="stylesheet" href="/assets/app.css">

  <!-- Independent script: execution order does not matter. -->
  <script src="/assets/analytics.js" async></script>

  <!-- Main application module: deferred by default. -->
  <script type="module" src="/assets/app.js"></script>

  <!-- Structured data: data block, not executable JavaScript. -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "HTML Script Loading Patterns"
    }
  </script>
</head>
```

| Attribute        | Applies to                   | Purpose                                                    | Caveat                                    |
| ---------------- | ---------------------------- | ---------------------------------------------------------- | ----------------------------------------- |
| `src`            | External script              | Load external code                                         | Relative to document/base URL             |
| `type="module"`  | Module script                | ES modules                                                 | Strict mode, module graph, CORS behavior  |
| `async`          | Classic/module scripts       | Execute as soon as ready                                   | Order not guaranteed                      |
| `defer`          | External classic scripts     | Execute after parsing in order                             | Ignored/not meaningful for inline scripts |
| `crossorigin`    | External scripts             | Better error reporting/CORS mode                           | Server must send compatible CORS headers  |
| `integrity`      | External scripts             | Subresource Integrity hash                                 | Requires exact resource hash              |
| `referrerpolicy` | External scripts             | Referrer behavior                                          | Match privacy policy                      |
| `fetchpriority`  | External scripts             | Fetch priority hint                                        | Use sparingly                             |
| `blocking`       | Scripts in specific contexts | Explicitly block operations such as render where supported | Specialized; avoid casual use             |
| `nomodule`       | Classic fallback             | Legacy browser fallback                                    | Not central for evergreen-only targets    |

*Common Pitfalls: Using `async` for scripts with dependencies causes race conditions; use `defer` or modules when execution order matters.*

---

### Script Loading Decision Matrix — blocking, `defer`, `async`, modules

**Conceptual frame:** Pick a script-loading strategy according to dependency and timing needs, not habit.

| Need                                      | Recommended pattern                                 | Reason                                            |
| ----------------------------------------- | --------------------------------------------------- | ------------------------------------------------- |
| Main modern application                   | `<script type="module" src="/app.js"></script>`     | Module scripts are modern and deferred by default |
| Legacy classic bundle with DOM dependency | `<script src="/app.js" defer></script>`             | Avoids parser blocking and preserves order        |
| Independent analytics                     | `<script src="/analytics.js" async></script>`       | Does not need order or DOM dependency             |
| Critical tiny inline setup                | Inline script near use site or early in `head`      | Avoid network round trip                          |
| Structured data                           | `<script type="application/ld+json">`               | Data block for parsers                            |
| Third-party widget                        | `async` if independent; sandbox iframe if untrusted | Prevents blocking and isolates risk               |
| Multiple ordered classic scripts          | Multiple `defer` scripts in order                   | Preserves execution order after parse             |
| Hydration bootstrapping                   | Module script plus server-rendered HTML             | Keeps semantic baseline                           |

```html id="h6ckgi"
<!-- Ordered classic scripts. -->
<script src="/assets/vendor.js" defer></script>
<script src="/assets/app.js" defer></script>

<!-- Independent third-party script. -->
<script src="https://analytics.example.com/script.js" async></script>
```

*Common Pitfalls: A parser-blocking script in `head` can delay discovery and rendering of meaningful content; reserve it for rare cases that genuinely require blocking behavior.*

---

### Resource Loading and Link Relations — `link`, stylesheet, preload, modulepreload, preconnect

**Conceptual frame:** HTML participates directly in the browser’s loading strategy. `link` can declare stylesheets, icons, canonical URLs, manifests, and performance hints. Resource hints are hints, not commands; misuse can waste bandwidth or harm prioritization.

Web.dev describes resource hints as mechanisms that inform browsers how to load and prioritize resources, including early DNS lookup, early connection setup, and fetching resources before normal discovery. 

| `rel`           | Purpose                               | Example                                                         | Caveat                                          |
| --------------- | ------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------- |
| `stylesheet`    | Load CSS                              | `<link rel="stylesheet" href="/app.css">`                       | Render-blocking behavior matters                |
| `preload`       | Fetch critical resource early         | `<link rel="preload" href="/font.woff2" as="font" crossorigin>` | Must use correct `as`; overuse wastes bandwidth |
| `modulepreload` | Preload module graph entry/dependency | `<link rel="modulepreload" href="/app.js">`                     | Useful for module-heavy apps                    |
| `preconnect`    | Open early connection                 | `<link rel="preconnect" href="https://cdn.example">`            | Use only for critical origins                   |
| `dns-prefetch`  | Early DNS lookup                      | `<link rel="dns-prefetch" href="//cdn.example">`                | Lower-cost than preconnect                      |
| `prefetch`      | Fetch likely future resource          | `<link rel="prefetch" href="/next-page.html">`                  | Low-priority speculative fetch                  |
| `canonical`     | Preferred page URL                    | `<link rel="canonical" href="https://example.com/page">`        | SEO signal, not redirect                        |
| `icon`          | Site icon                             | `<link rel="icon" href="/favicon.ico">`                         | Provide appropriate formats                     |
| `manifest`      | Web app manifest                      | `<link rel="manifest" href="/site.webmanifest">`                | PWA install metadata                            |
| `alternate`     | Alternate representation              | RSS, translated versions                                        | Use correct `type`, `hreflang` as needed        |

```html id="52oc0p"
<head>
  <link rel="preconnect" href="https://cdn.example.com" crossorigin>
  <link rel="dns-prefetch" href="//analytics.example.com">

  <link
    rel="preload"
    href="/assets/fonts/inter-var.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  >

  <link rel="stylesheet" href="/assets/app.css">
  <script type="module" src="/assets/app.js"></script>
</head>
```

*Common Pitfalls: Preloading resources that are not actually needed early competes with critical CSS, images, and scripts; resource hints should be measured, not sprinkled.*

---

### Resource Hint Matrix — `preload`, `modulepreload`, `preconnect`, `dns-prefetch`, `prefetch`

**Conceptual frame:** Each resource hint answers a different question: should the browser resolve the domain, open the connection, fetch this current-page resource, or speculate about a likely future resource?

| Hint                            | Browser action                                        | Best for                                          | Avoid when                                        |
| ------------------------------- | ----------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| `dns-prefetch`                  | Resolve DNS early                                     | Low-cost preparation for third-party origins      | Same-origin resources or too many origins         |
| `preconnect`                    | DNS + TCP + TLS early                                 | Critical third-party origin needed soon           | Origin may not be used or is low priority         |
| `preload`                       | Fetch current-page resource early                     | Critical font, hero image, late-discovered CSS/JS | Resource is not used quickly                      |
| `modulepreload`                 | Fetch module script/dependencies early                | Module-heavy JavaScript app                       | Not needed for simple pages                       |
| `prefetch`                      | Fetch likely future navigation/resource               | Next likely page or route                         | User may not navigate there; data-sensitive pages |
| `prerender` / speculation rules | Prepare future page more aggressively where supported | Highly likely next navigation                     | Privacy, correctness, and support constraints     |

| Resource                  | Typical `as` value for `preload` |
| ------------------------- | -------------------------------- |
| JavaScript classic script | `script`                         |
| CSS                       | `style`                          |
| Font                      | `font`                           |
| Image                     | `image`                          |
| Fetch/XHR resource        | `fetch`                          |
| Video                     | `video`                          |
| Audio                     | `audio`                          |
| Worker                    | `worker`                         |

```html id="x61r7m"
<!-- Critical hero image discovered late by CSS or JS. -->
<link
  rel="preload"
  href="/assets/hero-1280.avif"
  as="image"
  type="image/avif"
  imagesrcset="/assets/hero-640.avif 640w, /assets/hero-1280.avif 1280w"
  imagesizes="100vw"
>
```

*Common Pitfalls: Incorrect `as` values can prevent reuse of the preloaded response, causing duplicate downloads or ineffective preloading.*

---

### Security-Sensitive Markup Matrix — links, forms, embeds, scripts, user content

**Conceptual frame:** HTML can initiate navigation, submit data, execute or load scripts, embed remote documents, reveal referrers, and delegate powerful features. Treat markup as part of the security surface.

| Surface                 | Risk                                      | Safer pattern                                            |
| ----------------------- | ----------------------------------------- | -------------------------------------------------------- |
| External new-tab links  | `window.opener` abuse, reverse tabnabbing | `rel="noopener noreferrer"`                              |
| User-generated links    | Spam/SEO abuse, malicious destinations    | Sanitize; consider `rel="ugc nofollow"`                  |
| User-generated HTML     | XSS, layout injection, phishing UI        | Sanitize or isolate in restrictive sandbox               |
| Inline scripts          | XSS and CSP bypass pressure               | External scripts, nonces/hashes where needed             |
| Third-party scripts     | Supply-chain compromise, blocking         | Minimize; use SRI where appropriate; isolate if possible |
| Third-party iframes     | Tracking, clickjacking, permissions abuse | `sandbox`, `allow`, `referrerpolicy`, fixed dimensions   |
| File upload forms       | Malicious files, content sniffing         | Server-side validation, storage isolation                |
| Hidden inputs           | Tampering                                 | Never trust hidden field values                          |
| `target` on forms/links | Unexpected browsing context behavior      | Use intentionally; combine with rel/referrer controls    |
| `srcdoc`                | Inline HTML injection                     | Escape/sanitize; sandbox if untrusted                    |

```html id="fx65i3"
<a
  href="https://external.example.com/report"
  target="_blank"
  rel="noopener noreferrer"
>
  External security report
</a>
```

```html id="rxn35g"
<iframe
  title="Sanitized user preview"
  src="/sandbox/previews/preview-123"
  sandbox=""
  referrerpolicy="no-referrer"
  width="800"
  height="500"
></iframe>
```

*Common Pitfalls: Escaping text for HTML body context does not automatically make it safe for attributes, URLs, JavaScript, CSS, or `srcdoc`; context-aware sanitization is required.*

### ARIA Boundary Matrix — native HTML first, `role`, `aria-*`, accessible widgets

**Conceptual frame:** ARIA is for filling semantic gaps, not replacing correct HTML. MDN defines ARIA as roles and attributes that improve accessibility for web content and applications, especially JavaScript-heavy interfaces; WAI-ARIA 1.2 frames it as a specification for improving accessibility and interoperability of custom widgets and web application components. 

| Need                     | Prefer native HTML                    | ARIA fallback                                                       | Avoid                                            |
| ------------------------ | ------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------ |
| Navigate to another page | `<a href="/docs">Docs</a>`            | Rarely needed                                                       | `div role="link"` without keyboard/link behavior |
| Submit or trigger action | `<button type="button">Open</button>` | `role="button"` only if native button impossible                    | Clickable `div`                                  |
| Form text field          | `<label>` + `<input>`                 | `aria-label` or `aria-labelledby` when visible label cannot be used | Placeholder-only label                           |
| Checkbox                 | `<input type="checkbox">`             | `role="checkbox"` + `aria-checked` + keyboard behavior              | Static icon with no state                        |
| Radio group              | `<fieldset>` + `<legend>` + radios    | `role="radiogroup"` only for custom implementation                  | Unlabeled option group                           |
| Disclosure               | `<details>` + `<summary>`             | Button with `aria-expanded` + controlled panel                      | `aria-expanded` without actual state sync        |
| Dialog                   | `<dialog>` where suitable             | `role="dialog"` with focus management                               | Modal `div` without focus trap                   |
| Progress                 | `<progress>`                          | `role="progressbar"`                                                | Text-only spinner without status                 |
| Table                    | `<table>`, `th`, `scope`              | ARIA grid only for interactive data grid                            | `div` table for static data                      |
| Navigation landmark      | `<nav aria-label="Primary">`          | `role="navigation"`                                                 | Anonymous link cluster                           |

| ARIA attribute     | Purpose                               | Common use                   | Caveat                                              |
| ------------------ | ------------------------------------- | ---------------------------- | --------------------------------------------------- |
| `aria-label`       | Provides string accessible name       | Icon-only button             | Use visible text or `aria-labelledby` when possible |
| `aria-labelledby`  | Names element from visible element(s) | Dialog title, grouped region | Referenced IDs must exist and be unique             |
| `aria-describedby` | Adds accessible description           | Help/error text              | Description is secondary, not the control name      |
| `aria-expanded`    | Indicates expanded/collapsed state    | Disclosure/menu button       | Must update with actual UI state                    |
| `aria-controls`    | References controlled element         | Toggle button to panel       | Does not create behavior                            |
| `aria-current`     | Current item in a set                 | Current page nav link        | Use correct token: `page`, `step`, `location`, etc. |
| `aria-live`        | Announces dynamic changes             | Status updates               | Overuse creates noisy announcements                 |
| `aria-hidden`      | Hides from accessibility tree         | Decorative icons             | Do not apply to focusable/meaningful content        |
| `aria-invalid`     | Indicates invalid input               | Form validation state        | Pair with visible error text                        |
| `aria-required`    | Indicates required state              | Custom form control          | Native `required` preferred when possible           |

```html
<button type="button" aria-expanded="false" aria-controls="filters">
  Filters
</button>

<section id="filters" hidden>
  <h2>Filter results</h2>
  <!-- Filter controls go here. -->
</section>
```

*Common Pitfalls: ARIA changes accessibility semantics but does not automatically add keyboard behavior, focus management, form submission, validation, or visual state.*

---

### Accessible Name Matrix — `label`, `alt`, text content, `aria-labelledby`, `aria-label`, `title`

**Conceptual frame:** The **accessible name** is the name exposed to accessibility APIs for an element. The W3C Accessible Name and Description Computation specification defines how user agents compute names and descriptions, and HTML-AAM adapts that algorithm for HTML elements such as `img`, `a`, `area`, `iframe`, table cells, and others. 

| Element / pattern | Preferred naming source              | Example                                    | Caveat                                        |
| ----------------- | ------------------------------------ | ------------------------------------------ | --------------------------------------------- |
| Text input        | `<label for>`                        | `<label for="email">Email</label>`         | Placeholder is not a label                    |
| Checkbox/radio    | `<label for>` plus group `legend`    | `fieldset` + `legend`                      | Label option and group question separately    |
| Button with text  | Button text content                  | `<button>Save</button>`                    | Text should describe action                   |
| Icon-only button  | `aria-label` or visually hidden text | `<button aria-label="Close">…</button>`    | Keep label synchronized with action           |
| Image             | `alt`                                | `<img alt="Quarterly revenue chart">`      | Empty `alt=""` for decorative images          |
| Linked image      | `alt` describes destination/action   | `<img alt="Download report">`              | Not the visual filename                       |
| `iframe`          | `title` or ARIA name                 | `<iframe title="Checkout form">`           | Required for frame navigation clarity         |
| Region            | Heading or `aria-labelledby`         | `<section aria-labelledby="billing">`      | Do not name every generic wrapper             |
| Dialog            | Dialog heading via `aria-labelledby` | `<dialog aria-labelledby="confirm-title">` | Manage focus as well                          |
| Table             | `caption`                            | `<caption>Quarterly revenue</caption>`     | Captions describe the table as a whole        |
| SVG image         | `title`/`desc` or ARIA               | `<svg role="img" aria-labelledby="...">`   | Hide decorative SVG with `aria-hidden="true"` |

```html
<label for="search">Search documentation</label>
<input id="search" name="q" type="search" autocomplete="off">

<button type="button" aria-label="Close notification">
  <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
    <!-- icon path -->
  </svg>
</button>

<iframe
  title="Interactive map showing Tokyo office location"
  src="https://maps.example.com/embed/tokyo-office"
></iframe>
```

| Naming source     | Strength                      | Weakness                                  |
| ----------------- | ----------------------------- | ----------------------------------------- |
| Visible text      | Best for most controls        | May need CSS for design constraints       |
| `<label>`         | Best for form controls        | Requires correct `for`/`id` or nesting    |
| `alt`             | Correct for images            | Often written too generically             |
| `aria-labelledby` | Reuses visible text           | Fragile if referenced IDs change          |
| `aria-label`      | Useful for icon-only controls | Invisible label can drift from visible UI |
| `title`           | Last-resort advisory text     | Poor primary naming mechanism             |

MDN’s `aria-label` reference describes it as a string value that can name an element when the role permits naming, especially when no suitable visible DOM text can be referenced. 

*Common Pitfalls: Adding `aria-label` to override visible text can create mismatches between what sighted users see and what assistive-technology users hear.*

---

### Landmark, Heading, and Page Structure Matrix — `main`, `nav`, `header`, `footer`, `aside`, `h1`–`h6`

**Conceptual frame:** Landmarks and headings are the navigation skeleton of a page. They let users and tools understand the page’s regions and hierarchy without scanning every visual detail.

| Need                  | Element / pattern             | Example                                    | Caveat                                     |
| --------------------- | ----------------------------- | ------------------------------------------ | ------------------------------------------ |
| Primary content       | `main`                        | `<main id="main">`                         | Usually one dominant `main` per page       |
| Primary navigation    | `nav aria-label="Primary"`    | Site nav                                   | Label multiple navs distinctly             |
| Breadcrumb nav        | `nav aria-label="Breadcrumb"` | Breadcrumb trail                           | Use ordered list where useful              |
| Complementary content | `aside`                       | Related links, side notes                  | Should remain tangential                   |
| Page header           | `header`                      | Masthead, intro                            | Can also appear inside `article`/`section` |
| Page footer           | `footer`                      | Legal, contact, related links              | Can also appear inside sections/articles   |
| Page title            | `h1`                          | Main page subject                          | Do not choose by visual size               |
| Major sections        | `h2`                          | Top-level page sections                    | Avoid skipping levels for styling          |
| Subsections           | `h3`–`h6`                     | Nested structure                           | Keep hierarchy predictable                 |
| Skip navigation       | Link to `main`                | `<a href="#main">Skip to main content</a>` | Needs visible focus style                  |

```html
<a class="skip-link" href="#main">Skip to main content</a>

<header>
  <nav aria-label="Primary">
    <a href="/docs">Docs</a>
    <a href="/api">API</a>
  </nav>
</header>

<main id="main">
  <h1>Billing API Documentation</h1>

  <section aria-labelledby="authentication">
    <h2 id="authentication">Authentication</h2>
    <p>Use scoped access tokens for billing endpoints.</p>
  </section>
</main>
```

| Multiple landmarks       | Required distinction                                    |
| ------------------------ | ------------------------------------------------------- |
| Two `nav` regions        | `aria-label="Primary"` and `aria-label="Footer"`        |
| Multiple `aside` regions | Meaningful headings or labels                           |
| Multiple search forms    | Labels such as “Site search” and “Documentation search” |
| Repeated card headings   | Correct heading level relative to surrounding page      |

*Common Pitfalls: A page with visually large labels but no real heading hierarchy is difficult to navigate non-visually and hard to maintain structurally.*

---

### Focus and Keyboard Matrix — native focus, `tabindex`, `inert`, hidden content

**Conceptual frame:** Keyboard focus is a functional contract. Native interactive elements generally enter the tab order automatically. Custom controls require keyboard support, state management, and focus behavior.

| Pattern             | Use                                             | Caveat                                                 |
| ------------------- | ----------------------------------------------- | ------------------------------------------------------ |
| Native link         | Navigation                                      | Requires `href` to behave as a link                    |
| Native button       | Action                                          | Set `type` inside forms                                |
| `tabindex="0"`      | Add element to natural tab order                | Use rarely, usually for custom widgets                 |
| `tabindex="-1"`     | Programmatic focus target                       | Good for focusing headings or dialogs after navigation |
| Positive `tabindex` | Manual tab order                                | Avoid; creates fragile navigation                      |
| `hidden`            | Hide from visual and accessibility presentation | Do not place focusable active controls inside          |
| `inert`             | Disable interaction/focus in subtree            | Useful for background content during modal states      |
| `disabled`          | Disable form controls                           | Disabled controls are not submitted                    |
| `aria-disabled`     | Communicate disabled custom control             | Does not prevent interaction by itself                 |

```html
<main id="main" tabindex="-1">
  <h1>Account settings</h1>
</main>

<button type="button" disabled>
  Save changes
</button>
```

| Custom widget requirement | Must implement                                                    |
| ------------------------- | ----------------------------------------------------------------- |
| Custom button             | Enter/Space activation, focus style, disabled state               |
| Custom menu               | Arrow-key behavior, escape behavior, focus return                 |
| Custom dialog             | Initial focus, focus containment, escape/close, focus restoration |
| Custom tabs               | Roving focus or documented tab behavior                           |
| Custom combobox           | Complex ARIA pattern and robust testing                           |

*Common Pitfalls: Adding `role="button"` to a non-button element without handling keyboard activation produces a control that works with a mouse but fails for keyboard users.*

---

### Internationalization Matrix — `lang`, `dir`, encoding, localized content, bidirectional text

**Conceptual frame:** Internationalization starts in HTML. Correct language and direction metadata affect screen readers, hyphenation, spellcheck, translation, search, text rendering, and bidirectional text handling.

| Need                   | HTML mechanism         | Example                                          | Caveat                                  |
| ---------------------- | ---------------------- | ------------------------------------------------ | --------------------------------------- |
| Document language      | `html lang`            | `<html lang="en">`                               | Use actual content language             |
| Inline language switch | `lang` on element      | `<span lang="fr">raison d’être</span>`           | Useful for pronunciation and spellcheck |
| Document direction     | `dir`                  | `<html dir="rtl" lang="ar">`                     | Direction is not the same as language   |
| Auto direction         | `dir="auto"`           | User-generated names/comments                    | Useful for unknown-direction text       |
| Character encoding     | `meta charset="utf-8"` | `<meta charset="utf-8">`                         | Put early in `head`                     |
| Machine date           | `time datetime`        | `<time datetime="2026-05-05">May 5, 2026</time>` | Visible text can be localized           |
| Ruby annotation        | `ruby`, `rt`, `rp`     | Japanese pronunciation glosses                   | Keep markup readable                    |
| Address forms          | Localized field model  | Region-specific forms                            | Do not force US-centric assumptions     |
| Telephone input        | `type="tel"`           | International phone format                       | No universal native validation          |
| Names                  | Flexible text fields   | Full name or local split fields                  | Avoid rigid first/last-name assumptions |

```html
<p>
  The Japanese term <ruby lang="ja">哲学<rp>(</rp><rt>てつがく</rt><rp>)</rp></ruby>
  is commonly translated as philosophy.
</p>

<p dir="auto">
  <!-- Suitable for user-generated display names or comments whose direction is unknown. -->
  مرحبا بالعالم
</p>
```

| Bidirectional text issue                   | Safer pattern                                        |
| ------------------------------------------ | ---------------------------------------------------- |
| Unknown user-generated text                | `dir="auto"`                                         |
| Mixed LTR/RTL inline text                  | Use `bdi` for isolated direction                     |
| UI in one language, quoted text in another | Add `lang` to quoted span                            |
| Localized dates                            | Visible localized text + machine-readable `datetime` |
| Translated pages                           | `hreflang` alternates where SEO strategy requires    |

*Common Pitfalls: Setting `lang` only once on `html` while mixing substantial multilingual content causes incorrect pronunciation, spellcheck, and language-sensitive processing.*

---

### SEO Metadata Matrix — crawlable content, `title`, description, canonical, robots, social tags

**Conceptual frame:** SEO starts with crawlable, semantic content. Metadata helps identify, summarize, canonicalize, and preview a page, but it cannot replace meaningful body content.

| Need                     | Markup                                                             | Professional note                             |
| ------------------------ | ------------------------------------------------------------------ | --------------------------------------------- |
| Page title               | `<title>Specific Page Title</title>`                               | Unique, concise, page-specific                |
| Search snippet candidate | `<meta name="description" content="...">`                          | Human-readable summary                        |
| Canonicalization         | `<link rel="canonical" href="https://example.com/page">`           | Avoid conflicting canonical URLs              |
| Indexing hint            | `<meta name="robots" content="index,follow">`                      | Coordinate with HTTP headers and `robots.txt` |
| Open Graph title         | `<meta property="og:title" content="...">`                         | Social sharing preview                        |
| Open Graph image         | `<meta property="og:image" content="https://example.com/img.jpg">` | Use absolute URL                              |
| Alternate language       | `<link rel="alternate" hreflang="ja" href="...">`                  | Requires consistent reciprocal strategy       |
| Site icon                | `<link rel="icon" href="/favicon.ico">`                            | Browser identity                              |
| Manifest                 | `<link rel="manifest" href="/site.webmanifest">`                   | App install metadata                          |
| Structured data          | JSON-LD script                                                     | Must match visible content                    |

```html
<head>
  <title>HTML Forms Reference — Example Docs</title>
  <meta
    name="description"
    content="Professional HTML forms reference covering input types, validation, labels, and submission."
  >
  <link rel="canonical" href="https://example.com/docs/html-forms">

  <meta property="og:title" content="HTML Forms Reference">
  <meta property="og:description" content="Input types, validation, labels, and submission patterns.">
  <meta property="og:image" content="https://example.com/assets/html-forms-cover.jpg">
  <meta property="og:url" content="https://example.com/docs/html-forms">
</head>
```

*Common Pitfalls: Reusing the same `<title>` and description across many pages weakens page identity and creates poor search/share previews.*

---

### Structured Data Matrix — JSON-LD, Schema.org, article, organization, product, breadcrumb

**Conceptual frame:** Structured data is machine-readable markup that helps search systems understand page entities. Google recommends JSON-LD for structured data when the site setup allows it because it is generally easier to implement and maintain at scale. Google’s general structured-data guidelines also state that structured data must comply with content and general guidelines to be eligible for rich results. 

| Structured data type      | Typical page              | Purpose                              | Caveat                                                      |
| ------------------------- | ------------------------- | ------------------------------------ | ----------------------------------------------------------- |
| `Article` / `TechArticle` | Articles, docs, tutorials | Identify article metadata            | Must match visible content                                  |
| `Organization`            | About/home/contact pages  | Identify organization details        | Follow Google guidelines                                    |
| `Product`                 | Product detail pages      | Product information and rich results | Price/availability must be accurate if provided             |
| `BreadcrumbList`          | Pages with hierarchy      | Breadcrumb rich result eligibility   | Match visible breadcrumb                                    |
| `FAQPage`                 | FAQ pages where eligible  | FAQ rich result eligibility          | Policies have changed over time; verify current eligibility |
| `Dataset`                 | Dataset pages             | Dataset discovery                    | Include identifiers/provenance where applicable             |
| `ItemList`                | Lists/carousels           | List-like result features            | Only certain content types qualify                          |

Google’s Search Central structured-data gallery lists many supported structured-data features, including dataset, discussion forum, job posting, local business, organization, product, profile page, Q&A, review snippet, and others; eligibility depends on each feature’s guidelines. 

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "HTML Form Validation Patterns",
  "description": "Reference patterns for accessible HTML form validation.",
  "datePublished": "2026-05-05",
  "dateModified": "2026-05-05",
  "author": {
    "@type": "Organization",
    "name": "Example Docs"
  }
}
</script>
```

*Common Pitfalls: Structured data that describes content not visible to users can violate search guidelines and may be ignored or penalized.*

---

### Validation Workflow Matrix — Nu HTML Checker, browser DevTools, accessibility tools, rich-result testing

**Conceptual frame:** HTML quality must be checked from multiple angles: syntax conformance, parsed DOM, accessibility tree, keyboard operation, network behavior, and search metadata. The W3C Nu HTML Checker is the modern W3C checker for HTML documents, while the older W3C Markup Validator page notes that modern HTML checking should use the W3C HTML Checker. 

| Tool / workflow               | Detects well                                         | Often misses                            | Best use                             |
| ----------------------------- | ---------------------------------------------------- | --------------------------------------- | ------------------------------------ |
| Nu HTML Checker               | Invalid elements, attributes, nesting, duplicate IDs | Runtime DOM mutations, accessibility UX | Baseline conformance                 |
| Browser DevTools Elements     | Parsed DOM, computed attributes, layout hooks        | Source-level validation                 | Parser repair and runtime inspection |
| DevTools Network              | Blocking resources, failed loads, preload misuse     | Semantic quality                        | Performance/resource debugging       |
| DevTools Accessibility panel  | Roles, names, focusability, tree exposure            | Some real assistive-tech behavior       | Accessible-name and role checks      |
| Keyboard-only test            | Focus order, operability                             | Screen-reader announcements             | Interaction correctness              |
| Screen reader smoke test      | Practical AT output                                  | Full accessibility compliance           | Critical flows and custom widgets    |
| Lighthouse / automated audits | Common performance/accessibility/SEO issues          | Many nuanced accessibility defects      | Fast regression signal               |
| Rich Results Test             | Structured-data eligibility issues                   | General SEO quality                     | JSON-LD and rich-result debugging    |
| Server logs/crawlers          | Actual indexing/crawl behavior                       | Client-side UX details                  | SEO operations                       |

Google’s article structured-data documentation recommends validating structured data with the Rich Results Test and fixing critical errors; it also suggests fixing non-critical issues when they improve structured-data quality. 

```text
Professional validation sequence:
1. Validate source HTML with Nu HTML Checker.
2. Inspect parsed DOM in browser DevTools.
3. Check keyboard navigation and visible focus.
4. Inspect accessibility names, roles, and landmarks.
5. Check network loading for blocking or failed resources.
6. Validate structured data when SEO features are relevant.
7. Test critical flows with real user-agent/browser targets.
```

*Common Pitfalls: Automated tools catch many syntax and low-level defects, but they do not prove that a workflow is understandable, keyboard-operable, or semantically appropriate.*

---

### Debugging Matrix — source HTML, parsed DOM, accessibility tree, network, forms

**Conceptual frame:** HTML debugging requires identifying which layer is wrong: the source markup, parser output, generated DOM, CSS/layout, accessibility tree, form submission payload, or network/resource loading.

| Symptom                                 | Inspect                          | Likely cause                                              | Fix                                           |
| --------------------------------------- | -------------------------------- | --------------------------------------------------------- | --------------------------------------------- |
| Element appears outside expected parent | Parsed DOM                       | Invalid nesting or implicit closing                       | Validate source and repair structure          |
| CSS selector not matching               | DevTools Elements                | DOM differs from source, wrong class/id                   | Inspect parsed DOM                            |
| Form submits missing value              | Network payload/FormData         | Missing `name`, disabled control, unchecked checkbox      | Add `name`, check successful-control rules    |
| Label not announced                     | Accessibility panel              | Broken `for`/`id`, duplicate `id`, placeholder-only label | Use explicit label                            |
| Button submits unexpectedly             | Source/DOM                       | Missing `type="button"` inside form                       | Add explicit `type`                           |
| Image causes layout shift               | Performance/layout tools         | Missing dimensions                                        | Add `width`/`height` or aspect-ratio strategy |
| Script runs too early                   | Console/timing                   | Parser-blocking/async order issue                         | Use `defer`, module, or DOM-ready strategy    |
| Iframe inaccessible                     | Accessibility tree               | Missing `title`                                           | Add specific `title`                          |
| Rich result not appearing               | Rich Results Test/Search Console | Invalid or ineligible structured data                     | Fix JSON-LD and content-policy alignment      |
| RTL text displays incorrectly           | DOM inspection                   | Missing `dir`/`bdi`                                       | Add direction isolation                       |

```js
// [debugging] Inspect actual submitted form data before sending custom requests.
const form = document.querySelector("form");
const data = new FormData(form);

for (const [name, value] of data.entries()) {
  console.log(name, value);
}
```

*Common Pitfalls: Looking only at the source file misses browser parser repair and JavaScript-generated mutations; inspect the final parsed DOM.*

---

### Compatibility and Progressive Enhancement Matrix — Baseline, feature detection, fallbacks

**Conceptual frame:** Evergreen browsers reduce compatibility burden but do not eliminate it. Embedded webviews, enterprise-managed browsers, assistive technologies, and partial implementations still require testing.

| Feature area          | Progressive enhancement strategy                                    | Caveat                                                 |
| --------------------- | ------------------------------------------------------------------- | ------------------------------------------------------ |
| `dialog`              | Provide JS-enhanced modal with fallback page/inline flow            | Focus management still matters                         |
| `popover`             | Use only for non-critical transient UI or provide fallback          | Newer feature; verify target support                   |
| Form input types      | Use specific types; browsers fall back reasonably for many controls | UI differs by browser/device                           |
| Constraint validation | Use native validation as UX layer                                   | Server validation required                             |
| Responsive images     | Provide fallback `img`                                              | Test actual selected candidate                         |
| `loading="lazy"`      | Add to non-critical images/iframes                                  | Avoid for critical LCP asset                           |
| `fetchpriority`       | Use on one or few critical resources                                | Overuse damages priorities                             |
| `module` scripts      | Use for modern evergreen targets                                    | Legacy fallback only if supporting old browsers        |
| Web Components        | Server-render or fallback meaningful content where possible         | Upgrade timing and accessibility matter                |
| ARIA widgets          | Prefer native; test with target AT/browser pairs                    | Spec compliance does not guarantee perfect AT behavior |

| Compatibility question                             | Practical test                                      |
| -------------------------------------------------- | --------------------------------------------------- |
| Does the page work without JavaScript?             | Disable JS for content/form baseline where feasible |
| Does keyboard navigation work?                     | Tab/Shift+Tab/Enter/Space/Escape/arrow keys         |
| Does the accessible name match visible intent?     | Inspect accessibility tree                          |
| Does mobile input keyboard match field purpose?    | Test on target mobile browsers                      |
| Does resource priority improve metrics?            | Measure with lab and field performance tools        |
| Does structured data remain valid after rendering? | Validate final HTML/JSON-LD output                  |

*Common Pitfalls: “Evergreen browser support” is not the same as support in all embedded webviews, locked enterprise environments, screen-reader/browser combinations, or older devices.*

---

### Obsolete and Usually-Wrong Pattern Matrix — deprecated elements, presentational markup, fake controls

**Conceptual frame:** Obsolete HTML often still renders because browsers preserve compatibility, but rendering compatibility is not endorsement. Replace presentational or behavior-faking markup with semantic HTML, CSS, and JavaScript.

| Obsolete / wrong pattern        | Replacement                                | Why                                                  |
| ------------------------------- | ------------------------------------------ | ---------------------------------------------------- |
| `<font>`                        | CSS typography                             | Presentation belongs in CSS                          |
| `<center>`                      | CSS layout/text alignment                  | Presentational markup                                |
| Table-based layout              | CSS Grid/Flexbox                           | Tables are for data relationships                    |
| `<b>` for importance            | `strong` when importance, CSS when visual  | `b` has limited semantic force                       |
| `<i>` for emphasis              | `em` when stress, CSS when visual          | `i` is not stress emphasis                           |
| `<u>` for links                 | Real `a href` links or CSS text decoration | Underline convention confuses users                  |
| `<br><br>` for spacing          | CSS margins and paragraphs                 | Layout through line breaks is fragile                |
| Empty headings for spacing      | CSS margins                                | Breaks heading navigation                            |
| `div onclick` button            | `<button>`                                 | Native keyboard and semantics                        |
| `a href="#"` action             | `<button type="button">`                   | Links navigate; buttons act                          |
| Placeholder-only field          | Visible `<label>`                          | Placeholder disappears and is weak for accessibility |
| Positive `tabindex`             | Natural DOM order                          | Manual focus order breaks maintenance                |
| `alt="image"`                   | Meaningful `alt` or empty `alt=""`         | Generic alt is noise                                 |
| Unrestricted third-party iframe | Sandboxed iframe with policy review        | Security/privacy risk                                |
| Client-only validation          | Server-side validation too                 | Client checks are bypassable                         |

*Common Pitfalls: Keeping obsolete markup because “it still works” preserves technical debt that damages accessibility, maintainability, and future refactoring.*

---

### Naming and Hook Conventions — `id`, `class`, `data-*`, ARIA IDs, component boundaries

**Conceptual frame:** HTML naming conventions are not just style. They determine fragment navigation, CSS stability, JavaScript hooks, ARIA references, analytics instrumentation, and test reliability.

| Hook                   | Best use                                    | Naming guidance                                | Caveat                                                  |
| ---------------------- | ------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------- |
| `id`                   | Unique anchors, labels, ARIA references     | Stable, descriptive, unique                    | Do not reuse across template clones                     |
| `class`                | Styling and grouping                        | Component or utility naming convention         | Avoid JS depending on purely visual classes if unstable |
| `data-*`               | JS/test/analytics hooks or private metadata | `data-component`, `data-action`, `data-testid` | Not for secrets                                         |
| `name`                 | Form submission key                         | Match backend contract                         | Changing it breaks submission                           |
| `aria-*` reference IDs | Accessibility relationships                 | Stable IDs near related content                | Broken references degrade accessibility                 |
| `slot` name            | Web Component insertion point               | Public component API                           | Changing slot names is breaking                         |
| Custom element name    | Component tag                               | Must include hyphen                            | Behavior requires JS registration                       |
| Fragment target        | In-page navigation                          | Human-readable section IDs                     | Avoid generated unstable IDs for public docs            |

```html
<section id="billing-address" aria-labelledby="billing-address-title">
  <h2 id="billing-address-title">Billing address</h2>

  <div class="form-field" data-component="address-field">
    <label for="billing-postal-code">Postal code</label>
    <input
      id="billing-postal-code"
      name="billingPostalCode"
      type="text"
      autocomplete="postal-code"
      inputmode="numeric"
      data-testid="billing-postal-code"
    >
  </div>
</section>
```

| Convention goal      | Good pattern                   | Weak pattern                     |
| -------------------- | ------------------------------ | -------------------------------- |
| Public fragment link | `id="installation"`            | `id="section-3"`                 |
| Form backend key     | `name="billingPostalCode"`     | `name="input1"`                  |
| JS action hook       | `data-action="dismiss"`        | JS tied to `.red-button`         |
| Test hook            | `data-testid="delete-account"` | Brittle XPath by visual position |
| Component wrapper    | `data-component="user-card"`   | Anonymous nested `div`s          |

*Common Pitfalls: Duplicate `id` values break labels, ARIA references, fragment navigation, scripts, tests, and CSS targeting.*

---

### Maintainability Pattern Matrix — semantic shell, component HTML, generated markup, review rules

**Conceptual frame:** Maintainable HTML is explicit about structure, stable about hooks, minimal in wrappers, and conservative about custom behavior.

| Pattern                  | Use                                  | Professional rule                                                |
| ------------------------ | ------------------------------------ | ---------------------------------------------------------------- |
| Semantic page shell      | Public pages, docs, app entry points | `header`, `nav`, `main`, `footer` before generic wrappers        |
| Component wrapper        | Reusable UI blocks                   | Use class/data hooks without erasing native semantics            |
| Form component           | Input groups                         | Keep `label`, help text, error text, and input close together    |
| Card component           | Repeated content summary             | Use heading and link/button semantics intentionally              |
| Server-rendered baseline | SEO/accessibility-critical content   | Render meaningful HTML before hydration                          |
| Hydrated island          | Interactive region                   | Avoid replacing semantic content with empty app roots            |
| Data table component     | Dense data                           | Preserve real `table` semantics unless it is an interactive grid |
| Modal component          | Focused task                         | Prefer `dialog` or implement equivalent focus/keyboard rules     |
| Third-party embed        | External content                     | Isolate and document permissions                                 |
| Template cloning         | Repeated dynamic markup              | Avoid duplicate IDs; use `data-*` selectors                      |

```html
<article class="card" data-component="article-card">
  <h2 class="card__title">
    <a href="/docs/html-forms">HTML Forms Reference</a>
  </h2>
  <p class="card__summary">
    Input types, validation, labeling, and submission patterns.
  </p>
</article>
```

*Common Pitfalls: Componentizing markup by wrapping everything in generic `div`s often destroys the semantics that made the original HTML robust.*

---

### Coverage Audit — Part 2 reference scope, depth, omissions, separate advanced guides

| Audit category                        | Coverage status                                                                                                                                                                                                                                                                                       |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Areas covered deeply                  | Document skeleton, metadata, content categories, sectioning, headings, links, images, forms, input types, form validation, form submission, tables, interactive elements, iframe security, script loading, resource hints, ARIA boundaries, accessible names, validation/debugging, obsolete patterns |
| Areas covered compactly               | Audio/video, SVG/canvas accessibility, templates, custom elements, Web Component boundaries, internationalization, SEO metadata, structured data, compatibility strategy, naming conventions                                                                                                          |
| Areas intentionally omitted or brief  | Full CSS layout, full JavaScript DOM programming, framework-specific SSR/hydration, Canvas/WebGL graphics programming, complete Web Components lifecycle, backend form processing, CSP/header-level browser security                                                                                  |
| Areas needing separate advanced guide | ARIA Authoring Practices and custom widgets, production accessibility engineering, Core Web Vitals/resource-priority engineering, SEO and structured-data operations, Web Components, browser security headers/CSP, internationalization/localization engineering                                     |
| Validation priority                   | Use conformance validation, parsed-DOM inspection, accessibility-tree inspection, keyboard testing, network analysis, and structured-data validation where relevant                                                                                                                                   |
| Professional risk areas               | Fake controls, unlabeled forms, invalid nesting, duplicate IDs, unsafe iframes, overused ARIA, poor script loading, incorrect responsive images, client-only validation, structured data mismatch                                                                                                     |

## PART 3 — Fast Practical Tutorial — HTML5 workflow, validation, semantics, forms, media, mini-project

This part turns the reference material into a practical workflow: create a valid HTML document, structure it semantically, add metadata, build accessible content, handle forms, load resources intentionally, inspect the result, and finish with a compact professional mini-project. Scope follows the requested **HTML5 professional reference** for modern evergreen browsers. 

### Environment and working file — modern browsers, `.html`, UTF-8, local preview

**Assumptions:** Use modern HTML in current evergreen browsers. A single local file is enough for first inspection, but realistic form submission, routing, headers, and CSP behavior require a local or remote HTTP server.

| Item           | Practical default                                           |
| -------------- | ----------------------------------------------------------- |
| File extension | `.html`                                                     |
| Encoding       | UTF-8                                                       |
| Browser target | Current Chrome, Firefox, Safari, Edge                       |
| Editing model  | Plain text editor or IDE                                    |
| Validation     | Nu HTML Checker or equivalent HTML validator                |
| Inspection     | Browser DevTools: Elements, Console, Network, Accessibility |
| Local serving  | Any static server, for example `python3 -m http.server`     |

Create a working folder:

```bash
mkdir html5-reference-demo
cd html5-reference-demo
touch index.html
```

Optional local server:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/
```

*Common Pitfalls: Opening a file through `file://` is fine for static markup inspection, but it does not behave exactly like HTTP for module scripts, routing, form submission, CORS, headers, service workers, or some security-sensitive features.*

### First working document — `doctype`, `html`, `head`, `body`, `main`

Start with a minimal but professional document. This is the baseline structure that later examples will extend.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HTML5 Practical Tutorial</title>
  <meta name="description" content="A practical HTML5 tutorial page with semantic structure.">
</head>
<body>
  <main>
    <h1>HTML5 Practical Tutorial</h1>
    <p>This page demonstrates semantic HTML, accessible forms, media, and validation.</p>
  </main>
</body>
</html>
```

| Line                     | Why it matters                                    |
| ------------------------ | ------------------------------------------------- |
| `<!doctype html>`        | Enables standards mode                            |
| `<html lang="en">`       | Declares document language                        |
| `<meta charset="utf-8">` | Ensures Unicode text handling                     |
| Viewport meta            | Enables predictable responsive behavior on mobile |
| `<title>`                | Defines browser/search/accessibility page title   |
| `<main>`                 | Marks dominant page content                       |
| `<h1>`                   | Defines the page’s primary heading                |

*Common Pitfalls: A page can render without `lang`, viewport, or a useful `title`, but it becomes weaker for accessibility, mobile behavior, search snippets, and browser UI.*

### Add page regions — `header`, `nav`, `main`, `section`, `footer`

HTML structure should represent document architecture before CSS or JavaScript enhancement.

```html
<body>
  <a href="#main">Skip to main content</a>

  <header>
    <nav aria-label="Primary">
      <a href="/">Home</a>
      <a href="/docs">Docs</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>

  <main id="main">
    <h1>HTML5 Practical Tutorial</h1>

    <section aria-labelledby="overview-title">
      <h2 id="overview-title">Overview</h2>
      <p>HTML describes the structure and meaning of a web document.</p>
    </section>

    <section aria-labelledby="workflow-title">
      <h2 id="workflow-title">Workflow</h2>
      <p>Write semantic markup, validate it, inspect the DOM, and test accessibility.</p>
    </section>
  </main>

  <footer>
    <small>&copy; 2026 Example Docs</small>
  </footer>
</body>
```

| Need                     | Pattern                                            |
| ------------------------ | -------------------------------------------------- |
| Skip repeated navigation | Skip link to `main`                                |
| Primary navigation       | `nav aria-label="Primary"`                         |
| Main content             | `main id="main"`                                   |
| Named document section   | `section aria-labelledby="..."`                    |
| Footer metadata          | `footer` with legal/contact/navigation information |

*Common Pitfalls: Using `section` only as a visual wrapper is usually wrong; a section should normally represent a meaningful topic and have a heading.*

### Add semantic prose — paragraphs, lists, code, dates, figures

Use text-level and grouping elements to encode meaning, not default styling.

```html
<section aria-labelledby="semantics-title">
  <h2 id="semantics-title">Semantic markup</h2>

  <p>
    HTML should describe <strong>meaningful structure</strong>.
    Use <code>&lt;button&gt;</code> for actions and <code>&lt;a&gt;</code> for navigation.
  </p>

  <p>
    Last reviewed:
    <time datetime="2026-05-05">May 5, 2026</time>.
  </p>

  <ol>
    <li>Choose the native element that matches the meaning.</li>
    <li>Add accessible names and descriptions.</li>
    <li>Validate the source and inspect the parsed DOM.</li>
  </ol>

  <figure>
    <pre><code>&lt;button type="button"&gt;Open menu&lt;/button&gt;</code></pre>
    <figcaption>A native button is preferable to a clickable generic element.</figcaption>
  </figure>
</section>
```

| Element         | Use                               |
| --------------- | --------------------------------- |
| `strong`        | Importance                        |
| `em`            | Stress emphasis                   |
| `code`          | Code fragment                     |
| `time datetime` | Machine-readable date/time        |
| `ol`            | Ordered steps                     |
| `ul`            | Unordered list                    |
| `figure`        | Self-contained referenced content |
| `figcaption`    | Caption for figure                |

*Common Pitfalls: Choosing elements for their default appearance creates misleading markup; use CSS for appearance and HTML for meaning.*

### Add responsive images — `img`, `alt`, dimensions, `srcset`, `sizes`

Images need accessibility text, dimensions, and resource strategy.

```html
<section aria-labelledby="images-title">
  <h2 id="images-title">Responsive image example</h2>

  <figure>
    <img
      src="/assets/dashboard-1280.jpg"
      srcset="
        /assets/dashboard-640.jpg 640w,
        /assets/dashboard-1280.jpg 1280w
      "
      sizes="(max-width: 700px) 100vw, 700px"
      width="1280"
      height="720"
      alt="Analytics dashboard showing revenue, conversion rate, and active-user charts."
      loading="lazy"
      decoding="async"
    >
    <figcaption>Dashboard overview shown in the reporting interface.</figcaption>
  </figure>
</section>
```

| Attribute          | Why it is present                           |
| ------------------ | ------------------------------------------- |
| `alt`              | Text alternative for meaningful image       |
| `width` / `height` | Helps prevent layout shift                  |
| `srcset`           | Candidate image resources                   |
| `sizes`            | Browser hint for rendered image width       |
| `loading="lazy"`   | Delays non-critical offscreen image loading |
| `decoding="async"` | Allows asynchronous image decoding hint     |

For a decorative image:

```html
<img src="/assets/divider.svg" alt="" width="1200" height="80">
```

*Common Pitfalls: A meaningful image with `alt=""` disappears from the accessibility tree; a decorative image with verbose `alt` creates noise.*

### Build an accessible form — `form`, `label`, `input`, `fieldset`, validation

A professional HTML form needs labels, names, autocomplete, visible help text, and server-side validation assumptions.

```html
<section aria-labelledby="contact-title">
  <h2 id="contact-title">Contact form</h2>

  <form action="/contact" method="post">
    <div>
      <label for="full-name">Full name</label>
      <input
        id="full-name"
        name="fullName"
        type="text"
        autocomplete="name"
        required
        minlength="2"
        maxlength="80"
      >
    </div>

    <div>
      <label for="email">Email address</label>
      <input
        id="email"
        name="email"
        type="email"
        autocomplete="email"
        aria-describedby="email-help"
        required
      >
      <p id="email-help">Use an address where replies can be received.</p>
    </div>

    <fieldset>
      <legend>Reason for contact</legend>

      <div>
        <input id="support" name="reason" type="radio" value="support" required>
        <label for="support">Support request</label>
      </div>

      <div>
        <input id="sales" name="reason" type="radio" value="sales">
        <label for="sales">Sales inquiry</label>
      </div>
    </fieldset>

    <div>
      <label for="message">Message</label>
      <textarea
        id="message"
        name="message"
        rows="6"
        maxlength="2000"
        required
      ></textarea>
    </div>

    <button type="submit">Send message</button>
  </form>
</section>
```

| Form rule                                        | Why                                             |
| ------------------------------------------------ | ----------------------------------------------- |
| Every submitted control needs `name`             | Server receives keys from `name`                |
| Every visible control needs a label              | Accessible and clickable naming                 |
| Use `autocomplete` tokens                        | Improves autofill and password manager behavior |
| Use `fieldset` / `legend` for grouped choices    | Gives radio/checkbox groups a question          |
| Use `required`, `minlength`, `maxlength`, `type` | Improves client-side feedback                   |
| Validate again server-side                       | Client-side constraints are bypassable          |

*Common Pitfalls: `required`, `pattern`, and `type="email"` improve user experience but are not security validation; all submitted data must be validated on the server.*

### Add tables correctly — `table`, `caption`, `thead`, `tbody`, `th`, `scope`

Use tables for data relationships, not layout.

```html
<section aria-labelledby="comparison-title">
  <h2 id="comparison-title">Validation checklist</h2>

  <table>
    <caption>HTML quality checks before release</caption>
    <thead>
      <tr>
        <th scope="col">Check</th>
        <th scope="col">Tool</th>
        <th scope="col">Release blocker?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">HTML conformance</th>
        <td>Nu HTML Checker</td>
        <td>Yes</td>
      </tr>
      <tr>
        <th scope="row">Keyboard navigation</th>
        <td>Manual browser test</td>
        <td>Yes</td>
      </tr>
      <tr>
        <th scope="row">Structured data</th>
        <td>Rich result validator</td>
        <td>Only for SEO pages</td>
      </tr>
    </tbody>
  </table>
</section>
```

| Table feature    | Use                           |
| ---------------- | ----------------------------- |
| `caption`        | Names or summarizes the table |
| `thead`          | Header row group              |
| `tbody`          | Main body rows                |
| `th scope="col"` | Column header                 |
| `th scope="row"` | Row header                    |
| `td`             | Data cell                     |

*Common Pitfalls: Styling `div`s to look like a table loses the native data-grid relationships that real table markup provides.*

### Add native interaction — `details`, `summary`, `dialog`, `button`

Native controls provide semantics and keyboard behavior that generic elements do not.

```html
<section aria-labelledby="interaction-title">
  <h2 id="interaction-title">Native interaction</h2>

  <details>
    <summary>Why prefer native controls?</summary>
    <p>
      Native controls provide built-in keyboard behavior, roles, focus handling,
      and platform integration.
    </p>
  </details>

  <button type="button" id="open-dialog">
    Open confirmation dialog
  </button>

  <dialog id="confirmation-dialog" aria-labelledby="dialog-title">
    <form method="dialog">
      <h2 id="dialog-title">Confirm export</h2>
      <p>The export file will be generated asynchronously.</p>

      <button value="cancel">Cancel</button>
      <button value="confirm">Confirm</button>
    </form>
  </dialog>

  <script type="module">
    const openButton = document.querySelector("#open-dialog");
    const dialog = document.querySelector("#confirmation-dialog");

    openButton.addEventListener("click", () => {
      dialog.showModal();
    });
  </script>
</section>
```

| Need                                | Prefer                      |
| ----------------------------------- | --------------------------- |
| Expand/collapse explanatory content | `details` and `summary`     |
| User action                         | `button`                    |
| Navigation                          | `a href`                    |
| Modal confirmation                  | `dialog` with `showModal()` |
| Dialog-local confirmation           | `form method="dialog"`      |

*Common Pitfalls: A clickable `div` is not equivalent to a `button`; keyboard activation, focus behavior, disabled state, and accessibility semantics must otherwise be rebuilt manually.*

### Load CSS and JavaScript intentionally — `link`, `script`, `defer`, `type="module"`

Resource loading is part of HTML architecture. Use loading patterns that match dependency and execution needs.

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HTML5 Practical Tutorial</title>

  <link rel="stylesheet" href="/assets/site.css">

  <!-- Independent analytics: order does not matter. -->
  <script src="/assets/analytics.js" async></script>

  <!-- Main modern application logic. Module scripts are deferred by default. -->
  <script type="module" src="/assets/app.js"></script>
</head>
```

Classic ordered scripts:

```html
<script src="/assets/vendor.js" defer></script>
<script src="/assets/app.js" defer></script>
```

Critical resource hint example:

```html
<link
  rel="preload"
  href="/assets/fonts/inter-var.woff2"
  as="font"
  type="font/woff2"
  crossorigin
>
```

| Pattern                | Use                                   |
| ---------------------- | ------------------------------------- |
| `script type="module"` | Modern application JavaScript         |
| `script defer`         | Ordered classic scripts after parsing |
| `script async`         | Independent third-party scripts       |
| `preload`              | Current-page critical resource        |
| `preconnect`           | Critical third-party origin           |
| `stylesheet`           | CSS file                              |

*Common Pitfalls: Using `async` for scripts that depend on each other causes race conditions; use modules or `defer` when execution order matters.*

### Inspect and validate — source, parsed DOM, accessibility tree, network

After writing the page, inspect several layers. Rendering alone is insufficient.

| Layer              | How to inspect                  | What to check                                                   |
| ------------------ | ------------------------------- | --------------------------------------------------------------- |
| Source HTML        | Validator                       | Invalid nesting, duplicate IDs, unsupported attributes          |
| Parsed DOM         | DevTools Elements               | Browser repair, generated nodes, actual hierarchy               |
| Accessibility tree | DevTools Accessibility panel    | Names, roles, landmarks, hidden/focusable state                 |
| Keyboard behavior  | Manual test                     | Tab order, focus visibility, Enter/Space/Escape behavior        |
| Network            | DevTools Network                | Failed resources, blocking scripts, duplicate preload downloads |
| Forms              | Network payload or `FormData`   | Submitted names and values                                      |
| Mobile behavior    | Device emulation or real device | Viewport, input keyboard, responsive images                     |

Form debugging helper:

```html
<script type="module">
  const form = document.querySelector("form");

  form?.addEventListener("submit", (event) => {
    const data = new FormData(form);

    // [debugging] Inspect what the browser will submit.
    for (const [name, value] of data.entries()) {
      console.log(name, value);
    }

    // Remove this in production unless intentionally intercepting submission.
    event.preventDefault();
  });
</script>
```

*Common Pitfalls: Inspecting only the source file misses browser parser repair, JavaScript mutations, actual submitted form data, and the accessibility tree.*

### Realistic mini-project — documentation article page with form, image, table, metadata, and native interaction

This mini-project is a compact professional page template. It demonstrates semantic page structure, metadata, accessible navigation, article content, responsive media, table markup, contact form, native disclosure, dialog, and intentional script loading.

Create `index.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <!-- [portability] UTF-8 should appear before non-ASCII text content. -->
  <meta charset="utf-8">

  <!-- [functionality] Required for predictable responsive rendering on mobile. -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>HTML Release Checklist — Example Docs</title>
  <meta
    name="description"
    content="A practical HTML release checklist covering semantics, forms, accessibility, and resource loading."
  >
  <link rel="canonical" href="https://example.com/docs/html-release-checklist">

  <!-- [performance] Stylesheet is intentionally simple and cacheable. -->
  <link rel="stylesheet" href="/assets/site.css">

  <!-- [functionality] Module script is deferred by default. -->
  <script type="module" src="/assets/page.js"></script>
</head>
<body>
  <a href="#main">Skip to main content</a>

  <header>
    <nav aria-label="Primary">
      <a href="/">Home</a>
      <a href="/docs">Docs</a>
      <a href="/standards">Standards</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>

  <main id="main">
    <article>
      <header>
        <h1>HTML Release Checklist</h1>
        <p>
          Last reviewed
          <time datetime="2026-05-05">May 5, 2026</time>.
        </p>
      </header>

      <section aria-labelledby="overview">
        <h2 id="overview">Overview</h2>
        <p>
          Production HTML should be valid, semantic, accessible, resource-aware,
          and resilient before CSS and JavaScript enhancement.
        </p>
      </section>

      <section aria-labelledby="hero-image">
        <h2 id="hero-image">Release dashboard</h2>

        <figure>
          <img
            src="/assets/release-dashboard-1280.jpg"
            srcset="
              /assets/release-dashboard-640.jpg 640w,
              /assets/release-dashboard-1280.jpg 1280w
            "
            sizes="(max-width: 720px) 100vw, 720px"
            width="1280"
            height="720"
            alt="Release dashboard showing passing checks for validation, accessibility, and performance."
            loading="lazy"
            decoding="async"
          >
          <figcaption>
            Example dashboard summarizing HTML quality gates before release.
          </figcaption>
        </figure>
      </section>

      <section aria-labelledby="checks">
        <h2 id="checks">Quality gates</h2>

        <table>
          <caption>Required checks before publishing</caption>
          <thead>
            <tr>
              <th scope="col">Check</th>
              <th scope="col">Method</th>
              <th scope="col">Block release?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">HTML conformance</th>
              <td>Run an HTML validator against the generated page.</td>
              <td>Yes</td>
            </tr>
            <tr>
              <th scope="row">Keyboard operation</th>
              <td>Navigate the page using Tab, Shift+Tab, Enter, Space, and Escape.</td>
              <td>Yes</td>
            </tr>
            <tr>
              <th scope="row">Accessible names</th>
              <td>Inspect links, buttons, form fields, images, and iframe titles.</td>
              <td>Yes</td>
            </tr>
            <tr>
              <th scope="row">Resource loading</th>
              <td>Inspect Network panel for blocking scripts and failed resources.</td>
              <td>Usually</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section aria-labelledby="faq">
        <h2 id="faq">Release FAQ</h2>

        <details>
          <summary>Can a page pass visual review but fail HTML review?</summary>
          <p>
            Yes. Browser error recovery can hide invalid nesting, broken labels,
            duplicate IDs, or inaccessible controls.
          </p>
        </details>

        <details>
          <summary>Is client-side form validation enough?</summary>
          <p>
            No. HTML validation improves user experience, but server-side validation
            is required for security and data integrity.
          </p>
        </details>
      </section>

      <section aria-labelledby="feedback">
        <h2 id="feedback">Send feedback</h2>

        <form action="/feedback" method="post">
          <div>
            <label for="feedback-name">Name</label>
            <input
              id="feedback-name"
              name="name"
              type="text"
              autocomplete="name"
              required
              maxlength="80"
            >
          </div>

          <div>
            <label for="feedback-email">Email</label>
            <input
              id="feedback-email"
              name="email"
              type="email"
              autocomplete="email"
              required
            >
          </div>

          <fieldset>
            <legend>Feedback type</legend>

            <div>
              <input id="bug" name="feedbackType" type="radio" value="bug" required>
              <label for="bug">Bug report</label>
            </div>

            <div>
              <input id="improvement" name="feedbackType" type="radio" value="improvement">
              <label for="improvement">Improvement suggestion</label>
            </div>
          </fieldset>

          <div>
            <label for="feedback-message">Message</label>
            <textarea
              id="feedback-message"
              name="message"
              rows="6"
              minlength="10"
              maxlength="2000"
              required
            ></textarea>
          </div>

          <button type="submit">Send feedback</button>
          <button type="button" id="open-help">Submission help</button>
        </form>
      </section>

      <dialog id="help-dialog" aria-labelledby="help-dialog-title">
        <form method="dialog">
          <h2 id="help-dialog-title">Feedback submission help</h2>
          <p>
            Include the page URL, expected behavior, actual behavior, and browser
            version when reporting a defect.
          </p>
          <button value="close">Close</button>
        </form>
      </dialog>
    </article>
  </main>

  <footer>
    <small>&copy; 2026 Example Docs</small>
  </footer>

  <script type="module">
    const openHelpButton = document.querySelector("#open-help");
    const helpDialog = document.querySelector("#help-dialog");

    openHelpButton.addEventListener("click", () => {
      helpDialog.showModal();
    });

    const feedbackForm = document.querySelector("form[action='/feedback']");

    feedbackForm.addEventListener("submit", (event) => {
      const formData = new FormData(feedbackForm);

      // [debugging] Remove this block in production.
      for (const [name, value] of formData.entries()) {
        console.log(`${name}:`, value);
      }

      // [safety] Demo page prevents real submission.
      event.preventDefault();
    });
  </script>
</body>
</html>
```

Mini-project checklist:

| Check                        | Expected result                                   |
| ---------------------------- | ------------------------------------------------- |
| Page has one clear `h1`      | `HTML Release Checklist`                          |
| Main content is reachable    | Skip link targets `#main`                         |
| Navigation is named          | `nav aria-label="Primary"`                        |
| Image is meaningful          | Specific `alt`, dimensions, responsive candidates |
| Table has relationships      | `caption`, `th`, `scope`                          |
| Form controls are named      | `label`, `id`, `name` all present                 |
| Radio group is grouped       | `fieldset` and `legend`                           |
| Dialog is native             | `dialog.showModal()` and `form method="dialog"`   |
| Debugging is explicit        | `FormData` inspection included                    |
| Security assumption is clear | Client validation treated as UX only              |

*Common Pitfalls: A mini-project like this should not be judged only by appearance; validate the markup, inspect the parsed DOM, test keyboard access, check names/roles, and verify the form payload.*

## PART 4 — Best High-Frequency Items to Memorize — HTML5 fluency, semantics, forms, accessibility, loading, safety

This part focuses on the HTML patterns that most directly improve daily professional fluency. The goal is not to memorize every element, but to internalize the decisions that prevent common production defects in semantics, accessibility, forms, performance, and security. 

### Document Skeleton Essentials — `doctype`, `html`, `head`, `body`, `meta`, `title`, viewport

| Item                     | Meaning                    | When to use it                  | Minimal example                                                        | Memory cue                                           | Common pitfall                                              |
| ------------------------ | -------------------------- | ------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------- |
| `<!doctype html>`        | Standards-mode declaration | Every HTML document             | `<!doctype html>`                                                      | “Start in standards mode.”                           | Omitting it can trigger quirks-mode behavior.               |
| `<html lang="en">`       | Root document and language | Every document                  | `<html lang="en">`                                                     | “Declare the language of the content.”               | Using the user’s locale instead of actual content language. |
| `<meta charset="utf-8">` | Character encoding         | Early in `head`                 | `<meta charset="utf-8">`                                               | “Text before tricks.”                                | Placing it late after non-ASCII content.                    |
| Viewport meta            | Mobile viewport control    | Responsive pages                | `<meta name="viewport" content="width=device-width, initial-scale=1">` | “Mobile needs a viewport.”                           | Disabling zoom with `user-scalable=no`.                     |
| `<title>`                | Page title                 | Every page                      | `<title>Account Settings</title>`                                      | “Browser tab, search result, accessibility context.” | Reusing the same title on many pages.                       |
| `meta description`       | Page summary candidate     | Public/searchable pages         | `<meta name="description" content="Manage account settings.">`         | “Search snippet candidate.”                          | Keyword stuffing or generic descriptions.                   |
| `link canonical`         | Preferred URL              | Indexed pages with URL variants | `<link rel="canonical" href="https://example.com/account">`            | “One page, one preferred URL.”                       | Canonical pointing to the wrong environment or page.        |

*Common Pitfalls: A visually correct page without `lang`, viewport, and a useful `title` is still structurally weak.*

### Semantic Page Structure — `main`, `header`, `footer`, `nav`, `section`, `article`, `aside`

| Item      | Meaning                          | When to use it                                          | Minimal example                             | Memory cue                                  | Common pitfall                                        |
| --------- | -------------------------------- | ------------------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| `main`    | Dominant page content            | Once for the main content area                          | `<main id="main">...</main>`                | “Main means main.”                          | Using multiple unrelated `main` regions.              |
| `header`  | Introductory region              | Page or section header                                  | `<header><h1>Docs</h1></header>`            | “Intro, not necessarily top.”               | Assuming it must only appear once.                    |
| `footer`  | Footer information               | Page or section footer                                  | `<footer><small>© 2026</small></footer>`    | “Metadata after content.”                   | Using it for arbitrary bottom layout.                 |
| `nav`     | Navigation links                 | Primary, footer, breadcrumb, local nav                  | `<nav aria-label="Primary">...</nav>`       | “A link cluster with navigational purpose.” | Multiple unlabeled `nav` regions.                     |
| `section` | Thematic section                 | Meaningful region with heading                          | `<section><h2>Billing</h2></section>`       | “Section needs a topic.”                    | Using it as a generic styling wrapper.                |
| `article` | Self-contained composition       | Blog post, docs page, comment, card                     | `<article><h2>Release notes</h2></article>` | “Could stand alone.”                        | Using it for every visual card regardless of meaning. |
| `aside`   | Tangential/complementary content | Related links, side note, callout                       | `<aside>Related articles...</aside>`        | “Useful, but not central.”                  | Placing essential main content inside `aside`.        |
| `div`     | Generic block container          | Styling or scripting hook when no semantic element fits | `<div class="layout-grid">...</div>`        | “No meaning.”                               | Replacing every semantic element with `div`.          |

*Common Pitfalls: `section`, `article`, and `div` are not interchangeable; choose by document meaning, not visual layout.*

### Heading Hierarchy — `h1`, `h2`, `h3`, section labels

| Item                   | Meaning                                  | When to use it                                | Minimal example                            | Memory cue                        | Common pitfall                                     |
| ---------------------- | ---------------------------------------- | --------------------------------------------- | ------------------------------------------ | --------------------------------- | -------------------------------------------------- |
| `h1`                   | Primary page heading                     | Main subject of the page                      | `<h1>HTML Forms Guide</h1>`                | “What is this page?”              | Choosing `h1` for large text styling.              |
| `h2`                   | Major section heading                    | Top-level sections below page title           | `<h2>Validation</h2>`                      | “Main chapters.”                  | Skipping to `h4` because design uses smaller text. |
| `h3`–`h6`              | Nested subsection headings               | Subtopics inside sections                     | `<h3>Error messages</h3>`                  | “Nested structure.”               | Creating decorative headings with no real section. |
| Hidden section heading | Name a region visually omitted by design | Landmark or section needs an accessible label | `<h2 class="visually-hidden">Filters</h2>` | “Invisible does not mean absent.” | Removing needed headings entirely.                 |
| Heading before content | Introduces following content             | Articles, sections, tables, forms             | `<section><h2>Contact</h2>...</section>`   | “Label before detail.”            | Using bold paragraphs instead of headings.         |

*Common Pitfalls: Heading levels should describe hierarchy; CSS should handle size.*

### Links and Buttons — `a`, `href`, `button`, `type`, `target`, `rel`

| Item                      | Meaning              | When to use it                                   | Minimal example                                            | Memory cue                              | Common pitfall                                 |
| ------------------------- | -------------------- | ------------------------------------------------ | ---------------------------------------------------------- | --------------------------------------- | ---------------------------------------------- |
| `a[href]`                 | Navigation link      | Move to URL, route, file, fragment               | `<a href="/docs">Docs</a>`                                 | “Links go somewhere.”                   | Using links for UI actions.                    |
| Fragment link             | In-page navigation   | Jump to element by `id`                          | `<a href="#main">Skip</a>`                                 | “Hash targets IDs.”                     | Target `id` missing or duplicated.             |
| `button`                  | Action control       | Submit, open, close, toggle                      | `<button type="button">Open</button>`                      | “Buttons do something.”                 | Using `div onclick` as a fake button.          |
| `type="button"`           | Non-submit button    | Button inside a form that should not submit      | `<button type="button">Preview</button>`                   | “Forms make buttons submit by default.” | Accidental form submission.                    |
| `type="submit"`           | Form submit button   | Submit current form                              | `<button type="submit">Save</button>`                      | “Send the form.”                        | JavaScript-only submission for ordinary forms. |
| `target="_blank"` + `rel` | New browsing context | External link intentionally opens new tab/window | `<a href="..." target="_blank" rel="noopener noreferrer">` | “Blank needs rel.”                      | Omitting `rel` on external new-tab links.      |
| `download`                | Download hint        | Same-origin downloadable asset                   | `<a href="/report.pdf" download>Download</a>`              | “Link as file save.”                    | Assuming it works identically cross-origin.    |

*Common Pitfalls: Links navigate; buttons act. Breaking that distinction damages semantics, keyboard behavior, and browser affordances.*

### Text and Grouping Semantics — `p`, `strong`, `em`, `code`, `time`, `figure`, `blockquote`, lists

| Item         | Meaning                           | When to use it                            | Minimal example                                  | Memory cue                       | Common pitfall                                                  |
| ------------ | --------------------------------- | ----------------------------------------- | ------------------------------------------------ | -------------------------------- | --------------------------------------------------------------- |
| `p`          | Paragraph                         | Prose block                               | `<p>HTML encodes structure.</p>`                 | “A paragraph, not a wrapper.”    | Putting arbitrary block elements inside a paragraph.            |
| `strong`     | Strong importance                 | Critical warning, important phrase        | `<strong>Do not share tokens.</strong>`          | “Important, not merely bold.”    | Using it only for visual bolding.                               |
| `em`         | Stress emphasis                   | Change sentence emphasis                  | `<em>Never</em> trust client data.`              | “Spoken stress.”                 | Using it for decorative italics.                                |
| `code`       | Code fragment                     | Inline code/token                         | `<code>type="email"</code>`                      | “This is code.”                  | Using it for generic monospace styling.                         |
| `time`       | Machine-readable date/time        | Dates, times, timestamps                  | `<time datetime="2026-05-05">May 5, 2026</time>` | “Human text plus machine value.” | Invalid or missing `datetime` for machine-readable date.        |
| `ul`         | Unordered list                    | Items where order does not change meaning | `<ul><li>HTML</li></ul>`                         | “Set, not sequence.”             | Using line breaks instead of lists.                             |
| `ol`         | Ordered list                      | Steps, rankings, ordered procedures       | `<ol><li>Validate</li></ol>`                     | “Order matters.”                 | Using unordered lists for procedures.                           |
| `figure`     | Self-contained referenced content | Image, chart, code listing                | `<figure>...</figure>`                           | “Can be moved with caption.”     | Using `figure` merely as an image wrapper with no relationship. |
| `figcaption` | Caption for figure                | Explain figure/code/chart                 | `<figcaption>Validation command.</figcaption>`   | “Caption belongs to figure.”     | Replacing meaningful `alt` with only a caption.                 |
| `blockquote` | Extended quotation                | Quoted passage                            | `<blockquote>...</blockquote>`                   | “Block quotation.”               | Using it for indentation.                                       |

*Common Pitfalls: Text semantics should encode meaning; styling decisions belong in CSS.*

### Image Essentials — `img`, `alt`, `width`, `height`, `srcset`, `sizes`, `loading`

| Item               | Meaning                         | When to use it                           | Minimal example                                       | Memory cue                           | Common pitfall                             |
| ------------------ | ------------------------------- | ---------------------------------------- | ----------------------------------------------------- | ------------------------------------ | ------------------------------------------ |
| `src`              | Image URL                       | Every `img`                              | `<img src="/chart.png" alt="...">`                    | “Where the image comes from.”        | Broken relative paths after route changes. |
| `alt`              | Text alternative                | Every `img`                              | `<img src="/chart.png" alt="Revenue increased 18%.">` | “If image disappears, what remains?” | `alt="image"` or filename alt text.        |
| Empty `alt`        | Decorative image                | Pure decoration                          | `<img src="/divider.svg" alt="">`                     | “Decorative means silent.”           | Empty alt on meaningful content.           |
| `width` / `height` | Intrinsic dimensions            | Prevent layout shift                     | `<img width="1280" height="720" ...>`                 | “Reserve the box.”                   | Omitting dimensions for content images.    |
| `srcset`           | Image candidates                | Responsive images                        | `srcset="small.jpg 640w, large.jpg 1280w"`            | “Available sizes.”                   | Wrong width descriptors.                   |
| `sizes`            | Expected rendered width         | Responsive images with width descriptors | `sizes="(max-width: 700px) 100vw, 700px"`             | “How wide will it display?”          | Omitting or inaccurate `sizes`.            |
| `loading="lazy"`   | Lazy load hint                  | Below-the-fold images                    | `<img loading="lazy" ...>`                            | “Delay what is not needed now.”      | Lazy-loading the hero/LCP image.           |
| `decoding="async"` | Decode hint                     | Non-critical images                      | `<img decoding="async" ...>`                          | “Decode without blocking.”           | Treating it as guaranteed behavior.        |
| `picture`          | Art direction / format fallback | Different crops or formats               | `<picture><source ...><img ...></picture>`            | “Different image choices.”           | Forgetting fallback `img`.                 |

*Common Pitfalls: Responsive images require both `srcset` and accurate `sizes`; otherwise the browser may download inefficient assets.*

### Form Essentials — `form`, `label`, `name`, `autocomplete`, validation attributes

| Item                      | Meaning                 | When to use it                    | Minimal example                                   | Memory cue                       | Common pitfall                            |
| ------------------------- | ----------------------- | --------------------------------- | ------------------------------------------------- | -------------------------------- | ----------------------------------------- |
| `form`                    | Submission boundary     | Any grouped submission            | `<form action="/signup" method="post">...</form>` | “Defines what is sent where.”    | Nesting forms.                            |
| `action`                  | Submission destination  | Network form submission           | `action="/contact"`                               | “Where data goes.”               | Wrong relative action after deployment.   |
| `method`                  | Submission method       | `get`, `post`, `dialog`           | `method="post"`                                   | “How data is sent.”              | Using `get` for sensitive data.           |
| `name`                    | Submitted field key     | Every submitted control           | `<input name="email">`                            | “No name, no submitted value.”   | Controls visible but absent from payload. |
| `label for`               | Accessible control name | Every input/select/textarea       | `<label for="email">Email</label>`                | “Label points to ID.”            | Placeholder-only fields.                  |
| `id`                      | Label/ARIA target       | Pair with `label for`             | `<input id="email">`                              | “The label needs a target.”      | Duplicate IDs.                            |
| `required`                | Non-empty constraint    | Required fields                   | `<input required>`                                | “Required for UX, not security.” | Assuming it enforces server trust.        |
| `minlength` / `maxlength` | Text length constraints | Text fields                       | `<input minlength="2" maxlength="80">`            | “Bounds for text.”               | Server allows different limits.           |
| `pattern`                 | Text constraint         | Slugs, codes, constrained strings | `<input pattern="[a-z0-9-]+">`                    | “Regex-like gate.”               | No visible explanation for pattern.       |
| `autocomplete`            | Autofill semantic hint  | Identity, address, payment, login | `autocomplete="email"`                            | “What this value means.”         | Disabling useful autofill.                |
| `fieldset` / `legend`     | Group related controls  | Radio/checkbox groups             | `<fieldset><legend>Plan</legend>...</fieldset>`   | “Question for the options.”      | Radio groups without a group label.       |

*Common Pitfalls: Client-side form validation is usability support; trusted validation must happen server-side.*

### Input Type Essentials — `email`, `url`, `tel`, `number`, `date`, `file`, `radio`, `checkbox`

| Item              | Meaning                 | When to use it                  | Minimal example                                 | Memory cue                      | Common pitfall                                  |
| ----------------- | ----------------------- | ------------------------------- | ----------------------------------------------- | ------------------------------- | ----------------------------------------------- |
| `type="text"`     | General text            | Names, IDs, slugs, postal codes | `<input type="text">`                           | “Text, not necessarily prose.”  | Using `number` for numeric-looking identifiers. |
| `type="email"`    | Email input             | Email address                   | `<input type="email" autocomplete="email">`     | “Email keyboard + syntax hint.” | Assuming it proves deliverability.              |
| `type="url"`      | URL input               | Website/profile URL             | `<input type="url">`                            | “URL syntax.”                   | Rejecting expected user shorthand accidentally. |
| `type="tel"`      | Phone input             | Telephone number                | `<input type="tel" autocomplete="tel">`         | “Phone keypad, not validation.” | Expecting universal phone validation.           |
| `type="number"`   | Numeric quantity        | Count, amount, measurement      | `<input type="number" min="1" step="1">`        | “Quantity, not identifier.”     | Credit cards, ZIP codes, IDs.                   |
| `type="date"`     | Calendar date           | Date-only value                 | `<input type="date">`                           | “Date without time.”            | Assuming identical UI in all browsers.          |
| `type="file"`     | File picker             | Uploads                         | `<input type="file" accept="application/pdf">`  | “Picker hint, not security.”    | Missing `multipart/form-data`.                  |
| `type="checkbox"` | Boolean or multi-select | Terms, preferences              | `<input type="checkbox" name="terms">`          | “Unchecked sends nothing.”      | Expecting unchecked value in payload.           |
| `type="radio"`    | One option from group   | Mutually exclusive choice       | `<input type="radio" name="plan" value="pro">`  | “Same name creates group.”      | Different names for one radio group.            |
| `type="hidden"`   | Hidden submitted value  | Non-secret metadata             | `<input type="hidden" name="csrf" value="...">` | “Hidden is not protected.”      | Trusting hidden values.                         |

*Common Pitfalls: `accept`, `pattern`, `hidden`, and `required` are all client-controlled; they cannot enforce security.*

### Form Submission and Encoding — `get`, `post`, `multipart/form-data`, `dialog`

| Item                                          | Meaning                             | When to use it             | Minimal example                                      | Memory cue                      | Common pitfall                              |
| --------------------------------------------- | ----------------------------------- | -------------------------- | ---------------------------------------------------- | ------------------------------- | ------------------------------------------- |
| `method="get"`                                | Submit through URL query            | Search/filter forms        | `<form method="get" action="/search">`               | “Shareable query.”              | Sending secrets in URL.                     |
| `method="post"`                               | Submit through request body         | Create/update/login/upload | `<form method="post" action="/login">`               | “Changes or sensitive payload.” | Assuming POST alone provides security.      |
| `enctype="application/x-www-form-urlencoded"` | Default encoding                    | Normal forms               | Usually implicit                                     | “Default form encoding.”        | Poor fit for files.                         |
| `enctype="multipart/form-data"`               | Multipart encoding                  | File uploads               | `<form method="post" enctype="multipart/form-data">` | “Files need multipart.”         | File input submits no file as expected.     |
| `method="dialog"`                             | Close dialog with form result       | Dialog confirm/cancel      | `<form method="dialog">`                             | “Dialog-local decision.”        | Expecting network submission.               |
| `formnovalidate`                              | Skip validation for a submit button | Save draft                 | `<button formnovalidate>Save draft</button>`         | “Submit without validation.”    | Accidentally bypassing required validation. |
| `formaction`                                  | Override form action                | Alternate submit endpoint  | `<button formaction="/drafts">Save draft</button>`   | “This button goes elsewhere.”   | Hidden endpoint divergence.                 |

*Common Pitfalls: File upload forms need both `method="post"` and `enctype="multipart/form-data"`.*

### Table Essentials — `table`, `caption`, `thead`, `tbody`, `th`, `td`, `scope`

| Item          | Meaning                  | When to use it             | Minimal example                        | Memory cue               | Common pitfall                                   |
| ------------- | ------------------------ | -------------------------- | -------------------------------------- | ------------------------ | ------------------------------------------------ |
| `table`       | Data grid                | Tabular data relationships | `<table>...</table>`                   | “Data, not layout.”      | Page layout with tables.                         |
| `caption`     | Table title/summary      | Most data tables           | `<caption>Quarterly revenue</caption>` | “What is this table?”    | Omitting context.                                |
| `thead`       | Header row group         | Column headers             | `<thead>...</thead>`                   | “Column labels area.”    | Treating it as purely visual.                    |
| `tbody`       | Body row group           | Data rows                  | `<tbody>...</tbody>`                   | “Data area.”             | Multiple unstructured row groups without reason. |
| `th`          | Header cell              | Row/column header          | `<th scope="col">Status</th>`          | “Header, not data.”      | Using `td` for headers.                          |
| `td`          | Data cell                | Ordinary data              | `<td>Passed</td>`                      | “Data value.”            | Putting all cells as `td`.                       |
| `scope="col"` | Header applies to column | Simple column headers      | `<th scope="col">Name</th>`            | “This names the column.” | Missing scope in accessibility-critical tables.  |
| `scope="row"` | Header applies to row    | First cell labels a row    | `<th scope="row">Q1</th>`              | “This names the row.”    | Repeating row labels as plain data.              |

*Common Pitfalls: A visually clear table may still be difficult for assistive technology if header relationships are not encoded.*

### Native Interaction Essentials — `details`, `summary`, `dialog`, `popover`

| Item                   | Meaning                          | When to use it                       | Minimal example                                                       | Memory cue                     | Common pitfall                            |
| ---------------------- | -------------------------------- | ------------------------------------ | --------------------------------------------------------------------- | ------------------------------ | ----------------------------------------- |
| `details`              | Disclosure container             | Expand/collapse supporting content   | `<details><summary>More</summary><p>...</p></details>`                | “Built-in disclosure.”         | Using it for modal or menu behavior.      |
| `summary`              | Disclosure label                 | First label for `details`            | `<summary>Advanced options</summary>`                                 | “Clickable title.”             | Vague summary text.                       |
| `dialog`               | Dialog box                       | Modal or non-modal focused task      | `<dialog id="confirm">...</dialog>`                                   | “Dialog is a task layer.”      | Forgetting focus management expectations. |
| `showModal()`          | Open modal dialog                | Confirmation, form step              | `dialog.showModal()`                                                  | “Modal top layer.”             | Opening without a clear close path.       |
| `form method="dialog"` | Close dialog through form button | Confirm/cancel dialog                | `<form method="dialog"><button value="cancel">Cancel</button></form>` | “Dialog result form.”          | Expecting server submission.              |
| `popover`              | Native non-modal popover         | Transient help/panel where supported | `<div id="help" popover>...</div>`                                    | “Lightweight top-layer panel.” | Using popover for modal decisions.        |
| `popovertarget`        | Declarative popover trigger      | Button toggles popover               | `<button popovertarget="help">Help</button>`                          | “Button targets panel.”        | Missing matching `id`.                    |

*Common Pitfalls: Native interactive elements reduce custom JavaScript burden, but they still need meaningful labels, sensible focus behavior, and compatibility testing.*

### Global Attributes to Memorize — `id`, `class`, `hidden`, `data-*`, `tabindex`, `lang`, `dir`, `inert`

| Item                | Meaning                        | When to use it                     | Minimal example                        | Memory cue                             | Common pitfall                                   |
| ------------------- | ------------------------------ | ---------------------------------- | -------------------------------------- | -------------------------------------- | ------------------------------------------------ |
| `id`                | Unique identifier              | Labels, fragments, ARIA references | `<h2 id="billing">Billing</h2>`        | “Unique target.”                       | Duplicate IDs.                                   |
| `class`             | Styling/group hook             | CSS/component styling              | `<article class="card">`               | “Many elements can share.”             | JS tied to unstable visual classes.              |
| `data-*`            | Custom data/hook               | JS, tests, analytics               | `<button data-action="dismiss">`       | “Private structured hook.”             | Storing secrets or large state.                  |
| `hidden`            | Hide content                   | Temporarily irrelevant content     | `<section hidden>...</section>`        | “Not currently exposed.”               | Hiding focusable active content carelessly.      |
| `tabindex="-1"`     | Programmatic focus only        | Skip-link target, dialog heading   | `<main tabindex="-1">`                 | “Focusable by script.”                 | Using it everywhere.                             |
| `tabindex="0"`      | Natural tab-order inclusion    | Rare custom interactive patterns   | `<div tabindex="0">`                   | “Enter normal focus order.”            | Making non-interactive content focusable.        |
| Positive `tabindex` | Manual focus order             | Almost never                       | `tabindex="1"`                         | “Avoid.”                               | Broken keyboard order.                           |
| `lang`              | Language override              | Mixed-language content             | `<span lang="fr">raison d’être</span>` | “Pronounce correctly.”                 | One document language for multilingual passages. |
| `dir`               | Text direction                 | RTL or unknown-direction text      | `<bdi dir="auto">...</bdi>`            | “Direction is separate from language.” | Broken bidirectional text.                       |
| `inert`             | Disable interaction in subtree | Background behind modal UI         | `<main inert>...</main>`               | “Temporarily inactive.”                | Forgetting to remove it after closing modal.     |

*Common Pitfalls: `id` is often the hidden dependency behind labels, ARIA, fragments, scripts, and tests; duplicate IDs create cross-cutting bugs.*

### Accessibility Essentials — native-first, names, descriptions, landmarks, focus

| Item                   | Meaning                           | When to use it                    | Minimal example                                  | Memory cue                            | Common pitfall                                    |
| ---------------------- | --------------------------------- | --------------------------------- | ------------------------------------------------ | ------------------------------------- | ------------------------------------------------- |
| Native-first semantics | Use built-in elements before ARIA | Buttons, links, forms, tables     | `<button>Save</button>`                          | “Native before ARIA.”                 | Recreating native controls with `div`.            |
| Accessible name        | Name exposed to assistive tech    | Controls, images, frames, regions | `<button aria-label="Close">…</button>`          | “What is this called?”                | Visible label and accessible name mismatch.       |
| `aria-labelledby`      | Name from visible element         | Dialogs, regions                  | `<section aria-labelledby="title">`              | “Point to the visible label.”         | Broken referenced ID.                             |
| `aria-describedby`     | Extra description                 | Help/error text                   | `<input aria-describedby="email-help">`          | “More information.”                   | Using description as the only label.              |
| `aria-hidden="true"`   | Hide from accessibility tree      | Decorative icons                  | `<svg aria-hidden="true">...</svg>`              | “Silent decoration.”                  | Hiding focusable or meaningful content.           |
| `aria-expanded`        | Expanded/collapsed state          | Disclosure/menu button            | `<button aria-expanded="false">Filters</button>` | “State must be true.”                 | Not updating state with UI.                       |
| `aria-current="page"`  | Current item                      | Navigation                        | `<a aria-current="page" href="/docs">Docs</a>`   | “Current page in set.”                | Applying it to multiple unrelated links.          |
| `role`                 | Explicit semantic role            | Custom widgets only when needed   | `<div role="status">Saved</div>`                 | “Fill gaps, not overwrite good HTML.” | Adding roles that conflict with native semantics. |

*Common Pitfalls: ARIA can change what assistive technologies perceive, but it does not add behavior, validation, focus management, or keyboard support.*

### Internationalization Essentials — `lang`, `dir`, `bdi`, `time`, UTF-8

| Item             | Meaning                    | When to use it                    | Minimal example                                 | Memory cue                           | Common pitfall                                  |
| ---------------- | -------------------------- | --------------------------------- | ----------------------------------------------- | ------------------------------------ | ----------------------------------------------- |
| `lang` on `html` | Main document language     | Every page                        | `<html lang="en">`                              | “Default language.”                  | Wrong language code.                            |
| Inline `lang`    | Local language switch      | Quotes, terms, names              | `<span lang="ja">哲学</span>`                     | “This phrase is another language.”   | Screen readers mispronounce foreign text.       |
| `dir="rtl"`      | Right-to-left direction    | RTL-language pages/sections       | `<html lang="ar" dir="rtl">`                    | “Direction controls flow.”           | Assuming language automatically sets direction. |
| `dir="auto"`     | Infer direction            | User-generated text               | `<p dir="auto">...</p>`                         | “Unknown direction.”                 | Mixed-direction names display incorrectly.      |
| `bdi`            | Bidirectional isolation    | Usernames inside surrounding text | `<bdi>...</bdi>`                                | “Isolate unknown text.”              | User text disturbs surrounding punctuation.     |
| `time datetime`  | Machine-readable date/time | Dates in localized text           | `<time datetime="2026-05-05">5 May 2026</time>` | “Localized outside, precise inside.” | Machine value missing or invalid.               |
| UTF-8            | Universal encoding         | All modern documents              | `<meta charset="utf-8">`                        | “One encoding.”                      | Legacy encoding assumptions.                    |

*Common Pitfalls: Language and direction are separate; correct `lang` does not automatically solve bidirectional layout.*

### Script Loading Essentials — `script`, `type="module"`, `defer`, `async`, JSON-LD

| Item                           | Meaning                            | When to use it                      | Minimal example                                                       | Memory cue                 | Common pitfall                                 |
| ------------------------------ | ---------------------------------- | ----------------------------------- | --------------------------------------------------------------------- | -------------------------- | ---------------------------------------------- |
| Classic parser-blocking script | Blocks parsing                     | Rare critical scripts               | `<script src="/critical.js"></script>`                                | “Stops parser.”            | Placing ordinary app scripts this way.         |
| `defer`                        | Ordered classic script after parse | Classic bundles with dependencies   | `<script src="/app.js" defer></script>`                               | “Deferred, ordered.”       | Using on inline scripts.                       |
| `async`                        | Independent script                 | Analytics, ads, independent widgets | `<script src="/analytics.js" async></script>`                         | “Ready whenever.”          | Dependency race conditions.                    |
| `type="module"`                | ES module script                   | Modern app code                     | `<script type="module" src="/app.js"></script>`                       | “Modern modules.”          | Forgetting module/CORS semantics.              |
| `nomodule`                     | Legacy fallback                    | Old browser support only            | `<script nomodule src="/legacy.js"></script>`                         | “Not for modules.”         | Carrying unnecessary legacy bundle.            |
| JSON-LD script                 | Structured data block              | SEO/entity metadata                 | `<script type="application/ld+json">{}</script>`                      | “Data, not executable JS.” | Invalid JSON or mismatch with visible content. |
| `integrity`                    | Subresource Integrity              | Third-party static scripts          | `<script src="..." integrity="..." crossorigin="anonymous"></script>` | “Hash what you load.”      | Hash mismatch after vendor updates.            |

*Common Pitfalls: `async` is only safe when the script does not depend on other scripts or parsed DOM order.*

### Resource Loading Essentials — `stylesheet`, `preload`, `preconnect`, `dns-prefetch`, `prefetch`

| Item                  | Meaning                                    | When to use it                     | Minimal example                                                  | Memory cue                 | Common pitfall                             |
| --------------------- | ------------------------------------------ | ---------------------------------- | ---------------------------------------------------------------- | -------------------------- | ------------------------------------------ |
| `rel="stylesheet"`    | Load CSS                                   | Normal CSS file                    | `<link rel="stylesheet" href="/site.css">`                       | “Style the document.”      | Too many blocking stylesheets.             |
| `rel="preload"`       | Fetch critical current-page resource early | Critical font/image/script/style   | `<link rel="preload" href="/font.woff2" as="font" crossorigin>`  | “Need it soon.”            | Wrong `as` causing duplicate fetch.        |
| `rel="modulepreload"` | Preload module resource                    | Module-heavy app                   | `<link rel="modulepreload" href="/app.js">`                      | “Prepare module graph.”    | Useless on simple pages.                   |
| `rel="preconnect"`    | Open connection early                      | Critical third-party origin        | `<link rel="preconnect" href="https://cdn.example" crossorigin>` | “Connect before request.”  | Preconnecting to too many origins.         |
| `rel="dns-prefetch"`  | Resolve DNS early                          | Lower-cost third-party preparation | `<link rel="dns-prefetch" href="//cdn.example">`                 | “Name lookup only.”        | Using for same-origin resources.           |
| `rel="prefetch"`      | Fetch likely future resource               | Next page/route                    | `<link rel="prefetch" href="/next-page">`                        | “Maybe later.”             | Prefetching private or unlikely resources. |
| `as`                  | Resource type for preload                  | Preload reuse/prioritization       | `as="image"`                                                     | “Tell browser what it is.” | Missing or incorrect `as`.                 |
| `crossorigin`         | CORS mode for fonts/scripts/etc.           | Fonts, SRI, CORS resources         | `crossorigin`                                                    | “Match fetch mode.”        | Preloaded font not reused.                 |

*Common Pitfalls: Resource hints are performance tools, not decorations; measure them and keep the set small.*

### Iframe and Embed Safety — `iframe`, `title`, `sandbox`, `allow`, `referrerpolicy`, `loading`

| Item             | Meaning                       | When to use it                         | Minimal example                                    | Memory cue                       | Common pitfall                         |
| ---------------- | ----------------------------- | -------------------------------------- | -------------------------------------------------- | -------------------------------- | -------------------------------------- |
| `iframe`         | Nested browsing context       | Embed map, video, widget, preview      | `<iframe src="..." title="..."></iframe>`          | “Page inside page.”              | Missing `title`.                       |
| `title`          | Accessible frame name         | Every meaningful iframe                | `title="Checkout form"`                            | “Name the frame.”                | Generic `title="iframe"`.              |
| `sandbox`        | Restrict iframe capabilities  | Third-party or untrusted content       | `sandbox="allow-scripts"`                          | “Deny first, allow selectively.” | Over-permissive sandbox.               |
| Empty `sandbox`  | Maximum restrictions          | Untrusted static preview               | `sandbox=""`                                       | “Locked box.”                    | Expecting scripts/forms to work.       |
| `allow`          | Permissions Policy delegation | Camera, fullscreen, clipboard, payment | `allow="fullscreen"`                               | “Feature permission boundary.”   | Broad “just in case” permissions.      |
| `referrerpolicy` | Referrer behavior             | Third-party embeds                     | `referrerpolicy="strict-origin-when-cross-origin"` | “Control what URL leaks.”        | Sending full referrer unnecessarily.   |
| `loading="lazy"` | Lazy-load iframe              | Below-fold embeds                      | `<iframe loading="lazy">`                          | “Delay expensive frame.”         | Lazy-loading critical visible content. |
| `srcdoc`         | Inline iframe document        | Sandboxed preview                      | `<iframe sandbox srcdoc="..."></iframe>`           | “HTML inside attribute.”         | Unsafe escaping/sanitization.          |

*Common Pitfalls: `allow-scripts` plus `allow-same-origin` can severely weaken iframe isolation when used on untrusted same-origin content.*

### Security Patterns to Memorize — links, forms, hidden fields, user HTML, third-party code

| Item                        | Meaning                        | When to use it                    | Minimal example                                 | Memory cue                            | Common pitfall                          |
| --------------------------- | ------------------------------ | --------------------------------- | ----------------------------------------------- | ------------------------------------- | --------------------------------------- |
| `rel="noopener noreferrer"` | Protect new-tab external links | `target="_blank"` links           | `<a target="_blank" rel="noopener noreferrer">` | “Blank needs protection.”             | Opener/referrer leakage.                |
| Server validation           | Trusted data validation        | Every form submission             | Server-side rule                                | “Client is advisory.”                 | Trusting HTML constraints.              |
| Hidden fields are mutable   | Hidden does not mean secure    | Non-secret metadata only          | `<input type="hidden" name="returnTo">`         | “Hidden from user, not attacker.”     | Authorization through hidden values.    |
| File `accept` is advisory   | Picker hint only               | File upload UX                    | `<input type="file" accept="image/png">`        | “Hint, not filter.”                   | No server file validation.              |
| User HTML isolation         | Prevent XSS/UI injection       | Previews, comments, CMS           | Sandbox or sanitize                             | “Untrusted markup is code-adjacent.”  | Rendering raw user HTML.                |
| Third-party scripts         | Supply-chain risk              | Analytics/widgets                 | Minimize and review                             | “External code runs with power.”      | Loading scripts casually.               |
| `iframe sandbox`            | Embed isolation                | Third-party/untrusted embeds      | `<iframe sandbox="">`                           | “Start locked.”                       | Adding unnecessary allow tokens.        |
| Context-aware escaping      | Escape for the correct context | User data in HTML/attributes/URLs | Use sanitizer/encoder                           | “HTML, URL, JS, CSS contexts differ.” | One escaping function for all contexts. |

*Common Pitfalls: HTML is part of the security surface because it can navigate, submit, embed, load scripts, delegate permissions, and expose referrers.*

### Validation and Debugging Essentials — validator, DevTools, accessibility tree, keyboard, network

| Item                  | Meaning                      | When to use it                      | Minimal example                       | Memory cue                     | Common pitfall                                |
| --------------------- | ---------------------------- | ----------------------------------- | ------------------------------------- | ------------------------------ | --------------------------------------------- |
| HTML validator        | Checks conformance           | Before release                      | Nu HTML Checker workflow              | “Rendering is not validation.” | Ignoring warnings as harmless.                |
| DevTools Elements     | Inspect parsed DOM           | Layout/selector/DOM bugs            | Browser Elements panel                | “The DOM is truth.”            | Looking only at source.                       |
| Accessibility tree    | Inspect names/roles/states   | Controls, landmarks, images, frames | DevTools Accessibility panel          | “What AT receives.”            | Assuming visible text equals accessible name. |
| Keyboard test         | Verify operability           | Every interactive flow              | Tab, Shift+Tab, Enter, Space, Escape  | “No mouse required.”           | Missing focus styles.                         |
| Network panel         | Inspect resource loading     | Performance/debugging               | Failed resources, duplicate downloads | “HTML schedules network work.” | Bad preload not detected.                     |
| `FormData` inspection | Debug form payload           | Form bugs                           | `new FormData(form)`                  | “What will submit?”            | Missing `name` values.                        |
| Duplicate ID scan     | Prevent broken relationships | Templates, generated markup         | Validator/DevTools                    | “IDs must be unique.”          | Cloned components with fixed IDs.             |

```js id="m1asjk"
// Minimal form payload inspection during debugging.
const form = document.querySelector("form");
const data = new FormData(form);

for (const [name, value] of data.entries()) {
  console.log(name, value);
}
```

*Common Pitfalls: A page can pass a visual QA pass while failing validation, keyboard operation, accessible naming, or form payload correctness.*

### Professional Mini-Checklist to Memorize — release-grade HTML

| Check                            | Pass condition                                                | Common pitfall                          |
| -------------------------------- | ------------------------------------------------------------- | --------------------------------------- |
| Document starts correctly        | `<!doctype html>`, `html lang`, UTF-8, viewport, useful title | Boilerplate copied but not edited       |
| Main structure is semantic       | `header`, `nav`, `main`, sections, footer where meaningful    | Layout-only `div` tree                  |
| Headings form hierarchy          | One clear page subject, logical section levels                | Visual heading sizes drive levels       |
| Links and buttons are distinct   | `a[href]` navigates; `button` acts                            | Fake buttons and `href="#"`             |
| Images have correct alternatives | Meaningful `alt` or empty decorative `alt`                    | Generic alt text                        |
| Forms submit useful data         | Labels, names, autocomplete, constraints, server caveat       | Missing `name`, placeholder-only labels |
| Tables encode relationships      | Caption, headers, `scope`                                     | Visual-only table semantics             |
| Scripts load intentionally       | Module/defer/async chosen by dependency needs                 | Async dependency races                  |
| Embeds are constrained           | Iframes titled, sandboxed, policy-reviewed                    | Unrestricted third-party frame          |
| Accessibility is inspected       | Names, roles, landmarks, focus, keyboard                      | ARIA added without behavior             |
| Internationalization is explicit | `lang`, `dir`, UTF-8, `time` where needed                     | Wrong language/direction                |
| Markup is validated              | Source and parsed DOM checked                                 | “Looks fine” treated as enough          |

*Common Pitfalls: Professional HTML quality is cumulative; a single missing label, duplicate ID, unsafe iframe, or bad script-loading choice can create real production defects.*

## PART 5 — Practical Templates, Examples, Scripts, or Patterns — reusable HTML5 templates, production snippets, safety patterns

Selected mode: `template-first` — HTML is primarily declarative, structural, document-oriented markup, so reusable page templates and compact semantic patterns are the highest-value example format. 

### Complete Template — production base document, metadata, landmarks, resource loading

Use this as a baseline for a public content page, documentation page, or server-rendered application shell.

```html id="html5-base-template"
<!doctype html>
<html lang="en">
<head>
  <!-- [portability] Declare encoding early for predictable Unicode handling. -->
  <meta charset="utf-8">

  <!-- [functionality] Required for responsive layout on mobile browsers. -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- [seo] Keep title unique and page-specific. -->
  <title>Product Documentation — Example Corp</title>

  <!-- [seo] Human-readable page summary; not a substitute for body content. -->
  <meta
    name="description"
    content="Technical documentation for Example Corp products, APIs, release notes, and integration guides."
  >

  <!-- [seo] Use the final production URL, not staging or localhost. -->
  <link rel="canonical" href="https://example.com/docs">

  <!-- [identity] Browser and installation metadata. -->
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#ffffff">

  <!-- [social] Use absolute URLs for social preview images. -->
  <meta property="og:title" content="Product Documentation — Example Corp">
  <meta
    property="og:description"
    content="Technical documentation, API guides, and release notes."
  >
  <meta property="og:image" content="https://example.com/assets/docs-cover.jpg">
  <meta property="og:url" content="https://example.com/docs">

  <!-- [performance] Only preconnect to origins needed early. -->
  <link rel="preconnect" href="https://cdn.example.com" crossorigin>

  <!-- [performance] Preload only critical resources used on this page. -->
  <link
    rel="preload"
    href="/assets/fonts/inter-var.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  >

  <link rel="stylesheet" href="/assets/site.css">

  <!-- [functionality] Module scripts are deferred by default. -->
  <script type="module" src="/assets/site.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to main content</a>

  <header class="site-header">
    <nav aria-label="Primary">
      <a href="/">Home</a>
      <a href="/docs" aria-current="page">Docs</a>
      <a href="/api">API</a>
      <a href="/support">Support</a>
    </nav>
  </header>

  <main id="main" tabindex="-1">
    <h1>Product Documentation</h1>

    <section aria-labelledby="intro-title">
      <h2 id="intro-title">Start here</h2>
      <p>
        Use these guides to integrate, operate, and troubleshoot Example Corp products.
      </p>
    </section>

    <section aria-labelledby="guides-title">
      <h2 id="guides-title">Guides</h2>

      <article class="card" data-component="doc-card">
        <h3>
          <a href="/docs/getting-started">Getting started</a>
        </h3>
        <p>Install the SDK, configure credentials, and make the first request.</p>
      </article>

      <article class="card" data-component="doc-card">
        <h3>
          <a href="/docs/security">Security guide</a>
        </h3>
        <p>Configure authentication, permissions, audit logs, and secure embeds.</p>
      </article>
    </section>
  </main>

  <footer class="site-footer">
    <nav aria-label="Footer">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
      <a href="/status">System status</a>
    </nav>
    <small>&copy; 2026 Example Corp.</small>
  </footer>
</body>
</html>
```

| Reuse this template when                                                      | Adjust before reuse                                                                |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Building public documentation, marketing pages, or server-rendered app shells | `lang`, `title`, `description`, canonical URL, Open Graph image, navigation labels |
| Starting a semantic HTML review baseline                                      | Remove unused preloads and third-party origins                                     |
| Creating a page with crawlable content                                        | Ensure body content is meaningful without depending entirely on JavaScript         |

*Pitfall: Do not copy metadata unchanged across pages; duplicate titles, descriptions, canonical URLs, and Open Graph tags create search and sharing defects.*

### Complete Template — article/documentation page, article semantics, headings, figures, code, JSON-LD

Use this for technical articles, tutorials, policy pages, standards notes, or long-form documentation.

```html id="html5-article-template"
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Secure Iframe Embeds in HTML — Example Docs</title>
  <meta
    name="description"
    content="A practical guide to iframe sandboxing, permissions policy, referrer policy, and accessibility."
  >
  <link rel="canonical" href="https://example.com/docs/secure-iframes">

  <meta property="og:title" content="Secure Iframe Embeds in HTML">
  <meta
    property="og:description"
    content="Sandbox, allow, referrerpolicy, loading, and accessibility patterns for iframe embeds."
  >
  <meta property="og:image" content="https://example.com/assets/secure-iframes-cover.jpg">
  <meta property="og:url" content="https://example.com/docs/secure-iframes">

  <link rel="stylesheet" href="/assets/docs.css">
  <script type="module" src="/assets/docs.js"></script>

  <!-- [seo] Structured data must match visible page content. -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Secure Iframe Embeds in HTML",
    "description": "A practical guide to iframe sandboxing, permissions policy, referrer policy, and accessibility.",
    "datePublished": "2026-05-05",
    "dateModified": "2026-05-05",
    "author": {
      "@type": "Organization",
      "name": "Example Docs"
    }
  }
  </script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to main content</a>

  <header>
    <nav aria-label="Primary">
      <a href="/">Home</a>
      <a href="/docs" aria-current="page">Docs</a>
      <a href="/security">Security</a>
    </nav>
  </header>

  <main id="main">
    <article>
      <header>
        <p>
          <a href="/docs">Documentation</a> /
          <a href="/docs/security">Security</a>
        </p>

        <h1>Secure Iframe Embeds in HTML</h1>

        <p>
          Published
          <time datetime="2026-05-05">May 5, 2026</time>
          by Example Docs.
        </p>
      </header>

      <nav aria-label="Article contents">
        <h2>Contents</h2>
        <ol>
          <li><a href="#problem">Problem</a></li>
          <li><a href="#safe-pattern">Safe embed pattern</a></li>
          <li><a href="#review-checklist">Review checklist</a></li>
        </ol>
      </nav>

      <section id="problem" aria-labelledby="problem-title">
        <h2 id="problem-title">Problem</h2>
        <p>
          An <code>&lt;iframe&gt;</code> creates a nested browsing context.
          This is useful for videos, maps, previews, and third-party widgets,
          but it also introduces accessibility, privacy, and permission risks.
        </p>
      </section>

      <section id="safe-pattern" aria-labelledby="safe-pattern-title">
        <h2 id="safe-pattern-title">Safe embed pattern</h2>

        <figure>
          <pre><code>&lt;iframe
  title="Product onboarding video"
  src="https://video.example.com/embed/onboarding"
  sandbox="allow-scripts allow-presentation"
  allow="fullscreen; picture-in-picture"
  referrerpolicy="strict-origin-when-cross-origin"
  loading="lazy"
  width="1280"
  height="720"
&gt;&lt;/iframe&gt;</code></pre>
          <figcaption>
            A constrained iframe with a specific title, sandbox policy, permissions,
            referrer policy, lazy loading, and dimensions.
          </figcaption>
        </figure>
      </section>

      <section id="review-checklist" aria-labelledby="review-checklist-title">
        <h2 id="review-checklist-title">Review checklist</h2>

        <table>
          <caption>Iframe review requirements</caption>
          <thead>
            <tr>
              <th scope="col">Requirement</th>
              <th scope="col">Reason</th>
              <th scope="col">Release blocker?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Specific <code>title</code></th>
              <td>Names the frame for assistive technology users.</td>
              <td>Yes</td>
            </tr>
            <tr>
              <th scope="row">Minimal <code>sandbox</code></th>
              <td>Restricts embedded content capabilities.</td>
              <td>Yes</td>
            </tr>
            <tr>
              <th scope="row">Reviewed <code>allow</code></th>
              <td>Prevents unnecessary feature delegation.</td>
              <td>Yes</td>
            </tr>
            <tr>
              <th scope="row">Explicit dimensions</th>
              <td>Reduces layout instability.</td>
              <td>Usually</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  </main>

  <footer>
    <small>&copy; 2026 Example Docs.</small>
  </footer>
</body>
</html>
```

| Reuse this template when                                              | Adjust before reuse                                                          |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Publishing an article, tutorial, standard note, or documentation page | Article title, timestamps, canonical URL, structured data, table of contents |
| Writing long-form technical content                                   | Ensure heading hierarchy is logical and anchors are stable                   |
| Producing SEO-sensitive content                                       | Ensure JSON-LD matches visible content                                       |

*Pitfall: JSON-LD, Open Graph metadata, and canonical URLs should describe the same visible page; conflicting metadata causes operational SEO defects.*

### Pattern — accessible contact form, labels, validation, autocomplete, grouped controls

Use this when collecting ordinary user input. Keep labels visible and treat client validation as user assistance only.

```html id="html5-contact-form-pattern"
<form action="/contact" method="post" autocomplete="on">
  <div class="form-field">
    <label for="contact-name">Full name</label>
    <input
      id="contact-name"
      name="fullName"
      type="text"
      autocomplete="name"
      required
      minlength="2"
      maxlength="80"
    >
  </div>

  <div class="form-field">
    <label for="contact-email">Email address</label>
    <input
      id="contact-email"
      name="email"
      type="email"
      autocomplete="email"
      aria-describedby="contact-email-help"
      required
    >
    <p id="contact-email-help">Use an address where replies can be received.</p>
  </div>

  <fieldset>
    <legend>Reason for contact</legend>

    <div>
      <input id="reason-support" name="reason" type="radio" value="support" required>
      <label for="reason-support">Support request</label>
    </div>

    <div>
      <input id="reason-sales" name="reason" type="radio" value="sales">
      <label for="reason-sales">Sales inquiry</label>
    </div>
  </fieldset>

  <div class="form-field">
    <label for="contact-message">Message</label>
    <textarea
      id="contact-message"
      name="message"
      rows="6"
      minlength="10"
      maxlength="2000"
      required
    ></textarea>
  </div>

  <button type="submit">Send message</button>
</form>
```

| Template decision                    | Reason                                          |
| ------------------------------------ | ----------------------------------------------- |
| `label for` + matching `id`          | Creates durable accessible names                |
| `name` on every submitted control    | Ensures values appear in form payload           |
| `autocomplete` tokens                | Supports autofill and assistive workflows       |
| `fieldset` + `legend`                | Names the radio-button group                    |
| Help text with `aria-describedby`    | Adds secondary guidance without replacing label |
| `required`, `minlength`, `maxlength` | Improves client-side feedback                   |

*Pitfall: `required`, `type="email"`, and `maxlength` are not security controls; server-side validation remains mandatory.*

### Pattern — responsive image, `picture`, modern formats, `alt`, layout stability

Use this for content images that need responsive delivery, modern format fallback, and a meaningful text alternative.

```html id="html5-responsive-image-pattern"
<figure>
  <picture>
    <source
      type="image/avif"
      srcset="
        /assets/dashboard-640.avif 640w,
        /assets/dashboard-1280.avif 1280w
      "
      sizes="(max-width: 720px) 100vw, 720px"
    >
    <source
      type="image/webp"
      srcset="
        /assets/dashboard-640.webp 640w,
        /assets/dashboard-1280.webp 1280w
      "
      sizes="(max-width: 720px) 100vw, 720px"
    >
    <img
      src="/assets/dashboard-1280.jpg"
      srcset="
        /assets/dashboard-640.jpg 640w,
        /assets/dashboard-1280.jpg 1280w
      "
      sizes="(max-width: 720px) 100vw, 720px"
      width="1280"
      height="720"
      alt="Analytics dashboard showing revenue, conversion rate, and active-user charts."
      loading="lazy"
      decoding="async"
    >
  </picture>
  <figcaption>Analytics dashboard used by operations teams.</figcaption>
</figure>
```

| Template decision          | Reason                                         |
| -------------------------- | ---------------------------------------------- |
| `picture`                  | Enables format fallback or art direction       |
| AVIF/WebP/JPEG order       | Prefer modern formats while retaining fallback |
| `srcset` width descriptors | Lets browser choose appropriate resource       |
| `sizes`                    | Tells browser expected rendered width          |
| `width` and `height`       | Prevents avoidable layout shift                |
| Specific `alt`             | Communicates image meaning                     |
| `loading="lazy"`           | Appropriate for non-critical below-fold images |

*Pitfall: Do not lazy-load the likely Largest Contentful Paint image; lazy loading belongs on non-critical offscreen media.*

### Pattern — secure iframe embed, sandbox, permissions, referrer policy

Use this for third-party embeds, previews, video players, maps, payment widgets, or isolated internal tools.

```html id="html5-secure-iframe-pattern"
<iframe
  title="Product onboarding video"
  src="https://video.example.com/embed/onboarding"
  width="1280"
  height="720"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  sandbox="allow-scripts allow-presentation"
  allow="fullscreen; picture-in-picture"
  allowfullscreen
>
</iframe>
```

For untrusted user-generated HTML previews, use a much more restrictive baseline:

```html id="html5-untrusted-preview-iframe-pattern"
<iframe
  title="User-generated HTML preview"
  src="/preview/sandboxed/preview-123"
  width="800"
  height="450"
  sandbox=""
  referrerpolicy="no-referrer"
></iframe>
```

| Embed situation           | Recommended posture                                                           |
| ------------------------- | ----------------------------------------------------------------------------- |
| Trusted video provider    | Specific `title`, constrained `sandbox`, narrow `allow`, lazy loading         |
| User-generated preview    | Empty or near-empty `sandbox`, no referrer, no same-origin/script combination |
| Payment/auth provider     | Add only required form, popup, or top-navigation capabilities                 |
| Map/widget embed          | Review geolocation, referrer, and third-party tracking concerns               |
| Internal same-origin tool | Decide whether iframe isolation is actually needed                            |

*Pitfall: `allow-scripts` plus `allow-same-origin` is dangerous for untrusted same-origin content because it can substantially weaken sandbox isolation.*

### Pattern — accessible data table, captions, row/column headers, release checklist

Use this for genuine tabular data. Do not use table markup for visual layout.

```html id="html5-table-pattern"
<table>
  <caption>HTML release checklist</caption>
  <thead>
    <tr>
      <th scope="col">Check</th>
      <th scope="col">Method</th>
      <th scope="col">Release blocker?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">HTML conformance</th>
      <td>Validate source HTML with a conformance checker.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <th scope="row">Keyboard navigation</th>
      <td>Test Tab, Shift+Tab, Enter, Space, and Escape.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <th scope="row">Accessible names</th>
      <td>Inspect links, buttons, inputs, images, and frames.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <th scope="row">Resource loading</th>
      <td>Review Network panel for failed, duplicate, or blocking resources.</td>
      <td>Usually</td>
    </tr>
  </tbody>
</table>
```

| Template decision   | Reason                               |
| ------------------- | ------------------------------------ |
| `caption`           | Provides table-level context         |
| `thead` and `tbody` | Separates header rows from data rows |
| `th scope="col"`    | Names columns                        |
| `th scope="row"`    | Names rows                           |
| Plain `td` for data | Keeps data/header semantics distinct |

*Pitfall: A table that is visually understandable may still be structurally inaccessible if headers are ordinary `td` cells or relationships are not encoded.*

### Pattern — native disclosure, dialog, and popover, minimal JavaScript

Use this when adding interaction that can start from native HTML instead of custom widgets.

```html id="html5-native-interaction-pattern"
<section aria-labelledby="export-title">
  <h2 id="export-title">Export data</h2>

  <details>
    <summary>What is included in the export?</summary>
    <p>
      The export includes profile data, billing metadata, and audit timestamps.
    </p>
  </details>

  <button type="button" popovertarget="retention-help">
    Retention policy help
  </button>

  <aside id="retention-help" popover>
    Export files expire after 24 hours.
  </aside>

  <button type="button" id="open-export-dialog">
    Start export
  </button>

  <dialog id="export-dialog" aria-labelledby="export-dialog-title">
    <form method="dialog">
      <h3 id="export-dialog-title">Start data export?</h3>
      <p>The export may take several minutes to generate.</p>

      <button value="cancel">Cancel</button>
      <button value="confirm">Start export</button>
    </form>
  </dialog>
</section>

<script type="module">
  const openButton = document.querySelector("#open-export-dialog");
  const dialog = document.querySelector("#export-dialog");

  openButton.addEventListener("click", () => {
    dialog.showModal();
  });
</script>
```

| Native primitive       | Best use                           |
| ---------------------- | ---------------------------------- |
| `details` / `summary`  | Persistent inline disclosure       |
| `popover`              | Non-modal transient panel          |
| `dialog`               | Modal or focused task              |
| `form method="dialog"` | Dialog-local confirm/cancel result |
| `button type="button"` | Non-submit action trigger          |

*Pitfall: Popovers are not modal dialogs; do not use them when the user must complete or dismiss a focused blocking task.*

### Pattern — resource loading block, scripts, styles, hints, structured data

Use this as a curated `head` block for pages that need strong metadata, CSS, scripts, and limited performance hints.

```html id="html5-resource-head-pattern"
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>API Authentication Guide — Example Docs</title>
  <meta
    name="description"
    content="Guide to API authentication with access tokens, rotation, permissions, and audit logging."
  >
  <link rel="canonical" href="https://example.com/docs/api-authentication">

  <!-- [performance] Use sparingly; only for origins needed early. -->
  <link rel="preconnect" href="https://cdn.example.com" crossorigin>

  <!-- [performance] Preload only if the resource is definitely needed soon. -->
  <link
    rel="preload"
    href="/assets/fonts/inter-var.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  >

  <link rel="stylesheet" href="/assets/docs.css">

  <!-- Ordered classic scripts should use defer. -->
  <script src="/assets/vendor.js" defer></script>
  <script src="/assets/docs.js" defer></script>

  <!-- Independent scripts may use async. -->
  <script src="https://analytics.example.com/script.js" async></script>

  <!-- Modern app code can use modules. -->
  <script type="module" src="/assets/search.js"></script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "API Authentication Guide",
    "description": "Guide to API authentication with access tokens, rotation, permissions, and audit logging."
  }
  </script>
</head>
```

| Loading choice  | Use when                                                        |
| --------------- | --------------------------------------------------------------- |
| `defer`         | Ordered classic scripts need the parsed document                |
| `async`         | Script is independent and order does not matter                 |
| `type="module"` | Modern JavaScript module entry                                  |
| `preconnect`    | Critical third-party origin is used very early                  |
| `preload`       | Critical current-page resource is discovered too late otherwise |
| JSON-LD script  | Machine-readable structured data matching visible page content  |

*Pitfall: `async` can execute before or after other scripts unpredictably; avoid it for scripts with dependencies.*

### Final Professional Template Checklist — HTML5 reuse criteria, review gates

| Area           | Required check                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------- |
| Document shell | `<!doctype html>`, `html lang`, UTF-8, viewport, useful `title`                                |
| Metadata       | Page-specific description, canonical URL, social metadata where relevant                       |
| Landmarks      | `header`, named `nav`, `main`, `footer` where meaningful                                       |
| Headings       | Logical hierarchy; no heading levels chosen only for visual size                               |
| Links/actions  | `a[href]` for navigation, `button` for actions                                                 |
| Images         | Meaningful `alt` or empty decorative `alt`, dimensions, responsive candidates if needed        |
| Forms          | Labels, `name`, autocomplete, constraints, grouped radio/checkbox controls                     |
| Tables         | `caption`, real header cells, `scope` or explicit headers                                      |
| Interactive UI | Native disclosure/dialog/popover before custom widgets                                         |
| Embeds         | `title`, `sandbox`, `allow`, `referrerpolicy`, dimensions, lazy loading where appropriate      |
| Scripts        | `module`, `defer`, or `async` chosen by dependency model                                       |
| Resource hints | Minimal, measured, and correctly typed with `as`/`crossorigin` where needed                    |
| Accessibility  | Inspect accessible names, roles, landmarks, focus order, keyboard operation                    |
| Security       | Treat user HTML, hidden inputs, file uploads, embeds, and third-party scripts as risk surfaces |
| Validation     | Validate source HTML and inspect parsed DOM before release                                     |


## APPENDIX A — Deprecated, Obsolete, and Not-Recommended HTML5 Patterns — obsolete elements, anti-patterns, replacements

This appendix consolidates patterns that are deprecated, obsolete, unsafe, misleading, or usually wrong in modern HTML. Some still render because browsers preserve backward compatibility, but rendering compatibility is not professional endorsement. The goal is to replace them with semantic HTML, CSS, safe resource loading, and accessible native controls. 

### Presentational Markup — `font`, `center`, `align`, `bgcolor`, visual attributes

**Conceptual frame:** HTML should describe structure and meaning. Visual presentation belongs primarily in CSS. Presentational elements and attributes are legacy patterns from older web authoring eras.

| Not recommended                                             | Replacement                                        | Why                                              |
| ----------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------ |
| `<font face="Arial" size="3" color="red">`                  | CSS `font-family`, `font-size`, `color`            | Presentation belongs in CSS                      |
| `<center>...</center>`                                      | CSS `text-align`, flex/grid layout                 | Obsolete presentational element                  |
| `align="center"`                                            | CSS `text-align` or layout rules                   | Presentational attribute                         |
| `bgcolor="#fff"`                                            | CSS `background-color`                             | Presentational attribute                         |
| `border`, `cellpadding`, `cellspacing` on tables for design | CSS table styling                                  | Markup should encode table structure, not design |
| `<big>`                                                     | CSS `font-size`                                    | Obsolete visual element                          |
| `<strike>`                                                  | `del` for deletion, CSS for visual strike-through  | `strike` is obsolete                             |
| `<tt>`                                                      | `code`, `kbd`, `samp`, or CSS depending on meaning | `tt` is obsolete teletype styling                |

```html id="0rp755"
<!-- Avoid -->
<center>
  <font color="red">Important update</font>
</center>

<!-- Prefer -->
<p class="notice notice--important">Important update</p>
```

The CSS can then express presentation:

```css id="2to8t1"
.notice {
  text-align: center;
}

.notice--important {
  color: #b00020;
}
```

*Common Pitfalls: Replacing every obsolete visual tag with `div` or `span` is only half a fix; choose semantic HTML first, then apply CSS.*

### Layout Anti-Patterns — table layout, spacer GIFs, `<br>` spacing, empty elements

**Conceptual frame:** HTML layout hacks usually damage accessibility, source readability, responsive behavior, and maintainability. CSS layout systems should handle visual arrangement.

| Not recommended                              | Replacement                             | Why                                 |
| -------------------------------------------- | --------------------------------------- | ----------------------------------- |
| Tables for page layout                       | CSS Grid, Flexbox, normal document flow | Tables imply data relationships     |
| Spacer GIFs                                  | CSS margin, padding, gap, layout        | Obsolete image-based spacing        |
| Repeated `<br><br><br>` for vertical spacing | CSS margins                             | Line breaks are content, not layout |
| Empty paragraphs for spacing                 | CSS margins                             | Creates meaningless document nodes  |
| Empty headings for spacing                   | CSS margins                             | Breaks heading navigation           |
| Nested layout tables                         | CSS layout                              | Complex, inaccessible source order  |
| `&nbsp;` chains for indentation              | CSS spacing                             | Non-semantic and fragile            |
| Inline `style` everywhere                    | External or component CSS               | Hard to cache, audit, and refactor  |

```html id="tghfgr"
<!-- Avoid -->
<table>
  <tr>
    <td>
      <img src="/spacer.gif" alt="" width="24" height="1">
    </td>
    <td>Main content</td>
  </tr>
</table>

<!-- Prefer -->
<main class="page-layout">
  <section>
    <h1>Main content</h1>
    <p>Use CSS for spacing and layout.</p>
  </section>
</main>
```

*Common Pitfalls: Layout tables may look acceptable visually but expose false row/column relationships to assistive technologies and complicate responsive design.*

### Fake Interactive Controls — `div onclick`, `span` buttons, `a href="#"`, nested controls

**Conceptual frame:** Interactive semantics are not visual. Native controls provide keyboard behavior, focus handling, accessible roles, disabled state, form integration, and browser affordances.

| Not recommended                              | Replacement                                       | Why                                                 |
| -------------------------------------------- | ------------------------------------------------- | --------------------------------------------------- |
| `<div onclick="save()">Save</div>`           | `<button type="button">Save</button>`             | Native keyboard and accessibility behavior          |
| `<span role="button">Submit</span>`          | `<button type="submit">Submit</button>`           | Native button is simpler and more robust            |
| `<a href="#" onclick="openModal()">Open</a>` | `<button type="button">Open</button>`             | Links navigate; buttons act                         |
| Button inside link                           | Separate link and button                          | Nested interactive controls are invalid/problematic |
| Link inside button                           | Separate controls                                 | Conflicting interaction semantics                   |
| Clickable card with multiple nested links    | Use one main link or clear separate controls      | Avoid ambiguous activation                          |
| Disabled link using CSS only                 | Use button with `disabled`, or remove link target | CSS alone does not disable navigation               |
| Custom checkbox from `div`                   | `<input type="checkbox">` + `label`               | Native state and form submission                    |

```html id="axwogw"
<!-- Avoid -->
<a href="#" onclick="openDialog()">Open settings</a>

<!-- Prefer -->
<button type="button" id="open-settings">
  Open settings
</button>
```

If a control is inside a form and should not submit the form:

```html id="mb40q0"
<button type="button">Preview</button>
```

*Common Pitfalls: Adding `role="button"` does not add Enter/Space activation, disabled behavior, form semantics, or correct focus handling by itself.*

### Link Anti-Patterns — missing `href`, unsafe `target`, vague text, broken fragments

**Conceptual frame:** Links are navigation primitives. They should have valid destinations, meaningful text, and safe relationship attributes when opening new contexts.

| Not recommended                           | Replacement                                | Why                                     |
| ----------------------------------------- | ------------------------------------------ | --------------------------------------- |
| `<a>Read more</a>` without `href`         | Add `href` or use `button`                 | Without `href`, it is not a normal link |
| `<a href="#">Open menu</a>`               | `<button type="button">Open menu</button>` | `#` creates fake navigation             |
| `target="_blank"` without `rel`           | Add `rel="noopener noreferrer"`            | Reduces opener/referrer risk            |
| Link text: “click here”                   | Descriptive link text                      | Better scanning and accessibility       |
| Fragment link to missing `id`             | Ensure unique target `id`                  | Prevents broken in-page navigation      |
| Multiple elements with same fragment `id` | Unique IDs                                 | Deterministic navigation and scripting  |
| Download link without file context        | Include file type/size when useful         | Improves user expectation               |
| `javascript:` URLs                        | Real links/buttons + external JS           | Security and maintainability risk       |

```html id="cgq0qs"
<!-- Avoid -->
<a href="https://external.example.com" target="_blank">click here</a>

<!-- Prefer -->
<a
  href="https://external.example.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Read the external security report
</a>
```

*Common Pitfalls: A link with vague text may be unusable when read out of context in a screen reader’s links list.*

### Form Anti-Patterns — missing labels, missing `name`, placeholder-only UX, wrong input types

**Conceptual frame:** Forms are data contracts and accessibility structures. Every form control needs a name, an accessible label, and a validation strategy that does not rely on client-side checks alone.

| Not recommended                           | Replacement                                   | Why                                               |
| ----------------------------------------- | --------------------------------------------- | ------------------------------------------------- |
| Placeholder-only input                    | Visible `<label>`                             | Placeholder disappears and is not a durable label |
| Input without `name`                      | Add `name`                                    | Unnamed controls are not submitted                |
| Duplicate `id` on fields                  | Unique `id` values                            | Labels and ARIA references break                  |
| `type="number"` for ZIP/card/account ID   | `type="text"` + `inputmode`                   | Identifiers are not quantities                    |
| File upload without `multipart/form-data` | `method="post" enctype="multipart/form-data"` | Required for ordinary file upload                 |
| Radio buttons without `fieldset`/`legend` | Group with `fieldset` and `legend`            | Users need the group question                     |
| Client-only validation                    | Server-side validation too                    | Client constraints are bypassable                 |
| `disabled` field expected in submission   | Use `readonly` where appropriate              | Disabled controls are not submitted               |
| `autocomplete="off"` everywhere           | Use correct autocomplete tokens               | Password managers/autofill help users             |
| Reset button by default                   | Usually omit reset button                     | Prevents accidental data loss                     |

```html id="a8y376"
<!-- Avoid -->
<input placeholder="Email">

<!-- Prefer -->
<label for="email">Email address</label>
<input
  id="email"
  name="email"
  type="email"
  autocomplete="email"
  required
>
```

Numeric-looking identifier:

```html id="qoq2pm"
<label for="postal-code">Postal code</label>
<input
  id="postal-code"
  name="postalCode"
  type="text"
  inputmode="numeric"
  autocomplete="postal-code"
>
```

*Common Pitfalls: `required`, `pattern`, `accept`, hidden fields, and input types are client-side hints or constraints, not trusted validation.*

### Table Anti-Patterns — layout tables, missing `caption`, `td` headers, complex merged cells

**Conceptual frame:** Tables should encode data relationships. If the goal is visual alignment, use CSS. If the goal is data, encode headers and captions properly.

| Not recommended                                    | Replacement                             | Why                                       |
| -------------------------------------------------- | --------------------------------------- | ----------------------------------------- |
| Table for page layout                              | CSS Grid/Flexbox                        | Layout tables create false data semantics |
| Data table without `caption`                       | Add `caption`                           | Provides table context                    |
| Header cells written as `td`                       | Use `th`                                | Encodes header relationship               |
| Missing `scope` in simple tables                   | Add `scope="col"` / `scope="row"`       | Improves accessible navigation            |
| Deeply nested tables                               | Simplify structure or use CSS           | Hard to parse and maintain                |
| Excessive `rowspan` / `colspan`                    | Simpler normalized table                | Easier to navigate and export             |
| Empty cells for spacing                            | CSS spacing                             | Empty data cells imply missing data       |
| Responsive table by hiding columns without context | Provide alternative summaries or labels | Can remove necessary relationships        |

```html id="5r0bax"
<!-- Avoid -->
<table>
  <tr>
    <td>Status</td>
    <td>Owner</td>
  </tr>
  <tr>
    <td>Passed</td>
    <td>QA</td>
  </tr>
</table>

<!-- Prefer -->
<table>
  <caption>Release review status</caption>
  <thead>
    <tr>
      <th scope="col">Status</th>
      <th scope="col">Owner</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Passed</td>
      <td>QA</td>
    </tr>
  </tbody>
</table>
```

*Common Pitfalls: Visual table styling does not create header relationships; `th`, `scope`, `caption`, and sometimes `headers` are structural requirements.*

### Image and Media Anti-Patterns — bad `alt`, missing dimensions, autoplay, no captions

**Conceptual frame:** Images and media participate in accessibility, performance, layout stability, and content meaning. Treat them as structured content, not decoration by default.

| Not recommended                             | Replacement                                           | Why                                    |
| ------------------------------------------- | ----------------------------------------------------- | -------------------------------------- |
| `alt="image"`                               | Meaningful `alt` or `alt=""`                          | Generic alt is noise                   |
| Missing `alt`                               | Add appropriate `alt`                                 | Accessibility requirement              |
| Meaningful image with `alt=""`              | Descriptive `alt`                                     | Otherwise content disappears           |
| Decorative image with verbose `alt`         | `alt=""`                                              | Avoids screen-reader noise             |
| Missing `width`/`height`                    | Add intrinsic dimensions                              | Reduces layout shift                   |
| Lazy-loading hero image                     | Eager/default loading, possibly `fetchpriority`       | Hero may be LCP-critical               |
| `srcset` without accurate `sizes`           | Add correct `sizes`                                   | Prevents inefficient image choice      |
| Video without captions                      | Add `track kind="captions"`                           | Accessibility                          |
| Autoplay audio/video                        | User-initiated playback                               | Avoids disruption and blocked playback |
| Custom media controls without accessibility | Native `controls` or fully accessible custom controls | Native controls are robust             |

```html id="nid50g"
<!-- Avoid -->
<img src="/chart.png" alt="image">

<!-- Prefer -->
<img
  src="/chart.png"
  width="1280"
  height="720"
  alt="Revenue chart showing 18 percent growth from Q1 to Q2."
>
```

```html id="liw29p"
<video controls preload="metadata" width="1280" height="720">
  <source src="/demo.webm" type="video/webm">
  <source src="/demo.mp4" type="video/mp4">
  <track
    kind="captions"
    src="/demo.en.vtt"
    srclang="en"
    label="English captions"
    default
  >
</video>
```

*Common Pitfalls: Captions and transcripts are not optional extras for important spoken content; they are part of making the media usable.*

### Accessibility Anti-Patterns — ARIA overuse, positive `tabindex`, hidden focus, visual-only labels

**Conceptual frame:** Accessibility failures often come from custom markup that replaces native behavior. Native HTML first, ARIA second, custom widget behavior only when necessary.

| Not recommended                            | Replacement                              | Why                                        |
| ------------------------------------------ | ---------------------------------------- | ------------------------------------------ |
| ARIA role replacing correct native element | Use native element                       | Native behavior is more complete           |
| `role="button"` on `div`                   | `<button>`                               | Native keyboard/focus/disabled semantics   |
| Positive `tabindex`                        | Natural DOM order                        | Positive values create fragile focus order |
| Removing focus outline without replacement | Visible custom focus style               | Keyboard users need focus location         |
| `aria-hidden="true"` on focusable content  | Do not hide focusable meaningful content | Creates inaccessible focus traps           |
| `aria-label` conflicting with visible text | Use visible text or `aria-labelledby`    | Avoid mismatched experiences               |
| Placeholder as label                       | Visible label                            | Durable accessible name                    |
| Icon-only button without name              | Add visible text or `aria-label`         | Button needs accessible name               |
| Dynamic update without announcement        | Use appropriate live region              | Important state changes may be missed      |
| Modal `div` without focus management       | Native `dialog` or robust modal pattern  | Focus containment/restoration required     |

```html id="ejnvvy"
<!-- Avoid -->
<div role="button" tabindex="0" onclick="closePanel()">X</div>

<!-- Prefer -->
<button type="button" aria-label="Close panel">
  <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
    <!-- icon path -->
  </svg>
</button>
```

*Common Pitfalls: ARIA can expose semantics to assistive technologies, but it cannot create native keyboard behavior or repair poor interaction design automatically.*

### Script Loading Anti-Patterns — parser blocking, careless `async`, inline scripts, dependency races

**Conceptual frame:** Script loading affects parsing, execution order, rendering, performance, and security. Choose `module`, `defer`, or `async` based on dependency and timing needs.

| Not recommended                                | Replacement                                                | Why                                       |
| ---------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------- |
| Ordinary app script in `head` without `defer`  | `type="module"` or `defer`                                 | Avoid parser blocking                     |
| `async` for dependent scripts                  | `defer` or module imports                                  | `async` execution order is not guaranteed |
| Many inline scripts                            | External scripts with CSP strategy                         | Easier caching and safer policy           |
| Third-party scripts loaded synchronously       | `async`, isolation, or removal                             | Reduces blocking and risk                 |
| JSON data embedded as executable JS            | `script type="application/json"` or JSON-LD as appropriate | Avoid code execution context              |
| Legacy `nomodule` bundle without legacy target | Remove unnecessary fallback                                | Reduces complexity                        |
| Pre-hydration scripts depending on missing DOM | Use `defer`, modules, or place after relevant markup       | Prevents null selector bugs               |
| No error reporting for cross-origin scripts    | Use `crossorigin` and server CORS where appropriate        | Better debugging                          |

```html id="ts9ygb"
<!-- Avoid: dependency race -->
<script src="/vendor.js" async></script>
<script src="/app.js" async></script>

<!-- Prefer: ordered classic scripts -->
<script src="/vendor.js" defer></script>
<script src="/app.js" defer></script>

<!-- Or prefer modern modules -->
<script type="module" src="/app.js"></script>
```

*Common Pitfalls: `async` is for independent scripts; it is usually wrong for app code that depends on another script or the parsed document order.*

### Resource Hint Anti-Patterns — excessive preload, wrong `as`, unnecessary preconnect

**Conceptual frame:** Resource hints are performance tools. They are useful only when they match the actual critical path. Overuse can make performance worse.

| Not recommended                                | Replacement                                  | Why                                              |
| ---------------------------------------------- | -------------------------------------------- | ------------------------------------------------ |
| Preloading many assets                         | Preload only critical current-page assets    | Avoids bandwidth competition                     |
| Wrong `as` on preload                          | Correct `as` value                           | Prevents duplicate downloads and priority errors |
| Font preload without `crossorigin` when needed | Add `crossorigin`                            | Enables response reuse                           |
| Preconnect to many origins                     | Preconnect only critical early origins       | Avoids wasted sockets                            |
| `dns-prefetch` same-origin                     | Usually omit                                 | Same-origin already known                        |
| Prefetch private/sensitive pages               | Avoid or gate carefully                      | Privacy and correctness concerns                 |
| Preloading unused route assets                 | Lazy load or prefetch only likely next route | Avoids wasted network                            |
| Treating hints as guarantees                   | Measure in DevTools/performance tools        | Browser may ignore or reprioritize               |

```html id="r39cz3"
<!-- Avoid: vague and possibly ineffective -->
<link rel="preload" href="/assets/font.woff2">

<!-- Prefer -->
<link
  rel="preload"
  href="/assets/font.woff2"
  as="font"
  type="font/woff2"
  crossorigin
>
```

*Common Pitfalls: A bad preload can cause the browser to fetch the same resource twice or delay more important resources.*

### Embed and Iframe Anti-Patterns — unrestricted embeds, missing `title`, broad permissions

**Conceptual frame:** Iframes are nested browsing contexts. They can affect security, privacy, accessibility, loading, and user trust.

| Not recommended                                                   | Replacement                                         | Why                                    |
| ----------------------------------------------------------------- | --------------------------------------------------- | -------------------------------------- |
| Iframe without `title`                                            | Add specific `title`                                | Names frame for assistive technologies |
| Third-party iframe without sandbox review                         | Use `sandbox` with minimal tokens                   | Restricts capabilities                 |
| Broad `allow` permissions                                         | Delegate only necessary features                    | Reduces privacy/security exposure      |
| Missing `referrerpolicy` on sensitive embeds                      | Add appropriate policy                              | Controls referrer leakage              |
| `srcdoc` with unsanitized user HTML                               | Sanitize or isolate in sandbox                      | Prevents injection                     |
| Unbounded iframe dimensions                                       | Set dimensions and responsive CSS                   | Avoids layout instability              |
| Lazy-loading critical iframe                                      | Load normally if immediately needed                 | Avoids delayed visible content         |
| Same-origin untrusted iframe with scripts and same-origin allowed | Avoid `allow-scripts allow-same-origin` combination | Weakens isolation                      |

```html id="7su8j8"
<!-- Avoid -->
<iframe src="https://third-party.example/widget"></iframe>

<!-- Prefer -->
<iframe
  title="Support chat widget"
  src="https://third-party.example/widget"
  width="360"
  height="640"
  loading="lazy"
  sandbox="allow-scripts allow-forms allow-popups"
  allow="clipboard-write"
  referrerpolicy="strict-origin-when-cross-origin"
></iframe>
```

*Common Pitfalls: `sandbox` should start restrictive; adding tokens should be a documented decision, not a copied default.*

### Metadata and SEO Anti-Patterns — duplicate titles, wrong canonical, metadata mismatch

**Conceptual frame:** Metadata should accurately identify the current page. Search/social metadata and structured data must match visible content and production URLs.

| Not recommended                       | Replacement                        | Why                                   |
| ------------------------------------- | ---------------------------------- | ------------------------------------- |
| Same `<title>` on every page          | Unique page-specific title         | Clear page identity                   |
| Missing description on public pages   | Specific meta description          | Better snippet candidate              |
| Canonical points to staging/localhost | Production canonical URL           | Avoids indexing wrong URL             |
| Multiple conflicting canonicals       | One intended canonical             | Reduces ambiguity                     |
| Open Graph image as relative URL      | Absolute URL                       | Social parsers often require absolute |
| Structured data not visible on page   | Align JSON-LD with visible content | Search guideline compliance           |
| Keyword-stuffed metadata              | Human-readable metadata            | Quality and trust                     |
| `noindex` accidentally deployed       | Review robots directives           | Can remove pages from search          |
| Wrong `hreflang` alternates           | Reciprocal, accurate language URLs | International SEO correctness         |

```html id="7rqu7i"
<!-- Avoid -->
<title>Home</title>
<link rel="canonical" href="http://localhost:3000/page">

<!-- Prefer -->
<title>HTML Form Validation Guide — Example Docs</title>
<link rel="canonical" href="https://example.com/docs/html-form-validation">
```

*Common Pitfalls: Metadata copied from a template often becomes harmful when canonical URLs, titles, Open Graph tags, or robots directives are not updated per page.*

### Internationalization Anti-Patterns — wrong `lang`, missing `dir`, rigid names, local-only assumptions

**Conceptual frame:** Internationalization begins in markup. Language, direction, names, dates, addresses, and phone numbers require flexible structure.

| Not recommended                                       | Replacement                                        | Why                                            |
| ----------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------- |
| Missing `html lang`                                   | Add actual document language                       | Screen readers/search/language tools           |
| Wrong language code                                   | Use correct BCP 47 language tag                    | Correct pronunciation/processing               |
| No inline `lang` for substantial foreign text         | Add `lang` to phrase/section                       | Better pronunciation and spellcheck            |
| Assuming language implies direction                   | Add `dir` where needed                             | Direction and language are distinct            |
| User-generated mixed-direction text without isolation | Use `bdi` or `dir="auto"`                          | Prevents bidi spillover                        |
| Hardcoded first/last-name assumptions                 | Flexible name fields or localized forms            | Global naming conventions vary                 |
| Postal code as `number`                               | Text input with appropriate autocomplete/inputmode | Postal codes may contain letters/leading zeros |
| Localized visible date without machine value          | Use `time datetime`                                | Machine-readable date remains stable           |

```html id="fpzxaw"
<p>
  The term <span lang="fr">raison d’être</span> appears in this English paragraph.
</p>

<p>
  Submitted by <bdi dir="auto">ليلى</bdi>.
</p>
```

*Common Pitfalls: Correct `lang` improves language processing, but it does not automatically fix bidirectional text; use `dir`, `bdi`, or `dir="auto"` when direction is uncertain.*

### Custom Element and Template Anti-Patterns — duplicate IDs, inaccessible custom controls, JS-only content

**Conceptual frame:** Web Component-related markup is valid HTML, but custom elements are not automatically accessible or functional. Templates are inert until cloned.

| Not recommended                                   | Replacement                                       | Why                                                      |
| ------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------- |
| Custom element used as native button              | Use native button or implement full behavior      | Custom element has no native button semantics by default |
| Fixed IDs inside cloned templates                 | Generate unique IDs or avoid ID dependencies      | Prevents duplicate ID bugs                               |
| Essential content only inside inert `template`    | Provide visible/server-rendered baseline          | Template content is not rendered initially               |
| Custom element without hyphen                     | Valid custom element names require hyphen         | Avoids conflict with future native elements              |
| Slot names changed casually                       | Treat slots as public API                         | Prevents component breakage                              |
| Shadow DOM component with poor labels             | Expose accessible names intentionally             | Encapsulation can hide relationships                     |
| Form-like custom element without form association | Use native controls or implement form association | Native forms will not submit values automatically        |

```html id="ziqdh9"
<!-- Avoid if cloned repeatedly with fixed IDs -->
<template id="field-template">
  <label for="email">Email</label>
  <input id="email" name="email" type="email">
</template>

<!-- Prefer using generated unique IDs during cloning, or avoid cloning fixed ID relationships blindly. -->
```

*Common Pitfalls: A custom element can look like a control while lacking native roles, keyboard behavior, form submission, labels, and validation.*

### Obsolete Element Quick Inventory — old tags, replacements, notes

| Obsolete / legacy element | Modern replacement                    | Note                                         |
| ------------------------- | ------------------------------------- | -------------------------------------------- |
| `acronym`                 | `abbr`                                | Use `abbr title="..."` where expansion helps |
| `applet`                  | `object`, `embed`, or modern web APIs | Java applets are obsolete                    |
| `basefont`                | CSS typography                        | Presentational                               |
| `big`                     | CSS `font-size`                       | Presentational                               |
| `blink`                   | Do not use                            | Harmful/disruptive                           |
| `center`                  | CSS layout/alignment                  | Presentational                               |
| `dir`                     | `ul`                                  | Directory list obsolete                      |
| `font`                    | CSS typography                        | Presentational                               |
| `frame`                   | `iframe` or modern layout             | Framesets obsolete                           |
| `frameset`                | Normal document + CSS/layout          | Frameset model obsolete                      |
| `marquee`                 | CSS animations only when appropriate  | Usually bad UX                               |
| `noframes`                | Not relevant                          | Framesets obsolete                           |
| `strike`                  | `del` or CSS                          | Use semantic deletion if content removed     |
| `tt`                      | `code`, `kbd`, `samp`, CSS            | Pick semantic meaning                        |
| `xmp`                     | `pre` + `code` with escaping          | Obsolete raw text behavior                   |

*Common Pitfalls: Some obsolete elements still render in browsers, but validators, accessibility reviews, maintainability standards, and modern codebases should reject them.*

### Usually-Wrong but Not Always Obsolete — context-sensitive caution list

| Pattern           | Sometimes acceptable?             | Usually wrong because                      |
| ----------------- | --------------------------------- | ------------------------------------------ |
| `div` everywhere  | Yes, for generic grouping         | Erases semantics when native elements fit  |
| `span` everywhere | Yes, for inline hooks             | Replaces meaningful text semantics         |
| `br`              | Yes, addresses/poetry/line breaks | Misused for paragraph spacing              |
| `hr`              | Yes, thematic break               | Misused as decorative rule                 |
| `title` attribute | Sometimes advisory text           | Poor primary accessibility mechanism       |
| Inline `style`    | Sometimes dynamic/critical        | Hard to maintain and audit                 |
| `contenteditable` | Yes, rich editors                 | Complex sanitization/accessibility         |
| `autofocus`       | Sometimes focused workflows       | Can disorient users                        |
| `disabled`        | Yes, unavailable controls         | Values not submitted                       |
| `readonly`        | Yes, submitted uneditable text    | Not available for all controls             |
| `hidden`          | Yes, irrelevant content           | Hidden content not exposed                 |
| `aria-label`      | Yes, icon-only controls           | Can diverge from visible text              |
| `role`            | Yes, custom widgets               | Often misused to override native semantics |
| `tabindex="0"`    | Yes, custom focus target          | Makes non-interactive things focusable     |
| `preload`         | Yes, measured critical resources  | Overuse hurts loading priorities           |

*Common Pitfalls: “Not obsolete” does not mean “recommended”; many features are valid but harmful when used without the right context.*

### Code Review Checklist — detecting obsolete and not-recommended HTML

| Review question                   | Red flag                                            | Preferred outcome                        |
| --------------------------------- | --------------------------------------------------- | ---------------------------------------- |
| Is the element semantic?          | `div`/`span` used for everything                    | Native elements where meaningful         |
| Is styling encoded in HTML?       | `font`, `center`, `align`, inline styles everywhere | CSS handles presentation                 |
| Are controls native?              | Clickable `div`, fake links                         | `button`, `a[href]`, form controls       |
| Are links meaningful?             | `href="#"`, “click here”                            | Real destinations and descriptive text   |
| Are forms submit-ready?           | Missing `name`, placeholder-only labels             | Labels, names, autocomplete, constraints |
| Are tables real data tables?      | Layout table or `td` headers                        | CSS layout or proper table headers       |
| Are images accessible?            | Missing/bad `alt`, no dimensions                    | Correct alt and dimensions               |
| Is ARIA necessary?                | ARIA replacing native HTML                          | Native-first structure                   |
| Are embeds constrained?           | Iframe without title/sandbox/policy review          | Named and constrained iframe             |
| Are scripts loaded intentionally? | Parser-blocking app scripts, careless async         | Module/defer/async by dependency model   |
| Are resource hints measured?      | Many preloads/preconnects                           | Minimal critical hints                   |
| Is metadata page-specific?        | Copied title/canonical/OG data                      | Accurate current-page metadata           |
| Are IDs unique?                   | Reused IDs in templates/components                  | Stable unique identifiers                |

*Common Pitfalls: Obsolete HTML cleanup should not be a mechanical tag replacement exercise; the replacement must restore semantics, accessibility, security, and maintainability.*
