---
title: Scheme - Quick Reference
abbreviation: Scheme
categories: Notes
subclass: Languages
---

## PART 1 — Language Identity, Design Philosophy, and Problem Space

### Target assumptions — `R7RS-small`, Chez Scheme, SRFIs, implementation boundaries

**Density strategy:** adaptive — Scheme has a small surface syntax but a deep semantic, macro, portability, and implementation model, so the guide will be compact on ordinary syntax and deeper on evaluation, binding, macros, data representation, standards, and implementation boundaries.

This tutorial targets **Scheme** as a professional Lisp-family language, using **R7RS-small** as the portable semantic baseline and **Chez Scheme** as the main practical reference implementation when an implementation must be named. The reason is not that Chez is “the only real Scheme,” but that serious Scheme explanation needs both a standard baseline and a concrete implementation anchor. The R7RS site describes the seventh revision as divided into a small language for embedding, education, and research, and a large language intended to address broader practical software-development needs. ([r7rs.org][1]) Chez Scheme is an open-source Scheme implementation with its own supporting tools and documentation, making it a reasonable implementation reference point. ([GitHub][2])

The guide will also discuss **R6RS**, **R7RS-large**, **SRFIs**, and major implementations such as **Guile**, **Gambit**, **Chicken**, **MIT/GNU Scheme**, **Gauche**, and **Racket** when their differences matter. SRFI is especially important because the SRFI process exists to extend Scheme with portable, useful libraries and additions across implementations. ([Scheme Requests for Implementation][3]) Racket will be treated as an adjacent Scheme-descended language and a major language-oriented-programming reference point, not as the baseline for Scheme itself; Racket’s own site explicitly frames it as a language for making languages. ([Racket][4])

This part follows the requested tutorial contract: Scheme must be taught as a coherent design system, not as a shallow syntax list. 

### What Scheme is — minimalist Lisp, lexical scope, procedures, symbolic computation

Scheme is a **minimalist Lisp-family language** built around a small number of powerful ideas: symbolic expressions, lexical binding, first-class procedures, recursion, proper tail calls, closures, dynamic typing, syntactic abstraction, and interactive evaluation.

Scheme is not “just a language with many parentheses.” The parentheses are a visible consequence of a deeper design choice: the external syntax of programs is close to the tree structure that the evaluator consumes. This makes evaluation structure unusually explicit. In many languages, syntax hides the distinction between operators, operands, special syntax, binding forms, and evaluation order. Scheme exposes those distinctions early.

Scheme is also not simply “a functional language.” It strongly supports functional programming, but it also supports assignment, mutable data structures, imperative loops expressed through recursion or named `let`, I/O, exceptions, modules, macros, and implementation-specific systems programming interfaces. Its functional identity comes less from prohibiting mutation and more from making procedures, binding, recursion, and composition central.

A concise first definition is:

> Scheme is a small, lexically scoped, properly tail-recursive Lisp dialect designed to make abstraction, evaluation, and program structure unusually explicit.

The R7RS report characterizes Scheme as a statically scoped and properly tail-recursive dialect of Lisp. Here, **statically scoped** means *lexically scoped*, not statically typed. Scheme is dynamically typed, but binding resolution is determined by the program’s lexical structure. ([Scheme Standards][5])

### The problem Scheme was designed to solve — abstraction with a small semantic core

Scheme’s core problem is not the same as C’s, Java’s, Python’s, or Haskell’s.

C asks: how can a program expose machine-level control with portable enough syntax?

Java asks: how can a large ecosystem standardize object-oriented application development on a managed runtime?

Python asks: how can programming be made readable, flexible, and broadly useful with a rich standard ecosystem?

Haskell asks: how far can typed functional abstraction, purity, and laziness be pushed into a coherent language?

Scheme asks a different question:

**How small can a language be while still expressing powerful abstractions, interpreters, control mechanisms, and embedded languages?**

That question explains many Scheme choices. The language is small not because it is primitive, but because it tries to build expressive power out of a few semantic primitives. `lambda`, lexical environments, procedure application, conditionals, pairs, symbols, quoting, macros, and continuations can explain an unusually large portion of the language.

This makes Scheme especially important for:

| Problem space                          | Why Scheme fits                                                     | Cost introduced                                            |
| -------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------- |
| Teaching evaluation and interpreters   | The `eval` / `apply` model is close to the language’s own structure | Can make the language seem more theoretical than practical |
| Building abstractions                  | Procedures, closures, macros, and tail calls compose well           | Abstraction boundaries can become opaque                   |
| DSLs and language-oriented programming | Syntax can be extended systematically through macros                | Poor macro design damages readability and tooling          |
| Symbolic computation                   | Symbols, lists, and quoted data are native concepts                 | Beginners overgeneralize and think “everything is a list”  |
| Interactive exploration                | REPL development fits Scheme’s evaluation model                     | REPL habits can become undisciplined in larger systems     |
| Portable language research             | Small standards make experimentation easier                         | Practical library availability varies by implementation    |

The most important design tradeoff is therefore **small core versus ecosystem uniformity**. Scheme’s smallness supports clarity and experimentation, but it also means serious work must confront implementation choice, SRFIs, module differences, library availability, FFI differences, and tooling variation.

### Language personality — dynamic typing, lexical scope, procedures, macros, managed runtime

Before classifying Scheme, several terms need precision.

**Dynamic typing** means that types of values are checked at runtime, not that the language has no types. Scheme values have types; Scheme variables do not carry static type declarations in the core language.

**Strong typing** and **weak typing** are ambiguous terms. If “strong” means operations usually reject inappropriate values instead of silently reinterpreting them, Scheme is relatively strong at runtime. If “strong” means the compiler proves many type properties before execution, Scheme is not strong in that sense.

**Functional language** is also ambiguous. Scheme supports functional programming deeply, but mutation and side effects are part of the language.

**Compiled** versus **interpreted** is implementation-level, not language-level. Scheme programs may be interpreted, compiled to bytecode, compiled ahead of time, or run through an implementation-specific system. Chez, Guile, Gambit, Chicken, and others make different engineering choices.

| Design dimension | Scheme’s choice                                           | Practical consequence                                   | Tradeoff                                                   |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------- |
| Syntax model     | S-expression-based external syntax                        | Program structure is visible and regular                | Prefix notation is unfamiliar to many programmers          |
| Typing           | Dynamic runtime typing                                    | Flexible representation and rapid experimentation       | Type errors are often discovered at runtime                |
| Binding          | Lexical scope                                             | Closures are predictable and composable                 | Requires understanding environment capture                 |
| Functions        | First-class procedures                                    | Higher-order programming is natural                     | Overuse can create overly indirect code                    |
| Control          | Expressions, recursion, proper tail calls, continuations  | Recursive loops and control abstraction are first-class | Continuations can be difficult to reason about             |
| Data model       | Symbols, pairs, lists, vectors, strings, numbers, records | Symbolic and structural data are easy to represent      | Data invariants often rely on discipline, not static types |
| Mutation         | Available but not mandatory                               | Functional and imperative styles can coexist            | Aliasing bugs are possible                                 |
| Modules          | Standard-dependent and implementation-dependent           | Portable code is possible but must be intentional       | Ecosystem fragmentation matters                            |
| Macros           | Hygienic syntactic abstraction in modern Scheme           | New binding and control forms can be defined safely     | Macro expansion phases add complexity                      |
| Runtime          | Managed memory with garbage collection                    | No manual memory management in ordinary code            | Allocation and GC behavior still affect performance        |
| Ecosystem        | Small core plus SRFIs and implementation libraries        | Language remains compact and extensible                 | Library expectations differ across implementations         |

Scheme’s personality is therefore **semantic minimalism with abstraction maximalism**. It gives the programmer few built-in constructs, but those constructs are unusually general.

### Design philosophy — small core, explicit evaluation, abstraction by construction

Scheme’s design philosophy can be summarized by five principles.

**First, build from a small number of composable primitives.**
Scheme tries to make `lambda`, binding, procedure application, conditionals, pairs, symbols, and macros carry more explanatory weight than a large inventory of special-purpose constructs.

**Second, make evaluation structure visible.**
In Scheme, ordinary calls have the form:

```scheme
(operator operand ...)
```

That syntax makes one central question unavoidable: what is evaluated, in what role, and under what rule? The first element may be a procedure position in an ordinary call, but forms such as `if`, `lambda`, `define`, `quote`, and `let` are not ordinary procedure calls. They are special forms or derived syntax with different evaluation rules.

**Third, treat procedures as ordinary values.**
A procedure can be passed, returned, stored, closed over variables, and composed. This is not a library feature. It is part of Scheme’s semantic center.

**Fourth, separate core language from syntactic extension.**
Scheme’s macro systems allow new syntactic forms to be defined while preserving lexical discipline. This is crucial: macros are not merely textual substitution. Modern Scheme macro systems are designed to respect binding structure.

**Fifth, leave many engineering choices to implementations and programmers.**
This is both elegant and inconvenient. Scheme standards do not impose one dominant packaging ecosystem, concurrency model, object system, or FFI model. Professional Scheme use therefore requires knowing exactly where the standard ends and the implementation begins.

### Strengths and costs — expressiveness, clarity, portability, abstraction risk

Scheme’s strengths are real, but each comes with a cost.

| Strength                 | Problem solved                    | Capability gained                            | Cost introduced                                 | Misuse encouraged                                           | Programs that benefit                              | Programs that suffer                                    |
| ------------------------ | --------------------------------- | -------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------- |
| Small semantic core      | Avoids feature sprawl             | Easier to reason about evaluation            | Fewer built-in conveniences                     | Reimplementing common tools badly                           | Interpreters, DSLs, research systems               | Large applications needing batteries-included libraries |
| First-class procedures   | Avoids rigid control structure    | Composable behavior                          | Indirection can obscure flow                    | Excessive higher-order cleverness                           | Transformations, callbacks, interpreters           | Codebases needing simple onboarding                     |
| Proper tail recursion    | Allows recursion as iteration     | Constant-space recursive loops               | Stack intuition from other languages misleads   | Writing recursive control without understanding termination | Recursive algorithms, interpreters, state machines | Code that relies on stack traces as control history     |
| Hygienic macros          | Allows safe syntactic abstraction | New control forms and DSLs                   | Expansion phases and syntax objects are complex | Macro overuse                                               | DSLs, embedded languages, language tools           | Teams without macro discipline                          |
| Dynamic typing           | Reduces annotation burden         | Flexible generic code                        | Runtime type failures                           | Weak representation discipline                              | Exploratory systems, symbolic computation          | Safety-critical systems without strong validation       |
| Managed memory           | Avoids manual deallocation        | Safer ordinary allocation                    | GC and allocation costs still matter            | Ignoring allocation patterns                                | Symbolic and functional programs                   | Latency-sensitive systems without profiling             |
| Implementation diversity | Encourages specialization         | Different Schemes optimize different domains | Portability requires effort                     | Assuming one implementation’s behavior is universal         | Research, embedding, specialized runtimes          | Homogeneous enterprise platforms                        |

The professional rule is: **Scheme rewards semantic clarity and punishes vague abstraction boundaries.** A small language does not automatically produce simple programs. It gives the programmer powerful tools for producing simple or extremely opaque programs.

### What Scheme makes easy — procedures, recursion, symbolic data, macros, interpreters

Scheme makes several hard things unusually direct.

It makes **higher-order programming** natural. Since procedures are ordinary values, mapping, folding, filtering, composing, delaying, and parameterizing behavior are not special tricks.

It makes **recursive structure** natural. Lists, trees, symbolic expressions, and interpreters can be represented directly. Recursive descent through data often matches the shape of the data.

It makes **binding and closures** central. A closure is not an advanced object-like workaround. It is one of the basic ways Scheme represents behavior with remembered context.

It makes **syntax extension** unusually principled. A macro can introduce a new control form, binding construct, or embedded notation. This is a deeper capability than defining a function, because functions cannot control whether their arguments are evaluated before the call.

It makes **interpreter construction** conceptually close to ordinary programming. The famous `eval` / `apply` split is not just a pedagogical device; it captures the difference between evaluating expressions in environments and applying procedures to arguments.

A minimal example shows the language’s personality:

```scheme
(define make-counter
  (lambda ()
    (let ((n 0))
      (lambda ()
        (set! n (+ n 1))
        n))))
```

This small program contains several central Scheme ideas: `lambda`, lexical binding, closure capture, local state, assignment, and procedure return. The closure remembers `n` because the inner procedure carries its lexical environment.

**Common pitfall:** treating closures as “functions with hidden global variables.” The correct model is lexical environment capture. The captured binding is local to the environment created by `make-counter`, not global.

### What Scheme makes hard — large-scale uniformity, static guarantees, library assumptions

Scheme makes some things harder than mainstream languages.

It does not give the same default static guarantees as ML, Haskell, Rust, Java, or TypeScript. The core language will not statically prove that a value is a number, a list of symbols, a valid record, or a non-empty tree. That discipline must be supplied by predicates, validation, tests, contracts where available, typed variants where relevant, and careful module boundaries.

It does not give one universal professional ecosystem. Unlike Python’s `pip`, Java’s Maven/Gradle ecosystem, Rust’s Cargo, or JavaScript’s npm-centered workflow, Scheme’s practical tooling varies by implementation. SRFIs help with portable libraries, but they do not erase implementation differences.

It does not protect the programmer from over-abstraction. Scheme’s macros and higher-order procedures can produce elegant embedded languages, but they can also produce code that only its author can read.

It does not make performance obvious from surface syntax. A short expression may allocate many cons cells, create closures, traverse lists repeatedly, trigger exact arithmetic costs, or cross implementation-specific runtime boundaries.

The correct professional expectation is not “Scheme is simple.” It is: **Scheme has simple foundations and nontrivial consequences.**

### What Scheme discourages or leaves to discipline — static modeling, opaque macros, unchecked boundaries

Scheme prevents fewer things than many modern safety-oriented languages. That is a design choice.

| Area             | What Scheme provides                                      | What it does not guarantee                              | Programmer discipline required                                           |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------ |
| Type correctness | Runtime predicates and operation checks                   | Static proof of ordinary data invariants                | Validate inputs and design clear representations                         |
| Data modeling    | Pairs, lists, vectors, records, symbols                   | Exhaustive algebraic data checking in the core language | Use tags, records, predicates, and module boundaries consistently        |
| Macro hygiene    | Hygienic macro systems in modern Scheme                   | Automatically readable DSLs                             | Keep macro APIs small and transparent                                    |
| Mutation         | `set!` and mutable structures where available             | Alias safety                                            | Avoid hidden mutation through shared structure                           |
| Modules          | Standard and implementation-specific library forms        | One universal packaging model                           | State portability targets explicitly                                     |
| Errors           | Standard and implementation-specific exception mechanisms | A single universal condition system across all Schemes  | Separate portable error handling from implementation-specific error APIs |
| Concurrency      | Implementation-specific facilities                        | One standard concurrency semantics                      | Treat concurrency as implementation-bound                                |
| FFI              | Implementation-specific foreign interfaces                | Memory safety across foreign boundaries                 | Isolate FFI and validate assumptions                                     |

This is why Scheme is often excellent for language design, interpreters, symbolic computation, and controlled systems, but less frictionless for large multi-team application development unless the implementation and conventions are chosen deliberately.

### Relationship to adjacent languages — Lisp family, Racket, Common Lisp, Clojure, ML, Python

Scheme is best understood by comparison, but comparisons often mislead if they focus only on syntax.

| Adjacent language          | Similarity to Scheme                                  | Crucial difference                                                                    | Common false transfer                                                | Better mental model                                                                  |
| -------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Common Lisp                | Lisp syntax, macros, symbols, lists, dynamic features | Common Lisp is larger, has CLOS, multiple namespaces, broader standardized facilities | Assuming Scheme has Common Lisp’s batteries and object system        | Scheme is a smaller semantic core with more implementation variation                 |
| Racket                     | Scheme lineage, macros, language-oriented programming | Racket is its own language platform with a strong module/language ecosystem           | Treating Racket behavior as Scheme-standard behavior                 | Use Racket as a comparison point for language-building, not as the Scheme baseline   |
| Clojure                    | Lisp syntax, functional style, persistent collections | Clojure targets JVM/CLR/JS ecosystems and emphasizes immutable data structures        | Expecting Scheme to have Clojure’s collection model and host interop | Scheme is not a hosted data-centric Lisp by default                                  |
| ML / OCaml / Haskell       | Functional abstraction, recursion, closures           | Static type systems and algebraic data types are central there, not in core Scheme    | Expecting compile-time exhaustiveness and type inference             | Scheme uses dynamic values and representation discipline                             |
| Python                     | Dynamic language, REPL-friendly, high-level           | Python has a large mainstream standard ecosystem and non-Lisp syntax                  | Treating Scheme as Python with parentheses                           | Scheme is evaluation-structure-first, not object-and-module-first                    |
| JavaScript                 | First-class functions, closures, dynamic typing       | JavaScript has prototype objects, web ecosystem, async conventions                    | Importing JS object and callback habits directly                     | Scheme closures are central, but object and async models are implementation-specific |
| Lisp interpreter textbooks | Shared `eval` / `apply` intuition                     | Real Scheme includes standards, libraries, macros, modules, implementation behavior   | Thinking textbook evaluators equal production Scheme                 | Use evaluator models as semantic lenses, not complete engineering models             |

Racket deserves special care. Racket’s own description as a language for making languages makes it central for understanding modern language-oriented programming, but this guide will not collapse Scheme into Racket. ([Racket][4])

### Interdisciplinary lens map — lambda calculus, homoiconicity, macros, `eval/apply`, language-oriented programming

Scheme benefits from interdisciplinary explanation because its design directly touches lambda calculus, formal semantics, compiler theory, symbolic computation, macro theory, and programming-language pedagogy. These lenses should clarify Scheme, not replace Scheme.

| Lens or external field        | Core idea                                                    | Language features clarified                                             | Practical programming consequence                         | Where it appears in the guide | Limit of the lens                                                                     |
| ----------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| Lambda calculus               | Computation through function abstraction and application     | `lambda`, application, lexical scope, closures, higher-order procedures | Explains why procedures and environments are central      | PART 4, PART 7                | Scheme also has mutation, macros, I/O, numbers, modules, and implementation realities |
| Environment model             | Names are resolved through lexical environments              | `let`, `let*`, `letrec`, closures, internal definitions                 | Prevents scope and closure misunderstandings              | PART 2, PART 4, PART 7        | Does not by itself explain macro phases or module systems                             |
| Homoiconicity                 | Program-like structures can be represented as data           | S-expressions, symbols, quoting, quasiquoting, code-as-data             | Explains why macros and symbolic computation feel natural | PART 2, PART 4, PART 7        | “Everything is a list” is false and misleading                                        |
| Macro-system theory           | Syntax can be transformed before runtime evaluation          | `syntax-rules`, hygiene, derived syntax, DSLs                           | Explains why macros can define control and binding forms  | PART 4, PART 7, PART 9        | Macros are not ordinary functions and should not be used for every abstraction        |
| `eval` / `apply` model        | Evaluation and procedure application are distinct operations | interpreter structure, REPL, metacircular evaluators                    | Helps debug what is evaluated and when                    | PART 4, PART 7                | `eval` is not a normal substitute for good abstraction                                |
| Language-oriented programming | Programs can define specialized languages                    | macros, modules, DSLs, Racket comparison                                | Useful for embedded languages and domain notation         | PART 4, PART 9, PART 10       | DSLs can become opaque and harm maintainability                                       |

The key boundary is this: **runtime data manipulation, macro expansion, and evaluation are different layers**. A list at runtime is ordinary data. A quoted form is data produced by the reader. A macro manipulates syntax before ordinary runtime evaluation. An ordinary procedure receives already evaluated arguments. Confusing these layers is one of the fastest ways to misunderstand Scheme.

### Historical and trend orientation — Lisp lineage, Scheme reports, SRFIs, implementation diversity

Scheme’s history is not merely background. It explains why the language feels different from both Common Lisp and mainstream application languages.

Scheme emerged from the Lisp tradition and preserved Lisp’s symbolic, parenthesized, expression-oriented style, but gave special importance to lexical scoping, procedures, continuations, and a small semantic core. The R7RS materials frame Scheme as part of a revision sequence dating back to the language’s long standardization history. ([r7rs.org][1])

