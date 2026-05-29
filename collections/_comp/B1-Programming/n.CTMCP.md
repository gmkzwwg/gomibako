---
title: CTMCP Annotated
layout: slide-multilingual
categories: Notes
subclass: Programming
---

# English

## CTMCP Notes

### Full-Book Guide

*Concepts, Techniques, and Models of Computer Programming* is not best read as an Oz manual, a catalog of paradigms, or an algorithms textbook. Its main unit of explanation is the `computation model`: a deliberately limited model of execution that exposes a small number of programmer-significant concepts. The book’s method is to start from a simple `kernel language`, then add concepts one by one so that each new model can be compared with earlier ones in terms of expressiveness, reasoning cost, modularity, and suitability for real systems.

The recurring question is not “Which language is best?” but “Which concepts does this problem need?” A program may use `function`, `record`, `procedure`, `thread`, `dataflow variable`, `cell`, `object`, `lock`, `port`, `relation`, or `constraint`; each concept changes what can be expressed directly and what becomes harder to reason about. The text treats programming as the design and combination of abstractions, from small recursive functions to distributed systems and constraint-based search.

The reader should track three layers at the same time. The first layer is surface programming in Oz: concrete syntax, interactive fragments, and runnable examples. The second layer is the `kernel language`: the reduced language in which the essential concept becomes visible. The third layer is the `abstract machine` semantics, which explains what the computation actually does in terms of environments, stores, threads, stacks, bindings, cells, ports, and computation spaces.

A common misreading is to treat each chapter as an isolated paradigm: functional here, object-oriented there, relational later. The book is organized against that habit. Models are related by small conceptual increments: `declarative model` + `thread` + `dataflow variable` → `declarative concurrency`; `declarative model` + `cell` → `explicit state`; `state` + `data abstraction` → `object-oriented programming`; `state` + `concurrency` → races, locks, monitors, and transactions. A mature reading records both sides of each increment: what becomes easier to express and what becomes harder to reason about.

The `creative extension principle` gives the book its deeper logic. A new concept should be added when programs become complicated for technical reasons unrelated to the problem itself. This does not mean that more concepts are always better. A concept such as `explicit state` can make modular stateful abstractions natural, but it also makes equational reasoning weaker; `shared-state concurrency` can model real concurrent systems, but it introduces nondeterministic interleavings that must be controlled by synchronization.

Oz and the Mozart system matter because they provide a practical environment in which these models can be run and compared. They are not the final object of study. The durable knowledge lies in recognizing kernel concepts, tracing their operational behavior, and deciding when a model’s expressive power justifies its reasoning cost.

**Full-book movement:**

* Chapter 1: `value` + `function` + `list` + `state` + `concurrency` → first panorama of programming concepts.
* Chapter 2: `single-assignment store` + `dataflow variable` + `procedure` → declarative kernel language.
* Chapter 3: `recursion` + `higher-order programming` + `abstract data type` → declarative programming techniques.
* Chapter 4: `thread` + `dataflow synchronization` + `stream` → declarative concurrency.
* Chapter 5: `port` + `message stream` + `protocol` → message-passing concurrency.
* Chapter 6: `cell` + `assignment` + `encapsulation` → explicit state and stateful abstractions.
* Chapter 7: `state` + `data abstraction` + `inheritance` → object-oriented programming.
* Chapter 8: `state` + `concurrency` → nondeterminism, races, locks, monitors, transactions.
* Chapter 9: `logic variable` + `choice` + `search` → relational programming.
* Chapter 10: model combination → GUI abstraction and event-oriented interaction.
* Chapter 11: distributed entities + partial failure → distributed programming.
* Chapter 12: `constraint` + `propagation` + `computation space` → constraint programming.
* Chapter 13: earlier models → abstract-machine semantics and model comparison.

**Long-term concepts to track:**

| Concept                            | Why it matters                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------------- |
| `computation model`                | Defines how computation proceeds and which concepts are available.                    |
| `programming model`                | Describes the techniques and design principles enabled by a computation model.        |
| `kernel language`                  | Removes accidental syntax and exposes the essential computational concepts.           |
| `single-assignment store`          | Makes declarative variables and dataflow behavior possible.                           |
| `dataflow variable`                | Allows computation to wait for information without explicit synchronization.          |
| `thread`                           | Adds independent activities, later refined into declarative and stateful concurrency. |
| `cell`                             | Adds explicit state, identity, and time-varying behavior.                             |
| `port object`                      | Encapsulates state behind a stream of messages.                                       |
| `lock` / `monitor` / `transaction` | Controls interleavings in shared-state concurrency.                                   |
| `relation`                         | Generalizes a function by allowing multiple or zero solutions.                        |
| `constraint`                       | Describes restrictions on values and supports propagation plus search.                |
| `abstract machine`                 | Gives precise operational meaning to kernel-language execution.                       |

**Reading method:**

* For each chapter, identify the new concept added to the model.
* Run at least one minimal Oz fragment that exposes the concept directly.
* Translate the example mentally into kernel-language behavior: binding, procedure call, thread creation, cell update, message send, search choice, or constraint propagation.
* Record what the concept simplifies and what new reasoning problem it introduces.
* Compare models by rewriting the same small problem in two different styles.

**Persistent warning:**

Oz syntax is not the center. The central object is the relation between concept, model, technique, and reasoning. A piece of code should be read as a small laboratory: it exposes a computation model, shows what the model hides, and reveals where the next concept becomes necessary.

### Chapter 1. Introduction to Programming Concepts

*Chapter 1 is a rapid controlled tour of the book’s main concepts before they are given formal kernel-language semantics. It begins with calculator-style evaluation, then introduces variables, functions, lists, recursive list processing, correctness, complexity, laziness, higher-order programming, concurrency, dataflow, explicit state, objects, classes, nondeterminism, and atomicity. The chapter does not yet build a complete computation model; it prepares the reader to recognize why later chapters add one concept at a time. Its examples are small, but each one previews a later model: declarative programming, dataflow concurrency, explicit state, object-oriented programming, shared-state concurrency, and relational or constraint-based computation.*

**Chapter dependencies:**

* No heavy prerequisites: basic arithmetic + simple function calls → interactive Oz fragments.
* `value` + `variable` + `function` + `list` → minimal vocabulary for later kernel-language examples.
* `recursion` + `list processing` → Chapter 3’s declarative programming techniques.
* `correctness` + `complexity` → early discipline for reasoning about programs, not only running them.
* `lazy evaluation` + infinite lists → Chapter 4’s lazy declarative model.
* `higher-order programming` → abstraction over operations, reused in declarative design and many later models.
* `thread` + `dataflow variable` → Chapter 4’s declarative concurrency.
* `cell` + `object` + `class` → Chapter 6 explicit state and Chapter 7 object-oriented programming.
* `state` + `concurrency` + `lock` → Chapter 8 shared-state concurrency and atomicity.

**1. What does Chapter 1 mean by introducing programming through concepts rather than through a language manual?**

>

**2. How do calculator expressions, variables, and functions establish the first distinction between surface syntax and computational meaning?**

>

**3. Why are lists and recursive functions introduced so early, and how do they prepare the later declarative model?**

>

**4. How do correctness and complexity change the way examples such as `Fact`, `Comb`, and `Pascal` should be read?**

>

**5. What does lazy evaluation add to ordinary list computation, and why does an infinite list require a different execution intuition?**

>

**6. How does higher-order programming turn a specific program such as Pascal’s triangle into a family of programs?**

>

**7. Why do concurrency and dataflow belong together in the first introduction, and what makes dataflow concurrency different from ordinary thread interleaving?**

>

**8. How do explicit state, objects, classes, nondeterminism, and atomicity preview the later move from declarative programming to richer but harder models?**

>

**Concept comparison table:**

| Concept A        | Concept B                 | Shared point                              | Key difference                                                                                       | Role in this chapter                                                 | Minimal example                                     |
| ---------------- | ------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------- |
| `identifier`     | `store variable`          | Both are involved in naming values        | Identifier is written in the program; store variable is the underlying entity created by `declare`   | Explains why redeclaring a name does not change earlier calculations | `declare V=...` followed by another `declare V=...` |
| `variable`       | `cell`                    | Both can be used through a name           | A variable is single-assignment; a cell has mutable content                                          | Prepares `single-assignment store` ≠ `explicit state`                | `X=23` vs `X={NewCell 23}`                          |
| `function`       | `procedure`               | Both are called with `{...}` syntax in Oz | A function returns a value; a procedure performs an action or binds outputs                          | Sets up computation by calls before later kernel-language precision  | `{Fact 10}` vs `{Browse X}`                         |
| `recursion`      | `iteration`               | Both can repeat computation               | Recursion defines a value through smaller instances; iteration often carries an accumulator or state | Prepares Chapter 3’s program design techniques                       | `Fact`, `Pascal`                                    |
| `list`           | `stream`                  | Both are sequential structures            | A list is available as a finite value; a stream may be produced incrementally or lazily              | Prepares lazy execution and stream programming                       | `[1 2 3]` vs lazy `Ints`                            |
| `thread`         | `dataflow variable`       | Both support concurrent execution         | Thread creates independent activity; dataflow variable synchronizes by waiting for binding           | Previews declarative concurrency                                     | `thread ... end` and `X*X` waiting for `X`          |
| `explicit state` | `declarative computation` | Both compute values                       | Explicit state permits behavior to change over time; declarative computation avoids mutable memory   | Marks the main later model boundary                                  | counter with `NewCell`                              |
| `atomicity`      | `concurrency`             | Both concern multi-step execution         | Concurrency permits interleaving; atomicity hides intermediate states                                | Prepares locks, monitors, transactions                               | guarded counter update                              |

**Program tracing table:**

| Tracing object          | What to trace                                                   | Common mistake                                                                   |
| ----------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Calculator expression   | Expression → evaluation → browser display                       | Treating `{Browse ...}` as the calculation itself rather than the display action |
| `declare V=...`         | Identifier → new store variable → bound value                   | Assuming redeclaring an identifier mutates the old variable                      |
| `Fact`                  | Recursive call chain, base case, multiplication on return       | Trusting output without checking the recursive definition                        |
| `Comb`                  | Calls to `Fact`, intermediate factorial sizes, division         | Ignoring why the simple definition is inefficient                                |
| Pascal’s triangle       | Row construction from shifted previous rows                     | Seeing list operations as printing rather than structural computation            |
| `Ints` under laziness   | Demand for list elements → delayed computation forced as needed | Trying to consume an infinite list with a strict traversal                       |
| `GenericPascal`         | Operation argument `Op` → reused row-building pattern           | Seeing higher-order programming as syntax rather than abstraction over behavior  |
| Threaded Pascal example | New thread computes slow task while main thread continues       | Assuming concurrency automatically changes the result                            |
| Dataflow example        | `X*X` suspends until `X` is bound                               | Mistaking waiting for an error or busy loop                                      |
| Cell counter            | Read cell → compute increment → write cell                      | Treating `C:=@C+1` as indivisible under concurrency                              |
| Lock-protected counter  | Lock acquisition → protected read/update/write → release        | Guarding only part of the critical section                                       |

>

**Abstraction barrier record:**

| Abstraction layer        | Exposed interface                 | Hidden representation                           | What upper code depends on               | What should not change if representation changes |
| ------------------------ | --------------------------------- | ----------------------------------------------- | ---------------------------------------- | ------------------------------------------------ |
| Function abstraction     | Function name + parameters        | Recursive body, local variables, internal calls | Returned value for given arguments       | Call sites using `Fact`, `Comb`, or `Pascal`     |
| List abstraction         | Constructors and pattern matching | Linked representation of head and tail          | Ability to process sequences recursively | Higher-level list programs                       |
| Higher-order abstraction | Operation parameter such as `Op`  | Specific operation used to build the row        | Contract that `Op` combines two elements | `GenericPascal` structure                        |
| Stateful counter         | `Bump` or counter method          | Cell holding the current count                  | Observable count behavior                | Client code using the counter                    |
| Object abstraction       | Methods                           | Internal cells and procedure definitions        | Message-like interface                   | External calls to counter object                 |
| Atomic operation         | Lock-protected block              | Interleaving control mechanism                  | No observable intermediate state         | Code outside the critical section                |

**Error prediction:**

**1. The reader may mistake Oz syntax for the learning target, but this chapter needs to distinguish syntax practice from concept recognition.**

>

**2. The reader may remember `Fact`, `Comb`, and `Pascal` as isolated examples while missing their role as tests for recursion, abstraction, correctness, and complexity.**

>

**3. The reader may trace variables as if they were mutable boxes, even though the early variable model is single-assignment and must be distinguished from cells.**

>

**4. The reader may treat laziness as simply “not computing yet,” while the chapter needs the sharper idea that computation is triggered by demand.**

>

**5. The reader may think that adding `thread` automatically makes programs nondeterministic, while dataflow concurrency can preserve results when computations communicate only through bindings.**

>

**6. The reader may treat the cell counter update as one action, while the interleaving problem comes from the separate read, compute, and write steps.**

>

**Learning Tips:** Chapter 1 should be read with the Mozart system open. The small fragments are not decorative; they are the first execution traces for later models. Record each new concept by the smallest program that exposes it: one recursive function, one list recursion, one lazy infinite list, one higher-order call, one dataflow wait, one cell mutation, and one lock-protected update. The useful habit is to ask after each fragment: what did this concept make simpler, and what new reasoning problem did it introduce?

**Exercise 1.1.** Use the system as a calculator: compute `2^100` without defining new functions, then compute `100!` without defining new functions, looking for possible shortcuts.

**Training goal:** interactive evaluation, variables as intermediate results, arithmetic exploration.

>

**Exercise 1.2.** Write a more efficient version of `Comb` by avoiding unnecessarily large factorials, first using the product formula for combinations and then using the identity that chooses the smaller of `k` and `n-k`.

**Training goal:** algorithmic improvement, arithmetic decomposition, efficiency reasoning.

>

**Exercise 1.3.** Apply the correctness ideas from the factorial example to the `Pascal` function.

**Training goal:** correctness argument, recursive specification, structural reasoning.

>

**Exercise 1.4.** Explain what the chapter says about high-order polynomial time complexity and whether such programs are practically usable.

**Training goal:** complexity interpretation, practical efficiency judgment.

>

**Exercise 1.5.** Analyze what happens when `SumList` is applied to the infinite lazy list produced by `Ints`.

**Training goal:** lazy evaluation, infinite data structures, demand-driven computation.

>

**Exercise 1.6.** Explore higher-order variations of Pascal’s triangle by using operations such as subtraction, multiplication, and `Mul1`, and use a loop to display multiple rows.

**Training goal:** higher-order programming, operation abstraction, behavioral variation.

>

**Exercise 1.7.** Compare two fragments: one using nested variables with the same identifier and one using a cell updated with `:=`; determine what `Browse` displays and explain why.

**Training goal:** identifier vs store variable, single assignment vs mutable cell.

>

**Exercise 1.8.** Correct the attempted definition of `Accumulate` so that the function remembers the sum of all previous calls.

**Training goal:** explicit state, cell lifetime, closure over mutable memory.

>

**Exercise 1.9.** Use a memory store to implement a memoized `FasterPascal`, then relate the memory store to cells and a counter object.

**Training goal:** memoization, stateful abstraction, store interface, representation by cells.

>

**Exercise 1.10.** Experiment with the two-thread cell counter, use delays to force different interleavings, and compare the unprotected version with the lock-protected version.

**Training goal:** race condition, interleaving analysis, atomicity, lock discipline.

>

**Cross-chapter recovery questions:**

**1. How will the chapter’s informal account of variables need to be rechecked when Chapter 2 introduces the `single-assignment store` and Chapter 6 introduces `cells`?**

**2. How will the early examples of recursion, lists, and higher-order programming become systematic design techniques in Chapter 3?**

**3. How will the dataflow example return in Chapter 4 as a full model of declarative concurrency rather than a small curiosity?**

**4. How will the cell counter and lock example be refined in Chapter 8 when shared-state concurrency is treated through interleavings, locks, monitors, and transactions?**

**Chapter mastery standards:**

* Able to distinguish an Oz `identifier` from a `store variable`.
* Able to trace a recursive function such as `Fact` or `Pascal` through base case and recursive case.
* Able to explain why `Comb` is correct but inefficient in its simplest factorial-based form.
* Able to explain why lazy evaluation permits infinite lists but does not make all infinite computations usable.
* Able to explain how `GenericPascal` uses higher-order programming to abstract over an operation.
* Able to trace a dataflow wait: unbound variable → suspended operation → later binding → resumed computation.
* Able to identify the race in a cell counter and explain why a lock makes the update atomic.

### Chapter 2. Declarative Computation Model

*Chapter 2 gives the first complete computation model of the book. It defines a practical language by translating it into a smaller `kernel language`, then gives the kernel language an operational semantics through an `abstract machine`. The chapter’s central objects are the `single-assignment store`, `dataflow variable`, `environment`, `semantic statement`, `statement stack`, and `computation step`. Later chapters repeatedly extend this base model: Chapter 3 develops programming techniques on top of it, Chapter 4 adds declarative concurrency, Chapter 6 adds explicit state, and Chapter 13 returns to the semantic machinery in a more general form.*

**Chapter dependencies:**

* Chapter 1 gives informal examples; Chapter 2 turns them into a precise `computation model`.
* `syntax` + `language constraints` + `semantics` → method for defining practical programming languages.
* `practical language` → kernel-language translation → executable semantic account.
* `single-assignment store` + `dataflow variable` → declarative variables without mutable assignment.
* `environment` + `semantic statement` + `statement stack` → abstract-machine execution.
* `kernel language` contains only the essential constructs: binding, local variables, procedures, conditionals, pattern matching, and calls.
* Chapter 3 uses this model for declarative programming techniques: `recursion` + `higher-order programming` + `ADT`.
* Chapter 4 extends the model with `thread`; Chapter 6 extends it with `cell`; Chapter 13 generalizes the abstract machine.

**1. Why does the book define a practical programming language through a smaller `kernel language` instead of describing full Oz directly?**

>

**2. What makes the declarative computation model “declarative,” and why is this not simply the same as being functional or logical?**

>

**3. How does the `single-assignment store` change the meaning of variables compared with mutable variables in imperative languages?**

>

**4. Why are `dataflow variables` useful even before concurrency is formally introduced?**

>

**5. How do the kernel statements—`skip`, sequence, `local`, binding, conditional, pattern matching, and procedure application—define the expressive core of the model?**

>

**6. How does the abstract machine execute a program through `environment`, `semantic statement`, `statement stack`, `single-assignment store`, and computation steps?**

>

**7. Why do memory behavior, last call optimization, and memory life cycle belong inside a chapter on semantics rather than only inside implementation engineering?**

>

**8. How do exceptions, linguistic abstractions, and advanced topics show the boundary between a minimal kernel model and a practical programming language?**

>

**Concept comparison table:**

| Concept A                    | Concept B                 | Shared point                                | Key difference                                                                                    | Role in this chapter                                                            | Minimal example                                               |             |
| ---------------------------- | ------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------- |
| `practical language`         | `kernel language`         | Both can express programs in the model      | Practical language is convenient for programmers; kernel language exposes the essential semantics | Defines the book’s main method for language explanation                         | `fun`, `case`, `andthen` translated into smaller kernel forms |             |
| `syntax`                     | `semantics`               | Both define a language                      | Syntax describes legal forms; semantics describes execution meaning                               | Separates grammar from computation                                              | grammar table vs abstract-machine transition                  |             |
| `language constraint`        | `context-free grammar`    | Both restrict legal programs                | Grammar gives shape; constraint rules rule out forms grammar alone permits                        | Makes practical syntax precise                                                  | distinct variables in record fields                           |             |
| `identifier`                 | `store variable`          | Both participate in naming                  | Identifier appears in program text; store variable is an entity in the store                      | Explains environments                                                           | `X → x` in environment                                        |             |
| `single-assignment variable` | `mutable variable`        | Both can be associated with values          | Single-assignment variable is bound once; mutable variable can be updated                         | Defines declarative computation                                                 | `X=3` ≠ `C:=3`                                                |             |
| `dataflow variable`          | ordinary unbound variable | Both may initially lack a value             | Dataflow variable may cause suspension until bound                                                | Prepares declarative concurrency                                                | `B=A+1` waits for `A`                                         |             |
| `environment`                | `store`                   | Both are semantic structures                | Environment maps identifiers to store entities; store contains variables and values               | Core abstract-machine distinction                                               | `{X → x}` plus `x=42`                                         |             |
| `semantic statement`         | statement                 | Both contain program code                   | Semantic statement pairs a statement with an environment                                          | Makes free identifiers refer to store entities                                  | `(s, E)`                                                      |             |
| `statement stack`            | computation               | Both concern execution                      | Stack is current pending work; computation is the sequence of execution states                    | Defines operational execution                                                   | `(ST, σ) → (ST', σ')`                                         |             |
| `binding`                    | assignment                | Both connect names or variables with values | Binding constrains a single-assignment store; assignment changes a mutable cell                   | Prevents premature imperative interpretation                                    | `X=Y` vs later `C:=V`                                         |             |
| `case`                       | `if`                      | Both branch computation                     | `case` branches by pattern matching; `if` branches by Boolean condition                           | Shows expressive relation between kernel constructs and linguistic abstractions | `case X of a                                                  | Z then ...` |
| `procedure`                  | closure                   | Both describe callable code                 | Procedure value contains code with contextual environment                                         | Explains lexical scope                                                          | `proc {$ X ?Y} ... end`                                       |             |

**Program tracing table:**

| Tracing object              | What to trace                                                            | Common mistake                                            |
| --------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------- |
| Practical-language fragment | Translation into kernel-language form                                    | Treating surface convenience as primitive semantics       |
| Variable declaration        | Identifier → fresh store variable → environment extension                | Thinking `declare X` immediately gives `X` a value        |
| Variable-variable binding   | Two store variables become equal or compatible                           | Treating `X=Y` as copying a value from `Y` to `X`         |
| Value creation              | Variable bound to number, record, or procedure                           | Forgetting that a procedure value contains an environment |
| Partial value               | Record structure with unbound components                                 | Assuming values must be complete before they can be used  |
| Dataflow wait               | Operation needs an unbound variable → suspension until binding           | Treating suspension as failure                            |
| Procedure application       | Apply procedure value → extend contextual environment → push body        | Using the caller’s environment alone                      |
| Pattern matching            | Match value against pattern → bind pattern variables or take alternative | Confusing pattern matching with ordinary equality testing |
| `if` statement              | Condition variable must be Boolean before branch selection               | Evaluating both branches                                  |
| Abstract-machine step       | Pop semantic statement → transform stack/store atomically                | Looking for intermediate states inside a computation step |
| Last call optimization      | Last call reuses stack space                                             | Assuming every recursion grows stack                      |
| Exception context           | Normal execution vs raised value matched by handler                      | Treating exception as ordinary return                     |

>

**Abstraction barrier record:**

| Abstraction layer            | Exposed interface                                                         | Hidden representation                           | What upper code depends on             | What should not change if representation changes |
| ---------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------- | -------------------------------------- | ------------------------------------------------ |
| Practical language           | Programmer-friendly constructs such as `fun`, `case`, `andthen`, `orelse` | Kernel translation rules                        | Program behavior after translation     | Meaning of source programs                       |
| Kernel language              | Small set of semantic statements                                          | Full Oz syntax and syntactic sugar              | Abstract-machine semantics             | Higher-level constructs compiled to kernel       |
| Store model                  | Binding, partial values, dataflow variables                               | Concrete memory layout                          | Single-assignment behavior             | Declarative reasoning                            |
| Environment model            | Identifier lookup                                                         | Store-variable names and implementation details | Lexical reference to entities          | Procedure-call behavior                          |
| Procedure abstraction        | Callable value with parameters                                            | Saved contextual environment                    | Lexical scope and application behavior | Call sites                                       |
| Pattern-matching abstraction | `case` alternatives                                                       | Label, arity, feature selection tests           | Structural decomposition               | Higher-level branching code                      |
| Exception abstraction        | `try` / `catch` behavior                                                  | Handler stack or semantic context details       | Nonlocal exceptional control           | Ordinary program logic outside handler           |
| Practical-language extension | Linguistic abstractions                                                   | Translation into kernel language                | Same observable behavior               | Kernel semantics                                 |

**Error prediction:**

**1. The reader may mistake the kernel language for the language programmers should write by hand, but this chapter needs to distinguish semantic core from practical surface language.**

>

**2. The reader may remember that variables are “assigned” values while missing that the model uses single-assignment binding, not mutable assignment.**

>

**3. The reader may trace procedure application using only the call-site environment, even though lexical scope requires the procedure’s contextual environment.**

>

**4. The reader may treat partial values as malformed values, but the model allows partially known structures as ordinary store entities.**

>

**5. The reader may see suspension on an unbound dataflow variable as an error, while the model treats it as waiting for needed information.**

>

**6. The reader may treat last call optimization as a compiler trick, while the abstract-machine account makes its memory behavior semantically traceable.**

>

**Learning Tips:** Chapter 2 should be read with two representations beside each example: the convenient Oz fragment and its kernel-language form. The most useful manual traces are small enough to fit on one page: create a variable, bind it to a record with an unbound field, apply a procedure that uses a free identifier, and execute a `case` with a partial value. The chapter is long because it establishes the book’s method: language construct → kernel translation → abstract-machine behavior → reasoning consequence. Reading only the examples without tracing the semantic state loses the point of the model.

**Exercise 2.1.** Determine whether the second occurrence of `P` in the recursive procedure example is free or bound, using kernel translation to justify the answer.

**Training goal:** free and bound identifiers, kernel translation, lexical scope.

>

**Exercise 2.2.** Explain why a procedure call must add the procedure’s contextual environment when executing the body, using `MulByN` and examples where `N` is absent or differently bound at the call site.

**Training goal:** contextual environment, lexical closures, procedure application semantics.

>

**Exercise 2.3.** Explain why a function body with an `if` statement missing an `else` raises an exception when the condition is false, and why this situation does not occur for procedures.

**Training goal:** function vs procedure, missing result value, exception behavior.

>

**Exercise 2.4.** Define `if` in terms of `case`, then define `case` in terms of `if` using `Label`, `Arity`, and feature selection.

**Training goal:** linguistic abstraction, expressive equivalence, conditional vs pattern matching.

>

**Exercise 2.5.** Predict the behavior of the given multi-branch `case` procedure on several list and record inputs, then verify with Mozart.

**Training goal:** pattern matching, guarded alternatives, record/list representation, execution prediction.

>

**Exercise 2.6.** Predict how the simplified `case` procedure behaves with partially known records and variables, then compare it with direct equality testing.

**Training goal:** pattern matching with partial values, unification-like behavior, `case` vs equality.

>

**Exercise 2.7.** Predict the result of the `SpecialMax` closure example involving `Max3` and `Max5`.

**Training goal:** lexical closures, contextual environment, captured values.

>

**Exercise 2.8.** Define `AndThen` and `OrElse` as control abstractions using zero-argument functions, and compare their behavior with `andthen` and `orelse`.

**Training goal:** control abstraction, delayed evaluation, higher-order procedure use.

>

**Exercise 2.9.** Expand `Sum1` and `Sum2` into kernel syntax, trace their stack and store behavior by hand, and compare behavior for very large inputs.

**Training goal:** tail recursion, last call optimization, abstract-machine stack behavior.

>

**Exercise 2.10.** Expand the `SMerge` function into kernel syntax while preserving the tail-recursive structure implied by the translation rules.

**Training goal:** kernel translation, pattern matching, tail-recursive transformation.

>

**Exercise 2.11.** Show that mutually recursive `IsEven` and `IsOdd` execute with constant stack size when every call is a last call.

**Training goal:** mutual recursion, last call optimization, bounded stack reasoning.

>

**Exercise 2.12.** Define a translation of `try s1 finally s2 end` into `try/catch` where `s1` and `s2` occur only once.

**Training goal:** exception translation, control abstraction, avoiding code duplication.

>

**Exercise 2.13.** Analyze the unifications `X=[a Z]`, `Y=[W b]`, and `X=Y`, showing that the final bindings are independent of the order of unification.

**Training goal:** unification, partial values, order independence, preparation for declarative concurrency.

>

**Cross-chapter recovery questions:**

**1. How will Chapter 2’s `dataflow variable` account need to be rechecked when Chapter 4 adds multiple threads and dataflow synchronization?**

**2. Which parts of the declarative kernel language become programming techniques in Chapter 3 rather than just semantic machinery?**

**3. How will the distinction between `single-assignment variable` and mutable state be sharpened when Chapter 6 introduces `cell` and assignment?**

**4. How will Chapter 13 generalize the abstract-machine notions of store, environment, semantic statement, stack, and computation step?**

**Chapter mastery standards:**

* Able to explain why a practical language is defined through translation into a `kernel language`.
* Able to distinguish `identifier`, `store variable`, `environment`, and `single-assignment store`.
* Able to trace a small kernel program through semantic statements and store changes.
* Able to explain why dataflow variables wait rather than fail when information is missing.
* Able to translate simple practical constructs into kernel-language ideas.
* Able to trace procedure application using both argument bindings and contextual environment.
* Able to explain last call optimization through statement-stack behavior.

### Chapter 3. Declarative Programming Techniques

*Chapter 3 turns the declarative computation model from Chapter 2 into a practical programming discipline. It first defines what `declarativeness` means in operational terms, then develops techniques for writing useful programs without explicit state: iterative computation, recursive computation, list and tree programming, accumulators, difference lists, higher-order programming, and abstract data types. The chapter repeatedly exposes a productive tension: a declarative specification can be clear and compositional, but may need transformation before it becomes efficient. Later chapters keep returning to this tension when concurrency, explicit state, objects, relational programming, and constraints are added to the base model.*

**Chapter dependencies:**

* Chapter 2 supplies the model: `single-assignment store` + `procedure` + `pattern matching` → declarative execution.
* Chapter 3 turns semantics into technique: `recursive definition` + `higher-order programming` → practical declarative design.
* `declarative operation` = independent + stateless + deterministic → simpler testing and reasoning.
* `recursion` + `accumulator` → iterative computation with bounded stack.
* `list` + `tree` + `pattern matching` → structural program design.
* `higher-order procedure` + `control abstraction` → reusable computation patterns.
* `abstract data type` + `wrapper` / `unwrapper` → representation hiding and secure capabilities.
* Chapter 4 extends declarative technique with `thread` + `dataflow variable`; Chapter 6 explains when explicit state becomes necessary.

**1. What does Chapter 3 mean by a `declarative operation`, and why is the definition based on behavior rather than syntax?**

>

**2. Why do compositionality and simple reasoning make declarative programs easier to build, test, and verify?**

>

**3. How does iterative computation arise inside a declarative model that has no mutable loop counter?**

>

**4. How does recursive computation over lists and trees follow the structure of the data being processed?**

>

**5. Why do accumulators, difference lists, and other transformations matter if the original declarative specification is already clear?**

>

**6. How does higher-order programming convert repeated programming patterns into reusable abstractions such as `Map`, `FoldL`, `FoldR`, and loop abstractions?**

>

**7. How do abstract data types hide representations while preserving a declarative interface?**

>

**8. Where does the declarative model start to feel insufficient, and why does this prepare later chapters on state, concurrency, objects, and distribution?**

>

**Concept comparison table:**

| Concept A                  | Concept B                | Shared point                               | Key difference                                                                                           | Role in this chapter                                | Minimal example                                 |
| -------------------------- | ------------------------ | ------------------------------------------ | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------- |
| `declarative operation`    | ordinary operation       | Both compute results from inputs           | Declarative operation is independent, stateless, and deterministic                                       | Defines the chapter’s central discipline            | `Fact`, `Append`, `Map`                         |
| `declarative model`        | declarative programming  | Both support declarative reasoning         | The model guarantees declarativeness; the programming style may appear in other models too               | Separates model from style                          | functional or logic programs read declaratively |
| `referential transparency` | variable binding         | Both connect expressions with values       | Referential transparency allows equals to replace equals; binding gives a variable a value in the store  | Explains algebraic reasoning                        | replace `{F A}` by its value                    |
| iterative computation      | recursive computation    | Both can be written recursively in Oz      | Iterative computation has bounded stack through last calls; recursive computation may grow pending work  | Main efficiency distinction                         | `IterLength` vs structural recursion            |
| `accumulator`              | ordinary parameter       | Both are procedure arguments               | Accumulator carries intermediate state explicitly as a value                                             | Enables iterative computation without mutable state | `SumListAcc`                                    |
| `threaded state`           | explicit state           | Both carry changing information            | Threaded state is passed as arguments/results; explicit state is stored in cells                         | Shows state-like design without `cell`              | parser state, accumulator                       |
| `difference list`          | ordinary list            | Both represent sequences                   | Difference list represents a list by an open tail variable                                               | Makes some append-like operations efficient         | `Xs#Ys` style representation                    |
| `FoldL`                    | `FoldR`                  | Both combine list elements with a function | `FoldL` associates from the left and behaves like an accumulator loop; `FoldR` associates from the right | Central higher-order abstraction                    | sum, product, list reconstruction               |
| `Map`                      | `Fold`                   | Both are higher-order list operations      | `Map` transforms each element independently; `Fold` accumulates a result across elements                 | Shows different reusable recursion patterns         | `{Map L F}` vs `{FoldL L F U}`                  |
| `abstract data type`       | data structure           | Both organize data and operations          | ADT exposes operations and hides representation                                                          | Supports representation independence                | stack, queue, dictionary                        |
| secure ADT                 | ordinary ADT             | Both hide representation                   | Secure ADT prevents clients from forging or inspecting representations                                   | Leads to wrapper/unwrapper and capability ideas     | secure dictionary                               |
| capability                 | ordinary value reference | Both can be passed around                  | Capability gives controlled authority to perform actions                                                 | Introduces programming-language security viewpoint  | procedure reference, wrapped value              |

