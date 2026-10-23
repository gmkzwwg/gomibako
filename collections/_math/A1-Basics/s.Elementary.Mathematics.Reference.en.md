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

This chapter follows those questions from number systems to measurement. The recurring method is **to identify what stays unchanged when the representation, the scale, or the number system changes**. Worked examples develop the methods in context; the [chapter-end problems](#17-classical-problems-and-extensions) offer further practice and connections.

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

**Worked example 1.1 — Why is the diagonal of a unit square irrational?**

Pythagoras's theorem gives a diagonal of length $\sqrt2$. Could it be expressed as a fraction of the side length? Suppose $\sqrt2=p/q$, where positive integers $p,q$ have no common factor greater than $1$. Then $p^2=2q^2$, so $p$ is even. Writing $p=2r$ gives $q^2=2r^2$, forcing $q$ to be even as well. This contradicts the choice of lowest terms.

**Assume a reduced representation and show that the equation forces a common factor.** The proof identifies the missing limit above as irrational; decimal approximation alone would not establish that fact.

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

**Worked example 1.2 — Find the flaw in a “proof” that $2=1$.**

Take $a=b=1$. Then $a^2=ab$, and subtracting $b^2$ and factoring gives

$
(a-b)(a+b)=b(a-b).
$

Cancelling $a-b$ appears to give $a+b=b$, hence $2=1$. The invalid step is the cancellation: $a-b=0$. Before cancellation, the equation merely states $0=0$ and gives no equality between the remaining factors.

**Audit the condition of each operation, especially division, before trusting a chain of algebra.** Every displayed identity before the cancellation is correct; the error is the unlicensed inference.

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

Long division also explains repeating decimals. Dividing by $q$ leaves only the remainders $0,1,\ldots,q-1$. A zero remainder ends the calculation; a repeated nonzero remainder repeats the subsequent digits. Thus every rational number has an eventually periodic expansion. Conversely, a repeating tail is a geometric series and gives a rational number.

**Worked example 1.3 — Convert a decimal with a nonrepeating prefix.**

Let $x=0.1\overline6=0.1666\ldots$. Multiplying by $10$ and $100$ aligns the repeating tails:

$
10x=1.666\ldots,\qquad
100x=16.666\ldots.
$

Subtracting gives $90x=15$, hence $x=1/6$. **Shift far enough to align the repeating parts before subtracting.** *A nonrepeating prefix must be accounted for; it cannot be folded into the repeating block.*

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

**Worked example 1.4 — Average speed over equal distances.**

A traveller goes out at $60\ \mathrm{km/h}$ and returns over the same distance at $40\ \mathrm{km/h}$. What is the average speed for the whole trip?

If each leg is $d$ kilometres, the total time is $d/60+d/40$ hours. Thus

$
v_{\mathrm{avg}}
=\frac{2d}{d/60+d/40}
=48\ \mathrm{km/h}.
$

The arithmetic average $50$ would apply to equal travel times. *Here the slower speed operates for longer.* In general, equal distances travelled at positive speeds $u,v$ give the `harmonic mean` $2uv/(u+v)$. **Return to total distance divided by total time before choosing an averaging rule.**

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
| $\lbrack a,b\rbrack$ | $a\le x\le b$ |
| $[a,b)$ | $a\le x<b$ |
| $(a,b]$ | $a<x\le b$ |

Infinite endpoints always use parentheses: $[a,\infty)$ means $x\ge a$. Here $\infty$ indicates an unbounded direction; it is not a real endpoint.

Distance turns two inequalities into one. For $r>0$,

$$
|x-a|<r\quad\Longleftrightarrow\quad a-r<x<a+r.
$$

Replacing both strict signs by non-strict ones gives the corresponding closed interval. For example, $|x-3|\le2$ means $x\in\lbrack1,5\rbrack$. This language will later express approximation errors and the neighbourhoods used in limits.

**Worked example 1.5 — Solve an equation by interpreting distance.**

Find all real $x$ such that $|x-1|+|x+2|=5$. The left-hand side is the sum of the distances from $x$ to $1$ and $-2$. Between those endpoints the sum is $3$, so any solution must lie outside their interval.

For $x<-2$, the equation becomes $(1-x)+(-x-2)=5$, giving $x=-3$. For $x>1$, it becomes $(x-1)+(x+2)=5$, giving $x=2$. Both values satisfy the relevant inequalities and the original equation.

**Split at the points where the absolute-value expressions change sign, or use the same partition geometrically.** More generally, a prescribed distance sum below $3$ gives no solution, a sum equal to $3$ gives the whole interval $\lbrack-2,1\rbrack$, and a sum above $3$ gives two exterior points.

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

**Worked example 1.6 — What area is justified by rounded side lengths?**

Suppose a rectangle's dimensions are reported as

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

### 1.7 Classical Problems and Extensions

Try the problems before reading the solution notes. Each asks you to carry one of the chapter's methods a step further; Problems 1.A and 1.C also prepare the discussion of infinity in Chapter 10.

**Problem 1.A — Dense does not mean complete.** Prove that between any two distinct real numbers there is a rational number and an irrational number. Why does the density of the rationals not make them complete?

**Problem 1.B — A sum that collapses.** For a positive integer $n$, evaluate

$$
S_n=\frac1{1\cdot2}+\frac1{2\cdot3}+\cdots+\frac1{n(n+1)}.
$$

What happens as $n$ increases without bound?

**Problem 1.C — How many decimal representations can one number have?** Explain $0.24999\ldots=0.25000\ldots$. Show that if two distinct decimal expansions with the same integer part represent the same nonnegative number, one must eventually consist entirely of nines and the other entirely of zeros.

**Problem 1.D — Repeated replacement.** A tank initially contains $10$ litres of pure juice. Remove $2$ litres and replace them with water; mix thoroughly, then repeat once. How much juice remains? Generalize to $n$ replacements of $r$ litres in a tank of fixed volume $V$, where $0<r<V$.

**Problem 1.E — Where should a meeting point be?** Find the minimum, over real $x$, of

$$
|x|+|x-2|+|x-7|.
$$

Identify every point where it is attained. What suggests that the median is relevant?

**Problem 1.F — An exact constraint changes an error bound.** A rectangle has exact perimeter $40\ \mathrm{cm}$ and length $L$ satisfying $9.9\le L/\mathrm{cm}\le10.1$. Find the sharp range of its area. Compare it with the bound obtained by treating both sides as independent quantities in $\lbrack9.9,10.1\rbrack\ \mathrm{cm}$.

**Solution notes and connections**

**1.A.** Let $a<b$. Choose a positive integer $n$ such that $n(b-a)>1$, and put $m=\lfloor na\rfloor+1$, where $\lfloor u\rfloor$ is the greatest integer at most $u$. Then $na<m\le na+1<nb$, so $a<m/n<b$. Apply the same argument to $(a-\sqrt2,b-\sqrt2)$ to obtain a rational $r$; the number $r+\sqrt2$ is irrational and lies in $(a,b)$.

This proof uses the Archimedean property of the reals, which allows arbitrarily large positive integers. **Density supplies points inside every interval; completeness supplies limits for Cauchy sequences.** The rational approximations to $\sqrt2$ in Section 1.1 show why the former does not imply the latter.

**1.B.** Use

$$
\frac1{k(k+1)}=\frac1k-\frac1{k+1}.
$$

The finite sum `telescopes` to $S_n=1-1/(n+1)=n/(n+1)$. Hence $S_n\to1$. **Rewrite a term as a difference of consecutive terms before summing.** The finite cancellation is algebraic; passing to the infinite sum uses a limit. This distinction returns in Chapters 9–10.

**1.C.** The tail after $0.24$ contributes

$$
\sum_{j=3}^{\infty}9\cdot10^{-j}=10^{-2},
$$

giving $0.25$. For the general claim, let $k$ be the first decimal place where the expansions differ, and suppose the first expansion has the larger digit. Its advantage is at least $10^{-k}$. The largest possible compensation from all later digits is

$$
\sum_{j=k+1}^{\infty}9\cdot10^{-j}=10^{-k}.
$$

Equality requires the differing digits to be consecutive and every later digit in the smaller expansion to be $9$, with every later digit in the larger expansion $0$. **Bounding the entire remaining tail proves that these are the only ambiguities.**

**1.D.** Each removal leaves $4/5$ of the juice then present. After two replacements, $10(4/5)^2=6.4$ litres remain. In general the remaining amount is

$$
V\left(1-\frac rV\right)^n.
$$

*Thorough mixing and constant volume are essential assumptions.* The fixed fraction acts on a changing amount, connecting proportional reasoning with geometric sequences and exponential decay.

**1.E.** The triangle inequality gives $|x|+|x-7|\ge7$, so the total is at least $7+|x-2|\ge7$. At $x=2$ equality holds, and any other $x$ makes the second bound strict. The unique minimizer is therefore $2$, with minimum $7$. Pairing the outermost points in a longer ordered list leads to the general rule that a median minimizes the sum of absolute distances. This connects geometry with descriptive statistics.

**1.F.** Write $\ell=L/\mathrm{cm}$. The other side is $(20-\ell)\ \mathrm{cm}$, so

$$
\frac{A}{\mathrm{cm}^2}
=\ell(20-\ell)
=100-(\ell-10)^2.
$$

The sharp range is $99.99\le A/\mathrm{cm}^2\le100$, attained at the permitted endpoints and at $\ell=10$, respectively. Independent multiplication of the side intervals would give the wider range $\lbrack98.01,102.01\rbrack\ \mathrm{cm}^2$. **Use the exact relation between uncertain quantities before bounding them.** The constraint prevents both sides from being simultaneously above or below $10\ \mathrm{cm}$.

## 2. Divisibility, Congruence, and Integer Structure

Why do equations become harder when their solutions must be integers? Over the rationals, $6x=8$ is immediately solved by division. Over the integers, the obstruction is divisibility. Yet the same restriction also supplies tools: prime factors, remainders, and the Euclidean algorithm reveal structure that ordinary division conceals.

The chapter moves from factorization to integer equations and rational approximation. **Its central method is to replace an unstructured search by a condition, an invariant, or a construction that can be checked.** Worked examples appear where their methods arise; the [chapter-end problems](#27-classical-problems-and-extensions) develop the connections further.

### 2.1 Divisibility and Prime Factorization

For integers $d\ne0$ and $n$, we write $d\mid n$ when $n=dk$ for some integer $k$. Divisibility is preserved by integer linear combinations: if $d\mid a$ and $d\mid b$, then $d\mid ua+vb$ for every pair of integers $u,v$.

A `prime` is an integer $p>1$ whose only positive divisors are $1$ and $p$. An integer greater than $1$ that is not prime is `composite`. The number $1$ is neither: it is a multiplicative unit, and inserting extra factors of $1$ contributes no information to a factorization.

The `fundamental theorem of arithmetic` states that every integer $n>1$ has a prime factorization, unique apart from the order of its factors:

$$
n=p_1^{e_1}\cdots p_r^{e_r},
\qquad e_i\ge1.
$$

Existence follows by repeatedly factoring a composite number into smaller positive integers. Uniqueness requires an additional fact, `Euclid's lemma`: if a prime divides a product, it divides at least one factor. We prove that lemma using Bézout's identity in the next section. *Repeatedly finding factors establishes existence; it does not by itself establish uniqueness.*

**Worked example 2.1 — Can a finite list contain every prime?**

Suppose the list is $p_1,\ldots,p_r$, and form

$$
N=p_1p_2\cdots p_r+1.
$$

Since $N>1$, it has a prime divisor $q$. If $q$ were one of the listed primes, it would divide both $N$ and the product, hence their difference $1$, which is impossible. Thus the list omits a prime.

**The construction defeats every proposed finite list.** It does not assert that $N$ itself is prime: for example,

$$
2\cdot3\cdot5\cdot7\cdot11\cdot13+1
=30031=59\cdot509.
$$

For positive integers $a,b$, their `greatest common divisor` $\gcd(a,b)$ is the largest positive divisor of both; their `least common multiple` $\operatorname{lcm}(a,b)$ is the smallest positive multiple of both. Write $a=\prod_p p^{\alpha_p}$ and $b=\prod_p p^{\beta_p}$, assigning exponent zero to absent primes. Then:

| Quantity or property | Prime-factor description |
| --- | --- |
| $a\mid b$ | $\alpha_p\le\beta_p$ for every prime $p$ |
| $\gcd(a,b)$ | $\prod_p p^{\min(\alpha_p,\beta_p)}$ |
| $\operatorname{lcm}(a,b)$ | $\prod_p p^{\max(\alpha_p,\beta_p)}$ |
| $a$ is a perfect square | Every $\alpha_p$ is even |

In particular, $\gcd(a,b)\operatorname{lcm}(a,b)=ab$. The number of positive divisors of $a$ is $\prod_p(\alpha_p+1)$: choose each divisor's exponent independently from $0$ through $\alpha_p$.

These descriptions separate structural information from computation. To test whether $n>1$ is prime, trial division need only consider primes up to $\sqrt n$, because a factorization $n=uv$ with $u,v>1$ has a factor at most $\sqrt n$. *A correct finite method may still require too much work for a large input.* The Euclidean algorithm will find a gcd without first factoring either number.

The advanced viewpoint is that **prime exponents turn multiplication into addition and divisibility into coordinatewise comparison**. But unique factorization belongs to a particular number system; it can fail after an extension. Problem 2.G exhibits the failure explicitly.

Related: [fraction representations](#13-fractions-and-place-value); [Euclid and Bézout](#22-euclid-and-bezout); [polynomial factorization](#3-algebraic-expressions-polynomials-and-equations).

### 2.2 Euclid and Bezout

How can we find the common divisors of two large integers without finding all their factors? For $a\ge0$ and $b>0$, `division with remainder` gives unique integers $q,r$ such that

$$
a=bq+r,\qquad 0\le r<b.
$$

A number divides both $a$ and $b$ exactly when it divides both $b$ and $r=a-bq$. Therefore,

$$
\gcd(a,b)=\gcd(b,r).
$$

This is the invariant behind the `Euclidean algorithm`. Replace the pair by the divisor and remainder, then repeat. The nonzero remainders strictly decrease, so the process terminates; the last nonzero remainder is the gcd.

**Worked example 2.2 — Find the gcd and a certificate for it.**

For $252$ and $198$,

$$
\begin{aligned}
252&=1\cdot198+54,\\
198&=3\cdot54+36,\\
54&=1\cdot36+18,\\
36&=2\cdot18.
\end{aligned}
$$

Thus $\gcd(252,198)=18$. Reversing the calculation gives

$$
\begin{aligned}
18&=54-36\\
&=54-(198-3\cdot54)\\
&=4(252-198)-198\\
&=4\cdot252-5\cdot198.
\end{aligned}
$$

The last equality is a certificate: every common divisor must divide its right-hand side, hence must divide $18$. Since $18$ also divides both original numbers, it is their gcd. **Back-substitution converts a numerical answer into a verifiable reason.**

In general, for integers $a,b$ not both zero, `Bézout's identity` asserts that

$$
ax+by=d,\qquad d=\gcd(a,b)>0
$$

for suitable integers $x,y$. For negative inputs, apply the algorithm to absolute values and adjust the signs of the coefficients; if one input is zero, the claim is immediate. Every integer combination of $a,b$ is a multiple of $d$, and every multiple of $d$ is such a combination. Symbolically,

$$
\{ax+by:x,y\in\mathbb Z\}=d\mathbb Z.
$$

This set is the `ideal generated by $a$ and $b$`: it is closed under addition and under multiplication by any integer. The equation says that in $\mathbb Z$ these two generators can be replaced by the single generator $d$. The abstraction records precisely what the algorithm computes.

Bézout also proves Euclid's lemma. Suppose $p$ is prime, $p\mid ab$, and $p\nmid a$. Then $\gcd(p,a)=1$, so $up+va=1$ for some integers $u,v$. Multiplying by $b$ gives

$$
b=upb+vab.
$$

Both terms on the right are divisible by $p$, hence $p\mid b$. Applying this lemma repeatedly to two prime factorizations matches their prime factors and proves uniqueness.

*The prime hypothesis matters:* $4\mid2\cdot6$, but $4$ divides neither factor. More generally, the useful cancellation statement is that $\gcd(a,m)=1$ and $m\mid ab$ together imply $m\mid b$.

Related: [modular inverses](#23-congruence-cancellation-and-decimal-periods); [integer linear equations](#25-integer-equations-and-rational-points); [continued fractions](#26-rational-approximation-by-continued-fractions).

### 2.3 Congruence, Cancellation, and Decimal Periods

If only the remainder matters, why carry the entire integer through a calculation? Fix an integer $m\ge2$. The notation

$$
a\equiv b\pmod m
\quad\Longleftrightarrow\quad m\mid(a-b)
$$

means that $a$ and $b$ belong to the same `residue class`. Each class has one representative among $0,1,\ldots,m-1$. Replacing an integer by a congruent one preserves sums, products, and nonnegative integer powers.

**Remainder arithmetic replaces infinitely many integers by finitely many classes while preserving the operations relevant to the question.** These classes form the ring $\mathbb Z/m\mathbb Z$. A class has a multiplicative inverse exactly when it is represented by an integer coprime to $m$: Bézout's equation $au+mv=1$ gives $au\equiv1\pmod m$. Such an invertible class is called a `unit`.

*Nonzero does not imply invertible.* Modulo $6$, the nonzero classes $2$ and $3$ have product zero. These are `zero divisors`. Modulo a prime $p$, every nonzero class is invertible, so $\mathbb Z/p\mathbb Z$ is a field.

Cancellation must consequently track the modulus. If $g=\gcd(c,m)$, then

$$
ca\equiv cb\pmod m
\quad\Longleftrightarrow\quad
a\equiv b\pmod{m/g}.
$$

Indeed, divide the divisibility statement $m\mid c(a-b)$ by $g$; the remaining coefficient $c/g$ is coprime to $m/g$. If $m/g=1$, the resulting condition puts no restriction on $a-b$. Cancellation preserves the original modulus only when $g=1$.

**Worked example 2.3A — Solve a congruence with a noninvertible coefficient.**

Solve $6x\equiv8\pmod{14}$. Dividing the divisibility relation by $2$ gives

$$
3x\equiv4\pmod7.
$$

Since $3\cdot5\equiv1\pmod7$, multiplication by $5$ gives $x\equiv6\pmod7$. Thus all integer solutions are $x=6+7t$; expressed modulo $14$, they are the two classes $6$ and $13$.

**Divide the coefficient, the right-hand side, and the modulus by their common factor before inverting.** Treating $6$ as invertible modulo $14$ would erase the distinction between the two solution classes.

Positional notation supplies familiar divisibility tests. For a decimal integer $N=\sum_j d_j10^j$,

$$
N\equiv\sum_jd_j\pmod9,
\qquad
N\equiv\sum_j(-1)^jd_j\pmod{11},
$$

because $10\equiv1\pmod9$ and $10\equiv-1\pmod{11}$. The digit-sum test also works modulo $3$. Divisibility by $4$ or $8$ depends only on the last two or three digits, because $100$ or $1000$ vanishes modulo the relevant divisor. *A check modulo $9$ can detect some errors, but any error that is a multiple of $9$ passes undetected.*

Periodic decimals reveal a deeper structure. For $q>1$ with $\gcd(q,10)=1$, the decimal period of $1/q$ is the smallest positive $r$ such that

$$
10^r\equiv1\pmod q.
$$

This number is the `multiplicative order` of $10$ modulo $q$. The condition says exactly that $(10^r-1)/q$ is an integer, so shifting the decimal point $r$ places leaves the same fractional part.

**Worked example 2.3B — Why does $1/7$ repeat in six places?**

Successive powers of $10$ modulo $7$ are

$$
3,\ 2,\ 6,\ 4,\ 5,\ 1.
$$

The first return to $1$ occurs after six steps. Since $999999/7=142857$,

$$
\frac17=0.\overline{142857}.
$$

The period is six because no earlier power returned to $1$, not merely because six digits happened to look repetitive.

Why must a return occur? The units modulo $m$ form a finite group under multiplication. Multiplying all units by any fixed unit $a$ permutes them. Taking the product and cancelling the invertible product gives `Euler's theorem`,

$$
a^{\varphi(m)}\equiv1\pmod m
\qquad\text{when }\gcd(a,m)=1,
$$

where $\varphi(m)$ counts the residue classes coprime to $m$. The least return time divides any return time: divide the exponent by the least return time and use minimality on the remainder. Thus the decimal period divides $\varphi(q)$. For a prime $p$, $\varphi(p)=p-1$, giving `Fermat's little theorem`. *Neither theorem permits omission of the coprimality condition in this form.*

For a reduced fraction $p/q$ with $\gcd(q,10)=1$, the numerator is also invertible modulo $q$, so its period is the same as that of $1/q$. Factors $2$ and $5$ in the denominator create the finite initial part discussed in Chapter 1; the remaining factor controls the repeating tail.

Related: [place value](#13-fractions-and-place-value); [simultaneous remainders](#24-simultaneous-remainder-conditions); [periodicity and roots of unity](#6-trigonometry-and-the-complex-plane).

### 2.4 Simultaneous Remainder Conditions

Can several individually possible remainder conditions be satisfied by the same integer? For coprime positive moduli $m,n>1$, the `Chinese remainder theorem` says that

$$
x\equiv a\pmod m,
\qquad
x\equiv b\pmod n
$$

has exactly one solution class modulo $mn$.

The proof supplies a method. Write $x=a+mt$. Then $mt\equiv b-a\pmod n$, and $m$ has an inverse modulo $n$, so $t$ is determined modulo $n$. Any two resulting solutions differ by a multiple of both $m$ and $n$, hence by a multiple of $mn$. The argument extends to any finite collection of pairwise coprime moduli.

**Worked example 2.4 — A number with three prescribed remainders.**

Find the integers leaving remainder $2$ on division by $3$, remainder $3$ on division by $5$, and remainder $2$ on division by $7$.

The first condition gives $x=3u+2$. The second gives

$$
3u+2\equiv3\pmod5,
\qquad u\equiv2\pmod5,
$$

so $x=8+15v$. Modulo $7$, this becomes $1+v\equiv2$, hence $v=1+7t$. Therefore,

$$
x=23+105t,\qquad t\in\mathbb Z.
$$

The least positive solution is $23$. Substitution checks the three remainders; the derivation proves that no solution class was missed. **Impose one condition exactly, then solve for the remaining freedom.**

When the moduli are not coprime, the conditions must agree on their shared divisor. In general, a solution exists exactly when

$$
a\equiv b\pmod{\gcd(m,n)},
$$

and, if it exists, is unique modulo $\operatorname{lcm}(m,n)$. Necessity follows by subtracting the conditions. For sufficiency, solve $mt\equiv b-a\pmod n$ after dividing by $\gcd(m,n)$.

For instance, $x\equiv1\pmod4$ and $x\equiv2\pmod6$ are incompatible: one requires an odd integer and the other an even one. Replacing the second remainder by $3$ gives the solution class $x\equiv9\pmod{12}$.

From an advanced standpoint, for coprime moduli the map

$$
[x]_{mn}\longmapsto([x]_m,[x]_n)
$$

is a bijection that preserves addition and multiplication. **Arithmetic modulo a product separates into independent arithmetic in its coprime components.** This is a structural decomposition, as well as an efficient way to solve a puzzle.

*The existence theorem applies to the stated congruences.* For a different problem, such as an integer polynomial equation, passing a selection of remainder checks may provide only necessary conditions. For example, $x^2=17$ is compatible modulo $8$, but no integer square lies strictly between $4^2=16$ and $5^2=25$.

Related: [modular cancellation](#23-congruence-cancellation-and-decimal-periods); [integer equations](#25-integer-equations-and-rational-points); [necessary and sufficient conditions](#13-methods-proof-and-cross-topic-connections).

### 2.5 Integer Equations and Rational Points

A `Diophantine equation` asks for integer solutions. Its coefficients may be small and its shape familiar, while the integrality requirement changes the available methods.

For positive integers $a,b$ and an integer $c$, the linear equation

$$
ax+by=c
$$

has integer solutions exactly when $d=\gcd(a,b)$ divides $c$. Every left-hand side is divisible by $d$, proving necessity; scaling a Bézout identity proves sufficiency. Given one solution $(x_0,y_0)$, all solutions are

$$
x=x_0+\frac bd\,t,
\qquad
y=y_0-\frac ad\,t,
\qquad t\in\mathbb Z.
$$

To see completeness, subtract two solutions. The resulting equation $(a/d)(x-x_0)=-(b/d)(y-y_0)$ has coprime coefficients, so $b/d$ divides $x-x_0$ and $a/d$ divides $y-y_0$.

**Worked example 2.5A — Coins and the additional nonnegativity condition.**

How can a total of $30$ be made using coins worth $6$ and $9$? We seek $6x+9y=30$ with $x,y\ge0$. One integer solution is $(5,0)$, and the full family is

$$
x=5+3t,\qquad y=-2t.
$$

Nonnegativity requires $-5/3\le t\le0$, so the integer choices are $t=-1,0$. The two possibilities are $(x,y)=(2,2)$ and $(5,0)$.

**First find every integer solution, then impose the inequalities required by the application.** The gcd criterion alone does not promise a solution with nonnegative coordinates: $6x+9y=3$ has integer solutions, but cannot be formed from nonnegative numbers of these coins.

For nonlinear equations, congruences can expose an obstruction before any search. An integer square is $0$ or $1$ modulo $4$, so $x^2+y^2=3$ has no integer solution. *An obstruction proves impossibility; failure to find one does not prove existence.*

A different method produces solutions by geometry. The equation $a^2+b^2=c^2$ with $c>0$ is equivalent to a rational point

$$
X=\frac ac,\qquad Y=\frac bc,
\qquad X^2+Y^2=1
$$

on the unit circle. This reformulates an integer equation as a question about rational coordinates.

**Worked example 2.5B — Generate Pythagorean triples from a line.**

Start with the known rational point $S=(-1,0)$ and draw the line $Y=t(X+1)$. Substituting into the circle equation gives

$$
(X+1)\bigl((1+t^2)X+t^2-1\bigr)=0.
$$

One intersection is $S$. The other is

$$
X=\frac{1-t^2}{1+t^2},
\qquad
Y=\frac{2t}{1+t^2}.
$$

A rational slope $t$ gives rational coordinates. Conversely, every rational point on the circle other than $S$ has the rational slope $t=Y/(X+1)$, so the construction finds all such points.

![A line of slope one half passes through minus one, zero and meets the unit circle again at three fifths, four fifths; the radius and coordinate projections form a three-four-five triangle after scaling.]({{site.img}}/mathematics/elementary-mathematics-reference/pythagorean-triples-circle-diagram.svg)

Putting $t=n/m$ with integers $m>n>0$ and clearing denominators gives

$$
a=m^2-n^2,\qquad b=2mn,\qquad c=m^2+n^2.
$$

For $m=2,n=1$, the point is $(3/5,4/5)$ and the triple is $(3,4,5)$.

A triple is `primitive` when its three entries have gcd $1$. Every primitive positive triple, after interchanging the legs if necessary, comes from coprime $m,n$ of opposite parity. Here is why the qualifications matter. For coprime $m,n$, any common prime factor of $m^2-n^2$, $2mn$, and $m^2+n^2$ would have to be $2$; opposite parity excludes that factor. If $m,n$ are both odd, all three expressions are even.

For completeness, choose the odd leg as $a$ in a primitive triple; the other leg $b$ is even and $c$ is odd. The coprime positive integers $(c+a)/2$ and $(c-a)/2$ have product $(b/2)^2$. Unique factorization makes each a square, say $m^2,n^2$, giving exactly the displayed formulas and the parity condition. Every nonprimitive positive triple is an integer multiple of a primitive one.

**A known rational point lets us parameterize the circle by rational slopes.** This connects elementary number theory with coordinate geometry and the study of rational points on curves. *The success depends on the curve:* the same line method does not automatically parameterize every polynomial equation.

Related: [Bézout's identity](#22-euclid-and-bezout); [coordinates and conics](#7-geometry-coordinates-and-linear-structure); [the unit circle](#6-trigonometry-and-the-complex-plane).

### 2.6 Rational Approximation by Continued Fractions

A decimal approximation controls powers of ten in the denominator. What if we want a useful fraction with a small denominator of any kind?

A `simple continued fraction` has the form

$$
\alpha=[a_0;a_1,a_2,\ldots]
=a_0+\cfrac1{a_1+\cfrac1{a_2+\cdots}},
$$

where $a_0$ is an integer and $a_j$ is a positive integer for $j\ge1$. For $\alpha>0$, repeatedly take the integer part, subtract it, and invert the nonzero remainder. A rational number gives a finite process—the Euclidean algorithm applied to numerator and denominator. An irrational number never reaches a zero remainder.

Stopping after $a_n$ gives the `convergent` $p_n/q_n$. Rather than repeatedly simplify nested fractions, use

$$
\begin{aligned}
p_n&=a_np_{n-1}+p_{n-2},\\
q_n&=a_nq_{n-1}+q_{n-2},
\end{aligned}
$$

starting from

$$
p_{-2}=0,\quad p_{-1}=1,\qquad
q_{-2}=1,\quad q_{-1}=0.
$$

For a finite expansion, the convention that the last partial quotient is at least $2$ removes the duplication caused by replacing a final $a_n>1$ by $a_n-1,1$; integer expansions are written simply as $\lbrack a_0\rbrack$.

**Worked example 2.6 — Construct fractions approaching $\sqrt2$.**

Since

$$
\frac1{\sqrt2-1}=\sqrt2+1=2+(\sqrt2-1),
$$

the same remainder returns after each inversion. Therefore,

$$
\sqrt2=[1;\overline2]=[1;2,2,2,\ldots].
$$

The recurrence gives:

| $n$ | $p_n/q_n$ | Position relative to $\sqrt2$ |
| --- | --- | --- |
| $0$ | $1/1$ | Below |
| $1$ | $3/2$ | Above |
| $2$ | $7/5$ | Below |
| $3$ | $17/12$ | Above |
| $4$ | $41/29$ | Below |

These comparisons can be checked by squaring positive numbers: the values $p_n^2-2q_n^2$ alternate between $-1$ and $1$. The repetition in the continued fraction comes from an exact algebraic identity, rather than from an observed run of decimal digits.

Why are the approximations good? The recurrence gives the determinant identity

$$
p_nq_{n-1}-p_{n-1}q_n=(-1)^{n-1}
\qquad(n\ge1).
$$

It proves that each convergent is reduced and that successive convergents differ by

$$
\left|\frac{p_{n+1}}{q_{n+1}}-\frac{p_n}{q_n}\right|
=\frac1{q_nq_{n+1}}.
$$

For an irrational $\alpha$, write the untruncated tail as $t=\lbrack a_{n+1};a_{n+2},\ldots\rbrack$, so $t>a_{n+1}$. Substitution into the finite expression gives

$
\alpha=\frac{p_nt+p_{n-1}}{q_nt+q_{n-1}}.
$

Subtracting $p_n/q_n$ and using the determinant identity shows that the error alternates in sign and has magnitude $1/\bigl(q_n(q_nt+q_{n-1})\bigr)$. Since $q_nt+q_{n-1}>q_{n+1}$,

$$
\left|\alpha-\frac{p_n}{q_n}\right|
<\frac1{q_nq_{n+1}}
\le\frac1{q_n^2}.
$$

The last inequality uses the nondecreasing denominators for a simple continued fraction. **The construction delivers both approximations and a bound on their error.**

There is also a geometric interpretation. Regard $(q,p)$ as an integer lattice point near the line $y=\alpha x$. Its vertical discrepancy is $|p-\alpha q|$, whereas the error in its slope is

$$
\left|\frac pq-\alpha\right|=\frac{|p-\alpha q|}{q}.
$$

Convergents organize particularly efficient approaches to this line. *The word “best” requires a specified error measure and denominator restriction; the two errors just displayed are different quantities.* We use the explicit bound above without treating an informal claim of optimality as a substitute for it.

A computed finite decimal presents a further limitation: its continued fraction is the expansion of that rational input. It may agree initially with the expansion of an intended irrational value, but identifying a long tail requires sufficiently accurate input and error control.

Related: [Euclidean division](#22-euclid-and-bezout); [exact and approximate values](#16-exact-values-and-measured-quantities); [recurrences](#9-sequences-finite-sums-and-counting); [limits](#10-limits-continuity-and-infinity).

### 2.7 Classical Problems and Extensions

The first six problems connect the chapter's methods; Problem 2.G is an optional structural extension. Solution notes follow the complete problem list.

**Problem 2.A — Arbitrarily long gaps between primes.** Given any positive integer $r$, construct $r$ consecutive integers that are all composite. Explain why this does not conflict with the infinitude of primes.

**Problem 2.B — Euclid and Fibonacci numbers.** Let $F_0=0$, $F_1=1$, and $F_{n+1}=F_n+F_{n-1}$ for $n\ge1$. Prove that $\gcd(F_{n+1},F_n)=1$ for every $n\ge1$. What pattern appears when the Euclidean algorithm is applied to consecutive Fibonacci numbers?

**Problem 2.C — A false converse of Fermat's little theorem.** Show that $341$ is composite but $2^{340}\equiv1\pmod{341}$. What does this say about using one modular-power test as a proof of primality?

**Problem 2.D — Shared factors in remainder conditions.** Find all integers satisfying

$$
x\equiv2\pmod6,\qquad
x\equiv5\pmod9,\qquad
x\equiv0\pmod4.
$$

Could an odd integer satisfy the first two conditions?

**Problem 2.E — From approximation to Pell's equation.** Generate three positive integer solutions of $p^2-2q^2=1$, and prove that your method produces infinitely many. Explain how each solution supplies a rational approximation to $\sqrt2$ with an explicit error.

**Problem 2.F — Which right triangles have hypotenuse $65$?** Find every primitive Pythagorean triple with hypotenuse $65$, counting an interchange of the legs as the same triangle. Explain why $(25,60,65)$ does not belong to the answer.

**Problem 2.G — When unique factorization fails.** Work in the ring

$$
R=\mathbb Z[\omega]
=\{a+b\omega:a,b\in\mathbb Z\},
\qquad \omega=i\sqrt5,\quad\omega^2=-5.
$$

Verify

$$
6=2\cdot3=(1+\omega)(1-\omega).
$$

Using $N(a+b\omega)=a^2+5b^2$, show that these are genuinely different factorizations into irreducible elements. An element is `irreducible` if it is nonzero, not invertible, and cannot be factored into two noninvertible elements. Does $2$ retain the property that dividing a product forces it to divide a factor?

**Solution notes and connections**

**2.A.** Let $M=(r+1)!$, the product of the integers from $1$ through $r+1$. For each $j=2,\ldots,r+1$, the number $M+j$ is divisible by $j$ and greater than $j$. Thus $M+2,\ldots,M+(r+1)$ are $r$ consecutive composites. **Construct divisibility into the numbers before testing them.** Infinitely many primes need not be separated by a bounded gap.

**2.B.** The Euclidean invariant gives

$$
\gcd(F_{n+1},F_n)
=\gcd(F_n,F_{n-1})
=\cdots=\gcd(F_2,F_1)=1.
$$

For $n=1$ this is immediate. For larger indices, successive divisions mostly have quotient $1$, following the recurrence backwards, with a final division $2=2\cdot1$. The remainders shrink through consecutive Fibonacci numbers. This explains a family where the algorithm takes many steps relative to the size of its inputs; the recurrence also links the ratios to continued fractions with strings of ones.

**2.C.** Since $341=11\cdot31$, it is composite. But $2^{10}=1024=3\cdot341+1$, so

$$
2^{340}=(2^{10})^{34}\equiv1\pmod{341}.
$$

A composite integer coprime to a base that passes this Fermat test is called a `Fermat pseudoprime to that base`. *A necessary congruence for primality is not a sufficient one.* The example does not contradict Fermat's theorem; it contradicts its proposed converse.

**2.D.** Set $x=2+6t$. Modulo $9$, this gives $6t\equiv3$, or $2t\equiv1\pmod3$, hence $t\equiv2\pmod3$. The first two conditions therefore give $x=14+18u$. The last requires $2+2u\equiv0\pmod4$, so $u$ is odd. All solutions are

$$
x=32+36v,\qquad v\in\mathbb Z.
$$

No odd integer can satisfy even the first condition. **Track the surviving solution class and its modulus after each restriction.**

**2.E.** Begin with $(p,q)=(1,0)$ and repeat

$$
p'=3p+4q,\qquad q'=2p+3q.
$$

A direct expansion shows $p'^2-2q'^2=p^2-2q^2$. The first three positive solutions are

$$
(3,2),\qquad(17,12),\qquad(99,70).
$$

After the initial step, both coordinates are positive and strictly increase, so infinitely many distinct solutions result. Equivalently, multiply $p+q\sqrt2$ repeatedly by $3+2\sqrt2$; its product with its conjugate remains $1$. This connects the construction to multiplication in a quadratic number system.

For every positive solution,

$$
0<\frac pq-\sqrt2
=\frac{1}{q^2(p/q+\sqrt2)}
<\frac1{2\sqrt2\,q^2}.
$$

The displayed fractions are also every other convergent in the sequence begun in Section 2.6. The construction proves infinitude without claiming here that every positive solution has been classified.

**2.F.** A primitive triple requires $m^2+n^2=65$, with $m>n>0$, $\gcd(m,n)=1$, and opposite parity. Since $\sqrt{65/2}<m<\sqrt{65}$, only $m=6,7,8$ need checking. They give, respectively, $n^2=29,16,1$. Thus $(m,n)=(7,4)$ or $(8,1)$, and the triples are

$$
(33,56,65),\qquad(16,63,65).
$$

The triple $(25,60,65)=5(5,12,13)$ is not primitive. **A parameterization turns an unbounded search over two legs into a short, complete search over parameters.**

**2.G.** Conjugation replaces $\omega$ by $-\omega$, so $N(z)=z\overline z$ and $N(uv)=N(u)N(v)$. The only elements of norm $1$ are $\pm1$, which are exactly the units. There is no element of norm $2$ or $3$: if $b\ne0$, then $a^2+5b^2\ge5$; if $b=0$, neither $2$ nor $3$ is an integer square.

The norms of $2,3,1+\omega,1-\omega$ are $4,9,6,6$. A nontrivial factorization of $2$ would require factors of norm $2,2$; for $3$, norms $3,3$; and for either $1\pm\omega$, norms $2,3$. All are impossible. Thus all four elements are irreducible, and the two decompositions of $6$ are not related by reordering or multiplication by the units $\pm1$.

Moreover, $2$ divides $(1+\omega)(1-\omega)=6$ but divides neither factor: division by $2$ would leave nonintegral coefficients. **Irreducibility and the prime-divisor property coincide in $\mathbb Z$, but can separate in a larger ring.** This is the precise point where the ordinary proof of unique factorization stops working.

## 3. Algebraic Expressions, Polynomials, and Equations

Algebra gives us freedom to change the form of a problem. That freedom raises a question: what does a transformation preserve? An expansion may preserve a value, a cancellation may preserve values only on a restricted domain, and an equation-solving step may preserve merely an implication.

This chapter follows algebra from rewriting expressions to locating roots. **Keep three things visible throughout: the number system, the admissible inputs, and the direction of each logical implication.** Worked examples develop the methods; the [chapter-end problems](#37-classical-problems-and-extensions) extend them.

### 3.1 Expressions, Identities, and Equations

An `expression` specifies a calculation. Its `domain` consists of the inputs for which that calculation is defined. Over the reals, $1/x$ excludes $0$, and $\sqrt{x}$ requires $x\ge0$. Changing the ambient number system can change these restrictions.

A `polynomial` in $x$ over a field $F$ is a finite sum

$$
P(x)=a_nx^n+\cdots+a_1x+a_0,
\qquad a_j\in F,
$$

with nonnegative integer exponents. If $a_n\ne0$, its degree is $n$. A nonzero constant has degree $0$; the zero polynomial has no ordinary finite degree. Negative or fractional powers of $x$ do not belong to a polynomial in $x$, although a fractional coefficient such as $1/2$ is allowed over $\mathbb Q$.

An `identity` holds for every admissible input. An `equation` asks which inputs make its two sides equal. Thus $(x+1)^2=x^2+2x+1$ is an identity, whereas $(x+1)^2=9$ is a condition whose real solutions are $2$ and $-4$.

Some useful identities are:

| Pattern | Identity |
| --- | --- |
| Square of a sum or difference | $(a\pm b)^2=a^2\pm2ab+b^2$ |
| Difference of squares | $a^2-b^2=(a-b)(a+b)$ |
| Sum of cubes | $a^3+b^3=(a+b)(a^2-ab+b^2)$ |
| Difference of cubes | $a^3-b^3=(a-b)(a^2+ab+b^2)$ |
| Square of three terms | $(a+b+c)^2=a^2+b^2+c^2+2ab+2ac+2bc$ |

Expansion and factorization are opposite uses of these identities. **Choose the form that exposes the quantity or condition needed by the problem.** Expanding everything immediately can hide a useful factor or symmetry.

**Worked example 3.1 — Use a sum and a product without finding the numbers.**

Suppose $x+y=10$ and $xy=21$. Find $x^2+y^2$ and $x^3+y^3$. The identities

$$
x^2+y^2=(x+y)^2-2xy,
$$

$$
x^3+y^3=(x+y)^3-3xy(x+y)
$$

give $100-42=58$ and $1000-630=370$. Solving separately for $x$ and $y$ would be possible, but the requested expressions already depend only on the given sum and product.

The method is **to rewrite a symmetric expression in terms of simpler symmetric quantities**. Interchanging $x$ and $y$ leaves both the data and the answers unchanged. This is the beginning of the connection between coefficients, roots, and symmetry developed in Section 3.5.

A change of form must also retain domain information. The identity

$$
\frac{x^2-1}{x-1}=x+1
$$

holds for $x\ne1$. The polynomial on the right is defined at $1$, but the original fraction is not. *Simplification does not restore an excluded input.* When the expressions are used as functions, the original domain must remain attached to the simplified formula.

Over $\mathbb Q$, $\mathbb R$, or $\mathbb C$, two polynomials are identical exactly when their corresponding coefficients agree. Testing a few inputs is not generally enough: $x^2=x$ holds at $0$ and $1$ but fails at $2$. A degree bound makes a finite test meaningful, as the factor theorem will show. Over a finite field, distinct polynomials can even give the same value at every available input; Problem 3.A explains why the distinction between a polynomial and its associated function matters.

Related: [laws of operations](#12-laws-of-operations); [functions and domains](#4-functions-graphs-and-transformations); [roots and coefficients](#35-roots-multiplicity-and-coefficients).

### 3.2 Factorization and Polynomial Division

What does a factorization tell us about an equation? Over $\mathbb Q$, $\mathbb R$, or $\mathbb C$, a product is zero exactly when at least one factor is zero. Thus factoring a polynomial replaces one equation by a collection of simpler equations.

The `coefficient field` determines what counts as a factorization:

$$
\begin{aligned}
x^2-2&=(x-\sqrt2)(x+\sqrt2)&&\text{over }\mathbb R,\\
x^2+1&=(x-i)(x+i)&&\text{over }\mathbb C.
\end{aligned}
$$

The first polynomial has no linear factor over $\mathbb Q$; the second has none over $\mathbb R$. An `irreducible polynomial` over a field is a nonconstant polynomial that cannot be written as a product of two polynomials of positive degree over that field. *“Cannot be factored” is incomplete unless the permitted coefficients are specified.*

Polynomial division supplies a systematic method. For polynomials $P,D$ over a field, with $D\ne0$, there are unique polynomials $Q,R$ such that

$$
P=DQ+R,
\qquad R=0\ \text{or}\ \deg R<\deg D.
$$

Cancel the leading term, subtract, and repeat; the degree of the remainder decreases at each step. **The decreasing degree plays the role of the decreasing remainder in the integer Euclidean algorithm.** Over $\mathbb Z$, division need not leave integer coefficients: dividing $x$ by $2x+1$ gives quotient $1/2$ and remainder $-1/2$.

When $D(x)=x-a$, the remainder is constant. Substituting $x=a$ gives the `remainder theorem` and `factor theorem`:

$$
P(x)=(x-a)Q(x)+P(a),
\qquad
P(a)=0\Longleftrightarrow(x-a)\mid P(x).
$$

Repeated division proves that a nonzero polynomial of degree $n$ has at most $n$ distinct roots in a field. Consequently, two polynomials of degree at most $n$ that agree at $n+1$ distinct points are identical: their difference would otherwise have too many roots.

**Worked example 3.2 — Reduce a cubic by finding one rational root.**

Factor

$$
P(x)=2x^3-3x^2-8x+12.
$$

The `rational root theorem` says that a reduced rational root $u/v$, with $v>0$, must have $u$ dividing the constant coefficient and $v$ dividing the leading coefficient. Here $u\mid12$ and $v\mid2$, giving a finite list of candidates. Testing $x=2$ gives zero, and division yields

$$
P(x)=(x-2)(2x^2+x-6)
=(x-2)(2x-3)(x+2).
$$

Thus the roots are $2,3/2,-2$. The factorization proves that the list is complete.

Why does the rational-root restriction hold? For an integer-coefficient polynomial with nonzero constant term, multiply $P(u/v)=0$ by $v^n$. Coprimality of $u,v$ forces $u\mid a_0$ and $v\mid a_n$. If the constant term is zero, first remove a factor of $x$. **Use divisibility to restrict candidates, then verify and divide.** *Failure to find a rational root does not exclude irrational or nonreal roots.*

The polynomial Euclidean algorithm goes further: repeated division computes a gcd of two polynomials, chosen monic to remove the ambiguity of a nonzero constant factor. In Section 3.5, the gcd of a polynomial and its derivative will detect repeated roots. This is another instance of the same division structure first encountered among integers.

Related: [Euclid and Bézout](#22-euclid-and-bezout); [reversible transformations](#33-reversible-transformations); [multiplicity](#35-roots-multiplicity-and-coefficients).

### 3.3 Reversible Transformations

When does a new equation have exactly the same solutions as the old one? A step is `equivalent` only when both directions of implication hold on the stated domain.

Adding the same defined expression to both sides is reversible. Multiplication by a known nonzero expression is reversible, but multiplication by an expression that can vanish may add solutions. Division by such an expression may lose solutions. Squaring preserves equality, yet equality of squares also permits opposite signs.

For real expressions, the useful square-root rule is

$$
\sqrt{A(x)}=B(x)
\quad\Longleftrightarrow\quad
A(x)=B(x)^2\ \text{and}\ B(x)\ge0,
$$

where $A,B$ themselves must be defined. The conditions on the right automatically make the radicand nonnegative. **Carry the range restriction of the square root along with the squared equation.**

**Worked example 3.3A — A radical equation with an extraneous candidate.**

Solve $\sqrt{x+2}=x$ over $\mathbb R$. The radicand requires $x\ge-2$, and the nonnegative square root further requires $x\ge0$. Squaring gives

$$
x+2=x^2,
\qquad
(x-2)(x+1)=0.
$$

The candidates are $2$ and $-1$. Only $2$ meets the sign condition and the original equation. At $-1$, the two sides of the original equation are $1$ and $-1$.

*Squaring erased a sign distinction.* Recording $x\ge0$ makes the squared equation equivalent to the original one; otherwise, final substitution must remove the extraneous candidate.

For a rational equation, first exclude every zero of an original denominator. Clearing denominators is then reversible on that domain. This ordering prevents roots of the cleared polynomial from being mistaken for admissible solutions.

Systems of equations need the same care. Interchanging equations, adding a multiple of one equation to another, and multiplying an equation by a nonzero constant preserve the common solution set. They are the elementary operations behind elimination.

**Worked example 3.3B — A parameter that changes the number of solutions.**

Solve, for real parameters $a,b$,

$$
x+y=2,\qquad x+ay=b.
$$

Subtract the first equation from the second:

$$
(a-1)y=b-2.
$$

If $a\ne1$, division gives the unique solution

$$
y=\frac{b-2}{a-1},
\qquad
x=\frac{2a-b}{a-1}.
$$

If $a=1$ and $b=2$, the equations coincide and every pair $(x,2-x)$ is a solution. If $a=1$ and $b\ne2$, the equations are inconsistent. **Separate the exceptional parameter value before dividing.** Geometrically, the two lines intersect, coincide, or are parallel and distinct; the determinant $a-1$ records the loss of an independent equation.

A `substitution` introduces another possible restriction. Setting $t=x^2$ for real $x$ requires $t\ge0$, and each positive $t$ corresponds to two values of $x$. Setting $t=x+1/x$ requires $x\ne0$ and, for real $x$, $t\le-2$ or $t\ge2$. These bounds follow from $(x-1)^2\ge0$ for positive $x$ and the corresponding statement for $-x$ when $x<0$.

**Solve in the new variable, restrict it to the image of the substitution, and recover all original inputs.** An algebraic reduction is complete only when this return step is complete.

Related: [division and cancellation](#12-laws-of-operations); [functions, images, and inverses](#4-functions-graphs-and-transformations); [linear systems](#7-geometry-coordinates-and-linear-structure).

### 3.4 Quadratic Equations and Parameters

Why does a square root appear in the quadratic formula? Consider

$$
ax^2+bx+c=0.
$$

First check the degree: if $a=0$, the equation is linear, constant, or identically zero, according to $b,c$. For $a\ne0$, completing the square gives

$$
\left(x+\frac{b}{2a}\right)^2
=\frac{b^2-4ac}{4a^2}.
$$

Writing the `discriminant` as $\Delta=b^2-4ac$ yields

$$
x=\frac{-b\pm\sqrt{\Delta}}{2a}.
$$

For real coefficients, $\Delta>0$ gives two distinct real roots, $\Delta=0$ a repeated real root, and $\Delta<0$ no real roots but two conjugate complex roots. The graph has vertex

$$
\left(-\frac{b}{2a},-\frac{\Delta}{4a}\right).
$$

**Completing the square locates the centre of the two roots and isolates the quantity that controls their separation.** It also explains the formula, rather than leaving the discriminant as an unexplained test.

**Worked example 3.4 — Follow the roots as a parameter changes.**

Classify the roots of $x^2-2x+\lambda=0$ for real $\lambda$. The equivalent equation is

$$
(x-1)^2=1-\lambda.
$$

Thus:

| Parameter | Roots and their interpretation |
| --- | --- |
| $\lambda<1$ | $1\pm\sqrt{1-\lambda}$: two distinct real roots |
| $\lambda=1$ | $1$: one distinct root, with multiplicity two |
| $\lambda>1$ | $1\pm i\sqrt{\lambda-1}$: two nonreal conjugate roots |

Geometrically, intersect the fixed parabola $y=(x-1)^2$ with the horizontal line $y=1-\lambda$. The intersections merge at the vertex when $\lambda=1$.

![Three panels intersect the parabola y equals x minus one squared with horizontal levels one, zero, and minus one. They show two real solutions, a double solution, and no real solutions.]({{site.img}}/mathematics/elementary-mathematics-reference/quadratic-parameter-roots-diagram.svg)

**Study an equation as a family: the critical parameter value separates qualitatively different kinds of solutions.** In this family the discriminant is $4(1-\lambda)$, so its zero is exactly the root-collision boundary.

Near that boundary, a small coefficient change can move the roots by a larger scale. Replacing $\lambda=1$ by $1-\varepsilon$, where $\varepsilon>0$, moves the double root to $1\pm\sqrt{\varepsilon}$. This square-root response anticipates the sensitivity of repeated roots.

The qualification that the leading coefficient remains nonzero matters. *Roots can also disappear from a finite description when the degree drops.* Problem 3.C shows a parameter family whose discriminant never vanishes, yet one root becomes unbounded as the quadratic term disappears.

Sometimes a question concerns the signs of the roots, not their explicit values. If two real roots $r,s$ exist, then $r+s=-b/a$ and $rs=c/a$. Both are strictly positive exactly when their sum and product are positive; the separate condition $\Delta\ge0$ establishes reality. **Combine the discriminant with sum-and-product information instead of imposing sign tests on two complicated radical formulas.**

Related: [order and sign](#15-order-and-distance); [roots and coefficients](#35-roots-multiplicity-and-coefficients); [graphs and parameters](#4-functions-graphs-and-transformations).

### 3.5 Roots, Multiplicity, and Coefficients

What does it mean to say that a degree-$n$ polynomial has $n$ roots? The `fundamental theorem of algebra` states that every nonconstant complex polynomial factors completely:

$$
P(x)=a_n\prod_{j=1}^n(x-r_j).
$$

The roots are counted with `multiplicity`, so they need not be distinct. A root $r$ has multiplicity $m$ when

$$
P(x)=(x-r)^mQ(x),
\qquad Q(r)\ne0.
$$

For a real polynomial, the sign near a real root changes if $m$ is odd and stays the same if $m$ is even. The factor $Q(x)$ keeps a fixed sign sufficiently near $r$, while $(x-r)^m$ determines whether crossing $r$ reverses the sign. *A graph that only touches the axis still represents a root.*

The coefficients encode the roots symmetrically. Expanding the product gives `Vieta's formulas`:

$$
\sum_{j=1}^n r_j=-\frac{a_{n-1}}{a_n},
\qquad
\prod_{j=1}^n r_j=(-1)^n\frac{a_0}{a_n},
$$

and, for $n\ge2$,

$$
\sum_{i<j}r_ir_j=\frac{a_{n-2}}{a_n}.
$$

For real coefficients, $P(\overline z)=\overline{P(z)}$, so each nonreal root occurs with its conjugate and with the same multiplicity. Pairing conjugates shows that real polynomials factor into real linear factors and irreducible real quadratic factors.

Repeated roots can be detected without first solving for every root. Define the `formal derivative` by

$$
P^{\prime}(x)=na_nx^{n-1}+\cdots+2a_2x+a_1.
$$

The ordinary product rule follows directly from polynomial multiplication. Applying it to $(x-r)^mQ(x)$ shows that, over $\mathbb Q,\mathbb R$, or $\mathbb C$,

$$
r\text{ is repeated}
\quad\Longleftrightarrow\quad
P(r)=P^{\prime}(r)=0.
$$

Equivalently, $P$ has a repeated complex root exactly when $\gcd(P,P^{\prime})$ has positive degree. This algebraic use of the derivative does not require a limiting argument; Chapter 11 explains its meaning as a rate of change.

**Worked example 3.5 — Find the parameter values where cubic roots merge.**

For $P_k(x)=x^3-3x+k$, a repeated root must satisfy

$$
P_k^{\prime}(x)=3x^2-3=0,
$$

so it must be $1$ or $-1$. Substitution into the original polynomial gives $k=2$ or $k=-2$, respectively. Indeed,

$$
P_2(x)=(x-1)^2(x+2),
\qquad
P_{-2}(x)=(x+1)^2(x-2).
$$

**Solve the shared-root conditions to locate the exceptional parameters, rather than solving the whole family first.** Eliminating the common root between a polynomial and its derivative is the principle behind discriminants in higher degrees.

Root symmetry supplies another advanced connection. The coefficients do not label the roots: exchanging them leaves every elementary symmetric combination unchanged. For a quadratic, the sum and product determine the unordered pair, while

$$
(r-s)^2=(r+s)^2-4rs
$$

determines the squared separation. Choosing a square root distinguishes the two orders.

`Galois theory` asks which permutations of roots preserve all their algebraic relations over the coefficient field. *Preserving the coefficients alone is not the full condition.* Studying these symmetries explains which equations can be solved through successive radical extensions. Here the elementary starting point is concrete: the coefficients give symmetric information, while a formula for an individual root must resolve the remaining ambiguity.

Related: [polynomial division](#32-factorization-and-polynomial-division); [complex conjugation](#6-trigonometry-and-the-complex-plane); [calculus](#11-calculus-differential-equations-and-approximation).

### 3.6 Exact Formulas and Numerical Root Finding

What counts as solving an equation? Several achievements should be distinguished: proving that a root exists, determining how many roots there are, representing them exactly, and computing approximations with controlled error.

The quadratic formula settles all four questions with comparatively little machinery. Cubic and quartic equations also admit general radical formulas. The `Abel–Ruffini theorem` states that no formula built from finitely many arithmetic operations and radicals solves the general quintic in terms of its coefficients. This deeper theorem is stated here without proof. *It does not rule out radical solutions of particular quintics*, such as the real solution $2^{1/5}$ of $x^5=2$.

**A limitation on radical formulas restricts the permitted representation of an answer.** Root existence, exact descriptions by other means, and numerical approximation remain separate questions. An interval containing exactly one real root of a specified polynomial can itself provide an exact description of that number.

A reliable numerical starting point is `bisection`. If a continuous real function has opposite signs at $a$ and $b$, it has a root between them. Evaluate the midpoint and retain a half-interval whose endpoint signs are opposite; if the midpoint is a root, stop. After $N$ halvings, the interval width is $(b-a)/2^N$, and its midpoint is within $(b-a)/2^{N+1}$ of a root in that interval. The existence argument uses continuity and completeness, developed in Chapter 10.

**Worked example 3.6A — Locate a cubic root with a certified bound.**

For $P(x)=x^3-x-1$, $P(1)=-1$ and $P(2)=5$. There is exactly one root in this interval: for $1\le u<v\le2$,

$$
P(v)-P(u)=(v-u)(v^2+uv+u^2-1)>0.
$$

The first midpoints are $1.5$, $1.25$, and $1.375$, with signs positive, negative, and positive. After ten halvings the bracket is

$$
\frac{1356}{1024}<r<\frac{1357}{1024}.
$$

Its midpoint is $2713/2048=1.32470703125$, and

$$
\left|r-\frac{2713}{2048}\right|
\le\frac1{2048}<0.000489.
$$

**The retained interval supplies the accuracy claim; the number of printed digits does not.** Polynomials are continuous, but a sign-changing bracket is only one way to find a root: an even-multiplicity root need not produce a sign change.

A faster local method is `Newton's iteration`,

$$
x_{n+1}=x_n-\frac{P(x_n)}{P^{\prime}(x_n)},
\qquad P^{\prime}(x_n)\ne0.
$$

It replaces the graph locally by its tangent and takes that line's zero as the next estimate. The calculus justification comes later. *An arbitrary starting point does not guarantee convergence.* For $P(x)=x^3-2x+2$, starting at $0$ gives $1$, and the next step returns to $0$, creating a cycle. A useful approximation method therefore needs a convergence argument, a retained bound, or another check beyond repeated iteration.

Even an exact formula can be numerically awkward.

**Worked example 3.6B — Compute the small quadratic root without cancellation.**

Consider $x^2-Bx+1=0$ with $B>2$, especially $B=10^8$. The smaller root is

$$
x_{\mathrm{small}}=\frac{B-\sqrt{B^2-4}}2.
$$

The numerator subtracts nearly equal quantities. *In finite-precision arithmetic, the error already present in those quantities can overwhelm their small difference.* Rationalizing gives the equivalent expression

$$
x_{\mathrm{small}}
=\frac{2}{B+\sqrt{B^2-4}}.
$$

Compute the larger root from $(B+\sqrt{B^2-4})/2$, then use Vieta's product $x_{\mathrm{small}}x_{\mathrm{large}}=1$ if convenient. For $B=10^8$, the smaller root is approximately $10^{-8}$.

**Choose an equivalent expression that avoids subtracting nearly equal intermediate values.** This concerns the stability of the computation. A different issue is `conditioning`: how much the exact roots themselves change when the coefficients change. The splitting of a repeated root in Section 3.4 is a conditioning problem even if every arithmetic operation is performed exactly.

Polynomial evaluation also benefits from choosing a useful form. `Horner's rule` writes

$$
P(x)=\bigl(\cdots((a_nx+a_{n-1})x+a_{n-2})x+\cdots\bigr)x+a_0,
$$

using $n$ multiplications and $n$ additions for a degree-$n$ polynomial. The same recurrence underlies synthetic division. It reduces the work of evaluation, although cancellation in the polynomial's value can still demand care.

Finally, a small `residual` $|P(\widetilde r)|$ is not by itself a bound on the root error $|\widetilde r-r|$. A nearly flat polynomial can have a small value at a noticeably displaced point. Problem 3.G makes this distinction explicit.

Related: [measurement and error](#16-exact-values-and-measured-quantities); [continuity and existence](#10-limits-continuity-and-infinity); [Newton's method and numerical analysis](#11-calculus-differential-equations-and-approximation).

### 3.7 Classical Problems and Extensions

Try the complete problem list before consulting the solution notes. The problems emphasize methods that recur across algebra: degree bounds, structured factorization, exceptional cases, substitutions, symmetry, and error control.

**Problem 3.A — How many samples determine a polynomial?** Find the polynomial of degree at most $2$ satisfying $P(0)=1$, $P(1)=3$, and $P(2)=7$, and prove it is unique. Why would the same three values fail to determine a polynomial without a degree bound? As an extension, compare the polynomials $x^2-x$ and $0$ as functions on the field with two elements.

**Problem 3.B — Sophie Germain's identity.** Factor $x^4+4y^4$ over the integers. Use the factorization to show that $n^4+4$ is composite for every integer $n>1$.

**Problem 3.C — A root escapes when the degree drops.** Solve, for every real parameter $t$,

$$
(t-1)x^2-2tx+t+1=0.
$$

Explain why the quadratic discriminant does not vanish, yet the number of distinct real solutions changes at $t=1$.

**Problem 3.D — A reciprocal substitution and its restrictions.** Find all real solutions of

$$
x^4-3x^3+4x^2-3x+1=0
$$

by using $u=x+1/x$. Then factor the polynomial completely over $\mathbb C$ and identify the multiplicities.

**Problem 3.E — Complex intermediate quantities, real cubic roots.** Solve $x^3-15x-4=0$. Investigate the substitution $x=u+v$ with $uv=5$: why do the quantities $2+11i$ and $2-11i$ appear, even though all three roots of the cubic are real?

**Problem 3.F — High powers without solving for the roots.** Let $r,s$ be the roots of $x^2-3x+1=0$. Compute $r^5+s^5$ without evaluating either radical, and explain why $r^n+s^n$ is an integer for every nonnegative integer $n$.

**Problem 3.G — Does a small residual certify an accurate root?** For $P(x)=(x-1)^2$, compare the residual at $\widetilde r=1.001$ with the error relative to the root $r=1$. Compare the result with the linear polynomial $Q(x)=x-1$. Finally, describe the real roots of $P_\delta(x)=(x-1)^2-\delta$ for positive, zero, and negative $\delta$.

**Solution notes and connections**

**3.A.** Write $P(x)=ax^2+bx+c$. The data give $c=1$, $a+b=2$, and $4a+2b=6$, hence

$$
P(x)=x^2+x+1.
$$

If two degree-at-most-two polynomials fitted the data, their difference would have three distinct roots and therefore be zero. Without the degree restriction, every polynomial

$$
x^2+x+1+x(x-1)(x-2)R(x)
$$

has the same three values, for arbitrary polynomial $R$.

Over $\mathbb F_2=\mathbb Z/2\mathbb Z$, $x^2-x$ vanishes at both $0$ and $1$, but remains a nonzero polynomial of degree $2$. There is no contradiction: two roots do not exceed its degree, and the field supplies no third distinct input. **A polynomial expression and the function it induces carry different information over a finite field.**

**3.B.** Add and subtract $4x^2y^2$:

$$
\begin{aligned}
x^4+4y^4
&=(x^2+2y^2)^2-(2xy)^2\\
&=(x^2-2xy+2y^2)(x^2+2xy+2y^2).
\end{aligned}
$$

With $x=n,y=1$, the factors are $(n-1)^2+1$ and $(n+1)^2+1$, both integers greater than $1$ when $n>1$. **Introduce a compensating term to reveal a difference of squares.** The restriction matters: at $n=1$, the first factor is $1$ and the number is the prime $5$.

**3.C.** Factor the expression before dividing by its leading coefficient:

$$
(t-1)x^2-2tx+t+1
=(x-1)\bigl((t-1)x-(t+1)\bigr).
$$

For $t\ne1$, the two distinct roots are $1$ and $(t+1)/(t-1)$. At $t=1$, the equation reduces to $-2x+2=0$, with the single root $1$. The discriminant is always $4$; the change occurs because the equation ceases to be quadratic. The second root is $1+2/(t-1)$ and becomes unbounded as $t$ approaches $1$. **Track the degree as well as the discriminant in a parameter family.**

**3.D.** The constant term excludes $x=0$, so dividing by $x^2$ is legitimate. Since $x^2+x^{-2}=u^2-2$, the equation becomes

$$
u^2-3u+2=0,
\qquad u=1\ \text{or}\ u=2.
$$

For real nonzero $x$, the range restriction excludes $u=1$. The value $u=2$ gives $(x-1)^2=0$, so $x=1$ is the only real solution.

Over $\mathbb C$, both values of $u$ are admissible, and

$$
x^4-3x^3+4x^2-3x+1
=(x-1)^2(x^2-x+1).
$$

Thus $1$ has multiplicity two, and $(1\pm i\sqrt3)/2$ are simple roots. **A substitution can expose symmetry while still requiring a separate recovery of its admissible inputs.** Here the original polynomial is unchanged, up to the expected power of $x$, when $x$ is replaced by $1/x$.

**3.E.** Substituting $x=u+v$ gives

$$
x^3-15x-4
=u^3+v^3-4+(3uv-15)(u+v).
$$

Choose $uv=5$ and $u^3+v^3=4$. Then $u^3,v^3$ have product $125$ and sum $4$, so they are the roots of $z^2-4z+125=0$, namely $2\pm11i$. The identities

$$
(2+i)^3=2+11i,\qquad
(2-i)^3=2-11i
$$

supply compatible cube roots with product $5$, yielding $x=4$. Division then gives

$$
x^3-15x-4=(x-4)(x^2+4x+1),
$$

so all three roots are $4,-2+\sqrt3,-2-\sqrt3$.

**Complex arithmetic can organize a calculation whose final answers are real.** *The cube-root choices must remain compatible with $uv=5$; independently choosing arbitrary cube roots need not solve the original cubic.*

**3.F.** Each root satisfies $r^2=3r-1$ or $s^2=3s-1$. Let $U_n=r^n+s^n$. Then

$$
U_0=2,\qquad U_1=3,\qquad
U_n=3U_{n-1}-U_{n-2}\quad(n\ge2).
$$

This gives $U_2=7$, $U_3=18$, $U_4=47$, and $U_5=123$. The recurrence also proves integrality by induction. **Use the defining polynomial to reduce high powers to lower ones.** The result connects Vieta's formulas with recurrence relations and sequences.

**3.G.** The root error is $|\widetilde r-1|=10^{-3}$, whereas the residual is $|P(\widetilde r)|=10^{-6}$. For the linear polynomial $Q$, residual and root error are equal; at the same point both are $10^{-3}$. Thus the numerical size of a residual cannot be interpreted independently of the polynomial.

More generally, if $P(x)=(x-r)R(x)$ and $|R(\widetilde r)|\ge m>0$, then

$$
|\widetilde r-r|
=\frac{|P(\widetilde r)|}{|R(\widetilde r)|}
\le\frac{|P(\widetilde r)|}{m}.
$$

Near a repeated root, the remaining factor also vanishes, so such a fixed positive lower bound fails. The perturbed polynomial has two real roots $1\pm\sqrt\delta$ for $\delta>0$, a double root for $\delta=0$, and no real roots for $\delta<0$. **Convert a residual into an error bound using additional information about the polynomial, or retain an enclosing interval.**

## 4. Functions, Graphs, and Transformations

An equation asks which inputs satisfy a condition. A function records how the output depends on the input throughout a domain. Moving between these viewpoints turns isolated calculations into questions about a whole pattern: which values occur, whether an operation can be undone, and how the answers change when a parameter moves.

The central habit is to keep three things together: **the rule, the permitted inputs, and the properties being claimed**. A graph makes these relationships visible, while algebra and definitions establish what the picture alone cannot certify.

### 4.1 A Function and Its Representations

Must a function have a single formula? Consider a temperature prescribed separately on different parts of a boundary, or a charge that changes at successive thresholds. The dependence is meaningful even when different rules govern different inputs.

Here a `function` is specified as a map

$$
f:A\longrightarrow B,
$$

assigning exactly one element $f(x)\in B$ to each $x\in A$. The set $A$ is the `domain`, and $B$ is the `codomain`. Neither set has to consist of real numbers: sequences take integer inputs, and a geometric transformation takes points as inputs.

A formula, a table, a graph, and a verbal rule are different ways to represent this assignment. A complete table can specify a function on a finite domain; a table of a few measurements cannot determine a unique function on an interval without additional assumptions. Two different formulas can represent the same map, as $x^2-1$ and $(x-1)(x+1)$ do on $\mathbb R$.

For a real-valued function of a real variable, its `graph` is the set of points $(x,f(x))$. Every vertical line through an input in the domain meets the graph exactly once. Thus $x^2+y^2=1$ describes a relation, but not a function $y$ of $x$ on the whole circle: most admissible inputs give two outputs. Its upper and lower semicircles separately define functions.

**Worked example 4.1A — A function assembled from infinitely many pieces.**

The `floor` $\lfloor x\rfloor$ is the greatest integer not exceeding $x$. Define the `fractional-part function` by

$$
p(x)=x-\lfloor x\rfloor.
$$

For each integer $n$,

$$
p(x)=x-n\qquad(n\le x<n+1).
$$

Thus $p(7/4)=3/4$, but $p(-7/4)=1/4$, because $\lfloor-7/4\rfloor=-2$. Every integer has output $0$, and every output lies in $\lbrack 0,1)$. Conversely, each $y\in\lbrack 0,1)$ occurs by choosing $x=y$.

The graph consists of sloping segments, each including its left endpoint and excluding its right endpoint. *The endpoint convention is part of the function; changing it changes the values at integers.* The formula using a floor and the infinitely many linear pieces describe exactly the same assignment.

**The conceptual shift is from a special kind of expression to an assignment of outputs to inputs.** This wider function concept also changes which questions are legitimate. A function may be discontinuous, may fail to have a derivative, or may have no convenient elementary expression. **Continuity, differentiability, and representability by a power series are additional properties to prove or assume.** They are not contained in the definition of a function. The need to describe separately prescribed boundary data is one route from elementary formulas to this broader viewpoint.

Related: [expressions and identities](#31-expressions-identities-and-equations); [limits and continuity](#10-limits-continuity-and-infinity).

### 4.2 Domain, Codomain, and Image

Which outputs are allowed, and which outputs actually occur? The `image`, also called the range here, is

$$
f(A)=\{f(x):x\in A\}\subseteq B.
$$

The codomain is declared; the image must be found. For instance, squaring defines a map $\mathbb R\to\mathbb R$ whose image is $\lbrack 0,\infty)$. Declaring the codomain to be $\lbrack 0,\infty)$ makes the same rule onto its codomain. In this reference, specifying a map includes specifying its domain and codomain.

A map is `injective` if distinct inputs have distinct outputs, `surjective` if every element of its codomain occurs, and `bijective` if both conditions hold. Algebraically,

$$
f(x_1)=f(x_2)\Longrightarrow x_1=x_2
$$

expresses injectivity. To prove surjectivity, start with an arbitrary $y$ in the codomain and find an admissible $x$ satisfying $f(x)=y$.

When only a real formula is given, its `natural domain` is the largest set of real inputs for which the indicated operations are defined. Denominators must be nonzero, even-root radicands nonnegative, and logarithm arguments positive. An application or a stated restriction can make the actual domain smaller.

For example,

$$
q(x)=\sqrt{\frac{x-1}{x+2}}
$$

requires $(x-1)/(x+2)\ge0$ and $x\ne-2$. A sign chart gives

$$
D_q=(-\infty,-2)\cup[1,\infty).
$$

*Cancelling a factor or simplifying a composition does not automatically restore an excluded input.* A simplified expression may extend a function to a larger domain, but that extension is a new assignment at the added points.

**Worked example 4.2A — Finding an image means proving attainability.**

Find the image of

$$
f(x)=\frac{x^2+1}{x^2+2},
\qquad x\in\mathbb R.
$$

Rewrite the expression as

$$
f(x)=1-\frac1{x^2+2}.
$$

Since $x^2+2\ge2$, we obtain $1/2\le f(x)<1$. The lower bound is attained at $x=0$; the upper bound is never attained.

These inequalities show containment in $\lbrack 1/2,1)$, but we must also show that no values inside this interval are missing. Given such a $y$, the equation $f(x)=y$ becomes

$$
x^2=\frac{2y-1}{1-y}.
$$

The right side is nonnegative, so an admissible real $x$ exists. Therefore the image is exactly $\lbrack 1/2,1)$.

**To determine an image, prove both exclusion and attainment.** The same calculation shows that $f$ is not injective on $\mathbb R$: every image value above $1/2$ has two opposite preimages. On $\lbrack 0,\infty)$, however, each has exactly one.

This separates three different tasks that are often confused: checking where a formula makes sense, bounding its outputs, and proving that every proposed output occurs.

Related: [order and distance](#15-order-and-distance); [inequalities and optimization](#8-inequalities-bounds-and-optimization).

### 4.3 Composition and Inverse Functions

What changes when one operation feeds into another? For maps $g:A\to B$ and $f:B\to C$, the `composition` is

$$
(f\circ g)(x)=f(g(x)).
$$

The rightmost operation acts first. More generally, for formulas with natural domains $D_g,D_f$, the composition has domain

$$
D_{f\circ g}=\{x\in D_g:g(x)\in D_f\}.
$$

The intermediate output must be an admissible input for the next operation.

**Worked example 4.3A — The same two operations in opposite orders.**

Let $f(x)=\sqrt x$ and $g(x)=x^2-1$, each on its natural real domain. Then

$$
(f\circ g)(x)=\sqrt{x^2-1},
\qquad
D_{f\circ g}=(-\infty,-1]\cup[1,\infty),
$$

whereas

$$
(g\circ f)(x)=(\sqrt x)^2-1=x-1,
\qquad
D_{g\circ f}=[0,\infty).
$$

At $x=2$, their outputs are $\sqrt3$ and $1$. Moreover, the second composition remains undefined for negative $x$, even though the simplified formula $x-1$ has a value there. **Compute the domain through the intermediate stages before simplifying.**

Composition is `associative`: $f\circ(g\circ h)=(f\circ g)\circ h$ for compatible maps, because both sides send $x$ to $f(g(h(x)))$. It is generally not commutative. The identity map $\operatorname{id}_A(x)=x$ leaves every input unchanged.

An `inverse function` $f^{-1}:B\to A$ must undo $f$ in both directions:

$$
f^{-1}\circ f=\operatorname{id}_A,
\qquad
f\circ f^{-1}=\operatorname{id}_B.
$$

Such an inverse exists exactly when $f:A\to B$ is bijective. Injectivity guarantees uniqueness of the recovered input; surjectivity guarantees its existence for every $y\in B$. If $f$ is only injective, it has an inverse after its codomain is restricted to its image.

*The notation $f^{-1}$ does not mean the reciprocal $1/f$.* For instance, the inverse of $x\mapsto x^2$ on $\lbrack 0,\infty)$ is $y\mapsto\sqrt y$, not $y\mapsto1/y^2$.

**Worked example 4.3B — Restricting a domain to recover lost information.**

Consider

$$
h(x)=(x-2)^2+1.
$$

On $\mathbb R$, inputs equally far from $2$ have the same output, so $h$ has no inverse function on its image. Restrict it to

$$
h:[2,\infty)\longrightarrow[1,\infty).
$$

Solving $y=(x-2)^2+1$ under the condition $x\ge2$ gives

$$
h^{-1}(y)=2+\sqrt{y-1}.
$$

Both compositions are identities on their stated domains. In particular,

$$
h^{-1}(h(x))=2+|x-2|=x
\qquad(x\ge2).
$$

If the domain had instead been $(-\infty,2\rbrack $, the inverse would be $2-\sqrt{y-1}$. *Writing $\pm$ gives the full inverse relation, not a single inverse function.* The domain restriction selects a `branch` and supplies the sign information that squaring discarded.

Geometrically, interchanging $x$ and $y$ reflects a graph across $y=x$. The reflected set is a function graph precisely when each original horizontal line meets the graph at most once; this is the `horizontal-line test` for injectivity.

![The nonnegative branch of y=x squared and its inverse y=square root of x, reflected across y=x; dashed curves show the excluded branches.]({{site.img}}/mathematics/elementary-mathematics-reference/function-inverse-branches-diagram.svg)

The solid curves illustrate the inverse pair $x^2$ and $\sqrt x$ on nonnegative inputs. Restoring the dashed negative branch of the parabola would require restoring both square-root branches in the reflected relation.

For bijections $g:A\to B$ and $f:B\to C$, undo the last operation first:

$
(f\circ g)^{-1}=g^{-1}\circ f^{-1}.
$

This reverse-order law follows by composing with $f\circ g$ and cancelling the adjacent inverse pairs. It is the same logic used to reverse a sequence of reversible steps in an equation.

Related: [reversible transformations](#33-reversible-transformations); [logarithms as inverses](#5-powers-exponentials-and-logarithms); [inverse trigonometric branches](#6-trigonometry-and-the-complex-plane).

### 4.4 Monotonicity, Symmetry, and Periodicity

How much can we know without calculating every output? Global comparisons and symmetries often replace a long table of values.

A function is `strictly increasing` on an ordered domain if $u<v$ always implies $f(u)<f(v)$. Replacing the last inequality by $\le$ gives `nondecreasing`. Strictly decreasing and nonincreasing are defined similarly. The word “increasing” is sometimes used for either convention; this reference states which one is intended.

Every strictly monotone function is injective. *Monotonicity must be asserted on a specified set.* Behaviour on separate intervals does not automatically combine into the same behaviour on their union.

**Worked example 4.4A — Monotonicity from a difference, without differentiation.**

For

$$
f(x)=x+\frac1x,\qquad x>0,
$$

compare two inputs $0<u<v$:

$$
f(v)-f(u)=(v-u)\left(1-\frac1{uv}\right).
$$

If $0<u<v\le1$, then $uv<1$, so the difference is negative. If $1\le u<v$, then $uv>1$, so it is positive. Hence $f$ is strictly decreasing on $(0,1\rbrack $ and strictly increasing on $\lbrack 1,\infty)$.

Its minimum is $f(1)=2$. An independent certificate is

$$
f(x)-2=\frac{(x-1)^2}{x}\ge0.
$$

The symmetry $f(x)=f(1/x)$ explains why two positive inputs usually share an output. Indeed, $f(x)=y$ becomes $x^2-yx+1=0$: for $y>2$, its two positive roots are reciprocal and lie on opposite sides of $1$.

**Factor the output difference to expose the sign; use a nonnegative expression to certify the bound.** These methods prepare the way for derivative tests while also giving exact proofs on their own.

As a warning, $1/x$ is strictly decreasing on each of $(-\infty,0)$ and $(0,\infty)$, but not on their union: $-1<1$ and $1/(-1)<1/1$. *Separate decreasing branches need not form a globally decreasing function.*

For a domain symmetric under $x\mapsto-x$, an `even` function satisfies $f(-x)=f(x)$, and an `odd` function satisfies $f(-x)=-f(x)$. Their graphs are symmetric about the vertical axis and the origin, respectively. If an odd function is defined at $0$, it has value $0$ there. An even function cannot be injective on a domain containing a nonzero pair $x,-x$.

A positive number $T$ is a `period` when the domain is invariant under translation by $T$ in both directions and

$$
f(x+T)=f(x)
$$

for every domain input. The fractional-part function has period $1$, since $\lfloor x+1\rfloor=\lfloor x\rfloor+1$. Its graph repeats despite its jumps at integers. If a least positive period exists, it is the `fundamental period`; existence is an additional claim. A constant function on $\mathbb R$, for example, has every positive number as a period and no least one.

These properties are all invariance statements: reflection or translation changes an input in a prescribed way while preserving, or predictably changing, its output. **Symmetry organizes entire families of values at once.** In Chapter 6, the same idea will organize circular functions.

Related: [inequality certificates](#8-inequalities-bounds-and-optimization); [trigonometry and periodicity](#6-trigonometry-and-the-complex-plane); [derivative tests](#11-calculus-differential-equations-and-approximation).

### 4.5 Transformations of Graphs

Why does $f(x-h)$ shift a graph to the right when $h>0$? An old input $u$ is now reached when $x-h=u$, so its new position is $x=u+h$. Tracking a point resolves the sign convention.

More generally, let

$$
g(x)=a\,f\bigl(b(x-h)\bigr)+k,
\qquad b\ne0.
$$

A point $(u,v)$ on the graph of $f$ becomes

$$
(u,v)\longmapsto
\left(h+\frac{u}{b},\ k+av\right)
$$

on the graph of $g$. Therefore

$$
D_g=\left\{h+\frac{u}{b}:u\in D_f\right\},
\qquad
g(D_g)=\{k+av:v\in f(D_f)\}.
$$

**Transform inputs and outputs separately, then transform the domain and image with them.**

| New function | Effect on the graph |
| --- | --- |
| $f(x-h)$ | Translate horizontally by $h$. |
| $f(x)+k$ | Translate vertically by $k$. |
| $f(bx)$, $b\ne0$ | Scale horizontal coordinates by $1/\lvert b\rvert$; also reflect across the vertical axis if $b<0$. |
| $a f(x)$ | Scale vertical coordinates by $\lvert a\rvert$; also reflect across the horizontal axis if $a<0$. For $a=0$, all defined outputs become zero. |
| $\lvert f(x)\rvert$ | Reflect only the parts below the horizontal axis upward. |
| $f(\lvert x\rvert)$ | Retain the part with nonnegative input and mirror it across the vertical axis. |

The last two operations are different. For $f(x)=x-1$, they give $|x-1|$ and $|x|-1$, whose vertices occur at $(1,0)$ and $(0,-1)$. Each formula also carries its own domain condition: $|f(x)|$ requires $x\in D_f$, whereas $f(|x|)$ requires $|x|\in D_f$.

**Worked example 4.5A — A reflected square-root graph with exact endpoints.**

Starting from $f(u)=\sqrt u$, describe

$$
g(x)=2\sqrt{1-x}-1.
$$

Here $a=2$, $b=-1$, $h=1$, and $k=-1$. The point map is

$$
(u,\sqrt u)\longmapsto(1-u,\ 2\sqrt u-1).
$$

The base points $(0,0),(1,1),(4,2)$ become $(1,-1),(0,1),(-3,3)$. Because $u\ge0$, the new domain is $x\le1$; because $\sqrt u\ge0$, the image is $\lbrack -1,\infty)$.

The function is strictly decreasing: as $x$ increases, $1-x$ decreases, and the square root preserves order. Its horizontal-axis intercept satisfies $\sqrt{1-x}=1/2$, giving $x=3/4$. The endpoint is included because the original square root is defined at zero.

*A memorized instruction such as “shift and reflect” can be ambiguous about order.* The point map fixes the order exactly.

Noncommutativity appears even with vertical operations. Scaling the outputs of $f+k$ by $a$ produces $af+ak$, whereas shifting the outputs of $af$ by $k$ produces $af+k$. These agree only when $(a-1)k=0$. A change of order can change the function.

When $a,b\ne0$, the point map above is an invertible `affine transformation` of the plane: each new coordinate is a scaled old coordinate plus a constant. It preserves injectivity of the represented function and carries a vertical symmetry axis to a new vertical symmetry axis. If $T$ is a period of $f$, then $T/|b|$ is a period of $g$. The plane transformation generally does not preserve lengths or angles. A vertical shift also need not preserve zeros. *Ask which property survives the transformation instead of assuming that every feature of the old graph survives.*

Related: [scaling and ratios](#14-ratios-and-scaling); [coordinates and transformations](#7-geometry-coordinates-and-linear-structure).

### 4.6 Intersections and Parameter-Dependent Behaviour

How many solutions does an equation have before we calculate them? Solving $f(x)=g(x)$ means finding intersections of two graphs on the common domain. Solving $f(x)=a$ means intersecting one graph with a moving horizontal line.

The set of all inputs that map into a set $E$ is its `preimage`:

$$
f^{-1}(E)=\{x\in D_f:f(x)\in E\}.
$$

This set notation is meaningful even when $f$ has no inverse function. In particular, $f^{-1}(\{a\})$ is the full solution set of $f(x)=a$; it may be empty, contain one point, or contain many points.

**Worked example 4.6A — A moving level and changing numbers of solutions.**

Determine the number of distinct real solutions of

$$
|x^2-1|=a
$$

for every real $a$. Negative $a$ is impossible. For $a\ge0$, the absolute-value equation is equivalent to

$$
x^2=1+a
\quad\text{or}\quad
x^2=1-a.
$$

The two branches give the complete classification:

| Parameter | Distinct solutions | Number |
| --- | --- | --- |
| $a<0$ | None | $0$ |
| $a=0$ | $-1,1$ | $2$ |
| $0<a<1$ | $\pm\sqrt{1+a},\ \pm\sqrt{1-a}$ | $4$ |
| $a=1$ | $-\sqrt2,0,\sqrt2$ | $3$ |
| $a>1$ | $\pm\sqrt{1+a}$ | $2$ |

At $a=0$, the two equations coincide, so their solutions must not be counted twice. At $a=1$, the two inner roots meet at $0$. Above this level, the equation $x^2=1-a$ has no real solutions.

![The graph of y=absolute value of x squared minus one, with horizontal levels a=0, one half, one, and three halves marking respectively two, four, three, and two intersections.]({{site.img}}/mathematics/elementary-mathematics-reference/absolute-quadratic-levels-diagram.svg)

The picture follows directly from the graph transformation $x^2-1\mapsto|x^2-1|$: the part below the axis is reflected upward. **Use the graph to locate the critical levels, then solve the branch equations to prove completeness.**

A change in solution count need not always be a tangency or a collision. The equation $1/x=a$, with $x\ne0$, has one solution for every $a\ne0$ and none for $a=0$. As a nonzero $a$ approaches zero, the magnitude of its solution $1/a$ becomes arbitrarily large; no finite collision occurs.

*Domain boundaries, discontinuities, and solutions moving beyond every fixed plotting window can defeat a purely visual count.* A trustworthy classification checks the domain, branch conditions, exceptional parameter values, and whether the list is exhaustive.

This function viewpoint connects the algebra of Chapter 3 with later analysis: monotonicity controls uniqueness, continuity can guarantee intermediate values, and derivatives help locate changes of behaviour. Each conclusion uses its own hypotheses; a smooth-looking plot supplies none of them by itself.

Related: [quadratic parameters](#34-quadratic-equations-and-parameters); [numerical root finding](#36-exact-formulas-and-numerical-root-finding); [continuity and existence](#10-limits-continuity-and-infinity).

### 4.7 Classical Problems and Extensions

Try the problems before reading the solution notes. Each asks for the domain or the hypotheses as part of the answer.

**4.A — A piecewise function with infinitely many preimages.** Write

$$
F(x)=|x-1|-|x+1|
$$

as a piecewise formula. Find its image, decide whether it is even or odd, and classify the solutions of $F(x)=c$ for every real $c$.

**4.B — A function that undoes itself.** On $D=\mathbb R\setminus\{1\}$, let

$$
f(x)=\frac{x+1}{x-1}.
$$

Show that $f$ maps $D$ into $D$ and satisfies $f(f(x))=x$. Deduce bijectivity without first solving $f(x)=y$. Find its fixed points, and explain why it is not decreasing on all of $D$ even though it is strictly decreasing on each side of $1$.

**4.C — Decomposing an arbitrary function by symmetry.** For any $f:\mathbb R\to\mathbb R$, prove that there is exactly one representation $f=e+o$ with $e$ even and $o$ odd. Apply it to $f(x)=x^3+x^2+x+1$.

**4.D — Two reflection symmetries and a period.** Suppose $f:\mathbb R\to\mathbb R$ satisfies

$$
f(-x)=f(x),
\qquad
f(2a-x)=f(x)
$$

for all real $x$, where $a>0$. Show that $2a$ is a period, without claiming it is the least one. Then prove that any periodic, nondecreasing function on $\mathbb R$ must be constant.

**4.E — An image found by reversing an equation.** Find the image of

$$
r(x)=\frac{2x}{1+x^2},
\qquad x\in\mathbb R.
$$

For each output in the image, count its distinct preimages. Treat output zero separately, and explain the relation between the two preimages when there are two.

**4.F — When do affine operations commute?** For $f(x)=ax+b$ and $g(x)=cx+d$, determine the condition for $f\circ g=g\circ f$. If $a\ne1$ and $c\ne1$, show that the condition is equivalent to the two maps having the same fixed point. Check the contrasting pair $f(x)=x+1$, $g(x)=2x$.

**4.G — Additivity plus order forces a familiar formula.** Suppose $f:\mathbb R\to\mathbb R$ is nondecreasing and satisfies

$$
f(x+y)=f(x)+f(y)
$$

for every real $x,y$. Prove that $f(x)=cx$ for some $c\ge0$. First determine $f$ on the rationals; then trap a real input between consecutive multiples of $1/n$. Identify where monotonicity is used.

**Solution notes**

**4.A.** Split at the zeros of the expressions inside the absolute values:

$$
F(x)=
\begin{cases}
2,&x\le-1,\\
-2x,&-1<x<1,\\
-2,&x\ge1.
\end{cases}
$$

The image is $\lbrack -2,2\rbrack $, and $F(-x)=-F(x)$, so $F$ is odd. If $|c|>2$, there are no solutions. If $-2<c<2$, there is exactly one, $x=-c/2$. At $c=2$, every $x\le-1$ is a solution; at $c=-2$, every $x\ge1$ is a solution. **A constant piece creates an entire interval of preimages.** Nonincreasing behaviour alone does not guarantee injectivity.

**4.B.** For $x\ne1$,

$$
f(x)-1=\frac2{x-1}\ne0,
$$

so the second application is defined. Direct substitution gives

$$
f(f(x))
=\frac{(x+1)+(x-1)}{(x+1)-(x-1)}
=x.
$$

If $f(u)=f(v)$, apply $f$ to get $u=v$; hence $f$ is injective. For any $y\in D$, the element $x=f(y)\in D$ satisfies $f(x)=y$; hence it is surjective. Thus $f^{-1}=f$, making it an `involution`.

Fixed points satisfy $x^2-2x-1=0$, giving $1\pm\sqrt2$, both admissible. For $u<v$ on the same side of $1$,

$$
f(v)-f(u)=\frac{-2(v-u)}{(v-1)(u-1)}<0.
$$

Across the excluded point, however, $0<2$ while $f(0)=-1<3=f(2)$. *The two decreasing branches do not give a decreasing map on the full domain.*

**4.C.** Set

$$
e(x)=\frac{f(x)+f(-x)}2,
\qquad
o(x)=\frac{f(x)-f(-x)}2.
$$

Substitution shows $e(-x)=e(x)$, $o(-x)=-o(x)$, and $e+o=f$. Conversely, any such decomposition gives $f(x)=e(x)+o(x)$ and $f(-x)=e(x)-o(x)$; adding and subtracting forces these formulas. For the stated polynomial, $e(x)=x^2+1$ and $o(x)=x^3+x$.

**Average a function with its reflected copy to extract its even part; take the half-difference to extract its odd part.** These two operations are examples of `projections`: applying the even-part operation twice has the same effect as applying it once, and likewise for the odd part.

**4.D.** Apply the symmetry about $a$ to $-x$, then the symmetry about zero:

$$
f(x+2a)=f(-x)=f(x).
$$

Two reflections have produced a translation. This establishes a period, but a smaller one may exist.

For the second claim, let $T>0$ be a period and choose any $x<y$. There is a positive integer $n$ with $x+nT\ge y$. Monotonicity and periodicity give

$$
f(x)\le f(y)\le f(x+nT)=f(x).
$$

Thus $f(y)=f(x)$ for every pair, and the function is constant. **Repeating values and one-directional order together leave no room for change.**

**4.E.** Since $(x-1)^2\ge0$ and $(x+1)^2\ge0$,

$$
-1\le\frac{2x}{1+x^2}\le1.
$$

The endpoints occur at $x=-1$ and $x=1$. To prove that every intermediate output occurs, solve

$$
y=\frac{2x}{1+x^2}
\quad\Longleftrightarrow\quad
yx^2-2x+y=0.
$$

When $y=0$, the equation is linear and has the single solution $x=0$. When $y\ne0$, the discriminant is $4(1-y^2)$. Thus each $0<|y|<1$ has two distinct real preimages,

$$
x=\frac{1\pm\sqrt{1-y^2}}{y},
$$

and each endpoint $y=\pm1$ has one. No real output lies outside $\lbrack -1,1\rbrack $, so this is exactly the image. The product of the two roots is $1$, agreeing with $r(x)=r(1/x)$ for $x\ne0$. *Treating the equation as quadratic at $y=0$ would miss its change of degree.*

**4.F.** The two compositions are

$$
(f\circ g)(x)=acx+ad+b,
\qquad
(g\circ f)(x)=acx+cb+d.
$$

They agree exactly when

$$
(a-1)d=(c-1)b.
$$

If $a,c\ne1$, their respective unique fixed points are $b/(1-a)$ and $d/(1-c)$; equality of these points is equivalent to the displayed condition. Relative to a common fixed point $p$, the maps have the forms $p+a(x-p)$ and $p+c(x-p)$, so their composition reduces to multiplication of the scale factors.

For a translation and a doubling, $(f\circ g)(x)=2x+1$ but $(g\circ f)(x)=2x+2$. **Commutativity is a property to establish, not a default rule for successive operations.**

**4.G.** Additivity gives $f(0)=0$, $f(-x)=-f(x)$, and $f(nx)=nf(x)$ for positive integers $n$. Let $c=f(1)$. Monotonicity implies $c\ge0$. For every integer $m$ and positive integer $n$,

$$
n f(m/n)=f(m)=mc,
\qquad
f(m/n)=c\,m/n.
$$

Now fix a real $x$. With $m=\lfloor nx\rfloor$,

$$
\frac mn\le x<\frac{m+1}{n}.
$$

Monotonicity bounds the unknown value between two known rational-input values:

$$
c\frac mn\le f(x)\le c\frac{m+1}{n}.
$$

Because $c\ge0$, the number $cx$ lies in the same interval. Hence $|f(x)-cx|\le c/n$ for every positive integer $n$. The Archimedean property forces the difference to be zero, proving $f(x)=cx$. Conversely, every such function with $c\ge0$ has the required properties.

**Algebra determines the rational values; order connects them to all real inputs.** *Knowing the rational values alone would not justify this last step without an additional hypothesis.* This is an elementary bridge from a `functional equation` to the ideas of approximation and regularity developed in Chapter 10.

## 5. Powers, Exponentials, and Logarithms

Repeated multiplication begins with a whole-number count. A real exponent asks for something more: a consistent way to interpolate between those counts. Logarithms reverse this dependence and turn multiplication into addition. The resulting functions connect arithmetic, geometric scaling, continuous change, and numerical calculation.

The main questions are therefore structural as well as computational: **Which laws survive an extension of the exponent, what choices make the functions single-valued, and why is the base $e$ natural?**

### 5.1 Extending the Exponent

What should $a^0$, $a^{-1}$, or $a^{1/2}$ mean? Begin with $a>0$ and require the familiar law $a^{r+s}=a^r a^s$ to remain valid.

For positive integers, $a^n$ is repeated multiplication. The same law forces

$$
a^0=1,\qquad a^{-n}=\frac1{a^n}.
$$

For an integer $m$ and a positive integer $n$, define

$$
a^{m/n}=\left(\sqrt[n]{a}\right)^m,
$$

where the root is the unique positive one. This definition is independent of the representation of the rational number: passing to a common denominator gives the same positive root. **Extend the operation by preserving its laws and fixing the root convention.**

**Worked example 5.1A — Read a fractional exponent as a sequence of operations.**

Evaluate

$$
\left(\frac{16}{81}\right)^{-3/4}.
$$

The positive fourth root is $2/3$. Cube it and take its reciprocal:

$$
\left(\frac{16}{81}\right)^{-3/4}
=\left(\frac23\right)^{-3}
=\left(\frac32\right)^3
=\frac{27}{8}.
$$

The negative exponent specifies a reciprocal, not a negative output. Using $-6/8$ instead of $-3/4$ gives the same answer because the base is positive and the root choices agree.

An irrational exponent cannot be interpreted as a finite number of multiplications or root extractions. For $a>1$, a precise construction is

$$
a^x=\sup\{a^q:q\in\mathbb Q,\ q\le x\}.
$$

The set is nonempty and bounded above by $a^N$ for any integer $N>x$, so real completeness supplies the supremum. For $0<a<1$, define $a^x=(1/a)^{-x}$; for $a=1$, define $1^x=1$.

Why does this agree with approximation by rationals? If $m=\lfloor nx\rfloor$, then

$$
a^{m/n}\le a^x\le a^{(m+1)/n}.
$$

The ratio of the bounds is $a^{1/n}$. Writing $a^{1/n}=1+u_n$, the integer binomial inequality gives

$$
a=(1+u_n)^n\ge1+nu_n,
\qquad
0\le u_n\le\frac{a-1}{n}.
$$

Thus the relative gap tends to zero. This is the mechanism behind the unique continuous extension from rational to real exponents; the general treatment of limits belongs to Chapter 10.

For positive bases $a,b$ and real exponents $r,s$, the resulting laws are

$$
a^{r+s}=a^r a^s,\qquad
a^{r-s}=\frac{a^r}{a^s},\qquad
(a^r)^s=a^{rs},\qquad
(ab)^r=a^r b^r.
$$

*Checking rational exponents alone does not establish these statements for all real exponents.* The passage uses completeness and the continuity of the extension. This is the first point at which the theory of powers goes beyond finite algebra.

Related: [number systems and completeness](#11-number-systems-and-closure); [limits and infinity](#10-limits-continuity-and-infinity).

### 5.2 Powers and Roots

Which parts of the preceding theory remain valid when the base can be zero or negative? The answer depends on the exponent and on the meaning of “root.”

For an even positive integer $n$, the real function $\sqrt\lbrack n\rbrack {x}$ is defined for $x\ge0$ and selects the nonnegative root. For odd $n$, it is defined for every real $x$ and selects the unique real root. Consequently,

$$
\sqrt{x^2}=|x|,
\qquad
\sqrt[3]{x^3}=x.
$$

The equation $y^2=9$ has two real solutions, while the expression $\sqrt9$ has one value, $3$. **Distinguish a root function from the full solution set of a power equation.**

For a negative real base and a reduced rational exponent $m/n$, a real value is available when $n$ is odd, using the real odd root. An even denominator gives no real value. There is no real-valued exponential on all real exponents with a negative base and the addition law: such a function would have to satisfy $a=(a^{1/2})^2\ge0$.

*The positive-base hypotheses in the power laws cannot simply be dropped.* For example,

$$
\bigl((-1)^2\bigr)^{1/2}=1,
\qquad
(-1)^{2(1/2)}=-1.
$$

Both expressions are meaningful, but they are unequal: the first has forgotten the sign before taking the principal square root. Similarly, $\sqrt{uv}=\sqrt u\,\sqrt v$ is a real identity under $u,v\ge0$; it is not an unrestricted rule for complex square roots.

At base zero, $0^r=0$ for $r>0$, while negative exponents are undefined. In this real-power setting, $0^0$ is left undefined; conventions used in particular discrete formulas require separate explanation.

**Worked example 5.2A — An odd-root substitution retains negative inputs.**

Solve, with real cube roots understood,

$$
x^{2/3}+x^{1/3}-2=0.
$$

Set $u=\sqrt\lbrack 3\rbrack {x}$. This is a bijective substitution on $\mathbb R$, and $x^{2/3}=u^2$. The equation becomes

$$
u^2+u-2=(u+2)(u-1)=0.
$$

Hence $u=-2$ or $u=1$, giving $x=-8$ or $x=1$. Both satisfy the original equation. *Imposing $u\ge0$ would incorrectly discard a valid solution.*

A `power function` fixes the exponent and varies the base: $x\mapsto x^r$. On $x>0$, it is strictly increasing for $r>0$, strictly decreasing for $r<0$, and constant for $r=0$. When $r\ne0$, its inverse on $(0,\infty)$ is $x\mapsto x^{1/r}$. An exponential function instead fixes the base and varies the exponent.

Related: [inverse branches](#43-composition-and-inverse-functions); [reversible equation transformations](#33-reversible-transformations); [complex roots](#6-trigonometry-and-the-complex-plane).

### 5.3 Exponential Functions

What distinguishes repeated scaling from repeated addition? In equal input steps, a linear function has equal output differences, whereas an exponential function has equal output ratios.

For $a>0$, the `exponential function` $f(x)=a^x$ satisfies

$$
f(0)=1,\qquad
f(x+h)=a^h f(x),\qquad
f(-x)=\frac1{f(x)}.
$$

For $a>1$ it is strictly increasing; for $0<a<1$ it is strictly decreasing. In both cases its domain is $\mathbb R$, its image is $(0,\infty)$, and the graph passes through $(0,1)$ without ever reaching the horizontal axis. The case $a=1$ is constant and has no inverse on $\mathbb R$.

For $a>1$, the limits are $a^x\to\infty$ as $x\to\infty$ and $a^x\to0$ as $x\to-\infty$; they reverse for $0<a<1$. In particular, a decaying exponential approaches zero without becoming zero at a finite input.

**Worked example 5.3A — Turn an exponential equation into a polynomial.**

Solve

$$
4^x-3\cdot2^x-4=0.
$$

Because $4^x=(2^x)^2$, put $u=2^x>0$. Then

$$
u^2-3u-4=(u-4)(u+1)=0.
$$

Only $u=4$ is in the image of the substitution. Since $2^x=2^2$ and the exponential is injective, the unique solution is $x=2$. **Reduce the equation algebraically, then enforce the image of the new variable.**

The addition law also characterizes exponential dependence. Suppose a continuous function $F:\mathbb R\to(0,\infty)$ satisfies

$$
F(t+s)=F(t)F(s).
$$

Then $F(0)=1$, and writing $a=F(1)$ forces $F(m/n)=a^{m/n}$ for rational inputs. Continuity determines all remaining values, so $F(t)=a^t$.

This is the `exponential functional equation`. It describes a normalized process whose multiplier for an elapsed time depends only on the length of that time, not on its starting point. *Measurements at integer times alone do not determine what happens between them; a law of evolution and a regularity assumption supply that additional information.*

Related: [composition and function laws](#43-composition-and-inverse-functions); [sequences](#9-sequences-finite-sums-and-counting); [continuous growth](#55-linearizing-multiplication-and-growth).

### 5.4 Logarithms as Inverses

If the multiplier is known but the exponent is not, which operation recovers it? For $a>0$, $a\ne1$, and $x>0$, define

$$
\log_a x=y\quad\Longleftrightarrow\quad a^y=x.
$$

The `logarithm` is the inverse of a bijection $\mathbb R\to(0,\infty)$. Thus

$$
\log_a1=0,\qquad
\log_a a=1,\qquad
a^{\log_a x}=x,\qquad
\log_a(a^t)=t.
$$

It is strictly increasing for $a>1$ and strictly decreasing for $0<a<1$. The base $1$ is excluded because $1^t$ cannot distinguish exponents.

The main laws follow from exponentiation. If $x=a^u$ and $y=a^v$, then $xy=a^{u+v}$; applying the inverse gives the product law. The quotient and power laws follow in the same way:

$$
\log_a(xy)=\log_a x+\log_a y,\qquad
\log_a\frac{x}{y}=\log_a x-\log_a y,\qquad
\log_a(x^r)=r\log_a x
$$

for $x,y>0$ and real $r$. **Taking logarithms turns products into sums and powers into scalar multiples.** There is no corresponding rule splitting the logarithm of a sum: $\log_2(1+1)=1$, whereas $\log_2 1+\log_2 1=0$.

The domain conditions remain essential. For $x\ne0$,

$$
\log_a(x^2)=2\log_a|x|,
$$

but $2\log_a x$ is defined only for $x>0$. A product may be positive even when both its factors are negative; that does not make the separate real logarithms meaningful.

To `change base`, take a logarithm to any other base $b>0$, $b\ne1$, in $x=a^{\log_a x}$:

$$
\log_a x=\frac{\log_b x}{\log_b a}.
$$

Thus different logarithmic bases differ only by a nonzero constant factor. The `natural logarithm`, denoted $\ln$, uses the base $e>1$ explained in Section 5.5, giving $\log_a x=\ln x/\ln a$. This also makes the reversal of monotonicity for $a<1$ transparent, since then $\ln a<0$.

**Worked example 5.4A — Combining logarithms without enlarging the domain.**

Solve

$$
\log_2(x-1)+\log_2(x-3)=3.
$$

The original domain is $x>3$. Within it, the equation is equivalent to

$$
\log_2\bigl((x-1)(x-3)\bigr)=3,
\qquad
(x-1)(x-3)=8.
$$

Hence $x^2-4x-5=(x-5)(x+1)=0$. Only $x=5$ belongs to the domain. At $x=-1$, the product of the two arguments is positive, but neither original logarithm exists over the reals. **Keep the domain from before the logarithms were combined.**

**Worked example 5.4B — An inequality with a decreasing logarithm.**

Solve

$$
\log_{1/2}(x-1)\ge\log_{1/2}(3-x).
$$

Both arguments are positive exactly when $1<x<3$. Since this logarithm is decreasing, the inequality reverses when we compare its arguments:

$$
x-1\le3-x,\qquad x\le2.
$$

The solution set is $(1,2\rbrack $. *Cancelling logarithms as if every logarithmic function were increasing would reverse the answer.*

**A complex preview.** Over $\mathbb C$, the exponential has period $2\pi i$, so it is not globally injective. The logarithms of a nonzero complex number $z$ are

$$
\ln|z|+i(\theta+2\pi k),
\qquad k\in\mathbb Z,
$$

where $\theta$ is one argument of $z$. Choosing $\theta\in(-\pi,\pi\rbrack $ specifies the `principal value` $\operatorname{Log}z$, but this choice is discontinuous across the negative real axis. A continuous logarithm branch needs a suitable domain restriction.

Principal values do not satisfy the product law without qualification:

$$
\operatorname{Log}\bigl((-1)(-1)\bigr)=0,
\qquad
\operatorname{Log}(-1)+\operatorname{Log}(-1)=2\pi i.
$$

The values differ by a full turn. *Real logarithm laws cannot be transferred to chosen complex branches without checking arguments.* Chapter 6 develops the rotation formula behind this phenomenon.

Related: [domain and image](#42-domain-codomain-and-image); [inverse functions](#43-composition-and-inverse-functions); [complex arguments](#6-trigonometry-and-the-complex-plane).

### 5.5 Linearizing Multiplication and Growth

Why should one base be called natural? Instead of choosing it in advance, start with the area under a familiar curve:

$$
L(x)=\int_1^x\frac{dt}{t},
\qquad x>0.
$$

The integral denotes `signed area`: positive for $x>1$, zero at $1$, and negative for $0<x<1$, where the limits are reversed.

The essential geometric fact is that the transformation $(t,y)\mapsto(at,y/a)$ preserves area and carries the hyperbola $y=1/t$ onto itself. Widths multiply by $a$ while heights divide by $a$. Therefore the area from $a$ to $ab$ equals the area from $1$ to $b$. Splitting at $a$ gives, for all $a,b>0$,

$$
L(ab)=\int_1^a\frac{dt}{t}+\int_a^{ab}\frac{dt}{t}
=L(a)+L(b).
$$

**The logarithmic law is a consequence of the scaling symmetry of the hyperbola.** This explains why an area, which initially seems unrelated to exponents, can measure multiplication additively.

![Equal shaded areas under y=1/t on the intervals from 1 to 2 and from 3 to 6, illustrating that scaling width by 3 and height by one third preserves logarithmic area.]({{site.img}}/mathematics/elementary-mathematics-reference/logarithm-hyperbola-area-diagram.svg)

The function $L$ is continuous and strictly increasing. Also, $L(2^n)=nL(2)$ is unbounded above, and $L(1/x)=-L(x)$ makes it unbounded below. Hence there is a unique number $e$ with $L(e)=1$. The addition law and continuity identify $L$ with $\log_e$, so $L(x)=\ln x$.

This gives the natural logarithm its normalization. A short interval near $x$ has area approximately its width divided by $x$, leading to

$$
\frac{d}{dx}\ln x=\frac1x.
$$

The inverse function then satisfies $\frac{d}{dt}e^t=e^t$. The same functions are also characterized by

$$
e^t=\lim_{n\to\infty}\left(1+\frac tn\right)^n
\qquad(t\ge0).
$$

Here a fixed total scaling increment is divided into increasingly many small steps; Problem 5.F justifies the limit. Area, a functional equation, a differential equation, and a limit are connected descriptions, whose general foundations are developed in Chapters 10–11.

A positive quantity with constant continuous relative growth rate $k$ has the form

$$
Y(t)=Y_0e^{kt},
\qquad
\ln\frac{Y(t)}{Y_0}=kt,
\qquad Y_0>0.
$$

Positive $k$ gives growth, and negative $k$ gives decay. Over a time interval $\Delta t$, the multiplier is $e^{k\Delta t}$. A fractional increase $r>-1$ per unit time corresponds to $k=\ln(1+r)$ in those time units, not generally to $k=r$.

**Worked example 5.5A — Doubling time and the meaning of a rate.**

An idealized quantity increases by $5\%$ per unit time. Under the continuous exponential model,

$$
Y(t)=Y_0(1.05)^t,
\qquad
k=\ln1.05\approx0.04879016.
$$

Its doubling time satisfies $(1.05)^T=2$, so

$$
T=\frac{\ln2}{\ln1.05}\approx14.2067.
$$

If the process is inspected only after whole periods, the first observation at or above twice the initial amount is period $15$. *The finite increase $0.05$ and the continuous rate $\ln1.05$ describe the same multiplier in different ways; they are not equal.* For decay with $k<0$, the analogous `half-life` is $\ln2/|k|$.

![The same exponential growth Y divided by Y zero equals 2 to the t shown on a linear vertical axis and a logarithmic vertical axis, where equal ratios occupy equal distances and the curve becomes a line.]({{site.img}}/mathematics/elementary-mathematics-reference/exponential-logarithmic-scales-diagram.svg)

A `semilog plot` uses a logarithmic axis for one variable: $\ln(Y/Y_0)=kt$ makes exponential growth a straight line. A `log–log plot` uses logarithmic axes for both variables: the power law $Y/Y_0=(x/x_0)^p$ becomes

$$
\ln(Y/Y_0)=p\ln(x/x_0).
$$

Ratios to reference quantities keep logarithm arguments dimensionless. Equal distances on a logarithmic axis represent equal ratios. *A roughly straight plot over a limited data range suggests a model; it does not establish an exact law.*

The calculus form of the same idea is the `logarithmic derivative`. For a positive differentiable function $Y$,

$$
\frac{d}{dt}\ln Y(t)=\frac{Y^{\prime}(t)}{Y(t)}.
$$

It measures relative change rather than absolute change and converts a product's logarithmic derivative into a sum. For a nonzero function of either sign, the corresponding local identity uses $\ln|Y|$. Problem 5.G previews its use with a variable exponent.

Related: [ratios and scaling](#14-ratios-and-scaling); [linear coordinates](#7-geometry-coordinates-and-linear-structure); [calculus and differential equations](#11-calculus-differential-equations-and-approximation).

### 5.6 Approximation and Numerical Evaluation

How can a logarithm be calculated rather than merely requested from a table or calculator? A usable method needs both an expression that converges and a bound on what has been omitted.

For $|z|<1$, the finite geometric identity applied to $1/(1-z^2)$, followed by integration, gives

$$
\ln\frac{1+z}{1-z}
=2\sum_{j=0}^{N}\frac{z^{2j+1}}{2j+1}+R_N,
\qquad
|R_N|
\le
\frac{2|z|^{2N+3}}{(2N+3)(1-z^2)}.
$$

Indeed, the remainder is the integral of $2t^{2N+2}/(1-t^2)$ from $0$ to $z$. Bounding its denominator below by $1-z^2$ gives the displayed estimate. This derives the series and its error from a finite identity, without assuming that an infinite sum can be integrated freely.

For a given $x>0$, choose $z=(x-1)/(x+1)$; then $(1+z)/(1-z)=x$. The method works for every positive $x$, but convergence becomes slow when $|z|$ is close to $1$.

**Worked example 5.6A — Six terms with a certified error.**

For $\ln2$, take $z=1/3$ and $N=5$:

$$
S_5=2\sum_{j=0}^{5}\frac{1}{(2j+1)3^{2j+1}}
\approx0.693147073759785.
$$

Every omitted term is positive, and

$$
0<\ln2-S_5
\le\frac{2(1/3)^{13}}{13(1-1/9)}
<1.086\times10^{-7}.
$$

Exact rational evaluation of the sum and bound gives the enclosing interval

$$
0.69314707<\ln2<0.69314719.
$$

Every number in this interval rounds to $0.693147$ at six decimal places. **The remainder bound certifies those digits; a plausible decimal display alone does not.**

For efficient `range reduction`, write $x=2^k m$ with an integer $k$ and $1\le m<2$. Then

$$
\ln x=k\ln2+\ln m,
\qquad
0\le\frac{m-1}{m+1}<\frac13.
$$

Only logarithms near $1$ need fresh evaluation. If the errors in $\ln2$ and $\ln m$ are at most $\delta_2,\delta_m$, the resulting error is at most $|k|\delta_2+\delta_m$.

The corresponding expansion for the exponential is

$$
e^u=\sum_{j=0}^{\infty}\frac{u^j}{j!}.
$$

Its derivation and convergence are treated in Chapter 11. For $0\le u\le1$, truncation after degree $N$ has the useful bound

$$
0\le e^u-\sum_{j=0}^{N}\frac{u^j}{j!}
\le
\frac{u^{N+1}}{(N+1)!}\,
\frac1{1-u/(N+2)}.
$$

After the first omitted term, each successive term is at most $u/(N+2)$ times its predecessor, so a geometric tail bounds the error. Larger positive arguments can be reduced using $e^x=(e^{x/m})^m$, and negative ones using reciprocals. *Restoring the scale also changes the error:* a relative error $\varepsilon$ in $e^{x/m}$ becomes $(1+\varepsilon)^m-1$ after raising the approximation to the $m$th power.

Small increments require separate care. For $u\ge0$,

$$
0\le u-\ln(1+u)
=\int_0^u\frac{t}{1+t}\,dt
\le\frac{u^2}{2}.
$$

This quantifies the approximation $\ln(1+u)\approx u$. But if a numerical system rounds $1+u$ to $1$ before taking its logarithm, information has already been lost. Using $z=u/(2+u)$ in the logarithm series avoids first forming that rounded sum. Likewise, evaluating $e^u-1$ through $u+u^2/2!+\cdots$ avoids subtracting two nearly equal rounded numbers.

**Choose an expression whose arithmetic preserves the information needed, and carry an explicit error estimate through the calculation.**

Related: [measured quantities and error](#16-exact-values-and-measured-quantities); [numerical root finding](#36-exact-formulas-and-numerical-root-finding); [series and approximation](#11-calculus-differential-equations-and-approximation).

### 5.7 Classical Problems and Extensions

Try the problems before reading the solution notes. Problem 5.G is an optional calculus connection using the product and chain rules developed in Chapter 11.

**5.A — Irrational numbers can produce a rational power.** Prove that there exist positive irrational numbers $a,b$ such that $a^b$ is rational. Consider $u=(\sqrt2)^{\sqrt2}$ and split into the two possibilities for $u$. Explain why the power law used in the argument is legitimate.

**5.B — A variable logarithmic base.** Solve

$$
\log_x2\le1
$$

over the reals. State the restrictions on the base before separating cases.

**5.C — The centre of a multiplicative interval.** A positive quantity is known to lie between $a$ and $b$, with $0<a<b$. For a representative value $c\in\lbrack a,b\rbrack $, define the worst multiplicative discrepancy to be

$$
M(c)=\max\left(\frac ca,\frac bc\right).
$$

Find the choice minimizing $M(c)$. Explain why it is the midpoint on a logarithmic scale, and calculate it for $a=4,b=9$.

**5.D — Continuous multiplicative functions are power functions.** Let $H:(0,\infty)\to(0,\infty)$ be continuous and satisfy $H(xy)=H(x)H(y)$. Show that $H(x)=x^c$ for some real constant $c$. Use $F(t)=\ln H(e^t)$ to transform the problem into an additive one.

**5.E — Counting digits without expanding a large integer.** Derive a formula for the number of decimal digits of a positive integer $N$. Then determine the number of digits of $2^{1000}$ using the certified bound

$$
0.30102999566<\log_{10}2<0.30102999567.
$$

Explain why replacing the logarithm by $0.30$ gives a wrong answer.

**5.F — From small discrete steps to continuous scaling.** Use the area under $1/t$ to prove, for $u\ge0$,

$$
\frac{u}{1+u}\le\ln(1+u)\le u.
$$

Deduce that for every fixed $t\ge0$,

$$
\lim_{n\to\infty}\left(1+\frac tn\right)^n=e^t.
$$

What does this say about the origin of the base $e$ when $t=1$?

**5.G — A variable base and a variable exponent.** For $x>0$, differentiate $y=x^x$ using its logarithm and find its global minimum. Explain why neither the rule for a fixed exponent nor the rule for a fixed base can be applied unchanged.

**Solution notes**

**5.A.** If $u=(\sqrt2)^{\sqrt2}$ is rational, choose $a=b=\sqrt2$. If it is irrational, choose $a=u$ and $b=\sqrt2$; then

$$
a^b=\bigl((\sqrt2)^{\sqrt2}\bigr)^{\sqrt2}
=(\sqrt2)^2=2.
$$

In each case both $a,b$ are positive and irrational, and $a^b$ is rational. The nested-power law is valid because the base is positive. **The case split proves existence without needing to decide which case occurs.** The irrationality of $\sqrt2$ was established in Chapter 1.

**5.B.** The base conditions are $x>0$ and $x\ne1$. If $0<x<1$, the logarithm is decreasing and

$$
\log_x2\le\log_x x
\quad\Longleftrightarrow\quad
2\ge x,
$$

which holds throughout that interval. If $x>1$, it is increasing, so the condition becomes $2\le x$. The solution is

$$
(0,1)\cup[2,\infty).
$$

*Multiplying $\ln2/\ln x\le1$ by $\ln x$ without checking its sign would lose an entire interval of solutions.*

**5.C.** The two positive ratios have fixed product $b/a$. Their maximum is therefore at least $\sqrt{b/a}$, with equality exactly when they are equal:

$$
\frac ca=\frac bc
\quad\Longleftrightarrow\quad
c=\sqrt{ab}.
$$

This value lies in $\lbrack a,b\rbrack $ and attains the lower bound. On taking logarithms,

$$
\ln c=\frac{\ln a+\ln b}{2}.
$$

Thus the `geometric mean` is the arithmetic midpoint in logarithmic coordinates. For $4$ and $9$, the representative is $6$ and the worst factor is $3/2$. **Additive and multiplicative notions of centrality lead to different means.**

**5.D.** The assumptions make $F$ continuous, and

$$
F(s+t)=\ln H(e^s e^t)
=\ln\bigl(H(e^s)H(e^t)\bigr)
=F(s)+F(t).
$$

Set $c=F(1)$. Additivity gives $F(m/n)=cm/n$ for rational inputs. For a real $t$, choose rationals $q_n\to t$; continuity gives $F(t)=\lim F(q_n)=ct$. Writing $x=e^t$ now yields

$$
\ln H(x)=c\ln x,
\qquad H(x)=x^c.
$$

Conversely, every real power on positive inputs has the required properties. **Logarithms convert a multiplicative functional equation into an additive one.** This is a concrete `group isomorphism`: the bijection $\ln:(0,\infty)\to\mathbb R$ carries multiplication to addition, including the identity $1\mapsto0$ and reciprocals to negatives.

**5.E.** Having $d$ decimal digits means $10^{d-1}\le N<10^d$. Taking common logarithms gives

$$
d=\lfloor\log_{10}N\rfloor+1.
$$

For $N=2^{1000}$, the supplied bound gives

$$
301.02999566<\log_{10}N<301.02999567,
$$

so $d=302$. Replacing $\log_{10}2$ by $0.30$ would give $301$ digits. *An error that looks small before multiplication by $1000$ can change the integer part afterward.* For a digit count, an enclosing interval must determine the floor, not just approximate the logarithm.

**5.F.** On the interval from $1$ to $1+u$, the height $1/t$ lies between $1/(1+u)$ and $1$. Multiplying by the interval width $u$ proves the two bounds. Put $u=t/n$ and multiply by $n$:

$$
\frac{t}{1+t/n}
\le n\ln(1+t/n)\le t.
$$

Both bounds tend to $t$, so the squeeze principle and continuity of the exponential give the claimed limit. At $t=1$,

$$
e=\lim_{n\to\infty}(1+1/n)^n.
$$

**The limit is a consequence of the logarithmic area law and its normalization.** It need not be introduced as an unexplained special number. For $t>0$, the finite-step multiplier is strictly below $e^t$, since $1/s<1$ inside the area interval except at its first endpoint.

**5.G.** Since $x>0$, take logarithms:

$$
\ln y=x\ln x,\qquad
\frac{y^{\prime}}{y}=\ln x+1.
$$

Hence

$$
\frac{d}{dx}x^x=x^x(\ln x+1).
$$

The positive factor $x^x$ leaves the derivative's sign controlled by $\ln x+1$. It is negative on $(0,e^{-1})$, zero at $e^{-1}$, and positive on $(e^{-1},\infty)$. Thus the unique global minimum is

$$
(e^{-1})^{e^{-1}}=e^{-1/e}.
$$

The derivative includes the variation of both the base and the exponent. More generally, for differentiable $u(x)>0$ and $v(x)$,

$$
\frac{d}{dx}u(x)^{v(x)}
=u(x)^{v(x)}
\left(v^{\prime}(x)\ln u(x)
+v(x)\frac{u^{\prime}(x)}{u(x)}\right).
$$

**Logarithmic differentiation separates the two sources of change before recombining them.**

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

| Chapters | Principal connection to Klein |
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

Each substantive entry combines a compact review statement, explicit hypotheses, an explanation, an advanced connection, a pitfall or counterexample, and links to related entries. In-text worked examples show the reasoning where it is needed. Chapter-end classical problems extend the methods, with the complete problem list preceding separate solution notes so that readers can try the questions first. Longer proofs are reserved for results that illuminate several topics.

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

**Chapter 2: source map and explanatory additions**

| Entry | Principal connection to [Klein][Klein] | Treatment in this reference |
| --- | --- | --- |
| 2.1 Divisibility and prime factorization | Part I, III, “Concerning Special Properties of Integers”: the opening list of elementary number-theory topics, Euclid's infinitude argument, and factorization. | Prime definitions, divisor formulas, and the existence–uniqueness distinction are made explicit. The erroneous prime list in the transcription is corrected, and $1$ is excluded from the primes. |
| 2.2 Euclid and Bezout | The divisibility background assumed in Part I, III, and its later discussion of continued fractions. | The Euclidean algorithm, Bézout certificates, the ideal interpretation, and the proof of Euclid's lemma are supplied as a connected elementary development. |
| 2.3 Congruence and decimal periods | Part I, III: the discussion of periodic decimal fractions, Fermat's theorem, and the period of $1/7$. | Modular cancellation, units, zero divisors, and Euler's theorem make the algebraic conditions explicit. |
| 2.4 Simultaneous remainder conditions | Supplementary elementary number theory supporting the agreed coverage. | The Chinese remainder theorem is derived constructively, including compatibility for noncoprime moduli. |
| 2.5 Integer equations and rational points | Part I, III: the geometric construction of Pythagorean triples using lines through a rational point on the unit circle. | Missing equations are reconstructed. Coprimality and opposite parity are both required for the standard primitive-triple formulas; the linear Diophantine discussion is supplementary. |
| 2.6 Continued fractions | Part I, III: continued-fraction expansions, convergents, and the integer-lattice interpretation. | The recurrence and approximation bounds are given explicitly. Different meanings of “best approximation” are distinguished; an unqualified optimality claim is not assumed. |

The worked examples and chapter-end problems use classical problem types with independently written solutions; their numerical data and ordering are adapted for this reference. They are not presented as a verbatim exercise collection from Klein. The first chapter's new problems extend its existing concepts without changing its scope. The second chapter's Fibonacci, pseudoprime, Pell, and nonunique-factorization problems are supplementary connections; the last is an optional introduction to algebraic number theory.

The unit-circle SVG in Chapter 2 is an original drawing of the construction described by Klein. It marks the particular slope $1/2$ and the point $(3/5,4/5)$; the general parameterization and the primitive-triple conditions are established in the text.


**Chapter 3: source map and explanatory additions**

| Entry | Principal connection to [Klein][Klein] | Treatment in this reference |
| --- | --- | --- |
| 3.1 Expressions, identities, and equations | Part I's discussion of arithmetic laws; Part II's use of polynomial expressions and equations. | Domain tracking, standard identities, symmetric expressions, and the distinction between polynomial expressions and functions supply the elementary review that Klein assumes. |
| 3.2 Factorization and polynomial division | The algebraic background to Part II, especially II.A, “The fundamental theorem of algebra.” | Division, remainder and factor theorems, rational-root restrictions, and the coefficient-field distinction are developed explicitly. |
| 3.3 Reversible transformations | Part II, I, on equations in real unknowns and parameter-dependent behaviour. | Logical equivalence, radical and denominator restrictions, substitution ranges, and exceptional cases in linear systems are supplementary worked explanations. |
| 3.4 Quadratic equations and parameters | Part II, I.1, “Equations with one parameter,” especially horizontal-line intersections with a parabola; the subsequent discussion of discriminants. | Completing the square connects the formula, graph, and parameter boundary. The degree-drop example distinguishes a vanishing leading coefficient from a root collision. |
| 3.5 Roots, multiplicity, and coefficients | Part II, I, on multiple roots and discriminants; II.A on complex factorization; II.B on the relations among roots. | Vieta's formulas, formal derivatives, polynomial gcds, and a first explanation of root symmetry make these connections accessible. |
| 3.6 Exact formulas and numerical root finding | Part II's introduction on numerical and graphical solution; II.B.7, “Solution in Terms of Radicals”; II.B.8, “Reduction of General Equations to Normal Equations.” | The scope of radical-solvability restrictions follows Klein's insistence on distinguishing them from the wider solution problem. Bisection, Newton iteration, cancellation, residuals, and conditioning are supplementary numerical explanations. |

The fundamental theorem of algebra and the Abel–Ruffini theorem are stated with their scope; full proofs are not attempted here. The discussion of root symmetry introduces the question studied by Galois theory without assuming a complete theory of groups or field extensions. Chapter 3's classical problems are independently presented adaptations, including interpolation, Sophie Germain's identity, reciprocal equations, and a cubic calculation with complex intermediate quantities.

The quadratic-parameter SVG is an original plot of $y=(x-1)^2$ and the levels $y=1-\lambda$, using identical axes for $\lambda=0,1,2$. Its curves illustrate the algebraic classification established in the text. Numerical brackets, factorization identities, parameter cases, and worked answers are checked independently rather than inferred from the drawings.


**Chapter 4: source map and explanatory additions**

| Entry | Principal connection to [Klein][Klein] | Treatment in this reference |
| --- | --- | --- |
| 4.1 A function and its representations | “Concerning the Modern Development and the General Structure of Mathematics”; Part III, “Excursus Concerning the General Notion of Function,” especially the discussion of expressions, arbitrary curves, Fourier's boundary data, and assignments on sets. | The move from a special expression to a general dependence follows Klein's connecting argument. The map notation and explicit domain–codomain convention are modern formulations; the fractional-part example is supplementary. |
| 4.2 Domain, codomain, and image | The function excursus, particularly its distinction between an exact assignment and a finite-width drawing, and its concluding discussion of functions on arbitrary sets. | Natural domains, images, injectivity, surjectivity, and proofs of attainability form a systematic modern review. They are not attributed to Klein in this terminology. |
| 4.3 Composition and inverse functions | Part I's interpretation of operations as transformations; Part III's related treatment of elementary functions and their inverses. | Composition domains, inverse identities, horizontal-line tests, and branch restrictions are independently developed elementary explanations. |
| 4.4 Monotonicity, symmetry, and periodicity | Klein's recurring connection between numerical laws and geometric transformations; Part III, II, on circular functions and periodic phenomena. | Difference-based monotonicity proofs, domain qualifications, and symmetry definitions are supplementary. The periodic examples here require no trigonometry. |
| 4.5 Transformations of graphs | Part I's geometric account of addition and multiplication; the “Plan B” discussion connecting function graphs with algebra and geometry. | The affine point map consolidates translations, reflections, and scaling. Absolute-value transformations and operation-order checks are supplementary worked material. |
| 4.6 Intersections and parameters | Part II, I, “Real Equations with Real Unknowns,” especially equations with one or two parameters and their interpretation through moving intersections. | The absolute-quadratic family extends the preceding chapter's parameter analysis. Preimage notation, boundary checks, and the example of a solution escaping every bounded interval are modern explanatory additions. |

The worked examples and seven chapter-end problems have independently written solutions. The involution, symmetry decomposition, commuting affine maps, and monotone additive functional equation are supplementary classical connections. Regularity properties are distinguished from the definition of a function; Klein's discussions of analytic continuation and Fourier-series convergence are reserved for later chapters with their necessary hypotheses.

Both Chapter 4 SVGs are original mathematical plots. The inverse diagram distinguishes selected branches from excluded branches and uses equal coordinate scales so that reflection in $y=x$ is represented faithfully. The absolute-quadratic diagram shows four selected levels; the full classification, including negative parameters, is proved algebraically in the text.


**Chapter 5: source map and explanatory additions**

| Entry | Principal connection to [Klein][Klein] | Treatment in this reference |
| --- | --- | --- |
| 5.1 Extending the exponent | Part III, I.1, “Systematic Account of Algebraic Analysis,” on integer, rational, and irrational exponents and the positive-root convention; I.2 on the need to justify passages to limits. | The supremum construction and shrinking rational brackets explain the real extension using completeness. A rigorous real theory does not require complex analysis; the complex viewpoint answers additional questions about branches. |
| 5.2 Powers and roots | Part III, I.1 and I.4, “The Standpoint of Function Theory,” on principal values and the difficulties of unrestricted powers. | Reduced rational exponents, zero and negative bases, inverse branches, and failures of nested-power rules are stated under modern real conventions. The odd-root substitution is supplementary. |
| 5.3 Exponential functions | Part III, I.2: geometric progressions, small multiplicative steps, and the connection between difference equations and continuous exponentials. | Equal-ratio behaviour, the continuous exponential functional equation, and exponential-to-polynomial substitution supply the elementary review. No claim is made that discrete observations alone determine a continuous model. |
| 5.4 Logarithms as inverses | Part III, I.1 on inversion; I.2 on change of normalization; I.4 on complex logarithms, periodicity, and principal values. | Real laws are derived with their argument and base conditions. The complex preview distinguishes a principal value from a continuous branch on a restricted domain; full complex-function theory is not assumed. |
| 5.5 Linearizing multiplication and growth | Part III, I.2–3, especially the transition from rectangles to hyperbolic area and the area-preserving scaling used to derive the product law. | The area definition, normalization at $e$, and continuous-growth limit follow Klein's central connecting argument. Growth-rate comparisons, semilog and log–log coordinates, dimensionless ratios, and logarithmic derivatives are supplementary applications and calculus connections. |
| 5.6 Approximation and numerical evaluation | Part III, I.1–2 on calculating logarithms, logarithmic and exponential series, and the distinction between formal manipulations and justified convergence. | The symmetric logarithm expansion is derived from a finite geometric identity with an explicit remainder. Range reduction, exponential tail bounds, and cancellation checks are independently supplied numerical explanations. |

The seven worked examples and seven chapter-end problems have independently written solutions. The irrational-power existence proof, variable-base inequality, geometric-mean problem, multiplicative functional equation, digit count, and variable-exponent differentiation are supplementary classical material. The optional calculus problem is labelled explicitly; Chapters 10–11 provide the general foundations for the limit and differentiation results previewed here.

The supplied transcription has missing equations and at least one relevant numerical error: in I.2 it prints $(1.0001)^{10000}=2.748146$. Independent evaluation gives approximately $2.718145926825225$. The value in the transcription is not reused. The history of tables motivates geometric progressions without identifying every original logarithmic system with a modern unscaled $\log_a x$.

The two SVGs are original mathematical plots. The hyperbola diagram shows equal areas on $\lbrack 1,2\rbrack $ and $\lbrack 3,6\rbrack $, related by reciprocal horizontal and vertical scaling. The second diagram places the same exponential values on linear and logarithmic vertical scales. The decimal enclosure for $\ln2$ is checked with exact rational arithmetic; the digit-count bound for $\log_{10}2$ is checked independently.


**Draft status:** Chapters 1–5 are written, including worked examples and chapter-end problems with solutions. Chapters 6–13 remain the agreed chapter plan.


[Klein]: <../../../../todos/_10_materials/HistoryOfMathematics/Elementary Mathematics from an Advanced Standpoint Arithmetic, Algebra, Analysis (Felix Klein) (z-library.sk, 1lib.sk, z-lib.sk)/Elementary Mathematics from an Advanced Standpoint Arithmetic, Algebra, Analysis (Felix Klein) (z-library.sk, 1lib.sk, z-lib.sk).md>
[Companion]: <../../../../todos/_10_materials/HistoryOfMathematics/Companion Encyclopedia of the History and Philosophy of the Mathematical Sciences (I. Grattan-Guinness) (z-library.sk, 1lib.sk, z-lib.sk)/Companion Encyclopedia of the History and Philosophy of the Mathematical Sciences (I. Grattan-Guinness) (z-library.sk, 1lib.sk, z-lib.sk).md>
[Kline]: <../../../../todos/_10_materials/HistoryOfMathematics/Mathematical Thought from Ancient to Modern Times (3-volume-set) (Morris Kline) (z-library.sk, 1lib.sk, z-lib.sk)/Mathematical Thought from Ancient to Modern Times (3-volume-set) (Morris Kline) (z-library.sk, 1lib.sk, z-lib.sk).md>