The Scheme ecosystem also reflects unresolved tension between minimalism and practical completeness. R7RS-small preserves a compact portable base; R7RS-large and SRFIs respond to the need for richer libraries and more practical cross-implementation facilities. ([r7rs.org][1]) Guile’s documentation, for example, notes that R7RS organizes R5RS-style definitions into modules and that many Guile users will use Guile’s own modules, while R7RS libraries are especially relevant for porting code across R7RS systems. ([GNU][6])

| Trend category        | Trend                                          | Status                                                 | Driving pressure                              | Caveat                                                                        |
| --------------------- | ---------------------------------------------- | ------------------------------------------------------ | --------------------------------------------- | ----------------------------------------------------------------------------- |
| Mature                | Hygienic macros                                | Central to modern Scheme understanding                 | Need for safe syntactic abstraction           | Macro quality depends on design discipline                                    |
| Mature                | SRFI-based portability                         | Important across implementations                       | Small standard libraries need extension       | SRFI support still varies by implementation                                   |
| Mature                | Implementation-specific professional use       | Normal in real Scheme work                             | Different Schemes serve different domains     | Portability claims require testing                                            |
| Emerging / continuing | R7RS-large and library standardization efforts | Important but not a single dominant ecosystem solution | Desire for richer portable Scheme             | Fragmentation remains part of the language reality                            |
| Emerging / adjacent   | Racket-style language-oriented programming     | Highly influential adjacent model                      | DSLs and specialized languages                | Racket is not simply Scheme-standard behavior                                 |
| Overhyped             | “Macros solve everything”                      | Misleading                                             | Macros are powerful and seductive             | Functions, records, modules, and data design are often better                 |
| Overhyped             | “Scheme is only for teaching”                  | False but understandable                               | Scheme is prominent in pedagogy and PL theory | Production use depends heavily on implementation and ecosystem fit            |
| Declining / legacy    | Treating lists as the universal data model     | Still seen in old or beginner code                     | Lists are simple and canonical                | Records, vectors, bytevectors, hash tables, and SRFIs often model data better |

A professional Scheme programmer must therefore read history as engineering context: **smallness, standards, macro systems, and implementation diversity are not accidents; they are the ecosystem’s defining constraints.**

### Macro-level failure modes — tempting mental models and correct replacements

Scheme’s hardest beginner-to-advanced transition is not syntax. It is replacing plausible but wrong mental models.

| Tempting but wrong mental model                 | Surprising behavior or bug                                  | Correct semantic explanation                                                                                     | Professional rule of thumb                                                     | Boundary where rule changes                                                                |
| ----------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| “Scheme code is just lists”                     | Runtime list operations do not behave like macro expansion  | Program text, datums, syntax objects, and runtime values are distinct layers                                     | Say exactly which layer is being manipulated                                   | Simple quoted examples blur the distinction for pedagogy                                   |
| “A macro is a function that runs earlier”       | Macro arguments are not evaluated like function arguments   | Macros transform syntax before runtime evaluation                                                                | Use macros for syntax, not ordinary computation                                | Procedural macro systems can compute during expansion, but still operate at expansion time |
| “Dynamic typing means no type discipline”       | Data invariants collapse in larger programs                 | Scheme has runtime types but not core static type checking                                                       | Enforce representation discipline with predicates, records, modules, and tests | Typed dialects or contract systems add stronger boundaries                                 |
| “Tail calls are an optimization”                | Recursive loops are expected to run in constant stack space | Proper tail recursion is a semantic guarantee in Scheme standards                                                | Use tail-recursive loops deliberately                                          | Debuggers and implementations may expose different stack information                       |
| “`eval` is a flexible abstraction tool”         | Code becomes unsafe, slow, untestable, or non-portable      | `eval` evaluates expressions in environments and is mainly for interpreters, REPLs, and controlled dynamic cases | Prefer procedures, data, dispatch tables, and macros                           | Interpreter construction and plugin-like systems may justify controlled `eval`             |
| “If it works in one Scheme, it is Scheme”       | Code fails under another implementation                     | Standards, SRFIs, and implementation extensions differ                                                           | Declare the target standard and implementation                                 | Single-implementation projects may intentionally optimize for one Scheme                   |
| “Mutation is rare, so aliasing does not matter” | Shared structures change unexpectedly                       | Mutable pairs, vectors, strings, boxes, or records can create aliases                                            | Treat mutation as a boundary decision                                          | Purely functional representations reduce but do not erase allocation costs                 |

These failure modes will recur throughout the tutorial. The guide will treat them as semantic checkpoints rather than isolated warnings.

### Early transfer map — what carries over and what must be unlearned

The full transfer map appears later, but Part 1 needs an early orientation because many readers approach Scheme from another language.

| Source-language habit or concept | How it appears in Scheme                            | What transfers                   | What changes                                                 | Common failure mode                         | Better mental model                                        |
| -------------------------------- | --------------------------------------------------- | -------------------------------- | ------------------------------------------------------------ | ------------------------------------------- | ---------------------------------------------------------- |
| Python functions and closures    | Scheme procedures and lexical closures              | Passing functions as values      | Procedures are more central to the language’s core semantics | Treating Scheme as Python with prefix calls | Think in environments and procedure application            |
| JavaScript closures              | Scheme closures                                     | Capturing variables              | No JS prototype/object model by default                      | Importing JS object patterns unnecessarily  | Use closures, records, and modules deliberately            |
| Haskell/ML functional style      | Recursion, higher-order procedures                  | Functional decomposition         | No core static ADTs or type inference                        | Assuming compile-time exhaustiveness        | Use runtime predicates and disciplined representation      |
| Common Lisp macros               | Scheme macros                                       | Syntactic abstraction            | Hygiene and standards differ                                 | Writing Scheme as small Common Lisp         | Respect Scheme’s smaller core and hygienic macro tradition |
| C data representation            | Vectors, bytevectors, FFI, implementation internals | Awareness of layout and cost     | Ordinary Scheme abstracts over memory layout                 | Over-optimizing before profiling            | Understand allocation and representation, then measure     |
| Java modularity                  | Libraries and modules                               | Public/private boundary thinking | Scheme module systems vary                                   | Expecting one universal packaging model     | Pick standard and implementation boundaries explicitly     |

The most important transfer rule is simple: **do not import a host language’s object model, type model, module model, or performance model into Scheme without checking whether Scheme actually provides that mechanism at the same layer.**

### Part 1 working mental model — Scheme as a small language for building larger meanings

The working mental model for the rest of the tutorial is:

Scheme is a small, lexically scoped, dynamically typed, properly tail-recursive Lisp-family language whose power comes from **procedures**, **environments**, **symbolic data**, **macros**, **controlled mutation**, **interactive evaluation**, and **implementation-specific extension points**.

Its core strength is not that it has many features. Its core strength is that a small number of mechanisms explain a large range of programs.

Its core risk is also not that it is weak. Its core risk is that it gives the programmer enough power to build abstractions whose boundaries are invisible unless they are designed carefully.

The rest of the guide will therefore treat Scheme through five recurring questions:

| Question                                                                                              | Why it matters                                                 |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| What layer is this: reader datum, syntax, runtime value, binding, module, or implementation behavior? | Prevents confusion between lists, code, macros, and evaluation |
| Is this standard Scheme, SRFI-based Scheme, or implementation-specific Scheme?                        | Prevents portability mistakes                                  |
| Is this abstraction a procedure, macro, record, module, or DSL?                                       | Prevents overusing one abstraction mechanism                   |
| What invariant is being enforced, and where?                                                          | Compensates for the absence of core static type guarantees     |
| What is the allocation, traversal, or runtime cost?                                                   | Prevents elegant but inefficient symbolic code                 |

## PART 2 — Core Syntax and Semantic Primitives Reference

### Orientation — reader, datum, expression, evaluation, binding

Part 2 is a **source-reading reference**. Its goal is not to teach every library, every data structure, or every implementation feature. Its goal is to make Scheme code readable at the level of **surface syntax plus primitive semantics**: what the reader sees, what the evaluator evaluates, what counts as a binding, what is data, what is syntax, what is a procedure call, what is a special form, and where the language’s apparent uniformity stops.

This matters especially for Scheme because the language looks syntactically simple, but that simplicity hides several layers that must not be collapsed. The tutorial specification explicitly requires Scheme to be taught through `eval/apply`, homoiconicity, lambda calculus, macro systems, and language-oriented programming, while also distinguishing ordinary runtime data manipulation from syntax transformation and ordinary function calls from macro expansion. 

The most important initial distinction is this:

| Layer                   | What it is                                                   | Example                                         | What can go wrong                                            |
| ----------------------- | ------------------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------ |
| Character stream        | Text in a file or REPL input                                 | `(define x 1)`                                  | Treating text as if it were already structured data          |
| Datum                   | Object produced by the reader                                | A list whose first datum is the symbol `define` | Thinking every datum is valid code                           |
| Expression / form       | A datum interpreted as program syntax                        | `(define x 1)` as a definition form             | Treating all lists as procedure calls                        |
| Expansion-time syntax   | Syntax objects or syntactic forms processed by macros        | `syntax-rules` input pattern                    | Confusing macro-time syntax with runtime lists               |
| Runtime value           | Value produced by evaluation                                 | Number `1`, procedure object, pair, vector      | Confusing quoted code-like data with executable code         |
| Binding                 | Association between identifier and meaning in an environment | `x` bound to `1`                                | Confusing lexical binding with textual replacement           |
| Procedure application   | Runtime call after operator and operands are evaluated       | `(+ 1 2)`                                       | Treating special forms as procedures                         |
| Implementation behavior | Behavior determined by a particular Scheme system            | module loading, FFI, compiler optimization      | Assuming implementation-specific behavior is portable Scheme |

Scheme’s syntax is regular enough that many examples look deceptively similar. These three forms are visually close but semantically different:

```scheme
(+ 1 2)

'(+ 1 2)

(define-syntax my-form
  (syntax-rules ()
    ((_ x) x)))
```

The first is an ordinary procedure application. The second is quoted data. The third is macro definition syntax. A professional Scheme reader must constantly ask: **Which layer is this form operating in?**

### Source structure — programs, libraries, files, REPL input

Scheme source can appear as standalone expressions at a REPL, top-level definitions in a file, or library/module forms depending on the standard and implementation.

At the portable R7RS-small level, source organization is more restrained than in full application-oriented ecosystems. `define-library` exists for library declaration, but each implementation’s practical workflow may differ. Chez Scheme, Guile, Chicken, Gambit, and Racket-like systems may provide different file-loading, compilation, module, and package mechanisms. Part 5 and Part 6 will handle module boundaries and ecosystem workflows in detail. Here, the important syntax-level distinction is simply this: **not every top-level form has the same role.**

| Source-level construct | Meaning                                   | Typical location                                      | Design meaning                               | Practical consequence                              | Common pitfall                                                                  |
| ---------------------- | ----------------------------------------- | ----------------------------------------------------- | -------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------- |
| Expression             | Form evaluated for a value or effect      | REPL, body positions                                  | Scheme is expression-oriented                | Many constructs produce values                     | Assuming only function calls are expressions                                    |
| Definition             | Creates or defines a binding              | Top level, library body, internal definition contexts | Names are bound in environments              | Source order and scope matter                      | Confusing definition with assignment                                            |
| Library declaration    | Declares imports, exports, and body       | R7RS library file or implementation convention        | Module boundary                              | Portability depends on standard and implementation | Assuming all Scheme implementations use the same module syntax                  |
| Import form            | Brings bindings into scope                | Library/program top level, depending on standard      | Namespaces are explicit at module boundaries | Makes dependency boundaries visible                | Assuming import behavior from Racket, Common Lisp, or Python transfers directly |
| Macro definition       | Creates expansion-time syntax transformer | Top level or allowed definition context               | Syntax can be abstracted                     | New forms can exist before runtime                 | Treating macro definitions as runtime functions                                 |

A REPL makes Scheme feel like every form is just “entered and evaluated.” That is useful for exploration, but real Scheme code must distinguish **interactive evaluation**, **file loading**, **library compilation**, **macro expansion**, and **runtime execution**.

**Common Pitfalls:** The common mistake is to treat top-level REPL behavior as the whole language model. A REPL may accept forms, redefinitions, or loading patterns that are poor style or non-portable in library code. Professional Scheme code should make dependency and binding boundaries explicit.

### Lexical structure — characters, whitespace, delimiters, case, tokens

Scheme source is read from characters into datums. Whitespace separates tokens but usually has no semantic meaning beyond separation. Parentheses structure lists. Identifiers, numbers, booleans, characters, strings, symbols, vectors, bytevectors, quoting prefixes, and comments are recognized by the reader.

| Lexical item      | Meaning                                                | Canonical example          | Practical consequence                                               | Common pitfall                                             |
| ----------------- | ------------------------------------------------------ | -------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------- |
| Whitespace        | Separates tokens                                       | `(+ 1 2)`                  | Formatting improves readability but usually does not change meaning | Assuming line breaks behave like Python indentation        |
| Parentheses       | Delimit list structure                                 | `(f x y)`                  | Source structure is explicit                                        | Thinking parentheses are merely grouping punctuation       |
| Identifier        | Name used for variable, keyword, macro, or syntax role | `map`, `x`, `list->vector` | Many punctuation characters can appear in names                     | Importing C-like identifier expectations                   |
| Number token      | Numeric datum                                          | `42`, `3.14`, `1/3`        | Exactness and numeric tower matter                                  | Assuming all numbers are machine floats                    |
| String literal    | Text datum                                             | `"hello"`                  | Strings are data values, not identifiers                            | Confusing strings with symbols                             |
| Character literal | Character datum                                        | `#\a`, `#\space`           | Characters and strings are distinct                                 | Treating a one-character string as a character             |
| Boolean literal   | Truth values                                           | `#t`, `#f`                 | Only `#f` is false in conditionals                                  | Treating empty list or zero as false                       |
| Quote prefix      | Abbreviation for `quote`                               | `'x`, `'(1 2 3)`           | Prevents evaluation                                                 | Thinking quote makes “code executable later” automatically |
| Quasiquote prefix | Template-like datum construction                       | `` `(a ,x) ``              | Useful for constructing list-like data and macro templates          | Confusing quasiquote with string interpolation             |
| Comment           | Ignored by reader                                      | `; comment`                | Comments disappear before evaluation                                | Relying on comments as runtime metadata                    |

Scheme allows many identifier names that would be illegal in C-family languages. Names like `list->vector`, `set!`, `zero?`, `string=?`, `call-with-current-continuation`, and `make-counter` are conventional. Punctuation is often meaningful by convention, not by parser magic.

| Naming convention          | Typical meaning                                             | Example                          | Caution                                                     |
| -------------------------- | ----------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------- |
| Predicate suffix `?`       | Procedure returning a boolean-like answer                   | `null?`, `pair?`, `number?`      | Convention, not a type-system feature                       |
| Mutation suffix `!`        | Procedure may mutate state                                  | `set-car!`, `vector-set!`        | Convention signals danger; it does not enforce safety       |
| Conversion arrow `->`      | Converts one representation to another                      | `list->vector`                   | May allocate or validate                                    |
| Constructor prefix `make-` | Creates an object or structure                              | `make-vector`                    | Allocation is likely                                        |
| `call-with-...`            | Procedure receives a resource or continuation-like argument | `call-with-input-file`           | Usually indicates dynamic extent or controlled resource use |
| Long descriptive names     | Standard Scheme favors clarity                              | `call-with-current-continuation` | Abbreviations may reduce readability in serious code        |

**Language-design note:** Scheme’s reader is not the evaluator. It turns text into data-like objects. Evaluation is a later semantic step. This is why quote and macro systems are so central: they work with the boundary between textual program representation and evaluated runtime values.

**Common Pitfalls:** Do not assume Scheme identifiers follow the same rules as JavaScript, Python, Java, or C. Also do not infer semantics solely from punctuation. `?`, `!`, and `->` are strong conventions, but the language does not automatically enforce their intended meaning.

### Comments and documentation syntax — line comments, datum comments, block comments

Scheme comments exist at the reader level. They are removed or ignored before ordinary evaluation. Their exact availability can depend on the standard and implementation, but several forms are common.

| Comment form                     | Meaning                               | Example             | Use case                           | Pitfall                                      |                                               |                                                           |
| -------------------------------- | ------------------------------------- | ------------------- | ---------------------------------- | -------------------------------------------- | --------------------------------------------- | --------------------------------------------------------- |
| Line comment                     | Ignores from semicolon to end of line | `; this is ignored` | Ordinary explanation               | Over-commenting obvious forms                |                                               |                                                           |
| Nested block comment             | Ignores a block                       | `#                  | ...                                | #`                                           | Temporarily suppressing larger source regions | Implementation or standard expectations should be checked |
| Datum comment                    | Ignores the next datum                | `#;(+ 1 2)`         | Disable one full expression safely | Forgetting that it removes exactly one datum |                                               |                                                           |
| Conventional multiple semicolons | Human style convention                | `;; section note`   | Readability organization           | Not semantic                                 |                                               |                                                           |

Example:

```scheme
(define x 10) ; line comment

#;
(define ignored-value
  (+ 1 2 3))

(+ x 1)
```

The datum comment `#;` is especially useful because Scheme code is datum-structured. It can comment out a whole expression even if the expression spans multiple lines.

**Professional usage rule:** Use comments to explain representation invariants, macro contracts, portability assumptions, and non-obvious evaluation behavior. Avoid comments that merely restate the visible prefix form.

**Common Pitfalls:** A line comment is textual, but a datum comment is structural. `#;` removes the next datum, not necessarily the next line. This is useful, but it can surprise readers when the next datum is large.

### Datums and external representation — the reader’s data layer

A **datum** is an externally representable Scheme object read from source. Numbers, booleans, characters, strings, symbols, lists, vectors, and bytevectors can appear as datums. Not every datum is a valid expression in every context, and not every expression is an ordinary procedure call.

| Datum category   | Example      |          Runtime value? |                      Can appear as expression? | Evaluation behavior                                                       |
| ---------------- | ------------ | ----------------------: | ---------------------------------------------: | ------------------------------------------------------------------------- |
| Number           | `42`         |                     Yes |                                            Yes | Self-evaluating                                                           |
| Boolean          | `#t`         |                     Yes |                                            Yes | Self-evaluating                                                           |
| String           | `"abc"`      |                     Yes |                                            Yes | Self-evaluating                                                           |
| Character        | `#\a`        |                     Yes |                                            Yes | Self-evaluating                                                           |
| Symbol           | `abc`        | Yes as data when quoted |                              Yes as identifier | Evaluated as variable reference unless quoted                             |
| List datum       | `(a b c)`    | Yes as data when quoted |                                    Yes as form | Evaluated according to first element if used as code                      |
| Vector datum     | `#(1 2 3)`   |                     Yes |                                            Yes | Self-evaluating or literal data depending on context and mutability rules |
| Bytevector datum | `#u8(1 2 3)` |     Yes where supported |                                            Yes | Represents bytes                                                          |
| Dotted pair      | `(a . b)`    | Yes as data when quoted | Usually not meaningful as ordinary call syntax | Represents pair whose tail is not a proper list                           |

The same visual form can be data or code depending on quotation and context:

```scheme
(+ 1 2)     ; evaluates as a procedure call

'(+ 1 2)    ; evaluates to a list containing the symbol + and numbers 1, 2
```

The first form asks the evaluator to apply the value bound to `+` to arguments `1` and `2`. The second form produces data.

**Failure-first explanation:**
The tempting model is: “A parenthesized expression is a list, and Scheme executes lists.” The surprising bug appears when a programmer tries to manipulate ordinary runtime lists as if they were active program forms. The correct model is: source is read into datums; some datums are evaluated as expressions; quotation suppresses evaluation; macro expansion happens before runtime evaluation; ordinary lists at runtime are just data. The rule of thumb is: **always name the layer**. The boundary changes only in deliberately reflective mechanisms such as `eval`, macro expansion, or interpreter construction.

### Expressions and forms — self-evaluating values, variables, special forms, applications

Scheme is expression-oriented. Many constructs produce values, and forms are usually written in prefix notation. But not all forms are equal.

