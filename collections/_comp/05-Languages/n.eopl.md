---
category: Notes
title: Essentials of Programming Languages 
tags: Languages
---

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
- eqv? : whether same object. #t if two paramters are identical primitive values.
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
