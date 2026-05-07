---
title: CSS - Quick Reference
categories: Notes
subclass: Webdev
---

## PART 1 — The Macro Lens

### What CSS Is — stylesheet language, structured documents, rendering

CSS, *Cascading Style Sheets*, is a declarative language for describing how structured documents are presented across media such as screens, print, and other output contexts. The W3C CSS Snapshot defines CSS as a language for describing the rendering of structured documents such as HTML and XML; modern CSS is not a single monolithic specification but a family of modules that collectively define selectors, cascade, layout, color, typography, animation, conditional rules, and many other rendering behaviors. ([W3C][1])

CSS solves the problem of separating **document meaning** from **document presentation**. HTML should express structure and semantics: headings, paragraphs, links, forms, tables, navigation, articles, controls. CSS controls the visual and spatial representation of that structure: typography, colors, spacing, layout, responsive behavior, interaction states, motion, and print styling.

A professional CSS mental model starts with this distinction:

| Layer                   | Primary Responsibility                                                           | Typical Technology                |
| ----------------------- | -------------------------------------------------------------------------------- | --------------------------------- |
| Structure and semantics | Meaning, document outline, accessibility tree, form controls, links, data tables | HTML                              |
| Presentation            | Layout, typography, color, spacing, visual states, responsive behavior           | CSS                               |
| Behavior                | Events, state transitions, data fetching, DOM mutation, application logic        | JavaScript                        |
| Assets                  | Fonts, images, icons, media, design tokens                                       | Static files, CDN, build pipeline |
| Runtime rendering       | Style calculation, layout, paint, compositing                                    | Browser engine                    |

CSS is therefore not a drawing API and not a general-purpose programming language. It is a rule system that participates in the browser’s rendering pipeline.

*Common Pitfalls: Treating CSS as “visual decoration only” leads to inaccessible focus states, fragile layout, broken responsive behavior, and poor maintainability.*

### The Problem CSS Solves — separation, reuse, adaptation, consistency

CSS exists because presentation rules must be reusable, conditional, and independent from document content. A single document may need different layouts for mobile, desktop, print, high-contrast mode, reduced-motion preference, embedded components, localization, and dynamic content. CSS provides a declarative mechanism for adapting presentation without rewriting the underlying document.

The core problems CSS addresses are:

| Problem                                 | CSS Mechanism                                                          | Professional Outcome                     |
| --------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------- |
| Reuse visual rules across many elements | Selectors, classes, custom properties, cascade layers                  | Consistent interface styling             |
| Resolve competing declarations          | Cascade, specificity, inheritance, source order, layers                | Predictable override behavior            |
| Adapt to devices and contexts           | Media queries, container queries, viewport/container units             | Responsive and component-adaptive design |
| Build complex layouts                   | Normal flow, flexbox, grid, positioning, fragmentation                 | Robust page and component structure      |
| Encode design systems                   | Custom properties, tokens, layers, utilities, component classes        | Scalable product styling                 |
| Support user needs                      | Focus styles, contrast, reduced motion, forced colors, zoom-safe units | Accessible interfaces                    |
| Optimize rendering                      | Critical CSS, containment, layout discipline, animation strategy       | Faster perceived and runtime performance |

Modern CSS is especially important because large applications are no longer just documents styled by a few global rules. They are component systems, design systems, dashboards, content surfaces, marketing pages, embedded widgets, and application shells that need predictable styling contracts.

*Common Pitfalls: Styling every page as a special case creates an unmaintainable stylesheet; professional CSS should encode reusable presentation rules and explicit override boundaries.*

### Core Mental Model — rules, matching, cascade, computed values, layout

CSS execution is better understood as a pipeline than as a list of properties. A browser does not “run” CSS line by line in the same way it runs JavaScript. It parses stylesheets, matches selectors against document elements, resolves the cascade, computes values, lays out boxes, paints visuals, and composites layers.

| Stage     | What Happens                                                    | Typical Debugging Question                    |
| --------- | --------------------------------------------------------------- | --------------------------------------------- |
| Parse     | CSS text becomes stylesheet rules                               | Is the declaration syntactically valid?       |
| Match     | Selectors match elements in the document tree                   | Does this rule apply to the intended element? |
| Cascade   | Competing declarations are ordered and resolved                 | Which declaration wins?                       |
| Inherit   | Inherited properties propagate from ancestors                   | Is this value inherited or explicitly set?    |
| Compute   | Relative values, variables, and defaults become computed values | What is the final computed value?             |
| Layout    | Boxes receive sizes and positions                               | Why is this element where it is?              |
| Paint     | Backgrounds, text, borders, shadows, images are drawn           | Why does this visual look wrong?              |
| Composite | Layers are combined, often with GPU acceleration                | Why is animation smooth or janky?             |

The cascade is central. CSS Cascading and Inheritance specifications describe how style rules are collated and how values are assigned to properties on elements; through cascade and inheritance, property values are propagated across elements. ([W3C][2])

A useful professional formula is:

`final rendered result = document structure + matched rules + cascade + inheritance + computed values + layout algorithm + browser/user environment`

This formula explains why CSS can feel surprising. The visible result may depend on DOM structure, stylesheet order, specificity, inherited values, writing mode, intrinsic content size, viewport dimensions, container dimensions, font metrics, user preferences, and browser support.

*Common Pitfalls: Inspecting only the written declaration misses inherited values, user-agent styles, overridden rules, invalid computed values, and layout constraints.*

### Main Abstractions — selectors, declarations, properties, values, boxes, contexts

CSS has a compact syntax but a large conceptual surface. The professional abstraction inventory is:

| Abstraction               | Meaning                                         | Example                                           |
| ------------------------- | ----------------------------------------------- | ------------------------------------------------- |
| Selector                  | Pattern that matches document elements          | `.card > h2`, `button:focus-visible`              |
| Declaration               | Property-value pair                             | `display: grid`                                   |
| Rule                      | Selector plus declaration block                 | `.card { padding: 1rem; }`                        |
| Property                  | Named styling feature                           | `color`, `margin`, `grid-template-columns`        |
| Value                     | Assigned property data                          | `oklch(60% 0.2 260)`, `1fr`, `clamp(...)`         |
| At-rule                   | Conditional, metadata, or grouping rule         | `@media`, `@container`, `@layer`, `@font-face`    |
| Cascade layer             | Named precedence group                          | `@layer reset, base, components, utilities;`      |
| Custom property           | Cascading variable-like value                   | `--space-4: 1rem`                                 |
| Box                       | Rectangular layout object generated by elements | content, padding, border, margin                  |
| Formatting context        | Layout algorithm environment                    | block, flex, grid, inline                         |
| Containing block          | Reference rectangle for sizing/positioning      | positioned ancestor, viewport, grid area          |
| Stacking context          | Local z-axis ordering context                   | transform, opacity, isolation, positioned z-index |
| Media/container condition | Environment-dependent rule gate                 | `@media`, `@container`                            |
| Pseudo-class              | State or structural condition                   | `:hover`, `:has()`, `:nth-child()`                |
| Pseudo-element            | Styleable subpart or generated fragment         | `::before`, `::marker`, `::selection`             |

The most important distinction: CSS selectors choose *where rules apply*; the cascade decides *which applicable declarations win*; layout algorithms decide *how resulting boxes are placed*.

*Common Pitfalls: Selector correctness, cascade precedence, and layout behavior are separate problem domains; fixing one does not automatically fix the others.*

### Design Philosophy — declarative, resilient, layered, contextual

CSS is designed around several philosophical choices that differ from imperative programming.

| Philosophy                  | Meaning                                                                                   | Consequence                                                    |
| --------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Declarative rules           | Authors describe desired presentation, not procedural drawing steps                       | Browser can adapt output to device, content, and user settings |
| Fault tolerance             | Invalid declarations are ignored rather than crashing the page                            | Progressive enhancement is possible                            |
| Cascade and inheritance     | Multiple sources can contribute to final styles                                           | Power and complexity both increase                             |
| Device independence         | Values can be relative to fonts, viewport, containers, writing mode, and user preferences | Layout can be responsive and accessible                        |
| Content-first layout        | Intrinsic content size often matters                                                      | Robust layouts avoid hard-coded magic numbers                  |
| User override compatibility | User-agent and user styles can participate                                                | Accessibility and personalization are preserved                |
| Incremental evolution       | New features can be gated with feature queries and fallbacks                              | Legacy browsers can receive simpler styling                    |

The cascade is not a historical accident; it is the mechanism that allows browser defaults, user preferences, author styles, components, utilities, themes, and overrides to coexist. Modern cascade layers make that coexistence more explicit by letting authors define ordered groups of rules. MDN describes cascade layers as explicit specificity containers that help control which declarations are applied, especially as stylesheet complexity grows. ([developer.mozilla.org][3])

Professional CSS therefore favors **low specificity**, **explicit layers**, **semantic tokens**, **component boundaries**, and **progressive enhancement**. Good CSS usually works with the browser’s layout algorithms rather than fighting them.

*Common Pitfalls: CSS architecture fails when every local fix increases global specificity, adds another override, or encodes a layout assumption that content cannot satisfy.*

### Historical Background — from document styling to component systems

CSS emerged to solve a web-document problem: HTML had become overloaded with presentational markup, and the web needed a reusable styling language separate from document structure. Over time, CSS expanded from typography and simple box styling into a comprehensive rendering system.

A simplified historical arc:

| Era                         | Dominant CSS Practice                                                                | Limitations That Drove Evolution                                     |
| --------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Early document styling      | Fonts, colors, margins, links, print styles                                          | Limited layout control                                               |
| Table and float layout era  | Tables, floats, clearing hacks                                                       | Fragile, semantically poor, hard to maintain                         |
| Responsive web design era   | Media queries, fluid grids, relative units                                           | Viewport-only adaptation, complex breakpoints                        |
| Flexbox/grid era            | Dedicated layout algorithms                                                          | Better page and component layout, but still global cascade issues    |
| Component/design-system era | Tokens, layers, scoped conventions, utilities, container queries                     | Need for local adaptability and predictable override models          |
| Modern CSS era              | `@layer`, `@container`, native nesting, `@scope`, advanced color, logical properties | CSS becomes more modular, component-aware, and architecture-friendly |

CSS standards now evolve through separate modules rather than a single “CSS 3/4/5” specification. The W3C CSS Snapshot exists to identify modules that form the current state of CSS by specification stability, although the snapshot itself notes that this stability grouping is aimed at implementers rather than being a direct browser-adoption guide for authors. ([W3C][1])

*Common Pitfalls: “CSS3” is not a precise modern target; professional compatibility decisions should be feature-specific, not version-label-specific.*

### Current Technical Development Trends — layers, containers, nesting, scope, color, components

Modern CSS development is moving toward **component-aware styling**, **explicit cascade architecture**, **native language ergonomics**, and **design-system integration**.

| Trend                            | Feature Family                                                                      | Practical Significance                                                                     | Adoption Note                                                                                                                                                                  |
| -------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Explicit cascade architecture    | `@layer`, `revert-layer`                                                            | Reduces specificity wars by assigning precedence to style categories                       | `@layer` is marked by MDN as Baseline widely available and available across browsers since March 2022. ([developer.mozilla.org][4])                                            |
| Container-aware components       | `@container`, container units                                                       | Components adapt to parent size instead of only viewport size                              | MDN marks `@container` as Baseline widely available, available across browsers since February 2023, with caveats that some parts vary in support. ([developer.mozilla.org][5]) |
| Native nesting                   | CSS Nesting Module                                                                  | Improves local grouping of related selectors without requiring Sass for basic nesting      | The CSS Nesting Module defines nesting one style rule inside another, with child selectors relative to parent selectors. ([W3C][6])                                            |
| Scoped styling                   | `@scope`, `:scope`                                                                  | Limits selector reach to a subtree and introduces scoping proximity into cascade reasoning | MDN marks `@scope` as Baseline 2025 newly available since December 2025, with older-browser caveats. ([developer.mozilla.org][7])                                              |
| Modern color                     | `oklch()`, `lab()`, `color-mix()`, relative color syntax                            | Better perceptual color systems and design-token manipulation                              | Should be used with compatibility and fallback awareness                                                                                                                       |
| User-preference styling          | `prefers-reduced-motion`, `prefers-color-scheme`, `forced-colors`, contrast queries | Makes accessibility and personalization first-class styling inputs                         | Essential for production UI                                                                                                                                                    |
| Intrinsic and fluid design       | `minmax()`, `auto-fit`, `clamp()`, logical properties                               | Reduces breakpoint-heavy CSS and improves localization resilience                          | Mature production pattern                                                                                                                                                      |
| Browser-compatibility governance | Baseline, MDN compatibility data, `@supports`                                       | Moves teams away from vague “modern browser” claims toward feature-level decisions         | Baseline distinguishes availability stages such as newly available and widely available. ([developer.mozilla.org][8])                                                          |

The most important practical shift is that responsive design is no longer only viewport-based. Container queries let style rules respond to a containing element rather than only to the browser viewport; MDN describes container queries as an alternative to media queries, which apply styles based on viewport size or device characteristics. ([developer.mozilla.org][9])

The second major shift is that the cascade is becoming more author-controllable. Instead of relying only on source order and specificity, `@layer` allows projects to create architectural precedence groups such as `reset`, `base`, `tokens`, `components`, `utilities`, and `overrides`.

The third shift is that CSS is absorbing some ergonomics previously supplied by preprocessors or frameworks. Native nesting, custom properties, `@property`, color functions, and scoped styling reduce the need for build-time abstractions in many cases, though Sass, PostCSS, CSS Modules, Tailwind, and CSS-in-JS remain relevant in specific project architectures.

*Common Pitfalls: New CSS features should not be adopted only because they are new; production adoption should check browser baseline, fallback requirements, accessibility impact, and team maintainability.*

### When CSS Is the Right Tool — styling, layout, adaptation, design systems

CSS is the right tool when the problem is presentation, layout, visual state, or environmental adaptation.

| Use Case                   | Why CSS Fits                                                                  |
| -------------------------- | ----------------------------------------------------------------------------- |
| Page and component layout  | CSS layout algorithms are designed for document and UI layout                 |
| Responsive design          | Media queries, container queries, fluid units, intrinsic layout               |
| Typography and readability | Font, line-height, wrapping, spacing, language-aware features                 |
| Theming                    | Custom properties, cascade, user-preference queries                           |
| Visual states              | `:hover`, `:focus-visible`, `:checked`, `:disabled`, `:has()`                 |
| Motion and transitions     | Declarative animation with accessibility gates                                |
| Print styling              | `@media print`, page-related rules                                            |
| Design systems             | Tokens, layers, utilities, component contracts                                |
| Accessibility styling      | Focus visibility, contrast, reduced motion, forced colors                     |
| Progressive enhancement    | Unsupported declarations can be ignored safely; `@supports` can gate features |

CSS is especially appropriate when the browser can derive the correct result from constraints. For example, a grid of cards should usually use CSS Grid with `repeat(auto-fit, minmax(...))`, not JavaScript measuring card widths. A component that adapts to its allocated space should usually use container queries, not global breakpoint assumptions.

*Common Pitfalls: Reaching for JavaScript to solve ordinary layout, state, or responsive styling problems often produces slower, more fragile interfaces.*

### When CSS Is the Wrong Tool — semantics, data, business logic, imperative state

CSS is the wrong primary tool when the problem is semantic meaning, data transformation, business logic, security enforcement, application state, or accessible behavior that requires actual DOM semantics.

| Problem                                  | Better Tool                                       | Why CSS Is Insufficient                                         |
| ---------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------- |
| Document meaning                         | HTML                                              | CSS cannot create reliable semantic structure                   |
| Form validation logic                    | HTML constraints + JavaScript + server validation | CSS can style states but cannot enforce trust boundaries        |
| Business rules                           | JavaScript/backend                                | CSS has no general computation or data model                    |
| Authentication/authorization             | Backend/security layer                            | CSS can hide UI but cannot secure functionality                 |
| Data fetching                            | JavaScript/backend                                | CSS cannot perform application data workflows                   |
| Interactive widgets requiring ARIA state | HTML + JavaScript                                 | CSS can style state but often cannot manage accessible behavior |
| Security policy                          | CSP/server/app architecture                       | CSS cannot prevent unauthorized behavior                        |
| Content generation with meaning          | HTML/templates                                    | Generated CSS content may be inaccessible or unreliable         |

CSS can hide, reveal, reorder, decorate, and animate. It should not be used to fake semantics. For example, making a `<div>` look like a button does not make it a keyboard-operable, accessible button. Hiding an admin action with `display: none` does not authorize or deauthorize it. Putting meaningful text in `::before` does not create dependable document content.

*Common Pitfalls: CSS can change what users see, but it must not be mistaken for a semantic, behavioral, or security layer.*

### Strengths, Weaknesses, and Tradeoffs — power, complexity, maintainability

CSS’s strengths are also the source of many of its professional failure modes.

| Dimension             | Strength                                      | Weakness / Tradeoff                                               |
| --------------------- | --------------------------------------------- | ----------------------------------------------------------------- |
| Cascade               | Allows layered sources and overrides          | Can become unpredictable without architecture                     |
| Selectors             | Powerful targeting model                      | Can over-couple styles to DOM structure                           |
| Inheritance           | Reduces repetition for typography and theming | Surprising inherited values can leak into components              |
| Fault tolerance       | Supports progressive enhancement              | Silent failure can hide invalid declarations                      |
| Layout algorithms     | Powerful intrinsic and responsive layout      | Requires understanding formatting contexts                        |
| Global reach          | Easy to style a whole document                | Easy to accidentally affect unrelated components                  |
| Custom properties     | Runtime theming and tokenization              | Computed-value timing can surprise authors                        |
| Media/container rules | Adaptive styling                              | Complex combinations can be hard to test                          |
| Browser defaults      | Useful baseline behavior                      | User-agent styles can differ and must be normalized carefully     |
| Accessibility hooks   | Supports user preferences and visible focus   | CSS can also easily damage accessibility                          |
| Performance           | Native engine-optimized layout and animation  | Bad layout, paint, loading, or animation choices can be expensive |

The core tradeoff is **global power versus local predictability**. CSS can style any matched element across a document, which makes broad consistency easy. The same property makes large stylesheets fragile unless teams use naming conventions, cascade layers, component boundaries, scoped selectors, and design tokens.

*Common Pitfalls: CSS does not become maintainable by being shorter; it becomes maintainable when precedence, ownership, naming, and component contracts are explicit.*

### CSS and Adjacent Technologies — HTML, JavaScript, SVG, build tools, frameworks

CSS operates inside a larger platform. Professional CSS work requires understanding where its responsibilities begin and end.

| Adjacent Technology  | Relationship to CSS                                                                           | Common Confusion                                                            |
| -------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| HTML                 | Provides elements, semantics, attributes, document tree                                       | CSS cannot replace semantic HTML                                            |
| JavaScript           | Can add/remove classes, set inline styles, mutate custom properties, observe layout           | JS should not replace CSS layout unnecessarily                              |
| SVG                  | SVG elements can be styled with CSS, with SVG-specific properties and presentation attributes | Some CSS properties behave differently in SVG contexts                      |
| Web Components       | Shadow DOM changes styling boundaries; custom properties can cross boundaries by design       | Global CSS may not pierce shadow roots                                      |
| ARIA                 | CSS can style ARIA states but ARIA changes accessibility semantics                            | CSS visual state must match accessibility state                             |
| Sass/Less            | Preprocessors add variables, mixins, functions, partials                                      | Native CSS custom properties are runtime cascade values, not Sass variables |
| PostCSS              | Transforms CSS through plugins                                                                | Build output may differ from authored CSS                                   |
| Tailwind/utility CSS | Encodes design constraints as utility classes                                                 | Utility-heavy markup still depends on CSS cascade and generated stylesheets |
| CSS Modules          | Locally scoped class names through build tooling                                              | Does not eliminate cascade inside a component                               |
| CSS-in-JS            | Couples styling with component logic                                                          | Runtime cost, SSR, ordering, and theming require discipline                 |
| Design tools         | Tokens and component specs may map to CSS variables and layers                                | Visual specs do not automatically encode responsive/accessibility behavior  |
| Browser DevTools     | Inspection of matched rules, computed styles, layout overlays, performance                    | DevTools shows reality, not just source files                               |

