---
category: Notes
title: Structure and Interpretation of Computer Programs
tags: Languages
---

Textbook: 
  - [SICP](https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/full-text/book/book-Z-H-4.html) 
  - [Composing Programs](https://www.composingprograms.com/)   

## CS61A

### Lecture 1 Welcome

Expressions
  - `can` describe a computation and evaluates to a value.
  - everything could be expressed using a call expression.
  - `call expressions`:
    - could be done by listing the name of the operator and operands.

Operators and operands
  - `are` expressions.
  - finally are evaluated to values.

```python
>>> from math import max
>>> max(7.5, 9.5) # operator: max operands: 7.5, 9.5
9.5 # value
```

Interpreters
  - `can` provide a prompt, where it waits an expression typed, evaluate it, and then displays its value.
  - The way programming languages work is that they interpret expressions by applying `evaluations procedures`, over and over again procedurally.

Evaluation procedures
  1. Evaluate the operator and then the operand subexpressions.
  2. **Apply the function** that is the value of the operator subexpression **to the arguments** that are the values of the operand subexpression.

### Lecture 2 Functions

#### Name, binding, and the enviroment

In Python, we can establish new bindings using the assignment statement, which contains a name to the left of = and a value to the right:

```python
# [the name] = [any expressions]
>>> radius = 10
>>> radius
10
```

When the name is bound, the expressions are evaluated, and **only the value** is given to the name.

```python
>>> from math import pi
>>> area, circumference = pi * radius * radius, 2 * pi * radius
>>> area
314.1592653589793
>>> radius = 10000000 # radius changed
>>> area # area is not related to radius
314.1592653589793


```


### About Python

A Programming Language contains:
  - `Values`
  - `Primitive operations` (on values)
  - `Combining mechanisms`
  - (Predefined) `libraries` including useful staffs
  - Definational Mechanisms 

Python Values:
  - **Integers**
    - Decimal (base 10): 0 -1
    - Binary (base 2): 0b1011
    - Octal (base 8): 0o20
    - Hexadecimal (base 16): 0xFF
  - **Boolean values**: `True`, `False`
  - **NoneType** (null): `None`
  - **Functions**, defined with `def` and `lambda`
  - **Strings**: "Say \\"hello\\"!"
  - **Tuples**
    - Empty tuple: ()
    - Non-empty tuple: (1, "fe", (2, 3))
    - Tuple comprehension
  - **Ranges**: range(11), range(2, 8)
  - **Lists**
    - Empty List: []
    - Non-empty List: [1, "fe", (2, 3)]
    - List comprehension: [i `for` i `in` range(30) `if` i % 3 == 0]
  - **Dictionaries**
    - Empty Dictionary: {}
    - Non-empty Dictionary: {"one" : 1, "two" : 2}
    - Dictionary comprehension: {x: x**2 for x in (2, 4, 6)} {k:v*2 for (k,v) in dict1.items()}
  - Sets**
    - Empty set: set([])
    - Non-empty Set: { 1, 2 }
    - Set Comprehension: { x for x in range(20) if prime(x) }

## MIT 6.001

### Lecture 1A

In computer science, we are:
  1. into bussiness of formalizing "how-to" imperative knowledge.
  2. dealing with idealized components (abstarct entities).
  3. using techniques for **controlling complexity**.

> Declarative knowledge: "what-is"; imperitive knowledge: "how-to".

Techniques for controlling comlexity:
  1. black-box abstraction.
  2. conventional interfaces.
  3. metalinguistic abtraction.

Combination with `prefix notation`: (OPERATOR {OPERANDS}*)
  - parentheses are used for **writing 2-dimension structures as linear character strings**.

DEFINE and LAMBDA

```lisp
> (define a (* 5 5)) # bound value to a
> a
25
> (a)
Exception: attempt to apply non-procedure 25
Type (debug) to enter the debugger.

> (define (b) (* 5 5)) # bound procedure to b
> b
#<procedure b>
> (b)
25
```

Case analysis: COND, IF
  - predicates are procedures return `ture` or `false`

Recursive definition

*Case 1*: to fine an approximation to $$\sqrt{x}$$
  1. make a guess G
  2. imporove the guess by average G and X/G
  3. keep imporove the guess, until it is good enough
  4. use 1 as an initial guess

```scheme


(define (square x)
  (* x x))

(define (average a b)
  (/ (+ a b) 2))

(define (improve guess x)
  (average guess (/ x guess)))

(define (good-enough? guess x)
  (< (abs (- (square guess) x))
     0.001))

(define (try guess x)
  (if (good-enough? guess x)
      guess
      (try (improve guess x) x)))

(define (sqrt x)(try 1 x))
```
Symbol dependencies:

```mermaid
graph TD
    A[sqrt] --> B[try]
    B --> C[good-enough?]
    B --> F[imporve]
    B --> B
    C --> D[abs]
    C --> E[square]
    F --> G[average]
```

Recursive application of (sqrt 2):

```mermaid
graph TB
    A["(sqrt 2)"] --> B["(try 1 2)"]
    B --> C["(try (improve 1 2) 2)"]
    C --> D["(average 1 (/ 2 1))"]
    D --> C
    C --> E["(try 1.5 2)"]
    E --> F["(try (improve 1.5 2) 2)"]
    F --> G["(average 1.5 (/ 2 1.5))"]
    G --> F
    F --> H["(try 1.3333 2)"]
    H --> I[...]
    I --> K[577/408]
```

Words
  - lousy ['laʊzi] adj.非常糟的；极坏的；恶劣的
  - priesthood [ˈpriːsthʊd] n.牧师（或教士、神父、司铎）的职位；司祭品
  - rudiment 初步；基本；【生】(器官的)原基；退化[痕迹]器官
  - fiddling ['fɪdlɪŋ] adj.琐碎的；繁琐的
    - ['fɪd(ə)l] n.调整；摆弄；欺诈；骗钱行为 v.伪造；不停摆弄；篡改；对…做手脚
  - gadget  [ˈɡædʒɪt] n.小器具；小装置
  - as oppose to 与…形成对照
  - [ˈkʌndʒə(r)] v.变戏法；变魔术；使…变戏法般地出现（或消失）
  - implication [.ɪmplɪ'keɪʃ(ə)n] n.含意；可能的影响（或作用、结果）；暗指；（被）牵连
  - exploit [ɪkˈsplɔɪt] v.开发；利用；开拓；开采 n.英勇（或激动人心、引人注目）的行为
  - aeronautical [ˌeərə'nɔ:tɪkl] adj.航空的
  - immense [ɪ'mens] adj.巨大的；大量的；浩瀚的；无限的
    - immerse [ɪˈmɜː(r)s]v.使浸没于；（使）深陷于
  - cascade [kæ'skeɪd] n.级联；阶梯；(陡岩落下的)瀑布；【园艺】人工瀑布 v.串联；泻；〔罕用语〕(使)成瀑布落下；奔流 adj.型栅的
  - theraml [ˈθɜː(r)m(ə)l] adj.热的；热量的；保暖的；防寒的 n.上升的热气流；保暖内衣裤
  - suppress [sə'pres] v.抑制；压制；阻止；控制
  - amplifier  [ˈæmplɪˌfaɪə(r)] n.放大器；放大器电路；【电】扩大器
  - screw  [skruː] n.螺丝；螺丝钉；（对螺丝的）旋拧；性交 v.用螺丝固定（或拧牢）；旋紧；拧紧；拧上去
    - screw up 拧紧;钉上;搞砸了
  - impedance [ɪmˈpiːd(ə)ns] n.阻抗
  - allude [əˈluːd] v.暗指；(婉转)提到；指…说
  - aggregate  [ˈæɡrɪɡeɪt] n.骨料；合计；总数 v.合计；总计 adj.总数的；总计的

### Lecuture 1b