**Program tracing table:**

| Tracing object                  | What to trace                                                                   | Common mistake                                                                     |                                                      |
| ------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Declarative operation           | Inputs → computation → result, with no dependence on past calls                 | Treating a function as declarative only because it has mathematical-looking syntax |                                                      |
| `IterLength`                    | State tuple → state transformation → last call                                  | Looking for a mutable loop counter                                                 |                                                      |
| Recursive list function         | `nil` case + `X                                                                 | Xr` case → result reconstruction                                                   | Forgetting that output shape follows input structure |
| Accumulator loop                | Initial accumulator → updated accumulator at each recursive call                | Treating accumulator as hidden state rather than explicit value                    |                                                      |
| `Append` with dataflow variable | Output list cell allocated before recursive call completes                      | Missing why the last call optimization can apply                                   |                                                      |
| Difference list operation       | Open tail variable → later binding → completed list                             | Appending the same difference list more than once                                  |                                                      |
| `Flatten`                       | Nested list traversal → append cost or difference-list cost                     | Counting only recursive calls and ignoring append cost                             |                                                      |
| Binary tree traversal           | Leaf/non-leaf cases → recursive calls → reconstruction or accumulation          | Traversing a tree as if it were a list                                             |                                                      |
| Ordered binary tree lookup      | Compare key → choose left or right subtree → found/notfound                     | Forgetting the orderedness invariant                                               |                                                      |
| `FoldL`                         | Accumulator moves left-to-right through list                                    | Confusing left association with right association                                  |                                                      |
| `FoldR`                         | Recursive right association or iteration over reversed list                     | Assuming every fold has the same space behavior                                    |                                                      |
| `ForAll` / `ForAllAcc`          | Higher-order loop body applied to each element                                  | Treating loop abstraction as imperative mutation                                   |                                                      |
| Declarative ADT                 | Operation call → hidden representation → new value                              | Assuming an ADT must use explicit state                                            |                                                      |
| Secure wrapper                  | Wrap representation → expose protected value → unwrap only inside trusted scope | Thinking representation hiding alone is security                                   |                                                      |
| Word frequency application      | Input text → tokenizer → dictionary update as returned value → output           | Treating file or GUI I/O as part of the declarative core                           |                                                      |

>

**Abstraction barrier record:**

| Abstraction layer           | Exposed interface                                        | Hidden representation                                          | What upper code depends on                | What should not change if representation changes |                                  |
| --------------------------- | -------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------ | -------------------------------- |
| Recursive function          | Function name and arguments                              | Base cases, recursive decomposition, accumulator parameters    | Mathematical input/output behavior        | Call sites using the function                    |                                  |
| List-processing abstraction | `Map`, `FoldL`, `FoldR`, loop procedures                 | Recursive traversal over `nil` and `X                          | Xr`                                       | Element-wise or accumulated behavior             | Programs using generic traversal |
| Tree abstraction            | Constructors, traversal operations, lookup/insert/delete | Tree shape and ordering invariant                              | Ordered search and update behavior        | Dictionary-like clients                          |                                  |
| Difference-list abstraction | Append-like operations                                   | Open tail variables                                            | Efficient sequence construction           | Client code should not bind internal tail twice  |                                  |
| Queue abstraction           | `NewQueue`, `Insert`, `Delete`, `IsEmpty`                | Pair of front/rear lists or another representation             | FIFO behavior                             | User code using queue operations                 |                                  |
| Dictionary abstraction      | `NewDictionary`, `Put`, `CondGet`, `Domain`              | List, tree, or other internal representation                   | Key/value behavior                        | Word frequency and other clients                 |                                  |
| Secure ADT                  | Wrapped values and exported operations                   | Wrapper/unwrapper pair, hidden scope                           | Controlled access to operations           | External code must not depend on representation  |                                  |
| Capability layer            | Unforgeable entity granting authority                    | Name, wrapper, procedure closure, or other protected mechanism | Only holder can perform permitted actions | Security policy approximation                    |                                  |

**Error prediction:**

**1. The reader may mistake declarative programming for “short functional-looking code,” but this chapter needs to distinguish syntax from independence, statelessness, and determinism.**

>

**2. The reader may remember recursive definitions while missing the difference between recursive structure and iterative control behavior.**

>

**3. The reader may trace accumulator programs as if the accumulator were mutable state, even though it is an ordinary value passed explicitly.**

>

**4. The reader may treat a clear declarative specification as automatically efficient, while the chapter repeatedly shows that transformation may be needed to obtain good time and space behavior.**

>

**5. The reader may use higher-order procedures as convenience functions while missing their role as abstraction mechanisms over traversal, combination, and control.**

>

**6. The reader may think data abstraction is mainly about hiding ugly code, while the chapter uses ADTs to separate interface, representation, security, and reasoning.**

>

**Learning Tips:** Chapter 3 is long because it is the programming-practice counterpart of Chapter 2’s semantic model. The useful procedure is to take one program and rewrite it several ways: direct recursion, accumulator style, difference-list style, higher-order style, and ADT style. For every transformation, record what stayed declarative, what changed in cost, and what reasoning burden was introduced. The examples on folds, queues, dictionaries, and secure ADTs should be traced as representation changes behind stable interfaces, not as unrelated data-structure exercises.

**Exercise 3.1.** Explain why the given `Abs` definition for real numbers does not work, and correct it.

**Training goal:** Oz numeric syntax, conditionals, small semantic diagnosis.

>

**Exercise 3.2.** Write a declarative program to calculate cube roots using Newton’s method with the improved-guess formula.

**Training goal:** iterative computation, numerical approximation, declarative loop design.

>

**Exercise 3.3.** Implement the half-interval method for finding roots of a continuous function.

**Training goal:** iterative computation, higher-order function argument, convergence reasoning.

>

**Exercise 3.4.** Redefine factorial so that it produces an iterative computation using state transformations from an initial state.

**Training goal:** accumulator design, last call optimization, iterative computation.

>

**Exercise 3.5.** Rewrite `SumList` so that it is iterative using the techniques developed for `Length`.

**Training goal:** list accumulator, bounded stack, recursive-to-iterative transformation.

>

**Exercise 3.6.** Write a state invariant for `IterReverse`.

**Training goal:** invariant formulation, accumulator correctness, reverse reasoning.

>

**Exercise 3.7.** Analyze an `Append` definition that recurses on the second argument and uses nested append calls; determine correctness, termination, and cost.

**Training goal:** recursive structure, termination analysis, hidden append cost.

>

**Exercise 3.8.** Write an iterative append without dataflow variables by using iterative reverse and an iterative append of the reversed list.

**Training goal:** dataflow-variable comparison, iterative list construction, value-only reformulation.

>

**Exercise 3.9.** Investigate whether every iterative operation using dataflow variables has an equivalent iterative version without dataflow variables.

**Training goal:** expressiveness analysis, dataflow variables, model comparison.

>

**Exercise 3.10.** Compare two definitions of `Leaf` used by `LengthL`, and explain what goes wrong when pattern matching is replaced by disequality.

**Training goal:** pattern matching vs equality/disequality, nested-list recognition, semantic precision.

>

**Exercise 3.11.** Explain what goes wrong when trying to append the same difference list more than once.

**Training goal:** difference-list invariants, single-assignment tails, representation discipline.

>

**Exercise 3.12.** Calculate the number of operations used by two versions of `Flatten`; analyze worst-case complexity with `n` elements and maximal nesting depth `k`.

**Training goal:** complexity analysis, append cost, difference-list improvement.

>

**Exercise 3.13.** Represent matrices as lists of integer lists, then define standard operations such as transposition and multiplication.

**Training goal:** list-of-list programming, structural recursion, matrix abstraction.

>

**Exercise 3.14.** Analyze the FIFO queue from the chapter: determine what happens when deleting from an empty queue and why the proposed `IsEmpty` definition using `S==E` is wrong.

**Training goal:** queue representation invariant, empty-queue behavior, equality vs structural state.

>

**Exercise 3.15.** Implement quicksort with difference lists to avoid the linear cost of append.

**Training goal:** divide-and-conquer, partitioning, difference-list optimization.

>

**Exercise 3.16.** Write a tail-recursive symbolic convolution function that takes two lists and returns the paired reverse combination, using no more than `n` recursive calls.

**Training goal:** tail recursion, reverse-passing technique, unification order-independence.

>

**Exercise 3.17.** Design a linguistic abstraction for currying in Oz by giving a translation scheme for function definitions and calls, then using the parser-generator tool to add it to Mozart.

**Training goal:** linguistic abstraction, currying, source transformation, parser extension.

>

**Cross-chapter recovery questions:**

**1. How will Chapter 3’s declarative techniques need to be rechecked when Chapter 4 adds threads but keeps single-assignment variables?**

**2. Which accumulator and stream-like patterns in this chapter become producer-consumer programs in Chapter 4?**

**3. How will ADTs and secure wrappers change when Chapter 6 adds explicit state and revocable capabilities?**

**4. How will the limits identified in `nondeclarative needs` motivate explicit state, objects, shared-state concurrency, and distributed programming?**

**Chapter mastery standards:**

* Able to define a `declarative operation` using independence, statelessness, and determinism.
* Able to distinguish recursive definition from iterative computation.
* Able to convert a simple recursive list function into accumulator style.
* Able to explain why dataflow variables can make some list programs iterative.
* Able to analyze the cost difference between naive append-based programs and difference-list programs.
* Able to use higher-order operations such as `Map`, `FoldL`, and `FoldR` as reusable recursion patterns.
* Able to design a simple declarative ADT and explain what representation it hides.

### Chapter 4. Declarative Concurrency

*Chapter 4 adds `thread` to the declarative model while preserving the central discipline of single-assignment variables. The result is not ordinary shared-state concurrency: threads communicate and synchronize by binding and waiting on `dataflow variables`, so many programs remain deterministic even when execution order is not fixed. The chapter develops this model through basic thread techniques, stream programming, producer-consumer pipelines, digital logic simulation, lazy execution, demand-driven computation, soft real-time examples, and comparisons with Haskell. It closes by marking the model’s limits: some applications require observable nondeterminism, explicit state, message passing, or shared-state synchronization.*

**Chapter dependencies:**

* Chapter 2 supplies `single-assignment store` + `dataflow variable` + kernel semantics → declarative base.
* Chapter 3 supplies `recursion` + `higher-order programming` + `streams` as values → programming technique.
* Chapter 4 adds `thread`: declarative model + independent activity → data-driven concurrent model.
* `thread` + `dataflow variable` → synchronization by need for bindings, not by locks.
* `stream` + producer/consumer → incremental declarative communication.
* `lazy execution` + dataflow variables → demand-driven concurrent model.
* Chapter 5 adds `port` to handle many-to-one communication and protocol state.
* Chapter 8 adds `state + concurrency` → races, locks, monitors, transactions, and nondeterministic interleavings.

**1. What changes when `thread` is added to the declarative computation model, and why can the result still be declarative?**

>

**2. How do `dataflow variables` provide synchronization without locks, shared mutable variables, or explicit condition variables?**

>

**3. Why does thread scheduling affect when results appear but not what final value is computed in deterministic declarative concurrency?**

>

**4. How do streams turn dataflow variables into a practical communication medium between producers, consumers, transducers, and pipelines?**

>

**5. What programming patterns become natural in the declarative concurrent model: order-determining concurrency, coroutining, generate-and-test, digital logic, or stream objects?**

>

**6. How does lazy execution change the producer-consumer relationship from data-driven computation to demand-driven computation?**

>

**7. Why are laziness and concurrency independent concepts, and what changes when both are combined with dataflow variables?**

>

**8. Where does declarative concurrency fail, and why do client/server systems, video display, and external interaction force the book toward message passing, explicit state, or shared-state concurrency?**

>

**Concept comparison table:**

| Concept A                   | Concept B                     | Shared point                            | Key difference                                                                              | Role in this chapter                                               | Minimal example                          |                               |
| --------------------------- | ----------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------- | ----------------------------- |
| `concurrency`               | `parallelism`                 | Both concern multiple activities        | Concurrency is a language concept; parallelism is an implementation/performance concept     | Prevents confusing logical independence with hardware simultaneity | two Oz threads on one or many processors |                               |
| `thread`                    | procedure call                | Both execute statements                 | A procedure call runs within current control; a thread creates independent activity         | New kernel concept of Chapter 4                                    | `thread S end`                           |                               |
| `dataflow synchronization`  | lock synchronization          | Both coordinate activities              | Dataflow waits for a variable to be bound; locks protect mutable critical sections          | Explains why this model stays declarative                          | `if X then ...` waits for `X`            |                               |
| `data-driven concurrency`   | `demand-driven concurrency`   | Both use threads and dataflow           | Data-driven producer computes eagerly; demand-driven computation is triggered by need       | Main contrast between streams and laziness                         | eager stream vs lazy stream              |                               |
| `stream`                    | list                          | Both are recursive sequences            | A stream may have an unbound tail that is filled incrementally                              | Core communication structure                                       | `X                                       | Xr`where`Xr` is not yet bound |
| `producer`                  | `consumer`                    | Both are stream processes               | Producer binds stream elements; consumer waits for and uses them                            | Basic concurrent pattern                                           | integer stream and summing consumer      |                               |
| `transducer`                | consumer                      | Both read streams                       | Transducer reads an input stream and produces an output stream                              | Enables pipelines                                                  | filter, map over stream                  |                               |
| `eager execution`           | `lazy execution`              | Both eventually compute values          | Eager computes when called; lazy computes when value is needed                              | Explains finite demand over infinite structures                    | `fun lazy {Ints N} ... end`              |                               |
| `lazy`                      | `nonstrict`                   | Both avoid unnecessary evaluation       | Lazy evaluates at most once and shares result; nonstrict may recompute                      | Clarifies Haskell comparison and advanced topics                   | `X={F 4}` used twice                     |                               |
| `declarative side effect`   | explicit state effect         | Both influence surrounding computation  | Declarative side effect binds dataflow variables consistently; explicit state mutates cells | Explains benign interaction under single assignment                | one lazy computation binds `Z`           |                               |
| `observable nondeterminism` | internal scheduling variation | Both involve different execution orders | Observable nondeterminism changes program-visible result; scheduling variation may not      | Boundary of declarative concurrency                                | client/server receiving from two clients |                               |
| `WaitTwo`                   | `Wait`                        | Both wait for variables                 | `Wait` waits for one variable; `WaitTwo` chooses whichever becomes bound first              | Shows why nondeterministic choice exceeds declarative concurrency  | server with two input streams            |                               |

**Program tracing table:**

| Tracing object                | What to trace                                                              | Common mistake                                                               |
| ----------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Thread creation               | Parent continues; new thread receives a statement to execute               | Assuming thread creation immediately runs before parent continues            |
| Dataflow wait                 | Operation needs an unbound variable → thread suspends → binding resumes it | Treating suspension as an exception or busy loop                             |
| Competing bindings            | Two threads bind the same variable consistently or inconsistently          | Forgetting that inconsistent bindings cause failure                          |
| Order-determining concurrency | Dependency chain `A → B → C → D` determines arithmetic order               | Thinking creation order determines computation order                         |
| Concurrent Fibonacci          | Number of created threads and scheduling overhead                          | Assuming more threads automatically means faster execution                   |
| Stream producer-consumer      | Producer binds list cells; consumer waits on tail variables                | Treating the stream as fully available from the start                        |
| Stream pipeline               | Producer → transducer → consumer, each with its own thread                 | Missing where back pressure appears through unbound tails                    |
| Multiple readers              | Several consumers read same stream without consuming it destructively      | Treating streams as queues with destructive dequeue                          |
| Programmed trigger            | Consumer calls zero-argument function to request next element              | Confusing trigger with a stream tail binding                                 |
| Lazy trigger                  | Demand for variable → computation starts → result is memoized              | Expecting lazy function body to run at definition time                       |
| Lazy stream                   | Only demanded prefix of stream is computed                                 | Trying to force the whole infinite stream                                    |
| Digital logic simulation      | Input signal bindings → gate threads → output signal bindings              | Treating gates as sequential function calls                                  |
| Soft real-time stream         | Producer timing, consumer timing, skipping or bounded response             | Assuming declarative determinism guarantees timing                           |
| Client/server limitation      | Two independent inputs require nondeterministic choice                     | Trying to merge independent streams declaratively without an ordering source |
| Video display limitation      | Need to detect newest available frame without waiting                      | Forgetting that ordinary dataflow wait cannot test unboundness immediately   |

>

**Abstraction barrier record:**

| Abstraction layer           | Exposed interface                 | Hidden representation                       | What upper code depends on                      | What should not change if representation changes              |
| --------------------------- | --------------------------------- | ------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------- |
| Thread abstraction          | `thread S end`                    | scheduler, ready queue, thread stacks       | independent activity begins                     | Declarative result when communication stays dataflow-based    |
| Dataflow abstraction        | variable binding and waiting      | suspension lists and store internals        | computations wait until needed values are known | Code should not depend on scheduling details                  |
| Stream abstraction          | list-like sequence with open tail | unbound tail variables, incremental binding | producer/consumer communication                 | Consumer logic should not depend on producer speed            |
| Pipeline abstraction        | stream-in / stream-out component  | internal thread structure                   | compositional transformation of streams         | Adjacent pipeline stages                                      |
| Programmed trigger          | zero-argument function interface  | internal continuation of producer state     | consumer requests next element                  | Consumer should not depend on producer implementation         |
| Lazy abstraction            | `fun lazy` result                 | by-need trigger and memoized result         | computation happens on demand                   | Client code should not force more than needed                 |
| Stream object abstraction   | procedure over streams            | internal stream protocol                    | message-like behavior without explicit state    | Later port objects can replace it                             |
| Digital circuit abstraction | gate procedure interface          | dataflow variables and gate threads         | signal behavior                                 | Circuit composition should not depend on scheduling           |
| Soft real-time abstraction  | timing-sensitive stream behavior  | delays, scheduler, skipping strategy        | bounded responsiveness                          | Correctness should separate value behavior from timing policy |
| Model boundary              | least expressive suitable model   | unavailable nondeterministic operations     | declarative reasoning remains valid             | Later stateful or message-passing designs                     |

**Error prediction:**

**1. The reader may mistake declarative concurrency for ordinary concurrent programming, but this chapter needs to distinguish deterministic dataflow concurrency from shared mutable interleaving.**

>

**2. The reader may remember that threads run “in parallel” while missing that data dependencies, not creation order, often determine when computation can proceed.**

>

**3. The reader may trace streams as if they were mutable queues, even though stream communication is built from single-assignment list tails.**

>

**4. The reader may think laziness and concurrency are the same incrementality mechanism, while the chapter separates data-driven production from demand-driven need.**

>

**5. The reader may assume all concurrent programs are nondeterministic, but this model permits many concurrent executions with the same observable result.**

>

**6. The reader may try to force client/server or video-display behavior into the declarative concurrent model, while those examples require nondeterministic choice, state, or immediate boundness tests.**

>

**Learning Tips:** Chapter 4 should be studied by drawing dependency graphs rather than only reading Oz code. For each example, mark which thread can proceed immediately, which thread is suspended, which variable will resume it, and whether different schedules can change the final result. Stream examples should be traced as open lists whose tails are gradually bound. Lazy examples should be traced by demand: which value is needed, which suspended computation is triggered, and whether the result is shared. The most useful comparison is to run the same producer-consumer idea in three forms: eager stream, programmed trigger, and lazy stream.

**Exercise 4.1.** Enumerate all possible executions of the example where two threads try to bind the same Boolean variable to different values, then modify the program so that abnormal terminations are avoided.

**Training goal:** thread semantics, single-assignment consistency, abnormal termination, schedule enumeration.

>

**Exercise 4.2.** Analyze whether an object allocated in a thread-related example becomes garbage after the procedure returns, using the semantics of threads and dataflow variables.

**Training goal:** garbage collection with suspended threads, reachability, semantic liveness.

>

**Exercise 4.3.** Compare sequential Fibonacci with the concurrent Fibonacci from the chapter, measure performance in Mozart, and count how many threads are created by `{Fib N}`.

**Training goal:** concurrency overhead, exponential thread creation, performance reasoning.

>

**Exercise 4.4.** Trace the order-determining concurrency example with variables `A`, `B`, `C`, and `D`, then compare it with the sequential version.

**Training goal:** dependency-driven execution, thread creation order vs computation order, deterministic result.

>

**Exercise 4.5.** Explain why `Wait` can be encoded by an operation that tests equality with `unit`, using the dataflow behavior of `if` and `==`.

**Training goal:** dataflow suspension, Boolean condition evaluation, wait semantics.

>

**Exercise 4.6.** Explain why using `Skip` to sum an integer stream gives a much smaller result than the full sum, in terms of thread scheduling.

**Training goal:** scheduling effects, stream skipping, soft real-time intuition.

>

**Exercise 4.7.** Reimplement programmed triggers using higher-order programming: the producer passes a zero-argument function that returns the next element and a new trigger function.

**Training goal:** programmed triggers, higher-order producer control, demand without threads.

>

**Exercise 4.8.** Analyze `Filter` with an unbound element inside the list, then compare sequential and threaded executions with `Show`, `Delay`, and later binding of the variable.

**Training goal:** dataflow behavior, suspension, deterministic function with schedule-dependent observation.

>

**Exercise 4.9.** Build an `n`-bit binary adder from a chain of full adders and verify it on several binary additions.

**Training goal:** digital logic simulation, full adder composition, dataflow signals.

>

**Exercise 4.10.** Explain why calling a lazy function three times may still wait three times, despite laziness.

**Training goal:** lazy function call vs shared lazy value, memoization boundary.

>

**Exercise 4.11.** Trace the concurrent behavior of lazy computations `MakeX`, `MakeY`, and `MakeZ` under different associations of addition and under a threaded subexpression.

**Training goal:** laziness and concurrency, demand structure, scheduling for fastest final result.

>

**Exercise 4.12.** Compare incrementality from eager concurrent producer-consumer streams with incrementality from lazy streams, and then analyze what happens when both concurrency and laziness are combined.

**Training goal:** data-driven vs demand-driven incrementality, producer-consumer comparison.

>

**Exercise 4.13.** Compare two lazy reverse definitions: one with an eager inner helper and one with a lazy inner helper; determine whether they compute the same result, have the same lazy behavior, and differ in efficiency.

**Training goal:** monolithic lazy computation, lazy granularity, efficiency of lazy definitions.

>

**Exercise 4.14.** Determine whether the straightforward lazy version of `Append` without dataflow variables is iterative.

**Training goal:** lazy execution, iterative computation, dataflow-variable comparison.

>

**Exercise 4.15.** Convert some declarative programs to lazy versions by making routines and built-ins lazy, then compare behavior and efficiency with eager versions.

**Training goal:** performance of laziness, strictness analysis motivation, eager vs lazy execution.

>

**Exercise 4.16.** Define an operation that requests the calculation of `X` but does not wait.

**Training goal:** by-need execution, triggering without blocking, lazy control.

>

**Exercise 4.17.** Generalize the Hamming problem to generate numbers of the form `p1^a1 p2^a2 ... pk^ak` for the first `k` primes and return the first `n` values.

**Training goal:** lazy streams, merging, demand-driven generation, generalized stream algorithms.

>

**Exercise 4.18.** Use abstract-machine reasoning to enumerate possible results of a concurrent program involving nested `TryFinally`, threads, exceptions, and browsing.

**Training goal:** concurrency and exceptions, schedule enumeration, abstract-machine control behavior.

>

**Exercise 4.19.** Explain why declarative concurrency cannot implement the general client/server example, while a declarative `Merge` can read from three input streams.

**Training goal:** deterministic merge vs nondeterministic choice, model limitation, stream discipline.

>

**Exercise 4.20.** Analyze the worst-case bounds of a lazy queue and explain how logarithmically many suspensions can accumulate on a variable.

**Training goal:** lazy data structures, suspension chains, worst-case complexity.

>

**Cross-chapter recovery questions:**

**1. How will Chapter 4’s stream communication be rechecked when Chapter 5 introduces ports and many-to-one message-passing communication?**

**2. Which deterministic properties of declarative concurrency will break when Chapter 8 combines explicit state with threads?**

**3. How will lazy execution and demand-driven computation return in Chapter 12’s computation spaces and constraint propagation?**

**4. How will Chapter 13 formalize this chapter’s `thread`, `dataflow synchronization`, `by-need` execution, and partial termination in abstract-machine terms?**

**Chapter mastery standards:**

* Able to explain why `thread + dataflow variable` can add concurrency without observable nondeterminism.
* Able to trace a dataflow wait and identify which binding resumes which suspended thread.
* Able to distinguish thread creation order from dependency-determined computation order.
* Able to trace a producer-consumer stream as an incrementally bound list.
* Able to distinguish data-driven stream computation from demand-driven lazy computation.
* Able to explain why a lazy value may be shared while repeated lazy calls may recompute.
* Able to identify when a problem requires nondeterministic choice, ports, explicit state, or shared-state concurrency rather than declarative concurrency.

### Chapter 5. Message-Passing Concurrency

*Chapter 5 adds one new concept to the declarative concurrent model: an asynchronous communication channel. The result is more expressive than declarative concurrency because many clients can send messages to the same server without the server knowing in advance which client will act next. This expressiveness has a cost: message arrival order can become observable, so the model is no longer fully declarative. The chapter manages that cost by building `port objects`, message protocols, component diagrams, state diagrams, and a design methodology for concurrent systems, then tests the method on a lift control system and compares it with Erlang-style concurrency.*

**Chapter dependencies:**

* Chapter 4 limitation: `thread` + `dataflow variable` cannot express general client/server nondeterminism.
* Chapter 5 adds `port`: declarative concurrency + asynchronous channel → message-passing concurrency.
* `port` + associated stream → many-to-one communication with observable message order.
* `port` + stream object → `port object`, a disciplined way to encapsulate protocol state.
* `message protocol` + `state diagram` → design method for concurrent components.
* `port object` + component diagram → lift control system as a realistic case study.
* Direct use of ports is more expressive but harder to reason about than the `port object` abstraction.
* Erlang comparison: process + mailbox + selective receive ≈ port object model with language-level support.
* Chapter 6 shifts emphasis from ports as long-term memory to `cell` as explicit state; Chapter 8 later combines state + concurrency directly.

**1. What limitation of declarative concurrency forces the introduction of message passing?**

>

**2. What exactly does a `port` add to the kernel language, and why does this single concept make the model nondeterministic?**

>

**3. How does a port’s associated stream preserve some continuity with Chapter 4’s stream programming while changing the communication pattern from one-to-one to many-to-one?**

>

**4. Why does the book introduce `port objects` instead of encouraging direct programming with raw ports everywhere?**

>

**5. How do simple message protocols help structure interaction among concurrent components?**

>

**6. What does the program-design methodology add beyond simply writing threads and sends?**

>

**7. How does the lift control system show the need for component diagrams, message protocols, state diagrams, scheduling decisions, and iteration?**

>

**8. What does the Erlang comparison reveal about processes, mailboxes, selective receive, reliability, and asynchronous system design?**

>

**Concept comparison table:**

| Concept A                | Concept B                       | Shared point                                               | Key difference                                                                                                              | Role in this chapter                               | Minimal example                         |
| ------------------------ | ------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------- |
| `stream object`          | `port object`                   | Both process an input stream through a recursive procedure | Stream object usually has a known producer; port object accepts messages from any sender holding the port                   | Main abstraction shift from Chapter 4 to Chapter 5 | `NewPortObject Init Fun`                |
| `port`                   | `stream`                        | Both are connected to a sequence of messages               | Stream is the visible sequence; port is the asynchronous entry point that appends to it                                     | Kernel concept added by the chapter                | `{NewPort S P}` and `{Send P Msg}`      |
| one-to-one communication | many-to-one communication       | Both move information between concurrent activities        | One-to-one preserves producer structure; many-to-one permits nondeterministic arrival from multiple senders                 | Removes Chapter 4 client/server limitation         | several clients send to one server port |
| asynchronous send        | synchronous call                | Both transfer information to another component             | Asynchronous send does not wait for a reply; synchronous call waits for a result                                            | Explains independent component execution           | `{Send P M}` vs `{F X}`                 |
| message                  | procedure argument              | Both carry data to code                                    | Message is placed in a channel and handled later; procedure argument is processed in the current call                       | Separates communication from call stack            | `query(foo Ans)`                        |
| message protocol         | data type                       | Both constrain legal values                                | Protocol describes legal message forms and interaction sequences                                                            | Organizes component communication                  | `ball`, `query(...)`, `move(...)`       |
| component diagram        | state diagram                   | Both describe a concurrent system                          | Component diagram shows entities and communication links; state diagram describes each entity’s behavior over time          | Design methodology                                 | lift, floor, controller components      |
| `port object`            | object with state               | Both maintain behavior across messages or calls            | Port object’s state is carried through stream processing; stateful object uses explicit state cells later                   | Bridge toward Chapter 6 and 7                      | transition function `Fun State Msg`     |
| nondeterminism           | scheduling variation            | Both concern multiple possible executions                  | Nondeterminism changes observable message order; scheduling variation may leave value behavior unchanged                    | Marks nondeclarative boundary                      | two clients send to one port            |
| mailbox                  | port stream                     | Both collect incoming messages                             | Erlang mailbox supports selective receive; basic port stream is processed in stream order unless extra abstraction is built | Erlang comparison                                  | `receive Pattern -> Body end`           |
| selective receive        | pattern matching on stream head | Both use patterns                                          | Selective receive can skip unmatched messages and keep them in mailbox                                                      | Explains extra power of Erlang receive             | receive desired message later           |
| direct port programming  | port-object discipline          | Both use ports                                             | Direct use exposes lower-level control; port-object discipline confines interaction to protocols                            | Reasoning tradeoff                                 | termination detection, Ping-Pong        |

**Program tracing table:**

| Tracing object             | What to trace                                                                  | Common mistake                                                                 |
| -------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `NewPort`                  | Create stream `S`, create port entry `P`, remember current stream tail         | Thinking the port is itself the message list                                   |
| `Send`                     | Sender continues immediately; message is appended to port stream               | Treating send as a procedure call that waits for a reply                       |
| Two senders, one port      | Sender order + scheduler order → observable stream order                       | Assuming final stream order is determined by program text alone                |
| Port object creation       | Create port stream, start thread to fold over stream, return port              | Forgetting that the returned value is only the entry point                     |
| `NewPortObject`            | Input stream → `FoldL` with state transition function → evolving logical state | Treating the state transition as mutable cell update                           |
| Stateless port object      | For each message, call handler procedure                                       | Assuming every port object needs explicit state                                |
| Player ball example        | Message `ball` received → random choice → send to another player               | Missing that random choice and message ordering make behavior nondeterministic |
| Query protocol             | Send `query(... Ans)` → server eventually binds `Ans`                          | Confusing asynchronous request with synchronous return                         |
| Broadcast query pattern    | `Map` over ports → each message carries an answer variable → collect answers   | Forgetting that replies arrive by dataflow binding, not by return values       |
| Component diagram          | Component instances + ports + possible message directions                      | Drawing functions rather than independent concurrent entities                  |
| State diagram              | Current state + received message → action + next state                         | Listing messages without specifying state-dependent behavior                   |
| Lift controller            | Floor request / lift state / scheduled stops → next command                    | Treating lift control as a single sequential algorithm                         |
| Direct port use            | Raw streams and sends without object abstraction                               | Losing protocol boundaries and making reasoning global                         |
| Shared-thread port objects | Single serialized thread handles several object names                          | Calling a blocking computation inside one object and stopping all others       |
| Termination detection      | Subthread starts/ends → sends counting messages → collector detects zero       | Assuming stream sum zero always means all subthreads have stopped              |
| Erlang receive             | Mailbox stream → find matching message → remove it, leave others               | Treating receive as simple head-of-stream pattern matching                     |
| Receive with timeout       | Race between message match and timeout event                                   | Forgetting timeout introduces nondeterministic timing behavior                 |

>

**Abstraction barrier record:**

| Abstraction layer             | Exposed interface                               | Hidden representation                                     | What upper code depends on                       | What should not change if representation changes                           |
| ----------------------------- | ----------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------- |
| Port layer                    | `{NewPort S P}`, `{Send P M}`                   | mutable tail pointer to stream end                        | Messages sent to `P` appear on associated stream | User code should not inspect the port’s internal mutable store             |
| Port object layer             | port value as public entry point                | stream, thread, transition loop, state accumulator        | messages are processed according to protocol     | Client code should not depend on internal stream layout                    |
| Protocol layer                | allowed message forms                           | pattern matching and handler internals                    | legal interactions between components            | Component clients should not rely on private messages                      |
| Component layer               | ports and message interfaces                    | internal state, subcomponents, local wires                | component behavior through messages              | Changing internal implementation should preserve protocol                  |
| State diagram layer           | states, accepted messages, actions, next states | implementation of state transition function               | every message is handled in the right state      | Code structure can change while state behavior remains                     |
| Lift system layer             | floor calls, lift movement, door operations     | controller scheduling, timers, internal messages          | service behavior of the lift system              | Users of the system should not depend on controller layout                 |
| Erlang process layer          | `spawn`, send, `receive`                        | process mailbox, scheduler, selective receive translation | messages can be sent to process identifiers      | Erlang program behavior should not depend on mailbox implementation        |
| Direct port-programming layer | raw port and stream operations                  | explicit stream manipulation                              | low-level concurrent coordination                | Higher abstraction can replace direct usage without changing goal behavior |
| Nondeterministic-choice layer | wait for whichever event occurs first           | exceptions, `IsDet`, timeout alarms, helper threads       | observable choice among enabled events           | Client protocol should specify how nondeterminism is handled               |

**Error prediction:**

**1. The reader may mistake message passing for ordinary procedure calling, but this chapter needs to distinguish asynchronous send from synchronous return.**

>

**2. The reader may remember that a port has a stream while missing that the port’s internal tail pointer introduces mutable state into the semantic model.**

