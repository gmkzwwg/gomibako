---
title: Common Lisp - Quick Reference
abbreviation: Common Lisp
categories: Notes
subclass: Languages
---
## PART 1 — Language Identity, Design Philosophy, and Problem Space

### Scope and implementation assumptions — `ANSI Common Lisp`, `SBCL`, `ASDF`, `Quicklisp`, `portable core`, `implementation boundary`

**Density strategy:** adaptive — Common Lisp requires substantial treatment where syntax, evaluation, packages, macros, CLOS, conditions, and image-based workflow affect real programming judgment, while secondary ecosystem details should remain concise.

This guide treats **ANSI Common Lisp** as the language baseline, with the **Common Lisp HyperSpec** as the practical reference surface. The HyperSpec is derived from the ANSI Common Lisp standard with permission from ANSI and INCITS, but the printed ANSI standard remains the formal standard reference. ([LispWorks][1])

For professional implementation assumptions, the guide targets **SBCL** as the default implementation. SBCL is not “the Common Lisp language”; it is a major implementation with its own compiler, optimizer, threading support, diagnostics, extensions, and runtime behavior. As of May 12, 2026, the SBCL site lists **SBCL 2.6.4**, released April 29, 2026, as the most recent version. ([Steel Bank Common Lisp][2])

For project organization, the guide assumes **ASDF** as the system definition and build/loading tool. ASDF describes how Common Lisp systems are composed from files and subsystems and how those components are compiled, loaded, tested, and operated on in the right order. ([Steel Bank Common Lisp][3])

For dependency acquisition, the guide assumes **Quicklisp** as the practical library manager. Quicklisp works with an existing Common Lisp implementation to download, install, and load Common Lisp libraries; its own site describes access to more than 1,500 libraries. ([Quicklisp][4])

This tutorial follows the requested goal: to teach Common Lisp as a coherent design system rather than as a shallow syntax list, while integrating lambda calculus, homoiconicity, macro systems, eval/apply, metaprogramming, and language-oriented programming where they clarify the language. 

| Layer               | Assumption in this guide | What counts as language-level                                                              | What is implementation- or ecosystem-level                                                                | Practical consequence                                                                            |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Standard            | ANSI Common Lisp         | Core syntax, special operators, types, functions, macros, packages, CLOS, condition system | Behavior not specified by ANSI                                                                            | Portability requires knowing where the standard stops.                                           |
| Reference surface   | Common Lisp HyperSpec    | Practical lookup for standard constructs                                                   | Not itself the formal printed ANSI document                                                               | Use it constantly, but do not confuse convenience reference with implementation manual.          |
| Implementation      | SBCL                     | Not language-level semantics                                                               | Compiler notes, optimization behavior, native threads, implementation-specific extensions, image behavior | Professional code often targets SBCL while isolating non-portable assumptions.                   |
| Build/system layer  | ASDF                     | Not part of core language syntax                                                           | System definitions, component ordering, loading, testing operations                                       | Common Lisp project structure is system-based, not modern import-based in the Python/Node sense. |
| Library acquisition | Quicklisp                | Not part of the language standard                                                          | Downloading and loading ecosystem libraries                                                               | Practical Lisp fluency requires ecosystem workflow beyond ANSI forms.                            |

**Practical rule:** when reading or writing Common Lisp, classify every fact into one of five categories: **standard semantics**, **implementation behavior**, **compiler behavior**, **runtime behavior**, or **ecosystem convention**. Many mistakes come from moving facts between those categories without noticing.

### What Common Lisp is — `multi-paradigm`, `dynamic`, `interactive`, `compiled`, `symbolic`, `extensible`

Common Lisp is a standardized, multi-paradigm programming language from the Lisp family. It combines symbolic computation, functional programming, imperative programming, object-oriented programming through CLOS, macro-based syntactic abstraction, interactive development, dynamic typing, optional type declarations, generic functions, a condition/restart system, packages, a rich standard library, and implementation-level compilation.

Calling it “a functional language” is incomplete. Calling it “a scripting language” is misleading. Calling it “an old AI language” is historically understandable but technically reductive. A better first approximation is:

**Common Lisp is an extensible, interactive, dynamically typed, compiled language for building programs and sometimes building new languages inside those programs.**

That definition contains several tensions.

It is **dynamic**, but not casual. Types are normally checked at runtime, but the language has precise type specifiers, declarations, compiler optimizations, and a strong standard vocabulary for values.

It is **interactive**, but not merely interpreted. Common Lisp systems commonly support REPL-driven development, incremental compilation, dynamic redefinition, and image-based workflows. SBCL, for example, is a serious compiler, not a toy interpreter.

It is **symbolic**, but not just list manipulation. Lists are important, but symbols, packages, functions, arrays, hash tables, structures, classes, generic functions, conditions, streams, pathnames, and compiled functions are equally real parts of the language.

It is **extensible**, but not magically self-explanatory. Macros and reader mechanisms can make programs more expressive, but they can also create private languages that are opaque to readers, tools, and maintainers.

| Identity dimension  | Common Lisp’s choice                             | Practical consequence                                                                                             | Main tradeoff                                                                           |
| ------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Language family     | Lisp-family language                             | Program structure is represented through S-expressions and evaluated forms.                                       | Clear evaluation structure, unfamiliar surface syntax.                                  |
| Type discipline     | Dynamic and strong, with optional declarations   | Values carry runtime types; many errors are detected dynamically; declarations can aid checking and optimization. | Flexibility and rapid iteration, less static guarantee than ML/Rust/Java-style systems. |
| Paradigm            | Multi-paradigm                                   | Functional, imperative, object-oriented, symbolic, and language-oriented styles coexist.                          | High expressive range, weaker pressure toward one uniform style.                        |
| Object model        | CLOS generic functions and multiple dispatch     | Behavior is organized around generic operations, not only around classes owning methods.                          | Powerful extension model, more complex dispatch reasoning.                              |
| Metaprogramming     | Macros, compiler macros, reader-level mechanisms | The language can define new syntactic abstractions and embedded DSLs.                                             | Abstraction beyond functions, but increased phase and readability complexity.           |
| Development style   | REPL-centered, incremental, image-aware          | Programs can be explored, redefined, compiled, inspected, and debugged interactively.                             | Fast feedback, but risks hidden state and non-reproducible sessions.                    |
| Runtime model       | Managed memory, usually compiled implementation  | Garbage collection, compiled functions, runtime type information, conditions, dynamic binding.                    | Less manual memory burden, but allocation and GC cost must be understood.               |
| Module organization | Packages plus ASDF systems                       | Namespaces and system loading are distinct concepts.                                                              | Powerful symbol control, but confusing to readers expecting modern module imports.      |

**Common pitfall:** treating Common Lisp as “Python with parentheses” or “Scheme with more functions.” Python transfer fails because Common Lisp packages are not Python modules, macros are not decorators, and image-based development is not ordinary script execution. Scheme transfer fails because Common Lisp is not minimalist: it standardizes a much larger, historically industrial language with CLOS, conditions, packages, sequences, pathnames, `loop`, `format`, and many legacy-compatible design choices.

### Historical problem space — `standardization`, `symbolic computation`, `interactive systems`, `large Lisp programs`

Common Lisp emerged as a consolidation language. Earlier Lisp dialects had powerful but diverging features. The design problem was not merely “create an elegant Lisp.” It was closer to: **create a common, practical, standard Lisp capable of supporting large programs, existing Lisp traditions, symbolic computation, interactive development, compilation, and extensibility.**

Common Lisp became an ANSI standard in 1994 as ANSI X3.226:1994. ([CMU School of Computer Science][5]) That matters because the language has an unusually large standardized surface compared with Scheme. Common Lisp standardizes not only core evaluation and basic data, but also packages, pathnames, sequences, conditions, CLOS, pretty printing, `format`, restarts, and many other facilities.

The historical design pressure produced a language with breadth. It does not pursue the minimalism of Scheme, the JVM-hosted persistent data orientation of Clojure, or the static type discipline of ML-family languages. It favors a different ideal: **a programmable programming environment where the language, compiler, runtime, and interactive session cooperate.**

| Historical pressure                    | Common Lisp response                                                                         | Lasting consequence                                         | Remaining cost                                                           |
| -------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| Fragmented Lisp dialects               | Standardized a large common language                                                         | Portable core across implementations                        | Large language surface and legacy compatibility burden                   |
| Symbolic AI and algebraic manipulation | Symbols, lists, conses, macros, dynamic inspection                                           | Excellent code/data manipulation and symbolic abstraction   | Easy to overuse symbolic representation where records/classes fit better |
| Interactive development                | REPL, dynamic redefinition, image-based workflows                                            | Fast exploration and live debugging                         | Hidden state can obscure reproducibility                                 |
| Need for large systems                 | Packages, CLOS, conditions, declarations, compilation                                        | More industrial than minimalist Lisps                       | More moving parts than Scheme-like languages                             |
| Need for syntactic abstraction         | Macros and reader mechanisms                                                                 | DSLs and control forms can be expressed inside the language | Macro-heavy code can become local, private, and hard to reason about     |
| Need for performance                   | Native compilation in implementations such as SBCL, type declarations, optimization settings | Dynamic language can still be performant                    | Performance depends on implementation knowledge and declarations         |

This history explains why Common Lisp feels unusual: it is simultaneously old and advanced, standardized and implementation-sensitive, dynamic and compiled, symbolic and object-oriented, practical and theoretical.

### Language personality — `dynamic typing`, `strong typing`, `CLOS`, `macros`, `conditions`, `packages`, `REPL`

Several terms are often misused when describing Common Lisp, so the basic vocabulary must be fixed early.

**Dynamic typing** means that type information is primarily associated with values and checked during execution. It does not mean “no types.” Common Lisp has many types and type specifiers.

**Strong typing** is less precise as a formal term, but in ordinary programming-language discussion it means the language does not freely reinterpret values through arbitrary implicit coercions. Common Lisp is dynamic, but it is not weak in the sense of silently treating every value as every other value.

**Compiled language** and **interpreted language** are implementation and workflow terms, not pure language categories. Common Lisp code can be compiled; SBCL is a compiler-oriented implementation. A REPL does not imply that the language is merely interpreted.

**Object-oriented** in Common Lisp means CLOS-style generic functions, classes, methods, multiple dispatch, method combination, and a metaobject tradition. It does not mean Java-style classes owning all methods.

**Functional** in Common Lisp means first-class functions, closures, higher-order operations, lexical binding, and compositional programming are central. It does not imply purity or immutability by default.

| Dimension       | Common Lisp’s personality                                            | What transfers well                           | What must be adjusted                                                                                        |
| --------------- | -------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Typing          | Dynamic, strong, optional declarations                               | Runtime validation habits, flexible modeling  | Do not expect the compiler to enforce most domain invariants by default.                                     |
| Functions       | First-class functions, lexical closures, separate function namespace | Higher-order programming                      | Remember Common Lisp’s function/value namespace distinctions and special forms.                              |
| Objects         | CLOS, generic functions, multiple dispatch                           | Object modeling and polymorphism              | Stop thinking of methods as owned only by classes.                                                           |
| Mutation        | Available and idiomatic in many places                               | Imperative programming                        | Destructive operations require aliasing discipline.                                                          |
| Errors          | Conditions and restarts                                              | Exception-like recovery intuition             | Restarts are not ordinary exceptions; recovery can be offered by lower layers and selected by higher layers. |
| Modules         | Packages plus ASDF systems                                           | Namespacing and project organization concepts | Packages are symbol namespaces, not file/module units.                                                       |
| Metaprogramming | Macros, compiler macros, reader mechanisms                           | Code generation and abstraction ideas         | Macro expansion is a phase distinction, not runtime function calling.                                        |
| Development     | REPL and image-based workflow                                        | Interactive debugging                         | Session state must be controlled for reproducible builds.                                                    |

**Failure-first explanation: dynamic does not mean undisciplined**

The tempting but wrong model is: “Common Lisp is dynamically typed, so type design is not important.”

The surprising result is that serious Common Lisp code often contains explicit representation choices, type declarations, constructors, validators, predicate functions, generic functions, and performance-sensitive type reasoning.

The correct explanation is that Common Lisp moves many guarantees from the static type checker into a combination of runtime checks, programmer discipline, compiler declarations, tests, API contracts, and implementation diagnostics.

The professional rule of thumb is: **use dynamic typing for flexibility at boundaries and during exploration, but use explicit constructors, predicates, declarations, and tests to stabilize mature code.**

The boundary changes when performance or safety matters. In performance-sensitive SBCL code, declarations can materially affect generated code; in safety-sensitive code, external inputs require validation rather than trust in internal conventions.

### Design philosophy — `programmability`, `extensibility`, `abstraction`, `interactive feedback`, `pragmatic breadth`

Common Lisp’s design philosophy can be summarized as **controlled openness**. The language gives the programmer unusually broad power to define abstractions, extend syntax, inspect and modify systems, compile code, work interactively, and shape representation. It does not automatically prevent many bad uses of that power.

This design differs sharply from languages that enforce a narrow path. Rust uses ownership and borrowing to reject many unsafe programs before execution. Haskell uses types and purity to make effects explicit. Java uses nominal classes and checked structure to constrain architecture. Python favors readability and a broad ecosystem while keeping metaprogramming less central. Common Lisp gives more control over the language itself.

| Design feature           | Problem solved                                              | Capability gained                                                   | Cost introduced                                        | Programs that benefit                                            | Programs that suffer                                       |
| ------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------- | ---------------------------------------------------------- |
| S-expression syntax      | Need for uniform representation of code and data            | Evaluation structure becomes visible and manipulable                | Surface syntax is alien to many readers                | Symbolic systems, DSLs, macro-heavy frameworks                   | Teams unwilling to learn Lisp notation deeply              |
| Macros                   | Need for syntactic abstraction beyond functions             | New control forms, embedded languages, compile-time transformations | Phase complexity, debugging difficulty, local dialects | Frameworks, DSLs, repetitive domain logic                        | Codebases where every author invents private syntax        |
| Dynamic typing           | Need for flexibility, interactivity, genericity             | Fast iteration and polymorphic code                                 | Fewer static guarantees                                | Exploratory systems, symbolic computation, evolving domains      | Safety-critical systems without compensating discipline    |
| CLOS                     | Need for extensible object behavior                         | Multiple dispatch and generic operations                            | More dispatch reasoning than single-dispatch OOP       | Extensible protocols, multimethod-heavy domains                  | Simple applications that only need records and functions   |
| Condition/restart system | Need for recoverable, interactive, layered failure handling | Separation between signaling, handling, and recovery options        | More complex than ordinary exceptions                  | Interactive tools, robust systems, developer-facing environments | Codebases that only need simple fail-fast errors           |
| REPL/image workflow      | Need for live exploration and incremental development       | Fast feedback, inspection, dynamic redefinition                     | Reproducibility and state management issues            | Research, tooling, exploratory development, long-lived systems   | Build pipelines that assume clean process execution only   |
| Packages                 | Need for symbol namespace control                           | Fine-grained control over names and exports                         | Not a modern module system                             | Large symbolic systems, controlled APIs                          | Readers expecting file imports to define module boundaries |

**Design judgment:** Common Lisp’s power is not “free abstraction.” Its central tradeoff is that many guarantees are social, conventional, or tool-assisted rather than statically enforced. This makes expert judgment more important, not less.

### What Common Lisp makes easy — `symbolic abstraction`, `DSLs`, `incremental development`, `generic operations`, `interactive recovery`

Common Lisp makes certain programming activities unusually direct.

It makes **symbolic representation** easy. Symbols, lists, conses, property lists, association lists, and S-expressions support representing formulas, expressions, rules, syntax, symbolic transformations, and structured program fragments.

It makes **language-oriented programming** easy. Macros can introduce domain-specific notation, new binding forms, control abstractions, and compile-time rewrites. `loop` and `format` are themselves examples of embedded mini-languages inside Common Lisp.

It makes **interactive development** easy. A developer can define functions, compile them, inspect values, redefine methods, test conditions, and evolve a system from the REPL.

It makes **generic behavior** easy. CLOS generic functions allow behavior to be specialized by argument types, often more naturally than forcing everything into class-owned methods.

It makes **recoverable failure** unusually expressive. The condition system can signal a problem, allow handlers to inspect it, and expose restarts that describe possible recovery actions.

| Strength                                 | Why Common Lisp supports it well                                       | Cost or risk                                               |
| ---------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------- |
| Symbolic computation                     | Symbols and S-expressions are first-class ordinary data.               | Not every domain should be modeled as raw lists.           |
| DSL construction                         | Macros can transform syntax before runtime.                            | DSLs can obscure control flow and phase boundaries.        |
| Interactive exploration                  | REPL and image workflow support live inspection and redefinition.      | Session state can drift from source-controlled reality.    |
| Extensible polymorphism                  | CLOS generic functions and methods support open extension.             | Dispatch and method combination require careful reasoning. |
| Runtime recovery                         | Conditions and restarts separate error signaling from recovery policy. | More complex than ordinary exception handling.             |
| Performance tuning in a dynamic language | SBCL-style compilation and declarations can optimize mature code.      | Requires implementation-specific cost-model knowledge.     |

**Common pitfall:** using Common Lisp’s most distinctive mechanism for every problem. A macro is not better than a function merely because it is more “Lispy.” A list is not better than a structure merely because it is easier to construct. A generic function is not necessary for every conditional branch. A restart is not necessary for every error. Mature Lisp code chooses abstraction mechanisms by semantic need, not by aesthetic maximalism.

### What Common Lisp makes hard — `static guarantees`, `uniform tooling`, `module intuition`, `macro opacity`, `deployment`, `state discipline`

Common Lisp makes some things harder than they are in more constrained modern languages.

It does not provide a mainstream static type system comparable to ML, Haskell, Rust, TypeScript, or Java. Type declarations exist, but they are not a full static proof system for program correctness. Many correctness properties remain runtime facts.

It does not give a single universal module/dependency experience comparable to modern ecosystems with dominant package managers and standard build tools. ASDF and Quicklisp are central, but Common Lisp’s ecosystem is smaller and more heterogeneous than Python, JavaScript, Java, or Rust.

It does not force reproducible development sessions. The REPL and image workflow are powerful, but source files, system definitions, load order, package state, and image state can diverge.

It does not automatically preserve readability in the face of metaprogramming. A macro can make code clearer by naming a domain operation, or worse by hiding evaluation order, binding, control flow, and generated structure.

| Hard area                | Why it is hard                                                                           | Practical mitigation                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Static correctness       | Dynamic typing catches many errors only at runtime.                                      | Use constructors, predicates, declarations, tests, contracts, and careful API boundaries.           |
| Package/module confusion | Packages manage symbols; systems manage files/components.                                | Teach packages and ASDF separately; never call packages “modules” without qualification.            |
| Macro debugging          | Generated code may differ from surface code.                                             | Use `macroexpand`, small macros, clear expansion contracts, and avoid unnecessary syntax invention. |
| Session reproducibility  | REPL state can hide missing source definitions or load-order problems.                   | Restart images regularly; rely on ASDF systems; test from clean builds.                             |
| Portability              | Implementations differ in extensions, threads, FFI, optimizations, and runtime behavior. | Isolate implementation-specific code and document SBCL assumptions.                                 |
| Ecosystem consistency    | Libraries vary in maintenance, style, portability, and documentation.                    | Evaluate dependencies, prefer stable libraries, and understand ASDF/Quicklisp workflow.             |
| Deployment               | Image dumping and executable creation differ from mainstream script/package deployment.  | Treat deployment as a separate workflow, not an afterthought.                                       |

**Failure-first explanation: packages are not modules**

The tempting but wrong model is: “A Common Lisp package is like a Python module or Java package.”

The surprising behavior is that changing packages changes how symbols are read and resolved, but it does not by itself define file loading, dependency order, system structure, or compilation boundaries.

The correct semantic explanation is that a package is primarily a **symbol namespace**. ASDF systems and files handle project structure and loading. A package can contain symbols introduced by many files, and one file can interact with multiple packages.

The professional rule of thumb is: **use packages to control names; use ASDF systems to control components and build/load order.**

The boundary changes when discussing higher-level project conventions. Some projects align files, packages, and systems closely for maintainability, but that is a convention, not the core semantics.

### What Common Lisp deliberately avoids or leaves open — `static enforcement`, `syntax minimalism`, `single paradigm`, `single implementation model`

Common Lisp deliberately avoids forcing one programming style. It does not insist on purely functional programming, class-based OOP, static type-driven modeling, immutable data, uniform module imports, or one concurrency abstraction.

This openness is not accidental. It allows Common Lisp to support interactive experimentation, symbolic systems, macro-based DSLs, generic functions, imperative updates, functional composition, and implementation-specific optimization. But this also means the language leaves many choices to programmer discipline.

| Area left open      | What the language does not force                          | Why that can help                                | Why that can hurt                            |
| ------------------- | --------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------- |
| Data representation | Does not force records/classes over lists or vice versa   | Representation can evolve rapidly                | Raw lists can become undocumented structures |
| Error policy        | Does not force one exception model only                   | Conditions and restarts support layered recovery | Error design can become inconsistent         |
| Module architecture | Does not force package/file/system alignment              | Flexible system organization                     | Project structure can become opaque          |
| Static invariants   | Does not require types to express domain constraints      | Rapid iteration and dynamic polymorphism         | Bugs surface later without tests/contracts   |
| Macro usage         | Does not restrict syntactic abstraction to small patterns | DSLs and control forms are possible              | Overuse creates unreadable private languages |
| Mutability          | Does not enforce immutability                             | Efficient updates and imperative algorithms      | Aliasing bugs and destructive side effects   |
| Concurrency model   | ANSI does not standardize a modern concurrency system     | Implementations and libraries can adapt          | Portable concurrent code requires caution    |

This makes Common Lisp a language where **architecture matters early**. In a highly constrained language, many design choices are made by the compiler and type system. In Common Lisp, many choices are made by the programmer, the library author, the implementation, or the project convention.

### Relationship to adjacent languages — `Scheme`, `Racket`, `Clojure`, `Python`, `Java`, `Haskell`, `Rust`

Common Lisp is best understood by contrast.

Scheme is a smaller, more semantically elegant Lisp-family language with a strong educational and formal tradition. Common Lisp is larger, more industrial, more historically accreted, and more feature-rich.

Racket is a language-oriented programming platform with a strong module and language-building ecosystem. Common Lisp has powerful macros and reader mechanisms, but it does not have Racket’s same language-level module/language framework.

Clojure is a modern Lisp on hosted runtimes such as the JVM, with persistent immutable data structures, a strong emphasis on functional data transformation, and host interoperability. Common Lisp is not Clojure: it has CLOS, conditions, packages, different macro conventions, different runtime assumptions, and a different ecosystem history.

Python shares dynamic typing and interactive exploration, but Python’s metaprogramming model, module system, object model, and ecosystem culture differ significantly.

Java shares mature application development and object-oriented programming concerns, but Common Lisp’s CLOS model and dynamic compilation environment are very different.

Haskell and ML-family languages share functional abstraction concepts, but their static type systems, purity assumptions, and algebraic data modeling are not Common Lisp’s design center.

Rust shares a concern for performance and systems-level correctness, but Common Lisp relies on managed memory, dynamic typing, runtime checks, declarations, and programmer discipline rather than ownership/borrowing as a central static discipline.

| Adjacent language | Similarity                                                | Difference                                                                               | Common transfer failure                                     | Better mental model                                                                 |
| ----------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Scheme            | Lisp syntax, lexical scope, functions, macros             | Common Lisp is larger, less minimalist, has CLOS, packages, conditions, `loop`, `format` | Expecting Scheme-like uniform minimalism                    | Common Lisp is a standardized industrial Lisp, not a small core calculus.           |
| Racket            | Language-oriented programming, macros, Lisp-family syntax | Racket has a stronger language/module platform and different macro system traditions     | Expecting Racket-style language levels or module discipline | Common Lisp DSLs are powerful but organized through different conventions.          |
| Clojure           | Lisp syntax, macros, functional influence                 | Clojure emphasizes immutable persistent data and hosted runtime interop                  | Importing Clojure’s data model into CL                      | Common Lisp has broader mutable structures, CLOS, and condition/restart mechanisms. |
| Python            | Dynamic typing, REPL, flexible objects                    | Common Lisp has macros, packages, CLOS, image workflow, different syntax                 | Treating packages as modules and macros as decorators       | Think in evaluation forms, symbols, packages, and generic functions.                |
| Java              | Large systems and OOP concerns                            | CLOS uses generic functions and multiple dispatch                                        | Treating methods as owned by classes                        | Behavior belongs to generic functions specialized by arguments.                     |
| Haskell           | First-class functions and abstraction                     | Haskell’s static type system and purity are central; CL is dynamic and impure            | Expecting types to encode most invariants                   | Use runtime contracts, tests, declarations, and representation discipline.          |
| Rust              | Performance concern and explicit design                   | Rust’s ownership model has no direct CL equivalent                                       | Expecting compile-time lifetime enforcement                 | Reason about allocation, aliasing, mutation, and GC through runtime/cost model.     |

**Transfer Map**

| Source-language habit or concept | How it appears in Common Lisp                                       | What transfers                           | What changes                                                                | Common failure mode                                         | Better mental model                                                    |
| -------------------------------- | ------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------- |
| Python modules                   | Packages and ASDF systems                                           | Need for namespace and project structure | Namespace and build/load structure are separate                             | Assuming `defpackage` loads code                            | Packages control symbols; ASDF controls systems.                       |
| Java methods                     | CLOS methods                                                        | Polymorphic behavior                     | Methods specialize generic functions, not class-owned slots only            | Designing everything around class ownership                 | Put operations where generic dispatch is semantically useful.          |
| Scheme macros                    | Common Lisp macros                                                  | Syntax abstraction                       | CL macros are non-hygienic by default and live in CL’s package/symbol world | Accidental capture or symbol confusion                      | Use disciplined naming, gensyms, and expansion inspection.             |
| Clojure data maps                | Property lists, association lists, hash tables, structures, classes | Data-driven programming                  | CL has more mutable and nominal options                                     | Modeling everything as a hash table/list                    | Choose representation by invariants, access pattern, and API boundary. |
| Haskell algebraic modeling       | Types, structures, classes, conditions, predicates                  | Thinking in domain representations       | No built-in ADT/static pattern matching discipline                          | Expecting compiler-enforced exhaustiveness                  | Use explicit constructors, predicates, generic functions, and tests.   |
| Rust ownership                   | Mutation and aliasing discipline                                    | Cost and lifetime awareness              | GC and dynamic references replace borrow checking                           | Assuming the compiler prevents aliasing mistakes            | Treat destructive operations as API contracts.                         |
| JavaScript metaprogramming       | Macros, symbols, dynamic binding, CLOS MOP                          | Runtime flexibility                      | CL macro expansion is not runtime monkeypatching                            | Confusing compile-time transformation with runtime mutation | Separate read time, macro expansion time, compile time, and runtime.   |

### Common Lisp’s central abstractions — `forms`, `symbols`, `bindings`, `functions`, `macros`, `generic functions`, `conditions`

The smallest useful macro-level model of Common Lisp is not “lists.” It is this:

**A Common Lisp program is made of forms. Forms are read into objects. Some objects are symbols. Symbols live in packages. Forms are evaluated according to special rules. Some forms call functions. Some forms are special forms. Some forms expand macros. Functions close over lexical environments. Some variables are dynamically bound. Generic functions dispatch on runtime arguments. Conditions signal situations and may expose restarts.**

This model prevents several beginner-level and intermediate-level misunderstandings.

| Central abstraction | What it means                                                 | Why it matters                                   | Misleading simplification                   |
| ------------------- | ------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------- |
| Form                | An object meant to be evaluated                               | Evaluation rules begin here                      | “Everything is a function call”             |
| Symbol              | Named object with package identity and bindings/properties    | Names are objects, not just text                 | “Identifiers are just strings”              |
| Package             | Namespace for symbols                                         | Controls symbol visibility and identity          | “A package is a module”                     |
| Function            | Callable object in function position or via `funcall`/`apply` | Ordinary computation abstraction                 | “Every parenthesized form calls a function” |
| Special operator    | Built-in syntactic/evaluation rule                            | Some forms do not evaluate arguments normally    | “Evaluation is uniform for all lists”       |
| Macro               | Compile/expansion-time syntax transformer                     | Creates new surface language forms               | “A macro is a function that runs earlier”   |
| Generic function    | Dispatching operation with methods                            | CLOS behavior is operation-centered              | “A method belongs only to a class”          |
| Condition           | Object representing a situation/error/warning                 | Failure can be signaled and recovered from       | “Conditions are just exceptions”            |
| Restart             | Named recovery option                                         | Recovery choices can be separated from signaling | “Handling means catching and exiting”       |