CSS and JavaScript are frequently confused because both can respond to state. The distinction is: if the state can be expressed through document state, attributes, classes, pseudo-classes, media features, container features, or custom properties, CSS is often sufficient. If the state requires data, persistence, procedural logic, network calls, or semantic state management, JavaScript or the backend is required.

*Common Pitfalls: A styling architecture that depends on uncontrolled JavaScript inline styles often bypasses cascade layers, themes, media queries, and user preferences.*

### CSS Compared with Common Alternatives — native CSS, preprocessors, utilities, CSS-in-JS

`COMPARE_WITH` is treated as `none`, so no single formal comparison target is required. For practical orientation, CSS is still best understood relative to common adjacent styling approaches.

| Approach          | Purpose                           | Strengths                                                           | Weaknesses                                                   | Best Fit                                                        |
| ----------------- | --------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------- |
| Native CSS        | Browser-executed styling language | No build requirement, full platform access, progressive enhancement | Global cascade requires architecture                         | Baseline styling, design systems, components, responsive layout |
| Sass/SCSS         | CSS preprocessor                  | Mature nesting, mixins, partials, compile-time functions            | Build step; variables are not runtime cascade values         | Legacy systems, complex authoring abstractions                  |
| PostCSS           | CSS transformation pipeline       | Autoprefixing, linting, custom transforms                           | Plugin complexity; output may obscure source                 | Build pipelines and compatibility transforms                    |
| Utility-first CSS | Predefined atomic classes         | Fast composition, constrained design system                         | Markup verbosity, abstraction learning curve                 | Product UI, teams with strong design-token discipline           |
| CSS Modules       | Build-time local class scoping    | Reduces accidental global collisions                                | Still needs architecture for tokens, globals, states         | Component-based apps                                            |
| CSS-in-JS         | Styles colocated with components  | Dynamic styling and component encapsulation                         | Ordering, runtime/SSR complexity, tooling lock-in            | Complex component systems with runtime theming needs            |
| Inline styles     | Element-level style attributes    | Useful for dynamic one-off values                                   | High precedence, no media queries/pseudo-classes, poor reuse | Rare dynamic values, custom-property injection                  |

Native CSS has become more capable as features like cascade layers, container queries, and native nesting mature. However, that does not make tooling obsolete. Tooling remains useful for bundling, linting, dead-code management, design-token generation, compatibility transforms, and framework integration.

*Common Pitfalls: Choosing a CSS methodology or tool does not remove the need to understand the underlying cascade, specificity, layout, and accessibility model.*

### Professional Tool Fit — decision table

| Situation                                  | Preferred CSS Strategy                                                               | Rationale                                                 |
| ------------------------------------------ | ------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| Marketing site with strong visual identity | Native CSS + tokens + layers + component classes                                     | Predictable, performant, low tooling burden               |
| Large app with shared components           | Design tokens + cascade layers + CSS Modules or scoped convention                    | Reduces global leakage                                    |
| Dashboard/grid-heavy UI                    | CSS Grid + container queries + custom properties                                     | Content and component-aware layout                        |
| Simple responsive page                     | Normal flow + grid/flex + `clamp()` + media queries                                  | Avoids excessive framework overhead                       |
| Component library                          | Tokens + layers + low-specificity components + documented states                     | Consumers need predictable override contracts             |
| Enterprise legacy CSS                      | Introduce layers, reduce specificity, isolate components gradually                   | Migration must be incremental                             |
| Highly dynamic data visualization          | CSS for presentation; SVG/canvas/JS for rendering logic                              | CSS should not compute data geometry                      |
| Animation-rich product UI                  | CSS transitions/animations for simple motion; JS/Web Animations for timeline control | Use the simplest motion model that satisfies requirements |
| Accessibility-sensitive forms              | Semantic HTML + CSS focus/error/disabled states + JS only when needed                | Styling must reinforce state, not invent it               |
| Print-heavy documents                      | Dedicated print styles, page rules where supported, semantic structure               | Print layout has distinct constraints                     |

The practical rule is: use CSS when the problem can be expressed as **style rules over structured elements under known conditions**. Use another layer when the problem requires **semantic meaning, application state, authorization, data processing, or procedural control**.

*Common Pitfalls: The wrong abstraction is usually visible as excessive magic numbers, duplicated breakpoints, selector overreach, inline overrides, or JavaScript layout measurement.*

### Professional Success Criteria — what good CSS looks like

Good CSS in a professional codebase has measurable qualities:

| Criterion                | Observable Sign                                                               |
| ------------------------ | ----------------------------------------------------------------------------- |
| Predictable cascade      | Layers, low specificity, limited `!important`, clear override paths           |
| Responsive resilience    | Layout survives content variation, localization, zoom, and viewport changes   |
| Component portability    | Components adapt to their container and avoid leaking styles                  |
| Accessibility integrity  | Visible focus, contrast, reduced-motion handling, forced-colors awareness     |
| Token consistency        | Colors, spacing, typography, radii, shadows, and motion use named tokens      |
| Debuggability            | DevTools inspection reveals a clear chain from token to component to override |
| Performance awareness    | Critical CSS, limited unused CSS, cheap animations, controlled layout cost    |
| Maintainability          | Naming, file structure, comments, and ownership are explicit                  |
| Compatibility discipline | Features are checked against Baseline/support data and gated when needed      |
| Minimal surprise         | Rules encode intent rather than incidental DOM or viewport assumptions        |

A stylesheet is professional not because it uses the newest features, but because it preserves **correctness under change**: new content, new components, new viewport sizes, new themes, new locales, new accessibility settings, and new contributors.

*Common Pitfalls: A CSS system that only works for the current screenshot is not a CSS system; it is a brittle rendering patch.*

### Part 1 Summary — CSS as a rendering contract

CSS is the browser’s declarative presentation language for structured documents. Its core power comes from selectors, cascade, inheritance, layout algorithms, conditional rules, and device/user adaptation. Its core danger comes from the same properties: global reach, implicit inheritance, competing declarations, and complex rendering interactions.

Modern CSS is moving toward explicit architecture and component-aware design: cascade layers for precedence control, container queries for local responsiveness, native nesting for authoring ergonomics, scoped styling for selector boundaries, modern color for design systems, and user-preference queries for accessibility. These features make CSS more capable, but they do not remove the need for disciplined mental models.

The professional stance is: write CSS as a **rendering contract** between document semantics, design-system tokens, component boundaries, browser layout algorithms, and user environments.

*Common Pitfalls: Most serious CSS failures are not syntax failures; they are failures of mental model, scope control, accessibility, and long-term override strategy.*

## PART 2 — Quick Reference

### Environment and Version Assumptions — modern CSS, evergreen browsers, progressive enhancement

This reference targets **modern CSS in current evergreen browsers** as of **May 2026**, with explicit notes where newer features require compatibility review or progressive enhancement. The structure follows the requested reference-first, coverage-oriented CSS guide specification.

| Assumption                | Practical Meaning                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| Runtime                   | Browser CSS engine: Chromium, Firefox/Gecko, Safari/WebKit                               |
| Document model            | Primarily HTML, with SVG-specific notes where relevant                                   |
| CSS model                 | Modular modern CSS, not a single frozen “CSS3” version                                   |
| Authoring style           | Native CSS first; build tooling optional                                                 |
| Compatibility strategy    | Use Baseline/MDN compatibility data, `@supports`, fallbacks, and progressive enhancement |
| Architecture expectation  | Large-codebase maintainability: layers, low specificity, tokens, components, utilities   |
| Accessibility expectation | Focus visibility, contrast, reduced motion, forced colors, zoom resilience               |

Modern CSS features should be treated feature-by-feature. For example, `@layer` is widely available according to MDN and has been available across browsers since March 2022, while `@scope` is marked as Baseline 2025 newly available and may require older-browser review. ([developer.mozilla.org][1])

*Common Pitfalls: Do not target vague labels such as “CSS3”; target specific features with explicit browser-support and fallback decisions.*

### Core Syntax Inventory — rules, selectors, declarations, at-rules, comments

CSS is composed of rules. A normal style rule has a selector list and a declaration block. At-rules add conditional behavior, metadata, layers, fonts, animations, imports, or scoped structures.

| Syntax          | Meaning                                 | Example                            | Notes                                                               |
| --------------- | --------------------------------------- | ---------------------------------- | ------------------------------------------------------------------- |
| Rule            | Selector plus declarations              | `.card { padding: 1rem; }`         | Most common CSS structure                                           |
| Selector list   | Multiple selectors sharing declarations | `h1, h2, h3 { line-height: 1.1; }` | Invalid selector in older forgiving contexts can affect entire rule |
| Declaration     | Property-value pair                     | `color: CanvasText;`               | Invalid declarations are ignored                                    |
| Property        | Styling feature                         | `display`, `margin`, `font-size`   | Defined by CSS modules                                              |
| Value           | Assigned property data                  | `grid`, `1rem`, `oklch(...)`       | Value grammar depends on property                                   |
| Custom property | Cascading author-defined value          | `--space-md: 1rem;`                | Resolved through cascade and inheritance                            |
| At-rule         | Special CSS instruction                 | `@media`, `@layer`, `@font-face`   | Some contain nested rules                                           |
| Comment         | Author note                             | `/* Component boundary */`         | CSS has no line comments                                            |

```css
@layer reset, base, components, utilities;

@layer components {
  .card {
    --card-padding: 1rem;
    display: grid;
    gap: var(--card-padding);
    padding: var(--card-padding);
  }
}
```

*Common Pitfalls: A syntactically invalid declaration is silently ignored, so DevTools inspection is often necessary to distinguish cascade loss from parse failure.*

### Cascade Resolution Matrix — origins, importance, layers, specificity, scope, order

The cascade resolves competing declarations that apply to the same element and property. Modern cascade reasoning must include origin, importance, cascade layers, specificity, scoping proximity, and source order. W3C CSS Cascade Level 6 describes scope proximity as a cascade factor for scoped style rules; MDN describes specificity as the algorithm used to determine which competing declaration is most relevant to an element. ([W3C][2])

| Precedence Dimension  | What Wins                                                              | Professional Use                                             |
| --------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------ |
| Origin and importance | User-agent, user, author, animation, transition, `!important` ordering | Understand why browser/user styles may override expectations |
| Cascade layer         | Later-declared layer wins among normal layered author rules            | Architectural precedence without specificity escalation      |
| Specificity           | Higher selector weight wins within same cascade context                | Debug local conflicts                                        |
| Scoping proximity     | Closer `@scope` root can win among scoped rules                        | Component-local precedence                                   |
| Source order          | Later declaration wins when all above tie                              | Last tie-breaker                                             |

| Conflict                 | Example                                             | Winner                         | Better Fix                               |
| ------------------------ | --------------------------------------------------- | ------------------------------ | ---------------------------------------- |
| Same selector later rule | `.btn { color: red; }` then `.btn { color: blue; }` | Later rule                     | Consolidate or layer intentionally       |
| Higher specificity       | `.nav .btn` vs `.btn`                               | `.nav .btn`                    | Avoid structural over-coupling           |
| Layer conflict           | `@layer components` vs `@layer utilities`           | Later layer, if declared later | Declare global layer order once          |
| Inline style             | `style="color: red"` vs `.btn`                      | Inline style usually wins      | Use custom properties for dynamic values |
| Important conflict       | `.btn { color: red !important; }`                   | Important declaration          | Reserve for narrow override boundaries   |

```css
@layer reset, base, components, utilities;

@layer components {
  .button {
    color: var(--button-fg);
  }
}

@layer utilities {
  .text-danger {
    color: var(--color-danger);
  }
}
```

*Common Pitfalls: Specificity is not the whole cascade; layers, importance, scope proximity, and source order can change the result.*

### Selector Taxonomy Matrix — type, class, ID, attributes, combinators, relational selectors

Selectors determine which elements receive candidate declarations. Keep selectors expressive but not overly coupled to incidental DOM depth.

| Selector Type              |                     Example |      Specificity Contribution | Use Case                        | Caveat                              |
| -------------------------- | --------------------------: | ----------------------------: | ------------------------------- | ----------------------------------- |
| Universal                  |                         `*` |                       `0-0-0` | Resets, broad defaults          | Can be too broad                    |
| Type                       |                    `button` |                       `0-0-1` | Element defaults                | Couples to tag name                 |
| Class                      |                   `.button` |                       `0-1-0` | Components, utilities           | Preferred daily selector            |
| ID                         |                     `#main` |                       `1-0-0` | Rare document anchor styling    | Too specific for reusable CSS       |
| Attribute                  |    `[aria-expanded="true"]` |                       `0-1-0` | State styling tied to semantics | Attribute must reflect actual state |
| Descendant                 |                   `.card p` |                  Sum of parts | Contextual styling              | Can leak through nested components  |
| Child                      |                `.menu > li` |                  Sum of parts | Direct structure styling        | Fragile under markup changes        |
| Adjacent sibling           |                    `h2 + p` |                  Sum of parts | Editorial spacing               | Depends on exact order              |
| General sibling            |    `input:checked ~ .panel` |                  Sum of parts | CSS-only state patterns         | Can become brittle                  |
| Selector list              |                    `.a, .b` |      Each selector separately | Shared declarations             | Watch invalid selector behavior     |
| Relational                 | `.field:has(input:invalid)` |           Depends on argument | Parent/state styling            | Powerful; use intentionally         |
| Zero-specificity wrapper   |        `:where(.stack > *)` | `0-0-0` for `:where()` itself | Low-specificity defaults        | Easy to override                    |
| Specificity-taking wrapper |           `:is(h1, h2, h3)` |        Most specific argument | Compact selector lists          | Can unexpectedly raise specificity  |

MDN states that `:where()` always has zero specificity, while `:is()` takes the specificity of the most specific selector in its arguments. ([developer.mozilla.org][3])

```css
/* Low-specificity layout primitive */
:where(.stack > * + *) {
  margin-block-start: var(--stack-gap, 1rem);
}

/* Semantic state selector */
.disclosure:has([aria-expanded="true"]) {
  border-color: var(--color-accent);
}
```

*Common Pitfalls: Deep descendant selectors encode markup assumptions and often become harder to override than component-class selectors.*

### Pseudo-Class and Pseudo-Element Matrix — state, structure, generated fragments

Pseudo-classes select states or structural relationships. Pseudo-elements style generated or browser-defined subparts.

| Category           | Selector                                                         | Meaning                                     | Example Use                      |
| ------------------ | ---------------------------------------------------------------- | ------------------------------------------- | -------------------------------- |
| Interaction        | `:hover`, `:active`, `:focus`, `:focus-visible`, `:focus-within` | User interaction state                      | Buttons, forms, navigation       |
| Form state         | `:checked`, `:disabled`, `:enabled`, `:invalid`, `:required`     | Control state                               | Validation and state styling     |
| Structural         | `:first-child`, `:last-child`, `:nth-child()`, `:only-child`     | Position in tree                            | Lists, tables, repeated cards    |
| Relational         | `:has()`                                                         | Match element based on descendants/siblings | Parent styling, state containers |
| Logical            | `:is()`, `:where()`, `:not()`                                    | Selector composition                        | Lower repetition                 |
| Document/location  | `:target`, `:root`, `:scope`                                     | Document or scope relation                  | Anchors, tokens, scoped CSS      |
| Generated content  | `::before`, `::after`                                            | Generated inline fragments                  | Decorative icons                 |
| Text fragments     | `::first-line`, `::first-letter`, `::selection`                  | Text subparts                               | Editorial styling                |
| List/form subparts | `::marker`, `::placeholder`, `::file-selector-button`            | Browser-defined UI fragments                | Lists and forms                  |

```css
.form-field:has(input:invalid) {
  --field-border: var(--color-danger);
}

.button:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 3px;
}

li::marker {
  color: var(--color-accent);
}
```

*Common Pitfalls: Meaningful content should not live only in `::before` or `::after`; generated content is best for decoration, not essential information.*

### At-Rule Matrix — media, supports, container, layer, scope, fonts, animation

At-rules extend CSS beyond simple selector rules. They define conditional blocks, cascade ordering, resources, animations, page rules, and scoped regions.

| At-Rule           | Purpose                                  | Example                                        | Professional Notes                         |
| ----------------- | ---------------------------------------- | ---------------------------------------------- | ------------------------------------------ |
| `@media`          | Apply rules by environment/media feature | `@media (width >= 48rem)`                      | Viewport/device/user preference adaptation |
| `@container`      | Apply rules by container condition       | `@container card (inline-size >= 30rem)`       | Component-local responsiveness             |
| `@supports`       | Gate rules by feature support            | `@supports (display: grid)`                    | Progressive enhancement                    |
| `@layer`          | Define cascade layer/order               | `@layer reset, base, components;`              | Architecture-level precedence              |
| `@scope`          | Limit selector reach to a subtree        | `@scope (.card) { ... }`                       | Newer; check older-browser needs           |
| `@font-face`      | Define downloadable font face            | `@font-face { font-family: Inter; ... }`       | Performance and fallback matter            |
| `@keyframes`      | Define animation steps                   | `@keyframes fade-in { ... }`                   | Pair with reduced-motion strategy          |
| `@property`       | Register typed custom property           | `@property --angle { syntax: "<angle>"; ... }` | Enables typed animation and initial values |
| `@import`         | Import stylesheet                        | `@import url("x.css");`                        | Often avoided in production loading        |
| `@page`           | Paged media styling                      | `@page { margin: 1cm; }`                       | Print/paged output                         |
| `@starting-style` | Define starting state for transitions    | `@starting-style { ... }`                      | Entry transitions                          |
| `@charset`        | Character encoding declaration           | `@charset "UTF-8";`                            | Must appear first if used                  |

MDN defines `@supports` as a feature query that applies declarations depending on browser support for CSS features, and defines container queries as applying styles based on a containing context rather than only viewport features. ([developer.mozilla.org][4])

```css
@supports (container-type: inline-size) {
  .card-list {
    container-type: inline-size;
  }

  @container (inline-size >= 40rem) {
    .card {
      grid-template-columns: 12rem 1fr;
    }
  }
}
```

*Common Pitfalls: `@supports` checks syntax support, not whether a browser implementation is free of bugs or suitable for the whole intended layout.*

### Value and Unit Matrix — length, percentage, viewport, container, time, angle

CSS values are typed. Correct unit choice is central to responsive, accessible, and internationalized layout.

| Unit / Value Type | Examples                                                | Best Use                               | Caveat                                             |
| ----------------- | ------------------------------------------------------- | -------------------------------------- | -------------------------------------------------- |
| Absolute length   | `px`, `pt`, `cm`                                        | Borders, hairline details, print       | `px` is CSS pixel, not physical pixel              |
| Font-relative     | `em`, `rem`, `ch`, `ex`, `cap`, `lh`, `rlh`             | Typography, spacing, line-based layout | `em` compounds with local font size                |
| Viewport          | `vw`, `vh`, `svh`, `lvh`, `dvh`, `vi`, `vb`             | Full-screen and viewport-aware layout  | Mobile browser chrome affects older viewport units |
| Container         | `cqw`, `cqh`, `cqi`, `cqb`, `cqmin`, `cqmax`            | Component-local fluid sizing           | Requires eligible query container                  |
| Percentage        | `50%`                                                   | Relative sizing and positioning        | Reference box depends on property                  |
| Fraction          | `fr`                                                    | Grid track distribution                | Only valid in grid track sizing                    |
| Time              | `ms`, `s`                                               | Animation and transition duration      | Respect reduced motion                             |
| Angle             | `deg`, `rad`, `turn`                                    | Gradients, transforms, hue             | `turn` is readable for rotations                   |
| Resolution        | `dpi`, `dppx`                                           | Media queries for displays/print       | Rare in normal UI                                  |
| Keywords          | `auto`, `none`, `normal`, `currentColor`                | Property-specific defaults             | Meaning changes by property                        |
| CSS-wide          | `inherit`, `initial`, `unset`, `revert`, `revert-layer` | Reset and cascade control              | Understand inheritance first                       |

```css
:root {
  --space-3: clamp(0.75rem, 1cqi, 1rem);
  --measure: 65ch;
}

.article {
  max-inline-size: var(--measure);
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 3rem);
}
```

*Common Pitfalls: Percentages are not universally relative to the parent width; their reference depends on the property and formatting context.*

### Function Matrix — var, calc, min, max, clamp, color, gradients, transforms

CSS functions make values composable. They are values, not imperative calls.