>

**3. The reader may trace port objects as if they were still declarative stream objects, even though many senders can make arrival order observable.**

>

**4. The reader may treat message protocols as informal comments, while the chapter uses them as the main device for making concurrent programs understandable.**

>

**5. The reader may draw component diagrams without state diagrams, but message-passing systems require both communication structure and per-component behavior.**

>

**6. The reader may think Erlang’s `receive` is just `case` on the first message, while selective receive can search the mailbox and leave unmatched messages in place.**

>

**Learning Tips:** Chapter 5 should be read by tracing messages rather than only values. For every example, write down the port, its associated stream, the messages sent to it, and the state transition that handles each message. The lift control system should be read as a design exercise: specification → components → protocols → state diagrams → implementation → testing. The Erlang section is best treated as a semantic comparison: process identifiers and mailboxes correspond to ideas already present in the port-object model, but selective receive adds an important extra abstraction.

**Exercise 5.1.** Analyze the Ping-Pong program with port objects sharing one thread when two or more initial messages are inserted; determine how the infinite message exchange is interleaved.

**Training goal:** shared-thread port objects, asynchronous calls, message interleaving, scheduling analysis.

>

**Exercise 5.2.** Explore the lift control system: evaluate replacing per-lift controllers with one shared controller, then modify lift and controller behavior so lifts stop only at requested floors.

**Training goal:** component design, controller architecture, behavioral change from protocol redesign.

>

**Exercise 5.3.** Extend the lift control system for fault tolerance: blocked lifts, failed lifts, failed floors, maintenance mode, and simultaneous failures.

**Training goal:** fault-tolerant component design, timeouts, reconfiguration, failure detection, distributed-system preparation.

>

**Exercise 5.4.** Modify the termination-detection example by sending `1` before running a subthread and `~1` after it finishes; explain why detecting stream sum zero can be incorrect.

**Training goal:** termination detection, concurrent accounting, port stream reasoning, counterexample construction.

>

**Exercise 5.5.** Analyze `ConcFilter`, the concurrent version of `Filter`, under different inputs, delays, and unbound variables; determine displayed output, possible orders, determinism, and complexity.

**Training goal:** nondeterministic concurrent execution, dataflow variables, concurrent filtering, complexity comparison.

>

**Exercise 5.6.** Study the translation of Erlang’s `receive` with timeout: verify its limiting cases and design an alternative translation using a unique timeout message.

**Training goal:** selective receive semantics, timeout behavior, translation design, mailbox stream transformation.

>

**Exercise 5.7.** Implement Erlang-style `receive` as a `Mailbox` control abstraction with `new`, `send`, and `receive`, using predicate/body pairs and optional timeout delay.

**Training goal:** control abstraction, selective receive, mailbox API design, pattern-and-guard simulation.

>

**Exercise 5.8.** Analyze the limits of stream communication with a `NameServer` that registers names and returns fresh streams for named servers; explain why the solution is not practical.

**Training goal:** stream communication limits, server references, name service design, need for explicit state.

>

**Cross-chapter recovery questions:**

**1. How will Chapter 5’s `port` as long-term memory need to be rechecked when Chapter 6 introduces `cell` as the general explicit-state concept?**

**2. Which parts of port-object design become object-oriented structure in Chapter 7, especially message dispatch, local state, and active objects?**

**3. How will message-passing concurrency compare with shared-state concurrency in Chapter 8 when synchronization moves from protocols to locks, monitors, and transactions?**

**4. How will the lift control system return in Chapter 11 when components are placed in different processes and partial failure becomes unavoidable?**

**Chapter mastery standards:**

* Able to explain why adding `port` makes the model more expressive and no longer fully declarative.
* Able to trace `{NewPort S P}` and `{Send P M}` through the associated stream and internal port tail.
* Able to distinguish stream objects from port objects and one-to-one communication from many-to-one communication.
* Able to design a simple port object using an initial state and a state transition function.
* Able to specify a message protocol for a concurrent component.
* Able to draw a component diagram and a state diagram for a small message-passing system.
* Able to explain how Erlang’s process, mailbox, send, and `receive` relate to the port-object model.
* Able to identify when direct port programming is useful and why it is harder to reason about than disciplined port-object programming.

### Chapter 6. Explicit State

*Chapter 6 adds `cell` and `assignment` to the earlier declarative model, making state visible inside the computation model rather than only in the programmer’s mental trace. The chapter begins by separating `implicit state` from `explicit state`, then defines the stateful kernel language through `NewCell`, `Exchange`, `@`, and `:=`. This new concept is introduced because some abstractions need long-lived private memory without changing their public interface. The chapter then studies data abstractions with state, stateful collections, invariant-based reasoning, programming in the large, and case studies that show both the modular power and the reasoning cost of state.*

**Chapter dependencies:**

* Chapter 3 already used `accumulator` as implicit state; Chapter 6 makes state part of the model.
* Chapter 5’s `port` already used mutable memory internally; Chapter 6 generalizes this as `cell`.
* `cell` + `Exchange` → explicit state with identity, lifetime, and mutable content.
* `explicit state` + `encapsulation` → long-term memory without extra procedure arguments.
* `stateful ADT` + `object style` → direct preparation for Chapter 7 object-oriented programming.
* `state` + `invariant` → disciplined reasoning despite time-varying behavior.
* `state` + `team development` → programming in the large, components, specifications, testing.
* Chapter 8 adds `thread + cell` → shared-state concurrency, races, locks, monitors, transactions.
* Chapter 11 rechecks state under distribution: mutable consistency becomes expensive.

**1. What problem does `explicit state` solve that cannot be solved cleanly by threading extra arguments through declarative code?**

>

**2. How does the chapter define state as a sequence of values in time, and why does this definition include both accumulator-style state and cell-based state?**

>

**3. What does adding `cell` to the kernel language change about the computation model?**

>

**4. Why is `Exchange` the primitive operation, while `@` and `:=` can be treated as convenient derived operations?**

>

**5. How does explicit state improve modularity, and why does that same modularity make programs harder to reason about?**

>

**6. What are the major ways to build data abstractions with and without explicit state: ADT style, object style, declarative object, stateful object, and secure ADT?**

>

**7. How do stateful collections—arrays, dictionaries, extensible arrays, extensible dictionaries, queues, cells, and collectors—show the trade-off between expressiveness, efficiency, and memory behavior?**

>

**8. How does the method of invariants recover part of the reasoning discipline lost when mutable state is introduced?**

>

**Concept comparison table:**

| Concept A                | Concept B                  | Shared point                              | Key difference                                                                                                         | Role in this chapter                    | Minimal example                               |
| ------------------------ | -------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | --------------------------------------------- |
| `implicit state`         | `explicit state`           | Both are sequences of values over time    | Implicit state is carried mentally or through arguments; explicit state has a model-level container with long lifetime | Defines why Chapter 6 is needed         | accumulator in `SumList` vs `NewCell` counter |
| `cell`                   | `dataflow variable`        | Both can be referred to by names          | Dataflow variable is single-assignment; cell content can change repeatedly                                             | Main model contrast                     | `X=3` vs `C:=3`                               |
| `cell name`              | cell content               | Both are involved in cell use             | Cell name identifies the container; content is the current value inside it                                             | Prevents confusing identity and value   | `C` vs `@C`                                   |
| `Exchange`               | `:=`                       | Both update cell content                  | `Exchange` atomically returns old content and installs new content; `:=` only updates                                  | Kernel primitive vs convenient syntax   | `X=C:=Y`                                      |
| `@`                      | `Exchange`                 | Both can read a cell                      | `@C` reads current content; `Exchange` reads and writes atomically                                                     | Explains why read and write are derived | `X=@C`                                        |
| `stateful model`         | declarative model          | Both extend the same kernel-language base | Stateful model adds mutable store; declarative model has only single-assignment store                                  | Model boundary of Chapter 6             | `NewCell`, `Exchange`                         |
| stateful abstraction     | threaded-state abstraction | Both preserve information across steps    | Stateful abstraction hides memory; threaded-state abstraction exposes state in arguments/results                       | Modularity trade-off                    | hidden counter vs `StateIn` / `StateOut`      |
| ADT style                | object style               | Both build data abstractions              | ADT style groups operations separately from values; object style groups value and operations together                  | Main abstraction design contrast        | dictionary module vs object with methods      |
| declarative object       | stateful object            | Both combine value and operations         | Declarative object returns new versions; stateful object preserves identity while changing content                     | Prepares Chapter 7                      | immutable set object vs mutable account       |
| capability               | revocable capability       | Both grant controlled authority           | Revocable capability uses explicit state to disable later access                                                       | Security use of state                   | `RObj` forwarding until revoked               |
| array                    | tuple                      | Both are indexed collections              | Tuple is fixed and declarative; array is indexed and mutable                                                           | Stateful collection design              | `A.I := X`                                    |
| dictionary               | record                     | Both associate keys with values           | Record is declarative and fixed by fields; dictionary is mutable and supports dynamic update                           | Indexed collection trade-off            | `Dictionary.put`                              |
| invariant                | assertion                  | Both express program facts                | Invariant must hold at selected program points through state changes; assertion states a condition at a point          | Reasoning with mutable state            | loop invariant over cell contents             |
| programming in the small | programming in the large   | Both involve program design               | Small programs fit one mind; large programs require specifications, modules, testing, and team coordination            | Chapter 6’s system-building turn        | component boundary                            |

**Program tracing table:**

| Tracing object                  | What to trace                                                             | Common mistake                                                          |
| ------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Declarative `SumList`           | Sequence of `(Xs#S)` values through recursive calls                       | Thinking state only exists when the language has cells                  |
| Cell creation                   | `{NewCell X C}` → fresh cell name → mutable store entry                   | Treating the initial content as the cell identity                       |
| Cell read                       | `X=@C` → cell name lookup → current content bound to `X`                  | Thinking read changes the cell                                          |
| Cell assignment                 | `C:=Y` → cell name lookup → content replaced by `Y`                       | Treating assignment as binding a store variable                         |
| `Exchange`                      | Old content bound to `X`; new content installed atomically                | Implementing read then write where atomic exchange is required          |
| Hidden counter                  | Procedure closure captures cell → each call reads/updates same cell       | Recreating the cell on each call                                        |
| Stateful `SumCount`             | Function call → internal cell update → returned sum                       | Adding extra arguments and losing encapsulation                         |
| Declarative object              | Operation returns a new object value                                      | Expecting identity to stay the same after “change”                      |
| Stateful object                 | Same identity, internal cell changes over time                            | Reasoning about it as if it were a pure value                           |
| Revocable capability            | Cell initially holds capability; revoker replaces it with error procedure | Treating revocation as deleting the client reference                    |
| Array update                    | Index selection → cell content update                                     | Confusing array identity with element content                           |
| Dictionary update               | Key lookup / insertion → mutable dictionary state changes                 | Assuming record-style immutability                                      |
| Collector ADT                   | Tail variable or tail cell → append collected item → final list           | Losing memory behavior behind the abstraction                           |
| Loop invariant                  | Initial state → body preserves invariant → final condition yields result  | Treating invariant as a comment rather than a proof obligation          |
| Word frequency                  | Token stream → dictionary updates → final counts                          | Treating stateful dictionary as only an efficiency detail               |
| Simulation                      | User/site state changes round by round                                    | Ignoring that state represents evolving system history                  |
| External reference finalization | Resource becomes unreachable → finalizer closes external file/resource    | Assuming garbage collection alone releases external resources correctly |

>

**Abstraction barrier record:**

| Abstraction layer        | Exposed interface                                  | Hidden representation                                   | What upper code depends on                 | What should not change if representation changes |
| ------------------------ | -------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------ |
| Cell layer               | `NewCell`, `Exchange`, `@`, `:=`                   | mutable store entry, cell name, internal representation | cell identity and current content behavior | Program behavior under reads and writes          |
| Counter abstraction      | `Bump`, `Get`, or a procedure call                 | private cell holding count                              | observable counter sequence                | Client interface when representation changes     |
| Stateful ADT             | exported operations                                | cells, arrays, dictionaries, internal invariants        | operation contract                         | External clients                                 |
| Object-style abstraction | object value with operations/method-like interface | internal cells and local procedures                     | same identity with evolving behavior       | Call protocol                                    |
| Secure ADT               | protected operations, wrappers, capabilities       | hidden name values, closures, revocation cell           | authorized access only                     | Security boundary                                |
| Revocable capability     | revocable object + revoker                         | cell storing current capability procedure               | revocation changes future behavior         | Capability users before revocation               |
| Stateful collection      | collection operations                              | array/dictionary/list/cell representation               | collection behavior and cost contract      | Application code                                 |
| Invariant layer          | invariant assertion                                | proof of preservation across state changes              | correctness argument                       | Implementation restructuring                     |
| Component layer          | public specification                               | internal state, tests, private design choices           | specified behavior                         | Team-level dependencies                          |
| External resource layer  | file/resource abstraction                          | OS handle, finalizer, lifetime management               | resource appears properly opened/closed    | Client program logic                             |

**Error prediction:**

**1. The reader may mistake explicit state for “any changing sequence,” but this chapter needs to distinguish mental or threaded state from model-level mutable storage.**

>

**2. The reader may remember `:=` as the main operation while missing that `Exchange` is the primitive semantic operation used to combine read and write atomically.**

>

**3. The reader may trace cells as if a cell name were the current content, even though the name gives identity and the content changes over time.**

>

**4. The reader may treat state as merely an efficiency optimization, while the chapter uses it to change modularity: private memory can be added without changing interfaces.**

>

**5. The reader may think encapsulation fully restores declarative reasoning, but hidden state still creates history-dependent behavior that must be controlled by invariants.**

>

**6. The reader may assume objects require explicit state, while the chapter’s declarative object examples show that object style and state are related but distinct concepts.**

>

**Learning Tips:** Chapter 6 should be read by tracing the same abstraction in three forms: declarative state threaded through arguments, explicit state hidden in a cell, and object-style state behind an interface. The useful table has four columns: cell identity, current content, operation called, and invariant after the operation. For data abstractions, record whether the representation is bundled or unbundled, secure or forgeable, declarative or stateful, and whether identity must persist after update. The section on invariants should not be skipped; it is the chapter’s main answer to the reasoning cost introduced by mutable state.

**Exercise 6.1.** Compare the chapter’s definition of state as a time sequence with Scott McCloud’s definition of comics as juxtaposed images in deliberate sequence, focusing on final result, sequence, time, space, and transitions.

**Training goal:** conceptual definition of state, sequence analysis, temporal reasoning.

>

**Exercise 6.2.** Rewrite `SumList` so that the state formerly encoded in recursive arguments is represented by cells.

**Training goal:** implicit state vs explicit state, cell-based rewriting, accumulator replacement.

>

**Exercise 6.3.** Use concurrency to emulate an updatable container through a command stream with `access(X)` and `assign(X)`, then use it to count calls in `SumList` and analyze whether it can be encapsulated.

**Training goal:** state via stream process, concurrency-as-container, encapsulation limits, comparison with cells.

>

**Exercise 6.4.** Implement ports in terms of cells, treating ports as stateful unbundled ADTs with `NewPort` and `Send`.

**Training goal:** implementing message passing with state, port representation, cell-based abstraction.

>

**Exercise 6.5.** Evaluate the claim that secure ADTs depend only on procedure values and name values, not on explicit state; determine whether explicit state contributes to security.

**Training goal:** secure abstraction, procedure hiding, name values, state and authority.

>

**Exercise 6.6.** Extend the declarative objects of Section 6.4.2 so that they preserve identity after state changes.

**Training goal:** declarative object design, identity, object/value distinction.

>

**Exercise 6.7.** Redesign `Revocable` so both the revocable capability and the revoker are one-argument procedures, allowing revocation to be applied recursively even to revokers.

**Training goal:** revocable capabilities, higher-order security abstraction, stateful authority control.

>

**Exercise 6.8.** Implement two collector ADTs using the two representations described in the text, then compare allocation, inactive memory, garbage-collection pressure, and concurrent correctness.

**Training goal:** stateful ADT implementation, memory behavior, collector representation, concurrent-safe `Exchange`.

>

**Exercise 6.9.** Explain and code the call-by-name `swap(i, a[i])` example using arrays as tuples of cells, then explain the counterintuitive behavior in terms of repeated argument evaluation.

**Training goal:** call by name, delayed l-value evaluation, arrays as cells, state interaction.

>

**Exercise 6.10.** Redo the `swap` example using call by need, then modify the call-by-need example from Section 6.4.4 so a lazy function calls its argument at most once and only when needed.

**Training goal:** call by need, memoization, lazy evaluation with state, contrast with call by name.

>

**Exercise 6.11.** Compare tuples, records, arrays, and dictionaries across usage scenarios, evaluating their performance and expressiveness trade-offs.

**Training goal:** indexed collection selection, expressiveness/efficiency trade-off, representation choice.

>

**Exercise 6.12.** Modify the extensible array so that it can extend in both upward and downward directions.

**Training goal:** extensible data structure design, indexing invariants, mutable collection growth.

>

**Exercise 6.13.** Implement a generalized dictionary that can use any value as a key, for example by storing key-value pairs and searching with `==`.

**Training goal:** dictionary representation, general key comparison, performance trade-off.

>

**Exercise 6.14.** Use invariant assertions to prove the correctness of the proof rules for `while` and `for` loops.

**Training goal:** invariant reasoning, loop proof rules, stateful correctness.

>

**Exercise 6.15.** Define a block abstraction with a `break` operation that exits the block immediately, handles nested blocks and exceptions correctly, and does not affect threads created inside the block.

**Training goal:** control abstraction, exception-based escape, block semantics, interaction with threads.

>

**Exercise 6.16.** Rewrite the word frequency application from Section 3.9.4 using the stateful dictionary version from Section 6.8.2.

**Training goal:** stateful application design, dictionary updates, declarative-to-stateful refactoring.

>

**Exercise 6.17.** Modify the word-of-mouth simulation so each user consults only a bounded network of acquaintances rather than any user in the whole population.

**Training goal:** simulation modeling, bounded knowledge, small-world network assumptions, stateful system evolution.

>

**Exercise 6.18.** Modify the word-of-mouth simulation so site performance stays constant up to a threshold and then decreases inversely with the number of users.

**Training goal:** stateful simulation, performance modeling, dynamic load effects.

>

**Exercise 6.19.** Explore test-driven development, compare it with incremental development, and develop one or more applications to evaluate a balanced combined approach.

**Training goal:** programming in the large, testing discipline, incremental process, development methodology.

>

**Cross-chapter recovery questions:**

**1. How will Chapter 6’s `cell` model become the default foundation for Chapter 7’s objects, classes, identity, and mutable attributes?**

**2. Which reasoning guarantees from Chapters 2–4 are weakened by explicit state, and which can be partially recovered through encapsulation and invariants?**

**3. How will the chapter’s stateful abstractions become more dangerous when Chapter 8 combines cells with independently scheduled threads?**

**4. How will the limitations of state in distributed systems return in Chapter 11, where mutable consistency must cross process and network boundaries?**

**Chapter mastery standards:**

* Able to distinguish `implicit state`, `threaded state`, and `explicit state`.
* Able to trace `NewCell`, `Exchange`, `@`, and `:=` through cell identity and cell content.
* Able to explain why explicit state supports modular long-term memory.
* Able to identify the reasoning cost introduced by hidden mutable history.
* Able to compare ADT style and object style for building data abstractions.
* Able to design a simple stateful collection and state its representation invariant.
* Able to use invariant assertions to reason about a loop or stateful abstraction.

### Chapter 7. Object-Oriented Programming

*Chapter 7 adds `class` and `inheritance` to the stateful model, turning object-style data abstraction into a full object-oriented computation model. The chapter does not treat object-oriented programming as “using classes” in a superficial sense; it asks what classes add beyond stateful objects, ADTs, port objects, component composition, and higher-order functions. The central mechanism is incremental abstraction: a class can define a complete data abstraction, then another class can inherit, override, specialize, wrap, or extend it. The chapter then checks this power against its costs: fragile invariants, static vs dynamic binding, multiple inheritance conflicts, the substitution property, implementation complexity, Java’s design choices, and active objects that combine class-based programming with message-passing concurrency.*

**Chapter dependencies:**

* Chapter 6 gives `cell` + `object style` → object as encapsulated state + operations.
* Chapter 7 adds `class`: reusable object construction + method table + attributes → object-oriented computation model.
* `inheritance` adds incremental abstraction: existing class + differences → new class.
* `dynamic binding` + `self` → method selection depends on receiver and late-bound behavior.
* `static binding` + explicit superclass access → controlled reuse of ancestor behavior.
* `multiple inheritance` → more reuse, but method and attribute conflicts must be resolved.
* `substitution property` → inheritance must preserve the ancestor’s contract to be safe.
* Chapter 5 returns through `active objects`: class-defined behavior + port-object concurrency.
* Chapter 8 rechecks objects under shared-state concurrency, where method calls and state updates can interleave.

**1. What does object-oriented programming add beyond stateful data abstraction from Chapter 6?**

>

**2. Why is `inheritance` introduced as incremental data abstraction rather than only as a code reuse device?**

>

**3. How do `class`, `object`, `attribute`, `method`, `self`, and `message` divide the responsibilities of an object-oriented program?**

>

**4. What is the difference between a class as a complete data abstraction and a class as an incremental data abstraction?**

>

**5. Why do static binding, dynamic binding, method access control, and `self` determine the meaning of inheritance?**

>

**6. Why does the substitution property matter more than the syntactic fact that one class inherits from another?**

>

**7. How does object-oriented programming relate to component-based programming, object-based programming, higher-order programming, and the principle that “everything is an object”?**

>

**8. How does implementing the object system in the stateful model make the semantics of classes and objects precise?**

>

**9. What does the Java comparison clarify about classes, interfaces, inheritance, visibility, exceptions, and sequential object-oriented programming?**

>

**10. How do active objects combine object-oriented programming with message-passing concurrency, and why is this combination not the same as ordinary shared-state concurrency?**

>

**Concept comparison table:**

| Concept A                | Concept B                   | Shared point                               | Key difference                                                                                                               | Role in this chapter                                       | Minimal example                                     |
| ------------------------ | --------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------- |
| `object`                 | `ADT value`                 | Both provide abstraction over data         | Object bundles state and operations; ADT keeps values and operations more separate                                           | Motivates object style as a default data-abstraction style | counter object vs dictionary ADT                    |
| `object`                 | `class`                     | Both belong to object-oriented programming | Object is an instance with state; class defines object structure and behavior                                                | Basic object system distinction                            | `{New Counter init(0)}`                             |
| `attribute`              | `cell`                      | Both store changeable information          | Attribute is a named cell associated with each object or class                                                               | Connects OOP to explicit state                             | `attr val` and `val:=@val+1`                        |
| `method`                 | procedure                   | Both execute code with arguments           | Method is selected through an object and receives access to attributes and `self`                                            | Defines object behavior                                    | `meth inc(Value) ... end`                           |
| `message`                | method head                 | Both involve method invocation             | Message is the call sent to an object; method head is the pattern selected to handle it                                      | Explains dynamic dispatch                                  | `{C inc(3)}`                                        |
| `self`                   | object name                 | Both can refer to an object                | `self` denotes the current receiver and supports late-bound calls inside methods                                             | Enables polymorphic recursion through methods              | `{self m(...)}`                                     |
| static binding           | dynamic binding             | Both select methods                        | Static binding fixes the class-level method; dynamic binding chooses according to receiver behavior                          | Central inheritance control                                | `ClassName,method(...)` vs `self method(...)`       |
| inheritance              | composition                 | Both reuse existing behavior               | Inheritance opens the ancestor’s implementation to extension; composition wraps an existing component behind a new interface | Main design trade-off                                      | subclassing `Account` vs wrapping an `Account`      |
| subtype view             | structure view              | Both interpret inheritance                 | Subtype view respects substitutability; structure view uses inheritance only to factor code                                  | Governs safe use of inheritance                            | `VerboseAccount` vs `AccountWithFee`                |
| overriding               | wrapping                    | Both modify behavior                       | Overriding replaces inherited method behavior; wrapping surrounds method calls with extra behavior                           | Shows two extension techniques                             | trace wrapper around calls                          |
| method conflict          | attribute conflict          | Both appear in multiple inheritance        | Method conflict concerns which behavior is visible; attribute conflict concerns how state is shared or duplicated            | Main multiple-inheritance difficulty                       | two parents define `m` or `x`                       |
| abstract class           | concrete class              | Both are classes                           | Abstract class is not meant to instantiate directly; concrete class creates objects                                          | Used in class hierarchy design                             | `Figure` vs `Line`                                  |
| object-based programming | object-oriented programming | Both use objects                           | Object-based programming lacks inheritance; object-oriented programming includes inheritance                                 | Locates OOP among models                                   | objects without classes vs classes with inheritance |
| active object            | port object                 | Both process messages asynchronously       | Active object uses class-defined methods; port object uses a transition function or procedure                                | Combines Chapter 5 and Chapter 7                           | `NewActive Class Init`                              |
| class value              | ordinary value              | Both can be passed and stored in Oz        | Class value carries method table, attributes, and inheritance structure                                                      | Explains higher-order class programming                    | class passed to `New`                               |

**Program tracing table:**

| Tracing object                  | What to trace                                                             | Common mistake                                                      |
| ------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Object creation                 | Class value → attribute cells → initialization message → object reference | Treating `New` as record construction only                          |
| Method call                     | Object + message → method lookup → method body with attributes and `self` | Treating method call as an ordinary procedure call with no receiver |
| Attribute access                | Attribute name → object state cell → current content                      | Confusing attribute name with current attribute value               |
| `self` call                     | Current receiver → method lookup possibly in subclass                     | Assuming `self` always means the host class                         |
| Static method access            | Named ancestor method → fixed method body                                 | Expecting ordinary dynamic dispatch                                 |
| Method overriding               | Subclass method table shadows ancestor method                             | Assuming both methods automatically run                             |
| `otherwise` method              | Unmatched message → catchall method receives full message                 | Treating undefined-method behavior as a syntax error                |
| First-class message             | Message record stored or passed → later sent to object                    | Assuming messages must be written literally at call site            |
| First-class attribute           | Attribute name computed → attribute accessed or assigned                  | Forgetting this can break encapsulation                             |
| Multiple inheritance            | Parent class list → inherited methods/attributes → conflict resolution    | Assuming all inherited names combine automatically                  |
| Constructor-like initialization | `init` message establishes object invariant                               | Forgetting that uninitialized objects may violate class assumptions |
| Substitution example            | Subclass object used where superclass object expected                     | Checking only method availability, not behavioral contract          |
| Method wrapper                  | Original object/class call surrounded by tracing/extra behavior           | Confusing wrapper with overriding                                   |
| Object-system implementation    | Class syntax → class value record → method table + attribute list         | Treating class syntax as semantically primitive                     |
| Java mapping                    | Java class/interface/visibility → concepts in the chapter’s object system | Treating Java’s restrictions as universal OOP semantics             |
| Active object                   | Port stream → serialized message handling → method invocation on object   | Treating active object calls as ordinary synchronous calls          |
| Josephus active-object solution | Ring of active objects → kill message circulation → survivor              | Losing message order and termination condition                      |

>

**Abstraction barrier record:**

| Abstraction layer                  | Exposed interface                                       | Hidden representation                                     | What upper code depends on                        | What should not change if representation changes  |
| ---------------------------------- | ------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| Object layer                       | method calls                                            | attribute cells, method table, class record               | object responds to supported messages             | Client code should not depend on attribute layout |
| Class layer                        | class name/value, `New`, method definitions, attributes | wrapped class record with method table and attribute list | class instantiates objects with expected behavior | Object clients                                    |
| Method-dispatch layer              | `{Obj Message}`                                         | lookup cache, static/dynamic binding machinery            | correct method chosen for message                 | External call syntax                              |
| Attribute layer                    | attribute names and assignment syntax                   | per-object cells or class-level cells                     | attributes behave as encapsulated state           | Method bodies if storage changes                  |
| Inheritance layer                  | `from Parent` or parent list                            | inherited method table and attribute combination          | subclass extends ancestor behavior                | Clients relying on ancestor contract              |
| Access-control layer               | public/private/protected-style access                   | names, wrappers, scoping, method visibility checks        | only permitted code can access members            | Component security boundary                       |
| Method-wrapping layer              | wrapped object or class behavior                        | wrapper method table and forwarding logic                 | original behavior plus added concern              | Clients using object protocol                     |
| Active-object layer                | asynchronous object invocation                          | port, thread, serialized method execution                 | messages are processed one at a time              | Client protocol                                   |
| Java language layer                | Java-like class/interface constructs                    | specific restrictions on classes, visibility, and typing  | Java concepts map to object-system ideas          | Conceptual comparison                             |
| Object-system implementation layer | class and object operations                             | records, wrappers, cells, method tables, apply protocol   | semantic behavior of class syntax                 | Programmer-facing object model                    |

**Error prediction:**

**1. The reader may mistake object-oriented programming for “programming with classes,” but this chapter needs to distinguish class syntax from object data abstraction, state, polymorphism, and inheritance.**

>

**2. The reader may remember inheritance as code reuse while missing that unsafe inheritance breaks invariants and violates substitutability.**

>

**3. The reader may treat `self` as a fixed reference to the class where a method is written, even though dynamic binding can route a `self` call through subclass behavior.**

>

**4. The reader may think multiple inheritance is merely “inherit from two parents,” while method conflicts, attribute conflicts, and sharing choices make the semantics difficult.**

>

**5. The reader may use first-class attributes or `otherwise` methods as convenience mechanisms without noticing that they can weaken encapsulation and interface discipline.**

>

**6. The reader may think active objects are just objects in threads, while the abstraction serializes message handling and separates concurrency from method definition.**

>

**Learning Tips:** Chapter 7 should be read by drawing three diagrams for each example: an object diagram showing attribute cells, a class diagram showing inheritance links, and a method-lookup trace showing where the selected method comes from. For inheritance examples, write the intended contract of the parent class before examining the subclass; this makes the substitution property concrete. For the implementation section, translate class syntax mentally into class values, method tables, attribute lists, wrappers, and object state. For active objects, keep two traces: the object method trace and the port-message trace.

**Exercise 7.1.** Define `New2`, a variant of `New` that creates an object from a class without requiring an initial message.

**Training goal:** object creation, initialization protocol, object invariant risk.

>

**Exercise 7.2.** Design a linguistic abstraction for Java-style `protected` methods or attributes using name values and functors to represent package-level visibility and descendant access.

**Training goal:** access control, protected visibility, name values, functor-based package modeling.

>

**Exercise 7.3.** Rewrite `TraceNew2` so that the tracing class has no external references, while preserving the method-wrapping behavior.

**Training goal:** method wrapping, external reference removal, class-based tracing abstraction.

>

**Exercise 7.4.** Generalize the object-system implementation so that it handles static binding and inheritance with any number of superclasses.

**Training goal:** object-system semantics, static binding, multiple inheritance, method lookup implementation.

>

**Exercise 7.5.** Redo the message protocols from Section 5.3 using active objects instead of port objects.

**Training goal:** active objects, protocol translation, message-passing abstraction, class-defined behavior.

>

**Exercise 7.6.** Rework the Flavius Josephus problem using the sequential stateful model, writing versions with and without short-circuiting, then compare these versions with the active-object and data-driven concurrent solutions, including asymptotic behavior in `n` and `k`.

**Training goal:** model comparison, active objects vs declarative concurrency vs sequential state, complexity analysis.

>

**Exercise 7.7.** Design and implement an object system with classes and inheritance but without explicit state, starting from declarative objects if useful.

**Training goal:** orthogonality of inheritance and state, declarative object systems, class semantics without cells.

>

**Exercise 7.8.** Design an object-oriented language with upward inheritance, or generalization, and higher-order programming; evaluate whether design patterns can be programmed as abstractions and whether additional operations are needed.

**Training goal:** research-level language design, upward inheritance, design patterns as abstractions, higher-order class construction.

>

**Cross-chapter recovery questions:**

**1. How will Chapter 7’s object and class abstractions need to be rechecked when Chapter 8 introduces threads that can invoke stateful objects concurrently?**

**2. Which parts of object-oriented design are better modeled by component composition from Chapter 6 rather than inheritance from Chapter 7?**

**3. How will active objects return in Chapter 11 when object communication crosses distributed boundaries and partial failure becomes unavoidable?**

**4. How will Chapter 13 give semantic form to the object-system implementation, method dispatch, state, threads, and active objects inside the general computation model?**

**Chapter mastery standards:**

* Able to distinguish `object`, `class`, `attribute`, `method`, `message`, and `self`.
* Able to trace object creation through class value, attribute cells, initialization, and resulting object reference.
* Able to trace method invocation through receiver, message, method lookup, attribute access, and `self`.
* Able to explain dynamic binding vs static binding in inheritance.
* Able to state the substitution property and use it to judge whether an inheritance design is safe.
* Able to compare inheritance with component composition and identify when inheritance creates excessive coupling.
* Able to explain why multiple inheritance raises method-conflict and attribute-sharing problems.
* Able to trace an active object as class-defined behavior executed through serialized message passing.

### Chapter 8. Shared-State Concurrency

*Chapter 8 combines two concepts that were previously studied separately: `thread` and `cell`. Chapter 4 showed that concurrency can remain declarative when communication happens through dataflow variables; Chapter 6 showed that explicit state gives identity, memory, and modular stateful abstractions. Once independently scheduled threads can access shared mutable cells, program behavior depends on interleavings, and ordinary reasoning breaks unless operations are grouped into larger atomic actions. The chapter’s main progression is therefore: shared cells create races; `lock` protects critical regions; `monitor` coordinates waiting threads; `transaction` gives abortable atomicity; Java shows how these ideas appear in a mainstream shared-state language.*

**Chapter dependencies:**

