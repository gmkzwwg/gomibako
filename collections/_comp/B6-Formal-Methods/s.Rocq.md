---
title: Rocq - Quick Reference
abbreviation: Rocq
categories: Sheet
subclass: Formal Methods
---

## PART 1 — Language Identity, Design Philosophy, and Problem Space

### Environment and Version Assumptions — Rocq 9.x, Rocq Platform, Stdlib/Corelib, tooling baseline

**Density strategy:** adaptive — Rocq requires deep treatment of proof terms, dependent types, constructive logic, inductive definitions, tactics, kernel checking, proof maintenance, and certified extraction; ordinary programming-language topics such as runtime memory or concurrency matter mainly through extraction, plugins, tooling, and proof-engineering cost.

This guide targets two practical baselines. First, it targets the current Rocq Prover 9.x line, using Rocq Prover `9.2.0` as the current standalone prover/language baseline. The official Rocq site lists `9.2.0` as the latest Rocq Prover release. Second, it treats Rocq Platform `2025.08.3` as the current curated platform baseline, while keeping explicit that Platform releases package a coherent set of libraries/plugins and may target an older prover line than the newest prover release. ([Rocq][1])

Rocq 9.0 is historically important because it marks the completed rename from *The Coq Proof Assistant* to *The Rocq Prover*. Rocq 9.0 also introduced the new single `rocq` command-dispatching interface and split the former `Coq` standard library structure into `Corelib` and `Stdlib` packages. This matters because many documents, packages, theorems, build files, and tutorials still use Coq-era names. ([Rocq][2])

| Assumption                   | Practical meaning                      | Consequence for this guide                                                                         | Caveat                                                           |
| ---------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Rocq Prover `9.2.0`          | Current standalone prover baseline     | Syntax, command names, reference-manual framing, and modern naming use Rocq terminology            | Legacy Coq commands and names still appear in older developments |
| Rocq Platform `2025.08.3`    | Curated library/plugin distribution    | Ecosystem guidance distinguishes prover core from platform packages                                | Platform compatibility may lag newest prover release             |
| `rocq` command family        | Modern command-line entry point        | Workflow sections should prefer `rocq`-era terminology                                             | Legacy `coqc`, `coqtop`, `coqdoc` names remain common            |
| `Corelib` and `Stdlib` split | Library organization changed in Rocq 9 | Standard-library guidance must distinguish minimal core from broader standard library              | Older code often imports from `Coq.*` paths                      |
| Coq-era ecosystem continuity | Rocq inherits a long Coq history       | Historical and transfer-map sections must mention Coq compatibility, naming, and library migration | Do not treat Rocq as a completely new proof assistant            |

**Common Pitfalls:** Treating “Rocq” and “Coq” as unrelated systems is wrong; treating Rocq 9.x as merely a cosmetic rename is also wrong. The rename coincides with concrete command-line and library-organization changes.

### What Rocq Is — proof assistant, dependently typed language, proof environment, verified-programming system

Rocq is an interactive theorem prover, or proof assistant. It is designed for formalizing mathematical concepts and interactively generating machine-checked proofs. The official reference manual emphasizes that machine checking gives higher confidence than ordinary human-checked proofs, and the official homepage describes Rocq as a trustworthy, industrial-strength interactive theorem prover and dependently typed programming language. ([Rocq][3])

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

The official homepage explicitly notes that Rocq can extract executable programs from specifications as OCaml or Haskell source code. That makes Rocq relevant to verified programming, but extraction is not the same as whole-system verification. External runtimes, foreign libraries, I/O, compiler behavior, deployment, and environment assumptions remain outside the kernel’s direct guarantee. ([Rocq][1])

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

Rocq has been used in major verification and formalization projects. The official reference manual names the CompCert verified C compiler and the verification of the four-color theorem as flagship examples. These examples reveal Rocq’s main value proposition: it is suited to artifacts where the cost of formalization is justified by the value of high assurance. ([Rocq][3])

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

The official reference manual describes proof construction as entering a series of tactics, with both elementary tactics and complex decision procedures such as `lia`; it also identifies `Ltac` and `Ltac2` as tactic languages for defining new tactics. This means Rocq’s “language personality” includes at least three layers: the term/specification language, the vernacular command language, and the tactic language. ([Rocq][3])

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