| Function                                  | Purpose                 | Example                                | Notes                                       |
| ----------------------------------------- | ----------------------- | -------------------------------------- | ------------------------------------------- |
| `var()`                                   | Read custom property    | `color: var(--text, black);`           | Fallback used when variable missing/invalid |
| `calc()`                                  | Arithmetic              | `width: calc(100% - 2rem);`            | Supports mixed units                        |
| `min()`                                   | Pick smallest           | `width: min(100%, 70rem);`             | Useful for max-width patterns               |
| `max()`                                   | Pick largest            | `padding: max(1rem, 2vw);`             | Useful for lower bounds                     |
| `clamp()`                                 | Min/preferred/max       | `font-size: clamp(1rem, 2vw, 1.5rem);` | Ideal for fluid type                        |
| `rgb()` / `hsl()`                         | Color definition        | `rgb(0 0 0 / 0.5)`                     | Modern space-separated syntax               |
| `lab()` / `lch()` / `oklab()` / `oklch()` | Perceptual color spaces | `oklch(65% 0.18 250)`                  | Useful for design systems                   |
| `color-mix()`                             | Mix colors              | `color-mix(in oklch, red, white 20%)`  | Good for variants                           |
| `linear-gradient()`                       | Image gradient          | `linear-gradient(... )`                | Background image value                      |
| `translate()` / `scale()` / `rotate()`    | Transform functions     | `transform: translateY(-2px);`         | Often animation-friendly                    |
| `filter()` functions                      | Visual effects          | `blur(8px)`, `brightness(1.1)`         | Can be paint/compositing expensive          |

```css
.button {
  --button-bg: oklch(58% 0.18 255);
  background: var(--button-bg);
  color: white;
  padding: clamp(0.625rem, 1cqi, 0.875rem) clamp(1rem, 2cqi, 1.5rem);
}
```

*Common Pitfalls: `var()` fallbacks do not rescue every invalid computed value; custom properties are resolved late and can invalidate dependent declarations.*

### Property Family Matrix — layout, box, typography, color, effects, interaction

CSS has hundreds of properties. Professional lookup is easier by property family.

| Family           | High-Frequency Properties                                                              | Use                             |
| ---------------- | -------------------------------------------------------------------------------------- | ------------------------------- |
| Display/layout   | `display`, `position`, `inset`, `float`, `clear`, `columns`                            | Formatting behavior             |
| Box model        | `box-sizing`, `inline-size`, `block-size`, `margin`, `border`, `padding`               | Box sizing and spacing          |
| Flexbox          | `flex`, `flex-direction`, `flex-wrap`, `justify-content`, `align-items`, `gap`         | One-dimensional layout          |
| Grid             | `grid-template-columns`, `grid-template-areas`, `grid-auto-flow`, `place-items`, `gap` | Two-dimensional layout          |
| Alignment        | `justify-*`, `align-*`, `place-*`                                                      | Axis alignment                  |
| Overflow         | `overflow`, `overflow-x`, `overflow-y`, `text-overflow`, `overscroll-behavior`         | Clipping and scroll behavior    |
| Typography       | `font`, `font-size`, `font-weight`, `line-height`, `text-wrap`, `hyphens`              | Text rendering                  |
| Color/background | `color`, `background`, `background-image`, `background-size`, `color-scheme`           | Visual surface                  |
| Border/outline   | `border`, `border-radius`, `outline`, `outline-offset`                                 | Shape and focus affordance      |
| Effects          | `box-shadow`, `filter`, `backdrop-filter`, `opacity`, `mix-blend-mode`                 | Visual treatments               |
| Transform        | `transform`, `transform-origin`, `perspective`                                         | Geometry and animation          |
| Animation        | `transition`, `animation`, `animation-timeline`                                        | Motion                          |
| Interaction      | `cursor`, `pointer-events`, `user-select`, `scroll-behavior`                           | Input affordance                |
| Containment      | `contain`, `content-visibility`, `contain-intrinsic-size`                              | Rendering isolation/performance |
| Logical          | `margin-inline`, `padding-block`, `border-start-start-radius`                          | Writing-mode-aware layout       |

*Common Pitfalls: Physical properties such as `left`, `right`, `margin-left`, and `padding-right` can create internationalization problems; prefer logical properties when layout direction matters.*

### Display and Formatting Context Matrix — block, inline, flow-root, flex, grid, contents

The `display` property determines the outer display type and the internal formatting context. It is one of the most important layout switches in CSS.

| Display Value  | Outer Behavior      | Inner Formatting                         | Use Case                      | Caveat                                          |
| -------------- | ------------------- | ---------------------------------------- | ----------------------------- | ----------------------------------------------- |
| `block`        | New block-level box | Flow layout                              | Sections, containers          | Full available inline size by default           |
| `inline`       | Inline-level box    | Inline layout                            | Text fragments                | Width/height do not apply normally              |
| `inline-block` | Inline-level        | Block formatting inside                  | Badges, small controls        | Whitespace between inline blocks matters        |
| `flow-root`    | Block-level         | New block formatting context             | Clear floats, contain margins | Useful layout boundary                          |
| `flex`         | Block-level         | Flex formatting context                  | One-axis components           | Children become flex items                      |
| `inline-flex`  | Inline-level        | Flex formatting context                  | Inline controls               | Baseline alignment matters                      |
| `grid`         | Block-level         | Grid formatting context                  | Two-axis layouts              | Children become grid items                      |
| `inline-grid`  | Inline-level        | Grid formatting context                  | Inline grids                  | Less common                                     |
| `contents`     | Box removed         | Children participate as if parent absent | Semantic wrapper removal      | Accessibility/browser caveats require care      |
| `none`         | No box              | Not rendered                             | Conditional hiding            | Removes from accessibility tree in normal cases |
| Table values   | Table formatting    | Table layout algorithm                   | CSS table-like layout         | Usually prefer semantic table for data          |

```css
.media-object {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
}
```

*Common Pitfalls: `display: contents` can alter box generation in ways that affect styling, layout, and sometimes accessibility expectations.*

### Box Model and Sizing Matrix — border-box, intrinsic size, overflow, margins

Every element that generates a principal box participates in the box model: content, padding, border, and margin.

| Concept           | Property / Value                    | Meaning                                 | Professional Note                                    |
| ----------------- | ----------------------------------- | --------------------------------------- | ---------------------------------------------------- |
| Box sizing        | `box-sizing: border-box`            | Width includes padding and border       | Common global default                                |
| Logical size      | `inline-size`, `block-size`         | Writing-mode-aware width/height         | Prefer for internationalized layouts                 |
| Minimum size      | `min-inline-size`, `min-block-size` | Lower bound                             | Critical in flex/grid overflow control               |
| Maximum size      | `max-inline-size`, `max-block-size` | Upper bound                             | Use for readable line length                         |
| Intrinsic minimum | `min-content`                       | Smallest non-overflowing intrinsic size | Useful in grid                                       |
| Intrinsic maximum | `max-content`                       | Preferred unwrapped size                | Can overflow                                         |
| Available fit     | `fit-content`                       | Clamp to available space                | Useful for constrained boxes                         |
| Overflow          | `overflow: auto`, `hidden`, `clip`  | Scroll/clipping behavior                | Creates scroll containers in many cases              |
| Margin collapse   | Vertical margins in block flow      | Adjacent vertical margins may collapse  | Avoid surprises with `flow-root`, padding, flex/grid |
| Auto margins      | `margin-inline: auto`               | Absorb free space                       | Centering or pushing in flex                         |

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

.prose {
  max-inline-size: 68ch;
  margin-inline: auto;
}
```

*Common Pitfalls: `min-width: auto` on flex items can cause unexpected overflow; use `min-inline-size: 0` when flex children must shrink.*

### Positioning and Stacking Matrix — static, relative, absolute, fixed, sticky, z-index

Positioning controls box offsets and containing-block relationships. Stacking context controls z-axis ordering.

| Position   | Removed from Normal Flow | Containing Block / Reference                   | Use Case                                        | Caveat                                                |
| ---------- | -----------------------: | ---------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------- |
| `static`   |                       No | Normal flow                                    | Default                                         | Offsets ignored                                       |
| `relative` |                       No | Original position                              | Local offset, containing block for abs children | Visual offset does not move surrounding layout        |
| `absolute` |                      Yes | Nearest positioned/qualified ancestor          | Badges, overlays inside components              | Needs reliable containing block                       |
| `fixed`    |                      Yes | Viewport or transformed ancestor in some cases | Persistent UI                                   | Mobile viewport quirks                                |
| `sticky`   |           No until stuck | Scroll container and inset threshold           | Sticky headers/sidebar                          | Fails without inset or inside wrong overflow ancestor |

| Stacking Context Trigger | Example                          | Effect                                 |
| ------------------------ | -------------------------------- | -------------------------------------- |
| Positioned with z-index  | `position: relative; z-index: 1` | Creates local stacking context         |
| Opacity below 1          | `opacity: .99`                   | New stacking context                   |
| Transform                | `transform: translateZ(0)`       | New stacking context                   |
| Isolation                | `isolation: isolate`             | Explicit local stacking                |
| Filter/backdrop          | `filter: blur(1px)`              | Often new stacking/compositing context |
| Containment              | `contain: paint`                 | Paint containment and stacking effects |

```css
.card {
  position: relative;
  isolation: isolate;
}

.card__badge {
  position: absolute;
  inset-block-start: 0.75rem;
  inset-inline-end: 0.75rem;
  z-index: 1;
}
```

*Common Pitfalls: Increasing `z-index` does not escape an ancestor stacking context; debug the full stacking-context chain.*

### Flexbox Decision Matrix — one-dimensional layout, alignment, distribution

Flexbox is primarily for one-dimensional layout: a row or column where item sizes may be flexible.

| Need                               | Flexbox Pattern                                 | Example                      |
| ---------------------------------- | ----------------------------------------------- | ---------------------------- |
| Horizontal cluster                 | `display: flex; gap: ...; align-items: center;` | Toolbar, nav items           |
| Push item to edge                  | `margin-inline-start: auto`                     | Header action alignment      |
| Equal-height cards in row          | `align-items: stretch`                          | Card list rows               |
| Wrapping chips                     | `flex-wrap: wrap`                               | Tags, filter pills           |
| Vertical stack with controlled gap | `flex-direction: column; gap: ...`              | Panel sections               |
| Shrink overflowing child           | `min-inline-size: 0`                            | Text truncation in flex item |
| Equal distribution                 | `flex: 1`                                       | Button groups                |

| Property          | Meaning                     | Common Values                      |
| ----------------- | --------------------------- | ---------------------------------- |
| `flex-direction`  | Main axis                   | `row`, `column`                    |
| `flex-wrap`       | Whether items wrap          | `nowrap`, `wrap`                   |
| `justify-content` | Main-axis distribution      | `start`, `center`, `space-between` |
| `align-items`     | Cross-axis alignment        | `stretch`, `center`, `baseline`    |
| `align-content`   | Wrapped-line distribution   | `start`, `space-between`           |
| `flex`            | Grow/shrink/basis shorthand | `1`, `0 0 auto`, `1 1 0`           |
| `gap`             | Space between flex items    | Length values                      |

```css
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.toolbar__spacer {
  margin-inline-start: auto;
}
```

*Common Pitfalls: Flexbox is not “grid but simpler”; use it when the dominant layout problem is along one axis.*

### Grid Decision Matrix — tracks, areas, auto-placement, subgrid

CSS Grid is for two-dimensional layout: rows and columns together.

| Need                             | Grid Pattern                                      | Example                    |
| -------------------------------- | ------------------------------------------------- | -------------------------- |
| Responsive cards                 | `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))` | Product cards              |
| Page shell                       | Named areas                                       | Header/sidebar/main/footer |
| Dashboard                        | Explicit columns + auto rows                      | Cards and panels           |
| Dense packing                    | `grid-auto-flow: dense`                           | Masonry-like compromises   |
| Alignment inside cells           | `place-items`, `place-content`                    | Centering                  |
| Child alignment to parent tracks | `subgrid`                                         | Nested forms/cards         |
| Complex fixed + fluid tracks     | `minmax()`, `fr`, `auto`                          | App layout                 |

| Grid Term      | Meaning                           | Example                          |
| -------------- | --------------------------------- | -------------------------------- |
| Track          | Row or column                     | `1fr`, `minmax(12rem, 1fr)`      |
| Line           | Grid boundary                     | `grid-column: 1 / -1`            |
| Area           | Named rectangular region          | `grid-template-areas`            |
| Gap            | Space between tracks              | `gap: 1rem`                      |
| Auto-placement | Browser places unpositioned items | `grid-auto-flow`                 |
| Subgrid        | Child grid uses parent tracks     | `grid-template-columns: subgrid` |

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
}
```

*Common Pitfalls: `auto-fit` and `auto-fill` differ when there is spare space; test empty-track behavior rather than guessing.*

### Responsive Strategy Matrix — media queries, container queries, fluid values

Professional responsive CSS combines multiple strategies. Media queries respond to viewport/device/user features. Container queries respond to a query container’s characteristics. Fluid values interpolate between constraints. MDN describes container queries as an alternative to media queries for styling based on container attributes rather than only viewport characteristics. ([developer.mozilla.org][5])

| Strategy         | Use When                               | Example                             | Caveat                                      |
| ---------------- | -------------------------------------- | ----------------------------------- | ------------------------------------------- |
| Media query      | Page-level adaptation                  | `@media (width >= 64rem)`           | Viewport condition, not component condition |
| Container query  | Component adapts to allocated space    | `@container (inline-size >= 30rem)` | Requires `container-type` on ancestor       |
| Fluid value      | Smooth scaling between limits          | `clamp(1rem, 2vw, 1.5rem)`          | Must set sensible min/max                   |
| Intrinsic layout | Let content and available space decide | `minmax(min(100%, 20rem), 1fr)`     | Requires layout algorithm fluency           |
| User preference  | Respect accessibility/system settings  | `prefers-reduced-motion`            | Not optional for serious UI                 |
| Feature query    | Progressive enhancement                | `@supports (...)`                   | Tests support, not design suitability       |

```css
.card-list {
  container-type: inline-size;
}

.card {
  display: grid;
  gap: 1rem;
}

@container (inline-size >= 36rem) {
  .card {
    grid-template-columns: 12rem 1fr;
  }
}
```

*Common Pitfalls: Breakpoint-only CSS often fails when the same component appears in a sidebar, modal, dashboard panel, and full-width page.*

### Typography Matrix — fonts, line height, wrapping, readable measures

Typography is layout. Font metrics, line height, wrapping, and language rules affect box size and readability.

| Area         | Property                                   | Use                                | Caveat                                       |
| ------------ | ------------------------------------------ | ---------------------------------- | -------------------------------------------- |
| Font family  | `font-family`                              | Font stack                         | Always include fallback                      |
| Font size    | `font-size`                                | Text scale                         | Prefer relative/fluid sizing                 |
| Font weight  | `font-weight`                              | Emphasis/hierarchy                 | Variable fonts support ranges                |
| Line height  | `line-height`                              | Readability and rhythm             | Unitless value often best                    |
| Measure      | `max-inline-size: 60ch`                    | Comfortable line length            | `ch` depends on font                         |
| Wrapping     | `overflow-wrap`, `word-break`, `text-wrap` | Prevent overflow, improve headings | `word-break: break-all` can harm readability |
| Hyphenation  | `hyphens`                                  | Language-aware wrapping            | Requires `lang` attribute                    |
| Alignment    | `text-align`                               | Text alignment                     | Avoid centered long text                     |
| Font loading | `@font-face`, `font-display`               | Custom fonts                       | Loading strategy affects layout shift        |

```css
.prose {
  font-size: clamp(1rem, 0.96rem + 0.2vw, 1.125rem);
  line-height: 1.65;
  max-inline-size: 68ch;
}

.prose h1 {
  text-wrap: balance;
  line-height: 1.05;
}
```

*Common Pitfalls: Fixed pixel typography often breaks under zoom, localization, user font settings, and mixed CJK/Latin content.*

### Color, Background, and Theme Matrix — tokens, perceptual color, system colors

Modern CSS supports classic and perceptual color notations. Design systems should separate primitive color values from semantic token roles.

| Color Form     | Example                                        | Best Use                              | Caveat                             |
| -------------- | ---------------------------------------------- | ------------------------------------- | ---------------------------------- |
| Hex            | `#2563eb`                                      | Legacy/simple tokens                  | Less readable for alpha/perception |
| RGB            | `rgb(37 99 235 / 0.8)`                         | UI color with alpha                   | Device RGB space                   |
| HSL            | `hsl(220 80% 55%)`                             | Hue-based manipulation                | Not perceptually uniform           |
| Lab/LCH        | `lch(60% 70 250)`                              | Perceptual color work                 | Compatibility review               |
| OKLab/OKLCH    | `oklch(60% 0.18 250)`                          | Modern design systems                 | Use fallbacks if needed            |
| System colors  | `Canvas`, `CanvasText`, `Highlight`            | Forced-colors compatibility           | Useful for accessibility           |
| `currentColor` | `border-color: currentColor`                   | Inherit text color into borders/icons | Depends on `color`                 |
| `color-mix()`  | `color-mix(in oklch, var(--brand), white 20%)` | Derived tokens                        | Fallback may be needed             |

```css
:root {
  color-scheme: light dark;

  --color-bg: Canvas;
  --color-fg: CanvasText;
  --color-brand: oklch(58% 0.18 255);
  --color-border: color-mix(in oklch, var(--color-fg), transparent 80%);
}

body {
  background: var(--color-bg);
  color: var(--color-fg);
}
```

*Common Pitfalls: A palette that looks good in normal light mode may fail contrast, dark mode, forced-colors mode, and disabled-state distinction.*

### Custom Properties and Design Tokens — variables, inheritance, @property

Custom properties are runtime cascade values. They are not equivalent to Sass variables because they inherit, can be reassigned by selector context, and resolve when used.

| Pattern               | Example                                        | Use                     |
| --------------------- | ---------------------------------------------- | ----------------------- |
| Primitive token       | `--blue-600: oklch(...);`                      | Raw design value        |
| Semantic token        | `--color-action-bg: var(--blue-600);`          | Meaningful role         |
| Component token       | `.button { --button-bg: ...; }`                | Component API           |
| Fallback              | `var(--space, 1rem)`                           | Safe default            |
| Theme override        | `[data-theme="dark"] { --color-bg: ...; }`     | Runtime theming         |
| Inline dynamic value  | `style="--progress: 72%"`                      | JS-to-CSS bridge        |
| Typed custom property | `@property --angle { syntax: "<angle>"; ... }` | Animatable/typed tokens |

```css
@property --ring-size {
  syntax: "<length>";
  inherits: false;
  initial-value: 3px;
}

.button {
  --button-bg: var(--color-action-bg);
  background: var(--button-bg);
  outline: var(--ring-size) solid transparent;
}
```

*Common Pitfalls: Custom properties inherit by default; a token set high in the tree can unintentionally affect deeply nested components.*

### Animation, Transition, and Motion Matrix — states, keyframes, transforms, reduced motion

Motion should communicate state, not decorate at the expense of usability. CSS transitions handle simple state changes; keyframes handle named animation sequences. The `prefers-reduced-motion` media feature detects when a user has requested reduced non-essential motion. ([developer.mozilla.org][6])

| Technique         | Use                                       | Example                          | Performance Note               |
| ----------------- | ----------------------------------------- | -------------------------------- | ------------------------------ |
| Transition        | Smooth property change between states     | `transition: opacity 150ms ease` | Prefer cheap properties        |
| Keyframes         | Reusable motion sequence                  | `@keyframes fade-in`             | Keep purposeful                |
| Transform         | Move/scale/rotate visually                | `transform: translateY(-2px)`    | Usually better than `top/left` |
| Opacity           | Fade visibility                           | `opacity: 0`                     | Does not remove from layout    |
| Layout animation  | Width/height/top/left                     | Rarely preferred                 | Can trigger layout             |
| Motion preference | `@media (prefers-reduced-motion: reduce)` | Disable/reduce motion            | Required accessibility pattern |
| Starting style    | `@starting-style`                         | Entry transitions                | Compatibility review           |