**Interdisciplinary Lens: eval/apply**

What it clarifies: Common Lisp’s evaluation model, especially the difference between reading, evaluating, applying functions, and expanding macros.

Language feature involved: forms, special operators, function calls, `eval`, `apply`, macros, REPL development.

Practical consequence: the reader must learn to ask “is this form evaluated, applied, expanded, read, compiled, or loaded?” rather than treating all parentheses uniformly.

Limit of the lens: eval/apply explains the conceptual interpreter model, but real SBCL execution also involves compilation, optimization, type declarations, runtime representation, and implementation-specific behavior.

### Why S-expressions matter — `syntax`, `data`, `homoiconicity`, `reader`, `macro expansion`

Common Lisp’s surface syntax is often described as “code is data.” That phrase is useful but incomplete.

The precise idea is that Lisp source is read into ordinary Lisp data structures, especially symbols and lists, before evaluation or macro expansion. This makes program structure available for manipulation in a way that is unusually direct. But not all Common Lisp data is code, not all code is a list, not all lists are programs, and not all program behavior is captured by list structure alone.

For example, this surface expression:

```lisp
(+ 1 2)
```

is read as a list whose first element is the symbol `+` and whose remaining elements are numbers. If evaluated as a function call, it calls the function associated with `+`.

But this expression:

```lisp
(if condition then-form else-form)
```

is not an ordinary function call, because `if` is a special operator with non-uniform evaluation rules.

And this expression:

```lisp
(with-open-file (stream path)
  (read-line stream))
```

is typically a macro form. Its surface syntax is transformed into lower-level forms that manage resource setup and cleanup.

| Simplification                    | Where it helps                                          | Where it misleads                                                                                                    | Correct professional view                                                                      |
| --------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| “Everything is a list”            | Many compound forms are represented as lists.           | Symbols, numbers, strings, arrays, structures, classes, functions, pathnames, streams, and conditions are not lists. | Lisp code often uses list structure, but Common Lisp has a broad object system and data model. |
| “Code is data”                    | Macros and symbolic manipulation become understandable. | Evaluation rules, packages, reader behavior, and phase distinctions still matter.                                    | Source is read into data, and some data may be evaluated as code under specific rules.         |
| “Macros are functions on code”    | Macros receive forms and produce forms.                 | Macro expansion is not ordinary runtime calling; environments and phases matter.                                     | Macros are expansion-time syntactic transformations governed by macro expansion semantics.     |
| “Parentheses mean function calls” | Many lists evaluate as function calls.                  | Special forms and macros violate ordinary function-call evaluation.                                                  | Parentheses represent form structure; evaluation depends on the operator position.             |

**Common pitfall:** trying to understand Common Lisp syntax visually rather than structurally. The surface shape matters less than the first element of a form and the evaluation rule attached to that position.

### Why macros are central but dangerous — `syntax abstraction`, `phase separation`, `DSL`, `macro expansion`, `maintainability`

A function abstracts over values. A macro abstracts over forms before ordinary evaluation. That difference is the foundation of Common Lisp metaprogramming.

Ordinary functions cannot define new binding forms, control whether arguments are evaluated, introduce custom evaluation order, or create new syntactic constructs that behave like language features. Macros solve that problem by transforming surface forms into other forms.

The cost is that macros introduce phase complexity. A macro runs during expansion, not during the ordinary runtime execution of the code it expands into. Macro arguments are source forms, not already-evaluated values. A macro can accidentally capture names, hide control flow, obscure resource behavior, or create an embedded language whose rules are known only to its author.

| Need                          | Function enough?                         | Macro justified?  | Example category                                     | Risk                                            |
| ----------------------------- | ---------------------------------------- | ----------------- | ---------------------------------------------------- | ----------------------------------------------- |
| Compute from evaluated values | Yes                                      | Usually no        | Numeric processing, collection transformation        | Macro would add needless opacity.               |
| Delay or control evaluation   | No                                       | Often yes         | `if`-like forms, resource forms, conditional binding | Hidden evaluation rules can surprise readers.   |
| Introduce binding syntax      | No                                       | Often yes         | `with-*` forms, local DSLs                           | Name capture and unclear scope.                 |
| Remove repetitive boilerplate | Sometimes                                | Sometimes         | Definition-generating forms                          | Generated code can become hard to inspect.      |
| Build domain syntax           | No, if syntax is essential               | Sometimes         | Query DSL, parser DSL, testing DSL                   | Private language may reduce maintainability.    |
| Optimize compiler behavior    | Function maybe; compiler macro sometimes | Context-dependent | `compiler-macro`, declarations                       | Non-portable or compiler-dependent assumptions. |

**Failure-first explanation: macros are not faster functions**

The tempting but wrong model is: “Use a macro when a function is too slow or when code should be more advanced.”

The surprising behavior is that a macro may produce worse code, less readable code, or code with bugs that are harder to debug. A macro does not automatically optimize anything; it only rewrites forms.

The correct semantic explanation is that a macro is a syntactic transformer. It decides what code will exist after expansion. Runtime performance depends on the generated code, compiler behavior, declarations, and runtime representation.

The professional rule of thumb is: **write a function unless the abstraction must control evaluation, introduce binding, define syntax, or generate code whose structure cannot be expressed cleanly with functions.**

The boundary changes when building frameworks or DSLs. There, macros may be the cleanest way to represent domain semantics, but the macro’s expansion contract must remain inspectable and teachable.

### Common Lisp’s object model — `CLOS`, `generic functions`, `methods`, `multiple dispatch`, `method combination`

Common Lisp’s object system, CLOS, is one of the language’s defining features. It is not a minor add-on and should not be interpreted through Java or C++ alone.

In many class-based OOP languages, methods are conceptually owned by classes. In Common Lisp, behavior is centered on **generic functions**. A generic function is an operation, and methods specialize that operation for particular argument types. This allows polymorphism to depend on multiple arguments, not only on a receiver object.

This model fits Common Lisp’s open, extensible personality. New methods can be added to existing generic functions. Behavior can be organized around operations rather than being sealed inside one class hierarchy.

| OOP dimension        | Common Lisp CLOS                                                 | Java/C++-style intuition                        | Practical consequence                                                    |
| -------------------- | ---------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------ |
| Method ownership     | Methods belong to generic functions                              | Methods belong to classes                       | Think operation-first, not receiver-first.                               |
| Dispatch             | Multiple dispatch is central                                     | Usually single dispatch                         | Method selection can depend on several arguments.                        |
| Extensibility        | Generic functions can be extended                                | Extension often tied to class hierarchy         | Protocol design matters.                                                 |
| Combination          | Method combination supports before/after/around/primary behavior | Often manual superclass chaining or annotations | Cross-cutting behavior can be structured, but can also become subtle.    |
| Metaobject awareness | MOP tradition exists, though not all details are ANSI-standard   | Reflection/introspection varies by language     | Advanced customization is possible but should be postponed until needed. |

**Common pitfall:** treating CLOS as “Common Lisp’s class syntax.” CLOS is better understood as a dispatch and protocol system. Classes matter, but generic functions are the architectural center.

### Error and recovery model — `condition`, `handler`, `restart`, `interactive recovery`, `unwind-protect`

Common Lisp’s condition system is a major design feature, not merely an exception mechanism with a different name.

Ordinary exception systems often conflate three activities: signal that something happened, choose who handles it, and determine how control exits or resumes. Common Lisp separates these more explicitly. A condition can be signaled; handlers can observe or respond; restarts can provide named recovery strategies.

This matters especially in interactive and layered systems. Low-level code can signal a condition and offer restarts such as “use another value,” “retry,” or “skip this item.” Higher-level code or the interactive debugger can choose a recovery strategy.

| Mechanism        | Role                                                    | Professional meaning                             | Common confusion                                  |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------- |
| Condition        | Object representing an exceptional or notable situation | Carries structured information about the problem | “Condition equals exception”                      |
| Handler          | Code that responds to a signaled condition              | Separates recognition from recovery              | “Handling always exits”                           |
| Restart          | Named recovery option                                   | Lets lower layers expose recovery choices        | “Recovery must be hardcoded where error occurs”   |
| `unwind-protect` | Cleanup guarantee mechanism                             | Ensures cleanup during nonlocal exits            | “Resource cleanup is automatic because GC exists” |
| `with-*` macros  | Scoped resource patterns                                | Encapsulate setup/cleanup idioms                 | “Macros are just cosmetic wrappers”               |

**Failure-first explanation: GC does not manage every resource**

The tempting but wrong model is: “Common Lisp has garbage collection, so resources clean themselves up.”

The surprising behavior is that files, sockets, locks, foreign resources, transactions, and temporary state may outlive the intended scope if cleanup is not explicit.

The correct explanation is that garbage collection manages memory reclamation, not arbitrary resource protocol completion. Resource cleanup requires constructs such as `unwind-protect` and higher-level macros such as `with-open-file`.

The professional rule of thumb is: **use scoped resource macros whenever a resource has a non-memory lifetime.**

The boundary changes for pure memory objects. Ordinary conses, vectors, strings, and many heap objects are managed by GC, but external resources need explicit lifetime structure.

### Runtime and workflow personality — `REPL`, `image`, `compile`, `load`, `FASL`, `state`, `debugger`

Common Lisp development is not only a matter of editing files and running scripts. The workflow often involves a live image, a REPL, incremental compilation, interactive debugging, dynamic redefinition, and system loading.

This gives the language a distinctive rhythm. A developer can inspect a running system, redefine a function, recompile a method, test a macro expansion, invoke a restart, or examine compiler notes without restarting everything.

The risk is that the live image can become a hidden part of the program. A function may exist in the image but not in source control. A package may contain old symbols. A macro may be redefined but dependent compiled code may not be recompiled. A test may pass in a warm image and fail in a clean one.

| Workflow feature        | Capability gained                         | Cost introduced                              | Professional discipline                                        |
| ----------------------- | ----------------------------------------- | -------------------------------------------- | -------------------------------------------------------------- |
| REPL                    | Immediate evaluation and inspection       | Can encourage fragmented experiments         | Keep source files authoritative.                               |
| Incremental compilation | Fast feedback on functions and methods    | Old compiled definitions may remain          | Recompile dependent systems when semantics change.             |
| Image-based state       | Long-lived interactive environment        | Hidden definitions and stale state           | Restart regularly and test from clean images.                  |
| Interactive debugger    | Inspect conditions, frames, restarts      | Can mask error policy if only fixed manually | Convert learned recovery into source-level design.             |
| ASDF loading            | Systematic build/load order               | Misunderstood if treated as import syntax    | Define systems deliberately and keep packages separate.        |
| Implementation notes    | Compiler feedback about types/performance | Implementation-specific interpretation       | Treat SBCL notes as valuable but non-portable unless isolated. |

**Common pitfall:** believing that if something works at the REPL, it is correctly represented in the project. Professional Common Lisp code must be reproducible from source, ASDF system definitions, and known dependencies.

### Standard library and ecosystem personality — `large standard`, `small ecosystem`, `ASDF`, `Quicklisp`, `portability`

Common Lisp’s standard library is large compared with many minimalist languages. It includes extensive facilities for sequences, arrays, hash tables, packages, pathnames, streams, printing, formatting, conditions, CLOS, numeric operations, symbols, reader/printer behavior, and more.

At the same time, its modern ecosystem is smaller than Python, JavaScript, Java, or Rust. This produces a distinctive practical pattern: much can be done with the standard language, but modern tasks such as HTTP services, JSON, advanced testing, logging, system interaction, deployment, and concurrency portability rely on ecosystem libraries and implementation-specific behavior.

| Area                | Standard Common Lisp status        | Ecosystem/implementation role                                  | Practical consequence                                      |
| ------------------- | ---------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------- |
| Collections         | Strong standard support            | Libraries may add utilities                                    | Know lists, vectors, arrays, hash tables, sequences first. |
| Objects             | CLOS standardized                  | MOP details vary by implementation/library                     | Learn generic functions before advanced metaobject work.   |
| Errors              | Condition system standardized      | Libraries define condition hierarchies and restart conventions | Error design is part of API design.                        |
| Files and paths     | Pathnames and streams standardized | Practical path behavior can be implementation-sensitive        | Treat pathnames carefully and learn UIOP later.            |
| Systems/build       | Not core syntax                    | ASDF central                                                   | Project organization requires ASDF literacy.               |
| Dependencies        | Not standardized                   | Quicklisp central                                              | Library use requires dependency workflow knowledge.        |
| Threads/concurrency | Not uniformly ANSI-standardized    | SBCL threads, Bordeaux-Threads, other libraries                | Portable concurrency needs explicit abstraction.           |
| Deployment          | Not standardized uniformly         | Implementation tools, image dumping, Roswell-like workflows    | Deployment must be planned per implementation.             |

**Design consequence:** Common Lisp feels “batteries included” in some deep language areas and “ecosystem-mediated” in many modern application areas. A serious tutorial must therefore teach both the standard and the practical ecosystem.

### Strengths, weaknesses, and tradeoffs — `expressiveness`, `control`, `safety`, `performance`, `tooling`, `maintainability`

The central tradeoff of Common Lisp is not simplicity versus complexity in the abstract. It is **expressiveness and interactive control versus enforced uniformity and static guarantees**.

| Strength                 | Capability gained             | Cost introduced                                       | Misuse encouraged                           | Best fit                                     |
| ------------------------ | ----------------------------- | ----------------------------------------------------- | ------------------------------------------- | -------------------------------------------- |
| Uniform form structure   | Easy syntactic manipulation   | Unfamiliar notation                                   | Treating all forms as ordinary calls        | Macro systems, symbolic code                 |
| Dynamic typing           | Flexible and fast iteration   | Fewer static guarantees                               | Late discovery of domain errors             | Exploratory and evolving systems             |
| Optional declarations    | Performance and documentation | Declarations can be wrong or implementation-sensitive | Treating declarations as full static typing | Optimized mature code                        |
| CLOS                     | Extensible polymorphism       | Dispatch complexity                                   | Over-generic architecture                   | Protocol-heavy domains                       |
| Condition/restart system | Rich recovery model           | More concepts than exceptions                         | Over-designed error flows                   | Interactive and robust systems               |
| REPL/image workflow      | Rapid feedback                | Hidden state                                          | Non-reproducible development                | Exploratory programming, live systems        |
| Macros                   | Syntactic abstraction         | Phase/readability complexity                          | Private languages everywhere                | DSLs, control forms, boilerplate elimination |
| Managed memory           | Less manual memory burden     | Allocation/GC costs                                   | Ignoring consing                            | Symbolic and high-level systems              |

| Weakness or friction point | Why it exists                                                              | Mitigation                                                                                 |
| -------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Smaller modern ecosystem   | Common Lisp is mature but not currently mainstream at Python/JS/Rust scale | Choose libraries carefully; understand ASDF/Quicklisp; avoid unnecessary dependency churn. |
| Tooling variability        | Multiple implementations and editor setups                                 | Use stable workflows such as SBCL + SLIME/SLY + ASDF; document assumptions.                |
| Macro opacity              | Macros are powerful enough to hide semantics                               | Keep macros small, inspect expansions, document evaluation rules.                          |
| Portability issues         | ANSI leaves many modern runtime concerns unspecified                       | Separate portable core from implementation-specific layer.                                 |
| Static analysis limits     | Dynamic semantics and macros complicate analysis                           | Use tests, declarations, compiler notes, contracts, and code review.                       |
| Learning curve             | Several unusual mechanisms interact                                        | Learn evaluation, symbols/packages, macros, CLOS, and conditions as a connected system.    |

### Mature, emerging, overhyped, and declining trends — `SBCL`, `ASDF`, `Quicklisp`, `SLIME`, `SLY`, `Roswell`, `lisp-flavored DSLs`

Common Lisp is a mature language with stable foundations rather than a language undergoing rapid standard evolution. Its trends are mostly ecosystem, tooling, deployment, and implementation trends rather than changes to the core language.

| Trend category   | Trend                                             | Status                                   | Driving pressure                                                    | Caveat                                                     |
| ---------------- | ------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------- |
| Mature           | SBCL as a default serious implementation          | Strong practical default                 | Performance, open-source availability, compiler quality             | SBCL behavior is not identical to ANSI semantics.          |
| Mature           | ASDF-based system organization                    | Central                                  | Need for portable system definition and loading                     | ASDF is not the same as a package system.                  |
| Mature           | Quicklisp for dependency acquisition              | Central in practice                      | Need to access libraries conveniently                               | Reproducibility and dependency pinning require extra care. |
| Mature           | Emacs + SLIME/SLY workflow                        | Established                              | REPL-integrated development                                         | Editor-specific workflow can be unfamiliar.                |
| Emerging/active  | Better deployment workflows                       | Practical interest                       | Need for executables, scripts, containers, reproducible builds      | Deployment remains implementation- and workflow-specific.  |
| Emerging/active  | Portability libraries and modern utility layers   | Practical need                           | ANSI does not cover all modern OS/network/concurrency needs         | Library quality and maintenance vary.                      |
| Emerging/active  | Use of Common Lisp for niche high-control systems | Stable niche                             | Need for interactive development and symbolic/metaprogramming power | Ecosystem size limits some application domains.            |
| Overhyped        | “Macros solve architecture”                       | Misleading                               | Desire to remove boilerplate                                        | Macros can damage maintainability if they hide semantics.  |
| Overhyped        | “Lisp is only good for AI”                        | Historically understandable but false    | Old association with symbolic AI                                    | Modern CL is broader, but not mainstream everywhere.       |
| Declining/legacy | Treating CL only as a historical curiosity        | Incorrect as a technical judgment        | Mainstream language fashion                                         | The language remains technically important, though niche.  |
| Declining/legacy | Uncontrolled reader macro cleverness              | Usually discouraged in maintainable code | Desire for custom syntax                                            | Reader-level changes can hurt readability and tooling.     |

**Practical trend judgment:** Common Lisp’s core language is stable. The moving parts are implementation versions, libraries, editor integration, deployment methods, portability conventions, and community-maintained tools. Learning Common Lisp is therefore less about chasing new syntax and more about understanding durable mechanisms deeply.

### Interdisciplinary placement decision — `lambda calculus`, `homoiconicity`, `macro systems`, `eval/apply`, `language-oriented programming`

Because the supplied lenses are central to Common Lisp’s identity, this guide should include a dedicated supplemental chapter after Part 1:

`## PART X — Interdisciplinary Foundations for Understanding Common Lisp`

That chapter should not replace the ordinary tutorial structure. It should prepare the reader for later parts by explaining the minimum theory needed to understand functions, closures, evaluation, S-expressions, macros, compile-time/runtime separation, DSLs, and REPL-centered development.

A concise lens map belongs here to establish why those lenses are useful.

| Lens or external field        | Core idea                                                             | Language features clarified                                      | Practical programming consequence                                                  | Where it appears in the guide  | Limit of the lens                                                                                             |
| ----------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Lambda calculus               | Computation through binding, abstraction, and application             | Functions, closures, lexical scope, higher-order programming     | Helps explain why functions capture environments and why binding structure matters | PART X, PART 4, PART 7         | Common Lisp is not pure lambda calculus; it has mutation, dynamic variables, objects, conditions, and macros. |
| Homoiconicity                 | Program structure can be represented as ordinary data                 | S-expressions, quoting, quasiquoting, macros, code-as-data       | Helps explain why syntax transformation is direct in Lisp                          | PART X, PART 2, PART 4         | “Code is data” does not erase evaluation rules, packages, phases, or non-list objects.                        |
| Macro-system theory           | Syntax can be abstracted by expansion before ordinary evaluation      | Macros, compiler macros, DSLs, control forms                     | Helps decide when functions are insufficient and when macros are justified         | PART X, PART 4, PART 9         | Macro power can reduce readability and tooling clarity.                                                       |
| Eval/apply model              | Evaluation and function application are distinct interpreter concepts | Forms, special operators, function calls, `eval`, `apply`, REPL  | Helps diagnose “what is evaluated when?”                                           | PART X, PART 2, PART 7         | Real implementations compile and optimize; not all execution is literal interpretation.                       |
| Language-oriented programming | Build small languages inside the host language                        | DSLs, `loop`, `format`, macros, reader-level mechanisms          | Helps explain Common Lisp’s abstraction culture                                    | PART X, PART 4, PART 6, PART 9 | Not every abstraction should become a language; opaque DSLs can harm maintenance.                             |
| Compiler theory               | Source forms become expanded, compiled, optimized code                | Macro expansion, declarations, compiler notes, SBCL optimization | Helps connect dynamic language code to performance                                 | PART 7, PART 9                 | Implementation behavior must not be confused with ANSI semantics.                                             |
| Software engineering          | Abstraction boundaries and maintainability                            | Packages, ASDF systems, APIs, macros, CLOS protocols             | Helps prevent clever but unmaintainable Lisp                                       | PART 5, PART 9                 | Engineering conventions vary across projects.                                                                 |
| Security engineering          | Dynamic evaluation and reading require trust boundaries               | `read`, `eval`, reader macros, external input                    | Helps identify unsafe input and code-loading patterns                              | PART 5, PART 7, PART 9         | Security depends on deployment context and library choices, not just core language semantics.                 |

**Common pitfall:** over-theorizing Lisp. Lambda calculus and homoiconicity are useful lenses, but Common Lisp is a real standardized language with pathnames, streams, CLOS, conditions, packages, declarations, compiler notes, ecosystem tools, deployment workflows, and legacy constraints. Theory clarifies mechanisms; it does not replace practical reference.

### Macro-level mental model for the rest of the guide — `semantic map`, `discipline`, `tradeoff judgment`

The rest of the tutorial should build from this Part 1 model:

Common Lisp is a **large, standardized, dynamic, compiled, interactive, multi-paradigm Lisp**. Its essential mechanisms are not isolated features; they form a system.

S-expressions make program structure explicit. The reader turns text into objects. Evaluation gives forms meaning. Symbols connect names to packages and bindings. Functions abstract runtime computation. Macros abstract syntax before ordinary evaluation. CLOS organizes extensible behavior through generic functions. Conditions and restarts organize failure and recovery. ASDF organizes systems. SBCL gives a serious compiler/runtime target. Quicklisp connects the language to its practical library ecosystem.

That system rewards programmers who can reason across layers: syntax, evaluation, binding, representation, abstraction, compilation, runtime cost, resource lifetime, package boundaries, system loading, and interactive state.

It punishes programmers who import the wrong model: treating packages as modules, macros as faster functions, lists as universal data structures, dynamic typing as lack of type discipline, garbage collection as resource management, REPL success as reproducible correctness, or SBCL behavior as always portable Common Lisp.

| Future part | What Part 1 prepares                                                                     | Main question carried forward                                                             |
| ----------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| PART 2      | Reading forms, symbols, binding, equality, packages, basic control, and primitive syntax | What does this code mean at the surface and primitive semantic level?                     |
| PART 3      | Choosing representations under a dynamic but strongly typed data model                   | What should this domain value be represented as?                                          |
| PART 4      | Choosing functions, closures, macros, CLOS, and composition mechanisms                   | What abstraction mechanism fits this behavior?                                            |
| PART 5      | Separating names, systems, errors, resources, effects, and trust boundaries              | Where are the program’s boundaries and guarantees?                                        |
| PART 6      | Mapping standard library and ecosystem tools to practical tasks                          | Which standard or ecosystem facility solves this task?                                    |
| PART 7      | Explaining runtime, compilation, memory, evaluation, and concurrency behavior            | Why does this program behave and cost what it does?                                       |
| PART 8      | Understanding why the language evolved this way                                          | Which design choices are historical, durable, or context-dependent?                       |
| PART 9      | Turning knowledge into professional workflow                                             | How should serious Common Lisp code be built, tested, debugged, reviewed, and maintained? |
| PART 10     | Connecting structured learning to expert judgment                                        | What remains after the tutorial, and how does expertise develop?                          |

The governing principle for the whole guide is:

**Common Lisp gives more language-shaping power than most mainstream languages. The price of that power is that more semantic, architectural, and maintenance discipline must come from the programmer, the project, and the implementation-aware workflow.**
## PART 2 — Core Syntax and Semantic Primitives Reference

### Reading Common Lisp source — `reader`, `forms`, `objects`, `evaluation`, `read time`

Common Lisp source should be understood in layers. The text in a file or REPL is not evaluated directly as characters. It is first read by the **reader** into Lisp objects. Those objects may then be evaluated as **forms**. This is one of the central reasons Lisp syntax feels different from syntax in C-like languages.

A simplified pipeline is:

```lisp
text characters
  -> reader
  -> Lisp objects
  -> evaluator / compiler
  -> runtime behavior
```

This distinction matters because some behavior happens before evaluation. Package prefixes, symbol creation, string syntax, number syntax, quote syntax, comments, reader conditionals, and reader macros are handled at read time, not ordinary runtime.

| Layer                    | What happens                                    | Example                                                    | Design meaning                    | Common pitfall                                                  |
| ------------------------ | ----------------------------------------------- | ---------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------- |
| Character text           | Source exists as text                           | `"(+ 1 2)"`                                                | External representation           | Treating source text as if evaluation reads characters directly |
| Reader                   | Text becomes Lisp objects                       | `(+ 1 2)` becomes a list containing symbol `+` and numbers | Syntax is data-oriented           | Forgetting that packages affect symbol reading                  |
| Macro expansion          | Macro forms may be transformed                  | `(when x y)` expands into lower-level forms                | Syntax abstraction before runtime | Treating macros as runtime function calls                       |
| Evaluation / compilation | Forms receive meaning                           | `(+ 1 2)` calls the function named by `+`                  | Runtime semantics                 | Assuming all lists evaluate the same way                        |
| Runtime                  | Values, effects, conditions, allocations happen | result `3`                                                 | Program execution                 | Confusing expansion-time and runtime behavior                   |

A **form** is any object meant to be evaluated. Some forms are self-evaluating. Some forms are symbols. Some forms are compound lists whose first element determines the evaluation rule.

| Form kind              | Example               | Evaluation behavior                             | Notes                                                                                                     |
| ---------------------- | --------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Self-evaluating object | `42`, `"abc"`, `#\A`  | Evaluates to itself                             | Numbers, characters, strings, pathnames, arrays, and similar literal objects are usually self-evaluating. |
| Symbol                 | `x`                   | Evaluates as a variable reference               | The symbol names a binding in an environment.                                                             |
| Special form           | `(if test then else)` | Uses special evaluation rules                   | Not all subforms are evaluated uniformly.                                                                 |
| Function call          | `(+ 1 2)`             | Evaluates arguments, then calls function        | Ordinary call rule.                                                                                       |
| Macro form             | `(when test body...)` | Expanded first, then the expansion is evaluated | Macro arguments are source forms, not evaluated values.                                                   |

```lisp
(+ 1 2)
;; Function call:
;; 1 and 2 are evaluated, then + is called.

(if (> x 0)
    "positive"
    "not positive")
;; Special form:
;; only one branch is evaluated.

(when (> x 0)
  (print x))
;; Macro form:
;; WHEN expands into lower-level conditional code.
```

**Language-design note:** Common Lisp syntax is small at the surface but not semantically uniform. The reader gives a uniform representation; the evaluator gives different meanings depending on whether the form is a symbol, a special operator form, a macro form, or an ordinary function call.

**Common Pitfalls**

The most common error is assuming that every parenthesized form is a function call. This fails immediately for `if`, `let`, `quote`, `function`, `setq`, `progn`, `block`, `return-from`, `tagbody`, `go`, `catch`, `throw`, `unwind-protect`, `eval-when`, `locally`, `symbol-macrolet`, `flet`, `labels`, `macrolet`, and macro forms such as `when`, `unless`, `loop`, `with-open-file`, and `defun`.