| Form category              | Shape                                              | Meaning                               | Example                           | Evaluation rule                            |
| -------------------------- | -------------------------------------------------- | ------------------------------------- | --------------------------------- | ------------------------------------------ |
| Self-evaluating expression | Literal datum                                      | Produces itself as value              | `42`, `"x"`, `#t`                 | No variable lookup                         |
| Variable reference         | Identifier                                         | Looks up binding                      | `x`                               | Environment lookup                         |
| Special form               | List beginning with special keyword                | Has special evaluation rule           | `(if test a b)`                   | Keyword-specific                           |
| Procedure application      | List whose first expression evaluates to procedure | Calls procedure on evaluated operands | `(+ 1 2)`                         | Evaluate operator and operands, then apply |
| Macro use                  | Form recognized by syntactic binding               | Expanded before runtime               | `(when test body ...)` if defined | Expansion-time transformation              |
| Definition                 | Definition form                                    | Creates or defines binding            | `(define x 1)`                    | Allowed only in definition contexts        |

Ordinary procedure application has a general shape:

```scheme
(operator operand ...)
```

But this shape must be interpreted carefully. In an ordinary call, the operator expression and operands are evaluated, and then the resulting procedure is applied. In a special form, that ordinary rule is replaced.

Compare:

```scheme
(+ 1 2)
```

Here `+` is looked up as a procedure, `1` and `2` evaluate to numbers, and the procedure is applied.

```scheme
(if (> x 0)
    x
    (- x))
```

Here `if` is not an ordinary procedure. It does not evaluate both branches before choosing one. It first evaluates the test, then evaluates only the selected consequent or alternative.

This distinction is central to Scheme. An ordinary function cannot implement `if` with the same evaluation behavior, because procedure arguments are evaluated before the procedure receives them.

**Language-design note:** Special forms exist where ordinary procedure application is not expressive enough because evaluation itself must be controlled. Macros extend this idea by letting programmers define new syntactic forms with non-ordinary evaluation patterns.

**Common Pitfalls:** The most common error is treating every parenthesized form as a function call. Forms such as `if`, `lambda`, `define`, `quote`, `set!`, `let`, `let*`, `letrec`, `begin`, `cond`, `case`, `and`, `or`, and macro uses do not all follow ordinary procedure-call evaluation.

### Primitive evaluation model — `eval`, `apply`, environments, and application

The `eval/apply` distinction is one of the cleanest ways to understand Scheme.

**Evaluation** asks: given an expression and an environment, what value does the expression produce?

**Application** asks: given a procedure and argument values, what result does the procedure produce?

A simplified conceptual split looks like this:

| Concept           | Question answered                                       | Scheme examples                                              | Professional consequence                         |
| ----------------- | ------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| `eval` intuition  | What does this expression mean in this environment?     | variable lookup, literal evaluation, special-form evaluation | Helps explain source semantics                   |
| `apply` intuition | What happens when this procedure receives these values? | `(+ 1 2)`, `(map f xs)`                                      | Helps explain runtime procedure calls            |
| Environment       | Which bindings are visible?                             | `let`, `lambda`, `define`                                    | Explains lexical scope and closures              |
| Special-form rule | Which subforms are evaluated, and when?                 | `if`, `quote`, `lambda`                                      | Explains why functions cannot replace all syntax |
| Macro expansion   | What syntax is produced before runtime?                 | `syntax-rules` macros                                        | Explains syntactic abstraction                   |

A conceptual procedure application can be described as:

```scheme
(f x y)
```

The evaluator looks up `f`, evaluates `x`, evaluates `y`, then applies the resulting procedure to the argument values. The actual standard is more precise, and evaluation order of operands is a subtle topic discussed later in Part 7, but this rough model is enough to distinguish ordinary calls from special forms.

**Important boundary:** `eval` as a conceptual model is central. `eval` as a function used in normal application code is not usually central. Professional Scheme code should not use runtime `eval` merely to avoid designing data structures, dispatch tables, procedures, or macros.

**Common Pitfalls:** A programmer may say “Scheme evaluates lists.” More accurately, Scheme evaluates expressions. Some expressions are list-structured forms. Some list-structured forms are procedure applications. Some are special forms. Some are macro uses. Some lists are merely data because they are quoted or produced at runtime.

### Literals — booleans, numbers, characters, strings, symbols, lists, vectors

Scheme literals deserve careful handling because several are self-evaluating while symbols and lists are not self-evaluating in the same way.

| Literal / notation         | Example             | Evaluates to  | Design meaning                      | Practical consequence                     | Common pitfall                                |
| -------------------------- | ------------------- | ------------- | ----------------------------------- | ----------------------------------------- | --------------------------------------------- |
| Boolean true               | `#t`                | true value    | Truth is explicit                   | Used in predicates                        | Assuming only `#t` is truthy                  |
| Boolean false              | `#f`                | false value   | Only false value in conditionals    | Failure/absence often represented by `#f` | Treating `'()` as false                       |
| Number                     | `10`, `1/3`, `2+3i` | numeric value | Rich numeric tower                  | Exactness matters                         | Assuming all arithmetic is floating-point     |
| Character                  | `#\a`               | character     | Character separate from string      | Useful for text processing                | Confusing with `"a"`                          |
| String                     | `"abc"`             | string        | Sequence of characters              | Text data                                 | Mutability may vary by literal/context        |
| Symbol as quoted data      | `'abc`              | symbol        | Interned symbolic name              | Good for tags and identifiers-as-data     | Confusing symbol with string                  |
| Proper list as quoted data | `'(1 2 3)`          | list          | Chain of pairs ending in empty list | Canonical sequential symbolic data        | Assuming list access is random-access         |
| Dotted pair                | `'(a . b)`          | pair          | Two-field cons cell                 | Useful for pairs and association lists    | Confusing with proper list                    |
| Vector                     | `#(1 2 3)`          | vector        | Indexed aggregate                   | Better for random access than list        | Assuming vector and list have same cost model |
| Bytevector                 | `#u8(1 2 3)`        | bytevector    | Raw byte sequence                   | Useful for binary data and I/O            | Confusing bytes with characters               |

The most important literal rule for conditionals is:

```scheme
(if '()
    'empty-list-is-true
    'empty-list-is-false)
```

In Scheme, the empty list is not false. Only `#f` is false. This differs from Common Lisp, Python, JavaScript, and many other languages.

**Failure-first explanation:**
The tempting model imported from Common Lisp or Python is: “empty collections are false.” The surprising behavior is that `'()` behaves as true in Scheme conditionals. The correct explanation is that Scheme conditionals treat only `#f` as false; every other value is true. The rule of thumb is: **use predicates explicitly**. The boundary changes only if an implementation-specific API imposes its own convention, but Scheme conditionals themselves follow the language rule.

### Booleans and condition truth — `#f` versus everything else

Scheme has two canonical boolean values, `#t` and `#f`, but conditional tests accept any value. The rule is simple and sharp:

**Only `#f` is false. Everything else is true.**

| Value                         | Conditional status | Example consequence                    |
| ----------------------------- | -----------------: | -------------------------------------- |
| `#f`                          |              false | Alternative branch is selected         |
| `#t`                          |               true | Consequent branch is selected          |
| `'()`                         |               true | Empty list is not false                |
| `0`                           |               true | Zero is not false                      |
| `""`                          |               true | Empty string is not false              |
| `'false`                      |               true | Symbol named `false` is still a symbol |
| Any procedure                 |               true | Procedures are ordinary true values    |
| Any pair/vector/string/record |               true | Object existence is not falsity        |

Example:

```scheme
(if 0
    'zero-is-true
    'zero-is-false)

(if '()
    'empty-list-is-true
    'empty-list-is-false)
```

Predicates conventionally end in `?`:

```scheme
(null? '())
(number? 10)
(string? "abc")
```

A predicate should normally return a boolean, but in Scheme it is common for search-like procedures to return either a useful value or `#f`. This pattern is convenient but must be used carefully because any non-`#f` value is true.

**Common Pitfalls:** Do not write conditionals that rely on Python-like or JavaScript-like truthiness. In Scheme, absence and failure are often represented by `#f`, not by empty collections or zero.

### Numbers — numeric tower, exactness, arithmetic syntax

Scheme’s number system is richer than many mainstream languages. The full details belong in Part 3 and Part 7, but basic source reading requires recognizing that numeric literals are not all machine integers or floating-point values.

| Numeric idea    | Example                         | Meaning                                   | Practical consequence                       |
| --------------- | ------------------------------- | ----------------------------------------- | ------------------------------------------- |
| Integer         | `42`                            | Whole number                              | Often exact                                 |
| Rational        | `1/3`                           | Exact ratio where supported               | Arithmetic may preserve exactness           |
| Inexact decimal | `3.14`                          | Approximate number                        | Floating-point behavior may appear          |
| Complex         | `2+3i`                          | Complex number where supported            | Numeric procedures may operate beyond reals |
| Exactness       | `#e1.0`, exact literals         | Mathematically exact value where possible | May be slower or produce rational results   |
| Inexactness     | `#i1/3`, decimal approximations | Approximate value                         | Rounding and precision matter               |

Basic arithmetic is prefix:

```scheme
(+ 1 2 3)
(* 2 3 4)
(- 10 3)
(/ 10 2)
```

Prefix notation makes variadic arithmetic natural. `(+ 1 2 3 4)` is not syntactic sugar for nested binary operators; it is a procedure call to `+` with multiple arguments.

**Language-design note:** Scheme’s numeric system reflects Lisp’s mathematical heritage more than C’s machine-word heritage. That gives expressive arithmetic, but also makes exactness, implementation support, and performance important.

**Common Pitfalls:** Do not assume `/` always returns an integer or a floating-point number. Do not assume exact arithmetic has the same cost as fixed-width integer arithmetic. Do not assume every implementation has identical numeric performance or all optional numeric capabilities.

### Characters and strings — text values, escapes, mutation caution

Characters and strings are distinct. A character is a single character value; a string is a sequence of characters.

| Construct         | Example                    | Meaning                    | Use                        |
| ----------------- | -------------------------- | -------------------------- | -------------------------- |
| Character literal | `#\a`                      | character `a`              | Character processing       |
| Space character   | `#\space`                  | space character            | Readable special character |
| Newline character | `#\newline`                | newline                    | Text processing            |
| String literal    | `"hello"`                  | string                     | Text data                  |
| Escape sequence   | `"line\n"` where supported | embedded special character | Multiline or special text  |

Example:

```scheme
(char? #\a)
(string? "a")
```

These are not the same kind of value.

String mutability is an area where one must be careful. Scheme has string operations, and some Scheme systems support mutable strings, but literal mutation and implementation behavior can be subtle. Portable professional code should avoid mutating string literals and should treat mutable text operations as a deliberate choice.

**Common Pitfalls:** Do not treat characters as one-character strings. Do not mutate string literals casually. Do not assume text encoding, Unicode handling, or byte-level behavior without checking the standard and implementation APIs being used.

### Symbols — identifiers as data, not strings

Symbols are one of the central Lisp-family data types. A symbol is not a string, although symbols often print like names.

```scheme
'alpha
'some-name
'list->vector
```

A symbol is commonly used as a tag, symbolic identifier, or member of an S-expression. It is especially useful in symbolic computation, interpreters, DSL data, and simple tagged representations.

| Concept              | Symbol                                                    | String                                                |
| -------------------- | --------------------------------------------------------- | ----------------------------------------------------- |
| Typical role         | Identifier-like datum                                     | Text data                                             |
| Example              | `'red`                                                    | `"red"`                                               |
| Equality expectation | Often compared with `eq?` or `eqv?`, depending on context | Usually compared structurally with string predicates  |
| Mutability           | Symbol identity is stable                                 | Strings may be mutable depending on operation/context |
| Common use           | Tags, operators in quoted forms, symbolic names           | User-facing text, file content, messages              |

Example:

```scheme
(define color 'red)

(eq? color 'red)
```

A bare identifier is not a symbol literal:

```scheme
red
```

This attempts to look up the variable binding named `red`. To produce the symbol, quote it:

```scheme
'red
```

**Failure-first explanation:**
The tempting model is: “A symbol is just a string without quotes.” The surprising behavior appears when `(define x 'apple)` works, but evaluating `apple` alone fails because no variable is bound. The correct explanation is that symbols are data, while identifiers in expression position are looked up in environments. The rule of thumb is: **quote symbols when using them as data**. The boundary changes in macro systems, where identifiers carry syntactic binding information rather than being mere runtime symbols.

### Pairs, lists, and dotted notation — `cons`, proper list, improper list

Pairs are primitive compound data. A pair has two fields traditionally called `car` and `cdr`. Lists are built from pairs, but not every pair structure is a proper list.

```scheme
(cons 'a 'b)        ; pair: (a . b)

(cons 'a '())       ; list: (a)

(cons 'a
      (cons 'b
            '()))   ; list: (a b)
```

| Structure          | Example notation | Meaning                              | Proper list? |
| ------------------ | ---------------- | ------------------------------------ | -----------: |
| Empty list         | `'()`            | Empty proper list                    |          Yes |
| One-element list   | `'(a)`           | Pair whose `cdr` is empty list       |          Yes |
| Multi-element list | `'(a b c)`       | Chain of pairs ending in empty list  |          Yes |
| Dotted pair        | `'(a . b)`       | Pair whose `cdr` is `b`              |           No |
| Improper list      | `'(a b . c)`     | Chain ending in non-empty-list value |           No |

The selectors are historical names:

```scheme
(car '(a b c)) ; a
(cdr '(a b c)) ; (b c)
```

The names `car` and `cdr` come from Lisp history and are not self-explanatory. In professional code, they remain common, but overusing nested combinations like `caddr` can reduce readability unless the structure is conventional and obvious.

**Language-design note:** Lists are fundamental, but Scheme is not “only lists.” Vectors, strings, bytevectors, records, hash tables through libraries, and implementation-specific structures matter. Lists are excellent for sequential traversal and symbolic forms; they are poor for random access and some domain models.

**Common Pitfalls:** Do not confuse a pair with a proper list. Do not assume `(cdr x)` always returns a list. Do not use lists as the universal data model merely because they are easy to write.

### Vectors and bytevectors — indexed aggregate syntax

Vectors provide indexed aggregate storage. Bytevectors provide byte-oriented storage where supported by the standard or implementation.

```scheme
#(1 2 3)

#u8(65 66 67)
```

| Aggregate  | Syntax       | Strength                           | Cost model            | Typical use                         |
| ---------- | ------------ | ---------------------------------- | --------------------- | ----------------------------------- |
| List       | `'(1 2 3)`   | Easy recursion, symbolic structure | Sequential traversal  | S-expressions, linked sequences     |
| Vector     | `#(1 2 3)`   | Indexed access                     | Better random access  | Fixed-size collections, tables      |
| Bytevector | `#u8(1 2 3)` | Compact bytes                      | Byte-level operations | Binary I/O, protocols, encoded data |

Vectors are often a better fit than lists when the task is indexed access rather than recursive decomposition. Bytevectors are essential when the task is not text but raw bytes.

**Common Pitfalls:** Do not use lists for everything. A list is not a general-purpose array. Conversely, do not use vectors when the natural operation is recursive decomposition of symbolic structure.

### Quotation — `quote`, quote abbreviation, literal data

Quotation suppresses evaluation.

```scheme
(quote x)

'x
```

Both produce the symbol `x`.

Quotation can also produce list data:

```scheme
'(1 2 3)

'(+ 1 2)
```

The second form does not add numbers. It produces a list whose first element is the symbol `+`.

| Form       | Equivalent form     | Result                          |
| ---------- | ------------------- | ------------------------------- |
| `'x`       | `(quote x)`         | symbol `x`                      |
| `'(1 2 3)` | `(quote (1 2 3))`   | list of numbers                 |
| `''x`      | `(quote (quote x))` | list-like quoted representation |
| `'()`      | `(quote ())`        | empty list                      |

Quote is central because it exposes the difference between code-like surface structure and evaluated expressions. It is also a common entry point into homoiconicity, but it must be handled precisely.

**Interdisciplinary Lens: Homoiconicity**
**What it clarifies:** Scheme can represent program-like structures as data, especially through symbols and lists.
**Language feature involved:** `quote`, symbols, lists, S-expressions.
**Practical consequence:** Quoted forms are useful for symbolic computation, interpreters, and macro examples.
**Limit of the lens:** Quoted runtime data is not the same thing as hygienic macro syntax objects or executable code.

**Common Pitfalls:** Quote does not mean “delay execution and then run later.” It means “produce this datum without evaluating it.” Running code-like data later requires an evaluator, and that is a separate mechanism with serious portability, safety, and design consequences.

### Quasiquote — templates, unquote, unquote-splicing

Quasiquote is a controlled way to construct data from mostly literal templates with evaluated holes.

