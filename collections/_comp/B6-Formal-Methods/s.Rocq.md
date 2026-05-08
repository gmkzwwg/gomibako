---
title: Rocq - Quick Reference
abbreviation: Rocq
layout: print
categories: Sheet
date: 2026-05-08
subclass: Formal Methods
---

## PART 1 — Language Identity, Design Philosophy, and Problem Space

### Environment and Version Assumptions — Rocq 9.x, Rocq Platform, Stdlib/Corelib, tooling baseline

**Density strategy:** adaptive — Rocq requires deep treatment of proof terms, dependent types, constructive logic, inductive definitions, tactics, kernel checking, proof maintenance, and certified extraction; ordinary programming-language topics such as runtime memory or concurrency matter mainly through extraction, plugins, tooling, and proof-engineering cost.

This guide targets two practical baselines. First, it targets the current Rocq Prover 9.x line, using Rocq Prover `9.2.0` as the current standalone prover/language baseline. The official Rocq site lists `9.2.0` as the latest Rocq Prover release. Second, it treats Rocq Platform `2025.08.3` as the current curated platform baseline, while keeping explicit that Platform releases package a coherent set of libraries/plugins and may target an older prover line than the newest prover release.

Rocq 9.0 is historically important because it marks the completed rename from *The Coq Proof Assistant* to *The Rocq Prover*. Rocq 9.0 also introduced the new single `rocq` command-dispatching interface and split the former `Coq` standard library structure into `Corelib` and `Stdlib` packages. This matters because many documents, packages, theorems, build files, and tutorials still use Coq-era names.

| Assumption                   | Practical meaning                      | Consequence for this guide                                                                         | Caveat                                                           |
| ---------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Rocq Prover `9.2.0`          | Current standalone prover baseline     | Syntax, command names, reference-manual framing, and modern naming use Rocq terminology            | Legacy Coq commands and names still appear in older developments |
| Rocq Platform `2025.08.3`    | Curated library/plugin distribution    | Ecosystem guidance distinguishes prover core from platform packages                                | Platform compatibility may lag newest prover release             |
| `rocq` command family        | Modern command-line entry point        | Workflow sections should prefer `rocq`-era terminology                                             | Legacy `coqc`, `coqtop`, `coqdoc` names remain common            |
| `Corelib` and `Stdlib` split | Library organization changed in Rocq 9 | Standard-library guidance must distinguish minimal core from broader standard library              | Older code often imports from `Coq.*` paths                      |
| Coq-era ecosystem continuity | Rocq inherits a long Coq history       | Historical and transfer-map sections must mention Coq compatibility, naming, and library migration | Do not treat Rocq as a completely new proof assistant            |

**Common Pitfalls:** Treating “Rocq” and “Coq” as unrelated systems is wrong; treating Rocq 9.x as merely a cosmetic rename is also wrong. The rename coincides with concrete command-line and library-organization changes.

### What Rocq Is — proof assistant, dependently typed language, proof environment, verified-programming system

Rocq is an interactive theorem prover, or proof assistant. It is designed for formalizing mathematical concepts and interactively generating machine-checked proofs. The official reference manual emphasizes that machine checking gives higher confidence than ordinary human-checked proofs, and the official homepage describes Rocq as a trustworthy, industrial-strength interactive theorem prover and dependently typed programming language.

The correct first mental model is not “Rocq is a functional programming language with strange syntax.” Rocq is better understood as a **proof-development system** whose language can express data, functions, propositions, specifications, proofs, and proof-producing procedures. Its distinctive design is that these are not separate worlds: propositions are represented as types, proofs are represented as terms, and the kernel checks whether a proof term inhabits the theorem type.

Rocq is therefore simultaneously several things:

| Identity                          | What it means                                             | Concrete Rocq artifact                                     | Practical consequence                                                |
| --------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- |
| Interactive theorem prover        | A system for constructing machine-checked proofs          | `Theorem`, `Lemma`, `Proof`, tactics, proof state          | Development is an interaction with goals and hypotheses              |
| Dependently typed language        | A language where types may depend on values               | `forall`, dependent functions, indexed inductive types     | Specifications can be encoded in types                               |
| Functional specification language | A pure language for defining executable functions         | `Definition`, `Fixpoint`, `match`                          | Computation can simplify proof goals                                 |
| Proof-development environment     | A workflow for building large proof scripts and libraries | modules, sections, tactics, automation, search commands    | Maintainability is as important as proof existence                   |
| Mechanized mathematics system     | A platform for formalizing definitions and theorems       | algebraic structures, inductive predicates, library lemmas | Mathematical rigor becomes explicit and checkable                    |
| Certified-programming system      | A way to pair programs with correctness proofs            | function + specification + theorem + extraction            | Testing is supplemented, not replaced, by proof                      |
| Extraction source language        | A source for executable OCaml or Haskell code             | extraction commands and extracted artifacts                | Correctness depends on the proof boundary and extraction assumptions |

The official homepage explicitly notes that Rocq can extract executable programs from specifications as OCaml or Haskell source code. That makes Rocq relevant to verified programming, but extraction is not the same as whole-system verification. External runtimes, foreign libraries, I/O, compiler behavior, deployment, and environment assumptions remain outside the kernel’s direct guarantee.

**Failure-first explanation:** The tempting mental model is “write a program, then add tests/proofs after it.” In Rocq, the more productive mental model is “write definitions, state properties precisely, then construct proof terms that the kernel checks.” A proof script may look procedural, but its product is a checked proof term. The professional rule of thumb is: always ask what type a definition has, what proposition a theorem states, and what proof term or tactic script is being constructed.

### Why Rocq Exists — formal certainty, mechanized reasoning, certified programs, proof reuse

Rocq exists to address a core limitation of informal mathematics and ordinary software testing: human reasoning and testing can miss cases. A Rocq proof does not merely persuade a reader; it is checked by a formal kernel against precise definitions. That does not make every assumption true, and it does not remove the need to inspect specifications, but it changes the reliability model.

| Problem pressure                          | Rocq’s design response                            | Capability gained                                         | Cost introduced                           |
| ----------------------------------------- | ------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------- |
| Informal proofs can hide gaps             | Machine-checked proof terms                       | High confidence in derivations from assumptions           | Proof construction can be labor-intensive |
| Tests cover examples, not all cases       | Universal specifications and induction            | Exhaustive reasoning over infinite families               | Specifications must be stated precisely   |
| Mathematical notation is ambiguous        | Formal definitions and typed terms                | Definitions become executable/checkable                   | Formalization may feel verbose            |
| Program correctness is hard to audit      | Certified functions and correctness theorems      | Verified algorithms and extraction                        | Trusted boundary must be managed          |
| Large proofs become unmaintainable        | Modules, sections, tactics, automation, libraries | Reuse and proof engineering                               | Automation can become opaque and brittle  |
| Programming-language semantics are subtle | Inductive relations and metatheorems              | Preservation, progress, determinism, compiler correctness | Requires proof-theoretic discipline       |

Rocq has been used in major verification and formalization projects. The official reference manual names the CompCert verified C compiler and the verification of the four-color theorem as flagship examples. These examples reveal Rocq’s main value proposition: it is suited to artifacts where the cost of formalization is justified by the value of high assurance.

**Design tradeoff:** Rocq gains rigor by demanding explicit definitions, explicit assumptions, explicit witnesses, explicit induction principles, and explicit proof obligations. The cost is friction. Rocq makes certain informal leaps impossible or visible. This is not incidental inconvenience; it is part of the design.

### Language Personality — static, strong, functional, dependent, constructive, interactive

Terms such as “static typing,” “strong typing,” and “compiled language” are often misused. For Rocq, the useful distinction is this: Rocq has a statically checked dependent type theory; its kernel checks whether terms are well typed; its proofs are checked before acceptance; and execution-by-reduction inside Rocq is different from extracted execution in OCaml or Haskell.

| Design dimension            | Rocq’s choice                                                                                         | Practical consequence                                                              | Common misunderstanding                                                         |
| --------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Static vs dynamic typing    | Statically checked dependent type theory                                                              | Ill-typed definitions and invalid proofs are rejected before acceptance            | “Static” does not mean all desired properties are automatic                     |
| Strong vs weak typing       | Strongly typed in the sense that terms must respect precise type rules                                | You cannot freely coerce propositions, data, and functions                         | “Strong” is not a formal guarantee by itself; use precise type-theoretic claims |
| Explicit types vs inference | Type inference plus many explicit annotations when needed                                             | Many terms can be inferred, but complex dependent code needs guidance              | Omitting annotations does not mean types are simple                             |
| Nominal vs structural       | Mixed: named inductives/modules plus definitional equality and typeclass/canonical-structure patterns | Equality and reuse depend on more than class names                                 | Do not import ordinary OO nominal-subtyping expectations                        |
| Functional vs imperative    | Pure functional core                                                                                  | Recursion, pattern matching, and computation are central                           | Rocq is not mainly a general-purpose FP language                                |
| Declarative vs procedural   | Theorems are declarative; tactic scripts are procedural proof construction                            | A proof script changes proof states step by step                                   | Tactics do not replace proof terms; they construct them                         |
| Object model                | No conventional object-oriented object model                                                          | Abstraction uses functions, inductives, modules, typeclasses, canonical structures | Classes from Java/C++/Python do not transfer directly                           |
| Error model                 | Kernel rejection, proof obligations, tactic failure, build failure                                    | Failure often means a statement, induction choice, or proof state is wrong         | Tactic failure is not the same as runtime exception                             |
| Runtime model               | Reduction/checking in Rocq; extracted execution outside Rocq                                          | Proof-time computation differs from extracted program behavior                     | `Compute` is not a full deployment runtime model                                |
| Concurrency model           | Not central in Gallina-level proof development                                                        | Concurrency matters through verified models, extraction, build tooling, or plugins | Do not expect Go/Rust/Java-style concurrency primitives as the language core    |
| Metaprogramming             | Tactics, Ltac, Ltac2, plugins, ecosystem metaprogramming                                              | Proof automation is programmable                                                   | More automation can reduce maintainability                                      |

The official reference manual describes proof construction as entering a series of tactics, with both elementary tactics and complex decision procedures such as `lia`; it also identifies `Ltac` and `Ltac2` as tactic languages for defining new tactics. This means Rocq’s “language personality” includes at least three layers: the term/specification language, the vernacular command language, and the tactic language.

**Common Pitfalls:** Do not call Rocq simply “compiled” or “interpreted.” Rocq checks and elaborates terms, reduces terms for computation, compiles proof files in a build workflow, and may extract programs to languages with their own runtimes. These are different execution/checking layers.

### Rocq as a Coherent Design System — definitions, propositions, proofs, tactics, computation, kernel

Rocq’s coherence comes from the interaction of five concepts: definitions, propositions, proofs, tactics, and kernel checking. A `Definition` introduces a term. A theorem statement introduces a type to be inhabited. A proof constructs a term of that type. Tactics transform proof states while building that proof term. The kernel checks the final term.

| Rocq component | Surface form                              | Semantic role                                   | What the learner should ask                     |
| -------------- | ----------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| Definition     | `Definition`, `Fixpoint`, `Inductive`     | Introduces data, functions, or logical families | What term/type has been introduced?             |
| Proposition    | `Prop`, theorem statement                 | A type whose inhabitants are proofs             | What exactly must be constructed?               |
| Proof          | proof term or tactic script               | Evidence inhabiting a proposition               | What proof object will the kernel accept?       |
| Tactic         | `intros`, `apply`, `rewrite`, `induction` | Proof-state transformer                         | How did the goal and hypotheses change?         |
| Computation    | reduction, simplification, conversion     | Evaluates definitional content                  | Is this equality definitional or propositional? |
| Kernel         | trusted checker                           | Verifies that proof terms type-check            | What assumptions and axioms are trusted?        |

This system explains why Rocq feels different from ordinary programming. In most languages, a function type constrains the shape of a program. In Rocq, a theorem type constrains the shape of a proof. The same kernel-level discipline applies to both. The proof assistant interface may feel conversational, but the acceptance criterion is formal.

**Interdisciplinary Lens: Calculus of Inductive Constructions**

| Item                      | Explanation                                                                                                                       |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| What it clarifies         | Why propositions and data share one type-theoretic framework                                                                      |
| Language feature involved | `forall`, `fun`, `Inductive`, `Fixpoint`, `match`, `Theorem`, proof terms                                                         |
| Practical consequence     | A proof script must ultimately construct a term accepted by the kernel                                                            |
| Limit of the lens         | CIC explains the core, but practical Rocq also depends on libraries, tactics, notation, tooling, and proof-engineering convention |

### Specialized Lens Map — CIC, constructive logic, induction, tactics, extraction

The required specialized lenses are central enough that the later guide should include a dedicated interdisciplinary foundations chapter after PART 1. For PART 1, the following map states how those lenses guide the rest of the tutorial rather than replacing practical reference.

| Lens or external field              | Core idea                                                                    | Language features clarified                                            | Practical programming consequence                                | Where it appears in the guide                | Limit of the lens                                     |
| ----------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------- |
| Calculus of Inductive Constructions | Types can express propositions; terms can express proofs                     | `Prop`, `Type`, `forall`, dependent functions, inductives, proof terms | Theorems are types; proofs are inhabitants                       | Supplemental chapter, PART 3, PART 4, PART 7 | Not a substitute for tactic and library knowledge     |
| Constructive logic                  | To prove existence or disjunction, construct evidence                        | `exists`, `/\`, `\/`, `False`, negation, decidability                  | Proofs often require witnesses and explicit cases                | Supplemental chapter, PART 4, PART 5         | Rocq can use classical axioms when imported           |
| Inductive definitions               | Constructors define values/evidence; eliminators define reasoning principles | `Inductive`, `match`, `destruct`, `induction`, recursive functions     | Data design determines proof strategy                            | PART 3, PART 4, PART 7                       | Induction principles must be learned concretely       |
| Proof engineering                   | Proof scripts are maintainable programs that build proof terms               | tactics, automation, helper lemmas, proof state                        | The goal is robust proof development, not just finishing a proof | PART 4, PART 9                               | Does not replace semantic understanding               |
| Certified programming               | Programs can be paired with formal specifications and correctness theorems   | executable functions, specs, extraction                                | Correctness claims must state the proof boundary                 | PART 5, PART 6, PART 7, PART 9               | Extraction does not verify the entire deployed system |
| Mechanized mathematics              | Mathematical structures can be formalized and checked                        | algebraic laws, finite types, equality, rewriting                      | Informal assumptions must become explicit hypotheses             | PART 3, PART 6, PART 8                       | Formalization cost is real                            |

**Common Pitfalls:** The main misuse of these lenses is over-theorizing. A Rocq user does not need a full formal metatheory of CIC to prove `forall n, n + 0 = n`; the user does need enough type-theoretic understanding to know why induction is required, what the induction hypothesis states, and why `reflexivity` may or may not close a goal.

### Design Philosophy — small trusted kernel, expressive logic, interactive construction, reusable libraries

Rocq’s design philosophy can be summarized as **trusted checking over trusted automation**. Automation is valuable, but the kernel remains the arbiter. A tactic can search, transform, rewrite, and call decision procedures, but the final proof must still be checkable.

| Design feature         | Problem solved                       | Capability gained                         | Cost introduced                             | Misuse encouraged                            | Programs/developments that benefit        | Developments that suffer                         |
| ---------------------- | ------------------------------------ | ----------------------------------------- | ------------------------------------------- | -------------------------------------------- | ----------------------------------------- | ------------------------------------------------ |
| Small trusted kernel   | Need confidence in proofs            | Centralized proof checking                | Kernel-level constraints can feel rigid     | Assuming tactic success equals understanding | High-assurance mathematics/software       | Quick-and-dirty scripts                          |
| Dependent types        | Need precise specifications          | Types can encode invariants               | Harder type inference and proof obligations | Over-encoding everything in types            | Certified algorithms, formal semantics    | Simple applications where tests suffice          |
| Constructive core      | Need computational meaning of proofs | Witnesses and algorithms can be extracted | Classical proofs may need reformulation     | Importing classical axioms casually          | Computable mathematics, verified programs | Purely classical developments without discipline |
| Inductive definitions  | Need structured data and reasoning   | Data and proof principles arise together  | Termination and elimination restrictions    | Weak induction statements                    | Datatypes, semantics, logical predicates  | Ad hoc encodings                                 |
| Tactic interaction     | Need human-guided formal proof       | Incremental proof construction            | Scripts can be brittle                      | Overusing automation                         | Large proofs with reusable structure      | Unstructured one-off scripts                     |
| Libraries and notation | Need reusable mathematics            | Dense, expressive formal developments     | Reading code can be difficult               | Importing scopes blindly                     | Mature formalization projects             | Beginners reading advanced code without tools    |

Rocq’s roadmap emphasizes both trustworthiness and usability: it points to self-verification, installation/accessibility, documentation, IDE improvements, metaprogramming platforms such as `Ltac2`, `Elpi`, and `MetaCoq`, and improved notation/structuring mechanisms. This current direction matters because Rocq’s challenge is not only logical expressiveness; it is making large formal developments maintainable and usable.

**Failure-first explanation:** The tempting mental model is “automation should solve proofs so I do not need to understand them.” The surprising behavior is that automated proofs often break after a small definition change, import change, or notation change. The correct explanation is that proof scripts are programs with dependencies on proof-state shape. The professional rule of thumb is: use automation to discharge stable low-level obligations, not to hide the central proof idea.

### What Rocq Makes Easy — when the problem matches the logic

Rocq makes certain tasks unusually natural because they align with its type-theoretic architecture.

| Task                                    | Why Rocq handles it well                             | Rocq mechanism                                 | Practical example               |
| --------------------------------------- | ---------------------------------------------------- | ---------------------------------------------- | ------------------------------- |
| Prove properties of recursive functions | Recursion and induction align structurally           | `Fixpoint`, `Inductive`, `induction`           | `forall n, n + 0 = n`           |
| Reason about syntax and semantics       | Inductive syntax and inductive relations are natural | inductive ASTs, evaluation relations           | determinism of evaluation       |
| Formalize algebraic laws                | Equational reasoning is explicit and checkable       | rewriting, lemmas, setoid rewriting, libraries | associativity of append         |
| Verify simple algorithms                | Functions can be paired with specs                   | correctness theorem over implementation        | verified boolean equality       |
| Encode invariants in types              | Types may depend on values                           | dependent records, indexed inductives          | length-indexed vectors          |
| Develop reusable proof libraries        | Lemmas compose through rewriting and tactics         | modules, sections, hints, typeclasses          | arithmetic/list libraries       |
| Extract pure verified code              | Executable definitions can be extracted              | extraction to OCaml/Haskell                    | certified functional algorithms |

**Practical consequence:** Rocq is strongest where the domain can be expressed as pure definitions, inductive structures, logical relations, and explicit specifications. It is less naturally suited to systems where correctness depends primarily on uncontrolled external effects unless those effects are modeled.

### What Rocq Makes Hard — formalization cost, proof maintenance, dependent elaboration, ecosystem complexity

Rocq makes some tasks hard for principled reasons. If a property is vague, the theorem cannot be stated. If a proof relies on intuition, the missing cases must be formalized. If a function may not terminate, Rocq’s core rejects it unless termination is made structurally or otherwise justified through accepted mechanisms.

| Hard area                  | Why it is hard                                         | Design reason                                        | Professional response                                     |
| -------------------------- | ------------------------------------------------------ | ---------------------------------------------------- | --------------------------------------------------------- |
| Stating the right theorem  | Quantifier order and generality control proof strength | The theorem type determines available hypotheses     | Design statements before proving                          |
| Dependent pattern matching | Equalities and indices must remain coherent            | Types depend on values                               | Learn inversion, dependent destruction, and helper lemmas |
| Proof maintenance          | Scripts depend on goal shape                           | Tactics are proof-state programs                     | Prefer stable lemmas and explicit proof structure         |
| Library navigation         | Names, scopes, notation, imports are dense             | Mature ecosystem with layered abstractions           | Use `Search`, `Check`, `Locate`, qualified names          |
| Automation boundaries      | Automation can hide proof intent                       | Search is heuristic and context-sensitive            | Automate boring leaves, not central arguments             |
| Termination                | Recursive definitions must be accepted as total        | Consistency requires avoiding unrestricted recursion | Use structural recursion or well-founded techniques       |
| Extraction boundary        | Extracted code runs outside Rocq                       | Kernel checks source proofs, not deployment          | State trusted assumptions explicitly                      |

**Common Pitfalls:** A failed proof often does not mean the theorem is false. It may mean the induction hypothesis is too weak, a variable should have been generalized, the rewrite direction is wrong, a definition is opaque, or the theorem statement has the wrong quantifier order.

### What Rocq Prevents, Discourages, and Leaves to Discipline — safety boundaries

Rocq prevents some classes of invalid reasoning by construction, discourages others through friction, and leaves some risks to user discipline.

| Category                            | Rocq behavior                                          | Example                                                                 | Practical interpretation                                 |
| ----------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------- |
| Prevented by kernel                 | Ill-typed terms and invalid proof terms are rejected   | A proof of `False` cannot be completed without inconsistent assumptions | Kernel checking is the central guarantee                 |
| Prevented by termination discipline | Unrestricted general recursion is rejected in the core | Non-structural `Fixpoint` may fail                                      | Totality protects consistency                            |
| Discouraged by constructive core    | Non-constructive reasoning is not available by default | Excluded middle is not freely usable                                    | Classical assumptions must be explicit                   |
| Discouraged by proof burden         | Vague specifications are hard to use                   | “This sort is correct” must become a formal theorem                     | Precision is mandatory                                   |
| Left to discipline                  | Choosing meaningful specifications                     | Proving the wrong theorem about an algorithm                            | A proof only validates the stated property               |
| Left to discipline                  | Managing automation opacity                            | `auto` solves a goal for unclear reasons                                | Maintainability is an engineering responsibility         |
| Left to discipline                  | Extraction trust boundary                              | Extracted OCaml/Haskell interacts with external systems                 | Whole-system correctness requires additional assumptions |
| Left to discipline                  | Importing axioms                                       | `Classical` or other axioms may alter constructive content              | Track assumptions carefully                              |

**Failure-first explanation:** The tempting mental model is “a checked Rocq file means the software is correct.” The surprising bug is that a verified function can satisfy a weak, wrong, or irrelevant specification. The correct semantic explanation is that Rocq checks derivability from assumptions, not the adequacy of the human-chosen specification. The professional rule of thumb is: inspect theorem statements as seriously as proof scripts.

### Relationship to Adjacent Languages and Systems — Lean, Agda, Isabelle/HOL, Haskell, OCaml, F*

Rocq sits at the intersection of dependent type theory, functional programming, mechanized mathematics, and program verification. Similar-looking constructs from adjacent languages can mislead.

| Adjacent language/system | Similarity                                                                | Difference                                                                                                    | What transfers                                         | What does not transfer cleanly                                    |
| ------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------- |
| Lean                     | Interactive theorem proving, dependent types, tactics, math formalization | Different elaborator, libraries, tactic ecosystem, syntax, community conventions                              | Theorem-as-type mental model, tactic proof development | Assuming tactics/libraries/notation correspond directly           |
| Agda                     | Dependent types, pattern matching, constructive logic                     | Agda emphasizes dependently typed programming style more directly; Rocq has a stronger tactic-proof tradition | Inductive families, total programming                  | Expecting all proofs to be written as direct programs             |
| Isabelle/HOL             | Proof assistant, formalized mathematics                                   | HOL rather than CIC; different logic and automation culture                                                   | Formal proof discipline                                | Propositions-as-types and dependent-type assumptions              |
| Haskell                  | Pure functional programming, algebraic datatypes, pattern matching        | Haskell is not a proof assistant and has non-total features                                                   | Recursion, ADT intuition, higher-order functions       | Treating types as full specifications                             |
| OCaml                    | Functional syntax lineage, extraction target, modules                     | OCaml has effects, runtime execution, and no dependent proof kernel                                           | Module and functional-programming instincts            | Assuming extracted behavior is kernel behavior                    |
| F*                       | Verification-oriented programming, dependent/refinement typing            | Different effect system and verification workflow                                                             | Spec/program pairing                                   | Expecting Rocq to feel like an SMT-backed verifier                |
| Idris                    | Dependent types and programming                                           | Different emphasis on programming and elaboration                                                             | Dependent pattern intuition                            | Assuming Rocq proof engineering is secondary                      |
| Ordinary Python/Java/C++ | Large software systems and testing culture                                | Different semantic contract and proof model                                                                   | Engineering discipline, API design                     | Runtime-first and test-first habits as the main correctness model |

**Better mental model:** Rocq is closest to a system where mathematics, programs, and proofs share a formal core, while development remains interactive and library-driven. It should not be flattened into “a strict Haskell,” “an older Lean,” or “a theorem syntax for mathematicians.”

### Transfer Map — habits from other languages

| Source-language habit or concept          | How it appears in Rocq                                                     | What transfers                    | What changes                                        | Common failure mode                                                | Better mental model                                              |
| ----------------------------------------- | -------------------------------------------------------------------------- | --------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Haskell-style algebraic datatypes         | `Inductive` definitions                                                    | Constructors and pattern matching | Inductives also generate proof principles           | Ignoring the induction principle                                   | A datatype is also a reasoning principle                         |
| Functional recursion                      | `Fixpoint`                                                                 | Structural recursion intuition    | Termination is checked for logical consistency      | Writing non-structural recursion and expecting acceptance          | Recursion must justify totality                                  |
| Unit testing                              | Examples, `Compute`, theorem checks                                        | Concrete examples still help      | Proofs establish universal properties               | Treating examples as correctness                                   | Examples explore; theorems certify                               |
| OO inheritance                            | Modules/typeclasses/canonical structures sometimes approximate abstraction | Interface thinking                | No ordinary subclass object model                   | Forcing class hierarchies into Rocq                                | Use algebraic structures, modules, and proof-relevant interfaces |
| Dynamic scripting                         | Tactic scripts may feel procedural                                         | Stepwise development              | Tactics construct proof terms under strict checking | Thinking tactic success is runtime execution                       | Proof scripts are proof-construction programs                    |
| Classical mathematical proof              | Theorem statements and proofs                                              | Logical structure                 | Constructive core requires witnesses/cases          | Trying contradiction/excluded-middle arguments without assumptions | Track constructive content and imported axioms                   |
| Compiler or runtime optimization thinking | Reduction, proof checking, extraction                                      | Cost awareness                    | Bottlenecks are often proof checking and automation | Optimizing extracted code while ignoring proof-checking cost       | Separate proof-time, extraction-time, and runtime cost           |
| TypeScript-style static types             | Rocq types are checked statically                                          | Type-level precision matters      | Rocq types can encode propositions and proofs       | Thinking type annotations are just documentation                   | Types are semantic obligations                                   |

**Common Pitfalls:** The most damaging transfer error is importing the wrong success criterion. In ordinary programming, a program that compiles and passes tests may be acceptable. In Rocq, a proof that compiles may still be mathematically unhelpful if the statement is weak, the assumptions are too strong, or the specification is misaligned.

### Strengths, Weaknesses, and Tradeoffs — professional judgment table

| Strength                  | Cost                                        | Best use                                    | Poor use                                          |
| ------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------------- |
| Machine-checked proofs    | Formalization time                          | High-assurance theorems and algorithms      | Low-risk scripts where tests suffice              |
| Dependent types           | Harder elaboration and proof obligations    | Encoding invariants and specifications      | Overly clever encodings for simple data           |
| Inductive reasoning       | Requires careful theorem design             | Recursive structures, operational semantics | Vague real-world domains without models           |
| Tactic automation         | Can solve routine goals quickly             | Arithmetic, rewriting, repetitive cases     | Hiding central proof ideas                        |
| Extraction                | Connects proofs to executable code          | Pure certified algorithms                   | Verifying whole applications by implication       |
| Large inherited ecosystem | Many reusable results                       | Mathematical and verification projects      | Beginners expecting uniform naming and simplicity |
| Constructive core         | Computational content and explicit evidence | Verified programs, constructive mathematics | Untracked classical reasoning                     |

**Design principle:** Rocq’s tradeoffs are acceptable when correctness, explicit assumptions, proof reuse, and formal auditability are more valuable than rapid informal implementation. They are burdensome when the project does not need formal guarantees.

### Rocq’s Core Mechanisms at Macro Level — what later syntax must explain

The later syntax reference should not be a random list. Rocq’s syntax exists to express a small number of semantic roles.

| Macro mechanism    | Representative syntax                     | What it means                                                      | Why it matters                                    |
| ------------------ | ----------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------- |
| Binding            | `fun`, `forall`, `let`, section variables | Names introduce assumptions, parameters, or local definitions      | Proof states are structured by binders            |
| Definition         | `Definition`, `Fixpoint`, `Inductive`     | Terms, recursive functions, and constructors enter the environment | Definitions become computation and proof material |
| Proposition        | `Prop`, theorem statement                 | A logical claim represented as a type                              | Proof means inhabitation                          |
| Proof mode         | `Proof`, tactics, `Qed`, `Defined`        | Interactive construction of evidence                               | Tactics transform goals                           |
| Computation        | `Compute`, `simpl`, reduction             | Definitional content evaluates                                     | Some equalities close by computation              |
| Rewriting          | `rewrite`, equality lemmas                | Propositional equality transforms goals                            | Most proofs need controlled replacement           |
| Case analysis      | `destruct`, `inversion`, pattern matching | Split by possible constructors                                     | Constructors determine cases                      |
| Induction          | `induction`                               | Use an induction principle                                         | Recursive data requires recursive proof           |
| Import/library use | `From Stdlib Require Import ...`          | Add definitions, theorems, tactics, notation                       | Library context changes proof search and notation |
| Automation         | `auto`, `eauto`, `lia`, domain tactics    | Delegate routine proof search                                      | Useful but can obscure proof intent               |

**Common Pitfalls:** `simpl` and `rewrite` are not interchangeable. `simpl` uses computation/definitional reduction; `rewrite` uses a proof of propositional equality. Confusing these is one of the fastest ways to misunderstand Rocq proof states.

### Rocq’s Type and Data Model at Macro Level — data, propositions, evidence

In Rocq, data and propositions live in a shared typed framework, but they are not used identically. A natural number is data. A theorem about natural numbers is a proposition. A proof of that theorem is evidence. An inductively defined predicate may itself behave like structured evidence.

| Modeling need                | Rocq construct                                       | Example concept                           | Design meaning                                                        |
| ---------------------------- | ---------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------- |
| Define ordinary data         | `Inductive`, `Record`, `Definition`                  | booleans, natural numbers, lists, trees   | Constructors specify possible values                                  |
| Define recursive computation | `Fixpoint`                                           | list length, append, evaluator            | Recursion must be accepted as terminating                             |
| Define logical property      | `Definition` returning `Prop`, `Inductive` predicate | sortedness, evenness, evaluation relation | Properties can be manipulated as types                                |
| Define dependent invariant   | indexed inductive, dependent record                  | vector length, typed expression           | Types can carry value-level information                               |
| Define reusable structure    | modules, typeclasses, canonical structures           | monoids, orders, rings                    | Abstraction supports proof reuse                                      |
| Define equality reasoning    | `eq`, lemmas, rewriting                              | associativity, commutativity              | Equality is both computational and propositional depending on context |

**Failure-first explanation:** The tempting mental model is “an inductive type is just an enum or ADT.” The surprising behavior is that an `Inductive` definition also generates eliminators and induction principles. The correct explanation is that constructors define not only values but the permitted ways to analyze and prove about those values. The professional rule of thumb is: when defining data, immediately inspect the induction principle it gives.

### Runtime, Memory, Errors, Effects, and Concurrency — what matters and what is secondary

Rocq’s central execution model is not the runtime model of a deployed application. Inside Rocq, the important notions are elaboration, type checking, conversion, reduction, proof checking, tactic execution, and build-time dependency checking. For extracted code, ordinary runtime questions return, but they belong to the target language and extraction boundary.

| Topic             | Rocq-level importance                              | Main issue                                                   | Where later treatment belongs |
| ----------------- | -------------------------------------------------- | ------------------------------------------------------------ | ----------------------------- |
| Runtime execution | Secondary inside Gallina; central after extraction | `Compute`/reduction differs from deployed execution          | PART 7                        |
| Memory allocation | Mostly indirect                                    | Proof terms, checking time, extracted code allocation        | PART 7                        |
| Errors            | Central as development failures                    | type errors, tactic failures, failed obligations             | PART 5, PART 9                |
| Effects           | Controlled/pure in core definitions                | External effects must be modeled or handled after extraction | PART 5, PART 7                |
| Resources         | Mostly extraction/tooling issue                    | files, I/O, external APIs outside core guarantees            | PART 5                        |
| Concurrency       | Not a core Gallina programming model               | Formalizing concurrency differs from running concurrent code | PART 7                        |
| Build performance | Central in large developments                      | imports, proof checking, automation, dependency graph        | PART 9                        |

**Common Pitfalls:** Do not ask “what is Rocq’s garbage collector?” as if Rocq were primarily a deployed runtime. Rocq itself is implemented and executed as software, but the language-level issue for users is usually proof checking, reduction, tactic execution, library imports, and extraction boundaries.

### Ecosystem Philosophy — core prover, standard library, platform, external libraries, proof culture

Rocq’s ecosystem is layered. The prover core is not the same as the standard library, and the standard library is not the same as the Platform. The Platform is explicitly described as a distribution that combines the Rocq Prover with selected libraries and plugins, aiming to be dependable, easy to install, comprehensive, and operating-system independent.

| Ecosystem layer       | Role                                         | Practical use                                                              | Risk                                                      |
| --------------------- | -------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------- |
| Kernel/prover core    | Trusted checking and core language machinery | Accepts or rejects terms/proofs                                            | Misunderstanding what the kernel actually guarantees      |
| `Corelib`             | Minimal core library infrastructure          | Basic support and tactic infrastructure                                    | Assuming it includes the full historical standard library |
| `Stdlib`              | Standard definitions and theorems            | `Nat`, `List`, `Bool`, arithmetic, common lemmas                           | Notation and naming can be dense                          |
| Rocq Platform         | Curated package distribution                 | Stable teaching/development setup                                          | May lag newest prover version                             |
| External libraries    | Domain-specific formalization and automation | MathComp, Iris-like domain libraries, Equations-like tools when compatible | Version and convention mismatch                           |
| Tooling               | Editors, LSP, build systems, documentation   | Interactive development and CI                                             | Tool configuration can dominate project setup             |
| Community conventions | Naming, proof style, automation discipline   | Readability and maintainability                                            | Different libraries use different proof cultures          |

The roadmap explicitly identifies usability, documentation, IDE improvements, metaprogramming platforms, notation, structuring mechanisms, and balancing generality with domain-specific libraries as important future directions. These are not peripheral; they reflect the fact that modern proof assistants succeed or fail partly on ecosystem ergonomics.

**Common Pitfalls:** Importing a library is not neutral. It can add notation, scopes, hint databases, tactics, and assumptions that change how goals are displayed and solved. Professional Rocq users read imports as part of the proof context.

### Historical Motivation — from Coq heritage to Rocq identity

Rocq is the successor of Coq and inherits a long tradition of proof-assistant research, dependent type theory, mechanized mathematics, and certified programming. The official roadmap describes Rocq as building on forty years of Coq experience while aiming to improve accessibility, trustworthiness, ecosystem maintainability, and user experience.

| Historical pressure                        | Design/evolution response                               | Lasting consequence                                            |
| ------------------------------------------ | ------------------------------------------------------- | -------------------------------------------------------------- |
| Need to mechanize higher-order mathematics | Proof assistant based on expressive type theory         | Mathematical definitions and proofs become formal objects      |
| Need to prove program correctness          | Specifications, proofs, and extraction                  | Verified programming becomes a core use case                   |
| Need to scale formal developments          | Libraries, modules, tactics, automation                 | Proof engineering becomes a discipline                         |
| Need to preserve ecosystem continuity      | Compatibility shims and migration path from Coq to Rocq | Coq-era material remains relevant                              |
| Need to improve usability                  | Rocq naming, website, platform, tooling roadmap         | Modern practice increasingly emphasizes onboarding and tooling |
| Need domain-specific proof power           | Plugins, automation, domain libraries                   | General kernel plus specialized ecosystem                      |

The rename from Coq to Rocq should therefore be understood as both branding and ecosystem transition. It does not erase the Coq literature; it changes the current official identity, command naming, library organization, and future-facing ecosystem language.

### Mature, Emerging, and Overhyped Trends — what matters now

| Trend category           | Trend                                          | Status                | Driving pressure                                              | Caveat                                                       |
| ------------------------ | ---------------------------------------------- | --------------------- | ------------------------------------------------------------- | ------------------------------------------------------------ |
| Mature                   | Mechanized mathematics                         | Established           | Need for formally checked mathematical results                | Formalization remains labor-intensive                        |
| Mature                   | Program verification and certified extraction  | Established           | High-assurance software and algorithms                        | Proof boundary must be explicit                              |
| Mature                   | Tactic-based proof engineering                 | Established           | Human-guided proof construction at scale                      | Scripts can be brittle                                       |
| Mature                   | Library-driven proof development               | Established           | Reuse of definitions, lemmas, structures                      | Library conventions differ                                   |
| Emerging                 | Improved IDE/LSP-style workflows               | Active direction      | Interactive proof development needs better ergonomics         | Tooling maturity varies by setup                             |
| Emerging                 | Metaprogramming and stronger automation        | Active direction      | Large proofs need scalable proof construction                 | Automation opacity can harm maintenance                      |
| Emerging                 | Domain-specific formalization libraries        | Active direction      | Cryptography, PL theory, separation logic, hardware, robotics | Domain libraries require specialized knowledge               |
| Emerging                 | AI-assisted proof work                         | Exploratory direction | Usability and proof search pressure                           | Trust still rests on kernel checking                         |
| Overhyped if unqualified | “Proof assistants will replace testing”        | Misleading            | Formal proof can prove universal properties                   | Testing, validation, integration, and specs remain necessary |
| Overhyped if unqualified | “Extraction gives verified software”           | Misleading            | Extraction preserves certain proven source-level properties   | Deployment includes unverified boundaries                    |
| Overhyped if unqualified | “Automation removes need to understand proofs” | Misleading            | Automation can solve routine goals                            | Maintainable proofs require semantic understanding           |

The official roadmap mentions AI-powered features as part of improving usability and productivity, but the same roadmap frames trustworthiness and proof checking as central commitments. The correct interpretation is that AI or automation may assist proof development; it does not replace the need for kernel-checked proof objects and carefully stated specifications.

### Rocq’s Main Strength-Cost Profile — when to choose it

Rocq is most appropriate when the value of formal confidence exceeds the cost of formalization. It is least appropriate when the main difficulty is fast iteration over informal requirements, external-system integration, UI behavior, or operational concerns that are not being formally modeled.

| Project profile                     | Rocq fit                       | Reason                                                                           |
| ----------------------------------- | ------------------------------ | -------------------------------------------------------------------------------- |
| Formal mathematics                  | Excellent                      | Definitions and proofs are first-class                                           |
| Programming-language metatheory     | Excellent                      | Syntax, typing, and operational semantics are naturally inductive                |
| Certified pure algorithms           | Excellent                      | Functions and correctness theorems align well                                    |
| Compiler verification               | Strong                         | Semantics preservation can be stated and proved                                  |
| Security-critical core logic        | Strong                         | Small critical algorithms/specifications can be verified                         |
| Whole web application verification  | Limited unless heavily modeled | Effects, external APIs, deployment, and UI are outside the simple proof boundary |
| Quick data-processing scripts       | Usually poor                   | Formalization overhead likely exceeds benefit                                    |
| Exploratory product code            | Usually poor                   | Requirements instability fights formal specification                             |
| Teaching logic/type theory          | Strong                         | Rocq makes proof obligations explicit                                            |
| Teaching ordinary programming first | Context-dependent              | Rocq’s proof-first model may obscure general programming goals                   |

**Professional rule of thumb:** Use Rocq when the artifact is specification-heavy, correctness-critical, structurally mathematical, recursively defined, or proof-reusable. Do not use Rocq merely because “types are safer”; use it because machine-checked proof is worth the engineering cost.

### Macro-Level Misconceptions — better first principles

| Misconception                                      | Why it is wrong or incomplete                                                                       | Better mental model                                               |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| “Rocq is just Coq renamed.”                        | Rocq inherits Coq but Rocq 9 introduced official naming, command, and library-organization changes. | Rocq is Coq’s successor with continuity and migration concerns.   |
| “Rocq is a programming language like Haskell.”     | Rocq has executable functions, but its center is proof development and kernel checking.             | Rocq is a proof assistant with a dependently typed term language. |
| “Tactics prove the theorem.”                       | Tactics construct proof terms that must be checked.                                                 | The kernel accepts proof terms, not vibes or scripts.             |
| “A theorem is like a comment.”                     | A theorem is a type that requires an inhabitant.                                                    | Theorem statements are semantic obligations.                      |
| “If `simpl` does not work, Rocq is stuck.”         | `simpl` only performs certain reductions; propositional rewriting may be needed.                    | Distinguish computation from equality reasoning.                  |
| “Classical proofs always work the same way.”       | Rocq’s core logic is constructive unless classical principles are imported.                         | Track witnesses, disjunction choices, and assumptions.            |
| “Extraction means the final software is verified.” | Extraction preserves source-level certified content under assumptions, not external systems.        | State the proof boundary explicitly.                              |
| “Automation is always more professional.”          | Excessive automation can make proofs fragile and unreadable.                                        | Automate stable routine obligations; expose central proof ideas.  |
| “A failed induction means induction was wrong.”    | The theorem statement may be too specific or quantified in the wrong order.                         | Generalize before induction when needed.                          |

### Part 1 Summary — the macro mental model

Rocq should be approached as a **kernel-checked proof-development system built on dependent type theory**. Its surface syntax matters, but syntax is secondary to the interaction among definitions, propositions, proof terms, tactics, computation, libraries, and checked assumptions.

The core shift is this: in ordinary programming, the main artifact is usually a running program. In Rocq, the main artifact is a formal development: definitions, specifications, programs, lemmas, proofs, and sometimes extracted code. The expert question is not merely “does this run?” but “what has been defined, what has been specified, what has been proved, under which assumptions, with what proof boundary, and how maintainable is the proof development?”

The rest of the guide should therefore proceed from this model:

| Later part | What Part 1 prepares                                                                    |
| ---------- | --------------------------------------------------------------------------------------- |
| PART 2     | Read Rocq syntax as layered term language, command language, and tactic language        |
| PART 3     | Model data and propositions through inductive and dependent types                       |
| PART 4     | Construct proofs and abstractions with tactics, functions, induction, and helper lemmas |
| PART 5     | Manage module boundaries, assumptions, errors, effects, and extraction trust            |
| PART 6     | Use `Stdlib`, Platform packages, notation, search, and ecosystem tools professionally   |
| PART 7     | Understand reduction, checking, proof-term construction, opacity, extraction, and cost  |
| PART 8     | Interpret Rocq’s evolution from Coq heritage to modern Rocq ecosystem                   |
| PART 9     | Build maintainable proof developments with robust tooling and workflow                  |
| PART 10    | Move from structured understanding to expert proof engineering and ecosystem judgment   |

## PART 2 — Core Syntax and Semantic Primitives Reference

This part is a **source-reading reference**, not a full type-theory chapter. Its purpose is to make Rocq source code readable by distinguishing the term language, command language, and tactic language. The deeper treatment of inductives, dependent types, proof engineering, modules, libraries, extraction, and runtime/checking behavior will appear in later parts, following the requested coverage structure.

### Three Syntax Layers — Gallina, vernacular commands, tactic languages

Rocq code is not one homogeneous language. A `.v` file usually mixes at least three syntactic layers:

| Layer                       | What it is                                                                             | Typical syntax                                                    | What it manipulates                               | Common failure mode                                               |
| --------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------- |
| Gallina term language       | The core language of terms, functions, propositions, inductive values, and proof terms | `fun`, `forall`, `match`, `let`, `Definition`, expressions        | Terms and types checked by the kernel             | Treating propositions as comments rather than types               |
| Vernacular command language | Top-level commands that extend or query the environment                                | `Check`, `Print`, `Require Import`, `Theorem`, `Qed`              | Global environment, modules, declarations, proofs | Confusing commands with executable expressions                    |
| Tactic language             | Interactive proof-construction language                                                | `intros`, `apply`, `rewrite`, `induction`, `simpl`, `reflexivity` | Proof states: goals and hypotheses                | Thinking tactics are the proof instead of proof-term constructors |

A minimal Rocq file may look like this:

```coq
From Stdlib Require Import Arith.

Definition id_nat (n : nat) : nat := n.

Theorem id_nat_correct : forall n : nat, id_nat n = n.
Proof.
  intros n.
  reflexivity.
Qed.
```

This short file contains all three layers. `From Stdlib Require Import Arith.` is a vernacular command. `Definition id_nat ... := ...` introduces a Gallina term. `Theorem id_nat_correct ...` declares a proposition to be proved. `Proof. intros n. reflexivity. Qed.` uses tactics to construct a proof term, which the kernel checks before accepting the theorem.

**Language-design note:** Rocq’s surface syntax is best understood as an interface for building a typed global environment. Every successful command either queries that environment, extends it with a checked object, or constructs a checked proof.

**Common Pitfalls:** A beginner often reads a proof script as if it were an imperative program whose side effect is “proving.” The better model is: tactics transform goals while constructing a proof term; `Qed` asks the kernel to check and store the completed proof.

### File Structure and Command Termination — declarations, periods, global environment

Rocq commands normally end with a period. The period is not cosmetic. It tells the parser that the command is complete.

| Construct         | Meaning                               | Syntax                                        | Canonical example                  | Practical consequence                      | Common pitfall                                     |
| ----------------- | ------------------------------------- | --------------------------------------------- | ---------------------------------- | ------------------------------------------ | -------------------------------------------------- |
| Top-level command | Query or extend the environment       | command followed by `.`                       | `Check nat.`                       | Commands are processed sequentially        | Forgetting the final period                        |
| Declaration       | Introduce a name                      | `Definition`, `Inductive`, `Theorem`, `Lemma` | `Definition x := 3.`               | Adds a checked binding to the environment  | Assuming later code can affect earlier definitions |
| Import command    | Bring library content into scope      | `From ... Require Import ... .`               | `From Stdlib Require Import List.` | Changes available names, notation, tactics | Importing too much and losing track of notation    |
| Proof block       | Interactive construction of a theorem | `Proof. ... Qed.`                             | see below                          | Proof script builds evidence               | Confusing `Qed` and `Defined`                      |
| Query command     | Inspect environment                   | `Check`, `Print`, `Search`, `Locate`          | `Check plus.`                      | Essential for source reading               | Not using queries enough                           |

Example:

```coq
Check nat.
Check 0.
Check S.
Print nat.
```

Typical meanings:

```coq
nat : Set
0 : nat
S : nat -> nat
```

The exact printed form may vary depending on notation and printing settings, but the semantic point is stable: `nat` is a type, `0` is a term of type `nat`, and `S` is a constructor function from `nat` to `nat`.

**Failure-first explanation:** The tempting mental model is “Rocq files are scripts executed top to bottom.” The surprising behavior is that a command may fail not because runtime execution failed, but because a term cannot be typed, a proof is incomplete, a name is unavailable, or a notation is not in scope. The correct model is that a `.v` file incrementally builds a checked logical environment.

**Professional rule of thumb:** When reading a file, identify what each top-level command contributes to the environment: a definition, theorem, notation, module, import, hint, or query.

### Comments and Documentation Syntax — comments, nesting, proof intent

Rocq comments use `(* ... *)`. Comments may be nested, which is useful when temporarily commenting out blocks that already contain comments.

| Syntax                  | Meaning                         | Example                                      | Professional use                   |
| ----------------------- | ------------------------------- | -------------------------------------------- | ---------------------------------- |
| `(* comment *)`         | Comment                         | `(* This lemma rewrites the accumulator. *)` | Explain proof intent               |
| Nested comments         | Comment inside comment          | `(* outer (* inner *) outer *)`              | Temporarily disable code fragments |
| Descriptive lemma names | Documentation through naming    | `app_nil_r`, `map_length`                    | Make proof libraries searchable    |
| Proof comments          | Explain non-obvious proof steps | `(* Generalize before induction. *)`         | Preserve maintainability           |

Example:

```coq
(* The accumulator must be generalized before induction,
   otherwise the induction hypothesis is too weak. *)
```

**Language-design note:** Rocq proof scripts can be extremely compact. Comments are not for explaining every tactic; they are for recording the proof idea when the tactic sequence does not make that idea obvious.

**Common Pitfalls:** Over-commenting mechanical steps such as `intros` and `reflexivity` creates noise. Under-commenting a clever `generalize dependent`, `inversion`, or automation-heavy proof makes future maintenance difficult.

### Names, Identifiers, and Conventions — readability, searchability, namespaces

Rocq enforces syntax for identifiers, but professional readability depends more on convention than enforcement. Names carry proof-engineering information: whether something is a type, constructor, lemma, tactic, module, or local hypothesis.

| Naming pattern          | Common use                                               | Example                      | Practical consequence              | Caveat                                                |
| ----------------------- | -------------------------------------------------------- | ---------------------------- | ---------------------------------- | ----------------------------------------------------- |
| Lowercase names         | Functions, variables, lemmas                             | `length`, `map`, `app_nil_r` | Easy to search and compose         | Not universal                                         |
| Capitalized names       | Modules, inductive types, constructors in some libraries | `List`, `Nat`, `Some`        | Signals namespace/type-like object | Stdlib has exceptions such as `O`, `S`, `nil`, `cons` |
| Short hypothesis names  | Local assumptions                                        | `H`, `H1`, `Heq`, `IHn`      | Fast proof scripting               | Can become unreadable in large proofs                 |
| Descriptive lemma names | Reusable theorem names                                   | `app_assoc`, `plus_n_O`      | Searchable proof libraries         | Library naming conventions differ                     |
| Qualified names         | Disambiguation through namespace                         | `Nat.add_comm`               | Avoids ambiguity                   | Requires knowing module structure                     |

Example:

```coq
Theorem add_0_r : forall n : nat, n + 0 = n.
Proof.
  intros n.
  induction n as [| n IHn].
  - reflexivity.
  - simpl.
    rewrite IHn.
    reflexivity.
Qed.
```

In this example, `IHn` conventionally means “induction hypothesis for `n`.” The name is not semantically special, but the convention helps humans read the proof.

**Common Pitfalls:** Using names such as `H`, `H0`, `H1`, `H2` everywhere can make proofs unreadable. Conversely, very long local names can make tactic scripts cumbersome. The professional compromise is to use short names for local mechanical facts and descriptive names for reusable lemmas.

### Basic Queries — `Check`, `Print`, `About`, `Search`, `Locate`, `Compute`

Rocq is interactive. Query commands are not peripheral; they are part of normal professional development.

| Command   | Purpose                                    | Example               | What to look for                    | Common mistake                                      |
| --------- | ------------------------------------------ | --------------------- | ----------------------------------- | --------------------------------------------------- |
| `Check`   | Show the type of a term                    | `Check Nat.add.`      | What type Rocq inferred             | Guessing types instead of checking                  |
| `Print`   | Show a definition or inductive declaration | `Print nat.`          | Constructors, body, transparency    | Forgetting that notation may hide real structure    |
| `About`   | Show information about a name              | `About Nat.add_comm.` | Type, locality, opacity, arguments  | Not checking theorem assumptions                    |
| `Search`  | Search for lemmas by pattern or symbols    | `Search (_ + 0 = _).` | Existing reusable facts             | Reproving library lemmas                            |
| `Locate`  | Find notation meaning                      | `Locate "+".`         | Which notation and scope are active | Misreading overloaded notation                      |
| `Compute` | Evaluate a term by reduction               | `Compute 2 + 3.`      | Definitional computation result     | Treating computation as proof of arbitrary equality |

Example:

```coq
Check Nat.add_comm.
About Nat.add_comm.
Search (_ + 0 = _).
Locate "+".
Compute 2 + 3.
```

**Language-design note:** Query commands are a defense against false intuition. Rocq code often uses implicit arguments, notation scopes, coercions, and library abbreviations. Querying reveals what the kernel-facing object actually is.

**Common Pitfalls:** `Search` is most useful when the theorem statement is shaped well. Searching for a vague English idea rarely works. Search for a type pattern, symbol, or equality shape.

### Sorts and the First Type-Theoretic Vocabulary — `Prop`, `Set`, `Type`

Rocq’s core is type-theoretic. At the surface level, three names are immediately important: `Prop`, `Set`, and `Type`.

| Sort   | Rough role                       | Example inhabitant              | Practical use                          | Caveat                                                         |
| ------ | -------------------------------- | ------------------------------- | -------------------------------------- | -------------------------------------------------------------- |
| `Prop` | Universe of logical propositions | `forall n : nat, n = n`         | Theorem statements, logical predicates | Proofs usually do not compute as program data after extraction |
| `Set`  | Small computational data types   | `nat`, `bool`                   | Ordinary data                          | Often less emphasized than `Type` in modern code               |
| `Type` | Universe of types                | `nat`, `list nat`, `nat -> nat` | General type-level programming         | Universe levels are hidden until they matter                   |

Example:

```coq
Check nat.
Check bool.
Check Prop.
Check Type.
Check forall A : Prop, A -> A.
```

A proposition is not a boolean. `bool` has values `true` and `false`. A proposition in `Prop` is a type whose inhabitants are proofs. This difference is central.

```coq
Check true.
Check True.
Check False.
```

Typical distinction:

| Object  | Kind         | Meaning                                                         |
| ------- | ------------ | --------------------------------------------------------------- |
| `true`  | Boolean data | A computable boolean value                                      |
| `True`  | Proposition  | A trivially provable proposition                                |
| `False` | Proposition  | An uninhabited proposition, unless assumptions are inconsistent |

**Failure-first explanation:** The tempting mental model is “propositions are booleans.” The surprising behavior is that proving `P \/ Q` requires constructing evidence for one side, while computing a `bool` only produces `true` or `false`. The correct explanation is that `Prop` and `bool` serve different roles: logical evidence versus computable data.

**Professional rule of thumb:** Use `bool` for computation and decidable tests; use `Prop` for specifications and theorems. Connect them with reflection lemmas when needed.

### Primitive Data and Literals — natural numbers, booleans, unit, options, pairs, lists

Rocq’s everyday data comes mostly from inductive definitions and libraries. Numerals and list notation are surface conveniences over constructors and library definitions.

| Data form       | Example syntax            | Underlying idea                | Common use                         | Pitfall                                       |
| --------------- | ------------------------- | ------------------------------ | ---------------------------------- | --------------------------------------------- |
| Natural numbers | `0`, `1`, `2`, `S n`      | Inductive Peano naturals       | Simple arithmetic proofs           | Assuming machine-integer behavior             |
| Booleans        | `true`, `false`           | Two-constructor inductive type | Decidable computation              | Confusing `bool` with `Prop`                  |
| Unit            | `tt`                      | Single inhabitant              | Trivial data                       | Rarely central in proof scripts               |
| Option          | `Some x`, `None`          | Optional value                 | Partial lookup, safe absence       | Forgetting to prove properties for both cases |
| Pair            | `(x, y)`                  | Product data                   | Return two values                  | Confusing pair destructuring with conjunction |
| List            | `[]`, `x :: xs`, `[x; y]` | Inductive sequence             | Structural recursion and induction | Forgetting `Import ListNotations`             |

Example:

```coq
From Stdlib Require Import List.
Import ListNotations.

Check 0.
Check true.
Check Some 3.
Check @None nat.
Check (1, true).
Check [1; 2; 3].
```

The expression `@None nat` explicitly supplies the type argument to `None`. Without context, `None` is polymorphic and Rocq may not know which `option A` is intended.

**Language-design note:** Many Rocq “literals” are not primitive in the way machine integers or arrays are primitive in systems languages. They are often notations for inductively defined structures. That is why induction and pattern matching work so naturally over them.

**Common Pitfalls:** Natural numbers in Rocq are mathematical Peano naturals, not fixed-width CPU integers. This is excellent for proof but can be inefficient if extracted naively or used for large computations inside proofs.

### Binding and Local Definitions — `Definition`, parameters, `let`, section variables

Binding introduces names. In Rocq, names may bind data, functions, types, propositions, assumptions, or local proof variables.

| Binding form             | Meaning                         | Syntax                            | Example                            | Practical consequence                |
| ------------------------ | ------------------------------- | --------------------------------- | ---------------------------------- | ------------------------------------ |
| Global definition        | Add a named term to environment | `Definition name ... := term.`    | `Definition two := 2.`             | Reusable and checkable               |
| Annotated definition     | State expected type             | `Definition name : type := term.` | `Definition two : nat := 2.`       | Catches unintended inference         |
| Parameterized definition | Function-like definition        | `Definition f (x : A) := body.`   | `Definition inc (n : nat) := S n.` | Parameters are binders               |
| Local binding            | Name subterm locally            | `let x := t in u`                 | `let y := n + 1 in y * y`          | Avoids duplication                   |
| Section variable         | Shared parameter in a section   | `Variable A : Type.`              | used inside `Section`              | Generalized when section closes      |
| Hypothesis               | Local assumption/proposition    | `Hypothesis H : P.`               | inside section                     | Adds assumption to later definitions |

Example:

```coq
Definition two : nat := 2.

Definition inc (n : nat) : nat :=
  S n.

Definition square_after_inc (n : nat) : nat :=
  let m := S n in
  m * m.
```

Annotated definitions are often better in serious code because they make intended types visible and prevent misleading inference.

**Failure-first explanation:** The tempting mental model is “a parameterized `Definition` is syntactically different from a function.” The surprising behavior is that `Definition inc (n : nat) := S n` and `Definition inc := fun n : nat => S n` define essentially the same function. The correct semantic explanation is that parameters are binders elaborated into function terms.

**Professional rule of thumb:** Use explicit result types for exported definitions and important lemmas. Let inference help with local details, not with public interfaces.

### Functions and Function Types — `fun`, arrows, dependent products

Rocq functions are terms. Function types are also types. The non-dependent arrow `A -> B` is a special case of the dependent product `forall x : A, B` where `B` does not depend on `x`.

| Construct               | Meaning                         | Syntax                          | Example                              | Design meaning                                      |
| ----------------------- | ------------------------------- | ------------------------------- | ------------------------------------ | --------------------------------------------------- |
| Anonymous function      | Function term                   | `fun x : A => body`             | `fun n : nat => S n`                 | Functions are first-class terms                     |
| Named function          | Definition of function term     | `Definition f (x : A) := body.` | `Definition inc n := S n.`           | Top-level binding                                   |
| Function type           | Non-dependent function          | `A -> B`                        | `nat -> nat`                         | Input type does not appear in output type           |
| Dependent function type | Output type may depend on input | `forall x : A, B x`             | `forall n : nat, P n`                | Core of quantification and dependent typing         |
| Multiple arguments      | Curried binders                 | `(x : A) (y : B)`               | `Definition f (x y : nat) := x + y.` | Functions take arguments one at a time semantically |

Example:

```coq
Definition inc1 : nat -> nat :=
  fun n : nat => S n.

Definition inc2 (n : nat) : nat :=
  S n.

Check inc1.
Check inc2.
```

Dependent example:

```coq
Check forall n : nat, n = n.
```

This is both a universally quantified proposition and a dependent function type at the level of the propositions-as-types interpretation. A proof of this theorem is a function that, given `n : nat`, returns evidence for `n = n`.

**Interdisciplinary Lens: Calculus of Inductive Constructions**

| Item                      | Explanation                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| What it clarifies         | Why `forall` is both universal quantification and dependent function space                                    |
| Language feature involved | `forall`, `fun`, theorem statements, proof terms                                                              |
| Practical consequence     | `intros n` in a proof corresponds to constructing a function over `n`                                         |
| Limit of the lens         | This explains the core semantics, but actual proof scripts still depend on tactic behavior and library lemmas |

**Common Pitfalls:** Do not read `forall n : nat, P n` merely as mathematical text. In Rocq, it is a type. To prove it, one typically introduces an arbitrary `n` and constructs a proof of `P n`.

### Implicit Arguments and Explicit Arguments — hidden parameters, `@`, readability

Rocq often infers arguments from context. This is powerful but can make source code difficult to read.

Example:

```coq
Check Some.
Check @Some.
```

`Some` is polymorphic: it works for any type `A`. The type argument is often implicit.

```coq
Check Some 3.
Check @Some nat 3.
```

Both forms represent the same idea, but the second explicitly supplies the hidden type parameter.

| Form                       | Meaning                       | Example               | When to use                         |
| -------------------------- | ----------------------------- | --------------------- | ----------------------------------- |
| Implicit argument          | Rocq infers omitted parameter | `Some 3`              | Normal code when context is clear   |
| Explicit argument with `@` | Show all arguments            | `@Some nat 3`         | Debugging, teaching, disambiguation |
| Type annotation            | Give Rocq expected type       | `(None : option nat)` | When inference lacks context        |
| Printing controls          | Reveal hidden structure       | `Set Printing All.`   | Debugging complex elaboration       |

Example ambiguity:

```coq
Check None.
```

Rocq may not have enough information to determine which `option A` is intended. A type annotation fixes it:

```coq
Check (None : option nat).
```

**Failure-first explanation:** The tempting mental model is “what I see is what Rocq checks.” The surprising behavior is that Rocq may infer implicit arguments not displayed in the source. The correct explanation is that surface syntax is elaborated into a more explicit term. The professional rule of thumb is: when confused, use `Check`, `Print`, `About`, `@`, and printing settings to expose hidden arguments.

**Common Pitfalls:** Misreading implicit arguments is a major source of confusion in mature Rocq libraries. This becomes especially important with typeclasses, canonical structures, coercions, and overloaded notation.

### Type Annotations and Inference — when to be explicit

Rocq’s elaborator can infer many types, but professional code should not hide important interfaces.

| Situation                  | Prefer inference  | Prefer explicit annotation | Reason                           |
| -------------------------- | ----------------- | -------------------------- | -------------------------------- |
| Small local term           | Yes               | Not usually needed         | Keeps proof scripts concise      |
| Exported function          | Sometimes         | Often yes                  | Documents intended interface     |
| Theorem statement          | No                | Always explicit enough     | The theorem is the specification |
| Polymorphic definition     | Context-dependent | Often yes                  | Avoids ambiguous generality      |
| Dependent pattern matching | Rarely enough     | Often necessary            | Guides elaboration               |
| Library-facing API         | No                | Yes                        | Supports maintainability         |

Example:

```coq
Definition double n := n + n.
```

Rocq can infer `n : nat` only if notation and context force it. A clearer exported version is:

```coq
Definition double (n : nat) : nat :=
  n + n.
```

For theorem statements, explicitness is even more important:

```coq
Theorem double_0 : double 0 = 0.
Proof.
  reflexivity.
Qed.
```

A theorem is not documentation after the fact. It is the formal contract being checked.

**Common Pitfalls:** Excessive reliance on inference can produce definitions that are technically accepted but difficult to understand, search, or reuse. Conversely, excessive annotations can obscure simple terms. The professional balance is explicit public interfaces and concise local terms.

### `Definition`, `Example`, `Lemma`, `Theorem` — declarations and proof obligations

Several vernacular commands introduce named claims or objects. Some are semantically similar but carry different human conventions.

| Command      | Typical use                                       | Requires proof?                        | Example                          | Convention                  |
| ------------ | ------------------------------------------------- | -------------------------------------- | -------------------------------- | --------------------------- |
| `Definition` | Define term, function, proposition, or proof term | Only if defining a proof term directly | `Definition id_nat ... := ... .` | General-purpose             |
| `Example`    | Small theorem-like example                        | Yes, if proposition stated             | `Example add_0_ex : 0 + 0 = 0.`  | Demonstration or local fact |
| `Lemma`      | Reusable supporting theorem                       | Yes                                    | `Lemma app_nil_r : ...`          | Helper theorem              |
| `Theorem`    | Important named theorem                           | Yes                                    | `Theorem add_comm : ...`         | Main result                 |
| `Corollary`  | Result following from previous theorem            | Yes                                    | `Corollary ...`                  | Derived result              |
| `Fact`       | Small factual theorem                             | Yes                                    | `Fact ...`                       | Minor result                |

Example:

```coq
Definition id_nat (n : nat) : nat := n.

Example id_nat_3 : id_nat 3 = 3.
Proof.
  reflexivity.
Qed.

Lemma id_nat_eq : forall n : nat, id_nat n = n.
Proof.
  intros n.
  reflexivity.
Qed.
```

At the kernel level, `Lemma` and `Theorem` both introduce proved constants. The distinction is mostly communicative: a `Lemma` is usually a supporting result; a `Theorem` is usually a result of greater conceptual importance.

**Language-design note:** Rocq makes the proof object part of the global environment. Naming a lemma is not just documentation; it creates a reusable proof term that later rewriting, applying, or automation may use.

**Common Pitfalls:** Do not reserve lemmas only for mathematically impressive statements. In Rocq, small helper lemmas are often the difference between a robust proof and a brittle script.

### Transparent and Opaque Definitions — `Defined`, `Qed`, unfolding, computation

A proof or definition may be transparent or opaque. This affects whether Rocq can unfold it during computation and conversion.

| Ending      | Typical effect                                     | Common use                                  | Practical consequence               |
| ----------- | -------------------------------------------------- | ------------------------------------------- | ----------------------------------- |
| `Qed.`      | Ends proof opaquely                                | Most theorem proofs                         | Proof body is hidden from reduction |
| `Defined.`  | Ends proof transparently                           | Computationally relevant definitions/proofs | Body may unfold during computation  |
| `Admitted.` | Accepts without proof as an axiom-like placeholder | Temporary development only                  | Breaks proof completeness           |
| `Abort.`    | Cancels current proof                              | Failed or abandoned proof                   | Adds nothing to environment         |

Example:

```coq
Definition three : nat.
Proof.
  exact 3.
Defined.

Compute three.
```

Because `three` was ended with `Defined`, it can compute to `3`.

By contrast, ordinary theorem proofs usually end with `Qed`:

```coq
Theorem plus_0_r_small : forall n : nat, n + 0 = n.
Proof.
  intros n.
  induction n as [| n IHn].
  - reflexivity.
  - simpl. rewrite IHn. reflexivity.
Qed.
```

This opacity is good for proof abstraction and performance, but it matters if later computation expects a body to unfold.

**Failure-first explanation:** The tempting mental model is “`Qed` and `Defined` both just finish the proof.” The surprising behavior is that later computation or conversion may treat them differently. The correct explanation is that transparency affects whether the body is available for unfolding. The professional rule of thumb is: use `Qed` for ordinary propositions; use `Defined` only when the constructed object should remain computationally transparent.

**Common Pitfalls:** Ending everything with `Defined` can make reduction expensive and expose implementation details. Ending computationally relevant constructions with `Qed` can block expected unfolding.

### Constants, Variables, Parameters, and Assumptions — environment discipline

Rocq allows different ways to introduce names. These differ in whether they provide a definition, assume a value, or create a local context.

| Form         | Meaning                          | Example                       | Risk                                    |
| ------------ | -------------------------------- | ----------------------------- | --------------------------------------- |
| `Definition` | Name with body                   | `Definition x := 3.`          | Body may be too specific or too opaque  |
| `Parameter`  | Assumed object with type         | `Parameter A : Type.`         | Adds an assumption without construction |
| `Axiom`      | Assumed proposition/proof        | `Axiom excluded_middle : ...` | Changes logical assumptions             |
| `Variable`   | Local or section-level parameter | `Variable A : Type.`          | Scope must be understood                |
| `Hypothesis` | Local proposition assumption     | `Hypothesis H : P.`           | Later theorems may depend on it         |
| `Context`    | Grouped variables/hypotheses     | `Context {A : Type}.`         | Implicit context can be hidden          |

Example:

```coq
Section WithA.
  Variable A : Type.
  Variable x : A.

  Definition const_x (y : A) : A := x.
End WithA.
```

After the section closes, Rocq generalizes over section variables. The resulting `const_x` has parameters corresponding to `A` and `x`.

**Language-design note:** Rocq tracks assumptions. A theorem proved under variables, hypotheses, parameters, or axioms carries those dependencies. This is essential for trust management.

**Common Pitfalls:** `Axiom` and `Parameter` are useful but dangerous. They let development proceed without construction. In serious proof development, assumptions should be explicit, justified, minimized, and reviewed.

### Minimal Proof Skeleton — theorem statement, proof mode, proof state, closing

A basic theorem has a statement, a proof mode, tactic steps, and a closing command.

```coq
Theorem id_prop : forall A : Prop, A -> A.
Proof.
  intros A HA.
  exact HA.
Qed.
```

This proof teaches the central propositions-as-types pattern:

| Line                                         | Meaning                                         | Proof-state effect                              |
| -------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `Theorem id_prop : forall A : Prop, A -> A.` | Declare the theorem type                        | New proof obligation                            |
| `Proof.`                                     | Enter proof mode                                | Shows goal                                      |
| `intros A HA.`                               | Introduce arbitrary proposition and proof of it | Goal becomes `A`; hypothesis `HA : A` available |
| `exact HA.`                                  | Provide exact proof term                        | Goal solved                                     |
| `Qed.`                                       | Kernel checks and stores proof                  | Theorem added opaquely                          |

The proof term behind this theorem is essentially:

```coq
fun (A : Prop) (HA : A) => HA
```

One can define it directly:

```coq
Definition id_prop_term : forall A : Prop, A -> A :=
  fun (A : Prop) (HA : A) => HA.
```

**Interdisciplinary Lens: Constructive Logic**

| Item                      | Explanation                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| What it clarifies         | A proof of `A -> A` is a function from evidence of `A` to evidence of `A`                     |
| Language feature involved | `forall`, implication `->`, `intros`, `exact`                                                 |
| Practical consequence     | Simple logical proofs correspond to simple proof terms                                        |
| Limit of the lens         | More complex proof scripts also depend on inductive principles, rewriting, and library lemmas |

**Common Pitfalls:** A proof of `A -> A` is not a symbolic derivation floating outside the language. It is a term of function type. This is the first mental-model shift required for Rocq.

### Equality — definitional equality, propositional equality, rewriting

Rocq has two equality ideas that must not be confused. **Definitional equality** is equality by computation, unfolding, and conversion. **Propositional equality** is an explicit proposition, written with `=`, that may require a proof.

| Equality form            | What it means                                  | Surface form                   | How it is used                                          | Common pitfall                                |
| ------------------------ | ---------------------------------------------- | ------------------------------ | ------------------------------------------------------- | --------------------------------------------- |
| Definitional equality    | Two terms reduce to the same canonical meaning | implicit, not usually written  | Closed by conversion, often via `reflexivity`           | Thinking every true equality is definitional  |
| Propositional equality   | A proposition asserting equality of two terms  | `x = y`                        | Used with `rewrite`, `symmetry`, `transitivity`, lemmas | Trying `simpl` when a lemma is needed         |
| Reflexive equality proof | Evidence that a term equals itself             | `eq_refl`                      | Kernel-level equality constructor                       | Forgetting that `reflexivity` uses conversion |
| Rewriting                | Replace one side using equality evidence       | `rewrite H.`                   | Transform goal or hypothesis                            | Rewriting in wrong direction                  |
| Symmetry                 | Reverse equality direction                     | `symmetry.` or `rewrite <- H.` | Turn `x = y` into `y = x`                               | Using the wrong orientation repeatedly        |

Example:

```coq
Check eq.
Check eq_refl.

Theorem eq_self_nat : forall n : nat, n = n.
Proof.
  intros n.
  reflexivity.
Qed.
```

Here `reflexivity` succeeds because the goal is literally reflexive after possible conversion.

A more informative example:

```coq
Theorem zero_plus : forall n : nat, 0 + n = n.
Proof.
  intros n.
  reflexivity.
Qed.
```

This usually closes by computation because addition on natural numbers is defined by recursion on its first argument. But the superficially similar theorem below does not close immediately by the same reasoning:

```coq
Theorem plus_zero : forall n : nat, n + 0 = n.
Proof.
  intros n.
  induction n as [| n IHn].
  - reflexivity.
  - simpl.
    rewrite IHn.
    reflexivity.
Qed.
```

The difference is semantic. `0 + n` reduces because the recursive definition of addition can inspect the first argument immediately. `n + 0` cannot reduce when `n` is an arbitrary variable, so induction is required.

**Failure-first explanation:** The tempting mental model is “if the equation is mathematically obvious, `reflexivity` should prove it.” The surprising behavior is that `0 + n = n` and `n + 0 = n` behave differently. The correct explanation is that definitional equality depends on computation, not on mathematical obviousness. The professional rule of thumb is: ask whether the equality follows by reduction or by an induction/rewriting lemma.

**Common Pitfalls:** `simpl` does not prove arbitrary algebra. It unfolds and reduces according to definitions. If the required equality is not definitional, use induction, rewriting, or an existing theorem.

### Rewriting Syntax — `rewrite`, direction, hypotheses, selected locations

Rewriting is one of the most common Rocq proof operations. It uses a proof of propositional equality to replace matching terms.

| Form                | Meaning                         | Example                   | Use case                                     | Common pitfall                            |
| ------------------- | ------------------------------- | ------------------------- | -------------------------------------------- | ----------------------------------------- |
| `rewrite H.`        | Rewrite left-to-right using `H` | `rewrite IHn.`            | Use hypothesis or lemma in default direction | Direction may be wrong                    |
| `rewrite <- H.`     | Rewrite right-to-left           | `rewrite <- app_assoc.`   | Reverse a known equality                     | Rewriting too broadly                     |
| `rewrite H in H2.`  | Rewrite inside hypothesis `H2`  | `rewrite IHn in Hlen.`    | Transform local assumption                   | Accidentally changing a useful hypothesis |
| `rewrite H in *.`   | Rewrite in all goals/hypotheses | `rewrite H in *.`         | Rare broad cleanup                           | Can destroy proof readability             |
| `replace t with u.` | Manually state replacement      | `replace (n + 0) with n.` | Control complex rewriting                    | Creates a side-goal that must be proved   |

Example:

```coq
Theorem rewrite_demo :
  forall a b c : nat, a = b -> b = c -> a = c.
Proof.
  intros a b c Hab Hbc.
  rewrite Hab.
  exact Hbc.
Qed.
```

Alternative:

```coq
Theorem rewrite_demo_reverse :
  forall a b c : nat, a = b -> b = c -> a = c.
Proof.
  intros a b c Hab Hbc.
  rewrite <- Hbc.
  exact Hab.
Qed.
```

Both proofs are valid, but they orient rewriting differently.

**Language-design note:** Rewriting is not string replacement. It is type-directed transformation using equality evidence. Rocq must ensure the replacement preserves typing.

**Common Pitfalls:** Rewriting too early can make the induction hypothesis unusable or hide the intended structure of the goal. In maintainable proofs, rewrite when it clarifies the goal, not merely because a rewrite is possible.

### Logic Connectives as Types — implication, conjunction, disjunction, existence, negation

Rocq’s logical connectives are propositions with proof rules. They are not control-flow constructs, though tactics for them often feel like structured programming.

| Logical form    | Meaning                    | To prove it                      | To use it                       | Typical tactics             |
| --------------- | -------------------------- | -------------------------------- | ------------------------------- | --------------------------- |
| `A -> B`        | Implication                | assume `A`, prove `B`            | apply to proof of `A`           | `intros`, `apply`           |
| `A /\ B`        | Conjunction                | prove both sides                 | destruct into both proofs       | `split`, `destruct`         |
| `A \/ B`        | Disjunction                | prove left or right              | case analyze                    | `left`, `right`, `destruct` |
| `exists x, P x` | Existential proposition    | provide witness and proof        | destruct into witness and proof | `exists`, `destruct`        |
| `~ A`           | Negation                   | prove `A -> False`               | apply to contradiction          | `unfold not`, `intro`       |
| `False`         | Absurd proposition         | impossible without contradiction | derives anything                | `destruct H`, `exfalso`     |
| `True`          | Trivially true proposition | constructor proof                | rarely informative              | `trivial`, `constructor`    |

Examples:

```coq
Theorem and_comm :
  forall A B : Prop, A /\ B -> B /\ A.
Proof.
  intros A B H.
  destruct H as [HA HB].
  split.
  - exact HB.
  - exact HA.
Qed.
```

```coq
Theorem or_comm :
  forall A B : Prop, A \/ B -> B \/ A.
Proof.
  intros A B H.
  destruct H as [HA | HB].
  - right. exact HA.
  - left. exact HB.
Qed.
```

```coq
Theorem exists_demo :
  exists n : nat, n = 0.
Proof.
  exists 0.
  reflexivity.
Qed.
```

**Interdisciplinary Lens: Constructive Logic**

| Item                      | Explanation                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| What it clarifies         | A proof of `exists x, P x` must contain a witness; a proof of `A \/ B` must choose a side                                                   |
| Language feature involved | `exists`, `left`, `right`, `split`, `destruct`                                                                                              |
| Practical consequence     | Constructive proofs carry computational information                                                                                         |
| Limit of the lens         | Rocq can use classical principles when explicitly imported; constructive core does not mean all Rocq developments avoid classical reasoning |

**Failure-first explanation:** The tempting mental model is “to prove `A \/ B`, show that not both can fail.” In constructive Rocq, that is not enough unless a classical principle or decidability result is available. The correct proof usually requires choosing `left` with evidence for `A` or `right` with evidence for `B`.

**Common Pitfalls:** `A \/ B` is not a boolean `or`. It is a proposition whose proof contains evidence for one side. Similarly, `exists x, P x` is not merely a claim of nonemptiness; it requires a witness.

### Basic Tactic Syntax — goal transformation, proof-state programming

Tactics are commands used inside proof mode. They transform proof states. A proof state contains goals and a local context of variables and hypotheses.

| Tactic          | Basic meaning                                 | Example        | Goal-state effect                         | Common pitfall                           |
| --------------- | --------------------------------------------- | -------------- | ----------------------------------------- | ---------------------------------------- |
| `intros`        | Introduce binders/hypotheses                  | `intros n H.`  | Moves assumptions into context            | Introducing too much before generalizing |
| `exact`         | Provide exact proof term                      | `exact H.`     | Solves goal if type matches               | Type mismatch                            |
| `assumption`    | Find matching hypothesis                      | `assumption.`  | Solves goal if context contains proof     | Fails if equality needs rewriting        |
| `apply`         | Use theorem/implication                       | `apply H.`     | Changes goal to premises of `H`           | Applying theorem in wrong direction      |
| `split`         | Prove conjunction                             | `split.`       | Creates two subgoals                      | Forgetting both branches                 |
| `left`, `right` | Choose disjunction side                       | `left.`        | Selects one side to prove                 | Choosing side without evidence           |
| `exists`        | Provide existential witness                   | `exists 0.`    | Leaves property for witness               | Wrong witness creates hard goal          |
| `destruct`      | Case analysis                                 | `destruct b.`  | Creates one subgoal per constructor       | Losing needed equality information       |
| `induction`     | Induction over inductive value                | `induction n.` | Creates base and step goals               | Induction hypothesis too weak            |
| `simpl`         | Simplify by reduction                         | `simpl.`       | Performs computation                      | Expecting algebraic reasoning            |
| `rewrite`       | Rewrite by equality                           | `rewrite H.`   | Replaces matching terms                   | Wrong direction                          |
| `reflexivity`   | Solve by conversion/reflexivity               | `reflexivity.` | Closes definitional equality goals        | Fails if lemma needed                    |
| `unfold`        | Expand definition                             | `unfold f.`    | Replaces name by body                     | Over-unfolding hurts readability         |
| `inversion`     | Analyze impossible/equality-constrained cases | `inversion H.` | Uses constructor injectivity/disjointness | Produces cluttered contexts              |
| `auto`          | Basic proof search                            | `auto.`        | Solves simple goals if possible           | Opaque proof scripts                     |
| `lia`           | Linear integer/natural arithmetic solver      | `lia.`         | Solves linear arithmetic goals            | Does not solve nonlinear algebra         |

Example proof-state movement:

```coq
Theorem implication_chain :
  forall A B C : Prop, (A -> B) -> (B -> C) -> A -> C.
Proof.
  intros A B C HAB HBC HA.
  apply HBC.
  apply HAB.
  exact HA.
Qed.
```

Here `apply HBC` changes the goal from `C` to `B`, because `HBC : B -> C`.

**Language-design note:** Tactics are not merely syntactic shortcuts. They are programs that manipulate proof states and construct terms. Understanding the proof state is more important than memorizing tactic names.

**Common Pitfalls:** `auto` can close a goal while teaching nothing about why the proof works. In early learning and code review, prefer explicit scripts until the proof pattern is understood.

### Proof-State Interpretation — goals, hypotheses, bullets, subgoals

A typical proof state has a local context above a line and the current goal below it. For example, after `intros A B H` in the proof of conjunction commutativity, the state is conceptually:

```coq
A, B : Prop
H : A /\ B
============================
B /\ A
```

This means: under arbitrary propositions `A` and `B`, with hypothesis `H : A /\ B`, prove `B /\ A`.

Bullets organize subgoals:

```coq
Theorem and_comm_bullets :
  forall A B : Prop, A /\ B -> B /\ A.
Proof.
  intros A B H.
  destruct H as [HA HB].
  split.
  - exact HB.
  - exact HA.
Qed.
```

| Proof-script feature      | Meaning                                | Professional use                       | Common pitfall                     |
| ------------------------- | -------------------------------------- | -------------------------------------- | ---------------------------------- |
| Local context             | Variables and hypotheses available now | Read before choosing tactic            | Ignoring available hypotheses      |
| Goal                      | What remains to prove                  | Tactic choice should follow goal shape | Applying tactics mechanically      |
| Subgoal                   | A proof obligation branch              | Use bullets to structure               | Losing track of nested goals       |
| Bullet `-`, `+`, `*`      | Subgoal delimiters                     | Enforce proof structure                | Mismatched bullets                 |
| Naming pattern `as [...]` | Names generated components             | Improves readability                   | Accepting bad auto-generated names |

**Failure-first explanation:** The tempting mental model is “choose tactics from memory.” The better professional model is “read the goal shape first.” If the goal is a conjunction, use `split`; if it is an implication or universal quantifier, use `intros`; if it is an equality reducible by computation, try `reflexivity`; if it is a structural property of an inductive value, consider `induction`.

**Common Pitfalls:** A proof script that works without bullets may still be fragile. Bullets document and enforce the intended subgoal structure.

### Pattern Matching — `match`, constructors, dependent caveats

Pattern matching is the core way to consume inductive data. It appears both in ordinary functions and in proof reasoning.

| Pattern form                | Meaning              | Example                      | Use case          | Common pitfall                   |                                                        |
| --------------------------- | -------------------- | ---------------------------- | ----------------- | -------------------------------- | ------------------------------------------------------ |
| `match b with true => ...   | false => ... end`    | Case split on boolean        | Boolean branch    | Computation over decidable value | Confusing with proposition case analysis               |
| `match n with 0 => ...      | S n' => ... end`     | Case split on natural number | Natural recursion | Define recursive functions       | Forgetting recursive call must be structurally smaller |
| `match xs with [] => ...    | x :: xs' => ... end` | Case split on list           | List processing   | Structural recursion over lists  | Missing `ListNotations`                                |
| `match o with Some x => ... | None => ... end`     | Case split on optional value | Safe partial data | Total handling of absence        | Forgetting the `None` case                             |

Example:

```coq
Definition is_zero (n : nat) : bool :=
  match n with
  | 0 => true
  | S _ => false
  end.
```

List example:

```coq
From Stdlib Require Import List.
Import ListNotations.

Definition head_or_zero (xs : list nat) : nat :=
  match xs with
  | [] => 0
  | x :: _ => x
  end.
```

Pattern matching must cover all constructors. This is a form of totality: a function over an inductive type should specify behavior for every possible value.

**Language-design note:** `match` is not just branching syntax. It is an elimination form for inductive data. In proofs, `destruct` and `induction` are tactic-level ways to invoke related elimination principles.

**Common Pitfalls:** In dependent pattern matching, branches may refine types in ways that are not obvious from the surface syntax. When this happens, use `Check`, inspect generated goals, and state helper lemmas rather than forcing a complex match expression.

### Boolean Branching — `if`, `then`, `else`

In Rocq, `if ... then ... else ...` branches on a boolean expression. It is syntactic convenience for pattern matching on `bool`.

| Construct              | Meaning                      | Example                        | Requirement              | Pitfall                             |                                   |
| ---------------------- | ---------------------------- | ------------------------------ | ------------------------ | ----------------------------------- | --------------------------------- |
| `if b then x else y`   | Branch on `b : bool`         | `if Nat.eqb n 0 then 1 else 2` | Condition must be `bool` | Trying to branch directly on `Prop` |                                   |
| `match b with ... end` | Explicit boolean elimination | `match b with true => x        | false => y end`          | Must cover both constructors        | Verbose when simple `if` suffices |

Example:

```coq
Definition sign_like (n : nat) : nat :=
  if Nat.eqb n 0 then 0 else 1.
```

A proposition is not a boolean condition:

```coq
(* This is not the right mental model:
   if n = 0 then 0 else 1
*)
```

The expression `n = 0` has type `Prop`, not `bool`. To compute, use a boolean test such as `Nat.eqb n 0`. To reason about the connection between the boolean and the proposition, use lemmas about `Nat.eqb`.

**Failure-first explanation:** The tempting mental model is “any proposition can be used as an `if` condition.” The surprising behavior is that Rocq requires a boolean for computational branching. The correct explanation is that `Prop` expresses logical claims, while `bool` expresses computable two-valued data.

**Professional rule of thumb:** Use boolean functions for computation; use propositions for specifications; connect them through correctness lemmas.

### Recursion and Structural Termination — `Fixpoint`

Recursive functions are defined with `Fixpoint`, but Rocq requires recursion to be accepted as terminating. The simplest accepted form is structural recursion: recursive calls are made on a structurally smaller argument.

| Construct           | Meaning                            | Example                          | Design reason                    | Common pitfall                                        |
| ------------------- | ---------------------------------- | -------------------------------- | -------------------------------- | ----------------------------------------------------- |
| `Fixpoint`          | Recursive definition               | `Fixpoint length ...`            | Define total recursive functions | Non-structural recursion rejected                     |
| Structural argument | Argument that decreases            | tail of list, predecessor of nat | Ensures termination              | Recursive call hidden in non-obvious expression       |
| Base case           | Constructor with no recursive call | `0`, `[]`                        | Stops recursion                  | Missing branch impossible because pattern match total |
| Recursive case      | Constructor with smaller component | `S n'`, `x :: xs'`               | Recurse on substructure          | Recurse on same value                                 |

Example:

```coq
Fixpoint my_length {A : Type} (xs : list A) : nat :=
  match xs with
  | [] => 0
  | _ :: xs' => S (my_length xs')
  end.
```

Addition-like example:

```coq
Fixpoint add_left (n m : nat) : nat :=
  match n with
  | 0 => m
  | S n' => S (add_left n' m)
  end.
```

This recursive call is on `n'`, a structural subterm of `n`.

**Language-design note:** Termination checking is not just a programming convenience. In a proof assistant, unrestricted recursion can threaten logical consistency. Rocq’s guarded/structural discipline protects the logic.

**Common Pitfalls:** A function that obviously terminates to a human may still be rejected if Rocq cannot see the structural decrease. Later parts will cover proof-engineering responses: changing the definition, using well-founded recursion, or using library support.

### Local Control Flow in Proofs — `destruct` versus `induction`

Both `destruct` and `induction` split by constructors, but they serve different purposes.

| Tactic                           | What it does                                     | When to use                                    | Example goal shape                       | Common pitfall                                 |
| -------------------------------- | ------------------------------------------------ | ---------------------------------------------- | ---------------------------------------- | ---------------------------------------------- |
| `destruct x`                     | Case analysis on `x`                             | Finite case split without recursive hypothesis | booleans, options, simple contradictions | Using it when induction hypothesis is needed   |
| `induction x`                    | Case analysis plus induction hypothesis          | Recursive property over inductive data         | `forall n, n + 0 = n`                    | Inducting after introducing too many variables |
| `inversion H`                    | Analyze impossible constructor/equality evidence | Contradictions and injectivity                 | `Some x = None` impossible               | Generating clutter                             |
| `case_eq` / remembered equations | Case split preserving equation                   | Need branch equation retained                  | complex matches                          | Overcomplicating simple proofs                 |

Example where `destruct` is enough:

```coq
Theorem negb_involutive_bool :
  forall b : bool, negb (negb b) = b.
Proof.
  intros b.
  destruct b.
  - reflexivity.
  - reflexivity.
Qed.
```

Example where induction is needed:

```coq
Theorem plus_0_r_again :
  forall n : nat, n + 0 = n.
Proof.
  intros n.
  induction n as [| n IHn].
  - reflexivity.
  - simpl. rewrite IHn. reflexivity.
Qed.
```

**Failure-first explanation:** The tempting mental model is “`destruct` and `induction` are both case splitting, so either one should work.” The surprising behavior is that `destruct n` gives no induction hypothesis, so recursive goals often become stuck. The correct explanation is that induction supplies a hypothesis for structurally smaller cases. The professional rule of thumb is: use `destruct` for finite non-recursive branching; use `induction` for properties over recursive structure.

**Common Pitfalls:** Induction can also fail if the theorem has been stated too specifically. Sometimes the correct fix is not a stronger tactic but a stronger theorem statement.

### Notation and Scopes — readable surface, hidden structure

Rocq uses notation extensively. Symbols such as `+`, `::`, `[]`, `/\`, `\/`, `exists`, and `=` are readable, but they can hide underlying definitions and scopes.

| Feature             | Meaning                                       | Example                   | Tool for inspection   | Pitfall                                    |
| ------------------- | --------------------------------------------- | ------------------------- | --------------------- | ------------------------------------------ |
| Notation            | Custom surface syntax                         | `x + y`                   | `Locate "+"`          | Assuming symbol has one meaning everywhere |
| Scope               | Namespace for notation interpretation         | `nat_scope`, `list_scope` | `Open Scope`, `Check` | Wrong scope changes parsing/printing       |
| Importing notations | Bring notation into scope                     | `Import ListNotations.`   | `Locate`, `Print`     | Forgetting list notation import            |
| Qualified names     | Avoid ambiguity                               | `Nat.add`                 | `Check Nat.add`       | Overusing unqualified short names          |
| Coercions           | Implicit conversions between classes of terms | library-dependent         | `Print Coercions`     | Not seeing inserted conversions            |

Example:

```coq
From Stdlib Require Import List.
Import ListNotations.

Check [].
Check [1; 2; 3].
Locate "::".
```

Arithmetic notation:

```coq
Check Nat.add.
Locate "+".
Check 1 + 2.
```

**Language-design note:** Notation makes formal developments readable, especially mathematics. The cost is that surface syntax may no longer reveal the exact constant, scope, or implicit arguments being used.

**Common Pitfalls:** When a term does not parse or prints unexpectedly, do not assume the type theory is difficult. First check imports, scopes, and notation.

### Imports, Libraries, and Qualified Names — `Require`, `Import`, `From`

Rocq source code depends heavily on imports. Modern Rocq code increasingly uses `From Stdlib Require Import ...` for standard library imports.

| Form                            | Meaning                                  | Example                            | Practical use                        | Common pitfall                     |
| ------------------------------- | ---------------------------------------- | ---------------------------------- | ------------------------------------ | ---------------------------------- |
| `Require Import M.`             | Load and import module                   | `Require Import Arith.`            | Older/common style                   | Ambiguous origin in large projects |
| `From Stdlib Require Import M.` | Load module from `Stdlib`                | `From Stdlib Require Import List.` | Clear modern standard-library import | Module paths vary across versions  |
| `Import M.`                     | Bring names/notations into current scope | `Import ListNotations.`            | Use short names and notation         | Namespace pollution                |
| Qualified name                  | Refer without importing all names        | `Nat.add_comm`                     | Avoid ambiguity                      | Verbose but clear                  |
| `Require Export`                | Re-export imported module                | library design                     | Build public APIs                    | Accidental dependency leakage      |

Example:

```coq
From Stdlib Require Import Arith List.
Import ListNotations.

Check Nat.add_comm.
Check map.
Check [1; 2; 3].
```

**Professional rule of thumb:** Prefer explicit imports and qualified names in library code when ambiguity matters. Use local imports for notation-heavy sections.

**Common Pitfalls:** A proof that works only because of a broad import may break when the file is reorganized. Keep imports intentional and review which notation and automation they introduce.

### Modules, Sections, and Local Context — basic source-reading view

Full module-system treatment belongs in PART 5. Here the goal is only to recognize common structure.

| Construct  | Basic meaning                          | Example                | Source-reading consequence                   |
| ---------- | -------------------------------------- | ---------------------- | -------------------------------------------- |
| `Module`   | Namespace and structure unit           | `Module M.`            | Names may be qualified                       |
| `End`      | Close module/section                   | `End M.`               | Local context may be generalized or sealed   |
| `Section`  | Local context for definitions/theorems | `Section S.`           | Variables may become parameters              |
| `Variable` | Introduce section variable             | `Variable A : Type.`   | Later definitions may be generalized over it |
| `Context`  | Introduce grouped context              | `Context {A : Type}.`  | Often creates implicit parameters            |
| `Local`    | Limit declaration scope                | `Local Open Scope ...` | Prevents global pollution                    |

Example:

```coq
Section ListsOverA.
  Variable A : Type.

  Definition singleton (x : A) : list A :=
    x :: nil.
End ListsOverA.

Check singleton.
```

After the section closes, `singleton` is generalized over `A`.

**Language-design note:** Sections are a proof-engineering convenience. They let a file develop theory under shared parameters and then generalize definitions automatically.

**Common Pitfalls:** Hidden generalized section variables can make final theorem types more general than expected. Use `Check` after `End` to inspect exported types.

### Basic Scope and Locality Commands — controlling notation and declarations

Rocq has several commands that affect locality and interpretation. They are powerful but should be used deliberately.

| Command             | Meaning                                       | Example                       | Use case                    | Pitfall                       |
| ------------------- | --------------------------------------------- | ----------------------------- | --------------------------- | ----------------------------- |
| `Open Scope`        | Make notation scope active                    | `Open Scope nat_scope.`       | Control parsing/printing    | Global scope surprises        |
| `Close Scope`       | Deactivate notation scope                     | `Close Scope list_scope.`     | Restore context             | Rarely used carefully         |
| `Local`             | Limit effect to current module/section        | `Local Open Scope nat_scope.` | Avoid leaking settings      | Forgetting locality           |
| `Arguments`         | Configure implicit/explicit arguments         | `Arguments f {A} x.`          | Improve call syntax         | Hiding too much               |
| `Notation`          | Define custom notation                        | `Notation "x ⊕ y" := ...`     | Domain-specific readability | Obscure syntax                |
| `Reserved Notation` | Reserve notation before inductive definitions | common for relations          | Mutually defined syntax     | Hard to read without `Locate` |

**Common Pitfalls:** Notation can make a development elegant for insiders and hostile to outsiders. In professional libraries, notation should serve recurring concepts, not decorate one-off definitions.

### Coercions and Cast-Like Behavior — implicit structure, not arbitrary casting

Rocq does not have arbitrary unsafe casts as a normal programming mechanism. However, it has coercions and implicit arguments that may make terms appear to change type automatically.

| Mechanism            | What it does                | Example use                                          | Risk                                   |
| -------------------- | --------------------------- | ---------------------------------------------------- | -------------------------------------- |
| Implicit argument    | Omits inferable parameter   | `Some 3` instead of `@Some nat 3`                    | Hidden information                     |
| Coercion             | Inserts declared conversion | structure-to-carrier coercion in algebraic libraries | Source does not show inserted function |
| Type annotation      | Forces/checks expected type | `(x : A)`                                            | May reveal mismatch                    |
| Explicit application | Shows all parameters        | `@f A x`                                             | Verbose but diagnostic                 |

**Language-design note:** Coercions are controlled elaboration mechanisms, not dynamic casts. They improve mathematical readability but increase the gap between surface code and elaborated terms.

**Common Pitfalls:** If a term appears to have a type it should not have, suspect a coercion or implicit argument before suspecting unsoundness.

### Basic Error and Failure Syntax — rejected terms, tactic failures, incomplete proofs

Rocq failure is usually static or proof-state failure, not runtime exception in the ordinary application sense.

| Failure kind                         | Example symptom                         | What it usually means                                 | Professional response                  |
| ------------------------------------ | --------------------------------------- | ----------------------------------------------------- | -------------------------------------- |
| Parse error                          | Command not accepted syntactically      | Missing period, wrong notation, bad grammar           | Check command termination and notation |
| Unknown reference                    | Name not found                          | Missing import or wrong namespace                     | Use qualified name or import           |
| Type error                           | Term has unexpected type                | Wrong argument, missing annotation, implicit mismatch | `Check` subterms                       |
| Universe/typeclass/elaboration issue | Inference fails mysteriously            | Hidden arguments or universe constraints              | Add annotations; inspect printing      |
| Tactic failure                       | `No such goal`, `Unable to unify`, etc. | Tactic does not match current goal                    | Read proof state                       |
| Incomplete proof                     | Unshelved goals remain                  | Obligations not solved                                | Inspect all goals                      |
| Termination rejection                | Recursive definition refused            | Rocq cannot see structural decrease                   | Redesign recursion                     |
| Admitted proof                       | `Admitted` used                         | The proof is assumed, not completed                   | Track as trust debt                    |

Example of a tactic mismatch:

```coq
Theorem tactic_mismatch :
  forall A B : Prop, A -> B -> A.
Proof.
  intros A B HA HB.
  (* split. would fail: the goal is A, not a conjunction. *)
  exact HA.
Qed.
```

**Failure-first explanation:** The tempting mental model is “a tactic failed, so the theorem is hard.” The correct first step is to inspect the goal. Many tactic failures are shape mismatches: using `split` when the goal is not a conjunction, `rewrite` when there is no matching subterm, or `reflexivity` when equality is not definitional.

**Common Pitfalls:** Do not patch tactic failures by adding random automation. A robust proof follows the structure of the goal.

### `Admitted`, `Abort`, and Trust Debt — placeholders and incomplete developments

Rocq allows incomplete or canceled proofs, but they have very different meanings.

| Command     | Meaning                        | Adds theorem to environment? | Trust implication               | Proper use                                |
| ----------- | ------------------------------ | ---------------------------- | ------------------------------- | ----------------------------------------- |
| `Abort.`    | Cancel current proof           | No                           | No theorem added                | Abandon failed attempt                    |
| `Admitted.` | Accept statement without proof | Yes                          | Adds assumption/trust debt      | Temporary placeholder only                |
| `Axiom`     | Declare proposition as assumed | Yes                          | Explicit assumption             | Carefully reviewed foundations            |
| `Qed.`      | Complete opaque proof          | Yes                          | Kernel-checked proof            | Ordinary theorem                          |
| `Defined.`  | Complete transparent proof     | Yes                          | Kernel-checked transparent body | Computationally relevant proof/definition |

Example:

```coq
Theorem unfinished : forall n : nat, n = n.
Proof.
  intros n.
Abort.
```

This leaves no theorem named `unfinished`.

By contrast:

```coq
Theorem trusted_without_proof : forall n : nat, n = n.
Admitted.
```

This adds the statement as if available, but without proof. That is a major difference.

**Common Pitfalls:** `Admitted` is useful during development, but dangerous in final artifacts. A file with admissions may still compile while relying on unproved claims. In serious work, admissions are tracked like unresolved proof obligations or axioms.

### Basic Computation Commands — `Compute`, `Eval`, reduction strategies

Rocq can evaluate terms by reduction. `Compute` is the common entry point, while `Eval` allows more explicit control over reduction strategy.

| Command                     | Meaning                              | Example                | Use case                    | Pitfall                                      |
| --------------------------- | ------------------------------------ | ---------------------- | --------------------------- | -------------------------------------------- |
| `Compute t.`                | Evaluate term using default strategy | `Compute 2 + 3.`       | Quick exploration           | Not a theorem by itself                      |
| `Eval simpl in t.`          | Simplifying reduction                | `Eval simpl in 2 + 3.` | Controlled simplification   | May not unfold enough                        |
| `Eval cbn in t.`            | Call-by-name-style simplification    | `Eval cbn in ...`      | Common proof-time reduction | Strategy details matter                      |
| `Eval cbv in t.`            | Call-by-value reduction              | `Eval cbv in ...`      | More aggressive evaluation  | Can unfold too much                          |
| `Eval vm_compute in t.`     | VM-based computation                 | large computations     | Faster evaluation           | Not always appropriate for proof readability |
| `Eval native_compute in t.` | Native computation when available    | large computations     | Performance                 | Environment/tooling dependent                |

Example:

```coq
Compute map S [0; 1; 2].
Eval simpl in (0 + 3).
Eval cbn in (map S [0; 1; 2]).
```

**Language-design note:** Computation is part of Rocq proof checking because definitional equality relies on reduction. But computation commands are exploratory unless embedded in a theorem or proof.

**Common Pitfalls:** Seeing `Compute t` produce a result does not by itself create a reusable theorem. To use the result in later proofs, state and prove a lemma, or rely on definitional equality where appropriate.

### Basic Command and Tactic Reference — source-reading index

The following compact index summarizes high-frequency syntax from PART 2.

| Construct          | Layer                | Meaning                            | Canonical use                      | Common pitfall                              |
| ------------------ | -------------------- | ---------------------------------- | ---------------------------------- | ------------------------------------------- |
| `Definition`       | Vernacular + Gallina | Define named term                  | functions, constants, propositions | Hiding important type                       |
| `Fixpoint`         | Vernacular + Gallina | Define recursive function          | structurally recursive computation | Non-terminating or non-structural recursion |
| `Inductive`        | Vernacular + Gallina | Define inductive type/proposition  | data, predicates, syntax           | Forgetting generated induction principle    |
| `Theorem`, `Lemma` | Vernacular           | State proof obligation             | named results                      | Weak or misordered statement                |
| `Proof`            | Vernacular           | Enter proof mode                   | start interactive proof            | Treating proof mode as ordinary runtime     |
| `Qed`              | Vernacular           | Close opaque checked proof         | most theorems                      | Expecting later unfolding                   |
| `Defined`          | Vernacular           | Close transparent checked proof    | computational definitions/proofs   | Exposing too much to reduction              |
| `Admitted`         | Vernacular           | Assume proof                       | temporary placeholder              | Trust debt                                  |
| `Check`            | Query                | Inspect type                       | reading/debugging                  | Guessing instead                            |
| `Print`            | Query                | Inspect definition                 | understand constants               | Notation may still obscure                  |
| `Search`           | Query                | Find theorem                       | reuse libraries                    | Searching vague ideas                       |
| `Locate`           | Query                | Inspect notation                   | debug scopes                       | Ignoring overloaded notation                |
| `Compute`          | Query/evaluation     | Reduce term                        | explore computation                | Mistaking output for theorem                |
| `fun`              | Gallina              | Anonymous function                 | define functions/proof terms       | Forgetting dependent function relation      |
| `forall`           | Gallina              | Universal/dependent product        | theorem statements                 | Treating as mere syntax                     |
| `match`            | Gallina              | Inductive elimination              | branch by constructor              | Missing dependent subtleties                |
| `let`              | Gallina              | Local binding                      | avoid repetition                   | Overusing in proofs                         |
| `if`               | Gallina notation     | Branch on `bool`                   | decidable computation              | Using `Prop` as condition                   |
| `intros`           | Tactic               | Introduce binders                  | start proof                        | Introducing too early                       |
| `exact`            | Tactic               | Provide proof term                 | close goal                         | Type mismatch                               |
| `apply`            | Tactic               | Use implication/theorem            | backward reasoning                 | Wrong theorem orientation                   |
| `rewrite`          | Tactic               | Use equality                       | transform goal                     | Wrong direction                             |
| `destruct`         | Tactic               | Case analysis                      | booleans/options/simple cases      | Losing information                          |
| `induction`        | Tactic               | Inductive proof                    | recursive structures               | Weak induction hypothesis                   |
| `simpl`            | Tactic               | Reduce goal                        | definitional computation           | Expecting theorem proving                   |
| `reflexivity`      | Tactic               | Close by conversion                | definitional equality              | Fails for non-definitional equality         |
| `inversion`        | Tactic               | Analyze impossible/injective cases | contradictory constructors         | Cluttered context                           |
| `auto`             | Tactic               | Basic search                       | routine goals                      | Opaque proof                                |
| `lia`              | Tactic               | Linear arithmetic                  | arithmetic obligations             | Nonlinear goals                             |

### Failure-First Syntax Diagnostics — common beginner-to-professional transition

The table below is a practical diagnostic map for surface-level Rocq failures.

| Symptom                                | Tempting but wrong diagnosis   | Correct semantic diagnosis                                  | Professional response                            |
| -------------------------------------- | ------------------------------ | ----------------------------------------------------------- | ------------------------------------------------ |
| `reflexivity` fails on a true equality | Rocq cannot do simple math     | Equality is not definitional                                | Use induction or rewrite with a lemma            |
| `simpl` does nothing useful            | Rocq simplification is broken  | No reducible head or blocked variable                       | Inspect definitions; use lemma                   |
| `rewrite H` fails                      | Equality is unusable           | No matching subterm or wrong direction                      | Try `rewrite <- H`; inspect goal                 |
| `destruct` proof gets stuck            | Need stronger automation       | Case analysis lacks induction hypothesis                    | Use `induction` or strengthen theorem            |
| `induction` hypothesis is too weak     | Rocq induction is weak         | Variables were introduced too early or theorem too specific | Generalize before induction                      |
| `if` rejects proposition               | Rocq lacks normal branching    | `if` branches on `bool`, not `Prop`                         | Use decidable boolean test or prove decidability |
| `None` has unknown type                | Rocq cannot infer obvious type | Polymorphic constructor lacks context                       | Add annotation, e.g. `(None : option nat)`       |
| List notation fails                    | Lists unsupported              | Notation not imported                                       | `Import ListNotations`                           |
| A theorem compiles with `Admitted`     | Proof succeeded                | Statement was assumed                                       | Treat as unresolved trust debt                   |
| `Search` finds too much or nothing     | Library lacks theorem          | Pattern is too vague or wrong shape                         | Search by symbols and theorem shape              |

### PART 2 Summary — syntax as semantics-facing notation

PART 2 has introduced Rocq’s core source-reading vocabulary. The key lesson is that Rocq syntax should be read through semantic roles:

| Surface feature                       | Semantic role                                          |
| ------------------------------------- | ------------------------------------------------------ |
| `Definition`, `Fixpoint`, `Inductive` | Introduce typed objects into the environment           |
| `Theorem`, `Lemma`                    | State types that require proof inhabitants             |
| `Proof ... Qed`                       | Construct and check proof terms                        |
| `fun`, `forall`, `->`                 | Express functions, implication, and dependent products |
| `Prop`, `Set`, `Type`                 | Organize propositions, data, and universes             |
| `match`, `destruct`, `induction`      | Eliminate inductive structure                          |
| `simpl`, `Compute`, `Eval`            | Use definitional computation                           |
| `rewrite`, equality lemmas            | Use propositional equality                             |
| imports, scopes, notation             | Shape what source code means and how it prints         |
| `Admitted`, `Axiom`, `Parameter`      | Introduce assumptions/trust debt                       |

The most important practical distinction from PART 2 is:

| Distinction                                     | Why it matters                                           |
| ----------------------------------------------- | -------------------------------------------------------- |
| Gallina vs vernacular vs tactics                | Prevents mixing term syntax, commands, and proof scripts |
| `Prop` vs `bool`                                | Separates logical claims from computable tests           |
| Definitional equality vs propositional equality | Explains `reflexivity`, `simpl`, and `rewrite`           |
| `destruct` vs `induction`                       | Separates case analysis from recursive proof             |
| `Qed` vs `Defined`                              | Explains opacity, transparency, and computation          |
| Importing names vs importing notation           | Explains source-reading surprises                        |
| Proof completion vs assumption                  | Separates checked proof from trust debt                  |

A reader who understands this part can now read small Rocq files without treating syntax as magic. PART 3 should move from surface recognition to **data, types, propositions, inductive definitions, dependent modeling, and theorem-statement design by task pattern**.

## PART 3 — Data, Types, and Modeling Reference by Task Pattern

PART 3 shifts from reading syntax to making modeling decisions. In Rocq, “data modeling” includes ordinary values, computational functions, logical propositions, evidence objects, inductive predicates, and dependent specifications. The main question is not only “what type should this value have?” but also “what induction principle, proof obligation, computation behavior, and rewriting behavior will this representation create?”

### Modeling Orientation — values, propositions, evidence, specifications

In ordinary programming, a type usually classifies runtime values. In Rocq, types also classify propositions and proofs. A theorem statement is a type. A proof is an inhabitant. An inductive predicate may represent evidence that a property holds.

| Modeling intention      | Rocq representation                            | Example                          | What is being modeled             | Proof-engineering consequence                |
| ----------------------- | ---------------------------------------------- | -------------------------------- | --------------------------------- | -------------------------------------------- |
| Ordinary data           | `Set`, `Type`, `Inductive`, `Record`           | `nat`, `bool`, `list nat`        | Computable values                 | Pattern matching and recursion               |
| Logical proposition     | `Prop`                                         | `n + 0 = n`                      | Claim requiring proof             | Solved by proof term/tactics                 |
| Evidence of property    | proof term inhabiting a proposition            | proof of `Even n`                | Witness that property holds       | Can be destructed if inductive               |
| Computable test         | `bool`-valued function                         | `Nat.eqb n m`                    | Decidable computation             | Needs correctness lemma to connect to `Prop` |
| Specification           | proposition relating input/output              | `sorted ys /\ Permutation xs ys` | Correctness condition             | Drives theorem statement                     |
| Invariant-carrying data | dependent type or indexed inductive            | vector of length `n`             | Constraint in type                | More proof obligations, stronger guarantees  |
| Mathematical structure  | module, record, typeclass, canonical structure | monoid, order, ring              | Carrier plus operations plus laws | Supports generic algebraic reasoning         |

**Design principle:** In Rocq, representation choice determines available elimination principles. A list gives list induction. A tree gives tree induction. An inductive predicate gives case analysis over evidence. A dependent type may make invalid states unrepresentable but may also create difficult equalities.

**Common Pitfalls:** Do not choose the most dependent representation by default. A strong type can eliminate invalid states, but it also pushes proof obligations into every construction and pattern match.

### Task: Define Structured Data — `Inductive`, `Record`, products, dependent records

The most fundamental Rocq data-definition mechanism is `Inductive`. It defines a type by listing its constructors. `Record` is convenient for named-field product structures.

| Task                             | Construct                             | When to use                                 | Canonical example                              | Design meaning                           | Pitfall                                          |                                      |                                                      |
| -------------------------------- | ------------------------------------- | ------------------------------------------- | ---------------------------------------------- | ---------------------------------------- | ------------------------------------------------ | ------------------------------------ | ---------------------------------------------------- |
| Define finite alternatives       | `Inductive` with several constructors | Tags, modes, states                         | `Inductive color := Red                        | Green                                    | Blue.`                                           | Values are exactly constructor forms | Forgetting case analysis must cover all constructors |
| Define recursive data            | `Inductive` recursively               | Lists, trees, syntax                        | binary tree                                    | Generates structural induction principle | Bad recursion shape creates hard proofs          |                                      |                                                      |
| Define named fields              | `Record`                              | Configs, algebraic structures, bundled data | `Record point := { x : nat; y : nat }.`        | Product with projections                 | Overusing records when simple product suffices   |                                      |                                                      |
| Define unnamed pair              | product type                          | Temporary grouping                          | `(nat * bool)%type`                            | Minimal product data                     | Harder to read than records for public APIs      |                                      |                                                      |
| Define invariant-carrying object | dependent record                      | value plus proof                            | `{ n : nat & P n }` or record with proof field | Carries specification as data            | Proof fields complicate equality and computation |                                      |                                                      |

Simple finite data:

```coq
Inductive color : Type :=
| Red
| Green
| Blue.
```

Using it:

```coq
Definition is_warm (c : color) : bool :=
  match c with
  | Red => true
  | Green => false
  | Blue => false
  end.
```

Record example:

```coq
Record point : Type := {
  px : nat;
  py : nat
}.

Definition origin : point :=
  {| px := 0; py := 0 |}.
```

Recursive tree:

```coq
Inductive tree (A : Type) : Type :=
| Leaf : tree A
| Node : tree A -> A -> tree A -> tree A.
```

A size function:

```coq
Fixpoint size {A : Type} (t : tree A) : nat :=
  match t with
  | Leaf _ => 0
  | Node _ l _ r => S (size l + size r)
  end.
```

**Language-design meaning:** An `Inductive` declaration defines the possible values and simultaneously determines the permitted ways to eliminate those values. For a recursive type, Rocq derives an induction principle matching the recursive structure.

**Failure-first explanation:** The tempting mental model is “constructors are just tags.” The surprising behavior is that an inductive definition also creates eliminators and induction principles. If a proof over `tree` is hard, the issue may be the data shape, not the tactic. The professional rule of thumb is: after defining an inductive type, inspect its induction principle with `Check tree_ind`.

**Common Pitfalls:** Public data should be shaped around expected proofs. A representation convenient for computation may make invariants hard to state; a representation convenient for proofs may make computation verbose.

### Task: Choose Between `bool` and `Prop` — computation versus specification

A central Rocq modeling decision is whether to represent a claim as a computable boolean or as a proposition.

| Need                         | Prefer `bool`          | Prefer `Prop`                        | Bridge                          |
| ---------------------------- | ---------------------- | ------------------------------------ | ------------------------------- |
| Executable decision          | Yes                    | No                                   | Prove correctness theorem       |
| Mathematical specification   | Usually no             | Yes                                  | Boolean reflection if decidable |
| Extraction relevance         | Yes                    | Usually erased/irrelevant            | Extract boolean function        |
| Constructive witness         | Sometimes insufficient | Yes                                  | Existential proof               |
| Case analysis in computation | Yes                    | No direct `if` over arbitrary `Prop` | Decidability lemma              |
| Proof search and rewriting   | Sometimes awkward      | Natural                              | Lemmas connect both views       |

Boolean test:

```coq
Definition is_zero (n : nat) : bool :=
  match n with
  | 0 => true
  | S _ => false
  end.
```

Propositional specification:

```coq
Definition IsZero (n : nat) : Prop :=
  n = 0.
```

Bridge theorem:

```coq
Theorem is_zero_correct :
  forall n : nat, is_zero n = true -> IsZero n.
Proof.
  intros n H.
  destruct n as [| n'].
  - reflexivity.
  - simpl in H. discriminate H.
Qed.
```

A converse theorem is also useful:

```coq
Theorem is_zero_complete :
  forall n : nat, IsZero n -> is_zero n = true.
Proof.
  intros n H.
  unfold IsZero in H.
  rewrite H.
  reflexivity.
Qed.
```

**Design tradeoff:**

| Representation          | Capability gained                                         | Cost introduced                                | Best use                       |
| ----------------------- | --------------------------------------------------------- | ---------------------------------------------- | ------------------------------ |
| `bool`                  | Computable, extractable, branchable                       | Loses proof structure unless related by lemmas | Algorithms and decidable tests |
| `Prop`                  | Expressive, proof-oriented, supports quantifiers/evidence | Not directly computational as a boolean        | Specifications and theorems    |
| Both with bridge lemmas | Computation and proof alignment                           | More lemmas to maintain                        | Verified decision procedures   |

**Interdisciplinary Lens: Constructive Logic**

| Item                      | Explanation                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| What it clarifies         | A proposition requires evidence; a boolean is data computed by a function                     |
| Language feature involved | `Prop`, `bool`, `if`, `exists`, decidability lemmas                                           |
| Practical consequence     | Computational tests and logical specifications should be related explicitly                   |
| Limit of the lens         | For many decidable domains, libraries provide reflection patterns that reduce manual bridging |

**Common Pitfalls:** Treating `Nat.eqb n m = true` and `n = m` as interchangeable without a lemma causes stuck proofs. Use standard lemmas such as equality-boolean correctness lemmas when available.

### Task: Represent Optional or Missing Values — `option`

Use `option A` when a computation may fail to produce an `A` but the failure carries no additional information.

| Pattern                | Rocq form               | Use when              | Example                    | Pitfall                                   |
| ---------------------- | ----------------------- | --------------------- | -------------------------- | ----------------------------------------- |
| Present value          | `Some x`                | A result exists       | lookup success             | Forgetting type parameter may be implicit |
| Missing value          | `None`                  | No result             | lookup failure             | Need type annotation without context      |
| Consume optional value | `match o with ... end`  | Define total behavior | default value              | Ignoring `None` case impossible           |
| Specify success        | proposition over result | `lookup k m = Some v` | State exact lookup theorem | Not proving failure cases                 |

Example:

```coq
Fixpoint nth_opt {A : Type} (n : nat) (xs : list A) : option A :=
  match n, xs with
  | 0, x :: _ => Some x
  | S n', _ :: xs' => nth_opt n' xs'
  | _, [] => None
  end.
```

Using it:

```coq
Definition nth_or_default {A : Type} (default : A) (n : nat) (xs : list A) : A :=
  match nth_opt n xs with
  | Some x => x
  | None => default
  end.
```

Specification examples:

```coq
Definition nth_success {A : Type} (n : nat) (xs : list A) (x : A) : Prop :=
  nth_opt n xs = Some x.

Definition nth_failure {A : Type} (n : nat) (xs : list A) : Prop :=
  nth_opt n xs = None.
```

**Design meaning:** `option` is a lightweight total representation of partiality. A function returning `option A` is total as a Rocq function, even if conceptually it represents a partial operation.

**Common Pitfalls:** `option` only says success or failure; it does not explain failure. If different failure reasons matter, use a sum type or custom inductive result.

### Task: Represent Alternatives and Error-Like Results — sum types and custom result types

Rocq’s standard sum type `A + B` represents a value of either `A` or `B`. For clearer APIs, custom inductive result types are often better.

| Need                         | Construct          | Example             | Best use                           | Pitfall                   |                  |
| ---------------------------- | ------------------ | ------------------- | ---------------------------------- | ------------------------- | ---------------- |
| Two possible data outcomes   | sum type           | `A + B`             | Small local alternatives           | Meaning of sides unclear  |                  |
| Success/failure with payload | custom result      | `Ok x               | Err e`                             | Clear specifications      | More definitions |
| Logical disjunction          | `A \/ B`           | propositions        | Proof alternatives                 | Confusing with data sum   |                  |
| Decidable proposition        | `{P} + {~P}` style | decision procedures | Computational evidence of decision | More advanced than `bool` |                  |

Custom result type:

```coq
Inductive result (E A : Type) : Type :=
| Ok : A -> result E A
| Err : E -> result E A.
```

Example:

```coq
Inductive lookup_error : Type :=
| EmptyList
| IndexTooLarge.

Definition head_result (xs : list nat) : result lookup_error nat :=
  match xs with
  | [] => Err lookup_error nat EmptyList
  | x :: _ => Ok lookup_error nat x
  end.
```

This explicit version is verbose because the constructor parameters are visible. With implicit arguments configured, professional code normally makes this smoother. The conceptual point is that result types carry information that `option` discards.

**Design tradeoff:**

| Representation   | Strength                       | Cost                        | Professional rule                                    |
| ---------------- | ------------------------------ | --------------------------- | ---------------------------------------------------- |
| `option A`       | Minimal and convenient         | No error explanation        | Use for absence only                                 |
| `A + B`          | Simple binary alternative      | Side meaning may be unclear | Use locally or with clear names                      |
| Custom result    | Meaningful constructors        | More boilerplate            | Use for public APIs/specifications                   |
| Dependent result | Result carries proof/invariant | More complex proofs         | Use when correctness evidence must travel with value |

**Common Pitfalls:** Do not use logical disjunction `A \/ B` when a computation must return either an `A` or a `B`. Use a data sum. Conversely, do not use a data sum merely to state a logical theorem unless computational content is intended.

### Task: Model Finite States — enumerations, transition functions, transition relations

Finite state machines can be modeled computationally with functions or logically with relations. The choice affects proof style.

| Modeling style          | Rocq construct                                   | Use when                    | Example theorem                   | Pitfall                        |
| ----------------------- | ------------------------------------------------ | --------------------------- | --------------------------------- | ------------------------------ |
| Finite enumeration      | `Inductive state := ...`                         | State space is finite       | all cases by `destruct`           | Missing future extensibility   |
| Transition function     | `state -> input -> state`                        | Deterministic computation   | next state has property           | Harder to model nondeterminism |
| Transition relation     | `Inductive step : state -> state -> Prop := ...` | Nondeterminism or semantics | determinism/progress/reachability | More proof work                |
| Boolean invariant       | `state -> bool`                                  | Computable check            | invariant checker correct         | Need bridge to `Prop`          |
| Propositional invariant | `state -> Prop`                                  | Mathematical property       | preserved by transition           | Not directly executable        |

Example finite state:

```coq
Inductive light : Type :=
| RedLight
| YellowLight
| GreenLight.

Definition next_light (s : light) : light :=
  match s with
  | RedLight => GreenLight
  | GreenLight => YellowLight
  | YellowLight => RedLight
  end.
```

A simple theorem:

```coq
Theorem next_light_not_stuck :
  forall s : light, exists s' : light, next_light s = s'.
Proof.
  intros s.
  exists (next_light s).
  reflexivity.
Qed.
```

Relational version:

```coq
Inductive light_step : light -> light -> Prop :=
| StepRed : light_step RedLight GreenLight
| StepGreen : light_step GreenLight YellowLight
| StepYellow : light_step YellowLight RedLight.
```

A determinism property:

```coq
Definition deterministic {A : Type} (R : A -> A -> Prop) : Prop :=
  forall x y z, R x y -> R x z -> y = z.
```

**Design meaning:** A function encodes deterministic behavior by construction. A relation makes behavior explicit as evidence and generalizes better to nondeterminism, operational semantics, and proof of metatheory.

**Common Pitfalls:** Encoding a semantic relation as a function too early can make nondeterminism, stuck states, errors, or proof of progress/preservation harder to express.

### Task: Choose the Right Collection — list, vector, finite maps, sets, trees

Collections in Rocq are not only data containers. They come with induction principles, library lemmas, equality questions, and proof obligations.

| Collection            | Use when                    | Strength                              | Cost                               | Common proof task                    |
| --------------------- | --------------------------- | ------------------------------------- | ---------------------------------- | ------------------------------------ |
| `list A`              | Ordered finite sequence     | Rich library, simple induction        | Length invariants external         | append, map, filter, length          |
| length-indexed vector | Length is part of type      | Invalid length states unrepresentable | Dependent proofs harder            | safe indexing, length-preserving map |
| tree                  | Hierarchical recursive data | Natural structural recursion          | Need custom lemmas                 | traversal invariants                 |
| finite map            | Key-value association       | Models environments/stores            | Library choice matters             | lookup/update lemmas                 |
| finite set            | Membership abstraction      | Extensional reasoning                 | Equality/decidability requirements | membership preservation              |
| association list      | Small/simple maps           | Easy to define and prove about        | Inefficient, duplicate keys        | lookup correctness                   |

List examples:

```coq
From Stdlib Require Import List.
Import ListNotations.

Definition numbers : list nat := [1; 2; 3].

Fixpoint sum_list (xs : list nat) : nat :=
  match xs with
  | [] => 0
  | x :: xs' => x + sum_list xs'
  end.
```

Classic theorem anchor: length of append.

```coq
Theorem app_length_anchor :
  forall (A : Type) (xs ys : list A),
    length (xs ++ ys) = length xs + length ys.
Proof.
  intros A xs ys.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl.
    rewrite IHxs.
    reflexivity.
Qed.
```

**Anchor explanation:**

| Anchor item                  | Explanation                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| Mathematical statement       | The length of appending two lists is the sum of their lengths                        |
| Relevant induction principle | Induction on the first list `xs`                                                     |
| Key lemma needed             | Usually none if addition and append reduce in the right direction                    |
| Proof strategy               | Induct on `xs`; base by computation; step by simplification and induction hypothesis |
| Common beginner mistake      | Inducting on `ys`, which does not match how `++` recurses                            |
| Practical lesson             | Induct on the argument structurally consumed by the recursive function               |

**Common Pitfalls:** The best induction variable is often the one that the function recurses over, not the variable that looks more “interesting” mathematically.

### Task: Model Recursive Syntax — abstract syntax trees and inductive semantics

Rocq is especially strong for programming-language theory because syntax trees and semantic judgments are naturally inductive.

| Modeling target | Construct                                  | Example                                               | Later proof            |
| --------------- | ------------------------------------------ | ----------------------------------------------------- | ---------------------- |
| Expressions     | `Inductive expr`                           | constants, addition                                   | evaluator correctness  |
| Values          | `Inductive value` or subset of expressions | numeric values                                        | progress               |
| Types           | `Inductive ty`                             | `TNat`, `TBool`                                       | preservation           |
| Evaluation      | function or relation                       | `eval : expr -> nat` or `step : expr -> expr -> Prop` | determinism, soundness |
| Typing          | inductive relation                         | `has_type : expr -> ty -> Prop`                       | preservation/progress  |

Simple expression language:

```coq
Inductive expr : Type :=
| EConst : nat -> expr
| EPlus : expr -> expr -> expr.
```

Evaluator:

```coq
Fixpoint eval (e : expr) : nat :=
  match e with
  | EConst n => n
  | EPlus e1 e2 => eval e1 + eval e2
  end.
```

A simple theorem anchor:

```coq
Theorem eval_plus_const :
  forall n m : nat,
    eval (EPlus (EConst n) (EConst m)) = n + m.
Proof.
  intros n m.
  reflexivity.
Qed.
```

For richer languages, semantics often becomes relational:

```coq
Inductive eval_rel : expr -> nat -> Prop :=
| EvalConst : forall n,
    eval_rel (EConst n) n
| EvalPlus : forall e1 e2 n1 n2,
    eval_rel e1 n1 ->
    eval_rel e2 n2 ->
    eval_rel (EPlus e1 e2) (n1 + n2).
```

**Design tradeoff:**

| Evaluator style        | Capability gained                | Cost introduced                    | Best use                            |
| ---------------------- | -------------------------------- | ---------------------------------- | ----------------------------------- |
| Function `expr -> nat` | Executable and simple            | Only deterministic total semantics | Simple evaluators                   |
| Big-step relation      | Expresses evidence of evaluation | More proof construction            | Semantics and metatheory            |
| Small-step relation    | Models computation steps         | More infrastructure                | progress, preservation, determinism |
| Typed indexed syntax   | Invalid terms unrepresentable    | Harder syntax and substitution     | Strong certified interpreters       |

**Common Pitfalls:** A function evaluator may be too restrictive for partiality, errors, nondeterminism, or nontermination. A relation is often better for semantic proofs, even if less directly executable.

### Task: Represent Domain Concepts — raw data versus invariant-bearing data

A professional Rocq model should distinguish raw external data from validated internal data. This is similar to ordinary software design, but in Rocq the distinction can be expressed through propositions, dependent records, or certified constructors.

| Representation          | Example              | Strength               | Cost                        | Use when                          |                                   |
| ----------------------- | -------------------- | ---------------------- | --------------------------- | --------------------------------- | --------------------------------- |
| Raw data                | `nat`, `list nat`    | Simple computation     | Invalid states possible     | Early parsing or external input   |                                   |
| Predicate over raw data | `P x : Prop`         | Flexible specification | Must carry proof separately | Theorem statements                |                                   |
| Boolean validator       | `valid x : bool`     | Computable validation  | Needs correctness lemma     | Extraction or executable checking |                                   |
| Subset/dependent record | `{ x : A             | P x }`                 | Value carries proof         | Equality and computation harder   | Validated internal representation |
| Smart constructor       | `A -> option ValidA` | Controlled validation  | More API design             | Certified boundary crossing       |                                   |

Example predicate:

```coq
Definition nonzero (n : nat) : Prop :=
  n <> 0.
```

Dependent record:

```coq
Record positive_nat : Type := {
  pos_value : nat;
  pos_proof : pos_value <> 0
}.
```

Smart constructor idea:

```coq
Definition make_positive (n : nat) : option positive_nat :=
  match n with
  | 0 => None
  | S k =>
      Some {| pos_value := S k;
              pos_proof := fun H => match H with end |}
  end.
```

The proof term in the `S k` case uses the impossibility of `S k = 0`.

**Design meaning:** A dependent record can make invalid internal states unrepresentable. The cost is that ordinary operations may now need to preserve proofs.

**Failure-first explanation:** The tempting mental model is “put every invariant into the type.” The surprising behavior is that simple functions become difficult because every operation must also construct preservation proofs. The correct professional rule is: put invariants in types when they prevent important classes of errors and are stable under operations; otherwise, keep raw data plus lemmas.

**Common Pitfalls:** Proof fields can interfere with equality. Two records with the same computational data but different proof terms may be awkward to compare unless proof irrelevance or suitable equality principles are available.

### Task: Constrain Input — predicates, validators, dependent inputs

Input constraints can be represented in several ways depending on whether the constraint is computational, logical, or part of the API.

| Constraint style         | Rocq form                      | Example                            | Strength                 | Pitfall                          |                       |
| ------------------------ | ------------------------------ | ---------------------------------- | ------------------------ | -------------------------------- | --------------------- |
| Precondition proposition | `P x -> ...`                   | `n <> 0 -> ...`                    | Simple theorem statement | Caller must supply proof         |                       |
| Boolean guard            | `if valid x then ... else ...` | executable validation              | Extractable              | Need correctness theorem         |                       |
| Dependent argument       | `{ x : A                       | P x } -> ...`                      | validated input          | Invalid input impossible         | More cumbersome calls |
| Result with failure      | `A -> option B`                | partial operation totalized        | Handles invalid input    | Specification must cover failure |                       |
| Relation                 | `R input output`               | nondeterministic or proof-oriented | Very expressive          | Less directly executable         |                       |

Example: predecessor with failure.

```coq
Definition pred_opt (n : nat) : option nat :=
  match n with
  | 0 => None
  | S k => Some k
  end.
```

Precondition version:

```coq
Definition pred_with_proof (n : nat) (H : n <> 0) : nat :=
  match n with
  | 0 => match H eq_refl with end
  | S k => k
  end.
```

The second version is more precise but less convenient. It requires a proof that `n` is nonzero.

**Design tradeoff:**

| Design choice          | Capability gained                 | Cost introduced                   |
| ---------------------- | --------------------------------- | --------------------------------- |
| Return `option`        | Simple executable total function  | Callers handle `None`             |
| Require proof argument | Function only accepts valid input | Callers must prove validity       |
| Use dependent subtype  | Validity packaged with value      | More complex equality/projections |
| Use relation           | Very flexible specification       | Less convenient computation       |

**Common Pitfalls:** Do not use a precondition proof when a simple `option` result gives a cleaner computational API. Conversely, do not use `option` if the rest of the development constantly proves the value is present; a dependent representation may be better.

### Task: Equality and Decidability for Simple Inductive Types

Many proofs require deciding equality. For simple finite inductive types, equality is usually decidable by case analysis.

Example finite type:

```coq
Inductive bit : Type :=
| B0
| B1.
```

Boolean equality:

```coq
Definition bit_eqb (x y : bit) : bool :=
  match x, y with
  | B0, B0 => true
  | B1, B1 => true
  | _, _ => false
  end.
```

Correctness theorem:

```coq
Theorem bit_eqb_true :
  forall x y : bit, bit_eqb x y = true -> x = y.
Proof.
  intros x y H.
  destruct x, y.
  - reflexivity.
  - simpl in H. discriminate H.
  - simpl in H. discriminate H.
  - reflexivity.
Qed.
```

Completeness theorem:

```coq
Theorem bit_eqb_refl :
  forall x : bit, bit_eqb x x = true.
Proof.
  intros x.
  destruct x.
  - reflexivity.
  - reflexivity.
Qed.
```

Decision procedure as data/evidence:

```coq
Theorem bit_eq_dec :
  forall x y : bit, {x = y} + {x <> y}.
Proof.
  destruct x, y.
  - left. reflexivity.
  - right. intros H. discriminate H.
  - right. intros H. discriminate H.
  - left. reflexivity.
Defined.
```

The final proof uses `Defined` because the result is computationally relevant: it returns either evidence of equality or evidence of inequality.

**Anchor explanation:**

| Anchor item                              | Explanation                                                                                  |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| Concept taught                           | Difference between boolean equality, propositional equality, and decidable equality evidence |
| Rocq mechanism exercised                 | `destruct`, `discriminate`, equality, sum-like decision type                                 |
| Why it is good proof-engineering example | It shows how computation and proof connect through correctness lemmas                        |
| Common misunderstanding prevented        | `x = y` is not the same object as `bit_eqb x y = true`                                       |
| Practical lesson                         | Define boolean tests for computation; prove bridge lemmas for reasoning                      |

**Common Pitfalls:** A boolean equality function without correctness lemmas is weak in proofs. A propositional equality theorem without computable equality is weak for extracted decision procedures. Serious developments usually need both.

### Task: Model Lists and Sequence Properties — append, length, map, filter

Lists are the first serious proof-engineering training ground. They combine structural recursion, induction, rewriting, polymorphism, and library reuse.

| Task               | Construct/API | Key theorem shape                 | Proof strategy                            | Common mistake                                              |
| ------------------ | ------------- | --------------------------------- | ----------------------------------------- | ----------------------------------------------------------- |
| Append lists       | `xs ++ ys`    | associativity, identity           | induction on first list                   | Inducting on wrong variable                                 |
| Compute length     | `length xs`   | `length (xs ++ ys)`               | induction over list consumed by function  | Expecting simplification over arbitrary `xs`                |
| Transform elements | `map f xs`    | map composition, length preserved | induction on list                         | Forgetting function extensionality issues in advanced cases |
| Filter elements    | `filter p xs` | membership correctness            | induction plus boolean/proposition bridge | Confusing predicate `A -> bool` with `A -> Prop`            |
| Reverse list       | `rev xs`      | involution, append interaction    | helper lemma about append/rev             | Trying direct proof without strengthening                   |

Append identity theorem:

```coq
Theorem app_nil_r_anchor :
  forall (A : Type) (xs : list A),
    xs ++ [] = xs.
Proof.
  intros A xs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl.
    rewrite IHxs.
    reflexivity.
Qed.
```

Append associativity:

```coq
Theorem app_assoc_anchor :
  forall (A : Type) (xs ys zs : list A),
    (xs ++ ys) ++ zs = xs ++ (ys ++ zs).
Proof.
  intros A xs ys zs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl.
    rewrite IHxs.
    reflexivity.
Qed.
```

Map length:

```coq
Theorem map_length_anchor :
  forall (A B : Type) (f : A -> B) (xs : list A),
    length (map f xs) = length xs.
Proof.
  intros A B f xs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl.
    rewrite IHxs.
    reflexivity.
Qed.
```

**Anchor explanation:**

| Anchor               | Concept taught                                  | Mechanism exercised   | Common misunderstanding prevented        |
| -------------------- | ----------------------------------------------- | --------------------- | ---------------------------------------- |
| `xs ++ [] = xs`      | Recursive function may not reduce on variable   | list induction        | Thinking right identity is definitional  |
| append associativity | Structural proof follows first argument of `++` | induction + rewrite   | Inducting on all variables unnecessarily |
| map length           | Function transformation preserves structure     | polymorphic induction | Thinking polymorphism makes proof harder |
| reverse involution   | Helper lemmas are required                      | lemma design          | Trying to prove everything directly      |

**Common Pitfalls:** Many list proofs fail because a needed helper lemma is missing. The expert move is not more automation; it is stating the right intermediate theorem.

### Task: Model Trees and Structural Invariants

Trees teach that every inductive type has its own proof shape. List habits transfer only partially.

Example binary tree:

```coq
Inductive btree (A : Type) : Type :=
| Empty : btree A
| Branch : btree A -> A -> btree A -> btree A.
```

Size and mirror:

```coq
Fixpoint bsize {A : Type} (t : btree A) : nat :=
  match t with
  | Empty _ => 0
  | Branch _ l _ r => S (bsize l + bsize r)
  end.

Fixpoint mirror {A : Type} (t : btree A) : btree A :=
  match t with
  | Empty _ => Empty A
  | Branch _ l x r => Branch A (mirror r) x (mirror l)
  end.
```

Mirror preserves size:

```coq
Theorem mirror_size :
  forall (A : Type) (t : btree A),
    bsize (mirror t) = bsize t.
Proof.
  intros A t.
  induction t as [| l IHl x r IHr].
  - reflexivity.
  - simpl.
    rewrite IHr.
    rewrite IHl.
    (* The remaining arithmetic may require a commutativity lemma. *)
    rewrite Nat.add_comm.
    reflexivity.
Qed.
```

This example uses a standard arithmetic lemma because mirroring swaps the subtrees, so the proof needs commutativity of addition.

**Anchor explanation:**

| Anchor item                  | Explanation                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| Mathematical statement       | Mirroring a binary tree preserves the number of nodes                                 |
| Relevant induction principle | Tree induction with hypotheses for left and right subtrees                            |
| Key lemma needed             | Commutativity of natural-number addition                                              |
| Proof strategy               | Induct on tree; rewrite using both induction hypotheses; solve arithmetic order swap  |
| Common beginner mistake      | Expecting the two sides to be definitionally equal after simplification               |
| Practical lesson             | Structural invariants often need algebraic lemmas in addition to induction hypotheses |

**Common Pitfalls:** Recursive tree functions often produce goals involving both subtrees. The order of rewriting and the algebraic lemmas needed become more important than in simple list proofs.

### Task: Choose Between Function and Relation — computation versus proof flexibility

Many Rocq models can be represented either as functions or relations. This choice is central in formal semantics, certified programming, and theorem design.

| Modeling need                   | Function                    | Relation                        | Decision rule                                       |
| ------------------------------- | --------------------------- | ------------------------------- | --------------------------------------------------- |
| Deterministic total computation | Excellent                   | Possible but verbose            | Use function                                        |
| Partial computation             | Use `option`/`result`       | Natural                         | Choose based on execution needs                     |
| Nondeterminism                  | Awkward                     | Excellent                       | Use relation                                        |
| Nontermination                  | Hard in total function core | Can model step relation         | Use relation                                        |
| Evidence-rich derivation        | Limited                     | Excellent                       | Use inductive relation                              |
| Extraction                      | Direct                      | Requires executable counterpart | Use function or prove relation/function equivalence |

Function model:

```coq
Definition bool_and (b c : bool) : bool :=
  if b then c else false.
```

Relational model:

```coq
Inductive and_rel : bool -> bool -> bool -> Prop :=
| AndTrueTrue : and_rel true true true
| AndTrueFalse : and_rel true false false
| AndFalseTrue : and_rel false true false
| AndFalseFalse : and_rel false false false.
```

The relation is less convenient computationally but gives explicit derivation cases.

**Design tradeoff:**

| Choice   | Capability gained                           | Cost introduced                                      | Misuse encouraged                                   |
| -------- | ------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------- |
| Function | Simpler computation and extraction          | Less flexible for partial/nondeterministic semantics | Forcing all semantics into total deterministic form |
| Relation | Expressive proof structure                  | More proof obligations and less direct execution     | Modeling simple computations too verbosely          |
| Both     | Executable implementation plus logical spec | Need equivalence theorem                             | Duplicate definitions without bridge proof          |

**Common Pitfalls:** In programming-language metatheory, small-step and big-step relations are often better than direct evaluator functions. In certified algorithms, functions plus correctness theorems are often better.

### Task: Design Theorem Statements as Data-Model Interfaces

A theorem statement is not merely a claim. It is an interface between definitions and proofs. Quantifier order, generality, and representation choices determine whether induction hypotheses are useful.

Weak theorem shape:

```coq
(* Often too specific for later use. *)
Theorem specific_example : [1; 2] ++ [] = [1; 2].
Proof.
  reflexivity.
Qed.
```

Reusable theorem shape:

```coq
Theorem app_nil_r_general :
  forall (A : Type) (xs : list A),
    xs ++ [] = xs.
Proof.
  intros A xs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl. rewrite IHxs. reflexivity.
Qed.
```

| Statement design choice                         | Good effect                   | Bad version                                      | Failure mode             |
| ----------------------------------------------- | ----------------------------- | ------------------------------------------------ | ------------------------ |
| Generalize over data                            | Reusable induction hypothesis | Hard-code examples                               | Theorem cannot be reused |
| Quantify variables before proof                 | Makes assumptions explicit    | Depend on hidden section context unintentionally | Unexpected theorem type  |
| Put recursive variable where induction needs it | Strong IH                     | Introduce dependent variable too early           | IH too weak              |
| State helper lemmas separately                  | Stable proof structure        | Inline clever proof                              | Fragile scripts          |
| Avoid excessive assumptions                     | Strong theorem                | Hypotheses stronger than needed                  | Proof proves too little  |

**Failure-first explanation:** The tempting mental model is “state the exact thing needed now.” The surprising behavior is that the exact thing may be too weak to prove or reuse. The correct explanation is that induction hypotheses are generated from the theorem statement. The professional rule of thumb is: state the theorem at the level of generality needed by the induction principle and future reuse.

**Common Pitfalls:** Quantifier order is not cosmetic. In dependent or inductive proofs, introducing variables too early can freeze them and weaken the induction hypothesis.

### Task: Use Dependent Types Without Overusing Them — value-indexed types, invariants, proof obligations

**Core keywords:** `dependent types`, `indexed types`, `forall`, `sig`, `exist`, invariants, proof burden, invalid states.

A dependent type is a type that mentions a value. This is one of Rocq’s central powers: a type can express not merely “this is a list” but “this is a list-like object of length `n`,” or not merely “this is a result” but “this result satisfies a specification.”

The tradeoff is direct. Dependent types can make invalid states unrepresentable, but every construction and pattern match may now require proof evidence.

| Modeling situation     | Non-dependent representation          | Dependent representation   | Capability gained               | Cost introduced                      |                                |
| ---------------------- | ------------------------------------- | -------------------------- | ------------------------------- | ------------------------------------ | ------------------------------ |
| List with known length | `list A` plus theorem `length xs = n` | vector indexed by `n`      | Length errors impossible        | Harder functions and equalities      |                                |
| Validated value        | `x : A` plus proof `P x` separately   | `{ x : A                   | P x }`                          | Value carries proof                  | Projection/equality complexity |
| Safe lookup            | `list A -> nat -> option A`           | vector plus bounded index  | No failed lookup                | More index arithmetic                |                                |
| Typed syntax           | raw `expr` plus typing relation       | expression indexed by type | Ill-typed terms unrepresentable | Substitution/evaluation harder       |                                |
| Certified result       | function plus correctness theorem     | result bundled with proof  | Proof travels with result       | Extraction/proof irrelevance caveats |                                |

A common dependent pair type is `{ x : A | P x }`, read as “an `x : A` together with proof of `P x`.” This is often called a subset type.

```coq
Definition nonzero (n : nat) : Prop :=
  n <> 0.

Definition nonzero_nat : Type :=
  { n : nat | nonzero n }.
```

A value of `nonzero_nat` contains both a natural number and proof that it is not zero.

```coq
Definition one_nonzero : nonzero_nat.
Proof.
  exists 1.
  unfold nonzero.
  intros H.
  discriminate H.
Defined.
```

The `Defined` matters here because the object is data-like: it is a dependent pair containing a value and proof.

**Design meaning:** Dependent typing lets the model move constraints from external theorems into the type of values. This changes the boundary between “can be represented” and “must be proved impossible.”

**Failure-first explanation:** The tempting mental model is “stronger types are always better.” The surprising behavior is that a simple operation such as incrementing, appending, indexing, or mapping may require extra arithmetic or equality proofs. The correct explanation is that Rocq is not merely storing data; it is checking that the data continues to satisfy its indexed specification. The professional rule of thumb is: use dependent types when the invariant is central, stable, and worth carrying through APIs.

**Common Pitfalls:** Do not encode every validation condition as a dependent type. For many developments, raw data plus `Prop`-level specifications and lemmas is easier to maintain.

### Task: Model Length Invariants — lists versus vectors

**Core keywords:** `list`, `Vector.t`, indexed inductives, length invariants, safe indexing.

The classic example of dependent data modeling is the length-indexed vector. A list has type `list A`; its length is computed separately. A vector has type resembling `Vector.t A n`, where `n` is part of the type.

| Representation             | Type shape                        | Best use              | Proof consequence                   | Common mistake                        |                  |
| -------------------------- | --------------------------------- | --------------------- | ----------------------------------- | ------------------------------------- | ---------------- |
| List                       | `list A`                          | General sequences     | Length properties proved separately | Forgetting length constraints         |                  |
| Vector                     | `Vector.t A n`                    | Fixed-length data     | Length tracked by type              | Drowning in index equalities          |                  |
| List with proof            | `{ xs : list A                    | length xs = n }`      | Validated list boundary             | Uses familiar list library plus proof | Projection noise |
| Function with precondition | `forall xs, length xs = n -> ...` | Theorem-oriented APIs | Caller supplies proof               | Awkward for computation               |                  |

A conceptual vector declaration looks like this:

```coq
Inductive vec (A : Type) : nat -> Type :=
| vnil : vec A 0
| vcons : forall n : nat, A -> vec A n -> vec A (S n).
```

This is an indexed inductive type. Its second parameter is not merely a parameter; it changes across constructors. `vnil` has length `0`, and `vcons` turns a vector of length `n` into a vector of length `S n`.

A length-preserving map:

```coq
Fixpoint vmap {A B : Type} {n : nat}
         (f : A -> B) (xs : vec A n) : vec B n :=
  match xs with
  | vnil _ => vnil B
  | vcons _ n x xs' => vcons B n (f x) (vmap f xs')
  end.
```

The exact pattern syntax can vary depending on implicit arguments and printing settings, but the semantic point is stable: the result length is statically the same as the input length.

**Design tradeoff:**

| Problem solved          | Capability gained              | Cost introduced                       | Programs that benefit                        | Programs that suffer            |
| ----------------------- | ------------------------------ | ------------------------------------- | -------------------------------------------- | ------------------------------- |
| Runtime length mismatch | Type-level length checking     | Index arithmetic in proofs            | Fixed-size protocols, matrices, typed syntax | Simple list processing          |
| Repeated length lemmas  | Some obligations disappear     | Others move into construction         | APIs where length is central                 | Exploratory definitions         |
| Unsafe indexing         | Invalid index can be ruled out | Need finite index type or proof bound | Certified array-like operations              | General-purpose collection code |

**Common Pitfalls:** Vectors prevent some errors but do not make all proofs simpler. A list theorem such as `length (map f xs) = length xs` may be trivial for vectors because length is in the type, but append associativity over vectors may require nontrivial arithmetic equalities over indices.

### Task: Define Indexed Predicates — evidence as structured proof data

**Core keywords:** `Inductive` predicates, evidence, constructors, inversion, logical relations.

An inductive definition can define data in `Type`, but it can also define propositions in `Prop`. This is essential for modeling evidence.

Example: even numbers.

```coq
Inductive Even : nat -> Prop :=
| Even0 : Even 0
| EvenSS : forall n : nat, Even n -> Even (S (S n)).
```

This definition says there are two ways to prove `Even n`: prove it for `0`, or prove it for `S (S n)` by proving it for `n`.

A simple proof:

```coq
Theorem even_4 : Even 4.
Proof.
  apply EvenSS.
  apply EvenSS.
  apply Even0.
Qed.
```

A theorem using evidence:

```coq
Theorem even_inv_2 :
  Even 2.
Proof.
  apply EvenSS.
  apply Even0.
Qed.
```

Inductive predicates are powerful because proof evidence has structure. One can destruct or invert evidence to discover how it was built.

| Modeling choice         | Meaning                   | Best use                        | Proof tactic                               |
| ----------------------- | ------------------------- | ------------------------------- | ------------------------------------------ |
| Boolean predicate       | `nat -> bool`             | Computable test                 | `destruct`, bridge lemmas                  |
| Propositional predicate | `nat -> Prop`             | Specification                   | `intros`, `apply`, `destruct`, `inversion` |
| Inductive predicate     | `Inductive P : A -> Prop` | Structured evidence             | `induction` on evidence, `inversion`       |
| Relation                | `A -> B -> Prop`          | Semantics, ordering, evaluation | induction on derivation                    |

**Interdisciplinary Lens: Constructive Logic**

| Item                      | Explanation                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------------- |
| What it clarifies         | A proof of `Even n` is evidence built by constructors                                     |
| Language feature involved | `Inductive ... : nat -> Prop`, proof constructors                                         |
| Practical consequence     | Proving a property means constructing evidence; using a property means analyzing evidence |
| Limit of the lens         | For decidable predicates, boolean reflection may be more convenient for computation       |

**Failure-first explanation:** The tempting mental model is “`Even n` is a boolean-valued property.” The surprising behavior is that `Even n` is a proposition with proof evidence, not a computable test. The correct explanation is that an inductive predicate defines legal forms of evidence. The professional rule of thumb is: use inductive predicates when the structure of evidence matters.

**Common Pitfalls:** A proposition such as `Even n` cannot be used directly in `if ... then ... else ...`. Define a boolean test if computation is needed, and prove it equivalent to the proposition.

### Task: Represent Operational Semantics — inductive relations, derivations, determinism

**Core keywords:** `small-step`, `big-step`, relations, operational semantics, derivation induction, determinism.

Programming-language semantics is one of Rocq’s classic strengths. Syntax is usually an inductive type. Evaluation is often an inductive relation. Metatheorems are proved by induction on syntax or derivations.

Simple arithmetic expressions:

```coq
Inductive aexp : Type :=
| ANum : nat -> aexp
| APlus : aexp -> aexp -> aexp.
```

Functional evaluator:

```coq
Fixpoint aeval (e : aexp) : nat :=
  match e with
  | ANum n => n
  | APlus e1 e2 => aeval e1 + aeval e2
  end.
```

Relational evaluator:

```coq
Inductive aevalR : aexp -> nat -> Prop :=
| E_ANum : forall n,
    aevalR (ANum n) n
| E_APlus : forall e1 e2 n1 n2,
    aevalR e1 n1 ->
    aevalR e2 n2 ->
    aevalR (APlus e1 e2) (n1 + n2).
```

Correctness bridge:

```coq
Theorem aevalR_sound :
  forall e n, aevalR e n -> aeval e = n.
Proof.
  intros e n H.
  induction H.
  - reflexivity.
  - simpl.
    rewrite IHaevalR1.
    rewrite IHaevalR2.
    reflexivity.
Qed.
```

**Anchor explanation:**

| Anchor item                  | Explanation                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------- |
| What is being specified      | The relation `aevalR e n` specifies that expression `e` evaluates to number `n` |
| What is being implemented    | The function `aeval e` computes a number                                        |
| Correctness theorem          | If the relation derives `n`, the function computes `n`                          |
| Relevant induction principle | Induction on evaluation derivation `H`, not directly on expression syntax       |
| Common beginner mistake      | Inducting on `e` and losing the structure of the derivation                     |
| Practical lesson             | Choose induction over the object whose constructors explain the proof           |

**Design meaning:** Relations are often better than functions when the proof should follow derivation structure. Small-step semantics, big-step semantics, typing judgments, and compiler correctness proofs all benefit from this modeling style.

**Common Pitfalls:** Do not force semantics into a function if later theorems need derivation evidence, nondeterminism, partiality, or step-by-step reasoning.

### Task: Model Typed Syntax — raw syntax plus typing relation versus intrinsically typed syntax

**Core keywords:** typed expressions, extrinsic typing, intrinsic typing, preservation, progress.

There are two broad ways to model typed languages in Rocq.

| Style            | Representation                                  | Strength                              | Cost                                        | Best use                                          |
| ---------------- | ----------------------------------------------- | ------------------------------------- | ------------------------------------------- | ------------------------------------------------- |
| Extrinsic typing | Raw syntax plus `has_type : expr -> ty -> Prop` | Flexible, close to textbook PL theory | Need preservation/progress proofs           | Teaching and standard metatheory                  |
| Intrinsic typing | Syntax indexed by type                          | Ill-typed terms unrepresentable       | Harder substitution and syntax manipulation | Certified interpreters, strongly typed embeddings |
| Hybrid           | Raw syntax plus certified elaboration           | Practical boundary                    | More components                             | Realistic verified compilers/interpreters         |

Extrinsic example:

```coq
Inductive ty : Type :=
| TNat
| TBool.

Inductive tm : Type :=
| TNum : nat -> tm
| TTrue : tm
| TPlus : tm -> tm -> tm
| TIf : tm -> tm -> tm -> tm.
```

Typing relation:

```coq
Inductive has_type : tm -> ty -> Prop :=
| T_Num : forall n,
    has_type (TNum n) TNat
| T_True :
    has_type TTrue TBool
| T_Plus : forall t1 t2,
    has_type t1 TNat ->
    has_type t2 TNat ->
    has_type (TPlus t1 t2) TNat
| T_If : forall c t1 t2 T,
    has_type c TBool ->
    has_type t1 T ->
    has_type t2 T ->
    has_type (TIf c t1 t2) T.
```

This style allows ill-typed terms to exist as raw syntax, but proves that well-typed terms behave well.

Intrinsic sketch:

```coq
Inductive itm : ty -> Type :=
| INum : nat -> itm TNat
| ITrue : itm TBool
| IPlus : itm TNat -> itm TNat -> itm TNat
| IIf : forall T : ty, itm TBool -> itm T -> itm T -> itm T.
```

Here an ill-typed term such as adding a boolean to a number cannot even be constructed.

**Design tradeoff:**

| Problem solved                  | Extrinsic response          | Intrinsic response                              |
| ------------------------------- | --------------------------- | ----------------------------------------------- |
| Need to parse arbitrary syntax  | Easy                        | Harder; parsing must produce typed term or fail |
| Need preservation theorem       | Meaningful and central      | Often built into representation                 |
| Need simple substitution proofs | Standard but nontrivial     | Can become dependent-heavy                      |
| Need certified interpreter      | Requires typing proof input | More direct after typed construction            |
| Need textbook PL metatheory     | Excellent                   | Sometimes obscures theorem statements           |

**Common Pitfalls:** Intrinsic typing can make invalid states unrepresentable, but it may hide important metatheoretic statements. For learning preservation and progress, extrinsic typing is usually clearer.

### Task: Express Behavioral Contracts — specifications, preconditions, postconditions, refinement

**Core keywords:** specifications, correctness theorem, precondition, postcondition, refinement, proof boundary.

A Rocq function is not certified merely because it is written in Rocq. Certification comes from the theorem connecting implementation to specification.

Example: boolean equality for `bit`.

```coq
Inductive bit : Type :=
| B0
| B1.

Definition bit_eqb (x y : bit) : bool :=
  match x, y with
  | B0, B0 => true
  | B1, B1 => true
  | _, _ => false
  end.
```

A behavioral contract:

```coq
Definition bit_eqb_spec (eqb : bit -> bit -> bool) : Prop :=
  forall x y : bit, eqb x y = true <-> x = y.
```

Correctness theorem:

```coq
Theorem bit_eqb_correct :
  bit_eqb_spec bit_eqb.
Proof.
  unfold bit_eqb_spec.
  intros x y.
  split.
  - intros H.
    destruct x, y; simpl in H; try discriminate; reflexivity.
  - intros H.
    rewrite H.
    destruct y; reflexivity.
Qed.
```

| Contract component  | Rocq form                         | Example                             |
| ------------------- | --------------------------------- | ----------------------------------- |
| Implementation      | function                          | `bit_eqb`                           |
| Specification       | proposition                       | `bit_eqb_spec bit_eqb`              |
| Correctness theorem | proof of specification            | `bit_eqb_correct`                   |
| Boundary            | assumptions and external behavior | no external runtime involved here   |
| Refinement          | stronger implementation relation  | optimized equality agrees with spec |

**Design meaning:** Specifications are first-class formal objects. They can be named, reused, parameterized, and proved by different implementations.

**Failure-first explanation:** The tempting mental model is “the implementation looks right.” The Rocq model asks for a theorem that states what “right” means. The surprising failure is that a function may be total and type-correct but still fail the intended specification. The professional rule of thumb is: do not call an implementation verified until the relevant correctness theorem has been stated and proved.

**Common Pitfalls:** A weak specification can make verification meaningless. For example, proving only `forall x, bit_eqb x x = true` does not prove that `bit_eqb x y = true` implies `x = y`.

### Task: Validate Unknown or Untrusted Data — raw boundary, parser, validator, certified internal form

**Core keywords:** unknown data, validation, parser, `option`, `result`, smart constructor, trust boundary.

Rocq’s core is pure and formal, but many realistic workflows involve external input: parsed syntax, serialized data, extracted code input, or imported assumptions. The modeling discipline is to separate unknown raw data from validated internal data.

| Boundary task         | Construct/API pattern          | Professional use      | Proof obligation               | Pitfall                         |
| --------------------- | ------------------------------ | --------------------- | ------------------------------ | ------------------------------- |
| Represent raw input   | plain inductive/string/list    | Parsing boundary      | None yet                       | Treating raw input as valid     |
| Validate data         | `A -> bool` or `A -> option B` | Executable validation | Soundness/completeness theorem | Validator not connected to spec |
| Explain failure       | `result E B`                   | Public API            | Error correctness theorem      | Overusing `option`              |
| Build certified value | smart constructor              | Internal invariants   | Constructor correctness        | Making construction too hard    |
| State trust boundary  | explicit assumptions           | external systems      | adequacy theorem if possible   | Hiding assumptions              |

Example: validating a nonempty list.

```coq
Definition nonempty {A : Type} (xs : list A) : Prop :=
  exists x xs', xs = x :: xs'.
```

Computable validator:

```coq
Definition is_nonempty {A : Type} (xs : list A) : bool :=
  match xs with
  | [] => false
  | _ :: _ => true
  end.
```

Soundness theorem:

```coq
Theorem is_nonempty_sound :
  forall (A : Type) (xs : list A),
    is_nonempty xs = true -> nonempty xs.
Proof.
  intros A xs H.
  destruct xs as [| x xs'].
  - simpl in H. discriminate H.
  - exists x, xs'. reflexivity.
Qed.
```

Completeness theorem:

```coq
Theorem is_nonempty_complete :
  forall (A : Type) (xs : list A),
    nonempty xs -> is_nonempty xs = true.
Proof.
  intros A xs H.
  destruct H as [x [xs' Heq]].
  rewrite Heq.
  reflexivity.
Qed.
```

**Design meaning:** A validator without a theorem is just a function. A validator with soundness and completeness theorems becomes part of a certified boundary.

**Common Pitfalls:** It is easy to prove only soundness or only completeness and then accidentally use the validator as if both directions were known. State both when both are needed.

### Task: Convert, Narrow, Parse, or Cast Values — no casual unsafe casting

**Core keywords:** conversion, coercion, parsing, narrowing, type annotation, equality transport, dependent cast.

Rocq does not encourage arbitrary unsafe casts. Instead, conversions usually appear as functions, coercions, parsing/validation steps, or equality-based transports in dependent types.

| Task                      | Rocq pattern           | Safety level           | Failure mode        | Professional rule           |                        |
| ------------------------- | ---------------------- | ---------------------- | ------------------- | --------------------------- | ---------------------- |
| Convert data              | explicit function      | Safe if total          | Wrong specification | Prove conversion properties |                        |
| Parse raw input           | `raw -> option parsed` | Safe partial           | `None` case         | Prove parser soundness      |                        |
| Narrow by validation      | `A -> option {x : A    | P x}`                  | Certified if proved | Proof burden                | Use smart constructors |
| Coerce structure          | declared coercion      | Controlled elaboration | Hidden conversion   | Inspect with printing tools |                        |
| Transport across equality | `eq_rect`, rewriting   | Kernel-checked         | Hard goals          | Prefer rewriting and lemmas |                        |
| Assume cast               | axiom/unsafe plugin    | Trust boundary         | Unsoundness risk    | Avoid or isolate            |                        |

Example conversion:

```coq
Definition bit_to_bool (b : bit) : bool :=
  match b with
  | B0 => false
  | B1 => true
  end.
```

Property:

```coq
Theorem bit_to_bool_injective :
  forall x y : bit,
    bit_to_bool x = bit_to_bool y -> x = y.
Proof.
  intros x y H.
  destruct x, y; simpl in H; try discriminate; reflexivity.
Qed.
```

**Design meaning:** Rocq’s type system does not make conversion implicit unless controlled mechanisms such as coercions are declared. This protects proof checking but can make code verbose.

**Common Pitfalls:** In dependent proofs, rewriting an equality may appear to “cast” a value from one type to another. This is not an unsafe cast; it is equality transport checked by the kernel. The difficulty is usually proof ergonomics, not type unsafety.

### Task: Write Reusable Generic Helpers — polymorphism, implicit arguments, sections

**Core keywords:** polymorphism, implicit arguments, generic functions, sections, reusable lemmas.

Rocq supports polymorphic definitions and theorems. A reusable helper should be general enough to apply broadly but not so abstract that its proof becomes opaque.

Example generic identity:

```coq
Definition id {A : Type} (x : A) : A := x.
```

Generic list theorem:

```coq
Theorem map_id :
  forall (A : Type) (xs : list A),
    map (fun x => x) xs = xs.
Proof.
  intros A xs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl. rewrite IHxs. reflexivity.
Qed.
```

Composition theorem:

```coq
Theorem map_comp :
  forall (A B C : Type) (f : B -> C) (g : A -> B) (xs : list A),
    map f (map g xs) = map (fun x => f (g x)) xs.
Proof.
  intros A B C f g xs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl. rewrite IHxs. reflexivity.
Qed.
```

| Generic design choice                  | Benefit                       | Cost                            | Rule                            |
| -------------------------------------- | ----------------------------- | ------------------------------- | ------------------------------- |
| Quantify over type `A`                 | Reusable across element types | More parameters                 | Use for structural lemmas       |
| Use implicit type arguments            | Cleaner calls                 | Hidden information              | Good for common helpers         |
| State theorem over arbitrary functions | Powerful map/fold lemmas      | Requires function reasoning     | Use when behavior is parametric |
| Use sections                           | Avoid repeated context        | Hidden generalized parameters   | `Check` after closing section   |
| Use typeclasses/modules                | Abstract over operations/laws | Search and inference complexity | Use for algebraic structures    |

**Common Pitfalls:** Over-generalization can create unreadable lemmas. Under-generalization creates many nearly identical lemmas. The professional balance is to generalize over irrelevant details and keep conceptually important assumptions explicit.

### Task: Express Algebraic Structure — records, modules, typeclasses, canonical structures

**Core keywords:** algebraic structures, records, modules, typeclasses, canonical structures, laws.

Algebraic structures in Rocq usually combine a carrier type, operations, and laws. There are several representation strategies.

| Representation       | Best use                        | Strength                             | Cost                 | Common failure mode            |
| -------------------- | ------------------------------- | ------------------------------------ | -------------------- | ------------------------------ |
| Plain record         | Small bundled structure         | Simple and explicit                  | Manual passing       | Boilerplate                    |
| Module/functor       | Large reusable theory           | Namespace and abstraction            | Heavier structure    | Verbose APIs                   |
| Typeclass            | Inference-driven overloading    | Convenient generic notation          | Search opacity       | Unexpected instance resolution |
| Canonical structure  | Mathematical hierarchy patterns | Powerful inference in some libraries | Steep learning curve | Hard-to-debug inference        |
| Unbundled parameters | Local theorem development       | Transparent assumptions              | Repetition           | Hard reuse                     |

Simple monoid record:

```coq
Record Monoid : Type := {
  carrier : Type;
  op : carrier -> carrier -> carrier;
  unit : carrier;
  op_assoc :
    forall x y z : carrier, op (op x y) z = op x (op y z);
  op_unit_l :
    forall x : carrier, op unit x = x;
  op_unit_r :
    forall x : carrier, op x unit = x
}.
```

This record bundles data and laws. An instance for list append is possible:

```coq
Definition list_monoid (A : Type) : Monoid.
Proof.
  refine {|
    carrier := list A;
    op := app;
    unit := []
  |}.
  - intros x y z. apply app_assoc.
  - intros x. reflexivity.
  - intros x. apply app_nil_r.
Defined.
```

**Anchor explanation:**

| Anchor item                                | Explanation                                                                      |
| ------------------------------------------ | -------------------------------------------------------------------------------- |
| Concept taught                             | Algebraic structures are data plus laws                                          |
| Rocq mechanism exercised                   | Records, fields, proof obligations, reusable lemmas                              |
| Why it is a good proof-engineering example | It shows how ordinary functions become structured mathematical objects           |
| Common misunderstanding prevented          | A monoid is not just an operation; it includes identity and associativity proofs |
| Practical lesson                           | State laws as fields or assumptions so generic theorems can use them             |

**Design tradeoff:** Records are explicit and readable; typeclasses and canonical structures reduce boilerplate but introduce inference behavior that can become difficult to debug. The right choice depends on project scale, library conventions, and whether mathematical hierarchy reuse is central.

**Common Pitfalls:** Do not introduce typeclasses merely to avoid passing parameters. Typeclass search is a proof-engineering dependency, and misuse can make errors harder to localize.

### Task: Design Type Safety Boundaries — what the type system guarantees and what it does not

**Core keywords:** type safety, soundness, assumptions, specifications, extraction boundary.

Rocq’s type system guarantees that accepted terms are well typed relative to the environment and assumptions. It does not guarantee that the human intended specification is adequate. It also does not automatically verify external systems or extracted runtime behavior.

| Boundary                                  | Guaranteed by Rocq?                              | Example                               | What remains to discipline                   |
| ----------------------------------------- | ------------------------------------------------ | ------------------------------------- | -------------------------------------------- |
| Term well-typedness                       | Yes, if accepted by kernel                       | `f : A -> B` applied to `x : A`       | Whether `B` is the right spec                |
| Proof term inhabits theorem               | Yes                                              | proof of `forall n, n = n`            | Whether theorem is meaningful                |
| Termination of core recursive definitions | Yes, under accepted recursion discipline         | structural `Fixpoint`                 | Efficiency and adequacy                      |
| Constructive content                      | Yes unless axioms change assumptions             | witness for `exists`                  | Whether classical imports were used          |
| Library theorem correctness               | Yes if no admitted/axiom debt and trusted kernel | standard lemmas                       | Assumptions, version, imports                |
| Extracted code behavior                   | Partially, relative to extraction assumptions    | certified function extracted to OCaml | Runtime, I/O, compiler, external libraries   |
| Whole-system correctness                  | No, not automatically                            | deployed application                  | Specification coverage and environment model |

**Failure-first explanation:** The tempting mental model is “Rocq proves my program correct.” The surprising failure is that a proved theorem may be too weak or about the wrong model. The correct explanation is that Rocq checks formal derivability; adequacy of the model and specification remains a human engineering responsibility.

**Common Pitfalls:** Do not confuse type safety with domain correctness. A type-correct parser may parse the wrong grammar; a proved compiler pass may preserve the wrong semantics if the semantics were misdefined.

### Task: Use Classic Theorem Anchors as Modeling Tests

**Core keywords:** theorem anchors, proof strategy, induction principle, helper lemma, common mistake.

A theorem anchor is a small or medium theorem chosen because it exercises a central modeling mechanism. It should not be decorative. It should test whether the representation supports the reasoning one expects.

| Anchor                             | Concept it teaches           | Rocq mechanism exercised                 | Why it is a good proof-engineering example   | Common misunderstanding prevented        |
| ---------------------------------- | ---------------------------- | ---------------------------------------- | -------------------------------------------- | ---------------------------------------- |
| Equality symmetry                  | Equality as proposition      | `symmetry`, `rewrite`                    | Shows equality proof manipulation            | Equality is not just computation         |
| `A /\ B -> B /\ A`                 | Constructive conjunction     | `destruct`, `split`                      | Shows evidence decomposition/reconstruction  | Conjunction proof is structured evidence |
| `A \/ B -> B \/ A`                 | Constructive disjunction     | `destruct`, `left`, `right`              | Shows explicit branch choice                 | Disjunction is not boolean `or`          |
| `forall n, n + 0 = n`              | Structural induction         | `induction`, `simpl`, `rewrite`          | Shows definitional vs propositional equality | Obvious math may need induction          |
| Append associativity               | Recursive function proof     | list induction                           | Shows induction follows recursion argument   | Inducting on wrong list                  |
| Map composition                    | Polymorphic structural proof | generic functions, induction             | Shows abstraction over types/functions       | Polymorphism is not the hard part        |
| Reverse involution                 | Helper lemma design          | induction plus append/reverse lemma      | Shows why direct proofs fail                 | Some proofs need strengthening           |
| Decidable equality for finite type | Computation/proof bridge     | `destruct`, `discriminate`, sum evidence | Shows boolean equality versus proposition    | `eqb` is not `=`                         |
| Evaluator correctness              | Function/relation bridge     | derivation induction                     | Shows spec/implementation relationship       | Evaluator and semantics need connection  |
| Preservation/progress              | Type soundness               | induction on typing/evaluation           | Shows PL metatheory                          | Type safety is a theorem, not a slogan   |

Example: equality symmetry.

```coq
Theorem eq_sym_anchor :
  forall (A : Type) (x y : A), x = y -> y = x.
Proof.
  intros A x y H.
  symmetry.
  exact H.
Qed.
```

Example: currying and uncurrying.

```coq
Theorem curry_anchor :
  forall A B C : Prop,
    (A /\ B -> C) -> A -> B -> C.
Proof.
  intros A B C H HA HB.
  apply H.
  split.
  - exact HA.
  - exact HB.
Qed.
```

```coq
Theorem uncurry_anchor :
  forall A B C : Prop,
    (A -> B -> C) -> A /\ B -> C.
Proof.
  intros A B C H HAB.
  destruct HAB as [HA HB].
  apply H.
  - exact HA.
  - exact HB.
Qed.
```

**Interdisciplinary Lens: Constructive Logic**

| Item                      | Explanation                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------- |
| What it clarifies         | Currying transforms evidence flow, not just notation                                   |
| Language feature involved | implication, conjunction, proof terms                                                  |
| Practical consequence     | `intros`, `destruct`, and `apply` mirror the structure of logical connectives          |
| Limit of the lens         | Larger proofs need induction, rewriting, and library lemmas in addition to logic rules |

**Common Pitfalls:** Do not memorize theorem anchors as isolated proofs. Use them as diagnostic tests: if the proof is hard, the model, statement, or induction choice may be wrong.

### Task: Strengthen Theorems Before Induction — generalization and induction-hypothesis design

**Core keywords:** induction hypothesis, generalization, quantifier order, theorem strengthening.

Many Rocq proofs fail because the induction hypothesis is too weak. This is not a tactic problem; it is a theorem-statement problem.

A common bad pattern is introducing too many variables before induction. Consider a theorem about a function with an accumulator. A too-specific induction may freeze the accumulator and produce an unusable induction hypothesis.

Illustrative accumulator reverse:

```coq
Fixpoint rev_acc {A : Type} (xs acc : list A) : list A :=
  match xs with
  | [] => acc
  | x :: xs' => rev_acc xs' (x :: acc)
  end.
```

The useful theorem is not merely about `rev_acc xs []`. A stronger helper is:

```coq
Theorem rev_acc_correct :
  forall (A : Type) (xs acc : list A),
    rev_acc xs acc = rev xs ++ acc.
Proof.
  intros A xs.
  induction xs as [| x xs IHxs].
  - intros acc. reflexivity.
  - intros acc.
    simpl.
    rewrite IHxs.
    rewrite app_assoc.
    reflexivity.
Qed.
```

Then the ordinary reverse theorem follows more easily.

| Proof problem              | Weak statement                      | Stronger statement                 | Lesson                              |
| -------------------------- | ----------------------------------- | ---------------------------------- | ----------------------------------- |
| Accumulator proof stuck    | property only for `acc = []`        | quantify over arbitrary `acc`      | Generalize accumulator              |
| Append proof stuck         | property over fixed suffix          | quantify over all suffixes         | Let IH apply flexibly               |
| Tree traversal proof stuck | property over one traversal context | quantify over continuation/context | Strengthen with accumulator/context |
| Substitution proof stuck   | property over fixed variable        | quantify over term/type context    | Avoid freezing dependent variables  |

**Failure-first explanation:** The tempting mental model is “prove exactly the theorem wanted.” The surprising behavior is that the exact theorem may be too weak for induction. The correct explanation is that induction hypotheses are generated from the quantified statement. The professional rule of thumb is: if the induction hypothesis is unusable, strengthen the theorem, do not merely search for stronger tactics.

**Common Pitfalls:** `intros` before `induction` is not always harmless. Introducing a variable can make it fixed in the induction hypothesis. Sometimes the right proof starts with induction before introducing all variables, or with `generalize dependent`.

### Task: Manage Definitional and Propositional Equality in Data Models

**Core keywords:** definitional equality, propositional equality, computation, rewriting, transparency.

A data model should consider which equalities compute automatically and which require lemmas.

| Equality situation                       | Usually definitional? | Usually needs lemma? | Example                     |                  |    |
| ---------------------------------------- | --------------------- | -------------------- | --------------------------- | ---------------- | -- |
| Function recurses on visible constructor | Yes                   | No                   | `0 + n = n`                 |                  |    |
| Function recurses on variable            | No                    | Yes/induction        | `n + 0 = n`                 |                  |    |
| Append with empty left list              | Yes                   | No                   | `[] ++ xs = xs`             |                  |    |
| Append with empty right list             | No                    | Yes/induction        | `xs ++ [] = xs`             |                  |    |
| Map over empty list                      | Yes                   | No                   | `map f [] = []`             |                  |    |
| Reverse over append                      | No                    | Yes/helper lemma     | `rev (xs ++ ys)`            |                  |    |
| Record projection after construction     | Often yes             | Sometimes            | `px {                       | px := 0; py := 1 | }` |
| Dependent transport                      | Rarely simple         | Yes                  | equality over indexed types |                  |    |

**Design meaning:** The definition’s recursion argument controls reduction behavior. This affects theorem shape, proof strategy, and which helper lemmas become necessary.

Example:

```coq
Theorem app_nil_l :
  forall (A : Type) (xs : list A), [] ++ xs = xs.
Proof.
  intros A xs.
  reflexivity.
Qed.
```

But:

```coq
Theorem app_nil_r_again :
  forall (A : Type) (xs : list A), xs ++ [] = xs.
Proof.
  intros A xs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl. rewrite IHxs. reflexivity.
Qed.
```

**Common Pitfalls:** Definitional equality is not symmetric from the human perspective of “obviousness.” It follows the chosen definitions. Good Rocq users learn which side of a function computes.

### Task: Select the Right Abstraction Boundary — raw function, specification, module, class, relation

**Core keywords:** abstraction boundary, APIs, reusable theory, modules, typeclasses, relations.

A Rocq API can expose raw functions, specifications, proofs, modules, records, typeclasses, or relations. The right boundary depends on the intended reuse.

| Boundary style            | Expose                    | Hide             | Best use                    | Failure mode                 |
| ------------------------- | ------------------------- | ---------------- | --------------------------- | ---------------------------- |
| Raw function              | implementation            | little           | Simple executable code      | Clients depend on definition |
| Function + theorem        | implementation and spec   | proof details    | Certified algorithms        | Spec may be too weak         |
| Abstract module           | interface                 | representation   | Data abstraction            | Verbosity                    |
| Record of operations/laws | structured object         | proof scripts    | Algebraic structures        | Projection clutter           |
| Typeclass                 | inferred structure        | instance passing | Overloaded algebra/notation | Search opacity               |
| Relation                  | behavior, not computation | implementation   | Semantics/specification     | Hard extraction              |
| Dependent record          | value plus invariant      | invalid states   | Validated internal data     | Equality/projection issues   |

Example: exposing a stack abstractly could use a module signature rather than revealing a list representation. For smaller developments, a record of operations and laws may be simpler.

**Professional rule of thumb:** Expose the weakest interface that supports intended clients and proofs. Do not expose a concrete representation merely because it is convenient today.

**Common Pitfalls:** If clients rewrite using the body of a function everywhere, changing the implementation later becomes painful. Prefer named specifications and lemmas for public behavior.

### Task: Use Automation Boundaries in Data Proofs — `auto`, `lia`, rewriting databases, opacity

**Core keywords:** automation, `auto`, `eauto`, `lia`, rewrite hints, maintainability.

Data-model proofs often use routine automation. The challenge is deciding what should be automated.

| Automation kind     | Good target                              | Bad target                            | Risk                      |
| ------------------- | ---------------------------------------- | ------------------------------------- | ------------------------- |
| `auto`              | trivial propositional goals              | central proof idea                    | Opaque success/failure    |
| `eauto`             | existentially instantiated routine goals | large search spaces                   | Slow or unpredictable     |
| `lia`               | linear arithmetic over `nat`/`Z`         | nonlinear algebra or structural facts | Misapplied solver         |
| `rewrite` databases | repetitive normalization                 | broad uncontrolled rewriting          | Loops or unreadable proof |
| `simpl`/`cbn`       | local computation                        | full proof strategy                   | Over-reduction            |
| custom tactics      | repeated proof patterns                  | one-off clever scripts                | Maintenance burden        |

Example where `lia` helps:

```coq
From Stdlib Require Import Lia.

Theorem length_nonnegative :
  forall (A : Type) (xs : list A),
    0 <= length xs.
Proof.
  intros A xs.
  lia.
Qed.
```

But `lia` will not prove structural list theorems such as `xs ++ [] = xs`; induction is still needed.

**Design meaning:** Automation is a proof-engineering layer over the kernel. It can find proof terms, but the kernel still checks the result. The practical risk is not usually soundness; it is opacity, brittleness, and performance.

**Common Pitfalls:** If a proof’s central mathematical idea is hidden inside `auto`, the script may be short but unreviewable. Use automation for leaves, not for the trunk.

### Task: Decide Where Proofs Live — proof fields, separate lemmas, sections, hint databases

**Core keywords:** proof placement, proof fields, separate lemmas, local context, reuse.

A property can live inside a data structure, in a separate theorem, as a section hypothesis, or as a typeclass/record law. This is a design choice.

| Proof location        | Example                      | Strength                     | Cost                           | Use when                      |
| --------------------- | ---------------------------- | ---------------------------- | ------------------------------ | ----------------------------- |
| Proof field in record | `pos_proof : n <> 0`         | Invariant travels with data  | Equality/projection complexity | Validated data                |
| Separate lemma        | `Theorem f_correct : spec f` | Clean data, reusable proof   | Must pass lemma explicitly     | Algorithm correctness         |
| Section hypothesis    | `Hypothesis op_assoc : ...`  | Convenient local development | Hidden generalized assumptions | Developing theory             |
| Typeclass law         | class fields                 | Inferred structure           | Search complexity              | Algebraic generic programming |
| Hint database         | proof automation             | Reduces repetition           | Opaque dependencies            | Stable routine facts          |

Example separate lemma:

```coq
Definition twice (n : nat) : nat := n + n.

Theorem twice_zero :
  twice 0 = 0.
Proof.
  reflexivity.
Qed.
```

Example proof field:

```coq
Record certified_bool_eq (A : Type) : Type := {
  eqb : A -> A -> bool;
  eqb_sound : forall x y, eqb x y = true -> x = y;
  eqb_complete : forall x y, x = y -> eqb x y = true
}.
```

**Professional rule of thumb:** Put proofs inside records when clients should not use the object without its law. Keep proofs separate when they are one of many properties about an otherwise ordinary function.

**Common Pitfalls:** Bundling too much proof evidence into data can make computation and equality painful. Keeping all proofs separate can make APIs under-specified.

### Task: Compare Rocq’s Type/Data Model with Adjacent Languages

**Core keywords:** transfer map, Haskell, OCaml, Lean, Agda, TypeScript, Rust.

| Source-language concept    | How it appears in Rocq             | What transfers                 | What changes                            | Common failure mode                      | Better mental model                    |
| -------------------------- | ---------------------------------- | ------------------------------ | --------------------------------------- | ---------------------------------------- | -------------------------------------- |
| Haskell ADTs               | `Inductive`                        | Constructors, pattern matching | Inductives generate proof principles    | Treating inductives as only runtime data | Data definition also defines reasoning |
| OCaml modules              | Rocq modules/functors              | Namespaces, abstraction        | Proofs and laws matter                  | Ignoring proof obligations               | Module interfaces can express theory   |
| Lean theorem proving       | Theorem/proof/tactic structure     | Propositions-as-types          | Different elaboration/tactics/libraries | Expecting tactic portability             | Transfer concepts, not scripts         |
| Agda dependent programming | Indexed types, total functions     | Dependent pattern intuition    | Rocq tactic culture is stronger         | Avoiding tactics entirely                | Use both terms and tactics             |
| TypeScript validation      | `unknown` boundary plus validators | Runtime-boundary thinking      | Rocq has formal proof of validators     | Trusting types for external data         | Raw data needs certified validation    |
| Rust safety types          | invalid states unrepresentable     | API design with invariants     | Rocq proofs are explicit evidence       | Over-encoding invariants                 | Balance type strength and proof cost   |
| Isabelle/HOL relations     | inductive relations and metatheory | Formal proof discipline        | Logic and type theory differ            | Importing HOL assumptions                | Learn CIC-specific proof terms         |

**Common Pitfalls:** Haskell and OCaml intuition helps with recursion and ADTs, but it underestimates the proof consequences of representation choices. Lean and Agda intuition helps with dependent types, but library and tactic conventions differ materially.

### Data-Modeling Decision Table — task-indexed reference

**Core keywords:** decision table, task patterns, representation choice.

| Task                         | Primary construct                  | When to use                 | Design meaning                      | Common pitfall                  |
| ---------------------------- | ---------------------------------- | --------------------------- | ----------------------------------- | ------------------------------- |
| Define finite alternatives   | `Inductive`                        | Closed finite state space   | Constructors are all cases          | Forgetting future extension     |
| Define recursive data        | recursive `Inductive`              | Lists, trees, syntax        | Generates structural induction      | Poor recursion shape            |
| Define named product         | `Record`                           | Public structured data      | Field projections and optional laws | Record equality complexity      |
| Represent absence            | `option A`                         | Failure with no explanation | Total partial function              | Hiding important failure reason |
| Represent explained failure  | custom `result E A`                | Failure reason matters      | Public error model                  | Overengineering local code      |
| State property               | `A -> Prop`                        | Specification/theorem       | Proof evidence required             | Expecting computation           |
| Compute predicate            | `A -> bool`                        | Executable test             | Branchable/extractable              | Missing correctness lemma       |
| Connect bool and Prop        | soundness/completeness lemmas      | Verified decision           | Computation/proof bridge            | Proving one direction only      |
| Carry invariant              | subset/dependent record            | Validated internal data     | Invalid states unrepresentable      | Heavy proof fields              |
| Track size/index             | indexed inductive/vector           | Size central to correctness | Type-level invariant                | Index arithmetic burden         |
| Model semantics              | inductive relation                 | Evaluation/typing/reduction | Evidence has derivation structure   | Using function too early        |
| Verify implementation        | spec + theorem                     | Certified program           | Correctness stated formally         | Weak spec                       |
| Abstract algebraic structure | record/module/typeclass            | Operations plus laws        | Generic theory                      | Inference or boilerplate        |
| Handle external data         | parser/validator/smart constructor | Trust boundary              | Validation as proof obligation      | Treating raw input as valid     |
| Reuse theorem                | generalized lemma                  | Recurrent proof pattern     | Strong induction hypotheses         | Over-specific theorem           |

### Type-System Property Table — what Rocq gives and what to watch

**Core keywords:** type-system guarantees, dependent typing, totality, proof irrelevance caveats, extraction.

| Type-system property     | Practical consequence                      | Common misunderstanding             | Professional correction                                      |
| ------------------------ | ------------------------------------------ | ----------------------------------- | ------------------------------------------------------------ |
| Static checking          | Invalid terms rejected before acceptance   | Static means correctness automatic  | Correctness requires right specification                     |
| Dependent types          | Types can express value-indexed invariants | Stronger types always easier        | Stronger types move obligations earlier                      |
| Propositions as types    | Theorem is a type, proof is inhabitant     | Theorems are comments               | Theorems are checked objects                                 |
| Inductive definitions    | Data and evidence have constructors        | Constructors are only tags          | Constructors define elimination principles                   |
| Structural recursion     | Accepted functions terminate               | Rocq cannot express real algorithms | Use structural, well-founded, or library-supported recursion |
| Constructive core        | Witnesses and branch choices matter        | Classical reasoning impossible      | Classical axioms can be imported explicitly                  |
| Universe hierarchy       | Avoids paradoxes and organizes types       | `Type` is one flat universe         | Universe levels appear when abstractions grow                |
| Proof opacity            | `Qed` hides proof bodies from computation  | `Qed` and `Defined` are equivalent  | Transparency affects conversion                              |
| Extraction erases proofs | Computational content extracted            | Extracted code wholly verified      | External runtime remains boundary                            |

### Common Pitfalls and Anti-Patterns in Rocq Data Modeling

**Core keywords:** pitfalls, anti-patterns, theorem statements, induction, equality, validation, extraction.

| Item                                                         | Category                       | Why it fails                                           | Better practice                                 |
| ------------------------------------------------------------ | ------------------------------ | ------------------------------------------------------ | ----------------------------------------------- |
| Treating `Prop` as `bool`                                    | Common pitfall                 | Cannot branch computationally on arbitrary proposition | Use `bool` plus bridge lemmas                   |
| Using `bool` without spec theorem                            | Common pitfall                 | Computation not connected to logical property          | Prove soundness/completeness                    |
| Inducting on wrong variable                                  | Common pitfall                 | IH does not match recursive definition                 | Induct over structurally consumed argument      |
| Over-dependent modeling                                      | Anti-pattern                   | Every operation requires heavy proofs                  | Use dependent types only for central invariants |
| Under-specified correctness theorem                          | Anti-pattern                   | Verified theorem too weak to matter                    | State behavioral contract first                 |
| Using `option` for rich errors                               | Context-dependent misuse       | Failure reason lost                                    | Use custom result when error matters            |
| Exposing concrete representation too early                   | Design anti-pattern            | Future refactoring breaks proofs                       | Expose lemmas/specs/interfaces                  |
| Hiding assumptions in sections                               | Common pitfall                 | Exported theorem type surprises user                   | `Check` after `End`                             |
| Using `Admitted` as development habit                        | Dangerous pattern              | Adds unproved assumption                               | Track as trust debt                             |
| Relying on automation for central facts                      | Proof-engineering anti-pattern | Proof becomes opaque and brittle                       | State helper lemmas                             |
| Confusing extracted correctness with full-system correctness | Boundary mistake               | Runtime/external systems unverified                    | State proof boundary explicitly                 |

### PART 3 Summary — data modeling as proof-shape design

The central lesson of PART 3 is that Rocq modeling is not merely about data representation. It is about **proof-shape design**. Every representation determines what can be computed directly, what must be proved propositionally, what induction principle is available, what proof obligations appear, and what later clients can reuse.

| Modeling dimension                                | Rocq judgment question                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------ |
| Data versus proposition                           | Is this for computation, specification, or both?                         |
| `bool` versus `Prop`                              | Should this branch computationally or express a theorem?                 |
| Function versus relation                          | Is behavior deterministic and executable, or evidence-rich and semantic? |
| Raw data versus dependent data                    | Should invalid states be representable?                                  |
| List versus vector                                | Is length an incidental property or central invariant?                   |
| Separate proof versus proof field                 | Should evidence travel with the object?                                  |
| Concrete representation versus abstract interface | Should clients depend on implementation or specification?                |
| Local lemma versus reusable theorem               | Is this a one-off step or a proof-library asset?                         |
| Automation versus explicit proof                  | Is the step routine or conceptually central?                             |
| Constructive versus classical reasoning           | Does the proof require witnesses/branches, or imported principles?       |

A professional Rocq user treats theorem statements, helper lemmas, induction principles, and representation choices as one design problem. The question is not only “can this be proved?” but also “will this representation make the important proofs natural, reusable, and maintainable?”

## PART 4 — Control Flow, Functions, Abstraction, and Composition by Task Pattern

PART 4 explains Rocq behavior-design tasks: how to define functions, structure control flow, compose definitions, design theorem statements, and construct proofs interactively. In ordinary programming languages, “control flow” usually means sequencing, branching, loops, exceptions, and calls. In Rocq, the central forms are **pure functions, structural recursion, pattern matching, inductive elimination, proof-state transformation, and tactic-guided construction of proof terms**. This follows the requested task-pattern reference structure.

### Behavioral Orientation — functions, proof terms, tactics, and eliminators

**Core keywords:** functions, proof terms, eliminators, tactics, computation, proof state.

Rocq has no ordinary imperative loop in its Gallina core. Iteration is expressed by recursion over inductive data. Branching is expressed by `match` or boolean `if`. Proof branching is expressed by tactics such as `destruct`, `induction`, `split`, `left`, and `right`. These are related but not identical.

| Behavioral task        | Ordinary programming analogue | Rocq mechanism                              | Semantic meaning                  | Common failure mode                               |
| ---------------------- | ----------------------------- | ------------------------------------------- | --------------------------------- | ------------------------------------------------- |
| Define computation     | Function definition           | `Definition`, `Fixpoint`, `fun`             | Introduce a typed term            | Recursive call not structurally smaller           |
| Branch on data         | `if`, `switch`, pattern match | `match`, `if b then ... else ...`           | Eliminate inductive/boolean value | Confusing `Prop` with `bool`                      |
| Iterate over structure | Loop                          | structural recursion                        | Consume inductive data            | Expecting general recursion                       |
| Prove by cases         | Case split                    | `destruct`                                  | Eliminate a value or evidence     | Losing needed equations                           |
| Prove recursively      | Induction                     | `induction`                                 | Use induction principle           | Weak induction hypothesis                         |
| Transform goal         | Rewrite/simplify              | `rewrite`, `simpl`, `cbn`                   | Use equality or computation       | Confusing definitional and propositional equality |
| Compose behavior       | Function composition, lemmas  | higher-order functions, theorem application | Build larger terms/proofs         | Over-abstracting too early                        |
| Automate routine proof | Solver/search                 | `auto`, `eauto`, `lia`                      | Search for proof terms            | Opaque brittle proof script                       |

**Design principle:** Rocq control flow is built from **elimination principles**. Pattern matching eliminates data. `destruct` eliminates cases. `induction` eliminates recursive structure using an induction principle. `apply` eliminates an implication or theorem by generating premises. Even tactics that feel procedural are constructing a proof term acceptable to the kernel.

**Common Pitfalls:** Do not treat proof scripts as arbitrary imperative programs. They are structured backward proof construction. Every tactic must be justified by the current goal and context.

### Task: Define Pure Functions — `Definition`, `fun`, parameters, return annotations

**Core keywords:** `Definition`, `fun`, pure functions, annotations, parameters, computation.

A pure function in Rocq is a term with a function type. It has no hidden mutation, no implicit I/O, and no runtime exception behavior in the ordinary application sense. Its behavior is given by its definition and reduction rules.

| Function form                    | Syntax                                  | Use when                                   | Example                                  | Pitfall                                                 |
| -------------------------------- | --------------------------------------- | ------------------------------------------ | ---------------------------------------- | ------------------------------------------------------- |
| Named definition with parameters | `Definition f (x : A) : B := body.`     | Public function or reusable helper         | `Definition inc (n : nat) : nat := S n.` | Omitting important type annotations                     |
| Anonymous function               | `fun x : A => body`                     | Higher-order argument or direct proof term | `fun n : nat => S n`                     | Forgetting argument type when inference cannot solve it |
| Definition by proof mode         | `Definition f : T. Proof. ... Defined.` | Constructing dependent objects             | certified value                          | Accidentally using `Qed` where computation is needed    |
| Local function                   | `let f := ... in ...`                   | Avoid repeated subterm                     | local helper                             | Less reusable/searchable                                |
| Polymorphic function             | `{A : Type}` or `(A : Type)`            | Generic helper                             | `Definition id {A} (x : A) := x.`        | Hidden implicit arguments confuse readers               |

Examples:

```coq
Definition inc (n : nat) : nat :=
  S n.

Definition compose {A B C : Type}
  (f : B -> C) (g : A -> B) : A -> C :=
  fun x => f (g x).

Definition apply_twice {A : Type} (f : A -> A) (x : A) : A :=
  f (f x).
```

A theorem about `apply_twice`:

```coq
Theorem apply_twice_id :
  forall (A : Type) (x : A),
    apply_twice (fun y => y) x = x.
Proof.
  intros A x.
  reflexivity.
Qed.
```

This proof closes by definitional computation: `apply_twice (fun y => y) x` reduces to `x`.

**Design tradeoff:**

| Design choice           | Problem solved                  | Capability gained            | Cost introduced                  |
| ----------------------- | ------------------------------- | ---------------------------- | -------------------------------- |
| Explicit result type    | Prevents accidental inference   | Clear public API             | More verbosity                   |
| Implicit type parameter | Cleaner calls                   | Generic use without clutter  | Hidden arguments                 |
| Proof-mode definition   | Allows interactive construction | Useful for dependent data    | Less direct than term definition |
| Higher-order helper     | Abstracts repeated pattern      | Reuse and theorem generality | Can obscure simple behavior      |

**Common Pitfalls:** For exported functions, omit result types only when inference is obvious and stable. Serious developments benefit from explicit interfaces because theorem statements and downstream proofs depend on them.

### Task: Design Function Signatures — inputs, implicit parameters, specifications

**Core keywords:** signature design, implicit arguments, public API, theorem statement, specification.

In Rocq, a function signature is also a proof-engineering interface. It determines what clients can compute, what they must prove, and what later theorems can state.

| Signature pattern         | Example shape        | Use when                                   | Practical consequence                   | Common pitfall                                 |                        |
| ------------------------- | -------------------- | ------------------------------------------ | --------------------------------------- | ---------------------------------------------- | ---------------------- |
| Plain total function      | `A -> B`             | Total computation                          | Simple rewriting and computation        | Hiding invalid-input cases                     |                        |
| Option-returning function | `A -> option B`      | Partial operation without rich error       | Forces caller to handle absence         | Weak specification if `None` not characterized |                        |
| Result-returning function | `A -> result E B`    | Failure reason matters                     | Public error model                      | Boilerplate                                    |                        |
| Precondition argument     | `forall x, P x -> B` | Invalid input should be impossible         | Caller supplies proof                   | Awkward computation                            |                        |
| Dependent result          | `forall x, { y : B   | Q x y }`                                   | Function returns proof-certified output | Strong correctness by construction             | Heavy dependent proofs |
| Relation specification    | `A -> B -> Prop`     | Nondeterministic or evidence-rich behavior | Flexible theorem statements             | Not directly executable                        |                        |

Example: two signatures for predecessor.

```coq
Definition pred_opt (n : nat) : option nat :=
  match n with
  | 0 => None
  | S k => Some k
  end.
```

Precondition style:

```coq
Definition pred_pre (n : nat) (H : n <> 0) : nat :=
  match n with
  | 0 => match H eq_refl with end
  | S k => k
  end.
```

The first is easier to execute and extract. The second states at the type level that the invalid case cannot occur.

**Professional rule of thumb:** Use `option`/`result` for executable APIs crossing uncertain boundaries. Use proof arguments or dependent results when the invariant is central and stable. Use relations when the behavior is semantic, nondeterministic, or proof-first.

**Common Pitfalls:** A precondition-heavy function may look elegant but become painful to call. Conversely, an `option`-heavy API may force every theorem to prove that `None` cannot happen. The right signature depends on the surrounding proof workload.

### Task: Branch by Computable Value — `if`, `match`, booleans, options

**Core keywords:** `if`, `match`, `bool`, `option`, branch coverage, computation.

Use `if` for booleans. Use `match` for general inductive values. Branching on `Prop` is not ordinary computation unless a decidability object is available.

Boolean branch:

```coq
Definition max_zero_test (n : nat) : bool :=
  if Nat.eqb n 0 then true else false.
```

Option branch:

```coq
Definition option_default {A : Type} (default : A) (o : option A) : A :=
  match o with
  | Some x => x
  | None => default
  end.
```

Nested pattern matching:

```coq
Definition add_options (x y : option nat) : option nat :=
  match x, y with
  | Some n, Some m => Some (n + m)
  | _, _ => None
  end.
```

| Branching form                | Use when                       | Semantic basis                    | Proof consequence                           |
| ----------------------------- | ------------------------------ | --------------------------------- | ------------------------------------------- |
| `if b then x else y`          | Condition is `b : bool`        | Boolean elimination               | Proofs often destruct `b`                   |
| `match o with ... end`        | Branching on inductive data    | Constructor elimination           | Proofs mirror constructors                  |
| `match evidence with ... end` | Branching on proof/evidence    | Inductive proposition elimination | May be restricted by sort/elimination rules |
| Decidable proposition         | Branching with decision object | `{P} + {~P}`                      | Carries proof of selected branch            |

**Failure-first explanation:** The tempting mental model is “a proposition can be used like a condition.” The surprising behavior is that `if n = 0 then ... else ...` is not accepted because `n = 0` has type `Prop`, not `bool`. The correct explanation is that Rocq distinguishes computational booleans from logical propositions. The professional rule of thumb is: branch on `bool`; prove specifications in `Prop`; connect them with lemmas.

**Common Pitfalls:** Pattern matching on multiple values can make later proofs require careful destructuring. If a function branches on `x` and `y`, proofs about it often start with `destruct x, y`.

### Task: Branch by Structure — pattern matching over inductive data

**Core keywords:** structural branching, constructors, elimination, coverage, recursive data.

Pattern matching consumes inductive data. It is exhaustive because every constructor must be handled.

Natural number example:

```coq
Definition is_successor (n : nat) : bool :=
  match n with
  | 0 => false
  | S _ => true
  end.
```

List example:

```coq
From Stdlib Require Import List.
Import ListNotations.

Definition second_or_zero (xs : list nat) : nat :=
  match xs with
  | _ :: y :: _ => y
  | _ => 0
  end.
```

Tree example:

```coq
Inductive tree (A : Type) : Type :=
| Leaf : tree A
| Node : tree A -> A -> tree A -> tree A.

Definition is_leaf {A : Type} (t : tree A) : bool :=
  match t with
  | Leaf _ => true
  | Node _ _ _ _ => false
  end.
```

| Pattern             | Meaning               | Typical proof tactic            | Pitfall                                       |
| ------------------- | --------------------- | ------------------------------- | --------------------------------------------- |
| `0` / `S n`         | Natural-number cases  | `destruct n` or `induction n`   | Assuming both branches reduce symmetrically   |
| `[]` / `x :: xs`    | List cases            | `destruct xs` or `induction xs` | Inducting on wrong list                       |
| `Some x` / `None`   | Optional value        | `destruct o`                    | Forgetting type annotation for `None`         |
| Custom constructors | Domain-specific cases | `destruct` / `inversion`        | Poor constructor names harm proof readability |

**Language-design meaning:** Pattern matching is a term-level eliminator. It determines computation. Tactics such as `destruct` and `induction` are proof-level uses of related elimination principles.

**Common Pitfalls:** Do not overuse wildcard patterns in public definitions if named components will matter in proofs. A wildcard may be fine computationally but less informative when debugging.

### Task: Iterate and Transform Data — structural recursion with `Fixpoint`

**Core keywords:** `Fixpoint`, structural recursion, termination, map, fold-like recursion, lists.

Rocq’s ordinary recursive functions must be accepted as terminating. Most basic functions recurse structurally over an inductive argument.

Example: map over lists.

```coq
Fixpoint my_map {A B : Type} (f : A -> B) (xs : list A) : list B :=
  match xs with
  | [] => []
  | x :: xs' => f x :: my_map f xs'
  end.
```

Example: filter with boolean predicate.

```coq
Fixpoint my_filter {A : Type} (p : A -> bool) (xs : list A) : list A :=
  match xs with
  | [] => []
  | x :: xs' =>
      if p x then x :: my_filter p xs'
      else my_filter p xs'
  end.
```

Tree traversal:

```coq
Fixpoint inorder {A : Type} (t : tree A) : list A :=
  match t with
  | Leaf _ => []
  | Node _ l x r => inorder l ++ [x] ++ inorder r
  end.
```

| Recursion pattern       | Function shape                   | Good theorem anchor           | Common pitfall                                |
| ----------------------- | -------------------------------- | ----------------------------- | --------------------------------------------- |
| Natural recursion       | recurse on predecessor           | `n + 0 = n`                   | Expecting variable-headed recursion to reduce |
| List recursion          | recurse on tail                  | length/map/append lemmas      | Inducting on non-recursive argument           |
| Tree recursion          | recurse on subtrees              | traversal preserves size      | Forgetting both induction hypotheses          |
| Accumulator recursion   | recurse with changed accumulator | accumulator correctness lemma | Proving too-specific theorem                  |
| Mutual/nested recursion | advanced recursion patterns      | semantic functions            | Termination proof difficulties                |

**Failure-first explanation:** The tempting mental model is “if a recursive algorithm terminates, Rocq should accept it.” The surprising behavior is that Rocq may reject a terminating algorithm when the structural decrease is not syntactically evident. The correct explanation is that Rocq protects consistency by accepting only recursion it can justify. The professional rule of thumb is: first write structurally recursive definitions; reach for well-founded recursion or specialized libraries only when the structure requires it.

**Common Pitfalls:** Accumulator functions usually require stronger correctness lemmas. A theorem about `rev_acc xs []` may be too weak; a theorem about `rev_acc xs acc` for arbitrary `acc` is often the right helper.

### Task: Compose Functions — higher-order functions, composition, map, reusable helpers

**Core keywords:** higher-order functions, composition, polymorphism, `map`, extensional behavior.

Rocq functions are first-class terms. They can be passed as arguments, returned, and composed. Higher-order functions are useful, but theorem statements must make behavior explicit.

Function composition:

```coq
Definition comp {A B C : Type} (f : B -> C) (g : A -> B) : A -> C :=
  fun x => f (g x).
```

Map composition theorem:

```coq
Theorem my_map_comp :
  forall (A B C : Type) (f : B -> C) (g : A -> B) (xs : list A),
    my_map f (my_map g xs) = my_map (fun x => f (g x)) xs.
Proof.
  intros A B C f g xs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl.
    rewrite IHxs.
    reflexivity.
Qed.
```

| Composition pattern   | Rocq construct        | Use when            | Proof pattern                              | Pitfall                             |
| --------------------- | --------------------- | ------------------- | ------------------------------------------ | ----------------------------------- |
| Function composition  | `fun x => f (g x)`    | Pipeline behavior   | usually reflexivity or extensional theorem | Over-abstracting small code         |
| Map composition       | `map f (map g xs)`    | List transformation | induction on list                          | Missing polymorphic quantifiers     |
| Predicate composition | `fun x => p (f x)`    | validators/checkers | bridge lemmas                              | Confusing `bool` and `Prop`         |
| Theorem composition   | `apply H2. apply H1.` | implication chains  | backward reasoning                         | Applying theorem in wrong direction |
| Relation composition  | exists intermediate   | semantic steps      | destruct existential/evidence              | Weak intermediate invariant         |

**Design meaning:** Higher-order functions make generic computation concise. Higher-order theorems make proof libraries powerful. But function equality can be subtle: proving two functions equal may require function extensionality unless the goal is about their outputs for arbitrary inputs.

Example pointwise statement instead of function equality:

```coq
Theorem comp_id_pointwise :
  forall (A : Type) (f : A -> A) (x : A),
    comp (fun y => y) f x = f x.
Proof.
  intros A f x.
  reflexivity.
Qed.
```

**Common Pitfalls:** Prefer pointwise theorems when possible. Direct equality between functions may require additional principles such as functional extensionality, depending on the theorem shape.

### Task: Design Function Specifications — pointwise, relational, algebraic, executable

**Core keywords:** specification style, pointwise theorem, relational spec, algebraic law, correctness theorem.

A function’s correctness can be specified in multiple styles. The best style depends on how the theorem will be used.

| Specification style    | Example shape                        | Best use                 | Strength                 | Pitfall                         |
| ---------------------- | ------------------------------------ | ------------------------ | ------------------------ | ------------------------------- |
| Pointwise equation     | `forall x, f x = g x`                | Function equivalence     | Easy rewriting           | May hide richer behavior        |
| Algebraic law          | associativity, identity              | Structures and libraries | Reusable laws            | Needs correct abstraction       |
| Soundness theorem      | `checker x = true -> P x`            | Validators               | Safe acceptance          | Does not guarantee completeness |
| Completeness theorem   | `P x -> checker x = true`            | Validators               | No false rejection       | Does not guarantee soundness    |
| Relational correctness | `impl x y -> spec x y`               | Semantics                | Flexible                 | More proof work                 |
| Refinement theorem     | implementation refines abstract spec | verified optimization    | Strong engineering value | Requires model discipline       |

Example: soundness/completeness of a boolean predicate.

```coq
Definition is_empty {A : Type} (xs : list A) : bool :=
  match xs with
  | [] => true
  | _ :: _ => false
  end.

Definition EmptyList {A : Type} (xs : list A) : Prop :=
  xs = [].
```

Soundness:

```coq
Theorem is_empty_sound :
  forall (A : Type) (xs : list A),
    is_empty xs = true -> EmptyList xs.
Proof.
  intros A xs H.
  destruct xs as [| x xs'].
  - reflexivity.
  - simpl in H. discriminate H.
Qed.
```

Completeness:

```coq
Theorem is_empty_complete :
  forall (A : Type) (xs : list A),
    EmptyList xs -> is_empty xs = true.
Proof.
  intros A xs H.
  rewrite H.
  reflexivity.
Qed.
```

**Professional rule of thumb:** A validator usually needs both soundness and completeness if it is to stand in for a proposition. A verified algorithm usually needs a specification that captures all intended correctness properties, not merely one convenient fact.

**Common Pitfalls:** A theorem named `correct` is not automatically adequate. Inspect the statement. A weak theorem can certify very little.

### Task: Use `destruct` for Finite Case Analysis

**Core keywords:** `destruct`, case analysis, booleans, options, finite inductives, evidence.

`destruct` splits a goal into cases corresponding to constructors. It is the right tool when no induction hypothesis is needed.

Boolean case analysis:

```coq
Theorem negb_involutive :
  forall b : bool, negb (negb b) = b.
Proof.
  intros b.
  destruct b.
  - reflexivity.
  - reflexivity.
Qed.
```

Option case analysis:

```coq
Theorem option_default_some :
  forall (A : Type) (default x : A),
    option_default default (Some x) = x.
Proof.
  intros A default x.
  reflexivity.
Qed.
```

General option proof:

```coq
Theorem option_default_id :
  forall (A : Type) (default : A) (o : option A),
    o = Some (option_default default o) \/ o = None.
Proof.
  intros A default o.
  destruct o as [x |].
  - left. reflexivity.
  - right. reflexivity.
Qed.
```

| Use `destruct` when                                        | Example                                        | Why                                     |
| ---------------------------------------------------------- | ---------------------------------------------- | --------------------------------------- |
| Data has finite cases and no recursion needed              | `bool`, `option`, finite enum                  | Exhaustive case split                   |
| Evidence has constructor cases                             | `A \/ B`, `exists x, P x`, inductive predicate | Analyze proof evidence                  |
| A contradiction depends on impossible constructor equality | `Some x = None`                                | Combine with `discriminate`/`inversion` |
| A function branches by pattern matching                    | destruct the same scrutinee                    | Align proof with computation            |

**Failure-first explanation:** The tempting mental model is “`destruct` is a universal proof hammer.” The surprising behavior is that recursive properties get stuck because `destruct` gives no induction hypothesis. The correct explanation is that `destruct` only gives cases; `induction` gives cases plus recursive assumptions.

**Common Pitfalls:** Destructing a variable can lose an equation connecting the original variable to its case. If that equation is needed, use techniques such as remembering the term or destructing with an equation, covered later.

### Task: Use `induction` for Recursive Structure

**Core keywords:** `induction`, induction hypothesis, structural proof, recursive functions, theorem shape.

Use `induction` when proving a property over recursively defined data or evidence.

Natural number anchor:

```coq
Theorem add_0_r :
  forall n : nat, n + 0 = n.
Proof.
  intros n.
  induction n as [| n IHn].
  - reflexivity.
  - simpl.
    rewrite IHn.
    reflexivity.
Qed.
```

List anchor:

```coq
Theorem my_map_length :
  forall (A B : Type) (f : A -> B) (xs : list A),
    length (my_map f xs) = length xs.
Proof.
  intros A B f xs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl.
    rewrite IHxs.
    reflexivity.
Qed.
```

Tree anchor:

```coq
Theorem inorder_length_nonnegative :
  forall (A : Type) (t : tree A),
    0 <= length (inorder t).
Proof.
  intros A t.
  induction t as [| l IHl x r IHr].
  - simpl. lia.
  - simpl. lia.
Qed.
```

This example uses `lia` for arithmetic leaves after structural induction supplies subtree hypotheses.

| Induction target  | When appropriate               | Induction hypotheses          | Common theorem anchor         |
| ----------------- | ------------------------------ | ----------------------------- | ----------------------------- |
| `nat`             | recursive arithmetic           | one IH for predecessor        | `n + 0 = n`                   |
| `list A`          | recursive list functions       | one IH for tail               | append identity/associativity |
| `tree A`          | recursive tree functions       | IH for each recursive subtree | traversal invariant           |
| proof evidence    | inductive predicates/relations | IH for sub-derivations        | evaluator soundness           |
| typing derivation | PL metatheory                  | IH for typing premises        | preservation/progress         |

**Interdisciplinary Lens: Inductive Definitions**

| Item                      | Explanation                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| What it clarifies         | Induction follows the constructors and recursive positions of an inductive definition           |
| Language feature involved | `Inductive`, `Fixpoint`, `induction`, induction hypotheses                                      |
| Practical consequence     | The right induction target is usually determined by the definition or derivation being analyzed |
| Limit of the lens         | Some proofs need generalized statements or auxiliary lemmas beyond raw induction                |

**Common Pitfalls:** The induction variable should usually be the structure consumed by the recursive function or the derivation that explains the property. Inducting on the wrong variable often creates goals that look plausible but lack the needed induction hypothesis.

### Task: Preserve Equalities During Case Analysis — `destruct ... eqn:`

**Core keywords:** case equation, `destruct ... eqn:`, remembered expression, proof-state information.

When destructing a complex expression, Rocq may lose the connection between the expression and the branch result unless an equation is recorded.

Example:

```coq
Theorem eqb_zero_cases :
  forall n : nat,
    Nat.eqb n 0 = true \/ Nat.eqb n 0 = false.
Proof.
  intros n.
  destruct (Nat.eqb n 0) eqn:Heq.
  - left. exact Heq.
  - right. exact Heq.
Qed.
```

The `eqn:Heq` records the equation for the branch.

| Form                      | Meaning                                     | Use when                 | Pitfall avoided                          |
| ------------------------- | ------------------------------------------- | ------------------------ | ---------------------------------------- |
| `destruct b.`             | Case split without branch equation          | Simple variables         | Fine when original expression not needed |
| `destruct b eqn:Hb.`      | Case split and remember result              | Boolean tests            | Keeps test result in context             |
| `destruct (f x) eqn:Hfx.` | Split complex expression with equation      | Validators/lookups       | Prevents losing connection to `f x`      |
| `remember t as x eqn:Hx.` | Name complex term before induction/destruct | Complex dependent proofs | Avoids destructive simplification        |

Example with lookup:

```coq
Theorem nth_opt_case :
  forall (A : Type) (n : nat) (xs : list A),
    (exists x, nth_opt n xs = Some x) \/ nth_opt n xs = None.
Proof.
  intros A n xs.
  destruct (nth_opt n xs) eqn:Hnth.
  - left. exists a. exact Hnth.
  - right. exact Hnth.
Qed.
```

**Failure-first explanation:** The tempting mental model is “after I destruct a test, Rocq knows which branch happened.” It does know the branch, but unless an equation is saved, the original expression may not be available in the form needed for rewriting or applying lemmas. The professional rule of thumb is: when destructing a non-variable expression, use `eqn:` unless clearly unnecessary.

**Common Pitfalls:** Failing to preserve an equation is a common cause of stuck proofs about boolean validators, lookups, parsers, and option-returning functions.

### Task: Use `simpl`, `cbn`, and `unfold` Deliberately

**Core keywords:** simplification, reduction, unfolding, definitional equality, proof readability.

Computation tactics reduce definitions. They do not use arbitrary mathematical facts.

| Tactic/command    | What it does                      | Good use                     | Pitfall                             |
| ----------------- | --------------------------------- | ---------------------------- | ----------------------------------- |
| `simpl`           | Simplifies reducible expressions  | Constructor-headed recursion | May unfold too much or too little   |
| `cbn`             | Call-by-name style simplification | Controlled local reduction   | Strategy details matter             |
| `unfold f`        | Replaces `f` by its body          | Reveal definition            | Over-unfolding destroys abstraction |
| `fold f`          | Replaces body by name             | Restore abstraction          | Rare but useful                     |
| `change t with u` | Replace convertible terms         | Shape goal manually          | Requires definitional equality      |
| `reflexivity`     | Solves by conversion              | Reducible equality           | Fails for propositional facts       |

Example:

```coq
Definition double (n : nat) : nat := n + n.

Theorem double_zero :
  double 0 = 0.
Proof.
  unfold double.
  simpl.
  reflexivity.
Qed.
```

Often `reflexivity` alone may suffice because it performs conversion:

```coq
Theorem double_zero_short :
  double 0 = 0.
Proof.
  reflexivity.
Qed.
```

But explicit unfolding can clarify proof intent when a definition is hidden.

**Design tradeoff:**

| Strategy                            | Capability gained               | Cost introduced                          |
| ----------------------------------- | ------------------------------- | ---------------------------------------- |
| Let `reflexivity` handle conversion | Short scripts                   | Less explanatory                         |
| Use `simpl`/`cbn` explicitly        | Shows computation step          | Can become brittle if definitions change |
| Use `unfold` selectively            | Makes hidden definition visible | Breaks abstraction                       |
| Keep definitions opaque             | Stable abstraction              | May block computation                    |

**Common Pitfalls:** Overusing `simpl` can make proof scripts depend on the exact shape of definitions. In library code, rewrite with named lemmas when behavior is part of the public specification.

### Task: Use `rewrite` for Propositional Equality

**Core keywords:** `rewrite`, equality, direction, hypotheses, lemmas, proof state.

Use `rewrite` when the desired transformation follows from an equality proof, not from computation alone.

Example:

```coq
Theorem rewrite_add :
  forall a b c : nat,
    a = b -> a + c = b + c.
Proof.
  intros a b c Hab.
  rewrite Hab.
  reflexivity.
Qed.
```

Reverse direction:

```coq
Theorem rewrite_add_reverse :
  forall a b c : nat,
    b = a -> a + c = b + c.
Proof.
  intros a b c Hba.
  rewrite <- Hba.
  reflexivity.
Qed.
```

Rewriting in hypotheses:

```coq
Theorem rewrite_in_hyp :
  forall a b c : nat,
    a = b -> a = c -> b = c.
Proof.
  intros a b c Hab Hac.
  rewrite Hab in Hac.
  exact Hac.
Qed.
```

| Rewrite pattern   | Use when                        | Example                              | Pitfall                     |
| ----------------- | ------------------------------- | ------------------------------------ | --------------------------- |
| `rewrite H`       | Equality direction matches goal | left-to-right                        | No matching subterm         |
| `rewrite <- H`    | Need reverse direction          | right-to-left                        | Creates worse goal          |
| `rewrite H in H2` | Transform hypothesis            | use known equality inside assumption | Losing original useful form |
| `rewrite !H`      | Repeat rewrite                  | repeated occurrences                 | Can obscure proof           |
| `setoid_rewrite`  | Generalized rewriting           | relations beyond Leibniz equality    | Advanced; can be overused   |

**Failure-first explanation:** The tempting mental model is “rewrite changes anything equal.” The surprising behavior is that `rewrite H` fails if Rocq cannot find a matching subterm in the correct direction and at the correct type. The correct explanation is that rewriting is typed replacement using an equality proof. The professional rule of thumb is: inspect the exact goal shape before rewriting.

**Common Pitfalls:** Rewriting with a theorem too broad or too early can make a goal less aligned with induction hypotheses. Rewriting should simplify the proof structure, not merely change syntax.

### Task: Combine Computation and Rewriting

**Core keywords:** `simpl`, `rewrite`, induction hypothesis, recursive computation.

Most structural proofs combine computation and rewriting. The typical pattern is:

1. introduce variables;
2. induct on recursive structure;
3. simplify recursive definitions;
4. rewrite using induction hypotheses;
5. close by reflexivity or arithmetic.

Example: append identity.

```coq
Theorem app_nil_r_p4 :
  forall (A : Type) (xs : list A),
    xs ++ [] = xs.
Proof.
  intros A xs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl.
    rewrite IHxs.
    reflexivity.
Qed.
```

This proof has the standard shape:

| Step                  | Goal role                          | Why needed                    |
| --------------------- | ---------------------------------- | ----------------------------- |
| `intros A xs`         | Bring variables into context       | Establish arbitrary list      |
| `induction xs`        | Split empty/cons cases             | List is recursive             |
| `reflexivity` in base | Computation solves `[] ++ [] = []` | Definitional equality         |
| `simpl` in step       | Expose recursive call              | Append recurses on first list |
| `rewrite IHxs`        | Use induction hypothesis           | Replace `xs ++ []` by `xs`    |
| `reflexivity`         | Finish by computation              | Both sides now convertible    |

**Common Pitfalls:** If the proof does not simplify after induction, check whether induction was performed on the argument that the function actually recurses over.

### Task: Use `apply` and `exact` for Theorem Composition

**Core keywords:** theorem application, backward reasoning, exact proof term, implication.

`apply` uses a theorem or hypothesis whose conclusion matches the current goal. It replaces the current goal with the premises needed to use that theorem. `exact` solves a goal by providing a term whose type exactly matches the goal.

Example:

```coq
Theorem apply_chain :
  forall A B C : Prop,
    (A -> B) -> (B -> C) -> A -> C.
Proof.
  intros A B C HAB HBC HA.
  apply HBC.
  apply HAB.
  exact HA.
Qed.
```

Proof-state interpretation:

| Tactic      | Goal before | Goal after |
| ----------- | ----------- | ---------- |
| `apply HBC` | `C`         | `B`        |
| `apply HAB` | `B`         | `A`        |
| `exact HA`  | `A`         | solved     |

Direct term:

```coq
Definition apply_chain_term :
  forall A B C : Prop, (A -> B) -> (B -> C) -> A -> C :=
  fun A B C HAB HBC HA => HBC (HAB HA).
```

**Interdisciplinary Lens: Propositions as Types**

| Item                      | Explanation                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------- |
| What it clarifies         | Applying a theorem is applying a function at the proof-term level                   |
| Language feature involved | implication, `apply`, `exact`, proof terms                                          |
| Practical consequence     | Backward proof scripts correspond to forward function composition                   |
| Limit of the lens         | Complex tactics may construct terms less transparently, though still kernel-checked |

**Common Pitfalls:** If `apply H` creates unexpected subgoals, inspect the full type of `H`. It may have implicit arguments, premises, or a conclusion less specific than expected.

### Task: Introduce and Use Logical Structure — `intros`, `split`, `left`, `right`, `exists`

**Core keywords:** implication, conjunction, disjunction, existential, constructive evidence.

Logical connectives guide tactic choice.

| Goal shape                 | Tactic                         | Why                         | Example           |
| -------------------------- | ------------------------------ | --------------------------- | ----------------- |
| `forall x, P x`            | `intros x`                     | Prove for arbitrary `x`     | universal theorem |
| `A -> B`                   | `intros HA`                    | Assume `A`, prove `B`       | implication       |
| `A /\ B`                   | `split`                        | Need both proofs            | conjunction       |
| `A \/ B`                   | `left` or `right`              | Choose one side             | disjunction       |
| `exists x, P x`            | `exists witness`               | Provide witness             | existential       |
| `False` from contradiction | `exfalso` or use contradiction | Shift goal to contradiction | negation proofs   |

Example conjunction:

```coq
Theorem and_comm_p4 :
  forall A B : Prop, A /\ B -> B /\ A.
Proof.
  intros A B HAB.
  destruct HAB as [HA HB].
  split.
  - exact HB.
  - exact HA.
Qed.
```

Example disjunction:

```coq
Theorem or_comm_p4 :
  forall A B : Prop, A \/ B -> B \/ A.
Proof.
  intros A B HAB.
  destruct HAB as [HA | HB].
  - right. exact HA.
  - left. exact HB.
Qed.
```

Example existential:

```coq
Theorem exists_zero :
  exists n : nat, n + 0 = n.
Proof.
  exists 0.
  reflexivity.
Qed.
```

**Failure-first explanation:** The tempting mental model is “prove existence by arguing something must exist.” Constructively, a proof of `exists x, P x` normally contains a specific witness. The correct tactic is usually `exists witness`, followed by proof of the property for that witness.

**Common Pitfalls:** Choosing `left` or `right` too early can commit the proof to a side that is not provable from the context. Read available evidence first.

### Task: Handle Contradictions — `False`, negation, `discriminate`, `inversion`

**Core keywords:** `False`, negation, contradiction, impossible constructors, `discriminate`, `inversion`.

Negation `~ A` is defined as `A -> False`. To prove a negation, assume the proposition and derive contradiction.

Example:

```coq
Theorem true_not_false :
  true <> false.
Proof.
  unfold not.
  intros H.
  discriminate H.
Qed.
```

Equivalent shorter proof:

```coq
Theorem zero_not_succ :
  forall n : nat, 0 <> S n.
Proof.
  intros n H.
  discriminate H.
Qed.
```

Using contradiction from impossible option equality:

```coq
Theorem some_not_none :
  forall (A : Type) (x : A), Some x <> None.
Proof.
  intros A x H.
  discriminate H.
Qed.
```

| Tactic          | Use when                                           | Example                            | Pitfall                                   |
| --------------- | -------------------------------------------------- | ---------------------------------- | ----------------------------------------- |
| `discriminate`  | Equality between distinct constructors             | `Some x = None`                    | Does not solve arbitrary false statements |
| `inversion`     | Analyze constructor equality or inductive evidence | impossible typing/evaluation cases | Can clutter context                       |
| `exfalso`       | Change goal to `False`                             | prove contradiction first          | Overused when direct proof is clearer     |
| `contradiction` | Context contains contradictory assumptions         | `H : P`, `HN : ~ P`                | May be too magical                        |
| `unfold not`    | Reveal `~ P` as `P -> False`                       | negation proofs                    | Sometimes unnecessary                     |

**Common Pitfalls:** `discriminate` works on impossible constructor equalities, not on any proposition that “seems contradictory.” If the contradiction is logical rather than constructor-based, use the relevant hypotheses.

### Task: Use `inversion` for Constructor Evidence

**Core keywords:** `inversion`, injectivity, disjointness, inductive evidence, dependent cases.

`inversion` analyzes how an inductive hypothesis could have been constructed. It is especially useful for impossible cases or extracting equalities from constructors.

Example with `Even`:

```coq
Inductive Even : nat -> Prop :=
| Even0 : Even 0
| EvenSS : forall n : nat, Even n -> Even (S (S n)).
```

Proving `Even 1 -> False`:

```coq
Theorem not_even_1 :
  Even 1 -> False.
Proof.
  intros H.
  inversion H.
Qed.
```

Rocq sees that there is no constructor of `Even` that can produce evidence for `Even 1`.

Example with option injectivity:

```coq
Theorem some_injective :
  forall (A : Type) (x y : A),
    Some x = Some y -> x = y.
Proof.
  intros A x y H.
  inversion H.
  reflexivity.
Qed.
```

| Use `inversion` when             | Why it helps                        | Common cost                  |
| -------------------------------- | ----------------------------------- | ---------------------------- |
| Impossible constructor equality  | Detects disjoint constructors       | May generate verbose context |
| Constructor injectivity          | Extracts equality of fields         | Context clutter              |
| Impossible inductive evidence    | No constructor can produce evidence | Proof may become brittle     |
| Typing/evaluation relation cases | Recovers premises of derivation     | Many generated names         |

**Professional rule of thumb:** Use `inversion` when the shape of evidence matters. For large proofs, consider naming cases carefully or using more structured inversion patterns to avoid unreadable contexts.

**Common Pitfalls:** Overusing `inversion` can make scripts fragile because generated names and equalities may change when definitions change.

### Task: Decide Between Direct Proof Term and Tactic Script

**Core keywords:** proof term, tactic script, maintainability, readability.

Some proofs are clearer as direct terms; others are clearer as tactic scripts.

Direct proof term:

```coq
Definition id_proof : forall A : Prop, A -> A :=
  fun A HA => HA.
```

Tactic proof:

```coq
Theorem id_proof_tactic :
  forall A : Prop, A -> A.
Proof.
  intros A HA.
  exact HA.
Qed.
```

| Proof style             | Best use                                      | Strength                         | Cost                            |
| ----------------------- | --------------------------------------------- | -------------------------------- | ------------------------------- |
| Direct proof term       | Small logical/computational terms             | Transparent and compact          | Hard to read for complex proofs |
| Tactic script           | Interactive structured proof                  | Mirrors proof development        | Can become procedural noise     |
| Mixed style             | Use `refine`, `exact`, small terms in tactics | Good for dependent constructions | Requires type insight           |
| Automation-heavy script | Routine goals                                 | Short                            | Opaque and brittle              |

**Design meaning:** Tactic scripts are not semantically privileged. They build proof terms. Direct proof terms expose the Curry–Howard structure; tactic scripts expose the human proof-development process.

**Common Pitfalls:** A very short direct proof term may be less maintainable than a slightly longer tactic proof if the theorem is conceptually complex. Readability matters.

### Task: Structure Multi-Case Proofs — bullets, braces, naming branches

**Core keywords:** bullets, subgoals, proof structure, maintainability.

Bullets organize subgoals and prevent accidental proof drift.

```coq
Theorem bool_cases :
  forall b : bool, b = true \/ b = false.
Proof.
  intros b.
  destruct b.
  - left. reflexivity.
  - right. reflexivity.
Qed.
```

Nested bullets:

```coq
Theorem option_bool_cases :
  forall o : option bool,
    o = None \/ exists b, o = Some b.
Proof.
  intros o.
  destruct o as [b |].
  - right.
    exists b.
    reflexivity.
  - left.
    reflexivity.
Qed.
```

| Structure tool        | Use                        | Benefit                      | Pitfall                        |
| --------------------- | -------------------------- | ---------------------------- | ------------------------------ |
| Bullets `-`, `+`, `*` | Separate subgoals          | Maintains proof organization | Bullet mismatch                |
| `as [...]` pattern    | Name destructed components | Readable contexts            | Bad names obscure proof        |
| Braces `{ ... }`      | Delimit proof blocks       | Useful nested organization   | Can be visually heavy          |
| Comments              | Explain proof idea         | Helps maintenance            | Do not narrate trivial tactics |

**Professional rule of thumb:** Every nontrivial proof should make its subgoal structure visible. A proof that works but leaves subgoal flow implicit is harder to maintain.

**Common Pitfalls:** Avoid relying on Rocq’s auto-generated names in serious proofs. Name important hypotheses and induction hypotheses explicitly.

### Task: Recognize When a Proof Needs a Helper Lemma — proof decomposition, reuse, stability

**Core keywords:** helper lemma, proof decomposition, theorem strengthening, reuse, maintainability.

A helper lemma is not merely a convenience. In Rocq, it is often the correct abstraction boundary for a proof. If a theorem fails because the induction hypothesis is too weak, the rewrite target is hidden, or the goal contains an accumulator/context, the right move is usually to state a stronger or more general lemma.

| Symptom                                    | Likely cause                  | Helper lemma pattern           | Example                   |
| ------------------------------------------ | ----------------------------- | ------------------------------ | ------------------------- |
| Induction hypothesis does not match goal   | The theorem is too specific   | Generalize over extra variable | accumulator correctness   |
| Rewriting repeatedly by same fact          | Missing named rewrite lemma   | State equation as lemma        | append identity           |
| Proof depends on internal definition shape | Behavior not abstracted       | State public behavior theorem  | function correctness      |
| Automation solves goal opaquely            | Repeated proof pattern hidden | Name the routine fact          | arithmetic/list invariant |
| Direct proof becomes long and nested       | Multiple concepts mixed       | Split into semantic lemmas     | evaluator soundness       |

Classic example: accumulator reverse.

```coq
From Stdlib Require Import List.
Import ListNotations.

Fixpoint rev_acc {A : Type} (xs acc : list A) : list A :=
  match xs with
  | [] => acc
  | x :: xs' => rev_acc xs' (x :: acc)
  end.
```

The tempting theorem is:

```coq
Theorem rev_acc_nil_goal :
  forall (A : Type) (xs : list A),
    rev_acc xs [] = rev xs.
```

This theorem is true, but it is not the easiest induction target. The stronger helper is:

```coq
Theorem rev_acc_correct :
  forall (A : Type) (xs acc : list A),
    rev_acc xs acc = rev xs ++ acc.
Proof.
  intros A xs.
  induction xs as [| x xs IHxs].
  - intros acc.
    reflexivity.
  - intros acc.
    simpl.
    rewrite IHxs.
    rewrite app_assoc.
    reflexivity.
Qed.
```

Then the original theorem follows:

```coq
Theorem rev_acc_nil :
  forall (A : Type) (xs : list A),
    rev_acc xs [] = rev xs.
Proof.
  intros A xs.
  rewrite rev_acc_correct.
  rewrite app_nil_r.
  reflexivity.
Qed.
```

**Anchor explanation:**

| Anchor item                  | Explanation                                                              |
| ---------------------------- | ------------------------------------------------------------------------ |
| Mathematical statement       | Accumulator reverse equals ordinary reverse followed by the accumulator  |
| Relevant induction principle | Induction on `xs`, the structurally consumed list                        |
| Key lemma needed             | `app_assoc`, and later `app_nil_r`                                       |
| Proof strategy               | Prove stronger theorem over arbitrary accumulator                        |
| Common beginner mistake      | Prove only the `[]` accumulator case and get a weak induction hypothesis |
| Practical lesson             | Strengthen theorem statements to match recursive structure               |

**Failure-first explanation:** The tempting mental model is “a helper lemma is extra work.” The surprising behavior is that without it, the main theorem may become almost impossible. The correct explanation is that the helper lemma exposes the invariant preserved by recursion. The professional rule of thumb is: when a proof resists induction, look for the stronger invariant.

**Common Pitfalls:** Do not hide key invariants inside a one-off proof script. If the invariant explains why the function is correct, name it as a lemma.

### Task: Generalize Before Induction — quantifier order, `generalize dependent`, weak induction hypotheses

**Core keywords:** generalization, quantifier order, induction hypothesis, `generalize dependent`, theorem shape.

Induction hypotheses are generated from the goal at the moment induction is invoked. If variables have already been introduced and fixed, the induction hypothesis may be too specific.

A simplified pattern:

```coq
Theorem plus_n_m_0_style :
  forall n m : nat,
    n = m -> n + 0 = m.
Proof.
  intros n m H.
  rewrite H.
  induction m as [| m IHm].
  - reflexivity.
  - simpl. rewrite IHm. reflexivity.
Qed.
```

This works, but more complex dependent proofs often fail when too many variables are introduced before induction. The general pattern is:

| Situation                            | Risk                                 | Better tactic pattern                         |
| ------------------------------------ | ------------------------------------ | --------------------------------------------- |
| Variable depends on induction target | Introduced variable becomes fixed    | Delay `intros` or use `generalize dependent`  |
| Equality relates two variables       | Induction loses relation shape       | Preserve equality with `generalize dependent` |
| Accumulator changes recursively      | IH only for fixed accumulator        | Quantify over arbitrary accumulator           |
| Indexed type depends on value        | Case split loses index information   | Use dependent induction/inversion carefully   |
| Function recurses on first argument  | Induction on second argument useless | Induct on recursive argument                  |

Illustrative theorem:

```coq
Theorem app_assoc_general :
  forall (A : Type) (xs ys zs : list A),
    (xs ++ ys) ++ zs = xs ++ (ys ++ zs).
Proof.
  intros A xs.
  induction xs as [| x xs IHxs].
  - intros ys zs. reflexivity.
  - intros ys zs.
    simpl.
    rewrite IHxs.
    reflexivity.
Qed.
```

Notice that `ys` and `zs` are introduced after induction on `xs`. In this simple theorem, introducing all variables first also works. In harder theorems, delaying introductions preserves generality.

**Failure-first explanation:** The tempting mental model is “always start with `intros` for everything.” The surprising behavior is that induction hypotheses can become too weak. The correct explanation is that `intros` fixes variables in the context, while induction generalizes only what remains in the goal. The professional rule of thumb is: introduce only what is needed before induction; leave variables general when the induction hypothesis must range over them.

**Common Pitfalls:** `generalize dependent` is not magic. It repairs a theorem/proof-state shape by moving a variable back into the goal before induction. If the underlying theorem is too weak, no tactic can fully compensate.

### Task: Choose the Right Induction Object — data induction versus evidence induction

**Core keywords:** induction target, structural induction, derivation induction, evidence induction, relations.

In Rocq, the right induction target is often not the most visible variable. It is the object whose constructors explain the proof.

| Proof goal                             | Best induction target                                              | Why                             | Common mistake                    |
| -------------------------------------- | ------------------------------------------------------------------ | ------------------------------- | --------------------------------- |
| Property of recursive function on list | The list argument consumed by function                             | Matches computation             | Inducting on another list         |
| Property of tree traversal             | The tree                                                           | Gives IHs for subtrees          | Trying arithmetic first           |
| Soundness of big-step relation         | Evaluation derivation                                              | Follows semantic rule structure | Inducting on expression alone     |
| Preservation theorem                   | Typing derivation or evaluation derivation, depending on statement | Follows rule premises           | Choosing syntax induction blindly |
| Inversion of evidence                  | Evidence object                                                    | Cases are proof constructors    | Destructing raw data instead      |
| Decidability over finite type          | The finite values                                                  | Exhaustive cases                | Overusing induction               |

Example relation:

```coq
Inductive leq : nat -> nat -> Prop :=
| Leq0 : forall n, leq 0 n
| LeqSS : forall n m, leq n m -> leq (S n) (S m).
```

A proof by evidence induction:

```coq
Theorem leq_refl :
  forall n : nat, leq n n.
Proof.
  induction n as [| n IHn].
  - apply Leq0.
  - apply LeqSS. exact IHn.
Qed.
```

A theorem using derivation induction:

```coq
Theorem leq_zero_left :
  forall n m : nat, leq n m -> n = 0 -> leq 0 m.
Proof.
  intros n m H Hn.
  rewrite Hn.
  apply Leq0.
Qed.
```

For more semantic relations, induction on the derivation is often central:

```coq
Theorem leq_trans :
  forall a b c : nat, leq a b -> leq b c -> leq a c.
Proof.
  intros a b c Hab Hbc.
  generalize dependent a.
  induction Hbc as [| b c Hbc IHbc].
  - intros a Hab.
    inversion Hab.
    apply Leq0.
  - intros a Hab.
    inversion Hab as [| a' b' Hab']; subst.
    + apply Leq0.
    + apply LeqSS. apply IHbc. exact Hab'.
Qed.
```

This example is intentionally more complex: it shows that relational proofs often need careful generalization and inversion.

**Design meaning:** Induction is not a generic ritual. It is an invocation of a specific induction principle derived from an inductive definition. The selected object determines the hypotheses available.

**Common Pitfalls:** For operational semantics, beginners often induct on syntax when the proof should induct on an evaluation or typing derivation. The proof then loses rule-premise structure.

### Task: Use Calculation-Style Proofs — equational reasoning, readability, rewrite order

**Core keywords:** equational reasoning, rewriting, calculation style, readability, transitivity.

Many Rocq proofs are chains of equalities. A calculation-style proof makes each step explicit. Rocq does not require a special syntax for this; ordinary `rewrite`, `transitivity`, and helper lemmas can express the chain.

Example:

```coq
Theorem app_nil_r_calc :
  forall (A : Type) (xs : list A),
    xs ++ [] = xs.
Proof.
  intros A xs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl.
    rewrite IHxs.
    reflexivity.
Qed.
```

For a slightly more explicit calculation, one can use `transitivity`:

```coq
Theorem add_0_r_calc :
  forall n : nat, n + 0 = n.
Proof.
  intros n.
  induction n as [| n IHn].
  - reflexivity.
  - simpl.
    transitivity (S n).
    + rewrite IHn. reflexivity.
    + reflexivity.
Qed.
```

This is longer than necessary, but it illustrates the intermediate expression.

| Proof style                 | Use when                          | Benefit                 | Cost                        |
| --------------------------- | --------------------------------- | ----------------------- | --------------------------- |
| Direct `rewrite` chain      | Steps are obvious                 | Compact                 | May hide intermediate state |
| `transitivity`              | Important intermediate expression | Clear calculation       | More verbose                |
| Named helper lemmas         | Reusable equation                 | Stable abstraction      | Requires lemma management   |
| Automation rewrite database | Many routine rewrites             | Efficient normalization | Can obscure proof           |
| `ring`/arithmetic tactics   | Algebraic normalization           | Solves algebraic goals  | May hide theorem structure  |

**Professional rule of thumb:** Use calculation-style proof when the equality chain is the conceptual content. Use automation only when the algebra is routine and the theorem statement already explains the idea.

**Common Pitfalls:** Long rewrite chains without intermediate comments become brittle. If a rewrite sequence expresses a reusable algebraic pattern, state it as a lemma.

### Task: Control Unfolding and Abstraction — public behavior versus private definition

**Core keywords:** abstraction, `unfold`, opacity, public theorem, implementation hiding.

Unfolding a definition is often convenient in proofs, but it couples the proof to the implementation. Public proofs should usually rely on public behavior lemmas rather than private bodies.

Example function:

```coq
Definition empty_or_singleton {A : Type} (xs : list A) : bool :=
  match xs with
  | [] => true
  | [_] => true
  | _ => false
  end.
```

A proof by unfolding:

```coq
Theorem empty_or_singleton_nil :
  forall A : Type,
    empty_or_singleton (@nil A) = true.
Proof.
  intros A.
  unfold empty_or_singleton.
  reflexivity.
Qed.
```

This is fine for a local fact. But if many client proofs unfold `empty_or_singleton`, changing its implementation may break them. Better public API design states behavioral lemmas:

```coq
Theorem empty_or_singleton_cons_cons :
  forall (A : Type) (x y : A) (xs : list A),
    empty_or_singleton (x :: y :: xs) = false.
Proof.
  intros A x y xs.
  reflexivity.
Qed.
```

| Proof approach             | Coupling               | When acceptable                                | Risk                   |
| -------------------------- | ---------------------- | ---------------------------------------------- | ---------------------- |
| `unfold` implementation    | High                   | Local proof, simple definition                 | Breaks if body changes |
| Rewrite by public lemma    | Low                    | Library/client proof                           | Requires lemma design  |
| Keep theorem opaque        | Low                    | Theorem not computationally relevant           | May block unfolding    |
| Use transparent definition | High but computational | Certified data/function needed for computation | Conversion cost        |

**Failure-first explanation:** The tempting mental model is “unfolding always makes proofs easier.” The surprising maintenance failure is that later implementation changes break many proofs. The correct explanation is that unfolding exposes private representation. The professional rule of thumb is: unfold locally; export behavior lemmas publicly.

**Common Pitfalls:** If a proof imports a module and immediately unfolds its internal definitions, the abstraction boundary has effectively been broken.

### Task: Design Reusable Abstractions — functions, records, modules, typeclasses

**Core keywords:** abstraction mechanisms, reusable theory, functions, records, modules, typeclasses, canonical structures.

Rocq provides several abstraction mechanisms. They differ in explicitness, inference behavior, and proof-engineering cost.

| Abstraction mechanism | Best use                                      | Strength                                  | Cost                   | Failure mode                                                |
| --------------------- | --------------------------------------------- | ----------------------------------------- | ---------------------- | ----------------------------------------------------------- |
| Function              | Simple parameterized behavior                 | Direct computation                        | Limited structure      | Overusing higher-order functions for law-heavy abstractions |
| Record                | Bundle operations/data/proofs                 | Clear structure                           | Projection boilerplate | Large records become unwieldy                               |
| Module                | Namespace and abstraction boundary            | Large libraries and representation hiding | Verbose                | Harder interactive use                                      |
| Functor               | Parameterized module                          | Reusable theory over implementations      | Heavy syntax           | Overengineering small theories                              |
| Typeclass             | Inferred structures and overloaded operations | Ergonomic generic code                    | Search opacity         | Unexpected instance selection                               |
| Canonical structure   | Library-specific inference hierarchy          | Powerful mathematical reuse               | Steep learning curve   | Debugging inference hard                                    |
| Tactic abstraction    | Reusable proof scripts                        | Reduces repetition                        | Can hide proof intent  | Brittle automation                                          |

Example record abstraction:

```coq
Record EqbSpec (A : Type) : Type := {
  eqb_fun : A -> A -> bool;
  eqb_sound : forall x y, eqb_fun x y = true -> x = y;
  eqb_complete : forall x y, x = y -> eqb_fun x y = true
}.
```

Using this record, generic code can require not just an equality function, but a certified equality function.

```coq
Definition eqb_refl_from_spec
  {A : Type} (E : EqbSpec A) : Prop :=
  forall x : A, eqb_fun A E x x = true.
```

The exact projection syntax may be made lighter with implicit arguments, but the design point is: abstraction can bundle behavior with laws.

**Design tradeoff:**

| Problem solved           | Capability gained   | Cost introduced   | Programs that benefit               |
| ------------------------ | ------------------- | ----------------- | ----------------------------------- |
| Repeated parameters      | Bundled structure   | Projection syntax | Algebraic libraries                 |
| Repeated law assumptions | Certified interface | Proof obligations | Verified algorithms                 |
| Boilerplate passing      | Typeclass inference | Debugging search  | Generic notation-heavy developments |
| Representation exposure  | Modules             | Verbosity         | Large libraries                     |
| Repeated proof scripts   | Tactics             | Opaque behavior   | Stable repetitive proof domains     |

**Common Pitfalls:** Do not jump to typeclasses for every abstraction. If a record passed explicitly is clear and sufficient, it may be more maintainable.

### Task: Choose Functions versus Relations for Abstraction

**Core keywords:** function abstraction, relation abstraction, semantics, nondeterminism, executability.

PART 3 introduced function-versus-relation modeling. In PART 4, the behavioral question is how this affects abstraction and composition.

| Choice             | Composition style          | Best theorem shape      | Benefit                      | Cost                                                  |
| ------------------ | -------------------------- | ----------------------- | ---------------------------- | ----------------------------------------------------- |
| Function           | `f (g x)`                  | pointwise equality      | Executable and simple        | Less expressive for partial/nondeterministic behavior |
| Boolean function   | `p x && q x`               | soundness/completeness  | Computable predicates        | Bridge lemmas needed                                  |
| Relation           | `exists y, R x y /\ S y z` | relational composition  | Semantic flexibility         | More evidence handling                                |
| Inductive relation | constructors as rules      | induction on derivation | Rule-based proof             | Longer scripts                                        |
| Certified function | function plus theorem      | correctness/refinement  | Executable verified artifact | Spec management                                       |

Example relational composition:

```coq
Definition rel_comp {A B C : Type}
  (R : A -> B -> Prop) (S : B -> C -> Prop) : A -> C -> Prop :=
  fun a c => exists b, R a b /\ S b c.
```

This is useful in semantics and refinement proofs. It is not directly executable, but it precisely states the existence of an intermediate state.

**Professional rule of thumb:** Use functions when computation is central. Use relations when proof structure, partiality, nondeterminism, or semantic rules are central. Use both when an implementation must be proved correct relative to a flexible specification.

**Common Pitfalls:** A relation can make simple executable behavior cumbersome. A function can make semantic edge cases invisible. Choose based on the proof and execution needs, not on habit.

### Task: Build Public APIs Around Theorems — behavior-first interface design

**Core keywords:** API design, public theorem, specification, abstraction boundary, clients.

A Rocq API is not only a set of functions. It is a set of definitions plus theorems that clients are expected to use. A well-designed API exposes behavior lemmas at the right granularity.

| API element         | Purpose                          | Example                          | Professional criterion              |
| ------------------- | -------------------------------- | -------------------------------- | ----------------------------------- |
| Definition          | Provides computation/object      | `sort`, `lookup`, `eval`         | Has clear type and intended use     |
| Specification       | States desired behavior          | `sorted`, `Permutation`, `evalR` | Captures correctness adequately     |
| Correctness theorem | Connects implementation and spec | `sort_correct`                   | Strong enough for clients           |
| Rewrite lemma       | Enables local reasoning          | `lookup_update_eq`               | Stable and reusable                 |
| Inversion lemma     | Helps analyze evidence           | `eval_value_inv`                 | Avoids repeated `inversion` clutter |
| Automation hint     | Solves routine obligations       | hint database                    | Stable and scoped                   |
| Opaque boundary     | Hides implementation             | module sealing/`Qed`             | Prevents proof coupling             |

Example API pattern for lookup/update maps, abstractly:

```coq
Parameter map : Type -> Type -> Type.
Parameter lookup : forall {K V : Type}, K -> map K V -> option V.
Parameter update : forall {K V : Type}, K -> V -> map K V -> map K V.

Parameter lookup_update_eq :
  forall (K V : Type) (k : K) (v : V) (m : map K V),
    lookup k (update k v m) = Some v.
```

This is not a complete trustworthy map API because key equality and assumptions are missing. It is a source-reading illustration: clients should reason through public lemmas, not representation details.

**Failure-first explanation:** The tempting mental model is “export the function; users can unfold it.” The professional model is “export the behavior needed by users.” The surprising maintenance failure is that client proofs break when implementation changes. The correct explanation is that unfolding couples clients to representation. The rule of thumb is: public functions need public theorems.

**Common Pitfalls:** Do not name every theorem `correct`. Use names that expose the behavior: `lookup_update_eq`, `lookup_update_neq`, `map_length`, `filter_sound`.

### Task: Use Automation Deliberately — `auto`, `eauto`, `lia`, domain tactics

**Core keywords:** automation, proof search, `auto`, `eauto`, `lia`, opacity, maintainability.

Automation is essential in large Rocq developments, but it should be bounded. The kernel still checks generated proof terms, so the primary danger is usually not unsoundness; it is loss of readability, brittleness, performance cost, and accidental dependency on hints/imports.

| Automation     | Good use                                    | Bad use                               | Hidden cost                        |
| -------------- | ------------------------------------------- | ------------------------------------- | ---------------------------------- |
| `auto`         | Simple propositional goals and known lemmas | Central theorem reasoning             | Depends on hint database           |
| `eauto`        | Existentially instantiated routine goals    | Large open-ended search               | Slow/unpredictable search          |
| `lia`          | Linear arithmetic over naturals/integers    | Nonlinear algebra, structural proofs  | May hide arithmetic assumptions    |
| `ring`         | Ring-normalizable algebra                   | Non-ring structures                   | Requires correct algebraic setting |
| `congruence`   | Equality contradictions and congruence      | Semantic reasoning                    | Can obscure contradiction source   |
| `firstorder`   | First-order logic fragments                 | Constructive content-sensitive proofs | May be too broad                   |
| Custom tactics | Repeated stable patterns                    | One-off proof hacks                   | Maintenance burden                 |

Example where automation is appropriate:

```coq
From Stdlib Require Import Lia.

Theorem add_nonnegative :
  forall n m : nat, 0 <= n + m.
Proof.
  intros n m.
  lia.
Qed.
```

Example where automation should not replace the proof idea:

```coq
Theorem app_assoc_explicit :
  forall (A : Type) (xs ys zs : list A),
    (xs ++ ys) ++ zs = xs ++ (ys ++ zs).
Proof.
  intros A xs ys zs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl. rewrite IHxs. reflexivity.
Qed.
```

This proof is short and reveals the structure. Replacing it with a custom tactic would reduce pedagogical and review value.

**Automation boundary rule:**

| Proof part                        | Prefer explicit proof       | Prefer automation           |
| --------------------------------- | --------------------------- | --------------------------- |
| Main induction choice             | Yes                         | No                          |
| Key invariant                     | Yes                         | No                          |
| Routine arithmetic side condition | No                          | Yes, e.g. `lia`             |
| Repeated constructor cleanup      | Sometimes                   | Yes if stable               |
| Library theorem search            | Usually explicit once found | `auto` only for routine use |
| Final trivial propositional goal  | Not necessary               | Yes                         |

**Common Pitfalls:** If removing an import breaks an `auto` proof, the script depends on a hidden hint. For robust code, either name the lemma explicitly or scope the automation carefully.

### Task: Create Small Custom Tactics Without Hiding the Proof

**Core keywords:** custom tactics, Ltac, proof macros, repeated patterns, maintainability.

Custom tactics can eliminate repetitive proof boilerplate. But they are also a source of opacity. A custom tactic should encode a stable, boring pattern, not the central mathematical idea.

Simple Ltac pattern:

```coq
Ltac crush_bool :=
  repeat match goal with
  | b : bool |- _ => destruct b; simpl in *
  end; try reflexivity; try discriminate.
```

Example use:

```coq
Theorem negb_cases_auto :
  forall b : bool, negb (negb b) = b.
Proof.
  intros b.
  crush_bool.
Qed.
```

This tactic is acceptable for repetitive boolean case analysis in a local context, but it would be poor if it hid a central theorem’s proof strategy.

| Custom tactic should                      | Custom tactic should not                  |
| ----------------------------------------- | ----------------------------------------- |
| Encode stable repetitive cleanup          | Hide the main induction argument          |
| Be locally scoped when possible           | Depend on fragile generated names         |
| Have a descriptive name                   | Be a mysterious `solve_this`              |
| Be tested across representative goals     | Search unpredictably across huge contexts |
| Leave understandable subgoals if it fails | Fail with no diagnostic value             |

**Design meaning:** Tactic abstraction is metaprogramming over proof states. It improves productivity but creates another layer of code that must be maintained.

**Common Pitfalls:** A proof script that is only `my_tactic.` may be compact but unreviewable. In serious developments, the high-level theorem should still reveal its induction target and proof structure.

### Task: Avoid Fragile Proof Scripts — generated names, goal shape dependence, over-simplification

**Core keywords:** brittle proofs, generated names, proof maintenance, refactoring.

Proof scripts can break when definitions, imports, notation, or generated hypothesis names change. Robust scripts minimize unnecessary dependence on incidental proof-state details.

| Fragile pattern                            | Why fragile                             | Better pattern                               |
| ------------------------------------------ | --------------------------------------- | -------------------------------------------- |
| Relying on auto-generated names `H0`, `H1` | Names change after small edits          | Use `as` patterns                            |
| Repeated blind `simpl`                     | Definition changes alter simplification | Use named lemmas or `cbn` selectively        |
| Broad `rewrite ... in *`                   | Changes unrelated hypotheses            | Rewrite targeted goals/hypotheses            |
| Heavy `auto` without lemma names           | Depends on hint/import context          | Apply key lemmas explicitly                  |
| Long proof with no helper lemmas           | No abstraction boundary                 | State intermediate facts                     |
| `inversion` everywhere                     | Generates clutter and unstable names    | Use inversion lemmas or structured destructs |
| Unfolding public definitions               | Breaks abstraction                      | Rewrite with public behavior lemmas          |

Example of better naming:

```coq
Theorem and_assoc :
  forall A B C : Prop,
    A /\ (B /\ C) -> (A /\ B) /\ C.
Proof.
  intros A B C H.
  destruct H as [HA [HB HC]].
  split.
  - split.
    + exact HA.
    + exact HB.
  - exact HC.
Qed.
```

This is clearer than destructing into auto-generated names.

**Failure-first explanation:** The tempting mental model is “a proof that compiles is done.” The professional view is stricter: a proof should survive reasonable refactoring. If a proof depends on generated names, broad simplification, or hidden automation, it may be correct but fragile.

**Common Pitfalls:** The shortest proof is not always the best proof. A slightly longer proof with explicit structure is often more maintainable.

### Task: Use `assert`, `pose proof`, and `specialize` for Local Proof Engineering

**Core keywords:** local facts, `assert`, `pose proof`, `specialize`, intermediate claims.

Sometimes a proof needs a local intermediate fact that is not worth making global. Rocq provides tactics to introduce such facts.

| Tactic                   | Meaning                                   | Use when                                 | Pitfall                            |
| ------------------------ | ----------------------------------------- | ---------------------------------------- | ---------------------------------- |
| `assert (H : P).`        | Create subgoal to prove `P`, then use `H` | Local intermediate lemma                 | Overusing instead of global helper |
| `pose proof H as H'`     | Add a copy/instance of theorem/hypothesis | Preserve original or instantiate theorem | Context clutter                    |
| `specialize (H x y)`     | Instantiate a quantified hypothesis       | Use theorem at specific arguments        | Consumes/generates unexpected form |
| `enough P as H.`         | State sufficient intermediate fact        | Goal easier from `P`                     | Can obscure direction              |
| `have` / ssreflect style | Structured local fact                     | In ssreflect developments                | Style-specific                     |

Example:

```coq
Theorem local_assert_demo :
  forall n : nat, n = n /\ n + 0 = n.
Proof.
  intros n.
  assert (Hplus : n + 0 = n).
  {
    induction n as [| n IHn].
    - reflexivity.
    - simpl. rewrite IHn. reflexivity.
  }
  split.
  - reflexivity.
  - exact Hplus.
Qed.
```

This is illustrative. In real code, `n + 0 = n` is reusable and should usually be a global lemma or imported theorem.

**Professional rule of thumb:** Use `assert` for proof-local facts. Promote a fact to a named lemma if it recurs, explains a concept, or stabilizes a public proof.

**Common Pitfalls:** Too many local assertions can make a proof harder to read than separate lemmas. If a local assertion has a meaningful name and general statement, it may deserve to be global.

### Task: Use Existentials and Witnesses Professionally

**Core keywords:** existential, witness, constructive proof, specification.

Existential goals require witnesses. In verified programming, existential specifications often express “there exists an output satisfying a property” or “there exists an intermediate state.”

Example:

```coq
Theorem exists_append_decomposition :
  forall (A : Type) (xs : list A),
    exists ys : list A, xs ++ ys = xs.
Proof.
  intros A xs.
  exists [].
  rewrite app_nil_r.
  reflexivity.
Qed.
```

Existential in relation composition:

```coq
Definition reaches_in_two {A : Type} (step : A -> A -> Prop) (x z : A) : Prop :=
  exists y : A, step x y /\ step y z.
```

Proofs using existentials usually destruct them:

```coq
Theorem exists_use_demo :
  forall A (P Q : A -> Prop),
    (exists x, P x /\ Q x) -> exists x, P x.
Proof.
  intros A P Q H.
  destruct H as [x [HP HQ]].
  exists x.
  exact HP.
Qed.
```

| Existential pattern    | Proof construction                      | Proof use                            |
| ---------------------- | --------------------------------------- | ------------------------------------ |
| `exists x, P x`        | `exists witness` then prove `P witness` | `destruct H as [x HP]`               |
| `exists x, P x /\ Q x` | provide witness and split               | destruct into witness and components |
| relation composition   | provide intermediate state              | destruct to recover intermediate     |
| certified output       | provide value and correctness proof     | extract value/proof components       |

**Common Pitfalls:** A nonconstructive argument that “some witness must exist” is not enough in constructive Rocq unless a classical principle or decidability theorem supplies it. Usually, the proof must exhibit the witness.

### Task: Structure Proofs Around Inversion Lemmas

**Core keywords:** inversion lemma, evidence analysis, proof reuse, relation reasoning.

When the same `inversion` pattern appears repeatedly, state an inversion lemma.

Example for `Even`:

```coq
Theorem even_succ_succ_inv :
  forall n : nat, Even (S (S n)) -> Even n.
Proof.
  intros n H.
  inversion H as [| n' Hn Heq].
  exact Hn.
Qed.
```

The exact generated names from `inversion` may differ, so in a real proof one may refine the script carefully. The point is to avoid repeating the evidence analysis everywhere.

| Repeated pattern                       | Better abstraction          | Benefit                 |
| -------------------------------------- | --------------------------- | ----------------------- |
| `inversion H` on typing derivation     | canonical forms lemma       | Cleaner progress proof  |
| `inversion H` on evaluation derivation | determinism/inversion lemma | Reduces context clutter |
| `inversion H` on equality constructors | injectivity lemma           | Stable rewriting        |
| `destruct H as ...` repeatedly         | projection lemma            | More readable scripts   |

Canonical forms example in PL theory:

```coq
(* Schematic:
   If a closed value has type Bool, then it is either true or false.
*)
```

Such lemmas are central in progress proofs.

**Professional rule of thumb:** If a proof repeatedly uses the same `inversion` pattern, the development probably wants a named inversion/canonical-forms lemma.

**Common Pitfalls:** Raw `inversion` is effective but can be noisy. Large proofs become more maintainable when inversion knowledge is named.

### Task: Manage Classical Reasoning Boundaries

**Core keywords:** constructive core, classical axioms, excluded middle, proof by contradiction, decidability.

Rocq’s core is constructive. Classical principles can be imported, but doing so changes the assumptions of a development. The issue is not whether classical reasoning is “bad”; the issue is whether the assumption is explicit and appropriate.

| Reasoning pattern                        | Constructive status                     | Rocq handling                            | Professional rule                  |
| ---------------------------------------- | --------------------------------------- | ---------------------------------------- | ---------------------------------- |
| Direct proof of `A -> A`                 | Constructive                            | trivial proof term                       | Always fine                        |
| Conjunction/disjunction construction     | Constructive with evidence              | `split`, `left`, `right`                 | Provide evidence                   |
| Existence proof by witness               | Constructive                            | `exists witness`                         | Preferred                          |
| Proof by contradiction for arbitrary `P` | Not generally constructive              | requires classical principles in general | Track imports/axioms               |
| Excluded middle `P \/ ~ P`               | Not derivable in core for arbitrary `P` | import/assume classical logic            | Use only when intended             |
| Decidable equality for finite type       | Constructive                            | prove `{x=y}+{x<>y}`                     | Prefer explicit decision procedure |

Constructive proof of disjunction commutativity:

```coq
Theorem or_comm_constructive :
  forall A B : Prop, A \/ B -> B \/ A.
Proof.
  intros A B H.
  destruct H as [HA | HB].
  - right. exact HA.
  - left. exact HB.
Qed.
```

Classical-looking statement:

```coq
(* forall P : Prop, P \/ ~ P *)
```

This is not available in Rocq’s constructive core without additional assumptions.

**Interdisciplinary Lens: Constructive Logic**

| Item                      | Explanation                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| What it clarifies         | Rocq proofs normally construct evidence, witnesses, and choices                                      |
| Language feature involved | `\/`, `exists`, `~`, classical imports                                                               |
| Practical consequence     | Not every paper proof transfers directly without adjusting assumptions                               |
| Limit of the lens         | Many Rocq developments intentionally use classical axioms; the key is explicit assumption management |

**Common Pitfalls:** Importing classical logic silently can obscure the computational meaning of proofs. When a theorem depends on classical principles, make that dependency visible in the development’s foundations.

### Task: Design Proofs for Certified Programming

**Core keywords:** certified programming, implementation, specification, correctness theorem, extraction boundary.

Certified programming in Rocq normally follows a pattern:

1. define executable function;
2. define specification;
3. prove correctness theorem;
4. optionally extract executable code;
5. state what remains outside the proof boundary.

Example: a simple verified boolean negation.

```coq
Definition my_negb (b : bool) : bool :=
  match b with
  | true => false
  | false => true
  end.

Definition negb_spec (f : bool -> bool) : Prop :=
  forall b : bool, f (f b) = b.
```

Correctness theorem:

```coq
Theorem my_negb_correct :
  negb_spec my_negb.
Proof.
  unfold negb_spec.
  intros b.
  destruct b.
  - reflexivity.
  - reflexivity.
Qed.
```

| Certified programming component | Rocq artifact                     | Example                |
| ------------------------------- | --------------------------------- | ---------------------- |
| Implementation                  | executable definition             | `my_negb`              |
| Specification                   | proposition over implementation   | `negb_spec my_negb`    |
| Correctness theorem             | proof of specification            | `my_negb_correct`      |
| Automation boundary             | simple case split                 | `destruct b`           |
| Extraction boundary             | external runtime after extraction | not covered by theorem |

More realistic examples include sorting, expression evaluators, finite maps, compiler passes, and type-checkers. The same pattern scales, but requires stronger specifications.

**Common Pitfalls:** A verified implementation is only verified relative to its specification. If the specification misses stability, permutation, sortedness, failure behavior, or environment assumptions, the theorem may be too weak.

### Task: Design Proofs for Sorting-Like Specifications

**Core keywords:** sorting, permutation, sortedness, correctness, specification completeness.

A sorting algorithm is a classic certified-programming anchor because correctness has at least two components: output is sorted, and output is a permutation of input.

Schematic specification:

```coq
Parameter sorted : list nat -> Prop.
Parameter permutation : list nat -> list nat -> Prop.
Parameter sort : list nat -> list nat.

Definition sort_spec (sort : list nat -> list nat) : Prop :=
  forall xs : list nat,
    sorted (sort xs) /\ permutation xs (sort xs).
```

Correctness theorem shape:

```coq
Parameter sort_correct :
  sort_spec sort.
```

This schematic uses parameters because full sorting libraries and permutation definitions belong in later ecosystem sections. The point here is theorem design.

| Specification component    | Why needed                    | If omitted                              |
| -------------------------- | ----------------------------- | --------------------------------------- |
| `sorted (sort xs)`         | Output has order property     | Function could return any permutation   |
| `permutation xs (sort xs)` | Output contains same elements | Function could return `[]`              |
| Termination/executability  | Function computes result      | Relation-only spec may not extract      |
| Stability, if needed       | Equal-key order preserved     | Algorithm may violate intended behavior |
| Comparison assumptions     | Order relation properties     | Sorting theorem may be invalid or weak  |

**Failure-first explanation:** The tempting theorem is `sorted (sort xs)`. That is too weak: a function returning `[]` is sorted. The correct specification also says the output is a permutation of the input. The professional rule of thumb is: correctness theorems need both safety properties and preservation/completeness properties where relevant.

**Common Pitfalls:** “Correctness” is not a single property. For algorithms, specify all behavior that matters to clients.

### Task: Design Proofs for Evaluator Correctness

**Core keywords:** evaluator, semantics, function-relation bridge, soundness, completeness.

Expression evaluators demonstrate how functions and relations can be connected.

```coq
Inductive exp : Type :=
| EVal : nat -> exp
| EAdd : exp -> exp -> exp.

Fixpoint eval_fun (e : exp) : nat :=
  match e with
  | EVal n => n
  | EAdd e1 e2 => eval_fun e1 + eval_fun e2
  end.

Inductive eval_rel : exp -> nat -> Prop :=
| EvalVal : forall n,
    eval_rel (EVal n) n
| EvalAdd : forall e1 e2 n1 n2,
    eval_rel e1 n1 ->
    eval_rel e2 n2 ->
    eval_rel (EAdd e1 e2) (n1 + n2).
```

Soundness:

```coq
Theorem eval_rel_sound :
  forall e n, eval_rel e n -> eval_fun e = n.
Proof.
  intros e n H.
  induction H.
  - reflexivity.
  - simpl.
    rewrite IHeval_rel1.
    rewrite IHeval_rel2.
    reflexivity.
Qed.
```

Completeness:

```coq
Theorem eval_rel_complete :
  forall e, eval_rel e (eval_fun e).
Proof.
  intros e.
  induction e as [n | e1 IH1 e2 IH2].
  - apply EvalVal.
  - simpl. apply EvalAdd.
    + exact IH1.
    + exact IH2.
Qed.
```

| Theorem                            | Meaning                                | Induction target          |
| ---------------------------------- | -------------------------------------- | ------------------------- |
| Soundness                          | Relation result agrees with function   | evaluation derivation     |
| Completeness                       | Function result is allowed by relation | expression syntax         |
| Determinism                        | Relation has at most one result        | derivation plus inversion |
| Correctness of optimized evaluator | Optimized function agrees with spec    | expression syntax         |

**Common Pitfalls:** Soundness and completeness often require different induction targets. Trying to prove both with the same induction habit can produce stuck proofs.

### Task: Design Public Proof Scripts for Review

**Core keywords:** code review, proof review, maintainability, proof intent.

A proof script should communicate the proof idea to future maintainers. In Rocq, review quality includes both correctness and proof engineering.

| Review question                      | Good sign                          | Bad sign                             |
| ------------------------------------ | ---------------------------------- | ------------------------------------ |
| Is the theorem statement meaningful? | Captures intended property         | Weak or misleading theorem           |
| Is the induction target visible?     | `induction xs as ...` with names   | Hidden in tactic                     |
| Are helper lemmas named?             | Central invariant has theorem name | Long inline proof                    |
| Is automation bounded?               | Routine leaves automated           | Main proof hidden in `auto`          |
| Are assumptions explicit?            | Imports/axioms visible             | Classical assumptions hidden         |
| Is abstraction preserved?            | Uses public lemmas                 | Unfolds private definitions          |
| Are branch cases clear?              | Bullets and names                  | Auto-generated names everywhere      |
| Does it survive refactoring?         | Minimal dependence on goal clutter | Generated-name/inversion-heavy proof |

Example of reviewable proof:

```coq
Theorem map_length_reviewable :
  forall (A B : Type) (f : A -> B) (xs : list A),
    length (map f xs) = length xs.
Proof.
  intros A B f xs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl.
    rewrite IHxs.
    reflexivity.
Qed.
```

The proof is not merely short. It reveals the proof structure: induction on `xs`, computation, rewrite by IH.

**Common Pitfalls:** A proof script can be accepted by Rocq and still be poor engineering. Professional proof scripts should be legible, stable, and appropriately abstract.

### Task: Avoid Over-Abstraction and Under-Abstraction

**Core keywords:** abstraction balance, helper lemmas, modules, typeclasses, overengineering.

Rocq developments fail in both directions. Under-abstraction creates repetitive brittle proofs. Over-abstraction creates inference problems, excessive parameters, and unreadable APIs.

| Failure mode             | Symptom                              | Cause                        | Better practice                      |
| ------------------------ | ------------------------------------ | ---------------------------- | ------------------------------------ |
| Under-abstracted proof   | Same 10-line proof repeated          | Missing helper lemma         | Name reusable theorem                |
| Under-abstracted API     | Clients unfold definitions           | No public behavior lemmas    | Export specs and rewrite lemmas      |
| Over-abstracted theorem  | Too many parameters/laws             | Premature generality         | Generalize only stable concepts      |
| Overused typeclasses     | Inference surprises                  | Avoiding explicit parameters | Use records/modules first if clearer |
| Overused dependent types | Simple functions require hard proofs | Invariant pushed too deep    | Use Prop-level specs if enough       |
| Over-automated script    | Proof unreadable                     | Hiding central argument      | Expose induction and key rewrites    |

**Professional rule of thumb:** Abstract over concepts that recur and have stable laws. Do not abstract over one-off proof details.

**Common Pitfalls:** “Generic” is not automatically better. A theorem that is too general may be difficult to use, search, and instantiate.

### Task: Build Transferable Proof Patterns

**Core keywords:** proof pattern, reusable strategy, induction, rewriting, inversion, specification.

Rocq expertise grows by recognizing proof patterns. The following table is a practical pattern index for PART 4.

| Goal pattern                     | Typical strategy                         | Central tactic                      | Helper lemma likely?  |
| -------------------------------- | ---------------------------------------- | ----------------------------------- | --------------------- |
| `forall x, P x`                  | Introduce arbitrary `x`                  | `intros`                            | No                    |
| `A -> B`                         | Assume `A`, prove `B`                    | `intros`                            | No                    |
| `A /\ B`                         | Prove both sides                         | `split`                             | Sometimes             |
| `A \/ B`                         | Choose side                              | `left`/`right`                      | Sometimes             |
| `exists x, P x`                  | Provide witness                          | `exists`                            | Sometimes             |
| Equality by computation          | Reduce and close                         | `reflexivity`                       | No                    |
| Equality over recursive function | Induct, simplify, rewrite IH             | `induction`, `simpl`, `rewrite`     | Often                 |
| Boolean test spec                | Destruct test or input, bridge to `Prop` | `destruct ... eqn:`                 | Yes                   |
| Relation soundness               | Induct on derivation                     | `induction H`                       | Often                 |
| Impossible constructor equality  | Use constructor disjointness             | `discriminate`                      | No                    |
| Invert structured evidence       | Analyze constructors                     | `inversion`                         | Often inversion lemma |
| Arithmetic side condition        | Delegate to solver                       | `lia`                               | No                    |
| Accumulator correctness          | Strengthen theorem                       | induction + generalized accumulator | Yes                   |

**Common Pitfalls:** Patterns are not scripts to paste blindly. They are diagnostic guides. Always read the current proof state.

### Task: Understand Tactics as Proof-Term Constructors

**Core keywords:** proof terms, kernel checking, tactic elaboration, Curry–Howard.

Tactics construct proof terms. They do not bypass the kernel. This is the key connection between interactive proof engineering and the Calculus of Inductive Constructions.

| Tactic           | Proof-term intuition                                 |
| ---------------- | ---------------------------------------------------- |
| `intros x`       | Build a function taking `x`                          |
| `exact t`        | Use term `t` as the proof                            |
| `apply H`        | Apply proof/theorem `H` to reduce goal to premises   |
| `split`          | Build a pair of proofs for conjunction               |
| `left` / `right` | Choose a constructor for disjunction                 |
| `exists w`       | Build an existential package with witness `w`        |
| `destruct x`     | Eliminate by cases on `x`                            |
| `induction x`    | Use induction principle for `x`                      |
| `rewrite H`      | Use equality eliminator to transport across equality |
| `reflexivity`    | Use reflexivity after conversion                     |
| `inversion H`    | Analyze possible constructors of evidence `H`        |

**Interdisciplinary Lens: Calculus of Inductive Constructions**

| Item                      | Explanation                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| What it clarifies         | Tactics construct proof terms inhabiting theorem types                                         |
| Language feature involved | proof mode, tactic scripts, kernel checking                                                    |
| Practical consequence     | A tactic script is acceptable only if the generated proof term type-checks                     |
| Limit of the lens         | It explains trust and semantics, but not every practical tactic behavior or library convention |

**Failure-first explanation:** The tempting mental model is “tactics are commands that convince Rocq.” The correct model is “tactics construct a proof object, and the kernel checks it.” This explains why powerful automation remains trustworthy when the generated term is kernel-checkable.

**Common Pitfalls:** Do not equate tactic failure with theorem falsehood. Tactic failure means that tactic could not construct a proof from the current state.

### Task: Keep Proofs Robust Under Refactoring

**Core keywords:** refactoring, proof stability, opacity, imports, dependency graph.

Rocq proof maintenance is a major part of professional use. Definitions change, imports change, theorem names change, and automation contexts change. Robust proofs reduce accidental coupling.

| Refactoring pressure           | Fragile script breaks because   | Robust response                            |
| ------------------------------ | ------------------------------- | ------------------------------------------ |
| Definition body changes        | Proof unfolded private body     | Use public lemmas                          |
| Constructor order/names change | Proof relies on generated names | Use explicit patterns and inversion lemmas |
| Imports change                 | `auto` no longer finds lemma    | Apply key lemmas explicitly                |
| Notation changes               | Goal displayed differently      | Use qualified names and `Locate`           |
| Helper theorem generalized     | Rewrite no longer matches       | Use theorem shape deliberately             |
| Automation database changes    | Proof search result changes     | Bound automation scope                     |
| Opacity changes                | Conversion behavior changes     | Decide `Qed`/`Defined` intentionally       |

**Professional rule of thumb:** A proof script should depend on stable mathematical structure, not incidental goal formatting.

**Common Pitfalls:** Broad tactics such as `simpl in *`, `rewrite H in *`, and large `auto` calls are often refactoring hazards.

### Abstraction and Composition Decision Table — task-indexed reference

**Core keywords:** decision table, abstraction, composition, proof construction.

| Task                           | Primary construct             | When to use               | Tradeoff                | Common pitfall                    |
| ------------------------------ | ----------------------------- | ------------------------- | ----------------------- | --------------------------------- |
| Define simple behavior         | `Definition`                  | Non-recursive computation | Simple and transparent  | Missing result type               |
| Define recursive behavior      | `Fixpoint`                    | Structural recursion      | Totality guaranteed     | Rejected non-structural recursion |
| Branch on computable condition | `if` over `bool`              | Executable test           | Extractable             | Confusing with `Prop`             |
| Branch on data                 | `match`                       | Inductive cases           | Exhaustive              | Dependent match complexity        |
| Prove by finite cases          | `destruct`                    | No recursive IH needed    | Simple case split       | Loses equations                   |
| Prove recursive property       | `induction`                   | Recursive data/evidence   | Gets IH                 | Weak theorem statement            |
| Preserve test result           | `destruct ... eqn:`           | Branch on expression      | Keeps equation          | Forgetting `eqn:`                 |
| Use equality                   | `rewrite`                     | Propositional equality    | Directed transformation | Wrong direction                   |
| Use computation                | `simpl`, `cbn`, `reflexivity` | Definitional equality     | Fast proof              | Expecting algebra                 |
| Compose theorem implications   | `apply`, `exact`              | Backward proof            | Clear dependency chain  | Wrong theorem orientation         |
| State local fact               | `assert`                      | One-off intermediate      | Local clarity           | Should have been global lemma     |
| Abstract behavior              | record/module/typeclass       | Reusable operations/laws  | Scalable theory         | Overengineering                   |
| Automate routine goals         | `auto`, `lia`, custom tactics | Stable leaf obligations   | Productivity            | Opaque proof                      |
| Public API proof               | named behavior theorem        | Client reasoning          | Maintains abstraction   | Unfolding internals               |
| Certified program proof        | spec + correctness theorem    | Verified implementation   | Strong guarantees       | Weak spec                         |

### Common Pitfalls and Anti-Patterns in Control, Abstraction, and Proof Engineering

**Core keywords:** anti-patterns, proof engineering, automation, induction, abstraction.

| Item                                           | Category              | Why it fails                             | Better practice                          |
| ---------------------------------------------- | --------------------- | ---------------------------------------- | ---------------------------------------- |
| `intros` everything before induction           | Common pitfall        | Weakens IH in some proofs                | Delay introductions or generalize        |
| Inducting on the wrong object                  | Common pitfall        | IH does not match computation/derivation | Induct on recursive argument or evidence |
| Using `destruct` where induction is needed     | Common pitfall        | No recursive hypothesis                  | Use `induction`                          |
| Destructing complex expression without `eqn:`  | Common pitfall        | Loses branch equation                    | Use `destruct ... eqn:H`                 |
| Treating `simpl` as theorem proving            | Common pitfall        | Only computes definitions                | Use lemmas/induction/rewrite             |
| Rewriting blindly in all hypotheses            | Anti-pattern          | Destroys useful context                  | Target rewrites                          |
| Hiding main proof in automation                | Anti-pattern          | Unreviewable and brittle                 | Expose induction/key lemmas              |
| Repeating proof fragments                      | Under-abstraction     | Maintenance burden                       | State helper lemma                       |
| Creating typeclasses for one-off code          | Over-abstraction      | Inference complexity                     | Use explicit records/parameters          |
| Unfolding private definitions in client proofs | Boundary violation    | Refactoring breaks clients               | Export behavior lemmas                   |
| Using `Admitted` to bypass proof design        | Dangerous pattern     | Adds trust debt                          | Track and eliminate admissions           |
| Proving weak correctness theorem               | Specification failure | Verified result meaningless              | Strengthen spec                          |

### PART 4 Summary — behavior construction as proof construction

PART 4 explained Rocq behavior through functions, structural recursion, pattern matching, theorem composition, and proof-state transformation. The main result is a professional mental model: **Rocq control flow and abstraction are inseparable from proof construction and proof maintenance**.

| Dimension             | Expert question                                                                   |
| --------------------- | --------------------------------------------------------------------------------- |
| Function design       | Does the signature expose the right computation and obligations?                  |
| Branching             | Is the branch over computable data, proposition evidence, or inductive structure? |
| Recursion             | Is the recursive call structurally justified?                                     |
| Induction             | Does the induction target match the recursive definition or derivation?           |
| Equality              | Is the needed equality definitional or propositional?                             |
| Helper lemmas         | Is there a reusable invariant or theorem hiding inside the proof?                 |
| Automation            | Is automation solving routine leaves or hiding the central idea?                  |
| Abstraction           | Are clients reasoning through public behavior or private representation?          |
| Proof style           | Is the script robust, readable, and reviewable?                                   |
| Certified programming | Does the theorem actually express the intended correctness property?              |

A professional Rocq user does not merely ask, “Which tactic proves this?” The better question is: “What is the shape of the goal, what evidence must be constructed, what induction principle applies, what helper lemma captures the invariant, and how can the proof remain maintainable after definitions and libraries evolve?”

## PART 5 — Modules, Errors, Effects, Resources, and Boundaries by Task Pattern

PART 5 shifts from local definitions and proofs to **boundary management**: modules, imports, public APIs, assumptions, proof failures, validation boundaries, recoverable failure representations, extraction boundaries, and trust boundaries. In Rocq, boundary design is not merely software organization. It determines what is visible, what is abstract, what is assumed, what is proved, what is computational, and what remains outside the kernel’s guarantee. This follows the requested structure for modules, errors, effects, resources, and trust boundaries.

### Boundary Orientation — environment, API, proof, trust, extraction

**Core keywords:** boundary, module, assumption, error, effect, extraction, trust.

In many programming languages, boundaries are mainly about namespaces, files, packages, visibility, exceptions, resource lifetimes, and external APIs. Rocq has those concerns in modified form, but adds proof-specific boundaries:

| Boundary type          | Rocq form                                 | What it controls                         | Main risk                                            |
| ---------------------- | ----------------------------------------- | ---------------------------------------- | ---------------------------------------------------- |
| Namespace boundary     | modules, qualified names, imports         | Which names are visible                  | Ambiguous names or notation pollution                |
| Local context boundary | sections, variables, hypotheses           | Which parameters are generalized         | Hidden assumptions in exported theorem types         |
| API boundary           | definitions plus theorems                 | How clients reason about behavior        | Clients unfold private implementation                |
| Proof boundary         | `Qed`, `Defined`, `Admitted`, axioms      | What is checked, transparent, or assumed | Trust debt or blocked computation                    |
| Logic boundary         | constructive core versus imported axioms  | Which proof principles are available     | Accidental classical assumptions                     |
| Computation boundary   | `Prop`, `Type`, extraction                | What remains computational               | Assuming proofs survive extraction as runtime checks |
| Validation boundary    | raw data to certified data                | Which external values are trusted        | Treating unvalidated input as valid                  |
| Tooling/build boundary | files, dependencies, packages             | What must compile/check together         | Fragile dependency graph                             |
| Runtime boundary       | extracted code, plugins, external systems | What happens outside kernel checking     | Whole-system correctness overclaim                   |

**Design principle:** In Rocq, boundaries should be designed around **what clients may use as facts**. A public function without public theorems is an incomplete API. A theorem proved under hidden assumptions is a weaker artifact than it appears. An extracted function without a stated environment model is not whole-system verified.

**Common Pitfalls:** Treating a Rocq module as only a namespace misses the proof-engineering role of modules: they can hide representations, control notation, package laws, and prevent clients from depending on implementation details.

### Task: Organize Files and Imports — source files, dependencies, `Require`, `Import`

**Core keywords:** `.v` files, `Require`, `Import`, `From Stdlib`, dependency graph, namespace hygiene.

A Rocq development is normally organized as `.v` files whose commands are processed sequentially. Imports affect available definitions, theorems, tactics, notation, and sometimes automation hints.

| Task                            | Construct                        | Professional use               | Failure mode                      |
| ------------------------------- | -------------------------------- | ------------------------------ | --------------------------------- |
| Load a library                  | `Require`                        | Make compiled module available | Unknown module/path               |
| Load and bring names into scope | `Require Import`                 | Convenient local development   | Namespace pollution               |
| Specify library root            | `From Stdlib Require Import ...` | Clear standard-library origin  | Version/path mismatch             |
| Bring notation into scope       | `Import ListNotations`           | Enable list syntax             | Notation unavailable or ambiguous |
| Use qualified names             | `Nat.add_comm`                   | Avoid ambiguity                | Verbose                           |
| Re-export dependency            | `Require Export`                 | Public library API             | Accidental dependency leakage     |

Example:

```coq
From Stdlib Require Import List Arith Lia.
Import ListNotations.
```

This does several things at once: it loads list definitions, arithmetic facts, linear arithmetic automation, and list notation. That affects proof scripts and source readability.

A more disciplined style may use qualified names:

```coq
From Stdlib Require Import List.
Import ListNotations.

Check List.map.
Check Nat.add_comm.
```

**Design tradeoff:**

| Import style    | Capability gained           | Cost introduced                                | Best use                             |
| --------------- | --------------------------- | ---------------------------------------------- | ------------------------------------ |
| Broad imports   | Convenience                 | Harder to know where facts/notations come from | Small files, interactive exploration |
| Qualified names | Clarity                     | Verbosity                                      | Library code and ambiguous contexts  |
| Local imports   | Scoped convenience          | More structure                                 | Notation-heavy sections              |
| Re-exporting    | API convenience for clients | Hidden dependency surface                      | Carefully designed library modules   |

**Failure-first explanation:** The tempting mental model is “imports only add names.” The surprising behavior is that imports may also add notation, scopes, tactics, hints, and typeclass instances. The correct explanation is that imports change the elaboration and proof-search environment. The professional rule of thumb is: treat imports as part of the proof context.

**Common Pitfalls:** A proof solved by `auto` may depend on hints imported indirectly. If reorganizing imports breaks proofs, the script may have hidden dependencies.

### Task: Declare Module Boundaries — `Module`, qualified names, representation control

**Core keywords:** `Module`, namespace, qualified names, abstraction, representation hiding.

Modules group definitions and control names. They can also support abstraction by limiting how clients refer to internals.

Simple module:

```coq
Module NatStack.

  Definition stack : Type := list nat.

  Definition empty : stack := [].

  Definition push (n : nat) (s : stack) : stack :=
    n :: s.

  Definition pop (s : stack) : option (nat * stack) :=
    match s with
    | [] => None
    | x :: xs => Some (x, xs)
    end.

End NatStack.
```

Using qualified names:

```coq
Check NatStack.stack.
Check NatStack.push.
Check NatStack.pop.
```

| Module feature    | Meaning                          | Practical consequence                |
| ----------------- | -------------------------------- | ------------------------------------ |
| `Module M.`       | Start namespace `M`              | Names become `M.name` outside        |
| `End M.`          | Close module                     | Exports module contents              |
| Qualified names   | `M.f`                            | Avoid ambiguity                      |
| Nested modules    | modules inside modules           | Organize larger developments         |
| Module signatures | interfaces                       | Hide or constrain implementation     |
| Functors          | modules parameterized by modules | Reusable theory over implementations |

**API theorem example:**

```coq
Module NatStackSpec.

  Definition stack : Type := list nat.

  Definition empty : stack := [].

  Definition push (n : nat) (s : stack) : stack :=
    n :: s.

  Definition pop (s : stack) : option (nat * stack) :=
    match s with
    | [] => None
    | x :: xs => Some (x, xs)
    end.

  Theorem pop_push :
    forall n s, pop (push n s) = Some (n, s).
  Proof.
    intros n s.
    reflexivity.
  Qed.

End NatStackSpec.
```

The theorem `pop_push` is part of the API. Clients should use it rather than unfolding `push` and `pop` everywhere.

**Design meaning:** A Rocq module boundary should export not only operations but also the facts that clients are meant to rely on.

**Common Pitfalls:** A module that exports functions but no behavior lemmas forces clients to unfold definitions. That makes later representation changes expensive.

### Task: Use Sections for Shared Parameters — `Section`, `Variable`, `Context`, generalization

**Core keywords:** `Section`, `Variable`, `Context`, shared assumptions, generalized parameters.

Sections allow a block of definitions and theorems to share variables and hypotheses. When a section closes, Rocq generalizes over those variables in exported definitions.

Example:

```coq
Section ListFacts.

  Variable A : Type.

  Definition singleton (x : A) : list A :=
    [x].

  Theorem singleton_length :
    forall x : A, length (singleton x) = 1.
  Proof.
    intros x.
    reflexivity.
  Qed.

End ListFacts.
```

After closing the section:

```coq
Check singleton.
Check singleton_length.
```

The exported definitions are generalized over `A`.

| Section construct     | Meaning                           | Professional use                | Risk                          |
| --------------------- | --------------------------------- | ------------------------------- | ----------------------------- |
| `Section S.`          | Start local context               | Share parameters                | Hidden generalized variables  |
| `Variable A : Type.`  | Declare arbitrary local parameter | Avoid repeated quantification   | Exported type may surprise    |
| `Hypothesis H : P.`   | Assume proposition locally        | Develop theory under assumption | Theorem depends on assumption |
| `Context {A : Type}.` | Add implicit parameter            | Cleaner definitions             | Hidden argument confusion     |
| `End S.`              | Close and generalize              | Produce generic theorems        | Need to inspect final type    |

Example with a hypothesis:

```coq
Section OrderedOperation.

  Variable A : Type.
  Variable le : A -> A -> Prop.
  Hypothesis le_refl : forall x : A, le x x.

  Theorem le_self :
    forall x : A, le x x.
  Proof.
    exact le_refl.
  Qed.

End OrderedOperation.
```

After the section closes, `le_self` depends on `A`, `le`, and `le_refl`.

**Failure-first explanation:** The tempting mental model is “a section variable is like a global variable.” The surprising behavior is that after `End`, it becomes an explicit or implicit parameter of exported definitions. The correct explanation is that sections are parameterization devices. The professional rule of thumb is: always `Check` important definitions after closing a section.

**Common Pitfalls:** A theorem may appear assumption-free inside a section but export with extra parameters or hypotheses. This is not a bug; it is section generalization.

### Task: Control Visibility and Locality — `Local`, `Global`, notation, hints, instances

**Core keywords:** locality, visibility, `Local`, `Global`, notation, hints, instances.

Rocq developments often define notation, hints, instances, coercions, and local settings. Their scope must be controlled.

| Declaration style    | Meaning                                  | Use when                     | Risk                                 |
| -------------------- | ---------------------------------------- | ---------------------------- | ------------------------------------ |
| `Local`              | Effect limited to current module/section | Avoid leaking notation/hints | Later code may not see it            |
| `Global`             | Effect intended to persist/export        | Public library behavior      | Pollutes downstream environment      |
| No explicit locality | Depends on command defaults/context      | Small local code             | Ambiguous intent                     |
| Local notation       | Notation for one file/section            | Readability                  | External users cannot rely on it     |
| Global hint          | Add to automation database               | Stable reusable fact         | `auto` becomes environment-dependent |
| Global instance      | Typeclass instance visible               | Generic inference            | Unexpected instance resolution       |

Example local scope:

```coq
Module LocalNotationDemo.

  Local Notation "x ⊕ y" := (x + y) (at level 50).

  Definition plus_demo (x y : nat) : nat :=
    x ⊕ y.

End LocalNotationDemo.
```

The notation is local to the module. Outside, clients should not rely on it.

**Design tradeoff:**

| Public effect      | Capability gained           | Cost introduced                            |
| ------------------ | --------------------------- | ------------------------------------------ |
| Global notation    | Domain-specific readability | Parsing/printing surprises                 |
| Global hints       | Automation convenience      | Hidden proof dependencies                  |
| Global instances   | Ergonomic generic code      | Search ambiguity                           |
| Local declarations | Encapsulation               | More explicit imports/configuration needed |

**Common Pitfalls:** Global hints and instances should be treated like public API commitments. They affect other proofs, sometimes far from the declaration site.

### Task: Separate Public API from Implementation Details — behavior lemmas, opacity, modules

**Core keywords:** public API, private implementation, behavior lemma, abstraction barrier, opacity.

A Rocq API should expose stable theorems rather than forcing clients to unfold implementation definitions.

Example implementation:

```coq
Module Counter.

  Definition counter : Type := nat.

  Definition zero : counter := 0.

  Definition inc (c : counter) : counter :=
    S c.

  Definition value (c : counter) : nat :=
    c.

  Theorem value_inc :
    forall c : counter, value (inc c) = S (value c).
  Proof.
    intros c.
    reflexivity.
  Qed.

End Counter.
```

A client should reason with `Counter.value_inc`, not by unfolding `Counter.inc` and `Counter.value`.

| Boundary task       | Better API element         | Reason                        |
| ------------------- | -------------------------- | ----------------------------- |
| Expose operation    | definition                 | Allows computation            |
| Expose behavior     | theorem/lemma              | Allows stable reasoning       |
| Hide representation | module signature/opacity   | Prevents proof coupling       |
| Support rewriting   | rewrite lemmas             | Makes client proofs concise   |
| Support inversion   | inversion/canonical lemmas | Avoids repeated `inversion`   |
| Support automation  | scoped hints               | Keeps proof search controlled |

**Failure-first explanation:** The tempting mental model is “clients can always unfold the function.” The surprising maintenance failure is that every client proof becomes representation-dependent. The correct explanation is that unfolding crosses the abstraction boundary. The professional rule of thumb is: if clients need a behavior, export a lemma for it.

**Common Pitfalls:** Opaque proofs via `Qed` help abstraction, but opaque computational definitions may block reduction. Decide opacity based on whether clients need computation or only theorem-based reasoning.

### Task: Handle Failure in Computation — `option`, `result`, relations, preconditions

**Core keywords:** failure, `option`, `result`, precondition, relation, partiality.

Rocq’s Gallina functions are total. A function that may fail conceptually should represent failure explicitly.

| Failure pattern          | Rocq representation            | Use when                     | Example           | Pitfall                      |
| ------------------------ | ------------------------------ | ---------------------------- | ----------------- | ---------------------------- |
| Failure without detail   | `option A`                     | Only success/absence matters | lookup, safe head | Cannot explain failure       |
| Failure with detail      | `result E A`                   | Error reason matters         | parser, checker   | More boilerplate             |
| Invalid input impossible | precondition or dependent type | Caller can prove validity    | bounded index     | Harder API                   |
| Semantic failure         | relation with no derivation    | Proof-first model            | typing/evaluation | Less executable              |
| Boolean failure          | `bool` validator               | Computable accept/reject     | validation        | Needs soundness/completeness |

Example safe division by natural numbers, simplified as predecessor-like failure:

```coq
Definition safe_pred (n : nat) : option nat :=
  match n with
  | 0 => None
  | S k => Some k
  end.
```

Specification:

```coq
Theorem safe_pred_some :
  forall n k : nat,
    safe_pred n = Some k -> n = S k.
Proof.
  intros n k H.
  destruct n as [| n'].
  - simpl in H. discriminate H.
  - simpl in H. inversion H. reflexivity.
Qed.
```

Custom result type:

```coq
Inductive parse_error : Type :=
| EmptyInput
| BadToken.

Inductive result (E A : Type) : Type :=
| Ok : A -> result E A
| Err : E -> result E A.
```

**Design meaning:** Rocq does not use uncontrolled runtime exceptions in Gallina to represent ordinary failure. Failure must be modeled in the return type, precondition, dependent type, or relation.

**Common Pitfalls:** `option` is often too weak for public boundaries. If clients need to distinguish empty input from bad syntax, use a richer result type.

### Task: Handle Failure in Proof Development — type errors, tactic failures, incomplete goals

**Core keywords:** proof failure, tactic failure, type error, incomplete proof, proof obligations.

Rocq proof development has “errors,” but they are usually static or interactive failures rather than runtime exceptions.

| Failure kind                | Symptom                        | Meaning                             | Professional response                            |
| --------------------------- | ------------------------------ | ----------------------------------- | ------------------------------------------------ |
| Parse failure               | command rejected syntactically | Bad grammar/notation/period         | Check command and imports                        |
| Unknown reference           | name not found                 | Missing import/namespace            | Use `Check`, qualified names                     |
| Type error                  | term rejected                  | Type mismatch or missing annotation | Inspect subterms                                 |
| Tactic failure              | tactic cannot apply            | Goal shape mismatch                 | Read proof state                                 |
| Unshelved goals             | proof incomplete               | Obligations remain                  | Inspect all goals                                |
| Termination rejection       | `Fixpoint` refused             | Structural decrease not evident     | Redesign recursion                               |
| Universe constraint error   | universe inconsistency         | Type hierarchy issue                | Add annotations/reduce impredicative assumptions |
| Automation timeout/slowdown | proof search too broad         | Search space explosion              | Bound automation                                 |
| Build failure               | file/dependency check fails    | Broken proof/import/version         | Recheck dependency graph                         |

Example tactic mismatch:

```coq
Theorem failure_shape_demo :
  forall A B : Prop, A -> B -> A.
Proof.
  intros A B HA HB.
  (* split.  This would fail because the goal is A, not a conjunction. *)
  exact HA.
Qed.
```

**Failure-first explanation:** The tempting mental model is “the tactic failed, so the theorem is probably false.” The correct first diagnosis is goal-shape mismatch. `split` works for conjunction goals, `left`/`right` for disjunction goals, `exists` for existential goals, `rewrite` for matching equality, and `induction` for recursive structure.

**Common Pitfalls:** Randomly adding `auto`, `simpl`, or `try` around a failing tactic usually produces fragile proofs. Diagnose the proof state first.

### Task: Track Trust Debt — `Admitted`, `Axiom`, `Parameter`, classical imports

**Core keywords:** trust debt, `Admitted`, `Axiom`, `Parameter`, assumptions, audit.

Rocq’s trust story is strong only when assumptions are managed. `Admitted`, `Axiom`, and `Parameter` can be legitimate during development or in foundational interfaces, but they introduce assumptions.

| Construct        | What it does                       | Trust status                          | Proper use                       | Risk                                   |
| ---------------- | ---------------------------------- | ------------------------------------- | -------------------------------- | -------------------------------------- |
| `Qed`            | Stores checked opaque proof        | Checked                               | Ordinary theorem                 | Body not reducible                     |
| `Defined`        | Stores checked transparent proof   | Checked                               | Computational proof/object       | May unfold and increase reduction cost |
| `Admitted`       | Accepts theorem without proof      | Trust debt                            | Temporary placeholder            | Development may rely on false claim    |
| `Axiom`          | Declares proposition as assumed    | Explicit assumption                   | Foundations/classical principles | Can make logic inconsistent if bad     |
| `Parameter`      | Declares object without body       | Abstract assumption                   | Interfaces, abstract types       | Hidden specification gap               |
| Classical import | Adds classical principles/theorems | Depends on imported axioms/principles | Classical developments           | Constructive content changes           |

Example:

```coq
Axiom excluded_middle :
  forall P : Prop, P \/ ~ P.
```

This is a powerful assumption. It should not be introduced casually.

Temporary admission:

```coq
Theorem hard_lemma :
  forall n : nat, n = n.
Admitted.
```

Even though the statement is true, `Admitted` means no proof was checked.

**Design meaning:** Rocq checks derivability from the current environment. If the environment includes unjustified assumptions, the final theorem inherits that trust debt.

**Common Pitfalls:** A file with `Admitted` can compile. Compilation is not the same as proof completeness. Serious developments track admissions and axioms explicitly.

### Task: Manage Constructive and Classical Boundaries — explicit logical assumptions

**Core keywords:** constructive core, classical reasoning, excluded middle, double negation, decidability.

Rocq’s core logic is constructive. This affects how disjunction, existence, negation, and proof by contradiction work. Classical reasoning can be imported, but it changes the assumption boundary.

| Logical pattern                       | Constructive core             | Classical version                              | Boundary issue                     |
| ------------------------------------- | ----------------------------- | ---------------------------------------------- | ---------------------------------- |
| Prove `exists x, P x`                 | Provide witness               | May prove indirectly with classical principles | Witness may not be computational   |
| Prove `A \/ B`                        | Choose side                   | May use excluded middle                        | Choice may not be constructive     |
| Prove `~~P -> P`                      | Not generally derivable       | Classical double-negation elimination          | Adds classical assumption          |
| Prove contradiction from `P` and `~P` | Constructive                  | Same                                           | Fine                               |
| Decide finite equality                | Constructive by case analysis | Same                                           | Prefer explicit decision procedure |
| Arbitrary excluded middle             | Not derivable                 | Imported/axiomatized                           | Track dependency                   |

Constructive negation example:

```coq
Theorem contradiction_demo :
  forall P : Prop, P -> ~ P -> False.
Proof.
  intros P HP HNP.
  apply HNP.
  exact HP.
Qed.
```

Constructive disjunction commutativity:

```coq
Theorem disjunction_comm_boundary :
  forall A B : Prop, A \/ B -> B \/ A.
Proof.
  intros A B H.
  destruct H as [HA | HB].
  - right. exact HA.
  - left. exact HB.
Qed.
```

**Interdisciplinary Lens: Constructive Logic**

| Item                      | Explanation                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| What it clarifies         | Existence and disjunction proofs carry evidence                                                      |
| Language feature involved | `exists`, `\/`, `~`, `False`, classical imports                                                      |
| Practical consequence     | Proof by contradiction and excluded middle require careful assumption tracking                       |
| Limit of the lens         | Rocq developments may intentionally use classical axioms; the issue is explicitness, not prohibition |

**Common Pitfalls:** Importing classical reasoning to solve a local proof may silently remove computational content from a result intended for extraction or constructive use.

### Task: Represent Recoverable and Unrecoverable Problems — computation failure versus inconsistency

**Core keywords:** recoverable failure, unrecoverable contradiction, `option`, `result`, `False`, invalid state.

Rocq distinguishes failure in data from contradiction in logic. These should not be modeled interchangeably.

| Situation                   | Use                              | Example                  | Meaning                        |
| --------------------------- | -------------------------------- | ------------------------ | ------------------------------ |
| Function may fail normally  | `option` or `result`             | lookup may fail          | Recoverable computational case |
| Input violates precondition | proof argument or dependent type | nonzero divisor required | Caller must prove validity     |
| Logical impossibility       | `False`                          | `Some x = None -> False` | Contradictory evidence         |
| Inconsistent assumptions    | `False` derivable globally       | bad axiom                | Development unsound            |
| Parser rejects input        | `result parse_error ast`         | bad token                | External-data failure          |
| Proof tactic fails          | no term constructed              | wrong goal/tactic        | Development-time issue         |

Example:

```coq
Definition head_opt {A : Type} (xs : list A) : option A :=
  match xs with
  | [] => None
  | x :: _ => Some x
  end.
```

The empty-list case is not a contradiction. It is a valid computational branch.

By contrast:

```coq
Theorem some_none_contradiction :
  forall (A : Type) (x : A), Some x = None -> False.
Proof.
  intros A x H.
  discriminate H.
Qed.
```

This theorem says a certain equality of constructors is impossible.

**Failure-first explanation:** The tempting mental model is “failure equals false.” The correct Rocq distinction is: computational failure is data, such as `None` or `Err`; logical impossibility is a proposition implying `False`. Confusing these leads to bad APIs and awkward proofs.

**Common Pitfalls:** Do not encode ordinary parser failure as `False`. If the input can fail validation, represent that failure as data.

### Task: Define Trust Boundaries for External Input — raw data, validated data, certified constructors

**Core keywords:** external input, raw data, validation, smart constructor, certified boundary.

Rocq can reason about external input only after the input is represented in the model. The trust boundary is the point where raw, untrusted data becomes validated internal data.

| Boundary layer          | Representation                            | Example              | Required theorem              |
| ----------------------- | ----------------------------------------- | -------------------- | ----------------------------- |
| Raw input               | string/list/token data                    | token stream         | none yet                      |
| Parser                  | `raw -> option ast` or `result error ast` | parse expression     | parser soundness              |
| Validator               | `ast -> bool`                             | type checker         | soundness/completeness        |
| Certified internal form | dependent type or proof-carrying record   | typed AST            | constructor correctness       |
| External assumption     | parameter/axiom                           | imported environment | explicit assumption statement |

Example validator pattern:

```coq
Definition nonempty {A : Type} (xs : list A) : Prop :=
  exists x xs', xs = x :: xs'.

Definition check_nonempty {A : Type} (xs : list A) : bool :=
  match xs with
  | [] => false
  | _ :: _ => true
  end.
```

Soundness:

```coq
Theorem check_nonempty_sound :
  forall (A : Type) (xs : list A),
    check_nonempty xs = true -> nonempty xs.
Proof.
  intros A xs H.
  destruct xs as [| x xs'].
  - simpl in H. discriminate H.
  - exists x, xs'. reflexivity.
Qed.
```

**Design meaning:** A validation boundary is certified only when the validator is connected to the intended proposition by theorems.

**Common Pitfalls:** A parser or validator written in Rocq is not automatically correct. It needs a specification and correctness theorem.

### Task: Express Side Effects — model effects rather than performing them in Gallina

**Core keywords:** effects, purity, modeling, extraction, monadic style, external systems.

Gallina definitions are pure. Ordinary effects such as file I/O, network access, mutable state, randomness, and system calls are not the central mode of Rocq computation. Effects can be modeled as data, represented with monadic structures, handled in extracted code, or isolated behind assumptions.

| Effect need               | Rocq approach                      | Example                 | Boundary issue                       |
| ------------------------- | ---------------------------------- | ----------------------- | ------------------------------------ |
| Model state               | state transition relation/function | `state -> state`        | Is model faithful?                   |
| Model I/O                 | abstract events/traces             | list of events          | External world not directly verified |
| Model nondeterminism      | relation                           | `step : s -> s -> Prop` | Need semantic theorems               |
| Extract effectful code    | extraction to target language      | OCaml/Haskell wrapper   | Runtime outside kernel               |
| Assume external primitive | `Parameter`/axiom                  | external oracle         | Trust boundary                       |
| Verify pure core          | pure function plus theorem         | parser/checker          | Effects handled at shell boundary    |

Example state transition model:

```coq
Record machine_state : Type := {
  counter_value : nat
}.

Definition tick (s : machine_state) : machine_state :=
  {| counter_value := S (counter_value s) |}.
```

Property:

```coq
Theorem tick_increases :
  forall s : machine_state,
    counter_value (tick s) = S (counter_value s).
Proof.
  intros s.
  reflexivity.
Qed.
```

This models state transition as a pure function from old state to new state.

**Design meaning:** Rocq usually verifies a pure model or pure core. Real effects must be represented, axiomatized, or handled outside the proof boundary.

**Common Pitfalls:** Do not claim that Rocq has verified file-system behavior unless the file-system model, interface, and external assumptions are explicitly part of the development.

### Task: Manage Resources — mostly proof/build/extraction boundary, not RAII-style core language

**Core keywords:** resources, memory, files, I/O, build resources, extraction.

Rocq’s core language does not manage resources in the style of C++ RAII, Rust ownership, or Java try-with-resources. Resource management matters in three main ways: modeled resources inside formal semantics, tooling/build resources, and extracted code interacting with target runtimes.

| Resource concern            | Rocq-level handling     | Example                       | Where proof stops                    |
| --------------------------- | ----------------------- | ----------------------------- | ------------------------------------ |
| Abstract resource model     | inductive/state model   | heap, lock state, file table  | Model adequacy                       |
| Pure certified algorithm    | no external resource    | sorting, evaluator            | Extraction/runtime boundary          |
| Extracted code resource use | target language runtime | file handles in OCaml wrapper | Outside Gallina proof unless modeled |
| Proof checking resources    | build time, memory      | large proof terms, automation | Engineering workflow                 |
| Plugin resources            | OCaml/plugin execution  | tactics/plugins               | Trusted plugin boundary if relevant  |

**Common Pitfalls:** Do not import mental models from Rust ownership or C++ RAII directly into Rocq’s Gallina core. If resource safety matters, model the resource discipline explicitly or verify a language/system that has such a discipline.

### Task: Isolate Unsafe, Dynamic, or Unchecked Behavior — axioms, plugins, extraction, external code

**Core keywords:** unsafe boundary, unchecked behavior, plugin, extraction, axiom, external runtime.

Rocq’s trusted kernel checks terms, but not everything in a practical workflow has the same trust status.

| Boundary item             | Trust status                       | Risk                                 | Professional response       |
| ------------------------- | ---------------------------------- | ------------------------------------ | --------------------------- |
| Kernel-checked theorem    | Highest internal confidence        | Depends on assumptions               | Inspect assumptions         |
| Tactic-generated proof    | Kernel-checked final term          | Tactic may be buggy but term checked | Trust kernel, not tactic    |
| `Admitted` theorem        | Assumed                            | Could be false                       | Track/eliminate             |
| `Axiom`                   | Assumed                            | Could be inconsistent                | Minimize/audit              |
| External plugin           | Depends on plugin/kernel interface | May affect proof construction        | Understand trust model      |
| Extracted code            | Outside kernel after extraction    | Runtime/compiler/I/O assumptions     | State extraction boundary   |
| Foreign code wrapper      | Unverified unless modeled          | Operational bugs                     | Keep small/audit separately |
| Imported binary/toolchain | External trust                     | Build/runtime mismatch               | Pin versions, CI check      |

**Design meaning:** Not every artifact in a Rocq project has equal evidential force. Professional developments distinguish kernel-checked content from assumptions and external infrastructure.

**Common Pitfalls:** “The tactic solved it” is not the trust guarantee. “The kernel accepted the generated proof term under these assumptions” is the guarantee.

### Boundary Task Decision Table — PART 5 interim reference

**Core keywords:** module boundary, error boundary, trust boundary, effect boundary.

| Task                        | Construct/API                    | Professional use                      | Pitfall                            |
| --------------------------- | -------------------------------- | ------------------------------------- | ---------------------------------- |
| Organize names              | `Module`, qualified names        | Prevent ambiguity                     | Treating modules as mere folders   |
| Share parameters            | `Section`, `Context`, `Variable` | Avoid repetition; generic theory      | Hidden generalized assumptions     |
| Import library facts        | `From ... Require Import ...`    | Reuse definitions/theorems            | Hidden notation/hints              |
| Control notation/hints      | `Local`, `Global`, scopes        | Manage elaboration/proof search       | Polluting downstream context       |
| Expose public behavior      | named theorems                   | Stable client reasoning               | Forcing clients to unfold          |
| Represent failure           | `option`, `result`               | Total functions with failure          | Using `option` when error matters  |
| Prove validator correctness | soundness/completeness           | Certified boundary                    | Proving one direction only         |
| Track assumptions           | `Axiom`, `Parameter`, imports    | Foundation/interface clarity          | Hidden trust debt                  |
| End proofs                  | `Qed`, `Defined`                 | Control opacity/transparency          | Wrong transparency choice          |
| Model effects               | state/trace/relation             | Verify pure model of effectful system | Overclaiming external behavior     |
| Extract code                | extraction commands/workflow     | Use certified pure core               | Claiming whole-system verification |
| Avoid unchecked gaps        | audit admissions/axioms          | Maintain trust                        | Letting `Admitted` persist         |

### Task: Specify Abstract Interfaces — module types, signatures, operations, laws

**Core keywords:** module type, signature, abstract type, operation, law, representation hiding.

A module signature specifies what a module must provide. In Rocq, a useful interface often includes not only operations but also laws about those operations.

A simple stack interface can be sketched as:

```coq
Module Type STACK.

  Parameter t : Type.
  Parameter empty : t.
  Parameter push : nat -> t -> t.
  Parameter pop : t -> option (nat * t).

  Axiom pop_push :
    forall n s, pop (push n s) = Some (n, s).

End STACK.
```

This says that any implementation of `STACK` must provide a type `t`, operations, and a law `pop_push`. In production-quality developments, the law should be proved by the implementing module rather than left as an unreviewed assumption.

An implementation using lists:

```coq
Module ListStack <: STACK.

  Definition t : Type := list nat.

  Definition empty : t := [].

  Definition push (n : nat) (s : t) : t :=
    n :: s.

  Definition pop (s : t) : option (nat * t) :=
    match s with
    | [] => None
    | x :: xs => Some (x, xs)
    end.

  Theorem pop_push :
    forall n s, pop (push n s) = Some (n, s).
  Proof.
    intros n s.
    reflexivity.
  Qed.

End ListStack.
```

| Interface element | Role                        | Boundary effect                                 | Common pitfall                                             |
| ----------------- | --------------------------- | ----------------------------------------------- | ---------------------------------------------------------- |
| Abstract type     | Hide representation         | Clients cannot depend on concrete structure     | Interface too weak for needed proofs                       |
| Operation         | Expose behavior entry point | Clients can compute/use operation               | Operation exported without laws                            |
| Law/theorem       | Expose reasoning principle  | Clients reason without unfolding                | Stated too weakly                                          |
| Opaque proof      | Hide proof body             | Maintains abstraction                           | May block computation if proof is computationally relevant |
| Module ascription | Enforce interface           | Prevent accidental dependency on implementation | Can hide useful definitions too aggressively               |

**Design meaning:** A Rocq interface should expose theorems as part of the API. If clients need to know how an operation behaves, that behavior should be stated as a law, not discovered by unfolding the implementation.

**Common Pitfalls:** A module signature with only operations but no laws is usually under-specified. It may be adequate for computation, but weak for proof reuse.

### Task: Parameterize Theory Over Implementations — functors

**Core keywords:** functor, parameterized module, reusable theory, abstract implementation, law reuse.

A functor is a module parameterized by another module. In Rocq, functors support reusable theory over abstract implementations.

Example: define generic stack facts over any `STACK`.

```coq
Module StackFacts (S : STACK).

  Theorem push_then_pop_is_some :
    forall n s, exists s', S.pop (S.push n s) = Some (n, s').
  Proof.
    intros n s.
    exists s.
    apply S.pop_push.
  Qed.

End StackFacts.
```

Instantiating with `ListStack`:

```coq
Module ListStackFacts := StackFacts(ListStack).
```

| Functor use case                  | Benefit                                   | Cost                     | Common failure mode           |
| --------------------------------- | ----------------------------------------- | ------------------------ | ----------------------------- |
| Reusable algebraic theory         | Prove once for many implementations       | More module structure    | Interface lacks required laws |
| Representation-independent proofs | Clients cannot unfold internals           | Less direct computation  | Overly abstract goals         |
| Certified data structures         | Separate implementation from proof theory | More boilerplate         | Ascription hides needed facts |
| Large libraries                   | Scalable namespacing                      | More complex build graph | Harder source navigation      |

**Design tradeoff:** Functors are powerful when there are multiple implementations of the same abstract structure. They are overkill for one-off local code. If there is only one implementation and no reusable theory, a record or section may be clearer.

**Common Pitfalls:** A functor cannot prove facts that the signature does not expose. If a proof needs associativity, identity, decidable equality, or lookup/update behavior, those must appear in the interface.

### Task: Choose Between Sections, Records, Modules, and Typeclasses for Boundaries

**Core keywords:** section, record, module, typeclass, canonical structure, abstraction choice.

Rocq offers several ways to express reusable boundaries. They are not interchangeable.

| Boundary mechanism  | Best use                             | Strength                                   | Cost                              | Professional decision rule               |
| ------------------- | ------------------------------------ | ------------------------------------------ | --------------------------------- | ---------------------------------------- |
| Section             | Temporary shared context             | Lightweight parameterization               | Exported parameters may be hidden | Use for local theory development         |
| Record              | Bundle fields and laws               | Explicit and inspectable                   | Projection overhead               | Use for small/medium structures          |
| Module signature    | Abstract interface                   | Strong namespace and representation hiding | Verbose                           | Use for large APIs/data structures       |
| Functor             | Theory over implementation           | Reusable module-level proofs               | Heavy structure                   | Use when multiple implementations matter |
| Typeclass           | Inferred structure                   | Ergonomic generic notation                 | Search opacity                    | Use when inference is worth the cost     |
| Canonical structure | Library-specific inference hierarchy | Powerful mathematical reuse                | Steep learning curve              | Use when library convention demands it   |

Example record-style equality interface:

```coq
Record EqbSpec (A : Type) : Type := {
  eqb : A -> A -> bool;
  eqb_sound : forall x y, eqb x y = true -> x = y;
  eqb_complete : forall x y, x = y -> eqb x y = true
}.
```

Example section-style theory:

```coq
Section EqbTheory.

  Variable A : Type.
  Variable E : EqbSpec A.

  Theorem eqb_refl_from_complete :
    forall x : A, eqb A E x x = true.
  Proof.
    intros x.
    apply eqb_complete.
    reflexivity.
  Qed.

End EqbTheory.
```

**Failure-first explanation:** The tempting mental model is “typeclasses are the professional solution for all reusable structure.” The surprising behavior is that typeclass inference can make failures harder to debug. The correct explanation is that inferred structure is a boundary with hidden search behavior. The professional rule of thumb is: start explicit; introduce inference only when repeated explicit passing becomes a real burden.

**Common Pitfalls:** Overusing typeclasses can make proof failures look mysterious. Underusing abstraction can make every theorem depend on concrete implementation details.

### Task: Control Proof Obligations — dependent definitions, `Program`, obligations, refinement

**Core keywords:** proof obligation, dependent result, refinement, `Program`, obligation management.

Some definitions generate proof obligations because their type demands evidence. This is common with dependent records, subset types, well-founded recursion, and certified functions.

Example dependent result:

```coq
Definition nonzero (n : nat) : Prop :=
  n <> 0.

Definition one_nonzero : { n : nat | nonzero n }.
Proof.
  exists 1.
  unfold nonzero.
  intros H.
  discriminate H.
Defined.
```

The proof obligation is the second component: proof that `1 <> 0`.

A more API-like example:

```coq
Definition make_nonzero (n : nat) : option { k : nat | nonzero k }.
Proof.
  destruct n as [| n'].
  - exact None.
  - refine (Some (exist _ (S n') _)).
    unfold nonzero.
    intros H.
    discriminate H.
Defined.
```

| Obligation source      | Example                        | Why obligation appears       | Boundary issue                 |                          |
| ---------------------- | ------------------------------ | ---------------------------- | ------------------------------ | ------------------------ |
| Subset type            | `{ x : A                       | P x }`                       | Need proof of `P x`            | Proof travels with value |
| Dependent record       | field depends on earlier field | Later fields require proofs  | Equality/projection complexity |                          |
| Certified function     | returns value plus spec proof  | Must prove postcondition     | More work upfront              |                          |
| Well-founded recursion | non-structural recursion       | Must prove measure decreases | Termination boundary           |                          |
| Module implementation  | satisfies signature law        | Must prove required theorem  | Interface compliance           |                          |

**Design meaning:** Proof obligations are not bureaucratic noise. They are the point where an API’s claimed invariant must be justified.

**Common Pitfalls:** A development with many generated obligations may need a simpler representation. If the proof burden overwhelms every use, the invariant may be placed too deep in the type.

### Task: Use `Qed`, `Defined`, and Opacity as Boundary Tools

**Core keywords:** opacity, transparency, computation, proof hiding, conversion cost.

`Qed` and `Defined` are not merely two ways to end a proof. They define a boundary between proof abstraction and computation.

| Ending     | Boundary meaning                 | Use when                            | Risk                             |
| ---------- | -------------------------------- | ----------------------------------- | -------------------------------- |
| `Qed`      | Store opaque checked proof       | Ordinary theorem                    | Cannot unfold during computation |
| `Defined`  | Store transparent checked object | Computationally relevant proof/data | May increase conversion cost     |
| `Admitted` | Store unproved assumption        | Temporary placeholder only          | Trust debt                       |
| `Abort`    | Discard proof                    | Failed attempt                      | No theorem exported              |

Transparent certified value:

```coq
Definition certified_zero : { n : nat | n = 0 }.
Proof.
  exists 0.
  reflexivity.
Defined.
```

Opaque theorem:

```coq
Theorem zero_eq_zero :
  0 = 0.
Proof.
  reflexivity.
Qed.
```

The first may be computationally inspected as a dependent pair. The second is a theorem whose body is normally not unfolded.

| Boundary question                                | Prefer `Qed`   | Prefer `Defined` |
| ------------------------------------------------ | -------------- | ---------------- |
| Is the object a theorem used only for reasoning? | Yes            | Usually no       |
| Is the proof computationally relevant?           | No             | Yes              |
| Should clients depend on the body?               | No             | Maybe            |
| Could unfolding cause performance problems?      | Yes, use `Qed` | Be cautious      |
| Is this a decision procedure returning evidence? | Maybe no       | Often yes        |

**Common Pitfalls:** Ending all proofs with `Defined` can create expensive and fragile computation. Ending computational witnesses with `Qed` can block expected reduction.

### Task: Define Extraction Boundaries — what extraction guarantees and what it does not

**Core keywords:** extraction, certified programming, OCaml, Haskell, proof erasure, runtime boundary.

Extraction turns computational Rocq definitions into code in a target language such as OCaml or Haskell. The official Rocq framing treats extraction as a way to obtain executable programs from specifications, but extraction is not whole-system verification.

| Extraction component                    | Inside Rocq guarantee?       | Boundary issue                          |
| --------------------------------------- | ---------------------------- | --------------------------------------- |
| Source function type-checks             | Yes                          | Relative to definitions and assumptions |
| Correctness theorem proved              | Yes                          | Only the stated theorem                 |
| Proof terms extracted as runtime checks | Usually no                   | Proofs in `Prop` are erased             |
| Target compiler behavior                | No                           | External trust                          |
| Target runtime behavior                 | No                           | External trust                          |
| I/O wrapper                             | No unless modeled            | External code                           |
| Foreign libraries                       | No unless specified/verified | External assumptions                    |
| Performance                             | Not guaranteed by proof      | Requires profiling/target analysis      |

Example schematic:

```coq
Definition verified_inc (n : nat) : nat :=
  S n.

Theorem verified_inc_correct :
  forall n, verified_inc n = S n.
Proof.
  intros n.
  reflexivity.
Qed.
```

If `verified_inc` is extracted, the theorem supports the source-level behavior. It does not prove that every program using the extracted function handles files, memory, network, deployment, or target-language exceptions correctly.

**Design tradeoff:**

| Capability gained                              | Cost introduced                        | Misuse encouraged                      |                                    |
| ---------------------------------------------- | -------------------------------------- | -------------------------------------- | ---------------------------------- |
| Certified pure core can become executable code | Must manage target runtime assumptions | Claiming whole application is verified |                                    |
| Proofs can be erased                           | Efficient code possible                | Expecting runtime proof checks         |                                    |
| Extraction connects proof and implementation   | Requires careful boundary statement    | Ignoring wrapper correctness           |                                    |
| Target-language integration                    | Practical deployment                   | External trust grows                   | Overclaiming end-to-end guarantees |

**Common Pitfalls:** “Extracted from Rocq” does not mean “the deployed system is verified.” The verified boundary is the theorem over the Rocq model and extracted computational content, not every operational context.

### Task: Separate Computation, Specification, and Runtime Effects

**Core keywords:** computation, specification, runtime effect, pure core, wrapper boundary.

A common verified-programming architecture separates:

1. pure Rocq function;
2. Rocq specification;
3. correctness theorem;
4. extracted pure function;
5. external wrapper handling effects.

| Layer             | Example                                   | Verification status                           |
| ----------------- | ----------------------------------------- | --------------------------------------------- |
| Pure model        | `parse_tokens : list token -> option ast` | Verifiable in Rocq                            |
| Specification     | `parse_sound`                             | Verifiable in Rocq                            |
| Extracted code    | OCaml/Haskell parser                      | Trusts extraction and target compiler/runtime |
| Effectful wrapper | read file, tokenize, call parser          | Outside proof unless modeled                  |
| Deployment        | CLI/server/container                      | Outside proof unless separately verified      |

Schematic parser boundary:

```coq
Parameter token : Type.
Parameter ast : Type.

Parameter parse_tokens : list token -> option ast.
Parameter well_formed : ast -> Prop.

Definition parser_sound_spec : Prop :=
  forall toks a, parse_tokens toks = Some a -> well_formed a.
```

A real development would define `token`, `ast`, `parse_tokens`, and prove `parser_sound_spec`.

**Professional rule of thumb:** Keep the verified core pure and small where possible. Make the external wrapper explicit and auditable. State clearly what theorem the extracted function satisfies.

**Common Pitfalls:** If tokenization happens outside Rocq but the theorem assumes already-correct tokens, the tokenizer is part of the trust boundary.

### Task: Manage Compatibility Boundaries — Rocq versions, Coq-era names, Stdlib/Corelib, packages

**Core keywords:** compatibility, Coq-to-Rocq migration, `Stdlib`, `Corelib`, package versions, notation drift.

Rocq inherits a large Coq-era ecosystem. Version and naming boundaries matter.

| Compatibility boundary         | Example                                   | Risk                   | Professional response                           |
| ------------------------------ | ----------------------------------------- | ---------------------- | ----------------------------------------------- |
| Coq-era import paths           | `From Coq Require Import ...` in old code | Migration friction     | Prefer current Rocq/Stdlib paths where possible |
| Rocq 9 library split           | `Corelib`, `Stdlib`                       | Import path changes    | Know which layer is used                        |
| Platform versus prover version | curated packages may target older prover  | Package mismatch       | Pin compatible versions                         |
| Notation changes               | parsing/printing differences              | Proof script breakage  | Use `Locate`, scopes, qualified names           |
| Tactic behavior changes        | automation differs by version/imports     | Fragile proofs         | Avoid over-automation                           |
| External library conventions   | MathComp-style vs Stdlib-style            | Different proof idioms | Follow local library culture                    |
| Build tooling                  | `dune`, `opam`, `rocq` command family     | Configuration failures | Keep project metadata explicit                  |

**Design meaning:** Compatibility is a proof-maintenance boundary. A proof that depends heavily on notation, generated names, or automation may be less portable across versions and libraries.

**Common Pitfalls:** Do not mix old and new import styles casually in a large development. It may work locally but complicate migration, documentation, and dependency management.

### Task: Control Build and Package Boundaries — `opam`, Rocq Platform, `dune`, CI

**Core keywords:** build system, package management, Rocq Platform, `opam`, `dune`, CI, dependency graph.

Rocq projects are checked artifacts. Build tooling is therefore part of the proof boundary in the engineering sense: it determines which files, versions, libraries, and commands were checked.

| Tooling boundary         | Role                                | Professional concern                    |
| ------------------------ | ----------------------------------- | --------------------------------------- |
| `opam` switch            | Package/version environment         | Reproducible dependencies               |
| Rocq Platform            | Curated prover/library distribution | Stable setup, possible version lag      |
| `dune`                   | Build orchestration                 | Correct file order, dependency tracking |
| `rocq` command family    | Prover tooling interface            | Modern command usage                    |
| CI                       | Recheck proofs automatically        | Prevent stale proofs                    |
| Lockfiles/pins           | Freeze versions                     | Avoid accidental dependency drift       |
| Documentation generation | Surface API/theorems                | Keep public boundary readable           |

A professional Rocq project should answer:

| Question                                          | Why it matters                                            |
| ------------------------------------------------- | --------------------------------------------------------- |
| Which Rocq version is used?                       | Proof scripts and imports may be version-sensitive        |
| Which libraries are required?                     | Theorems, notation, tactics, and instances depend on them |
| Are admissions allowed?                           | Determines proof completeness                             |
| Are axioms audited?                               | Determines trust base                                     |
| Does CI run full proof checking?                  | Prevents unnoticed breakage                               |
| Are extracted artifacts regenerated consistently? | Avoids stale certified code                               |
| Are generated files distinguished from source?    | Prevents build ambiguity                                  |

**Common Pitfalls:** A proof that checks only in one developer’s local environment is not a stable artifact. Version pinning and CI are part of professional proof engineering.

### Task: Define Compatibility Boundaries for Public Libraries

**Core keywords:** public library, API stability, theorem names, notation, deprecation, migration.

A Rocq library’s public API includes definitions, theorem names, notation, modules, instances, hints, and sometimes proof automation conventions.

| Public artifact      | Compatibility risk             | Better practice                         |
| -------------------- | ------------------------------ | --------------------------------------- |
| Definition name/type | Clients depend directly        | Avoid unnecessary breaking changes      |
| Theorem statement    | Client proofs rewrite/apply it | Preserve or provide migration lemma     |
| Notation             | Affects parsing and printing   | Scope carefully                         |
| Hint database        | Affects automation             | Keep scoped and documented              |
| Typeclass instance   | Affects inference              | Avoid overlapping surprises             |
| Module path          | Import stability               | Provide compatibility aliases if needed |
| Transparency         | Affects conversion             | Do not change casually                  |
| Deprecated theorem   | Legacy client use              | Mark and provide replacement            |

**Design meaning:** In Rocq, changing a theorem statement can be as breaking as changing a function type. Client proofs are programs depending on theorem APIs.

**Common Pitfalls:** Removing a lemma because it is “obvious” can break many clients. Obvious facts are often important rewrite and proof-search tools.

### Task: Boundary-Review for Axioms and Assumptions

**Core keywords:** axiom audit, assumption tracking, constructive/classical boundary, consistency risk.

Axiom review is a professional necessity. Not all assumptions are equally dangerous, but all should be visible.

| Assumption type           | Example               | Risk level                    | Review question                                 |
| ------------------------- | --------------------- | ----------------------------- | ----------------------------------------------- |
| Abstract parameter        | `Parameter A : Type`  | Low to medium                 | Is this an interface or an unfilled definition? |
| Algebraic law hypothesis  | associativity         | Medium                        | Is it stated as part of structure?              |
| Classical principle       | excluded middle       | Medium/high depending on goal | Is classical reasoning intended?                |
| Functional extensionality | equality of functions | Common but assumption-bearing | Is it needed and documented?                    |
| Proof irrelevance         | equality of proofs    | Context-dependent             | Does development rely on it?                    |
| Untrusted domain axiom    | external fact         | High                          | Is it justified externally?                     |
| Inconsistent axiom        | `False` or equivalent | Catastrophic                  | Does it collapse the logic?                     |
| `Admitted` theorem        | placeholder           | High until resolved           | Is it tracked and eliminated?                   |

Example of making assumptions explicit through a section:

```coq
Section ClassicalLocal.

  Variable excluded_middle_local :
    forall P : Prop, P \/ ~ P.

  Theorem double_negation_elim_local :
    forall P : Prop, ~~ P -> P.
  Proof.
    intros P HNNP.
    destruct (excluded_middle_local P) as [HP | HNP].
    - exact HP.
    - exfalso. apply HNNP. exact HNP.
  Qed.

End ClassicalLocal.
```

This style localizes the classical assumption instead of importing it invisibly into every theorem.

**Common Pitfalls:** A theorem that appears constructive may depend on section hypotheses or imported axioms. Use commands that inspect assumptions when appropriate, and review theorem types after sections close.

### Task: Boundary-Review for Automation and Hints

**Core keywords:** hints, automation, proof search, scoped databases, maintainability.

Automation boundaries are subtle because they do not usually affect theorem statements, but they affect proof scripts.

| Automation boundary           | Risk                                | Professional response                       |
| ----------------------------- | ----------------------------------- | ------------------------------------------- |
| Global hints                  | Proofs depend on hidden facts       | Use scoped databases                        |
| Broad `auto`                  | Hard to know proof source           | Apply key lemmas explicitly                 |
| `eauto` search depth          | Slow or unpredictable               | Bound depth/scope                           |
| Rewrite hints                 | Rewrite loops or over-normalization | Scope and test carefully                    |
| Typeclass search              | Ambiguous instances                 | Avoid overlapping instances unless intended |
| Custom tactics                | Hidden proof strategy               | Name clearly and keep local if possible     |
| Imported automation libraries | Proof behavior changes              | Document imports                            |

Example of a safer automation style:

```coq
Hint Resolve app_nil_r : list_core.

Theorem app_nil_r_auto_example :
  forall (A : Type) (xs : list A), xs ++ [] = xs.
Proof.
  intros A xs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl.
    rewrite IHxs.
    reflexivity.
Qed.
```

Even though a hint is declared, the central induction is explicit. The proof remains readable.

**Common Pitfalls:** If a theorem’s proof is just `auto with some_db`, review whether the database and theorem are stable enough to justify that opacity.

### Task: Boundary-Review for Extraction and Certified Programs

**Core keywords:** extraction audit, certified core, wrapper, external runtime, specification adequacy.

Before claiming certified programming success, inspect the boundary.

| Review item        | Question                                     | Failure mode                                  |
| ------------------ | -------------------------------------------- | --------------------------------------------- |
| Implementation     | What function was verified?                  | Verified helper, not actual exported function |
| Specification      | What property was proved?                    | Weak or wrong spec                            |
| Assumptions        | Which axioms/parameters were used?           | Hidden trust dependency                       |
| Extraction target  | OCaml/Haskell/etc.?                          | Target mismatch                               |
| Proof erasure      | Are proofs needed at runtime?                | Runtime check expected but erased             |
| Wrapper            | Who handles I/O/errors?                      | Unverified wrapper violates assumptions       |
| Data encoding      | Are extracted types represented as expected? | Performance/semantic mismatch                 |
| External libraries | Are they verified or trusted?                | Unmodeled behavior                            |
| Deployment         | Is environment modeled?                      | End-to-end overclaim                          |

**Professional rule of thumb:** State certified claims in this form:

> The Rocq function `f` satisfies theorem `T` under assumptions `A`; the extracted code corresponds to the computational content of `f`; external wrapper/runtime behavior remains outside this theorem unless separately modeled.

This wording prevents overclaiming.

**Common Pitfalls:** A verified parser over token lists does not verify the lexer unless the lexer is also modeled and proved correct.

### Task: Boundary-Review for Effects and Resources

**Core keywords:** effects, resources, state model, trace model, wrapper, separation.

Effects and resources should be reviewed as model boundaries.

| Effect/resource | Rocq representation                          | Review question                               |
| --------------- | -------------------------------------------- | --------------------------------------------- |
| Mutable state   | state transition function/relation           | Does the model match intended state behavior? |
| I/O             | event trace or external wrapper              | Is I/O inside or outside proof?               |
| Randomness      | nondeterministic relation/distribution model | What property is proved over randomness?      |
| Concurrency     | interleaving/trace semantics                 | Are schedules modeled?                        |
| Memory          | heap model/separation logic/library          | What memory properties are formalized?        |
| File handles    | abstract resource state                      | Are open/close protocols modeled?             |
| Network         | trace/protocol model                         | Are failures/adversaries modeled?             |
| Target runtime  | external assumption                          | Is runtime behavior part of theorem?          |

**Design meaning:** Rocq can verify effectful systems only through models or verified effect systems. If the effect is outside the model, it is outside the proof guarantee.

**Common Pitfalls:** A pure theorem about a function called by a server does not verify the server’s concurrency, error handling, or I/O behavior.

### Task: Handle Compatibility with Classical Mathematical Libraries

**Core keywords:** classical library, constructive library, assumptions, theorem reuse.

Some libraries or developments assume classical principles; others preserve constructive content. Mixing them is possible, but assumption boundaries should be explicit.

| Library style               | Typical behavior                 | Benefit                    | Boundary concern          |
| --------------------------- | -------------------------------- | -------------------------- | ------------------------- |
| Constructive core style     | Avoids arbitrary excluded middle | Computational content      | More explicit witnesses   |
| Classical mathematics style | Uses classical principles        | Easier conventional math   | Less constructive content |
| Boolean reflection style    | Bridges `bool` and `Prop`        | Efficient proof automation | Requires library idiom    |
| Algebraic hierarchy style   | Structured operations/laws       | Powerful reuse             | Inference conventions     |
| Automation-heavy style      | Solves routine goals             | Productivity               | Proof opacity             |

**Professional rule of thumb:** Follow the assumptions and idioms of the library being used. Do not silently mix constructive and classical styles without knowing which theorems depend on which principles.

**Common Pitfalls:** Importing a classical theorem to solve a small proof may make a downstream certified-programming theorem nonconstructive in an unintended way.

### Task: Design Compatibility Boundaries for Notation and Scopes

**Core keywords:** notation, scope, parsing, printing, library readability.

Notation improves readability but creates compatibility and source-reading risks.

| Notation boundary              | Risk                             | Professional response          |
| ------------------------------ | -------------------------------- | ------------------------------ |
| Same symbol in multiple scopes | Misparsed term                   | Use `Locate`, explicit scopes  |
| Global notation                | Downstream conflicts             | Use local/scoped notation      |
| Domain-specific notation       | Insider readability only         | Document and reserve carefully |
| Infix precedence               | Unexpected parse tree            | Check parsed term              |
| Imported notation              | Code works only with import      | Keep imports near use          |
| Printing changes               | Proof scripts visually confusing | Use `Set Printing` diagnostics |

Example:

```coq
Locate "+".
Locate "::".
```

These commands reveal which notation is active and where it comes from.

**Common Pitfalls:** If a proof depends on a notation-heavy expression, use `Check` or `Print` to verify the underlying term. Do not debug type theory when the problem is parsing.

### Task: Boundary Design for Standard-Library Interaction

**Core keywords:** Stdlib, existing lemmas, search, rewrite lemmas, local theory.

Rocq’s standard library provides many definitions and facts. A development should avoid re-proving basic facts unless doing so for pedagogy.

| Boundary task         | Tool/construct                   | Use                                 |
| --------------------- | -------------------------------- | ----------------------------------- |
| Find existing theorem | `Search`                         | Avoid duplicate lemmas              |
| Inspect theorem       | `Check`, `About`                 | Verify assumptions and type         |
| Locate notation       | `Locate`                         | Understand parsing                  |
| Use qualified theorem | `Nat.add_comm`, `app_assoc`      | Avoid ambiguity                     |
| Control imports       | `From Stdlib Require Import ...` | Keep dependencies explicit          |
| Wrap library theorem  | local lemma                      | Provide project-specific name/shape |

Example:

```coq
Search (_ ++ [] = _).
Check app_nil_r.
Check app_assoc.
Search (_ + 0 = _).
Check Nat.add_0_r.
```

**Design meaning:** The standard library is a boundary between project-specific proof and reusable theory. Good projects use library facts explicitly and wrap them when a local API needs a stable theorem shape.

**Common Pitfalls:** Re-proving a standard theorem with a different name can fragment the proof library. But wrapping a theorem under a project-specific name can be useful when it expresses an API contract.

### Professional Boundary Review Checklist

**Core keywords:** review checklist, trust, modules, errors, extraction, assumptions.

| Boundary area   | Review question                                   | Good sign                                     | Warning sign                             |
| --------------- | ------------------------------------------------- | --------------------------------------------- | ---------------------------------------- |
| Imports         | Are dependencies explicit and necessary?          | Minimal, clear imports                        | Broad imports used for hidden automation |
| Modules         | Does the module expose behavior lemmas?           | Operations plus laws                          | Clients must unfold internals            |
| Sections        | Are exported theorem types checked?               | `Check` after `End`                           | Surprise parameters/hypotheses           |
| Locality        | Are notation/hints scoped?                        | `Local` where appropriate                     | Global pollution                         |
| Assumptions     | Are axioms/admissions tracked?                    | Explicit assumption list                      | Hidden `Admitted`                        |
| Classical logic | Is classical reasoning intentional?               | Localized/import documented                   | Silent global import                     |
| Failure         | Is failure represented as data where appropriate? | `option`/`result` with specs                  | Logical `False` used for normal failure  |
| Validators      | Are soundness/completeness proven?                | Both directions when needed                   | Validator trusted without theorem        |
| Opacity         | Are `Qed`/`Defined` choices intentional?          | Theorems opaque, data transparent when needed | Everything `Defined`                     |
| Extraction      | Is proof boundary stated?                         | Clear verified core and wrapper boundary      | Whole-system overclaim                   |
| Effects         | Are effects modeled or isolated?                  | Trace/state model or explicit wrapper         | Unmodeled I/O claimed verified           |
| Build           | Are versions pinned and checked in CI?            | Reproducible environment                      | Local-only proof success                 |
| Automation      | Is proof search bounded?                          | Explicit key lemmas                           | Central proof hidden in `auto`           |
| Compatibility   | Are public theorem names stable?                  | Migration lemmas when needed                  | Breaking obvious lemmas                  |

### Boundary Task Decision Table — final PART 5 reference

**Core keywords:** boundary task, construct, professional use, pitfall.

| Boundary task                     | Primary construct/API           | Professional use            | Failure mode                   |
| --------------------------------- | ------------------------------- | --------------------------- | ------------------------------ |
| Hide representation               | module signature, opaque module | Abstract data structure     | Interface too weak             |
| Reuse theory over implementations | functor                         | Generic proofs              | Missing laws in signature      |
| Bundle operations and laws        | record/typeclass                | Algebraic structures        | Projection or inference burden |
| Share assumptions locally         | section/context                 | Parametric development      | Hidden exported assumptions    |
| State public behavior             | theorem/lemma                   | Stable client proof         | Weak theorem                   |
| Represent recoverable failure     | `option`, `result`              | Total computational API     | Failure underspecified         |
| Represent impossible state        | `False`, contradiction theorem  | Logical impossibility       | Misused for normal failure     |
| Track trust debt                  | axiom/admission audit           | Foundation review           | Silent assumptions             |
| Control transparency              | `Qed`, `Defined`                | Computation/proof boundary  | Wrong opacity                  |
| Validate external input           | parser/validator + theorem      | Certified boundary          | Validator trusted informally   |
| Model effects                     | state/trace/relation            | Verified semantics          | External effects overclaimed   |
| Extract certified code            | extraction workflow             | Executable verified core    | Runtime/wrapper ignored        |
| Maintain compatibility            | version pins, stable APIs       | Long-lived library          | Fragile notation/automation    |
| Control automation                | scoped hints/custom tactics     | Proof productivity          | Opaque brittle scripts         |
| Build reliably                    | `opam`, Platform, `dune`, CI    | Reproducible proof checking | Environment drift              |

### Common Pitfalls and Anti-Patterns in Boundary Design

**Core keywords:** boundary anti-patterns, trust debt, abstraction leak, extraction overclaim.

| Item                                        | Category                | Why it fails                       | Better practice                          |
| ------------------------------------------- | ----------------------- | ---------------------------------- | ---------------------------------------- |
| Exporting functions without theorems        | API anti-pattern        | Clients must unfold implementation | Export behavior lemmas                   |
| Using `Axiom` for convenience               | Trust anti-pattern      | May invalidate development         | Prove or isolate assumption              |
| Leaving `Admitted` in final code            | Trust debt              | Theorem is unproved                | Track and eliminate                      |
| Global notation for local concept           | Scope anti-pattern      | Downstream parsing conflicts       | Use local/scoped notation                |
| Global hints everywhere                     | Automation anti-pattern | Hidden proof dependencies          | Scoped hint databases                    |
| Claiming extracted system is fully verified | Boundary overclaim      | Runtime/wrapper unverified         | State verified core and assumptions      |
| Treating parser failure as contradiction    | Modeling error          | Failure is normal data             | Use `option`/`result`                    |
| Overusing dependent records at boundaries   | Over-dependent design   | Every client carries proof burden  | Use validators/specs when enough         |
| Hiding classical assumptions                | Logic-boundary mistake  | Theorem appears constructive       | Localize/document assumptions            |
| Changing public theorem statements casually | Compatibility break     | Client proofs depend on them       | Provide migration lemmas                 |
| Relying on generated names in public proofs | Maintenance pitfall     | Minor changes break scripts        | Name cases/hypotheses explicitly         |
| Broad imports in library files              | Dependency smell        | Hard to audit source of facts      | Use explicit imports and qualified names |

### PART 5 Summary — boundaries as proof obligations and trust management

PART 5 established that Rocq boundary design is a combination of software architecture, proof architecture, and trust management.

| Boundary dimension     | Expert-level question                                                          |
| ---------------------- | ------------------------------------------------------------------------------ |
| Module boundary        | What operations and laws are exported?                                         |
| Section boundary       | Which variables and hypotheses become parameters?                              |
| Import boundary        | Which names, notation, hints, instances, and assumptions enter scope?          |
| API boundary           | Can clients reason through public theorems instead of private bodies?          |
| Failure boundary       | Is ordinary failure represented as data, not contradiction?                    |
| Validation boundary    | Is raw input connected to certified internal data by theorems?                 |
| Assumption boundary    | Which axioms, parameters, admissions, and classical principles are used?       |
| Opacity boundary       | Should this object compute, or should its proof body remain hidden?            |
| Effect boundary        | Is the external effect modeled, assumed, or outside the theorem?               |
| Extraction boundary    | What exactly was verified before code entered the target runtime?              |
| Compatibility boundary | Will imports, notation, theorem names, and automation survive version changes? |
| Build boundary         | Can the development be rechecked reproducibly?                                 |

The main professional rule is: **make every boundary explicit enough that a reviewer can tell what is proved, what is assumed, what is exported, what is hidden, what computes, and what lies outside the proof guarantee.**

## PART 6 — Standard Library and Core Ecosystem Reference by Task Pattern

PART 6 is a task-oriented reference to Rocq’s standard library and core ecosystem. The goal is not to list every module, but to explain how a professional Rocq user finds definitions, imports libraries, uses notations and scopes, chooses common library abstractions, and avoids re-proving standard facts.

For Rocq 9.x, library organization must be treated carefully. The Coq-era standard library was split into `Corelib` and `Stdlib`: `Corelib` is the extended prelude needed for Rocq tactics and core support, while `Stdlib` is the broader standard library package; Rocq’s documentation also emphasizes explicit loading with commands such as `From Stdlib Require Import ...`.  The official release page for Rocq Prover `9.2.0` links separately to Reference Manual, Corelib theories, Stdlib Manual, and Stdlib Theories, which reflects this layered organization.

### Ecosystem Orientation — `Corelib`, `Stdlib`, Platform, external packages

**Core keywords:** `Corelib`, `Stdlib`, Rocq Platform, external libraries, packages, plugins, `opam`.

Rocq’s ecosystem has several layers. Confusing these layers causes import errors, portability problems, and proof-maintenance issues.

| Layer               | Role                                            | Typical use                                                       | Professional caveat                                                 |
| ------------------- | ----------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| Rocq kernel/prover  | Checks terms and proofs                         | Core trust mechanism                                              | Not the same as library automation                                  |
| `Corelib`           | Extended prelude and core support               | Tactics, primitive bindings, minimal core infrastructure          | Usually not where ordinary list/arithmetic library work begins      |
| `Stdlib`            | General-purpose standard library                | `Nat`, `List`, `Bool`, arithmetic, relations, sorting, logic      | Must usually be imported explicitly                                 |
| Rocq Platform       | Curated prover + libraries/plugins distribution | Reliable installation and coherent package set                    | May target a platform baseline rather than newest standalone prover |
| External packages   | Community and domain libraries                  | Math, PL theory, separation logic, automation, extraction support | Version and convention compatibility matter                         |
| Build/package tools | `opam`, `dune`, `rocq` command family           | Dependency management and checking                                | Reproducibility is part of proof engineering                        |

The Rocq Platform is officially described as combining the core Rocq Prover with a coherent set of packages, plugins, and libraries, and it is based on `opam`; this makes it a practical ecosystem baseline rather than merely an installer.  The official installation page also recommends the Platform as an easy way to install Rocq with a consistent set of packages on major operating systems.

**Common Pitfalls:** Do not assume that a theorem exists in the prelude merely because it is basic. Many definitions and theorems require explicit `Stdlib` imports. Conversely, do not import large libraries casually; imports can add notations, hint databases, tactics, and instances.

### Task: Import Standard Library Modules Deliberately — `From Stdlib Require Import`

**Core keywords:** imports, `Require`, `Import`, `Stdlib`, qualified names, dependency hygiene.

The standard import pattern in modern Rocq code is explicit about the library root:

```coq
From Stdlib Require Import List Arith Lia.
Import ListNotations.
```

This command loads modules from `Stdlib`, while `Import ListNotations` brings list notation such as `[]`, `::`, and `[x; y]` into scope.

| Task                               | Command pattern                 | Example                            | Use when                       | Common pitfall                              |
| ---------------------------------- | ------------------------------- | ---------------------------------- | ------------------------------ | ------------------------------------------- |
| Load standard definitions/theorems | `From Stdlib Require Import M.` | `From Stdlib Require Import List.` | Need module contents           | Assuming names are available without import |
| Import notation                    | `Import M.`                     | `Import ListNotations.`            | Need notation syntax           | Forgetting notation import                  |
| Use qualified names                | `Module.name`                   | `Nat.add_comm`                     | Avoid ambiguity                | Verbose but clearer                         |
| Locate notation source             | `Locate`                        | `Locate "::".`                     | Debug parsing/printing         | Misreading overloaded notation              |
| Inspect theorem                    | `Check`, `About`                | `Check app_assoc.`                 | Verify statement before use    | Applying theorem with wrong orientation     |
| Search facts                       | `Search`                        | `Search (_ ++ [] = _).`            | Avoid re-proving library facts | Searching by vague English concept          |

Example:

```coq
From Stdlib Require Import List.
Import ListNotations.

Check map.
Check app.
Check app_assoc.
Check app_nil_r.
Search (_ ++ [] = _).
```

**Design meaning:** Imports are not passive text inclusion. They change the environment in which terms are elaborated and proofs are searched. In Rocq, import discipline is part of proof discipline.

**Common Pitfalls:** A proof that works because of a broad import may fail when the file is reorganized. Prefer explicit imports, qualified names for ambiguous constants, and local imports for notation-heavy regions.

### Task: Navigate Library Content — `Check`, `Print`, `Search`, `Locate`, `About`

**Core keywords:** library navigation, query commands, theorem search, notation search, source reading.

Professional Rocq development is interactive. Query commands are routine tools, not beginner conveniences.

| Need                    | Command            | Example                | What it tells you              | Failure prevented                  |
| ----------------------- | ------------------ | ---------------------- | ------------------------------ | ---------------------------------- |
| Know a term’s type      | `Check`            | `Check Nat.add_comm.`  | Exact theorem/function type    | Applying wrong theorem             |
| Inspect definition      | `Print`            | `Print nat.`           | Constructors/body/transparency | Misreading notation                |
| Search theorem database | `Search`           | `Search (_ + 0 = _).`  | Existing lemmas by pattern     | Re-proving facts                   |
| Locate notation         | `Locate`           | `Locate "+".`          | Notation source/scope          | Scope confusion                    |
| Inspect metadata        | `About`            | `About app_assoc.`     | Name, type, opacity, module    | Hidden assumptions/arguments       |
| Compute example         | `Compute` / `Eval` | `Compute map S [0;1].` | Reduction behavior             | Confusing computation with theorem |

Example workflow:

```coq
From Stdlib Require Import List Arith.
Import ListNotations.

Check Nat.add_0_r.
Check Nat.add_comm.
Search (_ + 0 = _).
Search (_ ++ _ = _ ++ _).
Locate "++".
```

**Professional rule:** Before proving a basic property about `nat`, `list`, `bool`, or `option`, search the library. Rocq’s standard library already contains many routine lemmas.

**Failure-first explanation:** The tempting mental model is “if I know the mathematical fact, I should prove it.” In a mature proof development, re-proving standard facts fragments the theorem base. The correct professional move is to search, inspect the exact statement, and reuse or wrap the theorem if its shape needs a project-specific name.

**Common Pitfalls:** `Search` works best with theorem shapes and symbols, not prose. Search for `(_ ++ [] = _)`, not “append identity”.

### Task: Use Natural Numbers and Arithmetic Libraries — `nat`, `Nat`, `Arith`, `lia`

**Core keywords:** `nat`, Peano arithmetic, `Nat`, `Arith`, `lia`, linear arithmetic.

Natural numbers in Rocq are mathematical Peano naturals. This is excellent for induction and proofs, but different from machine integers. Standard arithmetic theorems and tactics are essential.

| Task                             | Library/tool                  | Example        | Use when                         | Pitfall                           |
| -------------------------------- | ----------------------------- | -------------- | -------------------------------- | --------------------------------- |
| Basic natural-number definitions | `nat`, constructors `0`, `S`  | `S (S 0)`      | Structural arithmetic            | Assuming machine integer behavior |
| Common arithmetic lemmas         | `Nat.*`, `Arith`              | `Nat.add_comm` | Rewriting arithmetic facts       | Proving standard facts repeatedly |
| Linear arithmetic solving        | `lia`                         | `lia.`         | Linear arithmetic over `nat`/`Z` | Expecting nonlinear algebra       |
| Computation by reduction         | `simpl`, `cbn`, `reflexivity` | `0 + n = n`    | Definitional equalities          | Expecting all math to reduce      |
| Inductive arithmetic proofs      | `induction n`                 | `n + 0 = n`    | Recursive variable-headed facts  | Inducting on wrong variable       |

Example:

```coq
From Stdlib Require Import Arith Lia.

Theorem add_zero_right_std :
  forall n : nat, n + 0 = n.
Proof.
  intros n.
  apply Nat.add_0_r.
Qed.
```

Using `lia`:

```coq
From Stdlib Require Import Lia.

Theorem arithmetic_side_condition :
  forall n m : nat, n <= n + m.
Proof.
  intros n m.
  lia.
Qed.
```

`lia` is appropriate for linear arithmetic obligations. It is not a replacement for structural list/tree induction.

| Arithmetic goal          | Good approach                    | Bad approach                                |
| ------------------------ | -------------------------------- | ------------------------------------------- |
| `n + 0 = n`              | Use `Nat.add_0_r` or induction   | Expect `reflexivity` to solve arbitrary `n` |
| `n <= n + m`             | `lia`                            | Manual Peano induction unless pedagogical   |
| `length xs >= 0`         | `lia` after simplification       | Inducting unnecessarily                     |
| `length (xs ++ ys)`      | List induction or standard lemma | `lia` alone                                 |
| Multiplicative/ring goal | ring-style tactics if available  | `lia` for nonlinear algebra                 |

**Common Pitfalls:** `lia` solves arithmetic, not data-structure reasoning. If a goal contains `length (xs ++ ys)`, first use a list lemma such as `app_length`, then arithmetic automation may help.

### Task: Use Lists and Sequence Lemmas — `List`, `ListNotations`, append, map, filter

**Core keywords:** `List`, `list`, `[]`, `::`, `++`, `map`, `filter`, `length`.

Lists are one of Rocq’s most important standard data structures. They are also the first major proof-engineering training ground.

```coq
From Stdlib Require Import List.
Import ListNotations.
```

| Task           | Construct/API            | Typical theorem                      | Strategy                   | Common pitfall                            |
| -------------- | ------------------------ | ------------------------------------ | -------------------------- | ----------------------------------------- |
| Build list     | `[]`, `x :: xs`, `[x;y]` | constructor cases                    | `destruct`/`induction`     | Forgetting `ListNotations`                |
| Append         | `xs ++ ys` / `app`       | associativity, identity              | induction on first list    | Inducting on second list                  |
| Measure length | `length xs`              | append/map length                    | induction plus arithmetic  | Expecting `lia` to know list structure    |
| Transform      | `map f xs`               | map composition, length              | induction on list          | Function-equality confusion               |
| Filter         | `filter p xs`            | soundness/completeness wrt predicate | induction + boolean bridge | Confusing `A -> bool` and `A -> Prop`     |
| Reverse        | `rev xs`                 | reverse involution                   | helper lemmas              | Trying direct proof without strengthening |
| Membership     | `In x xs`                | membership after append/map/filter   | induction and destruct     | Ignoring proposition/boolean distinction  |

Example using standard list lemmas:

```coq
From Stdlib Require Import List.
Import ListNotations.

Theorem append_identity_using_stdlib :
  forall (A : Type) (xs : list A),
    xs ++ [] = xs.
Proof.
  intros A xs.
  apply app_nil_r.
Qed.
```

Map length:

```coq
Theorem map_length_using_stdlib :
  forall (A B : Type) (f : A -> B) (xs : list A),
    length (map f xs) = length xs.
Proof.
  intros A B f xs.
  apply map_length.
Qed.
```

**Design meaning:** The list library embodies many recurring induction patterns. Learning its lemmas is not optional; it is a way to avoid fragile custom proofs.

**Common Pitfalls:** Standard theorem names may not match a learner’s preferred names. Use `Search` by theorem shape. For example:

```coq
Search (length (map _ _) = length _).
Search (_ ++ [] = _).
Search ((_ ++ _) ++ _ = _ ++ (_ ++ _)).
```

### Task: Use Booleans Correctly — `bool`, boolean operations, reflection boundaries

**Core keywords:** `bool`, `true`, `false`, `andb`, `orb`, `negb`, boolean equality, reflection.

Booleans are computational data. They are used for executable decisions, validators, and branch conditions. They are not the same as propositions.

| Task                | Boolean construct       | Prop-level counterpart            | Bridge need                              |          |                               |
| ------------------- | ----------------------- | --------------------------------- | ---------------------------------------- | -------- | ----------------------------- |
| Branch computation  | `if b then x else y`    | case distinction over proposition | Need decidability if proposition-driven  |          |                               |
| Negate boolean      | `negb b`                | `~ P`                             | Need theorem relating `b = true` and `P` |          |                               |
| Boolean conjunction | `andb b c` / `b && c`   | `P /\ Q`                          | Soundness/completeness lemmas            |          |                               |
| Boolean disjunction | `orb b c` / `b          |                                   | c`                                       | `P \/ Q` | Soundness/completeness lemmas |
| Equality test       | `Nat.eqb`, custom `eqb` | `x = y`                           | Equality correctness lemma               |          |                               |
| Validator           | `A -> bool`             | `A -> Prop`                       | Specification theorem                    |          |                               |

Example:

```coq
Theorem negb_involutive_std :
  forall b : bool, negb (negb b) = b.
Proof.
  intros b.
  destruct b; reflexivity.
Qed.
```

Boolean-to-proposition bridge for a custom predicate:

```coq
Definition is_true_bool (b : bool) : Prop :=
  b = true.
```

A more meaningful bridge usually relates a boolean function to a domain proposition:

```coq
Definition is_zero (n : nat) : bool :=
  match n with
  | 0 => true
  | S _ => false
  end.

Definition IsZero (n : nat) : Prop :=
  n = 0.
```

```coq
Theorem is_zero_sound :
  forall n, is_zero n = true -> IsZero n.
Proof.
  intros n H.
  destruct n as [| n'].
  - reflexivity.
  - simpl in H. discriminate H.
Qed.
```

**Common Pitfalls:** A boolean theorem such as `p x = true` is not syntactically the same as a proposition `P x`. Use bridge lemmas deliberately. In proof-heavy libraries, boolean reflection styles may provide more systematic bridges, but those styles require learning the local ecosystem conventions.

### Task: Use Options and Partial Computation — `option`, `Some`, `None`

**Core keywords:** `option`, `Some`, `None`, lookup, partiality, safe failure.

`option A` is the standard lightweight representation for a computation that may not return an `A`.

| Task                        | API pattern                  | Example                 | Theorem shape                    |
| --------------------------- | ---------------------------- | ----------------------- | -------------------------------- |
| Safe lookup                 | `K -> map -> option V`       | `lookup k m`            | `lookup_update_eq`               |
| Safe indexing               | `nat -> list A -> option A`  | `nth_error xs n`        | success/failure characterization |
| Parser maybe succeeds       | `tokens -> option ast`       | simple parser           | soundness for `Some ast`         |
| Extract default             | `option A -> A` with default | `match o with ...`      | default behavior theorem         |
| Chain optional computations | match on option              | parser/checker pipeline | success theorem by cases         |

Example:

```coq
From Stdlib Require Import List.
Import ListNotations.

Definition head_opt {A : Type} (xs : list A) : option A :=
  match xs with
  | [] => None
  | x :: _ => Some x
  end.
```

Specification theorem:

```coq
Theorem head_opt_some :
  forall (A : Type) (x : A) (xs : list A),
    head_opt (x :: xs) = Some x.
Proof.
  intros A x xs.
  reflexivity.
Qed.
```

Failure theorem:

```coq
Theorem head_opt_none :
  forall A : Type,
    head_opt (@nil A) = None.
Proof.
  intros A.
  reflexivity.
Qed.
```

**Design tradeoff:**

| Representation     | Benefit                    | Cost                        |
| ------------------ | -------------------------- | --------------------------- |
| `option A`         | Simple, total, extractable | No failure reason           |
| `result E A`       | Explains failure           | More constructors and specs |
| Precondition proof | Invalid call impossible    | Harder to call              |
| Relation           | Flexible semantic failure  | Less directly executable    |

**Common Pitfalls:** If failure reasons matter to clients, `option` is too weak. Use a custom result type and prove error-behavior theorems.

### Task: Use Equality Libraries and Rewriting — equality, `rewrite`, setoid rewriting

**Core keywords:** equality, `eq`, `rewrite`, `reflexivity`, `symmetry`, `transitivity`, setoid rewriting.

Equality is central to Rocq proof development. Standard libraries provide many equality and rewriting tools, but the basic mental model remains definitional equality versus propositional equality.

| Task                        | Tool/tactic                 | Example                             | Use when                         | Pitfall                      |
| --------------------------- | --------------------------- | ----------------------------------- | -------------------------------- | ---------------------------- |
| Close definitional equality | `reflexivity`               | `0 + n = n` after reduction         | Both sides convertible           | Expecting algebraic facts    |
| Rewrite by equality         | `rewrite H`                 | use `H : x = y`                     | Propositional equality available | Wrong direction              |
| Reverse equality            | `symmetry` / `rewrite <- H` | `y = x` from `x = y`                | Goal orientation wrong           | Reversing too much           |
| Chain equality              | `transitivity`              | intermediate term                   | Calculation proof                | Oververbose for simple goals |
| Use congruence              | `congruence`                | constructor/equality contradictions | Routine equality reasoning       | Hiding proof idea            |
| Generalized rewriting       | `setoid_rewrite`            | equivalence relations               | Advanced algebraic contexts      | Overcomplication             |

Example:

```coq
Theorem equality_chain :
  forall a b c : nat,
    a = b -> b = c -> a = c.
Proof.
  intros a b c Hab Hbc.
  rewrite Hab.
  exact Hbc.
Qed.
```

Alternative:

```coq
Theorem equality_chain_trans :
  forall a b c : nat,
    a = b -> b = c -> a = c.
Proof.
  intros a b c Hab Hbc.
  transitivity b.
  - exact Hab.
  - exact Hbc.
Qed.
```

**Common Pitfalls:** Rewriting is typed replacement, not textual substitution. If `rewrite H` fails, inspect whether the goal contains the correct side of `H`, whether implicit arguments match, and whether a conversion/simplification step is needed first.

### Task: Use Propositional Logic Library Patterns — conjunction, disjunction, existence, negation

**Core keywords:** `Prop`, `/\`, `\/`, `exists`, `False`, `True`, negation.

Although much elementary logic can be proved directly, standard libraries and automation can help. Still, the central proof patterns should remain explicit early in a development.

| Logic form      | Constructor/proof tactic         | Destructor/use tactic   | Common theorem              |               |
| --------------- | -------------------------------- | ----------------------- | --------------------------- | ------------- |
| `A /\ B`        | `split`                          | `destruct H as [HA HB]` | commutativity/associativity |               |
| `A \/ B`        | `left` / `right`                 | `destruct H as [HA      | HB]`                        | commutativity |
| `exists x, P x` | `exists w`                       | `destruct H as [x HP]`  | witness extraction          |               |
| `A -> B`        | `intros HA`                      | `apply H`               | implication composition     |               |
| `~ A`           | `intros HA; ... False`           | apply to proof of `A`   | contradiction               |               |
| `False`         | impossible to construct normally | `destruct H`            | explosion principle         |               |
| `True`          | `constructor` / `trivial`        | rarely informative      | trivial obligation          |               |

Example:

```coq
Theorem exists_and_project :
  forall (A : Type) (P Q : A -> Prop),
    (exists x, P x /\ Q x) -> exists x, P x.
Proof.
  intros A P Q H.
  destruct H as [x [HP HQ]].
  exists x.
  exact HP.
Qed.
```

**Design meaning:** These patterns are library-independent core proof skills. Automation can solve many such goals, but explicit scripts communicate constructive evidence flow.

**Common Pitfalls:** `A \/ B` and `exists x, P x` require evidence. Do not expect classical-style indirect arguments unless classical assumptions or decidability lemmas are in scope.

### Task: Use Relations and Orders — `relation`, `le`, equivalence, closure patterns

**Core keywords:** relations, orders, equivalence, reflexivity, transitivity, rewriting under relations.

Many Rocq libraries are relation-oriented. Relations appear in order theory, operational semantics, rewriting, program refinement, and algebraic structures.

| Task            | Representation                          | Typical theorem                | Proof pattern                 |
| --------------- | --------------------------------------- | ------------------------------ | ----------------------------- |
| Binary relation | `A -> A -> Prop`                        | reflexive/transitive/symmetric | unfold and use hypotheses     |
| Order           | `le`, custom `R`                        | monotonicity                   | arithmetic or induction       |
| Equivalence     | reflexive/symmetric/transitive relation | rewriting under relation       | setoid machinery              |
| Evaluation step | `state -> state -> Prop`                | determinism/progress           | induction/inversion           |
| Closure         | reflexive-transitive closure            | reachability                   | induction on closure evidence |

Simple relation definition:

```coq
Definition reflexive {A : Type} (R : A -> A -> Prop) : Prop :=
  forall x : A, R x x.

Definition transitive {A : Type} (R : A -> A -> Prop) : Prop :=
  forall x y z : A, R x y -> R y z -> R x z.
```

Example theorem:

```coq
Theorem equality_reflexive :
  forall A : Type, reflexive (@eq A).
Proof.
  intros A x.
  reflexivity.
Qed.
```

**Common Pitfalls:** Relations are not functions. A relation may have zero, one, or many outputs for a given input. This is why relations are better for nondeterministic semantics but less directly executable.

### Task: Use Strings, Characters, and Text Carefully — secondary but important

**Core keywords:** strings, characters, parsing, notation, extraction.

Text processing is not Rocq’s central strength, but strings and characters appear in parsers, syntax formalizations, extraction boundaries, and examples.

| Task                   | Typical approach                         | Use when                 | Pitfall                              |
| ---------------------- | ---------------------------------------- | ------------------------ | ------------------------------------ |
| Symbolic names         | strings or identifiers as inductive data | simple syntax models     | String equality proofs can distract  |
| Parser input           | list of tokens rather than raw string    | verified parser          | Tokenizer boundary may be unverified |
| Pretty printing        | extracted code or external tooling       | user-facing output       | Usually outside core proof           |
| Formal language syntax | inductive tokens/AST                     | PL theory                | Avoid overusing raw strings          |
| Error messages         | custom error inductive                   | certified checker/parser | Strings may be irrelevant to proof   |

**Professional rule:** For formalized syntax and semantics, prefer inductive tokens and ASTs over raw strings when possible. Use strings at external boundaries or for lightweight examples.

**Common Pitfalls:** Verifying a parser over token lists does not verify the lexer unless tokenization is also formalized and proved correct.

### Task: Use Standard Library Theorems Without Losing Proof Intent

**Core keywords:** theorem reuse, wrapper lemmas, proof intent, local naming.

Sometimes a standard theorem has the right content but not the right name or shape for a local API. In that case, wrap it.

Example wrapper:

```coq
From Stdlib Require Import List.
Import ListNotations.

Theorem stack_push_pop_list_behavior :
  forall (x : nat) (xs : list nat),
    match x :: xs with
    | [] => None
    | y :: ys => Some (y, ys)
    end = Some (x, xs).
Proof.
  intros x xs.
  reflexivity.
Qed.
```

More typical wrapping:

```coq
Theorem append_empty_right :
  forall (A : Type) (xs : list A),
    xs ++ [] = xs.
Proof.
  intros A xs.
  apply app_nil_r.
Qed.
```

| Reuse strategy                  | When to use                     | Benefit                  | Cost                         |
| ------------------------------- | ------------------------------- | ------------------------ | ---------------------------- |
| Directly apply standard theorem | Statement matches goal          | Minimal code             | Name may be library-specific |
| Rewrite with standard theorem   | Goal contains matching subterm  | Efficient proof          | Need correct direction       |
| Wrap theorem locally            | API wants project-specific name | Stable client vocabulary | Extra theorem names          |
| Reprove theorem                 | Pedagogy or custom variant      | Learning/control         | Duplicates library           |
| Add hint                        | Routine use in automation       | Short proofs             | Hidden dependency            |

**Common Pitfalls:** Wrapping is good when it clarifies API behavior. Reproving standard facts under many names is usually bad library hygiene.

### Task: Understand Standard Library Versus External Library Style

**Core keywords:** Stdlib, MathComp-style libraries, automation libraries, convention differences.

Rocq’s `Stdlib` is not the only important library ecosystem. External libraries may use different naming conventions, proof styles, algebraic hierarchies, notations, and automation patterns. The official documentation notes that many other libraries are provided by the Rocq user community and that many are packaged in Nix or `opam`.

| Ecosystem style           | Common traits                                                 | Benefit                            | Cost                                            |
| ------------------------- | ------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------- |
| `Stdlib`-oriented         | Direct tactics, standard names, broad general-purpose modules | Good baseline, widely recognizable | Some naming/theory organization can feel uneven |
| Boolean reflection style  | Boolean computation tightly linked to propositions            | Powerful decidable reasoning       | Requires learning reflection idioms             |
| Algebraic hierarchy style | Structured laws and inference                                 | Reusable mathematics               | Steep abstraction curve                         |
| Automation-heavy style    | Solvers and custom tactics                                    | Fast routine proof                 | Opaque dependencies                             |
| PL-theory style           | Inductive syntax/relations, preservation/progress             | Clear semantic proofs              | Large proof scripts                             |
| Separation-logic style    | Resource assertions, tactics, invariants                      | Systems verification               | Specialized logic and tooling                   |

**Professional rule:** Follow the local library’s proof culture. Mixing styles casually can create awkward statements and proof scripts.

**Common Pitfalls:** A theorem written in a `Stdlib` style may be inconvenient in a MathComp-style development, and vice versa. The issue is not correctness but ecosystem compatibility.

### Task: Use Documentation and Online Library Browsing

**Core keywords:** documentation, Reference Manual, Stdlib Manual, theory browser, package docs.

The official Rocq documentation portal links to the Rocq Reference Manual, Corelib theories, Stdlib manual, Stdlib theories, and Platform package documentation.  The release page for `9.2.0` similarly links to the manual and theory documentation for the current prover release.

| Documentation source | Use for                                            | Professional habit                     |
| -------------------- | -------------------------------------------------- | -------------------------------------- |
| Reference Manual     | Language, tactics, commands, libraries, extraction | Check semantics and command behavior   |
| Corelib theories     | Core definitions and support                       | Inspect minimal infrastructure         |
| Stdlib Manual        | Standard library modules and concepts              | Learn available APIs                   |
| Stdlib Theories      | Exact theorem names and statements                 | Search/browse reusable lemmas          |
| Platform docs        | Curated package ecosystem                          | Understand installed libraries/plugins |
| Package docs         | External library-specific conventions              | Follow local style                     |

**Common Pitfalls:** Tutorials often use older Coq-era names. When reading older material, translate names and imports carefully into current Rocq/`Stdlib` conventions where appropriate.

### Interim Standard-Library Decision Table — PART 6, Part 1

**Core keywords:** decision table, library task, module, theorem reuse.

| Task                  | First place to look         | Common construct/tool                 | Decision rule                              | Pitfall                                 |
| --------------------- | --------------------------- | ------------------------------------- | ------------------------------------------ | --------------------------------------- |
| Arithmetic over `nat` | `Nat`, `Arith`, `Lia`       | `Nat.add_comm`, `lia`                 | Use lemmas/automation for arithmetic facts | Expecting `lia` to solve list structure |
| List processing       | `List`, `ListNotations`     | `++`, `map`, `filter`, `length`       | Search before proving                      | Inducting on wrong list                 |
| Boolean decisions     | `Bool`, boolean functions   | `negb`, `andb`, `orb`, `eqb`          | Use booleans for computation               | Confusing with `Prop`                   |
| Optional failure      | `option` definitions/lemmas | `Some`, `None`, match                 | Use for failure without explanation        | Losing error information                |
| Equality reasoning    | equality tactics/lemmas     | `rewrite`, `symmetry`, `transitivity` | Distinguish computation from proposition   | Wrong rewrite direction                 |
| Logic reasoning       | core propositions/tactics   | `/\`, `\/`, `exists`, `False`         | Construct evidence explicitly              | Assuming classical principles           |
| Relations/orders      | relation modules/patterns   | `A -> A -> Prop`                      | Use for semantics/orders/refinement        | Treating relation as function           |
| Library navigation    | query commands              | `Check`, `Search`, `Locate`, `Print`  | Inspect before proving                     | Guessing theorem names                  |
| Notation debugging    | scopes/location tools       | `Locate`, `Open Scope`                | Check underlying constants                 | Misreading overloaded symbols           |
| External libraries    | package docs/Platform/opam  | library-specific imports              | Follow local conventions                   | Mixing proof cultures                   |

### Common Pitfalls in Standard Library Use

**Core keywords:** library pitfalls, imports, notation, theorem reuse, automation.

| Pitfall                          | Why it happens                                  | Better practice                    |
| -------------------------------- | ----------------------------------------------- | ---------------------------------- |
| Re-proving standard facts        | The theorem name is unknown                     | Use `Search` by shape              |
| Importing too broadly            | Convenience during interactive work             | Narrow imports in library files    |
| Forgetting notation imports      | Definitions loaded but syntax unavailable       | Import notation modules explicitly |
| Misreading notation              | Same symbol in different scopes                 | Use `Locate` and `Check`           |
| Using `lia` for structural goals | Arithmetic solver cannot inspect recursive data | Rewrite structural lemmas first    |
| Treating `bool` as `Prop`        | Computation/specification confusion             | Prove bridge lemmas                |
| Overusing qualified names        | Clarity becomes verbosity                       | Use local imports where safe       |
| Underusing qualified names       | Ambiguity and wrong theorem use                 | Qualify when names conflict        |
| Depending on hidden hints        | `auto` proof relies on imports                  | Name key lemmas explicitly         |
| Mixing library styles            | Different conventions collide                   | Follow the dominant library style  |

### Task: Use Proof Automation Libraries and Tactics Deliberately — `auto`, `eauto`, `lia`, `ring`, `congruence`, domain tactics

**Core keywords:** automation, decision procedures, proof search, arithmetic solvers, maintainability.

Rocq’s ecosystem includes both elementary tactics and more powerful automatic solvers. The Reference Manual frames proof mode, automatic solvers, programmable tactics, and tactic languages as central parts of Rocq practice; it also emphasizes that the kernel performs final proof verification even when proofs are tactic-generated.

| Task                                     | Typical tactic/tool                       | Best use                                             | Hidden cost                             | Common misuse                     |
| ---------------------------------------- | ----------------------------------------- | ---------------------------------------------------- | --------------------------------------- | --------------------------------- |
| Solve trivial propositional goals        | `auto`                                    | Routine implications, assumptions, constructors      | Depends on hint database                | Hiding central proof idea         |
| Search with existential variables        | `eauto`                                   | Routine goals needing instantiation                  | Search can become slow or unpredictable | Using it without bounding search  |
| Linear arithmetic over naturals/integers | `lia`                                     | Goals over `nat`, `Z`, linear equations/inequalities | Does not solve structural data facts    | Expecting it to prove list lemmas |
| Algebraic ring normalization             | `ring`                                    | Polynomial equalities over ring-like structures      | Requires suitable algebraic setting     | Using it for non-ring reasoning   |
| Equality contradictions                  | `congruence`, `discriminate`, `inversion` | Constructor/equality contradictions                  | Can obscure contradiction source        | Applying blindly                  |
| Propositional tautologies                | `tauto`, related tactics                  | Pure propositional logic                             | May hide constructive structure         | Using when witness choice matters |
| Domain-specific proof automation         | library-specific tactics                  | Repeated domain proof patterns                       | Library convention dependency           | Mixing styles casually            |
| Custom proof scripts                     | `Ltac`, `Ltac2`, plugins                  | Reusable local proof patterns                        | Another code layer to maintain          | One-line opaque proofs            |

Example: arithmetic side condition.

```coq
From Stdlib Require Import Lia.

Theorem le_plus_right :
  forall n m : nat, n <= n + m.
Proof.
  intros n m.
  lia.
Qed.
```

Example: structural proof where automation alone is not the core.

```coq
From Stdlib Require Import List.
Import ListNotations.

Theorem app_nil_r_explicit :
  forall (A : Type) (xs : list A), xs ++ [] = xs.
Proof.
  intros A xs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl. rewrite IHxs. reflexivity.
Qed.
```

Here `lia` is irrelevant because the proof is not primarily arithmetic. The proof follows the recursive structure of `++`.

**Design tradeoff:**

| Automation strategy    | Capability gained                  | Cost introduced                  | Professional rule                        |
| ---------------------- | ---------------------------------- | -------------------------------- | ---------------------------------------- |
| Explicit tactic proof  | Clear proof structure              | More lines                       | Use for central arguments                |
| Local automation       | Shorter routine leaves             | Slight opacity                   | Use after exposing induction/invariant   |
| Global hint automation | Scales repeated proofs             | Hidden dependencies              | Scope and document hints                 |
| Heavy solver use       | High productivity in target domain | Less explanatory proof scripts   | Use for stable, well-understood subgoals |
| Custom tactics         | Eliminates repetition              | Maintenance and debugging burden | Encode boring patterns, not main ideas   |

**Common Pitfalls:** A proof that is just `auto.` may be correct but unreviewable. If the theorem is conceptually important, expose the induction target, witness, rewrite lemma, or invariant explicitly.

### Task: Use Rewriting Ecosystems — rewrite lemmas, hint databases, normalization

**Core keywords:** rewriting, rewrite databases, normalization, `rewrite`, `autorewrite`, public behavior lemmas.

Rewriting is a standard-library and ecosystem practice, not merely a tactic. Large developments often organize public behavior through rewrite lemmas and sometimes rewrite databases.

| Task                     | Tool/pattern          | Use when                   | Pitfall                              |
| ------------------------ | --------------------- | -------------------------- | ------------------------------------ |
| Rewrite one fact         | `rewrite H`           | Local equality proof       | Wrong direction                      |
| Rewrite standard theorem | `rewrite app_nil_r`   | Known library behavior     | Theorem shape mismatch               |
| Repeat rewrite           | `repeat rewrite ...`  | Several occurrences        | Proof can become brittle             |
| Use database             | `autorewrite with db` | Stable normalization set   | Rewrite loops or hidden dependencies |
| Rewrite in hypothesis    | `rewrite H in H2`     | Transform local assumption | Destroying useful old form           |
| Avoid unfolding          | rewrite public lemma  | Preserve abstraction       | Requires lemma design                |

Example:

```coq
From Stdlib Require Import List.
Import ListNotations.

Theorem normalize_append_example :
  forall (A : Type) (xs ys : list A),
    (xs ++ []) ++ ys = xs ++ ys.
Proof.
  intros A xs ys.
  rewrite app_nil_r.
  reflexivity.
Qed.
```

A project-specific rewrite lemma can express public behavior:

```coq
Theorem append_empty_right_public :
  forall (A : Type) (xs : list A), xs ++ [] = xs.
Proof.
  intros A xs.
  apply app_nil_r.
Qed.
```

**Professional rule:** A rewrite database should contain facts that are safe to apply repeatedly and move terms toward a normal form. Avoid adding symmetric or bidirectional facts that can loop.

**Common Pitfalls:** Rewriting by implementation details leaks abstraction. Prefer rewriting by public theorems such as `lookup_update_eq`, `map_length`, or `eval_sound`.

### Task: Use Programmable Tactics Carefully — `Ltac`, `Ltac2`, plugins, metaprogramming

**Core keywords:** `Ltac`, `Ltac2`, custom tactics, metaprogramming, proof automation.

Rocq supports tactic languages and programmable proof automation; the current Reference Manual explicitly distinguishes proof mode, automatic solvers, programmable tactics, and new tactic languages as core parts of practical Rocq use.

| Automation layer              | Role                               | Good use                                  | Risk                                 |
| ----------------------------- | ---------------------------------- | ----------------------------------------- | ------------------------------------ |
| Built-in tactics              | Basic proof construction           | `intros`, `apply`, `rewrite`, `induction` | Misuse by goal-shape mismatch        |
| Decision tactics              | Domain solvers                     | `lia`, `ring`, `congruence`               | Hides routine but relevant reasoning |
| `Ltac`                        | Script proof-state patterns        | Local repeated proof idioms               | Fragile name/goal dependence         |
| `Ltac2`                       | More structured tactic programming | Larger tactic abstractions                | Requires separate learning           |
| OCaml plugins                 | Extend Rocq with compiled tooling  | Domain-specific automation                | Trust/tooling boundary               |
| External automation libraries | Powerful proof search              | Large domains                             | Version and convention dependency    |

Small tactic example:

```coq
Ltac break_bool :=
  repeat match goal with
  | b : bool |- _ => destruct b; simpl in *
  end; try reflexivity; try discriminate.
```

Use:

```coq
Theorem negb_involutive_by_tactic :
  forall b : bool, negb (negb b) = b.
Proof.
  intros b.
  break_bool.
Qed.
```

**Design meaning:** A tactic is a program over proof states. It should be maintained like code. A tactic that works today because of generated names, current goal order, or accidental imports may fail after minor refactoring.

**Common Pitfalls:** Do not create a custom tactic for a proof pattern used once. Do not hide the main induction or semantic argument inside an unnamed proof-search procedure.

### Task: Build Rocq Projects — `rocq` command family, `_CoqProject`, `dune`, `rocq dep`

**Core keywords:** build system, `rocq compile`, `rocq repl`, `_CoqProject`, `dune`, dependency graph, logical paths.

Rocq project building is part of professional proof engineering. The Reference Manual’s project-building documentation covers configuration, installing Rocq packages with `opam`, setting up projects, `_CoqProject`, logical paths and load paths, project building with Rocq makefile, Dune, and dependency computation with `rocq dep`.

| Task                         | Tool/workflow                     | Purpose                          | Professional concern                        |
| ---------------------------- | --------------------------------- | -------------------------------- | ------------------------------------------- |
| Interactive exploration      | `rocq repl` or editor integration | Develop and inspect proof states | Not enough for reproducible builds          |
| Batch checking               | `rocq compile` or build system    | Compile/check `.v` files         | Must match CI environment                   |
| Dependency computation       | `rocq dep`                        | Determine module dependencies    | Necessary for correct build order           |
| Legacy/simple project config | `_CoqProject`                     | Logical paths and options        | Must be maintained carefully                |
| Larger project build         | `dune`                            | Build orchestration              | Requires correct stanza/project setup       |
| Package environment          | `opam` switch                     | Versioned dependencies           | Pin versions                                |
| Curated setup                | Rocq Platform                     | Stable package collection        | May lag standalone prover                   |
| CI proof checking            | full project build                | Regression detection             | Should reject admissions if policy requires |

A source file that works interactively is not necessarily a reproducible project. Reproducibility depends on paths, imports, package versions, build flags, and dependency order.

**Common Pitfalls:** Manually checking files in an editor can hide dependency-order problems. Professional projects should be buildable from a clean environment.

### Task: Use `dune` for Larger Developments — theories, plugins, package boundaries

**Core keywords:** `dune`, Rocq build language, theories, plugins, public libraries.

Dune documents a Rocq project as a `dune-project` containing Rocq theories and plugins, and it treats a Rocq plugin as an OCaml library that Rocq can dynamically load; such plugins need to be public libraries in Dune’s sense because they are located using `ocamlfind`.

| Dune-related task    | Why it matters                                | Practical consequence             |
| -------------------- | --------------------------------------------- | --------------------------------- |
| Define a Rocq theory | Organize `.v` files under a logical namespace | Stable imports                    |
| Build many files     | Dune handles dependency graph                 | Avoid manual order errors         |
| Integrate plugins    | Plugins are OCaml libraries loaded by Rocq    | Adds toolchain/trust boundary     |
| Package project      | Metadata and public names matter              | Downstream users can depend on it |
| CI integration       | Dune command can recheck full development     | Reproducible proof checking       |

**Design tradeoff:**

| Build approach                 | Benefit                               | Cost                                  |
| ------------------------------ | ------------------------------------- | ------------------------------------- |
| Manual file checking           | Simple for tiny examples              | Not reproducible at scale             |
| `_CoqProject` / makefile style | Traditional and direct                | Can become harder to maintain         |
| Dune                           | Integrated OCaml/Rocq build ecosystem | Requires learning Dune configuration  |
| Platform scripts/installers    | Consistent package set                | Less flexible than custom opam switch |

**Common Pitfalls:** A plugin is not just another `.v` library. It crosses into compiled OCaml tooling and therefore has a different maintenance and trust profile.

### Task: Manage Packages and Versions — `opam`, Rocq Platform, pins, switches

**Core keywords:** `opam`, switches, Rocq Platform, package versions, compatibility.

Rocq package management is usually tied to `opam`; the official Platform page says the Platform is based on the OCaml package manager `opam` and provides scripts/installers for reliable, consistent installation across major operating systems.  The Rocq Platform packages page also distinguishes package levels and identifies “full level” packages as stable, well-maintained, and suitable as a basis for users’ own developments.

| Package task             | Tool/pattern               | Use when                        | Risk                         |
| ------------------------ | -------------------------- | ------------------------------- | ---------------------------- |
| Isolate environment      | `opam switch`              | Different Rocq/library versions | Switch drift                 |
| Install curated set      | Rocq Platform              | Stable general setup            | May not use newest prover    |
| Install specific package | `opam install ...`         | Project dependency              | Version incompatibility      |
| Pin version              | `opam pin` / lock strategy | Reproducible project            | Stale dependencies           |
| Upgrade project          | controlled switch update   | Migration to newer Rocq         | Proof breakage               |
| Parallel versions        | separate switches          | Maintain old/new developments   | Confusing active environment |

**Professional rule:** Record the exact prover version, platform/package baseline, and external library versions. A proof development is a checked artifact only relative to the environment in which it was checked.

**Common Pitfalls:** “It works on my machine” is especially weak for Rocq. A small version change can alter notations, theorem names, tactic behavior, or library paths.

### Task: Use Editor and LSP Workflows — interactive proof states, source navigation, feedback

**Core keywords:** editor integration, proof state, LSP, source navigation, interactive proving.

Rocq is an interactive theorem prover, so editor integration is more central than in many ordinary programming languages. The official documentation classifies command-line and graphical tools as part of practical Rocq use.

| Workflow need        | Tooling category                          | Why it matters                  |
| -------------------- | ----------------------------------------- | ------------------------------- |
| Step through proof   | editor proof interface / REPL             | Inspect goals after each tactic |
| Navigate definitions | source browser, editor jump-to-definition | Understand imported theorems    |
| Inspect goals        | proof-state panel                         | Choose tactics by goal shape    |
| Query terms          | `Check`, `Search`, `Locate` interactively | Avoid guessing                  |
| Build entire project | CLI/build system                          | Ensure file-level correctness   |
| Diagnose imports     | load-path/build tooling                   | Resolve unknown modules         |
| Maintain large files | LSP/editor diagnostics                    | Faster feedback                 |

**Professional rule:** Use interactive tools for proof development, but use batch builds or CI for validation. Interactive success in one buffer is not a substitute for full project checking.

**Common Pitfalls:** Proof scripts written only through trial-and-error in an editor often become brittle. After making a proof work, simplify it so that the structure is reviewable.

### Task: Generate and Maintain Documentation — `rocqdoc`-style output, comments, API theorems

**Core keywords:** documentation, theorem API, comments, generated docs, library surface.

Documentation in Rocq is not only prose. The theorem names, module structure, notation choices, and exported lemmas are part of documentation. The official docs portal separates manuals, theory documentation, and package documentation, reflecting the importance of exact theorem/API browsing.

| Documentation artifact | What it communicates                  | Good practice                                        |
| ---------------------- | ------------------------------------- | ---------------------------------------------------- |
| Module names           | Conceptual organization               | Keep namespaces meaningful                           |
| Definition names       | API role                              | Avoid cryptic local abbreviations for public objects |
| Theorem names          | Reusable behavior                     | Name by behavior, not proof method                   |
| Comments               | Proof intent and boundary assumptions | Explain non-obvious invariants                       |
| Generated docs         | Public theory surface                 | Keep exported API clean                              |
| Examples               | Canonical usage                       | Avoid examples that depend on private internals      |
| Assumption notes       | Trust boundary                        | Document axioms/admissions/classical imports         |

Example naming contrast:

| Weak name    | Better name               | Reason                       |
| ------------ | ------------------------- | ---------------------------- |
| `lemma1`     | `lookup_update_eq`        | States behavior              |
| `correct`    | `sort_sorted_permutation` | Names correctness components |
| `helper`     | `rev_acc_correct`         | Reveals invariant            |
| `H1_theorem` | `filter_sound`            | Searchable and meaningful    |

**Common Pitfalls:** A library whose theorem names are not searchable becomes hard to use even if all proofs are correct.

### Task: Test, Check, and Audit Proof Developments — examples, computations, theorem checks, CI

**Core keywords:** examples, `Compute`, theorem checking, CI, admissions audit.

Rocq proofs are stronger than tests, but examples and computations remain useful during development. They help explore definitions, catch bad specifications, and guide theorem statements.

| Development check     | Tool/pattern             | Purpose                          | Limitation                         |
| --------------------- | ------------------------ | -------------------------------- | ---------------------------------- |
| Compute example       | `Compute`, `Eval`        | Understand reduction behavior    | Not a theorem                      |
| Small example theorem | `Example`                | Check intended behavior formally | Specific case only                 |
| General theorem       | `Theorem`, `Lemma`       | Universal property               | Depends on statement adequacy      |
| Search existing facts | `Search`                 | Avoid duplicate proof            | Requires good theorem pattern      |
| Admission audit       | search for `Admitted`    | Track trust debt                 | Needs policy                       |
| Axiom audit           | inspect assumptions      | Track foundation                 | Requires review                    |
| Full build            | CLI/Dune/CI              | Recheck all files                | Environment-dependent              |
| Extraction smoke test | generated code build/run | Catch integration issues         | Does not prove wrapper correctness |

Example:

```coq
Definition triple (n : nat) : nat := n + n + n.

Example triple_2_example :
  triple 2 = 6.
Proof.
  reflexivity.
Qed.

Theorem triple_zero :
  triple 0 = 0.
Proof.
  reflexivity.
Qed.
```

These examples are useful, but a real specification would state a general property if one is needed.

**Common Pitfalls:** Examples can reveal specification mistakes but cannot replace universal correctness theorems. Conversely, a theorem can be formally proved but still be the wrong theorem.

### Task: Use Extraction Ecosystem — extraction commands, OCaml/Haskell/Scheme targets, certified core

**Core keywords:** extraction, OCaml, Haskell, Scheme, certified programs, proof erasure.

The Rocq extraction documentation says extraction commands are used to build certified and relatively efficient functional programs from Rocq functions or proofs of specifications, and it lists OCaml, Haskell, and Scheme as available output languages.

| Extraction task             | Rocq-side artifact                      | Target-side concern      | Boundary                           |
| --------------------------- | --------------------------------------- | ------------------------ | ---------------------------------- |
| Extract pure function       | `Definition` / `Fixpoint`               | Target code generation   | Extraction correctness assumptions |
| Extract certified algorithm | function + correctness theorem          | Runtime integration      | Theorem covers source model        |
| Erase proofs                | `Prop` content usually not runtime data | No runtime proof checks  | Proofs not dynamic validators      |
| Integrate with I/O          | wrapper in target language              | External effects         | Outside theorem unless modeled     |
| Use target libraries        | extracted calls/mappings                | Library behavior trusted | External assumption                |
| Optimize extracted code     | extraction mappings/target tuning       | Performance              | Must not overclaim proof           |

Schematic extraction-oriented pattern:

```coq
Definition verified_double (n : nat) : nat :=
  n + n.

Theorem verified_double_spec :
  forall n, verified_double n = n + n.
Proof.
  intros n.
  reflexivity.
Qed.
```

A correctness claim should be phrased carefully: the Rocq function satisfies `verified_double_spec`; extracted code corresponds to the computational content under extraction assumptions; external target-runtime behavior is a separate boundary.

**Common Pitfalls:** Extraction does not verify the whole deployed system. It does not automatically verify file I/O, networking, foreign libraries, compiler bugs, operating-system behavior, or wrappers.

### Task: Use External Libraries by Proof Culture — MathComp-style, PL-theory libraries, separation logic, automation packages

**Core keywords:** external libraries, proof culture, conventions, compatibility.

External Rocq libraries often come with their own proof idioms. The official Reference Manual notes that many libraries come from the user community and are distributed through mechanisms such as `opam` or Nix.

| Library culture               | What it emphasizes                           | Practical consequence         | Failure mode                                    |
| ----------------------------- | -------------------------------------------- | ----------------------------- | ----------------------------------------------- |
| Stdlib-style                  | Direct definitions, standard tactics         | Good baseline                 | May be less uniform than specialized ecosystems |
| Boolean reflection            | Computable predicates and reflection lemmas  | Efficient decidable reasoning | Requires learning reflection idioms             |
| Algebraic hierarchy           | Structures, laws, inference                  | Powerful reusable math        | Steep hierarchy learning                        |
| PL theory                     | Syntax, relations, preservation/progress     | Natural for metatheory        | Large proof scripts                             |
| Separation logic              | Resources, invariants, weakest preconditions | Systems verification          | Specialized logic burden                        |
| Automation packages           | Proof search and solvers                     | Productivity                  | Opaque proof dependencies                       |
| Extraction-oriented libraries | Certified executable artifacts               | Verified programming          | Runtime boundary remains                        |

**Professional rule:** Do not mix ecosystem styles accidentally. A boolean-reflection library, a `Stdlib` direct-proposition proof, and a typeclass-heavy algebraic hierarchy may all be correct but interact awkwardly.

**Common Pitfalls:** Copying a theorem style from one ecosystem into another can make proof search, rewriting, and notation harder than necessary.

### Task: Debug Library and Ecosystem Problems — imports, notation, scopes, versions, hidden arguments

**Core keywords:** debugging, imports, notation, scopes, implicit arguments, versions.

Many Rocq “semantic” problems are actually ecosystem or tooling problems.

| Symptom                     | Likely cause                      | Diagnostic tool         | Response                   |
| --------------------------- | --------------------------------- | ----------------------- | -------------------------- |
| Name not found              | Missing import or wrong namespace | `Check`, qualified name | Add precise import         |
| Notation not parsed         | Scope/notation not imported       | `Locate`                | Import/open scope          |
| Wrong theorem applied       | Ambiguous name or wrong module    | `About`, qualified name | Use qualified theorem      |
| `Search` finds nothing      | Bad theorem shape                 | Try symbols/patterns    | Search by exact operators  |
| `auto` stopped working      | Hint/import changed               | Inspect imports         | Apply lemma explicitly     |
| Proof changed after import  | Notation/instances/hints changed  | Minimize imports        | Scope imports locally      |
| Type inferred unexpectedly  | implicit arguments/coercions      | `@`, printing controls  | Add annotations            |
| Project builds locally only | version/path issue                | clean build, CI         | Pin environment            |
| Plugin unavailable          | package/build issue               | package list/build logs | Install compatible package |

**Common Pitfalls:** Before changing a proof, check whether the environment changed. Imports, scopes, and versions often explain surprising failures.

### Task: Profile and Optimize Proof Developments — checking time, automation cost, imports

**Core keywords:** proof performance, checking time, automation cost, reduction, imports, opacity.

Rocq performance is often proof-checking and build performance, not ordinary runtime performance. A proof may be mathematically correct but expensive to check.

| Cost source                  | Why it costs                 | Detection cue                   | Response                               |
| ---------------------------- | ---------------------------- | ------------------------------- | -------------------------------------- |
| Large proof terms            | Kernel must check them       | Slow `Qed`/build                | Use abstraction/lemmas                 |
| Excessive transparency       | Conversion unfolds too much  | Slow simplification/conversion  | Use `Qed` for theorem proofs           |
| Broad automation             | Search space explosion       | `auto`/`eauto` slow             | Bound search, name lemmas              |
| Heavy imports                | More environment content     | Slow load/check                 | Import narrowly                        |
| Rewrite loops                | Repeated normalization       | Nontermination/slow proof       | Orient rewrite rules                   |
| Large dependent terms        | Complex elaboration/equality | Slow type checking              | Simplify representation                |
| Native/vm computation misuse | Large reductions             | Slow or memory-heavy evaluation | Use computation strategy intentionally |
| Plugin tactics               | External tactic overhead     | Solver slowdowns                | Isolate and benchmark                  |

**Professional rule:** Optimize proof maintainability first, then checking performance where it matters. A shorter script can be slower if it relies on heavy search or huge generated terms.

**Common Pitfalls:** Replacing a clear induction proof with a powerful automation tactic may reduce line count but increase checking time and opacity.

### Task: Choose Libraries and Tools by Project Need — decision rules

**Core keywords:** library selection, tool choice, project constraints, proof culture.

Library and tool choice should be driven by proof needs, ecosystem compatibility, and maintenance constraints.

| Project need                    | Prefer                                         | Why                                  | Caveat                          |
| ------------------------------- | ---------------------------------------------- | ------------------------------------ | ------------------------------- |
| Basic arithmetic/list proofs    | `Stdlib`, `Lia`, `List`                        | Standard and widely understood       | Learn theorem names             |
| Dense algebraic mathematics     | Math-oriented hierarchy libraries              | Reusable structure                   | Must follow library idioms      |
| Programming-language metatheory | Inductive relations, PL libraries if available | Natural semantics proofs             | Large theorem infrastructure    |
| Verified executable algorithm   | Pure functions + specs + extraction            | Clear certified-programming pipeline | State extraction boundary       |
| Systems/resource verification   | Separation-logic ecosystem                     | Models resources/effects             | Specialized learning curve      |
| Large reusable project          | Dune + opam + CI                               | Reproducible checking                | Tooling setup overhead          |
| Teaching/learning               | Minimal `Stdlib` imports                       | Exposes proof structure              | Less automation                 |
| Production proof maintenance    | Scoped automation + stable lemmas              | Robustness                           | Requires engineering discipline |

**Common Pitfalls:** Choosing the most powerful library too early can obscure the basics. Choosing only the standard library for a domain with mature specialized libraries can waste effort.

### Ecosystem Cost Model — proof-time, build-time, extraction-time, runtime

**Core keywords:** cost model, proof checking, automation, extraction, build, runtime.

| Operation or pattern      | Usual cost                             | Hidden cost                           | How to detect it         | When it matters                 | When not to optimize prematurely |
| ------------------------- | -------------------------------------- | ------------------------------------- | ------------------------ | ------------------------------- | -------------------------------- |
| Importing large libraries | Load/check environment                 | Notations, hints, instances           | Slow file startup        | Large projects                  | Tiny tutorial files              |
| `auto`/`eauto`            | Proof search                           | Search explosion                      | Slow tactic step         | Repeated automation             | Small trivial goals              |
| `lia`                     | Arithmetic proof search                | Large arithmetic contexts             | Slow arithmetic goals    | Many arithmetic side conditions | Simple one-off proof             |
| Rewriting with databases  | Normalization                          | Rewrite loops                         | Tactic hangs/slows       | Normalization-heavy libraries   | Few manual rewrites              |
| Transparent proofs        | Conversion can unfold bodies           | Large proof terms used in computation | Slow `simpl`/`cbn`       | Dependent computation           | Ordinary opaque theorems         |
| `Defined` everywhere      | More unfolding                         | Performance and abstraction loss      | Slow conversion          | Computational witnesses         | Standard propositions            |
| Large dependent records   | Elaborator/equality burden             | Proof-field equality issues           | Complex goals            | Invariant-heavy APIs            | Simple validation                |
| Extraction                | Code generation and target integration | Runtime/compiler assumptions          | Target build/test        | Certified programs              | Pure proof-only developments     |
| Dune/opam setup           | Tooling overhead                       | Version pinning                       | Build configuration time | Long-lived projects             | One-file exploration             |
| Plugins                   | External compiled tooling              | Trust/build compatibility             | Plugin errors/build logs | Specialized automation          | Basic proofs                     |

**Design meaning:** Rocq’s cost model is dominated by proof checking, elaboration, reduction, automation, library loading, and build orchestration. Ordinary heap/runtime costs matter mainly after extraction or inside modeled systems.

**Common Pitfalls:** Do not optimize extracted code before knowing whether the proof development itself is maintainable and checkable. Conversely, do not ignore extracted performance if the certified function will actually run at scale.

### Ecosystem Workflow Table — from exploration to reusable library

**Core keywords:** workflow, exploration, library, CI, documentation.

| Stage                   | Main tools                                | Goal                             | Professional checkpoint                     |
| ----------------------- | ----------------------------------------- | -------------------------------- | ------------------------------------------- |
| Exploration             | editor/REPL, `Check`, `Compute`, `Search` | Understand definitions and goals | Avoid committing trial-and-error clutter    |
| Prototype proof         | direct tactics, simple imports            | Prove theorem once               | Identify induction target and helper lemmas |
| Stabilization           | named lemmas, scoped imports              | Make proof maintainable          | Remove fragile generated-name dependencies  |
| API design              | modules, records, public theorems         | Expose stable behavior           | Clients should not unfold internals         |
| Automation tuning       | scoped hints/custom tactics               | Reduce repetition                | Keep main proof ideas explicit              |
| Build integration       | Dune/`_CoqProject`, opam                  | Reproducible checking            | Clean build from fresh environment          |
| Documentation           | theorem names, comments, generated docs   | Usable library surface           | Public names reflect behavior               |
| CI/audit                | full check, admission/axiom policy        | Trust and regression control     | Fail on unexpected admissions               |
| Extraction, if relevant | extraction commands, target build         | Executable certified core        | State wrapper/runtime boundary              |

### Standard Library and Ecosystem Decision Table — final PART 6 reference

**Core keywords:** decision table, ecosystem task, tool choice.

| Task                   | First choice                              | When to escalate                           | Common pitfall                             |
| ---------------------- | ----------------------------------------- | ------------------------------------------ | ------------------------------------------ |
| Basic list proof       | `List`, `ListNotations`, `Search`         | Specialized sequence libraries if needed   | Re-proving basics                          |
| Basic arithmetic proof | `Nat`, `Arith`, `Lia`                     | Algebra tactics for ring-like goals        | Using `lia` for nonlinear/structural facts |
| Equality contradiction | `discriminate`, `inversion`, `congruence` | Inversion lemmas for repeated cases        | Context clutter                            |
| Boolean specification  | bool function + soundness/completeness    | Reflection framework                       | Treating bool as Prop                      |
| Relation semantics     | inductive relations                       | PL libraries/frameworks                    | Forcing into total function                |
| Algebraic abstraction  | record/module first                       | typeclasses/canonical structures for scale | Premature typeclass use                    |
| Repeated routine proof | local tactic or scoped hint               | domain automation                          | Hiding central proof                       |
| Project build          | Dune or documented Rocq build workflow    | package publishing                         | Local-only proof checking                  |
| Package setup          | opam switch or Platform                   | custom pins for advanced needs             | Version drift                              |
| Documentation          | official manuals + generated API docs     | package-specific docs                      | Relying on outdated tutorials              |
| Extraction             | pure core + correctness theorem           | target integration tooling                 | Whole-system overclaim                     |
| Plugin use             | stable package/plugin                     | custom plugin                              | Treating plugin as ordinary theorem        |

### Common Pitfalls and Anti-Patterns in Ecosystem Use

**Core keywords:** ecosystem pitfalls, automation, build, documentation, extraction.

| Item                                       | Category                      | Why it fails                     | Better practice                                      |
| ------------------------------------------ | ----------------------------- | -------------------------------- | ---------------------------------------------------- |
| Re-proving standard lemmas                 | Library misuse                | Duplicates theorem base          | Use `Search`, wrap if needed                         |
| Broad imports everywhere                   | Dependency smell              | Hidden notation/hint effects     | Import narrowly or locally                           |
| Trusting `auto` without knowing source     | Automation anti-pattern       | Hidden proof dependency          | Name key lemmas                                      |
| Depending on old Coq-era paths blindly     | Compatibility issue           | Migration/version mismatch       | Use current Rocq/`Stdlib` conventions where possible |
| Ignoring Platform/prover mismatch          | Version issue                 | Package incompatibility          | Record exact baseline                                |
| Treating editor success as project success | Workflow issue                | Full build may fail              | Use batch build/CI                                   |
| Using `Defined` for all proofs             | Performance/abstraction issue | Excessive unfolding              | Use `Qed` for ordinary theorems                      |
| Extracting without boundary statement      | Verification overclaim        | Runtime/wrapper unverified       | State verified core and assumptions                  |
| Writing custom tactics too early           | Overengineering               | Hides proof idea                 | First write explicit proof                           |
| Mixing library styles casually             | Ecosystem mismatch            | Awkward statements/proofs        | Follow local convention                              |
| Ignoring documentation                     | Source-reading problem        | Wrong theorem/import assumptions | Use manual and theory docs                           |

### PART 6 Summary — ecosystem fluency as proof-engineering competence

PART 6 established that Rocq ecosystem fluency is not merely knowing module names. It is the ability to navigate definitions and theorems, control imports and notation, select appropriate tactics, use libraries without hiding proof intent, build reproducible projects, manage packages, document public theorem APIs, and state extraction boundaries precisely.

| Ecosystem dimension | Expert question                                                                       |
| ------------------- | ------------------------------------------------------------------------------------- |
| Library layer       | Is this from `Corelib`, `Stdlib`, Platform, or an external package?                   |
| Import discipline   | What names, notations, hints, and instances entered scope?                            |
| Theorem reuse       | Has the standard library already proved this?                                         |
| Automation          | Is this proof search routine, scoped, and maintainable?                               |
| Build workflow      | Can the full development be checked from a clean environment?                         |
| Package management  | Are versions pinned and compatible?                                                   |
| Documentation       | Can users find and understand the public theorem API?                                 |
| Extraction          | What source-level theorem supports the extracted code?                                |
| Plugin/tool use     | What extra trust and compatibility boundary is introduced?                            |
| Performance         | Is the bottleneck proof checking, automation, reduction, build, or extracted runtime? |

The professional rule is: **use the ecosystem to reduce proof burden, but never let the ecosystem hide the theorem statement, the assumptions, the induction idea, the abstraction boundary, or the verified/external boundary.**

## PART 7 — Semantics, Runtime, Memory, Concurrency, and Implementation Model

PART 7 explains what Rocq programs, definitions, and proofs *mean*, and what actually happens when they are checked, reduced, built, or extracted. The central distinction is this: Rocq is not primarily a runtime for applications. It is a proof assistant whose core work is elaborating terms, checking types, constructing proof terms, reducing definitions, validating recursion, managing universes, and exporting computational content when extraction is used. The official Reference Manual describes Rocq as an interactive theorem prover that lets users formalize mathematical concepts and generate machine-checked proofs; this is the correct starting point for its “runtime” model.

### Semantic Orientation — source text, elaboration, proof terms, kernel, extraction

**Core keywords:** syntax, elaboration, kernel, proof term, reduction, extraction, target runtime.

Rocq has several semantic layers. A `.v` file is not simply “executed” like a Python script or compiled like a C file. Commands are processed, names are added to the environment, terms are elaborated, proof obligations are generated, tactics construct proof terms, and the kernel checks that final terms have the required types.

| Layer                | What happens                                                     | Rocq examples                                           | Main correctness question                                   |
| -------------------- | ---------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------- |
| Surface syntax       | User writes commands, terms, tactics, notation                   | `Definition`, `Theorem`, `Proof`, `rewrite`, `[]`, `++` | Does the text parse?                                        |
| Elaboration          | Rocq resolves implicit arguments, notation, coercions, universes | `Some 3` elaborates with hidden type argument           | Is there a well-typed internal term?                        |
| Global environment   | Checked definitions/theorems are stored                          | `Nat.add_comm`, local lemmas, modules                   | What names, assumptions, hints, and opacity settings exist? |
| Proof construction   | Tactics transform goals and build proof terms                    | `intros`, `apply`, `induction`, `lia`                   | Can a proof term be constructed?                            |
| Kernel checking      | The trusted checker verifies terms                               | `Qed`, `Defined`                                        | Does the proof term inhabit the theorem type?               |
| Reduction/conversion | Terms compute for definitional equality                          | `simpl`, `cbn`, `Compute`, `reflexivity`                | Are two terms convertible?                                  |
| Build checking       | Files are checked in dependency order                            | `rocq compile`, Dune, CI                                | Does the whole development recheck?                         |
| Extraction           | Computational content is emitted into target language            | OCaml, Haskell, Scheme extraction                       | What source-level theorem supports the extracted code?      |
| Target runtime       | Extracted code runs under external runtime/compiler              | OCaml/Haskell program                                   | What lies outside Rocq’s proof boundary?                    |

**Design meaning:** Rocq’s semantic center is *checking*, not ordinary runtime execution. A successful Rocq development is one whose definitions, theorem statements, assumptions, and proof terms are accepted by the kernel under a specific environment.

**Common Pitfalls:** Do not collapse “Rocq accepted the proof,” “the extracted program runs,” and “the deployed system is correct.” These are different claims with different trust boundaries.

### Syntax versus Semantics — notation, implicit arguments, coercions, elaborated terms

**Core keywords:** notation, implicit arguments, coercions, elaboration, source-reading.

Rocq surface syntax often hides semantic detail. Notation, implicit arguments, coercions, scopes, and typeclass/canonical-structure inference can make the source term shorter than the elaborated term.

| Surface feature               | What it hides                           | Example                        | Diagnostic tool            |
| ----------------------------- | --------------------------------------- | ------------------------------ | -------------------------- |
| Notation                      | Underlying constant and scope           | `xs ++ ys`                     | `Locate "++".`             |
| Implicit argument             | Omitted parameter inferred from context | `Some 3`                       | `Check @Some.`             |
| Coercion                      | Inserted conversion                     | structure-to-carrier coercions | printing commands, `Check` |
| Scope                         | Meaning of overloaded symbol            | `+`, `*`, list notation        | `Open Scope`, `Locate`     |
| Section generalization        | Hidden exported parameters              | section variables              | `Check` after `End`        |
| Typeclass/canonical inference | Inferred structure/laws                 | algebraic operations           | inspect instances/printing |

Example:

```coq
Check Some.
Check @Some.
Check (None : option nat).
```

The visible term `Some 3` is not the whole semantic story. Rocq infers the hidden type argument `nat`.

**Failure-first explanation:** The tempting mental model is “Rocq checks exactly the text I see.” The surprising behavior is that hidden arguments and notation can make the checked term richer than the source. The correct explanation is elaboration: Rocq translates surface syntax into a more explicit internal term before kernel checking.

**Professional rule of thumb:** When confused, use `Check`, `Print`, `About`, `Locate`, `@`, type annotations, and printing controls before changing the proof.

### Core Type-Theoretic Semantics — CIC, propositions as types, proofs as terms

**Core keywords:** Calculus of Inductive Constructions, propositions as types, proofs as terms, dependent products, kernel.

Rocq’s core logic is based on the Calculus of Inductive Constructions. The practical interpretation is:

| Rocq object              | Type-theoretic meaning                                | Practical consequence            |
| ------------------------ | ----------------------------------------------------- | -------------------------------- |
| Data type                | Type inhabited by data terms                          | `nat`, `bool`, `list nat`        |
| Proposition              | Type whose inhabitants are proofs                     | `forall n, n + 0 = n`            |
| Theorem                  | Named proposition requiring an inhabitant             | `Theorem add_0_r : ...`          |
| Proof                    | Term inhabiting theorem type                          | tactic script builds this term   |
| Implication              | Function from proof of premise to proof of conclusion | `A -> B`                         |
| Universal quantification | Dependent function type                               | `forall x : A, P x`              |
| Existential              | Pair-like evidence: witness plus proof                | `exists x, P x`                  |
| Inductive predicate      | Structured evidence type in `Prop`                    | `Even n`, evaluation derivations |
| Kernel                   | Checker of typing and conversion                      | final trust point                |

Example:

```coq
Theorem id_prop : forall A : Prop, A -> A.
Proof.
  intros A HA.
  exact HA.
Qed.
```

The proof term is essentially:

```coq
fun (A : Prop) (HA : A) => HA
```

This is not metaphorical. The theorem type is inhabited by a function that takes a proposition `A`, takes evidence `HA : A`, and returns that evidence.

**Interdisciplinary Lens: Calculus of Inductive Constructions**

| Item                      | Explanation                                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| What it clarifies         | Why definitions, propositions, proofs, and programs live in one typed framework                                                |
| Language feature involved | `forall`, `fun`, `Inductive`, `Fixpoint`, `Theorem`, proof terms                                                               |
| Practical consequence     | Tactics construct proof terms; the kernel checks those terms                                                                   |
| Limit of the lens         | CIC explains the core, but practical Rocq also depends on libraries, tactics, notation, modules, extraction, and build tooling |

**Common Pitfalls:** Do not treat proof scripts as magical commands that convince Rocq. They construct terms whose types are checked.

### Sorts and Universes — `Prop`, `Set`, `SProp`, `Type`, hierarchy

**Core keywords:** sorts, universes, `Prop`, `Set`, `SProp`, `Type`, universe levels.

The types of types in Rocq are called sorts. The Rocq documentation describes an infinite well-founded typing hierarchy of sorts with base sorts including `SProp`, `Prop`, and `Set`; `Type` is universe-polymorphic rather than a single flat universe.

| Sort       | Practical role            | Typical object                             | Caveat                                                    |
| ---------- | ------------------------- | ------------------------------------------ | --------------------------------------------------------- |
| `Prop`     | Logical propositions      | theorem statements, predicates             | Proofs are usually non-computational after extraction     |
| `Set`      | Small computational types | traditional data universe                  | Less central in many modern user explanations than `Type` |
| `SProp`    | Strict propositions       | specialized proof-irrelevance-oriented use | Advanced; not needed for most beginners                   |
| `Type`     | General universe of types | `nat`, `list nat`, records, structures     | Actually universe-leveled                                 |
| `Type@{u}` | Explicit universe level   | advanced polymorphic developments          | Usually hidden unless universe issues arise               |

Example:

```coq
Check Prop.
Check Set.
Check Type.
Check nat.
Check forall A : Type, A -> A.
```

Universe levels prevent paradoxes that would arise from a naïve “type of all types.” In ordinary code, Rocq often hides these levels. In advanced generic libraries, mathematical hierarchies, category-theoretic abstractions, or universe-polymorphic developments, universes become visible.

| Situation                   | Universe relevance                        |
| --------------------------- | ----------------------------------------- |
| Basic list/nat proofs       | Usually hidden                            |
| Generic records over `Type` | Sometimes relevant                        |
| Large algebraic hierarchies | Often relevant                            |
| Category-like abstractions  | Often relevant                            |
| `Type : Type` expectation   | Dangerous and rejected in normal settings |
| Debugging universe errors   | Requires explicit universe inspection     |

**Failure-first explanation:** The tempting mental model is “`Type` is just one type of all types.” The surprising behavior is universe constraints and errors in generic developments. The correct explanation is that Rocq uses a hierarchy to preserve consistency.

**Common Pitfalls:** Do not add universe annotations prematurely. First understand the ordinary type error. Use explicit universe tools only when the problem is genuinely universe-related.

### Kernel Checking — the trusted core and what it verifies

**Core keywords:** kernel, trusted checker, proof term, assumptions, conversion, type checking.

The kernel checks whether a term has a type. For theorem proving, this means checking whether a proof term inhabits the theorem statement. For definitions, it checks typing, universes, recursion constraints, and conversion where needed.

| Kernel checks                    | Example                          | What it does not check                        |
| -------------------------------- | -------------------------------- | --------------------------------------------- |
| Term well-typedness              | `S 0 : nat`                      | Whether the model is useful                   |
| Proof term inhabits theorem      | proof of `forall n, n = n`       | Whether theorem is the right theorem          |
| Definitional equality/conversion | `0 + n` reduces to `n`           | Arbitrary mathematical equality without proof |
| Inductive well-formedness        | positivity and constructor types | Whether data model is convenient              |
| Recursive definition validity    | structural/guarded recursion     | Efficiency of algorithm                       |
| Universe consistency             | no invalid universe cycle        | Human interpretation of abstraction           |
| Use of assumptions               | theorem depends on environment   | External truth of axioms                      |

The trusted-kernel model is why tactics can be powerful without becoming the primary trust base. A tactic may be complex, but if it generates a proof term that the kernel checks, the accepted theorem rests on kernel checking rather than on blind trust in the tactic.

**Common Pitfalls:** A theorem accepted under `Axiom`, `Parameter`, or `Admitted` dependencies is checked relative to those assumptions. Kernel checking does not make unjustified assumptions true.

### Conversion and Definitional Equality — reduction, normal forms, convertibility

**Core keywords:** conversion, definitional equality, normal form, alpha, beta, delta, iota, zeta, eta.

Rocq has conversion rules that determine whether two terms are equal by definition in CIC, also called convertible. The documentation describes conversion as using reduction and expansion rules, converting terms to normal forms, and checking syntactic equality up to alpha-conversion of bound names.

| Conversion rule     | Intuition                                 | Rocq-style example                  | Practical effect                 |                                    |
| ------------------- | ----------------------------------------- | ----------------------------------- | -------------------------------- | ---------------------------------- |
| Alpha-conversion    | Bound variable names do not matter        | `fun x => x` and `fun y => y`       | Names of binders irrelevant      |                                    |
| Beta-reduction      | Function application computes             | `(fun x => S x) 0` reduces to `S 0` | Function calls reduce            |                                    |
| Delta-reduction     | Transparent constants unfold              | `double 0` unfolds if transparent   | Definitions may compute          |                                    |
| Iota-reduction      | Pattern match on constructor reduces      | `match true with true => 1          | false => 0 end`                  | Constructor-headed matches compute |
| Zeta-reduction      | `let` binding unfolds                     | `let x := 1 in x + 1`               | Local definitions reduce         |                                    |
| Eta-like principles | Extensional expansion in limited settings | depends on supported form           | Advanced; not ordinary rewriting |                                    |

Example:

```coq
Definition double (n : nat) : nat := n + n.

Compute double 2.
```

A theorem closed by conversion:

```coq
Theorem beta_delta_iota_example :
  double 0 = 0.
Proof.
  reflexivity.
Qed.
```

Here `reflexivity` succeeds because the two sides are convertible after unfolding and reducing.

**Failure-first explanation:** The tempting mental model is “if two expressions are mathematically equal, Rocq should treat them as the same.” The surprising behavior is that `0 + n = n` may close by computation, while `n + 0 = n` needs induction or a lemma. The correct explanation is that definitional equality follows computation rules, not all mathematical truths.

**Common Pitfalls:** If `reflexivity` fails, the equality may still be true propositionally. Use induction, rewriting, or library lemmas.

### Propositional Equality versus Definitional Equality — `rewrite` versus reduction

**Core keywords:** `=`, `eq`, propositional equality, definitional equality, `rewrite`, `reflexivity`.

Definitional equality is implicit and checked by conversion. Propositional equality is explicit and written with `=`.

| Equality kind                | Written?                              | Evidence needed?                   | Main tool                          | Example                |
| ---------------------------- | ------------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------- |
| Definitional equality        | Usually not written as a proof object | No separate theorem if convertible | `reflexivity`, `simpl`, conversion | `0 + n` reduces to `n` |
| Propositional equality       | Written `x = y`                       | Yes, proof term required           | `rewrite`, equality lemmas         | `n + 0 = n`            |
| Equality theorem             | Named proof                           | Yes                                | `apply`, `rewrite`                 | `Nat.add_0_r`          |
| Transport in dependent types | Equality changes types                | Yes                                | `rewrite`, dependent elimination   | indexed vectors        |

Example:

```coq
Theorem add_zero_right :
  forall n : nat, n + 0 = n.
Proof.
  intros n.
  induction n as [| n IHn].
  - reflexivity.
  - simpl. rewrite IHn. reflexivity.
Qed.
```

This theorem is not solved by computation alone because addition recurses over its first argument.

**Professional rule:** Before choosing a tactic, classify the equality. If it is definitional, reduction and `reflexivity` may solve it. If it is propositional, use a theorem, induction, or rewriting.

**Common Pitfalls:** Overusing `simpl` when a lemma is needed wastes time and can make goals worse.

### Reduction Strategies — `simpl`, `cbn`, `cbv`, `lazy`, `vm_compute`, `native_compute`

**Core keywords:** reduction strategy, evaluation, computation, proof-time performance.

Rocq provides different reduction strategies. The Reference Manual distinguishes ordinary evaluation commands, tactics applying conversion rules, and fast reduction tactics such as `vm_compute` and `native_compute`.

| Strategy/tool     | Informal role                                | Good use                        | Risk                              |
| ----------------- | -------------------------------------------- | ------------------------------- | --------------------------------- |
| `simpl`           | Simplify obvious reducible expressions       | Small proof steps               | May reduce too little or too much |
| `cbn`             | Controlled call-by-name-style simplification | More predictable simplification | Still definition-shape dependent  |
| `cbv`             | Call-by-value-style full reduction           | Compute closed terms            | Can unfold too aggressively       |
| `lazy`            | Lazy reduction                               | Avoid unnecessary computation   | May be harder to predict          |
| `Compute`         | Interactive evaluation                       | Explore definitions             | Not a theorem                     |
| `Eval ... in ...` | Explicit evaluation strategy                 | Diagnose reduction              | Strategy choice matters           |
| `vm_compute`      | Fast virtual-machine computation             | Large closed computations       | Proof readability may suffer      |
| `native_compute`  | Native-code computation when available       | Very large computations         | Toolchain/environment sensitivity |

Example:

```coq
Definition square (n : nat) : nat := n * n.

Compute square 5.
Eval cbn in square 5.
Eval cbv in square 5.
```

In proof scripts:

```coq
Theorem square_0 :
  square 0 = 0.
Proof.
  unfold square.
  simpl.
  reflexivity.
Qed.
```

**Design tradeoff:**

| Choice                    | Capability gained                          | Cost introduced               |
| ------------------------- | ------------------------------------------ | ----------------------------- |
| Small-step simplification | Readable proof states                      | More manual work              |
| Aggressive reduction      | Faster closure for computation-heavy goals | Huge or unreadable goals      |
| VM/native computation     | Performance on large computations          | Less transparent proof intent |
| Public rewrite lemmas     | Stable abstraction                         | More theorem maintenance      |

**Common Pitfalls:** `Compute` demonstrates reduction; it does not create a reusable theorem. If a computed fact matters later, state and prove a lemma or rely on conversion where appropriate.

### Opacity and Transparency — `Qed`, `Defined`, unfolding, proof-checking cost

**Core keywords:** opacity, transparency, `Qed`, `Defined`, conversion, proof body.

Opacity affects whether a body can be unfolded during reduction. This has semantic and performance consequences.

| Form                     | Transparency behavior     | Best use                                    | Risk                         |
| ------------------------ | ------------------------- | ------------------------------------------- | ---------------------------- |
| `Qed`                    | Opaque proof body         | Ordinary theorem proofs                     | Cannot unfold proof body     |
| `Defined`                | Transparent body          | Computationally relevant definitions/proofs | May increase conversion cost |
| Transparent `Definition` | Unfoldable constant       | Computation and definitional equality       | Clients may depend on body   |
| Opaque theorem           | Abstract fact             | Stable reasoning by lemma                   | Not computational            |
| `Admitted`               | Assumed, no checked proof | Temporary placeholder only                  | Trust debt                   |

Example transparent dependent object:

```coq
Definition certified_zero : { n : nat | n = 0 }.
Proof.
  exists 0.
  reflexivity.
Defined.
```

Example opaque theorem:

```coq
Theorem zero_eq_zero :
  0 = 0.
Proof.
  reflexivity.
Qed.
```

**Failure-first explanation:** The tempting mental model is “`Qed` and `Defined` both just finish proofs.” The surprising behavior is that later computation may unfold one but not the other. The correct explanation is that `Defined` keeps the body transparent, while `Qed` seals it.

**Professional rule:** Use `Qed` for ordinary propositions. Use `Defined` for definitions or proofs whose computational content must remain available.

**Common Pitfalls:** Making too much transparent can slow conversion and expose implementation details. Making computational objects opaque can block expected reduction.

### Inductive Types and Eliminators — constructors, induction principles, pattern matching

**Core keywords:** `Inductive`, constructors, eliminators, induction principles, positivity, pattern matching.

The Rocq documentation describes `Inductive` as defining types by cases over the form of inhabitants, including recursive constructor arguments, and notes that Rocq generates induction principles such as `_rect`, `_ind`, `_rec`, and `_sind` when possible. It also states that constructor types must satisfy a positivity condition to ensure soundness.

| Inductive feature    | Semantic role                                 | Practical consequence                       |
| -------------------- | --------------------------------------------- | ------------------------------------------- |
| Constructors         | Legal ways to build inhabitants               | Case analysis follows constructors          |
| Pattern matching     | Eliminates an inductive value                 | Computation by constructor cases            |
| Induction principle  | Recursion/proof principle generated from type | `induction` invokes it                      |
| Positivity condition | Prevents unsound definitions                  | Some recursive type shapes rejected         |
| Indexed inductive    | Type indices refine cases                     | Dependent pattern matching/equality issues  |
| Inductive predicate  | Evidence constructors in `Prop`               | Proofs can induct on evidence               |
| Recursive argument   | Supports structural recursion/induction       | Recursive functions/proofs follow structure |

Example:

```coq
Inductive bit : Type :=
| B0
| B1.
```

Generated reasoning is simple: to prove a property about all bits, prove it for `B0` and `B1`.

```coq
Theorem bit_cases :
  forall b : bit, b = B0 \/ b = B1.
Proof.
  intros b.
  destruct b.
  - left. reflexivity.
  - right. reflexivity.
Qed.
```

Recursive example:

```coq
Inductive natlist : Type :=
| NNil
| NCons : nat -> natlist -> natlist.
```

The recursive constructor `NCons` gives rise to an induction hypothesis for the tail.

**Common Pitfalls:** An inductive definition is not only a data declaration. It determines future proof structure. Poor inductive design creates poor induction principles.

### Recursion and Termination — `Fixpoint`, guard condition, structural recursion

**Core keywords:** `Fixpoint`, `fix`, structural recursion, termination, guard condition, consistency.

Rocq functions over recursive inductive data are usually defined with `Fixpoint` or the underlying `fix` expression. The documentation states that functions on inductive types generally must be defined recursively using `fix` or the `Fixpoint` command.

| Recursion feature      | Meaning                                            | Example                          | Pitfall                                   |
| ---------------------- | -------------------------------------------------- | -------------------------------- | ----------------------------------------- |
| Structural recursion   | Recursive call on smaller subterm                  | tail of list, predecessor of nat | Human-obvious termination may be rejected |
| Guard condition        | Rocq checks recursive calls are guarded/decreasing | `Fixpoint` validation            | Complex dependent recursion hard          |
| Totality               | Accepted functions terminate in core logic         | consistency protection           | No arbitrary general recursion            |
| Well-founded recursion | Recursion justified by measure/relation            | advanced algorithms              | More proof obligations                    |
| Accumulator recursion  | Structurally recursive but invariant changes       | `rev_acc`                        | Need generalized theorem                  |
| Mutual recursion       | Several functions/types together                   | syntax families                  | More complex principles                   |

Example accepted recursion:

```coq
Fixpoint sum_list (xs : list nat) : nat :=
  match xs with
  | [] => 0
  | x :: xs' => x + sum_list xs'
  end.
```

Example theorem aligned with recursion:

```coq
Theorem sum_list_app :
  forall xs ys : list nat,
    sum_list (xs ++ ys) = sum_list xs + sum_list ys.
Proof.
  intros xs ys.
  induction xs as [| x xs IHxs].
  - simpl. reflexivity.
  - simpl. rewrite IHxs. lia.
Qed.
```

**Design meaning:** Termination checking is part of logical soundness. If arbitrary nonterminating recursive definitions were allowed, the logic could collapse.

**Failure-first explanation:** The tempting mental model is “Rocq should accept every algorithm I know terminates.” The surprising behavior is rejection of non-obviously-structural recursion. The correct explanation is that Rocq needs a syntactic or proof-supported termination argument.

**Common Pitfalls:** Do not fight the guard checker with convoluted definitions. First try changing the data structure, recursion argument, or helper function. Use well-founded recursion only when structurally recursive definitions are genuinely inadequate.

### Coinduction and Corecursion — infinite structures, guarded productivity

**Core keywords:** `CoInductive`, `cofix`, streams, productivity, guardedness.

Rocq also supports coinductive types and corecursive definitions. Inductive types describe finite well-founded construction; coinductive types can describe potentially infinite objects such as streams. The same documentation contrasts inductive types such as natural numbers, lists, and well-founded trees with `CoInductive` types such as streams whose constructors can be infinitely nested.

| Concept              | Inductive            | Coinductive                     |
| -------------------- | -------------------- | ------------------------------- |
| Structure            | Finite/well-founded  | Potentially infinite/productive |
| Definition           | `Inductive`          | `CoInductive`                   |
| Recursive term       | `fix` / `Fixpoint`   | `cofix`                         |
| Main proof principle | induction            | coinduction                     |
| Safety condition     | termination          | productivity/guardedness        |
| Example              | lists, trees, syntax | streams, infinite behaviors     |

**Common Pitfalls:** Coinduction is not just “recursion that may not terminate.” It has its own productivity discipline. For most theorem-proving and certified-programming beginners, inductive reasoning is much more central than coinduction.

### Binding, Scope, and Substitution Semantics — variables, context, sections, hypotheses

**Core keywords:** binding, context, scope, substitution, section variables, hypotheses.

A Rocq term is checked in a context. The context contains local variables and hypotheses. Top-level definitions are checked in the global environment. Sections create local contexts that are generalized when closed.

| Binding form     | Semantic role                    | Example             | Boundary effect                   |
| ---------------- | -------------------------------- | ------------------- | --------------------------------- |
| Function binder  | Introduces term variable         | `fun x => ...`      | Local to body                     |
| Universal binder | Introduces arbitrary value/proof | `forall x : A, P x` | Proof by `intros`                 |
| Let binder       | Local definition                 | `let x := t in u`   | Reduces by zeta                   |
| Section variable | Shared local parameter           | `Variable A : Type` | Generalized after `End`           |
| Hypothesis       | Local proof assumption           | `Hypothesis H : P`  | Exported theorem may depend on it |
| Module namespace | Qualified binding                | `M.f`               | Name boundary                     |
| Implicit binder  | Hidden parameter                 | `{A : Type}`        | Source-reading complexity         |

Example:

```coq
Section S.
  Variable A : Type.
  Variable x : A.

  Definition const_x (y : A) : A := x.
End S.

Check const_x.
```

After `End S`, `const_x` is generalized over `A` and `x`.

**Common Pitfalls:** A theorem proved inside a section may export with more parameters than expected. Always inspect exported types.

### Evaluation Order and Call Strategy — pure terms, reduction, proof-time computation

**Core keywords:** evaluation, call strategy, purity, reduction, normalization.

Rocq’s core term language is pure. There is no hidden mutation or I/O in Gallina definitions. Evaluation is reduction of terms, and different tactics/commands choose different strategies.

| Ordinary-language concept | Rocq analogue                                   | Important difference                            |
| ------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| Function call             | Beta-reduction/application                      | Pure and total in accepted core                 |
| Loop                      | Structural recursion                            | Must satisfy termination discipline             |
| Branch                    | Pattern matching / boolean `if`                 | Condition for `if` is `bool`                    |
| Runtime exception         | Usually explicit data such as `option`/`result` | No ordinary exception mechanism in Gallina core |
| Mutable state             | State-passing model or relation                 | No implicit mutation                            |
| Side effect               | Modeled/extracted/assumed                       | Not core Gallina behavior                       |
| Lazy/eager evaluation     | Reduction strategies                            | Chosen for proof/checking, not app runtime      |
| Runtime execution         | Extraction target runtime                       | Outside kernel guarantee                        |

**Design meaning:** The semantics of a Rocq definition is closer to a pure total functional term than to an effectful procedure. Runtime execution becomes relevant after extraction, inside plugins, or in the implementation of the prover itself.

**Common Pitfalls:** Do not infer target-language performance from `Compute` alone. `Compute` is proof-environment reduction, not a full performance model for extracted OCaml/Haskell code.

### Pattern Matching Semantics — eliminators, dependent matches, branch refinement

**Core keywords:** `match`, eliminator, branch refinement, dependent pattern matching, equality.

Pattern matching eliminates an inductive value. In non-dependent cases, this resembles ML/Haskell pattern matching. In dependent cases, each branch can refine type information, which may create equality obligations.

Example simple match:

```coq
Definition pred_opt (n : nat) : option nat :=
  match n with
  | 0 => None
  | S k => Some k
  end.
```

Dependent-style issue:

```coq
Inductive vec (A : Type) : nat -> Type :=
| vnil : vec A 0
| vcons : forall n : nat, A -> vec A n -> vec A (S n).
```

Pattern matching on `vec A n` can refine what `n` must be in each branch. The `vnil` branch corresponds to `n = 0`; the `vcons` branch corresponds to `n = S k` for some `k`. This is powerful but can make proof goals contain dependent equalities.

| Match kind              | Complexity    | Example                  | Typical issue                                |
| ----------------------- | ------------- | ------------------------ | -------------------------------------------- |
| Boolean match           | Low           | `if b then ... else ...` | `Prop` versus `bool` confusion               |
| Nat/list match          | Low to medium | recursive functions      | right recursion argument                     |
| Indexed inductive match | High          | vectors, typed syntax    | equality/index transport                     |
| Match on proof evidence | Medium/high   | inductive predicates     | elimination restrictions and proof relevance |
| Nested match            | Medium        | parser/checker functions | preserve branch equations in proofs          |

**Common Pitfalls:** When destructing a complex expression in a proof, use `destruct ... eqn:H` if the branch equation will matter.

### Exceptions and Error Semantics — explicit failure, not hidden exception flow

**Core keywords:** errors, `option`, `result`, `False`, proof failure, development failure.

Gallina-level failure is usually represented explicitly. There is no ordinary exception mechanism as the default semantic model for pure definitions.

| Failure kind                  | Rocq representation                  | Example                  | Meaning                       |
| ----------------------------- | ------------------------------------ | ------------------------ | ----------------------------- |
| Computation may fail          | `option A`                           | `head_opt xs`            | recoverable absence           |
| Computation fails with reason | `result E A`                         | parser result            | recoverable explained failure |
| Invalid input impossible      | proof precondition or dependent type | nonzero divisor          | caller must supply evidence   |
| Logical contradiction         | `False`                              | `Some x = None -> False` | impossible evidence           |
| Proof tactic fails            | no proof-state transformation        | `rewrite` mismatch       | development-time failure      |
| Type checking fails           | rejected term                        | wrong argument type      | static rejection              |
| Assumed gap                   | `Admitted`                           | unproved theorem         | trust debt                    |

Example:

```coq
Definition safe_head {A : Type} (xs : list A) : option A :=
  match xs with
  | [] => None
  | x :: _ => Some x
  end.
```

The empty case is not an exception or contradiction. It is a valid output.

**Common Pitfalls:** Do not encode normal failure as `False`. Use `False` for logical impossibility, not ordinary failed lookup or parsing.

### Effects and Resources — pure core, modeled effects, external wrappers

**Core keywords:** effects, resources, state, traces, extraction boundary, external systems.

Rocq’s core definitions are pure. Effects such as I/O, mutation, randomness, concurrency, and resource management must be modeled, extracted into an external setting, or assumed through an interface.

| Effect/resource        | Rocq-level strategy                  | Example               | Boundary                              |
| ---------------------- | ------------------------------------ | --------------------- | ------------------------------------- |
| Mutable state          | state-passing function or relation   | `state -> state`      | model adequacy                        |
| I/O                    | traces or external wrapper           | list of events        | wrapper not verified unless modeled   |
| Randomness             | nondeterministic/probabilistic model | relation/distribution | property depends on model             |
| Heap/resource          | separation logic or state model      | heap assertions       | specialized library                   |
| File/network           | abstract protocol model              | messages/events       | operational environment outside proof |
| Target runtime effects | extracted wrapper                    | OCaml/Haskell I/O     | external trust                        |

Example pure state transition:

```coq
Record state : Type := {
  count : nat
}.

Definition tick (s : state) : state :=
  {| count := S (count s) |}.

Theorem tick_spec :
  forall s, count (tick s) = S (count s).
Proof.
  intros s.
  reflexivity.
Qed.
```

**Design meaning:** Rocq verifies the model you write. If a resource protocol or external effect matters, it must be included in the model or identified as an assumption.

**Common Pitfalls:** A theorem about a pure core function does not verify the I/O wrapper, operating system, network behavior, or deployment environment.

### Memory Model — Gallina values, proof terms, prover implementation, extracted runtime

**Core keywords:** memory, allocation, proof term size, extraction, OCaml/Haskell runtime.

Rocq does not expose a C-like or Rust-like memory model for Gallina terms. For the user, memory concerns appear at several distinct layers:

| Layer                        | Memory/cost issue                          | Example                   | Who manages it?             |
| ---------------------------- | ------------------------------------------ | ------------------------- | --------------------------- |
| Gallina semantic model       | Pure terms and inductive values            | lists, trees, proof terms | logical model               |
| Kernel/prover implementation | Internal representation and checking       | large terms, universes    | Rocq implementation/runtime |
| Proof development            | Proof term size and reduction cost         | huge automation output    | proof engineer              |
| Build system                 | compiled `.vo` artifacts, dependency graph | large project builds      | tooling                     |
| Extraction target            | target-language allocation/GC              | OCaml/Haskell lists       | target runtime              |
| External wrapper             | I/O buffers, resources                     | file/network handling     | external program            |

| Operation/pattern              | Rocq-level cost           | Hidden cost                       | Professional response                    |
| ------------------------------ | ------------------------- | --------------------------------- | ---------------------------------------- |
| Large inductive data in proofs | Reduction/checking time   | Massive normal forms              | Avoid unnecessary computation            |
| Large proof terms              | Kernel checking time      | Slow `Qed`/build                  | Use helper lemmas and opacity            |
| Transparent definitions        | Conversion unfolds bodies | Slow simplification               | Use `Qed` for theorem proofs             |
| Automation-generated proofs    | Potentially huge terms    | Hard to debug/check               | Bound automation                         |
| Large imports                  | Environment load cost     | More hints/instances              | Import narrowly                          |
| Extracted lists/nats           | Target runtime allocation | Peano naturals may be inefficient | Use extraction mappings when appropriate |
| Dependent records              | Elaborator/equality cost  | Proof-field complexity            | Use only for central invariants          |

**Common Pitfalls:** Do not reason about Gallina `nat` as a machine integer. Do not assume extracted Peano naturals are appropriate for high-performance numeric computation without considering extraction mappings and target-language representation.

### Concurrency and Parallelism — not core Gallina, but modelable

**Core keywords:** concurrency, parallelism, interleaving, traces, build parallelism, extraction.

Rocq’s core Gallina language does not provide a Go/Rust/Java-style concurrency runtime. Concurrency enters Rocq in three main ways:

| Context                        | Meaning                                 | Rocq approach                                 |
| ------------------------------ | --------------------------------------- | --------------------------------------------- |
| Formalizing concurrent systems | Model threads, schedules, traces, locks | inductive relations, traces, invariants       |
| Verifying concurrent programs  | Use specialized logics/libraries        | separation logic, rely/guarantee-style models |
| Extracted code concurrency     | Target-language concurrency             | outside core proof unless modeled             |
| Prover/build parallelism       | Tooling-level performance               | not Gallina semantics                         |
| Tactic/plugin execution        | Implementation behavior                 | external/tooling concern                      |

Example concurrency model sketch:

```coq
Inductive event : Type :=
| Read
| Write.

Definition trace := list event.

Definition no_write (tr : trace) : Prop :=
  forall e, In e tr -> e <> Write.
```

This models traces as data. It does not run concurrent code. To verify real concurrent behavior, the model must represent scheduling, shared state, interference, and resource ownership.

**Common Pitfalls:** Proving a property of a sequential model does not verify a concurrent implementation. The schedule/interleaving model must be explicit.

### Extraction Semantics — certified source, erased proofs, target runtime

**Core keywords:** extraction, OCaml, Haskell, Scheme, proof erasure, target runtime.

The Rocq extraction manual describes extraction commands as used to build certified and relatively efficient functional programs from Rocq functions or proofs of specifications, and it lists OCaml, Haskell, and Scheme as output languages.

| Extraction question     | Rocq-side answer                                      | Boundary caveat                                |
| ----------------------- | ----------------------------------------------------- | ---------------------------------------------- |
| What is extracted?      | Computational content of definitions/proofs           | `Prop` proofs are generally not runtime checks |
| Which languages?        | OCaml, Haskell, Scheme according to extraction docs   | Target support and maturity vary               |
| What is certified?      | The source-level theorem about Rocq definitions       | Only the stated theorem                        |
| What is not certified?  | Target compiler/runtime, wrappers, external libraries | Must be trusted or separately verified         |
| What about performance? | Not guaranteed by theorem                             | Requires target-level profiling                |
| What about I/O?         | Usually wrapper/external code                         | Model it or state boundary                     |

Example verified core:

```coq
Definition verified_filter_nonempty {A : Type} (xs : list A) : bool :=
  match xs with
  | [] => false
  | _ :: _ => true
  end.

Theorem verified_filter_nonempty_sound :
  forall (A : Type) (xs : list A),
    verified_filter_nonempty xs = true ->
    exists x xs', xs = x :: xs'.
Proof.
  intros A xs H.
  destruct xs as [| x xs'].
  - simpl in H. discriminate H.
  - exists x, xs'. reflexivity.
Qed.
```

If the function is extracted, the theorem supports a source-level property of the function. It does not verify the entire application that calls the extracted function.

**Common Pitfalls:** Extraction is not a magic bridge from theorem to full deployment. State the verified core, assumptions, target runtime, and wrapper boundary.

### Proof Checking versus Program Execution — different cost models

**Core keywords:** proof checking, execution, build time, runtime, conversion.

Rocq has several distinct notions of “running”:

| Activity              | What runs/checks?          | Cost model                                      |
| --------------------- | -------------------------- | ----------------------------------------------- |
| `Compute t`           | Reduces a Rocq term        | Reduction strategy and term size                |
| `simpl`/`cbn`         | Reduces inside proof state | Local conversion complexity                     |
| `Qed`                 | Kernel checks proof term   | Proof term size, universes, conversion          |
| `rocq compile file.v` | Checks full file           | imports, proofs, dependencies                   |
| Dune/CI build         | Checks project             | dependency graph, parallelism, package versions |
| Extraction            | Generates target code      | extraction pipeline                             |
| Target execution      | Runs extracted code        | target language/runtime/compiler                |

**Cost model table:**

| Operation or pattern         | Usual cost               | Hidden cost                     | How to detect it             | When it matters             | When not to optimize prematurely |
| ---------------------------- | ------------------------ | ------------------------------- | ---------------------------- | --------------------------- | -------------------------------- |
| `reflexivity` on large terms | Conversion               | Huge normal forms               | slow tactic                  | generated computations      | small examples                   |
| `simpl` everywhere           | Reduction                | Goal expansion                  | unreadable/slow proof states | large recursive definitions | tiny proofs                      |
| `rewrite` chains             | Matching and replacement | Wrong orientation/repeated work | proof slowdown               | large goals                 | small equalities                 |
| `auto`/`eauto`               | Search                   | hint explosion                  | tactic delay                 | large contexts              | trivial leaf goals               |
| `lia`                        | Arithmetic solving       | large arithmetic contexts       | solver delay                 | many numeric goals          | simple arithmetic                |
| `Qed` after automation       | Kernel proof checking    | huge generated proof term       | slow close/build             | large proof scripts         | small proofs                     |
| Transparent proof body       | Conversion unfolds it    | long reduction paths            | slow `cbn`/conversion        | dependent computation       | ordinary theorems                |
| Dependent pattern matching   | Elaboration/equality     | transports and casts            | complex goals                | indexed data                | simple data                      |
| Large library imports        | environment loading      | hints/instances/scopes          | slow file startup            | big projects                | one-off exploration              |
| Extraction                   | target code generation   | external runtime assumptions    | target build issues          | certified programs          | proof-only theory                |

**Professional rule:** Optimize proof structure before optimizing tactics. The biggest wins often come from better lemmas, opacity decisions, smaller imports, and bounded automation.

### Universe and Conversion Failures — diagnosis, not panic

**Core keywords:** universe error, conversion failure, implicit arguments, dependent type, diagnostics.

Advanced Rocq failures often look mysterious because they involve hidden arguments, universes, coercions, or dependent equality.

| Symptom                                     | Possible cause                         | Diagnostic move                      |
| ------------------------------------------- | -------------------------------------- | ------------------------------------ |
| Type mismatch despite similar printed terms | Hidden arguments/scopes differ         | Use `Check`, `Set Printing All`      |
| Rewrite fails                               | No matching subterm or wrong direction | Inspect goal exactly                 |
| Universe inconsistency                      | Type-level abstraction too strong      | Print universes, reduce polymorphism |
| `reflexivity` fails                         | Terms not convertible                  | Try `cbn`, inspect definitions       |
| Dependent match fails                       | Branch types do not align              | Add return clause or helper lemma    |
| `Fixpoint` rejected                         | Guard condition not satisfied          | Reorganize recursion                 |
| `simpl` unfolds too much                    | Transparent constants exposed          | Use `cbn` or keep definitions opaque |
| Automation slow                             | Search space too large                 | Bound hints/depth                    |

**Common Pitfalls:** Do not assume every advanced error is a universe problem. Most are still ordinary type, notation, implicit-argument, or theorem-shape problems.

### Soundness Boundaries — kernel, axioms, plugins, extraction, implementation

**Core keywords:** soundness, trust boundary, kernel, axioms, plugins, extraction.

Rocq’s high confidence depends on knowing which components are trusted.

| Component                 | Trust role                                   | Risk                                          |
| ------------------------- | -------------------------------------------- | --------------------------------------------- |
| Kernel                    | Checks final terms                           | Central trusted base                          |
| Conversion checker        | Determines definitional equality             | Part of kernel trust                          |
| Guard/positivity checkers | Protect consistency for recursion/inductives | Part of soundness-critical machinery          |
| Tactics                   | Generate proof terms                         | Final terms checked, but tactic may be opaque |
| Automation solvers        | Generate proofs                              | Kernel still checks generated proof           |
| `Axiom`/`Parameter`       | User assumptions                             | Can invalidate claims if false/inconsistent   |
| `Admitted`                | Unchecked theorem placeholder                | Trust debt                                    |
| Plugins                   | External compiled extensions                 | Trust depends on plugin behavior/interface    |
| Extraction                | Produces target code                         | Target runtime/compiler outside kernel        |
| Build tooling             | Rechecks files                               | Environment/reproducibility concern           |

**Failure-first explanation:** The tempting mental model is “Rocq proves everything automatically once code compiles.” The correct model is “Rocq checks derivations from the current environment.” If the environment contains axioms, admissions, or unmodeled external behavior, those remain part of the claim.

**Common Pitfalls:** A theorem with hidden assumptions can look stronger than it is. Audit assumptions for serious results.

### Runtime Comparison with Adjacent Languages — what transfers and what does not

**Core keywords:** runtime comparison, Haskell, OCaml, Lean, Agda, Rust, Python.

| Source-language mental model | What transfers to Rocq                                 | What changes                                   | Better Rocq model                             |
| ---------------------------- | ------------------------------------------------------ | ---------------------------------------------- | --------------------------------------------- |
| Haskell pure functions       | Algebraic data, recursion, higher-order functions      | Rocq enforces totality and proof checking      | Pure total terms plus proofs                  |
| OCaml modules                | Namespaces, abstraction, extraction target familiarity | Rocq modules carry theorem APIs                | Modules export laws, not just functions       |
| Lean theorem proving         | Proof states, tactics, dependent types                 | Syntax/elaboration/library differ              | Transfer concepts, not scripts                |
| Agda dependent programming   | Indexed data and total functions                       | Rocq tactic culture is stronger                | Combine terms and tactics                     |
| Rust safety types            | Invalid states unrepresentable                         | Rocq uses explicit proof evidence              | Balance dependent invariants and proof burden |
| Python runtime scripting     | Interactive exploration                                | No dynamic runtime execution model for Gallina | Query/check/reduce, not script side effects   |
| Java/C# exceptions           | Error handling discipline                              | Failure is explicit data or logic              | Use `option`, `result`, relations             |

**Common Pitfalls:** Do not import target-language runtime assumptions into Rocq. Extracted OCaml/Haskell behavior is not the same as Gallina reduction.

### Language-Specific Cost Model — Rocq proof and computation costs

**Core keywords:** cost model, allocation, sharing, proof term, conversion, extraction, build time.

Rocq’s cost model is language-specific. The most important costs are not ordinary object allocation or thread scheduling, but proof checking, reduction, elaboration, automation, imports, universe constraints, and extraction boundaries.

| Operation or pattern      | Usual cost                | Hidden cost                        | How to detect it         | When it matters             | When not to optimize prematurely |
| ------------------------- | ------------------------- | ---------------------------------- | ------------------------ | --------------------------- | -------------------------------- |
| Large proof term          | Kernel checking time      | Slow `Qed` and build               | command delay            | large libraries             | small local proof                |
| Heavy `auto`/`eauto`      | Search                    | exponential-like search spaces     | tactic hangs/slows       | large contexts              | trivial proposition              |
| `lia` on huge context     | Solver time               | many irrelevant hypotheses         | slow arithmetic proof    | arithmetic-heavy proof      | simple goal                      |
| Repeated `simpl`          | Reduction                 | expands definitions                | huge goals               | complex functions           | short proof                      |
| Transparent definitions   | Conversion unfolds them   | proof-checking slowdown            | slow `reflexivity`/`cbn` | large computation           | ordinary theorem                 |
| `Defined` proof objects   | More unfolding potential  | abstraction loss                   | conversion surprises     | computational witnesses     | noncomputational proofs          |
| Dependent records         | Elaboration/equality cost | proof-field equality               | difficult goals          | invariant-heavy APIs        | simple validation                |
| Vectors/indexed types     | Index arithmetic          | transport obligations              | equality subgoals        | fixed-size correctness      | ordinary sequence code           |
| Large imports             | Environment size          | hints/scopes/instances             | slow file load           | large project               | small tutorial                   |
| Rewrite databases         | Normalization             | rewrite loops                      | slow/hanging tactic      | normalization-heavy library | few manual rewrites              |
| Extraction of Peano `nat` | Target runtime allocation | inefficient numeric representation | target profiling         | performance-critical code   | proof-only artifact              |
| Build dependency graph    | Rechecking files          | broad invalidation                 | CI/build times           | large projects              | one-file examples                |
| Plugins/native compute    | External/toolchain cost   | compatibility/trust boundary       | build/runtime issues     | specialized automation      | basic proofs                     |

**Professional rule:** First optimize theorem shape and proof structure. Then optimize automation, opacity, imports, and reduction. Only after extraction should target-language runtime performance dominate.

### Failure-First Semantics Index — central surprises

**Core keywords:** failure-first learning, semantic surprises, diagnostics.

| Tempting wrong model                         | Surprising behavior                                         | Correct semantic explanation                          | Professional rule                  |
| -------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------- |
| Rocq runs programs like an app runtime       | Definitions reduce, proofs check, extraction runs elsewhere | Rocq is primarily a checker/reducer/proof environment | Separate proof-time and runtime    |
| The visible source is the full term          | Hidden arguments/scopes/coercions matter                    | Elaboration creates explicit internal terms           | Use `Check`, `@`, printing tools   |
| All true equalities reduce                   | `n + 0 = n` needs induction                                 | Definitional equality is computation, not all math    | Classify equality first            |
| `simpl` proves math                          | It only reduces definitions                                 | Propositional facts need lemmas                       | Use rewrite/induction              |
| `Qed` and `Defined` are equivalent           | Transparency differs                                        | `Defined` leaves body unfoldable                      | Choose opacity intentionally       |
| Any terminating algorithm should be accepted | Some are rejected                                           | Rocq needs structural/proof-supported termination     | Design recursion for guard checker |
| `Prop` is boolean                            | Cannot branch on arbitrary proposition                      | `Prop` is proof-bearing; `bool` is data               | Use bridge lemmas                  |
| Extraction verifies deployment               | Only source-level core is certified                         | Runtime/wrapper outside theorem                       | State extraction boundary          |
| Automation is the trusted proof              | Kernel checks generated term                                | Tactic is construction mechanism                      | Trust kernel, audit assumptions    |
| Type-correct means semantically adequate     | Wrong spec can be proved                                    | Rocq checks formal derivability                       | Review theorem statements          |
下面这些小节可以插入 **PART 7 Summary** 之前。随后用新的 summary 替换原来的 PART 7 Summary。结构仍保持原任务要求的 `##` / `###` 两层标题规范。

### Prop Elimination, Computational Irrelevance, and Proof Erasure — why `Prop` is not ordinary data

**Core keywords:** `Prop`, elimination restriction, proof irrelevance, computational irrelevance, extraction erasure.

`Prop` is the universe of propositions. It is proof-relevant enough that a proof term inhabits a proposition, but it is usually treated as computationally irrelevant for extraction and program execution. This is why `Prop` is ideal for specifications and theorems, but usually not for runtime data.

| Construct                 | Role                    | Computational consequence                              | Common pitfall                                                                           |                                  |
| ------------------------- | ----------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------- | -------------------------------- |
| `P : Prop`                | Logical proposition     | Proof is evidence for checking                         | Treating it like `bool`                                                                  |                                  |
| `b : bool`                | Computable boolean data | Branchable and extractable                             | Treating it as a full logical spec                                                       |                                  |
| `exists x, P x` in `Prop` | Logical existence       | Witness exists in proof, often erased after extraction | Expecting runtime witness                                                                |                                  |
| `{ x : A                  | P x }`in`Type`          | Dependent pair/subset type                             | Computational component survives; proof may be erased/irrelevant depending on extraction | Confusing with plain existential |
| `A \/ B` in `Prop`        | Logical disjunction     | Proof chooses a side                                   | Expecting ordinary sum data                                                              |                                  |
| `A + B` in `Type`         | Data-level sum          | Runtime branch survives                                | Using it when only logical disjunction is intended                                       |                                  |

Example distinction:

```coq
Definition is_zero_bool (n : nat) : bool :=
  match n with
  | 0 => true
  | S _ => false
  end.

Definition is_zero_prop (n : nat) : Prop :=
  n = 0.
```

`is_zero_bool n` can be used in `if ... then ... else ...`. `is_zero_prop n` is a proposition and requires proof evidence.

```coq
Definition branch_on_bool (n : nat) : nat :=
  if is_zero_bool n then 0 else 1.
```

The following is the wrong mental model:

```coq
(* Not valid as ordinary computation:
   if is_zero_prop n then 0 else 1
*)
```

**Design meaning:** `Prop` is for logical specification; `bool` and data types in `Type` are for computation. Rocq’s type system allows deep connections between them, but they are not interchangeable.

**Failure-first explanation:** The tempting model is “a proved proposition can be used as a runtime condition.” The surprising behavior is that Rocq does not branch computationally on arbitrary `Prop`. The correct explanation is that proofs are checked evidence, not ordinary runtime booleans. The professional rule is: use `bool` for executable decisions, `Prop` for specifications, and bridge them with correctness lemmas.

**Common Pitfalls:** Putting computationally necessary data inside `Prop` can make it disappear or become unusable at extraction boundaries. If a witness or branch must survive as runtime data, use `Type`-level data such as `option`, `sum`, `sig`, or a custom inductive type.

### Assumption Diagnostics — `Print Assumptions`, axioms, admissions, classical dependencies

**Core keywords:** assumptions, `Print Assumptions`, `Axiom`, `Admitted`, classical logic, trust audit.

A Rocq theorem is checked relative to the current environment. If the environment includes axioms, parameters, admitted theorems, or imported classical principles, the theorem may depend on them. This is not necessarily wrong, but it must be visible.

| Diagnostic task                   | Command or practice                      | What it reveals                                       | Why it matters                  |
| --------------------------------- | ---------------------------------------- | ----------------------------------------------------- | ------------------------------- |
| Check theorem dependencies        | `Print Assumptions theorem_name.`        | Axioms and assumptions used by theorem                | Trust audit                     |
| Inspect theorem type              | `Check theorem_name.`                    | Exact proposition proved                              | Specification audit             |
| Inspect proof opacity/body status | `About theorem_name.`                    | Metadata such as opacity                              | Computation/reduction boundary  |
| Locate admitted facts             | project search for `Admitted`            | Unproved trust debt                                   | Proof completeness              |
| Locate axioms                     | project search for `Axiom` / `Parameter` | Assumed objects or propositions                       | Foundation boundary             |
| Check classical imports           | inspect imports and assumptions          | Whether excluded middle or related principles entered | Constructive/classical boundary |

Example:

```coq
Print Assumptions Nat.add_comm.
```

For a theorem in a serious development, this style of inspection helps distinguish “kernel-checked from no assumptions” from “kernel-checked relative to explicit assumptions.”

**Design meaning:** Rocq’s guarantee is conditional: a theorem is derivable from the environment. The environment may contain assumptions. Professional proof development treats assumptions as part of the artifact.

**Failure-first explanation:** The tempting model is “if Rocq accepts it, it is assumption-free.” The surprising behavior is that a theorem may be accepted while depending on `Axiom`, `Admitted`, section hypotheses, or imported classical principles. The correct explanation is that Rocq checks derivability from the environment. The professional rule is: inspect assumptions for important theorems.

**Common Pitfalls:** `Admitted` is especially dangerous because it can make a file compile while leaving a proof gap. Use it only as temporary trust debt and make it visible in review.

### Printing and Elaboration Diagnostics — seeing what Rocq actually checked

**Core keywords:** elaboration, implicit arguments, printing, coercions, universes, hidden structure.

Many Rocq difficulties arise because the source term is not the fully elaborated term. Rocq may infer implicit arguments, insert coercions, resolve notation scopes, infer universe levels, or generalize section variables.

| Problem                        | Diagnostic tool                           | What to inspect                    |
| ------------------------------ | ----------------------------------------- | ---------------------------------- |
| Hidden implicit arguments      | `Check @name.`                            | Full explicit argument structure   |
| Unexpected type                | `Check term.`                             | Inferred type                      |
| Unexpected notation            | `Locate "symbol".`                        | Notation source and scope          |
| Hidden definition body         | `Print name.`                             | Underlying definition/constructors |
| Unexpected theorem metadata    | `About name.`                             | Opacity, module, type              |
| Coercion suspicion             | print coercions / inspect elaborated type | Inserted conversions               |
| Universe issue                 | universe printing commands/settings       | Universe constraints               |
| Section-generalized parameters | `Check name` after `End`                  | Final exported type                |

Example:

```coq
Check Some.
Check @Some.
Check (None : option nat).
Locate "+".
Print nat.
```

These commands are not mere teaching tools. They are professional diagnostics for the elaboration boundary.

**Design meaning:** Rocq’s surface language is ergonomic; the kernel-facing term is more explicit. Understanding the gap between the two is essential for debugging dependent types, overloaded notation, coercions, and library code.

**Failure-first explanation:** The tempting model is “Rocq is rejecting the expression I visually see.” The more precise model is “Rocq is rejecting the elaborated term inferred from this expression.” The professional rule is: expose hidden arguments and notation before changing theorem structure.

**Common Pitfalls:** Do not diagnose a dependent-type error before checking whether a missing type annotation, wrong notation scope, or hidden implicit argument caused the issue.

### Universe Diagnostics and Advanced Genericity — when `Type` stops being simple

**Core keywords:** universe polymorphism, cumulative universes, `Type@{u}`, generic libraries, hierarchy design.

For ordinary proofs over `nat`, `bool`, and `list`, universes are mostly invisible. For generic libraries, mathematical hierarchies, category-like structures, polymorphic records, and large abstractions, universe constraints can become visible.

| Situation                                        | Universe risk              | Professional response                              |
| ------------------------------------------------ | -------------------------- | -------------------------------------------------- |
| Simple theorem over `nat`                        | Low                        | Ignore universes                                   |
| Polymorphic record over `Type`                   | Medium                     | Inspect inferred type if errors appear             |
| Record containing a field of type `Type -> Type` | Medium/high                | Be explicit about universe levels when necessary   |
| Category-like abstraction                        | High                       | Expect universe-polymorphism issues                |
| Large algebraic hierarchy                        | Medium/high                | Follow library universe conventions                |
| Assuming `Type : Type`                           | Invalid mental model       | Remember universe hierarchy                        |
| Combining libraries                              | Possible universe mismatch | Inspect constraints and reduce over-generalization |

A common beginner-safe attitude is: do not introduce explicit universe annotations until Rocq forces the issue. A common professional attitude is: when designing reusable generic libraries, understand that `Type` is universe-polymorphic and not a single flat type.

**Design meaning:** Universes preserve consistency by avoiding paradoxes. They are a soundness feature, not an arbitrary inconvenience.

**Failure-first explanation:** The tempting model is “generic over all types” is always harmless. The surprising behavior is a universe inconsistency or constraint error. The correct explanation is that Rocq must place types into a well-founded hierarchy. The professional rule is: generalize only as far as the library needs, and inspect universes when abstraction becomes genuinely higher-order.

**Common Pitfalls:** Do not solve universe errors by adding axioms. Universe errors usually indicate an abstraction or annotation issue, not a missing theorem.

### Extraction Erasure Boundaries — `Prop`, `bool`, `sumbool`, `sig`, and runtime content

**Core keywords:** extraction, proof erasure, `Prop`, `bool`, `sumbool`, `sig`, computational content.

Extraction separates computational content from proof content. The central design question is: what information must remain available at runtime?

| Rocq representation            | Runtime/extraction intuition                | Use when                                                              | Common mistake               |                                        |
| ------------------------------ | ------------------------------------------- | --------------------------------------------------------------------- | ---------------------------- | -------------------------------------- |
| `P : Prop`                     | Specification/proof, usually erased         | Logical property                                                      | Expecting runtime data       |                                        |
| `bool`                         | Runtime boolean survives                    | Executable test                                                       | Forgetting proof bridge      |                                        |
| `option A`                     | Runtime success/failure survives            | Partial computation                                                   | Losing failure reason        |                                        |
| `result E A`                   | Runtime error/success survives              | Explained failure                                                     | Overengineering local proofs |                                        |
| `{P} + {~P}` / `sumbool` style | Decision evidence with computational branch | Certified decision procedures                                         | Confusing with plain `bool`  |                                        |
| `{ x : A                       | P x }`                                      | Computational `x` survives; proof part generally not runtime evidence | Certified values             | Expecting proof field as runtime check |
| `exists x, P x` in `Prop`      | Logical existence                           | Theorem statements                                                    | Expecting extracted witness  |                                        |

Example contrast:

```coq
Definition eqb_runtime (n m : nat) : bool :=
  Nat.eqb n m.
```

This returns data. A theorem about it connects runtime result to specification:

```coq
Theorem eqb_runtime_sound :
  forall n m, eqb_runtime n m = true -> n = m.
Proof.
  intros n m H.
  unfold eqb_runtime in H.
  apply Nat.eqb_eq.
  exact H.
Qed.
```

**Design meaning:** Certified programming often needs both a runtime decision procedure and a proof that the decision procedure satisfies a proposition. The boolean or data-level result is what executes; the theorem is what certifies it.

**Failure-first explanation:** The tempting model is “if a proof constructs a witness, extraction will give me that witness.” The surprising behavior is that proofs in `Prop` are generally erased. The correct explanation is that proof evidence and computational data occupy different extraction roles. The professional rule is: put runtime-relevant information in computational types, not only in `Prop`.

**Common Pitfalls:** A validator written as a proposition is not an executable validator. A validator written as a boolean is not a specification until soundness and completeness theorems connect it to `Prop`.

### Native and VM Computation Boundaries — performance without changing the theorem

**Core keywords:** `vm_compute`, `native_compute`, reduction performance, conversion, trust boundary, proof readability.

`vm_compute` and `native_compute` are used for faster computation of large terms. They can be useful for verified computation, reflection, and computation-heavy proofs. They do not change the theorem being proved; they change how reduction is performed.

| Method            | Role                              | Best use                       | Caveat                            |
| ----------------- | --------------------------------- | ------------------------------ | --------------------------------- |
| `simpl`           | Small local simplification        | Readable proof steps           | May not compute enough            |
| `cbn`             | Controlled reduction              | Proof-state simplification     | Definition-shape dependent        |
| `cbv`             | More aggressive reduction         | Closed computations            | Can expand too much               |
| `vm_compute`      | Fast VM-based reduction           | Large computable terms         | Less explanatory proof script     |
| `native_compute`  | Native-code reduction             | Very large computations        | Toolchain/environment sensitivity |
| Reflection tactic | Reduce certified boolean decision | Efficient proof by computation | Requires correctness theorem      |

Example pattern:

```coq
(* Schematic:
   prove a proposition by reducing a certified boolean checker,
   then use a theorem connecting checker = true to the proposition.
*)
```

**Design meaning:** Fast computation is an implementation aid for proof checking and certified computation. It is not a replacement for specifications or correctness theorems.

**Common Pitfalls:** A proof that depends on massive computation may be hard to debug when it fails. Prefer separating the decision procedure, its correctness theorem, and the final computation-heavy proof.

### Plugin, Tactic, and External Tool Trust Boundaries — what the kernel still checks

**Core keywords:** plugin, tactic, solver, trust boundary, generated proof term, kernel.

Tactics and plugins can be extremely powerful. The trust question is whether they produce proof terms checked by the kernel or whether they extend the trusted base in a deeper way.

| Mechanism                         | Normal trust story                                                                                   | Risk                                        |
| --------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Basic tactics                     | Construct proof terms checked by kernel                                                              | Script may be brittle                       |
| `lia`, `ring`, automation tactics | Produce proof terms/certificates checked by kernel or trusted mechanisms depending on implementation | Opaque proof source                         |
| Custom `Ltac`                     | Proof-state script; final proof checked                                                              | Fragile or slow scripts                     |
| `Ltac2`                           | Structured tactic programming                                                                        | Additional maintenance burden               |
| OCaml plugins                     | Extend prover behavior                                                                               | Trust and compatibility boundary            |
| External proof search             | May generate certificates/proofs                                                                     | Need certificate checking or trusted bridge |
| `Admitted`                        | No proof generated                                                                                   | Direct trust debt                           |

**Design meaning:** The small-kernel philosophy means complex proof search can be useful without necessarily becoming the main source of trust. But plugins, admissions, and external bridges still need auditing.

**Professional rule:** Trust the kernel-checked theorem, not the elegance of the tactic. For critical developments, know whether a tool generates checked proof terms, checked certificates, or trusted side effects.

**Common Pitfalls:** Treating all automation as equally trustworthy is imprecise. Treating all automation as untrustworthy is also imprecise. The correct question is: what does the kernel check at the end?

### Revised PART 7 Summary — Rocq semantics as checked computation, checked proof, and explicit boundary management

PART 7 established Rocq’s semantic and implementation model. Rocq is not best understood as an application runtime. It is a system for constructing a checked environment of definitions, programs, propositions, proofs, libraries, assumptions, tactics, and sometimes extracted computational artifacts.

| Dimension              | Core lesson                                                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Semantic layers        | Source text is parsed and elaborated into explicit terms checked in a global environment                                                        |
| Elaboration            | Notation, implicit arguments, coercions, scopes, and section variables can hide kernel-relevant structure                                       |
| Kernel checking        | The central trust point is type checking of terms and proof terms under the current environment                                                 |
| CIC                    | Propositions are types, proofs are terms, and theorems are types to be inhabited                                                                |
| Sorts and universes    | `Prop`, `Set`, `SProp`, and `Type` live in a universe hierarchy that protects consistency                                                       |
| `Prop` versus data     | `Prop` is for specifications and proofs; runtime-relevant decisions belong in `bool`, `option`, `result`, `sig`, or other computational types   |
| Conversion             | Definitional equality follows reduction rules, not every mathematical truth                                                                     |
| Propositional equality | Non-definitional equalities require proof, rewriting, induction, or library lemmas                                                              |
| Reduction strategies   | `simpl`, `cbn`, `cbv`, `vm_compute`, and `native_compute` trade readability, predictability, and performance                                    |
| Opacity                | `Qed` and `Defined` create different unfolding and computation boundaries                                                                       |
| Inductives             | Constructors determine values, pattern matching, eliminators, recursion, and induction principles                                               |
| Recursion              | Core recursive definitions must satisfy termination or guardedness requirements to preserve consistency                                         |
| Pattern matching       | Simple matches compute by constructors; dependent matches may create equality and transport obligations                                         |
| Error semantics        | Ordinary failure is explicit data such as `option` or `result`; logical impossibility is `False`                                                |
| Effects and resources  | Gallina is pure; effects and resources must be modeled, extracted, or isolated as assumptions                                                   |
| Memory model           | The main Rocq-level costs are proof terms, conversion, reduction, elaboration, automation, imports, and build checking                          |
| Concurrency            | Concurrency is not a core Gallina runtime model; concurrent systems must be formalized through traces, relations, states, or specialized logics |
| Extraction             | Extraction emits computational content to target languages, while proof content and external runtimes require separate boundary analysis        |
| Assumption diagnostics | `Print Assumptions`, theorem inspection, and admission/axiom audits reveal the real trust base                                                  |
| Universe diagnostics   | Universe errors are abstraction and hierarchy issues, not missing proofs                                                                        |
| Automation and plugins | Tactics construct proof terms, but plugins and external tools introduce compatibility and trust-boundary questions                              |
| Cost model             | Rocq performance is often proof-checking, reduction, automation, import, and build performance before it is target-runtime performance          |

The expert mental model is:

> Rocq source does not merely “run.” It elaborates, checks, reduces, constructs proof terms, records assumptions, manages opacity, validates recursion and universes, and sometimes extracts computational content into another runtime.

The practical consequence is that every serious Rocq claim should be read with four questions in mind:

| Question                                    | Why it matters                                                                                                   |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| What exactly was stated?                    | The theorem statement is the specification                                                                       |
| What assumptions were used?                 | The result is conditional on its environment                                                                     |
| What proof/computation boundary was chosen? | `Prop`, `Type`, `Qed`, `Defined`, and extraction affect computational content                                    |
| What lies outside Rocq’s kernel?            | Runtime wrappers, external systems, plugins, target compilers, and environment assumptions may remain unverified |

## PART 8 — Historical Evolution, Paradigm Shifts, and Current Trends

PART 8 explains Rocq historically, but not as a date list. The useful history is problem-driven: each era reflects a pressure in formal reasoning, mechanized mathematics, certified programming, ecosystem scale, usability, or trust management. Rocq’s present identity is best understood as the result of several long-running pressures: expressive type theory, machine-checked proof, interactive proof engineering, library reuse, verified computation, and ecosystem modernization.

### Historical Orientation — from type-theoretic proof checking to modern Rocq

**Core keywords:** history, Coq, Rocq, CIC, proof assistant, mechanized mathematics, certified programming.

Rocq is the modern successor of the Coq proof assistant. The official early history says that around the end of 1989, version 5.1 was renamed as the system Coq for the Calculus of Inductive Constructions; the current Rocq 9.0 release notes state that Rocq 9.0 is the first release of *The Rocq Prover* and marks completion of the renaming from *The Coq Proof Assistant* to *The Rocq Prover*.

| Historical pressure                       | Design response                                               | Lasting consequence                                |
| ----------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------- |
| Need for machine-checked formal reasoning | Interactive theorem prover with trusted checking              | Proof objects become checkable artifacts           |
| Need for expressive logic                 | Calculus of Inductive Constructions                           | Dependent types, inductives, propositions-as-types |
| Need for mathematical formalization       | Libraries of definitions and theorems                         | Mechanized mathematics becomes cumulative          |
| Need for verified programs                | Executable definitions plus correctness proofs and extraction | Certified programming becomes a major use case     |
| Need for scalable proof development       | Tactics, automation, modules, libraries                       | Proof engineering becomes a discipline             |
| Need for ecosystem modernization          | Rocq rename, command changes, library split, Platform         | Compatibility and migration become central         |
| Need for usability                        | IDE/LSP work, documentation, roadmap, package curation        | Tooling becomes part of theorem-proving practice   |

**Design meaning:** Rocq’s history is not a sequence of unrelated features. It is a sequence of responses to the same basic challenge: making formal proof expressive enough for mathematics and software, while keeping the checked core trustworthy and the development process usable.

**Common Pitfalls:** Do not read Rocq’s history as “an old functional language that gained proofs.” It is a proof-assistant lineage whose programming features serve formal specification, proof, and extraction.

### Era: Type-Theoretic Foundations — CoC, CIC, Curry–Howard, inductive constructions

**Core keywords:** Calculus of Constructions, CIC, Curry–Howard, dependent types, inductives.

The foundational pressure was to design a formal system expressive enough to encode mathematics, propositions, programs, and proofs while remaining checkable. Rocq’s ancestor Coq was tied historically to the Calculus of Constructions and then the Calculus of Inductive Constructions. The official history explicitly links the name Coq to the Calculus of Inductive Constructions era.

| Problem                                   | Constraint                         | Design response                                   | Modern consequence                                           |
| ----------------------------------------- | ---------------------------------- | ------------------------------------------------- | ------------------------------------------------------------ |
| Need to represent propositions and proofs | Proofs must be formally checkable  | Propositions as types, proofs as terms            | Theorem statements are types                                 |
| Need expressive quantification            | Types may depend on values         | Dependent products                                | `forall` is both quantification and dependent function space |
| Need data and structural reasoning        | Mathematics uses inductive objects | Inductive definitions and eliminators             | `Inductive`, `destruct`, `induction` dominate practice       |
| Need computation inside logic             | Definitions should reduce          | Conversion and reduction                          | `simpl`, `cbn`, `reflexivity`, `Compute`                     |
| Need consistency                          | Avoid paradoxes and nontermination | Universe hierarchy, positivity, guarded recursion | Some definitions are rejected by design                      |

**Interdisciplinary Lens: Calculus of Inductive Constructions**

| Item                      | Explanation                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| What it clarifies         | Why data, propositions, programs, and proofs share a typed framework                                      |
| Language feature involved | `Prop`, `Type`, `forall`, `Inductive`, `Fixpoint`, proof terms                                            |
| Practical consequence     | Rocq users design definitions and theorems together                                                       |
| Limit of the lens         | Historical and practical Rocq also depends on tactics, libraries, tools, and social ecosystem conventions |

**Common Pitfalls:** CIC explains why Rocq works, but it does not by itself teach how to maintain proof scripts, search libraries, or design project APIs. Theory is necessary but not sufficient.

### Era: Interactive Proof Construction — proof states, tactics, and human-guided formalization

**Core keywords:** proof state, tactics, interactive proving, proof scripts, automation.

The next pressure was usability. A user could in principle write proof terms directly, but real mathematics and software proofs are too large for raw proof-term construction. Interactive proof states and tactics made proof construction practical.

| Problem                                    | Design response                | Capability gained                     | Cost introduced                          |
| ------------------------------------------ | ------------------------------ | ------------------------------------- | ---------------------------------------- |
| Direct proof terms are unreadable at scale | Tactic language and proof mode | Human-guided construction             | Scripts can be brittle                   |
| Proof obligations are complex              | Goal/hypothesis state          | Local reasoning feedback              | Users must learn proof-state reading     |
| Routine subgoals repeat                    | Automation tactics             | Productivity                          | Opaque proofs                            |
| Large formalizations need structure        | Lemmas, sections, modules      | Proof reuse                           | Dependency management                    |
| Mathematical proofs need interaction       | Incremental development        | Explore and refine theorem statements | Trial-and-error scripts can become messy |

Example pattern:

```coq
Theorem and_comm :
  forall A B : Prop, A /\ B -> B /\ A.
Proof.
  intros A B H.
  destruct H as [HA HB].
  split.
  - exact HB.
  - exact HA.
Qed.
```

The script is interactive, but its product is a proof term. The kernel checks that product.

**Design meaning:** Rocq became not merely a logic, but an environment for developing proofs. Tactics made the human-computer interaction model central.

**Common Pitfalls:** Tactics should not be mistaken for unchecked commands. They construct terms that the kernel checks. But tactics can still be bad engineering if they are opaque or fragile.

### Era: Inductive Data, Recursive Functions, and Mechanized Mathematics

**Core keywords:** inductive definitions, recursive functions, induction principles, mechanized mathematics.

Mechanized mathematics requires formal versions of ordinary mathematical objects: natural numbers, lists, trees, algebraic structures, functions, relations, and proofs over them. Inductive definitions became the core mechanism.

| Mathematical need         | Rocq mechanism                                      | Classic theorem anchor                | Lasting lesson                        |
| ------------------------- | --------------------------------------------------- | ------------------------------------- | ------------------------------------- |
| Natural-number arithmetic | `nat`, recursion, induction                         | `forall n, n + 0 = n`                 | Obvious arithmetic may need induction |
| Finite sequences          | `list`, `app`, `map`, `filter`                      | append associativity, map composition | Induct over recursive argument        |
| Syntax and semantics      | inductive ASTs and relations                        | evaluator correctness                 | Relations model semantic evidence     |
| Algebraic structure       | records, modules, typeclasses, canonical structures | monoid laws, ring laws                | Operations need laws                  |
| Logical predicates        | inductive predicates in `Prop`                      | evenness, evaluation derivations      | Evidence has constructors             |
| Equality reasoning        | rewriting and setoid reasoning                      | symmetry, transitivity, congruence    | Equality is proof-relevant            |

**Historical consequence:** Rocq developments accumulated libraries of definitions and lemmas. This made library navigation, naming conventions, rewriting discipline, and API stability part of the language’s real practice.

**Common Pitfalls:** A theorem prover is only as useful as its libraries and proof patterns. Re-proving elementary facts repeatedly is a sign of poor ecosystem fluency.

### Era: Certified Programming and Extraction — proofs about executable definitions

**Core keywords:** certified programming, extraction, executable definitions, correctness theorem, CompCert-style verification.

Rocq’s constructive core supports executable functions and proofs about them. This created a bridge from formal proof to certified programming. The official Rocq homepage describes Rocq as supporting extraction of executable programs from specifications as OCaml or Haskell source code, and the Reference Manual describes extraction as building certified and relatively efficient functional programs from Rocq functions or proofs of specifications.

| Problem                            | Rocq response                          | Capability gained                          | Boundary that remains               |
| ---------------------------------- | -------------------------------------- | ------------------------------------------ | ----------------------------------- |
| Testing cannot cover all inputs    | Universal correctness theorem          | Algorithm properties proved for all inputs | Specification adequacy              |
| Implementations diverge from specs | Function plus proof                    | Certified implementation                   | External runtime after extraction   |
| Need executable verified code      | Extraction                             | OCaml/Haskell/Scheme target code           | Target compiler/runtime/wrapper     |
| Need verified compilers            | Formal semantics and simulation proofs | Compiler correctness theorems              | Hardware/OS/environment assumptions |
| Need decision procedures           | Boolean functions plus proof bridges   | Computable validators                      | Soundness/completeness proof burden |

Typical certified-programming shape:

```coq
Definition impl : input -> output := ...

Definition spec (x : input) (y : output) : Prop := ...

Theorem impl_correct :
  forall x, spec x (impl x).
Proof.
  ...
Qed.
```

**Design tradeoff:** Certified programming raises assurance but increases front-loaded specification and proof cost. It is powerful when the specification is stable, the domain is mathematically structured, and the proof boundary is clear.

**Common Pitfalls:** Extraction does not verify the whole deployed system. It verifies source-level properties of computational content relative to assumptions.

### Era: Large Formalization Projects — proof engineering becomes a discipline

**Core keywords:** proof engineering, large developments, maintainability, libraries, automation.

As formalizations grew, the core challenge shifted from “can this theorem be proved?” to “can this development be maintained, reused, reviewed, and built across versions?”

| Scaling pressure              | Engineering response              | Modern consequence            |
| ----------------------------- | --------------------------------- | ----------------------------- |
| Long proofs become unreadable | Helper lemmas and proof structure | Lemma design becomes central  |
| Definitions change            | Public behavior lemmas            | Abstraction boundaries matter |
| Automation grows              | Scoped hints and tactics          | Automation boundaries matter  |
| Libraries grow                | Namespaces, modules, packages     | Import discipline matters     |
| Builds slow down              | Dune/opam/CI workflows            | Build engineering matters     |
| Assumptions accumulate        | Assumption audit                  | Trust management matters      |
| Ecosystem styles diverge      | Local proof cultures              | Style compatibility matters   |

**Professional lesson:** Rocq expertise is not only theorem proving. It includes proof API design, import hygiene, theorem naming, automation discipline, dependency management, and compatibility planning.

**Common Pitfalls:** A proof that is short but unmaintainable is not professional-quality proof engineering. Stability under refactoring matters.

### Era: Ecosystem and Library Diversification — standard library, MathComp-style reasoning, domain libraries

**Core keywords:** Stdlib, external libraries, MathComp, reflection, PL theory, separation logic, package ecosystem.

Rocq’s ecosystem diversified as different communities developed different proof styles.

| Ecosystem pressure              | Response                                     | Practical effect                               |
| ------------------------------- | -------------------------------------------- | ---------------------------------------------- |
| General-purpose proof needs     | `Stdlib`                                     | Baseline definitions and theorems              |
| Dense algebraic mathematics     | structured hierarchies and reflection styles | Powerful but style-specific                    |
| Programming-language metatheory | inductive syntax/relations libraries         | Preservation/progress/type soundness workflows |
| Systems verification            | separation logic and resource logics         | Advanced effect/resource reasoning             |
| Verified programming            | extraction-oriented libraries/tools          | Certified executable artifacts                 |
| Automation demand               | solver and tactic packages                   | More productivity, more opacity risk           |
| Package installation            | `opam`, Platform                             | Environment reproducibility                    |

The official Rocq Platform is presented as a distribution combining Rocq with a coherent set of packages, plugins, and libraries, based on `opam`; this reflects the importance of curated ecosystem compatibility in modern practice.

**Common Pitfalls:** There is no single universal Rocq style. A `Stdlib`-style proof, a boolean-reflection proof, a typeclass-heavy algebra proof, and a separation-logic proof may all be valid but use different conventions.

### Era: Coq-to-Rocq Transition — naming, commands, library organization, compatibility

**Core keywords:** Coq-to-Rocq, Rocq 9.0, rename, compatibility, `Corelib`, `Stdlib`, command changes.

The Rocq 9.0 release is historically important. Official release notes state that Rocq 9.0 is the first release of *The Rocq Prover* and marks the completion of the renaming from *The Coq Proof Assistant*.  The Rocq 9.0 changelog states that *The Rocq Prover* is the new official name of the project and describes the new visual identity and website.

The 9.0 changes also included practical ecosystem changes, including the `rocq` command family and library packaging changes such as `Corelib`/`Stdlib` separation. The release notes and change documentation describe compatibility shims, `Corelib`/`Stdlib` changes, and the new command-line interface.

| Change                          | Historical reason                      | Practical consequence                                     |
| ------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| Coq renamed to Rocq             | Project identity and naming transition | Current docs use Rocq; old material uses Coq              |
| Rocq 9.0 as first Rocq release  | Completion of rename                   | Version boundary for migration                            |
| `rocq` command family           | Unified modern interface               | Older `coq*` commands may still appear in legacy material |
| `Corelib` / `Stdlib` separation | Package/layer modernization            | Imports and package dependencies need care                |
| Compatibility shims             | Migration support                      | Old developments can be ported more gradually             |
| Platform baselines              | Curated ecosystem compatibility        | Platform may not equal newest standalone prover           |

**Failure-first explanation:** The tempting model is “Rocq is just Coq with a new name.” The surprising behavior is that version 9.x introduces concrete command and library-organization changes. The correct model is continuity plus migration: the Coq literature remains relevant, but current Rocq practice uses updated names and tooling.

**Common Pitfalls:** Do not blindly mix old Coq-era import paths, new Rocq paths, and Platform-specific assumptions without checking the project’s actual version baseline.

### Paradigm Shift: From Informal Mathematics to Mechanized Mathematics

**Core keywords:** informal proof, mechanized proof, formalization, explicit definitions.

| Old problem                         | New ability                      | Cost                       | Modern practice                         |
| ----------------------------------- | -------------------------------- | -------------------------- | --------------------------------------- |
| Informal definitions hide ambiguity | Formal definitions are checkable | Formalization effort       | State definitions precisely             |
| Human proofs omit cases             | Kernel checks all cases          | Longer proof scripts       | Use induction and case analysis         |
| Mathematical notation overloaded    | Notation/scopes formalized       | Source-reading difficulty  | Use `Locate`, `Check`, explicit imports |
| Lemmas assumed obvious              | Lemmas must be proved/imported   | Library navigation burden  | Search and reuse facts                  |
| Proofs hard to audit mechanically   | Proof terms checked              | Proof engineering required | Maintain proof scripts                  |

**Design meaning:** Mechanized mathematics does not merely translate informal proofs into code. It changes the proof object: every definition, assumption, and inference must be formal.

**Common Pitfalls:** A mathematically elegant paper proof may require substantial formal infrastructure in Rocq, especially when it relies on implicit conventions, omitted cases, or classical assumptions.

### Paradigm Shift: From Testing to Certified Programming

**Core keywords:** testing, specification, proof, extraction, certified program.

| Old problem                         | New ability                       | Cost                       | Caveat                             |
| ----------------------------------- | --------------------------------- | -------------------------- | ---------------------------------- |
| Tests cover examples                | Theorems cover all inputs         | Specification/proof effort | The theorem may be weak            |
| Runtime bugs hidden in edge cases   | Induction covers recursive cases  | Formal model needed        | External effects remain outside    |
| Implementations drift from specs    | Correctness theorem connects them | More proof maintenance     | Refactoring affects proofs         |
| Executable code lacks proof         | Extraction of verified core       | Target runtime boundary    | Wrapper still trusted              |
| Boolean checkers trusted informally | Soundness/completeness theorems   | Bridge lemmas              | Need both directions when relevant |

**Modern practice:** Certified programming works best for pure, structurally defined, specification-heavy cores: parsers, checkers, interpreters, compilers, decision procedures, finite maps, algorithms, and formal semantics.

**Common Pitfalls:** Testing remains useful for specifications, extracted code integration, and external wrappers. Proof does not remove the need to validate the model and operational environment.

### Paradigm Shift: From Direct Proof Terms to Proof Engineering

**Core keywords:** proof term, tactic script, maintainability, automation, helper lemma.

| Old mode                     | New mode                           | Capability gained          | Cost                         |
| ---------------------------- | ---------------------------------- | -------------------------- | ---------------------------- |
| Write proof term directly    | Develop proof interactively        | Human-manageable proofs    | Tactic script maintenance    |
| Prove theorem one-off        | Build lemma hierarchy              | Reuse                      | Naming and dependency design |
| Manual repetitive proofs     | Automation and hints               | Productivity               | Opaque dependencies          |
| Local proof success          | Project-level proof maintenance    | Scalable formalization     | Build and CI discipline      |
| Mathematical proof idea only | Proof script plus invariant lemmas | Reviewable formal artifact | More engineering work        |

**Professional lesson:** Proof engineering is not secondary to theorem proving. In large Rocq developments, the proof architecture often determines long-term viability.

**Common Pitfalls:** Short scripts are not automatically better. A robust script exposes the main induction target, theorem shape, helper lemmas, and proof boundary.

### Paradigm Shift: From Single-Prover Files to Ecosystem-Managed Projects

**Core keywords:** project structure, packages, Platform, `opam`, `dune`, CI, compatibility.

| Old problem                 | Ecosystem response                      | Modern consequence                  |
| --------------------------- | --------------------------------------- | ----------------------------------- |
| Manual loading of files     | Build systems and dependency tools      | Project-level checking              |
| Inconsistent local packages | `opam` switches, Platform               | Environment reproducibility         |
| Library version drift       | version pinning                         | Compatibility planning              |
| Hard-to-share developments  | package conventions                     | Public library design               |
| Editor-only proof success   | CI builds                               | Regression detection                |
| Tooling fragmentation       | `rocq` command family and modernization | Migration and documentation updates |

**Design meaning:** A Rocq proof development is a build artifact. It is not enough for a single file to pass interactively; the project must recheck under a defined environment.

**Common Pitfalls:** If a theorem checks only under one local setup, the artifact is not yet professionally reproducible.

### Mature Trends — established Rocq practice

**Core keywords:** mature trends, mechanized mathematics, PL theory, certified programming, proof engineering.

| Trend                           | Status                      | Driving pressure                  | What changes in practice                     | Caveat                             |
| ------------------------------- | --------------------------- | --------------------------------- | -------------------------------------------- | ---------------------------------- |
| Mechanized mathematics          | Mature                      | Need checkable mathematical proof | Definitions and lemmas become library assets | Formalization cost remains high    |
| Programming-language metatheory | Mature                      | Need rigorous semantics           | Inductive relations, preservation, progress  | Proofs become infrastructure-heavy |
| Certified pure algorithms       | Mature                      | High-assurance computation        | Function/spec/theorem pattern                | External runtime remains boundary  |
| Tactic proof engineering        | Mature                      | Human-scale proof development     | Structured scripts and helper lemmas         | Brittle automation risk            |
| Library-driven development      | Mature                      | Avoid re-proving facts            | Search, imports, theorem APIs                | Library style differences          |
| Build/CI discipline             | Mature for serious projects | Reproducibility                   | Dune/opam/CI workflows                       | Setup overhead                     |
| Assumption auditing             | Mature necessity            | Trust management                  | `Print Assumptions`, admission policies      | Often neglected in small projects  |

**Common Pitfalls:** Mature does not mean easy. The mature parts of Rocq practice are precisely the parts that require discipline: theorem design, proof maintenance, and library fluency.

### Emerging Trends — tooling, automation, metaprogramming, ecosystem modernization

**Core keywords:** emerging trends, IDE, LSP, automation, metaprogramming, Platform, AI assistance.

The official Rocq roadmap emphasizes usability, documentation, installation, IDE improvements, metaprogramming platforms such as `Ltac2`, `Elpi`, and `MetaCoq`, notation/structuring mechanisms, and balancing generality with domain-specific libraries.

| Trend                                  | Status                 | Driving pressure                           | Practice change                           | Caveat                            |
| -------------------------------------- | ---------------------- | ------------------------------------------ | ----------------------------------------- | --------------------------------- |
| Improved IDE/LSP workflows             | Active                 | Proof development needs fast feedback      | Better goal inspection and navigation     | Tool maturity varies              |
| Metaprogramming platforms              | Active                 | Need stronger proof automation             | More reusable tactics/plugins             | More tool complexity              |
| Domain-specific libraries              | Active                 | Large proofs need specialized abstractions | Stronger local ecosystems                 | Steep learning curves             |
| Platform/package curation              | Active                 | Installation and compatibility             | More reproducible setups                  | Platform may lag newest prover    |
| Documentation modernization            | Active                 | New users and migration                    | Better official references                | Old Coq material still widespread |
| AI-assisted proof work                 | Emerging/exploratory   | Proof search and usability pressure        | Suggest proof steps or lemmas             | Kernel checking remains necessary |
| Proof-performance engineering          | Increasingly important | Large developments                         | Attention to opacity, imports, automation | Hard to diagnose casually         |
| Coq-to-Rocq migration tooling/practice | Active                 | Rename and compatibility                   | Updated commands/imports/docs             | Mixed naming will persist         |

**Professional judgment:** Emerging trends should be adopted when they improve proof maintainability, reproducibility, or library compatibility. Avoid adopting tools merely because they are fashionable.

**Common Pitfalls:** AI assistance or automation can suggest proofs, but the kernel-checked theorem statement and assumptions remain the source of trust.

### Speculative or Overhyped Trends — what to treat carefully

**Core keywords:** hype, AI proof, full automation, whole-system verification, extraction.

| Claim                                        | Why it is overhyped or incomplete                                         | Better interpretation                              |
| -------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------- |
| “AI will replace proof engineers”            | Proofs still need specifications, theorem design, assumptions, and review | AI may assist search and boilerplate               |
| “Automation makes understanding unnecessary” | Automated proofs can be brittle and opaque                                | Use automation for stable routine goals            |
| “Extraction gives verified software”         | Runtime, wrapper, compiler, I/O, and environment may remain unverified    | Extraction gives a verified core under assumptions |
| “Dependent types eliminate testing”          | Tests still catch spec/model/integration mistakes                         | Proof and testing serve different roles            |
| “Everything should be in dependent types”    | Over-dependent models become hard to use                                  | Use dependent types for central stable invariants  |
| “Rocq is just a math notation system”        | It has computation, extraction, tactics, modules, libraries               | It is a proof-development environment              |
| “Rocq is just functional programming”        | Proofs, propositions, and kernel checking are central                     | It is a dependently typed proof assistant          |

**Common Pitfalls:** Overhyped claims usually erase boundaries: between theorem and specification, proof and runtime, automation and understanding, model and system.

### Declining or Legacy Patterns — useful to recognize, not blindly imitate

**Core keywords:** legacy, Coq-era names, old commands, obsolete tactics, brittle scripts.

| Legacy/declining pattern                  | Why it persists                 | Modern response                                            |
| ----------------------------------------- | ------------------------------- | ---------------------------------------------------------- |
| Coq-era terminology in old tutorials      | Historical continuity           | Translate to current Rocq naming when writing new material |
| Old import paths                          | Existing libraries              | Use current project convention consistently                |
| Broad global imports                      | Convenience                     | Prefer intentional imports                                 |
| Proof scripts relying on generated names  | Quick interactive development   | Name hypotheses and cases explicitly                       |
| Heavy `auto` without explanation          | Short scripts                   | Expose central proof structure                             |
| `Admitted` placeholders left indefinitely | Development pressure            | Audit and eliminate                                        |
| Re-proving standard lemmas                | Not knowing library names       | Use `Search`                                               |
| Treating Platform as always newest prover | Curated distribution assumption | Distinguish Platform baseline from standalone prover       |

**Common Pitfalls:** Legacy code is not necessarily bad code. But copying legacy patterns without understanding compatibility and style context creates avoidable maintenance problems.

### Rocq Among Adjacent Proof Assistants — historical comparison

**Core keywords:** Lean, Agda, Isabelle/HOL, F*, Idris, HOL, proof assistant ecosystem.

| System        | Similarity to Rocq                              | Historical/design difference                          | Transfer lesson                                  |
| ------------- | ----------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------ |
| Lean          | Dependent type theory, theorem proving, tactics | Different elaborator, library culture, math ecosystem | Transfer theorem-proving concepts, not scripts   |
| Agda          | Dependent types and constructive programming    | More direct dependently typed programming style       | Transfer indexed-type intuition                  |
| Isabelle/HOL  | Mature proof assistant and formal math          | HOL rather than CIC                                   | Do not import propositions-as-types assumptions  |
| HOL family    | Theorem proving tradition                       | Different logic and automation styles                 | Understand logic before transferring proof style |
| F*            | Verification-oriented programming               | Effect/refinement style and SMT workflow differ       | Transfer spec/program thinking                   |
| Idris         | Dependently typed programming                   | Programming-language orientation differs              | Transfer dependent modeling cautiously           |
| Haskell/OCaml | Functional programming lineage                  | No proof-kernel-centered theorem development          | Transfer ADTs/functions, not correctness model   |

**Professional judgment:** Cross-language comparison improves understanding when it clarifies what is Rocq-specific: CIC, tactics as proof-term construction, kernel checking, `Prop`/`Type` distinctions, extraction boundaries, and proof-engineering culture.

**Common Pitfalls:** Do not describe Rocq as “Lean but older,” “Agda with tactics,” or “Haskell with proofs.” Each comparison misses central design differences.

### Historical Anchor Map — classic theorem and project anchors

**Core keywords:** theorem anchors, project anchors, mathematical formalization, PL metatheory, verified software.

| Anchor                           | Historical/conceptual role          | What it teaches                                  |
| -------------------------------- | ----------------------------------- | ------------------------------------------------ |
| `A -> A`                         | Minimal propositions-as-types proof | Implication as function                          |
| `A /\ B -> B /\ A`               | Constructive evidence manipulation  | Destruct and rebuild proof evidence              |
| `forall n, n + 0 = n`            | Induction over recursive data       | Definitional equality versus propositional proof |
| Append associativity             | List recursion and proof reuse      | Induct over recursive argument                   |
| Reverse involution               | Helper lemma necessity              | Strengthening theorem statements                 |
| Boolean equality correctness     | Computation/spec bridge             | `bool` versus `Prop`                             |
| Evaluator soundness              | Function-relation bridge            | Induction on derivations                         |
| Preservation/progress            | PL metatheory                       | Type soundness as theorem                        |
| Compiler correctness             | Certified programming at scale      | Simulation/refinement proof                      |
| Four-color theorem formalization | Mechanized mathematics at scale     | Formal proof replaces informal trust             |
| Verified compiler projects       | Certified software                  | Proof boundary and model adequacy                |

**Common Pitfalls:** Classic anchors are not decorative examples. They encode the historical reasons proof assistants matter: they make implicit proof structure explicit and reusable.

### Trend Decision Table — what to adopt, postpone, or watch

**Core keywords:** trend decision, mature, emerging, speculative, legacy.

| Trend or practice                   | Adopt now         | Watch | Postpone            | Reason                                                |
| ----------------------------------- | ----------------- | ----- | ------------------- | ----------------------------------------------------- |
| `Stdlib` search/navigation          | Yes               | No    | No                  | Core professional skill                               |
| Explicit theorem APIs               | Yes               | No    | No                  | Maintains abstraction                                 |
| Scoped automation                   | Yes               | No    | No                  | Prevents brittle proof scripts                        |
| Dune/opam/CI for serious projects   | Yes               | No    | No                  | Reproducibility                                       |
| Rocq 9 naming and command awareness | Yes               | No    | No                  | Current ecosystem baseline                            |
| Advanced metaprogramming            | Sometimes         | Yes   | Sometimes           | Useful when repeated proof patterns justify it        |
| Typeclasses/canonical structures    | Sometimes         | Yes   | Sometimes           | Essential in some libraries, overkill elsewhere       |
| AI-assisted proof suggestions       | Carefully         | Yes   | Often               | Helpful but not trust source                          |
| Heavy dependent encodings           | Sometimes         | Yes   | Often               | Use only when invariant warrants cost                 |
| Coinduction                         | Domain-dependent  | Yes   | Usually             | Important but not central for most early developments |
| Large external libraries            | Project-dependent | Yes   | Sometimes           | Learn when domain requires them                       |
| Legacy Coq-era styles               | Recognize         | Yes   | For new code, often | Needed for reading old code, not always for new work  |

### PART 8 Summary — history as accumulated design pressure

Rocq’s history is the accumulation of design pressures around formal proof, expressive type theory, practical proof construction, reusable libraries, certified programming, and ecosystem scale.

| Historical dimension      | Core lesson                                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Type-theoretic foundation | CIC explains propositions-as-types, dependent types, inductives, and proof terms                                     |
| Interactive proof         | Tactics and proof states made large proof construction human-manageable                                              |
| Mechanized mathematics    | Formal definitions and theorem libraries turned mathematics into checked artifacts                                   |
| Certified programming     | Executable definitions plus correctness theorems enabled verified computational cores                                |
| Proof engineering         | Large developments require helper lemmas, abstraction boundaries, automation discipline, and build systems           |
| Ecosystem diversification | Different domains created different library cultures and proof idioms                                                |
| Coq-to-Rocq transition    | Rocq 9.x preserves historical continuity while modernizing naming, commands, and library organization                |
| Tooling evolution         | IDEs, build systems, Platform, opam, documentation, and CI are now part of serious proof practice                    |
| Automation evolution      | Automation improves productivity but must remain bounded by reviewable theorem statements and kernel checking        |
| Current trends            | Usability, metaprogramming, domain libraries, packaging, and AI assistance matter, but do not replace proof judgment |

The expert historical interpretation is:

> Rocq evolved because formal proof at scale is not only a logic problem. It is also a language-design problem, a human-computer interaction problem, a library-design problem, a software-engineering problem, and a trust-boundary problem.

## PART 9 — Professional Workflow, Tooling, Debugging, and Mastery Path

PART 9 turns the previous material into a professional operating model. The target is not “knowing tactics,” but maintaining checked developments that are readable, reproducible, reviewable, performant, and honest about their assumptions. Rocq’s own documentation frames project work around installation, package management, project structure, logical paths, dependency order, and compilation of `.v` scripts into `.vo` files before they can be required by other files.

### Workflow Orientation — from interactive proof to maintained development

**Core keywords:** workflow, proof engineering, reproducibility, CI, review, assumptions.

A Rocq development has two lives. First, it is developed interactively: goals are inspected, tactics are tried, definitions are adjusted, and lemmas are discovered. Second, it becomes a maintained artifact: files compile, dependencies are pinned, assumptions are audited, theorem APIs are documented, and CI rechecks the whole project.

| Workflow layer    | Main activity                                 | Professional success criterion       | Common failure                  |
| ----------------- | --------------------------------------------- | ------------------------------------ | ------------------------------- |
| Exploration       | Try definitions, `Compute`, `Check`, `Search` | Understand goal and available tools  | Leaving trial-and-error clutter |
| Local proof       | Prove theorem once                            | Correct proof term accepted          | Brittle script                  |
| Proof cleanup     | Name hypotheses, add helper lemmas            | Readable and reviewable proof        | Auto-generated names everywhere |
| API design        | Export definitions and theorems               | Clients reason through stable lemmas | Clients unfold internals        |
| Build integration | Configure logical paths and dependencies      | Clean build from fresh environment   | Editor-only success             |
| Assumption audit  | Track axioms/admissions/classical imports     | Trust base is explicit               | Hidden trust debt               |
| Documentation     | Explain theorem API and invariants            | Usable by future readers             | Theorem names are opaque        |
| CI and release    | Recheck whole project                         | Version-pinned reproducibility       | Local-only proof artifact       |

**Professional rule:** A proof that works interactively is a draft. A proof that is stable under clean build, review, assumption audit, and reasonable refactoring is a professional artifact.

**Common Pitfalls:** Treating “the file checks in my editor” as the end state is insufficient. The full project must check under a known environment.

### Task: Structure a Rocq Project — files, modules, logical paths, dependency order

**Core keywords:** project structure, `.v`, `.vo`, logical path, load path, modules, dependencies.

Rocq project structure is tied to logical names and dependency order. If `B.v` requires definitions from `A.v`, `A.v` must be compiled first; compiled `.vo` artifacts are what later files require. The official project-building documentation explicitly states that scripts in `.v` files are compiled to `.vo` files using `rocq compile` before they can be required by other files.

| Project element  | Meaning                                   | Professional practice                             | Pitfall                                |
| ---------------- | ----------------------------------------- | ------------------------------------------------- | -------------------------------------- |
| `.v` file        | Source script                             | Keep one conceptual module per file when possible | Giant unstructured files               |
| `.vo` file       | Compiled checked artifact                 | Build-generated, not hand-edited                  | Requiring source not compiled artifact |
| Logical path     | Module namespace path                     | Configure consistently                            | Import path mismatch                   |
| Load path        | Mapping from logical names to directories | Managed by build tool or project config           | Local setup differs from CI            |
| Module name      | File/module identity                      | Align names with directory hierarchy              | Ambiguous or unstable names            |
| Dependency order | Required compilation sequence             | Let build system compute it                       | Manual order errors                    |

A small project usually benefits from a conceptual separation like this:

| File role           | Example file  | Contents                              |
| ------------------- | ------------- | ------------------------------------- |
| Basic definitions   | `Syntax.v`    | Inductive types, basic functions      |
| Semantics/specs     | `Semantics.v` | Relations, predicates, specifications |
| Lemmas              | `Lemmas.v`    | Reusable proof facts                  |
| Main theorem        | `Soundness.v` | The central theorem                   |
| Extraction boundary | `Extract.v`   | Extraction commands and assumptions   |
| Public API          | `Interface.v` | Re-exported theorems and definitions  |

**Design meaning:** File structure is proof structure. A bad file layout forces bad import habits, circular dependencies, and unreadable theorem APIs.

**Common Pitfalls:** Do not put every lemma in the same file merely because it is convenient during exploration. Move reusable lemmas near the definitions they explain, or into a clearly named theory file.

### Task: Configure Build Systems — `_CoqProject`, Dune, `rocq compile`, `rocq dep`

**Core keywords:** `_CoqProject`, Dune, `rocq compile`, `rocq dep`, logical paths, build.

For small or legacy projects, `_CoqProject`-style configuration may appear. For larger developments, Dune is a common build orchestrator. Rocq’s project-building documentation covers `_CoqProject`, logical paths, load paths, dependency computation, and `rocq dep`; Dune’s Rocq support can build Rocq theories and plugins, supports extraction and `.mlg` preprocessing, and represents a Rocq theory as a collection of `.v` files whose module names share a prefix.

| Build approach        | Best use                         | Strength                           | Cost                         |
| --------------------- | -------------------------------- | ---------------------------------- | ---------------------------- |
| Manual `rocq compile` | Tiny examples or diagnostics     | Direct and transparent             | Not scalable                 |
| `_CoqProject`         | Simple traditional project setup | Records options/load paths         | Can become hard to maintain  |
| `rocq dep`            | Dependency analysis              | Correct compile ordering           | Needs integration            |
| Dune `rocq.theory`    | Multi-file maintained project    | Builds theories/plugins/extraction | Requires Dune configuration  |
| CI build command      | Regression checking              | Reproducibility                    | Needs environment management |

Dune’s `rocq.theory` stanza determines module scope through a module prefix, and Dune can also build Rocq plugins, which are OCaml libraries that Rocq loads dynamically. This matters because plugins are not merely `.v` proof files; they introduce compiled-code and toolchain boundaries.

**Professional rule:** Use the simplest build system that cleanly supports the project’s size, dependencies, and release goals. For serious multi-file developments, do not rely on manual compile order.

**Common Pitfalls:** A plugin-enabled build has a different trust and compatibility profile from a pure `.v` theory. Treat plugins as tooling dependencies, not ordinary lemmas.

### Task: Manage Package Environments — `opam`, Platform, pins, version baselines

**Core keywords:** `opam`, Rocq Platform, switch, pin, version baseline, dependency reproducibility.

Rocq package management is closely tied to `opam`; the project-building documentation recommends installation through the platform route and notes that packages installed by the platform should compile together as part of the platform release process. It also documents `opam list`, `opam install`, and related commands for finding and installing packages.

| Environment task         | Tool/pattern                 | Why it matters                                              |
| ------------------------ | ---------------------------- | ----------------------------------------------------------- |
| Isolate dependencies     | `opam switch`                | Different projects may need different Rocq/library versions |
| Install curated baseline | Rocq Platform                | Coherent set of packages                                    |
| Add package              | `opam install <package>`     | Bring external library into environment                     |
| Inspect package files    | `opam show --list-files ...` | Find logical library name                                   |
| Inspect load path        | `Print LoadPath`             | Debug logical path resolution                               |
| Pin versions             | opam pin/lock strategy       | Reproducible build                                          |
| Upgrade carefully        | controlled switch update     | Manage proof breakage                                       |

The official homepage lists current release information and identifies Rocq as a trustworthy interactive theorem prover and dependently typed programming language; it also shows that standalone prover and platform releases are tracked separately.

**Professional rule:** Record the exact prover version, package versions, and platform baseline. A proof development is checked relative to a specific environment.

**Common Pitfalls:** Do not assume the current standalone prover and the current platform package set are identical baselines. Platform releases are curated for package compatibility.

### Task: Use Interactive Tools Without Letting Them Own the Proof

**Core keywords:** editor, proof state, LSP, REPL, interactive proving, cleanup.

Interactive tools are central because Rocq proof development depends on goal inspection. But the editor session is not the artifact; the checked source is.

| Interactive action      | Good use                    | Cleanup requirement                              |
| ----------------------- | --------------------------- | ------------------------------------------------ |
| Step through tactics    | Understand proof state      | Remove failed attempts                           |
| Try `Search`            | Find lemmas                 | Use exact theorem names in final proof           |
| Try automation          | Test routine solvability    | Replace central automation with structured proof |
| Inspect `Check`/`Print` | Understand hidden structure | Keep only useful comments/queries                |
| Use `Compute`           | Explore definition behavior | State theorem if behavior matters                |
| Abort/restart proofs    | Refine theorem shape        | Remove dead code                                 |

Example diagnostic block that should usually not remain in final library code:

```coq
Check app_assoc.
Search (_ ++ [] = _).
Compute (rev [1;2;3]).
```

These are excellent during development. In final code, they may be removed unless the file is explicitly pedagogical.

**Professional rule:** Use interactive tools aggressively during discovery; clean the proof script into a stable artifact afterwards.

**Common Pitfalls:** Leaving exploratory queries and half-explanatory comments in production files can obscure the actual theorem API.

### Task: Debug Proof Failures Systematically — goal shape before tactic choice

**Core keywords:** debugging, proof state, tactic failure, goal shape, diagnosis.

Most proof failures are not deep semantic failures. They are mismatches between the tactic and the current goal.

| Symptom                            | Likely cause                                     | Diagnostic move            | Repair                                    |
| ---------------------------------- | ------------------------------------------------ | -------------------------- | ----------------------------------------- |
| `split` fails                      | Goal is not conjunction                          | Read goal                  | Use tactic matching goal                  |
| `left`/`right` fails               | Goal is not disjunction                          | Read goal                  | Destructure evidence or prove needed side |
| `exists` fails strangely           | Wrong witness type                               | `Check witness`            | Supply correct witness                    |
| `rewrite H` fails                  | No matching subterm or wrong direction           | Inspect goal and `Check H` | Use `rewrite <- H` or simplify first      |
| `reflexivity` fails                | Terms not convertible                            | `cbn`, inspect definitions | Use lemma/induction                       |
| `simpl` does nothing               | Reduction blocked by variable/opacity            | `Print` definitions        | Use theorem, unfold selectively           |
| `apply H` creates unexpected goals | `H` has premises                                 | `Check H`                  | Prove generated premises                  |
| `induction` gives weak IH          | Variables fixed too early                        | Inspect IH                 | Generalize before induction               |
| `destruct` loses test result       | No branch equation saved                         | Use `destruct ... eqn:H`   | Preserve equation                         |
| `lia` fails                        | Goal not linear arithmetic or contains structure | Simplify/rewrite first     | Use structural lemma or another tactic    |

**Failure-first workflow:**

| Step | Question                                                              |
| ---- | --------------------------------------------------------------------- |
| 1    | What is the exact current goal?                                       |
| 2    | What hypotheses are available?                                        |
| 3    | Is the goal logical, equality, arithmetic, structural, or relational? |
| 4    | Is the needed equality definitional or propositional?                 |
| 5    | Does the theorem statement give a strong enough induction hypothesis? |
| 6    | Is a standard lemma already available?                                |
| 7    | Is a helper lemma missing?                                            |
| 8    | Is automation hiding the real issue?                                  |

**Common Pitfalls:** Randomly adding `try`, `auto`, `simpl in *`, or `rewrite ... in *` often produces shorter but less stable scripts. Diagnose first.

### Task: Debug Type and Elaboration Failures — hidden arguments, scopes, coercions, universes

**Core keywords:** elaboration, implicit arguments, scope, notation, coercion, universe error.

Type errors often come from what the source hides. Use diagnostics before changing the theorem.

| Symptom                        | Possible source                 | Diagnostic                              |
| ------------------------------ | ------------------------------- | --------------------------------------- |
| Constructor type unclear       | Implicit arguments hidden       | `Check @Constructor`                    |
| `None` ambiguous               | Missing type context            | `(None : option nat)`                   |
| Operator parsed unexpectedly   | Wrong scope                     | `Locate "+"`, `Check` parsed term       |
| Theorem application fails      | Implicit arguments not inferred | `Check theorem`, use explicit arguments |
| Coercion inserted unexpectedly | Library coercion                | Print/check elaborated type             |
| Universe inconsistency         | Over-general abstraction        | Inspect universe constraints            |
| Record projection confusing    | Hidden parameters               | `Check @field_name`                     |
| Section export surprising      | Generalization                  | `Check name` after `End`                |

Example:

```coq
Check Some.
Check @Some.
Check (None : option nat).
Locate "++".
Check app_assoc.
```

**Professional rule:** When a term is rejected, ask what Rocq inferred, not only what the source visually suggests.

**Common Pitfalls:** Many “dependent type problems” are actually missing annotations, wrong scopes, or hidden implicit arguments.

### Task: Debug Library and Import Problems — names, logical paths, packages

**Core keywords:** import, logical path, load path, package name, module name.

Package names and logical names are not always identical. Rocq’s project-building documentation explains ways to find logical names, including inspecting installed package files, listing installed user-contributed libraries under the Rocq installation, and using `Print LoadPath`.

| Symptom                       | Likely cause                            | Diagnostic                       | Repair                          |
| ----------------------------- | --------------------------------------- | -------------------------------- | ------------------------------- |
| `Cannot find a physical path` | Load path not configured                | `Print LoadPath`                 | Fix project config/build stanza |
| `Cannot find library X`       | Package missing or wrong logical name   | package file listing / load path | Install or correct import       |
| Works locally, fails in CI    | Environment mismatch                    | compare opam switch/build logs   | pin versions                    |
| Notation unavailable          | Module loaded but notation not imported | `Locate`                         | `Import ...Notations`           |
| Theorem name unavailable      | Wrong module/version                    | `Search`, docs                   | use current theorem/module      |
| Plugin load failure           | Plugin package/build issue              | build logs                       | install compatible plugin       |
| Old Coq path fails            | Rocq migration/path change              | check current docs               | use project convention          |

**Common Pitfalls:** Installing an `opam` package does not automatically tell the source file which logical name to `Require`. Inspect load paths and package file layout.

### Task: Profile Proof Performance — checking time, reduction, automation, imports

**Core keywords:** proof performance, checking time, reduction cost, automation cost, import cost.

Professional Rocq work includes performance hygiene. The bottleneck is often proof checking, tactic search, reduction, or imports, not target runtime execution.

| Performance symptom           | Likely cause                            | Response                                            |
| ----------------------------- | --------------------------------------- | --------------------------------------------------- |
| Slow `Qed`                    | Huge generated proof term or conversion | Break proof into lemmas; reduce automation          |
| Slow `simpl`/`cbn`            | Too much transparent unfolding          | Use opacity or specific rewrite lemmas              |
| Slow `auto`/`eauto`           | Large search space                      | Scope hints, reduce depth, apply key lemmas         |
| Slow file startup             | Heavy imports                           | Narrow imports                                      |
| Slow build after small change | Dependency graph too broad              | Split files; reduce unnecessary imports             |
| Huge goals                    | Over-unfolding or dependent expansion   | Fold definitions, use lemmas                        |
| Rewriting loops               | Bad rewrite database orientation        | Orient rewrite rules toward normal forms            |
| Universe-heavy errors         | Over-generic abstractions               | Simplify universe design                            |
| Extracted code slow           | Bad target representation               | Consider extraction mappings/target-level profiling |

**Cost-control table:**

| Practice                      | Benefit                                   |
| ----------------------------- | ----------------------------------------- |
| Use helper lemmas             | Smaller proof terms and clearer scripts   |
| Use `Qed` for ordinary proofs | Prevents unnecessary unfolding            |
| Keep imports narrow           | Reduces environment and hidden automation |
| Expose public rewrite lemmas  | Avoids unfolding private definitions      |
| Scope automation              | Controls proof search                     |
| Avoid `Defined` by default    | Reduces conversion burden                 |
| Split large files             | Improves build invalidation behavior      |
| Check full project regularly  | Catches performance regressions early     |

**Common Pitfalls:** The shortest script can be the slowest script if it hides huge automation or reduction. Line count is not a performance metric.

### Task: Maintain Proofs Under Refactoring — stable scripts, stable APIs

**Core keywords:** refactoring, theorem API, proof stability, generated names, abstraction.

Rocq proofs are programs depending on definitions, theorem statements, imports, names, transparency, and notation. Refactoring must preserve the proof API where clients depend on it.

| Refactoring                  | Breakage risk                   | Stability tactic                  |
| ---------------------------- | ------------------------------- | --------------------------------- |
| Change function body         | Proofs that unfolded it break   | Use behavior lemmas               |
| Rename theorem               | Client proofs fail              | Provide migration alias if public |
| Generalize theorem statement | Rewrites may no longer match    | Keep wrapper theorem              |
| Change notation              | Parsing/printing changes        | Scope notation carefully          |
| Change imports               | Automation/hints disappear      | Name key lemmas explicitly        |
| Change constructor order     | Destruct-generated names change | Use explicit names and patterns   |
| Make definition opaque       | Conversion-based proofs fail    | Replace with rewrite theorem      |
| Make proof transparent       | Conversion may slow             | Keep ordinary proofs opaque       |

**Professional rule:** Preserve public theorem shapes as carefully as public function types. A theorem is an API.

**Common Pitfalls:** Removing “obvious” lemmas can break downstream proofs. Obvious lemmas often serve as rewrite anchors.

### Task: Review Rocq Code Professionally — theorem, proof, boundary, build

**Core keywords:** code review, proof review, theorem review, boundary review.

Rocq review differs from ordinary code review because theorem statements and assumptions are as important as implementation bodies.

| Review object      | Questions to ask                                     | Warning sign                      |
| ------------------ | ---------------------------------------------------- | --------------------------------- |
| Definition         | Is the representation appropriate?                   | Over-dependent or under-specified |
| Function signature | Does failure/invariant live in right place?          | Awkward proof burden              |
| Theorem statement  | Does it specify the intended property?               | Weak theorem named `correct`      |
| Proof script       | Is the proof idea visible?                           | Main proof hidden in automation   |
| Helper lemmas      | Are invariants named?                                | Long inline proof                 |
| Imports            | Are dependencies intentional?                        | Broad unexplained imports         |
| Assumptions        | Are axioms/admissions/classical principles explicit? | Hidden trust debt                 |
| Opacity            | Are `Qed`/`Defined` choices intentional?             | Everything transparent            |
| API boundary       | Do clients unfold internals?                         | No public behavior lemmas         |
| Build              | Does it check cleanly?                               | Local-only success                |
| Extraction         | Is runtime boundary stated?                          | Whole-system overclaim            |

**Review checklist:**

| Level               | Minimum acceptable condition                       |
| ------------------- | -------------------------------------------------- |
| Theorem level       | Statement is meaningful and strong enough          |
| Proof level         | Proof structure is readable and robust             |
| Library level       | Standard facts are reused or wrapped intentionally |
| Project level       | Build is reproducible                              |
| Trust level         | Assumptions are audited                            |
| Documentation level | Public theorem names communicate behavior          |

**Common Pitfalls:** Reviewing only whether `Qed` succeeds is too shallow. A poor theorem can be perfectly proved.

### Task: Document Theorem APIs — names, comments, examples, generated docs

**Core keywords:** documentation, theorem names, API, comments, examples.

Rocq documentation is partly generated from source. Dune’s Rocq theory stanza includes documentation-related fields such as `rocqdoc_flags`, header, and footer support, indicating that documentation generation belongs to the project workflow rather than being an afterthought.

| Documentation element | Good practice               | Bad practice                      |
| --------------------- | --------------------------- | --------------------------------- |
| Definition name       | Names role                  | Cryptic abbreviation              |
| Theorem name          | Names behavior              | `lemma1`, `correct2`              |
| Comment               | Explains invariant/boundary | Narrates every tactic             |
| Module structure      | Groups theory logically     | Dumping ground file               |
| Example               | Shows intended API use      | Depends on private internals      |
| Generated docs        | Clean public surface        | Exposes cluttered helper names    |
| Assumption note       | States trust boundary       | Classical/axiom dependency hidden |

Example naming:

| Weak name      | Better name               |
| -------------- | ------------------------- |
| `sort_correct` | `sort_sorted_permutation` |
| `helper1`      | `rev_acc_correct`         |
| `lemma_lookup` | `lookup_update_eq`        |
| `thm`          | `map_length`              |
| `fix1`         | `eval_rel_sound`          |

**Professional rule:** A theorem name should help `Search`, review, and client proof development.

**Common Pitfalls:** Over-commenting tactics is less useful than naming lemmas well. Explain proof ideas and invariants, not every mechanical step.

### Task: Use Examples and Tests Without Confusing Them with Proofs

**Core keywords:** examples, `Compute`, testing, theorem, CI.

Examples and computations are useful, but they do not replace universal theorems.

| Artifact             | What it gives                   | What it does not give       |
| -------------------- | ------------------------------- | --------------------------- |
| `Compute`            | Reduction behavior for one term | Reusable theorem            |
| `Example`            | Checked specific case           | Universal correctness       |
| Unit-like examples   | Spec sanity check               | Full proof                  |
| General theorem      | Universal property              | Model adequacy              |
| CI build             | Regression checking             | Automatic spec correctness  |
| Extracted smoke test | Integration confidence          | Formal wrapper verification |

Example:

```coq
Definition double (n : nat) : nat := n + n.

Example double_2 :
  double 2 = 4.
Proof.
  reflexivity.
Qed.

Theorem double_zero :
  double 0 = 0.
Proof.
  reflexivity.
Qed.
```

These are checked facts, but they are not a full theorem about `double`.

**Common Pitfalls:** Examples often catch bad definitions early. They should not be advertised as verification unless the property needed is only that specific case.

### Task: Audit Assumptions, Admissions, and Trust Debt

**Core keywords:** assumptions, admissions, axioms, trust debt, classical imports.

A serious Rocq artifact should make its trust base explicit.

| Trust item               | Audit method                        | Interpretation                            |
| ------------------------ | ----------------------------------- | ----------------------------------------- |
| `Admitted`               | source search / build policy        | Unproved theorem                          |
| `Axiom`                  | source search / `Print Assumptions` | Explicit assumption                       |
| `Parameter`              | inspect interfaces                  | Abstract object or missing implementation |
| Classical imports        | inspect imports/assumptions         | Constructive boundary crossed             |
| Plugin use               | build config/imports                | Tool/trust boundary                       |
| Extraction wrapper       | target source review                | Outside theorem unless modeled            |
| External theorem/package | package assumptions                 | Depends on library trust                  |
| Local hypotheses         | inspect theorem type                | Theorem conditional on parameters         |

Example:

```coq
Print Assumptions theorem_name.
```

**Professional rule:** For critical theorems, the theorem statement and assumption list are part of the deliverable.

**Common Pitfalls:** `Admitted` can make the project compile. That makes it more dangerous, not less.

### Task: Manage Migration and Compatibility — Coq-era code, Rocq 9.x, paths, commands

**Core keywords:** migration, compatibility, Coq-era code, Rocq 9, command names, library paths.

Modern Rocq inherits a large Coq-era ecosystem. Compatibility work is therefore normal.

| Migration issue          | Symptom                            | Response                                              |
| ------------------------ | ---------------------------------- | ----------------------------------------------------- |
| Old command names        | Legacy scripts use `coq*` commands | Use project-standard modern commands where applicable |
| Old import paths         | `Coq.` paths in old code           | Follow current project/library convention             |
| Library split            | `Corelib`/`Stdlib` distinction     | Import from correct layer                             |
| Deprecated tactics       | Old scripts fail or warn           | Replace with modern tactic/style                      |
| Notation differences     | Parsing changes                    | Use `Locate`, scopes                                  |
| Platform/prover mismatch | Package compile issue              | Choose compatible baseline                            |
| External library lag     | Package not updated                | Pin older Rocq or wait/port                           |
| CI migration             | Build fails after upgrade          | Migrate incrementally                                 |

Dune’s Rocq documentation also distinguishes versions of its Rocq language support from the prover version itself; this is a separate compatibility dimension from the Rocq prover release.

**Professional rule:** Treat migration as a proof-engineering task. Start by stabilizing imports, build configuration, and public theorem APIs.

**Common Pitfalls:** Do not mix old and new conventions randomly. Consistency matters more than cosmetic modernization in the middle of a proof port.

### Task: Set Project Policies — admissions, automation, imports, style, extraction

**Core keywords:** policy, coding standard, proof style, CI policy.

Serious projects need explicit policies.

| Policy area     | Example policy                                       | Why                     |
| --------------- | ---------------------------------------------------- | ----------------------- |
| Admissions      | No `Admitted` in release builds                      | Proof completeness      |
| Axioms          | Allowed only in foundation file                      | Trust audit             |
| Classical logic | Must be documented per module                        | Constructive boundary   |
| Imports         | Avoid broad imports in public files                  | Dependency clarity      |
| Automation      | Main theorem proofs must expose induction/invariants | Reviewability           |
| Naming          | Public theorem names must describe behavior          | Searchability           |
| Opacity         | Use `Qed` unless computational content needed        | Performance/abstraction |
| Extraction      | State verified core and wrapper boundary             | Avoid overclaim         |
| CI              | Full clean build required                            | Reproducibility         |
| Versioning      | Record Rocq/package baseline                         | Compatibility           |

**Common Pitfalls:** Style policies are not bureaucracy. They prevent proof scripts from becoming unreviewable artifacts.

### Task: Work With External Libraries — local proof culture, wrappers, adaptation lemmas

**Core keywords:** external library, proof culture, wrapper lemma, adaptation.

External libraries may use different names, theorem shapes, notation, and proof idioms. Instead of forcing all project code into raw external theorem shapes, use adaptation lemmas.

| Situation                             | Response                            |
| ------------------------------------- | ----------------------------------- |
| External theorem has awkward shape    | Wrap with project-specific lemma    |
| Library uses different notation style | Keep notation localized             |
| Library theorem too general           | Specialize and name local fact      |
| Library theorem too specific          | Prove generalized wrapper if needed |
| External automation too broad         | Scope use to specific files         |
| Library version unstable              | Pin package or isolate dependency   |

Example pattern:

```coq
Theorem project_append_nil_r :
  forall (A : Type) (xs : list A), xs ++ [] = xs.
Proof.
  intros A xs.
  apply app_nil_r.
Qed.
```

This wrapper can be useful if the project wants a stable theorem name independent of downstream library naming conventions.

**Common Pitfalls:** Wrapping every external theorem is unnecessary. Wrap facts that are part of the project’s public API or used repeatedly.

### Task: Handle Extraction Workflow Professionally — verified core, generated code, wrapper

**Core keywords:** extraction workflow, certified core, generated code, wrapper, runtime boundary.

Extraction is a workflow, not a one-line miracle.

| Extraction step                | Professional requirement                   |
| ------------------------------ | ------------------------------------------ |
| Define pure computational core | Keep effectful boundary small              |
| State specification            | The theorem must capture intended behavior |
| Prove correctness              | Audit assumptions                          |
| Extract code                   | Record target and extraction settings      |
| Integrate wrapper              | Review external code separately            |
| Test generated integration     | Catch boundary mistakes                    |
| State guarantee                | Avoid claiming more than theorem proves    |
| Re-run extraction in build     | Avoid stale generated code                 |

**Correct claim shape:**

> The Rocq definition `f` satisfies theorem `T` under assumptions `A`. The extracted code corresponds to the computational content of `f` under extraction assumptions. External wrappers, target compiler/runtime behavior, I/O, and deployment are outside `T` unless separately modeled.

**Common Pitfalls:** A theorem over tokens does not verify the lexer. A theorem over a pure function does not verify the file-reading wrapper.

### Task: Build a Debugging Playbook — from symptom to cause

**Core keywords:** debugging playbook, proof failure, type error, build failure.

| Symptom                            | First question                       | Likely repair                                  |
| ---------------------------------- | ------------------------------------ | ---------------------------------------------- |
| Tactic fails                       | Does goal shape match tactic?        | Choose tactic by connective/equality/structure |
| Theorem seems true but proof stuck | Is theorem too weak?                 | Strengthen/generalize                          |
| Induction hypothesis useless       | Were variables introduced too early? | Delay intros or generalize dependent           |
| Rewrite fails                      | Does the exact side occur?           | Reverse direction or simplify                  |
| `reflexivity` fails                | Are terms convertible?               | Use lemma/induction                            |
| Import fails                       | Is logical path configured?          | Fix build/load path                            |
| CI fails only                      | Is environment identical?            | Pin versions                                   |
| Proof slow                         | Is automation/reduction huge?        | Refactor lemmas/opacity                        |
| Extraction code wrong shape        | Is computational content in `Prop`?  | Use `bool`, `option`, `sig`, `Type` data       |
| Assumption audit bad               | What theorem introduced it?          | Prove/remove/localize assumption               |

**Professional rule:** Debug from the smallest boundary outward: current goal, theorem statement, definitions, imports, build environment, assumptions.

### Task: Avoid Common Professional Anti-Patterns

**Core keywords:** anti-patterns, proof engineering, workflow.

| Anti-pattern                         | Why it is bad             | Better practice                    |
| ------------------------------------ | ------------------------- | ---------------------------------- |
| `intros; auto.` for central theorems | Hides proof idea          | Expose induction/invariants        |
| Leaving `Admitted` in release code   | Trust debt                | CI policy forbids it               |
| Unfolding internals in client proofs | Breaks abstraction        | Export behavior lemmas             |
| Global hints everywhere              | Hidden proof dependencies | Scoped databases                   |
| Relying on generated names           | Fragile proofs            | Name hypotheses explicitly         |
| Re-proving standard lemmas           | Library fragmentation     | Use `Search`                       |
| Overusing dependent types            | Proof burden explosion    | Use Prop-level specs when enough   |
| Overusing typeclasses                | Inference opacity         | Use explicit records/modules first |
| No build configuration               | Non-reproducible proof    | Dune/_CoqProject/CI                |
| Extraction overclaim                 | Misleading assurance      | State verified boundary            |
| No theorem API documentation         | Hard to reuse             | Name and document public lemmas    |
| Broad imports in every file          | Hard to audit             | Narrow and local imports           |

### Task: Mastery Path — from beginner to professional Rocq user

**Core keywords:** mastery path, learning sequence, professional skill.

| Stage                         | Skill target                                         | Concrete competence                             |
| ----------------------------- | ---------------------------------------------------- | ----------------------------------------------- |
| 1. Syntax reading             | Distinguish Gallina, vernacular, tactics             | Read simple `.v` files                          |
| 2. Core proofs                | Use `intros`, `apply`, `exact`, `split`, `destruct`  | Prove propositional facts                       |
| 3. Equality and computation   | Use `simpl`, `reflexivity`, `rewrite`                | Distinguish definitional/propositional equality |
| 4. Induction                  | Prove recursive data properties                      | Choose correct induction target                 |
| 5. Modeling                   | Choose `bool`/`Prop`, function/relation, list/vector | Design useful theorem statements                |
| 6. Libraries                  | Use `Search`, `Check`, `Locate`, standard lemmas     | Avoid re-proving basics                         |
| 7. Proof engineering          | State helper lemmas and strengthen theorems          | Maintain readable scripts                       |
| 8. Modules and boundaries     | Use sections/modules/API theorems                    | Hide representation and expose laws             |
| 9. Automation                 | Use `lia`, `auto`, custom tactics responsibly        | Automate routine leaves                         |
| 10. Build workflow            | Use package/build/CI tools                           | Reproduce full project checking                 |
| 11. Assumption audit          | Track axioms/admissions/classical imports            | State trust base                                |
| 12. Extraction and deployment | Separate certified core from wrapper                 | Avoid overclaim                                 |
| 13. Ecosystem specialization  | Learn domain libraries                               | Follow local proof culture                      |
| 14. Advanced semantics        | Universes, dependent pattern matching, coinduction   | Diagnose hard failures                          |

**Professional rule:** Mastery is not measured by how quickly a proof is closed. It is measured by the ability to state the right theorem, prove it robustly, reuse library facts, maintain the project, and explain the trust boundary.

### Mastery Exercises — professional anchors

**Core keywords:** exercises, proof anchors, workflow anchors.

| Exercise                                                                           | Skill tested                         |
| ---------------------------------------------------------------------------------- | ------------------------------------ |
| Prove `forall n, n + 0 = n` without library lemma                                  | Structural induction and computation |
| Prove append associativity                                                         | Induct over recursive argument       |
| Prove map composition                                                              | Polymorphic theorem design           |
| Prove reverse accumulator correctness                                              | Helper lemma strengthening           |
| Define boolean equality for finite type and prove soundness/completeness           | `bool`/`Prop` bridge                 |
| Define expression evaluator and relational semantics, prove soundness/completeness | Function-relation bridge             |
| Create a module interface for stack and prove implementation laws                  | API boundary                         |
| Replace broad `auto` proof with explicit proof plus bounded automation             | Reviewability                        |
| Audit assumptions of main theorem                                                  | Trust management                     |
| Build a multi-file project from clean environment                                  | Reproducibility                      |
| Extract a pure function and state exact guarantee                                  | Extraction boundary                  |

**Common Pitfalls:** Exercises that only ask for “prove this” undertrain professional workflow. Add constraints: no `Admitted`, no unnecessary imports, theorem names must be meaningful, and proof scripts must survive file reordering/build.

### Professional Review Checklist — final workflow reference

**Core keywords:** checklist, proof review, project review, release review.

| Area              | Review question                                                              |
| ----------------- | ---------------------------------------------------------------------------- |
| Theorem statement | Does it express the intended property fully?                                 |
| Model adequacy    | Are definitions faithful to the domain?                                      |
| Induction choice  | Is the induction object the structure or derivation that explains the proof? |
| Helper lemmas     | Are central invariants named?                                                |
| Equality handling | Are definitional and propositional equality separated?                       |
| Automation        | Is automation scoped and limited to routine goals?                           |
| Imports           | Are dependencies intentional and minimal?                                    |
| Notation          | Are scopes and notation clear?                                               |
| Modules           | Are operations paired with laws?                                             |
| Assumptions       | Are axioms, parameters, admissions, and classical imports audited?           |
| Opacity           | Are `Qed` and `Defined` used intentionally?                                  |
| Build             | Does the full development check from a clean environment?                    |
| Documentation     | Are public theorem names and comments useful?                                |
| Extraction        | Is the verified core separated from wrappers/runtime?                        |
| Compatibility     | Are version baselines and migration risks known?                             |
| Performance       | Are proof-checking bottlenecks understood?                                   |

### PART 9 Summary — professional Rocq practice as controlled proof engineering

PART 9 established a professional workflow for Rocq development.

| Workflow dimension  | Core lesson                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| Project structure   | File layout, module names, logical paths, and dependency order are proof-engineering decisions           |
| Build systems       | Use `rocq compile`, dependency analysis, `_CoqProject`, Dune, or CI according to project scale           |
| Packages            | Manage `opam`, Platform baselines, pins, and logical names explicitly                                    |
| Interactive proving | Use editors and REPLs for discovery, but clean scripts for maintainability                               |
| Debugging           | Diagnose goal shape, theorem strength, hidden arguments, imports, and assumptions systematically         |
| Performance         | Optimize proof structure, opacity, imports, and automation before worrying about extracted runtime       |
| Refactoring         | Treat theorem statements and behavior lemmas as public APIs                                              |
| Review              | Review theorem adequacy, proof robustness, assumptions, build reproducibility, and extraction boundaries |
| Documentation       | Name theorems by behavior and document invariants/boundaries                                             |
| Testing/examples    | Use examples for sanity, not as substitutes for general theorems                                         |
| Assumption audit    | Track `Admitted`, `Axiom`, `Parameter`, and classical dependencies                                       |
| Migration           | Treat Coq-era to Rocq-era changes as compatibility work, not mere renaming                               |
| Extraction          | State exactly what the verified core proves and what remains external                                    |
| Mastery             | Skill means robust theorem design, proof maintenance, library fluency, and trust-boundary clarity        |

The expert workflow model is:

> A Rocq project is a checked, versioned, dependency-managed, assumption-audited proof artifact. Its value is not only that the kernel accepts proofs, but that the theorem statements are meaningful, the proof scripts are maintainable, the environment is reproducible, and the trust boundary is explicit.

## PART 10 — Expert Synthesis, Decision Tables, Misconception Indexes, and Final Review

PART 10 consolidates the whole guide into a compact professional reference. The aim is not to introduce many new concepts, but to organize the concepts from PART 1 through PART 9 into reusable expert judgment: how to read Rocq code, design definitions, state theorems, choose proof strategies, manage libraries, audit assumptions, and avoid overclaiming verification results.

### Final Mental Model — what Rocq is and what it is not

**Core keywords:** proof assistant, dependent type theory, proof terms, kernel checking, proof engineering, extraction boundary.

Rocq is best understood as a **kernel-checked proof-development system based on dependent type theory**. It includes a programming language, but its professional center is the construction and maintenance of definitions, propositions, programs, specifications, proof terms, theorem libraries, and sometimes extracted verified computational cores.

| Bad compressed model                       | Why it misleads                                               | Better model                                                                |
| ------------------------------------------ | ------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Rocq is just a programming language        | Ignores propositions, proofs, tactics, kernel checking        | Rocq is a proof assistant with a dependently typed term language            |
| Rocq is just mathematical notation         | Ignores computation, extraction, proof engineering, libraries | Rocq formalizes mathematics and programs in a checked environment           |
| Rocq is just Coq renamed                   | Ignores Rocq 9.x command/library/ecosystem changes            | Rocq is the modern successor to Coq with continuity and migration concerns  |
| Rocq proves programs correct automatically | Ignores specifications and assumptions                        | Rocq checks proofs of explicitly stated theorems                            |
| Tactics are the proof                      | Ignores generated proof terms and kernel checking             | Tactics construct proof terms checked by the kernel                         |
| Extraction gives verified software         | Ignores runtime/wrapper/compiler boundaries                   | Extraction gives executable computational content from a verified Rocq core |

**Expert mental model:**

> A Rocq development is a checked environment of definitions, programs, propositions, proofs, libraries, assumptions, tactics, and boundaries. The theorem statement determines what is proved; the environment determines the assumptions; the kernel checks the proof term; extraction moves computational content into another runtime under additional assumptions.

### The Four Questions for Any Rocq Artifact

**Core keywords:** theorem statement, assumptions, proof boundary, runtime boundary.

Every serious Rocq artifact should be evaluated with four questions.

| Question                                | What to inspect                                                                     | Why it matters                              |
| --------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------- |
| What exactly is stated?                 | The theorem/specification type                                                      | A proof only validates the stated claim     |
| What assumptions are used?              | `Print Assumptions`, imports, axioms, admissions, section hypotheses                | Trust base determines strength              |
| What proof/computation boundary exists? | `Prop`/`Type`, `Qed`/`Defined`, opacity, extraction relevance                       | Determines what computes and what is erased |
| What lies outside Rocq?                 | Runtime wrappers, target compiler, I/O, plugins, external libraries, model adequacy | Prevents overclaiming                       |

**Professional rule:** A theorem without its statement, assumptions, and boundary is not fully understood.

### Rocq’s Core Distinctions — the non-negotiable conceptual map

**Core keywords:** Gallina, vernacular, tactics, `Prop`, `bool`, equality, induction, extraction.

| Distinction                                     | Side A                               | Side B                                 | Why it matters                             |
| ----------------------------------------------- | ------------------------------------ | -------------------------------------- | ------------------------------------------ |
| Gallina vs vernacular                           | Terms, functions, propositions       | Commands that query/extend environment | Prevents syntax-layer confusion            |
| Vernacular vs tactics                           | Top-level commands                   | Proof-state transformations            | Explains `.v` file structure               |
| `Prop` vs `bool`                                | Logical propositions and proofs      | Computable boolean data                | Separates specification from runtime tests |
| Definitional equality vs propositional equality | Conversion/reduction                 | Explicit equality proof                | Explains `reflexivity`, `simpl`, `rewrite` |
| `destruct` vs `induction`                       | Case split                           | Case split plus induction hypotheses   | Determines recursive proof success         |
| Function vs relation                            | Executable deterministic computation | Evidence-rich semantic specification   | Central in PL theory and verification      |
| `option` vs `False`                             | Recoverable computational failure    | Logical impossibility                  | Prevents bad error modeling                |
| `Qed` vs `Defined`                              | Opaque proof                         | Transparent body                       | Controls unfolding and computation         |
| `Axiom`/`Admitted` vs proved theorem            | Assumed                              | Kernel-checked proof                   | Trust boundary                             |
| Source computation vs extracted runtime         | Rocq reduction                       | Target-language execution              | Prevents extraction overclaims             |

### Final Glossary — Rocq-specific terms in professional use

**Core keywords:** glossary, proof state, kernel, conversion, induction principle.

| Term                   | Meaning                                                   | Practical use                                      |
| ---------------------- | --------------------------------------------------------- | -------------------------------------------------- |
| Gallina                | Rocq’s core term/specification/program language           | Defines data, functions, propositions, proof terms |
| Vernacular command     | Top-level command in `.v` files                           | `Definition`, `Theorem`, `Check`, `Require`, `Qed` |
| Tactic                 | Proof-state transformation command                        | `intros`, `apply`, `rewrite`, `induction`          |
| Proof state            | Current local context plus goals                          | Determines tactic choice                           |
| Kernel                 | Trusted checker for terms/proofs                          | Final source of proof acceptance                   |
| Proof term             | Term inhabiting a theorem type                            | What tactics construct                             |
| Conversion             | Definitional equality by reduction/expansion              | Used by `reflexivity` and type checking            |
| Definitional equality  | Equality by computation/conversion                        | No separate theorem needed if convertible          |
| Propositional equality | Explicit proposition `x = y`                              | Requires proof; used with `rewrite`                |
| Inductive type         | Type defined by constructors                              | Generates case analysis and induction principles   |
| Inductive predicate    | Proposition family defined by constructors                | Structured evidence in `Prop`                      |
| Elimination principle  | Rule for consuming inductive values/evidence              | Pattern matching, `destruct`, `induction`          |
| Section                | Local context generalized after closing                   | Shared parameters/hypotheses                       |
| Module                 | Namespace and abstraction unit                            | Organizes APIs and representation boundaries       |
| Universe               | Level in type hierarchy                                   | Prevents paradoxes                                 |
| Extraction             | Producing target-language code from computational content | Connects verified core to executable program       |
| Trust debt             | Unproved or assumed content                               | `Admitted`, axioms, unverified wrappers            |

### Definition-Design Decision Table

**Core keywords:** data modeling, definitions, dependent types, invariants.

| Need                       | Prefer                                | Avoid                            | Reason                                                   |
| -------------------------- | ------------------------------------- | -------------------------------- | -------------------------------------------------------- |
| Simple finite alternatives | `Inductive` enum                      | Encoding as `nat`                | Constructors give cases                                  |
| Recursive data             | Recursive `Inductive`                 | Ad hoc encodings                 | Gives induction principle                                |
| Named fields               | `Record`                              | Nested pairs for public API      | Readability and projections                              |
| Optional failure           | `option A`                            | `False` or arbitrary default     | Failure is data                                          |
| Explained failure          | custom `result E A`                   | `option A` if reason matters     | Error reason survives                                    |
| Computable predicate       | `A -> bool`                           | `A -> Prop` as runtime condition | Branchable/extractable                                   |
| Logical specification      | `A -> Prop`                           | `bool` alone                     | Expressive proof target                                  |
| Validated internal value   | dependent record/subset type          | Raw data plus forgotten proof    | Invalid states unrepresentable                           |
| Flexible semantics         | relation `A -> B -> Prop`             | Forced total function            | Supports partial/nondeterministic/evidence-rich behavior |
| Certified implementation   | function + spec + correctness theorem | Function alone                   | Type correctness is not correctness                      |
| Reusable structure         | record/module/typeclass               | Repeating parameters everywhere  | Packages operations and laws                             |
| External input boundary    | parser/validator + theorem            | Trusting raw input               | Makes validation checkable                               |

**Professional rule:** Choose representation by asking what must compute, what must be proved, what invalid states should be impossible, and what induction principle future proofs need.

### Theorem-Statement Decision Table

**Core keywords:** theorem design, quantifier order, induction hypothesis, specification strength.

| Theorem-design issue          | Bad pattern                             | Better pattern                                  | Why                                    |
| ----------------------------- | --------------------------------------- | ----------------------------------------------- | -------------------------------------- |
| Too-specific theorem          | Prove only one example                  | Quantify over all relevant inputs               | Reusable and induction-friendly        |
| Weak accumulator theorem      | State only `acc = []` case              | Generalize over arbitrary accumulator           | Stronger induction hypothesis          |
| Wrong quantifier order        | Introduce dependent variables too early | Leave variables general before induction        | Avoid weak IH                          |
| Missing preservation property | Prove only sortedness                   | Also prove permutation/content preservation     | Prevents weak correctness              |
| Boolean checker theorem       | Only prove `checker x = true -> P x`    | Prove soundness and completeness if both needed | Bridges computation/spec fully         |
| Function equality too strong  | Prove `f = g` directly                  | Use pointwise `forall x, f x = g x`             | Avoids extensionality when unnecessary |
| Hidden assumptions            | Rely on section hypotheses invisibly    | Inspect exported theorem type                   | Shows real theorem                     |
| Over-broad theorem            | Generalize beyond use case              | Generalize stable concepts only                 | Avoids unwieldy proofs                 |
| Under-specified spec          | Theorem named `correct` but weak        | Name and state all correctness components       | Reviewable                             |

**Professional rule:** If the proof is stuck, do not first search for a stronger tactic. First inspect whether the theorem statement is strong enough and quantified correctly.

### Proof-Strategy Decision Table

**Core keywords:** tactic selection, proof state, equality, induction, automation.

| Goal shape or proof need        | First tactic/pattern         | When it fails                 | Next diagnosis                                 |
| ------------------------------- | ---------------------------- | ----------------------------- | ---------------------------------------------- |
| `forall x, P x`                 | `intros x`                   | IH later too weak             | Delay intros/generalize                        |
| `A -> B`                        | `intros HA`                  | Premise should remain general | Generalize before induction                    |
| `A /\ B`                        | `split`                      | Subgoals hard                 | Need helper lemmas                             |
| `A \/ B`                        | `left` or `right`            | Chosen side unprovable        | Need evidence or destruct hypothesis           |
| `exists x, P x`                 | `exists witness`             | No witness known              | Need construction or classical/decidable lemma |
| Goal exactly matches hypothesis | `exact H` / `assumption`     | Types not identical           | Rewrite or instantiate                         |
| Use implication/theorem         | `apply H`                    | Unexpected subgoals           | Inspect `Check H`                              |
| Equality by computation         | `reflexivity` / `cbn`        | Not convertible               | Use lemma/induction                            |
| Equality by known theorem       | `rewrite H`                  | No match                      | Reverse direction/simplify/check term          |
| Recursive data property         | `induction`                  | IH weak                       | Strengthen theorem                             |
| Finite cases                    | `destruct`                   | Lost test equation            | Use `destruct ... eqn:`                        |
| Constructor contradiction       | `discriminate` / `inversion` | Not constructor-based         | Use logical contradiction                      |
| Linear arithmetic               | `lia`                        | Structural facts remain       | Rewrite list/tree facts first                  |
| Routine propositional goal      | `auto`                       | Hides central proof           | Use explicit proof for main argument           |
| Repeated proof pattern          | helper lemma/custom tactic   | Tactic brittle                | Name invariant instead                         |

**Professional rule:** Tactics follow the goal shape. Goal reading precedes tactic choice.

### Proof-Pattern Index — high-value reusable patterns

**Core keywords:** proof pattern, induction pattern, rewrite pattern, evidence pattern.

| Pattern                  | Shape                                   | Main tactic sequence                  | Lesson                                |
| ------------------------ | --------------------------------------- | ------------------------------------- | ------------------------------------- |
| Identity proof           | `A -> A`                                | `intros A HA; exact HA`               | Implication as function               |
| Conjunction swap         | `A /\ B -> B /\ A`                      | `destruct`, `split`                   | Evidence decomposition/reconstruction |
| Disjunction swap         | `A \/ B -> B \/ A`                      | `destruct`, `left/right`              | Constructive branch choice            |
| Existential projection   | `exists x, P x /\ Q x -> exists x, P x` | destruct witness, exists same witness | Witness handling                      |
| Right identity of append | `xs ++ [] = xs`                         | induction on `xs`, simpl, rewrite IH  | Induct on recursive argument          |
| Append associativity     | `(xs ++ ys) ++ zs = xs ++ (ys ++ zs)`   | induction on `xs`                     | Recursion controls proof              |
| Map length               | `length (map f xs) = length xs`         | induction on `xs`                     | Polymorphism is manageable            |
| Reverse accumulator      | `rev_acc xs acc = rev xs ++ acc`        | strengthen theorem                    | Accumulator invariant                 |
| Boolean soundness        | `checker x = true -> P x`               | destruct input/test, bridge lemma     | `bool` to `Prop`                      |
| Boolean completeness     | `P x -> checker x = true`               | use proof, rewrite/destruct           | `Prop` to `bool`                      |
| Evaluator soundness      | `eval_rel e n -> eval_fun e = n`        | induction on derivation               | Evidence induction                    |
| Evaluator completeness   | `eval_rel e (eval_fun e)`               | induction on expression               | Syntax induction                      |
| Determinism              | `R x y -> R x z -> y = z`               | induction/inversion on derivations    | Relation reasoning                    |
| Preservation/progress    | PL typing/evaluation theorem            | induction on typing/evaluation        | Type soundness structure              |

### Debugging Index — symptom to cause to repair

**Core keywords:** debugging, failure mode, repair.

| Symptom                                     | Likely cause                            | Repair                                           |
| ------------------------------------------- | --------------------------------------- | ------------------------------------------------ |
| `reflexivity` fails on true equality        | Equality not definitional               | Use theorem, rewrite, or induction               |
| `simpl` changes nothing                     | Reduction blocked by variable/opacity   | Inspect definition; use lemma                    |
| `rewrite H` fails                           | Wrong direction or no matching subterm  | Try `rewrite <- H`; inspect goal                 |
| `rewrite H` makes goal worse                | Rewriting too early/broadly             | Undo; rewrite targeted subterm                   |
| `induction` gives unusable IH               | Theorem too specific or variables fixed | Strengthen/generalize                            |
| `destruct` proof gets stuck                 | Needed recursive IH                     | Use `induction`                                  |
| Destructing test loses information          | No equation preserved                   | Use `destruct ... eqn:H`                         |
| `apply H` creates strange goals             | `H` has hidden premises/implicit args   | `Check H`; instantiate explicitly                |
| `auto` no longer works                      | Import/hint database changed            | Apply key lemmas explicitly                      |
| `lia` fails                                 | Goal not pure linear arithmetic         | Rewrite structural facts first                   |
| `None` ambiguous                            | Missing type parameter                  | Add annotation                                   |
| Notation fails                              | Missing import/scope                    | `Locate`, import notation                        |
| Type mismatch despite similar display       | Hidden arguments/coercions/scopes       | Use `@`, printing diagnostics                    |
| Universe error                              | Over-generic abstraction                | Inspect universes; reduce generality             |
| Build succeeds locally only                 | Environment mismatch                    | Pin versions and run clean CI                    |
| Extraction loses data                       | Data was in `Prop`                      | Put runtime data in `Type`/`bool`/`option`/`sig` |
| Theorem depends on assumptions unexpectedly | Section hypotheses/axioms/imports       | `Print Assumptions`; inspect theorem type        |

### Misconception Index — concise corrections

**Core keywords:** misconceptions, corrections, professional judgment.

| Misconception                                                            | Correction                                                                                             |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Rocq is mainly a programming language                                    | Rocq is mainly a proof assistant with a dependently typed programming language                         |
| Tactics are trusted magic                                                | Tactics construct proof terms checked by the kernel                                                    |
| `Prop` is the same as `bool`                                             | `Prop` is proof-bearing specification; `bool` is computable data                                       |
| `simpl` proves equalities                                                | `simpl` performs reduction; non-definitional equality needs proof                                      |
| `destruct` and `induction` are interchangeable                           | `induction` adds recursive hypotheses                                                                  |
| A checked theorem means the real system is correct                       | It means the formal statement follows from assumptions                                                 |
| Extraction verifies deployment                                           | Extraction preserves a verified computational core under assumptions; wrappers/runtime remain separate |
| Stronger dependent types are always better                               | They move proof obligations into every construction                                                    |
| Automation is always more professional                                   | Automation can be brittle and opaque                                                                   |
| `Admitted` is harmless during compilation                                | It is unproved trust debt                                                                              |
| Classical logic is forbidden                                             | It is allowed if imported/assumed explicitly and tracked                                               |
| Old Coq material is obsolete                                             | Much remains conceptually useful, but names/tools/imports may differ                                   |
| The shortest proof is best                                               | The best proof is correct, readable, maintainable, and robust                                          |
| Standard library facts should be re-proved for practice in real projects | Search and reuse standard lemmas; re-prove only for pedagogy or custom variants                        |

### Transfer Map — from adjacent systems and languages

**Core keywords:** transfer, Lean, Agda, Haskell, OCaml, Isabelle, Rust, F*.

| Source background | What transfers                                          | What must change                              |
| ----------------- | ------------------------------------------------------- | --------------------------------------------- |
| Haskell           | ADTs, pure functions, recursion, higher-order functions | Rocq requires totality and proof obligations  |
| OCaml             | Modules, functional style, extraction target intuition  | Rocq modules also carry theorem APIs          |
| Lean              | Dependent type theory, tactics, theorem proving         | Tactic language, elaborator, libraries differ |
| Agda              | Indexed types, total programming, constructive style    | Rocq has stronger tactic-proof culture        |
| Isabelle/HOL      | Formal proof discipline, automation awareness           | Logic is HOL, not CIC/propositions-as-types   |
| F*                | Specification/program pairing                           | SMT/effect/refinement workflow differs        |
| Rust              | API invariants, invalid states unrepresentable          | Rocq invariants require explicit proofs       |
| TypeScript        | Validation boundaries                                   | Types/specs/proofs are more formal in Rocq    |
| Python            | Interactive exploration                                 | No dynamic effectful Gallina runtime model    |
| Mathematics       | Theorem structure and proof ideas                       | Informal gaps must become definitions/lemmas  |

**Professional rule:** Transfer concepts, not surface scripts. Rocq-specific understanding must include `Prop`, proof terms, induction principles, conversion, and kernel checking.

### Rocq-Specific API Design Checklist

**Core keywords:** API, module, theorem, abstraction, public behavior.

| API question                                       | Good answer                                       |
| -------------------------------------------------- | ------------------------------------------------- |
| What definitions are public?                       | Only stable concepts and operations               |
| What theorems are public?                          | Behavior lemmas clients should use                |
| What is hidden?                                    | Representation details and proof internals        |
| Are theorem names searchable?                      | Names describe behavior                           |
| Are assumptions explicit?                          | Axioms and classical imports are documented       |
| Are notations scoped?                              | Local where possible, documented when public      |
| Are hints scoped?                                  | Automation does not pollute clients               |
| Are computational objects transparent when needed? | `Defined` only when computational content matters |
| Are ordinary proofs opaque?                        | `Qed` by default                                  |
| Can clients avoid unfolding definitions?           | Public lemmas support reasoning                   |
| Is extraction boundary stated?                     | Verified core and external wrapper separated      |

### Rocq-Specific Code Review Checklist

**Core keywords:** review, theorem adequacy, proof script, trust boundary.

| Review layer  | Checklist                                                                 |
| ------------- | ------------------------------------------------------------------------- |
| Definition    | Is the representation appropriate for computation and proof?              |
| Theorem       | Is the statement strong enough and correctly quantified?                  |
| Proof         | Is the induction target visible and justified?                            |
| Equality      | Are reduction and rewriting used correctly?                               |
| Helper lemmas | Are recurring invariants named?                                           |
| Automation    | Is it bounded and not hiding the main idea?                               |
| Imports       | Are dependencies intentional?                                             |
| Assumptions   | Are `Axiom`, `Admitted`, `Parameter`, and classical dependencies audited? |
| Opacity       | Are `Qed`/`Defined` choices justified?                                    |
| Modules       | Are operations paired with laws?                                          |
| Extraction    | Is the runtime/wrapper boundary explicit?                                 |
| Build         | Does the full project check cleanly?                                      |
| Documentation | Are public names and comments useful?                                     |

### Rocq-Specific Cost Model Checklist

**Core keywords:** cost model, proof checking, automation, reduction.

| Cost source            | Review question                             | Typical fix                                   |
| ---------------------- | ------------------------------------------- | --------------------------------------------- |
| Slow proof closing     | Is proof term huge?                         | Split into lemmas                             |
| Slow reduction         | Are too many constants transparent?         | Use opacity or rewrite lemmas                 |
| Slow automation        | Is search space too broad?                  | Scope hints, reduce `eauto`, apply lemmas     |
| Slow imports           | Are libraries too broad?                    | Narrow imports                                |
| Slow build             | Is dependency graph too coarse?             | Split files/modules                           |
| Hard dependent goals   | Is representation over-dependent?           | Use simpler data plus specs                   |
| Rewrite loops          | Are rewrite rules bidirectional?            | Orient toward normal form                     |
| Extraction performance | Are Peano structures inefficient in target? | Consider extraction mappings/target profiling |
| Universe issues        | Is abstraction too generic?                 | Reduce/generalize carefully                   |
| Fragile proofs         | Are generated names used?                   | Name cases/hypotheses explicitly              |

### Final Rocq Decision Matrix — representation, proof, boundary, workflow

**Core keywords:** final decision matrix, expert reference.

| Situation                           | Choose                                     | Avoid                            | Reason                          |
| ----------------------------------- | ------------------------------------------ | -------------------------------- | ------------------------------- |
| Need executable yes/no decision     | `bool` + spec lemmas                       | `Prop` alone                     | Runtime branch survives         |
| Need logical property               | `Prop`                                     | `bool` alone                     | More expressive specification   |
| Need partial function               | `option` or `result`                       | Unmodeled failure                | Total Gallina function          |
| Need semantic relation              | inductive relation                         | Forced function                  | Handles evidence/nondeterminism |
| Need invariant in every value       | dependent record/subtype                   | Rechecking invariant externally  | Invalid states unrepresentable  |
| Need simple sequence                | `list`                                     | vector by default                | Lower proof overhead            |
| Need fixed length central invariant | vector/indexed type                        | list with repeated length proofs | Type-level guarantee            |
| Need reusable operations plus laws  | record/module/typeclass                    | bare functions                   | Law-carrying abstraction        |
| Need public client reasoning        | behavior lemmas                            | unfolding internals              | Stable API                      |
| Need routine arithmetic             | `lia`                                      | hand induction                   | Efficient solver                |
| Need structural proof               | induction                                  | arithmetic solver alone          | Data structure matters          |
| Need repeated proof pattern         | helper lemma or scoped tactic              | copy-paste proof                 | Maintainability                 |
| Need final trusted artifact         | no `Admitted`, audited axioms, clean build | local editor success             | Proof completeness              |
| Need executable verified core       | extraction with boundary statement         | whole-system overclaim           | External runtime remains        |

### What “Professional-Grade Rocq Knowledge” Means

**Core keywords:** professional-grade knowledge, mastery, proof engineering.

Professional Rocq knowledge is not just knowing many tactics. It includes the ability to do all of the following:

| Competence             | Concrete behavior                                                 |
| ---------------------- | ----------------------------------------------------------------- |
| Read source layers     | Distinguish Gallina, vernacular, tactics, notation, scopes        |
| Design data            | Choose between `bool`, `Prop`, `option`, relation, dependent type |
| State theorems         | Quantify correctly and specify meaningful properties              |
| Prove structurally     | Choose induction target and helper lemmas                         |
| Manage equality        | Separate computation, rewriting, and propositional equality       |
| Use libraries          | Search, inspect, import, and wrap standard facts                  |
| Engineer proofs        | Make scripts readable, robust, and reviewable                     |
| Control automation     | Use solvers for routine goals, not central reasoning              |
| Build projects         | Configure dependencies, logical paths, and CI                     |
| Audit assumptions      | Track axioms, admissions, classical imports, parameters           |
| Understand semantics   | Know kernel checking, conversion, universes, opacity              |
| Manage boundaries      | State extraction, runtime, effect, and plugin boundaries          |
| Maintain APIs          | Treat theorem statements as public interfaces                     |
| Communicate guarantees | Avoid overclaiming verification results                           |

**Final professional rule:** Rocq expertise is measured by the reliability of the formal artifact, not by the cleverness of individual proof scripts.

### Final Compact Mastery Path

**Core keywords:** mastery path, learning order, professional progression.

| Stage | Focus                   | Exit criterion                                                                  |
| ----- | ----------------------- | ------------------------------------------------------------------------------- |
| 1     | Read `.v` files         | Can identify definitions, theorem statements, proof scripts, imports            |
| 2     | Basic proof tactics     | Can prove simple logical and equality facts                                     |
| 3     | Computation vs equality | Can predict when `reflexivity` works                                            |
| 4     | Induction               | Can prove standard `nat` and `list` theorems                                    |
| 5     | Modeling                | Can choose `bool`/`Prop`, function/relation, list/vector                        |
| 6     | Specification           | Can state strong correctness theorems                                           |
| 7     | Helper lemmas           | Can repair weak induction hypotheses by strengthening statements                |
| 8     | Library fluency         | Can use `Search`, `Check`, `Locate`, standard lemmas                            |
| 9     | Abstraction             | Can design modules/records with laws                                            |
| 10    | Automation discipline   | Can use `lia`, `auto`, custom tactics responsibly                               |
| 11    | Semantics               | Understands kernel, conversion, opacity, universes                              |
| 12    | Workflow                | Can build and maintain a multi-file project                                     |
| 13    | Trust audit             | Can inspect assumptions and eliminate admissions                                |
| 14    | Extraction boundary     | Can state verified-core versus runtime-wrapper guarantees                       |
| 15    | Domain specialization   | Can enter MathComp, PL theory, separation logic, or verified systems ecosystems |

### Final Exam-Style Self-Check

**Core keywords:** self-check, mastery assessment.

A Rocq learner is approaching professional competence if they can answer these without guessing:

| Question                                                                                    | Expected competence                                         |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Why does `0 + n = n` often close by `reflexivity`, but `n + 0 = n` usually needs induction? | Definitional equality versus propositional proof            |
| Why is `bool` not the same as `Prop`?                                                       | Computation/specification distinction                       |
| Why can `destruct` be insufficient when `induction` works?                                  | Induction hypotheses                                        |
| Why can introducing variables before induction weaken the proof?                            | Quantifier order and IH generality                          |
| Why does `Qed` differ from `Defined`?                                                       | Opacity and transparency                                    |
| Why can a theorem named `correct` be weak?                                                  | Specification adequacy                                      |
| Why is `Admitted` dangerous even if the file compiles?                                      | Trust debt                                                  |
| Why does extraction not verify a whole application?                                         | Runtime/wrapper/compiler boundary                           |
| Why is a public theorem part of an API?                                                     | Client proofs depend on theorem statements                  |
| Why might a shorter proof be worse?                                                         | Maintainability, opacity, performance                       |
| Why should assumptions be printed for important theorems?                                   | Trust-base audit                                            |
| Why should imports be reviewed?                                                             | Names, notation, hints, instances, assumptions              |
| Why might vectors make proofs harder than lists?                                            | Dependent index obligations                                 |
| Why is theorem strengthening often better than tactic searching?                            | Proof statement controls induction hypothesis               |
| Why does automation not replace proof understanding?                                        | The theorem/spec/assumption boundary remains human-designed |

### Final Summary — the whole guide in one page

Rocq is a proof assistant and dependently typed language for building checked formal developments. Its central objects are definitions, propositions, programs, specifications, proof terms, tactics, libraries, assumptions, and verified computational cores. The trusted kernel checks terms and proofs; tactics help construct them; libraries provide reusable definitions and theorems; build systems make developments reproducible; extraction can produce executable code from computational content, but runtime systems remain separate boundaries.

| Part    | Core contribution                                                                             |
| ------- | --------------------------------------------------------------------------------------------- |
| PART 1  | Rocq’s identity, philosophy, problem space, and ecosystem assumptions                         |
| PART 2  | Core syntax layers: Gallina, vernacular commands, tactics, equality, notation                 |
| PART 3  | Data, type, proposition, and specification modeling by task pattern                           |
| PART 4  | Functions, control flow, induction, rewriting, proof construction, abstraction                |
| PART 5  | Modules, errors, effects, resources, assumptions, extraction and trust boundaries             |
| PART 6  | Standard library, ecosystem tools, automation, packages, documentation, build workflows       |
| PART 7  | Semantics, kernel checking, conversion, reduction, universes, opacity, extraction, cost model |
| PART 8  | Historical evolution, Coq-to-Rocq transition, mature/emerging trends                          |
| PART 9  | Professional workflow, project structure, debugging, review, CI, mastery path                 |
| PART 10 | Final synthesis: decision tables, misconceptions, proof patterns, review checklists           |

The final expert model is:

> A Rocq development is not merely code that compiles. It is a formal artifact whose value depends on the adequacy of its definitions, the strength of its theorem statements, the soundness of its assumptions, the maintainability of its proof scripts, the stability of its APIs, the reproducibility of its build, and the honesty of its boundary claims.

The practical working discipline is:

| Task     | Expert habit                                                                        |
| -------- | ----------------------------------------------------------------------------------- |
| Define   | Choose representations by proof and computation needs                               |
| Specify  | State the theorem that actually captures correctness                                |
| Prove    | Follow goal shape, induction principles, and helper invariants                      |
| Reuse    | Search and apply library facts before re-proving                                    |
| Abstract | Export behavior lemmas, not private implementation dependencies                     |
| Automate | Use automation for routine leaves, not central proof ideas                          |
| Audit    | Track assumptions, admissions, classical principles, and extraction boundaries      |
| Maintain | Build cleanly, document APIs, review theorem statements, and preserve compatibility |

## Appendix A — Rocq Quick Reference

This appendix is a compact lookup sheet for everyday Rocq reading, writing, proving, debugging, and reviewing. It is not a substitute for the conceptual chapters; it is a fast operational reference.

### A.1 Source Layers

| Layer           | What it is                                         | Examples                                                    | Main question                                       |
| --------------- | -------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------- |
| Gallina         | Core term, program, type, and proposition language | `fun`, `forall`, `match`, `Fixpoint`, `Inductive`           | Is this term well typed?                            |
| Vernacular      | Top-level command language                         | `Definition`, `Theorem`, `Check`, `Print`, `Require`, `Qed` | How does this command change/query the environment? |
| Tactic language | Interactive proof-construction language            | `intros`, `apply`, `rewrite`, `induction`, `lia`            | How does this transform the proof state?            |
| Notation/scopes | Surface syntax layer                               | `+`, `++`, `[]`, `/\`, `\/`                                 | What underlying term does this notation denote?     |

**Rule:** When confused, first identify which layer is being used.

### A.2 Basic File Skeleton

```coq
From Stdlib Require Import List Arith Lia.
Import ListNotations.

Definition double (n : nat) : nat :=
  n + n.

Theorem double_zero :
  double 0 = 0.
Proof.
  reflexivity.
Qed.
```

| Part                             | Meaning                        |
| -------------------------------- | ------------------------------ |
| `From Stdlib Require Import ...` | Load standard-library modules  |
| `Import ListNotations.`          | Bring list notation into scope |
| `Definition`                     | Add a checked term/function    |
| `Theorem`                        | State a proposition to prove   |
| `Proof.`                         | Enter proof mode               |
| tactics                          | Construct proof term           |
| `Qed.`                           | Close opaque checked proof     |

### A.3 Essential Queries

| Command                  | Use                                                        | Example                         |
| ------------------------ | ---------------------------------------------------------- | ------------------------------- |
| `Check t.`               | Show inferred type                                         | `Check Nat.add_comm.`           |
| `Print x.`               | Show definition, inductive, or theorem body if transparent | `Print nat.`                    |
| `About x.`               | Show metadata and type                                     | `About app_assoc.`              |
| `Search pattern.`        | Find lemmas by shape                                       | `Search (_ ++ [] = _).`         |
| `Locate "notation".`     | Find notation meaning and scope                            | `Locate "++".`                  |
| `Compute t.`             | Evaluate term by reduction                                 | `Compute 2 + 3.`                |
| `Eval cbn in t.`         | Evaluate with explicit strategy                            | `Eval cbn in map S [0;1].`      |
| `Print Assumptions thm.` | Show assumptions used by theorem                           | `Print Assumptions my_theorem.` |

**Rule:** Use `Check`, `Search`, and `Locate` before guessing.

### A.4 Common Imports

| Need                                  | Import                                                       |
| ------------------------------------- | ------------------------------------------------------------ |
| Lists                                 | `From Stdlib Require Import List.`                           |
| List notation                         | `Import ListNotations.`                                      |
| Natural-number arithmetic facts       | `From Stdlib Require Import Arith.`                          |
| Linear arithmetic solver              | `From Stdlib Require Import Lia.`                            |
| Boolean functions                     | `From Stdlib Require Import Bool.`                           |
| Relations                             | `From Stdlib Require Import Relations.`                      |
| Sorting/permutation-related libraries | Usually `Sorting`, `Permutation`, or domain-specific imports |
| Extraction                            | Extraction-related commands/modules as needed                |

Example:

```coq
From Stdlib Require Import List Arith Lia.
Import ListNotations.
```

### A.5 Core Sorts

| Sort    | Role                              | Example                  |
| ------- | --------------------------------- | ------------------------ |
| `Prop`  | Logical propositions              | `forall n : nat, n = n`  |
| `Set`   | Small computational types         | `nat`, `bool`            |
| `Type`  | General universe of types         | `list nat`, `nat -> nat` |
| `SProp` | Strict propositions, advanced use | Usually not needed early |

**Rule:** Use `bool` for computation; use `Prop` for specifications and theorems.

### A.6 `Prop` versus `bool`

| Need                        | Use         | Example                   |
| --------------------------- | ----------- | ------------------------- |
| Runtime/computable decision | `bool`      | `Nat.eqb n m`             |
| Logical claim               | `Prop`      | `n = m`                   |
| Specification               | `Prop`      | `sorted xs`               |
| Executable validator        | `A -> bool` | `is_empty xs`             |
| Bridge between both         | theorem     | `checker x = true -> P x` |

Example:

```coq
Definition is_zero_bool (n : nat) : bool :=
  match n with
  | 0 => true
  | S _ => false
  end.

Definition is_zero_prop (n : nat) : Prop :=
  n = 0.
```

Bridge theorem shape:

```coq
Theorem is_zero_sound :
  forall n, is_zero_bool n = true -> is_zero_prop n.
```

### A.7 Equality Quick Reference

| Equality type          | Meaning                            | Main tool                     |
| ---------------------- | ---------------------------------- | ----------------------------- |
| Definitional equality  | Terms reduce to the same form      | `reflexivity`, `simpl`, `cbn` |
| Propositional equality | Explicit theorem/proof of equality | `rewrite`, `apply`, induction |
| Equality hypothesis    | `H : x = y`                        | `rewrite H` or `rewrite <- H` |
| Symmetry               | Reverse equality direction         | `symmetry`                    |
| Chain equality         | Use intermediate term              | `transitivity`                |

Example:

```coq
Theorem eq_chain :
  forall a b c : nat,
    a = b -> b = c -> a = c.
Proof.
  intros a b c Hab Hbc.
  rewrite Hab.
  exact Hbc.
Qed.
```

### A.8 Reduction and Computation

| Tool              | Meaning                      | Good use                                        |
| ----------------- | ---------------------------- | ----------------------------------------------- |
| `simpl`           | Simplify obvious reductions  | Small proof steps                               |
| `cbn`             | Controlled simplification    | More predictable simplification                 |
| `cbv`             | More aggressive reduction    | Closed computations                             |
| `Compute`         | Interactive evaluation       | Exploring definitions                           |
| `Eval ... in ...` | Strategy-specific evaluation | Debugging reduction                             |
| `vm_compute`      | Fast VM computation          | Large computations                              |
| `native_compute`  | Native-code computation      | Very large computations, environment permitting |
| `unfold f`        | Replace `f` by its body      | Expose definition                               |
| `fold f`          | Repackage body as `f`        | Restore abstraction                             |

**Rule:** Computation proves only definitional equality, not arbitrary mathematical equality.

### A.9 `Qed`, `Defined`, `Admitted`, `Abort`

| Command     | Meaning                              | Use                              |
| ----------- | ------------------------------------ | -------------------------------- |
| `Qed.`      | Close opaque checked proof           | Ordinary theorems                |
| `Defined.`  | Close transparent checked proof/body | Computationally relevant objects |
| `Admitted.` | Accept without proof                 | Temporary trust debt only        |
| `Abort.`    | Cancel proof                         | Failed/abandoned proof           |

**Rule:** Use `Qed` by default. Use `Defined` only when later computation needs the body.

### A.10 Basic Tactics by Goal Shape

| Goal shape                             | Tactic                       |
| -------------------------------------- | ---------------------------- |
| `forall x, P x`                        | `intros x`                   |
| `A -> B`                               | `intros HA`                  |
| `A /\ B`                               | `split`                      |
| `A \/ B`                               | `left` or `right`            |
| `exists x, P x`                        | `exists witness`             |
| Goal matches hypothesis                | `exact H` or `assumption`    |
| Equality by computation                | `reflexivity`                |
| Equality using hypothesis              | `rewrite H`                  |
| Need reverse equality                  | `rewrite <- H` or `symmetry` |
| Finite cases                           | `destruct x`                 |
| Recursive property                     | `induction x`                |
| Constructor contradiction              | `discriminate`               |
| Analyze impossible/structured evidence | `inversion H`                |
| Linear arithmetic                      | `lia`                        |

### A.11 Common Tactic Patterns

**Identity:**

```coq
Theorem id_prop :
  forall A : Prop, A -> A.
Proof.
  intros A HA.
  exact HA.
Qed.
```

**Conjunction:**

```coq
Theorem and_comm :
  forall A B : Prop, A /\ B -> B /\ A.
Proof.
  intros A B H.
  destruct H as [HA HB].
  split.
  - exact HB.
  - exact HA.
Qed.
```

**Disjunction:**

```coq
Theorem or_comm :
  forall A B : Prop, A \/ B -> B \/ A.
Proof.
  intros A B H.
  destruct H as [HA | HB].
  - right. exact HA.
  - left. exact HB.
Qed.
```

**Existential:**

```coq
Theorem exists_zero :
  exists n : nat, n = 0.
Proof.
  exists 0.
  reflexivity.
Qed.
```

### A.12 `destruct` versus `induction`

| Use                                     | Tactic                        | Example                           |
| --------------------------------------- | ----------------------------- | --------------------------------- |
| Case split without recursive hypothesis | `destruct`                    | `destruct b` for `bool`           |
| Recursive proof over data               | `induction`                   | `induction xs` for `list` theorem |
| Analyze evidence                        | `destruct H` or `inversion H` | `H : A \/ B`                      |
| Need branch equation                    | `destruct expr eqn:H`         | `destruct (Nat.eqb n 0) eqn:Heq`  |

**Rule:** If the proof needs an induction hypothesis, `destruct` is probably too weak.

### A.13 Induction Templates

**Natural numbers:**

```coq
Theorem add_0_r :
  forall n : nat, n + 0 = n.
Proof.
  intros n.
  induction n as [| n IHn].
  - reflexivity.
  - simpl.
    rewrite IHn.
    reflexivity.
Qed.
```

**Lists:**

```coq
Theorem app_nil_r_example :
  forall (A : Type) (xs : list A),
    xs ++ [] = xs.
Proof.
  intros A xs.
  induction xs as [| x xs IHxs].
  - reflexivity.
  - simpl.
    rewrite IHxs.
    reflexivity.
Qed.
```

**Trees:**

```coq
Inductive tree (A : Type) : Type :=
| Leaf : tree A
| Node : tree A -> A -> tree A -> tree A.

Fixpoint size {A : Type} (t : tree A) : nat :=
  match t with
  | Leaf _ => 0
  | Node _ l _ r => S (size l + size r)
  end.
```

Tree proofs usually need induction hypotheses for each recursive subtree.

### A.14 List Reference

| Construct     | Meaning                                    |
| ------------- | ------------------------------------------ |
| `[]`          | Empty list                                 |
| `x :: xs`     | Cons                                       |
| `[x; y; z]`   | List notation                              |
| `xs ++ ys`    | Append                                     |
| `length xs`   | Length                                     |
| `map f xs`    | Apply function to each element             |
| `filter p xs` | Keep elements satisfying boolean predicate |
| `rev xs`      | Reverse                                    |
| `In x xs`     | Propositional membership                   |

Common lemmas to search/check:

```coq
Check app_nil_r.
Check app_assoc.
Check app_length.
Check map_length.
Search (_ ++ [] = _).
Search (length (_ ++ _) = _ + _).
```

### A.15 Arithmetic Reference

| Need                            | Tool                                         |
| ------------------------------- | -------------------------------------------- |
| Simple computation              | `simpl`, `cbn`, `reflexivity`                |
| Standard natural-number theorem | `Nat.*` lemmas                               |
| Linear arithmetic               | `lia`                                        |
| Commutativity/associativity     | `Nat.add_comm`, `Nat.add_assoc`, etc.        |
| Nonlinear algebra               | ring-style tactics/libraries when applicable |

Example:

```coq
From Stdlib Require Import Lia.

Theorem le_plus_r :
  forall n m : nat, n <= n + m.
Proof.
  intros n m.
  lia.
Qed.
```

**Rule:** Use structural lemmas first, then `lia` for arithmetic side conditions.

### A.16 Option and Result Patterns

**Option:**

```coq
Definition head_opt {A : Type} (xs : list A) : option A :=
  match xs with
  | [] => None
  | x :: _ => Some x
  end.
```

| Return   | Meaning            |
| -------- | ------------------ |
| `Some x` | Success with value |
| `None`   | Failure/no value   |

**Custom result:**

```coq
Inductive result (E A : Type) : Type :=
| Ok : A -> result E A
| Err : E -> result E A.
```

| Use `option`              | Use `result`                 |
| ------------------------- | ---------------------------- |
| Failure reason irrelevant | Failure reason matters       |
| Small internal helper     | Public API or parser/checker |
| Simple lookup             | Error reporting              |

### A.17 Function versus Relation

| Need                                       | Prefer                            |
| ------------------------------------------ | --------------------------------- |
| Deterministic total executable computation | Function                          |
| Partial computation                        | `option` / `result` function      |
| Nondeterminism                             | Relation                          |
| Operational semantics                      | Inductive relation                |
| Evidence-rich derivation                   | Inductive predicate/relation      |
| Extraction                                 | Function plus correctness theorem |
| Specification flexibility                  | Relation                          |

Function evaluator:

```coq
Fixpoint eval (e : expr) : nat := ...
```

Relational evaluator:

```coq
Inductive evalR : expr -> nat -> Prop := ...
```

Bridge theorem shapes:

```coq
Theorem evalR_sound :
  forall e n, evalR e n -> eval e = n.

Theorem evalR_complete :
  forall e, evalR e (eval e).
```

### A.18 Modeling Decision Table

| Task                     | Good representation                               |
| ------------------------ | ------------------------------------------------- |
| Finite states            | `Inductive` enum                                  |
| Recursive syntax         | Recursive `Inductive`                             |
| Optional value           | `option A`                                        |
| Explained error          | `result E A`                                      |
| Computable predicate     | `A -> bool`                                       |
| Logical property         | `A -> Prop`                                       |
| Invariant-carrying value | dependent record or subset type                   |
| Abstract structure       | record, module, or typeclass                      |
| Semantic judgment        | inductive relation                                |
| External input           | raw data + validator/parser + correctness theorem |
| Certified algorithm      | function + specification + correctness theorem    |

### A.19 Theorem Design Checklist

Before proving, check:

| Question                                             | Why                            |
| ---------------------------------------------------- | ------------------------------ |
| Is the theorem general enough?                       | Needed for reuse and induction |
| Are variables quantified in a good order?            | Affects induction hypothesis   |
| Is the recursive argument chosen clearly?            | Guides induction               |
| Does the theorem state all correctness properties?   | Avoids weak “correctness”      |
| Are assumptions explicit?                            | Trust clarity                  |
| Does the theorem use `bool` or `Prop` appropriately? | Computation/spec distinction   |
| Is a helper lemma needed?                            | Stabilizes proof               |
| Is there already a standard lemma?                   | Avoids duplication             |

### A.20 Helper Lemma Triggers

Use or create a helper lemma when:

| Symptom                        | Likely helper                   |
| ------------------------------ | ------------------------------- |
| Induction hypothesis too weak  | Generalized theorem             |
| Accumulator proof stuck        | Accumulator invariant           |
| Repeated rewrite pattern       | Named rewrite lemma             |
| Repeated `inversion` pattern   | Inversion/canonical-forms lemma |
| Direct proof too long          | Intermediate semantic lemma     |
| Client proofs unfold internals | Public behavior lemma           |
| Validator used repeatedly      | Soundness/completeness theorem  |
| Relation proof repeats cases   | Determinism/inversion lemma     |

### A.21 Automation Reference

| Tactic         | Use                                      | Caution                             |
| -------------- | ---------------------------------------- | ----------------------------------- |
| `auto`         | Routine propositional goals              | Depends on hints/imports            |
| `eauto`        | Existentially instantiated routine goals | Can search too much                 |
| `lia`          | Linear arithmetic                        | Not structural reasoning            |
| `congruence`   | Equality contradictions/congruence       | Can hide source of contradiction    |
| `discriminate` | Impossible constructor equality          | Only for constructor conflicts      |
| `inversion`    | Analyze inductive evidence               | Can clutter context                 |
| `tauto`        | Propositional tautologies                | May hide constructive structure     |
| `ring`         | Ring equalities                          | Needs appropriate algebraic context |
| custom `Ltac`  | Repeated local proof patterns            | Do not hide main proof idea         |

**Rule:** Automate leaves, not trunks.

### A.22 Debugging Index

| Symptom                        | Diagnosis                     | Repair                            |
| ------------------------------ | ----------------------------- | --------------------------------- |
| `reflexivity` fails            | Terms not convertible         | Use lemma/induction/rewrite       |
| `simpl` does nothing           | Reduction blocked             | Inspect definitions               |
| `rewrite H` fails              | No matching side              | Try reverse direction or simplify |
| `induction` gives weak IH      | Too many variables introduced | Generalize before induction       |
| `destruct` loses information   | Missing branch equation       | Use `destruct ... eqn:H`          |
| `apply H` gives strange goals  | Hidden premises               | `Check H`                         |
| `lia` fails                    | Not linear arithmetic         | Rewrite structural facts first    |
| `None` ambiguous               | Missing type                  | Add annotation                    |
| Notation fails                 | Missing scope/import          | `Locate`, `Import`                |
| Theorem depends on assumptions | Hidden axioms/hypotheses      | `Print Assumptions`               |
| Build works locally only       | Environment mismatch          | Pin versions, CI                  |
| Extraction loses data          | Data was in `Prop`            | Use computational types           |

### A.23 Printing and Hidden-Structure Diagnostics

| Need                                   | Command/pattern                       |
| -------------------------------------- | ------------------------------------- |
| Show explicit arguments                | `Check @name.`                        |
| Force type of ambiguous term           | `(term : type)`                       |
| Inspect notation                       | `Locate "symbol".`                    |
| Inspect definition                     | `Print name.`                         |
| Inspect theorem metadata               | `About name.`                         |
| Inspect assumptions                    | `Print Assumptions name.`             |
| Inspect final section-generalized type | `Check name` after `End`              |
| Debug overloaded notation              | use qualified names and scopes        |
| Debug implicit arguments               | add explicit arguments or annotations |

### A.24 Module and API Reference

| Construct             | Use                                      |
| --------------------- | ---------------------------------------- |
| `Module M.`           | Namespace/implementation block           |
| `Module Type S.`      | Interface/signature                      |
| `Module M <: S.`      | Implementation checked against signature |
| `Section S.`          | Shared local parameters/hypotheses       |
| `Variable A : Type.`  | Section/module parameter                 |
| `Hypothesis H : P.`   | Local assumption                         |
| `Context {A : Type}.` | Grouped/implicit context                 |
| `End S.`              | Close and generalize/export              |

**API rule:** Export operations plus behavior lemmas.

Bad API:

```coq
Definition push ...
Definition pop ...
```

Better API:

```coq
Definition push ...
Definition pop ...

Theorem pop_push :
  forall x s, pop (push x s) = Some (x, s).
```

### A.25 Trust and Assumption Reference

| Item                     | Meaning                         | Risk                         |
| ------------------------ | ------------------------------- | ---------------------------- |
| `Qed` theorem            | Checked proof, opaque           | Safe relative to assumptions |
| `Defined` theorem/object | Checked proof/body, transparent | May affect computation       |
| `Admitted`               | Unproved accepted statement     | Trust debt                   |
| `Axiom`                  | Assumed proposition             | Trust boundary               |
| `Parameter`              | Assumed object/type             | Interface or gap             |
| Classical import         | Adds classical principles       | Constructive boundary        |
| Plugin                   | External tooling                | Compatibility/trust boundary |
| Extraction wrapper       | Target-language code            | Outside proof unless modeled |

**Audit command:**

```coq
Print Assumptions my_theorem.
```

### A.26 Extraction Boundary Reference

| Rocq artifact             | Extraction intuition                            |                                                                  |
| ------------------------- | ----------------------------------------------- | ---------------------------------------------------------------- |
| `bool`                    | Runtime boolean survives                        |                                                                  |
| `option A`                | Runtime success/failure survives                |                                                                  |
| `result E A`              | Runtime success/error survives                  |                                                                  |
| `Prop` proof              | Usually erased                                  |                                                                  |
| `exists x, P x` in `Prop` | Logical existence, not necessarily runtime data |                                                                  |
| `{ x : A                  | P x }`                                          | Computational `x` survives; proof part usually not runtime check |
| Function in `Type`/`Set`  | Computational content can be extracted          |                                                                  |
| Theorem in `Prop`         | Certifies source-level property                 |                                                                  |

**Correct claim shape:**

> The Rocq function `f` satisfies theorem `T` under assumptions `A`. Extracted code corresponds to the computational content of `f`. Runtime wrappers, I/O, target compiler, and deployment are outside `T` unless separately modeled.

### A.27 Professional Review Checklist

| Review area   | Question                                         |
| ------------- | ------------------------------------------------ |
| Definition    | Is the representation appropriate?               |
| Specification | Does theorem state the real intended property?   |
| Proof         | Is the proof idea visible?                       |
| Induction     | Is the induction target correct?                 |
| Equality      | Is this definitional or propositional equality?  |
| Helper lemmas | Are invariants named?                            |
| Automation    | Is automation bounded?                           |
| Imports       | Are dependencies intentional?                    |
| Assumptions   | Are axioms/admissions/classical imports audited? |
| Opacity       | Are `Qed`/`Defined` choices justified?           |
| API           | Are public behavior lemmas exported?             |
| Extraction    | Is the runtime boundary stated?                  |
| Build         | Does the project check cleanly?                  |
| Documentation | Are theorem names searchable and meaningful?     |

### A.28 Minimal Professional Workflow

1. Write definitions.
2. Use `Check`, `Compute`, `Search`, and `Locate`.
3. State the strongest useful theorem.
4. Try explicit proof before automation.
5. If induction gets stuck, strengthen the theorem.
6. Name helper lemmas.
7. Replace repeated proof fragments with lemmas or scoped tactics.
8. Keep public behavior behind theorem APIs.
9. Audit `Admitted`, `Axiom`, `Parameter`, and classical imports.
10. Run a clean build.
11. Document public definitions and theorems.
12. State extraction/runtime boundaries when relevant.

### A.29 One-Page Tactic Cheat Sheet

| Tactic               | Meaning                                |
| -------------------- | -------------------------------------- |
| `intros`             | Introduce variables/hypotheses         |
| `exact H`            | Solve goal using exact proof term      |
| `assumption`         | Solve from matching hypothesis         |
| `apply H`            | Use theorem/hypothesis backwards       |
| `split`              | Prove conjunction                      |
| `left` / `right`     | Choose disjunction side                |
| `exists x`           | Provide existential witness            |
| `destruct x`         | Case split                             |
| `destruct x eqn:H`   | Case split and remember equation       |
| `induction x`        | Induction over structure               |
| `simpl`              | Simplify by reduction                  |
| `cbn`                | Controlled simplification              |
| `unfold f`           | Expand definition                      |
| `rewrite H`          | Rewrite left-to-right                  |
| `rewrite <- H`       | Rewrite right-to-left                  |
| `symmetry`           | Reverse equality goal                  |
| `transitivity t`     | Use equality chain via `t`             |
| `reflexivity`        | Close by conversion                    |
| `discriminate`       | Solve impossible constructor equality  |
| `inversion H`        | Analyze impossible/structured evidence |
| `subst`              | Substitute equal variables             |
| `clear H`            | Remove hypothesis                      |
| `assert (H : P)`     | Prove and add local fact               |
| `pose proof H as H'` | Add theorem/hypothesis instance        |
| `specialize (H x)`   | Instantiate quantified hypothesis      |
| `lia`                | Solve linear arithmetic                |
| `auto`               | Basic proof search                     |
| `eauto`              | Existential proof search               |

### A.30 Final Quick Rules

| Situation                   | Rule                                          |
| --------------------------- | --------------------------------------------- |
| Unsure what a term is       | `Check` it                                    |
| Unsure what notation means  | `Locate` it                                   |
| Unsure whether lemma exists | `Search` by shape                             |
| Equality proof stuck        | Decide definitional vs propositional equality |
| Induction stuck             | Strengthen/generalize theorem                 |
| Rewrite fails               | Check exact goal shape and direction          |
| Computation needed          | Use `simpl`, `cbn`, `Compute`, `Eval`         |
| Runtime decision needed     | Use `bool` or data in `Type`, not only `Prop` |
| Failure possible            | Use `option` or `result`                      |
| Public API                  | Export behavior lemmas                        |
| Ordinary theorem            | End with `Qed`                                |
| Computational witness       | Consider `Defined`                            |
| Serious theorem             | `Print Assumptions`                           |
| Large project               | Use reproducible build and CI                 |
| Extraction claim            | State verified core and external boundary     |

## Appendix B — Worked Mini Project: A Verified Arithmetic Expression Evaluator

GitHub - rocq-community/fourcolor: Formal proof of the Four Color Theorem [maintainer=@ybertot] · [GitHub](https://github.com/rocq-community/fourcolor)

coq-fourcolor 1.2.2 · [Rocq Package](https://rocq-prover.org/p/coq-fourcolor/1.2.2)


This appendix gives a small, coherent Rocq project. The goal is not to build a realistic compiler. The goal is to show how syntax, executable functions, relational specifications, induction, optimizer correctness, module APIs, and extraction boundaries fit together in one compact development.

The project verifies a tiny arithmetic expression evaluator.

| Component                | Rocq role                                          |
| ------------------------ | -------------------------------------------------- |
| `expr`                   | Abstract syntax tree for arithmetic expressions    |
| `eval`                   | Executable evaluator                               |
| `evalR`                  | Relational specification of evaluation             |
| `evalR_sound`            | If `evalR e n`, then `eval e = n`                  |
| `evalR_complete`         | For every `e`, `evalR e (eval e)`                  |
| `eval_evalR_equiv`       | Functional and relational semantics are equivalent |
| `evalR_deterministic`    | Relational evaluation has at most one result       |
| `fold_constants`         | Constant-folding optimizer                         |
| `fold_constants_correct` | Optimizer preserves evaluation                     |
| `fold_constants_evalR`   | Optimizer preserves relational evaluation results  |
| `size`                   | Structural measure of expressions                  |
| `fold_constants_size_le` | Optimizer does not increase expression size        |
| `ExprEval`               | Module boundary for the mini-project               |

### B.1 Project Shape

A small multi-file version could be organized as follows:

| File              | Purpose                             |
| ----------------- | ----------------------------------- |
| `ExprSyntax.v`    | Syntax of expressions               |
| `ExprEval.v`      | Functional and relational semantics |
| `ExprOptimize.v`  | Constant-folding optimizer          |
| `ExprSoundness.v` | Correctness theorems                |
| `ExprInterface.v` | Public API exports                  |

For this appendix, everything is shown in one module so the artifact is easy to copy and inspect.

### B.2 Full Corrected Core Code

```coq
From Stdlib Require Import Arith Lia.

Module ExprEval.

  Inductive expr : Type :=
  | EConst : nat -> expr
  | EPlus : expr -> expr -> expr.

  Definition ex1 : expr :=
    EPlus (EConst 1) (EConst 2).

  Definition ex2 : expr :=
    EPlus (EPlus (EConst 1) (EConst 2)) (EConst 3).

  Fixpoint eval (e : expr) : nat :=
    match e with
    | EConst n => n
    | EPlus e1 e2 => eval e1 + eval e2
    end.

  Example eval_ex1 :
    eval ex1 = 3.
  Proof.
    reflexivity.
  Qed.

  Example eval_ex2 :
    eval ex2 = 6.
  Proof.
    reflexivity.
  Qed.

  Inductive evalR : expr -> nat -> Prop :=
  | EvalConst : forall n : nat,
      evalR (EConst n) n
  | EvalPlus : forall e1 e2 n1 n2 : nat,
      evalR e1 n1 ->
      evalR e2 n2 ->
      evalR (EPlus e1 e2) (n1 + n2).

  Theorem evalR_sound :
    forall (e : expr) (n : nat),
      evalR e n -> eval e = n.
  Proof.
    intros e n H.
    induction H as
      [ n
      | e1 e2 n1 n2 H1 IH1 H2 IH2 ].
    - reflexivity.
    - simpl.
      rewrite IH1.
      rewrite IH2.
      reflexivity.
  Qed.

  Theorem evalR_complete :
    forall e : expr,
      evalR e (eval e).
  Proof.
    intros e.
    induction e as [n | e1 IH1 e2 IH2].
    - simpl.
      apply EvalConst.
    - simpl.
      apply EvalPlus.
      + exact IH1.
      + exact IH2.
  Qed.

  Theorem eval_evalR_equiv :
    forall (e : expr) (n : nat),
      evalR e n <-> eval e = n.
  Proof.
    intros e n.
    split.
    - apply evalR_sound.
    - intros H.
      rewrite <- H.
      apply evalR_complete.
  Qed.

  Theorem evalR_deterministic :
    forall (e : expr) (n1 n2 : nat),
      evalR e n1 ->
      evalR e n2 ->
      n1 = n2.
  Proof.
    intros e n1 n2 H1 H2.
    rewrite <- (evalR_sound e n1 H1).
    rewrite <- (evalR_sound e n2 H2).
    reflexivity.
  Qed.

  Fixpoint fold_constants (e : expr) : expr :=
    match e with
    | EConst n => EConst n
    | EPlus e1 e2 =>
        let e1' := fold_constants e1 in
        let e2' := fold_constants e2 in
        match e1', e2' with
        | EConst n1, EConst n2 => EConst (n1 + n2)
        | _, _ => EPlus e1' e2'
        end
    end.

  Example fold_ex1 :
    fold_constants ex1 = EConst 3.
  Proof.
    reflexivity.
  Qed.

  Example fold_ex2 :
    fold_constants ex2 = EConst 6.
  Proof.
    reflexivity.
  Qed.

  Theorem fold_constants_correct :
    forall e : expr,
      eval (fold_constants e) = eval e.
  Proof.
    intros e.
    induction e as [n | e1 IH1 e2 IH2].
    - reflexivity.
    - simpl.
      destruct (fold_constants e1) as [n1 | l1 r1] eqn:H1;
      destruct (fold_constants e2) as [n2 | l2 r2] eqn:H2;
      simpl;
      rewrite H1 in IH1;
      rewrite H2 in IH2;
      simpl in IH1;
      simpl in IH2;
      rewrite IH1;
      rewrite IH2;
      reflexivity.
  Qed.

  Theorem fold_constants_evalR :
    forall (e : expr) (n : nat),
      evalR e n ->
      evalR (fold_constants e) n.
  Proof.
    intros e n H.
    rewrite <- (evalR_sound e n H).
    rewrite <- (fold_constants_correct e).
    apply evalR_complete.
  Qed.

  Fixpoint size (e : expr) : nat :=
    match e with
    | EConst _ => 1
    | EPlus e1 e2 => 1 + size e1 + size e2
    end.

  Theorem fold_constants_size_le :
    forall e : expr,
      size (fold_constants e) <= size e.
  Proof.
    intros e.
    induction e as [n | e1 IH1 e2 IH2].
    - simpl. lia.
    - simpl.
      destruct (fold_constants e1) as [n1 | l1 r1] eqn:H1;
      destruct (fold_constants e2) as [n2 | l2 r2] eqn:H2;
      simpl;
      rewrite H1 in IH1;
      rewrite H2 in IH2;
      simpl in IH1;
      simpl in IH2;
      lia.
  Qed.

End ExprEval.
```

### B.3 Syntax: Arithmetic Expressions

The expression language has two constructors:

```coq
Inductive expr : Type :=
| EConst : nat -> expr
| EPlus : expr -> expr -> expr.
```

| Constructor   | Meaning             |
| ------------- | ------------------- |
| `EConst n`    | Numeric constant    |
| `EPlus e1 e2` | Addition expression |

This is an inductive abstract syntax tree. Because it is inductive, Rocq automatically provides case analysis and induction principles for expressions.

Example expressions:

```coq
Definition ex1 : expr :=
  EPlus (EConst 1) (EConst 2).

Definition ex2 : expr :=
  EPlus (EPlus (EConst 1) (EConst 2)) (EConst 3).
```

### B.4 Executable Semantics: `eval`

The executable evaluator is a structurally recursive function.

```coq
Fixpoint eval (e : expr) : nat :=
  match e with
  | EConst n => n
  | EPlus e1 e2 => eval e1 + eval e2
  end.
```

| Case          | Computation                                                  |
| ------------- | ------------------------------------------------------------ |
| `EConst n`    | Return `n`                                                   |
| `EPlus e1 e2` | Recursively evaluate both subexpressions and add the results |

Example facts:

```coq
Example eval_ex1 :
  eval ex1 = 3.
Proof.
  reflexivity.
Qed.

Example eval_ex2 :
  eval ex2 = 6.
Proof.
  reflexivity.
Qed.
```

These examples are useful sanity checks, but they are not the main correctness result. They prove only two concrete cases.

### B.5 Relational Semantics: `evalR`

The relation `evalR e n` means that expression `e` evaluates to result `n` according to an inductively defined semantic judgment.

```coq
Inductive evalR : expr -> nat -> Prop :=
| EvalConst : forall n : nat,
    evalR (EConst n) n
| EvalPlus : forall e1 e2 n1 n2 : nat,
    evalR e1 n1 ->
    evalR e2 n2 ->
    evalR (EPlus e1 e2) (n1 + n2).
```

| Constructor | Meaning                                                             |
| ----------- | ------------------------------------------------------------------- |
| `EvalConst` | A constant evaluates to itself                                      |
| `EvalPlus`  | A sum evaluates by evaluating both operands and adding their values |

**Design point:** `eval` computes. `evalR` specifies evaluation by evidence. The two are connected by soundness and completeness theorems.

### B.6 Soundness: Relation-to-Function

Soundness says that every relational evaluation agrees with the executable evaluator.

```coq
Theorem evalR_sound :
  forall (e : expr) (n : nat),
    evalR e n -> eval e = n.
```

Proof:

```coq
Proof.
  intros e n H.
  induction H as
    [ n
    | e1 e2 n1 n2 H1 IH1 H2 IH2 ].
  - reflexivity.
  - simpl.
    rewrite IH1.
    rewrite IH2.
    reflexivity.
Qed.
```

| Proof step     | Why                                                   |
| -------------- | ----------------------------------------------------- |
| `intros e n H` | Bring expression, result, and derivation into context |
| `induction H`  | The derivation explains how evaluation was produced   |
| Constant case  | Computation closes by `reflexivity`                   |
| Plus case      | Use both induction hypotheses and rewrite             |

**Pattern:** Relation-to-function soundness often uses induction on the derivation evidence.

### B.7 Completeness: Function-to-Relation

Completeness says that the executable evaluator’s result is accepted by the relational semantics.

```coq
Theorem evalR_complete :
  forall e : expr,
    evalR e (eval e).
```

Proof:

```coq
Proof.
  intros e.
  induction e as [n | e1 IH1 e2 IH2].
  - simpl.
    apply EvalConst.
  - simpl.
    apply EvalPlus.
    + exact IH1.
    + exact IH2.
Qed.
```

| Proof step    | Why                                                 |
| ------------- | --------------------------------------------------- |
| `induction e` | The function `eval` recurses over expression syntax |
| Constant case | Use `EvalConst`                                     |
| Plus case     | Use `EvalPlus` and both syntax induction hypotheses |

**Pattern:** Function-to-relation completeness often uses induction on syntax.

### B.8 Equivalence Between `eval` and `evalR`

The two bridge theorems combine into an equivalence.

```coq
Theorem eval_evalR_equiv :
  forall (e : expr) (n : nat),
    evalR e n <-> eval e = n.
Proof.
  intros e n.
  split.
  - apply evalR_sound.
  - intros H.
    rewrite <- H.
    apply evalR_complete.
Qed.
```

| Direction                 | Meaning                                     |
| ------------------------- | ------------------------------------------- |
| `evalR e n -> eval e = n` | Relation is sound with respect to function  |
| `eval e = n -> evalR e n` | Function result has a relational derivation |

### B.9 Determinism of Relational Evaluation

The relation `evalR` is deterministic: one expression cannot evaluate to two different natural numbers.

```coq
Theorem evalR_deterministic :
  forall (e : expr) (n1 n2 : nat),
    evalR e n1 ->
    evalR e n2 ->
    n1 = n2.
Proof.
  intros e n1 n2 H1 H2.
  rewrite <- (evalR_sound e n1 H1).
  rewrite <- (evalR_sound e n2 H2).
  reflexivity.
Qed.
```

This proof avoids a longer derivation-induction proof by reusing `evalR_sound`.

**Professional pattern:** Once bridge theorems exist, reuse them. Do not repeat semantic induction unnecessarily.

### B.10 Optimizer: Constant Folding

The optimizer recursively simplifies additions of constants.

```coq
Fixpoint fold_constants (e : expr) : expr :=
  match e with
  | EConst n => EConst n
  | EPlus e1 e2 =>
      let e1' := fold_constants e1 in
      let e2' := fold_constants e2 in
      match e1', e2' with
      | EConst n1, EConst n2 => EConst (n1 + n2)
      | _, _ => EPlus e1' e2'
      end
  end.
```

Examples:

```coq
Example fold_ex1 :
  fold_constants ex1 = EConst 3.
Proof.
  reflexivity.
Qed.

Example fold_ex2 :
  fold_constants ex2 = EConst 6.
Proof.
  reflexivity.
Qed.
```

These examples show intended behavior, but the correctness theorem is the important artifact.

### B.11 Correctness of Constant Folding

Semantic preservation says that folding constants does not change the value of an expression.

```coq
Theorem fold_constants_correct :
  forall e : expr,
    eval (fold_constants e) = eval e.
```

Proof:

```coq
Proof.
  intros e.
  induction e as [n | e1 IH1 e2 IH2].
  - reflexivity.
  - simpl.
    destruct (fold_constants e1) as [n1 | l1 r1] eqn:H1;
    destruct (fold_constants e2) as [n2 | l2 r2] eqn:H2;
    simpl;
    rewrite H1 in IH1;
    rewrite H2 in IH2;
    simpl in IH1;
    simpl in IH2;
    rewrite IH1;
    rewrite IH2;
    reflexivity.
Qed.
```

The critical repair is this part:

```coq
rewrite H1 in IH1;
rewrite H2 in IH2;
simpl in IH1;
simpl in IH2;
```

After destructing `fold_constants e1` and `fold_constants e2`, the induction hypotheses still mention `fold_constants e1` and `fold_constants e2`. The equations `H1` and `H2` connect those recursive optimizer results to the branch-specific constructors. Rewriting them into the induction hypotheses makes the hypotheses usable.

| Technique                    | Why it is needed                                          |
| ---------------------------- | --------------------------------------------------------- |
| `induction e`                | Optimizer recurses over expression syntax                 |
| `destruct ... eqn:H`         | Preserve equations for optimized subexpressions           |
| `rewrite H1 in IH1`          | Specialize induction hypothesis to the branch case        |
| `simpl in IH1`               | Reduce `eval (EConst n)` or `eval (EPlus l r)`            |
| `rewrite IH1`, `rewrite IH2` | Replace optimized subexpression values by original values |

### B.12 Relational Correctness of the Optimizer

The optimizer also preserves relational evaluation results.

```coq
Theorem fold_constants_evalR :
  forall (e : expr) (n : nat),
    evalR e n ->
    evalR (fold_constants e) n.
Proof.
  intros e n H.
  rewrite <- (evalR_sound e n H).
  rewrite <- (fold_constants_correct e).
  apply evalR_complete.
Qed.
```

Explanation:

| Step                                    | Meaning                                                                   |
| --------------------------------------- | ------------------------------------------------------------------------- |
| `rewrite <- (evalR_sound e n H)`        | Replace `n` by `eval e`                                                   |
| `rewrite <- (fold_constants_correct e)` | Replace `eval e` by `eval (fold_constants e)`                             |
| `apply evalR_complete`                  | Build relational derivation for the optimized expression’s computed value |

### B.13 Size Function and Structural Sanity

Define a simple size measure.

```coq
Fixpoint size (e : expr) : nat :=
  match e with
  | EConst _ => 1
  | EPlus e1 e2 => 1 + size e1 + size e2
  end.
```

The optimizer does not increase expression size.

```coq
Theorem fold_constants_size_le :
  forall e : expr,
    size (fold_constants e) <= size e.
Proof.
  intros e.
  induction e as [n | e1 IH1 e2 IH2].
  - simpl. lia.
  - simpl.
    destruct (fold_constants e1) as [n1 | l1 r1] eqn:H1;
    destruct (fold_constants e2) as [n2 | l2 r2] eqn:H2;
    simpl;
    rewrite H1 in IH1;
    rewrite H2 in IH2;
    simpl in IH1;
    simpl in IH2;
    lia.
Qed.
```

| Theorem                  | Kind of property           |
| ------------------------ | -------------------------- |
| `fold_constants_correct` | Semantic preservation      |
| `fold_constants_size_le` | Structural sanity property |

**Design point:** Optimizer correctness usually needs a semantic theorem. Structural size facts are useful, but they are not substitutes for semantic preservation.

### B.14 Public API View

The module exports:

| API item                 | Reason                           |
| ------------------------ | -------------------------------- |
| `expr`                   | Public syntax type               |
| `EConst`, `EPlus`        | Public constructors              |
| `eval`                   | Executable evaluator             |
| `evalR`                  | Relational semantics             |
| `evalR_sound`            | Relation-to-function bridge      |
| `evalR_complete`         | Function-to-relation bridge      |
| `eval_evalR_equiv`       | Equivalence theorem              |
| `evalR_deterministic`    | Relational determinism           |
| `fold_constants`         | Optimizer                        |
| `fold_constants_correct` | Semantic optimizer correctness   |
| `fold_constants_evalR`   | Relational optimizer correctness |
| `size`                   | Structural measure               |
| `fold_constants_size_le` | Size sanity theorem              |

Clients should reason through public theorems such as:

```coq
ExprEval.evalR_sound
ExprEval.evalR_complete
ExprEval.fold_constants_correct
```

rather than unfolding proof internals.

### B.15 Extraction Boundary

The executable functions are:

```coq
ExprEval.eval
ExprEval.fold_constants
ExprEval.size
```

The proof theorems are:

```coq
ExprEval.evalR_sound
ExprEval.evalR_complete
ExprEval.fold_constants_correct
ExprEval.fold_constants_evalR
ExprEval.fold_constants_size_le
```

A precise extraction claim is:

> The Rocq function `ExprEval.fold_constants` is proved to preserve the value computed by `ExprEval.eval`, by theorem `ExprEval.fold_constants_correct`. If extracted, the computational content of `fold_constants`, `eval`, and `size` can be run in the target language. The theorem does not by itself verify any parser, pretty-printer, I/O wrapper, target compiler, target runtime, or deployment environment.

| Component                       | Verified here?        |
| ------------------------------- | --------------------- |
| Expression AST                  | Yes, as formal syntax |
| Functional evaluator            | Defined               |
| Relational semantics            | Defined               |
| Function/relation agreement     | Proved                |
| Optimizer semantic preservation | Proved                |
| Optimizer size non-increase     | Proved                |
| Parser from strings             | Not modeled           |
| Pretty-printer                  | Not modeled           |
| File input/output               | Not modeled           |
| Target compiler/runtime         | Outside theorem       |
| Deployment environment          | Outside theorem       |

### B.16 What This Mini-Project Demonstrates

| Guide concept                   | Where it appears                                                   |
| ------------------------------- | ------------------------------------------------------------------ |
| Inductive syntax                | `expr`                                                             |
| Executable computation          | `eval`, `fold_constants`, `size`                                   |
| Relational specification        | `evalR`                                                            |
| Proof by derivation induction   | `evalR_sound`                                                      |
| Proof by syntax induction       | `evalR_complete`, `fold_constants_correct`                         |
| Bridge theorem                  | `eval_evalR_equiv`                                                 |
| Determinism via bridge theorem  | `evalR_deterministic`                                              |
| Optimizer semantic preservation | `fold_constants_correct`                                           |
| Relational preservation         | `fold_constants_evalR`                                             |
| Structural sanity theorem       | `fold_constants_size_le`                                           |
| Proof engineering               | `destruct ... eqn:`, rewriting equations into induction hypotheses |
| API boundary                    | `Module ExprEval`                                                  |
| Extraction boundary             | precise verified-core claim                                        |

### B.17 Common Mistakes in This Project

| Mistake                                                | Why it is wrong                                                     | Better approach                                    |
| ------------------------------------------------------ | ------------------------------------------------------------------- | -------------------------------------------------- |
| Writing `forall e n : nat` in `evalR_sound`            | `e` must have type `expr`, not `nat`                                | Write `forall (e : expr) (n : nat)`                |
| Proving only examples like `eval ex1 = 3`              | Examples do not certify general behavior                            | Prove `evalR_sound` and `evalR_complete`           |
| Defining only `eval` and no specification              | The function has no formal semantic contract                        | Add `evalR` or another spec                        |
| Claiming optimizer correctness from examples           | Examples do not prove preservation for all expressions              | Prove `fold_constants_correct`                     |
| Destructing optimized subexpressions without equations | Induction hypotheses become hard to use                             | Use `destruct ... eqn:H`                           |
| Forgetting to rewrite equations into IHs               | IH still mentions `fold_constants e1` rather than the branch result | Use `rewrite H in IH`                              |
| Claiming extraction verifies the whole program         | Parser/runtime/wrapper are not modeled                              | State exact verified boundary                      |
| Hiding the main proof in automation                    | Reduces reviewability                                               | Expose induction, destruct equations, and rewrites |

### B.18 Extension Exercises

| Exercise                                           | Skill tested                                     |
| -------------------------------------------------- | ------------------------------------------------ |
| Add multiplication `EMul`                          | Extending syntax, evaluator, relation, optimizer |
| Prove multiplication folding correctness           | Larger syntax induction                          |
| Add variables and environments                     | Modeling finite maps/environments                |
| Make lookup partial with `option`                  | Partial computation                              |
| Add a type system                                  | Inductive typing relation                        |
| Prove evaluator respects typing                    | Basic semantic soundness                         |
| Add subtraction with failure                       | `option` or `result` modeling                    |
| Add parser boundary as `list token -> option expr` | Validation and parser soundness                  |
| Extract evaluator and optimizer                    | Extraction boundary discipline                   |

### B.19 Minimal Final Replacement Block

For a compact appendix, this is the version to keep as the main checked-oriented code block:

```coq
From Stdlib Require Import Arith Lia.

Module ExprEval.

  Inductive expr : Type :=
  | EConst : nat -> expr
  | EPlus : expr -> expr -> expr.

  Fixpoint eval (e : expr) : nat :=
    match e with
    | EConst n => n
    | EPlus e1 e2 => eval e1 + eval e2
    end.

  Inductive evalR : expr -> nat -> Prop :=
  | EvalConst : forall n : nat,
      evalR (EConst n) n
  | EvalPlus : forall e1 e2 n1 n2 : nat,
      evalR e1 n1 ->
      evalR e2 n2 ->
      evalR (EPlus e1 e2) (n1 + n2).

  Theorem evalR_sound :
    forall (e : expr) (n : nat),
      evalR e n -> eval e = n.
  Proof.
    intros e n H.
    induction H as
      [ n
      | e1 e2 n1 n2 H1 IH1 H2 IH2 ].
    - reflexivity.
    - simpl. rewrite IH1. rewrite IH2. reflexivity.
  Qed.

  Theorem evalR_complete :
    forall e : expr,
      evalR e (eval e).
  Proof.
    intros e.
    induction e as [n | e1 IH1 e2 IH2].
    - apply EvalConst.
    - simpl. apply EvalPlus.
      + exact IH1.
      + exact IH2.
  Qed.

  Fixpoint fold_constants (e : expr) : expr :=
    match e with
    | EConst n => EConst n
    | EPlus e1 e2 =>
        let e1' := fold_constants e1 in
        let e2' := fold_constants e2 in
        match e1', e2' with
        | EConst n1, EConst n2 => EConst (n1 + n2)
        | _, _ => EPlus e1' e2'
        end
    end.

  Theorem fold_constants_correct :
    forall e : expr,
      eval (fold_constants e) = eval e.
  Proof.
    intros e.
    induction e as [n | e1 IH1 e2 IH2].
    - reflexivity.
    - simpl.
      destruct (fold_constants e1) as [n1 | l1 r1] eqn:H1;
      destruct (fold_constants e2) as [n2 | l2 r2] eqn:H2;
      simpl;
      rewrite H1 in IH1;
      rewrite H2 in IH2;
      simpl in IH1;
      simpl in IH2;
      rewrite IH1;
      rewrite IH2;
      reflexivity.
  Qed.

End ExprEval.
```

### B.20 Final Lessons

| Lesson                                    | Project evidence                                             |
| ----------------------------------------- | ------------------------------------------------------------ |
| Data modeling shapes proof                | `expr` gives structural induction                            |
| Functions compute                         | `eval` and `fold_constants` are executable                   |
| Relations specify evidence                | `evalR` records semantic derivations                         |
| Correctness needs bridge theorems         | `evalR_sound`, `evalR_complete`                              |
| Optimizers need semantic preservation     | `fold_constants_correct`                                     |
| Branch equations matter                   | `destruct ... eqn:H` preserves optimizer branch facts        |
| Induction hypotheses often need rewriting | `rewrite H1 in IH1` makes recursive correctness usable       |
| Examples are useful but insufficient      | `eval_ex1` and `fold_ex2` are weaker than universal theorems |
| Modules define public APIs                | `ExprEval` exports definitions and theorems                  |
| Extraction claims need boundaries         | Parser/runtime/wrapper are not verified here                 |

This mini-project demonstrates the standard Rocq pattern:

> Define syntax, define executable behavior, define relational specification, prove bridge theorems, prove transformation correctness, package the public API, and state the proof boundary precisely.

## Appendix C — Common Errors and Repair Patterns

This appendix is a practical error-repair guide. It is organized by symptoms: what Rocq appears to reject, what usually caused the problem, how to diagnose it, and how to repair it.

The main principle is simple:

> Do not respond to proof failure by adding random tactics. First identify whether the problem is goal shape, theorem strength, equality direction, hidden elaboration, missing imports, weak induction hypothesis, or an actual modeling error.

### C.1 Error Diagnosis Workflow

When something fails, proceed in this order.

| Step | Question                                        | Tool or action                                                 |
| ---- | ----------------------------------------------- | -------------------------------------------------------------- |
| 1    | What is the exact current goal?                 | Read proof state                                               |
| 2    | What hypotheses are available?                  | Inspect context                                                |
| 3    | What is the goal shape?                         | Equality, conjunction, existential, arithmetic, relation, etc. |
| 4    | Is this a computation problem or proof problem? | Try `cbn`, inspect definitions                                 |
| 5    | Is the equality definitional or propositional?  | `reflexivity` versus lemma/rewrite                             |
| 6    | Is the theorem statement strong enough?         | Inspect induction hypothesis                                   |
| 7    | Is a standard lemma available?                  | `Search`                                                       |
| 8    | Are hidden arguments/scopes involved?           | `Check`, `Locate`, `@`                                         |
| 9    | Are imports/build environment correct?          | Check module paths and build config                            |
| 10   | Are assumptions or admissions involved?         | `Print Assumptions`                                            |

### C.2 Parse Errors

**Typical symptoms:**

| Symptom                              | Likely cause                                |
| ------------------------------------ | ------------------------------------------- |
| Command rejected before proof starts | Syntax error                                |
| Unexpected token                     | Missing period, bad notation, wrong keyword |
| Notation not recognized              | Missing import or scope                     |
| Parser accepts something unexpected  | Wrong scope or precedence                   |

Example mistake:

```coq
Definition x : nat := 0
```

Missing final period.

Repair:

```coq
Definition x : nat := 0.
```

Notation issue:

```coq
Check [1; 2; 3].
```

May fail if list notations are not imported.

Repair:

```coq
From Stdlib Require Import List.
Import ListNotations.

Check [1; 2; 3].
```

**Diagnostic tools:**

| Need                       | Tool                                      |
| -------------------------- | ----------------------------------------- |
| Check notation source      | `Locate "notation".`                      |
| Check parsed term type     | `Check term.`                             |
| Avoid notation temporarily | Use fully qualified names or constructors |

**Rule:** If the error happens before type checking, debug syntax, notation, periods, and scopes first.

### C.3 Unknown Reference Errors

**Typical symptoms:**

| Symptom                                          | Likely cause                     |
| ------------------------------------------------ | -------------------------------- |
| `The reference ... was not found`                | Missing import                   |
| A theorem name works in one file but not another | Different imports                |
| Qualified name fails                             | Wrong module path                |
| Old tutorial import fails                        | Coq-era or version-specific path |

Example:

```coq
Check app_assoc.
```

May fail if `List` is not imported.

Repair:

```coq
From Stdlib Require Import List.
Import ListNotations.

Check app_assoc.
```

**Repair patterns:**

| Cause                           | Repair                                   |
| ------------------------------- | ---------------------------------------- |
| Missing standard library module | `From Stdlib Require Import ModuleName.` |
| Missing notation                | `Import ModuleNotations.`                |
| Ambiguous name                  | Use qualified name                       |
| Old code path                   | Check current project convention         |
| External package missing        | Install package and verify logical path  |

**Rule:** Package names, file names, and logical module names may differ. Use load-path diagnostics when necessary.

### C.4 Type Errors

**Typical symptoms:**

| Symptom                                         | Likely cause                                   |
| ----------------------------------------------- | ---------------------------------------------- |
| Term has type `A` but expected `B`              | Wrong argument or missing coercion             |
| Constructor ambiguous                           | Hidden implicit argument not inferred          |
| `None` has unknown type                         | No expected `option A` context                 |
| Function application fails                      | Arguments in wrong order                       |
| The printed terms look similar but do not match | Hidden arguments, scopes, coercions, universes |

Example:

```coq
Check None.
```

May be too ambiguous.

Repair:

```coq
Check (None : option nat).
```

Constructor diagnostic:

```coq
Check Some.
Check @Some.
```

`@Some` exposes implicit parameters.

**Repair patterns:**

| Problem                           | Repair                                            |
| --------------------------------- | ------------------------------------------------- |
| Ambiguous polymorphic term        | Add type annotation                               |
| Hidden implicit argument mismatch | Use `@name` to inspect explicit form              |
| Wrong notation scope              | `Locate`, explicit scope, qualified names         |
| Function arguments wrong          | `Check function_name`                             |
| Coercion confusion                | Add explicit projection or annotation             |
| Universe issue                    | Reduce generality or inspect universe constraints |

**Rule:** When a type error looks impossible, inspect the fully explicit term.

### C.5 Goal-Shape Tactic Failures

Many tactic failures are not deep. The tactic simply does not match the current goal.

| Failed tactic    | Usual reason                         | Correct goal shape                     |
| ---------------- | ------------------------------------ | -------------------------------------- |
| `split`          | Goal is not conjunction              | `A /\ B`                               |
| `left` / `right` | Goal is not disjunction              | `A \/ B`                               |
| `exists x`       | Goal is not existential              | `exists y, P y`                        |
| `reflexivity`    | Goal is not convertible equality     | `lhs = rhs` with convertible sides     |
| `rewrite H`      | No matching subterm                  | Goal contains one side of `H`          |
| `induction x`    | `x` not suitable or theorem too weak | Recursive structure or evidence        |
| `lia`            | Goal is not linear arithmetic        | Linear arithmetic over `nat`/`Z`       |
| `discriminate`   | No constructor contradiction         | Equality between distinct constructors |

Example:

```coq
Theorem bad_split_example :
  forall A B : Prop, A -> B -> A.
Proof.
  intros A B HA HB.
  (* split.  Wrong: the goal is A, not A /\ B. *)
  exact HA.
Qed.
```

**Rule:** Read the goal before choosing the tactic.

### C.6 `reflexivity` Fails on a True Equality

**Typical symptom:** The equation is mathematically true, but `reflexivity` fails.

Example:

```coq
Theorem plus_zero_bad :
  forall n : nat, n + 0 = n.
Proof.
  intros n.
  reflexivity.
Qed.
```

This fails because `n + 0` does not reduce when `n` is a variable and addition recurses on its first argument.

Repair by induction:

```coq
Theorem plus_zero_good :
  forall n : nat, n + 0 = n.
Proof.
  intros n.
  induction n as [| n IHn].
  - reflexivity.
  - simpl.
    rewrite IHn.
    reflexivity.
Qed.
```

Or use a library lemma:

```coq
From Stdlib Require Import Arith.

Theorem plus_zero_library :
  forall n : nat, n + 0 = n.
Proof.
  intros n.
  apply Nat.add_0_r.
Qed.
```

| Cause                                  | Repair                            |
| -------------------------------------- | --------------------------------- |
| Equality not definitional              | Use lemma or induction            |
| Needed definition opaque               | Use theorem or unfold selectively |
| Goal needs algebraic fact              | Use arithmetic lemma or solver    |
| Recursive function blocked by variable | Induct on recursive argument      |

**Rule:** `reflexivity` proves conversion, not all true equalities.

### C.7 `simpl` Does Nothing Useful

**Typical symptoms:**

| Symptom                            | Cause                                     |
| ---------------------------------- | ----------------------------------------- |
| `simpl` leaves goal unchanged      | Head is a variable or opaque constant     |
| `simpl` unfolds too much           | Definition transparency exposes internals |
| `simpl` makes goal harder          | Over-reduction                            |
| Repeated `simpl` does not progress | A theorem, not computation, is needed     |

Example:

```coq
Goal forall n : nat, n + 0 = n.
Proof.
  intros n.
  simpl.
```

The goal remains essentially unchanged.

Repair:

```coq
Theorem simpl_not_enough :
  forall n : nat, n + 0 = n.
Proof.
  intros n.
  induction n as [| n IHn].
  - reflexivity.
  - simpl.
    rewrite IHn.
    reflexivity.
Qed.
```

**Repair patterns:**

| Problem                                 | Repair                                   |
| --------------------------------------- | ---------------------------------------- |
| Reduction blocked by variable           | Induct/destruct variable                 |
| Definition hidden                       | `unfold name` if appropriate             |
| Public abstraction should remain hidden | Use behavior lemma                       |
| Algebraic equality needed               | Use lemma or arithmetic tactic           |
| Goal over-expanded                      | Use `fold` or avoid broad simplification |

**Rule:** If `simpl` does not expose a recursive call or constructor case, a proof lemma may be needed.

### C.8 `rewrite` Fails

**Typical symptoms:**

| Symptom                                 | Likely cause                             |
| --------------------------------------- | ---------------------------------------- |
| `rewrite H` fails                       | Goal does not contain left side of `H`   |
| `rewrite <- H` works                    | Direction was wrong                      |
| Rewrite changes too much                | Broad rewrite                            |
| Rewrite in hypothesis loses useful form | Original hypothesis overwritten          |
| Rewrite theorem does not match          | Hidden arguments or different term shape |

Example:

```coq
Theorem rewrite_direction :
  forall a b c : nat,
    b = a -> a + c = b + c.
Proof.
  intros a b c H.
  rewrite <- H.
  reflexivity.
Qed.
```

If `H : b = a`, then `rewrite H` rewrites `b` to `a`; but the goal contains `a`, so the useful direction is `rewrite <- H`.

**Repair patterns:**

| Cause                      | Repair                                                |
| -------------------------- | ----------------------------------------------------- |
| Wrong direction            | `rewrite <- H`                                        |
| Term not simplified enough | `cbn` or unfold selectively                           |
| Hidden arguments differ    | `Check H`, inspect goal                               |
| Need targeted rewrite      | `rewrite H in H2` or rewrite only specific hypothesis |
| Equality too weak          | Prove stronger lemma                                  |
| No equality theorem exists | State helper lemma                                    |

**Rule:** Rewriting is typed replacement using a proof of equality, not textual search-and-replace.

### C.9 `apply` Creates Unexpected Subgoals

**Typical symptom:** `apply H` works but generates surprising premises.

Example:

```coq
Theorem apply_demo :
  forall A B C : Prop,
    (A -> B -> C) -> A -> B -> C.
Proof.
  intros A B C H HA HB.
  apply H.
  - exact HA.
  - exact HB.
Qed.
```

`apply H` changes the goal `C` into subgoals `A` and `B`.

**Repair patterns:**

| Cause                           | Repair                                   |
| ------------------------------- | ---------------------------------------- |
| Theorem has premises            | Prove generated subgoals                 |
| Implicit arguments not inferred | Apply with explicit arguments            |
| Theorem conclusion too general  | Specialize theorem first                 |
| Wrong theorem direction         | Use another theorem or rewrite direction |
| Need exact proof instead        | Use `exact (H arg1 arg2)`                |

Diagnostic:

```coq
Check H.
```

**Rule:** Before applying a theorem, inspect its full type.

### C.10 `induction` Gives a Weak Induction Hypothesis

**Typical symptom:** The induction hypothesis is too specific to rewrite the goal.

Common cause: too many variables were introduced before induction, or the theorem itself is too weak.

Bad pattern:

```coq
intros x y.
induction x.
```

Sometimes `y` should remain generalized.

Better pattern:

```coq
intros x.
induction x.
- intros y. ...
- intros y. ...
```

Accumulator example:

```coq
From Stdlib Require Import List.
Import ListNotations.

Fixpoint rev_acc {A : Type} (xs acc : list A) : list A :=
  match xs with
  | [] => acc
  | x :: xs' => rev_acc xs' (x :: acc)
  end.
```

Weak theorem:

```coq
Theorem rev_acc_nil_only :
  forall (A : Type) (xs : list A),
    rev_acc xs [] = rev xs.
```

Stronger theorem:

```coq
Theorem rev_acc_correct :
  forall (A : Type) (xs acc : list A),
    rev_acc xs acc = rev xs ++ acc.
Proof.
  intros A xs.
  induction xs as [| x xs IHxs].
  - intros acc. reflexivity.
  - intros acc.
    simpl.
    rewrite IHxs.
    rewrite app_assoc.
    reflexivity.
Qed.
```

**Repair patterns:**

| Symptom                                 | Repair                                   |
| --------------------------------------- | ---------------------------------------- |
| IH fixed to one value                   | Generalize variable                      |
| Accumulator changes recursively         | State theorem over arbitrary accumulator |
| Equality relation lost                  | Use `generalize dependent`               |
| Indexed type proof stuck                | Keep indices general                     |
| Function recurses on different argument | Induct on recursive argument             |

**Rule:** If the IH is unusable, strengthen the theorem before searching for tactics.

### C.11 `destruct` Loses Information

**Typical symptom:** After destructing a test or function call, the proof no longer remembers what branch occurred.

Bad pattern:

```coq
destruct (Nat.eqb n 0).
```

Better pattern:

```coq
destruct (Nat.eqb n 0) eqn:Heq.
```

Example:

```coq
Theorem eqb_zero_cases :
  forall n : nat,
    Nat.eqb n 0 = true \/ Nat.eqb n 0 = false.
Proof.
  intros n.
  destruct (Nat.eqb n 0) eqn:Heq.
  - left. exact Heq.
  - right. exact Heq.
Qed.
```

**Repair patterns:**

| Situation                     | Use                                                    |
| ----------------------------- | ------------------------------------------------------ |
| Destructing variable only     | `destruct x` is often enough                           |
| Destructing expression        | `destruct expr eqn:H`                                  |
| Need to preserve complex term | `remember term as x eqn:H`                             |
| Dependent match issues        | Consider dependent induction/inversion or helper lemma |

**Rule:** When destructing a non-variable expression, use `eqn:` unless clearly unnecessary.

### C.12 `inversion` Produces a Messy Context

**Typical symptom:** `inversion H` solves or advances the proof but creates many generated names and equalities.

Example:

```coq
Theorem some_injective :
  forall (A : Type) (x y : A),
    Some x = Some y -> x = y.
Proof.
  intros A x y H.
  inversion H.
  reflexivity.
Qed.
```

For small proofs, this is fine. For large relation proofs, repeated inversion becomes brittle.

**Repair patterns:**

| Problem                    | Repair                                  |
| -------------------------- | --------------------------------------- |
| Repeated inversion pattern | State inversion lemma                   |
| Generated names unstable   | Use structured naming or helper lemma   |
| Context clutter            | Use `subst`, `clear`, or smaller lemmas |
| Impossible case repeated   | Prove canonical contradiction lemma     |
| Relation proof too long    | Use bridge theorem or determinism lemma |

**Rule:** If the same `inversion` appears repeatedly, name the reasoning as a lemma.

### C.13 `lia` Fails

`lia` solves linear arithmetic. It does not solve structural facts about lists, trees, functions, or relations.

Example failure shape:

```coq
length (xs ++ ys) = length xs + length ys
```

This is a list theorem, not merely arithmetic. Use a list lemma or induction.

Repair:

```coq
From Stdlib Require Import List Lia.
Import ListNotations.

Theorem app_length_then_lia :
  forall (A : Type) (xs ys : list A),
    length (xs ++ ys) >= length xs.
Proof.
  intros A xs ys.
  rewrite app_length.
  lia.
Qed.
```

**Repair patterns:**

| Goal contains                    | First do                                | Then              |
| -------------------------------- | --------------------------------------- | ----------------- |
| `length (xs ++ ys)`              | `rewrite app_length`                    | `lia`             |
| `length (map f xs)`              | `rewrite map_length`                    | `lia`             |
| Recursive data                   | Induction or standard structural lemma  | arithmetic solver |
| Multiplication/nonlinear algebra | ring/nlinarith-style tools if available | not plain `lia`   |
| Custom functions                 | Prove helper lemma                      | then arithmetic   |

**Rule:** Normalize structural expressions before calling arithmetic solvers.

### C.14 `auto` or `eauto` Fails or Becomes Slow

**Typical symptoms:**

| Symptom                                    | Cause                                |
| ------------------------------------------ | ------------------------------------ |
| `auto` solved goal yesterday but not today | Hint/import changed                  |
| `eauto` is slow                            | Search space too large               |
| Automation solves but proof is unreadable  | Main proof hidden                    |
| Automation fails on central theorem        | Missing lemma or wrong theorem shape |

**Repair patterns:**

| Problem                         | Repair                              |
| ------------------------------- | ----------------------------------- |
| Key lemma unknown to automation | Apply it explicitly                 |
| Search too broad                | Use scoped hint database            |
| Main proof hidden               | Expose induction/rewrite structure  |
| Repeated routine pattern        | Add local tactic or helper lemma    |
| Fragile proof                   | Replace automation with named steps |

Example:

```coq
Theorem explicit_better_than_auto :
  forall A B : Prop, A -> B -> A /\ B.
Proof.
  intros A B HA HB.
  split.
  - exact HA.
  - exact HB.
Qed.
```

**Rule:** Use automation for routine leaves, not for the central proof idea.

### C.15 A Theorem Named `correct` Is Too Weak

**Typical symptom:** A theorem compiles but does not prove what users think it proves.

Weak sorting specification:

```coq
forall xs, sorted (sort xs)
```

This is weak because a function returning `[]` may be sorted.

Better specification:

```coq
forall xs, sorted (sort xs) /\ Permutation xs (sort xs)
```

| Domain       | Weak theorem                              | Stronger theorem                              |
| ------------ | ----------------------------------------- | --------------------------------------------- |
| Sorting      | Output is sorted                          | Output is sorted and preserves elements       |
| Parser       | If parser returns AST, AST is well-formed | Also characterize accepted language if needed |
| Optimizer    | Output has smaller size                   | Output preserves semantics                    |
| Type checker | Returns true for some good cases          | Soundness and completeness                    |
| Evaluator    | Works on examples                         | Agrees with relational semantics              |

**Rule:** Review theorem statements before proof scripts. A perfectly proved weak theorem can be useless.

### C.16 Boolean Specification Errors

**Typical symptoms:**

| Symptom                                        | Cause                     |
| ---------------------------------------------- | ------------------------- |
| Cannot use proposition in `if`                 | `if` expects `bool`       |
| Cannot rewrite `checker x = true` into `P x`   | Missing bridge theorem    |
| Soundness proof exists but completeness needed | Only one direction proved |
| Boolean validator trusted informally           | No spec theorem           |

Example:

```coq
Definition is_empty {A : Type} (xs : list A) : bool :=
  match xs with
  | [] => true
  | _ :: _ => false
  end.

Definition Empty {A : Type} (xs : list A) : Prop :=
  xs = [].
```

Soundness:

```coq
Theorem is_empty_sound :
  forall (A : Type) (xs : list A),
    is_empty xs = true -> Empty xs.
Proof.
  intros A xs H.
  destruct xs as [| x xs'].
  - reflexivity.
  - simpl in H. discriminate H.
Qed.
```

Completeness:

```coq
Theorem is_empty_complete :
  forall (A : Type) (xs : list A),
    Empty xs -> is_empty xs = true.
Proof.
  intros A xs H.
  rewrite H.
  reflexivity.
Qed.
```

**Rule:** A boolean checker becomes a verified checker only after bridge theorems connect it to a proposition.

### C.17 Dependent Type Errors

**Typical symptoms:**

| Symptom                                     | Likely cause                               |
| ------------------------------------------- | ------------------------------------------ |
| Branches of `match` have incompatible types | Dependent return type not specified        |
| Vector/list index arithmetic appears        | Indexed type generated equality obligation |
| Record equality hard                        | Proof fields involved                      |
| Function over dependent data hard to define | Need transport/equality proof              |
| Simple operation becomes proof-heavy        | Invariant placed too deep in type          |

**Repair patterns:**

| Problem                       | Repair                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------- |
| Over-dependent representation | Use raw data plus `Prop` theorem                                              |
| Index arithmetic everywhere   | Add helper lemmas                                                             |
| Dependent match too complex   | Use simpler representation or explicit return clause                          |
| Equality of proof fields      | Avoid relying on proof equality; consider proof irrelevance only if justified |
| Construction cumbersome       | Use smart constructor                                                         |
| Repeated validity proof       | Bundle invariant if truly central                                             |

**Rule:** Dependent types are powerful, but not free. Use them when the invariant is central and stable.

### C.18 Universe Errors

**Typical symptoms:**

| Symptom                           | Likely cause                                           |
| --------------------------------- | ------------------------------------------------------ |
| Universe inconsistency            | Abstraction too strong or circular universe constraint |
| Generic record fails unexpectedly | Universe levels cannot be solved                       |
| Library combination fails         | Universe convention mismatch                           |
| `Type` behaves unexpectedly       | `Type` is universe-leveled, not flat                   |

**Repair patterns:**

| Cause                           | Repair                                     |
| ------------------------------- | ------------------------------------------ |
| Over-general theorem            | Reduce generality                          |
| Record too universe-polymorphic | Add or follow library universe conventions |
| Mixed abstractions              | Use existing hierarchy pattern             |
| Wrong mental model              | Remember `Type` hierarchy                  |
| Need diagnostics                | Print universes / inspect definitions      |

**Rule:** Do not add axioms to bypass universe errors. Universe errors usually indicate an abstraction-design issue.

### C.19 Section and Module Export Surprises

**Typical symptoms:**

| Symptom                                  | Cause                                  |
| ---------------------------------------- | -------------------------------------- |
| Theorem has extra parameters after `End` | Section variables generalized          |
| Theorem depends on local hypothesis      | Section hypothesis exported as premise |
| Name requires qualification              | Inside module                          |
| Notation unavailable outside module      | Declared `Local`                       |
| Client cannot unfold representation      | Module signature hides it              |

Example:

```coq
Section S.
  Variable A : Type.
  Definition idA (x : A) := x.
End S.

Check idA.
```

`idA` is generalized over `A`.

**Repair patterns:**

| Problem                             | Repair                                  |
| ----------------------------------- | --------------------------------------- |
| Unexpected exported type            | `Check` after `End`                     |
| Hidden assumption                   | Inspect theorem type                    |
| Module qualification                | Use `ModuleName.name`                   |
| Public API too weak                 | Export behavior lemmas                  |
| Representation accidentally exposed | Use module signature or avoid unfolding |

**Rule:** Always inspect important definitions after closing a section or module.

### C.20 Import and Notation Pollution

**Typical symptoms:**

| Symptom                           | Cause                          |
| --------------------------------- | ------------------------------ |
| Proof changes after adding import | New hints, notation, instances |
| Symbol parses differently         | Scope conflict                 |
| `auto` behavior changes           | Hint database changed          |
| Typeclass resolution changes      | New instance imported          |
| Search results overwhelming       | Broad imports                  |

**Repair patterns:**

| Problem               | Repair                                       |
| --------------------- | -------------------------------------------- |
| Notation conflict     | Use explicit scopes or qualified names       |
| Broad import          | Narrow import                                |
| Automation dependency | Name lemma explicitly                        |
| Typeclass ambiguity   | Use explicit instance/arguments              |
| Public file polluted  | Use `Local` imports/notations where possible |

**Rule:** Imports are part of the proof environment. Review them like code.

### C.21 Build and Package Failures

**Typical symptoms:**

| Symptom                               | Likely cause                          |
| ------------------------------------- | ------------------------------------- |
| File checks in editor but build fails | Build config missing path/dependency  |
| CI fails but local works              | Version or package mismatch           |
| Required library not found            | Package missing or logical path wrong |
| Plugin fails to load                  | Plugin/version/toolchain mismatch     |
| Old project fails under new Rocq      | Migration issue                       |

**Repair patterns:**

| Cause                  | Repair                               |
| ---------------------- | ------------------------------------ |
| Dependency order wrong | Use build system/dependency tool     |
| Logical path missing   | Fix `_CoqProject` or Dune config     |
| Package missing        | Install with correct package manager |
| Version drift          | Pin environment                      |
| Old import path        | Update to project convention         |
| Plugin mismatch        | Use compatible plugin version        |

**Rule:** A Rocq project is not reproducible until it checks from a clean environment.

### C.22 Assumption and Trust Errors

**Typical symptoms:**

| Symptom                                         | Cause                           |
| ----------------------------------------------- | ------------------------------- |
| Theorem depends on unexpected axiom             | Imported or declared assumption |
| File compiles despite unfinished proof          | `Admitted`                      |
| Constructive theorem depends on classical logic | Classical import/axiom          |
| Public interface hides assumption               | Section/module parameter        |
| Extraction claim overstates guarantee           | Runtime boundary ignored        |

Diagnostic:

```coq
Print Assumptions theorem_name.
```

**Repair patterns:**

| Problem                         | Repair                                                |
| ------------------------------- | ----------------------------------------------------- |
| Unexpected `Admitted`           | Prove or remove theorem                               |
| Axiom too broad                 | Localize assumption                                   |
| Classical dependency unintended | Replace with constructive proof or decidability lemma |
| Hidden parameter                | Make it explicit in interface                         |
| Overclaimed extraction          | State verified core and external boundary             |

**Rule:** The theorem is only as strong as its assumptions.

### C.23 Extraction Errors and Overclaims

**Typical symptoms:**

| Symptom                                 | Cause                                    |
| --------------------------------------- | ---------------------------------------- |
| Runtime data missing after extraction   | Data was stored in `Prop`                |
| Extracted function lacks expected check | Proof erased                             |
| Verified parser claim ignores lexer     | Lexer outside model                      |
| Whole system claimed verified           | Wrapper/runtime/compiler not modeled     |
| Target code inefficient                 | Rocq representation not target-efficient |

**Repair patterns:**

| Problem                | Repair                                                  |
| ---------------------- | ------------------------------------------------------- |
| Runtime branch needed  | Use `bool`, `option`, `result`, or `sumbool`-style data |
| Runtime witness needed | Put witness in `Type`, not only `Prop`                  |
| External I/O involved  | Model it or state boundary                              |
| Performance poor       | Use extraction mappings or target profiling             |
| Claim too broad        | Rewrite guarantee precisely                             |

Correct claim shape:

> The Rocq function `f` satisfies theorem `T` under assumptions `A`. The extracted code corresponds to the computational content of `f`. External wrappers, I/O, target compiler, runtime, and deployment are outside `T` unless separately modeled.

### C.24 Performance Errors

**Typical symptoms:**

| Symptom              | Likely cause                           |
| -------------------- | -------------------------------------- |
| Slow `Qed`           | Huge proof term                        |
| Slow `cbn`/`simpl`   | Excessive unfolding                    |
| Slow `auto`/`eauto`  | Search explosion                       |
| Slow build           | Too many dependencies or broad imports |
| Huge goals           | Over-unfolding                         |
| Rewrite tactic hangs | Rewrite loop                           |
| Dependent proof slow | Complex equality/transport             |
| Extracted code slow  | Inefficient target representation      |

**Repair patterns:**

| Cause                 | Repair                            |
| --------------------- | --------------------------------- |
| Huge proof            | Split into lemmas                 |
| Too much transparency | Use `Qed`, not `Defined`          |
| Broad automation      | Scope hints, reduce search        |
| Heavy imports         | Import narrowly                   |
| Rewrite loops         | Orient lemmas toward normal form  |
| Large dependent terms | Simplify representation           |
| Slow arithmetic       | Reduce context or normalize first |

**Rule:** Optimize proof structure first, automation second, target runtime last.

### C.25 Misleading Success Cases

Sometimes Rocq accepts something, but the artifact is still bad.

| Accepted artifact                  | Why still problematic             |
| ---------------------------------- | --------------------------------- |
| Theorem with weak statement        | Proves too little                 |
| File with `Admitted`               | Contains trust debt               |
| Proof by huge automation           | Hard to review and maintain       |
| Definition with bad model          | Theorems prove wrong abstraction  |
| Extracted code from verified core  | Wrapper/runtime may be unverified |
| Theorem under hidden assumptions   | Claim appears stronger than it is |
| Public API with no behavior lemmas | Clients must unfold internals     |
| Over-dependent representation      | Future proofs become expensive    |

**Rule:** Kernel acceptance is necessary, not sufficient, for professional-quality formalization.

### C.26 Repair Pattern Index

| Problem type                    | Best repair pattern                       |
| ------------------------------- | ----------------------------------------- |
| Weak induction hypothesis       | Strengthen theorem                        |
| Repeated proof fragment         | Helper lemma                              |
| Missing computation/spec bridge | Soundness/completeness theorem            |
| Rewrite failure                 | Check direction and exact term            |
| Constructor contradiction       | `discriminate` or `inversion`             |
| Relation proof clutter          | Inversion lemma or bridge theorem         |
| Arithmetic side condition       | Normalize then `lia`                      |
| API leaks internals             | Public behavior lemma                     |
| Hidden assumptions              | `Print Assumptions` and localize          |
| Build instability               | Pin versions and clean CI                 |
| Extraction overclaim            | State verified core and external boundary |
| Performance regression          | Split lemmas, reduce transparency/imports |

### C.27 Minimal Debugging Checklist

Before asking “what tactic proves this?”, ask:

1. What is the exact goal?
2. What is in the context?
3. Is the goal a logical connective, equality, arithmetic, data property, or relation property?
4. Is the equality definitional or propositional?
5. Which definition recurses, and on which argument?
6. Is induction being performed on the right object?
7. Is the induction hypothesis strong enough?
8. Is a branch equation missing?
9. Is a standard lemma available?
10. Are hidden arguments or notation involved?
11. Are imports or scopes wrong?
12. Are assumptions or admissions involved?
13. Would a helper lemma express the missing invariant?
14. Is automation hiding the proof idea?
15. Is the theorem statement itself wrong or too weak?

### C.28 Final Error-Repair Rule

Most Rocq errors are one of five things:

| Category             | Meaning                                               | Typical repair                            |
| -------------------- | ----------------------------------------------------- | ----------------------------------------- |
| Shape mismatch       | Tactic does not match goal                            | Read goal and choose tactic by shape      |
| Equality mismatch    | Wrong kind/direction of equality                      | Reduce, rewrite correctly, or prove lemma |
| Induction mismatch   | IH too weak or wrong target                           | Strengthen theorem/generalize             |
| Environment mismatch | Imports, notation, package, build issue               | Inspect/load/configure environment        |
| Boundary mismatch    | Assumptions, extraction, effects, or specs overstated | Audit and restate boundary                |

The professional response is not to memorize more tactics. It is to diagnose which category the failure belongs to and repair the underlying structure.

## Appendix D — The Four Color Theorem: Proof Architecture and Rocq Formalization

This appendix teaches the **proof architecture** of the Four Color Theorem and explains how the Rocq/Coq formalization changes the trust story. It does not reproduce the complete formal proof line by line. The actual `fourcolor` library is a large mechanized development: its repository says it contains a formal proof of the Four Color Theorem plus the theories needed to state and prove it, including an axiomatization of classical real numbers, basic plane topology, and combinatorial hypermaps. 

The goal here is more modest and more useful for this guide:

| What this appendix teaches                                    | What it does not attempt                  |
| ------------------------------------------------------------- | ----------------------------------------- |
| The mathematical proof skeleton                               | The full formalization of every lemma     |
| Why reducibility and unavoidability prove the theorem         | Every configuration check                 |
| Why discharging appears                                       | The full discharge rule system            |
| How computer checking enters the proof                        | Reimplementing the historical programs    |
| How Rocq changes the trust boundary                           | Rebuilding the entire `fourcolor` library |
| How to connect this case study to previous parts of the guide | A short “human-only” proof of the theorem |

### D.1 The Theorem: informal, graph-theoretic, and formalized statements

The ordinary informal statement is:

> Every planar map can be colored with at most four colors so that adjacent regions receive different colors.

That sentence hides several mathematical choices. What is a “map”? What does “adjacent” mean? Are point contacts adjacent? Are regions connected? Are maps finite? Are we coloring countries, faces, graph vertices, or something else?

A cleaner graph-theoretic statement is:

> Every finite planar graph is vertex-colorable with at most four colors.

More precisely:

| Term              | Meaning                                                  |
| ----------------- | -------------------------------------------------------- |
| `graph`           | Vertices and edges                                       |
| `planar`          | Can be embedded in the plane without edge crossings      |
| `proper coloring` | Adjacent vertices receive different colors               |
| `4-colorable`     | There exists a proper coloring using at most four colors |
| theorem           | Every finite planar graph is 4-colorable                 |

In map form, regions correspond to vertices of an adjacency graph. Two regions sharing a boundary segment correspond to adjacent vertices. The theorem must exclude misleading “adjacency at a point only” situations, because otherwise many regions can all meet at a single point and force artificial adjacency.

In the Rocq `fourcolor` formalization, the final statement is not merely the graph-theoretic classroom version. The Rocq homepage displays an excerpt in which a theorem `four_color_finite` states that a finite simple map is colorable with 4 colors, and the proof uses a discretization step into a combinatorial hypermap followed by the combinatorial four-color theorem. The displayed final theorem `four_color` extends from finite simple maps to simple maps via a compactness-style extension. 

The important architectural point is:

| Level                                 | Human idea                                  | Formalization role              |
| ------------------------------------- | ------------------------------------------- | ------------------------------- |
| Topological maps                      | Regions in the plane                        | Final theorem interface         |
| Finite simple maps                    | Finite map case                             | Intermediate theorem            |
| Hypermap/combinatorial representation | Finite discrete object encoding planar maps | Main combinatorial proof target |
| Coloring theorem for hypermaps        | Purely finite/combinatorial core            | Machine-checkable proof engine  |
| Discretization/finitization           | Bridge between topology and combinatorics   | Correctness boundary            |

**Rocq lesson:** The theorem is not just “write `planar_graph -> colorable 4`.” A serious formal proof must define the objects precisely, then prove that the formalized combinatorial theorem implies the intended topological theorem.

### D.2 Why the theorem is nontrivial

The Five Color Theorem has a comparatively short proof. The Four Color Theorem is much harder because the obvious minimal-counterexample strategy gets stuck at degree-5 vertices.

A standard planar graph argument uses Euler’s formula to show that every finite planar graph has a vertex of degree at most 5. If a minimal counterexample to five-colorability existed, remove a low-degree vertex, color the smaller graph, and extend the coloring back. For degree at most 4, extension is straightforward. For degree 5, extension is not always immediate.

That is why the four-color problem is hard: the low-degree argument gets close, but not close enough.

| Vertex degree in minimal planar setting | Coloring extension difficulty                       |
| --------------------------------------- | --------------------------------------------------- |
| 0, 1, 2, 3                              | Easy                                                |
| 4                                       | Usually manageable for four colors                  |
| 5                                       | The obstruction that simple induction cannot handle |

The historical proof strategy therefore changes from “remove one low-degree vertex” to “find a local configuration that cannot occur in a minimal counterexample.”

### D.3 The minimal counterexample strategy

The high-level proof begins by contradiction.

Assume the theorem is false. Then there exists a planar map or planar graph that cannot be colored with four colors. Among all such counterexamples, choose one that is minimal, usually by number of vertices, faces, or another size measure.

The proof then tries to show that this minimal counterexample cannot exist.

| Step                                                   | Meaning                                                                      |
| ------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Assume a counterexample exists                         | There is a planar graph/map not 4-colorable                                  |
| Choose a minimal counterexample                        | No smaller counterexample exists                                             |
| Prove structural constraints                           | Minimal counterexamples must be highly constrained                           |
| Prove it contains some unavoidable local configuration | Every candidate must contain one pattern from a fixed list                   |
| Prove every such configuration is reducible            | None can appear in a minimal counterexample                                  |
| Contradiction                                          | The minimal counterexample both must and cannot contain such a configuration |

This is the central skeleton:

```text
Assume minimal counterexample M exists.
Unavoidability: M contains a configuration C from set U.
Reducibility: every C in U cannot occur in a minimal counterexample.
Therefore M cannot exist.
Therefore every planar map/graph is 4-colorable.
```

The theorem is therefore split into two massive obligations:

| Obligation        | Informal statement                                                   |
| ----------------- | -------------------------------------------------------------------- |
| `unavoidable U`   | Every minimal counterexample contains some configuration in `U`      |
| `all_reducible U` | Every configuration in `U` is impossible in a minimal counterexample |

Together:

```text
unavoidable U + all_reducible U
=> no minimal counterexample
=> four color theorem
```

This structure is conceptually simple. The difficulty is proving the two large obligations.

### D.4 Reducibility: why a configuration cannot occur in a minimal counterexample

A **configuration** is a local pattern inside a planar graph or map: a small arrangement of vertices/faces with specified boundary behavior. A configuration is **reducible** if it cannot occur inside a minimal counterexample.

The logic of reducibility is:

1. Suppose a minimal counterexample contains configuration `C`.
2. Remove or contract part of `C`, producing a smaller graph/map.
3. By minimality, the smaller object is 4-colorable.
4. Prove that every coloring of the smaller object can be extended back across `C`.
5. Then the original object is 4-colorable.
6. Contradiction.

So `C` cannot occur in a minimal counterexample.

| Concept                 | Meaning                                               |
| ----------------------- | ----------------------------------------------------- |
| configuration           | Local graph/map pattern                               |
| reduction               | Operation producing a smaller graph/map               |
| extension property      | Any coloring of the reduced object extends back       |
| reducible configuration | A configuration whose presence contradicts minimality |
| minimal counterexample  | Smallest non-4-colorable object                       |

A compact logical schema is:

```text
contains(M, C)
∧ minimal_counterexample(M)
∧ reducible(C)
=> contradiction
```

More explicitly:

```text
contains(M, C)
=> reduce M to M'
minimality(M) and smaller(M', M)
=> M' is 4-colorable
reducibility(C)
=> coloring of M' extends to coloring of M
=> M is 4-colorable
contradiction
```

The proof burden is hidden inside the phrase “coloring extends.” That extension property can be very complex. It depends on how the boundary of the configuration is colored and whether the interior can be colored consistently.

**Rocq analogy:** Reducibility is like proving a local correctness lemma for each case:

```coq
configuration_reducible C :
  forall M, contains M C -> minimal_counterexample M -> False.
```

That is not the actual formal statement, but it captures the proof shape.

### D.5 Unavoidability: why some configuration must appear

Reducibility alone is useless unless the graph must contain at least one reducible configuration. That is the role of **unavoidability**.

A set `U` of configurations is unavoidable if every object satisfying the structural constraints of a minimal counterexample contains at least one configuration from `U`.

```text
minimal_counterexample(M)
=> exists C, C ∈ U /\ contains(M, C)
```

If every `C ∈ U` is reducible, then no minimal counterexample can exist.

The structure is:

| Ingredient           | Role                                                     |
| -------------------- | -------------------------------------------------------- |
| `U`                  | A finite set of configurations                           |
| unavoidability proof | Every minimal counterexample contains some member of `U` |
| reducibility proof   | No member of `U` can occur in a minimal counterexample   |
| contradiction        | Minimal counterexample must contain something impossible |

So the theorem reduces to:

```text
Find finite U such that:
1. unavoidable(U)
2. forall C in U, reducible(C)
```

Historically, the problem became finding a large enough finite unavoidable set and proving every member reducible. Appel and Haken’s 1976 computer-assisted proof used reducibility and unavoidability, and sources describe their proof as reducing infinitely many possible maps to a large finite collection of configurations checked by computer. 

### D.6 Discharging: the engine behind unavoidability

The discharging method is a way to prove that some local configuration must occur. It is based on Euler’s formula and a conservation-of-charge argument.

For a planar triangulation, one standard degree-counting identity is:

```text
sum over vertices v of (6 - degree(v)) = 12
```

The exact formulation can vary with whether the proof uses vertices, faces, triangulations, maps, or hypermaps, but the guiding idea is stable: Euler’s formula forces some positive “curvature” or charge to exist.

A discharging proof has this shape:

| Stage                                             | Meaning                                                             |
| ------------------------------------------------- | ------------------------------------------------------------------- |
| Assign initial charge                             | Usually based on degree, e.g. `6 - degree(v)`                       |
| Total charge is positive                          | Euler-type formula gives global constraint                          |
| Redistribute charge locally                       | Apply fixed discharge rules                                         |
| Total charge is preserved                         | Moving charge does not change total                                 |
| Some local object remains positively charged      | Positive total cannot disappear                                     |
| Positive final charge implies local configuration | Rules are designed so positive charge forces a configuration in `U` |
| Therefore `U` is unavoidable                      | Every minimal counterexample contains some member of `U`            |

A schematic version:

```text
initial_charge(v) = 6 - degree(v)

Total initial charge = 12.

Apply local discharge rules:
  charge moves from some vertices/faces to nearby vertices/faces.

Total final charge = total initial charge = 12.

Therefore some vertex/face has positive final charge.

By case analysis on the discharge rules,
positive final charge implies one of the configurations in U occurs.

Therefore U is unavoidable.
```

This is not a coloring argument directly. It is a structural argument about planar graphs/maps.

**Why discharging is powerful:** It transforms a global topological constraint into a finite local case analysis.

**Why discharging is hard:** The discharge rules must be carefully designed. If the unavoidable set contains configurations that are not reducible, the proof fails. If the set is too small, unavoidability may fail. If the rules are too complex, human checking becomes unreliable.

### D.7 The proof skeleton in one table

The complete high-level proof can be summarized as follows:

| Phase                            | Mathematical content                                               | Proof obligation                         |
| -------------------------------- | ------------------------------------------------------------------ | ---------------------------------------- |
| Formalize objects                | maps, planar graphs, hypermaps, colorings                          | definitions are adequate                 |
| Reduce to minimal counterexample | assume smallest non-4-colorable object                             | minimality principles                    |
| Structural normalization         | triangulation or appropriate map/hypermap constraints              | reduction preserves colorability problem |
| Define configurations            | finite local patterns                                              | pattern language is precise              |
| Prove reducibility               | each listed configuration cannot occur in a minimal counterexample | local coloring extension checks          |
| Prove unavoidability             | every minimal counterexample contains a listed configuration       | discharging proof                        |
| Combine                          | minimal counterexample must contain impossible configuration       | contradiction                            |
| Lift back                        | combinatorial theorem implies map theorem                          | discretization/finitization correctness  |

In Rocq terms, the proof becomes a long chain of definitions and bridge theorems:

```text
topological_map
  -> finite_simple_map
  -> combinatorial_hypermap
  -> coloring theorem for hypermaps
  -> coloring theorem for maps
```

The Rocq homepage’s displayed proof excerpt follows this architecture: from a finite simple map, it obtains a hypermap `G`, a proof that `G` is planar and bridgeless, and a bridge from four-colorability of `G` back to colorability of the original map; then it invokes the combinatorial theorem `four_color_hypermap`. 

### D.8 The theorem as a Rocq-style decomposition

A simplified pseudo-Rocq decomposition might look like this:

```coq
Parameter Map : Type.
Parameter Hypermap : Type.

Parameter simple_map : Map -> Prop.
Parameter finite_simple_map : Map -> Prop.
Parameter colorable_with : nat -> Map -> Prop.

Parameter planar_bridgeless : Hypermap -> Prop.
Parameter four_colorable_hypermap : Hypermap -> Prop.

Parameter discretize_to_hypermap :
  forall m : Map,
    finite_simple_map m ->
    { G : Hypermap |
      planar_bridgeless G /\
      (four_colorable_hypermap G -> colorable_with 4 m) }.

Parameter four_color_hypermap :
  forall G : Hypermap,
    planar_bridgeless G ->
    four_colorable_hypermap G.

Theorem four_color_finite_schematic :
  forall m : Map,
    finite_simple_map m ->
    colorable_with 4 m.
Proof.
  intros m Hfin.
  destruct (discretize_to_hypermap m Hfin) as [G [Hplanar Hbridge]].
  apply Hbridge.
  apply four_color_hypermap.
  exact Hplanar.
Qed.
```

This is not the actual `fourcolor` code. It is a teaching skeleton. But it matches the architectural idea: convert a topological object to a finite combinatorial object, prove the finite combinatorial theorem, then transfer coloring back.

The actual library uses a rich infrastructure of real-plane topology and combinatorial hypermaps. The package page describes `coq-fourcolor` as a mechanization of the Four Color Theorem and says it includes the theories needed to state and prove the theorem, including real-number setoids, plane topology, and combinatorial hypermaps. 

### D.9 Why the proof is computer-assisted

The computer-assisted part is not merely arithmetic calculation. It is large finite proof search and verification over configurations.

The strategy requires:

| Computational task                              | Purpose                                                       |
| ----------------------------------------------- | ------------------------------------------------------------- |
| Represent configurations finitely               | Make local patterns checkable                                 |
| Enumerate or store a large unavoidable set      | Candidate configurations                                      |
| Check reducibility                              | Show each configuration cannot be in a minimal counterexample |
| Check discharge rules                           | Show configurations are unavoidable                           |
| Connect computed checks to mathematical theorem | Soundness of computation                                      |

In a weak trust model, one might say:

```text
A program checked many cases; trust the program.
```

In a stronger proof-assistant model, one wants:

```text
A function/checker was formalized or its result was checked,
and Rocq verified the theorem that this checking implies the mathematical claim.
```

That is the bridge to previous parts of the guide:

| Earlier concept    | Four Color Theorem role                                 |
| ------------------ | ------------------------------------------------------- |
| `bool` vs `Prop`   | Computable configuration checks must imply propositions |
| Soundness theorem  | Checker result must certify reducibility/unavoidability |
| Reflection         | Use computation to solve proof goals                    |
| Finite enumeration | Reduce infinite graph problem to finite checked cases   |
| Kernel checking    | Final theorem depends on checked proof terms            |
| Assumption audit   | Clarify topological/classical assumptions               |
| Module boundary    | Separate topology, hypermaps, reducibility, discharging |
| Build workflow     | Large proof development must be reproducible            |

**Key lesson:** The computer does not replace proof. It moves part of the proof into verified computation and finite checking.

### D.10 The minimal-counterexample contradiction in proof form

The entire proof architecture can be abstracted as a small logical lemma.

Suppose:

```text
minimal_bad M
```

means `M` is a minimal counterexample.

Suppose:

```text
unavoidable U :
  forall M, minimal_bad M -> exists C, In C U /\ contains M C
```

and:

```text
all_reducible U :
  forall C, In C U -> forall M, minimal_bad M -> contains M C -> False
```

Then:

```text
forall M, minimal_bad M -> False
```

because:

1. `minimal_bad M`
2. by unavoidability, `M` contains some `C ∈ U`
3. by reducibility of `C`, contradiction

Pseudo-Rocq:

```coq
Section AbstractFourColorSkeleton.

  Parameter Map Config : Type.
  Parameter contains : Map -> Config -> Prop.
  Parameter minimal_bad : Map -> Prop.
  Parameter InU : Config -> Prop.

  Hypothesis unavoidable :
    forall M : Map,
      minimal_bad M ->
      exists C : Config, InU C /\ contains M C.

  Hypothesis reducible :
    forall (C : Config) (M : Map),
      InU C ->
      minimal_bad M ->
      contains M C ->
      False.

  Theorem no_minimal_bad :
    forall M : Map,
      minimal_bad M -> False.
  Proof.
    intros M Hbad.
    destruct (unavoidable M Hbad) as [C [HCin HCcontains]].
    exact (reducible C M HCin Hbad HCcontains).
  Qed.

End AbstractFourColorSkeleton.
```

This tiny skeleton is not the Four Color Theorem. But it is the logical heart of the proof. The real work is proving `unavoidable` and `reducible` for a concrete formal system of maps/configurations.

### D.11 Why a simple induction proof is not enough

A tempting approach is:

```text
Induct on the number of vertices.
Remove a vertex.
Color the smaller graph.
Extend the coloring back.
```

This proves the Five Color Theorem but not directly the Four Color Theorem. For four colors, degree-5 vertices are the obstruction. A planar graph always has a vertex of degree at most 5, but “at most 5” is not enough for simple four-color induction.

| Induction step           | Five colors              | Four colors                                                                             |
| ------------------------ | ------------------------ | --------------------------------------------------------------------------------------- |
| Remove low-degree vertex | Works because degree ≤ 5 | Degree 5 is problematic                                                                 |
| Color smaller graph      | By induction             | By induction                                                                            |
| Extend coloring          | Easy with 5 colors       | May fail with 4 colors if five neighbors use all four colors in obstructive arrangement |
| Need stronger method?    | Usually no               | Yes: configurations, reducibility, discharging                                          |

Kempe chains help in the five-color proof and historically influenced the four-color problem, but the four-color theorem requires a much more elaborate reducibility/unavoidability framework.

### D.12 What “reducible” means operationally

To say a configuration is reducible is not just to say “it looks harmless.” It means there is a verified transformation argument.

A schematic reducibility proof has these moving parts:

| Component                       | Role                                         |
| ------------------------------- | -------------------------------------------- |
| Boundary coloring               | Coloring of the outside/reduced graph        |
| Interior extension              | Show the inside can be colored consistently  |
| Case split over boundary colors | Finite but often large                       |
| Search/checking procedure       | Automates boundary-color cases               |
| Correctness theorem             | If checker succeeds, extension exists        |
| Minimality contradiction        | Reduced graph’s coloring extends to original |

In Rocq-style terms, a reducibility checker might be abstracted as:

```coq
checker C = true -> reducible C
```

That theorem is the critical bridge.

Without the theorem, `checker C = true` is just a computation. With the theorem, it becomes proof evidence usable in the main argument.

This is exactly the pattern from earlier appendices:

| Mini-project pattern           | Four-color analogue                                           |
| ------------------------------ | ------------------------------------------------------------- |
| `evalR_sound`                  | Computed result agrees with specification                     |
| `is_empty_sound`               | Boolean checker implies proposition                           |
| `fold_constants_correct`       | Computed transformation preserves semantics                   |
| reducibility checker soundness | Computed reducibility check implies mathematical reducibility |

### D.13 What “unavoidable” means operationally

Unavoidability is not merely a list of patterns. It is a theorem that every minimal counterexample must contain one.

A discharging-based unavoidable proof has these components:

| Component             | Role                                                   |
| --------------------- | ------------------------------------------------------ |
| Initial charge        | Assign charge from degree/structure                    |
| Global positive total | Euler formula ensures positive total                   |
| Discharge rules       | Move charge locally                                    |
| Charge preservation   | Total remains positive                                 |
| Final positive site   | Some local area must keep positive charge              |
| Local analysis        | Positive final charge implies one listed configuration |
| Conclusion            | Some configuration in `U` appears                      |

A schematic unavoidable checker/proof might have the form:

```coq
discharge_rules_valid rules ->
rules_force_configurations rules U ->
unavoidable U
```

Again, the exact formalization is much more complex, but the proof type is familiar:

```coq
computed_certificate = true -> mathematical_property
```

or:

```coq
formal_derivation_of_discharge_rules -> unavoidable U
```

### D.14 Why hypermaps appear

A planar drawing is geometrically intuitive but hard to manipulate directly in a proof assistant. A **combinatorial hypermap** is a finite discrete structure that can encode the incidence relations among vertices, edges, and faces. It lets the proof reason combinatorially rather than through arbitrary geometric drawings.

The `fourcolor` repository explicitly says the formalization includes a theory of combinatorial hypermaps. 

| Representation                | Benefit                          | Cost                                   |
| ----------------------------- | -------------------------------- | -------------------------------------- |
| Plane map/topological regions | Matches informal theorem         | Hard to formalize directly             |
| Planar graph                  | Familiar graph-theoretic form    | Still needs embedding/topology details |
| Combinatorial hypermap        | Finite, discrete, proof-friendly | Requires bridge to topological maps    |
| Hypermap coloring theorem     | Main combinatorial core          | Needs translation theorem back to maps |

The Rocq proof architecture therefore separates:

```text
topological theorem
    |
    | discretization / finitzation bridge
    v
combinatorial hypermap theorem
    |
    | reducibility + unavoidability
    v
finite checked proof core
```

This is a classic proof-engineering move: replace hard-to-check geometric intuition with a discrete structure plus bridge lemmas.

### D.15 Why the Rocq formalization is philosophically important

The original Appel–Haken proof was controversial partly because it relied on extensive computer checking that humans could not practically verify line by line. The Rocq formalization changes the trust model.

A rough contrast:

| Proof style                        | Trust burden                                                                 |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| Informal hand proof                | Trust human reasoning and peer review                                        |
| Historical computer-assisted proof | Trust mathematical argument plus programs plus hardware plus output checking |
| Rocq formalization                 | Trust definitions, assumptions, and Rocq kernel checking of proof terms      |
| Extracted/verified checkers        | Trust source theorem plus extraction/runtime boundaries if used              |

Rocq does not eliminate all trust. It relocates and clarifies trust.

| Still trusted or reviewed | Why                                         |
| ------------------------- | ------------------------------------------- |
| Rocq kernel               | Checks proof terms                          |
| Formal definitions        | Must match intended theorem                 |
| Assumptions               | Must be audited                             |
| Library dependencies      | Must be trusted/checked                     |
| Hardware/runtime/build    | Practical environment                       |
| Human interpretation      | Does formal theorem match informal theorem? |

But it removes a major ambiguity: the long finite case analysis can be represented in a form where the final theorem is checked by a small trusted kernel rather than accepted as a collection of unreviewable outputs.

The Rocq homepage describes Rocq’s core as a well-delimited kernel giving high guarantees for mechanized artifacts, and it lists the Four-Color theorem among flagship Rocq developments using Mathematical Components. 

### D.16 What the formal theorem actually looks like at the top

The Rocq homepage excerpt shows a theorem shape like this:

```coq
Theorem four_color_finite m :
  finite_simple_map m -> colorable_with 4 m.
```

and then:

```coq
Theorem four_color m :
  simple_map m -> colorable_with 4 m.
```

The displayed proof outline is conceptually:

1. assume a finite simple map `m`;
2. discretize it into a hypermap `G`;
3. obtain a bridge from hypermap four-colorability back to map colorability;
4. invoke the combinatorial theorem for planar bridgeless hypermaps;
5. conclude the original map is colorable with 4 colors. 

This is not the whole proof. It is the top-level assembly.

| Top-level theorem           | Depends on                                          |
| --------------------------- | --------------------------------------------------- |
| `four_color_finite`         | discretization + hypermap theorem                   |
| `four_color`                | compactness/finitization extension + finite theorem |
| hypermap theorem            | reducibility + unavoidability                       |
| reducibility/unavoidability | large formal combinatorial development              |

**Rocq lesson:** Big theorems often have short top-level proofs because the work has been pushed into named lemmas and modules.

### D.17 How to read this proof as a Rocq learner

Do not try to learn the Four Color Theorem formalization by opening the largest theorem first and reading downward. Instead, read the architecture.

| Reading level                  | What to ask                                                          |
| ------------------------------ | -------------------------------------------------------------------- |
| Final theorem                  | What exactly is stated?                                              |
| Bridge theorem                 | How is the topological object converted into a combinatorial object? |
| Main combinatorial theorem     | What finite structure is being colored?                              |
| Reducibility section           | How are configurations represented and checked?                      |
| Discharging section            | How is unavoidability proved?                                        |
| Boolean/computational checkers | What theorem connects computation to `Prop`?                         |
| Assumptions                    | What real-number/topology/classical assumptions are used?            |
| Build/library dependencies     | What external infrastructure is required?                            |

A realistic learning path is:

1. Learn graph coloring definitions.
2. Learn planar graphs and Euler formula.
3. Learn the Five Color Theorem.
4. Learn minimal counterexample reasoning.
5. Learn reducibility and Kempe-chain intuition.
6. Learn discharging on simple examples.
7. Learn finite configuration checking as a boolean/propositional bridge.
8. Learn hypermaps as a combinatorial encoding.
9. Only then read the formal `fourcolor` library architecture.

### D.18 A small discharging toy example

Before attempting the Four Color Theorem, learn discharging on a simpler planar graph fact.

A classic consequence of Euler’s formula is:

> Every finite planar graph has a vertex of degree at most 5.

For a triangulated planar graph, one can derive an average-degree bound below 6. Therefore not all vertices can have degree at least 6.

A schematic proof:

```text
Assume every vertex has degree ≥ 6.
Then sum of degrees ≥ 6V.
For a planar triangulation, 3F = 2E.
Euler: V - E + F = 2.
From these, E = 3V - 6.
So sum of degrees = 2E = 6V - 12.
But if every degree ≥ 6, sum of degrees ≥ 6V.
Contradiction: 6V ≤ 6V - 12.
```

This is the baby version of the charge idea.

| Four-color discharging        | Toy average-degree proof       |
| ----------------------------- | ------------------------------ |
| Complex local charge rules    | Simple global degree count     |
| Many configurations           | One conclusion: degree ≤ 5     |
| Large finite case analysis    | Short arithmetic contradiction |
| Configuration unavoidable set | Low-degree vertex unavoidable  |

**Learning value:** The toy proof shows why Euler’s formula forces local structure. The Four Color Theorem uses a much more refined version of the same pressure.

### D.19 From toy discharging to unavoidable configurations

The toy proof gives:

```text
Every planar graph has a vertex of degree ≤ 5.
```

For five-coloring, this is enough. For four-coloring, it is not.

So the strategy refines the conclusion:

```text
Every minimal counterexample contains one of many special local configurations.
```

The discharging rules become more elaborate so that “positive charge remains somewhere” implies not merely “some vertex has degree ≤ 5,” but “one of these carefully designed reducible configurations occurs.”

| Simple theorem                         | Four-color theorem                             |
| -------------------------------------- | ---------------------------------------------- |
| Unavoidable set: `{degree ≤ 5 vertex}` | Large unavoidable set of configurations        |
| Reducibility easy for degree ≤ 4       | Reducibility difficult for many configurations |
| Human-checkable                        | Needs extensive computation/formal checking    |
| Short proof                            | Large proof architecture                       |

This is why the theorem is historically special: the proof turns an infinite problem into a finite but enormous structured verification problem.

### D.20 Where the next output will continue

The continuation will cover:

| Remaining topic                                                             |
| --------------------------------------------------------------------------- |
| a clearer explanation of reducibility checking as `bool -> Prop` reflection |
| how small-scale reflection enters the Rocq proof style                      |
| what `fourcolor` relies on from Mathematical Components                     |
| a more explicit abstract Rocq skeleton for checkers and certificates        |
| why “computer-assisted” is not the same as “untrusted computation”          |
| the exact trust-boundary checklist for the Four Color Theorem               |
| a learner’s roadmap and exercise set                                        |
| final summary of Appendix D                                                 |

### D.21 Reducibility checking as a `bool -> Prop` bridge

The most important proof-assistant idea in the Four Color Theorem formalization is not merely “a computer checked many cases.” The deeper idea is:

> A computable checker can be used inside a proof only when there is a theorem connecting the checker’s boolean result to the mathematical proposition needed by the proof.

This is the same pattern seen throughout this guide.

A toy version:

```coq
Parameter Config : Type.

Parameter reducible : Config -> Prop.
Parameter check_reducible : Config -> bool.

Axiom check_reducible_sound :
  forall C : Config,
    check_reducible C = true -> reducible C.
```

The boolean `check_reducible C` is executable. The proposition `reducible C` is the mathematical fact. The theorem `check_reducible_sound` is the bridge.

With that bridge, a finite list of configurations can be certified by computation:

```coq
Parameter InU : Config -> Prop.

Parameter all_configs_checked :
  forall C : Config,
    InU C -> check_reducible C = true.

Theorem all_configs_reducible :
  forall C : Config,
    InU C -> reducible C.
Proof.
  intros C HC.
  apply check_reducible_sound.
  apply all_configs_checked.
  exact HC.
Qed.
```

This schematic proof shows the key structure. The checker does not become trusted by magic. Its soundness theorem is what lets a boolean computation produce a mathematical conclusion.

In the real Four Color Theorem proof, this idea is far more elaborate. Configurations, colorings, rings, reducibility tests, and discharge certificates are encoded with enough precision that the finite checking can be reflected into formal proof. The `fourcolor` library description confirms that the formal proof includes the supporting combinatorial hypermap theory and is based on Mathematical Components. 

### D.22 Reflection: why computation can discharge proof goals

The Four Color Theorem formalization is historically connected with the rise of *small-scale reflection*, a style strongly associated with Mathematical Components and `ssreflect`.

The central reflection pattern is:

| Ordinary proof style                  | Reflective proof style                                     |
| ------------------------------------- | ---------------------------------------------------------- |
| Prove proposition directly by tactics | Compute a boolean decision procedure                       |
| Many symbolic cases                   | Normalize or check by computation                          |
| Human performs case reasoning         | Certified computation performs finite reasoning            |
| Need bridge theorem                   | Need bridge theorem too, but once proved, reuse it heavily |

A simplified reflection theorem looks like:

```coq
Parameter P : Config -> Prop.
Parameter testP : Config -> bool.

Axiom reflectP :
  forall C : Config,
    testP C = true <-> P C.
```

Then the proof of `P C` can proceed by computation:

```coq
Theorem prove_P_by_computation :
  forall C : Config,
    testP C = true -> P C.
Proof.
  intros C H.
  apply reflectP.
  exact H.
Qed.
```

In serious developments, the checker is not a toy. It may analyze finite graphs, colorings, reducibility witnesses, or discharge rules. But the logical shape is the same:

```text
computation succeeds
+ soundness/reflection theorem
= proposition established
```

**Rocq lesson:** Reflection is not “trust the computation.” It is “prove that the computation is a correct decision or verification procedure, then use computation to close many finite cases.”

### D.23 Mathematical Components and `ssreflect` in the Four Color proof

The current `fourcolor` package description says the formal proof is based on the Mathematical Components library and depends on MathComp `ssreflect`, MathComp algebra, and Hierarchy Builder in current package metadata. 

That matters because the proof style is not plain vanilla `Stdlib` style. It uses a proof culture designed around:

| MathComp / `ssreflect` feature             | Why it matters                                    |
| ------------------------------------------ | ------------------------------------------------- |
| Small-scale reflection                     | Connects boolean computation to propositions      |
| Finite types                               | Supports exhaustive finite reasoning              |
| Canonical structures / algebraic hierarchy | Organizes reusable structures                     |
| Compact tactical language                  | Makes structured proofs concise                   |
| Boolean predicates                         | Encourages computable specifications where useful |
| Rewriting discipline                       | Supports controlled equational reasoning          |

A learner who only knows basic `intros`, `destruct`, `induction`, and `rewrite` can understand the architecture, but reading the actual formalization requires additional familiarity with MathComp idioms.

| Before reading actual `fourcolor` code | Learn                                            |
| -------------------------------------- | ------------------------------------------------ |
| Basic Rocq proof mode                  | `intros`, `apply`, `rewrite`, `induction`        |
| Boolean/proposition bridge             | soundness/completeness, reflection               |
| Finite types                           | finite enumeration and decidable equality        |
| `ssreflect` proof language             | compact intro patterns, views, reflection        |
| MathComp library conventions           | `eqType`, finite structures, canonical inference |
| Hypermaps                              | combinatorial representation of planar maps      |

**Professional caveat:** Do not judge the actual `fourcolor` code by `Stdlib` proof-script expectations. It belongs to a MathComp/`ssreflect` proof culture.

### D.24 A more explicit abstract checker/certificate skeleton

There are two common ways to connect computation to proof in a large checked theorem.

| Method              | Shape                                                                    | Trust profile                              |
| ------------------- | ------------------------------------------------------------------------ | ------------------------------------------ |
| Decision procedure  | Compute `check x = true`                                                 | Need theorem `check x = true -> P x`       |
| Certificate checker | External or generated certificate `cert`; compute `verify cert x = true` | Need theorem `verify cert x = true -> P x` |

A certificate-based skeleton:

```coq
Parameter Config Certificate : Type.

Parameter reducible : Config -> Prop.
Parameter verify_reducible : Certificate -> Config -> bool.

Axiom verify_reducible_sound :
  forall (cert : Certificate) (C : Config),
    verify_reducible cert C = true ->
    reducible C.
```

If each configuration has a certificate:

```coq
Parameter cert_of : Config -> Certificate.
Parameter InU : Config -> Prop.

Parameter all_certificates_verify :
  forall C : Config,
    InU C ->
    verify_reducible (cert_of C) C = true.

Theorem all_reducible_by_certificates :
  forall C : Config,
    InU C ->
    reducible C.
Proof.
  intros C HC.
  apply (verify_reducible_sound (cert_of C)).
  apply all_certificates_verify.
  exact HC.
Qed.
```

This illustrates a common proof-engineering pattern in computer-assisted formal proofs:

| Object                    | Role                                                          |
| ------------------------- | ------------------------------------------------------------- |
| `Config`                  | Mathematical object to certify                                |
| `Certificate`             | Compact evidence for a finite check                           |
| `verify_reducible`        | Computable verifier                                           |
| `verify_reducible_sound`  | Mathematical correctness theorem for verifier                 |
| `all_certificates_verify` | Finite computation/certificate database check                 |
| final theorem             | Uses soundness to turn checked certificates into propositions |

This is more robust than trusting an external program’s printed result. The trusted theorem is not “the external program says yes.” The trusted theorem is “Rocq checked that this verifier’s success implies the proposition.”

### D.25 Why “computer-assisted” is not the same as “untrusted computation”

A common misconception is:

> The Four Color Theorem is less trustworthy because a computer was used.

That objection is too coarse. The relevant question is: **what exactly is trusted about the computer?**

| Proof model                                    | What is trusted                                                                       |
| ---------------------------------------------- | ------------------------------------------------------------------------------------- |
| Hand proof                                     | Human reasoning, peer review, notation, omitted steps                                 |
| Historical computer-assisted proof             | Mathematical reduction, program correctness, machine execution, output interpretation |
| Formalized proof with checked computation      | Formal definitions, checker soundness theorems, kernel checking, assumptions          |
| Certified checker/certificate style            | Verifier theorem plus checked certificate result                                      |
| Fully external computation with no certificate | External program and output are trusted more heavily                                  |

The Rocq formalization reduces the need to trust an informal description of case checking. It still requires trust in the Rocq kernel, formal definitions, libraries, and build environment. But that is a much clearer trust boundary.

The `fourcolor` package is maintained as a formal library, and the package metadata describes it as a mechanization of the Four Color Theorem in Coq/Rocq, with dependencies and namespace information exposed. 

**Key distinction:**

```text
Untrusted use of computation:
  "Program says all cases pass."

Formalized use of computation:
  "Rocq proves that if this checker returns true, the proposition follows;
   Rocq checks that the checker returns true on the finite data."
```

### D.26 Trust-boundary checklist for the Four Color Theorem

A professional reading of the formal proof should ask:

| Boundary                           | Question                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| Statement boundary                 | Does the formal theorem match the intended Four Color Theorem?               |
| Representation boundary            | How are maps, colorings, and planarity represented?                          |
| Topology-to-combinatorics boundary | How does a plane map become a hypermap?                                      |
| Reducibility boundary              | What theorem says a successful reducibility check implies reducibility?      |
| Discharging boundary               | What theorem says the discharge rules imply unavoidability?                  |
| Finite enumeration boundary        | How is the configuration set represented and checked?                        |
| Library boundary                   | Which MathComp and fourcolor theories are used?                              |
| Assumption boundary                | What axioms or classical principles are used?                                |
| Kernel boundary                    | What does Rocq’s kernel check?                                               |
| Build boundary                     | Is the package version and environment reproducible?                         |
| Human interpretation boundary      | Does the formal object correspond to the informal theorem people care about? |

This is the same four-question framework from PART 10:

| Question                                | Four Color version                                              |
| --------------------------------------- | --------------------------------------------------------------- |
| What exactly is stated?                 | `simple_map m -> colorable_with 4 m`, or related formal theorem |
| What assumptions are used?              | Real-number/topology/classical/library assumptions              |
| What proof/computation boundary exists? | Boolean checkers, reflection, reducibility certificates         |
| What lies outside Rocq?                 | Kernel implementation, hardware, human adequacy judgment        |

### D.27 The role of real numbers and topology

A learner might wonder: if the core proof is combinatorial, why does the `fourcolor` library include real numbers and topology?

Because the informal theorem is about plane maps. To state and prove that topological maps can be colored, the development needs formal notions of:

| Concept        | Why it matters                            |
| -------------- | ----------------------------------------- |
| plane          | Maps live in the plane                    |
| regions        | Countries/faces are topological objects   |
| adjacency      | Must define when regions share a boundary |
| simple maps    | Restricts pathological cases              |
| finiteness     | Connects to finite combinatorics          |
| discretization | Converts topological maps to hypermaps    |

The `fourcolor` repository description explicitly mentions an axiomatization of classical real numbers and basic plane topology definitions, in addition to combinatorial hypermaps. 

**Rocq lesson:** A theorem’s “obvious” informal statement may require large foundational infrastructure to state precisely.

### D.28 The role of hypermaps, again but more concretely

A hypermap can be understood as a finite combinatorial encoding of incidence structure. Instead of reasoning directly about drawn curves in the plane, the proof manipulates finite data.

| Plane-map concept   | Hypermap/combinatorial analogue    |
| ------------------- | ---------------------------------- |
| Region/face         | Combinatorial face orbit           |
| Edge boundary       | Incidence relation                 |
| Vertex              | Combinatorial vertex orbit         |
| Embedding condition | Planarity property                 |
| Map coloring        | Coloring compatible with adjacency |
| Local configuration | Finite pattern in hypermap         |

The exact hypermap definitions are technical, but the proof-engineering reason is simple:

> Hypermaps turn geometric topology into finite combinatorial data that can support induction, finite checking, and reflection.

A later package in the Rocq ecosystem, `coq-graph-theory-planar`, explicitly says it relies on hypermaps and other notions developed as part of the Coq proof of the Four-Color Theorem. This shows that the hypermap infrastructure became reusable beyond the original proof. 

### D.29 How reducibility and unavoidability combine in a formal proof

At a high level, the final contradiction is very short once the two big components are available.

Pseudo-Rocq:

```coq
Section FinalContradiction.

  Parameter Map Config : Type.

  Parameter minimal_bad : Map -> Prop.
  Parameter contains : Map -> Config -> Prop.
  Parameter in_unavoidable_set : Config -> Prop.

  Hypothesis unavoidable :
    forall M : Map,
      minimal_bad M ->
      exists C : Config,
        in_unavoidable_set C /\ contains M C.

  Hypothesis reducible_configs :
    forall (C : Config) (M : Map),
      in_unavoidable_set C ->
      minimal_bad M ->
      contains M C ->
      False.

  Theorem no_minimal_bad :
    forall M : Map,
      minimal_bad M -> False.
  Proof.
    intros M Hbad.
    destruct (unavoidable M Hbad) as [C [HC HCcontains]].
    apply (reducible_configs C M).
    - exact HC.
    - exact Hbad.
    - exact HCcontains.
  Qed.

End FinalContradiction.
```

This is why the top-level proof of a large theorem may look deceptively short. The real work is in proving the hypotheses:

```text
unavoidable
reducible_configs
```

A mature proof development makes those hypotheses into named theorems and uses them cleanly at the end.

### D.30 What the Four Color formalization teaches about theorem naming

A large proof needs theorem names that reveal the architecture.

Good theorem names would express:

| Theorem role                   | Name style                  |
| ------------------------------ | --------------------------- |
| finite topological theorem     | `four_color_finite`         |
| general topological theorem    | `four_color`                |
| hypermap combinatorial theorem | `four_color_hypermap`       |
| reducibility checker soundness | `check_reducible_sound`     |
| unavoidability theorem         | `unavoidable_configs`       |
| discharge correctness          | `discharge_rules_sound`     |
| discretization bridge          | `map_to_hypermap_colorable` |

The Rocq homepage excerpt uses names such as `four_color_finite`, `four_color_hypermap`, and `four_color`, which are informative at the theorem-assembly level. 

**Professional lesson:** In huge formal developments, theorem names are navigation tools. Bad names make the proof unlearnable.

### D.31 A realistic learning route

The Four Color Theorem is not an entry-level Rocq proof. A realistic route looks like this:

| Stage | Goal                            | Suggested exercises                                                |
| ----- | ------------------------------- | ------------------------------------------------------------------ |
| 1     | Basic graph coloring            | Define finite graph and proper coloring                            |
| 2     | Simple colorability proofs      | Prove paths/cycles are 2- or 3-colorable                           |
| 3     | Planar graph basics             | State Euler formula and degree bound                               |
| 4     | Five Color Theorem              | Learn minimal counterexample + Kempe-chain style reasoning         |
| 5     | Discharging toy proofs          | Prove low-degree vertex existence by charge                        |
| 6     | Reducibility toy configurations | Define small reducible patterns                                    |
| 7     | Boolean checkers                | Write `check_config : Config -> bool` and prove soundness          |
| 8     | Reflection                      | Use computation to solve finite cases                              |
| 9     | Finite enumeration              | Prove all elements of a finite list satisfy a property via checker |
| 10    | Hypermaps                       | Learn combinatorial encoding of maps                               |
| 11    | MathComp/`ssreflect`            | Read finite-type and reflection-heavy code                         |
| 12    | `fourcolor` architecture        | Trace top-level theorem dependencies                               |

Trying to start directly from the full formalization is usually inefficient. The proof combines too many advanced topics.

### D.32 Toy exercise: finite reducibility list

A good mini-exercise is to formalize the abstract skeleton with a finite list.

Pseudo-development:

```coq
From Stdlib Require Import List Bool.
Import ListNotations.

Parameter Config : Type.
Parameter eqb_config : Config -> Config -> bool.
Parameter reducible : Config -> Prop.
Parameter check_reducible : Config -> bool.

Parameter check_reducible_sound :
  forall C, check_reducible C = true -> reducible C.

Definition all_checked (cs : list Config) : bool :=
  forallb check_reducible cs.
```

Then prove a theorem shape like:

```coq
(* Schematic:
Theorem all_checked_sound :
  forall cs C,
    all_checked cs = true ->
    In C cs ->
    reducible C.
*)
```

This exercise teaches the exact skill needed for understanding finite case checking:

| Skill                      | Four-color analogue                   |
| -------------------------- | ------------------------------------- |
| `forallb` over finite list | checking many configurations          |
| `check_reducible_sound`    | checker-to-proposition bridge         |
| `In C cs`                  | membership in unavoidable set         |
| `reducible C`              | mathematical property needed in proof |

This is not the Four Color Theorem, but it is a correct local training target.

### D.33 Toy exercise: abstract unavoidability + reducibility contradiction

Another exercise is to prove the final logical skeleton:

```coq
Section UnavoidableReducibleToy.

  Variable Map Config : Type.
  Variable bad : Map -> Prop.
  Variable contains : Map -> Config -> Prop.
  Variable U : Config -> Prop.

  Hypothesis unavoidable :
    forall M, bad M -> exists C, U C /\ contains M C.

  Hypothesis reducible :
    forall M C, bad M -> U C -> contains M C -> False.

  Theorem no_bad :
    forall M, bad M -> False.
  Proof.
    intros M HM.
    destruct (unavoidable M HM) as [C [HUC Hcontains]].
    exact (reducible M C HM HUC Hcontains).
  Qed.

End UnavoidableReducibleToy.
```

This proof is short. That is the point. Once the huge mathematical ingredients are packaged, the final contradiction is elementary.

### D.34 Why the theorem still matters philosophically

The Four Color Theorem was historically important because it challenged older views of mathematical proof. A proof that requires a large computation raises questions:

| Philosophical question                             | Rocq-style answer                                              |
| -------------------------------------------------- | -------------------------------------------------------------- |
| Must every proof be human-surveyable line by line? | Formal proof can make non-surveyable case analysis checkable   |
| Can computation be part of proof?                  | Yes, if connected to propositions by verified soundness        |
| What is trusted?                                   | Definitions, assumptions, kernel, libraries, build environment |
| Does a proof assistant remove all human judgment?  | No; formal statement adequacy remains human-reviewed           |
| Is the proof less mathematical?                    | It changes proof practice, but not necessarily rigor           |

The theorem’s formalization is therefore a case study in modern proof epistemology: rigorous proof can involve computation, but the computation must be placed inside a disciplined proof architecture.

### D.35 Common misconceptions about the Four Color proof

| Misconception                                       | Correction                                                                                 |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| The theorem was proved by brute force alone         | The proof combines structural graph theory, discharging, reducibility, and finite checking |
| The computer just tried all maps                    | The proof reduces infinite possibilities to a finite unavoidable set of configurations     |
| The Rocq proof trusts the old program blindly       | The formalization checks mathematical and computational links inside Coq/Rocq              |
| Discharging colors the graph                        | Discharging proves local configurations are unavoidable                                    |
| Reducibility means the configuration is rare        | Reducibility means it cannot occur in a minimal counterexample                             |
| Hypermaps are an optional detail                    | They are central to the formal combinatorial representation                                |
| The final theorem is just one short proof           | The short top-level theorem depends on a large library of definitions and lemmas           |
| Computer-assisted means untrusted                   | Trust depends on whether computation is certified or merely external                       |
| Four-color formalization is a good beginner project | It is an advanced case study, not a first formalization target                             |

### D.36 What one appendix can and cannot teach

This appendix can teach:

| Can teach                             | Cannot fully teach                         |
| ------------------------------------- | ------------------------------------------ |
| The proof architecture                | Every configuration in the unavoidable set |
| The reducibility/unavoidability split | Full reducibility machinery                |
| Why discharging is used               | All discharge rule verification            |
| Why hypermaps are useful              | Complete hypermap theory                   |
| Why reflection matters                | Full MathComp formalization style          |
| How Rocq changes the trust boundary   | The entire `fourcolor` development         |
| How to prepare for reading the proof  | Complete graph theory background           |

The full formal proof is a research-grade development. This appendix is a map.

### D.37 How this appendix connects to the rest of the guide

| Earlier part | Four-color connection                                        |
| ------------ | ------------------------------------------------------------ |
| PART 1       | Rocq as proof assistant, not ordinary programming language   |
| PART 2       | Syntax layers and theorem statements                         |
| PART 3       | `Prop`/`bool`, relations, inductive predicates               |
| PART 4       | Induction, rewriting, helper lemmas, proof construction      |
| PART 5       | Modules, assumptions, trust boundaries                       |
| PART 6       | External libraries, MathComp, package ecosystem              |
| PART 7       | Kernel checking, computation, extraction/erasure, reflection |
| PART 8       | Historical importance and computer-assisted proof trend      |
| PART 9       | Large-project workflow and reproducibility                   |
| PART 10      | Decision tables, misconception index, trust audit            |
| Appendix A   | Quick reference for tactics and diagnostics                  |
| Appendix B   | Mini verified evaluator as a small analogue                  |
| Appendix C   | Error-repair patterns useful in reading large proofs         |

The Four Color Theorem is not an isolated example. It is a stress test for nearly every serious Rocq concept.

### D.38 Final architecture diagram

The proof can be summarized as:

```text
Topological Four Color Theorem
        |
        | formal topology + finite/simple map reduction
        v
Finite simple map coloring theorem
        |
        | discretization into combinatorial hypermap
        v
Four Color Theorem for planar bridgeless hypermaps
        |
        | minimal counterexample
        v
No minimal counterexample
        |
        | unavoidability + reducibility
        v
Finite unavoidable set of reducible configurations
        |
        | discharging proves unavoidable
        | checkers/certificates prove reducible
        v
Machine-checked finite combinatorial proof core
```

Or as a logical chain:

```text
discharging theorem
  => unavoidable(U)

reducibility checking theorem
  => forall C in U, reducible(C)

unavoidable(U) + all_reducible(U)
  => no minimal counterexample

no minimal counterexample
  => hypermap four-color theorem

hypermap four-color theorem + discretization bridge
  => finite map four-color theorem

finite theorem + compactness/finitization argument
  => general map four-color theorem
```

### D.39 Final trust-boundary summary

| Claim                                          | Trust basis                                                |
| ---------------------------------------------- | ---------------------------------------------------------- |
| Configurations are reducible                   | Reducibility checkers/certificates plus soundness theorems |
| Configurations are unavoidable                 | Discharging proof formalized in Rocq                       |
| No minimal counterexample exists               | Logical combination of unavoidability and reducibility     |
| Hypermap theorem holds                         | Formal combinatorial proof                                 |
| Map theorem follows                            | Bridge from topological maps to hypermaps                  |
| General theorem follows                        | Extension from finite/simple setting as formalized         |
| The proof is checked                           | Rocq kernel checking under listed assumptions              |
| The theorem means the intended informal result | Adequacy of formal definitions and bridges                 |

### D.40 Final learning summary

The Four Color Theorem proof is best understood through three slogans:

| Slogan                                                  | Meaning                                                                          |
| ------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Minimal counterexamples must contain something.**     | Discharging proves an unavoidable set of local configurations                    |
| **But everything they must contain is impossible.**     | Reducibility proves each configuration cannot occur in a minimal counterexample  |
| **Computation is used only through certified bridges.** | Boolean/certificate checks become propositions via soundness/reflection theorems |

In Rocq terms, the proof is an advanced demonstration of:

```text
finite computation
+ reflection/soundness
+ combinatorial representation
+ topology-to-combinatorics bridge
+ kernel-checked proof terms
= formal proof of a historically difficult theorem
```

The final professional lesson is:

> The Four Color Theorem is not a proof that “computers can replace proof.” It is a proof that computation can become part of rigorous mathematics when the computational steps are specified, checked, and connected to propositions inside a trusted proof architecture.