* Chapter 4 supplies `thread` + scheduler interleaving → independent activities.
* Chapter 6 supplies `cell` + assignment → mutable state with identity.
* Chapter 8 combines them: `thread` + `cell` → shared-state concurrency.
* Shared cells + interleaving → race conditions, nondeterminism, and lost invariants.
* `lock` + critical region → larger atomic action from smaller cell operations.
* `monitor` = lock + wait/notify → cooperation over shared objects.
* `transaction` = atomic action + commit/abort → rollback and isolation.
* Java comparison: `thread` + `synchronized` + `wait/notify` → mainstream shared-state discipline.
* Chapter 11 reopens the problem under distribution: shared state + network + partial failure → consistency and fault tolerance.

**1. What exactly becomes difficult when `thread` and `cell` are combined in one computation model?**

>

**2. Why does interleaving make even simple cell operations hard to reason about once several threads share the same cells?**

>

**3. What does it mean to group small atomic operations into a larger atomic action, and why is that the central design move of this chapter?**

>

**4. How do `lock` and `critical region` prevent races, and what new problems do they introduce, such as deadlock, granularity, contention, and excessive serialization?**

>

**5. Why are monitors needed after locks, and how do `wait`, `notify`, and `notifyAll` support cooperation among threads that share an object?**

>

**6. How do transactions differ from locks and monitors, and why do `commit`, `abort`, rollback, isolation, and priority matter?**

>

**7. How does reasoning with invariant assertions change when a data abstraction can be accessed concurrently?**

>

**8. What does Java’s concurrent part clarify about practical shared-state programming: threads, object monitors, `synchronized` methods, partial synchronization, and heavyweight-thread trade-offs?**

>

**Concept comparison table:**

| Concept A                     | Concept B                     | Shared point                                              | Key difference                                                                                                             | Role in this chapter                              | Minimal example                            |
| ----------------------------- | ----------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------ |
| `declarative concurrency`     | `shared-state concurrency`    | Both use threads                                          | Declarative concurrency communicates through bindings; shared-state concurrency communicates through mutable cells         | Main contrast with Chapter 4                      | stream producer-consumer vs shared counter |
| `message-passing concurrency` | `shared-state concurrency`    | Both can express concurrent systems                       | Message passing favors isolated agents and protocols; shared state favors common repositories protected by synchronization | Contrast with Chapter 5                           | port object vs shared object               |
| `cell operation`              | `atomic action`               | Both execute without visible internal steps at some level | Cell operation is small; atomic action groups many operations into one protected unit                                      | Main abstraction strategy                         | `@`, `:=`, `Exchange` vs lock block        |
| interleaving                  | nondeterminism                | Both describe multiple possible executions                | Interleaving is the ordered mix of operations; nondeterminism means the chosen interleaving may affect observable result   | Explains races                                    | two threads update one counter             |
| race condition                | ordinary scheduling variation | Both depend on schedule                                   | Race condition changes correctness; harmless scheduling variation only changes timing                                      | Defines the danger of shared state                | lost update                                |
| `lock`                        | critical region               | Both protect shared state                                 | Lock is the synchronization object; critical region is the protected code                                                  | Basic atomic-action mechanism                     | `lock L then S end`                        |
| simple lock                   | reentrant lock                | Both provide mutual exclusion                             | Reentrant lock lets a thread already inside the lock enter again                                                           | Needed for nested protected calls                 | method calls another protected method      |
| lock                          | monitor                       | Both enforce exclusive access                             | Monitor adds wait points so threads can cooperate over conditions                                                          | Moves from exclusion to coordination              | bounded buffer                             |
| monitor wait                  | dataflow wait                 | Both suspend a thread                                     | Dataflow wait waits for binding; monitor wait releases a lock and waits for notification                                   | Main semantic difference between Chapters 4 and 8 | `Wait X` vs `M.wait`                       |
| `notify`                      | `notifyAll`                   | Both wake waiting threads                                 | `notify` wakes one; `notifyAll` wakes all, often requiring all to recheck conditions                                       | Monitor design trade-off                          | bounded buffer with one or many waiters    |
| monitor condition             | single wait set               | Both organize waiting threads                             | Condition variables split waiters into separate sets                                                                       | More selective monitor semantics                  | `nonempty` and `nonfull`                   |
| transaction                   | lock                          | Both create atomicity                                     | Lock protects a region while it runs; transaction can abort and restore state                                              | Adds rollback                                     | database-like update                       |
| commit                        | abort                         | Both exit a transaction                                   | Commit makes changes visible; abort restores old state                                                                     | Transaction control boundary                      | `commit(Res)` vs `abort(Exc)`              |
| isolation                     | mutual exclusion              | Both limit interference                                   | Mutual exclusion prevents simultaneous entry; isolation makes concurrent transactions behave as if sequential              | Transaction-level guarantee                       | serializable transactions                  |
| durability                    | atomicity                     | Both belong to ACID                                       | Atomicity concerns all-or-nothing execution; durability concerns persistence after shutdown                                | Full database transaction concept                 | stable storage                             |
| Java `synchronized`           | Oz lock/monitor               | Both protect shared objects                               | Java associates monitor behavior with objects and methods                                                                  | Practical language comparison                     | synchronized method                        |

**Program tracing table:**

| Tracing object               | What to trace                                                                          | Common mistake                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Two-thread interleaving      | Operation sequence from both threads → one global interleaving                         | Thinking each thread runs to completion before the other         |
| Shared counter without lock  | Read old value → compute new value → write value; repeat for both threads              | Treating read-modify-write as one atomic operation               |
| `Exchange` counter attempt   | Old content variable + new expression dependency → why it may not work as intended     | Assuming `X+1` is available before `X` is bound                  |
| Lock-protected update        | Acquire lock → read cell → compute → write → release lock                              | Releasing lock before the invariant is restored                  |
| Reentrant lock               | Thread enters lock → calls code that reenters same lock → exits nested regions         | Treating reentry as a second competing acquisition               |
| Deadlock example             | Thread A holds lock 1 waits for lock 2; thread B holds lock 2 waits for lock 1         | Looking only at individual locks, not the lock-order graph       |
| Linda tuple space            | Insert tuple → read/take matching tuple → shared associative memory                    | Confusing tuple-space coordination with ordinary variable lookup |
| Bounded buffer with locks    | Producer/consumer state variables under exclusive access                               | Busy waiting or holding a lock while waiting incorrectly         |
| Monitor `wait`               | Check condition → enqueue waiter → release monitor lock → suspend → reacquire          | Forgetting that the condition must be checked again after wakeup |
| Monitor `notify`             | Change state → wake one waiter → current thread eventually exits lock                  | Assuming notified thread immediately runs inside the monitor     |
| Monitor with conditions      | Wait on `nonempty` or `nonfull` → notify matching condition                            | Using one wait set and waking unrelated threads                  |
| Transaction start            | Create transaction record, timestamp, save dictionary, result variable                 | Treating transaction as just a lock block                        |
| Transactional cell access    | Get lock → save old state once → perform operation                                     | Saving state on every repeated access unnecessarily              |
| Transaction conflict         | Higher-priority transaction requests locked cell → lower-priority one may halt/restart | Ignoring priority and restart protocol                           |
| Transaction commit           | Unlock all cells without restoration; bind result to commit value                      | Forgetting to release locks on every exit path                   |
| Transaction abort            | Restore saved cell states → unlock cells → report abort                                | Treating abort as ordinary exception without rollback            |
| Read/write locks             | Multiple read locks or one write lock                                                  | Letting a reader coexist with a writer                           |
| Java synchronized method     | Receiver object monitor acquired → method body → monitor released                      | Assuming all methods are synchronized automatically              |
| Java partial synchronization | Copy protected state under lock → call external method outside lock                    | Holding object lock while calling unknown external code          |
| Java bounded buffer          | `put` waits for nonfull; `get` waits for nonempty; notifications wake waiters          | Using `if` instead of `while` around `wait`                      |

>

**Abstraction barrier record:**

| Abstraction layer             | Exposed interface                         | Hidden representation                                   | What upper code depends on                                  | What should not change if representation changes |
| ----------------------------- | ----------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------ |
| Shared cell layer             | `@`, `:=`, `Exchange`                     | mutable store and scheduler interleaving                | cell content changes over time                              | Correctness of cell operations                   |
| Lock layer                    | acquire/release or protected block        | waiting queue, owner thread, reentry count              | mutual exclusion for critical region                        | Protected code behavior                          |
| Critical-region layer         | code executed under lock                  | lock implementation and queue order                     | no other thread enters same protected region simultaneously | Invariant restoration                            |
| Monitor layer                 | `lock`, `wait`, `notify`, `notifyAll`     | lock + wait set + scheduling policy                     | cooperative access to shared object                         | Shared-object protocol                           |
| Condition layer               | condition variables with `wait`/`notify`  | multiple wait sets per monitor                          | selective waking of relevant waiters                        | Bounded-buffer protocol                          |
| Transaction layer             | `Trans`, transactional cell operations    | transaction record, saved states, locks, priority queue | commit/abort and isolation behavior                         | Transaction body logic                           |
| Transaction manager layer     | `getlock`, `savestate`, `commit`, `abort` | active object, priority queues, transaction state cells | transactional protocol correctness                          | User-level transaction API                       |
| Java object monitor layer     | `synchronized`, `wait`, `notifyAll`       | per-object monitor, JVM scheduler                       | serialized access to synchronized methods/blocks            | Java method contracts                            |
| Invariant layer               | invariant assertions at quiescent points  | proof over all protected exits                          | data abstraction remains coherent                           | Internal synchronization mechanism               |
| Concurrency abstraction layer | lock, monitor, transaction                | synchronization state and scheduling                    | larger atomic actions                                       | Program-level behavior under interleaving        |

**Error prediction:**

**1. The reader may mistake shared-state concurrency for “explicit state plus faster execution,” but this chapter needs to distinguish parallel activity from nondeterministic interleaving over shared cells.**

>

**2. The reader may treat a read-modify-write sequence as atomic because it appears as one line of code, even though it consists of several smaller operations.**

>

**3. The reader may remember locks as a general solution while missing that lock granularity, lock order, and calls to external code can create contention or deadlock.**

>

**4. The reader may use monitor `wait` as if it simply pauses inside the lock, while the crucial point is that it releases the monitor lock and later reacquires it.**

>

**5. The reader may use `notify` as if it transferred control immediately, while the ordinary monitor semantics require the notified thread to compete for the lock later and recheck the condition.**

>

**6. The reader may treat transactions as “locks with nicer syntax,” while the chapter’s transaction model adds saved state, abort, restart, priority, and isolation.**

>

**Learning Tips:** Chapter 8 should be studied with interleaving tables. For each example, write the operations of each thread in separate rows, then merge them into possible global orders. When a synchronization mechanism is introduced, record exactly which interleavings it removes and which failures remain. For locks and monitors, draw the protected invariant: what must be true when no thread is inside the protected abstraction. For transactions, trace the saved state, locks held, transaction status, and final result: `commit`, `abort`, or restart.

**Exercise 8.1.** Generalize the chapter’s interleaving-count argument to `n` threads, each doing `k` operations, then use Stirling’s approximation to derive a closed-form approximation.

**Training goal:** interleaving explosion, combinatorial reasoning, scheduler nondeterminism.

>

**Exercise 8.2.** Analyze the attempted concurrent counter using one cell and `Exchange`, explain why it fails, propose a simple fix, then give a solution that works without dataflow variables.

**Training goal:** concurrent counter, `Exchange`, dataflow dependency, race-free increment design.

>

**Exercise 8.3.** Investigate the job-based concurrent model, where blocking operations are split into jobs that run in new threads, and judge whether it is a good language model.

**Training goal:** maximal concurrency, blocking behavior, efficiency/model-design trade-off.

>

**Exercise 8.4.** Define `SlowNet3`, a slow network wrapper that preserves call order within each thread but does not impose one global order among different threads.

**Training goal:** simulated network delay, ordering constraints, per-thread ordering vs global ordering.

>

**Exercise 8.5.** Implement or analyze the chapter’s missing exercise on concurrency abstractions where the shared-state approach is most natural, comparing it with message-passing or declarative alternatives where appropriate.

**Training goal:** model selection, shared-state design judgment, abstraction comparison.

>

**Exercise 8.6.** Implement CSP-style synchronous channels with rendezvous semantics: `Channel.new`, `Channel.send`, nondeterministic multi-receive, and guarded multi-receive.

**Training goal:** synchronous message passing, rendezvous atomicity, nondeterministic receive, guarded communication.

>

**Exercise 8.7.** Compare Linda’s pattern-based tuple-space `read` with Erlang’s pattern-based `receive`, explaining commonalities, differences, and suitable application domains.

**Training goal:** tuple spaces, selective receive, coordination abstraction, message-passing comparison.

>

**Exercise 8.8.** Design termination detection for a hierarchical thread space using monitors instead of the port-based algorithm from Chapter 5.

**Training goal:** monitor-based coordination, hierarchical thread termination, shared-state protocol design.

>

**Exercise 8.9.** Reimplement the bounded buffer using monitors with condition variables, then extend the monitor implementation so a monitor can have several wait sets.

**Training goal:** monitor conditions, bounded buffer, selective notification, wait-set design.

>

**Exercise 8.10.** Rewrite the transaction-based `Sum` operation as a series of smaller transactions that lock only a few cells at a time, using a partial-sum representation.

**Training goal:** transaction granularity, long-running transaction decomposition, concurrent progress.

>

**Exercise 8.11.** Optimize the transaction manager’s `getlock` and `savestate` protocols so repeated use of a cell within one transaction sends the fewest necessary messages.

**Training goal:** transaction protocol optimization, lock caching, saved-state caching.

>

**Exercise 8.12.** Extend the transaction manager with read locks and write locks, allowing multiple readers or one writer for each transactional cell.

**Training goal:** read/write lock design, isolation refinement, concurrent read optimization.

>

**Exercise 8.13.** Extend the transaction manager so each individual transaction body can itself be concurrent, using a termination-detection algorithm.

**Training goal:** concurrent transaction bodies, transaction termination detection, nested thread management.

>

**Exercise 8.14.** Design and implement a concurrency abstraction combining monitors and transactions: it should support `wait` / `notify` and also abort without changing state; evaluate whether it is useful.

**Training goal:** monitor-transaction composition, abortable waiting, abstraction design.

>

**Exercise 8.15.** Design a transactional computation model as a language extension to shared-state concurrency, with simple formal semantics, low overhead when transactions are unused, and preservation of useful model properties such as compositionality.

**Training goal:** research-level computation-model design, transaction semantics, implementation evaluation.

>

**Cross-chapter recovery questions:**

**1. How does Chapter 8’s shared-state concurrency revise Chapter 4’s claim that concurrency can remain deterministic under dataflow synchronization?**

**2. Which object abstractions from Chapter 7 become unsafe when their methods can interleave across multiple threads?**

**3. How will Chapter 11 change the meaning of shared state when mutable consistency crosses process and network boundaries?**

**4. How will Chapter 13 express `thread`, `cell`, `lock`, `monitor`, and `transaction` in the general computation model?**

**Chapter mastery standards:**

* Able to explain why `thread + cell` creates races and observable nondeterminism.
* Able to enumerate possible interleavings for a small two-thread program.
* Able to identify why a read-modify-write sequence is unsafe without atomicity.
* Able to trace lock acquisition, critical-region execution, and lock release.
* Able to explain monitor `wait`, `notify`, and `notifyAll`, including why conditions must be rechecked.
* Able to distinguish simple locks, reentrant locks, monitors, and transactions.
* Able to trace transaction commit/abort through saved state, locks, restoration, and result binding.
* Able to explain how Java’s `synchronized`, `wait`, and `notifyAll` instantiate the shared-state concurrency model.

### Chapter 9. Relational Programming

*Chapter 9 adds `choice`, `fail`, and `Solve` to the earlier declarative model, shifting programming from computing one value to describing a relation whose solutions are found by search. A relational program can often be used in more than one direction: instead of giving all inputs and asking for an output, the program may leave some arguments unknown and ask the system to find bindings that make the relation true. This power depends on unification, choice points, search trees, and encapsulated search. The chapter then applies the model to numeric examples, puzzles, natural language parsing, grammar interpretation, relational databases, Prolog, and planning, while also marking the boundary where constraint programming and stateful interaction become necessary.*

**Chapter dependencies:**

* Chapter 2 supplies `single-assignment store` + unification-like binding → logical variables can be partially known.
* Chapter 3 supplies declarative procedures → relations are procedures with less fixed input/output direction.
* Chapter 4 supplies laziness and streams → `Solve` returns a lazy list of solutions.
* Chapter 5 supplies message passing → later exercises use ports to communicate out of encapsulated search.
* Chapter 8 supplies transactions → `abort` becomes comparable with relational `fail`.
* Chapter 9 adds `choice` + `fail` + `Solve` → relational computation model.
* `relation` + `search tree` → nondeterministic alternatives become programmable solution spaces.
* Chapter 12 implements `choice`, `fail`, and `Solve` with `computation spaces` and generalizes them to constraints.

**1. What changes when a procedure is read as a `relation` rather than as a one-directional function?**

>

**2. What do `choice` and `fail` add to the declarative model, and why do they create a search tree?**

>

**3. Why does relational programming need `Solve`, and why must search be encapsulated rather than global?**

>

**4. How do `SolveOne`, `SolveAll`, lazy solution lists, and search strategy change the way the same relation is executed?**

>

**5. How do numeric examples, puzzles, and small combinatorial problems show the difference between specifying a relation and controlling a search?**

>

**6. Why is relational programming well suited to ambiguous parsing, definite clause grammars, grammar interpreters, and meta-interpreters?**

>

**7. How do relational databases connect facts, queries, updates, transactions, and logical formulas?**

>

**8. How does the Prolog comparison clarify the relation between pure logic programming, extralogical control features, stateful database updates, and constraint programming?**

>

**Concept comparison table:**

| Concept A               | Concept B              | Shared point                             | Key difference                                                                                                               | Role in this chapter                             | Minimal example                           |
| ----------------------- | ---------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------- |
| `function`              | `relation`             | Both connect arguments and results       | Function has a preferred input/output direction; relation can be queried with unknowns in several positions                  | Main shift of the chapter                        | append as function vs append as relation  |
| `choice`                | ordinary conditional   | Both select among alternatives           | Conditional selects by known Boolean; `choice` creates alternatives for search                                               | Builds the search tree                           | `choice 1 [] 2 [] 3 end`                  |
| `fail`                  | exception / abort      | Both stop a current path                 | `fail` rejects the current search alternative; exception/abort belongs to control or transaction semantics                   | Defines relational rejection                     | impossible constraint                     |
| `Solve`                 | direct execution       | Both run code                            | Direct execution follows one path; `Solve` encapsulates and controls all paths                                               | Search interface                                 | `{Solve F}`                               |
| encapsulated search     | global backtracking    | Both explore alternatives                | Encapsulated search isolates bindings and choices; global backtracking exposes search effects broadly                        | Modularity and compositionality                  | nested `Solve`                            |
| one-solution search     | all-solutions search   | Both use the same relation               | One takes the first solution; all-solutions forces the whole lazy list                                                       | Search policy distinction                        | `SolveOne` vs `SolveAll`                  |
| lazy solution list      | eager result list      | Both hold solutions                      | Lazy list computes solutions on demand                                                                                       | Keeps search controllable                        | first solution of a large search          |
| unification             | equality test          | Both compare structures                  | Unification can bind unknown variables; equality only checks known values                                                    | Basic relational operation                       | `X=person(Name Age)`                      |
| logic variable          | dataflow variable      | Both may be unbound                      | Logic variable participates in search alternatives; dataflow variable waits for one binding                                  | Distinguishes Chapter 4 from Chapter 9           | unknown color in clothing puzzle          |
| search tree             | execution trace        | Both describe possible computation paths | Search tree branches at choices and prunes on failure                                                                        | Main operational visualization                   | clothing design tree                      |
| relational programming  | logic programming      | Both use relations and logical meaning   | Relational programming here emphasizes encapsulated search in Oz; Prolog has its own layered model and extralogical features | Section 9.3 and 9.7 comparison                   | Oz `Solve` vs Prolog backtracking         |
| negation as failure     | logical negation       | Both express “not”                       | Negation as failure depends on finite failure of search, not full classical negation                                         | Prolog and planner examples                      | `not(F)` succeeds if `F` has no solutions |
| definite clause grammar | ordinary parser        | Both parse sequences                     | DCG-like grammar is a relation over token lists and remainders                                                               | Natural language parsing and grammar interpreter | noun phrase relation                      |
| meta-interpreter        | virtual machine        | Both execute another language            | Meta-interpreter reuses host primitives such as unification and search; virtual machine executes its own instructions        | Grammar interpreter section                      | parser interpreter                        |
| relational database     | mutable database       | Both store facts                         | Relational database queries are logical formulas; updates change long-lived stored relations                                 | Database section and exercises                   | `edge(X Y)`                               |
| constraint programming  | relational programming | Both search over unknowns                | Constraints propagate domain information and provide stronger solving mechanisms                                             | Chapter 12 extension                             | finite-domain constraints                 |

**Program tracing table:**

| Tracing object            | What to trace                                                           | Common mistake                                                       |
| ------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `choice` expression       | Choice point → selected branch → remaining alternatives                 | Treating `choice` as random selection                                |
| `fail`                    | Current branch rejected → search returns to next alternative            | Treating failure as a fatal program error                            |
| `Digit`                   | Ten alternatives → depth-first enumeration                              | Expecting all choices to be explored simultaneously                  |
| `TwoDigit`                | First digit choice → second digit choice → number constructed           | Missing why choice order changes solution order                      |
| Clothing design example   | Variable bindings → color choices → rejected conflicts → solution tuple | Treating constraints as assignments rather than conditions on search |
| `Solve`                   | Run relational script in encapsulated search → lazy solution list       | Expecting bindings inside search to leak outside                     |
| `SolveOne`                | Demand only first list cell                                             | Forcing the whole search unintentionally                             |
| `SolveAll`                | Force entire lazy solution list                                         | Forgetting that infinite or huge search may not terminate            |
| Nested `Solve`            | Inner search isolated from outer search                                 | Assuming global backtracking across both searches                    |
| Relation call             | Known and unknown arguments → unification → possible bindings           | Assuming every argument must be known before call                    |
| Natural language parser   | Grammar relation + input list + output remainder                        | Treating parsing as deterministic lookahead only                     |
| Ambiguous grammar         | Several parse trees become several solutions                            | Assuming ambiguity is a parser error                                 |
| Grammar interpreter       | Encoded grammar + input → relation calls through meta-interpreter       | Forgetting that host unification performs object grammar matching    |
| Database query            | Relation facts + logical formula → all satisfying tuples                | Treating query as a single key lookup                                |
| Database update           | Add/retract fact → future queries change                                | Ignoring transaction-like consistency requirements                   |
| Prolog `bagof` comparison | Query variable scope → grouped solution list                            | Confusing existential variables with free grouping variables         |
| `cut`                     | Prunes remaining alternatives                                           | Treating it as logically harmless                                    |
| Forward chaining planner  | Match rule condition → choose rule → apply add/remove actions → repeat  | Confusing forward chaining with backward-chaining proof search       |
| Negation in planner       | Solve positive prefix → test negated query has no solutions             | Treating negation as classical truth in an incomplete database       |

>

**Abstraction barrier record:**

| Abstraction layer         | Exposed interface                                                  | Hidden representation                                       | What upper code depends on                           | What should not change if representation changes |
| ------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------ |
| Relational model layer    | `choice`, `fail`, `Solve`                                          | computation spaces, search strategy, cloned stores          | alternatives and failures produce solution lists     | Meaning of relational programs                   |
| Search abstraction        | `SolveOne`, `SolveAll`, lazy solution stream                       | depth-first traversal, delayed tails                        | same relation can run under different search demands | Relation definitions                             |
| Relation layer            | procedure call with unknown arguments                              | unification and variable bindings                           | solutions satisfy the relation                       | Call sites using the relation                    |
| Parser relation layer     | grammar procedures over token lists                                | difference-list representation and search tree              | valid parses are returned as solutions               | Grammar users                                    |
| Grammar interpreter layer | encoded grammar + meta-interpreter                                 | host-language unification and search                        | grammar rules are interpreted relationally           | Grammar notation                                 |
| Database relation layer   | facts, queries, updates                                            | relation class, stored tuples, indexing or search           | logical query behavior                               | Database clients                                 |
| Prolog comparison layer   | Horn clauses, `bagof`, `setof`, `call`, `cut`, `assert`, `retract` | Prolog execution engine and database                        | relational meaning plus extra control                | Prolog-style programs                            |
| Planner layer             | rules of form `Condition => Action`                                | relation database, negation-as-failure, conflict resolution | rule firing changes fact/goal database               | Robot planning goal                              |
| Encapsulation boundary    | solution list output                                               | internal multiple bindings and failed alternatives          | search effects do not leak                           | Outer computation and external interaction       |

**Error prediction:**

**1. The reader may mistake relational programming for ordinary nondeterministic programming, but this chapter needs to distinguish search over logical bindings from arbitrary concurrent nondeterminism.**

>

**2. The reader may remember `choice` and `fail` as control primitives while missing that their purpose is to describe a relation whose solutions are explored by search.**

>

**3. The reader may trace `Solve` as if it simply calls a function, even though it runs the relational program inside an encapsulated search environment.**

>

**4. The reader may assume relational definitions are automatically efficient, while search order, choice order, and pruning can dominate runtime.**

>

**5. The reader may treat negation as failure as ordinary logical negation, while it depends on the absence of finitely found solutions.**

>

**6. The reader may think Prolog is identical to the relational model of the chapter, while Prolog layers theorem proving, extralogical control features, and stateful database operations.**

>

**Learning Tips:** Chapter 9 should be studied by drawing search trees. For every relational program, mark where choices are created, where unification binds variables, where failure prunes a branch, and how `Solve` packages the surviving bindings into a lazy list. The same relation should be tested with different known and unknown arguments; this reveals whether the program is genuinely relational or merely a function written with relational syntax. Parsing and database examples should be traced by writing both the logical formula and the operational search order, because correctness and efficiency often diverge in this model.

**Exercise 9.1.** Combine the relational parsing techniques from natural language parsing with relational database techniques to build a parser with a large vocabulary that can be updated at run time.

**Training goal:** natural language parsing, dynamic database, relation/database composition.

>

**Exercise 9.2.** Write a parser that accepts grammar written in EBNF syntax and returns the encoded grammar data structure used by the generic parser; first define the EBNF syntax for the extended EBNF notation itself.

**Training goal:** grammar encoding, EBNF parsing, meta-level syntax processing.

>

**Exercise 9.3.** Build a flight-planning program using the relation class from the database section.

**Training goal:** relational database querying, graph/path search, relation-class application.

>

**Exercise 9.4.** Extend the relational database or relation-class example so that useful queries can be expressed and searched relationally over a larger data set.

**Training goal:** relational query design, search over facts, database abstraction.

>

**Exercise 9.5.** Use `Port.sendRecv` to extend the relation class so facts can be asserted and retracted while an encapsulated search is running, by communicating with a database server through ports.

**Training goal:** encapsulated search with external communication, ports, dynamic database update.

>

**Exercise 9.6.** Implement a forward-chaining planner for a block-stacking robot using a relation database, rule conditions, add/remove actions, conflict resolution, and negation as failure.

**Training goal:** forward chaining, production rules, relational database update, planning, negation as failure.

>

**Exercise 9.7.** Compare meta-interpreters and virtual machines: virtual machines execute virtual instructions directly on hardware, while meta-interpreters use the underlying language’s operations to interpret another language.

**Training goal:** meta-interpretation, virtual-machine comparison, implementation strategy.

>

**Exercise 9.8.** Investigate relational programming with state: remove the restriction that state created outside relational search can only be read, while preserving simple logical semantics and efficient implementation.

**Training goal:** relational state, encapsulated search, semantic design, research-level model extension.

>

**Exercise 9.9.** Compare relational `fail` with transactional `abort`, and investigate whether relational programming and transactions can be given meanings in terms of one another or combined in one computation model.

**Training goal:** failure vs abort, transactions, relational semantics, computation-model design.

>

**Cross-chapter recovery questions:**

**1. How will Chapter 9’s `choice`, `fail`, and `Solve` be reinterpreted in Chapter 12 through `computation spaces` and constraint programming?**

**2. Which declarative reasoning guarantees from Chapters 2–4 remain valid when search is added, and which become dependent on search strategy?**

**3. How do Chapter 9’s databases and transactions connect back to Chapter 8’s atomic updates and forward to distributed databases in Chapter 11?**

**4. How will Chapter 13 express relational search, failure, encapsulation, and search-tree exploration in abstract-machine terms?**

**Chapter mastery standards:**

* Able to explain how a `relation` differs from a one-directional function.
* Able to trace `choice` and `fail` as construction and pruning of a search tree.
* Able to explain why `Solve` must encapsulate search and return solutions as a lazy list.
* Able to distinguish `SolveOne`, `SolveAll`, and demand-driven solution generation.
* Able to trace a simple relation call with known and unknown arguments through unification.
* Able to explain why search order affects performance and solution order but not the declarative relation itself.
* Able to use relational programming to model ambiguous parsing or database querying.
* Able to distinguish the chapter’s relational model from Prolog’s global backtracking, extralogical features, and stateful database operations.
### Chapter 10. Graphical User Interface Programming

*Chapter 10 begins Part II by applying the book’s computation-model method to a practical domain: graphical user interfaces. The chapter does not present GUI programming as a separate craft; it shows how a GUI tool can combine declarative data structures with procedural concepts such as objects, state, events, and threads. The central idea is that an interface description can be treated as calculable data, while interaction requires handlers, events, placeholders, and mutable state. QTk is used as the concrete tool: it interprets declarative GUI specifications and connects them to a procedural graphics back end.*

**Chapter dependencies:**

* Chapter 3 supplies declarative data manipulation: records + lists → GUI specifications as data.
* Chapter 6 supplies explicit state: cells + handles → user input, widget updates, calculator state.
* Chapter 7 supplies object style: widget handles ≈ objects with methods such as `get` and `set`.
* Chapter 8 supplies event/concurrency intuition: GUI events + callbacks → controlled interaction.
* Chapter 10 combines models: declarative specification + procedural handlers → practical GUI programming.
* `QTk.build` interprets a GUI description → actual window + widget handles.
* Case studies show model composition: progress monitor, calendar widget, generated forms, context-sensitive clock.
* Chapter 11 will move from local GUI interaction to distributed entities and network-aware components.

**1. Why does GUI programming expose the limits of using only one computation model?**

>

**2. What does the chapter mean by combining a declarative base with procedural concepts?**

>

**3. Why are GUI specifications treated as data structures, and what does this make possible?**

>

**4. How do QTk widgets, layout records, glue parameters, and handles divide responsibilities between description and interaction?**

>

**5. Why are callbacks, events, and widget handles procedural concepts even when the window layout is described declaratively?**

>

**6. How does the Prototyper change the learning and design process for QTk?**

>

**7. What do the four case studies show about increasing GUI complexity: progress monitor, calendar, generated interface, and context-sensitive clock?**

>

**8. How does QTk’s implementation as front end, middle layer, and back end illustrate the book’s layered language-design method?**

>

**Concept comparison table:**

| Concept A                     | Concept B                   | Shared point                           | Key difference                                                                                                           | Role in this chapter                          | Minimal example                            |
| ----------------------------- | --------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- | ------------------------------------------ |
| declarative GUI specification | procedural GUI construction | Both create user interfaces            | Declarative specification describes structure as data; procedural construction issues commands over time                 | Main design contrast                          | QTk record vs sequence of drawing commands |
| declarative approach          | interface builder           | Both simplify interface creation       | Declarative specs can be computed and transformed at run time; interface builders are usually manual and less adaptable  | Explains why data-structured GUI specs matter | generated data-entry form                  |
| widget                        | widget handle               | Both refer to GUI elements             | Widget is the described interface component; handle is the procedural access point after construction                    | Separates description from later interaction  | label record vs label handle               |
| layout widget                 | ordinary widget             | Both appear in GUI descriptions        | Layout widget organizes other widgets; ordinary widget displays or accepts data                                          | Geometry management                           | `td`, `lr`, `glue`                         |
| action callback               | function call               | Both execute code                      | Callback is invoked by an event after GUI construction; ordinary call happens in the current computation                 | Event-driven programming                      | button `action:Proc`                       |
| event binding                 | button action               | Both connect user events to procedures | Button action is a common built-in event; binding can attach procedures to lower-level events such as resize             | General event handling                        | `<Configure>` event                        |
| handle method                 | cell operation              | Both inspect or change state           | Handle method changes external widget state; cell operation changes Oz model state                                       | GUI state vs program state                    | `{LabelHandle set(text:"x")}`              |
| generated interface           | hand-written interface      | Both produce GUI descriptions          | Generated interface is computed from program data; hand-written interface is directly described                          | Main payoff of declarative specs              | list of fields → form layout               |
| placeholder                   | fixed widget                | Both occupy a position in the layout   | Placeholder can replace displayed widget dynamically and cache previous interpretations                                  | Context-sensitive interface                   | clock view changes with size               |
| view                          | window                      | Both relate to display                 | View is one possible presentation; window is the container whose size may choose among views                             | Context-sensitive clock                       | seven clock views                          |
| QTk front end                 | Tk back end                 | Both participate in building the GUI   | QTk interprets declarative specs; Tk / Tcl-Tk performs lower-level procedural graphics work                              | Implementation layering                       | `QTk.build`                                |
| interpretation overhead       | event-handler overhead      | Both affect runtime cost               | Specification interpretation happens mainly when building or replacing widgets; handler calls pay smaller runtime checks | Performance model                             | placeholder caching                        |

**Program tracing table:**

