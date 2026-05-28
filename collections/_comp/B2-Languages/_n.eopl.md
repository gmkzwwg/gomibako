---
title: Essentials of Programming Languages Annotated
categories: Notes
subclass: Languages
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
