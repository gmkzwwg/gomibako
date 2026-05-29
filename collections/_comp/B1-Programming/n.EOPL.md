---
title: Essentials of Programming Languages Annotated
categories: Notes
subclass: Programming
---

## EOPL Notes

### Full-Book Guide

EOPL is best read as a book about `semantics`: what programs mean, how that meaning can be made executable, and how each language feature changes the structure of an interpreter. Its main method is not to describe programming languages from the outside, but to build small languages and language processors that expose the consequences of design choices. A feature such as procedure binding, recursion, assignment, parameter passing, continuation, typing, modules, or classes is treated as a change in the evaluator, checker, or translator.

The book’s central discipline is cumulative. Chapter 1 builds the recursive programming foundation needed to process tree-shaped program data. Chapter 2 turns recursive data into abstract interfaces and representation choices. Chapter 3 introduces the interpreter pattern through small expression languages, and later chapters repeatedly modify this pattern: adding store, exposing control, transforming programs into CPS, checking and inferring types, enforcing module boundaries, and interpreting object-oriented programs.

The interpreter is the main learning instrument. It is not a black box that “runs” a language; it is an executable account of a language’s meaning. To read the book well, each interpreter should be traced as a semantic object: what abstract syntax it accepts, what values it produces, how the environment is extended, whether a store exists, where control is represented, which errors are detected dynamically, and which errors are moved into a static analysis.

A common misreading is to treat EOPL as a Scheme exercise book. Scheme is the implementation language, not the main subject. Another common misreading is to treat each chapter’s language as a toy language. The languages are deliberately small because a small language makes a semantic change visible: `LET` isolates variable binding, `PROC` isolates first-class procedures, `LETREC` isolates recursion, `EXPLICIT-REFS` isolates store-passing, CPS interpreters isolate control, type checkers isolate static reasoning, and object languages isolate method dispatch and inheritance.

The book can be followed through several long threads:

* `data specification` → recursive programs → abstract syntax
* `environment` → lexical binding → lexical addressing
* `environment` + `store` → state, references, mutable pairs, parameter passing
* recursive interpreter → CPS interpreter → trampolined interpreter → imperative interpreter
* dynamic checking → type checking → type inference
* interface + implementation → modules → typed modules
* object → class → method lookup → inheritance → typed object-oriented language

The most useful notes for EOPL should not summarize paragraphs. They should record the semantic problem, the representation decision, the interpreter or checker structure, the trace of one execution, and the later chapter in which the same issue returns. A good note asks not only “what does this program return?” but also “where is the meaning represented: grammar, abstract syntax, environment, store, continuation, type environment, module environment, or class environment?”

### Chapter 1. Inductive Sets of Data

*Chapter 1 builds the recursive-programming base for the rest of the book. Programming-language syntax is usually nested or tree-like, so a language processor must be able to define recursive sets of data and write recursive procedures that follow those definitions. The chapter introduces `inductive specification`, grammars, derivation trees, recursive program derivation, mutually recursive procedures, and context arguments. These tools are not preliminary Scheme practice; they are the methods later used to process abstract syntax, environments, continuations, types, modules, and class structures.*

**Chapter dependencies:**

* Minimal prerequisites: Scheme lists, symbols, pairs, recursion, predicates, and simple contracts.

* The chapter builds the first method: `inductive specification` → `recursive procedure`.

* Grammar becomes program structure: one syntactic category → one procedure; one production → one case.

* `s-list`, `bintree`, and `LcExp` prepare later work on `abstract syntax`.

* `occurs-free?` introduces binding-sensitive structure before Chapter 3 formalizes lexical scope.

* `subst` introduces mutual recursion: `S-list` + `S-exp` → cooperating procedures.

* Context arguments prepare later environment-like reasoning: local subproblem + inherited context → correct recursive computation.

* Chapter 2 will turn the raw recursive representations from this chapter into explicit interfaces and data abstractions.

**1. Why does a programming-language book begin with inductive sets of data rather than immediately with interpreters?**

>

**2. How do top-down definitions, bottom-up definitions, and rules of inference describe the same recursively generated set from different directions?**

>

**3. How does a grammar turn a complex set of values into syntactic categories, productions, terminals, and derivations?**

>

**4. Why is “Follow the Grammar” a method for writing recursive programs, not just a slogan about syntax?**

>

**5. How do procedures such as `in-S?`, `nth-element`, `remove-first`, `occurs-free?`, and `subst` show different ways of deriving code from data definitions?**

>

**6. Why does `occurs-free?` require attention to binding, rather than only structural traversal?**

>

**7. Why do mutually recursive data definitions often require mutually recursive procedures?**

>

**8. Why are auxiliary procedures and context arguments needed when the direct recursive decomposition is not enough?**

>

**Concept comparison table:**

| Concept A              | Concept B              | Shared point                                 | Key difference                                                                            | Role in this chapter                                | Minimal example              |                      |
| ---------------------- | ---------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------- | ---------------------------- | -------------------- |
| `top-down definition`  | `bottom-up definition` | Both specify the same inductive set          | Top-down tests membership by reducing an object; bottom-up builds the smallest closed set | Shows two views of recursive data                   | membership in multiples of 3 |                      |
| `rule of inference`    | grammar production     | Both describe legal construction             | An inference rule proves membership; a production rewrites a syntactic category           | Connects set definition to syntax definition        | `List-of-Int ::= ()          | (Int . List-of-Int)` |
| `syntactic derivation` | `deduction tree`       | Both justify that an object belongs to a set | Syntactic derivation is a rewriting sequence; deduction tree records rule dependencies    | Helps verify grammar-generated data                 | deriving a list of integers  |                      |
| `terminal symbol`      | `nonterminal symbol`   | Both appear in grammar definitions           | Terminals are literal external symbols; nonterminals name recursive sets                  | Separates syntax markers from categories            | `Int`, `S-list`, `(`, `)`    |                      |
| `s-list`               | `s-exp`                | Both describe symbolic list data             | An `s-list` is a list of `s-exp`; an `s-exp` is either a symbol or an `s-list`            | Motivates mutual recursion                          | `subst` and `subst-in-s-exp` |                      |
| `bound variable`       | `free variable`        | Both are variable occurrences                | A bound occurrence is captured by a surrounding lambda; a free occurrence is not          | Prepares lexical scope                              | `occurs-free?` over `LcExp`  |                      |
| `recursive argument`   | `context argument`     | Both are procedure parameters                | Recursive argument usually decreases; context argument carries inherited information      | Solves problems not handled by direct decomposition | `number-elements-from`       |                      |
| `auxiliary procedure`  | main procedure         | Both contribute to a final computation       | Auxiliary procedure needs its own complete contract, not only an initial-use explanation  | Prevents mysterious recursion                       | `partial-vector-sum`         |                      |

**Program tracing table:**

| Tracing object           | What to trace                                                 | Common mistake                                                                    |
| ------------------------ | ------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `in-S?`                  | How subtracting 3 follows the top-down definition of the set  | Treating the recursive call as an arbitrary loop rather than membership reduction |
| `List-of-Int` derivation | Each grammar step from nonterminal to final list value        | Confusing dot notation with ordinary printed list notation                        |
| `nth-element`            | How both the list and index decrease until the base case      | Reversing tests and losing the intended error behavior                            |
| `remove-first`           | Whether the first matching symbol has already been removed    | Accidentally removing all occurrences                                             |
| `occurs-free?`           | How each lambda changes whether a variable occurrence is free | Traversing syntax while ignoring binding                                          |
| `subst`                  | Which procedure handles `S-list` and which handles `S-exp`    | Trying to handle all syntactic categories in one unreadable procedure             |
| `number-elements-from`   | How the list shrinks while the context argument grows         | Expecting every argument to decrease in recursive calls                           |
| `partial-vector-sum`     | How the index supplies a decomposable subproblem for vectors  | Trying to decompose vectors as if they were lists                                 |

>

**Abstraction barrier record:**

| Abstraction layer         | Exposed interface                        | Hidden representation                             | What upper code depends on                            | What should not change if representation changes                         |
| ------------------------- | ---------------------------------------- | ------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------ |
| Inductive set layer       | membership rules, axioms, closure rules  | informal set construction                         | legal values can be recognized or derived             | recursive programs should follow the specification, not examples alone   |
| Grammar layer             | nonterminals and productions             | choice of notation, shortcuts such as Kleene star | data shape is generated by syntax rules               | program structure should not depend on a decorative grammar abbreviation |
| Lambda-expression layer   | `Identifier`, `lambda`, application form | raw Scheme list layout                            | expressions can be classified by their syntactic form | later abstract syntax interfaces should hide raw `car` / `cdr` access    |
| Recursive-program layer   | contracts and usage statements           | internal decomposition strategy                   | procedures satisfy their stated behavior              | clients should not depend on helper procedure internals                  |
| Auxiliary-procedure layer | explicit auxiliary contract              | context parameter and recursive strategy          | helper procedure works for all legal arguments        | main procedure should not rely on an undocumented initial case only      |

**Error prediction:**

**1. The reader may mistake inductive definitions for mathematical decoration, but this chapter needs to distinguish specification from examples.**

>

**2. The reader may remember grammar notation while missing that each production should guide one branch of a recursive program.**

>

**3. The reader may trace `occurs-free?` as if it were ordinary tree traversal, even though the procedure must account for variable binding.**

>

**4. The reader may treat Kleene star as directly programmable, while many procedures need the grammar rewritten into a list-like recursive form.**

>

**5. The reader may use auxiliary procedures without contracts, but the chapter’s method requires every auxiliary to have an independent specification.**

>

**6. The reader may think every recursive argument must decrease, while context arguments may grow or change direction as long as the true recursive subproblem gets smaller.**

>

**Learning Tips:** Chapter 1 should be read with small derivations beside the code. For each procedure, write the grammar or inductive definition first, then mark which case of the code corresponds to which production. The most important programs to hand-trace are `in-S?`, `nth-element`, `remove-first`, `occurs-free?`, `subst`, and `number-elements-from`. The later chapters depend heavily on this habit: when an interpreter processes abstract syntax, it is following the same grammar-directed pattern introduced here.

**Exercise 1.1.** Write inductive definitions for four specified numeric sets in top-down, bottom-up, and rules-of-inference styles, and show sample derivations.

**Training goal:** `inductive definition`, equivalent specification styles, derivation.

>

**Exercise 1.2.** Determine what sets are defined by several pairs of inference rules and explain why.

**Training goal:** inference-rule interpretation, sequence recognition, mathematical pattern extraction.

>

**Exercise 1.3.** Find a set of natural numbers that satisfies closure under adding 3 but is not the smallest set from the earlier definition.

**Training goal:** smallest closed set, closure condition, counterexample construction.

>

**Exercise 1.4.** Write a syntactic derivation from `List-of-Int` to a nested dot-notation list containing `-7`, `3`, and `14`.

**Training goal:** grammar derivation, list structure, nonterminal replacement.

>

**Exercise 1.5.** Work with the given grammar examples and identify or construct data that satisfy or fail the relevant syntactic categories.

**Training goal:** grammar reading, syntactic category recognition, recursive data membership.

>

**Exercise 1.6.** Explain what goes wrong if the tests in `nth-element` are reversed.

**Training goal:** base-case ordering, error behavior, recursive control.

>

**Exercise 1.7.** Rewrite `nth-element` so that it produces a more informative error message when the list is too short.

**Training goal:** error reporting, contract-aware recursion, diagnostic design.

>

**Exercise 1.8.** Analyze the changed `remove-first` procedure if the final `cons` line is replaced by a recursive call on the cdr, and give a proper contract for the resulting function.

**Training goal:** recursive result construction, contract writing, behavioral diagnosis.

>

**Exercise 1.9.** Define `remove`, which removes all occurrences of a given symbol from a list of symbols.

**Training goal:** list recursion, filtering, first occurrence vs all occurrences.

>

**Exercise 1.10.** Discuss meanings of “or” other than inclusive or.

**Training goal:** logical connective precision, specification language.

>

**Exercise 1.11.** Explain why the recursion in `subst-in-s-exp` is guaranteed to halt even though it recurs on `sexp`.

**Training goal:** mutual recursion, structural decrease, syntactic categories.

>

**Exercise 1.12.** Inline `subst-in-s-exp` into `subst` and simplify the result.

**Training goal:** inlining, mutual recursion elimination, compiler-style transformation.

>

**Exercise 1.13.** Write `subst` following the original Kleene-star grammar by using `map`.

**Training goal:** grammar shortcut interpretation, higher-order list processing, alternative recursive structure.

>

**Exercise 1.14.** Prove the correctness of `partial-vector-sum` under its stated index assumption.

**Training goal:** induction on context argument, correctness proof, auxiliary procedure specification.

>

**Exercise 1.15.** Define `duple`, which returns a list containing `n` copies of a given value.

**Training goal:** recursion on natural numbers, list construction, base case.

>

**Exercise 1.16.** Define `invert`, which reverses each 2-list inside a list of 2-lists.

**Training goal:** list-of-structures traversal, local restructuring.

>

**Exercise 1.17.** Define `down`, which wraps each top-level element of a list in a one-element list.

**Training goal:** top-level list transformation, structural preservation.

>

**Exercise 1.18.** Define `swapper`, which swaps all occurrences of two symbols inside an `s-list`.

**Training goal:** recursive symbolic traversal, nested list processing, mutual structure.

>

**Exercise 1.19.** Define `list-set`, which returns a list like the original except that the zero-based `n`th element is replaced.

**Training goal:** indexed recursion, list reconstruction, position tracking.

>

**Exercise 1.20.** Define `count-occurrences`, which counts occurrences of a symbol in an `s-list`.

**Training goal:** tree recursion over symbolic lists, counting accumulation.

>

**Exercise 1.21.** Define `product`, which returns the Cartesian product of two repetition-free symbol lists as a list of 2-lists.

**Training goal:** nested recursion, list generation, Cartesian product.

>

**Exercise 1.22.** Define `filter-in`, which returns the elements of a list satisfying a predicate.

**Training goal:** predicate-based filtering, list recursion.

>

**Exercise 1.23.** Define `list-index`, which returns the zero-based position of the first list element satisfying a predicate, or `#f`.

**Training goal:** search with index, failure value, context counting.

>

**Exercise 1.24.** Define `every?`, which tests whether all list elements satisfy a predicate.

**Training goal:** universal predicate over lists, short-circuit recursion.

>

**Exercise 1.25.** Define `exists?`, which tests whether at least one list element satisfies a predicate.

**Training goal:** existential predicate over lists, short-circuit recursion.

>

**Exercise 1.26.** Define `up`, which removes one pair of parentheses from each top-level list element when possible.

**Training goal:** top-level flattening, relation between `up` and `down`.

>

**Exercise 1.27.** Define `flatten`, which returns the symbols in an `s-list` in printed order.

**Training goal:** tree traversal, nested list flattening, order preservation.

>

**Exercise 1.28.** Define `merge`, which merges two ascending lists of integers into one sorted list.

**Training goal:** structural recursion over two lists, ordered merging.

>

**Exercise 1.29.** Define `sort`, which sorts a list of integers in ascending order.

**Training goal:** sorting by recursive decomposition, use of `merge` or insertion strategy.

>

**Exercise 1.30.** Define `sort/predicate`, which sorts a list according to a supplied comparison predicate.

**Training goal:** parameterized comparison, higher-order sorting.

>

**Exercise 1.31.** Define constructors and observers for the `bintree` representation: `leaf`, `interior-node`, `leaf?`, `lson`, `rson`, and `contents-of`.

**Training goal:** tree interface design, constructor/observer discipline.

>

**Exercise 1.32.** Define `double-tree`, which doubles all integer leaves in a binary tree.

**Training goal:** tree recursion, leaf transformation.

>

**Exercise 1.33.** Define `mark-leaves-with-red-depth`, which replaces each leaf by the number of `red` nodes between it and the root.

**Training goal:** tree recursion with context argument, inherited information.

>

**Exercise 1.34.** Define `path`, which returns a list of `left` and `right` steps leading to a given integer in a binary search tree.

**Training goal:** search-tree traversal, path construction, branching decision.

>

**Exercise 1.35.** Define `number-leaves`, which replaces the leaves of a binary tree by consecutive numbers starting from 0.

**Training goal:** tree traversal with threaded state, numbering, context management.

>

**Exercise 1.36.** Define a procedure `g` so that `number-elements` can be written using direct recursion on the cdr and a combining step.

**Training goal:** reconstructing context after recursion, auxiliary combinator design, relation between direct recursion and context arguments.

>

**Cross-chapter recovery questions:**

**1. How will Chapter 1’s raw list-based handling of `LcExp` need to be rechecked when Chapter 2 introduces explicit abstract-syntax interfaces?**

**2. How will the `occurs-free?` treatment of bound and free variables return when Chapter 3 introduces environments, lexical scope, and lexical addressing?**

**3. Which parts of “Follow the Grammar” become the interpreter recipe when Chapter 3 starts evaluating small languages?**

**4. How will context arguments in this chapter reappear later as environments, stores, continuations, type environments, and class environments?**

**Chapter mastery standards:**

* Able to state an inductive set definition in top-down, bottom-up, and rules-of-inference forms.
* Able to convert a grammar into a recursive program structure.
* Able to write a syntactic derivation showing that a value belongs to a grammar-defined set.
* Able to derive a recursive procedure from an inductive data definition.
* Able to distinguish free and bound variable occurrences in a lambda-calculus expression.
* Able to use mutual recursion for data definitions with multiple syntactic categories.
* Able to design an auxiliary procedure with its own complete contract and a context argument when direct recursion is insufficient.



### Chapter 2. Data Abstraction

*Chapter 2 turns the recursive data discipline from Chapter 1 into explicit `data abstraction`. The chapter begins with interfaces: a data type should be described by what its operations promise, not by the concrete shape of its representation. It then compares several representation strategies for environments, introduces the `interpreter recipe`, and uses `define-datatype` and `cases` to make recursive data types safer and more readable. The final section separates `concrete syntax` from `abstract syntax`, preparing the exact representation of programs that Chapter 3’s interpreters will evaluate.*

**Chapter dependencies:**

* Depends on Chapter 1: `inductive data definition` + recursive procedure → representation-aware programs.

* Introduces `data abstraction`: `interface` + `implementation` → representation-independent client code.

* Uses environments as the first central example: `empty-env` + `extend-env` + `apply-env` → variable lookup model.

* Introduces the `interpreter recipe`: inspect data → classify variant → extract fields → act.

* Turns recursive data into interfaces: `constructor` + `predicate` + `extractor` → readable structural programs.

* Introduces `define-datatype` and `cases`: hand-written variant dispatch → generated data-type interface.

* Separates program text from program representation: `concrete syntax` → parser → `abstract syntax`.

* Prepares Chapter 3: `abstract syntax` + `environment interface` → executable interpreter for expression languages.

**1. Why does EOPL introduce `data abstraction` before building the first full interpreter?**

>

**2. What does an interface specify, and why should client code depend on the interface rather than on the representation?**

>

**3. How do different representations of natural numbers and environments show the difference between abstract behavior and concrete implementation?**

>

**4. Why is the environment interface more than a data-structure example? How does `apply-env` prepare the structure of later interpreters?**

>

**5. What is the `interpreter recipe`, and how does it generalize from environment lookup to abstract syntax evaluation?**

>

**6. Why do recursive data types need constructors, predicates, and extractors rather than direct `car` / `cdr` access?**

>

**7. What problem do `define-datatype` and `cases` solve, and what representation choices do they hide?**

>

**8. Why must `concrete syntax` and `abstract syntax` be separated before writing interpreters for programming languages?**

>

**Concept comparison table:**

| Concept A                 | Concept B                | Shared point                             | Key difference                                                                                    | Role in this chapter                              | Minimal example                                            |
| ------------------------- | ------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| `interface`               | `implementation`         | Both belong to a data type               | Interface states operations and expected behavior; implementation chooses representation and code | Main separation introduced by data abstraction    | natural-number interface vs unary or bignum representation |
| `constructor`             | `observer`               | Both belong to an interface              | Constructor builds data; observer extracts information or answers questions                       | Organizes abstract data types                     | `zero`, `successor`, `predecessor`, `is-zero?`             |
| `constructor`             | `extractor`              | Both appear in recursive data interfaces | Constructor creates a variant; extractor retrieves fields from that variant                       | Makes recursive data readable                     | `lambda-exp` and `lambda-exp->body`                        |
| `predicate`               | `extractor`              | Both inspect data                        | Predicate decides which variant is present; extractor assumes the appropriate variant             | Prevents unsafe structural access                 | `var-exp?` before `var-exp->var`                           |
| `data representation`     | `data abstraction`       | Both concern how values are handled      | Representation is the concrete shape; abstraction is the protected contract                       | Prevents client dependence on raw structure       | environment as list vs procedure                           |
| `transparent type`        | `opaque type`            | Both are data types                      | Transparent representation can be inspected; opaque representation cannot be exposed by clients   | Shows what Scheme cannot enforce by default       | representation visible through printing                    |
| `concrete syntax`         | `abstract syntax`        | Both represent language expressions      | Concrete syntax is for external reading; abstract syntax stores semantic structure                | Prepares parser and interpreter design            | `(lambda (x) (f x))` vs `lambda-exp`                       |
| `datum`                   | `abstract syntax tree`   | Both may be Scheme values                | Datum is raw input structure; abstract syntax tree is validated and classified                    | Clarifies parsing                                 | symbol/list input vs `var-exp`, `app-exp`                  |
| `manual variant dispatch` | `cases` dispatch         | Both classify recursive data             | Manual dispatch uses representation details; `cases` dispatches through the datatype interface    | Reduces representation dependence                 | environment lookup vs `cases lc-exp`                       |
| `a-list representation`   | `ribcage representation` | Both implement environments              | A-list adds one binding at a time; ribcage adds parallel lists of variables and values            | Prepares multi-binding and lexical-address issues | `extend-env` vs `extend-env*`                              |

**Program tracing table:**

| Tracing object                                   | What to trace                                                                                                       | Common mistake                                                                             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Natural-number interface                         | How `zero`, `successor`, `predecessor`, and `is-zero?` satisfy the same specification under several representations | Assuming the simplest representation is part of the abstract type                          |
| `plus` over abstract natural numbers             | Why the code works independently of unary, Scheme-number, or bignum representation                                  | Looking inside the representation while reading client code                                |
| `apply-env` in the data-structure representation | How the environment is classified as `empty-env` or `extend-env`, then recursively searched                         | Treating environment lookup as ordinary list search without noticing the variant structure |
| A-list environments                              | How bindings are arranged and how lookup follows the saved environment                                              | Confusing association-list layout with the abstract environment contract                   |
| Ribcage environments                             | How one extension can bind several variables and values at once                                                     | Expecting `extend-env*` to behave like repeated single-binding extension in cost           |
| Procedural environments                          | How an environment can be represented by a procedure responding to lookup requests                                  | Assuming data abstraction must use concrete records or lists                               |
| `occurs-free?` through an expression interface   | How constructors, predicates, and extractors replace raw `car` / `cdr` access                                       | Reading `(car (cadr exp))`-style structure into client code                                |
| `define-datatype` and `cases`                    | How each variant binds its fields positionally                                                                      | Forgetting that field names in `cases` are local pattern variables                         |
| `parse-expression`                               | How a raw Scheme datum becomes a validated `lc-exp` abstract syntax tree                                            | Treating parsing as printing or as ordinary list traversal                                 |
| `unparse-lc-exp`                                 | How abstract syntax is converted back to an external representation                                                 | Expecting the unparser to recover every formatting detail of the original concrete syntax  |

>

**Abstraction barrier record:**

| Abstraction layer       | Exposed interface                                                                            | Hidden representation                                               | What upper code depends on                      | What should not change if representation changes                         |
| ----------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------ |
| Natural-number layer    | `zero`, `successor`, `predecessor`, `is-zero?`                                               | unary list, Scheme number, bignum list, or other representation     | arithmetic behavior promised by the interface   | client procedures such as `plus`                                         |
| Environment layer       | `empty-env`, `extend-env`, `apply-env`, optional `empty-env?`, `has-binding?`, `extend-env*` | tagged list, a-list, ribcage, procedure, or datatype representation | variable lookup behavior                        | interpreters that use environments                                       |
| Stack layer             | `empty-stack`, `push`, `pop`, `top`, `empty-stack?`                                          | chosen stack representation                                         | last-in-first-out behavior                      | client use of stack operations                                           |
| Lambda-expression layer | `var-exp`, `lambda-exp`, `app-exp`, predicates, extractors                                   | list representation or datatype representation                      | structural classification and field extraction  | programs such as `occurs-free?`                                          |
| `define-datatype` layer | constructors, predicate, `cases`                                                             | implementation of variant records                                   | safe variant construction and decomposition     | code using `cases`                                                       |
| Abstract-syntax layer   | syntax variants such as `var-exp`, `lambda-exp`, `app-exp`                                   | internal tree representation                                        | interpreter sees meaningful expression variants | parser and evaluator logic                                               |
| Parser layer            | `parse-expression`                                                                           | raw Scheme datum analysis and error checks                          | valid concrete input becomes AST                | later interpreters should not depend on raw input shape                  |
| Unparser layer          | `unparse-lc-exp`                                                                             | traversal of AST variants                                           | AST can be rendered externally                  | abstract syntax consumers should not depend on a particular print format |

**Error prediction:**

**1. The reader may mistake an interface for a list of helper functions, but this chapter needs to distinguish behavioral specification from representation code.**

>

**2. The reader may remember `empty-env`, `extend-env`, and `apply-env` as environment utilities while missing that they are the first stable abstraction barrier for later interpreters.**

>

**3. The reader may trace `apply-env` as if it were ordinary list processing, even though the procedure is already using the interpreter recipe: classify, extract, and act.**

>

**4. The reader may treat `define-datatype` as mere syntactic convenience, but it enforces a disciplined representation of recursive variants and supports `cases`-based decomposition.**

>

**5. The reader may confuse `concrete syntax` with `abstract syntax`, especially when both are represented by Scheme values.**

>

**6. The reader may assume a parser only changes format, while the parser also validates and classifies raw input into a semantic data structure.**

>

**Learning Tips:** Chapter 2 should be read with two columns beside each example: the abstract interface on the left and the chosen representation on the right. For environments, implement or at least trace more than one representation; the point is that `apply-env` behavior should remain stable while the representation changes. For lambda-calculus expressions, rewrite one procedure that uses raw `car` / `cdr` into one that uses constructors, predicates, and extractors. When reading `define-datatype`, focus less on syntax and more on the variant discipline it gives to later interpreters.

**Exercise 2.1.** Implement the four required operations for the bignum representation of natural numbers, use them to compute factorial of 10, and observe how execution time changes with argument size and base.

**Training goal:** `data abstraction`, bignum representation, performance effects of representation choice.

>

**Exercise 2.2.** Critically analyze proposed representations and determine how well each satisfies the intended data-type specification.

**Training goal:** representation evaluation, specification checking, interface discipline.

>

**Exercise 2.3.** Represent all integers as `diff-tree` values, show that each number has infinitely many representations, implement the integer interface, and define constant-time addition.

**Training goal:** non-unique representation, abstract integer operations, representation-specific optimization.

>

**Exercise 2.4.** Write a specification for a stack interface with `empty-stack`, `push`, `pop`, `top`, and `empty-stack?`, and classify constructors and observers.

**Training goal:** interface specification, constructor/observer distinction, abstract stack behavior.

>

**Exercise 2.5.** Implement environments with an association-list representation in which the empty environment is the empty list and non-empty environments contain saved variable, value, and environment information.

**Training goal:** environment representation, a-list design, `apply-env` implementation.

>

**Exercise 2.6.** Invent and implement at least three different representations of the environment interface.

**Training goal:** representation independence, alternative environment implementations, interface preservation.

>

**Exercise 2.7.** Rewrite `apply-env` to produce a more informative error message when lookup fails.

**Training goal:** error reporting, environment lookup, diagnostic design.

>

**Exercise 2.8.** Add an observer `empty-env?` to the environment interface and implement it using the a-list representation.

**Training goal:** interface extension, observer design, representation-aware implementation.

>

**Exercise 2.9.** Add `has-binding?` to the environment interface and implement it using the a-list representation.

**Training goal:** environment querying, binding search, observer extension.

>

**Exercise 2.10.** Add `extend-env*`, which extends an environment with parallel lists of variables and values.

**Training goal:** multi-binding extension, environment specification, list alignment.

>

**Exercise 2.11.** Implement environments with a ribcage representation so that `extend-env*` can run in constant time.

**Training goal:** representation strategy, ribcage environments, asymptotic cost tradeoff.

>

**Exercise 2.12.** Implement the environment interface using a procedural representation.

**Training goal:** procedural data representation, environment-as-function, representation alternatives.

>

**Exercise 2.13.** Extend the procedural environment representation to implement `empty-env?` by representing an environment with two procedures.

**Training goal:** procedural representation extension, multiple observers, abstract interface growth.

>

**Exercise 2.14.** Extend the preceding procedural representation with a third procedure implementing `has-binding?`.

**Training goal:** procedural dispatch, observer addition, representation consistency.

>

**Exercise 2.15.** Implement the lambda-calculus expression interface for the list-based grammar representation.

**Training goal:** recursive data interface, constructors/predicates/extractors, lambda-calculus syntax.

>

**Exercise 2.16.** Modify the lambda-calculus expression implementation to use a representation without parentheses around the bound variable in lambda expressions.

**Training goal:** representation change, interface preservation, concrete structure variation.

>

**Exercise 2.17.** Invent at least two other representations of lambda-calculus expressions and implement the interface for them.

**Training goal:** representation independence, recursive data abstraction, interface testing.

>

**Exercise 2.18.** Implement non-empty bidirectional integer sequences with a focused element, left context, and right context, including movement and insertion operations.

**Training goal:** zipper-like representation, context arguments, sequence navigation.

>

**Exercise 2.19.** Implement a binary tree representation with navigation and insertion operations such as `number->bintree`, `move-to-left-son`, `move-to-right-son`, and `insert-to-left`.

**Training goal:** tree representation, navigation interface, local update by reconstruction.

>

**Exercise 2.20.** Continue the tree-interface work by implementing the remaining specified observers or operations for the binary-tree representation.

**Training goal:** tree abstraction, observer design, representation completeness.

>

**Exercise 2.21.** Implement the environment data type using `define-datatype`, and include `has-binding?`.

**Training goal:** `define-datatype`, environment variants, `cases` dispatch.

>

**Exercise 2.22.** Implement the stack data type from Exercise 2.4 using `define-datatype`.

**Training goal:** datatype definition, stack variants, constructor/observer implementation.

>

**Exercise 2.23.** Modify `identifier?` so that lambda-calculus identifiers exclude the symbol `lambda`.

**Training goal:** predicate refinement, datatype field validation, grammar constraints.

>

**Exercise 2.24.** Implement `bintree-to-list` for binary trees defined by `define-datatype`.

**Training goal:** `cases` traversal, datatype-to-external representation, tree decomposition.

>

**Exercise 2.25.** Use `cases` to define `max-interior`, returning the symbol associated with an interior node whose leaves have maximal sum.

**Training goal:** tree aggregation, `cases` recursion, auxiliary result design.

>

**Exercise 2.26.** Define the red-blue tree datatype with `define-datatype`, then write a procedure replacing each leaf by the count of red nodes on its path from the root.

**Training goal:** datatype design, context argument, path-sensitive tree recursion.

>

**Exercise 2.27.** Draw the abstract syntax trees for two given lambda-calculus expressions.

**Training goal:** abstract syntax tree construction, lambda binding, application structure.

>

**Exercise 2.28.** Write an unparser that converts the abstract syntax of an `lc-exp` into a string matching the alternate concrete grammar.

**Training goal:** unparse operation, abstract syntax traversal, concrete rendering.

>

**Exercise 2.29.** Define a `define-datatype` and parser for a lambda-calculus grammar with multiargument lambdas and applications represented by lists of subtrees.

**Training goal:** Kleene-star representation, list-of predicates, parser construction.

>

**Exercise 2.30.** Make `parse-expression` robust so that it accepts arbitrary s-expressions and reports appropriate syntax errors.

**Training goal:** parser validation, error handling, concrete-syntax checking.

>

**Exercise 2.31.** Write a parser that converts a prefix-list concrete syntax into the given abstract syntax for prefix expressions.

**Training goal:** prefix parsing, abstract syntax construction, recursive descent over token sequences.

>

**Cross-chapter recovery questions:**

**1. How will the environment interface from this chapter become the semantic backbone of LET, PROC, and LETREC in Chapter 3?**

**2. How will the distinction between `concrete syntax` and `abstract syntax` be used when Chapter 3 introduces `scan&parse` and `value-of`?**

**3. Which representation choices for environments will matter again when Chapter 3 introduces lexical addressing and nameless environments?**

**4. How will the interface/implementation distinction return in Chapter 4 when `environment` and `store` must be kept separate?**

**Chapter mastery standards:**

* Able to explain the difference between `interface` and `implementation` for an abstract data type.
* Able to classify operations as constructors, observers, predicates, or extractors.
* Able to implement the same environment interface using at least two different representations.
* Able to trace `apply-env` under data-structure, a-list, ribcage, and procedural intuitions.
* Able to design a recursive data interface with one constructor per variant, one predicate per variant, and extractors for fields.
* Able to use `define-datatype` and `cases` to represent and decompose recursive data safely.
* Able to distinguish `concrete syntax` from `abstract syntax`, and explain the roles of parser and unparser.



### Chapter 3. Expressions

*Chapter 3 begins the book’s main interpreter sequence. The first two chapters prepared the data and representation tools; this chapter uses them to define small expression languages and give those languages executable semantics. The progression from `LET` to `PROC` to `LETREC` makes binding, first-class procedures, closure formation, recursive procedures, and lexical scope explicit. The final sections replace variable names with lexical addresses, showing how a semantic idea about scope can become a concrete implementation strategy.*

**Chapter dependencies:**

* Depends on Chapter 1: grammar-directed recursion → recursive traversal of expression syntax.

* Depends on Chapter 2: `abstract syntax` + `define-datatype` + `cases` → interpreter structure.

* Introduces the central pattern: `expression` + `environment` → `expressed value`.

* `LET` isolates variable binding: right-hand side value + extended environment → body value.

* `PROC` adds first-class procedures: procedure value = parameter + body + saved environment.

* `LETREC` adds recursion: procedure name must be visible inside its own body.

* Scoping analysis connects binding structure to variable lookup: declaration contour → lexical depth.

* Lexical addressing replaces names with indices: variable lookup by symbol → variable lookup by position.

**1. What does it mean to specify the behavior of an expression language before implementing it?**

>

**2. How does the LET interpreter turn equations about `value-of` into executable Scheme code?**

>

**3. What role do `ExpVal`, `DenVal`, and extractors such as `expval->num` play in separating language values from implementation values?**

>

**4. How does `let` create a new variable binding, and why does the environment become the central semantic object?**

>

**5. What changes when procedures become expressed values in `PROC`? Why must a procedure value store its defining environment?**

>

**6. Why does `letrec` require a special environment mechanism rather than ordinary `let`?**

>

**7. How do lexical scope, dynamic scope, binding occurrence, bound occurrence, free occurrence, scope, and extent differ?**

>

**8. How does lexical addressing eliminate variable names, and why does this prepare later implementation and compilation ideas?**

>

**Concept comparison table:**

| Concept A          | Concept B            | Shared point                                            | Key difference                                                                                                        | Role in this chapter                                            | Minimal example                       |
| ------------------ | -------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------- |
| `concrete syntax`  | `abstract syntax`    | Both describe program expressions                       | Concrete syntax is external text; abstract syntax is the internal representation used by the interpreter              | LET, PROC, LETREC are implemented over abstract syntax          | `let x = 3 in x` vs `let-exp`         |
| `ExpVal`           | implementation value | Both may be represented in Scheme                       | `ExpVal` is a value of the interpreted language; implementation values are Scheme objects used to run the interpreter | Prevents confusing the object language with Scheme              | `num-val`, `bool-val`, `proc-val`     |
| `denoted value`    | `expressed value`    | Both are semantic domains                               | Denoted values are bound to variables; expressed values are produced by expressions                                   | In Chapter 3 they mostly coincide, but Chapter 4 separates them | variable binding vs expression result |
| `environment`      | substitution         | Both explain variable meaning                           | Environment records bindings explicitly; substitution rewrites expressions conceptually                               | The interpreter uses environments as runtime context            | `apply-env env var`                   |
| `let` binding      | procedure binding    | Both create variable bindings                           | `let` binds after evaluating a right-hand side; procedure binding occurs when the procedure is applied                | Separates local binding from parameter binding                  | `let x = 3 in ...` vs `proc (x) ...`  |
| `procedure value`  | procedure call       | Both concern procedures                                 | Procedure value stores code and environment; procedure call supplies an argument and evaluates the body               | Explains closure formation and application                      | `proc-val` vs `call-exp`              |
| lexical binding    | dynamic binding      | Both decide which declaration a variable reference uses | Lexical binding uses the program text; dynamic binding uses the call site                                             | Central scoping contrast                                        | `proc (z) a`                          |
| `scope`            | `extent`             | Both describe the life of a binding                     | Scope is where a binding is visible in program text; extent is when it must be maintained during execution            | Explains closures and garbage collection pressure               | closure returned from a `let`         |
| lexical address    | variable name        | Both identify bindings                                  | A lexical address records position in the static environment; a name must be looked up symbolically                   | Enables nameless interpreters                                   | `#0`, `#1`                            |
| static environment | runtime environment  | Both organize bindings                                  | Static environment supports translation; runtime environment holds actual values                                      | Used in lexical-address translation                             | `translation-of` vs `value-of`        |

**Program tracing table:**

| Tracing object             | What to trace                                                          | Common mistake                                                 |
| -------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------- |
| `value-of` for constants   | Expression variant → `num-val`                                         | Treating a raw number as already an `ExpVal`                   |
| `diff-exp`                 | Evaluate both operands, extract numbers, construct a numeric value     | Forgetting the extractor/constructor boundary                  |
| `zero?-exp`                | Evaluate operand → extract number → construct boolean value            | Confusing Scheme booleans with object-language booleans        |
| `if-exp`                   | Evaluate test first, extract boolean, evaluate only selected branch    | Evaluating both branches as if `if` were an ordinary operation |
| `let-exp`                  | Evaluate RHS in current environment, extend environment, evaluate body | Evaluating the RHS in the extended environment                 |
| `proc-exp`                 | Capture parameter, body, and saved environment                         | Storing only code and losing lexical scope                     |
| `call-exp`                 | Evaluate rator, evaluate rand, apply procedure to argument             | Applying the expression syntax instead of the procedure value  |
| `letrec-exp`               | Build recursive environment before evaluating the body                 | Trying to define recursion with ordinary `extend-env`          |
| dynamic binding variant    | Evaluate procedure body in caller-extended environment                 | Assuming alpha-renaming remains harmless                       |
| lexical-address translator | Static environment → lexical depth → nameless expression               | Confusing lexical depth with runtime value                     |
| nameless interpreter       | Lexical address → list reference in nameless environment               | Forgetting that variable names have already been discarded     |

>

**Abstraction barrier record:**