| Tracing object           | What to trace                                                             | Common mistake                                                         |
| ------------------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| GUI description record   | Oz record/list → widget tree → window structure                           | Treating GUI spec as already a displayed window                        |
| `QTk.build`              | Declarative spec → interpreted widget hierarchy → window object + handles | Forgetting that building interprets the description once               |
| Layout with `td` / `lr`  | Parent layout → child widgets → alignment and size behavior               | Debugging individual buttons without tracing layout containers         |
| Glue parameter           | Available extra space → glue distribution → widget placement              | Assuming widgets resize uniformly without explicit geometry rules      |
| Button action            | User click → callback procedure → program state / widget update           | Thinking the action runs during window construction                    |
| Entry/label handle       | Entry `get` → string value; label `set` → displayed text                  | Confusing handle with the initial widget specification                 |
| Event binding            | Event such as `<Configure>` → bound procedure → layout/view update        | Assuming resize automatically recomputes application-specific views    |
| Prototyper edit/run loop | Modify spec → rebuild preview → observe geometry and behavior             | Treating Prototyper as only a demonstration tool                       |
| Progress monitor         | Worker progress → GUI update through handle                               | Updating a label without considering when the worker produces progress |
| Calendar widget          | Month/year data → weekday offset → grid layout                            | Hard-coding positions instead of computing them from date structure    |
| Generated form           | Data list → layout record + handles → user edits read through handles     | Generating layout but losing access to fields afterward                |
| Context-sensitive clock  | Window size → choose suitable view → placeholder displays view handle     | Rebuilding entire GUI unnecessarily on every resize                    |
| Placeholder caching      | First insertion interprets widget; later insertion can reuse handler      | Assuming every view switch has full build cost                         |
| QTk implementation       | Front end interprets spec → middle layer objects → Tcl/Tk back end        | Treating QTk as merely a thin syntax wrapper                           |

>

**Abstraction barrier record:**

| Abstraction layer         | Exposed interface                                      | Hidden representation                                | What upper code depends on               | What should not change if representation changes |
| ------------------------- | ------------------------------------------------------ | ---------------------------------------------------- | ---------------------------------------- | ------------------------------------------------ |
| GUI specification layer   | records such as `td`, `lr`, `button`, `label`, `entry` | concrete widget tree representation                  | structural description of interface      | Application-level layout logic                   |
| Layout layer              | layout widgets and glue parameters                     | geometry calculations and placement rules            | relative placement and resizing behavior | Widget arrangement semantics                     |
| Widget layer              | widget declarations                                    | Tk widget objects and low-level graphics commands    | displayed component behavior             | Application code using widget kinds              |
| Handle layer              | methods such as `get`, `set`, event binding            | object-oriented wrapper around GUI element           | procedural access to existing widget     | Handler code                                     |
| Callback layer            | `action` procedures and event handlers                 | event loop, dispatch table, scheduler integration    | user action triggers application code    | GUI event semantics                              |
| Generated-interface layer | function from data → GUI record + handles              | record construction and fresh handle variables       | data-driven interface construction       | Application data format                          |
| Placeholder layer         | `set` a displayed handle/view                          | caching, replacement, previous widget interpretation | dynamic replacement behavior             | Context-sensitive GUI logic                      |
| Prototyper layer          | interactive editing and preview                        | QTk build/rebuild loop                               | rapid feedback on specifications         | GUI learning and experimentation                 |
| QTk front end             | `QTk.build`, declarative specs                         | interpreter for GUI descriptions                     | convenient high-level GUI construction   | Application code                                 |
| Back-end layer            | Tk / Tcl-Tk graphics package                           | OS process, procedural graphics commands             | actual rendering and event delivery      | QTk-level programming model                      |

**Error prediction:**

**1. The reader may mistake this chapter for a QTk tutorial, but it mainly demonstrates how a practical GUI tool combines computation models.**

>

**2. The reader may remember declarative GUI records while missing that interaction requires procedural callbacks, handles, events, and state.**

>

**3. The reader may treat a handle as part of the original data specification, while it is produced by building the GUI and used for later procedural access.**

>

**4. The reader may trace button actions as if they run during window construction, even though they run later in response to events.**

>

**5. The reader may generate a GUI from data but forget to return handles, making it hard to read or update the fields after construction.**

>

**6. The reader may treat context-sensitive layouts as ordinary resizing, while the clock example explicitly computes which view best fits the current window.**

>

**Learning Tips:** Chapter 10 should be studied by running small QTk fragments and then tracing the boundary between data description and event behavior. A useful exercise is to write the GUI specification as a record, then separately list every procedural operation that can happen after the window exists: button action, entry `get`, label `set`, event binding, placeholder replacement. For case studies, focus less on memorizing widget names and more on identifying where declarative construction stops and procedural interaction begins. The generated-interface example should be traced as data transformation: application data → widget record + handles → user input read back through handles.

**Exercise 10.1.** Use the Prototyper from Section 10.3 to learn QTk by running the examples, understanding their behavior, editing them, and rerunning them.

**Training goal:** interactive GUI exploration, QTk syntax, specification-to-window feedback.

>

**Exercise 10.2.** Reproduce the three given window layouts by using `td`, `lr`, and glue parameters so that button alignment and relative sizes match in both horizontal and vertical directions.

**Training goal:** geometry management, layout widgets, glue behavior, visual precision.

>

**Exercise 10.3.** Extend the button declaration example into a calculator: first display clicked button text in a label, then use cells to store entered numbers, then implement operations such as `-`, `+`, `x`, `/`, `.`, and `=`.

**Training goal:** callbacks, widget update, cells for GUI state, event-driven calculator logic.

>

**Exercise 10.4.** Create a window with a label and an entry widget so that user input in the entry immediately updates the label; use events, the entry handle’s `get` method, and the label handle’s `set` method.

**Training goal:** event binding, handles, immediate feedback, entry/label interaction.

>

**Exercise 10.5.** Write functions that transform structured data such as `[Item1#Value1 ... ItemN#ValueN]` into GUI records with labels, entries, number entries for integers, glue parameters, fresh handle variables, and a returned handle list; test it on `[name#"Roger" surname#"Rabbit" age#14]`.

**Training goal:** dynamic GUI generation, data-to-interface transformation, handle collection, type-sensitive widget generation.

>

**Exercise 10.6.** Explain why the formula in the calendar widget correctly calculates the number of blank grid spots before day 1.

**Training goal:** calendar layout reasoning, date arithmetic, grid placement.

>

**Exercise 10.7.** Extend the context-sensitive clock with a calendar and add views so the calendar appears only when the window is large enough.

**Training goal:** context-sensitive layout, placeholder use, dynamic view selection, widget composition.

>

**Exercise 10.8.** Investigate whether the chapter’s ideas apply to next-generation human-computer interfaces such as collaborative virtual environments, ubiquitous computing, three-dimensional interfaces, or multimedia interfaces.

**Training goal:** research-level model transfer, GUI abstraction, declarative/procedural design beyond QTk.

>

**Cross-chapter recovery questions:**

**1. How does Chapter 10’s declarative GUI description reuse Chapter 3’s idea that symbolic data structures can be computed and transformed?**

**2. Which parts of the GUI require Chapter 6’s explicit state and Chapter 7’s object-like handles rather than a purely declarative model?**

**3. How will event-driven local interaction change in Chapter 11 when interface components communicate across processes or machines?**

**4. How does the QTk implementation preview Chapter 13’s layered view of practical language constructs translated into lower-level operational mechanisms?**

**Chapter mastery standards:**

* Able to explain why GUI programming benefits from combining declarative and procedural models.
* Able to treat a GUI specification as a calculable data structure.
* Able to distinguish widget declaration from widget handle.
* Able to trace `QTk.build` from declarative specification to displayed window and handles.
* Able to use callbacks and events to update widgets after construction.
* Able to generate a simple form from application data and preserve handles for later access.
* Able to explain placeholder-based view switching in a context-sensitive interface.
* Able to describe QTk’s implementation layers: front end, middle layer, and Tcl/Tk back end.

### Chapter 11. Distributed Programming

*Chapter 11 moves the book’s computation models from one process into several processes connected by a network. The chapter first studies `network transparency`: the attractive idea that distributed execution should behave like local execution. It then shows why transparency is not enough, because real distributed programs must handle performance, openness, localized resources, security, and partial failure. The chapter’s practical method is to choose the least troublesome distributed representation for each entity: declarative data, streams, ports, stateful entities, server objects, functors, and resilient abstractions all behave differently once network cost and failure become part of the model.*

**Chapter dependencies:**

* Chapter 4: `stream` + `dataflow variable` → distributed declarative data can often remain transparent.
* Chapter 5: `port` + `server` → natural basis for distributed message-passing components.
* Chapter 6: `cell` + explicit state → distributed state is expensive because updates must remain visible.
* Chapter 7: `object` + `active object` → distributed server objects and resilient abstractions.
* Chapter 8: `shared state + concurrency` → warning case for distributed mutable consistency.
* Chapter 10: local GUI interaction → distributed applications may separate interface, server, and resources.
* Chapter 11 adds `network` + `process` + `partial failure` → distribution as a specialized computation model.
* Chapter 13 can reframe the model semantically: earlier entities + distribution protocols → abstract-machine-level account.

**1. What kinds of distributed systems does the chapter distinguish, and why does this taxonomy matter before programming begins?**

>

**2. What is `network transparency`, and why is it useful as a first approximation rather than a complete design principle?**

>

**3. Why is declarative data easier to distribute than stateful entities?**

>

**4. How do `Pickle`, `Connection`, `Offer`, and `Take` let independent processes share language entities?**

>

**5. How do streams, ports, and servers behave when their producers, consumers, or clients live in different processes?**

>

**6. Why does distributing state require more sophisticated protocols than distributing declarative data?**

>

**7. What does `network awareness` add beyond transparency, and how can protocol choices improve performance without changing program correctness?**

>

**8. How do partial failure, failure detection, fault confinement, resilient server objects, security, functors, and distributed components change the design method for real distributed applications?**

>

**Concept comparison table:**

| Concept A              | Concept B                      | Shared point                                          | Key difference                                                                                            | Role in this chapter                             | Minimal example                               |
| ---------------------- | ------------------------------ | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------- |
| `network transparency` | `network awareness`            | Both concern distributed execution                    | Transparency hides distribution; awareness exposes performance-relevant protocol choices                  | Main design tension                              | same program, different distribution protocol |
| declarative data       | stateful entity                | Both can be shared between processes                  | Declarative data does not change after binding; stateful entity must coordinate updates                   | Explains why state is expensive to distribute    | record/list vs cell/object                    |
| `Pickle`               | `Connection`                   | Both move language entities across process boundaries | Pickle stores stateless data; Connection gives a reference to a live entity                               | Basis for `Offer` / `Take` patterns              | save ticket, take remote reference            |
| `Offer`                | `Take`                         | Both help connect computations                        | `Offer` makes an entity available; `Take` obtains a reference from a file or URL-like location            | Practical connection idiom                       | offered port or stream variable               |
| eager stream           | lazy stream                    | Both can cross process boundaries                     | Eager stream sends produced elements; lazy stream sends demand/trigger structure as needed                | Distributed producer-consumer variants           | distributed integer stream                    |
| stream communication   | port communication             | Both send sequences of data                           | Stream is one-to-one or structurally organized; port supports many-to-one asynchronous sends              | Distributed servers                              | stream consumer vs Browse server port         |
| distributed binding    | mobile state                   | Both are distribution protocols                       | Distributed binding coordinates single-assignment variables; mobile state moves state ownership or access | Two important protocols singled out later        | variable binding vs movable cell state        |
| server object          | resilient server object        | Both receive requests and produce replies             | Resilient version detects failures and can confine or repair them                                         | Fault tolerance abstraction                      | server with failure detector                  |
| permanent failure      | temporary network inactivity   | Both interrupt distributed behavior                   | Permanent process failure will not recover; network inactivity may later disappear                        | Failure detection categories                     | crashed process vs slow/unavailable link      |
| openness               | closed distributed system      | Both connect processes                                | Openness allows independently created computations to connect dynamically                                 | Open collaborative systems                       | independent clients joining service           |
| localized resource     | mobile language entity         | Both are used by components                           | Local resource must be linked where the process runs; language entity may be copied or referenced         | Functor/resource discipline                      | file system, window, local service            |
| functor                | distributed component          | Both package code and dependencies                    | Functor is stateless code with imports; component is a linked running resource in a process               | Component-based distribution                     | pickle functor, link with resources           |
| message-passing style  | distributed shared-state style | Both can coordinate components                        | Message passing confines faults and state; shared state makes distributed fault handling difficult        | Design recommendation                            | ports/servers vs shared cells                 |
| security               | naming                         | Both affect open systems                              | Naming finds entities; security controls who may use them and how                                         | Brief but essential distributed-systems boundary | ticket exposure, access authority             |

**Program tracing table:**

| Tracing object                | What to trace                                                                          | Common mistake                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Distributed-system taxonomy   | Shared memory → distributed memory → partial failure → open collaboration              | Treating all distributed systems as the same engineering problem |
| `Offer X FN`                  | Entity `X` → connection ticket → pickled file                                          | Thinking the whole live entity is copied into the file           |
| `Take FNURL`                  | Load ticket → connect to offered entity → obtain reference                             | Treating `Take` as ordinary file loading only                    |
| Distributed declarative value | Producer binds value → reference holders observe binding                               | Expecting mutable update behavior from declarative data          |
| Distributed eager stream      | Producer binds stream tail cells → batches sent across network → consumer resumes      | Thinking each element necessarily causes one network message     |
| Distributed lazy stream       | Consumer demand → trigger crosses process boundary → producer computes demanded prefix | Forgetting that demand itself becomes distributed communication  |
| Distributed port server       | Server offers port → clients take port → sends appear in server stream                 | Treating send as synchronous remote procedure call               |
| Distributed state             | Read/write state entity → protocol coordinates visibility and ownership                | Assuming local cell reasoning still applies unchanged            |
| Mobile state protocol         | State access pattern → ownership/representation moves or is coordinated                | Treating mobile state as simple copying                          |
| Distributed binding protocol  | Unbound variables shared across sites → binding protocol establishes single value      | Ignoring the cost of maintaining single-assignment consistency   |
| Network awareness             | Same correctness + protocol choice → different message counts/latency                  | Treating performance as outside the programming model            |
| Common patterns               | Client/server, peer collaboration, resource sharing, remote object access              | Missing which computation model each pattern uses                |
| Partial failure detection     | Process failure or inactivity → detector reports to application                        | Expecting full transparency under failure                        |
| Resilient server object       | Server wrapper detects failure → confines or repairs by switching/restarting           | Confusing resilience abstraction with absence of failure         |
| Functor component             | Pickled stateless functor → process-local linking with resources → running component   | Trying to move local resources transparently                     |
| Security check                | Entity reference/ticket → authority boundary → allowed or denied use                   | Treating connection as permission                                |

>

**Abstraction barrier record:**

| Abstraction layer       | Exposed interface                          | Hidden representation                                         | What upper code depends on                      | What should not change if representation changes   |
| ----------------------- | ------------------------------------------ | ------------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------- |
| Distribution layer      | remote references to language entities     | tickets, connections, marshaling, protocol state              | entity appears usable across processes          | Correctness of entity behavior                     |
| Transparency layer      | same-looking program interface             | network transport, location, serialization                    | local-style programming when assumptions hold   | Functional behavior under ideal network conditions |
| Network-awareness layer | protocol choice or distribution annotation | message batching, caching, mobility, binding algorithm        | performance tuning without semantic rewrite     | Program correctness                                |
| Declarative-data layer  | shared values, variables, streams          | distributed binding protocol and data transfer                | single-assignment behavior                      | Declarative reasoning                              |
| Stream layer            | producer/consumer interface                | remote stream cells, batching, demand triggers                | incremental communication                       | Consumer logic                                     |
| Port/server layer       | port reference and `Send`                  | server stream, remote send protocol, process boundary         | asynchronous many-to-one communication          | Message protocol                                   |
| Distributed-state layer | cell/object-like interface                 | mobile state, locking/coordination, consistency protocol      | stateful behavior across sites                  | Client state contract                              |
| Failure-detection layer | failure notifications                      | process monitoring, inactivity detection, timeout logic       | application receives usable failure information | Fault-handling abstraction                         |
| Resilient-object layer  | server-like object interface               | replicas, restarts, failure detectors, forwarding             | service remains usable under some failures      | Client protocol                                    |
| Security layer          | access to distributed entities             | ticket discipline, naming, permissions, trust assumptions     | authorized communication                        | Application-level interface                        |
| Component layer         | functor imports/exports                    | pickled functor, local resource linking, process installation | component can be installed and connected        | Component contract                                 |

**Error prediction:**

**1. The reader may mistake network transparency for the final goal, but this chapter needs to distinguish transparency from performance, failure handling, openness, and security.**

>

**2. The reader may assume that distributing an entity means copying it, while the chapter distinguishes copied stateless data from connected live entities.**

>

**3. The reader may treat distributed state like local state, even though state visibility across processes requires expensive consistency protocols.**

>

**4. The reader may see ports and streams as identical once both cross the network, while ports support many-to-one server communication and streams preserve a structural dataflow view.**

>

**5. The reader may treat failure as an exception that can always be hidden, while partial failure often has to be detected, confined, and exposed through controlled abstractions.**

>

**6. The reader may forget that localized resources cannot simply move with code; functors need process-local linking to the resources available at the target process.**

>

**Learning Tips:** Chapter 11 should be studied with a two-column trace: local computation model on one side, distributed realization on the other. For each entity—declarative value, stream, port, cell, object, functor—record whether it is copied, referenced, synchronized, mobile, or process-local. The most useful exercise is to take one Chapter 5 port object and ask what changes when clients and server are in different processes: connection setup, message ordering, network cost, failure detection, and recovery all become visible. State should be treated cautiously; the chapter repeatedly suggests message-passing decomposition when possible because distributed shared state is harder to make reliable.

**Exercise 11.1.** Implementing network awareness: explain exactly what messages are sent and when during the distributed lexical scoping example from Section 11.4, using the distributed algorithms from Section 11.7.

**Training goal:** network awareness, distributed lexical scoping, message-level protocol tracing.

>

**Exercise 11.2.** Distributed lift control system: turn the Chapter 5 lift control system into a distributed system by placing each component in a separate process, then extend it to handle component failure or communication problems.

**Training goal:** distributed component design, partial failure, message protocols, lift-control architecture.

>

**Exercise 11.3.** A simple chat room: build a server-based chat application where clients connect to the server, receive all previous messages, and send new messages; extend it to handle client failures and server failure, including reconnecting to another server.

**Training goal:** client/server design, distributed state, failure detection, recovery interface.

>

**Exercise 11.4.** Advanced exercise: implement a replicated deterministic server. Client requests are sent to two replicas, either result is enough, and if one replica fails the other starts a new second replica using the `Remote` module and informs the client.

**Training goal:** replication, deterministic server assumption, fault tolerance abstraction, failover.

>

**Exercise 11.5.** Advanced exercise: reconcile the claim that synchronous communication helps fault confinement with the claim that asynchronous communication helps independent concurrent components, by studying the architecture of fault-tolerant applications.

**Training goal:** synchronous vs asynchronous communication, fault confinement, fault-tolerant architecture.

>

**Cross-chapter recovery questions:**

**1. How does Chapter 11 revise Chapter 5’s message-passing concurrency when ports and servers cross process boundaries?**

**2. Which Chapter 6 state abstractions become costly or fragile when the state must remain consistent across distributed processes?**

**3. How will Chapter 12’s computation spaces and constraints interact with distribution if solving, search, or propagation is placed across processes?**

**4. How will Chapter 13 express distribution protocols, partial failure, and network-aware semantics within or beyond the general computation model?**

**Chapter mastery standards:**

* Able to distinguish shared-memory multiprocessor, distributed-memory multiprocessor, partial-failure system, and open collaborative system.
* Able to explain `network transparency` and name at least three ways real distributed programming goes beyond it.
* Able to trace `Offer` / `Take` through tickets, pickling, connection, and remote references.
* Able to explain why declarative data and streams distribute more easily than mutable state.
* Able to compare distributed stream communication with distributed port/server communication.
* Able to identify where network awareness changes performance without changing correctness.
* Able to describe why distributed state needs protocols such as mobile state or distributed binding.
* Able to explain permanent process failure, temporary network inactivity, and the role of failure detection.
* Able to design a small distributed component using functors, resources, and narrow message-passing interfaces.

### Chapter 12. Constraint Programming

*Chapter 12 turns relational search into a more disciplined and more efficient model for solving `constraint satisfaction problems`. Chapter 9 showed how `choice`, `fail`, and `Solve` can explore a search tree, but naive generate-and-test often wastes most of the search. Constraint programming adds `basic constraints`, `propagators`, `finite-domain variables`, and `computation spaces`, so that local deductions prune impossible values before explicit search is forced. The chapter’s main rhythm is `propagation` → stable space → `distribution strategy` → cloned spaces → further propagation, and this rhythm explains why the same puzzle can move from brute-force search to structured solving.*

**Chapter dependencies:**

* Chapter 2 supplies `single-assignment store` + partial information → variables can accumulate constraints.
* Chapter 4 supplies laziness → solution streams can be generated on demand.
* Chapter 9 supplies `choice` + `fail` + `Solve` → relational search as predecessor model.
* Chapter 12 adds `finite-domain constraint` + `computation space` → constraint-based computation model.
* `propagator` + `basic constraint` → local deduction before search.
* `distribution strategy` chooses how to split a stable but unresolved space.
* `Space.ask` + `Space.clone` + `Space.commit` + `Space.merge` → explicit control of search spaces.
* Chapter 13 will give the semantic account of relational search through the more general computation-space machinery.

**1. What kind of problem is a `constraint satisfaction problem`, and why is it different from ordinary function evaluation?**

>

**2. Why is generate-and-test often too slow, even when the relational specification is logically correct?**

>

**3. How does `propagate-and-search` combine local deduction with global search?**

>

**4. What are `basic constraints`, `propagators`, and `computation spaces`, and why does the chapter need all three?**

>

**5. Why does a stable computation space not necessarily mean that a solution has been found?**

>

**6. How does a `distribution strategy` determine the shape and efficiency of the search tree?**

>

**7. How do `Space.new`, `Space.ask`, `Space.clone`, `Space.commit`, and `Space.merge` make encapsulated search programmable?**

>

**8. How does Chapter 12 implement the relational computation model from Chapter 9 using computation spaces?**

>

**Concept comparison table:**

| Concept A                | Concept B                   | Shared point                                 | Key difference                                                                                                | Role in this chapter                                   | Minimal example                           |
| ------------------------ | --------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------- |
| `relation`               | `constraint`                | Both describe allowed combinations of values | A relation may be searched by generate-and-test; a constraint can propagate partial information               | Main improvement over Chapter 9                        | `X+Y=:10` narrows domains before guessing |
| generate-and-test        | propagate-and-search        | Both explore possible solutions              | Generate-and-test enumerates candidates then rejects them; propagate-and-search prunes during construction    | Central programming shift                              | palindrome product, rectangle puzzle      |
| `basic constraint`       | `propagator`                | Both restrict possible values                | Basic constraint is stored directly; propagator watches constraints and adds more constraints                 | Defines the constraint store mechanism                 | `X::1#9` vs `X+Y=:10`                     |
| `finite-domain variable` | ordinary dataflow variable  | Both may be partially known                  | Finite-domain variable carries a set of possible integer values                                               | Basis of finite-domain solving                         | `X::1#9`                                  |
| domain narrowing         | variable binding            | Both reduce uncertainty                      | Narrowing reduces possible values; binding chooses one value                                                  | Propagation before final solution                      | `X::1#5` → `X::3#5`                       |
| stable space             | solved space                | Both are no longer currently propagating     | Stable means no more local deduction is possible; solved means all relevant variables have enough information | Prevents mistaking quiescence for answer               | rectangle space before splitting          |
| failed space             | inconsistent branch         | Both reject a possibility                    | Failed space is the computation-space status; inconsistent branch is the logical cause                        | Search pruning                                         | `X=<:Y` conflicts with propagated values  |
| distribution strategy    | heuristic                   | Both guide search                            | Distribution strategy is the concrete rule for splitting a stable space                                       | Performance-sensitive part of CP                       | `FD.distribute naive Sol`                 |
| `Space.clone`            | ordinary copying            | Both duplicate something                     | Cloning preserves a computation space with constraints and propagators                                        | Creates search branches safely                         | clone before committing an alternative    |
| `Space.commit`           | adding a guessed constraint | Both choose one branch                       | Commit selects one alternative inside a cloned or original space                                              | Turns alternatives into a concrete branch              | commit branch 1 or branch 2               |
| `Space.merge`            | returning a value           | Both expose a result outside search          | Merge extracts a solved space’s result into the parent space                                                  | Boundary between encapsulated search and outer program | solved script result                      |
| `Solve`                  | constraint script           | Both belong to solving                       | Script posts constraints; `Solve` controls exploration                                                        | Separates problem specification from search engine     | `{SolveAll Rectangle}`                    |
| constraint programming   | relational programming      | Both are declarative search-oriented models  | CP adds propagation and specialized constraints; relational programming relies more on choice/fail search     | Chapter 12 compared with Chapter 9                     | `Queens` via relation vs FD constraints   |
| recomputation            | cloning                     | Both support search-space exploration        | Cloning stores complete space copies; recomputation rebuilds spaces to reduce memory or improve performance   | Advanced search-engine optimization                    | improved `Solve`                          |

**Program tracing table:**

| Tracing object            | What to trace                                                                                 | Common mistake                                                           |
| ------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Rectangle example         | Initial domains → product/sum/order propagators → narrowed domains → split → solution/failure | Jumping directly from constraints to answer                              |
| Basic domain declaration  | `X::1#9` → finite-domain variable with possible values                                        | Treating it as assigning one number                                      |
| Propagator firing         | Constraint sees domain changes → posts new basic constraints                                  | Treating propagators as one-time tests                                   |
| Stable space              | All propagators quiescent → `Space.ask` reports alternatives or success                       | Assuming stable always means solved                                      |
| Failed space              | Propagation detects contradiction → branch rejected                                           | Continuing search inside an inconsistent branch                          |
| Distribution              | Choose variable and split domain → alternatives                                               | Ignoring the heuristic behind the split                                  |
| `FD.distribute naive Sol` | Select first nondetermined variable and leftmost domain guess                                 | Assuming distribution is semantically irrelevant to performance          |
| Constraint script         | One-argument procedure posts domains, constraints, and distribution                           | Returning a value directly rather than binding solution argument         |
| `SolveAll`                | Create initial space → ask → clone/commit alternatives → lazy solution list                   | Forgetting that search is outside the problem script                     |
| `Space.new`               | Script becomes child computation space                                                        | Letting internal search bindings leak to parent space                    |
| `Space.ask`               | Inspect status: failed, succeeded, alternatives                                               | Treating status inspection as solving by itself                          |
| `Space.clone`             | Copy stable space before committing a branch                                                  | Committing the original before making needed clones                      |
| `Space.commit`            | Select one alternative inside a space                                                         | Thinking commit means final solution                                     |
| `Space.merge`             | Extract solved result from a child space                                                      | Trying to merge an unresolved or failed space                            |
| `Choose`                  | Create a choice point with `N` alternatives                                                   | Treating `Choose` as random number generation                            |
| Lazy `SolveLoop`          | Clone before lazy tail demand can commit another branch                                       | Forgetting that spaces are stateful despite lazy list construction       |
| Zebra puzzle              | Properties mapped to house numbers → distinctness + adjacency/order constraints               | Representing each house directly and generating many symmetric solutions |
| Making change             | Counts per denomination + scalar product + minimization/distribution                          | Solving amount only, while ignoring minimal number of coins              |
| Cryptarithmetic           | Letters as FD variables → all distinct → column arithmetic constraints                        | Assigning leading letters to zero or failing to express carries          |
| Recomputation search      | Rebuild part of path instead of storing every clone                                           | Assuming cloning is always the best implementation strategy              |

>

**Abstraction barrier record:**

| Abstraction layer            | Exposed interface                                                      | Hidden representation                                                 | What upper code depends on                   | What should not change if representation changes |
| ---------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------ |
| Constraint script layer      | one-argument procedure binding solution                                | posted constraints, propagators, distribution call                    | problem specification                        | Search engine implementation                     |
| Finite-domain layer          | `X::L#U`, arithmetic constraints, distinctness                         | domain sets and domain-narrowing algorithms                           | logical meaning of allowed values            | Program-level constraint meaning                 |
| Propagator layer             | constraint operations such as `=:` or `=<:`                            | waking conditions, propagation queue, narrowing rules                 | local deduction behavior                     | Script structure                                 |
| Computation-space layer      | `Space.new`, `Space.ask`, `Space.clone`, `Space.commit`, `Space.merge` | child space, constraint store, propagator store, mutable search state | encapsulated search behavior                 | Problem scripts                                  |
| Distribution layer           | `FD.distribute` and strategy argument                                  | variable selection, value selection, splitting rule                   | search tree shape                            | Logical set of solutions                         |
| Search-engine layer          | `Solve`, `SolveAll`, `SolveOne`                                        | lazy depth-first traversal, cloning, committing, merging              | solution stream behavior                     | Constraint problem definitions                   |
| Relational abstraction layer | `choice`, `fail`, `Solve`                                              | `Choose`, computation spaces, lazy search loop                        | Chapter 9 relational programs                | User-level relational syntax                     |
| Optimization layer           | recomputation, heuristics, constraint ordering                         | memory/time trade-offs in search engine                               | same problem meaning with better performance | Problem specification and expected solutions     |
| Modeling layer               | variables, constraints, objective/minimization encoding                | chosen problem representation                                         | correctness and pruning strength             | External puzzle or application requirement       |

**Error prediction:**

**1. The reader may mistake a finite-domain declaration for assigning a value, but this chapter needs to distinguish domain restriction from final binding.**

>

**2. The reader may remember that constraints describe the solution while missing that their operational propagation behavior determines performance.**

>

**3. The reader may treat search as the first step, while constraint programming first propagates local consequences until the space becomes stable.**

>

**4. The reader may assume that a stable space is solved, even though stability only means no current propagator can narrow more information.**

>

**5. The reader may think distribution strategy affects only speed, but poor distribution can make a clear specification practically unusable.**

>

**6. The reader may treat computation spaces as pure values, while `Space.commit` and `Space.merge` make them stateful search objects that must be handled carefully.**

>

**Learning Tips:** Chapter 12 should be read by rewriting one relational generate-and-test program as a finite-domain constraint program. The useful trace is not only the search tree; it is the shrinking of domains before each branch. For each puzzle, record three layers separately: variables and their domains, constraints and propagators, and the distribution strategy. Performance should be read as part of the programming model: a logically correct constraint specification can still be weak if it propagates little and leaves almost all work to search.

**Exercise 12.1.** Write a finite-domain constraint program for absolute difference triangles: fill a triangular table with integers `1..15` for side `5`, enforce that each lower entry is the absolute difference of its two upper neighbors, require all numbers to occur once, then generalize to side `n` and test at least `n=1..7`.

**Training goal:** finite-domain modeling, `FD.distinct`, distance constraints, generalization from fixed puzzle to parameterized problem.

>

**Exercise 12.2.** Solve the grocery puzzle: four item prices in cents have sum `$7.11` and product `$7.11` under the puzzle’s cents-based interpretation; add ordering constraints such as `a ≤ b ≤ c ≤ d` to eliminate symmetric duplicates and demonstrate the unique ordered solution.

**Training goal:** integer modeling, arithmetic constraints, symmetry breaking, constraint-based puzzle solving.

>

**Exercise 12.3.** Solve the zebra puzzle by representing houses as numbers `1..5` and associating each of the twenty-five properties—nationality, color, profession, drink, and animal—with a house number; encode distinctness, order, adjacency, and fixed-position facts.

**Training goal:** clever representation, finite-domain modeling, all-different constraints, adjacency/order constraints, symmetry control.

>

**Exercise 12.4.** Write a parameterized change-making script that selects a minimal number of bills and coins to pay an amount, given denomination values and available counts; use scalar-product constraints and a distribution strategy that prefers larger denominations and larger counts, then compare American and European denominations.

**Training goal:** optimization modeling, scalar-product constraints, bounded integer variables, distribution strategy design, currency-system comparison.

>

**Exercise 12.5.** Write an interactive cryptarithmetic solver for puzzles of the form “`Word1` plus `Word2` equals `Word3`,” using the `Send-More-Money` program as a guide; refine it into an interruptible version using the `Search` module rather than `Solve`.

**Training goal:** cryptarithmetic modeling, all-different letter constraints, carry constraints, interactive input, interruptible search.

>

**Exercise 12.6.** Advanced exercise: study recomputation as a performance technique for abstractions built with computation spaces, rewrite `Solve` to use recomputation, and compare its performance with the original version.

**Training goal:** computation-space optimization, recomputation, search-engine design, memory/time trade-off analysis.

>

**Cross-chapter recovery questions:**

**1. How does Chapter 12’s propagate-and-search model repair the inefficiency of Chapter 9’s generate-and-test relational programs?**

**2. Which parts of Chapter 4’s laziness are reused by the lazy all-solution search engine, and what changes because computation spaces are stateful?**

**3. How do `basic constraints` extend Chapter 2’s single-assignment store from equality bindings to richer partial information?**

**4. How will Chapter 13 explain computation spaces, relational search, constraint stores, and propagation in a unified semantic model?**

**Chapter mastery standards:**

* Able to define a `constraint satisfaction problem` in terms of variables, domains, and constraints.
* Able to distinguish `relation`, `constraint`, `basic constraint`, and `propagator`.
* Able to trace propagation as domain narrowing before explicit search.
* Able to distinguish stable, failed, succeeded, and alternative spaces.
* Able to explain how a distribution strategy shapes the search tree.
* Able to trace `Space.new`, `Space.ask`, `Space.clone`, `Space.commit`, and `Space.merge` in a small search.
* Able to model at least one puzzle using finite-domain variables and constraints.
* Able to explain how computation spaces implement Chapter 9’s `choice`, `fail`, and `Solve`.

