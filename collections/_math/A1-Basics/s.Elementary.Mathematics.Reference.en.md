---
title: "Elementary Mathematics: Review and an Advanced Standpoint"
categories: Sheet
subclass: Basics
toc_depth: 2
---

# Elementary Mathematics: Review and an Advanced Standpoint

This reference connects elementary review with the wider mathematics that explains familiar rules. It supports two uses: recovering essential knowledge quickly and understanding why the methods work, where their assumptions enter, and how they connect to other subjects.

The organizing thread is the passage between numbers, symbols, geometry, functions, and approximation. An advanced standpoint should explain an elementary operation, expose its assumptions, or connect it to another problem. More specialized results will appear as short, clearly identified extensions.

## 1. Numbers, Operations, and Measurement

Arithmetic asks more than how to obtain an answer. What objects are being counted or measured? Which operations are permitted? Which changes of notation preserve the quantity? How much of a calculated result is justified by the information supplied?

This chapter follows those questions from number systems to measurement. The recurring method is **to identify what stays unchanged when the representation, the scale, or the number system changes**.

### 1.1 Number Systems and Closure

Why do familiar calculations sometimes demand unfamiliar numbers? The expressions $3-5$, $3/5$, $\sqrt{2}$, and $\sqrt{-1}$ expose different limitations of the numbers available to us.

A set is `closed` under an operation when applying that operation to its permitted inputs always gives another member of the set. Closure is a property of **a set together with a specified operation**: the integers are closed under multiplication, but not under division by a nonzero integer.

We use $\mathbb{N}=\lbrace0,1,2,\ldots\rbrace$ and the standard inclusions

$$
\mathbb{N}\subset\mathbb{Z}\subset\mathbb{Q}\subset\mathbb{R}\subset\mathbb{C}.
$$

| System | What it makes possible | A boundary to remember |
| --- | --- | --- |
| Natural numbers $\mathbb{N}$ | Counting, addition, and multiplication | $3-5$ has no value in $\mathbb{N}$. |
| Integers $\mathbb{Z}$ | Subtraction without a size restriction | $3/5$ is not an integer. |
| Rational numbers $\mathbb{Q}$ | Division by every nonzero number in the system | $x^2=2$ has no rational solution. |
| Real numbers $\mathbb{R}$ | Filling the gaps detected by convergent rational approximations | $x^2=-1$ has no real solution. |
| Complex numbers $\mathbb{C}$ | Solving every nonconstant polynomial equation with complex coefficients | No order compatible with the field operations extends the usual real order. |

**An extension must preserve the meanings and laws of the old operations while supplying new objects.** We cannot merely introduce a symbol for a missing answer and assume that all familiar rules will continue to work. Integers can be constructed from differences of natural numbers, rationals from ratios of integers, and complex numbers from real pairs; the definitions must make the old arithmetic agree with the new arithmetic.

There are also different reasons to extend a system. To solve $x^2=2$, we can work in the much smaller system

$$
\mathbb{Q}(\sqrt{2})
=\{a+b\sqrt{2}:a,b\in\mathbb{Q}\}.
$$

It is closed under the four arithmetic operations, with division restricted to nonzero elements. It does not contain every real number: for example, it still lacks $\sqrt{3}$. *Adjoining one missing root does not fill every gap.*

The move to $\mathbb{R}$ addresses a broader difficulty. Consider the rational approximations

$$
1,\quad 1.4,\quad 1.41,\quad 1.414,\quad 1.4142,\quad\ldots
$$

obtained by successively truncating the decimal expansion of $\sqrt{2}$. The terms eventually become arbitrarily close to one another. Such a sequence is called `Cauchy`: for every $\varepsilon>0$, all sufficiently late pairs of terms differ by less than $\varepsilon$. Yet this sequence has no limit in $\mathbb{Q}$.

Why is the missing limit not rational? If $\sqrt{2}=p/q$ in lowest terms, then $p^2=2q^2$. Thus $p$ is even; writing $p=2r$ forces $q$ to be even as well, contradicting lowest terms. **The obstruction is proved from arithmetic; decimal approximation alone would not prove irrationality.**

The real numbers have the additional property of `completeness`: every Cauchy sequence of real numbers converges to a real number. This is not a claim that every sequence converges; $1,2,3,\ldots$ is not Cauchy. Chapter 10 develops the equivalent description in terms of least upper bounds.

The complex extension answers a different question again. We define $i^2=-1$ and write $z=a+bi$, with $a,b\in\mathbb{R}$. The resulting system has the deeper property that every nonconstant polynomial over $\mathbb{C}$ has a root—the `fundamental theorem of algebra`, discussed later. *Existence of roots does not guarantee a formula in radicals.* Nor does it make every conceivable equation solvable: $0z=1$, for example, remains impossible.

A price is paid in order. In an ordered field every nonzero square must be positive, whether its base is positive or negative. Applying that rule to $i$ would make $i^2=-1$ positive, contradicting the usual real order. **Complex arithmetic preserves the field laws, but cannot preserve a compatible ordering of all its elements.**

The higher viewpoint is therefore **to separate the properties needed for the problem: closure, inverses, solvability, order, and completeness are different requirements**.