| Abstraction layer           | Exposed interface                                                                                                | Hidden representation                                                     | What upper code depends on                                | What should not change if representation changes                  |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| Program layer               | `a-program`, `value-of-program`, `run`                                                                           | parser output and program representation                                  | a program contains an expression to evaluate              | interpreter clients should not depend on raw parse trees          |
| Expression layer            | `const-exp`, `var-exp`, `diff-exp`, `zero?-exp`, `if-exp`, `let-exp`, later `proc-exp`, `call-exp`, `letrec-exp` | datatype representation of AST variants                                   | `value-of` can dispatch by variant                        | evaluator logic should not inspect raw list syntax                |
| Value layer                 | `num-val`, `bool-val`, `proc-val`, extractors                                                                    | Scheme representation of expressed values                                 | operations get values through constructors and extractors | object-language values should not be treated as raw Scheme values |
| Environment layer           | `init-env`, `empty-env`, `extend-env`, `apply-env`, `extend-env-rec`                                             | data-structure, procedural, ribcage, circular, or nameless representation | variable lookup and extension obey the semantic contract  | expression evaluation should not depend on environment layout     |
| Procedure layer             | `procedure`, `apply-procedure`                                                                                   | parameter, body, saved environment                                        | procedure application extends the saved environment       | call evaluation should not depend on closure representation       |
| Recursive environment layer | `extend-env-rec`                                                                                                 | self-referential closure construction strategy                            | recursive procedure name resolves inside its own body     | LETREC programs should not depend on how recursion is represented |
| Static environment layer    | lexical-address translator operations                                                                            | names and contours used during translation                                | lexical addresses are calculated before execution         | nameless interpreter should not depend on original variable names |
| Nameless environment layer  | `empty-nameless-env`, `extend-nameless-env`, `apply-nameless-env`                                                | list of values indexed by lexical depth                                   | translated programs access variables by address           | runtime lookup should not perform symbol search                   |

**Error prediction:**

**1. The reader may mistake `value-of` for ordinary expression evaluation in Scheme, but this chapter needs to distinguish object-language evaluation from implementation-language execution.**

>

**2. The reader may remember the grammar of LET while missing that every syntactic form corresponds to a semantic equation and an interpreter branch.**

>

**3. The reader may trace `let` as if the right-hand side were evaluated in the extended environment, even though the interpreter evaluates it in the current environment.**

>

**4. The reader may treat a procedure as only parameter + body, while PROC requires parameter + body + saved environment.**

>

**5. The reader may assume `letrec` is just syntactic convenience, while recursive binding requires a special environment behavior.**

>

**6. The reader may think lexical addressing is a cosmetic replacement of names by numbers, while it is a static analysis that changes runtime lookup.**

>

**Learning Tips:** Chapter 3 should be studied by running small programs and then tracing them through `scan&parse`, `value-of-program`, `value-of`, and the environment interface. For each new language feature, write the semantic equation first and then locate the corresponding interpreter branch. The crucial traces are one `let`, one procedure that closes over a free variable, one `letrec`, one dynamic-binding counterexample, and one nameless translation. Do not skip the exercises that ask for language extensions; they train the habit of changing syntax, semantic domains, and interpreter cases together.

**Exercise 3.1.** In the calculation of Figure 3.3, list every place where the equation connecting `num-val` and `expval->num` is used.

**Training goal:** expressed-value constructors, extractors, equational calculation.

>

**Exercise 3.2.** Give an expressed value for which extracting and reconstructing does not return the same value.

**Training goal:** `ExpVal` representation, extractor limits, value-domain precision.

>

**Exercise 3.3.** Explain why subtraction is a better single arithmetic primitive than addition for the early LET language.

**Training goal:** primitive choice, expressiveness, minimal language design.

>

**Exercise 3.4.** Rewrite the calculation for the conditional example as a derivation tree.

**Training goal:** inference-style semantics, conditional evaluation, derivation structure.

>

**Exercise 3.5.** Rewrite the calculation for the LET example as a derivation tree.

**Training goal:** LET semantics, environment extension, derivation structure.

>

**Exercise 3.6.** Extend the language with a unary `minus` operator and implement its behavior.

**Training goal:** interpreter extension, new primitive operation, semantic specification.

>

**Exercise 3.7.** Extend the language with addition, multiplication, and integer quotient operations.

**Training goal:** primitive operation design, arithmetic extension, value extraction.

>

**Exercise 3.8.** Add numeric equality and numeric ordering predicates such as `equal?`, `greater?`, and `less?`.

**Training goal:** boolean-valued primitives, predicate implementation, object-language booleans.

>

**Exercise 3.9.** Add list operations including `cons`, `car`, `cdr`, `null?`, and `emptylist`, allowing lists to contain any expressed value.

**Training goal:** extending semantic domains, list values, expressed/denoted value definitions.

>

**Exercise 3.10.** Add a variadic `list` operation that returns a list of the values of its arguments.

**Training goal:** variable-arity primitives, list-valued expressions, argument evaluation.

>

**Exercise 3.11.** Rearrange the interpreter so that adding new operators becomes easier.

**Training goal:** interpreter organization, operation dispatch, extensibility.

>

**Exercise 3.12.** Add a `cond` expression whose tests are evaluated in order and whose result is the value of the first successful branch.

**Training goal:** new syntactic form, conditional sequencing, error behavior.

>

**Exercise 3.13.** Change the language so that integers are the only expressed values, with `0` treated as false and all other integers treated as true.

**Training goal:** semantic-domain redesign, truth-value convention, predicate modification.

>

**Exercise 3.14.** Add a separate `Bool-exp` syntactic category and implement boolean-expression evaluation for conditionals.

**Training goal:** syntax separation, boolean sublanguage, predicate placement.

>

**Exercise 3.15.** Add a `print` operation that prints its argument and returns `1`, and explain why this effect is not expressible in the current specification framework.

**Training goal:** computational effects, limits of value-only semantics, interpreter extension.

>

**Exercise 3.16.** Extend `let` so that one declaration can bind any number of variables, with all right-hand sides evaluated in the current environment.

**Training goal:** multi-binding LET, parallel binding, environment extension.

>

**Exercise 3.17.** Add `let*`, where declarations are processed sequentially and later right-hand sides can see earlier bindings.

**Training goal:** sequential binding, environment chaining, contrast with parallel `let`.

>

**Exercise 3.18.** Add `unpack`, which destructures a list into a fixed number of variables and reports an error if the lengths do not match.

**Training goal:** pattern-like binding, list destructuring, arity checking.

>

**Exercise 3.19.** Replace `proc` with `letproc`, so procedures must be created and named at the same time.

**Training goal:** procedure-binding design, language restriction, syntax/semantics change.

>

**Exercise 3.20.** Use Currying in PROC to write a procedure that takes two arguments and returns their sum.

**Training goal:** unary procedures, higher-order encoding, Curried application.

>

**Exercise 3.21.** Extend PROC to support procedures with multiple arguments and calls with multiple operands.

**Training goal:** multiargument procedures, argument-list evaluation, procedure application redesign.

>

**Exercise 3.22.** Modify concrete syntax so built-in operations and user-defined procedure calls use a uniform call syntax.

**Training goal:** concrete syntax design, primitive/procedure uniformity, parser impact.

>

**Exercise 3.23.** Analyze the given PROC program using self-application tricks, then use the same technique to write factorial in PROC.

**Training goal:** recursion without `letrec`, self-application, Curried helper procedures.

>

**Exercise 3.24.** Use the self-application technique to write mutually recursive `odd` and `even` procedures in PROC.

**Training goal:** mutual recursion encoding, higher-order procedures, PROC expressiveness.

>

**Exercise 3.25.** Show that the given `makerec` program returns `12`, illustrating a general method for defining recursive procedures in PROC.

**Training goal:** fixed-point style recursion, self-application, recursive procedure encoding.

>

**Exercise 3.26.** Modify the closure representation so that procedures retain only the bindings needed for their free variables.

**Training goal:** free-variable analysis, closure trimming, environment representation.

>

**Exercise 3.27.** Add `traceproc`, a procedure form that behaves like `proc` but prints messages on entry and exit.

**Training goal:** procedure variant extension, tracing behavior, interpreter instrumentation.

>

**Exercise 3.28.** Modify the language to use dynamic binding, once with procedural procedures and once with data-structure procedures.

**Training goal:** dynamic scope, procedure representation, call-site environment.

>

**Exercise 3.29.** Analyze how dynamic binding makes alpha-renaming unsafe, using the example where `proc (z) a` reads `a` from the caller’s environment.

**Training goal:** dynamic binding hazards, variable renaming, lexical vs dynamic scope.

>

**Exercise 3.30.** Explain the purpose of the `proc-val` call in `apply-env` for recursive environments.

**Training goal:** recursive closure construction, expressed values, `extend-env-rec`.

>

**Exercise 3.31.** Extend LETREC so a recursive procedure may have multiple arguments.

**Training goal:** multiargument recursion, LETREC extension, procedure application.

>

**Exercise 3.32.** Extend LETREC to allow any number of mutually recursive unary procedures.

**Training goal:** mutual recursion, recursive environment design, multiple procedure bindings.

>

**Exercise 3.33.** Extend LETREC to allow any number of mutually recursive procedures, each with possibly many arguments.

**Training goal:** generalized LETREC, multiargument mutual recursion, environment representation.

>

**Exercise 3.34.** Implement `extend-env-rec` using the procedural representation of environments.

**Training goal:** procedural environment representation, recursive binding, delayed closure creation.

>

**Exercise 3.35.** Complete the circular-vector implementation of recursive environments so the closure is built only once.

**Training goal:** circular structure, efficiency, recursive environment representation.

>

**Exercise 3.36.** Extend the circular recursive-environment implementation to handle mutually recursive procedures.

**Training goal:** circular environment for mutual recursion, vector-based sharing, implementation generalization.

>

**Exercise 3.37.** Compare recursive procedures under lexical and dynamic binding, then write mutually recursive `even` and `odd` in the dynamically bound language.

**Training goal:** dynamic binding recursion, historical recursion technique, scoping comparison.

>

**Exercise 3.38.** Extend the lexical-address translator and nameless interpreter to handle `cond`.

**Training goal:** lexical addressing for derived conditionals, translator/interpreter synchronization.

>

**Exercise 3.39.** Extend the lexical-address translator and nameless interpreter to handle `pack` and `unpack`.

**Training goal:** lexical addressing for destructuring, nameless binding, list binding forms.

>

**Exercise 3.40.** Extend lexical addressing to handle `letrec` by distinguishing ordinary bindings from `letrec` bindings in the translation context.

**Training goal:** lexical addressing with recursion, static environment annotation, nameless `letrec`.

>

**Exercise 3.41.** Extend lexical addressing to handle multiargument `let`, procedures, and procedure calls using a nameless ribcage environment.

**Training goal:** lexical depth + position, ribcage environments, multi-binding lookup.

>

**Exercise 3.42.** Combine lexical addressing with the trimmed procedure representation from Exercise 3.26.

**Training goal:** closure trimming, static environment design, lexical address translation.

>

**Exercise 3.43.** Extend the translator to track known procedures and generate code that avoids an environment lookup at calls of statically known procedures.

**Training goal:** static procedure analysis, call optimization, environment lookup elimination.

>

**Exercise 3.44.** Modify the translator so unused procedure values for known procedures are never constructed.

**Training goal:** dead closure elimination, source-to-source optimization, static analysis.

>

**Cross-chapter recovery questions:**

**1. How will Chapter 3’s `environment`-only interpreter need to be rechecked when Chapter 4 introduces `store` and references?**

**2. How will the distinction between `ExpVal` and `DenVal` become more important when variables denote locations rather than values?**

**3. How will the recursive evaluator from this chapter be rewritten when Chapter 5 makes continuations explicit?**

**4. How will lexical addressing from this chapter return in later implementation and optimization problems?**

**Chapter mastery standards:**

* Able to trace a LET expression from parsed abstract syntax through `value-of` and environment extension.
* Able to distinguish object-language values from Scheme implementation values.
* Able to explain how `ExpVal`, constructors, and extractors enforce semantic-domain boundaries.
* Able to trace a procedure call through rator evaluation, rand evaluation, closure retrieval, and `apply-procedure`.
* Able to explain why closures store the defining environment under lexical scope.
* Able to explain why LETREC needs `extend-env-rec` rather than ordinary `extend-env`.
* Able to translate a simple expression into nameless form and trace lookup through a nameless environment.

### Chapter 4. State

*Chapter 4 adds `state` to the interpreter sequence by introducing a separate `store` that maps locations to values. Chapter 3 could explain variables with an `environment` alone; this chapter shows why assignment requires a second semantic component, because variables may denote locations whose contents change over time. The chapter first makes references explicit, then hides reference allocation and dereferencing inside ordinary variable binding, then extends the same store discipline to mutable pairs and arrays. The final section uses the store to compare parameter-passing mechanisms: call-by-value, call-by-reference, call-by-value-result, call-by-name, and call-by-need.*

**Chapter dependencies:**

* Depends on Chapter 3: `environment` + closure + `value-of` → interpreter baseline.

* Adds a new semantic component: `environment` + `store` → variables can be connected to locations.

* `EXPLICIT-REFS`: references are expressed values: `newref` + `deref` + `setref` → visible store operations.

* `IMPLICIT-REFS`: variables denote references: `DenVal = Ref(ExpVal)` and `ExpVal` no longer includes references.

* Mutable aggregates extend the store idea: mutable pair = two assignable locations.

* Parameter passing becomes a store-design question: actual argument → denoted value.

* Lazy evaluation adds delayed operands: `Thunk = expression + environment`.

* Prepares Chapter 5: store handles data context; continuations will make control context explicit.

**1. What semantic problem appears when a language adds assignment, and why is the environment alone no longer enough?**

>

**2. How does `EXPLICIT-REFS` make allocation, dereferencing, and mutation visible in the source language?**

>

**3. Why does `IMPLICIT-REFS` change the relation between `ExpVal` and `DenVal`, and how does this make assignment feel more like ordinary programming-language assignment?**

>

**4. How should a trace of evaluation change once every expression may read from or update the store?**

>

**5. How do mutable pairs and arrays show that state is not only about variables, but also about aggregate data structures with assignable components?**

>

**6. Why do `call-by-value`, `call-by-reference`, and `call-by-value-result` produce different meanings for the same procedure call?**

>

**7. How do `call-by-name` and `call-by-need` delay operand evaluation, and why does memoization matter when effects are present?**

>

**8. What does Chapter 4 reveal about language design: which parts of mutation should be explicit in programs, and which parts should be hidden in the interpreter?**

>

**Concept comparison table:**

| Concept A           | Concept B              | Shared point                                     | Key difference                                                                                                                | Role in this chapter                               | Minimal example                           |
| ------------------- | ---------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------- |
| `environment`       | `store`                | Both participate in variable meaning             | Environment maps names to denoted values; store maps locations to contents                                                    | Main semantic split of Chapter 4                   | `apply-env` vs `deref`                    |
| `ExpVal`            | `DenVal`               | Both are semantic domains                        | `ExpVal` is produced by expressions; `DenVal` is bound to variables                                                           | Assignment makes the distinction decisive          | `DenVal = Ref(ExpVal)` in `IMPLICIT-REFS` |
| `reference`         | `value`                | Both may be manipulated by the interpreter       | A reference denotes a location; a value is the contents or result being computed                                              | Explains L-values and R-values                     | `newref(0)` vs `deref(x)`                 |
| `EXPLICIT-REFS`     | `IMPLICIT-REFS`        | Both add mutable state                           | Explicit references expose `newref`, `deref`, `setref`; implicit references hide these inside variable binding and assignment | Two language designs for state                     | `setref(x, 5)` vs `set x = 5`             |
| `allocation`        | `assignment`           | Both modify store-related state                  | Allocation creates a new location; assignment changes an existing location                                                    | Separates creating a cell from updating it         | `newref(v)` vs `setref(r, v)`             |
| `setref`            | `set`                  | Both mutate a location                           | `setref` takes an explicit reference; `set` finds the variable’s denoted location                                             | Separates explicit and implicit reference models   | `setref(x, 4)` vs `set x = 4`             |
| `call-by-value`     | `call-by-reference`    | Both pass actual parameters to formal parameters | Call-by-value allocates a fresh location for the formal; call-by-reference can pass the caller’s location                     | Explains aliasing and visible parameter assignment | `proc (x) set x = 4`                      |
| `call-by-reference` | `call-by-value-result` | Both can affect caller variables                 | Reference shares the caller’s location during the call; value-result copies back after return                                 | Distinguishes sharing from copy-in/copy-out        | `swap`-style examples                     |
| `call-by-name`      | `call-by-need`         | Both delay operand evaluation                    | Call-by-name may evaluate the thunk repeatedly; call-by-need memoizes the first result                                        | Shows lazy evaluation under effects                | delayed operand with assignment           |
| `thunk`             | `procedure`            | Both store code with an environment              | A thunk stores an unevaluated operand expression; a procedure stores a body waiting for application                           | Implements lazy parameter passing                  | `a-thunk(exp, env)`                       |
| mutable pair        | immutable pair         | Both combine two values                          | Mutable pair components are locations that can be changed independently                                                       | Extends store to aggregate data                    | `setleft`, `setright`                     |
| array               | mutable pair           | Both are mutable aggregate structures            | Array has many indexed locations and must track length                                                                        | Extends pair idea to indexed storage               | `newarray`, `arrayref`, `arrayset`        |

**Program tracing table:**

| Tracing object                          | What to trace                                                                             | Common mistake                                                                          |
| --------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `newref`                                | Store before allocation → new location → updated store                                    | Treating a reference as the contained value                                             |
| `deref`                                 | Reference → store lookup → expressed value                                                | Forgetting that dereferencing is explicit only in `EXPLICIT-REFS`                       |
| `setref`                                | Reference → new value → same location with changed contents                               | Thinking assignment returns the assigned value rather than the language’s chosen result |
| `EXPLICIT-REFS` shared variable example | Which procedure closes over which reference and how `setref` changes shared communication | Treating shared state as parameter passing                                              |
| Hidden counter procedure                | Closure environment + private reference + repeated calls                                  | Reallocating the counter on every call instead of once                                  |
| Store initialization                    | `value-of-program` → `initialize-store!` → fresh run                                      | Letting old store contents leak across programs                                         |
| `IMPLICIT-REFS` variable lookup         | Variable → environment reference → store contents                                         | Looking for the value directly in the environment                                       |
| `set` in `IMPLICIT-REFS`                | Variable → reference → update store at that reference                                     | Updating the environment binding instead of the store                                   |
| Mutable pair                            | Pair value → two locations → independent left/right updates                               | Treating the pair as a two-element list without locations                               |
| Array                                   | Array value → base location + index + bounds check                                        | Forgetting that length must be represented somewhere                                    |
| Call-by-reference operand               | Variable operand → caller’s reference; non-variable operand → fresh reference             | Passing the value when the location is required                                         |
| Call-by-name variable lookup            | Variable → reference → thunk or expressed value → force if needed                         | Evaluating all operands before procedure entry                                          |
| Call-by-need forcing                    | Thunk → value → store update with memoized value                                          | Forgetting that memoization itself is a store effect                                    |

>

**Abstraction barrier record:**

| Abstraction layer                 | Exposed interface                                                | Hidden representation                              | What upper code depends on                                                | What should not change if representation changes                         |
| --------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Store layer                       | `empty-store`, `initialize-store!`, `newref`, `deref`, `setref!` | list, vector, or other memory representation       | locations can be allocated, read, and updated                             | interpreter clauses should not depend on the store’s physical layout     |
| Reference layer                   | `reference?`, reference values or reference denotations          | integers, indices, pointers, or cells              | references identify locations                                             | language semantics should not depend on reference encoding               |
| Explicit-reference language layer | `newref`, `deref`, `setref` expressions                          | store operations and reference representation      | source programs can manipulate references                                 | store implementation can change without changing program syntax          |
| Implicit-reference language layer | `let`, procedure call, `letrec`, variable lookup, `set`          | automatic allocation and dereferencing             | variables behave as assignable cells                                      | user programs should not manually call allocation for variables          |
| Environment layer under state     | `apply-env`, `extend-env`, `extend-env-rec`                      | variables bound to references                      | variable names locate storage cells                                       | `value-of` should not know frame representation                          |
| Mutable-pair layer                | `newpair`, `left`, `right`, `setleft`, `setright`                | two references, adjacent locations, or pair object | pair components can be read and updated                                   | client expressions should not depend on pair storage layout              |
| Array layer                       | `newarray`, `arrayref`, `arrayset`, `arraylength`                | base reference, element cells, length field        | indexed mutable storage                                                   | bounds checking and length retrieval should not depend on hidden layout  |
| Parameter-passing layer           | procedure application                                            | strategy for turning operands into denoted values  | formal parameters receive denoted values according to the language’s rule | procedure bodies should not inspect the parameter-passing implementation |
| Lazy-evaluation layer             | variable lookup and procedure call                               | thunks, thunk references, memoized values          | operands are evaluated only when demanded                                 | user code should not rely on thunk representation                        |

**Error prediction:**

**1. The reader may mistake state for environment mutation, but this chapter needs to distinguish changing a binding from changing the contents of a location.**

>

**2. The reader may remember `newref`, `deref`, and `setref` as new primitives while missing that they force a new semantic domain: `store`.**

>

**3. The reader may trace `IMPLICIT-REFS` as if variables still denoted values directly, even though variables now denote references.**

>

**4. The reader may assume mutable pairs are merely pairs with extra operations, while the chapter represents their components as assignable locations.**

>

**5. The reader may think call-by-reference only saves copying, while the main semantic change is aliasing: two names may denote the same location.**

>

**6. The reader may treat call-by-name and call-by-need as pure performance choices, but with effects they can produce different observable behavior.**

>

**Learning Tips:** Chapter 4 should be read with three columns: expression, environment, and store. Every `let`, procedure call, `letrec`, `set`, `newref`, mutable-pair operation, and parameter-passing variant should be traced by asking where the location is created, where the reference is stored, and when the contents are read or changed. The most useful test programs are small programs where a variable is updated, a procedure closes over a reference, two names alias the same location, and a delayed operand contains an effect. Do not merge `ExpVal` and `DenVal`; this chapter is where that distinction starts doing real semantic work.

**Exercise 4.1.** Analyze what changes if the counter reference in the `g` example is allocated inside the procedure body rather than outside it.

**Training goal:** private state, allocation timing, closure over references.

>

**Exercise 4.2.** Analyze a program that stores references inside references and trace the resulting sequence of allocation, dereferencing, and update operations.

**Training goal:** nested references, reference values, store tracing.

>

**Exercise 4.3.** Design or analyze programs in `EXPLICIT-REFS` that communicate through shared references rather than through procedure arguments.

**Training goal:** shared state, explicit reference communication, store effects.

>

**Exercise 4.4.** Add a `begin` expression that evaluates subexpressions in order and returns the value of the last expression.

**Training goal:** sequencing, effect order, interpreter extension.

>

**Exercise 4.5.** Add list expressions or list-valued operations to the stateful language.

**Training goal:** extending `ExpVal`, data values under state, interpreter extension.

>

**Exercise 4.6.** Extend the explicit-reference language with additional expression forms that interact with store operations.

**Training goal:** stateful language extension, semantic-domain update, evaluation order.

>

**Exercise 4.7.** Trace or modify the explicit-reference interpreter to clarify when environment, procedure, and store information is displayed during evaluation.

**Training goal:** interpreter instrumentation, store logs, evaluation tracing.

>

**Exercise 4.8.** Show exactly where the naive store implementation takes linear time instead of constant time.

**Training goal:** store representation, asymptotic cost, implementation analysis.

>

**Exercise 4.9.** Implement the store in constant time using a Scheme vector and explain what is lost by this representation.

**Training goal:** vector store, constant-time access, representation tradeoff.

>

**Exercise 4.10.** Implement the `begin` expression from Exercise 4.4 in `EXPLICIT-REFS`.

**Training goal:** sequencing under explicit references, interpreter case addition.

>

**Exercise 4.11.** Implement the `list` extension from Exercise 4.5 in `EXPLICIT-REFS`.

**Training goal:** list values, language extension under state, expressed-value design.

>

**Exercise 4.12.** Complete a store-passing interpreter for `EXPLICIT-REFS`, where `value-of` returns both a value and a store.

**Training goal:** explicit store threading, answer datatype, avoiding host-language effects.

>

**Exercise 4.13.** Extend the store-passing interpreter to support procedures of multiple arguments.

**Training goal:** multiargument procedures, store-passing evaluation, procedure application.

>

**Exercise 4.14.** Analyze how implicit references change allocation compared with explicit references.

**Training goal:** implicit allocation, `DenVal = Ref(ExpVal)`, variable lookup.

>

**Exercise 4.15.** Extend or test `IMPLICIT-REFS` programs that depend on assignment, repeated calls, and stored procedure values.

**Training goal:** implicit dereferencing, assignment behavior, stateful procedure calls.

>

**Exercise 4.16.** Modify the implicit-reference interpreter to support additional expression forms from Chapter 3 under the new `DenVal` discipline.

**Training goal:** interpreter migration, implicit references, previous-language features under store.

>

**Exercise 4.17.** Write specification rules for and implement multiargument procedures and `let` expressions in `IMPLICIT-REFS`.

**Training goal:** multiargument binding, implicit allocation, semantic rules.

>

**Exercise 4.18.** Write the rule for and implement multiprocedure `letrec` expressions.

**Training goal:** recursive binding under store, multiple recursive procedures, allocation discipline.

>

**Exercise 4.19.** Modify multiprocedure `letrec` so each closure is built only once and only one location is allocated for it.

**Training goal:** recursive environment efficiency, closure sharing, allocation optimization.

>

**Exercise 4.20.** Add both mutable and immutable variable bindings, with `let` introducing immutable variables and `letmutable` introducing mutable ones.

**Training goal:** mixed `DenVal`, assignment restrictions, mutable vs immutable binding.

>

**Exercise 4.21.** Add `setdynamic`, a dynamic assignment form that temporarily changes a variable during evaluation of a body and then restores it.

**Training goal:** dynamic assignment, temporary state change, restoration discipline.

>

**Exercise 4.22.** Extend the language to model a statement-oriented language with assignment, printing, blocks, conditionals, loops, and variable declarations.

**Training goal:** statement semantics, store-transforming computation, expression vs statement distinction.

>

**Exercise 4.23.** Add `read` statements that read a nonnegative integer and store it in a variable.

**Training goal:** input effect, statement extension, store update.

>

**Exercise 4.24.** Add `do-while` statements to the statement language.

**Training goal:** loop semantics, post-test iteration, statement interpreter extension.

>

**Exercise 4.25.** Extend block statements to allow initialized variables, and decide whether later initializers can see earlier declarations.

**Training goal:** block scoping, initialization order, declaration semantics.

>

**Exercise 4.26.** Extend initialized blocks so procedures declared in a single block may be mutually recursive.

**Training goal:** block-level recursive procedure declarations, store and scope interaction.

>

**Exercise 4.27.** Add subroutines whose bodies are statements rather than expressions, and distinguish subroutine calls from procedure calls.

**Training goal:** statement-level abstraction, expressed vs denoted values, procedure/subroutine distinction.

>

**Exercise 4.28.** Write specification rules for the five mutable-pair operations: `newpair`, `left`, `right`, `setleft`, and `setright`.

**Training goal:** mutable aggregate semantics, pair locations, specification rules.

>

**Exercise 4.29.** Add arrays with `newarray`, `arrayref`, and `arrayset`, using zero-based indices and consecutive locations.

**Training goal:** array representation, indexed mutable storage, bounds-sensitive design.

>

**Exercise 4.30.** Add `arraylength` so array size can be retrieved in constant time, and ensure that `arrayref` and `arrayset` check index bounds.

**Training goal:** array metadata, bounds checking, constant-time length.

>

**Exercise 4.31.** Write the specification rules for `CALL-BY-REFERENCE`.

**Training goal:** parameter-passing semantics, references as denoted values, specification writing.

>

**Exercise 4.32.** Extend `CALL-BY-REFERENCE` to support procedures of multiple arguments.

**Training goal:** multiargument call-by-reference, aliasing across parameters, operand handling.

>

**Exercise 4.33.** Extend `CALL-BY-REFERENCE` to support call-by-value procedures as well.

**Training goal:** mixed parameter-passing strategies, procedure representation, language design.

>

**Exercise 4.34.** Add a call-by-reference version of `let`, called `letref`, and write its specification and implementation.

**Training goal:** reference binding outside procedure calls, aliasing, binding-form design.

>

**Exercise 4.35.** Extend `IMPLICIT-REFS` with `ref Identifier`, allowing references only to variables, and analyze the resulting expressed and denoted values.

**Training goal:** restricted references, variable locations, interaction of explicit and implicit reference ideas.

>

**Exercise 4.36.** Add arrays to the call-by-reference language and make array references usable as reference actual parameters.

**Training goal:** reference parameters for aggregate elements, l-values, array aliasing.

>

**Exercise 4.37.** Implement call-by-value-result and write a program that behaves differently under call-by-value-result and call-by-reference.

**Training goal:** copy-in/copy-out semantics, parameter-passing comparison, aliasing effects.

>

**Exercise 4.38.** Analyze a recursive-procedure encoding that works under call-by-need, compare it with the original program from Exercise 3.25, and test it under call-by-value.

**Training goal:** laziness and recursion, delayed self-application, call-by-value contrast.

>

**Exercise 4.39.** Construct an example where call-by-name and call-by-need give different answers in the presence of effects.

**Training goal:** thunk re-evaluation vs memoization, effects under laziness, semantic counterexample.

>

**Exercise 4.40.** Modify `value-of-operand` to avoid making thunks for constants and procedures.

**Training goal:** lazy evaluation optimization, thunk allocation, operand classification.

>

**Exercise 4.41.** Write the specification rules for call-by-name and call-by-need.

**Training goal:** lazy parameter-passing specification, thunks, memoization rules.

>

**Exercise 4.42.** Add a lazy `let` to the call-by-need interpreter.

**Training goal:** lazy binding form, call-by-need extension, delayed local definitions.

>

**Cross-chapter recovery questions:**

**1. How will Chapter 4’s `store` discipline need to be rechecked when Chapter 5 makes the control context explicit through continuations?**

**2. How will assignments and store updates interact with exceptions, threads, and other control mechanisms in Chapter 5?**

**3. Which distinction between `ExpVal` and `DenVal` will return when Chapter 7 imposes static types on expression languages?**

**4. How will mutable fields, objects, and method dispatch in Chapter 9 reuse the same environment/store separation introduced here?**

**Chapter mastery standards:**

* Able to explain why `environment` ≠ `store` and why assignment requires both.
* Able to trace an `EXPLICIT-REFS` program through `newref`, `deref`, and `setref`.
* Able to explain how `IMPLICIT-REFS` changes `DenVal` from values to references.
* Able to trace a variable lookup in `IMPLICIT-REFS`: variable → reference → store contents.
* Able to distinguish allocation, dereferencing, and assignment as separate semantic operations.
* Able to trace a mutable pair or array update at the level of store locations.
* Able to compare call-by-value, call-by-reference, call-by-value-result, call-by-name, and call-by-need by what denoted value is passed to the formal parameter.


### Chapter 5. Continuation-Passing Interpreters

*Chapter 5 makes `control context` explicit. Previous interpreters used the host Scheme call stack to remember what remains to be done; this chapter replaces that hidden control stack with an explicit `continuation` passed through the interpreter. Once control is represented as data or procedure, the interpreter can be transformed into a trampolined version, then into an imperative version using registers. The same machinery then supports nonlocal control mechanisms such as `exceptions`, captured continuations, and cooperative threads.*

**Chapter dependencies:**

* Depends on Chapter 3: recursive `value-of` + `environment` → baseline interpreter.

* Depends on Chapter 4: `store` + effects → control changes become observable and important.

* Introduces the central split: `environment` = data context & `continuation` = control context.

* Rewrites evaluation: `value-of exp env` → `value-of/k exp env cont`.

* Turns hidden stack frames into explicit continuation builders: operand evaluation → continuation growth.

* Trampolining changes control transfer: recursive host calls → `Bounce` + `trampoline`.

* Imperative interpreter lowers the same structure: parameters → global registers + explicit transfer.

* Prepares Chapter 6: one interpreter transformed into CPS → general CPS transformation for programs.

**1. Why does control context grow in some computations but not in others?**

>

**2. Why is it operand evaluation, rather than procedure entry itself, that requires saving control context?**

>

**3. How does a continuation represent “the rest of the computation,” and how does `apply-cont` make that representation executable?**

>

**4. How does `value-of/k` change the interpreter’s contract compared with the direct-style interpreter from Chapter 3?**

>

**5. Why does trampolining remove dependence on the host language’s recursive call stack?**

>

**6. How does the imperative interpreter replace procedure parameters with global registers, and what semantic structure must remain visible after this translation?**

>

**7. How do exceptions use continuations to abandon the current control context and transfer control to a handler?**

>

**8. How do threads reuse the same continuation machinery to suspend, enqueue, resume, and schedule computations?**

>

**Concept comparison table:**

| Concept A                  | Concept B                        | Shared point                               | Key difference                                                                                                 | Role in this chapter                             | Minimal example                          |
| -------------------------- | -------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------- |
| `environment`              | `continuation`                   | Both represent context                     | Environment records data bindings; continuation records pending control                                        | Main conceptual analogy of the chapter           | `env` vs `cont` in `value-of/k`          |
| `data context`             | `control context`                | Both affect expression meaning             | Data context answers “what do names mean?”; control context answers “what happens next?”                       | Explains why Chapter 5 is needed after Chapter 3 | variable lookup vs pending subtraction   |
| direct-style interpreter   | continuation-passing interpreter | Both evaluate the same language            | Direct style uses host stack; CPS passes the stack explicitly                                                  | First major transformation                       | `value-of` → `value-of/k`                |
| `value-of/k`               | `apply-cont`                     | Both are evaluator procedures              | `value-of/k` evaluates an expression under a continuation; `apply-cont` resumes the saved context with a value | Core evaluator loop                              | `zero1-cont`, `diff1-cont`, `rator-cont` |
| `continuation builder`     | continuation value               | Both belong to the continuation data type  | Builder constructs a new pending frame; continuation value is the accumulated control context                  | Makes growth of control visible                  | `diff1-cont exp2 env cont`               |
| recursive control behavior | iterative control behavior       | Both describe control use during execution | Recursive behavior grows control context; iterative behavior uses bounded control context                      | Explains `fact` vs `fact-iter`                   | pending multiplications vs accumulator   |
| `Bounce`                   | `FinalAnswer`                    | Both appear in trampolined execution       | A `Bounce` says what computation to run next; `FinalAnswer` is the completed result                            | Separates one step from whole computation        | thunk-based bounce                       |
| trampoline                 | ordinary recursion               | Both repeat computation steps              | Trampoline loops over bounces; ordinary recursion relies on host call stack                                    | Avoids host stack growth                         | `trampoline` loop                        |
| global register            | procedure parameter              | Both carry interpreter state               | Parameter is lexical and call-based; register is mutable and globally accessed                                 | Imperative interpreter transformation            | `exp`, `env`, `cont`, `val`              |
| exception handler          | ordinary continuation            | Both describe future control               | Ordinary continuation resumes normal computation; handler continuation handles abnormal transfer               | Adds `try` / `raise`                             | `apply-handler`                          |
| captured continuation      | procedure value                  | Both can be invoked later                  | Captured continuation reinstalls a saved control context; procedure applies a body in an environment           | `letcc`, `throw`, `call/cc`                      | throwing to a saved continuation         |
| thread                     | continuation snapshot            | Both package a future computation          | Thread can be placed on a ready queue and resumed by the scheduler                                             | Basis for cooperative threads                    | ready queue of thunks                    |
| mutex                      | scheduler queue                  | Both control thread execution              | Mutex blocks access to shared resources; scheduler decides which ready thread runs next                        | Controls unsafe shared-state examples            | `wait-for-mutex`, `signal-mutex`         |

**Program tracing table:**

| Tracing object              | What to trace                                                                                  | Common mistake                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `fact` vs `fact-iter`       | Which calls create pending work and how large the continuation becomes                         | Treating every recursive call as control growth                             |
| `value-of/k` for `diff-exp` | Evaluate first operand → build `diff1-cont` → evaluate second operand → build/use `diff2-cont` | Computing the subtraction before both operands are available                |
| `zero?-exp`                 | Evaluate operand under `zero1-cont`, then convert numeric value to boolean value               | Forgetting that the continuation performs the pending test                  |
| `if-exp`                    | Test expression → `if-test-cont` → select one branch only                                      | Evaluating both branches while tracing                                      |
| `let-exp`                   | RHS expression → `let-exp-cont` → extend environment → evaluate body                           | Extending the environment before RHS evaluation                             |
| `call-exp`                  | Rator → `rator-cont` → rand → `rand-cont` → `apply-procedure/k`                                | Entering procedure body before operand value is computed                    |
| `apply-procedure/k`         | Procedure value + argument value + continuation → body evaluation in saved environment         | Creating a new continuation for procedure entry itself                      |
| Trampolined interpreter     | One evaluation step returns a `Bounce`; trampoline runs the next bounce                        | Letting host recursion do the looping                                       |
| Imperative interpreter      | Register values before and after each transfer                                                 | Losing track of which values formerly lived in procedure parameters         |
| Exception handling          | `try` installs handler; `raise` searches/apply handler instead of normal continuation          | Treating exceptions as ordinary returned values                             |
| `letcc` / `throw`           | Capture continuation → bind it → later ignore current continuation and apply captured one      | Assuming captured continuations behave like ordinary procedures             |
| Thread scheduler            | Ready queue, current thread, timer, final answer                                               | Forgetting that a suspended computation is a packaged continuation          |
| Mutex operations            | Thread blocks on closed mutex or proceeds when opened                                          | Treating mutual exclusion as a property of variables rather than scheduling |

>

**Abstraction barrier record:**

| Abstraction layer           | Exposed interface                                                                     | Hidden representation                                                             | What upper code depends on                                                  | What should not change if representation changes                           |
| --------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Continuation layer          | `end-cont`, continuation builders, `apply-cont`                                       | procedural representation, datatype representation, list-of-frames representation | pending control can be resumed with a value                                 | `value-of/k` should not depend on raw continuation layout                  |
| CPS interpreter layer       | `value-of/k`, `apply-procedure/k`, `apply-cont`                                       | continuation construction and dispatch                                            | every evaluation step receives an explicit continuation                     | language clauses should preserve tail-call structure                       |
| Trampoline layer            | `Bounce`, `trampoline`, bounce constructors                                           | thunks or data-structure snapshots                                                | interpreter returns next computation instead of making host recursive calls | evaluator semantics should not change when bounce representation changes   |
| Imperative-register layer   | global registers such as `exp`, `env`, `cont`, `val`, `proc1`                         | mutable host variables                                                            | interpreter state is held in registers                                      | control behavior should match the CPS interpreter                          |
| Exception layer             | `try`, `raise`, `apply-handler`                                                       | handler continuations embedded in ordinary continuations                          | abnormal transfer finds the most recent handler                             | user programs should not depend on handler representation                  |
| Captured-continuation layer | `letcc`, `throw`, or `call-with-current-continuation`                                 | continuation values and invocation protocol                                       | saved control contexts can be re-entered                                    | surface control construct can change without changing continuation meaning |
| Scheduler layer             | `initialize-scheduler!`, `place-on-ready-queue!`, `run-next-thread`, timer operations | ready queue, time slice, final answer cell                                        | threads are resumed in scheduler order                                      | interpreter clauses should not depend on queue representation              |
| Mutex layer                 | `wait-for-mutex`, `signal-mutex`                                                      | closed flag and waiting queue                                                     | only one thread enters protected section                                    | thread programs should not inspect mutex internals                         |

**Error prediction:**