### Chapter 13. Language Semantics

*Chapter 13 returns to the semantic machinery that has been used throughout the book and gives it a more compact formal shape. Earlier chapters defined computation models with abstract machines; this chapter rewrites those models through `structural operational semantics` (*SOS*), reduction rules, substitutions, a logical constraint store, predicate stores, tasks, and interleavings. Its purpose is not to introduce a new programming technique but to show how declarative computation, concurrency, laziness, explicit state, read-only views, and common abstractions fit into one semantic framework. The chapter is mathematically denser than the previous chapters, but its practical role is clear: it explains why the model increments studied earlier are not just informal metaphors but precise changes in execution rules.*

**Chapter dependencies:**

* Chapter 2 gives the first abstract machine: `semantic stack` + `environment` + `single-assignment store` → operational semantics.
* Chapter 13 replaces earlier machine notation with `SOS`: syntactic construct → reduction rule.
* Earlier `environment` machinery is replaced by substitution of identifiers with store references.
* `single-assignment store` becomes logical formula: bindings as constraints, reducibility via entailment/disentailment.
* `thread` + shared store → interleaving semantics for concurrent models.
* `cell`, `IsDet`, `NewCell`, `Exchange`, `ByNeed`, `WaitNeeded`, `readonly`, and `failed value` → general computation model.
* Subsets of the general model recover earlier models: declarative, stateful, lazy, concurrent, and their combinations.
* Relational and constraint models are not fully covered here in the same way; their search machinery is handled through computation spaces.
* Chapter 13 closes the loop: programming concepts from earlier chapters → formal reduction rules and model comparison.

**1. Why does Chapter 13 replace the earlier abstract-machine presentation with `structural operational semantics`?**

>

**2. How does a configuration made of tasks and a shared store generalize the earlier statement-stack model?**

>

**3. What changes when environments are replaced by substitutions of identifiers with store references?**

>

**4. Why is the single-assignment store represented as a logical formula, and how do entailment and disentailment replace activation conditions?**

>

**5. How do reduction rules define the behavior of core constructs such as `skip`, sequence, `local`, binding, procedure application, conditionals, pattern matching, and exception handling?**

>

**6. How do concurrency, laziness, explicit state, read-only views, and failed values extend the same semantic framework?**

>

**7. What does it mean to prove that a subset of the model is `declarative concurrent`, and why does monotonicity matter?**

>

**8. How do the eight computation models arise by selecting or removing `concurrency`, `laziness`, and `state`?**

>

**9. How do common programming abstractions—loops, components, streams, objects, ports, locks, monitors, transactions, tuple spaces—receive semantic meaning from their implementation in the general model?**

>

**Concept comparison table:**

| Concept A               | Concept B                          | Shared point                               | Key difference                                                                                                                       | Role in this chapter                                      | Minimal example                          |        |
| ----------------------- | ---------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | ---------------------------------------- | ------ |
| `abstract machine`      | `structural operational semantics` | Both define execution formally             | Abstract machine uses stacks/environments explicitly; SOS gives compact reduction rules by syntax                                    | Main formal shift                                         | Chapter 2 machine vs Chapter 13 rules    |        |
| `environment`           | substitution                       | Both connect identifiers to store entities | Environment is carried separately; substitution replaces identifiers by store references inside reducible statements                 | Simplifies reducible statements                           | free identifier → store reference        |        |
| `execution state`       | configuration                      | Both describe current computation          | Earlier state has stack + store; configuration has multiple tasks + shared store                                                     | Generalizes concurrency                                   | task ··· task + store                    |        |
| `task`                  | thread                             | Both are units of sequential calculation   | `task` is the semantic unit in the rules; `thread` is the programming concept                                                        | Formalizes concurrency                                    | reducible task selected for a step       |        |
| `constraint store`      | predicate store                    | Both are parts of the store                | Constraint store is monotonic single-assignment information; predicate store includes procedure, mutable, need, and read-only stores | Separates logical bindings from extra machinery           | `x=3 ∧ x=y` vs `ξ:x`                     |        |
| monotonic store         | nonmonotonic store                 | Both affect reducibility                   | Monotonic information only grows; nonmonotonic components can change                                                                 | Boundary between declarative and stateful reasoning       | constraint store vs mutable store        |        |
| entailment              | equality test                      | Both compare information                   | Entailment asks what follows from the current store formula; equality test compares known values                                     | Activates rules such as `Wait`, `Equal`, pattern matching | `σ                                       | = x=y` |
| reducible task          | suspended task                     | Both are active semantic entities          | Reducible task can take a step; suspended task waits for information or conditions                                                   | Defines operational progress                              | waiting on unbound variable              |        |
| interleaving semantics  | parallel execution                 | Both concern concurrency                   | Interleaving semantics models concurrency as one selected task step at a time                                                        | Makes all schedules analyzable                            | choose one reducible task                |        |
| `Wait`                  | `IsDet`                            | Both inspect dataflow information          | `Wait` suspends until determined; `IsDet` can return false without waiting                                                           | `IsDet` introduces nonmonotonic observation               | boundness check                          |        |
| `NewCell`               | `Exchange`                         | Both belong to explicit state              | `NewCell` creates cell identity; `Exchange` atomically reads old content and installs new content                                    | Primitive cell semantics                                  | cell name `ξ` with current variable      |        |
| `ByNeed`                | ordinary procedure call            | Both eventually execute code               | `ByNeed` delays execution until a variable is needed                                                                                 | Demand-driven semantics                                   | lazy stream element                      |        |
| `need store`            | trigger store                      | Both support laziness                      | Need store is primitive in Chapter 13; trigger is derived from need synchronization                                                  | Replaces earlier trigger account                          | `WaitNeeded`                             |        |
| read-only view          | ordinary variable reference        | Both point to store information            | Read-only view prevents binding through that reference                                                                               | Supports controlled information sharing                   | `readonly x`                             |        |
| declarative concurrency | shared-state concurrency           | Both use tasks                             | Declarative concurrency stays monotonic and deterministic; shared-state concurrency includes mutable state and nondeterminism        | Formal model comparison                                   | dataflow threads vs cell-sharing threads |        |
| computation model       | programming abstraction            | Both explain language behavior             | Computation model gives primitive rules; abstraction is implemented on top of a model                                                | Connects semantics to earlier techniques                  | lock implemented by cells/tasks          |        |

**Program tracing table:**

| Tracing object                | What to trace                                                               | Common mistake                                                             |
| ----------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| SOS rule                      | Premise / condition → rewritten configuration                               | Treating rules as textual explanations rather than executable transitions  |
| Configuration                 | Set of tasks + shared store → one selected task reduces                     | Assuming all tasks step simultaneously                                     |
| Task reduction                | Current statement → rule matched → new task/store                           | Ignoring which syntactic construct controls the rule                       |
| Substitution                  | Free identifier replaced by store reference before reducibility             | Reintroducing an environment mentally in every rule                        |
| Constraint-store formula      | Existing bindings + new binding → entailment, consistency, or failure       | Treating store as a map rather than a logical conjunction                  |
| Variable binding              | Add constraint or tell store about equality/value                           | Assuming binding is mutable assignment                                     |
| Naive binding semantics       | Try atomic tell → if inconsistent, store unchanged                          | Forgetting why implementation becomes difficult                            |
| Realistic binding semantics   | Incremental tell → inconsistency may leave partial changes                  | Expecting transactional rollback                                           |
| Procedure introduction        | Fresh procedure name → procedure store entry with body/substitution context | Treating procedure body as plain syntax with no context                    |
| Procedure application         | Look up procedure name → create local bindings → reduce body                | Using call-site identifiers instead of stored references                   |
| Conditional                   | Store entails true or false → choose branch                                 | Evaluating both branches                                                   |
| Pattern matching              | Entailment/disentailment against record structure → branch or suspension    | Treating unknown structure as immediate failure                            |
| Thread creation               | Add new task to configuration                                               | Thinking the parent task must wait for child task                          |
| Interleaving                  | Choose one reducible task → one reduction step                              | Treating schedule as irrelevant in all models                              |
| `Wait`                        | Variable not determined → task suspends; later binding makes it reducible   | Calling suspension an exception                                            |
| `IsDet`                       | Store entails determined or not determined → Boolean result                 | Missing nonmonotonicity of the false case                                  |
| `NewCell`                     | Fresh cell name → mutable store entry                                       | Confusing cell name with current content                                   |
| `Exchange`                    | Read old content variable and install new content variable atomically       | Implementing it as separate read and write in a concurrent setting         |
| `ByNeed`                      | Register need-triggered computation; only run when variable is needed       | Treating laziness as ordinary delayed procedure call with no need relation |
| Read-only view                | Create view → allow reading but prevent binding through view                | Assuming read-only means copied immutable value                            |
| Declarative concurrency proof | Show monotonicity + schedule independence of observable results             | Proving only one execution order                                           |
| Eight models table            | Select `C`, `L`, `S` features → identify model/language examples            | Treating the table as language taxonomy only                               |
| Common abstraction semantics  | Abstraction implementation → general model constructs → formal meaning      | Assuming abstractions need separate primitive semantics                    |

>

**Abstraction barrier record:**

| Abstraction layer                | Exposed interface                                                | Hidden representation                                                        | What upper code depends on                   | What should not change if representation changes |
| -------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------ |
| SOS rule layer                   | reduction rules for syntax                                       | proof notation, side conditions, store logic                                 | each construct has precise step behavior     | Meaning of source constructs                     |
| Configuration layer              | task(s) + store                                                  | task scheduling representation                                               | computation advances by steps                | Program-level behavior under model assumptions   |
| Store layer                      | constraint store + predicate stores                              | logical formula, procedure store, mutable store, need store, read-only store | bindings, procedures, cells, laziness, views | Semantic effect of operations                    |
| Constraint-store layer           | bindings and entailment                                          | formula representation and consistency algorithm                             | single-assignment behavior                   | Declarative programs                             |
| Procedure-store layer            | procedure names and application                                  | closure-like contextual substitution                                         | lexical scoping                              | Procedure calls                                  |
| Mutable-store layer              | `NewCell`, `Exchange`                                            | cell names and current variables                                             | explicit state behavior                      | Stateful abstractions                            |
| Need-store layer                 | `ByNeed`, `WaitNeeded`                                           | suspended tasks waiting on need                                              | demand-driven execution                      | Lazy abstractions                                |
| Read-only layer                  | read-only references                                             | view objects or store annotations                                            | controlled sharing without binding authority | Security-like abstractions                       |
| Model-selection layer            | subsets of constructs                                            | removed rules and unavailable concepts                                       | simpler reasoning and implementation         | Programs written in each model                   |
| Abstraction-implementation layer | loops, components, objects, ports, locks, monitors, transactions | encodings in the general computation model                                   | high-level behavior                          | User-level abstraction contracts                 |

**Error prediction:**

**1. The reader may mistake Chapter 13 for detached mathematical formalism, but its purpose is to compress the operational semantics already used throughout the book.**

>

**2. The reader may try to keep environments in every rule, while the chapter’s notation deliberately replaces them with substituted store references.**

>

**3. The reader may read the constraint store as a mutable map, while the chapter treats it as a logical formula of accumulated information.**

>

**4. The reader may think a suspended task has failed, but suspension means no applicable reduction rule is currently enabled.**

>

**5. The reader may treat `IsDet` as just another test, while its false rule is the first nonmonotonic observation of an unbound dataflow variable.**

>

**6. The reader may assume that all earlier computation models need separate semantics, while this chapter obtains many of them by selecting subsets of the general model’s rules.**

>

**Learning Tips:** Chapter 13 should be read backward and forward at the same time. First connect each formal rule to an earlier informal example: variable binding from Chapter 2, thread creation from Chapter 4, cell exchange from Chapter 6, locks and transactions from Chapter 8, and constraints/search from Chapter 12. Then read the rule as a transition on a configuration, not as prose. The useful study format is a three-column trace: `configuration before`, `rule used`, `configuration after`. Mathematical notation becomes manageable when each symbol is attached to a concrete program fragment already seen earlier.

**Exercise 13.1.** Analyze the `case` statement semantics: derive its rules from `local` and `if`, compare an alternative rule that explicitly introduces variables for pattern fields, and show how `if` can be defined in terms of `case`.

**Training goal:** semantic derivation, pattern matching, linguistic abstraction, equivalence of kernel constructs.

>

**Exercise 13.2.** Trace the rule reductions for the `ForAll` and `MakeAdder` definitions from Section 13.1.11, and explain how procedure introduction stores the contextual environment in a lexically scoped closure.

**Training goal:** lexical scoping, procedure-store semantics, closure context, reduction tracing.

>

**Exercise 13.3.** Implement `NewCell` and `Exchange` in the declarative model extended with `IsDet`, using an inefficient sequential construction based on `LastCons`; then analyze whether the approach works in a concurrent setting and what it shows about `IsDet` and explicit state.

**Training goal:** expressive power of `IsDet`, cell emulation, monotonicity vs state, concurrency limitation.

>

**Exercise 13.4.** Define the formal semantics of convenient cell operations `xold=@xc` and `xc:=xnew` in terms of the primitive cell operations.

**Training goal:** derived semantic rules, cell access, cell assignment, `Exchange` as primitive.

>

**Exercise 13.5.** Prove that two dataflow-stream extension statements executed in different threads always produce the same final result as some sequential ordering of the two statements.

**Training goal:** dataflow stream semantics, confluence-style reasoning, deterministic concurrency.

>

**Exercise 13.6.** Define a stateful stream data type without dataflow variables, using cells for stream tails and a global cell pointing to the last cell; write a concurrent-safe add operation, first with a lock and then, if possible, without one.

**Training goal:** stateful stream representation, locks, concurrency safety, comparison with dataflow streams.

>

**Exercise 13.7.** Propose an alternative definition of the `need` relation that still yields a declarative demand-driven concurrent model.

**Training goal:** by-need semantics, monotonic need relation, declarative laziness, semantic design.

>

**Exercise 13.8.** Prove formally that the declarative model corresponds to a version of the `lambda calculus`, explain how dataflow variables appear, and show that adding concurrency and laziness does not change the functional-programming claim.

**Training goal:** lambda calculus correspondence, functional semantics, dataflow variables, concurrency/laziness conservativity.

>

**Exercise 13.9.** Compare three semantics for binding in a dataflow language: naive transactional binding, realistic incremental tell, and a simpler mainstream-style binding discipline without unification; evaluate the trade-offs among mental model, semantics, implementation complexity, and expressiveness.

**Training goal:** language-design trade-off, binding semantics, unification vs simple binding, implementation/semantics balance.

>

**Cross-chapter recovery questions:**

**1. How does Chapter 13 revise the informal semantic claims made in Chapters 2–8 by giving them reduction-rule form?**

**2. Which properties of declarative concurrency from Chapter 4 are explained by the monotonicity conditions in Chapter 13?**

**3. How do `IsDet`, `NewCell`, and `Exchange` clarify the boundary between weak observation of dataflow variables and true explicit state from Chapter 6?**

**4. How should the relational and constraint models from Chapters 9 and 12 be related to Chapter 13, given that computation spaces and search are handled specially?**

**Chapter mastery standards:**

* Able to explain why `structural operational semantics` is used instead of the earlier abstract-machine notation.
* Able to trace a small configuration through one reduction step.
* Able to distinguish `constraint store`, `procedure store`, `mutable store`, `need store`, and `read-only store`.
* Able to explain why the constraint store is monotonic and why mutable state is not.
* Able to identify when a task is reducible, suspended, terminated, or blocked by lack of information.
* Able to explain how `Wait`, `IsDet`, `NewCell`, `Exchange`, and `ByNeed` change the general model.
* Able to recover earlier computation models by selecting subsets of the general model.
* Able to connect a high-level abstraction such as port object, monitor, transaction, or lazy function to its implementation in the general computation model.

### Program 1. Declarative Kernel / Abstract Machine

This program compresses the first CTMCP line: programming concepts → declarative kernel language → abstract-machine execution → declarative programming techniques. It is written as Oz-like annotated pseudocode rather than as a literal Mozart file, because the purpose is to make the semantic objects visible: `identifier`, `store variable`, `single-assignment store`, `environment`, `semantic statement`, `statement stack`, `procedure value`, `contextual environment`, `dataflow suspension`, and declarative abstraction.

```oz
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% Program 1. Declarative Kernel / Abstract Machine
%%
%% This file is an annotated study implementation in CTMCP style.
%% It models the declarative kernel and the programming techniques built on it.
%%
%% Main semantic separation:
%%   practical language  != kernel language
%%   identifier          != store variable
%%   store variable      != mutable cell
%%   environment         != store
%%   procedure value     = code + contextual environment
%%
%% The abstract machine executes semantic statements:
%%   semantic statement = kernel statement + environment
%%
%% The declarative machine state is:
%%   statement stack + single-assignment store
%%
%% A thread model is not included here. If a statement needs an unbound value,
%% this program marks the statement as suspended. Program 2 will add threads.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 1. Surface fragments and kernel fragments
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% A practical-language expression such as:
%%
%%   fun {Length Xs}
%%      case Xs of nil then 0 [] _|Xr then 1+{Length Xr} end
%%   end
%%
%% is not treated as primitive here.
%%
%% A function can be translated locally into a procedure with an output argument:
%%
%%   proc {Length Xs ?R}
%%      case Xs of nil then R=0 [] _|Xr then
%%         local R1 in {Length Xr R1} R=1+R1 end
%%      end
%%   end
%%
%% A local translation means only the fragment using the construct changes.
%% If no local translation is possible, the kernel language must be extended.
%%
%% This is the programming-language version of the creative extension principle:
%%   local translation possible  -> linguistic abstraction
%%   local translation impossible -> kernel-language concept


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 2. Abstract syntax for the declarative kernel
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% The kernel syntax is represented as data.
%% Each constructor below creates one semantic form.

fun {Skip} skip end

fun {Seq S1 S2}
   seq(S1 S2)
end

fun {Local Id Body}
   %% local Id in Body end
   %% Creates a fresh store variable and extends the environment.
   localS(Id Body)
end

fun {Bind IdOrValue1 IdOrValue2}
   %% Binding is not mutable assignment.
   %% It constrains the single-assignment store.
   bind(IdOrValue1 IdOrValue2)
end

fun {If TestId ThenS ElseS}
   %% TestId must be bound to true or false before the rule can proceed.
   ifS(TestId ThenS ElseS)
end

fun {Case ScrutineeId Pattern ThenS ElseS}
   %% Pattern matching inspects record/list structure.
   %% If the needed structure is unknown, execution suspends.
   caseS(ScrutineeId Pattern ThenS ElseS)
end

fun {Proc Params Body}
   %% A procedure literal becomes a procedure value when evaluated.
   procLit(Params Body)
end

fun {Call ProcId ArgIds}
   %% {ProcId Arg1 ... Argn}
   call(ProcId ArgIds)
end

fun {Record Label Features}
   %% Records are values.
   %% Features is a list of feature#field pairs.
   record(Label Features)
end

fun {ListNil}
   nil
end

fun {ListCons Head Tail}
   cons(Head Tail)
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 3. Semantic domains
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% Identifier:
%%   a program-level name, such as X, N, Length.
%%
%% Store variable:
%%   a semantic entity created by local declaration.
%%
%% Environment:
%%   identifier -> store variable
%%
%% Store:
%%   store variable -> either unbound or bound to a value / another variable.
%%
%% The store is single-assignment:
%%   once a store variable is bound, it cannot later be rebound to another value.
%%
%% Partial values are allowed:
%%   a record may be known while some fields are still unbound.

declare

fun {NewMachine}
   machine(stack:nil
           env:nil
           store:nil
           nextVar:0
           suspended:nil)
end

fun {FreshVar M}
   %% Store variables are not identifiers.
   %% They are generated semantic names such as v1, v2, ...
   V = sv(M.nextVar + 1)
in
   V#machine(stack:M.stack
             env:M.env
             store:M.store
             nextVar:M.nextVar + 1
             suspended:M.suspended)
end

fun {ExtendEnv Env Id StoreVar}
   %% An environment maps identifiers to store variables.
   %% It does not store values directly.
   (Id#StoreVar)|Env
end

fun {LookupEnv Env Id}
   case Env
   of nil then error(unboundIdentifier Id)
   [] (K#V)|Rest then
      if K==Id then V else {LookupEnv Rest Id} end
   end
end

fun {StoreLookup Store V}
   %% Store lookup returns binding information.
   %% A store variable may be unbound, bound to another variable, or bound to a value.
   case Store
   of nil then unbound
   [] (K#Binding)|Rest then
      if K==V then Binding else {StoreLookup Rest V} end
   end
end

fun {StoreBind Store V Binding}
   %% Binding a store variable extends information.
   %% This is monotonic: information grows; it is not overwritten.
   case {StoreLookup Store V}
   of unbound then (V#Binding)|Store
   [] Old then
      if {Compatible Old Binding}
      then Store
      else error(inconsistentBinding V Old Binding)
      end
   end
end

fun {Compatible Old New}
   %% This is a simplified compatibility test.
   %% A full model would implement unification over records and partial values.
   if Old==New then true else false end
end

fun {Deref Store V}
   %% Follow variable-variable bindings until reaching a value or an unbound variable.
   %% X=Y does not copy Y's value; it equates the store variables.
   case {StoreLookup Store V}
   of unbound then unbound(V)
   [] sv(_) = W then {Deref Store W}
   [] Value then Value
   end
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 4. Semantic statement stack
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {Push Stack SemStmt}
   SemStmt|Stack
end

fun {Pop Stack}
   case Stack
   of nil then none
   [] S|Rest then some(S Rest)
   end
end

fun {SemStmt Stmt Env}
   %% A semantic statement is a statement plus the environment
   %% in which its identifiers must be interpreted.
   sem(Stmt Env)
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 5. Procedure values and closures
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {MakeProcValue Params Body ContextEnv}
   %% Procedure value = parameter list + body + contextual environment.
   %%
   %% The contextual environment is essential.
   %% Without it, free identifiers in the procedure body would be resolved
   %% dynamically at the call site, not lexically at the definition site.
   closure(params:Params body:Body env:ContextEnv)
end

fun {IsClosure V}
   case V of closure(params:_ body:_ env:_) then true else false end
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 6. Kernel execution: one abstract-machine step
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {Step M}
   %% One step selects the top semantic statement and rewrites the machine.
   %% This is the executable intuition behind later structural operational rules.
   case {Pop M.stack}
   of none then M

   [] some(sem(Stmt Env) RestStack) then
      case Stmt

      of skip then
         %% skip does nothing.
         machine(stack:RestStack
                 env:M.env
                 store:M.store
                 nextVar:M.nextVar
                 suspended:M.suspended)

      [] seq(S1 S2) then
         %% Sequence executes S1 before S2.
         %% Stack is LIFO, so S2 is pushed first.
         machine(stack:{Push {Push RestStack {SemStmt S2 Env}} {SemStmt S1 Env}}
                 env:M.env
                 store:M.store
                 nextVar:M.nextVar
                 suspended:M.suspended)

      [] localS(Id Body) then
         %% local creates a fresh store variable and extends the environment.
         %% The identifier is source-level; the store variable is semantic.
         V#M1 = {FreshVar M}
         Env1 = {ExtendEnv Env Id V}
      in
         machine(stack:{Push RestStack {SemStmt Body Env1}}
                 env:M1.env
                 store:M1.store
                 nextVar:M1.nextVar
                 suspended:M1.suspended)

      [] bind(A B) then
         %% Binding is the central operation of the single-assignment store.
         %% It may bind variable-to-value, variable-to-variable, or value-to-value.
         {StepBind M RestStack Env A B}

      [] ifS(TestId ThenS ElseS) then
         %% The condition must be known.
         %% If it is unbound, the semantic statement suspends.
         TestVar = {LookupEnv Env TestId}
      in
         case {Deref M.store TestVar}
         of true then
            machine(stack:{Push RestStack {SemStmt ThenS Env}}
                    env:M.env store:M.store nextVar:M.nextVar suspended:M.suspended)
         [] false then
            machine(stack:{Push RestStack {SemStmt ElseS Env}}
                    env:M.env store:M.store nextVar:M.nextVar suspended:M.suspended)
         [] unbound(_) then
            {Suspend M RestStack sem(Stmt Env) waitFor(TestVar)}
         else
            error(nonBooleanCondition TestId)
         end

      [] caseS(ScrutineeId Pattern ThenS ElseS) then
         %% Pattern matching can bind pattern variables.
         %% If the scrutinee is too unknown, it suspends.
         {StepCase M RestStack Env ScrutineeId Pattern ThenS ElseS}

      [] procLit(_ _) then
         %% A procedure literal by itself is a value form.
         %% In the kernel, it usually appears as the right side of binding.
         error(bareProcedureLiteralNeedsBinding Stmt)

      [] call(ProcId ArgIds) then
         %% Procedure application uses the procedure's contextual environment.
         %% Arguments are passed as store variables, not copied raw values.
         {StepCall M RestStack Env ProcId ArgIds}

      else
         error(unknownStatement Stmt)
      end
   end
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 7. Binding rule
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {ResolveTerm Env Term}
   %% A term may be an identifier or a value literal.
   %% Identifiers are looked up in the environment.
   case Term
   of id(I) then var({LookupEnv Env I})
   [] int(N) then value(N)
   [] bool(B) then value(B)
   [] nil then value(nil)
   [] cons(H T) then value(cons(H T))
   [] record(_ _) then value(Term)
   [] procLit(Ps Body) then value(procLiteral(Ps Body Env))
   [] sv(_) then var(Term)
   else value(Term)
   end
end

fun {StepBind M RestStack Env A B}
   TA = {ResolveTerm Env A}
   TB = {ResolveTerm Env B}
in
   case TA#TB

   of var(V1)#var(V2) then
      %% X=Y equates the two store variables.
      %% It is not assignment and not copying.
      Store1 = {StoreBind M.store V1 V2}
   in
      machine(stack:RestStack env:M.env store:Store1
              nextVar:M.nextVar suspended:M.suspended)

   [] var(V)#value(procLiteral(Params Body ContextEnv)) then
      %% Binding a procedure literal creates a closure.
      %% The closure keeps the definition-time environment.
      ProcVal = {MakeProcValue Params Body ContextEnv}
      Store1 = {StoreBind M.store V ProcVal}
   in
      machine(stack:RestStack env:M.env store:Store1
              nextVar:M.nextVar suspended:M.suspended)

   [] var(V)#value(Value) then
      %% Bind an unbound variable to a value.
      Store1 = {StoreBind M.store V Value}
   in
      machine(stack:RestStack env:M.env store:Store1
              nextVar:M.nextVar suspended:M.suspended)

   [] value(Value)#var(V) then
      %% Symmetric value-variable binding.
      Store1 = {StoreBind M.store V Value}
   in
      machine(stack:RestStack env:M.env store:Store1
              nextVar:M.nextVar suspended:M.suspended)

   [] value(V1)#value(V2) then
      %% Two fully known values must be compatible.
      if {Compatible V1 V2}
      then machine(stack:RestStack env:M.env store:M.store
                   nextVar:M.nextVar suspended:M.suspended)
      else error(inconsistentValueBinding V1 V2)
      end
   end
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 8. Procedure application
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {StepCall M RestStack CallEnv ProcId ArgIds}
   ProcVar = {LookupEnv CallEnv ProcId}
in
   case {Deref M.store ProcVar}
   of unbound(_) then
      %% Calling an unbound procedure suspends.
      {Suspend M RestStack sem(call(ProcId ArgIds) CallEnv) waitFor(ProcVar)}

   [] Closure then
      if {IsClosure Closure} then
         Params = Closure.params
         Body   = Closure.body
         DefEnv = Closure.env
      in
         if {Length Params} \= {Length ArgIds} then
            error(arityMismatch ProcId)
         else
            %% Argument identifiers are resolved in the call-site environment.
            %% Parameter identifiers are installed in the procedure's contextual environment.
            %%
            %% This is lexical scoping:
            %%   free identifiers in Body come from DefEnv
            %%   formal parameters come from CallEnv arguments
            ArgVars = {Map ArgIds fun {$ A} {LookupEnv CallEnv A} end}
            ProcEnv = {ExtendMany DefEnv Params ArgVars}
         in
            machine(stack:{Push RestStack {SemStmt Body ProcEnv}}
                    env:M.env store:M.store nextVar:M.nextVar suspended:M.suspended)
         end
      else
         error(callingNonProcedure ProcId Closure)
      end
   end
end

fun {ExtendMany Env Ids Vars}
   case Ids#Vars
   of nil#nil then Env
   [] (I|Ir)#(V|Vr) then {ExtendMany {ExtendEnv Env I V} Ir Vr}
   else error(arityMismatchInExtendMany)
   end
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 9. Pattern matching and case
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {StepCase M RestStack Env ScrutineeId Pattern ThenS ElseS}
   V = {LookupEnv Env ScrutineeId}
in
   case {Deref M.store V}
   of unbound(_) then
      %% A case over an unknown structure cannot yet decide.
      %% This is dataflow suspension, not pattern-match failure.
      {Suspend M RestStack sem(caseS(ScrutineeId Pattern ThenS ElseS) Env)
               waitFor(V)}

   [] Value then
      MatchResult = {MatchPattern M.store Value Pattern Env}
   in
      case MatchResult
      of matched(Env1 Store1) then
         machine(stack:{Push RestStack {SemStmt ThenS Env1}}
                 env:M.env store:Store1 nextVar:M.nextVar suspended:M.suspended)
      [] failed then
         machine(stack:{Push RestStack {SemStmt ElseS Env}}
                 env:M.env store:M.store nextVar:M.nextVar suspended:M.suspended)
      [] delayed(NeedVar) then
         {Suspend M RestStack sem(caseS(ScrutineeId Pattern ThenS ElseS) Env)
                  waitFor(NeedVar)}
      end
   end
end

fun {MatchPattern Store Value Pattern Env}
   %% Simplified pattern matcher.
   %% Full Oz pattern matching includes records, features, variables, and guards.
   case Pattern
   of nilPat then
      if Value==nil then matched(Env Store) else failed end

   [] consPat(HeadId TailId) then
      case Value
      of cons(Head Tail) then
         %% Pattern variables are fresh source identifiers bound to fields.
         %% If fields are already store variables, bind directly to them.
         Env1 = {ExtendEnv {ExtendEnv Env HeadId Head} TailId Tail}
      in
         matched(Env1 Store)
      else failed
      end

   [] recordPat(Label FieldPats) then
      case Value
      of record(L Fields) then
         if L==Label then {MatchFields Store Fields FieldPats Env} else failed end
      else failed
      end

   else
      error(unknownPattern Pattern)
   end
end

fun {MatchFields Store Fields FieldPats Env}
   %% Field matching is reduced to environment extension and store checks.
   %% This is a sketch of the mechanism, not the full Oz feature system.
   case FieldPats
   of nil then matched(Env Store)
   [] (Feature#Id)|Rest then
      FieldValue = {LookupFeature Fields Feature}
      Env1 = {ExtendEnv Env Id FieldValue}
   in
      {MatchFields Store Fields Rest Env1}
   end
end

fun {LookupFeature Fields F}
   case Fields
   of nil then error(missingFeature F)
   [] (K#V)|Rest then if K==F then V else {LookupFeature Rest F} end
   end
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 10. Suspension and resumption
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {Suspend M RestStack Sem Reason}
   %% In the single-threaded abstract machine, suspension is recorded.
   %% In Program 2, a scheduler will keep other threads running.
   %%
   %% Dataflow suspension is waiting for information.
   %% It is not busy waiting and not an exception.
   machine(stack:RestStack
           env:M.env
           store:M.store
           nextVar:M.nextVar
           suspended:(Sem#Reason)|M.suspended)
end

fun {TryResume M}
   %% A real implementation would index suspended statements by variable.
   %% This sketch retries all suspended statements when the store changes.
   %%
   %% Resumption is safe because the store is monotonic:
   %% new bindings add information; they do not invalidate old bindings.
   NewStack = {Append {Map M.suspended fun {$ S#_} S end} M.stack}
in
   machine(stack:NewStack
           env:M.env
           store:M.store
           nextVar:M.nextVar
           suspended:nil)
end

fun {Run M Fuel}
   %% Fuel prevents an accidental infinite trace in examples.
   %% A terminated machine has an empty stack and no reducible suspended work.
   if Fuel==0 then M
   else
      if M.stack==nil then M
      else
         M1 = {Step M}
         M2 = {TryResume M1}
      in
         {Run M2 Fuel-1}
      end
   end
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 11. Declarative operations and programming techniques
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% A declarative operation is:
%%   independent    = depends only on explicit inputs
%%   stateless      = has no hidden mutable memory
%%   deterministic  = same inputs produce same outputs
%%
%% The following techniques do not extend the kernel language.
%% They are programming techniques built over the declarative model.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 11.1 Recursive procedure: factorial
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {FactKernel}
   %% Practical function:
   %%   fun {Fact N}
   %%      if N==0 then 1 else N*{Fact N-1} end
   %%   end
   %%
   %% Kernel-style procedure:
   %%   proc {Fact N ?R}
   %%      if N==0 then R=1 else
   %%         local N1 R1 in
   %%            N1=N-1
   %%            {Fact N1 R1}
   %%            R=N*R1
   %%         end
   %%      end
   %%   end
   %%
   %% Arithmetic primitives are assumed as built-in declarative operations.
   factKernelSketch
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 11.2 Iterative computation without mutable state
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

proc {LengthIter Xs ?R}
   %% Accumulator state is explicit data, not a cell.
   %% The changing "state" is the pair (remaining list, current count).
   %%
   %% This is implicit/threaded state:
   %%   state is carried by recursive parameters
   %%   no cell identity exists
   proc {Loop Ys Acc ?Out}
      case Ys
      of nil then Out=Acc
      [] _|Yr then {Loop Yr Acc+1 Out}
      end
   end
in
   {Loop Xs 0 R}
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 11.3 Structural recursion over lists
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

proc {Map Xs F ?Ys}
   %% Map is a higher-order declarative abstraction.
   %% It abstracts the traversal pattern over a list.
   %%
   %% F must itself be declarative if Map is to remain declarative.
   case Xs
   of nil then Ys=nil
   [] X|Xr then
      local Y Yr in
         {F X Y}
         Ys=Y|Yr
         {Map Xr F Yr}
      end
   end
end

proc {FoldL Xs F Acc0 ?R}
   %% FoldL is an accumulator pattern.
   %% It expresses iterative computation without mutable variables.
   case Xs
   of nil then R=Acc0
   [] X|Xr then
      local Acc1 in
         {F Acc0 X Acc1}
         {FoldL Xr F Acc1 R}
      end
   end
end

proc {FoldR Xs F Base ?R}
   %% FoldR follows the recursive structure of the list.
   %% It may keep pending work after the recursive call.
   case Xs
   of nil then R=Base
   [] X|Xr then
      local Rr in
         {FoldR Xr F Base Rr}
         {F X Rr R}
      end
   end
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 11.4 Difference-list sketch
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

proc {AppendD Xs-Ys Ys-Zs ?XsZs}
   %% Difference list representation:
   %%   FullList-TailVariable
   %%
   %% Appending is done by binding the open tail.
   %% This relies on single assignment.
   %%
   %% Common mistake:
   %%   using the same open tail twice.
   %%   Once a tail is bound, it cannot be rebound.
   XsZs = Xs-Zs
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 11.5 Declarative ADT sketch
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {NewStackADT}
   %% A declarative ADT hides representation behind operations.
   %% No mutable cell is needed.
   %%
   %% Each operation returns a new value when the abstract value changes.
   %%
   %% Interface:
   %%   empty  : Stack
   %%   push   : Stack * Value -> Stack
   %%   pop    : Stack -> Value * Stack
   %%   isEmpty: Stack -> Bool
   %%
   %% Hidden representation:
   %%   a list
   %%
   %% Client code should depend only on the interface.
   stackADT(
      empty: fun {$} nil end

      push: proc {$ S X ?R}
               R = X|S
            end

      pop: proc {$ S ?X ?R}
              case S
              of nil then raise emptyStack end
              [] H|T then X=H R=T
              end
           end

      isEmpty: proc {$ S ?B}
                  B = (S==nil)
               end)
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 12. Kernel trace examples
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% Trace A: variable creation and binding
%%
%% Source-like idea:
%%   local X in X=3 end
%%
%% Kernel trace:
%%   stack: [local X in bind(id(X) int(3)) end]
%%   local creates fresh store variable sv(1)
%%   env becomes {X -> sv(1)}
%%   bind(id(X), int(3)) adds sv(1)=3 to the store
%%
%% Concept:
%%   identifier X is not the store variable sv(1).


%% Trace B: variable-variable binding
%%
%% Source-like idea:
%%   local X in local Y in X=Y Y=7 end end
%%
%% Trace:
%%   X -> sv(1)
%%   Y -> sv(2)
%%   X=Y adds sv(1)=sv(2)
%%   Y=7 adds sv(2)=7
%%   deref(sv(1)) follows sv(1)->sv(2)->7
%%
%% Concept:
%%   X=Y is equality / unification-like binding, not copying.


%% Trace C: closure and contextual environment
%%
%% Source-like idea:
%%   local N MulByN R in
%%      N=10
%%      MulByN = proc {$ X ?Y} Y=N*X end
%%      {MulByN 3 R}
%%   end
%%
%% Trace:
%%   procedure value stores the environment where N is bound.
%%   call-site environment gives X and R.
%%   body uses contextual environment + parameter bindings.
%%
%% Concept:
%%   lexical scope depends on closure.env, not only call.env.


%% Trace D: dataflow suspension
%%
%% Source-like idea:
%%   local X Y in
%%      if X then Y=1 else Y=0 end
%%      X=true
%%   end
%%
%% Trace:
%%   if needs X
%%   X is unbound -> statement suspends
%%   X=true adds information
%%   suspended if can resume and choose then branch
%%
%% Concept:
%%   unbound dataflow variable causes waiting, not failure.


%% Trace E: case over list
%%
%% Source-like idea:
%%   case Xs of nil then R=0 [] _|Xr then R=1 end
%%
%% Trace:
%%   if Xs is unbound -> suspend
%%   if Xs=nil -> nil branch
%%   if Xs=H|T -> cons branch and pattern variables bind to H and T
%%
%% Concept:
%%   pattern matching may both test structure and introduce bindings.


%% Trace F: declarative ADT use
%%
%% Source-like idea:
%%   Stack = {NewStackADT}
%%   S0 = {Stack.empty}
%%   {Stack.push S0 a S1}
%%   {Stack.pop S1 X S2}
%%
%% Trace:
%%   operations expose stack behavior
%%   representation remains hidden as a list
%%   no cell is used
%%
%% Concept:
%%   data abstraction does not require explicit state.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 13. Model boundary notes
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% Boundary 1:
%%   This model has no cell.
%%   A variable can be bound once, but no container can change content.
%%
%% Boundary 2:
%%   This model has no port.
%%   Communication through streams needs known structural producers.
%%
%% Boundary 3:
%%   This model has no thread in the operational core here.
%%   Suspension is recorded, but no independent activity runs.
%%
%% Boundary 4:
%%   This model has no choice/fail/search.
%%   It computes within one deterministic declarative world.
%%
%% Boundary 5:
%%   This model is still expressive enough for many techniques:
%%   recursion, folds, accumulators, higher-order programming, ADTs.
%%
%% Later programs add one concept at a time:
%%   + thread / stream / port
%%   + cell / object / lock / transaction
%%   + choice / constraint / computation space
%%
%% The point is not Turing completeness.
%% The point is expressiveness + reasoning cost.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
```