A second common error is treating the reader as harmless. The reader can intern symbols, interpret package prefixes, process dispatch syntax, and be affected by reader variables. For trusted program source this is normal. For untrusted input, it is a boundary that must be handled carefully.

### Lexical structure — `case folding`, `tokens`, `whitespace`, `escaping`, `readtable`

Common Lisp’s lexical structure is reader-driven. Whitespace separates tokens. Parentheses delimit lists. Semicolons introduce line comments. Double quotes delimit strings. Single quote, backquote, comma, comma-at, sharp-sign dispatch syntax, package markers, and character syntax are reader-level notation.

By default, the Common Lisp reader normally uppercases unescaped symbol names. This surprises readers coming from case-sensitive languages.

```lisp
foo
FOO
Foo

;; By default, these usually read as the same symbol:
;; FOO
```

To preserve case or include unusual characters in symbol names, vertical bars can be used:

```lisp
|foo|
|Foo|
|symbol with spaces|
|This-Is-A-Different-Symbol-Name|
```

This does not mean Common Lisp is incapable of lowercase names. It means ordinary unescaped source symbols are normalized by the reader’s case rules.

| Surface syntax | Read result intuition                    | Meaning                        | Practical consequence                                                       |                |                                                                 |
| -------------- | ---------------------------------------- | ------------------------------ | --------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------- |
| `foo`          | symbol named `FOO` in current package    | Ordinary symbol token          | Conventional source often appears lowercase but reads uppercase internally. |                |                                                                 |
| `FOO`          | same symbol as `foo` by default          | Same ordinary symbol           | Case is not normally semantically distinct for unescaped names.             |                |                                                                 |
| `              | foo                                      | `                              | symbol named exactly `foo`                                                  | Escaped symbol | Useful for interop or unusual names, but avoid unnecessary use. |
| `abc:def`      | external symbol `DEF` from package `ABC` | Package-qualified symbol       | Requires symbol to be exported.                                             |                |                                                                 |
| `abc::def`     | internal symbol `DEF` from package `ABC` | Internal package access        | Usually a sign of reaching into implementation details.                     |                |                                                                 |
| `:keyword`     | symbol in keyword package                | Self-evaluating keyword symbol | Common for named options and property indicators.                           |                |                                                                 |

**Canonical example**

```lisp
(list 'foo 'FOO 'Foo)
;; Usually produces a list of the same symbol three times.

(list '|foo| '|FOO| '|Foo|)
;; Produces three distinct symbols if their exact names differ.
```

**Language-design note:** Common Lisp separates the textual appearance of a name from the symbol object produced by the reader. This is essential for understanding packages, symbol identity, macro expansion, and generated code.

**Common Pitfalls**

A common pitfall is assuming that `foo`, `Foo`, and `FOO` are distinct ordinary identifiers. They are usually not distinct under the standard readtable case behavior.

Another pitfall is using escaped symbols as a naming style. That can make code harder to type, inspect, and integrate with normal Lisp conventions. Escaped symbols are appropriate for interop, generated code, unusual external names, or exact symbolic data, not ordinary internal style.

### Comments and documentation — `;`, `#|...|#`, `docstring`, `documentation`

Common Lisp has line comments, block comments, and conventional documentation strings.

| Construct              | Syntax                            | Scope                                                                                          | Canonical use                                          | Common pitfall                                                                      |                                              |                             |
| ---------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------- | --------------------------- |
| Line comment           | `; comment`                       | Until end of line                                                                              | Short local note                                       | Explaining obvious code instead of intent                                           |                                              |                             |
| Stronger line comments | `;;`, `;;;`, `;;;;`               | Convention-based                                                                               | Section/file-level comments depending on project style | Treating semicolon count as semantic                                                |                                              |                             |
| Block comment          | `#                                | ...                                                                                            | #`                                                     | Can span multiple lines; nestable in Common Lisp                                    | Temporarily commenting regions or long notes | Leaving stale disabled code |
| Docstring              | String after definition header    | Attached to functions, classes, generic functions, variables, etc., depending on defining form | Public API documentation                               | Writing implementation comments as public docs                                      |                                              |                             |
| Documentation access   | `(documentation 'name 'function)` | Runtime query where supported                                                                  | Inspecting documentation                               | Assuming all implementations preserve every docstring in every optimization setting |                                              |                             |

```lisp
(defun square (x)
  "Return X multiplied by itself."
  (* x x))
```

The string immediately after the function parameter list is a docstring. It documents the function; it is not merely a comment.

```lisp
#|
This is a block comment.
It can span multiple lines.
#|

This nested block comment is also valid.

|#
|#
```

**Documentation style rule:** use docstrings for public contracts: what the function, class, generic function, condition, or variable means. Use comments for local reasoning: why an implementation does something non-obvious.

**Common Pitfalls**

One pitfall is using comments to compensate for unclear names or bad abstraction. Another is putting essential API information only in comments rather than docstrings. In REPL-centered development, docstrings are inspectable and therefore more useful for public definitions.

### Naming conventions — `earmuffs`, `predicate`, `destructive`, `conversion`, `special variable`

Common Lisp naming conventions carry semantic information. These conventions are not merely style; they help readers infer evaluation, mutability, and intended use.

| Convention                                     | Example                             | Meaning                                  | Practical consequence                                     |
| ---------------------------------------------- | ----------------------------------- | ---------------------------------------- | --------------------------------------------------------- |
| Hyphen-separated names                         | `read-line`, `hash-table-count`     | Normal multiword names                   | Prefer this over camelCase or snake_case.                 |
| Predicate ending in `p`                        | `numberp`, `stringp`, `endp`        | Returns generalized boolean              | Usually returns true/non-`nil` or `nil`.                  |
| Predicate with `-p` in user code               | `valid-user-p`                      | Common user naming style                 | More readable for compound names.                         |
| Destructive operation starting with `n`        | `nreverse`, `nconc`                 | May reuse or modify structure            | Caller must not assume original structure is preserved.   |
| Conversion using `->` is not standard CL style | `string->number`                    | Scheme/Racket style                      | Not idiomatic Common Lisp, though projects may choose it. |
| Special variable earmuffs                      | `*standard-output*`, `*print-case*` | Dynamically scoped special variable      | Signals dynamic binding and global-ish configuration.     |
| Constant earmuffs sometimes avoided            | `+buffer-size+`                     | Project convention for constants         | Not a universal standard, but common in some codebases.   |
| Internal helper with `%`                       | `%parse-token`                      | Implementation/private helper convention | Project-specific, not enforced by language.               |

```lisp
(defparameter *limit* 10)

(defun valid-limit-p (x)
  (and (integerp x)
       (plusp x)))

(defun normalize-name (name)
  (string-downcase name))
```

**Language-design note:** Common Lisp has a long-lived culture of semantic naming. The language allows almost any symbol names, but readable professional code uses naming to communicate whether something is a predicate, special variable, destructive operation, internal helper, or public API.

**Common Pitfalls**

A common pitfall is importing naming styles from JavaScript, Python, Java, or Scheme without adapting them. `camelCase`, `snake_case`, and Scheme-style `!` mutation markers are not idiomatic Common Lisp. Some projects use them for interop or local convention, but standard Common Lisp code overwhelmingly uses hyphenated names.

### Symbols and packages at syntax level — `symbol`, `package`, `keyword`, `interning`, `external symbol`

A symbol is not just a textual identifier. A symbol is an object with a name, package identity, optional value binding, optional function binding, property list, and other roles depending on context. Symbols are central to Common Lisp because they are used for variable names, function names, type names, class names, keywords, operators, macro names, package exports, and symbolic data.

Packages are namespaces for symbols. A package controls which symbol a textual name reads as. This does not mean packages are modules. They do not by themselves load files or define dependency order.

| Syntax     | Meaning                                                                     | Example                     | Practical use                      | Common pitfall                             |
| ---------- | --------------------------------------------------------------------------- | --------------------------- | ---------------------------------- | ------------------------------------------ |
| `foo`      | Symbol named `FOO` in current package, unless accessible from used packages | `foo`                       | Normal names                       | Forgetting current package affects reading |
| `pkg:foo`  | External symbol `FOO` exported by package `PKG`                             | `cl:car`                    | Public API access                  | Error if symbol is not exported            |
| `pkg::foo` | Internal symbol `FOO` in package `PKG`                                      | `some-lib::internal-helper` | Debugging or implementation access | Coupling to internals                      |
| `:foo`     | Keyword symbol `:FOO`                                                       | `:name`                     | Option names, property keys        | Mistaking keywords for strings             |
| `#:foo`    | Uninterned symbol                                                           | `#:temp`                    | Generated symbols, printed gensyms | Expecting package identity                 |

```lisp
(list :name "Ada" :age 36)
;; Keyword symbols are commonly used as property indicators.

(defun describe-user (&key name age)
  (format t "~A is ~A years old.~%" name age))

(describe-user :name "Ada" :age 36)
```

Keywords evaluate to themselves:

```lisp
:name
;; => :NAME
```

Ordinary symbols are evaluated as variable references:

```lisp
name
;; Looks up the value bound to NAME in the current lexical/dynamic environment.
```

**Failure-first explanation: symbols are not strings**

The tempting but wrong mental model is: “A symbol is just a string used as an identifier.”

The surprising behavior is that two symbols can have the same printed name but be different objects if they belong to different packages or are uninterned. Conversely, repeated occurrences of the same accessible symbol name may refer to the same interned symbol.

The correct semantic explanation is that the reader maps textual tokens to symbol objects, using package rules.

The professional rule of thumb is: **when symbol identity matters, reason about both the symbol name and the symbol’s package.**

The boundary changes for strings. Strings compare by character content and are not interned names by default. Symbols are name-bearing objects used by the language itself.

**Common Pitfalls**

The most damaging package-level pitfall is using `pkg::internal-name` casually. Double-colon access reaches into non-exported implementation details. It may be useful during debugging, but it creates brittle dependencies.

Another pitfall is using keywords as if they were ordinary mutable variables. Keywords are self-evaluating symbols in the keyword package and are conventionally used as stable indicators, not local storage.

### Basic package forms — `defpackage`, `in-package`, `use`, `export`, `shadow`

Package mechanics are deep enough to deserve more treatment in Part 5, but the basic syntax is needed early because package forms appear at the top of nearly every real Common Lisp file.

A typical file may begin like this:

```lisp
(defpackage #:example.math
  (:use #:cl)
  (:export #:square
           #:cube))

(in-package #:example.math)

(defun square (x)
  (* x x))

(defun cube (x)
  (* x x x))
```

| Construct      | Meaning                                                | Typical location                    | Design meaning                            | Common pitfall                             |
| -------------- | ------------------------------------------------------ | ----------------------------------- | ----------------------------------------- | ------------------------------------------ |
| `defpackage`   | Defines or updates a package                           | Package definition file or file top | Declares symbol namespace policy          | Thinking it loads implementation code      |
| `in-package`   | Sets current package for subsequent reading/evaluation | File top after package exists       | Controls how unqualified symbols are read | Forgetting it affects the rest of the file |
| `:use`         | Makes external symbols from another package accessible | Usually `(:use #:cl)`               | Imports public names for unqualified use  | Overusing `:use` creates name conflicts    |
| `:export`      | Marks symbols as public external symbols               | Public API declaration              | Controls `pkg:symbol` access              | Exporting internals too early              |
| `:import-from` | Imports specific external symbols                      | Controlled dependency               | More explicit than broad `:use`           | Not tracking symbol conflicts              |
| `:shadow`      | Creates local symbols that override inherited names    | Rare but sometimes necessary        | Handles intentional name collision        | Shadowing standard CL names accidentally   |

**Professional convention:** many projects use package names like `my-system/core`, `my-system.parser`, or `org.example.project`. The exact naming convention varies. What matters is that packages express namespace boundaries, while ASDF systems express build/load organization.

**Common Pitfalls**

A frequent failure is putting `(in-package ...)` before the relevant package exists. Another is assuming that `defpackage` defines functions. It defines a namespace policy; the functions are defined by subsequent forms such as `defun`, `defgeneric`, `defmethod`, `defclass`, and so on.

A more subtle failure is exporting too much. In Common Lisp, exported symbols are public API signals. Exporting everything makes it harder to distinguish supported interfaces from implementation details.

### Literals and self-evaluating objects — `number`, `character`, `string`, `array`, `pathname`, `keyword`

Many literal objects evaluate to themselves. This is different from symbols, which generally evaluate as variable references unless quoted or self-evaluating by convention, as keywords are.

| Literal kind   | Example             | Evaluation result   | Notes                                                                 |
| -------------- | ------------------- | ------------------- | --------------------------------------------------------------------- |
| Integer        | `42`                | `42`                | Arbitrary precision integers are part of Common Lisp’s numeric tower. |
| Ratio          | `2/3`               | `2/3`               | Exact rational number.                                                |
| Float          | `3.14`, `1.0d0`     | Float value         | Float format depends on notation and implementation support.          |
| Complex number | `#C(1 2)`           | Complex value       | Real and imaginary parts.                                             |
| Character      | `#\A`, `#\Space`    | Character object    | Character names are reader syntax.                                    |
| String         | `"hello"`           | String object       | Strings are arrays of characters.                                     |
| Keyword        | `:name`             | Same keyword symbol | Keywords are self-evaluating.                                         |
| Vector         | `#(1 2 3)`          | Simple vector       | Elements are read as objects.                                         |
| Bit vector     | `#*1010`            | Bit vector          | Compact bit sequence literal.                                         |
| Pathname       | `#P"/tmp/file.txt"` | Pathname object     | Pathname behavior has portability caveats.                            |

```lisp
(list 42
      2/3
      3.14
      #\A
      "hello"
      :name
      #(1 2 3))
```

**Important caution:** literal compound objects may be treated as constants in source code. Destructively modifying literal data can have undefined or implementation-dependent consequences depending on the object and context. Do not mutate quoted or literal constants.

```lisp
(defparameter *xs* '(1 2 3))

;; Bad idea:
;; (setf (car *xs*) 99)
;;
;; The list came from literal source data.
;; Use COPY-LIST or construct fresh data when mutation is intended.
```

Better:

```lisp
(defparameter *xs* (list 1 2 3))

(setf (car *xs*) 99)
```

**Failure-first explanation: literal structure is not always safe scratch data**

The tempting but wrong mental model is: “A list literal is just a fresh list.”

The surprising behavior is that literal structure may be shared, compiled as constant data, or otherwise not safe to destructively modify.

The correct semantic explanation is that quoted/literal compound data in source should be treated as constant unless explicitly copied or freshly constructed.

The professional rule of thumb is: **use literal lists for constants; use constructors such as `list`, `vector`, `copy-list`, or `copy-seq` when mutation is intended.**

The boundary changes when the object is self-evaluating and immutable in practice, such as numbers. Compound objects require more caution.

**Common Pitfalls**

The main pitfall is mutating quoted lists, literal vectors, or literal strings. Another is assuming all numeric literals have the same representation cost. Common Lisp distinguishes integers, ratios, floats, complex numbers, and implementation-level representations; this matters later in performance-sensitive code.

### Numbers and numeric syntax — `integer`, `ratio`, `float`, `complex`, `numeric tower`

Common Lisp has a rich numeric tower. Numeric syntax is part of the reader’s job, and numeric types affect arithmetic behavior.

| Syntax    | Kind                                                          | Example result | Practical consequence                                                           |
| --------- | ------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- |
| `10`      | Integer                                                       | exact integer  | Arbitrary precision behavior avoids fixed-width overflow at the language level. |
| `2/3`     | Ratio                                                         | exact rational | Exact arithmetic may allocate and grow in size.                                 |
| `1.0`     | Single-float or implementation default float reading behavior | inexact float  | Use when approximate arithmetic is intended.                                    |
| `1.0d0`   | Double-float notation                                         | double-float   | Common in numeric code needing double precision.                                |
| `#C(1 2)` | Complex                                                       | complex number | Integrated into numeric system.                                                 |
| `#b1010`  | Binary integer                                                | `10`           | Reader radix syntax.                                                            |
| `#o12`    | Octal integer                                                 | `10`           | Reader radix syntax.                                                            |
| `#xA`     | Hex integer                                                   | `10`           | Reader radix syntax.                                                            |
| `#36rZ`   | Radix-specific integer                                        | `35`           | General radix notation.                                                         |

```lisp
(+ 1 2/3)
;; => 5/3

(+ 1 2.0)
;; => 3.0
```

**Design meaning:** Common Lisp prioritizes mathematically rich numeric behavior. Exact rational arithmetic is convenient and expressive, but exactness can have allocation and performance costs. Floating-point arithmetic is appropriate when inexact numeric computation is intended.

**Common Pitfalls**

A common mistake is accidentally producing ratios where floating-point numbers were expected. This is mathematically elegant but may be inappropriate for numeric algorithms intended to use floating-point performance.

Another mistake is assuming integer overflow behaves like C or Java fixed-width integer overflow. Common Lisp integers are not limited that way at the language level, though implementations use different representations internally for fixnums and bignums.

### Strings, characters, and escaping — `string`, `character`, `escape`, `case`, `sequence`

Strings are sequences of characters. Character syntax uses `#\`.

```lisp
#\A
#\a
#\Space
#\Newline
```

Strings use double quotes:

```lisp
"hello"
"line one
line two"
"She said \"hello\"."
```

| Construct            | Example                   | Meaning                                              | Practical consequence                    |
| -------------------- | ------------------------- | ---------------------------------------------------- | ---------------------------------------- |
| Character literal    | `#\A`                     | Character object                                     | Not the same as one-character string.    |
| String literal       | `"A"`                     | String object                                        | A sequence/array of characters.          |
| Escape in string     | `"a \"quote\""`           | Includes quote character                             | Reader handles escape before evaluation. |
| Newline in string    | `"a                       |                                                      |                                          |
| b"`                  | String containing newline | Exact formatting can matter.                         |                                          |
| Character comparison | `char=`, `char-equal`     | Case-sensitive vs case-insensitive comparison        | Choose explicitly.                       |
| String comparison    | `string=`, `string-equal` | Case-sensitive vs case-insensitive string comparison | Do not use `eq` for string content.      |

```lisp
(char= #\A #\A)
;; true

(string= "abc" "abc")
;; true

(eq "abc" "abc")
;; Do not use this for string content comparison.
```

**Language-design note:** strings are objects, not symbols. Symbols may have names that are strings internally, but symbol identity and string content comparison are different concepts.

**Common Pitfalls**

The most common pitfall is comparing strings with `eq`. Use `string=` or `equal` depending on the intended comparison. The equality predicates will be treated more fully later in Part 2 because they are central to Common Lisp semantics.

### Lists, cons notation, and dotted pairs — `cons`, `list`, `nil`, `proper list`, `dotted list`

Lists are fundamental in Common Lisp, but precision matters. A list is built from cons cells. A cons has a `car` and a `cdr`. A **proper list** ends in `nil`. A **dotted list** or improper list ends in something other than `nil`.

| Syntax            | Object shape            | Meaning                                   | Typical use                                          |
| ----------------- | ----------------------- | ----------------------------------------- | ---------------------------------------------------- |
| `()`              | `nil`                   | Empty list and false value                | Empty list, logical false                            |
| `(1 2 3)`         | Proper list             | Chain of conses ending in `nil`           | Ordinary list data                                   |
| `(1 . 2)`         | Dotted pair             | One cons whose `car` is `1`, `cdr` is `2` | Pair structure, low-level cons manipulation          |
| `(1 2 . 3)`       | Improper list           | Cons chain ending in `3`                  | Rare; appears in lambda lists and printed structures |
| `'(a b c)`        | Quoted list             | Literal list data                         | Constant symbolic/list data                          |
| `(list 'a 'b 'c)` | Fresh list construction | Runtime-created list                      | Use when mutation or freshness matters               |

```lisp
(cons 1 2)
;; => (1 . 2)

(cons 1 (cons 2 nil))
;; => (1 2)

(list 1 2 3)
;; => (1 2 3)
```

`nil` has multiple roles:

| Role of `nil` | Example             | Meaning                                           |
| ------------- | ------------------- | ------------------------------------------------- |
| Empty list    | `()`                | The empty list object                             |
| Boolean false | `(if nil 'yes 'no)` | False in condition position                       |
| Symbol        | `'nil`              | The symbol named `NIL`, which evaluates to itself |
| End marker    | `(1 2 . nil)`       | Proper list terminator                            |

**Failure-first explanation: `nil` is not just false**

The tempting but wrong mental model is: “`nil` means only false.”

The surprising behavior is that `nil`, `'nil`, and `()` all denote the same object in Common Lisp, and that object is both the empty list and boolean false.

The correct semantic explanation is that Common Lisp uses `nil` as a distinguished object with several conventional roles.

The professional rule of thumb is: **when using `nil`, make the intended role clear from context: false, empty list, missing value, or default.**

The boundary changes when absence must be distinguished from false or empty. Then use multiple values, explicit sentinel objects, conditions, or domain-specific representation rather than overloading `nil`.

**Common Pitfalls**

A common mistake is using raw list structure for every data model. Lists are excellent for sequential data, symbolic forms, and simple ad hoc structures. For stable domain objects, use structures, classes, hash tables, or explicit constructors when those better express invariants.

### Quote, function quote, backquote, comma, comma-at — `quote`, `function`, `quasiquote`, `unquote`, `splicing`

Quotation is central because it controls evaluation.

| Syntax            | Expansion intuition     | Meaning                                                | Typical use                       |
| ----------------- | ----------------------- | ------------------------------------------------------ | --------------------------------- |
| `'x`              | `(quote x)`             | Return symbol/object without evaluating it             | Symbolic data                     |
| `'(1 2 3)`        | `(quote (1 2 3))`       | Literal list data                                      | Constant list                     |
| `#'f`             | `(function f)`          | Refer to function binding                              | Passing named functions           |
| `` `(a ,x c) ``   | quasiquote with unquote | Construct mostly literal template with evaluated parts | Macro writing, structured data    |
| `` `(a ,@xs c) `` | splicing unquote        | Splice list elements into template                     | Macro writing and code generation |

```lisp
(setq x 10)

'x
;; => X, the symbol

x
;; => 10, the value of variable X

(list 'x x)
;; => (X 10)
```

Function quote is different:

```lisp
(defun double (x)
  (* 2 x))

(mapcar #'double '(1 2 3))
;; => (2 4 6)
```

Backquote is a template mechanism:

```lisp
(let ((name 'ada)
      (age 36))
  `(user :name ,name :age ,age))