**1. The reader may mistake continuations for callbacks, but this chapter needs to distinguish an arbitrary callback from the complete control context of an interpreter.**

>

**2. The reader may remember the extra `cont` parameter while missing why it is added: to prevent evaluator calls from using hidden host control context.**

>

**3. The reader may trace procedure application as if entering a procedure body itself grows the continuation, even though the chapter’s principle places growth in operand evaluation.**

>

**4. The reader may treat trampolining as an optimization trick, while it is a representation change for control transfer.**

>

**5. The reader may think the imperative interpreter is a different semantics, but it should preserve the CPS interpreter’s behavior while changing where state is stored.**

>

**6. The reader may treat exceptions, `letcc`, and threads as unrelated features, while all three depend on explicit control contexts.**

>

**Learning Tips:** Chapter 5 should be read by tracing continuations as carefully as Chapter 4 required tracing stores. For a small expression, write the current `exp`, `env`, `cont`, and returned value at every step. Use `fact` and `fact-iter` as the main contrast: the former accumulates pending multiplication frames, while the latter reuses a bounded continuation. In the trampoline and imperative sections, check that the object-language result has not changed; only the representation of control transfer has changed.

**Exercise 5.1.** Implement the continuation data type using a procedural representation.

**Training goal:** `continuation` representation, procedural data, `apply-cont`.

>

**Exercise 5.2.** Implement the continuation data type using a data-structure representation.

**Training goal:** datatype representation, continuation dispatch, abstraction barrier.

>

**Exercise 5.3.** Add `let2`, a `let` expression that binds exactly two variables, to the continuation-passing interpreter.

**Training goal:** interpreter extension, multi-binding continuation, environment extension.

>

**Exercise 5.4.** Add `let3`, a `let` expression that binds exactly three variables, to the continuation-passing interpreter.

**Training goal:** fixed-arity binding, continuation design, environment extension.

>

**Exercise 5.5.** Add lists to the language as in Exercise 3.9.

**Training goal:** extending `ExpVal`, list values, continuation-passing interpreter extension.

>

**Exercise 5.6.** Add a `list` expression whose elements are evaluated in continuation-passing style.

**Training goal:** sequential operand evaluation, list-building continuations, evaluation order.

>

**Exercise 5.7.** Add multideclaration `let` to the continuation-passing interpreter.

**Training goal:** arbitrary binding lists, continuation sequencing, parallel `let`.

>

**Exercise 5.8.** Add multiargument procedures to the continuation-passing interpreter.

**Training goal:** procedure arity, operand list evaluation, `apply-procedure/k`.

>

**Exercise 5.9.** Modify the interpreter to implement `IMPLICIT-REFS`.

**Training goal:** CPS with store, assignment, `set-rhs-cont`.

>

**Exercise 5.10.** Modify the solution to Exercise 5.9 so the environment is not stored in the relevant continuation.

**Training goal:** continuation minimization, saved context analysis, store-aware CPS.

>

**Exercise 5.11.** Add `begin` to the continuation-passing interpreter without placing `value-of` or operand evaluation in control-growing positions.

**Training goal:** sequencing, CPS discipline, effect order.

>

**Exercise 5.12.** Instrument the continuation-passing interpreter to print a trace similar to the chapter’s worked calculation.

**Training goal:** continuation tracing, evaluator instrumentation, control-context visualization.

>

**Exercise 5.13.** Translate `fact` and `fact-iter` into LETREC, run them under the instrumented interpreter, and identify the continuation around the inner factorial call.

**Training goal:** recursive vs iterative control, trace interpretation, continuation structure.

>

**Exercise 5.14.** Modify instrumentation to record only the largest continuation size during evaluation, then compare `fact` and `fact-iter`.

**Training goal:** continuation-size measurement, recursive/iterative control behavior.

>

**Exercise 5.15.** Represent continuations as lists of frames, with `end-cont` as the empty list.

**Training goal:** continuation-as-stack, frame representation, data-structure continuation.

>

**Exercise 5.16.** Extend the continuation-passing interpreter to the statement-oriented language from Exercise 4.22.

**Training goal:** CPS for statements, store-transforming computation, sequencing.

>

**Exercise 5.17.** Modify the continuation-passing or trampolined interpreter as specified in the text and determine whether the contracts must change.

**Training goal:** contract discipline, representation change, continuation/trampoline interface.

>

**Exercise 5.18.** Replace the procedural representation of `Bounce` in the trampoline system with a data-structure representation.

**Training goal:** trampoline representation, `Bounce` datatype, host-stack avoidance.

>

**Exercise 5.19.** Place the bounce wrapper around `apply-cont` rather than `apply-procedure/k`, adjust contracts, and then use a data-structure representation of bounces.

**Training goal:** bounce placement, contract redesign, trampoline mechanics.

>

**Exercise 5.20.** Optimize the bounce representation by taking advantage of the final `apply-cont (end-cont) val` pattern.

**Training goal:** trampoline optimization, final-answer path, representation specialization.

>

**Exercise 5.21.** Implement a trampolining interpreter in an ordinary procedural language using data-structure snapshots and a loop.

**Training goal:** implementation-language portability, while-loop trampoline, control representation.

>

**Exercise 5.22.** Analyze whether trampolining can help transcribe the Chapter 3 environment-passing interpreters into an ordinary procedural language.

**Training goal:** limits of trampolining, host-language call stack, interpreter translation.

>

**Exercise 5.23.** Carry out one step of the transformation from the CPS interpreter toward the imperative interpreter by identifying which parameters must become registers.

**Training goal:** parameter-to-register transformation, interpreter state, imperative lowering.

>

**Exercise 5.24.** Continue the imperative transformation for one of the evaluator procedures and preserve the same control behavior.

**Training goal:** imperative interpreter construction, register update discipline, tail transfer.

>

**Exercise 5.25.** Complete or analyze the imperative version of continuation application.

**Training goal:** `apply-cont` in register style, global state, continuation dispatch.

>

**Exercise 5.26.** Reformulate the transformed interpreter so that large imperative code blocks can be run through a trampoline.

**Training goal:** imperative trampolining, snapshots, avoiding host stack/goto limits.

>

**Exercise 5.27.** Instrument the imperative interpreter to observe control behavior for recursive factorial.

**Training goal:** imperative evaluator instrumentation, continuation/stack measurement.

>

**Exercise 5.28.** Extend the instrumentation so recursive and iterative control behavior can be compared.

**Training goal:** measurement design, recursive vs iterative processes, control context.

>

**Exercise 5.29.** Apply the imperative transformation to `fact-iter`.

**Training goal:** transformation of iterative procedures, registerized control, tail behavior.

>

**Exercise 5.30.** Modify the imperative interpreter to use dynamic binding and observe that environment and continuation are pushed and popped in parallel.

**Training goal:** dynamic extent, dynamic binding, environment/control relationship.

>

**Exercise 5.31.** Eliminate the remaining `let` expressions in the imperative interpreter by adding global registers.

**Training goal:** register allocation, removing local bindings, imperative translation.

>

**Exercise 5.32.** Minimize the number of global registers used in the preceding exercise.

**Training goal:** register minimization, live-value analysis, imperative interpreter efficiency.

>

**Exercise 5.33.** Translate the imperative interpreter into an imperative language twice: once with zero-argument procedure calls and once with gotos.

**Training goal:** implementation strategy comparison, tail calls vs gotos, performance behavior.

>

**Exercise 5.34.** Translate the interpreter into an imperative language using trampolining to avoid stack and compiler-size problems.

**Training goal:** trampolined imperative interpreter, portability, control transfer engineering.

>

**Exercise 5.35.** Extend the exception-handling interpreter or its examples so that exception propagation can be traced through nested handlers.

**Training goal:** handler search, continuation inspection, nested exception behavior.

>

**Exercise 5.36.** Modify the exception interpreter to use two continuations instead of one.

**Training goal:** normal continuation vs handler continuation, exception control design.

>

**Exercise 5.37.** Raise an exception when a procedure is called with the wrong number of arguments.

**Training goal:** arity checking, exception signaling, procedure application errors.

>

**Exercise 5.38.** Add division and raise an exception on division by zero.

**Training goal:** primitive operation extension, dynamic error handling, exception raising.

>

**Exercise 5.39.** Modify exception handling so a handler can resume from the point where the exception was raised.

**Training goal:** resumption semantics, saved raise continuation, exception design alternatives.

>

**Exercise 5.40.** Let handlers either return or resume by passing the raise continuation as a second argument.

**Training goal:** continuations as values, resumable exceptions, handler interface design.

>

**Exercise 5.41.** Implement continuations for exceptions procedurally as a pair of observers: one for normal continuation application and one for handler search.

**Training goal:** procedural continuation representation, multiple observers, data abstraction limits.

>

**Exercise 5.42.** Add `letcc` and `throw`, allowing arbitrary continuation capture and invocation.

**Training goal:** first-class continuations, nonlocal transfer, captured control context.

>

**Exercise 5.43.** Modify `letcc` so captured continuations behave like a new kind of procedure.

**Training goal:** continuation/procedure unification, invocation syntax, expressed-value extension.

>

**Exercise 5.44.** Add `call-with-current-continuation` and translate `letcc` / `throw` programs into the language with `call-with-current-continuation`.

**Training goal:** control-operator equivalence, source-to-source translation, continuation abstraction.

>

**Exercise 5.45.** Extend or analyze the threaded interpreter’s `spawn` behavior and scheduler interaction.

**Training goal:** thread creation, ready queue, scheduler continuation.

>

**Exercise 5.46.** Experiment with different time-slice values and observe how scheduling changes the result of effectful threaded programs.

**Training goal:** time slicing, interleaving, shared store behavior.

>

**Exercise 5.47.** Modify the threaded interpreter so thread scheduling or yielding can be controlled explicitly.

**Training goal:** cooperative scheduling, suspension points, control transfer.

>

**Exercise 5.48.** Analyze or repair the unsafe counter example using synchronization.

**Training goal:** race condition, shared store, mutual exclusion.

>

**Exercise 5.49.** Add mutex operations to the threaded language or use the provided mutex interface in a program.

**Training goal:** synchronization primitive, blocked threads, waiting queues.

>

**Exercise 5.50.** Test mutex behavior on programs with competing shared-state updates.

**Training goal:** mutual exclusion testing, scheduler interaction, race prevention.

>

**Exercise 5.51.** Analyze a program where blocked threads and ready threads interact through mutex release.

**Training goal:** wait queue discipline, unblocking, scheduler invariants.

>

**Exercise 5.52.** Modify or extend the scheduler/mutex system and test that ready and waiting queues remain consistent.

**Training goal:** scheduler invariants, synchronization design, thread-state management.

>

**Exercise 5.53.** Add thread identifiers, pass each spawned child its fresh identifier, return the child identifier to the parent, and trace identifier creation.

**Training goal:** thread identity, scheduler instrumentation, ready-queue invariant.

>

**Exercise 5.54.** Add a `kill` facility that removes a thread from the ready queue or waiting queues and reports whether it succeeded.

**Training goal:** thread cancellation, queue search, scheduler mutation.

>

**Exercise 5.55.** Add interthread communication by letting threads send values to other threads and receive messages, blocking if none are available.

**Training goal:** message passing, blocking receive, thread coordination.

>

**Exercise 5.56.** Modify the interpreter so each thread has its own store, then rewrite the example without mutexes.

**Training goal:** per-thread store, shared-state elimination, communication design.

>

**Exercise 5.57.** Implement three synchronization mechanisms from an operating-systems text in this framework.

**Training goal:** synchronization abstraction, OS concepts, interpreter extension.

>

**Exercise 5.58.** Model the “only one person at a time grabs a piece of pizza” problem using synchronization.

**Training goal:** mutual exclusion modeling, informal scenario formalization, concurrency practice.

>

**Cross-chapter recovery questions:**

**1. How will Chapter 5’s explicit continuations become a general source-to-source transformation in Chapter 6?**

**2. How will `continuation` interact with `store` when Chapter 6 uses CPS to model computational effects?**

**3. Which parts of exception handling and captured continuations resemble later type-system or module-system boundaries, where control or access must be made explicit?**

**4. How will thread scheduling and mutexes return conceptually in object-oriented languages where method calls may mutate shared fields?**

**Chapter mastery standards:**

* Able to explain why operand evaluation, not procedure entry itself, grows control context.
* Able to trace a small expression through `value-of/k`, continuation construction, and `apply-cont`.
* Able to distinguish `environment` = data context from `continuation` = control context.
* Able to compare direct-style, CPS, trampolined, and imperative interpreters as different representations of the same semantics.
* Able to explain how exceptions use continuations to abandon ordinary control flow.
* Able to trace `letcc` / `throw` or `call-with-current-continuation` as captured control-context invocation.
* Able to explain how a threaded interpreter packages suspended computations and schedules them with a ready queue and time slice.

### Chapter 6. Continuation-Passing Style

*Chapter 6 generalizes the transformation that Chapter 5 applied to interpreters. Instead of hand-writing one interpreter in continuation-passing form, this chapter studies how ordinary direct-style programs can be systematically converted into `continuation-passing style` (*CPS*). The chapter first develops the idea on familiar procedures such as factorial and Fibonacci, then formalizes the distinction between `tail position` and `operand position`. The later sections turn CPS conversion into a source-to-source translator and show how CPS can model effects such as printing, store updates, implicit references, and nonlocal control.*

**Chapter dependencies:**

* Depends on Chapter 5: explicit `continuation` + `apply-cont` → control context as a program object.

* Generalizes the previous transformation: CPS interpreter → CPS transformation for arbitrary programs.

* Uses the same principle: operand evaluation grows control context; tail calls do not.

* Introduces tail-form analysis: `tail position` ≠ `operand position`.

* Splits the target language: `SimpleExp` + `TfExp` → no procedure calls inside simple expressions.

* Makes translation systematic: direct-style `CPS-IN` → tail-form `CPS-OUT`.

* Extends Chapter 4 effects: printing + store + references → explicit effect sequencing in CPS.

* Prepares Chapter 7 indirectly: CPS is another static program transformation, like later type checking and inference.

**1. What changes when CPS is treated not as an interpreter-writing technique, but as a general transformation for programs?**

>

**2. How does a continuation represent pending work in ordinary programs such as `fact`, `fib`, `removeall`, or `list-sum`?**

>

**3. Why do accumulators often behave like compact representations of continuations?**

>

**4. What does it mean for an expression to be in `tail form`, and why does tail form guarantee that procedure calls do not build control context?**

>

**5. Why does CPS conversion require separating `SimpleExp` from `TfExp` in the target language?**

>

**6. How does the CPS translator decide evaluation order, introduce continuation variables, and name intermediate results?**

>

**7. Why can CPS conversion cause code growth, and which optimizations reduce unnecessary continuation construction?**

>

**8. How does CPS make computational effects such as printing, store operations, implicit references, and nonlocal control explicit?**

>

**Concept comparison table:**

| Concept A              | Concept B                    | Shared point                                    | Key difference                                                                                                              | Role in this chapter                                    | Minimal example                         |
| ---------------------- | ---------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------- |
| `direct style`         | `continuation-passing style` | Both compute the same result                    | Direct style returns to an implicit context; CPS sends the result to an explicit continuation                               | Main transformation of the chapter                      | `fact` → `fact/k`                       |
| `continuation`         | `accumulator`                | Both may carry deferred information             | A continuation represents arbitrary pending control; an accumulator is a compact value-specific representation              | Explains why many optimizations work                    | factorial accumulator                   |
| `tail position`        | `operand position`           | Both are syntactic positions inside expressions | Tail position returns its value as the whole expression; operand position must save surrounding work                        | Basis of tail-form analysis                             | recursive call in `fact` vs `fact-iter` |
| `tail form`            | ordinary direct form         | Both are program forms                          | Tail form guarantees all calls occur in tail position; ordinary form may hide operand calls                                 | Defines the target discipline                           | CPS-OUT expressions                     |
| `SimpleExp`            | `TfExp`                      | Both belong to CPS-OUT                          | `SimpleExp` contains no procedure calls; `TfExp` is guaranteed to be in tail form                                           | Prevents hidden control growth                          | `cps-var-exp` vs `cps-call-exp`         |
| `CPS-IN`               | `CPS-OUT`                    | Both describe expression languages              | CPS-IN is the source language; CPS-OUT enforces CPS/tail-form structure                                                     | Makes transformation target precise                     | input `letrec` → cps output             |
| `cps-of-exp`           | `cps-of-simple-exp`          | Both belong to the translator                   | `cps-of-exp` may generate tail-form code; `cps-of-simple-exp` translates expressions that need no continuation construction | Separates effectful and non-effectful translation cases | constants, variables, procedures        |
| `cps-of-exps`          | `cps-of-call-exp`            | Both control evaluation of subexpressions       | `cps-of-exps` sequences operand evaluation; `cps-of-call-exp` builds the final CPS call                                     | Makes evaluation order explicit                         | rator/rand translation                  |
| `sequentialization`    | CPS conversion               | Both name intermediate results                  | Sequentialization fixes order and names values; CPS also makes control explicit                                             | Explains ANF comparison                                 | CPS vs ANF                              |
| `ANF`                  | CPS                          | Both expose evaluation order                    | ANF names intermediate results with `let`; CPS names the rest of computation with continuations                             | Alternative source-to-source discipline                 | `fib/anf` vs `fib/k`                    |
| `effectful expression` | simple expression            | Both may return values                          | Effectful expressions must remain in tail-form sequencing; simple expressions are assumed effect-free                       | Governs printing and store translation                  | `print` / `setref` vs variable          |

**Program tracing table:**

| Tracing object                | What to trace                                                                                | Common mistake                                                                           |
| ----------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `fact/k`                      | How each recursive step builds `fact1-cont` and how `apply-cont` consumes it                 | Treating the continuation as an ordinary extra result rather than pending multiplication |
| Procedural continuations      | How the continuation’s behavior is represented by a procedure                                | Forgetting that `apply-cont` becomes procedure application                               |
| Inlined continuations         | Which continuation builders disappear after inlining                                         | Thinking inlining changes the program’s meaning                                          |
| `fib/k` proof obligation      | Show `(fib/k n g) = (g (fib n))`                                                             | Proving only for `end-cont` instead of arbitrary `g`                                     |
| Accumulator optimization      | How a pending continuation chain becomes a compact accumulator                               | Assuming every continuation can always be compressed this way                            |
| Tail-form classification      | Mark tail positions and operand positions before translating                                 | Calling a subexpression “tail” because it is visually last                               |
| CPS-OUT interpreter           | `TfExp` evaluation passes the same continuation unchanged                                    | Expecting new continuations to be created inside tail-form code                          |
| `cps-of-exp`                  | Source expression + continuation expression → tail-form target expression                    | Losing track of whether the input is simple or nonsimple                                 |
| `cps-of-exps`                 | Operand list → chosen order → fresh variables → builder call                                 | Forgetting that evaluation order is chosen by the translator                             |
| `if` translation              | Continuation copied into both branches unless optimized                                      | Missing exponential code growth from nested conditionals                                 |
| `let` translation             | RHS translated under a continuation that binds the result before body translation            | Generating a useless intermediate `let`                                                  |
| `print` in CPS                | Print argument is evaluated, printing is sequenced, continuation receives chosen result      | Treating `print` as simple because it returns a number                                   |
| Explicit references in CPS    | Allocation, dereference, and assignment become ordered target operations                     | Treating store operations as ordinary simple expressions                                 |
| `letcc` / `throw` translation | `letcc` binds current continuation; `throw` ignores current continuation and invokes another | Accidentally returning to the immediate continuation of `throw`                          |

>

**Abstraction barrier record:**

| Abstraction layer      | Exposed interface                                                      | Hidden representation                                              | What upper code depends on                                 | What should not change if representation changes                            |
| ---------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------- | --------------------------------------------------------------------------- |
| Continuation layer     | `end-cont`, continuation builders, `apply-cont`                        | data-structure, procedural, or inlined representation              | pending control can be applied to a value                  | CPS program behavior should not depend on representation style              |
| Tail-form layer        | `tail position`, `operand position`, `tail-form?`                      | syntactic analysis rules                                           | calls in tail form do not grow control context             | classifier implementation can change without changing the language property |
| CPS-IN layer           | input grammar and source AST variants                                  | direct-style expression representation                             | translator receives ordinary source programs               | target generation should not depend on concrete syntax                      |
| CPS-OUT layer          | `SimpleExp`, `TfExp`, cps constructors                                 | target AST representation                                          | target programs are tail-form by construction              | interpreter and pretty-printer should not inspect raw list layout           |
| CPS translator layer   | `cps-of-program`, `cps-of-exp`, `cps-of-simple-exp`, `cps-of-exps`     | fresh-name generation, builder functions, continuation expressions | source programs can be translated into tail-form programs  | later optimizations should preserve target meaning                          |
| Optimization layer     | `make-send-to-cont`, substitution, continuation sharing                | local rewriting rules                                              | generated code can be simplified without changing behavior | semantic equivalence should not depend on variable names                    |
| Effect-modeling layer  | `printk`, explicit-reference target forms, translated store operations | sequencing choices and target effect representation                | effects occur in chosen order                              | source-level meaning should remain stable under representation changes      |
| Nonlocal-control layer | `letcc`, `throw`, success/error continuations                          | continuation arguments and translation conventions                 | nonlocal transfer is encoded through CPS                   | surface syntax can vary without changing control semantics                  |

**Error prediction:**

**1. The reader may mistake CPS for adding an extra argument mechanically, but this chapter needs to distinguish syntactic rewriting from control-context representation.**

>

**2. The reader may remember that calls in tail position are safe, while missing that operand evaluation is what forces control context to grow.**

>

**3. The reader may classify `proc` bodies as simple merely because `proc` expressions return immediately, while the body itself still must be in tail form.**

>

**4. The reader may treat the CPS translator as a pretty-printer, even though it chooses evaluation order, introduces names, and restructures control.**

>

**5. The reader may ignore code growth from duplicated continuations, especially in nested `if` expressions.**

>

**6. The reader may treat effects such as printing or store update as values with side details, while CPS translation must sequence those effects explicitly.**

>

**Learning Tips:** Chapter 6 should be read with two marks on every source expression: `T` for tail position and `O` for operand position. Before writing any CPS output, identify which subexpressions are simple and which require continuation construction. For the translator, trace one expression through `cps-of-exp`, one procedure call through `cps-of-exps`, one conditional through the continuation-duplication problem, and one effectful expression through explicit sequencing. The chapter is less about memorizing CPS syntax than about learning how a source-to-source transformation preserves meaning while changing control behavior.

**Exercise 6.1.** Explain why the trampolined factorial program in Figure 6.2 still works even if some explicit `pc` assignments are removed from `fact/k` and `apply-cont`.

**Training goal:** trampoline control flow, program counter discipline, tail transfer.

>

**Exercise 6.2.** Prove by induction that `(fib/k n g) = (g (fib n))` for any continuation procedure `g`.

**Training goal:** CPS correctness proof, induction, continuation parameter meaning.

>

**Exercise 6.3.** Rewrite several Scheme expressions into continuation-passing style, assuming all unknown functions have already been CPS-transformed.

**Training goal:** manual CPS conversion, operand evaluation order, continuation construction.

>

**Exercise 6.4.** Rewrite several procedures in CPS using data-structure continuations, procedural continuations, inlined procedural continuations, and registerized versions.

**Training goal:** continuation representation comparison, registerization, tail-recursive testing.

>

**Exercise 6.5.** Rewrite the previous CPS examples so that procedure calls are evaluated from right to left.

**Training goal:** evaluation-order control, CPS sequencing, operand scheduling.

>

**Exercise 6.6.** Count the possible evaluation orders for calls inside a compound expression and write CPS versions for each order.

**Training goal:** evaluation-order enumeration, CPS flexibility, sequencing discipline.

>

**Exercise 6.7.** Write the procedural and inlined continuation representations for the continuation-passing interpreter from Chapter 5.

**Training goal:** procedural continuations, inlining, interpreter transformation.

>

**Exercise 6.8.** Rewrite the exception interpreter using procedural and inlined continuations, accounting for both `apply-cont` and `apply-handler`.

**Training goal:** multiple continuation observers, exception control, representation adaptation.

>

**Exercise 6.9.** Explain what property of multiplication allows the factorial continuation chain to be optimized into an accumulator.

**Training goal:** continuation compression, algebraic property, accumulator optimization.

>

**Exercise 6.10.** For `list-sum`, formulate a succinct representation of continuations analogous to the optimized representation for factorial.

**Training goal:** compact continuation representation, list recursion, accumulator-like design.

>

**Exercise 6.11.** Complete the CPS-OUT interpreter by writing `value-of-simple-exp`.

**Training goal:** simple-expression evaluation, CPS-OUT interpreter, call-free expression semantics.

>

**Exercise 6.12.** Determine whether each listed CPS-IN expression is simple.

**Training goal:** `SimpleExp` classification, procedure-call detection, grammar discipline.

>

**Exercise 6.13.** Translate several CPS-IN programs into continuation-passing style and test the transformed programs with the CPS-OUT interpreter.

**Training goal:** full-program CPS conversion, semantic preservation, CPS-OUT testing.

>

**Exercise 6.14.** Complete the CPS-OUT interpreter by supplying `value-of-program` and `apply-cont`.

**Training goal:** interpreter completion, final answer handling, continuation application.

>

**Exercise 6.15.** Remove the `cont` argument from the CPS-OUT interpreter after observing that it has only one possible value.

**Training goal:** continuation elimination, tail-form interpreter simplification.

>

**Exercise 6.16.** Registerize the CPS-OUT interpreter.

**Training goal:** interpreter lowering, registerization, tail-form execution.

>

**Exercise 6.17.** Trampoline the CPS-OUT interpreter.

**Training goal:** trampoline transformation, host-stack independence, tail-form runtime.

>

**Exercise 6.18.** Modify CPS-OUT so that simple `diff` and `zero?` expressions take only constants or variables, making `value-of-simple-exp` nonrecursive.

**Training goal:** target-language restriction, nonrecursive simple evaluation, grammar refinement.

>

**Exercise 6.19.** Write `tail-form?`, a procedure that determines whether a CPS-IN program is in tail form according to the CPS-OUT grammar.

**Training goal:** static tail-form analysis, syntax traversal, grammar-based classification.

>

**Exercise 6.20.** Modify `cps-of-exps` so subexpressions are evaluated from right to left.

**Training goal:** translator evaluation order, operand sequencing, CPS generation.

>

**Exercise 6.21.** Modify `cps-of-call-exp` so operands are evaluated left to right before the operator.

**Training goal:** call translation, rator/rand sequencing, explicit evaluation order.

>

**Exercise 6.22.** Improve `make-send-to-cont` so that applying a continuation that is already a `proc` expression generates direct substituted code rather than an unnecessary call.

**Training goal:** continuation-call simplification, beta-like optimization, generated-code quality.

>

**Exercise 6.23.** Show how nested `if` expressions can cause exponential code growth by duplicating continuations, then avoid it by binding the continuation to a fresh variable.

**Training goal:** code-size analysis, continuation sharing, conditional translation optimization.

>

**Exercise 6.24.** Add lists to CPS-IN and CPS-OUT, remembering that arguments to `list` are not in tail position.

**Training goal:** language extension, list-valued expressions, operand-position translation.

>

**Exercise 6.25.** Extend CPS-IN so that `let` can declare an arbitrary number of variables.

**Training goal:** multideclaration binding, CPS translator extension, parallel binding.

>

**Exercise 6.26.** Optimize continuation-variable introduction by substituting a simple expression for a variable that occurs only once.

**Training goal:** one-use variable elimination, substitution, generated-code simplification.

>

**Exercise 6.27.** Modify `cps-of-let-exp` to avoid generating a useless `let` expression by reusing the `let` variable as the continuation variable.

**Training goal:** let-translation optimization, continuation-variable reuse, administrative redex reduction.

>

**Exercise 6.28.** Consider what would result from applying a Scheme CPS transformer to the first interpreter from Chapter 3.

**Training goal:** conceptual CPS transfer, interpreter transformation, meta-level reasoning.

>

**Exercise 6.29.** Analyze the provided variant of `cps-of-exps` that accumulates simple expressions and reverses them before calling the builder.

**Training goal:** operand-list translation, accumulator order, translator equivalence.

>

**Exercise 6.30.** Simplify single-expression calls to `cps-of-exps` by using `cps-of-exp/ctx`, and remove unnecessary uses of `cps-of-exps` except where still needed.

**Training goal:** translator refactoring, contextual CPS translation, simplification.

>

**Exercise 6.31.** Write a translator from CPS output to an equivalent program where all continuations are represented by data structures.

**Training goal:** continuation representation translation, defunctionalization, data-structure continuations.

>

**Exercise 6.32.** Extend the preceding translator so that all procedures, not only continuations, are represented by data structures.

**Training goal:** procedure defunctionalization, representation transformation, runtime dispatch design.

>

**Exercise 6.33.** Translate the data-structured program from Exercise 6.32 into a register program like the registerized factorial example.

**Training goal:** registerization, source-to-source lowering, machine-like control.

>

**Exercise 6.34.** Retarget `cps-of-exp` so that it generates A-normal form instead of CPS, compare the result with `fib/anf`, and test behavior on already-ANF programs.

**Training goal:** ANF transformation, sequentialization, CPS vs ANF comparison.

>

**Exercise 6.35.** Verify that with the Exercise 6.27 optimization installed, CPS-transforming ANF output gives the same result as CPS-transforming the original program.

**Training goal:** transformation composition, optimization validation, ANF/CPS relationship.

>

**Exercise 6.36.** Add a `begin` expression to CPS-IN without adding anything to CPS-OUT.

**Training goal:** sequencing translation, derived effect ordering, CPS-IN extension.

>

**Exercise 6.37.** Add implicit references to CPS-IN while translating into CPS-OUT with explicit references, inserting allocation and dereference operations where necessary.

**Training goal:** implicit-reference translation, store effects, variable simplicity failure.

>

**Exercise 6.38.** Treat variables that never occur on the left-hand side of `set` as immutable and therefore simple.

**Training goal:** mutability analysis, simple-expression recovery, effect-aware optimization.

>

**Exercise 6.39.** Implement `letcc` and `throw` in the CPS translator.

**Training goal:** nonlocal control translation, continuation capture, current-continuation manipulation.

>

**Exercise 6.40.** Implement `try/catch` and `throw` from Chapter 5 in the CPS translator by using success and error continuations.

**Training goal:** exception translation, dual continuations, nonlocal control modeling.

>

**Cross-chapter recovery questions:**

**1. How does Chapter 6’s source-to-source CPS transformation reframe the continuation-passing interpreter of Chapter 5 as one instance of a general program transformation?**

**2. How will the distinction between static analysis and runtime behavior return in Chapter 7’s type checker and type inference algorithm?**

**3. How will CPS’s treatment of effects clarify later module and object designs, where boundaries must preserve behavior while changing representation?**

**4. Which parts of CPS conversion resemble compiler work: choosing evaluation order, naming intermediate values, eliminating administrative redexes, and lowering procedures into data or registers?**

**Chapter mastery standards:**

* Able to rewrite a small direct-style procedure into CPS by hand.
* Able to distinguish `tail position` from `operand position` in a CPS-IN expression.
* Able to explain why a tail-form program does not build control context through procedure calls.
* Able to classify expressions as `SimpleExp` or `TfExp` under the CPS-OUT grammar.
* Able to trace a call to `cps-of-exp` through continuation construction and generated target code.
* Able to explain how CPS fixes evaluation order and names intermediate results.
* Able to describe how CPS models printing, store operations, implicit references, and nonlocal control.

### Chapter 7. Types

*Chapter 7 shifts from running programs to analyzing them before they run. Earlier chapters used interpreters to describe what expressions do at runtime; this chapter asks how much of that behavior can be predicted statically by assigning types to expressions. The chapter begins with values and their possible types, then turns those ideas into `type-of`, a checker for the typed language `CHECKED`. The final section removes many explicit annotations and builds `INFERRED`, where type equations, substitutions, unification, fresh type variables, and the occurrence check make type inference executable.*

**Chapter dependencies:**

* Depends on Chapter 3: `expression` + `environment` → runtime value; now `expression` + `type environment` → static type.

* Depends on Chapter 4: `ExpVal` / `DenVal` distinctions return when references and mutable structures get types.

* Depends on Chapter 6 conceptually: program analysis/transformation before execution → static reasoning over syntax.

* Introduces `type environment`: `Var → Type`, parallel to the runtime environment but used before evaluation.

* `CHECKED` adds annotations: explicit type declarations + `type-of` → static rejection of type errors.

* `INFERRED` removes annotations: optional types + fresh type variables + equations → inferred types.

* Unification solves constraints: type equations + substitution + occurrence check → consistent type assignment.

* Prepares Chapter 8 and Chapter 9: module interfaces and typed object-oriented languages rely on type environments and type checking.

**1. What does it mean for a value to have a type, and why can some values have many types or no type expressible in the type language?**

>

**2. Why does static type analysis need a `type environment`, and how is it related to—but different from—the runtime environment of Chapter 3?**

>

**3. How does `type-of` assign a type to an expression by following the same grammar-directed discipline as the earlier interpreters?**

>

**4. Why does `CHECKED` require type annotations on procedure parameters and recursive procedure results?**

>

**5. How do procedure types control both procedure creation and procedure application?**

>

**6. How does the checker extend when the language adds pairs, lists, references, mutable pairs, assignment, and multiargument procedures?**

>

**7. What changes when types become optional in `INFERRED`, and why does type inference require generating and solving equations?**

>

**8. Why are substitutions, unification, fresh type variables, canonical renaming, and the occurrence check necessary for a reliable inferencer?**

>

**Concept comparison table:**

| Concept A             | Concept B                           | Shared point                                       | Key difference                                                                                         | Role in this chapter                            | Minimal example                        |
| --------------------- | ----------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------- | -------------------------------------- |
| `ExpVal`              | `Type`                              | Both classify expression results                   | `ExpVal` is a runtime value domain; `Type` is a static description of possible values                  | Connects runtime semantics to static analysis   | `num-val` has type `int`               |
| `runtime environment` | `type environment`                  | Both map variables to information                  | Runtime environment maps variables to denoted values; type environment maps variables to types         | Main static counterpart to earlier interpreters | `apply-env` vs `apply-tenv`            |
| `well-typed`          | `ill-typed`                         | Both describe expressions under a type environment | Well-typed expressions receive a type; ill-typed expressions violate type rules                        | The checker’s central judgment                  | `-(3,4)` vs `-(zero?(3),4)`            |
| `type checker`        | `interpreter`                       | Both traverse abstract syntax                      | Interpreter computes values; checker computes or validates types                                       | Converts semantic rules into static analysis    | `value-of` vs `type-of`                |
| `dynamic error`       | `type error`                        | Both are program failures                          | Type errors are rejected statically when the checker succeeds; other errors may still occur at runtime | Defines the guarantee of `type-of`              | wrong argument type vs nontermination  |
| `CHECKED`             | `INFERRED`                          | Both statically assign types                       | `CHECKED` relies on explicit annotations; `INFERRED` recovers omitted types using constraints          | Two designs for typed languages                 | `proc (x : int)` vs `proc (x : ?) ...` |
| `declared type`       | `inferred type`                     | Both describe expressions or variables             | Declared type is supplied by the programmer; inferred type is solved by the system                     | Separates checking from inference               | letrec result type                     |
| `optional type`       | `unknown type`                      | Both appear in inference syntax                    | Optional type is surface syntax; unknown type is represented internally by a fresh type variable       | Bridges annotated and inferred forms            | `?` → `tvar-type`                      |
| `type equation`       | `substitution`                      | Both are part of inference                         | Equation states a required equality; substitution records a solution for type variables                | Core inference machinery                        | `trator = trand → tresult`             |
| `unification`         | equality checking                   | Both compare types                                 | Equality checking only tests same known types; unification solves equations involving variables        | Makes inference possible                        | unify `t` with `int`                   |
| `occurrence check`    | ordinary unification step           | Both constrain substitution                        | Occurrence check prevents infinite types such as `t = t → int`                                         | Protects sound inference                        | self-application                       |
| `canonical renaming`  | exact type-variable name comparison | Both compare inferred types                        | Canonical renaming ignores irrelevant generated variable names                                         | Supports stable testing of inferred answers     | `ty1 -> ty1` ≈ `ty7 -> ty7`            |

**Program tracing table:**

| Tracing object               | What to trace                                                                              | Common mistake                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `type-of` for constants      | Expression variant → static type `int`                                                     | Confusing runtime `num-val` with static `int-type`                                |
| `type-of` for variables      | Variable → `apply-tenv` → declared or inferred type                                        | Looking in the runtime environment instead of the type environment                |
| `diff-exp` checking          | Both operands must check as `int`; result type is `int`                                    | Returning `int` before checking both operands                                     |
| `zero?-exp` checking         | Operand must check as `int`; result type is `bool`                                         | Treating the predicate result as a host Scheme boolean                            |
| `if-exp` checking            | Test must be `bool`; both branches must have the same type                                 | Checking only the selected branch as an interpreter would                         |
| `proc-exp` in CHECKED        | Annotated parameter type extends `tenv`; body type gives result type                       | Forgetting that procedure body is checked, not evaluated                          |
| `call-exp` checking          | Rator type must be `arg-type → result-type`; rand type must match `arg-type`               | Treating any procedure-shaped expression as callable without checking the operand |
| `letrec-exp` checking        | Procedure name enters `tenv` with declared procedure type before checking its body         | Checking recursive body before the recursive binding exists                       |
| Pair and unpair checking     | Pair expression produces `pairof t1 * t2`; unpair extends `tenv` with both component types | Confusing pair types with list types                                              |
| Reference checking           | `newref` creates `refto t`; `deref` extracts `t`; `setref` returns `void`                  | Treating references as if they were values of the referenced type                 |
| Type inference for variables | Missing annotation → fresh type variable                                                   | Reusing the same unknown for unrelated missing annotations                        |
| Type inference for calls     | Rator type unified with `rand-type → fresh-result-type`                                    | Guessing a result type instead of generating a constraint                         |
| Substitution application     | Every type equation is solved under the current substitution                               | Failing to update old equations after a new substitution                          |
| Occurrence check             | Reject substitutions where a variable occurs inside its own solution                       | Allowing infinite types in self-application                                       |
| Canonical comparison         | Rename generated variables before comparing inferred type output                           | Treating `ty1` vs `ty7` as a meaningful difference                                |

>

**Abstraction barrier record:**

| Abstraction layer       | Exposed interface                                                                                          | Hidden representation                                   | What upper code depends on                             | What should not change if representation changes                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------- |
| Type layer              | `int-type`, `bool-type`, `proc-type`, later `pair-type`, `list-type`, `ref-type`, `void-type`, `tvar-type` | datatype representation of type variants                | types can be constructed, inspected, compared, printed | checker logic should not depend on raw type layout                     |
| Type-environment layer  | `empty-tenv`, `extend-tenv`, `apply-tenv`, `init-tenv`                                                     | association list, datatype, or procedure representation | variables have statically assigned types               | `type-of` should not inspect type-environment storage                  |
| CHECKED checker layer   | `type-of-program`, `type-of`, `check-equal-type!`                                                          | syntax dispatch and error-reporting strategy            | expressions are accepted or rejected by type rules     | user language behavior should not depend on checker internals          |
| Annotation layer        | parameter annotations, result annotations, `Type` grammar                                                  | parser representation of declared types                 | checker receives explicit programmer intent            | internal type representation can change without changing source syntax |
| Inference unknown layer | `Optional-type`, `otype->type`, fresh type variables                                                       | generated symbols and counters                          | missing annotations become solvable unknowns           | inference result should not depend on specific generated names         |
| Substitution layer      | `empty-subst`, `extend-subst`, `apply-subst-to-type`                                                       | association list of type-variable bindings              | solved type variables are consistently replaced        | unifier should not depend on substitution storage shape                |
| Unification layer       | `unifier`, occurrence check, no-occurrence invariant                                                       | recursive comparison and substitution update            | type equations can be solved or rejected               | inference clauses should not duplicate unification logic               |
| External-form layer     | `type-to-external-form`, `equal-up-to-gensyms?`                                                            | canonical renaming table                                | types can be displayed and tested readably             | tests should not depend on fresh-name choices                          |