### Program 2. Declarative Concurrency / Streams / Message Passing

This program compresses the CTMCP line from declarative concurrency to message-passing concurrency. It keeps the first model’s discipline—`thread` + `dataflow variable` + `stream`—then adds `port` as one new concept that permits many-to-one asynchronous communication and makes message order observable.

```oz
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% Program 2. Declarative Concurrency / Streams / Message Passing
%%
%% This file is an annotated study implementation in CTMCP style.
%% It models the transition:
%%
%%   declarative kernel
%%     + thread
%%     + dataflow suspension
%%     + stream
%%     + laziness / demand
%%     + port
%%     + port object
%%   → message-passing concurrency
%%
%% Main semantic separations:
%%   concurrency       != parallelism
%%   dataflow wait     != lock wait
%%   stream            != mutable queue
%%   thread            != port
%%   stream object     != port object
%%   asynchronous send != procedure call
%%
%% Declarative concurrency:
%%   threads may run in different orders,
%%   but if communication is only by single-assignment variables,
%%   the final observable value remains deterministic.
%%
%% Message passing:
%%   many senders may send to one port.
%%   message arrival order may become observable.
%%   this adds expressive power and removes full declarativeness.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 1. Thread and dataflow variables
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% A thread is an independent activity.
%% It is a language concept, not a promise of physical parallel hardware.
%%
%% Parallelism:
%%   implementation may use several processors.
%%
%% Concurrency:
%%   the program has several independent activities whose order is not fixed.

proc {Spawn Statement}
   %% Abstract form:
   %%   create a new task for Statement
   %%   parent task continues immediately
   %%
   %% In real Oz:
   %%   thread Statement end
   %%
   %% A declarative thread communicates through dataflow variables.
   %% If it needs an unbound variable, it suspends without consuming CPU.
   thread Statement end
end


proc {WaitForBound X}
   %% Dataflow synchronization:
   %%   if X is unbound, the current thread suspends.
   %%   when X becomes bound, the thread resumes.
   %%
   %% This is not:
   %%   - busy waiting
   %%   - polling
   %%   - failure
   %%   - lock acquisition
   local _ in
      _ = X
   end
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% Trace A: dataflow waiting
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% Example:
%%
%%   declare X Y
%%   thread Y = X * X end
%%   X = 10
%%
%% Trace:
%%   thread tries to compute X*X
%%   X is unbound → thread suspends
%%   main thread binds X=10
%%   suspended thread resumes
%%   Y is bound to 100
%%
%% Concept:
%%   dataflow variable coordinates threads by information availability.
%%   The thread waits for binding, not for permission.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 2. Declarative concurrency as order-insensitive calculation
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

proc {OrderDeterminingExample ?R}
   %% Creation order is not the same as computation order.
   %% Dependencies determine what can run.
   local A B C D in
      thread A = 10 end
      thread B = A + 1 end
      thread C = B * 2 end
      thread D = C - 3 end
      R = D
   end
end

%% Trace:
%%   B waits for A
%%   C waits for B
%%   D waits for C
%%   scheduling may vary, but dependencies force the same result.
%%
%% Declarative concurrency remains declarative when nondeterminism
%% in scheduling is not observable in the program result.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 3. Streams as open lists
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% A stream is a list whose tail may be unbound.
%%
%%   X1 | X2 | X3 | Tail
%%
%% The producer binds the open tail step by step.
%% The consumer pattern matches on the stream and waits if the tail is unbound.
%%
%% Stream != mutable queue:
%%   stream extension binds single-assignment tails
%%   queue update mutates a data structure

proc {From N ?S}
   %% Infinite eager stream of integers starting at N.
   %%
   %% Eager stream:
   %%   producer tries to produce immediately.
   %%   consumer waits when it reaches an unbound tail.
   S = N | Sr
   {From N+1 Sr}
end

proc {Take N S ?Prefix}
   %% Take a finite prefix from a stream.
   %% This is a consumer.
   if N == 0 then
      Prefix = nil
   else
      case S
      of X | Xr then
         local Pr in
            Prefix = X | Pr
            {Take N-1 Xr Pr}
         end
      end
   end
end

proc {MapStream S F ?T}
   %% A stream transducer:
   %%   input stream S
   %%   output stream T
   %%
   %% It consumes one element, transforms it, and produces one element.
   case S
   of nil then
      T = nil
   [] X | Xr then
      local Y Yr in
         {F X Y}
         T = Y | Yr
         {MapStream Xr F Yr}
      end
   end
end

proc {FilterStream S Pred ?T}
   %% Filter is a transducer whose output rate may differ from input rate.
   %% If Pred needs an unbound value, this thread suspends.
   case S
   of nil then
      T = nil
   [] X | Xr then
      local B in
         {Pred X B}
         if B then
            local Tr in
               T = X | Tr
               {FilterStream Xr Pred Tr}
            end
         else
            {FilterStream Xr Pred T}
         end
      end
   end
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% Trace B: producer-consumer stream
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% Example:
%%
%%   local S P in
%%      thread {From 1 S} end
%%      thread {Take 5 S P} end
%%   end
%%
%% Trace:
%%   producer binds S = 1|S1
%%   consumer reads 1 and asks for S1
%%   producer binds S1 = 2|S2
%%   consumer proceeds
%%
%% Concept:
%%   the stream is an incrementally bound list.
%%   the consumer does not destructively remove elements.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 4. Pipelines
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

proc {PipelineExample ?Out}
   %% Pipeline:
   %%   producer → transducer → transducer → consumer
   %%
   %% Each stage may run in its own thread.
   %% Communication is still declarative if it uses only streams.
   local S1 S2 S3 in
      thread {From 1 S1} end

      thread
         {MapStream S1
          proc {$ X ?Y} Y = X * X end
          S2}
      end

      thread
         {FilterStream S2
          proc {$ X ?B} B = (X mod 2 == 0) end
          S3}
      end

      {Take 5 S3 Out}
   end
end

%% Trace:
%%   From produces integers.
%%   MapStream produces squares.
%%   FilterStream keeps even squares.
%%   Take requests a finite prefix.
%%
%% Model point:
%%   pipeline topology creates a network of stream objects.
%%   execution order is scheduled dynamically, but values are determined by data.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 5. Lazy streams and demand-driven computation
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun lazy {LazyFrom N}
   %% Lazy stream:
   %%   the next cell is computed only when demanded.
   %%
   %% Data-driven stream:
   %%   producer pushes values.
   %%
   %% Demand-driven stream:
   %%   consumer need triggers production.
   N | {LazyFrom N+1}
end

fun {LazyTake N S}
   if N == 0 then nil
   else
      case S
      of X | Xr then X | {LazyTake N-1 Xr}
      end
   end
end

%% Trace C: lazy infinite stream
%%
%%   S = {LazyFrom 1}
%%   P = {LazyTake 3 S}
%%
%% Trace:
%%   defining S does not build the infinite list
%%   demanding P forces first cell of S
%%   demanding tail of P forces next cell
%%
%% Concept:
%%   laziness is demand-driven execution.
%%   it is independent from thread concurrency, but combines well with it.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 6. Programmed triggers
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {TriggerFrom N}
   %% A programmed trigger represents demand explicitly as a zero-argument function.
   %% This is a bridge between ordinary higher-order programming and laziness.
   fun {$}
      N # {TriggerFrom N+1}
   end
end

fun {TriggerTake N Trigger}
   if N == 0 then nil
   else
      X#NextTrigger = {Trigger}
   in
      X | {TriggerTake N-1 NextTrigger}
   end
end

%% Trace:
%%   consumer calls Trigger
%%   producer returns one value and a new trigger
%%   no stream tail is bound until the trigger is invoked
%%
%% Concept:
%%   demand can be represented as an explicit protocol.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 7. Port kernel concept
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% A port is an asynchronous entry point to a stream.
%%
%% Kernel operations:
%%
%%   {NewPort S P}
%%      creates a stream S and a port P associated with that stream.
%%
%%   {Send P M}
%%      appends message M to P's stream.
%%
%% Difference from stream object:
%%   stream object usually knows its input stream source.
%%   port object accepts messages from any thread holding the port.
%%
%% This is many-to-one communication.

proc {NewPortSketch ?S ?P}
   %% In a real implementation, P contains a hidden tail reference.
   %% Sending appends to the current tail and advances it.
   %%
   %% The hidden tail is stateful.
   %% This is why ports are no longer fully declarative.
   {NewPort S P}
end

proc {SendSketch P M}
   %% Send is asynchronous.
   %% The sender continues immediately.
   %% The receiver handles the message later by reading the associated stream.
   {Send P M}
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% Trace D: raw port
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% Example:
%%
%%   local S P in
%%      {NewPort S P}
%%      thread for M in S do {Browse M} end end
%%      {Send P hi}
%%      {Send P there}
%%   end
%%
%% Trace:
%%   NewPort creates stream S and port P
%%   receiver thread waits on S
%%   Send P hi appends hi to S
%%   receiver sees hi
%%   Send P there appends there to later stream tail
%%
%% Concept:
%%   P is not the stream.
%%   P is the asynchronous entry point to the stream.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 8. Stream object
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {NewStreamObject Init Transition}
   %% A stream object processes a known input stream.
   %%
   %% Transition:
   %%   State * Message -> NewState
   %%
   %% The stream object itself is still declarative if Transition is declarative
   %% and the input stream order is fixed by the surrounding program.
   proc {Loop In State ?FinalState}
      case In
      of nil then
         FinalState = State
      [] Msg | Inr then
         local State1 in
            {Transition State Msg State1}
            {Loop Inr State1 FinalState}
         end
      end
   end
in
   Loop
end

%% Trace:
%%   stream object = recursive fold over a stream.
%%   state is carried as an accumulator, not as a cell.
%%   the object knows where the next input comes from.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 9. Port object abstraction
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {NewPortObject Init Transition}
   %% A port object combines:
   %%   port          = asynchronous many-to-one entry
   %%   stream        = serialized message sequence
   %%   transition    = state update over messages
   %%   thread        = independent message-processing activity
   %%
   %% State is threaded through the loop as an accumulator.
   %% Raw port nondeterminism is confined to message arrival order.
   local S P in
      {NewPort S P}

      thread
         local
            proc {Loop Msgs State}
               case Msgs
               of nil then skip
               [] Msg | Rest then
                  local State1 in
                     {Transition State Msg State1}
                     {Loop Rest State1}
                  end
               end
            end
         in
            {Loop S Init}
         end
      end

      P
   end
end

fun {NewStatelessPortObject Handler}
   %% Stateless port object:
   %%   each message is handled independently.
   %%
   %% This is useful for logging, browsing, or forwarding messages.
   local S P in
      {NewPort S P}
      thread
         for Msg in S do
            {Handler Msg}
         end
      end
      P
   end
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% Trace E: port object
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% Port object trace:
%%
%%   P = {NewPortObject Init Transition}
%%   {Send P msg1}
%%   {Send P msg2}
%%
%% Internal trace:
%%   msg1 appears on stream S
%%   loop applies Transition Init msg1 -> State1
%%   msg2 appears later
%%   loop applies Transition State1 msg2 -> State2
%%
%% Concept:
%%   message handling is sequential inside one port object.
%%   this limits interleavings and supports invariant reasoning.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 10. Counter server as port object
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {NewCounterServer}
   %% Message protocol:
   %%   inc(N)       : add N to counter
   %%   get(Reply)   : bind Reply to current count
   %%   reset        : reset counter to 0
   %%   stop         : ignore rest in this sketch
   %%
   %% Reply is a dataflow variable supplied by the client.
   %% This simulates request/reply without synchronous procedure call.
   fun {Transition Count Msg}
      case Msg
      of inc(N) then
         Count + N

      [] get(Reply) then
         Reply = Count
         Count

      [] reset then
         0

      [] stop then
         Count

      else
         %% Protocol error.
         %% A robust server could reply with an error or enter an error state.
         Count
      end
   end
in
   {NewPortObject 0
    proc {$ State Msg ?NewState}
       NewState = {Transition State Msg}
    end}
end

proc {CounterClient P}
   %% Client sends asynchronously.
   %% It waits only when it needs a reply variable.
   local R in
      {Send P inc(1)}
      {Send P inc(2)}
      {Send P get(R)}
      {Browse R}
   end
end

%% Trace:
%%   client sends inc(1), inc(2), get(R)
%%   server processes them in stream order
%%   R is bound to 3
%%
%% If two clients send concurrently:
%%   message order may be inc(A), inc(B), get(R)
%%   or inc(B), get(R), inc(A)
%%
%% The result observed by get(R) may differ.
%% This is observable nondeterminism.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 11. Two clients and observable message order
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

proc {TwoClientRace ?R1 ?R2}
   local P in
      P = {NewCounterServer}

      thread
         {Send P inc(10)}
         {Send P get(R1)}
      end

      thread
         {Send P inc(100)}
         {Send P get(R2)}
      end
   end
end

%% Possible traces:
%%
%%   Trace 1:
%%      inc(10), get(R1), inc(100), get(R2)
%%      R1=10, R2=110
%%
%%   Trace 2:
%%      inc(100), get(R2), inc(10), get(R1)
%%      R2=100, R1=110
%%
%%   Trace 3:
%%      inc(10), inc(100), get(R1), get(R2)
%%      R1=110, R2=110
%%
%% Concept:
%%   many-to-one message passing removes the Chapter 4 limitation,
%%   but message arrival order becomes part of observable behavior.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 12. Message protocol as a design object
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% A message protocol is not a comment.
%% It is the boundary that lets concurrent components be reasoned about.
%%
%% Counter protocol:
%%
%%   State:
%%      count : Int
%%
%%   Messages:
%%      inc(N)       where N:Int
%%      get(Reply)   where Reply is a dataflow variable
%%      reset
%%      stop
%%
%%   Invariant:
%%      count is an integer
%%
%%   Transition:
%%      inc(N)     : count' = count + N
%%      get(R)     : R = count, count' = count
%%      reset      : count' = 0
%%
%% Common mistake:
%%   changing the internal transition function without updating the protocol.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 13. Broadcast query pattern
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

proc {BroadcastQuery Ports Query ?Answers}
   %% A list operation can become a concurrency pattern.
   %%
   %% For each port:
   %%   create a reply variable
   %%   send query(Query Reply)
   %%   collect Reply in a result list
   %%
   %% Replies may arrive in any time order,
   %% but Answers preserves the order of Ports.
   case Ports
   of nil then
      Answers = nil
   [] P | Pr then
      local A Ar in
         {Send P query(Query A)}
         Answers = A | Ar
         {BroadcastQuery Pr Query Ar}
      end
   end
end

%% Concept:
%%   message passing can reuse declarative list patterns.
%%   the list structure is declarative; the replies are dataflow variables.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 14. Player example: circular message passing
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {NewPlayer Others}
   %% Component:
   %%   player receives ball
   %%   chooses one of the other players
   %%   sends ball to that player
   %%
   %% The component diagram has players as nodes and ball messages as edges.
   {NewStatelessPortObject
    proc {$ Msg}
       case Msg
       of ball then
          local I Target in
             I = ({OS.rand} mod {Width Others}) + 1
             Target = Others.I
             {Send Target ball}
          end
       else
          skip
       end
    end}
end

%% Trace:
%%   P1 receives ball
%%   P1 sends ball to P2 or P3
%%   receiver continues the protocol
%%
%% Concept:
%%   randomness and message order are observable.
%%   this is not declarative concurrency.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 15. Lift-system design skeleton
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% A realistic message-passing system is designed in layers:
%%
%%   informal specification
%%   → component diagram
%%   → message protocols
%%   → state diagrams
%%   → implementation and scheduling
%%   → test and iterate
%%
%% Component sketch:
%%
%%   FloorButton
%%      sends request(Floor) to Controller
%%
%%   Controller
%%      receives requests
%%      schedules Lift commands
%%      sends moveTo(Floor), openDoor, closeDoor
%%
%%   Lift
%%      receives movement commands
%%      reports arrived(Floor), doorClosed, failure(...)
%%
%% This structure matters more than the exact code.
%% The state diagram prevents message handlers from becoming accidental spaghetti.

fun {NewController LiftPorts}
   %% State:
   %%   pending floors, current assignments, known lift status
   %%
   %% Message protocol:
   %%   request(Floor)
   %%   arrived(Lift Floor)
   %%   failure(Lift Reason)
   %%
   %% This skeleton keeps state-transition structure visible.
   {NewPortObject controllerState(pending:nil lifts:LiftPorts)
    proc {$ State Msg ?State1}
       case Msg
       of request(Floor) then
          %% Add request and possibly send command to a lift.
          State1 = {AddPending State Floor}

       [] arrived(Lift Floor) then
          %% Update lift status and remove served request.
          State1 = {MarkArrived State Lift Floor}

       [] failure(Lift Reason) then
          %% Fault handling belongs in the protocol, not as an afterthought.
          State1 = {MarkFailed State Lift Reason}

       else
          State1 = State
       end
    end}
end

fun {AddPending State Floor}
   %% Placeholder for a pure transition.
   %% Transition functions should be small and testable.
   State
end

fun {MarkArrived State Lift Floor}
   State
end

fun {MarkFailed State Lift Reason}
   State
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 16. Erlang-style mailbox comparison
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% Port object:
%%   messages are read from one stream in arrival order.
%%
%% Erlang process:
%%   process has a mailbox.
%%   receive can select a message matching a pattern,
%%   leaving unmatched messages in the mailbox.
%%
%% Selective receive is not just case on the first message.
%% It is a different protocol abstraction.

fun {MailboxReceive Mailbox Pattern Handler}
   %% This is only a semantic sketch.
   %%
   %% Search mailbox for first message matching Pattern.
   %% Matched message is removed.
   %% Unmatched messages stay.
   case Mailbox
   of nil then
      suspended(waitingForMessage(Pattern))
   [] M | Mr then
      if {Matches M Pattern} then
         {Handler M}
      else
         %% In real selective receive, M remains in the mailbox
         %% while the search continues through later messages.
         {MailboxReceive Mr Pattern Handler}
      end
   end
end

fun {Matches M Pattern}
   %% Placeholder for pattern matching.
   true
end

%% Concept:
%%   Erlang-style receive gives more control over message selection.
%%   Port-object stream processing is simpler and easier to reason about.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 17. Model boundary notes
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% Boundary 1:
%%   Declarative concurrency is deterministic if communication uses
%%   single-assignment dataflow variables and observable exceptions are avoided.
%%
%% Boundary 2:
%%   Ports introduce many-to-one communication.
%%   This solves client/server expressiveness problems.
%%
%% Boundary 3:
%%   Ports contain hidden state: the current stream tail.
%%   This is why message passing is more expressive than pure declarative streams.
%%
%% Boundary 4:
%%   Port objects discipline message passing through:
%%      protocol
%%      serialized processing
%%      state transition function
%%      component diagram
%%
%% Boundary 5:
%%   Raw port programming is sometimes useful but harder to reason about.
%%   Port objects provide an abstraction barrier.
%%
%% Boundary 6:
%%   Shared-state concurrency is not yet modeled here.
%%   Program 3 will add cells, locks, monitors, and transactions.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 18. Compact tracing checklist
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% For a dataflow thread:
%%   current statement
%%   variables needed
%%   which variables are unbound
%%   which binding resumes the thread
%%
%% For a stream:
%%   current head
%%   current open tail
%%   producer binding
%%   consumer suspension/resumption
%%
%% For a lazy stream:
%%   demanded prefix
%%   forced computation
%%   memoized result
%%
%% For a port:
%%   port entry point
%%   associated stream
%%   sender
%%   message
%%   stream order
%%
%% For a port object:
%%   current state
%%   received message
%%   transition function
%%   next state
%%   outgoing messages
%%
%% Common mistakes:
%%   - treating streams as destructive queues
%%   - treating Send as a synchronous procedure call
%%   - assuming thread creation order fixes computation order
%%   - assuming all concurrency is nondeterministic in the same way
%%   - forgetting that port object state is often just an accumulator over messages
%%   - ignoring message protocol design
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
```
### Program 3. Explicit State / Objects / Shared-State Concurrency

This program compresses the CTMCP line from `explicit state` to `objects` and then to `shared-state concurrency`. It adds `cell` as the minimal state concept, builds object-style and class-style abstractions on top of cells, then shows how `thread + cell` creates races that must be controlled by locks, monitors, or transactions.

