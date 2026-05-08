---
title: Lean4 - Quick Reference
abbreviation: Lean4
categories: Sheet
subclass: Formal Methods
---

## PART 1 — Language Identity, Design Philosophy, and Problem Space

### Assumptions and Density Strategy — Lean 4, stable toolchain, Lake, Mathlib, professional target

**Density strategy:** adaptive — Lean 4 requires more depth than an ordinary programming-language tutorial because its practical use depends on the interaction between dependent types, proof terms, tactics, elaboration, typeclass inference, computation, `Mathlib`, and tooling.

This guide targets **Lean 4 as used in current professional mathematical formalization and proof-engineering practice**. The working assumption is a pinned Lean 4 stable toolchain, managed through `elan`, `Lake`, and a project-local `lean-toolchain` file, with `Mathlib` used as the central mathematical and proof-engineering ecosystem. Lean releases move quickly; current release notes explicitly advise reading version notes when updating, and the public release stream shows active stable and release-candidate development rather than a frozen language target. ([Lean Language][1])

The practical target is therefore not “whatever Lean version is globally installed.” A serious Lean project should be read as a **toolchain-pinned artifact**: the Lean compiler, Lake configuration, Mathlib version, generated cache, and editor tooling jointly define the working environment. `Mathlib` itself is the user-maintained Lean 4 mathematical library and contains not only mathematical content but also programming infrastructure and tactics. ([GitHub][2])

The uploaded tutorial specification requires Lean 4 to be taught as a proof assistant, dependently typed programming language, theorem-proving environment, metaprogramming platform, and library-centered system for formalized mathematics, rather than as merely a functional programming language or tactic scripting system . This part establishes that macro-level mental model before syntax and proof mechanics are introduced.

### What Lean 4 Is — proof assistant, dependently typed language, theorem prover, metaprogramming platform

Lean 4 is best understood as a **dependently typed programming language whose type checker is also a proof checker**. Programs, definitions, propositions, proofs, tactics, notation, and library abstractions all live inside one formal environment. This creates a language whose center of gravity is different from Python, Haskell, OCaml, Rust, Coq/Rocq, or ordinary mathematical prose.

| Dimension          | Lean 4’s choice                                                                  | Practical consequence                                                                                              |
| ------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Language category  | Dependently typed functional programming language and interactive theorem prover | Ordinary computation and formal proof share one term language                                                      |
| Proof model        | Propositions-as-types, proofs-as-terms                                           | A theorem statement is a type; proving it means constructing a term of that type                                   |
| User workflow      | Interactive elaboration through editor feedback                                  | Proof development is guided by goals, local context, expected types, and error messages                            |
| Mathematical scale | Library-centered formalization through `Mathlib`                                 | Mastery requires knowing how to search, import, reuse, and generalize library lemmas                               |
| Automation model   | Tactics construct proof terms                                                    | Tactic scripts are not magic commands; they are programs that synthesize proof terms                               |
| Abstraction model  | Structures, classes, instances, coercions, namespaces, notation                  | Mathematical hierarchies can be written once and reused across algebra, order, topology, analysis, and computation |
| Trusted core       | Small kernel checks elaborated terms                                             | Trust concentrates in the kernel and trusted extensions, while tactics and automation must produce checkable terms |
| Extension model    | Powerful metaprogramming and tactic-writing system                               | Lean can be extended from within Lean, but this is an advanced layer rather than the entry point                   |

**Core mental model:** Lean 4 is not primarily a language for “running programs,” nor merely a notation for writing proofs. It is a system where computation, specification, proof construction, theorem reuse, and metaprogramming are unified through dependent type theory.

This unification is Lean’s main strength and its main cost. It allows statements such as “for every natural number `n`, `n + 0 = n`” to become machine-checkable objects. It also means that theorem statements, implicit arguments, instance search, universe levels, definitional equality, and elaboration failures become everyday engineering concerns.

### Why Lean 4 Exists — formalized mathematics, verified reasoning, executable specifications

Lean 4 exists to support **machine-checked reasoning at scale**. Its problem space is broader than “write correct programs.” It addresses a cluster of related problems:

| Problem space                                     | Lean 4 response                                                                                  | Cost introduced                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Informal proofs can hide gaps                     | Proofs are checked by a kernel                                                                   | Statements must be formalized precisely                              |
| Mathematical libraries need reusable structure    | `Mathlib` organizes abstractions through structures, typeclasses, namespaces, and theorem naming | Library literacy becomes mandatory                                   |
| Proofs are often repetitive                       | Tactics automate common reasoning patterns                                                       | Automation can become opaque or brittle                              |
| Programs and specifications are usually separated | Lean can express both in one language                                                            | Users must distinguish computation, proposition, proof, and effect   |
| Advanced theorem proving needs custom automation  | Lean 4 provides metaprogramming and tactic infrastructure                                        | The extension layer has a steep learning curve                       |
| Mathematics uses overloaded notation              | Typeclasses and coercions make notation reusable                                                 | Instance search and coercion chains can become difficult to diagnose |

A conventional programming language asks: **what computation should this program perform?** Lean also asks: **what proposition does this term inhabit, what definitions reduce by computation, what lemmas rewrite the goal, what instances are inferred, and what exactly is trusted by the kernel?**

This is the reason Lean 4 cannot be taught as a syntax list. Its surface syntax only makes sense after the reader understands that every declaration contributes to a typed environment, and every proof must eventually become a term accepted by the kernel.

### Language Personality — static, strong, dependent, elaborated, library-centered

Terms such as “static typing,” “strong typing,” and “compiled language” are often used loosely. For Lean 4, they require careful interpretation.

`Static typing` means that Lean checks terms before accepting them. But Lean’s type system is not merely Hindley–Milner-style inference or mainstream generic typing. It is **dependent type theory**, so types may contain values, propositions are types, and proofs are terms.

`Strong typing` means that Lean does not silently reinterpret arbitrary values across unrelated types. But this does not mean the system is free of coercions. Lean uses coercions, overloaded notation, typeclass inference, and elaboration, so the code a reader sees may contain substantial inferred structure.

`Compiled language` is also incomplete. Lean 4 code can be compiled and executed, but Lean is also an interactive proof environment. The important distinction is not simply compiled versus interpreted; it is **kernel checking, elaboration, compilation, tactic execution, and runtime execution** as separate layers.

| Design dimension               | Lean 4’s position                                                                                            | Practical consequence                                                                                    | Common misunderstanding                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Static vs dynamic typing       | Statically checked dependent type theory                                                                     | Many mathematical errors become type errors                                                              | Thinking Lean types are just annotations                     |
| Strong vs weak typing          | Strongly typed with coercions and elaboration                                                                | Invalid terms are rejected, but inferred conversions may be non-obvious                                  | Assuming no implicit transformation occurs                   |
| Explicit types vs inference    | Heavy inference with explicit escape hatches                                                                 | Code can be concise but error messages may expose hidden obligations                                     | Assuming omitted arguments do not exist                      |
| Nominal vs structural typing   | Mostly named constants, inductives, structures, classes; not TypeScript-like structural typing               | Mathematical abstraction depends on named declarations and instances                                     | Expecting “same shape” to imply same type                    |
| Functional vs imperative style | Pure functional core with controlled effects through monads such as `IO`                                     | Recursive definitions and pattern matching are central                                                   | Treating Lean as ordinary imperative pseudocode              |
| Object model                   | No class-based OOP object model in the Java/C++ sense                                                        | Structures/classes model mathematical and programming abstractions, not inheritance-heavy object systems | Importing OOP habits directly                                |
| Error model                    | Type errors, elaboration errors, proof failures, runtime errors in executable code, monadic failure patterns | “Failure” means different things at different layers                                                     | Treating all Lean errors as runtime errors                   |
| Metaprogramming                | Deep language-integrated metaprogramming                                                                     | Tactics, elaborators, commands, and automation can be written in Lean                                    | Trying to write tactics before understanding ordinary proofs |
| Ecosystem philosophy           | Library-centered and theorem-search-centered                                                                 | Existing lemmas often matter more than new code                                                          | Reproving standard facts locally                             |

Lean’s personality is therefore **formal, explicit at the semantic level, implicit at the surface level, and strongly shaped by its library**. A short Lean proof may depend on many hidden mechanisms: inferred type parameters, class instances, simp lemmas, coercions, imported namespaces, notation scopes, and elaborated terms.

### Lean 4 as a Design System — terms, types, elaboration, tactics, kernel, library

The central architecture of Lean can be summarized as a pipeline:

| Layer                 | What the user writes                              | What the system does                                                            | What can fail                                                             |
| --------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Surface syntax        | Declarations, terms, tactics, notation            | Parses source into syntax trees                                                 | Syntax errors, ambiguous notation                                         |
| Elaboration           | Partial terms, implicit arguments, holes, tactics | Infers missing information, resolves types and instances, constructs core terms | Type mismatch, unsolved metavariables, missing instances                  |
| Kernel checking       | Fully elaborated terms                            | Checks that terms inhabit their claimed types                                   | Invalid proof term, trusted-core rejection                                |
| Compilation/execution | Computable definitions and `IO` programs          | Generates executable code where relevant                                        | Runtime failure, performance issues                                       |
| Library integration   | Imports, namespaces, theorem names, attributes    | Makes definitions, instances, notation, and lemmas available                    | Import bloat, name conflicts, changed theorem names, brittle dependencies |

This layered architecture explains why Lean errors can feel unfamiliar. A theorem can fail not because the mathematical idea is wrong, but because the statement is too specific, an implicit argument cannot be inferred, the wrong namespace is open, the simplifier lacks the right lemma, induction did not generalize a variable, or a typeclass instance cannot be found.

**Failure-first explanation:** the tempting mental model is that Lean proof scripts are command sequences that directly manipulate mathematical text. The correct model is that tactics refine a typed proof obligation by constructing proof terms. The visible goal state is a user-facing projection of a deeper elaboration problem.

Professional Lean use begins when proof scripts are no longer treated as incantations and become readable transformations of typed goals.

### Dependent Type Theory as the Central Lens — propositions, proofs, values inside types

Dependent type theory is the main theoretical lens for Lean 4. It clarifies why Lean can express mathematics so precisely and why ordinary-looking statements may carry sophisticated type information.

The basic correspondences are:

| Mathematical or programming idea | Lean 4 interpretation                | Practical effect                                                                    |
| -------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------- |
| Proposition                      | A type, usually in `Prop`            | To prove a proposition is to construct an inhabitant                                |
| Proof                            | A term inhabiting a proposition-type | Proof checking becomes type checking                                                |
| Universal statement              | Dependent function type              | `∀ n : Nat, P n` is proved by a function from `n` to a proof of `P n`               |
| Existence statement              | Dependent pair-like proposition      | A proof must provide a witness and evidence                                         |
| Equality                         | A proposition relating two terms     | Rewriting uses equality proofs                                                      |
| Computation                      | Definitional reduction               | Some equalities are solved by `rfl` because both sides reduce to the same core term |
| Mathematical structure           | Structure/class with fields and laws | Algebraic facts become reusable through instances                                   |
| Contextual assumptions           | Local variables and hypotheses       | Proof state records available terms and propositions                                |

**Example: theorem as type.**

```lean
theorem id_prop (P : Prop) : P → P := by
  intro h
  exact h
```

This theorem is not just a named formula. It is a definition whose type is `P → P`, and whose value is a proof term. The tactic proof constructs a function that receives `h : P` and returns `h`.

The same proof can be written more directly:

```lean
theorem id_prop_term (P : Prop) : P → P :=
  fun h => h
```

The difference is not semantic grandeur; it is proof-engineering style. Term proofs expose the proof object directly. Tactic proofs expose an interactive construction process.

**Limit of the lens:** dependent type theory explains the meaning of Lean proofs, but it should not replace practical knowledge of tactics, theorem search, imports, notation, simplification, and Mathlib hierarchy. Lean users do not need to become type theory researchers before proving basic theorems, but they do need enough type theory to understand why the system asks for what it asks for.

### Term Proofs and Tactic Proofs — two surfaces over proof terms

Lean offers both term-style and tactic-style proof development. They should not be treated as rival cultures; they are two interfaces to the same underlying requirement: construct a term of the target type.

| Proof style  | Best use                                                                    | Strength                                        | Cost                                              |
| ------------ | --------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------- |
| Term proof   | Short logical transformations, direct construction, readable lambda terms   | Transparent and compact                         | Can become unreadable when goals are complex      |
| Tactic proof | Multi-step proof search, induction, case splits, local rewrites, automation | Mirrors interactive reasoning through goals     | Can become opaque, brittle, or tactic-golfed      |
| `calc` proof | Equational reasoning and chained transformations                            | Close to textbook algebra                       | Requires appropriate equality/transitivity lemmas |
| Mixed proof  | Professional formalization                                                  | Allows local clarity and global maintainability | Requires judgment about where each style fits     |

**Example: conjunction commutativity.**

```lean
theorem and_comm_term (P Q : Prop) : P ∧ Q → Q ∧ P :=
  fun h => And.intro h.right h.left
```

```lean
theorem and_comm_tactic (P Q : Prop) : P ∧ Q → Q ∧ P := by
  intro h
  constructor
  · exact h.right
  · exact h.left
```

The tactic proof is longer, but it teaches proof-state movement. After `intro h`, the local context contains `h : P ∧ Q`. After `constructor`, Lean creates two goals: one for `Q`, one for `P`.

The professional rule is not “term proofs are better” or “tactics are better.” The rule is: use the form that makes the proof object’s mathematical structure easiest to inspect and maintain.

### Rewriting and Simplification as Proof Engineering — `rw`, `simp`, normal forms

Rewriting is one of Lean’s central proof-engineering mechanisms. It turns equality proofs into transformations of goals or hypotheses.

| Mechanism           | Meaning                                                             | Typical use                            | Risk                                         |
| ------------------- | ------------------------------------------------------------------- | -------------------------------------- | -------------------------------------------- |
| `rw [h]`            | Rewrite using equality theorem or hypothesis `h`                    | Directed local transformation          | Wrong direction can make the goal harder     |
| `rw [← h]`          | Rewrite in the reverse direction                                    | Restore a useful form or match a lemma | Can obscure intended normal form             |
| `simp`              | Simplify using registered simp lemmas, definitions, and local facts | Normalize routine goals                | Can hide why the goal was solved             |
| `simp [definition]` | Simplify with additional unfolding or lemmas                        | Local controlled normalization         | Over-unfolding can expose irrelevant details |
| `calc`              | Chain equalities or inequalities                                    | Textbook-style equational proof        | Needs compatible transitivity structure      |

**Example: rewriting direction matters.**

```lean
example (n : Nat) : n + 0 = n := by
  rw [Nat.add_zero]
```

Here `Nat.add_zero` rewrites `n + 0` to `n`. Rewriting in the opposite direction would make the expression larger and less canonical.

**Example: simplification can solve the goal.**

```lean
example (n : Nat) : n + 0 = n := by
  simp
```

This proof is shorter, but a reader should know that `simp` is using a normalization rule for addition by zero. A proof solved by `simp` is acceptable when the simplification is routine; it is weak pedagogy when the simplifier hides the central mathematical idea.

**Common pitfall:** marking too many lemmas as simp lemmas can cause unstable simplification behavior. A good simp lemma usually rewrites toward a smaller, canonical, or more normalized form. A bad simp lemma can create loops, blow up terms, or erase meaningful structure.

### Structures, Classes, and Mathlib-Style Abstraction — hierarchy, notation, reuse

Lean’s mathematical power depends heavily on structures, classes, instances, and the library hierarchy.

A group theorem in Lean is rarely written for one concrete group. It is written for an arbitrary type equipped with a group structure. The operation notation, identity element, inverse operation, and available lemmas are supplied through typeclass inference.

```lean
example {G : Type} [Group G] (a : G) : a * 1 = a := by
  simp
```

This small theorem involves several hidden mechanisms:

| Visible code      | Hidden mechanism                                                           |
| ----------------- | -------------------------------------------------------------------------- |
| `G : Type`        | A type of objects                                                          |
| `[Group G]`       | A typeclass instance providing multiplication, identity, inverse, and laws |
| `*` and `1`       | Notation resolved through algebraic structure                              |
| `simp`            | Simplification using registered group laws                                 |
| theorem statement | General over all groups, not one concrete implementation                   |

This is the basic pattern behind Mathlib’s scalability. Theorems are not duplicated for every concrete structure. They are written against abstractions, and typeclass inference supplies the required structure.

| Abstraction                  | What it packages                                           | Why it matters                                              |
| ---------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------- |
| `Semigroup`                  | Associative multiplication                                 | Lets associativity lemmas work generically                  |
| `Monoid`                     | Multiplication, identity, laws                             | Supports identities such as `a * 1 = a`                     |
| `Group`                      | Monoid plus inverse laws                                   | Enables cancellation and inverse reasoning                  |
| `Ring`                       | Additive and multiplicative structures plus distributivity | Enables algebraic normalization                             |
| Order classes                | Relations and order laws                                   | Supports inequality reasoning                               |
| Topological structures       | Open sets, limits, continuity abstractions                 | Supports analysis                                           |
| Measure-theoretic structures | Measurability and measure abstractions                     | Supports integration and probability-adjacent formalization |

**Design tradeoff:** typeclasses allow highly reusable theorem statements and notation. The cost is that failures may be indirect: the visible term may look correct, but Lean cannot find an instance, infer a universe level, resolve a coercion, or match the expected abstraction.

### Mathlib-Centered Practice — library literacy as language literacy

In Lean 4, knowing syntax is not enough. Professional fluency requires knowing how to use `Mathlib`: what to import, how theorem names are shaped, how namespaces organize definitions, which abstractions already exist, and when to stop proving and start searching.

`Mathlib` is not merely an optional library. For serious mathematics, it is the practical environment in which Lean 4 lives. Its own repository describes it as containing mathematics, programming infrastructure, and tactics. ([GitHub][2])

| Task                          | Lean/Mathlib workflow                                                          | Practical judgment                                               |
| ----------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Need a theorem about addition | Search existing names and theorem shapes                                       | Do not reprove standard arithmetic                               |
| Need a theorem about lists    | Inspect namespace and simp lemmas                                              | Prefer existing canonical lemmas                                 |
| Need algebraic simplification | Try `ring`, `nlinarith`, `linarith`, `simp`, `norm_num` when appropriate       | Use automation when the mathematical task matches the tactic     |
| Need an abstraction           | Look for existing structures/classes                                           | Avoid defining parallel incompatible structures                  |
| Need a local proof            | Decide whether a helper lemma clarifies the proof                              | Do not over-search when a small local lemma improves readability |
| Need imports                  | Import the narrowest module that supports the task, subject to maintainability | Avoid unnecessary import bloat                                   |

The important professional habit is **statement alignment**. Many failed Lean proofs are not caused by insufficient tactics; they are caused by theorem statements that do not align with existing library abstractions.

For example, proving a theorem about a concrete operation may be harder than proving it for any `Monoid`, because the library lemmas are stated at the abstract level. Conversely, over-generalizing too early can introduce typeclass obligations and notation ambiguity.

### Tao’s Analysis Companion as a Case Corpus — real formalization, not mere decoration