**Error prediction:**

**1. The reader may mistake a runtime value for its type, but this chapter needs to distinguish values computed by an interpreter from types predicted by a checker.**

>

**2. The reader may remember the `type-of` clauses while missing that each clause is a static counterpart of an earlier semantic rule.**

>

**3. The reader may trace `if` checking as if only one branch mattered, even though a static checker must check both branches because it does not run the program.**

>

**4. The reader may think `CHECKED` and `INFERRED` differ only in syntax, while the inferencer needs a new constraint-solving engine.**

>

**5. The reader may treat `?` as a wildcard that can mean anything at every use, but each missing type becomes a particular unknown that must be solved consistently.**

>

**6. The reader may ignore the occurrence check, but without it unification can accept impossible infinite types.**

>

**Learning Tips:** Chapter 7 should be read by writing type derivations beside the checker. For each expression, trace both the earlier runtime story and the new static story: `value-of` produces an `ExpVal`, while `type-of` predicts a `Type`. In the inference section, do not jump directly to the final type; write the generated equations, apply substitutions step by step, and check whether any unknown occurs inside its proposed solution. The most useful small traces are a conditional, a procedure call, a recursive procedure, a pair or list extension, and a self-application expression that fails the occurrence check.

**Exercise 7.1.** For each listed closed expression, consider the value it denotes and determine what type or types that value has, noting cases where no type is expressible in the language.

**Training goal:** value typing, procedure types, polymorphic-looking values, untypable values.

>

**Exercise 7.2.** Determine whether any expressed values have exactly two types under the chapter’s definition of value typing.

**Training goal:** semantic definition of type, multiple type membership, type-language limits.

>

**Exercise 7.3.** Decide whether it is decidable, for LETREC, whether an expressed value has a given type.

**Training goal:** decidability, runtime values, type membership.

>

**Exercise 7.4.** Use the typing rules to assign at least two types to each of the given terms, and decide whether the values of the expressions have the same types.

**Training goal:** type rules, multiple assignable types, expression typing vs value typing.

>

**Exercise 7.5.** Extend the checker to handle multiple `let` declarations, multiargument procedures, and multiple `letrec` declarations, adding procedure types of the form `(t1 * t2 * ... * tn -> t)`.

**Training goal:** type checker extension, multiargument procedure types, multiple recursive bindings.

>

**Exercise 7.6.** Extend the checker to handle assignments from the stateful language.

**Training goal:** assignment typing, store-related language extension, static checking for mutation.

>

**Exercise 7.7.** Change `if-exp` checking so that if the test expression is not boolean, the branches are not checked; give an expression that behaves differently under the new checker.

**Training goal:** error-order design, conditional checking, checker behavior comparison.

>

**Exercise 7.8.** Add `pairof` types, `newpair`, and `unpair`, and implement the corresponding typing rules and external type display.

**Training goal:** product types, pair construction, destructuring, type-environment extension.

>

**Exercise 7.9.** Add `listof` types and list operations including `list`, `cons`, `null?`, `emptylist_Type`, `car`, and `cdr`, while explaining why non-emptiness cannot reasonably be guaranteed by these rules.

**Training goal:** homogeneous list typing, parametric empty lists, list operation rules.

>

**Exercise 7.10.** Extend the checker to handle `EXPLICIT-REFS`, adding `refto t` and `void`, and write rules for `newref`, `deref`, and `setref`.

**Training goal:** reference types, void type, store operation typing.

>

**Exercise 7.11.** Extend the checker to handle `MUTABLE-PAIRS`.

**Training goal:** mutable aggregate typing, pair mutation, static checking with store effects.

>

**Exercise 7.12.** Using the inference methods of the chapter, derive types for the expressions from Exercise 7.1 or determine that no such type exists, assuming missing type annotations for bound variables.

**Training goal:** type inference by equations, untypability detection, relation to value typing.

>

**Exercise 7.13.** Write an inference rule for `let`, then infer or reject the types of several given `let` expressions.

**Training goal:** let-inference rule, type environment extension, constraint generation.

>

**Exercise 7.14.** Analyze the given nested `letrec` expression involving `even` and `odd` and identify the type error.

**Training goal:** recursive type constraints, higher-order recursion, error localization.

>

**Exercise 7.15.** Write an inference rule for `letrec`, including multiple declarations, then infer or reject the types of several recursive examples.

**Training goal:** letrec inference, mutual recursion, recursive constraint solving.

>

**Exercise 7.16.** Modify the grammar of `INFERRED` so that missing types are omitted rather than marked with `?`.

**Training goal:** optional syntax design, parser changes, inference surface language.

>

**Exercise 7.17.** Implement or complete substitution operations needed by the inferencer and test that substitutions are applied consistently to types.

**Training goal:** substitution representation, type-variable replacement, inference infrastructure.

>

**Exercise 7.18.** Extend or test the unification algorithm on representative type equations, including equations that should fail.

**Training goal:** unification, mismatch detection, occurrence check.

>

**Exercise 7.19.** Analyze or implement the no-occurrence invariant maintained by substitutions during unification.

**Training goal:** occurrence check, invariant preservation, infinite-type prevention.

>

**Exercise 7.20.** Complete the inferencer clauses for one or more expression forms by generating constraints and threading substitutions.

**Training goal:** `type-of` for `INFERRED`, substitution threading, constraint solving.

>

**Exercise 7.21.** Test inferred types up to renaming of generated type variables.

**Training goal:** canonical type-variable renaming, testing inferred types, alpha-like equivalence.

>

**Exercise 7.22.** Extend the inferencer with an additional language form from earlier chapters and specify the generated constraints.

**Training goal:** inferencer extension, constraint design, language-feature migration.

>

**Exercise 7.23.** Extend the inferencer to handle pair types, as in Exercise 7.8.

**Training goal:** inferred product types, pair/unpair constraints, type-variable propagation.

>

**Exercise 7.24.** Extend the inferencer to handle multiple `let` declarations, multiargument procedures, and multiple `letrec` declarations.

**Training goal:** multi-binding inference, multiargument procedure types, mutual recursion constraints.

>

**Exercise 7.25.** Extend the inferencer to handle `listof` types, using `emptylist` without an explicit type parameter by creating a fresh type variable where needed.

**Training goal:** inferred list types, unknown element type, polymorphic empty-list behavior.

>

**Cross-chapter recovery questions:**

**1. How will the `type environment` introduced here become part of the module checker in Chapter 8?**

**2. How will Chapter 7’s distinction between checked annotations and inferred constraints reappear when modules declare interfaces but hide implementations?**

**3. Which parts of the `CHECKED` type system will need to be extended when Chapter 9 introduces objects, classes, inheritance, interfaces, abstract methods, and casts?**

**4. How will type inference’s unification machinery relate to later questions about subtype checking and method dispatch, where equality of types is no longer enough?**

**Chapter mastery standards:**

* Able to distinguish runtime `ExpVal` from static `Type`.
* Able to trace `type-of` for constants, variables, arithmetic, predicates, conditionals, `let`, procedures, calls, and `letrec`.
* Able to explain how `type environment` ≠ runtime environment.
* Able to state why `CHECKED` needs procedure parameter annotations and recursive result annotations.
* Able to extend the checker with a new type constructor such as `pairof`, `listof`, or `refto`.
* Able to generate type equations for a small `INFERRED` program.
* Able to solve simple type equations with substitutions and reject an equation using the occurrence check.

### Chapter 8. Modules

*Chapter 8 moves from expression-level typing to program-structure typing. Earlier chapters checked individual expressions under a `type environment`; this chapter asks how large programs can expose only selected names, hide implementation details, and enforce abstraction boundaries across separately written components. The first module system exports values through simple interfaces, the second adds type declarations with `transparent` and `opaque` types, and the third introduces module procedures for reusable parameterized modules. The semantic work now happens in two linked spaces: runtime environments for exported values and static type environments for exported interfaces.*

**Chapter dependencies:**

* Depends on Chapter 2: `interface` + `implementation` → abstraction boundary.

* Depends on Chapter 3: `environment` + qualified lookup → module values can be stored and retrieved.

* Depends on Chapter 7: `type environment` + `type checking` → module interfaces can be checked statically.

* Introduces module-level scope: module name + exported name → `qualified variable`.

* Simple modules expose values: `interface` + `body` → exported bindings.

* Opaque modules expose types without exposing representation: `opaque t` ≠ `transparent t = ty`.

* Module procedures add reuse: module parameter + module body → parameterized module.

* Prepares Chapter 9: interfaces and abstraction boundaries return in typed object-oriented languages.

**1. Why does a programming language need modules after it already has `let`, procedures, and lexical scope?**

>

**2. How does a simple module separate public names from private implementation names?**

>

**3. Why does a module require both runtime interpretation and static checking?**

>

**4. How does `from m take x` change ordinary variable lookup into qualified lookup?**

>

**5. What does it mean for one interface to satisfy another interface, and why is this relation not just equality?**

>

**6. Why do modules that declare types require `opaque` and `transparent` type declarations?**

>

**7. How do qualified types such as `from ints take t` prevent clients from mixing values from different hidden representations?**

>

**8. Why are module procedures needed, and how are they similar to—but different from—ordinary procedures?**

>

**Concept comparison table:**

| Concept A             | Concept B                  | Shared point                      | Key difference                                                                                           | Role in this chapter                             | Minimal example                               |
| --------------------- | -------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------- |
| `module`              | `environment`              | Both collect bindings             | An environment is a semantic context; a module is a named component with an interface and implementation | Basic runtime structure of modules               | `m1` contains exported bindings               |
| `interface`           | `module body`              | Both describe a module            | Interface declares what is public; body computes or defines the implementation                           | Main abstraction boundary                        | `[a : int]` vs `[a = 33 x = 32]`              |
| exported binding      | private binding            | Both may exist in a module body   | Exported bindings appear in the interface; private bindings are local to implementation                  | Enforces information hiding                      | `a` exported, `x` hidden                      |
| qualified variable    | ordinary variable          | Both refer to values              | Ordinary variables are looked up directly; qualified variables first look up a module, then a component  | Extends variable lookup                          | `from m1 take a`                              |
| actual interface      | expected interface         | Both are interfaces               | Actual interface is produced by a module body; expected interface is declared by the programmer          | Checker compares them with `<:-iface`            | body exports more than interface requires     |
| interface equality    | interface satisfaction     | Both compare interfaces           | Equality requires exact match; satisfaction allows extra declarations and controlled abstraction hiding  | Makes modules usable with richer implementations | `[a:int b:int]` satisfies `[a:int]`           |
| `transparent type`    | `opaque type`              | Both are module type declarations | Transparent type exposes its definition; opaque type hides the representation                            | Core of type abstraction                         | `transparent t = int` vs `opaque t`           |
| `qualified type`      | ordinary type              | Both classify values              | Qualified type names a type exported by a module; ordinary type is directly known                        | Prevents representation mixing                   | `from ints1 take t`                           |
| type expansion        | type lookup                | Both use the type environment     | Lookup finds a type name; expansion replaces transparent names by their known definitions                | Needed for interface comparison                  | `t = int` expands to `int`                    |
| module procedure      | ordinary procedure         | Both abstract over an argument    | Ordinary procedure maps values to values; module procedure maps modules to modules                       | Enables reusable module construction             | `module-proc (ints : Iface) ...`              |
| procedure type        | module-procedure interface | Both describe functions           | Procedure type has argument/result types; module-procedure interface has parameter/result interfaces     | Static rule for module application               | `((ints : Iface) => ResultIface)`             |
| hard-coded dependency | parameterized dependency   | Both express module use           | Hard-coded dependency names a fixed module; parameterized dependency accepts a module argument           | Motivation for module procedures                 | `from ints1 take t` vs `(to-int-maker ints1)` |

**Program tracing table:**

| Tracing object                | What to trace                                                                                                    | Common mistake                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Simple module evaluation      | Module definition → module body evaluation → simple module value → environment extension                         | Treating module declarations as ordinary `let` bindings                     |
| `from m take x`               | Look up module `m` → extract its internal bindings → look up `x` inside them                                     | Looking for `x` directly in the outer environment                           |
| `value-of-program`            | Add all module definitions to the environment, then evaluate program body                                        | Evaluating the body before module definitions are installed                 |
| `add-module-defns-to-env`     | Process module definitions in order and extend the environment with module values                                | Exporting every body definition instead of only interface-declared ones     |
| `value-of-module-body`        | Evaluate definitions using let-star-style scoping                                                                | Assuming all definitions are simultaneously in scope                        |
| Module checker                | Add module interfaces to `tenv`, then type-check body expressions                                                | Confusing runtime module environment with type environment                  |
| `<:-iface` for simple modules | Expected declarations must be found in actual interface                                                          | Requiring exact interface equality                                          |
| Opaque type checking          | Actual transparent definition may satisfy an expected opaque declaration                                         | Thinking hidden type representation must be unknown even inside the checker |
| `expand-type`                 | Replace transparent type names through the type environment                                                      | Forgetting to expand before comparing types                                 |
| Qualified type comparison     | `from m1 take t` and `from m2 take t` are distinct unless rules say otherwise                                    | Treating equal component names as equal types                               |
| Module procedure application  | Evaluate module rator → evaluate module argument → extend module environment → produce result module             | Treating module procedures as value-level procedures                        |
| `proc-iface` comparison       | Compare parameter interfaces contravariantly and result interfaces covariantly after renaming bound module names | Comparing parameter names literally                                         |

>

**Abstraction barrier record:**

| Abstraction layer          | Exposed interface                                                                    | Hidden representation                                              | What upper code depends on                                        | What should not change if representation changes                                            |
| -------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Simple-module layer        | module name, interface, exported qualified names                                     | internal body definitions and module-value representation          | clients can access only declared exports                          | client code should not depend on private body bindings                                      |
| Runtime module environment | `extend-env-with-module`, `lookup-module-name-in-env`, `lookup-qualified-var-in-env` | module values and stored environments                              | qualified value lookup works by module/component name             | expression evaluation should not inspect module storage directly                            |
| Module-body layer          | definitions inside module body                                                       | let-star-style evaluation order and local environment construction | declared exports receive values                                   | client modules should not depend on body evaluation details except exported behavior        |
| Type-environment layer     | `extend-tenv-with-module`, interface lookup, type lookup                             | module-name bindings, type-name bindings, expanded types           | checker knows which qualified names and types are in scope        | checker clauses should not depend on type-environment layout                                |
| Interface-comparison layer | `<:-iface`, `<:-decls`, `<:-decl`                                                    | recursive search through declarations and type expansion           | actual module may satisfy expected interface                      | module users should not depend on declaration order when order is not semantically required |
| Opaque-type layer          | `opaque t`, `transparent t = ty`, `from m take t`                                    | representation type and expansion rules                            | clients can use abstract type names without seeing representation | client code should not assume hidden representation                                         |
| Module-procedure layer     | `module-proc`, `proc-iface`, module application                                      | closure-like module value and parameter module environment         | modules can be parameterized by modules                           | clients should not depend on how module procedure environments are represented              |
| Named-interface layer      | interface name used in declarations                                                  | expanded interface definition                                      | repeated interfaces can be shared without rewriting               | module bodies should not depend on textual duplication of interface definitions             |

**Error prediction:**

**1. The reader may mistake modules for records of values, but this chapter needs to distinguish value packaging from checked abstraction boundaries.**

>

**2. The reader may remember `from m take x` as syntax while missing that it changes both runtime lookup and type-environment lookup.**

>

**3. The reader may trace module bodies as if every internal definition were exported, even though the interface controls what clients can see.**

>

**4. The reader may compare interfaces by exact textual equality, but the checker uses a satisfaction relation that permits extra implementation detail.**

>

**5. The reader may treat `opaque` types as mysterious runtime objects, while opacity is a static boundary over an implementation type.**

>

**6. The reader may confuse module procedures with ordinary procedures, but module procedures operate over module values and interfaces rather than expressed values and ordinary types.**

>

**Learning Tips:** Chapter 8 should be read with two environments on paper: a runtime module environment and a type environment containing module interfaces and type declarations. For every example, mark what is exported, what is private, and what type information clients can see. When reading opaque types, test the same implementation through two views: inside the module, where the representation is known, and outside the module, where only the qualified abstract type is visible. For module procedures, trace parameter interfaces the same way Chapter 3 traced procedure parameters, but remember that the argument is a module and the result is a module.

**Exercise 8.1.** Modify the checker so that it detects and rejects programs that define two modules with the same name.

**Training goal:** module-name uniqueness, checker extension, type-environment validation.

>

**Exercise 8.2.** Modify `add-module-defn-to-env` so that it adds only values declared in the interface, and decide whether `add-module-defn-to-tenv` has the same problem.

**Training goal:** interface-controlled export, runtime environment filtering, checker/runtime comparison.

>

**Exercise 8.3.** Change qualified variable syntax from `from m take v` to `m.v`.

**Training goal:** concrete syntax change, parser modification, qualified lookup preservation.

>

**Exercise 8.4.** Extend the expression language used by modules with multiple `let` declarations, multiargument procedures, and multiple `letrec` declarations.

**Training goal:** language-feature migration, module expression extension, type checker synchronization.

>

**Exercise 8.5.** Allow `let` and `letrec` declarations to be used inside module bodies.

**Training goal:** module-body syntax extension, local helper definitions, recursive local definitions.

>

**Exercise 8.6.** Allow local module definitions to appear in module bodies.

**Training goal:** nested modules, local module scope, module-body evaluation.

>

**Exercise 8.7.** Extend local module definitions so modules can export other modules as components.

**Training goal:** modules as exported components, nested qualified lookup, interface nesting.

>

**Exercise 8.8.** Remove the restriction that module body definitions must appear in the same order as their interface declarations.

**Training goal:** declaration matching, order-independent export checking, interface/body alignment.

>

**Exercise 8.9.** Add a `depends-on` clause so each module body and program body can explicitly list which preceding modules are in scope.

**Training goal:** dependency declaration, module scope control, static dependency checking.

>

**Exercise 8.10.** Add an `imports` clause that both controls which modules are in scope and determines which module bodies are evaluated.

**Training goal:** lazy module evaluation, import-driven dependency, effect order in module initialization.

>

**Exercise 8.11.** Modify the module checker so that module expressions use `INFERRED`, requiring interface comparison to account for inferred rather than exactly written types.

**Training goal:** module checking with inference, type equivalence beyond `equal?`, inferred procedure types.

>

**Exercise 8.12.** Decide whether `and`, `not`, and `to-bool` from the boolean module example can be moved outside the module.

**Training goal:** opacity boundary, representation access, client-side definability.

>

**Exercise 8.13.** Write a module implementing arithmetic where integer `k` is represented as `5 * k + 3`.

**Training goal:** opaque representation design, arithmetic interface implementation, abstraction preservation.

>

**Exercise 8.14.** Compare two implementations of the `mybool` module and determine whether any client program of type `int` can distinguish them.

**Training goal:** observational equivalence, opaque abstraction, representation independence.

>

**Exercise 8.15.** Write a module implementing integer-to-integer tables with an opaque `table` type, empty table, add operation, and lookup operation using Curried procedures.

**Training goal:** abstract data type as module, opaque table representation, procedure-valued exports.

>

**Exercise 8.16.** Extend the system to use the language of Exercise 7.24, then rewrite the table module using multiargument procedures instead of Curried procedures.

**Training goal:** multiargument procedures in modules, typed module extension, interface redesign.

>

**Exercise 8.17.** Remove the restriction that module definitions must follow interface order in the opaque-types system, while preserving type scoping rules.

**Training goal:** order-independent typed exports, type declaration scope, opaque/transparent matching.

>

**Exercise 8.18.** Refactor the code so the invariant that all types in the type environment are expanded is maintained more robustly with fewer explicit calls to `expand-type`.

**Training goal:** type-environment invariant, checker refactoring, representation robustness.

>

**Exercise 8.19.** Complete `from-int-maker`, a module procedure that converts an ordinary integer into the representation exported by a given arithmetic module.

**Training goal:** module procedure design, opaque arithmetic conversion, reusable module abstraction.

>

**Exercise 8.20.** Complete `sum-prod-maker`, a module procedure that produces addition and multiplication operations for a supplied arithmetic module.

**Training goal:** parameterized modules, higher-level arithmetic construction, module procedure result interface.

>

**Exercise 8.21.** Write a module procedure that transforms an arithmetic implementation so that number `k` is represented by the representation of `2 * k` in the input module.

**Training goal:** representation transformation, module-to-module mapping, opaque type preservation.

>

**Exercise 8.22.** Complete `equality-maker`, a module procedure that produces an equality operation for a supplied arithmetic implementation.

**Training goal:** derived operation generation, opaque type comparison, module procedure abstraction.

>

**Exercise 8.23.** Write a parameterized table module `table-of` whose contents are values from an input module, such as `from mybool take t`.

**Training goal:** module procedures over content types, abstract containers, qualified type propagation.

>

**Exercise 8.24.** Analyze why module application is restricted to identifiers, and explain what goes wrong in the type rule for an application such as `(m1 (m2 m3))`.

**Training goal:** module-application typing, dependent interface naming, limitation of simple module procedure rules.

>

**Exercise 8.25.** Extend `PROC-MODULES` so that a module can take multiple arguments.

**Training goal:** multiargument module procedures, interface generalization, module application redesign.

>

**Exercise 8.26.** Extend module bodies so module application can use arbitrary module bodies as rator and rand, not only identifiers.

**Training goal:** higher-order module expressions, module-body evaluation, type-rule generalization.

>

**Exercise 8.27.** Add named interfaces to the grammar so repeated interfaces can be defined once and reused in module procedure interfaces and bodies.

**Training goal:** interface abstraction, named interface expansion, module-interface scope.

>

**Cross-chapter recovery questions:**

**1. How will Chapter 8’s `interface` discipline return in Chapter 9’s typed object-oriented language with class interfaces and method types?**

**2. How does `opaque type` in modules compare with object representation hiding through fields and methods in Chapter 9?**

**3. Which parts of module checking resemble Chapter 7’s type checking, and which parts require a new interface-satisfaction relation?**

**4. How will module procedures influence the later view of classes and objects as reusable program-structure mechanisms rather than only runtime values?**

**Chapter mastery standards:**

* Able to distinguish module `interface` from module `body`.
* Able to trace a qualified variable lookup through module-name lookup and exported-component lookup.
* Able to explain why module checking requires both value environments and type environments.
* Able to compare actual and expected interfaces using interface satisfaction rather than exact equality.
* Able to explain `transparent type` ≠ `opaque type` and why `transparent t = int` can satisfy `opaque t`.
* Able to use qualified types such as `from m take t` without confusing equal component names from different modules.
* Able to trace a module procedure application through parameter interface checking, module argument binding, and result interface construction.

### Chapter 9. Objects and Classes

*Chapter 9 extends the interpreter sequence to object-oriented languages. Earlier chapters already introduced local state, environments, stores, procedures, modules, and types; this chapter combines those ideas into `objects`, `classes`, `fields`, `methods`, `inheritance`, `self`, and `super`. The first half builds the untyped language `CLASSES`, where objects combine mutable state with method dispatch. The second half adds interfaces, subtyping, casts, and a type checker for `TYPED-OO`, showing how object-oriented safety properties require both runtime class information and static class/interface environments.*

**Chapter dependencies:**

* Depends on Chapter 4: `environment` + `store` → object fields as mutable state.

* Depends on Chapter 3: `procedure` + saved environment → method bodies evaluated in extended environments.

* Depends on Chapter 8: `interface` + abstraction boundary → object interfaces and implementation hiding.

* Depends on Chapter 7: `type environment` + `subtype checking` → typed object-oriented language.

* Introduces object structure: `object` = class identity + field references.

* Introduces class structure: `class` = superclass + fields + method environment.

* Adds dispatch: `send object method(args)` → find method by runtime class and method name.

* Adds inheritance: superclass fields + methods → subclass extension + overriding.

* Adds `self` and `super`: dynamic receiver + statically determined superclass method call.

* Typed OO adds safety: class/interface declarations + method types + subtyping → checked dispatch.

**1. Why does object-oriented abstraction require both state and behavior, rather than only records or procedures?**

>

**2. How does `CLASSES` represent an object, a class, fields, and methods in the interpreter?**

>

**3. How does method invocation differ from ordinary procedure application?**

>

**4. Why does inheritance require both field accumulation and method-environment merging?**

>

**5. How do `self` and `super` interact, and why is `super` statically determined while ordinary `send` uses dynamic dispatch?**

>

**6. Why do field shadowing, method overriding, private/protected/public access, final methods, and static variables create semantic choices rather than mere syntax additions?**

>

**7. How does the typed object-oriented language use interfaces, class types, subtyping, `instanceof`, and `cast` to control method dispatch safely?**

>

**8. Why does object-oriented type checking require a separate static class environment, in addition to the runtime class environment used by the interpreter?**

>

**Concept comparison table:**

| Concept A         | Concept B          | Shared point                                                       | Key difference                                                                                                        | Role in this chapter                                            | Minimal example                                           |
| ----------------- | ------------------ | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------- |
| `object`          | `module`           | Both hide implementation details behind an interface-like boundary | A module is a set of bindings; an object is a runtime value with identity, state, and behavior                        | Distinguishes Chapter 8 modules from Chapter 9 objects          | many objects of one class vs one module binding           |
| `object`          | `class`            | Both belong to object-oriented structure                           | Object is an instance with fields; class is the blueprint containing field and method declarations                    | Main runtime split                                              | `new c1(3)` creates an object of class `c1`               |
| `field`           | `method`           | Both are class members                                             | Field stores per-object state; method defines behavior executed with `self` and fields in scope                       | State + behavior grouping                                       | `field x`; `method move(dx)`                              |
| `method call`     | procedure call     | Both apply code to arguments                                       | Method call first chooses code by receiver’s runtime class; procedure call applies a procedure value directly         | Dynamic dispatch                                                | `send o m(1)` vs `(f 1)`                                  |
| `self`            | ordinary variable  | Both can appear in method bodies                                   | `self` is bound to the receiver object; ordinary variables come from parameters, fields, or environment               | Supports recursive and mutually recursive method calls          | `send self odd(n)`                                        |
| `super`           | `self`             | Both occur inside methods                                          | `self` names the receiver; `super` names where method lookup starts: the superclass of the method’s host class        | Static dispatch inside inheritance                              | `super initialize(x,y)`                                   |
| dynamic dispatch  | static dispatch    | Both select a method                                               | Dynamic dispatch depends on receiver’s runtime class; static dispatch is determined by text/host class                | Explains `send` vs `super` / named-send                         | `send self m()` vs `super m()`                            |
| overriding        | overloading        | Both involve method names                                          | Overriding replaces inherited method behavior in a subclass; overloading selects among same-name methods by signature | Two different method-resolution problems                        | `m` in subclass vs `m:@2`                                 |
| field shadowing   | method overriding  | Both occur across inheritance                                      | Field shadowing creates multiple field slots with related names; method overriding changes lookup choice              | Explains renaming of inherited fields                           | `x%1`, `x%2` vs new `m`                                   |
| class environment | method environment | Both store class-related information                               | Class environment maps class names to class records; method environment maps method names to method records           | Runtime method lookup and object creation                       | `lookup-class`, `find-method`                             |
| interface         | class type         | Both support static checking                                       | Interface describes required methods; class type names concrete class instances                                       | Typed OO distinction                                            | `tree` interface vs `interior-node` class                 |
| subtype           | inheritance        | Both form ordering relations                                       | Inheritance is implementation reuse; subtyping is type substitutability                                               | Explains why interface inheritance and class inheritance differ | class implements interface                                |
| `instanceof`      | `cast`             | Both inspect class relation                                        | `instanceof` returns a boolean; `cast` changes the static view or fails at runtime                                    | Guards downcasts and method calls                               | `if instanceof t interior-node then cast t interior-node` |
| single dispatch   | double dispatch    | Both select behavior by object class                               | Single dispatch chooses by receiver only; double dispatch simulates selection by two receiver classes                 | Binary method problem                                           | `similarpoints`                                           |

**Program tracing table:**

| Tracing object             | What to trace                                                                                         | Common mistake                                                      |
| -------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `new c(args)`              | Lookup class → create object with fields → invoke `initialize`                                        | Treating object creation as only record allocation                  |
| Object value               | Class name + field references                                                                         | Forgetting fields are mutable storage locations, not just values    |
| `send o m(args)`           | Evaluate receiver → get runtime class → find method → evaluate arguments → apply method               | Looking up the method statically by variable type                   |
| Field access inside method | Field names bound in method environment → references in object field vector/list → store contents     | Treating fields as lexical variables stored in the method closure   |
| Method application         | Build environment with method parameters, `self`, fields, and possibly `super` information            | Applying method body as if it were an ordinary procedure body       |
| Inherited fields           | Superclass field names + subclass field names → full field list                                       | Assuming subclass fields replace superclass fields automatically    |
| Field shadowing            | Renamed inherited fields plus local fields                                                            | Missing why internal field names may be uniquified                  |
| Method overriding          | New method environment appended before inherited method environment                                   | Searching superclass method before subclass method                  |
| `super` call               | Host class → superclass of host class → method lookup starts there                                    | Using the runtime class of `self` as the starting point for `super` |
| Static class environment   | Class declaration → superclass info, field types, method types, implemented interfaces                | Confusing runtime class records with static class records           |
| Interface checking         | Class method environment must supply all interface-required methods with compatible types             | Treating interface satisfaction as identical to inheritance         |
| Subtype check              | Class inheritance or interface relation determines substitutability                                   | Treating equal names as enough for subtype relation                 |
| Cast                       | Evaluate object → check subclass/ancestor relation → return object or signal cast error               | Assuming a cast changes the object                                  |
| `instanceof`               | Evaluate object → compare runtime class to target class                                               | Treating `instanceof` as a static type test only                    |
| Method type checking       | Add `self`, `super`, fields, and parameters to type environment → check body type against result type | Checking method body without field or self bindings                 |

>

**Abstraction barrier record:**

| Abstraction layer              | Exposed interface                                       | Hidden representation                                       | What upper code depends on                                      | What should not change if representation changes                    |
| ------------------------------ | ------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------- |
| Object layer                   | `new`, `send`, object values                            | class name plus field locations                             | objects respond to messages according to class behavior         | user programs should not depend on object record layout             |
| Class environment layer        | `initialize-class-env!`, `lookup-class`                 | global table of class records                               | class names resolve to superclass, fields, and methods          | interpreter clauses should not inspect raw table structure          |
| Field layer                    | field names in methods, `fieldref`, `fieldset` if added | references, vectors, renamed fields, store layout           | field access reads/writes per-object state                      | method semantics should not depend on field storage order           |
| Method environment layer       | `find-method`, method names, method records             | association list, table, offset vector, or name-mangled map | dispatch finds the correct method                               | `send` should not depend on linear search implementation            |
| Inheritance layer              | `extends`, inherited methods, inherited fields          | merged field lists and method environments                  | subclass objects include inherited behavior                     | client code should not depend on merge implementation               |
| `self` / `super` layer         | `self`, `super m(args)`                                 | receiver binding and host-class superclass information      | methods can call receiver methods and inherited implementations | surface method bodies should not depend on how host class is stored |
| Access-control layer           | public/protected/private members                        | caller context and host-class checks                        | allowed accesses succeed; disallowed accesses are rejected      | method lookup strategy should not leak private members              |
| Static class environment layer | class/interface declarations, method types, field types | static records separate from runtime records                | checker knows class hierarchy and method signatures             | type checker should not depend on runtime object representation     |
| Interface layer                | interface declarations and required methods             | method-type lists and satisfaction checking                 | classes can promise behavior without exposing fields            | clients should not depend on implementing class representation      |
| Subtype layer                  | `is-subtype?`, interface/class hierarchy                | traversal of parent and implements relations                | a subtype can be used where a supertype is expected             | expression checking should not duplicate hierarchy traversal        |
| Cast layer                     | `instanceof`, `cast`                                    | runtime class comparison and static type rules              | guarded downcasts can be expressed safely                       | programs should not depend on the internal class-test algorithm     |

**Error prediction:**

**1. The reader may mistake an object for a record of fields, but this chapter needs to distinguish passive data from state + behavior + dispatch.**

>

**2. The reader may treat method invocation as procedure application, while method invocation first performs method lookup using the receiver’s runtime class.**

>

**3. The reader may think `super` means “the superclass of the current object,” but it means the superclass of the method’s host class.**

>

**4. The reader may treat inheritance as only code reuse, while it also defines method lookup order, field accumulation, overriding behavior, and subtype expectations.**

>

**5. The reader may assume interface checking is the same as class inheritance, but interfaces specify required behavior without forcing implementation inheritance.**

>

**6. The reader may think `cast` changes an object’s runtime class, while it only changes the static view if the runtime class relation allows it.**

>

**Learning Tips:** Chapter 9 should be read with three linked diagrams: object layout, class hierarchy, and method lookup path. For every method call, trace receiver evaluation, runtime class lookup, method environment search, environment construction for the method body, and field reference lookup. For `super`, always write the host class of the currently executing method; this prevents the common mistake of starting lookup from the receiver’s actual class. In the typed sections, keep a separate static class environment beside the runtime class environment, and trace method-call checking before tracing method-call evaluation.

**Exercise 9.1.** Implement queue classes in the object language, first with `empty?`, `enqueue`, and `dequeue`, then with a per-queue operation counter, then with a class-wide operation counter shared by all queues.

**Training goal:** object state, method design, per-instance vs shared state.

>

**Exercise 9.2.** Define a subclass `bogus-oddeven` that overrides `even` so that a call to inherited `odd` produces the wrong answer.

**Training goal:** inheritance danger, overriding, dynamic dispatch through `self`.

>

**Exercise 9.3.** Inspect the class environment in the worked example and determine where method environments and field-name lists are shared.

**Training goal:** class-environment representation, structural sharing, implementation tracing.

>

**Exercise 9.4.** Change object representation so an object stores the class record itself rather than the class name, and compare the advantages and disadvantages.

**Training goal:** object representation choice, lookup cost, representation tradeoff.

>

**Exercise 9.5.** Change method representation so a method stores the host class name rather than the superclass name, retrieving the superclass name when needed.

**Training goal:** method representation, `super` lookup, host-class information.

>

**Exercise 9.6.** Add `instanceof exp class-name`, returning true when the evaluated object is an instance of the named class or one of its subclasses.

**Training goal:** runtime class testing, subclass traversal, object inspection.

>

**Exercise 9.7.** Modify method environments so a method’s environment includes only fields declared in its host class, not inherited fields.

**Training goal:** field visibility, method environment design, inheritance semantics.

>

**Exercise 9.8.** Add `fieldref obj field-name` and `fieldset obj field-name = exp` to retrieve and update object fields directly.

**Training goal:** field access expressions, object state exposure, interpreter extension.

>

**Exercise 9.9.** Add `superfieldref field-name` and `superfieldset field-name = exp` for manipulating shadowed superclass fields of `self`.

**Training goal:** field shadowing, static `super`, superclass field access.

>

**Exercise 9.10.** Add named-class method invocation, field reference, and field setting, allowing explicit static selection of a class’s method or field behavior.

**Training goal:** static dispatch, named-class access, class-membership checking.

>

**Exercise 9.11.** Add method access modifiers: private, protected, and public.

**Training goal:** access control, host-class context, method visibility.

>

**Exercise 9.12.** Add field access modifiers: private, protected, and public.

**Training goal:** field visibility, access-control checking, encapsulation.

>

**Exercise 9.13.** Add final methods that cannot be overridden by subclasses.

**Training goal:** inheritance restriction, method-environment validation, behavioral protection.

>

**Exercise 9.14.** Modify `CLASSES` so calls to `self` use the method in the host class rather than dynamic lookup in the receiver’s class.

**Training goal:** static dispatch for `self`, overriding behavior, dynamic-dispatch comparison.

>

**Exercise 9.15.** Add static/class variables shared by all instances of a class, and decide the environment for evaluating their initialization expressions.

**Training goal:** class-level state, shared variables, method environment extension.

>

**Exercise 9.16.** Add method overloading, allowing a class to contain multiple methods with the same name when their signatures are distinct.

**Training goal:** overload resolution, method signatures, dispatch extension.

>

**Exercise 9.17.** Extend or analyze overloaded method dispatch in the presence of inheritance and overriding.

**Training goal:** overloading + inheritance, method lookup ambiguity, signature discipline.

>

**Exercise 9.18.** Replace the method-environment representation with a more efficient implementation for method lookup and measure the improvement.

**Training goal:** method lookup optimization, representation change, empirical performance.

>

**Exercise 9.19.** Optimize field lookup or field access by replacing field names with offsets or another direct-access representation.

**Training goal:** field-offset translation, runtime lookup reduction, representation optimization.

>

**Exercise 9.20.** Analyze whether optimizations analogous to Exercise 9.19 can be applied to method invocations.

**Training goal:** method dispatch optimization, dynamic lookup limits, static/dynamic contrast.

>

**Exercise 9.21.** Replace linear search through many class methods with a faster implementation and account for the observed improvement or lack of improvement.

**Training goal:** dispatch-table implementation, performance measurement, method lookup cost.

>

**Exercise 9.22.** Implement method overloading through a syntactic preprocessor that name-mangles methods by arity, such as `m:@n`.

**Training goal:** name mangling, preprocessing, compile-time support for overloading.

>

**Exercise 9.23.** Write a translator that statically resolves `super` calls by replacing them with abstract syntax nodes containing the exact method to invoke.

**Training goal:** static `super` resolution, pre-execution analysis, method lookup elimination.

>

**Exercise 9.24.** Translate named method calls into numeric offsets in the named class’s runtime method table, then implement constant-time named method access.

**Training goal:** method-table offsets, translation, constant-time static dispatch.

>

**Exercise 9.25.** Explore the binary method problem through a `similarpoints` method for `point` and `colorpoint`, test all combinations, diagnose the failing `super`-based solution, and repair it.

**Training goal:** binary methods, dynamic dispatch limitation, multi-object comparison.

>

**Exercise 9.26.** Add multiple inheritance to `CLASSES`, specify how method and field conflicts are resolved, and characterize the field-sharing problem.

**Training goal:** multiple inheritance, method conflict resolution, field sharing, diamond problem.

>

**Exercise 9.27.** Implement an object language without classes, where objects are sets of method closures sharing an environment and methods are retrieved by `getmethod`.

**Training goal:** classless objects, closure-based objects, shared state without class declarations.

>

**Exercise 9.28.** Add inheritance to the classless object language from Exercise 9.27.

**Training goal:** object-level inheritance, method sharing, classless delegation.

>

**Exercise 9.29.** Design and implement a prototype-based object language where objects contain their own method environments, `extend` creates new prototypes, and `clone` copies fields and methods.

**Training goal:** prototype-based objects, delegation, class-free object construction.

>

**Exercise 9.30.** Define `summable` and `stringable` interfaces, then implement summable lists, binary trees, general trees, and stringable versions.