;; => (USER :NAME ADA :AGE 36)
```

Splicing inserts elements of a list into the surrounding list:

```lisp
(let ((fields '(:name "Ada" :age 36)))
  `(make-user ,@fields))
;; => (MAKE-USER :NAME "Ada" :AGE 36)
```

**Language-design note:** quote and quasiquote are not runtime string interpolation. They are reader/evaluator-level mechanisms for controlling which parts of a form are treated as literal structure and which parts are evaluated.

**Macro-system consequence:** backquote is heavily used in macros because macros produce code as forms. It allows the macro author to write code templates while inserting computed subforms.

**Common Pitfalls**

A common pitfall is overquoting. If a symbol is quoted, its variable value is not used.

```lisp
(let ((x 10))
  'x)
;; => X, not 10
```

Another pitfall is using quote when fresh mutable structure is needed. Quoted compound data should be treated as constant. Use constructors or copying functions for mutable data.

### Variables and binding basics — `lexical binding`, `special binding`, `let`, `let*`, `defparameter`, `defvar`

Common Lisp has several kinds of variable-related constructs. The most important distinction is between **lexical binding** and **dynamic special binding**.

A lexical binding is visible according to source structure. A dynamic binding of a special variable is visible during dynamic extent of execution.

For now, begin with local lexical bindings:

```lisp
(let ((x 10)
      (y 20))
  (+ x y))
;; => 30
```

`let` initializes bindings in parallel: the initializer forms are evaluated in the outer environment.

```lisp
(let ((x 1))
  (let ((x 2)
        (y x))
    (list x y)))
;; => (2 1)
```

`let*` initializes sequentially: later bindings can see earlier ones.

```lisp
(let* ((x 1)
       (y x))
  (list x y))
;; => (1 1)
```

| Construct      | Meaning                                         | Scope/extent             | Canonical use                                   | Common pitfall                                     |
| -------------- | ----------------------------------------------- | ------------------------ | ----------------------------------------------- | -------------------------------------------------- |
| `let`          | Parallel local binding                          | Lexical by default       | Independent local names                         | Expecting later bindings to see earlier ones       |
| `let*`         | Sequential local binding                        | Lexical by default       | Dependent local names                           | Using it when independent binding would be clearer |
| `defparameter` | Define global special variable and assign value | Dynamic special variable | Tunable global configuration                    | Using globals instead of parameters                |
| `defvar`       | Define global special variable only if unbound  | Dynamic special variable | Preserving existing value across reloads        | Expecting reload to reset value                    |
| `setq`         | Assign existing variable                        | Depends on binding       | Updating variable value                         | Assigning undeclared globals accidentally          |
| `setf`         | Generalized assignment                          | Place-based              | Updating slots, cars, array elements, variables | Thinking it is only variable assignment            |

```lisp
(defparameter *debug-mode* nil
  "Whether debug behavior is enabled.")

(let ((*debug-mode* t))
  ;; dynamic rebinding of a special variable
  ...)
```

The earmuff convention `*debug-mode*` signals a special variable. Special variables should be used deliberately, often for dynamic configuration, streams, printer controls, debugger controls, or contextual parameters.

**Failure-first explanation: `defvar` does not reset on reload**

The tempting but wrong mental model is: “`defvar` defines a variable with this value, so reloading the file restores the value.”

The surprising behavior is that `defvar` does not change the value if the variable is already bound.

The correct semantic explanation is that `defvar` is designed to preserve existing dynamic state across reloads.

The professional rule of thumb is: **use `defparameter` for values that should be reset on reload; use `defvar` for values that should preserve an existing binding.**

The boundary changes for constants. Use `defconstant` only when the value is intended to be constant and redefinition issues are acceptable under the language’s rules and implementation behavior.

**Common Pitfalls**

One common pitfall is using global special variables where function parameters would be clearer. Special variables are powerful for dynamic context, but they hide dependencies if overused.

Another pitfall is forgetting that `let` and `let*` differ in initializer visibility. This becomes important in macro expansions, resource setup, and dependent calculations.

### Assignment and generalized places — `setq`, `setf`, `place`, `incf`, `push`, `rotatef`

Common Lisp distinguishes simple variable assignment from generalized assignment.

`setq` assigns variables:

```lisp
(let ((x 1))
  (setq x 2)
  x)
;; => 2
```

`setf` assigns **places**. A place is a generalized location that can be read and updated. Variables are places, but so are accessors such as `car`, `cdr`, `aref`, `gethash`, slot accessors, and many user-defined accessors.

```lisp
(let ((xs (list 1 2 3)))
  (setf (car xs) 99)
  xs)
;; => (99 2 3)
```

```lisp
(let ((v (vector 1 2 3)))
  (setf (aref v 1) 99)
  v)
;; => #(1 99 3)
```

| Construct | Meaning                             | Example              | Practical consequence         |
| --------- | ----------------------------------- | -------------------- | ----------------------------- |
| `setq`    | Assign variable value               | `(setq x 10)`        | Simple variable update        |
| `setf`    | Assign generalized place            | `(setf (car xs) 10)` | Uniform update protocol       |
| `incf`    | Increment place                     | `(incf count)`       | Reads, adds, writes back      |
| `decf`    | Decrement place                     | `(decf count)`       | Reads, subtracts, writes back |
| `push`    | Cons item onto list stored in place | `(push x xs)`        | Updates list variable/place   |
| `pop`     | Remove first item from list place   | `(pop xs)`           | Destructive update of place   |
| `rotatef` | Rotate values among places          | `(rotatef a b)`      | Useful for swaps              |
| `shiftf`  | Shift values through places         | `(shiftf a b c)`     | Less common but expressive    |

```lisp
(let ((xs nil))
  (push 1 xs)
  (push 2 xs)
  xs)
;; => (2 1)
```

`push` modifies the place that holds the list. It does not mutate the empty list; it updates the variable `xs` to point to a new cons.

**Language-design note:** `setf` is one of Common Lisp’s most important abstraction mechanisms. It allows APIs to expose readable accessors that also participate in update. This means a user can write `(setf (thing-name thing) "new")` if the accessor has a `setf` expansion.

**Failure-first explanation: `setf` is not only assignment**

The tempting but wrong mental model is: “`setf` is Lisp’s spelling of `=`.”

The surprising behavior is that `setf` can update places that are not variables, and the place form can be macro-expanded into arbitrary update protocol code.

The correct explanation is that `setf` is a generalized place update mechanism.

The professional rule of thumb is: **read `(setf place value)` as ‘change what this accessor denotes,’ not merely ‘assign this variable.’**

The boundary changes when the place has complex evaluation rules. Subforms of places are evaluated according to `setf` expansion rules; avoid relying on obscure side effects inside place expressions.

**Common Pitfalls**

The most common pitfall is using destructive updates without understanding sharing.

```lisp
(let* ((xs (list 1 2 3))
       (ys xs))
  (setf (car xs) 99)
  ys)
;; => (99 2 3)
```

Both `xs` and `ys` point to the same list structure. Updating through one name affects what the other name observes.

### Equality and identity — `eq`, `eql`, `equal`, `equalp`, `=`, `string=`, `char=`

Common Lisp has several equality predicates because “sameness” can mean object identity, numeric/character sameness, structural equality, case-insensitive comparison, or domain-specific equivalence.

| Predicate | Best mental model                                               | Good use                                                                           | Bad use / pitfall                                       |
| --------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `eq`      | Object identity for symbols and object identity-sensitive cases | Symbols, checking exact object identity                                            | Numbers, characters, strings, general structure content |
| `eql`     | `eq` plus suitable numeric/character comparison                 | Default equality in many CL contexts; numbers/chars                                | Deep list/string structure                              |
| `equal`   | Structural equality for lists and strings, plus `eql` behavior  | Lists, strings, trees                                                              | Case-insensitive comparison                             |
| `equalp`  | More permissive structural equality                             | Case-insensitive strings/chars, numeric looseness, arrays/structures in some cases | When strict type-sensitive equality is required         |
| `=`       | Numeric equality                                                | Numbers                                                                            | Non-numbers                                             |
| `string=` | String content equality                                         | Strings                                                                            | Symbols or arbitrary objects                            |
| `char=`   | Character equality                                              | Characters                                                                         | Strings                                                 |

```lisp
(eq 'a 'a)
;; true

(eql 1 1)
;; true

(equal '(1 2 (3)) '(1 2 (3)))
;; true

(string= "abc" "abc")
;; true

(equalp "ABC" "abc")
;; true
```

The tricky part is that `eq` may appear to work in some cases where it is not the right semantic predicate.

```lisp
(eq "abc" "abc")
;; Do not rely on this for string content.

(equal "abc" "abc")
;; true

(string= "abc" "abc")
;; true
```

For hash tables, the equality test matters:

```lisp
(make-hash-table :test 'eq)
(make-hash-table :test 'eql)
(make-hash-table :test 'equal)
(make-hash-table :test 'equalp)
```

Choosing a hash table test is a data-modeling decision, not a mechanical option.

**Failure-first explanation: `eq` is not general equality**

The tempting but wrong mental model is: “`eq` means equals.”

The surprising behavior is that `eq` is not appropriate for comparing strings, numbers in general, lists by content, or many compound objects.

The correct semantic explanation is that `eq` is primarily object identity. Common Lisp provides multiple equality predicates because equality is not one concept.

The professional rule of thumb is: **use the weakest equality predicate that matches the semantic question, but do not use `eq` unless identity is really what is meant.**

The boundary changes for symbols. For interned symbols, `eq` is usually exactly what is wanted because symbol identity is meaningful.

**Common Pitfalls**

The most common pitfall is using `eq` for strings or numbers. Another is using `equalp` everywhere because it “just works.” `equalp` can be too permissive when type distinction, case distinction, or exact representation matters. Equality choice should encode domain meaning.
### Truth, falsity, and condition positions — `nil`, `t`, generalized boolean, predicate convention

Common Lisp has one false value: `nil`. Every other value is true in condition position. The symbol `t` is the canonical true value, but predicates may return any non-`nil` value to mean true.

```lisp
(if nil
    "yes"
    "no")
;; => "no"

(if 0
    "yes"
    "no")
;; => "yes"

(if ""
    "yes"
    "no")
;; => "yes"

(if '()
    "yes"
    "no")
;; => "no", because () is NIL
```

| Value                | Truth value in condition position | Notes                                                    |
| -------------------- | --------------------------------- | -------------------------------------------------------- |
| `nil`                | false                             | Also the empty list                                      |
| `()`                 | false                             | Same object as `nil`                                     |
| `'nil`               | false                             | The symbol `NIL`, self-evaluating                        |
| `t`                  | true                              | Canonical true value                                     |
| `0`                  | true                              | Unlike Python, JavaScript, C-style condition conventions |
| `""`                 | true                              | Empty string is still true                               |
| `#()`                | true                              | Empty vector is true                                     |
| Any non-`nil` object | true                              | Generalized boolean truth                                |

Predicates conventionally return generalized booleans. This means a predicate need not return exactly `t`.

```lisp
(member 'b '(a b c))
;; => (B C), which is true because it is non-NIL

(if (member 'b '(a b c))
    "found"
    "not found")
;; => "found"
```

`not` and `null` are equivalent as functions, but their names communicate different intentions.

```lisp
(not x)
;; Use when thinking logically: false?

(null xs)
;; Use when thinking structurally: empty list?
```

| Predicate | Same function behavior?                                                                 | Preferred meaning                            |
| --------- | --------------------------------------------------------------------------------------- | -------------------------------------------- |
| `not`     | true if argument is `nil`                                                               | Logical negation                             |
| `null`    | true if argument is `nil`                                                               | Empty-list test                              |
| `endp`    | true for end of proper list; signals/type-checks on improper input depending on context | Proper list traversal                        |
| `eq nil`  | identity check with `nil`                                                               | Usually less expressive than `null` or `not` |

**Failure-first explanation: false is not “falsy” in the JavaScript/Python sense**

The tempting but wrong mental model is: “Empty things are false.”

The surprising behavior is that `0`, `""`, empty vectors, empty hash tables, and most empty objects are true.

The correct semantic explanation is that Common Lisp has exactly one false object: `nil`.

The professional rule of thumb is: **test the property meant by the program, not a vague truthiness intuition.** Use `null` for empty list, `zerop` for zero, `string=`, `plusp`, `minusp`, `endp`, or domain predicates where appropriate.

The boundary changes when an API explicitly returns `nil` to mean absence or failure. In that case, condition-position testing is idiomatic, but only if `nil` cannot also be a valid payload.

**Common Pitfalls**

The most common pitfall is using `if` to test whether a sequence is empty. This works for lists because the empty list is `nil`, but it does not work for strings or vectors.

```lisp
(if ""
    "not empty"
    "empty")
;; => "not empty"
```

Use length or sequence-specific predicates when the distinction matters.

### Basic control flow — `if`, `when`, `unless`, `cond`, `case`, `ecase`, `typecase`

Common Lisp has both primitive conditional forms and macro-defined convenience forms. `if` is a special operator. `when`, `unless`, `cond`, `case`, `ecase`, and `typecase` are macros.

| Construct   | Kind             | Use when                                     | Result behavior                  | Common pitfall                                   |
| ----------- | ---------------- | -------------------------------------------- | -------------------------------- | ------------------------------------------------ |
| `if`        | special operator | One test, two branches                       | Result is selected branch value  | Forgetting else defaults to `nil` when omitted   |
| `when`      | macro            | Execute body only if test true               | Returns last body value or `nil` | Using for two-branch logic                       |
| `unless`    | macro            | Execute body only if test false              | Returns last body value or `nil` | Nesting negative logic until unreadable          |
| `cond`      | macro            | Multiple tests in order                      | Returns selected clause body     | Forgetting final `t` default                     |
| `case`      | macro            | Compare key against literal keys using `eql` | Selected clause body             | Expecting evaluated keys                         |
| `ecase`     | macro            | Exhaustive `case`; error if no match         | Selected clause body or error    | Using when non-exhaustive input is possible      |
| `typecase`  | macro            | Branch by type                               | Selected clause body             | Overusing instead of CLOS/generic functions      |
| `etypecase` | macro            | Exhaustive typecase; error if no match       | Selected clause body or error    | Exposing internal type errors at public boundary |

```lisp
(if (> x 0)
    "positive"
    "not positive")
```

```lisp
(when (> x 0)
  (format t "positive~%")
  x)
```

```lisp
(unless valid
  (error "Invalid input: ~S" input))
```

```lisp
(cond
  ((< x 0) :negative)
  ((zerop x) :zero)
  (t :positive))
```

`case` keys are not evaluated. They are literal designators.

```lisp
(case status
  (:new "new")
  (:done "done")
  ((:failed :cancelled) "closed")
  (otherwise "unknown"))
```

For stricter finite-state logic, use `ecase`:

```lisp
(ecase status
  (:new "new")
  (:done "done")
  (:failed "failed"))
```

If `status` is not one of these keys, `ecase` signals an error. That is useful when the set of states is intended to be closed.

`typecase` branches by type:

```lisp
(typecase value
  (string (length value))
  (list (length value))
  (vector (length value))
  (t nil))
```

**Language-design note:** Common Lisp uses macros to define many control forms because ordinary functions cannot control evaluation of their arguments. `when` cannot be a function because it must avoid evaluating its body when the test is false.

**Failure-first explanation: `case` keys are not variables**

The tempting but wrong mental model is: “`case` compares against the values of these names.”

```lisp
(let ((expected :ok))
  (case status
    (expected "ok")))
```

This does not test whether `status` equals the value of variable `expected`. It treats `expected` as a literal key symbol.

The correct explanation is that `case` clauses contain unevaluated key designators.

The professional rule of thumb is: **use `case` for literal finite alternatives; use `cond` when the tests need computation.**

The boundary changes when the comparison relation matters. `case` uses `eql`-style comparison. For strings or structural values, use `cond`, `assoc` with an appropriate test, hash tables with an appropriate test, or explicit predicates.

**Common Pitfalls**

The most common pitfall is using `typecase` as a substitute for polymorphic design. Branching on type is fine at dynamic boundaries, parsers, validators, and low-level dispatch points. Repeated scattered `typecase` over domain objects often indicates that a generic function or better data representation may be appropriate.

### Sequencing and implicit return values — `progn`, `prog1`, `prog2`, body forms, last value`

Common Lisp forms return values. Many body positions evaluate multiple forms and return the value or values of the last form.

```lisp
(defun example (x)
  (format t "x = ~A~%" x)
  (+ x 1))
;; Returns (+ x 1), not the FORMAT result.
```

`progn` explicitly sequences forms and returns the last form’s values.

```lisp
(progn
  (print "first")
  (print "second")
  42)
;; => 42
```

`prog1` evaluates several forms but returns the first form’s values. This is useful when a result should be returned while cleanup, logging, registration, or side effects happen afterward.

```lisp
(prog1
    (compute-result)
  (format t "computed~%"))
```

`prog2` returns the second form’s values after evaluating the first and then subsequent forms.

| Construct     | Returns              | Typical use                                                      | Common pitfall                                     |
| ------------- | -------------------- | ---------------------------------------------------------------- | -------------------------------------------------- |
| Body position | Last form’s values   | Function bodies, `let`, `when`, `cond` clauses                   | Expecting explicit `return` to be required         |
| `progn`       | Last form’s values   | Grouping multiple forms where one form is syntactically expected | Overusing where body already allows multiple forms |
| `prog1`       | First form’s values  | Return a result while doing follow-up effects                    | Hiding important side effects                      |
| `prog2`       | Second form’s values | Rare sequencing pattern                                          | Usually less readable than explicit binding        |

```lisp
(let ((x 10))
  (format t "About to compute~%")
  (* x x))
;; => 100
```

**Language-design note:** Common Lisp is expression-oriented in the sense that evaluated forms produce values, but it is not purely expression-oriented in the same way as some functional languages. It has side effects, nonlocal exits, multiple values, dynamic bindings, and control constructs that interact with runtime state.

**Common Pitfalls**

A common pitfall is adding unnecessary explicit return logic. In ordinary functions, the last form is returned. Explicit nonlocal return is needed only when leaving a named block early.

### Blocks and nonlocal exits — `block`, `return-from`, `return`, `tagbody`, `go`

Common Lisp has structured and unstructured control transfer mechanisms. Most code uses ordinary returns from last forms, but nonlocal exits are part of the language.

A `block` establishes a named exit point. `return-from` exits that block.

```lisp
(block search
  (dolist (x xs)
    (when (target-p x)
      (return-from search x)))
  nil)
```

`return` is shorthand for `(return-from nil ...)`, often used with constructs that establish an implicit block named `nil`, such as `loop` and `dolist`.

```lisp
(dolist (x xs)
  (when (target-p x)
    (return x)))
```

| Construct     | Meaning                             | Typical use                       | Common pitfall                                                |
| ------------- | ----------------------------------- | --------------------------------- | ------------------------------------------------------------- |
| `block`       | Establish named exit                | Early exit from a region          | Using when simpler control form suffices                      |
| `return-from` | Exit named block with values        | Search, validation, early failure | Returning across unclear dynamic extent                       |
| `return`      | Exit block named `nil`              | Loop bodies                       | Assuming it returns from the nearest function in all contexts |
| `tagbody`     | Establish tags and sequential forms | Low-level control, generated code | Rarely appropriate in ordinary code                           |
| `go`          | Jump to tag in `tagbody`            | Low-level flow                    | Produces hard-to-read code if used manually                   |

Functions defined with `defun` implicitly wrap their body in a block named after the function.

```lisp
(defun find-positive (xs)
  (dolist (x xs)
    (when (plusp x)
      (return-from find-positive x)))
  nil)
```

**Language-design note:** Common Lisp preserves low-level control constructs such as `tagbody` and `go`, partly for expressive completeness and macro expansion targets. Modern hand-written code usually favors clearer constructs such as `loop`, `dolist`, `block`, `return-from`, `catch`/`throw`, or the condition system.

**Common Pitfalls**

A common pitfall is using `return` as if it always means “return from the current function.” In Common Lisp, `return` means return from the block named `nil`. In many loop constructs that works as expected; outside such contexts, it may not.

Another pitfall is reaching for `tagbody`/`go` in ordinary application code. These are useful to understand because macros may expand into them, but they should rarely be the first design choice.

### Iteration basics — `dolist`, `dotimes`, `do`, `loop`, `mapcar`

Common Lisp offers several iteration styles. Part 4 will treat iteration and transformation as task patterns; this section gives the syntax needed to read ordinary code.

| Construct | Style                            | Use when                                 | Return behavior                       | Common pitfall                               |
| --------- | -------------------------------- | ---------------------------------------- | ------------------------------------- | -------------------------------------------- |
| `dolist`  | Iterate over list elements       | Side-effectful list traversal            | Optional result form, otherwise `nil` | Using for transformation instead of `mapcar` |
| `dotimes` | Count from `0` below limit       | Numeric repetition                       | Optional result form                  | Off-by-one assumptions                       |
| `do`      | General iteration with variables | Complex stateful loops                   | Explicit termination/result           | Hard to read when overused                   |
| `loop`    | Macro DSL                        | Rich iteration, collection, accumulation | Depends on loop clauses               | Treating it like ordinary Lisp syntax        |
| `mapcar`  | Functional mapping over lists    | Transform list to list                   | New list of results                   | Using only for side effects                  |

```lisp
(dolist (x '(1 2 3))
  (print x))
```

```lisp
(dotimes (i 3)
  (print i))
;; prints 0, 1, 2
```

```lisp
(mapcar #'1+ '(1 2 3))
;; => (2 3 4)
```

A simple `loop` example:

```lisp
(loop for x in '(1 2 3)
      collect (* x x))
;; => (1 4 9)
```

A simple `do` example:

```lisp
(do ((i 0 (1+ i))
     (acc 0 (+ acc i)))
    ((= i 5) acc))
;; => 10
```

**Language-design note:** Common Lisp does not enforce one iteration ideology. It provides functional mapping, imperative loops, a powerful `loop` DSL, recursive style, and sequence functions. Idiomatic choice depends on whether the task is transformation, accumulation, side effect, early exit, or complex state transition.

**Common Pitfalls**

The most common beginner mistake is using `mapcar` for side effects and ignoring its result.

```lisp
(mapcar #'print xs)
;; This prints, but also allocates and returns a list of PRINT results.
```

Use `dolist` or `mapc` for side-effect traversal.

Another pitfall is overusing `loop` before understanding ordinary evaluation and macro expansion. `loop` is idiomatic, but it is a DSL; its syntax is not representative of ordinary Common Lisp form structure.

### Function definitions — `defun`, `lambda`, `funcall`, `apply`, `function namespace`

Function definition begins with `defun`.

```lisp
(defun square (x)
  "Return X squared."
  (* x x))
```

Anonymous functions use `lambda`.

```lisp
(lambda (x) (* x x))
```

To call a function object stored in a variable, use `funcall`.

```lisp
(let ((f #'square))
  (funcall f 5))
;; => 25
```

To call a function with a list of arguments, use `apply`.

```lisp
(apply #'+ '(1 2 3 4))
;; => 10
```

`apply` can also combine leading arguments with a final list:

```lisp
(apply #'+ 1 2 '(3 4))
;; => 10
```

| Construct | Meaning                                              | Example             | Common pitfall                                               |
| --------- | ---------------------------------------------------- | ------------------- | ------------------------------------------------------------ |
| `defun`   | Define named function                                | `(defun f (x) ...)` | Treating it as creating only a variable binding              |
| `lambda`  | Anonymous function form                              | `(lambda (x) ...)`  | Forgetting to call it through function position or `funcall` |
| `#'name`  | Function quote                                       | `#'car`             | Confusing function binding with variable binding             |
| `funcall` | Call function object with explicit arguments         | `(funcall f x)`     | Using when ordinary function call would suffice              |
| `apply`   | Call function object with final argument list spread | `(apply f args)`    | Passing a non-list final argument                            |

Common Lisp has separate namespaces for ordinary variable bindings and function bindings. This is sometimes called **Lisp-2** namespace design.

```lisp
(defun f (x)
  (+ x 1))

(let ((f 100))
  (list f
        (funcall #'f 10)))
;; => (100 11)
```

The variable `f` and the function `f` are distinct bindings.

**Language-design note:** The separate function namespace affects macro writing, higher-order programming, local functions, and symbolic reasoning. It also means that `#'f` and `'f` are not interchangeable.

**Failure-first explanation: a symbol can name both a variable and a function**

The tempting but wrong mental model is: “A name has one binding.”

The surprising behavior is that the same symbol can have a variable value and a function definition.

The correct semantic explanation is that Common Lisp has distinct namespaces for values and functions, plus additional namespaces for tags, blocks, types/classes, and packages.

The professional rule of thumb is: **when passing a named function, use `#'name`; when passing symbolic data, use `'name`.**

The boundary changes for function objects already stored in variables. Use `(funcall f ...)`, not `#'f`, when `f` is a variable whose value is a function object.

**Common Pitfalls**

One common pitfall is writing:

```lisp
(mapcar 'square xs)
```

Some implementations may tolerate symbols as function designators in some contexts, but idiomatic modern Common Lisp uses:

```lisp
(mapcar #'square xs)
```

Another pitfall is expecting `(f x)` to call the function stored in variable `f`. It does not. It calls the function binding named by symbol `f`. To call the variable’s function value, write:

```lisp
(funcall f x)
```

### Lambda lists — `required`, `&optional`, `&rest`, `&key`, `&allow-other-keys`, `&aux`

Common Lisp’s parameter lists are called **lambda lists**. They are more expressive than simple positional argument lists.

```lisp
(defun make-user (name &optional age)
  (list :name name :age age))
```

Required parameters come first. Optional parameters follow `&optional`.

```lisp
(defun greet (name &optional (greeting "Hello"))
  (format nil "~A, ~A" greeting name))
```

Optional parameters can include a supplied-p variable:

```lisp
(defun parse-limit (&optional (limit 10 limit-supplied-p))
  (list :limit limit :supplied limit-supplied-p))
```

`&rest` collects remaining arguments into a list.

```lisp
(defun sum (&rest numbers)
  (apply #'+ numbers))
```

`&key` accepts keyword arguments.

```lisp
(defun connect (&key host port ssl)
  (list :host host :port port :ssl ssl))

(connect :host "localhost" :port 8080 :ssl t)
```

Keyword arguments can have defaults and supplied-p variables:

```lisp
(defun connect (&key
                  (host "localhost")
                  (port 80 port-supplied-p)
                  (ssl nil))
  (list :host host
        :port port
        :port-supplied port-supplied-p
        :ssl ssl))
```

`&allow-other-keys` allows unknown keyword arguments. This is useful in forwarding APIs but dangerous if it hides mistakes.

```lisp
(defun make-widget (&key width height &allow-other-keys)
  (list :width width :height height))
```

`&aux` introduces auxiliary local variables in lambda lists.

```lisp
(defun area (width height &aux (result (* width height)))
  result)
```

| Lambda-list marker  | Meaning                              | Canonical use                           | Common pitfall                                   |
| ------------------- | ------------------------------------ | --------------------------------------- | ------------------------------------------------ |
| required parameters | Must be supplied positionally        | Essential inputs                        | Too many positional arguments reduce readability |
| `&optional`         | Optional positional arguments        | Small arity variations                  | Ambiguous calls when many optional args exist    |
| `&rest`             | Collect remaining arguments          | Variadic functions, forwarding          | Allocates list of rest arguments                 |
| `&key`              | Keyword arguments                    | Configurable APIs                       | Forgetting keywords are part of call syntax      |
| supplied-p variable | Detect whether caller supplied value | Distinguish default from explicit value | Confusing supplied `nil` with omitted argument   |
| `&allow-other-keys` | Permit unknown keywords              | Forwarding, extensible APIs             | Silently hiding misspelled keywords              |
| `&aux`              | Local auxiliary binding              | Rare convenience                        | Less visible than `let`                          |

**Failure-first explanation: omitted and supplied `nil` are different**

The tempting but wrong mental model is: “If a parameter is `nil`, the caller did not provide it.”

```lisp
(defun example (&key value)
  (if value
      "provided"
      "missing-or-false"))
```

This cannot distinguish omitted `:value` from `:value nil`.

The correct solution is a supplied-p variable:

```lisp
(defun example (&key (value nil value-supplied-p))
  (if value-supplied-p
      (list :provided value)
      :missing))
```

The professional rule of thumb is: **when `nil` is a valid argument, use a supplied-p variable to distinguish absence from explicit `nil`.**

The boundary changes when `nil` is intentionally the only representation of absence and cannot be a valid payload. Then a simpler keyword parameter is fine.

**Common Pitfalls**

The most common lambda-list pitfall is designing APIs with too many optional positional arguments. Prefer keyword arguments when the call would otherwise become unreadable.

```lisp
;; Hard to read:
(make-window 100 200 nil t :blue)

;; Clearer:
(make-window :width 100 :height 200 :border nil :visible t :color :blue)
```

Another pitfall is using `&allow-other-keys` too broadly. It is useful for forwarding extensible option lists, but it can hide spelling errors such as `:widht`.

### Local functions and local macros — `flet`, `labels`, `macrolet`, `symbol-macrolet`

Common Lisp supports local function definitions and local macro definitions.

`flet` defines local functions that are not recursively visible to themselves.

```lisp
(flet ((double (x)
         (* 2 x)))
  (double 10))
;; => 20
```

`labels` defines local functions that can call themselves and each other recursively.

```lisp
(labels ((fact (n)
           (if (zerop n)
               1
               (* n (fact (1- n))))))
  (fact 5))
;; => 120
```

`macrolet` defines local macros.

```lisp
(macrolet ((twice (form)
             `(progn ,form ,form)))
  (twice (print "hi")))
```

`symbol-macrolet` defines symbol macros: references to symbols expand into forms.

```lisp
(symbol-macrolet ((x (car cell)))
  (setf x 10))
```

| Construct         | Defines                   | Visibility                                     | Use when                                    | Common pitfall                       |
| ----------------- | ------------------------- | ---------------------------------------------- | ------------------------------------------- | ------------------------------------ |
| `flet`            | Local functions           | Inside body; no self-recursion by default      | Small helper functions                      | Expecting recursion                  |
| `labels`          | Recursive local functions | Functions visible to themselves and each other | Local recursion, mutually recursive helpers | Over-nesting complex logic           |
| `macrolet`        | Local macros              | Expansion within lexical scope                 | Local syntactic abbreviation                | Hiding evaluation rules from readers |
| `symbol-macrolet` | Symbol expansions         | Symbol reference expansion                     | Advanced places, DSLs, accessor abstraction | Very surprising if overused          |

**Language-design note:** local functions support lexical abstraction without exporting names or polluting global function bindings. Local macros support local syntax extension, but they should be used with stricter discipline because they alter how code is read semantically.

**Common Pitfalls**

A common pitfall is using `flet` for recursive functions. Use `labels` instead.

```lisp
(flet ((bad (n)
         (if (zerop n)
             0
             (bad (1- n)))))
  (bad 3))
;; BAD is not recursively available in the intended way.
```

Use:

```lisp
(labels ((good (n)
           (if (zerop n)
               0
               (good (1- n)))))
  (good 3))
```

Another pitfall is using local macros when local functions would be clearer. If the abstraction does not need to control evaluation or syntax, prefer `flet` or `labels`.

### Multiple values — `values`, `multiple-value-bind`, `multiple-value-call`, `nth-value`

Common Lisp functions can return multiple values. This is not the same as returning a list or tuple. Multiple values are part of the calling convention.

```lisp
(floor 7 3)
;; => 2
;;    1
```

`floor` returns quotient and remainder as two values.

Use `multiple-value-bind` to receive them.

```lisp
(multiple-value-bind (quotient remainder)
    (floor 7 3)
  (list quotient remainder))
;; => (2 1)
```

Use `values` to return multiple values.

```lisp
(defun divide-with-remainder (a b)
  (values (floor a b)
          (mod a b)))
```

Use `nth-value` to select one value.

```lisp
(nth-value 1 (floor 7 3))
;; => 1
```

| Construct             | Meaning                                         | Use case                                            | Common pitfall                                   |
| --------------------- | ----------------------------------------------- | --------------------------------------------------- | ------------------------------------------------ |
| `values`              | Return zero or more values                      | APIs with primary result plus secondary information | Confusing with list return                       |
| `multiple-value-bind` | Bind multiple returned values                   | Destructuring result values                         | Expecting missing values to signal automatically |
| `multiple-value-call` | Collect multiple values from forms as arguments | Advanced value plumbing                             | Rarely needed in ordinary code                   |
| `nth-value`           | Select nth returned value                       | Secondary result extraction                         | Overusing instead of clearer binding             |
| `values-list`         | Return list elements as multiple values         | Bridge list and multiple values                     | Confusing list structure with value protocol     |
| `multiple-value-list` | Capture multiple values into a list             | Debugging, adaptation                               | Allocates list                                   |

Multiple values interact with ordinary contexts. Usually, only the primary value is used unless the context expects multiple values.

```lisp
(list (floor 7 3))
;; => (2)
;; The remainder is discarded.
```

To preserve both:

```lisp
(multiple-value-list (floor 7 3))
;; => (2 1)
```

**Failure-first explanation: multiple values are not a tuple**

The tempting but wrong mental model is: “Returning multiple values is like returning a list.”

The surprising behavior is that passing a multiple-value form into ordinary value context keeps only the first value.

The correct explanation is that Common Lisp has multiple-value contexts and single-value contexts.

The professional rule of thumb is: **use multiple values for primary result plus secondary information; use a structure/list/object when the returned collection is itself the domain value.**

The boundary changes for APIs where the secondary value is semantically essential. If callers must always keep all components together, a structure or object may be better than multiple values.

**Common Pitfalls**

A common pitfall is losing secondary values accidentally:

```lisp
(let ((result (floor 7 3)))
  result)