Related: [laws and inverses](#12-laws-of-operations); [equations](#3-algebraic-expressions-polynomials-and-equations); [the complex plane](#6-trigonometry-and-the-complex-plane); [completeness and limits](#10-limits-continuity-and-infinity).

### 1.2 Laws of Operations

Which parts of arithmetic are conventions, and which are consequences of its structure? The order in which a written expression is read is a convention. The distributive law is a mathematical property of the operations.

For real or complex numbers, the basic laws are:

| Law | Addition | Multiplication |
| --- | --- | --- |
| Commutativity | $a+b=b+a$ | $ab=ba$ |
| Associativity | $(a+b)+c=a+(b+c)$ | $(ab)c=a(bc)$ |
| Identity | $a+0=a$ | $a\cdot1=a$ |
| Inverse | $a+(-a)=0$ | $a\,a^{-1}=1$, provided $a\ne0$ |

The two operations are connected by `distributivity`:

$$
a(b+c)=ab+ac.
$$

This law explains familiar algorithms: $17\cdot23=17(20+3)=340+51$. It also constrains the rules for new numbers.

For example, distributivity gives $a\cdot0=a(0+0)=a\cdot0+a\cdot0$; subtracting $a\cdot0$ yields $a\cdot0=0$. Now consider

$$
0=(-2)\bigl(3+(-3)\bigr)=-6+(-2)(-3).
$$

Consequently $(-2)(-3)=6$. **The rule “a negative times a negative is positive” is forced by retaining distributivity and additive inverses.** A story about debts may help intuition, but the algebra explains why the sign rule fits the whole system.

Subtraction and division are defined through inverses:

$$
a-b=a+(-b),
\qquad
\frac{a}{b}=ab^{-1}\quad(b\ne0).
$$

They are not themselves commutative or associative. For example,

$$
(8-3)-2=3,\qquad 8-(3-2)=7,
$$

and $(12/3)/2=2$, whereas $12/(3/2)=8$. **Regroup additions or multiplications freely; regroup subtraction or division only after rewriting the operations correctly.**

Why exclude division by zero? Interpreting $a/b$ as the unique solution of $bq=a$ exposes both failures:

- If $a\ne0$ and $b=0$, there is no solution.
- If $a=b=0$, every $q$ is a solution, so there is no unique quotient.

Thus *$0/0$ is not an ordinary number, and $a/0$ is not made meaningful by writing “infinity.”* Limits involving vanishing denominators require a separate analysis.

Cancellation also depends on hypotheses:

$$
a+c=b+c\Longrightarrow a=b,
$$

but

$$
ac=bc\Longrightarrow a=b
\quad\text{requires }c\ne0.
$$

In $(x-1)(x+2)=0$, dividing by $x-1$ before considering $x=1$ discards a solution. The useful method is **to split into the zero and nonzero cases before dividing by an expression of unknown value**.

For written expressions, evaluate parentheses first, then powers, then multiplication and division, then addition and subtraction; operations at the same latter level are read left to right. In particular,

$$
-2^2=-(2^2)=-4,
\qquad
(-2)^2=4.
$$

A fraction bar groups its entire numerator and denominator. When a linear notation might be misread, explicit parentheses are preferable.

From an advanced standpoint, $\mathbb{Q}$, $\mathbb{R}$, and $\mathbb{C}$ are `fields`: addition and multiplication obey these laws, and every nonzero element has a multiplicative inverse. The integers form a `commutative ring` but not a field, because most integers have no integer reciprocal. *A law familiar from numbers need not hold for every mathematical object*: matrix multiplication, for example, is generally not commutative.

Related: [algebraic transformations and equations](#3-algebraic-expressions-polynomials-and-equations); [powers](#5-powers-exponentials-and-logarithms); [linear structure](#7-geometry-coordinates-and-linear-structure).

### 1.3 Fractions and Place Value

How can different symbols name the same number? A `fraction` is both a quotient and a representation; confusing those roles makes cancellation and comparison seem more mysterious than they are.

For integers $a,b,c,d$ with $b,d\ne0$,

$$
\frac{a}{b}=\frac{c}{d}
\quad\Longleftrightarrow\quad ad=bc.
$$

Thus $1/2$, $2/4$, and $3/6$ name one rational number. Multiplying numerator and denominator by the same nonzero integer changes the representation, not the value. A standard representative has a positive denominator and relatively prime numerator and denominator.

![Three equal-length bars partitioned into two, four, and six parts; half of every bar is shaded.]({{site.img}}/mathematics/elementary-mathematics-reference/equivalent-fractions-diagram.svg)

**To add fractions, express the quantities in a common unit.** Halves and thirds can both be counted in sixths:

$$
\frac12+\frac13=\frac36+\frac26=\frac56.
$$

The general rules are

$$
\frac ab+\frac cd=\frac{ad+bc}{bd},
\qquad
\frac ab\cdot\frac cd=\frac{ac}{bd},
\qquad
\frac{a/b}{c/d}=\frac{ad}{bc}.
$$

The first two require $b,d\ne0$; the third also requires $c\ne0$. Subtraction follows by changing $c$ to $-c$. For comparison, first make the denominators positive; then

$$
\frac ab<\frac cd\quad\Longleftrightarrow\quad ad<bc
\qquad(b,d>0).
$$

*Cancellation applies to common factors, not to selected terms inside sums.* For instance,

$$
\frac{2x+2}{2}=x+1,
\qquad
\frac{x+2}{x}=1+\frac2x\quad(x\ne0).
$$

The second expression is generally not $2$. The distributive law explains the distinction.

`Place value` is another change of representation. In base $b\ge2$, a digit in position $j$ contributes its value times $b^j$. For example,

$$
(203.14)_5
=2\cdot5^2+0\cdot5+3+\frac15+\frac4{25}
=\frac{1334}{25}.
$$

Digits must lie between $0$ and $b-1$. The quantity is independent of the chosen base; the appearance and length of its numeral are not.

When does a fraction have a terminating expansion? Write $p/q$ in lowest terms, with $q>0$. A terminating base-$b$ expansion with at most $k$ fractional digits has the form $m/b^k$. Therefore,

$$
\frac pq\text{ terminates in base }b
\quad\Longleftrightarrow\quad
q\mid b^k\text{ for some }k\ge0.
$$

Equivalently, every prime factor of $q$ must divide $b$. In base ten, only factors $2$ and $5$ are allowed: $1/8=0.125$, whereas $1/3$ does not terminate. In base three, $1/3=(0.1)_3$. **Termination is a property of a number together with a base, not of the number alone.**

Long division also explains repeating decimals. Dividing by $q$ leaves only the remainders $0,1,\ldots,q-1$. A zero remainder ends the calculation; a repeated nonzero remainder repeats the subsequent digits. Thus every rational number has an eventually periodic expansion. Conversely, a repeating tail is a geometric series and gives a rational number; for example,

$$
x=0.\overline{27},
\qquad
100x-x=27,
\qquad
x=\frac{27}{99}=\frac3{11}.
$$

The manipulation uses the meaning of the infinite decimal as a limit, developed in Chapters 9–10. An irrational number has neither a terminating nor an eventually periodic expansion in an integer base.

One representation is still not always unique:

$$
0.999\ldots=1.
$$

The first $n$ nines sum to $1-10^{-n}$, whose limit is $1$. *There is no last decimal place at which an unfilled gap remains.* This does not say that a finite string such as $0.999$ equals $1$.

The advanced connection is `equivalence`: a rational number can be constructed as an equivalence class of integer pairs $(a,b)$ with $b\ne0$, where $(a,b)\sim(c,d)$ means $ad=bc$. **Different representatives describe the same object, and valid arithmetic must give the same answer whichever representatives are chosen.** Decimal notation raises a related issue: an infinite numeral is defined by a limiting process, not by a completed finite calculation.

Related: [divisibility and prime factors](#2-divisibility-congruence-and-integer-structure); [geometric sums](#9-sequences-finite-sums-and-counting); [infinite expansions and limits](#10-limits-continuity-and-infinity).

### 1.4 Ratios and Scaling

What does it mean for two quantities to increase “in the same proportion”? A `ratio` compares quantities by division. A `rate` compares quantities of different kinds and retains the corresponding units, as in kilometres per hour.

Before comparing quantities of the same kind, put them in compatible units:

$$
2\ \mathrm{m}:50\ \mathrm{cm}
=200\ \mathrm{cm}:50\ \mathrm{cm}
=4:1.
$$

*The bare numerical comparison $2:50$ would compare different units as though they were identical.*

Two variables are `directly proportional` when $y=kx$ for a fixed $k$. Equivalently, $y/x=k$ wherever $x\ne0$; the graph passes through the origin. If doubling $x$ doubles only the variable part of a charge, the full charge may instead be $y=kx+b$. A nonzero fixed fee $b$ prevents direct proportionality. In `inverse proportion`, $xy=k$, so $y=k/x$ on a domain excluding zero; doubling a positive input halves the output.

**Choose the quantity that is held fixed before using a proportion.** At fixed speed, distance is proportional to time. For a fixed distance, travel time is inversely proportional to speed. The same three quantities support different relations under different assumptions.

A `percentage` is a ratio to a specified base. For a positive initial value $V$, a change by $p\%$ multiplies the value by $1+p/100$. Successive changes therefore multiply:

$$
V\longmapsto1.2V\longmapsto0.8(1.2V)=0.96V.
$$

An increase of $20\%$ followed by a decrease of $20\%$ leaves a net decrease of $4\%$. *The two percentages use different bases.* To reverse the initial $20\%$ increase, the required decrease is $1-1/1.2=1/6$, or $16\tfrac23\%$.

Also distinguish a percentage change from a change in `percentage points`. Moving from $40\%$ to $50\%$ is an increase of $10$ percentage points, and a relative increase of $(50-40)/40=25\%$.

Combining percentages requires their weights. If $10\%$ of a group of $100$ and $20\%$ of a group of $300$ have a property, the combined proportion is

$$
\frac{0.10(100)+0.20(300)}{100+300}
=\frac{70}{400}=17.5\%.
$$

The unweighted average $15\%$ would answer a different question. **Recover the underlying amounts and totals before averaging ratios.**

Scaling geometry reveals another distinction. If all lengths in a figure are multiplied by the same $k>0$, then corresponding lengths, areas, and volumes scale by

$$
k,\qquad k^2,\qquad k^3,
$$

respectively. A cube with twice the side length has eight times the volume. *These laws require uniform scaling*: doubling only one side of a rectangle doubles its area, rather than quadrupling it.

A physical quantity can be written as a numerical value times a unit. Changing metres to centimetres changes the number by a factor of $100$ while preserving the length; changing square metres to square centimetres changes the number by $100^2$. `Dimensional consistency` requires the terms added in an equation to have matching dimensions. It is a powerful check, although matching dimensions alone does not prove a formula correct.

The advanced connection is **to study how quantities transform, and which ratios remain invariant**. A similarity preserves corresponding length ratios and angles; repeated percentage changes compose multiplicatively; a change of unit preserves the underlying quantity. These are early examples of the transformation viewpoint used throughout geometry and analysis.

Related: [growth and logarithms](#5-powers-exponentials-and-logarithms); [similarity and coordinates](#7-geometry-coordinates-and-linear-structure); [weighted averages](#12-probability-data-and-statistical-reasoning).

### 1.5 Order and Distance

Does an operation preserve an inequality? For real numbers, addition by the same number preserves order, but multiplication requires a sign check:

$$
a<b\Longrightarrow a+t<b+t,
$$

$$
a<b,\ c>0\Longrightarrow ca<cb,
\qquad
a<b,\ c<0\Longrightarrow ca>cb.
$$

Multiplication by zero sends both sides to zero and loses the strict inequality. Geometrically, multiplication by a negative number reverses orientation on the number line.

Other transformations also need domain restrictions. If $0<a<b$, then

$$
\frac1a-\frac1b=\frac{b-a}{ab}>0,
$$

so taking reciprocals reverses the inequality. Squaring preserves order on $[0,\infty)$, but not on all of $\mathbb{R}$: $-3<2$ while $(-3)^2>2^2$. **An inequality can be transformed safely only after checking how the transformation behaves on the relevant domain.**

The `absolute value` measures distance from zero:

$$
|x|=
\begin{cases}
x,&x\ge0,\\
-x,&x<0.
\end{cases}
$$

Thus $|x-y|$ is the distance between $x$ and $y$. Useful identities and bounds are

$$
|xy|=|x|\,|y|,
\qquad
\sqrt{x^2}=|x|,
\qquad
|x+y|\le|x|+|y|.
$$

The last statement is the `triangle inequality`. One proof adds the bounds $-|x|\le x\le|x|$ and $-|y|\le y\le|y|$. Their sum lies between $-(|x|+|y|)$ and $|x|+|y|$, giving the claimed bound.

*The square root symbol denotes the nonnegative real square root.* Therefore $\sqrt{x^2}=x$ needs $x\ge0$. Similarly, the equation $u^2=9$ has two real solutions, whereas the expression $\sqrt{9}$ denotes only $3$.

For real endpoints $a<b$, `interval notation` records both a range and its boundary conditions:

| Interval | Condition |
| --- | --- |
| $(a,b)$ | $a<x<b$ |
| $[a,b]$ | $a\le x\le b$ |
| $[a,b)$ | $a\le x<b$ |
| $(a,b]$ | $a<x\le b$ |

Infinite endpoints always use parentheses: $[a,\infty)$ means $x\ge a$. Here $\infty$ indicates an unbounded direction; it is not a real endpoint.

Distance turns two inequalities into one. For $r>0$,

$$
|x-a|<r\quad\Longleftrightarrow\quad a-r<x<a+r.
$$

Replacing both strict signs by non-strict ones gives the corresponding closed interval. For example, $|x-3|\le2$ means $x\in[1,5]$. This language will later express approximation errors and the neighbourhoods used in limits.

![Three number lines show points at minus one and two, their translation by three, and their images under multiplication by minus two. Translation preserves their distance; negative scaling reverses their order and doubles their distance.]({{site.img}}/mathematics/elementary-mathematics-reference/number-line-transformations-diagram.svg)

For any translation $x\mapsto x+t$,

$$
|(a+t)-(b+t)|=|a-b|.
$$

For a scaling $x\mapsto cx$,

$$
|ca-cb|=|c|\,|a-b|.
$$

These formulas separate `distance` from `orientation`. Translation preserves both; reflection $x\mapsto-x$ preserves distance while reversing order; a scaling changes distance by the factor $|c|$. The zero scaling collapses the line to one point.

The advanced connection is the idea of a `metric`: a rule for distance that is nonnegative, vanishes exactly for identical points, is symmetric, and obeys the triangle inequality. **Distance can survive even when a compatible order does not.** Complex numbers have the distance $|z-w|$, using the complex modulus, although they have no compatible field order.

Related: [transformations and graphs](#4-functions-graphs-and-transformations); [complex modulus](#6-trigonometry-and-the-complex-plane); [inequalities and bounds](#8-inequalities-bounds-and-optimization); [neighbourhoods and limits](#10-limits-continuity-and-infinity).

### 1.6 Exact Values and Measured Quantities

If a calculator prints more digits, do we know the quantity more accurately? The answer depends on where the input numbers came from.

An `exact value` belongs to a mathematical specification: $3/10$, $\sqrt{2}$, and $0.1$ are all exact when used as defined numbers. An irrational number can be exact without having a finite decimal expansion. A measured value, by contrast, records information about a physical quantity under a measurement procedure. The same written decimal can serve either role.

**Distinguish uncertainty in the input, approximation in the computation, and assumptions in the model.** An exact multiplication removes none of the uncertainty already present in measured factors. A highly accurate calculation can also describe an unsuitable model.

`Scientific notation` separates magnitude from displayed precision. Every nonzero real number can be written as

$$
x=a\,10^n,
\qquad
1\le|a|<10,
\qquad n\in\mathbb{Z}.
$$

For example,

$$
0.004070=4.070\times10^{-3}.
$$

As a measurement report, this notation conventionally displays four `significant figures`: the leading zeros locate the decimal point, while the final zero records an intended digit of precision. Writing $1.20\times10^3$ also states the displayed precision more clearly than writing $1200$. *Notation alone does not establish instrument accuracy or a probability distribution for the error.*

Suppose a value is rounded to the nearest step $h$. If rounding is the only source of error, the original value lies within $h/2$ of the reported one. Endpoint inclusion depends on the tie-breaking convention; a closed interval supplies a safe enclosure.

For a concrete example, suppose a rectangle's dimensions are reported as

$$
L=12.4\ \mathrm{cm},
\qquad
W=3.2\ \mathrm{cm},
$$

each rounded to the nearest $0.1\ \mathrm{cm}$, with no other error assumed. Then

$$
12.35\le L/\mathrm{cm}\le12.45,
\qquad
3.15\le W/\mathrm{cm}\le3.25.
$$

The nominal area is $12.4\cdot3.2=39.68\ \mathrm{cm}^2$. Because both dimensions are positive, multiplication is increasing in each, so the true area satisfies

$$
38.9025\ \mathrm{cm}^2
\le A\le
40.4625\ \mathrm{cm}^2.
$$

A compact, conservative report is

$$
A=(39.7\pm0.8)\ \mathrm{cm}^2,
$$

where $\pm0.8$ is an enclosing error bound about the displayed centre. It is not a standard deviation or a confidence interval. *Reporting $39.680000\ \mathrm{cm}^2$ without an uncertainty would add digits without adding measurement information.*

The calculation illustrates a general method. Write $x=a+\delta$ and $y=b+\eta$, where $a,b$ are the reported values and

$$
|\delta|\le\varepsilon_x,
\qquad
|\eta|\le\varepsilon_y.
$$

The triangle inequality gives

$$
|(x+y)-(a+b)|\le\varepsilon_x+\varepsilon_y.
$$

For a product, expand first:

$$
xy-ab=a\eta+b\delta+\delta\eta,
$$

hence

$$
|xy-ab|
\le |a|\varepsilon_y+|b|\varepsilon_x
+\varepsilon_x\varepsilon_y.
$$

**Expand the expression and bound the error terms instead of guessing which digits are trustworthy.** The last term is sometimes negligible, but omitting it changes an exact bound into an approximation. For the rectangle, this bound about $39.68$ is $0.7825\ \mathrm{cm}^2$, consistent with the endpoint calculation.

`Absolute error` has the units of the quantity. Relative error, such as $|x-a|/|x|$ for a nonzero true value $x$, compares the error with the size of the quantity. In practice the true value is unknown, so a relative uncertainty may instead be quoted against the reported value, with that convention stated. *Relative measures become problematic near zero.* Subtracting nearly equal measured numbers can leave a small result whose absolute uncertainty is modest but whose relative uncertainty is large.

Division needs special care as well. If a denominator's allowed interval contains zero, a finite bound for the quotient generally cannot be obtained without further restrictions. This is the numerical counterpart of checking a divisor before cancelling it.

The classroom rules—round a sum to the least precise decimal place, and a product to the fewest significant figures among measured factors—are useful reporting heuristics. They do not replace an explicit error analysis, and exact counts or defined conversion factors do not impose the same precision limit. **Keep extra digits during intermediate calculations and round the final reported result.**

The advanced viewpoint is `interval arithmetic` and, later, numerical analysis: **carry information about uncertainty through the operations along with the nominal value**. Repeated appearances of the same uncertain quantity can make independent interval bounds overly wide; for example, $x-x$ is exactly zero even if $x$ is uncertain. Random errors, systematic errors, and model errors also require different treatment; more arithmetic or more repeated measurements do not automatically remove a systematic bias.

Related: [bounds](#8-inequalities-bounds-and-optimization); [limits and numerical approximation](#10-limits-continuity-and-infinity); [differential error estimates](#11-calculus-differential-equations-and-approximation); [measurement and statistical reasoning](#12-probability-data-and-statistical-reasoning).

## 2. Divisibility, Congruence, and Integer Structure

**Review scope:** Primes and factorization; greatest common divisors and least common multiples; Euclid's algorithm and Bézout's identity; divisibility tests; modular arithmetic; elementary integer equations and continued fractions.

**Proposed entries:** Divisibility and prime factorization; Euclid and Bézout; congruence and cancellation; simultaneous remainder conditions; integer equations; rational approximation by continued fractions.

**Advanced standpoint:** Remainder classes turn infinitely many integers into a finite system of calculation. Invertibility explains valid modular division. Positional notation explains familiar divisibility tests, while continued fractions connect exact integer relations with approximation.

**Questions to keep visible:** Why does cancellation require hypotheses? Why does passing several congruence tests not establish the existence of an integer solution? How does unique factorization depend on the number system?

## 3. Algebraic Expressions, Polynomials, and Equations

**Review scope:** Identities, expansion, factorization, rational expressions, substitution, completing the square, polynomial division, quadratic equations, systems of equations, roots and multiplicities, and relations between roots and coefficients.

**Proposed entries:** Expressions, identities, and equations; factorization and polynomial division; reversible transformations; quadratic equations and parameters; roots, multiplicity, and coefficients; exact formulas and numerical root finding.

**Advanced standpoint:** The coefficient domain controls factorization and admissible roots. Equations can be studied as families depending on parameters; discriminants indicate where root behaviour changes. Polynomial symmetries provide a first route toward Galois theory.

**Questions to keep visible:** Which transformations lose solutions or introduce candidates? How do existence, uniqueness, explicit expression, and approximation differ? What does impossibility of solution by radicals actually exclude?

## 4. Functions, Graphs, and Transformations

**Review scope:** Domain, codomain, and image; piecewise functions; composition and inversion; injectivity and surjectivity; monotonicity, symmetry, periodicity, and graph transformations.

**Proposed entries:** A function and its representations; domain and image; composition and inverse functions; monotonicity and symmetry; transformations of graphs; intersections and parameter-dependent behaviour.

**Advanced standpoint:** A function is more general than a single formula. Composition organizes successive operations, inversion requires a suitable restriction of domain, and transformations reveal properties that remain invariant.

**Questions to keep visible:** When do two formulas represent the same function? Why is an inverse relation not always an inverse function? What can a graph suggest, and what still needs proof?

## 5. Powers, Exponentials, and Logarithms

**Review scope:** Integer, rational, and real powers; roots; exponential and logarithmic laws; change of base; exponential equations and inequalities; growth, decay, and logarithmic scales.

**Proposed entries:** Extending the exponent; powers and roots; exponential functions; logarithms as inverses; linearizing multiplication and growth; approximation and numerical evaluation.

**Advanced standpoint:** Logarithms connect multiplication of positive numbers with addition. Exponential functions connect repeated scaling with continuous growth. Definitions through limits, integrals, and differential equations will be compared through links to Chapters 10–11.

**Questions to keep visible:** Which power laws require positive real bases? What changes over the complex numbers? Why does a useful numerical approximation still require an error estimate?

## 6. Trigonometry and the Complex Plane

**Review scope:** Radians and the unit circle; trigonometric functions and identities; inverse trigonometric functions; triangle solving; rectangular and polar forms of complex numbers; conjugation, modulus, argument, powers, and roots.

**Proposed entries:** Angles and circular functions; identities from rotation; inverse branches and equations; triangle relations; complex arithmetic and geometry; roots of unity and periodicity.

**Advanced standpoint:** Complex multiplication unifies rotation and scaling. Euler's formula connects circular functions with the exponential. Roots of unity connect trigonometry, polynomial equations, symmetry, and regular polygons. Quaternions and noncommuting rotations form a short optional extension.

**Questions to keep visible:** How do branches and argument choices affect identities? Why do square-root formulas require sign choices? Which triangle data leave an ambiguous case? Complex logarithms link back to Chapter 5.

## 7. Geometry, Coordinates, and Linear Structure

**Review scope:** Congruence and similarity; triangles, circles, and power of a point; area and volume; lines, planes, circles, and conics in coordinates; vectors, dot products, projections, linear systems, and elementary matrices.

**Proposed entries:** Synthetic relations and geometric proof; similarity and measurement; coordinate descriptions and loci; vectors and projection; linear systems and transformations; classical construction problems.

**Advanced standpoint:** Coordinates translate geometric conditions into equations. Vector spaces and linear maps explain elimination and changes of coordinates. Transformations distinguish metric, affine, and projective properties. Field extensions explain why some exact straightedge-and-compass constructions are impossible.

**Questions to keep visible:** Which properties depend on coordinates, and which do not? How do length, area, and volume scale? Why does an approximate construction not settle exact constructibility?

## 8. Inequalities, Bounds, and Optimization

**Review scope:** Sign analysis; absolute-value inequalities; nonnegative squares; arithmetic–geometric mean, Cauchy–Schwarz, and triangle inequalities; elementary convexity; constrained extrema.

**Proposed entries:** Order-preserving operations; intervals and sign charts; standard inequalities with equality cases; bounding and comparison; convexity and averages; local and global optimization.

**Advanced standpoint:** Inequalities provide certificates of bounds, not merely substitutions into familiar formulas. Convexity explains families of averaging inequalities. Inner products unify several elementary estimates, while compactness and continuity explain important existence guarantees.

**Questions to keep visible:** When must an inequality reverse? Are the equality conditions attainable? Is the claimed optimum a maximum, a supremum, or merely a stationary value? Calculus methods link to Chapter 11.

## 9. Sequences, Finite Sums, and Counting

**Review scope:** Arithmetic and geometric sequences; recurrence relations; induction; telescoping and shifted sums; permutations, combinations, binomial coefficients, inclusion–exclusion, and the pigeonhole principle.

**Proposed entries:** Sequence definitions and recurrences; standard finite sums; summation transformations; counting by cases and stages; binomial identities and double counting; generating functions as an extension.

**Advanced standpoint:** A counting identity can express a bijection or two descriptions of the same collection. Recurrences encode a process, while generating functions translate suitable recurrence and counting problems into algebraic operations. Finite identities prepare infinite processes without automatically justifying them.

**Questions to keep visible:** Does order matter, and is repetition allowed? Are cases disjoint and exhaustive? Does a recurrence specify enough initial information? Convergence belongs to Chapter 10.

## 10. Limits, Continuity, and Infinity

**Review scope:** Limits of sequences and functions; monotone bounded sequences; Cauchy sequences; elementary convergence tests; continuity; intermediate and extreme value theorems; countability.

**Proposed entries:** Limits as error control; completeness of the real numbers; continuity and existence; infinite series and remainders; pointwise and uniform convergence; counting infinite sets.

**Advanced standpoint:** Completeness explains why approximation can have a destination within the number system. Quantifier order distinguishes local control from uniform control. One-to-one correspondence separates cardinality from density and from geometric dimension.

**Questions to keep visible:** When may limits be interchanged with other operations? Why is a convergent sequence of approximations not automatically a valid approximation procedure for every purpose? What separates rational, algebraic, and transcendental numbers?

## 11. Calculus, Differential Equations, and Approximation

**Review scope:** Derivatives and their rules; rates, tangents, monotonicity, and extrema; antiderivatives and definite integrals; substitution and integration by parts; the fundamental theorem; elementary differential equations; Taylor approximation.

**Proposed entries:** Differentiation as local linear approximation; derivative rules and applications; integration and accumulation; the fundamental theorem and integration methods; differential equations and initial data; Taylor polynomials, remainders, and periodic approximation.

**Advanced standpoint:** Differentiation and integration connect local change with accumulated effect. Differential equations can characterize functions without an explicit formula. Taylor polynomials match local derivatives; Fourier approximations resolve periodic behaviour into modes. Their validity depends on different approximation and convergence arguments.

**Questions to keep visible:** Why need a stationary point not be an extremum? Why need a smooth function not equal its Taylor series? What distinguishes truncation error, rounding error, conditioning, and stability? The transcendence of $e$ and $\pi$ is an optional theorem-level extension, not a prerequisite for calculus.

## 12. Probability, Data, and Statistical Reasoning

**Review scope:** Sample spaces and counting probabilities; conditional probability, independence, total probability, and Bayes's rule; discrete random variables, expectation, and variance; binomial models; descriptive statistics and elementary least squares.

**Proposed entries:** Events and probability models; conditioning and independence; random variables and moments; repeated trials; describing data; fitting, inference, and model assumptions.

**Advanced standpoint:** Probability weights a specified space of possibilities. Expectation connects weighted averaging with integration. Least squares connects data fitting with geometry and optimization; inference connects observations with assumptions about how they were generated.

**Questions to keep visible:** Why is mutual exclusivity different from independence? Which variance convention is in use? Why do additional observations not automatically remove bias? This chapter supplements the scope of the Klein volume.

## 13. Methods, Proof, and Cross-Topic Connections

**Review scope:** Sets and logical notation; quantifiers and their negations; necessary and sufficient conditions; direct proof, contraposition, contradiction, induction, construction, and counterexample.

**Proposed indexes:** A proof-method index; a problem-to-method index; an alphabetical concept index; and a cross-topic connection index. Entries will link to explanations in the subject chapters rather than duplicate them.

**Central connections to trace:** Equivalence and changes of representation; symmetry and invariants; local versus global information; finite versus infinite processes; existence versus construction; exactness versus approximation.

**Questions to keep visible:** What has actually been proved: one case, an implication, an equivalence, existence, or uniqueness? Which assumptions were used? How can a counterexample reveal the missing condition?

## 14. Sources, Scope, and Editorial Notes

**Primary material:** Felix Klein, [Elementary Mathematics from an Advanced Standpoint: Arithmetic, Algebra, Analysis][Klein]. Its organization and connecting arguments guide the advanced perspective; the reference will supply elementary reminders that Klein often assumes his readers already know.

**Classification reference:** The existing [Chinese reference](s.Elementary.Mathematics.Reference.zh.md) supplies a coverage checklist. Its formulas and qualifications require independent checking before reuse.

| Planned chapters | Principal connection to Klein |
| --- | --- |
| 1–2 | Part I, I–III: calculation, extensions of number, and properties of integers. |
| 3 | Part II, I–II: real and complex equations, graphical methods, parameters, and solvability. |
| 4 | The discussion of the general structure of mathematics; Part III's excursus on the function concept. |
| 5 | Part III, I: logarithmic and exponential functions. |
| 6 | Part I, IV: complex numbers and quaternions; Part III, II: circular functions and their applications. |
| 7 | Geometric interpretation throughout Parts I–II; the construction problems in Part I, III. A systematic plane and solid geometry review is supplementary: this is not Klein's geometry volume. |
| 8 | Bounds, graphical comparisons, and approximation across the volume. The consolidated inequality and optimization reference is supplementary. |
| 9 | Arithmetic laws and the finite-sum reasoning underlying analysis. The systematic combinatorics and generating-function coverage is supplementary. |
| 10 | Irrational numbers in Part I, II; functions and infinite processes in Part III; the supplement on sets. |
| 11 | Part III, III: calculus and Taylor's theorem; Part III, II: oscillations and trigonometric series; the transcendence supplement. |
| 12 | Supplementary coverage, using appropriate probability and error-theory material from the supplied [Companion Encyclopedia][Companion] and [Mathematical Thought][Kline], with standard elementary derivations checked independently. |
| 13 | Klein's introduction and discussion of mathematical organization, supplemented by the proof and problem-solving coverage in the Chinese reference. |

The supplied historical works will provide context and selected bridges where appropriate. Modern definitions and later developments will be identified as such. Missing or damaged equations in the transcriptions will be reconstructed and checked; historical claims will not be treated as current mathematical definitions.

For the completed reference, each substantive entry will contain a compact review statement, explicit hypotheses, a short explanation or worked example, an advanced connection, a pitfall or counterexample, and links to related entries. Longer proofs will be reserved for results that illuminate several topics.

The notation will follow the established reading convention: selected terms in inline code, methods and important conclusions in bold, and obstacles or limitations in italics. Mathematical notation will remain in math delimiters. Source locations and editorial remarks will stay in this final chapter.

A first review can proceed through Chapters 1–9 and 12, consulting Chapter 13 as needed. A second pass can follow the attached advanced connections into Chapters 10–11. Specialized extensions will remain optional; the explanation of the elementary material will be self-contained at its stated level.

**Chapter 1: source map and explanatory additions**

| Entry | Principal passages in [Klein][Klein] | Treatment in this reference |
| --- | --- | --- |
| 1.1 Number systems and closure | Part I, II, “The First Extension of the Notion of Number,” especially “Negative Numbers,” “Fractions,” and “Irrational Numbers”; Part I, IV, “Ordinary Complex Numbers.” | The contrast between extending operations and filling gaps follows Klein's connecting argument. The Cauchy formulation of completeness, the example $\mathbb{Q}(\sqrt{2})$, and the ordered-field obstruction are explicit modern explanations. |
| 1.2 Laws of operations | Part I, I, “The Fundamental Laws of Reckoning”; Part I, II, “Negative Numbers.” | Algebraic derivations explain the sign rules, inverse operations, and the conditions for cancellation. Ring and field terminology provides a modern summary. |
| 1.3 Fractions and place value | Part I, I, “Practice in Calculating with Integers”; Part I, II, “Fractions” and “Irrational Numbers”; Part I, III, the discussion of positional notation and periodic fractions. | Equivalent representations connect measurement with formal construction. The termination criterion, remainder argument, and worked calculations are supplied explicitly. |
| 1.4 Ratios and scaling | Part I, II, “Negative Numbers” and “Fractions,” especially the interpretations of multiplication as a transformation and a ratio as a measure. | Percentages, weighted proportions, dimensional checks, and uniform geometric scaling are supplementary elementary applications. |
| 1.5 Order and distance | Part I, I, “The Fundamental Laws of Reckoning”; Part I, II, “Negative Numbers”; Part I, IV, “Ordinary Complex Numbers.” | Translation and scaling follow Klein's geometric interpretation. Interval notation, the metric viewpoint, and domain checks are organized as a modern review. |
| 1.6 Exact values and measured quantities | Part I, I, “The Fundamental Laws of Reckoning,” on abridged reckoning and uncertain measurements; Part I, II, “Irrational Numbers,” on approximation and enclosing bounds. | The rectangle calculation and error bounds are independently derived examples. Significant figures, interval dependence, and distinctions among sources of error are supplementary explanations. |

The two SVG diagrams in Chapter 1 are original illustrations. Missing formulas in the supplied transcription are not reproduced as gaps: the equations used here are stated with their hypotheses and checked independently. Klein's historically specific claims about physical measurement limits are not adopted as present-day accuracy bounds. The uncertainty example assumes only rounding error and makes that assumption explicit.

**Draft status:** Chapter 1 is written; Chapters 2–13 remain the agreed chapter plan.


[Klein]: <../../../../todos/_10_materials/HistoryOfMathematics/Elementary Mathematics from an Advanced Standpoint Arithmetic, Algebra, Analysis (Felix Klein) (z-library.sk, 1lib.sk, z-lib.sk)/Elementary Mathematics from an Advanced Standpoint Arithmetic, Algebra, Analysis (Felix Klein) (z-library.sk, 1lib.sk, z-lib.sk).md>
[Companion]: <../../../../todos/_10_materials/HistoryOfMathematics/Companion Encyclopedia of the History and Philosophy of the Mathematical Sciences (I. Grattan-Guinness) (z-library.sk, 1lib.sk, z-lib.sk)/Companion Encyclopedia of the History and Philosophy of the Mathematical Sciences (I. Grattan-Guinness) (z-library.sk, 1lib.sk, z-lib.sk).md>
[Kline]: <../../../../todos/_10_materials/HistoryOfMathematics/Mathematical Thought from Ancient to Modern Times (3-volume-set) (Morris Kline) (z-library.sk, 1lib.sk, z-lib.sk)/Mathematical Thought from Ancient to Modern Times (3-volume-set) (Morris Kline) (z-library.sk, 1lib.sk, z-lib.sk).md>