**Training goal:** interface design, polymorphic object behavior, typed object programs.

>

**Exercise 9.31.** Analyze whether `tree` should be a class inherited by node classes or an interface implemented by node classes.

**Training goal:** class vs interface design, implementation sharing vs behavioral specification.

>

**Exercise 9.32.** Write an equality predicate for tree objects without `instanceof` or `cast`, using double dispatch to simulate method selection by two object classes.

**Training goal:** double dispatch, binary methods, avoiding runtime casts.

>

**Exercise 9.33.** Extend the type checker to ensure that `instanceof` and `cast` are used only on object values and class types.

**Training goal:** cast safety, object-type checking, class-type validation.

>

**Exercise 9.34.** Extend the type checker so `cast e c` and `instanceof e c` are accepted only when the static type of `e` is an ancestor or descendant of `c`.

**Training goal:** static cast feasibility, subtype relation, safe downcast/upcast checking.

>

**Exercise 9.35.** Extend the type checker to ensure that an `initialize` method can be called only from a `new` expression.

**Training goal:** constructor discipline, special method restriction, type checker extension.

>

**Exercise 9.36.** Allow interfaces to inherit from other interfaces, requiring child interfaces to include all methods required by their parents.

**Training goal:** interface inheritance, required-method accumulation, typed OO extension.

>

**Exercise 9.37.** Explore static dispatch for typed object-oriented programs, where method choice depends on the object’s static type rather than its runtime class.

**Training goal:** static vs dynamic dispatch, type-directed method selection, OO language design.

>

**Cross-chapter recovery questions:**

**1. How does Chapter 9’s object representation reuse Chapter 4’s separation between environment and store?**

**2. How does method dispatch compare with Chapter 8’s module lookup: both expose named operations, but only object dispatch depends on a receiver’s runtime class?**

**3. Which parts of Chapter 7’s type checker must be generalized when values can have class types, interface types, and subtype relationships?**

**4. How does the binary method problem expose a limit of single-dispatch object-oriented design, and how does it connect to generic operations or multiple dispatch outside this book?**

**Chapter mastery standards:**

* Able to explain object = identity + fields + behavior, not merely a record of values.
* Able to trace `new` through class lookup, field allocation, object construction, and `initialize` invocation.
* Able to trace `send` through receiver evaluation, dynamic method lookup, method environment construction, and body evaluation.
* Able to explain why inherited fields accumulate while methods may be overridden.
* Able to distinguish dynamic dispatch from static dispatch, especially in `send`, `super`, and named-class calls.
* Able to explain how `self` and `super` are bound and why `super` depends on the method’s host class.
* Able to trace typed method-call checking through class/interface environments, method signatures, subtyping, `instanceof`, and `cast`.

### Program 1. Evaluator / Interpreter Family

This program compresses EOPL’s interpreter line into one annotated study implementation. It uses one abstract-syntax family to show the transition from an environment-only evaluator to explicit references, implicit references, mutable pairs, and a small call-by-reference hook. The code is not a minimal demo; it is meant to make the main semantic objects traceable: `ExpVal`, `DenVal`, `environment`, `store`, `procedure`, `closure`, `reference`, and `value-of`.

The implementation does not include a parser. Programs are constructed directly as abstract syntax objects, so the semantic structure stays visible.

```scheme
;;; ============================================================
;;; Program 1. Evaluator / Interpreter Family
;;;
;;; This file is an annotated study implementation in EOPL style.
;;; It uses one small object language to summarize the main evaluator
;;; mechanisms behind LET, PROC, LETREC, EXPLICIT-REFS, IMPLICIT-REFS,
;;; mutable pairs, and a small call-by-reference hook.
;;;
;;; Important separation:
;;;   object language       = the language being interpreted
;;;   implementation language = Scheme code implementing the interpreter
;;;
;;; The interpreter must never confuse:
;;;   ExpVal  = values produced by object-language expressions
;;;   Scheme value = host-language representation used to implement them
;;;
;;; The pure evaluator uses:
;;;   expression + environment -> ExpVal
;;;
;;; The stateful variants use:
;;;   expression + environment + store -> ExpVal
;;;
;;; The store is implemented by host-language mutation for compactness.
;;; A store-passing interpreter would make the store explicit in each return.
;;; ============================================================


;;; ============================================================
;;; 1. Abstract syntax
;;; ============================================================
;;;
;;; The parser is intentionally omitted.
;;; Each constructor below creates one AST variant.
;;;
;;; The evaluator follows this rule:
;;;   one abstract-syntax variant -> one semantic branch in value-of.
;;;
;;; Later CPS interpreters keep the same expression cases but add a
;;; continuation argument. Later type checkers keep the same traversal
;;; pattern but compute Type instead of ExpVal.
;;; ============================================================

(define (a-program body)
  (list 'a-program body))

(define (program-body pgm)
  (cadr pgm))


;;; Basic expression forms.

(define (const-exp n)
  (list 'const-exp n))

(define (var-exp var)
  (list 'var-exp var))

(define (diff-exp exp1 exp2)
  (list 'diff-exp exp1 exp2))

(define (zero?-exp exp1)
  (list 'zero?-exp exp1))

(define (if-exp test-exp true-exp false-exp)
  (list 'if-exp test-exp true-exp false-exp))

(define (begin-exp exps)
  ;; Sequencing matters only when effects exist.
  ;; In the pure fragment it is observable mainly through the final value.
  (list 'begin-exp exps))


;;; Binding forms.

(define (let-exp vars rhss body)
  ;; Parallel LET:
  ;;   all RHS expressions are evaluated in the old environment.
  ;;   only the BODY sees the new bindings.
  ;;
  ;; For a single binding, use:
  ;;   (let-exp '(x) (list rhs) body)
  (list 'let-exp vars rhss body))

(define (let*-exp vars rhss body)
  ;; Sequential LET*:
  ;;   later RHS expressions see earlier bindings.
  ;;
  ;; This is a semantic difference, not a printing difference.
  (list 'let*-exp vars rhss body))


;;; Procedures and calls.

(define (proc-exp params body)
  ;; A procedure expression evaluates to a closure.
  ;; The closure must remember its defining environment.
  (list 'proc-exp params body))

(define (call-exp rator rands)
  ;; Multiargument procedure call.
  ;; RATOR is evaluated to a procedure value.
  ;; RANDS are evaluated left-to-right to argument values.
  (list 'call-exp rator rands))


;;; Recursive procedures.

(define (letrec-exp pnames paramss pbodies body)
  ;; Multiple recursive procedures.
  ;;
  ;; Each procedure name must be visible inside every recursive body.
  ;; This cannot be implemented by ordinary extend-env alone.
  (list 'letrec-exp pnames paramss pbodies body))


;;; Explicit-reference forms.
;;;
;;; In EXPLICIT-REFS, references are ordinary expressed values.
;;; Programs can allocate, dereference, and mutate locations directly.

(define (newref-exp exp1)
  (list 'newref-exp exp1))

(define (deref-exp exp1)
  (list 'deref-exp exp1))

(define (setref-exp ref-exp val-exp)
  (list 'setref-exp ref-exp val-exp))


;;; Implicit-reference assignment.
;;;
;;; In IMPLICIT-REFS, variables denote locations.
;;; Assignment changes the store cell reached by the variable.

(define (set-exp var rhs)
  (list 'set-exp var rhs))


;;; Mutable pairs.
;;;
;;; A mutable pair is represented as two references.
;;; The pair value itself is not the left or right value; it contains locations.

(define (newpair-exp left-exp right-exp)
  (list 'newpair-exp left-exp right-exp))

(define (left-exp pair-exp)
  (list 'left-exp pair-exp))

(define (right-exp pair-exp)
  (list 'right-exp pair-exp))

(define (setleft-exp pair-exp val-exp)
  (list 'setleft-exp pair-exp val-exp))

(define (setright-exp pair-exp val-exp)
  (list 'setright-exp pair-exp val-exp))


;;; Call-by-reference hook.
;;;
;;; This is not the default call form.
;;; It exists to show how parameter passing changes DenVal construction.

(define (callref-exp rator rands)
  (list 'callref-exp rator rands))


;;; ============================================================
;;; 2. Expressed values
;;; ============================================================
;;;
;;; ExpVal is the value domain of the object language.
;;; It is represented by tagged Scheme data, but clients must use
;;; constructors and extractors rather than raw car/cadr access.
;;;
;;; ExpVal != Scheme value:
;;;   (num-val 3) is not the Scheme number 3.
;;;   It is an object-language numeric value represented in Scheme.
;;; ============================================================

(define (num-val n)
  (list 'num-val n))

(define (bool-val b)
  (list 'bool-val b))

(define (proc-val proc)
  (list 'proc-val proc))

(define (ref-val ref)
  ;; In EXPLICIT-REFS, a reference can be an expressed value.
  (list 'ref-val ref))

(define (pair-val left-ref right-ref)
  ;; Mutable pair = two store locations.
  ;; Accessors must dereference the locations.
  (list 'pair-val left-ref right-ref))

(define (void-val)
  ;; Used for assignment-like operations whose value is not meaningful.
  (list 'void-val))


(define (expval->num val)
  (if (and (pair? val) (eq? (car val) 'num-val))
      (cadr val)
      (error "Expected NumVal -- EXPVAL->NUM" val)))

(define (expval->bool val)
  (if (and (pair? val) (eq? (car val) 'bool-val))
      (cadr val)
      (error "Expected BoolVal -- EXPVAL->BOOL" val)))

(define (expval->proc val)
  (if (and (pair? val) (eq? (car val) 'proc-val))
      (cadr val)
      (error "Expected ProcVal -- EXPVAL->PROC" val)))

(define (expval->ref val)
  (if (and (pair? val) (eq? (car val) 'ref-val))
      (cadr val)
      (error "Expected RefVal -- EXPVAL->REF" val)))

(define (expval->pair val)
  (if (and (pair? val) (eq? (car val) 'pair-val))
      val
      (error "Expected PairVal -- EXPVAL->PAIR" val)))

(define (pair-left-ref p)
  (cadr p))

(define (pair-right-ref p)
  (caddr p))


;;; ============================================================
;;; 3. Store
;;; ============================================================
;;;
;;; The store maps references to ExpVal.
;;;
;;; A reference is represented as an integer location.
;;; A value is the content stored at that location.
;;;
;;; reference != value:
;;;   reference: where the value lives
;;;   value:     what is currently stored there
;;;
;;; This store representation is simple, not efficient:
;;;   newref  : append to store
;;;   deref   : list-ref
;;;   setref! : rebuild list with one changed cell
;;;
;;; EOPL often uses such simple representations to expose semantics first.
;;; ============================================================

(define the-store '())

(define (initialize-store!)
  ;; Each run should start with a fresh store.
  ;; Otherwise one program's locations leak into the next program.
  (set! the-store '()))

(define (get-store)
  the-store)

(define (store-size)
  (length the-store))

(define (newref val)
  ;; Allocation creates a fresh location and stores VAL there.
  ;; It returns the location, not VAL.
  (let ((next-location (store-size)))
    (set! the-store (append the-store (list val)))
    next-location))

(define (deref ref)
  ;; Dereference reads the current contents of a location.
  (if (and (integer? ref)
           (>= ref 0)
           (< ref (store-size)))
      (list-ref the-store ref)
      (error "Invalid reference -- DEREF" ref)))

(define (setref! ref val)
  ;; Assignment changes an existing location.
  ;; It does not create a new binding and does not change the reference itself.
  (define (loop store index)
    (cond ((null? store)
           (error "Invalid reference -- SETREF!" ref))
          ((= index 0)
           (cons val (cdr store)))
          (else
           (cons (car store)
                 (loop (cdr store) (- index 1))))))
  (set! the-store (loop the-store ref))
  (void-val))


;;; ============================================================
;;; 4. Environments and denoted values
;;; ============================================================
;;;
;;; The environment gives meaning to variables.
;;;
;;; Environment != store:
;;;   environment maps variable names to DenVal
;;;   store maps references to ExpVal
;;;
;;; In the pure and EXPLICIT-REFS evaluator:
;;;   DenVal = ExpVal
;;;
;;; In the IMPLICIT-REFS evaluator:
;;;   DenVal = Ref(ExpVal)
;;;
;;; This single distinction explains why the implicit-reference evaluator
;;; must dereference on variable lookup and allocate on binding.
;;; ============================================================

(define (empty-env)
  (list 'empty-env))

(define (extend-env var denval saved-env)
  ;; DENVAL is deliberately named denval.
  ;; In different evaluators it may be an ExpVal or a reference.
  (list 'extend-env var denval saved-env))

(define (extend-env* vars denvals saved-env)
  ;; Extends by parallel lists.
  ;; Used for multiargument procedures and multiple LET declarations.
  (cond ((and (null? vars) (null? denvals))
         saved-env)
        ((or (null? vars) (null? denvals))
         (error "Mismatched variables and values -- EXTEND-ENV*" vars denvals))
        (else
         (extend-env (car vars)
                     (car denvals)
                     (extend-env* (cdr vars)
                                  (cdr denvals)
                                  saved-env)))))

(define (extend-env-rec pnames paramss pbodies saved-env)
  ;; Recursive environment for the pure / explicit-reference evaluator.
  ;;
  ;; The procedure is constructed when its name is looked up.
  ;; The saved environment of that procedure is the recursive environment itself.
  (list 'extend-env-rec pnames paramss pbodies saved-env))

(define (apply-env env search-var)
  ;; apply-env returns a DenVal, not necessarily an ExpVal.
  ;; The caller decides whether this DenVal should be used directly or dereferenced.
  (case (car env)

    ((empty-env)
     (error "Unbound variable -- APPLY-ENV" search-var))

    ((extend-env)
     (let ((var       (cadr env))
           (denval    (caddr env))
           (saved-env (cadddr env)))
       (if (eq? search-var var)
           denval
           (apply-env saved-env search-var))))

    ((extend-env-rec)
     (let ((pnames    (cadr env))
           (paramss   (caddr env))
           (pbodies   (cadddr env))
           (saved-env (list-ref env 4)))
       (let ((pos (position search-var pnames)))
         (if pos
             (proc-val
              (procedure
               (list-ref paramss pos)
               (list-ref pbodies pos)
               env))
             (apply-env saved-env search-var)))))

    (else
     (error "Bad environment -- APPLY-ENV" env))))


(define (position x xs)
  ;; Return zero-based position of X in XS, or #f.
  (define (loop xs n)
    (cond ((null? xs) #f)
          ((eq? x (car xs)) n)
          (else (loop (cdr xs) (+ n 1)))))
  (loop xs 0))


;;; ============================================================
;;; 5. Procedures
;;; ============================================================
;;;
;;; A procedure value is a closure:
;;;   parameters + body + defining environment
;;;
;;; The saved environment is required for lexical scope.
;;; Without it, free variables would be resolved dynamically at the call site.
;;; ============================================================

(define (procedure params body saved-env)
  (list 'procedure params body saved-env))

(define (procedure-params proc)
  (cadr proc))

(define (procedure-body proc)
  (caddr proc))

(define (procedure-env proc)
  (cadddr proc))


(define (apply-procedure proc args)
  ;; Pure / explicit-reference application:
  ;; formal parameters denote argument ExpVals directly.
  (let ((params (procedure-params proc))
        (body   (procedure-body proc))
        (env    (procedure-env proc)))
    (if (= (length params) (length args))
        (value-of body (extend-env* params args env))
        (error "Wrong number of arguments -- APPLY-PROCEDURE"
               (list params args)))))


(define (apply-procedure/implicit proc args)
  ;; Implicit-reference application:
  ;; formal parameters denote fresh locations containing argument ExpVals.
  ;;
  ;; This is call-by-value with assignable local variables.
  (let ((params (procedure-params proc))
        (body   (procedure-body proc))
        (env    (procedure-env proc)))
    (if (= (length params) (length args))
        (let ((refs (map newref args)))
          (value-of/implicit body
                             (extend-env* params refs env)))
        (error "Wrong number of arguments -- APPLY-PROCEDURE/IMPLICIT"
               (list params args)))))


(define (apply-procedure/call-by-reference proc refs)
  ;; Call-by-reference:
  ;; formal parameters denote the caller's locations when operands are variables.
  ;;
  ;; Aliasing is the semantic point:
  ;;   two names may denote the same location.
  (let ((params (procedure-params proc))
        (body   (procedure-body proc))
        (env    (procedure-env proc)))
    (if (= (length params) (length refs))
        (value-of/implicit body
                             (extend-env* params refs env))
        (error "Wrong number of arguments -- APPLY-PROCEDURE/CALL-BY-REFERENCE"
               (list params refs)))))


;;; ============================================================
;;; 6. Shared helpers
;;; ============================================================

(define (value-of-operands exps env)
  ;; Left-to-right operand evaluation.
  ;; This choice is visible when operands have effects.
  (if (null? exps)
      '()
      (cons (value-of (car exps) env)
            (value-of-operands (cdr exps) env))))

(define (value-of-operands/implicit exps env)
  ;; Same evaluation order, but each operand is evaluated by the implicit evaluator.
  (if (null? exps)
      '()
      (cons (value-of/implicit (car exps) env)
            (value-of-operands/implicit (cdr exps) env))))

(define (value-of-sequence exps env evaluator)
  ;; BEGIN evaluates expressions in order and returns the last value.
  ;; Earlier expressions matter only through effects.
  (cond ((null? exps)
         (void-val))
        ((null? (cdr exps))
         (evaluator (car exps) env))
        (else
         (evaluator (car exps) env)
         (value-of-sequence (cdr exps) env evaluator))))

(define (extend-let*-env vars rhss env evaluator)
  ;; LET* extends the environment one binding at a time.
  ;; Later RHS expressions see earlier bindings.
  (cond ((and (null? vars) (null? rhss))
         env)
        ((or (null? vars) (null? rhss))
         (error "Mismatched LET* declarations" vars rhss))
        (else
         (let ((rhs-val (evaluator (car rhss) env)))
           (extend-let*-env
            (cdr vars)
            (cdr rhss)
            (extend-env (car vars) rhs-val env)
            evaluator)))))


;;; ============================================================
;;; 7. Core evaluator: LET / PROC / LETREC + EXPLICIT-REFS
;;; ============================================================
;;;
;;; This evaluator uses:
;;;   DenVal = ExpVal
;;;
;;; Variables evaluate by direct environment lookup.
;;; Explicit references are visible as object-language values:
;;;   newref -> RefVal
;;;   deref  -> ExpVal
;;;   setref -> VoidVal
;;; ============================================================

(define (value-of exp env)
  (case (car exp)

    ((const-exp)
     (num-val (cadr exp)))

    ((var-exp)
     ;; In this evaluator, apply-env returns an ExpVal directly.
     (apply-env env (cadr exp)))

    ((diff-exp)
     (let ((n1 (expval->num (value-of (cadr exp) env)))
           (n2 (expval->num (value-of (caddr exp) env))))
       (num-val (- n1 n2))))

    ((zero?-exp)
     (let ((n1 (expval->num (value-of (cadr exp) env))))
       (bool-val (zero? n1))))

    ((if-exp)
     ;; Only the selected branch is evaluated.
     ;; A type checker would check both branches statically.
     (if (expval->bool (value-of (cadr exp) env))
         (value-of (caddr exp) env)
         (value-of (cadddr exp) env)))

    ((begin-exp)
     (value-of-sequence (cadr exp) env value-of))

    ((let-exp)
     (let ((vars (cadr exp))
           (rhss (caddr exp))
           (body (cadddr exp)))
       ;; Parallel LET:
       ;; all RHS values are computed in the old environment.
       (let ((vals (value-of-operands rhss env)))
         (value-of body
                   (extend-env* vars vals env)))))

    ((let*-exp)
     (let ((vars (cadr exp))
           (rhss (caddr exp))
           (body (cadddr exp)))
       (value-of body
                 (extend-let*-env vars rhss env value-of))))

    ((proc-exp)
     ;; Closure creation does not evaluate the body.
     ;; It packages body + params + defining environment.
     (proc-val
      (procedure (cadr exp)
                 (caddr exp)
                 env)))

    ((call-exp)
     (let ((rator (cadr exp))
           (rands (caddr exp)))
       (let ((proc (expval->proc (value-of rator env)))
             (args (value-of-operands rands env)))
         (apply-procedure proc args))))

    ((letrec-exp)
     (let ((pnames  (cadr exp))
           (paramss (caddr exp))
           (pbodies (cadddr exp))
           (body    (list-ref exp 4)))
       ;; The recursive body sees procedure names through extend-env-rec.
       (value-of body
                 (extend-env-rec pnames paramss pbodies env))))

    ((newref-exp)
     ;; Allocation is explicit in the source program.
     (ref-val
      (newref (value-of (cadr exp) env))))

    ((deref-exp)
     ;; Dereference is explicit in the source program.
     (deref
      (expval->ref
       (value-of (cadr exp) env))))

    ((setref-exp)
     ;; Mutation changes a store cell, not an environment binding.
     (let ((ref (expval->ref (value-of (cadr exp) env)))
           (val (value-of (caddr exp) env)))
       (setref! ref val)))

    ((newpair-exp)
     ;; A mutable pair stores locations, not direct values.
     (let ((left-val  (value-of (cadr exp) env))
           (right-val (value-of (caddr exp) env)))
       (pair-val (newref left-val)
                 (newref right-val))))

    ((left-exp)
     (deref
      (pair-left-ref
       (expval->pair
        (value-of (cadr exp) env)))))

    ((right-exp)
     (deref
      (pair-right-ref
       (expval->pair
        (value-of (cadr exp) env)))))

    ((setleft-exp)
     (let ((pair (expval->pair (value-of (cadr exp) env)))
           (val  (value-of (caddr exp) env)))
       (setref! (pair-left-ref pair) val)))

    ((setright-exp)
     (let ((pair (expval->pair (value-of (cadr exp) env)))
           (val  (value-of (caddr exp) env)))
       (setref! (pair-right-ref pair) val)))

    ((set-exp)
     (error "SET belongs to the implicit-reference evaluator -- VALUE-OF" exp))

    ((callref-exp)
     (error "CALLREF belongs to the implicit-reference evaluator -- VALUE-OF" exp))

    (else
     (error "Unknown expression variant -- VALUE-OF" exp))))


;;; ============================================================
;;; 8. Program entry for pure / explicit-reference evaluator
;;; ============================================================

(define (init-env)
  ;; Initial bindings can be installed here.
  ;; Keeping it empty makes binding behavior visible in tests.
  (empty-env))

(define (value-of-program pgm)
  (initialize-store!)
  (value-of (program-body pgm) (init-env)))

(define run value-of-program)


;;; ============================================================
;;; 9. Implicit-reference recursive environment
;;; ============================================================
;;;
;;; In IMPLICIT-REFS:
;;;   DenVal = Ref(ExpVal)
;;;
;;; A variable lookup does not return the value directly.
;;; It returns a reference, and the evaluator dereferences it.
;;;
;;; Binding forms allocate locations:
;;;   let x = e in body
;;;     evaluate e -> val
;;;     allocate location containing val
;;;     bind x to that location
;;;
;;; Assignment:
;;;   set x = e
;;;     find x's location
;;;     evaluate e
;;;     update that location
;;; ============================================================

(define (extend-env-rec/implicit! pnames paramss pbodies saved-env)
  ;; Recursive procedures in IMPLICIT-REFS need locations first,
  ;; because each procedure value must close over the recursive environment.
  ;;
  ;; Strategy:
  ;;   1. Allocate dummy cells.
  ;;   2. Extend env with names -> locations.
  ;;   3. Store closures into those locations, using the recursive env.
  (let ((refs (map (lambda (x) (newref (void-val))) pnames)))
    (let ((rec-env (extend-env* pnames refs saved-env)))
      (for-each3
       (lambda (ref params body)
         (setref! ref
                  (proc-val
                   (procedure params body rec-env))))
       refs
       paramss
       pbodies)
      rec-env)))

(define (for-each3 f xs ys zs)
  (cond ((and (null? xs) (null? ys) (null? zs))
         'done)
        ((or (null? xs) (null? ys) (null? zs))
         (error "Mismatched lists -- FOR-EACH3" (list xs ys zs)))
        (else
         (f (car xs) (car ys) (car zs))
         (for-each3 f (cdr xs) (cdr ys) (cdr zs)))))


;;; ============================================================
;;; 10. Implicit-reference evaluator
;;; ============================================================
;;;
;;; This evaluator uses:
;;;   DenVal = Ref(ExpVal)
;;;
;;; The AST is mostly the same, but the variable rule changes.
;;; This small change propagates through LET, PROC, LETREC, and SET.
;;; ============================================================

(define (value-of/implicit exp env)
  (case (car exp)

    ((const-exp)
     (num-val (cadr exp)))

    ((var-exp)
     ;; Variable lookup performs:
     ;;   variable -> reference -> store contents.
     (deref (apply-env env (cadr exp))))

    ((diff-exp)
     (let ((n1 (expval->num (value-of/implicit (cadr exp) env)))
           (n2 (expval->num (value-of/implicit (caddr exp) env))))
       (num-val (- n1 n2))))

    ((zero?-exp)
     (let ((n1 (expval->num (value-of/implicit (cadr exp) env))))
       (bool-val (zero? n1))))

    ((if-exp)
     (if (expval->bool (value-of/implicit (cadr exp) env))
         (value-of/implicit (caddr exp) env)
         (value-of/implicit (cadddr exp) env)))

    ((begin-exp)
     (value-of-sequence (cadr exp) env value-of/implicit))

    ((let-exp)
     (let ((vars (cadr exp))
           (rhss (caddr exp))
           (body (cadddr exp)))
       ;; In implicit refs, LET allocates one location per binding.
       ;; The environment stores locations, not the values themselves.
       (let ((vals (value-of-operands/implicit rhss env)))
         (let ((refs (map newref vals)))
           (value-of/implicit body
                              (extend-env* vars refs env))))))

    ((let*-exp)
     (let ((vars (cadr exp))
           (rhss (caddr exp))
           (body (cadddr exp)))
       (value-of/implicit
        body
        (extend-let*-env/implicit vars rhss env))))

    ((proc-exp)
     ;; The closure captures an environment whose variables denote locations.
     (proc-val
      (procedure (cadr exp)
                 (caddr exp)
                 env)))

    ((call-exp)
     (let ((rator (cadr exp))
           (rands (caddr exp)))
       (let ((proc (expval->proc (value-of/implicit rator env)))
             (args (value-of-operands/implicit rands env)))
         (apply-procedure/implicit proc args))))

    ((callref-exp)
     (let ((rator (cadr exp))
           (rands (caddr exp)))
       (let ((proc (expval->proc (value-of/implicit rator env)))
             (refs (refs-of-operands rands env)))
         (apply-procedure/call-by-reference proc refs))))

    ((letrec-exp)
     (let ((pnames  (cadr exp))
           (paramss (caddr exp))
           (pbodies (cadddr exp))
           (body    (list-ref exp 4)))
       (value-of/implicit
        body
        (extend-env-rec/implicit! pnames paramss pbodies env))))

    ((set-exp)
     ;; SET changes the contents of an existing location.
     ;; It does not install a new binding.
     (let ((var (cadr exp))
           (rhs (caddr exp)))
       (let ((ref (apply-env env var))
             (val (value-of/implicit rhs env)))
         (setref! ref val))))

    ((newpair-exp)
     ;; Mutable pairs still use store locations.
     (let ((left-val  (value-of/implicit (cadr exp) env))
           (right-val (value-of/implicit (caddr exp) env)))
       (pair-val (newref left-val)
                 (newref right-val))))

    ((left-exp)
     (deref
      (pair-left-ref
       (expval->pair
        (value-of/implicit (cadr exp) env)))))

    ((right-exp)
     (deref
      (pair-right-ref
       (expval->pair
        (value-of/implicit (cadr exp) env)))))

    ((setleft-exp)
     (let ((pair (expval->pair (value-of/implicit (cadr exp) env)))
           (val  (value-of/implicit (caddr exp) env)))
       (setref! (pair-left-ref pair) val)))

    ((setright-exp)
     (let ((pair (expval->pair (value-of/implicit (cadr exp) env)))
           (val  (value-of/implicit (caddr exp) env)))
       (setref! (pair-right-ref pair) val)))

    ((newref-exp deref-exp setref-exp)
     (error "Explicit reference forms are not part of this implicit-ref evaluator"
            exp))

    (else
     (error "Unknown expression variant -- VALUE-OF/IMPLICIT" exp))))


(define (extend-let*-env/implicit vars rhss env)
  ;; Sequential LET* for implicit refs.
  ;; Each new binding allocates a location visible to later declarations.
  (cond ((and (null? vars) (null? rhss))
         env)
        ((or (null? vars) (null? rhss))
         (error "Mismatched LET* declarations -- IMPLICIT" vars rhss))
        (else
         (let ((val (value-of/implicit (car rhss) env)))
           (extend-let*-env/implicit
            (cdr vars)
            (cdr rhss)
            (extend-env (car vars) (newref val) env))))))


(define (refs-of-operands exps env)
  ;; Call-by-reference operand rule:
  ;;   variable operand     -> caller's existing location
  ;;   non-variable operand -> fresh location containing its value
  ;;
  ;; This explains why assignment to a formal may or may not affect the caller.
  (if (null? exps)
      '()
      (cons (ref-of-operand (car exps) env)
            (refs-of-operands (cdr exps) env))))

(define (ref-of-operand exp env)
  (if (and (pair? exp) (eq? (car exp) 'var-exp))
      (apply-env env (cadr exp))
      (newref (value-of/implicit exp env))))


;;; ============================================================
;;; 11. Program entry for implicit-reference evaluator
;;; ============================================================

(define (init-env/implicit)
  ;; In implicit refs, even predefined bindings would be stored as locations.
  (empty-env))

(define (value-of-program/implicit pgm)
  (initialize-store!)
  (value-of/implicit (program-body pgm) (init-env/implicit)))

(define run/implicit value-of-program/implicit)


;;; ============================================================
;;; 12. Test programs
;;; ============================================================
;;;
;;; Tests are written as comments so the file remains a compact study artifact.
;;; Each test targets one semantic distinction rather than only one result.
;;; ============================================================


;;; ------------------------------------------------------------
;;; Test group A: basic LET / PROC / LETREC
;;; ------------------------------------------------------------

;; Difference:
;;
;; (run
;;  (a-program
;;   (diff-exp (const-exp 10) (const-exp 3))))
;;
;; expected:
;;   (num-val 7)
;;
;; Trace:
;;   diff-exp -> evaluate both operands -> extract numbers -> construct NumVal.


;; LET evaluates RHS in old environment.
;;
;; (run
;;  (a-program
;;   (let-exp '(x)
;;            (list (const-exp 7))
;;            (diff-exp (var-exp 'x) (const-exp 2)))))
;;
;; expected:
;;   (num-val 5)
;;
;; Trace:
;;   RHS sees old env.
;;   BODY sees x bound to (num-val 7).


;; Lexical closure:
;;
;; (run
;;  (a-program
;;   (let-exp '(x)
;;            (list (const-exp 100))
;;            (let-exp '(f)
;;                     (list
;;                      (proc-exp '(y)
;;                                (diff-exp (var-exp 'x) (var-exp 'y))))
;;                     (let-exp '(x)
;;                              (list (const-exp 5))
;;                              (call-exp (var-exp 'f)
;;                                        (list (const-exp 1))))))))
;;
;; expected:
;;   (num-val 99)
;;
;; Semantic point:
;;   The procedure f uses the environment where it was created.
;;   If it used the caller's environment, the result would be 4.


;; LETREC countdown:
;;
;; (run
;;  (a-program
;;   (letrec-exp
;;    '(to-zero)
;;    (list '(n))
;;    (list
;;     (if-exp
;;      (zero?-exp (var-exp 'n))
;;      (const-exp 0)
;;      (call-exp (var-exp 'to-zero)
;;                (list (diff-exp (var-exp 'n) (const-exp 1))))))
;;    (call-exp (var-exp 'to-zero)
;;              (list (const-exp 4))))))
;;
;; expected:
;;   (num-val 0)
;;
;; Semantic point:
;;   apply-env constructs a closure whose saved env is the recursive env itself.


;;; ------------------------------------------------------------
;;; Test group B: EXPLICIT-REFS
;;; ------------------------------------------------------------

;; Explicit allocation, mutation, and dereference:
;;
;; (run
;;  (a-program
;;   (let-exp '(r)
;;            (list (newref-exp (const-exp 10)))
;;            (begin-exp
;;             (list
;;              (setref-exp (var-exp 'r) (const-exp 11))
;;              (deref-exp (var-exp 'r)))))))
;;
;; expected:
;;   (num-val 11)
;;
;; Trace:
;;   r is bound to a RefVal.
;;   setref changes the store cell.
;;   deref reads the current contents.


;; Explicit reference sharing:
;;
;; (run
;;  (a-program
;;   (let-exp '(r)
;;            (list (newref-exp (const-exp 0)))
;;            (let-exp '(inc)
;;                     (list
;;                      (proc-exp '()
;;                                (begin-exp
;;                                 (list
;;                                  (setref-exp
;;                                   (var-exp 'r)
;;                                   (diff-exp
;;                                    (deref-exp (var-exp 'r))
;;                                    (const-exp -1)))
;;                                  (deref-exp (var-exp 'r))))))
;;                     (begin-exp
;;                      (list
;;                       (call-exp (var-exp 'inc) '())
;;                       (call-exp (var-exp 'inc) '())))))))
;;
;; expected:
;;   (num-val 2)
;;
;; Semantic point:
;;   The closure shares the reference r with its defining environment.


;;; ------------------------------------------------------------
;;; Test group C: IMPLICIT-REFS
;;; ------------------------------------------------------------

;; Assignment to a variable:
;;
;; (run/implicit
;;  (a-program
;;   (let-exp '(x)
;;            (list (const-exp 10))
;;            (begin-exp
;;             (list
;;              (set-exp 'x (const-exp 12))
;;              (var-exp 'x))))))
;;
;; expected:
;;   (num-val 12)
;;
;; Trace:
;;   x -> location
;;   set changes store[location]
;;   var-exp dereferences location


;; Assignment inside a procedure does not mutate caller variable under call-by-value:
;;
;; (run/implicit
;;  (a-program
;;   (let-exp '(x)
;;            (list (const-exp 10))
;;            (let-exp '(f)
;;                     (list
;;                      (proc-exp '(y)
;;                                (begin-exp
;;                                 (list
;;                                  (set-exp 'y (const-exp 99))
;;                                  (var-exp 'y)))))
;;                     (begin-exp
;;                      (list
;;                       (call-exp (var-exp 'f) (list (var-exp 'x)))
;;                       (var-exp 'x)))))))
;;
;; expected:
;;   (num-val 10)
;;
;; Semantic point:
;;   call-exp allocates a fresh location for y.
;;   x and y do not alias.


;; Call-by-reference makes the formal alias the caller's variable:
;;
;; (run/implicit
;;  (a-program
;;   (let-exp '(x)
;;            (list (const-exp 10))
;;            (let-exp '(f)
;;                     (list
;;                      (proc-exp '(y)
;;                                (begin-exp
;;                                 (list
;;                                  (set-exp 'y (const-exp 99))
;;                                  (var-exp 'y)))))
;;                     (begin-exp
;;                      (list
;;                       (callref-exp (var-exp 'f) (list (var-exp 'x)))
;;                       (var-exp 'x)))))))
;;
;; expected:
;;   (num-val 99)
;;
;; Semantic point:
;;   callref-exp passes x's location to y.
;;   x and y now denote the same store cell.


;;; ------------------------------------------------------------
;;; Test group D: mutable pairs
;;; ------------------------------------------------------------

;; Mutable pair update:
;;
;; (run/implicit
;;  (a-program
;;   (let-exp '(p)
;;            (list (newpair-exp (const-exp 1) (const-exp 2)))
;;            (begin-exp
;;             (list
;;              (setleft-exp (var-exp 'p) (const-exp 10))
;;              (left-exp (var-exp 'p)))))))
;;
;; expected:
;;   (num-val 10)
;;
;; Semantic point:
;;   pair value contains two references.
;;   setleft mutates the left location; it does not rebuild the pair.


;;; ============================================================
;;; 13. Tracing checklist inside the program
;;; ============================================================
;;;
;;; For any expression, trace these columns:
;;;   EXP      = current abstract syntax
;;;   ENV      = variable -> DenVal
;;;   STORE    = reference -> ExpVal
;;;   RESULT   = ExpVal returned by value-of
;;;
;;; In the pure / explicit-reference evaluator:
;;;   DenVal = ExpVal
;;;
;;; In the implicit-reference evaluator:
;;;   DenVal = Ref(ExpVal)
;;;
;;; For procedures:
;;;   proc-exp  -> creates closure
;;;   call-exp  -> evaluates rator/rands
;;;   apply     -> extends saved env
;;;
;;; For LET:
;;;   parallel LET evaluates all RHS expressions in the old environment.
;;;   LET* evaluates each RHS in the environment extended by earlier bindings.
;;;
;;; For LETREC:
;;;   recursive name must be available in its own procedure body.
;;;   ordinary LET cannot provide this behavior.
;;;
;;; For references:
;;;   newref = allocate
;;;   deref  = read
;;;   setref = update
;;;
;;; Common mistakes:
;;;   - treating ExpVal as raw Scheme value
;;;   - treating reference as stored value
;;;   - updating the environment instead of the store
;;;   - using caller env instead of saved env for closures
;;;   - evaluating LET RHS in the extended environment
;;;   - forgetting to initialize the store for each run
;;; ============================================================
```
### Program 2. CPS Transformer / Control Model

This program compresses EOPL’s control line into one annotated source-to-source transformer. It starts from a small direct-style language and produces a CPS target language where continuations, evaluation order, tail form, effects, and administrative simplifications are visible in the generated abstract syntax.