Rocq’s roadmap emphasizes both trustworthiness and usability: it points to self-verification, installation/accessibility, documentation, IDE improvements, metaprogramming platforms such as `Ltac2`, `Elpi`, and `MetaCoq`, and improved notation/structuring mechanisms. This current direction matters because Rocq’s challenge is not only logical expressiveness; it is making large formal developments maintainable and usable. ([Rocq][4])

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

Rocq’s ecosystem is layered. The prover core is not the same as the standard library, and the standard library is not the same as the Platform. The Platform is explicitly described as a distribution that combines the Rocq Prover with selected libraries and plugins, aiming to be dependable, easy to install, comprehensive, and operating-system independent. ([Rocq][5])

| Ecosystem layer       | Role                                         | Practical use                                                              | Risk                                                      |
| --------------------- | -------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------- |
| Kernel/prover core    | Trusted checking and core language machinery | Accepts or rejects terms/proofs                                            | Misunderstanding what the kernel actually guarantees      |
| `Corelib`             | Minimal core library infrastructure          | Basic support and tactic infrastructure                                    | Assuming it includes the full historical standard library |
| `Stdlib`              | Standard definitions and theorems            | `Nat`, `List`, `Bool`, arithmetic, common lemmas                           | Notation and naming can be dense                          |
| Rocq Platform         | Curated package distribution                 | Stable teaching/development setup                                          | May lag newest prover version                             |
| External libraries    | Domain-specific formalization and automation | MathComp, Iris-like domain libraries, Equations-like tools when compatible | Version and convention mismatch                           |
| Tooling               | Editors, LSP, build systems, documentation   | Interactive development and CI                                             | Tool configuration can dominate project setup             |
| Community conventions | Naming, proof style, automation discipline   | Readability and maintainability                                            | Different libraries use different proof cultures          |

The roadmap explicitly identifies usability, documentation, IDE improvements, metaprogramming platforms, notation, structuring mechanisms, and balancing generality with domain-specific libraries as important future directions. These are not peripheral; they reflect the fact that modern proof assistants succeed or fail partly on ecosystem ergonomics. ([Rocq][4])

**Common Pitfalls:** Importing a library is not neutral. It can add notation, scopes, hint databases, tactics, and assumptions that change how goals are displayed and solved. Professional Rocq users read imports as part of the proof context.

### Historical Motivation — from Coq heritage to Rocq identity

Rocq is the successor of Coq and inherits a long tradition of proof-assistant research, dependent type theory, mechanized mathematics, and certified programming. The official roadmap describes Rocq as building on forty years of Coq experience while aiming to improve accessibility, trustworthiness, ecosystem maintainability, and user experience. ([Rocq][4])

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

The official roadmap mentions AI-powered features as part of improving usability and productivity, but the same roadmap frames trustworthiness and proof checking as central commitments. The correct interpretation is that AI or automation may assist proof development; it does not replace the need for kernel-checked proof objects and carefully stated specifications. ([Rocq][4])

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

## PART 2 — Core Syntax and Semantic Primitives Reference, Part 1 of 2

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

### Summary of PART 2, Part 1 — what has been established

This first half of PART 2 established the minimum syntax and semantic vocabulary needed to read simple Rocq files:

| Topic               | Core takeaway                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------- |
| Three syntax layers | Rocq files mix Gallina terms, vernacular commands, and tactics                            |
| Commands            | Top-level commands build or query a checked environment                                   |
| Names               | Naming conventions are proof-engineering tools                                            |
| Queries             | `Check`, `Print`, `Search`, `Locate`, and `Compute` are essential reading tools           |
| Sorts               | `Prop`, `Set`, and `Type` distinguish logical and computational roles                     |
| Data                | Common data is mostly inductive and notation-mediated                                     |
| Binding             | Definitions, parameters, variables, and hypotheses shape the environment                  |
| Functions           | `A -> B` is non-dependent function space; `forall x : A, B x` is dependent function space |
| Implicit arguments  | Surface syntax may hide inferred parameters                                               |
| Declarations        | `Definition`, `Example`, `Lemma`, and `Theorem` introduce checked objects                 |
| Transparency        | `Qed` and `Defined` affect unfolding and computation                                      |
| Proof skeleton      | A proof script constructs a proof term checked by the kernel                              |

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