```css
.button {
  transition:
    transform 120ms ease,
    background-color 120ms ease;
}

.button:hover {
  transform: translateY(-1px);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

*Common Pitfalls: Animating `width`, `height`, `top`, `left`, or expensive filters can create layout and paint costs that are visible as jank.*

### Accessibility Styling Matrix — focus, contrast, motion, forced colors, zoom

CSS can support or damage accessibility. It should reinforce semantic HTML and correct ARIA state, not replace them.

| Concern           | CSS Mechanism                                     | Required Practice                               |
| ----------------- | ------------------------------------------------- | ----------------------------------------------- |
| Keyboard focus    | `:focus-visible`, `outline`, `outline-offset`     | Always provide visible focus                    |
| Color contrast    | Text/background tokens                            | Test normal, hover, disabled, dark mode         |
| Reduced motion    | `prefers-reduced-motion`                          | Reduce non-essential motion                     |
| Dark mode         | `prefers-color-scheme`, `color-scheme`            | Respect user/system setting                     |
| Forced colors     | `forced-colors`, system colors                    | Avoid relying only on custom colors             |
| Text zoom         | Relative units, fluid layout                      | Avoid fixed-height text containers              |
| Hit targets       | Padding, spacing, layout                          | Preserve usable control size                    |
| State styling     | `[aria-expanded]`, `[aria-current]`, `:checked`   | Visual state must match semantic state          |
| Generated content | `::before`, `::after`                             | Decorative only                                 |
| Hiding            | `display: none`, `visibility`, clipping utilities | Choose based on visual and accessibility effect |

MDN documents `prefers-color-scheme` as detecting whether the user requested a light or dark color theme through operating-system or user-agent settings. ([developer.mozilla.org][7])

```css
:focus-visible {
  outline: 3px solid var(--focus-ring, Highlight);
  outline-offset: 3px;
}

@media (forced-colors: active) {
  .button {
    border: 1px solid ButtonText;
  }
}
```

*Common Pitfalls: Removing `outline` without an accessible replacement is a functional defect, not a styling preference.*

### Performance Matrix — loading, recalculation, layout, paint, compositing

CSS performance depends less on selector micro-optimization and more on loading strategy, unused CSS, layout cost, paint cost, and animation choices. MDN describes `content-visibility` as allowing user agents to skip rendering work such as layout and painting until content is needed. ([developer.mozilla.org][8])

| Performance Area          | Risk                                         | Better Practice                               |
| ------------------------- | -------------------------------------------- | --------------------------------------------- |
| Render-blocking CSS       | Large blocking stylesheets delay first paint | Critical CSS, split noncritical CSS carefully |
| `@import`                 | Can serialize stylesheet loading             | Prefer `<link>` or bundler output             |
| Unused CSS                | More bytes and more matching work            | Coverage tools, component ownership           |
| Layout thrashing          | JS repeatedly reads/writes layout            | Batch reads/writes; prefer CSS layout         |
| Expensive paint           | Large shadows, filters, blurs                | Use sparingly and test                        |
| Animation jank            | Layout/paint animation                       | Prefer `transform` and `opacity`              |
| Huge DOM + styles         | Style recalculation cost                     | Containment, virtualization, simpler DOM      |
| Offscreen rendering       | Work for invisible content                   | `content-visibility: auto` where appropriate  |
| Overly broad invalidation | Global custom property or class changes      | Scope state changes narrowly                  |

```css
.long-feed > article {
  content-visibility: auto;
  contain-intrinsic-size: 20rem;
}
```

*Common Pitfalls: `content-visibility` can improve rendering cost, but careless intrinsic-size guesses can cause layout shifts or scroll-position surprises.*

### Compatibility and Progressive Enhancement Matrix — Baseline, @supports, fallbacks

CSS compatibility should be handled through feature-specific decisions rather than broad assumptions.

| Tool / Method            | Use                                         | Example                                   |
| ------------------------ | ------------------------------------------- | ----------------------------------------- |
| MDN compatibility data   | Check browser support                       | Feature page tables                       |
| Baseline                 | Determine broad modern availability status  | Widely/newly available indicators         |
| `@supports`              | Gate feature-specific CSS                   | `@supports (display: grid)`               |
| Fallback first           | Write basic style before enhanced style     | Block layout before grid                  |
| Layered enhancement      | Add modern layout when supported            | `@supports (container-type: inline-size)` |
| Graceful degradation     | Accept simpler visual result                | No animation, simpler layout              |
| Polyfill/build transform | Use when required by product support policy | PostCSS/autoprefixer                      |
| Browser testing          | Verify behavior, not only support tables    | Safari/Firefox/Chromium checks            |

```css
.card-list {
  display: block;
}

.card-list > * + * {
  margin-block-start: 1rem;
}

@supports (display: grid) {
  .card-list {
    display: grid;
    gap: 1rem;
  }

  .card-list > * + * {
    margin-block-start: 0;
  }
}
```

*Common Pitfalls: Feature support does not guarantee that the feature is appropriate for a project’s browser policy, accessibility requirements, or fallback design.*

### Architecture Methodology Matrix — BEM, ITCSS, CUBE, utility-first, modules, layers

CSS architecture controls global risk. The goal is predictable ownership, low specificity, and explicit override paths.

| Methodology    | Core Idea                                  | Strength                        | Weakness                          | Best Fit                              |
| -------------- | ------------------------------------------ | ------------------------------- | --------------------------------- | ------------------------------------- |
| BEM            | Block, element, modifier class names       | Clear component ownership       | Verbose class names               | Component CSS in global stylesheets   |
| ITCSS          | Inverted triangle from generic to specific | Excellent global ordering       | Requires discipline               | Large traditional CSS codebases       |
| CUBE CSS       | Composition, utility, block, exception     | Balanced modern architecture    | Conceptual learning curve         | Design-system work                    |
| Utility-first  | Compose from atomic utility classes        | Speed, consistency, constraints | Markup verbosity                  | Product apps with strong token system |
| CSS Modules    | Build-scoped class names                   | Reduces accidental collisions   | Still needs global token strategy | Component frameworks                  |
| CSS-in-JS      | Style colocated with components            | Dynamic component styling       | Ordering/runtime/SSR complexity   | Complex app frameworks                |
| Cascade layers | Native precedence groups                   | Tool-agnostic cascade control   | Requires layer policy             | Any modern CSS system                 |
| Design tokens  | Named values for design decisions          | Consistency and theming         | Token sprawl risk                 | Design systems                        |

```css
@layer reset, tokens, base, layout, components, utilities, overrides;

@layer tokens {
  :root {
    --space-2: 0.5rem;
    --space-4: 1rem;
    --radius-md: 0.75rem;
  }
}
```

*Common Pitfalls: A methodology cannot compensate for unclear ownership, uncontrolled specificity, or undocumented override rules.*

### Naming and Commenting Conventions — classes, tokens, states, documentation

Names should encode stable meaning, not incidental appearance.

| Item            | Convention           | Example                                  | Avoid                               |
| --------------- | -------------------- | ---------------------------------------- | ----------------------------------- |
| Component block | Noun-based           | `.card`, `.modal`, `.site-header`        | `.blue-box`                         |
| Element         | Component part       | `.card__title`                           | `.card h2 span`                     |
| Modifier/state  | Variant or state     | `.button--primary`, `.is-active`         | `.big-red`                          |
| Utility         | Single-purpose       | `.u-visually-hidden`, `.text-center`     | Utility that mutates many concerns  |
| Token primitive | Scale/value          | `--space-4`, `--blue-600`                | `--nice-blue`                       |
| Token semantic  | Role                 | `--color-surface`, `--color-danger-text` | `--card-color-2`                    |
| Layer comment   | Boundary explanation | `/* Components: reusable UI blocks */`   | Repeating obvious property meanings |
| Hack comment    | Explain bug/support  | `/* Safari ... workaround */`            | Unexplained magic values            |

```css
/* Components: reusable product UI, lower priority than utilities */
@layer components {
  .notification {
    --notification-border: var(--color-info-border);
    border-inline-start: 4px solid var(--notification-border);
  }

  .notification--danger {
    --notification-border: var(--color-danger-border);
  }
}
```

*Common Pitfalls: Class names based on color, size, or current layout become wrong when the design changes.*

### Debugging Workflow Matrix — cascade, layout, overflow, stacking, performance

Debug CSS by identifying the failure category first. The same visual symptom can come from selector mismatch, cascade loss, inherited value, layout constraint, overflow, or stacking context.

| Symptom                   | Likely Cause                           | DevTools Inspection                  |
| ------------------------- | -------------------------------------- | ------------------------------------ |
| Rule does not apply       | Selector mismatch or invalid CSS       | Elements panel, matched rules        |
| Property crossed out      | Cascade loser or unsupported value     | Styles pane, computed pane           |
| Value unexpected          | Inheritance/custom property            | Computed styles, variable source     |
| Element overflows         | Intrinsic size, min-width, long text   | Box model, layout overlay            |
| Sticky not working        | Missing inset or wrong scroll ancestor | Scroll containers, computed position |
| `z-index` ignored         | Stacking context                       | Layers/stacking inspection           |
| Grid/flex alignment wrong | Axis misunderstanding                  | Grid/flex overlay                    |
| Text wraps badly          | `min-width`, `overflow-wrap`, measure  | Computed size and typography         |
| Animation janky           | Layout/paint property                  | Performance panel                    |
| CSS not loaded            | Network/cache/build path               | Network panel, source maps           |

```css
/* Debug fragment: temporarily reveal layout boundaries */
.debug-layout * {
  outline: 1px solid color-mix(in oklch, red, transparent 40%);
}
```

*Common Pitfalls: Looking only at source files misses the actual computed value, active layer, inherited value, and browser-normalized result.*

### Security and Privacy Matrix — injection, external resources, UI trust

CSS is not usually application logic, but untrusted or careless CSS can still alter UI trust, load external resources, obscure controls, and interact with privacy constraints.

| Risk                    | Example                                          | Mitigation                                             |
| ----------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| CSS injection           | User controls style attribute or custom property | Sanitize values, whitelist tokens                      |
| Hidden controls         | `opacity: 0`, offscreen overlays                 | Review third-party CSS, test UI states                 |
| Click interception      | `pointer-events`, positioned overlays            | Maintain UI ownership and review z-index layers        |
| External font tracking  | Remote font request                              | Self-host fonts or review provider policy              |
| Third-party stylesheet  | Global overrides or supply-chain risk            | Isolate, pin, audit, use CSP                           |
| Visited link privacy    | `:visited` restrictions                          | Do not rely on reading visited styles                  |
| CSP conflicts           | Inline style blocked                             | Use external stylesheets, hashes/nonces when necessary |
| Generated content abuse | Fake labels or warnings                          | Put meaningful content in DOM                          |

*Common Pitfalls: Hiding a control with CSS is not authorization; backend permissions and frontend behavior must enforce security.*

### Legacy, Deprecated, and Usually-Wrong Pattern Matrix — recognition and migration

Not every old pattern is formally deprecated. Some are legacy, unsafe, misleading, or usually wrong in modern production CSS.

| Item                              | Status               | Why Problematic                                | Modern Alternative         | Legacy Appearance    |
| --------------------------------- | -------------------- | ---------------------------------------------- | -------------------------- | -------------------- |
| Float page layout                 | Legacy               | Fragile full-page layout, clearfix hacks       | Flexbox/grid               | Older sites          |
| Table layout for non-tabular UI   | Usually wrong        | Semantic and responsive problems               | Grid/flex                  | Legacy enterprise UI |
| Global `!important`               | Usually wrong        | Destroys predictable overrides                 | Layers, lower specificity  | Utility overrides    |
| ID selectors for styling          | Usually wrong        | Excessive specificity                          | Component classes          | Old CSS              |
| Pixel-only layout                 | Usually wrong        | Poor zoom/localization response                | Relative/fluid units       | Static mockup CSS    |
| Removing focus outline            | Accessibility defect | Breaks keyboard navigation                     | Custom `:focus-visible`    | Reset files          |
| `@import` production loading      | Usually wrong        | Loading/order problems                         | `<link>`, bundling         | Old theme systems    |
| Magic-number absolute positioning | Usually wrong        | Content and viewport fragility                 | Grid/flex/intrinsic layout | Landing pages        |
| Meaningful generated content      | Usually wrong        | Accessibility/content reliability              | Real DOM text              | Icon-label hacks     |
| Old IE hacks                      | Obsolete/legacy      | No longer relevant for modern evergreen target | Remove or isolate          | Enterprise archives  |
| Overqualified selectors           | Usually wrong        | Specificity and coupling                       | `.component__part`         | CMS themes           |

*Common Pitfalls: Legacy CSS review should classify whether a pattern is obsolete, dangerous, merely old, or still acceptable under constrained circumstances.*

### Common Idioms and Production Patterns — reset, stack, cluster, grid, visually hidden

| Pattern          | Purpose                     | Minimal CSS                                                                |
| ---------------- | --------------------------- | -------------------------------------------------------------------------- |
| Border-box reset | Predictable box sizing      | `*, *::before, *::after { box-sizing: border-box; }`                       |
| Flow spacing     | Space direct children       | `.flow > * + * { margin-block-start: var(--flow-space, 1rem); }`           |
| Stack            | Vertical flex layout        | `.stack { display: flex; flex-direction: column; gap: var(--gap, 1rem); }` |
| Cluster          | Wrapping inline group       | `.cluster { display: flex; flex-wrap: wrap; gap: var(--gap, .75rem); }`    |
| Center           | Center content with measure | `.center { max-inline-size: 70rem; margin-inline: auto; }`                 |
| Sidebar          | Intrinsic sidebar layout    | Grid/flex with minmax or wrapping                                          |
| Card grid        | Responsive cards            | `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))`                          |
| Visually hidden  | Accessible hidden text      | Clip/inset utility with care                                               |
| Skip link        | Keyboard bypass link        | Hidden until focus                                                         |
| Theme tokens     | Runtime theming             | Custom properties on `:root` and theme scopes                              |

```css
.u-visually-hidden {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.u-visually-hidden:focus,
.skip-link:focus {
  position: static;
  inline-size: auto;
  block-size: auto;
  clip-path: none;
  white-space: normal;
}
```

*Common Pitfalls: Utility classes are useful when narrow and predictable; broad utilities that change layout, color, and behavior together become hidden components.*

### Compact Canonical Example — layered component CSS

This example demonstrates a compact professional structure: layers, tokens, component classes, accessibility states, container query enhancement, and reduced-motion handling.

```css
@layer reset, tokens, base, components, utilities;

@layer reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }
}

@layer tokens {
  :root {
    color-scheme: light dark;

    --space-2: 0.5rem;
    --space-4: 1rem;
    --space-6: 1.5rem;

    --radius-md: 0.75rem;
    --focus-ring: Highlight;

    --surface: Canvas;
    --text: CanvasText;
    --accent: oklch(58% 0.18 255);
  }
}

@layer base {
  body {
    background: var(--surface);
    color: var(--text);
    font-family: system-ui, sans-serif;
    line-height: 1.5;
  }

  :focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 3px;
  }
}

@layer components {
  .profile-card {
    container-type: inline-size;

    display: grid;
    gap: var(--space-4);
    padding: var(--space-6);
    border: 1px solid color-mix(in oklch, var(--text), transparent 80%);
    border-radius: var(--radius-md);
    background: var(--surface);
  }

  .profile-card__title {
    margin: 0;
    font-size: clamp(1.125rem, 2cqi, 1.5rem);
    line-height: 1.1;
  }

  .profile-card__action {
    justify-self: start;
    border: 0;
    border-radius: 999px;
    padding: 0.625rem 1rem;
    background: var(--accent);
    color: white;
    font: inherit;
    cursor: pointer;
    transition: transform 120ms ease;
  }

  .profile-card__action:hover {
    transform: translateY(-1px);
  }

  @container (inline-size >= 34rem) {
    .profile-card {
      grid-template-columns: auto 1fr;
      align-items: start;
    }

    .profile-card__action {
      grid-column: 2;
    }
  }
}

@layer utilities {
  .u-muted {
    color: color-mix(in oklch, var(--text), transparent 35%);
  }
}

@media (prefers-reduced-motion: reduce) {
  @layer components {
    .profile-card__action {
      transition: none;
    }

    .profile-card__action:hover {
      transform: none;
    }
  }
}
```

*Common Pitfalls: A component-level example should not rely on page-specific selectors such as `.main .sidebar .profile-card`; reusable components need local contracts.*

### Coverage Audit — deep coverage, compact coverage, omissions, separate guides

| Audit Category                            | Areas                                                                                                                                                                                                |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Areas covered deeply                      | Cascade, specificity, selectors, box model, display, flexbox, grid, responsive design, custom properties, architecture, accessibility, debugging                                                     |
| Areas covered compactly                   | Print CSS, multi-column layout, CSSOM, paged media, `@property`, `@scope`, `content-visibility`, modern color, browser-specific quirks                                                               |
| Areas intentionally omitted or brief      | Sass/Less-specific syntax, Tailwind-specific configuration, framework-specific CSS-in-JS APIs, exhaustive property reference, exhaustive browser bug catalog                                         |
| Areas requiring a separate advanced guide | CSS performance engineering, design-system architecture, advanced animation, CSS Houdini, full accessibility testing workflow, cross-browser compatibility engineering, print/paged-media production |

*Common Pitfalls: A coverage audit is useful only when it makes scope boundaries explicit; it should not hide advanced topics behind vague claims of completeness.*

## PART 3 — Fast Practical Tutorial

### Environment and File Setup — HTML document, stylesheet link, browser DevTools

This tutorial assumes **modern CSS in current evergreen browsers** and uses plain HTML plus native CSS. No framework, preprocessor, bundler, or JavaScript is required for the core workflow. This matches the requested CSS reference/tutoring scope from the uploaded task.

Create two files:

| File         | Purpose                                                                  |
| ------------ | ------------------------------------------------------------------------ |
| `index.html` | Provides semantic document structure                                     |
| `styles.css` | Provides layout, typography, color, interaction, and responsive behavior |

```html id="pgk5w8"
<!-- index.html -->
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Practical Tutorial</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="page">
    <h1>Modern CSS Practical Tutorial</h1>
    <p>This page is styled with a small professional CSS system.</p>
  </main>
</body>
</html>
```

```css id="eihv2r"
/* styles.css */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}

.page {
  max-inline-size: 70rem;
  margin-inline: auto;
  padding: 2rem;
}
```

Open `index.html` directly in a browser or serve it with a small local server:

```bash id="gqjrb2"
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

*Common Pitfalls: If CSS changes do not appear, check that `styles.css` is in the same directory as `index.html`, verify the `<link>` path, and hard-refresh the browser cache.*

### First Working Example — reset, base styles, readable page

Start with a minimal professional baseline. The goal is not to erase all browser defaults; the goal is to make sizing predictable, establish typography, and create a readable page shell.

```css id="dxo7wb"
/* styles.css */

/* [style] Predictable sizing across normal elements and pseudo-elements. */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* [style] Respect browser defaults where useful, but remove body margin. */
body {
  margin: 0;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  line-height: 1.5;
  background: Canvas;
  color: CanvasText;
}

/* [style] A centered page container with fluid side padding. */
.page {
  max-inline-size: 70rem;
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 3rem);
  padding-block: clamp(2rem, 6vw, 5rem);
}

h1 {
  line-height: 1.05;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

p {
  max-inline-size: 65ch;
}
```

This first example introduces four important practices:

| Practice                 | Reason                                            |
| ------------------------ | ------------------------------------------------- |
| `box-sizing: border-box` | Avoids common width plus padding overflow         |
| System font stack        | Fast, native, no font-loading dependency          |
| Logical properties       | Better for internationalization and writing modes |
| `clamp()`                | Fluid spacing without many breakpoints            |

*Common Pitfalls: Starting with an aggressive reset can damage form controls, lists, headings, and focus styles; use a reset only when its effects are understood.*

### Inspecting CSS in DevTools — matched rules, computed styles, box model

The first debugging workflow is simple: inspect the element, check matched rules, then check computed values.

| Question                              | DevTools Area                         |
| ------------------------------------- | ------------------------------------- |
| Is the stylesheet loaded?             | Network panel or Sources panel        |
| Does this selector match the element? | Elements panel                        |
| Is the declaration overridden?        | Styles panel crossed-out declarations |
| What value actually applied?          | Computed panel                        |
| Why is the element this size?         | Box model panel                       |
| Why does layout behave this way?      | Grid/Flex overlays                    |

Useful temporary debugging CSS:

```css id="jid34e"
/* Fragment: add this temporarily to inspect layout boundaries. */
.debug-layout * {
  outline: 1px solid color-mix(in oklch, red, transparent 40%);
}
```

Then add the class to the root element while debugging:

```html id="w27g6d"
<body class="debug-layout">
  ...
</body>
```

Remove debugging classes before committing production code.

*Common Pitfalls: Looking only at the source stylesheet can be misleading; DevTools shows the actual cascade, inherited values, computed values, and browser defaults.*

### Core Workflow — structure first, tokens second, layout third, components fourth

A reliable CSS workflow starts from the document and moves toward presentation. Avoid designing CSS around a screenshot before understanding the semantic structure and content variability.

| Step          | Action                                    | Output                                |
| ------------- | ----------------------------------------- | ------------------------------------- |
| Structure     | Write semantic HTML                       | Stable elements and class hooks       |
| Tokens        | Define reusable values                    | Colors, spacing, radii, typography    |
| Base          | Style body, headings, links, forms        | Consistent document foundation        |
| Layout        | Define page and region layout             | Shells, grids, stacks, clusters       |
| Components    | Style reusable UI blocks                  | Cards, buttons, forms, nav            |
| States        | Add hover, focus, active, disabled, error | Usable interactive behavior           |
| Adaptation    | Add media/container queries               | Responsive and component-aware layout |
| Accessibility | Verify focus, contrast, motion, zoom      | Inclusive behavior                    |
| Debugging     | Inspect cascade and layout                | Correctness under change              |

A practical file skeleton:

```css id="tqt0p5"
@layer reset, tokens, base, layout, components, utilities;

/* 1. Reset */
@layer reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }
}

/* 2. Tokens */
@layer tokens {
  :root {
    color-scheme: light dark;

    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-4: 1rem;
    --space-6: 1.5rem;
    --space-8: 2rem;

    --radius-md: 0.75rem;
    --radius-lg: 1rem;

    --color-surface: Canvas;
    --color-text: CanvasText;
    --color-accent: oklch(58% 0.18 255);
    --focus-ring: Highlight;
  }
}

/* 3. Base */
@layer base {
  body {
    background: var(--color-surface);
    color: var(--color-text);
    font-family: system-ui, sans-serif;
    line-height: 1.5;
  }

  :focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 3px;
  }
}

/* 4. Layout */
@layer layout {
  .page {
    max-inline-size: 72rem;
    margin-inline: auto;
    padding: clamp(1rem, 4vw, 3rem);
  }
}

/* 5. Components */
@layer components {
  .card {
    border: 1px solid color-mix(in oklch, var(--color-text), transparent 85%);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
  }
}

/* 6. Utilities */
@layer utilities {
  .u-muted {
    color: color-mix(in oklch, var(--color-text), transparent 35%);
  }
}
```

*Common Pitfalls: Adding component rules before deciding cascade layers and token names usually creates inconsistent overrides later.*

### Variables and Design Tokens — custom properties, semantic values, theming

CSS custom properties are the practical foundation for design tokens and theming. Use them to centralize values and expose component-level customization points.

A useful token hierarchy:

| Token Type      | Example             | Meaning                            |
| --------------- | ------------------- | ---------------------------------- |
| Primitive token | `--blue-600`        | Raw palette value                  |
| Semantic token  | `--color-action-bg` | Role-based value                   |
| Component token | `--button-bg`       | Component-specific local API       |
| State token     | `--button-bg-hover` | Interactive variant                |
| Runtime token   | `--progress`        | Value passed by JS or inline style |

```css id="zjag02"
@layer tokens {
  :root {
    --blue-600: oklch(58% 0.18 255);
    --blue-700: oklch(50% 0.2 255);

    --color-action-bg: var(--blue-600);
    --color-action-bg-hover: var(--blue-700);
    --color-action-text: white;
  }

  [data-theme="warm"] {
    --color-action-bg: oklch(62% 0.17 45);
    --color-action-bg-hover: oklch(54% 0.19 45);
  }
}

@layer components {
  .button {
    --button-bg: var(--color-action-bg);
    --button-bg-hover: var(--color-action-bg-hover);

    border: 0;
    border-radius: 999px;
    padding: 0.625rem 1rem;
    background: var(--button-bg);
    color: var(--color-action-text);
    font: inherit;
    cursor: pointer;
  }

  .button:hover {
    background: var(--button-bg-hover);
  }
}
```

HTML context:

```html id="u1yzkt"
<main class="page" data-theme="warm">
  <button class="button">Save changes</button>
</main>
```

*Common Pitfalls: Custom properties inherit and participate in the cascade; they are not compile-time constants like Sass variables.*

### Layout Primitive: Stack — vertical rhythm, flow spacing, reusable composition

A `stack` is one of the most useful layout primitives. It creates vertical spacing between children without assigning margins to every component.

```css id="v6e7fz"
@layer layout {
  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--stack-gap, 1rem);
  }
}
```

HTML context:

```html id="wvlpbe"
<section class="stack" style="--stack-gap: 1.5rem">
  <h2>Account settings</h2>
  <p>Manage profile, security, and notification preferences.</p>
  <button class="button">Edit profile</button>
</section>
```

When to use it:

| Situation                  | Use `stack`?                  |
| -------------------------- | ----------------------------- |
| Vertical form fields       | Yes                           |
| Card content               | Yes                           |
| Article sections           | Yes                           |
| Navigation row             | No, use `cluster` or flex row |
| Complex two-axis dashboard | No, use grid                  |

*Common Pitfalls: Margins on children can fight parent layout primitives; prefer parent-controlled `gap` for predictable component spacing.*

### Layout Primitive: Cluster — wrapping rows, tags, buttons, toolbar items

A `cluster` lays out items in a row that can wrap. It is useful for tags, toolbar actions, metadata, and button groups.

```css id="rm129x"
@layer layout {
  .cluster {
    display: flex;
    flex-wrap: wrap;
    gap: var(--cluster-gap, 0.75rem);
    align-items: center;
  }
}
```

HTML context:

```html id="dpv6v3"
<div class="cluster" aria-label="Article tags">
  <a class="tag" href="/tags/css">CSS</a>
  <a class="tag" href="/tags/layout">Layout</a>
  <a class="tag" href="/tags/accessibility">Accessibility</a>
</div>
```

```css id="f5s46o"
@layer components {
  .tag {
    border: 1px solid color-mix(in oklch, currentColor, transparent 70%);
    border-radius: 999px;
    padding: 0.25rem 0.625rem;
    color: inherit;
    text-decoration: none;
  }

  .tag:hover {
    background: color-mix(in oklch, currentColor, transparent 92%);
  }
}
```

*Common Pitfalls: A toolbar built with fixed widths and no wrapping usually breaks under localization, zoom, and small containers.*

### Component Styling: Button — states, accessibility, motion safety

A button component should style default, hover, focus, active, and disabled states. It should preserve keyboard focus and avoid motion that violates user preferences.

```css id="mqxcvm"
@layer components {
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    min-block-size: 2.75rem;
    border: 0;
    border-radius: 999px;
    padding-inline: 1rem;

    background: var(--button-bg, var(--color-action-bg));
    color: var(--button-fg, var(--color-action-text));
    font: inherit;
    font-weight: 650;
    text-decoration: none;
    cursor: pointer;

    transition:
      background-color 120ms ease,
      transform 120ms ease;
  }

  .button:hover {
    background: var(--button-bg-hover, var(--color-action-bg-hover));
    transform: translateY(-1px);
  }

  .button:active {
    transform: translateY(0);
  }

  .button:disabled,
  .button[aria-disabled="true"] {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .button:focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 3px;
  }
}

@media (prefers-reduced-motion: reduce) {
  @layer components {
    .button {
      transition: none;
    }

    .button:hover,
    .button:active {
      transform: none;
    }
  }
}
```

HTML context:

```html id="mf47kv"
<button class="button" type="button">Save changes</button>
<a class="button" href="/billing">Manage billing</a>
```

Use a real `<button>` for actions and an `<a>` for navigation. Styling an anchor like a button is acceptable when it navigates. Styling a `<div>` like a button is usually wrong.

*Common Pitfalls: A visually styled `<div>` is not a real button; keyboard behavior, focus, semantics, and disabled behavior must come from the correct HTML element or explicit JavaScript/ARIA work.*

### Component Styling: Card — container queries, local adaptation, component API

Container queries allow a component to adapt to its parent container instead of the viewport. This makes cards reusable in sidebars, grids, modals, and full-width layouts.

```html id="a50sfc"
<article class="product-card">
  <img class="product-card__image" src="product.jpg" alt="Black ergonomic office chair">
  <div class="product-card__body stack">
    <h2 class="product-card__title">Ergonomic Office Chair</h2>
    <p class="u-muted">Adjustable lumbar support, breathable mesh, and compact frame.</p>
    <a class="button" href="/products/chair">View product</a>
  </div>
</article>
```

```css id="v0z8kk"
@layer components {
  .product-card {
    container-type: inline-size;

    display: grid;
    gap: var(--space-4);
    overflow: hidden;

    border: 1px solid color-mix(in oklch, var(--color-text), transparent 85%);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
  }

  .product-card__image {
    inline-size: 100%;
    block-size: auto;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .product-card__body {
    padding: var(--space-6);
  }

  .product-card__title {
    margin: 0;
    font-size: clamp(1.125rem, 3cqi, 1.5rem);
    line-height: 1.1;
  }

  @container (inline-size >= 34rem) {
    .product-card {
      grid-template-columns: 14rem 1fr;
      align-items: stretch;
    }

    .product-card__image {
      block-size: 100%;
    }
  }
}
```

This component adapts when its own available inline size crosses `34rem`. It does not care whether the viewport is mobile or desktop.

*Common Pitfalls: Container queries require an ancestor with `container-type`; placing `@container` rules without a query container will not produce the expected adaptation.*

### Responsive Page Layout — grid, auto-fit, minmax, intrinsic sizing

A responsive card grid should rely on intrinsic sizing rather than many breakpoints.

```html id="ksy9c7"
<section class="section stack">
  <div class="section__header">
    <h2>Featured products</h2>
    <p class="u-muted">A responsive grid built with CSS Grid.</p>
  </div>

  <div class="card-grid">
    <article class="product-card">...</article>
    <article class="product-card">...</article>
    <article class="product-card">...</article>
  </div>
</section>
```

```css id="d9oky4"
@layer layout {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
    gap: clamp(1rem, 2vw, 1.5rem);
  }
}
```

Why this works:

| Piece              | Meaning                                |
| ------------------ | -------------------------------------- |
| `repeat(...)`      | Repeat the track definition            |
| `auto-fit`         | Collapse empty tracks when possible    |
| `minmax(...)`      | Set minimum and maximum track sizes    |
| `min(100%, 18rem)` | Avoid overflow in narrow containers    |
| `1fr`              | Let columns share available free space |

*Common Pitfalls: `minmax(18rem, 1fr)` can overflow very narrow containers; wrapping the minimum in `min(100%, 18rem)` prevents that common bug.*

### Forms and Validation Styling — labels, errors, focus, invalid state

CSS should style form states, but semantic HTML and accessible text must carry the actual meaning.

```html id="uncdvp"
<form class="form stack" action="/subscribe" method="post">
  <div class="field">
    <label class="field__label" for="email">Email address</label>
    <input
      class="field__control"
      id="email"
      name="email"
      type="email"
      autocomplete="email"
      required
      aria-describedby="email-error"
    >
    <p class="field__error" id="email-error">Enter a valid email address.</p>
  </div>

  <button class="button" type="submit">Subscribe</button>
</form>
```

```css id="crcdyn"
@layer components {
  .field {
    display: grid;
    gap: 0.375rem;
  }

  .field__label {
    font-weight: 650;
  }

  .field__control {
    inline-size: 100%;
    border: 1px solid var(--field-border, color-mix(in oklch, var(--color-text), transparent 75%));
    border-radius: var(--radius-md);
    padding: 0.75rem 0.875rem;
    background: var(--color-surface);
    color: var(--color-text);
    font: inherit;
  }

  .field__control:focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 2px;
  }

  .field:has(.field__control:user-invalid) {
    --field-border: oklch(55% 0.2 30);
  }

  .field__error {
    display: none;
    margin: 0;
    color: oklch(55% 0.2 30);
    font-size: 0.9375rem;
  }

  .field:has(.field__control:user-invalid) .field__error {
    display: block;
  }
}
```

If `:user-invalid` support is not acceptable for the project’s browser policy, use `:invalid` carefully or toggle an error class with JavaScript after validation.

*Common Pitfalls: Styling `:invalid` immediately on page load can show errors before the user has interacted with the form; prefer user-interaction-aware validation states when available.*

### Conditional Logic in CSS — media, supports, container, state selectors

CSS conditional logic is declarative. Instead of `if` statements, CSS uses conditional rules and selectors.

| Conditional Mechanism    | Equivalent Question                                    |
| ------------------------ | ------------------------------------------------------ |
| `@media`                 | Does the environment match this condition?             |
| `@container`             | Does the container match this condition?               |
| `@supports`              | Does the browser support this declaration or selector? |
| Pseudo-class             | Is this element in this state?                         |
| Attribute selector       | Does this element have this attribute/value?           |
| Custom property fallback | Is this value available?                               |

```css id="pcd7tx"
/* [portability] Fallback first. */
.alert {
  border-inline-start: 4px solid currentColor;
  padding: 1rem;
}

/* [portability] Enhance only if the browser supports color-mix. */
@supports (color: color-mix(in oklch, red, white)) {
  .alert {
    background: color-mix(in oklch, currentColor, transparent 92%);
  }
}

/* [functionality] State follows semantic attribute. */
.alert[aria-live="assertive"] {
  color: oklch(55% 0.2 30);
}

/* [accessibility] Respect user contrast preference where supported. */
@media (prefers-contrast: more) {
  .alert {
    border-inline-start-width: 6px;
  }
}
```

*Common Pitfalls: CSS feature queries test syntax support, not whether the complete design works acceptably across browsers and assistive settings.*

### Composition and Reuse — utilities, components, variants, state classes

Professional CSS separates reusable component rules from narrow utility rules. A component should own its internal styling; utilities should make small, predictable adjustments.

```html id="o76x61"
<article class="callout callout--success stack">
  <h2 class="callout__title">Payment received</h2>
  <p class="u-muted">The invoice was marked as paid.</p>
</article>
```

```css id="lysb97"
@layer components {
  .callout {
    --callout-accent: var(--color-accent);

    border: 1px solid color-mix(in oklch, var(--callout-accent), transparent 65%);
    border-inline-start-width: 5px;
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    background: color-mix(in oklch, var(--callout-accent), transparent 94%);
  }

  .callout--success {
    --callout-accent: oklch(58% 0.16 145);
  }

  .callout--danger {
    --callout-accent: oklch(55% 0.2 30);
  }

  .callout__title {
    margin: 0;
    line-height: 1.15;
  }
}

@layer utilities {
  .u-muted {
    color: color-mix(in oklch, var(--color-text), transparent 35%);
  }
}
```

Good composition:

| Layer            | Example             | Role                      |
| ---------------- | ------------------- | ------------------------- |
| Component        | `.callout`          | Owns callout structure    |
| Modifier         | `.callout--success` | Changes callout variant   |
| Utility          | `.u-muted`          | Applies narrow text style |
| Layout primitive | `.stack`            | Controls child spacing    |

*Common Pitfalls: Utilities become dangerous when they override many unrelated concerns; a utility should usually do one thing.*

### Error Handling and Fallbacks — invalid CSS, unsupported features, resilient defaults

CSS error handling is mostly silent. Invalid declarations are dropped. Unsupported selectors, properties, or values may be ignored. Therefore, write fallbacks first, then enhanced rules.

```css id="b0bcaf"
.dialog {
  /* [safety] Basic fallback layout works everywhere. */
  max-inline-size: 36rem;
  margin-inline: auto;
  padding: 1rem;
}

/* [portability] Enhanced layout only when grid is supported. */
@supports (display: grid) {
  .dialog {
    display: grid;
    gap: 1rem;
  }
}

/* [portability] Enhanced component adaptation only when container queries exist. */
@supports (container-type: inline-size) {
  .dialog-shell {
    container-type: inline-size;
  }

  @container (inline-size >= 48rem) {
    .dialog {
      grid-template-columns: 1fr auto;
    }
  }
}
```

Fallback strategy:

| Situation         | Pattern                                       |
| ----------------- | --------------------------------------------- |
| New property      | Declare older/simple value first              |
| New layout system | Write basic block layout first                |
| New color syntax  | Provide conventional color fallback if needed |
| New selector      | Avoid relying on it for essential access      |
| New at-rule       | Put essential styles outside the at-rule      |
| Browser bug risk  | Add targeted comment and test case            |

*Common Pitfalls: Do not put all essential styling inside a modern feature query unless the fallback is intentionally unstyled or simplified.*

### Debugging Common CSS Failures — overflow, specificity, stacking, sticky, flex/grid

CSS debugging improves when symptoms are mapped to likely causes.

| Symptom                        | Common Cause                             | First Fix to Try                                  |
| ------------------------------ | ---------------------------------------- | ------------------------------------------------- |
| Horizontal scroll              | Fixed width, long word, flex min-size    | `min-inline-size: 0`, `overflow-wrap: anywhere`   |
| Button style not applying      | Selector mismatch or layer conflict      | Inspect matched rules                             |
| Text cannot shrink in flex row | Flex item default min size               | `min-inline-size: 0`                              |
| Sticky element does not stick  | Missing inset or wrong overflow ancestor | Add `inset-block-start`, inspect scroll container |
| Tooltip behind card            | Stacking context trap                    | Inspect ancestor stacking contexts                |
| Grid columns overflow          | Minimum track too large                  | Use `minmax(min(100%, X), 1fr)`                   |
| Hover motion janky             | Layout property animation                | Animate `transform` or `opacity`                  |
| Dark mode wrong                | Token override incomplete                | Inspect computed custom properties                |

Useful debug snippets:

```css id="silsh9"
/* Fragment: identify overflow sources. */
.debug-overflow * {
  outline: 1px solid red;
}

/* Fragment: force long text testing. */
.debug-long-text {
  max-inline-size: 20rem;
  overflow-wrap: anywhere;
}

/* Fragment: reveal focus behavior during testing. */
.debug-focus :focus {
  outline: 4px solid red !important;
  outline-offset: 4px !important;
}
```

*Common Pitfalls: Adding `overflow: hidden` can hide the symptom while preserving the broken layout or clipping focus rings, shadows, dropdowns, and sticky behavior.*

### Realistic Mini-Project — responsive pricing section with tokens, grid, cards, states

This mini-project builds a responsive pricing section. It demonstrates semantic HTML, cascade layers, tokens, grid layout, component styling, container queries, accessibility states, and reduced-motion handling.

Complete `index.html`:

```html id="ks3q7d"
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pricing Section</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="page">
    <section class="pricing stack" aria-labelledby="pricing-title">
      <div class="section-header stack">
        <p class="eyebrow">Pricing</p>
        <h1 id="pricing-title">Plans that scale with your team</h1>
        <p class="section-header__lede">
          Choose a plan for experimentation, production, or enterprise governance.
        </p>
      </div>

      <div class="pricing-grid">
        <article class="plan-card stack">
          <h2 class="plan-card__title">Starter</h2>
          <p class="plan-card__price">$19 <span>/ month</span></p>
          <p class="u-muted">For small projects and prototypes.</p>
          <ul class="feature-list">
            <li>3 projects</li>
            <li>Email support</li>
            <li>Basic analytics</li>
          </ul>
          <a class</h1>
        <p class="section-header__lede">
          Choose a plan for experimentation="button button--secondary" href="/signup">Start trial</a>
        </article>

        <article class="plan-card plan-card--featured stack" aria-label="Pro plan, recommended">
          <p class="badge">Recommended</p>
          <h2 class="plan-card__title">Pro</h2>
          <p class="plan-card__price">$49 <span>/ month</span></p>
          <p class="u-muted">For production teams and growing products.</p>
          <ul class="feature-list">
            <li>Unlimited projects</li>
            <li>Priority support</li>
            <li>Advanced analytics</li>
          </ul>
          <a class="button" href="/signup/pro">Choose Pro</a>
        </article>

        <article class="plan-card stack">
          <h2 class="plan-card__title">Enterprise</h2>
          <p class="plan-card__price">Custom</p>
          <p class="u-muted">For security, compliance, and procurement needs.</p>
          <ul class="feature-list">
            <li>SSO and audit logs</li>
            <li>Dedicated support</li>
            <li>Custom contract terms</li>
          </ul>
          <a class="button button--secondary" href="/contact">Contact sales</a>
        </article>
      </div>
    </section>
  </main>
</body>
</html>
```