```scheme
(define x 10)

`(a b ,x)
```

This produces a list similar to:

```scheme
'(a b 10)
```

The comma `,` unquotes an expression inside a quasiquoted form.

```scheme
(define xs '(2 3))

`(1 ,@xs 4)
```

This produces:

```scheme
'(1 2 3 4)
```

The `,@` form is unquote-splicing. It inserts the elements of a list into the surrounding list structure.

| Syntax       | Name             | Meaning                                         | Example result                          |
| ------------ | ---------------- | ----------------------------------------------- | --------------------------------------- |
| `` `datum `` | quasiquote       | Template-like datum construction                | `` `(a b c) `` gives `(a b c)`          |
| `,expr`      | unquote          | Evaluate expression and insert value            | `` `(a ,(+ 1 2)) `` gives `(a 3)`       |
| `,@expr`     | unquote-splicing | Evaluate expression to list and splice elements | `` `(a ,@(list 1 2)) `` gives `(a 1 2)` |

Quasiquote is useful for constructing symbolic data. It also appears in macro writing, but macro systems may involve syntax objects and pattern systems beyond plain runtime quasiquote.

**Common Pitfalls:** Quasiquote is not general string interpolation. It constructs structured data. Also, `,@` only makes sense where splicing into a surrounding list-like structure is valid.

### Identifiers and variable references — names resolved by environments

An identifier used as an expression is a variable reference. It is evaluated by looking up its binding in the current lexical environment.

```scheme
(define x 10)

x
```

Here `x` evaluates to `10` because `x` is bound.

A quoted identifier is different:

```scheme
'x
```

This evaluates to the symbol `x`, not the value bound to `x`.

| Source form | Layer             | Meaning                                 |
| ----------- | ----------------- | --------------------------------------- |
| `x`         | Expression        | Look up binding named `x`               |
| `'x`        | Quoted datum      | Produce symbol `x`                      |
| `"x"`       | String literal    | Produce string containing character `x` |
| `#\x`       | Character literal | Produce character `x`                   |

This distinction is basic but critical. It affects all later topics: macros, modules, symbolic data, interpreters, and DSLs.

**Common Pitfalls:** Do not confuse the printed name of an identifier with a symbol value. A variable named `x`, a symbol `'x`, and a string `"x"` are different things.

### Definitions — `define` for variables and procedures

`define` introduces a binding in a definition context. It is not the same as assignment.

```scheme
(define x 10)
```

This defines `x`.

Procedure definitions have a shorthand:

```scheme
(define (square x)
  (* x x))
```

This is broadly equivalent to defining `square` as a procedure value:

```scheme
(define square
  (lambda (x)
    (* x x)))
```

| Definition form              | Meaning                              | Example                   | Practical consequence                        |
| ---------------------------- | ------------------------------------ | ------------------------- | -------------------------------------------- |
| Variable definition          | Bind name to value                   | `(define x 10)`           | Creates a top-level or local binding         |
| Procedure shorthand          | Bind name to procedure               | `(define (f x) body)`     | Convenient but still creates procedure value |
| Variadic procedure shorthand | Bind name to rest-argument procedure | `(define (f . xs) xs)`    | Captures all arguments as a list             |
| Mixed fixed/rest shorthand   | Fixed arguments plus rest list       | `(define (f x . xs) xs)`  | Useful for flexible APIs                     |
| Internal definition          | Definition inside body context       | `(let () (define x 1) x)` | Scope and ordering rules matter              |

The shorthand does not make procedures special objects. A procedure is still a value. This is essential for understanding higher-order programming.

```scheme
(define (apply-twice f x)
  (f (f x)))

(apply-twice square 2)
```

**Language-design note:** `define` creates bindings; `lambda` creates procedures; procedure definition syntax is convenience over `lambda`. This supports a uniform model in which named functions are just names bound to procedure values.

**Common Pitfalls:** Do not treat `define` as assignment. Redefinition at the REPL may feel like mutation, but in program structure `define` establishes bindings. Use `set!` only when changing an existing binding’s value is the intended semantics.

### Lambda — anonymous procedures, parameters, body, closure creation

`lambda` creates a procedure.

```scheme
(lambda (x)
  (* x x))
```

A procedure can be immediately called:

```scheme
((lambda (x)
   (* x x))
 5)
```

It can be stored:

```scheme
(define square
  (lambda (x)
    (* x x)))
```

It can be returned:

```scheme
(define (make-adder n)
  (lambda (x)
    (+ x n)))
```

And it can capture its environment:

```scheme
(define add10 (make-adder 10))

(add10 5)
```

Here the inner procedure remembers the binding of `n`.

| Lambda component    | Example              | Meaning                                   |
| ------------------- | -------------------- | ----------------------------------------- |
| Keyword             | `lambda`             | Special form that creates a procedure     |
| Formals             | `(x y)`              | Required parameters                       |
| Body                | `(+ x y)`            | Expression sequence evaluated when called |
| Closure environment | surrounding bindings | Captured lexical context                  |
| Result              | procedure value      | First-class runtime value                 |

Scheme supports several parameter-list shapes:

| Formal parameter shape | Example                     | Meaning                                  |
| ---------------------- | --------------------------- | ---------------------------------------- |
| Fixed arity            | `(lambda (x y) ...)`        | Exactly two arguments                    |
| Rest-only              | `(lambda xs ...)`           | All arguments captured as list `xs`      |
| Fixed plus rest        | `(lambda (x y . rest) ...)` | At least two arguments; extras in `rest` |

Example:

```scheme
(define collect
  (lambda args
    args))

(collect 1 2 3)
```

This returns the list of arguments.

**Interdisciplinary Lens: Lambda calculus**
**What it clarifies:** Procedures are created by abstraction and used by application.
**Language feature involved:** `lambda`, lexical scope, closures, higher-order functions.
**Practical consequence:** Named procedures, anonymous procedures, callbacks, and returned functions all share one semantic foundation.
**Limit of the lens:** Real Scheme includes mutation, multiple values, macros, data types, modules, I/O, and implementation behavior beyond pure lambda calculus.

**Common Pitfalls:** Do not think anonymous procedures are less real than named procedures. Names are bindings; procedures are values. Also do not confuse closure capture with copying all visible variables. A closure preserves access to the lexical environment needed by the procedure.

### Binding forms — `let`, `let*`, `letrec`, named `let`

Binding forms create local bindings. They are central to readable Scheme.

| Form        | Binding behavior                                                              | Typical use                 | Pitfall                                                   |
| ----------- | ----------------------------------------------------------------------------- | --------------------------- | --------------------------------------------------------- |
| `let`       | Bind variables in parallel after evaluating initializers in outer environment | Local temporary names       | Assuming later bindings can see earlier ones              |
| `let*`      | Bind sequentially; later bindings can see earlier ones                        | Stepwise computation        | Using when independent bindings would be clearer as `let` |
| `letrec`    | Create mutually recursive bindings                                            | Local recursive procedures  | Using before understanding initialization restrictions    |
| Named `let` | Local recursive loop                                                          | Iteration through recursion | Forgetting it defines a local procedure-like loop         |

Basic `let`:

```scheme
(let ((x 1)
      (y 2))
  (+ x y))
```

`let*` allows sequential dependency:

```scheme
(let* ((x 1)
       (y (+ x 2)))
  (+ x y))
```

In ordinary `let`, this would not mean the same thing, because the initializer for `y` does not see the new `x`.

`letrec` is used for recursive local definitions:

```scheme
(letrec ((even?
          (lambda (n)
            (if (= n 0)
                #t
                (odd? (- n 1)))))
         (odd?
          (lambda (n)
            (if (= n 0)
                #f
                (even? (- n 1))))))
  (even? 10))
```

Named `let` is a canonical Scheme loop form:

```scheme
(let loop ((n 5)
           (acc 1))
  (if (= n 0)
      acc
      (loop (- n 1) (* acc n))))
```

This is not a special “for loop” in disguise. It is a local recursive procedure call written in binding-form syntax. With proper tail recursion, this style can express iteration in constant stack space.

**Failure-first explanation:**
The tempting model is: “`let` is just assignment to local variables.” The surprising behavior appears when one initializer cannot see another binding from the same `let`. The correct explanation is that `let` evaluates initializers in the outer environment and then creates local bindings. The professional rule is: use `let` for independent local bindings, `let*` for sequential dependency, `letrec` for local recursion, and named `let` for loops. The boundary changes when internal definitions or macros rewrite forms, but the binding distinction remains essential.

**Common Pitfalls:** Do not use `letrec` as a general replacement for `let`. Do not use `let*` automatically for every local binding; it can hide accidental dependencies. Do not read named `let` as ordinary variable binding only; it introduces a recursive control pattern.

### Assignment — `set!`, mutation of bindings, mutation of objects

`set!` changes the value of an existing binding.

```scheme
(define x 0)

(set! x (+ x 1))
```

This is different from `define`. `define` establishes a binding; `set!` mutates an existing binding’s value.

| Construct         | Meaning                               | Example        | Use carefully because                      |
| ----------------- | ------------------------------------- | -------------- | ------------------------------------------ |
| `define`          | Create or define binding              | `(define x 1)` | Definition context matters                 |
| `set!`            | Change existing binding               | `(set! x 2)`   | Hidden state complicates reasoning         |
| Object mutation   | Change contents of mutable object     | `vector-set!`  | Aliasing can surprise readers              |
| Functional update | Produce new value instead of mutation | `(cons x xs)`  | May allocate but is easier to reason about |

Binding mutation and object mutation are related but distinct. Consider:

```scheme
(define v (vector 1 2 3))

(vector-set! v 0 99)
```

The binding `v` still points to the same vector, but the vector’s contents changed.

By contrast:

```scheme
(set! v (vector 4 5 6))
```

Now the binding `v` refers to a different vector.

**Language-design note:** Scheme allows mutation but does not force it. This is a deliberate compromise. Functional style gives equational clarity and simpler reasoning; mutation can model state and improve some performance patterns; uncontrolled mutation introduces aliasing risk.

**Common Pitfalls:** Do not use `set!` simply to imitate imperative languages. Use it when changing state is the actual model. Also distinguish mutation of a binding from mutation of the object to which a binding refers. Shared mutable objects create bugs even if no variable is reassigned.
### Identity and equality — `eq?`, `eqv?`, `equal?`, numeric equality

Equality is one of Scheme’s most important sharp edges. Scheme does not have one universal equality predicate. It has several predicates because “same” can mean different things: same object identity, same numeric value, same symbolic identity, or same recursive structure.

| Predicate  | Main meaning                                                                    | Typical use                                                      | Practical risk                                           |
| ---------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------- |
| `eq?`      | Object identity or implementation-level sameness for some objects               | Symbols, booleans, sometimes object identity checks              | Not reliable for numbers, characters, or structural data |
| `eqv?`     | Similar to `eq?`, but more appropriate for numbers and characters in many cases | General atomic equality where structural recursion is not needed | Numeric exactness and edge cases still matter            |
| `equal?`   | Structural equality                                                             | Lists, trees, vectors, strings, records where supported          | May traverse large structures                            |
| `=`        | Numeric equality                                                                | Numbers                                                          | Only for numbers                                         |
| `string=?` | String equality                                                                 | Strings                                                          | Not for symbols                                          |
| `char=?`   | Character equality                                                              | Characters                                                       | Not for strings                                          |

Examples:

```scheme
(eq? 'a 'a)

(equal? '(1 2 3) '(1 2 3))

(= 10 (+ 5 5))

(string=? "abc" "abc")
```

The important distinction is not merely API-level. It reflects Scheme’s data model.

```scheme
(define xs (list 1 2 3))
(define ys (list 1 2 3))

(eq? xs ys)      ; usually false: distinct list objects
(equal? xs ys)   ; true: same recursive contents
```

For symbols, `eq?` is commonly appropriate:

```scheme
(eq? 'red 'red)
```

For lists and other compound structures, use `equal?` unless identity is specifically intended.

**Failure-first explanation:**
The tempting model is: “Equality means equal value.” The surprising behavior appears when two lists print the same but are not `eq?`. The correct explanation is that `eq?` is not structural equality; it is closer to identity or implementation-level sameness. The professional rule is: use `=` for numbers, `string=?` for strings, `char=?` for characters, `eq?` for symbolic tags when appropriate, and `equal?` for recursive structural comparison. The boundary changes when performance or object identity is deliberately part of the model.

**Common Pitfalls:** Do not use `eq?` as a universal equality test. Do not compare strings with `eq?`. Do not compare numbers with `eq?` in portable code. Do not use `equal?` blindly in performance-sensitive code where structural traversal may be expensive.

### Scope basics — lexical scope, shadowing, internal definitions

Scheme is lexically scoped. A variable reference is resolved according to the program’s lexical structure, not according to the dynamic call stack.

```scheme
(define x 10)

(define (f y)
  (+ x y))
```

The procedure `f` refers to the top-level binding of `x` visible where `f` was defined.

Local bindings can shadow outer bindings:

```scheme
(define x 10)

(let ((x 99))
  x)
```

Inside the `let`, `x` refers to the local binding, not the outer one. Outside the `let`, the outer `x` remains visible.

| Scope concept       | Meaning                                            | Example                               | Practical consequence                        |
| ------------------- | -------------------------------------------------- | ------------------------------------- | -------------------------------------------- |
| Lexical scope       | Binding is determined by source nesting            | `lambda`, `let`                       | Closures are predictable                     |
| Shadowing           | Inner binding hides outer binding with same name   | `(let ((x 1)) ...)`                   | Can clarify local meaning or confuse readers |
| Free variable       | Identifier not bound inside the current expression | `x` inside `(lambda (y) (+ x y))`     | Resolved from enclosing environment          |
| Bound variable      | Identifier introduced by binding form              | parameter `y`                         | Local to binding extent                      |
| Internal definition | Definition inside a body                           | `(define helper ...)` inside function | Scope and ordering require care              |

Internal definitions are useful for local helpers:

```scheme
(define (sum-of-squares x y)
  (define (square z)
    (* z z))
  (+ (square x) (square y)))
```

This is often clearer than exposing `square` globally when it is only needed locally.

**Language-design note:** Lexical scope is one of Scheme’s most important divergences from older dynamically scoped Lisp traditions. It makes closures reliable because a procedure carries the environment of its definition, not the environment of whichever caller happens to invoke it.

**Common Pitfalls:** Avoid excessive shadowing of important names. Shadowing standard procedure names such as `list`, `map`, `+`, or `car` is legal in many contexts but usually confusing. Also avoid assuming that a variable reference is resolved from the caller’s local variables; lexical scope does not work that way.

### Procedure application — operator position, operands, arity

An ordinary Scheme procedure call is written with the operator first:

```scheme
(f a b c)
```

In an ordinary call, the operator expression is evaluated to a procedure, and the operand expressions are evaluated to argument values. Then the procedure is applied.

The operator position can itself be an expression:

```scheme
((if use-addition + *) 2 3)
```

If `use-addition` is true, this applies `+`; otherwise, it applies `*`.

| Call shape                | Meaning                                         | Example                    |
| ------------------------- | ----------------------------------------------- | -------------------------- |
| Named procedure call      | Look up procedure by name                       | `(+ 1 2)`                  |
| Higher-order call         | Procedure comes from expression                 | `((make-adder 10) 5)`      |
| Procedure-valued variable | Binding holds procedure                         | `(f x)`                    |
| Anonymous immediate call  | Lambda directly applied                         | `((lambda (x) (* x x)) 5)` |
| Variadic call             | Procedure receives variable number of arguments | `(+ 1 2 3 4)`              |

Arity matters. A procedure can require a fixed number of arguments, accept a rest argument, or use implementation/library mechanisms for optional arguments.

```scheme
(define (binary-add x y)
  (+ x y))

(binary-add 1 2)
```

Calling it with the wrong number of arguments is an error.

Rest arguments collect extra arguments into a list:

```scheme
(define (collect . xs)
  xs)

(collect 1 2 3)
```

Fixed-plus-rest arguments are also possible:

```scheme
(define (first-and-rest first . rest)
  (list first rest))
```

**Common Pitfalls:** Do not assume infix operator precedence exists in ordinary Scheme code. `(+ 1 (* 2 3))` is the normal form, not `1 + 2 * 3`. Also do not assume the first element of every list is evaluated as a function; quoted lists are data, and special forms/macros have different rules.

### Basic control flow — `if`, `cond`, `case`, `and`, `or`, `when`, `unless`

Scheme control flow is expression-oriented. Conditional forms usually produce values, not merely statements.

The primitive conditional is `if`:

```scheme
(if (> x 0)
    'positive
    'non-positive)
```

Only `#f` is false. Every other value counts as true.

| Form     | Role                                        | Basic shape                                  | Evaluation behavior             | Common use                    |
| -------- | ------------------------------------------- | -------------------------------------------- | ------------------------------- | ----------------------------- |
| `if`     | Basic conditional                           | `(if test consequent alternative)`           | Evaluates test, then one branch | Binary choice                 |
| `cond`   | Multi-branch conditional                    | `(cond (test expr ...) ... (else expr ...))` | Tests clauses in order          | Multi-case logic              |
| `case`   | Dispatch by datum equality                  | `(case key ((a b) expr) ...)`                | Compares key to listed data     | Symbolic dispatch             |
| `and`    | Short-circuit conjunction                   | `(and e1 e2 ...)`                            | Stops at first false value      | Guard chains                  |
| `or`     | Short-circuit disjunction                   | `(or e1 e2 ...)`                             | Stops at first true value       | Fallback values               |
| `when`   | Conditional body without useful alternative | `(when test body ...)`                       | Executes body if true           | Side-effecting guarded action |
| `unless` | Negative conditional body                   | `(unless test body ...)`                     | Executes body if false          | Side-effecting negative guard |

`cond` is often clearer than nested `if`:

```scheme
(cond
  ((< x 0) 'negative)
  ((= x 0) 'zero)
  (else 'positive))
```

`case` is useful when comparing a value against literal alternatives:

```scheme
(case command
  ((start run) 'running)
  ((stop halt) 'stopped)
  (else 'unknown))
```

`and` and `or` are not ordinary procedures because they short-circuit:

```scheme
(and (pair? xs)
     (car xs))

(or configured-value
    default-value)
```

A normal procedure cannot implement this evaluation behavior because all arguments to an ordinary procedure call are evaluated before the call.

`when` and `unless` are usually used for side effects:

```scheme
(when verbose?
  (display "running")
  (newline))
```

**Language-design note:** Control-flow forms exist because evaluation order and evaluation suppression are semantic issues. Functions are not enough when a construct needs to decide whether subexpressions are evaluated.

**Common Pitfalls:** Do not use `when` or `unless` when a meaningful alternative value is needed. Use `if` or `cond`. Do not forget that `and` and `or` return actual operand values, not necessarily canonical `#t` or `#f`.

### Sequencing — `begin`, body expressions, effect order

Scheme bodies may contain multiple expressions. The expressions are evaluated in order, and the value of the last expression is the value of the body.

```scheme
(define (announce-and-add x y)
  (display "adding")
  (newline)
  (+ x y))
```

Here the procedure returns the result of `(+ x y)`, not the result of `display` or `newline`.

`begin` explicitly sequences expressions:

```scheme
(begin
  (display "hello")
  (newline)
  42)
```

This evaluates the first two expressions for effects and returns `42`.

| Sequencing form        | Meaning                                  | Use case                                         | Pitfall                                           |
| ---------------------- | ---------------------------------------- | ------------------------------------------------ | ------------------------------------------------- |
| Procedure body         | Sequence inside `lambda` / `define` body | Effects followed by final result                 | Forgetting only final expression is returned      |
| `begin`                | Explicit sequence                        | Group multiple expressions where one is expected | Overusing it instead of clearer structure         |
| `cond` clause body     | Sequence after selected test             | Multi-expression branch                          | Hiding too much work inside a branch              |
| `when` / `unless` body | Sequence conditional on test             | Guarded effects                                  | Treating as expression with meaningful else-value |

Example:

```scheme
(define (log-positive x)
  (when (> x 0)
    (display "positive")
    (newline))
  x)
```

This returns `x`; the `when` is used only for its side effect.

**Common Pitfalls:** Scheme is expression-oriented, but it still supports effects. Do not confuse “expression-oriented” with “pure.” Also do not write long `begin` blocks when local procedures or clearer decomposition would express the program better.

### Local control and looping — recursion, named `let`, `do`

Scheme’s fundamental looping mechanism is recursion supported by proper tail calls. Named `let` is the most common readable loop form.

```scheme
(let loop ((xs '(1 2 3))
           (acc 0))
  (if (null? xs)
      acc
      (loop (cdr xs) (+ acc (car xs)))))
```

The recursive call to `loop` is in tail position. In Scheme, proper tail recursion means this kind of loop can run without growing the control stack.

Some Scheme standards also include `do`, a more imperative-looking loop form:

```scheme
(do ((i 0 (+ i 1))
     (acc 0 (+ acc i)))
    ((= i 10) acc))
```

| Loop style              | Best use                       | Strength                         | Cost / risk                                |
| ----------------------- | ------------------------------ | -------------------------------- | ------------------------------------------ |
| Named `let`             | General recursive iteration    | Clear state variables, idiomatic | Requires comfort with recursion            |
| Direct recursion        | Structural recursion over data | Matches recursive structures     | Must understand tail vs non-tail recursion |
| `do`                    | Compact iteration with updates | Familiar to imperative readers   | Syntax is less commonly loved              |
| Higher-order procedures | Mapping, folding, filtering    | Declarative transformation       | May hide allocation or traversal costs     |
| Explicit mutation       | State-heavy loops              | Sometimes efficient              | More aliasing and reasoning burden         |

Named `let` is often the most Scheme-like loop because it makes loop state explicit as parameters.

```scheme
(define (length* xs)
  (let loop ((xs xs)
             (n 0))
    (if (null? xs)
        n
        (loop (cdr xs) (+ n 1)))))
```

**Failure-first explanation:**
The tempting model imported from many languages is: “Recursion is elegant but unsafe for long loops.” In Scheme, proper tail recursion changes this. A tail-recursive loop is a normal iteration technique, not a stack-consuming trick. The correct rule is: use tail recursion or named `let` for iterative processes; use non-tail recursion when the result naturally depends on combining recursive results after return. The boundary changes when debugging, profiling, or implementation-specific stack traces are involved.

**Common Pitfalls:** Do not assume every recursive procedure is tail-recursive. This is tail-recursive:

```scheme
(define (sum xs)
  (let loop ((xs xs)
             (acc 0))
    (if (null? xs)
        acc
        (loop (cdr xs) (+ acc (car xs))))))
```

This is not tail-recursive because `+` must still run after the recursive call returns:

```scheme
(define (sum xs)
  (if (null? xs)
      0
      (+ (car xs) (sum (cdr xs)))))
```

Both can be correct. They express different control and cost profiles.

### Multiple values — `values`, `call-with-values`, receiving multiple results

Scheme has a distinct multiple-value mechanism. Multiple values are not the same as returning a list or vector.

```scheme
(values 1 2)
```

A receiver must be prepared to accept multiple values. One explicit mechanism is `call-with-values`:

```scheme
(call-with-values
  (lambda () (values 1 2))
  (lambda (x y) (+ x y)))
```

This returns `3`.

| Pattern                 | Example                       | Meaning                                   | When to use                                                |
| ----------------------- | ----------------------------- | ----------------------------------------- | ---------------------------------------------------------- |
| Return one value        | `42`                          | Ordinary result                           | Most procedures                                            |
| Return multiple values  | `(values a b)`                | Several results through continuation      | Decomposition, quotient/remainder-like operations          |
| Receive multiple values | `call-with-values`            | Consumer accepts arity of produced values | Explicit multi-result handling                             |
| Return aggregate        | `(list a b)` or vector/record | One compound value                        | When result should be stored, passed, or inspected as data |

The distinction matters. A list of two elements is one value. Two values are two values delivered to a continuation expecting two values.

```scheme
(list 1 2)      ; one value: a list

(values 1 2)    ; two values
```

**Language-design note:** Multiple values connect naturally to continuation semantics. A continuation is not merely “the rest of the computation” in an informal sense; it also has expectations about how many values it receives.

**Common Pitfalls:** Do not use multiple values when a durable data object is needed. Use a record, vector, pair, or list when the result should be stored as one value. Use multiple values when the result is immediately decomposed by the caller.

### Delayed evaluation basics — `delay`, `force`, promises

Some Scheme systems and standards provide delayed evaluation through promises.

```scheme
(define delayed
  (delay (+ 1 2)))

(force delayed)
```

`delay` creates a promise. `force` obtains the value. The exact behavior around memoization and implementation details should be checked against the target standard and implementation, but the conceptual purpose is to defer computation.

| Construct | Meaning                               | Use case             | Pitfall                                |
| --------- | ------------------------------------- | -------------------- | -------------------------------------- |
| `delay`   | Create delayed computation            | Laziness, streams    | Confusing with quoting                 |
| `force`   | Demand delayed value                  | Consume promise      | Forgetting effects may happen later    |
| Promise   | Representation of delayed computation | Lazy data structures | Assuming all Scheme evaluation is lazy |

Scheme is normally eager: procedure operands are evaluated before application. `delay` creates controlled laziness.

**Common Pitfalls:** Do not confuse `delay` with `quote`. Quote produces data without evaluating it. Delay creates a computation that can be forced later. Also do not assume Scheme is generally lazy like Haskell.

### Basic exception and error syntax — `error`, guards, implementation variation

Scheme has error mechanisms, but the exact condition system and exception APIs differ across standards and implementations. At the core reading level, recognize that `error` signals an error, while more advanced handling mechanisms belong in Part 5.

```scheme
(error "invalid input")
```

Some Scheme standards or implementations provide forms such as `guard`, exception handlers, condition objects, or richer condition systems.

| Mechanism          | Role                       | Portability note                                                            | Use                                  |
| ------------------ | -------------------------- | --------------------------------------------------------------------------- | ------------------------------------ |
| `error`            | Signal an error            | Standard availability depends on report details and implementation behavior | Invalid state or failed precondition |
| Predicate checks   | Prevent invalid operations | Portable when using standard predicates                                     | Validate before operation            |
| `guard` / handlers | Catch or handle exceptions | Standard- and implementation-sensitive                                      | Recoverable failure                  |
| Condition objects  | Rich error information     | More developed in R6RS or implementation systems                            | Structured error handling            |

Example of defensive checking:

```scheme
(define (safe-car xs)
  (if (pair? xs)
      (car xs)
      (error "safe-car: expected a pair")))
```

**Language-design note:** Scheme does not have a single dominant error-handling culture equivalent to Rust’s `Result`, Java’s checked exceptions, or Python’s exception ecosystem. Portable code should be careful about what it assumes.

**Common Pitfalls:** Do not build a large error-handling design before choosing the target standard and implementation. Also do not use `error` for ordinary expected absence when `#f`, an option-like representation, or a clear result protocol would be better.

### Imports and libraries — `import`, `define-library`, implementation modules

At the syntax-recognition level, imports bring bindings into scope and libraries define module boundaries.

A simplified R7RS-style library shape is:

```scheme
(define-library (example math)
  (export square)
  (import (scheme base))
  (begin
    (define (square x)
      (* x x))))
```

A program or library may import bindings:

```scheme
(import (scheme base))
```

The details vary substantially across Scheme standards and implementations.

| Construct                   | Meaning                               | Layer                                           | Practical consequence         |
| --------------------------- | ------------------------------------- | ----------------------------------------------- | ----------------------------- |
| `import`                    | Bring library bindings into scope     | Module/library layer                            | Dependency boundary           |
| `export`                    | Expose selected bindings              | Library declaration                             | Public API boundary           |
| `define-library`            | Define R7RS-style library             | Standard module syntax                          | Useful for portable R7RS code |
| Implementation module forms | Implementation-specific module system | Chez, Guile, Chicken, Racket-like systems, etc. | Powerful but less portable    |

Scheme module syntax is not as universally uniform as JavaScript `import`, Python `import`, or Rust `use`. It must be treated as a portability decision.

**Common Pitfalls:** Do not assume an example using one implementation’s module system is portable Scheme. Also do not put every helper into the public export list. A library boundary is an abstraction boundary.

### Basic macro recognition — `define-syntax`, `syntax-rules`, macro use

Macros are central to Scheme, but Part 2 only needs enough syntax to recognize them. Part 4 and Part 7 will explain macro design and expansion more deeply.

A simple hygienic macro may look like this:

```scheme
(define-syntax when
  (syntax-rules ()
    ((_ test body ...)
     (if test
         (begin body ...)))))
```

This defines a syntax transformer. A use of the macro looks like:

```scheme
(when (> x 0)
  (display x)
  (newline))
```

The macro use is expanded before ordinary runtime evaluation. It is not a procedure call to `when`.

| Macro concept   | Meaning                                | Example                                   | Crucial distinction                               |
| --------------- | -------------------------------------- | ----------------------------------------- | ------------------------------------------------- |
| `define-syntax` | Defines syntactic binding              | `(define-syntax name transformer)`        | Creates expansion-time transformer                |
| `syntax-rules`  | Pattern-based hygienic macro system    | `(syntax-rules (...) ...)`                | Matches syntax patterns                           |
| Macro use       | Form expanded before runtime           | `(when test body ...)`                    | Not ordinary function application                 |
| Hygiene         | Binding safety property                | Introduced names avoid accidental capture | Not textual substitution                          |
| Ellipsis `...`  | Repetition in macro patterns/templates | `body ...`                                | Macro-pattern syntax, not ordinary runtime syntax |

A function cannot implement `when` with the same evaluation behavior because ordinary function arguments are evaluated before the function is called. A macro can expand into an `if` that controls whether the body is evaluated.

**Failure-first explanation:**
The tempting model is: “A macro is just a function that receives unevaluated arguments.” The surprising bug appears when one expects runtime values inside a macro transformer, or expects a function to suppress argument evaluation. The correct explanation is that macros transform syntax before runtime; functions consume values at runtime. The professional rule is: use functions for value abstraction and macros for syntactic abstraction. The boundary changes in advanced macro systems, but the expansion-time/runtime distinction remains.

**Common Pitfalls:** Do not use macros merely to avoid writing higher-order functions. Do not write opaque DSLs before ordinary procedures and data structures have been considered. Do not confuse macro ellipses with runtime variadic arguments.

### Procedure values versus syntax keywords — ordinary calls and special forms

Scheme source often begins with an identifier after `(`, but that identifier may have different kinds of binding.

```scheme
(+ 1 2)
(if test a b)
(lambda (x) x)
(when test body)
```

| First position    | Binding kind                      | Runtime procedure? | Evaluation behavior                                   |
| ----------------- | --------------------------------- | -----------------: | ----------------------------------------------------- |
| `+`               | Variable bound to procedure       |                Yes | Ordinary application                                  |
| `if`              | Special syntax                    |                 No | Evaluates only selected branch                        |
| `lambda`          | Special syntax                    |                 No | Creates procedure without evaluating body immediately |
| `quote`           | Special syntax                    |                 No | Suppresses evaluation                                 |
| `when`            | Macro binding if defined/imported |                 No | Expands before runtime                                |
| User variable `f` | Depends on binding                |              Maybe | Ordinary application if value is procedure            |

The key source-reading question is: **what kind of binding does the first identifier have?**

A Scheme environment contains ordinary value bindings, and the syntactic environment contains syntax bindings. In a simple expression, these distinctions may feel invisible, but macros make them unavoidable.

**Common Pitfalls:** Do not assume that because a form has the shape `(name ...)`, `name` is a procedure. It may be a keyword, a macro, a special form, or an ordinary procedure depending on the binding.

### `apply` — calling a procedure with an argument list

`apply` calls a procedure using arguments supplied partly or wholly as a list.

```scheme
(apply + '(1 2 3 4))
```

This is equivalent to applying `+` to `1`, `2`, `3`, and `4`.

`apply` can also combine fixed arguments with a final list:

```scheme
(apply + 1 2 '(3 4))
```

This applies `+` to `1`, `2`, `3`, and `4`.

| Pattern                    | Meaning                            | Example               |
| -------------------------- | ---------------------------------- | --------------------- |
| All arguments from list    | Apply procedure to list elements   | `(apply f xs)`        |
| Some fixed, rest from list | Append fixed args before list args | `(apply f a b xs)`    |
| Dynamic dispatch           | Procedure chosen at runtime        | `(apply proc args)`   |
| Adapter                    | Bridge list data to procedure call | `(apply max numbers)` |

`apply` is a runtime procedure. It is not macro expansion and not source evaluation. It takes an already existing procedure value and already existing argument values.

**Common Pitfalls:** Do not confuse `apply` with `eval`. `apply` calls a procedure with values. `eval` evaluates an expression in an environment. If a list contains symbols that look like code, `apply` does not evaluate that list as code.

```scheme
(apply + '(1 2 3))      ; good

(apply '(+ 1 2) '())    ; wrong model: first argument is not a procedure
```

### `eval` — evaluating expressions dynamically

Scheme systems may provide `eval`, but its exact environment requirements and portability details are implementation-sensitive. Conceptually, `eval` evaluates an expression in an environment.

A rough conceptual example:

```scheme
(eval '(+ 1 2) some-environment)
```

This is not the same as `apply`.

| Mechanism       | Input                                        | Operation                          | Typical use                                     |
| --------------- | -------------------------------------------- | ---------------------------------- | ----------------------------------------------- |
| Ordinary call   | Procedure expression and operand expressions | Evaluate operands, apply procedure | Normal programming                              |
| `apply`         | Procedure value and argument values          | Call procedure                     | Higher-order adapters                           |
| `eval`          | Expression representation and environment    | Evaluate expression dynamically    | REPLs, interpreters, controlled dynamic systems |
| Macro expansion | Syntax and syntactic environment             | Transform syntax before runtime    | New syntactic forms                             |

Professional Scheme code should usually avoid `eval` unless the problem is truly dynamic evaluation, interpreter construction, plugin-like evaluation, or metaprogramming under controlled conditions.

**Common Pitfalls:** Do not use `eval` to choose a function by name, to avoid passing procedures, or to simulate a dispatch table. Use ordinary data structures, procedure values, association lists, hash tables where available, or macros where syntax abstraction is truly required.

### Top-level mutation and redefinition — REPL convenience versus program discipline

At the REPL, it is common to define and redefine names while exploring:

```scheme
(define x 1)
(define x 2)
```

Different implementations may handle top-level redefinition in permissive ways. This is useful for interactive development but should not be mistaken for a clean program design model.

| Context                  | Redefinition behavior                       | Professional interpretation                  |
| ------------------------ | ------------------------------------------- | -------------------------------------------- |
| REPL                     | Often permissive                            | Exploration and experimentation              |
| Script/top-level program | Implementation-dependent details may matter | Avoid accidental redefinition                |
| Library/module           | Exported bindings form API boundary         | Redefinition should be controlled or avoided |
| Macro definitions        | Expansion-time effects matter               | Redefinition can be especially confusing     |

**Language-design note:** Scheme’s REPL-centered culture encourages experimentation, but serious code should be organized around stable bindings, clear modules, tests, and explicit dependencies.

**Common Pitfalls:** Do not rely on interactive redefinition as a substitute for program structure. Do not design libraries that require users to mutate internal top-level variables unless that is an explicit configuration mechanism.

### Primitive data predicates — recognizing value categories

Scheme uses predicates heavily because the core language is dynamically typed. Predicates conventionally end in `?`.

| Predicate    | Tests for     | Example            |
| ------------ | ------------- | ------------------ |
| `boolean?`   | Boolean value | `(boolean? #f)`    |
| `number?`    | Number        | `(number? 10)`     |
| `integer?`   | Integer       | `(integer? 10)`    |
| `char?`      | Character     | `(char? #\a)`      |
| `string?`    | String        | `(string? "x")`    |
| `symbol?`    | Symbol        | `(symbol? 'x)`     |
| `pair?`      | Pair          | `(pair? '(a . b))` |
| `null?`      | Empty list    | `(null? '())`      |
| `list?`      | Proper list   | `(list? '(1 2 3))` |
| `vector?`    | Vector        | `(vector? #(1 2))` |
| `procedure?` | Procedure     | `(procedure? +)`   |

Predicates are central to safe dynamic programming. They let code establish runtime facts before applying operations.

```scheme
(define (first xs)
  (if (pair? xs)
      (car xs)
      (error "first: expected non-empty list")))
```

**Common Pitfalls:** Do not use `pair?` when the empty list should be accepted. Do not use `list?` when an improper list is acceptable. Do not assume a predicate refines a static type, as it might in TypeScript or ML-like pattern matching; Scheme has runtime checks, not core static narrowing.

### Basic constructors and selectors — `cons`, `car`, `cdr`, `list`, `vector`

Scheme’s core data constructors and selectors are compact but semantically important.

| Operation     | Meaning                  | Example               | Pitfall                                   |
| ------------- | ------------------------ | --------------------- | ----------------------------------------- |
| `cons`        | Create pair              | `(cons 'a 'b)`        | Result may not be a proper list           |
| `car`         | First field of pair      | `(car '(a b))`        | Error on empty list                       |
| `cdr`         | Second field of pair     | `(cdr '(a b))`        | May return non-list for dotted pairs      |
| `list`        | Create proper list       | `(list 1 2 3)`        | Allocates linked pairs                    |
| `vector`      | Create vector            | `(vector 1 2 3)`      | Different cost model from list            |
| `make-vector` | Create vector of size    | `(make-vector 3 0)`   | Mutable contents where supported          |
| `string`      | Create string from chars | `(string #\a #\b)`    | Characters, not strings                   |
| `make-string` | Create string of length  | `(make-string 3 #\x)` | Mutability and literal distinction matter |

Example:

```scheme
(define point (cons 3 4))

(car point)
(cdr point)
```

This can represent a pair, but a record would often be clearer for domain data. Part 3 will address modeling choices.

**Common Pitfalls:** Do not build domain objects out of raw nested `cons` cells unless the representation is conventional, local, or deliberately symbolic. Raw pair structure is compact but often unreadable.

### Mutating compound data — `set-car!`, `set-cdr!`, vector and string mutation

Some Scheme systems and standards expose mutation of compound data structures. The exact availability and mutability of pairs or literals may differ across standards and implementations, so portable code must be cautious.

| Mutation operation | Meaning                                     | Risk                                    |
| ------------------ | ------------------------------------------- | --------------------------------------- |
| `set!`             | Rebind variable to new value                | Changes binding                         |
| `set-car!`         | Mutate first field of pair where available  | Shared list structure can be corrupted  |
| `set-cdr!`         | Mutate second field of pair where available | Can create cycles or improper lists     |
| `vector-set!`      | Mutate vector element                       | Aliasing through shared vector          |
| `string-set!`      | Mutate string element where available       | Literal mutability and text assumptions |

Example:

```scheme
(define xs (list 1 2 3))
(define ys xs)

(set-car! xs 99)

ys
```

If mutable pairs are available and `set-car!` succeeds, `ys` observes the change because `xs` and `ys` refer to the same pair structure.

**Failure-first explanation:**
The tempting model is: “I changed `xs`, so only `xs` changed.” The surprising behavior is that `ys` also appears changed. The correct explanation is aliasing: two bindings can refer to the same mutable object. The professional rule is: use mutation only when shared identity is part of the design, and isolate it behind a clear boundary. The boundary changes when working with immutable data structures, but allocation and copying costs then become relevant.

**Common Pitfalls:** Do not mutate quoted literals. Do not mutate list structure that may be shared unless sharing is intentional. Do not use pair mutation as a default update mechanism; functional reconstruction is often clearer.

### Derived syntax — recognizing surface convenience over core ideas

Scheme has forms that are conceptually derived from more primitive ideas. The exact standard treatment varies, but as a reader, it helps to recognize that many constructs are syntactic conveniences.

| Derived form      | Core idea underneath                  | Why it exists                 |
| ----------------- | ------------------------------------- | ----------------------------- |
| `let`             | Lambda application-like local binding | More readable local variables |
| `let*`            | Nested sequential bindings            | Stepwise dependency           |
| `letrec`          | Recursive local environment           | Local recursion               |
| `cond`            | Nested conditionals                   | Multi-way branching           |
| `case`            | Dispatch over datums                  | Symbolic branching            |
| `and` / `or`      | Conditional short-circuiting          | Guard and fallback patterns   |
| `when` / `unless` | Conditional sequencing                | Side-effecting guard bodies   |
| Named `let`       | Local recursive procedure             | Loop idiom                    |

For example, simple `let` resembles applying a lambda:

```scheme
(let ((x 1)
      (y 2))
  (+ x y))
```

Conceptually resembles:

```scheme
((lambda (x y)
   (+ x y))
 1
 2)
```

This equivalence is useful as intuition, though standards and macro expansion details should not be casually reduced to this explanation in every case.

**Common Pitfalls:** Do not assume every derived form is merely cosmetic. Some derived forms encode important evaluation, binding, or recursion behavior. `letrec`, `and`, `or`, and macros especially require semantic care.

### Reading errors from syntax — common malformed forms

Many Scheme errors come from malformed forms or mistaken layer assumptions.

| Mistake                           | Example                       | Why it fails                                         | Correct direction                                    |
| --------------------------------- | ----------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| Calling a number                  | `(1 2 3)`                     | Operator position evaluates to number, not procedure | Use a procedure in operator position                 |
| Forgetting to quote symbol data   | `(list red blue)`             | Looks up variables `red` and `blue`                  | Use `'(red blue)` or `(list 'red 'blue)`             |
| Treating quoted call as execution | `'(+ 1 2)`                    | Produces data, does not call `+`                     | Remove quote for execution                           |
| Using `car` on empty list         | `(car '())`                   | Empty list is not a pair                             | Check with `pair?` first                             |
| Using `eq?` on strings            | `(eq? "a" "a")`               | Identity not structural string equality              | Use `string=?`                                       |
| Expecting `let` sequential scope  | `(let ((x 1) (y (+ x 1))) y)` | `y` initializer does not see new `x`                 | Use `let*`                                           |
| Using function for syntax control | `(my-if test a b)`            | Function arguments evaluate before call              | Use macro or existing conditional                    |
| Confusing `apply` and `eval`      | `(apply '(+ 1 2) '())`        | First argument must be procedure                     | Use `eval` only for controlled expression evaluation |

**Professional rule:** When a Scheme form fails, classify the failure before debugging: reader problem, malformed datum, unbound identifier, wrong binding kind, wrong arity, wrong runtime type, wrong evaluation layer, or implementation-specific unsupported feature.

### Minimal syntax recognition index — core forms and meanings

This index is not a complete reference. It is a high-frequency recognition map for reading Scheme source.

| Form                                   | Category                     | Meaning                                  | First question to ask                         |
| -------------------------------------- | ---------------------------- | ---------------------------------------- | --------------------------------------------- |
| `x`                                    | Variable reference           | Look up binding                          | Where is `x` bound?                           |
| `'x`                                   | Quoted datum                 | Produce symbol                           | Is this data or code-like data?               |
| `` `(...) ``                           | Quasiquote                   | Construct template data                  | What is unquoted?                             |
| `,x`                                   | Unquote                      | Insert evaluated value inside quasiquote | What expression is evaluated?                 |
| `,@x`                                  | Splicing unquote             | Insert list elements                     | Is the value a list?                          |
| `(define x e)`                         | Definition                   | Bind name                                | What context defines it?                      |
| `(define (f x) body ...)`              | Procedure definition         | Bind name to procedure                   | What arity and closure context?               |
| `(lambda formals body ...)`            | Procedure creation           | Create procedure                         | What variables are captured?                  |
| `(if t c a)`                           | Conditional                  | Branch by test                           | Are branches evaluated selectively?           |
| `(cond clause ...)`                    | Multi-branch conditional     | First true clause wins                   | What is the fallback?                         |
| `(case key clause ...)`                | Datum dispatch               | Compare key to alternatives              | What equality notion applies?                 |
| `(and e ...)`                          | Short-circuit conjunction    | First false or last value                | Are effects hidden?                           |
| `(or e ...)`                           | Short-circuit disjunction    | First true value or false                | Is `#f` overloaded as absence?                |
| `(let bindings body ...)`              | Parallel local binding       | Local environment                        | Are initializers independent?                 |
| `(let* bindings body ...)`             | Sequential local binding     | Stepwise environment                     | Is dependency intended?                       |
| `(letrec bindings body ...)`           | Recursive local binding      | Mutual recursion                         | Are initializers safe?                        |
| `(let name bindings body ...)`         | Named let                    | Local recursive loop                     | Is recursive call in tail position?           |
| `(set! x e)`                           | Assignment                   | Change existing binding                  | Is mutation necessary?                        |
| `(begin e ...)`                        | Sequencing                   | Evaluate in order                        | Which expression is returned?                 |
| `(quote datum)`                        | Quotation                    | Suppress evaluation                      | Is the datum later interpreted?               |
| `(apply f xs)`                         | Procedure application helper | Call procedure with argument list        | Is `f` already a procedure?                   |
| `(values e ...)`                       | Multiple values              | Return multiple results                  | Does caller expect that arity?                |
| `(call-with-values producer consumer)` | Multiple-value receiver      | Connect producer and consumer            | Are producer and consumer arities compatible? |
| `(define-syntax name transformer)`     | Macro definition             | Define syntax transformer                | Is this expansion-time code?                  |
| `(syntax-rules literals rules ...)`    | Macro system                 | Pattern-based syntax transformation      | What pattern matches?                         |
| `(import library ...)`                 | Module import                | Bring bindings into scope                | Which standard or implementation?             |
| `(define-library name ...)`            | Library definition           | Define module/library                    | Is this R7RS or implementation-specific?      |

### Source-reading workflow — how to read a Scheme form professionally

A professional reading process for Scheme is deliberately layered.

| Step                      | Question                                                                       | Why it matters                                  |
| ------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------- |
| Identify the outer form   | Is it a literal, identifier, special form, macro use, or ordinary application? | Prevents treating all lists as calls            |
| Check binding kind        | Is the leading identifier syntax or value?                                     | Separates macros/special forms from procedures  |
| Determine evaluation rule | Which subforms are evaluated, and when?                                        | Explains control flow and laziness/strictness   |
| Locate lexical bindings   | Where are identifiers introduced?                                              | Explains closures and scope                     |
| Classify data structures  | Pair, proper list, vector, string, symbol, record?                             | Prevents wrong selectors or equality predicates |
| Check mutation            | Are bindings or objects being changed?                                         | Exposes aliasing and state                      |
| Check portability         | Standard, SRFI, or implementation-specific?                                    | Prevents false portability                      |
| Check cost                | Does this allocate, traverse, or force exact arithmetic?                       | Prevents hidden performance problems            |

Apply it to:

```scheme
(let loop ((xs items)
           (acc '()))
  (if (null? xs)
      (reverse acc)
      (loop (cdr xs)
            (cons (process (car xs)) acc))))
```

The outer form is named `let`, so it introduces a local recursive loop. `xs` and `acc` are loop state. The `if` selects between termination and recursion. The recursive `loop` call is in tail position. `cons` allocates a new pair. `reverse` repairs the order because accumulating with `cons` builds the list backwards. `process` is an ordinary procedure call unless bound otherwise. The code assumes `items` is a proper list.

This is the level of reading Part 2 aims to support.
### Tail position basics — final expressions, recursive calls, proper tail recursion

Tail position is not just a performance detail in Scheme. It is a semantic reading skill. A form is in **tail position** when its value will be returned directly as the value of the surrounding procedure or body, with no remaining computation afterward.

In this procedure, the recursive call is in tail position:

```scheme
(define (count xs n)
  (if (null? xs)
      n
      (count (cdr xs) (+ n 1))))
```

In this procedure, the recursive call is not in tail position:

```scheme
(define (count xs)
  (if (null? xs)
      0
      (+ 1 (count (cdr xs)))))
```

The second version still has to add `1` after the recursive call returns. That means the caller must remember pending work.

| Context                                      | Tail position? | Example                              | Why                              |
| -------------------------------------------- | -------------: | ------------------------------------ | -------------------------------- |
| Last expression in procedure body            |            Yes | `(define (f x) (+ x 1))`             | Procedure returns that value     |
| Consequent/alternative of tail-position `if` |            Yes | `(if test a b)` inside tail position | Selected branch returns directly |
| Last expression in `begin` in tail position  |            Yes | `(begin e1 e2)` where `e2` is last   | Earlier expressions are effects  |
| Operator of a call                           |             No | `((f x) y)`                          | Result must still be applied     |
| Operand of a call                            |             No | `(+ 1 (f x))`                        | Call to `+` remains              |
| Test of `if`                                 |             No | `(if (p x) a b)`                     | Branch selection remains         |
| Recursive call under constructor             |             No | `(cons x (loop xs))`                 | `cons` remains after recursion   |

Tail position matters because Scheme requires **proper tail recursion**. A tail call must not consume unbounded stack merely because it is written as a call. This is why named `let` can serve as an ordinary loop.

```scheme
(define (reverse* xs)
  (let loop ((xs xs)
             (acc '()))
    (if (null? xs)
        acc
        (loop (cdr xs)
              (cons (car xs) acc)))))
```

The recursive call to `loop` is in tail position. The growing result is stored in `acc`, not in pending stack frames.

**Common Pitfalls:** Do not classify a procedure as tail-recursive merely because the recursive call appears “near the end.” Tail position is semantic, not visual. If another procedure still has to consume the recursive result, the call is not in tail position.

### Continuation recognition — `call/cc`, escape, advanced control

Continuations are one of Scheme’s most distinctive features, but Part 2 only needs enough syntax and reading orientation to prevent confusion. Full semantic treatment belongs in Part 7.

The canonical name is usually:

```scheme
call-with-current-continuation
```

A common abbreviation is:

```scheme
call/cc
```

A simple escape-style example:

```scheme
(call/cc
  (lambda (exit)
    (for-each
      (lambda (x)
        (if (negative? x)
            (exit 'found-negative)
            #f))
      xs)
    'all-non-negative))
```

The procedure passed to `call/cc` receives a procedure-like value representing the current continuation. Calling `exit` abandons the current path and returns to the captured continuation with the supplied value.

| Item                             | Meaning                             | Source-reading cue                   | Practical caution                              |
| -------------------------------- | ----------------------------------- | ------------------------------------ | ---------------------------------------------- |
| `call-with-current-continuation` | Captures current continuation       | Long standard name                   | Powerful and hard to reason about              |
| `call/cc`                        | Common abbreviation                 | Same conceptual feature              | May be implementation/import dependent         |
| Escape continuation              | Used to leave a computation early   | Names like `exit`, `return`, `abort` | Often replaceable by clearer control structure |
| Reentrant continuation           | Continuation invoked more than once | Advanced control behavior            | Can make state and resource behavior difficult |
| Delimited continuation           | Captures limited dynamic extent     | Implementation/Racket-like feature   | Not portable core Scheme                       |

**Language-design note:** A continuation represents “what to do with the result” of an expression. Scheme makes this concept available as a first-class control mechanism. This is theoretically elegant but practically dangerous when used casually.

**Common Pitfalls:** Do not treat `call/cc` as a normal exception mechanism, a loop construct, or a replacement for clear data flow. It is a control abstraction tool. In ordinary code, `cond`, recursion, named `let`, higher-order functions, and explicit error handling are usually more readable.

### Body structure — definitions before expressions, local helpers, body value

Many Scheme forms contain a **body**: a sequence of definitions and expressions. Procedure bodies, `let` bodies, library bodies, and macro-generated bodies all rely on this idea.

```scheme
(define (hypotenuse x y)
  (define (square z)
    (* z z))
  (sqrt (+ (square x) (square y))))
```

The local definition of `square` is available inside the body. The last expression supplies the return value.

| Body component                     | Example               | Meaning                                    | Reading rule                            |
| ---------------------------------- | --------------------- | ------------------------------------------ | --------------------------------------- |
| Internal definition                | `(define helper ...)` | Local binding                              | Usually appears before body expressions |
| Expression before final expression | `(display x)`         | Evaluated for effect or intermediate value | Result usually ignored                  |
| Final expression                   | `(+ x y)`             | Body result                                | Returned value                          |
| Macro-generated body               | Produced by expansion | May introduce definitions/expressions      | Must respect body-context rules         |

A body is not merely a block in the C-family sense. It is an expression context with lexical bindings and a final value.

```scheme
(define (f x)
  (display x)
  (newline)
  (+ x 1))
```

This procedure returns `(+ x 1)`, not the result of `newline`.

**Common Pitfalls:** Do not place definitions and expressions in arbitrary order unless the target standard and implementation clearly allow the intended behavior. Also avoid long bodies with many local definitions when smaller helper procedures or modules would communicate structure better.

### Standard keywords and derived forms — recognizing non-procedure names

Scheme has syntactic keywords. These are not ordinary variables bound to procedures. A source reader must recognize at least the high-frequency ones.

| Keyword / form     | Category                  | Core role                   |                      Ordinary procedure? |
| ------------------ | ------------------------- | --------------------------- | ---------------------------------------: |
| `quote`            | Special syntax            | Suppress evaluation         |                                       No |
| `lambda`           | Special syntax            | Create procedure            |                                       No |
| `if`               | Special syntax            | Conditional selection       |                                       No |
| `set!`             | Special syntax            | Assignment to binding       |                                       No |
| `define`           | Definition syntax         | Create binding              |                                       No |
| `define-syntax`    | Syntax definition         | Create macro binding        |                                       No |
| `let`              | Derived binding syntax    | Local bindings              |                                       No |
| `let*`             | Derived binding syntax    | Sequential local bindings   |                                       No |
| `letrec`           | Derived binding syntax    | Recursive local bindings    |                                       No |
| `begin`            | Sequencing syntax         | Ordered body                |                                       No |
| `cond`             | Derived conditional       | Multi-way branch            |                                       No |
| `case`             | Derived conditional       | Datum dispatch              |                                       No |
| `and`              | Derived conditional       | Short-circuit conjunction   |                                       No |
| `or`               | Derived conditional       | Short-circuit disjunction   |                                       No |
| `delay`            | Delayed evaluation syntax | Create promise              | No or syntax-level depending on standard |
| `quasiquote`       | Datum template syntax     | Template construction       |                                       No |
| `unquote`          | Quasiquote component      | Insert evaluated value      |                                       No |
| `unquote-splicing` | Quasiquote component      | Splice evaluated list       |                                       No |
| `syntax-rules`     | Macro pattern system      | Define hygienic transformer |                                       No |
| `import`           | Library/import syntax     | Bring bindings into scope   |                                       No |
| `define-library`   | Library syntax            | Define module/library       |                                       No |

The exact set depends on standard and implementation. This table is a source-reading map, not a claim that every Scheme implementation exposes every item in exactly the same way.

**Professional rule:** When reading `(name ...)`, do not ask first “what function is being called?” Ask first: **is `name` a syntactic keyword, a macro binding, or a value binding?**

**Common Pitfalls:** Shadowing or redefining names that look like core procedures may be legal in some contexts, but shadowing syntactic keywords is a different matter and often constrained by the language’s syntactic environment. Do not assume value namespaces and syntax namespaces behave like Common Lisp, Racket, or JavaScript without checking the target Scheme.

### Application versus special syntax — why functions cannot replace all forms

A central Scheme lesson is that ordinary procedure calls evaluate their operands before the procedure is invoked. Therefore, some constructs cannot be implemented as ordinary procedures.

A broken `if`-as-function intuition:

```scheme
(define (my-if test consequent alternative)
  (if test consequent alternative))
```

This seems plausible until the arguments have effects or nontermination:

```scheme
(my-if #t
       1
       (/ 1 0))
```

In an ordinary procedure call, the alternative argument is evaluated before `my-if` receives it. That means the division by zero happens even though the test is true.

A macro can control evaluation by expanding into real `if` syntax:

```scheme
(define-syntax my-when
  (syntax-rules ()
    ((_ test body ...)
     (if test
         (begin body ...)))))
```

| Abstraction need                      | Function works? | Macro/special syntax needed? | Reason                                   |
| ------------------------------------- | --------------: | ---------------------------: | ---------------------------------------- |
| Compute with already evaluated values |             Yes |                           No | Ordinary procedure application is enough |
| Delay evaluation of selected operands |              No |                          Yes | Function arguments evaluate too early    |
| Introduce new binding syntax          |              No |                          Yes | Binding structure is syntax-level        |
| Define a new control form             |      Usually no |                          Yes | Control forms govern evaluation          |
| Abstract repeated value computation   |             Yes |                           No | Higher-order procedures often suffice    |
| Build DSL syntax                      |       Sometimes |                    Often yes | Syntax may need custom structure         |

**Language-design note:** Macros are not “more powerful functions.” They solve a different problem: abstraction over syntax and evaluation rules. Good Scheme style uses procedures when value abstraction is enough and macros when syntax abstraction is necessary.

**Common Pitfalls:** Do not create a macro merely to avoid passing a lambda. Conversely, do not try to force functions to express binding forms or control constructs that require syntax-level control.

### Identifier conventions — predicates, mutation, conversion, constructors

Scheme’s naming style carries information. These are conventions, not hard type-system rules.

| Convention                      | Example                           | Meaning                                    | Professional reading cue                     |
| ------------------------------- | --------------------------------- | ------------------------------------------ | -------------------------------------------- |
| `?` suffix                      | `pair?`, `number?`, `zero?`       | Predicate                                  | Expected to return boolean-like result       |
| `!` suffix                      | `set!`, `vector-set!`, `set-car!` | Mutation or dangerous update               | Look for aliasing and state change           |
| `->` infix                      | `list->vector`, `string->symbol`  | Conversion                                 | Check allocation and failure behavior        |
| `make-` prefix                  | `make-vector`, `make-string`      | Constructor/allocation                     | New object likely allocated                  |
| `call-with-` prefix             | `call-with-input-file`            | Controlled resource or dynamic extent      | Procedure argument receives resource/context |
| `with-` or `parameterize` style | implementation-dependent          | Dynamic context or scoped setup            | Check implementation semantics               |
| `*` suffix or infix             | implementation/library convention | Variant, internal helper, or extended form | Meaning not universal                        |

Examples:

```scheme
(number? x)

(vector-set! v i value)

(list->vector xs)

(make-vector 10 0)
```

**Common Pitfalls:** Do not treat naming conventions as guarantees. A badly named user-defined procedure can violate convention. In code review, such violations matter because Scheme relies heavily on readable convention.

### Empty list, false, and absence — three different ideas

Scheme readers often collapse three ideas: empty collection, boolean false, and missing value. Scheme keeps them distinct unless a procedure deliberately uses `#f` as an absence marker.

| Concept       | Scheme value                                |        Conditional status | Typical use                      |
| ------------- | ------------------------------------------- | ------------------------: | -------------------------------- |
| Boolean false | `#f`                                        |                     false | Failed predicate, explicit false |
| Empty list    | `'()`                                       |                      true | Empty sequence/list              |
| Missing value | Often `#f`, sometimes custom representation | depends on representation | Search failure, optional result  |
| Empty string  | `""`                                        |                      true | Text value with no characters    |
| Zero          | `0`                                         |                      true | Number                           |

Example:

```scheme
(if '()
    'true
    'false)
```

This evaluates to `'true`.

When a procedure uses `#f` as a failure marker, the caller must remember that all non-`#f` values count as success:

```scheme
(define result (assoc 'key alist))

(if result
    (cdr result)
    'not-found)
```

Here the result is not necessarily `#t`; it may be a pair. The conditional treats it as true.

**Common Pitfalls:** Do not use `null?` to test falsehood. Do not use boolean checks when a domain-specific absence representation would be clearer. If `#f` is a valid domain value, it cannot also safely represent absence without an additional wrapper or convention.

### Association lists — syntax recognition and pair-based lookup

Association lists, often called **alists**, are common in Scheme. They are lists of pairs.

```scheme
(define colors
  '((red . "#ff0000")
    (green . "#00ff00")
    (blue . "#0000ff")))
```

A lookup may use procedures such as `assoc` where available:

```scheme
(assoc 'red colors)
```

The returned value is commonly either the matching pair or `#f`.

| Structure        | Example                     | Meaning                          | Pitfall                       |
| ---------------- | --------------------------- | -------------------------------- | ----------------------------- |
| Pair             | `(red . "#ff0000")`         | Key-value pair                   | Not a two-element proper list |
| Association list | `((red . "...") ...)`       | List of key-value pairs          | Linear lookup                 |
| Lookup result    | `(red . "#ff0000")` or `#f` | Pair or failure                  | Must handle `#f`              |
| Key equality     | depends on procedure        | `assq`, `assv`, `assoc` variants | Equality choice matters       |

Alists are useful for small maps, symbolic environments, interpreter examples, and simple configuration-like data. They are not always appropriate for large or performance-critical maps.

**Common Pitfalls:** Do not confuse `'(a . b)` with `'(a b)`. They print similarly to new readers but represent different structures. Also do not use alists as a universal substitute for records, hash tables, or modules.

### Procedure composition patterns — reading `map`, `for-each`, folds

Although the detailed standard-library reference belongs in Part 6, some higher-order procedures are so central that a source reader should recognize them early.

| Procedure pattern                | Typical procedure                            | Meaning                            | Result orientation        |
| -------------------------------- | -------------------------------------------- | ---------------------------------- | ------------------------- |
| Transform each element           | `map`                                        | Apply procedure to each element    | Produces new list         |
| Perform effects for each element | `for-each`                                   | Apply procedure for side effects   | Result not primary        |
| Accumulate                       | `fold` variants, often SRFI/library-specific | Combine sequence into one value    | Depends on fold direction |
| Filter                           | implementation/SRFI-specific                 | Keep elements satisfying predicate | Produces subset           |
| Apply to dynamic argument list   | `apply`                                      | Call procedure with list of args   | Procedure result          |

Example:

```scheme
(map (lambda (x) (* x x))
     '(1 2 3))
```

This produces a new list of squared values.

```scheme
(for-each
  (lambda (x)
    (display x)
    (newline))
  '(1 2 3))
```

This is for effects.

**Language-design note:** Higher-order procedures reflect Scheme’s first-class procedure model. They are not merely library conveniences; they express the idea that behavior can be passed as data.

**Common Pitfalls:** Do not use `map` for side effects when `for-each` communicates intent better. Do not assume every useful sequence operation is in the small standard baseline; SRFIs and implementations matter.

### Reader abbreviations — quote-family syntax as expanded forms

Scheme has reader abbreviations that rewrite compact prefixes into longer forms.

| Abbreviation | Long form              | Meaning                   |
| ------------ | ---------------------- | ------------------------- |
| `'x`         | `(quote x)`            | Quotation                 |
| `` `x ``     | `(quasiquote x)`       | Quasiquotation            |
| `,x`         | `(unquote x)`          | Unquote inside quasiquote |
| `,@x`        | `(unquote-splicing x)` | Splice inside quasiquote  |

Example:

```scheme
`(a ,(+ 1 2) ,@(list 4 5))
```

Conceptually corresponds to a quasiquote form with unquoted holes. It constructs structured data:

```scheme
'(a 3 4 5)
```

Nested quasiquote can become difficult:

```scheme
`(outer `(inner ,x))
```

Nested levels change which comma belongs to which quasiquote level. This is useful but easy to misread.

**Common Pitfalls:** Do not use heavy nested quasiquote without need. In macros, prefer clearer macro systems and small templates. In ordinary data construction, consider explicit `list`, `cons`, and helper procedures when quasiquote becomes unreadable.

### Reader datum versus macro syntax object — why “code as data” is incomplete

Scheme’s Lisp heritage makes it tempting to say “code is data.” That is partly useful and partly misleading.

A quoted form is runtime data:

```scheme
'(+ x 1)
```

It is a list containing the symbol `+`, the symbol `x`, and the number `1`.

A macro pattern, however, is not merely a runtime list being processed during normal execution:

```scheme
(define-syntax increment
  (syntax-rules ()
    ((_ x)
     (set! x (+ x 1)))))
```

This operates at expansion time. The macro receives syntactic structure governed by the macro system. In hygienic macro systems, identifiers carry binding information that ordinary runtime symbols do not carry.

| Layer                     | Example                   | Carries lexical binding information? |                       Runtime value? |
| ------------------------- | ------------------------- | -----------------------------------: | -----------------------------------: |
| Symbol datum              | `'x`                      | No ordinary lexical binding metadata |                                  Yes |
| List datum                | `'(+ x 1)`                | No ordinary lexical binding metadata |                                  Yes |
| Syntax pattern            | `(_ x)` in `syntax-rules` |       Yes, through syntactic context |                       Expansion-time |
| Runtime expression result | `(+ 1 2)`                 |                    Result value only |                                  Yes |
| Macro-expanded form       | Generated syntax          |       Yes, according to macro system | Becomes runtime code after expansion |

**Interdisciplinary Lens: Macro-system theory**
**What it clarifies:** Macros manipulate syntax, not ordinary already-evaluated runtime values.
**Language feature involved:** `define-syntax`, `syntax-rules`, hygiene, expansion.
**Practical consequence:** Macros can introduce control forms and binding constructs safely when designed well.
**Limit of the lens:** Macro theory does not replace ordinary API design; many abstractions should be procedures or data structures.

**Common Pitfalls:** Do not use ordinary list procedures as the mental model for all macro behavior. That model is useful for old-style or simplified macro explanations, but hygienic macro systems are more structured.

### Literal data and mutation — quoted constants, object identity, safety

Quoted data can contain compound structures:

```scheme
(define xs '(1 2 3))
```

A crucial portability and safety rule is: **do not mutate literal data**. Even where an implementation permits some mutation, mutating quoted constants can produce non-portable or surprising behavior.

Bad pattern:

```scheme
(define xs '(1 2 3))

(set-car! xs 99)
```

Better pattern when mutation is intended:

```scheme
(define xs (list 1 2 3))
```

Even then, mutation should be deliberate and isolated.

| Data source                   | Mutation expectation                               | Safer reading         |
| ----------------------------- | -------------------------------------------------- | --------------------- |
| Quoted literal                | Treat as immutable                                 | Constant data         |
| Constructed with `list`       | May be mutable depending on implementation support | Fresh list allocation |
| Constructed with `vector`     | Mutable vector in many Schemes                     | Explicit aggregate    |
| String literal                | Do not mutate casually                             | Constant text         |
| `make-string` / `make-vector` | Intended fresh mutable object                      | Controlled mutation   |

**Common Pitfalls:** Do not infer from printed representation that two data structures are safely independent or mutable. Quoted constants and implementation optimizations can invalidate casual mutation assumptions.

### Equality and literal constants — why identity assumptions fail

Equality mistakes often interact with literal data.

```scheme
(eq? '(1 2) '(1 2))
```

This is not a portable structural equality test. Even if an implementation returns a particular result, that is not the right predicate for comparing list contents.

Use:

```scheme
(equal? '(1 2) '(1 2))
```

For symbols, identity-like comparison is usually appropriate:

```scheme
(eq? 'ok 'ok)
```

For numbers:

```scheme
(= 100 (+ 50 50))
```

For strings:

```scheme
(string=? "ok" "ok")
```

| Data kind            | Usually appropriate equality            | Why                       |
| -------------------- | --------------------------------------- | ------------------------- |
| Symbols used as tags | `eq?` or `eqv?` depending on convention | Symbol identity is stable |
| Numbers              | `=`                                     | Numeric equality          |
| Strings              | `string=?`                              | Textual content           |
| Characters           | `char=?`                                | Character equality        |
| Lists/trees          | `equal?`                                | Structural comparison     |
| Vectors              | `equal?` where supported as intended    | Structural comparison     |
| Records/objects      | depends on representation               | May need custom predicate |

**Common Pitfalls:** Do not choose equality based on how values print. Choose equality based on the semantic question: identity, numeric equality, character equality, string equality, or structural equality.

### Arity, rest parameters, and argument-list shape — fixed, variadic, mixed

Scheme procedures can have fixed or variable arity.

Fixed arity:

```scheme
(define (distance x y)
  (sqrt (+ (* x x) (* y y))))
```

Rest-only variadic procedure:

```scheme
(define (collect . xs)
  xs)
```

Mixed fixed and rest:

```scheme
(define (log level . messages)
  (display level)
  (display ": ")
  (for-each display messages)
  (newline))
```

Equivalent lambda forms:

```scheme
(lambda (x y) body ...)

(lambda xs body ...)

(lambda (x y . rest) body ...)
```

| Formal list    | Accepts               | Example call  | Binding result                    |
| -------------- | --------------------- | ------------- | --------------------------------- |
| `(x y)`        | exactly two arguments | `(f 1 2)`     | `x = 1`, `y = 2`                  |
| `xs`           | any number            | `(f 1 2 3)`   | `xs = '(1 2 3)`                   |
| `(x . rest)`   | at least one          | `(f 1 2 3)`   | `x = 1`, `rest = '(2 3)`          |
| `(x y . rest)` | at least two          | `(f 1 2 3 4)` | `x = 1`, `y = 2`, `rest = '(3 4)` |

**Common Pitfalls:** Do not confuse rest parameters with multiple values. A rest parameter captures multiple arguments into one list. Multiple values deliver several values to a continuation. They are different mechanisms.

### Evaluation order caution — operands and side effects

At the source-reading level, ordinary application evaluates operator and operands before application. But the precise order in which operands are evaluated is a standard-level issue that must be checked carefully. Portable code should not depend on operand evaluation order unless the form specifies it.

Problematic style:

```scheme
(f (set! x (+ x 1))
   (set! x (* x 2)))
```

This code relies on the order of side effects among operands. That is bad Scheme style.

Use explicit sequencing:

```scheme
(begin
  (set! x (+ x 1))
  (set! x (* x 2))
  (f x x))
```

Or better, use local bindings when values rather than mutation are intended:

```scheme
(let* ((x1 (+ x 1))
       (x2 (* x1 2)))
  (f x1 x2))
```

| Form                    | Evaluation order intent                       | Portable reading                                  |
| ----------------------- | --------------------------------------------- | ------------------------------------------------- |
| `begin`                 | Explicit sequence                             | Use for ordered effects                           |
| `let*`                  | Sequential binding                            | Use for dependent computations                    |
| `and` / `or`            | Left-to-right short-circuit                   | Useful for guards                                 |
| `if`                    | Test, then selected branch                    | Only one branch evaluated                         |
| Ordinary procedure call | Arguments evaluated before call               | Do not rely casually on operand side-effect order |
| `for-each`              | Used for ordered effects, details by standard | Prefer for side-effect traversal where specified  |

**Common Pitfalls:** Do not hide multiple state changes inside arguments to an ordinary call. If order matters, write order explicitly. If order does not matter, avoid effects that make it appear to matter.

### Primitive syntactic categories — a compact grammar intuition

A full formal grammar is not needed here, but a source reader benefits from a compact syntax intuition.

| Category           | Informal shape                     | Example                  |
| ------------------ | ---------------------------------- | ------------------------ |
| Literal expression | self-evaluating datum              | `42`, `"x"`, `#t`        |
| Variable reference | identifier                         | `x`                      |
| Quotation          | quote form or abbreviation         | `'x`, `(quote x)`        |
| Conditional        | special conditional form           | `(if t a b)`             |
| Procedure creation | lambda form                        | `(lambda (x) body ...)`  |
| Assignment         | mutation form                      | `(set! x e)`             |
| Definition         | binding form                       | `(define x e)`           |
| Local binding      | `let` family                       | `(let ((x e)) body ...)` |
| Sequencing         | `begin` or body                    | `(begin e1 e2)`          |
| Application        | list form with operator expression | `(f a b)`                |
| Macro use          | list form headed by syntax binding | `(when t body ...)`      |
| Library form       | module-level form                  | `(define-library ... )`  |

The hard part is not memorizing these categories. The hard part is deciding which category a form belongs to when the first identifier could be a macro, a special keyword, or a procedure binding.

**Common Pitfalls:** Do not parse Scheme by visual intuition alone. Parse by binding role.

### Syntax errors versus semantic errors — reader, expander, evaluator

Scheme failures occur at different stages. Reading the error message well requires knowing which stage failed.

| Failure layer               | Example                                      | What failed                               | Typical correction                                  |
| --------------------------- | -------------------------------------------- | ----------------------------------------- | --------------------------------------------------- |
| Reader error                | unbalanced parentheses                       | Text cannot become datums                 | Fix delimiters or lexical syntax                    |
| Invalid datum               | malformed dotted list                        | Reader cannot construct intended object   | Fix external representation                         |
| Expansion error             | bad macro use                                | Syntax transformer cannot match or expand | Fix macro syntax or imports                         |
| Unbound identifier          | `x` has no binding                           | Environment lookup failed                 | Define/import/bind the name                         |
| Wrong binding kind          | syntax used as value or value used as syntax | Syntactic/value layer mismatch            | Use correct abstraction                             |
| Arity error                 | wrong number of arguments                    | Procedure application failed              | Match formal parameters                             |
| Type error                  | `car` on non-pair                            | Runtime value category wrong              | Check predicates or representation                  |
| Contract/precondition error | implementation/library-specific              | API expectation violated                  | Read library contract                               |
| Portability error           | works in one Scheme only                     | Non-standard feature assumed              | Declare implementation or use SRFI/standard feature |

Example:

```scheme
(car '())
```

This is not a reader error. It is a runtime error: `car` expects a pair, and the empty list is not a pair.

Example:

```scheme
(+ 1
```

This is a reader error: the input is structurally incomplete.

Example:

```scheme
(when #t 1)
```

This may fail if `when` has not been imported or defined in the current environment, depending on the standard and implementation context.

**Professional rule:** Before fixing an error, classify the layer. Many bad fixes come from treating a runtime type problem as a syntax problem, or a missing import as a semantic problem.

### Minimal portability markers — standard, SRFI, implementation

A Scheme source file should be read with portability markers in mind.

| Marker               | Meaning                            | Example cue                                        |
| -------------------- | ---------------------------------- | -------------------------------------------------- |
| R7RS library import  | Code targets R7RS library system   | `(import (scheme base))`                           |
| R6RS library syntax  | Code targets R6RS ecosystem        | `(library ...)` style forms                        |
| SRFI import          | Uses portable extension proposal   | `(srfi 1)`-style library names depending on system |
| Chez-specific form   | Uses Chez extension                | Implementation documentation needed                |
| Guile module form    | Uses Guile module system           | `(use-modules ...)`                                |
| Chicken extension    | Uses Chicken eggs or forms         | Chicken-specific tooling                           |
| Racket language line | Racket source, not baseline Scheme | `#lang racket`                                     |

Racket files often begin with:

```scheme
#lang racket
```

That is not ordinary R7RS Scheme source. It is Racket’s language declaration mechanism.

Guile code often uses forms such as:

```scheme
(use-modules ...)
```

That is Guile-specific module syntax, not the R7RS `define-library` model.

**Common Pitfalls:** Do not call all parenthesized Lisp-family code “Scheme.” Racket, Common Lisp, Clojure, Emacs Lisp, Guile-specific Scheme, and R7RS Scheme may look similar but have different semantics, modules, libraries, and macro systems.

### High-frequency primitive operation map — reading ordinary calls

Part 2 should not become a full standard-library guide, but several ordinary calls appear so frequently that they belong in core syntax literacy.

| Operation family   | Common procedures                              | Meaning                          | Pitfall                                      |
| ------------------ | ---------------------------------------------- | -------------------------------- | -------------------------------------------- |
| Arithmetic         | `+`, `-`, `*`, `/`                             | Numeric operations               | Exactness and arity matter                   |
| Numeric comparison | `=`, `<`, `>`, `<=`, `>=`                      | Compare numbers                  | Not general equality                         |
| Predicates         | `pair?`, `null?`, `number?`, `symbol?`         | Runtime category checks          | Predicate result does not create static type |
| Pair/list          | `cons`, `car`, `cdr`, `list`                   | Construct/select linked data     | Empty list is not a pair                     |
| List traversal     | `map`, `for-each`                              | Higher-order sequence operations | `map` for values, `for-each` for effects     |
| Vector             | `vector`, `vector-ref`, `vector-set!`          | Indexed aggregate operations     | Mutation and bounds matter                   |
| String             | `string`, `string-ref`, `string=?`             | Text operations                  | Characters are not strings                   |
| Symbols            | `symbol?`, `symbol->string`, `string->symbol`  | Symbolic identifiers             | Symbol/string conversion has semantic cost   |
| I/O                | `display`, `write`, `newline`, port procedures | Output/input                     | Human display and machine write differ       |
| Control helpers    | `apply`, `call/cc`                             | Higher-order application/control | `apply` is not `eval`                        |

Example distinction between `display` and `write`:

```scheme
(display "hello")
(newline)
(write "hello")
(newline)
```

`display` is typically for human-oriented output. `write` is typically closer to external representation. Details belong in Part 6, but the distinction is important when reading code.

**Common Pitfalls:** Do not assume a procedure’s name tells the whole story. `write`, `display`, exact arithmetic procedures, string operations, and vector mutation all have standard-specific and implementation-specific details worth checking.

### Basic I/O syntax recognition — ports, `display`, `write`, `newline`

Scheme I/O is port-centered. A port represents an input or output source/sink.

Simple output:

```scheme
(display "hello")
(newline)
```

Output to a specific port:

```scheme
(display "hello" output-port)
```

The exact APIs for opening files, closing ports, and managing resources belong in Part 5 and Part 6. At the syntax-reading level, recognize the common pattern:

| Procedure shape            | Meaning                                       | Example            |
| -------------------------- | --------------------------------------------- | ------------------ |
| Output to current port     | Uses default current output port              | `(display x)`      |
| Output to explicit port    | Second argument supplies port                 | `(display x port)` |
| Machine-readable-ish write | Writes external representation where possible | `(write x)`        |
| Human-oriented display     | Displays text more directly                   | `(display x)`      |
| Line break                 | Writes newline                                | `(newline)`        |

**Common Pitfalls:** Do not confuse printed output with returned value. `(display x)` is used for effect. Also do not assume port APIs are identical across all implementations beyond the standard subset being targeted.

### Records and structured data syntax recognition — `define-record-type`

Detailed data modeling belongs in Part 3, but source readers should recognize record definitions. R7RS-small includes a record mechanism through `define-record-type`.

A representative shape:

```scheme
(define-record-type <point>
  (make-point x y)
  point?
  (x point-x)
  (y point-y))
```

This defines a record type, a constructor, a predicate, and accessors.

| Component        | Example                                | Meaning                           |
| ---------------- | -------------------------------------- | --------------------------------- |
| Record type name | `<point>`                              | Name of record type descriptor    |
| Constructor      | `(make-point x y)`                     | Procedure for constructing points |
| Predicate        | `point?`                               | Tests whether value is a point    |
| Field accessor   | `(x point-x)`                          | Field and accessor                |
| Field mutator    | implementation/record syntax dependent | Allows mutation where specified   |

Use:

```scheme
(define p (make-point 3 4))

(point? p)

(point-x p)
```

Records matter because they are often better than raw lists for domain data. A point represented as `'(3 4)` is compact but ambiguous. A record communicates intent.

**Common Pitfalls:** Do not model all structured data as lists merely because lists are easy. Lists are good for sequences and symbolic expressions. Records are better for named fields and domain concepts.

### Syntax as contract — what Part 2 establishes for later parts

The Part 2 syntax contract is now strong enough to support the later reference parts:

| Later part                               | What Part 2 prepares                                                                                |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------- |
| PART 3 — Data, Types, and Modeling       | Distinguishing symbols, lists, pairs, vectors, records, predicates, equality, absence, and mutation |
| PART 4 — Control, Functions, Abstraction | Understanding procedure values, `lambda`, closures, tail calls, macros, `apply`, and `call/cc`      |
| PART 5 — Modules, Errors, Resources      | Recognizing `import`, `define-library`, `error`, ports, sequencing, and boundaries                  |
| PART 6 — Standard Library and Ecosystem  | Reading ordinary calls, SRFI-dependent procedures, I/O, collections, and implementation APIs        |
| PART 7 — Runtime and Semantics           | Understanding evaluation, environments, tail position, mutation, allocation, and expansion layers   |

The central source-reading rule remains:

**A Scheme form should be read by layer: reader datum, syntactic form, macro expansion, variable binding, procedure value, runtime data, or implementation-specific behavior.**

That rule is the foundation for everything that follows in the tutorial contract. 
## PART 3 — Data, Types, and Modeling Reference by Task Pattern

### Orientation — dynamic values, representation discipline, runtime predicates, invariants

Part 3 is organized by **data-modeling tasks**, not by a mechanical list of Scheme data types. This follows the tutorial contract’s requirement that the guide connect practical data modeling to Scheme’s type system, data model, validation boundaries, conversion mechanisms, and common failure modes. 

Scheme is dynamically typed. This means values have runtime categories, but ordinary variable bindings do not carry static type annotations. A binding such as `x` may hold a number now, a list later, or a procedure after reassignment if mutation is used. The language will check operations at runtime: `(+ 1 "x")` is not accepted as sensible arithmetic merely because Scheme is dynamic. But the core language will not statically prove that `x` is always a number.

The professional implication is that Scheme data modeling relies on **representation discipline**. A program must decide how a domain concept is represented, which predicates recognize valid values, which constructors create valid values, which module boundaries hide representation details, and which equality predicates compare values correctly.

| Modeling concern        | Scheme’s core support                                       | What Scheme does not automatically provide | Professional response                                           |
| ----------------------- | ----------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------- |
| Runtime type categories | Predicates such as `number?`, `pair?`, `symbol?`, `vector?` | Static type narrowing                      | Check predicates at boundaries and design clear representations |
| Structured data         | Pairs, lists, vectors, strings, bytevectors, records        | Exhaustive algebraic data checking         | Use records, tags, predicates, and constructors                 |
| Optional values         | Often `#f`, empty list, or custom representation            | Built-in `Option` type                     | Choose a convention and document it                             |
| Finite states           | Symbols, records, or tagged data                            | Enum type in the core language             | Use symbolic tags carefully                                     |
| Domain invariants       | Constructors and predicates                                 | Compile-time invariant enforcement         | Keep raw constructors private where possible                    |
| Unknown external data   | Runtime validation                                          | Automatic schema checking                  | Validate at trust boundaries                                    |
| Reusable abstractions   | Procedures and macros                                       | Static generics                            | Use higher-order procedures and representation-independent APIs |
| Equality                | Multiple equality predicates                                | One universal equality operator            | Choose equality by semantic intent                              |

The central rule for Part 3 is:

**In Scheme, a data model is not just a shape of values. It is a convention plus constructors, predicates, accessors, equality rules, mutation rules, and boundary checks.**

### Type-system properties — dynamic typing, strong runtime checks, no core static guarantees

Before modeling data, the major type-system terms must be disambiguated.

**Dynamic typing** means runtime values are checked when operations need them. It does not mean values are untyped.

**Static typing** means a compiler or type checker assigns and checks types before execution. Core Scheme is not statically typed in this sense.

**Strong typing** is ambiguous. In one sense, Scheme is “strong” because operations generally do not silently reinterpret arbitrary values. In another sense, Scheme is not “strong” if the phrase means extensive compile-time proof of program properties.

**Type safety** is also ambiguous. Scheme prevents many invalid operations by runtime checks, but it does not statically prevent all wrong-type calls before execution. Implementation-specific FFI or unsafe features may cross into less safe territory.

| Property                        | Scheme’s position                                  | Practical consequence                 | Common misunderstanding                       |
| ------------------------------- | -------------------------------------------------- | ------------------------------------- | --------------------------------------------- |
| Dynamic typing                  | Values are checked at runtime                      | Flexible code and late errors         | “Dynamic” does not mean “no types”            |
| Lexical scope                   | Bindings resolved by source structure              | Closures are predictable              | Not the same as static typing                 |
| Runtime predicates              | Values can be classified dynamically               | Enables validation and defensive code | Predicate checks are not compile-time proofs  |
| No core parametric static types | No built-in generic type variables like ML/Haskell | Generic procedures are value-level    | Do not expect compiler-enforced element types |
| No core ADTs                    | No built-in sum/product type system like ML/Rust   | Model variants manually               | Exhaustiveness is programmer discipline       |
| Managed memory                  | Runtime handles allocation/deallocation            | Safer ordinary memory use             | FFI and mutation still require care           |
| Macro hygiene                   | Syntax can preserve binding discipline             | Safer syntactic abstraction           | Hygiene does not enforce domain invariants    |

Example:

```scheme
(define (square x)
  (* x x))
```

This procedure assumes `x` is numeric. Scheme does not statically enforce that assumption. At runtime, if `x` is not accepted by `*`, an error occurs.

A defensive version:

```scheme
(define (square x)
  (if (number? x)
      (* x x)
      (error "square: expected a number")))
```

This turns an implicit representation assumption into an explicit boundary check.

**Failure-first explanation:**
The tempting but wrong mental model is: “Since Scheme is dynamically typed, type design is less important.” The surprising failure appears when a large codebase passes lists, symbols, `#f`, or records through generic-looking procedures and fails far from the original mistake. The correct semantic explanation is that dynamic typing moves many checks to runtime; it does not remove the need for invariants. The professional rule is: **make representation invariants explicit at constructors, predicates, and module boundaries**. The boundary changes when using typed Scheme-family systems or external contract systems, but core Scheme remains dynamically checked.

### Data-modeling decision table — choosing the representation

Scheme gives several primitive and derived representation tools. Choosing among them is a design decision.

| Task                       | Best Scheme representation                                   | When to use                              | Design meaning                      | Common pitfall                           |
| -------------------------- | ------------------------------------------------------------ | ---------------------------------------- | ----------------------------------- | ---------------------------------------- |
| Sequential symbolic data   | Proper list                                                  | Recursive traversal, S-expressions       | Shape mirrors recursive structure   | Using list for random access             |
| Pair of two related values | Pair or record                                               | Temporary pair, association entry        | Minimal compound value              | Raw `car` / `cdr` obscures meaning       |
| Fixed indexed collection   | Vector                                                       | Indexed access, table-like data          | Position matters                    | Losing field names                       |
| Raw bytes                  | Bytevector                                                   | Binary data, encoded I/O                 | Byte-level representation           | Confusing bytes with characters          |
| Text                       | String                                                       | Human text, names, messages              | Character sequence                  | Confusing strings with symbols           |
| Symbolic tag               | Symbol                                                       | Finite symbolic states                   | Identity-like symbolic marker       | Treating symbol as user text             |
| Domain object              | Record                                                       | Named fields, constructor, predicate     | Representation has concept identity | Using lists because they are shorter     |
| Optional result            | `#f` or tagged/record option                                 | Search failure, maybe-value              | Absence convention                  | Failing when `#f` is valid data          |
| Variant value              | Tagged list, symbol, record variants                         | Finite alternatives                      | Manual sum type                     | No exhaustiveness checking               |
| Environment/map            | Association list, hash table via library/SRFI/implementation | Small maps or implementation-backed maps | Key-value lookup                    | Linear lookup cost for large maps        |
| Procedure behavior         | Closure                                                      | Behavior with captured environment       | Function plus context               | Hidden mutable state                     |
| Syntax abstraction         | Macro                                                        | New control or binding form              | Expansion-time transformation       | Using macros for value-level abstraction |

The main professional mistake is using lists for every data model. Lists are central, but they are not universal. A list is ideal when the operations are naturally recursive: take the first element, process the rest, stop at empty. A record is better when the data has named fields. A vector is better when indexed access matters. A symbol is better for a symbolic tag. A string is better for text.

### Model structured data — records, lists, pairs, vectors, closures

Structured data can be modeled several ways in Scheme. Each choice communicates different assumptions.

A raw list representation:

```scheme
(define p '(3 4))

(car p)
(cadr p)
```

This is compact but weakly communicative. Is this a point, a range, a rational-like pair, a screen coordinate, or something else?

A pair representation:

```scheme
(define p (cons 3 4))

(car p)
(cdr p)
```

This makes the two-field structure slightly more direct but still lacks field names.

A record representation:

```scheme
(define-record-type <point>
  (make-point x y)
  point?
  (x point-x)
  (y point-y))

(define p (make-point 3 4))

(point-x p)
(point-y p)
```

The record representation communicates the domain concept. It gives a constructor, predicate, and accessors.

| Representation | Strength                            | Cost                                     | Best use                                  | Failure mode                         |
| -------------- | ----------------------------------- | ---------------------------------------- | ----------------------------------------- | ------------------------------------ |
| Raw list       | Lightweight, easy literal syntax    | Positional fields, weak invariants       | Symbolic data, simple temporary sequences | Misread fields, malformed length     |
| Pair           | Minimal two-field compound          | `car` / `cdr` names are generic          | Association entries, cons structures      | Dotted/proper-list confusion         |
| Vector         | Indexed access                      | Positional fields, less symbolic clarity | Tables, fixed-size indexed data           | Magic indices                        |
| Record         | Named concept, predicate, accessors | More syntax, standard differences matter | Domain entities                           | Leaking constructor/accessor details |
| Closure        | Encapsulates behavior and state     | Harder to inspect structurally           | Stateful behavior, abstract objects       | Hidden mutation and unclear equality |

A better point model uses a record or an abstract constructor/accessor API:

```scheme
(define-record-type <point>
  (make-point x y)
  point?
  (x point-x)
  (y point-y))

(define (point-distance-from-origin p)
  (sqrt (+ (* (point-x p) (point-x p))
           (* (point-y p) (point-y p)))))
```

**Design meaning:** Records are Scheme’s way to move beyond unstructured list programming. They are not the only structured-data mechanism, and their exact syntax/features vary across standards and implementations, but the modeling principle is stable: give domain data a recognizable representation.

**Common Pitfalls:** Do not use `'(3 4)` as a domain object in public APIs unless the positional meaning is conventional and documented. Do not expose raw list representation if later migration to records or another structure is likely.

### Model domain concepts — constructor, predicate, accessor, invariant

A robust Scheme domain model usually has four pieces:

| Component        | Purpose             | Example                   |
| ---------------- | ------------------- | ------------------------- |
| Constructor      | Builds valid values | `make-point`              |
| Predicate        | Recognizes values   | `point?`                  |
| Accessors        | Read fields         | `point-x`, `point-y`      |
| Invariant checks | Reject invalid data | coordinate must be number |

A record alone may not validate invariants. A validating constructor can enforce domain rules:

```scheme
(define-record-type <point>
  (raw-make-point x y)
  point?
  (x point-x)
  (y point-y))

(define (make-point x y)
  (if (and (number? x) (number? y))
      (raw-make-point x y)
      (error "make-point: expected numeric coordinates")))
```

The public constructor is `make-point`; the raw constructor should ideally remain private to the module or local scope. This pattern matters because Scheme’s core type system will not prevent someone from constructing invalid data if raw constructors are exposed.

| Design choice             | Capability gained         | Cost introduced             | Professional rule                          |
| ------------------------- | ------------------------- | --------------------------- | ------------------------------------------ |
| Raw records               | Simple construction       | Invariants can be bypassed  | Fine for internal trivial data             |
| Validating constructor    | Centralized checks        | More boilerplate            | Use for public domain objects              |
| Predicate-only validation | Flexible checks           | Can be forgotten by callers | Good at trust boundaries, not enough alone |
| Abstract accessors        | Representation can change | More indirection            | Use for stable APIs                        |
| Exposed raw list/vector   | Very lightweight          | Weak maintainability        | Avoid for public domain concepts           |

**Failure-first explanation:**
The tempting model is: “A record definition gives me a safe domain type.” The bug appears when invalid records are constructed because the raw constructor accepts structurally correct but semantically invalid values. The correct explanation is that Scheme records provide structure and recognition, not necessarily full domain validation. The professional rule is: **separate raw representation from validated construction**. The boundary changes for purely internal code where all call sites are controlled.

### Choose collections — list, vector, string, bytevector, alist, implementation map

Scheme’s collection choice should follow the intended operations.

| Task                     | Preferred collection                | Why                                 | Common mistake                                  |
| ------------------------ | ----------------------------------- | ----------------------------------- | ----------------------------------------------- |
| Recursive traversal      | List                                | Natural `car` / `cdr` decomposition | Using vector then manually indexing recursively |
| Prepending elements      | List                                | `cons` is efficient                 | Appending repeatedly to end                     |
| Random access by index   | Vector                              | Direct indexed access               | Using repeated `list-ref`                       |
| Text processing          | String                              | Represents character sequence       | Treating string as symbol                       |
| Binary data              | Bytevector                          | Represents bytes                    | Treating bytes as characters                    |
| Small key-value mapping  | Alist                               | Simple, inspectable, symbolic       | Using for large maps                            |
| Larger key-value mapping | Hash table from SRFI/implementation | Better lookup behavior              | Assuming a portable hash API without imports    |
| Stack-like accumulation  | List                                | `cons` then maybe `reverse`         | Using mutation-heavy append loops               |
| Fixed-field domain data  | Record                              | Named fields                        | Magic list/vector positions                     |

Lists are linked structures. Prepending is natural:

```scheme
(cons x xs)
```

Appending to the end repeatedly is often inefficient because it traverses the list:

```scheme
(append xs (list x))
```

For accumulation, the idiom is often to `cons` onto the front and reverse once:

```scheme
(define (map* f xs)
  (let loop ((xs xs)
             (acc '()))
    (if (null? xs)
        (reverse acc)
        (loop (cdr xs)
              (cons (f (car xs)) acc)))))
```

Vectors are preferable when indexing is central:

```scheme
(define v (vector 10 20 30))

(vector-ref v 1)
```

Association lists are readable and simple:

```scheme
(define env
  '((x . 10)
    (y . 20)))

(assoc 'x env)
```

But they are linear search structures. For many keys or frequent lookup, an implementation or SRFI hash table may be better.

**Common Pitfalls:** Do not choose collections by syntax convenience alone. Choose by operation: recursive traversal, indexed access, key lookup, mutation, textual processing, binary processing, or domain abstraction.

### Represent optional or missing values — `#f`, empty list, tagged option

Scheme often uses `#f` to represent failure or absence. This works because only `#f` is false in conditionals.

Example:

```scheme
(define found (assoc 'x env))

(if found
    (cdr found)
    'missing)
```

This is compact, but it has a limitation: `#f` cannot safely represent absence if `#f` is also a valid value.

| Absence representation | Example                                  | Use when                            | Risk                           |
| ---------------------- | ---------------------------------------- | ----------------------------------- | ------------------------------ |
| `#f` as failure        | `(assoc key alist)` returns pair or `#f` | Non-`#f` value always means success | Fails if `#f` is valid payload |
| Empty list             | `'()`                                    | Absence means empty sequence        | Not false in conditionals      |
| Tagged list            | `'(none)` / `(list 'some value)`         | Need explicit option-like structure | Manual checking                |
| Pair wrapper           | `(cons 'some value)`                     | Simple presence marker              | Ad hoc unless standardized     |
| Record option          | `make-some`, `make-none`                 | Larger programs, clearer invariants | More code                      |
| Multiple values        | `(values found? value)`                  | Immediate decomposition             | Not durable as data            |

A tagged option model:

```scheme
(define none '(none))

(define (some x)
  (list 'some x))

(define (some? x)
  (and (pair? x)
       (eq? (car x) 'some)))

(define (none? x)
  (eq? x none))
```

A multiple-value result:

```scheme
(define (lookup key alist)
  (let ((result (assoc key alist)))
    (if result
        (values #t (cdr result))
        (values #f #f))))
```

A caller can receive the result:

```scheme
(call-with-values
  (lambda () (lookup 'x env))
  (lambda (found? value)
    (if found?
        value
        'missing)))
```

This separates the success flag from the payload.

**Failure-first explanation:**
The tempting model is: “Return `#f` when not found.” The bug appears when a key is present and its associated value is actually `#f`. The correct explanation is that `#f` has been overloaded as both a value and an absence marker. The professional rule is: **use `#f` for absence only when `#f` cannot be valid payload data**. The boundary changes when the API convention is already established, such as common association-list search procedures.

### Model finite states — symbols, predicates, case dispatch, tagged records

Finite states are often represented by symbols:

```scheme
(define status 'pending)
```

Dispatch can use `case`:

```scheme
(case status
  ((pending) 'wait)
  ((running) 'continue)
  ((done) 'finish)
  (else (error "unknown status")))
```

Symbols are convenient because they are readable, interned, and naturally used as tags. But symbols alone do not enforce that only valid states appear.

| State representation  | Example                | Strength                     | Weakness                       |
| --------------------- | ---------------------- | ---------------------------- | ------------------------------ |
| Symbol                | `'pending`             | Simple, readable             | No automatic validity checking |
| Symbol plus predicate | `status?`              | Validates allowed states     | Must be called                 |
| Tagged list           | `'(state pending)`     | More structure               | Still manually checked         |
| Record variants       | different record types | Stronger runtime recognition | More syntax                    |
| Procedure dispatch    | closure behavior       | Encapsulates state behavior  | Harder to inspect              |

A validation predicate:

```scheme
(define (status? x)
  (or (eq? x 'pending)
      (eq? x 'running)
      (eq? x 'done)))
```

A checked transition:

```scheme
(define (next-status s)
  (case s
    ((pending) 'running)
    ((running) 'done)
    ((done) 'done)
    (else (error "next-status: invalid status"))))
```

**Design meaning:** Symbolic state is idiomatic for small finite domains, but state validity is not statically enforced. The code must define what states exist and what transitions are valid.

**Common Pitfalls:** Do not let arbitrary symbols leak into stateful APIs. Do not omit the `else` branch when invalid data should be rejected. Do not use strings for internal finite states unless the states are genuinely external text.

### Model variants — tagged data and manual sum types

Scheme does not have core algebraic data types like ML, Haskell, or Rust. Variant modeling is manual.

A common pattern is a tag in the first position:

```scheme
(define (make-circle radius)
  (list 'circle radius))

(define (make-rectangle width height)
  (list 'rectangle width height))
```

Predicates:

```scheme
(define (circle? x)
  (and (pair? x)
       (eq? (car x) 'circle)))

(define (rectangle? x)
  (and (pair? x)
       (eq? (car x) 'rectangle)))
```

Dispatch:

```scheme
(define (area shape)
  (case (car shape)
    ((circle)
     (let ((r (cadr shape)))
       (* 3.141592653589793 r r)))
    ((rectangle)
     (let ((w (cadr shape))
           (h (caddr shape)))
       (* w h)))
    (else
     (error "area: unknown shape"))))
```

This works but is fragile because malformed lists can pass partial checks. A safer version checks shape more carefully or uses records.

| Variant model                | Strength                               | Cost                                | Best use                                |
| ---------------------------- | -------------------------------------- | ----------------------------------- | --------------------------------------- |
| Symbol alone                 | Minimal                                | No payload                          | Simple state                            |
| Tagged list                  | Compact and readable                   | Positional payload, weak validation | Small interpreters, symbolic data       |
| Tagged vector                | Efficient indexed payload              | Magic indices                       | Internal performance-sensitive variants |
| Record per variant           | Clear runtime predicates and accessors | More definitions                    | Domain APIs                             |
| Closure/object-like dispatch | Encapsulates behavior                  | Less transparent data               | Behavior-centric models                 |
| Macro-defined variants       | Reduces boilerplate                    | Macro complexity                    | Repeated variant modeling patterns      |

Record-based variants:

```scheme
(define-record-type <circle>
  (make-circle radius)
  circle?
  (radius circle-radius))

(define-record-type <rectangle>
  (make-rectangle width height)
  rectangle?
  (width rectangle-width)
  (height rectangle-height))

(define (area shape)
  (cond
    ((circle? shape)
     (let ((r (circle-radius shape)))
       (* 3.141592653589793 r r)))
    ((rectangle? shape)
     (* (rectangle-width shape)
        (rectangle-height shape)))
    (else
     (error "area: unknown shape"))))
```

**Failure-first explanation:**
The tempting model is: “A tagged list is basically an algebraic data type.” The bug appears when malformed data such as `'(circle)` or `'(rectangle 3)` reaches a function that blindly uses `cadr` or `caddr`. The correct explanation is that tagged lists encode variants by convention; the language does not enforce constructor completeness or pattern-match exhaustiveness. The professional rule is: use tagged lists for local symbolic representations and records or validated constructors for public domain variants. The boundary changes in macro-based systems that generate constructors, predicates, and matchers.

### Constrain input — predicates, guards, validating constructors

Because Scheme checks many things at runtime, input constraints should be explicit.

A simple constrained function:

```scheme
(define (reciprocal x)
  (cond
    ((not (number? x))
     (error "reciprocal: expected number"))
    ((= x 0)
     (error "reciprocal: zero is invalid"))
    (else
     (/ 1 x))))
```

A constrained constructor:

```scheme
(define-record-type <non-empty-list>
  (raw-make-non-empty-list xs)
  non-empty-list?
  (xs non-empty-list-xs))

(define (make-non-empty-list xs)
  (if (and (list? xs) (pair? xs))
      (raw-make-non-empty-list xs)
      (error "make-non-empty-list: expected non-empty proper list")))
```

| Constraint task        | Scheme mechanism                      | Example                      | Caveat                                     |
| ---------------------- | ------------------------------------- | ---------------------------- | ------------------------------------------ |
| Check runtime category | Predicate                             | `number?`, `list?`           | Does not check semantic range              |
| Check finite set       | Symbol predicate                      | `status?`                    | Must be maintained with states             |
| Check structural shape | `pair?`, `null?`, recursive predicate | tree validation              | Can be costly                              |
| Check numeric range    | Comparisons                           | `(<= 0 x 100)`               | Exact/inexact issues may matter            |
| Check domain object    | Record predicate                      | `point?`                     | Constructor may still allow invalid fields |
| Check external data    | Parser/validator                      | JSON/S-expression validation | Requires boundary design                   |

A recursive structural predicate:

```scheme
(define (list-of-numbers? xs)
  (cond
    ((null? xs) #t)
    ((pair? xs)
     (and (number? (car xs))
          (list-of-numbers? (cdr xs))))
    (else #f)))
```

This checks that a value is a proper list and that every element is a number.

**Common Pitfalls:** Do not check only the outer shape. `(pair? xs)` does not mean `xs` is a proper list. `(list? xs)` does not mean every element has the expected type. A domain predicate should check the actual invariant needed by the later code.

### Validate external or unknown data — trust boundaries, parsing, normalization

External data is data from files, networks, users, command-line arguments, environment variables, FFI, databases, or untrusted modules. Scheme’s dynamic typing makes validation especially important at these boundaries.

A safe boundary usually has four stages:

| Stage     | Purpose                            | Scheme pattern                               |
| --------- | ---------------------------------- | -------------------------------------------- |
| Read      | Obtain raw data                    | port/file/string/network API                 |
| Parse     | Convert raw representation         | reader, parser, library                      |
| Validate  | Check shape and domain constraints | predicates and recursive checks              |
| Normalize | Convert to internal representation | records, symbols, numbers, canonical strings |

For example, suppose external symbolic data is expected to represent a command:

```scheme
'(resize 800 600)
```

A validator:

```scheme
(define (resize-command? x)
  (and (list? x)
       (= (length x) 3)
       (eq? (car x) 'resize)
       (integer? (cadr x))
       (integer? (caddr x))
       (> (cadr x) 0)
       (> (caddr x) 0)))
```

A normalized representation:

```scheme
(define-record-type <resize-command>
  (make-resize-command width height)
  resize-command?
  (width resize-command-width)
  (height resize-command-height))

(define (parse-resize-command x)
  (if (resize-command? x)
      (make-resize-command (cadr x) (caddr x))
      (error "parse-resize-command: invalid command")))
```

This separates external shape from internal representation. The external input is a list; the internal value is a record.

| Boundary mistake                            | Consequence                               | Better practice                               |
| ------------------------------------------- | ----------------------------------------- | --------------------------------------------- |
| Trusting external list shape                | `car` / `cadr` errors                     | Check proper list and length                  |
| Trusting numeric fields                     | arithmetic errors or invalid domain state | Check `integer?`, range, exactness if needed  |
| Using external strings as internal states   | typo-prone comparisons                    | Normalize to symbols or records               |
| Passing raw external data deep into program | errors far from boundary                  | Validate once near entry                      |
| Over-validating repeatedly                  | code noise and cost                       | Validate at boundary, then preserve invariant |
| Using `eval` on external data               | severe safety risk                        | Parse data, not code                          |

**Common Pitfalls:** Do not use `eval` to process external data. Do not treat a readable S-expression as safe executable Scheme. Reading data and evaluating code are different operations with radically different safety consequences.