## PART 3 — Data, Types, and Modeling Reference by Task Pattern, Part 1 of 2

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

```coq id="yh6i8r"
Inductive color : Type :=
| Red
| Green
| Blue.
```

Using it:

```coq id="wpq42k"
Definition is_warm (c : color) : bool :=
  match c with
  | Red => true
  | Green => false
  | Blue => false
  end.
```

Record example:

```coq id="k5v47u"
Record point : Type := {
  px : nat;
  py : nat
}.

Definition origin : point :=
  {| px := 0; py := 0 |}.
```

Recursive tree:

```coq id="ojazkl"
Inductive tree (A : Type) : Type :=
| Leaf : tree A
| Node : tree A -> A -> tree A -> tree A.
```

A size function:

```coq id="h95fjw"
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

```coq id="u9fkr1"
Definition is_zero (n : nat) : bool :=
  match n with
  | 0 => true
  | S _ => false
  end.
```

Propositional specification:

```coq id="nkhyc0"
Definition IsZero (n : nat) : Prop :=
  n = 0.
```

Bridge theorem:

```coq id="lxd50a"
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

```coq id="ef5v35"
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

```coq id="xqai96"
Fixpoint nth_opt {A : Type} (n : nat) (xs : list A) : option A :=
  match n, xs with
  | 0, x :: _ => Some x
  | S n', _ :: xs' => nth_opt n' xs'
  | _, [] => None
  end.
```

Using it:

```coq id="pj5wwd"
Definition nth_or_default {A : Type} (default : A) (n : nat) (xs : list A) : A :=
  match nth_opt n xs with
  | Some x => x
  | None => default
  end.
```

Specification examples:

```coq id="abgrvx"
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

```coq id="7yxf7g"
Inductive result (E A : Type) : Type :=
| Ok : A -> result E A
| Err : E -> result E A.
```

Example:

```coq id="s2u0ly"
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

```coq id="g99r42"
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

```coq id="pqwop3"
Theorem next_light_not_stuck :
  forall s : light, exists s' : light, next_light s = s'.
Proof.
  intros s.
  exists (next_light s).
  reflexivity.
Qed.
```

Relational version:

```coq id="jza665"
Inductive light_step : light -> light -> Prop :=
| StepRed : light_step RedLight GreenLight
| StepGreen : light_step GreenLight YellowLight
| StepYellow : light_step YellowLight RedLight.
```

A determinism property:

```coq id="j0zpsy"
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

```coq id="39c1nf"
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

```coq id="07xdit"
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

```coq id="rxntkp"
Inductive expr : Type :=
| EConst : nat -> expr
| EPlus : expr -> expr -> expr.
```

Evaluator:

```coq id="58c9h1"
Fixpoint eval (e : expr) : nat :=
  match e with
  | EConst n => n
  | EPlus e1 e2 => eval e1 + eval e2
  end.
```

A simple theorem anchor:

```coq id="zk07ez"
Theorem eval_plus_const :
  forall n m : nat,
    eval (EPlus (EConst n) (EConst m)) = n + m.
Proof.
  intros n m.
  reflexivity.
Qed.
```

For richer languages, semantics often becomes relational:

```coq id="s9zxbb"
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

```coq id="ek4fio"
Definition nonzero (n : nat) : Prop :=
  n <> 0.
```

Dependent record:

```coq id="kx8ya5"
Record positive_nat : Type := {
  pos_value : nat;
  pos_proof : pos_value <> 0
}.
```

Smart constructor idea:

```coq id="p4ilz2"
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

```coq id="lp0lca"
Definition pred_opt (n : nat) : option nat :=
  match n with
  | 0 => None
  | S k => Some k
  end.
```

Precondition version:

```coq id="9c41ef"
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

```coq id="rvjzv5"
Inductive bit : Type :=
| B0
| B1.
```

Boolean equality:

```coq id="pl71tp"
Definition bit_eqb (x y : bit) : bool :=
  match x, y with
  | B0, B0 => true
  | B1, B1 => true
  | _, _ => false
  end.
```

Correctness theorem:

```coq id="jlslvn"
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

```coq id="7dpu09"
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

```coq id="t88xqr"
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

```coq id="2itlif"
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

```coq id="b2l7tc"
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

```coq id="4opz2n"
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