Complete `styles.css`:

```css id="vqv4vo"
@layer reset, tokens, base, layout, components, utilities;

/* [style] Reset only the predictable minimum. */
@layer reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body,
  h1,
  h2,
  p {
    margin: 0;
  }

  ul {
    margin: 0;
    padding-inline-start: 1.25rem;
  }
}

/* [style] Semantic tokens separate design roles from raw values. */
@layer tokens {
  :root {
    color-scheme: light dark;

    --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-12: 3rem;

    --radius-md: 0.75rem;
    --radius-lg: 1.25rem;

    --color-surface: Canvas;
    --color-surface-raised: color-mix(in oklch, Canvas, CanvasText 4%);
    --color-text: CanvasText;
    --color-muted: color-mix(in oklch, CanvasText, transparent 35%);
    --color-border: color-mix(in oklch, CanvasText, transparent 82%);
    --color-accent: oklch(58% 0.18 255);
    --color-accent-strong: oklch(50% 0.2 255);
    --color-accent-soft: color-mix(in oklch, var(--color-accent), transparent 88%);
    --focus-ring: Highlight;
  }
}

/* [style] Base document styles. */
@layer base {
  body {
    min-block-size: 100vh;
    background:
      radial-gradient(circle at top left, var(--color-accent-soft), transparent 28rem),
      var(--color-surface);
    color: var(--color-text);
    font-family: var(--font-sans);
    line-height: 1.5;
  }

  a {
    color: inherit;
  }

  :focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 3px;
  }
}

/* [functionality] Layout primitives compose sections without page-specific selectors. */
@layer layout {
  .page {
    max-inline-size: 76rem;
    margin-inline: auto;
    padding-inline: clamp(1rem, 4vw, 3rem);
    padding-block: clamp(2rem, 8vw, 6rem);
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--stack-gap, 1rem);
  }

  .pricing {
    --stack-gap: var(--space-8);
  }

  .section-header {
    --stack-gap: var(--space-3);
    max-inline-size: 52rem;
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
    gap: clamp(1rem, 2vw, 1.5rem);
    align-items: stretch;
  }
}

/* [functionality] Components own their internal visual contract. */
@layer components {
  .eyebrow {
    color: var(--color-accent);
    font-weight: 750;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .section-header h1 {
    max-inline-size: 12ch;
    font-size: clamp(2.25rem, 8vw, 5rem);
    line-height: 0.95;
    letter-spacing: -0.06em;
    text-wrap: balance;
  }

  .section-header__lede {
    max-inline-size: 65ch;
    color: var(--color-muted);
    font-size: clamp(1rem, 1vw + 0.8rem, 1.25rem);
  }

  .plan-card {
    --stack-gap: var(--space-4);
    container-type: inline-size;

    position: relative;
    padding: clamp(1.25rem, 4cqi, 2rem);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface-raised);
    box-shadow: 0 1rem 3rem color-mix(in oklch, black, transparent 92%);
  }

  .plan-card--featured {
    border-color: color-mix(in oklch, var(--color-accent), transparent 35%);
    box-shadow: 0 1.25rem 4rem color-mix(in oklch, var(--color-accent), transparent 80%);
  }

  .plan-card__title {
    font-size: clamp(1.25rem, 5cqi, 1.75rem);
    line-height: 1.1;
  }

  .plan-card__price {
    font-size: clamp(2rem, 10cqi, 3rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .plan-card__price span {
    color: var(--color-muted);
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: normal;
  }

  .badge {
    align-self: start;
    border-radius: 999px;
    padding: 0.25rem 0.625rem;
    background: var(--color-accent-soft);
    color: var(--color-accent);
    font-size: 0.875rem;
    font-weight: 700;
  }

  .feature-list {
    display: grid;
    gap: var(--space-2);
    color: var(--color-muted);
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-block-size: 2.75rem;
    margin-block-start: auto;
    border-radius: 999px;
    padding-inline: 1rem;
    background: var(--color-accent);
    color: white;
    font-weight: 750;
    text-decoration: none;
    transition:
      background-color 140ms ease,
      transform 140ms ease;
  }

  .button:hover {
    background: var(--color-accent-strong);
    transform: translateY(-1px);
  }

  .button--secondary {
    background: transparent;
    color: var(--color-text);
    box-shadow: inset 0 0 0 1px var(--color-border);
  }

  .button--secondary:hover {
    background: color-mix(in oklch, var(--color-text), transparent 94%);
  }

  @container (inline-size >= 28rem) {
    .plan-card {
      min-block-size: 30rem;
    }
  }
}

/* [style] Narrow utilities only. */
@layer utilities {
  .u-muted {
    color: var(--color-muted);
  }
}

/* [accessibility] Motion preference overrides nonessential transform effects. */
@media (prefers-reduced-motion: reduce) {
  @layer components {
    .button {
      transition: none;
    }

    .button:hover {
      transform: none;
    }
  }
}

/* [accessibility] Forced-colors support preserves visible boundaries. */
@media (forced-colors: active) {
  @layer components {
    .plan-card,
    .button--secondary {
      border: 1px solid CanvasText;
      box-shadow: none;
    }
  }
}
```

What the mini-project demonstrates:

| Concept            | Where It Appears                                            |
| ------------------ | ----------------------------------------------------------- |
| Cascade layers     | `@layer reset, tokens, base, layout, components, utilities` |
| Design tokens      | `:root` custom properties                                   |
| Fluid typography   | `clamp()` on headings and prices                            |
| Responsive layout  | `repeat(auto-fit, minmax(...))`                             |
| Container queries  | `.plan-card` with `container-type` and `@container`         |
| Accessible focus   | Global `:focus-visible`                                     |
| Reduced motion     | `prefers-reduced-motion`                                    |
| Forced colors      | `forced-colors: active`                                     |
| Component variants | `.plan-card--featured`, `.button--secondary`                |
| Utility discipline | `.u-muted` only changes text color                          |

*Common Pitfalls: A realistic CSS mini-project should be tested with long text, narrow containers, keyboard navigation, browser zoom, dark mode, reduced motion, and forced-colors mode—not only at the default desktop viewport.*

## PART 4 — Best High-Frequency Items to Memorize

### Memorization Strategy — cascade first, layout second, accessibility always

For professional CSS fluency, memorize the items that prevent the largest number of real defects: cascade rules, selector specificity, box sizing, layout primitives, responsive patterns, custom properties, focus states, and debugging techniques. This section follows the requested CSS memorization target from the uploaded specification.

| Priority | Memorize First                                            | Why It Matters                |
| -------- | --------------------------------------------------------- | ----------------------------- |
| Highest  | Cascade, specificity, inheritance, `box-sizing`           | Most CSS bugs start here      |
| Highest  | `display`, flexbox, grid, positioning                     | Layout fluency                |
| Highest  | `rem`, `em`, `%`, `fr`, viewport/container units          | Responsive sizing             |
| High     | `var()`, custom properties, `clamp()`                     | Tokens, theming, fluid design |
| High     | `:focus-visible`, `prefers-reduced-motion`, forced colors | Accessibility correctness     |
| High     | DevTools computed styles, box model, grid/flex overlays   | Debugging speed               |
| Medium   | `@supports`, `@media`, `@container`, `@layer`             | Production architecture       |
| Medium   | `overflow`, `min-inline-size: 0`, stacking contexts       | Common layout failures        |

*Common Pitfalls: Memorizing many properties without memorizing cascade and layout rules produces shallow CSS fluency; CSS competence is mostly conflict resolution and layout prediction.*

### Cascade and Specificity Items — @layer, :where, :is, inherit, revert

| Item           | Meaning                                                  | When to Use                                       | Minimal Example                                        | Memory Cue                                 | Common Pitfall                                              |
| -------------- | -------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------ | ----------------------------------------------------------- |
| `@layer`       | Defines cascade precedence groups                        | Large stylesheets, design systems, utility layers | `@layer reset, base, components, utilities;`           | Layers beat specificity within layer order | Forgetting that later layers win over earlier normal layers |
| `:where()`     | Selector wrapper with zero specificity                   | Low-specificity defaults                          | `:where(.stack > * + *) { margin-block-start: 1rem; }` | “Where adds no weight”                     | Expecting it to increase specificity                        |
| `:is()`        | Selector wrapper that takes highest argument specificity | Compact selector lists                            | `:is(h1, h2, h3) { line-height: 1.1; }`                | “Is inherits strongest argument”           | Accidentally raising specificity with an ID argument        |
| `:not()`       | Excludes matching elements                               | State and structural exclusions                   | `.nav a:not([aria-current]) { opacity: .8; }`          | “Not still counts arguments”               | Assuming it has zero specificity                            |
| `!important`   | Raises declaration importance                            | Rare forced override boundaries                   | `.u-hidden { display: none !important; }`              | Emergency lever                            | Using it to compensate for bad architecture                 |
| `inherit`      | Force inherited value                                    | Align child with parent value                     | `border-color: inherit;`                               | Take parent value                          | Applying it to non-inherited properties without intent      |
| `initial`      | CSS initial value                                        | Reset to specification default                    | `display: initial;`                                    | Spec default                               | Often not browser/user-agent default                        |
| `unset`        | Inherit if inherited, otherwise initial                  | Generic reset                                     | `all: unset;`                                          | “Undo depending on inheritance”            | Nuking accessibility-relevant control styles                |
| `revert`       | Revert to previous cascade origin                        | Undo author styles                                | `font: revert;`                                        | Back to browser/user layer                 | Misunderstanding difference from `initial`                  |
| `revert-layer` | Revert declarations from current layer                   | Layered architecture escape hatch                 | `color: revert-layer;`                                 | Back out of current layer                  | Useless without understanding layer order                   |

Canonical cascade memory pattern:

```css id="yw2m6i"
@layer reset, base, components, utilities;

@layer base {
  :where(button, input, textarea, select) {
    font: inherit;
  }
}

@layer components {
  .button {
    background: var(--color-action-bg);
  }
}

@layer utilities {
  .u-bg-danger {
    background: var(--color-danger-bg);
  }
}
```

*Common Pitfalls: Do not debug CSS conflicts by increasing selector weight first; inspect layer, importance, specificity, inheritance, and source order before changing selectors.*

### Selector Items — class, attribute, combinators, state, relational matching

| Item                   | Meaning                             | When to Use                         | Minimal Example                                    | Memory Cue             | Common Pitfall                             |
| ---------------------- | ----------------------------------- | ----------------------------------- | -------------------------------------------------- | ---------------------- | ------------------------------------------ |
| `.class`               | Reusable styling hook               | Components and utilities            | `.card { padding: 1rem; }`                         | Main daily selector    | Using classes based only on color or size  |
| `#id`                  | Unique element selector             | Rare styling use                    | `#main { scroll-margin-top: 4rem; }`               | Heavy specificity      | Styling components with IDs                |
| `[attr]`               | Attribute presence                  | Semantic/state hooks                | `[hidden] { display: none; }`                      | Match attribute exists | Styling fake state not reflected in HTML   |
| `[attr="value"]`       | Exact attribute value               | ARIA/data states                    | `[aria-expanded="true"] { ... }`                   | Match state value      | Visual state diverging from semantic state |
| `>`                    | Direct child combinator             | Known parent-child structure        | `.menu > li { ... }`                               | One level down         | Fragile if markup changes                  |
| `+`                    | Adjacent sibling                    | Spacing between exact neighbors     | `h2 + p { margin-block-start: .5rem; }`            | Next sibling only      | Breaks when another node appears           |
| `~`                    | Later sibling                       | CSS-only toggles                    | `input:checked ~ .panel { display: block; }`       | Later sibling group    | Depends on source order                    |
| `:hover`               | Pointer hover state                 | Pointer affordance                  | `.button:hover { ... }`                            | Pointer over           | Not available on all input modes           |
| `:focus-visible`       | Keyboard-relevant focus indicator   | Accessible focus styling            | `:focus-visible { outline: 3px solid Highlight; }` | Visible keyboard focus | Removing outlines globally                 |
| `:focus-within`        | Element contains focused descendant | Form groups, menus                  | `.field:focus-within { ... }`                      | Focus inside           | Treating it as same as direct focus        |
| `:has()`               | Parent/relational selector          | Parent styling based on child state | `.field:has(input:invalid) { ... }`                | Parent can look inside | Overusing for deeply coupled structures    |
| `::before` / `::after` | Generated pseudo-elements           | Decorative icons, ornaments         | `.tag::before { content: "#"; }`                   | Generated decoration   | Putting essential content in CSS           |

```css id="urxl93"
.field:has(input:focus-visible) {
  border-color: var(--focus-ring);
}

.field:has(input:user-invalid) {
  border-color: var(--color-danger);
}
```

*Common Pitfalls: Selectors should express stable structure or state; selectors tied to incidental nesting create brittle CSS.*

### Box Model and Sizing Items — border-box, logical properties, intrinsic sizing

| Item                     | Meaning                           | When to Use                        | Minimal Example                                      | Memory Cue                | Common Pitfall                                          |
| ------------------------ | --------------------------------- | ---------------------------------- | ---------------------------------------------------- | ------------------------- | ------------------------------------------------------- |
| `box-sizing: border-box` | Width includes padding and border | Global sizing baseline             | `*, *::before, *::after { box-sizing: border-box; }` | Box includes border       | Forgetting third-party widgets may assume `content-box` |
| `inline-size`            | Logical width                     | Writing-mode-aware layouts         | `.card { inline-size: 100%; }`                       | Width in text direction   | Mixing logical and physical properties carelessly       |
| `block-size`             | Logical height                    | Writing-mode-aware block dimension | `.hero { min-block-size: 100svh; }`                  | Height in block direction | Hard fixed heights clipping content                     |
| `min-inline-size: 0`     | Allow flex/grid child to shrink   | Fix overflow in flex/grid          | `.item { min-inline-size: 0; }`                      | Let it shrink             | Missing this in text-heavy flex rows                    |
| `max-inline-size`        | Maximum readable width            | Articles and containers            | `.prose { max-inline-size: 65ch; }`                  | Max measure               | Setting width instead of max-width                      |
| `overflow`               | Scroll/clipping behavior          | Scroll containers, clipping        | `.panel { overflow: auto; }`                         | Manage overflow           | Using `hidden` to mask layout bugs                      |
| `overflow-wrap`          | Break long text                   | User content, URLs                 | `.prose { overflow-wrap: anywhere; }`                | Break long words          | Using `word-break: break-all` by default                |
| `aspect-ratio`           | Preferred box ratio               | Media cards, placeholders          | `.thumb { aspect-ratio: 16 / 9; }`                   | Ratio before image loads  | Expecting it to override all content constraints        |
| `object-fit`             | Image/video fit inside box        | Cropped thumbnails                 | `img { object-fit: cover; }`                         | Image fit mode            | Forgetting to set box size/aspect ratio                 |
| `margin-inline: auto`    | Center block or absorb space      | Center containers, push flex item  | `.page { margin-inline: auto; }`                     | Auto absorbs free space   | Expecting vertical centering                            |

```css id="d92qw0"
.media {
  display: flex;
  gap: 1rem;
}

.media__body {
  min-inline-size: 0;
}

.media__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

*Common Pitfalls: Many “CSS overflow bugs” are actually minimum-size bugs, especially inside flex and grid containers.*

### Layout Items — display, flexbox, grid, position, gap

| Item                    | Meaning                                                        | When to Use                | Minimal Example                                              | Memory Cue               | Common Pitfall                                  |
| ----------------------- | -------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------ | ------------------------ | ----------------------------------------------- |
| `display: grid`         | Two-dimensional layout context                                 | Cards, shells, dashboards  | `.grid { display: grid; gap: 1rem; }`                        | Rows and columns         | Using grid for simple inline clusters           |
| `display: flex`         | One-dimensional layout context                                 | Toolbars, stacks, clusters | `.row { display: flex; gap: 1rem; }`                         | One main axis            | Using flex when grid tracks are needed          |
| `gap`                   | Space between flex/grid items                                  | Replace child margins      | `.stack { display: grid; gap: 1rem; }`                       | Parent owns spacing      | Combining with child margins unintentionally    |
| `place-items`           | Shorthand for align/justify items                              | Centering in grid          | `.center { display: grid; place-items: center; }`            | Place children           | Axis confusion in non-grid contexts             |
| `grid-template-columns` | Defines grid columns                                           | Responsive grids           | `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))`            | Track recipe             | Forgetting narrow-container overflow            |
| `grid-template-areas`   | Named layout regions                                           | Page shells                | `"header header" "nav main"`                                 | Visual map               | Area names must form rectangles                 |
| `flex: 1`               | Flexible item growth/shrink                                    | Equal flex children        | `.item { flex: 1; }`                                         | Fill available main axis | Hiding underlying basis/shrink behavior         |
| `flex-wrap: wrap`       | Allow flex lines                                               | Chips and nav clusters     | `.cluster { flex-wrap: wrap; }`                              | Wrap row                 | Expecting masonry/grid behavior                 |
| `position: relative`    | Offset without leaving flow; containing block for abs children | Local overlay anchor       | `.card { position: relative; }`                              | Local reference          | Offsetting visually without moving layout space |
| `position: absolute`    | Removed from flow                                              | Badges, overlays           | `.badge { position: absolute; inset: 1rem 1rem auto auto; }` | Overlay inside ancestor  | Missing positioned ancestor                     |
| `position: sticky`      | Flow element that sticks after threshold                       | Sticky header/sidebar      | `.toc { position: sticky; inset-block-start: 1rem; }`        | Relative until stuck     | Wrong scroll ancestor or missing inset          |
| `isolation: isolate`    | Create local stacking context                                  | Component z-index boundary | `.card { isolation: isolate; }`                              | Local z-index world      | Expecting it to fix all layering issues         |

```css id="c2p7wg"
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
}
```

*Common Pitfalls: Flexbox distributes items along a primary axis; grid defines tracks. Choosing the wrong layout model creates unnecessary overrides.*

### Responsive Items — media queries, container queries, clamp, viewport units

| Item                     | Meaning                           | When to Use                              | Minimal Example                                   | Memory Cue                  | Common Pitfall                                     |
| ------------------------ | --------------------------------- | ---------------------------------------- | ------------------------------------------------- | --------------------------- | -------------------------------------------------- |
| `@media`                 | Environment or viewport condition | Page-level breakpoints, user preferences | `@media (width >= 64rem) { ... }`                 | Whole viewport/environment  | Using viewport breakpoints for reusable components |
| `@container`             | Container condition               | Component-level adaptation               | `@container (inline-size >= 30rem) { ... }`       | Parent space decides        | Forgetting `container-type`                        |
| `container-type`         | Creates query container           | Enable container queries                 | `.card-list { container-type: inline-size; }`     | Make it queryable           | Applying it to wrong ancestor                      |
| `clamp()`                | Minimum, preferred, maximum       | Fluid type/spacing                       | `font-size: clamp(1rem, 2vw, 1.5rem);`            | Bound fluid value           | Bad min/max values                                 |
| `min()`                  | Smaller of values                 | Avoid overflow                           | `min(100%, 18rem)`                                | Choose smaller              | Forgetting property reference context              |
| `max()`                  | Larger of values                  | Lower bounds                             | `padding: max(1rem, 2vw);`                        | Choose larger               | Excessive growth on large screens                  |
| `svh`                    | Small viewport height             | Mobile viewport-safe sections            | `min-block-size: 100svh;`                         | Small viewport              | Choosing wrong viewport unit                       |
| `dvh`                    | Dynamic viewport height           | Dynamic viewport adjustment              | `block-size: 100dvh;`                             | Dynamic viewport            | Layout shift from browser chrome changes           |
| `cqi`                    | Container inline-size unit        | Component-fluid sizing                   | `font-size: clamp(1rem, 4cqi, 1.5rem);`           | Container query inline unit | Requires suitable containment context              |
| `prefers-color-scheme`   | User light/dark preference        | Theme adaptation                         | `@media (prefers-color-scheme: dark) { ... }`     | System theme                | Forgetting `color-scheme` for native controls      |
| `prefers-reduced-motion` | User motion preference            | Motion reduction                         | `@media (prefers-reduced-motion: reduce) { ... }` | Motion safety               | Only reducing some animations                      |
| `forced-colors`          | High contrast/forced color mode   | Accessibility resilience                 | `@media (forced-colors: active) { ... }`          | System colors               | Relying on decorative color alone                  |

```css id="p9a29q"
.card {
  container-type: inline-size;
  padding: clamp(1rem, 4cqi, 2rem);
}

