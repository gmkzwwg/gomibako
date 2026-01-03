---
category: Notes
title: Practical Common Lisp
tags: Lisp
---

### Chapter 4

<div class="message">
    Introduce to S-expressions,function references,special operators,macros,truth & falsehood & equality and formatting codes.
</div>

```elisp
;;; Chapter 4 SYNTAX & SEMANTICS

;; quote
;; Takes a single expression as its “argument” and simply returns it,special operator
(quote (+ 1 2))
;; Return: (+ 1 2)

;; (eq ARG0 ARG1)
;; Two objects are EQ if they’re identical. The object identity of numbers and characters depends on how those data types are implemented in a particular Lisp.

;; (eql ARG0 ARG1)
;; Behave like EQ except that it also is guaranteed to consider two objects of the same class representing the same numeric or character value to be equivalent.
(eql 1 1.0)
;; Return: NIL
(eql "c" "c")
;; Return: NIL

;; (equal ARG0 ARG1)
;; Loosens the discrimination of EQL to consider lists equivalent if they have the same structure and contents, recursively, according to EQUAL . EQUAL also considers strings equivalent if they contain the same characters.
(equal "c" "c")
;; Return: T

;; (equalp ARG0 ARG1)
;; Behave like EQUAL but ignore differences in case.
(equal "c" "C")
;; Return: t
```

#### NIL and T
NIL is the only object that’s both an atom and a list: in addition to falsehood, it’s also used to represent the empty list.The expressions nil, (), 'nil, and '() all evaluate to the same thing—the unquoted forms are evaluated as a reference to the constant variable whose value is the symbol NIL , but in the quoted forms the QUOTE special operator evaluates to the symbol directly.

The symbol T is the canonical true value and can be used when you need to return a non- NIL value and don’t have anything else handy.For the same reason as NIL, both t and 't will evaluate to the same thing: the symbol T .

### Chapter 5

<div class="message">
Defining functions,4 parameter types,high-order functions(function as data),anonymous functions.
</div>

```elisp
;;; Chapter 5 FUNCTIONS

;; (defun NAME ARGLIST &optional DOCSTRING DECL &rest BODY)
;; Define a function
(defun hello-world (x) (format t "~a ,hello world!" x))
;; Return: HELLO-WORLD

;; (documentation X DOC-TYPE)
;; Get the documentation string of the object,function
(documentation 'foo 'function)
;; Return the DOCSTRING

;; return-from
;; Return from everywhere the specail operator is.

;; (funcall FUNCTION &REST ARGUMENTS)
;; Use when you know the number of arguments you’re going to pass to the function at the time you write the code. The first argument to FUNCALL is the function object to be invoked, and the rest of the arguments are passed onto that function,special operator.
(funcall 'list 1 2 3)
;; Return the result of FUNCTION,in the case above,(1 2 3)

;; (apply FUNCTION &rest ARGUMENTS)
;; (apply #'func func-args)==(func (first func-args) (second func-args) (third func-args) (fourth func-args........)),that is ,apply recieves a list as the lambda list of FUNCTION.
(apply #'list (list 1 2 3))
(apply #'append (list (list 1 2) (list 3)))
;; Return: (1 2 3)

;; (exp ARG0)
;; Return e^ARG0
(exp 1)
;; Return: 2.7182817

;; (lambda &WHOLE WHOLE-FORM LAMBDALIST &BODY BODY) [2 times]
(lambda (x) (* x 2))
;; Return: #<FUNCTION :LAMBDA (X) (* X 2)>
```


#### Mixing Different Parameter Types

(required-parameters optional-parameters rest-parameters keyword-parameters)

Only keyword-parameters isn't positional.

If both &rest and &key appear in a parameter list, then both things happen—all the remaining values, which include the keywords themselves, are gathered into a list that’s bound to the &rest parameter, and the appropriate values are also bound to the &key parameters. So, given this function:

```elisp
(defun foo (&rest rest &key a b c) (list rest a b c))
```

\> (foo :a 1 :b 2 :c 3)

((:A 1 :B 2 :C 3) 1 2 3)

#### Default Parameter Value

```elisp
;; With no parameters,assign width and height with 1; with one paramters,assign height with width presented.In other words,make squares...
(defun rectangle-area (&optional (width 1) (height width)))
```

#### ARG and ARG-SUPPLIED-P
ARG-SUPPLIED-P is designed to know whether the value of an optional argument was supplied by the caller or is the default value.By convention, these variables are usually named the same as the actual parameter with a “-supplied-p” on the end. For example:

```elisp
(defun foo (a b &optional (c 3 c-supplied-p))
  (list a b c c-supplied-p))
```

\> (foo 1 2)

(1 2 NIL)

\> (foo 1 2 3)

(1 2 3 T)

#### Anonymous Functions - LAMBDA Expression

1.Anonymous functions can be useful when you need to pass a function as an argument to another function and the function you need to pass is simple enough to express inline.

2.The other important use of LAMBDA expressions is in making closures, functions that capture part of the environment where they’re created.

### Chapter 6

<div class="message">
Lexical variables, dynamic variables, closures, constants, assignments, generalized assignment, rotate and shift muiltiple variables.
</div>

```elisp
;;; Chapter 6 VARIABLES

;; (LET ...) and (LET* ...) called BINDING FORMS ,and there are more binding forms in CL,etc. function definition.

;; (let VARLIST &body BODY)
;; Introduce new variables in a binding form,special operator.
(let ((a 10) (b 20) c)
  (setf c 30)
  (+ a b c))
;; Return the last form in BODY,that is, 60.

;; (let * VARLIST &body BODY)
;; Behave like LET but you can binding a variable with variable appears earlier in VARLIST.
(let* ((a 10) (b (* 2 a)) (c (+ b 10)))
  (+ a b c))
;; Return the last form in BODY,that is, 60.
(let ((a 10) (b (* 2 a)) (c (+ b 10)))
  (+ a b c))
;; ERROR!

;; (defparameter VAR VAL &OPTIONAL (DOC NIL DOCP))
;; Define a global variable.
(defparameter *var* 100 "An useless variable.")
;; Return: *VAR*

;; (defvar VAR VAL &OPTIONAL (DOC NIL DOCP))
;; Define a global variable.
(defvar *var~* 100 "Another useless variable.")
;; Return: *VAR*

;; (defconstant NAME VALUE &OPTIONAL DOCUMENTATION)
;; Define a constant.
(defconstant +const+ 100 "An Useless constant")
;; Return: +CONST+

;; (setf &REST ARGS $ENVIRONMENT ENV)
;; another form explaination: setf: (PLACE VAL PLAVE VAL ...)
;; Assign any place a value,macro.
(setf *var* 200)
;; Return: 200

;; (aref ARRAY IDX)
;; Access ARRAYs,function

;; (gethash KEY HASHTABLE &optional DEFAULT)
;; Access hashtables.

;; (incf PLACE &OPTIONAL (DELTA 1) &ENVIRONMENT ENV)
;; Increase PLACE by DELTA (default,1),macro based on SETF
(incf *var*)
;; Return: 201
(incf *var* 3)
;; Return: 204

;; (decf PLACE &OPTIONAL (DELTA 1) &ENVIRONMENT ENV)
;; Decrease PLACE by DELTA (defualt,1),macro based on SETF

;; (random LIMIT &optional *RANDOM-STATE*)
(random 100)

;; (rotatef &REST ARGS &ENVIRONMENT ENV)
;; ↓←←←↑
;; ↓   ↑
;; ↓→→→↑
CL-USER> (defparameter count1 1)
COUNT1
CL-USER> (defparameter count2 2)
COUNT2
CL-USER> (defparameter count3 3)
COUNT3
CL-USER> (rotatef count1 count2 count3)
NIL
CL-USER> (eval count1)
2
CL-USER> (eval count2)
3
CL-USER> (eval count3)
1
;; Return: NIL

;; (shiftf PLACE ... VAL)
;; PLACE←←←
;; ↓
;; Return
```

#### Binding Forms

The scope of function parameters and LET variables—the area of the program where the variable name can be used to refer to the variable’s binding—is delimited by the form that introduces the variable. This form—the function definition or the LET —is called the binding form.

#### Differences of DEFVAR and DEFPARAMETER

In short, DEFVAR can use to define unbinded variables and bind a value to an unbinded variables.DEFPARAMETER always bind a variable (binded or unbinded) with a value.

The difference between the two forms is that DEFPARAMETER always assigns the initial value to the named variable while DEFVAR does so only if the variable is undefined. A DEFVAR form can also be used with no initial value to define a global variable without giving it a value. Such a variable is said to be unbound.

Practically speaking, you should use DEFVAR to define variables that will contain data you’d want to keep even if you made a change to the source code that uses the variable. For instance, suppose the two variables defined previously are part of an application for control- ling a widget factory. It’s appropriate to define the *count* variable with DEFVAR because the number of widgets made so far isn’t invalidated just because you make some changes to the widget-making code.

#### Some boring tests

```elisp
;; Test 1
CL-USER> (defparameter *fn* (let ((count 0)) #'(lambda () (setf count (1+ count)))))
*FN*
CL-USER> (funcall *fn*)
1
CL-USER> (funcall *fn*)
2
CL-USER> (funcall *fn*)
3
CL-USER> *fn* ;; Now *fn* is a function and in it's closure, count is increasing.
#<CLOSURE (LAMBDA ()) {1005FB5C8B}>
CL-USER> (defparameter *fn* (let ((count 0)) #'(lambda () (setf count (1+ count)))))
*FN*
CL-USER> (funcall *fn*)
1
CL-USER> (funcall *fn*)
2
CL-USER> (funcall *fn*)
3
CL-USER> (defparameter count 1) ;; If you can.
COUNT
CL-USER> (funcall *fn*) ;; In *fn* closure, COUNT is 4
4
CL-USER> (eval count) ;; In global closure, COUNT is 1
1

;; Test 2
CL-USER> (defparameter fn (let ((count 0)) (format t "~a" count) #'(lambda () (setf count (1+ count)))))
0
FN
CL-USER> (funcall fn)
1
CL-USER> (funcall fn)
2
CL-USER> (funcall fn)

;; Test 3
CL-USER> (let ((count 0)) (setf count (+ 2 count)) (format t "~a" count) (funcall #'(lambda () (setf count (1+ count)))))
2
3

;; Test 4
(defparameter fn (let ((count 0)) (setf count (+ 2 count)) (format t "~a" count) (funcall #'(lambda (count) (setf count (1+ count))) count) #'(lambda (count) (setf count (1+ count)))))
2
NF
CL-USER> (funcall fn 3)
4
CL-USER> (funcall fn 3)
4
CL-USER> (eval 'fn)
#<FUNCTION (LAMBDA (COUNT)) {1006865B1B}>
```
### Chapter 7