```coq id="e52efa"
Inductive btree (A : Type) : Type :=
| Empty : btree A
| Branch : btree A -> A -> btree A -> btree A.
```

Size and mirror:

```coq id="yqd6th"
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

```coq id="tq5dxd"
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

```coq id="h8vpye"
Definition bool_and (b c : bool) : bool :=
  if b then c else false.
```

Relational model:

```coq id="bbunhk"
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

```coq id="t8bpvp"
(* Often too specific for later use. *)
Theorem specific_example : [1; 2] ++ [] = [1; 2].
Proof.
  reflexivity.
Qed.
```

Reusable theorem shape:

```coq id="rpm6uk"
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

### Interim Summary — PART 3, Part 1

This first half of PART 3 covered core modeling tasks:

| Modeling task                | Main Rocq construct                                   | Central lesson                                                         |
| ---------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------- |
| Structured data              | `Inductive`, `Record`                                 | Representation determines induction principles                         |
| Computation vs specification | `bool` vs `Prop`                                      | Use bridge lemmas between tests and propositions                       |
| Optional values              | `option`                                              | Totalize partiality without error detail                               |
| Alternatives/errors          | sums and custom results                               | Use meaningful constructors for public APIs                            |
| Finite states                | enums, functions, relations                           | Function for deterministic computation; relation for proof flexibility |
| Collections                  | lists, vectors, maps, sets, trees                     | Choose based on invariants and proof shape                             |
| Syntax and semantics         | inductive ASTs, evaluators, relations                 | PL theory fits Rocq’s inductive style                                  |
| Domain invariants            | predicates, validators, dependent records             | Stronger types give stronger guarantees and more obligations           |
| Input constraints            | preconditions, validators, subtypes, results          | Match representation to API purpose                                    |
| Decidable equality           | boolean tests and decision procedures                 | Computation and proof need bridge theorems                             |
| Lists and trees              | recursive data and structural proofs                  | Helper lemmas are central                                              |
| Function vs relation         | executable computation vs evidence-rich specification | Both may be needed with equivalence theorem                            |
| Theorem statements           | quantified propositions as interfaces                 | Good statements create useful induction hypotheses                     |

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

## PART 4 — Control Flow, Functions, Abstraction, and Composition by Task Pattern, Part 1 of 2

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

```coq id="qbrbfx"
Definition inc (n : nat) : nat :=
  S n.

Definition compose {A B C : Type}
  (f : B -> C) (g : A -> B) : A -> C :=
  fun x => f (g x).

Definition apply_twice {A : Type} (f : A -> A) (x : A) : A :=
  f (f x).
```

A theorem about `apply_twice`:

```coq id="uv83xx"
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

```coq id="vwev5f"
Definition pred_opt (n : nat) : option nat :=
  match n with
  | 0 => None
  | S k => Some k
  end.
```

Precondition style:

```coq id="mmke49"
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

```coq id="7yiw0b"
Definition max_zero_test (n : nat) : bool :=
  if Nat.eqb n 0 then true else false.
```

Option branch:

```coq id="put51a"
Definition option_default {A : Type} (default : A) (o : option A) : A :=
  match o with
  | Some x => x
  | None => default
  end.
```

Nested pattern matching:

```coq id="3k69wv"
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

```coq id="smphrx"
Definition is_successor (n : nat) : bool :=
  match n with
  | 0 => false
  | S _ => true
  end.
```

List example:

```coq id="jrg8zi"
From Stdlib Require Import List.
Import ListNotations.

Definition second_or_zero (xs : list nat) : nat :=
  match xs with
  | _ :: y :: _ => y
  | _ => 0
  end.
```

Tree example:

```coq id="gpxs6f"
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

```coq id="y0v1ma"
Fixpoint my_map {A B : Type} (f : A -> B) (xs : list A) : list B :=
  match xs with
  | [] => []
  | x :: xs' => f x :: my_map f xs'
  end.
```

Example: filter with boolean predicate.

```coq id="nujt8r"
Fixpoint my_filter {A : Type} (p : A -> bool) (xs : list A) : list A :=
  match xs with
  | [] => []
  | x :: xs' =>
      if p x then x :: my_filter p xs'
      else my_filter p xs'
  end.
```

Tree traversal:

```coq id="9w81qo"
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

```coq id="gzr81n"
Definition comp {A B C : Type} (f : B -> C) (g : A -> B) : A -> C :=
  fun x => f (g x).
```

Map composition theorem:

```coq id="jp5exh"
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

```coq id="bbdagh"
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

```coq id="3cmzew"
Definition is_empty {A : Type} (xs : list A) : bool :=
  match xs with
  | [] => true
  | _ :: _ => false
  end.

Definition EmptyList {A : Type} (xs : list A) : Prop :=
  xs = [].
```

Soundness:

```coq id="9d6a5y"
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

```coq id="r8u46z"
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

```coq id="2alvzp"
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

```coq id="jhiim0"
Theorem option_default_some :
  forall (A : Type) (default x : A),
    option_default default (Some x) = x.
Proof.
  intros A default x.
  reflexivity.
Qed.
```

General option proof:

```coq id="eg4u97"
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

```coq id="fwtkuv"
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

```coq id="03ziky"
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

```coq id="1fz8hj"
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

```coq id="oirw0p"
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

```coq id="qizuzb"
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

```coq id="fr30g8"
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

```coq id="6z83ua"
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

```coq id="8o9sye"
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

```coq id="w51026"
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

```coq id="h6p0mw"
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

```coq id="jxigfs"
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

```coq id="4ey4n6"
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

```coq id="4yvl6t"
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

```coq id="wlpw8t"
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

```coq id="3073a1"
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

```coq id="8ui0uw"
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

```coq id="un9iu7"
Theorem true_not_false :
  true <> false.
Proof.
  unfold not.
  intros H.
  discriminate H.
Qed.
```

Equivalent shorter proof:

```coq id="4g7i1q"
Theorem zero_not_succ :
  forall n : nat, 0 <> S n.
Proof.
  intros n H.
  discriminate H.
Qed.
```

Using contradiction from impossible option equality:

```coq id="ogkr9h"
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

```coq id="yr9l93"
Inductive Even : nat -> Prop :=
| Even0 : Even 0
| EvenSS : forall n : nat, Even n -> Even (S (S n)).
```

Proving `Even 1 -> False`:

```coq id="ts2erc"
Theorem not_even_1 :
  Even 1 -> False.
Proof.
  intros H.
  inversion H.
Qed.
```

Rocq sees that there is no constructor of `Even` that can produce evidence for `Even 1`.

Example with option injectivity:

```coq id="k66hbx"
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

```coq id="s168l1"
Definition id_proof : forall A : Prop, A -> A :=
  fun A HA => HA.
```

Tactic proof:

```coq id="y7wer9"
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

```coq id="i2tgs9"
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

```coq id="1fle35"
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

### Interim Summary — PART 4, Part 1

This first half of PART 4 covered the core behavior-construction mechanisms:

| Task pattern              | Main construct                             | Central lesson                                  |
| ------------------------- | ------------------------------------------ | ----------------------------------------------- |
| Define pure functions     | `Definition`, `fun`                        | Functions are typed terms                       |
| Design signatures         | plain, option, result, dependent, relation | Signature determines proof obligations          |
| Branch by value           | `if`, `match`                              | Branch on computable data, not arbitrary `Prop` |
| Branch by structure       | pattern matching                           | Constructors determine cases                    |
| Iterate/transform         | `Fixpoint`                                 | Recursion must be structurally justified        |
| Compose functions         | higher-order functions                     | Prefer pointwise theorems when useful           |
| Specify behavior          | soundness/completeness/refinement          | Correctness depends on theorem statement        |
| Case analysis             | `destruct`                                 | Use for non-recursive branching                 |
| Recursive proof           | `induction`                                | Use when recursive hypotheses are needed        |
| Preserve branch equations | `destruct ... eqn:`                        | Keep link between test and branch               |
| Simplify computation      | `simpl`, `cbn`, `unfold`                   | Computation differs from rewriting              |
| Rewrite equality          | `rewrite`                                  | Propositional equality transforms goals         |
| Compose theorems          | `apply`, `exact`                           | Theorem application is proof-term composition   |
| Logical construction      | `split`, `left`, `right`, `exists`         | Construct evidence explicitly                   |
| Contradiction             | `False`, `discriminate`, `inversion`       | Constructor impossibility is proof-relevant     |
| Proof style               | proof terms versus tactics                 | Choose readability and maintainability          |