```scheme
;;; ============================================================
;;; Program 2. CPS Transformer / Control Model
;;;
;;; This file is an annotated study implementation in EOPL style.
;;; It summarizes the control line behind:
;;;   - continuation-passing interpreters
;;;   - tail position vs operand position
;;;   - CPS-IN -> CPS-OUT translation
;;;   - SimpleExp vs TfExp
;;;   - fresh variable generation
;;;   - effect sequencing
;;;   - administrative redex reduction
;;;   - continuation sharing in conditionals
;;;
;;; Important separation:
;;;   CPS interpreter   = evaluator rewritten to receive continuations
;;;   CPS transformer   = source program rewritten into CPS target syntax
;;;
;;; Direct style:
;;;   expression returns its value implicitly to the surrounding context.
;;;
;;; CPS:
;;;   expression sends its value explicitly to a continuation.
;;;
;;; The main invariant of CPS-OUT:
;;;   procedure calls appear only in tail position.
;;;   SimpleExp must not hide a procedure call.
;;; ============================================================


;;; ============================================================
;;; 1. Source language: CPS-IN
;;; ============================================================
;;;
;;; These constructors build the source AST directly.
;;; A parser would normally create these nodes from concrete syntax.
;;;
;;; The source language is deliberately small but not minimal:
;;;   - pure expressions show operand-position control growth
;;;   - procedures show continuation-parameter insertion
;;;   - begin / print show effect sequencing
;;;   - explicit refs show why evaluation order matters
;;;   - letrec shows recursive CPS procedure generation
;;; ============================================================

(define (in-program body)
  (list 'in-program body))

(define (in-program-body pgm)
  (cadr pgm))


;;; Simple source expressions may become CPS-OUT SimpleExp
;;; if none of their subexpressions hides a call or effect.

(define (in-const n)
  (list 'in-const n))

(define (in-var var)
  (list 'in-var var))

(define (in-diff exp1 exp2)
  (list 'in-diff exp1 exp2))

(define (in-zero? exp1)
  (list 'in-zero? exp1))


;;; Control and binding forms.

(define (in-if test-exp true-exp false-exp)
  (list 'in-if test-exp true-exp false-exp))

(define (in-let vars rhss body)
  ;; Parallel LET:
  ;; all RHS expressions are evaluated in the current environment.
  ;; The body alone sees the new bindings.
  (list 'in-let vars rhss body))

(define (in-begin exps)
  ;; BEGIN makes sequencing visible.
  ;; In a pure language, earlier values may be discarded.
  ;; With print / refs, earlier expressions can have effects.
  (list 'in-begin exps))


;;; Procedure forms.

(define (in-proc params body)
  ;; In CPS-OUT, this procedure will receive one extra continuation parameter.
  (list 'in-proc params body))

(define (in-call rator rands)
  ;; General call:
  ;;   rator and rands are evaluated before the CPS call is emitted.
  ;;   the generated call passes the current continuation as the final argument.
  (list 'in-call rator rands))

(define (in-letrec pnames paramss pbodies body)
  ;; Recursive procedures must be transformed as CPS procedures.
  ;; Each recursive procedure receives its original parameters plus a continuation.
  (list 'in-letrec pnames paramss pbodies body))


;;; Effect forms.
;;;
;;; Effects are not SimpleExp even if their operands are simple.
;;; CPS must preserve their order.

(define (in-print exp1)
  ;; Convention: print returns the printed value to the continuation.
  ;; Some EOPL exercises use a fixed return value such as 1; either choice
  ;; is a language-design decision, not a CPS requirement.
  (list 'in-print exp1))

(define (in-newref exp1)
  ;; Allocation is an effect: it changes the store by adding a new location.
  (list 'in-newref exp1))

(define (in-deref exp1)
  ;; Reading the store is sequenced because the store may have changed earlier.
  (list 'in-deref exp1))

(define (in-setref ref-exp val-exp)
  ;; Assignment is an effect and must not be reordered across other effects.
  (list 'in-setref ref-exp val-exp))


;;; ============================================================
;;; 2. Target language: CPS-OUT
;;; ============================================================
;;;
;;; CPS-OUT is split into:
;;;   SimpleExp = no procedure call hidden inside
;;;   TfExp     = tail-form expression
;;;
;;; A call in CPS-OUT is legal only when it is a TfExp.
;;; This is the grammar-level discipline that prevents hidden control growth.
;;; ============================================================

(define (cps-program body)
  (list 'cps-program body))

(define (cps-program-body pgm)
  (cadr pgm))


;;; ------------------------------------------------------------
;;; 2.1 CPS-OUT SimpleExp
;;; ------------------------------------------------------------

(define (cps-const n)
  (list 'cps-const n))

(define (cps-var var)
  (list 'cps-var var))

(define (cps-diff simple1 simple2)
  ;; Both operands must already be simple.
  (list 'cps-diff simple1 simple2))

(define (cps-zero? simple1)
  (list 'cps-zero? simple1))

(define (cps-proc params body)
  ;; BODY is a TfExp.
  ;; A continuation itself is often represented as a one-argument CPS proc.
  (list 'cps-proc params body))


;;; ------------------------------------------------------------
;;; 2.2 CPS-OUT TfExp
;;; ------------------------------------------------------------

(define (cps-call rator rands)
  ;; This is a tail-form call.
  ;; RATOR and every RAND must be SimpleExp.
  (list 'cps-call rator rands))

(define (cps-if test-simple true-tf false-tf)
  ;; TEST must be SimpleExp.
  ;; Both branches are TfExp and receive the same logical continuation.
  (list 'cps-if test-simple true-tf false-tf))

(define (cps-let var simple body-tf)
  ;; Administrative binding form in the target language.
  ;; It names an intermediate SimpleExp and continues with a TfExp.
  (list 'cps-let var simple body-tf))

(define (cps-letrec pnames paramss pbodies body)
  ;; Each PBODY is already a CPS tail-form body.
  (list 'cps-letrec pnames paramss pbodies body))

(define (cps-print simple cont)
  ;; Print is kept as a target tail-form effect.
  ;; After the effect, SIMPLE is sent to CONT.
  (list 'cps-print simple cont))

(define (cps-newref simple cont)
  ;; Allocate a reference to SIMPLE, then send the reference to CONT.
  (list 'cps-newref simple cont))

(define (cps-deref simple cont)
  ;; Dereference SIMPLE, then send the store contents to CONT.
  (list 'cps-deref simple cont))

(define (cps-setref ref-simple val-simple cont)
  ;; Update REF-SIMPLE with VAL-SIMPLE, then send a void-like result to CONT.
  (list 'cps-setref ref-simple val-simple cont))


;;; ============================================================
;;; 3. Fresh variables
;;; ============================================================
;;;
;;; CPS introduces names for intermediate values.
;;; These names are not source-level names; they are generated by translation.
;;;
;;; Freshness matters:
;;;   a generated variable must not capture or collide with a source variable.
;;; ============================================================

(define fresh-counter 0)

(define (reset-fresh-counter!)
  (set! fresh-counter 0))

(define (fresh-var prefix)
  (set! fresh-counter (+ fresh-counter 1))
  (string->symbol
   (string-append prefix
                  (number->string fresh-counter))))

(define (fresh-k)
  (fresh-var "k"))

(define (fresh-v)
  (fresh-var "v"))

(define (fresh-t)
  (fresh-var "t"))


;;; ============================================================
;;; 4. Source simplicity analysis
;;; ============================================================
;;;
;;; simple? is a static syntactic classifier.
;;;
;;; A source expression is simple only if translating it does not require
;;; building a continuation or sequencing an effect.
;;;
;;; Procedure expression is simple as a value, but its body is not ignored:
;;; the body is transformed into CPS when cps-of-simple-exp sees in-proc.
;;; ============================================================

(define (simple? exp)
  (case (car exp)

    ((in-const in-var)
     #t)

    ((in-diff)
     (and (simple? (cadr exp))
          (simple? (caddr exp))))

    ((in-zero?)
     (simple? (cadr exp)))

    ((in-proc)
     #t)

    ;; These forms are not simple because they require control sequencing.
    ((in-if in-let in-begin in-call in-letrec)
     #f)

    ;; Effects are not simple even if their operands are simple.
    ((in-print in-newref in-deref in-setref)
     #f)

    (else
     (error "Unknown source expression -- SIMPLE?" exp))))


;;; ============================================================
;;; 5. Target shape predicates
;;; ============================================================
;;;
;;; These predicates are not required for translation, but they make the
;;; target invariant checkable.
;;;
;;; A study implementation should include them because they expose what the
;;; grammar is meant to enforce.
;;; ============================================================

(define (cps-simple? exp)
  (and (pair? exp)
       (case (car exp)
         ((cps-const cps-var)
          #t)
         ((cps-diff)
          (and (cps-simple? (cadr exp))
               (cps-simple? (caddr exp))))
         ((cps-zero?)
          (cps-simple? (cadr exp)))
         ((cps-proc)
          ;; A CPS procedure is a value.
          ;; Its body must be tail-form.
          (cps-tf? (caddr exp)))
         (else
          #f))))

(define (cps-tf? exp)
  (and (pair? exp)
       (case (car exp)
         ((cps-call)
          (and (cps-simple? (cadr exp))
               (all? cps-simple? (caddr exp))))
         ((cps-if)
          (and (cps-simple? (cadr exp))
               (cps-tf? (caddr exp))
               (cps-tf? (cadddr exp))))
         ((cps-let)
          (and (cps-simple? (caddr exp))
               (cps-tf? (cadddr exp))))
         ((cps-letrec)
          (and (all? cps-tf? (cadddr exp))
               (cps-tf? (list-ref exp 4))))
         ((cps-print cps-newref cps-deref)
          (and (cps-simple? (cadr exp))
               (cps-simple? (caddr exp))))
         ((cps-setref)
          (and (cps-simple? (cadr exp))
               (cps-simple? (caddr exp))
               (cps-simple? (cadddr exp))))
         (else
          #f))))

(define (all? pred xs)
  (cond ((null? xs) #t)
        ((pred (car xs)) (all? pred (cdr xs)))
        (else #f)))


;;; ============================================================
;;; 6. Program-level translation
;;; ============================================================
;;;
;;; The whole program is translated under a distinguished continuation k0.
;;; The runtime system is expected to provide k0.
;;;
;;; This makes the top-level result explicit:
;;;   source result -> k0
;;; ============================================================

(define (cps-of-program pgm)
  (reset-fresh-counter!)
  (cps-program
   (cps-of-exp (in-program-body pgm)
               (cps-var 'k0))))


;;; ============================================================
;;; 7. Translating SimpleExp
;;; ============================================================
;;;
;;; cps-of-simple-exp must not generate CPS calls.
;;; It translates call-free source syntax into call-free target syntax.
;;;
;;; If this function ever emits cps-call, the SimpleExp / TfExp boundary
;;; has been broken.
;;; ============================================================

(define (cps-of-simple-exp exp)
  (case (car exp)

    ((in-const)
     (cps-const (cadr exp)))

    ((in-var)
     (cps-var (cadr exp)))

    ((in-diff)
     (cps-diff
      (cps-of-simple-exp (cadr exp))
      (cps-of-simple-exp (caddr exp))))

    ((in-zero?)
     (cps-zero?
      (cps-of-simple-exp (cadr exp))))

    ((in-proc)
     (let ((params (cadr exp))
           (body   (caddr exp)))
       (let ((k (fresh-k)))
         ;; A CPS procedure receives:
         ;;   original parameters + continuation parameter
         ;;
         ;; The body does not return normally.
         ;; It sends its result to k.
         (cps-proc
          (append params (list k))
          (cps-of-exp body (cps-var k))))))

    (else
     (error "Not a simple source expression -- CPS-OF-SIMPLE-EXP" exp))))


;;; ============================================================
;;; 8. Continuation application and administrative reduction
;;; ============================================================
;;;
;;; make-send-to-cont implements:
;;;   send SIMPLE to CONT
;;;
;;; Naive CPS would always generate:
;;;   (cont simple)
;;;
;;; But if CONT is syntactically a one-argument CPS procedure, the call is an
;;; administrative redex. It can be reduced to a target let:
;;;   ((proc (x) body) simple)  ->  let x = simple in body
;;;
;;; This optimization changes generated code shape, not meaning.
;;; ============================================================

(define (make-send-to-cont cont simple)
  (cond ((one-arg-cps-proc? cont)
         (let ((var  (car (cadr cont)))
               (body (caddr cont)))
           (cps-let var simple body)))
        (else
         (cps-call cont (list simple)))))

(define (one-arg-cps-proc? exp)
  (and (pair? exp)
       (eq? (car exp) 'cps-proc)
       (= (length (cadr exp)) 1)))


;;; ============================================================
;;; 9. Sharing continuations across conditionals
;;; ============================================================
;;;
;;; A conditional translates both branches under the same logical continuation.
;;; If that continuation is large and syntactically duplicated, nested IFs can
;;; cause code growth.
;;;
;;; Strategy:
;;;   - if CONT is a variable, it is cheap to duplicate
;;;   - otherwise bind it once to a fresh variable and use that variable
;;;
;;; This is a code-size optimization, not a semantic change.
;;; ============================================================

(define (cps-var? exp)
  (and (pair? exp)
       (eq? (car exp) 'cps-var)))

(define (with-shared-cont cont builder)
  ;; BUILDER receives a continuation expression safe to duplicate.
  (if (cps-var? cont)
      (builder cont)
      (let ((k (fresh-k)))
        (cps-let k cont
                 (builder (cps-var k))))))


;;; ============================================================
;;; 10. Main CPS translation
;;; ============================================================
;;;
;;; Contract:
;;;   cps-of-exp : SourceExp * SimpleExp(cont) -> TfExp
;;;
;;; Meaning:
;;;   translate EXP so that its value is delivered to CONT.
;;;
;;; If EXP is simple, translation is just "send to continuation".
;;; If EXP is not simple, translation constructs the control context explicitly.
;;; ============================================================

(define (cps-of-exp exp cont)
  (if (simple? exp)
      (make-send-to-cont cont (cps-of-simple-exp exp))
      (case (car exp)

        ((in-if)
         (cps-of-if-exp exp cont))

        ((in-let)
         (cps-of-let-exp exp cont))

        ((in-begin)
         (cps-of-begin-exp exp cont))

        ((in-call)
         (cps-of-call-exp exp cont))

        ((in-letrec)
         (cps-of-letrec-exp exp cont))

        ((in-print)
         (cps-of-print-exp exp cont))

        ((in-newref)
         (cps-of-newref-exp exp cont))

        ((in-deref)
         (cps-of-deref-exp exp cont))

        ((in-setref)
         (cps-of-setref-exp exp cont))

        (else
         (error "Unsupported non-simple expression -- CPS-OF-EXP" exp)))))


;;; ============================================================
;;; 11. Translating IF
;;; ============================================================
;;;
;;; The test must be evaluated before branch selection.
;;; Only one branch runs at runtime, but both branches must be translated.
;;;
;;; The continuation is the same logical continuation for both branches.
;;; ============================================================

(define (cps-of-if-exp exp cont)
  (let ((test-exp  (cadr exp))
        (true-exp  (caddr exp))
        (false-exp (cadddr exp)))
    (with-shared-cont
     cont
     (lambda (shared-cont)
       (cps-of-exp
        test-exp
        (cps-proc
         (list (fresh-t))
         ;; The fresh test variable must be recovered from the continuation proc.
         ;; This helper avoids duplicating the test translation logic.
         (let ((test-var (last-generated-name)))
           (cps-if
            (cps-var test-var)
            (cps-of-exp true-exp shared-cont)
            (cps-of-exp false-exp shared-cont)))))))))

;;; The previous direct construction needs the generated test variable.
;;; To avoid relying on mutable generator internals, use a clearer version.
;;; This replacement is the one intended for actual use.

(define (cps-of-if-exp exp cont)
  (let ((test-exp  (cadr exp))
        (true-exp  (caddr exp))
        (false-exp (cadddr exp)))
    (with-shared-cont
     cont
     (lambda (shared-cont)
       (if (simple? test-exp)
           (cps-if
            (cps-of-simple-exp test-exp)
            (cps-of-exp true-exp shared-cont)
            (cps-of-exp false-exp shared-cont))
           (let ((test-var (fresh-t)))
             (cps-of-exp
              test-exp
              (cps-proc
               (list test-var)
               (cps-if
                (cps-var test-var)
                (cps-of-exp true-exp shared-cont)
                (cps-of-exp false-exp shared-cont)))))))))))


;;; ============================================================
;;; 12. Translating LET
;;; ============================================================
;;;
;;; Parallel LET:
;;;   all RHS expressions are evaluated in the source environment.
;;;
;;; In CPS translation:
;;;   evaluate all RHS expressions left-to-right,
;;;   bind their resulting simple values,
;;;   then translate the body under the original continuation.
;;; ============================================================

(define (cps-of-let-exp exp cont)
  (let ((vars (cadr exp))
        (rhss (caddr exp))
        (body (cadddr exp)))
    (cps-of-exps
     rhss
     (lambda (rhs-simples)
       (make-cps-lets vars
                      rhs-simples
                      (cps-of-exp body cont))))))

(define (make-cps-lets vars simples body)
  ;; Build nested cps-let forms.
  ;; This target representation is sequential, but the RHS simples have
  ;; already been computed using the source LET's parallel evaluation rule.
  (cond ((and (null? vars) (null? simples))
         body)
        ((or (null? vars) (null? simples))
         (error "Mismatched LET variables and values -- MAKE-CPS-LETS"
                (list vars simples)))
        (else
         (cps-let (car vars)
                  (car simples)
                  (make-cps-lets (cdr vars)
                                 (cdr simples)
                                 body)))))


;;; ============================================================
;;; 13. Translating BEGIN
;;; ============================================================
;;;
;;; BEGIN is a sequencing form.
;;; Earlier expressions are evaluated for effects and their values are discarded.
;;;
;;; In CPS, "discard the value and continue" is represented by a continuation
;;; that ignores its parameter and translates the rest of the sequence.
;;; ============================================================

(define (cps-of-begin-exp exp cont)
  (cps-of-sequence (cadr exp) cont))

(define (cps-of-sequence exps cont)
  (cond ((null? exps)
         ;; Empty sequence sends an arbitrary void-like constant.
         ;; A richer target language could have an explicit void value.
         (make-send-to-cont cont (cps-const 0)))
        ((null? (cdr exps))
         (cps-of-exp (car exps) cont))
        (else
         (let ((ignored (fresh-var "ignored")))
           (cps-of-exp
            (car exps)
            (cps-proc
             (list ignored)
             (cps-of-sequence (cdr exps) cont)))))))


;;; ============================================================
;;; 14. Translating procedure calls
;;; ============================================================
;;;
;;; Source:
;;;   (rator rand1 ... randn)
;;;
;;; CPS target:
;;;   rator-cps(rand1-cps, ..., randn-cps, cont)
;;;
;;; The target call is emitted as a TfExp, so it is in tail position.
;;; The rator and all rands must first be reduced to SimpleExp.
;;; ============================================================

(define (cps-of-call-exp exp cont)
  (let ((rator (cadr exp))
        (rands (caddr exp)))
    (cps-of-exps
     (cons rator rands)
     (lambda (simples)
       (let ((rator-simple (car simples))
             (rand-simples (cdr simples)))
         (cps-call rator-simple
                   (append rand-simples
                           (list cont))))))))


;;; ============================================================
;;; 15. Translating LETREC
;;; ============================================================
;;;
;;; Each recursive procedure body is transformed with a fresh continuation
;;; parameter appended to the original parameters.
;;;
;;; This preserves the recursive binding structure while making control explicit.
;;; ============================================================

(define (cps-of-letrec-exp exp cont)
  (let ((pnames  (cadr exp))
        (paramss (caddr exp))
        (pbodies (cadddr exp))
        (body    (list-ref exp 4)))
    (let ((new-paramss '())
          (new-bodies '()))
      (let ((converted
             (map2
              (lambda (params body-exp)
                (let ((k (fresh-k)))
                  (list (append params (list k))
                        (cps-of-exp body-exp (cps-var k)))))
              paramss
              pbodies)))
        (cps-letrec
         pnames
         (map car converted)
         (map cadr converted)
         (cps-of-exp body cont))))))

(define (map2 f xs ys)
  (cond ((and (null? xs) (null? ys))
         '())
        ((or (null? xs) (null? ys))
         (error "Mismatched lists -- MAP2" (list xs ys)))
        (else
         (cons (f (car xs) (car ys))
               (map2 f (cdr xs) (cdr ys))))))


;;; ============================================================
;;; 16. Operand sequencing helper
;;; ============================================================
;;;
;;; cps-of-exps evaluates a list of source expressions from left to right.
;;;
;;; BUILDER receives translated SimpleExp values in the original order.
;;;
;;; This is where the transformer fixes evaluation order.
;;; If the source language leaves operand order unspecified, this is a
;;; language-design choice. If the source language specifies left-to-right
;;; order, this function preserves it.
;;; ============================================================

(define (cps-of-exps exps builder)
  (cond ((null? exps)
         (builder '()))
        ((simple? (car exps))
         (cps-of-exps
          (cdr exps)
          (lambda (simple-rest)
            (builder
             (cons (cps-of-simple-exp (car exps))
                   simple-rest)))))
        (else
         (let ((v (fresh-v)))
           (cps-of-exp
            (car exps)
            (cps-proc
             (list v)
             (cps-of-exps
              (cdr exps)
              (lambda (simple-rest)
                (builder
                 (cons (cps-var v)
                       simple-rest))))))))))


;;; ============================================================
;;; 17. Translating effects
;;; ============================================================
;;;
;;; Effects are not simple.
;;; Their operands must be evaluated first, then the target effect form
;;; runs in tail position and sends its result to the continuation.
;;;
;;; This is where CPS makes sequencing observable.
;;; ============================================================

(define (cps-of-print-exp exp cont)
  (let ((arg-exp (cadr exp)))
    (cps-of-exp
     arg-exp
     (cps-proc
      (list (fresh-v))
      (let ((v (last-generated-name)))
        ;; This branch is kept only as a warning:
        ;; do not depend on generator state to recover names.
        ;; The actual implementation below avoids this pattern.
        (cps-print (cps-var v) cont))))))

;;; Clear version for actual use.

(define (cps-of-print-exp exp cont)
  (let ((arg-exp (cadr exp)))
    (if (simple? arg-exp)
        (cps-print (cps-of-simple-exp arg-exp) cont)
        (let ((v (fresh-v)))
          (cps-of-exp
           arg-exp
           (cps-proc
            (list v)
            (cps-print (cps-var v) cont)))))))

(define (cps-of-newref-exp exp cont)
  (let ((arg-exp (cadr exp)))
    (if (simple? arg-exp)
        (cps-newref (cps-of-simple-exp arg-exp) cont)
        (let ((v (fresh-v)))
          (cps-of-exp
           arg-exp
           (cps-proc
            (list v)
            (cps-newref (cps-var v) cont)))))))

(define (cps-of-deref-exp exp cont)
  (let ((ref-exp (cadr exp)))
    (if (simple? ref-exp)
        (cps-deref (cps-of-simple-exp ref-exp) cont)
        (let ((v (fresh-v)))
          (cps-of-exp
           ref-exp
           (cps-proc
            (list v)
            (cps-deref (cps-var v) cont)))))))

(define (cps-of-setref-exp exp cont)
  (let ((ref-exp (cadr exp))
        (val-exp (caddr exp)))
    (cps-of-exps
     (list ref-exp val-exp)
     (lambda (simples)
       (cps-setref (car simples)
                   (cadr simples)
                   cont)))))


;;; ============================================================
;;; 18. A-normal form comparison hook
;;; ============================================================
;;;
;;; ANF and CPS both make evaluation order visible.
;;;
;;; Difference:
;;;   ANF names intermediate values with LET.
;;;   CPS names the rest of computation with continuations.
;;;
;;; This hook is intentionally not a full ANF transformer.
;;; It marks where a reader can compare ANF with CPS after understanding
;;; cps-of-exps and make-send-to-cont.
;;; ============================================================

(define (anf-comparison-note)
  'anf-names-intermediate-values-cps-names-continuations)


;;; ============================================================
;;; 19. Defunctionalization hook
;;; ============================================================
;;;
;;; A CPS transformer often creates continuation procedures.
;;; Defunctionalization would replace those procedures with data constructors
;;; and an apply-cont function.
;;;
;;; This mirrors the movement:
;;;   procedural continuation representation
;;;     -> data-structure continuation representation
;;;     -> registerized / machine-like control
;;; ============================================================

(define (defunctionalization-note)
  'replace-continuation-procedures-with-tags-and-apply-cont)


;;; ============================================================
;;; 20. Pretty printer / inspection helpers
;;; ============================================================
;;;
;;; The transformer returns structured target AST, not concrete syntax.
;;; Keeping the AST visible is useful for tracing invariants.
;;; ============================================================

(define (show x) x)

(define (check-cps-program pgm)
  ;; Check that the target body satisfies the CPS-OUT tail-form discipline.
  (let ((body (cps-program-body pgm)))
    (if (cps-tf? body)
        'ok
        (error "CPS output is not tail-form -- CHECK-CPS-PROGRAM" body))))


;;; ============================================================
;;; 21. Minimal tests
;;; ============================================================
;;;
;;; These tests are AST-shape tests, not parser tests.
;;; Each test targets one CPS concept.
;;; ============================================================


;;; ------------------------------------------------------------
;;; Test group A: simple expression
;;; ------------------------------------------------------------

;; (show
;;  (cps-of-program
;;   (in-program
;;    (in-diff (in-const 10) (in-const 3)))))
;;
;; expected shape:
;;   (cps-program
;;     (cps-call (cps-var k0)
;;               ((cps-diff (cps-const 10) (cps-const 3)))))
;;
;; Semantic point:
;;   A simple expression is translated and sent to k0.
;;   No hidden procedure call appears in the CPS diff expression.


;;; ------------------------------------------------------------
;;; Test group B: procedure expression
;;; ------------------------------------------------------------

;; (show
;;  (cps-of-program
;;   (in-program
;;    (in-proc '(x)
;;             (in-diff (in-var 'x) (in-const 1))))))
;;
;; expected shape:
;;   procedure parameters become (x kN)
;;   body sends (- x 1) to kN
;;
;; Semantic point:
;;   Direct-style return is replaced by continuation application.


;;; ------------------------------------------------------------
;;; Test group C: procedure call
;;; ------------------------------------------------------------

;; (show
;;  (cps-of-program
;;   (in-program
;;    (in-call
;;     (in-proc '(x)
;;              (in-diff (in-var 'x) (in-const 1)))
;;     (list (in-const 10))))))
;;
;; expected shape:
;;   the generated call is tail-form:
;;     cps-rator(cps-rand, k0)
;;
;; Semantic point:
;;   The call does not return to an implicit context.
;;   It receives k0 explicitly.


;;; ------------------------------------------------------------
;;; Test group D: non-simple operand
;;; ------------------------------------------------------------

;; (show
;;  (cps-of-program
;;   (in-program
;;    (in-diff
;;     (in-call
;;      (in-proc '(x) (in-var 'x))
;;      (list (in-const 5)))
;;     (in-const 1)))))
;;
;; expected shape:
;;   the call in operand position is evaluated first.
;;   its result is named by a fresh variable vN.
;;   then (vN - 1) is sent to k0.
;;
;; Semantic point:
;;   Operand position grows control context.
;;   CPS makes the pending subtraction explicit.


;;; ------------------------------------------------------------
;;; Test group E: IF and continuation sharing
;;; ------------------------------------------------------------

;; (show
;;  (cps-of-program
;;   (in-program
;;    (in-if
;;     (in-zero? (in-const 0))
;;     (in-const 42)
;;     (in-const 7)))))
;;
;; expected shape:
;;   cps-if with both branches sending to k0
;;
;; Semantic point:
;;   Runtime evaluates one branch.
;;   Translation processes both branches.


;;; ------------------------------------------------------------
;;; Test group F: BEGIN and PRINT
;;; ------------------------------------------------------------

;; (show
;;  (cps-of-program
;;   (in-program
;;    (in-begin
;;     (list
;;      (in-print (in-const 1))
;;      (in-print (in-const 2))
;;      (in-const 3))))))
;;
;; expected shape:
;;   print 1 happens before print 2,
;;   both happen before sending 3 to k0.
;;
;; Semantic point:
;;   Effects make sequencing observable.
;;   CPS represents that order through nested continuations.


;;; ------------------------------------------------------------
;;; Test group G: explicit references
;;; ------------------------------------------------------------

;; (show
;;  (cps-of-program
;;   (in-program
;;    (in-let '(r)
;;            (list (in-newref (in-const 0)))
;;            (in-begin
;;             (list
;;              (in-setref (in-var 'r) (in-const 10))
;;              (in-deref (in-var 'r))))))))
;;
;; expected shape:
;;   allocation occurs before assignment,
;;   assignment occurs before dereference,
;;   dereference result is sent to k0.
;;
;; Semantic point:
;;   Store effects cannot be treated as simple expressions.


;;; ------------------------------------------------------------
;;; Test group H: LETREC
;;; ------------------------------------------------------------

;; (show
;;  (cps-of-program
;;   (in-program
;;    (in-letrec
;;     '(to-zero)
;;     (list '(n))
;;     (list
;;      (in-if
;;       (in-zero? (in-var 'n))
;;       (in-const 0)
;;       (in-call
;;        (in-var 'to-zero)
;;        (list (in-diff (in-var 'n) (in-const 1))))))
;;     (in-call (in-var 'to-zero)
;;              (list (in-const 4)))))))
;;
;; expected shape:
;;   recursive procedure to-zero receives parameters (n kN)
;;   recursive calls pass the current continuation explicitly.
;;
;; Semantic point:
;;   CPS preserves recursive binding while making return control explicit.


;;; ============================================================
;;; 22. Tracing checklist inside the program
;;; ============================================================
;;;
;;; For any source expression, trace:
;;;   SOURCE EXP      = original AST
;;;   POSITION        = tail position or operand position
;;;   CONT            = current continuation expression
;;;   SIMPLE?         = whether the expression can be translated call-free
;;;   TARGET TFEXP    = generated tail-form expression
;;;
;;; For calls:
;;;   rator and rands -> SimpleExp values -> cps-call with CONT as final arg
;;;
;;; For procedures:
;;;   source params -> source params + fresh continuation param
;;;   body translated under that continuation
;;;
;;; For if:
;;;   test evaluated first
;;;   both branches translated
;;;   same logical continuation used in both branches
;;;   large continuations should be shared
;;;
;;; For effects:
;;;   source effect order must be preserved
;;;   print / newref / deref / setref are not SimpleExp
;;;
;;; Common mistakes:
;;;   - treating CPS conversion as "just add one argument"
;;;   - allowing calls inside SimpleExp
;;;   - forgetting that operand position creates pending work
;;;   - translating procedure bodies without a continuation parameter
;;;   - changing the source evaluation order accidentally
;;;   - duplicating large continuations in nested conditionals
;;;   - confusing CPS interpreter with CPS transformer
;;; ============================================================
```

### Program 3. Type Checker / Type Inferencer

This program compresses EOPL’s static-analysis line into one annotated study implementation. It uses the same abstract-syntax discipline as the evaluator, but computes `Type` instead of `ExpVal`. The first half is a checked type system with explicit annotations; the second half is an inference engine using fresh type variables, substitutions, unification, and an occurrence check.

