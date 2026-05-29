---
title: Concepts, Techniques, and Models of Computer Programming
categories: Notes
subclass: Programming
---

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