@container (inline-size >= 36rem) {
  .card {
    grid-template-columns: auto 1fr;
  }
}
```

*Common Pitfalls: Responsive CSS should not be only a list of breakpoints; combine intrinsic layout, fluid values, media queries, and container queries.*

### Typography Items — rem, line-height, measure, text-wrap, font loading

| Item                      | Meaning                    | When to Use               | Minimal Example                         | Memory Cue              | Common Pitfall                                      |
| ------------------------- | -------------------------- | ------------------------- | --------------------------------------- | ----------------------- | --------------------------------------------------- |
| `rem`                     | Root-font-relative unit    | Global spacing/type scale | `padding: 1rem;`                        | Root em                 | Assuming it equals fixed pixels under user settings |
| `em`                      | Current-font-relative unit | Component-local spacing   | `.button { padding-inline: 1em; }`      | Element em              | Compounding unexpectedly                            |
| Unitless `line-height`    | Multiplies local font size | Body and components       | `line-height: 1.5;`                     | Scales with font        | Using fixed pixel line-height                       |
| `ch`                      | Width of “0” glyph         | Readable measure          | `max-inline-size: 65ch;`                | Character measure       | Font-dependent                                      |
| `text-wrap: balance`      | Balance line breaks        | Headings                  | `h1 { text-wrap: balance; }`            | Balanced heading        | Not for long body text                              |
| `overflow-wrap: anywhere` | Break long unbroken text   | User content, URLs        | `.content { overflow-wrap: anywhere; }` | Emergency wrap          | Can produce awkward breaks                          |
| `font-display`            | Font loading behavior      | Custom web fonts          | `font-display: swap;`                   | Avoid invisible text    | Layout shift from font swap                         |
| `font: inherit`           | Inherit font shorthand     | Form controls/buttons     | `button { font: inherit; }`             | Controls match text     | Shorthand resets font subproperties                 |
| `font-weight` ranges      | Variable/font weights      | Typography hierarchy      | `font-weight: 650;`                     | Variable-capable weight | Font may not support exact weight                   |

```css id="wqylqf"
body {
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}