```scheme
;;; ============================================================
;;; Program 3. Type Checker / Type Inferencer
;;;
;;; This file is an annotated study implementation in EOPL style.
;;; It summarizes the static-analysis line behind:
;;;   - CHECKED
;;;   - INFERRED
;;;   - type environments
;;;   - procedure types
;;;   - pair / list / reference types
;;;   - optional annotations
;;;   - type equations
;;;   - substitutions
;;;   - unification
;;;   - occurrence check
;;;
;;; Important separation:
;;;   runtime value    = value produced by an interpreter
;;;   static type      = description computed before execution
;;;
;;; The type checker traverses the same abstract syntax as an evaluator,
;;; but it computes Type instead of ExpVal.
;;;
;;; Runtime:
;;;   expression + environment -> ExpVal
;;;
;;; Static checking:
;;;   expression + type environment -> Type
;;;
;;; Type inference:
;;;   expression + type environment + substitution -> Type + substitution
;;;
;;; Module checking and object-oriented checking extend this same discipline:
;;;   module interface checking = type checking across component boundaries
;;;   OO type checking          = type checking with class/interface environments
;;; ============================================================


;;; ============================================================
;;; 1. Abstract syntax
;;; ============================================================
;;;
;;; The parser is omitted.
;;; Programs are built directly as abstract syntax.
;;;
;;; CHECKED and INFERRED share most syntax.
;;; In CHECKED, procedure parameters and letrec results usually carry Types.
;;; In INFERRED, the same fields may contain no-type and become fresh type vars.
;;; ============================================================

(define (a-program body)
  (list 'a-program body))

(define (program-body pgm)
  (cadr pgm))


;;; Basic expressions.

(define (const-exp n)
  (list 'const-exp n))

(define (var-exp var)
  (list 'var-exp var))

(define (diff-exp exp1 exp2)
  (list 'diff-exp exp1 exp2))

(define (zero?-exp exp1)
  (list 'zero?-exp exp1))

(define (if-exp test-exp true-exp false-exp)
  (list 'if-exp test-exp true-exp false-exp))


;;; Binding and procedure expressions.

(define (let-exp vars rhss body)
  ;; Parallel LET:
  ;; all RHS expressions are checked or inferred in the old type environment.
  ;; the BODY sees all new type bindings.
  (list 'let-exp vars rhss body))

(define (proc-exp params param-types body)
  ;; CHECKED:
  ;;   PARAM-TYPES are declared types.
  ;;
  ;; INFERRED:
  ;;   PARAM-TYPES may contain no-type, which becomes fresh type variables.
  (list 'proc-exp params param-types body))

(define (call-exp rator rands)
  ;; The rator must have a procedure type.
  ;; The rands must match the procedure's argument types.
  (list 'call-exp rator rands))

(define (letrec-exp pnames paramss param-typess result-types pbodies body)
  ;; Recursive procedures must be placed into the type environment before
  ;; checking their own bodies.
  ;;
  ;; CHECKED:
  ;;   parameter and result types are declared.
  ;;
  ;; INFERRED:
  ;;   some or all declarations may be no-type.
  (list 'letrec-exp pnames paramss param-typess result-types pbodies body))


;;; Pair expressions.

(define (pair-exp exp1 exp2)
  (list 'pair-exp exp1 exp2))

(define (unpair-exp var1 var2 pair-exp body)
  ;; Destructuring a pair extends the type environment with both component types.
  (list 'unpair-exp var1 var2 pair-exp body))


;;; List expressions.

(define (emptylist-exp elem-type)
  ;; CHECKED often requires an element type for empty lists.
  ;; INFERRED may use no-type and allocate a fresh element type.
  (list 'emptylist-exp elem-type))

(define (cons-exp first-exp rest-exp)
  (list 'cons-exp first-exp rest-exp))

(define (null?-exp list-exp)
  (list 'null?-exp list-exp))

(define (car-exp list-exp)
  (list 'car-exp list-exp))

(define (cdr-exp list-exp)
  (list 'cdr-exp list-exp))


;;; Reference expressions.

(define (newref-exp exp1)
  (list 'newref-exp exp1))

(define (deref-exp exp1)
  (list 'deref-exp exp1))

(define (setref-exp ref-exp val-exp)
  ;; setref returns void; its main result is a store effect.
  (list 'setref-exp ref-exp val-exp))


;;; ============================================================
;;; 2. Type representation
;;; ============================================================
;;;
;;; Type is a static domain.
;;; It is not an ExpVal and not a Scheme value used at runtime.
;;;
;;; Constructors hide the representation of types.
;;; Checkers and inferencers should use predicates/selectors rather than
;;; raw list indexing where practical.
;;; ============================================================

(define (int-type)
  (list 'int-type))

(define (bool-type)
  (list 'bool-type))

(define (void-type)
  (list 'void-type))

(define (proc-type arg-types result-type)
  ;; Multiargument procedure type:
  ;;   (t1 * ... * tn -> t)
  (list 'proc-type arg-types result-type))

(define (pair-type left-type right-type)
  (list 'pair-type left-type right-type))

(define (list-type elem-type)
  (list 'list-type elem-type))

(define (ref-type elem-type)
  ;; refto t
  (list 'ref-type elem-type))

(define (tvar-type name)
  ;; Type variable used by INFERRED.
  (list 'tvar-type name))

(define (no-type)
  ;; Surface marker for omitted type annotations.
  ;; The inferencer turns it into a fresh tvar-type.
  (list 'no-type))


;;; Type predicates.

(define (int-type? ty)   (tagged? ty 'int-type))
(define (bool-type? ty)  (tagged? ty 'bool-type))
(define (void-type? ty)  (tagged? ty 'void-type))
(define (proc-type? ty)  (tagged? ty 'proc-type))
(define (pair-type? ty)  (tagged? ty 'pair-type))
(define (list-type? ty)  (tagged? ty 'list-type))
(define (ref-type? ty)   (tagged? ty 'ref-type))
(define (tvar-type? ty)  (tagged? ty 'tvar-type))
(define (no-type? ty)    (tagged? ty 'no-type))

(define (tagged? datum tag)
  (and (pair? datum)
       (eq? (car datum) tag)))


;;; Type selectors.

(define (proc-type-arg-types ty)
  (cadr ty))

(define (proc-type-result-type ty)
  (caddr ty))

(define (pair-type-left ty)
  (cadr ty))

(define (pair-type-right ty)
  (caddr ty))

(define (list-type-elem ty)
  (cadr ty))

(define (ref-type-elem ty)
  (cadr ty))

(define (tvar-type-name ty)
  (cadr ty))


;;; Structural equality for fully known types.
;;;
;;; This is not unification.
;;; Equality checking only compares already-known types.
;;; Unification solves equations that may contain type variables.

(define (type=? ty1 ty2)
  (cond ((and (int-type? ty1)  (int-type? ty2))  #t)
        ((and (bool-type? ty1) (bool-type? ty2)) #t)
        ((and (void-type? ty1) (void-type? ty2)) #t)

        ((and (tvar-type? ty1) (tvar-type? ty2))
         (eq? (tvar-type-name ty1)
              (tvar-type-name ty2)))

        ((and (proc-type? ty1) (proc-type? ty2))
         (and (type-list=? (proc-type-arg-types ty1)
                           (proc-type-arg-types ty2))
              (type=? (proc-type-result-type ty1)
                      (proc-type-result-type ty2))))

        ((and (pair-type? ty1) (pair-type? ty2))
         (and (type=? (pair-type-left ty1)
                      (pair-type-left ty2))
              (type=? (pair-type-right ty1)
                      (pair-type-right ty2))))

        ((and (list-type? ty1) (list-type? ty2))
         (type=? (list-type-elem ty1)
                 (list-type-elem ty2)))

        ((and (ref-type? ty1) (ref-type? ty2))
         (type=? (ref-type-elem ty1)
                 (ref-type-elem ty2)))

        (else #f)))

(define (type-list=? tys1 tys2)
  (cond ((and (null? tys1) (null? tys2)) #t)
        ((or (null? tys1) (null? tys2)) #f)
        (else
         (and (type=? (car tys1) (car tys2))
              (type-list=? (cdr tys1) (cdr tys2))))))


;;; ============================================================
;;; 3. Type environment
;;; ============================================================
;;;
;;; Runtime environment != type environment.
;;;
;;; Runtime environment:
;;;   variable -> DenVal
;;;
;;; Type environment:
;;;   variable -> Type
;;;
;;; The checker never runs the program and never needs runtime values.
;;; ============================================================

(define (empty-tenv)
  (list 'empty-tenv))

(define (extend-tenv var ty saved-tenv)
  (list 'extend-tenv var ty saved-tenv))

(define (extend-tenv* vars tys saved-tenv)
  (cond ((and (null? vars) (null? tys))
         saved-tenv)
        ((or (null? vars) (null? tys))
         (error "Mismatched variables and types -- EXTEND-TENV*"
                (list vars tys)))
        (else
         (extend-tenv (car vars)
                      (car tys)
                      (extend-tenv* (cdr vars)
                                    (cdr tys)
                                    saved-tenv)))))

(define (extend-tenv-with-procs pnames proc-types tenv)
  ;; LETREC needs all procedure types before any body is checked.
  ;; This supports mutual recursion.
  (extend-tenv* pnames proc-types tenv))

(define (apply-tenv tenv search-var)
  (case (car tenv)

    ((empty-tenv)
     (error "Unbound variable in type environment -- APPLY-TENV" search-var))

    ((extend-tenv)
     (let ((var       (cadr tenv))
           (ty        (caddr tenv))
           (saved-env (cadddr tenv)))
       (if (eq? search-var var)
           ty
           (apply-tenv saved-env search-var))))

    (else
     (error "Bad type environment -- APPLY-TENV" tenv))))


;;; ============================================================
;;; 4. Checked typing: utilities
;;; ============================================================
;;;
;;; CHECKED validates annotations.
;;; It does not invent unknowns and does not solve equations.
;;; If a program omits a required type, that is an error in CHECKED.
;;; ============================================================

(define (check-equal-type! actual expected exp)
  ;; A checker rejects the program before execution if types disagree.
  (if (type=? actual expected)
      'ok
      (error "Type mismatch -- CHECK-EQUAL-TYPE!"
             (list 'expression exp
                   'actual actual
                   'expected expected))))

(define (check-equal-type-list! actuals expecteds exp)
  (cond ((and (null? actuals) (null? expecteds))
         'ok)
        ((or (null? actuals) (null? expecteds))
         (error "Wrong number of argument types" (list actuals expecteds exp)))
        (else
         (check-equal-type! (car actuals) (car expecteds) exp)
         (check-equal-type-list! (cdr actuals) (cdr expecteds) exp))))


(define (declared-type ty exp)
  ;; In CHECKED, no-type is not allowed where an annotation is required.
  (if (no-type? ty)
      (error "Missing type annotation in CHECKED" exp)
      ty))

(define (declared-types tys exp)
  (map (lambda (ty) (declared-type ty exp)) tys))


;;; ============================================================
;;; 5. CHECKED: type-of
;;; ============================================================
;;;
;;; Contract:
;;;   type-of : Exp * TEnv -> Type
;;;
;;; The checker follows the same AST branch structure as an evaluator.
;;; But instead of computing an ExpVal, each branch computes a Type.
;;;
;;; A key static difference:
;;;   if-exp checks both branches.
;;;   An evaluator executes only one branch.
;;; ============================================================

(define (type-of exp tenv)
  (case (car exp)

    ((const-exp)
     (int-type))

    ((var-exp)
     (apply-tenv tenv (cadr exp)))

    ((diff-exp)
     (let ((ty1 (type-of (cadr exp) tenv))
           (ty2 (type-of (caddr exp) tenv)))
       (check-equal-type! ty1 (int-type) exp)
       (check-equal-type! ty2 (int-type) exp)
       (int-type)))

    ((zero?-exp)
     (let ((ty1 (type-of (cadr exp) tenv)))
       (check-equal-type! ty1 (int-type) exp)
       (bool-type)))

    ((if-exp)
     (let ((test-ty  (type-of (cadr exp) tenv))
           (true-ty  (type-of (caddr exp) tenv))
           (false-ty (type-of (cadddr exp) tenv)))
       (check-equal-type! test-ty (bool-type) exp)
       ;; Both branches must have the same type because the checker does
       ;; not know which branch will run at runtime.
       (check-equal-type! true-ty false-ty exp)
       true-ty))

    ((let-exp)
     (let ((vars (cadr exp))
           (rhss (caddr exp))
           (body (cadddr exp)))
       ;; Parallel LET:
       ;; all RHS types are computed in the old type environment.
       (let ((rhs-types (types-of-exps rhss tenv)))
         (type-of body
                  (extend-tenv* vars rhs-types tenv)))))

    ((proc-exp)
     (let ((params      (cadr exp))
           (param-types (declared-types (caddr exp) exp))
           (body        (cadddr exp)))
       (let ((body-type
              (type-of body
                       (extend-tenv* params param-types tenv))))
         (proc-type param-types body-type))))

    ((call-exp)
     (let ((rator-type (type-of (cadr exp) tenv))
           (rand-types (types-of-exps (caddr exp) tenv)))
       (if (proc-type? rator-type)
           (begin
             (check-equal-type-list!
              rand-types
              (proc-type-arg-types rator-type)
              exp)
             (proc-type-result-type rator-type))
           (error "Rator is not a procedure type -- TYPE-OF" rator-type))))

    ((letrec-exp)
     (let ((pnames       (cadr exp))
           (paramss      (caddr exp))
           (param-typess (cadddr exp))
           (result-types (list-ref exp 4))
           (pbodies      (list-ref exp 5))
           (body         (list-ref exp 6)))
       (let ((checked-param-typess
              (map (lambda (tys) (declared-types tys exp)) param-typess))
             (checked-result-types
              (map (lambda (ty) (declared-type ty exp)) result-types)))
         (let ((proc-types
                (map2 proc-type checked-param-typess checked-result-types)))
           (let ((new-tenv
                  (extend-tenv-with-procs pnames proc-types tenv)))
             ;; Each recursive body is checked under:
             ;;   recursive procedure names + its own parameters
             (check-letrec-bodies!
              paramss
              checked-param-typess
              checked-result-types
              pbodies
              new-tenv
              exp)
             (type-of body new-tenv))))))

    ((pair-exp)
     (let ((left-type  (type-of (cadr exp) tenv))
           (right-type (type-of (caddr exp) tenv)))
       (pair-type left-type right-type)))

    ((unpair-exp)
     (let ((var1     (cadr exp))
           (var2     (caddr exp))
           (pair-e   (cadddr exp))
           (body     (list-ref exp 4)))
       (let ((p-type (type-of pair-e tenv)))
         (if (pair-type? p-type)
             (type-of body
                      (extend-tenv
                       var1
                       (pair-type-left p-type)
                       (extend-tenv
                        var2
                        (pair-type-right p-type)
                        tenv)))
             (error "Expected pair type -- TYPE-OF" p-type)))))

    ((emptylist-exp)
     (let ((elem-type (declared-type (cadr exp) exp)))
       (list-type elem-type)))

    ((cons-exp)
     (let ((first-type (type-of (cadr exp) tenv))
           (rest-type  (type-of (caddr exp) tenv)))
       (if (list-type? rest-type)
           (begin
             (check-equal-type! first-type
                                (list-type-elem rest-type)
                                exp)
             rest-type)
           (error "Expected list type in CONS -- TYPE-OF" rest-type))))

    ((null?-exp)
     (let ((lst-type (type-of (cadr exp) tenv)))
       (if (list-type? lst-type)
           (bool-type)
           (error "Expected list type in NULL? -- TYPE-OF" lst-type))))

    ((car-exp)
     (let ((lst-type (type-of (cadr exp) tenv)))
       (if (list-type? lst-type)
           (list-type-elem lst-type)
           (error "Expected list type in CAR -- TYPE-OF" lst-type))))

    ((cdr-exp)
     (let ((lst-type (type-of (cadr exp) tenv)))
       (if (list-type? lst-type)
           lst-type
           (error "Expected list type in CDR -- TYPE-OF" lst-type))))

    ((newref-exp)
     (let ((elem-type (type-of (cadr exp) tenv)))
       (ref-type elem-type)))

    ((deref-exp)
     (let ((ref-ty (type-of (cadr exp) tenv)))
       (if (ref-type? ref-ty)
           (ref-type-elem ref-ty)
           (error "Expected reference type in DEREF -- TYPE-OF" ref-ty))))

    ((setref-exp)
     (let ((ref-ty (type-of (cadr exp) tenv))
           (val-ty (type-of (caddr exp) tenv)))
       (if (ref-type? ref-ty)
           (begin
             (check-equal-type! val-ty
                                (ref-type-elem ref-ty)
                                exp)
             (void-type))
           (error "Expected reference type in SETREF -- TYPE-OF" ref-ty))))

    (else
     (error "Unknown expression variant -- TYPE-OF" exp))))


(define (types-of-exps exps tenv)
  (if (null? exps)
      '()
      (cons (type-of (car exps) tenv)
            (types-of-exps (cdr exps) tenv))))

(define (check-letrec-bodies! paramss param-typess result-types pbodies tenv exp)
  (cond ((and (null? paramss)
              (null? param-typess)
              (null? result-types)
              (null? pbodies))
         'ok)
        ((or (null? paramss)
             (null? param-typess)
             (null? result-types)
             (null? pbodies))
         (error "Mismatched LETREC declarations -- CHECK-LETREC-BODIES!" exp))
        (else
         (let ((body-type
                (type-of (car pbodies)
                         (extend-tenv* (car paramss)
                                       (car param-typess)
                                       tenv))))
           (check-equal-type! body-type
                              (car result-types)
                              (car pbodies))
           (check-letrec-bodies!
            (cdr paramss)
            (cdr param-typess)
            (cdr result-types)
            (cdr pbodies)
            tenv
            exp)))))


;;; ============================================================
;;; 6. Program entry for CHECKED
;;; ============================================================

(define (init-tenv)
  ;; Add predefined names here if the object language needs them.
  ;; Keeping this empty exposes explicit binding behavior.
  (empty-tenv))

(define (type-of-program pgm)
  (type-of (program-body pgm) (init-tenv)))

(define checked-type-of-program type-of-program)


;;; ============================================================
;;; 7. Inference: fresh type variables
;;; ============================================================
;;;
;;; INFERRED turns missing annotations into type variables.
;;;
;;; no-type is not a wildcard that can mean anything at each occurrence.
;;; It becomes a particular unknown that must be solved consistently.
;;; ============================================================

(define tvar-counter 0)

(define (reset-tvar-counter!)
  (set! tvar-counter 0))

(define (fresh-tvar-type)
  (set! tvar-counter (+ tvar-counter 1))
  (tvar-type
   (string->symbol
    (string-append "ty" (number->string tvar-counter)))))

(define (otype->type otype)
  ;; Optional type -> Type.
  ;; Declared type is kept.
  ;; no-type becomes a fresh type variable.
  (if (no-type? otype)
      (fresh-tvar-type)
      otype))

(define (otypes->types otypes)
  (map otype->type otypes))


;;; ============================================================
;;; 8. Substitutions
;;; ============================================================
;;;
;;; A substitution records solved type variables:
;;;   tyvar -> type
;;;
;;; Substitution must be applied consistently.
;;; If a new solution is added, old solutions must also reflect it.
;;;
;;; This invariant prevents stale type variables from surviving in old entries.
;;; ============================================================

(define (empty-subst)
  '())

(define (extend-subst tvar ty subst)
  ;; Add tvar := ty and push the new solution through existing mappings.
  (cons (list tvar ty)
        (map
         (lambda (binding)
           (let ((old-tvar (car binding))
                 (old-ty   (cadr binding)))
             (list old-tvar
                   (apply-one-subst old-ty tvar ty))))
         subst)))

(define (apply-subst-to-type ty subst)
  (cond ((int-type? ty) ty)
        ((bool-type? ty) ty)
        ((void-type? ty) ty)

        ((tvar-type? ty)
         (let ((binding (assoc (tvar-type-name ty) subst)))
           (if binding
               (apply-subst-to-type (cadr binding) subst)
               ty)))

        ((proc-type? ty)
         (proc-type
          (map (lambda (arg-ty)
                 (apply-subst-to-type arg-ty subst))
               (proc-type-arg-types ty))
          (apply-subst-to-type (proc-type-result-type ty) subst)))

        ((pair-type? ty)
         (pair-type
          (apply-subst-to-type (pair-type-left ty) subst)
          (apply-subst-to-type (pair-type-right ty) subst)))

        ((list-type? ty)
         (list-type
          (apply-subst-to-type (list-type-elem ty) subst)))

        ((ref-type? ty)
         (ref-type
          (apply-subst-to-type (ref-type-elem ty) subst)))

        (else
         (error "Bad type -- APPLY-SUBST-TO-TYPE" ty))))

(define (apply-one-subst ty tvar replacement)
  ;; Replace one type variable inside TY.
  (cond ((int-type? ty) ty)
        ((bool-type? ty) ty)
        ((void-type? ty) ty)

        ((tvar-type? ty)
         (if (eq? (tvar-type-name ty) tvar)
             replacement
             ty))

        ((proc-type? ty)
         (proc-type
          (map (lambda (arg-ty)
                 (apply-one-subst arg-ty tvar replacement))
               (proc-type-arg-types ty))
          (apply-one-subst (proc-type-result-type ty) tvar replacement)))

        ((pair-type? ty)
         (pair-type
          (apply-one-subst (pair-type-left ty) tvar replacement)
          (apply-one-subst (pair-type-right ty) tvar replacement)))

        ((list-type? ty)
         (list-type
          (apply-one-subst (list-type-elem ty) tvar replacement)))

        ((ref-type? ty)
         (ref-type
          (apply-one-subst (ref-type-elem ty) tvar replacement)))

        (else
         (error "Bad type -- APPLY-ONE-SUBST" ty))))


;;; ============================================================
;;; 9. Occurrence check
;;; ============================================================
;;;
;;; The occurrence check prevents infinite types.
;;;
;;; Example problem:
;;;   ty1 = (ty1 -> int)
;;;
;;; Without the occurrence check, the inferencer can accept a type that
;;; would have to contain itself infinitely.
;;; ============================================================

(define (no-occurrence? tvar ty)
  (cond ((int-type? ty) #t)
        ((bool-type? ty) #t)
        ((void-type? ty) #t)

        ((tvar-type? ty)
         (not (eq? tvar (tvar-type-name ty))))

        ((proc-type? ty)
         (and (all? (lambda (arg-ty)
                      (no-occurrence? tvar arg-ty))
                    (proc-type-arg-types ty))
              (no-occurrence? tvar
                              (proc-type-result-type ty))))

        ((pair-type? ty)
         (and (no-occurrence? tvar (pair-type-left ty))
              (no-occurrence? tvar (pair-type-right ty))))

        ((list-type? ty)
         (no-occurrence? tvar (list-type-elem ty)))

        ((ref-type? ty)
         (no-occurrence? tvar (ref-type-elem ty)))

        (else
         (error "Bad type -- NO-OCCURRENCE?" ty))))

(define (all? pred xs)
  (cond ((null? xs) #t)
        ((pred (car xs)) (all? pred (cdr xs)))
        (else #f)))


;;; ============================================================
;;; 10. Unification
;;; ============================================================
;;;
;;; Unification is not simple equality checking.
;;;
;;; Equality checking:
;;;   compare two known types.
;;;
;;; Unification:
;;;   solve a type equation, possibly binding type variables.
;;;
;;; Contract:
;;;   unifier : Type * Type * Subst * Exp -> Subst
;;;
;;; The expression argument is used only for error reporting.
;;; ============================================================

(define (unifier ty1 ty2 subst exp)
  (let ((ty1 (apply-subst-to-type ty1 subst))
        (ty2 (apply-subst-to-type ty2 subst)))
    (cond

      ((type=? ty1 ty2)
       subst)

      ((tvar-type? ty1)
       (unify-var (tvar-type-name ty1) ty2 subst exp))

      ((tvar-type? ty2)
       (unify-var (tvar-type-name ty2) ty1 subst exp))

      ((and (proc-type? ty1) (proc-type? ty2))
       (unify-type-lists
        (proc-type-arg-types ty1)
        (proc-type-arg-types ty2)
        (unifier (proc-type-result-type ty1)
                 (proc-type-result-type ty2)
                 subst
                 exp)
        exp))

      ((and (pair-type? ty1) (pair-type? ty2))
       (unifier (pair-type-right ty1)
                (pair-type-right ty2)
                (unifier (pair-type-left ty1)
                         (pair-type-left ty2)
                         subst
                         exp)
                exp))

      ((and (list-type? ty1) (list-type? ty2))
       (unifier (list-type-elem ty1)
                (list-type-elem ty2)
                subst
                exp))

      ((and (ref-type? ty1) (ref-type? ty2))
       (unifier (ref-type-elem ty1)
                (ref-type-elem ty2)
                subst
                exp))

      (else
       (error "Cannot unify types"
              (list 'expression exp
                    'left ty1
                    'right ty2))))))

(define (unify-var tvar ty subst exp)
  ;; A type variable may be bound only if it does not occur inside TY.
  (if (no-occurrence? tvar ty)
      (extend-subst tvar ty subst)
      (error "Occurrence check failed"
             (list 'type-variable tvar
                   'type ty
                   'expression exp))))

(define (unify-type-lists tys1 tys2 subst exp)
  (cond ((and (null? tys1) (null? tys2))
         subst)
        ((or (null? tys1) (null? tys2))
         (error "Cannot unify argument type lists"
                (list tys1 tys2 exp)))
        (else
         (unify-type-lists
          (cdr tys1)
          (cdr tys2)
          (unifier (car tys1)
                   (car tys2)
                   subst
                   exp)
          exp))))


;;; ============================================================
;;; 11. Inference answers
;;; ============================================================
;;;
;;; The inferencer threads substitution through the syntax tree.
;;;
;;; Each branch returns:
;;;   type + current substitution
;;;
;;; This is the static analogue of threading store in a store-passing
;;; interpreter.
;;; ============================================================

(define (an-answer ty subst)
  (list 'an-answer ty subst))

(define (answer-type ans)
  (cadr ans))

(define (answer-subst ans)
  (caddr ans))


;;; ============================================================
;;; 12. INFERRED: type-of-inferred
;;; ============================================================
;;;
;;; Contract:
;;;   type-of-inferred : Exp * TEnv * Subst -> Answer(Type, Subst)
;;;
;;; The inferencer does not guess final types directly.
;;; It generates constraints and solves them with unification.
;;; ============================================================

(define (type-of-inferred exp tenv subst)
  (case (car exp)

    ((const-exp)
     (an-answer (int-type) subst))

    ((var-exp)
     (an-answer (apply-tenv tenv (cadr exp)) subst))

    ((diff-exp)
     (let* ((ans1   (type-of-inferred (cadr exp) tenv subst))
            (ty1    (answer-type ans1))
            (subst1 (answer-subst ans1))
            (subst2 (unifier ty1 (int-type) subst1 exp))
            (ans2   (type-of-inferred (caddr exp) tenv subst2))
            (ty2    (answer-type ans2))
            (subst3 (answer-subst ans2))
            (subst4 (unifier ty2 (int-type) subst3 exp)))
       (an-answer (int-type) subst4)))

    ((zero?-exp)
     (let* ((ans1   (type-of-inferred (cadr exp) tenv subst))
            (ty1    (answer-type ans1))
            (subst1 (answer-subst ans1))
            (subst2 (unifier ty1 (int-type) subst1 exp)))
       (an-answer (bool-type) subst2)))

    ((if-exp)
     (let* ((ans-test   (type-of-inferred (cadr exp) tenv subst))
            (test-type  (answer-type ans-test))
            (subst1     (answer-subst ans-test))
            (subst2     (unifier test-type (bool-type) subst1 exp))

            (ans-true   (type-of-inferred (caddr exp) tenv subst2))
            (true-type  (answer-type ans-true))
            (subst3     (answer-subst ans-true))

            (ans-false  (type-of-inferred (cadddr exp) tenv subst3))
            (false-type (answer-type ans-false))
            (subst4     (answer-subst ans-false))

            (subst5     (unifier true-type false-type subst4 exp)))
       (an-answer (apply-subst-to-type true-type subst5)
                  subst5)))

    ((let-exp)
     (let ((vars (cadr exp))
           (rhss (caddr exp))
           (body (cadddr exp)))
       ;; Parallel LET inference:
       ;; RHS expressions are inferred in the old type environment,
       ;; but substitution is threaded left-to-right.
       (let ((rhs-answer
              (types-of-exps/inferred rhss tenv subst)))
         (let ((rhs-types (answer-type rhs-answer))
               (subst1   (answer-subst rhs-answer)))
           (type-of-inferred
            body
            (extend-tenv* vars rhs-types tenv)
            subst1)))))

    ((proc-exp)
     (let ((params       (cadr exp))
           (optional-tys (caddr exp))
           (body         (cadddr exp)))
       (let ((param-types (otypes->types optional-tys)))
         (let ((ans-body
                (type-of-inferred
                 body
                 (extend-tenv* params param-types tenv)
                 subst)))
           (an-answer
            (proc-type
             (map (lambda (ty)
                    (apply-subst-to-type ty (answer-subst ans-body)))
                  param-types)
             (answer-type ans-body))
            (answer-subst ans-body))))))

    ((call-exp)
     (let* ((rator      (cadr exp))
            (rands      (caddr exp))
            (ans-rator  (type-of-inferred rator tenv subst))
            (rator-type (answer-type ans-rator))
            (subst1     (answer-subst ans-rator))

            (ans-rands  (types-of-exps/inferred rands tenv subst1))
            (rand-types (answer-type ans-rands))
            (subst2     (answer-subst ans-rands))

            (result-type (fresh-tvar-type))
            (expected-rator-type (proc-type rand-types result-type))
            (subst3 (unifier rator-type expected-rator-type subst2 exp)))
       (an-answer
        (apply-subst-to-type result-type subst3)
        subst3)))

    ((letrec-exp)
     (infer-letrec exp tenv subst))

    ((pair-exp)
     (let* ((ans1   (type-of-inferred (cadr exp) tenv subst))
            (ty1    (answer-type ans1))
            (subst1 (answer-subst ans1))
            (ans2   (type-of-inferred (caddr exp) tenv subst1))
            (ty2    (answer-type ans2))
            (subst2 (answer-subst ans2)))
       (an-answer (pair-type ty1 ty2) subst2)))

    ((unpair-exp)
     (let ((var1   (cadr exp))
           (var2   (caddr exp))
           (pair-e (cadddr exp))
           (body   (list-ref exp 4)))
       (let* ((ans-pair (type-of-inferred pair-e tenv subst))
              (pair-ty  (answer-type ans-pair))
              (subst1   (answer-subst ans-pair))
              (left-ty  (fresh-tvar-type))
              (right-ty (fresh-tvar-type))
              (subst2   (unifier pair-ty
                                  (pair-type left-ty right-ty)
                                  subst1
                                  exp)))
         (type-of-inferred
          body
          (extend-tenv var1
                       (apply-subst-to-type left-ty subst2)
                       (extend-tenv var2
                                    (apply-subst-to-type right-ty subst2)
                                    tenv))
          subst2))))

    ((emptylist-exp)
     (let ((elem-type (otype->type (cadr exp))))
       (an-answer (list-type elem-type) subst)))

    ((cons-exp)
     (let* ((ans-first  (type-of-inferred (cadr exp) tenv subst))
            (first-ty   (answer-type ans-first))
            (subst1     (answer-subst ans-first))

            (ans-rest   (type-of-inferred (caddr exp) tenv subst1))
            (rest-ty    (answer-type ans-rest))
            (subst2     (answer-subst ans-rest))

            (subst3     (unifier rest-ty
                                  (list-type first-ty)
                                  subst2
                                  exp)))
       (an-answer
        (apply-subst-to-type rest-ty subst3)
        subst3)))

    ((null?-exp)
     (let* ((ans1     (type-of-inferred (cadr exp) tenv subst))
            (lst-type (answer-type ans1))
            (subst1   (answer-subst ans1))
            (elem-ty  (fresh-tvar-type))
            (subst2   (unifier lst-type
                                (list-type elem-ty)
                                subst1
                                exp)))
       (an-answer (bool-type) subst2)))

    ((car-exp)
     (let* ((ans1     (type-of-inferred (cadr exp) tenv subst))
            (lst-type (answer-type ans1))
            (subst1   (answer-subst ans1))
            (elem-ty  (fresh-tvar-type))
            (subst2   (unifier lst-type
                                (list-type elem-ty)
                                subst1
                                exp)))
       (an-answer
        (apply-subst-to-type elem-ty subst2)
        subst2)))

    ((cdr-exp)
     (let* ((ans1     (type-of-inferred (cadr exp) tenv subst))
            (lst-type (answer-type ans1))
            (subst1   (answer-subst ans1))
            (elem-ty  (fresh-tvar-type))
            (subst2   (unifier lst-type
                                (list-type elem-ty)
                                subst1
                                exp)))
       (an-answer
        (apply-subst-to-type lst-type subst2)
        subst2)))

    ((newref-exp)
     (let* ((ans1   (type-of-inferred (cadr exp) tenv subst))
            (ty1    (answer-type ans1))
            (subst1 (answer-subst ans1)))
       (an-answer (ref-type ty1) subst1)))

    ((deref-exp)
     (let* ((ans1      (type-of-inferred (cadr exp) tenv subst))
            (ref-ty    (answer-type ans1))
            (subst1    (answer-subst ans1))
            (elem-ty   (fresh-tvar-type))
            (subst2    (unifier ref-ty
                                 (ref-type elem-ty)
                                 subst1
                                 exp)))
       (an-answer
        (apply-subst-to-type elem-ty subst2)
        subst2)))

    ((setref-exp)
     (let* ((ans-ref   (type-of-inferred (cadr exp) tenv subst))
            (ref-ty    (answer-type ans-ref))
            (subst1    (answer-subst ans-ref))

            (ans-val   (type-of-inferred (caddr exp) tenv subst1))
            (val-ty    (answer-type ans-val))
            (subst2    (answer-subst ans-val))

            (subst3    (unifier ref-ty
                                 (ref-type val-ty)
                                 subst2
                                 exp)))
       (an-answer (void-type) subst3)))

    (else
     (error "Unknown expression variant -- TYPE-OF-INFERRED" exp))))


(define (types-of-exps/inferred exps tenv subst)
  ;; Infer a list of expression types while threading substitution.
  (if (null? exps)
      (an-answer '() subst)
      (let* ((ans1     (type-of-inferred (car exps) tenv subst))
             (ty1      (answer-type ans1))
             (subst1   (answer-subst ans1))
             (ans-rest (types-of-exps/inferred (cdr exps) tenv subst1))
             (tys-rest (answer-type ans-rest))
             (subst2   (answer-subst ans-rest)))
        (an-answer (cons (apply-subst-to-type ty1 subst2)
                         tys-rest)
                   subst2))))


;;; ============================================================
;;; 13. INFERRED: letrec
;;; ============================================================
;;;
;;; LETREC inference must assume procedure types before checking bodies.
;;;
;;; Steps:
;;;   1. Convert optional parameter and result annotations into real types.
;;;   2. Extend tenv with recursive procedure types.
;;;   3. Infer each procedure body under its parameters.
;;;   4. Unify each body type with its declared/inferred result type.
;;;   5. Infer the outer body under the recursive type environment.
;;; ============================================================

(define (infer-letrec exp tenv subst)
  (let ((pnames       (cadr exp))
        (paramss      (caddr exp))
        (param-otypess (cadddr exp))
        (result-otypes (list-ref exp 4))
        (pbodies      (list-ref exp 5))
        (body         (list-ref exp 6)))

    (let ((param-typess (map otypes->types param-otypess))
          (result-types (map otype->type result-otypes)))

      (let ((proc-types (map2 proc-type param-typess result-types)))
        (let ((new-tenv
               (extend-tenv-with-procs pnames proc-types tenv)))
          (let ((subst-after-bodies
                 (infer-letrec-bodies
                  paramss
                  param-typess
                  result-types
                  pbodies
                  new-tenv
                  subst
                  exp)))
            (type-of-inferred body new-tenv subst-after-bodies))))))

(define (infer-letrec-bodies paramss param-typess result-types pbodies tenv subst exp)
  (cond ((and (null? paramss)
              (null? param-typess)
              (null? result-types)
              (null? pbodies))
         subst)
        ((or (null? paramss)
             (null? param-typess)
             (null? result-types)
             (null? pbodies))
         (error "Mismatched LETREC declarations -- INFER-LETREC-BODIES" exp))
        (else
         (let* ((params      (car paramss))
                (param-types (car param-typess))
                (result-type (car result-types))
                (pbody       (car pbodies))
                (body-tenv   (extend-tenv* params param-types tenv))
                (ans-body    (type-of-inferred pbody body-tenv subst))
                (body-type   (answer-type ans-body))
                (subst1      (answer-subst ans-body))
                (subst2      (unifier body-type result-type subst1 pbody)))
           (infer-letrec-bodies
            (cdr paramss)
            (cdr param-typess)
            (cdr result-types)
            (cdr pbodies)
            tenv
            subst2
            exp)))))


;;; ============================================================
;;; 14. Program entry for INFERRED
;;; ============================================================

(define (inferred-type-of-program pgm)
  (reset-tvar-counter!)
  (let* ((ans   (type-of-inferred (program-body pgm)
                                  (init-tenv)
                                  (empty-subst)))
         (ty    (answer-type ans))
         (subst (answer-subst ans)))
    ;; Always apply the final substitution before displaying the inferred type.
    (apply-subst-to-type ty subst)))


;;; ============================================================
;;; 15. Canonical type-variable renaming for tests
;;; ============================================================
;;;
;;; Inferred type-variable names are implementation artifacts.
;;; Two inferred types should be considered the same if they differ only by
;;; generated names:
;;;   ty1 -> ty1
;;;   ty7 -> ty7
;;;
;;; Canonical renaming makes tests stable.
;;; ============================================================

(define (canonicalize-type ty)
  (let ((table '())
        (counter 0))

    (define (lookup-or-create name)
      (let ((binding (assoc name table)))
        (if binding
            (cadr binding)
            (begin
              (set! counter (+ counter 1))
              (let ((new-name
                     (string->symbol
                      (string-append "a" (number->string counter)))))
                (set! table
                      (cons (list name new-name) table))
                new-name)))))

    (define (walk ty)
      (cond ((int-type? ty) ty)
            ((bool-type? ty) ty)
            ((void-type? ty) ty)
            ((tvar-type? ty)
             (tvar-type
              (lookup-or-create (tvar-type-name ty))))
            ((proc-type? ty)
             (proc-type
              (map walk (proc-type-arg-types ty))
              (walk (proc-type-result-type ty))))
            ((pair-type? ty)
             (pair-type
              (walk (pair-type-left ty))
              (walk (pair-type-right ty))))
            ((list-type? ty)
             (list-type (walk (list-type-elem ty))))
            ((ref-type? ty)
             (ref-type (walk (ref-type-elem ty))))
            (else
             (error "Bad type -- CANONICALIZE-TYPE" ty))))

    (walk ty)))


;;; ============================================================
;;; 16. Small list helpers
;;; ============================================================

(define (map2 f xs ys)
  (cond ((and (null? xs) (null? ys))
         '())
        ((or (null? xs) (null? ys))
         (error "Mismatched lists -- MAP2" (list xs ys)))
        (else
         (cons (f (car xs) (car ys))
               (map2 f (cdr xs) (cdr ys))))))


;;; ============================================================
;;; 17. Extension notes inside the program
;;; ============================================================
;;;
;;; Module checking extends this program by adding:
;;;   interface declarations
;;;   qualified names
;;;   opaque / transparent type declarations
;;;   interface satisfaction
;;;
;;; Object-oriented checking extends this program by adding:
;;;   class environment
;;;   interface environment
;;;   method type lookup
;;;   subtype checking
;;;   cast and instanceof rules
;;;
;;; The shared pattern remains:
;;;   traverse syntax
;;;   consult static environment
;;;   compute / compare static descriptions
;;;   reject invalid programs before runtime
;;; ============================================================


;;; ============================================================
;;; 18. Minimal tests for CHECKED
;;; ============================================================
;;;
;;; Tests are written as comments.
;;; Each test targets one static distinction.
;;; ============================================================


;;; ------------------------------------------------------------
;;; Test group A: arithmetic and booleans
;;; ------------------------------------------------------------

;; (checked-type-of-program
;;  (a-program
;;   (diff-exp (const-exp 10) (const-exp 3))))
;;
;; expected:
;;   (int-type)
;;
;; Static point:
;;   diff requires both operands to have type int.


;; (checked-type-of-program
;;  (a-program
;;   (zero?-exp (const-exp 0))))
;;
;; expected:
;;   (bool-type)
;;
;; Static point:
;;   zero? consumes int and produces bool.


;; (checked-type-of-program
;;  (a-program
;;   (if-exp
;;    (zero?-exp (const-exp 0))
;;    (const-exp 1)
;;    (const-exp 2))))
;;
;; expected:
;;   (int-type)
;;
;; Static point:
;;   test has type bool;
;;   both branches have the same type.


;; (checked-type-of-program
;;  (a-program
;;   (if-exp
;;    (zero?-exp (const-exp 0))
;;    (const-exp 1)
;;    (zero?-exp (const-exp 2)))))
;;
;; expected:
;;   type error
;;
;; Static point:
;;   an evaluator would choose one branch at runtime;
;;   a checker must reject mismatched branch types before runtime.


;;; ------------------------------------------------------------
;;; Test group B: procedures
;;; ------------------------------------------------------------

;; (checked-type-of-program
;;  (a-program
;;   (proc-exp '(x)
;;             (list (int-type))
;;             (diff-exp (var-exp 'x) (const-exp 1)))))
;;
;; expected:
;;   (proc-type ((int-type)) (int-type))
;;
;; Static point:
;;   procedure type records parameter types and body type.


;; (checked-type-of-program
;;  (a-program
;;   (call-exp
;;    (proc-exp '(x)
;;              (list (int-type))
;;              (diff-exp (var-exp 'x) (const-exp 1)))
;;    (list (const-exp 10)))))
;;
;; expected:
;;   (int-type)
;;
;; Static point:
;;   rator type must be a procedure type;
;;   argument type must match its parameter type.


;;; ------------------------------------------------------------
;;; Test group C: LETREC
;;; ------------------------------------------------------------

;; (checked-type-of-program
;;  (a-program
;;   (letrec-exp
;;    '(to-zero)
;;    (list '(n))
;;    (list (list (int-type)))
;;    (list (int-type))
;;    (list
;;     (if-exp
;;      (zero?-exp (var-exp 'n))
;;      (const-exp 0)
;;      (call-exp
;;       (var-exp 'to-zero)
;;       (list (diff-exp (var-exp 'n) (const-exp 1))))))
;;    (call-exp (var-exp 'to-zero)
;;              (list (const-exp 4))))))
;;
;; expected:
;;   (int-type)
;;
;; Static point:
;;   recursive procedure type is installed before checking the procedure body.


;;; ------------------------------------------------------------
;;; Test group D: pairs, lists, references
;;; ------------------------------------------------------------

;; (checked-type-of-program
;;  (a-program
;;   (pair-exp (const-exp 1) (zero?-exp (const-exp 0)))))
;;
;; expected:
;;   (pair-type (int-type) (bool-type))


;; (checked-type-of-program
;;  (a-program
;;   (cons-exp
;;    (const-exp 1)
;;    (emptylist-exp (int-type)))))
;;
;; expected:
;;   (list-type (int-type))


;; (checked-type-of-program
;;  (a-program
;;   (deref-exp
;;    (newref-exp (const-exp 10)))))
;;
;; expected:
;;   (int-type)


;; (checked-type-of-program
;;  (a-program
;;   (setref-exp
;;    (newref-exp (const-exp 10))
;;    (const-exp 11))))
;;
;; expected:
;;   (void-type)


;;; ============================================================
;;; 19. Minimal tests for INFERRED
;;; ============================================================


;;; ------------------------------------------------------------
;;; Test group E: simple inference
;;; ------------------------------------------------------------

;; (inferred-type-of-program
;;  (a-program
;;   (diff-exp (const-exp 10) (const-exp 3))))
;;
;; expected:
;;   (int-type)


;; (inferred-type-of-program
;;  (a-program
;;   (proc-exp '(x)
;;             (list (no-type))
;;             (var-exp 'x))))
;;
;; expected canonical shape:
;;   (proc-type ((tvar-type a1)) (tvar-type a1))
;;
;; Static point:
;;   the same unknown type flows from parameter to result.


;; (inferred-type-of-program
;;  (a-program
;;   (call-exp
;;    (proc-exp '(x)
;;              (list (no-type))
;;              (diff-exp (var-exp 'x) (const-exp 1)))
;;    (list (const-exp 10)))))
;;
;; expected:
;;   (int-type)
;;
;; Static point:
;;   diff forces x to be int;
;;   call result is int.


;;; ------------------------------------------------------------
;;; Test group F: pairs and lists
;;; ------------------------------------------------------------

;; (inferred-type-of-program
;;  (a-program
;;   (pair-exp (const-exp 1)
;;             (zero?-exp (const-exp 0)))))
;;
;; expected:
;;   (pair-type (int-type) (bool-type))


;; (inferred-type-of-program
;;  (a-program
;;   (emptylist-exp (no-type))))
;;
;; expected canonical shape:
;;   (list-type (tvar-type a1))
;;
;; Static point:
;;   empty list needs an element type;
;;   if omitted, inference creates an unknown.


;; (inferred-type-of-program
;;  (a-program
;;   (cons-exp
;;    (const-exp 1)
;;    (emptylist-exp (no-type)))))
;;
;; expected:
;;   (list-type (int-type))
;;
;; Static point:
;;   cons unifies the unknown list element type with int.


;;; ------------------------------------------------------------
;;; Test group G: references
;;; ------------------------------------------------------------

;; (inferred-type-of-program
;;  (a-program
;;   (newref-exp (const-exp 3))))
;;
;; expected:
;;   (ref-type (int-type))


;; (inferred-type-of-program
;;  (a-program
;;   (deref-exp
;;    (newref-exp (zero?-exp (const-exp 0))))))
;;
;; expected:
;;   (bool-type)


;;; ------------------------------------------------------------
;;; Test group H: occurrence check
;;; ------------------------------------------------------------

;; (inferred-type-of-program
;;  (a-program
;;   (proc-exp '(x)
;;             (list (no-type))
;;             (call-exp (var-exp 'x)
;;                       (list (var-exp 'x))))))
;;
;; expected:
;;   occurrence-check failure
;;
;; Static point:
;;   self-application requires ty = ty -> result,
;;   which creates an infinite type in this type system.


;;; ============================================================
;;; 20. Tracing checklist inside the program
;;; ============================================================
;;;
;;; For CHECKED:
;;;   EXP       = current AST node
;;;   TENV      = variable -> Type
;;;   RESULT    = Type computed by type-of
;;;
;;; For INFERRED:
;;;   EXP       = current AST node
;;;   TENV      = variable -> Type or type variable
;;;   SUBST     = solved type-variable equations
;;;   RESULT    = Type after applying final substitution
;;;
;;; For procedure creation:
;;;   parameter annotations -> extended type environment -> body type
;;;
;;; For procedure call:
;;;   rator type must unify or equal argument-types -> result-type
;;;
;;; For if:
;;;   test must be bool
;;;   both branches must have the same type
;;;
;;; For letrec:
;;;   recursive procedure type must be assumed before checking its own body
;;;
;;; For inference:
;;;   no-type -> fresh type variable
;;;   type equations -> unifier
;;;   tvar solution -> substitution
;;;   occurrence check rejects infinite types
;;;
;;; Common mistakes:
;;;   - treating runtime values as static types
;;;   - using runtime environment instead of type environment
;;;   - checking only the executed branch of if
;;;   - treating ? / no-type as a wildcard instead of a specific unknown
;;;   - forgetting to apply the current substitution
;;;   - confusing unification with equality checking
;;;   - omitting the occurrence check
;;; ============================================================
```

### Full-Book Review Map

EOPL can be reviewed as a movement from recursively defined data to executable semantics, then from executable semantics to static analysis and larger program structure. The book begins with inductive definitions because interpreters, type checkers, CPS transformers, module checkers, and object-language evaluators all process recursively structured program representations. Each later chapter adds a semantic object that makes one part of programming-language meaning explicit: `environment`, `store`, `continuation`, `type environment`, `module interface`, or `class environment`.

This map is not another chapter summary. It is the compact layer after the program chapters: `Evaluator / Interpreter Family` summarizes environment and store; `CPS Transformer / Control Model` summarizes explicit control; `Type Checker / Type Inferencer` summarizes static analysis. The whole book can be held as a stack of semantic tools rather than as a list of isolated languages.

**1. Full-book movement**

* Chapter 1: `inductive specification` → `recursive procedure`
* Chapter 2: `interface` + `representation` → `data abstraction`
* Chapter 3: `abstract syntax` + `environment` → interpreter for expressions
* Chapter 4: `environment` + `store` → state, references, mutation, parameter passing
* Chapter 5: recursive interpreter + `continuation` → explicit control
* Chapter 6: direct-style program → CPS-transformed program
* Chapter 7: expression + `type environment` → type checking and type inference
* Chapter 8: `interface` + module body → checked program-structure abstraction
* Chapter 9: `object` + `class` + `method dispatch` → object-oriented semantics and typed OO