;; => 2
```

Use `multiple-value-bind` when secondary values matter.

Another pitfall is returning many values from public APIs without clear documentation. Multiple values are excellent for idiomatic Common Lisp APIs, but more than two or three values can become hard to read unless the convention is obvious.

### Basic data definition forms — `defstruct`, `defclass`, `defgeneric`, `defmethod`

Part 3 and Part 4 will treat data modeling and abstraction in detail. Part 2 only establishes the basic syntax needed to recognize definitions.

`defstruct` defines a structure type with slots and usually constructor/accessor functions.

```lisp
(defstruct point
  x
  y)

(defparameter *p* (make-point :x 10 :y 20))

(point-x *p*)
;; => 10
```

`defclass` defines a CLOS class.

```lisp
(defclass user ()
  ((name :initarg :name
         :accessor user-name)
   (email :initarg :email
          :accessor user-email)))
```

Create instances with `make-instance`:

```lisp
(make-instance 'user :name "Ada" :email "ada@example.com")
```

`defgeneric` defines a generic function.

```lisp
(defgeneric render (object stream)
  (:documentation "Render OBJECT to STREAM."))
```

`defmethod` defines methods specialized for argument types.

```lisp
(defmethod render ((object user) stream)
  (format stream "~A <~A>"
          (user-name object)
          (user-email object)))
```

| Construct       | Defines                                   | Best first approximation             | Common pitfall                                                |
| --------------- | ----------------------------------------- | ------------------------------------ | ------------------------------------------------------------- |
| `defstruct`     | Structure type and accessors              | Lightweight record-like data         | Using when behavior/protocol extension needs CLOS             |
| `defclass`      | CLOS class                                | Object with slots and class identity | Treating it like Java class syntax only                       |
| `defgeneric`    | Generic operation                         | Public polymorphic function          | Skipping generic function documentation                       |
| `defmethod`     | Specialized behavior for generic function | Method for argument specializers     | Thinking method belongs only to the class                     |
| `make-instance` | Class instance creation                   | CLOS object construction             | Forgetting `:initarg` controls initialization keywords        |
| `make-<struct>` | Structure constructor by default          | Structure object creation            | Depending on default constructor shape without documenting it |

**Language-design note:** `defstruct` and `defclass` represent different data-modeling commitments. `defstruct` is often simpler and can be more efficient. `defclass` participates in CLOS generic dispatch and the object system. Choosing between them is a design decision, not just syntax preference.

**Common Pitfalls**

A common pitfall is reaching for `defclass` for every structured value. If the object does not need CLOS extensibility, inheritance, generic protocol participation, or class redefinition behavior, `defstruct` may be clearer.

The opposite pitfall is using raw lists or structures where a generic protocol would make extension cleaner. CLOS becomes valuable when operations need to vary by object type and remain open to extension.

### Basic macro definition syntax — `defmacro`, `macroexpand`, `gensym`

Macros are central to Common Lisp, but Part 4 will handle macro design in depth. This section gives the basic surface syntax and the minimum semantic warning.

A macro is defined with `defmacro`.

```lisp
(defmacro when-positive (x &body body)
  `(when (> ,x 0)
     ,@body))
```

Use it like a syntactic form:

```lisp
(when-positive score
  (format t "positive score~%")
  score)
```

The macro receives source forms and returns a new form. It does not receive evaluated runtime values.

Use `macroexpand-1` or `macroexpand` to inspect expansion.

```lisp
(macroexpand-1
 '(when-positive score
    (print score)))
```

A macro that introduces temporary bindings should normally use `gensym` to avoid accidental variable capture.

```lisp
(defmacro with-doubled ((var expr) &body body)
  (let ((temp (gensym "TEMP-")))
    `(let ((,temp ,expr))
       (let ((,var (* 2 ,temp)))
         ,@body))))
```

| Construct       | Meaning                           | Use case                       | Common pitfall                          |
| --------------- | --------------------------------- | ------------------------------ | --------------------------------------- |
| `defmacro`      | Define macro transformer          | New syntax/control abstraction | Writing macros where functions suffice  |
| `&body`         | Lambda-list marker for macro body | Body-like macro syntax         | Assuming it changes semantics by itself |
| Backquote       | Template construction             | Generate expansion forms       | Overquoting or accidental evaluation    |
| `,@`            | Splice list into template         | Insert body forms              | Splicing non-lists                      |
| `macroexpand-1` | Expand one macro layer            | Debug macro behavior           | Not using it during macro development   |
| `gensym`        | Generate uninterned symbol        | Avoid capture                  | Forgetting capture risks                |

**Failure-first explanation: macros do not receive runtime values**

The tempting but wrong model is:

```lisp
(defmacro bad-square (x)
  (* x x))
```

This fails because `x` is a source form, not a runtime number. If called as `(bad-square (+ 1 2))`, the macro receives the list `(+ 1 2)`, not the value `3`.

Correct macro shape:

```lisp
(defmacro square-form (x)
  `(* ,x ,x))
```

But this still evaluates `x` twice:

```lisp
(square-form (expensive-call))
;; Expands roughly to:
;; (* (expensive-call) (expensive-call))
```

Better:

```lisp
(defmacro square-once (x)
  (let ((temp (gensym "X-")))
    `(let ((,temp ,x))
       (* ,temp ,temp))))