The uploaded `Analysis.zip` is highly relevant to this tutorial design. It contains Lean source for Terence Tao’s open Lean companion to *Analysis I*. The public repository describes the project as a formalization of Tao’s *Analysis I* into Lean, intended to paraphrase the original text faithfully while also showcasing Lean features and syntax; it also notes that the formalization is not optimized for efficiency and may deviate from idiomatic Lean usage in some cases. ([GitHub][3]) Tao’s announcement likewise describes it as a translation of many definitions, theorems, and exercises into Lean, with `sorry` positions serving as places to fill in proofs. ([What's new][4])

This makes it valuable for PART 1’s design philosophy because it illustrates a key distinction:

| Use of the Tao Analysis corpus       | Value                                                                                                                                       | Limitation                                                |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Reading theorem statements           | Shows how textbook mathematics becomes Lean propositions                                                                                    | Some statements prioritize faithfulness to the book       |
| Studying proof scripts               | Shows real use of `simp`, `rw`, `linarith`, `ring`, `omega`, `calc`, `induction`, and helper lemmas                                         | Not every proof is the most idiomatic possible            |
| Comparing with Mathlib               | Shows the transition from pedagogical definitions to library abstractions                                                                   | Requires separate Mathlib literacy                        |
| Understanding formalization pressure | Exposes how informal mathematical prose must be disambiguated                                                                               | May overwhelm readers if used before core proof mechanics |
| Building theorem anchors             | Provides authentic examples in natural numbers, sets, integers, rationals, reals, sequences, series, limits, and measure-theoretic material | Advanced chapters should be selected carefully            |

This tutorial should therefore use Tao’s Analysis companion as a **case corpus**, not as a universal style authority. Its strongest role is to provide authentic theorem anchors: places where dependent type theory, theorem statement design, rewriting, simplification, induction, algebraic automation, and library search meet real mathematical content.

**Professional distinction:** “faithful formalization of a textbook” and “maximally idiomatic Mathlib code” are related but not identical goals. A tutorial that ignores this distinction will teach brittle habits. A good Lean guide should show both why Tao-style source is pedagogically valuable and where Mathlib-native abstraction becomes the better professional style.

### What Lean 4 Makes Easy — formal precision, reusable abstraction, checked proof objects

Lean makes some activities unusually powerful:

| Strength                        | Capability gained                                    | Cost introduced                                       |
| ------------------------------- | ---------------------------------------------------- | ----------------------------------------------------- |
| Machine-checked theorem proving | Proof gaps are rejected by the kernel                | Every implicit assumption must be formalized          |
| Dependent types                 | Statements can mention values and precise invariants | Type errors become richer and harder                  |
| Interactive proof state         | Users can construct proofs incrementally             | The editor becomes part of the reasoning workflow     |
| Tactics                         | Routine reasoning can be automated                   | Automation can hide proof structure                   |
| Mathlib hierarchy               | Theorems can be reused across many structures        | Requires typeclass and namespace literacy             |
| Metaprogramming                 | New automation and syntax can be built inside Lean   | Advanced metaprogramming has high conceptual overhead |
| Executable definitions          | Some specifications can compute                      | Termination, reducibility, and performance matter     |

Lean is especially good when the goal is not merely to implement an algorithm, but to **state and verify a claim about it**. It is also powerful for formalized mathematics because definitions, theorems, and proof automation accumulate into a reusable library.

This is why Lean is attractive in areas such as undergraduate and graduate mathematics formalization, proof engineering, verified algorithms, formal semantics, and metatheory. It gives immediate, mechanical feedback about whether a proof term actually inhabits the target proposition.

### What Lean 4 Makes Hard — informal compression, hidden assumptions, quick-and-dirty reasoning

Lean deliberately makes some ordinary mathematical and programming habits harder.

| Informal habit                        | Why Lean resists it                                      | Better Lean habit                                                |
| ------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------- |
| “It is obvious”                       | The kernel needs a term, not a feeling of obviousness    | Use existing lemmas, `simp`, or a local proof                    |
| Ambiguous notation                    | Lean must resolve exact types, operations, and instances | State variables and typeclass assumptions clearly                |
| Changing definitions mid-proof        | Later proofs depend on exact definitional behavior       | Stabilize definitions before building large proof towers         |
| Handwaving coercions                  | Coercions must be inserted and type-correct              | Learn coercion paths and inspect expected types                  |
| Proving only the concrete case        | Library lemmas may be stated generally                   | Generalize theorem statements when useful                        |
| Treating automation as proof          | Automation must be readable and maintainable             | Use automation where it reflects routine reasoning               |
| Importing mathematical prose directly | Natural language omits many type and domain constraints  | Translate prose into explicit quantifiers, hypotheses, and types |

Lean punishes vagueness. This is not accidental. Its value comes from making mathematical and logical commitments explicit enough to check.

However, the cost is real. Formalization can be slower than writing informal prose. Proofs can fail for reasons that seem bureaucratic: a missing instance, a theorem stated with arguments in the wrong order, an expression not in simplifier-normal form, or an induction hypothesis that is too weak.

### What Lean Deliberately Prevents or Discourages — unchecked proof, implicit semantic drift, unstructured mathematics

Lean’s design discourages several patterns:

| Discouraged pattern                     | Why it is discouraged                                        | Modern Lean alternative                                           |
| --------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| Unchecked mathematical reasoning        | It defeats the purpose of theorem proving                    | Construct proof terms checked by the kernel                       |
| Ad hoc parallel hierarchies             | They fragment theorem reuse                                  | Use existing Mathlib structures where possible                    |
| Repeated local proofs of standard facts | They bloat code and reduce maintainability                   | Search and reuse library lemmas                                   |
| Tactic golf                             | It minimizes characters, not understanding                   | Prefer robust, readable proof scripts                             |
| Overuse of global simp attributes       | It can destabilize unrelated proofs                          | Use local `simp [lemma]` unless global normalization is justified |
| Premature metaprogramming               | It hides ordinary proof obligations behind custom automation | Master definitions, theorem statements, and basic tactics first   |
| Classical reasoning by accident         | It can change constructive content                           | Mark classical assumptions intentionally                          |

Lean does not prevent all bad style. It can check unreadable proof scripts. It can accept over-specific theorem statements. It can verify code that is technically correct but impossible to maintain. The kernel guarantees correctness of checked proof terms relative to the trusted environment; it does not guarantee good exposition, good abstraction, good naming, good imports, or good theorem design.

### What Lean Leaves to Programmer Discipline — style, maintainability, abstraction, search judgment

A critical part of Lean mastery is knowing what the system does not enforce.

| Area                | What Lean checks                                    | What remains discipline                             |
| ------------------- | --------------------------------------------------- | --------------------------------------------------- |
| Proof correctness   | The elaborated proof term inhabits the theorem type | Whether the proof is readable                       |
| Type correctness    | Terms match expected types                          | Whether the theorem statement is well-designed      |
| Instance resolution | Required instances can be found                     | Whether the chosen abstraction is appropriate       |
| Simplification      | Registered simp lemmas can solve or reduce goals    | Whether the simp set is conceptually clean          |
| Imports             | Imported modules are available                      | Whether dependencies are minimal and stable         |
| Namespaces          | Names resolve                                       | Whether names communicate mathematical intent       |
| Automation          | Tactics produce accepted terms                      | Whether automation hides important reasoning        |
| Metaprogramming     | Generated terms can be checked                      | Whether extensions are maintainable and trustworthy |

**Failure-first explanation:** the wrong mental model is that if Lean accepts a proof, the proof is professionally good. The correct model is that Lean acceptance is a necessary correctness condition, not a sufficient maintainability condition.

A professional Lean code review asks more than “does it compile?” It asks whether the theorem is stated at the right level of generality, whether proof steps reveal the mathematical idea, whether automation is bounded, whether imports are justified, whether names are searchable, and whether local definitions duplicate library abstractions.

### Adjacent Languages and Systems — what transfers and what does not

Lean 4 overlaps with several language families, but each comparison is partial.

| Adjacent language or system | Similarity                                                        | Difference                                                                                                | Transfer risk                                                    |
| --------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Coq / Rocq                  | Both are proof assistants based on dependent type theory          | Lean 4 has a different elaborator, tactic framework, syntax, metaprogramming model, and Mathlib ecosystem | Assuming tactic names and library style transfer directly        |
| Agda                        | Dependent types, pattern matching, constructive flavor            | Lean is more tactic- and library-centered for large-scale formal mathematics                              | Expecting Agda-style interactive programming to map directly     |
| Haskell                     | Functional programming, algebraic data types, typeclasses         | Lean’s typeclasses support proof-relevant mathematical hierarchy inside dependent type theory             | Treating Lean as “Haskell with proofs”                           |
| OCaml / F#                  | Functional syntax, inductive-like data modeling, pattern matching | Lean’s proposition/proof layer and elaboration model dominate practice                                    | Underestimating proof-state workflow                             |
| Rust                        | Strong static guarantees and explicit design discipline           | Lean’s guarantees concern theorem checking and dependent types, not ownership as the central model        | Looking for borrow-checker-like explanations                     |
| Python                      | Interactive experimentation and rich ecosystem habits             | Lean rejects informal dynamic experimentation at the proof boundary                                       | Expecting runtime trial-and-error instead of type/proof feedback |
| TypeScript                  | Static layer over practical code, inference, tooling              | Lean types are not erased documentation; they are proof-relevant formal objects                           | Treating types as approximate developer hints                    |
| Informal mathematics        | Theorems, definitions, proofs, examples                           | Lean requires explicit terms, domains, hypotheses, and proof objects                                      | Translating prose too literally                                  |

The most dangerous transfer mistake is to treat Lean as one familiar thing: “a functional language,” “a theorem prover,” “a tactic language,” or “formalized LaTeX.” Lean is a hybrid system, but not a loose mixture. Its parts are integrated through elaboration and kernel checking.

### Transfer Map — habits that carry over, mutate, or fail

| Source-language habit or concept | How it appears in Lean 4                          | What transfers                                 | What changes                                                                        | Common failure mode                              | Better mental model                                     |
| -------------------------------- | ------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------- |
| Haskell typeclasses              | Lean classes and instances                        | Overloaded operations and generic abstractions | Classes may include mathematical laws and proof fields                              | Treating typeclasses as only ad hoc interfaces   | Typeclasses are infrastructure for theorem reuse        |
| OCaml pattern matching           | `match`, equation compiler, inductive eliminators | Case analysis over inductive data              | Pattern matching interacts with dependent types and proof obligations               | Losing information across cases                  | Pattern matching refines types and goals                |
| Coq tactics                      | Lean tactics                                      | Goal-directed proof development                | Syntax, tactic behavior, and library conventions differ                             | Porting scripts mechanically                     | Learn Lean proof states, not tactic names alone         |
| Mathematical rewriting           | `rw`, `simp`, `calc`                              | Equalities transform expressions               | Direction, normal forms, and simp sets matter                                       | Rewriting away the useful shape                  | Rewrite toward canonical or lemma-matching forms        |
| Python REPL exploration          | `#check`, `#eval`, editor goals                   | Interactive feedback                           | Feedback is type/proof-directed, not arbitrary runtime probing                      | Expecting dynamic flexibility                    | Explore through types, goals, and theorem search        |
| Rust discipline                  | Explicit modeling and compiler feedback           | Let the system reject invalid states           | Lean does not center ownership/lifetimes                                            | Searching for memory-safety metaphors everywhere | Think proof obligations, not borrow obligations         |
| TypeScript inference             | Omitted type information                          | Inference can reduce annotation burden         | Lean inference may create metavariables, instance obligations, universe constraints | Assuming inference is only convenience           | Inference is part of elaboration and proof construction |
| Informal textbook proof          | Theorem/proof declarations                        | Structure of definitions and lemmas            | Every domain, coercion, and dependency must be explicit                             | “Obvious” steps fail                             | A proof is a constructed term, not persuasive prose     |

This map should be used as a warning: many concepts transfer only after being reinterpreted through Lean’s proof-theoretic and elaboration-centered architecture.

### Strengths and Costs — design tradeoffs that define Lean 4

Lean’s major features should be evaluated by tradeoff, not by praise.

| Feature         | Problem solved                                            | Capability gained                                        | Cost introduced                                       | Misuse encouraged                                  | Programs/proofs that benefit                           | Programs/proofs that suffer                          |
| --------------- | --------------------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------- |
| Dependent types | Ordinary types cannot express precise mathematical claims | Values can appear in types; propositions are first-class | Type checking and error diagnosis become more complex | Encoding too much too early                        | Formal mathematics, verified semantics, precise APIs   | Quick prototypes with unstable definitions           |
| Tactics         | Manual proof terms are verbose                            | Interactive construction and automation                  | Scripts can become opaque                             | Tactic golf, blind automation                      | Repetitive reasoning, induction, algebra, rewriting    | Proofs where explanation matters but tactics hide it |
| Typeclasses     | Mathematical structure needs reuse                        | Generic notation and theorems across hierarchies         | Instance search failures can be indirect              | Creating redundant instances or local hierarchies  | Algebra, order, topology, reusable APIs                | Highly ad hoc domains without stable abstractions    |
| `simp`          | Routine simplification is repetitive                      | Normalization and local cleanup                          | Simp behavior depends on lemma sets                   | Using `simp` without understanding                 | Algebraic identities, list simplification, projections | Proofs requiring a noncanonical intermediate form    |
| Mathlib         | Standard facts should be reusable                         | Large-scale formalization becomes possible               | Library search and import management become essential | Reproving or fighting the library                  | Serious mathematics and proof engineering              | Isolated examples that avoid library learning        |
| Metaprogramming | Users need extensible automation                          | Tactics and language extensions can be built in Lean     | High complexity and trust-boundary concerns           | Hiding basic proof obligations behind custom tools | Domain-specific automation                             | Beginner-level proofs and simple formalizations      |
| Kernel checking | Proof correctness needs a small trusted base              | Tactics need only produce checkable terms                | Error source may be far from final kernel check       | Assuming accepted means readable                   | High-assurance formalization                           | Informal exploratory writing                         |

### Classical Mathematical Anchors — why they belong in the guide

Lean 4 becomes intelligible when mechanisms are tied to theorem anchors. The tutorial should use theorem anchors not as decoration but as diagnostic handles.

| Anchor family                             | Lean mechanism exercised                               | Why it is pedagogically central                                           |
| ----------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------- |
| `P → P`, `P ∧ Q → Q ∧ P`, `P ∨ Q → Q ∨ P` | Intro rules, constructors, cases, proof terms          | Shows propositions-as-types without arithmetic noise                      |
| Currying and uncurrying                   | Function types, implication, product-like propositions | Shows proof as program transformation                                     |
| De Morgan and double negation             | Constructive/classical boundary                        | Prevents accidental classical reasoning                                   |
| `n + 0 = n`, `0 + n = n`                  | Recursion, definitional equality, induction, simp      | Shows why similar-looking arithmetic facts may differ proof-theoretically |
| Addition associativity/commutativity      | Induction, rewriting, library lemmas                   | Shows theorem dependency and proof reuse                                  |
| List append identity/associativity/length | Inductive data and recursive functions                 | Connects programming data to proof obligations                            |
| Map composition and reverse involution    | Higher-order functions, induction, rewriting           | Shows functional programming inside proof engineering                     |
| Monoid/group/ring laws                    | Typeclasses, notation, algebraic automation            | Shows Mathlib hierarchy in action                                         |
| Set membership and images/preimages       | Extensionality, rewriting predicates                   | Shows proof over predicates and functions                                 |
| Sequences, limits, inequalities           | Mathlib analysis abstractions                          | Shows the gap between elementary proof scripts and advanced library use   |
| Small expression evaluators               | Inductive syntax, recursion, semantic correctness      | Connects programming-language theory to Lean’s proof/program unity        |

The uploaded Tao Analysis corpus is especially valuable for anchors in natural numbers, set-theoretic reasoning, integers, rationals, reals, sequences, limits, and measure-theoretic extensions. Its role is to provide authentic source material for understanding how textbook statements become Lean declarations.

### Lean 4 and Programming — computation supports proof, but proof changes the meaning of programming

Lean 4 is a programming language, but its programming model should be taught in relation to theorem proving.

| Programming feature | Ordinary programming meaning     | Lean-specific significance                                                           |
| ------------------- | -------------------------------- | ------------------------------------------------------------------------------------ |
| Inductive types     | Define recursive data            | Also generate eliminators and induction principles                                   |
| Recursive functions | Compute by recursion             | Must satisfy termination/productivity requirements where relevant                    |
| Pattern matching    | Branch by shape                  | Refines goals and hypotheses in proofs                                               |
| Structures          | Named records                    | Also represent mathematical objects and law-carrying abstractions                    |
| Monads              | Structure effects                | Separate pure definitions from `IO`, exceptions, state, and metaprogramming contexts |
| Evaluation          | Compute results                  | Supports definitional equality, `rfl`, `#eval`, and proof by computation             |
| Compilation         | Run Lean programs                | Distinct from proof elaboration and kernel checking                                  |
| Metaprogramming     | Generate or inspect syntax/terms | Powers tactics, commands, elaborators, and automation                                |

A Lean function is not automatically a theorem, but definitions can be used in theorem statements and proofs. Computation can solve proof obligations when both sides reduce to the same term. Conversely, a proof may certify properties of a program.

This creates a different programming style from ordinary FP. Definitions should be written not only for execution, but also for **proof usability**. A definition that computes correctly may still be difficult to reason about if it unfolds poorly, hides useful structure, or produces awkward induction principles.

### Error, Effect, and Boundary Model — proof failure is not runtime failure

Lean has several different notions of failure and boundary. Collapsing them into one category causes confusion.

| Failure or boundary type          | Layer                     | Example                                          | Professional response                              |
| --------------------------------- | ------------------------- | ------------------------------------------------ | -------------------------------------------------- |
| Syntax error                      | Parser                    | Malformed declaration                            | Fix surface syntax                                 |
| Elaboration error                 | Elaborator                | Type mismatch, unresolved implicit argument      | Inspect expected type and local context            |
| Typeclass inference failure       | Elaborator                | Missing `[Group G]` or incompatible structure    | Add or expose the required instance                |
| Proof failure                     | Tactic/proof construction | Goal remains unsolved                            | Change proof strategy, statement, or helper lemmas |
| Kernel rejection                  | Trusted checking          | Invalid elaborated term                          | Serious correctness boundary                       |
| Runtime failure                   | Executable code           | Failing `IO` or partial computation              | Use ordinary programming diagnosis                 |
| Library boundary failure          | Ecosystem                 | Changed theorem name, missing import             | Search docs/source and adjust imports              |
| Unsafe/trusted extension boundary | Metaprogramming/runtime   | `unsafe`, custom native code, trusted primitives | Isolate and audit carefully                        |

This distinction matters because “Lean says no” can mean many things. The diagnosis method depends on the layer.

**Common pitfall:** treating every failure as “I need another tactic.” Often the right fix is to restate the theorem, generalize a variable before induction, import the correct module, expose a typeclass instance, or rewrite the goal into a library-recognizable form.

### Runtime, Memory, and Cost Model — proof engineering has costs beyond execution

Lean 4 has an ordinary runtime dimension, but its cost model also includes proof-specific costs.

| Cost source           | Usual manifestation                                         | Why it matters                                            |
| --------------------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| Elaboration cost      | Slow checking of declarations                               | Large proofs and heavy inference can slow development     |
| Typeclass search      | Delays or confusing failures                                | Deep hierarchies and ambiguous instances matter           |
| Simplification        | `simp` takes too long or changes too much                   | Large simp sets can be expensive and unpredictable        |
| Automation            | `aesop`, arithmetic tactics, or search tactics consume time | Useful automation may hurt maintainability or performance |
| Imports               | Longer build times and larger environments                  | Import discipline affects project scale                   |
| Compilation           | Executable Lean code has runtime performance concerns       | Lean can be used for real programs, not only proofs       |
| Data structure choice | Lists, arrays, maps, sets differ in cost                    | Proof convenience and runtime efficiency may conflict     |
| Metaprogramming       | Generated terms and tactic execution can be expensive       | Custom automation must be profiled and constrained        |

A professional Lean cost model therefore asks two questions:

1. How expensive is the program when executed?
2. How expensive is the development artifact when elaborated, checked, searched, simplified, imported, and maintained?

This second question is language-specific. In many Lean projects, proof-checking and build-time performance are more important than runtime execution speed.

### Historical Position — Lean 4 after Lean 3, Mathlib migration, and modern formalization

Lean 4 should be understood historically as part of a broader shift in proof assistants: from isolated formal systems toward interactive, library-rich, automation-friendly, editor-integrated proof engineering environments.

A community post notes that Lean 4 reached its first official stable release in September 2023, marking a transition from nightly-only use to regular stable releases. ([leanprover-community.github.io][5]) Since then, Lean 4 development has continued through frequent releases, and current projects typically pin versions rather than assume global stability. ([Lean Language][1])

| Era or pressure                        | Lean 4 response                          | Lasting consequence                               |
| -------------------------------------- | ---------------------------------------- | ------------------------------------------------- |
| Need for scalable formal mathematics   | Mathlib-centered ecosystem               | Library search and hierarchy literacy are central |
| Need for better extensibility          | New metaprogramming infrastructure       | Tactics and commands can be developed in Lean     |
| Need for interactive proof feedback    | Editor and language-server workflow      | Proof state becomes part of the writing process   |
| Need for executable verified artifacts | Programming language plus theorem prover | Computation and proof are linked                  |
| Need for modern project workflow       | Lake and toolchain pinning               | Builds become reproducible project artifacts      |
| Need to migrate from Lean 3            | Lean 4 and Mathlib4 transition           | Some older habits, names, and tactics changed     |

The historical lesson is practical: Lean 4 is not just a formal calculus. It is also an evolving ecosystem. Expert judgment requires separating stable conceptual foundations from moving tooling and library conventions.

### Current Trends — mature, emerging, overhyped, and declining tendencies

| Trend                                   | Status                      | Driving pressure                                                 | Caveat                                                                                |
| --------------------------------------- | --------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Mathlib-centered formalization          | Mature and central          | Large-scale theorem reuse requires shared abstractions           | Library literacy is non-optional                                                      |
| Lake-based project workflow             | Mature professional default | Reproducible builds and dependency control                       | Version pinning must be respected                                                     |
| Editor-driven interactive proving       | Mature                      | Proof states guide development                                   | Users can become dependent on tactic guessing                                         |
| Algebraic and order automation          | Mature but tactic-specific  | Routine symbolic reasoning should be automated                   | Each tactic has a scope and failure mode                                              |
| AI-assisted Lean proving                | Emerging and active         | Formal proof search is attractive for LLM/tool integration       | Generated proofs still require checking, maintainability, and theorem-design judgment |
| Large-scale textbook formalization      | Emerging-to-mature          | Formal companions to mathematical texts are increasingly visible | Faithful textbook formalization may not equal idiomatic library design                |
| Metaprogramming-heavy local DSLs        | Powerful but advanced       | Domain-specific automation can reduce proof burden               | Premature DSLs can hide core proof obligations                                        |
| Treating Lean as just a coding language | Misleading                  | Lean can compile programs                                        | It misses the proof assistant and library-centered identity                           |
| Treating Lean as formalized LaTeX       | Misleading                  | Mathematical notation looks familiar                             | Lean requires exact types, terms, and proof objects                                   |

Tao’s *Analysis I* companion is part of the visible trend toward formal mathematical companions for serious texts. It is valuable not only because of Tao’s authorship, but because it demonstrates how textbook mathematics becomes a structured Lean project with definitions, theorems, exercises, `sorry` positions, and library interaction. ([What's new][4])

### Specialized Interdisciplinary Lens Map — what the guide will use and where it stops

Lean 4 benefits from interdisciplinary explanation, but only when it clarifies concrete Lean practice. This guide will use the following lenses.

| Lens or external field                   | Core idea                                                | Language features clarified                                   | Practical programming consequence                   | Where it appears in the guide | Limit of the lens                                        |
| ---------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------- | ----------------------------- | -------------------------------------------------------- |
| Dependent type theory                    | Types may depend on values; propositions are types       | Theorems, proofs, universes, implicit arguments, equality     | Helps read theorem statements and proof obligations | PART 1, PART 3, PART 7        | Not a substitute for tactic and library fluency          |
| Logic and proof theory                   | Proofs have introduction/elimination structure           | `intro`, `cases`, `constructor`, `apply`, classical reasoning | Helps choose proof strategies                       | PART 2, PART 4                | Does not explain Mathlib naming or imports               |
| Lambda calculus / functional programming | Functions and terms are computational objects            | Term proofs, recursion, pattern matching                      | Helps understand proofs as programs                 | PART 3, PART 4, PART 7        | Lean is not merely Haskell-like FP                       |
| Algebraic hierarchy                      | Structures and laws can be abstracted                    | Typeclasses, monoids, groups, rings, orders                   | Helps reuse generic theorems                        | PART 3, PART 6                | Does not cover all formalization problems                |
| Rewriting systems                        | Equalities can transform expressions toward normal forms | `rw`, `simp`, `calc`, simp lemmas                             | Helps debug simplification and rewrite direction    | PART 4, PART 7                | Simplification is not arbitrary mathematical reasoning   |
| Compiler and elaborator theory           | Surface syntax is elaborated into core terms             | Holes, metavariables, instance search, notation               | Helps diagnose errors and hidden obligations        | PART 2, PART 7, PART 9        | Users need only practical elaborator literacy            |
| Software engineering                     | Large proof developments require maintainability         | Modules, imports, helper lemmas, naming, review               | Helps scale formalization                           | PART 5, PART 9                | Proof correctness is stricter than ordinary code quality |
| Historical and ecosystem analysis        | Languages evolve through community and tooling pressure  | Lean 3 to Lean 4, Mathlib4, Lake, AI proving                  | Helps avoid obsolete habits                         | PART 8                        | History should not replace current practice              |

The most important boundary is this: theory clarifies Lean practice, but theory is not the product. The product is the ability to read, write, maintain, and debug Lean code and proofs in a real library environment.

### Mature Mental Model for Reading Lean Code — what to ask before touching tactics

Before reading or modifying Lean code, the professional questions are:

| Question                                           | Why it matters                                               |
| -------------------------------------------------- | ------------------------------------------------------------ |
| What is the target type or proposition?            | The goal determines the proof object required                |
| Which variables and hypotheses are in context?     | Proof steps can only use available terms and imported facts  |
| Which arguments are implicit?                      | Missing information may be inferred or may block elaboration |
| Which typeclass instances are required?            | Notation and lemmas often depend on inferred structure       |
| Is this equality definitional or propositional?    | `rfl` and `rw` solve different kinds of problems             |
| Is the goal in a simp-normal form?                 | `simp` works by normalization, not arbitrary intelligence    |
| Is this theorem already in Mathlib?                | Reuse is usually better than reproving                       |
| Should the statement be more general?              | General statements often match library lemmas better         |
| Is induction being applied with enough generality? | Weak induction hypotheses are a common failure source        |
| Is automation hiding the idea?                     | Accepted proofs still need maintainability                   |
| Is this code pedagogical, idiomatic, or legacy?    | Different sources optimize for different goals               |

This is the transition from beginner to serious reader. Beginners ask “what tactic should I try?” Advanced users ask “what is the structure of the goal, what theorem shape would solve it, and what does the library already know?”

### Core Misconceptions to Remove Early — wrong models that damage Lean learning

| Misconception                                     | Why it is wrong or incomplete                                                     | Better mental model                                       |
| ------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Lean is just a functional programming language    | It ignores propositions, proofs, tactics, kernel checking, and Mathlib            | Lean is a dependently typed proof/programming environment |
| Tactics are proof commands                        | Tactics construct proof terms under elaboration                                   | A tactic script is a proof-term construction program      |
| `simp` means “solve the obvious parts”            | `simp` applies a controlled set of simplification lemmas                          | `simp` normalizes according to registered rules           |
| If a theorem is true, Lean should prove it easily | Formal proof depends on statement shape, imports, instances, and available lemmas | Truth and formal accessibility are different              |
| Typeclass inference is automatic magic            | It searches for instances in a structured environment                             | Instance availability and abstraction design matter       |
| More automation is always better                  | Automation may be opaque, slow, or brittle                                        | Use automation where the reasoning pattern is routine     |
| `rfl` and `rw` are both just equality tools       | `rfl` uses definitional equality; `rw` uses propositional equality                | Distinguish computation from proof-based rewriting        |
| Mathlib is optional                               | Serious Lean mathematics depends on shared abstractions and lemmas                | Library literacy is part of Lean literacy                 |
| A compiled proof is a good proof                  | Kernel acceptance checks correctness, not readability                             | Maintainability is a separate engineering discipline      |
| Classical reasoning is harmless                   | It may change constructive content or assumptions                                 | Use classical reasoning deliberately                      |

These misconceptions should be addressed repeatedly, not because repetition is desirable, but because they are the source of many downstream failures.

### PART 1 Summary — Lean 4’s macro-level identity

Lean 4 should be understood as a **kernel-checked, elaboration-driven, dependently typed proof and programming environment** whose practical use is dominated by theorem statement design, proof-state interpretation, rewriting, simplification, typeclass inference, Mathlib literacy, and maintainable proof engineering.

Its core promise is strong: mathematical and computational claims can be stated precisely and checked mechanically. Its core cost is also strong: informal compression, ambiguous notation, hidden assumptions, and ad hoc reasoning must be translated into explicit terms, types, structures, instances, and proofs.

The right mental model is neither “Lean is Haskell with tactics” nor “Lean is formalized LaTeX.” Lean is a design system in which:

| Central object  | Lean meaning                                                                       |
| --------------- | ---------------------------------------------------------------------------------- |
| Program         | A typed term that may compute                                                      |
| Proposition     | A type in `Prop`                                                                   |
| Proof           | A term inhabiting a proposition                                                    |
| Tactic          | A program that constructs proof terms                                              |
| Theorem         | A named declaration with a proposition type and proof term                         |
| Structure/class | A packaged abstraction, often with laws                                            |
| Instance        | Evidence that a type satisfies an abstraction                                      |
| Library lemma   | A reusable proof object with a searchable name and theorem shape                   |
| Simplification  | Controlled normalization through registered lemmas                                 |
| Formalization   | Translation of mathematical or computational reasoning into checkable declarations |

The rest of the guide should therefore treat Lean 4 through five interacting axes: dependent type theory, proof engineering, rewriting/simplification, Mathlib abstraction, and practical project workflow. The Tao Analysis corpus should serve as a real mathematical case source, especially for theorem anchors, but it should be used with the explicit caveat that faithful textbook formalization and idiomatic Mathlib style are not always the same goal.

## PART 2 — Core Syntax and Semantic Primitives Reference

### Purpose and Scope — surface syntax, primitive semantics, reading discipline

PART 2 is a **source-reading reference**. Its goal is not to teach all of Lean’s type theory, all tactics, all of `Mathlib`, or all proof engineering. Those belong mainly to later parts. This part covers the syntax and primitive semantic constructs needed to read Lean code without losing the thread.

Lean source should be read with three simultaneous questions:

| Reading question                                               | What it asks                                                                                              | Why it matters                                                          |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| What declaration is being introduced?                          | `def`, `theorem`, `example`, `inductive`, `structure`, `class`, `instance`, `namespace`, `open`, `import` | Lean files are environments extended by declarations                    |
| What is the expected type?                                     | The type after `:` or inferred by elaboration                                                             | Lean elaborates terms relative to expected types                        |
| What information is explicit, implicit, inferred, or searched? | Parentheses, braces, typeclass brackets, omitted arguments, holes                                         | Much of Lean’s meaning is present semantically but absent syntactically |

A Lean declaration often looks small because the elaborator supplies missing details. Reading Lean well means learning to recover those details.

### Lexical Structure — tokens, identifiers, whitespace, Unicode, comments

Lean source consists of commands, identifiers, symbols, terms, tactic scripts, attributes, notation, comments, and documentation comments. Whitespace separates tokens but does not usually carry Python-like block meaning. Structure is mostly expressed through keywords, indentation-sensitive tactic blocks, bullets, and term delimiters.

| Construct         | Meaning                               | Syntax                                 | Example                           | Practical consequence                       | Common pitfall                                      |
| ----------------- | ------------------------------------- | -------------------------------------- | --------------------------------- | ------------------------------------------- | --------------------------------------------------- |
| Line comment      | Ignored by parser                     | `-- comment`                           | `-- proof by induction`           | Useful for proof notes                      | Comments do not affect elaboration                  |
| Block comment     | Ignored region                        | `/- ... -/`                            | `/- temporary note -/`            | Useful for longer explanations              | Nested comments should be handled carefully         |
| Doc comment       | Documentation attached to declaration | `/-- ... -/`                           | `/-- Addition is associative. -/` | Appears in generated docs and editor hovers | Writing prose that does not match theorem statement |
| Identifier        | Name of declaration or local variable | `foo`, `Nat.add_assoc`, `List.map`     | `def double ...`                  | Names are part of searchability             | Bad names make theorem search harder                |
| Unicode symbol    | Mathematical or logical notation      | `∀`, `→`, `∧`, `∨`, `≤`, `≠`           | `∀ n : Nat, n ≤ n`                | Improves mathematical readability           | Confusing notation with primitive syntax            |
| ASCII alternative | Keyboard-friendly equivalent          | `forall`, `->`, `/\`, `\/`, `<=`, `!=` | `P -> P`                          | Useful when Unicode input is inconvenient   | Mixing styles inconsistently                        |

Lean heavily supports Unicode. Professional Lean code often uses symbols such as `∀`, `λ` or `fun`, `→`, `↔`, `∧`, `∨`, `¬`, `∃`, `≤`, `≥`, `≠`, `∈`, `⊆`, `∘`, and `·`. However, these are not merely visual decorations. Many are notation defined over underlying constants.

**Language-design note:** Lean’s notation system lets mathematical syntax stay close to conventional mathematics. The cost is that notation is context-sensitive: the same symbol may depend on typeclass instances, namespaces, local notation scopes, coercions, and imports.

**Common pitfalls:**

| Pitfall                                       | Explanation                                                                              | Better habit                                |
| --------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------- |
| Treating notation as primitive                | Symbols such as `+`, `*`, `≤`, and `∈` are resolved through declarations and typeclasses | Use `#check` to inspect what notation means |
| Ignoring namespaces                           | `map`, `append`, or `mem` may mean different names in different namespaces               | Prefer qualified names when clarity matters |
| Writing comments instead of theorem structure | A comment cannot help Lean prove anything                                                | Encode assumptions in hypotheses and types  |

### Commands and Declarations — extending the environment

Lean files are sequences of commands. A command may define a constant, prove a theorem, import modules, open namespaces, declare notation, print information, or run evaluation.

| Command     | Meaning                                                 | Canonical example                               | Design meaning                                   | Practical consequence                                              |
| ----------- | ------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| `import`    | Add declarations from another module                    | `import Mathlib`                                | Files depend on environments                     | Imports determine available names, notation, instances, and lemmas |
| `def`       | Define a computable or reducible constant               | `def double (n : Nat) := n + n`                 | Definitions create named terms                   | Can be used by computation and proofs                              |
| `theorem`   | Define a proof-bearing constant                         | `theorem id_prop (P : Prop) : P → P := ...`     | Theorem is a declaration with proof term         | The statement is a type, proof is a term                           |
| `lemma`     | Same logical role as theorem, conventional smaller fact | `lemma add_zero' ...`                           | Naming convention, not a different kernel object | Used for reusable intermediate facts                               |
| `example`   | Anonymous declaration checked by Lean                   | `example : 1 + 1 = 2 := by norm_num`            | Good for local demonstrations                    | Not reusable by name                                               |
| `axiom`     | Introduce an unproved constant                          | `axiom choice_like : ...`                       | Extends trusted assumptions                      | Dangerous unless intentionally foundational                        |
| `opaque`    | Define a constant with hidden implementation            | `opaque secret : Nat`                           | Controls reducibility                            | Useful but can block computation-based proofs                      |
| `abbrev`    | Define an abbreviation                                  | `abbrev Point := Nat × Nat`                     | Transparent alias-like definition                | Helps readability without heavy abstraction                        |
| `inductive` | Define an inductive type                                | `inductive MyBool where ...`                    | Creates constructors and eliminators             | Central to data and proof by cases/induction                       |
| `structure` | Define a record-like type                               | `structure Point where x : Nat; y : Nat`        | Packages fields                                  | Used for data and mathematical structures                          |
| `class`     | Define a typeclass structure                            | `class HasSize (α : Type) where size : α → Nat` | Searchable structure                             | Enables overloaded operations and hierarchy                        |
| `instance`  | Provide a typeclass instance                            | `instance : Inhabited Nat := ⟨0⟩`               | Evidence for instance search                     | Makes notation and generic lemmas usable                           |
| `namespace` | Group names                                             | `namespace MyProject`                           | Name management                                  | Prevents conflicts and improves searchability                      |
| `section`   | Local parameter and option scope                        | `section ... end`                               | Scoping device                                   | Useful for shared variables and hypotheses                         |
| `variable`  | Declare reusable variables in a section                 | `variable (α : Type)`                           | Context management                               | Reduces repetition but can hide assumptions                        |
| `open`      | Open namespace or scoped notation                       | `open Nat`                                      | Local name resolution                            | Can improve readability or create ambiguity                        |
| `#check`    | Ask Lean for a type                                     | `#check Nat.add_assoc`                          | Inspection command                               | Essential source-reading tool                                      |
| `#eval`     | Evaluate executable expression                          | `#eval 2 + 3`                                   | Computation check                                | Only for executable terms                                          |
| `#print`    | Print declaration details                               | `#print Nat.add_assoc`                          | Environment inspection                           | Useful for understanding definitions and theorem statements        |

**Canonical declaration forms:**

```lean
def double (n : Nat) : Nat :=
  n + n
```

```lean
theorem identity_proof (P : Prop) : P → P := by
  intro h
  exact h
```

```lean
lemma zero_add_example (n : Nat) : 0 + n = n := by
  rfl
```

```lean
example (n : Nat) : n + 0 = n := by
  simpa using Nat.add_zero n
```

**Failure-first explanation:** the tempting mental model is that `theorem` is a special proof syntax separate from definitions. The correct semantic model is that a theorem is a constant whose type is a proposition and whose value is a proof term. `theorem`, `lemma`, and many `def` declarations all extend the same environment with named constants, though their reducibility and intended use differ.

**Common pitfalls:**

| Pitfall                                         | Why it fails                                                                    | Better habit                                                                  |
| ----------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Using `axiom` as a convenience                  | It expands the trusted base and can make the environment inconsistent if abused | Use `theorem`/`lemma` with proof, or explicitly mark foundational assumptions |
| Treating `example` as reusable                  | It has no convenient theorem name                                               | Use `lemma` for reusable facts                                                |
| Overusing `open` globally                       | It can obscure where names come from                                            | Use local `open` or qualified names                                           |
| Defining local copies of existing Mathlib facts | It fragments proof search                                                       | Search first with `#check`, docs, `exact?`, `apply?`, or theorem search       |

### Names, Namespaces, and Qualified Identifiers — environment navigation

Lean names are hierarchical. A declaration may be referred to by a short name when the namespace is open or by a fully qualified name when clarity matters.

| Form                | Meaning                           | Example                                 | Professional use                            |
| ------------------- | --------------------------------- | --------------------------------------- | ------------------------------------------- |
| Simple name         | Local or opened declaration       | `map`, `add_assoc`                      | Good inside obvious local context           |
| Qualified name      | Namespace-qualified declaration   | `Nat.add_assoc`, `List.map`             | Better for source clarity and search        |
| Root-qualified name | Bypass local namespace ambiguity  | `_root_.Nat`                            | Rare, used when namespace shadowing matters |
| Namespace block     | Prefix declarations               | `namespace MyProject ... end MyProject` | Organizes project code                      |
| Section block       | Local context without name prefix | `section ... end`                       | Manages variables and assumptions           |

Example:

```lean
namespace Demo

def double (n : Nat) : Nat :=
  n + n

theorem double_zero : double 0 = 0 := by
  rfl

end Demo
```

The full name of the theorem is `Demo.double_zero`.

```lean
#check Demo.double
#check Demo.double_zero
```

Namespaces are not merely aesthetic. Theorem search, completion, generated documentation, and maintainability all depend on good naming discipline.

**Language-design note:** Lean’s namespace system supports large formal libraries. In small files, unqualified names feel convenient. In large projects, qualified names often preserve semantic locality.

**Common pitfalls:**

| Pitfall                          | Explanation                                             | Better habit                                    |
| -------------------------------- | ------------------------------------------------------- | ----------------------------------------------- |
| Opening many namespaces globally | Short names become ambiguous or misleading              | Open namespaces locally near use                |
| Poor theorem prefixes            | Theorems become hard to discover                        | Follow namespace and theorem naming conventions |
| Naming by proof method           | Names like `lemma_by_induction` do not describe content | Name by statement shape or mathematical meaning |

### Imports and File Boundaries — available declarations, notation, instances, tactics

`import` determines what Lean knows. It brings declarations, notation, attributes, typeclass instances, tactics, and simp lemmas into the environment.

```lean
import Mathlib

#check Nat.add_zero
#check List.length_append
```

In serious projects, importing all of `Mathlib` is convenient but not always ideal. A narrower import may reduce build cost and clarify dependencies. However, premature import minimalism can also slow development. The right choice depends on the project stage.

| Import style                   | Strength                                     | Cost                                          | Best use                                            |
| ------------------------------ | -------------------------------------------- | --------------------------------------------- | --------------------------------------------------- |
| `import Mathlib`               | Maximum convenience                          | Large environment and heavier build           | Exploration, tutorials, broad mathematical examples |
| Targeted import                | Clearer dependencies and lighter environment | Requires knowing module structure             | Library-quality or large project code               |
| Local examples without Mathlib | Shows Lean core behavior                     | Lacks most useful mathematical infrastructure | Minimal syntax and type theory demonstrations       |

**Common pitfall:** treating missing names as missing language features. Often the problem is simply that the right module has not been imported.

### Variables and Binding — local constants, parameters, implicit context

Lean uses binders to introduce variables, parameters, hypotheses, and typeclass assumptions. Binders are central because theorem statements are structured by quantification.

| Binder form     | Meaning                                            | Example                | Typical use                                        |
| --------------- | -------------------------------------------------- | ---------------------- | -------------------------------------------------- |
| `(x : α)`       | Explicit argument                                  | `(n : Nat)`            | User supplies or Lean displays the argument        |
| `{x : α}`       | Implicit argument                                  | `{α : Type}`           | Lean infers from context                           |
| `{{x : α}}`     | Strict implicit argument                           | Less common            | Inferred only when later explicit arguments appear |
| `[C α]`         | Typeclass argument                                 | `[Group G]`            | Resolved by instance search                        |
| `(h : P)`       | Explicit proof/hypothesis argument                 | `(h : n = m)`          | Assumption available in theorem or function body   |
| `∀ x : α, P x`  | Universal quantification / dependent function type | `∀ n : Nat, n + 0 = n` | Theorem over arbitrary values                      |
| `fun x => body` | Function abstraction                               | `fun n => n + 1`       | Term-level function or proof                       |

Example:

```lean
theorem explicit_id (P : Prop) (h : P) : P :=
  h
```

```lean
theorem implicit_type_id {α : Type} (x : α) : α :=
  x
```

```lean
example {G : Type} [Group G] (a : G) : a * 1 = a := by
  simp
```

The declaration `{G : Type} [Group G] (a : G)` says: infer the type `G` if possible, find a `Group G` instance, and accept an explicit element `a`.

**Failure-first explanation:** the tempting mental model is that omitted arguments do not exist. In Lean, omitted arguments are often semantically real. They are inserted by elaboration. A theorem may appear to take one argument while actually depending on type parameters, universe parameters, structure instances, and implicit hypotheses.

Use `@` to expose implicit arguments:

```lean
#check Nat.add_zero
#check @Nat.add_zero
```

The `@` form asks Lean to show a version where implicit arguments are explicit.

**Common pitfalls:**

| Pitfall                                 | Why it fails                              | Better habit                                        |
| --------------------------------------- | ----------------------------------------- | --------------------------------------------------- |
| Forgetting implicit parameters          | The theorem seems mysterious when applied | Inspect with `#check @name`                         |
| Using explicit binders everywhere       | Code becomes noisy and harder to reuse    | Use implicit binders for inferable type parameters  |
| Using implicit binders too aggressively | Lean cannot infer them at use sites       | Make arguments explicit when they guide elaboration |
| Treating `[C α]` as ordinary data       | It is resolved by instance search         | Learn which instances are available and required    |

### Types, Sorts, `Prop`, and Universes — the minimum reading model

Lean has a universe hierarchy. Most ordinary data types live in `Type`, propositions live in `Prop`, and both are part of a larger hierarchy of sorts.

| Expression | Informal meaning                                    | Example                       |
| ---------- | --------------------------------------------------- | ----------------------------- |
| `Prop`     | Sort of propositions                                | `P : Prop`                    |
| `Type`     | Sort of ordinary data types                         | `Nat : Type`                  |
| `Type u`   | Universe-polymorphic type level                     | `List.{u}`-like polymorphism  |
| `Sort u`   | General universe including `Prop` and `Type` levels | Advanced generic declarations |

Basic examples:

```lean
#check Nat
#check Prop
#check Type
#check True
#check False
#check Nat → Nat
#check ∀ n : Nat, n = n
```

A proposition such as `n = n` has type `Prop`. A proof of it is a term inhabiting that proposition.

```lean
example (n : Nat) : n = n := by
  rfl
```

**Language-design note:** `Prop` is proof-irrelevant in important ways, and Lean distinguishes computational data from logical propositions. This distinction affects extraction, computation, definitional equality, and how proofs are treated.

**Common pitfalls:**

| Pitfall                              | Explanation                                                  | Better habit                                                  |
| ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------- |
| Thinking `Prop` is a Boolean         | A proposition is not the same as executable `Bool`           | Distinguish proof-bearing truth from computable Boolean tests |
| Avoiding universes entirely          | Usually fine at first, but advanced abstractions expose them | Learn universe errors when they arise                         |
| Treating `Type` as one flat universe | Lean has levels to avoid paradoxes                           | Accept universe polymorphism as part of generic library code  |

### Propositions, Proofs, and Theorem Statements — types as claims

A theorem statement is a type. The proof is a term of that type. This is the primitive semantic fact behind Lean source.

| Mathematical form                 | Lean form           | Proof idea                                                |
| --------------------------------- | ------------------- | --------------------------------------------------------- |
| If `P`, then `P`                  | `P → P`             | Function from proof of `P` to proof of `P`                |
| `P` and `Q` imply `Q` and `P`     | `P ∧ Q → Q ∧ P`     | Deconstruct conjunction, reconstruct reversed conjunction |
| For all `n`, `n = n`              | `∀ n : Nat, n = n`  | Function taking `n` to reflexivity proof                  |
| There exists `x` satisfying `P x` | `∃ x, P x`          | Provide witness and proof                                 |
| `a = b`                           | `Eq a b` or `a = b` | Equality proof usable for rewriting                       |

Example:

```lean
theorem forall_refl : ∀ n : Nat, n = n := by
  intro n
  rfl
```

Term proof:

```lean
theorem forall_refl_term : ∀ n : Nat, n = n :=
  fun n => rfl
```

The theorem is a function: given `n`, it returns a proof of `n = n`.

**Common pitfall:** reading `∀ n : Nat, n = n` as a runtime loop over all natural numbers. It is not a loop. It is a dependent function type. A proof is a function that accepts an arbitrary `n` and returns a proof specialized to that `n`.

### Function Syntax — definitions, lambdas, arrows, dependent arrows

Functions are central both to programming and proof. In Lean, implication `P → Q` is also a function type from a proof of `P` to a proof of `Q`.

| Syntax                      | Meaning                 | Example                        |
| --------------------------- | ----------------------- | ------------------------------ |
| `α → β`                     | Function type           | `Nat → Nat`                    |
| `fun x => body`             | Lambda abstraction      | `fun n => n + 1`               |
| `def f (x : α) : β := body` | Named function          | `def succ' (n : Nat) := n + 1` |
| `∀ x : α, β x`              | Dependent function type | `∀ n : Nat, n = n`             |
| `(x : α) → β x`             | Dependent function type | `(n : Nat) → n = n`            |
| `f x`                       | Function application    | `Nat.succ 3`                   |

Examples:

```lean
def addOne (n : Nat) : Nat :=
  n + 1
```

```lean
def applyTwice {α : Type} (f : α → α) (x : α) : α :=
  f (f x)
```

```lean
theorem implication_trans (P Q R : Prop) : (P → Q) → (Q → R) → P → R := by
  intro hpq hqr hp
  exact hqr (hpq hp)
```

**Design meaning:** function application is left-associative, and arrows are right-associative. Thus:

```lean
P → Q → R
```

means:

```lean
P → (Q → R)
```

That is, a function taking a proof of `P`, then a proof of `Q`, then producing a proof of `R`.

**Common pitfalls:**

| Pitfall                           | Explanation                                     | Better habit                           |
| --------------------------------- | ----------------------------------------------- | -------------------------------------- |
| Misreading curried arguments      | `P → Q → R` is nested implication/function type | Read arrows as right-associative       |
| Expecting tuple arguments         | Lean often uses curried arguments               | Apply functions one argument at a time |
| Forgetting dependent result types | Later types may mention earlier values          | Read binders left to right             |

### Local Definitions and Intermediate Facts — `let`, `have`, `suffices`

Lean supports local computation and local proof structure.

| Construct               | Layer        | Meaning                                  | Example use                             |
| ----------------------- | ------------ | ---------------------------------------- | --------------------------------------- |
| `let x := t`            | Term/program | Introduce local definition               | Avoid recomputing or clarify expression |
| `have h : P := proof`   | Proof/term   | Add intermediate fact                    | Create helper proposition in context    |
| `suffices h : P by ...` | Proof        | Change goal by proving a sufficient fact | Structure backward reasoning            |
| `show T from t`         | Term/proof   | State expected type explicitly           | Clarify what is being constructed       |

Examples:

```lean
def localExample (n : Nat) : Nat :=
  let m := n + 1
  m + m
```

```lean
example (P Q R : Prop) (hpq : P → Q) (hqr : Q → R) (hp : P) : R := by
  have hq : Q := hpq hp
  exact hqr hq
```

```lean
example (P Q : Prop) (h : P ∧ Q) : Q ∧ P := by
  suffices hq : Q by
    exact And.intro hq h.left
  exact h.right
```

**Professional use:** `have` and `suffices` are not merely syntactic conveniences. They are proof-architecture tools. They give names to intermediate facts, expose mathematical structure, and make proof scripts reviewable.

**Common pitfall:** overusing unnamed or deeply nested terms when a named `have` would reveal the proof idea. Lean may accept compact proof terms that human readers cannot maintain.

### Holes and Placeholders — `_`, `?_`, `sorry`, proof development

Lean provides mechanisms for incomplete or inferred terms.

| Placeholder             | Meaning                                      | Use                                | Risk                                  |
| ----------------------- | -------------------------------------------- | ---------------------------------- | ------------------------------------- |
| `_`                     | Ask elaborator to infer term                 | Omitted type or argument           | Fails if insufficient information     |
| `?_` / named goals      | Create synthetic hole/metavariable           | Interactive development            | Should not remain in finished code    |
| `by?`-style suggestions | Tooling-driven proof search, where available | Discover candidate proofs          | Suggestions may be opaque             |
| `sorry`                 | Admit a term/proof placeholder               | Temporary development or exercises | Unsound if treated as completed proof |
| `by sorry`              | Placeholder proof                            | Marks theorem as assumed           | Should be eliminated in verified code |

Examples:

```lean
def inferredType := 3
```

```lean
example (P : Prop) (h : P) : P := by
  exact h
```

During development one might temporarily write:

```lean
example (P : Prop) (h : P) : P := by
  sorry
```

But `sorry` means Lean accepts a placeholder. It is appropriate in exercises, sketches, and unfinished formalization, but not in completed verified artifacts.

In Tao’s Analysis companion, many `sorry` positions function as proof gaps or exercises. That is pedagogically useful because it exposes the theorem statements and intended proof locations. It is not the same as a completed formal proof.

**Common pitfalls:**

| Pitfall                                          | Why it matters                                   | Better habit                                   |
| ------------------------------------------------ | ------------------------------------------------ | ---------------------------------------------- |
| Forgetting remaining `sorry`                     | The file type-checks but contains admitted facts | Treat `sorry` as unfinished proof debt         |
| Using `_` without understanding inferred content | Code becomes fragile or mysterious               | Inspect types with `#check` and expected goals |
| Accepting generated proof suggestions blindly    | Proof may be brittle or unreadable               | Use suggestions as search aids, then refactor  |

### Basic Data Literals and Core Types — numbers, strings, booleans, units

Lean has ordinary programming literals and types, but their meaning is still type-directed.

| Literal or type | Meaning                     | Example                         | Caveat                                                       |
| --------------- | --------------------------- | ------------------------------- | ------------------------------------------------------------ |
| `Nat`           | Natural numbers             | `0`, `1`, `2`                   | Numeric literals are overloaded through typeclass mechanisms |
| `Int`           | Integers                    | `-3`, `42`                      | Coercions between `Nat` and `Int` require care               |
| `String`        | Text strings                | `"hello"`                       | Programming-oriented, not mathematical strings               |
| `Char`          | Character                   | `'a'`                           | Distinct from one-character strings                          |
| `Bool`          | Computable Boolean          | `true`, `false`                 | Not the same as `Prop`                                       |
| `Unit`          | Trivial type with one value | `()`                            | Used when no meaningful value is returned                    |
| `Option α`      | Optional value              | `some x`, `none`                | Programming absence, not existential proposition             |
| `Except ε α`    | Error or success value      | `Except.ok x`, `Except.error e` | Recoverable error modeling                                   |

Examples:

```lean
#check 3
#check (3 : Nat)
#check (3 : Int)
#check true
#check ("Lean" : String)
```

A numeric literal such as `3` is elaborated according to expected type. If no expected type exists, Lean may choose a default.

**Bool vs Prop:**

```lean
#check true
#check True
#check false
#check False
```

`true : Bool` is executable data. `True : Prop` is a proposition. `False : Prop` is the empty proposition. Confusing these is a common source of errors.

**Common pitfall:** assuming a Boolean condition and a proposition are interchangeable. They are connected by decidability and coercion-like conventions in some contexts, but they are not the same concept.

### Equality and Identity — `=`, `rfl`, propositional equality, definitional equality

Equality is one of Lean’s most important primitives. But Lean has two different equality-related ideas that must be separated.

| Concept                | Meaning                                      | Solved by                             | Example                                               |
| ---------------------- | -------------------------------------------- | ------------------------------------- | ----------------------------------------------------- |
| Definitional equality  | Two terms reduce to the same core expression | `rfl`, computation, reduction         | `0 + n = n` for primitive recursive addition on `Nat` |
| Propositional equality | A proposition asserting two terms are equal  | theorem, hypothesis, `rw`, `Eq.trans` | `n + 0 = n` proved by induction or library theorem    |

Example:

```lean
example (n : Nat) : 0 + n = n := by
  rfl
```

Depending on how `Nat.add` computes, `0 + n` reduces directly to `n`.

But:

```lean
example (n : Nat) : n + 0 = n := by
  exact Nat.add_zero n
```

Here the equality is not solved merely by reducing the left side in the same direct way; it uses a theorem.

**Rewriting with equality:**

```lean
example (a b : Nat) (h : a = b) : a + 1 = b + 1 := by
  rw [h]
```

`rw [h]` replaces occurrences of `a` with `b` according to the equality proof `h`.

**Symmetry and transitivity:**

```lean
example (a b : Nat) (h : a = b) : b = a := by
  exact h.symm
```

```lean
example (a b c : Nat) (h₁ : a = b) (h₂ : b = c) : a = c := by
  exact h₁.trans h₂
```

**Failure-first explanation:** the tempting mental model is that equality means “these two things are obviously the same.” Lean distinguishes what computes to the same expression from what requires a proof. The professional rule is: try `rfl` when the equality should hold by computation; use `rw`, `simp`, or a theorem when equality requires propositional reasoning.

**Common pitfalls:**

| Pitfall                                | Explanation                                                                     | Better habit                                  |
| -------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------- |
| Using `rfl` for theorem-based equality | `rfl` only works for definitional equality                                      | Use `rw`, `simp`, or known theorem            |
| Rewriting in the wrong direction       | May make the goal less canonical                                                | Use `rw [← h]` deliberately                   |
| Treating equality as untyped           | Equality relates terms of compatible types                                      | Inspect types before rewriting                |
| Confusing equality with equivalence    | `=` differs from `↔`, set extensionality, equivalence relations, or isomorphism | Use the relation appropriate to the structure |
### Logical Connectives — implication, conjunction, disjunction, negation, equivalence

Lean’s logical syntax is not merely notation layered on top of Boolean expressions. Logical propositions live in `Prop`, and proofs of those propositions are terms.

| Construct                | Meaning                                                    | Syntax         | Canonical proof pattern               | Common tactic                     |
| ------------------------ | ---------------------------------------------------------- | -------------- | ------------------------------------- | --------------------------------- |
| Implication              | Function from proof of one proposition to proof of another | `P → Q`        | Assume `P`, prove `Q`                 | `intro`, `exact`, `apply`         |
| Universal quantification | Dependent function over arbitrary value                    | `∀ x : α, P x` | Introduce arbitrary `x`               | `intro`                           |
| Conjunction              | Both propositions hold                                     | `P ∧ Q`        | Prove both sides                      | `constructor`, `.left`, `.right`  |
| Disjunction              | At least one proposition holds                             | `P ∨ Q`        | Prove left or right; or split cases   | `left`, `right`, `cases`          |
| Negation                 | `P → False`                                                | `¬ P`          | Assume `P`, derive contradiction      | `intro`, `exact`, `contradiction` |
| Equivalence              | Both implications                                          | `P ↔ Q`        | Prove forward and backward directions | `constructor`                     |
| Existential              | Some witness exists                                        | `∃ x, P x`     | Provide witness and proof             | `use`, `constructor`              |

**Implication:**

```lean
example (P Q : Prop) (hP : P) (hPQ : P → Q) : Q := by
  exact hPQ hP
```

**Conjunction:**

```lean
example (P Q : Prop) : P ∧ Q → Q ∧ P := by
  intro h
  constructor
  · exact h.right
  · exact h.left
```

**Disjunction:**

```lean
example (P Q : Prop) : P → P ∨ Q := by
  intro hP
  left
  exact hP
```

```lean
example (P Q : Prop) : P ∨ Q → Q ∨ P := by
  intro h
  cases h with
  | inl hP =>
      right
      exact hP
  | inr hQ =>
      left
      exact hQ
```

**Negation:**

```lean
example (P : Prop) : P → ¬¬P := by
  intro hP
  intro hNotP
  exact hNotP hP
```

Here `¬¬P` means `¬ P → False`, and `¬ P` means `P → False`.

**Equivalence:**

```lean
example (P Q : Prop) : P ∧ Q ↔ Q ∧ P := by
  constructor
  · intro h
    exact And.intro h.right h.left
  · intro h
    exact And.intro h.right h.left
```

**Existential:**

```lean
example : ∃ n : Nat, n = 0 := by
  use 0
```

**Language-design note:** logical connectives are types with constructors and eliminators. Tactics such as `constructor`, `left`, `right`, and `cases` are not arbitrary proof commands; they correspond to introduction and elimination rules for those logical types.

**Common pitfalls:**

| Pitfall                                               | Explanation                                                                                              | Better habit                                         |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Treating `P ∨ Q` like a Boolean branch                | A proof of `P ∨ Q` must be eliminated by cases                                                           | Use `cases h with`                                   |
| Trying to prove `P ∧ Q` in one step without structure | A conjunction requires both components                                                                   | Use `constructor` or `And.intro`                     |
| Confusing `¬P` with a Boolean false test              | `¬P` is `P → False`, not `P = false`                                                                     | Read negation as a function to contradiction         |
| Using classical reasoning silently                    | Some principles, such as excluded middle or double-negation elimination, are not constructive by default | Introduce classical reasoning explicitly when needed |

### Classical Reasoning Boundary — constructive core, `by_contra`, excluded middle

Lean’s logic supports constructive reasoning by default, but classical principles are available. This distinction matters because some propositions cannot be proved constructively without additional assumptions.

| Pattern           |                            Constructive? | Lean mechanism                    | Typical use                         |
| ----------------- | ---------------------------------------: | --------------------------------- | ----------------------------------- |
| `P → ¬¬P`         |                                      Yes | Direct function proof             | Basic logic                         |
| `¬¬P → P`         |                     Classical in general | `by_contra`, `Classical`          | Proof by contradiction              |
| `P ∨ ¬P`          |                     Classical in general | `Classical.em P`                  | Case split on arbitrary proposition |
| Choice principles | Classical/noncomputable in relevant uses | `open Classical`, `noncomputable` | Existence-to-choice reasoning       |

Example of constructive double-negation introduction:

```lean
example (P : Prop) : P → ¬¬P := by
  intro hP
  intro hNotP
  exact hNotP hP
```

Example of classical reasoning:

```lean
example (P : Prop) : ¬¬P → P := by
  classical
  intro h
  by_contra hP
  exact h hP
```

The line `classical` makes classical reasoning available locally.

**Language-design note:** Lean can reason classically, but classical reasoning should be visible. The distinction is especially important when propositions interact with computation. A proof using classical choice or nonconstructive principles may be valid as mathematics but not computationally informative in the same way as a constructive proof.

**Common pitfalls:**

| Pitfall                                                       | Explanation                                                                    | Better habit                                                     |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Assuming every classical theorem is constructively available  | Lean may require `classical` or a decidability assumption                      | Identify whether the proof uses excluded middle or contradiction |
| Adding `classical` globally                                   | It hides logical assumptions and may affect readability                        | Use `classical` locally                                          |
| Confusing `Bool` case analysis with proposition case analysis | `Bool` is data; arbitrary `P : Prop` needs decidability or classical reasoning | Distinguish computation from logic                               |

### Pattern Matching and Case Analysis — data shape, proof branches, local refinement

Pattern matching is a programming construct and a proof construct. In programming, it branches by the shape of data. In proofs, it can refine the local context and split goals.

| Construct              | Meaning                               | Example use                                                     |                    |                |
| ---------------------- | ------------------------------------- | --------------------------------------------------------------- | ------------------ | -------------- |
| `match x with ...`     | Branch on value structure             | Define functions over inductive data                            |                    |                |
| `cases h with ...`     | Split proof or data into constructors | Eliminate disjunction, conjunction, existential, inductive data |                    |                |
| `induction n with ...` | Prove by induction                    | Natural numbers, lists, custom inductive types                  |                    |                |
| Constructor pattern    | Name fields of constructor            | `                                                               | zero => ...`, `    | succ n => ...` |
| Wildcard pattern       | Ignore value                          | `_`                                                             | Avoid unused names |                |

Example over `Nat`:

```lean
def isZero : Nat → Bool
  | 0 => true
  | _ + 1 => false
```

Equivalent style:

```lean
def isZero' (n : Nat) : Bool :=
  match n with
  | 0 => true
  | Nat.succ _ => false
```

Case analysis in proofs:

```lean
example (P Q : Prop) : P ∨ Q → Q ∨ P := by
  intro h
  cases h with
  | inl hP =>
      right
      exact hP
  | inr hQ =>
      left
      exact hQ
```

Case analysis over natural numbers:

```lean
example (n : Nat) : n = 0 ∨ ∃ m, n = m + 1 := by
  cases n with
  | zero =>
      left
      rfl
  | succ m =>
      right
      use m
```

**Design meaning:** inductive types define their own ways of being deconstructed. `cases` follows the constructors of the type. `induction` follows the induction principle generated by the inductive declaration.

**Failure-first explanation:** the wrong model is that `cases` merely creates branches like an `if`. The correct model is that `cases` eliminates a value or proof according to its constructors and may rewrite or refine dependent information in the goal.

**Common pitfalls:**

| Pitfall                                          | Explanation                                         | Better habit                                    |
| ------------------------------------------------ | --------------------------------------------------- | ----------------------------------------------- |
| Using `cases` when induction is needed           | Case split gives no induction hypothesis            | Use `induction` for recursive claims            |
| Losing useful equalities during pattern matching | Dependent information may need careful preservation | Use named equations or inspect resulting goals  |
| Pattern matching too early                       | It may destroy a useful general form                | Delay case splits until the structure is needed |

### Induction Syntax Basics — generated principles, base case, step case

Induction is central to Lean because many objects are inductive: natural numbers, lists, syntax trees, proof derivations, and user-defined data.

Basic induction over natural numbers:

```lean
example (n : Nat) : n + 0 = n := by
  induction n with
  | zero =>
      rfl
  | succ n ih =>
      simp [ih]
```

This proof has two cases.

| Case        | Local context               | Goal shape                    | Meaning   |
| ----------- | --------------------------- | ----------------------------- | --------- |
| `zero`      | No predecessor              | `0 + 0 = 0`                   | Base case |
| `succ n ih` | `n : Nat`, `ih : n + 0 = n` | `Nat.succ n + 0 = Nat.succ n` | Step case |

Induction over lists:

```lean
example {α : Type} (xs : List α) : xs ++ [] = xs := by
  induction xs with
  | nil =>
      rfl
  | cons x xs ih =>
      simp [ih]
```

**Language-design note:** Lean does not have a single magic induction rule. Each inductive type generates eliminators and induction principles. Tactics expose these principles conveniently, but the underlying structure is determined by the type definition.

**Common pitfalls:**

| Pitfall                                                    | Why it fails                                                     | Better habit                                      |
| ---------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------- |
| Inducting after introducing too many variables             | The induction hypothesis may be too weak                         | Generalize variables before induction when needed |
| Expecting induction to solve recursive goals automatically | The step case still requires rewriting or simplification         | Use `simp [ih]`, `rw [ih]`, or helper lemmas      |
| Confusing definitional computation with induction          | Some recursive equalities reduce by `rfl`; others need induction | Test whether `rfl` applies before building proof  |

### Conditionals and Decidable Propositions — `if`, `then`, `else`, propositions vs booleans

Lean has ordinary conditional expressions, but conditions may involve decidable propositions, not only `Bool`.

| Conditional form         | Meaning                                | Example                          |             |               |
| ------------------------ | -------------------------------------- | -------------------------------- | ----------- | ------------- |
| `if b then x else y`     | Branch on decidable condition          | `if n = 0 then 1 else 2`         |             |               |
| `if h : P then x else y` | Branch while naming proof of condition | `if h : n = 0 then ... else ...` |             |               |
| `match b with`           | Pattern match on Boolean or data       | `match b with                    | true => ... | false => ...` |

Example with `Bool`:

```lean
def boolToNat (b : Bool) : Nat :=
  if b then 1 else 0
```

Example with a decidable proposition:

```lean
def zeroTest (n : Nat) : Nat :=
  if n = 0 then 1 else 2
```

Example naming the proof:

```lean
def zeroTestNamed (n : Nat) : Nat :=
  if h : n = 0 then
    1
  else
    2
```

Inside the `then` branch, `h : n = 0` is available. Inside the `else` branch, Lean has a proof of `¬ n = 0`.

**Design meaning:** conditionals over propositions require decidability. For many concrete types, such as `Nat`, equality is decidable. For arbitrary propositions, Lean may need a `Decidable P` instance or classical reasoning.

**Common pitfalls:**

| Pitfall                                                   | Explanation                                            | Better habit                                              |
| --------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------- |
| Assuming arbitrary `P : Prop` can be used computationally | Lean needs decidability                                | Add `[Decidable P]` or use `classical` when appropriate   |
| Confusing `if b` with proof of `b = true`                 | Boolean branching and propositional proof are distinct | Use lemmas connecting Booleans and propositions           |
| Ignoring branch hypotheses                                | Named conditionals provide useful local facts          | Use `if h : P then ... else ...` when branch facts matter |

### Let Bindings and Local Computation — names inside expressions

`let` introduces local definitions inside terms. It is useful for readability, avoiding repetition, and shaping computation.

```lean
def squareSum (x y : Nat) : Nat :=
  let sx := x * x
  let sy := y * y
  sx + sy
```

A `let` binding can appear in executable definitions and proof terms.

```lean
example (n : Nat) : (let m := n; m = n) := by
  rfl
```

**Syntax reference:**

| Form                   | Meaning                                 |
| ---------------------- | --------------------------------------- |
| `let x := t; body`     | Define `x` locally and use it in `body` |
| `let x : α := t; body` | Same with explicit type                 |
| Nested `let`           | Sequential local definitions            |
| Pattern `let`          | Deconstruct data where supported        |

**Language-design note:** `let` definitions are usually transparent to computation. They help structure terms but do not introduce global declarations.

**Common pitfalls:**

| Pitfall                                    | Explanation                                                                  | Better habit                |
| ------------------------------------------ | ---------------------------------------------------------------------------- | --------------------------- |
| Using global `def` for one-use local names | Pollutes namespace                                                           | Use `let` or local `have`   |
| Hiding important proof facts inside `let`  | Local computation names do not communicate propositions as clearly as `have` | Use `have` for proof facts  |
| Assuming `let` creates mutable variables   | Lean’s default model is functional binding, not imperative reassignment      | Treat `let` as name binding |

### Assignment, Mutation, and State — functional default, mutable local variables, references in effects

Lean’s core style is functional. A name introduced by `let`, a binder, or a theorem parameter is not reassigned in the ordinary imperative sense.

However, Lean does support programming conveniences and effectful state in appropriate contexts. It is important to distinguish **functional rebinding**, **local mutable syntax**, and **effectful references**.

| Mechanism             | Layer                   | Meaning                                | Typical use                           |
| --------------------- | ----------------------- | -------------------------------------- | ------------------------------------- |
| `let x := ...`        | Pure term               | Local immutable binding                | Ordinary definitions                  |
| Shadowing             | Pure term               | New name hides old name                | Controlled local transformation       |
| `let mut x := ...`    | Do-notation/programming | Mutable local variable syntax          | Algorithmic Lean code                 |
| `IO.Ref` / references | Effectful programming   | Mutable reference in `IO`              | Stateful programs                     |
| State monads          | Pure/effect modeling    | Thread state explicitly or monadically | Verified or structured stateful logic |

Example of shadowing:

```lean
def shadowExample : Nat :=
  let x := 1
  let x := x + 1
  x
```

This does not mutate the first `x`; it introduces a new local binding that shadows the previous one.

Example with mutable local syntax:

```lean
def sumUpTo (n : Nat) : Nat := Id.run do
  let mut acc := 0
  for i in [0:n+1] do
    acc := acc + i
  return acc
```

This is programming syntax elaborated into monadic or imperative-style code. It should not be confused with the logical model of theorem proving.

**Design meaning:** Lean supports convenient programming, but proof-relevant definitions are usually easier to reason about when written functionally or recursively. Imperative-looking code can be useful for executable algorithms, but it may not produce the best theorem statements or induction principles.

**Common pitfalls:**

| Pitfall                                           | Explanation                                    | Better habit                                            |
| ------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------- |
| Expecting ordinary variables to be assignable     | Most Lean bindings are immutable               | Use functional definitions or appropriate monadic state |
| Using imperative code when proof is the main goal | It may complicate reasoning                    | Prefer recursive or structurally clear definitions      |
| Confusing shadowing with mutation                 | Shadowing introduces a new binding             | Read scopes carefully                                   |
| Treating programming convenience as proof style   | `do` code may execute well but prove awkwardly | Separate executable convenience from proof usability    |

### Sequences, `do` Notation, and Monadic Syntax — effectful-looking code

Lean supports `do` notation for monadic code. This is central for `IO`, metaprogramming, parser code, tactic code, and some algorithmic definitions.

| Syntax                     | Meaning                         | Example                        |
| -------------------------- | ------------------------------- | ------------------------------ |
| `do ...`                   | Monadic block                   | `def main : IO Unit := do ...` |
| `let x := t`               | Pure local binding in block     | `let n := 3`                   |
| `let x ← action`           | Bind result of monadic action   | `let line ← IO.getLine`        |
| `return x`                 | Return value in monad           | `return n + 1`                 |
| `for x in xs do ...`       | Monadic iteration               | Iterate in effectful context   |
| `if ... then ... else ...` | Conditional expression in block | Branching                      |

Example:

```lean
def greet : IO Unit := do
  IO.println "What is your name?"
  let name ← IO.getLine
  IO.println s!"Hello, {name}"
```

This code belongs to Lean as a programming language, not to pure theorem proving. The `←` operator is not ordinary assignment. It extracts the result of a monadic action inside a monadic context.

**Language-design note:** monadic syntax separates effects from pure definitions. This is important because proofs and pure computation remain logically controlled, while `IO` programs interact with the outside world.

**Common pitfalls:**

| Pitfall                               | Explanation                                             | Better habit                                                  |
| ------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------- |
| Using `←` outside monadic context     | It requires a `do` block and suitable monad             | Check the expected monad                                      |
| Thinking `return` exits like C/Python | It constructs a monadic value                           | Read `return` as wrapping a result                            |
| Mixing proof goals and `IO` intuition | Proof construction is not arbitrary runtime interaction | Keep proof terms and effectful programs conceptually separate |

### Collections at the Syntax Level — lists, arrays, tuples, products, subtypes

Detailed data modeling belongs to PART 3, but core collection syntax is necessary for reading code.

| Construct                 | Type shape       | Syntax           | Example                                |
| ------------------------- | ---------------- | ---------------- | -------------------------------------- |
| List                      | `List α`         | `[a, b, c]`      | `[1, 2, 3]`                            |
| Array                     | `Array α`        | `#[a, b, c]`     | `#[1, 2, 3]`                           |
| Pair/product              | `α × β`          | `(a, b)`         | `(1, true)`                            |
| Unit                      | `Unit`           | `()`             | `()`                                   |
| Option                    | `Option α`       | `some x`, `none` | `some 3`                               |
| Sigma-like dependent pair | dependent pair   | advanced syntax  | Used when second type depends on first |
| Subtype                   | `{x : α // P x}` | `⟨x, proof⟩`     | Value plus proof of property           |

Examples:

```lean
#check [1, 2, 3]
#check #[1, 2, 3]
#check (1, true)
#check (some 3)
#check (none : Option Nat)
```

Subtype example:

```lean
def positiveOne : {n : Nat // n > 0} :=
  ⟨1, by decide⟩
```

The subtype contains both a value and a proof that the value satisfies the predicate.

**Design meaning:** Lean data can carry proof obligations. A subtype is not just a runtime wrapper; it is a value paired with evidence of a property.

**Common pitfalls:**

| Pitfall                                      | Explanation                                   | Better habit                                    |
| -------------------------------------------- | --------------------------------------------- | ----------------------------------------------- |
| Treating arrays and lists as interchangeable | They have different APIs and cost profiles    | Choose by task and proof needs                  |
| Ignoring proof fields in subtypes            | Constructing subtype values requires evidence | Provide proof explicitly or use existing lemmas |
| Using subtypes too early                     | They can complicate definitions and rewriting | Use them when invariants are worth carrying     |

### Strings, Interpolation, and Output Syntax — programming layer basics

Lean supports string literals and interpolation for executable code.

| Construct           | Meaning                         | Example               |
| ------------------- | ------------------------------- | --------------------- |
| String literal      | Text value                      | `"hello"`             |
| Interpolated string | String with embedded expression | `s!"n = {n}"`         |
| Print line          | Output in `IO`                  | `IO.println "hello"`  |
| `ToString`          | Typeclass for string conversion | Used by interpolation |

Example:

```lean
def showNat (n : Nat) : String :=
  s!"n = {n}"
```

```lean
def main : IO Unit := do
  IO.println (showNat 5)
```

**Language-design note:** string interpolation depends on typeclass-supported conversion to strings. This mirrors Lean’s broader pattern: convenient syntax often depends on inferred structure.

**Common pitfalls:**

| Pitfall                                              | Explanation                                        | Better habit                                        |
| ---------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------- |
| Expecting every type to print automatically          | Interpolation needs a suitable `ToString` instance | Define or derive string conversion when appropriate |
| Confusing printed representation with proof equality | Output is not a proof                              | Use theorems, not strings, for formal claims        |

### Attributes and Local Configuration — `@[simp]`, `@[ext]`, options, reducibility

Attributes modify how declarations interact with automation, elaboration, search, or generated infrastructure. They are a central part of Lean source syntax.

| Attribute or command | Meaning                                 | Example                            | Main risk                                    |
| -------------------- | --------------------------------------- | ---------------------------------- | -------------------------------------------- |
| `@[simp]`            | Register theorem as simplification rule | `@[simp] theorem ...`              | Bad simp rules destabilize proofs            |
| `@[ext]`             | Register extensionality theorem         | Often for structures or sets       | Misapplied extensionality can confuse search |
| `@[aesop]`           | Add rule to `aesop` search              | Automation support                 | Search blowup or opacity                     |
| `deriving`           | Generate instances                      | `deriving Repr, DecidableEq`       | Generated behavior may need inspection       |
| `set_option`         | Change Lean option                      | `set_option maxHeartbeats 0`       | Can hide performance problems                |
| `local attribute`    | Attribute limited to scope              | `local attribute [simp] lemmaName` | Scope must be understood                     |

Example:

```lean
@[simp]
theorem zero_add_custom (n : Nat) : 0 + n = n := by
  rfl
```

After a theorem is marked `@[simp]`, the simplifier may use it automatically.

Local attribute:

```lean
section
  local attribute [simp] Nat.add_comm

  example (n m : Nat) : n + m = m + n := by
    simp
end
```

This kind of example is artificial; globally marking commutativity as a simp rule is usually dangerous because it can create loops or nontermination-like simplification behavior. The example illustrates the mechanism, not a recommended style.

**Common pitfalls:**

| Pitfall                                         | Explanation                                | Better habit                                 |
| ----------------------------------------------- | ------------------------------------------ | -------------------------------------------- |
| Marking symmetric or expanding lemmas as `simp` | Can cause loops or expression blowup       | Simp toward canonical, smaller forms         |
| Using `set_option maxHeartbeats 0` as a fix     | It masks performance issues                | Diagnose slow elaboration or automation      |
| Forgetting attribute scope                      | Local behavior may not reproduce elsewhere | Keep attribute use near proof or document it |

### Tactic Block Syntax — `by`, indentation, bullets, case labels

A tactic proof begins with `by`. Inside the block, tactics transform goals until no goals remain.

| Syntax                  | Meaning                                         | Example                         |
| ----------------------- | ----------------------------------------------- | ------------------------------- |
| `by`                    | Start tactic proof                              | `:= by rfl`                     |
| Newline tactic sequence | Apply tactics in order                          | `intro h; exact h` or multiline |
| `·` bullet              | Focus one generated goal                        | After `constructor`             |
| `case name =>`          | Handle named case                               | After `induction` or `cases`    |
| `all_goals`             | Apply tactic to all goals                       | `all_goals simp`                |
| `focus`                 | Focus on current goal                           | Less common                     |
| `<;>`                   | Apply tactic then tactic to all resulting goals | `constructor <;> simp`          |

Basic proof:

```lean
example (P : Prop) : P → P := by
  intro h
  exact h
```

Multiple goals with bullets:

```lean
example (P Q : Prop) : P ∧ Q → Q ∧ P := by
  intro h
  constructor
  · exact h.right
  · exact h.left
```

Case labels:

```lean
example (n : Nat) : n + 0 = n := by
  induction n with
  | zero =>
      rfl
  | succ n ih =>
      simp [ih]
```

Tactic sequencing:

```lean
example (P Q : Prop) (h : P ∧ Q) : Q ∧ P := by
  constructor <;> simp [h]
```

This compact proof is accepted if simplification can extract the needed facts, but it may be less educational than the explicit version.

**Professional rule:** compact tactic syntax is acceptable when it preserves the proof’s structure. It is harmful when it hides the proof’s mathematical content or makes future failures harder to diagnose.

**Common pitfalls:**

| Pitfall                                        | Explanation                                | Better habit                              |
| ---------------------------------------------- | ------------------------------------------ | ----------------------------------------- |
| Losing track of goals after `constructor`      | Multiple goals require separate handling   | Use bullets or case labels                |
| Overusing `<;>`                                | It can obscure which subgoal is solved how | Use explicit blocks for nontrivial proofs |
| Writing tactic scripts as trial-and-error logs | Accepted scripts may still be unreadable   | Refactor after the proof works            |

### Basic Tactics as Syntax-Level Reading Tools — not full proof engineering yet

Detailed tactic strategy belongs to PART 4. Here the goal is to recognize the basic shape of tactic scripts.

| Tactic           | Surface meaning                           | Typical goal shape                             | Example                |
| ---------------- | ----------------------------------------- | ---------------------------------------------- | ---------------------- |
| `intro`          | Introduce variable/hypothesis             | `P → Q`, `∀ x, P x`                            | `intro h`              |
| `exact`          | Provide term that solves goal             | Any goal matching term type                    | `exact h`              |
| `apply`          | Use theorem whose conclusion matches goal | Goal matches conclusion of implication/theorem | `apply h`              |
| `constructor`    | Split constructor goal                    | `P ∧ Q`, `P ↔ Q`, structure goals              | `constructor`          |
| `left` / `right` | Choose disjunction side                   | `P ∨ Q`                                        | `left`                 |
| `cases`          | Eliminate inductive value/proof           | Disjunction, existential, data                 | `cases h with ...`     |
| `induction`      | Prove by induction                        | Recursive property                             | `induction n with ...` |
| `rw`             | Rewrite using equality                    | Goal/hypothesis contains matching expression   | `rw [h]`               |
| `simp`           | Simplify using simp rules                 | Routine normalized goal                        | `simp`                 |
| `rfl`            | Reflexivity by definitional equality      | Both sides reduce to same term                 | `rfl`                  |
| `have`           | Add intermediate proof                    | Any proof construction                         | `have hq : Q := ...`   |
| `show`           | Change/display target type                | Expected type clarification                    | `show P from h`        |

Example using several basic tactics:

```lean
example (P Q R : Prop) (h₁ : P → Q) (h₂ : Q → R) : P → R := by
  intro hP
  have hQ : Q := h₁ hP
  exact h₂ hQ
```

**Reading rule:** each tactic should be read as a transformation of the current goal state. A proof script is understandable when a reader can mentally reconstruct why each tactic changes the goal in that way.

**Common pitfalls:**

| Pitfall                                      | Explanation                                | Better habit                             |
| -------------------------------------------- | ------------------------------------------ | ---------------------------------------- |
| Memorizing tactics by name only              | Tactic names do not reveal when they apply | Learn the goal shape each tactic expects |
| Trying `simp` first for every proof          | It may work without teaching the structure | Use `simp` intentionally                 |
| Using `apply` without checking theorem shape | It may generate unexpected subgoals        | Inspect theorem types with `#check`      |

### Rewrite Syntax — goals, hypotheses, direction, local simplification

Rewriting syntax appears constantly in Lean. It deserves a precise surface reference.

| Form            | Meaning                                      |
| --------------- | -------------------------------------------- |
| `rw [h]`        | Rewrite goal using `h`                       |
| `rw [← h]`      | Rewrite goal using `h` in reverse            |
| `rw [h] at h₂`  | Rewrite hypothesis `h₂`                      |
| `rw [h] at *`   | Rewrite everywhere possible                  |
| `simp [h]`      | Simplify using `h` in addition to simp set   |
| `simp at h`     | Simplify hypothesis                          |
| `simp at *`     | Simplify all hypotheses and goal             |
| `simpa using h` | Simplify target and theorem `h`, then use it |

Examples:

```lean
example (a b : Nat) (h : a = b) : a + 1 = b + 1 := by
  rw [h]
```

```lean
example (a b : Nat) (h : b = a) : a + 1 = b + 1 := by
  rw [← h]
```

```lean
example (a b c : Nat) (h : a = b) (h₂ : a + c = 0) : b + c = 0 := by
  rw [h] at h₂
  exact h₂
```

Using `simpa`:

```lean
example (n : Nat) (h : n = 0) : n + 0 = 0 := by
  simpa [h]
```

**Design meaning:** rewriting is proof-directed substitution using equality. Simplification is normalization under a configured set of rewrite rules. They overlap but are not identical.

**Common pitfalls:**

| Pitfall                                        | Explanation                                         | Better habit                              |
| ---------------------------------------------- | --------------------------------------------------- | ----------------------------------------- |
| Rewriting everywhere with `at *`               | It can destroy useful hypotheses                    | Rewrite only where needed                 |
| Using `simp` to hide important transformations | Reader cannot see the mathematical step             | Use `rw` or `calc` for central equalities |
| Forgetting reverse rewrite syntax              | Some theorem statements face the opposite direction | Use `rw [← theorem]`                      |

### Calculation Blocks — `calc`, chained equality and order reasoning

`calc` supports structured equational or relational reasoning.

```lean
example (a b c : Nat) (h₁ : a = b) (h₂ : b = c) : a = c := by
  calc
    a = b := h₁
    _ = c := h₂
```

A more arithmetic-style example:

```lean
example (a b : Nat) : a + b = b + a := by
  exact Nat.add_comm a b
```

With `calc`:

```lean
example (a b c : Nat) : (a + b) + c = a + (b + c) := by
  calc
    (a + b) + c = a + b + c := rfl
    _ = a + (b + c) := Nat.add_assoc a b c
```

The placeholder `_` means “the previous expression.” `calc` is especially useful when a proof is mathematically a chain of transformations.

**Common pitfalls:**

| Pitfall                             | Explanation                                | Better habit                                 |
| ----------------------------------- | ------------------------------------------ | -------------------------------------------- |
| Using `calc` for routine simp goals | It becomes verbose                         | Use `simp` for routine normalization         |
| Using `simp` for central chains     | It hides the proof idea                    | Use `calc` when the chain is the explanation |
| Misaligning relation types          | Each line must connect by a known relation | Check expected relation at each step         |

### Type Ascription and Expected Types — `:`, annotation, elaboration guidance

Type annotations guide elaboration.

| Syntax                | Meaning                            | Example              |
| --------------------- | ---------------------------------- | -------------------- |
| `(t : α)`             | Ascribe type `α` to term `t`       | `(3 : Nat)`          |
| `def f : α := t`      | Give declaration result type       | `def n : Nat := 3`   |
| `(x : α)`             | Binder annotation                  | `(n : Nat)`          |
| `show α from t`       | Explicit target type in proof/term | `show P from h`      |
| `have h : P := proof` | Explicit intermediate proposition  | `have hQ : Q := ...` |

Examples:

```lean
#check (3 : Nat)
#check (3 : Int)
```

```lean
example (P : Prop) (h : P) : P := by
  show P
  exact h
```

Type ascription can disambiguate overloaded literals and notation.

```lean
def threeNat : Nat := 3
def threeInt : Int := 3
```

**Language-design note:** Lean uses expected types aggressively. Giving the right annotation can solve elaboration problems without changing the mathematical content.

**Common pitfalls:**

| Pitfall                                       | Explanation                                       | Better habit                                  |
| --------------------------------------------- | ------------------------------------------------- | --------------------------------------------- |
| Avoiding annotations entirely                 | Inference may lack enough information             | Add local type ascriptions where they clarify |
| Over-annotating every expression              | Code becomes noisy                                | Annotate boundaries and ambiguous terms       |
| Misreading type errors as mathematical errors | Often the expected type is different from assumed | Inspect local context and target              |

### Coercions and Overloaded Notation — invisible conversions, inferred structure

Lean uses coercions to move between related types and structures. It also uses typeclasses to overload notation.

| Mechanism                   | Example                             | Meaning                                 |
| --------------------------- | ----------------------------------- | --------------------------------------- |
| Numeric literal overloading | `(3 : Nat)`, `(3 : Int)`            | Literal interpreted by expected type    |
| Coercion                    | `Nat` to `Int` in some contexts     | Inserted conversion when available      |
| Typeclass notation          | `a + b`, `a * b`, `1`, `≤`          | Meaning depends on inferred structure   |
| Function-like coercion      | Some structures coerce to functions | Common in bundled maps or homomorphisms |
| Subtype coercion            | `{x : α // P x}` to `α`             | Use underlying value                    |

Subtype example:

```lean
def posOne : {n : Nat // n > 0} :=
  ⟨1, by decide⟩

#check (posOne : Nat)
```

The subtype value can often be coerced to its underlying `Nat`.

**Failure-first explanation:** the wrong mental model is that the printed expression fully shows all operations. The correct model is that elaborated Lean terms may include implicit arguments, inserted coercions, resolved notation, and inferred typeclass instances.

**Common pitfalls:**

| Pitfall                                    | Explanation                                    | Better habit                                           |
| ------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------ |
| Assuming `+` always means natural addition | It depends on type and instances               | Use `#check` and expected types                        |
| Fighting coercion errors blindly           | Lean may not know which conversion is intended | Add explicit type ascription or coercion               |
| Forgetting subtype proof fields            | A subtype value is not just the raw value      | Use `.val`, coercions, and property field deliberately |

### Structures and Field Syntax Basics — records, projections, constructor notation

Detailed modeling with structures belongs to PART 3. This section gives the surface syntax.

```lean
structure Point where
  x : Nat
  y : Nat
```

Constructor syntax:

```lean
def origin : Point :=
  { x := 0, y := 0 }
```

Field projection:

```lean
#check origin.x
#check origin.y
```

Pattern-style construction:

```lean
def shiftRight (p : Point) : Point :=
  { x := p.x + 1, y := p.y }
```

Updating record fields:

```lean
def setX (p : Point) (xNew : Nat) : Point :=
  { p with x := xNew }
```

| Syntax                      | Meaning                        |
| --------------------------- | ------------------------------ |
| `structure Name where ...`  | Define record-like type        |
| `{ field := value, ... }`   | Construct structure            |
| `p.field`                   | Field projection               |
| `{ p with field := value }` | Copy with updated field        |
| `⟨a, b, ...⟩`               | Anonymous constructor notation |

**Design meaning:** structures are used both for ordinary data records and mathematical packages. A structure may contain data fields, proof fields, operations, and laws.

**Common pitfalls:**

| Pitfall                                  | Explanation                                                       | Better habit                                     |
| ---------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------ |
| Thinking structures are OOP classes      | Lean structures are record-like packages, not inheritance objects | Think fields, projections, and bundled data/laws |
| Ignoring proof fields                    | Mathematical structures often include law fields                  | Inspect generated constructor and projections    |
| Overusing anonymous constructor notation | It can be unreadable for large structures                         | Prefer named fields where clarity matters        |

### Classes and Instances Syntax Basics — searchable structures

A class is a structure intended for typeclass inference. An instance supplies evidence that a type has that structure.

```lean
class HasSize (α : Type) where
  size : α → Nat
```

Instance:

```lean
instance : HasSize Nat where
  size n := n
```

Using the class:

```lean
def sizeOfValue {α : Type} [HasSize α] (x : α) : Nat :=
  HasSize.size x
```

| Syntax                     | Meaning                         |
| -------------------------- | ------------------------------- |
| `class C where ...`        | Define typeclass                |
| `[C α]`                    | Require instance                |
| `instance : C α where ...` | Provide instance                |
| `inferInstance`            | Ask Lean to synthesize instance |
| `C.field`                  | Access class operation          |

Algebraic examples in Mathlib use this pattern heavily:

```lean
example {G : Type} [Group G] (a : G) : a * 1 = a := by
  simp
```

The group instance supplies the operations and laws.

**Common pitfalls:**

| Pitfall                                         | Explanation                          | Better habit                                           |
| ----------------------------------------------- | ------------------------------------ | ------------------------------------------------------ |
| Treating `[C α]` as a normal explicit parameter | It is resolved by instance search    | Learn how instances enter the environment              |
| Creating unnecessary local classes              | Can fragment abstraction             | Use existing Mathlib classes when possible             |
| Not knowing which instance is missing           | Error may mention a class obligation | Use `#check`, `inferInstance`, and inspect assumptions |

### Inductive Type Syntax Basics — constructors and generated eliminators

Inductive types define values by constructors. They are central to both programming and proofs.

```lean
inductive Color where
  | red
  | green
  | blue
deriving Repr, DecidableEq
```

Using the type:

```lean
def isRed : Color → Bool
  | Color.red => true
  | _ => false
```

Recursive inductive type:

```lean
inductive MyList (α : Type) where
  | nil
  | cons : α → MyList α → MyList α
```

| Syntax                     | Meaning                                             |                         |
| -------------------------- | --------------------------------------------------- | ----------------------- |
| `inductive Name where ...` | Define inductive type                               |                         |
| `                          | ctor`                                               | Constructor             |
| `                          | ctor : ... → Name`                                  | Constructor with fields |
| `deriving Repr`            | Generate representation instance                    |                         |
| `deriving DecidableEq`     | Generate equality decision procedure where possible |                         |
| `match x with`             | Eliminate by cases                                  |                         |
| `induction x with`         | Use induction principle                             |                         |

**Design meaning:** inductive declarations generate constructors, recursors, induction principles, and pattern matching behavior. They are not only data definitions; they determine proof methods.

**Common pitfalls:**

| Pitfall                                                   | Explanation                                  | Better habit                                                              |
| --------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------- |
| Defining custom data already available in core or Mathlib | Duplicates infrastructure                    | Reuse standard types unless the custom definition is pedagogically needed |
| Forgetting generated induction principles                 | Every inductive type carries proof structure | Use `#check Name.rec` or induction tactics                                |
| Designing constructors without proof needs in mind        | Later proofs may become awkward              | Choose data representation with induction in mind                         |

### Module and Section Syntax Basics — local context, variables, scoping

Sections allow shared variables and local configuration without creating a namespace prefix.

```lean
section

variable (α : Type)
variable (x : α)

def identityInSection : α :=
  x

end
```

Variables can be explicit or implicit:

```lean
section

variable {α : Type}
variable (x : α)

def identityImplicit : α :=
  x

end
```

The section ends the local variable declarations. Declarations created inside the section may generalize over used variables.

Example:

```lean
section Logic

variable (P Q : Prop)

theorem and_comm_in_section : P ∧ Q → Q ∧ P := by
  intro h
  exact And.intro h.right h.left

end Logic
```

The theorem has parameters `P` and `Q`, even though they were declared above.

**Common pitfalls:**

| Pitfall                                                     | Explanation                                               | Better habit                               |
| ----------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------ |
| Forgetting section variables are inserted into declarations | The theorem may have more parameters than visible locally | Use `#check theoremName` after declaration |
| Overusing global `variable` declarations                    | Source becomes context-dependent                          | Keep sections small and explicit           |
| Confusing `namespace` and `section`                         | Namespace changes names; section manages local context    | Use each for its intended purpose          |

### Basic Error Syntax and Failure Forms — type errors, proof errors, partiality markers

Lean has several syntactic forms that signal errors, incomplete code, or impossible branches.

| Construct        | Meaning                                        | Layer                  |
| ---------------- | ---------------------------------------------- | ---------------------- |
| `panic!`         | Runtime panic in executable code               | Programming            |
| `throw`          | Monadic exception-like failure where supported | Programming/effects    |
| `Except.error e` | Explicit recoverable error value               | Programming/data       |
| `Option.none`    | Missing value                                  | Programming/data       |
| `nomatch h`      | Eliminate impossible case                      | Proof/programming      |
| `False.elim h`   | Derive anything from contradiction             | Logic                  |
| `absurd h hp`    | Contradiction from `h` and `hp`                | Logic                  |
| `sorry`          | Placeholder proof/term                         | Development/proof debt |

Example using `Option`:

```lean
def head? {α : Type} : List α → Option α
  | [] => none
  | x :: _ => some x
```

Example using contradiction:

```lean
example (P : Prop) (hP : P) (hNotP : ¬ P) : False := by
  exact hNotP hP
```

From `False`, anything follows:

```lean
example (P Q : Prop) (hP : P) (hNotP : ¬ P) : Q := by
  exact False.elim (hNotP hP)
```

**Design meaning:** Lean separates logical contradiction, optional missing data, recoverable computational errors, runtime panics, and development placeholders. These should not be collapsed into one “error handling” concept.

**Common pitfalls:**

| Pitfall                               | Explanation                                          | Better habit                            |
| ------------------------------------- | ---------------------------------------------------- | --------------------------------------- |
| Using `sorry` as error handling       | It is an admitted proof, not a recoverable error     | Use `Option`, `Except`, or actual proof |
| Using `panic!` in proof-relevant code | Runtime panic does not establish logical correctness | Model failure explicitly                |
| Confusing `False` with `false`        | `False : Prop`, `false : Bool`                       | Keep propositions and Booleans distinct |

### Documentation and Inspection Commands — `#check`, `#eval`, `#print`, examples

Lean source reading depends heavily on inspection commands.

| Command   | Purpose                        | Example                              | What it tells you                  |
| --------- | ------------------------------ | ------------------------------------ | ---------------------------------- |
| `#check`  | Print type of expression       | `#check Nat.add_zero`                | The theorem or term type           |
| `#eval`   | Evaluate executable expression | `#eval 2 + 3`                        | Runtime/computation result         |
| `#print`  | Print declaration              | `#print Nat.add_zero`                | Definition/theorem details         |
| `#reduce` | Reduce expression              | `#reduce 2 + 3`                      | Computed normal form               |
| `#synth`  | Synthesize typeclass instance  | `#synth Inhabited Nat`               | Whether instance search succeeds   |
| `example` | Check local claim              | `example : 1 + 1 = 2 := by norm_num` | Whether proof works without naming |

Examples:

```lean
#check Nat.add_zero
#check @Nat.add_zero
#eval 2 + 3
#reduce 2 + 3
#synth Inhabited Nat
```

**Professional use:** these commands are not beginner crutches. They are part of serious source navigation. Lean development is interactive; inspecting types is equivalent to inspecting an API contract.

**Common pitfalls:**

| Pitfall                                   | Explanation                                       | Better habit                                |
| ----------------------------------------- | ------------------------------------------------- | ------------------------------------------- |
| Guessing theorem arguments                | Wastes time and causes elaboration errors         | Use `#check` and `#check @name`             |
| Using `#eval` for propositions            | Propositions are not ordinary executable Booleans | Use proof search or decidability mechanisms |
| Ignoring generated field/projection names | Structures create usable declarations             | Use `#check` and completion                 |

### Notation and Precedence — readability, ambiguity, local syntax

Lean notation can be highly expressive. Mathematical code often uses custom notation, scoped notation, and overloaded symbols.

| Notation area            | Example        | Underlying concept                        |
| ------------------------ | -------------- | ----------------------------------------- |
| Function type            | `α → β`        | Arrow type                                |
| Universal quantification | `∀ x, P x`     | Dependent function type over propositions |
| Existential              | `∃ x, P x`     | Existential proposition                   |
| Equality                 | `a = b`        | `Eq a b`                                  |
| Inequality               | `a ≤ b`        | Relation from order typeclass             |
| Membership               | `x ∈ s`        | Membership relation                       |
| Subset                   | `s ⊆ t`        | Pointwise implication of membership       |
| Composition              | `f ∘ g`        | Function composition                      |
| Lambda                   | `fun x => ...` | Function abstraction                      |
| Anonymous constructor    | `⟨a, b⟩`       | Constructor syntax                        |

Examples:

```lean
#check fun x : Nat => x + 1
#check ∀ n : Nat, n = n
#check ∃ n : Nat, n = 0
```

**Language-design note:** notation is one of Lean’s strengths for formal mathematics, but it makes source reading dependent on imports and scopes. In unfamiliar code, `#check` is the fastest way to discover what notation means.

**Common pitfalls:**

| Pitfall                                     | Explanation                        | Better habit                                    |
| ------------------------------------------- | ---------------------------------- | ----------------------------------------------- |
| Assuming notation has one universal meaning | Symbols are overloaded and scoped  | Inspect local imports and expected types        |
| Using custom notation too early             | It may obscure definitions         | Add notation after core abstractions are stable |
| Confusing pretty syntax with kernel terms   | The kernel checks elaborated terms | Read notation as surface syntax                 |

### Minimal Source-Reading Workflow — how to inspect unfamiliar Lean code

When encountering unfamiliar Lean code, use this workflow:

| Step                                              | Question                                                                           | Tool or habit                            |
| ------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------- |
| Identify declaration kind                         | Is this a `def`, `theorem`, `structure`, `class`, `instance`, or syntax extension? | Look at command keyword                  |
| Inspect type                                      | What is being defined or proved?                                                   | `#check name`                            |
| Expose implicit arguments                         | What parameters are hidden?                                                        | `#check @name`                           |
| Identify required instances                       | Are there `[Group G]`, `[DecidableEq α]`, `[TopologicalSpace X]` assumptions?      | Read binders and errors                  |
| Locate namespace                                  | Where does this name come from?                                                    | Qualified names, completion, docs        |
| Understand notation                               | What does this symbol elaborate to?                                                | `#check` subexpressions                  |
| Read proof state                                  | What goals are produced?                                                           | Editor goal view                         |
| Separate routine automation from central argument | Which steps are `simp`; which are mathematical?                                    | Refactor mentally                        |
| Search before reproving                           | Is this theorem already available?                                                 | theorem search, `exact?`, `apply?`, docs |
| Check for placeholders                            | Are there `sorry`s?                                                                | Search source                            |

This workflow matters especially for large formalization projects such as the Tao Analysis companion. A file may contain definitions that deliberately mirror textbook development rather than the most idiomatic Mathlib abstraction. Reading such code requires identifying whether a declaration is pedagogical, foundational within that project, or intended for general reuse.

### Core Syntax Reference Table — compact index

| Category         | High-frequency forms                                                                                           | Meaning                                          |                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------ |
| File/module      | `import`, `namespace`, `section`, `open`, `variable`                                                           | Environment and scope management                 |                                      |
| Definitions      | `def`, `abbrev`, `opaque`, `inductive`, `structure`, `class`, `instance`                                       | Introduce constants, data, structures, instances |                                      |
| Propositions     | `theorem`, `lemma`, `example`, `Prop`, `∀`, `∃`, `→`, `∧`, `∨`, `¬`, `↔`                                       | Logical declarations and claims                  |                                      |
| Proof terms      | `fun`, `And.intro`, `.left`, `.right`, `Exists.intro`, `rfl`                                                   | Direct construction of proof objects             |                                      |
| Tactic blocks    | `by`, `intro`, `exact`, `apply`, `constructor`, `cases`, `induction`, `rw`, `simp`, `have`, `suffices`, `calc` | Interactive proof construction                   |                                      |
| Equality         | `=`, `rfl`, `rw [h]`, `rw [← h]`, `.symm`, `.trans`                                                            | Definitional and propositional equality work     |                                      |
| Data syntax      | numerals, strings, lists, arrays, pairs, `some`, `none`, structures                                            | Core programming values                          |                                      |
| Pattern matching | `match`, `                                                                                                     | `, `cases`, `induction`                          | Branch by constructor or proof shape |
| Effects          | `do`, `←`, `return`, `IO`, `Option`, `Except`                                                                  | Programming-side effects and failure             |                                      |
| Inspection       | `#check`, `#eval`, `#print`, `#reduce`, `#synth`                                                               | Interactive source understanding                 |                                      |
| Attributes       | `@[simp]`, `deriving`, `local attribute`, `set_option`                                                         | Automation and environment configuration         |                                      |

### PART 2 Summary — what this part establishes

PART 2 establishes the surface grammar and primitive semantic recognition needed to read Lean code.

The central lesson is that Lean syntax is **elaboration-sensitive**. A visible declaration may omit implicit arguments, typeclass instances, coercions, universe levels, generated fields, and automation behavior. Therefore, source reading requires more than parsing tokens. It requires tracking expected types, local context, namespaces, available imports, and proof goals.

The key distinctions from this part are:

| Distinction                                                           | Why it matters                                                                   |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `Prop` vs `Bool`                                                      | Logical truth and computable Boolean values are different                        |
| Theorem statement vs proof term                                       | A theorem is a typed declaration; the proof is a term                            |
| Definitional equality vs propositional equality                       | `rfl` and `rw` solve different kinds of equality problems                        |
| Explicit argument vs implicit argument vs typeclass argument          | Lean code often hides semantically real parameters                               |
| Term proof vs tactic proof                                            | Both construct proof terms through different surfaces                            |
| Rewriting vs simplification                                           | `rw` applies selected equalities; `simp` normalizes by configured rules          |
| Pure binding vs mutation-like syntax                                  | Lean’s core is functional, while programming layers support controlled state     |
| Syntax error vs elaboration error vs proof failure vs runtime failure | “Lean failed” has several different meanings                                     |
| Structure vs class vs instance                                        | Mathematical abstraction depends on packaged data, laws, and searchable evidence |
| Local source example vs reusable library theorem                      | `example` demonstrates; named lemmas build searchable infrastructure             |

## PART 3 — Data, Types, and Modeling Reference by Task Pattern

### Purpose and Scope — modeling values, propositions, invariants, and reusable abstractions

PART 3 treats Lean 4 data and type design by **modeling task**, not by mechanical syntax category. This follows the uploaded specification’s requirement that Lean 4 be taught through dependent type theory, propositions-as-types, structures, typeclasses, theorem anchors, and Mathlib-style abstraction rather than as a shallow syntax list .

In ordinary programming languages, “data modeling” usually means choosing between records, variants, collections, generics, and interfaces. In Lean 4, the scope is broader. A model may include:

| Modeling object               | Lean form                                                   | What it represents                             |
| ----------------------------- | ----------------------------------------------------------- | ---------------------------------------------- |
| Plain value                   | `Nat`, `String`, `List α`, `Array α`, custom inductive type | Computable data                                |
| Proposition                   | `P : Prop`                                                  | Logical claim                                  |
| Proof                         | `h : P`                                                     | Evidence that a claim holds                    |
| Invariant-carrying value      | `{x : α // P x}`                                            | Data plus proof of property                    |
| Structured object             | `structure`                                                 | Fields, possibly including laws                |
| Typeclass abstraction         | `class`, `[C α]`, `instance`                                | Searchable reusable structure                  |
| Mathematical hierarchy object | `[Monoid M]`, `[Group G]`, `[LinearOrder α]`                | Shared algebraic/order/topological assumptions |
| Dependent family              | `Vec α n`, `Fin n`, indexed inductive type                  | Type indexed by values                         |
| Library abstraction           | Mathlib definitions and structures                          | Reusable formalized mathematics                |

The key Lean-specific modeling question is not only **“what data shape should represent this?”** but also **“what should be carried as data, what should be expressed as a proposition, what should be inferred as a typeclass instance, and what should be delegated to Mathlib?”**

### Modeling Decision Overview — choose the representation by proof obligation

| Task                                         | Preferred Lean construct/API                                            | When to use                                        | Design meaning                      | Common pitfall                                      |
| -------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------- | --------------------------------------------------- |
| Represent plain computable data              | `Nat`, `Int`, `Bool`, `String`, `List`, `Array`, structures, inductives | Runtime value matters                              | Ordinary typed programming          | Over-encoding proof obligations too early           |
| Represent a mathematical claim               | `Prop`, theorem statement                                               | Need machine-checked truth                         | Claim is a type                     | Treating propositions like Booleans                 |
| Represent evidence                           | Proof term, hypothesis, theorem                                         | Need to use a fact later                           | Proof inhabits proposition          | Forgetting proof terms are values in context        |
| Represent finite alternatives                | `inductive`                                                             | Domain has named cases                             | Constructors define possible states | Using strings or numbers as fake enums              |
| Represent structured records                 | `structure`                                                             | Object has named fields                            | Fields become projections           | Treating structure as OOP class                     |
| Represent reusable mathematical laws         | `class` + instances                                                     | Operations and laws should be inferred             | Typeclass search supplies structure | Creating redundant local hierarchies                |
| Represent optional value                     | `Option α`                                                              | Value may be absent computationally                | Absence as data                     | Confusing with `∃` or `¬∃`                          |
| Represent recoverable error                  | `Except ε α`                                                            | Computation may fail with error info               | Failure as explicit value           | Using `panic!` or `sorry`                           |
| Represent constrained value                  | Subtype `{x : α // P x}`                                                | Every value must carry proof of invariant          | Data plus proof                     | Making every predicate a subtype prematurely        |
| Represent bounded natural                    | `Fin n`                                                                 | Index must be less than bound                      | Bound in the type                   | Fighting coercions to/from `Nat`                    |
| Represent dependent collection length        | Usually Mathlib/vector-like definitions where appropriate               | Length is semantically central                     | Value index in type                 | Using dependent vectors when ordinary lists suffice |
| Represent set-like collection mathematically | `Set α`                                                                 | Membership predicate matters more than enumeration | Set as predicate `α → Prop`         | Expecting computational collection behavior         |
| Represent finite computable collection       | `List α`, `Array α`, `Finset α`                                         | Need iteration, enumeration, or finite reasoning   | Computable or finite container      | Confusing `Set` and `Finset`                        |
| Represent maps/functions                     | `α → β`, finite maps, association structures                            | Total function or finite lookup                    | Functions are first-class           | Using partial functions without modeling absence    |
| Reuse algebra/order/topology                 | Mathlib structures/typeclasses                                          | Existing hierarchy fits                            | Abstraction through instances       | Rebuilding basic mathematics locally                |

**Professional rule:** in Lean, representation should be chosen by the *proofs the representation must support*. A data type that is convenient for execution may be awkward for induction. A theorem statement that is mathematically true may be too specific to match library lemmas. A subtype that enforces an invariant may make later rewriting harder. A typeclass abstraction may unlock Mathlib but make errors more indirect.

### Core Type-System Properties — static, dependent, proof-relevant at the boundary

Lean’s type system is not only a static checker for program errors. It is the language in which mathematical specifications are written.

| Type-system property   | Practical consequence                                                    | Common misunderstanding                   |
| ---------------------- | ------------------------------------------------------------------------ | ----------------------------------------- |
| Static checking        | Ill-typed terms and invalid proof terms are rejected before acceptance   | Type checking is only syntax validation   |
| Dependent types        | Types may mention values                                                 | Types are just labels for runtime objects |
| Propositions-as-types  | Claims are types in `Prop`                                               | Proofs are external annotations           |
| Proofs-as-terms        | A proof can be passed, named, stored in context, or generated by tactics | Proof scripts are not terms               |
| Implicit arguments     | Many parameters are inferred                                             | Omitted parameters do not exist           |
| Typeclass inference    | Structures and operations can be searched automatically                  | Typeclasses are only interfaces           |
| Universes              | Generic code must avoid paradoxes                                        | `Type` is one flat universe               |
| Definitional equality  | Some equalities hold by computation                                      | All equalities require theorem rewriting  |
| Propositional equality | Non-computational equality is itself a proposition                       | Equality is untyped textual substitution  |
| Kernel checking        | Elaborated terms are checked by a small trusted core                     | Tactics are trusted because they run      |

**Failure-first explanation:** the tempting model imported from mainstream programming is that a type says what kind of runtime value an expression has. In Lean, a type may also be a proposition, and a term may be a proof. A theorem statement such as:

```lean id="irur85"
theorem add_zero_example (n : Nat) : n + 0 = n := by
  exact Nat.add_zero n
```

does not merely say that the expression returns a Boolean. It declares a constant whose type is the proposition `n + 0 = n`, and whose body is a proof term.

### Task: Represent Plain Computable Values — primitive and compound data

Use ordinary data types when the object is primarily computational: numbers, Booleans, strings, lists, arrays, options, exceptions, and records.

| Data need      | Construct    | Example             | When to use                                       | Caveat                                     |
| -------------- | ------------ | ------------------- | ------------------------------------------------- | ------------------------------------------ |
| Natural number | `Nat`        | `0`, `1`, `n + 1`   | Counting, induction, finite sizes                 | Subtraction is truncated                   |
| Integer        | `Int`        | `-3`, `42`          | Signed arithmetic                                 | Coercions from `Nat` require care          |
| Boolean        | `Bool`       | `true`, `false`     | Computable branching                              | Not the same as `Prop`                     |
| String         | `String`     | `"Lean"`            | Text in programs                                  | Not usually mathematical language modeling |
| Character      | `Char`       | `'a'`               | Character-level programming                       | Separate from `String`                     |
| List           | `List α`     | `[1, 2, 3]`         | Recursive proofs, symbolic data, simple sequences | Linear access and append cost              |
| Array          | `Array α`    | `#[1, 2, 3]`        | Efficient indexed computation                     | Often less pleasant for inductive proofs   |
| Pair           | `α × β`      | `(x, y)`            | Lightweight product                               | Fields unnamed                             |
| Unit           | `Unit`       | `()`                | No meaningful returned value                      | Do not use to hide missing design          |
| Option         | `Option α`   | `some x`, `none`    | Computable absence                                | Not a proof of existence/nonexistence      |
| Except         | `Except ε α` | `.ok x`, `.error e` | Recoverable failure                               | Requires explicit handling                 |

Examples:

```lean id="hryvvd"
def firstOrZero : List Nat → Nat
  | [] => 0
  | x :: _ => x
```

```lean id="1oowgp"
def safeHead {α : Type} : List α → Option α
  | [] => none
  | x :: _ => some x
```

```lean id="snydw7"
def parsePositiveNat (n : Nat) : Except String {m : Nat // m > 0} :=
  if h : n > 0 then
    .ok ⟨n, h⟩
  else
    .error "not positive"
```

The last example shows Lean’s modeling density: a function can return either an error string or a natural number paired with a proof that it is positive.

**Common pitfalls:**

| Pitfall                                                    | Explanation                               | Better habit                                              |
| ---------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------- |
| Using `Bool` for mathematical claims                       | `Bool` computes; `Prop` states            | Use `Prop` for theorem statements                         |
| Using `Nat` where negative values are meaningful           | `Nat` subtraction truncates at zero       | Use `Int` when signed arithmetic is semantically required |
| Using `List` for performance-sensitive indexed computation | List indexing/traversal is not array-like | Use `Array` when execution cost matters                   |
| Using `Option` without explaining absence                  | `none` loses error information            | Use `Except` when failure reason matters                  |

### Task: Represent Mathematical Claims — `Prop`, predicates, relations, theorem shapes

Mathematical modeling in Lean often starts with propositions.

| Mathematical idea   | Lean form      | Example                               |
| ------------------- | -------------- | ------------------------------------- |
| Predicate on values | `α → Prop`     | `fun n : Nat => n > 0`                |
| Binary relation     | `α → α → Prop` | `fun a b => a ≤ b`                    |
| Universal claim     | `∀ x, P x`     | `∀ n : Nat, n = n`                    |
| Existential claim   | `∃ x, P x`     | `∃ n : Nat, n > 0`                    |
| Implication         | `P → Q`        | `n > 0 → n ≠ 0`                       |
| Conjunction         | `P ∧ Q`        | `n > 0 ∧ n < 10`                      |
| Disjunction         | `P ∨ Q`        | `n = 0 ∨ n > 0`                       |
| Equivalence         | `P ↔ Q`        | `n ≠ 0 ↔ n > 0` for suitable domains  |
| Equality            | `a = b`        | `n + 0 = n`                           |
| Set membership      | `x ∈ s`        | Predicate-based membership in `Set α` |

Example predicate:

```lean id="vugmaw"
def IsPositive (n : Nat) : Prop :=
  n > 0
```

Using it in a theorem:

```lean id="77eaik"
example (n : Nat) (h : IsPositive n) : n > 0 :=
  h
```

Predicate as a set-like object:

```lean id="0dik5k"
def EvenNatSet : Set Nat :=
  {n | ∃ k, n = 2 * k}
```

Here `Set Nat` is essentially a predicate `Nat → Prop`, with set notation layered over predicate logic.

**Design meaning:** Lean does not require a special separate language for specifications. Specifications are types, usually in `Prop`. A theorem is a declaration that a proposition is inhabited.

**Common pitfalls:**

| Pitfall                                                       | Explanation                                                                   | Better habit                                                           |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Turning every predicate into a Boolean function               | Boolean computation may be useful, but theorem statements usually want `Prop` | Use `Prop` for reasoning, `Bool` for computation                       |
| Writing under-specified predicates                            | Missing domain assumptions cause later proof pain                             | Put assumptions explicitly in theorem statements                       |
| Using existential claims where data is needed computationally | `∃ x, P x` is proof-level existence                                           | Use subtype or sigma-like data when the witness must be computed       |
| Using subtype when proposition is enough                      | Carrying proof fields can complicate rewriting                                | Use `P x` hypotheses when the invariant need not travel with the value |

### Task: Represent Evidence — hypotheses, proof fields, theorem arguments

In Lean, evidence is represented by terms. A hypothesis is not metadata; it is a local term whose type is a proposition.

| Evidence need       | Lean form                   | Example                    | When to use                   |
| ------------------- | --------------------------- | -------------------------- | ----------------------------- |
| Local assumption    | `(h : P)`                   | `(h : n > 0)`              | The theorem depends on a fact |
| Intermediate proof  | `have h : P := ...`         | `have hz : n ≠ 0 := ...`   | Structure proof scripts       |
| Structure law field | Field of type `Prop`        | `mul_assoc : ∀ a b c, ...` | Package algebraic laws        |
| Subtype proof       | Second component of subtype | `⟨n, h⟩`                   | Carry invariant with value    |
| Typeclass law       | Field in class              | `[Group G]` includes laws  | Reuse through instance search |
| Theorem reference   | Named proof term            | `Nat.add_zero n`           | Reuse library theorem         |

Example:

```lean id="p6sn5m"
example (n : Nat) (h : n > 0) : n ≠ 0 := by
  intro hz
  rw [hz] at h
  contradiction
```

Here `h : n > 0` is evidence that `n` is positive. `hz : n = 0` is assumed temporarily to derive contradiction.

Proof field in a structure:

```lean id="ihchjr"
structure PositiveNat where
  val : Nat
  is_pos : val > 0
```

Constructing a value:

```lean id="ycyoq9"
def onePositive : PositiveNat :=
  { val := 1, is_pos := by decide }
```

Using the proof field:

```lean id="xil7x6"
example (p : PositiveNat) : p.val > 0 :=
  p.is_pos
```

**Language-design note:** data and evidence can be packaged together. This is powerful for invariants but introduces proof-management costs. A structure with proof fields may be excellent for expressing domain constraints, but awkward if most functions repeatedly need to transport proofs across equalities.

**Common pitfalls:**

| Pitfall                                             | Explanation                                           | Better habit                                    |
| --------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------- |
| Forgetting proof fields in construction             | Structures/subtypes with invariants require evidence  | Let goals guide proof-field construction        |
| Carrying proofs when local hypotheses suffice       | Proof-carrying data can complicate APIs               | Use theorem assumptions when invariant is local |
| Hiding important assumptions in typeclass instances | Instance search can obscure where evidence comes from | Use explicit assumptions when clarity matters   |

### Task: Define Structured Data — `structure`, fields, projections, update

Use `structure` when an object has named components. In Lean, structures are used for ordinary records and for mathematical packages.

```lean id="2dmvfw"
structure Point where
  x : Nat
  y : Nat
```

Construction:

```lean id="i1hicq"
def p0 : Point :=
  { x := 0, y := 0 }
```

Projection:

```lean id="jdfm13"
def pointSum (p : Point) : Nat :=
  p.x + p.y
```

Update:

```lean id="026x7k"
def moveRight (p : Point) : Point :=
  { p with x := p.x + 1 }
```

Structures can include proof fields:

```lean id="g8rscz"
structure BoundedNat where
  val : Nat
  upper : Nat
  is_le : val ≤ upper
```

The proof field `is_le` is part of the object. This makes the invariant always available.

| Structure design choice   | Strength                          | Cost                                                        | Best use                                 |
| ------------------------- | --------------------------------- | ----------------------------------------------------------- | ---------------------------------------- |
| Data-only fields          | Simple computation and projection | Invariants must be separate                                 | Ordinary records                         |
| Data plus proof fields    | Invariant travels with object     | Construction and rewriting require proofs                   | Domain objects with essential invariants |
| Operation fields          | Bundle behavior with carrier      | Can duplicate typeclass hierarchy                           | Local custom abstractions                |
| Law fields                | Package mathematical correctness  | Proof obligations grow                                      | Algebraic or semantic structures         |
| Extend existing structure | Reuse fields and hierarchy        | Requires understanding inheritance-like structure extension | Mathlib-compatible abstractions          |

**Professional rule:** before defining a new structure, ask whether Mathlib already has the abstraction. For example, groups, monoids, rings, orders, topological spaces, metric spaces, equivalences, embeddings, and homomorphisms already have established representations.

**Failure-first explanation:** the tempting model is to create a structure whenever there are fields. In formalized mathematics, an unnecessary structure can isolate your development from library lemmas. If existing theorems are stated for `[Group G]`, a custom `MyGroup` structure will not automatically benefit from them.

**Common pitfalls:**

| Pitfall                                              | Explanation                                                          | Better habit                           |
| ---------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------- |
| Creating ad hoc mathematical structures              | They do not interoperate with Mathlib hierarchy                      | Reuse existing classes/structures      |
| Overpacking proofs into records                      | Every transformation now needs proof transport                       | Use local hypotheses when appropriate  |
| Using unnamed constructor notation for large records | It becomes unreadable                                                | Prefer named fields                    |
| Treating structure extension as OOP inheritance      | Lean structures package fields; they are not method-dispatch classes | Think projections and bundled evidence |

### Task: Model Finite States — inductive types instead of magic constants

Use `inductive` when a domain has a fixed set of cases.

```lean id="cwijab"
inductive Sign where
  | negative
  | zero
  | positive
deriving Repr, DecidableEq
```

Function by pattern matching:

```lean id="cauusr"
def Sign.negate : Sign → Sign
  | Sign.negative => Sign.positive
  | Sign.zero => Sign.zero
  | Sign.positive => Sign.negative
```

Theorem by cases:

```lean id="p56psi"
example (s : Sign) : Sign.negate (Sign.negate s) = s := by
  cases s <;> rfl
```

| Finite-state modeling option | Use                             | Strength                    | Pitfall                                          |
| ---------------------------- | ------------------------------- | --------------------------- | ------------------------------------------------ |
| `inductive` enum-like type   | Named finite alternatives       | Exhaustive pattern matching | Forgetting to derive useful instances            |
| `Bool`                       | Exactly two computational cases | Simple and executable       | Names `true`/`false` may obscure domain meaning  |
| `Fin n`                      | Bounded numeric index           | Encodes bound in type       | Harder to read than domain-specific constructors |
| `Nat` constants              | Quick prototype                 | Simple numerals             | Non-exhaustive, invalid states possible          |
| `String` tags                | External data boundary          | Convenient for parsing      | No static guarantee of valid tags                |

**Professional rule:** if the alternatives have semantic names, use an inductive type rather than numeric or string tags.

**Common pitfalls:**

| Pitfall                                       | Explanation                                   | Better habit                               |
| --------------------------------------------- | --------------------------------------------- | ------------------------------------------ |
| Using `Nat` for domain states                 | Allows invalid states                         | Use an inductive type                      |
| Using `Bool` for non-obvious two-case domains | `true` and `false` do not communicate meaning | Define `inductive` with named constructors |
| Forgetting theorem support                    | Functions over inductives often need lemmas   | Prove basic equations and simp lemmas      |

### Task: Model Recursive Data — inductive syntax, trees, expressions, proof principles

Recursive data is central to Lean programming and formal verification. It is especially important for programming-language theory examples, symbolic mathematics, syntax trees, and recursive mathematical objects.

Example expression language:

```lean id="z93ep1"
inductive Expr where
  | const : Nat → Expr
  | add : Expr → Expr → Expr
  | mul : Expr → Expr → Expr
deriving Repr, DecidableEq
```

Evaluator:

```lean id="uuo2fk"
def Expr.eval : Expr → Nat
  | Expr.const n => n
  | Expr.add e₁ e₂ => e₁.eval + e₂.eval
  | Expr.mul e₁ e₂ => e₁.eval * e₂.eval
```

Transformation:

```lean id="qu2ek3"
def Expr.simplify : Expr → Expr
  | Expr.add e (Expr.const 0) => simplify e
  | Expr.add (Expr.const 0) e => simplify e
  | Expr.add e₁ e₂ => Expr.add (simplify e₁) (simplify e₂)
  | Expr.mul e₁ e₂ => Expr.mul (simplify e₁) (simplify e₂)
  | Expr.const n => Expr.const n
```

A correctness theorem would state:

```lean id="oymayx"
theorem Expr.simplify_correct (e : Expr) :
    e.simplify.eval = e.eval := by
  induction e with
  | const n =>
      rfl
  | add e₁ e₂ ih₁ ih₂ =>
      -- proof depends on simplifier cases
      sorry
  | mul e₁ e₂ ih₁ ih₂ =>
      simp [Expr.simplify, Expr.eval, ih₁, ih₂]
```

The theorem demonstrates why recursive modeling matters: the data definition generates the induction principle needed for correctness.

| Recursive modeling task | Lean construct     | Proof method                   |
| ----------------------- | ------------------ | ------------------------------ |
| Natural numbers         | `Nat`              | induction on `n`               |
| Lists                   | `List α`           | induction on list structure    |
| Trees                   | custom `inductive` | induction on tree constructors |
| Syntax                  | custom `inductive` | structural induction           |
| Operational semantics   | inductive relation | induction on derivation        |
| Evaluation function     | recursive `def`    | induction over syntax or input |

**Common pitfalls:**

| Pitfall                                                               | Explanation                                                     | Better habit                                  |
| --------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------- |
| Defining recursive data without considering induction                 | Later proofs may be awkward                                     | Design constructors around proof cases        |
| Making evaluator and syntax mismatch                                  | Proofs require awkward nested cases                             | Align function recursion with data structure  |
| Using `sorry` in core correctness theorem without tracking proof debt | It hides the most important verification claim                  | Treat such `sorry` as central unfinished work |
| Expecting `simp` to prove all recursive correctness facts             | Simplification needs induction hypotheses and unfolding control | Use induction plus targeted simplification    |

### Task: Choose the Right Collection — `List`, `Array`, `Set`, `Finset`, functions

Collection choice in Lean depends on whether the task is computational, mathematical, finite, proof-oriented, or performance-oriented.

| Task                          | Preferred construct                        | Why                                        | Common pitfall                                        |
| ----------------------------- | ------------------------------------------ | ------------------------------------------ | ----------------------------------------------------- |
| Recursive symbolic sequence   | `List α`                                   | Natural induction and many lemmas          | Poor indexed performance                              |
| Efficient executable sequence | `Array α`                                  | Better runtime indexing/update patterns    | Proofs may be less direct                             |
| Mathematical set              | `Set α`                                    | Membership as predicate                    | Expecting enumeration                                 |
| Finite mathematical set       | `Finset α`                                 | Finite enumeration plus set-like reasoning | Requires decidable equality or finiteness assumptions |
| Total map                     | `α → β`                                    | Functions are native                       | Partiality must be modeled separately                 |
| Partial lookup                | `α → Option β` or finite map structures    | Absence explicit                           | Hiding lookup failure                                 |
| Indexed bounded family        | `Fin n → α`                                | Bound in domain                            | Coercions and index proofs                            |
| Multiset-like collection      | Mathlib multiset structures where relevant | Multiplicity matters                       | Using list when order should not matter               |

List example:

```lean id="m9vpgq"
example {α : Type} (xs ys : List α) :
    (xs ++ ys).length = xs.length + ys.length := by
  simp
```

Set example:

```lean id="vvzz1d"
example {α : Type} (s t : Set α) :
    s ⊆ t ↔ ∀ x, x ∈ s → x ∈ t := by
  rfl
```

Function as map:

```lean id="owv3ui"
def square : Nat → Nat :=
  fun n => n * n
```

Partial function as `Option`:

```lean id="hfz2fp"
def pred? : Nat → Option Nat
  | 0 => none
  | n + 1 => some n
```

**Design tradeoff:** `Set α` gives beautiful mathematical reasoning because it is essentially `α → Prop`, but it is not an executable finite container. `List α` is executable and inductive, but order and duplicates matter. `Finset α` supports finite set reasoning, but often requires decidability assumptions.

**Common pitfalls:**

| Pitfall                                              | Explanation                                 | Better habit                                            |
| ---------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------- |
| Using `Set` when computation/enumeration is required | `Set α` is predicate-like                   | Use `List`, `Array`, or `Finset`                        |
| Using `List` when order is irrelevant                | Proofs may need extra permutation reasoning | Use `Finset` or set-like abstractions                   |
| Using `Array` for theorem-first development          | Induction principles may be less convenient | Start with `List` unless execution cost matters         |
| Treating functions as partial maps                   | Lean functions are total                    | Use `Option`, subtype domain, or explicit preconditions |

### Task: Represent Optional or Missing Values — `Option`, propositions, subtypes

Absence can be represented in several ways, and each has a different meaning.

| Absence pattern                         | Lean representation                 | Meaning                 | Best use                                 |
| --------------------------------------- | ----------------------------------- | ----------------------- | ---------------------------------------- |
| Computation may not return value        | `Option α`                          | `some x` or `none`      | Safe partial computation                 |
| Computation may fail with reason        | `Except ε α`                        | Error or success        | Parsing, validation, recoverable failure |
| There exists a value                    | `∃ x, P x`                          | Proof-level existence   | Mathematical claims                      |
| A value satisfying predicate is carried | `{x : α // P x}`                    | Data plus proof         | Invariant-carrying APIs                  |
| Function defined only under condition   | `(h : P) → α` or theorem hypothesis | Caller supplies proof   | Proof-oriented partiality                |
| Classical selected witness              | Choice-based construction           | Noncomputable selection | Advanced mathematics                     |

Example with `Option`:

```lean id="xlm55h"
def List.second? {α : Type} : List α → Option α
  | _ :: y :: _ => some y
  | _ => none
```

Example with existence:

```lean id="9uwwig"
example : ∃ n : Nat, n + 1 = 1 := by
  use 0
```

Example with subtype:

```lean id="mb1fwr"
def nonzeroNat : {n : Nat // n ≠ 0} :=
  ⟨1, by decide⟩
```

**Failure-first explanation:** the wrong model is that `Option α`, `∃ x, P x`, and `{x : α // P x}` are interchangeable ways to say “there may be a value.” They are not. `Option α` is executable data. `∃ x, P x` is a proposition. A subtype is an actual value paired with proof of an invariant.

**Common pitfalls:**

| Pitfall                                      | Explanation                                  | Better habit                           |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------- |
| Returning `Option` when caller needs a proof | `some x` may not carry the required property | Return a subtype or dependent pair     |
| Using `∃` when computation needs the witness | Existential proof may not compute usefully   | Use subtype or explicit data           |
| Using subtype when absence is possible       | Subtype assumes value exists                 | Use `Option {x // P x}` or `Except`    |
| Using `none` for all failures                | Loses diagnostics                            | Use `Except` when error reason matters |

### Task: Model Invariants — hypotheses, subtypes, structures, typeclasses

Invariants can be represented at different levels. Lean offers several choices, and the right one depends on how persistent and reusable the invariant is.

| Invariant strategy          | Form               | Example                 | Strength                        | Cost                                    |
| --------------------------- | ------------------ | ----------------------- | ------------------------------- | --------------------------------------- |
| Local hypothesis            | `(h : P x)`        | `(h : n > 0)`           | Simple, flexible                | Must pass proof separately              |
| Subtype                     | `{x : α // P x}`   | `{n : Nat // n > 0}`    | Invariant travels with value    | Coercions/proof fields complicate terms |
| Structure with proof fields | `structure`        | `PositiveNat`           | Named invariant-carrying object | More declarations and projections       |
| Type index                  | `Vec α n`, `Fin n` | length or bound in type | Strong static guarantee         | More dependent reasoning                |
| Typeclass law               | `[C α]`            | `[Group G]`             | Reusable inferred laws          | Instance search complexity              |
| Theorem precondition        | `P x → Q x`        | `n ≠ 0 → ...`           | Lightweight proof obligation    | Caller must provide proof               |

Example local hypothesis:

```lean id="0hojyn"
example (n : Nat) (h : n > 0) : n ≠ 0 := by
  intro hz
  rw [hz] at h
  contradiction
```

Example subtype:

```lean id="x499qj"
def PositiveNat' :=
  {n : Nat // n > 0}
```

Example indexed type:

```lean id="c0fkir"
#check Fin
#check (Fin 5)
```

`Fin 5` represents natural numbers less than `5`.

**Design tradeoff:** stronger types prevent invalid states but move more work into construction, coercion, rewriting, and transport. Lightweight hypotheses are easier to use locally but do not prevent invalid values from being passed around elsewhere.

**Professional rule:** encode an invariant in the type when invalid states must be impossible across an API boundary. Use hypotheses when the invariant is local to a theorem or proof. Use typeclasses when the invariant describes reusable mathematical structure over a type.

**Common pitfalls:**

| Pitfall                                                      | Explanation                         | Better habit                                    |
| ------------------------------------------------------------ | ----------------------------------- | ----------------------------------------------- |
| Overusing subtypes                                           | Proof transport becomes noisy       | Use hypotheses unless the invariant must travel |
| Underusing subtypes at API boundaries                        | Invalid values remain representable | Encode essential invariants in types            |
| Encoding algebraic laws as ordinary fields in ad hoc records | Loses Mathlib reuse                 | Use existing classes where possible             |
| Indexing types before definitions stabilize                  | Dependent rewriting becomes painful | Start simple, refine when invariant is central  |

### Task: Represent Bounded Values — `Fin`, subtypes, inequalities

Bounded values are common in indexing, finite sums, arrays, vectors, and finite domains.

| Representation           | Meaning                         | Best use                      | Caveat                           |
| ------------------------ | ------------------------------- | ----------------------------- | -------------------------------- |
| `Fin n`                  | Natural number less than `n`    | Safe indexing, finite domains | Requires bound proofs            |
| `{k : Nat // k < n}`     | Subtype with explicit predicate | Custom bounded values         | Similar to `Fin`, less canonical |
| `(k : Nat) (h : k < n)`  | Separate value and proof        | Local theorem assumptions     | More parameters                  |
| `Nat` with runtime check | Computation-oriented            | External input validation     | Weaker static guarantee          |

Example:

```lean id="do29c0"
def firstIndexOfFive : Fin 5 :=
  ⟨0, by decide⟩
```

Using separate hypothesis:

```lean id="19s4v7"
example (n k : Nat) (h : k < n) : {i : Nat // i < n} :=
  ⟨k, h⟩
```

**Common pitfalls:**

| Pitfall                                              | Explanation                                     | Better habit                                 |
| ---------------------------------------------------- | ----------------------------------------------- | -------------------------------------------- |
| Fighting `Fin` coercions                             | `Fin n` is not definitionally the same as `Nat` | Use coercions deliberately and inspect goals |
| Using `Nat` indices into arrays/lists without proofs | Index may be invalid                            | Use safe APIs or bounded indices             |
| Encoding bounds twice                                | Redundant proofs make rewriting harder          | Choose one representation                    |

### Task: Model Domain Concepts — definitions first, theorem statements second

A Lean development often starts with definitions, but the quality of the definitions is judged by the theorems they support. Domain modeling should therefore proceed by asking what claims must be stated and proved.

Example: evenness.

Predicate style:

```lean id="l11lmn"
def IsEven (n : Nat) : Prop :=
  ∃ k, n = 2 * k
```

Boolean style:

```lean id="t157bf"
def isEvenBool (n : Nat) : Bool :=
  n % 2 == 0
```

Subtype style:

```lean id="1md5nu"
def EvenNat :=
  {n : Nat // IsEven n}
```

Each is legitimate, but they serve different purposes.

| Representation            | Best for                         | Weakness                                      |
| ------------------------- | -------------------------------- | --------------------------------------------- |
| `IsEven : Nat → Prop`     | Theorem proving                  | Not directly a computable decision result     |
| `isEvenBool : Nat → Bool` | Computation                      | Requires bridge lemmas to use in propositions |
| `EvenNat` subtype         | APIs requiring even numbers only | Proof transport and coercions                 |
| Typeclass                 | Reusable structure over types    | Not suitable for one-off predicates           |

A bridge theorem may connect Boolean computation and proposition:

```lean id="m1q99v"
-- Shape only; actual proof depends on definitions and available library lemmas.
theorem isEvenBool_correct (n : Nat) :
    isEvenBool n = true ↔ IsEven n := by
  sorry
```

**Design meaning:** if a domain concept needs both computation and proof, it is often useful to define a computable test and prove a correctness theorem connecting it to a proposition.

**Common pitfalls:**

| Pitfall                                          | Explanation                       | Better habit                                                     |
| ------------------------------------------------ | --------------------------------- | ---------------------------------------------------------------- |
| Defining only the Boolean test                   | Hard to use in theorem statements | Also define a `Prop` predicate or prove bridge lemmas            |
| Defining only the proposition                    | May be inconvenient for execution | Add decidability or computable check when needed                 |
| Making the subtype the primary concept too early | API becomes proof-heavy           | Start with predicate unless invariant-carrying values are needed |

### Task: Represent Algebraic Structure — classes, instances, and laws

Algebraic modeling in Lean should usually use Mathlib’s hierarchy. Do not define a fresh monoid, group, ring, or order structure unless there is a specific reason.

Example using an existing class:

```lean id="ffbcg8"
example {M : Type} [Monoid M] (a : M) : a * 1 = a := by
  simp
```

Group example:

```lean id="fnsy9j"
example {G : Type} [Group G] (a : G) : a * a⁻¹ = 1 := by
  simp
```

Ring example:

```lean id="sjmg4t"
example {R : Type} [CommRing R] (a b : R) :
    (a + b) ^ 2 = a ^ 2 + 2 * a * b + b ^ 2 := by
  ring
```

| Structure need              | Lean/Mathlib form                 | Mechanism                     | Typical tactic/library support            |
| --------------------------- | --------------------------------- | ----------------------------- | ----------------------------------------- |
| Associative operation       | `[Semigroup M]`                   | Typeclass laws                | `simp`, associativity lemmas              |
| Identity element            | `[Monoid M]`                      | `1`, `*`, laws                | `simp`                                    |
| Inverses                    | `[Group G]`                       | `⁻¹`, division-like reasoning | `simp`, group lemmas                      |
| Addition and multiplication | `[Ring R]`, `[CommRing R]`        | algebraic hierarchy           | `ring`, `nlinarith`                       |
| Order                       | `[Preorder α]`, `[LinearOrder α]` | relational hierarchy          | order lemmas, `linarith` where applicable |
| Scalar action               | module/vector-space classes       | algebraic hierarchy           | module lemmas                             |
| Topology/analysis           | topological and metric classes    | abstract analysis hierarchy   | specialized Mathlib lemmas                |

**Design tradeoff:** typeclass-based algebra lets one theorem work for many structures. The cost is that theorem statements become more abstract, and error messages may involve missing instances or ambiguous notation.

**Common pitfalls:**

| Pitfall                                                                       | Explanation                               | Better habit                          |
| ----------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------- |
| Defining `MyGroup` for ordinary group theory                                  | Existing group lemmas will not apply      | Use `[Group G]`                       |
| Making carrier a field of a custom structure when typeclass style fits better | Harder to use generic notation            | Follow Mathlib conventions            |
| Forgetting necessary commutativity assumptions                                | `ring` identities may need `[CommRing R]` | State algebraic assumptions precisely |
| Expecting notation without instances                                          | `*`, `1`, `⁻¹` require structure          | Add the right typeclass assumptions   |

### Task: Represent Order and Inequality — relations, ordered structures, arithmetic tactics

Order reasoning depends on relation structures and available arithmetic tactics.

```lean id="vq36pv"
example (n : Nat) : n ≤ n := by
  rfl
```

```lean id="4g16da"
example (a b c : Nat) (h₁ : a ≤ b) (h₂ : b ≤ c) : a ≤ c :=
  le_trans h₁ h₂
```

Linear arithmetic:

```lean id="o8rhid"
example (a b : Int) (h : a ≤ b) : a + 1 ≤ b + 1 := by
  omega
```

Depending on domain and imports, tactics such as `omega`, `linarith`, and `nlinarith` support different fragments of arithmetic.

| Order task                      | Construct/tactic                         | Best use                    | Caveat                                 |
| ------------------------------- | ---------------------------------------- | --------------------------- | -------------------------------------- |
| General relation reasoning      | transitivity lemmas, monotonicity lemmas | Abstract order structures   | Requires correct class assumptions     |
| Natural number inequalities     | `omega`, Nat lemmas                      | Presburger-style arithmetic | Nonlinear goals need other tools       |
| Linear ordered rings            | `linarith`                               | Linear arithmetic           | Needs suitable algebra/order structure |
| Nonlinear polynomial arithmetic | `nlinarith`, `ring` + inequalities       | Algebraic arithmetic        | Scope-limited automation               |
| Set inclusion                   | `s ⊆ t`                                  | Predicate implication       | Extensionality often needed            |
| Monotone functions              | Mathlib monotonicity abstractions        | Analysis/order proofs       | Need library literacy                  |

**Common pitfalls:**

| Pitfall                                                 | Explanation                                                    | Better habit                                          |
| ------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------- |
| Trying `ring` for inequalities                          | `ring` proves algebraic equalities, not arbitrary inequalities | Use `linarith`, `nlinarith`, `omega`, or order lemmas |
| Assuming `Nat` arithmetic behaves like `Int` arithmetic | Subtraction and order differ                                   | Choose domain carefully                               |
| Forgetting order typeclass assumptions                  | `≤` depends on a relation                                      | Inspect required structure                            |

### Task: Represent Equality, Equivalence, and Extensionality — choose the right sameness

Lean has multiple notions that can look like “same” in informal mathematics.

| Informal sameness       | Lean representation            | Example                               | Proof method                           |
| ----------------------- | ------------------------------ | ------------------------------------- | -------------------------------------- |
| Definitional equality   | Reduction to same term         | `0 + n = n`                           | `rfl`                                  |
| Propositional equality  | `a = b`                        | `n + 0 = n`                           | theorem, `rw`, `simp`                  |
| Logical equivalence     | `P ↔ Q`                        | predicate equivalence                 | `constructor`                          |
| Set equality            | `s = t`                        | equality of sets                      | extensionality, membership equivalence |
| Function equality       | `f = g`                        | pointwise equality via extensionality | `funext`                               |
| Equivalence relation    | custom relation / `Setoid`     | quotient-like reasoning               | relation-specific lemmas               |
| Isomorphism/equivalence | structure-specific equivalence | algebraic/topological equivalence     | Mathlib equivalence APIs               |

Function extensionality example:

```lean id="g3c4zh"
example {α β : Type} (f g : α → β) (h : ∀ x, f x = g x) : f = g := by
  funext x
  exact h x
```

Set extensionality shape:

```lean id="6mc2aa"
example {α : Type} (s t : Set α) (h : ∀ x, x ∈ s ↔ x ∈ t) : s = t := by
  ext x
  exact h x
```

**Design meaning:** equality is typed and intensional at the core, while extensional principles are theorems or tactics. Informal mathematics often silently shifts between equality, equivalence, isomorphism, and logical equivalence; Lean requires the intended relation.

**Common pitfalls:**

| Pitfall                                      | Explanation                                                      | Better habit                                              |
| -------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------- |
| Using `=` when `↔` is needed                 | Propositions may be equivalent without being syntactically equal | Use logical equivalence for predicates                    |
| Using equality where isomorphism is intended | Structures can be equivalent without equal                       | Use appropriate equivalence structures                    |
| Forgetting extensionality                    | Function/set equality often requires pointwise reasoning         | Use `funext`, `ext`, or Mathlib extensionality lemmas     |
| Rewriting across the wrong relation          | `rw` uses equality, not arbitrary equivalence                    | Convert relation or use relation-specific rewriting tools |

### Task: Model Unknown or Untrusted Data — parse, validate, then refine

Lean is often used for internal formal reasoning, but executable Lean programs and formalizations may still interact with external data. Unknown data should be modeled as untrusted until validated.

| Boundary task            | Construct                                      | Meaning            | Better pattern                       |
| ------------------------ | ---------------------------------------------- | ------------------ | ------------------------------------ |
| Raw input                | `String`, `ByteArray`, external representation | Untrusted data     | Parse into typed domain              |
| Parse may fail           | `Except String α` or richer error type         | Failure explicit   | Avoid partial functions              |
| Validate invariant       | predicate or decision procedure                | Establish property | Return subtype or proof              |
| Use validated value      | subtype/structure                              | Refined domain     | Keep invariant close to API boundary |
| Prove parser correctness | theorem connecting parser to specification     | Trust bridge       | Separate implementation from spec    |

Example shape:

```lean id="supg1d"
def validatePositive (n : Nat) : Except String {m : Nat // m > 0} :=
  if h : n > 0 then
    .ok ⟨n, h⟩
  else
    .error "expected positive natural number"
```

A correctness theorem might state that success implies the returned value satisfies the intended property. In this simple example, the subtype already carries the proof.

**Common pitfalls:**

| Pitfall                                                   | Explanation                                     | Better habit                                                        |
| --------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------- |
| Trusting parsed data without validation                   | External input has no internal proof            | Validate at boundary                                                |
| Returning plain data after validation                     | The proof is lost                               | Return subtype or structure with proof field when invariant matters |
| Using `panic!` for invalid input                          | Runtime failure is not a typed validation model | Use `Except`                                                        |
| Confusing parser implementation with parser specification | Correctness still needs a theorem               | State and prove parser soundness/completeness where relevant        |

### Task: Convert, Coerce, Parse, or Cast Values — safety levels and proof obligations

Conversion in Lean ranges from safe inference to explicit proof-bearing coercion.

| Mechanism            | Example                             | Safety level                          | Failure mode                        |
| -------------------- | ----------------------------------- | ------------------------------------- | ----------------------------------- |
| Type ascription      | `(3 : Nat)`                         | Safe elaboration guidance             | Type mismatch                       |
| Coercion             | subtype to underlying type          | Safe if coercion exists               | Ambiguous or missing coercion       |
| Explicit function    | `Int.ofNat n`-like conversion       | Clear transformation                  | Wrong direction or theorem mismatch |
| Parsing              | `String → Except ε α`               | Runtime/data validation               | Parse failure                       |
| Subtype construction | `⟨x, h⟩`                            | Proof-backed refinement               | Need proof `h`                      |
| Classical choice     | Choose witness from existence proof | Logically valid, may be noncomputable | Hidden noncomputability             |
| Unsafe/native cast   | Advanced trusted boundary           | Dangerous                             | Breaks guarantees if abused         |

Subtype construction:

```lean id="fo2im5"
def twoLessThanFive : {n : Nat // n < 5} :=
  ⟨2, by decide⟩
```

Coercion back to `Nat`:

```lean id="tibyek"
def asNat (x : {n : Nat // n < 5}) : Nat :=
  x
```

**Design meaning:** Lean prefers conversions that are explicit enough for the type checker and proof system. A cast is not merely an instruction to reinterpret data; it may require proof that the transformation is valid.

**Common pitfalls:**

| Pitfall                                                                  | Explanation                                                      | Better habit                                     |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------ |
| Expecting automatic conversion between `Nat`, `Int`, and rationals/reals | Coercions exist but are typed and context-dependent              | Add type annotations and use relevant lemmas     |
| Treating subtype coercion as equality                                    | A subtype value and its underlying value live in different types | Use coercions and projection lemmas              |
| Using classical choice when executable data is needed                    | Choice may be noncomputable                                      | Use explicit algorithms when computation matters |
| Hiding conversions in notation                                           | Proofs fail when coercion path is unclear                        | Inspect with `#check` and add annotations        |

### Task: Use Type Parameters and Generics — polymorphic definitions

Lean definitions are often universe-polymorphic and type-parameterized.

```lean id="u7iv9m"
def identity {α : Type} (x : α) : α :=
  x
```

```lean id="simac5"
def swapPair {α β : Type} (p : α × β) : β × α :=
  (p.2, p.1)
```

Polymorphic theorem:

```lean id="fl7k2k"
theorem List.length_append_example {α : Type} (xs ys : List α) :
    (xs ++ ys).length = xs.length + ys.length := by
  simp
```

| Generic pattern                 | Lean form                    | Use                                 |
| ------------------------------- | ---------------------------- | ----------------------------------- |
| Type parameter                  | `{α : Type}`                 | Works for any type                  |
| Multiple type parameters        | `{α β : Type}`               | Generic transformations             |
| Typeclass-constrained parameter | `{α : Type} [DecidableEq α]` | Requires operations/evidence        |
| Universe-polymorphic type       | `{α : Type u}`               | Library-level generic code          |
| Dependent parameter             | `(n : Nat) → ...`            | Later type depends on earlier value |

**Common pitfalls:**

| Pitfall                                          | Explanation                              | Better habit                              |
| ------------------------------------------------ | ---------------------------------------- | ----------------------------------------- |
| Making type parameters explicit when inferable   | Applications become noisy                | Use `{α : Type}` for inferable parameters |
| Making parameters implicit when not inferable    | Lean cannot apply theorem easily         | Make guiding arguments explicit           |
| Forgetting typeclass constraints                 | Generic operations may require instances | Add `[C α]` assumptions                   |
| Ignoring universe levels in library abstractions | Advanced generic code may fail           | Learn universes when errors expose them   |

### Task: Express Behavioral Contracts — theorem statements and specifications

A behavioral contract in Lean is usually a theorem stating what a function does.

Example function:

```lean id="jljdyr"
def reverseTwice {α : Type} (xs : List α) : List α :=
  xs.reverse.reverse
```

Specification:

```lean id="3pjwcn"
theorem reverseTwice_correct {α : Type} (xs : List α) :
    reverseTwice xs = xs := by
  simp [reverseTwice]
```

For a transformation:

```lean id="cf9a0v"
def addZeroRight (n : Nat) : Nat :=
  n + 0
```

Contract:

```lean id="k0zmd9"
theorem addZeroRight_correct (n : Nat) :
    addZeroRight n = n := by
  simp [addZeroRight]
```

| Contract type         | Example                       | Meaning                                  |
| --------------------- | ----------------------------- | ---------------------------------------- |
| Equation              | `f x = y`                     | Exact result                             |
| Preservation property | `P x → P (f x)`               | Invariant preserved                      |
| Soundness             | `algorithm x = true → Spec x` | Positive result implies specification    |
| Completeness          | `Spec x → algorithm x = true` | Specification implies algorithm succeeds |
| Round trip            | `decode (encode x) = some x`  | Serialization correctness                |
| Monotonicity          | `x ≤ y → f x ≤ f y`           | Order behavior                           |
| Extensional equality  | `∀ x, f x = g x`              | Same behavior pointwise                  |

**Design meaning:** Lean encourages making contracts explicit as reusable theorems. In ordinary programming, tests often stand in for specifications. In Lean, tests may still be useful, but theorem statements are first-class contracts.

**Common pitfalls:**

| Pitfall                                    | Explanation                                | Better habit                                        |
| ------------------------------------------ | ------------------------------------------ | --------------------------------------------------- |
| Proving only examples                      | Examples do not establish general behavior | State universally quantified theorem                |
| Writing too-specific contracts             | They do not compose with library lemmas    | Generalize where possible                           |
| Writing too-abstract contracts too early   | Proof obligations become hard to discover  | Start from intended use and generalize deliberately |
| Hiding specification inside implementation | Hard to reuse and search                   | Name correctness theorems                           |

### Theorem Statement Design — the central modeling skill

In Lean, theorem statement design is data modeling. A badly stated theorem may be true but hard to prove, impossible to reuse, or misaligned with Mathlib.

| Design choice                     | Better when                               | Risk                                                      |
| --------------------------------- | ----------------------------------------- | --------------------------------------------------------- |
| General over typeclasses          | The claim is algebraic/order-theoretic    | More instance obligations                                 |
| Concrete over `Nat`, `List`, etc. | The theorem depends on concrete recursion | Less reusable                                             |
| Assumptions as hypotheses         | Facts are local                           | Repeated parameter passing                                |
| Assumptions in subtypes           | Invariant must travel                     | Coercion/proof transport                                  |
| Equality conclusion               | Rewriting result is needed                | Too strong if only equivalence is intended                |
| `↔` conclusion                    | Predicate equivalence is intended         | Cannot rewrite everywhere as equality without extra tools |
| Existential conclusion            | Need to show existence                    | Witness may be hidden for computation                     |
| Constructive data result          | Need executable witness                   | More implementation work                                  |
| Classical theorem                 | Nonconstructive mathematics               | May require `classical` or `noncomputable`                |

Example: too specific versus reusable.

Too specific:

```lean id="o5m4hm"
example (a : Nat) : a + 0 = a := by
  simp
```

More abstract would not be true for arbitrary `Add` structures, but a related identity is meaningful for a monoid-like additive structure:

```lean id="5yxp4x"
example {M : Type} [AddMonoid M] (a : M) : a + 0 = a := by
  simp
```

The second theorem aligns with a library hierarchy and therefore benefits from generic lemmas.

**Failure-first explanation:** the tempting model is “state the theorem exactly as the textbook sentence says it.” The correct Lean model is “state the theorem so that all variables, domains, assumptions, structures, and intended rewrite forms are explicit and aligned with existing abstractions.”

**Common pitfalls:**

| Pitfall                                           | Explanation                                | Better habit                                         |
| ------------------------------------------------- | ------------------------------------------ | ---------------------------------------------------- |
| Introducing variables in the wrong order          | Later implicit inference may become harder | Put type and structure parameters before values      |
| Over-specializing to concrete types               | Library lemmas may be more general         | Generalize to typeclasses when natural               |
| Over-generalizing before proof idea is clear      | Instance obligations obscure the goal      | Prove concrete case first, then generalize if useful |
| Using conclusion shape that does not rewrite well | Later proofs become awkward                | State lemmas in simp/rewrite-friendly direction      |
### Helper Lemma Design — local facts, reusable facts, simp facts, theorem-shape control

A helper lemma is a modeling decision. It gives a name and shape to an intermediate fact so that later proofs can reuse it.

| Helper lemma type     | Purpose                                                   | Example shape                      | Best use                           | Pitfall                                    |
| --------------------- | --------------------------------------------------------- | ---------------------------------- | ---------------------------------- | ------------------------------------------ |
| Local `have`          | One proof only                                            | `have h : P := ...`                | Clarify current proof              | Cannot be reused elsewhere                 |
| Private/local theorem | File or namespace internal reuse                          | `private lemma aux ...`            | Avoid polluting public API         | May hide useful theorem if too private     |
| Public lemma          | Library-style reuse                                       | `lemma map_preserves_...`          | Reusable mathematical fact         | Bad name or bad theorem shape hurts search |
| `[simp]` lemma        | Normalization                                             | `@[simp] lemma f_zero : f 0 = ...` | Routine simplification             | Bad direction destabilizes `simp`          |
| Rewrite lemma         | Directed transformation                                   | `lemma left_to_right : lhs = rhs`  | Controlled rewriting               | Direction may be inconvenient              |
| Extensionality lemma  | Reduce equality to fields/points                          | `@[ext] theorem ...`               | Structures, sets, functions        | Overuse can create noisy proof search      |
| Bridge lemma          | Connect `Bool` and `Prop`, custom and library definitions | `test x = true ↔ Spec x`           | Computation/specification boundary | Missing bridge traps later proofs          |

Example local helper:

```lean
example (P Q R : Prop) (h₁ : P → Q) (h₂ : Q → R) (hP : P) : R := by
  have hQ : Q := h₁ hP
  exact h₂ hQ
```

Example reusable helper:

```lean
lemma List.length_singleton {α : Type} (x : α) :
    ([x] : List α).length = 1 := by
  simp
```

Example bridge lemma shape:

```lean
def isZeroBool (n : Nat) : Bool :=
  n == 0

def IsZeroProp (n : Nat) : Prop :=
  n = 0

-- Shape only; actual proof depends on chosen equality lemmas.
theorem isZeroBool_correct (n : Nat) :
    isZeroBool n = true ↔ IsZeroProp n := by
  unfold isZeroBool IsZeroProp
  simp
```

**Design meaning:** helper lemmas should be shaped for future use. A theorem that proves the right fact in the wrong direction may be difficult to rewrite with. A theorem that is too concrete may not apply to the next proof. A theorem marked `[simp]` becomes part of an automated normalization regime, so its shape affects many future proofs.

**Professional rule:** if a proof becomes unreadable because the main theorem contains too many tactical details, extract the mathematical step as a helper lemma. If a helper lemma is only a tactic convenience and has no conceptual value, keep it local.

**Common Pitfalls**

| Pitfall                                      | Explanation                                                 | Better habit                                     |
| -------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------ |
| Marking every helper lemma as `[simp]`       | The simplifier becomes unstable or slow                     | Mark only canonical normalization lemmas         |
| Naming lemmas after tactics                  | `helper_by_cases` is not searchable by mathematical content | Name by statement meaning                        |
| Keeping important bridge lemmas local        | Later users must rediscover the connection                  | Promote central specification bridges            |
| Proving a helper in an over-specific context | It cannot be reused when the main theorem generalizes       | Generalize parameters when the proof is the same |

### Task: Design Simp-Friendly Data and Theorems — normal forms, projections, canonical directions

Lean formalization depends heavily on simplification. Data definitions and theorem statements should often be designed so that routine expressions simplify toward predictable normal forms.

| Modeling target           | Simp-friendly shape                  | Bad shape                          | Reason                                                |                                       |
| ------------------------- | ------------------------------------ | ---------------------------------- | ----------------------------------------------------- | ------------------------------------- |
| Identity law              | `x * 1 = x`, `x + 0 = x`             | `x = x * 1` as simp lemma          | Simplifies by removing neutral element                |                                       |
| Projection from structure | `({ x := a, y := b } : Point).x = a` | Expanding all fields unnecessarily | Projections should reduce cleanly                     |                                       |
| List append identity      | `xs ++ [] = xs`                      | `xs = xs ++ []` as simp lemma      | Removes redundant append                              |                                       |
| Boolean test bridge       | `test x = true ↔ Spec x`             | Only one awkward implication       | Enables rewriting between computation and proposition |                                       |
| Option elimination        | `match some x with ... = ...`        | Obscure custom encodings           | Constructors should expose computation                |                                       |
| Set membership            | `x ∈ {y                              | P y} ↔ P x`                        | Extra wrapper predicates                              | Membership should unfold to predicate |

Example structure projection:

```lean
structure Point where
  x : Nat
  y : Nat

example (a b : Nat) : ({ x := a, y := b } : Point).x = a := by
  rfl
```

Example list normal form:

```lean
example {α : Type} (xs : List α) : xs ++ [] = xs := by
  simp
```

Example set membership:

```lean
example (x : Nat) : x ∈ ({n : Nat | n > 0}) ↔ x > 0 := by
  rfl
```

**Design meaning:** simp-friendly modeling means definitions and lemmas expose the computational or logical structure that Lean’s simplifier can normalize reliably. It does not mean every proof should be `by simp`.

**Failure-first explanation:** the tempting model is to state lemmas in whichever direction is first discovered. The correct Lean model is to distinguish *truth* from *normalization direction*. Both `x + 0 = x` and `x = x + 0` are true, but only the first is a good simplification rule.

**Common Pitfalls**

| Pitfall                                       | Explanation                                                   | Better habit                                                     |
| --------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| Adding commutativity as a global simp rule    | It can rewrite back and forth or create unstable normal forms | Use commutativity explicitly or through algebraic tactics        |
| Letting definitions unfold too aggressively   | Goals become low-level and noisy                              | Control unfolding with `simp [name]` locally                     |
| Hiding normal forms behind custom wrappers    | `simp` cannot see intended simplifications                    | Provide projection and membership lemmas                         |
| Mistaking simp-friendliness for proof quality | A central mathematical argument should not be hidden          | Use `calc`, helper lemmas, or explicit rewrites when explanatory |

### Task: Model Computation-Specification Pairs — executable functions plus correctness theorems

Many Lean developments need both executable definitions and logical specifications. The common pattern is:

1. Define an executable function.
2. Define or identify a `Prop` specification.
3. Prove soundness, completeness, or exact correctness.

| Pair type              | Executable side        | Specification side            | Typical theorem                                       |
| ---------------------- | ---------------------- | ----------------------------- | ----------------------------------------------------- |
| Boolean predicate      | `α → Bool`             | `α → Prop`                    | `test x = true ↔ P x`                                 |
| Parser                 | `String → Except ε α`  | grammar or validity predicate | success implies validity; completeness if appropriate |
| Simplifier             | syntax transformation  | semantic equivalence          | `eval (simp e) = eval e`                              |
| Optimizer              | program transformation | behavioral equivalence        | semantics preserved                                   |
| Decision procedure     | algorithmic checker    | mathematical claim            | checker soundness/completeness                        |
| Normalization function | canonicalization       | equivalence relation          | output equivalent to input and normal                 |

Expression example:

```lean
inductive Expr where
  | const : Nat → Expr
  | add : Expr → Expr → Expr
deriving Repr, DecidableEq

def Expr.eval : Expr → Nat
  | .const n => n
  | .add e₁ e₂ => e₁.eval + e₂.eval

def Expr.addZeroRight : Expr → Expr
  | .add e (.const 0) => e.addZeroRight
  | .add e₁ e₂ => .add e₁.addZeroRight e₂.addZeroRight
  | .const n => .const n

theorem Expr.addZeroRight_correct (e : Expr) :
    e.addZeroRight.eval = e.eval := by
  induction e with
  | const n =>
      rfl
  | add e₁ e₂ ih₁ ih₂ =>
      cases e₂ with
      | const n =>
          cases n with
          | zero =>
              simp [Expr.addZeroRight, Expr.eval, ih₁]
          | succ n =>
              simp [Expr.addZeroRight, Expr.eval, ih₁]
      | add a b =>
          simp [Expr.addZeroRight, Expr.eval, ih₁, ih₂]
```

This example is intentionally small, but the modeling pattern is serious. It is the same kind of pattern used in programming-language metatheory, verified transformations, parsers, symbolic simplifiers, and decision procedures.

**Design tradeoff:** executable definitions are useful for computation, testing, and automation. Proposition-level specifications are useful for proof. The bridge theorem is the formal contract between them.

**Common Pitfalls**

| Pitfall                                            | Explanation                              | Better habit                                            |
| -------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------- |
| Writing only the executable checker                | It does not state what correctness means | Define a proposition-level specification                |
| Writing only the specification                     | It may not compute or support automation | Add executable function when computation matters        |
| Proving only soundness when completeness is needed | The checker may reject valid cases       | State both directions when relevant                     |
| Making the correctness theorem too weak            | Later proofs cannot use it               | State the theorem in the form downstream proofs require |

### Task: Model Inductive Propositions and Relations — derivations as data

Not every logical predicate is best modeled as a function returning `Prop`. Some predicates are naturally **inductively generated relations**. This is common in operational semantics, typing judgments, reachability, grammar derivations, and inference systems.

Example: even numbers as an inductive proposition.

```lean
inductive Even : Nat → Prop where
  | zero : Even 0
  | add_two : ∀ n, Even n → Even (n + 2)
```

Using the constructors:

```lean
example : Even 0 :=
  Even.zero

example : Even 2 :=
  Even.add_two 0 Even.zero
```

A proof by induction on derivation:

```lean
theorem Even.not_one : ¬ Even 1 := by
  intro h
  cases h
```

Example small-step relation shape:

```lean
inductive Step : Expr → Expr → Prop where
  | add_left {e₁ e₁' e₂ : Expr} :
      Step e₁ e₁' → Step (.add e₁ e₂) (.add e₁' e₂)
  | add_right {n : Nat} {e₂ e₂' : Expr} :
      Step e₂ e₂' → Step (.add (.const n) e₂) (.add (.const n) e₂')
  | add_const {n m : Nat} :
      Step (.add (.const n) (.const m)) (.const (n + m))
```

| Modeling choice               | Use when                               | Proof method                      |
| ----------------------------- | -------------------------------------- | --------------------------------- |
| Predicate function `α → Prop` | Property has direct logical definition | Unfold definition, use logic      |
| Inductive proposition         | Property is generated by rules         | Induction on derivation           |
| Binary inductive relation     | Operational or transition system       | Cases/induction on relation proof |
| Recursive Boolean checker     | Need executable decision               | Prove bridge theorem              |
| Typeclass relation            | Relation belongs to reusable structure | Use existing hierarchy            |

**Design meaning:** an inductive proposition makes proofs of the proposition into structured derivation trees. This is ideal when the shape of the proof matters.

**Common Pitfalls**

| Pitfall                                                             | Explanation                                            | Better habit                                |
| ------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------- |
| Modeling rule-generated judgments as opaque predicates              | You lose induction over derivations                    | Use `inductive` for inference rules         |
| Using inductive propositions when a simple definition suffices      | Proofs become unnecessarily constructor-heavy          | Use direct predicates for simple properties |
| Forgetting indexes in inductive propositions                        | The proposition cannot express the intended dependency | Index by the values the judgment concerns   |
| Proving by induction on data when induction on derivation is needed | The structure of evidence matters                      | Induct on the proof of the relation         |

### Task: Model Type Safety Boundaries — what Lean proves, assumes, or computes

Lean can express strong guarantees, but every guarantee has a boundary. A model should distinguish checked facts, assumed facts, computable checks, and trusted extensions.

| Boundary            | Lean representation                    | Trust status                                | Example                                     |
| ------------------- | -------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| Checked theorem     | `theorem ... := proof`                 | Kernel-checked                              | arithmetic/list/algebra theorem             |
| Assumed fact        | `axiom`, `constant`, `sorry`           | Trusted/admitted                            | unfinished proof or foundational assumption |
| Computable check    | `Bool`, `Option`, `Except`             | Runtime/executable behavior                 | parser/checker                              |
| Proof-carrying data | subtype/structure with proof field     | Checked when constructed                    | positive natural                            |
| Typeclass instance  | instance declaration                   | Checked fields, then inferred               | group/order instance                        |
| Classical existence | `Classical.choice`, noncomputable defs | Logically accepted, computationally limited | choose witness from existence               |
| Unsafe code         | `unsafe`, native/trusted mechanisms    | Outside ordinary guarantees                 | advanced runtime/metaprogramming boundary   |

**Professional rule:** do not confuse “accepted by Lean with `sorry`” and “proved in Lean.” A theorem containing `sorry` is a checked declaration only modulo an admitted placeholder. In a teaching corpus, `sorry` is useful as a proof hole. In a verified artifact, it is proof debt.

Example:

```lean
theorem unfinished (n : Nat) : n + 0 = n := by
  sorry
```

This declaration lets later code use `unfinished`, but the proof has not been supplied.

**Common Pitfalls**

| Pitfall                                                       | Explanation                                                 | Better habit                                   |
| ------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------- |
| Treating `sorry` as harmless because the file compiles        | It admits the target proposition                            | Search for and eliminate proof debt            |
| Using `axiom` for convenience                                 | It extends the trusted base                                 | Use only for explicit foundational assumptions |
| Calling a Boolean checker “proof” without correctness theorem | It computes but does not establish `Prop` by itself         | Prove soundness/completeness                   |
| Ignoring `noncomputable`                                      | A definition may be mathematically valid but not executable | Track computational content explicitly         |

### Task: Use Existing Mathlib Abstractions — avoid parallel universes

Lean’s data modeling is strongly shaped by `Mathlib`. Many mathematical objects already have canonical definitions, notations, structures, and lemmas. Professional formalization usually means aligning with them.

| Mathematical need                    | Usually prefer                                                     | Avoid unless pedagogical                  |
| ------------------------------------ | ------------------------------------------------------------------ | ----------------------------------------- |
| Semigroup/monoid/group/ring          | Existing algebraic classes                                         | Custom algebra structures                 |
| Order                                | Existing preorder/order/lattice classes                            | Custom relation packages                  |
| Set-like reasoning                   | `Set α`, `Finset α`, relevant Mathlib APIs                         | Ad hoc predicates without lemmas          |
| Equivalence relation/quotient        | Existing setoid/quotient infrastructure                            | Manual equivalence classes                |
| Functions and maps                   | Existing function, embedding, equivalence, homomorphism structures | Custom map structures                     |
| Natural/int/rational/real arithmetic | Existing numeric towers and coercion lemmas                        | Local numeric encodings                   |
| Topology/metric/analysis             | Existing topology and analysis hierarchy                           | Rebuilding limits/continuity from scratch |
| Measure theory                       | Existing measure-theoretic abstractions                            | Custom sigma-algebra/measure definitions  |

Example using Mathlib algebra:

```lean
example {G : Type} [Group G] (a b : G) :
    a * b * b⁻¹ = a := by
  simp [mul_assoc]
```

Example using set extensionality:

```lean
example {α : Type} (s t : Set α)
    (h : ∀ x, x ∈ s ↔ x ∈ t) : s = t := by
  ext x
  exact h x
```

**Design tradeoff:** using Mathlib abstractions gives access to a large theorem ecosystem. The cost is that the abstraction level may be higher than the original informal problem. The model may need typeclass assumptions, coercion management, namespaces, and theorem search.

**Common Pitfalls**

| Pitfall                                                                      | Explanation                                   | Better habit                                                          |
| ---------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------- |
| Rebuilding standard structures                                               | Existing lemmas and automation will not apply | Search Mathlib first                                                  |
| Forcing a textbook-specific definition when Mathlib has a better abstraction | Later integration becomes painful             | Use textbook definitions as pedagogical bridges only                  |
| Importing all of Mathlib to hide modeling uncertainty                        | Convenient but may obscure dependencies       | Explore broadly, then refine imports when needed                      |
| Misreading generalized theorem statements                                    | Abstract assumptions can look intimidating    | Identify carrier type, structure instances, variables, and conclusion |

### Tao Analysis Corpus as Modeling Case Material — textbook definitions, library definitions, and theorem anchors

The Tao Analysis companion is valuable for PART 3 because it exposes a real modeling tension: formalizing a textbook faithfully versus using the most library-native abstraction.

A textbook development may introduce natural numbers, integers, rationals, reals, sequences, limits, and set operations in a pedagogical order. Mathlib already contains sophisticated versions of many of these concepts. A Lean tutorial can use the corpus to show how definitions evolve from local pedagogical models toward reusable library concepts.

| Case type                | Modeling issue exposed                     | Lean mechanism exercised                  |
| ------------------------ | ------------------------------------------ | ----------------------------------------- |
| Natural number laws      | Recursive definitions vs library theorems  | induction, `simp`, arithmetic lemmas      |
| Set operations           | Predicate-style sets and extensionality    | `Set`, membership, `ext`, rewriting       |
| Integers/rationals/reals | Construction vs existing numeric hierarchy | coercions, algebraic structures, order    |
| Sequences                | Functions from `Nat` to a type             | function types, limits, eventual behavior |
| Limits and convergence   | Quantifier-heavy analysis statements       | theorem statement design, inequalities    |
| Exercises with `sorry`   | Proof obligations as modeling tests        | helper lemma design, tactic choice        |
| Transition to Mathlib    | Local definitions vs standard abstractions | library search, theorem alignment         |

**Professional distinction:** if a source file mirrors a textbook, its definition order may be pedagogically motivated. If a source file is intended for library reuse, its definitions should usually align with Mathlib hierarchy. Both are legitimate, but they optimize different things.

**Common Pitfalls**

| Pitfall                                                            | Explanation                                      | Better habit                                                 |
| ------------------------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------------------ |
| Treating textbook-faithful code as universal idiom                 | It may intentionally avoid existing abstractions | Compare with Mathlib-native style                            |
| Treating Mathlib-native code as pedagogically transparent          | It may rely on advanced hierarchy                | Use theorem anchors to bridge                                |
| Using real analysis examples before mastering quantifier structure | Goals become unreadable                          | First identify variables, hypotheses, and target proposition |
| Ignoring `sorry` distribution                                      | Proof holes reveal modeling difficulty           | Treat `sorry`s as signals of central proof obligations       |

### Task: Model Reusable Generic Helpers — type parameters, class constraints, theorem polymorphism

Generic helpers should be parameterized over the right level of abstraction.

| Helper goal               | Good abstraction level                      | Example                                |
| ------------------------- | ------------------------------------------- | -------------------------------------- |
| Works for any type        | `{α : Type}`                                | list length, identity, pair swap       |
| Needs equality test       | `[DecidableEq α]`                           | membership decision, duplicate removal |
| Needs order               | `[LE α]`, `[Preorder α]`, `[LinearOrder α]` | monotonicity/order algorithms          |
| Needs algebraic operation | `[Mul M]`, `[Monoid M]`, `[Group G]`        | product, inverse, cancellation         |
| Needs ring normalization  | `[Semiring R]`, `[Ring R]`, `[CommRing R]`  | polynomial identities                  |
| Needs topology            | `[TopologicalSpace X]`                      | continuity/limit statements            |
| Needs measure theory      | measure-related structures                  | integration/measurability statements   |

Example overly concrete helper:

```lean
def NatListFirstOrZero : List Nat → Nat
  | [] => 0
  | x :: _ => x
```

More generic version:

```lean
def List.first? {α : Type} : List α → Option α
  | [] => none
  | x :: _ => some x
```

Example with typeclass constraint:

```lean
def firstOrDefault {α : Type} [Inhabited α] : List α → α
  | [] => default
  | x :: _ => x
```

**Design meaning:** generality should be earned by the operation’s actual requirements. If the function only needs an arbitrary type, do not require algebraic structure. If the proof needs multiplication and identity laws, state the appropriate typeclass.

**Common Pitfalls**

| Pitfall                                        | Explanation                          | Better habit                                   |
| ---------------------------------------------- | ------------------------------------ | ---------------------------------------------- |
| Adding unnecessary class constraints           | Makes theorem harder to use          | Require only what the definition/proof needs   |
| Using concrete types when polymorphism is free | Reduces reuse                        | Generalize over `{α : Type}` where natural     |
| Using too-weak constraints                     | Not enough laws available            | Choose structure that supplies needed lemmas   |
| Hiding constraints in local instances          | Future users cannot see requirements | Put essential assumptions in theorem statement |

### Task: Model APIs and Public Boundaries — expose stable concepts, hide implementation details

Lean modules and namespaces are not only organization tools. They are modeling boundaries. A public theorem or definition should expose the concept users need, not accidental implementation details.

| API design choice       | Better when                           | Risk                                   |
| ----------------------- | ------------------------------------- | -------------------------------------- |
| Expose predicate        | Users reason about property           | May need separate computation          |
| Expose Boolean checker  | Users execute decision                | Needs correctness theorem              |
| Expose subtype          | Users need invariant-carrying values  | Proof/coercion overhead                |
| Expose structure        | Object has stable named fields        | Field changes break users              |
| Expose class            | Many types implement same abstraction | Instance search complexity             |
| Hide helper definitions | Implementation may change             | Users cannot rely on internals         |
| Expose helper lemmas    | Users need proof reuse                | Too many weak lemmas clutter namespace |

Example design pair:

```lean
namespace DemoAPI

def IsSmall (n : Nat) : Prop :=
  n < 10

def checkSmall (n : Nat) : Bool :=
  n < 10

theorem checkSmall_correct (n : Nat) :
    checkSmall n = true ↔ IsSmall n := by
  unfold checkSmall IsSmall
  simp

end DemoAPI
```

The namespace exposes a predicate, a checker, and a bridge theorem. This is a clean API when both proof and computation are relevant.

**Common Pitfalls**

| Pitfall                                                | Explanation                             | Better habit                                            |
| ------------------------------------------------------ | --------------------------------------- | ------------------------------------------------------- |
| Exposing implementation-specific recursive definitions | Later refactors break downstream proofs | Expose specification theorems                           |
| Hiding all helper lemmas                               | Users cannot prove natural facts        | Expose stable rewrite/spec lemmas                       |
| Exposing too many theorem variants                     | Search becomes noisy                    | Prefer canonical statements and derive variants locally |
| Designing APIs without theorem search in mind          | Names become hard to discover           | Use namespace- and statement-oriented names             |

### Task: Model Partial Functions — preconditions, `Option`, `Except`, subtypes

Lean functions are total. Partiality must be modeled.

| Partiality pattern             | Lean model                         | Example use                                  |
| ------------------------------ | ---------------------------------- | -------------------------------------------- |
| Failure allowed without reason | `Option α`                         | safe head, predecessor                       |
| Failure with reason            | `Except ε α`                       | parser, validator                            |
| Caller provides proof          | `(h : P) → α`                      | division with nonzero denominator            |
| Domain restricted by subtype   | `{x : α // P x} → β`               | function on positive naturals                |
| Classical partial selection    | noncomputable choice               | advanced existence-based construction        |
| Panic/partial runtime          | `panic!`, partial-like programming | executable convenience only, not proof model |

Example predecessor:

```lean
def predOption : Nat → Option Nat
  | 0 => none
  | n + 1 => some n
```

Example proof-required version:

```lean
def predPositive (n : Nat) (h : n > 0) : Nat :=
  n - 1
```

Example subtype version:

```lean
def predPositiveSubtype (n : {k : Nat // k > 0}) : Nat :=
  n.val - 1
```

**Design tradeoff:** `Option` is easy for computation. Preconditions are natural for theorem statements. Subtypes enforce valid inputs at the API boundary. `Except` communicates failure reasons. The best representation depends on whether the caller should handle absence, supply proof, or never construct invalid input.

**Common Pitfalls**

| Pitfall                                                             | Explanation                                           | Better habit                                           |
| ------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------ |
| Pretending a partial operation is total by returning default values | Hides invalid cases                                   | Use `Option`/`Except` or preconditions                 |
| Using proof preconditions in executable parsing contexts            | External caller cannot provide proof until validation | Validate first, then refine                            |
| Using `Option` when failure reason matters                          | Diagnostics lost                                      | Use `Except`                                           |
| Using subtype APIs for casual internal functions                    | Proof overhead may dominate                           | Use local hypotheses unless boundary needs enforcement |

### Task: Model Finite Domains and Enumeration — `Fin`, `Finset`, inductives, decidability

Finite domains appear in combinatorics, finite sums, indexing, enumeration, and algorithms.

| Finite modeling need | Construct                               | Use                                  |
| -------------------- | --------------------------------------- | ------------------------------------ |
| Exactly named cases  | `inductive`                             | Semantic finite alternatives         |
| Numbers below bound  | `Fin n`                                 | Safe indexing, finite numeric domain |
| Finite set of values | `Finset α`                              | Finite set reasoning                 |
| List enumeration     | `List α`                                | Ordered finite collection            |
| Decidable membership | `[DecidableEq α]`, decidable predicates | Computable finite reasoning          |
| Finite typeclass     | Mathlib finite type abstractions        | Summation over finite types          |

Example finite index:

```lean
def idx0 : Fin 3 :=
  ⟨0, by decide⟩
```

Example finite set shape:

```lean
example : (1 : Nat) ∈ ({1, 2, 3} : Finset Nat) := by
  simp
```

**Design meaning:** finite mathematical reasoning and finite executable enumeration are related but distinct. `Finset` is set-like and finite. `List` is sequence-like and ordered. `Fin n` is index-like and bounded.

**Common Pitfalls**

| Pitfall                                              | Explanation                                         | Better habit                        |
| ---------------------------------------------------- | --------------------------------------------------- | ----------------------------------- |
| Using `List` when duplicates/order should not matter | Proofs need permutation or nodup reasoning          | Use `Finset`                        |
| Using `Finset` when order matters                    | Order is abstracted away                            | Use `List` or `Array`               |
| Using `Nat` for bounded indices                      | Invalid indices possible                            | Use `Fin n` or safe lookup APIs     |
| Forgetting decidability requirements                 | Finite set operations often need equality decisions | Add `[DecidableEq α]` when required |

### Task: Model Quantifier-Heavy Statements — variables, hypotheses, target shape

Analysis, algebra, topology, measure theory, and semantics often require theorem statements with many quantifiers. Lean makes the structure explicit.

Example shape for a property of sequences:

```lean
def Sequence (α : Type) :=
  Nat → α
```

A simple pointwise equality theorem shape:

```lean
example {α : Type} (u v : Sequence α)
    (h : ∀ n : Nat, u n = v n) :
    u = v := by
  funext n
  exact h n
```

For analysis-style statements, the main modeling problem is not syntax but quantifier structure: which variables are fixed, which are arbitrary, which assumptions are local, and what conclusion is being proved.

| Statement feature      | Modeling question                                                       |
| ---------------------- | ----------------------------------------------------------------------- |
| Universal quantifier   | Should this variable be a theorem parameter or introduced inside proof? |
| Existential quantifier | Is the witness data, proof-level existence, or chosen noncomputably?    |
| Implication            | Is this a theorem assumption or a local conditional proof step?         |
| Conjunction            | Are both facts needed together or should they be separate hypotheses?   |
| Inequality             | Which ordered structure supplies the relation?                          |
| Limit/topology concept | Is the Mathlib abstraction already available?                           |
| Set membership         | Is the set a predicate, finite set, or subtype domain?                  |

**Failure-first explanation:** the wrong model is to translate an English sentence linearly into Lean symbols. The correct model is to identify the dependency structure. Later variables may depend on earlier values. Hypotheses may need to be generalized to make induction or library lemmas apply.

**Common Pitfalls**

| Pitfall                                                                | Explanation                                  | Better habit                                           |
| ---------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------ |
| Placing assumptions after conclusions informally                       | Lean requires exact binder structure         | Write quantifiers and hypotheses deliberately          |
| Using conjunction for assumptions that should be separate              | Proof scripts become projection-heavy        | Use separate hypotheses unless bundled fact is natural |
| Writing existential conclusions when a constructive function is needed | Witness may not be computationally available | Return data or subtype if computation matters          |
| Ignoring existing analysis abstractions                                | Rebuilding limits/continuity is costly       | Search Mathlib before defining                         |

### Data Modeling Option Table — strength, cost, best use

| Modeling option              | Strength                        | Cost                          | Best use                   | Avoid when                             |
| ---------------------------- | ------------------------------- | ----------------------------- | -------------------------- | -------------------------------------- |
| Plain type/value             | Simple, executable              | Few built-in invariants       | Computation-first data     | Invalid states must be impossible      |
| Predicate `α → Prop`         | Flexible reasoning              | Does not carry data by itself | Mathematical properties    | Computable decision is central         |
| Boolean `α → Bool`           | Executable                      | Needs correctness bridge      | Algorithms/checkers        | Theorem statement is primary           |
| `Option α`                   | Simple partiality               | No error detail               | Missing value              | Need reason for failure                |
| `Except ε α`                 | Explicit failure reason         | More handling                 | Parsing/validation         | Failure impossible by construction     |
| Subtype `{x // P x}`         | Invariant-carrying value        | Proof/coercion overhead       | API boundary invariants    | Local proof assumption suffices        |
| Structure                    | Named fields, package data/laws | More declarations             | Stable domain object       | Shape is temporary                     |
| Inductive type               | Exhaustive cases and induction  | Constructor design matters    | Finite/recursive data      | Existing type already fits             |
| Inductive proposition        | Derivation structure            | More proof constructors       | Inference rules/semantics  | Simple predicate suffices              |
| Typeclass                    | Reusable inferred structure     | Instance search complexity    | Algebra/order/general APIs | One-off local data                     |
| Existing Mathlib abstraction | Maximum reuse                   | Requires library literacy     | Standard mathematics       | Pedagogical reconstruction is intended |
| Noncomputable choice         | Powerful existence use          | No executable content         | Classical mathematics      | Computation is needed                  |

### Conversion and Safety Table — from values to refined values

| Conversion mechanism        | Source                   | Target                 | Safety level            | Proof burden                               | Typical use                        |
| --------------------------- | ------------------------ | ---------------------- | ----------------------- | ------------------------------------------ | ---------------------------------- |
| Type ascription             | ambiguous term           | specified type         | safe                    | none if elaborates                         | disambiguate literals/notation     |
| Coercion                    | structured/subtype value | expected supertype     | safe if coercion exists | usually none at use site                   | subtype to carrier, numeric towers |
| Constructor                 | fields                   | structure/inductive    | safe                    | proof fields required                      | build domain objects               |
| Parser                      | raw external data        | typed value            | runtime checked         | correctness theorem optional but important | external input                     |
| Validator                   | raw typed value          | subtype/refined object | proof-producing         | condition proof required                   | trusted boundary                   |
| Theorem rewrite             | term under equality      | equal term             | proof-based             | equality proof required                    | normalization and transport        |
| Classical choice            | existence proof          | selected witness       | logically accepted      | noncomputable                              | advanced mathematics               |
| Unsafe cast/native boundary | arbitrary                | arbitrary              | trusted/dangerous       | external trust                             | low-level advanced code only       |

### PART 3 Summary — data modeling as proof-oriented representation design

PART 3 established that Lean data modeling is not merely the choice of runtime representation. It is the design of a typed formal object that supports computation, theorem statements, proof search, simplification, library reuse, and maintainability.

The central modeling distinctions are:

| Distinction                                    | Practical meaning                                                            |
| ---------------------------------------------- | ---------------------------------------------------------------------------- |
| Data vs proposition                            | `Nat`, `List α`, structures compute; `Prop` states claims                    |
| Boolean vs predicate                           | `Bool` supports computation; `Prop` supports proof                           |
| Existence vs value                             | `∃ x, P x` proves existence; subtype carries an actual witness with evidence |
| Local hypothesis vs invariant-carrying type    | Hypotheses are lightweight; subtypes/structures enforce boundaries           |
| `List` vs `Array` vs `Set` vs `Finset`         | Sequence, efficient array, predicate set, finite set are different models    |
| Plain function vs partial function             | Lean functions are total; partiality must be represented                     |
| Concrete theorem vs typeclass-general theorem  | Concrete statements are direct; abstract statements reuse hierarchy          |
| Custom structure vs Mathlib abstraction        | Custom definitions can teach; Mathlib abstractions scale                     |
| Definitional equality vs propositional theorem | Some models compute cleanly; others require rewrite lemmas                   |
| Executable checker vs correctness theorem      | Computation alone is not a proof of specification                            |

For Lean 4, the professional modeling question is:

**What representation makes the intended theorem statements natural, the proof obligations visible, the simplifier predictable, and Mathlib reuse possible?**

A model is good when its constructors match the natural cases, its theorem statements expose the right assumptions, its invariants are carried only where useful, its helper lemmas have reusable shapes, and its abstractions align with the surrounding library.

## PART 4 — Control Flow, Functions, Abstraction, and Composition by Task Pattern

### Purpose and Scope — behavior, proof construction, abstraction, and compositional design

PART 4 explains how Lean 4 expresses **behavior**: ordinary functions, recursive definitions, pattern matching, proof construction, tactic-guided reasoning, equational reasoning, abstraction, and composition. This follows the uploaded specification’s requirement that Lean 4 be taught through term proofs, tactic proofs, rewriting, simplification, induction, helper lemmas, automation boundaries, theorem anchors, and proof-state interpretation rather than as a tactic-name catalog .

In Lean, “control flow” has two related but distinct meanings.

| Domain              | Control-flow-like construct                                                            | What is being controlled                        |
| ------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Programming         | `if`, `match`, recursion, `do`, `for`, monadic bind                                    | Runtime or definitional computation             |
| Proof construction  | `intro`, `cases`, `induction`, `constructor`, `rw`, `simp`, `calc`, `have`, `suffices` | Goal transformation and proof-term construction |
| Type-level modeling | dependent binders, pattern matching, indexed types                                     | Which types and propositions are available      |
| Automation          | tactics such as `simp`, `omega`, `ring`, `linarith`, `aesop`                           | Search or normalization over proof obligations  |

The central Lean-specific idea is that many proof steps are also forms of function construction, case analysis, recursion, or composition. `intro` constructs a function. `cases` eliminates an inductive value or proof. `induction` follows an induction principle. `constructor` builds a value or proof with a constructor. `rw` composes the current goal with an equality proof. `simp` normalizes according to selected rewrite rules.

### Task: Choose the Right Behavioral Form — function, theorem, tactic, recursion, automation

| Task                             | Preferred construct                           | Canonical use                        | Design meaning                        | Common failure mode                            |
| -------------------------------- | --------------------------------------------- | ------------------------------------ | ------------------------------------- | ---------------------------------------------- |
| Define computable behavior       | `def`, functions, recursion, pattern matching | evaluator, parser, transformation    | Produces executable or reducible term | Definition computes but is hard to prove about |
| State behavioral contract        | `theorem` / `lemma`                           | correctness theorem                  | Specification as proposition          | Contract too weak or too specific              |
| Prove direct implication         | term proof or `intro`/`exact`                 | logic composition                    | Proof as function                     | Tactic overkill hides simple structure         |
| Split structured goal            | `constructor`                                 | conjunction, equivalence, structures | Build constructor fields              | Losing track of subgoals                       |
| Analyze alternatives             | `cases`, `match`                              | disjunction, inductive data          | Eliminate constructors                | Using cases when induction is needed           |
| Prove recursive property         | `induction`                                   | natural numbers, lists, syntax trees | Use induction principle               | Induction hypothesis too weak                  |
| Transform equality goal          | `rw`, `calc`                                  | equation chains                      | Explicit equality reasoning           | Wrong rewrite direction                        |
| Normalize routine facts          | `simp`                                        | identities, projections, membership  | Controlled simplification             | Blind simplification                           |
| Prove arithmetic/algebraic goals | `omega`, `ring`, `linarith`, `nlinarith`      | arithmetic fragments                 | Domain-specific proof search          | Using tactic outside its fragment              |
| Compose proof steps              | `have`, `suffices`, helper lemmas             | readable proof architecture          | Named intermediate claims             | Overly long anonymous proof term               |
| Reuse existing facts             | Mathlib theorem search                        | library-centered proof               | Avoid reproving                       | Poor theorem-shape alignment                   |

**Professional rule:** choose the construct that matches the *mathematical shape* of the goal. Do not choose tactics by habit. A conjunction goal wants a constructor. A disjunction hypothesis wants cases. A recursive statement wants induction. An equality chain wants `calc` or directed rewriting. A routine normal form wants `simp`.

### Task: Design Function Signatures — explicit, implicit, typeclass, dependent arguments

Function signatures are abstraction boundaries. In Lean, their argument structure determines not only how functions are called but also how theorem statements elaborate and how later proofs reuse them.

| Signature pattern        | Example shape             | Use when                              | Pitfall                                             |
| ------------------------ | ------------------------- | ------------------------------------- | --------------------------------------------------- |
| Explicit value argument  | `(n : Nat) → ...`         | Caller should supply value visibly    | Too many explicit type parameters create noise      |
| Implicit type parameter  | `{α : Type} → ...`        | Type can be inferred from values      | Inference fails if no later argument determines it  |
| Typeclass argument       | `[Monoid M] → ...`        | Structure should be inferred          | Missing instances create indirect errors            |
| Proof argument           | `(h : P) → ...`           | Caller must supply evidence           | Overusing proof arguments where subtype fits better |
| Dependent argument       | `(n : Nat) → Fin n → ...` | Later type depends on earlier value   | Argument order matters strongly                     |
| Named theorem hypotheses | `(h₁ : P) (h₂ : Q)`       | Proof readability matters             | Bundling too much into conjunctions                 |
| Curried form             | `(x : α) → (y : β) → γ`   | Partial application and theorem style | Readers from tuple-heavy languages may misread it   |
| Structure argument       | `(cfg : Config)`          | Many related fields travel together   | Over-bundling unstable parameters                   |

Example: generic function with implicit type parameter.

```lean
def applyTwice {α : Type} (f : α → α) (x : α) : α :=
  f (f x)
```

Example: typeclass-constrained function.

```lean
def combineWithOne {M : Type} [Monoid M] (x : M) : M :=
  x * 1
```

Example: dependent argument order.

```lean
def getByFin {α : Type} (xs : Array α) (i : Fin xs.size) : α :=
  xs[i]
```

Here `i : Fin xs.size` depends on the earlier argument `xs`. Reversing the order is not merely cosmetic; the type of `i` needs `xs`.

**Failure-first explanation:** the tempting model is to place arguments in the order they sound natural in English. The correct Lean model is to place them in an order that supports dependency, inference, typeclass search, and theorem application.

**Common Pitfalls**

| Pitfall                                             | Explanation                                       | Better habit                                                               |
| --------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------- |
| Making inferable type parameters explicit           | Calls become noisy and proof scripts brittle      | Use implicit braces for inferable types                                    |
| Making non-inferable arguments implicit             | Lean cannot synthesize them                       | Make arguments explicit if they guide elaboration                          |
| Placing dependent arguments before dependencies     | Later types cannot mention earlier missing values | Put dependencies first                                                     |
| Bundling assumptions into one conjunction too early | Tactics need projections repeatedly               | Use separate hypotheses unless the bundled fact is semantically meaningful |
| Adding class constraints “just in case”             | The function becomes harder to use                | Require only operations and laws actually needed                           |

### Task: Compose Functions — ordinary composition, higher-order helpers, pointwise reasoning

Lean treats functions as first-class values. Function composition is used both in programming and mathematics.

| Composition form        | Meaning                      | Example use                   |
| ----------------------- | ---------------------------- | ----------------------------- |
| `f x`                   | Apply function               | Direct computation            |
| `f ∘ g`                 | Composition                  | Mathematical maps             |
| `fun x => ...`          | Anonymous function           | Local transformation          |
| Higher-order argument   | Function passed as parameter | `List.map`, predicates, folds |
| Pointwise theorem       | `∀ x, f x = g x`             | Function behavior comparison  |
| Function extensionality | `funext x`                   | Prove function equality       |

Example:

```lean
def double (n : Nat) : Nat :=
  n + n

def inc (n : Nat) : Nat :=
  n + 1

def incAfterDouble : Nat → Nat :=
  inc ∘ double
```

Pointwise equality:

```lean
example (f g : Nat → Nat) (h : ∀ n, f n = g n) :
    f = g := by
  funext n
  exact h n
```

Higher-order helper:

```lean
def mapTwice {α β γ : Type} (f : α → β) (g : β → γ) (xs : List α) : List γ :=
  xs.map (g ∘ f)
```

**Design meaning:** functions are not objects with hidden mutable state. They are typed terms. For equality of functions, Lean usually needs pointwise reasoning and extensionality.

**Common Pitfalls**

| Pitfall                                                   | Explanation                                                       | Better habit                                       |
| --------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------- |
| Expecting function equality to be proved by reflexivity   | Functions may be extensionally equal without reducing identically | Use `funext`                                       |
| Hiding too much in point-free style                       | `g ∘ f` may reduce readability in dependent contexts              | Use `fun x => ...` when types are clearer          |
| Forgetting argument order in composition                  | `f ∘ g` means apply `g` first, then `f`                           | Check with simple input mentally                   |
| Using function equality where pointwise theorem is enough | Equality may require extensionality                               | State `∀ x, ...` if that is what later proofs need |

### Task: Branch by Value or Structure — `if`, `match`, `cases`, and decidability

Lean has several ways to branch, and each belongs to a specific semantic layer.

| Branching need                          | Construct                    | Best use                                          | Caveat                                       |
| --------------------------------------- | ---------------------------- | ------------------------------------------------- | -------------------------------------------- |
| Branch on computable Boolean            | `if b then ... else ...`     | ordinary programs                                 | `Bool` is not `Prop`                         |
| Branch on decidable proposition         | `if h : P then ... else ...` | use proof in branches                             | requires decidability or classical reasoning |
| Branch on inductive data                | `match x with ...`           | definitions by constructors                       | must cover constructors                      |
| Split proof by constructors             | `cases h with ...`           | proof of disjunction/existence/inductive relation | gives no induction hypothesis                |
| Split arbitrary proposition classically | `by_cases h : P`             | classical or decidable proof branches             | may introduce classical reasoning            |
| Prove recursive property                | `induction x with ...`       | recursive data and propositions                   | requires strong enough motive                |

Example with named conditional proof:

```lean
def classifyZero (n : Nat) : String :=
  if h : n = 0 then
    "zero"
  else
    "nonzero"
```

In a proof, `by_cases` exposes both branches.

```lean
example (n : Nat) : n = 0 ∨ n ≠ 0 := by
  by_cases h : n = 0
  · left
    exact h
  · right
    exact h
```

Pattern matching on data:

```lean
def describeList {α : Type} : List α → String
  | [] => "empty"
  | _ :: _ => "nonempty"
```

Cases on proof:

```lean
example (P Q : Prop) (h : P ∨ Q) : Q ∨ P := by
  cases h with
  | inl hP =>
      right
      exact hP
  | inr hQ =>
      left
      exact hQ
```

**Design meaning:** branch structure follows type structure. `match` follows constructors of data. `cases` follows constructors of data or proof. `if` follows decidability of a condition. `by_cases` creates proof branches based on a proposition.

**Common Pitfalls**

| Pitfall                                                    | Explanation                                            | Better habit                                   |
| ---------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------- |
| Using `if` for arbitrary propositions without decidability | Lean needs a decision procedure or classical reasoning | Add `[Decidable P]` or use `classical` locally |
| Using `cases` for recursive theorem                        | No induction hypothesis is generated                   | Use `induction`                                |
| Pattern matching too early                                 | It may destroy a general theorem shape                 | Delay branching until needed                   |
| Forgetting branch hypotheses                               | Named conditionals and `by_cases` provide useful facts | Name branch proofs deliberately                |

### Task: Iterate or Recurse — structural recursion, folds, maps, loops, induction alignment

Lean supports ordinary recursive definitions, higher-order collection operations, and imperative-looking loops in monadic contexts. For proof-oriented code, the definition should align with the proof principle.

| Behavioral need               | Construct                               | Best use                  | Proof consequence                      |
| ----------------------------- | --------------------------------------- | ------------------------- | -------------------------------------- |
| Recursive data transformation | structural recursion / pattern matching | lists, trees, syntax      | induction follows constructors         |
| Aggregate list values         | `foldl`, `foldr`                        | accumulation              | proofs may require fold lemmas         |
| Pointwise list transformation | `List.map`                              | transform each element    | many library lemmas exist              |
| Filter collection             | `List.filter`, `Finset.filter`          | keep satisfying elements  | requires decidability/predicate lemmas |
| Efficient loop                | `for` in `Id` or `IO` / arrays          | execution-oriented code   | proofs may be harder                   |
| General recursion             | well-founded recursion                  | non-structural algorithms | termination proof required             |
| Proof recursion               | induction                               | recursive proposition     | motive and generalization matter       |

Simple recursion:

```lean
def sumList : List Nat → Nat
  | [] => 0
  | x :: xs => x + sumList xs
```

Proof aligned with recursion:

```lean
theorem sumList_append (xs ys : List Nat) :
    sumList (xs ++ ys) = sumList xs + sumList ys := by
  induction xs with
  | nil =>
      simp [sumList]
  | cons x xs ih =>
      simp [sumList, ih, Nat.add_assoc]
```

Using library operation:

```lean
def doubleAll (xs : List Nat) : List Nat :=
  xs.map (fun n => n + n)
```

A map theorem shape:

```lean
example (xs : List Nat) :
    (doubleAll xs).length = xs.length := by
  simp [doubleAll]
```

**Design tradeoff:** recursive definitions expose clear induction principles. Higher-order library operations reuse existing lemmas. Imperative loops may execute efficiently or read naturally to programmers but may not be easiest to prove about.

**Failure-first explanation:** the tempting model is to write the function in the style easiest to execute, then prove properties afterward. The Lean-specific model is to consider proof shape at definition time. A definition that recurses structurally over the same argument as the theorem’s induction is usually much easier to verify.

**Common Pitfalls**

| Pitfall                                                     | Explanation                                           | Better habit                                                             |
| ----------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------ |
| Writing loop-style code for theorem-first development       | Induction may not match the code                      | Prefer recursive or library-combinator definitions                       |
| Using a custom recursion where library lemmas already exist | More proof burden                                     | Use `map`, `fold`, `filter`, append, and existing theorems where natural |
| Ignoring termination                                        | Lean must accept recursive definitions as terminating | Use structural recursion or provide well-founded reasoning               |
| Recursing over the wrong argument                           | Induction hypothesis does not match goal              | Align recursion argument with expected proof                             |

### Task: Prove by Induction — generalization, motives, and induction hypotheses

Induction is not merely a tactic. It is the use of an induction principle generated by an inductive type or relation.

Basic natural number induction:

```lean
example (n : Nat) : n + 0 = n := by
  induction n with
  | zero =>
      rfl
  | succ n ih =>
      simp [ih]
```

Basic list induction:

```lean
example {α : Type} (xs : List α) : xs ++ [] = xs := by
  induction xs with
  | nil =>
      rfl
  | cons x xs ih =>
      simp [ih]
```

Induction over custom syntax:

```lean
inductive Expr where
  | const : Nat → Expr
  | add : Expr → Expr → Expr

def Expr.size : Expr → Nat
  | .const _ => 1
  | .add e₁ e₂ => 1 + e₁.size + e₂.size

example (e : Expr) : e.size > 0 := by
  induction e with
  | const n =>
      simp [Expr.size]
  | add e₁ e₂ ih₁ ih₂ =>
      simp [Expr.size]
```

The central professional issue is not knowing the word `induction`; it is knowing what should be generalized before induction.

Example failure pattern:

```lean
-- Shape of a common problem:
-- If a theorem mentions two variables, inducting after both are fixed
-- may produce an induction hypothesis too specific for the recursive call.
```

Corrective pattern:

| Symptom                                    | Likely cause                              | Correction                                     |
| ------------------------------------------ | ----------------------------------------- | ---------------------------------------------- |
| Induction hypothesis does not apply        | Variables were fixed too early            | Generalize variables before induction          |
| Step case goal differs by extra expression | Recursive definition unfolded differently | Simplify/unfold definition and rewrite with IH |
| Goal contains dependent equality issues    | Motive too weak or too specific           | Use a more general theorem statement           |
| Induction produces too many cases          | Wrong object was inducted on              | Induct on the data/proof that drives recursion |
| `simp [ih]` does nothing                   | IH shape does not match subterm           | Inspect exact IH type                          |

**Common Pitfalls**

| Pitfall                                                  | Explanation                                        | Better habit                                               |
| -------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------- |
| Introducing all variables before induction automatically | May weaken induction hypothesis                    | Leave dependent/general variables unintroduced when needed |
| Inducting on a derived expression                        | Generated cases may not match definitions          | Induct on the original recursive argument                  |
| Expecting induction to discover helper lemmas            | It only generates cases and IHs                    | Supply rewrites, simp lemmas, or auxiliary lemmas          |
| Ignoring induction principle shape                       | Custom inductives produce custom proof obligations | Inspect generated goals carefully                          |

### Task: Use `cases` Correctly — eliminate alternatives without recursion

`cases` is appropriate when the proof only needs to analyze possible constructors, not recursively assume smaller cases.

| Object           | `cases` effect                               | Example                                     |
| ---------------- | -------------------------------------------- | ------------------------------------------- |
| `P ∧ Q`          | Extract both proofs                          | `h.left`, `h.right`, or constructor pattern |
| `P ∨ Q`          | Split into left and right cases              | proof by alternatives                       |
| `∃ x, P x`       | Introduce witness and proof                  | unpack existence                            |
| `Bool`           | Cases `true` and `false`                     | Boolean proof                               |
| `Nat`            | Cases `0` and `succ n`                       | one-step split, no IH                       |
| Custom inductive | One case per constructor                     | finite states, syntax constructors          |
| Equality proof   | Substitute equal terms in dependent contexts | advanced equality elimination               |

Example unpacking an existential:

```lean
example : (∃ n : Nat, n = 0) → True := by
  intro h
  cases h with
  | intro n hn =>
      trivial
```

Example with conjunction pattern:

```lean
example (P Q : Prop) (h : P ∧ Q) : Q ∧ P := by
  cases h with
  | intro hP hQ =>
      exact And.intro hQ hP
```

Example with finite state:

```lean
inductive Light where
  | red
  | yellow
  | green

def Light.next : Light → Light
  | .red => .green
  | .yellow => .red
  | .green => .yellow

example (l : Light) :
    l = Light.red ∨ l = Light.yellow ∨ l = Light.green := by
  cases l with
  | red =>
      left
      rfl
  | yellow =>
      right
      left
      rfl
  | green =>
      right
      right
      rfl
```

**Design meaning:** `cases` is elimination. It does not prove recursive properties unless the case split itself is enough.

**Common Pitfalls**

| Pitfall                                                           | Explanation                                 | Better habit                                            |
| ----------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------- |
| Using `cases n` for theorem over all natural numbers requiring IH | Only proves zero/succ split                 | Use `induction n`                                       |
| Destructing hypotheses too early                                  | May lose compact usable form                | Keep structured hypothesis if projections are enough    |
| Creating branch explosion                                         | Too many nested cases obscure proof         | Use helper lemmas or better theorem statement           |
| Ignoring impossible cases                                         | Some cases are contradictory and need proof | Use `contradiction`, `simp at`, or contradiction lemmas |

### Task: Use `constructor`, `left`, `right`, and structured introduction — build values/proofs

Many Lean goals are constructor-shaped. The right response is to build the required structure.

| Goal shape     | Construct                           | Meaning                    |
| -------------- | ----------------------------------- | -------------------------- |
| `P ∧ Q`        | `constructor`                       | Prove both conjuncts       |
| `P ↔ Q`        | `constructor`                       | Prove both implications    |
| `P ∨ Q`        | `left` or `right`                   | Choose one side            |
| `∃ x, P x`     | `use x` or constructor              | Provide witness            |
| Structure goal | `{ field := ... }` or `constructor` | Fill fields                |
| Subtype goal   | `⟨x, proof⟩`                        | Value plus invariant proof |

Conjunction:

```lean
example (P Q : Prop) (hP : P) (hQ : Q) : P ∧ Q := by
  constructor
  · exact hP
  · exact hQ
```

Equivalence:

```lean
example (P Q : Prop) : P ∧ Q ↔ Q ∧ P := by
  constructor
  · intro h
    exact And.intro h.right h.left
  · intro h
    exact And.intro h.right h.left
```

Existential:

```lean
example : ∃ n : Nat, n + 1 = 1 := by
  use 0
```

Subtype:

```lean
def smallNat : {n : Nat // n < 10} :=
  ⟨3, by decide⟩
```

**Design meaning:** constructor tactics mirror introduction rules. They are not arbitrary proof search; they construct data or evidence according to the target type.

**Common Pitfalls**

| Pitfall                                                | Explanation                        | Better habit                                      |
| ------------------------------------------------------ | ---------------------------------- | ------------------------------------------------- |
| Using automation before reading constructor shape      | Simple goals become opaque         | Use constructors explicitly for central structure |
| Choosing wrong disjunction side                        | Later proof cannot complete        | Check which side is provable                      |
| Providing witness too late                             | Existential goals need a witness   | Identify the witness early                        |
| Using `constructor` when named fields would be clearer | Large structures become unreadable | Use named field syntax for records                |

### Task: Use `have` and `suffices` — proof architecture and local composition

`have` and `suffices` are core tools for organizing proof composition.

| Construct               | Direction                 | Use                                           |
| ----------------------- | ------------------------- | --------------------------------------------- |
| `have h : P := proof`   | Forward                   | Establish intermediate fact                   |
| `suffices h : P by ...` | Backward                  | Reduce goal to a sufficient intermediate fact |
| `have h := term`        | Inferred type             | Quick local fact                              |
| `have h : P := by ...`  | Tactic proof inside proof | Structured subproof                           |
| `let x := ...`          | Local computation         | Name value, not proposition                   |
| Helper lemma            | Externalized `have`       | Reusable proof component                      |

Forward proof with `have`:

```lean
example (P Q R : Prop) (hPQ : P → Q) (hQR : Q → R) (hP : P) : R := by
  have hQ : Q := hPQ hP
  exact hQR hQ
```

Backward proof with `suffices`:

```lean
example (P Q : Prop) (hP : P) (hPQ : P → Q) : Q := by
  suffices hQ : Q by
    exact hQ
  exact hPQ hP
```

More useful `suffices` pattern:

```lean
example (a b c : Nat) (h₁ : a = b) (h₂ : b = c) : a = c := by
  suffices h : a = b ∧ b = c by
    exact h.left.trans h.right
  constructor
  · exact h₁
  · exact h₂
```

**Design meaning:** `have` makes proof dependencies explicit. `suffices` expresses backward planning. Both improve maintainability when they name meaningful intermediate claims.

**Common Pitfalls**

| Pitfall                                           | Explanation                        | Better habit                                       |
| ------------------------------------------------- | ---------------------------------- | -------------------------------------------------- |
| Using anonymous nested terms for central facts    | Proof becomes unreadable           | Name meaningful intermediate facts                 |
| Overusing `have` for trivial rewrites             | Proof becomes verbose              | Use `simp`/`rw` for routine transformations        |
| Giving vague names like `h1`, `h2` in long proofs | Local context becomes hard to read | Use semantic names when proof is nontrivial        |
| Using `suffices` without simplifying structure    | It can add indirection             | Use it when backward reasoning clarifies the proof |

### Task: Use `apply` and `exact` — theorem application and goal matching

`exact` supplies a term whose type matches the goal. `apply` uses a theorem or function whose conclusion can match the goal, generating subgoals for its premises.

| Tactic       | Meaning                                      | Use when                              | Risk                                      |
| ------------ | -------------------------------------------- | ------------------------------------- | ----------------------------------------- |
| `exact t`    | Close goal with term `t`                     | You have the proof/value already      | Type must match exactly after elaboration |
| `apply h`    | Use theorem/function `h`; prove its premises | Goal matches conclusion of `h`        | Generates unexpected subgoals             |
| `refine`     | Partially provide term with holes            | Need structured term with obligations | Can create many holes                     |
| `assumption` | Use matching local hypothesis                | Goal is already in context            | May hide which hypothesis was used        |

Example:

```lean
example (P Q : Prop) (hPQ : P → Q) (hP : P) : Q := by
  apply hPQ
  exact hP
```

Equivalent:

```lean
example (P Q : Prop) (hPQ : P → Q) (hP : P) : Q := by
  exact hPQ hP
```

Using transitivity:

```lean
example (a b c : Nat) (h₁ : a = b) (h₂ : b = c) : a = c := by
  apply Eq.trans
  · exact h₁
  · exact h₂
```

More idiomatic direct term:

```lean
example (a b c : Nat) (h₁ : a = b) (h₂ : b = c) : a = c := by
  exact h₁.trans h₂
```

**Design meaning:** `apply` is backward reasoning from a theorem’s conclusion to its premises. It is powerful when the theorem shape is known. It is confusing when used without inspecting the theorem type.

**Common Pitfalls**

| Pitfall                                      | Explanation                              | Better habit                            |
| -------------------------------------------- | ---------------------------------------- | --------------------------------------- |
| Applying theorem with wrong conclusion shape | Lean generates awkward or unsolved goals | Use `#check theoremName` first          |
| Using `apply` where `exact` is clearer       | Extra subgoals obscure simple proof      | Prefer direct application when readable |
| Applying overly general theorem blindly      | Instance/metavariable obligations appear | Provide arguments or type annotations   |
| Forgetting implicit arguments                | Application seems mysterious             | Inspect with `#check @theoremName`      |

### Task: Use Rewriting for Behavioral Composition — `rw`, rewrite direction, rewriting hypotheses

Rewriting is a behavioral transformation on goals and hypotheses. It composes the current proof state with an equality theorem.

| Rewrite task        | Syntax              | Use                                    |
| ------------------- | ------------------- | -------------------------------------- |
| Rewrite target      | `rw [h]`            | Replace left side of `h` by right side |
| Reverse rewrite     | `rw [← h]`          | Replace right side by left side        |
| Rewrite hypothesis  | `rw [h] at h₂`      | Transform local fact                   |
| Rewrite all         | `rw [h] at *`       | Broad transformation, use cautiously   |
| Use theorem rewrite | `rw [Nat.add_comm]` | Apply named theorem                    |
| Combine rewrites    | `rw [h₁, h₂]`       | Sequence transformations               |

Example:

```lean
example (a b : Nat) (h : a = b) : a + 1 = b + 1 := by
  rw [h]
```

Reverse direction:

```lean
example (a b : Nat) (h : b = a) : a + 1 = b + 1 := by
  rw [← h]
```

Rewrite in a hypothesis:

```lean
example (a b c : Nat) (h : a = b) (h₂ : a + c = 0) : b + c = 0 := by
  rw [h] at h₂
  exact h₂
```

**Failure-first explanation:** the tempting model is that rewriting “uses an equality.” The precise Lean model is directional replacement. If a theorem is oriented opposite to the goal, `rw [h]` may fail or make the goal worse. The rewrite direction must be chosen according to the target normal form.

**Common Pitfalls**

| Pitfall                                | Explanation                        | Better habit                                       |
| -------------------------------------- | ---------------------------------- | -------------------------------------------------- |
| Rewriting in the wrong direction       | Goal becomes less canonical        | Use `rw [← h]` deliberately                        |
| Rewriting everywhere too early         | Useful hypotheses may be destroyed | Rewrite specific goal or hypothesis                |
| Using `rw` for routine normal forms    | Verbose if `simp` knows the fact   | Use `simp` for standard simplification             |
| Using `simp` for central equality step | Hides proof idea                   | Use `rw` or `calc` for explanatory transformations |

### Task: Use `calc` for Equational and Relational Reasoning — readable chains

`calc` is Lean’s proof form closest to ordinary mathematical calculation. It is suitable when the proof is a sequence of transformations.

Equality chain:

```lean
example (a b c : Nat) (h₁ : a = b) (h₂ : b = c) : a = c := by
  calc
    a = b := h₁
    _ = c := h₂
```

Arithmetic chain:

```lean
example (a b c : Nat) : (a + b) + c = a + (b + c) := by
  calc
    (a + b) + c = a + b + c := rfl
    _ = a + (b + c) := Nat.add_assoc a b c
```

Inequality chain shape:

```lean
example (a b c : Nat) (h₁ : a ≤ b) (h₂ : b ≤ c) : a ≤ c := by
  calc
    a ≤ b := h₁
    _ ≤ c := h₂
```

**Design meaning:** `calc` is not just verbose `rw`. It lets the proof communicate the mathematical path. This is valuable when a proof would otherwise be hidden behind a dense `simp` or automation call.

| Use `calc` when                                      | Prefer something else when                     |
| ---------------------------------------------------- | ---------------------------------------------- |
| The transformation chain is the explanation          | The goal is routine normalization              |
| Each step has a meaningful theorem                   | A single library theorem solves the goal       |
| The reader should inspect intermediate expressions   | Intermediate expressions are irrelevant        |
| Equality/inequality reasoning mirrors textbook proof | The proof is constructor/case/induction shaped |

**Common Pitfalls**

| Pitfall                                    | Explanation                             | Better habit                          |
| ------------------------------------------ | --------------------------------------- | ------------------------------------- |
| Using `calc` to restate trivial simp facts | Adds noise                              | Use `simp` for routine facts          |
| Omitting theorem names for important steps | Reader cannot see why step holds        | Cite lemma or proof term at each line |
| Making each step too large                 | Errors become hard to localize          | Use smaller intermediate expressions  |
| Forcing `calc` onto non-chain proof        | Constructor or induction may be clearer | Match proof form to goal structure    |

### Task: Use Simplification Intentionally — `simp`, local simp sets, and proof readability

`simp` is one of Lean’s most important tactics. It simplifies goals using a curated set of lemmas, definitions, assumptions, and local additions.

| Form              | Meaning                              | Use                                     |
| ----------------- | ------------------------------------ | --------------------------------------- |
| `simp`            | Simplify goal using default simp set | Routine normalization                   |
| `simp [f]`        | Simplify and unfold/use `f`          | Definitions not unfolded by default     |
| `simp [h]`        | Simplify using local fact `h`        | Substitute or normalize with hypothesis |
| `simp at h`       | Simplify hypothesis `h`              | Clean local context                     |
| `simp at *`       | Simplify all hypotheses and goals    | Useful but broad                        |
| `simpa using h`   | Simplify goal and `h`, then close    | Convert theorem shape                   |
| `simp only [...]` | Use only specified simp lemmas       | Controlled simplification               |

Examples:

```lean
example (n : Nat) : n + 0 = n := by
  simp
```

```lean
def addZeroRight (n : Nat) : Nat :=
  n + 0

example (n : Nat) : addZeroRight n = n := by
  simp [addZeroRight]
```

Using hypothesis:

```lean
example (n : Nat) (h : n = 0) : n + 1 = 1 := by
  simp [h]
```

Using `simpa`:

```lean
example (n : Nat) (h : n = 0) : n + 0 = 0 := by
  simpa [h]
```

**Design meaning:** simplification is not arbitrary theorem proving. It is normalization by rewrite rules. A proof solved by `simp` is acceptable when the goal is intended to reduce to a normal form. It is less acceptable when it hides a central mathematical argument.

**Common Pitfalls**

| Pitfall                                   | Explanation                             | Better habit                                                                       |
| ----------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| Using `simp` without knowing what it used | Proof becomes opaque                    | Use `simp?`, inspect theorem names when needed, or replace central steps with `rw` |
| Adding too many local simp lemmas         | Simplification may become unpredictable | Keep local simp sets small                                                         |
| Using `simp at *` destructively           | It may erase useful hypothesis shapes   | Simplify specific hypotheses                                                       |
| Marking non-normalizing lemmas `[simp]`   | Can cause loops or expression growth    | Simp rules should reduce to canonical form                                         |

### Task: Choose Between Term Proof and Tactic Proof — transparency versus interaction

Term proofs and tactic proofs construct the same kind of object: a proof term. The choice is about readability, maintainability, and interaction.

| Proof situation                | Prefer term proof         | Prefer tactic proof                       |
| ------------------------------ | ------------------------- | ----------------------------------------- |
| Direct identity or implication | Yes                       | Usually unnecessary                       |
| Short use of constructors      | Often                     | Sometimes clearer with bullets            |
| Multi-branch case analysis     | Rarely                    | Yes                                       |
| Induction                      | Usually tactic            | Yes                                       |
| Long equality chain            | `calc`, term/tactic mixed | `calc` inside tactic block                |
| Heavy rewriting/simplification | Sometimes `by simpa`      | Yes                                       |
| Algebraic automation           | No strong term advantage  | Yes                                       |
| Library theorem application    | Direct term often best    | `apply` when premises should become goals |

Term proof:

```lean
example (P : Prop) : P → P :=
  fun h => h
```

Tactic proof:

```lean
example (P : Prop) : P → P := by
  intro h
  exact h
```

Mixed style:

```lean
example (P Q : Prop) : P ∧ Q → Q ∧ P := by
  intro h
  exact And.intro h.right h.left
```

**Design meaning:** tactic proofs expose proof-state construction. Term proofs expose the final proof object. A professional proof often mixes both: tactics for structure, terms for obvious local construction.

**Common Pitfalls**

| Pitfall                                         | Explanation                                        | Better habit                           |
| ----------------------------------------------- | -------------------------------------------------- | -------------------------------------- |
| Writing long unreadable term proofs             | Compactness hides structure                        | Switch to tactic or `calc`             |
| Writing tactic scripts for one-line proof terms | Noise obscures simplicity                          | Use direct terms where clear           |
| Treating tactic proof as less formal            | It elaborates to proof terms                       | Judge by readability and robustness    |
| Treating term proof as inherently superior      | Some proofs are structurally clearer interactively | Use the form matching proof complexity |