<div class="message">
Conditional constructs, boolean logic operators, loopings, macros.
</div>

```elisp
;;; Chapter 7 MACRO 1

;; 1.Conditional Constructs

;; (if TEST THEN &OPTIONAL ELSE)
;; If TEST don't return NIL,execute THEN,otherwise execute ELSE,if exists,special operator.
;; THEN and ELSE must behave as exactly one form.
(if (= 2 3) "An useless string" "An useful string")
;; Return : "An usefull string"

;; (progn &REST FORMS)
;; Executes any number of forms in order and returns the value of the last form.
;; Normally work with IF.
(if (< 2 3)
    (progn
      (format t "Two little black birds sitting on a hill.")
      (format t "One named Jack, the other named Hélodie Jaqueline.")))
;; Print: Two little black birds sitting on a hill.One named Jack, the other named Hélodie Jaqueline.
;; Return: NIL
(if (< 2 3)
    (let ((x "Alexander"))
      (format t "Two little black birds sitting on a hill.")
      (format t "One named Jack, the other named Hélodie ~d Jaqueline." x)
      (eval x)
      (+ 2 3)))
;; Print: Two little black birds sitting on a hill.One named Jack, the other named Hélodie Alexander Jaqueline.
;; Return: 5
(if T (defparameter *test-if* 3) (defparameter *test-if* 2))
;; Return: *TEST-IF*
(eval *test-if*)
;; Return: 3

;; (when TEST &BODY FORMS)
;; If TEST don't return NIL,execute FORMS,macro
(when (< 2 3)
  (format t "Two little black birds sitting on a hill.")
  (+ 2 3)
  (+ 3 4))
;; Print: Two little black birds sitting on a hill.
;; Return: 7

;; (unless TEST &BODY FORMS)
;; If TEST return NIL,execute FORMS,macro
(unless (< 2 3)
  (format t "Two little black birds sitting on a hill.")
  (+ 2 3)
  (+ 3 4))
;; Return: NIL

;; (cond
;;   (test-1 form*)
;;   ...
;;   (test-n form*)
;; The conditions are evaluated in the order the branches appear in the body until one of them evaluates to true. At that point, the remaining forms in that branch are evaluated, and the value of the last form in the branch is returned as the value of the COND as a whole. If the branch contains no forms after the condition, the value of the condition is returned instead.
(cond
  ((= 1 2) "Impossible.")
  ((= 1 2) (format t "Two little bir..") (list 2 3) (list 3 4)))
;; Print: Two little bir..
;; Return: (3 4)

;; 2.Boolean Logic Operators

;; (not OBJECT)
;; Logical negation,function.
(not nil)
;; Return: T
(not (= 1 1))
;; Return: NIL

;; (and &REST FORMS)
;; Logical conjunction,macro.
(and (= 1 2) (= 3 3))
;; Return: NIL

;; (or &REST FORMS)
;; Logical disjunction,macro.
(or (= 1 2) (= 3 3))
;; Return: T

;; 3.Loooooooooooooooooooping


;; (dolist (VAR LISTFORM &OPTIONAL RESULTFORM) &BODY BODY)
;; Loops across the items of a list, executing the loop body with a variable holding the successive items of the list,macro.
(dolist (x '(1 2 3)) (print x) (if (evenp x) (return)))
;; Print: 1
;; Print: 2
;; Return: NIL

;; (dotimes (VAR COUNT &OPTIONAL (RESULT NIL)) &BODY BODY)
;; Loop for COUNT tims.COUNT must be a integer,macro.
(dotimes (x 3) (print x))
;; Print: 0
;; Print: 1
;; Print: 2
;; Return: NIL

;; (do
;;   ((VAR INIT [STEP]) ...)
;;   (END-TEST [RESULT...])
;;   BODY...)
;; Bind any number of variables,
;; complete control over how they change on each step through the loop by [STEP],
;; determines when to end the loop and can provide a form to evaluate at the end of the loop to generate a return value for the DO expression as a whole.
(do ((n 0 (1+ n))
     (cur 0 next)
     (next 1 (+ cur next)))
    ((= 10 n) cur)
  (print cur))
;; Compute fibonacci sequence.
;; Print: 0
;; Print: 1
;; Print: 1
;; Print: 2
;; Print: 3
;; Print: 5
;; Print: 8
;; Print: 13
;; Print: 21
;; Print: 34
;; Return!: 55

;; (loop  &ENVIRONMENT &REST KEYWORDS-AND-FORMS)
;; A mightly but lispization loop,The symbols across, and, below, collecting, counting, finally, for, from, summing, then, and to are some of the loop keywords whose presence identifies these as instances of the extended LOOP, macro.
(loop for i from 1 to 10 collecting i)
;; Return: (1 2 3 4 5 6 7 8 9 10)
(loop for x below 10 summing (expt x 2))
;; Return: 285
(loop for x across "the quick brown fox jumps over the lazy dog"
   counting (find x "aeiou"))
;; Return: 11
(loop for i below 10
   and a = 0 then b
   and b = 1 then (+ b a)
   finally (return a))
;; Return: 55, the 10th item of fibonacci sequence.

;; (expt BASE POWER)
;; Expornent arithmetic,function.
(expt 2 5)
;; Return: 32
```

#### Define WHEN and UNLESS

```elisp
(defmacro when (condition &rest body)
`(if ,condition (progn ,@body)))

