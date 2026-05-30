---
title: Haskell - Quick Reference
abbreviation: Haskell
categories: Notes
subclass: Languages
---


## PART 1 — Language Identity, Design Philosophy, and Problem Space

### Version and Implementation Assumptions — Haskell 2010, GHC Haskell, GHCi, Cabal, Stack, GHCup, HLS

This guide targets **mainstream professional Haskell**, not a purely historical or report-only subset. The baseline is **Haskell 2010 plus modern GHC Haskell**, with examples written to remain readable under ordinary GHC practice. GHC supports several language editions, including `Haskell98`, `Haskell2010`, `GHC2021`, and `GHC2024`, while also offering many individually enabled language extensions. That distinction matters: **Haskell 2010** is the stable language-report baseline; **GHC Haskell** is what most serious contemporary Haskell code actually uses. ([GHC GitLab][1])

The practical toolchain assumption is **GHC**, **GHCi**, **Cabal**, **Stack**, **GHCup**, and **haskell-language-server**. GHC 9.14.1 was released in December 2025, GHC 9.12.4 was released in March 2026, and the current Haskell Language Server support matrix lists full support for recent GHC versions including 9.12.4. ([Haskell][2]) Cabal should be understood as the standard Haskell build and package system; GHCup is the ordinary toolchain installer path; HLS is the editor-integration layer that makes type errors, code navigation, and refactoring tolerable in real projects. ([Cabal][3])

This part follows the uploaded coverage contract: Haskell must be taught as a coherent design system, with particular attention to type theory, lambda calculus, category theory, denotational semantics, laziness, purity, typeclasses, effects, runtime behavior, tooling, and failure modes. 

### What Haskell Is — pure functional language, non-strict semantics, static typing, typeclasses, lazy evaluation

Haskell is a **pure, statically typed, non-strict functional programming language**. That compact description is accurate but too compressed. Each word changes how code is designed.

**Pure** means that ordinary functions do not perform effects directly. A function with type `Int -> Int` computes an `Int` from an `Int`; it does not secretly print, mutate a global variable, read a file, or query the clock. Effects are represented explicitly through types such as `IO a`, `Either e a`, `State s a`, or more structured effect abstractions.

**Statically typed** means that programs are checked before execution against a type system. But Haskell is not “verbose static typing.” Most local types are inferred. Professional Haskell uses explicit type signatures not because the compiler always needs them, but because humans need API boundaries, design documentation, and clearer error localization.

**Non-strict** means that expressions are not evaluated merely because they are bound to names. Evaluation is demand-driven. This enables elegant infinite data structures and modular pipelines, but also produces a distinct performance model based on thunks, sharing, strictness, and space leaks.

**Functional** means that functions, values, algebraic data types, pattern matching, higher-order functions, and composition are the default vocabulary. Haskell can perform I/O, mutate references, use arrays, spawn threads, call C, and build servers, but its center of gravity remains value transformation under a strong type discipline.

The Haskell 2010 Report frames the language as the result of many years of research on non-strict functional languages and defines both syntax and an informal abstract semantics for Haskell programs. ([Haskell][4]) In practice, Haskell is also a research-to-production bridge: it carries ideas from lambda calculus, type theory, denotational semantics, category theory, compiler design, and software engineering into ordinary library APIs and application code.

### Language Personality — design dimensions, choices, consequences

Haskell’s personality is not “minimalism” in the sense of a small scripting language. It is closer to **semantic discipline with high abstraction density**. Small programs can look terse; large programs often depend on careful type design, module boundaries, and library conventions.

| Design dimension  | Haskell’s choice                                                | Practical consequence                                                               | Main tradeoff                                                        |
| ----------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Evaluation model  | Non-strict / lazy by default                                    | Can define infinite structures and separate producers from consumers elegantly      | Harder cost model; space leaks can be non-obvious                    |
| Effect model      | Effects represented in types                                    | Pure logic is easy to test and refactor; effectful code is explicit                 | Beginners often misunderstand `IO`, `Monad`, and sequencing          |
| Type discipline   | Static, strong, inferred                                        | Many design errors are caught before runtime; signatures guide architecture         | Type errors can become abstract and difficult                        |
| Abstraction model | Functions, ADTs, typeclasses, higher-kinded types               | Generic and compositional code is natural                                           | Over-abstraction is easy, especially with advanced extensions        |
| Object model      | No built-in class-based OO object hierarchy                     | Encourages data modeling and behavior abstraction through functions and typeclasses | OO design habits transfer poorly                                     |
| Error model       | Multiple explicit and implicit failure channels                 | `Maybe`, `Either`, exceptions, and partiality can be selected by intent             | Misusing partial functions or exceptions weakens guarantees          |
| Module model      | Explicit modules, imports, exports                              | API surface can be controlled precisely                                             | Poor export discipline creates fragile modules                       |
| Runtime model     | Compiled via GHC with managed heap and GC                       | High-level code can be efficient; profiling tools exist                             | Laziness, allocation, and GC require language-specific reasoning     |
| Concurrency model | Lightweight threads, STM, async libraries, runtime capabilities | Composable concurrency is unusually strong                                          | Parallel performance still requires careful evaluation and profiling |
| Metaprogramming   | GHC extensions, Template Haskell, deriving, generics            | Boilerplate can be reduced significantly                                            | Compile-time complexity and readability costs                        |

A useful first approximation is: **Haskell optimizes for explicit meaning, algebraic modeling, and compositional reasoning; it does not optimize for immediate operational familiarity.** It rewards code that says what values and effects are, and punishes code that tries to simulate mutable, statement-by-statement imperative programming without accepting Haskell’s semantic model.

### Why Haskell Exists — research consolidation, semantic clarity, abstraction without accidental effects

Haskell was created to consolidate lazy functional programming research into a shared language. Its historical role is not merely to be another general-purpose language. It served as a meeting point for several ideas:

| Historical pressure                              | Haskell’s response                                                             | Lasting effect in modern code                                                                                        |
| ------------------------------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Need for a common lazy functional language       | Standardized a non-strict, pure functional core                                | Haskell remains the main practical reference point for lazy pure programming                                         |
| Need to separate pure computation from effects   | Monadic `IO` and typed effect descriptions                                     | Programs often separate pure domain logic from effectful shells                                                      |
| Need for reusable generic operations             | Typeclasses                                                                    | Interfaces such as `Eq`, `Ord`, `Functor`, `Applicative`, `Monad`, `Foldable`, and `Traversable` shape everyday code |
| Need for algebraic data modeling                 | Sum and product types with pattern matching                                    | Domain modeling is usually done with ADTs rather than inheritance                                                    |
| Need for high-level abstraction with performance | GHC optimization, specialization, strictness analysis, rewrite rules, unboxing | Expert Haskell combines high-level code with profiling and compiler-aware tuning                                     |
| Need for language experimentation                | GHC extensions                                                                 | The ecosystem accepts controlled language evolution, but must manage extension complexity                            |

This history explains why Haskell feels different from mainstream imperative languages. Its center is not “control the machine step by step,” but “describe values, transformations, effects, and laws precisely enough that the compiler and the reader can reason about the program.”

### Strengths and Costs — what Haskell makes easy, what it makes hard

Haskell’s strengths are inseparable from its costs. The same features that make it powerful also create distinctive failure modes.

| Strength                  | Capability gained                                  | Cost introduced                                      | Programs that benefit                                                | Programs that suffer                                       |
| ------------------------- | -------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| Purity                    | Local reasoning, testable logic, safer refactoring | Effects require explicit modeling                    | Compilers, analyzers, financial logic, parsers, domain-heavy systems | Quick scripts that rely heavily on mutation and ad-hoc I/O |
| Strong static types       | Many invalid programs rejected early               | Type design becomes part of program design           | Large refactors, correctness-sensitive code, APIs with invariants    | Codebases that need rapid untyped prototyping              |
| ADTs and pattern matching | Precise domain models                              | Data evolution requires API planning                 | Protocols, interpreters, state machines, validation logic            | Highly dynamic schemas without validation boundaries       |
| Typeclasses               | Reusable generic behavior                          | Lawfulness is conventional, not always enforced      | Generic libraries, compositional abstractions                        | Codebases with incoherent or overly clever instances       |
| Laziness                  | Modular pipelines and infinite data                | Space leaks and unpredictable memory retention       | Streaming-like transformations, search spaces, recursive definitions | Performance-critical code written without profiling        |
| Higher-order functions    | Powerful abstraction over behavior                 | Can obscure control flow                             | Libraries, parsers, transformations, DSLs                            | Teams unfamiliar with functional idioms                    |
| GHC extensions            | Advanced modeling and performance tools            | Fragmentation, compile-time cost, readability burden | Expert libraries, typed DSLs, generic programming                    | Simple applications that overuse advanced features         |

**Failure-first explanation.** The tempting mental model is that Haskell is “safe because it has types.” The surprising reality is that Haskell programs can still crash through partial functions, non-exhaustive patterns, runtime exceptions, infinite loops, resource errors, FFI mistakes, and memory exhaustion. The correct semantic explanation is that Haskell’s type system prevents many classes of representation and composition errors, but it does not prove total correctness by default. The professional rule is: **use types to remove invalid states, use total functions where possible, isolate partiality, profile runtime behavior, and treat external boundaries as untrusted.** The boundary changes when using advanced techniques such as GADTs, refinement types, dependent-type-like encodings, or external verification, but those are not the default everyday guarantee.

### What Haskell Deliberately Prevents or Discourages — mutation, implicit effects, null-style absence, unstructured APIs

Haskell prevents or discourages several habits that feel natural in other languages.

| Habit discouraged                               | Haskell replacement                                                      | Why Haskell prefers it                            | Common resistance                      |
| ----------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------- | -------------------------------------- |
| Mutating variables as default                   | Binding values and transforming data                                     | Reduces hidden state and aliasing confusion       | “How do I update a variable?”          |
| Returning `null` for absence                    | `Maybe a`                                                                | Absence becomes visible in the type               | “Why must I handle `Nothing`?”         |
| Throwing exceptions for ordinary domain failure | `Either e a`, validation types, `ExceptT`                                | Recoverable failure becomes part of API design    | “Why not just throw?”                  |
| Class inheritance for domain modeling           | ADTs, records, typeclasses, composition                                  | Data shape and behavior abstraction are separated | “Where are the objects?”               |
| Implicit effects inside ordinary functions      | `IO`, effect abstractions, monadic sequencing                            | Effects are tracked and localized                 | “Why is this function in `IO`?”        |
| Unchecked ad-hoc conversion                     | Parsing and explicit conversion                                          | External data is not silently trusted             | “Why is parsing separate from typing?” |
| Statement-oriented sequencing everywhere        | Expressions, `let`, `case`, function composition, `do` where appropriate | More code becomes equationally understandable     | “Why is everything an expression?”     |

This does not mean Haskell has no mutation or exceptions. It has mutable references, arrays, exceptions, low-level primitives, and unsafe operations. The important difference is **default pressure**. Haskell makes disciplined code easier and makes undisciplined code visible.

### What Haskell Leaves to Programmer Discipline — laws, totality, performance, module hygiene

Haskell checks many things statically, but not everything that matters.

| Area                | What Haskell can check                                       | What remains discipline                                                           |
| ------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Type correctness    | Values are used consistently with their types                | Whether the chosen types model the domain well                                    |
| Pattern matching    | Some exhaustiveness warnings, depending on compiler settings | Whether all logical cases are meaningfully handled                                |
| Typeclass instances | Instance methods have the required types                     | Whether instances obey laws                                                       |
| Purity              | Ordinary pure functions cannot perform `IO` directly         | Whether unsafe operations or partial functions are isolated                       |
| Effects             | `IO` and other effects appear in types                       | Whether effect stacks remain comprehensible                                       |
| Laziness            | Semantics are non-strict                                     | Whether memory usage is acceptable                                                |
| Modules             | Imports and exports are explicit                             | Whether boundaries are stable and minimal                                         |
| Concurrency         | Typed APIs for threads, STM, async                           | Whether concurrency design avoids leaks, deadlocks, or poor cancellation behavior |
| FFI                 | Foreign calls can be typed                                   | Whether foreign code respects memory and purity assumptions                       |

The most important example is **typeclass laws**. The compiler can verify that a `Functor` instance has the right method type, but it does not automatically prove that `fmap id = id` or that `fmap (g . f) = fmap g . fmap f`. Lawfulness is a contract between the instance author, library users, and equational reasoning. Breaking it may not produce a type error, but it can make generic code behave incoherently.

### Interdisciplinary Foundations — category theory, lambda calculus, type theory, denotational semantics

Haskell is one of the few mainstream languages where theoretical lenses genuinely improve practical programming judgment. These lenses should remain subordinate to code. The purpose is not to turn Haskell into a mathematics textbook, but to explain why ordinary APIs look the way they do.

| Lens or external field | Core idea                                                                      | Language features clarified                                                                | Practical programming consequence                                                            | Where it appears in the guide | Limit of the lens                                                      |
| ---------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------- |
| Lambda calculus        | Computation through function abstraction and application                       | Functions, lambdas, currying, partial application, closures, higher-order functions        | Makes function application, argument order, composition, and point-free style understandable | Parts 2, 4, 7                 | Does not by itself explain types, effects, modules, or runtime cost    |
| Type theory            | Programs and propositions can be constrained by types                          | ADTs, polymorphism, typeclasses, kinds, GADTs, phantom types, type-level programming       | Helps design APIs where invalid states are unrepresentable                                   | Parts 3, 4, 10                | Haskell is not a full proof assistant by default                       |
| Category theory        | Abstract structure through objects, morphisms, composition, and laws           | `Functor`, `Applicative`, `Monad`, `Monoid`, `Foldable`, `Traversable`, parser combinators | Guides lawful abstraction and compositional API design                                       | Parts 3, 4, 6, 10             | Heavy notation often obscures ordinary programming problems            |
| Denotational semantics | Programs can be understood by mathematical meaning rather than execution steps | Purity, referential transparency, laziness, infinite data, `IO` descriptions               | Supports equational reasoning and safe refactoring                                           | Parts 5, 7                    | It does not replace operational profiling or runtime understanding     |
| Compiler theory        | Source programs are transformed through analysis and optimization              | Strictness analysis, specialization, Core, rewrite rules, unboxing                         | Explains why high-level code can be fast and why profiling matters                           | Parts 7, 9                    | GHC behavior is implementation-specific, not always language semantics |
| Software engineering   | Programs are maintained by humans across time                                  | Modules, APIs, dependency boundaries, testing, code review                                 | Prevents over-abstract “clever Haskell” from damaging maintainability                        | Parts 5, 9, 10                | Engineering judgment cannot be derived from types alone                |

**Category theory lens.** The programming problem is reusable composition: mapping over containers, sequencing effects, combining results, traversing structures, and preserving invariants. Haskell abstractions such as `Functor`, `Applicative`, `Monad`, `Monoid`, and `Traversable` encode recurring composition shapes. The laws suggest that generic code can reason about those abstractions uniformly. The practical consequence is that code using these abstractions becomes predictable when instances are lawful. The limit is that category theory does not automatically tell which abstraction is best for a business domain, how to name modules, or how to optimize memory.

**Lambda calculus lens.** The programming problem is understanding why functions dominate the language. Haskell’s function application, lambdas, currying, partial application, and closures become natural when viewed as abstraction and application. The practical consequence is that function signatures are not decoration; they are the shape of composition. The limit is that raw lambda calculus does not explain Haskell’s typeclasses, laziness costs, `IO`, or module system.

**Type theory lens.** The programming problem is preventing invalid programs by construction. ADTs, type parameters, phantom types, GADTs, and typeclasses let programmers move domain rules into types. The practical consequence is that design begins with representation: choose types so that many bad states cannot be expressed. The limit is that Haskell’s everyday type system is not a complete specification language; runtime validation, tests, and external boundary checks remain necessary.

**Denotational semantics lens.** The programming problem is reasoning about code by meaning rather than by mutable execution history. Referential transparency allows substitution: replacing an expression with its value should not change program meaning. The practical consequence is safer refactoring and clearer separation between pure logic and effectful edges. The limit is that denotational clarity does not tell how much memory a lazy pipeline retains.

### Haskell’s Core Design Tradeoff — semantic power versus operational obviousness

Haskell’s central tradeoff is that it makes **meaning** clearer than **machine behavior**. A Haskell function’s type and definition often reveal more semantic structure than equivalent code in an imperative language. But the exact evaluation behavior may be less obvious without understanding laziness, strictness, allocation, sharing, and compiler optimization.

| Feature        | Problem solved                                                      | Capability gained                                                | Cost introduced                         | Misuse encouraged                                      | Programs that benefit                                                | Programs that suffer                           |
| -------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------- | ---------------------------------------------- |
| Laziness       | Avoid unnecessary computation and decouple producers from consumers | Infinite lists, modular pipelines, elegant recursion             | Space leaks, thunk buildup              | Assuming laziness is always free                       | Symbolic computation, parsers, search, compositional transformations | Memory-sensitive code without profiling        |
| Purity         | Remove hidden effects from ordinary functions                       | Equational reasoning, testability, safer refactoring             | Effect boundaries must be designed      | Treating `IO` as an inconvenience                      | Business rules, compilers, transformations, validation               | Ad-hoc scripts that freely mix I/O and logic   |
| Typeclasses    | Share behavior across unrelated types                               | Generic reusable APIs                                            | Lawfulness and coherence concerns       | Defining clever instances without semantic consistency | Libraries, DSLs, algebraic abstractions                              | Teams without shared abstraction discipline    |
| ADTs           | Model alternatives and structured data directly                     | Precise domain representation                                    | Pattern matching must evolve with types | Over-modeling tiny problems                            | Protocols, interpreters, state machines                              | Highly dynamic or schema-fluid data            |
| GHC extensions | Extend expressiveness beyond Haskell 2010                           | Advanced modeling, performance, deriving, type-level programming | Portability and readability costs       | Enabling extensions reflexively                        | Expert libraries, typed APIs, frameworks                             | Simple applications needing stable conventions |

A productive Haskell programmer learns to ask two questions at once: **What does this program mean?** and **What will GHC make it do?** Beginners often ask only the second question, because they come from operational languages. Advanced beginners often ask only the first question, because the type system feels powerful. Professional Haskell requires both.

### Relationship to Adjacent Languages — ML, OCaml, Scala, Rust, Python, JavaScript, Lisp

Haskell is often compared with languages that share only one or two of its traits. These comparisons are useful only when the exact overlap is stated.

| Adjacent language       | Similarity                                                                     | Difference                                                                                                                               | Better comparison rule                                                                      |
| ----------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ML / OCaml              | Strong static typing, ADTs, pattern matching, functional core                  | OCaml is strict by default and has a stronger conventional role for modules and pragmatic imperative features                            | Compare data modeling and type inference, but do not transfer strict evaluation assumptions |
| Scala                   | Functional abstractions, typeclasses by convention or libraries, JVM ecosystem | Scala is strict, object-functional, subtyping-heavy, and JVM-centered                                                                    | Compare abstraction vocabulary, not language personality                                    |
| Rust                    | Strong static types, ADTs, pattern matching, explicit error types              | Rust centers ownership, borrowing, mutation discipline, and systems programming; Haskell centers purity, laziness, and effects in types  | Compare “making invalid states unrepresentable,” but not memory model                       |
| Python                  | High-level expressiveness, REPL-friendly exploration                           | Python is dynamically typed and operationally eager; Haskell is statically typed and lazy                                                | Transfer decomposition skills, not runtime or typing habits                                 |
| JavaScript / TypeScript | Higher-order functions and functional idioms                                   | JavaScript is dynamically typed and effectful; TypeScript types erase at runtime; Haskell types shape compilation and design more deeply | Transfer callback/composition intuition carefully                                           |
| Lisp / Scheme           | Functions as values, symbolic abstraction, language-oriented programming       | Haskell has static types, purity, and laziness; Lisp is more syntactically uniform and macro-oriented                                    | Compare abstraction power, not type discipline                                              |
| F#                      | ML-family functional programming on .NET                                       | F# is strict and ecosystem-integrated with .NET object conventions                                                                       | Compare pragmatic functional style, not laziness or purity                                  |

Haskell’s nearest intellectual relatives are ML-family languages and typed functional calculi. Its nearest practical contrast cases are often Rust, Scala, and OCaml: Rust shows what happens when the center is memory safety and ownership; Scala shows what happens when functional abstractions meet object orientation and subtyping; OCaml shows what a strict, pragmatic ML-family language looks like.

### Transfer Map — habits that transfer, partially transfer, or fail

| Source-language habit or concept | How it appears in Haskell                                                     | What transfers                   | What changes                                                             | Common failure mode                         | Better mental model                                                                |
| -------------------------------- | ----------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------- | ---------------------------------------------------------------------------------- |
| Python list transformations      | `map`, `filter`, folds, comprehensions, recursion, library pipelines          | Thinking in transformations      | Laziness and types change evaluation and API shape                       | Using lists for every sequence-like problem | Choose representation first: list, `Vector`, `Text`, `Map`, stream library         |
| JavaScript callbacks             | Higher-order functions, closures                                              | Passing behavior as values       | Effects are typed; callback-heavy style is often replaced by composition | Recreating callback pyramids in `IO`        | Compose pure functions; sequence effects only where needed                         |
| Java interfaces                  | Typeclasses                                                                   | Abstracting behavior             | Typeclasses are not OO inheritance and are resolved by types             | Expecting runtime subtype polymorphism      | Think “lawful behavior for a type,” not “object implements interface”              |
| Rust enums                       | ADTs                                                                          | Modeling alternatives explicitly | Haskell is lazy, garbage-collected, and pure by default                  | Assuming Rust ownership intuition applies   | Think representation and total pattern matching, not borrowing                     |
| Scala implicits/typeclasses      | Typeclasses                                                                   | Contextual behavior abstraction  | Haskell has its own coherence, instance, and extension rules             | Overusing constraints everywhere            | Keep constraints at API boundaries and prefer simple types                         |
| Java exceptions                  | Exceptions exist, but recoverable failure often uses `Either` or domain types | Failure handling matters         | Failure is often part of the return type                                 | Throwing for normal validation              | Use exceptions for exceptional runtime conditions, typed errors for domain failure |
| C/C++ performance intuition      | GHC can produce efficient code                                                | Cost awareness matters           | Laziness, allocation, GC, and optimization dominate                      | Micro-optimizing syntax before profiling    | Profile allocations, strictness, and data representation                           |
| SQL/schema thinking              | ADTs and records can model domain shape                                       | Invariants matter                | Static types do not validate external data automatically                 | Trusting decoded data too early             | Parse and validate at boundaries, then use trusted internal types                  |

The main habit to unlearn is **statement-first design**. Haskell code usually improves when the first question is not “what steps should execute?” but “what data states exist, what transformations are valid, and where do effects enter?”

### Mature, Emerging, and Overhyped Trends — stable practice versus moving frontier

Haskell has a stable professional core and a moving research frontier. Confusing the two leads to poor learning priorities.

| Trend                                    | Status                       | Driving pressure                                                           | What changes in practice                                                                | Caveat                                                                                        |
| ---------------------------------------- | ---------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `GHC2021` / `GHC2024` language editions  | Mature direction             | Reduce extension boilerplate and standardize common GHC practice           | Projects can choose a larger default language set                                       | Edition choice still depends on team and dependency compatibility                             |
| Better HLS/editor tooling                | Mature and still improving   | Make Haskell development less opaque                                       | Type holes, diagnostics, navigation, and code actions improve learning and productivity | HLS must match supported GHC versions; toolchain mismatch remains common                      |
| Type-level programming                   | Mature but advanced          | Encode stronger invariants and reduce runtime errors                       | Libraries use `DataKinds`, type families, GADTs, and promoted types                     | Can damage readability when used without clear payoff                                         |
| Dependent Haskell direction              | Emerging                     | Bring term/type interaction closer and improve correctness-by-construction | Influences GHC design and advanced type-system work                                     | Not the everyday baseline for application code                                                |
| Effect systems beyond monad transformers | Emerging / ecosystem-diverse | Make complex effects more modular and ergonomic                            | Libraries offer alternatives to traditional `mtl` and transformer stacks                | No single universal winner; ecosystem fragmentation matters                                   |
| Linear types                             | Specialized but important    | Track resource usage and enforce single-use discipline                     | Useful for some systems and resource-sensitive APIs                                     | Not central to ordinary Haskell yet                                                           |
| Lenses and optics                        | Mature but optional          | Manage nested immutable data updates and compositional access              | Common in advanced codebases and libraries                                              | Can become unreadable if introduced too early                                                 |
| “Haskell as a proof assistant”           | Overstated for ordinary use  | Desire for correctness guarantees                                          | Some proof-like techniques are possible                                                 | Haskell is not Agda, Idris, Lean, or Coq                                                      |
| “Monads are the whole language”          | Overhyped beginner myth      | Monads are distinctive and widely discussed                                | They matter for sequencing and composition                                              | Haskell also depends on ADTs, laziness, typeclasses, modules, runtime, and ecosystem practice |

GHC’s current documentation treats language editions and extensions as explicit compiler-controlled choices, which reflects a broader trend: modern Haskell is not simply “the Haskell 2010 report plus libraries,” but a managed relationship between the stable report, GHC language editions, and individually selected extensions. ([GHC GitLab][1]) Recent GHC releases also continue to emphasize compiler improvements and optimization work, including specialization improvements in GHC 9.14. ([Haskell][2]) Dependent-type-related work remains a visible frontier in the GHC ecosystem, but it should be treated as an advanced direction rather than the first mental model for writing ordinary Haskell programs. ([GHC Serokell][5])

### What Haskell Makes Easy — algebraic modeling, pure transformation, compositional APIs

Haskell makes some tasks unusually clean.

First, it makes **domain modeling** precise. Sum types represent alternatives; product types represent combined fields; pattern matching consumes structured data; `newtype` creates distinct domain concepts without runtime overhead in ordinary cases. A domain with finite states, optional values, recoverable failures, command variants, protocol messages, or expression trees often maps naturally into Haskell.

Second, it makes **pure transformation pipelines** clear. Functions can be composed because they do not hide effects. Refactoring is safer because replacing an expression with an equivalent one should preserve meaning. This is where denotational thinking pays off: code has a meaning independent of a hidden mutable history.

Third, it makes **generic abstraction** unusually expressive. Typeclasses let the same function work across many structures when those structures share behavior. `Functor` captures mapping over a context; `Applicative` captures independent combination of contextual computations; `Monad` captures dependent sequencing; `Traversable` captures effectful traversal; `Monoid` captures associative combination with an identity.

Fourth, it makes **parsers and embedded languages** natural. Parser combinators, interpreters, DSLs, expression evaluators, static analyzers, compilers, and transformation tools fit Haskell’s strengths because these domains are strongly shaped by syntax trees, recursive data, and compositional semantics.

### What Haskell Makes Hard — operational intuition, onboarding, ecosystem choices, performance diagnosis

Haskell makes some tasks harder than in more operational languages.

The first difficulty is **evaluation intuition**. In strict languages, values are usually computed before being passed. In Haskell, expressions may remain suspended until demanded. This changes debugging, memory behavior, and performance analysis.

The second difficulty is **abstraction density**. A short Haskell expression may depend on several layers of typeclass resolution, higher-order functions, infix operators, and library conventions. This is efficient for fluent readers, but hostile to readers who have not internalized the abstractions.

The third difficulty is **ecosystem choice**. Many practical tasks require packages outside `base`: `text`, `bytestring`, `containers`, `vector`, `aeson`, parser libraries, testing tools, concurrency libraries, logging libraries, web frameworks, and effect libraries. Haskell’s ecosystem is capable, but less uniform than languages with one dominant industrial framework stack.

The fourth difficulty is **performance diagnosis**. Haskell performance is rarely about counting local statements. It is often about allocation, thunk buildup, strictness, fusion, data representation, specialization, inlining, and GC behavior. The cost model is learnable, but it is not the same as C, Rust, Python, or Java.

### Haskell’s Safety Story — strong, useful, but not absolute

Haskell is often described as safe, but that word is ambiguous.

| Safety claim       | Accurate interpretation                                             | What is not guaranteed                                                                 |
| ------------------ | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Type safety        | Well-typed expressions use values consistently with their types     | Total correctness, termination, absence of runtime exceptions                          |
| Memory safety      | Ordinary Haskell avoids manual memory errors such as use-after-free | FFI and unsafe primitives can break assumptions                                        |
| Null safety        | Absence is usually modeled with `Maybe` rather than null references | Partial functions and bad decoding can still fail                                      |
| Effect safety      | Effects appear in types such as `IO`                                | The type `IO a` does not say which files, sockets, or global resources are touched     |
| Concurrency safety | STM and typed concurrency APIs support disciplined design           | Deadlocks, leaks, blocked threads, and poor cancellation remain possible               |
| Refactoring safety | Purity and types catch many errors during change                    | Semantic mistakes, performance regressions, and law-breaking instances remain possible |

The correct professional claim is not “Haskell prevents bugs.” It is: **Haskell gives unusually strong tools for moving bugs from runtime behavior into explicit representation, type signatures, and compiler feedback.** Those tools work only when code avoids partiality, uses appropriate data models, respects typeclass laws, validates external data, and profiles performance.

### Haskell’s Error and Effect Personality — explicit ordinary failure, isolated side effects, controlled escape hatches

Haskell’s error and effect model is one of its most important design signatures.

| Situation                           | Preferred Haskell representation                               | Design meaning                                                 |
| ----------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| Optional result                     | `Maybe a`                                                      | Absence is expected and carries no detailed error              |
| Recoverable domain failure          | `Either e a` or validation type                                | Failure is part of the API contract                            |
| Multiple possible validation errors | Validation libraries or structured error accumulation          | Independent checks should accumulate rather than short-circuit |
| External side effects               | `IO a`                                                         | Effectful computation is described by a value                  |
| Stateful pure computation           | `State s a` or explicit state passing                          | State transition can be modeled without real mutation          |
| Reader-style environment            | `Reader r a` or function parameters                            | Shared configuration is explicit                               |
| Exceptional runtime failure         | Exceptions                                                     | Used carefully for unexpected or operational failures          |
| Unsafe boundary                     | `unsafePerformIO`, FFI, partial functions, unchecked coercions | Requires isolation, documentation, and review                  |

The tempting but wrong mental model is: “`IO` is where Haskell becomes impure.” The better model is: **`IO a` is a value that describes an effectful computation which, when executed by the runtime as part of `main`, may produce an `a`.** This preserves a boundary between pure expression meaning and effectful execution. The limit of this explanation is practical: once inside `IO`, code can still be badly structured, overly broad, resource-leaky, or hard to test.

### Haskell’s Abstraction Personality — typeclasses, functions, composition, not inheritance-first design

Haskell abstraction usually begins with **functions over data**, then moves toward **typeclasses** only when multiple types genuinely share behavior.

| Abstraction mechanism       | Best use                                                 | Failure mode                                                                        |
| --------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Plain function              | A reusable transformation or query                       | Over-generalizing before the shape is stable                                        |
| Higher-order function       | Reusable control pattern or behavior parameter           | Making call sites unreadable                                                        |
| ADT                         | Domain representation with known alternatives            | Encoding too much incidental detail                                                 |
| `newtype`                   | Distinct domain concept with same runtime representation | Excessive wrapping without API payoff                                               |
| Typeclass                   | Shared behavior across types, ideally with laws          | Creating instances because the compiler permits them, not because they are coherent |
| Module                      | Encapsulation of constructors and invariants             | Exporting everything and losing abstraction                                         |
| GADT / type-level encoding  | Stronger invariant tracking                              | Making maintenance depend on advanced type machinery                                |
| Template Haskell / generics | Boilerplate reduction                                    | Obscuring generated structure and compile-time behavior                             |

Haskell’s abstraction is powerful because it can separate **data representation**, **behavioral interface**, **effect sequencing**, and **module boundary**. It is dangerous when all of those are abstracted at once. Experienced Haskell programmers often prefer the simplest abstraction that expresses the invariant: a plain ADT before a GADT, a function before a typeclass, an explicit parameter before an effect system, a module boundary before type-level machinery.

### Haskell’s Runtime Personality — high-level semantics, real operational costs

Haskell should not be mistaken for a purely symbolic language detached from runtime costs. GHC compiles Haskell, performs extensive optimization, and runs programs on a managed runtime system with a heap, garbage collector, lightweight threading support, profiling tools, and foreign-function interfaces. But the operational model is distinctive.

| Runtime area        | Haskell-specific issue                                               | Practical consequence                                                    |
| ------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Laziness            | Expressions may become thunks                                        | Memory use can grow if thunks retain large structures                    |
| Sharing             | A computed thunk may be shared                                       | Avoids recomputation but can retain memory                               |
| Strictness          | Values may need explicit forcing                                     | Performance often improves by evaluating earlier or deeper               |
| Data representation | Boxed values are common; unboxed forms exist                         | Numeric and array-heavy code needs representation awareness              |
| GC                  | Allocation-heavy functional code depends on garbage collection       | Allocation profiling matters                                             |
| Fusion              | Compiler may eliminate intermediate structures                       | High-level pipelines can be efficient, but not automatically             |
| Concurrency         | Lightweight threads are cheap compared with OS threads, but not free | Good concurrency design still needs cancellation and resource discipline |
| FFI                 | Foreign calls cross safety and representation boundaries             | Unsafe assumptions can invalidate Haskell-level reasoning                |

This is why Haskell expertise cannot stop at type theory. Part 7 will treat runtime, memory, strictness, evaluation, and concurrency as first-class topics, because a correct Haskell program can still be too slow, too memory hungry, or too difficult to debug.

### Haskell’s Ecosystem Personality — small core, strong libraries, toolchain sensitivity

Haskell’s standard library story is different from Python’s “batteries included” model. The `base` package is central, but much practical work depends on ecosystem packages. Cabal is the standard package/build system, and Hackage is the central package repository infrastructure; Stack remains important in many codebases, especially where curated resolver-based builds are preferred. ([Cabal][3])

| Practical area                  | Common Haskell ecosystem center                | Why it matters                                                       |
| ------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------- |
| Build and dependency management | Cabal, Stack, Hackage, Stackage                | Determines reproducibility, dependency bounds, and project structure |
| Toolchain management            | GHCup                                          | Reduces friction around GHC, Cabal, Stack, and HLS versions          |
| Editor support                  | HLS                                            | Makes type-driven development practical                              |
| Text                            | `text`, `bytestring`                           | Avoids inefficient or semantically wrong use of linked-list `String` |
| Collections                     | `containers`, `vector`, `unordered-containers` | Collection choice affects API and performance                        |
| JSON                            | `aeson`                                        | Central for web and data interchange                                 |
| Testing                         | `hspec`, `tasty`, `QuickCheck`, `Hedgehog`     | Property-based testing fits Haskell’s semantic style                 |
| Concurrency                     | `async`, `stm`                                 | Provides structured concurrency and composable shared-state patterns |
| Effects                         | `mtl`, `transformers`, newer effect libraries  | Shapes application architecture                                      |
| Parsing                         | `parsec`, `megaparsec`, `attoparsec`           | Parser combinators are a natural Haskell strength                    |

The ecosystem rewards reading package documentation, type signatures, and source. It also punishes dependency carelessness: version bounds, GHC compatibility, language extensions, and transitive dependency choices matter.

### Misleading First Impressions — why beginners often misunderstand Haskell

| Misleading impression               | Why it happens                                                       | Better mental model                                                                                      |
| ----------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| “Haskell is only academic”          | Its vocabulary comes from theory, and many examples are mathematical | It is theory-heavy, but practical when used for domains that benefit from strong modeling and pure logic |
| “Haskell is just monads”            | `IO` and `Monad` are heavily discussed                               | Haskell is equally about ADTs, laziness, typeclasses, pattern matching, modules, and runtime behavior    |
| “Types make tests unnecessary”      | The type system catches many errors                                  | Types and tests catch different classes of mistakes                                                      |
| “Lazy means slow”                   | Space leaks are common beginner failures                             | Laziness is a semantic strategy; performance depends on demand, sharing, strictness, and optimization    |
| “Point-free style is more advanced” | Many elegant examples omit arguments                                 | Readability matters; explicit arguments are often better                                                 |
| “If it compiles, it is correct”     | Compiler feedback is unusually strong                                | It may still be partial, inefficient, semantically wrong, or law-breaking                                |
| “`IO` ruins purity”                 | Effectful code looks different from pure code                        | `IO` preserves the boundary by making effects explicit                                                   |
| “Typeclasses are interfaces”        | They both express shared behavior                                    | Typeclasses are resolved through types and should satisfy laws; they are not object subtyping            |

### High-Level Learning Priorities — what to learn now, what to postpone

| Priority | Learn early                                                                    | Reason                                                                   |
| -------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| First    | Functions, currying, pattern matching, ADTs, `Maybe`, `Either`, lists, modules | These are the reading foundation                                         |
| First    | Type signatures and type inference                                             | Types are the main design feedback mechanism                             |
| First    | `Functor`, `Applicative`, `Monad` through use cases                            | These explain ordinary library code                                      |
| First    | Laziness, thunks, strictness basics                                            | Prevents major performance misconceptions                                |
| First    | Cabal/GHCi/HLS workflow                                                        | Tooling affects all real learning                                        |
| Later    | GADTs, type families, `DataKinds`, rank-n types                                | Powerful but not needed for basic fluency                                |
| Later    | Lenses, advanced effect systems, Template Haskell                              | Common in advanced ecosystems, but distracting too early                 |
| Later    | Core, rewrite rules, unboxed types                                             | Important for expert optimization, not first-pass language understanding |
| Later    | Dependent-Haskell frontier                                                     | Intellectually important but not the baseline for application code       |

The correct path is not to memorize every extension. It is to build a stable mental model: **values and types first, effects and composition second, runtime cost third, advanced type machinery only when the design problem demands it.**

### Macro Mental Model for the Rest of the Guide — values, types, effects, evaluation, boundaries

The rest of the tutorial will treat Haskell through five connected questions.

| Question                        | Haskell answer                                            | Main later part |
| ------------------------------- | --------------------------------------------------------- | --------------- |
| What values exist?              | ADTs, records, primitives, collections, functions         | Part 3          |
| What transformations are valid? | Types, typeclasses, pattern matching, total functions     | Parts 3–4       |
| Where do effects happen?        | `IO`, monadic/applicative structure, explicit boundaries  | Part 5          |
| When does computation occur?    | Laziness, demand, strictness, sharing                     | Part 7          |
| How is code maintained?         | Modules, packages, tooling, tests, profiling, conventions | Parts 5–9       |

A compact summary is: **Haskell is a language for designing programs as typed meanings before designing them as machine actions.** That does not make machine behavior irrelevant. It means operational behavior is studied after the semantic structure is made explicit.

## PART 2 — Core Syntax and Semantic Primitives Reference

### Orientation — syntax, semantics, declarations, expressions, layout

Haskell syntax is compact, but it is not casual. A small amount of punctuation can encode function application, type annotation, pattern matching, infix binding, module import, or monadic sequencing. This part therefore treats syntax as a map from surface form to semantic meaning, not as a list of tokens. The uploaded task explicitly requires Part 2 to stay focused on core syntax and primitive semantic constructs, while leaving the full type system, ecosystem, runtime, and task-pattern design for later parts. 

Haskell code is built mainly from **declarations** and **expressions**.

A declaration introduces something: a value, function, type, class, instance, module export, import, fixity rule, or compiler directive.

An expression computes a value. Many constructs that look like “statements” in imperative languages are expressions in Haskell: `if ... then ... else ...`, `case ... of ...`, `let ... in ...`, lambda expressions, function application, list expressions, tuple expressions, and operator applications.

| Surface category     | Example                      | Meaning                           | Practical consequence                                      | Common pitfall                                            |                                     |                                                   |
| -------------------- | ---------------------------- | --------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------- | ------------------------------------------------- |
| Value declaration    | `x = 10`                     | Binds name `x` to value `10`      | Names are immutable bindings, not assignable boxes         | Expecting `x` to be updated later                         |                                     |                                                   |
| Function declaration | `add x y = x + y`            | Binds `add` to a curried function | Multi-argument functions are nested one-argument functions | Thinking Haskell has ordinary tupled arguments by default |                                     |                                                   |
| Type signature       | `add :: Int -> Int -> Int`   | Declares the type of a name       | Documents and constrains design                            | Reading `->` as taking all arguments at once              |                                     |                                                   |
| Type declaration     | `data Color = Red            | Green                             | Blue`                                                      | Defines a new algebraic data type                         | Models finite alternatives directly | Treating constructors as strings or enum integers |
| Local declaration    | `let x = 1 in x + 2`         | Introduces a local binding        | Keeps helper values scoped                                 | Confusing `let` with assignment                           |                                     |                                                   |
| Branch expression    | `if ok then a else b`        | Chooses between two expressions   | Both branches must have the same type                      | Omitting `else` as in statement languages                 |                                     |                                                   |
| Pattern branch       | `case xs of [] -> 0; _ -> 1` | Deconstructs a value by shape     | Branching follows data structure                           | Forgetting incomplete patterns can fail at runtime        |                                     |                                                   |
| Module declaration   | `module M where`             | Names a module                    | Controls namespace and API boundaries                      | Exporting everything accidentally                         |                                     |                                                   |

The first correction for readers coming from imperative languages is this: **Haskell is expression-oriented, but not dynamically loose**. A Haskell expression must have a type, and the type must be consistent with its surrounding context. A branch is not a command block; it is a value-producing expression. A binding is not a variable cell; it is a name for a value or computation.

### Lexical Structure — tokens, whitespace, layout, comments, pragmas

Haskell source code is tokenized into identifiers, operators, literals, keywords, punctuation, comments, and layout. Whitespace often separates tokens, but indentation can also determine syntactic grouping through the **layout rule**.

| Lexical item         | Example                                    | Meaning                              | Design meaning                                    | Practical consequence                                        |                                           |                   |
| -------------------- | ------------------------------------------ | ------------------------------------ | ------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------- | ----------------- |
| Lowercase identifier | `total`, `parseUser`                       | Variable or function name            | Values and functions share one namespace category | Ordinary functions begin lowercase                           |                                           |                   |
| Uppercase identifier | `Maybe`, `Just`, `User`                    | Type constructor or data constructor | Types and constructors are visually distinguished | Data constructors must begin uppercase                       |                                           |                   |
| Symbolic operator    | `+`, `>>=`, `<$>`, `<>`                    | Infix function or constructor        | Operators are ordinary functions with fixity      | Learn precedence or use parentheses                          |                                           |                   |
| Keyword              | `case`, `of`, `let`, `in`, `data`, `where` | Reserved syntax word                 | Core constructs are syntactically fixed           | Cannot use keywords as names                                 |                                           |                   |
| Literal              | `42`, `"hi"`, `'x'`, `3.14`                | Source representation of a value     | Literals are often overloaded by typeclasses      | Numeric literal type depends on context                      |                                           |                   |
| Line comment         | `-- comment`                               | Ignored to end of line               | Lightweight source note                           | `--` begins comment unless part of an operator token context |                                           |                   |
| Block comment        | `{- comment -}`                            | Ignored block; can nest              | Useful for larger disabled sections               | Nested comments are allowed, unlike many languages           |                                           |                   |
| Haddock comment      | `--                                        | `, `-- ^`, `{-                       | ... -}`                                           | Documentation comment                                        | Documentation is attached to declarations | Placement matters |
| Language pragma      | `{-# LANGUAGE OverloadedStrings #-}`       | Compiler extension directive         | GHC Haskell is extension-controlled               | Extensions change accepted syntax and typing behavior        |                                           |                   |
| OPTIONS pragma       | `{-# OPTIONS_GHC -Wall #-}`                | Compiler option for the file         | File-local checking behavior                      | Project-level consistency is better than ad-hoc flags        |                                           |                   |

A small file may begin like this:

```haskell
{-# LANGUAGE OverloadedStrings #-}

module User.Parser
  ( User(..)
  , parseUser
  ) where

import Data.Text (Text)
import qualified Data.Text as T

-- | A simplified user record.
data User = User
  { userName :: Text
  , userAge  :: Int
  }
  deriving (Eq, Show)

parseUser :: Text -> Maybe User
parseUser raw =
  case T.splitOn ":" raw of
    [name, ageText] ->
      case reads (T.unpack ageText) of
        [(age, "")] -> Just (User name age)
        _           -> Nothing
    _ -> Nothing
```

This example already shows several important syntax facts. The module declaration introduces a namespace and export list. The import section controls external names. The record declaration creates both a type constructor `User` and a data constructor `User`. The function `parseUser` has an explicit type signature. `case` expressions branch by value shape. `Maybe User` makes failure visible in the result type.

**Common Pitfalls.** The most common lexical mistake is to treat indentation as decorative. In Haskell, indentation often determines which declarations belong together. Another common mistake is enabling language extensions without understanding what they change. In serious projects, extensions should normally be chosen deliberately, either per file or through a project-wide language edition such as `GHC2021` or `GHC2024`.

### Layout Rule — indentation, explicit braces, semicolons, where-blocks, let-blocks

Haskell permits explicit braces and semicolons, but idiomatic code usually uses indentation. The layout rule inserts virtual braces and semicolons based on indentation after layout-introducing keywords such as `where`, `let`, `do`, and `of`.

| Layout form         | Idiomatic version           | Explicit equivalent             | Meaning                                |
| ------------------- | --------------------------- | ------------------------------- | -------------------------------------- |
| `where` block       | `f x = y where y = x + 1`   | `f x = y where { y = x + 1 }`   | Local declarations after main equation |
| `let` block         | `let x = 1; y = 2 in x + y` | `let { x = 1; y = 2 } in x + y` | Local declarations inside expression   |
| `case` alternatives | `case x of A -> 1; B -> 2`  | `case x of { A -> 1; B -> 2 }`  | Pattern alternatives                   |
| `do` block          | `do x <- action; pure x`    | `do { x <- action; pure x }`    | Sequenced monadic actions              |

A readable layout example:

```haskell
discountedTotal :: [Int] -> Int
discountedTotal prices =
  applyDiscount subtotal
  where
    subtotal = sum prices

    applyDiscount amount
      | amount >= 1000 = amount - 100
      | otherwise      = amount
```

The declarations `subtotal` and `applyDiscount` belong to the `where` block because they are indented under `where` at the same layout level. The guard lines belong to `applyDiscount` because they are indented under that function equation.

A common layout error is this:

```haskell
bad :: Int -> Int
bad x =
  y + 1
  where
  y = x * 2
```

Depending on exact indentation and compiler interpretation, this may fail because `y` is not indented as part of the `where` block in the expected way. The corrected form is:

```haskell
good :: Int -> Int
good x =
  y + 1
  where
    y = x * 2
```

**Failure-first explanation.** The tempting but wrong mental model is that Haskell indentation merely improves readability, as in C-like languages. The surprising behavior is that moving a declaration left or right may change the parsed structure or cause a parse error. The correct semantic explanation is that layout is part of the grammar. The professional rule of thumb is: **align sibling declarations exactly, indent children clearly, and avoid clever layout in dense code.** The boundary changes when explicit braces and semicolons are used, but idiomatic Haskell normally avoids them outside generated code or compact examples.

### Naming Conventions — values, functions, constructors, types, modules, operators

Haskell naming is semantically loaded. The first character of a name often tells whether it names a value-level identifier, a type constructor, or a data constructor.

| Name form            | Example                      | Usually names                                         | Notes                                     |
| -------------------- | ---------------------------- | ----------------------------------------------------- | ----------------------------------------- |
| Lowercase word       | `count`, `parse`, `userName` | Function or value                                     | Ordinary term-level identifiers           |
| Leading underscore   | `_unused`, `_x`              | Intentionally unused or pattern wildcard-like binding | Helps avoid warnings                      |
| Uppercase word       | `User`, `Maybe`, `Just`      | Type constructor or data constructor                  | Types and constructors start uppercase    |
| Apostrophe suffix    | `go'`, `xs'`                 | Variant of a local name                               | Common but should not replace good naming |
| Symbolic operator    | `<$>`, `<>`, `>>=`           | Infix function                                        | Operators are functions with fixity       |
| Constructor operator | `:`, `:+:`, `:*:`            | Infix data constructor                                | Constructor operators must start with `:` |
| Module name          | `Data.Text`, `User.Parser`   | Module namespace                                      | Components are capitalized                |

Examples:

```haskell
countWords :: Text -> Int
countWords input =
  length (T.words input)

data Direction = North | South | East | West

data NonEmpty a = a :| [a]
```

Here `countWords` is a function, `Direction` and `NonEmpty` are type constructors, `North` and `:|` are data constructors, and `Text` names a type imported from `Data.Text`.

Operator naming matters because symbolic functions are not special magical syntax. For example:

```haskell
x + y
(+) x y

xs <> ys
(<>) xs ys
```

The infix and prefix forms are equivalent at the level of function use. Parentheses convert an operator into a prefix function. Backticks convert an ordinary function into an infix operator:

```haskell
div 10 3
10 `div` 3
```

**Common Pitfalls.** Beginners often mistake data constructors for strings or enum labels. `North` is not the text value `"North"`; it is a constructor of type `Direction`. Another common error is excessive operator invention. Haskell permits custom operators, but professional code should reserve them for abstractions where symbolic notation genuinely improves clarity.

### Comments and Documentation — line comments, block comments, Haddock, literate intent

Haskell has ordinary comments and documentation comments. Documentation generation is usually handled through **Haddock**, whose comment forms attach documentation to declarations.

| Form              | Example                   | Use                                    |                                 |
| ----------------- | ------------------------- | -------------------------------------- | ------------------------------- |
| Line comment      | `-- temporary note`       | Local explanation                      |                                 |
| Block comment     | `{- larger comment -}`    | Larger explanation or disabled code    |                                 |
| Preceding Haddock | `--                       | Parse a user.`                         | Documents following declaration |
| Following Haddock | `-- ^ User age in years.` | Documents preceding field or argument  |                                 |
| Block Haddock     | `{-                       | Long module description. -}`           | Larger API documentation        |
| Module Haddock    | At top of module          | Explains module purpose and public API |                                 |

Example:

```haskell
-- | Parse a colon-separated user record.
--
-- Returns 'Nothing' when the input does not have the expected shape.
parseUser :: Text -> Maybe User
parseUser raw = ...
```

Documentation in Haskell should explain **semantic contract**, not merely repeat the type. A bad comment says:

```haskell
-- Takes Text and returns Maybe User.
parseUser :: Text -> Maybe User
```

The type already says that. A useful comment explains failure behavior, accepted format, invariants, or performance assumptions.

```haskell
-- | Parse @name:age@ input.
--
-- The parser rejects missing ages, non-integral ages, and trailing characters.
parseUser :: Text -> Maybe User
```

**Common Pitfalls.** Low-value comments are especially harmful in Haskell because types already carry much of the surface contract. A comment should state what the type does not state: invariants, laws, boundary assumptions, failure behavior, strictness expectations, resource behavior, or compatibility notes.

### Literals — numeric literals, characters, strings, lists, tuples, overloaded literals

Haskell literals look simple, but many are overloaded. Their exact type can be determined by context or defaulting rules.

| Literal form      | Example    | Possible type                                              | Design meaning                                | Common pitfall                                |
| ----------------- | ---------- | ---------------------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| Integer literal   | `42`       | `Int`, `Integer`, `Natural`, other `Num a => a`            | Numeric literals are overloaded               | Assuming `42` always means machine `int`      |
| Floating literal  | `3.14`     | `Float`, `Double`, other `Fractional a => a`               | Fractional literals are typeclass-polymorphic | Accidental defaulting                         |
| Character literal | `'x'`      | `Char`                                                     | Unicode scalar-like character value           | Confusing `Char` with byte                    |
| String literal    | `"hello"`  | `[Char]` by default; often `Text` with `OverloadedStrings` | String syntax may be overloaded               | Misusing linked-list `String` for large text  |
| List literal      | `[1,2,3]`  | `[a]`                                                      | Homogeneous linked list                       | Treating lists as arrays                      |
| Tuple literal     | `(1, "x")` | `(Int, String)` or inferred variants                       | Fixed-size product value                      | Overusing large tuples instead of records     |
| Unit literal      | `()`       | `()`                                                       | Single trivial value                          | Often used when result carries no information |

Numeric examples:

```haskell
small :: Int
small = 42

big :: Integer
big = 10 ^ 100

ratio :: Double
ratio = 0.75
```

The same literal can be used at different numeric types:

```haskell
a :: Int
a = 1

b :: Integer
b = 1

c :: Double
c = 1
```

This is possible because integer literals are interpreted through numeric typeclass machinery. The literal `1` is not initially “an `Int` token”; it is an overloaded numeric expression that can become an `Int`, `Integer`, `Double`, or another numeric type depending on context.

String literals need special care:

```haskell
name1 :: String
name1 = "Ada"

name2 :: Text
name2 = "Ada"        -- usually requires OverloadedStrings
```

Without `OverloadedStrings`, `"Ada"` has type `String`, meaning `[Char]`. With `OverloadedStrings`, string literals can be interpreted through `IsString`, allowing `Text`, `ByteString`, and domain-specific string-like types.

Lists and tuples are also syntactic forms with different meanings:

```haskell
numbers :: [Int]
numbers = [1, 2, 3]

pair :: (Text, Int)
pair = ("Ada", 36)
```

A list is homogeneous and variable-length. A tuple is fixed-size and may contain different types. A list of mixed values like `[1, "x"]` is not valid without wrapping the alternatives in a common type.

**Failure-first explanation.** The tempting but wrong mental model is that Haskell list syntax behaves like JavaScript or Python arrays. The surprising behavior is that `[1, "x"]` is rejected, indexing is not central, and repeated appending can be inefficient. The correct explanation is that Haskell lists are homogeneous linked lists optimized for recursive decomposition and streaming-like consumption, not general-purpose dynamic arrays. The professional rule is: **use lists for simple recursive sequences and producer-consumer pipelines; consider `Vector`, `Text`, `ByteString`, `Map`, or `Set` when representation matters.** The boundary changes in quick scripts, examples, and compiler-optimized list pipelines, where lists can remain appropriate.

### Primitive and Common Built-in Types — Int, Integer, Bool, Char, lists, tuples, unit, function types

Haskell has a small set of ubiquitous types that appear before the full type system is learned.

| Type      | Example values  | Meaning                         | Professional note                                 |
| --------- | --------------- | ------------------------------- | ------------------------------------------------- |
| `Bool`    | `True`, `False` | Boolean truth value             | Use for binary conditions, not rich domain states |
| `Int`     | `0`, `42`, `-1` | Fixed-size machine integer      | Efficient, bounded; overflow behavior matters     |
| `Integer` | `10 ^ 100`      | Arbitrary-precision integer     | Safer for unbounded arithmetic, slower than `Int` |
| `Float`   | `1.0`           | Single-precision floating point | Rarely preferred in ordinary code                 |
| `Double`  | `1.0`           | Double-precision floating point | Common default for floating numeric work          |
| `Char`    | `'a'`           | Character                       | Not the same as byte                              |
| `String`  | `"abc"`         | Type synonym for `[Char]`       | Convenient but often inefficient                  |
| `[a]`     | `[1,2,3]`       | Homogeneous list                | Linked list, not array                            |
| `(a, b)`  | `(1, "x")`      | Pair                            | Product of two values                             |
| `()`      | `()`            | Unit                            | Carries no information                            |
| `a -> b`  | `Int -> Text`   | Function from `a` to `b`        | Function types associate to the right             |

Function types are especially important. The type:

```haskell
Int -> Int -> Int
```

means:

```haskell
Int -> (Int -> Int)
```

It is a function that takes one `Int` and returns another function that takes one `Int` and returns an `Int`.

That is why this works naturally:

```haskell
add :: Int -> Int -> Int
add x y = x + y

addOne :: Int -> Int
addOne = add 1
```

The function `add 1` is not a special partial-call hack. It is the ordinary result of applying a curried function to its first argument.

**Common Pitfalls.** The major pitfall is reading `Int -> Int -> Int` as if it were a two-argument function type in the same sense as C, Java, or Python. Haskell’s source notation makes multi-argument functions convenient, but semantically the curried structure matters. This affects partial application, higher-order functions, operator sections, and API design.

### Type Signatures — annotation, inference, API contracts, local clarity

A type signature has the form:

```haskell
name :: Type
```

Examples:

```haskell
isAdult :: Int -> Bool
isAdult age = age >= 18

initial :: Text -> Maybe Char
initial txt =
  case T.uncons txt of
    Just (c, _) -> Just c
    Nothing     -> Nothing
```

Haskell can infer many types:

```haskell
double x = x * 2
```

The inferred type may be more general than expected:

```haskell
double :: Num a => a -> a
```

This means `double` works for any type `a` that has a `Num` instance. Typeclass constraints appear to the left of `=>`.

| Type syntax                       | Example           | Meaning                                         |
| --------------------------------- | ----------------- | ----------------------------------------------- |
| Simple type                       | `Int`             | Concrete type                                   |
| Function type                     | `Int -> Bool`     | Function from `Int` to `Bool`                   |
| Type variable                     | `a`               | Any type, subject to constraints                |
| Typeclass constraint              | `Num a => a -> a` | Works for any numeric-like `a`                  |
| Type application by juxtaposition | `Maybe Int`       | Type constructor `Maybe` applied to `Int`       |
| List type                         | `[Int]`           | List of `Int`                                   |
| Tuple type                        | `(Text, Int)`     | Pair of `Text` and `Int`                        |
| Unit type                         | `()`              | Type with one ordinary value, also written `()` |

Professional Haskell normally gives top-level functions explicit signatures:

```haskell
normalizeName :: Text -> Text
normalizeName =
  T.toLower . T.strip
```

The signature helps the compiler, but more importantly it helps the reader. It states the intended boundary. Without it, the compiler may infer a type that is technically correct but too general, too constrained, or too obscure for API use.

Local type signatures can also clarify difficult code:

```haskell
total :: [Text] -> Int
total fields =
  let sizes :: [Int]
      sizes = fmap T.length fields
  in sum sizes
```

**Failure-first explanation.** The tempting but wrong mental model is that type annotations are unnecessary because Haskell has inference. The surprising behavior is that omitting signatures can make errors appear far away from their cause, and inferred constraints can leak implementation details. The correct explanation is that type inference is a compiler capability, not a substitute for API design. The professional rule is: **write explicit signatures for exported and top-level definitions; use local signatures when they improve error localization or communicate intent.** The boundary changes for short REPL experiments, tiny local helpers, and point-free definitions whose inferred type is obvious.

### Binding and Immutability — names, values, definitions, no assignment

A Haskell binding associates a name with a value or computation. It does not create a mutable cell.

```haskell
x :: Int
x = 10
```

There is no later assignment to `x`. This is invalid:

```haskell
x = 10
x = 20
```

Multiple equations for the same function are different. They are not reassignment; they are pattern-based definitions of one function:

```haskell
length' :: [a] -> Int
length' []     = 0
length' (_:xs) = 1 + length' xs
```

Here `length'` has two equations, selected by pattern matching on the argument.

| Form             | Example                                    | Meaning                                | Not this                        |
| ---------------- | ------------------------------------------ | -------------------------------------- | ------------------------------- |
| Simple binding   | `x = 10`                                   | Name for a value                       | Variable assignment             |
| Function binding | `f x = x + 1`                              | Name for a function                    | Method mutation                 |
| Pattern binding  | `(a, b) = pair`                            | Destructure value into names           | Runtime object field assignment |
| Local `let`      | `let x = 1 in x + 2`                       | Local expression binding               | Imperative declaration block    |
| `where` binding  | `result = helper x where helper y = y + 1` | Local declaration attached to equation | Post-hoc mutation               |
| Monadic bind     | `x <- action` inside `do`                  | Name result produced by action         | Assignment to existing variable |

The last row is especially important. In a `do` block:

```haskell
main :: IO ()
main = do
  line <- getLine
  putStrLn line
```

The syntax `line <- getLine` does not mutate `line`. It sequences an `IO String` action and binds the produced `String` to the name `line` for the following actions.

**Common Pitfalls.** The phrase “variable” is often misleading in Haskell. A Haskell variable varies in the mathematical sense: it is a name that can stand for a value. It does not usually vary over time as a mutable storage location. Mutable storage exists through constructs such as `IORef`, `STRef`, `MVar`, `TVar`, and mutable arrays, but those are explicit effectful abstractions, not the default meaning of a binding.

### let and where — local declarations, expression scope, helper structure

Haskell has two common ways to introduce local names: `let ... in ...` and `where`.

`let` is an expression form:

```haskell
area :: Double -> Double
area r =
  let piApprox = 3.14159
  in piApprox * r * r
```

`where` attaches declarations to a preceding equation:

```haskell
area :: Double -> Double
area r =
  piApprox * r * r
  where
    piApprox = 3.14159
```

They often express similar ideas but support different reading flows.

| Form                  | Best use                                  | Example                              | Reading direction                     |
| --------------------- | ----------------------------------------- | ------------------------------------ | ------------------------------------- |
| `let ... in ...`      | Local value needed inside an expression   | `let x = f a in g x`                 | Introduce helper before result        |
| `where`               | Helper details supporting a main equation | `result = combine x y where x = ...` | Show main result first, details after |
| Nested `let`          | Small expression-local calculation        | `let n = length xs in n > 0`         | Local and immediate                   |
| Multi-binding `where` | Several helper functions or constants     | `where parse = ...; validate = ...`  | Good for named decomposition          |

Example with both styles:

```haskell
score :: [Int] -> Text
score values =
  let total = sum values
      count = length values
  in describe average
  where
    average =
      if null values
        then 0
        else totalDiv (sum values) (length values)

    totalDiv x y =
      x `div` y
```

This example is intentionally awkward because it shows a real design issue: `total` and `count` inside `let` are not visible inside `where`. The scope of `let` is the expression after `in`; the scope of `where` is the equation it attaches to. A better version keeps related bindings together:

```haskell
score :: [Int] -> Text
score values =
  describe average
  where
    total = sum values
    count = length values

    average =
      if count == 0
        then 0
        else total `div` count
```

**Failure-first explanation.** The tempting but wrong mental model is that `let` and `where` are just two spellings for local assignment. The surprising behavior is that their scopes and reading order differ. The correct explanation is that both introduce immutable local declarations, but `let` is an expression and `where` is attached to declarations or equations. The professional rule is: **use `where` when helper definitions explain a named result; use `let` for small expression-local bindings.** The boundary changes in `do` blocks, where `let` has a special no-`in` form for local pure bindings.

### Scope and Shadowing — lexical scope, local names, imports, hiding

Haskell uses lexical scope. A name is resolved by the structure of the source program, not by runtime call history.

```haskell
outer :: Int
outer =
  let x = 10
  in x + 1
```

The name `x` is visible only inside the expression after `in`.

Shadowing occurs when an inner binding uses the same name as an outer binding:

```haskell
example :: Int
example =
  let x = 10
      y =
        let x = 20
        in x + 1
  in x + y
```

The inner `x` shadows the outer `x` only within its own scope. The result is `10 + 21`.

| Scope source          | Example              | Visibility                                                 |
| --------------------- | -------------------- | ---------------------------------------------------------- |
| Top-level declaration | `x = 1`              | Whole module after dependency analysis                     |
| Function parameter    | `f x = ...`          | Function body/equation                                     |
| Pattern variable      | `Just x -> ...`      | Right-hand side of matching branch                         |
| `let` binding         | `let x = ... in ...` | Expression after `in`, plus mutually recursive local group |
| `where` binding       | `where x = ...`      | Attached equation group                                    |
| Import                | `import Data.Text`   | Module body, subject to import list and qualification      |

Haskell top-level and local binding groups are generally recursive. This means definitions in the same binding group may refer to each other:

```haskell
even' :: Int -> Bool
even' 0 = True
even' n = odd' (n - 1)

odd' :: Int -> Bool
odd' 0 = False
odd' n = even' (n - 1)
```

Local recursive definitions also work:

```haskell
parity :: Int -> Bool
parity n = evenLocal n
  where
    evenLocal 0 = True
    evenLocal k = oddLocal (k - 1)

    oddLocal 0 = False
    oddLocal k = evenLocal (k - 1)
```

**Common Pitfalls.** Shadowing can make code hard to read, especially with short names like `x`, `xs`, `m`, `f`, and `r`. It is common in small local functions, but should not hide important domain names. Another pitfall is assuming imports behave like textual inclusion. Imports bring names into scope; they do not paste source code into the module.

### Equality, Ordering, and Identity — Eq, Ord, structural equality, no general object identity

Haskell does not center programming around object identity. In ordinary code, equality means a value-level comparison defined by an `Eq` instance.

```haskell
(==) :: Eq a => a -> a -> Bool
(/=) :: Eq a => a -> a -> Bool
```

Examples:

```haskell
sameNumber :: Bool
sameNumber = 3 == 3

sameList :: Bool
sameList = [1, 2, 3] == [1, 2, 3]
```

Ordering is provided by `Ord`:

```haskell
compare :: Ord a => a -> a -> Ordering
(<)     :: Ord a => a -> a -> Bool
(<=)    :: Ord a => a -> a -> Bool
(>)     :: Ord a => a -> a -> Bool
(>=)    :: Ord a => a -> a -> Bool
```

| Concept            | Haskell mechanism          | Meaning                                                   | Caveat                                                                      |
| ------------------ | -------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------- |
| Equality           | `Eq`                       | Values can be compared for equality                       | Instance may be custom and should obey laws                                 |
| Ordering           | `Ord`                      | Values have an ordering                                   | Ordering should be consistent with equality                                 |
| Derived equality   | `deriving Eq`              | Compiler generates structural equality                    | Works when fields also have `Eq`                                            |
| Derived ordering   | `deriving Ord`             | Compiler generates constructor/field ordering             | Constructor order affects comparison                                        |
| Reference identity | Not ordinary default model | Haskell values are not usually compared by object address | Some low-level identity-like tools exist, but are not normal modeling tools |

Example:

```haskell
data Status
  = Draft
  | Published
  | Archived
  deriving (Eq, Ord, Show)
```

Here `deriving Eq` makes equal constructors equal:

```haskell
Draft == Draft      -- True
Draft == Published  -- False
```

`deriving Ord` uses constructor order:

```haskell
Draft < Published   -- True
Published < Archived -- True
```

This may or may not be semantically meaningful. If the domain has no real ordering, deriving `Ord` may be a bad API decision even if the compiler permits it.

For records:

```haskell
data User = User
  { userName :: Text
  , userAge  :: Int
  }
  deriving (Eq, Show)
```

Derived equality compares the fields structurally:

```haskell
User "Ada" 36 == User "Ada" 36
```

**Failure-first explanation.** The tempting but wrong mental model from object-oriented languages is that equality must choose between “same object” and “same contents.” In ordinary Haskell, the default modeling question is different: **what does it mean for these values to be equal?** Derived `Eq` usually means structural equality. The surprising issue is not hidden object identity, but whether the chosen `Eq` instance matches the domain. The professional rule is: **derive `Eq` when structural equality is semantically correct; define it manually when domain equality differs; avoid deriving `Ord` unless an ordering is meaningful or needed for containers.** The boundary changes for performance internals, mutable references, stable names, and FFI-related identity-like concerns, but those are not the ordinary equality model.

### Operators and Fixity — infix functions, precedence, associativity, sections

Operators in Haskell are functions. Their readability depends on **fixity**, meaning precedence and associativity.

| Operator form     | Example       | Meaning                                |
| ----------------- | ------------- | -------------------------------------- |
| Infix use         | `x + y`       | Operator applied between two arguments |
| Prefix use        | `(+) x y`     | Same function called prefix            |
| Function as infix | ``x `div` y`` | Ordinary function used infix           |
| Left section      | `(1 +)`       | Function equivalent to `\x -> 1 + x`   |
| Right section     | `(+ 1)`       | Function equivalent to `\x -> x + 1`   |
| Custom fixity     | `infixr 5 :`  | Declares associativity and precedence  |

Examples:

```haskell
incrementAll :: [Int] -> [Int]
incrementAll xs =
  map (+ 1) xs

halve :: Int -> Int
halve x =
  x `div` 2
```

Fixity matters because this:

```haskell
a + b * c
```

parses as:

```haskell
a + (b * c)
```

Function application has very high precedence:

```haskell
f x + y
```

means:

```haskell
(f x) + y
```

not:

```haskell
f (x + y)
```

Function composition is an operator:

```haskell
(.) :: (b -> c) -> (a -> b) -> a -> c
```

Example:

```haskell
clean :: Text -> Text
clean =
  T.toLower . T.strip
```

This means: first `T.strip`, then `T.toLower`.

The application operator `($)` is often used to reduce parentheses:

```haskell
print (sum (map length wordsList))

print $ sum $ map length wordsList
```

The operator `$` has low precedence and right associativity. It does not make code “more functional”; it is mostly a parenthesis-management tool.

**Common Pitfalls.** Overusing operators makes Haskell code opaque. The most dangerous phase is when a learner discovers `<$>`, `<*>`, `>>=`, `=<<`, `>>>`, `<<<`, `<>`, `&`, and lens operators before internalizing ordinary function application. Professional code should treat symbolic density as a readability cost unless the operators are standard in the local abstraction.

### Basic Infix Reference — arithmetic, Boolean logic, comparison, application, composition

The following operators appear frequently enough to recognize early.

| Operator             | Type shape                       | Meaning                     | Example                | Pitfall                                      |    |   |    |                                |
| -------------------- | -------------------------------- | --------------------------- | ---------------------- | -------------------------------------------- | -- | - | -- | ------------------------------ |
| `+`, `-`, `*`        | `Num a => a -> a -> a`           | Numeric operations          | `x + y`                | Numeric type may be inferred unexpectedly    |    |   |    |                                |
| `/`                  | `Fractional a => a -> a -> a`    | Fractional division         | `x / y`                | Not integer division                         |    |   |    |                                |
| `div`, `mod`         | `Integral a => a -> a -> a`      | Integral division/remainder | `x `div` y`            | Behavior with negatives should be understood |    |   |    |                                |
| `==`, `/=`           | `Eq a => a -> a -> Bool`         | Equality/inequality         | `x == y`               | Requires `Eq`                                |    |   |    |                                |
| `<`, `<=`, `>`, `>=` | `Ord a => a -> a -> Bool`        | Ordering                    | `x < y`                | Derived ordering may be arbitrary            |    |   |    |                                |
| `&&`                 | `Bool -> Bool -> Bool`           | Boolean and                 | `a && b`               | Operates on `Bool`, not truthy values        |    |   |    |                                |
| `                    |                                  | `                           | `Bool -> Bool -> Bool` | Boolean or                                   | `a |   | b` | No JavaScript-style truthiness |
| `not`                | `Bool -> Bool`                   | Boolean negation            | `not ok`               | Function, not prefix operator `!`            |    |   |    |                                |
| `.`                  | `(b -> c) -> (a -> b) -> a -> c` | Function composition        | `f . g`                | Reads right to left                          |    |   |    |                                |
| `$`                  | `(a -> b) -> a -> b`             | Low-precedence application  | `f $ g x`              | Can reduce or damage readability             |    |   |    |                                |
| `++`                 | `[a] -> [a] -> [a]`              | List concatenation          | `xs ++ ys`             | Repeated left append is costly               |    |   |    |                                |
| `:`                  | `a -> [a] -> [a]`                | Cons element onto list      | `x : xs`               | Right operand must be a list                 |    |   |    |                                |
| `!!`                 | `[a] -> Int -> a`                | List indexing               | `xs !! n`              | Partial and often inefficient                |    |   |    |                                |
| `<>`                 | `Semigroup a => a -> a -> a`     | Associative combination     | `xs <> ys`             | Meaning depends on type                      |    |   |    |                                |

Haskell has no general truthiness. This is invalid:

```haskell
if xs then "non-empty" else "empty"
```

A list is not a Boolean. The correct version states the condition explicitly:

```haskell
if null xs then "empty" else "non-empty"
```

This is a significant semantic choice. Haskell does not silently coerce values into Boolean conditions. It forces the condition to be a `Bool`.

**Failure-first explanation.** The tempting but wrong mental model from Python or JavaScript is that many values can be used as conditions. The surprising behavior is that empty lists, zero numbers, empty strings, and `Nothing` do not automatically count as false. The correct semantic explanation is that `if` requires a condition of type `Bool`. The professional rule is: **write the predicate explicitly: `null xs`, `x == 0`, `isNothing value`, `T.null text`.** The boundary does not really change in ordinary Haskell; truthiness is deliberately absent.

### Primitive Control Expression: if then else — expression branching, same-type branches, Bool condition

The `if` form is:

```haskell
if condition then expression1 else expression2
```

Example:

```haskell
labelAge :: Int -> Text
labelAge age =
  if age >= 18
    then "adult"
    else "minor"
```

Three rules matter.

First, the condition must be a `Bool`.

Second, both branches must have the same type.

Third, `if` is an expression, so it returns a value.

| Rule                    | Example                          | Consequence                           |
| ----------------------- | -------------------------------- | ------------------------------------- |
| Condition is `Bool`     | `if age >= 18 then ... else ...` | No truthy/falsy coercion              |
| Both branches same type | `then "adult" else "minor"`      | Branch result type is unified         |
| Else required           | `if ok then x else y`            | No statement-style missing branch     |
| Expression form         | `label = if ok then a else b`    | Can appear wherever a value is needed |

Invalid branch mismatch:

```haskell
bad :: Bool -> ???
bad ok =
  if ok
    then "yes"
    else 0
```

The `then` branch has a string-like type and the `else` branch has a numeric type. Haskell rejects this because the entire `if` expression must have one type.

A more domain-appropriate solution is to use an ADT or a common result type:

```haskell
data Answer
  = Yes Text
  | Count Int

good :: Bool -> Answer
good ok =
  if ok
    then Yes "yes"
    else Count 0
```

**Common Pitfalls.** Using nested `if` expressions for rich domain branching often becomes unreadable. For branching by data shape, use pattern matching or `case`. For multiple Boolean conditions, guards may read better. For finite domain states, use ADTs and pattern matching rather than strings or numbers.

### Bottom, undefined, and Error-Producing Expressions — partiality, runtime failure, false confidence

Haskell has expressions that typecheck at almost any type but fail when evaluated. The most famous is:

```haskell
undefined :: a
```

Because `undefined` has type `a`, it can inhabit any type at compile time:

```haskell
temporaryName :: Text
temporaryName = undefined

temporaryCount :: Int
temporaryCount = undefined
```

This does not mean Haskell has a real value of every type. It means `undefined` is a bottom-like expression: if demanded, evaluation fails.

Similarly:

```haskell
error :: String -> a
```

Example:

```haskell
dangerous :: Int -> Int
dangerous x =
  if x >= 0
    then x
    else error "negative input"
```

Partial standard functions also exist:

```haskell
head :: [a] -> a
read :: Read a => String -> a
(!!) :: [a] -> Int -> a
```

They may fail at runtime for some inputs.

| Partial expression/function | Failure condition              | Safer alternative                                                     |
| --------------------------- | ------------------------------ | --------------------------------------------------------------------- |
| `undefined`                 | Always fails when evaluated    | Replace with real implementation before production                    |
| `error msg`                 | Fails when branch is evaluated | Use `Maybe`, `Either`, or a richer error type for recoverable failure |
| `head xs`                   | Empty list                     | Pattern match or use safe helper                                      |
| `tail xs`                   | Empty list                     | Pattern match                                                         |
| `read s`                    | Parse failure                  | Use `readMaybe` or parser                                             |
| `xs !! n`                   | Out-of-range index             | Use safe indexing or better data structure                            |

Example replacement:

```haskell
firstName :: [Text] -> Maybe Text
firstName names =
  case names of
    []    -> Nothing
    x : _ -> Just x
```

**Failure-first explanation.** The tempting but wrong mental model is that if a Haskell expression has type `Text`, it safely produces `Text`. The surprising behavior is that `undefined :: Text` typechecks. The correct explanation is that Haskell’s ordinary type system does not exclude nontermination or runtime failure from bottom-like expressions. The professional rule is: **treat `undefined`, `error`, non-exhaustive patterns, and partial functions as explicit hazards; isolate them during development and remove or wrap them at boundaries.** The boundary changes in tests, prototypes, unreachable-code markers, and internal invariants, but production APIs should not expose ordinary partiality casually.
### Function Definitions — equations, arguments, currying, application, pointful style

A Haskell function definition usually consists of a type signature followed by one or more equations. Part 2 remains focused on syntax and primitive semantics rather than full abstraction design; the task-pattern treatment of functions continues in Part 4. 

```haskell
add :: Int -> Int -> Int
add x y = x + y
```

This definition should be read carefully. `add` is bound to a function. The apparent two-argument form is syntactic convenience over currying. Its type associates to the right:

```haskell
add :: Int -> (Int -> Int)
```

Function application is written by whitespace:

```haskell
add 2 3
```

This parses as:

```haskell
(add 2) 3
```

| Syntax       | Meaning                    | Example               | Practical consequence                        |
| ------------ | -------------------------- | --------------------- | -------------------------------------------- |
| `f x`        | Function application       | `sqrt x`              | Application uses whitespace, not parentheses |
| `f x y`      | Repeated application       | `add 2 3`             | Curried application                          |
| `f (g x)`    | Apply `g x` first          | `length (words text)` | Parentheses group expressions                |
| `(f . g) x`  | Compose then apply         | `(not . null) xs`     | Composition reads right-to-left              |
| `f $ g x`    | Low-precedence application | `print $ sum xs`      | Reduces parentheses                          |
| `\x -> expr` | Lambda function            | `\x -> x + 1`         | Anonymous function                           |

A named function can be written pointfully:

```haskell
normalize :: Text -> Text
normalize input =
  T.toLower (T.strip input)
```

or point-free:

```haskell
normalize :: Text -> Text
normalize =
  T.toLower . T.strip
```

The point-free version works because `T.strip` produces a `Text`, and `T.toLower` consumes a `Text`. The composition operator connects them.

The lambda calculus lens clarifies why this is natural. A Haskell function is not primarily a method attached to an object. It is a value that can be passed, returned, partially applied, and composed. Function application is therefore the central operation.

**Common Pitfalls.** Point-free style is not automatically better. It is concise when it exposes a simple pipeline, but it becomes harmful when arguments carry domain meaning. For example, `\user policy -> canAccess policy user` may be clearer than a dense composition that hides the roles of `user` and `policy`.

### Lambda Expressions and Closures — anonymous functions, lexical capture, higher-order use

A lambda expression creates an anonymous function:

```haskell
\x -> x + 1
```

It can take multiple apparent arguments:

```haskell
\x y -> x + y
```

This is equivalent to a curried function:

```haskell
\x -> \y -> x + y
```

Examples:

```haskell
incrementAll :: [Int] -> [Int]
incrementAll xs =
  map (\x -> x + 1) xs

longerThan :: Int -> [Text] -> [Text]
longerThan n texts =
  filter (\txt -> T.length txt > n) texts
```

A lambda can close over variables from its lexical environment:

```haskell
longerThan :: Int -> [Text] -> [Text]
longerThan n texts =
  filter (\txt -> T.length txt > n) texts
```

The lambda `\txt -> T.length txt > n` uses `n` from the surrounding function. This is a closure. Haskell closures are not special syntax; they follow naturally from lexical scope and first-class functions.

| Form                  | Example                           | Meaning                    | Common use                    |
| --------------------- | --------------------------------- | -------------------------- | ----------------------------- |
| One-argument lambda   | `\x -> x + 1`                     | Anonymous unary function   | Short transformation          |
| Multi-argument lambda | `\x y -> x + y`                   | Curried anonymous function | Local combinator              |
| Lambda with pattern   | `\(x, y) -> x + y`                | Destructure argument       | Tuple or constructor handling |
| Closure               | `\x -> x > threshold`             | Captures local name        | Predicate generation          |
| Named helper          | `where isLarge x = x > threshold` | Equivalent named form      | Better for non-trivial logic  |

Lambda patterns can fail if they are not exhaustive:

```haskell
bad :: Maybe Int -> Int
bad =
  \(Just x) -> x
```

This function crashes if given `Nothing`. A safer version uses `case`:

```haskell
safe :: Maybe Int -> Int
safe value =
  case value of
    Just x  -> x
    Nothing -> 0
```

**Failure-first explanation.** The tempting but wrong mental model is that a lambda argument pattern is always harmless destructuring. The surprising behavior is that `\(Just x) -> x` is partial. The correct explanation is that pattern matching in function arguments can fail unless all possible input shapes are covered. The professional rule is: **use simple variable arguments in lambdas unless the pattern is obviously total; use `case` or named equations for non-trivial alternatives.** The boundary changes when the input type or upstream invariant makes the pattern genuinely impossible to fail, but that invariant should usually be documented or encoded in the type.

### Function Equations and Pattern Matching — multiple clauses, constructor patterns, list patterns

Haskell functions can be defined by multiple equations, each with patterns on the left-hand side.

```haskell
isEmpty :: [a] -> Bool
isEmpty [] = True
isEmpty _  = False
```

The equations are tried in order. The first matching pattern determines the result.

| Pattern             | Example        | Matches                     | Binds                     |
| ------------------- | -------------- | --------------------------- | ------------------------- |
| Variable pattern    | `x`            | Anything                    | Binds value to `x`        |
| Wildcard pattern    | `_`            | Anything                    | Binds nothing             |
| Literal pattern     | `0`, `'a'`     | Specific literal-like value | Nothing                   |
| Constructor pattern | `Just x`       | `Just` value                | Binds inner value to `x`  |
| List empty pattern  | `[]`           | Empty list                  | Nothing                   |
| List cons pattern   | `x : xs`       | Non-empty list              | Head and tail             |
| Tuple pattern       | `(x, y)`       | Pair                        | First and second elements |
| As-pattern          | `whole@(x:xs)` | Whole value and parts       | Binds both                |
| Irrefutable pattern | `~(x, y)`      | Lazy match                  | Delays match failure      |

List recursion is often expressed through `[]` and `(:)`:

```haskell
sumList :: [Int] -> Int
sumList []       = 0
sumList (x : xs) = x + sumList xs
```

Tuple patterns deconstruct fixed-size product values:

```haskell
fullName :: (Text, Text) -> Text
fullName (first, lastName) =
  first <> " " <> lastName
```

Constructor patterns deconstruct ADTs:

```haskell
data LoginResult
  = LoginOk Text
  | LoginFailed Text

message :: LoginResult -> Text
message (LoginOk name) =
  "Welcome, " <> name

message (LoginFailed reason) =
  "Login failed: " <> reason
```

As-patterns keep both the original value and its parts:

```haskell
describeList :: [Int] -> Text
describeList xs@(first : _) =
  "First element exists; total length = " <> showText (length xs)

describeList [] =
  "Empty list"
```

The variable `xs` refers to the whole list, while `first` refers to the head. The example does not use `first`, so a real compiler with warnings enabled may flag it unless replaced with `_`.

**Common Pitfalls.** Pattern order matters. A catch-all pattern placed first makes later clauses unreachable:

```haskell
bad :: [a] -> Bool
bad _  = False
bad [] = True
```

The second equation can never be reached. With warnings enabled, GHC can report redundant or inaccessible patterns. In professional code, warnings should be taken seriously because pattern mistakes often hide real domain errors.

### case Expressions — explicit branching by structure

A `case` expression branches by matching a value against patterns:

```haskell
case expression of
  pattern1 -> result1
  pattern2 -> result2
```

Example:

```haskell
fromMaybeText :: Maybe Text -> Text
fromMaybeText value =
  case value of
    Just txt -> txt
    Nothing  -> ""
```

`case` is an expression. All branches must produce the same type.

| Use case                | Example                                   | Why `case` fits                              |
| ----------------------- | ----------------------------------------- | -------------------------------------------- |
| Deconstruct `Maybe`     | `case m of Just x -> ...; Nothing -> ...` | Handles absence explicitly                   |
| Branch on ADT           | `case status of Draft -> ...`             | Follows domain states                        |
| Deconstruct list        | `case xs of [] -> ...; x:rest -> ...`     | Separates empty and non-empty                |
| Local structural branch | Inside function body                      | More local than multiple top-level equations |
| Nested parsing          | Branch on intermediate result             | Makes failure path explicit                  |

Function equations and `case` are closely related:

```haskell
describe :: Maybe Int -> Text
describe (Just n) = "Number: " <> showText n
describe Nothing  = "No number"
```

can be written as:

```haskell
describe :: Maybe Int -> Text
describe value =
  case value of
    Just n  -> "Number: " <> showText n
    Nothing -> "No number"
```

The equation style is often cleaner when the whole function branches on its argument. `case` is often cleaner when branching happens inside a larger expression.

**Failure-first explanation.** The tempting but wrong mental model is that `case` is just Haskell’s version of `switch`. The surprising difference is that `case` matches data structure, not just scalar labels. The correct explanation is that Haskell patterns deconstruct constructors, tuples, lists, literals, and nested shapes. The professional rule is: **use `case` when local structural branching clarifies the flow; use named equations when the whole function is defined by cases.** The boundary changes when branch logic becomes large; then helper functions or domain-specific eliminators may read better.

### Guards — Boolean refinement of equations

Guards attach Boolean conditions to function equations or case alternatives.

```haskell
classifyAge :: Int -> Text
classifyAge age
  | age < 0   = "invalid"
  | age < 18  = "minor"
  | otherwise = "adult"
```

`otherwise` is simply a name for `True`, conventionally used as the final guard.

| Guard form                     | Example                 | Meaning                           |                                 |
| ------------------------------ | ----------------------- | --------------------------------- | ------------------------------- |
| Simple guard                   | `                       | age < 18 = "minor"`               | Use branch if condition is true |
| Final guard                    | `                       | otherwise = "adult"`              | Catch-all Boolean branch        |
| Pattern plus guard             | `f (Just x)             | x > 0 = ...`                      | Match shape, then refine        |
| Multiple equations with guards | Several guarded clauses | Branch by structure and condition |                                 |

Example combining patterns and guards:

```haskell
describeScore :: Maybe Int -> Text
describeScore Nothing =
  "missing"

describeScore (Just n)
  | n < 0     = "invalid"
  | n >= 90   = "excellent"
  | n >= 60   = "passing"
  | otherwise = "failing"
```

The constructor pattern separates absence from presence. The guards refine the present case.

**Common Pitfalls.** Guards are checked top to bottom. If conditions overlap, the first true guard wins. Another pitfall is using guards where a domain ADT would be clearer. For example, many string-valued status checks often indicate that the domain should have been modeled as a finite sum type.

### Pattern Guards and View-Like Local Matching — readable conditional decomposition

Pattern guards allow matching intermediate results in guards. They are useful when a branch depends on both a condition and a successful structural match.

```haskell
parsePositive :: Text -> Maybe Int
parsePositive txt
  | Just n <- readMaybeText txt
  , n > 0
  = Just n
  | otherwise
  = Nothing
```

This says: if `readMaybeText txt` matches `Just n`, and `n > 0`, return `Just n`; otherwise return `Nothing`.

Pattern guards are more readable than nested `case` expressions when each step is a small filter.

| Style           | Best use                                  | Failure mode                           |
| --------------- | ----------------------------------------- | -------------------------------------- |
| Nested `case`   | Different branches have substantial logic | Can become deeply indented             |
| Guards          | Ordered Boolean conditions                | Can hide complex computation           |
| Pattern guards  | Small successful matches plus conditions  | Can become cryptic if overused         |
| Helper function | Reused or named domain rule               | Too many tiny names can fragment logic |

Example:

```haskell
canEnter :: User -> Event -> Bool
canEnter user event
  | Just age <- userAge user
  , age >= eventMinimumAge event
  = True
  | otherwise
  = False
```

This reads as a concise validation rule: the user must have an age, and that age must satisfy the event minimum.

**Common Pitfalls.** Pattern guards are useful, but they can hide too much control flow if stacked aggressively. Once guards contain several parsing, lookup, and validation steps, a `do` block over `Maybe` or `Either`, or a named validation pipeline, may be clearer.

### Lists and List Syntax — construction, ranges, comprehensions, recursion

Lists are syntactically central in Haskell, but they should not be confused with arrays.

```haskell
empty :: [Int]
empty = []

numbers :: [Int]
numbers = [1, 2, 3]

moreNumbers :: [Int]
moreNumbers = 0 : numbers
```

The list constructor `(:)` adds one element to the front of a list:

```haskell
(:) :: a -> [a] -> [a]
```

The expression:

```haskell
1 : 2 : 3 : []
```

is the same as:

```haskell
[1, 2, 3]
```

Ranges are syntactic sugar:

```haskell
oneToTen :: [Int]
oneToTen = [1..10]

evens :: [Int]
evens = [2,4..20]
```

Because Haskell is lazy, some ranges can be infinite:

```haskell
naturals :: [Integer]
naturals = [0..]
```

This is safe only when consumed finitely:

```haskell
firstTen :: [Integer]
firstTen = take 10 naturals
```

List comprehensions express generation, filtering, and transformation:

```haskell
smallSquares :: [Int]
smallSquares =
  [ x * x | x <- [1..10], even x ]
```

| List syntax    | Example    | Meaning             | Pitfall                              |                                 |
| -------------- | ---------- | ------------------- | ------------------------------------ | ------------------------------- |
| Literal        | `[1,2,3]`  | Finite list         | Homogeneous only                     |                                 |
| Empty          | `[]`       | Empty list          | Often needs type context             |                                 |
| Cons           | `x : xs`   | Prepend element     | Right side must be list              |                                 |
| Concatenation  | `xs ++ ys` | Append lists        | Repeated left append can be costly   |                                 |
| Range          | `[1..10]`  | Enumerated sequence | Floating ranges are risky            |                                 |
| Infinite range | `[1..]`    | Infinite list       | Must be consumed lazily and finitely |                                 |
| Comprehension  | `[f x      | x <- xs, p x]`      | Generate/filter/map                  | Can hide expensive nested loops |

Nested comprehensions resemble nested loops:

```haskell
pairs :: [(Int, Int)]
pairs =
  [ (x, y) | x <- [1..3], y <- [1..3], x < y ]
```

This produces pairs where `x` is less than `y`.

**Failure-first explanation.** The tempting but wrong mental model is that list comprehensions are always cheap declarative notation. The surprising behavior is that nested generators can produce large intermediate lists, and infinite lists can hang if consumed incorrectly. The correct explanation is that lists are lazy linked structures; generation and consumption interact through demand. The professional rule is: **use list syntax for clarity in small or naturally recursive sequence code; switch to `Vector`, streaming libraries, or specialized structures when size, indexing, strictness, or memory behavior matters.** The boundary changes when GHC fusion eliminates intermediate lists, but fusion should not be assumed without profiling or inspection.

### Tuples and Unit — product values, temporary grouping, not domain records

Tuples group a fixed number of values.

```haskell
point :: (Double, Double)
point = (3.0, 4.0)

nameAndAge :: (Text, Int)
nameAndAge = ("Ada", 36)
```

Pattern matching extracts tuple components:

```haskell
distanceFromOrigin :: (Double, Double) -> Double
distanceFromOrigin (x, y) =
  sqrt (x * x + y * y)
```

The unit value `()` carries no information:

```haskell
done :: ()
done = ()
```

In effectful code, `IO ()` means an action whose meaningful result is not a value but the effect itself:

```haskell
main :: IO ()
main =
  putStrLn "Hello"
```

| Type        | Meaning                                    | Good use                                            | Bad use                            |
| ----------- | ------------------------------------------ | --------------------------------------------------- | ---------------------------------- |
| `(a, b)`    | Pair                                       | Small local grouping                                | Public API with unclear fields     |
| `(a, b, c)` | Triple                                     | Temporary internal grouping                         | Domain model with unnamed roles    |
| `()`        | Unit                                       | No information result                               | Placeholder for missing design     |
| `IO ()`     | Effectful action with no meaningful return | Printing, writing, logging, mutating external world | Hiding useful result unnecessarily |

Tuples are structurally convenient but semantically weak. Compare:

```haskell
register :: (Text, Text, Int) -> User
```

with:

```haskell
data Registration = Registration
  { registrationName  :: Text
  , registrationEmail :: Text
  , registrationAge   :: Int
  }

register :: Registration -> User
```

The second version gives names to fields and creates a domain concept. The first version forces readers to remember tuple positions.

**Common Pitfalls.** Tuples are useful for local plumbing, but large tuples in public APIs are a code smell. They make invalid argument order easy and documentation poor. Once a tuple needs explanation, it often wants a record.

### Records and Field Syntax — named fields, construction, access, update

Records are introduced through data declarations with named fields. Full data modeling belongs in Part 3, but the basic syntax is needed for reading code.

```haskell
data User = User
  { userName :: Text
  , userAge  :: Int
  }
```

This creates:

```haskell
User :: Text -> Int -> User
userName :: User -> Text
userAge :: User -> Int
```

Record construction can be positional:

```haskell
ada :: User
ada =
  User "Ada" 36
```

or by field names:

```haskell
ada :: User
ada =
  User
    { userName = "Ada"
    , userAge  = 36
    }
```

Field access uses the generated accessor functions:

```haskell
name :: Text
name =
  userName ada
```

Record update creates a new value with modified fields:

```haskell
olderAda :: User
olderAda =
  ada { userAge = 37 }
```

This is not mutation. The original `ada` remains unchanged. A new `User` value is constructed, reusing unchanged fields semantically.

| Record syntax      | Example                                 | Meaning                                                   |
| ------------------ | --------------------------------------- | --------------------------------------------------------- |
| Declaration        | `data User = User { userName :: Text }` | Define record fields                                      |
| Named construction | `User { userName = "Ada" }`             | Build value by field names                                |
| Field accessor     | `userName user`                         | Read field                                                |
| Record update      | `user { userAge = 37 }`                 | Create modified copy                                      |
| Field punning      | `User { userName }`                     | Use variable with same name as field, extension-dependent |
| Wildcards          | `User {..}`                             | Bring fields into scope, extension-dependent              |

Some record conveniences require GHC extensions, such as `NamedFieldPuns`, `RecordWildCards`, `DuplicateRecordFields`, or newer record-related features. Professional code should avoid assuming all record syntax belongs to Haskell 2010.

**Failure-first explanation.** The tempting but wrong mental model is that record update mutates an object field. The surprising behavior is that `ada { userAge = 37 }` returns a new `User`; it does not alter `ada`. The correct explanation is that Haskell data is immutable by default, and record update is construction syntax. The professional rule is: **treat records as immutable product values; for evolving state, model explicit state transitions or use controlled mutable references in an effect context.** The boundary changes for performance internals, where copying large records and strict fields may require attention.

### Type Constructors and Data Constructors — same spelling, different namespaces, different levels

Haskell distinguishes type-level constructors from value-level data constructors. They can have the same name.

```haskell
data User = User Text Int
```

Here the first `User` is a type constructor. The second `User` is a data constructor.

```haskell
User :: Type
User :: Text -> Int -> User
```

Written informally, the first appears in types; the second appears in expressions.

```haskell
makeUser :: Text -> Int -> User
makeUser name age =
  User name age
```

| Name position                    | Example                | Meaning                  |
| -------------------------------- | ---------------------- | ------------------------ |
| Left of `=` in type declaration  | `data User = ...`      | Type constructor         |
| Right of `=` in type declaration | `... = User Text Int`  | Data constructor         |
| In type signature                | `Text -> User`         | Type constructor         |
| In expression                    | `User "Ada" 36`        | Data constructor         |
| In pattern                       | `User name age -> ...` | Data constructor pattern |

This distinction is essential for reading `Maybe`:

```haskell
data Maybe a = Nothing | Just a
```

`Maybe` is a type constructor. It takes a type argument, such as `Int`, to produce a concrete type `Maybe Int`.

`Nothing` and `Just` are data constructors. They create or pattern-match values.

```haskell
none :: Maybe Int
none = Nothing

some :: Maybe Int
some = Just 3
```

**Common Pitfalls.** Beginners often say “`Maybe` is a value” or “`Just` is a type.” More precisely: `Maybe` lives at the type level; `Just` and `Nothing` live at the value level. GHC extensions can blur and enrich this distinction in advanced type-level programming, but ordinary Haskell code is much easier to read when the levels are kept separate.

### Basic Typeclass Syntax — constraints, deriving, instances as surface forms

Typeclasses are covered deeply later, but their basic syntax appears everywhere.

A constrained type signature has this form:

```haskell
showValue :: Show a => a -> Text
```

The part before `=>` is a constraint. It says that `a` must have a `Show` instance.

```haskell
same :: Eq a => a -> a -> Bool
same x y =
  x == y
```

The operator `(==)` requires `Eq a`, so the function type carries that requirement.

A data type can derive common instances:

```haskell
data Color = Red | Green | Blue
  deriving (Eq, Ord, Show)
```

This asks the compiler to generate instances for equality, ordering, and textual display.

Manual instance syntax looks like this:

```haskell
data User = User
  { userName :: Text
  , userAge  :: Int
  }

instance Show User where
  show user =
    "User(" ++ show (userName user) ++ ")"
```

| Syntax               | Example                        | Meaning                               |
| -------------------- | ------------------------------ | ------------------------------------- |
| Constraint           | `Eq a =>`                      | Required behavior for type variable   |
| Class name           | `Eq`, `Show`, `Ord`            | Interface-like behavioral abstraction |
| Instance             | `instance Show User where ...` | Defines behavior for a type           |
| Deriving             | `deriving (Eq, Show)`          | Compiler-generated instance           |
| Multiple constraints | `(Eq a, Show a) => ...`        | Several required behaviors            |

The useful but incomplete analogy is that typeclasses resemble interfaces. The difference is that a Haskell typeclass instance is not a runtime object method table in the ordinary OO sense, and typeclass design often depends on laws. For example, `Eq` should behave like equality, and `Ord` should be consistent with `Eq`.

**Failure-first explanation.** The tempting but wrong mental model is that deriving an instance is always harmless convenience. The surprising behavior is that `deriving Ord` creates an ordering based on constructor order and field order, which may not match domain meaning. The correct explanation is that deriving is syntax for generating behavior, not a proof that the behavior is semantically appropriate. The professional rule is: **derive only instances whose generated meaning matches the domain; otherwise define manually or avoid exposing the instance.** The boundary changes for internal implementation types where arbitrary ordering is needed for maps, sets, or tests, but public domain types require more care.

### do Notation — sequencing actions, binding results, syntactic desugaring

`do` notation is used for sequencing computations in a monadic context, most visibly `IO`.

```haskell
main :: IO ()
main = do
  putStrLn "What is your name?"
  name <- getLine
  putStrLn ("Hello, " ++ name)
```

This should not be read as ordinary imperative syntax, though it resembles it. The lines are monadic actions sequenced in order. The `<-` form binds the result produced by an action.

| `do` form          | Example            | Meaning                                               |
| ------------------ | ------------------ | ----------------------------------------------------- |
| Action line        | `putStrLn "Hi"`    | Execute/sequences action, ignore result if not needed |
| Bind line          | `name <- getLine`  | Run action and bind produced value                    |
| Pure local binding | `let x = 1`        | Local pure binding, no `in` inside `do`               |
| Final expression   | `pure result`      | Final action determines block result                  |
| Pattern bind       | `(x, y) <- action` | Match action result; can fail depending on monad      |

The basic desugaring intuition is:

```haskell
do
  x <- action
  next x
```

corresponds roughly to:

```haskell
action >>= \x -> next x
```

For `IO`, this means sequencing effectful actions. For `Maybe`, it means short-circuiting on `Nothing`. For `Either e`, it means short-circuiting on `Left e`. The syntax is shared because the underlying abstraction is shared.

Example with `Maybe`:

```haskell
parseUserId :: Text -> Maybe Int
parseUserId txt = do
  raw <- stripPrefixText "user-" txt
  n   <- readMaybeText raw
  pure n
```

If either step returns `Nothing`, the whole result is `Nothing`.

Inside `do`, `let` does not use `in`:

```haskell
main :: IO ()
main = do
  line <- getLine
  let trimmed = trim line
  putStrLn trimmed
```

`let trimmed = trim line` is pure. It does not perform an action; it introduces a local name.

**Common Pitfalls.** The most common mistake is confusing `<-` with assignment. It is not assignment. It binds the result of a monadic action. Another mistake is using `<-` with a pure value:

```haskell
bad = do
  x <- 3
  pure x
```

This is invalid because `3` is not an action. The correct form is:

```haskell
good = do
  let x = 3
  pure x
```

### Basic IO Syntax — main, actions, pure values inside IO

A Haskell executable begins from `main`:

```haskell
main :: IO ()
main =
  putStrLn "Hello"
```

`main` is not a special untyped script body. It is a top-level value of type `IO something`, usually `IO ()`.

Common basic I/O functions include:

| Function    | Approximate type              | Meaning                                             |
| ----------- | ----------------------------- | --------------------------------------------------- |
| `putStrLn`  | `String -> IO ()`             | Print line                                          |
| `print`     | `Show a => a -> IO ()`        | Print showable value                                |
| `getLine`   | `IO String`                   | Read line                                           |
| `readFile`  | `FilePath -> IO String`       | Lazily read file contents                           |
| `writeFile` | `FilePath -> String -> IO ()` | Write file                                          |
| `pure`      | `Applicative f => a -> f a`   | Lift pure value into context                        |
| `return`    | `Monad m => a -> m a`         | Older synonym-like function for pure monadic result |

Example:

```haskell
main :: IO ()
main = do
  putStrLn "Enter a number:"
  line <- getLine
  case readMaybe line of
    Just n  -> print (n + 1)
    Nothing -> putStrLn "Invalid number"
```

The pure calculation `n + 1` happens inside an `IO` block, but the addition itself is still pure. The `IO` block sequences reading and printing.

**Failure-first explanation.** The tempting but wrong mental model is that once code is inside `IO`, everything becomes dynamically effectful and ordinary purity no longer matters. The surprising reality is that pure expressions remain pure even when used inside `IO`. The correct explanation is that `IO` sequences actions, while pure computations can be embedded into those actions. The professional rule is: **keep pure logic in pure functions and let `IO` orchestrate external interaction.** The boundary changes when performance, resource management, or streaming requires more integrated designs, but even then the pure/effectful boundary should remain intentional.

### Basic Module Syntax — module declaration, exports, imports, qualification

A Haskell source file usually defines one module.

```haskell
module User.Parser
  ( User(..)
  , parseUser
  ) where
```

This says the module is named `User.Parser` and exports the listed API.

| Export syntax                | Example            | Meaning                                      |
| ---------------------------- | ------------------ | -------------------------------------------- |
| Export value                 | `parseUser`        | Export function or value                     |
| Export type only             | `User`             | Export type constructor but not constructors |
| Export type and constructors | `User(..)`         | Export type and all constructors/fields      |
| Export selected constructors | `User(User)`       | Export specific constructor                  |
| Export module                | `module Data.Text` | Re-export another module                     |

Imports bring names into scope:

```haskell
import Data.Text (Text)
import qualified Data.Text as T
```

The first import brings `Text` into scope unqualified. The second import brings `Data.Text` functions into scope under the prefix `T`.

```haskell
clean :: Text -> Text
clean =
  T.toLower . T.strip
```

Common import forms:

| Import form        | Example                            | Meaning                         | Use case                         |
| ------------------ | ---------------------------------- | ------------------------------- | -------------------------------- |
| Open import        | `import Data.List`                 | Bring exported names into scope | Small modules, limited ambiguity |
| Explicit import    | `import Data.Text (Text)`          | Import selected names           | Public clarity                   |
| Qualified import   | `import qualified Data.Text as T`  | Use names as `T.name`           | Avoid collisions                 |
| Hiding import      | `import Prelude hiding (readFile)` | Import all except listed names  | Replace default functions        |
| Constructor import | `import M (Type(..))`              | Import type and constructors    | Pattern matching or construction |

Professional code often favors explicit or qualified imports, especially for modules with common names like `map`, `filter`, `length`, `readFile`, `insert`, `lookup`, or `empty`.

**Common Pitfalls.** Exporting constructors with `Type(..)` exposes representation. Sometimes this is correct. But if a module is meant to preserve invariants, constructors should be hidden and smart constructors should be exported instead. For example, an `Email` type should not necessarily expose a constructor that allows invalid email text.

### Prelude — default imports, convenience, hidden assumptions

Most Haskell modules implicitly import `Prelude`, unless disabled or replaced. `Prelude` provides common functions, types, and typeclasses such as `map`, `filter`, `foldr`, `Maybe`, `Either`, `Bool`, `Int`, `Eq`, `Ord`, `Show`, `Functor`, `Applicative`, and `Monad`.

Example functions available from `Prelude`:

| Name              | Role                                    |   |               |
| ----------------- | --------------------------------------- | - | ------------- |
| `map`             | Transform list elements                 |   |               |
| `filter`          | Keep list elements satisfying predicate |   |               |
| `foldr`, `foldl`  | Fold lists                              |   |               |
| `sum`, `product`  | Numeric aggregation                     |   |               |
| `not`, `&&`, `    |                                         | ` | Boolean logic |
| `maybe`, `either` | Eliminate `Maybe` and `Either`          |   |               |
| `fmap`            | Map over a functor                      |   |               |
| `pure`, `<*>`     | Applicative operations                  |   |               |
| `(>>=)`, `(>>)`   | Monad sequencing                        |   |               |
| `show`            | Convert showable value to `String`      |   |               |
| `read`            | Parse from `String`, partial            |   |               |

`Prelude` is convenient, but not neutral. It carries historical choices. Some functions are partial or list-specialized. Some modern projects use alternative preludes or hide specific functions.

Example:

```haskell
import Prelude hiding (readFile)
import qualified Data.Text.IO as TIO
```

This can avoid accidentally using lazy `String` file I/O where strict or text-aware I/O is desired.

**Common Pitfalls.** Treating `Prelude` as the whole standard library creates bad habits. `String`-based functions, partial functions such as `head`, and generic names such as `read` are useful for small examples but can be wrong for production. Professional Haskell often imports more precise modules and hides unsafe or inappropriate defaults.

### Basic Error Syntax — Maybe, Either, exceptions, pattern failure

Haskell has several error-related surface forms and conventions. Full error modeling belongs in Part 5, but the syntax appears early.

`Maybe` expresses optional success:

```haskell
safeHead :: [a] -> Maybe a
safeHead xs =
  case xs of
    []    -> Nothing
    x : _ -> Just x
```

`Either` expresses success or failure with information:

```haskell
parseAge :: Text -> Either Text Int
parseAge txt =
  case readMaybeText txt of
    Just n
      | n >= 0    -> Right n
      | otherwise -> Left "age cannot be negative"
    Nothing ->
      Left "age is not a number"
```

By convention, `Left` usually represents failure and `Right` success.

Exceptions exist, especially in `IO` and runtime failure scenarios, but ordinary domain failure often uses explicit result types.

Pattern failure can also cause runtime errors:

```haskell
badHead :: [a] -> a
badHead (x : _) = x
```

This function has no case for `[]`.

| Mechanism              | Syntax                                      | Use                                          | Risk                              |
| ---------------------- | ------------------------------------------- | -------------------------------------------- | --------------------------------- |
| Optional failure       | `Maybe a`                                   | Missing value, no error detail               | Can lose useful error information |
| Detailed failure       | `Either e a`                                | Recoverable failure with explanation         | Error type design matters         |
| Runtime exception      | `throwIO`, `catch`, implicit I/O exceptions | Operational failure                          | Can become hidden control flow    |
| Partial function       | `head`, `read`, `!!`                        | Quick scripts or trusted invariants          | Runtime crash                     |
| Non-exhaustive pattern | Missing branch                              | Usually a bug unless impossible by invariant | Runtime crash                     |

**Failure-first explanation.** The tempting but wrong mental model is that Haskell has one official error mechanism. The surprising reality is that Haskell has several: typed optional failure, typed error values, exceptions, bottoms, and nontermination. The correct explanation is that each mechanism expresses a different kind of failure. The professional rule is: **use `Maybe` for ordinary absence, `Either` or validation types for recoverable domain errors, exceptions for exceptional operational failures, and avoid partiality in public APIs.** The boundary changes in low-level, performance-sensitive, or internally proven code, but the burden of proof is on the partial code.

### Type Holes and Typed Debugging — compiler-guided development

GHC supports typed holes, written as underscores in expression positions:

```haskell
normalizeAll :: [Text] -> [Text]
normalizeAll xs =
  map _ xs
```

The compiler reports what type the hole must have. In this case, it will indicate that the hole should be a function of type roughly:

```haskell
Text -> Text
```

Then the missing expression might become:

```haskell
normalizeAll :: [Text] -> [Text]
normalizeAll xs =
  map T.strip xs
```

Named holes are also possible:

```haskell
result = _missingFunction input
```

Typed holes are not runtime placeholders. They are compiler-guided development tools.

| Hole form                 | Example            | Use                               |
| ------------------------- | ------------------ | --------------------------------- |
| Anonymous hole            | `_`                | Ask compiler what belongs here    |
| Named hole                | `_parser`          | Track intended missing expression |
| Hole in function argument | `map _ xs`         | Discover needed transformation    |
| Hole in branch            | `case x of A -> _` | Discover branch result type       |
| Hole in composition       | `f . _ . g`        | Discover missing middle function  |

Typed holes reflect Haskell’s type-driven workflow. Instead of guessing APIs from memory, a programmer can ask the compiler what type is required at a point in the program.

**Common Pitfalls.** Holes are development tools, not production code. Another mistake is treating hole messages as magical solutions. A hole tells what type is needed; it does not tell which domain behavior is correct. The compiler can guide construction, but it cannot choose the business rule.

### Basic Deriving and show/read Syntax — representation, debugging, generated behavior

`deriving` asks the compiler to generate standard typeclass instances.

```haskell
data Status
  = Draft
  | Published
  | Archived
  deriving (Eq, Ord, Show, Read)
```

`Show` provides `show`:

```haskell
show Draft
```

`Read` provides parsing through `read`, but `read` is partial:

```haskell
read "Draft" :: Status
```

If the string cannot be parsed, `read` fails at runtime. Safer alternatives such as `readMaybe` are usually preferable.

| Derived class | Gives                  | Common use             | Caveat                                            |
| ------------- | ---------------------- | ---------------------- | ------------------------------------------------- |
| `Eq`          | `(==)`, `(/=)`         | Equality checks        | Structural equality may not match domain equality |
| `Ord`         | ordering comparisons   | Maps, sets, sorting    | Constructor order becomes semantic                |
| `Show`        | `show`                 | Debug display          | Not stable serialization format                   |
| `Read`        | `read`                 | Simple parsing         | Often unsafe and not for external data            |
| `Enum`        | enumeration operations | Small sequential types | Can be partial at bounds                          |
| `Bounded`     | `minBound`, `maxBound` | Finite bounded types   | Only meaningful for some domains                  |

Example:

```haskell
data Priority = Low | Medium | High
  deriving (Eq, Ord, Show, Read, Enum, Bounded)
```

This allows:

```haskell
Low < High
show Medium
[minBound .. maxBound] :: [Priority]
```

But the derived ordering is based on constructor order. If business logic later decides `Urgent` belongs above `High`, the constructor order matters.

**Common Pitfalls.** `Show` output is for debugging unless specifically designed otherwise. It should not be treated as a stable JSON, database, or wire format. `Read` is especially risky for user input. Use real parsers or structured decoders for external data.

### Compiler Directives and Language Extensions — pragmas, editions, warnings

GHC Haskell uses pragmas to control extensions and compiler behavior.

```haskell
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}
{-# OPTIONS_GHC -Wall #-}
```

A language extension changes accepted syntax, typing rules, deriving behavior, or other compiler features. A compiler option changes checking or compilation behavior.

| Directive     | Example                              | Meaning                     |
| ------------- | ------------------------------------ | --------------------------- |
| `LANGUAGE`    | `{-# LANGUAGE OverloadedStrings #-}` | Enable language extension   |
| `OPTIONS_GHC` | `{-# OPTIONS_GHC -Wall #-}`          | Pass option to GHC          |
| `INLINE`      | `{-# INLINE f #-}`                   | Optimization hint           |
| `NOINLINE`    | `{-# NOINLINE f #-}`                 | Prevent inlining            |
| `SPECIALIZE`  | `{-# SPECIALIZE f :: Int -> Int #-}` | Ask for specialized version |
| `DEPRECATED`  | `{-# DEPRECATED old "Use new" #-}`   | Mark API as deprecated      |

Common early extensions include:

| Extension                    | What it changes                                       | Early-use caution                           |
| ---------------------------- | ----------------------------------------------------- | ------------------------------------------- |
| `OverloadedStrings`          | String literals can become `Text`, `ByteString`, etc. | Type ambiguity can appear                   |
| `DeriveGeneric`              | Enables generic deriving support                      | Often used for JSON and generic programming |
| `GeneralizedNewtypeDeriving` | Derive instances through `newtype` representation     | Must preserve intended semantics            |
| `DerivingStrategies`         | Makes deriving method explicit                        | Improves clarity in serious code            |
| `NamedFieldPuns`             | Shorter record field binding                          | Useful but can hide names                   |
| `RecordWildCards`            | Bring many fields into scope                          | Convenient but can obscure dependencies     |

A small file with deliberate extensions:

```haskell
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE DerivingStrategies #-}

module User where

import Data.Text (Text)
import GHC.Generics (Generic)

data User = User
  { userName :: Text
  , userAge  :: Int
  }
  deriving stock (Eq, Show, Generic)
```

`DerivingStrategies` clarifies how deriving is being performed. This is valuable because modern GHC has multiple deriving mechanisms.

**Failure-first explanation.** The tempting but wrong mental model is that extensions are just convenient switches to make code compile. The surprising consequence is that extensions can change language behavior and raise the required knowledge level for every reader of the file. The correct explanation is that GHC extensions are part of the source language selected for that module or project. The professional rule is: **enable extensions deliberately, prefer project consistency, document unusual extensions, and avoid advanced extensions until the design problem justifies them.** The boundary changes for library code, where advanced extensions may be necessary to provide clean APIs to users.

### Reading a Small Haskell Module — putting the primitives together

A compact module can now be read from top to bottom.

```haskell
{-# LANGUAGE OverloadedStrings #-}

module Account
  ( Account
  , mkAccount
  , accountName
  , accountBalance
  , deposit
  ) where

import Data.Text (Text)

data Account = Account
  { accountName    :: Text
  , accountBalance :: Int
  }
  deriving (Eq, Show)

mkAccount :: Text -> Int -> Maybe Account
mkAccount name balance
  | balance < 0 = Nothing
  | otherwise   = Just (Account name balance)

deposit :: Int -> Account -> Maybe Account
deposit amount account
  | amount <= 0 = Nothing
  | otherwise =
      Just account
        { accountBalance = accountBalance account + amount
        }
```

Several primitive ideas are active here.

The export list exposes the type `Account`, but not its constructor. This means outside modules can name the type but cannot directly construct arbitrary `Account` values unless they use exported functions. That helps preserve the invariant that balances should not start negative and deposits should be positive.

The record fields `accountName` and `accountBalance` are exported as accessor functions. The constructor `Account` is not exported, assuming the export list remains as shown.

The function `mkAccount` uses guards to validate input. The result type `Maybe Account` makes possible failure explicit.

The function `deposit` uses record update syntax to create a modified account. It does not mutate the existing account.

The code contains no classes, inheritance, nulls, assignments, or hidden exceptions for ordinary validation failure. Its design style is already recognizably Haskell: define a data representation, hide invalid construction, expose typed functions, and represent recoverable failure in the return type.

**Common Pitfalls.** This style only works if module boundaries are respected. If the constructor is exported as `Account(..)`, outside code can bypass `mkAccount` and create invalid accounts. Syntax and semantics meet at the module boundary: exporting a constructor is not just a convenience; it is a decision about who may construct values directly.

### Part 2 Reference Table — core syntax and primitive semantic recognition

| Construct                  | Syntax                    | Meaning                            | Canonical use                  | Pitfall                                               |                                |
| -------------------------- | ------------------------- | ---------------------------------- | ------------------------------ | ----------------------------------------------------- | ------------------------------ |
| Type signature             | `name :: Type`            | Declares type                      | Top-level APIs                 | Omitting signatures from exported functions           |                                |
| Function equation          | `f x = expr`              | Defines function                   | Pure transformation            | Mistaking arguments for tuple parameters              |                                |
| Lambda                     | `\x -> expr`              | Anonymous function                 | Short local behavior           | Partial lambda patterns                               |                                |
| Application                | `f x`                     | Apply function                     | Ordinary computation           | Adding unnecessary parentheses from other languages   |                                |
| Composition                | `f . g`                   | Apply `g`, then `f`                | Pipelines                      | Obscuring arguments                                   |                                |
| Low-precedence application | `f $ x`                   | Apply without parentheses          | Nested calls                   | Overusing `$` where parentheses are clearer           |                                |
| Local `let`                | `let x = a in b`          | Local declaration in expression    | Small helper                   | Confusing with assignment                             |                                |
| `where`                    | `expr where x = a`        | Helper declarations                | Main equation first            | Misindentation                                        |                                |
| `if`                       | `if c then a else b`      | Boolean branch expression          | Simple binary branch           | Missing `else` or branch type mismatch                |                                |
| `case`                     | `case x of p -> y`        | Pattern branch                     | Structural branching           | Non-exhaustive patterns                               |                                |
| Guards                     | `                         | condition = result`                | Boolean-refined branch         | Ordered conditions                                    | Overlap and unreachable guards |
| List literal               | `[a,b,c]`                 | Homogeneous list                   | Small sequences                | Treating as array                                     |                                |
| Cons                       | `x : xs`                  | Prepend to list                    | Recursive list processing      | Right operand must be list                            |                                |
| Tuple                      | `(x, y)`                  | Fixed product                      | Local grouping                 | Public APIs with unnamed fields                       |                                |
| Record construction        | `T { field = value }`     | Build record                       | Named product values           | Assuming mutation                                     |                                |
| Record update              | `x { field = value }`     | Create modified copy               | Immutable update               | Copy/cost assumptions                                 |                                |
| Typeclass constraint       | `C a => ...`              | Required behavior                  | Generic functions              | Treating as OO inheritance                            |                                |
| Deriving                   | `deriving (Eq, Show)`     | Generate instances                 | Common behavior                | Deriving semantically wrong instances                 |                                |
| `do` notation              | `do x <- action; ...`     | Monadic sequencing                 | `IO`, `Maybe`, `Either`        | Reading `<-` as assignment                            |                                |
| Module declaration         | `module M (...) where`    | Define namespace/API               | File/module boundary           | Exporting constructors accidentally                   |                                |
| Import                     | `import qualified M as X` | Bring names into scope             | Namespace control              | Open imports causing ambiguity                        |                                |
| Extension pragma           | `{-# LANGUAGE X #-}`      | Enable GHC feature                 | Controlled language selection  | Enabling extensions blindly                           |                                |
| Typed hole                 | `_`                       | Ask compiler for needed type       | Type-driven development        | Leaving holes or obeying type without domain judgment |                                |
| Bottom-like expression     | `undefined`, `error`      | Typechecks but fails when demanded | Temporary or impossible states | Believing type alone ensures runtime success          |                                |
## PART 3 — Data, Types, and Modeling Reference by Task Pattern

### Orientation — values, types, constructors, invariants, representation choice

Haskell data modeling begins with a different question from many mainstream languages. The first question is not “which class should own this behavior?” but **what values can exist, which states are valid, and which invalid states should become impossible to represent?** This part follows the uploaded task’s requirement to organize data and type modeling by practical task patterns rather than by a mechanical type-system list. 

The basic modeling vocabulary is small but powerful: algebraic data types, records, `newtype`, type synonyms, parametric polymorphism, typeclasses, type parameters, and explicit failure types such as `Maybe` and `Either`. Advanced GHC Haskell adds GADTs, type families, promoted data kinds, phantom types, and other tools, but professional modeling usually begins with ordinary ADTs and only escalates when the invariant requires stronger machinery.

| Modeling question                                           | Haskell mechanism         | What it gives                                   | Common mistake                                         |
| ----------------------------------------------------------- | ------------------------- | ----------------------------------------------- | ------------------------------------------------------ |
| Is this one value with several fields?                      | Product type / record     | Structured data with named or positional fields | Using large tuples instead of records                  |
| Is this one of several alternatives?                        | Sum type                  | Closed set of variants                          | Encoding variants as strings or integers               |
| Is this an existing representation with a distinct meaning? | `newtype`                 | Type distinction with minimal runtime cost      | Using `type` synonym when safety needs a distinct type |
| Is absence expected?                                        | `Maybe a`                 | Explicit optionality                            | Using partial functions or sentinel values             |
| Can failure explain itself?                                 | `Either e a`              | Typed recoverable failure                       | Throwing exceptions for ordinary validation            |
| Does behavior apply to many types?                          | Typeclass constraint      | Ad-hoc polymorphism                             | Treating typeclasses as OO inheritance                 |
| Does the container shape vary?                              | Higher-kinded abstraction | Generic operations over contexts                | Introducing abstraction before use cases stabilize     |
| Is input untrusted?                                         | Parser/decoder/validator  | Boundary between raw and trusted data           | Treating decoded shape as validated meaning            |
| Is state finite and domain-specific?                        | ADT variants              | Exhaustive pattern matching                     | Using `Text`/`Int` status codes                        |

The design principle is: **choose the representation that makes illegal states hard or impossible to construct, and make remaining uncertainty explicit in the type.**

### Data Modeling Task Map — choosing the right modeling construct

Before discussing individual constructs, it helps to see Haskell’s modeling tools as choices.

| Task                                 | Primary construct/API             | When to use                                           | Design meaning                                         | Pitfall                                                |                                                    |                                        |
| ------------------------------------ | --------------------------------- | ----------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------ | -------------------------------------------------- | -------------------------------------- |
| Define a simple named concept        | `newtype`                         | Same runtime representation, different domain meaning | Separates concepts that would otherwise share one type | Replacing all primitives with wrappers too early       |                                                    |                                        |
| Define structured data               | `data` with fields                | Several values belong together                        | Product type                                           | Exporting constructor when invariants should be hidden |                                                    |                                        |
| Define finite alternatives           | `data A = X                       | Y                                                     | Z`                                                     | Value must be one of known variants                    | Sum type                                           | Using strings for closed domain states |
| Define alternatives with payloads    | `data Result = Ok a               | Err e`                                                | Each case may carry different data                     | Tagged union / variant                                 | Overloading one constructor with too many meanings |                                        |
| Rename a complex type                | `type` synonym                    | Improves readability, no new safety needed            | Alias only                                             | Believing it creates a distinct type                   |                                                    |                                        |
| Represent optional value             | `Maybe a`                         | Missing value is ordinary                             | Explicit absence                                       | Losing diagnostic information                          |                                                    |                                        |
| Represent recoverable failure        | `Either e a`                      | Failure has explanation                               | Typed error channel                                    | Choosing vague `Text` errors everywhere                |                                                    |                                        |
| Represent multiple validation errors | Validation type/library           | Independent checks should accumulate                  | Applicative validation                                 | Using `Either` when all errors are needed              |                                                    |                                        |
| Represent untrusted external data    | Parser/decoder plus internal type | Input may be malformed or semantically invalid        | Boundary validation                                    | Letting raw data leak through system                   |                                                    |                                        |
| Abstract over behavior               | Typeclass                         | Many types share lawful operations                    | Ad-hoc polymorphism                                    | Unlawful or incoherent instances                       |                                                    |                                        |
| Abstract over type shape             | Higher-kinded type parameter      | Same pattern over `Maybe`, list, parser, etc.         | Structural abstraction over contexts                   | Making simple code unreadable                          |                                                    |                                        |

Haskell modeling is not about using the most advanced type-system feature. It is about choosing the lightest representation that preserves the important invariant. `newtype` is often better than a type family. A small ADT is often better than a polymorphic abstraction. A private constructor and smart constructor are often better than a GADT.

### Define Structured Data — product types, records, tuples, field names

A structured domain concept is usually a **product type**: several pieces of information that exist together. In Haskell, this can be written as a positional constructor or as a record.

```haskell
data User = User Text Int
```

This defines a `User` value as a product of `Text` and `Int`. The problem is that the fields are unnamed at use sites. A record is usually clearer:

```haskell
data User = User
  { userName :: Text
  , userAge  :: Int
  }
```

Now the fields carry names, and Haskell generates accessor functions:

```haskell
userName :: User -> Text
userAge  :: User -> Int
```

A structured modeling decision should consider readability, invariants, update patterns, API stability, and whether constructors should be public.

| Option              | Example                         | Best use                      | Strength                               | Cost                                      |
| ------------------- | ------------------------------- | ----------------------------- | -------------------------------------- | ----------------------------------------- |
| Tuple               | `(Text, Int)`                   | Temporary local grouping      | Lightweight, no declaration needed     | Unnamed positions; weak API meaning       |
| Positional ADT      | `User Text Int`                 | Small internal types          | Compact                                | Field roles can become unclear            |
| Record ADT          | `User { userName :: Text }`     | Domain data with named fields | Readable and maintainable              | Record-field namespace and update caveats |
| Abstract record     | Export `User`, hide constructor | Data with invariants          | Prevents invalid external construction | Requires smart constructors/accessors     |
| Strict-field record | `!Int` field                    | Avoid thunk buildup in fields | Better predictable evaluation          | Requires strictness understanding         |

Example with an invariant:

```haskell
module Account
  ( Account
  , mkAccount
  , accountName
  , accountBalance
  , deposit
  ) where

data Account = Account
  { accountName    :: Text
  , accountBalance :: Int
  }
  deriving (Eq, Show)

mkAccount :: Text -> Int -> Maybe Account
mkAccount name balance
  | balance < 0 = Nothing
  | otherwise   = Just (Account name balance)

deposit :: Int -> Account -> Maybe Account
deposit amount account
  | amount <= 0 = Nothing
  | otherwise =
      Just account
        { accountBalance = accountBalance account + amount
        }
```

The module exports the type `Account` but not the constructor `Account`. That means outside code cannot directly construct an account with a negative starting balance. This is an ordinary Haskell technique: use a concrete representation internally, hide the constructor externally, and expose validated construction functions.

**Language-design meaning.** A record is still an algebraic data type. It is not an object with mutable fields. Accessors are functions. Record update constructs a new value.

**Common Pitfalls.** A common mistake is exporting `Account(..)` for convenience and thereby destroying the invariant that `mkAccount` was supposed to enforce. Another mistake is using large tuples in public APIs. If the caller must remember whether `(Text, Text, Int)` means `(name, email, age)` or `(email, name, score)`, the representation is too weak.

### Define Alternatives — sum types, variants, constructors, exhaustive cases

A finite set of alternatives should usually be represented as a sum type.

```haskell
data Status
  = Draft
  | Published
  | Archived
  deriving (Eq, Show)
```

This is better than:

```haskell
status :: Text
status = "published"
```

because the type system knows the legal alternatives. A misspelled string such as `"publshed"` cannot occur if all statuses are constructed through the ADT.

Sum types can also carry payloads:

```haskell
data PaymentMethod
  = CreditCard CardNumber
  | BankTransfer AccountNumber
  | StoreCredit CreditAmount
```

Each alternative has a different structure. Pattern matching then forces code to handle the alternatives explicitly.

```haskell
describePayment :: PaymentMethod -> Text
describePayment method =
  case method of
    CreditCard _    -> "credit card"
    BankTransfer _  -> "bank transfer"
    StoreCredit _   -> "store credit"
```

| Modeling situation            | Good Haskell model         | Avoid             |                     |                                    |
| ----------------------------- | -------------------------- | ----------------- | ------------------- | ---------------------------------- |
| Closed finite states          | `data Status = Draft       | Published         | Archived`           | Free-form `Text`                   |
| Operation result alternatives | `data Result = Success a   | Failure e`        | Magic numeric codes |                                    |
| Domain events                 | `data Event = Created User | Deleted UserId`   | Untyped maps        |                                    |
| Protocol messages             | `data Message = Ping       | Login Credentials | Logout`             | Ad-hoc JSON-like values internally |
| UI state                      | `data Screen = Loading     | Error Text        | Ready Model`        | Multiple loosely related booleans  |

Multiple booleans are often a sign that a sum type is needed. For example:

```haskell
data PageState = PageState
  { isLoading :: Bool
  , hasError  :: Bool
  , hasData   :: Bool
  }
```

This allows invalid combinations such as loading, error, and data all being true at once. A sum type expresses the real state machine more accurately:

```haskell
data PageState
  = Loading
  | Failed Text
  | Ready PageData
```

Now invalid combinations cannot be constructed.

**Failure-first explanation.** The tempting but wrong mental model is that small finite states are simple enough to encode as strings, numbers, or booleans. The surprising bug is that illegal combinations slowly appear: unknown statuses, misspelled tags, two flags set at once, or missing payloads. The correct semantic explanation is that the representation failed to match the domain’s alternatives. The professional rule is: **use sum types for closed alternatives, especially when each case has different data or behavior.** The boundary changes when data crosses an external boundary such as JSON, SQL, or HTTP; there, raw strings may appear temporarily, but they should be parsed into internal ADTs as early as practical.

### Model Product and Sum Together — algebraic data types as domain grammar

Haskell ADTs combine products and sums. A product says “all of these.” A sum says “one of these.” Most domain models need both.

```haskell
data User = User
  { userId    :: UserId
  , userEmail :: Email
  }

data LoginFailure
  = UnknownUser Email
  | WrongPassword UserId
  | AccountLocked UserId

data LoginResult
  = LoginSucceeded User
  | LoginFailed LoginFailure
```

This model expresses several facts directly:

`User` contains both a `UserId` and an `Email`.

`LoginFailure` is one of several alternatives.

`LoginResult` is either a successful user or a failure with a structured reason.

| Algebraic shape   | Informal reading                               | Haskell form          | Example                        |                                        |                       |
| ----------------- | ---------------------------------------------- | --------------------- | ------------------------------ | -------------------------------------- | --------------------- |
| Product           | This and that                                  | `data A = A X Y`      | `User UserId Email`            |                                        |                       |
| Sum               | This or that                                   | `data A = X           | Y`                             | `Draft                                 | Published`            |
| Sum of products   | One variant, each with fields                  | `data A = X X1 X2     | Y Y1`                          | `UnknownUser Email                     | WrongPassword UserId` |
| Recursive ADT     | A value containing smaller values of same type | `data Tree a = Leaf a | Node (Tree a) (Tree a)`        | Syntax trees, folders, nested comments |                       |
| Parameterized ADT | Shape independent of element type              | `data Box a = Box a`  | `Maybe a`, `[a]`, `Either e a` |                                        |                       |

A classic recursive ADT:

```haskell
data Expr
  = Lit Int
  | Add Expr Expr
  | Mul Expr Expr
```

An evaluator follows the data shape:

```haskell
eval :: Expr -> Int
eval expr =
  case expr of
    Lit n     -> n
    Add a b   -> eval a + eval b
    Mul a b   -> eval a * eval b
```

This is Haskell’s natural style for interpreters, ASTs, protocols, and state machines: define the grammar as data, then define functions by pattern matching.

**Interdisciplinary Lens: Type Theory**

What it clarifies: ADTs describe the inhabitants of a type. A product type contains paired information; a sum type contains alternatives.

Language feature involved: `data`, constructors, pattern matching, type signatures.

Practical consequence: domain rules can move from comments and runtime checks into the representation itself.

Limit of the lens: ordinary Haskell ADTs do not automatically prove all semantic properties, such as “this email is deliverable” or “this user is authorized.”

**Common Pitfalls.** The main anti-pattern is under-modeling: representing a rich domain with `Text`, `Int`, `Bool`, and maps because those are easy to parse or store. This pushes domain correctness into scattered runtime checks. The opposite mistake is over-modeling: creating deeply nested ADTs before the domain is understood. Professional Haskell modeling should evolve from observed invariants, not from a desire to make every distinction type-level immediately.

### Use newtype for Domain Distinctions — zero-cost wrapper, semantic separation, deriving

`newtype` creates a distinct type with exactly one constructor and one field.

```haskell
newtype UserId = UserId Int
  deriving (Eq, Ord, Show)

newtype Email = Email Text
  deriving (Eq, Show)
```

Unlike a type synonym, a `newtype` is a real distinct type to the type checker. `UserId` and `Int` are not interchangeable unless explicitly wrapped or unwrapped.

```haskell
findUser :: UserId -> IO (Maybe User)

bad :: IO (Maybe User)
bad =
  findUser 123
```

The call is invalid because `123` is an `Int`-like literal, not a `UserId`. The correct form is:

```haskell
good :: IO (Maybe User)
good =
  findUser (UserId 123)
```

| Tool                      | Example                       | Creates distinct type? | Runtime representation                                        | Use                                                   |
| ------------------------- | ----------------------------- | ---------------------: | ------------------------------------------------------------- | ----------------------------------------------------- |
| Type synonym              | `type UserId = Int`           |                     No | Same as original                                              | Readability only                                      |
| `newtype`                 | `newtype UserId = UserId Int` |                    Yes | Usually same representation after compilation                 | Domain safety                                         |
| Single-constructor `data` | `data UserId = UserId Int`    |                    Yes | Additional runtime wrapping semantics compared with `newtype` | When multiple fields or ordinary data behavior needed |

A type synonym is just an alias:

```haskell
type UserId = Int
type ProductId = Int

deleteUser :: UserId -> IO ()
deleteUser userId = ...
```

Because both aliases are just `Int`, this cannot prevent accidental mixups:

```haskell
productId :: ProductId
productId = 10

deleteUser productId
```

With `newtype`, the mixup is rejected.

```haskell
newtype UserId = UserId Int
newtype ProductId = ProductId Int
```

Now `ProductId` cannot be passed where `UserId` is expected.

`newtype` works especially well for validated or semantically distinct concepts:

```haskell
newtype NonEmptyText = NonEmptyText Text
  deriving (Eq, Show)

mkNonEmptyText :: Text -> Maybe NonEmptyText
mkNonEmptyText txt
  | T.null (T.strip txt) = Nothing
  | otherwise           = Just (NonEmptyText txt)
```

If the constructor is hidden, outside code cannot create invalid `NonEmptyText`.

**Language-design meaning.** `newtype` separates type-level meaning from runtime representation. It gives stronger static distinction without requiring a heavier runtime object model.

**Common Pitfalls.** The most common mistake is using `type` when the domain needs `newtype`. A second mistake is exporting the `newtype` constructor when validation is required. A third is wrapping every primitive too early, producing noisy code before the model stabilizes. Use `newtype` when mixups are plausible or invariants matter.

### Use Type Synonyms for Readability Only — aliases, documentation, no safety boundary

A type synonym gives another name to an existing type.

```haskell
type Name = Text
type Age = Int
```

This may improve readability:

```haskell
register :: Name -> Age -> User
```

But it does not create type safety. `Name` is still `Text`, and `Age` is still `Int`.

```haskell
type Width = Int
type Height = Int

area :: Width -> Height -> Int
area w h = w * h
```

The compiler will not reject swapped values:

```haskell
width :: Width
width = 10

height :: Height
height = 20

area height width
```

This typechecks because both are `Int`.

| Use case                                  | Type synonym appropriate? | Better alternative if not                 |
| ----------------------------------------- | ------------------------: | ----------------------------------------- |
| Simplify a long function type             |                       Yes | Sometimes `newtype` for abstraction       |
| Name a local pair or map type             |                     Often | Record if fields matter                   |
| Distinguish domain identifiers            |                Usually no | `newtype`                                 |
| Enforce validation                        |                        No | Hidden constructor plus smart constructor |
| Improve documentation for internal helper |                       Yes | Keep local and simple                     |
| Public API semantic distinction           |                Usually no | `newtype` or ADT                          |

Example of a reasonable synonym:

```haskell
type HeaderMap = Map Text Text

lookupHeader :: Text -> HeaderMap -> Maybe Text
lookupHeader = Map.lookup
```

This clarifies intent without pretending to enforce a new invariant.

Example where synonym is too weak:

```haskell
type Email = Text

sendWelcome :: Email -> IO ()
sendWelcome email = ...
```

Any `Text` can be passed, including empty strings and invalid addresses. If the program relies on validated emails, use `newtype` with a smart constructor.

```haskell
newtype Email = Email Text

mkEmail :: Text -> Maybe Email
mkEmail txt =
  if looksLikeEmail txt
    then Just (Email txt)
    else Nothing
```

**Failure-first explanation.** The tempting but wrong mental model is that `type Email = Text` gives the compiler knowledge that the text is an email. The surprising behavior is that any `Text` remains acceptable. The correct explanation is that type synonyms are aliases, not wrappers. The professional rule is: **use `type` for readability and `newtype` for semantic distinction.** The boundary changes for very small internal code where the distinction is obvious and validation happens nearby.

### Represent Optional or Missing Values — Maybe, Nothing, Just, absence without null

`Maybe a` represents a value that may be absent.

```haskell
data Maybe a = Nothing | Just a
```

Common uses:

```haskell
lookupUser :: UserId -> Map UserId User -> Maybe User
findEmail :: User -> Maybe Email
safeHead :: [a] -> Maybe a
```

A `Maybe User` is either `Nothing` or `Just user`. The caller must handle both if it wants a plain `User`.

```haskell
displayUser :: Maybe User -> Text
displayUser maybeUser =
  case maybeUser of
    Nothing ->
      "No user found"

    Just user ->
      userName user
```

| Task                       | Maybe usage                                | Example                 |
| -------------------------- | ------------------------------------------ | ----------------------- |
| Lookup may miss            | `Map.lookup key map :: Maybe value`        | User ID not found       |
| Optional field             | `Maybe Email`                              | User may not have email |
| Safe partial operation     | `safeHead :: [a] -> Maybe a`               | Empty list handled      |
| Parse without error detail | `readMaybe :: Read a => String -> Maybe a` | Parse may fail          |
| Conditional construction   | `mkAge :: Int -> Maybe Age`                | Reject invalid age      |

`Maybe` composes well. For example:

```haskell
userCity :: User -> Maybe Text
userCity user = do
  address <- userAddress user
  city    <- addressCity address
  pure city
```

If `userAddress user` is `Nothing`, the whole result is `Nothing`. If `addressCity address` is `Nothing`, the whole result is also `Nothing`.

`Maybe` is better than null because absence appears in the type. A function returning `User` promises a `User`; a function returning `Maybe User` requires the caller to handle absence.

**Language-design meaning.** `Maybe` turns possible absence from a runtime convention into a static type distinction.

**Common Pitfalls.** `Maybe` is too weak when the caller needs to know why something failed. For example, parsing an age may fail because the text is missing, non-numeric, negative, too large, or forbidden by policy. If the reason matters, use `Either` or a domain-specific error type. Another pitfall is immediately destroying the safety of `Maybe` with partial extraction functions or unsafe assumptions.

### Represent Recoverable Failure — Either, domain error types, success and failure channels

`Either e a` represents a result that is either an error of type `e` or a success value of type `a`.

```haskell
data Either e a = Left e | Right a
```

By convention, `Left` is failure and `Right` is success.

```haskell
data RegistrationError
  = EmptyName
  | InvalidEmail Text
  | AgeTooLow Int
  deriving (Eq, Show)

register :: RawRegistration -> Either RegistrationError User
register raw =
  case mkName (rawName raw) of
    Left err ->
      Left err

    Right name ->
      case mkEmail (rawEmail raw) of
        Left err ->
          Left err

        Right email ->
          Right (User name email)
```

The nested form is verbose. `do` notation can sequence `Either` computations:

```haskell
register :: RawRegistration -> Either RegistrationError User
register raw = do
  name  <- mkName (rawName raw)
  email <- mkEmail (rawEmail raw)
  age   <- mkAge (rawAge raw)
  pure (User name email age)
```

If any step returns `Left error`, the whole computation returns that error. If all succeed, the final `User` is returned.

| Failure model          | Use when                          | Example                        | Limitation                                       |
| ---------------------- | --------------------------------- | ------------------------------ | ------------------------------------------------ |
| `Maybe a`              | Failure reason does not matter    | Missing lookup                 | No diagnostic detail                             |
| `Either Text a`        | Simple error message is enough    | Small scripts, simple CLI      | Text errors are hard to inspect programmatically |
| `Either DomainError a` | Failure is part of domain         | Registration, payment, parsing | Error type design takes effort                   |
| Exception              | Operational or unexpected failure | File missing, network failure  | Can become hidden control flow                   |
| Validation applicative | Need all independent errors       | Form validation                | More abstraction needed                          |

A domain error ADT is usually better than unstructured text:

```haskell
data PaymentError
  = CardExpired
  | InsufficientFunds
  | FraudRejected
  | PaymentProviderUnavailable
  deriving (Eq, Show)
```

This lets callers decide behavior by pattern matching:

```haskell
handlePaymentError :: PaymentError -> Text
handlePaymentError err =
  case err of
    CardExpired ->
      "The card has expired."

    InsufficientFunds ->
      "Insufficient funds."

    FraudRejected ->
      "Payment rejected."

    PaymentProviderUnavailable ->
      "Payment provider unavailable."
```

**Failure-first explanation.** The tempting but wrong mental model is that exceptions are the natural way to represent any failure. The surprising cost is that ordinary domain failure becomes invisible in the function type. The correct semantic explanation is that `Either e a` makes recoverable failure part of the API. The professional rule is: **use typed error values when the caller is expected to inspect or recover from failure; reserve exceptions mainly for operational, unexpected, or boundary-level failures.** The boundary changes in application frameworks where exception conventions are established, but internal domain logic usually benefits from typed failure.

### Accumulate Validation Errors — Either versus validation-style types

`Either e a` usually short-circuits. That is good when later steps depend on earlier steps, but not always good for validation. In form validation, independent errors should often accumulate.

Suppose registration requires name, email, and age. With `Either`, the first failure stops the process:

```haskell
validateRegistration :: RawRegistration -> Either RegistrationError Registration
validateRegistration raw = do
  name  <- validateName (rawName raw)
  email <- validateEmail (rawEmail raw)
  age   <- validateAge (rawAge raw)
  pure (Registration name email age)
```

This reports only the first error. For user-facing validation, all independent errors may be more useful.

A validation-style design distinguishes two cases:

| Situation                       | Better abstraction         | Reason                      |
| ------------------------------- | -------------------------- | --------------------------- |
| Step B needs output of step A   | `Either` / `Monad`         | Dependent sequencing        |
| All checks are independent      | Validation / `Applicative` | Can accumulate errors       |
| Stop immediately on fatal error | `Either` or exception      | Later checks not meaningful |
| Need both warnings and result   | Custom result type         | More than success/failure   |

A simplified validation type might look like:

```haskell
data Validation e a
  = Invalid e
  | Valid a
```

Real libraries provide better versions that combine errors through `Semigroup` or `NonEmpty`.

**Interdisciplinary Lens: Category Theory**

What it clarifies: `Applicative` composition can combine independent computations, while `Monad` composition allows later steps to depend on earlier results.

Language feature involved: `Either`, validation types, `Applicative`, `Monad`.

Practical consequence: choose the abstraction based on dependency structure. Use monadic short-circuiting when each step needs the previous value; use applicative validation when independent checks should accumulate errors.

Limit of the lens: category terminology does not decide what error messages are useful, how errors should be localized, or how UI validation should behave.

**Common Pitfalls.** Beginners often use `Either Text a` for all validation. This works mechanically but loses structure and usually reports only one error. Conversely, validation libraries can be overused where dependent parsing is required. The key question is not “which abstraction is more elegant?” but “are the checks independent or dependent?”

### Model Finite Domain States — replacing booleans, strings, and status codes

Finite domain states are one of Haskell’s strongest modeling cases. Use ADTs when a value belongs to a known closed set.

Bad model:

```haskell
data Order = Order
  { orderPaid      :: Bool
  , orderShipped   :: Bool
  , orderCancelled :: Bool
  }
```

This permits unclear or illegal states, such as an order being both shipped and cancelled. A better model:

```haskell
data OrderStatus
  = AwaitingPayment
  | Paid
  | Shipped TrackingNumber
  | Cancelled CancellationReason
```

Now each state is explicit, and states can carry the data relevant to that state.

```haskell
canRefund :: OrderStatus -> Bool
canRefund status =
  case status of
    AwaitingPayment -> False
    Paid            -> True
    Shipped _       -> True
    Cancelled _     -> False
```

| Weak representation      | Problem                              | Better representation   |
| ------------------------ | ------------------------------------ | ----------------------- |
| `Bool` flags             | Invalid combinations                 | Sum type                |
| `Text` status            | Misspellings, unknown states         | ADT with constructors   |
| `Int` status code        | Magic numbers                        | ADT plus parser/encoder |
| Nullable payload fields  | Payload may not match state          | Variant with payload    |
| Multiple optional fields | Unclear which combinations are valid | Sum of records          |

A useful pattern is **variant-specific payloads**:

```haskell
data AccountState
  = Active ActiveAccount
  | Suspended SuspensionReason
  | Closed ClosedAccountInfo
```

Only `Active` carries `ActiveAccount`; only `Suspended` carries `SuspensionReason`. This prevents irrelevant fields from appearing in the wrong state.

**Failure-first explanation.** The tempting but wrong mental model is that three booleans are simpler than a custom type. The surprising bug is that boolean combinations form an accidental state space larger than the real domain. With three booleans, there are eight possible combinations. If the domain has four valid states, half the representable states are invalid. The correct semantic explanation is that the representation failed to encode exclusivity. The professional rule is: **when states are mutually exclusive, use a sum type.** The boundary changes for low-level bit flags or external protocols, where bit patterns may be real data; internally, parse them into a meaningful ADT.

### Model Domain Concepts — smart constructors, private constructors, invariant-preserving APIs

A domain type often needs more than a shape. It needs an invariant. For example, an age should not be negative, an email should not be empty, a percentage should be within a range, and a non-empty list should not be empty.

A simple approach:

```haskell
newtype Age = Age Int
  deriving (Eq, Ord, Show)

mkAge :: Int -> Maybe Age
mkAge n
  | n < 0     = Nothing
  | n > 150   = Nothing
  | otherwise = Just (Age n)
```

This is only safe if the constructor `Age` is hidden outside the module:

```haskell
module Age
  ( Age
  , mkAge
  , unAge
  ) where

newtype Age = Age Int
  deriving (Eq, Ord, Show)

mkAge :: Int -> Maybe Age
mkAge n
  | n < 0     = Nothing
  | n > 150   = Nothing
  | otherwise = Just (Age n)

unAge :: Age -> Int
unAge (Age n) = n
```

Outside the module, callers can use `mkAge`, but they cannot directly write `Age (-10)`.

| Invariant type | Representation                           | Smart constructor result                            | Reason                         |                          |
| -------------- | ---------------------------------------- | --------------------------------------------------- | ------------------------------ | ------------------------ |
| Non-empty text | `newtype NonEmptyText = ...`             | `Maybe NonEmptyText` or `Either Error NonEmptyText` | Empty input can fail           |                          |
| Age            | `newtype Age = Age Int`                  | `Maybe Age`                                         | Range restriction              |                          |
| Percentage     | `newtype Percentage = Percentage Double` | `Maybe Percentage`                                  | Must be within bounds          |                          |
| Email          | `newtype Email = Email Text`             | `Either EmailError Email`                           | Failure reason useful          |                          |
| Non-empty list | `data NonEmpty a = a :                   | [a]`                                                | Direct constructor may be safe | Shape enforces non-empty |

Sometimes the data shape itself enforces the invariant:

```haskell
data NonEmpty a = a :| [a]
```

This type must contain at least one `a`. The first element is required, and the rest may be empty. Unlike `[a]`, it cannot represent an empty list.

```haskell
headNonEmpty :: NonEmpty a -> a
headNonEmpty (x :| _) = x
```

This function is total because the representation guarantees a first element.

**Language-design meaning.** Smart constructors use the module system to connect runtime validation with static trust. Once a value crosses the constructor boundary successfully, internal code can rely on the invariant without rechecking everywhere.

**Common Pitfalls.** A smart constructor is useless if the raw constructor is exported accidentally. Another mistake is returning `Maybe` when the caller needs a reason. `mkEmail :: Text -> Maybe Email` may be too vague; `mkEmail :: Text -> Either EmailError Email` may be better. A third mistake is assuming the invariant remains valid after every operation. All exported functions must preserve the invariant, not just the constructor.

### Choose the Right Collection — list, NonEmpty, Map, Set, Text, ByteString, Vector

Haskell lists are common, but they are not the universal collection. Collection choice is a modeling and performance decision.

| Task                          | Prefer                            | Why                                   | Avoid                              |
| ----------------------------- | --------------------------------- | ------------------------------------- | ---------------------------------- |
| Small recursive sequence      | `[a]`                             | Simple pattern matching and recursion | Assuming efficient random access   |
| Guaranteed non-empty sequence | `NonEmpty a`                      | Removes empty case                    | Using `[a]` plus unsafe `head`     |
| Key-value lookup              | `Map k v` or `HashMap k v`        | Explicit keyed structure              | Association lists for large data   |
| Unique ordered values         | `Set a`                           | Membership and uniqueness             | Lists with repeated `nub`          |
| Textual data                  | `Text`                            | Efficient Unicode text                | Large-scale `[Char]` / `String`    |
| Binary data                   | `ByteString`                      | Efficient bytes                       | `String` for bytes                 |
| Numeric/indexed arrays        | `Vector a`                        | Efficient indexed sequence            | Lists with `!!`                    |
| Streaming data                | Streaming/conduit/pipes libraries | Bounded memory processing             | Loading all data as a list         |
| Optional single value         | `Maybe a`                         | Explicit absence                      | Empty list as maybe-one convention |

Lists are excellent when the natural operation is recursive decomposition:

```haskell
sumList :: [Int] -> Int
sumList []       = 0
sumList (x : xs) = x + sumList xs
```

But they are poor as indexed arrays:

```haskell
third :: [a] -> a
third xs = xs !! 2
```

This is partial and list indexing is linear. A vector-like representation may be better if random access is central.

Maps model lookup:

```haskell
lookupUser :: UserId -> Map UserId User -> Maybe User
lookupUser =
  Map.lookup
```

The result is `Maybe User` because the key may be absent.

Sets model uniqueness:

```haskell
memberTag :: Text -> Set Text -> Bool
memberTag =
  Set.member
```

Text should usually use `Text`, not `String`, in production domain models:

```haskell
data User = User
  { userName  :: Text
  , userEmail :: Email
  }
```

`String` is `[Char]`, which is convenient but often inefficient for large text processing.

**Failure-first explanation.** The tempting but wrong mental model is that because Haskell tutorials use lists everywhere, lists are the default professional collection. The surprising failure is poor performance, partial indexing, excessive memory use, or unclear invariants. The correct explanation is that lists are a simple inductive data structure, not a universal collection abstraction. The professional rule is: **choose the collection that matches the operation: list for recursive sequence, `Map` for lookup, `Set` for uniqueness, `Text` for text, `ByteString` for bytes, `Vector` for indexed dense data.** The boundary changes in small examples, where lists are fine and often clearer.

### Text, String, and ByteString — characters, Unicode text, bytes

Haskell has several string-like types. Confusing them is a common source of bad APIs and poor performance.

| Type              | Meaning            | Best use                                     | Pitfall                                  |
| ----------------- | ------------------ | -------------------------------------------- | ---------------------------------------- |
| `String`          | `[Char]`           | Small examples, simple compatibility         | Inefficient for large text; not bytes    |
| `Text`            | Unicode text       | Most human-readable text                     | Requires `text` package and conversions  |
| Lazy `Text`       | Chunked lazy text  | Large text pipelines                         | Laziness and resource behavior need care |
| `ByteString`      | Bytes              | Binary data, encoded data, network protocols | Not Unicode text by itself               |
| Lazy `ByteString` | Chunked lazy bytes | File/network streaming-ish use               | Lazy I/O caveats                         |
| `ShortByteString` | Compact bytes      | Many small byte sequences                    | Less ergonomic                           |

A domain model should normally distinguish text from bytes:

```haskell
newtype Username = Username Text
newtype PasswordHash = PasswordHash ByteString
```

Textual input from files or network boundaries often begins as bytes and must be decoded:

```haskell
decodeUtf8 :: ByteString -> Text
```

A safe program should care whether decoding can fail. Some APIs replace invalid bytes; others report decoding errors. The right choice depends on boundary trust.

`OverloadedStrings` allows string literals to work with `Text` and other string-like types:

```haskell
{-# LANGUAGE OverloadedStrings #-}

greeting :: Text
greeting = "hello"
```

This is convenient, but it can introduce ambiguity when the expected type is unclear.

**Common Pitfalls.** The major mistake is treating `String`, `Text`, and `ByteString` as interchangeable. They represent different levels: linked list of characters, efficient Unicode text, and raw bytes. Another mistake is storing encoded data as `Text` or human text as raw bytes without a decoding boundary. Professional code should make encoding and decoding explicit at external boundaries.

### Model Unknown or Untrusted Data — raw input, parsing, validation, trusted internal types

External data should not be treated as domain data merely because it has the right shape. JSON, CSV, HTTP parameters, database rows, command-line arguments, and environment variables are all untrusted boundaries.

A useful pattern is:

```haskell
Raw input -> parse/decode -> validate -> domain type
```

Example:

```haskell
data RawUser = RawUser
  { rawName  :: Text
  , rawEmail :: Text
  , rawAge   :: Int
  }

data User = User
  { userName  :: NonEmptyText
  , userEmail :: Email
  , userAge   :: Age
  }

validateUser :: RawUser -> Either UserError User
validateUser raw = do
  name  <- mkNonEmptyText (rawName raw)
  email <- mkEmail (rawEmail raw)
  age   <- mkAge (rawAge raw)
  pure (User name email age)
```

The raw type describes decoded structure. The domain type describes trusted meaning.

| Boundary             | Raw representation          | Validation target                    | Risk if skipped                     |
| -------------------- | --------------------------- | ------------------------------------ | ----------------------------------- |
| JSON request         | Auto-decoded record         | Domain ADTs and `newtype`s           | Invalid business state accepted     |
| CSV file             | `Vector Text` or raw record | Typed fields                         | Parse failures hidden               |
| CLI argument         | `String` / `Text`           | Config type                          | Bad config crashes later            |
| Environment variable | `Maybe String`              | Validated setting                    | Missing or malformed runtime config |
| Database row         | Row type                    | Domain type                          | Stale or invalid persisted state    |
| HTTP parameter       | `Text`                      | Parsed ID, enum, range-limited value | Injection of invalid state          |

This does not mean every program needs two full models for every input. But serious boundary-heavy code benefits from separating **decoded syntax** from **validated domain meaning**.

**Failure-first explanation.** The tempting but wrong mental model is that if JSON decoding succeeds, the data is valid. The surprising bug is that syntactically valid JSON can contain empty names, negative ages, unknown status strings, invalid emails, and inconsistent combinations. The correct explanation is that decoding checks representation shape, not necessarily domain invariants. The professional rule is: **decode external data into a raw structure, validate into domain types, and keep raw values near the boundary.** The boundary changes when using schema-driven validation or smart decoders that directly construct domain values, but the distinction between shape and meaning remains.
### Convert, Parse, Narrow, or Cast Values — explicit conversion, safe parsing, no silent coercion

Haskell generally avoids silent coercion. A value of type `Text` does not automatically become an `Int`; an `Int` does not automatically become a `Double`; a `UserId` newtype does not automatically become an `Int`. This is not inconvenience for its own sake. It protects the boundary between **representation** and **meaning**.

```haskell
newtype UserId = UserId Int
  deriving (Eq, Ord, Show)

parseUserId :: Text -> Maybe UserId
parseUserId txt = do
  n <- readMaybeText txt
  if n > 0
    then Just (UserId n)
    else Nothing
```

The function does three distinct things: reads external text, parses a number, and validates that the number is positive. Haskell encourages keeping those steps visible.

| Task                       | Mechanism                                  | Safety level                     | Failure mode                           | Professional rule                                 |
| -------------------------- | ------------------------------------------ | -------------------------------- | -------------------------------------- | ------------------------------------------------- |
| Numeric conversion         | `fromIntegral`, `realToFrac`               | Medium                           | Range or precision issues              | Use deliberately and annotate when ambiguous      |
| Text parsing               | Parser, `readMaybe`, custom function       | Depends on parser                | Parse failure                          | Prefer safe parsers over partial `read`           |
| Domain wrapping            | `newtype` constructor or smart constructor | High if constructor hidden       | Invalid direct construction if exposed | Hide constructor when invariant matters           |
| Domain unwrapping          | Accessor such as `unUserId`                | Safe but may leak representation | Overexposing internals                 | Expose only when needed                           |
| Unsafe coercion            | `coerce`, unsafe primitives                | Context-dependent / dangerous    | Broken invariants if misused           | Use only when representation equality is intended |
| Typeclass-based conversion | `show`, `toEnum`, `fromEnum`, `read`       | Mixed                            | Partiality or weak semantics           | Avoid partial conversions in public APIs          |

Numeric conversion is explicit:

```haskell
average :: [Int] -> Double
average xs =
  fromIntegral (sum xs) / fromIntegral (length xs)
```

Without `fromIntegral`, integer and fractional arithmetic do not silently mix. This reduces surprising implicit conversions but can create verbose code around numeric APIs.

Parsing should normally be total in the sense that failure is represented:

```haskell
parsePositiveInt :: Text -> Either Text Int
parsePositiveInt txt =
  case readMaybeText txt of
    Nothing ->
      Left "not an integer"

    Just n
      | n <= 0 ->
          Left "must be positive"

      | otherwise ->
          Right n
```

The bad version is:

```haskell
parsePositiveIntBad :: String -> Int
parsePositiveIntBad txt =
  read txt
```

This can crash at runtime on invalid input.

**Failure-first explanation.** The tempting but wrong mental model is that conversion is a boring implementation detail. The surprising bug is that badly designed conversion silently destroys domain guarantees: invalid text becomes runtime exception, `Int` overflow appears later, or a raw ID is accepted as a validated ID. The correct explanation is that conversion crosses a semantic boundary. The professional rule is: **parse external representations into explicit result types, validate into domain types, and keep unsafe or partial conversion out of public APIs.** The boundary changes in internal code where a preceding invariant has already been checked, but that invariant should be local, documented, or encoded in the type.

### Use Parametric Polymorphism — generic functions, type variables, representation independence

Parametric polymorphism lets a function work for all types of a certain shape, without knowing the concrete type.

```haskell
identity :: a -> a
identity x = x

first :: (a, b) -> a
first (x, _) = x

mapMaybe :: (a -> b) -> Maybe a -> Maybe b
mapMaybe f value =
  case value of
    Nothing -> Nothing
    Just x  -> Just (f x)
```

The type variable `a` does not mean “dynamic value.” It means the function must work uniformly for any type chosen by the caller.

| Type                     | What it implies                                       | What implementation can do                         |
| ------------------------ | ----------------------------------------------------- | -------------------------------------------------- |
| `a -> a`                 | Same input and output type, no knowledge of `a`       | Return input, diverge, or use bottom-like behavior |
| `a -> b -> a`            | Return something of first argument type               | Usually return first argument                      |
| `[a] -> Int`             | Can inspect list structure, not elements semantically | Count, test emptiness, traverse                    |
| `(a -> b) -> [a] -> [b]` | Transform elements through provided function          | Cannot invent `b` values except through function   |
| `Maybe a -> Bool`        | Can inspect `Nothing`/`Just`, not inner `a` meaning   | Test presence                                      |

Parametricity is practically useful because it constrains behavior. A function with this type:

```haskell
[a] -> [a]
```

can reorder, drop, duplicate, or preserve elements, but it cannot inspect whether an element is an email, a user, a number, or a password unless additional constraints are present.

A function with this type:

```haskell
a -> Text
```

cannot meaningfully turn arbitrary `a` into text unless it ignores the value, diverges, or uses some unsafe feature. A more honest type would include a constraint:

```haskell
showText :: Show a => a -> Text
```

Now the type says that the function requires a `Show` instance.

**Interdisciplinary Lens: Type Theory**

What it clarifies: a polymorphic type is a contract of uniformity. The less the function knows about `a`, the less it can do with values of type `a`.

Language feature involved: type variables, polymorphic function signatures, typeclass constraints.

Practical consequence: type signatures help predict implementation behavior. Very general types are often easier to reason about.

Limit of the lens: parametricity is weakened by bottoms, `seq`, unsafe operations, typeclass methods, and implementation-specific features.

**Common Pitfalls.** Beginners sometimes treat `a` as if it were like `any` in TypeScript or `Object` in Java. It is not. A value of type `a` cannot be inspected arbitrarily. The type variable is universally quantified: the function must work for all possible `a`, not merely for an unknown runtime type.

### Use Typeclass Constraints — behavioral requirements, ad-hoc polymorphism, lawful interfaces

When a generic function needs behavior from a type, Haskell expresses that need with a typeclass constraint.

```haskell
contains :: Eq a => a -> [a] -> Bool
contains target xs =
  any (\x -> x == target) xs
```

The function works for any `a`, as long as `a` has an `Eq` instance. The constraint appears before `=>`.

| Constraint      | Allows                          | Example use        | Common misuse                                   |
| --------------- | ------------------------------- | ------------------ | ----------------------------------------------- |
| `Eq a`          | Equality comparison             | `x == y`           | Assuming equality is always structural or cheap |
| `Ord a`         | Ordering and ordered containers | `sort`, `Map` keys | Deriving arbitrary order for domain types       |
| `Show a`        | Debug-style string conversion   | `show x`           | Treating `show` as stable serialization         |
| `Read a`        | Parse from `String`             | `readMaybe`        | Using partial `read` on external input          |
| `Num a`         | Numeric operations              | `x + y`            | Overgeneralizing numeric APIs                   |
| `Semigroup a`   | Associative combination         | `x <> y`           | Ignoring expected associativity law             |
| `Monoid a`      | Empty value plus combination    | `mempty`, `<>`     | Choosing a misleading identity                  |
| `Functor f`     | Map inside a context            | `fmap`             | Assuming all containers are lists               |
| `Applicative f` | Combine independent effects     | `pure`, `<*>`      | Using `Monad` when independence matters         |
| `Monad m`       | Dependent sequencing            | `>>=`, `do`        | Treating `Monad` as synonym for side effect     |

A typeclass is best understood as a **named behavioral contract for types**, often with laws that users expect even when the compiler does not prove them.

Example:

```haskell
deduplicate :: Ord a => [a] -> [a]
deduplicate =
  Set.toList . Set.fromList
```

This needs `Ord a` because `Set` uses ordering.

A more constrained function is not always better:

```haskell
badLength :: Foldable t => t a -> Int
badLength = length
```

This is not bad mechanically, but if the API only needs lists and callers expect list-specific behavior, unnecessary generality may make error messages and usage less clear. Generality should serve design, not vanity.

**Failure-first explanation.** The tempting but wrong mental model is that typeclass constraints are like OO interface parameters. The surprising difference is that instances are selected by type, not by passing an object with methods at runtime in the usual OO style. The correct explanation is that a constraint states that a type participates in a global or locally coherent set of operations. The professional rule is: **add constraints only when the implementation needs them; keep public signatures as general as useful, not as general as possible.** The boundary changes in library design, where highly general signatures may be the point.

### Express Behavioral Contracts — Eq, Ord, Show, Semigroup, Monoid, Functor

Some typeclasses are so common that they become part of Haskell’s modeling vocabulary.

```haskell
data Priority = Low | Medium | High
  deriving (Eq, Ord, Show)
```

This declaration gives equality, ordering, and debug display. But each derived instance has semantic consequences.

| Typeclass   | Informal contract                   | Expected law or invariant                   | Practical consequence              | Failure mode                                      |
| ----------- | ----------------------------------- | ------------------------------------------- | ---------------------------------- | ------------------------------------------------- |
| `Eq`        | Values can be compared              | Reflexive, symmetric, transitive equality   | Enables lookup, tests, comparisons | Equality ignores or overuses fields               |
| `Ord`       | Values have total ordering          | Consistent with `Eq`                        | Enables sorting, `Map`, `Set`      | Constructor order becomes accidental domain logic |
| `Show`      | Value can be rendered for debugging | Usually readable, not necessarily parseable | Debug output and logs              | Used as serialization                             |
| `Semigroup` | Values combine associatively        | `(x <> y) <> z = x <> (y <> z)`             | Aggregation and composition        | Non-associative instance breaks expectations      |
| `Monoid`    | `Semigroup` plus empty value        | `mempty <> x = x`, `x <> mempty = x`        | Default aggregation                | Bad identity corrupts folds                       |
| `Functor`   | Structure can be mapped over        | `fmap id = id`, composition law             | Transform inside context           | Mapping changes structure unexpectedly            |

Example `Semigroup` and `Monoid`:

```haskell
newtype Log = Log [Text]
  deriving (Eq, Show)

instance Semigroup Log where
  Log a <> Log b = Log (a <> b)

instance Monoid Log where
  mempty = Log []
```

This is lawful because list concatenation is associative and empty list is identity.

A suspicious instance:

```haskell
newtype Weird = Weird Int

instance Semigroup Weird where
  Weird a <> Weird b = Weird (a - b)
```

Subtraction is not associative, so this violates the expected `Semigroup` law. The compiler accepts it, but generic code relying on associativity may behave unpredictably.

**Interdisciplinary Lens: Category Theory**

What it clarifies: many Haskell typeclasses capture compositional structure and laws. `Semigroup` captures associative combination; `Monoid` adds identity; `Functor` captures structure-preserving mapping.

Language feature involved: typeclasses and instances.

Practical consequence: lawful instances make generic code predictable. Law-breaking instances can typecheck while damaging reasoning.

Limit of the lens: knowing the algebraic law does not automatically determine the right domain semantics. There may be multiple lawful instances for the same representation, such as sum and product for numbers.

**Common Pitfalls.** The compiler checks method types, not laws. An instance can be type-correct and semantically wrong. For public APIs, typeclass instances are commitments. They should not be added merely because deriving is available.

### Choose Between Concrete Type, Type Parameter, and Typeclass Constraint — API specificity

A function signature is a design decision. It decides what callers may pass, what implementation may assume, and how much future flexibility exists.

| Signature style | Example                               | Meaning                      | Best use                                |
| --------------- | ------------------------------------- | ---------------------------- | --------------------------------------- |
| Concrete        | `Text -> Text`                        | Works specifically on `Text` | Domain or representation-specific logic |
| Parametric      | `[a] -> Int`                          | Works for any element type   | Structure-only logic                    |
| Constrained     | `Show a => a -> Text`                 | Works for any showable type  | Needs specific behavior                 |
| Higher-kinded   | `Functor f => (a -> b) -> f a -> f b` | Works over many contexts     | Generic library abstractions            |
| Domain-specific | `Email -> UserId -> Command`          | Uses meaningful types        | Business/domain APIs                    |

Concrete is not inferior. For example:

```haskell
normalizeEmailText :: Text -> Text
normalizeEmailText =
  T.toLower . T.strip
```

This should probably be concrete because text normalization depends on text operations.

A generic version may be inappropriate:

```haskell
normalizeEmailText :: SomeStringLike s => s -> s
```

Unless there is a real need to support multiple string-like types, this is unnecessary complexity.

Parametric is good when behavior truly ignores element type:

```haskell
isSingleton :: [a] -> Bool
isSingleton [_] = True
isSingleton _   = False
```

Constrained is good when behavior requires a capability:

```haskell
renderAll :: Show a => [a] -> [Text]
renderAll =
  fmap (T.pack . show)
```

**Failure-first explanation.** The tempting but wrong mental model is that more general types are always more professional. The surprising cost is worse error messages, harder inference, more constraints leaking into callers, and unclear intent. The correct explanation is that generality is an API tradeoff. The professional rule is: **use concrete types for domain clarity, parametric types for representation-independent logic, and constraints only when behavior is genuinely required.** The boundary changes in reusable libraries, where abstraction is often the product.

### Derive Types from Values and Values from Types — inference, annotations, ambiguous types

Haskell infers types from expressions, and expressions are checked against expected types.

```haskell
x = 1
```

The inferred type may be polymorphic:

```haskell
x :: Num a => a
```

In many contexts, defaulting or surrounding usage chooses a concrete type.

```haskell
xInt :: Int
xInt = 1

xDouble :: Double
xDouble = 1
```

Ambiguity arises when constraints do not determine a concrete type:

```haskell
value = read "123"
```

This is ambiguous because `read` can parse many types. A type annotation fixes it:

```haskell
value :: Int
value = read "123"
```

A safer version:

```haskell
value :: Maybe Int
value = readMaybe "123"
```

| Situation                 | Example                          | Problem                           | Fix                               |
| ------------------------- | -------------------------------- | --------------------------------- | --------------------------------- |
| Ambiguous parse           | `read "1"`                       | Compiler cannot infer target type | Add type annotation               |
| Ambiguous numeric literal | `show 1` in some contexts        | Defaulting may surprise           | Add concrete type if API matters  |
| Overloaded string         | `"abc"` with `OverloadedStrings` | Could be `Text`, `String`, etc.   | Use type signature or context     |
| Polymorphic helper        | `empty = mempty`                 | Type unknown                      | Give local or top-level signature |
| Generic constraints leak  | Inferred API too broad           | Public type unclear               | Write explicit signature          |

Example:

```haskell
emptyName :: Text
emptyName = ""
```

With `OverloadedStrings`, the literal `""` could have many string-like types. The annotation fixes it as `Text`.

Type inference flows through usage:

```haskell
names :: [Text]
names = ["Ada", "Grace"]
```

The list annotation makes each string literal a `Text`, assuming `OverloadedStrings`.

**Common Pitfalls.** Inferred types can be surprising but correct. A top-level function without a signature may expose constraints that reflect implementation details rather than design intent. For example, a function inferred as `MonadReader Config m => ...` may be too abstract for an application boundary. Public functions should have signatures chosen by design, not merely accepted from inference.

### Model Type Safety Boundaries — raw, checked, trusted, unsafe

A robust Haskell program often has layers of trust.

| Layer                    | Example type                             | Meaning                            | Allowed operations          |
| ------------------------ | ---------------------------------------- | ---------------------------------- | --------------------------- |
| Raw external             | `Text`, `ByteString`, JSON value         | Untrusted representation           | Parse, decode, reject       |
| Decoded shape            | `RawUser`                                | Fields have rough structure        | Validate domain constraints |
| Validated domain         | `User`, `Email`, `Age`                   | Invariants are expected to hold    | Business logic              |
| Persisted representation | database row type                        | Stored form may be stale or legacy | Migrate, validate, convert  |
| Unsafe/internal          | constructor, `unsafeCoerce`, FFI pointer | Requires special discipline        | Isolate and review          |

Example:

```haskell
newtype Email = Email Text

mkEmail :: Text -> Either EmailError Email
mkEmail txt =
  if validEmailSyntax txt
    then Right (Email txt)
    else Left (InvalidEmail txt)

sendEmail :: Email -> Message -> IO ()
sendEmail email message =
  ...
```

The function `sendEmail` does not accept raw `Text`. It accepts `Email`. That means validation must occur before sending.

If the constructor `Email` is exported, the boundary is weakened:

```haskell
badEmail :: Email
badEmail = Email ""
```

The type still exists, but the invariant is no longer protected.

| Boundary decision      | Stronger design                            | Weaker design                               |
| ---------------------- | ------------------------------------------ | ------------------------------------------- |
| Constructor visibility | Hide constructor, export smart constructor | Export raw constructor                      |
| Error detail           | `Either EmailError Email`                  | `Maybe Email`                               |
| External parsing       | Parser returns domain type                 | Parser returns raw fields everywhere        |
| Internal APIs          | Accept validated types                     | Accept raw `Text` and revalidate repeatedly |
| Unsafe operation       | One isolated module                        | Scattered unsafe calls                      |

**Failure-first explanation.** The tempting but wrong mental model is that once a `newtype Email` exists, the program is safe. The surprising bug is that exported constructors, unchecked database decoding, or test helpers can create invalid `Email` values. The correct explanation is that type safety depends on both representation and boundary control. The professional rule is: **pair domain types with module boundaries and constructor discipline.** The boundary changes in tests and migration code, but unsafe construction should be visibly isolated.

### Phantom Types — state markers, permissions, phases, compile-time distinctions

A phantom type is a type parameter that appears at the type level but not in the runtime representation.

```haskell
newtype Document state = Document Text
```

The parameter `state` does not appear on the right-hand side. It marks a compile-time distinction.

```haskell
data Draft
data Reviewed
data Published

newtype Document state = Document Text
```

Now functions can express allowed transitions:

```haskell
review :: Document Draft -> Document Reviewed
review (Document txt) =
  Document txt

publish :: Document Reviewed -> Document Published
publish (Document txt) =
  Document txt
```

This prevents publishing a draft directly:

```haskell
bad =
  publish (Document "unfinished" :: Document Draft)
```

The type checker rejects it because `publish` requires `Document Reviewed`.

| Phantom type use | Example                                | Benefit                        | Cost                          |
| ---------------- | -------------------------------------- | ------------------------------ | ----------------------------- |
| Workflow state   | `Document Draft`, `Document Published` | Enforces transition order      | More types and annotations    |
| Permissions      | `Token ReadOnly`, `Token Admin`        | Prevents wrong operation       | Must design capability model  |
| Validation phase | `Input Raw`, `Input Validated`         | Separates raw and checked data | Can become ceremonial         |
| Units of measure | `Quantity Meter`, `Quantity Second`    | Prevents unit mixups           | Needs careful numeric design  |
| Protocol state   | `Connection Open`, `Connection Closed` | Prevents invalid operations    | Harder with dynamic lifetimes |

Phantom types are useful when the distinction matters at compile time but does not need runtime data.

A simpler alternative may be enough:

```haskell
newtype DraftDocument = DraftDocument Text
newtype ReviewedDocument = ReviewedDocument Text
newtype PublishedDocument = PublishedDocument Text
```

This is more verbose but sometimes clearer.

**Common Pitfalls.** Phantom types are easy to overuse. If every minor workflow step becomes a phantom marker, code may become difficult to write and refactor. Use phantom types when they prevent meaningful mistakes, especially around safety, permissions, protocol state, or validation phases. Do not use them merely to appear advanced.

### GADTs for Stronger Case-Specific Types — precise constructors, typed syntax trees, advanced modeling

Generalized algebraic data types, or GADTs, allow constructors to return more specific result types. They are a GHC extension and should be treated as an advanced modeling tool.

Ordinary ADT:

```haskell
data Expr
  = IntLit Int
  | BoolLit Bool
  | Add Expr Expr
  | Equals Expr Expr
```

This permits invalid expressions such as adding booleans unless checked later.

A GADT version can encode the expression result type:

```haskell
{-# LANGUAGE GADTs #-}

data Expr a where
  IntLit  :: Int -> Expr Int
  BoolLit :: Bool -> Expr Bool
  Add     :: Expr Int -> Expr Int -> Expr Int
  Equals  :: Eq a => Expr a -> Expr a -> Expr Bool
```

Now `Add` only accepts integer expressions.

An evaluator can reflect that type:

```haskell
eval :: Expr a -> a
eval expr =
  case expr of
    IntLit n ->
      n

    BoolLit b ->
      b

    Add a b ->
      eval a + eval b

    Equals a b ->
      eval a == eval b
```

| Use case              | Why GADT helps                             | Ordinary alternative             |
| --------------------- | ------------------------------------------ | -------------------------------- |
| Typed AST             | Expression type tracks result type         | Untyped AST plus runtime checker |
| Protocol state        | Operations depend on state marker          | Phantom types or separate types  |
| Existential packaging | Hide some type while preserving operations | Sum type or typeclass wrapper    |
| Typed commands        | Command result type appears in command     | Separate command/result mapping  |
| Proof-like evidence   | Pattern match refines type                 | Runtime checks                   |

**Interdisciplinary Lens: Type Theory**

What it clarifies: GADT constructors can provide evidence that refines type information during pattern matching.

Language feature involved: `GADTs`, typed expression trees, constructor result types.

Practical consequence: some invalid programs can be rejected at construction time rather than during evaluation.

Limit of the lens: GADTs increase complexity and do not remove the need for parsing, error handling, performance reasoning, or clear APIs.

**Failure-first explanation.** The tempting but wrong mental model is that if an invariant is important, it should be encoded with a GADT. The surprising cost is that the API becomes harder to understand, type errors become more difficult, and simple transformations may require more annotations. The correct explanation is that GADTs are for invariants where constructor-specific type information materially improves correctness. The professional rule is: **start with ordinary ADTs; move to GADTs when runtime checks are repetitive, invalid states are costly, and the type-level structure remains readable.** The boundary changes in compiler, interpreter, protocol, and DSL code, where GADTs are often justified.

### Type Families and Associated Types — type-level computation, advanced relationship modeling

Type families allow type-level functions. They are part of advanced GHC Haskell and appear in generic programming, library design, type-level APIs, and associated typeclass design.

A simple associated type example:

```haskell
{-# LANGUAGE TypeFamilies #-}

class Collection c where
  type Element c

  empty  :: c
  insert :: Element c -> c -> c
```

An instance can specify the element type:

```haskell
instance Collection (Set Text) where
  type Element (Set Text) = Text

  empty = Set.empty
  insert = Set.insert
```

This says the element type associated with `Set Text` is `Text`.

| Tool                  | Use                                           | Example idea                     | Cost                     |                               |
| --------------------- | --------------------------------------------- | -------------------------------- | ------------------------ | ----------------------------- |
| Type synonym          | Rename a type                                 | `type UserMap = Map UserId User` | No computation or safety |                               |
| Type family           | Compute a type from another type              | `Element collection`             | More complex errors      |                               |
| Associated type       | Type family inside class                      | Collection element type          | Class design complexity  |                               |
| Functional dependency | Alternative relation between class parameters | `class C a b                     | a -> b`                  | Different inference tradeoffs |
| Data family           | Family of data types                          | Representation varies by index   | Advanced and uncommon    |                               |

Type families are useful when type relationships cannot be expressed cleanly with ordinary parameters. They are also easy to overuse.

Example of a possible design question:

```haskell
class HasId a where
  type Id a
  getId :: a -> Id a
```

Then:

```haskell
data User = User UserId Text
data Product = Product ProductId Text

instance HasId User where
  type Id User = UserId
  getId (User uid _) = uid

instance HasId Product where
  type Id Product = ProductId
  getId (Product pid _) = pid
```

This expresses that each entity type has its own ID type.

A simpler alternative may be plain functions:

```haskell
userId :: User -> UserId
productId :: Product -> ProductId
```

The type-family version is justified only if generic code truly needs `HasId`.

**Common Pitfalls.** Type families can make APIs look elegant to authors and difficult to use for callers. Type errors may mention reduced and unreduced type families, ambiguity, injectivity, or stuck type expressions. Use them when they encode a real type-level relationship that would otherwise be duplicated or unsafe. Avoid them for ordinary application code unless the benefit is clear.

### Kinds and Higher-Kinded Types — types of types, containers, effects, contexts

Just as values have types, types have kinds. Most ordinary concrete types have kind `Type`.

Informally:

```haskell
Int   :: Type
Text  :: Type
Bool  :: Type
```

A type constructor like `Maybe` needs one type argument:

```haskell
Maybe :: Type -> Type
```

After applying it:

```haskell
Maybe Int :: Type
```

Similarly:

```haskell
Either :: Type -> Type -> Type
Either Text :: Type -> Type
Either Text Int :: Type
```

Higher-kinded types are necessary for abstractions over type constructors.

```haskell
class Functor f where
  fmap :: (a -> b) -> f a -> f b
```

Here `f` is not a concrete type like `Int`. It is a type constructor of kind `Type -> Type`, such as `Maybe`, list `[]`, or `Either e`.

| Type expression | Informal kind          | Meaning                                   |
| --------------- | ---------------------- | ----------------------------------------- |
| `Int`           | `Type`                 | Concrete type                             |
| `Maybe`         | `Type -> Type`         | Needs one type argument                   |
| `Maybe Int`     | `Type`                 | Concrete optional integer type            |
| `Either`        | `Type -> Type -> Type` | Needs two type arguments                  |
| `Either Text`   | `Type -> Type`         | Error type fixed, success type still open |
| `[]`            | `Type -> Type`         | List type constructor                     |
| `(->) r`        | `Type -> Type`         | Function-from-`r` context                 |

This explains why `Either Text` can be a `Functor`, but `Either` by itself is not directly a `Functor` in the usual class:

```haskell
fmap (+1) (Right 2 :: Either Text Int)
```

The mapping occurs over the success side, while the error type `Text` is fixed.

**Interdisciplinary Lens: Type Theory**

What it clarifies: kinds classify type constructors. A class like `Functor` is not about containers only; it is about type constructors of the right kind.

Language feature involved: higher-kinded type variables, `Functor`, `Applicative`, `Monad`, `Traversable`.

Practical consequence: many Haskell abstractions operate over contexts such as `Maybe`, lists, parsers, `IO`, and `Either e`.

Limit of the lens: kind-correctness does not imply semantic suitability. A type constructor may have the right kind but a confusing or unlawful instance.

**Common Pitfalls.** Beginners often ask why `Either` is not mapped over both sides by `fmap`. The reason is partly kind shape and partly convention: `Functor` maps the final type parameter. For `Either e`, the `e` is fixed and the success type varies. If both sides need mapping, use functions such as `bimap` from bifunctor-style abstractions.

### Higher-Kinded Modeling — Maybe, Either, list, IO, parser as contexts

Many Haskell types have the shape `Type -> Type`. They can be thought of as contexts around a value.

| Type constructor       | Example             | Context meaning                                  | `fmap` intuition              |
| ---------------------- | ------------------- | ------------------------------------------------ | ----------------------------- |
| `Maybe`                | `Maybe User`        | Value may be absent                              | Transform if present          |
| `[]`                   | `[User]`            | Zero or more values                              | Transform each element        |
| `Either e`             | `Either Error User` | May fail with `e`                                | Transform success             |
| `IO`                   | `IO User`           | Effectful computation producing `User`           | Transform produced result     |
| Parser type            | `Parser User`       | Parser that may consume input and produce `User` | Transform parsed result       |
| Function type `(->) r` | `r -> User`         | Computation depending on environment `r`         | Compose after function result |

Example:

```haskell
fmap userName maybeUser     :: Maybe Text
fmap userName users         :: [Text]
fmap userName ioUser        :: IO Text
fmap userName parserUser    :: Parser Text
```

The same operation shape applies across different contexts: transform the value inside without manually unpacking the context.

This is not merely clever notation. It supports API consistency. Once a programmer recognizes `fmap`, `<*>`, `>>=`, `traverse`, and `foldMap`, many libraries become readable.

**Common Pitfalls.** The container metaphor helps at first but breaks down. `IO a` is not a box containing an `a`; it is an action that can produce an `a`. A function `r -> a` is not a container in the ordinary sense, but it fits the `Functor` shape because a result can be transformed after applying the function. The professional model is “context” or “computational shape,” not literal box.

### Model Reusable Generic Helpers — from concrete helper to polymorphic function

Haskell often begins with a concrete function and generalizes only when the pattern is real.

Concrete:

```haskell
normalizeNames :: [Text] -> [Text]
normalizeNames names =
  fmap normalizeName names
```

More general over element transformation:

```haskell
transformAll :: (a -> b) -> [a] -> [b]
transformAll f xs =
  fmap f xs
```

More general over context:

```haskell
transformContext :: Functor f => (a -> b) -> f a -> f b
transformContext =
  fmap
```

Each step gains generality and loses specificity.

| Version         | Type                                  | Gain                        | Cost                             |
| --------------- | ------------------------------------- | --------------------------- | -------------------------------- |
| Domain-specific | `[Text] -> [Text]`                    | Clear intent                | Less reusable                    |
| Element-generic | `(a -> b) -> [a] -> [b]`              | Works for any list elements | Still list-specific              |
| Context-generic | `Functor f => (a -> b) -> f a -> f b` | Works over many contexts    | Requires typeclass understanding |
| Over-abstracted | Many constraints/extensions           | Very flexible               | Hard to read and infer           |

A professional rule is to generalize along observed axes:

If only the element type varies, use a type variable.

If the required behavior varies, use a typeclass constraint.

If the container/context varies, use a higher-kinded typeclass such as `Functor`, `Foldable`, `Traversable`, `Applicative`, or `Monad`.

If the domain concept does not vary, keep the type concrete.

**Failure-first explanation.** The tempting but wrong mental model is that abstraction should be introduced as early as possible. The surprising failure is code that is hard to read, hard to type, and hard to debug, even though it is “more general.” The correct explanation is that every abstraction hides detail and creates a new concept. The professional rule is: **generalize after duplication reveals a stable pattern, not before.** The boundary changes in library design and educational examples, where exposing the abstraction may be the goal.

### Model Effects in Types — pure values, IO, state, reader, error, parser

Effects can be represented as type constructors. This is one of Haskell’s central modeling ideas.

```haskell
readConfig :: IO Config
parseConfig :: Text -> Either ConfigError Config
lookupSetting :: Key -> Config -> Maybe Value
```

Each type says what kind of computation is involved.

| Type shape     | Meaning                         | Example                    |
| -------------- | ------------------------------- | -------------------------- |
| `a`            | Pure value                      | `Config`                   |
| `Maybe a`      | Optional result                 | `Maybe User`               |
| `Either e a`   | Failure or success              | `Either ParseError Config` |
| `IO a`         | Effectful action producing `a`  | `IO Config`                |
| `Reader env a` | Computation needing environment | `Reader Config Result`     |
| `State s a`    | Computation transforming state  | `State Counter Value`      |
| `Parser a`     | Parser producing `a`            | `Parser User`              |

This gives Haskell APIs a distinctive precision. Compare:

```haskell
loadUser :: UserId -> IO (Either LoadError User)
```

This says the function performs I/O and may produce a domain load error.

A pure lookup might be:

```haskell
lookupUser :: UserId -> UserCache -> Maybe User
```

No `IO` appears because no external effect is needed.

**Language-design meaning.** Haskell separates the kind of computation from the value produced. `IO User`, `Maybe User`, `[User]`, and `Either Error User` all involve `User`, but they mean very different things.

**Common Pitfalls.** A common mistake is allowing `IO` to spread through the program unnecessarily. Once a function has type `IO a`, it becomes harder to test and compose as pure logic. The better pattern is often: keep data transformation pure, put external interaction at the boundary, and let a thin `IO` layer orchestrate the program.

### Make Invalid States Unrepresentable — practical type-driven design

The phrase “make invalid states unrepresentable” is central to Haskell modeling, but it should be applied carefully. It means choosing types so that many impossible or forbidden conditions cannot be constructed.

Weak model:

```haskell
data Booking = Booking
  { startDate :: Day
  , endDate   :: Day
  }
```

This allows `endDate` before `startDate`. Stronger model:

```haskell
data DateRange = DateRange
  { rangeStart :: Day
  , rangeEnd   :: Day
  }

mkDateRange :: Day -> Day -> Maybe DateRange
mkDateRange start end
  | end < start = Nothing
  | otherwise   = Just (DateRange start end)
```

If the constructor is hidden, all `DateRange` values are valid according to this rule.

Another weak model:

```haskell
data PasswordReset = PasswordReset
  { resetToken     :: Text
  , resetConfirmed :: Bool
  , resetUsed      :: Bool
  }
```

Stronger:

```haskell
data ResetTokenState
  = Issued ResetToken
  | Confirmed ResetToken UserId
  | Used UserId
  | Expired
```

The stronger version prevents meaningless combinations.

| Invalid state                           | Weak representation           | Stronger representation                        |
| --------------------------------------- | ----------------------------- | ---------------------------------------------- |
| Empty required name                     | `Text`                        | `NonEmptyText`                                 |
| Negative age                            | `Int`                         | `Age` smart constructor                        |
| Missing required field after validation | `Maybe` everywhere            | Separate raw and validated types               |
| Mutually exclusive statuses             | Multiple `Bool`s              | Sum type                                       |
| Wrong ID passed                         | `Int` for all IDs             | Distinct `newtype`s                            |
| Non-empty list assumed                  | `[a]` plus `head`             | `NonEmpty a`                                   |
| Unauthorized operation                  | Runtime role check everywhere | Permission-indexed type or explicit capability |

**Interdisciplinary Lens: Type Theory**

What it clarifies: a type defines a set of possible inhabitants. A better model reduces the set to values that make sense for the domain.

Language feature involved: ADTs, `newtype`, smart constructors, phantom types, GADTs.

Practical consequence: fewer runtime checks are needed after a value has crossed a trusted boundary.

Limit of the lens: not every invariant is worth encoding statically. Some are dynamic, external, temporal, probabilistic, or too costly to represent in ordinary types.

**Common Pitfalls.** The slogan can be overapplied. Some invalid states depend on database contents, time, permissions, external services, or business rules that change often. Encoding those too deeply into types can make the program rigid. The practical goal is not maximum type cleverness; it is better placement of guarantees.

### Model Recursive Data — trees, expressions, nested structures, termination awareness

Recursive ADTs define values in terms of smaller values of the same type.

```haskell
data Tree a
  = Leaf a
  | Branch (Tree a) (Tree a)
```

Functions over recursive data usually follow the data shape:

```haskell
treeSize :: Tree a -> Int
treeSize tree =
  case tree of
    Leaf _ ->
      1

    Branch left right ->
      treeSize left + treeSize right
```

Expression trees are another common example:

```haskell
data Expr
  = Lit Int
  | Add Expr Expr
  | Neg Expr

eval :: Expr -> Int
eval expr =
  case expr of
    Lit n ->
      n

    Add a b ->
      eval a + eval b

    Neg a ->
      negate (eval a)
```

| Recursive structure | Use case             | Function style                      |
| ------------------- | -------------------- | ----------------------------------- |
| List                | Sequence             | `[]` and `x:xs` recursion, folds    |
| Tree                | Hierarchical data    | Branch recursion                    |
| Expression AST      | Language syntax      | Interpreter or compiler pass        |
| JSON-like value     | Nested external data | Recursive decoding/traversal        |
| File tree           | Directory hierarchy  | Effectful traversal plus pure model |
| Comment thread      | Nested comments      | Tree fold or recursive rendering    |

Recursive modeling pairs naturally with folds. A fold abstracts the pattern of consuming a recursive structure. Lists have `foldr` and `foldl'`; trees often get custom fold functions.

```haskell
foldTree :: (a -> b) -> (b -> b -> b) -> Tree a -> b
foldTree leaf branch tree =
  case tree of
    Leaf x ->
      leaf x

    Branch left right ->
      branch (foldTree leaf branch left) (foldTree leaf branch right)
```

**Common Pitfalls.** Recursive data can produce nontermination or stack/memory problems if consumed carelessly. Laziness sometimes helps by allowing partial consumption, but it can also retain large unevaluated structures. For large recursive data, Part 7’s strictness, evaluation, and profiling model becomes necessary.

### Model Extensibility — closed ADTs, open typeclasses, modules, external formats

Haskell ADTs are closed: once a type is defined, its constructors are fixed unless the source code changes. Typeclasses are open: new types can implement an existing class.

This creates a design tradeoff.

| Need                                   | Prefer                                   | Reason                               |
| -------------------------------------- | ---------------------------------------- | ------------------------------------ |
| Known finite alternatives              | ADT                                      | Exhaustive pattern matching          |
| New operations over same alternatives  | ADT plus functions                       | Easy to add functions                |
| New variants by users                  | Typeclass or existential wrapper         | ADT is closed                        |
| Shared behavior across unrelated types | Typeclass                                | Open set of instances                |
| Stable external protocol               | ADT plus parser/encoder                  | Known cases should be explicit       |
| Plugin-like extension                  | Typeclass/dictionary/record of functions | Variants may not be known in advance |

Classic expression problem framing:

```haskell
data Expr
  = Lit Int
  | Add Expr Expr
```

It is easy to add new operations:

```haskell
eval :: Expr -> Int
pretty :: Expr -> Text
size :: Expr -> Int
```

But adding a new variant, such as `Mul`, requires updating all pattern matches.

A typeclass design makes adding new types easy:

```haskell
class Pretty a where
  pretty :: a -> Text
```

Any type can later define `Pretty`. But adding a new required method to the class can break instances.

**Language-design meaning.** ADTs favor closed-world modeling and exhaustive analysis. Typeclasses favor open-world behavioral extension. Modules control what is exposed and what remains internal.

**Common Pitfalls.** Beginners sometimes use typeclasses when a simple ADT is better. If the alternatives are known and should be exhaustively handled, use an ADT. Typeclasses are not a replacement for sum types; they solve a different extension problem.

### Use Records of Functions — explicit dictionaries, dependency injection, capability records

Sometimes behavior should be passed explicitly rather than encoded as a typeclass. A record of functions can be clearer for application architecture.

```haskell
data UserStore m = UserStore
  { findUser :: UserId -> m (Maybe User)
  , saveUser :: User -> m ()
  }
```

A function can accept this dependency:

```haskell
registerUser :: Monad m => UserStore m -> NewUser -> m RegistrationResult
registerUser store newUser = do
  existing <- findUser store (newUserId newUser)
  case existing of
    Just _ ->
      pure AlreadyExists

    Nothing -> do
      saveUser store (toUser newUser)
      pure Registered
```

| Modeling option         | Best use                                 | Tradeoff                                                    |
| ----------------------- | ---------------------------------------- | ----------------------------------------------------------- |
| Typeclass               | Behavior belongs naturally to a type     | Global instance coherence; less explicit dependency passing |
| Record of functions     | Application dependency or capability set | More explicit, easier to swap in tests                      |
| Plain function argument | One behavior needed                      | Simple and direct                                           |
| Module function         | Fixed implementation                     | Less flexible but clear                                     |
| Effect class            | Abstract effect operation                | Powerful, but can become complex                            |

Records of functions are common for dependency injection, interpreters, environment capabilities, and testable application services.

**Common Pitfalls.** Do not turn every group of functions into a typeclass. If behavior is a runtime dependency, a record of functions may be more transparent. Conversely, if behavior is a stable mathematical or structural property of a type, a typeclass may be more idiomatic.

### Type/Data Modeling Decision Table — choosing representation by task

| Task pattern           | Recommended first choice          | Escalate when                                               | Avoid                                      |
| ---------------------- | --------------------------------- | ----------------------------------------------------------- | ------------------------------------------ |
| Simple domain wrapper  | `newtype`                         | Need validation: hide constructor and add smart constructor | `type` synonym for safety                  |
| Structured entity      | Record ADT                        | Need invariant: hide constructor                            | Large tuples                               |
| Closed status/state    | Sum type                          | State carries data: sum of products                         | Strings, status integers, boolean clusters |
| Optional field/result  | `Maybe`                           | Need error reason: `Either`                                 | Sentinel values                            |
| Recoverable failure    | `Either DomainError a`            | Need error accumulation: validation type                    | Exceptions for normal domain failure       |
| External data          | Raw type plus validator           | Parser can build domain directly                            | Trusting decoded data                      |
| Non-empty sequence     | `NonEmpty a`                      | Need indexed efficient sequence: vector-like type           | `head` on `[a]`                            |
| Keyed lookup           | `Map` / `HashMap`                 | Need ordering or hashing behavior                           | Association list for large data            |
| Unique collection      | `Set` / `HashSet`                 | Need multiset: specialized type                             | Repeated `nub`                             |
| Text                   | `Text`                            | Need bytes: `ByteString`                                    | Large `String`                             |
| Binary data            | `ByteString`                      | Need streaming: streaming library                           | `Text` for arbitrary bytes                 |
| Typed workflow phase   | Phantom type or separate newtypes | Need constructor-specific refinement: GADT                  | Runtime flags everywhere                   |
| Typed AST/protocol     | ADT                               | Need result-type-indexed expressions: GADT                  | Untyped tree plus scattered checks         |
| Shared behavior        | Typeclass                         | Need runtime dependency: record of functions                | Typeclass for everything                   |
| Generic transformation | Type parameter / typeclass        | Need context abstraction: higher-kinded class               | Premature polymorphism                     |

### Type-System Property Map — guarantees and misconceptions

| Property                | What Haskell gives                             | What it does not give                             | Common misunderstanding             |
| ----------------------- | ---------------------------------------------- | ------------------------------------------------- | ----------------------------------- |
| Static typing           | Type errors caught before running              | No guarantee of termination or full correctness   | “If it compiles, it is correct”     |
| Strong typing           | No broad implicit coercion                     | Unsafe features and partial functions still exist | “Types prevent all crashes”         |
| Type inference          | Many annotations can be inferred               | Public API design still needs signatures          | “Annotations are unnecessary”       |
| Parametric polymorphism | Uniform generic functions                      | Full runtime reflection over unknown types        | “`a` is like dynamic any”           |
| Typeclasses             | Behavior constraints over types                | Automatic law checking                            | “Typeclasses are interfaces”        |
| ADTs                    | Explicit products and sums                     | Automatic validation of external data             | “Decoded means valid”               |
| `newtype`               | Distinct static type with cheap representation | Invariant safety if constructor exported          | “Wrapper alone enforces validation” |
| Laziness                | Non-strict evaluation                          | Predictable memory use without profiling          | “Lazy means no cost”                |
| Purity                  | Pure functions cannot perform direct `IO`      | No bad behavior inside `IO`                       | “`IO` destroys all purity”          |

### Common Modeling Anti-Patterns — under-modeling, over-modeling, leaking boundaries

| Anti-pattern                     | Example                                | Why it fails                         | Better approach                           |
| -------------------------------- | -------------------------------------- | ------------------------------------ | ----------------------------------------- |
| Stringly typed domain            | `status :: Text`                       | Misspellings and unknown states      | ADT plus parser/encoder                   |
| Primitive obsession              | `Int` for every ID                     | Mixes unrelated concepts             | `newtype UserId`, `newtype ProductId`     |
| Boolean state explosion          | `isPaid`, `isShipped`, `isCancelled`   | Invalid combinations                 | Sum type                                  |
| Unsafe optional extraction       | `fromJust value`                       | Runtime crash                        | Pattern match, `maybe`, `do` over `Maybe` |
| Partial list use                 | `head xs`                              | Empty list crash                     | `NonEmpty`, pattern match, safe helper    |
| Exception-driven validation      | Throwing for ordinary invalid input    | Hidden failure channel               | `Either DomainError a`                    |
| Over-general API                 | `Monad m => ...` everywhere            | Harder reading and inference         | Concrete type or smaller constraint       |
| Premature type-level programming | GADTs/type families for simple cases   | Complexity exceeds benefit           | Ordinary ADT, `newtype`, module boundary  |
| Exposed smart-constructor bypass | Exporting `Email(..)`                  | Invalid values can be built anywhere | Export `Email`, not constructor           |
| Raw data leakage                 | Passing JSON-decoded record everywhere | Validation scattered or skipped      | Convert to domain type near boundary      |
| Derived wrong semantics          | `deriving Ord` for arbitrary domain    | Accidental ordering becomes API      | Manual instance or no `Ord`               |

### What Experienced Haskell Programmers Notice in Data Models — representation pressure, invariant location, API honesty

Experienced Haskell programmers read data models as architectural claims. A type declaration says what the program considers possible. An export list says who is allowed to construct values. A typeclass constraint says what behavior the function needs. A `Maybe` says absence is ordinary. An `Either` says failure is expected and recoverable. An `IO` says the computation touches the external world. A `newtype` says two values may share representation but not meaning.

A strong Haskell data model usually has these traits:

| Trait                               | What it looks like                         | Why it helps                             |                   |                             |
| ----------------------------------- | ------------------------------------------ | ---------------------------------------- | ----------------- | --------------------------- |
| Domain concepts are named           | `Email`, `UserId`, `DateRange`             | Prevents primitive mixups                |                   |                             |
| Alternatives are explicit           | `Paid                                      | Shipped TrackingNumber                   | Cancelled Reason` | Enables exhaustive handling |
| Constructors are hidden when needed | Export `Email`, not `Email(..)`            | Preserves invariants                     |                   |                             |
| External data is separated          | `RawUser -> Either Error User`             | Keeps trust boundaries visible           |                   |                             |
| Failure type matches caller needs   | `Maybe` or structured `Either`             | Avoids both over-detail and under-detail |                   |                             |
| Collections match operations        | `Map`, `Set`, `Text`, `Vector`, `NonEmpty` | Improves correctness and performance     |                   |                             |
| Typeclass constraints are minimal   | `Eq a => ...` only when equality needed    | Reduces unnecessary coupling             |                   |                             |
| Advanced types have clear payoff    | GADT or phantom type prevents real error   | Avoids type-level ornamentation          |                   |                             |

A weak model often has the opposite traits: many `Text` fields with implicit meanings, many `Bool` flags, public constructors for supposedly validated data, partial functions hidden behind confident names, and overly general signatures copied from libraries without a practical need.

The practical Haskell modeling habit is to keep asking: **Can this bad state be constructed? If yes, where is it rejected? If it is rejected at runtime, is that boundary explicit in the type? If it is not rejected, is that acceptable?**
## PART 4 — Control Flow, Functions, Abstraction, and Composition by Task Pattern

### Orientation — behavior as typed transformation, composition, sequencing, abstraction

Haskell control flow is not organized around mutable statements. It is organized around **expressions**, **pattern matching**, **function application**, **composition**, and **typed sequencing**. This part follows the uploaded task’s requirement to organize behavior and abstraction by practical task pattern rather than by a shallow syntax tour. 

The practical question is usually not “which loop should be used?” but **what kind of behavior is being expressed?** Is the code branching by data shape? Transforming every element? Combining results? Sequencing effects? Building a reusable abstraction? Preserving an invariant? Haskell provides different tools for these different intentions.

| Task                        | Primary Haskell tool                        | Best use                                 | Common mistake                                    |
| --------------------------- | ------------------------------------------- | ---------------------------------------- | ------------------------------------------------- |
| Branch by simple Boolean    | `if`, guards                                | Binary or ordered conditions             | Using nested `if` for rich domain structure       |
| Branch by data shape        | Pattern matching, `case`                    | ADTs, lists, tuples, `Maybe`, `Either`   | Forgetting cases or using strings instead of ADTs |
| Transform data              | `fmap`, `map`, comprehensions               | Apply function inside structure          | Treating every structure as a list                |
| Combine data                | folds, `foldMap`, `Semigroup`, `Monoid`     | Aggregate or summarize                   | Using lazy folds where strict folds are needed    |
| Repeat behavior             | recursion, folds, traversal                 | Structural recursion                     | Simulating imperative loops poorly                |
| Compose pure functions      | `(.)`, pipelines, local helpers             | Data transformation                      | Excessive point-free style                        |
| Sequence dependent effects  | `do`, `>>=`, `Monad`                        | Later step depends on earlier result     | Calling all sequencing “IO”                       |
| Combine independent effects | `Applicative`, `<$>`, `<*>`                 | Validation, parsing, independent actions | Using `Monad` when dependency is absent           |
| Abstract over behavior      | higher-order functions, typeclasses         | Reusable operations                      | Premature abstraction                             |
| Build public APIs           | type signatures, modules, ADTs, constraints | Stable boundaries                        | Exposing implementation details                   |
| Reduce boilerplate          | deriving, generics, Template Haskell        | Repetitive structural code               | Code generation before simple design              |

The central mental shift is this: **control flow is often data flow plus pattern matching**. If the data model is good, the control structure often becomes obvious.

### Choose Control Flow — if, guards, case, equations, recursion, folds, do notation

Haskell has several control-flow tools, but they are not interchangeable in style or meaning.

| Task                        | Use                        | Example shape                | Why                            |                                     |
| --------------------------- | -------------------------- | ---------------------------- | ------------------------------ | ----------------------------------- |
| Binary Boolean choice       | `if ... then ... else ...` | `if ok then a else b`        | Simple expression-level choice |                                     |
| Ordered Boolean conditions  | guards                     | `                            | x < 0 = ...`                   | Clear threshold or predicate ladder |
| Branch by constructor       | `case` or equations        | `Just x -> ...`              | Matches data structure         |                                     |
| Define function by cases    | Multiple equations         | `f [] = ...; f (x:xs) = ...` | Direct structural definition   |                                     |
| Consume recursive structure | recursion or fold          | `foldr step z xs`            | Follows inductive shape        |                                     |
| Sequence effects            | `do` notation              | `x <- action`                | Monadic sequencing             |                                     |
| Combine independent effects | `Applicative`              | `User <$> pName <*> pAge`    | No dependency between fields   |                                     |
| Transform inside context    | `fmap` / `<$>`             | `fmap f maybeX`              | Preserve context shape         |                                     |

Example: the same rough idea can be expressed differently depending on the task.

A simple Boolean branch:

```haskell
discountLabel :: Int -> Text
discountLabel amount =
  if amount >= 100
    then "discount"
    else "standard"
```

Ordered conditions read better with guards:

```haskell
riskBand :: Int -> Text
riskBand score
  | score < 0   = "invalid"
  | score < 40  = "low"
  | score < 80  = "medium"
  | otherwise   = "high"
```

Branching by structure belongs to pattern matching:

```haskell
displayName :: Maybe Text -> Text
displayName value =
  case value of
    Nothing ->
      "anonymous"

    Just name ->
      name
```

Function equations are even cleaner when the whole function is defined by cases:

```haskell
displayName :: Maybe Text -> Text
displayName Nothing     = "anonymous"
displayName (Just name) = name
```

A recurring professional rule: **use the control form that mirrors the source of variation.** If variation comes from Boolean thresholds, use guards. If variation comes from ADT constructors, use pattern matching. If variation comes from effect sequencing, use `do`. If variation comes from a recursive structure, use recursion, fold, or traversal.

**Common Pitfalls.** A frequent beginner error is translating imperative loops into recursive functions without recognizing existing library patterns such as `map`, `filter`, `foldr`, `foldl'`, `traverse`, and `for_`. The opposite error is using folds so aggressively that simple branching becomes unreadable. Haskell encourages abstraction, but not at the cost of local clarity.

### Branch by Value or Structure — pattern matching, exhaustiveness, domain logic

Pattern matching is Haskell’s central branching mechanism. It works especially well when the data model uses ADTs.

```haskell
data PaymentStatus
  = AwaitingPayment
  | Paid ReceiptId
  | Failed PaymentError
  | Refunded RefundId

canShip :: PaymentStatus -> Bool
canShip status =
  case status of
    AwaitingPayment -> False
    Paid _          -> True
    Failed _        -> False
    Refunded _      -> False
```

The control flow follows the domain structure. If a new constructor is added, such as `PartiallyPaid`, the compiler can warn that pattern matches need updating, provided warnings are enabled.

| Pattern style       | Example              | Use                       | Risk                              |
| ------------------- | -------------------- | ------------------------- | --------------------------------- |
| Constructor pattern | `Paid receiptId`     | Branch by ADT case        | Missing future constructors       |
| Wildcard            | `_`                  | Ignore irrelevant detail  | Can hide unhandled domain cases   |
| Variable pattern    | `x`                  | Bind entire value         | Can accidentally catch everything |
| Nested pattern      | `Just (User name _)` | Match structure directly  | Can become too dense              |
| As-pattern          | `whole@(x:xs)`       | Need whole and parts      | Overused in complex patterns      |
| Pattern guard       | `Just n <- parse x`  | Match intermediate result | Can become cryptic when stacked   |

A wildcard is sometimes correct:

```haskell
isFinal :: PaymentStatus -> Bool
isFinal status =
  case status of
    Paid _     -> True
    Failed _   -> True
    Refunded _ -> True
    _          -> False
```

But for domain logic, explicit cases are often better:

```haskell
isFinal :: PaymentStatus -> Bool
isFinal status =
  case status of
    AwaitingPayment -> False
    Paid _          -> True
    Failed _        -> True
    Refunded _      -> True
```

The explicit version is longer, but if a new constructor is added, the compiler can help locate places requiring decision. The wildcard version may silently classify the new case as `False`.

**Failure-first explanation.** The tempting but wrong mental model is that `_` is a harmless way to avoid typing irrelevant cases. The surprising bug is that future constructors are swallowed silently. The correct semantic explanation is that `_` matches everything not matched earlier. The professional rule is: **use wildcards for truly irrelevant data, not for domain states whose meaning may change.** The boundary changes for low-level helper functions where only one case matters and all others genuinely share behavior.

### Iterate and Transform Data — map, fmap, filter, comprehensions, recursion

Haskell rarely uses explicit index-based loops for ordinary transformation. The core transformation tools are `map`, `fmap`, `filter`, comprehensions, recursion, and folds.

```haskell
normalizeNames :: [Text] -> [Text]
normalizeNames names =
  map normalizeName names
```

For lists, `map` transforms each element. More generally, `fmap` transforms inside any `Functor`.

```haskell
normalizeMaybe :: Maybe Text -> Maybe Text
normalizeMaybe value =
  fmap normalizeName value
```

The same shape appears with `Either e`, `IO`, parsers, and many other contexts.

| Task                          | List-specific tool | General tool              | Example                  |                    |
| ----------------------------- | ------------------ | ------------------------- | ------------------------ | ------------------ |
| Transform each element        | `map`              | `fmap` / `<$>`            | `fmap T.strip value`     |                    |
| Keep matching elements        | `filter`           | structure-specific        | `filter active users`    |                    |
| Transform and remove failures | `mapMaybe`         | `traverse` variants       | `mapMaybe parse xs`      |                    |
| Check any element             | `any`              | `Foldable` versions       | `any isAdmin users`      |                    |
| Check all elements            | `all`              | `Foldable` versions       | `all valid rows`         |                    |
| Generate combinations         | list comprehension | parser/list monadic style | `[(x,y)                  | x <- xs, y <- ys]` |
| Accumulate                    | `foldr`, `foldl'`  | `foldMap`, `fold`         | `foldMap userTags users` |                    |

Examples:

```haskell
activeUsers :: [User] -> [User]
activeUsers users =
  filter userIsActive users

userNames :: [User] -> [Text]
userNames users =
  map userName users

activeUserNames :: [User] -> [Text]
activeUserNames users =
  map userName (filter userIsActive users)
```

This can be composed:

```haskell
activeUserNames :: [User] -> [Text]
activeUserNames =
  map userName . filter userIsActive
```

For `Maybe`:

```haskell
cleanOptionalName :: Maybe Text -> Maybe Text
cleanOptionalName =
  fmap normalizeName
```

For `Either`:

```haskell
cleanParsedName :: Either ParseError Text -> Either ParseError Text
cleanParsedName =
  fmap normalizeName
```

The transformation applies only to the successful or present value, preserving the surrounding context.

**Interdisciplinary Lens: Category Theory**

What it clarifies: `Functor` abstracts the idea of mapping a function over a context while preserving the context’s structure.

Language feature involved: `fmap`, `<$>`, `Maybe`, lists, `Either e`, `IO`, parsers.

Practical consequence: once a type has a lawful `Functor` instance, transformations can be written generically without manually unpacking and repacking the structure.

Limit of the lens: the word “context” is not a complete operational model. `IO a`, `[a]`, and `Maybe a` have different runtime and semantic behavior even if all support `fmap`.

**Common Pitfalls.** A common error is reaching for `map` when the structure is not a list. Use `fmap` when working over a general context. Another error is using `fmap` when the function itself returns a context, producing nested structures such as `Maybe (Maybe a)` or `IO (IO a)`. That situation often requires `>>=`, `join`, or a different design.

### Transform and Filter Together — mapMaybe, Either pipelines, traversal

Sometimes transformation can fail for each element. For lists, `mapMaybe` is a common tool.

```haskell
parseIds :: [Text] -> [UserId]
parseIds texts =
  mapMaybe parseUserId texts
```

Here `parseUserId :: Text -> Maybe UserId`. Failed parses disappear.

That is useful when failure is not important, but it is wrong when errors need reporting. If each failure matters, use `Either` and a traversal pattern.

```haskell
parseIds :: [Text] -> Either ParseError [UserId]
parseIds texts =
  traverse parseUserIdEither texts
```

If `parseUserIdEither` returns `Either ParseError UserId`, then `traverse` processes the list and stops at the first `Left`.

| Task                                       | Tool                     | Behavior                                | Use when                                 |
| ------------------------------------------ | ------------------------ | --------------------------------------- | ---------------------------------------- |
| Transform all elements                     | `map` / `fmap`           | Keeps all results                       | Transformation cannot fail               |
| Transform and drop failures                | `mapMaybe`               | Keeps successful results only           | Failure is unimportant                   |
| Transform and short-circuit on first error | `traverse` with `Either` | First failure stops                     | Later results depend on all valid inputs |
| Transform and accumulate all errors        | Validation applicative   | Collects independent errors             | User-facing validation                   |
| Transform with effects                     | `traverse`               | Sequences effects and returns structure | Need result list, not just effects       |
| Perform effects and ignore results         | `traverse_`, `for_`      | Sequences effects, discards results     | Logging, printing, updates               |

Example with effects:

```haskell
loadUsers :: [UserId] -> IO [Maybe User]
loadUsers ids =
  traverse loadUser ids
```

If only effects matter:

```haskell
printUsers :: [User] -> IO ()
printUsers users =
  traverse_ printUser users
```

`traverse_` avoids building a list of meaningless results.

**Failure-first explanation.** The tempting but wrong mental model is that `mapMaybe` is a convenient parser for lists. The surprising bug is silent data loss: failed elements vanish with no record. The correct semantic explanation is that `mapMaybe` intentionally discards failure information. The professional rule is: **use `mapMaybe` only when dropping failures is semantically correct; use `traverse` with `Either` or validation when failures must be reported.** The boundary changes for search, filtering, optional extraction, and best-effort data cleanup, where discarding failed cases may be intended.

### Combine and Summarize Data — foldr, foldl', foldMap, Monoid

Folds express structural consumption. For lists, the two classic forms are `foldr` and `foldl'`.

```haskell
sumStrict :: [Int] -> Int
sumStrict =
  foldl' (+) 0
```

`foldl'` is usually preferred for strict left accumulation over large lists. `foldr` is important for lazy consumption, short-circuiting patterns, and building structures.

```haskell
anyActive :: [User] -> Bool
anyActive =
  foldr (\user rest -> userIsActive user || rest) False
```

Because `||` is lazy in its second argument, this can short-circuit.

| Tool               | Shape                       | Best use                                           | Risk                                               |
| ------------------ | --------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `foldr`            | right fold                  | Lazy consumption, building lists, short-circuiting | Can be unintuitive for strict numeric accumulation |
| `foldl`            | lazy left fold              | Rarely preferred for large strict accumulation     | Space leaks                                        |
| `foldl'`           | strict left fold            | Numeric or strict accumulation                     | May force more than desired                        |
| `foldMap`          | map then combine monoidally | Generic aggregation                                | Requires knowing `Monoid`                          |
| `mconcat` / `fold` | combine monoidal values     | Lists of combinable values                         | Bad `Monoid` instance causes bad meaning           |

Example with `foldMap`:

```haskell
allTags :: [User] -> Set Text
allTags users =
  foldMap userTags users
```

Assume `userTags :: User -> Set Text`. Since `Set Text` has a `Monoid` instance, `foldMap` maps each user to a set and combines all sets.

Another example:

```haskell
totalBalance :: [Account] -> Sum Int
totalBalance accounts =
  foldMap (Sum . accountBalance) accounts
```

The wrapper `Sum` tells Haskell which numeric monoid to use. Numbers have multiple possible monoidal interpretations, such as sum and product, so wrappers avoid ambiguity.

**Interdisciplinary Lens: Category Theory**

What it clarifies: `Monoid` abstracts associative combination with an identity. `foldMap` converts each element into a monoidal value and combines them.

Language feature involved: `Semigroup`, `Monoid`, `foldMap`, `Sum`, `Product`, lists, containers.

Practical consequence: many aggregations can be written without manually managing accumulators.

Limit of the lens: associativity and identity laws do not decide performance. For large data, strictness and data representation still matter.

**Failure-first explanation.** The tempting but wrong mental model is that all folds are interchangeable. The surprising failure is a space leak from lazy `foldl` over a large list. The correct explanation is that `foldl` builds a chain of unevaluated accumulator thunks, while `foldl'` forces the accumulator as it goes. The professional rule is: **for strict accumulation over large lists, reach first for `foldl'`; for lazy structure production or short-circuiting, consider `foldr`; for monoidal aggregation, consider `foldMap`.** The boundary changes with infinite lists, laziness-dependent algorithms, and compiler optimizations.

### Recursion versus Library Combinators — structural clarity, reuse, termination

Haskell supports direct recursion, but idiomatic code often uses library combinators when the recursion pattern is standard.

Direct recursion:

```haskell
countActive :: [User] -> Int
countActive [] =
  0

countActive (user : users)
  | userIsActive user =
      1 + countActive users

  | otherwise =
      countActive users
```

Combinator version:

```haskell
countActive :: [User] -> Int
countActive =
  length . filter userIsActive
```

Strict fold version:

```haskell
countActive :: [User] -> Int
countActive =
  foldl' step 0
  where
    step count user
      | userIsActive user = count + 1
      | otherwise         = count
```

Each version has a use.

| Style                   | Best use                                  | Strength                 | Weakness                                 |
| ----------------------- | ----------------------------------------- | ------------------------ | ---------------------------------------- |
| Direct recursion        | Custom structure or nonstandard recursion | Explicit control         | Verbose, error-prone for common patterns |
| `map`/`filter` pipeline | Simple transformations                    | Readable and declarative | May allocate unless optimized            |
| Strict fold             | Large strict aggregation                  | Predictable accumulation | Less declarative                         |
| `foldMap`               | Monoidal aggregation                      | Highly compositional     | Requires abstraction fluency             |
| Custom fold             | Reusable recursion over custom ADT        | Encapsulates traversal   | Extra API design                         |

For custom recursive data, direct recursion is often the first step:

```haskell
data Tree a
  = Leaf a
  | Branch (Tree a) (Tree a)

treeDepth :: Tree a -> Int
treeDepth tree =
  case tree of
    Leaf _ ->
      1

    Branch left right ->
      1 + max (treeDepth left) (treeDepth right)
```

Later, if several functions share the same recursion pattern, define a fold:

```haskell
foldTree :: (a -> b) -> (b -> b -> b) -> Tree a -> b
foldTree leaf branch tree =
  case tree of
    Leaf x ->
      leaf x

    Branch left right ->
      branch (foldTree leaf branch left) (foldTree leaf branch right)
```

Then:

```haskell
treeDepth :: Tree a -> Int
treeDepth =
  foldTree
    (\_ -> 1)
    (\leftDepth rightDepth -> 1 + max leftDepth rightDepth)
```

**Common Pitfalls.** Avoid replacing every clear recursive definition with an abstract fold before the pattern is stable. Also avoid hand-written recursion for every ordinary list task. The professional habit is to recognize standard recursion patterns and use library combinators where they improve clarity, while keeping direct recursion for genuinely structural logic.

### Compose Functions — application, composition, pipelines, argument order

Function composition is central in Haskell because functions are ordinary values.

```haskell
(.) :: (b -> c) -> (a -> b) -> a -> c
```

The expression `f . g` means “apply `g`, then apply `f`.”

```haskell
normalizeName :: Text -> Text
normalizeName =
  T.toLower . T.strip
```

This is equivalent to:

```haskell
normalizeName :: Text -> Text
normalizeName input =
  T.toLower (T.strip input)
```

Haskell composition reads right-to-left. This can be elegant for short transformations but difficult for long pipelines.

| Style              | Example                                  | Best use                          | Risk                         |
| ------------------ | ---------------------------------------- | --------------------------------- | ---------------------------- |
| Direct application | `f (g x)`                                | Small nested calls                | Parentheses accumulate       |
| `$` application    | `f $ g x`                                | Reduce parentheses                | Overuse can obscure grouping |
| Composition        | `f . g`                                  | Reusable unary pipeline           | Reads right-to-left          |
| Pointful helper    | `\x -> f (g x)`                          | Argument names matter             | Slightly more verbose        |
| Pipeline via `(&)` | `x & g & f`                              | Left-to-right reading if imported | Extra operator dependency    |
| Local `where`      | `result = f cleaned where cleaned = g x` | Named intermediate meaning        | More lines                   |

Example where pointful style is clearer:

```haskell
canAccess :: Policy -> User -> Resource -> Bool
canAccess policy user resource =
  hasRole policy user && not (isLocked resource)
```

Forcing this into point-free style would hide the roles of `policy`, `user`, and `resource`.

Example where composition is clearer:

```haskell
canonicalEmailText :: Text -> Text
canonicalEmailText =
  T.toLower . T.strip
```

There is no need to name the argument because the pipeline is obvious.

**Failure-first explanation.** The tempting but wrong mental model is that point-free style is more idiomatic and therefore more advanced. The surprising failure is code that becomes unreadable and hard to modify. The correct explanation is that point-free style removes names; this is good only when the removed names carry no useful meaning. The professional rule is: **use point-free style for short, obvious pipelines; use named arguments when names explain roles, constraints, or domain meaning.** The boundary changes in library combinators and algebraic code, where point-free style may reveal structure better than named plumbing.

### Partial Application and Sections — pre-filling arguments, operator functions

Because Haskell functions are curried, partial application is ordinary.

```haskell
add :: Int -> Int -> Int
add x y = x + y

addOne :: Int -> Int
addOne =
  add 1
```

The expression `add 1` returns a function waiting for the second argument.

Partial application is common with higher-order functions:

```haskell
multiplyAllBy :: Int -> [Int] -> [Int]
multiplyAllBy n =
  map (* n)
```

Operator sections create functions from operators:

```haskell
(+ 1)    -- \x -> x + 1
(1 +)    -- \x -> 1 + x
(> 10)   -- \x -> x > 10
(10 >)   -- \x -> 10 > x
```

The last two are not the same:

```haskell
filter (> 10) numbers
```

keeps numbers greater than 10.

```haskell
filter (10 >) numbers
```

keeps numbers less than 10.

| Form             | Equivalent lambda        | Meaning                 |
| ---------------- | ------------------------ | ----------------------- |
| `f a`            | `\x -> f a x`            | Pre-fill first argument |
| `(+ 1)`          | `\x -> x + 1`            | Add one to input        |
| `(1 +)`          | `\x -> 1 + x`            | Add input to one        |
| `(< limit)`      | `\x -> x < limit`        | Test below limit        |
| `(limit <)`      | `\x -> limit < x`        | Test above limit        |
| `Map.lookup key` | `\m -> Map.lookup key m` | Lookup same key in maps |

Argument order affects partial application. Haskell libraries often place the most variable or data argument last so that earlier arguments can be pre-filled.

Example:

```haskell
filterByRole :: Role -> [User] -> [User]
filterByRole role =
  filter (\user -> userRole user == role)
```

The `role` is configured first; the list comes last.

**Common Pitfalls.** Operator sections can be visually misleading. `(10 >)` means “10 is greater than the input,” not “input greater than 10.” Another pitfall is designing function arguments in an order that makes partial application awkward. Put configuration-like arguments before the data argument when the function is likely to be reused as a transformer.

### Design Function Signatures — input order, constraints, effects, domain names

A Haskell function signature is often the most important design artifact. It should reveal what the function needs, what it guarantees, and what kind of computation it performs.

Compare:

```haskell
process :: Text -> Text -> IO Bool
```

with:

```haskell
authenticate :: Email -> Password -> IO AuthResult
```

The second signature carries domain meaning. It also avoids collapsing a rich result into `Bool`.

| Signature choice  | Weak version                        | Stronger version                                      | Why                                |
| ----------------- | ----------------------------------- | ----------------------------------------------------- | ---------------------------------- |
| Raw primitives    | `Text -> Text -> Bool`              | `Email -> Password -> AuthResult`                     | Names domain concepts              |
| Boolean result    | `User -> Bool`                      | `User -> Eligibility` or `Either Reason EligibleUser` | Explains failure or state          |
| Hidden effect     | Pure-looking but uses unsafe effect | `IO a` or explicit effect                             | Makes external interaction visible |
| Vague error       | `Either Text a`                     | `Either DomainError a`                                | Machine-readable failure           |
| Over-constrained  | `MonadIO m => ...` everywhere       | `IO ...` or smaller constraint                        | Avoids unnecessary abstraction     |
| Under-constrained | `a -> Text` impossible honestly     | `Show a => a -> Text`                                 | States required behavior           |

Argument order matters. A common Haskell pattern places stable configuration first and primary data last:

```haskell
renderWithTheme :: Theme -> Document -> Text
renderWithTheme theme document =
  ...
```

This allows:

```haskell
renderDark :: Document -> Text
renderDark =
  renderWithTheme darkTheme
```

For collection-processing functions, the data structure often comes last:

```haskell
findBy :: (a -> Bool) -> [a] -> Maybe a
```

This supports partial application:

```haskell
findAdmin :: [User] -> Maybe User
findAdmin =
  findBy userIsAdmin
```

Effect placement also matters:

```haskell
validateUser :: RawUser -> Either UserError User
saveUser     :: User -> IO ()
```

Validation is pure. Saving is effectful. Combining them:

```haskell
registerUser :: RawUser -> IO (Either UserError ())
registerUser raw =
  case validateUser raw of
    Left err ->
      pure (Left err)

    Right user -> do
      saveUser user
      pure (Right ())
```

The signature says that registration performs `IO` and may fail validation.

**Failure-first explanation.** The tempting but wrong mental model is that types are inferred, so signature design is secondary. The surprising failure is an API that typechecks but communicates almost nothing: primitives everywhere, `Bool` results, `Text` errors, unnecessary `IO`, and vague constraints. The correct explanation is that type signatures are interface design. The professional rule is: **use domain types at boundaries, expose effects honestly, choose error types by caller needs, and keep constraints no more abstract than useful.** The boundary changes in internal local helpers, where concise inferred types may be acceptable.

### Use Closures and Higher-Order Functions — behavior as value, local policy, dependency passing

A higher-order function takes or returns a function. This is ordinary in Haskell.

```haskell
filter :: (a -> Bool) -> [a] -> [a]
map    :: (a -> b) -> [a] -> [b]
```

A closure can capture local values:

```haskell
usersOlderThan :: Int -> [User] -> [User]
usersOlderThan minimumAge users =
  filter (\user -> userAge user >= minimumAge) users
```

The lambda captures `minimumAge`.

Higher-order functions are good for expressing reusable control patterns.

```haskell
retry :: Int -> IO (Either e a) -> IO (Either e a)
retry attempts action =
  ...
```

Here `retry` abstracts a behavior pattern around an effectful action.

| Task                    | Higher-order shape          | Example                     |
| ----------------------- | --------------------------- | --------------------------- |
| Filtering               | `(a -> Bool) -> [a] -> [a]` | `filter active users`       |
| Transformation          | `(a -> b) -> [a] -> [b]`    | `map userName users`        |
| Sorting by projection   | `(a -> key) -> [a] -> [a]`  | `sortOn userAge users`      |
| Resource handling       | `(Handle -> IO a) -> IO a`  | `withFile path mode action` |
| Retry/wrapping behavior | `IO a -> IO a` or richer    | `retry 3 request`           |
| Interpretation          | `(command -> m result)`     | command handlers            |

Higher-order resource patterns are especially important:

```haskell
withUserFile :: FilePath -> (Handle -> IO a) -> IO a
withUserFile path action =
  withFile path ReadMode action
```

The function receives a callback-like action, but unlike ad-hoc callback style, resource acquisition and release can be controlled by the abstraction.

**Common Pitfalls.** Higher-order functions should make control structure clearer, not hide it. If a function takes many function arguments with unclear roles, a record of named functions or a domain-specific type may be better. Another pitfall is callback-style nesting in `IO` where applicative or monadic composition would be clearer.

### Choose Between Explicit Recursion, Higher-Order Functions, and Typeclass Abstraction

Haskell gives several levels of abstraction. Choosing the right level matters.

| Problem                           | Good first tool                          | Escalate to               | Avoid                              |
| --------------------------------- | ---------------------------------------- | ------------------------- | ---------------------------------- |
| One-off list processing           | `map`, `filter`, fold                    | Named helper if complex   | Manual recursion by habit          |
| Custom recursive ADT              | Direct recursion                         | Custom fold/traversal     | Forcing list abstractions          |
| Repeated behavior over many types | Typeclass                                | Generic deriving/laws     | Copy-pasted functions              |
| Runtime dependency                | Function argument or record of functions | Reader/effect system      | Global typeclass instance by habit |
| One transformation pipeline       | Function composition                     | Named intermediate values | Dense symbolic point-free code     |
| Independent effect combination    | `Applicative`                            | Validation abstraction    | Monadic sequencing by habit        |
| Dependent effect sequencing       | `Monad` / `do`                           | Transformer/effect stack  | Manual nesting                     |

Example of escalation:

Start concrete:

```haskell
activeUserNames :: [User] -> [Text]
activeUserNames =
  map userName . filter userIsActive
```

Abstract over predicate and projection:

```haskell
selectMap :: (a -> Bool) -> (a -> b) -> [a] -> [b]
selectMap predicate project =
  map project . filter predicate
```

This is only useful if the pattern recurs. Otherwise, the original concrete function is clearer.

Abstract over foldable structure:

```haskell
selectMap :: Foldable t => (a -> Bool) -> (a -> b) -> t a -> [b]
selectMap predicate project =
  foldr step []
  where
    step x acc
      | predicate x = project x : acc
      | otherwise   = acc
```

This may be useful in a library, but excessive in application code unless multiple structures benefit.

**Failure-first explanation.** The tempting but wrong mental model is that Haskell encourages maximum abstraction. The surprising failure is an application codebase filled with typeclasses, rank-n types, and polymorphic helpers that solve no stable problem. The correct explanation is that abstraction has maintenance cost. The professional rule is: **begin concrete, abstract over real repetition, and choose the smallest abstraction that preserves the relevant variation.** The boundary changes for library authors, whose job is often to provide reusable abstractions.

### Compose Effects — Functor, Applicative, Monad as task distinctions

`Functor`, `Applicative`, and `Monad` are not just theoretical labels. They answer different practical questions.

| Task                                  | Abstraction   | Core intuition                            | Example                           |
| ------------------------------------- | ------------- | ----------------------------------------- | --------------------------------- |
| Transform result inside context       | `Functor`     | I have `f a` and `a -> b`; get `f b`      | `fmap userName maybeUser`         |
| Combine independent contextual values | `Applicative` | I have `f a`, `f b`, and pure constructor | `User <$> parseName <*> parseAge` |
| Sequence dependent contextual steps   | `Monad`       | Next step depends on previous result      | `parseId txt >>= loadUser`        |

`Functor` example:

```haskell
displayAge :: Maybe Int -> Maybe Text
displayAge =
  fmap showText
```

`Applicative` example:

```haskell
mkUser :: Name -> Email -> Age -> User

parseUser :: RawUser -> Either UserError User
parseUser raw =
  mkUser
    <$> parseName (rawName raw)
    <*> parseEmail (rawEmail raw)
    <*> parseAge (rawAge raw)
```

This says the three parses are structurally independent, and their successful results are combined into `User`.

`Monad` example:

```haskell
loadUserFromText :: Text -> IO (Maybe User)
loadUserFromText txt =
  case parseUserId txt of
    Nothing ->
      pure Nothing

    Just userId ->
      loadUser userId
```

Using `MaybeT` or other transformer tools can reduce nesting, but the semantic point remains: loading depends on the parsed ID.

A pure `Maybe` monadic example:

```haskell
userCity :: User -> Maybe Text
userCity user = do
  address <- userAddress user
  city    <- addressCity address
  pure city
```

The second step depends on the address produced by the first step.

**Interdisciplinary Lens: Category Theory**

What it clarifies: these abstractions encode different composition patterns. `Functor` maps, `Applicative` combines independent contexts, and `Monad` sequences dependent contexts.

Language feature involved: `fmap`, `<$>`, `<*>`, `pure`, `>>=`, `do`.

Practical consequence: choosing the weakest sufficient abstraction communicates dependency structure.

Limit of the lens: categorical vocabulary does not replace reading the concrete instance. `Maybe`, `Either`, `IO`, list, and parser instances behave differently.

**Failure-first explanation.** The tempting but wrong mental model is that `Monad` is the powerful abstraction, so it should be used whenever possible. The surprising cost is losing information: a monadic API implies dependency even when computations are independent. The correct explanation is that `Applicative` expresses independent combination, while `Monad` expresses dependent sequencing. The professional rule is: **prefer `Functor` for simple transformation, `Applicative` for independent combination, and `Monad` when later steps need earlier values.** The boundary changes when ergonomics or library conventions favor `do` notation, but the dependency distinction remains important.
## PART 4 — Control Flow, Functions, Abstraction, and Composition by Task Pattern

### Orientation — behavior as typed transformation, composition, sequencing, abstraction

Haskell control flow is not organized around mutable statements. It is organized around **expressions**, **pattern matching**, **function application**, **composition**, and **typed sequencing**. This part follows the uploaded task’s requirement to organize behavior and abstraction by practical task pattern rather than by a shallow syntax tour. 

The practical question is usually not “which loop should be used?” but **what kind of behavior is being expressed?** Is the code branching by data shape? Transforming every element? Combining results? Sequencing effects? Building a reusable abstraction? Preserving an invariant? Haskell provides different tools for these different intentions.

| Task                        | Primary Haskell tool                        | Best use                                 | Common mistake                                    |
| --------------------------- | ------------------------------------------- | ---------------------------------------- | ------------------------------------------------- |
| Branch by simple Boolean    | `if`, guards                                | Binary or ordered conditions             | Using nested `if` for rich domain structure       |
| Branch by data shape        | Pattern matching, `case`                    | ADTs, lists, tuples, `Maybe`, `Either`   | Forgetting cases or using strings instead of ADTs |
| Transform data              | `fmap`, `map`, comprehensions               | Apply function inside structure          | Treating every structure as a list                |
| Combine data                | folds, `foldMap`, `Semigroup`, `Monoid`     | Aggregate or summarize                   | Using lazy folds where strict folds are needed    |
| Repeat behavior             | recursion, folds, traversal                 | Structural recursion                     | Simulating imperative loops poorly                |
| Compose pure functions      | `(.)`, pipelines, local helpers             | Data transformation                      | Excessive point-free style                        |
| Sequence dependent effects  | `do`, `>>=`, `Monad`                        | Later step depends on earlier result     | Calling all sequencing “IO”                       |
| Combine independent effects | `Applicative`, `<$>`, `<*>`                 | Validation, parsing, independent actions | Using `Monad` when dependency is absent           |
| Abstract over behavior      | higher-order functions, typeclasses         | Reusable operations                      | Premature abstraction                             |
| Build public APIs           | type signatures, modules, ADTs, constraints | Stable boundaries                        | Exposing implementation details                   |
| Reduce boilerplate          | deriving, generics, Template Haskell        | Repetitive structural code               | Code generation before simple design              |

The central mental shift is this: **control flow is often data flow plus pattern matching**. If the data model is good, the control structure often becomes obvious.

### Choose Control Flow — if, guards, case, equations, recursion, folds, do notation

Haskell has several control-flow tools, but they are not interchangeable in style or meaning.

| Task                        | Use                        | Example shape                | Why                            |                                     |
| --------------------------- | -------------------------- | ---------------------------- | ------------------------------ | ----------------------------------- |
| Binary Boolean choice       | `if ... then ... else ...` | `if ok then a else b`        | Simple expression-level choice |                                     |
| Ordered Boolean conditions  | guards                     | `                            | x < 0 = ...`                   | Clear threshold or predicate ladder |
| Branch by constructor       | `case` or equations        | `Just x -> ...`              | Matches data structure         |                                     |
| Define function by cases    | Multiple equations         | `f [] = ...; f (x:xs) = ...` | Direct structural definition   |                                     |
| Consume recursive structure | recursion or fold          | `foldr step z xs`            | Follows inductive shape        |                                     |
| Sequence effects            | `do` notation              | `x <- action`                | Monadic sequencing             |                                     |
| Combine independent effects | `Applicative`              | `User <$> pName <*> pAge`    | No dependency between fields   |                                     |
| Transform inside context    | `fmap` / `<$>`             | `fmap f maybeX`              | Preserve context shape         |                                     |

Example: the same rough idea can be expressed differently depending on the task.

A simple Boolean branch:

```haskell
discountLabel :: Int -> Text
discountLabel amount =
  if amount >= 100
    then "discount"
    else "standard"
```

Ordered conditions read better with guards:

```haskell
riskBand :: Int -> Text
riskBand score
  | score < 0   = "invalid"
  | score < 40  = "low"
  | score < 80  = "medium"
  | otherwise   = "high"
```

Branching by structure belongs to pattern matching:

```haskell
displayName :: Maybe Text -> Text
displayName value =
  case value of
    Nothing ->
      "anonymous"

    Just name ->
      name
```

Function equations are even cleaner when the whole function is defined by cases:

```haskell
displayName :: Maybe Text -> Text
displayName Nothing     = "anonymous"
displayName (Just name) = name
```

A recurring professional rule: **use the control form that mirrors the source of variation.** If variation comes from Boolean thresholds, use guards. If variation comes from ADT constructors, use pattern matching. If variation comes from effect sequencing, use `do`. If variation comes from a recursive structure, use recursion, fold, or traversal.

**Common Pitfalls.** A frequent beginner error is translating imperative loops into recursive functions without recognizing existing library patterns such as `map`, `filter`, `foldr`, `foldl'`, `traverse`, and `for_`. The opposite error is using folds so aggressively that simple branching becomes unreadable. Haskell encourages abstraction, but not at the cost of local clarity.

### Branch by Value or Structure — pattern matching, exhaustiveness, domain logic

Pattern matching is Haskell’s central branching mechanism. It works especially well when the data model uses ADTs.

```haskell
data PaymentStatus
  = AwaitingPayment
  | Paid ReceiptId
  | Failed PaymentError
  | Refunded RefundId

canShip :: PaymentStatus -> Bool
canShip status =
  case status of
    AwaitingPayment -> False
    Paid _          -> True
    Failed _        -> False
    Refunded _      -> False
```

The control flow follows the domain structure. If a new constructor is added, such as `PartiallyPaid`, the compiler can warn that pattern matches need updating, provided warnings are enabled.

| Pattern style       | Example              | Use                       | Risk                              |
| ------------------- | -------------------- | ------------------------- | --------------------------------- |
| Constructor pattern | `Paid receiptId`     | Branch by ADT case        | Missing future constructors       |
| Wildcard            | `_`                  | Ignore irrelevant detail  | Can hide unhandled domain cases   |
| Variable pattern    | `x`                  | Bind entire value         | Can accidentally catch everything |
| Nested pattern      | `Just (User name _)` | Match structure directly  | Can become too dense              |
| As-pattern          | `whole@(x:xs)`       | Need whole and parts      | Overused in complex patterns      |
| Pattern guard       | `Just n <- parse x`  | Match intermediate result | Can become cryptic when stacked   |

A wildcard is sometimes correct:

```haskell
isFinal :: PaymentStatus -> Bool
isFinal status =
  case status of
    Paid _     -> True
    Failed _   -> True
    Refunded _ -> True
    _          -> False
```

But for domain logic, explicit cases are often better:

```haskell
isFinal :: PaymentStatus -> Bool
isFinal status =
  case status of
    AwaitingPayment -> False
    Paid _          -> True
    Failed _        -> True
    Refunded _      -> True
```

The explicit version is longer, but if a new constructor is added, the compiler can help locate places requiring decision. The wildcard version may silently classify the new case as `False`.

**Failure-first explanation.** The tempting but wrong mental model is that `_` is a harmless way to avoid typing irrelevant cases. The surprising bug is that future constructors are swallowed silently. The correct semantic explanation is that `_` matches everything not matched earlier. The professional rule is: **use wildcards for truly irrelevant data, not for domain states whose meaning may change.** The boundary changes for low-level helper functions where only one case matters and all others genuinely share behavior.

### Iterate and Transform Data — map, fmap, filter, comprehensions, recursion

Haskell rarely uses explicit index-based loops for ordinary transformation. The core transformation tools are `map`, `fmap`, `filter`, comprehensions, recursion, and folds.

```haskell
normalizeNames :: [Text] -> [Text]
normalizeNames names =
  map normalizeName names
```

For lists, `map` transforms each element. More generally, `fmap` transforms inside any `Functor`.

```haskell
normalizeMaybe :: Maybe Text -> Maybe Text
normalizeMaybe value =
  fmap normalizeName value
```

The same shape appears with `Either e`, `IO`, parsers, and many other contexts.

| Task                          | List-specific tool | General tool              | Example                  |                    |
| ----------------------------- | ------------------ | ------------------------- | ------------------------ | ------------------ |
| Transform each element        | `map`              | `fmap` / `<$>`            | `fmap T.strip value`     |                    |
| Keep matching elements        | `filter`           | structure-specific        | `filter active users`    |                    |
| Transform and remove failures | `mapMaybe`         | `traverse` variants       | `mapMaybe parse xs`      |                    |
| Check any element             | `any`              | `Foldable` versions       | `any isAdmin users`      |                    |
| Check all elements            | `all`              | `Foldable` versions       | `all valid rows`         |                    |
| Generate combinations         | list comprehension | parser/list monadic style | `[(x,y)                  | x <- xs, y <- ys]` |
| Accumulate                    | `foldr`, `foldl'`  | `foldMap`, `fold`         | `foldMap userTags users` |                    |

Examples:

```haskell
activeUsers :: [User] -> [User]
activeUsers users =
  filter userIsActive users

userNames :: [User] -> [Text]
userNames users =
  map userName users

activeUserNames :: [User] -> [Text]
activeUserNames users =
  map userName (filter userIsActive users)
```

This can be composed:

```haskell
activeUserNames :: [User] -> [Text]
activeUserNames =
  map userName . filter userIsActive
```

For `Maybe`:

```haskell
cleanOptionalName :: Maybe Text -> Maybe Text
cleanOptionalName =
  fmap normalizeName
```

For `Either`:

```haskell
cleanParsedName :: Either ParseError Text -> Either ParseError Text
cleanParsedName =
  fmap normalizeName
```

The transformation applies only to the successful or present value, preserving the surrounding context.

**Interdisciplinary Lens: Category Theory**

What it clarifies: `Functor` abstracts the idea of mapping a function over a context while preserving the context’s structure.

Language feature involved: `fmap`, `<$>`, `Maybe`, lists, `Either e`, `IO`, parsers.

Practical consequence: once a type has a lawful `Functor` instance, transformations can be written generically without manually unpacking and repacking the structure.

Limit of the lens: the word “context” is not a complete operational model. `IO a`, `[a]`, and `Maybe a` have different runtime and semantic behavior even if all support `fmap`.

**Common Pitfalls.** A common error is reaching for `map` when the structure is not a list. Use `fmap` when working over a general context. Another error is using `fmap` when the function itself returns a context, producing nested structures such as `Maybe (Maybe a)` or `IO (IO a)`. That situation often requires `>>=`, `join`, or a different design.

### Transform and Filter Together — mapMaybe, Either pipelines, traversal

Sometimes transformation can fail for each element. For lists, `mapMaybe` is a common tool.

```haskell
parseIds :: [Text] -> [UserId]
parseIds texts =
  mapMaybe parseUserId texts
```

Here `parseUserId :: Text -> Maybe UserId`. Failed parses disappear.

That is useful when failure is not important, but it is wrong when errors need reporting. If each failure matters, use `Either` and a traversal pattern.

```haskell
parseIds :: [Text] -> Either ParseError [UserId]
parseIds texts =
  traverse parseUserIdEither texts
```

If `parseUserIdEither` returns `Either ParseError UserId`, then `traverse` processes the list and stops at the first `Left`.

| Task                                       | Tool                     | Behavior                                | Use when                                 |
| ------------------------------------------ | ------------------------ | --------------------------------------- | ---------------------------------------- |
| Transform all elements                     | `map` / `fmap`           | Keeps all results                       | Transformation cannot fail               |
| Transform and drop failures                | `mapMaybe`               | Keeps successful results only           | Failure is unimportant                   |
| Transform and short-circuit on first error | `traverse` with `Either` | First failure stops                     | Later results depend on all valid inputs |
| Transform and accumulate all errors        | Validation applicative   | Collects independent errors             | User-facing validation                   |
| Transform with effects                     | `traverse`               | Sequences effects and returns structure | Need result list, not just effects       |
| Perform effects and ignore results         | `traverse_`, `for_`      | Sequences effects, discards results     | Logging, printing, updates               |

Example with effects:

```haskell
loadUsers :: [UserId] -> IO [Maybe User]
loadUsers ids =
  traverse loadUser ids
```

If only effects matter:

```haskell
printUsers :: [User] -> IO ()
printUsers users =
  traverse_ printUser users
```

`traverse_` avoids building a list of meaningless results.

**Failure-first explanation.** The tempting but wrong mental model is that `mapMaybe` is a convenient parser for lists. The surprising bug is silent data loss: failed elements vanish with no record. The correct semantic explanation is that `mapMaybe` intentionally discards failure information. The professional rule is: **use `mapMaybe` only when dropping failures is semantically correct; use `traverse` with `Either` or validation when failures must be reported.** The boundary changes for search, filtering, optional extraction, and best-effort data cleanup, where discarding failed cases may be intended.

### Combine and Summarize Data — foldr, foldl', foldMap, Monoid

Folds express structural consumption. For lists, the two classic forms are `foldr` and `foldl'`.

```haskell
sumStrict :: [Int] -> Int
sumStrict =
  foldl' (+) 0
```

`foldl'` is usually preferred for strict left accumulation over large lists. `foldr` is important for lazy consumption, short-circuiting patterns, and building structures.

```haskell
anyActive :: [User] -> Bool
anyActive =
  foldr (\user rest -> userIsActive user || rest) False
```

Because `||` is lazy in its second argument, this can short-circuit.

| Tool               | Shape                       | Best use                                           | Risk                                               |
| ------------------ | --------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `foldr`            | right fold                  | Lazy consumption, building lists, short-circuiting | Can be unintuitive for strict numeric accumulation |
| `foldl`            | lazy left fold              | Rarely preferred for large strict accumulation     | Space leaks                                        |
| `foldl'`           | strict left fold            | Numeric or strict accumulation                     | May force more than desired                        |
| `foldMap`          | map then combine monoidally | Generic aggregation                                | Requires knowing `Monoid`                          |
| `mconcat` / `fold` | combine monoidal values     | Lists of combinable values                         | Bad `Monoid` instance causes bad meaning           |

Example with `foldMap`:

```haskell
allTags :: [User] -> Set Text
allTags users =
  foldMap userTags users
```

Assume `userTags :: User -> Set Text`. Since `Set Text` has a `Monoid` instance, `foldMap` maps each user to a set and combines all sets.

Another example:

```haskell
totalBalance :: [Account] -> Sum Int
totalBalance accounts =
  foldMap (Sum . accountBalance) accounts
```

The wrapper `Sum` tells Haskell which numeric monoid to use. Numbers have multiple possible monoidal interpretations, such as sum and product, so wrappers avoid ambiguity.

**Interdisciplinary Lens: Category Theory**

What it clarifies: `Monoid` abstracts associative combination with an identity. `foldMap` converts each element into a monoidal value and combines them.

Language feature involved: `Semigroup`, `Monoid`, `foldMap`, `Sum`, `Product`, lists, containers.

Practical consequence: many aggregations can be written without manually managing accumulators.

Limit of the lens: associativity and identity laws do not decide performance. For large data, strictness and data representation still matter.

**Failure-first explanation.** The tempting but wrong mental model is that all folds are interchangeable. The surprising failure is a space leak from lazy `foldl` over a large list. The correct explanation is that `foldl` builds a chain of unevaluated accumulator thunks, while `foldl'` forces the accumulator as it goes. The professional rule is: **for strict accumulation over large lists, reach first for `foldl'`; for lazy structure production or short-circuiting, consider `foldr`; for monoidal aggregation, consider `foldMap`.** The boundary changes with infinite lists, laziness-dependent algorithms, and compiler optimizations.

### Recursion versus Library Combinators — structural clarity, reuse, termination

Haskell supports direct recursion, but idiomatic code often uses library combinators when the recursion pattern is standard.

Direct recursion:

```haskell
countActive :: [User] -> Int
countActive [] =
  0

countActive (user : users)
  | userIsActive user =
      1 + countActive users

  | otherwise =
      countActive users
```

Combinator version:

```haskell
countActive :: [User] -> Int
countActive =
  length . filter userIsActive
```

Strict fold version:

```haskell
countActive :: [User] -> Int
countActive =
  foldl' step 0
  where
    step count user
      | userIsActive user = count + 1
      | otherwise         = count
```

Each version has a use.

| Style                   | Best use                                  | Strength                 | Weakness                                 |
| ----------------------- | ----------------------------------------- | ------------------------ | ---------------------------------------- |
| Direct recursion        | Custom structure or nonstandard recursion | Explicit control         | Verbose, error-prone for common patterns |
| `map`/`filter` pipeline | Simple transformations                    | Readable and declarative | May allocate unless optimized            |
| Strict fold             | Large strict aggregation                  | Predictable accumulation | Less declarative                         |
| `foldMap`               | Monoidal aggregation                      | Highly compositional     | Requires abstraction fluency             |
| Custom fold             | Reusable recursion over custom ADT        | Encapsulates traversal   | Extra API design                         |

For custom recursive data, direct recursion is often the first step:

```haskell
data Tree a
  = Leaf a
  | Branch (Tree a) (Tree a)

treeDepth :: Tree a -> Int
treeDepth tree =
  case tree of
    Leaf _ ->
      1

    Branch left right ->
      1 + max (treeDepth left) (treeDepth right)
```

Later, if several functions share the same recursion pattern, define a fold:

```haskell
foldTree :: (a -> b) -> (b -> b -> b) -> Tree a -> b
foldTree leaf branch tree =
  case tree of
    Leaf x ->
      leaf x

    Branch left right ->
      branch (foldTree leaf branch left) (foldTree leaf branch right)
```

Then:

```haskell
treeDepth :: Tree a -> Int
treeDepth =
  foldTree
    (\_ -> 1)
    (\leftDepth rightDepth -> 1 + max leftDepth rightDepth)
```

**Common Pitfalls.** Avoid replacing every clear recursive definition with an abstract fold before the pattern is stable. Also avoid hand-written recursion for every ordinary list task. The professional habit is to recognize standard recursion patterns and use library combinators where they improve clarity, while keeping direct recursion for genuinely structural logic.

### Compose Functions — application, composition, pipelines, argument order

Function composition is central in Haskell because functions are ordinary values.

```haskell
(.) :: (b -> c) -> (a -> b) -> a -> c
```

The expression `f . g` means “apply `g`, then apply `f`.”

```haskell
normalizeName :: Text -> Text
normalizeName =
  T.toLower . T.strip
```

This is equivalent to:

```haskell
normalizeName :: Text -> Text
normalizeName input =
  T.toLower (T.strip input)
```

Haskell composition reads right-to-left. This can be elegant for short transformations but difficult for long pipelines.

| Style              | Example                                  | Best use                          | Risk                         |
| ------------------ | ---------------------------------------- | --------------------------------- | ---------------------------- |
| Direct application | `f (g x)`                                | Small nested calls                | Parentheses accumulate       |
| `$` application    | `f $ g x`                                | Reduce parentheses                | Overuse can obscure grouping |
| Composition        | `f . g`                                  | Reusable unary pipeline           | Reads right-to-left          |
| Pointful helper    | `\x -> f (g x)`                          | Argument names matter             | Slightly more verbose        |
| Pipeline via `(&)` | `x & g & f`                              | Left-to-right reading if imported | Extra operator dependency    |
| Local `where`      | `result = f cleaned where cleaned = g x` | Named intermediate meaning        | More lines                   |

Example where pointful style is clearer:

```haskell
canAccess :: Policy -> User -> Resource -> Bool
canAccess policy user resource =
  hasRole policy user && not (isLocked resource)
```

Forcing this into point-free style would hide the roles of `policy`, `user`, and `resource`.

Example where composition is clearer:

```haskell
canonicalEmailText :: Text -> Text
canonicalEmailText =
  T.toLower . T.strip
```

There is no need to name the argument because the pipeline is obvious.

**Failure-first explanation.** The tempting but wrong mental model is that point-free style is more idiomatic and therefore more advanced. The surprising failure is code that becomes unreadable and hard to modify. The correct explanation is that point-free style removes names; this is good only when the removed names carry no useful meaning. The professional rule is: **use point-free style for short, obvious pipelines; use named arguments when names explain roles, constraints, or domain meaning.** The boundary changes in library combinators and algebraic code, where point-free style may reveal structure better than named plumbing.

### Partial Application and Sections — pre-filling arguments, operator functions

Because Haskell functions are curried, partial application is ordinary.

```haskell
add :: Int -> Int -> Int
add x y = x + y

addOne :: Int -> Int
addOne =
  add 1
```

The expression `add 1` returns a function waiting for the second argument.

Partial application is common with higher-order functions:

```haskell
multiplyAllBy :: Int -> [Int] -> [Int]
multiplyAllBy n =
  map (* n)
```

Operator sections create functions from operators:

```haskell
(+ 1)    -- \x -> x + 1
(1 +)    -- \x -> 1 + x
(> 10)   -- \x -> x > 10
(10 >)   -- \x -> 10 > x
```

The last two are not the same:

```haskell
filter (> 10) numbers
```

keeps numbers greater than 10.

```haskell
filter (10 >) numbers
```

keeps numbers less than 10.

| Form             | Equivalent lambda        | Meaning                 |
| ---------------- | ------------------------ | ----------------------- |
| `f a`            | `\x -> f a x`            | Pre-fill first argument |
| `(+ 1)`          | `\x -> x + 1`            | Add one to input        |
| `(1 +)`          | `\x -> 1 + x`            | Add input to one        |
| `(< limit)`      | `\x -> x < limit`        | Test below limit        |
| `(limit <)`      | `\x -> limit < x`        | Test above limit        |
| `Map.lookup key` | `\m -> Map.lookup key m` | Lookup same key in maps |

Argument order affects partial application. Haskell libraries often place the most variable or data argument last so that earlier arguments can be pre-filled.

Example:

```haskell
filterByRole :: Role -> [User] -> [User]
filterByRole role =
  filter (\user -> userRole user == role)
```

The `role` is configured first; the list comes last.

**Common Pitfalls.** Operator sections can be visually misleading. `(10 >)` means “10 is greater than the input,” not “input greater than 10.” Another pitfall is designing function arguments in an order that makes partial application awkward. Put configuration-like arguments before the data argument when the function is likely to be reused as a transformer.

### Design Function Signatures — input order, constraints, effects, domain names

A Haskell function signature is often the most important design artifact. It should reveal what the function needs, what it guarantees, and what kind of computation it performs.

Compare:

```haskell
process :: Text -> Text -> IO Bool
```

with:

```haskell
authenticate :: Email -> Password -> IO AuthResult
```

The second signature carries domain meaning. It also avoids collapsing a rich result into `Bool`.

| Signature choice  | Weak version                        | Stronger version                                      | Why                                |
| ----------------- | ----------------------------------- | ----------------------------------------------------- | ---------------------------------- |
| Raw primitives    | `Text -> Text -> Bool`              | `Email -> Password -> AuthResult`                     | Names domain concepts              |
| Boolean result    | `User -> Bool`                      | `User -> Eligibility` or `Either Reason EligibleUser` | Explains failure or state          |
| Hidden effect     | Pure-looking but uses unsafe effect | `IO a` or explicit effect                             | Makes external interaction visible |
| Vague error       | `Either Text a`                     | `Either DomainError a`                                | Machine-readable failure           |
| Over-constrained  | `MonadIO m => ...` everywhere       | `IO ...` or smaller constraint                        | Avoids unnecessary abstraction     |
| Under-constrained | `a -> Text` impossible honestly     | `Show a => a -> Text`                                 | States required behavior           |

Argument order matters. A common Haskell pattern places stable configuration first and primary data last:

```haskell
renderWithTheme :: Theme -> Document -> Text
renderWithTheme theme document =
  ...
```

This allows:

```haskell
renderDark :: Document -> Text
renderDark =
  renderWithTheme darkTheme
```

For collection-processing functions, the data structure often comes last:

```haskell
findBy :: (a -> Bool) -> [a] -> Maybe a
```

This supports partial application:

```haskell
findAdmin :: [User] -> Maybe User
findAdmin =
  findBy userIsAdmin
```

Effect placement also matters:

```haskell
validateUser :: RawUser -> Either UserError User
saveUser     :: User -> IO ()
```

Validation is pure. Saving is effectful. Combining them:

```haskell
registerUser :: RawUser -> IO (Either UserError ())
registerUser raw =
  case validateUser raw of
    Left err ->
      pure (Left err)

    Right user -> do
      saveUser user
      pure (Right ())
```

The signature says that registration performs `IO` and may fail validation.

**Failure-first explanation.** The tempting but wrong mental model is that types are inferred, so signature design is secondary. The surprising failure is an API that typechecks but communicates almost nothing: primitives everywhere, `Bool` results, `Text` errors, unnecessary `IO`, and vague constraints. The correct explanation is that type signatures are interface design. The professional rule is: **use domain types at boundaries, expose effects honestly, choose error types by caller needs, and keep constraints no more abstract than useful.** The boundary changes in internal local helpers, where concise inferred types may be acceptable.

### Use Closures and Higher-Order Functions — behavior as value, local policy, dependency passing

A higher-order function takes or returns a function. This is ordinary in Haskell.

```haskell
filter :: (a -> Bool) -> [a] -> [a]
map    :: (a -> b) -> [a] -> [b]
```

A closure can capture local values:

```haskell
usersOlderThan :: Int -> [User] -> [User]
usersOlderThan minimumAge users =
  filter (\user -> userAge user >= minimumAge) users
```

The lambda captures `minimumAge`.

Higher-order functions are good for expressing reusable control patterns.

```haskell
retry :: Int -> IO (Either e a) -> IO (Either e a)
retry attempts action =
  ...
```

Here `retry` abstracts a behavior pattern around an effectful action.

| Task                    | Higher-order shape          | Example                     |
| ----------------------- | --------------------------- | --------------------------- |
| Filtering               | `(a -> Bool) -> [a] -> [a]` | `filter active users`       |
| Transformation          | `(a -> b) -> [a] -> [b]`    | `map userName users`        |
| Sorting by projection   | `(a -> key) -> [a] -> [a]`  | `sortOn userAge users`      |
| Resource handling       | `(Handle -> IO a) -> IO a`  | `withFile path mode action` |
| Retry/wrapping behavior | `IO a -> IO a` or richer    | `retry 3 request`           |
| Interpretation          | `(command -> m result)`     | command handlers            |

Higher-order resource patterns are especially important:

```haskell
withUserFile :: FilePath -> (Handle -> IO a) -> IO a
withUserFile path action =
  withFile path ReadMode action
```

The function receives a callback-like action, but unlike ad-hoc callback style, resource acquisition and release can be controlled by the abstraction.

**Common Pitfalls.** Higher-order functions should make control structure clearer, not hide it. If a function takes many function arguments with unclear roles, a record of named functions or a domain-specific type may be better. Another pitfall is callback-style nesting in `IO` where applicative or monadic composition would be clearer.

### Choose Between Explicit Recursion, Higher-Order Functions, and Typeclass Abstraction

Haskell gives several levels of abstraction. Choosing the right level matters.

| Problem                           | Good first tool                          | Escalate to               | Avoid                              |
| --------------------------------- | ---------------------------------------- | ------------------------- | ---------------------------------- |
| One-off list processing           | `map`, `filter`, fold                    | Named helper if complex   | Manual recursion by habit          |
| Custom recursive ADT              | Direct recursion                         | Custom fold/traversal     | Forcing list abstractions          |
| Repeated behavior over many types | Typeclass                                | Generic deriving/laws     | Copy-pasted functions              |
| Runtime dependency                | Function argument or record of functions | Reader/effect system      | Global typeclass instance by habit |
| One transformation pipeline       | Function composition                     | Named intermediate values | Dense symbolic point-free code     |
| Independent effect combination    | `Applicative`                            | Validation abstraction    | Monadic sequencing by habit        |
| Dependent effect sequencing       | `Monad` / `do`                           | Transformer/effect stack  | Manual nesting                     |

Example of escalation:

Start concrete:

```haskell
activeUserNames :: [User] -> [Text]
activeUserNames =
  map userName . filter userIsActive
```

Abstract over predicate and projection:

```haskell
selectMap :: (a -> Bool) -> (a -> b) -> [a] -> [b]
selectMap predicate project =
  map project . filter predicate
```

This is only useful if the pattern recurs. Otherwise, the original concrete function is clearer.

Abstract over foldable structure:

```haskell
selectMap :: Foldable t => (a -> Bool) -> (a -> b) -> t a -> [b]
selectMap predicate project =
  foldr step []
  where
    step x acc
      | predicate x = project x : acc
      | otherwise   = acc
```

This may be useful in a library, but excessive in application code unless multiple structures benefit.

**Failure-first explanation.** The tempting but wrong mental model is that Haskell encourages maximum abstraction. The surprising failure is an application codebase filled with typeclasses, rank-n types, and polymorphic helpers that solve no stable problem. The correct explanation is that abstraction has maintenance cost. The professional rule is: **begin concrete, abstract over real repetition, and choose the smallest abstraction that preserves the relevant variation.** The boundary changes for library authors, whose job is often to provide reusable abstractions.

### Compose Effects — Functor, Applicative, Monad as task distinctions

`Functor`, `Applicative`, and `Monad` are not just theoretical labels. They answer different practical questions.

| Task                                  | Abstraction   | Core intuition                            | Example                           |
| ------------------------------------- | ------------- | ----------------------------------------- | --------------------------------- |
| Transform result inside context       | `Functor`     | I have `f a` and `a -> b`; get `f b`      | `fmap userName maybeUser`         |
| Combine independent contextual values | `Applicative` | I have `f a`, `f b`, and pure constructor | `User <$> parseName <*> parseAge` |
| Sequence dependent contextual steps   | `Monad`       | Next step depends on previous result      | `parseId txt >>= loadUser`        |

`Functor` example:

```haskell
displayAge :: Maybe Int -> Maybe Text
displayAge =
  fmap showText
```

`Applicative` example:

```haskell
mkUser :: Name -> Email -> Age -> User

parseUser :: RawUser -> Either UserError User
parseUser raw =
  mkUser
    <$> parseName (rawName raw)
    <*> parseEmail (rawEmail raw)
    <*> parseAge (rawAge raw)
```

This says the three parses are structurally independent, and their successful results are combined into `User`.

`Monad` example:

```haskell
loadUserFromText :: Text -> IO (Maybe User)
loadUserFromText txt =
  case parseUserId txt of
    Nothing ->
      pure Nothing

    Just userId ->
      loadUser userId
```

Using `MaybeT` or other transformer tools can reduce nesting, but the semantic point remains: loading depends on the parsed ID.

A pure `Maybe` monadic example:

```haskell
userCity :: User -> Maybe Text
userCity user = do
  address <- userAddress user
  city    <- addressCity address
  pure city
```

The second step depends on the address produced by the first step.

**Interdisciplinary Lens: Category Theory**

What it clarifies: these abstractions encode different composition patterns. `Functor` maps, `Applicative` combines independent contexts, and `Monad` sequences dependent contexts.

Language feature involved: `fmap`, `<$>`, `<*>`, `pure`, `>>=`, `do`.

Practical consequence: choosing the weakest sufficient abstraction communicates dependency structure.

Limit of the lens: categorical vocabulary does not replace reading the concrete instance. `Maybe`, `Either`, `IO`, list, and parser instances behave differently.

**Failure-first explanation.** The tempting but wrong mental model is that `Monad` is the powerful abstraction, so it should be used whenever possible. The surprising cost is losing information: a monadic API implies dependency even when computations are independent. The correct explanation is that `Applicative` expresses independent combination, while `Monad` expresses dependent sequencing. The professional rule is: **prefer `Functor` for simple transformation, `Applicative` for independent combination, and `Monad` when later steps need earlier values.** The boundary changes when ergonomics or library conventions favor `do` notation, but the dependency distinction remains important.
### Parser Combinators as Composition — sequencing, alternatives, structure-preserving parsing

Parser combinators are one of Haskell’s clearest examples of abstraction turning into practical code. A parser can be treated as a value. Small parsers can be combined into larger parsers by function composition, `Applicative`, `Alternative`, and `Monad`. This is not just theory; it is a concrete style for building readable parsers. This follows the uploaded requirement to connect category-theoretic concepts only where they clarify real Haskell mechanisms and practical programming style. 

A simplified parser type can be imagined as:

```haskell
Parser a
```

meaning: a parser that may consume input and produce an `a`.

A parser for a field:

```haskell
parseName :: Parser Name
parseAge  :: Parser Age
```

A data constructor:

```haskell
User :: Name -> Age -> User
```

can be combined applicatively:

```haskell
parseUser :: Parser User
parseUser =
  User <$> parseName <*> parseAge
```

This says: parse a name, parse an age, and combine the two results with the `User` constructor. If the parses are structurally independent, `Applicative` expresses the shape precisely.

If the second parse depends on the first result, `Monad` is appropriate:

```haskell
parseSizedPayload :: Parser Payload
parseSizedPayload = do
  size <- parseSize
  parsePayloadOfSize size
```

Here the payload parser cannot be chosen until `size` is known.

| Parsing task              | Abstraction    | Example shape                      | Why                                           |                          |
| ------------------------- | -------------- | ---------------------------------- | --------------------------------------------- | ------------------------ |
| Transform parsed value    | `Functor`      | `normalize <$> parseName`          | Parsed result changes, parser structure stays |                          |
| Combine fixed fields      | `Applicative`  | `User <$> pName <*> pAge`          | Field parsers are independent                 |                          |
| Choose among alternatives | `Alternative`  | `pA <                              | > pB`                                         | Try one parse or another |
| Parse dependent structure | `Monad`        | `n <- pSize; pBytes n`             | Later parser depends on earlier result        |                          |
| Repeat parser             | `many`, `some` | `many parseItem`                   | Repetition                                    |                          |
| Ignore syntax token       | `*>`, `<*`     | `symbol "(" *> expr <* symbol ")"` | Keep semantic result, discard delimiters      |                          |

Example:

```haskell
parsePair :: Parser (Name, Age)
parsePair =
  (,)
    <$> parseName
    <*  symbol ":"
    <*> parseAge
```

The operators have precise meanings. `<$>` maps the tuple constructor into the parser context. `<*` runs two parsers but keeps the left result. `<*>` applies a parsed function-like value to a parsed argument-like value.

This style makes parser code resemble a grammar. It can also become dense. For larger parsers, named helper parsers are often clearer than long symbolic chains.

**Interdisciplinary Lens: Category Theory**

What it clarifies: parser combinators show the practical difference between mapping, independent combination, alternatives, and dependent sequencing.

Language feature involved: `Functor`, `Applicative`, `Alternative`, `Monad`, parser libraries.

Practical consequence: parser structure can mirror grammar structure, and the choice between `Applicative` and `Monad` communicates whether parsing steps are independent or dependent.

Limit of the lens: category theory does not decide error-message quality, backtracking policy, performance, or which parser library fits the task.

**Common Pitfalls.** The common failure is using `do` notation for every parser because it is familiar. This can hide the grammar’s static structure. Conversely, an overly applicative parser can become unreadable if the grammar contains many named intermediate concepts. Use applicative style when the grammar shape is fixed; use monadic style when later parsing genuinely depends on earlier results.

### Design Reusable Helpers — local functions, higher-order functions, typeclasses, modules

Reusable helpers in Haskell should grow from repeated structure. A helper can be local, module-level, higher-order, typeclass-based, or packaged as a small abstraction.

Start local:

```haskell
renderUser :: User -> Text
renderUser user =
  renderName name <> " <" <> renderEmail email <> ">"
  where
    name  = userName user
    email = userEmail user
```

If a helper is only meaningful inside one function, keep it local. If it is reused across the module, promote it to module level.

```haskell
renderEmailAddress :: Email -> Text
renderEmailAddress =
  unEmail
```

If behavior varies, pass a function:

```haskell
renderListWith :: (a -> Text) -> [a] -> Text
renderListWith renderItem items =
  T.intercalate ", " (map renderItem items)
```

If behavior belongs to many types and should be lawlike or conventional, consider a typeclass:

```haskell
class Render a where
  render :: a -> Text
```

But this escalation should be justified.

| Reuse need                              | Prefer                 | Example                      | Warning                                      |
| --------------------------------------- | ---------------------- | ---------------------------- | -------------------------------------------- |
| One function needs helper               | Local `where` or `let` | `where clean = ...`          | Do not export incidental helpers             |
| Several functions in module need helper | Module-level function  | `normalizeEmailText`         | Keep name domain-specific                    |
| Behavior varies per call                | Function parameter     | `(a -> Text) -> [a] -> Text` | Avoid too many anonymous function parameters |
| Behavior belongs to type                | Typeclass              | `Render a`                   | Do not create global instances casually      |
| Dependency varies at runtime            | Record of functions    | `UserStore m`                | Typeclass may be less explicit               |
| Repeated module pattern                 | Module abstraction     | Internal module              | Avoid over-engineered hierarchy              |

A typeclass is a heavy form of reuse because instances become part of the global or module-visible semantic environment. A function parameter is often simpler and more explicit.

Weak design:

```haskell
class HasName a where
  getName :: a -> Text
```

This may be unjustified if only `User` has a name in the relevant program. A plain function is clearer:

```haskell
userName :: User -> Text
```

Better typeclass use:

```haskell
class ToSqlValue a where
  toSqlValue :: a -> SqlValue
```

Here the behavior genuinely applies to many types in a shared serialization context.

**Failure-first explanation.** The tempting but wrong mental model is that repeated field names or repeated functions should become a typeclass. The surprising cost is global instance design, ambiguous constraints, and APIs that are harder to understand than the duplication they removed. The correct explanation is that typeclasses are for coherent behavior across types, not for arbitrary code reuse. The professional rule is: **prefer plain functions and local helpers first; introduce typeclasses when the behavior is stable, reusable, and semantically belongs to the participating types.** The boundary changes in library design, where typeclass abstraction is often a core product.

### Design Public APIs — signatures, constructor visibility, constraints, effects, naming

A public Haskell API is shaped by type signatures, module exports, constructor visibility, typeclass constraints, and effect choices.

Consider this weak API:

```haskell
createUser :: Text -> Text -> Int -> IO Bool
```

It hides too much. The two `Text` arguments are unclear. The `Int` could be age, ID, score, or limit. `Bool` gives no failure reason. `IO` may be necessary, but it does not say which part is effectful.

A stronger decomposition:

```haskell
validateUser :: RawUser -> Either UserError User

saveUser :: User -> IO ()

createUser :: RawUser -> IO (Either UserError UserId)
```

This separates pure validation from effectful persistence and gives failures a domain type.

| API design choice             | Stronger Haskell style                   | Why                            |
| ----------------------------- | ---------------------------------------- | ------------------------------ |
| Use domain types              | `Email -> Password -> ...`               | Prevents primitive confusion   |
| Expose failure explicitly     | `Either AuthError Session`               | Caller can handle cases        |
| Keep pure logic pure          | `validate :: Raw -> Either Error Domain` | Easier testing and reuse       |
| Hide constructors when needed | Export `Email`, not `Email(..)`          | Preserves invariants           |
| Minimize constraints          | `MonadReader Config m` only when needed  | Avoids unnecessary abstraction |
| Name effects honestly         | `load`, `save`, `fetch`, `send`          | Signals boundary behavior      |
| Avoid Boolean blindness       | `AuthResult`, `Eligibility`, `Decision`  | Explains result meaning        |
| Prefer small modules          | Export coherent surface                  | Reduces accidental coupling    |

Boolean blindness is common. This is weak:

```haskell
canRegister :: User -> Bool
```

Maybe enough for a predicate, but if the caller needs a reason:

```haskell
checkRegistration :: User -> Either RegistrationProblem EligibleUser
```

This says more: registration can fail, the failure has a structured reason, and success produces a value certified as eligible.

**Common Pitfalls.** A frequent anti-pattern is exporting too many implementation details because it makes testing or quick development easier. Another is using typeclass-polymorphic APIs in application code before there is a need. Good Haskell APIs are not necessarily maximally abstract; they are honest about domain concepts, effects, and failure.

### Choose Functions versus Objects — records, ADTs, typeclasses, capabilities

Haskell does not use class-based object orientation as its central design model. But it can express many OO-like goals through different mechanisms: records for data, ADTs for variants, modules for encapsulation, typeclasses for shared behavior, and records of functions for runtime capabilities.

| OO intention                | Haskell equivalent   | Example                                    |           |
| --------------------------- | -------------------- | ------------------------------------------ | --------- |
| Object with fields          | Record               | `User { userName, userAge }`               |           |
| Object variants/subclasses  | Sum type             | `PaymentMethod = Card ...                  | Bank ...` |
| Interface behavior          | Typeclass            | `class Render a where render :: a -> Text` |           |
| Dependency-injected service | Record of functions  | `UserStore m`                              |           |
| Encapsulation               | Module export list   | Hide constructors                          |           |
| Method call                 | Function application | `userName user`                            |           |
| Immutable update            | Record update        | `user { userAge = age + 1 }`               |           |

A direct OO translation often produces poor Haskell. For example, this mental model:

```text
User object has methods validate, save, render
```

may become better Haskell as:

```haskell
validateUser :: RawUser -> Either UserError User
saveUser     :: UserStore IO -> User -> IO ()
renderUser   :: User -> Text
```

The behavior is organized by function and module, not by attaching every operation to an object.

For runtime-polymorphic behavior, use records of functions:

```haskell
data Logger m = Logger
  { logInfo  :: Text -> m ()
  , logError :: Text -> m ()
  }
```

This is often clearer than a typeclass when the implementation is chosen at runtime or passed to a subsystem.

For type-indexed behavior, use a typeclass:

```haskell
class Render a where
  render :: a -> Text
```

This is better when rendering belongs to the type and instances are stable.

**Failure-first explanation.** The tempting but wrong mental model is to ask “where do I put the methods?” The surprising answer is that Haskell often does not put behavior inside data. The correct explanation is that data, behavior, and effects are separated unless there is a good reason to combine them through a typeclass or function record. The professional rule is: **model data with ADTs and records, model behavior with functions, model shared lawful behavior with typeclasses, and model runtime capabilities with records of functions.** The boundary changes when using libraries that provide object-like existential wrappers or effect systems, but the basic separation remains useful.

### Choose Inheritance versus Composition — ADTs, typeclasses, delegation, records

Haskell does not have inheritance in the mainstream class-based OO sense. It favors composition.

Composition can mean several things:

| Composition form       | Haskell mechanism              | Example                                 |             |
| ---------------------- | ------------------------------ | --------------------------------------- | ----------- |
| Data composition       | Records contain fields         | `User Profile Settings`                 |             |
| Behavior composition   | Functions call functions       | `normalize = lower . strip`             |             |
| Variant composition    | ADTs combine alternatives      | `Command = Create ...                   | Delete ...` |
| Constraint composition | Multiple typeclass constraints | `(MonadIO m, MonadReader Env m) => ...` |             |
| Effect composition     | Transformers/effect libraries  | `ExceptT Error IO a`                    |             |
| Module composition     | Import/export modules          | API layering                            |             |
| Capability composition | Records of functions           | `AppEnv { logger, store }`              |             |

Inheritance-like modeling can often be replaced by ADTs:

OO-like thought:

```text
Animal
  Dog
  Cat
  Bird
```

Haskell:

```haskell
data Animal
  = Dog DogInfo
  | Cat CatInfo
  | Bird BirdInfo
```

Functions pattern match:

```haskell
speak :: Animal -> Sound
speak animal =
  case animal of
    Dog _  -> Bark
    Cat _  -> Meow
    Bird _ -> Chirp
```

If the set of animals is closed, this is good. If new animal types must be added by other packages without modifying the original type, a typeclass or existential wrapper may fit better.

```haskell
class Speaks a where
  speak :: a -> Sound
```

**Common Pitfalls.** Do not simulate inheritance mechanically with typeclasses. A typeclass is not a superclass hierarchy. Use an ADT when the variants are known and exhaustive handling matters. Use a typeclass when many types share behavior and the set of types should remain open.

### Express Reusable Abstractions — typeclasses, laws, minimal complete definitions

Typeclasses define reusable behavior. Many classes have laws and minimal complete definitions.

Example:

```haskell
class Render a where
  render :: a -> Text
```

A more realistic class may have default methods:

```haskell
class Sized a where
  size :: a -> Int

  isEmpty :: a -> Bool
  isEmpty x = size x == 0
```

An instance can implement only `size` and receive the default `isEmpty`.

```haskell
instance Sized Text where
  size = T.length
```

For standard typeclasses, laws matter. Consider `Functor`:

```haskell
class Functor f where
  fmap :: (a -> b) -> f a -> f b
```

Expected laws:

```haskell
fmap id = id
fmap (g . f) = fmap g . fmap f
```

A lawful `Functor` preserves structure and transforms contents. A law-breaking one may typecheck but sabotage generic expectations.

| Typeclass design question         | Good practice                            | Bad practice                                     |
| --------------------------------- | ---------------------------------------- | ------------------------------------------------ |
| Does behavior belong to the type? | Define class only if coherent            | Class for accidental shared function name        |
| Are there laws?                   | State or follow them                     | Rely only on method types                        |
| Is there one obvious instance?    | Usually safe                             | Multiple plausible instances create confusion    |
| Are defaults meaningful?          | Provide lawful defaults                  | Defaults that hide inefficient or wrong behavior |
| Is the class too broad?           | Keep minimal operations                  | Kitchen-sink class                               |
| Is the class too narrow?          | Avoid one-method class unless meaningful | Fragmented constraints everywhere                |

A one-method class is not automatically bad, but it must represent a real concept. `Show` has one main method and is useful. A class like:

```haskell
class HasUserName a where
  getUserName :: a -> Text
```

may be too weak unless it appears across meaningful abstractions.

**Failure-first explanation.** The tempting but wrong mental model is that typeclasses are free abstraction. The surprising cost is instance coherence, law expectations, more complex types, and harder error messages. The correct explanation is that typeclasses define public semantic structure. The professional rule is: **create typeclasses slowly, document laws when relevant, and prefer ordinary functions when only one type or one module needs the behavior.** The boundary changes for generic libraries, where typeclasses are often essential.

### Metaprogramming and Boilerplate Reduction — deriving, Generics, Template Haskell

Haskell has several ways to reduce boilerplate. They differ in complexity and visibility.

| Tool                         | Use                                    | Example                                | Cost                                            |
| ---------------------------- | -------------------------------------- | -------------------------------------- | ----------------------------------------------- |
| Stock deriving               | Generate standard instances            | `deriving (Eq, Show)`                  | Limited to supported classes                    |
| Deriving strategies          | Clarify deriving mechanism             | `deriving stock`, `deriving newtype`   | Requires extension                              |
| Generalized newtype deriving | Reuse representation’s instance        | `newtype Age = Age Int` deriving `Num` | Can create semantically questionable instances  |
| Deriving via                 | Derive through an explicit helper type | `deriving via ...`                     | More advanced                                   |
| `Generic`                    | Structural generic programming         | JSON, defaults, generic functions      | Error messages and compile time                 |
| Template Haskell             | Compile-time code generation           | Lenses, serialization, boilerplate     | Harder tooling, staging, generated code opacity |
| Generics libraries           | Derive behavior structurally           | Generic encoders/decoders              | Abstraction overhead and complexity             |

Example:

```haskell
{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE DerivingStrategies #-}

data User = User
  { userName :: Text
  , userAge  :: Int
  }
  deriving stock (Eq, Show, Generic)
```

This can support generic JSON derivation with ecosystem libraries.

`newtype` deriving is convenient:

```haskell
{-# LANGUAGE GeneralizedNewtypeDeriving #-}

newtype UserId = UserId Int
  deriving newtype (Eq, Ord, Show)
```

But deriving numeric behavior may be questionable:

```haskell
newtype Age = Age Int
  deriving newtype (Eq, Ord, Num)
```

This permits `Age 10 + Age 20`, which may or may not make domain sense. It may also permit negative ages unless construction is controlled.

**Common Pitfalls.** Boilerplate reduction can weaken semantic design. Deriving `ToJSON`, `FromJSON`, `Ord`, `Num`, or `Read` should not be automatic without thinking about external format stability, domain ordering, numeric validity, or parse safety. Template Haskell and generic derivation are useful, but they should not hide critical API semantics.

### Over-Abstraction and Under-Abstraction — recognizing both failure modes

Haskell makes abstraction easy, so over-abstraction is a real risk. But under-abstraction is also a risk: repeated fragile code can hide a missing concept.

| Failure mode              | Symptom                                 | Example                                   | Correction                        |
| ------------------------- | --------------------------------------- | ----------------------------------------- | --------------------------------- |
| Under-abstraction         | Repeated pattern with small variations  | Many ad-hoc validation functions          | Extract helper or domain type     |
| Over-abstraction          | General type no one needs               | Polymorphic effect constraints everywhere | Return to concrete types          |
| Premature typeclass       | One instance, vague name                | `class HasThing a`                        | Use plain function                |
| Premature GADT            | Simple state encoded with complex types | Type errors dominate code                 | Use ADT or smart constructor      |
| Symbolic over-composition | Dense point-free code                   | Many operators, few names                 | Add named arguments/intermediates |
| Boilerplate worship       | Manual repetitive code                  | Many identical instances                  | Use deriving/generics             |
| Boilerplate hiding        | Generated code hides semantics          | Auto JSON for public API                  | Write explicit instances          |

Under-abstraction example:

```haskell
validateName  :: Text -> Maybe Text
validateEmail :: Text -> Maybe Text
validateCity  :: Text -> Maybe Text
```

If all three enforce non-empty trimmed text, introduce a concept:

```haskell
newtype NonEmptyText = NonEmptyText Text

mkNonEmptyText :: Text -> Maybe NonEmptyText
```

Over-abstraction example:

```haskell
process
  :: ( MonadReader env m
     , MonadError err m
     , MonadIO m
     , HasLogger env
     , HasUserStore env
     )
  => RawUser
  -> m UserId
```

This might be justified in a large application, but it is overkill for a small module where:

```haskell
process :: Logger IO -> UserStore IO -> RawUser -> IO (Either UserError UserId)
```

would be clearer.

**Failure-first explanation.** The tempting but wrong mental model is that Haskell code should be abstract because the language is good at abstraction. The surprising failure is that the code becomes harder to change, not easier. The correct explanation is that abstraction is a compression of stable structure; if the structure is not stable, the abstraction compresses the wrong thing. The professional rule is: **abstract repeated meaning, not repeated syntax alone.** The boundary changes in library code and algebraic domains, where abstractions may be designed ahead of use because they are the product itself.

### Task Pattern: Design a Small Transformation Pipeline — pure first, effects last

A common Haskell workflow is to keep a transformation pipeline pure, then connect it to effects at the boundary.

Suppose raw input is read from a file, parsed, validated, transformed, and saved.

Pure pieces:

```haskell
parseRows :: Text -> Either ParseError [RawUser]

validateUsers :: [RawUser] -> Either UserError [User]

normalizeUsers :: [User] -> [User]
```

Effectful boundary:

```haskell
import qualified Data.Text.IO as TIO

runImport :: FilePath -> IO (Either ImportError Int)
runImport path = do
  contents <- TIO.readFile path
  case parseRows contents of
    Left parseError ->
      pure (Left (ImportParseError parseError))

    Right rawUsers ->
      case validateUsers rawUsers of
        Left userError ->
          pure (Left (ImportUserError userError))

        Right users -> do
          let normalized = normalizeUsers users
          saveUsers normalized
          pure (Right (length normalized))
```

The pure functions are easy to test. The `IO` function orchestrates reading and saving.

A more abstract version may use `ExceptT`, but the design idea is the same: keep meaning pure until effects are necessary.

| Pipeline layer      | Type shape                         | Responsibility      |
| ------------------- | ---------------------------------- | ------------------- |
| Read external input | `IO Text`                          | Touch filesystem    |
| Parse syntax        | `Text -> Either ParseError Raw`    | Decode structure    |
| Validate meaning    | `Raw -> Either DomainError Domain` | Enforce invariants  |
| Transform domain    | `Domain -> Domain`                 | Pure business logic |
| Persist/output      | `Domain -> IO Result`              | External effect     |

**Common Pitfalls.** The anti-pattern is putting all logic in `IO` from the start. This makes validation, transformation, and formatting harder to test and reason about. Another anti-pattern is making the pure pipeline so abstract that error handling becomes unreadable. Start with explicit pure functions, then abstract only where repetition appears.

### Task Pattern: Design a Stateful Computation — explicit state, State, IORef, STM

Haskell has several ways to model state. The right choice depends on whether the state is pure, local, mutable, shared, or concurrent.

| State task                  | Tool               | Type shape                  | Use                                    |
| --------------------------- | ------------------ | --------------------------- | -------------------------------------- |
| Pure state transition       | Explicit parameter | `s -> (a, s)`               | Simple and transparent                 |
| Structured pure state       | `State s a`        | State-threading abstraction | Parser-like or simulation logic        |
| Local mutable state in `IO` | `IORef`            | `IORef a`                   | Single-threaded or controlled mutation |
| Shared concurrent state     | `TVar` / STM       | `STM a`                     | Composable concurrent transactions     |
| Synchronization             | `MVar`             | `MVar a`                    | Communication or locking               |
| Performance-local mutation  | `ST`               | `ST s a`                    | Pure interface with local mutation     |

Explicit state:

```haskell
stepCounter :: Int -> (Int, Int)
stepCounter count =
  (count, count + 1)
```

State monad style:

```haskell
nextCounter :: State Int Int
nextCounter = do
  count <- get
  put (count + 1)
  pure count
```

Mutable reference in `IO`:

```haskell
incrementRef :: IORef Int -> IO Int
incrementRef ref = do
  n <- readIORef ref
  let n' = n + 1
  writeIORef ref n'
  pure n'
```

Concurrent shared state should usually avoid raw `IORef` unless atomicity is handled carefully. STM gives composable transactions:

```haskell
incrementTVar :: TVar Int -> STM Int
incrementTVar var = do
  n <- readTVar var
  let n' = n + 1
  writeTVar var n'
  pure n'
```

**Failure-first explanation.** The tempting but wrong mental model is that because Haskell is pure, state is unnatural. The surprising reality is that Haskell has many state tools, but each makes the state boundary explicit. The correct explanation is that Haskell distinguishes pure state transformation, local mutation, effectful mutation, and concurrent shared state. The professional rule is: **use pure state when possible, `State` when threading becomes noisy, `IORef` for controlled local mutable state, and STM for composable concurrent shared state.** The boundary changes for performance-critical code, where `ST` or mutable arrays may provide a pure external API with internal mutation.

### Task Pattern: Design an Effectful Workflow — do notation, ExceptT, Reader, capability records

Real applications need configuration, logging, error handling, database access, network calls, and resource management. Haskell offers several architecture styles.

Concrete explicit style:

```haskell
register
  :: Logger IO
  -> UserStore IO
  -> RawUser
  -> IO (Either UserError UserId)
```

Reader-style environment:

```haskell
data AppEnv = AppEnv
  { appLogger    :: Logger IO
  , appUserStore :: UserStore IO
  }

register :: RawUser -> ReaderT AppEnv IO (Either UserError UserId)
```

Error-transformer style:

```haskell
register :: RawUser -> ExceptT UserError (ReaderT AppEnv IO) UserId
```

These styles trade explicitness against convenience.

| Style                        | Strength                            | Cost                                 |
| ---------------------------- | ----------------------------------- | ------------------------------------ |
| Pass dependencies explicitly | Clear and simple                    | Many parameters                      |
| Record of capabilities       | Named dependencies, testable        | Manual plumbing                      |
| `ReaderT env IO`             | Common application pattern          | Environment can become global bag    |
| `ExceptT e m`                | Convenient typed failure sequencing | Transformer stacks can become opaque |
| Typeclass capabilities       | Abstract and testable               | Constraint-heavy APIs                |
| Effect libraries             | Modular effects                     | Ecosystem choice and learning cost   |

A modest `ReaderT` pattern:

```haskell
data AppEnv = AppEnv
  { appLogInfo :: Text -> IO ()
  , appSaveUser :: User -> IO UserId
  }

register :: RawUser -> ReaderT AppEnv IO (Either UserError UserId)
register raw = do
  env <- ask
  case validateUser raw of
    Left err ->
      pure (Left err)

    Right user -> do
      liftIO (appLogInfo env "saving user")
      userId <- liftIO (appSaveUser env user)
      pure (Right userId)
```

This style is practical, but it can become a dumping ground if every dependency is placed into one large environment.

**Common Pitfalls.** A common failure is introducing monad transformers before understanding the plain version. Another is letting `ReaderT Env IO` become hidden global state. The professional rule is to keep the environment coherent, pass narrow capability records when useful, and choose abstraction based on testing, dependency control, and error-handling needs.

### Abstraction Mechanism Map — choosing the right tool

| Abstraction mechanism | Best use                             | Coupling level | Failure mode                        |
| --------------------- | ------------------------------------ | -------------: | ----------------------------------- |
| Local helper          | Clarify one function                 |            Low | Too many trivial helpers            |
| Module-level function | Reused operation in module           |  Low to medium | Vague utility modules               |
| Higher-order function | Behavior parameter                   |         Medium | Callback-like unreadability         |
| ADT                   | Closed alternatives                  |         Medium | Hard to extend with new variants    |
| Record                | Product data or capabilities         |         Medium | Large records with unclear cohesion |
| Typeclass             | Shared behavior across types         | Medium to high | Unlawful or unnecessary instances   |
| Newtype               | Semantic distinction                 |            Low | Excessive wrapping                  |
| Phantom type          | Compile-time phase marker            |         Medium | Ceremonial types                    |
| GADT                  | Constructor-specific type refinement |           High | Complex errors and transformations  |
| Type family           | Type-level relationship              |           High | Ambiguity and difficult APIs        |
| Template Haskell      | Boilerplate/code generation          |           High | Generated code opacity              |
| Effect system         | Modular effects                      |           High | Ecosystem and inference complexity  |

A useful decision rule is: **prefer the tool whose complexity matches the mistake it prevents.** A `newtype` that prevents mixing `UserId` and `ProductId` is cheap and effective. A GADT for the same problem is likely excessive. A typeclass for one function and one type is usually premature. A record of functions may be better for runtime-selected behavior than a typeclass.

### API Design Choice Table — readability, safety, flexibility

| Choice                      | Readability |                   Safety | Flexibility | Use when                                   |
| --------------------------- | ----------: | -----------------------: | ----------: | ------------------------------------------ |
| Concrete domain function    |        High |                     High |      Medium | Application/domain APIs                    |
| Highly polymorphic function |      Medium | High if well constrained |        High | Libraries and reusable combinators         |
| `Maybe` result              |        High |                   Medium |      Medium | Absence with no needed detail              |
| `Either DomainError` result |        High |                     High |      Medium | Recoverable failure with explanation       |
| Exception                   |      Medium |            Low to medium |        High | Operational failure or framework boundary  |
| Hidden constructor          |      Medium |                     High |      Medium | Invariants matter                          |
| Public constructor          |        High |                   Medium |        High | Plain transparent data                     |
| Typeclass                   |      Medium |           Medium to high |        High | Stable lawful behavior                     |
| Record of functions         |        High |                   Medium |        High | Runtime dependency injection               |
| Transformer stack           |      Medium |                   Medium |        High | Multiple effects with sequencing           |
| Effect library              |      Varies |                   Varies |        High | Large systems with effect modularity needs |

Safety here means “ability of the API to prevent misuse,” not “proof of total correctness.” A concrete, well-named, domain-specific API is often safer than a generic one because it gives callers fewer wrong moves.

### Common Control and Abstraction Pitfalls — specific failure modes

| Pitfall                            | Why it happens                      | Failure mode                                    | Better practice                            |
| ---------------------------------- | ----------------------------------- | ----------------------------------------------- | ------------------------------------------ |
| Nested `if` for ADTs               | Carryover from imperative languages | Missed domain cases                             | Pattern match on constructors              |
| Catch-all wildcard in domain logic | Convenience                         | Future cases silently mishandled                | Match explicitly                           |
| Lazy `foldl` on large data         | Looks like ordinary fold            | Space leak                                      | Use `foldl'` for strict accumulation       |
| `mapMaybe` for important parsing   | Convenient                          | Error information lost                          | Use `traverse` with `Either` or validation |
| Point-free overuse                 | Mistaken as advanced style          | Unreadable pipelines                            | Name arguments when they carry meaning     |
| Typeclass overuse                  | Abstraction enthusiasm              | Constraint-heavy code                           | Use functions or records first             |
| Premature transformer stack        | Copying application patterns        | Hard-to-debug types                             | Write concrete version first               |
| Everything in `IO`                 | Operational habit                   | Poor testability                                | Push pure logic outward                    |
| Overusing `String` examples        | Prelude convenience                 | Slow or wrong text handling                     | Use `Text` for real text                   |
| Treating `Monad` as side effect    | Tutorial folklore                   | Misunderstands `Maybe`, `Either`, parser monads | Learn composition pattern                  |
| Ignoring laws                      | Compiler accepts instance           | Generic code breaks assumptions                 | Follow typeclass laws                      |
| Using `Show` for serialization     | Quick debug habit                   | Unstable external format                        | Use real encoders                          |

### Practical Rules for Function and Abstraction Design — compact working discipline

| Situation                                       | Rule of thumb                                         |
| ----------------------------------------------- | ----------------------------------------------------- |
| Function has unclear primitive arguments        | Introduce domain types or records                     |
| Function returns `Bool` but caller needs reason | Return ADT or `Either`                                |
| Branching follows constructors                  | Use pattern matching                                  |
| Branching follows ordered predicates            | Use guards                                            |
| Transformation cannot fail                      | Use `map` / `fmap`                                    |
| Transformation may fail and failure matters     | Use `traverse` with `Either` or validation            |
| Independent effects combine into a value        | Use `Applicative`                                     |
| Later effect depends on earlier result          | Use `Monad` / `do`                                    |
| Accumulating strictly over large list           | Use `foldl'`                                          |
| Aggregating monoidal values                     | Use `foldMap`                                         |
| Local repeated logic                            | Use `where` or `let`                                  |
| Repeated module-level behavior                  | Extract named function                                |
| Shared behavior across many types               | Consider typeclass                                    |
| Runtime-swappable dependency                    | Use record of functions or environment                |
| Invariant can be violated by construction       | Hide constructor and use smart constructor            |
| Code feels too clever                           | Add names, reduce constraints, or make types concrete |
| Code feels repetitive in a stable pattern       | Abstract one level, then reassess                     |

The deeper Haskell habit is to let **data shape**, **type shape**, and **effect shape** guide control flow. A well-modeled ADT invites pattern matching. A `Maybe` invites absence handling. An `Either` invites recoverable error flow. A `Functor` invites mapping. An `Applicative` invites independent combination. A `Monad` invites dependent sequencing. A `Monoid` invites aggregation. When code fights these shapes, the model is often wrong or the abstraction level is poorly chosen.
## PART 5 — Modules, Errors, Effects, Resources, and Boundaries by Task Pattern

### Orientation — boundaries, effects, trust, failure, API surface

Haskell’s strongest design habits become visible at boundaries. A boundary is any place where one part of a program touches another part with different assumptions: a module boundary, package boundary, error boundary, effect boundary, resource boundary, trust boundary, concurrency boundary, or foreign-code boundary. This part follows the uploaded task’s requirement to organize modules, errors, effects, resources, and boundaries by practical task pattern rather than by syntax category. 

In Haskell, boundaries are not merely organizational. They determine which values can be constructed, which effects are visible, which failures are recoverable, which invariants are trusted, and which unsafe assumptions are isolated.

| Boundary task                 | Haskell mechanism                                             | What it controls                    | Common failure                                  |
| ----------------------------- | ------------------------------------------------------------- | ----------------------------------- | ----------------------------------------------- |
| Declare public API            | Module export list                                            | What callers can name and construct | Exporting constructors that bypass invariants   |
| Organize implementation       | Modules, internal modules, packages                           | Coupling and dependency direction   | Large “utility” modules                         |
| Represent absence             | `Maybe`                                                       | Optional value                      | Losing needed error information                 |
| Represent recoverable failure | `Either e a`, domain error ADTs                               | Expected failure                    | Throwing exceptions for normal domain logic     |
| Represent operational failure | Exceptions, `IO` errors                                       | Runtime/environment failure         | Catching too broadly or too late                |
| Express effects               | `IO`, monads, effect abstractions                             | External interaction and sequencing | Letting `IO` spread everywhere                  |
| Manage resources              | `bracket`, `withFile`, `ResourceT`, structured APIs           | Acquire/release discipline          | Lazy I/O retaining handles                      |
| Isolate unsafe behavior       | `unsafePerformIO`, FFI, partial functions, unchecked coercion | Trust boundary                      | Unsafe assumptions scattered through code       |
| Handle external input         | Parsers, decoders, validators                                 | Raw-to-domain transition            | Treating decoded data as valid data             |
| Design compatibility boundary | Versioned modules, stable types, encoders/decoders            | Long-term API and data stability    | Breaking callers through representation changes |

The central rule is: **a Haskell boundary should say what is trusted, what can fail, what can perform effects, and what is intentionally hidden.**

### Declare Module Boundaries — module names, export lists, imports, qualified names

A Haskell module is both a namespace and an API boundary.

```haskell
module Account
  ( Account
  , mkAccount
  , accountName
  , accountBalance
  , deposit
  ) where
```

This export list says that outside modules may use the type `Account`, the smart constructor `mkAccount`, the field accessors, and `deposit`. If the data constructor is not exported, callers cannot construct arbitrary `Account` values.

```haskell
data Account = Account
  { accountName    :: Text
  , accountBalance :: Int
  }
```

Inside the module, the constructor is visible. Outside the module, only exported names are visible.

| Export form                 | Example            | Meaning                                                                     | Boundary consequence                        |
| --------------------------- | ------------------ | --------------------------------------------------------------------------- | ------------------------------------------- |
| Export value                | `deposit`          | Caller can use function                                                     | Stable function API                         |
| Export abstract type        | `Account`          | Caller can name type but not construct/deconstruct it                       | Preserves invariants                        |
| Export all constructors     | `Account(..)`      | Caller can construct and pattern match freely                               | Representation is public                    |
| Export selected constructor | `Account(Account)` | Constructor visible, fields maybe controlled depending on syntax/extensions | Partial representation exposure             |
| Export class                | `Render(..)`       | Class and methods visible                                                   | Instance design becomes public contract     |
| Re-export module            | `module X`         | Forward another module’s API                                                | Convenient but can enlarge surface too much |

A strong module boundary hides representation when invariants matter:

```haskell
module Email
  ( Email
  , mkEmail
  , unEmail
  ) where

newtype Email = Email Text
  deriving (Eq, Show)

mkEmail :: Text -> Either EmailError Email
mkEmail txt
  | validEmail txt = Right (Email txt)
  | otherwise      = Left (InvalidEmail txt)

unEmail :: Email -> Text
unEmail (Email txt) = txt
```

A weak module boundary exports everything:

```haskell
module Email
  ( Email(..)
  ) where
```

Now callers can write:

```haskell
Email ""
```

which bypasses validation.

| Module-boundary decision | Use when                                 | Avoid when                           |
| ------------------------ | ---------------------------------------- | ------------------------------------ |
| Hide constructor         | Type has invariants                      | Type is plain transparent data       |
| Export constructor       | Pattern matching is part of intended API | Future representation may change     |
| Export accessors         | Fields are safe to expose                | Field exposure leaks internal model  |
| Export smart constructor | Construction can fail or normalize       | All values are valid by construction |
| Export internal helpers  | Almost never from public module          | They are implementation details      |
| Use qualified imports    | Names are common or ambiguous            | Tiny local module with clear names   |

Qualified imports are a boundary between namespaces:

```haskell
import Data.Text (Text)
import qualified Data.Text as T
import qualified Data.Map.Strict as Map
```

This prevents collisions and makes source of operations visible:

```haskell
normalize :: Text -> Text
normalize =
  T.toLower . T.strip
```

**Failure-first explanation.** The tempting but wrong mental model is that export lists are just documentation. The surprising bug is that exporting `Email(..)` or `Account(..)` lets outside code bypass invariants. The correct explanation is that the export list is an enforcement mechanism. The professional rule is: **hide constructors for validated or abstract types; export constructors only when direct construction and pattern matching are part of the stable API.** The boundary changes for simple transparent data types, tests, and internal modules, but public API modules should be deliberate.

### Organize Files and Packages — exposed modules, internal modules, dependency direction

A Haskell project usually contains packages, components, modules, and sometimes internal module hierarchies. The exact layout depends on Cabal or Stack conventions, but the architectural idea is stable: public modules should expose a coherent API; internal modules should hold implementation details.

A common package shape:

```text
my-package/
  my-package.cabal
  src/
    MyApp.hs
    MyApp/
      Types.hs
      Config.hs
      Parser.hs
      Service.hs
      Internal/
        ParserImpl.hs
  app/
    Main.hs
  test/
    Spec.hs
```

Possible public module:

```haskell
module MyApp
  ( runApp
  , Config
  , loadConfig
  ) where
```

Possible internal module:

```haskell
module MyApp.Internal.ParserImpl where
```

Internal modules may still be importable inside the package, but they should not be exposed as stable public API.

| Module category      | Example                      | Role                      | Stability expectation |
| -------------------- | ---------------------------- | ------------------------- | --------------------- |
| Public facade        | `MyApp`                      | Small user-facing API     | High                  |
| Public domain module | `MyApp.Types`                | Stable domain types       | High to medium        |
| Boundary module      | `MyApp.Config`, `MyApp.Json` | External parsing/encoding | Medium                |
| Service module       | `MyApp.Service`              | Application logic         | Medium                |
| Internal module      | `MyApp.Internal.ParserImpl`  | Implementation detail     | Low                   |
| Executable entry     | `Main`                       | Runtime startup           | Not library API       |
| Test module          | `Spec`                       | Verification              | Not production API    |

Good dependency direction usually flows inward:

```text
Main / CLI / Web boundary
  -> Application service
    -> Domain logic
      -> Domain types
```

Domain types should not depend on web frameworks, database libraries, or CLI parsing. This preserves pure core logic and reduces coupling.

**Common Pitfalls.** A common anti-pattern is a `Utils` module that grows without a coherent domain. Another is circular conceptual dependency: domain modules importing application-service modules, or pure validation code importing `IO`-heavy infrastructure. Haskell’s module system will catch some import cycles, but architectural cycles can exist even without syntactic cycles. The professional rule is: **make public modules small, keep domain logic near domain types, and push external technology dependencies outward.**

### Control Visibility — constructors, fields, pattern synonyms, smart constructors

Visibility determines who can construct and inspect values.

Transparent data type:

```haskell
data Point = Point
  { pointX :: Double
  , pointY :: Double
  }
  deriving (Eq, Show)
```

It is reasonable to export `Point(..)` when every combination of `pointX` and `pointY` is valid and representation stability is acceptable.

Validated type:

```haskell
newtype Percentage = Percentage Double
```

It should usually hide its constructor:

```haskell
module Percentage
  ( Percentage
  , mkPercentage
  , percentageValue
  ) where

mkPercentage :: Double -> Maybe Percentage
mkPercentage x
  | x < 0     = Nothing
  | x > 1     = Nothing
  | otherwise = Just (Percentage x)

percentageValue :: Percentage -> Double
percentageValue (Percentage x) = x
```

| Visibility option            | Gives caller                       | Use when                                  | Risk                             |
| ---------------------------- | ---------------------------------- | ----------------------------------------- | -------------------------------- |
| Export type only             | Can name type                      | Invariants matter                         | Caller needs provided operations |
| Export constructor           | Can build/pattern match            | All values valid or representation is API | Invariants can be bypassed       |
| Export field accessors       | Can read fields                    | Field reads are safe                      | Field names become API           |
| Export record update ability | Often follows constructor exposure | Caller may create invalid updated values  | Dangerous for validated records  |
| Export smart constructor     | Validated creation                 | Construction can fail                     | Must choose useful error type    |
| Export eliminator            | Controlled deconstruction          | Want abstraction without raw constructor  | More API design work             |
| Pattern synonyms             | Controlled pattern-like API        | Need abstraction plus pattern matching    | Advanced and can confuse users   |

An eliminator provides controlled access without exposing representation:

```haskell
withPercentage :: Percentage -> (Double -> r) -> r
withPercentage (Percentage x) f =
  f x
```

This is uncommon for simple cases but useful in more abstract APIs.

Pattern synonyms can expose a stable pattern while hiding representation, but they are an advanced tool and should not be the first solution.

**Failure-first explanation.** The tempting but wrong mental model is that if a type has a smart constructor, the invariant is protected. The surprising bug is that record update or exported constructors can still create invalid values. The correct explanation is that validation and visibility must work together. The professional rule is: **a smart constructor protects an invariant only if all other construction and mutation-like update paths also preserve it.** The boundary changes for transparent data where no invariant exists beyond type correctness.

### Separate Public API from Implementation Details — facade modules, internal modules, stable contracts

A public API should expose concepts, not incidental implementation.

Weak public API:

```haskell
module User.Validation
  ( validateUserImpl
  , trimAndCheckName
  , checkAgeInt
  , internalEmailRegex
  ) where
```

This leaks helper names and implementation choices.

Stronger public API:

```haskell
module User.Validation
  ( validateUser
  , UserValidationError(..)
  ) where
```

The implementation can still have helpers internally:

```haskell
validateUser :: RawUser -> Either UserValidationError User
validateUser raw = do
  name  <- validateName (rawName raw)
  email <- validateEmail (rawEmail raw)
  age   <- validateAge (rawAge raw)
  pure (User name email age)
```

| API surface      | Good sign                         | Bad sign                                 |
| ---------------- | --------------------------------- | ---------------------------------------- |
| Function names   | Domain action is clear            | Names reveal temporary implementation    |
| Error types      | Caller can respond meaningfully   | Only `Text` or generic failure           |
| Type exports     | Invariants preserved              | Constructors exposed accidentally        |
| Imports          | Qualified and intentional         | Large open imports causing ambiguity     |
| Module size      | Coherent responsibility           | Mixed parsing, DB, rendering, validation |
| Internal helpers | Hidden or internal                | Exported for convenience                 |
| Stability        | Changes only when concept changes | Breaks whenever implementation changes   |

A facade module can re-export a curated API:

```haskell
module MyApp
  ( Config
  , loadConfig
  , User
  , registerUser
  , runApp
  ) where

import MyApp.Config
import MyApp.User
import MyApp.Runner
```

This lets users import one stable module without depending on internal layout.

**Common Pitfalls.** Re-exporting too much can make a facade module unstable and confusing. Conversely, hiding too much can force users into awkward workflows. Public API design is a tradeoff: reveal enough to be useful, hide enough to preserve invariants and future freedom.

### Handle Absence — Maybe as boundary for optionality

`Maybe` is the correct boundary when absence is ordinary and carries no additional explanation.

```haskell
lookupUser :: UserId -> UserCache -> Maybe User
lookupUser =
  Map.lookup
```

The caller handles both cases:

```haskell
displayLookup :: Maybe User -> Text
displayLookup result =
  case result of
    Nothing ->
      "No user found"

    Just user ->
      userName user
```

`Maybe` is often right for:

| Situation                | Example                            | Why `Maybe` fits                     |
| ------------------------ | ---------------------------------- | ------------------------------------ |
| Map lookup               | `Map.lookup key map`               | Key may not exist                    |
| Optional field           | `userMiddleName :: Maybe Text`     | Absence is normal                    |
| Safe list operation      | `safeHead :: [a] -> Maybe a`       | Empty list is expected               |
| Simple parse             | `readMaybe :: String -> Maybe Int` | Caller only cares success/failure    |
| Conditional construction | `mkAge :: Int -> Maybe Age`        | Failure reason obvious or irrelevant |

But `Maybe` is too weak when failure reasons matter:

```haskell
mkEmail :: Text -> Maybe Email
```

This does not explain whether the value was empty, malformed, too long, or contained forbidden characters. If callers need that distinction:

```haskell
mkEmail :: Text -> Either EmailError Email
```

**Failure-first explanation.** The tempting but wrong mental model is that `Maybe` is Haskell’s safe replacement for every failure. The surprising limitation is diagnostic loss. The correct explanation is that `Maybe` represents absence, not explanation. The professional rule is: **use `Maybe` when there is exactly one meaningful failure mode or when the reason is irrelevant; use `Either` or a domain error type when callers need to know why.** The boundary changes for internal helpers, where `Nothing` may be enough because context already determines the reason.

### Handle Recoverable Failure — Either, domain errors, typed failure contracts

`Either e a` represents recoverable failure with error information.

```haskell
data CreateUserError
  = InvalidName NameError
  | InvalidEmail EmailError
  | UserAlreadyExists UserId
  deriving (Eq, Show)

createUser :: RawUser -> Either CreateUserError User
```

By convention, `Left` is failure and `Right` is success.

```haskell
createUser :: RawUser -> Either CreateUserError User
createUser raw = do
  name  <- mapLeft InvalidName  (mkName  (rawName raw))
  email <- mapLeft InvalidEmail (mkEmail (rawEmail raw))
  pure (User name email)
```

A helper such as `mapLeft` transforms the error side. In real code, one may use library functions for this.

| Error type              | Example                         | Use when                            | Limitation                                  |
| ----------------------- | ------------------------------- | ----------------------------------- | ------------------------------------------- |
| `Text`                  | `Either Text a`                 | Small scripts or human-only message | Hard to pattern match                       |
| Domain ADT              | `Either CreateUserError a`      | Caller may branch by error          | Requires design                             |
| Structured error record | `Either ValidationError a`      | Need location/context/detail        | More verbose                                |
| Exception               | `IO a` with possible exception  | Operational failure                 | Hidden from ordinary type unless documented |
| Validation collection   | `Validation (NonEmpty Error) a` | Need all independent errors         | More abstraction                            |

Domain error ADTs make caller behavior explicit:

```haskell
renderCreateUserError :: CreateUserError -> Text
renderCreateUserError err =
  case err of
    InvalidName nameError ->
      renderNameError nameError

    InvalidEmail emailError ->
      renderEmailError emailError

    UserAlreadyExists userId ->
      "User already exists: " <> renderUserId userId
```

The compiler can help keep rendering complete when new error cases are added.

**Common Pitfalls.** Using `Either Text a` everywhere is a halfway solution. It is better than crashing, but it makes programmatic handling hard. On the other side, error ADTs can become too detailed too early. Design error types based on who handles them: human display, retry logic, API response, logging, or internal control flow.

### Choose Error Mechanism — Maybe, Either, exceptions, validation, bottom

Haskell has multiple failure mechanisms because failure has multiple meanings.

| Failure kind                       | Mechanism             | Example type                       | Use when                            | Avoid when                           |
| ---------------------------------- | --------------------- | ---------------------------------- | ----------------------------------- | ------------------------------------ |
| Optional absence                   | `Maybe`               | `Maybe User`                       | Missing value is normal             | Caller needs reason                  |
| Recoverable domain error           | `Either e a`          | `Either LoginError Session`        | Caller should inspect failure       | Multiple independent errors needed   |
| Independent validation errors      | Validation type       | `Validation (NonEmpty Error) User` | Want all errors                     | Steps depend on earlier outputs      |
| Operational exception              | Exception in `IO`     | `IO a`                             | File, network, environment failure  | Ordinary domain validation           |
| Programmer error / impossible case | `error`, `undefined`  | `a`                                | Temporary, truly unreachable, tests | Public API or recoverable failure    |
| Nontermination                     | Recursive computation | Any type syntactically             | Infinite computation or bug         | Assuming type guarantees termination |

Example decision:

```haskell
lookupHeader :: HeaderName -> Headers -> Maybe HeaderValue
```

Absence is expected, so `Maybe` is appropriate.

```haskell
parseHeader :: HeaderValue -> Either HeaderError ParsedHeader
```

Parsing may fail for multiple reasons, so `Either` is appropriate.

```haskell
readHeaderFile :: FilePath -> IO Text
```

File access can fail due to permissions, missing files, encoding, or hardware; exceptions or explicit exception handling may be involved depending on API design.

**Failure-first explanation.** The tempting but wrong mental model is that Haskell has a single “proper” error style. The surprising reality is that `Maybe`, `Either`, validation types, exceptions, and bottom-like failures all coexist. The correct explanation is that each failure mechanism describes a different boundary. The professional rule is: **choose the mechanism that matches caller responsibility.** If the caller should handle the case as ordinary control flow, put it in the type. If the failure is operational and exceptional, use exception-aware `IO` patterns. If the failure is impossible by invariant, isolate and document the assumption.

### Exceptions — operational failure, synchronous exceptions, asynchronous exceptions

Exceptions exist in Haskell and matter in real programs. They are especially important in `IO`, resource management, concurrency, and interaction with the operating system.

A simplified view:

| Exception category         | Example                                          | Typical source                   | Handling concern                               |
| -------------------------- | ------------------------------------------------ | -------------------------------- | ---------------------------------------------- |
| Synchronous exception      | File not found, parse exception from partial API | Current computation              | Catch at meaningful boundary                   |
| Asynchronous exception     | Thread killed, timeout, user interrupt           | External to current control flow | Resource cleanup must be exception-safe        |
| Pure exception-like bottom | `error`, non-exhaustive pattern                  | Evaluation of pure expression    | Avoid in public domain logic                   |
| FFI exception/failure      | Foreign call failure                             | C/library boundary               | Convert to typed Haskell result where possible |

Basic exception handling belongs mostly in `IO`:

```haskell
readConfigText :: FilePath -> IO (Either IOException Text)
readConfigText path =
  try (TIO.readFile path)
```

Here `try` catches an exception and returns it as `Either`.

A common pattern is to catch exceptions near an operational boundary and convert them into a domain or application error:

```haskell
data ConfigLoadError
  = ConfigFileError IOException
  | ConfigParseError ParseError

loadConfig :: FilePath -> IO (Either ConfigLoadError Config)
loadConfig path = do
  result <- try (TIO.readFile path)
  case result of
    Left ioErr ->
      pure (Left (ConfigFileError ioErr))

    Right contents ->
      pure (mapLeft ConfigParseError (parseConfig contents))
```

This separates operational failure from parse failure.

Asynchronous exceptions are more subtle. They can arrive while a thread is running, for example through cancellation or timeout. This is why resource cleanup must be written with exception-safe patterns such as `bracket` rather than manual acquire/use/release sequences.

**Common Pitfalls.** Catching all exceptions too broadly can hide programmer errors and make debugging difficult. Catching too narrowly or too late can leak resources. Another mistake is using exceptions for normal domain outcomes, such as invalid user input. In Haskell, typed failure is usually clearer for expected domain errors.

### Failure Boundary Patterns — convert, preserve, enrich, or isolate errors

When a lower-level operation fails, a higher-level API must decide what to do with that failure. There are several common patterns.

| Pattern    | Meaning                                 | Example                                | Use when                               |
| ---------- | --------------------------------------- | -------------------------------------- | -------------------------------------- |
| Preserve   | Return same error upward                | `Either ParseError a`                  | Error already fits caller              |
| Convert    | Map low-level error to high-level error | `mapLeft ConfigParseError`             | Need domain-level error                |
| Enrich     | Add context                             | Include file path, field name, user ID | Debugging/user feedback needs location |
| Collapse   | Discard detail                          | `Either e a -> Maybe a`                | Only success/absence matters           |
| Accumulate | Collect several errors                  | Validation                             | Independent checks                     |
| Throw      | Convert to exception                    | `throwIO`                              | Boundary expects exceptions            |
| Catch      | Convert exception to value              | `try`, `catch`                         | Want typed handling                    |
| Isolate    | Keep unsafe/partial failure internal    | Small trusted function                 | Invariant is already guaranteed        |

Example of enriching an error:

```haskell
data LoadUserError
  = UserFileError FilePath IOException
  | UserParseError FilePath ParseError

loadUserFromFile :: FilePath -> IO (Either LoadUserError User)
loadUserFromFile path = do
  fileResult <- try (TIO.readFile path)
  case fileResult of
    Left ioErr ->
      pure (Left (UserFileError path ioErr))

    Right contents ->
      pure (mapLeft (UserParseError path) (parseUser contents))
```

The file path is added to the error because it is useful at the higher level.

**Failure-first explanation.** The tempting but wrong mental model is that low-level errors can simply bubble upward unchanged. The surprising problem is that low-level errors often lack the context the caller needs. The correct explanation is that every boundary should decide whether to preserve, convert, enrich, collapse, or isolate errors. The professional rule is: **do not throw away context accidentally; do not expose implementation errors as public API unless they are part of the contract.**

### Express Side Effects — IO as explicit effect boundary

`IO a` represents an effectful computation that can produce an `a`.

```haskell
readLine :: IO Text
saveUser :: User -> IO UserId
sendEmail :: Email -> Message -> IO ()
```

`IO` does not mean the whole language becomes impure. It marks the boundary where the program interacts with the external world.

A good design separates pure logic from effectful orchestration:

```haskell
validateUser :: RawUser -> Either UserError User
formatEmail  :: User -> Message

registerUser :: RawUser -> IO (Either UserError UserId)
registerUser raw =
  case validateUser raw of
    Left err ->
      pure (Left err)

    Right user -> do
      userId <- saveUser user
      sendEmail (userEmail user) (formatEmail user)
      pure (Right userId)
```

| Function type                             | Meaning                                      |
| ----------------------------------------- | -------------------------------------------- |
| `RawUser -> Either UserError User`        | Pure validation, no external effects         |
| `User -> Message`                         | Pure formatting                              |
| `User -> IO UserId`                       | Effectful persistence                        |
| `Email -> Message -> IO ()`               | Effectful sending                            |
| `RawUser -> IO (Either UserError UserId)` | Effectful workflow with typed domain failure |

`pure` lifts a pure value into an applicative/monadic context:

```haskell
pure (Left err) :: IO (Either UserError UserId)
```

This does not perform an external effect; it constructs an `IO` action that returns that value.

**Interdisciplinary Lens: Denotational Semantics**

What it clarifies: `IO a` can be understood as a value describing an effectful computation whose execution is controlled by the runtime through `main`.

Language feature involved: `IO`, `main`, pure/effectful separation, `do` notation.

Practical consequence: pure functions remain substitutable and testable; effectful workflows are explicit in types.

Limit of the lens: this meaning-level explanation does not specify operational details such as buffering, file handles, exceptions, scheduling, or resource lifetime.

**Common Pitfalls.** The most common error is letting `IO` infect all functions because it is convenient. Once pure logic is placed in `IO`, it becomes harder to test, compose, and reason about. Another error is believing `IO` types fully describe effects. `IO User` says an effectful computation produces `User`; it does not say whether it reads a database, uses the network, writes logs, or mutates a cache.

### Design Effect Boundaries — pure core, effectful shell, capability records

A common Haskell architecture is **pure core, effectful shell**. The phrase should not be treated as a rigid law, but it is a strong default.

Pure core:

```haskell
parseCommand :: Text -> Either CommandError Command

applyCommand :: Command -> Model -> Either DomainError Model

renderModel :: Model -> Text
```

Effectful shell:

```haskell
runCommandFile :: FilePath -> IO (Either AppError ())
runCommandFile path = do
  input <- TIO.readFile path
  case parseCommand input of
    Left err ->
      pure (Left (CommandParseError err))

    Right command -> do
      model <- loadModel
      case applyCommand command model of
        Left err ->
          pure (Left (CommandDomainError err))

        Right model' -> do
          saveModel model'
          pure (Right ())
```

This style makes the pure parts easy to test. But real systems may need richer effect management. A capability record makes dependencies explicit:

```haskell
data AppServices m = AppServices
  { loadModelService :: m Model
  , saveModelService :: Model -> m ()
  , logInfoService   :: Text -> m ()
  }

runCommand
  :: Monad m
  => AppServices m
  -> Text
  -> m (Either AppError ())
```

| Boundary style           | Strength                           | Cost                                  |
| ------------------------ | ---------------------------------- | ------------------------------------- |
| Pure core, `IO` shell    | Simple, testable                   | Shell can grow large                  |
| Explicit service records | Dependencies visible and swappable | More plumbing                         |
| `ReaderT Env IO`         | Common app structure               | Environment can become global bag     |
| Monad transformer stack  | Typed composition of effects       | Error messages and mental overhead    |
| Effect system library    | Modular capabilities               | Ecosystem choice and abstraction cost |
| Direct `IO` everywhere   | Fast to write                      | Poor testing and boundary discipline  |

**Failure-first explanation.** The tempting but wrong mental model is that all serious Haskell applications must use monad transformers or an effect system immediately. The surprising failure is that the architecture becomes harder than the problem. The correct explanation is that effects are a boundary-design issue, not a badge of sophistication. The professional rule is: **start with pure functions and explicit `IO`; introduce capability records, `ReaderT`, transformers, or effect systems when they reduce real repetition or improve testing and dependency control.** The boundary changes for frameworks and large applications, where a structured effect architecture may be justified from the start.

### Maybe, Either, IO, and Nested Effects — reading type shapes at boundaries

Boundary-heavy Haskell APIs often combine type constructors. Reading the type tells which kinds of boundary are involved.

| Type                     | Meaning                                                                  | Example                                      |
| ------------------------ | ------------------------------------------------------------------------ | -------------------------------------------- |
| `Maybe User`             | User may be absent                                                       | Cache lookup                                 |
| `Either Error User`      | User construction may fail                                               | Validation                                   |
| `IO User`                | Effectful computation produces user                                      | Database fetch that throws on failure        |
| `IO (Maybe User)`        | Effectful lookup may find no user                                        | Database lookup                              |
| `IO (Either Error User)` | Effectful operation with typed domain failure                            | Register user                                |
| `Either Error (IO User)` | Pure decision returns an action                                          | Less common; action selected but not run yet |
| `Maybe (IO User)`        | Optional action                                                          | Sometimes useful, often awkward              |
| `ExceptT Error IO User`  | Transformer form of `IO (Either Error User)` with sequencing convenience | Application workflows                        |

Compare:

```haskell
findUser :: UserId -> IO (Maybe User)
```

This says lookup needs `IO`, and the user may not exist.

```haskell
loadUser :: UserId -> IO (Either LoadUserError User)
```

This says loading needs `IO`, and failure has a reason.

```haskell
validateUser :: RawUser -> Either UserError User
```

This says validation is pure and failure is typed.

A common improvement is moving pure checks out of `IO`:

Weak:

```haskell
validateUser :: RawUser -> IO (Either UserError User)
```

Stronger, if no external effect is needed:

```haskell
validateUser :: RawUser -> Either UserError User
```

**Common Pitfalls.** A common mistake is choosing a type shape without considering caller ergonomics. `IO (Either e a)` is explicit but can produce nested case handling. `ExceptT e IO a` can improve sequencing but introduces transformer complexity. Another mistake is returning `Either e (IO a)` when the intended meaning is probably `IO (Either e a)`. The order of type constructors matters. It says which boundary contains which other boundary.

### Boundary Task Table — modules, errors, effects

| Boundary task                     | Preferred first tool                | Escalate when                            | Pitfall                               |
| --------------------------------- | ----------------------------------- | ---------------------------------------- | ------------------------------------- |
| Preserve invariant                | Hide constructor, smart constructor | Pattern synonyms or abstract eliminators | Exporting `(..)` accidentally         |
| Keep API stable                   | Facade module, explicit export list | Versioned modules                        | Re-exporting too much                 |
| Avoid name collisions             | Qualified imports                   | Custom prelude or import style guide     | Open imports everywhere               |
| Represent optional lookup         | `Maybe`                             | `Either` if reason matters               | Using partial extraction              |
| Represent validation failure      | `Either DomainError`                | Validation type for accumulation         | Throwing exceptions for normal input  |
| Handle file/network failure       | Exceptions converted at boundary    | Domain-specific operational errors       | Catching too broadly                  |
| Keep pure logic testable          | Pure functions plus `IO` shell      | Capability records / `ReaderT`           | Everything in `IO`                    |
| Sequence typed errors in `IO`     | `IO (Either e a)`                   | `ExceptT e IO a`                         | Transformer stack too early           |
| Pass dependencies                 | Function args or records            | `ReaderT Env IO`                         | Global environment bag                |
| Describe external effects         | `IO` in type                        | More precise effect abstraction          | Pretending `IO` says which effect     |
| Avoid invalid public construction | Export type, not constructor        | Smart constructors with rich errors      | Public record update breaks invariant |

This table is deliberately practical. The best Haskell boundary is not the most abstract one. It is the one that makes the important distinction visible to the caller and enforceable by the compiler or module system.
### Manage Resources — bracket, withFile, acquire/use/release, exception safety

Resource management is a boundary problem. Files, sockets, database connections, locks, temporary directories, handles, and foreign pointers have lifetimes that must be controlled. Haskell’s purity does not remove this problem. It makes the resource boundary explicit through `IO` and resource-safe APIs.

The unsafe shape is:

```haskell
badRead :: FilePath -> IO Text
badRead path = do
  handle <- openFile path ReadMode
  contents <- T.hGetContents handle
  hClose handle
  pure contents
```

This looks reasonable, but it has several problems. If reading throws an exception, `hClose` may not run. If lazy I/O is involved, contents may be demanded after the handle has closed. If an asynchronous exception arrives between acquisition and release, the resource may leak.

The standard shape is acquire-use-release:

```haskell
withFile path ReadMode $ \handle -> do
  contents <- T.hGetContents handle
  pure contents
```

For custom resources, `bracket` captures the pattern:

```haskell
bracket
  acquireResource
  releaseResource
  useResource
```

A simplified example:

```haskell
withConnection :: Config -> (Connection -> IO a) -> IO a
withConnection config =
  bracket
    (openConnection config)
    closeConnection
```

Then callers write:

```haskell
loadUsers :: Config -> IO [User]
loadUsers config =
  withConnection config $ \connection ->
    queryUsers connection
```

| Resource task                       | Preferred tool                             | Guarantee sought                      | Common mistake                           |
| ----------------------------------- | ------------------------------------------ | ------------------------------------- | ---------------------------------------- |
| Open and close file                 | `withFile`                                 | Handle closed after use               | Manual `openFile` / `hClose`             |
| Acquire and release custom resource | `bracket`                                  | Release on normal or exceptional exit | Forgetting asynchronous exceptions       |
| Temporarily change state            | `bracket`, `finally`, `onException`        | Restore previous state                | Restore only on success                  |
| Work with many resources            | Resource-management libraries              | Structured lifetime                   | Scattered cleanup logic                  |
| Foreign memory/resource             | `ForeignPtr`, finalizers, explicit release | Avoid leaks and invalid access        | Trusting GC timing too much              |
| Concurrent resource use             | STM, `MVar`, structured concurrency        | Safe sharing and cleanup              | Killing threads without cleanup strategy |

`bracket` is not just convenience. It encodes a control-flow invariant: once acquisition succeeds, release should run even if use fails.

**Failure-first explanation.** The tempting but wrong mental model is that `do` notation gives ordinary sequential control, so manual cleanup after use is enough. The surprising failure is that exceptions, early exits, or asynchronous cancellation can skip cleanup. The correct explanation is that resource safety must be encoded in the control structure. The professional rule is: **use `with...` functions or `bracket`-style APIs for resources; avoid exposing raw acquire/release pairs unless callers genuinely need them.** The boundary changes in low-level libraries, but those libraries should usually provide safe higher-level wrappers.

### Lazy I/O and Resource Boundaries — demand, handles, streaming caveats

Lazy I/O is a classic Haskell sharp edge. A function may appear to read a file, but actual reading may happen later when the contents are demanded. That can interact badly with handle lifetime, exceptions, and memory usage.

```haskell
contents <- readFile path
```

Depending on the API and type involved, reading may be lazy. This enables convenient code, but can leave file handles open longer than expected or cause exceptions far from the call site.

| I/O style                         | Strength                              | Risk                                            | Use when                                |
| --------------------------------- | ------------------------------------- | ----------------------------------------------- | --------------------------------------- |
| Lazy file I/O                     | Very convenient, can stream on demand | Handle lifetime and exception timing are subtle | Small scripts, controlled use           |
| Strict read                       | Predictable acquisition and full read | Loads whole content into memory                 | Small/medium files                      |
| Streaming library                 | Bounded memory and explicit flow      | More abstraction and library choice             | Large files, network streams, pipelines |
| Handle-based manual I/O           | Fine-grained control                  | Easy to leak or mishandle exceptions            | Low-level code                          |
| `withFile` plus strict processing | Clear lifetime                        | Requires processing inside scope                | Most ordinary safe file handling        |

A safer pattern is to keep consumption inside the resource scope:

```haskell
countLines :: FilePath -> IO Int
countLines path =
  withFile path ReadMode $ \handle -> do
    contents <- T.hGetContents handle
    pure (length (T.lines contents))
```

However, with lazy text, even this may not force the contents enough before the handle closes unless the result calculation demands it. In performance-sensitive or large-file code, use strict I/O or a streaming library deliberately.

Strict read example:

```haskell
import qualified Data.Text.IO as TIO

loadConfigText :: FilePath -> IO Text
loadConfigText =
  TIO.readFile
```

For truly large data, the better answer is often a streaming abstraction, not `readFile`.

**Common Pitfalls.** The anti-pattern is assuming that a source-level read call equals immediate full reading. In lazy Haskell, demand matters. Another mistake is treating lazy I/O as a streaming architecture. It is convenient, but robust streaming usually needs explicit streaming libraries or carefully designed handle loops.

### Express and Contain IO — orchestration, boundary placement, pure core

An `IO` action is a boundary value. It describes effectful work that can be sequenced by the runtime. Professional Haskell aims to keep `IO` honest and contained.

Weak design:

```haskell
normalizeUser :: User -> IO User
normalizeUser user =
  pure user
    { userName = T.strip (userName user)
    }
```

If normalization performs no external effect, it should not be in `IO`:

```haskell
normalizeUser :: User -> User
normalizeUser user =
  user
    { userName = T.strip (userName user)
    }
```

Then effectful code can orchestrate:

```haskell
loadNormalizeSave :: UserId -> IO (Maybe User)
loadNormalizeSave userId = do
  result <- loadUser userId
  case result of
    Nothing ->
      pure Nothing

    Just user -> do
      let normalized = normalizeUser user
      saveUser normalized
      pure (Just normalized)
```

| Code kind                              | Type shape                             | Boundary meaning                                |
| -------------------------------------- | -------------------------------------- | ----------------------------------------------- |
| Pure transformation                    | `a -> b`                               | No external effect                              |
| Pure validation                        | `a -> Either e b`                      | Deterministic, recoverable failure              |
| Effectful lookup                       | `key -> IO (Maybe value)`              | External lookup may miss                        |
| Effectful command                      | `input -> IO ()`                       | Performs effect, no meaningful result           |
| Effectful workflow with domain failure | `input -> IO (Either e a)`             | External effects plus typed recoverable failure |
| Effect abstraction                     | `MonadIO m => ...` or capability class | Polymorphic effect context                      |

A useful discipline is to write the pure version first when possible. If a function can be pure, keep it pure. If it must perform effects, make the effect visible.

**Interdisciplinary Lens: Denotational Semantics**

What it clarifies: pure expressions can be reasoned about by substitution. `IO` values describe computations whose effects occur only when sequenced from `main` or another `IO` action.

Language feature involved: `IO`, pure functions, `do`, `main`, effect boundary.

Practical consequence: separating pure functions from `IO` improves testing, refactoring, and local reasoning.

Limit of the lens: effect descriptions do not expose all operational details. The type `IO a` does not specify file paths, network endpoints, timing, exceptions, or resource usage.

**Common Pitfalls.** The main pitfall is “IO creep”: a small convenience causes `IO` to appear in functions that are logically pure. This makes later testing and composition harder. Another pitfall is pretending `IO` alone is a sufficiently precise effect type. For large systems, additional structure may be needed.

### Handle External Input — parse, decode, validate, normalize, trust

External input is untrusted even when it has been decoded successfully. Haskell’s boundary design should separate representation shape from domain validity.

A robust flow is:

```text
bytes/text/json -> decoded raw structure -> validated domain value -> trusted internal use
```

Example:

```haskell
data RawUser = RawUser
  { rawName  :: Text
  , rawEmail :: Text
  , rawAge   :: Int
  }

data User = User
  { userName  :: NonEmptyText
  , userEmail :: Email
  , userAge   :: Age
  }

validateUser :: RawUser -> Either UserError User
validateUser raw = do
  name  <- mapLeft NameError  (mkNonEmptyText (rawName raw))
  email <- mapLeft EmailError (mkEmail (rawEmail raw))
  age   <- mapLeft AgeError   (mkAge (rawAge raw))
  pure (User name email age)
```

| Boundary input       | Raw type           | Validation target        | Main risk                            |
| -------------------- | ------------------ | ------------------------ | ------------------------------------ |
| JSON request         | Decoded raw record | Domain ADT / `newtype`s  | Shape accepted but meaning invalid   |
| CLI argument         | `String` / `Text`  | Config or command type   | Bad runtime config                   |
| Environment variable | `Maybe String`     | Validated setting        | Missing or malformed environment     |
| Database row         | Row/record type    | Domain type              | Legacy invalid data                  |
| CSV field            | `Text`             | Parsed field type        | Silent parse failure or wrong column |
| HTTP path/query      | `Text`             | ID, enum, page parameter | Invalid route state                  |
| Foreign API response | Raw response DTO   | Internal domain type     | Trusting remote schema too much      |

For external formats, encoders and decoders form compatibility boundaries. A `Show` instance is not a stable external encoding. Use a real JSON, binary, text, or database encoding layer.

**Failure-first explanation.** The tempting but wrong mental model is that successful decoding means valid data. The surprising bug is that decoded data can still violate domain rules: empty names, negative ages, unsupported states, inconsistent fields. The correct explanation is that decoding checks representation; validation checks meaning. The professional rule is: **decode at the edge, validate into domain types, and avoid passing raw external representations through core logic.** The boundary changes when decoders directly construct validated domain types, but then the decoder itself is also the validator and must be treated accordingly.

### Isolate Unsafe, Dynamic, or Unchecked Behavior — unsafePerformIO, unsafeCoerce, partial functions, FFI

Haskell contains escape hatches. They are sometimes necessary, but they must be isolated.

| Unsafe or unchecked feature | What it bypasses                 | Legitimate use                                | Risk                                        |
| --------------------------- | -------------------------------- | --------------------------------------------- | ------------------------------------------- |
| `unsafePerformIO`           | Pure/effect boundary             | Carefully controlled low-level implementation | Hidden effects, broken reasoning            |
| `unsafeCoerce`              | Type safety                      | Rare representation-level tricks              | Runtime corruption or nonsense values       |
| Partial functions           | Totality expectation             | Internal impossible cases, prototypes         | Runtime crashes                             |
| Non-exhaustive patterns     | Exhaustive handling              | Sometimes impossible by invariant             | Runtime pattern-match failure               |
| FFI imports                 | Haskell runtime/type assumptions | Interop with C/system libraries               | Memory safety, lifetime, calling convention |
| Manual pointer operations   | Managed memory abstraction       | Performance/system boundary                   | Use-after-free, invalid access              |
| Trusting external data      | Validation boundary              | Controlled trusted data source                | Invalid internal state                      |

A partial helper may appear harmless:

```haskell
fromJustUser :: Maybe User -> User
fromJustUser (Just user) = user
fromJustUser Nothing     = error "impossible"
```

This is only acceptable if the impossibility is genuinely guaranteed nearby. A better API often removes the impossible case earlier:

```haskell
withUser :: Maybe User -> (User -> r) -> r -> r
withUser value onUser onMissing =
  case value of
    Just user -> onUser user
    Nothing   -> onMissing
```

Or better, structure the program so the function accepts `User`, not `Maybe User`.

For `unsafePerformIO`, the danger is more severe. It can make a pure-looking value depend on effects, evaluation order, or hidden mutable state. That undermines referential transparency.

**Common Pitfalls.** The worst pattern is scattering unsafe calls throughout application code. If unsafe behavior is unavoidable, wrap it in a small module with a safe public API, document the assumptions, test boundary behavior, and avoid exporting the unsafe primitive. Treat unsafe code as a containment problem.

### FFI and Runtime Boundary — foreign calls, memory ownership, representation assumptions

The foreign function interface lets Haskell call code written in C and other languages. This is essential for system libraries, performance-sensitive components, and ecosystem integration. It is also a boundary where Haskell’s usual safety guarantees can weaken.

A simplified FFI declaration may look like:

```haskell
foreign import ccall "math.h sin"
  c_sin :: CDouble -> CDouble
```

This imports a C function into Haskell with an explicit type.

| FFI concern        | Question                         | Risk                            |
| ------------------ | -------------------------------- | ------------------------------- |
| Calling convention | How is the function called?      | Crash or corrupted call         |
| Type mapping       | Does Haskell type match C type?  | Wrong representation            |
| Memory ownership   | Who allocates and frees?         | Leak or use-after-free          |
| Pointer lifetime   | How long is pointer valid?       | Dangling pointer                |
| Blocking behavior  | Does call block OS thread?       | Runtime scheduling issues       |
| Thread safety      | Is foreign library thread-safe?  | Race or corruption              |
| Exceptions/errors  | How does C signal failure?       | Lost error information          |
| Purity claim       | Is imported function truly pure? | Broken referential transparency |

A safe wrapper should translate foreign conventions into Haskell conventions.

Low-level foreign result:

```haskell
c_parse_user :: CString -> IO CInt
```

Safer Haskell wrapper:

```haskell
parseUserForeign :: Text -> IO (Either ForeignParseError User)
```

The wrapper handles encoding, allocation, foreign error codes, and conversion to domain types.

**Failure-first explanation.** The tempting but wrong mental model is that once a foreign function has a Haskell type, it is as safe as a Haskell function. The surprising failure is that the type may lie about memory ownership, blocking behavior, pointer lifetime, or purity. The correct explanation is that FFI types are boundary declarations, not full proofs of safety. The professional rule is: **keep FFI declarations low-level and private; expose small safe wrappers with Haskell error, resource, and ownership conventions.**

### Dynamic and Existential Boundaries — when static types meet runtime variability

Haskell is statically typed, but real programs encounter runtime variability: plugin systems, heterogeneous collections, JSON values, database schemas, runtime configuration, and values whose exact type is hidden behind an interface.

Sometimes a sum type is enough:

```haskell
data ConfigValue
  = ConfigText Text
  | ConfigInt Int
  | ConfigBool Bool
```

Sometimes a typeclass wrapper is useful:

```haskell
data Renderable =
  forall a. Render a => Renderable a
```

This requires an extension such as `ExistentialQuantification` or GADT-style syntax.

A simpler record-of-functions wrapper may be clearer:

```haskell
data Renderable = Renderable
  { renderValue :: Text
  }
```

| Runtime variability       | First option                    | Advanced option             | Warning                      |
| ------------------------- | ------------------------------- | --------------------------- | ---------------------------- |
| Known value alternatives  | ADT                             | GADT                        | Prefer ADT if closed         |
| JSON-like data            | JSON value type plus decoder    | Generic deriving            | Validate after decoding      |
| Heterogeneous renderables | Sum type or existential wrapper | Typeclass existential       | Avoid if a simpler ADT works |
| Runtime services          | Record of functions             | Existential service wrapper | Keep dependency explicit     |
| Plugin commands           | Command ADT or registry         | Dynamic loading             | Harder typing and testing    |

**Common Pitfalls.** Do not use existential types just to imitate object-oriented collections. If the set of alternatives is known, an ADT is usually clearer. If only one operation is needed, a record carrying that operation may be clearer than hiding a type behind a typeclass.

### Define Trust Boundaries — raw, validated, privileged, unsafe

A trust boundary separates values whose assumptions differ. Haskell types and modules can make this visible.

```haskell
newtype RawPassword = RawPassword Text
newtype PasswordHash = PasswordHash ByteString
```

A function should not accept raw text when it needs a hashed password:

```haskell
authenticate :: Email -> RawPassword -> IO AuthResult
storePassword :: UserId -> PasswordHash -> IO ()
```

The type prevents accidentally storing a raw password where a hash is expected.

| Trust level               | Example                          | Boundary rule                          |
| ------------------------- | -------------------------------- | -------------------------------------- |
| Raw external              | `Text`, `ByteString`, JSON value | Parse and validate                     |
| User-provided but decoded | `RawUser`                        | Validate domain rules                  |
| Validated domain          | `User`, `Email`, `Age`           | Safe for core logic                    |
| Privileged capability     | `AdminToken`, `WriteConnection`  | Construct only through authorized path |
| Secret material           | `PasswordHash`, `ApiKey`         | Avoid accidental logging/showing       |
| Unsafe foreign resource   | `Ptr a`, `ForeignPtr a`          | Encapsulate ownership                  |
| Cached/persisted data     | Database row                     | Revalidate on boundary when needed     |

A security-sensitive type should avoid accidental `Show`:

```haskell
newtype ApiKey = ApiKey Text
```

Deriving `Show` may leak secrets into logs. A custom instance can redact:

```haskell
instance Show ApiKey where
  show _ = "<api-key>"
```

**Failure-first explanation.** The tempting but wrong mental model is that type safety only concerns ordinary programming errors. The surprising benefit is that types can also prevent trust-boundary mistakes: raw passwords, unvalidated emails, unescaped SQL fragments, unauthorized tokens, and secret logging. The correct explanation is that domain types can encode security-relevant distinctions. The professional rule is: **use distinct types for values with different trust or privilege levels, and be careful with deriving `Show`, `Read`, `Generic`, or serialization instances for sensitive data.**

### Compatibility Boundaries — serialization, public types, versioning, migration

External formats are long-term contracts. Haskell data types may change internally, but JSON, database schemas, CLI flags, file formats, and public APIs need compatibility discipline.

Weak approach:

```haskell
data User = User
  { userName :: Text
  , userAge  :: Int
  }
  deriving (Generic, ToJSON, FromJSON)
```

Generic deriving may be fine internally, but for a public API it ties external field names and structure to internal representation.

Stronger approach:

```haskell
data User = User
  { userName :: Name
  , userAge  :: Age
  }

data UserJson = UserJson
  { jsonName :: Text
  , jsonAge  :: Int
  }
```

Then explicitly convert:

```haskell
toUserJson :: User -> UserJson
fromUserJson :: UserJson -> Either UserJsonError User
```

| Boundary        | Risk                                 | Safer pattern                           |
| --------------- | ------------------------------------ | --------------------------------------- |
| JSON API        | Internal field rename breaks clients | Separate DTO type or explicit instances |
| Database schema | Domain change breaks persistence     | Migration layer                         |
| CLI             | Renamed flags break scripts          | Versioned/deprecated options            |
| File format     | Old files unreadable                 | Version field and migration             |
| Binary encoding | Representation assumptions break     | Stable encoding library and tests       |
| `Show` output   | Debug format changes                 | Do not use as external format           |
| Derived `Read`  | Partial and brittle parsing          | Real parser                             |

**Common Pitfalls.** The common mistake is treating derived serialization as harmless. It is harmless only if the format is not a stable contract. For public or persisted data, explicit encoding and decoding are often worth the extra code.

### Concurrency Boundaries — threads, cancellation, shared state, STM

Concurrency creates boundaries between computations that may run independently. Haskell offers several models, including lightweight threads, `async`, `MVar`, and STM. The details belong in Part 7, but the boundary design begins here.

| Concurrency task               | Tool                       | Boundary meaning                            | Common failure                         |
| ------------------------------ | -------------------------- | ------------------------------------------- | -------------------------------------- |
| Run concurrent action and wait | `async`                    | Structured concurrent task                  | Losing child thread on exception       |
| Communicate once / synchronize | `MVar`                     | Shared mutable cell with blocking semantics | Deadlock                               |
| Shared transactional state     | STM / `TVar`               | Composable atomic transactions              | Long or effectful transactions         |
| Fire-and-forget                | `forkIO`                   | Raw lightweight thread                      | Leaked thread, lost exception          |
| Timeout/cancellation           | async exception mechanisms | Interrupt computation                       | Resource cleanup bugs                  |
| Parallel pure computation      | strategies / sparks        | Evaluate in parallel                        | No speedup due to laziness or overhead |

A safer pattern is to use structured concurrency-like APIs rather than raw thread spawning when possible. For example, `async` patterns can ensure that child actions are waited for or cancelled appropriately.

Shared mutable state should be explicit:

```haskell
newCounter :: IO (TVar Int)
increment :: TVar Int -> STM Int
```

`TVar` signals transactional shared state. It is not hidden behind a pure-looking function.

**Common Pitfalls.** Raw `forkIO` is easy to misuse because exceptions in child threads may be lost and resources may outlive their intended scope. Another pitfall is performing `IO` inside STM transactions, which is generally disallowed because STM transactions may retry. The professional rule is: **make concurrency ownership and cancellation explicit; use STM for composable shared state; avoid fire-and-forget unless there is a supervision plan.**

### Module Boundary Option Table — coupling and maintenance consequence

| Boundary option      |                      Coupling | Maintenance consequence              | Good use                           |
| -------------------- | ----------------------------: | ------------------------------------ | ---------------------------------- |
| Export everything    |                     Very high | Representation changes break callers | Small internal throwaway modules   |
| Explicit export list |                        Medium | API is visible and reviewable        | Most modules                       |
| Abstract type export |                           Low | Representation can change            | Validated/domain types             |
| Constructor export   |                          High | Callers depend on representation     | Transparent data                   |
| Smart constructor    |                 Low to medium | Validation centralized               | Invariant-bearing types            |
| Accessor export only |                        Medium | Read access without construction     | Semi-abstract records              |
| Facade module        |                 Low for users | Internal layout can change           | Library/application public surface |
| Internal module      | Low external, medium internal | Implementation can move              | Non-public helpers                 |
| Qualified imports    |            Low name collision | Clear source of functions            | Common-name modules                |
| Re-export dependency |                Medium to high | Dependency becomes API               | Curated prelude/facade only        |

The important maintenance question is not “can callers do what they need today?” but “which future changes does this API prevent?” Exporting constructors gives callers power and takes future freedom from maintainers.

### Error Mechanism Decision Table — when to use what

| Error mechanism       | When to use                             | Failure mode                     | Review cue                              |
| --------------------- | --------------------------------------- | -------------------------------- | --------------------------------------- |
| `Maybe a`             | Absence with no useful reason           | Diagnostic loss                  | Would caller ask “why?”                 |
| `Either e a`          | Recoverable failure with one error      | Verbose nesting or vague `e`     | Is `e` structured enough?               |
| Validation type       | Independent checks, all errors useful   | Too complex for dependent checks | Are checks independent?                 |
| Exception             | Operational failure, framework boundary | Hidden control flow              | Is caller expected to recover normally? |
| `IO (Either e a)`     | Effects plus typed domain failure       | Nested handling                  | Would `ExceptT` improve readability?    |
| `ExceptT e IO a`      | Many sequenced failing effects          | Transformer complexity           | Is the stack understandable?            |
| `error` / `undefined` | Temporary or impossible-by-invariant    | Runtime crash                    | Can the type remove this?               |
| Custom result ADT     | More than success/failure               | Boilerplate                      | Does it clarify states?                 |

### Resource Pattern Table — guarantee and cost

| Resource pattern       | Guarantee                           | Cost                                 | Use when                       |
| ---------------------- | ----------------------------------- | ------------------------------------ | ------------------------------ |
| Manual acquire/release | Full control                        | Easy to leak on exception            | Very low-level code            |
| `with...` function     | Scoped lifetime                     | Caller must fit callback style       | Most resources                 |
| `bracket`              | Release after use even on exception | Slightly indirect control flow       | Custom resources               |
| `finally`              | Cleanup after action                | Less structured than bracket         | Cleanup without acquired value |
| `onException`          | Cleanup only on failure             | Must handle success separately       | Rollback-style behavior        |
| Strict I/O             | Predictable read timing             | Loads full data                      | Small/medium files             |
| Streaming library      | Bounded memory                      | More abstraction                     | Large or continuous data       |
| `ForeignPtr`           | GC-aware foreign memory             | Finalizer timing subtle              | Foreign memory ownership       |
| STM transaction        | Atomic shared-state update          | No arbitrary `IO` inside transaction | Concurrent state               |

### Boundary Anti-Patterns — what to avoid

| Anti-pattern                             | Why it is dangerous                      | Better alternative                               |
| ---------------------------------------- | ---------------------------------------- | ------------------------------------------------ |
| Exporting `(..)` for validated types     | Bypasses invariants                      | Export type plus smart constructor               |
| Putting all logic in `IO`                | Harder to test and reason about          | Pure core, effectful shell                       |
| Using `Maybe` for rich failure           | Loses explanation                        | `Either DomainError`                             |
| Using exceptions for ordinary validation | Hidden API contract                      | Typed failure                                    |
| Catching all exceptions broadly          | Hides programmer errors and async issues | Catch specific exceptions at meaningful boundary |
| Manual resource cleanup                  | Leaks on exceptions                      | `with...` / `bracket`                            |
| Lazy I/O for large production pipelines  | Unclear handle lifetime and memory       | Strict or streaming I/O                          |
| Using `Show` as serialization            | Not stable external format               | Real encoder                                     |
| Scattered unsafe calls                   | Impossible to audit                      | Isolated unsafe module with safe wrapper         |
| Trusting decoded JSON as domain value    | Shape is not semantic validity           | Decode then validate                             |
| Fire-and-forget threads                  | Lost exceptions and leaks                | Structured concurrency / supervision             |
| Giant environment record                 | Hidden global dependency bag             | Smaller capability records or coherent env       |

### Practical Boundary Discipline — compact rules

| Situation                                 | Rule of thumb                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| A type has an invariant                   | Hide its constructor                                                      |
| A function can be pure                    | Keep it pure                                                              |
| A failure is expected and recoverable     | Put it in the return type                                                 |
| A failure is operational                  | Handle exceptions at a meaningful boundary                                |
| Error context matters                     | Enrich or convert errors before returning                                 |
| Input comes from outside                  | Decode shape, then validate meaning                                       |
| Resource must be released                 | Use `with...` or `bracket`                                                |
| Code needs unsafe operation               | Isolate it behind a small safe API                                        |
| Data format is public or persisted        | Do not rely blindly on derived representation                             |
| Effects are many and repeated             | Consider capability records, `ReaderT`, transformers, or effect libraries |
| Concurrency creates child work            | Use structured patterns and cleanup                                       |
| Public API feels convenient but too broad | Reduce exports and expose intention                                       |

A mature Haskell codebase is usually recognizable by its boundaries. Constructors are hidden where invariants matter. Pure logic is not unnecessarily in `IO`. Error types reflect caller responsibility. Resources are scoped. External data is validated. Unsafe code is isolated. Modules expose concepts rather than accidents. These are not aesthetic preferences; they are the mechanisms by which Haskell’s type and module systems become practical engineering tools.
## PART 6 — Standard Library and Core Ecosystem Reference by Task Pattern

### Orientation — small core, practical ecosystem, task-first library use

Haskell’s practical library story is different from languages that concentrate most everyday functionality in one large standard library. The `base` package is central, but professional Haskell usually relies on a stable constellation of core ecosystem packages: `text`, `bytestring`, `containers`, `vector`, `aeson`, `stm`, `async`, `mtl`, `transformers`, parser libraries, testing libraries, and build tools. Cabal is the standard Haskell build and package system, while Stackage provides curated package sets selected to build together and pass tests before appearing in Nightly or LTS snapshots. ([cabal.readthedocs.io][1])

This part is organized by task. The question is not “which modules exist?” but **which library area should be chosen for a concrete programming job, what abstraction does it imply, and what mistake does it prevent or introduce?**

| Task area                 | Core package/module family                                  | Professional use                            | Common mistake                             |
| ------------------------- | ----------------------------------------------------------- | ------------------------------------------- | ------------------------------------------ |
| Basic functions and types | `base`, `Prelude`, `Data.Maybe`, `Data.Either`, `Data.List` | Everyday pure programming                   | Treating `Prelude` as the whole ecosystem  |
| Text                      | `text`, `Data.Text`, `Data.Text.IO`                         | Human-readable Unicode text                 | Using large `String` values in production  |
| Binary data               | `bytestring`                                                | Raw bytes, encoded protocols, efficient I/O | Treating bytes as text without decoding    |
| Collections               | `containers`, `unordered-containers`, `vector`              | Maps, sets, dense arrays                    | Using lists for all collections            |
| Time                      | `time`                                                      | Dates, timestamps, time zones               | Treating time as plain strings             |
| JSON and serialization    | `aeson`, binary/CBOR/YAML libraries                         | External data interchange                   | Deriving public formats blindly            |
| Parsing                   | `megaparsec`, `attoparsec`, `parsec`                        | Text/binary parsing                         | Using partial `read` on external input     |
| Effects                   | `transformers`, `mtl`, effect libraries                     | Reader/state/error composition              | Introducing effect stacks too early        |
| Concurrency               | `async`, `stm`, `base` concurrency modules                  | Structured concurrent work                  | Raw `forkIO` without ownership             |
| Resources                 | `base`, `exceptions`, resource libraries                    | Exception-safe acquire/use/release          | Manual cleanup                             |
| Testing                   | `HUnit`, `hspec`, `tasty`, `QuickCheck`, `Hedgehog`         | Example tests, test trees, properties       | Only testing examples, not laws/properties |
| Debugging/profiling       | GHC RTS, eventlog, cost centers, HLS                        | Runtime diagnosis                           | Guessing performance from source syntax    |
| CLI/config                | `optparse-applicative`, environment/config libraries        | Command-line tools                          | Hand-rolled string parsing                 |
| Package workflow          | Cabal, Stack, Hackage, Stackage, GHCup                      | Build, dependencies, toolchain              | Mixing tool versions without a plan        |

The guiding rule is: **choose libraries by representation and boundary.** Use `Text` for text, `ByteString` for bytes, `Map` for keyed lookup, `Vector` for indexed dense data, `Either` or parser libraries for recoverable parsing, `async`/STM for structured concurrency, and Cabal/Stack/GHCup deliberately rather than accidentally.

### Package and Tooling Baseline — Cabal, Stack, Hackage, Stackage, GHCup, HLS

Haskell package workflow is not merely administrative. It shapes reproducibility, dependency solving, editor support, compiler version selection, and deployment confidence. Cabal describes package metadata and build components; a Cabal package conventionally has a `.cabal` file at the package root containing metadata and build information. ([cabal.readthedocs.io][2]) GHCup is the common installer for GHC and surrounding tools, and the official GHCup installation guide explicitly includes installing HLS during setup. ([Haskell][3]) HLS support depends on matching supported GHC versions, so editor reliability is partly a toolchain-version problem, not just an editor problem. ([Haskell Language Server][4])

| Tool/source | Role                                              | Use when                                          | Caveat                                                                   |
| ----------- | ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------ |
| GHC         | Compiler and interactive environment through GHCi | Compile and run Haskell                           | Version affects extensions, warnings, performance, library compatibility |
| GHCi        | Interactive REPL                                  | Explore types, evaluate expressions, inspect APIs | REPL convenience should not replace project tests                        |
| Cabal       | Standard package/build system                     | Most project builds and package definitions       | Dependency solving and version bounds require learning                   |
| Stack       | Build tool with snapshot-centered workflow        | Projects standardized around Stackage resolvers   | May lag latest GHC/package combinations depending on snapshot            |
| Hackage     | Main package repository                           | Finding and publishing packages                   | Package compatibility is not guaranteed merely by existence              |
| Stackage    | Curated package snapshots                         | Reproducible sets of packages                     | Only subset of Hackage; does not patch packages                          |
| GHCup       | Toolchain installer                               | Install/manage GHC, Cabal, HLS, Stack             | Project must use a compatible GHC for HLS to work smoothly               |
| HLS         | Language server                                   | Editor diagnostics, navigation, code actions      | Must align with supported GHC versions                                   |

A minimal Cabal project often has a `.cabal` file, a source directory, and optionally executable/test components:

```text
my-lib/
  my-lib.cabal
  src/
    MyLib.hs
  app/
    Main.hs
  test/
    Spec.hs
```

A simplified Cabal component style:

```cabal
library
  exposed-modules:
      MyLib
  hs-source-dirs:
      src
  build-depends:
      base >=4.18 && <5,
      text,
      containers
  default-language:
      GHC2021

executable my-app
  main-is:
      Main.hs
  hs-source-dirs:
      app
  build-depends:
      base,
      my-lib
```

The language edition and dependency bounds are part of the engineering contract. A project that says `default-language: GHC2021` or `GHC2024` is selecting a language surface. A project that gives dependency bounds is selecting compatibility assumptions.

**Common Pitfalls.** The common workflow failure is mixing GHC, Cabal, Stack, and HLS versions without understanding which tool controls which version. Another mistake is copying dependency bounds mechanically. Bounds are not decoration; they are compatibility claims. For libraries, bounds affect downstream users. For applications, pinned or curated dependency sets may matter more than broad compatibility.

### Prelude and base — everyday functions, historical defaults, sharp edges

`Prelude` is imported by default in ordinary modules unless disabled. It provides basic types, typeclasses, and functions. The broader `base` package includes many foundational modules: `Data.Maybe`, `Data.Either`, `Data.List`, `Data.Foldable`, `Data.Traversable`, `Control.Monad`, `Control.Applicative`, `Control.Exception`, `System.IO`, and concurrency primitives.

| Task                | Common module/function                          | Canonical use                             | Caveat                                      |                                          |
| ------------------- | ----------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ---------------------------------------- |
| Optional values     | `Data.Maybe`, `maybe`, `fromMaybe`, `mapMaybe`  | Handle `Maybe` safely                     | Avoid unsafe extraction                     |                                          |
| Either values       | `Data.Either`, `either`, `lefts`, `rights`      | Handle success/failure shapes             | Prefer structured error types               |                                          |
| Lists               | `Data.List`, `map`, `filter`, `foldr`, `sortOn` | Simple sequence processing                | Lists are not arrays                        |                                          |
| Folding             | `Data.Foldable`, `foldMap`, `traverse_`         | Generic aggregation/effects               | Know strictness behavior                    |                                          |
| Traversal           | `Data.Traversable`, `traverse`, `sequenceA`     | Effectful structure processing            | Understand `Applicative`                    |                                          |
| Monadic helpers     | `Control.Monad`                                 | `when`, `unless`, `forever`, `replicateM` | Do not use monadic style when pure suffices |                                          |
| Applicative helpers | `Control.Applicative`                           | `<                                        | >`, `many`, `some`                          | Alternative behavior depends on instance |
| Exceptions          | `Control.Exception`                             | `try`, `bracket`, `catch`                 | Be careful with async exceptions            |                                          |
| I/O                 | `System.IO`                                     | handles, buffering, file modes            | Lazy I/O caveats                            |                                          |
| Environment         | `System.Environment`                            | CLI args, environment variables           | Validate raw strings                        |                                          |

Useful `Maybe` tools:

```haskell
displayName :: Maybe Text -> Text
displayName =
  fromMaybe "anonymous"
```

```haskell
parseIds :: [Text] -> [UserId]
parseIds =
  mapMaybe parseUserId
```

Useful `Either` eliminator:

```haskell
renderResult :: Either Error User -> Text
renderResult =
  either renderError renderUser
```

Useful monadic helpers:

```haskell
saveWhenValid :: Bool -> IO () -> IO ()
saveWhenValid ok action =
  when ok action
```

`Prelude` also contains functions that are risky in serious code.

| Function   | Risk                                | Safer pattern                                   |
| ---------- | ----------------------------------- | ----------------------------------------------- |
| `head`     | Fails on empty list                 | Pattern match, `NonEmpty`, safe helper          |
| `tail`     | Fails on empty list                 | Pattern match                                   |
| `!!`       | Fails out of range; linear indexing | Safer indexing, `Vector`, better representation |
| `read`     | Partial parse                       | `readMaybe`, parser                             |
| `fromJust` | Fails on `Nothing`                  | Pattern match, `maybe`, `do` over `Maybe`       |
| `foldl`    | Can build thunks                    | `foldl'` for strict accumulation                |

**Failure-first explanation.** The tempting but wrong mental model is that if a function is in `Prelude`, it is generally safe and idiomatic. The surprising behavior is that several historical functions are partial or performance-sensitive. The correct explanation is that `Prelude` is foundational and historical, not a perfect modern safety layer. The professional rule is: **know which `Prelude` functions are partial, prefer total alternatives in public code, and use more precise modules when representation matters.**

### Files and Paths — FilePath, Path-like libraries, handles, strictness

File handling begins in `base` with `System.IO`, `readFile`, `writeFile`, `withFile`, and `FilePath`. But the design choice is not just which function reads a file. It is whether the code treats paths as raw strings, how it handles encoding, whether it reads strictly or lazily, and whether file handles are scoped safely.

| Task                    | Basic tool                             | Better professional concern | Common mistake                |
| ----------------------- | -------------------------------------- | --------------------------- | ----------------------------- |
| Read small text file    | `Data.Text.IO.readFile`                | Encoding and strictness     | Using `String` I/O by default |
| Write small text file   | `Data.Text.IO.writeFile`               | Atomicity if needed         | Ignoring failure modes        |
| Handle-based processing | `withFile`                             | Exception-safe lifetime     | Manual open/close             |
| Binary file             | `ByteString` I/O                       | Bytes, not text             | Decoding too late or never    |
| Path manipulation       | `FilePath` functions or path libraries | Portability and validation  | Hand-concatenating paths      |
| Large file              | Streaming library                      | Bounded memory              | Reading whole file            |
| Temporary files         | temp-file libraries                    | Cleanup and race safety     | Ad-hoc temp paths             |

Basic text read:

```haskell
import qualified Data.Text.IO as TIO

loadConfigText :: FilePath -> IO Text
loadConfigText path =
  TIO.readFile path
```

Exception-aware version:

```haskell
loadConfigText :: FilePath -> IO (Either IOException Text)
loadConfigText path =
  try (TIO.readFile path)
```

Handle-scoped processing:

```haskell
countLines :: FilePath -> IO Int
countLines path =
  withFile path ReadMode $ \handle -> do
    contents <- TIO.hGetContents handle
    pure (length (T.lines contents))
```

For large files, strict `readFile` or lazy handle reads are often not the right abstraction. Use a streaming library when memory bounds and incremental processing matter.

**Common Pitfalls.** `FilePath` is historically a type synonym for `String`, so it does not itself guarantee path validity, absoluteness, existence, or security. Another frequent mistake is hand-building paths with string concatenation. In serious code, use path manipulation functions or typed path libraries where appropriate.

### Text and Unicode — Text, String, builders, encoding boundaries

Human-readable text should usually be represented as `Text`, not `String`, in production code. `String` is `[Char]`, which is convenient for teaching and some APIs, but often poor for large or frequent text processing.

| Task                       | Prefer                     | Why                       | Caveat                                             |
| -------------------------- | -------------------------- | ------------------------- | -------------------------------------------------- |
| Domain text                | `Text`                     | Efficient Unicode text    | Requires imports and sometimes `OverloadedStrings` |
| Debug display              | `Show` / `show`            | Quick inspection          | Not stable serialization                           |
| Many small concatenations  | `Builder`                  | Efficient construction    | Convert at boundary                                |
| Text file I/O              | `Data.Text.IO`             | Avoid `[Char]` I/O        | Encoding behavior must be understood               |
| Raw bytes that encode text | `ByteString` then decode   | Separates bytes from text | Decode can fail                                    |
| CLI strings                | Often `String` at boundary | Some APIs use `String`    | Convert to `Text` for domain logic                 |

Typical imports:

```haskell
{-# LANGUAGE OverloadedStrings #-}

import Data.Text (Text)
import qualified Data.Text as T
import qualified Data.Text.IO as TIO
```

Basic operations:

```haskell
normalizeName :: Text -> Text
normalizeName =
  T.toLower . T.strip
```

```haskell
splitTags :: Text -> [Text]
splitTags =
  fmap T.strip . T.splitOn ","
```

Text concatenation:

```haskell
greeting :: Text -> Text
greeting name =
  "Hello, " <> name
```

For many concatenations, builders avoid repeated allocation patterns:

```haskell
-- Conceptual pattern; exact builder module depends on chosen package.
renderLargeDocument :: [User] -> Text
renderLargeDocument users =
  builderToText (foldMap renderUserBuilder users)
```

Encoding boundaries matter. A `ByteString` received from a network or file is not automatically valid Unicode text. Decode explicitly, and choose whether invalid bytes should fail or be replaced.

| Boundary      | Representation          | Operation                              |
| ------------- | ----------------------- | -------------------------------------- |
| Network bytes | `ByteString`            | Decode according to protocol           |
| UTF-8 JSON    | `ByteString`            | JSON decoder handles UTF-8 expectation |
| Domain text   | `Text`                  | Work with Unicode text                 |
| Output file   | `Text` -> encoded bytes | Text I/O or explicit encoding          |

**Failure-first explanation.** The tempting but wrong mental model is that all string-like values are interchangeable. The surprising bugs are performance issues, encoding errors, invalid Unicode assumptions, and APIs that mix text with bytes. The correct explanation is that `String`, `Text`, and `ByteString` are different representations for different jobs. The professional rule is: **use `Text` for human text, `ByteString` for bytes, and convert explicitly at boundaries.** The boundary changes for tiny examples and legacy APIs, where `String` remains common.

### Binary Data and ByteString — bytes, protocols, efficient I/O

`ByteString` represents bytes, not characters. It is appropriate for binary files, network protocols, cryptographic hashes, compressed data, and encoded textual formats before decoding.

| Task                       | Prefer                                         | Reason                               |
| -------------------------- | ---------------------------------------------- | ------------------------------------ |
| Binary file content        | Strict or lazy `ByteString`                    | Efficient byte storage               |
| Network payload            | `ByteString`                                   | Protocols operate on bytes           |
| Hashes and keys            | `ByteString` or specialized types              | Raw bytes, not text                  |
| UTF-8 input                | `ByteString` then decode                       | Separate transport from text         |
| JSON payload               | Usually lazy/strict `ByteString` depending API | JSON libraries work at byte boundary |
| Incremental binary parsing | Parser over bytes                              | Avoid converting to text incorrectly |

Example domain distinction:

```haskell
newtype PasswordHash = PasswordHash ByteString
newtype UserDisplayName = UserDisplayName Text
```

This prevents mixing bytes and user-facing text.

A binary read:

```haskell
import qualified Data.ByteString as BS

loadBytes :: FilePath -> IO ByteString
loadBytes =
  BS.readFile
```

A text decoding boundary may return failure:

```haskell
decodePayload :: ByteString -> Either UnicodeError Text
decodePayload =
  decodeUtf8Either
```

The exact function depends on the text encoding module used. The important point is that decoding is not a mere cast.

**Common Pitfalls.** Do not store arbitrary binary data in `Text`. Do not assume a `ByteString` is valid UTF-8 just because it came from a text-like source. Do not use `Show` on bytes as a serialization format. For performance, also distinguish strict and lazy `ByteString`; lazy `ByteString` is chunked and useful in some I/O contexts, but it has resource and evaluation caveats.

### Dates, Time, and Time Zones — time package, UTC, local time, parsing

Time is a domain with many traps. Haskell’s `time` package is the ordinary foundation for dates, clock times, UTC timestamps, local times, and formatting/parsing.

| Task             | Type/tool                     | Use                       | Pitfall                                    |
| ---------------- | ----------------------------- | ------------------------- | ------------------------------------------ |
| Calendar day     | `Day`                         | Date without time of day  | Treating as timestamp                      |
| UTC timestamp    | `UTCTime`                     | Instant in UTC            | Losing local display context               |
| Local date/time  | `LocalTime`                   | Wall-clock representation | Ambiguous without time zone                |
| Time zone offset | `TimeZone`                    | Offset from UTC           | Not full historical zone database          |
| Duration         | `NominalDiffTime`, `DiffTime` | Time differences          | Calendar arithmetic is not simple duration |
| Parse/format     | `formatTime`, `parseTimeM`    | Boundary conversion       | Locale/format mismatch                     |
| Current time     | `getCurrentTime`              | `IO UTCTime`              | Time is effectful                          |

Example:

```haskell
import Data.Time

createdRecently :: UTCTime -> UTCTime -> Bool
createdRecently now createdAt =
  diffUTCTime now createdAt < 86400
```

This compares instants. For business rules like “same local calendar day,” UTC duration may be wrong. Use local time conversion with an explicit zone.

A better domain model distinguishes instants from dates:

```haskell
data Invoice = Invoice
  { invoiceCreatedAt :: UTCTime
  , invoiceDueDay    :: Day
  }
```

The first is an instant. The second is a calendar date.

**Failure-first explanation.** The tempting but wrong mental model is that time can be represented as `Text`, `Int`, or one universal timestamp everywhere. The surprising bugs are time-zone shifts, daylight-saving transitions, ambiguous local times, and wrong date arithmetic. The correct explanation is that time has multiple concepts: instant, local time, date, duration, and formatted representation. The professional rule is: **store instants as UTC when appropriate, model calendar dates separately, parse/format only at boundaries, and make local-time assumptions explicit.**

### Collections and Iteration Utilities — lists, Map, Set, Vector, folds

Haskell collection choice should follow access pattern and invariant, not habit.

| Task                    | Preferred structure | Package/module family         | Why                              |
| ----------------------- | ------------------- | ----------------------------- | -------------------------------- |
| Recursive sequence      | List `[a]`          | `base`                        | Simple structural recursion      |
| Keyed lookup            | `Map k v`           | `containers`                  | Ordered key-value map            |
| Unique ordered elements | `Set a`             | `containers`                  | Membership and uniqueness        |
| Dense indexed sequence  | `Vector a`          | `vector`                      | Efficient indexing and traversal |
| Byte sequence           | `ByteString`        | `bytestring`                  | Raw bytes                        |
| Text sequence           | `Text`              | `text`                        | Unicode text                     |
| Non-empty sequence      | `NonEmpty a`        | `base` / `Data.List.NonEmpty` | Removes empty case               |
| Hash-based lookup       | `HashMap k v`       | `unordered-containers`        | Hash-based performance profile   |

List operations:

```haskell
activeNames :: [User] -> [Text]
activeNames =
  map userName . filter userIsActive
```

Map lookup:

```haskell
import qualified Data.Map.Strict as Map

lookupUser :: UserId -> Map UserId User -> Maybe User
lookupUser =
  Map.lookup
```

Set membership:

```haskell
import qualified Data.Set as Set

hasTag :: Text -> Set Text -> Bool
hasTag =
  Set.member
```

Vector indexing should be used when indexed access is central, but safe indexing should still be considered.

The general traversal vocabulary matters:

```haskell
traverse  :: Applicative f => (a -> f b) -> t a -> f (t b)
traverse_ :: Applicative f => (a -> f b) -> t a -> f ()
foldMap   :: Monoid m => (a -> m) -> t a -> m
```

Conceptually:

```haskell
loadUsers :: [UserId] -> IO [Maybe User]
loadUsers =
  traverse loadUser
```

```haskell
printUsers :: [User] -> IO ()
printUsers =
  traverse_ printUser
```

```haskell
allTags :: [User] -> Set Text
allTags =
  foldMap userTags
```

**Common Pitfalls.** A common mistake is using lists for keyed lookup, uniqueness, or frequent indexing. Another is using lazy folds for strict aggregation. A third is over-generalizing to `Foldable` or `Traversable` before the API needs it. Choose concrete collection types in domain APIs when representation matters.

### Functional Utilities — Functor, Applicative, Monad, Foldable, Traversable

Haskell’s standard functional utilities are not ornamentation; they are the connective tissue of the ecosystem.

| Abstraction   | Core operation     | Task                                        | Practical example         |                     |
| ------------- | ------------------ | ------------------------------------------- | ------------------------- | ------------------- |
| `Functor`     | `fmap` / `<$>`     | Transform inside context                    | `userName <$> maybeUser`  |                     |
| `Applicative` | `pure`, `<*>`      | Combine independent contextual computations | `User <$> pName <*> pAge` |                     |
| `Monad`       | `>>=`, `do`        | Sequence dependent contextual computations  | `x <- parse; load x`      |                     |
| `Alternative` | `<                 | >`, `empty`                                 | Choice/failure/repetition | parser alternatives |
| `Foldable`    | `foldMap`, `foldr` | Consume structure                           | aggregate tags            |                     |
| `Traversable` | `traverse`         | Map with effects and preserve structure     | load many users           |                     |
| `Semigroup`   | `<>`               | Associative combination                     | combine text, sets, logs  |                     |
| `Monoid`      | `mempty`           | Empty plus combination                      | default aggregation       |                     |

A compact example:

```haskell
data RawUser = RawUser
  { rawName :: Text
  , rawAge  :: Text
  }

parseUser :: RawUser -> Either UserError User
parseUser raw =
  User
    <$> parseName (rawName raw)
    <*> parseAge  (rawAge raw)
```

The applicative form says parsing name and age are independent. A monadic form is better if a later parse depends on an earlier value:

```haskell
parsePayload :: Parser Payload
parsePayload = do
  size <- parseSize
  parseBytes size
```

`traverse` is a professional workhorse:

```haskell
validateUsers :: [RawUser] -> Either UserError [User]
validateUsers =
  traverse validateUser
```

It turns a list of computations into a computation producing a list.

**Interdisciplinary Lens: Category Theory**

What it clarifies: these abstractions describe recurring lawful composition patterns: mapping, independent combination, dependent sequencing, choice, folding, and traversal.

Language feature involved: `Functor`, `Applicative`, `Monad`, `Alternative`, `Foldable`, `Traversable`, `Semigroup`, `Monoid`.

Practical consequence: standard library and ecosystem APIs become easier to read because they share a small composition vocabulary.

Limit of the lens: the laws and names do not replace understanding each concrete instance’s behavior, performance, and failure semantics.

**Common Pitfalls.** A common failure is using `Monad` everywhere because `do` notation is readable. This can hide independence that `Applicative` would express. Another failure is treating `Functor`/`Applicative`/`Monad` as mystical rather than task labels. Read them operationally first: transform, combine, sequence.

### JSON and Data Formats — aeson, explicit boundaries, generic deriving

JSON work in Haskell commonly uses `aeson`, a fast JSON library in the Haskell ecosystem; Stackage lists `aeson` as a library for working with JSON data. ([stackage.org][5]) The important design question is whether JSON representation is internal convenience or public contract.

Internal quick type:

```haskell
{-# LANGUAGE DeriveGeneric #-}

data User = User
  { userName :: Text
  , userAge  :: Int
  }
  deriving (Generic, Show)
```

Generic JSON deriving is convenient, but for public APIs it may expose internal names and structure accidentally.

A safer boundary model:

```haskell
data User = User
  { userName :: Name
  , userAge  :: Age
  }

data UserJson = UserJson
  { name :: Text
  , age  :: Int
  }
```

Then:

```haskell
fromUserJson :: UserJson -> Either UserJsonError User
toUserJson   :: User -> UserJson
```

| Task                       | Strategy                                      | Use when                   | Caveat                              |
| -------------------------- | --------------------------------------------- | -------------------------- | ----------------------------------- |
| Internal JSON              | Generic deriving                              | Format is not stable API   | Internal field changes affect JSON  |
| Public API JSON            | Explicit instances or DTO types               | Compatibility matters      | More code                           |
| Validation                 | Decode then validate                          | Domain invariants matter   | Decoding is not validation          |
| Versioned format           | Include version/migration                     | Long-lived data            | Must maintain old decoders          |
| Performance-sensitive JSON | Use appropriate `aeson` APIs and benchmarking | Large payloads             | Avoid guessing                      |
| Human config               | YAML/TOML/Dhall/etc. ecosystem                | Config readability matters | Each format has different semantics |

A decode boundary should normally return a structured error or convert errors into a domain error:

```haskell
loadUserJson :: ByteString -> Either UserJsonError User
loadUserJson bytes = do
  raw <- decodeUserJson bytes
  fromUserJson raw
```

**Failure-first explanation.** The tempting but wrong mental model is that deriving `ToJSON` and `FromJSON` solves serialization. The surprising failure is compatibility breakage when internal field names, constructors, or record structure change. The correct explanation is that serialization is a boundary contract. The professional rule is: **use generic deriving for internal or low-stakes formats; use explicit boundary types and instances for public, persisted, or versioned formats.** The boundary changes in prototypes and scripts, where convenience may be worth more than format stability.

### Regular Expressions and Parsing — regex as filter, parser as structure

Haskell has regex libraries, but idiomatic Haskell often favors parser combinators when input has structure. Regex is useful for simple pattern tests or extraction; parser libraries are better for grammar, error reporting, nested structure, and typed output.

| Task                                   | Prefer                             | Why                   |
| -------------------------------------- | ---------------------------------- | --------------------- |
| Simple substring or token pattern      | Text functions or regex            | Lightweight           |
| Validate rough format                  | Regex or parser                    | Depends on complexity |
| Parse nested grammar                   | Parser combinator                  | Structure and errors  |
| Parse programming-language-like syntax | `megaparsec`/`parsec` style parser | Recursive grammar     |
| Parse high-performance byte protocols  | `attoparsec`-style parser          | Performance focus     |
| Parse user-facing config               | Parser with good errors            | Diagnostics matter    |

Regex-like email checking is often insufficient as full validation:

```haskell
mkEmail :: Text -> Either EmailError Email
mkEmail txt =
  if roughEmailCheck txt
    then Right (Email txt)
    else Left (InvalidEmail txt)
```

This may be acceptable if “roughly shaped email” is the real business rule. If exact syntax matters, use a proper parser or specialized library.

Parser combinator style:

```haskell
parseUser :: Parser User
parseUser =
  User
    <$> parseName
    <*  symbol ":"
    <*> parseAge
```

This builds a typed result directly.

**Common Pitfalls.** Regex becomes fragile when used as a parser for nested or context-sensitive structures. Parser combinators can also be overkill for simple substring checks. The professional rule is: **use regex for flat patterns; use parsers for structure, typed results, and good error reporting.**

### Logging and Observability — structured events, context, effects

Haskell has several logging ecosystems rather than one universal standard. The important design point is that logging is an effect and should be treated as a boundary, not scattered as incidental `putStrLn`.

Weak logging:

```haskell
processUser user = do
  putStrLn "processing user"
  ...
```

Stronger capability-based style:

```haskell
data Logger m = Logger
  { logInfo  :: Text -> m ()
  , logError :: Text -> m ()
  }

processUser :: Monad m => Logger m -> User -> m Result
```

Structured logging may use records or key-value fields:

```haskell
data LogEvent
  = UserCreated UserId
  | UserRejected UserError
  | ImportCompleted Int
```

Then rendering can be separated from event creation.

| Observability task  | Tool/style                              | Design note                             |
| ------------------- | --------------------------------------- | --------------------------------------- |
| Small script output | `putStrLn`, `print`                     | Fine for local scripts                  |
| Application logging | Logger capability                       | Keeps logging abstract and testable     |
| Structured events   | ADT or structured fields                | Machine-readable logs                   |
| Metrics             | Metrics library/capability              | Separate from logs                      |
| Tracing             | Tracing ecosystem                       | Propagate context                       |
| Debug inspection    | `trace`-style tools                     | Avoid in production logic               |
| Error reporting     | Structured errors plus logging boundary | Do not replace error handling with logs |

**Common Pitfalls.** `Debug.Trace` can be useful during debugging, but it breaks the ordinary purity story by printing from pure-looking code. Do not leave trace-based behavior in core logic. Another pitfall is logging secrets by deriving `Show` for sensitive types. Use redacted instances or avoid logging sensitive values.

### Testing — examples, properties, laws, effects

Haskell testing benefits from pure functions and strong types. The ecosystem commonly uses test frameworks such as `tasty` or `hspec`, unit assertions, and property-based testing through libraries such as `QuickCheck` or `Hedgehog`.

| Test task          | Tool/style                                 | Best use                              |
| ------------------ | ------------------------------------------ | ------------------------------------- |
| Unit example       | HUnit/hspec/tasty assertions               | Specific expected behavior            |
| Property test      | QuickCheck/Hedgehog                        | Laws and broad input space            |
| Golden test        | Golden testing libraries                   | Stable text/output formats            |
| Parser test        | Example + failure diagnostics              | Boundary behavior                     |
| Effectful test     | Mock capability record or test environment | Application workflows                 |
| Typeclass law test | Law-checking helpers/property tests        | Instances such as `Functor`, `Monoid` |
| Regression test    | Ordinary test case                         | Previously observed bug               |

Pure function test:

```haskell
normalizeName " Ada " == "ada"
```

Property-style idea:

```haskell
normalizeName (normalizeName x) == normalizeName x
```

This states idempotence: normalizing twice equals normalizing once. Whether this property should hold depends on the intended semantics.

Typeclass law example:

```haskell
fmap id value == value
```

For a `Functor` instance, this should hold.

Effectful code is easier to test if dependencies are passed as records:

```haskell
data UserStore m = UserStore
  { findUser :: UserId -> m (Maybe User)
  , saveUser :: User -> m ()
  }
```

Tests can provide an in-memory implementation.

**Interdisciplinary Lens: Category Theory**

What it clarifies: many abstractions have laws that are ideal targets for property tests.

Language feature involved: `Functor`, `Applicative`, `Monad`, `Semigroup`, `Monoid`, custom typeclasses.

Practical consequence: tests can verify not only examples, but expected algebraic behavior.

Limit of the lens: property tests check sampled cases, not formal proofs, unless combined with stronger verification methods.

**Common Pitfalls.** Relying only on example tests misses algebraic and boundary failures. Relying only on property tests can miss specific business cases and error-message requirements. Haskell’s advantage is that pure logic, domain types, and property testing work well together; use all of them deliberately.

### Debugging and Interactive Exploration — GHCi, typed holes, trace, warnings, HLS

Haskell debugging often begins before runtime: with types, warnings, typed holes, and small REPL experiments. GHCi is useful for evaluating expressions, checking inferred types, testing small functions, and inspecting APIs. HLS adds editor-level diagnostics, navigation, and code actions; its installation documentation notes that `ghc` must be available on the path for standalone files, and GHCup is a common installation route. ([Haskell Language Server][1])

| Debugging task        | Tool                        | Use                                        | Caveat                                         |
| --------------------- | --------------------------- | ------------------------------------------ | ---------------------------------------------- |
| Inspect inferred type | GHCi `:type` / editor hover | Understand polymorphism and constraints    | Inferred type is not always best public API    |
| Try expression        | GHCi                        | Fast feedback                              | REPL snippets may differ from project settings |
| Locate missing code   | Typed holes `_`             | Ask compiler what type is needed           | Type does not choose domain behavior           |
| Catch suspicious code | `-Wall`, warnings           | Pattern coverage, unused names, defaulting | Warnings must be treated consistently          |
| Follow definitions    | HLS/editor                  | Navigate source and imports                | Requires compatible toolchain                  |
| Print debug from `IO` | `print`, logging            | Effectful debugging                        | Avoid replacing tests with prints              |
| Trace pure code       | `Debug.Trace`               | Emergency inspection                       | Breaks ordinary purity expectations            |
| Runtime profiling     | GHC RTS/profiler            | Allocation/time diagnosis                  | Requires profiling build and interpretation    |

Typed holes are a distinctive development tool:

```haskell id="9n0bcl"
normalizeAll :: [Text] -> [Text]
normalizeAll xs =
  map _ xs
```

The compiler can report that the hole should have a type like:

```haskell id="ikhneq"
Text -> Text
```

This guides implementation:

```haskell id="x5civ4"
normalizeAll :: [Text] -> [Text]
normalizeAll xs =
  map T.strip xs
```

Warnings are part of professional feedback. For example, a missing pattern case may compile but still be dangerous:

```haskell id="zd3cpf"
fromJustText :: Maybe Text -> Text
fromJustText (Just x) = x
```

A warning-enabled workflow should flag non-exhaustiveness or related pattern risks.

`Debug.Trace` can be useful when laziness makes evaluation order unclear:

```haskell id="3wmkq8"
import Debug.Trace

f :: Int -> Int
f x =
  trace ("x = " <> show x) (x + 1)
```

But this should not become normal program logic. Logging belongs in `IO` or an explicit logging abstraction.

**Failure-first explanation.** The tempting but wrong mental model is that debugging Haskell means adding prints until behavior is visible. The surprising reality is that many mistakes are better diagnosed through type holes, warnings, equational simplification, smaller pure tests, or profiling. The correct explanation is that Haskell has several feedback layers: type checker, warnings, REPL, tests, tracing, and runtime profiler. The professional rule is: **use types and warnings first for structural mistakes, tests for semantic mistakes, logging for effectful workflows, and profiling for performance.**

### Performance and Profiling Utilities — RTS options, cost centers, allocation, eventlog

Haskell performance is not reliably inferred from surface syntax. Laziness, allocation, sharing, fusion, strictness analysis, specialization, garbage collection, and data representation matter. Profiling is therefore a core practical skill.

| Performance question         | Tool/approach                      | What it reveals                       | Common wrong guess                 |
| ---------------------------- | ---------------------------------- | ------------------------------------- | ---------------------------------- |
| Where is time spent?         | Time profiling / cost centers      | Hot functions                         | Assuming short source code is fast |
| Where is memory allocated?   | Allocation profiling               | Allocation-heavy paths                | Blaming CPU before allocation      |
| Why is memory retained?      | Heap profiling                     | Thunks, closures, retained structures | Assuming GC is the only problem    |
| What happens in concurrency? | Eventlog/thread profiling          | Scheduling, sparks, thread behavior   | Assuming parallelism gives speedup |
| Is strictness helping?       | Benchmark and profile before/after | Evaluation and allocation effects     | Adding bangs everywhere            |
| Is data structure wrong?     | Benchmark alternatives             | List vs vector/map/set costs          | Using list by habit                |
| Did compiler optimize?       | Core inspection, benchmark         | Inlining, specialization, fusion      | Assuming fusion always fires       |

A common performance improvement is changing a lazy accumulation to a strict one:

```haskell id="le5p0a"
sumStrict :: [Int] -> Int
sumStrict =
  foldl' (+) 0
```

But strictness is not universally better. Laziness enables short-circuiting:

```haskell id="mjpcr3"
hasAdmin :: [User] -> Bool
hasAdmin =
  any userIsAdmin
```

This can stop early.

Benchmarking usually belongs to a dedicated benchmark suite rather than ad-hoc timing. Profiling belongs to the actual program shape because small examples may not reproduce allocation and laziness behavior.

| Optimization area     | First check                                       | Do not do first                                 |
| --------------------- | ------------------------------------------------- | ----------------------------------------------- |
| Large text processing | `Text`/builder/streaming choices                  | Micro-optimize string concatenation blindly     |
| Numeric loops         | `Vector`, strict fields, unboxing where justified | Assume list recursion is fine                   |
| Map/set operations    | Key type and operation complexity                 | Replace with hand-written structure prematurely |
| JSON parsing          | Parser/decoder cost and allocation                | Blame generic deriving without measurement      |
| Effect workflows      | I/O batching and resource use                     | Tune pure code first if I/O dominates           |
| Concurrency           | Work granularity and contention                   | Add more threads blindly                        |
| Laziness leak         | Heap profile and strictness                       | Add `seq` randomly                              |

**Common Pitfalls.** The major anti-pattern is “performance by folklore”: assuming that Haskell is slow because it is lazy, or fast because it is compiled and pure. Both are wrong. The professional rule is: **profile first, identify allocation and retention, then change representation, strictness, or algorithm.** The boundary changes for known hot paths, where experienced programmers may choose strict fields, unboxed types, or vectors upfront.

### Concurrency and Async Utilities — forkIO, async, STM, MVar, structured work

Haskell has strong concurrency abstractions. The `async` package provides functionality for asynchronous actions across multiple threads and is built on top of `forkIO`, improving on direct low-level thread usage. ([FP Complete][2]) STM is a major Haskell concurrency abstraction: transactional variables and composable transactions allow shared mutable state to be updated atomically; descriptions of Concurrent Haskell emphasize `TVar`, `retry`, and `orElse` as STM primitives. ([ウィキペディア][3])

| Task                             | Tool                         | Use                         | Risk                                 |
| -------------------------------- | ---------------------------- | --------------------------- | ------------------------------------ |
| Run action concurrently and wait | `async`, `wait`              | Structured concurrent tasks | Ignoring exceptions/cancellation     |
| Race actions                     | `race`-style APIs            | First result wins           | Losing cleanup if unmanaged          |
| Run many tasks                   | `mapConcurrently`-style APIs | Concurrent traversal        | Too many tasks or resource pressure  |
| Raw lightweight thread           | `forkIO`                     | Low-level concurrency       | Lost exceptions, leaked threads      |
| One-place communication          | `MVar`                       | Synchronization and handoff | Deadlock                             |
| Shared transactional state       | `TVar`, STM                  | Composable state updates    | Long transactions or effect attempts |
| Read-only parallelism            | Parallel strategies          | Pure parallel evaluation    | Laziness prevents expected work      |
| Cancellation                     | async exception mechanisms   | Stop child work             | Resource cleanup must be safe        |

Direct `forkIO` is low-level:

```haskell id="ieju6t"
_ <- forkIO action
```

This may be fine for low-level code, but it gives weak ownership. Who waits for the thread? Who sees its exception? Who cancels it?

A structured pattern is preferable:

```haskell id="if5p4p"
withAsync action $ \worker -> do
  result <- wait worker
  use result
```

For shared state, STM can express atomic changes:

```haskell id="m8ul6c"
increment :: TVar Int -> STM Int
increment counter = do
  n <- readTVar counter
  let n' = n + 1
  writeTVar counter n'
  pure n'
```

The transaction is run from `IO` through an STM boundary such as `atomically`.

**Interdisciplinary Lens: Software Transactional Memory**

What it clarifies: STM lets a block of shared-memory operations behave as a composable atomic transaction rather than a manually locked critical section.

Language feature involved: `STM`, `TVar`, `atomically`, `retry`, `orElse`.

Practical consequence: concurrent state updates can be composed with fewer explicit lock-ordering bugs than low-level locking.

Limit of the lens: STM does not make all concurrency easy. Long transactions, I/O boundaries, contention, cancellation, and performance still require design.

**Common Pitfalls.** The most common concurrency failure is using raw `forkIO` as fire-and-forget. This loses failure ownership. Another is confusing concurrency with parallel speedup. Concurrency structures work that overlaps in time; parallelism seeks faster evaluation through multiple cores. Part 7 will treat the runtime distinction more deeply.

### Networking and Web Boundary — bytes, protocols, servers, clients, streaming

Haskell networking is ecosystem-driven. There are libraries for HTTP clients, web servers, WebSockets, TLS, streaming, and serialization. The important standard-library-level lesson is representation: network protocols work with bytes, decoded text, structured messages, errors, resources, and concurrency.

| Networking task    | Typical ecosystem area | Boundary concern                            |
| ------------------ | ---------------------- | ------------------------------------------- |
| HTTP client        | HTTP client libraries  | Exceptions, timeouts, response decoding     |
| HTTP server        | Web frameworks         | Routing, request parsing, response encoding |
| Raw sockets        | Network libraries      | Bytes, buffering, resource lifetime         |
| JSON API           | HTTP + `aeson`         | Decode, validate, encode                    |
| Streaming response | Streaming libraries    | Backpressure and bounded memory             |
| TLS/security       | TLS libraries          | Certificate and configuration correctness   |
| WebSocket          | WebSocket libraries    | Long-lived connection lifecycle             |
| Retry policy       | Application layer      | Idempotence and failure classification      |

A layered API often separates transport from domain:

```haskell id="bq4wk1"
fetchUserBytes :: UserId -> IO ByteString

decodeUserResponse :: ByteString -> Either DecodeError RawUser

validateUser :: RawUser -> Either UserError User

fetchUser :: UserId -> IO (Either FetchUserError User)
```

This avoids pretending that “HTTP returned 200” means “valid domain user.”

**Common Pitfalls.** A common mistake is mixing transport errors, decoding errors, and domain validation errors into one `Text` message too early. Another is ignoring timeout and resource behavior. Networking code is a boundary-heavy area: bytes must be decoded, external data must be validated, exceptions must be classified, and long-running resources must be scoped.

### Command-Line Interfaces — arguments, options, commands, validation

CLI programs should not parse arguments by hand once options become non-trivial. `System.Environment.getArgs` is enough for tiny scripts, but practical command-line tools often use ecosystem libraries such as `optparse-applicative`.

| CLI task              | Tool/style             | Use                                   |
| --------------------- | ---------------------- | ------------------------------------- |
| Tiny script args      | `getArgs`              | One or two positional arguments       |
| Structured options    | `optparse-applicative` | Flags, subcommands, help text         |
| Environment variables | `lookupEnv`            | Runtime configuration                 |
| Config file           | Parser/decoder         | Larger settings                       |
| Validation            | Domain constructors    | Convert raw options to trusted config |
| Help/version output   | CLI library support    | User-facing tool behavior             |

A good CLI boundary uses a raw parsed options type and then validates it:

```haskell id="9jdesn"
data RawOptions = RawOptions
  { rawInputPath :: FilePath
  , rawLimit     :: Int
  }

data Options = Options
  { inputPath :: FilePath
  , limit     :: Limit
  }

validateOptions :: RawOptions -> Either OptionsError Options
```

This avoids treating “the parser accepted an integer” as “the integer is a valid limit.”

For very small tools:

```haskell id="c6q3lv"
main :: IO ()
main = do
  args <- getArgs
  case args of
    [path] -> run path
    _      -> putStrLn "usage: tool FILE"
```

This is acceptable only while the interface remains small.

**Common Pitfalls.** Hand-rolled CLI parsing grows fragile quickly: missing help text, inconsistent errors, poor subcommand handling, and weak validation. Another mistake is letting parsed options remain raw `String` or `Int` deep into the program. Convert them into domain configuration near the boundary.

### Configuration — environment, files, defaults, validation, typed config

Configuration is another external-input boundary. Environment variables, config files, CLI flags, and defaults must be merged and validated.

| Config source        | Representation            | Risk                         | Professional response    |
| -------------------- | ------------------------- | ---------------------------- | ------------------------ |
| Environment variable | `Maybe String`            | Missing or malformed         | Parse and validate       |
| CLI flag             | Raw text/int              | Invalid range or combination | Convert to domain type   |
| Config file          | JSON/YAML/TOML/Dhall/etc. | Schema and semantic errors   | Decode then validate     |
| Default value        | Haskell value             | Hidden assumption            | Document and test        |
| Secret value         | Text/bytes                | Accidental logging           | Use secret-specific type |
| Combined config      | Record                    | Conflicting sources          | Define precedence rules  |

Example:

```haskell id="zsxqic"
data RawConfig = RawConfig
  { rawPort     :: Int
  , rawLogLevel :: Text
  }

data Config = Config
  { configPort     :: Port
  , configLogLevel :: LogLevel
  }

validateConfig :: RawConfig -> Either ConfigError Config
validateConfig raw = do
  port     <- mkPort (rawPort raw)
  logLevel <- parseLogLevel (rawLogLevel raw)
  pure (Config port logLevel)
```

Loading remains effectful:

```haskell id="0b9sji"
loadConfig :: IO (Either ConfigLoadError Config)
```

Parsing and validation can remain pure after the raw data is obtained.

**Common Pitfalls.** Configuration often fails when raw values are trusted too early. A port is not just an `Int`; a log level is not just `Text`; a timeout is not just a number without units. Use domain types to prevent mistakes.

### Subprocess and OS Interaction — process boundaries, exit codes, streams

Subprocess interaction is effectful and failure-prone. It crosses OS boundaries and involves command paths, arguments, environment, standard streams, exit codes, and timeouts.

| Task            | Concern                         | Better practice                  |
| --------------- | ------------------------------- | -------------------------------- |
| Run command     | Executable path and arguments   | Avoid shell string when possible |
| Capture output  | stdout/stderr size and encoding | Decode explicitly                |
| Check exit code | Success/failure classification  | Do not ignore non-zero exit      |
| Set environment | Controlled variables            | Avoid leaking secrets            |
| Timeout         | Hung process                    | Use timeout/cancellation         |
| Stream output   | Large output                    | Stream rather than load all      |
| Shell command   | Quoting/injection               | Prefer direct process APIs       |

Weak pattern:

```haskell id="smqiav"
system ("grep " <> pattern <> " " <> path)
```

This risks quoting and injection issues.

Stronger conceptual pattern:

```haskell id="0mu0k9"
runTool :: FilePath -> [Text] -> IO (Either ProcessError Text)
```

The command and arguments are separated; output is captured and decoded; exit status is represented.

**Common Pitfalls.** Treating subprocess calls as ordinary function calls is wrong. They can fail due to missing executables, permissions, bad arguments, non-zero exit, encoding errors, or timeouts. Model those failures explicitly at the boundary.

### Effect Libraries and Monad Transformers — transformers, mtl, ReaderT, ExceptT, StateT

The foundational transformer packages provide a way to combine effect-like structures: error, environment, state, optionality, and `IO`. The common practical pattern is not to use transformers everywhere, but to introduce them when nested types become awkward.

Without transformer:

```haskell id="xrl10t"
register :: RawUser -> IO (Either UserError UserId)
```

With `ExceptT`:

```haskell id="sam639"
register :: RawUser -> ExceptT UserError IO UserId
```

This can make sequential failing workflows cleaner:

```haskell id="jwvdpz"
register raw = do
  user <- hoistEither (validateUser raw)
  liftIO (saveUser user)
```

`ReaderT` is often used for shared environment:

```haskell id="wqgjhm"
type AppM = ReaderT AppEnv IO
```

Then:

```haskell id="t7rtdf"
loadCurrentUser :: UserId -> AppM (Maybe User)
```

| Tool                       | Meaning                      | Use                                       | Risk                         |
| -------------------------- | ---------------------------- | ----------------------------------------- | ---------------------------- |
| `ReaderT env m`            | Computation with environment | Config/dependencies                       | Giant environment            |
| `ExceptT e m`              | Computation that can fail    | Typed failure sequencing                  | Confusing exception vs error |
| `StateT s m`               | Computation with state       | Simulations, parsers, interpreters        | Hidden state transitions     |
| `MaybeT m`                 | Computation with absence     | Optional effectful lookup                 | Losing error detail          |
| `WriterT w m`              | Accumulated output           | Logs or annotations in pure-ish workflows | Space leaks and performance  |
| `mtl` style constraints    | Abstract over effect stack   | Reusable effectful functions              | Constraint-heavy APIs        |
| Concrete transformer stack | Specific monad stack         | Application code clarity                  | Less reusable                |

**Failure-first explanation.** The tempting but wrong mental model is that transformer stacks are the idiomatic default for serious Haskell. The surprising cost is harder error messages, unclear effect order, and accidental abstraction. The correct explanation is that transformers solve nested effect composition. The professional rule is: **write the simple type first; introduce `ExceptT`, `ReaderT`, or other transformers when they remove real nesting or clarify effect flow.**

### Standard Library and Ecosystem Decision Table — built-in versus ecosystem alternative

| Task             | Basic/core option         | Ecosystem/common option                    | Decision rule                                   |
| ---------------- | ------------------------- | ------------------------------------------ | ----------------------------------------------- |
| Basic pure code  | `Prelude`, `base` modules | Alternative preludes                       | Use standard first unless project style differs |
| Text             | `String` from `Prelude`   | `text`                                     | Use `Text` for real text                        |
| Bytes            | Lists of bytes            | `bytestring`                               | Use `ByteString` for binary/encoded data        |
| Keyed collection | Association list          | `containers` / `unordered-containers`      | Use `Map`/`HashMap` for lookup-heavy data       |
| Indexed sequence | List                      | `vector`                                   | Use vector for dense indexed data               |
| JSON             | Hand parser               | `aeson`                                    | Use JSON library, but design boundary           |
| Complex parsing  | `reads` / manual parsing  | `megaparsec`, `attoparsec`, `parsec`       | Use parser library for real grammar             |
| CLI              | `getArgs`                 | `optparse-applicative`                     | Use library once flags/subcommands grow         |
| Concurrency      | `forkIO`                  | `async`, STM                               | Prefer structured concurrency and STM           |
| Testing          | Simple `main` checks      | `tasty`, `hspec`, `QuickCheck`, `Hedgehog` | Use frameworks for project tests                |
| Resources        | Manual open/close         | `bracket`, `with...`, resource libraries   | Use scoped resource patterns                    |
| Effects          | Nested `IO (Either e a)`  | `ExceptT`, `ReaderT`, effect libraries     | Escalate when nesting hurts clarity             |
| Build            | Raw `ghc` command         | Cabal/Stack                                | Use project build tool for dependencies         |

### Library Area Maturity and Misuse Map — what to trust, what to inspect

| Library area                 | Role                         | Maturity tendency            | Common misuse                                        |
| ---------------------------- | ---------------------------- | ---------------------------- | ---------------------------------------------------- |
| `base`                       | Core language-adjacent APIs  | Foundational                 | Using partial historical functions carelessly        |
| `text` / `bytestring`        | Efficient text/bytes         | Core ecosystem               | Mixing text and bytes                                |
| `containers`                 | Maps/sets/sequences          | Core ecosystem               | Choosing list where map/set fits                     |
| `vector`                     | Dense arrays                 | Core ecosystem               | Using without considering strictness/boxing          |
| `aeson`                      | JSON                         | Very common                  | Generic deriving for stable public formats           |
| Parser libraries             | Structured parsing           | Mature alternatives          | Regex/manual parse for real grammar                  |
| `async`                      | Structured concurrency       | Common                       | Fire-and-forget without supervision                  |
| STM                          | Composable shared state      | Distinctive Haskell strength | Trying to perform arbitrary `IO` inside transactions |
| Transformers/mtl             | Effect composition           | Long-standing                | Over-abstracting application code                    |
| Testing libraries            | Test organization/properties | Mature alternatives          | Not testing laws and boundaries                      |
| Logging/config/web libraries | Ecosystem diverse            | Project-dependent            | Assuming one universal standard                      |

A package being common does not remove design responsibility. `aeson` can decode JSON, but it cannot decide whether decoded values satisfy domain rules. `async` can manage concurrent actions, but it cannot decide cancellation policy. `text` can represent Unicode text efficiently, but it cannot decide encoding boundaries for external bytes.

### Task-Pattern Reference — common programming jobs and library choices

| Practical task                 | Use first                   | Add when needed               | Common pitfall                                         |
| ------------------------------ | --------------------------- | ----------------------------- | ------------------------------------------------------ |
| Read small text config         | `Data.Text.IO.readFile`     | Exception handling, parser    | Treating contents as valid config                      |
| Read large file                | Streaming library           | Backpressure/resource control | Loading full file into memory                          |
| Parse command line             | `getArgs` for tiny tools    | `optparse-applicative`        | Hand-rolled parser grows brittle                       |
| Parse JSON API                 | `aeson` boundary type       | Validation to domain type     | Generic deriving public API blindly                    |
| Validate form/input            | `Either` or validation type | Error accumulation            | Reporting only first error when all needed             |
| Store unique tags              | `Set Text`                  | Hash set if appropriate       | List plus `nub`                                        |
| Lookup by ID                   | `Map UserId User`           | Hash map/database             | Association list for large data                        |
| Transform many effectful items | `traverse`                  | concurrency with care         | `mapM` without thinking about sequencing/resource load |
| Print/log many items           | `traverse_` / logger        | structured logging            | Building unused result lists                           |
| Run concurrent requests        | `async` patterns            | rate limits/resource pools    | Launching unbounded concurrency                        |
| Share mutable state            | STM                         | more explicit model if needed | Raw `IORef` races                                      |
| Build large text output        | Builder                     | streaming output              | Repeated `<>` in hot path                              |
| Debug type problem             | Typed hole, GHCi, HLS       | smaller signatures            | Guessing blindly                                       |
| Diagnose performance           | profiling/benchmarking      | Core inspection               | Adding strictness randomly                             |

### Ecosystem Transfer Map — avoiding habits from other languages

| Habit from other ecosystems           | Haskell adjustment                                         | Better model                            |
| ------------------------------------- | ---------------------------------------------------------- | --------------------------------------- |
| Use one universal string type         | Choose `Text`, `ByteString`, or `String` by representation | Text and bytes are different boundaries |
| Use arrays/lists for every collection | Choose list, `Map`, `Set`, `Vector`, `NonEmpty`            | Operations determine collection         |
| Parse with exceptions                 | Return `Maybe`, `Either`, parser result, or validation     | Parse failure is usually ordinary       |
| Log by printing anywhere              | Use `IO` logging or logger capability                      | Logging is an effect                    |
| Use objects for services              | Use records of functions, `ReaderT`, or modules            | Dependency is a boundary                |
| Spawn raw threads freely              | Use `async`/STM/structured patterns                        | Concurrency needs ownership             |
| Serialize by object reflection        | Use explicit encoders/decoders for public formats          | Serialization is compatibility contract |
| Trust decoded JSON                    | Validate into domain types                                 | Shape is not meaning                    |
| Optimize by intuition                 | Profile allocation/time/retention                          | Haskell cost model is specific          |
| Install latest everything globally    | Use project toolchain/dependency plan                      | Toolchain compatibility matters         |

### Common Ecosystem Anti-Patterns — library-specific sharp edges

| Anti-pattern                        | Why it fails                           | Better alternative                |
| ----------------------------------- | -------------------------------------- | --------------------------------- |
| Large production text as `String`   | Inefficient linked-list representation | `Text`                            |
| Arbitrary bytes as `Text`           | Encoding assumptions break             | `ByteString` plus explicit decode |
| Lists for lookup-heavy data         | Linear lookup                          | `Map`/`HashMap`                   |
| Lists for indexed dense data        | Linear indexing and partial `!!`       | `Vector`                          |
| `read` for user input               | Partial parse                          | `readMaybe` or parser             |
| Generic JSON as stable public API   | Internal changes break format          | DTO or explicit instances         |
| Lazy I/O as streaming architecture  | Subtle resource/memory behavior        | Streaming library                 |
| Raw `forkIO` without supervision    | Lost exceptions/leaked threads         | `async` or structured pattern     |
| `IORef` for shared concurrent state | Race risk                              | STM or synchronization            |
| Transformer stack by default        | Unnecessary complexity                 | Concrete type first               |
| `Show` for persistent format        | Not stable contract                    | Real serialization                |
| `Debug.Trace` in production logic   | Hidden effect in pure-looking code     | Logger or proper debugging        |
| Package imported because popular    | Dependency weight and abstraction cost | Need-driven dependency choice     |

### What to Memorize versus What to Look Up — ecosystem fluency

| Memorize early                                                        | Look up as needed                                |
| --------------------------------------------------------------------- | ------------------------------------------------ |
| `Maybe`, `Either`, `fmap`, `<$>`, `<*>`, `>>=`, `traverse`, `foldMap` | Exact specialized variants in specific libraries |
| Basic `Text`, `Map`, `Set`, `ByteString` distinction                  | Full APIs of each package                        |
| `withFile`/`bracket` resource pattern                                 | Detailed exception hierarchy                     |
| `IO (Either e a)` versus `ExceptT e IO a` meaning                     | Transformer combinator details                   |
| `map`, `filter`, `foldr`, `foldl'`, `traverse_`                       | Every `Data.List` function                       |
| `aeson` as JSON boundary tool                                         | Full generic deriving options                    |
| `async` versus raw `forkIO` distinction                               | Full async API                                   |
| STM as transactional shared state                                     | Detailed STM combinator set                      |
| Cabal package/component vocabulary                                    | Every Cabal field                                |
| GHCi `:type` and typed holes                                          | Advanced debugger/profiler commands              |

The right ecosystem habit is not memorizing every package. It is recognizing the task category quickly, choosing the right representation, and then reading the relevant type signatures.

### Practical Library Fluency Checklist — Part 6 review artifact

| Skill          | Check                                                                           |
| -------------- | ------------------------------------------------------------------------------- |
| Text and bytes | Can explain when to use `Text`, `String`, and `ByteString`                      |
| Collections    | Can choose between list, `NonEmpty`, `Map`, `Set`, and `Vector`                 |
| Parsing        | Can explain when `readMaybe`, parser combinators, or `aeson` fit                |
| JSON boundary  | Can separate JSON DTOs from validated domain types                              |
| Traversal      | Can use `traverse` and `traverse_` correctly                                    |
| Aggregation    | Can use `foldl'` for strict accumulation and `foldMap` for monoidal aggregation |
| Errors         | Can choose `Maybe`, `Either`, validation, or exception boundary                 |
| Resources      | Can use `with...`/`bracket` instead of manual cleanup                           |
| Concurrency    | Can explain why `async`/STM are usually safer than raw `forkIO`/shared `IORef`  |
| Testing        | Can combine example tests, property tests, and typeclass law tests              |
| Debugging      | Can use GHCi, typed holes, warnings, HLS, and profiling appropriately           |
| Tooling        | Can explain Cabal/Stack/GHCup/HLS roles without mixing them                     |
| Dependencies   | Can distinguish common package use from automatic dependency adoption           |

Haskell ecosystem fluency is mostly the ability to choose the right abstraction at the boundary: text versus bytes, list versus map, optional versus failing, parsed versus validated, pure versus `IO`, sequential versus concurrent, direct code versus generated code, and internal representation versus public format. Part 7 continues from that point into semantics, runtime, memory, concurrency, and implementation behavior—the level where these library choices acquire their real cost model.

## PART 7 — Semantics, Runtime, Memory, Concurrency, and Implementation Model

### Orientation — meaning first, execution second, GHC as implementation

Haskell must be understood at two levels at once. The **semantic level** explains what a program means: expressions, values, bindings, pattern matching, purity, laziness, and typed effects. The **implementation level** explains how a real Haskell program runs under GHC: thunks, closures, heap allocation, garbage collection, strictness analysis, optimization, stack, runtime system, lightweight threads, and foreign calls.

These levels should not be confused. The Haskell language semantics says that pure expressions are referentially transparent and non-strict. GHC’s runtime strategy explains how that semantics is implemented efficiently enough for real programs. This part follows the uploaded requirement to distinguish language semantics, implementation behavior, runtime behavior, compiler behavior, and ecosystem convention. 

| Question                      | Semantic answer                                                | GHC/runtime answer                                      | Common confusion                                       |
| ----------------------------- | -------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| What is a binding?            | A name associated with an expression/value                     | Often compiled into closures, thunks, or optimized code | Thinking it is a mutable variable                      |
| When is expression evaluated? | When demanded by non-strict semantics                          | Demand creates/evaluates thunks, with sharing           | Thinking all `let` bindings run immediately            |
| What is a function?           | Value mapping argument to result                               | Closure/code object with environment                    | Thinking function call is always stack-only            |
| What is `IO a`?               | Description of effectful computation producing `a`             | Runtime sequences real effects from `main`              | Thinking `IO` is ordinary impurity                     |
| What is a data constructor?   | Value constructor for ADT                                      | Heap object or optimized representation                 | Assuming every constructor always allocates            |
| What is pattern matching?     | Case analysis on value shape                                   | May force evaluation to constructor form                | Forgetting match can demand evaluation                 |
| What is recursion?            | Self-reference in definitions                                  | Runtime loop/calls/thunks depending on optimization     | Assuming all recursion is stack-safe                   |
| What is an exception?         | Non-local failure mechanism / bottom-like failure in pure code | Runtime exception object and unwinding                  | Treating all failures as `Either` or all as exceptions |
| What is laziness cost?        | Semantically delayed computation                               | Thunk allocation, update, retention, GC pressure        | Saying laziness is either free or always slow          |

The practical rule is: **reason semantically first to know what code means; reason operationally next to know what it costs.**

### Syntax versus Semantics — surface form, desugaring, meaning

Haskell surface syntax is often syntactic sugar over a smaller semantic core. Understanding desugaring helps prevent false intuitions.

| Surface syntax              | Desugared intuition                     | Meaning                                |
| --------------------------- | --------------------------------------- | -------------------------------------- |
| `f x y`                     | `(f x) y`                               | Curried application                    |
| `\x y -> body`              | `\x -> \y -> body`                      | Nested one-argument functions          |
| `do x <- a; b`              | `a >>= \x -> b`                         | Monadic sequencing                     |
| `do a; b`                   | `a >> b`                                | Sequence, discard first result         |
| `let x = a in b`            | Local binding                           | `x` available in `b`                   |
| `where`                     | Local declarations attached to equation | Helpers scoped to definition           |
| List literal `[a,b]`        | `a : b : []`                            | Linked list construction               |
| String literal `"abc"`      | Usually list of `Char`, or overloaded   | Depends on language extensions/context |
| Record update `r { f = x }` | Construct modified copy                 | Not mutation                           |
| Pattern equations           | Case analysis                           | Function defined by alternatives       |

For example:

```haskell
main :: IO ()
main = do
  line <- getLine
  putStrLn line
```

can be read as roughly:

```haskell
main :: IO ()
main =
  getLine >>= \line ->
  putStrLn line
```

This does not mean programmers should always write desugared code. The point is that `do` notation is not a separate imperative sublanguage. It is syntax for monadic composition.

Another example:

```haskell
incrementAll :: [Int] -> [Int]
incrementAll xs =
  map (+1) xs
```

The operator section `(+1)` means:

```haskell
\x -> x + 1
```

The list result is not necessarily fully evaluated immediately. It is a lazy list whose elements are computed as demanded.

**Failure-first explanation.** The tempting but wrong mental model is that Haskell syntax is a prettier version of imperative execution order. The surprising behavior is that expressions may not run when visually encountered, `do` notation depends on monadic meaning, and record update does not mutate. The correct semantic explanation is that syntax maps to expressions and compositional operations. The professional rule is: **when confused, desugar mentally: application, lambda, case, let, constructor, bind.** The boundary changes when GHC extensions introduce additional syntax, but the discipline remains useful.

### Expression Model — almost everything computes a value

Haskell is expression-oriented. An `if`, `case`, `let`, lambda, function application, list expression, tuple expression, and constructor application all produce values.

```haskell
label :: Int -> Text
label n =
  if n > 0
    then "positive"
    else "non-positive"
```

The whole `if` expression has type `Text`.

```haskell
message :: Maybe Text -> Text
message value =
  case value of
    Nothing ->
      "missing"

    Just txt ->
      txt
```

The whole `case` expression has type `Text`.

| Construct               |  Produces value? | Type requirement                        |
| ----------------------- | ---------------: | --------------------------------------- |
| `if c then a else b`    |              Yes | `c :: Bool`, branches same type         |
| `case x of ...`         |              Yes | All alternatives same result type       |
| `let x = a in b`        |              Yes | Type of whole expression is type of `b` |
| Lambda                  |              Yes | Function value                          |
| Function application    |              Yes | Result type of function                 |
| Constructor application |              Yes | Value of ADT                            |
| `do` block              |              Yes | Value in monadic/applicative context    |
| Top-level declaration   | Introduces value | Not itself an expression in same way    |

This expression orientation interacts with purity. Since expressions compute values rather than mutate hidden state, the same expression can often be replaced by its value without changing meaning, assuming no bottom/undefined behavior is involved.

Example:

```haskell
x = 2 + 3
y = x * x
```

Semantically, `x` can be replaced by `5` in `y`.

```haskell
y = 5 * 5
```

This substitution principle is one face of referential transparency.

**Common Pitfalls.** Beginners sometimes search for statement equivalents: “How do I write an if statement without else?” There is no ordinary `if` statement. If a branch is performing effects, the branch expressions can have type `IO ()`:

```haskell
whenAdult :: Int -> IO ()
whenAdult age =
  if age >= 18
    then putStrLn "adult"
    else pure ()
```

The `else` branch still exists; it is the no-op action `pure ()`.

### Binding and Scope Semantics — names, recursion, sharing, shadowing

A binding associates a name with an expression. It does not allocate a mutable variable cell in the ordinary imperative sense.

```haskell
x :: Int
x = 1 + 2
```

Semantically, `x` names the expression/value `1 + 2`. Operationally, GHC may compile it in many ways: inline it, allocate a thunk, compute it once, or optimize it away.

Local bindings:

```haskell
totalWithTax :: Int -> Int
totalWithTax subtotal =
  let tax = subtotal `div` 10
  in subtotal + tax
```

`tax` is in scope only in the expression after `in`.

`where` bindings:

```haskell
totalWithTax :: Int -> Int
totalWithTax subtotal =
  subtotal + tax
  where
    tax = subtotal `div` 10
```

Here `tax` is scoped over the equation.

Haskell bindings in a group can be recursive:

```haskell
even' :: Int -> Bool
even' 0 = True
even' n = odd' (n - 1)

odd' :: Int -> Bool
odd' 0 = False
odd' n = even' (n - 1)
```

This is semantic recursion, not forward declaration in the C sense.

| Binding property   | Meaning                                           | Practical consequence                      |
| ------------------ | ------------------------------------------------- | ------------------------------------------ |
| Immutable          | Name does not later change                        | Reasoning by substitution becomes possible |
| Lexically scoped   | Source structure determines visibility            | No dynamic-scope surprises                 |
| Often recursive    | Definitions in same group may refer to each other | Useful but can create infinite definitions |
| Potentially shared | Same binding may be evaluated once and reused     | Avoids recomputation but may retain memory |
| Shadowable         | Inner name can hide outer name                    | Useful locally, harmful if overused        |

Example of sharing:

```haskell
expensiveTwice :: Input -> Result
expensiveTwice input =
  let parsed = expensiveParse input
  in combine parsed parsed
```

Semantically, both uses refer to the same binding. Operationally, with laziness and sharing, `parsed` can be computed once when demanded and reused. This is different from textual macro substitution that recomputes each occurrence.

**Failure-first explanation.** The tempting but wrong mental model is that `let parsed = expensiveParse input` immediately computes `parsed`. The surprising behavior is that `parsed` may not be evaluated until `combine` demands it. The correct semantic explanation is that binding does not force evaluation. The professional rule is: **binding names an expression; demand evaluates it.** The boundary changes when strictness annotations, strict fields, or compiler analysis force earlier evaluation.

### Referential Transparency and Equational Reasoning — substitution, purity, limits

Referential transparency means an expression can be replaced by its value without changing program meaning, ignoring operational concerns such as performance and bottom timing.

Example:

```haskell
square :: Int -> Int
square x = x * x

result :: Int
result = square (2 + 3)
```

Since `2 + 3` means `5`, and `square 5` means `25`, the expression can be reasoned about algebraically.

This supports refactoring:

```haskell
clean :: Text -> Text
clean input =
  T.toLower (T.strip input)
```

can become:

```haskell
clean :: Text -> Text
clean =
  T.toLower . T.strip
```

The meaning is the same.

| Reasoning move                        | Example                       | Why it works                             |
| ------------------------------------- | ----------------------------- | ---------------------------------------- |
| Inline definition                     | Replace `square x` by `x * x` | Pure function body                       |
| Extract binding                       | `let y = f x in g y`          | Name expression without changing meaning |
| Compose functions                     | `f (g x)` to `(f . g) x`      | Function composition law                 |
| Reorder independent pure calculations | `let a = f x; b = g y`        | No hidden effects                        |
| Test pure logic directly              | `validate input == expected`  | No external dependency                   |

But there are limits.

```haskell
bad :: Int
bad = undefined
```

The expression has type `Int`, but evaluating it fails. Nontermination is also possible:

```haskell
loop :: a
loop = loop
```

`seq` and strictness can also reveal evaluation differences that are invisible under naive equational reasoning.

**Interdisciplinary Lens: Denotational Semantics**

What it clarifies: pure Haskell expressions can be understood by their meaning rather than by step-by-step mutation history.

Language feature involved: pure functions, bindings, substitution, composition, laziness.

Practical consequence: refactoring pure code is unusually safe, and tests can target pure functions directly.

Limit of the lens: denotational equality does not automatically preserve performance, memory usage, exception timing, or strictness behavior.

**Common Pitfalls.** A common overstatement is “Haskell code can always be reasoned about like mathematics.” More precisely, pure total fragments support strong equational reasoning. Real Haskell also has bottom, partial functions, exceptions, `seq`, unsafe operations, and performance effects. Use equational reasoning, but know where it stops.

### Non-Strict Semantics and Lazy Evaluation — demand, thunks, infinite data

Haskell is non-strict: a function can return a result without evaluating all of its arguments.

```haskell
constOne :: a -> Int
constOne _ = 1

result :: Int
result = constOne undefined
```

This evaluates to `1` because the argument is never demanded.

This enables infinite data:

```haskell
naturals :: [Integer]
naturals = [0..]

firstTen :: [Integer]
firstTen = take 10 naturals
```

Only the first ten values are demanded.

Operationally, laziness is commonly implemented through thunks: suspended computations that are evaluated when needed and then often updated with the result for sharing.

| Semantic idea                | Operational intuition            | Practical consequence                    |
| ---------------------------- | -------------------------------- | ---------------------------------------- |
| Argument not needed          | Do not evaluate it               | Can avoid unnecessary work               |
| Infinite structure           | Produce as demanded              | Useful with finite consumers             |
| Shared binding               | Evaluate once when demanded      | Avoids recomputation                     |
| Suspended expression         | Thunk                            | Can allocate and retain memory           |
| Pattern match on constructor | Demand enough to see shape       | Pattern matching can force evaluation    |
| Strict function/operator     | Demands argument to needed depth | Arithmetic usually forces numeric values |

Example:

```haskell
take 3 (map (*2) [1..])
```

The infinite list is not fully generated. Demand flows from `take 3`, which asks for three elements.

But laziness can create space leaks:

```haskell
sumBad :: [Int] -> Int
sumBad =
  foldl (+) 0
```

This may build a large chain of unevaluated additions. A stricter fold is usually better for large numeric sums:

```haskell
sumGood :: [Int] -> Int
sumGood =
  foldl' (+) 0
```

**Failure-first explanation.** The tempting but wrong mental model is that laziness means Haskell “does less work and is therefore faster.” The surprising behavior is that laziness can allocate thunks and retain memory, causing space leaks. The correct explanation is that laziness delays work; delayed work has representation and retention cost. The professional rule is: **use laziness for modularity and finite consumption of large/infinite structures, but profile strict accumulations and long-lived data.** The boundary changes when GHC’s strictness analysis, fusion, or explicit strictness removes laziness operationally.

### WHNF, NF, and Forcing — how much evaluation happened?

Evaluation in Haskell has depth. A value can be evaluated enough to reveal its outer constructor without fully evaluating its contents. This is called **weak head normal form**.

Examples:

```haskell
Just (1 + 2)
```

In WHNF, this is known to be `Just ...`, but the inner `1 + 2` may remain unevaluated.

```haskell
(1 + 2, expensiveComputation)
```

In WHNF, this is known to be a pair, but the fields may remain unevaluated.

A list in WHNF is either `[]` or `(:) head tail`; the head and tail may themselves be unevaluated.

| Evaluation level | Meaning                               | Example                                    |
| ---------------- | ------------------------------------- | ------------------------------------------ |
| Unevaluated      | Suspended computation                 | thunk for `1 + 2`                          |
| WHNF             | Outer constructor/function form known | `Just thunk`, `(thunk1, thunk2)`, `x:xs`   |
| NF               | Fully evaluated normal form           | `Just 3`, fully evaluated finite structure |
| Bottom           | Fails or diverges when evaluated      | `undefined`, infinite loop                 |

`seq` forces its first argument to WHNF:

```haskell
seq x y
```

If `x` evaluates to WHNF, result is `y`. If `x` is bottom, the whole expression fails.

Bang patterns can force evaluation to WHNF at binding/pattern points when the extension is enabled:

```haskell
{-# LANGUAGE BangPatterns #-}

sumStrict :: [Int] -> Int
sumStrict =
  go 0
  where
    go !acc []       = acc
    go !acc (x : xs) = go (acc + x) xs
```

Deep evaluation requires additional machinery, commonly through `NFData` and `deepseq`.

| Tool          | Forces to                     | Use                                      |
| ------------- | ----------------------------- | ---------------------------------------- |
| Pattern match | Enough to match constructor   | Branching                                |
| `seq`         | WHNF                          | Basic strictness control                 |
| Bang pattern  | WHNF                          | Strict function arguments/local bindings |
| Strict field  | Usually WHNF when constructed | Avoid field thunks                       |
| `deepseq`     | NF, given `NFData`            | Fully evaluate finite structures         |
| `evaluate`    | Forces in `IO` to WHNF        | Control exception timing                 |
| `force`       | NF before returning value     | Benchmarking / resource boundaries       |

**Failure-first explanation.** The tempting but wrong mental model is that evaluating a value means evaluating all of it. The surprising behavior is that evaluating `Just expensive` may only reveal `Just`, not force `expensive`. The correct explanation is that Haskell evaluation has levels. The professional rule is: **know whether code needs WHNF or full normal form; use `seq`/bangs for shallow strictness and `deepseq`-style tools when full evaluation matters.** The boundary changes for primitive unboxed values and compiler-optimized code, but the conceptual distinction remains important.

### Pattern Matching Semantics — demand to constructor form, order, failure

Pattern matching does two things: it checks shape and binds names. To check shape, it may demand evaluation to the outer constructor.

```haskell
isJust :: Maybe a -> Bool
isJust value =
  case value of
    Just _  -> True
    Nothing -> False
```

To decide which branch applies, Haskell must evaluate `value` enough to see whether it is `Just` or `Nothing`.

List match:

```haskell
isEmpty :: [a] -> Bool
isEmpty xs =
  case xs of
    []    -> True
    _ : _ -> False
```

This evaluates the list only enough to see whether it is empty or cons. It does not evaluate every element.

Pattern order matters:

```haskell
describe :: [a] -> Text
describe []      = "empty"
describe [_]     = "one"
describe (_:_:_) = "many"
```

More general patterns should usually come later.

| Pattern kind         | Evaluation required                 | Risk                                           |
| -------------------- | ----------------------------------- | ---------------------------------------------- |
| Wildcard `_`         | None beyond surrounding match       | Can hide cases                                 |
| Variable `x`         | None beyond surrounding match       | Catches anything                               |
| Constructor `Just x` | Force to outer constructor          | Can fail if different constructor              |
| Tuple `(x, y)`       | Force to pair constructor           | Fields not fully evaluated                     |
| List `x:xs`          | Force to cons                       | Fails on empty list                            |
| Literal `0`          | Compare value                       | Requires evaluation and equality-like behavior |
| Nested `Just (x:xs)` | Force nested constructors as needed | Partial if not exhaustive                      |

Irrefutable/lazy patterns delay match failure:

```haskell
lazyPair :: (a, b) -> a
lazyPair ~(x, y) = x
```

Lazy patterns are advanced and should be used carefully.

Non-exhaustive patterns can fail at runtime:

```haskell
fromJustBad :: Maybe a -> a
fromJustBad (Just x) = x
```

Calling `fromJustBad Nothing` causes a pattern-match failure.

**Common Pitfalls.** A common misunderstanding is that pattern matching fully evaluates values. It usually evaluates only enough to distinguish constructors. Another mistake is writing partial function definitions and assuming the type system prevents failure. Enable warnings and treat non-exhaustive patterns as serious unless the impossible case is encoded elsewhere.

### Recursion, Tail Calls, and Core Loops — semantic recursion, operational stack and allocation

Haskell uses recursion for repetition. Semantically, recursive definitions define values in terms of themselves. Operationally, performance depends on strictness, allocation, tail-call optimization, worker/wrapper transformations, and compiler optimization.

Simple recursion:

```haskell
length' :: [a] -> Int
length' []       = 0
length' (_ : xs) = 1 + length' xs
```

This is structurally clear, but it builds a chain of additions conceptually. GHC may optimize, but a strict accumulator is often more predictable:

```haskell
lengthStrict :: [a] -> Int
lengthStrict =
  go 0
  where
    go !acc []       = acc
    go !acc (_ : xs) = go (acc + 1) xs
```

A recursive function over a tree:

```haskell
depth :: Tree a -> Int
depth tree =
  case tree of
    Leaf _ ->
      1

    Branch left right ->
      1 + max (depth left) (depth right)
```

This is not tail-recursive because it must compute both branches and then combine. For trees, tail recursion is not always the natural or best model.

| Recursion style            | Use                              | Operational concern                           |
| -------------------------- | -------------------------------- | --------------------------------------------- |
| Structural recursion       | ADTs, lists, trees               | Clear but may allocate depending on result    |
| Tail-recursive accumulator | Strict aggregation               | Must force accumulator to avoid thunk buildup |
| Corecursion                | Produce lazy/infinite structures | Consumer must demand finitely/productively    |
| Mutual recursion           | State machines, parity, grammars | Must ensure termination/productivity          |
| Higher-order recursion     | Folds/traversals                 | Strictness depends on fold                    |
| Monadic recursion          | Effectful loops                  | Resource/cancellation behavior                |

`forever`, `replicateM_`, `forM_`, and recursion in `do` are common for effectful loops:

```haskell
serveForever :: IO ()
serveForever =
  forever handleOneRequest
```

This repeats an action indefinitely. Operationally, long-running loops must consider resource cleanup, exceptions, and memory retention.

**Failure-first explanation.** The tempting but wrong mental model from strict languages is that tail recursion alone guarantees efficient loops. The surprising Haskell-specific issue is that a tail-recursive accumulator can still build thunks if the accumulator is lazy. The correct explanation is that tail position and strictness are different concerns. The professional rule is: **for large strict accumulations, use `foldl'` or strict accumulator patterns; for structural data, prefer clarity first and profile if needed.**

### Exception Semantics — bottom, pure exceptions, IO exceptions, asynchronous exceptions

Haskell has several failure forms that can look similar from far away but behave differently.

| Failure form           | Example                         | Where it appears       | Handling model                         |
| ---------------------- | ------------------------------- | ---------------------- | -------------------------------------- |
| Bottom / undefined     | `undefined`, infinite loop      | Any type syntactically | Avoid or isolate                       |
| Pure exception         | `error "bad"`                   | Pure-looking code      | Thrown when evaluated                  |
| Pattern-match failure  | Non-exhaustive pattern          | Pure or effectful code | Runtime exception when branch demanded |
| `IO` exception         | File missing, permission denied | Effectful code         | `try`, `catch`, `bracket`              |
| Asynchronous exception | Thread cancellation, timeout    | Concurrent runtime     | Exception-safe cleanup                 |
| Typed error value      | `Left err`                      | Explicit return type   | Ordinary pattern matching              |

A pure exception can be hidden until demanded:

```haskell
badValue :: Int
badValue = error "bad"

safeLooking :: Int
safeLooking = 1
```

A program that never demands `badValue` may run without failure.

```haskell
constOne :: Int -> Int
constOne _ = 1

result :: Int
result = constOne badValue
```

`result` is `1` because the argument is not demanded.

But this fails:

```haskell
result :: Int
result = badValue + 1
```

Arithmetic demands the integer.

In `IO`, exception timing is often controlled with `evaluate`:

```haskell
forceInIO :: Int -> IO Int
forceInIO x =
  evaluate x
```

This forces `x` to WHNF in `IO`, allowing exceptions to be caught at a predictable boundary.

**Common Pitfalls.** A frequent misconception is that pure code cannot throw exceptions. More precisely, pure expressions can contain bottom-like failures that arise when evaluated. Another misconception is that `Either` replaces all exceptions. Operational failures and asynchronous exceptions still matter, especially for resources and concurrency.

### IO Semantics — description, sequencing, main, real-world effects

`IO a` represents an effectful computation that may produce an `a`.

```haskell
main :: IO ()
main =
  putStrLn "Hello"
```

The runtime starts with `main`. Pure functions do not execute effects unless their results are used to build `IO` actions that are sequenced from `main`.

```haskell
greeting :: Text -> Text
greeting name =
  "Hello, " <> name

main :: IO ()
main = do
  name <- getLine
  putStrLn (T.unpack (greeting (T.pack name)))
```

The function `greeting` remains pure. The reading and printing occur in `IO`.

`IO` sequencing with `do`:

```haskell
action :: IO ()
action = do
  putStrLn "first"
  putStrLn "second"
```

The sequencing is semantic for `IO`: the first action happens before the second.

`pure` embeds a value in `IO` without performing an external effect:

```haskell
pure 3 :: IO Int
```

This constructs an action that returns `3`.

| Type              | Meaning                                                     |
| ----------------- | ----------------------------------------------------------- |
| `a`               | Pure value                                                  |
| `IO a`            | Effectful computation producing `a`                         |
| `a -> IO b`       | Pure function that builds effectful computation from input  |
| `IO (Either e a)` | Effectful computation that may produce typed domain failure |
| `ExceptT e IO a`  | Transformer form for sequencing typed failure over `IO`     |

**Failure-first explanation.** The tempting but wrong mental model is that `IO` is a container holding a value. The surprising behavior is that `IO a` does not contain an already available `a`; it describes a computation that can produce one when executed. The correct explanation is that `IO` values are sequenced by the runtime from `main` and by composition inside other `IO` actions. The professional rule is: **do not try to extract `a` from `IO a` in pure code; instead, move the dependent computation into `IO` or refactor the pure/effect boundary.**

### Evaluation Order versus Effect Order — pure demand, IO sequencing, strictness

In pure code, evaluation order is mostly not specified in the same operational way as strict imperative languages. The compiler has freedom as long as it preserves semantics. In `IO`, effect order is specified by sequencing.

Pure example:

```haskell
pureCalc :: Int
pureCalc =
  f x + g y
```

The source does not guarantee that `f x` is evaluated before `g y`, unless demand and dependencies force that. Since both are pure, this should not affect meaning.

Effectful example:

```haskell
main :: IO ()
main = do
  putStrLn "first"
  putStrLn "second"
```

Here the effect order is part of the `IO` program.

A subtle case:

```haskell
main :: IO ()
main = do
  let x = expensivePureComputation
  putStrLn "before"
  print x
```

The binding `x` may not be evaluated at the `let`. It is demanded when `print x` needs it. Therefore “before” may be printed before the expensive computation runs.

To force before printing:

```haskell
main :: IO ()
main = do
  let x = expensivePureComputation
  x' <- evaluate x
  putStrLn "before"
  print x'
```

This forces `x` to WHNF before the first `putStrLn`.

| Situation                    | Order guarantee                                                     |
| ---------------------------- | ------------------------------------------------------------------- |
| Pure independent expressions | Compiler/demand-driven; no observable effect should depend on order |
| Pattern match                | Demands enough to choose branch                                     |
| Arithmetic                   | Demands numeric operands                                            |
| `seq` / bang                 | Forces to WHNF                                                      |
| `deepseq`                    | Forces to NF when available                                         |
| `IO` `do` block              | Effects sequenced in order                                          |
| Lazy I/O                     | File demand may occur later than source suggests                    |
| Asynchronous exception       | Can interrupt at certain runtime points                             |

**Common Pitfalls.** A common debugging mistake is assuming a `let` inside `do` executes at that source line. It does not necessarily evaluate. Another mistake is using `trace` to infer normal evaluation order without understanding that trace output itself is tied to demand. The professional rule is: **separate effect order from pure evaluation order; use explicit forcing when timing matters.**

### Data Representation Semantics — constructors, records, newtype, strict fields

At the semantic level, ADTs define values. At the implementation level, constructors are represented by runtime objects unless optimized away. GHC may unbox, inline, specialize, or eliminate allocations, but source-level reasoning should not assume every constructor is a heap allocation or no constructor is.

Ordinary data:

```haskell
data Pair = Pair Int Int
```

A value `Pair a b` semantically contains two `Int` fields. Operationally, the fields may be boxed or unboxed depending on strictness, optimization, and representation choices.

`newtype`:

```haskell
newtype UserId = UserId Int
```

Semantically, `UserId` is distinct from `Int`. Operationally, `newtype` has no extra runtime wrapper in the usual compiled representation. This is why `newtype` is valuable for domain safety.

Record:

```haskell
data User = User
  { userName :: Text
  , userAge  :: Int
  }
```

Record fields are not mutable slots. Field accessors are functions:

```haskell
userName :: User -> Text
```

Strict field:

```haskell
data User = User
  { userName :: !Text
  , userAge  :: !Int
  }
```

The `!` asks for fields to be evaluated to WHNF when the constructor is built. This can reduce thunk buildup in long-lived data.

| Source construct | Semantic meaning            | Operational concern                              |
| ---------------- | --------------------------- | ------------------------------------------------ |
| `data`           | New ADT with constructors   | May allocate heap objects                        |
| Record field     | Named component/accessor    | Accessor is function; update copies semantically |
| Record update    | Modified copy               | May allocate new record                          |
| `newtype`        | Distinct type, single field | Usually zero wrapper at runtime                  |
| Strict field     | Field evaluated to WHNF     | Can avoid thunks; may force too early            |
| Unpacked field   | Representation optimization | More implementation-specific                     |
| Lazy field       | Default non-strict field    | Flexible but may retain thunks                   |

**Failure-first explanation.** The tempting but wrong mental model is that record update mutates a field in place. The surprising behavior is that it creates a new value. The correct semantic explanation is that Haskell data is immutable by default. The professional rule is: **treat records as immutable values; use explicit mutable references only when mutation is the intended model.** The boundary changes under compiler optimization, but source-level mutation is still absent.

### Laziness and Space Leaks — retention, thunks, accumulators, closures

A space leak occurs when a program retains more memory than expected, often because unevaluated thunks or references keep large structures alive.

Classic lazy accumulator:

```haskell
sumBad :: [Int] -> Int
sumBad =
  foldl (+) 0
```

This can build a chain:

```text
(((0 + x1) + x2) + x3) ...
```

The chain may be evaluated only at the end, retaining memory.

Strict version:

```haskell
sumGood :: [Int] -> Int
sumGood =
  foldl' (+) 0
```

Another space leak pattern is retaining a large structure through a closure:

```haskell
makeLookup :: BigTable -> Key -> Maybe Value
makeLookup table =
  \key -> lookup key table
```

This intentionally retains `table`. That is fine if needed, but accidental closures can keep more memory alive than expected.

| Leak source               | Pattern                             | Fix direction                                            |
| ------------------------- | ----------------------------------- | -------------------------------------------------------- |
| Lazy accumulator          | `foldl` over large list             | `foldl'`, strict accumulator                             |
| Lazy record fields        | Long-lived records contain thunks   | Strict fields, force on construction                     |
| Closure retention         | Function captures large environment | Narrow captured values                                   |
| Lazy I/O                  | File contents demanded later        | Strict I/O or streaming                                  |
| Large intermediate lists  | `map`/`filter` pipeline not fused   | Use fusion-friendly code, streaming, or better structure |
| Unevaluated error/context | Error value holds large input       | Store smaller diagnostic                                 |
| Writer-like accumulation  | Lazy logs/outputs                   | Strict writer alternatives or builders                   |

**Common Pitfalls.** A common mistake is adding bang patterns randomly. Strictness can improve memory use, but it can also force unnecessary work or destroy useful laziness. The professional workflow is: reproduce the issue, profile heap/allocation, identify retention, then add strictness or change representation deliberately.

### Cost Model Preview — allocation, sharing, boxing, laziness

A complete Haskell cost model is difficult, but several high-frequency costs appear repeatedly.

| Operation or pattern      | Usual cost                          | Hidden cost                              | How to detect               |
| ------------------------- | ----------------------------------- | ---------------------------------------- | --------------------------- |
| Binding a pure expression | No immediate evaluation necessarily | Thunk allocation if shared/delayed       | Profiling / Core inspection |
| Function closure          | Captures environment                | Retains captured values                  | Heap profiling              |
| List construction         | One cons cell per element           | Pointer-heavy representation             | Allocation profiling        |
| List append `xs ++ ys`    | Traverses left list                 | Repeated left append quadratic           | Benchmark/allocation        |
| `Text` append             | Depends on representation           | Repeated append may allocate             | Benchmark; use builder      |
| `Map` lookup              | Logarithmic for ordered map         | Key comparison cost                      | Benchmark                   |
| `HashMap` lookup          | Expected hash-based                 | Hashing and collision behavior           | Benchmark                   |
| `Vector` indexing         | Efficient                           | Bounds checks/boxing depending type      | Benchmark                   |
| `newtype`                 | Usually no wrapper overhead         | Deriving/coercion semantics matter       | Core if necessary           |
| Typeclass call            | Dictionary passing, often optimized | Dynamic-like overhead if not specialized | Core/profiling              |
| Lazy fold                 | May build thunks                    | Space leak                               | Heap profile                |
| `IO` action               | Sequenced effect                    | Exceptions/resource timing               | Runtime tests/logging       |
| Thread creation           | Lightweight but not free            | Scheduling/memory overhead               | Eventlog/profiling          |

The important principle is that Haskell’s high-level abstractions are often optimizable, but not automatically free. “Zero-cost abstraction” should not be used casually. Some abstractions optimize away; others allocate, retain, or block specialization.

**Common Pitfalls.** The two opposite mistakes are both common: assuming Haskell is slow because it is high-level, and assuming Haskell is fast because GHC optimizes. Professional Haskell performance is empirical: choose good representations, write clear code, benchmark important paths, profile real workloads, then tune.
### Stack, Heap, Closures, and Thunks — operational model without pretending it is the language

At the language level, Haskell programs are expressions, bindings, functions, constructors, and effects. At the implementation level, GHC must represent those things in memory and execute them. The main operational entities are **closures**, **thunks**, **stack frames**, **heap objects**, and **evaluated constructor values**. This is implementation-level reasoning, not the Haskell Report’s surface semantics, but it is essential for performance and debugging. Part 7 is required to connect earlier syntax, types, effects, and library choices to runtime behavior rather than treating them as purely abstract features. 

A **closure** is a runtime object containing code plus any environment it needs. A function that captures a local variable may become a closure.

```haskell
makeThreshold :: Int -> (Int -> Bool)
makeThreshold limit =
  \x -> x > limit
```

The returned function captures `limit`. Operationally, that captured value must remain available as long as the function can be called.

A **thunk** is a suspended computation.

```haskell
let total = expensiveComputation input
in use total
```

The binding `total` may be represented as a thunk until demanded. If demanded once and shared, the thunk may be updated with the computed result, so later uses do not recompute it.

| Runtime entity     | Informal meaning                  | Source-level origin                                 | Cost concern                                                    |
| ------------------ | --------------------------------- | --------------------------------------------------- | --------------------------------------------------------------- |
| Closure            | Code plus captured environment    | Lambdas, partial application, local functions       | Captures may retain large data                                  |
| Thunk              | Suspended computation             | Lazy binding, unevaluated field, delayed expression | Allocation, update, memory retention                            |
| Constructor object | Evaluated ADT value               | `Just x`, `User name age`, list cons                | Heap allocation unless optimized                                |
| Stack frame        | Control/evaluation context        | Function calls, case continuations                  | Stack overflow is possible but less central than heap retention |
| Heap object        | Allocated runtime value           | Lists, records, closures, thunks                    | GC pressure                                                     |
| Indirection/update | Pointer to evaluated thunk result | Sharing after evaluation                            | Saves recomputation but has overhead                            |

A closure-retention bug can be subtle:

```haskell
makeChecker :: BigConfig -> User -> Bool
makeChecker config =
  \user -> userAllowedBy config user
```

This is correct if the checker genuinely needs the whole `BigConfig`. But if it only needs one small field, the closure may retain far more memory than necessary.

Better:

```haskell
makeChecker :: BigConfig -> User -> Bool
makeChecker config =
  let allowedRoles = configAllowedRoles config
  in \user -> userHasAnyRole allowedRoles user
```

Now the closure can retain the smaller value, assuming no other references keep the whole config alive.

**Common Pitfalls.** A common mistake is to reason as if local bindings have zero runtime presence. In optimized code they may disappear, but in unoptimized or insufficiently optimized code they may allocate thunks or closures. Another mistake is to blame garbage collection before checking whether the program is retaining large structures through closures, lazy fields, or long-lived thunks.

### Garbage Collection and Allocation — managed memory, allocation-heavy style, retention

Haskell uses managed memory. Ordinary Haskell code does not manually allocate and free heap objects. Instead, the runtime system allocates many small objects and uses garbage collection to reclaim unreachable ones. This makes ordinary memory safety much easier than in manual-memory languages, but it also makes allocation behavior central to performance.

Functional code often allocates frequently: lists, tuples, records, closures, intermediate values, and thunks. GHC can eliminate many allocations through optimization, but not all.

```haskell
totalLength :: [Text] -> Int
totalLength =
  sum . map T.length
```

This is semantically clear. Operationally, depending on optimization and fusion, it may or may not allocate an intermediate list of lengths. A stricter fold can be more predictable:

```haskell
totalLength :: [Text] -> Int
totalLength =
  foldl' (\acc txt -> acc + T.length txt) 0
```

| Allocation source      | Example                        | Hidden cost                                        | Usual response                                         |
| ---------------------- | ------------------------------ | -------------------------------------------------- | ------------------------------------------------------ |
| Lists                  | `map f xs`, `filter p xs`      | Cons cells, intermediate lists                     | Fusion, folds, streaming, vectors                      |
| Tuples                 | Returning multiple values      | Heap allocation if not optimized                   | Strictness/worker-wrapper may help                     |
| Records                | Immutable updates              | New record allocation                              | Use good representation; avoid needless updates        |
| Closures               | Partially applied functions    | Captured environment                               | Avoid accidental large captures                        |
| Thunks                 | Lazy bindings                  | Suspended computation and retention                | Strict fields, bang patterns, `foldl'`                 |
| Typeclass dictionaries | Polymorphic constraints        | Dictionary passing, possible missed specialization | Specialization, concrete types in hot paths            |
| Boxing                 | Numeric values as heap objects | Pointer indirection and allocation                 | Unboxed/vector/specialized numeric code when justified |
| Lazy I/O chunks        | Deferred file data             | Handles and buffers retained                       | Strict I/O or streaming                                |

Garbage collection cost depends not only on how much memory is allocated, but also on how much remains live. Short-lived allocation can be cheap. Long-lived retained thunks and large reachable structures are more problematic.

**Failure-first explanation.** The tempting but wrong mental model is that allocation is automatically bad. The surprising reality is that Haskell programs often allocate heavily, and short-lived allocation may be handled efficiently. The correct explanation is that **retention** is often worse than allocation. A program that allocates many small short-lived values may be fine; a program that accidentally retains a huge input through a closure may leak memory. The professional rule is: **profile allocation and residency separately; do not optimize allocation blindly without knowing what stays live.**

### Strictness, Bang Patterns, Strict Fields, and seq — controlling demand carefully

Haskell is lazy by default, but GHC Haskell provides several ways to request stricter evaluation.

```haskell
{-# LANGUAGE BangPatterns #-}
```

Bang pattern:

```haskell
sumStrict :: [Int] -> Int
sumStrict =
  go 0
  where
    go !acc []       = acc
    go !acc (x : xs) = go (acc + x) xs
```

Strict field:

```haskell
data User = User
  { userName :: !Text
  , userAge  :: !Int
  }
```

`seq`:

```haskell
forceFirst :: a -> b -> b
forceFirst x y =
  x `seq` y
```

`seq` forces `x` to weak head normal form, not full normal form.

| Strictness tool        | Forces to            | Best use                                  | Risk                                           |
| ---------------------- | -------------------- | ----------------------------------------- | ---------------------------------------------- |
| Bang pattern           | WHNF                 | Strict accumulators, arguments            | Forces too early if used blindly               |
| Strict field           | WHNF at construction | Long-lived records, counters, parsed data | Does not deeply force nested structure         |
| `seq`                  | WHNF                 | Low-level strictness control              | Easy to misunderstand                          |
| `deepseq`              | NF, given `NFData`   | Fully force finite structures             | Can be expensive or nonterminating             |
| `evaluate`             | WHNF inside `IO`     | Control exception/evaluation timing       | Only shallow unless combined with deep forcing |
| `foldl'`               | Strict accumulator   | Large strict folds                        | Not for lazy short-circuit patterns            |
| Strict data structures | Varies               | Predictable memory                        | Can lose useful laziness                       |

Strictness can improve memory use:

```haskell
data Stats = Stats
  { statCount :: !Int
  , statTotal :: !Int
  }
```

If many `Stats` values are accumulated, strict fields prevent a buildup of unevaluated arithmetic thunks.

But strictness can also hurt:

```haskell
firstResult :: [Result] -> Maybe Result
firstResult =
  find isSuccessful
```

This benefits from laziness because it can stop early. Forcing the whole list would be wasteful.

**Common Pitfalls.** The main mistake is treating strictness as a universal optimization. It is a tool for controlling demand. Use it where laziness creates retained thunks or unpredictable resource behavior. Avoid it where laziness enables early termination, modular generation, or infinite structures.

### Boxing, Unboxing, and Representation — values, pointers, numeric performance

Haskell source types are semantic. Runtime representations may involve boxed heap objects or unboxed machine values. Most ordinary Haskell values are represented indirectly through pointers to heap objects, but GHC can optimize many cases.

A boxed `Int` is a heap-level value with runtime representation. An unboxed integer-like value is closer to a raw machine value. Source-level programmers usually do not write unboxed code unless optimizing low-level libraries, numeric kernels, or performance-critical data structures.

| Representation issue   | Source-level symptom     | Performance concern                  | Usual response                 |
| ---------------------- | ------------------------ | ------------------------------------ | ------------------------------ |
| Boxed numeric values   | Polymorphic numeric code | Allocation and indirection           | Specialize, use concrete types |
| List of numbers        | `[Int]`                  | Pointer-heavy linked structure       | `Vector`, unboxed vector       |
| Polymorphic fields     | `data Box a = Box a`     | Unknown representation               | Specialization or strictness   |
| Lazy numeric fields    | `data S = S Int`         | Thunk instead of computed value      | Strict field                   |
| Generic typeclass code | `Num a => ...`           | Dictionary and missed specialization | Concrete hot-path functions    |
| Tuple return           | `(Int, Int)`             | Possible allocation                  | GHC may optimize; profile      |

Example:

```haskell
sumVector :: Vector Int -> Int
sumVector =
  Vector.foldl' (+) 0
```

For dense numeric data, vector-like structures are often better than lists. If the vector is unboxed, the elements can avoid per-element heap boxing.

This does not mean every numeric list should become a vector. Lists are excellent for recursive, lazy, producer-consumer patterns. Vectors are better for dense, indexed, strict numeric or array-like workloads.

**Failure-first explanation.** The tempting but wrong mental model is that `Int` in Haskell always behaves operationally like `int` in C. The surprising cost is that polymorphism, laziness, lists, and boxing can introduce allocation and indirection. The correct explanation is that Haskell’s semantic type does not fully determine low-level representation. The professional rule is: **use ordinary types first; when profiling shows numeric or array-heavy cost, consider strictness, specialization, vectors, and unboxed representations.**

### Typeclass Dispatch and Specialization — dictionaries, static optimization, abstraction cost

A typeclass constraint is implemented roughly through dictionary passing: a function with a constraint receives a record of methods for the specific type. GHC can often inline, specialize, and optimize this away, but not always.

```haskell
sumGeneric :: Num a => [a] -> a
sumGeneric =
  foldl' (+) 0
```

This is abstract over numeric type `a`. In a hot path, a concrete version may optimize better:

```haskell
sumInt :: [Int] -> Int
sumInt =
  foldl' (+) 0
```

| Code shape                      | Benefit                              | Potential cost                              |
| ------------------------------- | ------------------------------------ | ------------------------------------------- |
| Concrete type                   | Easier specialization                | Less reusable                               |
| Typeclass constraint            | Reusable over many types             | Dictionary passing, missed specialization   |
| Inline small function           | Exposes optimization                 | Code size                                   |
| Specialize polymorphic function | Faster concrete call                 | More generated code                         |
| Newtype deriving                | Zero-cost abstraction often possible | Semantics of derived instance must be right |
| Higher-rank polymorphism        | Expressive APIs                      | Harder optimization and inference           |

A typeclass-heavy API may be semantically elegant but operationally nontrivial. For library code, this is often worth it. For application hot paths, concrete functions may be better.

**Common Pitfalls.** The common overcorrection is to avoid typeclasses because they might cost something. That is not professional Haskell. Typeclasses are central and often optimized well. The opposite mistake is assuming abstraction always optimizes away. The professional rule is: **write clear abstract code first; specialize or concretize hot paths when profiling shows real cost.**

### Compilation Pipeline — source, desugaring, Core, STG, machine code

GHC compiles Haskell through intermediate languages and optimization stages. The exact pipeline is an implementation detail, but the broad idea helps explain why high-level code can become efficient and why compiler behavior matters.

A simplified pipeline:

```text
Haskell source
  -> parsing and renaming
  -> type checking
  -> desugaring
  -> Core
  -> optimization
  -> STG
  -> code generation
  -> object code / executable
```

`Core` is a small typed functional intermediate language. Many GHC optimizations happen there. `STG` is closer to the runtime execution model of closures and thunks.

| Stage            | Role                                       | Why programmers care                        |
| ---------------- | ------------------------------------------ | ------------------------------------------- |
| Parsing/renaming | Resolve syntax and names                   | Layout/import errors                        |
| Type checking    | Infer/check types and constraints          | Main design feedback                        |
| Desugaring       | Translate surface syntax                   | Explains `do`, list syntax, pattern forms   |
| Core             | Simplified typed functional representation | Inlining, specialization, fusion            |
| Optimization     | Rewrite and improve code                   | Performance depends on optimization success |
| STG              | Runtime-oriented functional representation | Thunks, closures, update model              |
| Code generation  | Native/object output                       | Low-level performance and linking           |
| RTS execution    | Runtime system support                     | GC, threads, profiling, I/O                 |

Core inspection is an advanced tool. It can answer questions such as: Did the intermediate list disappear? Did specialization occur? Was a function inlined? Is a value boxed?

However, Core is not where ordinary learning should begin. It is an expert diagnostic tool after source-level design and profiling.

**Common Pitfalls.** A common mistake is treating GHC optimization as magic. Another is reading Core too early and losing sight of source-level clarity. The practical workflow is: write clear code, compile with appropriate optimization, benchmark/profile if needed, inspect Core only for important performance questions.

### Optimizations and Rewrite Behavior — inlining, fusion, strictness analysis

GHC performs many optimizations. Some are general compiler optimizations; others are especially important in functional code.

| Optimization                 | What it tries to do                              | Practical effect              | Caveat                                     |
| ---------------------------- | ------------------------------------------------ | ----------------------------- | ------------------------------------------ |
| Inlining                     | Substitute function body at call site            | Enables further optimization  | Can increase code size                     |
| Specialization               | Generate concrete version of polymorphic code    | Faster typeclass/numeric code | More compilation/code size                 |
| Strictness analysis          | Discover values safe to evaluate earlier         | Reduce thunks                 | Not always enough                          |
| Worker/wrapper               | Split function into optimized worker and wrapper | Better unboxed/strict loops   | Implementation-specific                    |
| Fusion                       | Remove intermediate structures                   | Efficient pipelines           | Not guaranteed                             |
| Constructor unpacking        | Store fields more directly                       | Less indirection              | Requires strictness/representation choices |
| Common subexpression sharing | Avoid recomputation                              | Save work                     | Can increase retention                     |
| Dead-code elimination        | Remove unused code                               | Smaller/faster output         | Depends on visibility                      |

Fusion example idea:

```haskell
sum (map f xs)
```

may avoid constructing the intermediate mapped list after optimization. But this should not be assumed in every library, every data type, or every code shape.

A manually fused version:

```haskell
foldl' (\acc x -> acc + f x) 0 xs
```

is sometimes more predictable.

**Failure-first explanation.** The tempting but wrong mental model is that high-level pipelines are always optimized into tight loops. The surprising behavior is that small changes can prevent fusion or specialization. The correct explanation is that optimization depends on inlining, rewrite rules, library design, and compiler visibility. The professional rule is: **write clear high-level code first; for hot paths, verify with benchmarking/profiling and inspect generated Core only when needed.**

### Runtime System — RTS options, GC, capabilities, profiling, eventlog

GHC programs run with support from a runtime system. The RTS handles garbage collection, lightweight thread scheduling, I/O integration, profiling support, event logging, and parallel execution capabilities.

| RTS area              | What it affects                                 | Practical use                          |
| --------------------- | ----------------------------------------------- | -------------------------------------- |
| Garbage collection    | Memory reclamation and pause behavior           | Tune only after profiling              |
| Capabilities          | Runtime worker resources for parallel execution | `+RTS -N` style configuration          |
| Lightweight threads   | Haskell-level concurrency scheduling            | Many concurrent tasks                  |
| Eventlog              | Runtime event tracing                           | Diagnose concurrency/parallel behavior |
| Heap profiling        | Memory residency                                | Space leak diagnosis                   |
| Cost-center profiling | Time/allocation attribution                     | Hotspot diagnosis                      |
| Stack/heap limits     | Runtime bounds                                  | Detect runaway behavior                |
| Foreign calls         | Interaction with external code                  | Blocking/safety classification         |

RTS options are powerful but should not be used as a substitute for good representation and profiling. Increasing heap size or changing GC settings may hide a space leak rather than fix it.

**Common Pitfalls.** A common operational mistake is tuning RTS flags before understanding allocation and residency. Another is assuming adding more capabilities will speed up a program. Parallel speedup requires enough independent work, suitable granularity, and evaluation actually occurring in parallel.

### Concurrency versus Parallelism — overlapping tasks versus faster evaluation

Concurrency and parallelism are different.

**Concurrency** means structuring multiple tasks that may overlap in time: handling many connections, waiting for I/O, coordinating workers, or managing shared state.

**Parallelism** means using multiple cores to compute faster.

| Dimension        | Concurrency                                     | Parallelism                            |
| ---------------- | ----------------------------------------------- | -------------------------------------- |
| Main goal        | Structure overlapping work                      | Reduce runtime through multiple cores  |
| Typical task     | Server handling clients, async requests         | Pure computation over large data       |
| Main tools       | Lightweight threads, `async`, STM, `MVar`       | Strategies, sparks, parallel libraries |
| Main risk        | Leaks, deadlocks, cancellation, lost exceptions | Overhead, poor granularity, no speedup |
| Evaluation issue | Effects and scheduling                          | Laziness may delay actual work         |
| Debug tool       | Eventlog, logging, structured supervision       | Benchmarking, eventlog, profiling      |

Example concurrency:

```haskell
withAsync fetchA $ \a ->
  withAsync fetchB $ \b -> do
    ra <- wait a
    rb <- wait b
    pure (combine ra rb)
```

Example parallelism conceptually:

```haskell
-- Evaluate independent pure computations in parallel using a parallel strategy.
```

The exact strategy API depends on the chosen library, but the key idea is to spark evaluation of pure computations.

**Failure-first explanation.** The tempting but wrong mental model is that Haskell threads automatically make programs faster. The surprising result is that a concurrent program can be well-structured but not faster, and a parallel program can create overhead without speedup. The correct explanation is that concurrency is about program structure; parallelism is about computation throughput. The professional rule is: **use concurrency to manage independent tasks; use parallelism only when there is enough pure work, appropriate granularity, and measured benefit.**

### Lightweight Threads, async, and Cancellation — ownership of concurrent work

Haskell lightweight threads are cheap compared with OS threads, but not free. More importantly, thread ownership matters.

Raw thread spawning:

```haskell
forkIO worker
```

This creates a thread, but the caller may not observe its result or exception. This is fine for low-level supervised systems, but risky as an ordinary application pattern.

Structured async pattern:

```haskell
withAsync action $ \worker -> do
  result <- wait worker
  use result
```

This ties the child action’s lifetime to a lexical scope.

| Pattern                       | Ownership               | Risk                             |
| ----------------------------- | ----------------------- | -------------------------------- |
| `forkIO` and ignore thread id | Weak                    | Lost exception, leaked worker    |
| Store `ThreadId`              | Manual                  | Must manage cancellation/waiting |
| `async` and `wait`            | Stronger                | Caller observes result/exception |
| `withAsync`                   | Scoped                  | Safer cancellation/lifetime      |
| `race`                        | First result wins       | Loser must be cancelled safely   |
| Worker pool                   | Managed                 | Complexity and backpressure      |
| STM queue                     | Structured work handoff | Requires transaction design      |

Cancellation usually uses asynchronous exceptions. This is why bracket-style resource management matters in concurrent code. If a thread is cancelled while holding or using a resource, cleanup must still run.

**Common Pitfalls.** The common anti-pattern is fire-and-forget concurrency without supervision. Another is unbounded concurrency: mapping an async action over a huge list without limiting resource use. The professional rule is: **every concurrent task should have an owner, a cancellation story, and an exception story.**

### STM, MVar, and Shared State — composable transactions versus synchronization cells

Haskell offers multiple shared-state tools. They have different semantics.

`MVar` is a mutable synchronization variable that is either empty or full. It can represent a lock, a one-place channel, or a handoff point.

`TVar` is a transactional variable used inside STM. STM transactions are composed and run atomically with `atomically`.

```haskell
increment :: TVar Int -> STM Int
increment counter = do
  n <- readTVar counter
  let n' = n + 1
  writeTVar counter n'
  pure n'
```

Run:

```haskell
atomically (increment counter)
```

| Tool            | Best use                               | Strength                         | Risk                                   |
| --------------- | -------------------------------------- | -------------------------------- | -------------------------------------- |
| `IORef`         | Local mutable state in `IO`            | Simple                           | Race-prone if shared concurrently      |
| `MVar`          | Synchronization, handoff, simple locks | Blocking semantics               | Deadlocks, lock-order problems         |
| `TVar` / STM    | Composable shared state                | Atomic composition, retry/orElse | Transactions must avoid arbitrary `IO` |
| `Chan` / queues | Communication                          | Producer-consumer patterns       | Backpressure decisions                 |
| `async`         | Task ownership                         | Result/exception management      | Still needs resource limits            |

STM is distinctive because transactions compose. Two operations that each manipulate `TVar`s can be combined into a larger atomic operation without manually designing lock order.

**Interdisciplinary Lens: Concurrency Theory**

What it clarifies: STM changes shared-state design from lock acquisition order to atomic transaction composition.

Language feature involved: `STM`, `TVar`, `atomically`, `retry`, `orElse`.

Practical consequence: many shared-state workflows become easier to compose safely than with manual locks.

Limit of the lens: STM does not solve all concurrency problems. Long transactions, contention, I/O interaction, fairness, and performance still require design.

**Common Pitfalls.** Do not use `IORef` for shared concurrent state unless atomicity is explicitly handled. Do not try to perform arbitrary `IO` inside STM transactions. Do not assume STM removes all deadlock-like design problems; poorly designed retry conditions can still block progress.

### Parallel Evaluation and Laziness — sparks, demand, granularity

Parallel Haskell must deal with laziness. Creating a parallel opportunity does not automatically mean useful work happens at the right time. Evaluation must be demanded, and the work must be large enough to justify overhead.

| Parallelism issue | Meaning                                   | Practical consequence               |
| ----------------- | ----------------------------------------- | ----------------------------------- |
| Spark creation    | Potential parallel work                   | Spark may fizzle if not needed      |
| Demand            | Result must be required                   | Unevaluated work may not run        |
| Granularity       | Work chunk size                           | Too small: overhead dominates       |
| Evaluation depth  | WHNF vs NF                                | May only evaluate outer constructor |
| Data dependency   | Later work needs earlier result           | Limits parallelism                  |
| Memory pressure   | Parallel work retains data                | Can increase residency              |
| Determinism       | Pure parallelism can remain deterministic | Effects complicate behavior         |

A conceptual example:

```haskell
let left  = expensiveLeft input
    right = expensiveRight input
in combine left right
```

This has potential parallelism if `left` and `right` are independent and both demanded. But without explicit parallel strategy or compiler/runtime support, it may evaluate sequentially. With a strategy, the program may spark one computation while evaluating another.

**Common Pitfalls.** A common failure is parallelizing tiny computations. Another is forcing only WHNF when the expensive work lies inside the structure. For example, evaluating a list to WHNF only reveals whether it is empty or cons; it does not evaluate all elements. Parallel code often needs deliberate evaluation depth.

### Memory Safety, Type Safety, and Their Limits — ordinary safety, unsafe boundaries

Ordinary Haskell is memory-safe in the sense that typical code does not manually free memory, dereference arbitrary pointers, or access freed objects. The type system prevents many representation errors. But these guarantees have boundaries.

| Safety area        | Haskell helps by                   | Limit                                               |
| ------------------ | ---------------------------------- | --------------------------------------------------- |
| Type safety        | Static checking, ADTs, typeclasses | `unsafeCoerce`, bottoms, FFI can break assumptions  |
| Memory safety      | Managed runtime and GC             | Foreign pointers and unsafe code require discipline |
| Null safety        | `Maybe` instead of null by default | Partial functions and FFI nulls still possible      |
| Resource safety    | `bracket`, `with...` patterns      | Manual misuse can leak resources                    |
| Concurrency safety | STM, typed APIs                    | Deadlocks, leaks, cancellation issues remain        |
| Effect safety      | `IO` boundary                      | `IO` does not specify exact external effect         |
| Totality           | Pattern warnings, types            | Nontermination and partiality remain possible       |

Unsafe features should be isolated:

```haskell
module Internal.Unsafe
  ( safePublicWrapper
  ) where
```

The public wrapper should restore Haskell-level expectations: typed errors, resource safety, validation, and documented assumptions.

**Failure-first explanation.** The tempting but wrong mental model is that Haskell’s type system makes unsafe behavior impossible. The surprising reality is that unsafe features, FFI, partial functions, exceptions, and nontermination exist. The correct explanation is that Haskell gives strong defaults, not absolute proof. The professional rule is: **treat unsafe and foreign code as trust-boundary code; isolate it, minimize it, and expose a safe API.**

### Runtime Boundary with FFI — blocking calls, safe/unsafe imports, ownership

FFI is where Haskell meets foreign runtime assumptions. A foreign function may block, mutate memory, depend on global state, use callbacks, return error codes, or require manual deallocation.

| FFI decision      | Meaning                          | Risk                                 |
| ----------------- | -------------------------------- | ------------------------------------ |
| Type mapping      | Haskell type matches C type      | Wrong representation corrupts values |
| Ownership         | Who frees memory                 | Leaks or use-after-free              |
| Lifetime          | How long pointer remains valid   | Dangling pointer                     |
| Blocking behavior | Whether call blocks              | Runtime scheduling impact            |
| Thread safety     | Library safe across threads?     | Data races                           |
| Error convention  | Return code, errno, null pointer | Lost or misclassified failure        |
| Purity claim      | Imported as pure or effectful    | Hidden side effects break reasoning  |
| Callback          | Foreign code calls Haskell       | Runtime interaction complexity       |

A safe wrapper usually converts:

```text
foreign pointer/error-code world
  -> Haskell resource/error/value world
```

Example shape:

```haskell
withForeignUser :: RawBytes -> (ForeignUser -> IO a) -> IO (Either ForeignError a)
```

This kind of API can scope ownership, convert errors, and prevent leaking raw pointers.

**Common Pitfalls.** Do not expose raw `Ptr`-heavy APIs throughout application code. Do not import an effectful foreign function as pure merely because it returns the same result most of the time. Do not trust foreign lifetime rules without a wrapper that encodes them.

### Runtime and Cost Model Table — operations, hidden costs, detection

| Operation or pattern | Usual cost                   | Hidden cost                         | How to detect it        | When it matters                        | When not to optimize prematurely   |
| -------------------- | ---------------------------- | ----------------------------------- | ----------------------- | -------------------------------------- | ---------------------------------- |
| Pure binding         | Usually no immediate work    | Thunk allocation/retention          | Heap profile, Core      | Large captured input or repeated use   | Small local expressions            |
| Function composition | Often optimized              | Closure allocation if not optimized | Profiling/Core          | Hot pipelines                          | Clear source-level transformations |
| Partial application  | Closure                      | Captured environment retention      | Heap profile            | Long-lived partially applied functions | Short local use                    |
| List map/filter      | Cons allocation unless fused | Intermediate lists                  | Allocation profile/Core | Large data pipelines                   | Small lists or fused code          |
| `foldl`              | Lazy accumulator             | Space leak                          | Heap profile            | Large strict accumulation              | Small lists                        |
| `foldl'`             | Strict accumulator           | May force more than needed          | Benchmark               | Numeric/statistical folds              | Lazy short-circuit tasks           |
| `++`                 | Traverses left list          | Quadratic repeated append           | Benchmark/profile       | Building large lists                   | One or two small appends           |
| `Text` append        | Allocation                   | Repeated append costly              | Benchmark               | Large output                           | Small messages                     |
| Builder              | Efficient construction       | More API complexity                 | Benchmark               | Large generated text                   | Small strings                      |
| `Map.lookup`         | Logarithmic                  | Key comparison cost                 | Benchmark               | Large maps/hot lookups                 | Small maps                         |
| Hash lookup          | Expected fast                | Hash cost/collisions                | Benchmark               | Large hash maps                        | Ordered operations needed          |
| `Vector` indexing    | Efficient                    | Bounds/boxing depending vector      | Benchmark               | Dense numeric/indexed data             | Recursive sequence processing      |
| Typeclass method     | Often optimized              | Dictionary/specialization cost      | Core/profile            | Hot polymorphic code                   | Ordinary APIs                      |
| `newtype`            | Usually zero runtime wrapper | Bad derived semantics               | Type/API review         | Domain safety                          | No runtime concern usually         |
| Strict field         | Forces WHNF                  | Lost laziness                       | Heap/profile            | Long-lived records                     | Rarely used fields                 |
| `deepseq`            | Full evaluation              | Expensive/nonterminating            | Benchmark               | Resource boundaries/benchmarks         | Ordinary shallow demand            |
| `IO` action          | Effect sequencing            | Exceptions/resource timing          | Tests/logs              | Boundaries                             | Pure logic                         |
| `async` thread       | Lightweight task             | Scheduling/memory/cancellation      | Eventlog                | Many concurrent tasks                  | Sequential simple code             |
| STM transaction      | Atomic shared state          | Retry/contention                    | Eventlog/profile        | Composable concurrency                 | Single-threaded state              |
| FFI call             | Boundary overhead            | Blocking/memory safety              | Profiling/audit         | Frequent calls or unsafe resources     | Rare coarse calls                  |

This table should be used as a diagnostic guide, not as a list of premature optimizations. Haskell’s performance failures are often representation failures, strictness failures, or boundary failures.

### Failure Modes in Runtime Reasoning — what experts check first

| Symptom                                | Likely area                                         | First check                                                        |
| -------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------ |
| Memory grows unexpectedly              | Space leak                                          | Heap profile, lazy accumulators, retained closures                 |
| CPU high with simple-looking code      | Allocation or missed optimization                   | Cost-center profile, intermediate structures                       |
| Program hangs                          | Laziness, infinite structure, deadlock, blocked I/O | Demand path, thread status, logs                                   |
| File handle stays open                 | Lazy I/O/resource boundary                          | Strict I/O, `withFile`, streaming design                           |
| Exception appears far from source      | Lazy evaluation                                     | Force at boundary with `evaluate`/`deepseq` if needed              |
| Parallel code no faster                | Granularity/demand                                  | Eventlog, evaluation depth                                         |
| Concurrency loses failures             | Raw `forkIO`                                        | Use `async`/supervision                                            |
| Validation crashes anyway              | Partial function or constructor leak                | Search for `error`, `undefined`, `fromJust`, exported constructors |
| JSON decode succeeds but domain breaks | Boundary validation missing                         | Separate raw and domain types                                      |
| Typeclass-heavy hot path slow          | Missed specialization                               | Specialize/concretize and benchmark                                |

**Common Pitfalls.** The largest runtime reasoning mistake is trying to debug performance purely from source appearance. Haskell source hides demand, sharing, allocation, and optimization. The second largest mistake is adding strictness everywhere. The third is treating runtime behavior as language semantics. The professional workflow is: clarify meaning, identify boundary, reproduce issue, profile, then change representation or strictness.

### Semantic and Runtime Transfer Map — from other languages to Haskell

| Source-language intuition    | What transfers                          | What changes in Haskell                               | Common failure                              | Better mental model                                              |
| ---------------------------- | --------------------------------------- | ----------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------- |
| C/C++ stack/heap thinking    | Memory layout matters                   | Ordinary values may be thunks/closures and GC-managed | Assuming local value means stack object     | Think demand, allocation, retention                              |
| Java GC intuition            | Managed memory                          | Laziness and thunks add retention patterns            | Blaming GC before checking thunks           | Profile residency                                                |
| Python list intuition        | High-level sequences                    | Haskell lists are lazy linked lists                   | Using lists for arrays                      | Choose list/vector/map by operation                              |
| JavaScript promise intuition | Sequenced effects                       | `IO` is not a promise and not directly extractable    | Trying to unwrap `IO` in pure code          | Compose inside effect context                                    |
| Rust safety intuition        | Types prevent many bugs                 | Haskell lacks ownership/lifetime checking             | Assuming resource lifetime is type-enforced | Use `bracket`, with-functions, linear/advanced tools when needed |
| Scala functional intuition   | Typeclasses and effects transfer partly | Laziness by default changes cost                      | Assuming strict evaluation                  | Reason about demand                                              |
| OCaml/ML pattern matching    | ADTs and matches transfer well          | Haskell is non-strict                                 | Assuming arguments evaluated before call    | Pattern matching forces as needed                                |
| SQL/dataframe intuition      | Data transformation transfers partly    | Types and laziness change pipeline behavior           | Assuming eager tables                       | Know representation and evaluation                               |

### Practical Runtime Fluency Checklist — Part 7 review artifact

| Skill               | Check                                                                           |
| ------------------- | ------------------------------------------------------------------------------- |
| Laziness            | Can explain why `const 1 undefined` returns `1`                                 |
| Demand              | Can identify which expression forces a value                                    |
| WHNF/NF             | Can distinguish evaluating `Just thunk` from evaluating the thunk               |
| Pattern matching    | Can explain why matching `Just x` forces the outer constructor                  |
| Strictness          | Can choose between lazy field, strict field, bang pattern, `seq`, and `deepseq` |
| Folds               | Can explain why `foldl` may leak and `foldl'` often helps                       |
| Closure retention   | Can detect when a function captures a large environment                         |
| Data representation | Can choose between list, vector, map, text, bytes based on cost                 |
| Typeclass cost      | Can explain dictionary passing and specialization at a high level               |
| GHC pipeline        | Can place desugaring, Core, STG, optimization, and RTS conceptually             |
| GC                  | Can distinguish allocation rate from live memory retention                      |
| IO semantics        | Can explain why `IO a` cannot be unwrapped in pure code                         |
| Exceptions          | Can distinguish typed failure, pure bottom, `IO` exceptions, async exceptions   |
| Resources           | Can explain why `bracket` matters under exceptions                              |
| Concurrency         | Can distinguish concurrency from parallelism                                    |
| STM                 | Can explain why STM transactions compose better than manual locks               |
| Parallelism         | Can explain why laziness and granularity affect speedup                         |
| FFI                 | Can identify ownership, lifetime, and blocking risks                            |
| Profiling           | Can choose time, allocation, heap, or eventlog profiling based on symptom       |

The runtime model completes the earlier parts rather than replacing them. Part 1 explained Haskell’s language identity. Part 2 gave source recognition. Part 3 showed data modeling. Part 4 showed composition and abstraction. Part 5 showed boundaries. Part 6 mapped libraries. Part 7 explains why all of those choices have operational consequences: a good type can still leak memory, a pure function can still allocate heavily, a lazy pipeline can either save work or retain too much, an effect boundary can still throw exceptions, and a concurrent program can still lose failures unless ownership is designed.