```

The professional rule of thumb is: **macro arguments are syntax; generated code determines runtime evaluation.**

The boundary changes when defining compiler macros or using macro expansion for optimization. Even then, the expansion must preserve semantics.

**Common Pitfalls**

The most common macro pitfalls are double evaluation, variable capture, unclear evaluation order, and hiding side effects. A macro should have a clear expansion contract: what is evaluated, how many times, in what scope, and what value is returned.

### Basic module and loading syntax — `load`, `require`, `provide`, `asdf:load-system`

Common Lisp does not have a modern built-in import system like Python’s `import` or JavaScript’s `import`. The language has packages for symbols, and practical projects use ASDF systems for loading/building components.

At a basic level, files can be loaded:

```lisp
(load "file.lisp")
```

Older code may use `require` and `provide`:

```lisp
(require "some-feature")
(provide "some-feature")
```

In modern Common Lisp projects, ASDF is normally preferred:

```lisp
(asdf:load-system :my-system)
```

| Construct             | Layer                                          | Meaning                              | Professional status                   | Common pitfall                                                                 |
| --------------------- | ---------------------------------------------- | ------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------ |
| `load`                | Core language                                  | Load and evaluate a file             | Useful but low-level                  | Building large systems by manual load order                                    |
| `compile-file`        | Core language                                  | Compile source file to compiled file | Important for implementation workflow | Forgetting compile/load distinction                                            |
| `load` compiled file  | Core/implementation workflow                   | Load compiled output                 | Common behind ASDF                    | Assuming source and compiled behavior always feel identical during development |
| `require` / `provide` | Language feature with implementation variation | Feature loading protocol             | Legacy/context-dependent              | Treating as modern package manager                                             |
| `asdf:load-system`    | Ecosystem/tooling                              | Load an ASDF-defined system          | Standard practical workflow           | Confusing ASDF system with CL package                                          |
| `ql:quickload`        | Quicklisp ecosystem                            | Download/load library/system         | Common dependency workflow            | Assuming it guarantees reproducible pinned builds by itself                    |

Example ASDF-style use in the REPL:

```lisp
(ql:quickload :alexandria)
```

Then use package-qualified symbols or package definitions according to the library’s documentation.

**Language-design note:** Common Lisp separates concerns that many modern languages combine: symbol namespace, file loading, system definition, dependency acquisition, compilation, and runtime image state. This separation is powerful but initially confusing.

**Common Pitfalls**

A frequent pitfall is believing `(in-package #:x)` loads package `x`. It does not. The package must already exist, usually through a prior `defpackage` form loaded by the system.

Another pitfall is using `load` manually for multi-file projects. That creates fragile load-order habits. ASDF exists to model systems and dependencies more explicitly.

### Basic error syntax — `error`, `cerror`, `warn`, `signal`, `handler-case`

Common Lisp’s full condition system deserves substantial coverage in Part 5. The basic syntax is needed here because error signaling appears in ordinary code.

`error` signals an error condition and normally enters the debugger if unhandled.

```lisp
(error "Invalid value: ~S" value)
```

`warn` signals a warning.

```lisp
(warn "Deprecated option: ~S" option)
```

`cerror` signals a correctable error and offers a continue restart.

```lisp
(cerror "Use the default value."
        "Missing value for ~S."
        key)
```

`signal` signals a condition without necessarily forcing debugger entry.

```lisp
(signal "Something happened.")
```

`handler-case` handles conditions in an exception-like style.

```lisp
(handler-case
    (parse-input input)
  (error (condition)
    (format nil "Could not parse: ~A" condition)))
```

| Construct      | Meaning                                | Use case                             | Common pitfall                                            |
| -------------- | -------------------------------------- | ------------------------------------ | --------------------------------------------------------- |
| `error`        | Signal serious condition               | Invalid state, unrecoverable locally | Using strings only where structured conditions would help |
| `warn`         | Signal warning                         | Suspicious but recoverable situation | Ignoring warning policy                                   |
| `cerror`       | Correctable error with continue option | Interactive recovery                 | Rarely designing meaningful continue behavior             |
| `signal`       | Signal condition                       | Lower-level condition protocol       | Expecting it always behaves like `error`                  |
| `handler-case` | Handle condition with exit behavior    | Simple error recovery                | Treating it as the whole condition system                 |
| `handler-bind` | Dynamically bind condition handlers    | Advanced/layered handling            | Postponed to Part 5                                       |
| `restart-case` | Define recovery options                | Restart protocol                     | Postponed to Part 5                                       |

**Language-design note:** Common Lisp’s error system is not reducible to `try/catch`. `handler-case` resembles exception handling, but the full condition/restart system is more general. It separates signaling, handling, and recovery.

**Common Pitfalls**

A common pitfall is using only string errors in public APIs. For quick internal checks, string errors are fine. For library-quality code, define structured condition types so callers can handle failures by type and inspect condition data.

Another pitfall is catching broad `error` conditions too low in the stack and returning `nil`. That destroys diagnostic information and confuses absence with failure.

### Reader conditionals and feature expressions — `#+`, `#-`, `*features*`, portability`

Reader conditionals allow source forms to be included or skipped depending on implementation or environment features.

```lisp
#+sbcl
(format t "Running on SBCL~%")

#-sbcl
(format t "Not running on SBCL~%")
```

`*features*` is a list of feature symbols.

```lisp
*features*
```

Feature expressions can combine conditions:

```lisp
#+(and sbcl unix)
(do-sbcl-unix-specific-thing)
```

| Syntax           | Meaning                                    | Use case                              | Common pitfall                                             |
| ---------------- | ------------------------------------------ | ------------------------------------- | ---------------------------------------------------------- |
| `#+feature form` | Read form only if feature expression true  | Implementation/platform-specific code | Scattering portability branches everywhere                 |
| `#-feature form` | Read form only if feature expression false | Fallback code                         | Forgetting unread forms do not exist to evaluator/compiler |
| `*features*`     | Runtime variable listing reader features   | Inspect environment                   | Mutating casually                                          |
| `#+(and ...)`    | Compound feature expression                | Precise portability condition         | Overcomplicating source readability                        |
| `#+(or ...)`     | Alternative feature expression             | Multiple implementation support       | Hiding unsupported cases                                   |

**Language-design note:** Reader conditionals happen at read time. Skipped forms are not read as ordinary forms for evaluation. This is different from runtime `if`.

**Failure-first explanation: reader conditionals are not runtime conditionals**

The tempting but wrong model is: “`#+sbcl` is like `(if sbcl ...)`.”

The surprising behavior is that the skipped form may not even be read into a Lisp object. Syntax inside skipped sections may be invisible depending on the reader conditional behavior and context.

The correct explanation is that reader conditionals control source inclusion before evaluation or compilation.

The professional rule of thumb is: **use reader conditionals for implementation/platform boundaries, not ordinary program logic.**

The boundary changes inside portability layers, where reader conditionals may be necessary to isolate implementation-specific APIs. Keep them concentrated rather than spread throughout business logic.

**Common Pitfalls**

A common pitfall is using reader conditionals as a substitute for clean abstraction. If implementation-specific behavior is needed, wrap it behind a function or system boundary.

### Reader and printer variables — `*readtable*`, `*package*`, `*print-case*`, `*print-readably*`

The reader and printer are controlled by dynamic variables. Full reader/printer behavior is advanced, but several variables are important enough to recognize early.

| Variable                      | Controls                                              | Why it matters                                 | Common pitfall                                 |
| ----------------------------- | ----------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `*package*`                   | Current package for reading/printing symbols          | Affects symbol interpretation                  | Forgetting `in-package` changes source reading |
| `*readtable*`                 | Reader syntax behavior                                | Enables custom reader macros and case behavior | Changing globally and breaking other code      |
| `*read-default-float-format*` | Default float format when reading floats              | Numeric behavior                               | Unintended float type assumptions              |
| `*print-case*`                | Case used when printing symbols                       | Display/readability                            | Confusing printed case with symbol identity    |
| `*print-readably*`            | Whether printer should try to produce readable output | Serialization/debugging                        | Assuming all printed objects are readable      |
| `*print-circle*`              | Circular/shared structure printing                    | Debugging cyclic data                          | Infinite or unreadable output if ignored       |
| `*print-level*`               | Print depth limit                                     | Debugging large structures                     | Misreading truncated output                    |
| `*print-length*`              | Print sequence length limit                           | Debugging large lists/vectors                  | Misreading omitted elements                    |

```lisp
(let ((*print-case* :downcase))
  (print 'hello-world))
```

Dynamic binding of printer variables is idiomatic. Global mutation is usually not.

**Language-design note:** Common Lisp exposes reader/printer behavior as part of the programmable environment. This is powerful for debugging, serialization-like tasks, and DSLs, but it creates global-context risks if dynamic variables are changed carelessly.

**Common Pitfalls**

The sharpest pitfall is modifying `*readtable*` globally. Reader macros can be useful in controlled contexts, but changing read syntax for a broad environment can make code hard to read, load, or compose with other systems.

Another pitfall is treating printed output as reliable serialization. Common Lisp printing is rich and configurable, but not every printed representation is readable or portable as data.

### Minimal class/object syntax recognition — `slot`, `initarg`, `accessor`, `make-instance`

The full CLOS model belongs in Parts 3, 4, and 7. But source reading requires recognizing basic class forms.

```lisp
(defclass account ()
  ((id :initarg :id
       :reader account-id)
   (balance :initarg :balance
            :accessor account-balance)))
```

| Slot option      | Meaning                               | Example                                                 | Practical consequence             |
| ---------------- | ------------------------------------- | ------------------------------------------------------- | --------------------------------- |
| `:initarg`       | Keyword accepted by `make-instance`   | `:id`                                                   | Controls initialization API       |
| `:reader`        | Defines read accessor                 | `account-id`                                            | Exposes read-only style interface |
| `:writer`        | Defines write function                | `(setf account-balance)` style writer may be configured | Less common than accessor         |
| `:accessor`      | Defines read and `setf`-able accessor | `account-balance`                                       | Public mutable slot interface     |
| `:initform`      | Default value form                    | `0`                                                     | Used when initarg omitted         |
| `:documentation` | Slot documentation                    | string                                                  | Useful for public classes         |

```lisp
(defparameter *account*
  (make-instance 'account :id 1 :balance 100))

(account-id *account*)
;; => 1

(account-balance *account*)
;; => 100

(setf (account-balance *account*) 150)
```

**Language-design note:** Slot access is often mediated by generic functions. An accessor is not merely field syntax; it participates in Common Lisp’s generic function system.

**Common Pitfalls**

A common pitfall is exposing `:accessor` for every slot automatically. Accessors are API. If a slot should not be publicly mutable, use `:reader`, internal helper functions, or no public accessor.

### Minimal special-variable syntax recognition — `defvar`, `defparameter`, `let` dynamic binding

Special variables are dynamically scoped. They are usually named with earmuffs.

```lisp
(defparameter *trace-enabled* nil)

(defun maybe-trace (message)
  (when *trace-enabled*
    (format t "~A~%" message)))
```

Dynamic rebinding:

```lisp
(let ((*trace-enabled* t))
  (maybe-trace "inside dynamic extent"))
```

If `maybe-trace` is called anywhere during the dynamic extent of that `let`, it sees the rebound value.

| Construct                 | Meaning                                  | Reload behavior            | Use case                         |
| ------------------------- | ---------------------------------------- | -------------------------- | -------------------------------- |
| `defparameter`            | Define special variable and assign value | Resets on evaluation       | Configurable global parameter    |
| `defvar`                  | Define special variable if unbound       | Preserves existing value   | State that should survive reload |
| `let` on special variable | Dynamic rebind                           | Temporary dynamic value    | Contextual configuration         |
| `declare special`         | Mark variable special                    | Advanced/local declaration | Rare outside specific cases      |

**Language-design note:** Dynamic binding is not accidental legacy noise. It supports contextual parameters such as streams, print controls, read controls, debugger settings, and other dynamically scoped execution context.

**Common Pitfalls**

The biggest pitfall is using special variables as hidden dependencies. If a function’s behavior depends on `*some-context*`, that should be part of the function’s documented contract or isolated to infrastructure-level code.

### Minimal declaration syntax — `declare`, `declaim`, `proclaim`, `the`, `locally`

Declarations communicate type, optimization, specialness, inline policy, and other information to the compiler. They are not the same as a static type system, and their exact effects can depend on safety and optimization settings.

```lisp
(defun add-fixnums (a b)
  (declare (type fixnum a b)
           (optimize (speed 3) (safety 1)))
  (+ a b))
```

`the` asserts or declares the type of a form’s value.

```lisp
(the fixnum (+ a b))
```

`locally` introduces a declaration scope.

```lisp
(locally
  (declare (optimize (speed 3)))
  (compute-something))
```

`declaim` makes global declarations.

```lisp
(declaim (inline small-helper))
```

| Construct  | Scope                                 | Meaning                                         | Common pitfall                                 |
| ---------- | ------------------------------------- | ----------------------------------------------- | ---------------------------------------------- |
| `declare`  | Local declaration context             | Give compiler semantic/optimization information | Assuming it always inserts runtime checks      |
| `declaim`  | Global proclamation at top level      | Global compiler information                     | Overusing global optimization declarations     |
| `proclaim` | Runtime proclamation function         | Programmatic declaration                        | Less common in normal source                   |
| `the`      | Form-level type assertion/declaration | Tell compiler expected value type               | Lying to compiler under low safety             |
| `locally`  | Local declaration scope               | Apply declarations to enclosed forms            | Using for broad code regions without measuring |

**Failure-first explanation: declarations are not a full static type checker**

The tempting but wrong mental model is: “If I declare a type, Common Lisp will now guarantee static type safety.”

The surprising behavior is that declaration checking and consequences depend on implementation, optimization policy, and context. In unsafe optimized code, incorrect declarations can lead to undefined or unsafe behavior in an implementation-specific sense.

The correct explanation is that declarations are contracts with the compiler, used for optimization, checking, warnings, and documentation depending on settings.

The professional rule of thumb is: **write correct code first; add declarations where they document invariants, improve compiler diagnostics, or are justified by profiling.**

The boundary changes for public API validation. Use explicit checks such as `check-type`, constructors, predicates, or condition signaling where invalid external input must be handled reliably.

**Common Pitfalls**

A common pitfall is adding `(optimize (speed 3) (safety 0))` broadly. This can reduce checks and make bugs harder to diagnose. Use high speed/low safety only in measured hotspots with clear invariants.

### Type checking and assertions at syntax level — `typep`, `check-type`, `assert`, `etypecase`, `ctypecase`

Common Lisp provides runtime checking forms and predicates.

```lisp
(typep 10 'integer)
;; true
```

`check-type` checks a place and may offer interactive correction.

```lisp
(defun set-age (age)
  (check-type age (integer 0 *))
  age)
```

`assert` checks a condition.

```lisp
(assert (plusp n) (n) "N must be positive, got ~S." n)
```

`etypecase` and `ctypecase` are stricter type dispatch forms.

```lisp
(etypecase value
  (string (length value))
  (integer (abs value)))
```

| Construct    | Meaning                              | Use case                           | Common pitfall                                                  |
| ------------ | ------------------------------------ | ---------------------------------- | --------------------------------------------------------------- |
| `typep`      | Runtime type predicate               | Conditional logic, validation      | Overusing where generic dispatch fits better                    |
| `check-type` | Check and possibly correct a place   | Interactive/development validation | Using as full external validation strategy without error design |
| `assert`     | Assert arbitrary condition           | Internal invariants                | Asserting user input instead of signaling structured conditions |
| `etypecase`  | Exhaustive type dispatch with error  | Internal closed type branches      | Bad public error message if exposed                             |
| `ctypecase`  | Correctable exhaustive type dispatch | Interactive correction             | Rare outside interactive contexts                               |

**Language-design note:** Runtime checks complement dynamic typing. They are part of disciplined Common Lisp, not a betrayal of dynamic style.

**Common Pitfalls**

The common mistake is treating assertions as a substitute for boundary validation. Assertions are good for internal invariants. External data should be parsed and validated with deliberate error reporting.

### Minimal reader safety boundary — `read`, `read-from-string`, `eval`, untrusted input`

Common Lisp’s ability to read and evaluate code is powerful and dangerous. The basic syntactic forms are simple:

```lisp
(read stream)
(read-from-string "(+ 1 2)")
(eval '(+ 1 2))
```

But these forms cross trust boundaries.

| Operation          | Meaning                      | Safe default use                               | Risk                                                                             |
| ------------------ | ---------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------- |
| `read`             | Read Lisp object from stream | Trusted Lisp data/source                       | Reader behavior can construct objects, intern symbols, and process reader syntax |
| `read-from-string` | Read Lisp object from string | Trusted internal strings                       | Unsafe for arbitrary user input without controls                                 |
| `eval`             | Evaluate Lisp form           | Rare, controlled metaprogramming or REPL tools | Code execution                                                                   |
| `load`             | Load source/compiled file    | Trusted files                                  | Code execution                                                                   |
| Reader macros      | Extend read syntax           | Controlled DSL/source contexts                 | Can obscure or endanger reading                                                  |

**Professional rule:** do not use `read` or `eval` as casual parsers for untrusted user input. Use a proper parser for the expected data format, or tightly control reader behavior where Lisp-readable data is genuinely required.

**Common Pitfalls**

The classic pitfall is writing an application-level configuration or network protocol that uses unrestricted `read`. This is not a harmless data parser. Common Lisp’s read/eval power belongs behind clear trust boundaries.

### High-frequency primitive syntax index — `forms`, `binding`, `functions`, `control`, `data`, `errors`

| Task                     | Core syntax                        | First-choice construct                          | Notes                                         |
| ------------------------ | ---------------------------------- | ----------------------------------------------- | --------------------------------------------- |
| Quote symbolic data      | `'x`, `(quote x)`                  | `'x`                                            | Prevents evaluation.                          |
| Refer to function        | `#'name`, `(function name)`        | `#'name`                                        | Function namespace.                           |
| Local binding            | `let`, `let*`                      | `let` for independent, `let*` for dependent     | Lexical unless special.                       |
| Assign variable          | `setq`                             | Usually `setf` in modern style                  | `setf` is more general.                       |
| Assign place             | `setf`                             | `setf`                                          | Accessor protocol.                            |
| Define function          | `defun`                            | `defun`                                         | Includes implicit block named after function. |
| Anonymous function       | `lambda`                           | `lambda` with `#'` where needed                 | Function object.                              |
| Call function object     | `funcall`, `apply`                 | `funcall` for direct args, `apply` for arg list | Essential for higher-order code.              |
| Branch                   | `if`, `cond`, `case`               | Depends on task                                 | `case` keys are literal.                      |
| Side-effect if true      | `when`                             | `when`                                          | Macro.                                        |
| Side-effect if false     | `unless`                           | `unless`                                        | Avoid complex negation.                       |
| Iterate list             | `dolist`, `mapcar`, `loop`         | Depends on result/effect                        | Do not use `mapcar` only for side effects.    |
| Return multiple values   | `values`                           | `values`                                        | Not a tuple/list.                             |
| Receive multiple values  | `multiple-value-bind`              | `multiple-value-bind`                           | Secondary values otherwise often discarded.   |
| Define structure         | `defstruct`                        | `defstruct`                                     | Lightweight record-like data.                 |
| Define class             | `defclass`                         | `defclass`                                      | CLOS object model.                            |
| Define generic operation | `defgeneric`, `defmethod`          | Both for public protocols                       | Operation-centered OOP.                       |
| Signal error             | `error`                            | `error` or structured condition                 | Full system in Part 5.                        |
| Handle simple error      | `handler-case`                     | `handler-case`                                  | Not the whole condition system.               |
| Define package           | `defpackage`                       | `defpackage`                                    | Namespace policy.                             |
| Enter package            | `in-package`                       | `in-package`                                    | Affects symbol reading.                       |
| Load system              | `asdf:load-system`, `ql:quickload` | ASDF/Quicklisp workflow                         | Ecosystem/tooling layer.                      |
## PART 3 — Data, Types, and Modeling Reference by Task Pattern

### Data modeling in Common Lisp — `representation`, `type`, `predicate`, `constructor`, `invariant`

Common Lisp data modeling is not primarily a static type design exercise. It is a **representation discipline** exercise.

The language gives many ways to represent a domain concept: symbols, keywords, lists, property lists, association lists, hash tables, vectors, arrays, structures, CLOS instances, conditions, pathnames, streams, functions, closures, and implementation-specific objects. The important question is not “which syntax can hold the data?” but **which representation makes the intended invariants, access patterns, mutation rules, equality behavior, extension points, and performance costs explicit enough?**

A Common Lisp program can be well-designed with dynamic typing, but it must still have data contracts. Those contracts may appear as constructors, predicates, `check-type`, `assert`, generic functions, class protocols, condition types, tests, documentation, declarations, and disciplined package boundaries.

| Modeling question                  | Common Lisp design issue                             | Main constructs                                                 | Professional rule                                                      |
| ---------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Is the value atomic or structured? | Symbols/keywords/numbers/strings vs compound objects | symbol, keyword, number, string, list, vector, structure, class | Do not use list structure when the concept has stable named fields.    |
| Is order important?                | Sequence vs mapping                                  | list, vector, sequence functions, hash table                    | Choose by access pattern, not habit.                                   |
| Are field names important?         | Positional vs named data                             | plist, alist, hash table, `defstruct`, `defclass`               | Named data is safer when fields are numerous or evolving.              |
| Are invariants important?          | Constructor and validation discipline                | constructor functions, predicates, `check-type`, conditions     | Put invariants at creation and boundary points.                        |
| Is extension expected?             | Closed representation vs open protocol               | `defstruct`, `defclass`, `defgeneric`, `defmethod`              | Use CLOS when operations need open extension.                          |
| Is mutation intended?              | Identity and sharing                                 | `setf`, accessors, destructive operations                       | Mutability must be visible in API design.                              |
| Is absence meaningful?             | `nil` overload risk                                  | `nil`, multiple values, sentinel, condition                     | Do not let `nil` ambiguously mean false, empty, absent, and failed.    |
| Is performance sensitive?          | Allocation, dispatch, representation                 | declarations, structures, arrays, specialized arrays            | Optimize representation after measuring or when constraints are known. |

**Common Pitfalls**

A frequent mistake is treating Common Lisp’s dynamic typing as permission to postpone all modeling decisions. Dynamic code still has a model; it is merely less visible if not documented or enforced. Another mistake is overcorrecting by building rigid class hierarchies too early. In Common Lisp, a simple structure, keyword protocol, or generic function may be enough until the domain stabilizes.

### Type-system properties — `dynamic typing`, `strong typing`, `type specifier`, `declaration`, `runtime check`

Common Lisp is dynamically typed in the sense that values have types and variable bindings do not normally impose static compile-time type restrictions. The type system is still rich. It includes built-in types, compound type specifiers, class types, structure types, function types, numeric subtypes, array types, member types, and logical combinations.

Common Lisp is often described as strongly typed because objects are not freely reinterpreted through arbitrary implicit coercions. For example, a string is not silently treated as a number in arithmetic. But “strong typing” is not a formal guarantee of full static safety. The better formulation is:

**Common Lisp has a rich runtime type system, optional type declarations, and implementation-dependent compiler use of type information; it does not have a mandatory static type checker that proves most program properties before execution.**

| Type-system property         | Common Lisp behavior                                                    | Practical consequence                                  | Common misunderstanding                                             |
| ---------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------- |
| Dynamic typing               | Values have runtime types; variables can hold different types over time | Flexible APIs and REPL exploration                     | “There are no types”                                                |
| Strong runtime type behavior | Operations generally expect appropriate types                           | Many type errors are caught at runtime                 | “Anything can be used as anything”                                  |
| Optional declarations        | `declare`, `declaim`, `the` can inform compiler                         | Documentation, optimization, warnings, possible checks | “Declarations equal static typing”                                  |
| Type specifiers              | Types can be named and composed                                         | Precise runtime checks and declarations                | “Types are only classes”                                            |
| Class/structure types        | CLOS classes and structures define types                                | Object-oriented dispatch and type predicates           | “Only CLOS classes matter”                                          |
| Subtype reasoning            | `subtypep` may reason about type relations                              | Useful but may return uncertainty                      | “The implementation always decides all subtype questions perfectly” |
| Safety policy                | Compiler behavior depends partly on optimization settings               | Performance/safety tradeoff                            | “Fast code and maximally checked code are always the same”          |

Basic runtime type checking:

```lisp
(typep 42 'integer)
;; true

(typep "abc" 'string)
;; true

(typep '(1 2 3) 'list)
;; true
```

Compound type specifiers:

```lisp
(typep 10 '(integer 0 100))
;; true

(typep :done '(member :new :running :done :failed))
;; true

(typep "abc" '(or string symbol))
;; true
```

Declarations:

```lisp
(defun add-counts (a b)
  (declare (type fixnum a b))
  (+ a b))
```

This says that `a` and `b` are expected to be `fixnum`s. It may help the compiler optimize or diagnose code, depending on implementation and policy. It should not be treated as a complete substitute for validating untrusted input.

**Failure-first explanation: declarations are contracts, not magic**

The tempting but wrong mental model is: “Once a type is declared, the language enforces it like Java or Rust.”

The surprising behavior is that incorrect declarations may cause different consequences depending on implementation and optimization policy. Under low safety and high speed, the compiler may trust declarations aggressively.

The correct semantic explanation is that declarations provide information to the compiler. They can support checking, optimization, or documentation, but their exact effect is not equivalent to a mandatory static type system.

The professional rule of thumb is: **validate at boundaries; declare in internals when the invariant is already established.**

The boundary changes for internal numeric kernels or performance-sensitive code. There, type declarations are often part of the cost model, but they must be supported by tests and profiling.

**Common Pitfalls**

One pitfall is writing declarations before the representation is stable. Another is setting aggressive optimization globally. A better pattern is to keep ordinary code safe and clear, then add local declarations in measured hotspots.

### Choosing the right representation — `list`, `plist`, `alist`, `hash-table`, `vector`, `structure`, `class`

Common Lisp provides many overlapping data structures. This is a strength only if the representation choice is deliberate.

| Task                                                  | Good first choice              | Better when                                                | Avoid when                                                              |
| ----------------------------------------------------- | ------------------------------ | ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| Small ordered sequence                                | list                           | Frequent consing, symbolic processing, simple recursion    | Random access is frequent                                               |
| Indexed sequence                                      | vector                         | Need fast element access by index                          | Frequent insertion at front                                             |
| Dense multidimensional data                           | array                          | Numeric/matrix/grid-like data                              | Shape is irregular or sparse                                            |
| Small symbolic key-value data                         | plist                          | Simple keyword properties, options, metadata               | Keys are many, dynamic, or need non-`eq` tests                          |
| Small lookup table preserving readable pair structure | alist                          | Simple association, shadowing, ordered lookup              | Large or performance-sensitive lookup                                   |
| General mapping                                       | hash table                     | Many keys, lookup/update important                         | Need persistent printed readability or deterministic simple source data |
| Stable named fields                                   | `defstruct`                    | Lightweight records, performance, simple data              | Need open extension through CLOS                                        |
| Extensible object protocol                            | `defclass` + generic functions | Multiple dispatch, evolving behavior, extension by methods | Just need a simple record                                               |
| Finite symbolic state                                 | keyword/member type            | Closed state set, options, tags                            | State needs attached data and behavior                                  |
| External/untrusted data                               | parsed structure + validation  | Boundary safety required                                   | Raw `read` or unvalidated plist/hash table                              |

A simple property list:

```lisp
(list :name "Ada" :age 36 :role :researcher)
```

Access with `getf`:

```lisp
(getf '(:name "Ada" :age 36) :name)
;; => "Ada"
```

An association list:

```lisp
(defparameter *settings*
  '((:host . "localhost")
    (:port . 8080)
    (:debug . nil)))

(cdr (assoc :port *settings*))
;; => 8080
```

A hash table:

```lisp
(let ((table (make-hash-table :test 'equal)))
  (setf (gethash "name" table) "Ada")
  (gethash "name" table))
```

A structure:

```lisp
(defstruct user
  name
  age
  role)

(make-user :name "Ada" :age 36 :role :researcher)
```

A class:

```lisp
(defclass user ()
  ((name :initarg :name :accessor user-name)
   (age :initarg :age :accessor user-age)
   (role :initarg :role :accessor user-role)))
```

**Design meaning:** a representation choice is also a statement about API stability. Raw lists and plists are easy to create but weak at communicating invariants. Structures and classes make fields and accessors explicit. Hash tables are flexible but often hide schema. CLOS classes and generic functions make extension easier but introduce dispatch and object-system complexity.

**Common Pitfalls**

The most common Common Lisp data-modeling pitfall is using lists as informal records.

```lisp
;; Fragile:
(list "Ada" 36 :researcher)
```

This forces every reader to remember positional meaning. If the data has stable fields, prefer a structure, class, or at least a plist.

A second pitfall is using hash tables as universal objects. Hash tables are good maps; they are not automatically good domain models. Without constructors and validators, they become dynamically shaped bags of uncertainty.

### Modeling structured data — `defstruct`, `defclass`, constructor discipline, accessors

Structured data should make field meaning visible. Common Lisp gives two major built-in choices: `defstruct` and `defclass`.

`defstruct` is usually the first choice for simple record-like data.

```lisp
(defstruct point
  x
  y)

(defun point-distance-from-origin (point)
  (sqrt (+ (expt (point-x point) 2)
           (expt (point-y point) 2))))
```

`defclass` is the first choice when the object should participate in CLOS protocols, inheritance, generic functions, method combination, or class redefinition workflows.

```lisp
(defclass shape () ())

(defclass circle (shape)
  ((radius :initarg :radius
           :reader circle-radius)))

(defgeneric area (shape))

(defmethod area ((shape circle))
  (* pi (expt (circle-radius shape) 2)))
```

| Modeling option | Strength                                                    | Cost                               | Best use                        | Common failure mode                                |
| --------------- | ----------------------------------------------------------- | ---------------------------------- | ------------------------------- | -------------------------------------------------- |
| plist           | Very lightweight named data                                 | Weak invariants, easy misspellings | Small option lists and metadata | Treating it as a stable domain object              |
| alist           | Simple ordered mapping                                      | Linear lookup                      | Small environment-like maps     | Performance issues or unclear key tests            |
| hash table      | Efficient mutable mapping                                   | Schema hidden unless documented    | Dynamic lookup tables           | Silent missing keys and unclear equality test      |
| `defstruct`     | Named fields, simple constructor/accessors, often efficient | Less open than CLOS                | Stable records, internal data   | Reimplementing object protocols manually           |
| `defclass`      | CLOS integration, generic dispatch, extension               | More conceptual overhead           | Extensible domain objects       | Creating class hierarchies without behavioral need |
| condition class | Structured exceptional situation                            | Specialized to condition system    | Error/warning/restart protocols | Using strings where structured handling is needed  |

Constructor discipline is important. The default constructor from `defstruct` may be enough, but domain validation often belongs in a wrapper constructor.

```lisp
(defstruct user
  name
  age)

(defun make-valid-user (&key name age)
  (check-type name string)
  (check-type age (integer 0 *))
  (make-user :name name :age age))
```

For CLOS, initialization can be controlled through `initialize-instance`, but public constructors are often clearer for domain validation.

```lisp
(defun make-user* (&key name age)
  (check-type name string)
  (check-type age (integer 0 *))
  (make-instance 'user :name name :age age))
```

**Failure-first explanation: accessors are API**

The tempting but wrong mental model is: “Slots are just fields, and accessors are just convenient field syntax.”

The surprising behavior is that accessors are functions, often generic functions in CLOS. Exporting an accessor exposes an API commitment. Changing slot names, mutability, initialization rules, or representation can affect callers.

The correct semantic explanation is that accessors mediate representation. In Common Lisp, they participate in the function/generic-function world.

The professional rule of thumb is: **export accessors only when callers should depend on them; otherwise keep construction and observation behind deliberate functions.**

The boundary changes for internal structures. Inside a tightly controlled package, direct accessors may be fine. Across package boundaries, accessors are part of the public contract.

**Common Pitfalls**

One pitfall is choosing `defclass` because it feels more “professional.” If no polymorphic behavior or CLOS extension is needed, `defstruct` is often simpler and clearer.

The opposite pitfall is using `defstruct` for a domain where behavior needs to be extended by independent methods across packages. In that case, CLOS may be the better abstraction.

### Modeling optional and missing values — `nil`, multiple values, sentinel, keyword defaults, condition

Common Lisp’s single false value, `nil`, is useful but easily overloaded. It can mean false, empty list, missing value, failure, default, no result, or end of input. A good data model avoids making those meanings ambiguous.

| Situation                              | Good representation                      | Example                       | Why                                       |
| -------------------------------------- | ---------------------------------------- | ----------------------------- | ----------------------------------------- |
| Predicate result                       | generalized boolean                      | `(stringp x)`                 | `nil` vs non-`nil` is idiomatic           |
| Empty list                             | `nil`                                    | `()`                          | Built into language                       |
| Optional argument omitted              | supplied-p variable                      | `(&key (x nil x-supplied-p))` | Distinguishes omitted from explicit `nil` |
| Lookup with possible missing key       | multiple values                          | `(gethash key table)`         | Returns value and present-p               |
| Search with possible failure           | value or `nil`, if `nil` cannot be valid | `(find item seq)`             | Simple idiom                              |
| Search where `nil` can be valid result | multiple values or sentinel              | custom API                    | Avoid ambiguity                           |
| Invalid external input                 | condition or structured error            | `(error 'invalid-input ...)`  | Failure deserves explanation              |
| End of stream                          | API-specific sentinel/error policy       | `read-line` options           | Must distinguish EOF from data            |

`gethash` is the canonical example of multiple values for absence:

```lisp
(let ((table (make-hash-table)))
  (setf (gethash :x table) nil)
  (multiple-value-bind (value present-p)
      (gethash :x table)
    (list value present-p)))
;; => (NIL T)
```

The value is `nil`, but the key is present. A single return value could not express that distinction.

Keyword supplied-p variables solve a similar problem in function calls:

```lisp
(defun configure (&key (debug nil debug-supplied-p))
  (if debug-supplied-p
      (list :debug-explicitly-set debug)
      :debug-defaulted))
```

A sentinel object can distinguish missing values from all domain values.

```lisp
(defparameter *missing* (gensym "MISSING-"))

(defun lookup-or-missing (key alist)
  (let ((pair (assoc key alist)))
    (if pair
        (cdr pair)
        *missing*)))
```

**Design meaning:** absence is a domain concept. It should be modeled with the same care as presence.

**Failure-first explanation: `nil` is too useful to be careless**

The tempting but wrong model is: “Return `nil` whenever something goes wrong or is missing.”

The surprising behavior is that callers cannot know whether `nil` means absent, false, empty, failed, defaulted, or a legitimate result.

The correct explanation is that `nil` has several idiomatic roles, but APIs must avoid ambiguous overlap.

The professional rule of thumb is: **use `nil` for absence only when `nil` is not a valid payload and the failure mode needs no further explanation.**

The boundary changes when failure is exceptional, diagnostic, or externally visible. Then use conditions, multiple values, or structured results.

**Common Pitfalls**

A common pitfall is returning `nil` from parsing functions for all failures. If the caller needs to know why parsing failed, signal a condition or return additional values.

Another pitfall is using supplied-p variables only for non-`nil` defaults. They matter precisely when `nil` is a valid explicit value.

### Modeling finite states — `keyword`, `member`, `case`, `ecase`, CLOS state objects

Small finite states are often represented as keywords.

```lisp
(defparameter *status* :new)
```

A type specifier can document the closed set:

```lisp
(deftype task-status ()
  '(member :new :running :done :failed))
```

Branching:

```lisp
(defun status-label (status)
  (ecase status
    (:new "New")
    (:running "Running")
    (:done "Done")
    (:failed "Failed")))
```

| State modeling option  | Use when                                                 | Strength                                       | Cost                                           |
| ---------------------- | -------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| Keywords               | States are simple symbolic tags                          | Readable, lightweight, idiomatic               | No attached data                               |
| `member` type          | Closed symbolic alternatives need documentation/checking | Works with `typep`, declarations, `check-type` | Not statically exhaustive across whole program |
| `case`                 | Non-exhaustive or default branch acceptable              | Simple branching                               | Can hide missing state handling                |
| `ecase`                | All states should be handled                             | Signals error on unknown state                 | Runtime exhaustiveness only                    |
| Structures/classes     | States need attached data                                | Explicit fields and behavior                   | More overhead                                  |
| CLOS generic functions | Behavior varies by state object type                     | Extensible protocols                           | More design machinery                          |

When state carries data, keyword states may become too weak.

```lisp
(defstruct failed-state
  reason
  retryable-p)
```

Or with CLOS:

```lisp
(defclass task-state () ())

(defclass failed-state (task-state)
  ((reason :initarg :reason :reader failure-reason)
   (retryable-p :initarg :retryable-p :reader retryable-p)))
```

**Failure-first explanation: keywords do not carry invariants**

The tempting but wrong model is: “A keyword state is enough because there are only four states.”

The surprising behavior appears when one state needs extra data, a transition rule, or state-specific behavior. Code accumulates scattered `case` and `typecase` forms.

The correct explanation is that keywords are excellent tags, but they are not full variants with fields.

The professional rule of thumb is: **use keywords for simple closed states; use structures/classes when states carry data or behavior.**

The boundary changes when the state machine becomes central to the domain. At that point, explicit transition functions, validation, and possibly CLOS protocols become more maintainable.

**Common Pitfalls**

A common pitfall is using plain `case` when the state set is intended to be exhaustive. Prefer `ecase` during internal development so new or invalid states are discovered quickly.

### Modeling domain concepts — `constructor`, `predicate`, `accessor`, `generic function`, `protocol`

A domain concept should usually have at least one of these: a constructor, a predicate, an accessor set, a generic protocol, or a validation boundary. Otherwise, it is only an informal convention.

For example, a simple email address could initially be represented as a string:

```lisp
(defun email-address-p (x)
  (and (stringp x)
       (position #\@ x)))
```

A stronger model might wrap it:

```lisp
(defstruct email-address
  local-part
  domain)

(defun make-email-address* (string)
  ;; Simplified; real email parsing is more complex.
  (let ((pos (position #\@ string)))
    (unless pos
      (error "Invalid email address: ~S" string))
    (make-email-address
     :local-part (subseq string 0 pos)
     :domain (subseq string (1+ pos)))))
```

| Domain need           | Common Lisp mechanism | Example                                 | Practical consequence                          |
| --------------------- | --------------------- | --------------------------------------- | ---------------------------------------------- |
| Validate creation     | Constructor wrapper   | `make-email-address*`                   | Invalid values do not enter core domain easily |
| Recognize values      | Predicate             | `email-address-p`                       | Branching and validation become explicit       |
| Observe fields        | Accessors             | `email-address-domain`                  | Representation can be documented               |
| Vary behavior by type | Generic function      | `(defgeneric render (x stream))`        | Open extension                                 |
| Signal invalid input  | Condition type        | `invalid-email-address`                 | Structured error handling                      |
| Hide representation   | Package exports       | Export constructor/predicate, not slots | Maintains abstraction boundary                 |

**Design meaning:** Common Lisp does not force data abstraction, but it supports it well. Package exports, constructors, accessors, predicates, and generic functions together define a domain boundary.

**Common Pitfalls**

One pitfall is letting unvalidated raw data spread throughout the program. Another is building a heavy class hierarchy before the domain has stabilized. The middle path is to create small constructors and predicates early, then strengthen representation when needed.

### Constraining input — `check-type`, `assert`, constructor validation, conditions

Input constraints should be enforced at the boundary where uncertain data enters a trusted part of the program.

For internal helper functions:

```lisp
(defun positive-integer-p (x)
  (and (integerp x)
       (plusp x)))
```

For explicit checks:

```lisp
(defun make-page-size (n)
  (check-type n (integer 1 1000))
  n)
```

For arbitrary invariants:

```lisp
(defun normalize-ratio (numerator denominator)
  (assert (not (zerop denominator))
          (denominator)
          "Denominator must not be zero.")
  (/ numerator denominator))
```

For public APIs, structured conditions are often better than plain `error` strings.

```lisp
(define-condition invalid-page-size (error)
  ((value :initarg :value :reader invalid-page-size-value))
  (:report (lambda (condition stream)
             (format stream "Invalid page size: ~S"
                     (invalid-page-size-value condition)))))

(defun make-page-size (n)
  (unless (typep n '(integer 1 1000))
    (error 'invalid-page-size :value n))
  n)
```

| Constraint mechanism   | Best use                                 | Strength                     | Weakness                                     |
| ---------------------- | ---------------------------------------- | ---------------------------- | -------------------------------------------- |
| Predicate              | Reusable tests                           | Simple and composable        | Caller must decide failure policy            |
| `check-type`           | Interactive/development checks on places | Concise and idiomatic        | May not express rich domain errors           |
| `assert`               | Internal invariants                      | Clear invariant statement    | Not a user-facing validation model           |
| Constructor validation | Domain object creation                   | Centralizes invariants       | Must prevent bypassing                       |
| Structured condition   | Public/library failure                   | Handleable and inspectable   | More code                                    |
| Type declaration       | Compiler information                     | Optimization and diagnostics | Not sufficient for untrusted data validation |

**Failure-first explanation: checking too late makes invalid states normal**

The tempting but wrong model is: “Check the value only when something breaks.”

The surprising behavior is that invalid data spreads through lists, hash tables, structures, and objects until the actual error location is far from the cause.

The correct explanation is that dynamic languages need strong boundary discipline because invalid data can travel freely.

The professional rule of thumb is: **validate at system boundaries and constructors; assert inside trusted internal logic.**

The boundary changes for exploratory REPL code. During exploration, quick checks are fine. For durable code, constraints should move into constructors, parsers, and API entry points.

**Common Pitfalls**

A common pitfall is using `assert` for external user input. Assertions are best for internal invariants. External input should produce domain-specific errors or conditions with enough information for callers.

### Validating external and unknown data — `parse`, `validate`, `condition`, `schema by convention`

Common Lisp does not impose a universal schema-validation system. Validation is therefore a design task.

External data often enters as strings, streams, JSON-like structures, S-expressions, database rows, command-line arguments, pathnames, or foreign objects. Do not let unknown external shape become internal domain shape without parsing.

| Boundary            | Typical raw representation                        | Validation strategy                   | Risk if skipped                        |
| ------------------- | ------------------------------------------------- | ------------------------------------- | -------------------------------------- |
| Text file           | string/stream/lines                               | parse into structures/classes         | Later failures lack source context     |
| JSON/YAML/TOML      | hash tables/alists/plists depending on library    | validate keys/types/ranges            | Silent missing/misspelled fields       |
| CLI arguments       | strings                                           | parse and signal usage conditions     | Treating strings as typed values       |
| Network input       | bytes/strings/objects                             | strict parser and conditions          | Security and correctness failures      |
| Database rows       | lists/vectors/plists/classes depending on library | convert at repository boundary        | Leaking persistence shape into domain  |
| S-expression config | Lisp data                                         | restricted reader/parser + validation | Unsafe reader behavior or schema drift |
| FFI result          | foreign pointer/object                            | wrapper type and lifetime checks      | Memory/resource misuse                 |

Example boundary conversion:

```lisp
(defstruct config
  host
  port
  debug-p)

(define-condition invalid-config (error)
  ((reason :initarg :reason :reader invalid-config-reason))
  (:report (lambda (condition stream)
             (format stream "Invalid config: ~A"
                     (invalid-config-reason condition)))))

(defun parse-config-plist (plist)
  (let ((host (getf plist :host))
        (port (getf plist :port))
        (debug-p (getf plist :debug nil)))
    (unless (stringp host)
      (error 'invalid-config :reason "HOST must be a string."))
    (unless (typep port '(integer 1 65535))
      (error 'invalid-config :reason "PORT must be an integer from 1 to 65535."))
    (make-config :host host :port port :debug-p debug-p)))
```

**Design meaning:** external data should be converted into internal domain objects. This prevents the entire program from depending on the accidental shape of an input library.

**Common Pitfalls**

A common pitfall is treating a plist or hash table from a JSON parser as the application’s domain object. That makes key spelling, missing-key behavior, equality test, and library representation leak everywhere.

Another pitfall is using unrestricted `read` for external configuration. Lisp-readable data can be appropriate in trusted developer-controlled contexts, but it should not be treated as a generic safe parser for untrusted input.

### Conversion, coercion, parsing, and casting — `coerce`, `parse-integer`, `read-from-string`, `typep`

Common Lisp has several conversion mechanisms, and they should not be confused.

| Task                              | Construct                      | Example                      | Safety level             | Failure mode                                      |
| --------------------------------- | ------------------------------ | ---------------------------- | ------------------------ | ------------------------------------------------- |
| Convert sequence type             | `coerce`                       | `(coerce '(1 2 3) 'vector)`  | Controlled conversion    | Error if impossible                               |
| Parse integer from string         | `parse-integer`                | `(parse-integer "123")`      | Domain-specific parser   | Error or `nil` with options                       |
| Convert character/string case     | `string-upcase`, `char-upcase` | `(string-upcase "abc")`      | Safe transformation      | New string or modified variant depending function |
| Check type                        | `typep`                        | `(typep x 'integer)`         | Runtime predicate        | Boolean result                                    |
| Assert/check type                 | `check-type`                   | `(check-type x integer)`     | Runtime check            | Condition/restart behavior                        |
| Read Lisp object from string      | `read-from-string`             | `(read-from-string "(1 2)")` | Trusted Lisp syntax only | Reader risks                                      |
| Treat object as type for compiler | `the`                          | `(the fixnum x)`             | Compiler contract        | Dangerous if false under low safety               |

`coerce` is for actual conversions between compatible types:

```lisp
(coerce '(1 2 3) 'vector)
;; => #(1 2 3)

(coerce "abc" 'list)
;; => (#\a #\b #\c)
```

Parsing is different:

```lisp
(parse-integer "123")
;; => 123
```

`read-from-string` is not a general number parser or configuration parser. It invokes the Lisp reader.

```lisp
(read-from-string "123")
;; => 123

(read-from-string "(+ 1 2)")
;; => (+ 1 2), a Lisp form as data
```

**Failure-first explanation: parsing is not casting**

The tempting but wrong model is: “If I need an integer from a string, just read or coerce it.”

The surprising behavior is that `coerce` does not parse numeric text into numbers, and `read-from-string` reads Lisp syntax with reader semantics.

The correct explanation is that conversion, parsing, checking, and compiler assertion are different operations.

The professional rule of thumb is: **use the narrowest operation that matches the input format.** Use `parse-integer` for integer text, not unrestricted `read`.

The boundary changes for trusted Lisp data files. In controlled tools, reading Lisp objects can be appropriate, but it still requires clear trust and validation boundaries.

**Common Pitfalls**

A common pitfall is using `read-from-string` to parse user input because it “works” for numbers and lists. That imports the full reader into an input boundary. Another is using `the` to force a type instead of validating data. `the` communicates type expectation to the compiler; it is not an input parser.

### Collections by task — `list`, `vector`, `array`, `hash-table`, `sequence`

Common Lisp collections should be chosen by access pattern.

| Task pattern                 | Preferred collection | Why                                  | Caveat                                        |
| ---------------------------- | -------------------- | ------------------------------------ | --------------------------------------------- |
| Build incrementally at front | list                 | `cons` and `push` are cheap          | Reverse if original order matters             |
| Traverse sequentially        | list or vector       | Both are sequences                   | Choose by construction/access needs           |
| Random access by index       | vector               | `aref`/`svref` efficient             | Insertion in middle/front costly              |
| Dense numeric/grid data      | specialized array    | Supports element type and dimensions | Requires more declaration/representation care |
| Key-value lookup             | hash table           | Efficient lookup/update              | Equality test choice matters                  |
| Small ordered lookup         | alist                | Simple and readable                  | Linear lookup                                 |
| Small keyword options        | plist                | Compact keyword-value structure      | Misspelled keys not caught                    |
| Generic sequence operation   | sequence functions   | Work across lists/vectors/strings    | Result type and allocation must be understood |

Lists:

```lisp
(let ((xs nil))
  (push 1 xs)
  (push 2 xs)
  (nreverse xs))
;; => (1 2)
```

Vectors:

```lisp
(let ((v (vector 1 2 3)))
  (aref v 1))
;; => 2
```

Arrays:

```lisp
(make-array '(2 3) :initial-element 0)
```

Hash tables:

```lisp
(let ((table (make-hash-table :test 'equal)))
  (setf (gethash "a" table) 1)
  (gethash "a" table))
```

Sequence functions:

```lisp
(remove-if-not #'evenp '(1 2 3 4))
;; => (2 4)

(position #\a "banana")
;; => 1
```

**Design meaning:** `sequence` is a useful abstraction, but not a free performance abstraction. List, vector, and string operations differ in allocation, access, and result behavior.

**Common Pitfalls**

A common pitfall is using lists for random-access workloads. Another is using hash tables without choosing the right equality test. A third is assuming sequence functions are lazy; many Common Lisp sequence operations are eager and allocate results.

### Lists as data, syntax, and sequences — `cons`, `proper list`, `tree`, `destructive operation`

Lists have several roles in Common Lisp:

| Role             | Example               | Good use                | Danger                                |
| ---------------- | --------------------- | ----------------------- | ------------------------------------- |
| Sequence         | `(1 2 3)`             | Ordered traversal       | Inefficient random access             |
| Stack            | `push`, `pop`         | Front insertion/removal | Reversal needed for accumulated order |
| Tree             | `((a b) (c d))`       | Symbolic structures     | Need recursive traversal discipline   |
| Association list | `((:x . 1) (:y . 2))` | Small maps              | Linear lookup                         |
| Property list    | `(:x 1 :y 2)`         | Options, metadata       | Weak schema                           |
| Program form     | `(+ 1 2)`             | Macro/code manipulation | Not every list is valid code          |
| Dotted pair      | `(a . b)`             | Low-level pair          | Not a proper list                     |

Tree processing requires recursive thinking:

```lisp
(defun count-atoms (tree)
  (cond
    ((null tree) 0)
    ((atom tree) 1)
    (t (+ (count-atoms (car tree))
          (count-atoms (cdr tree))))))
```

Destructive list operations are useful but sharp:

```lisp
(nreverse xs)
(nconc xs ys)
(delete item xs)
```

These may modify existing structure.

**Failure-first explanation: non-destructive and destructive names matter**

The tempting but wrong model is: “`reverse` and `nreverse` are interchangeable except speed.”

The surprising behavior is that `nreverse` may modify the original list structure.

The correct explanation is that many `n...` functions are allowed to reuse cons cells destructively.

The professional rule of thumb is: **use destructive operations only when the structure is owned and no aliases matter.**

The boundary changes in local freshly allocated data. If a list was just built and has not escaped, destructive reversal is idiomatic.

**Common Pitfalls**

The most common pitfall is destructively modifying shared list structure. This can happen accidentally when two variables point to the same cons chain or when literal/quoted data is mutated.

### Property lists and association lists — `plist`, `alist`, `getf`, `assoc`, key tests`

Property lists and association lists are lightweight mapping representations, but they have different shapes and conventions.

Property list:

```lisp
'(:name "Ada" :age 36 :role :researcher)
```

Access:

```lisp
(getf '(:name "Ada" :age 36) :age)
;; => 36
```

Association list:

```lisp
'((:name . "Ada")
  (:age . 36)
  (:role . :researcher))
```

Access:

```lisp
(cdr (assoc :age '((:name . "Ada")
                   (:age . 36))))
;; => 36
```

| Feature                | Plist                                      | Alist                               |
| ---------------------- | ------------------------------------------ | ----------------------------------- |
| Shape                  | Alternating keys and values                | List of pairs                       |
| Access                 | `getf`                                     | `assoc`, `rassoc`                   |
| Common key style       | Keywords                                   | Any object, depending on test       |
| Ordering               | Preserved as list order                    | Preserved as pair order             |
| Duplicate key behavior | First matching property by `getf` behavior | First matching pair by `assoc`      |
| Mutation               | `(setf (getf plist key) value)`            | Modify pair or list                 |
| Good for               | Options, metadata, simple records          | Small maps, environments, shadowing |
| Bad for                | Large maps, validated domain records       | Large maps, high-performance lookup |

`assoc` defaults to an equality test appropriate to its specification, but explicit tests are often clearer when keys are strings or structured values.

```lisp
(assoc "name" '(("name" . "Ada")) :test #'string=)
```

**Design meaning:** plists and alists are representation conveniences, not substitutes for deliberate domain modeling. They are most useful when the data is small, local, and structurally simple.

**Common Pitfalls**

A common pitfall is using `getf` on data that may have misspelled or missing keys and then interpreting `nil` as meaningful. Another is using alists for large maps where hash tables are appropriate.

### Hash tables — `gethash`, equality test, multiple values, mutation`

Hash tables provide mutable key-value storage. The equality test is chosen when the table is created.

```lisp
(make-hash-table :test 'eq)
(make-hash-table :test 'eql)
(make-hash-table :test 'equal)
(make-hash-table :test 'equalp)
```

| Test     | Good key type                                               | Common use                 | Pitfall                               |
| -------- | ----------------------------------------------------------- | -------------------------- | ------------------------------------- |
| `eq`     | Symbols, object identity keys                               | Interned symbolic keys     | Wrong for strings and general numbers |
| `eql`    | Numbers/chars/symbols with default CL semantics             | Default general keys       | Not structural for strings/lists      |
| `equal`  | Strings, lists, structural keys                             | Text/content keys          | More expensive than identity tests    |
| `equalp` | Case-insensitive-ish, more permissive structural comparison | User-facing loose matching | Too permissive for strict keys        |

`gethash` returns two values: value and present-p.

```lisp
(let ((table (make-hash-table :test 'equal)))
  (setf (gethash "x" table) nil)
  (multiple-value-bind (value present-p)
      (gethash "x" table)
    (list value present-p)))
;; => (NIL T)
```

Removing keys:

```lisp
(remhash "x" table)
```

Iterating:

```lisp
(maphash (lambda (key value)
           (format t "~A => ~A~%" key value))
         table)
```

**Failure-first explanation: missing and present-with-nil differ**

The tempting but wrong model is: “If `(gethash key table)` returns `nil`, the key is missing.”

The surprising behavior is that the key may be present with value `nil`.

The correct explanation is that `gethash` returns a second value indicating presence.

The professional rule of thumb is: **always use the second value when `nil` is a valid stored value.**

The boundary changes when the table convention forbids `nil` values. Then single-value access may be acceptable, but document the convention.

**Common Pitfalls**

The most common pitfall is choosing `eq` for string keys. Another is relying on hash table iteration order. Do not treat hash table traversal order as a stable semantic ordering unless a specific library or implementation contract says so.

### Vectors, arrays, and strings — `vector`, `array`, `aref`, `elt`, `fill-pointer`, specialized array`

Vectors are one-dimensional arrays. Strings are specialized arrays of characters. Arrays can be multidimensional and may have element-type declarations.

```lisp
(vector 1 2 3)
;; => #(1 2 3)

(aref #(1 2 3) 0)
;; => 1
```

Mutable vector:

```lisp
(let ((v (vector 1 2 3)))
  (setf (aref v 1) 99)
  v)
;; => #(1 99 3)
```

General array:

```lisp
(let ((a (make-array '(2 2) :initial-element 0)))
  (setf (aref a 0 1) 42)
  a)
```

Adjustable vector with fill pointer:

```lisp
(defparameter *buffer*
  (make-array 0 :adjustable t :fill-pointer 0))

(vector-push-extend "item" *buffer*)
```

| Construct            | Use                                           | Notes                                                 |
| -------------------- | --------------------------------------------- | ----------------------------------------------------- |
| `vector`             | Create simple vector from values              | Literal-like convenience                              |
| `make-array`         | Create configurable array/vector              | Element type, dimensions, fill pointer, adjustability |
| `aref`               | Access array element                          | Works for arrays generally                            |
| `svref`              | Access simple vector element                  | More specific                                         |
| `elt`                | Generic sequence element access               | Works on sequences, may be less specific              |
| `length`             | Sequence length                               | Lists, vectors, strings                               |
| `array-dimensions`   | Array shape                                   | Multidimensional arrays                               |
| `vector-push-extend` | Append to adjustable vector with fill pointer | Useful for buffers                                    |

**Design meaning:** arrays and vectors are appropriate when indexed access, compact storage, or numeric/data-buffer patterns matter. Lists are not the universal sequence representation.

**Common Pitfalls**

A common pitfall is using `elt` everywhere because it is generic. Genericity can hide cost. If the representation is known, `aref`, `svref`, or list-specific operations may be clearer.

Another pitfall is assuming arrays are automatically specialized for performance. Element type declarations and implementation behavior matter.

### Strings as data — `string`, `character`, `text`, `symbol-name`, comparison`

Strings require explicit content comparison and should not be confused with symbols.

```lisp
(string= "abc" "abc")
;; true

(string-equal "ABC" "abc")
;; true
```

Symbols have names:

```lisp
(symbol-name 'hello)
;; Often "HELLO" under default reader case behavior
```

Interning a string as a symbol is a package operation:

```lisp
(intern "HELLO")
```

| Task                       | Use                                                        | Avoid                                          |
| -------------------------- | ---------------------------------------------------------- | ---------------------------------------------- |
| Compare exact strings      | `string=`                                                  | `eq`                                           |
| Compare case-insensitively | `string-equal`                                             | Manual case normalization unless needed        |
| Convert symbol to name     | `symbol-name`                                              | Assuming source spelling preserved             |
| Find/create symbol by name | `intern`                                                   | Interning untrusted arbitrary names carelessly |
| Build strings              | `format`, `with-output-to-string`, concatenation functions | Repeated inefficient concatenation in loops    |
| Process characters         | character functions                                        | Treating one-character strings as characters   |

Example string building:

```lisp
(with-output-to-string (out)
  (format out "Name: ~A~%" "Ada")
  (format out "Role: ~A~%" "Researcher"))
```

**Common Pitfalls**

One pitfall is confusing the printed name of a symbol with its source spelling. Under normal readtable behavior, ordinary symbol names are uppercased internally.

Another pitfall is using symbols for user-provided strings. Symbols are interned in packages; arbitrary user text usually belongs in strings, not symbols.

### Symbols as data — `keyword`, `interned symbol`, `uninterned symbol`, `gensym`

Symbols are excellent for symbolic tags, names, operators, and identifiers internal to Lisp systems.

| Symbol kind                | Syntax/example    | Use                            | Caveat                                               |
| -------------------------- | ----------------- | ------------------------------ | ---------------------------------------------------- |
| Ordinary interned symbol   | `'foo`            | Program names, symbolic data   | Package identity matters                             |
| Keyword symbol             | `:foo`            | Options, states, property keys | Self-evaluating, globally visible in keyword package |
| Package-qualified external | `cl:car`          | Public symbol reference        | Requires export                                      |
| Package-qualified internal | `pkg::x`          | Debug/internal access          | Brittle dependency                                   |
| Uninterned symbol          | `#:x`, `(gensym)` | Unique generated names         | Not findable by package lookup                       |
| Gensym                     | `(gensym "TMP-")` | Macro temporaries              | Printed name is not identity                         |

```lisp
(let ((a (gensym "X-"))
      (b (gensym "X-")))
  (eq a b))
;; false
```

**Design meaning:** symbols combine identity, naming, package membership, and language-level binding roles. This makes them powerful, but also inappropriate for arbitrary user text.

**Common Pitfalls**

A common pitfall is using `intern` on unbounded external input, thereby filling packages with arbitrary symbols. Use strings for ordinary external text.

Another pitfall is comparing symbol names when symbol identity is the intended concept. For interned symbols in the same package context, identity is often the semantic point.

### Numeric data modeling — `integer`, `fixnum`, `bignum`, `ratio`, `float`, `complex`

Common Lisp’s numeric model is more expressive than many mainstream languages. It supports exact integers, ratios, floats, and complex numbers. Implementations optimize common numeric cases, but representation matters.

| Numeric type/concept | Use when                               | Strength                                      | Cost/caveat                               |
| -------------------- | -------------------------------------- | --------------------------------------------- | ----------------------------------------- |
| `integer`            | Exact whole numbers                    | No language-level fixed overflow              | Large integers may allocate               |
| `fixnum`             | Implementation-efficient small integer | Performance-sensitive code                    | Range is implementation-dependent         |
| `bignum`             | Large integer                          | Exact arbitrary precision                     | Allocation and arithmetic cost            |
| `ratio`              | Exact rational value                   | Precise fractions                             | Can grow large and allocate               |
| `single-float`       | Approximate numeric work               | Compact float                                 | Precision limits                          |
| `double-float`       | More precise approximate numeric work  | Common numeric default in serious computation | Still inexact                             |
| `complex`            | Complex arithmetic                     | Built into numeric tower                      | Representation depends on component types |

```lisp
(+ 1 2/3)
;; => 5/3

(+ 1 2.0d0)
;; => 3.0d0
```

Type declarations can matter in numeric kernels:

```lisp
(defun sum-fixnums (xs)
  (declare (optimize (speed 3) (safety 1)))
  (let ((sum 0))
    (declare (type fixnum sum))
    (dolist (x xs sum)
      (declare (type fixnum x))
      (incf sum x))))
```

This kind of code should be justified by profiling and checked carefully.

**Failure-first explanation: exact arithmetic can be expensive**

The tempting but wrong model is: “Exact arithmetic is always better.”

The surprising behavior is that ratios and bignums can allocate and become expensive in tight loops.

The correct explanation is that Common Lisp preserves exactness where appropriate, but exactness has a cost model.

The professional rule of thumb is: **use exact arithmetic for correctness of discrete/symbolic/rational domains; use declared floating-point arithmetic for numeric algorithms that require approximate performance.**

The boundary changes when input data comes from external numeric systems. Convert deliberately and document precision expectations.

**Common Pitfalls**

A common pitfall is accidentally introducing ratios into performance-sensitive numeric code. Another is using `fixnum` declarations without understanding implementation ranges and safety implications.

### Modeling behavior with functions and closures — `function object`, `closure`, environment capture`

Functions can be data. Closures can capture lexical environment.

```lisp
(defun make-adder (n)
  (lambda (x)
    (+ x n)))

(let ((add10 (make-adder 10)))
  (funcall add10 5))
;; => 15
```

This is a data-modeling tool, not only a control-flow tool. A closure can represent behavior plus private captured state.

```lisp
(defun make-counter ()
  (let ((count 0))
    (lambda ()
      (incf count))))
```

| Use of closure         | Good for                       | Caveat                                      |
| ---------------------- | ------------------------------ | ------------------------------------------- |
| Parameterized behavior | Callbacks, strategies, filters | Hidden captured state can surprise          |
| Encapsulation          | Private state without class    | Harder to inspect than explicit object      |
| Deferred computation   | Thunks/lazy-ish behavior       | Evaluation timing must be clear             |
| Function factory       | Custom predicates/transforms   | Debugging anonymous functions can be harder |
| Local protocol         | Small behavior object          | CLOS may be better for open extension       |

**Design meaning:** Common Lisp can model some objects as closures and some behaviors as generic functions. The choice depends on whether behavior is private and local or public and extensible.

**Common Pitfalls**

A common pitfall is capturing mutable lexical state without documenting it. Another is using closures for complex domain objects where a structure or class would be easier to inspect, print, test, and extend.

### Type safety boundaries — `internal invariant`, `external boundary`, `unchecked assumption`, `declaration`

Common Lisp type safety is layered. Some checks are language/runtime checks. Some are implementation/compiler checks. Some are programmer discipline. Good modeling separates trusted internal invariants from untrusted boundaries.

| Boundary kind       | Example                  | Appropriate mechanism                  | Risk                       |
| ------------------- | ------------------------ | -------------------------------------- | -------------------------- |
| External input      | JSON, CLI, file, network | Parse, validate, structured conditions | Invalid data spreads       |
| Public function API | Exported function        | Check types or document contract       | Callers misuse function    |
| Internal helper     | Local function           | Assertions, declarations, tests        | Too much checking noise    |
| Performance kernel  | Numeric loop             | Declarations after validation          | Wrong declaration bugs     |
| Package boundary    | Exported symbols         | Constructors, predicates, accessors    | Representation leaks       |
| FFI boundary        | Foreign pointer/data     | Wrappers, lifetime protocol            | Crashes, leaks, corruption |
| Macro boundary      | Syntax input             | Expansion validation                   | Bad generated code         |

**Professional rule:** do not try to make every internal function defensively validate everything. Instead, validate at boundaries, preserve invariants through constructors and APIs, and use declarations/assertions internally where the invariant should already hold.

**Common Pitfalls**

A common pitfall is either validating nothing or validating everything repeatedly. Both are signs of unclear boundaries. A well-modeled system knows where raw data becomes trusted domain data.

### Behavioral contracts — `predicate`, `generic function`, `documentation`, `condition`, `test`

Common Lisp lacks a single built-in contract system that dominates professional practice. Contracts are usually expressed through a combination of mechanisms.

| Contract mechanism | Expresses                | Example                           | Strength                 | Weakness                                    |
| ------------------ | ------------------------ | --------------------------------- | ------------------------ | ------------------------------------------- |
| Predicate          | Recognizable property    | `user-p`, `valid-token-p`         | Simple and composable    | Caller must enforce                         |
| Constructor        | Valid creation           | `make-valid-user`                 | Centralizes invariants   | Can be bypassed if raw constructor exported |
| Accessor           | Observable field         | `user-name`                       | Stable interface         | Exposes representation if too broad         |
| Generic function   | Behavioral protocol      | `render`, `serialize`, `validate` | Extensible               | Requires method discipline                  |
| Condition type     | Failure protocol         | `invalid-user`                    | Handleable errors        | More boilerplate                            |
| Docstring          | Human-readable contract  | function/class docs               | REPL-visible             | Not enforced                                |
| Declaration        | Compiler-facing contract | `(declare (type ...))`            | Optimization/diagnostics | Not complete validation                     |
| Test               | Executable contract      | unit/property tests               | Practical confidence     | Not exhaustive proof                        |

Example protocol:

```lisp
(defgeneric validate (object)
  (:documentation "Return true if OBJECT satisfies its domain invariants, otherwise signal a condition or return NIL by protocol."))

(defmethod validate ((object user))
  (and (stringp (user-name object))
       (typep (user-age object) '(integer 0 *))))
```

**Design meaning:** in Common Lisp, a professional API contract is usually multi-layered. It is not only a type annotation.

**Common Pitfalls**

One pitfall is relying on docstrings alone for critical invariants. Another is relying on tests alone when invalid objects can be created freely. Good contracts use constructors and boundaries to prevent invalid state from becoming normal.

### Generic helpers and reusable data operations — `sequence`, `generic function`, `higher-order function`, `macro`

Reusable helpers should be designed according to the abstraction needed.

| Need                                   | Prefer                                     | Why                                   | Avoid                      |
| -------------------------------------- | ------------------------------------------ | ------------------------------------- | -------------------------- |
| Same computation over evaluated values | Function                                   | Simple, inspectable, composable       | Macro                      |
| Behavior varies by type/class          | Generic function                           | CLOS dispatch                         | Scattered `typecase`       |
| Transform sequence values              | Higher-order function                      | `map`, `remove-if`, `reduce` patterns | Manual loop unless needed  |
| Need custom binding/evaluation         | Macro                                      | Syntax-level abstraction              | Function cannot express it |
| Need efficient specialized behavior    | Generic function + methods or declarations | Controlled extension/performance      | Premature compiler macros  |
| Need configurable strategy             | Function argument/closure                  | Simple behavior injection             | Global special variable    |

Function helper:

```lisp
(defun normalize-name (name)
  (string-downcase (string-trim " " name)))
```

Higher-order helper:

```lisp
(defun select-valid-users (users)
  (remove-if-not #'valid-user-p users))
```

Generic helper:

```lisp
(defgeneric object-id (object))

(defmethod object-id ((user user))
  (user-id user))
```

**Common Pitfalls**

A common pitfall is using macros for reusable value-level computation. If all arguments should be evaluated normally, use a function.

Another pitfall is using `typecase` inside generic helpers when CLOS dispatch would make extension cleaner. Use `typecase` at boundaries and generic functions for open behavior.

### Data modeling decision table — `representation`, `invariant`, `access`, `extension`, `cost`

| If the task is...                                      | Prefer...                         | Because...                              | Watch for...                                                                                 |
| ------------------------------------------------------ | --------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------- |
| Represent a simple symbolic option                     | keyword                           | Lightweight and self-evaluating         | Keyword package pollution is usually fine for fixed program symbols, not arbitrary user text |
| Represent a small finite state                         | keyword + `member` type + `ecase` | Clear closed symbolic set               | State with data needs a richer representation                                                |
| Represent a simple record                              | `defstruct`                       | Named fields and simple accessors       | Public constructor may bypass validation                                                     |
| Represent extensible domain behavior                   | `defclass` + generic functions    | CLOS protocols support extension        | Overengineering if no polymorphism is needed                                                 |
| Represent key-value metadata                           | plist                             | Compact and idiomatic for options       | Misspelled/missing keys                                                                      |
| Represent small ordered lookup                         | alist                             | Simple pair structure                   | Linear lookup                                                                                |
| Represent general mutable map                          | hash table                        | Efficient lookup/update                 | Equality test and missing-value ambiguity                                                    |
| Represent ordered sequence with cheap front operations | list                              | Consing at front is cheap               | Random access is poor                                                                        |
| Represent indexed sequence                             | vector                            | Fast index access                       | Insertion/resizing considerations                                                            |
| Represent dense numeric data                           | specialized array                 | Better storage/performance potential    | Declaration and implementation details matter                                                |
| Represent absence where `nil` is not valid             | `nil`                             | Idiomatic and simple                    | Ambiguous if `nil` becomes valid                                                             |
| Represent absence where `nil` is valid                 | multiple values or sentinel       | Disambiguates presence                  | Callers must observe protocol                                                                |
| Represent recoverable invalid data                     | condition                         | Structured handling                     | More design work                                                                             |
| Represent behavior                                     | function/closure/generic function | Values can be callable and dispatchable | Hidden state or overgeneric design                                                           |
| Represent syntax                                       | S-expression + macro protocol     | Direct code-as-data manipulation        | Phase confusion and capture                                                                  |
### Type specifiers by modeling task — `deftype`, `satisfies`, `member`, `or`, `and`, `not`

Common Lisp type specifiers are useful for documentation, runtime checks, declarations, and compiler communication. They are not only names of classes. A type specifier can be a symbol such as `integer`, a compound form such as `(integer 0 10)`, a logical combination such as `(or string symbol)`, or a user-defined type alias through `deftype`.

```lisp id="xkgcja"
(typep 5 '(integer 0 10))
;; true

(typep :done '(member :new :running :done :failed))
;; true

(typep "abc" '(or string symbol))
;; true
```

| Modeling task        | Type specifier pattern       | Example                                | Use                                       |
| -------------------- | ---------------------------- | -------------------------------------- | ----------------------------------------- |
| Numeric range        | `(integer low high)`         | `(integer 1 65535)`                    | Ports, counts, limits                     |
| Non-negative integer | `(integer 0 *)`              | `(integer 0 *)`                        | Sizes, indexes, counts                    |
| Finite symbolic set  | `(member ...)`               | `(member :new :done :failed)`          | Closed states                             |
| Union type           | `(or ...)`                   | `(or string pathname)`                 | Accept several representations            |
| Intersection type    | `(and ...)`                  | `(and integer (satisfies evenp))`      | Constrained runtime predicate combination |
| Exclusion            | `(not ...)`                  | `(not null)`                           | Sometimes useful, often less readable     |
| Predicate-based type | `(satisfies predicate-name)` | `(satisfies valid-user-id-p)`          | Runtime predicate integration             |
| Named domain type    | `deftype`                    | `(deftype port () '(integer 1 65535))` | Reusable domain vocabulary                |

`deftype` defines a type specifier abbreviation.

```lisp id="8uww9e"
(deftype port-number ()
  '(integer 1 65535))

(defun open-service (port)
  (check-type port port-number)
  port)
```

Parameterized type specifiers are also possible:

```lisp id="7i893c"
(deftype bounded-integer (low high)
  `(integer ,low ,high))