.prose {
  max-inline-size: 68ch;
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
}
```

*Common Pitfalls: Fixed heights and fixed line-heights are common causes of clipped text under zoom, localization, and user font preferences.*

### Color and Theme Items — currentColor, color-scheme, system colors, tokens

| Item                    | Meaning                           | When to Use                     | Minimal Example                                     | Memory Cue                 | Common Pitfall                                 |
| ----------------------- | --------------------------------- | ------------------------------- | --------------------------------------------------- | -------------------------- | ---------------------------------------------- |
| `currentColor`          | Current text color                | Borders, icons, shadows         | `border-color: currentColor;`                       | Use text color             | Unexpected if `color` inherited differently    |
| `color-scheme`          | Indicates supported color schemes | Native controls and UA surfaces | `:root { color-scheme: light dark; }`               | Tell browser theme support | Thinking it creates a full theme alone         |
| `Canvas` / `CanvasText` | System colors                     | Forced-colors-aware defaults    | `background: Canvas; color: CanvasText;`            | System surface/text        | Not matching custom brand palette              |
| `oklch()`               | Perceptual color notation         | Modern tokens                   | `--accent: oklch(58% 0.18 255);`                    | Lightness/chroma/hue       | Needs fallback policy in older support targets |
| `color-mix()`           | Mix colors in a color space       | Derived surfaces/borders        | `color-mix(in oklch, var(--text), transparent 80%)` | Mix tokens                 | Missing fallback where required                |
| Semantic token          | Role-based variable               | Theme consistency               | `--color-danger-text`                               | Meaning over raw color     | Naming tokens after appearance only            |
| Theme scope             | Override tokens in subtree        | Local themes                    | `[data-theme="dark"] { ... }`                       | Scope the theme            | Partial token override creates mismatched UI   |
| Alpha color             | Transparent color                 | Overlays, borders               | `rgb(0 0 0 / .25)`                                  | Slash alpha                | Low contrast after blending                    |

```css id="dty37y"
:root {
  color-scheme: light dark;

  --color-surface: Canvas;
  --color-text: CanvasText;
  --color-accent: oklch(58% 0.18 255);
  --color-border: color-mix(in oklch, var(--color-text), transparent 82%);
}
```

*Common Pitfalls: Visual color decisions are not enough; verify contrast, dark mode, disabled state, forced-colors mode, and semantic state distinction.*

### Accessibility Items — focus, motion, hiding, states, semantics boundary

| Item                     | Meaning                                   | When to Use              | Minimal Example                                    | Memory Cue             | Common Pitfall                                    |
| ------------------------ | ----------------------------------------- | ------------------------ | -------------------------------------------------- | ---------------------- | ------------------------------------------------- |
| `:focus-visible`         | Accessible focus selector                 | Keyboard focus style     | `:focus-visible { outline: 3px solid Highlight; }` | Focus that should show | Removing outlines                                 |
| `outline-offset`         | Space around focus outline                | Better focus visibility  | `outline-offset: 3px;`                             | Offset ring            | Clipped by `overflow: hidden`                     |
| `prefers-reduced-motion` | User requested less motion                | Animations/transitions   | `@media (prefers-reduced-motion: reduce) { ... }`  | Respect motion setting | Only disabling one animation                      |
| `forced-colors`          | Forced color mode                         | High-contrast support    | `@media (forced-colors: active) { ... }`           | System colors mode     | Encoding state only by color                      |
| `.u-visually-hidden`     | Hide visually but keep accessible         | Extra screen-reader text | Clip utility                                       | Accessible hidden text | Using for focusable content carelessly            |
| `[aria-current]`         | Current item state                        | Navigation styling       | `[aria-current="page"] { font-weight: 700; }`      | Current page           | Styling ARIA without correct semantics            |
| `[aria-expanded]`        | Expanded/collapsed state                  | Disclosure/menu styling  | `[aria-expanded="true"] { ... }`                   | Open state             | Visual state and ARIA state diverge               |
| `pointer-events: none`   | Ignore pointer events                     | Decorative overlays      | `.icon { pointer-events: none; }`                  | Click passes through   | Making interactive elements unreachable           |
| `display: none`          | Remove from layout and accessibility tree | Truly hidden content     | `[hidden] { display: none; }`                      | Gone                   | Using it for content that should remain announced |

```css id="zxgxfg"
:focus-visible {
  outline: 3px solid Highlight;
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

*Common Pitfalls: CSS can style accessible states, but it cannot create correct semantics by itself; use proper HTML and ARIA only where appropriate.*

### Animation and Effects Items — transition, transform, opacity, keyframes

| Item                  | Meaning                        | When to Use                | Minimal Example                            | Memory Cue            | Common Pitfall                                             |
| --------------------- | ------------------------------ | -------------------------- | ------------------------------------------ | --------------------- | ---------------------------------------------------------- |
| `transition`          | Smooth between property values | Hover/focus/state changes  | `transition: transform 120ms ease;`        | State interpolation   | Transitioning every property                               |
| `transform`           | Visual geometry transform      | Cheap movement/scale       | `transform: translateY(-2px);`             | Move without layout   | Creates stacking context                                   |
| `opacity`             | Transparency                   | Fade in/out                | `opacity: .5;`                             | Fade                  | Invisible elements may still receive events unless handled |
| `@keyframes`          | Named animation sequence       | Repeated/complex animation | `@keyframes fade { from { opacity: 0; } }` | Motion recipe         | Infinite decorative motion                                 |
| `animation-fill-mode` | Before/after animation state   | Preserve final keyframe    | `animation-fill-mode: both;`               | Fill outside timeline | Unexpected retained style                                  |
| `will-change`         | Hint future change             | Rare performance hint      | `will-change: transform;`                  | Prepare layer         | Overuse wastes memory                                      |
| `filter`              | Visual filter effects          | Blur/brightness effects    | `filter: blur(8px);`                       | Pixel effect          | Expensive on large areas                                   |
| `box-shadow`          | Shadow effect                  | Elevation                  | `box-shadow: 0 1rem 2rem ...;`             | Surface depth         | Large blurred shadows can be costly                        |

```css id="wvq8wc"
.card {
  transition:
    transform 140ms ease,
    box-shadow 140ms ease;
}

.card:hover {
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }

  .card:hover {
    transform: none;
  }
}
```

*Common Pitfalls: Animating layout properties such as `top`, `left`, `width`, and `height` usually costs more than animating `transform` and `opacity`.*

### Debugging Items — computed styles, overlays, temporary outlines, supports

| Item               | Meaning                       | When to Use                 | Minimal Example                        | Memory Cue          | Common Pitfall                        |
| ------------------ | ----------------------------- | --------------------------- | -------------------------------------- | ------------------- | ------------------------------------- |
| Computed styles    | Final resolved styles         | Any cascade/value bug       | Browser DevTools Computed tab          | What actually won   | Looking only at authored CSS          |
| Matched rules      | All applicable rules          | Selector/cascade debugging  | Browser DevTools Styles tab            | Who competed        | Missing layer/source order            |
| Box model panel    | Size, padding, border, margin | Spacing and overflow bugs   | DevTools layout pane                   | Real box dimensions | Ignoring collapsed margins            |
| Grid overlay       | Visualize grid tracks         | Grid debugging              | DevTools grid overlay                  | See tracks          | Guessing line positions               |
| Flex overlay       | Visualize flex axes           | Flex alignment bugs         | DevTools flex overlay                  | See main/cross axes | Axis confusion                        |
| Temporary outline  | Reveal element boundaries     | Layout debugging            | `.debug * { outline: 1px solid red; }` | Show boxes          | Leaving debug CSS in production       |
| `@supports`        | Feature gate                  | Progressive enhancement     | `@supports (display: grid) { ... }`    | Test support        | Treating support as quality guarantee |
| CSS coverage       | Detect unused CSS             | Bundle cleanup              | DevTools Coverage                      | Find dead CSS       | Removing dynamic classes incorrectly  |
| Reduced test cases | Isolate bug                   | Browser quirks/cascade bugs | Minimal HTML/CSS reproduction          | Shrink the problem  | Debugging inside full app noise       |

```css id="d6cv5p"
/* Fragment: temporary layout debug utility. */
.debug-layout * {
  outline: 1px solid color-mix(in oklch, red, transparent 40%);
}

/* Fragment: temporary overflow containment check. */
.debug-overflow {
  overflow: clip;
}
```

*Common Pitfalls: Debugging CSS without checking computed values is inefficient; the computed pane is often the shortest path to the truth.*

### Architecture Items — layers, tokens, components, utilities, overrides

| Item               | Meaning                             | When to Use                     | Minimal Example                 | Memory Cue             | Common Pitfall                 |
| ------------------ | ----------------------------------- | ------------------------------- | ------------------------------- | ---------------------- | ------------------------------ |
| Reset layer        | Normalize only intentional defaults | Project foundation              | `@layer reset { ... }`          | Lowest author base     | Resetting too aggressively     |
| Tokens layer       | Design values                       | Theme/design system             | `--space-4: 1rem;`              | Named decisions        | Token sprawl                   |
| Base layer         | Element defaults                    | Body, headings, links, controls | `body { font-family: ...; }`    | Document foundation    | Styling components here        |
| Layout layer       | Composition primitives              | `stack`, `cluster`, `grid`      | `.stack { display: flex; ... }` | Structure helpers      | Mixing visual skin into layout |
| Components layer   | Reusable UI blocks                  | Cards, buttons, forms           | `.button { ... }`               | Owned block            | Overreaching into page context |
| Utilities layer    | Narrow one-purpose classes          | Overrides and small adjustments | `.u-muted { color: ...; }`      | One job                | Broad utility side effects     |
| Overrides layer    | Explicit last resort                | CMS or integration patches      | `@layer overrides { ... }`      | Contained escape hatch | Permanent dumping ground       |
| Specificity budget | Keep selectors low                  | Large codebases                 | Prefer classes and `:where()`   | Light selectors        | Deep nesting and IDs           |

```css id="ijy770"
@layer reset, tokens, base, layout, components, utilities, overrides;

@layer layout {
  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--stack-gap, 1rem);
  }
}

@layer components {
  .card {
    padding: var(--space-6);
    border-radius: var(--radius-lg);
  }
}
```

*Common Pitfalls: Architecture fails when utilities, components, and overrides are allowed to mutate the same concerns without a declared layer policy.*

### High-Impact Snippets to Memorize — daily reusable CSS

| Pattern          | Memorize This                                                                     | Use Case               | Pitfall                          |
| ---------------- | --------------------------------------------------------------------------------- | ---------------------- | -------------------------------- |
| Border-box reset | `*, *::before, *::after { box-sizing: border-box; }`                              | Predictable sizing     | Imported widgets may need review |
| Page container   | `max-inline-size: 72rem; margin-inline: auto; padding-inline: clamp(...);`        | Centered layout        | Fixed width causes overflow      |
| Stack            | `.stack { display: flex; flex-direction: column; gap: var(--stack-gap, 1rem); }`  | Vertical rhythm        | Child margins fight gap          |
| Cluster          | `.cluster { display: flex; flex-wrap: wrap; gap: var(--cluster-gap, .75rem); }`   | Tags/buttons/toolbars  | No wrapping causes overflow      |
| Responsive grid  | `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))`                                 | Card grids             | Missing `min(100%, ...)`         |
| Focus ring       | `:focus-visible { outline: 3px solid Highlight; outline-offset: 3px; }`           | Keyboard accessibility | `overflow: hidden` may clip      |
| Fluid type       | `font-size: clamp(1rem, 2vw, 1.5rem);`                                            | Responsive typography  | Bad extremes                     |
| Flex shrink fix  | `min-inline-size: 0;`                                                             | Text in flex/grid item | Easy to forget                   |
| Motion reduction | `@media (prefers-reduced-motion: reduce) { ... }`                                 | Accessibility          | Incomplete override              |
| Theme base       | `:root { color-scheme: light dark; --color-bg: Canvas; --color-fg: CanvasText; }` | Adaptive colors        | Assuming it handles full theme   |

```css id="u1vzeb"
@layer layout {
  .page {
    max-inline-size: 72rem;
    margin-inline: auto;
    padding-inline: clamp(1rem, 4vw, 3rem);
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--stack-gap, 1rem);
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
    gap: clamp(1rem, 2vw, 1.5rem);
  }
}
```

*Common Pitfalls: Reusable snippets should encode constraints, not screenshots; test them with long text, zoom, narrow containers, and different writing directions.*

### Minimal Professional CSS Memory Sheet — compact daily lookup

| Need                        | Memorize                                                                |
| --------------------------- | ----------------------------------------------------------------------- |
| Lowest-specificity defaults | `:where(...)`                                                           |
| Component class             | `.component`, `.component__part`, `.component--variant`                 |
| State from semantics        | `[aria-expanded="true"]`, `[aria-current="page"]`, `:has(...)`          |
| Accessible focus            | `:focus-visible { outline: 3px solid Highlight; outline-offset: 3px; }` |
| Predictable sizing          | `box-sizing: border-box`                                                |
| Center container            | `max-inline-size` + `margin-inline: auto`                               |
| Vertical rhythm             | Parent `gap`, not child margins                                         |
| One-axis layout             | `display: flex`                                                         |
| Two-axis layout             | `display: grid`                                                         |
| Responsive cards            | `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))`                       |
| Fluid values                | `clamp(min, preferred, max)`                                            |
| Theme values                | `var(--semantic-token)`                                                 |
| Component adaptation        | `container-type: inline-size` + `@container`                            |
| Page adaptation             | `@media (width >= ...)`                                                 |
| Feature fallback            | Fallback first, enhance inside `@supports`                              |
| Shrink flex child           | `min-inline-size: 0`                                                    |
| Prevent long text overflow  | `overflow-wrap: anywhere`                                               |
| Local z-index boundary      | `isolation: isolate`                                                    |
| Motion safety               | `prefers-reduced-motion: reduce`                                        |
| Debug truth                 | DevTools Computed panel                                                 |

*Common Pitfalls: The highest-value memorized CSS patterns are not isolated declarations; they are small systems that combine cascade, layout, state, and accessibility correctly.*

## PART 5 — Practical Templates

### Selected Mode — template-first, declarative styling, reusable CSS architecture

Selected mode: `template-first` — CSS is primarily declarative and styling-oriented, so reusable templates and compact layout/component patterns provide the highest professional reuse value. This follows the requested CSS example-mode logic from the uploaded specification.

*Common Pitfalls: CSS examples should not only demonstrate properties; they should encode maintainable cascade, accessibility, responsiveness, and override strategy.*

### Complete Template: Modern CSS Architecture — layers, reset, tokens, base, layout, components, utilities

Use this template as a starting `styles.css` for a modern site, product UI, documentation page, dashboard, or component library. It emphasizes explicit cascade layers, restrained reset behavior, semantic tokens, accessible focus styles, layout primitives, and narrow utilities.

```css id="css-architecture-template"
@layer reset, tokens, base, layout, components, utilities, overrides;

/* Reset: keep this intentionally small and reviewable. */
@layer reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body,
  h1,
  h2,
  h3,
  p,
  figure,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  img,
  picture,
  svg,
  video,
  canvas {
    display: block;
    max-inline-size: 100%;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }
}

/* Tokens: primitive values and semantic roles. */
@layer tokens {
  :root {
    color-scheme: light dark;

    --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-12: 3rem;
    --space-16: 4rem;

    --radius-sm: 0.375rem;
    --radius-md: 0.75rem;
    --radius-lg: 1.25rem;
    --radius-pill: 999px;

    --shadow-sm: 0 0.25rem 1rem color-mix(in oklch, black, transparent 92%);
    --shadow-md: 0 1rem 3rem color-mix(in oklch, black, transparent 88%);

    --color-bg: Canvas;
    --color-fg: CanvasText;
    --color-surface: color-mix(in oklch, Canvas, CanvasText 3%);
    --color-surface-strong: color-mix(in oklch, Canvas, CanvasText 7%);
    --color-border: color-mix(in oklch, CanvasText, transparent 82%);

    --color-muted: color-mix(in oklch, CanvasText, transparent 35%);
    --color-accent: oklch(58% 0.18 255);
    --color-accent-strong: oklch(50% 0.2 255);
    --color-danger: oklch(55% 0.2 30);
    --color-success: oklch(58% 0.16 145);

    --focus-ring: Highlight;

    --measure: 68ch;
    --page-max: 76rem;
  }

  [data-theme="dark"] {
    --color-accent: oklch(70% 0.16 255);
    --color-accent-strong: oklch(76% 0.18 255);
  }
}

/* Base: document-wide element defaults. */
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    min-block-size: 100vh;
    background: var(--color-bg);
    color: var(--color-fg);
    font-family: var(--font-sans);
    font-size: 1rem;
    line-height: 1.5;
    text-rendering: optimizeLegibility;
  }

  :focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 3px;
  }

  a {
    color: var(--color-accent);
    text-underline-offset: 0.18em;
  }

  a:hover {
    color: var(--color-accent-strong);
  }

  h1,
  h2,
  h3 {
    line-height: 1.1;
    letter-spacing: -0.035em;
    text-wrap: balance;
  }

  h1 {
    font-size: clamp(2.25rem, 7vw, 5rem);
  }

  h2 {
    font-size: clamp(1.75rem, 4vw, 3rem);
  }

  h3 {
    font-size: clamp(1.25rem, 2vw, 1.75rem);
  }

  p,
  li {
    max-inline-size: var(--measure);
  }

  code,
  kbd,
  samp,
  pre {
    font-family: var(--font-mono);
  }

  ::selection {
    background: color-mix(in oklch, var(--color-accent), transparent 65%);
  }
}

/* Layout: reusable composition primitives. */
@layer layout {
  .page {
    max-inline-size: var(--page-max);
    margin-inline: auto;
    padding-inline: clamp(1rem, 4vw, 3rem);
    padding-block: clamp(2rem, 8vw, 6rem);
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--stack-gap, var(--space-4));
  }

  .cluster {
    display: flex;
    flex-wrap: wrap;
    gap: var(--cluster-gap, var(--space-3));
    align-items: center;
  }

  .sidebar-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-8);
  }

  @media (width >= 60rem) {
    .sidebar-layout {
      grid-template-columns: minmax(14rem, 18rem) minmax(0, 1fr);
      align-items: start;
    }
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
    gap: clamp(1rem, 2vw, 1.5rem);
  }
}

/* Components: reusable interface blocks. */
@layer components {
  .button {
    --button-bg: var(--color-accent);
    --button-bg-hover: var(--color-accent-strong);
    --button-fg: white;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);

    min-block-size: 2.75rem;
    border: 0;
    border-radius: var(--radius-pill);
    padding-inline: var(--space-4);

    background: var(--button-bg);
    color: var(--button-fg);
    font-weight: 750;
    line-height: 1;
    text-decoration: none;

    transition:
      background-color 140ms ease,
      transform 140ms ease;
  }

  .button:hover {
    background: var(--button-bg-hover);
    transform: translateY(-1px);
  }

  .button:active {
    transform: translateY(0);
  }

  .button:disabled,
  .button[aria-disabled="true"] {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .button--secondary {
    --button-bg: transparent;
    --button-bg-hover: color-mix(in oklch, var(--color-fg), transparent 94%);
    --button-fg: var(--color-fg);

    box-shadow: inset 0 0 0 1px var(--color-border);
  }

  .card {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: clamp(1rem, 3vw, 1.5rem);
    background: var(--color-surface);
    box-shadow: var(--shadow-sm);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    border-radius: var(--radius-pill);
    padding: 0.25rem 0.625rem;
    background: color-mix(in oklch, var(--color-accent), transparent 88%);
    color: var(--color-accent);
    font-size: 0.875rem;
    font-weight: 750;
    line-height: 1.2;
  }

  .field {
    display: grid;
    gap: 0.375rem;
  }

  .field__label {
    font-weight: 700;
  }

  .field__control {
    inline-size: 100%;
    border: 1px solid var(--field-border, var(--color-border));
    border-radius: var(--radius-md);
    padding: 0.75rem 0.875rem;
    background: var(--color-bg);
    color: var(--color-fg);
  }

  .field:has(.field__control:user-invalid) {
    --field-border: var(--color-danger);
  }

  .field__error {
    display: none;
    color: var(--color-danger);
    font-size: 0.9375rem;
  }

  .field:has(.field__control:user-invalid) .field__error {
    display: block;
  }
}

/* Utilities: narrow, single-purpose helpers. */
@layer utilities {
  .u-muted {
    color: var(--color-muted);
  }

  .u-visually-hidden {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .u-full-bleed {
    margin-inline: calc(50% - 50vw);
  }
}

/* Overrides: integration fixes only; require comments. */
@layer overrides {
  /* Example:
     .third-party-widget button {
       font: inherit;
     }
  */
}

/* Accessibility: reduce nonessential motion. */
@media (prefers-reduced-motion: reduce) {
  @layer base, components {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }

    .button:hover {
      transform: none;
    }
  }
}

/* Accessibility: preserve visible boundaries in forced-colors mode. */
@media (forced-colors: active) {
  @layer components {
    .card,
    .button--secondary,
    .field__control {
      border: 1px solid CanvasText;
      box-shadow: none;
    }
  }
}
```

Use this template when a project needs a **complete CSS foundation**: page layout, components, forms, tokens, utilities, and accessibility defaults.

*Common Pitfalls: Do not let the `overrides` layer become a permanent dumping ground; every override should name the integration, browser issue, or migration reason.*

### Complete Template: Responsive Component System — HTML context, container queries, card grid, accessible actions

Use this template when building a reusable product section, landing-page block, dashboard panel group, or component-library demo. It demonstrates local component adaptation with `@container`, not only viewport breakpoints.

```html id="responsive-component-template-html"
<section class="feature-section stack" aria-labelledby="feature-title">
  <div class="feature-section__header stack">
    <p class="eyebrow">Platform</p>
    <h2 id="feature-title">Composable interface patterns</h2>
    <p class="feature-section__lede">
      Build responsive cards that adapt to their container instead of relying only on viewport breakpoints.
    </p>
  </div>

  <div class="feature-grid">
    <article class="feature-card">
      <div class="feature-card__media" aria-hidden="true"></div>
      <div class="feature-card__body stack">
        <p class="badge">Layout</p>
        <h3 class="feature-card__title">Container-aware cards</h3>
        <p class="u-muted">
          The card changes structure when its parent container has enough inline space.
        </p>
        <a class="button" href="/docs/layout">Read layout docs</a>
      </div>
    </article>

    <article class="feature-card">
      <div class="feature-card__media" aria-hidden="true"></div>
      <div class="feature-card__body stack">
        <p class="badge">Tokens</p>
        <h3 class="feature-card__title">Runtime theming</h3>
        <p class="u-muted">
          Semantic custom properties control colors, spacing, and local component variants.
        </p>
        <a class="button button--secondary" href="/docs/tokens">View tokens</a>
      </div>
    </article>
  </div>
</section>
```

```css id="responsive-component-template-css"
@layer tokens, base, layout, components, utilities;

@layer tokens {
  :root {
    color-scheme: light dark;

    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-6: 1.5rem;
    --space-8: 2rem;

    --radius-md: 0.75rem;
    --radius-lg: 1.25rem;
    --radius-pill: 999px;

    --color-bg: Canvas;
    --color-fg: CanvasText;
    --color-surface: color-mix(in oklch, Canvas, CanvasText 4%);
    --color-border: color-mix(in oklch, CanvasText, transparent 82%);
    --color-muted: color-mix(in oklch, CanvasText, transparent 35%);
    --color-accent: oklch(58% 0.18 255);
    --color-accent-strong: oklch(50% 0.2 255);
    --focus-ring: Highlight;
  }
}

@layer base {
  body {
    margin: 0;
    background: var(--color-bg);
    color: var(--color-fg);
    font-family: system-ui, sans-serif;
    line-height: 1.5;
  }

  :focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 3px;
  }
}

@layer layout {
  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--stack-gap, var(--space-4));
  }

  .feature-section {
    --stack-gap: var(--space-8);

    max-inline-size: 76rem;
    margin-inline: auto;
    padding: clamp(1rem, 4vw, 3rem);
  }

  .feature-section__header {
    --stack-gap: var(--space-3);

    max-inline-size: 58rem;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 24rem), 1fr));
    gap: clamp(1rem, 2vw, 1.5rem);
  }
}

@layer components {
  .eyebrow {
    color: var(--color-accent);
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .feature-section__header h2 {
    margin: 0;
    font-size: clamp(2rem, 6vw, 4rem);
    line-height: 0.98;
    letter-spacing: -0.05em;
    text-wrap: balance;
  }

  .feature-section__lede {
    max-inline-size: 65ch;
    margin: 0;
    color: var(--color-muted);
    font-size: clamp(1rem, 1vw + 0.85rem, 1.25rem);
  }

  .feature-card {
    container-type: inline-size;

    display: grid;
    overflow: hidden;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
  }

  .feature-card__media {
    min-block-size: 12rem;
    background:
      radial-gradient(circle at 30% 30%, var(--color-accent), transparent 32%),
      linear-gradient(135deg, color-mix(in oklch, var(--color-accent), transparent 80%), transparent);
  }

  .feature-card__body {
    --stack-gap: var(--space-4);

    padding: clamp(1rem, 4cqi, 2rem);
  }

  .feature-card__title {
    margin: 0;
    font-size: clamp(1.25rem, 4cqi, 2rem);
    line-height: 1.05;
    letter-spacing: -0.035em;
  }

  .badge {
    align-self: start;
    border-radius: var(--radius-pill);
    padding: 0.25rem 0.625rem;
    background: color-mix(in oklch, var(--color-accent), transparent 88%);
    color: var(--color-accent);
    font-size: 0.875rem;
    font-weight: 750;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    justify-self: start;

    min-block-size: 2.75rem;
    border-radius: var(--radius-pill);
    padding-inline: var(--space-4);

    background: var(--color-accent);
    color: white;
    font-weight: 750;
    text-decoration: none;

    transition:
      background-color 140ms ease,
      transform 140ms ease;
  }

  .button:hover {
    background: var(--color-accent-strong);
    transform: translateY(-1px);
  }

  .button--secondary {
    background: transparent;
    color: var(--color-fg);
    box-shadow: inset 0 0 0 1px var(--color-border);
  }

  .button--secondary:hover {
    background: color-mix(in oklch, var(--color-fg), transparent 94%);
  }

  @container (inline-size >= 38rem) {
    .feature-card {
      grid-template-columns: minmax(12rem, 0.8fr) 1fr;
      align-items: stretch;
    }

    .feature-card__media {
      min-block-size: 100%;
    }
  }
}

@layer utilities {
  .u-muted {
    color: var(--color-muted);
  }
}

@media (prefers-reduced-motion: reduce) {
  @layer components {
    .button {
      transition: none;
    }

    .button:hover {
      transform: none;
    }
  }
}
```

Use this template when a component may appear in multiple contexts: full-width page, sidebar, modal, dashboard column, or embedded card group. The key feature is local adaptation through `container-type` and `@container`.

*Common Pitfalls: A component with only viewport breakpoints may look correct on the main page but fail inside a narrow parent container.*

### Pattern: Fluid Typography Scale — clamp, readable bounds, heading rhythm

Use this pattern when typography should scale smoothly without many breakpoints.

```css id="fluid-typography-pattern"
@layer tokens {
  :root {
    --step--1: clamp(0.875rem, 0.84rem + 0.18vw, 1rem);
    --step-0: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
    --step-1: clamp(1.25rem, 1.08rem + 0.85vw, 1.75rem);
    --step-2: clamp(1.75rem, 1.32rem + 2.1vw, 3rem);
    --step-3: clamp(2.25rem, 1.4rem + 4.2vw, 5rem);
  }
}

@layer base {
  body {
    font-size: var(--step-0);
  }

  h1 {
    font-size: var(--step-3);
    line-height: 0.95;
    letter-spacing: -0.06em;
    text-wrap: balance;
  }

  h2 {
    font-size: var(--step-2);
    line-height: 1;
    letter-spacing: -0.045em;
    text-wrap: balance;
  }

  small {
    font-size: var(--step--1);
  }
}
```

Reuse this for content-heavy pages, product UIs, documentation, marketing sections, and dashboards. Adjust only the min/preferred/max values, not the pattern.

*Common Pitfalls: Fluid type still needs hard minimum and maximum bounds; uncontrolled viewport scaling can become unreadable.*

### Pattern: Responsive Card Grid — grid, auto-fit, minmax, overflow-safe tracks

Use this pattern for product cards, article cards, metrics panels, documentation tiles, and dashboard blocks.

```css id="responsive-card-grid-pattern"
@layer layout {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--card-min, 18rem)), 1fr));
    gap: var(--card-grid-gap, clamp(1rem, 2vw, 1.5rem));
    align-items: stretch;
  }
}
```

```html id="responsive-card-grid-html"
<section class="card-grid" style="--card-min: 20rem">
  <article class="card stack">...</article>
  <article class="card stack">...</article>
  <article class="card stack">...</article>
</section>
```

The important part is `min(100%, var(--card-min))`. It prevents a minimum track size from forcing horizontal overflow in narrow containers.

*Common Pitfalls: `minmax(20rem, 1fr)` alone can overflow on viewports or containers narrower than `20rem`.*

### Pattern: Accessible Button — focus-visible, disabled state, reduced motion

Use this pattern for links styled as buttons and real buttons. Use `<button>` for actions and `<a>` for navigation.

```css id="accessible-button-pattern"
@layer components {
  .button {
    --button-bg: var(--color-accent);
    --button-bg-hover: var(--color-accent-strong);
    --button-fg: white;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    min-block-size: 2.75rem;
    border: 0;
    border-radius: 999px;
    padding-inline: 1rem;

    background: var(--button-bg);
    color: var(--button-fg);
    font: inherit;
    font-weight: 750;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;

    transition:
      background-color 140ms ease,
      transform 140ms ease;
  }

  .button:hover {
    background: var(--button-bg-hover);
    transform: translateY(-1px);
  }

  .button:focus-visible {
    outline: 3px solid var(--focus-ring, Highlight);
    outline-offset: 3px;
  }

  .button:disabled,
  .button[aria-disabled="true"] {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .button--secondary {
    --button-bg: transparent;
    --button-bg-hover: color-mix(in oklch, currentColor, transparent 92%);
    --button-fg: currentColor;

    box-shadow: inset 0 0 0 1px color-mix(in oklch, currentColor, transparent 75%);
  }
}

@media (prefers-reduced-motion: reduce) {
  @layer components {
    .button {
      transition: none;
    }

    .button:hover {
      transform: none;
    }
  }
}
```

```html id="accessible-button-html"
<button class="button" type="button">Save changes</button>
<a class="button button--secondary" href="/settings">Open settings</a>
```

*Common Pitfalls: Do not use `aria-disabled="true"` alone on an anchor unless click behavior is also suppressed with JavaScript; CSS only changes presentation.*

### Pattern: Theme System — semantic tokens, color-scheme, user preference, explicit override

Use this pattern when a site needs light/dark mode, local theme scopes, or design-system semantic colors.

```css id="theme-system-pattern"
@layer tokens {
  :root {
    color-scheme: light;

    --color-bg: white;
    --color-fg: oklch(20% 0.02 260);
    --color-surface: oklch(98% 0.01 260);
    --color-border: oklch(88% 0.02 260);
    --color-accent: oklch(58% 0.18 255);
    --color-danger: oklch(55% 0.2 30);
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme]) {
      color-scheme: dark;

      --color-bg: oklch(16% 0.02 260);
      --color-fg: oklch(94% 0.01 260);
      --color-surface: oklch(22% 0.025 260);
      --color-border: oklch(35% 0.03 260);
      --color-accent: oklch(72% 0.16 255);
      --color-danger: oklch(70% 0.18 30);
    }
  }

  :root[data-theme="dark"] {
    color-scheme: dark;

    --color-bg: oklch(16% 0.02 260);
    --color-fg: oklch(94% 0.01 260);
    --color-surface: oklch(22% 0.025 260);
    --color-border: oklch(35% 0.03 260);
    --color-accent: oklch(72% 0.16 255);
    --color-danger: oklch(70% 0.18 30);
  }
}

@layer base {
  body {
    background: var(--color-bg);
    color: var(--color-fg);
  }
}

@layer components {
  .surface {
    border: 1px solid var(--color-border);
    background: var(--color-surface);
  }
}
```

```html id="theme-system-html"
<html lang="en" data-theme="dark">
  ...
</html>
```

Use this when explicit theme selection should override system preference. Remove `data-theme` to let system preference decide.

*Common Pitfalls: `color-scheme` helps native controls and browser surfaces, but it does not automatically define a full application theme.*

### Pattern: Container-Query Card — component-local responsiveness, cqi units, reusable media layout

Use this pattern when a card must work in a grid cell, sidebar, modal, drawer, and full-width content area.

```css id="container-query-card-pattern"
@layer components {
  .media-card {
    container-type: inline-size;

    display: grid;
    overflow: hidden;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
  }

  .media-card__image {
    inline-size: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
  }

  .media-card__body {
    display: grid;
    gap: clamp(0.75rem, 2cqi, 1rem);
    padding: clamp(1rem, 4cqi, 1.75rem);
  }

  .media-card__title {
    margin: 0;
    font-size: clamp(1.125rem, 4cqi, 1.75rem);
    line-height: 1.1;
  }

  @container (inline-size >= 36rem) {
    .media-card {
      grid-template-columns: minmax(12rem, 0.75fr) 1fr;
    }

    .media-card__image {
      block-size: 100%;
      aspect-ratio: auto;
    }
  }
}
```

```html id="container-query-card-html"
<article class="media-card">
  <img class="media-card__image" src="article.jpg" alt="Developer workstation with CSS layout sketches">
  <div class="media-card__body">
    <h3 class="media-card__title">Building adaptive card components</h3>
    <p class="u-muted">Container queries let this card respond to its allocated space.</p>
  </div>
</article>
```

*Common Pitfalls: Query the component’s available space, not the viewport, when the same component appears in multiple layout contexts.*

### Pattern: Sticky App Shell — grid shell, sticky sidebar, overflow caveats

Use this pattern for documentation pages, admin panels, settings pages, and dashboards with persistent local navigation.

```css id="sticky-app-shell-pattern"
@layer layout {
  .app-shell {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-8);
    max-inline-size: 84rem;
    margin-inline: auto;
    padding: clamp(1rem, 4vw, 3rem);
  }

  .app-shell__sidebar {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    background: var(--color-surface);
  }

  .app-shell__main {
    min-inline-size: 0;
  }

  @media (width >= 64rem) {
    .app-shell {
      grid-template-columns: minmax(14rem, 18rem) minmax(0, 1fr);
      align-items: start;
    }

    .app-shell__sidebar {
      position: sticky;
      inset-block-start: var(--space-4);
      max-block-size: calc(100svh - var(--space-8));
      overflow: auto;
    }
  }
}
```

```html id="sticky-app-shell-html"
<div class="app-shell">
  <aside class="app-shell__sidebar">
    <nav aria-label="Settings navigation">...</nav>
  </aside>

  <main class="app-shell__main stack">
    ...
  </main>
</div>
```

*Common Pitfalls: `position: sticky` often fails because of the wrong scroll ancestor, missing inset, insufficient space, or an ancestor with unintended overflow.*

### Pattern: Form Layout with Error States — labels, controls, validation, focus

Use this pattern for ordinary forms where visual validation should follow real form semantics.

```css id="form-layout-pattern"
@layer components {
  .form {
    display: grid;
    gap: var(--space-6);
    max-inline-size: 42rem;
  }

  .field {
    display: grid;
    gap: 0.375rem;
  }

  .field__label {
    font-weight: 700;
  }

  .field__control {
    inline-size: 100%;
    border: 1px solid var(--field-border, var(--color-border));
    border-radius: var(--radius-md);
    padding: 0.75rem 0.875rem;
    background: var(--color-bg);
    color: var(--color-fg);
    font: inherit;
  }

  .field__control:focus-visible {
    outline: 3px solid var(--focus-ring, Highlight);
    outline-offset: 2px;
  }

  .field__hint,
  .field__error {
    margin: 0;
    font-size: 0.9375rem;
  }

  .field__hint {
    color: var(--color-muted);
  }

  .field__error {
    display: none;
    color: var(--color-danger);
  }

  .field:has(.field__control:user-invalid) {
    --field-border: var(--color-danger);
  }

  .field:has(.field__control:user-invalid) .field__error {
    display: block;
  }
}
```

```html id="form-layout-html"
<form class="form" action="/account" method="post">
  <div class="field">
    <label class="field__label" for="email">Email address</label>
    <input
      class="field__control"
      id="email"
      name="email"
      type="email"
      autocomplete="email"
      required
      aria-describedby="email-hint email-error"
    >
    <p class="field__hint" id="email-hint">Use your work email address.</p>
    <p class="field__error" id="email-error">Enter a valid email address.</p>
  </div>

  <button class="button" type="submit">Save account</button>
</form>
```

*Common Pitfalls: CSS can show error styling, but server-side validation and accessible error messaging still need to exist outside CSS.*

### Pattern Selection Matrix — when to reuse each template or pattern

| Template / Pattern                   | Reuse When                                                | Avoid When                                                 |
| ------------------------------------ | --------------------------------------------------------- | ---------------------------------------------------------- |
| Modern CSS architecture template     | Starting a serious stylesheet or design-system foundation | A single tiny demo page needs only a few declarations      |
| Responsive component system template | Components must adapt across containers                   | Layout is page-specific and never reused                   |
| Fluid typography scale               | Text hierarchy should scale across screen sizes           | Exact typographic lockup is legally or brand-mandated      |
| Responsive card grid                 | Unknown number of cards must wrap cleanly                 | Items require manual editorial placement                   |
| Accessible button                    | Links/buttons need consistent states                      | Element is not actually interactive                        |
| Theme system                         | Light/dark/system themes or local themes are needed       | Static one-theme document                                  |
| Container-query card                 | Same component appears in different parent widths         | Only page-level viewport adaptation matters                |
| Sticky app shell                     | Documentation/settings/dashboard navigation               | Ancestor overflow and scroll behavior cannot be controlled |
| Form layout                          | Ordinary accessible forms                                 | Complex multi-step form needs application state management |

*Common Pitfalls: Templates should be adapted by changing tokens and component contracts, not by scattering one-off overrides through page-specific selectors.*