**2. Core semantic-object table**

| Chapter   | Main semantic object | What it explains                                              | What it makes visible                                         | Later pressure point                                              |
| --------- | -------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------- |
| Chapter 1 | `inductive data`     | how recursive sets are specified and processed                | grammar-directed recursion                                    | raw data needs interfaces and representation control              |
| Chapter 2 | `data abstraction`   | how representation is hidden behind operations                | constructor / observer discipline                             | interpreters need `abstract syntax` instead of raw lists          |
| Chapter 3 | `environment`        | how variables receive meaning                                 | lexical scope, closures, recursion                            | assignment requires a separate `store`                            |
| Chapter 4 | `store`              | how locations change over time                                | references, mutation, aliasing, parameter-passing differences | control effects require explicit control context                  |
| Chapter 5 | `continuation`       | what remains to be done                                       | control context, exceptions, captured continuations, threads  | CPS becomes a general source transformation                       |
| Chapter 6 | CPS target syntax    | how control is encoded in programs                            | tail form, operand position, explicit evaluation order        | static analyses can transform syntax before runtime               |
| Chapter 7 | `type environment`   | how expressions can be checked before execution               | type rules, inference variables, substitutions, unification   | program-scale boundaries require interfaces                       |
| Chapter 8 | `module interface`   | how components expose selected names and hide representations | opaque types, qualified names, module procedures              | object systems combine interface discipline with runtime dispatch |
| Chapter 9 | `class environment`  | how objects, fields, methods, and inheritance behave          | dynamic dispatch, `self`, `super`, subtyping, casts           | OO combines state, dispatch, and static checking                  |

**3. Interpreter thread**

The interpreter thread begins before the first interpreter appears. Chapter 1 teaches how to follow an inductive definition with a recursive program; Chapter 2 turns that discipline into interfaces and abstract syntax. Chapter 3 then gives the first full semantic pattern: `expression + environment → expressed value`.

Chapter 4 changes the interpreter’s semantic contract. Once assignment appears, a variable cannot simply denote a value. The interpreter must distinguish `environment` from `store`: names lead to denoted values, and locations lead to mutable contents. In `EXPLICIT-REFS`, references are visible source-language values; in `IMPLICIT-REFS`, variables silently denote locations.

Chapter 5 keeps expression cases largely recognizable but adds `continuation`. The interpreter no longer relies on the host-language call stack to remember pending computation. Chapter 6 moves the same idea from interpreter structure into source transformation: control becomes visible in the generated CPS program.

Chapter 7 reuses the same syntax-directed traversal, but the computed result changes from `ExpVal` to `Type`. Chapter 8 raises the unit of checking from expressions to modules: a module body must satisfy an interface. Chapter 9 applies the same semantic method to object-oriented programs: receiver object + runtime class → method lookup, while class/interface environments support static checking.

**Interpreter chain:**

```text
inductive data
  → abstract syntax
  → value-of
  → environment
  → store
  → continuation
  → CPS transformer
  → type-of
  → module checker
  → object/class interpreter and checker
```

**4. Representation thread**

* Chapter 1: data is specified inductively and processed by recursive procedures.
* Chapter 2: representation is hidden behind `interface` operations.
* Chapter 3: programs are represented as `abstract syntax`.
* Chapter 4: mutable state is represented as locations in a `store`.
* Chapter 5: control context is represented as `continuation` objects or procedures.
* Chapter 6: control is represented in transformed CPS syntax.
* Chapter 7: unknown types are represented by fresh type variables and substitutions.
* Chapter 8: module abstraction is represented by interfaces, qualified names, and opaque types.
* Chapter 9: object = class identity + field locations; class = superclass + fields + methods + interface information.

**Representation chain:**

```text
inductive data
  → abstract syntax
  → environment
  → store
  → continuation
  → type environment
  → module interface
  → class environment
```

**5. Concept distinctions**

| Distinction                              | Why it must remain stable                                                                                 |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `concrete syntax` ≠ `abstract syntax`    | Program text is for readers and parsers; abstract syntax is for interpreters, checkers, and transformers. |
| `datum` ≠ `AST`                          | Raw input may be invalid or ambiguous; an AST is classified and validated.                                |
| `interface` ≠ `implementation`           | Client code should depend on specified operations, not representation.                                    |
| `environment` ≠ `store`                  | Environment resolves names; store holds mutable contents.                                                 |
| `ExpVal` ≠ `DenVal`                      | They may coincide in simple languages but diverge when variables denote locations.                        |
| `reference` ≠ `value`                    | A reference is where a value lives; it is not the stored value itself.                                    |
| `continuation` ≠ `call stack`            | A continuation is the represented remaining computation; a call stack is one possible implementation.     |
| `CPS interpreter` ≠ `CPS transformation` | One rewrites an evaluator; the other rewrites source programs.                                            |
| `type checking` ≠ `type inference`       | Checking validates known annotations; inference generates and solves constraints.                         |
| `type environment` ≠ runtime environment | One supports static judgments; the other supports evaluation.                                             |
| `module` ≠ `object`                      | A module packages bindings; an object is a runtime value with identity, state, and dispatch.              |
| `inheritance` ≠ `subtyping`              | Inheritance is implementation reuse; subtyping is substitutability.                                       |
| `self` ≠ `super`                         | `self` names the receiver; `super` controls where inherited method lookup begins.                         |
| `cast` ≠ object conversion               | A cast changes the static view or fails; it does not change the object’s runtime class.                   |

**6. What to trace**

| Chapter   | Trace object                               | What to record                                                             |
| --------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| Chapter 1 | inductive definition → recursive procedure | syntactic category, production case, base case, recursive call             |
| Chapter 1 | `occurs-free?`                             | binding occurrence, free occurrence, recursive descent                     |
| Chapter 2 | abstract data operation                    | interface operation, hidden representation, client dependency              |
| Chapter 2 | `define-datatype` / `cases`                | variant, fields, branch-specific bindings                                  |
| Chapter 3 | LET expression                             | RHS environment, extended environment, body value                          |
| Chapter 3 | PROC call                                  | rator, rand, closure environment, `apply-procedure`                        |
| Chapter 3 | LETREC                                     | recursive environment, procedure name, recursive call                      |
| Chapter 4 | `EXPLICIT-REFS` program                    | allocation, reference, dereference, store update                           |
| Chapter 4 | `IMPLICIT-REFS` program                    | variable → reference → store contents                                      |
| Chapter 4 | parameter passing                          | actual argument → denoted value → aliasing or copying behavior             |
| Chapter 5 | CPS interpreter                            | `exp`, `env`, `cont`, continuation builder, `apply-cont`                   |
| Chapter 5 | exception / thread                         | saved continuation, handler or scheduler, resumed computation              |
| Chapter 6 | CPS transformation                         | source expression, continuation expression, generated target expression    |
| Chapter 6 | tail-form check                            | tail position, operand position, simple expression                         |
| Chapter 7 | type checking                              | expression variant, type environment, expected type, result type           |
| Chapter 7 | type inference                             | fresh type variables, equations, substitution, unification                 |
| Chapter 8 | module lookup                              | module name, interface, exported binding, qualified variable               |
| Chapter 8 | opaque type                                | internal representation, external qualified type, interface satisfaction   |
| Chapter 9 | method call                                | receiver, runtime class, method lookup, fields, `self`, result             |
| Chapter 9 | typed method call                          | static type, method signature, subtype relation, cast / `instanceof` check |

**7. Dynamic semantics to static analysis**

The first half of EOPL is primarily concerned with how programs run. Chapter 3 gives the environment-based evaluator, Chapter 4 adds store, and Chapter 5 exposes control through continuations. These chapters are about dynamic semantics: the interpreter computes values, updates locations, builds control contexts, and executes effects.

Chapter 6 is the hinge. CPS transformation is still about execution, but it treats the program as transformable syntax. It fixes evaluation order, names intermediate values, and makes control explicit before runtime. This prepares the shift to Chapter 7, where the question becomes static: not “what value will this program compute?” but “what type can be assigned before execution?”

Chapter 8 and Chapter 9 move static analysis to larger program structures. A module body must satisfy an interface; an opaque type hides representation while preserving static usability; an object-oriented program must respect class declarations, interfaces, method signatures, subtyping, and casts. Static analysis is not separate from semantics. It is another way to state and enforce meaning before execution.

**8. Exercise clusters**

| Cluster                                              | Exercise range | Main training                                                     |
| ---------------------------------------------------- | -------------: | ----------------------------------------------------------------- |
| Inductive definitions and recursive programs         |       1.1–1.14 | inductive sets, grammar derivations, recursive program derivation |
| Recursive list/tree procedures                       |      1.15–1.36 | symbolic lists, binary trees, context arguments                   |
| Data abstraction and environments                    |       2.1–2.14 | interfaces, representation independence, environment variants     |
| Recursive datatypes and abstract syntax              |      2.15–2.31 | constructors, predicates, `define-datatype`, parsing/unparsing    |
| LET and basic expression languages                   |       3.1–3.18 | semantic equations, `ExpVal`, `value-of`, environment extension   |
| PROC, LETREC, scope, lexical addressing              |      3.19–3.44 | closures, recursion, lexical/dynamic scope, nameless translation  |
| Store and explicit/implicit references               |       4.1–4.21 | references, assignment, `ExpVal` / `DenVal`, store tracing        |
| Statement languages, mutable data, parameter passing |      4.22–4.42 | statements, arrays, mutable pairs, call-by-reference/name/need    |
| CPS interpreters and continuations                   |       5.1–5.16 | continuations, `apply-cont`, CPS interpreter extensions           |
| Trampolines and imperative interpreters              |      5.17–5.34 | bounces, registers, imperative lowering                           |
| Exceptions, continuations, threads                   |      5.35–5.58 | handlers, captured continuations, schedulers, mutexes             |
| CPS programming and tail form                        |       6.1–6.19 | manual CPS, continuation representation, tail-form analysis       |
| CPS transformation and effects                       |      6.20–6.40 | translation order, optimizations, ANF, store/effect translation   |
| Types and type checking                              |       7.1–7.11 | type rules, `CHECKED`, pairs, lists, references                   |
| Type inference                                       |      7.12–7.25 | equations, substitutions, unification, occurrence check           |
| Simple modules and opaque types                      |       8.1–8.18 | module lookup, interface satisfaction, transparent/opaque types   |
| Module procedures                                    |      8.19–8.27 | parameterized modules, higher-order module expressions            |
| Classes and untyped OO interpretation                |       9.1–9.29 | objects, fields, methods, inheritance, dispatch, prototypes       |
| Typed object-oriented language                       |      9.30–9.37 | interfaces, subtyping, casts, typed method checking               |

**9. Structural checkpoint exercises**

* Exercise 1.11: tests why mutual recursion still terminates.
* Exercise 1.33: introduces context arguments over trees.
* Exercise 2.6: tests representation independence for environments.
* Exercise 2.12–2.14: show that environments can be represented procedurally.
* Exercise 2.21: moves environments into `define-datatype`.
* Exercise 2.30: treats parsing as validation, not formatting.
* Exercise 3.18: tests binding forms beyond simple `let`.
* Exercise 3.23–3.25: show how recursion can be encoded before `letrec`.
* Exercise 3.28–3.29: expose lexical vs dynamic binding.
* Exercise 3.40–3.44: connect lexical addressing to static optimization.
* Exercise 4.12: separates store threading from host-language mutation.
* Exercise 4.20: distinguishes mutable and immutable variables.
* Exercise 4.31–4.37: compare parameter-passing mechanisms through locations.
* Exercise 4.39: shows call-by-name ≠ call-by-need under effects.
* Exercise 5.13–5.15: measure control-context growth.
* Exercise 5.18–5.21: test trampolining as a representation of control transfer.
* Exercise 5.36–5.44: connect exceptions to explicit continuations.
* Exercise 5.45–5.58: extend continuation machinery to threads and synchronization.
* Exercise 6.19: tests tail-form analysis.
* Exercise 6.23: exposes code growth from continuation duplication.
* Exercise 6.31–6.33: connect CPS, defunctionalization, and registerization.
* Exercise 6.37–6.40: test CPS with effects and nonlocal control.
* Exercise 7.10–7.11: extend type checking to references and mutable structures.
* Exercise 7.17–7.20: test substitution and unification machinery.
* Exercise 7.25: introduces inferred list element types through fresh variables.
* Exercise 8.14: tests observational equivalence under opaque types.
* Exercise 8.18: checks type-environment invariants.
* Exercise 8.24: exposes the limitation of simple module-application typing.
* Exercise 9.2: exposes dynamic dispatch through `self`.
* Exercise 9.6–9.10: test runtime class inspection and named dispatch.
* Exercise 9.25: exposes the binary method problem.
* Exercise 9.33–9.37: connect typed OO to casts, interfaces, and dispatch design.

**10. Final mastery checklist**

* Able to derive a recursive procedure from an inductive data definition.
* Able to separate `concrete syntax`, raw datum, and `abstract syntax`.
* Able to design a data abstraction and preserve its interface across different representations.
* Able to trace a LET / PROC / LETREC expression through `value-of` and an environment.
* Able to explain why closures store their defining environment.
* Able to trace stateful evaluation through `environment` + `store`.
* Able to distinguish `ExpVal`, `DenVal`, value, reference, and location.
* Able to compare call-by-value, call-by-reference, call-by-value-result, call-by-name, and call-by-need.
* Able to trace a continuation-passing interpreter through `value-of/k` and `apply-cont`.
* Able to explain exceptions, captured continuations, and threads as uses of explicit control context.
* Able to transform a small direct-style program into CPS.
* Able to identify tail position, operand position, `SimpleExp`, and `TfExp`.
* Able to trace a type checker through `type environment` and type rules.
* Able to generate and solve simple type equations with unification and occurrence checking.
* Able to explain how modules enforce abstraction through interfaces and opaque types.
* Able to trace a module procedure application and interface-satisfaction check.
* Able to trace object creation, method dispatch, inheritance, `self`, and `super`.
* Able to explain how class/interface environments support typed object-oriented checking.

**11. Final conceptual map**

```text
inductive data
  → data abstraction
  → abstract syntax
  → interpreter
  → environment
  → store
  → continuation
  → CPS transformation
  → type checking / type inference
  → modules
  → objects and classes
```

This is not a replacement chain. EOPL builds a stack of semantic tools. Later chapters do not discard earlier ones: objects still need store; typed OO still needs environments; modules still rely on interfaces; CPS still relies on abstract syntax; type checking still follows grammar-directed traversal.

**12. Review before adjacent topics**

* Before programming-language semantics: review Chapters 3–5 on `environment`, `store`, and `continuation`.
* Before compilers: review Chapters 3, 6, and 7 on abstract syntax, lexical addressing, CPS, and static analysis.
* Before type systems: review Chapter 7, then Chapter 9’s subtyping and typed OO checker.
* Before program analysis: review Chapter 6 CPS transformation and Chapter 7 type inference.
* Before modular programming: review Chapters 2 and 8 on interfaces, opaque types, and module procedures.
* Before object-oriented language implementation: review Chapters 4 and 9 on store, fields, method dispatch, inheritance, and casts.
* Before concurrency: review Chapter 5’s thread scheduler, mutexes, and explicit control.
* Before functional programming: review Chapters 1, 3, 5, and 6 on recursive data, closures, continuations, and CPS.



## Chapter 1 Inductive Sets of Data

Main content:
1. Definition and rules.
2. Recur on data sets.
3. Auxiliary procedures and Context argument.
4. BNF.

### 1.1 Recursively Specified Data

**1. Inductive Spcicification to specify a set of values:**

There are three ways to define:
1. Top-down definition
2. Bottom-up definition
3. Rules-of-inference

**2. Rule of inference**:

_hypothesis_ or _antecedent_<br>
————————————————<br>
_conclusion_ or _consequent_
- If two or more hypotheses [haɪˈpɑθəsɪs] are listed, they are connected by an implicit [ɪmˈplɪsɪt] "and".
- A rule with no hypotheses is called an _axiom_ [ˈæksiəm].

**3. Define sets with Grammars**:
- Nonterminal Symbols (syntactic [sɪnˈtæktɪk] categories).
- Terminal Symbols.
- Productions. The rules called productions has two parts, separated by the symbol "::=" \*(read "is" or "can be"). The left part is a nonterminal symbol, and the right part consists of terminal and nonterminal symbols.
- Shortcuts.
  - Kleene star: $$ \{...\}^* $$ , zero or more.
  - Kleene plus: $$ \{...\}^+$$ , one or more.
  - Separated list: $$ \{...\}^{*(c)} $$ , zero or more and separated by "c".

**4. Definitions**

S-list, s-exp:

$$ 
\begin{aligned}
S-list & ::= (\{S-exp\}^*) \\ 
S-exp & ::= Symbol | S-list 
\end{aligned}
$$

Binary tree:

$$
Bintree ::= Int | (Symbol Bintree Bintree)
$$

Lambda expression:

$$
\begin{aligned}
LcExp & ::= Identifier \\
 & ::= ({\tt lambda} (Identifier) LcExp) \\
 & ::= (LcExp LcExp)
\end{aligned}
$$

where an indentifier is any symbol other than _lambda_. The identifier in the second production is called _bound variable_.

These grammars are said to be _context-free_ because a rule defining a given syntactic category may be applied in any context that makes reference to that syntactic category.
(Opponents are stricted by _context-sentive constraints_ or _invariants_).

**5. Induction**

We can use the inductive definitions in two ways: to prove theorems [ˈθiərəm] about members of the set and to write programs that manipulate them.

**Proof By Structual Induction:**

To prove that a propostion Induction Hypothesis is true for all structures s, prove the following:
1. IH is true on simple strucures (those without substructures).
2. If IH is true on the substructures of s, the it is true on s itself.

### 1.2 Deriving Recusive Programs

**1. The Smaller-Subprolem Principle**
Recursive procedures rely on an important principle: If we can reduce a problem to a smaller subproblem, we can call the procedure that solve the problem to solve the subproblem.

**2. list-length**

```scheme
;; list-length : List → Int
;; usage: (list-length l) = the length of l
(define list-length
  (lambda (lst)
    (if (null? lst)
      0
      (+ 1 (list-length (cdr lst))))))
```

**3. nth-element**

```scheme
;;nth-element : List × Int → SchemeVal
;;usage: (nth-element lst n) = the n-th element of lst
(define nth-element
  (lambda (lst n)
    (if (null? lst)
      (report-list-too-short n)
      (if (zero? n)
        (car lst)
        (nth-element (cdr lst) (- n 1))))))

(define report-list-too-short
  (lambda (n)
    (eopl:error ’nth-element
      "List too short by ~s elements.~%" (+ n 1))))
```

**4. remove-first**

```scheme
;; remove-first : Sym × Listof(Sym) → Listof(Sym)
(define remove-first
  (lambda (s los)
    (if (null? los)
      ’()
      (if (eqv? (car los) s)
        (cdr los)
        (cons (car los) (remove-first s (cdr los)))))))
```

**5. occurs-free?**

Determines whether or not _var_ occurs free in _exp_.

```scheme
;; occurs-free? : Sym × LcExp → Bool
;; usage: returns #t if the symbol var occurs free in exp,
;; otherwise returns #f.
(define occurs-free?
  (lambda (var exp)
    (cond
      ((symbol? exp) (eqv? var exp))
      ((eqv? (car exp) ’lambda)
      (and
        (not (eqv? var (car (cadr exp))))
        (occurs-free? var (caddr exp))))
      (else
        (or
          (occurs-free? var (car exp))
          (occurs-free? var (cadr exp)))))))
```

**6. subst**

```scheme
;; subst : Sym × Sym × S-list → S-list
(define subst
  (lambda (new old slist)
    (if (null? slist)
      ’()
      (cons
        (subst-in-s-exp new old (car slist))
        (subst new old (cdr slist))))))

;; subst-in-s-exp : Sym × Sym × S-exp → S-exp
(define subst-in-s-exp
  (lambda (new old sexp)
    (if (symbol? sexp)
      (if (eqv? sexp old) new sexp)
      (subst new old sexp))))
```

**7. Follow the Grammar!**

When defining a procedure that operates on inductively defined data, the structure of the program should be patterned after the structure of the data.

### 1.3 Auxiliary Procedures and Context Arguments

**1. GENERALIZE and number-element**

```scheme
;; number-elements-from : Listof(SchemeVal) × Int → Listof(List(Int, SchemeVal))
;; usage: (number-elements-from ’(v0 v1 v2 ...) n)
;; = ((n v0 ) (n + 1 v1 ) (n + 2 v2 ) ...)
(define number-elements-from
  (lambda (lst n)
    (if (null? lst) ’()
      (cons
        (list n (car lst))
        (number-elements-from (cdr lst) (+ n 1))))))

;; number-elements : List → Listof(List(Int, SchemeVal))
(define number-elements
  (lambda (lst)
    (number-elements-from lst 0)))
```

**Context argument** (or **inherited attribute**): the second argument "n" of the procedure "number-element-from".

**2. No Mysterious Auxiliaries!**

When defining an auxiliary procedure, always specify what it does on **all** arguments, not just the initial values.

**3. list-sum**

Does not work on vectors.

```scheme
list-sum : Listof(Int) → Int
(define list-sum
  (lambda (loi)
    (if (null? loi)
      0
      (+ (car loi)
         (list-sum (cdr loi))))))
```

**4. vector-sum**

```scheme
;; partial-vector-sum : Vectorof(Int) × Int → Int
;; usage: if 0 ≤ n < length(v), then
;; (partial-vector-sum v n) = ∑ v_i (i: from 0 to n)
(define partial-vector-sum
  (lambda (v n)
    (if (zero? n)
      (vector-ref v 0)
      (+ (vector-ref v n)
         (partial-vector-sum v (- n 1))))))

;; vector-sum : Vectorof(Int) → Int
;; usage: (vector-sum v) = ∑ vi (i: from 0 to length(v)−1)
(define vector-sum
  (lambda (v)
    (let ((n (vector-length v)))
      (if (zero? n)
        0
        (partial-vector-sum v (- n 1))))))
```

> Vectors are heterogenous [ˌhetə'rɒdʒənəs] structures whose elements are indexed by exact non-negative integers. A vector typically occupies _less space_ than a list of the same length, and the average time required to _access a randomly chosen element_ is typically _less_ for the vector than for the list.

**Appendix 1**: eq?, eqv?, equal? and = in scheme
- = : numerical equal
- eq? : whether two parameters represent the SAME OBJECT. The result for two primitive values like 2 and "a" depends on the implementation.
- eqv? : whether same object. #t if two parameters are identical primitive values.
- equal? : can be used to data structures (lists, vectors) whether they have same elements.
- **Conclusion**:
  - = for numbers;
  - eqv? for non-numeric values;
  - equal? for vectors, lists, etc.;
  - DON'T use eq? unless you know exactly what you're doing.

**Appendix 2**: Backus-Naur Form (BNF)

### Exercises

**Exercise 1.9** [\*\*] Define _remove_, which is like _remove-first_, except that it removes all occurrences of a given symbol from a list of symbols, not just the first.

Answer:

```scheme
;; remove : Sym × Listof(Sym) → Listof(Sym)
(define remove
  (lambda (s los)
    (if (null? los)
        '()
        (if (eqv? (car los) s)
            (remove s (cdr los))
            (cons (car los) (remove s (cdr los)))))))
```

**Exercise 1.12** [\*]Eliminate the one call to subst-in-s-exp in subst by replacing it by its definition and simplifying the resulting procedure. The result will be a version of subst that does not need subst-in-s-exp. This technique is called **inlining**, and is used by optimizing compilers.

You can't use this function like: (subst 1 3 (1 2 3)) or (subst '1 '3 (1 2 3)).

Answer:

```scheme
(define subst
  (lambda (new old slist)
    (if (null? slist)
        '()
        (cons
          (let ((sexp (car slist)))
;             (print sexp)
             (if (symbol? sexp)
                 (if (eqv? sexp old) new sexp)
                 (subst new old sexp)))
          (subst new old (cdr slist))))))
(define subst2
  (lambda (new old slist)
    (if (null? slist)
        '()
        (cons
         (if (symbol? (car slist))
               (if (eqv? (car slist) old) new (car slist))
               (subst2 new old (car slist)))
         (subst2 new old (cdr slist))))))
(define subst-decomp
  (lambda (new old slist)
    (if (null? slist)
        '()
        (cons (subst-in-s-exp new old (car slist))
              (subst-decomp new old (cdr slist))))))
(define subst-in-s-exp
  (lambda (new old sexp)
    (if (symbol? sexp)
        (if (eqv? sexp old) new sexp)
        (subst-decomp new old sexp))))

```

Exercise 1.13 [\*\*] In our example, we began by eliminating the Kleene star in the
grammar for S-list. Write subst following the original grammar by using map.

**Exercise 1.15** [\*] (duple n x) returns a list containing n copies of x.

```scheme
> (duple 2 3)
(3 3)
> (duple 4 '(ha ha))
((ha ha) (ha ha) (ha ha) (ha ha))
> (duple 0 ’(blah))
()
```

Answer:

```scheme
(define duple
  (lambda (times object)
    (if (> times 0)
        '()
        (cons object
              (duple (- times 1) object)))))
```

**Exercise 1.16** [\*] (invert lst), where lst is a list of 2-lists (lists of length two), returns a list with each 2-list reversed.

```scheme
> (invert ’((a 1) (a 2) (1 b) (2 b)))
((1 a) (2 a) (b 1) (b 2))
```

```scheme
(define invert
  (lambda (lst)
    (if (list? lst)
        (if (list? (car lst))
            (cons (cons (cdar lst)
                        (car lst))
                  (invert (cdr lst)))
            '())
        '())))
```

**Exercise 1.17** [\*] (down lst) wraps parentheses around each top-level element of
lst.

```scheme
> (down ’(1 2 3))
((1) (2) (3))
> (down ’((a) (fine) (idea)))
(((a)) ((fine)) ((idea)))
> (down ’(a (more (complicated)) object))
((a) ((more (complicated))) (object))
```

_Answer:_

```scheme
(define down
  (lambda (lst)
    (if (list? list)
        (cons (list (car lst))
              (down (cdr lst)))
        '())))
```

**Exercise 1.18** [\*] (swapper s1 s2 slist) returns a list the same as slist, but
with all occurrences of s1 replaced by s2 and all occurrences of s2 replaced by s1.

```scheme
> (swapper ’a ’d ’(a b c d))
(d b c a)
> (swapper ’a ’d ’(a d () c d))
(d a () c a)
> (swapper ’x ’y ’((x) y (z (x))))
((y) x (z (y)))
```

_Answer:_

```scheme
(define (swapper old new lst)
  (if (null? lst)
      '()
      (if (symbol? (car lst))
          (if (eqv? old (car lst))
              new
              old)
          (cons (swapper old new (car list))
                (swapper old new (cdr list))))))
```

**Exercise 1.19** [\*\*] (list-set lst n x) returns a list like lst, except that the n-th
element, using zero-based indexing, is x.

```scheme
> (list-set ’(a b c d) 2 ’(1 2))
(a b (1 2) d)
> (list-ref (list-set ’(a b c d) 3 ’(1 5 10)) 3)
(1 5 10)
```

```scheme
(define list-set
  (lambda (lst num object)
    (if (null? lst)
        '()
        (if (eqv? num 0)
            (cons object (cdr lst))
            (cons (car lst)
                  (list-set (cdr lst) (- num 1) object))))))
```

**Exercise 1.20** [\*] (count-occurrences s slist) returns the number of occurrences of s in slist.

```scheme
> (count-occurrences ’x ’((f x) y (((x z) x))))
3
> (count-occurrences ’x ’((f x) y (((x z) () x))))
3
> (count-occurrences ’w ’((f x) y (((x z) x))))
0
```

**Exercise 1.21** [\*\*] (product sos1 sos2), where sos1 and sos2 are each a list
of symbols without repetitions, returns a list of 2-lists that represents the Cartesian
product of sos1 and sos2. The 2-lists may appear in any order.

```scheme
> (product ’(a b c) ’(x y))
((a x) (a y) (b x) (b y) (c x) (c y))
```

**Exercise 1.22** [\*\*] (filter-in pred lst) returns the list of those elements in
lst that satisfy the predicate pred.

```scheme
> (filter-in number? ’(a 2 (1 3) b 7))
(2 7)
> (filter-in symbol? ’(a (b c) 17 foo))
(a foo)
```

**Exercise 1.23** [\*\*] (list-index pred lst) returns the 0-based position of the
first element of lst that satisfies the predicate pred. If no element of lst satisfies
the predicate, then list-index returns #f.

```scheme
> (list-index number? ’(a 2 (1 3) b 7))
1
> (list-index symbol? ’(a (b c) 17 foo))
0
> (list-index symbol? ’(1 2 (a b) 3))
#f
```

**Exercise 1.24** [\*\*] (every? pred lst) returns #f if any element of lst fails to
satisfy pred, and returns #t otherwise.

```scheme
> (every? number? ’(a b c 3 e))
#f
> (every? number? ’(1 2 3 5 4))
#t
```

**Exercise 1.25** [\*\*] (exists? pred lst) returns #t if any element of lst satisfies
pred, and returns #f otherwise.

```scheme
> (exists? number? ’(a b c 3 e))
#t
> (exists? number? ’(a b c d e))
#f
```

**Exercise 1.26** [\*\*] (up lst) removes a pair of parentheses from each top-level element of lst. If a top-level element is not a list, it is included in the result, as is.
The value of (up (down lst)) is equivalent to lst, but (down (up lst)) is
not necessarily lst. (See exercise 1.17.)

```scheme
> (up ’((1 2) (3 4)))
(1 2 3 4)
> (up ’((x (y)) z))
(x (y) z)
```

**Exercise 1.27** [\*\*] (flatten slist) returns a list of the symbols contained in
slist in the order in which they occur when slist is printed. Intuitively, flatten
removes all the inner parentheses from its argument.

```scheme
> (flatten ’(a b c))
(a b c)
> (flatten ’((a) () (b ()) () (c)))
(a b c)
> (flatten ’((a b) c (((d)) e)))
(a b c d e)
> (flatten ’(a b (() (c))))
(a b c)
```

**Exercise 1.28** [\*\*] (merge loi1 loi2), where loi1 and loi2 are lists of integers
that are sorted in ascending order, returns a sorted list of all the integers in loi1 and
loi2.

```scheme
> (merge
(1 1 2 4
> (merge
(3 35 62
’(1 4) ’(1 2 8))
8)
’(35 62 81 90 91) ’(3 83 85 90))
81 83 85 90 90 91)
```

**Exercise 1.29** [\*\*] (sort loi) returns a list of the elements of loi in ascending

```scheme
> (sort ’(8 2 5 2 3))
(2 2 3 5 8)
```

**Exercise 1.30** [\*\*] (sort/predicate pred loi) returns a list of elements sorted
by the predicate.

```scheme
> (sort/predicate < ’(8 2 5 2 3))
(2 2 3 5 8)
> (sort/predicate > ’(8 2 5 2 3))
(8 5 3 2 2)
```

**Exercise 1.31** [\*] Write the following procedures for calculating on a bintree (defi-
nition 1.1.7): leaf and interior-node, which build bintrees, leaf?, which tests
whether a bintree is a leaf, and lson, rson, and contents-of, which extract the
components of a node. contents-of should work on both leaves and interior
nodes.

**Exercise 1.32** [\*] Write a procedure double-tree that takes a bintree, as represented
in definition 1.1.7, and produces another bintree like the original, but with all the
integers in the leaves doubled.

**Exercise 1.33** [\*\*] Write a procedure mark-leaves-with-red-depth that takes a
bintree (definition 1.1.7), and produces a bintree of the same shape as the original,
except that in the new tree, each leaf contains the integer of nodes between it and the
root that contain the symbol red. For example, the expression

```scheme
(mark-leaves-with-red-depth
(interior-node ’red
(interior-node ’bar
(leaf 26)
(leaf 12))
(interior-node ’red
(leaf 11)
(interior-node ’quux
(leaf 117)
(leaf 14))
```

which is written using the procedures defined in exercise 1.31, should return the bin-
tree

```scheme
(red
(bar 1 1)
(red 2 (quux 2 2)))
```

**Exercise 1.34** [\*\*\*] Write a procedure path that takes an integer n and a binary
search tree bst (page 10) that contains the integer n, and returns a list of lefts and
rights showing how to find the node containing n. If n is found at the root, it returns
the empty list.

```scheme
> (path 17 ’(14 (7 () (12 () ()))
(26 (20 (17 () ())
())
(31 () ()))))
(right left left)
```

**Exercise 1.35** [\*\*\*] Write a procedure number-leaves that takes a bintree, and
produces a bintree like the original, except the contents of the leaves are numbered
starting from 0. For example,

```scheme
(number-leaves
(interior-node ’foo
(interior-node ’bar
(leaf 26)
(leaf 12))
(interior-node ’baz
(leaf 11)
(interior-node ’quux
(leaf 117)
(leaf 14))
```

should return

```scheme
(foo
(bar 0 1)
(baz
2
(quux 3 4)))
```

**Exercise 1.36** [\*\*\*] Write a procedure g such that number-elements from page 23
could be defined as

```scheme
(define number-elements
  (lambda (lst)
    (if (null? lst) ’()
      (g (list 0 (car lst)) (number-elements (cdr lst))))))
```

## Chapter 2 Data Abstraction

### 2.1 Specifiying Data via Interfaces

**1. Define new data type**

New entity! ⇒ Need new data type ⇒ Most efficient form is often hard ⇒ do simple one 1st, then try to change.

**2. Abstract data type**

**Data Abstraction** divides a data type into: an *interface* and an *implementation*. Then there's an abstract data type. After this， *clients* manipulating the new data type are needed.

**3. representation-indenpendent clients**

When the client manipulates the values of the data type *only* through the procedures in the *interface*, we say that the *client* code is *representation-independent*, because then the code does not rely on the representation of the
values in the data type.





Data abstraction -> interface, implementation 2. Representation-independent 3. Example: nonnegative integers.
<br>Interface:
<br>&nbsp; Constant: zero
<br>&nbsp; Procedures: iszero?, succ, pred 4. Opague <-> Transparent
1. Kinds of data types:
- aggregate: contains values of other types, e.g. array, record
- union: values are of one or the other of multiple given types.
- discriminated union: contain a value of one of the union's types and a tag indicating which type the value are belongs to.
2. ENVIRONMENT:
- associates values with variables.
3. Variables may be represented by: symbols, strings, references into a hash table or even numbers.
4. Environment interface:

```scheme
   (empty-env)
   (apply-env env var)
   (extend-env var val env)
```

Designing an interface for a recursive data type
1. Include one constructor for each kind of data in the data type.
2. Include one predicate for each kind of data in the data type.
3. Include one extractor for each piece of data passed to a constructorof the data type.

4.

```scheme
   (define-datatype
        <type-name>
        <type-predicator-name>
        (<variant-name>                           ; 1+ variants
            (<field-name> <predicator>)           ; 0+ fields
            ...)
        ...)
```

2.

```scheme
   (case
       <typename>
       <expression>
       (<variant-name>
           (<field-name> ...)
           <consequent>)
           ...)
       (else <default>)
```
1. Abstract Syntax Tree
2. Parse and un-parse

empty-env : () → Env
(define empty-env
(lambda () (list 'empty-env)))

extend-env : Var × SchemeVal × Env → Env
(define extend-env
(lambda (var val env)
(list 'extend-env var val env)))

apply-env : Env × Var → SchemeVal
(define apply-env
(lambda (env search-var)
(cond
((eqv? (car env) 'empty-env)
(report-no-binding-found search-var))
((eqv? (car env) 'extend-env)
(let ((saved-var (cadr env))
(saved-val (caddr env))
(saved-env (cadddr env)))
(if (eqv? search-var saved-var)
saved-val
(apply-env saved-env search-var))))
(else
(report-invalid-env env)))))

(define report-no-binding-found
(lambda (search-var)
(error 'apply-env "No binding for ~s" search-var)))

(define report-invalid-env
(lambda (env)
(error 'apply-env "Bad environment: ~s" env)))

E 2.8
empty-env? : env -> bool
(define (emtpy-env? env)
(if (eqv? (car env) 'empty-env)
#t
#f))

E 2.9
has-binding? : var env -> bool
(define (has-binding? var env)
(if (eqv? (car env) 'empty-env)
#f
(if (eqv? (car env) 'extend-env)
(if (eqv? (cadr env) var)
#t
(has-binding? var (cadddr env)))
(report-invalid-env))))

E 2.10
extend-env\* : var-list val-list env -> env

### 2.2 Representation Strategies for Data Types

Represent ENV as a procedure: takes the search-var and returns the value.

empty-env : () → Env
(define (empty-env)
(list
(lambda (search-var)
(report-no-binding-found search-var))
(lambda ()
#t)
(lambda (search-var)
(report-no-binding-found search-var))))

extend-env : Var × SchemeVal × Env → Env
(define (extend-env saved-var saved-val saved-env)
(list
(lambda (search-var)
(if (eqv? search-var saved-var)
saved-val
(apply-env (car saved-env) search-var)))
(lambda ()
(or #t (cdr saved-env)))
(lambda (search-var)
(if (eqv? search-var saved-var)
#t
(has-binding? env search-var)))))

apply-env : Env × Var → SchemeVal
(define apply-env
(lambda (env search-var)
((car env) search-var)))

(define report-no-binding-found
(lambda (search-var)
(error ’apply-env "No binding for ~s" search-var)))

E 2.13
(define (empty-env? env)
(cadr env))

E 2.14
(define (has-binding? env)
(caddr env))

### 2.3 Interfaces for Recursive Data Types

### 2.4 A Tool for Defining Recursive Data Types

### 2.5 Abstract Syntax and Its Representation

### Exercises

## Chapter 3 Expressions

### 3.1 Specification and Implementation Strategy

### 3.2 LET: A Simple Language

### 3.3 PROC: A Language with Procedures

### 3.4 LETREC: A Language with Recursive Procedures

### 3.5 Scoping and Binding of Variables

### 3.6 Eliminating Variable Names

### 3.7 Implementing Lexical Addressing

## Chapter 4 State

### 4.1 Computational Effects

### 4.2 EXPLICIT-REFS: A Language with Explicit References

### 4.3 IMPLICIT-REFS: A Language with Implicit References

### 4.4 MUTABLE-PAIRS: A Language with Mutable Pairs

### 4.5 Parameter-Passing Variations

## Chapter 5 Continuation-Passing Interpreters

### 5.1 A Continuation-Passing Interpreter

### 5.2 A Trampolined Interpreter

### 5.3 An Imperative Interpreter

### 5.4 Exceptions

### 5.5 Threads

## Chapter 6 Continuation-Passing Style

### 6.1 Writing Programs in Continuation-Passing Style

### 6.2 Tail Form

### 6.3 Converting to Continuation-Passing Style

### 6.4 Modeling Computational Effects

## Chapter 7 Types

### 7.1 Values and Their Types

### 7.2 Assigning a Type to an Expression

### 7.3 CHECKED: A Type-Checked Language

### 7.4 INFERRED: A Language with Type Inference

## Chapter 8 Modules

### 8.1 The Simple Module System

### 8.2 Modules That Declare Types

### 8.3 Module Procedures

## Chapter 9 Objects and Classes

### 9.1 Object-Oriented Programming

### 9.2 Inheritance

### 9.3 The Language

### 9.4 The Interpreter

### 9.5 A Typed Language

### 9.6 The Type Checker

## A For Futher Reading

## The SLLGEN Parsing System