(typep 5 '(bounded-integer 0 10))
;; true
```

Predicate-based types can be useful, but they should be used carefully.

```lisp id="5y6hc7"
(defun valid-username-p (x)
  (and (stringp x)
       (< 0 (length x) 32)
       (every #'alphanumericp x)))

(deftype username ()
  '(satisfies valid-username-p))
```

**Design meaning:** type specifiers let a dynamic language express domain categories in a standard vocabulary. They work well for checks, declarations, and documentation, but they do not automatically turn the whole program into a statically verified system.

**Failure-first explanation: `deftype` does not create a new runtime representation**

The tempting but wrong model is: “If I write `(deftype port-number ...)`, I have created a new kind of object.”

The surprising behavior is that a port number is still an integer. The type name is a type-specifier abstraction, not a wrapper type.

The correct semantic explanation is that `deftype` defines a way to expand a type specifier. It does not automatically define constructors, accessors, predicates, printed representation, or runtime identity distinct from the underlying values.

The professional rule of thumb is: **use `deftype` for reusable constraints; use `defstruct` or `defclass` when the domain concept needs distinct representation or behavior.**

The boundary changes when the domain concept is merely a constrained primitive, such as a port number or non-negative count. In that case, `deftype` plus boundary checks may be enough.

**Common Pitfalls**

A common pitfall is overusing `(satisfies ...)` in declarations and expecting strong compiler reasoning. Predicate-based types are useful for runtime checks and documentation, but compilers may not optimize them like primitive type specifiers.

Another pitfall is creating type aliases that hide important representation facts. If a `user-id` is really a string, callers may need to know string comparison, normalization, and serialization rules.

### Defining predicates — `typep`, domain predicate, structural predicate, semantic predicate`

Predicates are central to Common Lisp modeling because they convert dynamic values into explicit domain judgments. There are several kinds of predicates, and mixing them causes unclear code.

| Predicate kind       | Question answered                        | Example                                        | Good use                            |
| -------------------- | ---------------------------------------- | ---------------------------------------------- | ----------------------------------- |
| Type predicate       | What kind of object is this?             | `stringp`, `integerp`, `hash-table-p`          | Low-level representation checks     |
| Domain predicate     | Is this a valid domain value?            | `valid-user-p`, `port-number-p`                | Boundary and constructor validation |
| Structural predicate | Does this object have expected shape?    | `plist-user-p`, `proper-list-p`                | Parsing and adapters                |
| Semantic predicate   | Does this value satisfy a meaning?       | `active-user-p`, `expired-token-p`             | Business/domain logic               |
| Capability predicate | Can this object participate in protocol? | `stream-element-type`, generic protocol checks | Polymorphic behavior decisions      |

Example:

```lisp id="fypukq"
(defun port-number-p (x)
  (typep x '(integer 1 65535)))

(defun valid-user-p (x)
  (and (user-p x)
       (stringp (user-name x))
       (port-number-p (user-port x))))
```

When a predicate tests domain validity, name it accordingly. `user-p` conventionally means “is this a user object?” while `valid-user-p` means “does this user object satisfy additional invariants?”

| Name            | Better meaning                | Risk if confused                                  |
| --------------- | ----------------------------- | ------------------------------------------------- |
| `user-p`        | Representation/type predicate | May be expected to mean object identity/type only |
| `valid-user-p`  | Domain invariant predicate    | Caller understands validation is deeper           |
| `active-user-p` | Semantic state predicate      | Does not imply structural validity by itself      |
| `user-like-p`   | Shape/protocol predicate      | Useful at boundaries, but vague if undocumented   |

**Design meaning:** predicates are part of the public language of a codebase. They should say whether they are checking representation, validity, state, or capability.

**Common Pitfalls**

A common pitfall is writing a predicate that signals errors. Predicates conventionally answer a question with true or false. If invalid input should signal, use a validator or constructor instead.

Another pitfall is making predicates too expensive or effectful. A predicate should usually be cheap and side-effect-free unless clearly documented.

### Modeling closed and open worlds — `ecase`, `etypecase`, `generic function`, `method extension`

Some models are closed: all cases are known in advance. Some models are open: later code should add new cases. Common Lisp supports both styles, but choosing the wrong one creates maintenance problems.

| Model type                  | Use when                                         | Common Lisp mechanism                 | Example                  |
| --------------------------- | ------------------------------------------------ | ------------------------------------- | ------------------------ |
| Closed finite state         | All alternatives are known                       | keyword + `ecase`                     | task status              |
| Closed type family          | All representation types known internally        | `etypecase`                           | parser internal nodes    |
| Open operation              | New types should add behavior                    | generic function + methods            | rendering, serialization |
| Open data protocol          | New implementations should participate           | documented generic functions          | stream-like abstractions |
| Closed validated data       | Representation should not be extended externally | `defstruct` + package boundary        | internal compiler node   |
| Extensible object hierarchy | New subclasses/methods expected                  | `defclass`, `defgeneric`, `defmethod` | UI widgets, backends     |

Closed model with `ecase`:

```lisp id="0r49ak"
(defun transition (status)
  (ecase status
    (:new :running)
    (:running :done)
    (:done :done)
    (:failed :failed)))
```

Open model with CLOS:

```lisp id="eunqrd"
(defgeneric serialize (object stream))

(defmethod serialize ((object string) stream)
  (write-string object stream))

(defmethod serialize ((object integer) stream)
  (write object :stream stream))
```

**Failure-first explanation: scattered `typecase` resists extension**

The tempting but wrong model is: “Whenever behavior depends on type, use `typecase`.”

The surprising behavior is that every new type requires editing every scattered `typecase`. The system becomes closed even if the domain needs extension.

The correct explanation is that `typecase` is good for local closed decisions; generic functions are better for open behavior.

The professional rule of thumb is: **use `typecase` at boundaries and closed internal algorithms; use generic functions for public, extensible operations.**

The boundary changes when performance or locality dominates. A closed internal `etypecase` may be clearer and faster than a generic protocol if extension is not intended.

**Common Pitfalls**

A common pitfall is designing an open system with closed branching. Another is designing a closed internal representation with over-general generic functions. Both mistakes increase maintenance cost.

### Modeling records with `defstruct` — `constructor`, `predicate`, `copier`, `include`, `conc-name`

`defstruct` is often the best tool for simple named data. It creates a structure type, a predicate, accessors, a copier, and usually a constructor.

```lisp id="88su36"
(defstruct rectangle
  width
  height)
```

This usually creates functions such as:

```lisp id="776ee9"
(make-rectangle :width 10 :height 20)
(rectangle-width rect)
(rectangle-height rect)
(rectangle-p rect)
(copy-rectangle rect)
```

Useful options include constructor customization and conc-name control.

```lisp id="w6vpfc"
(defstruct (point
             (:constructor make-point (x y))
             (:conc-name point-))
  x
  y)

(make-point 10 20)
```

Including another structure:

```lisp id="4w2cug"
(defstruct person
  name)

(defstruct (employee (:include person))
  employee-id)
```

| `defstruct` feature | Meaning                              | Use case                                        | Caveat                                        |
| ------------------- | ------------------------------------ | ----------------------------------------------- | --------------------------------------------- |
| Default constructor | Keyword-based constructor            | Simple records                                  | May allow invalid combinations                |
| Custom constructor  | Controlled argument shape            | Required fields, positional domain constructors | Positional constructors can become unreadable |
| Predicate           | Type/structure check                 | `rectangle-p`                                   | Only checks representation, not full validity |
| Accessors           | Field reads/writes                   | Named field access                              | Exporting accessors exposes API               |
| Copier              | Shallow copy                         | Duplicate structure                             | Does not deep-copy nested mutable objects     |
| `:include`          | Structure inheritance-like inclusion | Simple structural extension                     | Not a substitute for CLOS protocols           |
| `:conc-name`        | Accessor prefix control              | Naming API                                      | Removing prefixes can create conflicts        |

**Design meaning:** `defstruct` gives named fields without the full conceptual weight of CLOS. It is well-suited for internal data, AST nodes, configuration objects, parsed records, and performance-aware simple structures.

**Failure-first explanation: copy is usually shallow**

The tempting but wrong model is: “`copy-thing` gives a fully independent duplicate.”

The surprising behavior is that nested mutable objects may still be shared.

The correct explanation is that structure copiers generally copy the structure object, not necessarily the transitive object graph.

The professional rule of thumb is: **treat structure copying as shallow unless a deep-copy protocol is explicitly designed.**

The boundary changes for immutable or conventionally read-only nested values. Shallow copy is often enough there.

**Common Pitfalls**

One pitfall is exporting the default constructor when invariants matter. Another is using `:include` as if it were full object-oriented inheritance. For polymorphic behavior, CLOS generic functions are usually a clearer model.

### Modeling objects with CLOS — `class`, `slot`, `initarg`, `accessor`, `generic function`

CLOS is best understood as a system for extensible behavior, not just data containers. Classes define object structure; generic functions define operations; methods specialize operations.

```lisp id="v5v8jm"
(defclass account ()
  ((id :initarg :id
       :reader account-id)
   (balance :initarg :balance
            :accessor account-balance)))

(defgeneric deposit (account amount))

(defmethod deposit ((account account) amount)
  (check-type amount (real 0 *))
  (incf (account-balance account) amount)
  account)
```

| CLOS modeling element | Role                                         | Use carefully because                 |
| --------------------- | -------------------------------------------- | ------------------------------------- |
| `defclass`            | Defines class and slots                      | Slot layout is not the whole API      |
| `:initarg`            | Public initialization keyword                | Exposes construction protocol         |
| `:reader`             | Read accessor                                | Public observation protocol           |
| `:accessor`           | Read/write accessor                          | Public mutation protocol              |
| `defgeneric`          | Defines operation/protocol                   | Should have meaningful contract       |
| `defmethod`           | Specializes operation                        | Dispatch rules affect behavior        |
| Method specialization | Chooses behavior by argument types           | Multiple dispatch can become subtle   |
| Method combination    | Combines primary/around/before/after methods | Powerful but can obscure control flow |

CLOS object creation:

```lisp id="9n1lri"
(make-instance 'account :id "A-1" :balance 0)
```

Accessor mutation:

```lisp id="588r9z"
(setf (account-balance account) 100)
```

**Design meaning:** CLOS is open and extensible. If later code should add behavior for new types without editing old conditional branches, CLOS is a strong fit.

**Failure-first explanation: classes do not own all behavior**

The tempting but wrong model from Java-style OOP is: “Define a class, then put its methods inside it.”

The surprising behavior is that CLOS methods are defined separately as methods on generic functions.

The correct semantic explanation is that generic functions are operations, and methods specialize those operations for argument types.

The professional rule of thumb is: **design public generic functions as protocols; design classes as representations that participate in protocols.**

The boundary changes for private implementation classes. Some classes exist only to support internal storage, and not every class needs a broad public protocol.

**Common Pitfalls**

A common pitfall is exposing too many writable accessors. Another is defining methods without a clear generic function contract. A third is using class inheritance where composition or generic dispatch over simpler structures would be clearer.

### Modeling errors as data — `condition`, `define-condition`, slots, reports`

Errors and exceptional situations should often be structured data. Common Lisp’s condition system allows conditions to carry slots and behavior.

```lisp id="pda5py"
(define-condition invalid-token (error)
  ((token :initarg :token
          :reader invalid-token-token)
   (reason :initarg :reason
           :reader invalid-token-reason))
  (:report (lambda (condition stream)
             (format stream "Invalid token ~S: ~A"
                     (invalid-token-token condition)
                     (invalid-token-reason condition)))))
```

Signal it:

```lisp id="xarmjr"
(error 'invalid-token
       :token token
       :reason "unexpected character")
```

Handle by type:

```lisp id="30hsf2"
(handler-case
    (parse-token input)
  (invalid-token (condition)
    (list :bad-token
          (invalid-token-token condition)
          (invalid-token-reason condition))))
```

| Error modeling option  | Use when                                 | Strength                              | Weakness                        |
| ---------------------- | ---------------------------------------- | ------------------------------------- | ------------------------------- |
| Plain string `error`   | Quick internal failure                   | Minimal code                          | Hard to handle programmatically |
| Condition class        | Public/library failure                   | Structured and typed                  | More code                       |
| Warning condition      | Suspicious but nonfatal situation        | Can be handled or muffled             | Warning policy needed           |
| Multiple-value failure | Expected absence/failure                 | Lightweight                           | Can be ignored accidentally     |
| `nil` failure          | Simple search/lookup where `nil` invalid | Very idiomatic                        | Ambiguous if `nil` valid        |
| Restart protocol       | Recovery options matter                  | Powerful interactive/layered recovery | More conceptual overhead        |

**Design meaning:** conditions are data models for situations. They belong to data modeling as much as error handling.

**Common Pitfalls**

A common pitfall is signaling unstructured string errors from library APIs. That forces callers to parse text or catch broad `error`. If callers need to distinguish failure kinds, define condition classes.

### Modeling resources — `stream`, `pathname`, `foreign resource`, `with-*` macro`

Some values represent resources with lifetimes beyond memory. Streams, files, sockets, locks, foreign pointers, temporary files, and transactions require cleanup discipline.

A typical resource abstraction in Common Lisp is a `with-*` macro:

```lisp id="bfucox"
(with-open-file (stream path :direction :input)
  (read-line stream nil nil))
```

The macro ensures cleanup using lower-level mechanisms such as `unwind-protect`.

| Resource kind             | Representation                | Management pattern             | Risk                            |
| ------------------------- | ----------------------------- | ------------------------------ | ------------------------------- |
| File                      | pathname + stream             | `with-open-file`               | Leaked file handles             |
| String output stream      | stream object                 | `with-output-to-string`        | Usually safe scoped abstraction |
| Lock                      | implementation/library object | `with-lock-held` style macro   | Deadlock or unreleased lock     |
| Foreign memory            | pointer/wrapper object        | FFI-specific cleanup           | Leak or invalid access          |
| Transaction               | connection/session object     | `with-transaction` style macro | Partial updates                 |
| Temporary dynamic setting | special variable binding      | `let` dynamic binding          | Hidden context if undocumented  |

**Design meaning:** garbage collection handles memory reachability, not arbitrary protocol completion. Resource modeling requires explicit scope.

**Common Pitfalls**

A common pitfall is returning a stream from inside `with-open-file` and expecting it to remain usable. The stream is closed when the dynamic extent exits.

```lisp id="735v8v"
(defun bad-open (path)
  (with-open-file (stream path)
    stream))
;; The returned stream is already closed or invalid for intended use.
```

Return data, not the scoped resource, unless ownership transfer is explicitly designed.

### Modeling mutable state — `place`, `setf`, owner, alias, destructive operation`

Mutation in Common Lisp is explicit through `setf`, destructive functions, adjustable arrays, hash table updates, slot accessors, and special variables. The hard part is not syntax; it is ownership and aliasing.

| Mutable representation | Update operation                                | Aliasing risk                      |
| ---------------------- | ----------------------------------------------- | ---------------------------------- |
| Variable binding       | `setq`, `setf`                                  | Other closures may capture binding |
| Cons/list              | `setf car/cdr`, `rplaca`, `nconc`, `delete`     | Shared list structure changes      |
| Vector/array           | `setf aref`, `replace`, fill pointer operations | Shared array object changes        |
| Hash table             | `setf gethash`, `remhash`, `clrhash`            | All holders see updates            |
| Structure              | `setf accessor`                                 | Shared structure object changes    |
| CLOS instance          | `setf accessor`, slot mutation                  | Shared instance changes            |
| Special variable       | dynamic binding or global mutation              | Hidden contextual changes          |

Ownership rule:

```lisp id="j91m09"
(defun normalize-owned-list (xs)
  ;; Safe only if XS is fresh/owned by this function or caller permits mutation.
  (nreverse xs))
```

Safer non-destructive version:

```lisp id="44mqmb"
(defun normalized-copy (xs)
  (reverse xs))
```

**Failure-first explanation: names are not containers**

The tempting but wrong model is: “If I assign `ys` from `xs`, I copied the list.”

```lisp id="694kkr"
(let* ((xs (list 1 2 3))
       (ys xs))
  (setf (car xs) 99)
  ys)
;; => (99 2 3)
```

The surprising behavior is that `ys` observes the mutation.

The correct explanation is that variables hold references to objects; assigning a variable does not copy compound structure.

The professional rule of thumb is: **before destructive update, know whether the object is owned, shared, literal, or externally visible.**

The boundary changes for immutable-by-convention values. If a structure is never mutated after creation, sharing is usually harmless.

**Common Pitfalls**

A common pitfall is documenting a function as non-destructive while using destructive operations internally on caller-owned data. Another is using destructive sequence functions without reading whether they may modify their argument.

### Copying, sharing, and persistence — `copy-list`, `copy-tree`, `copy-seq`, `copy-structure`

Common Lisp offers several copying operations, but they differ in depth and scope.

| Copy operation       | Copies                                | Does not necessarily copy | Use                                      |
| -------------------- | ------------------------------------- | ------------------------- | ---------------------------------------- |
| `copy-list`          | Top-level cons chain of a proper list | Nested lists/objects      | Avoid modifying top-level list structure |
| `copy-tree`          | Cons tree structure                   | Non-cons objects inside   | Symbolic trees                           |
| `copy-seq`           | Sequence object                       | Elements themselves       | Strings/vectors/lists as sequences       |
| `copy-alist`         | Top-level alist pairs                 | Nested values             | Simple alist copy                        |
| Structure copier     | Structure object                      | Nested slot values        | Shallow structure duplication            |
| Custom copy function | Whatever designed                     | Depends on implementation | Domain-specific copying                  |

```lisp id="6mldlx"
(let* ((xs (list (list 1) (list 2)))
       (ys (copy-list xs)))
  (setf (car (car xs)) 99)
  ys)
;; Nested list is still shared.
```

For nested conses:

```lisp id="7v2e52"
(copy-tree '((1) (2)))
```

**Design meaning:** copying is part of the data contract. A function should make clear whether it owns, borrows, copies, shares, or mutates data.

**Common Pitfalls**

A common pitfall is assuming `copy-list` deeply copies all nested data. Another is deep-copying too aggressively and wasting memory. The right copy depth follows the mutation model.

### Modeling APIs with keyword arguments — `&key`, defaults, supplied-p, forwarding`

Keyword arguments are central to readable Common Lisp APIs.

```lisp id="ae3mbb"
(defun make-connection (&key host port ssl timeout)
  ...)
```

Defaults:

```lisp id="lr9p75"
(defun make-connection (&key
                          (host "localhost")
                          (port 80)
                          (ssl nil)
                          (timeout 30))
  ...)
```

Supplied-p:

```lisp id="q5s2zd"
(defun configure (&key (timeout nil timeout-supplied-p))
  (if timeout-supplied-p
      (list :explicit-timeout timeout)
      :use-default-timeout))
```

Forwarding keyword arguments:

```lisp id="28vpqy"
(defun make-secure-connection (&rest args &key &allow-other-keys)
  (apply #'make-connection :ssl t args))
```

| API need                             | Lambda-list feature                    | Use                      | Pitfall                                                 |
| ------------------------------------ | -------------------------------------- | ------------------------ | ------------------------------------------------------- |
| Many optional settings               | `&key`                                 | Readable calls           | Too many loosely documented options                     |
| Omitted vs explicit `nil`            | supplied-p variable                    | Correct absence handling | Forgetting when `nil` valid                             |
| Wrapper forwards options             | `&rest` + `&key` + `&allow-other-keys` | Extensible wrappers      | Hiding misspelled keywords                              |
| Required main arguments plus options | required + `&key`                      | Clear API shape          | Overusing positional optional args                      |
| Default value                        | `(name default)`                       | Simple option defaults   | Default computed too often if expensive and unnecessary |

**Common Pitfalls**

A common pitfall is using `&allow-other-keys` in public APIs where unknown keywords should be errors. It is useful for forwarding, but dangerous when it silences caller mistakes.

### Modeling with multiple values — `primary value`, `secondary value`, `present-p`, `remainder`

Multiple values are ideal when there is a primary result plus secondary information.

| Task                              | Multiple-value pattern  | Example                 |
| --------------------------------- | ----------------------- | ----------------------- |
| Lookup with presence              | value + present-p       | `gethash`               |
| Arithmetic quotient/remainder     | quotient + remainder    | `floor`, `truncate`     |
| Parsing with position             | parsed value + index    | parser APIs             |
| Success with metadata             | result + status/details | custom APIs             |
| Optional result where `nil` valid | value + found-p         | lookup/search functions |

Custom lookup:

```lisp id="7rd8am"
(defun find-user (id users)
  (let ((user (find id users :key #'user-id :test #'equal)))
    (values user (not (null user)))))
```

But if `nil` could itself be a valid stored value, use a true presence test from the representation.

```lisp id="t55eag"
(defun lookup-setting (key table)
  (gethash key table))
;; already returns value and present-p
```

**Design meaning:** multiple values avoid allocating wrapper objects for common secondary information. They are idiomatic, but they require callers to know the protocol.

**Common Pitfalls**

A common pitfall is using multiple values where the values are conceptually one domain object. If all parts must travel together, define a structure or class.

Another is forgetting that most contexts keep only the first value. Document multiple-value APIs clearly.

### Modeling syntax as data — `S-expression`, `quote`, `backquote`, macro input, AST`

Lisp makes it easy to represent syntax-like data as S-expressions. This is useful for macros, DSLs, symbolic computation, ASTs, rules, and transformations.

Example symbolic expression:

```lisp id="wvbsfu"
'(+ (* x x) (* 2 x) 1)
```

Example macro-style template:

```lisp id="zaj6z0"
`(let ((,var ,value))
   ,@body)
```

| Syntax-data task         | Representation     | Use                            | Caveat                          |
| ------------------------ | ------------------ | ------------------------------ | ------------------------------- |
| Simple expression tree   | lists and symbols  | Symbolic algebra, rules        | Need clear grammar              |
| Macro input              | source forms       | Syntactic abstraction          | Must validate shape             |
| Macro output             | generated forms    | Code generation                | Avoid capture/double evaluation |
| DSL form                 | S-expressions      | Embedded language              | Document evaluation rules       |
| Parsed AST               | structures/classes | Compiler/interpreter internals | Better for large stable ASTs    |
| Source location tracking | custom nodes       | Error reporting                | Raw lists may be insufficient   |

**Design meaning:** raw S-expressions are excellent for small or flexible syntax. For large compilers/interpreters/analyzers, explicit AST structures or classes often become more maintainable.

**Failure-first explanation: code-shaped data is not automatically valid code**

The tempting but wrong model is: “If it is a list, it can be evaluated as Lisp code.”

The surprising behavior is that many lists are not valid forms, may refer to wrong packages, may contain invalid binding syntax, or may be unsafe to evaluate.

The correct explanation is that S-expressions are data; only some S-expressions are valid forms under a particular evaluation environment.

The professional rule of thumb is: **treat code-shaped data as syntax with a grammar, not arbitrary lists.**

The boundary changes for macros, where the macro expander is responsible for transforming a documented input grammar into valid Common Lisp forms.

**Common Pitfalls**

A common pitfall is using `eval` to process symbolic data. Usually, write an interpreter or transformer for the data grammar instead. `eval` executes Lisp code in an environment, which is a much stronger and riskier operation.

### Modeling DSL data — `embedded language`, grammar, validation, expansion`

Common Lisp is excellent for embedded DSLs, but DSL design is still language design. A DSL should have a clear grammar, evaluation model, error strategy, and expansion/debugging story.

Example mini query syntax as data:

```lisp id="rrvx1l"
'(:and (:field-equal :status :active)
       (:field-greater-than :age 18))
```

This can be interpreted as data, not evaluated as Lisp code.

```lisp id="s60o61"
(defun query-form-p (form)
  (and (consp form)
       (member (first form) '(:and :or :field-equal :field-greater-than))))
```

Macro DSLs use source forms:

```lisp id="t2wa46"
(with-query (user)
  (where (= status :active))
  (where (> age 18)))
```

| DSL representation      | Use when                             | Strength                     | Risk                              |
| ----------------------- | ------------------------------------ | ---------------------------- | --------------------------------- |
| Data DSL                | Users/tools manipulate forms as data | Safe interpretation possible | Need parser/validator             |
| Macro DSL               | Syntax should compile into Lisp code | Natural embedded syntax      | Phase complexity                  |
| Reader DSL              | Surface syntax must change           | Very specialized notation    | Readability/tooling/security risk |
| CLOS protocol DSL       | Extensible operations/classes        | Open extension               | More boilerplate                  |
| Function combinator DSL | Runtime composition enough           | Simple and debuggable        | May be less concise               |

**Design meaning:** Common Lisp does not remove the need for DSL engineering. It lowers the cost of implementing DSLs, which makes restraint more important.

**Common Pitfalls**

A common pitfall is building macro DSLs before proving that functions or data forms are insufficient. Another is failing to provide expansion inspection, good error messages, and documented evaluation rules.

### Modeling package boundaries — `export`, internal symbol, constructor API, representation hiding`

Data modeling is incomplete without namespace modeling. Packages decide which symbols are public. Exported symbols form an API.

Example package boundary:

```lisp id="v1ls9x"
(defpackage #:example.users
  (:use #:cl)
  (:export #:make-user
           #:user-p
           #:user-name
           #:valid-user-p))
```

Implementation:

```lisp id="656dm4"
(in-package #:example.users)

(defstruct (%user (:constructor %make-user))
  name
  age)

(defun make-user (&key name age)
  (check-type name string)
  (check-type age (integer 0 *))
  (%make-user :name name :age age))

(defun user-p (x)
  (%user-p x))

(defun user-name (user)
  (%user-name user))

(defun valid-user-p (user)
  (and (%user-p user)
       (stringp (%user-name user))
       (typep (%user-age user) '(integer 0 *))))
```

Here the internal structure constructor and accessors are not exported. The public API controls creation and observation.

| Boundary decision  | Export?                            | Reason                                   |
| ------------------ | ---------------------------------- | ---------------------------------------- |
| Public constructor | Usually yes                        | Validates and creates domain value       |
| Raw constructor    | Usually no                         | Can bypass invariants                    |
| Predicate          | Often yes                          | Allows callers to recognize values       |
| Read accessor      | Often yes                          | If field is part of public contract      |
| Write accessor     | Only if mutation is public         | Avoid accidental representation exposure |
| Slot names         | Usually no direct significance     | Internal unless documented               |
| Condition type     | Yes for handleable public failures | Allows typed error handling              |
| Internal helper    | No                                 | Maintains implementation freedom         |

**Design meaning:** Common Lisp package exports are one of the main tools for making dynamic data models maintainable. If everything is exported, representation is not hidden.

**Common Pitfalls**

A common pitfall is exporting all structure accessors by default. That makes internal representation public and hard to change. Another is using double-colon access from other packages to bypass boundaries.

### Modeling with declarations — `type`, `optimize`, `inline`, `dynamic-extent`

Declarations can improve performance, documentation, and compiler diagnostics. They can also make code unsafe if wrong.

```lisp id="lc8d44"
(defun vector-sum (v)
  (declare (type (simple-array double-float (*)) v)
           (optimize (speed 3) (safety 1)))
  (let ((sum 0.0d0))
    (declare (type double-float sum))
    (dotimes (i (length v) sum)
      (incf sum (aref v i)))))
```

| Declaration            | Meaning                               | Use                                   | Caution                                              |
| ---------------------- | ------------------------------------- | ------------------------------------- | ---------------------------------------------------- |
| `(type type vars...)`  | Variables have expected type          | Numeric/array/performance code        | Wrong declarations can be dangerous under low safety |
| `(optimize ...)`       | Compiler policy                       | Local hotspots                        | Avoid global aggressive settings                     |
| `(inline f)`           | Suggest inline expansion              | Small hot functions                   | Can increase code size                               |
| `(notinline f)`        | Prevent inline                        | Debugging, function identity concerns | Rare                                                 |
| `dynamic-extent`       | Object does not escape dynamic extent | Allocation optimization               | Must be correct                                      |
| `special`              | Dynamic binding                       | Special variable semantics            | Hidden dependencies                                  |
| `ignore` / `ignorable` | Silence unused-variable warnings      | Macro and interface code              | Do not hide real mistakes                            |

**Design meaning:** declarations are not the primary data model. They are a secondary layer that tells the implementation what the model already guarantees.

**Common Pitfalls**

A common pitfall is using declarations to make invalid data “fit.” Declarations should follow validation, not replace it. Another is using `dynamic-extent` without fully understanding escape behavior.

### Unknown-data boundary decision table — `nil`, multiple values, condition, validation object`

| Boundary situation                | Recommended pattern                   | Why                                       | Avoid                                          |
| --------------------------------- | ------------------------------------- | ----------------------------------------- | ---------------------------------------------- |
| Optional key in hash table        | `gethash` second value                | Distinguishes present `nil`               | Single-value `gethash` if `nil` valid          |
| Optional keyword argument         | supplied-p variable                   | Distinguishes omitted from explicit `nil` | Testing only value truth                       |
| User input parse failure          | structured condition or result object | Gives diagnostic information              | Returning bare `nil` for all failures          |
| Internal lookup failure           | `nil` if impossible as value          | Simple and idiomatic                      | Overcomplicating small local helpers           |
| Search with possible `nil` result | multiple values                       | Disambiguates found value                 | `find`-style single return if `nil` meaningful |
| Data format validation            | constructor/parser                    | Centralizes invariants                    | Letting raw hash/plist spread                  |
| Foreign API result                | wrapper + condition                   | Controls safety boundary                  | Raw pointer/object everywhere                  |
| Macro input validation            | syntax check + expansion-time error   | Better macro errors                       | Letting invalid expansion fail later           |

### Conversion mechanism decision table — `coerce`, parser, constructor, declaration`

| Need                               | Use                              | Example                 | Do not use                                     |
| ---------------------------------- | -------------------------------- | ----------------------- | ---------------------------------------------- |
| Sequence representation conversion | `coerce`, `copy-seq`             | list to vector          | `read-from-string`                             |
| Numeric text parsing               | `parse-integer` or domain parser | `"123"` to integer      | unrestricted `read`                            |
| Domain object creation             | constructor                      | `make-user`             | raw structure constructor if invariants matter |
| Runtime type check                 | `typep`, `check-type`            | validate value          | `the`                                          |
| Compiler type communication        | `declare`, `the`                 | optimized internals     | user input validation                          |
| Symbol lookup by name              | `intern`, `find-symbol`          | controlled package work | arbitrary user text interning                  |
| External data parsing              | format-specific parser           | JSON/CSV/config parser  | `eval`                                         |
| Lisp syntax reading                | `read` with trust/control        | trusted Lisp data       | untrusted input                                |

### Data modeling option tradeoff table — `strength`, `cost`, `best use`

| Option          | Strength                                 | Cost                                  | Best use                       | Failure mode                          |
| --------------- | ---------------------------------------- | ------------------------------------- | ------------------------------ | ------------------------------------- |
| Keyword         | Simple, self-evaluating, readable        | No attached data                      | Tags, states, option names     | Too many ad hoc symbolic protocols    |
| Symbol          | Identity-rich symbolic object            | Package complexity                    | Language/code/symbolic systems | Confusing with string data            |
| String          | Text representation                      | Content comparison required           | User text, external text       | Comparing with `eq`                   |
| List            | Simple sequential/recursive structure    | Poor random access, weak field names  | Sequences, syntax, trees       | Informal records                      |
| Plist           | Lightweight named fields                 | Weak schema                           | Options, metadata              | Misspelled keys and ambiguous `nil`   |
| Alist           | Ordered simple map                       | Linear lookup                         | Small environments/maps        | Scaling poorly                        |
| Hash table      | Efficient mutable mapping                | Equality/order/schema issues          | Dynamic lookup                 | Wrong test or missing-value ambiguity |
| Vector          | Indexed sequence                         | Resize/insertion cost                 | Indexed data                   | Treating as list                      |
| Array           | Dense multidimensional storage           | More setup and representation details | numeric/grids/buffers          | Assuming specialization automatically |
| Structure       | Named fields, efficient record           | Less open extension                   | Internal records, AST nodes    | Leaking raw constructor               |
| Class           | Extensible CLOS behavior                 | More conceptual machinery             | Protocol-rich objects          | Overengineered hierarchies            |
| Condition       | Structured exceptional data              | Requires error protocol design        | Library/public failures        | Plain string errors                   |
| Closure         | Behavior with captured environment       | Hidden state                          | Local strategy/callback        | Hard-to-inspect objects               |
| Multiple values | No wrapper allocation for secondary info | Caller protocol awareness             | lookup/result metadata         | Accidentally discarded values         |

### Common data-modeling anti-patterns — `raw list record`, `ambiguous nil`, `hash-table object`, `macro-shaped data`

| Anti-pattern                                 | Why it fails                                     | Better alternative                                     |
| -------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| Raw positional list as domain object         | Field meaning is implicit and fragile            | `defstruct`, `defclass`, or plist for small local data |
| Bare `nil` for every failure                 | Absence, false, empty, and error collapse        | Multiple values, conditions, sentinels                 |
| Hash table as universal object               | No visible schema or constructor invariants      | Structure/class plus parser from hash table            |
| Exporting raw constructors                   | Callers bypass validation                        | Public constructor wrapper                             |
| Scattered `typecase` for extensible behavior | Every new type requires editing old code         | Generic functions                                      |
| Macro for value-level helper                 | Adds phase complexity without need               | Function or higher-order function                      |
| Interning user text as symbols               | Pollutes package and confuses data identity      | Strings                                                |
| Destructive update of borrowed data          | Aliasing bugs                                    | Copy or document ownership                             |
| Declarations as validation                   | Compiler contract is not boundary check          | `check-type`, constructors, conditions                 |
| Reader/eval as parser                        | Imports Lisp syntax/execution into data boundary | Specific parser/validator                              |

### Part 3 practical review artifact — `choose representation by invariant`

| Question                                 | If yes                                                | If no                                                     |
| ---------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------- |
| Does the value have stable named fields? | Prefer `defstruct` or `defclass`.                     | List/vector may be fine.                                  |
| Does behavior need open extension?       | Prefer CLOS generic functions.                        | Closed `case`/`typecase` or functions may be clearer.     |
| Can `nil` be a valid value?              | Use multiple values, sentinel, or condition.          | `nil` may be an acceptable absence marker.                |
| Is the data externally sourced?          | Parse and validate at boundary.                       | Internal constructors may be enough.                      |
| Is mutation intended?                    | Make ownership and accessors explicit.                | Prefer non-destructive functions or immutable convention. |
| Is lookup performance important?         | Use hash table or indexed representation.             | Alist/plist may be simpler.                               |
| Is order semantically important?         | Use sequence/list/vector with documented order.       | Use mapping representation.                               |
| Is the state closed and simple?          | Keyword + `member` type + `ecase`.                    | Use structures/classes if state has data.                 |
| Is the representation public?            | Export only stable constructors/predicates/accessors. | Keep internals unexported.                                |
| Is performance sensitive?                | Measure, then use arrays, structures, declarations.   | Prefer clarity first.                                     |