(defmacro unless (condition &rest body)
`(if (not ,condition) (progn ,@body)))
```

#### Short-circuit in AND & OR

Macro AND & OR evaluate only as many of their subforms—in left-to-right order—as necessary to determine the overall truth value. Thus, AND stops and returns NIL as soon as one of its subforms evaluates to NIL . If all the subforms evaluate to non- NIL , it returns the value of the last subform. OR , on the other hand, stops as soon as one of its subforms evaluates to non- NIL and returns the resulting value. If none of the subforms evaluate to true, OR returns NIL .

#### DO always use OLD values to build NEW values!

At each step of the iteration the step forms for all the variables are evaluated before assigning any of the values to the variables. This means you can refer to any of the other loop variables in the step forms. 6 That is, in a loop like this:

```elisp
(do ((n 0 (1+ n)
  (cur 0 next)
  (next 1 (+ cur next)))
  ((= 10 n) cur))
```

the step forms (1+ n), next, and (+ cur next) are all evaluated using the OLD values of n, cur, and next.
### Chapter 8
<div class="message">
    Macro definition.
</div>

```elisp
;;; Chapter 8 MACRO 2

;; (defmacro NAME ARGLIST &OPTIONAL DOCSTRING DECL &REST BODY)
;; Define macros.
(defmacro once-only ((&rest names) &body body)
  (let ((gensyms (loop for n in names collect (gensym))))
    `(let (,@(loop for g in gensyms collect `(,g (gensym))))
       `(let (,,@(loop for g in gensyms for n in names collect ``(,,g ,,n)))
          ,(let (,@(loop for n in names for g in gensyms collect `(,n ,g)))
                ,@body)))))
;; Return: ONCE-ONLY

;; (gensym &OPTIONAL (THING G))
;; Returns a unique symbol each time it’s called. This is a symbol that has never been read by the Lisp reader and never will be because it isn’t interned in any package, function.
(gensym)
;; Return: #:G721, perhaps...

;; (macroexpand-1 FORM &OPTIONAL ENV)
;; Takes any Lisp expression as an argument and returns the result of doing one level of macro expansion,function.
(macroexpand-1 `(once-only 'a 'b))
;;Return :
(LET ((#:G730 (GENSYM)) (#:G731 (GENSYM)))
  `(LET ((,#:G730 ,QUOTE) (,#:G731 ,A))
     ,(LET ((QUOTE #:G730) (A #:G731))
           'B)))
T
```

#### Macro Expansion Time & Runtime

The key to understanding macros is to be quite clear about the distinction between the code that generates code (macros) and the code that eventually makes up the program (everything else). When you write macros, you’re writing programs that will be used by the compiler to generate the code that will then be compiled. Only after all the macros have been fully expandedand the resulting code compiled can the program actually be run. The time when macros run is called macro expansion time; this is distinct from runtime, when regular code, including the code generated by macros, runs.

#### General Steps to Writing Macros

1. Write a sample call to the macro and the code it should expand into, or vice versa.
2. Write code that generates the handwritten expansion from the arguments in the
sample call.
3. Make sure the macro abstraction doesn’t “leak.”

#### , and ,@

```elisp
CL-USER> `(list 1 2 3 ,(list 1 2 3))
(LIST 1 2 3 (1 2 3))
CL-USER> `(list 1 2 3 ,@(list 1 2 3))
(LIST 1 2 3 1 2 3)
```

#### Leaks and Rules preventing Leaks

LEAKS:

1. Multiple evaluate for a form (value) which should be execute only 1 time (identical one).
2. Disruption to sequence of evaluate the formal parameter.
3. A binding may cause conflicts to value name.

RULES:

1. Unless there’s a particular reason to do otherwise, include any subforms in the expansion in positions that will be evaluated in the same order as the subforms appear in the macro call.
2. Unless there’s a particular reason to do otherwise, make sure subforms are evaluated only once by creating a variable in the expansion to hold the value of evaluating the argument form and then using that variable anywhere else the value is needed in the expansion.
3. Use GENSYM at macro expansion time to create variable names used in the expansion.
### Chapter 9

<div class="message">
    Practice: unit test framework.
</div>

- Wait... I have done no offence, one more time, I have done no offence.

- You have done, repetition.Wish you a better eternity.

```elisp

(defvar *test-name* nil)

(defmacro deftest (name parameters &body body)
  "Define a test function. Within a test function we can call
  other test functions or use 'check' to run individual test
  cases."
  `(defun ,name ,parameters
    (let ((*test-name* (append *test-name* (list ',name))))
     ,@body)))

(defmacro check (&body forms)
  "Run each expression in 'forms' as a test case."
  `(combine-results
   ,@(loop for f in forms collect `(report-result ,f ',f))))

(defmacro combine-results (&body forms)
  "Combine the results (as booleans) of evaluating 'forms' in order."
  (with-gensyms (result)
    `(let ((,result t))
      ,@(loop for f in forms collect `(unless ,f (setf ,result nil)))
      ,result)))

(defun report-result (result form)
  "Report the results of a single test case. Called by 'check'."
  (format t "~:[FAIL~;pass~] ... ~a: ~a~%" result *test-name* form)
result)
```
### Chapter 10

<div class="message">
Rationals, floating-point numbers, complex numbers, basic math, characters, strings and their comparisons.
</div>

```elisp
;;; Chapter 10 NUMBERS & CHARACTERS &STRINGS

;; (+ &REST NUMBERS)
;; (- NUMBER &REST MORE-NUMBERS)
;; (* &REST NUMBERS)
;; (/ NUMBER &REST MORE-NUMBERS)
;; (1+ NUMBER)
;; (1- NUMBER)
;; (< NUMBER &REST MORE-NUMBERS)
;; (> NUMBER &REST MORE-NUMBERS)
;; (= NUMBER &REST MORE-NUMBERS)
;; (/= NUMBER &REST MORE-NUMBERS)
;; (<= NUMBER &REST MORE-NUMBERS)
;; (>= NUMBER &REST MORE-NUMBERS)
;; (min NUMBER &REST MORE-NUMBERS)
;; (max NUMBER &REST MORE-NUMBERS)
;; (zerop NUMBER)
;; (minusp NUMBER)
;; (plusp NUMBER)
;; (evenp NUMBER)
;; (oddp NUMBER)

;; (log NUMBER &OPTIONAL (BASE NIL BASE-P))
;; Logarithms.

;; (exp NUMBER)
;; (expt BASE POWER)
;; Exponentiation.

;; (sin NUMBER)
;; (cos NUMBER)
;; (tan NUMBER)
;; (asin NUMBER)
;; (acos NUMBER)
;; (atan NUMBER)
;; Basic trigonometric functions, and their inverses.

;; (sinh NUMBER)
;; (cosh NUMBER)
;; (tanh NUMBER)
;; (asinh NUMBER)
;; (acosh NUMBER)
;; (atanh NUMBER)
;; Hyperbolic functions and their inverses.

;; (floor NUMBER &OPTIONAL (DIVISOR 1))
;; Truncates toward negative infinity, returning the largest integer less than or equal to the argument.
(floor 1.6)
;; Return: 1
;; Return: 0.6
(floor 5.5 2)
;; Return: 2
;; Return: 1.5

;; (ceiling NUMBER &OPTIONAL (DIVISOR 1))
;; Truncates toward positive infinity, returning the smallest integer greater than or equal to the argument.
(ceiling 2.4)
;; Return: 3
;; Return: -0.5999999

;; (truncate NUMBER &OPTIONAL (DIVISOR 1))
;; Truncates toward zero, making it equivalent to FLOOR for positive arguments and to CEILING for negative arguments.

;; (ROUND NUMBER &OPTIONAL (DIVISOR 1))
;; Rounds to the nearest integer. If the argument is exactly halfway between two integers, it rounds to the nearest even integer.

;; (mod NUMBER DIVISOR)
;; Return the modulus.
(mod 10 -3)
-2

;; (rem NUMBER DIVISOR)
;; Return the remainder.
(rem 10 -3)
1
```


### Comparisons.

<table>
    <thead>
        <tr>
            <td>numbers</td>
            <td>char-case-sensitive</td>
            <td>char-case-insensitive</td>
            <td>str-case-sensitive</td>
            <td>str-case-insensitive</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>=</td>
            <td>CHAR=</td>
            <td>CHAR-EQUAL</td>
            <td>STRING=</td>
            <td>STRING-EQUAL</td>
        </tr>
        <tr>
            <td>=</td>
            <td>CHAR=</td>
            <td>CHAR-NOT-EQUAL</td>
            <td>STRING=</td>
            <td>STRING-NOT-EQUAL</td>
        </tr>
        <tr>
            <td><</td>
            <td>CHAR<</td>
            <td>CHAR-LESSP</td>
            <td>STRING<</td>
            <td>STRING-LESSP</td>
        </tr>
        <tr>
            <td>></td>
            <td>CHAR></td>
            <td>CHAR-GREATERP</td>
            <td>STRING></td>
            <td>STRING-GREATERP</td>
        </tr>
        <tr>
            <td><=</td>
            <td>CHAR<=</td>
            <td>CHAR-NOT-GREATERP</td>
            <td>STRING<=</td>
            <td>STRING-NOT-GREATERP</td>
        </tr>
        <tr>
            <td>>=</td>
            <td>CHAR>=</td>
            <td>CHAR-NOT-LESSP</td>
            <td>STRING>=</td>
            <td>STRING-NOTE-LESSP</td>
        </tr>
    </tbody>
</table>

1.The functions < , > , <= , and >= order rationals and floating-point numbers (in other words, the real numbers.) Like = and /= , these functions can be called with more than two arguments, in which case each argument is compared to the argument to its right.

2.Like = , CHAR= can take any number of arguments and returns true only if they’re all the same character.

3.The string comparators can compare only two strings. That’s because they also take keyword arguments that allow you to restrict the comparison to a substring of either or both strings. The arguments—:start1, :end1, :start2, and :end2—specify the starting (inclusive) and ending (exclusive) indices of substrings in the first and second string arguments.

```elisp
(string= "foobarbaz" "quuxbarfoo" :start1 3 :end1 6 :start2 4 :end2 7)
;; Return: T

(string/= "lisp" "lissome")
;; Return: 3, the index.

(string< "lisp" "lisper")
;; Return: 4, the index.
```



#### Something about Numbers

Binary number: #B or #b

Octal number: #O or #o

Hexadecimal: #X or #x

Others base: #nR and n is the base from 2 to 36. (0-Z)

The digits in a floating-point number are always treated as base 10 digits—the #B, #X, #O, and #R syntaxes work only with rationals.

Complex numbers: #c(real-part imaginary-part)

#### REM and MOD

Two related functions are MOD and REM , which return the modulus and remainder of a truncating division on real numbers. These two functions are related to the FLOOR and TRUNCATE functions as follows:

(+ (* (floor(/ x y)) y) (mod x y)) ≡ x

(+ (* (truncate (/ x y)) y) (rem x y)) ≡ x

Thus, for positive quotients they’re equivalent, but for negative quotients they produce different results.

#### 1+, 1-, INCF and DECF

1+ and 1- are just functions that return a new value, but INCF and DECF modify a place.

### Characters

\#\x → x

\#\Space

\#\Newline

\#\Tab

\#\Rubout

\#\Linefeed

\#\Return

\#\Backspace
### Chapter 11

<div class="message">
    Vectors and hashtables.
    </div>

```elisp
;;; Chapter 11 VECTOR & HASHTABLE

;; (vector $REST OBJECTS)
;; Make fixed-size vectors containing specific values, functions.
(vector 1 2)
;; Return: #(1 2)

;; (make-array DIMENSIONS &KEY (ELEMENT-TYPE T) (INITIAL-ELEMENT NIL INITIAL-ELEMENT-P) (INITIAL-CONTENTS NIL INITIAL-CONTENTS-P) ADJUSTABLE FILL-POINTER DISPLACED-TO DISPLACED-INDEX-OFFSET)
;; Create arrays of any dimensionality as well as both fixed-size and resizable vectors, functions.
(make-array 5 :fill-pointer 0)
;; Return: #()

;; (vector-push NEW-ELEMENT ARRAY)
;; Add an element to the end of a resizable vector, adds the element at the current value of the fill pointer and then increments the fill pointer by one, returning the index where the new element was added, funtions.
;; (vector-pop ARRAY)
;; Returns the most recently pushed item, decrementing the fill pointer in the process, functions.
;; (vector-push-extend NEW-ELEMENT ARRAY &OPTIONAL MIN-EXTENSION)
;; Works just like VECTOR-PUSH except it will automatically expand the array if you try to push an element onto a full vector—one whose fill pointer is equal to the size of the underlying storage, macro.

;; (length SEQUENCE)
;; Return the size of a sequence, function.

;; (elt SEQUENCE INDEX)
;; Takes a sequence and an integer index between zero (inclusive) and the length of the sequence (exclusive) and returns the corresponding element, functions.

;; Functions to count,search,remove and replace:
;; (count ITEM SEQUENCE &REST ARGS &KEY FROM-END (START 0) (END NIL) (KEY NIL) (TEST #'EQL TEST-P) (TEST-NOT NIL TEST-NOT-P))
;; Return: Number of times item appears in sequence
;; (find ITEM SEQUENCE &REST ARGS &KEY FROM-END (START 0) END KEY TEST TEST-NOT)
;; Return: Item or NIL.
;; (position ITEM SEQUENCE &REST ARGS &KEY FROM-END (START 0) END KEY TEST TEST-NOT)
;; Return: Index into sequence or NIL
;; (remove ITEM SEQUENCE &REST ARGS &KEY FROM-END (TEST #'EQL) (TEST-NOT NIL) (START 0) (END NIL) (COUNT NIL) (KEY NIL))
;; Return: Sequence with instances of item removed
;; (substitute NEW OLD SEQUENCE &REST ARGS &KEY FROM-END (TEST #'EQL) (TEST-NOT NIL) (START 0) (COUNT NIL) (END NIL) (KEY NIL))
;; Return: Sequence with instances of item replaced with new item
;; Arguments:
;; :test : pass a function that accepts two arguments and returns a boolean. If provided,it will be used to compare item to each element instead of the default object equality test, EQL
;; :key : pass a one-argument function to be called on each element of the sequence to extract a key value, which will then be compared to the item in the place of the element itself.
;; :start & :end : Limit the effects of these functions to a particular subsequence of the sequence argument.
;; :from-end : If is provided as a non-NIL, the elements of the sequence will be examined in reverse order.
;; :count : Used to specify how many elements to remove or substitute.

;; other functions:
;; (count-if PRED SEQUENCE &REST ARGS &KEY FROM-END (START 0) (END NIL) (KEY NIL))
;; (count-if-not PRED SEQUENCE &REST ARGS &KEY FROM-END (START 0) (END NIL) (KEY NIL))
;; (find-if PREDICATE SEQUENCE &REST ARGS &KEY FROM-END (START 0) END KEY)
;; (find-if-not PREDICATE SEQUENCE &REST ARGS &KEY FROM-END (START 0) END KEY)
;; (position-if PREDICATE SEQUENCE &REST ARGS &KEY FROM-END (START 0) END KEY)
;; (position-if-not PREDICATE SEQUENCE &REST ARGS &KEY FROM-END (START 0) END KEY)
;; (remove-if PREDICATE SEQUENCE &REST ARGS &KEY FROM-END (START 0) (END NIL) (COUNT NIL) (KEY NIL))
;; (remove-if-not PREDICATE SEQUENCE &REST ARGS &KEY FROM-END (START 0) (END NIL) (COUNT NIL) (KEY NIL))
;;(substitute-if NEW PREDICATE SEQUENCE &REST ARGS &KEY FROM-END (START 0) (END NIL) (COUNT NIL) (KEY NIL))
;; (substitute-if-not NEW PREDICATE SEQUENCE &REST ARGS &KEY FROM-END (START 0) (END NIL) (COUNT NIL) (KEY NIL))
;; In the place of the item argument, they all take a function to be called on each element of the sequence, that is PRED must be that function.

;; (remove-duplicates SEQUENCE &REST ARGS &KEY (TEST #'EQL) (TEST-NOT NIL) (START 0) (END NIL) FROM-END (KEY NIL))
;; Removes all but one instance of each duplicated element.

;; (copy-seq SEQUENCE)
;; (reverse SEQUENCE)
;; (concatenate OUTPUT-TYPE-SPEC &REST SEQUENCES)

;; (sort SEQUENCE PREDICATE &REST ARGS &KEY KEY)
;; (stable-sort SEQUENCE PREDICATE &REST ARGS &KEY KEY)

;; (merge SEQUENCE PREDICATE &REST ARGS &KEY KEY)

;; (fill SEQUENCE ITEM &KEY (START 0) END)
;; Set multiple elements of a sequence to a single value

;; (subseq SENQUENCE START &OPTIONAL END)
;; Extracts a subsequence starting at a particular index and continuing to a particular ending index or the end of the sequence.

;; (search SEQUENCE1 SEQUENCE2 &REST ARGS &KEY FROM-END (TEST #'EQL) (TEST-NOT NIL) (START1 0) (END1 NIL) (START2 0) (END2 NIL) (KEY NIL))
;; Works like POSITION except the first argument is a sequence rather than a single item.

;; (mismatch SEQUENCE1 SEQUENCE2 &REST ARGS &KEY FROM-END (TEST #'EQL) (TEST-NOT NIL) (START1 0) (END1 NIL) (START2 0) (END2 NIL) (KEY NIL))
;; Find where two sequences with a common prefix first diverge

;; (every PRED FIRSET-SEQ &REST MORE-SEQS)
;; (some PRED FIRST-SEQ &REST MORE-SEQS)
;; (notany PRED FIRST-SEQ &REST MORE-SEQS)
;; (notevery PRED FIRST-SEQ &REST MORE-SEQS)
;; Iterate over sequences testing a boolean predicate. The first argument to all these functions is the predicate, and the remaining arguments are sequences. The predicate should take as many arguments as the number of sequences passed. The elements of the sequences are passed to the predicate one element from each sequence—until one of the sequences runs out of elements or the overall termination test is met: EVERY terminates, returning false, as soon as the predicate fails. If the predicate is always satisfied, it returns true. SOME returns the first non- NIL value returned by the predicate or returns false if the predicate is never satisfied. NOTANY returns false as soon as the predicate is satisfied or true if it never is. And NOTEVERY returns true as soon as the predicate fails or false if the predicate is always satisfied. Here are some examples of testing just one sequence.

;; (map RESULT-TYPE FUNCTION FIRST-SEQUENCE &REST MORE-SEQUENCE)
;; Takes a n-argument function and n sequences, returns a new sequence containing the result of applying the function to subsequent elements of the sequences, function.
(map 'vector #'* #(1 2 3 4 5) #(10 9 8 7 6))
;; Return: #(10 18 24 28 30)

;; (map-into RESULT-SEQUENCE FUNCTION &REST SEQUENCE)
;; Places the results into a sequence passed as the first argument
(map-into #(1 1 1)  #'+ #(2 3 4) #(3 4 5 1))
;; Return: #(5 7 9)

;; (Reduce FUNCTION SEQUENCE &REST ARGS &KEY (KEY NIL) FROM-END (START 0) (END NIL) (INITIAL-VALUE NIL IVP))
;; Maps over a single sequence, applying a two-argument function first to the first two elements of the sequence and then to the value returned by the function and subsequent elements of the sequence.
(reduce #'+ #(1 2 3 4 5 6 7 8 9 10))
;; Return: 55

;; (make-hash-table &KEY (TEST 'EQL) (SIZE +MIN-HASH-TABLE-SIZE+) (REHASH-SIZE 1.5) (REHASH-THRESHOLD 1) (HASH-FUNCTION NIL) (WEAKNESS NIL) (SYNCHRONIZED)
;; Makes a hash table that considers two keys equivalent if they’re the same object according to EQL . This is a good default unless you want to use strings as keys, since two strings with the same contents aren’t necessarily EQL.MAKE-HASH-TABLE ’s :test can’t be used to specify an arbitrary function—only the values EQ , EQL , EQUAL , and EQUALP .

;; (gethash KEY HASH-TABLE &OPTIONAL DEFAUTL)
;; GETHASH function provides access to the elements of a hash table. It takes two arguments—a key and the hash table—and returns the value, if any, stored in the hash table under that key or NIL.

;; (remhash KEY HASH-TABLE)
;; Delete one item.

;; (clrhash HASH-TABLE)
;; Completely clear a hash table of all its key/value pairs

;; (maphash FUNCTION HASH-TABLE)
;; Takes a two-argument function and a hash table and invokes the function once for each key/value pair in the hash table.
```

### COMPLEMENT & :test-not

Another parameter, :test-not parameter, specifies a two-argument predicate to be used like a :test argument except with the boolean result logically reversed. This parameter is deprecated, however, in preference for using the COMPLEMENT function. COMPLEMENT takes a function argument and returns a function that takes the same number of arguments as the original and returns the logical complement of the original function. Thus, you can, and should, write this:

(count x sequence :test (complement #'some-test))

rather than the following:

(count x sequence :test-not #'some-test)

### COPY-SEQ & REVERSE

Neither function copies the elements themselves—only the returned sequence is a new object.
### Chapter 12

<div class="message">
    List, for-side-effect and recycling operatings.
</div>

```elisp
;;; Chapter 12 LIST

(cons CAR CDR)

(car LIST)

(cdr LIST)

(rplaca CONS NEWCAR)

(rplacd CONS NEWCDR)

(first LIST)
(second LIST)
...
(tenth LIST)
(nth N LIST)

(cadr X)
(cdar X)
(caaar X)
...
(cdddr X)
(caaaar X)
...
(cddddr X)

(rest LIST)

(append &REST SENQUENCES)
;; Takes any number of list arguments and returns a new list containing the elements of all its arguments.
(append (list 1 2 3 4) '(4 5 6 7))
;; Return: (1 2 3 4 4 5 6 7)

;; Recycling Functions:
;; nsubstitute   : subsititute
(nsubstitute NEW OLD SEQUENCE &REST ARGS &KEY FROM-END (TEST #'EQL) (TEST-NOT NIL) (END NIL) (COUNT NIL) (KEY NIL) (START 0))
;; nreverse : reverse
(nreverse SEQUENCE)
;; nconc : append
(nconc &REST LISTS)
;; delete, delete-if, delete-if-not, delete-dupulicate : remove, remove-if, remove-if-not, remove-duplicate

;; List-manipulation functions:
(last LIST &OPTIONAL (N 1))
;; Returns the last cons cell in a list. With an integer, argument returns the last n cons cells.
(butlast LIST &OPTIONAL (N 1))
;; Returns a copy of the list, excluding the last cons cell. With an integer argument, excludes the last n cells.
(nbutlast LIST &OPTIANAL (N 1))
;; The recycling version of BUTLAST ; may modify and return the list but has no reliable side effects.
(ldiff LIST OBJECT)
;; Returns a copy of a list up to a given cons cell.
(tailp OBJECT LIST)
;; Returns true if a given object is a cons cell that’s part of the structure of a list.
(list* ARG &REST OTHERS)
;; Builds a list to hold all but the last of its arguments and then makes the last argument the CDR of the last cell in the list. In other words, a cross between LIST and APPEND .
(make-list SIZE &KEY INITIAL-ELEMENTS)
;; Builds an n item list. The initial elements of the list are NIL or the value specified with the :initial-element keyword argument.
(revappend X Y)
;; Combination of REVERSE and APPEND ; reverses first argument as with REVERSE and then appends the second argument.
(nreconc X Y)
;; Recycling version of REVAPPEND ; reverses first argument as if by NREVERSE and then appends the second argument. No reliable side effects.
(consp OBJECT)
;; Predicate to test whether an object is a cons cell.
(atom OBJECT)
;; Predicate to test whether an object is not a cons cell.
(listp OBEJCT)
;; Predicate to test whether an object is either a cons cell or NIL .
(null OBEJCT)
;; Predicate to test whether an object is NIL . Functionally equivalent to NOT but stylistically preferable when testing for an empty list as opposed to boolean false.

(mapcar FUNCTION LIST &REST MORE-LIST)
;; Its first argument is the function to apply, and subsequent arguments are the lists whose elements will provide the arguments to the function. the function is applied to successive elements of the list arguments, taking one element from each list per application of the function. The results of each function call are collected into a new list.
(maplist FUNCTION LIST &REST MORE-LIST)
;; Except instead of passing the elements of the list to the function,it passes the actual cons cells.
(mapcan FUNCTION LIST &REST MORE-LIST)
(mapcon FUNCTION LIST &REST MORE-LIST)
;; Work like MAPCAR and MAPLIST except for the way they build up their result. While MAPCAR and MAPLIST build a completely new list to hold the results of the function calls, MAPCAN and MAPCON build their result by splicing together the results—which must be lists—as if by NCONC .
(mapc FUNCTION LIST &REST MORE-LIST)
(mapl FUNCTION LIST &REST MORE-LIST)
;; Control constructs disguised as functions—they simply return their first list argument, so they’re useful only when the side effects of the mapped function do something interesting.
```

#### Useful Forms of Recycling Functions.

1.PUSH & NREVERSE
The most common recycling idiom is to build up a list to be returned from a function by “consing” onto the front of a list, usually by PUSH ing elements onto a list stored in a local variable and then returning the result of NREVERSE ing it.

This is an efficient way to build a list because each PUSH has to create only one cons cell and modify a local variable and the NREVERSE just has to zip down the list reassigning the CDR s. Because the list is created entirely within the function, there’s no danger any code outside the function has a reference to any of its cons cells. Here’s a function that uses this idiom to build a list of the first n numbers, starting at zero:

```elisp
(defun upto (max)
  (let ((result nil))
    (dotimes (i max)
      (push i result))
    (nreverse result)))

(upto 10)
;; Return: (0 1 2 3 4 5 6 7 8 9)
```

2.SETF & DELETE
The next most common recycling idiom 9 is to immediately reassign the value returned by the recycling function back to the place containing the potentially recycled value.


```elisp
(setf foo (delete nil foo))
```

Sets the value of foo to its old value except with all the NIL s removed. However, even this idiom must be used with some care—if foo shares structure with lists referenced elsewhere, using DELETE instead of REMOVE can destroy the structure of those other lists.
### Chapter 13

<div class="message">
    Trees, Sets, Lookup Lists: alists, plists.
</div>


```elisp
;;; Chapter 13 COMPLEX CONS CELLS:TREE,SETS...

;; Trees:

(copy-list LIST )
(copy-tree TREE &OPTIONAL VECP)
;; Generate a new list/tree.Note that, the two functions copy the cons cells that make up the list structure only.

(subst NEW OLD TREE &KEY KEY (TEST #'EQL TESTP) (TEST-NOT #'EQL NOTP))
;; Substitute all the items of a tree to a new one.
(subst 8 3 '(3 3 3 3 1 (2 3) (4 5 6 (5 4)) (3 2 1)))
;; Return: (8 8 8 8 1 (2 8) (4 5 6 (5 4)) (8 2 1))
(substitute 8 3 '(3 3 3 3 1 (2 3) (4 5 6 (5 4)) (3 2 1)) :from-end t :count 3)
;; Return: (3 8 8 8 1 (2 3) (4 5 6 (5 4)) (3 2 1)), just like processing a list.

(subst-if NEW TEST TREE &KEY KEY)
(subst-if-not NEW TEST TREE &KEY KEY)
(nsubst  NEW OLD TREE &KEY KEY (TEST #'EQL TESTP) (TEST-NOT #'EQL NOTP))
(nsubst-if  NEW TEST TREE &KEY KEY)
(nsubst-if-not  NEW TEST TREE &KEY KEY)

;; Sets:

(adjoin ITEM LIST &KEY KEY (TEST #'EQL TESTP) (TEST-NOT NIL NOTP))
;; To build up a set, you can use the function ADJOIN . ADJOIN takes an item and a list senting a set and returns a list representing the set containing the item and all the items in the original set.
(defparameter *set* ())
(setf *set* (adjoin 1 *set*))


(pushnew OBJ PLACE &REST KEYS &KEY KEY TEST TEST-NOT &ENVIRONMENT ENV)
;; A macro to change a tree.
(pushnew 2 *set*)
;; Return: (2 1)

(member ITEM LIST &KEY KEY (TEST NIL TESTP) (TEST-NOT NIL NOTP))
(member-if TEST LIST &KEY KEY)
(member-if-not TEST LIST &KEY KEY)
;; Just like FIND, FIND-IF, FIND-IF-NOT

(intersection LIST1 LIST2 &KEY KEY (TEST #'EQL TESTP) (TEST-NOT NIL NOTP))
;; Returns a list containing all the elements found in both arguments.
(union LIST1 LIST2 &KEY KEY (TEST #'EQL TESTP) (TEST-NOT NIL NOTP))
;; Returns a list containing one instance of each unique element from the two arguments. 3
(set-difference LIST1 LIST2 &KEY KEY (TEST #'EQL TESTP) (TEST-NOT NIL NOTP))
;; Returns a list containing all the elements from the first argument that don’t appear in the second argument.
(set-exclusive-or LIST1 LIST2 &KEY KEY (TEST #'EQL TESTP) (TEST-NOT #'EQL NOTP))
;; Returns a list containing those elements appearing in only one or the other of the two argument lists but not in both.
(subsetp LIST1 LIST2 &KEY KEY (TEST #'EQL TESTP) (TEST-NOT NIL NOTP))
;; Takes two lists and the usual :key and :test keyword arguments and returns true if the first list is a subset of the second

;; Lookup Tables,Alists and Plists.



(assoc ITEM ALIST &KEY KEY (TEST NIL TESTP) (TEST-NOT NIL NOTP))
;; The main lookup function for alists, takes a key and an alist and returns the FIRST cons cell whose CAR matches the key or NIL if no match is found.
(assoc-if PRED ALIST &KEY KEY)
(assoc-if-not PRED ALIST &KEY KEY)
(rassoc ITEM ALIST &KEY KEY (TEST NIL TESTP) (TEST-NOT NIL NOTP))
(rassoc-if PRED ALIST &KEY KEY)
(rassoc-if-not PRED ALIST &KEY KEY)
(copy-alist ALIST)

(pairlis  KEYS DATA &OPTIONAL (ALIST 'NIL))
;; Generate a alist with two lists.
(pairlis '(a b c d e) '(1 2 3 4 5))
;; Return: ((E . 5) (D . 4) (C . 3) (B . 2) (A . 1))

(acons KEY DATUM ALIST)
;; Add a key-value pair at the begin of a plist.
;; (cons (cons 'new-key 'new-value) alist) = (acons 'new-key 'new-value alist)

(get-properties PLACE INDICATOR-LIST)
;; Get key/value pairs from plist rapidly.

(remprop SYMBOL PROPNAME)
;; Remove a property in plist by symbol.
;; (remprop 'symbol 'key)≡(remf (symbol-plist 'symbol key))

(destructuring-bind LAMBDA-LIST EXPRESSION &BODY BODY)
(destructuring-bind (x (y1 &optional y2) z) (list 1 (list 2 20) 3) (list :x x :y1 y1 :y2 y2 :z z))
;; Return: (:X 1 :Y1 2 :Y2 20 :Z 3)
(destructuring-bind (&whole whole &key x y z) (list :z 1 :y 2 :x 3) (list :x x :y y :z z :whole whole))
;; Return: (:X 3 :Y 2 :Z 1 :WHOLE (:Z 1 :Y 2 :X 3))
```
### Chapter 14

<div class="message">
File I/O, pathnames, interacting with file system, other kinds of I/O.
</div>

```elisp
;;; Chapter 14 FILE & I/O

(open FILENAME &KEY (DIRECTION INPUT) (ELEMENT-TYPE 'BASE-CHAR)
      (IF-EXISTS NIL IF-EXISTS-GIVEN)
      (IF-DOES-NOT-EXIST NIL IF-DOES-NOT-EXIST-GIVEN) (EXTERNAL-FORMAT DEFAULT) &AUX
      (DIRECTION DIRECTION) (IF-DOES-NOT-EXIST IF-DOES-NOT-EXIST)
      (IF-EXISTS IF-EXISTS))
;; Produce a stream from which you can read a file’s contents with the OPEN function.
;; To read the raw bytes, you need to pass OPEN an :element-type argument of '(unsigned-byte 8). 3 You can pass the resulting stream to the function READ-BYTE , which will return an integer between 0 and 255 each time it’s called.
(let ((in (open "/some/file/name.txt")))
  (format t "~a~%" (read-line in))
  (close in))

(read-line &OPTIONAL (STREAM *STANDARD-INPUT*) (EOF-ERROR-P T) EOF-VALUE RECURSIVE-P)
(read-char &OPTIONAL (STREAM *STANDARD-INPUT*) (EOF-ERROR-P T) EOF-VALUE RECURSIVE-P)
(read  &OPTIONAL (STREAM *STANDARD-INPUT*) (EOF-ERROR-P T) (EOF-VALUE NIL) (RECURSIVE-P NIL))
;; Read a s-expressions from a stream.
(read-byte STREAM &OPTIONAL (EOF-ERROR-P T) EOF-VALUE)
(write-char CHARACTER &OPTIONAL (STREAM *STANDARD-OUTPUT*))
(write-line STRING &OPTIONAL (STREAM *STANDARD-OUTPUT*) &KEY (START 0) END)
(write-string  STRING &OPTIONAL (STREAM *STANDARD-OUTPUT*) &KEY (START 0) END)
(terpri  &OPTIONAL (STREAM *STANDARD-OUTPUT*))
;; Short for “terminate print”—unconditionally a newline character.
(fresh-line  &OPTIONAL (STREAM *STANDARD-OUTPUT*))
;; Prints a newline character unless the stream is at the beginning of a line.
;; Output S-EXPRESSIONS:
(print OBJECT &OPTIONAL STREAM)
;; Prints an s-expression preceded by an end-of-line and followed by a space.
(prin1 OBJECT &OPTIONAL STREAM)
;; Prints just the s-expression.
(pprint OBJECT &OPTIONAL STREAM)
;; Prints s-expressions like PRINT and PRIN1 but using the “pretty printer,” which tries to print its output in an aesthetically pleasing way.
(princ OBJECT &OPTIONAL STREAM)
;; Prints Lisp objects, but in a way designed for human consumption. For instance, PRINC prints strings without quotation marks.
(write-sequence SEQ STREAM &KEY (STRAT 0) (END NIL))
;; Accepts both binary and character streams as long as all the elements of the sequence are of an appropriate type for the stream, either characters or bytes.
(read-sequence SEQ STREAM &KEY (START 0) END)
(close STREAM &KEY ABORT)
;; Close a file stream after reading it, function.

(with-open-file (STREAM FILESPEC &REST OPTIONS) &BODY BODY)
(with-open-file (stream "/path/to/file")
  (format t "~a~%" (read-line stream)))
;; Read a line from the file.
(with-open-file (stream "/path/to/file" :direction :output)
  (format stream "Some text"))
;; Write something to a file.

(pathname PATHSPEC)
;; Takes a pathname designator and returns an equivalent pathname object. When the designator is already a pathname, it’s simply returned.
(pathname "/path/to/file")
;; Return: #P"/path/to/file", #P indicates that is a pathname object.

(pathname-directory PATHNAME &KEY (CASE LOCAL))
(pathname-directory "/path/to/file")
;; Return: (:ABSOLUTE "path" "to")
(pathname-directory "path/to/file")
;; Return: (:RELATIVE "path" "to")
(pathname-name PATHNAME &KEY (CASE LOCAL))
(pathname-type PATHNAME &KEY (CASE LOCAL))
(pathname-host PATHNAME &KEY (CASE LOCAL))
(pathname-device PATHNAME &KEY (CASE LOCAL))
;; On Windows either PATHNAME-HOST or PATHNAME-DEVICE will return the drive letter.
(pathname-version PATHNAME)

(namestring PATHNAME)
;; The inverse function of PATHNAME, and it has a funcion family like PATHNAME outlined below:
(directory-namestring PATHNAME)
(file-namestring PATHNAME)

(make-pathname &KEY HOST (DEVICE NIL DEVP) (DIRECTORY NIL DIRP)
               (NAME NIL NAMEP) (TYPE NIL TYPEP) (VERSION NIL VERSIONP) DEFAULTS (CASE LOCAL))
;; Construct arbitrary pathnames
(make-pathname :device "c" :directory '(:absolute "foo" "bar") :name "baz")
;; Return in Linux amd64: #P"/foo/bar/baz"

(merge-pathnames PATHNAME &OPTIONAL (DEFAULTS *DEFAULT-PATHNAME-DEFAULTS*) (DEFAULT-VERSION NEWEST))
;; Takes two pathnames and merges them, filling in any NIL components in the first pathname with the corresponding value from the second pathname
(enough-namestring PATHNAME &OPTIONAL (DEFAULTS *DEFAULT-PATHNAME-DEFAULTS*))
;; The inverse function of MERGE-PATHNAMES
(merge-pathnames #p"foo/bar.html" #p"/www/html/")
;; Return: #p"/www/html/foo/bar.html"
(enough-pathnames #p"/www/html/foo/bar.html" #p"/www/html")
;; Return: #p"foo/bar.html"

;; Interacting with File System
(probe-file PATHSPEC)
;; Test whether a file exists in the file system corresponding to a pathname designator, a pathname, namestring, or file stream, function.
(directory PATHSPEC &KEY (RESOLVE-SYMLINKS T))
;; List all the files and directories in the path represented by designator PATHSPEC.
(delete-file FILE)
(rename-file FILE NEW-NAME)
(ensure-directories-exist PATHSPEC &KEY VERBOSE (MODE 511))
(with-open-file (out (ensure-directories-exist name) :direction :output)
  ...
  )
(file-write-date PATHSPEC)
(file-author PATHSPEC)
(file-length PATHSPEC)
(file-position STREAM &OPTIONAL POSITION)

;; Work with STRING-STREAM
(string-stream)
(make-string-input-stream STRING &OPTIONAL (START 0) END)
(make-string-output-stream &KEY (ELEMENT-TYPE 'CHARACTER) &AUX (BUFFER (MAKE-STRING *STRING-OUTPUT-STREAM-BUFFER-INITIAL-SIZE*)))
(get-output-stream-string STREAM)
(with-input-from-string  (VAR STRING &KEY INDEX START END) &BODY FORMS-DECLS)
(with-output-from-string (stream-symbol) &BODY)
(broadcast-stream)
(make-broadcast-stream &REST-STREAMS)
(concatented-stream)
(two-way-stream)
(echo-stream)
(make-two-way-stream INPUT-STREAM OUTPUT-STREAM)
(make-echo-stream INPUT-STREAM OUTPUT-STREAM)
```

#### Use WITH-OPEN-FILE !
You’ll probably use WITH-OPEN-FILE for 90–99 percent of the file I/O you do—the only time you need to use raw OPEN and CLOSE calls is if you need to open a file in a function and keep the stream around after the function returns. In that case, you must take care to eventually close the stream yourself, or you’ll leak file descriptors and may eventually end up unable to open any more files.

#### Other Kinds of I/O
In addition to file streams, Common Lisp supports other kinds of streams, which can also be used with the various reading, writing, and printing I/O functions. For instance, you can read data from, or write data to, a string using STRING-STREAM s, which you can create with the functions MAKE-STRING-INPUT-STREAM and MAKE-STRING-OUTPUT-STREAM .

MAKE-STRING-INPUT-STREAM takes a string and optional start and end indices to bound the area of the string from which data should be read and returns a character stream that you can pass to any of the character-based input functions such as READ-CHAR , READ-LINE , or READ . For example, if you have a string containing a floating-point literal in Common Lisp’s syntax, you can convert it to a float like this:
```elisp
(let ((s (make-string-input-stream "1.23")))
  (unwind-protect (read s)
    (close s)))
```

Similarly, MAKE-STRING-OUTPUT-STREAM creates a stream you can use with FORMAT ,
PRINT , WRITE-CHAR , WRITE-LINE , and so on. It takes no arguments. Whatever you write, a
string output stream will be accumulated into a string that can then be obtained with the function
GET-OUTPUT-STREAM-STRING . Each time you call GET-OUTPUT-STREAM-STRING , the stream’s
internal string is cleared so you can reuse an existing string output stream.

However, you’ll rarely use these functions directly, because the macros
WITH-INPUT-FROM-STRING and WITH-OUTPUT-TO-STRING provide a more convenient
interface. WITH-INPUT-FROM-STRING is similar to WITH-OPEN-FILE —it creates a string input
stream from a given string and then executes the forms in its body with the stream bound to the
variable you provide. For instance, instead of the LET form with the explicit UNWIND-PROTECT ,
you’d probably write this:
```elisp
(with-input-from-string (s "1.23")
(read s))
```
The WITH-OUTPUT-TO-STRING macro is similar: it binds a newly created string output
stream to a variable you name and then executes its body. After all the body forms have been
executed, WITH-OUTPUT-TO-STRING returns the value that would be returned by
GET-OUTPUT-STREAM-STRING .
```elisp
CL-USER> (with-output-to-string (out)
(format out "hello, world ")
(format out "~s" (list 1 2 3)))
"hello, world (1 2 3)"
```
The other kinds of streams defined in the language standard provide various kinds of
stream “plumbing,” allowing you to plug together streams in almost any configuration. A
BROADCAST-STREAM is an output stream that sends any data written to it to a set of output
streams provided as arguments to its constructor function, MAKE-BROADCAST-STREAM . 14
Conversely, a CONCATENATED-STREAM is an input stream that takes its input from a set of input
streams, moving from stream to stream as it hits the end of each stream.
CONCATENATED-STREAM s are constructed with the function MAKE-CONCATENATED-STREAM ,
which takes any number of input streams as arguments.

Two kinds of bidirectional streams that can plug together streams in a couple ways are
TWO-WAY-STREAM and ECHO-STREAM . Their constructor functions, MAKE-TWO-WAY-STREAM and
MAKE-ECHO-STREAM , both take two arguments, an input stream and an output stream, and
return a stream of the appropriate type, which you can use with both input and output functions.

In a TWO-WAY-STREAM every read you perform will return data read from the underlying
input stream, and every write will send data to the underlying output stream. An ECHO-STREAM
works essentially the same way except that all the data read from the underlying input stream
is also echoed to the output stream. Thus, the output stream of an ECHO-STREAM stream will
contain a transcript of both sides of the conversation.

Using these five kinds of streams, you can build almost any topology of stream plumbing
you want.

Finally, although the Common Lisp standard doesn’t say anything about networking APIs,
most implementations support socket programming and typically implement sockets as
another kind of stream, so you can use all the regular I/O functions with them.

Now you’re ready to move on to building a library that smoothes over some of the differences
between how the basic pathname functions behave in different Common Lisp implementations.
### Chapter 15

<div class="message">
    A portable pathname library.
</div>

```elisp
;;; Chapter 15

(wild-pathname-p PATHNAME &OPTIONAL FIELD-KEY)
;; Test whether the passing PATHNAME have wild keywords, that is.

(butlast LIST &OPTIONAL (N 1))
(nbutlast LIST &OPTIONAL (N 1))
;; Returns a copy of list from which the last n conses have been omitted. If n is not supplied, its value is 1. If there are fewer than n conses in list, nil is returned and, in the case of nbutlast, list is not modified.

(constantly VALUE)
;; Returns a function that accepts any number of arguments, that has no side-effects, and that always returns value.
(mapcar (constantly 3) '(a b c d))
;; Return: (3 3 3 3)
```

# \*FEATURES\* and Read-Time Conditionalization

```elisp
(defun foo ()
  #+allegro (do-one-thing)
  #+sbcl (do-another-thing)
  #+clisp (something-else)
  #+cmu (yet-another-version)
  #-(or allegro sbcl clisp cmu) (error "Not implemented"))
```

... and the information is kept in \*FEATURES\*. \*FEATURES\* and #+ #- were understood by Lisp Reader.

# Source Code

```elisp
(in-package #:com.gigamonkeys.pathnames)

(defun list-directory (dirname)
  "Return a list of the contents of the directory named by dirname.
Names of subdirectories will be returned in `directory normal
form'. Unlike CL:DIRECTORY, LIST-DIRECTORY does not accept
wildcard pathnames; `dirname' should simply be a pathname that
names a directory. It can be in either file or directory form."
  (when (wild-pathname-p dirname)
    (error "Can only list concrete directory names."))

  (let ((wildcard (directory-wildcard dirname)))

    #+(or sbcl cmu lispworks)
    ;; SBCL, CMUCL, and Lispworks return subdirectories in directory
    ;; form just the way we want.
    (directory wildcard)

    #+openmcl
    ;; OpenMCl by default doesn't return subdirectories at all. But
    ;; when prodded to do so with the special argument :directories,
    ;; it returns them in directory form.
    (directory wildcard :directories t)

    #+allegro
    ;; Allegro normally return directories in file form but we can
    ;; change that with the :directories-are-files argument.
    (directory wildcard :directories-are-files nil)

    #+clisp
    ;; CLISP has a particularly idiosyncratic view of things. But we
    ;; can bludgeon even it into doing what we want.
    (nconc
     ;; CLISP won't list files without an extension when :type is
     ;; wild so we make a special wildcard for it.
     (directory wildcard)
     ;; And CLISP doesn't consider subdirectories to match unless
     ;; there is a :wild in the directory component.
     (directory (clisp-subdirectories-wildcard wildcard)))

    #-(or sbcl cmu lispworks openmcl allegro clisp)
    (error "list-directory not implemented")))




(defun file-exists-p (pathname)
  "Similar to CL:PROBE-FILE except it always returns directory names
in `directory normal form'. Returns truename which will be in
`directory form' if file named is, in fact, a directory."

  #+(or sbcl lispworks openmcl)
  ;; These implementations do "The Right Thing" as far as we are
  ;; concerned. They return a truename of the file or directory if it
  ;; exists and the truename of a directory is in directory normal
  ;; form.
  (probe-file pathname)

  #+(or allegro cmu)
  ;; These implementations accept the name of a directory in either
  ;; form and return the name in the form given. However the name of a
  ;; file must be given in file form. So we try first with a directory
  ;; name which will return NIL if either the file doesn't exist at
  ;; all or exists and is not a directory. Then we try with a file
  ;; form name.
  (or (probe-file (pathname-as-directory pathname))
      (probe-file pathname))

  #+clisp
  ;; Once again CLISP takes a particularly unforgiving approach,
  ;; signalling ERRORs at the slightest provocation.

  ;; pathname in file form and actually a file      -- (probe-file file)      ==> truename
  ;; pathname in file form and doesn't exist        -- (probe-file file)      ==> NIL
  ;; pathname in dir form and actually a directory  -- (probe-directory file) ==> truename
  ;; pathname in dir form and doesn't exist         -- (probe-directory file) ==> NIL

  ;; pathname in file form and actually a directory -- (probe-file file)      ==> ERROR
  ;; pathname in dir form and actually a file       -- (probe-directory file) ==> ERROR
  (or (ignore-errors
        ;; PROBE-FILE will return the truename if file exists and is a
        ;; file or NIL if it doesn't exist at all. If it exists but is
        ;; a directory PROBE-FILE will signal an error which we
        ;; ignore.
        (probe-file (pathname-as-file pathname)))
      (ignore-errors
        ;; PROBE-DIRECTORY returns T if the file exists and is a
        ;; directory or NIL if it doesn't exist at all. If it exists
        ;; but is a file, PROBE-DIRECTORY will signal an error.
        (let ((directory-form (pathname-as-directory pathname)))
          (when (ext:probe-directory directory-form)
            directory-form))))


    #-(or sbcl cmu lispworks openmcl allegro clisp)
    (error "list-directory not implemented"))

(defun directory-wildcard (dirname)
  (make-pathname
   :name :wild
   :type #-clisp :wild #+clisp nil
   :defaults (pathname-as-directory dirname)))

#+clisp
(defun clisp-subdirectories-wildcard (wildcard)
  (make-pathname
   :directory (append (pathname-directory wildcard) (list :wild))
   :name nil
   :type nil
   :defaults wildcard))


(defun directory-pathname-p (p)
  "Is the given pathname the name of a directory? This function can
usefully be used to test whether a name returned by LIST-DIRECTORIES
or passed to the function in WALK-DIRECTORY is the name of a directory
in the file system since they always return names in `directory normal
form'."
  (flet ((component-present-p (value)
           (and value (not (eql value :unspecific)))))
    (and
     (not (component-present-p (pathname-name p)))
     (not (component-present-p (pathname-type p)))
     p)))


(defun file-pathname-p (p)
  (unless (directory-pathname-p p) p))

(defun pathname-as-directory (name)
  "Return a pathname reperesenting the given pathname in
`directory normal form', i.e. with all the name elements in the
directory component and NIL in the name and type components. Can
not be used on wild pathnames because there's not portable way to
convert wildcards in the name and type into a single directory
component. Returns its argument if name and type are both nil or
:unspecific."
  (let ((pathname (pathname name)))
    (when (wild-pathname-p pathname)
      (error "Can't reliably convert wild pathnames."))
    (if (not (directory-pathname-p name))
      (make-pathname
       :directory (append (or (pathname-directory pathname) (list :relative))
                          (list (file-namestring pathname)))
       :name      nil
       :type      nil
       :defaults pathname)
      pathname)))

(defun pathname-as-file (name)
  "Return a pathname reperesenting the given pathname in `file form',
i.e. with the name elements in the name and type component. Can't
convert wild pathnames because of problems mapping wild directory
component into name and type components. Returns its argument if
it is already in file form."
  (let ((pathname (pathname name)))
    (when (wild-pathname-p pathname)
      (error "Can't reliably convert wild pathnames."))
    (if (directory-pathname-p name)
      (let* ((directory (pathname-directory pathname))
             (name-and-type (pathname (first (last directory)))))
        (make-pathname
         :directory (butlast directory)
         :name (pathname-name name-and-type)
         :type (pathname-type name-and-type)
         :defaults pathname))
      pathname)))

(defun walk-directory (dirname fn &key directories (test (constantly t)))
  "Walk a directory invoking `fn' on each pathname found. If `test' is
supplied fn is invoked only on pathnames for which `test' returns
true. If `directories' is t invokes `test' and `fn' on directory
pathnames as well."
  (labels
      ((walk (name)
         (cond
           ((directory-pathname-p name)
            (when (and directories (funcall test name))
              (funcall fn name))
            (dolist (x (list-directory name)) (walk x)))
           ((funcall test name) (funcall fn name)))))
    (walk (pathname-as-directory dirname))))

(defun directory-p (name)
  "Is `name' the name of an existing directory."
  (let ((truename (file-exists-p name)))
    (and truename (directory-pathname-p name))))

(defun file-p (name)
  "Is `name' the name of an existing file, i.e. not a directory."
  (let ((truename (file-exists-p name)))
    (and truename (file-pathname-p name))))

```
### Chapter 23

<div class="message">
    A spam filter.
</div>

```elisp
(print-unreadable-object (OBJECT STREAM &KEY TYPE IDENTITY) &BODY BODY)
;; Outputs a printed representation of object on stream, beginning with ``#<'' and ending with ``>''. Everything output to stream by the body forms is enclosed in the the angle brackets. If type is true, the output from forms is preceded by a brief description of the object's type and a space character. If identity is true, the output from forms is followed by a space character and a representation of the object's identity, typically a storage address.
(defmethod print-object ((obj airplane) stream)
  (print-unreadable-object (obj stream :type t :identity t)
    (princ (tail-number obj) stream)))
(prin1-to-string my-airplane)
=>  "#<Airplane NW0773 36000123135>"
OR=>  "#<FAA:AIRPLANE NW0773 17>"

(float NUMBER &OPTIONAL (OTHER NIL OTHER-P))
;; Converts a real number to a float. If a prototype (OTHER) is supplied, a float is returned that is mathematically equal to number but has the same format as prototype.
(eql (float 1.0 1.0d0) 1.0d0)
=> T

(aref ARRAY &REST SUBSCRIPTS)
;; Accesses the array element specified by the subscripts. If no subscripts are supplied and array is zero rank, aref accesses the sole element of array.
(aref (setq beta (make-array '(2 4)
                             :element-type '(unsigned-byte 2)
                             :initial-contents '((0 1 2 3) (3 2 1 0))))
      0 2)
=> 2
;; The third element of the first row, (0 1 2 3).

(assert TEST-FORM &OPTIONAL PLACES DATUM &REST ARGUMENTS &ENVIRONMENT ENV)
;; Assures that test-form evaluates to true. If test-form evaluates to false, assert signals a correctable error (denoted by datum and arguments). Continuing from this error using the continue restart makes it possible for the user to alter the values of the places before assert evaluates test-form again. If the value of test-form is non-nil, assert returns nil.
```

### Common Lisp Portable Perl-Compatible Regular Expression (CL-PPCRE)

```elisp
(cl-ppcre:all-matches-as-strings "[a-zA-Z]{3,}" text)
```

#### Print Objects

Printing of all objects is implemented in terms of a generic function PRINT-OBJECT. To make implementing such methods easier, Common Lisp provides the macro PRINT-UNREADABLE-OBJECT. The main reason to use PRINT-UNREADABLE-OBJECT is that it takes care of signaling the appropriate error if someone tries to print your object readably, such as with the ~S FORMAT directive.

### CASE CCASE ECASE

*case*

case keyform {normal-clause}* [otherwise-clause]

If no normal-clause matches, and there is an otherwise-clause, then that otherwise-clause automatically matches; the forms in that clause are evaluated as an implicit progn, and the values it returns are returned as the value of the case.

If there is no otherwise-clause, case returns nil.

*ccase*
ccase keyplace {normal-clause}*

If no normal-clause matches, a correctable error of type type-error is signaled. The offending datum is the test-key and the expected type is type equivalent to (member key1 key2 ...). The store-value restart can be used to correct the error.

If the store-value restart is invoked, its argument becomes the new test-key, and is stored in keyplace as if by (setf keyplace test-key). Then ccase starts over, considering each clause anew.

The subforms of keyplace might be evaluated again if none of the cases holds.

*ecase*

ecase keyform {normal-clause}*

If no normal-clause matches, a non-correctable error of type type-error is signaled. The offending datum is the test-key and the expected type is type equivalent to (member key1 key2 ...).

Note that in contrast with ccase, the caller of ecase may rely on the fact that ecase does not return if a normal-clause does not match.

```elisp
(defun test-case (x)
   (case x
     ((i uno) 1)
     ((ii dos) 2)
     ((iii tres) 3)
     ((iv cuatro) 4)))
(defun test-ccase (x)
   (ccase x
     ((i uno) 1)
     ((ii dos) 2)
     ((iii tres) 3)
     ((iv cuatro) 4)))
(defun test-ecase (x)
   (ccase x
     ((i uno) 1)
     ((ii dos) 2)
     ((iii tres) 3)
     ((iv cuatro) 4)))

(test-case dos) => 2
(test-ccase iiii) => ERROR
(test-ecae iiii) => ERROR
```

#### Source Code

```elisp
(defvar *feature-database* (make-hash-table :test #'equal))
(defvar *total-spams* 0)
(defvar *total-hams* 0)

(defparameter *max-ham-score* .4)
(defparameter *min-spam-score* .6)

(defparameter *max-chars* (* 10 1024))
(defparameter *corpus* (make-array 1000 :adjustable t :fill-pointer 0))

(defun classify (text)
  "Classify the text of a message as SPAM, HAM, or UNSURE."
  (classification (score (extract-features text))))


(defclass word-feature ()
  ((word
    :initarg :word
    :accessor word
    :initform (error "Must supply :word")
    :documentation "The word this feature represents.")
   (spam-count
    :initarg :spam-count
    :accessor spam-count
    :initform 0
    :documentation "Number of spams we have seen this feature in.")
   (ham-count
    :initarg :ham-count
    :accessor ham-count
    :initform 0
    :documentation "Number of hams we have seen this feature in.")))

(defun intern-feature (word)
  (or (gethash word *feature-database*)
      (setf (gethash word *feature-database*)
            (make-instance 'word-feature :word word))))

(defun extract-words (text)
  (delete-duplicates
   (cl-ppcre:all-matches-as-strings "[a-zA-Z]{3,}" text)
   :test #'string=))

(defun extract-features (text)
  (mapcar #'intern-feature (extract-words text)))

(defmethod print-object ((object word-feature) stream)
  (print-unreadable-object (object stream :type t)
    (with-slots (word ham-count spam-count) object
      (format stream "~s :hams ~d :spams ~d" word ham-count spam-count))))

(defun train (text type)
  (dolist (feature (extract-features text))
    (increment-count feature type))
  (increment-total-count type))

(defun increment-count (feature type)
  (ecase type
    n    (ham (incf (ham-count feature)))
    (spam (incf (spam-count feature)))))

(defun increment-total-count (type)
  (ecase type
    (ham (incf *total-hams*))
    (spam (incf *total-spams*))))

(defun clear-database ()
  (setf
   *feature-database* (make-hash-table :test #'equal)
   *total-spams* 0
   *total-hams* 0))

(defun spam-probability (feature)
  "Basic probability that a feature with the given relative
frequencies will appear in a spam assuming spams and hams are
otherwise equally probable. One of the two frequencies must be
non-zero."
  (with-slots (spam-count ham-count) feature
    (let ((spam-frequency (/ spam-count (max 1 *total-spams*)))
          (ham-frequency (/ ham-count (max 1 *total-hams*))))
      (/ spam-frequency (+ spam-frequency ham-frequency)))))


(defun bayesian-spam-probability (feature &optional
                                            (assumed-probability 1/2)
                                            (weight 1))
  "Bayesian adjustment of a given probability given the number of
data points that went into it, an assumed probability, and a
weight we give that assumed probability."
  (let ((basic-probability (spam-probability feature))
        (data-points (+ (spam-count feature) (ham-count feature))))
    (/ (+ (* weight assumed-probability)
          (* data-points basic-probability))
       (+ weight data-points))))

(defun score (features)
  (let ((spam-probs ()) (ham-probs ()) (number-of-probs 0))
    (dolist (feature features)
      (unless (untrained-p feature)
        (let ((spam-prob (float (bayesian-spam-probability feature) 0.0d0)))
          (push spam-prob spam-probs)
          (push (- 1.0d0 spam-prob) ham-probs)
          (incf number-of-probs))))
    (let ((h (- 1 (fisher spam-probs number-of-probs)))
          (s (- 1 (fisher ham-probs number-of-probs))))
      (/ (+ (- 1 h) s) 2.0d0))))

(defun untrained-p (feature)
  (with-slots (spam-count ham-count) feature
    (and (zerop spam-count) (zerop ham-count))))

(defun fisher (probs number-of-probs)
  "The Fisher computation described by Robinson."
  (inverse-chi-square
   (* -2 (reduce #'+ probs :key #'log))
   (* 2 number-of-probs)))

(defun inverse-chi-square (value degrees-of-freedom)
  "Probability that chi-square >= value with given degrees-of-freedom.
Based on Gary Robinson's Python implementation."
  (assert (evenp degrees-of-freedom))
  ;; Due to rounding errors in the multiplication and exponentiation
  ;; the sum computed in the loop may end up a shade above 1.0 which
  ;; we can't have since it's supposed to represent a probability.
  (min
   (loop with m = (/ value 2)
      for i below (/ degrees-of-freedom 2)
      for prob = (exp (- m)) then (* prob (/ m i))
      summing prob)
   1.0))

(defun classification (score)
  (values
   (cond
     ((<= score *max-ham-score*) 'ham)
     ((>= score *min-spam-score*) 'spam)
     (t 'unsure))
   score))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;; Test rig

(defun add-file-to-corpus (filename type corpus)
  (vector-push-extend (list filename type) corpus))

(defun add-directory-to-corpus (dir type corpus)
  (dolist (filename (list-directory dir))
    (add-file-to-corpus filename type corpus)))

(defun test-classifier (corpus testing-fraction)
  (clear-database)
  (let* ((shuffled (shuffle-vector corpus))
         (size (length corpus))
         (train-on (floor (* size (- 1 testing-fraction)))))
    (train-from-corpus shuffled :start 0 :end train-on)
    (test-from-corpus shuffled :start train-on)))

(defun train-from-corpus (corpus &key (start 0) end)
  (loop for idx from start below (or end (length corpus)) do
        (destructuring-bind (file type) (aref corpus idx)
          (train (start-of-file file *max-chars*) type))))

(defun test-from-corpus (corpus &key (start 0) end)
  (loop for idx from start below (or end (length corpus)) collect
        (destructuring-bind (file type) (aref corpus idx)
          (multiple-value-bind (classification score)
              (classify (start-of-file file *max-chars*))
            (list
             :file file
             :type type
             :classification classification
             :score score)))))

(defun nshuffle-vector (vector)
  "Shuffle a vector in place using Fisher-Yates algorithm."
  (loop for idx downfrom (1- (length vector)) to 1
        for other = (random (1+ idx))
        do (unless (= idx other)
             (rotatef (aref vector idx) (aref vector other))))
  vector)

(defun shuffle-vector (vector)
  "Return a shuffled copy of vector."
  (nshuffle-vector (copy-seq vector)))

(defun start-of-file (file max-chars)
  (with-open-file (in file)
    (let* ((length (min (file-length in) max-chars))
           (text (make-string length))
           (read (read-sequence text in)))
      (if (< read length)
        (subseq text 0 read)
        text))))


(defun result-type (result)
  (destructuring-bind (&key type classification &allow-other-keys) result
    (ecase type
      (ham
       (ecase classification
         (ham 'correct)
         (spam 'false-positive)
         (unsure 'missed-ham)))
      (spam
       (ecase classification
         (ham 'false-negative)
         (spam 'correct)
         (unsure 'missed-spam))))))

(defun false-positive-p (result)
  (eql (result-type result) 'false-positive))

(defun false-negative-p (result)
  (eql (result-type result) 'false-negative))

(defun missed-ham-p (result)
  (eql (result-type result) 'missed-ham))

(defun missed-spam-p (result)
  (eql (result-type result) 'missed-spam))

(defun correct-p (result)
  (eql (result-type result) 'correct))

(defun analyze-results (results)
  (let* ((keys '(total correct false-positive
                 false-negative missed-ham missed-spam))
         (counts (loop for x in keys collect (cons x 0))))
    (dolist (item results)
      (incf (cdr (assoc 'total counts)))
      (incf (cdr (assoc (result-type item) counts))))
    (loop with total = (cdr (assoc 'total counts))
          for (label . count) in counts
          do (format t "~&~@(~a~):~20t~5d~,5t: ~6,2f%~%"
                     label count (* 100 (/ count total))))))

(defun explain-classification (file)
  (let* ((text (start-of-file file *max-chars*))
         (features (extract-features text))
         (score (score features))
         (classification (classification score)))
    (show-summary file text classification score)
    (dolist (feature (sorted-interesting features))
      (show-feature feature))))

(defun show-summary (file text classification score)
  (format t "~&~a" file)
  (format t "~2%~a~2%" text)
  (format t "Classified as ~a with score of ~,5f~%" classification score))

(defun show-feature (feature)
  (with-slots (word ham-count spam-count) feature
    (format
     t "~&~2t~a~30thams: ~5d; spams: ~5d;~,10tprob: ~,f~%"
     word ham-count spam-count (bayesian-spam-probability feature))))

(defun sorted-interesting (features)
  (sort (remove-if #'untrained-p features) #'< :key #'bayesian-spam-probability))

```

## ACL Notes
```elisp
;; 1. LEXICAL CLOUJURE!

;; 2. VALUES! Muiltiple return value.

;; 3. Macro Characters.
CL-USER> (car (read-from-string "'a"))
QUOTE

;; 4. SYMBOLS.
CL-USER> (symbol-name 'abc)
"ABC"
;; Any sequences of characters between vertical bar is regarded as symbols.
CL-USER> (list '|Relax| '|you| '|GUYS| '|123| '|Ansi Common Lisp|)
(|Relax| |you| GUYS |123| |Ansi Common Lisp|)

;; The first time a symbol introduced in a package, it would be INTERNed into the packages, usually, COMMON-LISP-USER. Uninterned symbols is called GENSYMS.

;; 5. EVAL
;; EVAL processes on raw list. The raw list will be either compiled next step or interperted, resulting a low performance.
;; Evaluate without lexical context, causing LET and LET* lose efficacy.

;; 6. Two Models *

;; (1) Message-passing model

;; (2) Generic function model

;; 6. Interactive VS. Interpreted

;; 7. Debugging

;; Break loops.

;; Traces and backtraces

(trace foo)
(untrace foo)

;; When nothing happens

;; No value/Unbound

;; Unexpected nils.

(ecase ...)

;; Renaming

;; Keywords as optional parameters

;; Misdeclarations
```
### HTML Generator
```elisp
;;;; An Example of Bottom-up Programming

;;; Html Utilities
(defmacro as (tag content)
  `(format t "<~(~A~)>~A</~(~A~)>"
           ',tag ,content ',tag))

(defmacro with (tag &rest body)
  `(progn
     (format t "~&<~(~A~)>~%" ',tag)
     ,@body
     (format t "~&</~(~A~)>~%" ',tag)))

(defun brs (&optional (n 1))
  (fresh-line)
  (dotimes (i n)
    (princ "<br>"))
  (terpri))

(defun html-file (base)
  (format nil "~(~A~).html" base))

(defmacro page (name title &rest body)
  (let ((ti (gensym)))
    `(with-open-file (*standard-output*
                      (html-file ,name)
                      :direction :output
                      :if-exist :supersede)
       (let ((,ti ,title))
         (as title ,ti)
         (with center
               (as h2 (string-upcase ,ti)))
         (brs 3)
         ,@body))))
```