```oz
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% Program 3. Explicit State / Objects / Shared-State Concurrency
%%
%% This file is an annotated study implementation in CTMCP style.
%% It models the transition:
%%
%%   declarative computation
%%     + cell / Exchange
%%   → explicit state
%%     + object style
%%     + class / inheritance / self
%%   → object-oriented programming
%%     + thread
%%   → shared-state concurrency
%%     + lock / monitor / transaction
%%
%% Main semantic separations:
%%   implicit state      != explicit state
%%   cell name           != cell content
%%   stateful object     != class
%%   inheritance         != substitutability
%%   thread + cell       != declarative concurrency
%%   lock                != monitor
%%   monitor             != transaction
%%
%% State improves modularity:
%%   internal memory can be hidden behind an interface.
%%
%% State weakens declarative reasoning:
%%   the same operation may return different results at different times.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 1. Explicit state: cell identity and content
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% In the declarative model, information grows monotonically:
%%   a variable is bound once.
%%
%% A cell introduces a state identity whose content may change over time.
%%
%% State = identity + current content + update operation
%%
%% The identity is stable.
%% The content is time-varying.

proc {NewCellSketch Init ?C}
   %% Kernel idea:
   %%   {NewCell Init C}
   %%
   %% C is a cell name, not Init itself.
   %% The mutable store maps:
   %%   C -> Init
   %%
   {NewCell Init C}
end

proc {ExchangeSketch C New ?Old}
   %% Kernel primitive:
   %%   {Exchange C Old New}
   %%
   %% Exchange atomically:
   %%   reads current content into Old
   %%   replaces current content with New
   %%
   %% @ and := can be defined from Exchange.
   {Exchange C Old New}
end

fun {Read C}
   %% Derived operation:
   %%   @C
   %%
   %% Reading returns the current content.
   %% It does not change the cell.
   @C
end

proc {Assign C X}
   %% Derived operation:
   %%   C := X
   %%
   %% Assignment changes the content.
   %% It does not change the cell name.
   C := X
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% Trace A: cell identity vs content
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% Example:
%%
%%   local C X Y in
%%      {NewCell 0 C}
%%      X = @C
%%      C := 1
%%      Y = @C
%%   end
%%
%% Trace:
%%   C is a stable cell identity.
%%   initially content(C)=0, so X=0
%%   after assignment content(C)=1, so Y=1
%%
%% Concept:
%%   C is not 0 and not 1.
%%   C is the name of a mutable location whose content changes.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 2. Implicit state vs explicit state
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

proc {SumListThreaded Xs Acc ?R}
   %% Threaded state:
   %%   state is passed as an ordinary value.
   %%
   %% This is still declarative.
   %% The changing "state" is visible in the argument list.
   case Xs
   of nil then R = Acc
   [] X | Xr then {SumListThreaded Xr Acc+X R}
   end
end

fun {NewSumCounter}
   %% Explicit state:
   %%   number of calls is hidden in a private cell.
   %%
   %% The public interface does not expose the state argument.
   %% This improves modularity, but the operation now has history.
   local Count in
      {NewCell 0 Count}

      proc {$ Xs ?Sum ?Calls}
         Count := @Count + 1
         {SumListThreaded Xs 0 Sum}
         Calls = @Count
      end
   end
end

%% Trace:
%%   F = {NewSumCounter}
%%   {F [1 2 3] S1 C1}  -> C1=1
%%   {F [4 5]   S2 C2}  -> C2=2
%%
%% Concept:
%%   same procedure value remembers earlier calls.
%%   this is useful, but no longer declarative.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 3. Stateful abstraction: counter
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {NewCounter}
   %% A stateful abstraction hides a cell behind operations.
   %%
   %% Interface:
   %%   inc(N)
   %%   get($)
   %%   reset
   %%
   %% Hidden representation:
   %%   private cell Count
   local Count in
      {NewCell 0 Count}

      counter(
         inc: proc {$ N}
                 Count := @Count + N
              end

         get: fun {$}
                 @Count
              end

         reset: proc {$}
                   Count := 0
                end)
   end
end

%% Trace:
%%
%%   C = {NewCounter}
%%   {C.inc 3}
%%   {C.inc 4}
%%   R = {C.get}
%%
%% Trace state:
%%   Count content: 0 → 3 → 7
%%   R=7
%%
%% Common mistake:
%%   thinking Count is re-created on every operation.
%%   It is created once when NewCounter is called.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 4. Revocable capability
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {Revocable Capability}
   %% A capability is an authority-bearing value.
   %% If a client has it, the client can perform an action.
   %%
   %% Revocation uses explicit state:
   %%   a cell stores the currently enabled capability.
   %%   the revoker replaces it with a failing procedure.
   local Current in
      {NewCell Capability Current}

      revocable(
         use: proc {$ X ?R}
                 {@Current X R}
              end

         revoke: proc {$}
                    Current := proc {$ _ ?_}
                                  raise revokedCapability end
                               end
                 end)
   end
end

%% Trace:
%%   R = {Revocable Cap}
%%   {R.use X Y}       -> forwards to Cap
%%   {R.revoke}
%%   {R.use X Z}       -> raises revokedCapability
%%
%% Concept:
%%   revocation cannot be expressed by merely deleting the client's reference.
%%   the reference remains, but its behavior is changed through hidden state.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 5. Object style before class syntax
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {NewAccountObject InitBalance}
   %% Object style:
   %%   data and operations are combined in one entity.
   %%
   %% This differs from ADT style:
   %%   ADT style keeps values and operations more separate.
   %%
   %% The object has identity because it closes over a private cell.
   local Balance in
      {NewCell InitBalance Balance}

      account(
         deposit: proc {$ N}
                    Balance := @Balance + N
                  end

         withdraw: proc {$ N ?Ok}
                     if @Balance >= N then
                        Balance := @Balance - N
                        Ok = true
                     else
                        Ok = false
                     end
                   end

         getBalance: fun {$}
                       @Balance
                     end)
   end
end

%% Trace:
%%   A = {NewAccountObject 100}
%%   {A.withdraw 30 Ok}
%%   B = {A.getBalance}
%%
%% content(Balance): 100 → 70
%% Ok=true, B=70
%%
%% Concept:
%%   object style does not require class syntax.
%%   class syntax is a later organization mechanism.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 6. Class and object sketch
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% A class packages:
%%   attribute declarations
%%   method definitions
%%   inheritance information
%%
%% An object instance contains:
%%   a reference to class behavior
%%   per-object attribute cells
%%
%% Message dispatch:
%%   object + message -> method lookup -> method body
%%
%% self:
%%   the current receiver object.
%%   calls through self are dynamically dispatched.

class CounterClass
   attr value

   meth init(N)
      %% Attribute value is backed by a cell.
      value := N
   end

   meth inc(N)
      value := @value + N
   end

   meth get($)
      @value
   end
end

%% Trace:
%%   C = {New CounterClass init(0)}
%%   {C inc(2)}
%%   R = {C get($)}
%%
%% Object creation:
%%   allocate attribute cell value
%%   send init(0)
%%   return object reference
%%
%% Method call:
%%   receiver C
%%   message inc(2)
%%   lookup method inc in CounterClass
%%   method uses C's value cell


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 7. Inheritance and dynamic binding
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

class LoggingCounterClass from CounterClass
   meth inc(N)
      %% This method overrides the inherited inc.
      %% It can add behavior before or after reusing the ancestor method.
      {Browse increment(N)}
      CounterClass,inc(N)
   end
end

class DoubleStepCounterClass from CounterClass
   meth inc(N)
      %% Calling self means dynamic dispatch.
      %% If another subclass overrides inc, self-inc can route differently.
      %%
      %% This example is deliberately dangerous:
      %% self calls must be understood through dynamic binding.
      {self rawInc(N)}
      {self rawInc(N)}
   end

   meth rawInc(N)
      value := @value + N
   end
end

%% Static binding:
%%   CounterClass,inc(N)
%%   calls a named ancestor method.
%%
%% Dynamic binding:
%%   {self inc(N)}
%%   dispatches according to the current receiver.
%%
%% Common mistake:
%%   treating self as "the class where the method is written."
%%   self is the receiver object.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 8. Substitution property
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

class BoundedCounterClass from CounterClass
   attr max

   meth init(N Max)
      CounterClass,init(N)
      max := Max
   end

   meth inc(N)
      if @value + N =< @max then
         value := @value + N
      else
         raise counterLimitExceeded end
      end
   end
end

%% Inheritance is a mechanism.
%% Substitutability is a behavioral property.
%%
%% If client code expects every CounterClass object to accept inc(N)
%% without raising counterLimitExceeded, then BoundedCounterClass may not be
%% substitutable even though it inherits from CounterClass.
%%
%% Concept:
%%   inheritance != substitution.
%%   subclassing must preserve the contract expected by clients.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 9. Active object: class behavior + message passing
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {NewActive Class InitMessage}
   %% Active object combines:
   %%   class-defined state and methods
   %%   port-object serialized message processing
   %%
   %% The ordinary object is used only by its internal server thread.
   %% Clients send messages asynchronously.
   local Obj S P in
      Obj = {New Class InitMessage}
      {NewPort S P}

      thread
         for Msg in S do
            {Obj Msg}
         end
      end

      P
   end
end

%% Trace:
%%   P = {NewActive CounterClass init(0)}
%%   {Send P inc(1)}
%%   {Send P inc(2)}
%%   {Send P get(R)}
%%
%% Concept:
%%   method execution is serialized by one message-processing thread.
%%   this is closer to port objects than to shared-state concurrent objects.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 10. Shared-state concurrency: thread + cell
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {NewUnsafeCounter}
   local C in
      {NewCell 0 C}

      unsafeCounter(
         inc: proc {$}
                 %% This read-modify-write is not atomic.
                 %%
                 %% Steps:
                 %%   1. read @C
                 %%   2. compute @C + 1
                 %%   3. write C := result
                 %%
                 %% Another thread may interleave between these steps.
                 C := @C + 1
              end

         get: fun {$}
                 @C
              end)
   end
end

proc {LostUpdateExample ?R}
   local C in
      C = {NewUnsafeCounter}

      thread {C.inc} end
      thread {C.inc} end

      %% If both threads read 0 before either writes,
      %% both compute 1 and both write 1.
      %%
      %% Expected sequential result: 2
      %% Possible concurrent result: 1
      R = {C.get}
   end
end

%% Concept:
%%   race condition = correctness depends on interleaving.
%%   harmless scheduling variation affects timing only.
%%   a race affects observable result.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 11. Lock-protected critical section
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {NewLockedCounter}
   local C L in
      {NewCell 0 C}
      L = {NewLock}

      lockedCounter(
         inc: proc {$}
                 lock L then
                    %% Critical section:
                    %% no other thread using L can enter here concurrently.
                    C := @C + 1
                 end
              end

         add: proc {$ N}
                 lock L then
                    C := @C + N
                 end
              end

         get: fun {$}
                 lock L then @C end
              end)
   end
end

%% Trace:
%%   thread A enters lock
%%   thread B waits
%%   A reads, computes, writes, exits
%%   B enters afterward
%%
%% Concept:
%%   lock groups several small operations into one larger atomic action.
%%
%% Common mistake:
%%   protecting the write but not the read.
%%   the entire invariant-sensitive region must be inside the lock.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 12. Deadlock pattern
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

proc {DeadlockSketch}
   local L1 L2 in
      L1 = {NewLock}
      L2 = {NewLock}

      thread
         lock L1 then
            %% Thread A holds L1 and waits for L2.
            lock L2 then skip end
         end
      end

      thread
         lock L2 then
            %% Thread B holds L2 and waits for L1.
            lock L1 then skip end
         end
      end
   end
end

%% Trace:
%%   A acquires L1
%%   B acquires L2
%%   A waits for L2
%%   B waits for L1
%%
%% Concept:
%%   locks prevent races but can introduce deadlocks.
%%   lock ordering is a design discipline, not an implementation detail.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 13. Monitor: lock + condition waiting
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {NewBoundedBuffer N}
   %% Monitor-style bounded buffer.
   %%
   %% Interface:
   %%   put(X) waits while buffer is full
   %%   get(?X) waits while buffer is empty
   %%
   %% Monitor = lock + wait set + notify / notifyAll.
   %%
   %% wait:
   %%   suspend current thread
   %%   put it in wait set
   %%   release monitor lock
   %%   later reacquire lock before continuing
   %%
   %% notify:
   %%   wake one waiting thread, but it must still reacquire the lock.
   %%
   %% The condition must be checked in a loop after wakeup.
   local Buf First Last Count L M in
      Buf   = {NewArray 0 N-1 unit}
      First = {NewCell 0}
      Last  = {NewCell 0}
      Count = {NewCell 0}

      M = {NewMonitor}

      buffer(
         put: proc {$ X}
                 {M.lock}
                 try
                    while @Count == N do
                       {M.wait}
                    end

                    Buf.@Last := X
                    Last := (@Last + 1) mod N
                    Count := @Count + 1

                    {M.notifyAll}
                 finally
                    {M.unlock}
                 end
              end

         get: proc {$ ?X}
                 {M.lock}
                 try
                    while @Count == 0 do
                       {M.wait}
                    end

                    X = Buf.@First
                    First := (@First + 1) mod N
                    Count := @Count - 1

                    {M.notifyAll}
                 finally
                    {M.unlock}
                 end
              end)
   end
end

%% Monitor trace:
%%
%%   producer calls put
%%   if Count==N, producer waits and releases lock
%%   consumer calls get, removes one item, notifyAll
%%   producer wakes, reacquires lock, rechecks Count<N
%%
%% Common mistake:
%%   using if instead of while around wait.
%%   a woken thread must recheck the condition.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 14. Transaction sketch
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fun {NewTransactionalCell Init}
   %% Transactional cell wraps a cell with saved-state behavior.
   %%
   %% This is a semantic sketch, not a production transaction manager.
   local C in
      {NewCell Init C}

      txCell(
         read: fun {$}
                  @C
               end

         write: proc {$ X}
                   C := X
                end

         raw: C)
   end
end

proc {WithTransaction Body ?Result}
   %% Transaction idea:
   %%   execute Body
   %%   if it commits, keep changes
   %%   if it aborts, restore saved state
   %%
   %% A full model tracks:
   %%   transaction id
   %%   cells touched
   %%   old values
   %%   locks
   %%   priority
   %%   commit / abort result
   %%
   local Log Status in
      {NewCell nil Log}
      {NewCell running Status}

      try
         {Body Log Result}
         Status := committed
      catch abort(Reason) then
         {Rollback @Log}
         Status := aborted(Reason)
         raise abort(Reason) end
      end
   end
end

proc {TxWrite Log Cell NewValue}
   %% Save old value before first write.
   %% Then write new value.
   %%
   %% In a full implementation, repeated writes to the same cell should not
   %% save the old value multiple times.
   Old = @Cell
in
   Log := (Cell#Old) | @Log
   Cell := NewValue
end

proc {Rollback Log}
   case Log
   of nil then skip
   [] (Cell#Old) | Rest then
      Cell := Old
      {Rollback Rest}
   end
end

%% Trace:
%%   transaction starts
%%   old cell values are saved
%%   body writes new values
%%   commit keeps them
%%   abort restores saved values
%%
%% Concept:
%%   transaction is not just a lock.
%%   it adds saved state, commit, abort, and rollback.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 15. Transaction example
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

proc {Transfer From To Amount}
   %% Bank transfer as a transaction.
   %%
   %% Invariant:
   %%   total money across accounts should be preserved.
   %%
   %% Without transaction:
   %%   debit may happen and credit may fail.
   %%
   %% With transaction:
   %%   either both effects happen or neither remains visible.
   {WithTransaction
    proc {$ Log ?Result}
       FromBal = @From
    in
       if FromBal < Amount then
          raise abort(insufficientFunds) end
       else
          {TxWrite Log From FromBal-Amount}
          {TxWrite Log To   @To+Amount}
          Result = ok
       end
    end
    _}
end

%% Trace:
%%   save From old balance
%%   debit From
%%   save To old balance
%%   credit To
%%   commit: keep both
%%   abort: restore both
%%
%% Model point:
%%   transaction creates a larger atomic abstraction over several cells.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 16. Invariant discipline
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% Explicit state requires invariant reasoning.
%%
%% Counter invariant:
%%   Count is an integer.
%%
%% Bounded buffer invariant:
%%   0 =< Count =< N
%%   First and Last are valid indexes
%%   Count equals the number of stored elements
%%
%% Account invariant:
%%   Balance >= 0, unless the protocol allows overdraft.
%%
%% Lock discipline:
%%   invariant may be temporarily broken inside a critical section,
%%   but must hold when the lock is released.
%%
%% Monitor discipline:
%%   wait may release the lock,
%%   so the invariant must be true before waiting.
%%
%% Transaction discipline:
%%   if the invariant is broken during the transaction,
%%   abort must restore it or prevent visibility.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 17. Java-style monitor comparison
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% Java-style monitor:
%%   every object can have an internal lock and wait set.
%%   synchronized method acquires the receiver's monitor lock.
%%
%% wait:
%%   current thread suspends
%%   enters wait set
%%   releases lock
%%   later resumes after reacquiring lock
%%
%% notify:
%%   wakes one waiting thread, but does not transfer lock immediately.
%%
%% notifyAll:
%%   wakes all waiting threads; each must recheck the condition.
%%
%% Important design point:
%%   do not hold an object lock while calling unknown external code.
%%   that can increase deadlock risk.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 18. Model boundary notes
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% Boundary 1:
%%   Explicit state is sequential by itself.
%%   It becomes shared-state concurrency only when combined with threads.
%%
%% Boundary 2:
%%   Object-oriented programming can be implemented with explicit state,
%%   but object style and class inheritance are distinct concepts.
%%
%% Boundary 3:
%%   Active objects use message passing to serialize method execution.
%%   Shared-state objects allow several threads to enter object methods
%%   unless locks or monitors restrict them.
%%
%% Boundary 4:
%%   Locks reduce interleavings by mutual exclusion.
%%   Monitors add waiting and notification.
%%   Transactions add abortable atomicity.
%%
%% Boundary 5:
%%   These abstractions improve practical reasoning,
%%   but none restores the full simplicity of declarative computation.
%%
%% Boundary 6:
%%   Distributed state will be harder.
%%   Once state crosses process boundaries, consistency and failure become
%%   part of the programming model.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% 19. Compact tracing checklist
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%% For a cell:
%%   cell identity
%%   old content
%%   operation
%%   new content
%%
%% For a stateful abstraction:
%%   public operation
%%   hidden cell(s)
%%   invariant before operation
%%   invariant after operation
%%
%% For an object:
%%   receiver
%%   message
%%   method lookup path
%%   self binding
%%   attribute cells touched
%%
%% For inheritance:
%%   inherited method
%%   overridden method
%%   static ancestor call
%%   dynamic self call
%%   parent contract
%%
%% For a race:
%%   thread A steps
%%   thread B steps
%%   shared cell reads/writes
%%   lost update or invariant break
%%
%% For a lock:
%%   acquire
%%   critical section
%%   invariant restoration
%%   release
%%
%% For a monitor:
%%   condition check
%%   wait releases lock
%%   notify / notifyAll
%%   reacquire
%%   recheck condition
%%
%% For a transaction:
%%   cells touched
%%   old values saved
%%   tentative writes
%%   commit or abort
%%   rollback if needed
%%
%% Common mistakes:
%%   - treating a cell name as its current content
%%   - treating assignment as single-assignment binding
%%   - treating object style and class-based OOP as identical
%%   - treating inheritance as automatic substitutability
%%   - treating read-modify-write as atomic
%%   - protecting only writes but not reads
%%   - using if instead of while around monitor wait
%%   - treating transaction as just syntactic sugar for lock
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
```

### Full-Book Review Map

CTMCP can be reviewed as a layered construction of `computation models`. The book does not move from one language to another, but from one set of programmer-significant concepts to a richer set: `single-assignment variable`, `procedure`, `thread`, `port`, `cell`, `class`, `lock`, `choice`, `constraint`, `computation space`, and finally formal `semantics`. Each concept is added when the previous model can express the desired program only awkwardly.

The useful review method is to ask, for every chapter: what concept was added, what it simplified, and what reasoning cost it introduced.

**1. Full-book movement**

* Chapter 1: `value` + `function` + `list` + `state` + `concurrency` → programming concepts as a first panorama.
* Chapter 2: `single-assignment store` + `procedure` + `kernel language` → declarative computation model.
* Chapter 3: `recursion` + `higher-order programming` + `ADT` → declarative programming technique.
* Chapter 4: `thread` + `dataflow variable` → deterministic declarative concurrency.
* Chapter 5: `port` + `message stream` → asynchronous message-passing concurrency.
* Chapter 6: `cell` + `Exchange` + `assignment` → explicit state and long-lived memory.
* Chapter 7: `class` + `inheritance` + `self` → object-oriented programming.
* Chapter 8: `thread` + `cell` → shared-state concurrency, races, locks, monitors, transactions.
* Chapter 9: `choice` + `fail` + `Solve` → relational programming by search.
* Chapter 10: declarative GUI description + procedural callbacks → GUI programming.
* Chapter 11: process + network + partial failure → distributed programming.
* Chapter 12: `constraint` + `propagator` + `computation space` → constraint programming.
* Chapter 13: earlier models → formal language semantics through operational rules.

**2. Core semantic-object table**

| Chapter | Main semantic object               | What it explains                                               | What it exposes                           |
| ------- | ---------------------------------- | -------------------------------------------------------------- | ----------------------------------------- |
| 1       | `programming concept`              | Why programming is learned through concepts rather than syntax | The need for model-based learning         |
| 2       | `kernel language`                  | How practical language constructs reduce to a semantic core    | Store, environment, procedure application |
| 3       | `declarative technique`            | How to write useful programs without explicit state            | Recursion, folds, ADTs, invariants        |
| 4       | `thread`                           | How concurrency can remain deterministic                       | Suspension, resumption, streams           |
| 5       | `port`                             | How many senders communicate with one receiver                 | Message order and nondeterminism          |
| 6       | `cell`                             | How long-lived mutable memory is represented                   | Identity, assignment, encapsulated state  |
| 7       | `class`                            | How object construction and inheritance are organized          | Method lookup, `self`, substitution       |
| 8       | `lock` / `monitor` / `transaction` | How shared mutable state is controlled                         | Atomicity, interleaving, rollback         |
| 9       | `search tree`                      | How relations generate multiple solutions                      | Choice, failure, encapsulated search      |
| 10      | `GUI description`                  | How interface layout can be computed as data                   | Callbacks, handles, event behavior        |
| 11      | `distributed entity`               | How entities behave across processes                           | Network transparency, failure, protocols  |
| 12      | `computation space`                | How search and constraints are encapsulated                    | Propagation, cloning, commit, merge       |
| 13      | `operational rule`                 | How the models receive formal semantics                        | Tasks, stores, reduction, model subsets   |

**3. Main concept ladder**

```text
declarative computation
  + thread
  → declarative concurrency

declarative concurrency
  + port
  → message-passing concurrency

declarative computation
  + cell
  → explicit state

explicit state
  + class / inheritance
  → object-oriented programming

explicit state
  + thread
  → shared-state concurrency

declarative computation
  + choice / fail / Solve
  → relational programming

relational programming
  + constraints / propagators / computation spaces
  → constraint programming
```

This ladder is not a ranking. Each added concept solves a particular expressive problem and introduces a new reasoning burden. `cell` simplifies private memory but weakens equational reasoning. `thread` simplifies independent activities but requires synchronization. `port` enables many-to-one communication but makes message order observable. `constraint` improves search but adds propagation behavior and heuristic dependence.

**4. What to trace when reviewing**

| Topic                 | Trace object             | What to record                                                |
| --------------------- | ------------------------ | ------------------------------------------------------------- |
| Declarative model     | kernel statement         | statement, environment/substitution, store change             |
| Procedure call        | closure/context          | parameters, contextual environment, body execution            |
| Declarative recursion | recursive structure      | base case, recursive case, accumulator or output construction |
| Stream programming    | open list tail           | producer binding, consumer suspension, later resumption       |
| Lazy computation      | demand                   | which value is needed, which computation is triggered         |
| Port object           | message stream           | sender, message, stream order, state transition               |
| Cell operation        | mutable content          | cell identity, old value, new value                           |
| Object method         | dispatch path            | receiver, method lookup, `self`, attribute cells              |
| Shared-state program  | interleaving             | per-thread operations, global order, race point               |
| Monitor               | condition wait           | lock release, waiting set, notification, condition recheck    |
| Relational program    | search tree              | choices, bindings, failures, solution order                   |
| Constraint program    | domain narrowing         | variable domains, propagators, distribution strategy          |
| Distributed program   | protocol                 | copied entity, remote reference, failure behavior             |
| Semantics rule        | configuration transition | task before, rule used, store after                           |

**5. Stable distinctions**

| Distinction                                      | Why it matters                                                                |
| ------------------------------------------------ | ----------------------------------------------------------------------------- |
| `programming language` ≠ `computation model`     | The language is surface and tool; the model explains execution and reasoning. |
| `practical language` ≠ `kernel language`         | Practical syntax is convenient; kernel syntax exposes essential concepts.     |
| `identifier` ≠ `store variable`                  | Identifiers occur in code; store variables are semantic entities.             |
| `single-assignment variable` ≠ `cell`            | One is bound once; the other has changing content.                            |
| `thread` ≠ `port`                                | A thread is an activity; a port is an asynchronous communication entry.       |
| `stream` ≠ `queue`                               | Stream tails are single-assignment; queues usually imply mutable consumption. |
| `stateful object` ≠ `class`                      | Object holds behavior/state; class constructs and organizes objects.          |
| `inheritance` ≠ `substitution`                   | Inheritance is a mechanism; substitutability is a behavioral contract.        |
| `race` ≠ harmless scheduling variation           | A race affects correctness; scheduling variation may affect only timing.      |
| `relation` ≠ `function`                          | A relation can be queried in multiple directions and may have many solutions. |
| `constraint` ≠ `test`                            | A constraint can propagate partial information before values are fixed.       |
| `network transparency` ≠ distributed correctness | Transparency hides location, but not latency, partial failure, or security.   |
| `semantics` ≠ implementation detail              | Semantics defines meaning; implementation realizes it with particular costs.  |

**6. Model-selection map**

| Problem shape                               | Suitable model              | Reason                                                        |
| ------------------------------------------- | --------------------------- | ------------------------------------------------------------- |
| Pure transformation over structured data    | Declarative model           | Deterministic, simple reasoning, no mutable history           |
| Incremental producer-consumer computation   | Declarative concurrency     | Streams and dataflow variables express waiting naturally      |
| Many clients sending requests to one server | Message passing             | Ports model asynchronous many-to-one communication            |
| Long-lived private memory                   | Explicit state              | Cells preserve identity and history behind an interface       |
| Family of related stateful abstractions     | Object-oriented programming | Classes and inheritance support incremental abstraction       |
| Concurrent access to shared mutable data    | Shared-state concurrency    | Locks, monitors, or transactions are needed                   |
| Search over possible bindings               | Relational programming      | `choice`, `fail`, and `Solve` express alternatives            |
| Search with strong pruning                  | Constraint programming      | Propagators reduce domains before branching                   |
| Interface with human events                 | GUI programming             | Declarative layout + procedural callbacks match the domain    |
| Components across processes                 | Distributed programming     | Ports, functors, and failure-aware protocols become necessary |
| Formal comparison of models                 | Language semantics          | Operational rules expose exact model differences              |

**7. Exercise-review clusters**

* Chapters 1–3: build fluency in values, variables, functions, recursion, lists, folds, ADTs, and declarative design.
* Chapter 4: trace threads, streams, laziness, and dataflow synchronization.
* Chapter 5: design message protocols and port objects; analyze nondeterministic arrival order.
* Chapter 6: trace cells, `Exchange`, stateful ADTs, capabilities, and invariants.
* Chapter 7: trace object creation, method dispatch, inheritance, `self`, and active objects.
* Chapter 8: enumerate interleavings; design locks, monitors, and transactions.
* Chapter 9: draw search trees for relations, parsers, databases, and planners.
* Chapter 10: separate declarative GUI descriptions from callbacks and handles.
* Chapter 11: trace distributed references, ports, state, failures, and protocol choices.
* Chapter 12: trace domains, propagators, stable spaces, distribution, and search.
* Chapter 13: reduce configurations step by step using semantic rules.

**8. Final mastery checklist**

* Able to explain `computation model` as more precise than “programming paradigm.”
* Able to identify the `kernel language` concept added by each chapter.
* Able to trace a small declarative computation through store bindings.
* Able to distinguish declarative concurrency from shared-state concurrency.
* Able to design a small stream pipeline and explain its suspension behavior.
* Able to design a port object with a message protocol and state transition.
* Able to explain why explicit state improves modularity and weakens reasoning.
* Able to distinguish object style, class-based programming, and inheritance.
* Able to identify a race condition from an interleaving table.
* Able to explain why monitors need condition rechecking after wakeup.
* Able to draw a relational search tree with choices, failures, and solutions.
* Able to model a small finite-domain constraint problem.
* Able to explain why distributed state is harder than distributed declarative data.
* Able to connect high-level abstractions back to operational semantics.

**9. Final conceptual map**

```text
programming concepts
  → computation models
  → kernel languages
  → declarative model
  → declarative techniques
  → declarative concurrency
  → message passing
  → explicit state
  → objects and classes
  → shared-state concurrency
  → relational search
  → specialized models
      → GUI
      → distribution
      → constraints
  → language semantics
  → general computation model
```

# 中文

## 第一章 程序设计概念简介

### 1.1 计算
```
{} for procedures or function calls

{Browse Var1}
```
### 1.2 变量
```
declare
Var=\exp\
```
### 1.3 函数
```
declare
fun {FunName Arg1 ..}
    \fun struct\
end

if \exp\ then \exp\ else \exp\ end
```
> Recursion, Combinations 数/组合, Permutation 数/排列, 
1. Fuctional abstractions (covered in chapter 3)

### 1.4 列表
> binomial theorem 数/二项式定理；Pascal's triangle 数/帕斯卡三角形=杨辉三角

```
[A B ..]

| for links

H|T called a cons/list pair
```
### 1.5 使用函数处理列表
1. Pattern matching, auxiliary funcions, top-down software development, 

```
% Caculate the Nth line of Pascal's Triangle
declare Pascal AddList ShiftLeft ShiftRight
fun {Pascal N}
   if N==1 then [1]
   else
      {AddList {ShiftLeft {Pascal N-1}} {ShiftRight {Pascal N-1}}}
   end
end

fun {ShiftLeft L}
   case L of H|T then
      H|{ShiftLeft T}
   else [0] end
end

fun {ShiftRight L} 0|L end

fun {AddList L1 L2}
   case L1 of H1|T1 then
      case L2 of H2|T2 then
         H1+H2|{AddList T1 T2}
      end
   else nil end
end
```
### 1.6 正确性
1. Language's semantics(mathematical model of operations of pl), program's specification(mathematical definition), mathematical induction 
### 1.7 复杂度
```
% call FastPascal once in a recursion
fun {FastPascal N}
   if N==1 then [1]
   else L in
      L={FastPascal N-1}
      {AddList {ShiftLeft L} {ShiftRight L}}
   end
end
```
### 1.8 惰性求值
1. Eager evaluation, lazy evaluation(covered in section 4.5)

```
% Keyword: lazy
fun lazy {Ints N}
   N|{Ints N+1}
end

% Define the lazy version of Pascal's triangle
fun lazy {PascalList Row}
   Row|{PascalList
            {AddList {ShiftLeft Row} {ShiftRightR Row}}}
end

L={PascalList [1]} % Initiate it

{Browse L.1} % Display the first row
{Browse L.2} % Display the second row

% Eager version, in contrast. Calculate the very first items every time.
fun {PascalList2 N Row}
   if N==1 then [Row]
   else
     Row|{PascalList2 N-1
           {AddList {ShiftLeft Row}  {ShiftRight Row}}}
   end
end
```

### 1.9 高阶编程
> subtract 减去，差集

```
fun {GenericPascal Op N}
   if N==1 then [1]
   else L in
      L={GenericPascal Op N-1}
      {OpList Op {ShiftLeft L} {ShiftRight L}}
   end
end

fun {OpList Op L1 L2}
   case L1 of H1|T1 then
      case L2 of H2|T2 then
         {op H1 H2}|{OpList Op T1 T2}
      end
   else nil end
end

fun {Add X Y} X+Y end

fun {FastPascal N} {GenericPascal Add N} end
% equals:
fun {FastPascal2 N} {GenericPascal ´+´ N} end

fun {Xor X Y} if X==Y then 0 else 1 end end
```
### 1.10 并发性
```
thread P in % takes long, but doesn't keep the system from displayling 99*99 IMMEDIATELY
   P={Pascal 30}
   {Browse P}
end
{Browse 99*99} % Displayed immediately
```
### 1.11 数据流
> aesthetic 美学的；radically 彻底地
1. pAdding threads and delays to a program can radically change a program’s appearance. But as long as the same operations are invoked with the same arguments, it does not change the program’s results at all. This is the key property of dataflow
concurrency.（covered in chapter 4)
### 1.12 显式状态
1. Explicit state: Memory is needed for functions that can change their behavior and learn from their past, this kind of memory is called explicit state. Explicit state is defined with momery cells.
```
% 3 operations for cells: initiating, assignment and access.
declare
C={NewCell 0}
C:=@C+1
{Browse @C}

% Adding Memory to FastPascal
declare
C={NewCell 0}
fun {FastPascal N}
   C:=@C+1
   {GenericPascal Add N}
end
```
### 1.13 对象
1. A function with internal memory is usually called an object.
```
% A counter. Operations: Bump, Read
declare
local C in
   C={NewCell 0}
   fun {Bump}
      C:=@C+1
      @C
   end
   fun {Read}
      @C
   end
end
```
> encapsulation 封装

### 1.14 类
> compound 合成的，混合的
```
declare
fun {NewCounter}
C Bump Read in
   C={NewCell 0}
   fun {Bump}
      C:=@C+1
      #C
   end
   fun {Read}
      @C
   end
   counter(bump:Bump read:Read)
end
```
### 1.15 不确定性和时间
1. Concurrency + State -> may give different results = Nondeterminism
2. Observable Nondeterminism = Race condition

### 1.16 原子性
> Atomicity 原子性；interleave 交错
1. Programming with atomic actions is covered in chapter 8.
2. Lock: only one thread at a time can be executing INSIDE.
```
declare
C={NewCell 0}
L={NewLock}
thread
   lock L then I in % Lock L is defined.
      I=@C
      C:=I+1
   end
end
thread
   lock L then J in
      J=@C
      C:=I+1
   end
end
```
### 1.17 下一步是什么？
* Chapter 2 & 3: declarative model
* Chapter 4: concurrent declarative model
* Section 4.5: lazy declarative model
* Chapter 6: stateful model
* Chapter 7: object-oriented model
* Chapter 8: shared-state concurrent model

### 1.18 练习

```
% 1.a 
declare
A=1
B=0
if B < 100 then
      A:=A*2
      B:=B+1
   else
      {Browse A}
end
```

## 第二章 声明式计算模型
encompass 包含； embryonic [,ɛmbrɪ'ɑnɪk] 胚胎的；embryonic form 雏形

Programming encompasses: computation model, programming model(programming techniques & design principles), reasoning techniques 
### 2.1 定义实用的程序设计语言
define the syntax and semantics of practical programming languages:

**2.1.1 Laguage Syntax** 
1. Extended Backus-Naur Form(EBNF)
```
<digit> ::= 0|1|2|3|4|5|6|7|8|9
<int> ::= <digit>{<digit>}
```
2. Context-sensitive grammars 
3. Formal language: any well-defined set of statement.
4. Context-free grammer can be ambiguous(mutiple parse trees maybe) ->SOLUTION: giving precedence & associativity

> disambiguate /,dɪsæm'bɪɡjuet/ 消除歧义；precedence 优先；associativity，结合性

**2.1.2 Laguage Semantics**
1. **Practical Language**: useful abractions; can be extented with linguistic abstractions
<br>**Kernel Language**: a minimal set of intuitive concepts; easy to understand and reason in; has a formal semantics
2. Formal semantics: an operational, axiomatic, or denotational semantics
3. Four widely used approaches to language semantics: **operational semantics, axiomatic semantics, denotational semantics, logical semantics**.
4. Linguistic abstraction
5. Syntactic sugar -> 2.6.1h
6. Language design

> predecessor ['prɛdəsɛsɚ] 前任者；axiomatic  [,æksɪə'mætɪk] 公理的，自明的；denotation [,dino'teʃən] 符号；in terms of，依据，按照；reentrant 可重入；idioms 成语 习语；be analogous to [ə'næləɡəs] 与...类似； be intended for 打算为…所用；预定给；idealized 理想化的


### 2.2 单次赋值存储


### 2.3 核心语言


### 2.4 核心语言的语义


### 2.5 内存管理


### 2.6 从核心语言到使用语言


### 2.7 异常


### 2.8 高阶话题


### 2.9 练习

## 第三章 声明式程序设计的技术



### 3.1 什么是可声明性


### 3.2 迭代计算


### 3.3 递归计算


### 3.4 递归程序设计


### 3.5 时间和空间的高效性


### 3.6 高阶编程


### 3.7 抽象数据类型


### 3.8 Nondeclarative needs~


### 3.9 Program design in the small


### 3.10 练习

## 第四章 声明式并发


### 4.1 数据驱动的并发模型


### 4.2 线程编程技术基础


### 4.3 流


### 4.4 直接使用声明式并发模型


### 4.5 惰性运行


### 4.6 软实时编程


### 4.7 Haskell语言


### 4.8 声明式编程的限制和扩展


### 4.9 高级话题


### 4.10 历史性记录


### 4.11 练习

## 第五章 消息传递并发


### 5.1 消息传递并发模型


### 5.2 端口对象


### 5.3 简单消息协议


### 5.4 并发程序设计


### 5.5 升降控制系统


### 5.6 直接使用消息传递模型


### 5.7 Erlang编程语言


### 5.8 高级话题


### 5.9 练习

## 第六章 显式状态


### 6.1 什么是显式状态


### 6.2 状态和系统搭建


### 6.3 应用～显式状态的并发模型


### 6.4 数据抽象


### 6.5 Stateful Collection～


### 6.6 reasoning with state


### 6.7 宏观程序设计


### 6.8 案例学习


### 6.9 高级话题


### 6.10 练习

## 第七章 面向对象程序设计


### 7.1 继承


### 7.2 用作完全数据抽象的类


### 7.3 用作增量式数据抽象的类


### 7.4 用继承编程


### 7.5 和其他计算模型的关系


### 7.6 实现一个类型系统


### 7.7 Java编程语言


### 7.8 Active对象～


### 7.9 练习

## 第八章 共享状态并发 


### 8.1 共享状态并发模型


### 8.2 并发编程


### 8.3 锁


### 8.4 监视器


### 8.5 事件


### 8.6 Java编程语言（并发部分）


### 8.7 练习

## 第九章 关系式编程


### 9.1 关系式计算模型


### 9.2 更多的例子


### 9.3 和逻辑编程的关系


### 9.4 自然语言句法分析


### 9.5 一个语法解释器


### 9.6 数据库


### 9.7 Prolog编程语言


### 9.8 练习


## 第十章 图形化用户界面编程



### 10.1 声明式/过程式实现



### 10.2 使用声明式/过程式实现


### 10.3 原型设计师交互学习工具


### 10.4 案例学习


### 10.5 实现GUI工具


### 10.6 练习

## 第十一章 分布式编程


### 11.1 分布式系统的分类


### 11.2 分布式模型


### 11.3 声明式数据的分布


### 11.4 状态的分布


### 11.5 网络awareness


### 11.6 一般的分布式编程模式


### 11.7 分布式协议


### 11.8 局部故障


### 11.9 安全性


### 11.10 构建应用


### 11.11 练习

## 第十二章 约束式编程


### 12.1 传播和搜索


### 12.2 编程技巧


### 12.3 基于约束的计算模型


### 12.4 定义和使用计算空间


### 12.5 实现关系式计算模型


### 12.6 练习

## 第十三章 语言的语义


### 13.1 一般的计算模型


### 13.2 声明式的一致性？并发性？


### 13.3 八个计算模型


### 13.4 一般抽象的语义


### 13.5 历史性讲义


### 13.6 练习


## A Mozart系统开发环境


### A.1 交互式界面


### A.2 命令行界面



## B 基本数据类型


### B.1 Nunmber（Integer，Float，夯实基础
python编程从入门到精通，从单纯的语法理解到灵活应用解决实际问题，掌握Linux和Windows双系统开发环境，掌握常见数据结构和算法（时间复杂度计算，排序，搜索，栈，队列，二叉树），建立面向对象思维，能对问题进行抽象归类，了解设计模式，掌握单例模式和工厂Character）


### B.2 Literal（atom和name）


### B.3 Record和Tuple


### B.4 Chunks（限制大小的Record）


### B.5 List


### B.6 String


### B.7 Virtual String



## C 语言的语法


### C.1 交互式程序指令


### C.2 程序指令和表达式


### C.3 指令和表达式的非终止


### C.4 操作符


### C.5 关键字


### C.6 构词句法

## D 通用计算模型


### D.1 有创造力的扩展规则


### D.2 核心语言


### D.3 概念


### D.4 状态的不同形式


### D.5 其他概念


### D.6 层次化语言设计

## 引用

## 目录