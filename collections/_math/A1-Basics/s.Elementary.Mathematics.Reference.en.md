---
title: "Elementary Mathematics: Review and an Advanced Standpoint"
categories: Sheet
subclass: Basics
toc_depth: 2
---

# Elementary Mathematics: Review and an Advanced Standpoint

This reference connects elementary review with the wider mathematics that explains familiar rules. It supports two uses: recovering essential knowledge quickly and understanding why the methods work, where their assumptions enter, and how they connect to other subjects.

The organizing thread is the passage between numbers, symbols, geometry, functions, and approximation. An advanced standpoint should explain an elementary operation, expose its assumptions, or connect it to another problem. More specialized results appear as short, clearly identified extensions.

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

$$
(a-b)(a+b)=b(a-b).
$$

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

$$
10x=1.666\ldots,\qquad
100x=16.666\ldots.
$$

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

$$
v_{\mathrm{avg}}
=\frac{2d}{d/60+d/40}
=48\ \mathrm{km/h}.
$$

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

$$
\alpha=\frac{p_nt+p_{n-1}}{q_nt+q_{n-1}}.
$$

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
p^{\prime}=3p+4q,\qquad q^{\prime}=2p+3q.
$$

A direct expansion shows $(p^{\prime})^2-2(q^{\prime})^2=p^2-2q^2$. The first three positive solutions are

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

$$
(f\circ g)^{-1}=g^{-1}\circ f^{-1}.
$$

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

This set notation is meaningful even when $f$ has no inverse function. In particular, $f^{-1}(\lbrace a\rbrace)$ is the full solution set of $f(x)=a$; it may be empty, contain one point, or contain many points.

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

**4.B — A function that undoes itself.** On $D=\mathbb R\setminus\lbrace1\rbrace$, let

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

Why does this agree with approximation by rationals? For $a>1$, put $m=\lfloor nx\rfloor$. Then

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

For an even positive integer $n$, the real function $\sqrt[n]{x}$ is defined for $x\ge0$ and selects the nonnegative root. For odd $n$, it is defined for every real $x$ and selects the unique real root. Consequently,

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

Set $u=\sqrt[3]{x}$. This is a bijective substitution on $\mathbb R$, and $x^{2/3}=u^2$. The equation becomes

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

Trigonometry begins with lengths and angles, but its functions describe much more than triangles. They record the coordinates of a rotating point. Complex numbers package those coordinates into a single quantity, so that rotation becomes multiplication and periodicity becomes an algebraic law.

The organizing question is **how one geometric motion can explain identities, equations, oscillations, and polynomial roots**. Along the way, signs, branches, and excluded inputs remain part of the mathematics.

### 6.1 Angles and Circular Functions

Why use radians when degrees already measure angles? For a circle of radius $r$, an angle in `radians` is the directed arc length divided by $r$:

$$
\theta=\frac{s}{r},\qquad 2\pi\text{ radians}=360^\circ.
$$

For $0\le\theta\le2\pi$, the corresponding sector has area $r^2\theta/2$. On the unit circle, its area is therefore $\theta/2$. Radians make both length and area formulas independent of an arbitrary choice of degree subdivisions.

Starting from $(1,0)$, rotate counterclockwise through $\theta$ on the unit circle. Define the endpoint to be

$$
P(\theta)=(\cos\theta,\sin\theta).
$$

Negative angles turn clockwise; adding a full turn leaves the endpoint unchanged. Consequently,

$$
\cos^2\theta+\sin^2\theta=1,\qquad
\cos(\theta+2\pi)=\cos\theta,\qquad
\sin(\theta+2\pi)=\sin\theta.
$$

Both functions have domain $\mathbb R$, image $\lbrack -1,1\rbrack $, and fundamental period $2\pi$. Reflection gives $\cos(-\theta)=\cos\theta$ and $\sin(-\theta)=-\sin\theta$. The signs are the signs of the horizontal and vertical coordinates, not extra rules detached from the picture.

![A point at angle pi over three on the unit circle, with its horizontal and vertical projections, paired with the sine graph over one full turn.]({{site.img}}/mathematics/elementary-mathematics-reference/unit-circle-sine-diagram.svg)

The right-triangle ratios follow by scaling the unit circle. For an acute angle, sine is opposite side over hypotenuse, cosine is adjacent side over hypotenuse, and tangent is opposite over adjacent. The coordinate definition extends them to every angle for which the relevant ratio is defined.

| Function | Definition | Excluded angles, $k\in\mathbb Z$ | Fundamental period |
| --- | --- | --- | --- |
| $\tan\theta$ | $\sin\theta/\cos\theta$ | $\pi/2+k\pi$ | $\pi$ |
| $\cot\theta$ | $\cos\theta/\sin\theta$ | $k\pi$ | $\pi$ |
| $\sec\theta$ | $1/\cos\theta$ | $\pi/2+k\pi$ | $2\pi$ |
| $\csc\theta$ | $1/\sin\theta$ | $k\pi$ | $2\pi$ |

Tangent and cotangent have image $\mathbb R$; secant and cosecant have image $(-\infty,-1\rbrack \cup\lbrack 1,\infty)$. Dividing the unit-circle identity gives $1+\tan^2\theta=\sec^2\theta$ and $1+\cot^2\theta=\csc^2\theta$ on their respective domains.

The standard acute values come from equilateral and isosceles right triangles:

| $\theta$ | $0$ | $\pi/6$ | $\pi/4$ | $\pi/3$ | $\pi/2$ |
| --- | --- | --- | --- | --- | --- |
| $\sin\theta$ | $0$ | $1/2$ | $\sqrt2/2$ | $\sqrt3/2$ | $1$ |
| $\cos\theta$ | $1$ | $\sqrt3/2$ | $\sqrt2/2$ | $1/2$ | $0$ |

**Worked example 6.1A — Recovering a value requires a quadrant.**

Suppose $\cos\theta=-3/5$ and $\pi<\theta<3\pi/2$. Then

$$
\sin^2\theta=1-\frac9{25}=\frac{16}{25}.
$$

The third-quadrant condition makes the vertical coordinate negative, so $\sin\theta=-4/5$ and $\tan\theta=4/3$. The reciprocal functions are $\sec\theta=-5/3$, $\csc\theta=-5/4$, and $\cot\theta=3/4$. *Taking the positive square root alone would choose the wrong point on the circle.*

The area viewpoint also explains the small-angle limit. For $0<\theta<\pi/2$, compare the triangle inside the sector, the sector itself, and the triangle bounded by the tangent line at $(1,0)$:

$$
\frac12\sin\theta<\frac12\theta<\frac12\tan\theta.
$$

Hence $\cos\theta<\sin\theta/\theta<1$, which yields $\sin\theta/\theta\to1$ as $\theta\to0$; negative inputs follow by symmetry. **Radian measure is the normalization in which the small-angle ratio tends to one.** In degrees, the corresponding ratio tends to $\pi/180$.

Related: [ratios and scaling](#14-ratios-and-scaling); [symmetry and periodicity](#44-monotonicity-symmetry-and-periodicity); [limits](#10-limits-continuity-and-infinity).

### 6.2 Identities from Rotation

Can the addition formulas be recovered instead of memorized separately? A rotation through $\theta$ sends the horizontal unit vector to $(\cos\theta,\sin\theta)$ and the vertical one to $(-\sin\theta,\cos\theta)$. Its coordinate matrix is

$$
R_\theta=
\begin{pmatrix}
\cos\theta&-\sin\theta\\
\sin\theta&\cos\theta
\end{pmatrix}.
$$

Successive rotations add their angles, so $R_\alpha R_\beta=R_{\alpha+\beta}$. Multiplying the matrices and comparing entries gives

$$
\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta,
$$

$$
\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta.
$$

**The addition formulas express composition of rotations.** Substituting $-\beta$ gives the subtraction formulas. Dividing the sine formula by the cosine formula gives

$$
\tan(\alpha+\beta)=
\frac{\tan\alpha+\tan\beta}{1-\tan\alpha\tan\beta},
$$

provided $\cos\alpha$, $\cos\beta$, and $\cos(\alpha+\beta)$ are nonzero.

Setting the angles equal yields the `double-angle formulas`:

$$
\sin2\theta=2\sin\theta\cos\theta,
\qquad
\cos2\theta=\cos^2\theta-\sin^2\theta
=1-2\sin^2\theta=2\cos^2\theta-1.
$$

Rearranging gives

$$
\sin^2\frac\theta2=\frac{1-\cos\theta}{2},
\qquad
\cos^2\frac\theta2=\frac{1+\cos\theta}{2}.
$$

*These are identities for squares; a square-root formula needs the sign of the half-angle function.* For example, $\sin(\theta/2)$ is negative when $-2\pi<\theta<0$.

Adding and subtracting addition formulas also converts products to sums and back:

$$
2\cos\alpha\cos\beta=\cos(\alpha-\beta)+\cos(\alpha+\beta),
$$

$$
2\sin\alpha\sin\beta=\cos(\alpha-\beta)-\cos(\alpha+\beta),
\qquad
2\sin\alpha\cos\beta=\sin(\alpha+\beta)+\sin(\alpha-\beta),
$$

$$
\sin\alpha+\sin\beta
=2\sin\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2}.
$$

These transformations change the form of a calculation without changing its content. They are useful for equations, finite sums, and later integration.

**Worked example 6.2A — Combine two oscillating terms into one.**

Find the largest and smallest values of $3\cos\theta+4\sin\theta$. Choose the unique first-quadrant angle $\phi$ with $\cos\phi=3/5$, $\sin\phi=4/5$. Then

$$
3\cos\theta+4\sin\theta=5\cos(\theta-\phi).
$$

The image is $\lbrack -5,5\rbrack $. The maximum occurs at $\theta=\phi+2k\pi$, and the minimum at $\theta=\phi+\pi+2k\pi$. No differentiation is required.

More generally, $A\cos\theta+B\sin\theta=R\cos(\theta-\phi)$, where $R=\sqrt{A^2+B^2}$ and, for $R>0$, $\cos\phi=A/R$, $\sin\phi=B/R$. **Amplitude is the length of the coefficient vector; phase records its direction.** If both coefficients vanish, the function is zero and phase is undetermined.

For $A\ne0$ and $\omega\ne0$, the oscillation $A\cos(\omega t+\phi)+d$ has amplitude $|A|$, midline $d$, and fundamental period $2\pi/|\omega|$. Its phase shift in the input coordinate is $-\phi/\omega$.

There is another useful simplification. With $u=\tan(\theta/2)$,

$$
\cos\theta=\frac{1-u^2}{1+u^2},
\qquad
\sin\theta=\frac{2u}{1+u^2}.
$$

These follow from the double-angle formulas and recover the rational parameterization of the circle from Chapter 2. *Finite $u$ omits $\theta=(2k+1)\pi$; those angles must be checked separately when the substitution is used to solve an equation.*

Related: [rational points on the circle](#25-integer-equations-and-rational-points); [graph transformations](#45-transformations-of-graphs); [linear structure](#7-geometry-coordinates-and-linear-structure).

### 6.3 Inverse Branches and Equations

If a circular function repeats, what can its inverse mean? It can recover a unique angle only after a branch is selected.

| Inverse function | Real input domain | Selected output interval |
| --- | --- | --- |
| $\arcsin x$ | $\lbrack -1,1\rbrack $ | $\lbrack -\pi/2,\pi/2\rbrack $ |
| $\arccos x$ | $\lbrack -1,1\rbrack $ | $\lbrack 0,\pi\rbrack $ |
| $\arctan x$ | $\mathbb R$ | $(-\pi/2,\pi/2)$ |

These are inverses of sine, cosine, and tangent restricted to the stated angle intervals. The notation $\sin^{-1}x$ sometimes means $\arcsin x$; it must not be confused with $1/\sin x=\csc x$.

**Worked example 6.3A — Inverting a value does not recover every original angle.**

The principal values are

$$
\arcsin(\sin(5\pi/6))=\arcsin(1/2)=\pi/6,
$$

$$
\arccos(\cos(5\pi/3))=\arccos(1/2)=\pi/3,
\qquad
\arctan(\tan(3\pi/4))=\arctan(-1)=-\pi/4.
$$

In each case the original angle lies outside the selected branch. **An inverse returns the branch representative of the input value.** It does not undo the information lost through symmetry or periodicity.

For all real solutions, the branch representative is only the starting point. With $k\in\mathbb Z$,

$$
\sin\theta=s:
\quad
\theta=\arcsin s+2k\pi
\quad\text{or}\quad
\theta=\pi-\arcsin s+2k\pi
\qquad(|s|\le1),
$$

$$
\cos\theta=c:
\quad
\theta=\pm\arccos c+2k\pi
\qquad(|c|\le1),
$$

$$
\tan\theta=t:
\quad
\theta=\arctan t+k\pi
\qquad(t\in\mathbb R).
$$

The sine and cosine families can coincide at endpoint values, so they describe solution sets rather than counts with multiplicity. If the input value is outside the stated image, no real angle exists.

**Worked example 6.3B — Factoring preserves a family that division would lose.**

Solve $\sin2\theta=\sin\theta$. The double-angle formula gives

$$
\sin\theta(2\cos\theta-1)=0.
$$

Thus

$$
\theta=k\pi
\quad\text{or}\quad
\theta=2k\pi\pm\pi/3.
$$

On $\lbrack 0,2\pi)$, the solutions are $0,\pi/3,\pi,5\pi/3$. *Dividing by $\sin\theta$ would discard the first family.* Squaring, replacing expressions by tangents, or using a half-angle parameter can likewise change admissible cases; each transformation needs its domain conditions.

Related: [inverse functions](#43-composition-and-inverse-functions); [equivalent equations](#33-reversible-transformations); [logarithmic branches](#54-logarithms-as-inverses).

### 6.4 Triangle Relations

Which measurements determine a triangle, and which leave a choice? Let $a,b,c$ be the positive side lengths opposite the angles $A,B,C$ of a nondegenerate Euclidean triangle. Then $A+B+C=\pi$, and each side is strictly less than the sum of the other two.

The `cosine law` is

$$
c^2=a^2+b^2-2ab\cos C,
$$

with analogous formulas obtained by cycling the labels. To derive it, put $C$ at the origin, $A=(b,0)$, and $B=(a\cos C,a\sin C)$. The squared distance $AB^2$ gives the result immediately. **Coordinates turn an angle condition into a distance calculation.**

If the area is $\Delta$ and the circumradius is $R$, then

$$
\Delta=\frac12ab\sin C
=\frac12bc\sin A
=\frac12ca\sin B,
$$

$$
\frac a{\sin A}=\frac b{\sin B}=\frac c{\sin C}=2R.
$$

The first equalities come from base times altitude. Comparing them proves the ratios in the `sine law`; the chord relation $a=2R\sin A$ identifies the common ratio with the diameter of the circumcircle.

Three sides, if they satisfy the strict triangle inequalities, determine the angles by the cosine law. Two sides and their included angle also determine a triangle up to reflection. Two angles determine only shape until a side length fixes scale.

*Two sides and an angle opposite one of them—the SSA data—can give zero, one, or two triangles.* The sine law may produce two supplementary candidates for an angle. Each must still be positive and leave room for the third angle.

**Worked example 6.4A — Two valid triangles from the same SSA data.**

Suppose

$$
A=\pi/6,\qquad a=7,\qquad b=10.
$$

The sine law gives $\sin B=5/7$. Writing $B_0=\arcsin(5/7)$, the candidates are $B_0$ and $\pi-B_0$. Since $\pi/6<B_0<\pi/2$, both satisfy $A+B<\pi$ and both yield a positive third angle.

The cosine law at $A$ determines the two possible remaining sides directly:

$$
49=100+c^2-10\sqrt3\,c,
\qquad
c^2-10\sqrt3\,c+51=0,
$$

$$
c=5\sqrt3\pm2\sqrt6.
$$

Both values are positive. Geometrically, fix $A=(0,0)$ and $C=(5\sqrt3,5)$. A circle of radius $7$ about $C$ meets the positive horizontal ray from $A$ at two points, the two possible positions of $B$.

![Two positions of B on the same ray from A, both seven units from C, giving two triangles with angle A equal to pi over six and side AC equal to ten.]({{site.img}}/mathematics/elementary-mathematics-reference/triangle-ssa-ambiguity-diagram.svg)

**Retain every inverse-sine candidate that satisfies the triangle conditions, or count the geometric intersections.** A calculator's principal inverse value by itself does not settle uniqueness.

The Euclidean setting matters. On a sphere, take two meridian arcs from the north pole to equatorial points $90^\circ$ apart and join their endpoints by the quarter-equator arc. The resulting triangle has three right angles. Thus the plane rule $A+B+C=\pi$ cannot be transferred unchanged to triangles whose sides are great-circle arcs. Geometry supplies the hypotheses under which a trigonometric formula describes a figure.

Related: [inverse branches](#63-inverse-branches-and-equations); [parameter-dependent intersections](#46-intersections-and-parameter-dependent-behaviour); [geometry and coordinates](#7-geometry-coordinates-and-linear-structure).

### 6.5 Complex Arithmetic and Geometry

What if a point and an operation on points could be written in the same notation? Define a complex number as a real pair,

$$
z=x+iy,\qquad i^2=-1.
$$

Addition is coordinatewise, and multiplication is

$$
(x+iy)(u+iv)=(xu-yv)+i(xv+yu).
$$

These rules extend real arithmetic. The `conjugate` and `modulus` are

$$
\overline z=x-iy,\qquad |z|=\sqrt{x^2+y^2},
\qquad z\overline z=|z|^2.
$$

For $z\ne0$,

$$
\frac1z=\frac{\overline z}{|z|^2}.
$$

This proves that every nonzero complex number has a unique reciprocal. *The denominator is $x^2+y^2$, which vanishes only when both coordinates vanish.* There is no order on $\mathbb C$ compatible with the ordered-field laws: every nonzero square would have to be positive, contradicting $i^2=-1$.

Geometrically, addition combines displacement vectors, conjugation reflects across the real axis, and $|z-w|$ is the distance between points. The ordinary triangle inequality becomes $|z+w|\le|z|+|w|$.

For a nonzero number, the `polar form` is

$$
z=r(\cos\theta+i\sin\theta),
\qquad r=|z|>0.
$$

Its `argument` is determined only modulo $2\pi$; zero has no argument. *Using $\arctan(y/x)$ without a quadrant check is insufficient:* for $-1+i$ it suggests $-\pi/4$, whereas an argument is $3\pi/4$.

The addition formulas show that

$$
(\cos\alpha+i\sin\alpha)(\cos\beta+i\sin\beta)
=\cos(\alpha+\beta)+i\sin(\alpha+\beta).
$$

Thus **complex multiplication multiplies lengths and adds angles**:

$$
|zw|=|z||w|,
\qquad
\arg(zw)\equiv\arg z+\arg w\pmod{2\pi}.
$$

Division divides lengths and subtracts angles. Multiplication by a fixed nonzero number is a rotation and a uniform scaling about the origin; $z\mapsto az+b$, with $a\ne0$, adds a translation.

**Worked example 6.5A — A quotient that is a quarter-turn.**

Evaluate

$$
\left(\frac{1+i}{1-i}\right)^{10}.
$$

Multiplying numerator and denominator by $1+i$ gives

$$
\frac{1+i}{1-i}=\frac{(1+i)^2}{2}=i.
$$

The answer is $i^{10}=-1$. In polar terms, numerator and denominator have equal lengths and arguments $\pi/4$ and $-\pi/4$. Their quotient has length one and angle $\pi/2$; ten quarter-turns have angle $5\pi$, equivalent to $\pi$.

The connection to Chapter 5 is `Euler's formula`:

$$
e^{i\theta}=\cos\theta+i\sin\theta.
$$

It is more than convenient notation. Using the power-series representations justified in Chapter 11, absolute convergence permits the even and odd terms to be separated:

$$
e^{i\theta}
=\sum_{n=0}^{\infty}\frac{(-1)^n\theta^{2n}}{(2n)!}
+i\sum_{n=0}^{\infty}\frac{(-1)^n\theta^{2n+1}}{(2n+1)!}
=\cos\theta+i\sin\theta.
$$

Consequently, $e^{x+iy}=e^x(\cos y+i\sin y)$: the real part of the exponent controls magnitude, and the imaginary part controls rotation. **Exponential scaling and circular motion are two aspects of one complex function.** Its period $2\pi i$ explains why a complex logarithm requires branches.

The parallel with the hyperbola is explicit in

$$
\cosh t=\frac{e^t+e^{-t}}2,\qquad
\sinh t=\frac{e^t-e^{-t}}2,\qquad
\cosh^2t-\sinh^2t=1.
$$

The same series give $\cos(it)=\cosh t$ and $\sin(it)=i\sinh t$. *The bounds $|\sin\theta|\le1$ and $|\cos\theta|\le1$ concern real angles; they do not hold for arbitrary complex inputs.*

**Optional extension — rotations in space.** Rotations of a plane about the origin commute, but rotations about different axes in three-dimensional space generally do not. `Quaternions` provide an arithmetic suited to this difference. They have the form $a+bi+cj+dk$, with

$$
i^2=j^2=k^2=-1,\qquad
ij=k,\quad jk=i,\quad ki=j,
$$

and reversing any product of two distinct imaginary units changes its sign.

Identify a spatial vector with a pure quaternion $v=xi+yj+zk$. If $u$ is a unit vector in the axis direction, the unit quaternion

$$
q=\cos(\theta/2)+u\sin(\theta/2)
$$

represents a rotation through $\theta$ by $v\mapsto qvq^{-1}$. The quaternions $q$ and $-q$ produce the same rotation. This is a preview of a representation, not a claim that ordinary left multiplication by $q$ alone rotates the three-dimensional vector space. Problem 6.G exhibits the dependence on operation order.

Related: [number extensions](#11-number-systems-and-closure); [complex logarithms](#54-logarithms-as-inverses); [coordinates and linear maps](#7-geometry-coordinates-and-linear-structure).

### 6.6 Roots of Unity and Periodicity

How does repeated rotation become a polynomial equation? From multiplication of polar forms, `De Moivre's formula` follows for every integer $n$:

$$
(\cos\theta+i\sin\theta)^n
=\cos(n\theta)+i\sin(n\theta).
$$

For negative integers, use reciprocals. *A fractional exponent cannot simply be substituted into this identity while ignoring the choice of root.*

Let $w=re^{i\phi}\ne0$ and let $n$ be a positive integer. To solve $z^n=w$, compare magnitudes and arguments. The complete list is

$$
z_k=r^{1/n}e^{i(\phi+2\pi k)/n},
\qquad k=0,1,\ldots,n-1.
$$

These are distinct, and any other integer $k$ repeats one of them. They lie at equally spaced angles on the circle of radius $r^{1/n}$. If $w=0$, the only root is $z=0$.

**Worked example 6.6A — All cube roots of a nonreal number.**

Since $8i=8e^{i\pi/2}$, the solutions of $z^3=8i$ have modulus $2$ and arguments

$$
\pi/6,\qquad 5\pi/6,\qquad 3\pi/2.
$$

Therefore

$$
z=\sqrt3+i,\qquad -\sqrt3+i,\qquad -2i.
$$

The three points form an equilateral triangle centred at zero. One can check the list by factoring

$$
z^3-8i=(z+2i)(z^2-2iz-4).
$$

**Taking one principal root produces one solution; distributing the argument by all full turns produces every solution.**

![The three roots of z cubed equals 8i on the circle of radius two, at angles pi over six, five pi over six, and three pi over two.]({{site.img}}/mathematics/elementary-mathematics-reference/complex-cube-roots-diagram.svg)

When $w=1$, the roots are the `roots of unity`. For $n\ge2$, set $\zeta=e^{2\pi i/n}$; then $1,\zeta,\ldots,\zeta^{n-1}$ are the vertices of a regular $n$-gon. Multiplication rotates this set, and exponents are added modulo $n$. The `order` of $\zeta^k$ is $n/\gcd(n,k)$, so it is a `primitive root of unity` exactly when $\gcd(n,k)=1$. This is a geometric realization of the cyclic group of residues under addition.

The geometric-sum identity gives the exact cancellation rule

$$
\sum_{j=0}^{n-1}\zeta^{jm}
=
\begin{cases}
n,&n\mid m,\\
0,&n\nmid m.
\end{cases}
$$

In the second case, the ratio is not $1$, while its $n$th power is $1$, so the sum is $(1-\zeta^{mn})/(1-\zeta^m)=0$.

This rule does more than sum points. For arbitrary complex data $a_0,\ldots,a_{n-1}$, define

$$
\widehat a_m=\frac1n\sum_{j=0}^{n-1}a_j\zeta^{-mj},
\qquad m=0,\ldots,n-1.
$$

Then

$$
a_j=\sum_{m=0}^{n-1}\widehat a_m\zeta^{mj}.
$$

Substitution reduces the inverse formula to the cancellation rule: all indices except the matching one contribute zero. This is the `discrete Fourier transform` with a stated normalization. **A finite pattern can be decomposed exactly into circular modes because those modes cancel against one another in a controlled way.**

For real data, conjugate modes combine into sines and cosines. *An exact reconstruction of finitely many samples does not determine an arbitrary function between them.* Infinite Fourier series introduce further questions about convergence and approximation; Chapter 11 treats those separately.

Related: [congruence](#23-congruence-cancellation-and-decimal-periods); [polynomial roots](#35-roots-multiplicity-and-coefficients); [finite sums](#9-sequences-finite-sums-and-counting); [trigonometric series](#11-calculus-differential-equations-and-approximation).

### 6.7 Classical Problems and Extensions

Try the problems before reading the solution notes. Problem 6.F uses the binomial theorem, and 6.G is an optional extension of the quaternion discussion.

**6.A — Exact values from different identities.** Find exact expressions for $\sin(\pi/12)$ and $\sin(\pi/8)$. Use an angle difference for the first and a half-angle identity for the second. Explain the sign choice in each result.

**6.B — An inverse-tangent identity with a sign condition.** Prove that, for real $x\ne0$,

$$
\arctan x+\arctan(1/x)=
\begin{cases}
\pi/2,&x>0,\\
-\pi/2,&x<0.
\end{cases}
$$

Why is applying the tangent addition formula directly a poor way to finish the argument?

**6.C — A triangle identity from its angle sum.** For the angles of a Euclidean triangle, prove

$$
\sin A+\sin B+\sin C
=4\cos(A/2)\cos(B/2)\cos(C/2).
$$

Identify where the triangle condition enters.

**6.D — The regular pentagon and a quadratic equation.** Let $\zeta=e^{2\pi i/5}$. Starting from $1+\zeta+\zeta^2+\zeta^3+\zeta^4=0$, derive an equation for $u=\zeta+\zeta^{-1}$. Hence find $\cos(2\pi/5)$ exactly, choosing the correct root.

**6.E — A circle turned into a line.** For $z\ne-1$, determine the locus on which

$$
w=\frac{z-1}{z+1}
$$

is purely imaginary, including the value zero. Put $w=it$ with $t\in\mathbb R$ and solve for $z$. Relate the resulting coordinates to the half-angle formulas.

**6.F — Selecting every third binomial coefficient.** Evaluate

$$
\binom{12}{0}+\binom{12}{3}+\binom{12}{6}
+\binom{12}{9}+\binom{12}{12}
$$

using a nonreal cube root of unity rather than calculating the five coefficients separately. Explain how the same method works for a general nonnegative integer exponent.

**6.G — Two quarter-turns in different orders.** Let

$$
q_x=\frac{1+i}{\sqrt2},\qquad
q_y=\frac{1+j}{\sqrt2}.
$$

They represent positive quarter-turns about the $x$- and $y$-axes through $v\mapsto qvq^{-1}$. Starting from the vector $v=k$, calculate the result of the $x$-rotation followed by the $y$-rotation, and then reverse the order. Use quaternion multiplication to explain the difference.

**Solution notes**

**6.A.** Subtract the standard angles $\pi/4$ and $\pi/6$:

$$
\sin\frac{\pi}{12}
=\sin\frac\pi4\cos\frac\pi6-\cos\frac\pi4\sin\frac\pi6
=\frac{\sqrt6-\sqrt2}{4}.
$$

For the second angle,

$$
\sin^2\frac\pi8=\frac{1-\cos(\pi/4)}2
=\frac{2-\sqrt2}{4}.
$$

Because $\pi/8$ is in the first quadrant,

$$
\sin\frac\pi8=\frac{\sqrt{2-\sqrt2}}2.
$$

Both sines are positive. In the first formula the positive difference already follows from $\sqrt6>\sqrt2$; in the second, the quadrant selects the positive square root.

**6.B.** Put $\alpha=\arctan x$ and $\beta=\arctan(1/x)$. Their cosines are positive, and $\tan\alpha\tan\beta=1$, so

$$
\cos(\alpha+\beta)
=\cos\alpha\cos\beta(1-\tan\alpha\tan\beta)=0.
$$

If $x>0$, the sum lies in $(0,\pi)$ and must be $\pi/2$. If $x<0$, it lies in $(-\pi,0)$ and must be $-\pi/2$. The tangent addition expression has zero denominator here, so it supplies no defined real value from which to recover the angle. **Combine an identity with the known branch interval to distinguish the possible angles.**

**6.C.** Since $A+B=\pi-C$,

$$
\sin A+\sin B
=2\cos(C/2)\cos((A-B)/2),
$$

$$
\sin C
=2\cos(C/2)\cos((A+B)/2).
$$

Adding and using the product-to-sum identity in reverse gives

$$
\sin A+\sin B+\sin C
=2\cos(C/2)
\left(\cos\frac{A-B}{2}+\cos\frac{A+B}{2}\right)
=4\cos(A/2)\cos(B/2)\cos(C/2).
$$

The replacements involving $C$ use the Euclidean angle sum. *The algebraic identity is not a statement about three unrelated angles.*

**6.D.** Divide the sum of the five roots by $\zeta^2$:

$$
(\zeta^2+\zeta^{-2})+(\zeta+\zeta^{-1})+1=0.
$$

Since $\zeta^2+\zeta^{-2}=u^2-2$, we obtain $u^2+u-1=0$. Also $u=2\cos(2\pi/5)>0$, so

$$
u=\frac{\sqrt5-1}{2},
\qquad
\cos\frac{2\pi}{5}=\frac{\sqrt5-1}{4}.
$$

**Pair a root of unity with its conjugate to replace a complex equation by an equation for a real cosine.** This is one connection between regular polygons and algebraic equations, developed further in Chapter 7.

**6.E.** Multiplying by the conjugate of the denominator gives

$$
\operatorname{Re}\frac{z-1}{z+1}
=\frac{|z|^2-1}{|z+1|^2}.
$$

The denominator is positive for $z\ne-1$. Thus the locus is the unit circle with $-1$ removed. Setting $w=it$ gives

$$
z=\frac{1+it}{1-it}
=\frac{1-t^2}{1+t^2}
+i\frac{2t}{1+t^2}.
$$

The denominator never vanishes for real $t$. These are exactly the circle coordinates obtained from $t=\tan(\theta/2)$. The missing point $-1$ is approached as $|t|$ grows without bound.

**A rational change of variable turns a circle, with one point removed, into a line.** This `linear fractional transformation` explains why the same parameterization appears in rational points, trigonometric substitutions, and complex geometry.

**6.F.** Let $\omega=e^{2\pi i/3}$. Then

$$
1+\omega^j+\omega^{2j}
=
\begin{cases}
3,&3\mid j,\\
0,&3\nmid j.
\end{cases}
$$

Multiplying each binomial coefficient by this expression selects precisely the required indices. By the binomial theorem, the desired sum $S$ satisfies

$$
3S=2^{12}+(1+\omega)^{12}+(1+\omega^2)^{12}.
$$

But $1+\omega=e^{i\pi/3}$ and $1+\omega^2=e^{-i\pi/3}$, so both twelfth powers equal $1$. Hence

$$
S=\frac{4096+2}{3}=1366.
$$

For a general nonnegative integer $n$, the same calculation gives

$$
\sum_{\substack{0\le j\le n\\3\mid j}}\binom nj
=\frac{2^n+2\cos(n\pi/3)}3.
$$

**Use roots of unity as an exact filter for congruence conditions.** The trigonometric term is forced by the two nonreal modes, while the final result is an integer count.

**6.G.** Because the quaternions are of unit length, their inverses are obtained by changing the signs of their imaginary parts. Direct multiplication gives

$$
q_xkq_x^{-1}=-j,\qquad
q_ykq_y^{-1}=i.
$$

Rotation about the $y$-axis fixes $j$, and rotation about the $x$-axis fixes $i$. Therefore

$$
R_y(R_x(k))=-j,
\qquad
R_x(R_y(k))=i.
$$

The composite rotations are represented, in the same order as function composition, by

$$
q_yq_x=\frac{1+i+j-k}{2},
\qquad
q_xq_y=\frac{1+i+j+k}{2}.
$$

Their different actions on $k$ prove that they are different rotations. **Noncommutativity records the geometry of rotations about different axes.** The quaternion extension preserves associative multiplication and division by nonzero elements while giving up commutativity.

## 7. Geometry, Coordinates, and Linear Structure

What makes a geometric argument work: the picture, the equations, or the relations that survive a change of picture? A diagram suggests a configuration; a proof identifies the conditions that force it. Coordinates and vectors then make some of those conditions easier to calculate.

The guiding method is **to choose a representation that exposes the relevant invariant**: an angle, a ratio, an area, a perpendicularity relation, or an algebraic restriction. The [chapter-end problems](#77-classical-problems-and-extensions) connect these viewpoints through classical constructions and proofs.

### 7.1 Synthetic Relations and Geometric Proof

In `synthetic geometry`, we reason directly with points, lines, angles, and circles. Unless stated otherwise, this chapter concerns Euclidean geometry; triangles are nondegenerate and lengths are nonnegative. **A drawing illustrates the hypotheses; its apparent symmetry or scale is not an additional hypothesis.**

Two figures are `congruent` when a distance-preserving motion, possibly including a reflection, carries one onto the other. For triangles, the standard criteria are `SSS`, `SAS`, and `ASA`; two angles and a corresponding side also suffice because the third angle is determined. Right triangles additionally admit the hypotenuse–leg criterion. *Two sides and a nonincluded angle can give two different triangles*, as the [SSA example](#64-triangle-relations) demonstrated.

Triangles are `similar` when corresponding angles agree and corresponding lengths have one common positive ratio. The criteria are AA, proportional SSS, and proportional SAS. Drawing a parallel line often creates the pair of similar triangles needed to turn an angle relation into a proportion.

For a triangle with side lengths $a,b,c$ opposite $A,B,C$, retain the following connected facts:

| Relation | Formula or construction | Why it is useful |
| --- | --- | --- |
| Pythagoras | $a^2+b^2=c^2$ when $C=\pi/2$; the converse also holds | Converts perpendicularity into a length equation. |
| Cosine rule | $c^2=a^2+b^2-2ab\cos C$ | Extends Pythagoras to an arbitrary included angle. |
| Internal angle bisector | If $AD$ bisects $A$ and $D$ lies on $BC$, then $BD/DC=AB/AC$ | Converts equal angles into a side ratio. |
| Triangle area | $\Delta=bh/2=ab\sin C/2$ | Compares triangles sharing a base or altitude. |
| Incircle and circumcircle | $\Delta=rs=abc/(4R)$, where $s=(a+b+c)/2$ | Connects side lengths with the inradius $r$ and circumradius $R$. |

For example, the angle-bisector theorem follows by taking the ratio of the areas of $ABD$ and $ACD$. Their common altitude to $BC$ gives the ratio $BD/DC$; the sine-area formula gives $AB/AC$ because the included angles at $A$ are equal. Similarly, joining the incenter to the vertices gives $\Delta=r(a+b+c)/2$. **Area is often an intermediary between a diagram and a ratio.**

For circles, the central angle subtending an arc is twice an inscribed angle subtending that same arc. Consequently, an angle in a semicircle is right, and opposite angles of a cyclic quadrilateral sum to $\pi$. Equal chords subtend equal minor central angles; the perpendicular from the center to a chord bisects it. At a point of tangency, the radius is perpendicular to the tangent.

A particularly reusable relation is `power of a point`. For a circle of center $O$ and radius $r$, define

$$
\operatorname{Pow}(P)=PO^2-r^2.
$$

If an oriented line through $P$ meets the circle at $A,B$, and $t_A,t_B$ are their signed distances from $P$ along that line, then

$$
t_A t_B=\operatorname{Pow}(P).
$$

The product is independent of the chosen secant. Outside the circle, the familiar positive-length form is $PA\cdot PB=PT^2$, where $PT$ is a tangent. Inside, the signed product is negative; using ordinary chord lengths instead gives $PA\cdot PB=r^2-PO^2$.

**Worked example 7.1 — A tangent length without finding the center**

From an exterior point $P$, a secant meets the circle first at $A$ and then at $B$, with $PA=3$ and $PB=12$. If $PT$ is tangent, the tangent–chord angle relation makes triangles $PTA$ and $PBT$ similar, so

$$
\frac{PT}{PB}=\frac{PA}{PT},
\qquad PT^2=PA\cdot PB=36,
\qquad PT=6.
$$

**Identify similar triangles before multiplying lengths.** Here $PB=12$ is the whole distance from $P$ to the farther intersection. *Replacing it by the internal chord length $AB=9$ would use the wrong segment.*

The synthetic proof explains the relationship through angles. The coordinate proof in Section 7.3 will explain the same invariant through the product of two roots.

Related: [triangle relations](#64-triangle-relations); [ratios and scaling](#14-ratios-and-scaling); [vectors](#74-vectors-and-projection).

### 7.2 Similarity and Measurement

Why does doubling every length multiply volume by eight? A `similarity` has one length factor $k>0$, so lengths, areas, and volumes scale as

$$
L\mapsto kL,\qquad A\mapsto k^2A,\qquad V\mapsto k^3V.
$$

The exponents count independent directions of measurement. **Dimension and scaling provide immediate checks on a proposed formula**, although they cannot determine a dimensionless constant such as $1/3$.

The following formulas assume ordinary Euclidean area and volume. Heights are perpendicular distances; a sloping edge is not automatically a height.

| Figure or solid | Area or volume |
| --- | --- |
| Parallelogram; trapezoid with parallel sides $a,b$ | $A=bh$; $A=(a+b)h/2$ |
| Triangle with semiperimeter $s$ | $A=\sqrt{s(s-a)(s-b)(s-c)}$ |
| Circle; sector of angle $\theta$ in radians | $A=\pi r^2$; $A=r^2\theta/2$ |
| Prism or cylinder of base area $B$ | $V=Bh$ |
| Pyramid or cone of base area $B$ | $V=Bh/3$ |
| Sphere | $V=4\pi r^3/3$; surface area $S=4\pi r^2$ |

The triangle formula is `Heron's formula`. It can be recovered from the cosine rule and $A=ab\sin C/2$ by factoring $16A^2$ into $(a+b+c)(-a+b+c)(a-b+c)(a+b-c)$. *The side lengths must satisfy the strict triangle inequalities; a formal expression does not establish that the triangle exists.*

For a right circular cylinder, lateral area is $2\pi rh$; for a right circular cone, it is $\pi r\ell$, where $\ell=\sqrt{r^2+h^2}$ is the slant height. Bases must be added when total surface area is wanted. Volume and surface area therefore depend on different geometric data.

**Worked example 7.2 — The volume of a conical frustum**

A right circular cone is cut parallel to its base, leaving a frustum of height $h$, lower radius $R$, and upper radius $r$, with $0<r<R$. Let $H$ be the height of the original cone and $H-h$ that of the removed cone. Similarity gives

$$
\frac{H-h}{H}=\frac rR,\qquad H=\frac{hR}{R-r}.
$$

Subtracting the two cone volumes yields

$$
V=\frac{\pi}{3}\left(R^2H-r^2(H-h)\right)
=\frac{\pi h}{3}(R^2+Rr+r^2).
$$

For $R=3$, $r=1$, and $h=4$, this is $52\pi/3$. **Recover a familiar solid by extending the sides, then use similarity and subtraction.**

*Multiplying height by the average of the two end areas would give $20\pi$, which is incorrect.* Radius varies linearly with height, but cross-sectional area varies quadratically. The formula has the expected cone limit as $r\to0$ and cylinder limit as $r\to R$.

The broader principle is `Cavalieri's principle`: two solids of the same height have equal volume if their cross-sections at every corresponding height have equal areas. The sections need not be congruent. More generally, if $A(z)$ is the cross-sectional area, calculus expresses the volume as

$$
V=\int_0^h A(z)\,dz.
$$

For a cone measured from its apex, similarity gives $A(z)=B(z/h)^2$; integration explains the factor $1/3$. **Similarity determines the section sizes; accumulation determines the volume.** A diagram of thin slices suggests this argument, but a limiting principle is needed to justify passing from slices to the whole solid.

Related: [measurement and error](#16-exact-values-and-measured-quantities); [integration](#11-calculus-differential-equations-and-approximation).

### 7.3 Coordinate Descriptions and Loci

A `locus` is the set of all points satisfying a condition. A successful coordinate solution must establish both directions: every required point satisfies the equation, and every admitted solution satisfies the original condition. *Squaring a distance equation can introduce an extra branch if sign restrictions are discarded.*

Choose an origin and perpendicular unit axes. Then

$$
PQ^2=(x_P-x_Q)^2+(y_P-y_Q)^2.
$$

A line has equation $ax+by=c$, where $(a,b)\ne(0,0)$; this includes vertical lines that cannot be written as $y=mx+b$. A circle has equation

$$
(x-h)^2+(y-k)^2=r^2.
$$

Completing the square converts $x^2+y^2+Dx+Ey+F=0$ to this form, with center $(-D/2,-E/2)$ and $r^2=(D^2+E^2)/4-F$. A positive value gives a circle, zero a single point, and a negative value no real points.

Power of a point now follows from one calculation. Write a line through $P$ as $X=P+t\mathbf u$, where $\|\mathbf u\|=1$. Substitution into $\|X-O\|^2=r^2$ gives

$$
t^2+2\mathbf u\cdot(P-O)t+\|P-O\|^2-r^2=0.
$$

By Vieta's formula, the product of the two intersection parameters is $\|P-O\|^2-r^2$, independent of $\mathbf u$. **A geometric invariant becomes a coefficient of a quadratic equation.** The dot product used here is developed in the next section.

A `conic` admits several descriptions: a plane section of a cone, a distance condition, or a quadratic equation. The following standard forms use axes through the center or vertex:

| Curve | Standard equation and conditions | Geometric data |
| --- | --- | --- |
| Circle | $x^2+y^2=R^2$, $R>0$ | Center $(0,0)$; radius $R$. |
| Ellipse | $x^2/a^2+y^2/b^2=1$, $a>b>0$ | Foci $(\pm c,0)$, $c^2=a^2-b^2$; sum of focal distances $2a$. |
| Parabola | $y^2=4px$, $p>0$ | Focus $(p,0)$; directrix $x=-p$; equal distances to the two. |
| Hyperbola | $x^2/a^2-y^2/b^2=1$, $a,b>0$ | Foci $(\pm c,0)$, $c^2=a^2+b^2$; absolute difference of focal distances $2a$. |

Interchanging $x$ and $y$ changes the axis direction; translations replace them by $x-h,y-k$. For the hyperbola, the asymptotes are $y=\pm(b/a)x$. These are approached along the branches, not additional parts of the curve.

A focus and a line called a `directrix` unify the three noncircular cases through

$$
PF=e\,d(P,\ell),
$$

where the `eccentricity` satisfies $0<e<1$ for an ellipse, $e=1$ for a parabola, and $e>1$ for a hyperbola. For the standard ellipse and hyperbola, $e=c/a$ and the directrix paired with the right-hand focus is $x=a/e$. A circle has eccentricity zero in the limiting classification; it does not have a finite focus–directrix representation of this form.

![Ellipse, parabola, and hyperbola in equal-scale Cartesian axes within each panel, with a focus, directrix, and the two distances in the eccentricity condition.]({{site.img}}/mathematics/elementary-mathematics-reference/conic-focus-directrix-diagram.svg)

**Worked example 7.3 — Recovering a parabola from its defining distances**

Let the focus be $(2,0)$ and the directrix $x=-2$. For $P=(x,y)$, the locus condition is

$$
\sqrt{(x-2)^2+y^2}=|x+2|.
$$

Both sides are nonnegative, so squaring is reversible:

$$
(x-2)^2+y^2=(x+2)^2
\quad\Longleftrightarrow\quad y^2=8x.
$$

Conversely, $y^2=8x$ forces $x\ge0$ and restores the equality of distances. The vertex is $(0,0)$; a parameterization is $(x,y)=(2t^2,4t)$ for all real $t$.

**Translate the metric condition first, then justify the algebraic equivalence.** The equation $y^2=8x$ describes both halves of one parabola; $y=\sqrt{8x}$ alone describes only its upper half.

For the ellipse, the connection with focal distances is equally concrete. If $x^2/a^2+y^2/b^2=1$ and $c^2=a^2-b^2$, then

$$
(x-c)^2+y^2=\left(a-\frac ca x\right)^2,
\qquad
(x+c)^2+y^2=\left(a+\frac ca x\right)^2.
$$

Because $|x|\le a$ and $c<a$, the expressions on the right before squaring are positive. Thus the distances are $a-ex$ and $a+ex$, whose sum is $2a$. Reversing the derivation recovers the equation from the sum condition. Replacing $c^2=a^2-b^2$ by $c^2=a^2+b^2$ gives the corresponding hyperbola calculation, with absolute values retained.

How can we recognize a conic written in unfamiliar coordinates? For a quadratic equation

$$
Ax^2+Bxy+Cy^2+Dx+Ey+F=0,
$$

a rotation diagonalizes its quadratic part, and completing squares then identifies its center or vertex. The sign of $B^2-4AC$ distinguishes elliptic, parabolic, and hyperbolic quadratic parts. *It does not by itself guarantee a nondegenerate real curve.* For example, $x^2+y^2=-1$ has no real points, and $x^2-y^2=0$ is a pair of lines. For a nondegenerate real conic, the signs $<0$, $=0$, and $>0$ correspond respectively to ellipse, parabola, and hyperbola.

This suggests a useful distinction. A rotation of orthonormal coordinates preserves the distance formula. Stretching one coordinate can make an ellipse equation look like a circle equation, but the new coordinates no longer have the same Euclidean unit scale. **A simpler equation need not mean an unchanged metric.**

Related: [quadratic equations](#34-quadratic-equations-and-parameters); [rational parameterization](#25-integer-equations-and-rational-points); [transformations](#75-linear-systems-and-transformations).

### 7.4 Vectors and Projection

A point specifies a position; a `vector` specifies a displacement. The difference $B-A$ is a vector independent of the origin, while the coordinates assigned to either point depend on the chosen origin. Points can be translated by vectors; adding two position vectors without specifying an origin has no intrinsic geometric meaning.

Vectors add by the parallelogram rule and scale componentwise. Their linear combinations form a `vector space`. In $\mathbb R^n$ with orthonormal coordinates, the `dot product` and norm are

$$
\mathbf u\cdot\mathbf v=\sum_{i=1}^n u_iv_i,
\qquad
\|\mathbf u\|=\sqrt{\mathbf u\cdot\mathbf u}.
$$

For nonzero vectors,

$$
\mathbf u\cdot\mathbf v=\|\mathbf u\|\,\|\mathbf v\|\cos\theta.
$$

Thus perpendicularity means zero dot product. Expanding $\|\mathbf u-\mathbf v\|^2$ recovers the cosine rule. **The dot product packages lengths, angles, and orthogonality into one algebraic operation.**

A line through $A$ with nonzero direction $\mathbf u$ has vector equation $X=A+t\mathbf u$. To find the perpendicular projection of a point $P$, write $\mathbf w=P-A$ and require the remaining displacement to be perpendicular to $\mathbf u$:

$$
(\mathbf w-t\mathbf u)\cdot\mathbf u=0.
$$

Hence

$$
t=\frac{\mathbf w\cdot\mathbf u}{\mathbf u\cdot\mathbf u},
\qquad
Q=A+\frac{(P-A)\cdot\mathbf u}{\|\mathbf u\|^2}\mathbf u.
$$

The vector $\operatorname{proj}_{\mathbf u}\mathbf w=t\mathbf u$ is the `orthogonal projection` of the displacement. The scalar component along the unit direction is instead $\mathbf w\cdot\mathbf u/\|\mathbf u\|$.

**Worked example 7.4 — The closest point on a line**

Find the point on $X=(1,0)+t(2,1)$ closest to $P=(4,3)$. Here $\mathbf w=(3,3)$, so

$$
t=\frac{(3,3)\cdot(2,1)}{2^2+1^2}=\frac95,
\qquad
Q=\left(\frac{23}{5},\frac95\right),
\qquad
\|P-Q\|=\frac3{\sqrt5}.
$$

Why is this a minimum, rather than merely a point satisfying one equation? For any other point $X$ on the line, $P-Q$ is perpendicular to $Q-X$, so

$$
\|P-X\|^2=\|P-Q\|^2+\|Q-X\|^2\ge\|P-Q\|^2.
$$

**Orthogonal decomposition supplies both the answer and a certificate that it is closest.** Equality holds only at $X=Q$.

The same calculation gives familiar distance formulas:

$$
d\bigl(P,\ ax+by=c\bigr)
=\frac{|ax_P+by_P-c|}{\sqrt{a^2+b^2}},
$$

$$
d\bigl(P,\ \mathbf n\cdot X=d_0\bigr)
=\frac{|\mathbf n\cdot P-d_0|}{\|\mathbf n\|},
\qquad \mathbf n\ne\mathbf0.
$$

The second describes a plane in three dimensions, with normal vector $\mathbf n$. Two independent vectors $\mathbf u,\mathbf v$ spanning the plane give the alternative parameterization $X=A+s\mathbf u+t\mathbf v$.

In $\mathbb R^3$, the `cross product`

$$
\mathbf u\times\mathbf v
=(u_2v_3-u_3v_2,\ u_3v_1-u_1v_3,\ u_1v_2-u_2v_1)
$$

is perpendicular to both vectors. Its magnitude is their parallelogram area, and $|\mathbf u\cdot(\mathbf v\times\mathbf w)|$ is their parallelepiped volume. Interchanging two vectors reverses the orientation sign. *This particular vector-valued cross product is a three-dimensional construction; dot products and orthogonal projection work in every finite dimension.*

The higher viewpoint also clarifies an assumption hidden in coordinate formulas. In a general basis $\mathbf e_1,\ldots,\mathbf e_n$, let $G_{ij}=\mathbf e_i\cdot\mathbf e_j$. For coordinate columns $u,v$,

$$
\mathbf u\cdot\mathbf v=u^{\mathsf T}Gv.
$$

The `Gram matrix` $G$ is the identity only for an orthonormal basis. *Adding the squares of coordinates measures Euclidean length only when the coordinate basis has the required metric normalization.*

Related: [order and distance](#15-order-and-distance); [inequalities](#8-inequalities-bounds-and-optimization); [least squares](#12-probability-data-and-statistical-reasoning).

### 7.5 Linear Systems and Transformations

What does elimination do geometrically? A system $Ax=b$ asks for a point in the intersection of several lines or planes. Elementary row operations—exchanging equations, multiplying one by a nonzero scalar, and adding a multiple of another—preserve exactly that solution set.

The `rank` of a matrix is the number of independent columns, equivalently the number of pivots in row reduction. The system is consistent precisely when

$$
\operatorname{rank}(A)=\operatorname{rank}([A\mid b]).
$$

If there are $n$ unknowns and the common rank is $r$, the solution set has $n-r$ free parameters. More structurally, if $x_0$ is one solution, then

$$
\{x:Ax=b\}=x_0+\ker A,
\qquad
\ker A=\{v:Av=0\}.
$$

**All solutions are one particular solution plus every displacement that the matrix sends to zero.** A homogeneous system therefore has a vector space of solutions; an inhomogeneous one, when nonempty, generally has a translated vector space.

**Worked example 7.5 — Three equations need not determine one point**

Consider

$$
\begin{aligned}
x+y+z&=2,\\
2x+3y+4z&=5,\\
x+2y+3z&=\lambda.
\end{aligned}
$$

The third left-hand side equals the second minus the first. Consequently, consistency requires $\lambda=3$. If $\lambda\ne3$, elimination produces $0=\lambda-3$ and there is no solution.

For $\lambda=3$, subtracting twice the first equation from the second gives $y+2z=1$. Set $z=t$ to obtain

$$
(x,y,z)=(1,1,0)+t(1,-2,1),\qquad t\in\mathbb R.
$$

The rank is $2$, and the three planes share one line. *Counting equations without checking their independence would predict the wrong dimension.*

A matrix also represents a `linear map`, characterized by

$$
T(\alpha u+\beta v)=\alpha T(u)+\beta T(v).
$$

Its columns are the images of the coordinate basis vectors; matrix multiplication represents composition, with the rightmost map applied first. A linear map fixes the origin. An `affine map` adds a translation: $X\mapsto AX+b$.

For a $2\times2$ matrix,

$$
A=\begin{pmatrix}a&b\\c&d\end{pmatrix},
\qquad
\det A=ad-bc,
\qquad
A^{-1}=\frac1{ad-bc}
\begin{pmatrix}d&-b\\-c&a\end{pmatrix}
$$

when $\det A\ne0$. The absolute determinant multiplies area; its sign records preservation or reversal of orientation. In three dimensions it gives the corresponding volume factor. A zero determinant means some independent directions collapse. *It does not, by itself, tell us whether a particular inhomogeneous system has no solutions or infinitely many.*

**Worked example 7.6 — A circle becomes an ellipse while its area stays fixed**

Apply the shear

$$
\begin{pmatrix}u\\v\end{pmatrix}
=
S\begin{pmatrix}x\\y\end{pmatrix},
\qquad
S=\begin{pmatrix}1&2\\0&1\end{pmatrix}.
$$

The inverse substitution is $x=u-2v$, $y=v$, so the image of $x^2+y^2=1$ is

$$
(u-2v)^2+v^2=1.
$$

This is an ellipse of area $\pi$ because $\det S=1$. Yet $(0,1)$ goes to $(2,1)$, whose distance from the origin is $\sqrt5$; perpendicular basis directions become directions with dot product $2$.

**The determinant controls area without controlling individual lengths or angles.** Here $S$ moves the points in fixed Euclidean coordinates. If the same matrix instead describes a change of basis, the points stay fixed and the metric must be expressed with the corresponding Gram matrix.

![A unit circle and its image under the shear (x,y) to (x+2y,y), with basis vectors and a corresponding point; both enclosed areas equal pi.]({{site.img}}/mathematics/elementary-mathematics-reference/affine-shear-diagram.svg)

Different transformation classes preserve different information:

| Transformation class | Form or description | Properties preserved |
| --- | --- | --- |
| Euclidean isometries | $X\mapsto QX+b$, $Q^{\mathsf T}Q=I$ | Distances and angles; reflections may reverse orientation. |
| Similarities | $X\mapsto kQX+b$, $k>0$ | Angles and length ratios; lengths scale uniformly. |
| Invertible affine maps | $X\mapsto AX+b$ | Collinearity, parallelism, midpoints, and ratios along a line. |
| Projective transformations | Invertible linear maps in homogeneous coordinates | Incidence of points and lines, tangency, and nondegenerate conics. |

An affine map preserves a ratio along a line because it preserves every affine combination $(1-t)P+tQ$. It can change angles, circles, and ratios of lengths taken in unrelated directions.

For the `projective` viewpoint, write an ordinary point as $\lbrack x:y:1\rbrack $. Homogeneous triples differing by a nonzero common factor represent the same point; triples $\lbrack X:Y:0\rbrack $ supply points at infinity, encoding line directions. An invertible $3\times3$ matrix acts on these triples. To return to ordinary coordinates, divide by the last coordinate when it is nonzero.

This adds a useful qualification to conic classification. The ellipse

$$
\frac{X^2}{a^2}+\frac{Y^2}{b^2}=Z^2
$$

has no real point with $Z=0$; the parabola $Y^2=4pXZ$ has one such point, where the line at infinity is tangent; the hyperbola $X^2/a^2-Y^2/b^2=Z^2$ has two. A projective transformation can change which line is chosen as the line at infinity. **The distinction between ellipse, parabola, and hyperbola depends on this affine choice; incidence geometry sees a common conic structure.** Length and perpendicularity require additional metric information.

Related: [graph transformations](#45-transformations-of-graphs); [rotations](#62-identities-from-rotation); [complex similarities](#65-complex-arithmetic-and-geometry).

### 7.6 Classical Construction Problems

What does it mean to construct a length exactly? In a `straightedge-and-compass construction`, an unmarked straightedge draws lines through known points, and a compass draws circles with known centers and constructible radii. New points arise from intersections. The construction must use finitely many such operations.

Fix a unit segment and Cartesian axes. Line intersections solve linear equations. A line and circle lead to a quadratic; subtracting two circle equations first gives a line, again reducing the intersection to a quadratic. Therefore **each construction step uses field operations and, at most, a square root**.

The converse is geometric. Segment addition and subtraction are direct; similar triangles construct products and quotients of lengths relative to the unit. A semicircle constructs the square root of a product.

Take collinear points $A,P,B$ with $AP=a>0$ and $PB=b>0$. Draw the semicircle with diameter $AB$ and erect the perpendicular at $P$, meeting the semicircle at $T$. The angle $ATB$ is right, and the two smaller right triangles are similar, giving

$$
\frac{AP}{PT}=\frac{PT}{PB},
\qquad PT^2=ab.
$$

Setting $b=1$ constructs $\sqrt a$.

![A semicircle with diameter AB, divided at P into lengths a=4 and b=1, and the perpendicular PT of length 2, illustrating PT squared equals ab.]({{site.img}}/mathematics/elementary-mathematics-reference/geometric-mean-construction-diagram.svg)

Thus a real length is constructible from the unit exactly when it belongs to a finite `tower of quadratic extensions`:

$$
\mathbb Q=K_0\subseteq K_1\subseteq\cdots\subseteq K_m,
\qquad K_{j+1}=K_j(\sqrt{d_j}),\quad d_j>0.
$$

The number $d_j$ must already belong to $K_j$; adjoining its square root either changes nothing or doubles the field degree. Here a field degree counts independent coefficients needed to express its elements over the smaller field. Degrees multiply along a tower, so a constructible number has minimal-polynomial degree over $\mathbb Q$ equal to a power of two.

*Having degree a power of two is a necessary condition, not a sufficient test in general.* Membership in an actual quadratic tower is the full criterion. If arbitrary initial lengths are supplied, the starting field must include their coordinates; constructibility is always relative to the initial data.

**Worked example 7.7 — Why the regular heptagon cannot be constructed**

Let $\zeta=e^{2\pi i/7}$ and $u=\zeta+\zeta^{-1}=2\cos(2\pi/7)$. Since $1+\zeta+\cdots+\zeta^6=0$, dividing by $\zeta^3$ and pairing reciprocal powers gives

$$
(\zeta^3+\zeta^{-3})+(\zeta^2+\zeta^{-2})
+(\zeta+\zeta^{-1})+1=0.
$$

Using $\zeta^2+\zeta^{-2}=u^2-2$ and $\zeta^3+\zeta^{-3}=u^3-3u$, we obtain

$$
u^3+u^2-2u-1=0.
$$

A rational root of this monic integer polynomial must be $1$ or $-1$, and neither works. A reducible cubic over $\mathbb Q$ would have a rational root, so this cubic is irreducible. Consequently, $u$ has degree $3$, which cannot divide a power of two.

An exact construction of a regular heptagon on the unit circle would construct its vertex projection $\cos(2\pi/7)$ and hence $u$. Therefore it is impossible with the stated tools. **Translate the geometric task into an algebraic restriction that every permitted construction must obey.**

The same restriction explains other classical boundaries:

| Problem | Required quantity or equation | Obstruction |
| --- | --- | --- |
| Doubling a cube of unit side | Side $2^{1/3}$, satisfying $x^3-2=0$ | This cubic has no rational root and is irreducible; its degree is $3$. |
| Trisecting every given angle | In particular, constructing $20^\circ$ from a constructible $60^\circ$ angle | $u=2\cos20^\circ$ satisfies the irreducible cubic $u^3-3u-1=0$; see Problem 7. |
| Squaring a unit circle | Square side $\sqrt\pi$ | The transcendence of $\pi$ excludes it from every quadratic tower. |

The transcendence of $\pi$ is a deeper theorem, stated here without proof. If $\sqrt\pi$ were constructible, its square $\pi$ would be algebraic, contradicting that theorem. *Irrationality alone would not be enough: $\sqrt2$ is irrational and constructible.*

These impossibility statements have precise scope. Some angles, such as $90^\circ$, can be trisected by these tools. Other instruments or operations can construct lengths unavailable to an unmarked straightedge and compass. A numerical approximation to a heptagon or to $2^{1/3}$ can be arbitrarily accurate, but **approximate accuracy is not an exact finite construction**.

The shift in method is substantial: repeated unsuccessful drawings are replaced by a proof covering every possible permitted sequence of operations. The limitation belongs to the construction rules, not to the existence of the geometric object.

Related: [algebraic solvability](#36-exact-formulas-and-numerical-root-finding); [roots of unity](#66-roots-of-unity-and-periodicity); [exactness and approximation](#16-exact-values-and-measured-quantities).

### 7.7 Classical Problems and Extensions

Try the problems before consulting the solution notes. All lengths and coordinates are exact.

**Problems**

1. **Ceva's theorem and the centroid.** In triangle $ABC$, let $D,E,F$ lie in the interiors of $BC,CA,AB$. Prove that $AD,BE,CF$ are concurrent if and only if

   $$
   \frac{BD}{DC}\frac{CE}{EA}\frac{AF}{FB}=1.
   $$

   Deduce that the medians concur and that their common point divides each median in the ratio $2:1$ from the vertex. Use areas rather than a coordinate calculation.

2. **A sphere by cross-sections.** A hemisphere of radius $R$ rests on its equatorial disk at $z=0$. Compare its horizontal sections, for $0\le z\le R$, with those of a cylinder of radius and height $R$ from which a cone has been removed. The cone has its apex at $z=0$ and its radius-$R$ base at $z=R$. Use Cavalieri's principle to recover the sphere-volume formula.

3. **The radical axis.** Find the common chord of the circles $x^2+y^2=25$ and $(x-6)^2+y^2=25$. Show that the entire line containing the chord consists of points of equal power with respect to the two circles. Replace $6$ by $d>0$: does the equal-power line still exist when the circles do not meet?

4. **An ellipse tangent without differentiation.** Let $P=(x_0,y_0)$ lie on $x^2/9+y^2/4=1$. Show that

   $$
   \frac{xx_0}{9}+\frac{yy_0}{4}=1
   $$

   is its tangent at $P$ by mapping the ellipse to the unit circle. Find this tangent at $P=(3/\sqrt2,\sqrt2)$. Explain why the tangent need not be perpendicular to the segment from the ellipse's center to $P$.

5. **What perspective does to a midpoint.** Consider

   $$
   (x,y)\longmapsto(X,Y)
   =\left(\frac{x}{1+x},\frac{y}{1+x}\right),\qquad x\ne-1.
   $$

   Find the inverse and its domain. Show that collinear points with finite images remain collinear. For $A=(0,0)$, $B=(2,0)$, and their midpoint $M=(1,0)$, compare the image of $M$ with the midpoint of the images of $A,B$.

6. **The Euler line.** For $A=(0,0)$, $B=(4,0)$, $C=(1,3)$, find the circumcenter $O$, centroid $G$, and orthocenter $H$. Then prove for every nondegenerate triangle the vector identity

   $$
   H=3G-2O.
   $$

   A useful choice is to put the origin at the circumcenter. State the qualification needed when all three centers coincide.

7. **A specific obstruction to angle trisection.** Derive the polynomial satisfied by $u=2\cos20^\circ$ from $\cos60^\circ=1/2$. Show that it is irreducible over $\mathbb Q$. Explain why this rules out a general straightedge-and-compass trisection procedure, although a right angle can be trisected.

**Solution notes**

**1. Ceva's theorem and the centroid.** Suppose the cevians meet at $P$, and write

$$
x=[PBC],\qquad y=[PCA],\qquad z=[PAB],
$$

where brackets denote positive areas. Triangles $PAB$ and $PAC$ share the base $AP$; the distances of $B,C$ from its line have ratio $BD/DC$. Thus $BD/DC=z/y$. Similarly,

$$
\frac{CE}{EA}=\frac{x}{z},
\qquad
\frac{AF}{FB}=\frac{y}{x}.
$$

Multiplication proves the required relation.

Conversely, let $AD$ and $BE$ meet at $P$, and let $CP$ meet $AB$ at $F_0$. The direction already proved determines $AF_0/F_0B$. The assumed product condition gives exactly the same ratio for $F$. There is only one interior point dividing $AB$ in a given positive ratio, so $F_0=F$.

For medians all three ratios are $1$, so they concur at a point $G$ and the three areas $\lbrack GBC\rbrack ,\lbrack GCA\rbrack ,\lbrack GAB\rbrack $ are equal. In particular, $\lbrack GBC\rbrack =\lbrack ABC\rbrack /3$. Using their common base $BC$, the height of $G$ is one third the height of $A$. Since $G$ lies on the median $AD$, $GD=AD/3$, giving $AG:GD=2:1$. **Area ratios establish both incidence and the location of the intersection.**

**2. A sphere by cross-sections.** At height $z$, the hemisphere has section radius $\sqrt{R^2-z^2}$ and area $\pi(R^2-z^2)$. By similarity, the cone's section radius is $z$, so the cylinder minus cone has section area

$$
\pi R^2-\pi z^2=\pi(R^2-z^2).
$$

Cavalieri's principle gives the hemisphere volume as

$$
\pi R^3-\frac13\pi R^3=\frac23\pi R^3.
$$

Doubling yields $4\pi R^3/3$. *The compared sections are generally a disk and an annulus, so they are not congruent; equality of area is what the argument needs.*

**3. The radical axis.** Subtracting the equations gives $-12x+36=0$, hence $x=3$. Substitution gives $y=\pm4$, so the common chord has endpoints $(3,4),(3,-4)$ and length $8$.

At an arbitrary point $(x,y)$, the powers are $x^2+y^2-25$ and $(x-6)^2+y^2-25$; they agree exactly when $x=3$. For center separation $d>0$, the same subtraction gives $x=d/2$. The circles meet twice for $0<d<10$, are tangent for $d=10$, and have no intersection for $d>10$, but their `radical axis` exists in all three cases. **The equal-power relation extends beyond the visible common chord.**

**4. An ellipse tangent without differentiation.** Set $q=(x/3,y/2)$ and $q_0=(x_0/3,y_0/2)$. Both are unit vectors for points on the ellipse. Since

$$
\|q-q_0\|^2=2-2q\cdot q_0\ge0,
$$

we have $q\cdot q_0\le1$, with equality only when $q=q_0$. Therefore $q\cdot q_0=1$ is a supporting tangent to the circle; the invertible scaling pulls it back to

$$
\frac{xx_0}{9}+\frac{yy_0}{4}=1.
$$

At the specified point this simplifies to $2x+3y=6\sqrt2$. Its normal direction is $(x_0/9,y_0/4)$, generally not parallel to $(x_0,y_0)$. *An affine change preserves tangency while altering perpendicularity.*

**5. What perspective does to a midpoint.** Solving for the original coordinates gives

$$
x=\frac{X}{1-X},\qquad y=\frac{Y}{1-X},\qquad X\ne1.
$$

For a line $ax+by+c=0$ that has points in the domain, substitution gives

$$
(a-c)X+bY+c=0.
$$

Thus its finite image points lie on a line. In homogeneous coordinates the transformation is $\lbrack x:y:z\rbrack \mapsto\lbrack x:y:x+z\rbrack $, an invertible linear transformation of triples; points omitted from the affine formulas are accounted for at infinity.

The images of $A,B,M$ are $(0,0),(2/3,0),(1/2,0)$. The midpoint of the first two is $(1/3,0)$, not the image of $M$. **Collinearity survives, while the affine parameter measuring a segment ratio changes.**

**6. The Euler line.** Equal distances from $O$ to $A,B$ give $x_O=2$; equality with the distance to $C$ then gives $y_O=1$. The centroid is the average of the vertices:

$$
O=(2,1),\qquad G=(5/3,1).
$$

The altitude from $C$ is $x=1$. Since $BC$ has slope $-1$, the altitude from $A$ is $y=x$, giving $H=(1,1)$. These points satisfy the stated relation.

For the general proof, choose $O$ as origin and let the vertex vectors be $a,b,c$, all of length $R$. Put $h=a+b+c$. Then

$$
(h-a)\cdot(b-c)
=(b+c)\cdot(b-c)=\|b\|^2-\|c\|^2=0.
$$

So $h$ lies on the altitude from $a$, and cyclically on the other altitudes. It is the orthocenter. Since $g=(a+b+c)/3$, we obtain $h=3g$, or $H=3G-2O$ in any origin. When $O\ne H$, these centers lie on the `Euler line` and $OG:GH=1:2$. For an equilateral triangle they coincide, so the centers do not determine a unique line.

**7. A specific obstruction to angle trisection.** The triple-angle identity yields

$$
4\cos^3 20^\circ-3\cos20^\circ=\frac12,
\qquad
u^3-3u-1=0.
$$

The only possible rational roots are $\pm1$; neither is a root. Hence the cubic is irreducible and $u$ has degree $3$ over $\mathbb Q$. It cannot lie in a quadratic tower.

An equilateral triangle constructs a $60^\circ$ angle from a unit segment. If a universal trisection procedure existed, applying it to this constructible angle would construct $20^\circ$ and therefore $u$, a contradiction. A $90^\circ$ angle can nevertheless be trisected: construct $30^\circ$ by bisecting $60^\circ$ and transfer that angle twice. *The obstruction concerns a procedure that succeeds for every input angle, not the claim that no angle can ever be trisected.*

## 8. Inequalities, Bounds, and Optimization

An equation asks when two quantities coincide. An inequality asks which is larger, how far a quantity can vary, or whether an approximation is accurate enough. Optimization adds a further question: can the best permitted value actually be reached?

The recurring method is **to prove a bound, track its equality conditions, and check those conditions against the original domain and constraints**. Algebra, geometry, and convexity supply different ways to certify the same comparison. The [chapter-end problems](#87-classical-problems-and-extensions) develop these connections beyond the worked examples.

### 8.1 Order-Preserving Operations

Which algebraic transformations preserve an inequality? The answer depends on order, signs, and the domain of the operation.

For real numbers, adding the same quantity preserves order. Multiplying by a positive quantity preserves it; multiplying by a negative quantity reverses it. These rules give the following equivalences:

$$
a\le b\quad\Longleftrightarrow\quad a+c\le b+c,
$$

$$
a\le b\quad\Longleftrightarrow\quad
\begin{cases}
ac\le bc,&c>0,\\
ac\ge bc,&c<0.
\end{cases}
$$

*Multiplication by zero destroys the information rather than preserving an equivalent inequality.* Division requires a nonzero divisor, and division by an expression of unknown sign requires cases.

The more general principle is `monotonicity`. A strictly increasing function preserves an order comparison in both directions; a strictly decreasing function reverses it in both directions. The inputs must belong to an interval on which the stated monotonicity holds.

| Operation | Domain qualification | Effect on order |
| --- | --- | --- |
| $x\mapsto x^2$ | $x\ge0$ | Strictly increasing. |
| $x\mapsto x^2$ | $x\le0$ | Strictly decreasing. |
| $x\mapsto\sqrt{x}$ | $x\ge0$ | Strictly increasing. |
| $x\mapsto1/x$ | Either positive inputs or negative inputs | Strictly decreasing on each interval separately. |
| $x\mapsto\log_a x$ | $x>0$, $a>0$, $a\ne1$ | Increasing for $a>1$; decreasing for $0<a<1$. |

For example, $-2<1$ but $(-2)^2>1^2$. Also $-1<1$ while their reciprocals remain in the same order: *the reciprocal function is not decreasing across its excluded point $0$*. A merely nondecreasing function gives the forward implication $a\le b\Rightarrow f(a)\le f(b)$, but a constant stretch can prevent the converse.

Adding two valid inequalities in the same direction is legitimate. Subtracting them term by term generally is not: from $a\le b$ and $c\le d$, one can conclude $a-d\le b-c$, not necessarily $a-c\le b-d$. **Transformations must preserve the logical direction of the comparison, not just resemble a rule for equations.**

**Worked example 8.1 — When is it legitimate to square?**

Solve $\sqrt{x+2}\ge x$ over the reals. First, the radical requires $x\ge-2$.

If $-2\le x\le0$, the left side is nonnegative and the right side nonpositive, so every such $x$ works. If $x>0$, both sides are nonnegative and squaring is reversible:

$$
\sqrt{x+2}\ge x
\quad\Longleftrightarrow\quad
x+2\ge x^2
\quad\Longleftrightarrow\quad
(x-2)(x+1)\le0.
$$

On this second case, the result is $0<x\le2$. The complete solution is $\lbrack -2,2\rbrack $.

**Separate the automatic sign case before applying a monotone operation.** Squaring immediately would produce only $\lbrack -1,2\rbrack $ and lose valid solutions. For example, $x=-2$ satisfies the original inequality but not its squared version.

Related: [order and distance](#15-order-and-distance); [reversible transformations](#33-reversible-transformations); [monotonicity](#44-monotonicity-symmetry-and-periodicity).

### 8.2 Intervals and Sign Charts

A polynomial or rational inequality becomes manageable when the real line is divided at its zeros and excluded points. On each remaining interval, its nonzero continuous factors keep their signs. This is the basis of a `sign chart`.

First put the comparison in the form $R(x)\ge0$, $R(x)>0$, or the reversed inequality. Factor when possible, record every denominator restriction, and inspect the intervals between critical values. A root or pole of odd multiplicity changes the sign; one of even multiplicity does not. *Canceling a common factor simplifies the sign calculation but does not restore an input excluded by the original denominator.*

**Worked example 8.2 — An isolated solution at a double root**

Solve

$$
\frac{(x-1)^2(x+2)}{x-3}\ge0.
$$

The domain excludes $x=3$. The other critical values are $-2$ and $1$.

| Factor | $(-\infty,-2)$ | $(-2,1)$ | $(1,3)$ | $(3,\infty)$ |
| --- | --- | --- | --- | --- |
| $(x-1)^2$ | $+$ | $+$ | $+$ | $+$ |
| $x+2$ | $-$ | $+$ | $+$ | $+$ |
| $x-3$ | $-$ | $-$ | $-$ | $+$ |
| Whole expression | $+$ | $-$ | $-$ | $+$ |

The expression vanishes at $-2$ and $1$, so both are admitted by the weak inequality. It is undefined at $3$. Hence

$$
x\in(-\infty,-2]\cup\{1\}\cup(3,\infty).
$$

The double root at $1$ is an isolated solution surrounded by negative values. **A sign chart must record zeros as well as sign changes.** Dividing by $(x-1)^2$ without treating $x=1$ separately would lose this solution.

An `absolute value` introduces another useful interval description. For $r\ge0$,

$$
|x-a|\le r\quad\Longleftrightarrow\quad a-r\le x\le a+r.
$$

For $r>0$,

$$
|x-a|\ge r\quad\Longleftrightarrow\quad
x\le a-r\ \text{or}\ x\ge a+r.
$$

At $r=0$, the second inequality holds for every real $x$. With a variable right-hand side, $|A(x)|\le B(x)$ requires $B(x)\ge0$ and the simultaneous inequalities $-B(x)\le A(x)\le B(x)$. Conversely, $|A(x)|\ge B(x)$ is automatic wherever $B(x)\le0$.

**Worked example 8.3 — A sum of distances**

Solve $|x-1|+|x+2|\le5$. The expression is the total distance from $x$ to the points $1$ and $-2$. Splitting at those points gives

$$
|x-1|+|x+2|=
\begin{cases}
-2x-1,&x\le-2,\\
3,&-2\le x\le1,\\
2x+1,&x\ge1.
\end{cases}
$$

The left case contributes $\lbrack -3,-2\rbrack $, the middle case contributes all of $\lbrack -2,1\rbrack $, and the right case contributes $\lbrack 1,2\rbrack $. Their union is $\lbrack -3,2\rbrack $.

**Use distance to understand the shape, then use the breakpoints to calculate the endpoints.** Between the two fixed points the total distance stays $3$; outside, it grows at twice the rate of movement. A bound below $3$ would admit no point at all.

For simultaneous inequalities, intersect the solution sets. For alternatives, take their union. Strict inequalities exclude zeros, weak inequalities may include them, and neither kind can include an undefined input.

Related: [polynomial roots and multiplicity](#35-roots-multiplicity-and-coefficients); [piecewise functions](#41-a-function-and-its-representations).

### 8.3 Standard Inequalities with Equality Cases

Why do a few familiar inequalities solve so many different problems? They express reusable structures: a square is nonnegative, averaging reduces certain kinds of variation, and a projection cannot be longer than the vector being projected.

The simplest certificate is a `nonnegative square`:

$$
(a-b)^2\ge0
\quad\Longrightarrow\quad
a^2+b^2\ge2ab,
$$

with equality exactly when $a=b$. For nonnegative $a,b$, applying this to $\sqrt a,\sqrt b$ proves the two-variable `arithmetic–geometric mean inequality`:

$$
\frac{a+b}{2}\ge\sqrt{ab}.
$$

For $n\ge1$ nonnegative numbers, its general form is

$$
\frac{a_1+\cdots+a_n}{n}\ge(a_1\cdots a_n)^{1/n},
$$

with equality exactly when all the numbers are equal. Section 8.5 derives the positive-input case from concavity; zero inputs then cause no difficulty, because the product is zero and equality forces every input to vanish.

For real vectors $u,v$, the `Cauchy–Schwarz inequality` states

$$
|u\cdot v|^2\le\|u\|^2\|v\|^2.
$$

If $v\ne0$, subtract its projection from $u$:

$$
0\le\left\|u-\frac{u\cdot v}{\|v\|^2}v\right\|^2
=\|u\|^2-\frac{(u\cdot v)^2}{\|v\|^2}.
$$

This proves the inequality, and it identifies equality: $u$ is a scalar multiple of $v$. Including the zero-vector cases, equality means the vectors are linearly dependent. **An orthogonal remainder gives both a bound and its equality condition.**

In coordinates, this becomes

$$
\left(\sum_{i=1}^n a_ib_i\right)^2
\le\left(\sum_{i=1}^n a_i^2\right)
   \left(\sum_{i=1}^n b_i^2\right).
$$

A particularly useful fractional form, for $q_i>0$ and real $p_i$, is

$$
\sum_{i=1}^n\frac{p_i^2}{q_i}
\ge\frac{(p_1+\cdots+p_n)^2}{q_1+\cdots+q_n}.
$$

Apply Cauchy–Schwarz to $p_i/\sqrt{q_i}$ and $\sqrt{q_i}$. Equality holds exactly when all $p_i/q_i$ are the same. *The denominators must be positive; this is not an unrestricted rule for fractions.*

**Worked example 8.4 — Choosing an inequality whose equality can occur**

For $x,y>0$ with $x+y=6$, find the minimum of $1/x+4/y$. The fractional form gives

$$
\frac1x+\frac4y
=\frac{1^2}{x}+\frac{2^2}{y}
\ge\frac{(1+2)^2}{x+y}
=\frac32.
$$

Equality requires $1/x=2/y$, or $y=2x$. Together with $x+y=6$, this gives $x=2$, $y=4$. The minimum is therefore $3/2$.

A different chain, $1/x+4/y\ge4/\sqrt{xy}\ge4/3$, is valid but weaker. Its first equality requires $y=4x$, while its second requires $x=y$. **Matching the inequality to the constraint produces an attainable bound.** Equality conditions are part of the method, not an optional note after the calculation.

Cauchy–Schwarz also proves the `triangle inequality`:

$$
\|u+v\|^2
=\|u\|^2+2u\cdot v+\|v\|^2
\le(\|u\|+\|v\|)^2.
$$

Taking nonnegative square roots gives $\|u+v\|\le\|u\|+\|v\|$. Equality holds when the vectors point in the same direction, or one is zero. In one dimension, $|a+b|\le|a|+|b|$ has equality exactly when $ab\ge0$. Reapplying the triangle inequality gives its reverse form:

$$
\bigl|\|u\|-\|v\|\bigr|\le\|u-v\|.
$$

This last estimate turns a bound on a vector error into a bound on the error in its length.

For positive numbers, the standard `mean inequalities` can be kept in one chain:

$$
\underbrace{\frac{n}{\sum_i1/a_i}}_{H}
\le
\underbrace{\left(\prod_i a_i\right)^{1/n}}_{G}
\le
\underbrace{\frac1n\sum_i a_i}_{A}
\le
\underbrace{\sqrt{\frac1n\sum_i a_i^2}}_{Q}.
$$

Here $H,G,A,Q$ are the harmonic, geometric, arithmetic, and quadratic means. The first comparison follows by applying AM–GM to the reciprocals; the last follows from Cauchy–Schwarz with the vector $(1,\ldots,1)$. Equality in any comparison occurs exactly when all inputs are equal.

Related: [vectors and projection](#74-vectors-and-projection); [averages and scaling](#14-ratios-and-scaling); [convexity](#85-convexity-and-averages).

### 8.4 Bounding and Comparison

How can an estimate be useful without giving an exact value? A `bound` supplies a guaranteed comparison. If $L\le q\le U$, then the interval is a certificate containing $q$; its midpoint approximates $q$ with absolute error at most $(U-L)/2$.

An upper bound need not be the smallest upper bound. A `sharp bound` is the best possible one, whether or not it is attained. For example, $x<1$ on $(0,1)$ has the sharp upper bound $1$, but no allowed $x$ equals it. **Proving attainability is an additional step when the problem asks for a maximum or minimum.**

To prove $F\ge G$, studying the difference $F-G$ is often more effective than estimating each side separately. Factorization, completing squares, and rationalization can expose its sign. For positive variables in a homogeneous comparison—one whose two sides scale by the same power—a normalization such as $a+b+c=1$ may remove an irrelevant scale. *Such a normalization is valid only after the scaling symmetry has been checked.*

**Worked example 8.5 — A square-root approximation with a guaranteed error**

For $t\ge0$, let $s=\sqrt{1+t}$. Rationalization gives an exact identity:

$$
1+\frac t2-s
=\frac t2-\frac{t}{1+s}
=\frac{t^2}{2(1+s)^2}.
$$

Since $s\ge1$, the right-hand side lies between $0$ and $t^2/8$. Therefore

$$
1+\frac t2-\frac{t^2}{8}
\le\sqrt{1+t}\le1+\frac t2,
\qquad t\ge0.
$$

Taking $t=1/100$ and multiplying by $10$ gives

$$
10.049875\le\sqrt{101}\le10.05.
$$

Thus $10.05$ is an overestimate with error at most $0.000125$. **Rewrite the approximation error exactly, then bound the remainder.** No infinite series or derivative is needed. The estimates remain valid for large $t$, but their usefulness as approximations deteriorates; validity and accuracy are different questions.

When a comparison passes through several inequalities, every step must go in the required direction. If $A\ge B$ and $B\ge C$, then $A\ge C$. If $A\ge B$ and $B\le C$, there is no such conclusion. A proposed equality case must also make every step an equality. Even when no equality is possible, a limiting family may establish sharpness, as the open interval example shows.

Absolute values make error control compatible with these rules. If $|\delta_i|\le\varepsilon_i$, then

$$
\left|\sum_i c_i\delta_i\right|
\le\sum_i|c_i|\,\varepsilon_i.
$$

Alternatively, Cauchy–Schwarz gives

$$
|c\cdot\delta|\le\|c\|\,\|\delta\|.
$$

The first is suited to separate coordinate error bounds; the second is suited to a bound on their combined Euclidean size. **The appropriate estimate depends on what information about the errors is actually available.** A bound may become loose if it treats dependent errors as though they could vary independently.

There is a further distinction between a small residual and a small error in the unknown. The condition $|f(x)|\le\varepsilon$ measures how closely an equation is satisfied. Converting it into a bound on the distance to a root requires additional control of the inverse problem; the [root-finding discussion](#36-exact-formulas-and-numerical-root-finding) explains this issue.

Related: [measurement and error](#16-exact-values-and-measured-quantities); [certified logarithm approximation](#56-approximation-and-numerical-evaluation); [limits as error control](#10-limits-continuity-and-infinity).

### 8.5 Convexity and Averages

Why does averaging reduce a sum of squares, while the logarithm of an average behaves in the opposite direction? The unifying concept is `convexity`.

A function $f$ on an interval is convex if, for all $a,b$ in that interval and $0\le t\le1$,

$$
f((1-t)a+tb)\le(1-t)f(a)+tf(b).
$$

The graph lies below the chord joining the two graph points. A `concave` function satisfies the reversed inequality. Strict convexity means strict inequality whenever $a\ne b$ and $0<t<1$.

| Function | Relevant domain | Shape |
| --- | --- | --- |
| $x^2$; $e^x$ | $\mathbb R$ | Strictly convex. |
| $\lvert x\rvert$ | $\mathbb R$ | Convex, with a corner at $0$; not strictly convex. |
| $1/x$; $-\ln x$ | $(0,\infty)$ | Strictly convex. |
| $\sqrt{x}$ | $\lbrack 0,\infty)$ | Strictly concave. |
| $\ln x$ | $(0,\infty)$ | Strictly concave. |
| $mx+b$ | $\mathbb R$ | Both convex and concave. |

Convexity is a property on a specified interval, not a description inferred from a few plotted points. For a twice differentiable function, $f^{\prime\prime}\ge0$ throughout an interval implies convexity there, and $f^{\prime\prime}\le0$ implies concavity. This calculus criterion verifies many entries in the table, but differentiability is not part of the definition.

A differentiable convex function also lies above every tangent at an interior point:

$$
f(x)\ge f(a)+f^{\prime}(a)(x-a).
$$

For concave functions the direction reverses. To see the convex case, apply the defining inequality to $a+t(x-a)$, subtract $f(a)$, divide by $t>0$, and let $t$ decrease to zero. **A local slope becomes a global bound because of convexity.**

![A convex parabola lies below its chord and above its tangent; a concave square-root curve has the reversed bounds. Chords are drawn only between their endpoints.]({{site.img}}/mathematics/elementary-mathematics-reference/convexity-chords-tangents-diagram.svg)

Repeated averaging gives the finite `Jensen inequality`. For $w_i\ge0$, $\sum_iw_i=1$, and inputs in a convexity interval,

$$
f\left(\sum_iw_ix_i\right)\le\sum_iw_if(x_i).
$$

The two-point definition proves the finite version by grouping the first $n-1$ weights, normalizing them, and applying induction. Zero weights can be omitted. For a strictly convex function, equality holds exactly when all inputs with positive weights are equal. *A function that is only convex can also have equality at distinct inputs lying on an affine part of its graph.*

Applying the concave version to $\ln x$ gives, for positive $a_i$,

$$
\sum_iw_i\ln a_i\le\ln\left(\sum_iw_ia_i\right).
$$

Exponentiating preserves order and yields the weighted AM–GM inequality:

$$
\prod_i a_i^{w_i}\le\sum_iw_ia_i.
$$

Thus an apparently multiplicative inequality follows from an additive averaging principle after a change of function. Equal weights give the AM–GM formula in Section 8.3.

The same tangent principle gives the `Bernoulli inequalities`. For $t>-1$,

$$
(1+t)^r
\begin{cases}
\ge1+rt,&r\le0\ \text{or}\ r\ge1,\\
\le1+rt,&0\le r\le1.
\end{cases}
$$

Indeed, $x^r$ is convex on $(0,\infty)$ in the first range and concave in the second, and its tangent at $1$ is $1+r(x-1)$. For $r=0$ or $r=1$ there is equality throughout; otherwise equality occurs only at $t=0$. This also explains the upper square-root bound in Section 8.4.

**Worked example 8.6 — The mean as the best constant approximation**

Which real number $c$ minimizes the total squared distance to $1,2,6$? Their mean is $3$, and completing squares gives

$$
(1-c)^2+(2-c)^2+(6-c)^2=14+3(c-3)^2.
$$

The minimum is $14$, attained uniquely at $c=3$. This is a `least-squares` problem with a constant model.

The same calculation works for nonnegative weights summing to one. If $\mu=\sum_iw_ix_i$, then

$$
\sum_iw_i(x_i-c)^2
=\sum_iw_i(x_i-\mu)^2+(c-\mu)^2.
$$

The mixed term vanishes because $\sum_iw_i(x_i-\mu)=0$. In particular,

$$
\sum_iw_ix_i^2-\mu^2=\sum_iw_i(x_i-\mu)^2\ge0.
$$

This is Jensen's inequality for $f(x)=x^2$, with an explicit expression for the gap. **The inequality measures dispersion, while the completed square identifies the optimal center.** For equal weights, using absolute distances instead of squared distances selects a median, as Problem 6 shows. With unequal weights, it selects a `weighted median`: a point with at most half the total weight strictly on either side.

The geometric connection is projection. For equal weights, the data vector is approximated by a multiple of $(1,\ldots,1)$, and the minimizing residual is perpendicular to that direction in the ordinary dot product. For general weights, omit zero-weight entries and use the `weighted inner product`

$$
\langle u,v\rangle_w=\sum_iw_i u_iv_i.
$$

Then $\sum_iw_i(x_i-\mu)=0$ is exactly the orthogonality condition. Equivalently, in ordinary Euclidean coordinates, project $(\sqrt{w_i}x_i)_i$ onto the direction $(\sqrt{w_i})_i$. **The weights determine the geometry of the least-squares problem.** This extends the closest-point principle of Chapter 7 to fitting functions and data.

Related: [powers and logarithms](#5-powers-exponentials-and-logarithms); [projection](#74-vectors-and-projection); [statistical averages and fitting](#12-probability-data-and-statistical-reasoning).

### 8.6 Local and Global Optimization

An optimization problem specifies an objective $f$ and a `feasible set` $D$. A global minimum is a value $f(x_{\ast})$ with $x_{\ast}\in D$ such that $f(x_{\ast})\le f(x)$ for every $x\in D$. A local minimum compares only sufficiently nearby feasible points. Maxima reverse the inequality.

The `infimum` is the greatest lower bound of the values, and the `supremum` the least upper bound. A minimum or maximum must be achieved by a feasible point; an infimum or supremum need not be. For instance, $f(x)=x$ on $(0,1)$ has infimum $0$ and supremum $1$, and neither an attained minimum nor an attained maximum.

**To establish a global optimum, prove a bound valid for every feasible point and exhibit a feasible point attaining it.** If no point attains it, a sequence approaching the proposed bound may instead prove that it is an infimum or supremum.

**Worked example 8.7 — A supporting line and the difference between maximum and supremum**

Maximize $3x+4y$ subject to $x^2+y^2\le1$. Cauchy–Schwarz gives

$$
3x+4y
\le |3x+4y|
\le\sqrt{3^2+4^2}\sqrt{x^2+y^2}
\le5.
$$

Equality requires $(x,y)$ to point in the same direction as $(3,4)$ and have length $1$. Thus the maximum is $5$, attained uniquely at $(3/5,4/5)$.

Geometrically, the lines $3x+4y=c$ are parallel. At $c=5$, the line just touches the disk; it is a `supporting line`. The same calculation gives the minimum $-5$ at $(-3/5,-4/5)$.

Now replace the constraint by $x^2+y^2<1$. Every feasible value is strictly less than $5$, so there is no maximum. But for integers $n\ge2$, the points

$$
(x_n,y_n)=\left(1-\frac1n\right)\left(\frac35,\frac45\right)
$$

are feasible and give $3x_n+4y_n=5(1-1/n)\to5$. The supremum remains $5$. **The boundary condition changes attainability without changing the sharp bound.**

![The linear objective 3x+4y has maximum 5 on the closed unit disk, attained at (3/5,4/5); on the open disk, the same point is excluded and 5 is only the supremum.]({{site.img}}/mathematics/elementary-mathematics-reference/maximum-supremum-disk-diagram.svg)

What guarantees that an optimum exists before we calculate it? The `extreme value theorem` states that a continuous real-valued function on a nonempty compact set attains a maximum and a minimum. In $\mathbb R^n$, compactness is equivalent to being closed and bounded. A closed finite interval or closed disk therefore works. *Boundedness of the function alone does not imply attainment, and a closed but unbounded domain does not provide the same guarantee.* These are sufficient conditions, not necessary ones: $x^2$ has a minimum on all of $\mathbb R$.

Calculus can locate candidates, but its conclusions have conditions. At a differentiable interior local extremum of a function of one variable, $f^{\prime}(x)=0$. The converse fails: $x^3$ has derivative zero at $0$ but no extremum there. Endpoints and nondifferentiable points also need attention; $|x|$ is minimized at its corner.

Even a genuine local minimum need not be global. On $\lbrack -3,3\rbrack $, the function $x^3-3x$ has a local minimum $-2$ at $x=1$, while its global minimum is $-18$ at $x=-3$. **Stationary points, boundary points, and limiting behaviour answer different parts of an optimization problem.** The derivative tests are developed in Chapter 11.

Convexity provides a stronger conclusion. A set is convex when it contains every segment between its points. If a convex function on a convex set had a local minimum $x_{\ast}$ and a point $y$ with $f(y)<f(x_{\ast})$, then

$$
f((1-t)x_{\ast}+ty)\le(1-t)f(x_{\ast})+tf(y)<f(x_{\ast})
$$

for every $0<t<1$. Taking small $t$ contradicts local minimality. Thus **every local minimum of a convex function on a convex feasible set is global**. Strict convexity gives at most one minimizer, but does not ensure existence: $e^x$ on $\mathbb R$ is strictly convex and has no minimum.

For a differentiable convex function on an open convex domain, the supporting-tangent principle extends to a supporting plane,

$$
f(y)\ge f(x_{\ast})+\nabla f(x_{\ast})\cdot(y-x_{\ast}).
$$

Here $\nabla f$ is the vector of partial derivatives. If the last dot product is nonnegative for every feasible $y$, it certifies that $x_{\ast}$ is globally minimizing. At an unconstrained stationary point it vanishes. At a constrained optimum it need not: the boundary can prevent further improvement.

This also explains why squared-error fitting is tractable. Let $r=A\hat t-b$ be the residual for a proposed fit. If $r$ is perpendicular to every column of $A$, then for every change $h$ in the coefficients,

$$
\|A(\hat t+h)-b\|^2=\|r\|^2+\|Ah\|^2\ge\|r\|^2.
$$

So the fit is globally optimal; it is unique in its coefficients if the columns of $A$ are independent. This is an exact certificate, not merely a stationary-point calculation. The same orthogonality idea applies to finite sums of functions when the inner product is defined by integration.

Related: [linear systems and kernels](#75-linear-systems-and-transformations); [continuity and existence](#10-limits-continuity-and-infinity); [calculus](#11-calculus-differential-equations-and-approximation); [least squares](#12-probability-data-and-statistical-reasoning).

### 8.7 Classical Problems and Extensions

Try the problems before consulting the solution notes. In every optimization problem, identify both the bound and the circumstances under which it can be attained.

**Problems**

1. **A parameter and a universal inequality.** Find all real $a$ such that

   $$
   x^2-2ax+a+2\ge0
   $$

   for every real $x$. Determine the equality cases. How does the answer change if the requirement is only for every $x\ge0$?

2. **Nesbitt's inequality.** For $a,b,c>0$, prove

   $$
   \frac{a}{b+c}+\frac{b}{c+a}+\frac{c}{a+b}\ge\frac32.
   $$

   Determine when equality holds. A useful rewrite is $a/(b+c)=(a+b+c)/(b+c)-1$.

3. **The best constant in a weighted quadratic bound.** Find the smallest real $C$ such that

   $$
   (x+y+z)^2\le C(x^2+2y^2+3z^2)
   $$

   for every real triple $(x,y,z)$. Give all equality cases and prove that the constant cannot be reduced.

4. **A shortest broken path.** Let $A=(0,2)$ and $B=(6,4)$. Find the point $X=(x,0)$ on the horizontal axis that minimizes $AX+XB$. Obtain the minimum without differentiation, and justify uniqueness.

5. **Logarithms between global bounds.** Prove, for all $x>0$,

   $$
   1-\frac1x\le\ln x\le x-1.
   $$

   Identify equality cases and deduce $e^t\ge1+t$ for all real $t$. Explain why a linear tangent approximation can give a global one-sided bound here.

6. **Mean versus median.** For the data $0,1,2,9,10$, find the value of $c$ minimizing each of

   $$
   \sum_i(x_i-c)^2,\qquad \sum_i|x_i-c|.
   $$

   Give both minimum values. Explain, by pairing the smallest and largest observations, why a median minimizes total absolute distance for any finite list. What happens for an even number of observations?

7. **A box with fixed surface area.** A rectangular box has positive side lengths $x,y,z$ and total surface area $24$, so $xy+yz+zx=12$. Prove that its greatest volume is $8$ and identify the maximizing box. Why is an appeal to symmetry alone insufficient?

**Solution notes**

**1. A parameter and a universal inequality.** Complete the square:

$$
x^2-2ax+a+2=(x-a)^2+a+2-a^2.
$$

Over all real $x$, the minimum occurs at $x=a$, so the required condition is

$$
a+2-a^2=-(a-2)(a+1)\ge0.
$$

Thus $-1\le a\le2$. Equality in the original inequality occurs only at $(a,x)=(-1,-1)$ or $(2,2)$.

For $x\ge0$, the position of the vertex matters. If $a\le0$, then $x^2-2ax\ge0$ and the minimum is attained at $x=0$; the condition is $a+2\ge0$, giving $-2\le a\le0$. If $a>0$, the vertex remains feasible and the previous condition gives $0<a\le2$. The new answer is $-2\le a\le2$, with equality only at $(a,x)=(-2,0)$ or $(2,2)$. **A universal inequality is an optimization problem whose domain must be retained.**

**2. Nesbitt's inequality.** Write $s=a+b+c>0$. By the fractional Cauchy–Schwarz inequality,

$$
\sum_{\mathrm{cyc}}\frac1{s-a}
\ge\frac{(1+1+1)^2}{(s-a)+(s-b)+(s-c)}
=\frac9{2s}.
$$

Therefore

$$
\sum_{\mathrm{cyc}}\frac{a}{s-a}
=s\sum_{\mathrm{cyc}}\frac1{s-a}-3
\ge\frac92-3=\frac32.
$$

Equality requires $s-a=s-b=s-c$, hence $a=b=c$. Scaling all three variables leaves the expression unchanged, so the inequality could equivalently be proved after normalizing $s=1$.

**3. The best constant in a weighted quadratic bound.** Apply Cauchy–Schwarz to the vectors

$$
(x,\sqrt2\,y,\sqrt3\,z),
\qquad
\left(1,\frac1{\sqrt2},\frac1{\sqrt3}\right).
$$

This gives

$$
(x+y+z)^2
\le(x^2+2y^2+3z^2)
\left(1+\frac12+\frac13\right)
=\frac{11}{6}(x^2+2y^2+3z^2).
$$

Equality holds precisely when $(x,y,z)=t(1,1/2,1/3)$ for a real $t$. Taking any nonzero such triple forces $C\ge11/6$, so the smallest constant is $11/6$. **A change of scale in the vectors adapts the usual inequality to a weighted metric.**

**4. A shortest broken path.** Reflect $A$ across the horizontal axis to $A^{\prime}=(0,-2)$. For every point $X$ on that axis, $AX=A^{\prime}X$, so the triangle inequality gives

$$
AX+XB=A^{\prime}X+XB\ge A^{\prime}B
=\sqrt{6^2+6^2}=6\sqrt2.
$$

Equality requires $X$ to lie on the segment from $A^{\prime}$ to $B$. That segment is $(6t,-2+6t)$, $0\le t\le1$, and crosses the axis only at $t=1/3$. Therefore $X=(2,0)$ is the unique minimizer. **Reflection converts a constrained broken path into a straight-segment bound with a feasible equality point.**

**5. Logarithms between global bounds.** The logarithm is strictly concave on $(0,\infty)$; its tangent at $1$ is $y=x-1$. Hence $\ln x\le x-1$, with equality only at $x=1$. Applying the same result to $1/x$ gives

$$
-\ln x\le\frac1x-1
\quad\Longleftrightarrow\quad
\ln x\ge1-\frac1x.
$$

Again equality holds only at $1$. Substituting $x=e^t$ into the upper bound gives $t\le e^t-1$, or $e^t\ge1+t$, with equality only at $t=0$.

The tangent gives a global bound because of concavity. *A tangent to an arbitrary function need not stay above or below the graph away from the point of contact.* The logarithm inequalities can also be recovered directly from its area representation by comparing $1/u$ with constants on the interval between $1$ and $x$.

**6. Mean versus median.** The mean is $\bar x=22/5$. Since the sum of squares of the observations is $186$,

$$
\sum_i(x_i-c)^2
=186-\frac{22^2}{5}+5\left(c-\frac{22}{5}\right)^2
=\frac{446}{5}+5\left(c-\frac{22}{5}\right)^2.
$$

The unique minimizer is $c=22/5$, with minimum $446/5$.

For absolute distances, pair the extreme observations:

$$
|c|+|10-c|\ge10,\qquad
|1-c|+|9-c|\ge8,\qquad
|2-c|\ge0.
$$

At $c=2$ all three lower bounds are attained, so the minimum is $18$, attained uniquely there.

More generally, arrange observations in order and pair the smallest with the largest, then the next smallest with the next largest, and so on. Each pair contributes at least the distance between its observations, with equality whenever $c$ lies between them. For an odd number of observations, taking $c$ equal to the middle observation also makes the unpaired term zero. For an even number, every $c$ between the two middle observations attains all pair bounds; if these observations coincide, that interval is a single point. **The error criterion determines which notion of center is optimal.**

**7. A box with fixed surface area.** Apply AM–GM to the three positive face areas $xy,yz,zx$:

$$
\frac{xy+yz+zx}{3}\ge\bigl((xy)(yz)(zx)\bigr)^{1/3}
=(xyz)^{2/3}.
$$

The constraint gives $4\ge(xyz)^{2/3}$, hence $xyz\le8$. Equality requires $xy=yz=zx$; positivity then gives $x=y=z$, and the surface-area condition gives $x=y=z=2$. This cube attains volume $8$.

Symmetry suggests the cube as a candidate, but does not prove that it beats all other boxes. The inequality supplies that comparison and the equality conditions verify attainment. The positive feasible set is unbounded—for example, one side can grow while the others shrink—so the closed-and-bounded existence theorem is not the justification used here.

## 9. Sequences, Finite Sums, and Counting

How can a step-by-step process be described without listing every step? How can a large collection be counted without listing every object? Recurrences, summation identities, and counting arguments answer these questions by exposing structure.

The guiding method is **to replace a long calculation by a relation that explains how its parts fit together**. A recurrence records dependence, a telescoping sum records cancellation, and a counting identity records two descriptions of the same objects. The [chapter-end problems](#97-classical-problems-and-extensions) connect these methods. Infinite limits are introduced only with their additional conditions.

### 9.1 Sequence Definitions and Recurrences

A `sequence` is a function whose inputs are integers in an ordered index set. Unless otherwise stated, we use $a_0,a_1,a_2,\ldots$. The index convention matters: the first $n$ terms are then $a_0,\ldots,a_{n-1}$, not $a_0,\ldots,a_n$.

An explicit formula gives $a_n$ directly. A `recurrence` gives later terms from earlier ones, together with initial data. Neither is automatically preferable: a recurrence may explain a process more clearly, while an explicit formula may reveal its long-term behaviour.

| Sequence type | Recurrence, with $a_0$ specified | Term for $n\ge1$ |
| --- | --- | --- |
| Arithmetic progression | $a_{n+1}=a_n+d$ | $a_n=a_0+nd$ |
| Geometric progression | $a_{n+1}=ra_n$ | $a_n=a_0r^n$ |
| Constant input with proportional change | $a_{n+1}=ra_n+b$, $r\ne1$ | $a_n=L+(a_0-L)r^n$, where $L=b/(1-r)$ |

For $r=0$, the geometric recurrence gives zero from $a_1$ onward while retaining the specified $a_0$. For the last recurrence, $r=1$ instead gives $a_n=a_0+nb$.

Why does the last formula work? The number $L$ is a `fixed point`: $L=rL+b$. Subtracting this equality from the recurrence gives

$$
a_{n+1}-L=r(a_n-L).
$$

The displacement from equilibrium is a geometric progression. **Shift to a fixed point to turn an affine recurrence into a homogeneous one.**

**Worked example 9.1 — Repeated retention and input**

An initially empty tank retains four fifths of its contents at each step and then receives $6$ units. Its contents satisfy

$$
a_0=0,\qquad a_{n+1}=\frac45a_n+6.
$$

The equilibrium is $L=30$, so

$$
a_n=30\left(1-\left(\frac45\right)^n\right),\qquad n\ge0.
$$

The first values are $0,6,10.8,14.64$. For every finite $n$, the contents remain below $30$, and

$$
a_{n+1}-a_n=6\left(\frac45\right)^n>0.
$$

The formula explains both facts without computing a long table. Its limit is $30$ because $(4/5)^n\to0$, a geometric limit justified in Chapter 10. *Adding the input before retaining four fifths would describe a different recurrence.*

A formula conjectured from the first few values still needs proof. `Mathematical induction` requires a starting case and an implication from the statement at $n$ to the statement at $n+1$, for every index in the stated range. Here the displayed formula gives $a_0=0$, and substituting it into the recurrence gives

$$
\frac45\,30\left(1-\left(\frac45\right)^n\right)+6
=30\left(1-\left(\frac45\right)^{n+1}\right).
$$

This proves the formula for all $n\ge0$. **Induction proves a propagation rule; checking many examples only suggests one.** Strong induction allows the step to use all preceding cases. A second-order recurrence normally needs two initial values and enough starting cases to launch its proof.

For example,

$$
a_{n+2}=p\,a_{n+1}+q\,a_n
$$

determines later terms from $a_0,a_1$. Its two-term state evolves by a linear map:

$$
\begin{pmatrix}a_{n+2}\\a_{n+1}\end{pmatrix}
=
\begin{pmatrix}p&q\\1&0\end{pmatrix}
\begin{pmatrix}a_{n+1}\\a_n\end{pmatrix}.
$$

This connects recurrences with matrix powers. Section 9.6 gives a second algebraic representation using generating functions.

*Initial data alone do not determine a rule.* Infinitely many sequences share any prescribed finite prefix. Nor does every recursive-looking relation uniquely define all later terms: $a_{n+1}^2=a_n^2$ leaves sign choices, while a formula involving division may become undefined. The rule, starting values, admissible operations, and index range must all be specified.

Related: [linear transformations](#75-linear-systems-and-transformations); [exponential growth](#53-exponential-functions); [proof methods](#13-methods-proof-and-cross-topic-connections).

### 9.2 Standard Finite Sums

The notation $\sum_{k=m}^n a_k$ means that the integer index $k$ runs through every value from $m$ to $n$. The index is a placeholder: changing its letter does not change the sum. An `empty sum` is $0$, and an empty product is $1$; these conventions make formulas for zero choices or zero steps consistent.

For positive integers $n$, the main finite-sum formulas are:

| Sum | Value | Useful structure |
| --- | --- | --- |
| $\sum_{k=0}^{n-1}(a_0+kd)$ | $na_0+d\,n(n-1)/2$ | Pair the first and last terms. |
| $\sum_{k=0}^{n-1}r^k$ | $(1-r^n)/(1-r)$ for $r\ne1$; $n$ for $r=1$ | Multiply by $r$ and subtract. |
| $\sum_{k=1}^n k$ | $n(n+1)/2$ | Two reversed copies have constant pair sums. |
| $\sum_{k=1}^n k^2$ | $n(n+1)(2n+1)/6$ | Sum a difference of consecutive cubes. |
| $\sum_{k=1}^n k^3$ | $\bigl(n(n+1)/2\bigr)^2$ | Difference of consecutive squared triangular numbers. |

In the geometric sum, the initial constant term is $1$, including when $r=0$; this is the empty-product convention for the zeroth power in a polynomial. For $n=0$, each sum is empty and equals zero.

To derive the arithmetic formula, add the list to its reversal. Each pair has sum $2a_0+(n-1)d$, and there are $n$ pairs. For the geometric formula, write

$$
G_n=1+r+\cdots+r^{n-1},
\qquad
rG_n=r+r^2+\cdots+r^n.
$$

Subtraction gives $(1-r)G_n=1-r^n$. *Dividing by $1-r$ excludes $r=1$ from that calculation, although the original finite sum is perfectly well defined there.*

**Worked example 9.2 — A sum of squares from a difference of cubes**

Start with the identity

$$
(k+1)^3-k^3=3k^2+3k+1.
$$

Summing from $k=1$ to $n$ cancels all intermediate cubes:

$$
(n+1)^3-1
=3\sum_{k=1}^n k^2+3\frac{n(n+1)}2+n.
$$

Solving for the unknown sum gives

$$
\sum_{k=1}^n k^2=\frac{n(n+1)(2n+1)}6.
$$

**Look for a difference whose expansion contains the desired summand.** The cubic is useful because taking its difference lowers the degree by one.

The cube-sum formula has an equally short explanation. Let $T_k=k(k+1)/2$ and $T_0=0$. Then

$$
T_k^2-T_{k-1}^2
=(T_k-T_{k-1})(T_k+T_{k-1})=k\cdot k^2=k^3.
$$

Summing leaves $T_n^2$.

These calculations introduce `finite differences`. Define $\Delta f(k)=f(k+1)-f(k)$. The identity

$$
\sum_{k=m}^{n-1}\Delta f(k)=f(n)-f(m)
$$

is a discrete counterpart of the fundamental theorem of calculus. A difference lowers the degree of a nonconstant polynomial by one; summing a polynomial sequence produces a polynomial of one higher degree, once the initial sum is fixed.

A finite identity does not automatically justify an infinite one. For real or complex $r$ with $|r|<1$, the remainder $r^n$ tends to zero and the geometric formula yields

$$
\sum_{k=0}^{\infty}r^k=\frac1{1-r}.
$$

For $r=-1$, the finite partial sums alternate between $1$ and $0$; they do not converge to the number $1/2$ obtained by substituting into the rational expression. **Passing from a finite sum to an infinite series is a limit step, with its own hypotheses.**

Related: [powers](#51-extending-the-exponent); [roots of unity](#66-roots-of-unity-and-periodicity); [limits and series](#10-limits-continuity-and-infinity).

### 9.3 Summation Transformations

What should we change when a sum does not match a memorized formula? The most useful changes preserve the terms while exposing cancellation, a repeated pattern, or a simpler indexing region.

Linearity permits constants to pass through a finite sum:

$$
\sum_{k=m}^n(\alpha a_k+\beta b_k)
=\alpha\sum_{k=m}^n a_k+\beta\sum_{k=m}^n b_k.
$$

`Reindexing` changes both the term and its bounds. For instance,

$$
\sum_{k=0}^{n-1}a_{k+1}=\sum_{j=1}^n a_j,
\qquad
\sum_{k=1}^n a_{n+1-k}=\sum_{j=1}^n a_j.
$$

A safe check is to compare the first term, last term, and number of terms on both sides. *Changing the index inside the summand without changing the endpoints creates a different sum.*

A `telescoping sum` appears when each term is a difference. Partial fractions give

$$
\frac1{k(k+1)}=\frac1k-\frac1{k+1},
$$

so

$$
\sum_{k=1}^n\frac1{k(k+1)}
=1-\frac1{n+1}.
$$

The apparent complexity lies in intermediate terms that cancel. **Find the discrete antiderivative before adding the terms.**

**Worked example 9.3 — A weighted geometric sum**

For $n\ge1$, define

$$
S_n(r)=\sum_{k=1}^n kr^k.
$$

Multiplication by $r$ shifts the terms one place:

$$
rS_n(r)=\sum_{k=2}^{n+1}(k-1)r^k.
$$

Subtracting gives

$$
(1-r)S_n(r)=\sum_{k=1}^n r^k-nr^{n+1}.
$$

For $r\ne1$, insert the finite geometric sum to obtain

$$
S_n(r)
=\frac{r\left(1-(n+1)r^n+nr^{n+1}\right)}{(1-r)^2}.
$$

In particular,

$$
\sum_{k=1}^n\frac{k}{2^k}=2-\frac{n+2}{2^n}.
$$

For $r=1$, the original sum is instead $n(n+1)/2$. The rational formula's excluded value comes from division, not from any singularity in the finite polynomial $S_n(r)$. **A shift reduces the linear weight $k$ to a constant, leaving only endpoint corrections.**

There is a general product rule behind this technique:

$$
\Delta(u_kv_k)=u_k\Delta v_k+v_{k+1}\Delta u_k.
$$

Summing it gives `summation by parts`:

$$
\sum_{k=m}^{n-1}u_k\Delta v_k
=u_nv_n-u_mv_m-\sum_{k=m}^{n-1}v_{k+1}\Delta u_k.
$$

This transfers a difference from one factor to the other, just as integration by parts transfers a derivative. The shift from $v_k$ to $v_{k+1}$ is essential.

A finite double sum can also be reorganized by changing the order in which its indexing region is visited. For a triangular region,

$$
\sum_{i=1}^n\sum_{j=1}^i a_{ij}
=\sum_{j=1}^n\sum_{i=j}^n a_{ij}.
$$

The left side visits rows; the right side visits columns. Both contain exactly the pairs $1\le j\le i\le n$. This is already a form of double counting, even when the entries are not all $1$. *Reordering an infinite sum requires separate convergence arguments; the finite calculation has no such issue.*

Related: [partial fractions and algebraic manipulation](#32-factorization-and-polynomial-division); [finite differences and binomial identities](#95-binomial-identities-and-double-counting); [calculus](#11-calculus-differential-equations-and-approximation).

### 9.4 Counting by Cases and Stages

Before selecting a counting formula, specify what counts as one object. Are positions ordered? Are the objects distinguishable? Is repetition allowed? When are two descriptions considered the same outcome?

The `addition principle` counts a union of disjoint cases. The `multiplication principle` counts successive choices: if there are $a$ first choices and exactly $b$ completions for each, there are $ab$ results. If the number of completions depends on the first choice, add those branch counts instead. *Probabilistic independence is a separate notion; the multiplication principle here concerns the number of allowed choices.*

For $n\ge1$ types or distinct objects, the standard formulas are:

| Situation | Number | Qualification |
| --- | --- | --- |
| Ordered list of length $k$, repetition allowed | $n^k$ | $k\ge0$. |
| Ordered selection of $k$ distinct objects | $n!/(n-k)!$ | $0\le k\le n$. |
| Unordered selection of $k$ distinct objects | $\binom nk=n!/(k!(n-k)!)$ | $0\le k\le n$. |
| Unordered selection of $k$ objects from $n$ types, repetition allowed | $\binom{n+k-1}{k}$ | Equivalent to a nonnegative count for each type. |
| Arrangement with multiplicities $n_1,\ldots,n_s$, totaling $n$ | $n!/(n_1!\cdots n_s!)$ | Objects within each type are indistinguishable. |

The `factorial` is $n!=1\cdot2\cdots n$, with $0!=1$. An empty selection or arrangement counts as one object. For a nonnegative upper index, we set $\binom nk=0$ when $k<0$ or $k>n$; this convention simplifies identities without evaluating factorials of negative integers.

Why divide an ordered selection count by $k!$? Each unordered $k$-element set has exactly $k!$ orderings. **Division is justified by a constant number of representations per object.** If representation counts vary—as can happen when identifying rotations of arrangements with repeated symbols—a blind division by the number of rotations is invalid.

The formula for repeated unordered selections is `stars and bars`. Distributing $k$ identical objects among $n$ labeled boxes is equivalent to solving

$$
x_1+\cdots+x_n=k,\qquad x_i\ge0.
$$

Write $k$ stars in a row and insert $n-1$ bars to separate the box contents. Among the $k+n-1$ positions, choose the bar positions:

$$
\#\{\text{distributions}\}=\binom{k+n-1}{n-1}.
$$

Adjacent bars or a bar at an end encode an empty box. Requiring every box to be nonempty instead gives $\binom{k-1}{n-1}$ for $k\ge n$, by first placing one object in each box.

![The allocation (4,1,3) of eight identical objects to three labeled boxes is encoded by eight stars and two bars. Choosing the two bar positions among ten positions counts all 45 unrestricted allocations.]({{site.img}}/mathematics/elementary-mathematics-reference/stars-and-bars-diagram.svg)

If cases overlap, addition overcounts. For finite sets,

$$
|A\cup B|=|A|+|B|-|A\cap B|.
$$

For more sets, the `inclusion–exclusion principle` continues with alternating intersection sizes:

$$
\left|\bigcup_{i=1}^m A_i\right|
=\sum_{\varnothing\ne J\subseteq\{1,\ldots,m\}}
(-1)^{|J|+1}\left|\bigcap_{j\in J}A_j\right|.
$$

An object belonging to exactly $r\ge1$ of the sets receives total weight
$\binom r1-\binom r2+\cdots+(-1)^{r+1}\binom rr=1$, by the binomial identity in the next section. Thus it is counted exactly once.

**Worked example 9.4 — Identical objects with capacity restrictions**

Distribute $8$ identical objects among three labeled boxes, with at most $4$ in each box. Without capacity restrictions, stars and bars gives $\binom{10}{2}=45$.

If the first box has at least $5$, remove $5$ from it. The remaining $3$ objects can be distributed freely among the three boxes in $\binom52=10$ ways. The same count applies to each other box. Two boxes cannot both contain at least $5$, because only $8$ objects are available. Therefore

$$
45-3\cdot10=15
$$

allocations satisfy the capacities. **Count the unrestricted objects, then remove the forbidden cases with their overlaps correctly accounted for.** The count concerns occupancy vectors, not allocations of eight individually labeled objects.

Sometimes only existence is needed. The `pigeonhole principle` says that placing $N$ objects in $m\ge1$ boxes puts at least $\lceil N/m\rceil$ objects in one box. Otherwise the total capacity would be less than $N$. The important choice is often the definition of a box: residue classes, intervals, or possible states can make an otherwise hidden collision unavoidable.

Related: [congruence and residue classes](#23-congruence-cancellation-and-decimal-periods); [probability models](#12-probability-data-and-statistical-reasoning); [proof methods](#13-methods-proof-and-cross-topic-connections).

### 9.5 Binomial Identities and Double Counting

The `binomial theorem` connects algebra with selection:

$$
(x+y)^n=\sum_{k=0}^n\binom nk x^{n-k}y^k,
\qquad n\ge0.
$$

In multiplying the $n$ factors, choose the $k$ positions that contribute $y$; all other positions contribute $x$. There are $\binom nk$ choices. **A coefficient counts the ways a term can be formed.** For $n=0$, the product is empty and equals $1$.

This finite theorem assumes a nonnegative integer exponent and commuting quantities. *A noninteger power generally requires an infinite expansion with additional analytic conditions. For noncommuting matrices, even $(A+B)^2$ has middle terms $AB+BA$, which need not equal $2AB$.*

Several identities follow by counting the same objects in different ways:

| Identity | Counting interpretation |
| --- | --- |
| $\binom nk=\binom n{n-k}$ | Choose a set or choose its complement. |
| $\binom{n+1}{k}=\binom n{k-1}+\binom nk$ | Separate selections according to whether one distinguished object is included. |
| $\sum_{k=0}^n\binom nk=2^n$ | Classify all subsets by size, or make an include/exclude choice for every object. |
| $\sum_{k=0}^n(-1)^k\binom nk=0$, $n\ge1$ | Toggling one fixed object pairs even-sized and odd-sized subsets. |

The second identity is `Pascal's identity`. Its boundary values are supported by the zero convention for out-of-range lower indices.

**Worked example 9.5 — A subset with a distinguished member**

Evaluate $\sum_{k=1}^n k\binom nk$ for $n\ge1$. Count the pairs consisting of a nonempty subset of an $n$-element set and a marked member of that subset.

Choosing the subset first gives $k\binom nk$ pairs of size $k$. Choosing the marked member first gives $n$ choices, followed by an arbitrary subset of the other $n-1$ elements. Hence

$$
\sum_{k=1}^n k\binom nk=n2^{n-1}.
$$

**Interpret a weight as an additional choice.** The factor $k$ is no longer an awkward algebraic multiplier: it counts the possible marked members.

More generally, choosing an $r$-element set from two disjoint groups of sizes $m,n$ gives `Vandermonde's identity`:

$$
\sum_{k=0}^r\binom mk\binom n{r-k}
=\binom{m+n}{r},
\qquad 0\le r\le m+n.
$$

The cases classify the selection by the number $k$ taken from the first group. The zero convention automatically discards impossible cases.

**Worked example 9.6 — A binomial sum as a family of paths**

A lattice path from $(0,0)$ to $(8,4)$ uses eight east steps and four north steps. Choosing the four north-step positions among twelve gives $\binom{12}{4}=495$ paths.

Now divide the same path after its first five steps. If the prefix has $k$ north steps, it has $\binom5k$ possible orders; the last seven steps have $4-k$ north steps and $\binom7{4-k}$ possible orders. Thus

$$
\sum_{k=0}^4\binom5k\binom7{4-k}=\binom{12}{4}=495.
$$

Every path crosses the diagonal $x+y=5$ exactly once, at $(5-k,k)$. **The split partitions the objects into disjoint cases, so multiplying within cases and adding across cases counts each path once.**

![Monotone paths from (0,0) to (8,4) cross x+y=5 after five steps. The illustrated path has two north steps before the crossing at (3,2), showing the decomposition used in Vandermonde's identity.]({{site.img}}/mathematics/elementary-mathematics-reference/vandermonde-lattice-paths-diagram.svg)

Binomial coefficients also supply a natural basis for finite differences. Pascal's identity gives

$$
\Delta\binom{k}{r+1}=\binom{k}{r}.
$$

Telescoping therefore yields the `hockey-stick identity`:

$$
\sum_{k=0}^{n-1}\binom{k}{r}=\binom{n}{r+1},
\qquad r\ge0,\ n\ge1.
$$

This can also be proved by classifying an $(r+1)$-element subset of $\lbrace 1,\ldots,n\rbrace $ by its largest element. Algebraic cancellation and counting describe the same relation.

For a polynomial $P$ of degree at most $d$, these ideas give `Newton's forward-difference formula`:

$$
P(t)=\sum_{j=0}^d\binom tj\,\Delta^jP(0),
\qquad
\binom tj=\frac{t(t-1)\cdots(t-j+1)}{j!}.
$$

Here $\binom t0=1$ and the expression is a polynomial in $t$, not a selection count when $t$ is an arbitrary real number. The formula follows because $\Delta\binom tj=\binom t{j-1}$ for $j\ge1$, while $\Delta\binom t0=0$: the right-hand side has exactly the same successive differences at $0$ as $P$, hence the same values at $0,\ldots,d$. Polynomials of degree at most $d$ agreeing at those $d+1$ points are identical.

**Binomial polynomials serve finite differences much as powers serve differentiation.** A difference table reconstructs a polynomial under a degree assumption; it does not prove that an arbitrary sequence continues polynomially.

Related: [polynomial identities](#32-factorization-and-polynomial-division); [summation transformations](#93-summation-transformations); [interpolation and Taylor approximation](#11-calculus-differential-equations-and-approximation).

### 9.6 Generating Functions as an Extension

A `generating function` records a sequence as coefficients:

$$
A(z)=\sum_{n=0}^{\infty}a_nz^n,
\qquad [z^n]A(z)=a_n.
$$

There are two viewpoints. Analytically, this may define a function where the series converges. Algebraically, it is a `formal power series`: a record of coefficients whose equality means equality at every index. This section begins with the formal viewpoint, so no numerical value is assigned to $z$.

Addition is coefficientwise. Multiplication is defined by the finite `convolution`

$$
[z^n](A(z)B(z))=\sum_{k=0}^n a_kb_{n-k}.
$$

Each individual coefficient uses only finitely many terms, even though the two coefficient lists are infinite. In counting, the product represents an object uniquely assembled from an ordered pair of components whose sizes add to $n$.

Multiplying by $z$ shifts a sequence one place, while summing partial sums corresponds to division by $1-z$:

$$
[z^n]\frac{A(z)}{1-z}=\sum_{k=0}^n a_k.
$$

The formal identity $(1-z)(1+z+z^2+\cdots)=1$ holds because all positive-degree coefficients cancel. More generally, a real-coefficient formal power series has a multiplicative inverse precisely when its constant coefficient is nonzero; equating coefficients determines that inverse recursively.

**Worked example 9.7 — Tiling a strip, a recurrence, and an exact formula**

Let $t_n$ count tilings of a length-$n$ strip by unit tiles and length-$2$ dominoes. There is one empty tiling, so $t_0=1$, and $t_1=1$. For $n\ge2$, separate tilings by their last tile:

$$
t_n=t_{n-1}+t_{n-2}.
$$

Let $T(z)=\sum_{n\ge0}t_nz^n$. Summing the recurrence with its starting terms retained gives

$$
T(z)-1-z=z(T(z)-1)+z^2T(z),
$$

hence

$$
T(z)=\frac1{1-z-z^2}.
$$

**Index shifts turn the recurrence into an algebraic equation, while the initial data determine its numerator.** Forgetting the first terms would produce the wrong generating function.

To recover a direct formula, put

$$
\varphi=\frac{1+\sqrt5}{2},
\qquad
\psi=\frac{1-\sqrt5}{2}.
$$

Since $\varphi+\psi=1$ and $\varphi\psi=-1$,

$$
T(z)=\frac1{(1-\varphi z)(1-\psi z)}
=\frac1{\sqrt5}\left(
\frac{\varphi}{1-\varphi z}
-\frac{\psi}{1-\psi z}\right).
$$

Extracting coefficients by the formal geometric identity gives

$$
t_n=\frac{\varphi^{n+1}-\psi^{n+1}}{\sqrt5}.
$$

These are the Fibonacci numbers shifted by one: $t_n=F_{n+1}$, with $F_0=0$, $F_1=1$. The recurrence and initial values explain why the expression is an integer, despite its irrational ingredients. The denominator factors correspond to the characteristic roots of the recurrence.

For a general homogeneous constant-coefficient recurrence,

$$
a_n=c_1a_{n-1}+\cdots+c_ra_{n-r},
\qquad n\ge r,
$$

coefficient comparison gives

$$
(1-c_1z-\cdots-c_rz^r)A(z)=P(z),
$$

where the polynomial $P$ records the initial terms. Thus such recurrences lead to rational generating functions. Repeated denominator factors explain polynomial factors in the index: for example,

$$
\frac1{(1-rz)^2}=\sum_{n\ge0}(n+1)r^nz^n,
$$

because the coefficient in the square of a geometric series is the sum of $n+1$ identical products. Powers of degree zero here follow the empty-product convention.

Generating functions also encode restrictions directly. The possible contents $0,\ldots,4$ of one box contribute $1+z+\cdots+z^4$. Three labeled boxes therefore give

$$
[z^8](1+z+z^2+z^3+z^4)^3=15,
$$

the capacity count from Section 9.4. Multiplication combines boxes, while the exponent tracks the total number of objects.

*Formal identities do not authorize arbitrary numerical substitution.* The formal series $\sum_{n\ge0}n!z^n$ is meaningful coefficientwise, but at any fixed nonzero $z$ its terms eventually grow in magnitude, since the ratio of successive magnitudes is $(n+1)|z|$. It therefore cannot converge there. Similarly, substituting $z=1$ into the formal geometric series is not a valid evaluation.

**Formal algebra organizes coefficients; analysis determines when their sum represents a numerical function.** The distinction allows generating functions to solve finite counting problems without silently assuming the convergence results of Chapter 10.

Related: [recurrences](#91-sequence-definitions-and-recurrences); [polynomial roots](#35-roots-multiplicity-and-coefficients); [Fibonacci numbers and Euclid](#27-classical-problems-and-extensions); [power series and convergence](#10-limits-continuity-and-infinity).

### 9.7 Classical Problems and Extensions

Try the problems before reading the solution notes. State the initial values, index range, and counting conventions used in each argument.

**Problems**

1. **The Tower of Hanoi.** There are three pegs and $n$ disks of distinct sizes, initially stacked on one peg in increasing size from top to bottom. Move the stack to another peg, moving one top disk at a time and never placing a larger disk on a smaller one. If $T_n$ is the minimum number of moves, prove

   $$
   T_0=0,\qquad T_n=2T_{n-1}+1,
   $$

   and obtain an explicit formula. Prove that your construction is optimal, not merely that it works.

2. **A factorial telescoping sum.** For $n\ge1$, evaluate

   $$
   \sum_{k=1}^n\frac{k}{(k+1)!}.
   $$

   Find a representation of each term as a difference before summing.

3. **A divisible consecutive block.** Given any $n\ge1$ integers $a_1,\ldots,a_n$, prove that some nonempty consecutive block has sum divisible by $n$. Apply the pigeonhole principle to partial sums, including the empty partial sum.

4. **Derangements.** A permutation of $n$ labeled objects is a derangement if no object remains in its original position. Prove that the number is

   $$
   D_n=n!\sum_{k=0}^n\frac{(-1)^k}{k!},
   $$

   and calculate $D_5$. Explain why fixing a chosen set of positions does not require all remaining positions to be moved.

5. **Selections with no adjacent elements.** For $0\le k\le n$, count the $k$-element subsets of $\lbrace 1,\ldots,n\rbrace $ containing no two consecutive integers. Construct a bijection by shifting the ordered selected elements. Then show that the total number of such subsets, including the empty set, is $F_{n+2}$.

6. **Coin totals by coefficients.** With unlimited coins of values $1,2,5$, how many unordered combinations have total value $10$? Express the count as a generating-function coefficient and evaluate it. Coin order is not part of an outcome.

7. **What a difference table does and does not determine.** Suppose $a_0,\ldots,a_4$ are

   $$
   1,\quad3,\quad7,\quad13,\quad21.
   $$

   Under the assumption $a_n=P(n)$ for a polynomial of degree at most $2$, recover $P$ using forward differences and find $a_5$. Show that without the degree assumption the same five initial values allow any prescribed real value of $a_5$.

**Solution notes**

**1. The Tower of Hanoi.** A construction moves the top $n-1$ disks to the spare peg, moves the largest disk to the destination, and moves the smaller stack onto it. This gives $2T_{n-1}+1$ moves.

For a lower bound, inspect any legal solution. Before the largest disk can move for the first time, all smaller disks must be stacked on a single other peg, requiring at least $T_{n-1}$ moves. After the largest disk moves for the last time, it is on the destination peg, and the smaller stack must still be transferred onto it, requiring at least another $T_{n-1}$ moves. The largest disk itself moves at least once. Thus no solution uses fewer than $2T_{n-1}+1$ moves.

The construction attains the bound, establishing the recurrence. Now $T_n+1=2(T_{n-1}+1)$ and $T_0+1=1$, so

$$
T_n=2^n-1.
$$

**A recursive construction gives an upper bound; a necessary decomposition of every solution gives the matching lower bound.**

**2. A factorial telescoping sum.** Since

$$
\frac{k}{(k+1)!}
=\frac{(k+1)-1}{(k+1)!}
=\frac1{k!}-\frac1{(k+1)!},
$$

the sum is

$$
1-\frac1{(n+1)!}.
$$

The denominator suggests comparing consecutive reciprocal factorials. No infinite-series argument is needed.

**3. A divisible consecutive block.** Let $s_0=0$ and $s_j=a_1+\cdots+a_j$ for $1\le j\le n$. These $n+1$ integers occupy only $n$ residue classes modulo $n$. Therefore $s_i\equiv s_j\pmod n$ for some $0\le i<j\le n$. Their difference is

$$
s_j-s_i=a_{i+1}+\cdots+a_j,
$$

a nonempty consecutive-block sum divisible by $n$. **Choose boxes so that a collision becomes the desired arithmetic relation.**

**4. Derangements.** Let $A_i$ be the set of permutations fixing position $i$. If a specified set of $k$ positions is fixed, the other $n-k$ objects may be permuted in $(n-k)!$ ways. They are unrestricted; some may also be fixed, because intersections in inclusion–exclusion do not mean “exactly these fixed positions.”

There are $\binom nk$ choices of the specified positions. Counting the complement of their union gives

$$
D_n=\sum_{k=0}^n(-1)^k\binom nk(n-k)!
=n!\sum_{k=0}^n\frac{(-1)^k}{k!}.
$$

For $n=5$,

$$
D_5=120-120+60-20+5-1=44.
$$

For $n=0$, the formula gives one empty derangement; for $n=1$, it gives zero. These cases agree with the counting definitions.

**5. Selections with no adjacent elements.** Write the chosen elements as $x_1<\cdots<x_k$, with $x_{i+1}-x_i\ge2$. Set

$$
y_i=x_i-(i-1).
$$

Then $1\le y_1<\cdots<y_k\le n-k+1$. Conversely, any $k$-element subset of $\lbrace 1,\ldots,n-k+1\rbrace $ gives an admissible selection by setting $x_i=y_i+i-1$. Thus the count is

$$
\binom{n-k+1}{k},
$$

interpreted as zero when too many elements are requested, and as one when $k=0$.

Let $B_n$ count all admissible subsets. For $n\ge2$, those excluding $n$ give $B_{n-1}$ possibilities; those including $n$ must exclude $n-1$ and give $B_{n-2}$. Since $B_0=1$ and $B_1=2$, we have $B_n=F_{n+2}$. In particular,

$$
\sum_{k=0}^n\binom{n-k+1}{k}=F_{n+2}.
$$

**A bijection gives a closed count by size, while a last-position decision gives a recurrence for the total.**

**6. Coin totals by coefficients.** The generating function is

$$
(1+z+z^2+\cdots)(1+z^2+z^4+\cdots)(1+z^5+z^{10}+\cdots)
=\frac1{(1-z)(1-z^2)(1-z^5)}.
$$

Each factor chooses the number of coins of one denomination. The answer is its coefficient of $z^{10}$. If there are $h$ five-unit coins, then $h=0,1,2$. For the remaining value $10-5h$, the number of two-unit coins can be any integer from $0$ to $\lfloor(10-5h)/2\rfloor$, after which the number of one-unit coins is forced. The total is

$$
6+3+1=10.
$$

Using $1/(1-z-z^2-z^5)$ would instead count ordered sequences of coins, because its recurrence chooses the last coin. *The algebraic model must preserve the intended distinction between an unordered combination and an ordered sequence.*

**7. What a difference table does and does not determine.** The first differences are $2,4,6,8$, and the second differences are $2,2,2$. Under the quadratic assumption, Newton's formula gives

$$
P(n)=1+2\binom n1+2\binom n2=n^2+n+1.
$$

Thus $a_5=P(5)=31$.

But for any real $c$, the polynomial

$$
Q(n)=n^2+n+1+c\,n(n-1)(n-2)(n-3)(n-4)
$$

agrees with all five given values. At $n=5$ it gives $31+120c$, which can be any prescribed real number. **Interpolation is exact within its stated model; a finite pattern alone does not determine a continuation.**

## 10. Limits, Continuity, and Infinity

What licenses the passage from finitely many calculations to an infinite process? A sequence may appear to settle down, a graph may appear unbroken, and successive approximations may look indistinguishable. None of these observations alone says what the limit is, whether it exists in the number system being used, or which operations preserve it.

The central method is **to replace “eventually close” by a quantified error bound, and to identify the theorem that makes the destination exist**. Completeness, continuity, and different kinds of convergence then answer different questions. The [chapter-end problems](#107-classical-problems-and-extensions) develop approximation algorithms, fixed points, rearrangements, and diagonal arguments.

### 10.1 Limits as Error Control

A sequence of real numbers `converges` to $L$ if

$$
\forall\varepsilon>0\ \exists N\in\mathbb N\
\forall n\ge N:\quad |a_n-L|<\varepsilon.
$$

The tolerance $\varepsilon$ is chosen first; the cutoff $N$ may depend on it. Every term beyond that cutoff must satisfy the bound. A limit need not be attained, and the approach need not be monotone: both $1/n$ and $(-1)^n/n$ tend to zero.

The order of the quantifiers is the content of the definition. *Infinitely many terms near $L$ are not enough; all sufficiently late terms must be near $L$.* For example, $(-1)^n$ has infinitely many terms equal to $1$, but does not converge to $1$ or to any other real number.

Two basic consequences follow from the same error control. A convergent sequence is bounded: take $\varepsilon=1$ for its tail and include the finitely many earlier terms in a larger bound. Its limit is unique: if $L\ne M$ were both limits, eventually each of $\lvert a_n-L\rvert $ and $\lvert a_n-M\rvert $ would be less than $\lvert L-M\rvert /3$, contradicting the triangle inequality.

For a function $f:D\to\mathbb R$, at an accumulation point $c$ of $D$,

$$
\lim_{x\to c}f(x)=L
$$

means that for every $\varepsilon>0$ there is $\delta>0$ such that

$$
x\in D,\quad 0<|x-c|<\delta
\quad\Longrightarrow\quad |f(x)-L|<\varepsilon.
$$

The puncture $0<\lvert x-c\rvert $ matters: the limit concerns nearby values, independently of whether $f(c)$ exists or agrees with $L$. A one-sided limit restricts the allowed side. A two-sided limit exists exactly when the two one-sided limits exist and agree, assuming the domain approaches from both sides.

For example, to prove $x^2\to4$ as $x\to2$, first require $\lvert x-2\rvert <1$. Then $\lvert x+2\rvert <5$, so

$$
|x^2-4|=|x-2|\,|x+2|<5|x-2|.
$$

The choice $\delta=\min(1,\varepsilon/5)$ works. **A preliminary neighbourhood bound controls one factor; the requested tolerance controls the other.**

The familiar limit rules are consequences of such estimates, not rules for manipulating the symbol $\infty$.

| Method | Hypotheses and conclusion |
| --- | --- |
| Sum and product | If $a_n\to A$ and $b_n\to B$, then $a_n+b_n\to A+B$ and $a_nb_n\to AB$. |
| Quotient | If also $B\ne0$, then $a_n/b_n\to A/B$; the denominator is eventually bounded away from zero. |
| Squeeze | If $a_n\le b_n\le c_n$ eventually and $a_n,c_n\to L$, then $b_n\to L$. |
| Continuous substitution | If $a_n\in D_f$, $a_n\to A\in D_f$, and $f$ is continuous at $A$, then $f(a_n)\to f(A)$. |
| Subsequences | Every subsequence of a convergent sequence has the same limit; two subsequences with different limits prove divergence. |

Corresponding rules hold for function limits. For products, the important estimate is

$$
|a_nb_n-AB|
\le |a_n|\,|b_n-B|+|B|\,|a_n-A|;
$$

boundedness of the convergent sequence $(a_n)$ makes the first term controllable.

**Worked example 10.1 — A limit with a computable error**

Find the limit of $a_n=\sqrt{n^2+n}-n$, for $n\ge1$, and quantify its error.

Direct substitution suggests the indeterminate form $\infty-\infty$. Rationalizing gives an exact identity:

$$
a_n
=\frac{n}{\sqrt{n^2+n}+n}
=\frac1{\sqrt{1+1/n}+1}.
$$

Thus $a_n\to1/2$. More usefully,

$$
0<\frac12-a_n
=\frac1{2n\bigl(\sqrt{1+1/n}+1\bigr)^2}
\le\frac1{8n}.
$$

For a prescribed $\varepsilon>0$, any integer $N>1/(8\varepsilon)$ ensures $\lvert a_n-1/2\rvert <\varepsilon$ for all $n\ge N$. **An exact algebraic transformation exposes both the limit and a stopping rule.** Knowing a limit exists does not by itself provide such a rule.

Squeezing is especially useful when oscillation prevents direct substitution. Since $\lvert x\sin(1/x)\rvert \le\lvert x\rvert $, the function tends to zero as $x\to0$, although $\sin(1/x)$ has no limit there. The geometric inequalities

$$
\cos x\le\frac{\sin x}{x}\le1
\qquad (0<x<\pi/2)
$$

similarly yield $\sin x/x\to1$; negative $x$ follow by symmetry. Here angles are in radians, as in [Chapter 6](#6-trigonometry-and-the-complex-plane).

Finally, $a_n\to+\infty$ means that for every real $M$, eventually $a_n>M$. This is divergence to infinity, not convergence to a real number. **Infinity is not a largest real number to substitute into an expression.** Forms such as $0/0$, $\infty/\infty$, and $\infty-\infty$ describe unresolved limiting situations, not numerical answers.

### 10.2 Completeness of the Real Numbers

Why should increasingly accurate approximations have a destination in the number system?

The rational numbers are `dense`: between any two distinct real numbers lies a rational number. Yet they have gaps. Rational decimal truncations of $\sqrt2$ can be made arbitrarily close to one another without converging to a rational number. Density supplies nearby points; it does not supply every limit.

One formulation of `completeness` is the least-upper-bound property:

**Every nonempty subset of $\mathbb R$ that is bounded above has a supremum in $\mathbb R$.**

The `supremum` is the least upper bound; it need not belong to the set. For example, $(0,1)$ has supremum $1$ but no maximum. The set

$$
\{q\in\mathbb Q:q\ge0,\ q^2<2\}
$$

has supremum $\sqrt2$ in $\mathbb R$, but no supremum in $\mathbb Q$. A Dedekind-cut construction makes such missing boundaries into numbers; a Cauchy-sequence construction makes limits of mutually close rational approximations into numbers. These are ways to construct the complete real system, not additional algebraic operations such as extracting one particular root.

A real sequence is `Cauchy` if

$$
\forall\varepsilon>0\ \exists N\
\forall m,n\ge N:\quad |a_m-a_n|<\varepsilon.
$$

This tests mutual closeness without naming a proposed limit. Every convergent sequence is Cauchy, by the triangle inequality. Completeness supplies the converse in $\mathbb R$.

*The condition $a_{n+1}-a_n\to0$ is much weaker.* It compares neighbouring terms only. The harmonic partial sums have successive differences $1/(n+1)\to0$, but their distant tails do not become small.

Several standard existence theorems express the same completeness in forms useful for different problems.

| Form | What it guarantees |
| --- | --- |
| Monotone convergence | An increasing sequence bounded above converges to the supremum of its terms; a decreasing sequence bounded below converges to their infimum. |
| Cauchy criterion | A real sequence converges if and only if it is Cauchy. |
| Nested intervals | Nested nonempty closed bounded intervals have a common point; if their lengths tend to zero, that point is unique. |
| Bolzano–Weierstrass | Every bounded real sequence has a convergent subsequence. |

For monotone convergence, let $L=\sup\lbrace a_n:n\ge0\rbrace $. Given $\varepsilon>0$, $L-\varepsilon$ is not an upper bound, so some $a_N>L-\varepsilon$. Monotonicity then gives $L-\varepsilon<a_n\le L$ for every $n\ge N$. **An order bound becomes a limit through the defining property of the supremum.**

The subsequence theorem has a related bisection proof. Enclose a bounded sequence in a closed interval, repeatedly retain a closed half containing infinitely many terms, and choose terms with increasing indices from the retained intervals. Their lengths tend to zero, forcing the selected terms to converge to their common point. Applied to a Cauchy sequence, this gives a convergent subsequence; the Cauchy condition then forces the entire sequence to the same limit.

**Worked example 10.2 — A nested radical**

Let

$$
a_0=0,\qquad a_{n+1}=\sqrt{2+a_n}.
$$

First prove convergence. Induction gives $0\le a_n<2$. The function $x\mapsto\sqrt{2+x}$ is increasing, and $a_1>a_0$; induction therefore also gives $a_{n+1}>a_n$. Monotone convergence supplies a real limit $L$.

Only now pass to the limit:

$$
L=\sqrt{2+L},\qquad
L^2-L-2=0.
$$

Since $L\ge0$, the limit is $2$. The other algebraic root, $-1$, does not satisfy the original square-root equation.

There is also an error estimate. With $e_n=2-a_n$,

$$
e_{n+1}
=\frac{2-a_n}{2+\sqrt{2+a_n}}
=\frac{e_n}{2+a_{n+1}}
\le\frac{e_n}{2}.
$$

Hence $0<e_n\le2^{1-n}$. The estimate gives an explicit accuracy guarantee in addition to the existence proof.

**Prove convergence before solving the equation that a limit would have to satisfy.** For comparison, $b_{n+1}=1-b_n$, $b_0=0$, has the formal fixed point $1/2$, but the actual sequence alternates between $0$ and $1$.

Closedness and shrinking length also have distinct roles. The nested intervals $(0,1/n)$ have no common point, while the constant sequence of intervals $\lbrack0,1\rbrack$ has many common points. *Nestedness alone guarantees neither existence for open intervals nor uniqueness without shrinking.*

### 10.3 Continuity and Existence

A function $f:D\to\mathbb R$ is `continuous` at $c\in D$ if, for every $\varepsilon>0$, some $\delta>0$ makes

$$
x\in D,\quad |x-c|<\delta
\quad\Longrightarrow\quad |f(x)-f(c)|<\varepsilon.
$$

At an accumulation point, this says $\lim_{x\to c}f(x)=f(c)$. Continuity is relative to the domain; endpoints of a closed interval require only the available side. Equivalently, whenever $x_n\in D$ and $x_n\to c$, we have $f(x_n)\to f(c)$.

Polynomials are continuous everywhere; rational functions are continuous where their denominators do not vanish. Sums, products, and compositions preserve continuity, and quotients do so where the denominator is nonzero. Thus continuity explains when substitution into a limiting process is legitimate.

Three theorems turn local information into global conclusions.

| Theorem | Required setting | Conclusion |
| --- | --- | --- |
| Intermediate value theorem | $f$ continuous on $\lbrack a,b\rbrack$ | Every value between $f(a)$ and $f(b)$ is attained. |
| Extreme value theorem | $f$ continuous on a nonempty closed bounded interval | A finite maximum and a finite minimum are attained. |
| Uniform continuity theorem | $f$ continuous on a closed bounded interval | One $\delta$ works throughout the interval for each prescribed $\varepsilon$. |

For `uniform continuity`, the last assertion means

$$
\forall\varepsilon>0\ \exists\delta>0\
\forall x,y\in[a,b]:
\quad |x-y|<\delta\Longrightarrow |f(x)-f(y)|<\varepsilon.
$$

Ordinary continuity allows $\delta$ to depend on the point; uniform continuity does not. This concerns one function at different inputs. [Uniform convergence](#105-pointwise-and-uniform-convergence) will concern different approximating functions at the same input.

**Worked example 10.3 — Bisection as an existence proof and an algorithm**

Consider $f(x)=x^3-x-1$. Since $f(1)=-1$ and $f(2)=5$, continuity guarantees a root $\alpha\in(1,2)$.

Bisect the interval. If the midpoint is a root, stop; otherwise retain the half whose endpoints have opposite signs. After $k$ bisections, the retained interval $\lbrack a_k,b_k\rbrack$ has length $2^{-k}$. The intervals are nested and closed, so completeness gives a unique common point. Continuity forces its function value to be zero: a strictly positive or strictly negative value would contradict one of the endpoint signs for sufficiently small intervals.

The midpoint $m_k$ therefore satisfies

$$
|m_k-\alpha|\le\frac{b_k-a_k}{2}=2^{-(k+1)}.
$$

After ten bisections the bracket is

$$
\frac{1356}{1024}<\alpha<\frac{1357}{1024},
$$

and the midpoint error is less than $1/2048$.

To prove uniqueness in $\lbrack1,2\rbrack$, take $1\le y<x\le2$. Then

$$
f(x)-f(y)=(x-y)(x^2+xy+y^2-1)>0.
$$

Thus $f$ is strictly increasing there. **The sign change supplies existence, interval length supplies an error bound, and monotonicity supplies uniqueness.** These are separate parts of the argument.

![Bisection of x cubed minus x minus one: nested sign-changing intervals, a limiting root, and a midpoint error bounded by half the bracket width.]({{site.img}}/mathematics/elementary-mathematics-reference/bisection-root-diagram.svg)

Why does the extreme value theorem need its hypotheses? The continuous function $f(x)=x$ on $(0,1)$ has neither maximum nor minimum. The continuous function $1/x$ on $(0,1)$ is unbounded. On the closed interval $\lbrack0,1\rbrack$, the discontinuous function defined by $f(x)=x$ for $x<1$ and $f(1)=0$ has supremum $1$ without attaining it.

A short proof explains the mechanism. If a continuous function on $\lbrack a,b\rbrack$ were unbounded, choose $x_n$ with $\lvert f(x_n)\rvert >n$. Bolzano–Weierstrass provides a subsequence tending to some $c\in\lbrack a,b\rbrack$, contradicting continuity at $c$. Once boundedness is known, choose $x_n$ whose function values approach the supremum. A convergent subsequence and continuity show that the supremum is attained. The minimum follows by applying the same argument to $-f$.

Uniform continuity follows from a similar contradiction: failure would give a fixed $\varepsilon_0>0$ and pairs $x_n,y_n$ with $\lvert x_n-y_n\rvert <1/n$ but $\lvert f(x_n)-f(y_n)\rvert \ge\varepsilon_0$. A convergent subsequence of $(x_n)$ forces the corresponding $(y_n)$ to the same point, contradicting continuity.

The advanced connection is `compactness`. In Euclidean space, a set is compact exactly when it is closed and bounded; on such a set, sequences have convergent subsequences with limits still in the set. **Compactness lets a local property such as continuity support global conclusions about bounds, attainment, and uniform control.** Continuity alone does not imply differentiability: $\lvert x\rvert $ is continuous at zero but has a corner there.

### 10.4 Infinite Series and Remainders

An `infinite series` is defined through a sequence of finite sums:

$$
S_N=\sum_{n=1}^N a_n,\qquad
\sum_{n=1}^{\infty}a_n=S
\quad\text{means}\quad S_N\to S.
$$

Its `remainder` is $R_N=S-S_N$. A numerical approximation needs control of $R_N$, not merely a proof that some limit exists. The [finite identities of Chapter 9](#9-sequences-finite-sums-and-counting) are the starting point; a limiting argument must still justify passing beyond them.

The Cauchy criterion says that the series converges exactly when

$$
\forall\varepsilon>0\ \exists N\
\forall q\ge p\ge N:\quad
\left|\sum_{n=p}^q a_n\right|<\varepsilon.
$$

The entire tail must become small, however many terms it contains. A necessary condition is $a_n\to0$, since $a_n=S_n-S_{n-1}$. **Terms tending to zero do not by themselves imply that their series converges.**

**Worked example 10.4 — Why the harmonic series diverges**

Group terms in blocks whose endpoints are powers of two:

$$
1+\frac12+
\left(\frac13+\frac14\right)+
\left(\frac15+\cdots+\frac18\right)+\cdots.
$$

For $j\ge1$, the block from $n=2^{j-1}+1$ through $2^j$ has $2^{j-1}$ terms, each at least $1/2^j$. Each block therefore contributes at least $1/2$, and

$$
H_{2^m}=\sum_{n=1}^{2^m}\frac1n\ge1+\frac m2.
$$

Thus the partial sums are unbounded. This is an argument about finite groups of positive terms; it does not assume a value for the infinite sum.

The same idea explains the `p-series` threshold. If $p>1$, the block $2^j\le n<2^{j+1}$ contributes at most

$$
2^j(2^j)^{-p}=2^{j(1-p)},
$$

and these bounds form a convergent geometric series. If $0<p\le1$, then $n^{-p}\ge1/n$, so comparison with the harmonic series gives divergence; if $p\le0$, the terms do not tend to zero. Hence $\sum n^{-p}$ converges exactly when $p>1$.

The most useful elementary tests are variations on bounding tails.

| Test | Conditions and use |
| --- | --- |
| Direct comparison | If $0\le a_n\le b_n$ eventually, convergence of $\sum b_n$ implies convergence of $\sum a_n$; divergence of $\sum a_n$ implies divergence of $\sum b_n$. |
| Limit comparison | For eventually positive terms, if $a_n/b_n\to c$ with $0<c<\infty$, the two series converge or diverge together. |
| Ratio test | For eventually nonzero terms, if $\lvert a_{n+1}/a_n\rvert \to L<1$, the series converges absolutely; if $L>1$, including $L=+\infty$, its terms fail to tend to zero. |
| Root test | If $\lvert a_n\rvert ^{1/n}\to L<1$, the series converges absolutely; if $L>1$, its terms fail to tend to zero. |
| Alternating-series test | If $b_n\ge0$, $b_{n+1}\le b_n$, and $b_n\to0$, then $\sum_{n=1}^{\infty}(-1)^{n-1}b_n$ converges, with $\lvert R_N\rvert \le b_{N+1}$. |

In the ratio and root tests, $L=1$ is inconclusive: $\sum1/n$ and $\sum1/n^2$ give opposite outcomes. *A test that does not decide a case is not evidence of divergence.*

Why does a ratio below one help? Choose $r$ with $L<r<1$. Beyond some index $N$, $\lvert a_{n+1}\rvert \le r\lvert a_n\rvert $, so later terms are bounded by a geometric progression. In particular, once this bound is valid,

$$
\sum_{n=N+1}^{\infty}|a_n|
\le \frac{|a_{N+1}|}{1-r}.
$$

For the geometric series itself, the exact finite identity gives, when $r\ne1$,

$$
\sum_{n=0}^{N}r^n=\frac{1-r^{N+1}}{1-r}.
$$

When $\lvert r\rvert <1$, this yields

$$
\sum_{n=0}^{\infty}r^n=\frac1{1-r},
\qquad
|R_N|=\frac{|r|^{N+1}}{|1-r|}.
$$

For real $r$ with $\lvert r\rvert \ge1$, the terms do not tend to zero. The finite identity does not license the same infinite sum outside its convergence domain.

**Worked example 10.5 — An alternating sum with a certified error**

Consider

$$
S_N=1-\frac12+\frac13-\cdots+\frac{(-1)^{N-1}}N.
$$

The even partial sums increase because

$$
S_{2m+2}-S_{2m}
=\frac1{2m+1}-\frac1{2m+2}>0.
$$

The odd partial sums decrease, and every even partial sum lies below every later odd partial sum. Their gap $S_{2m+1}-S_{2m}=1/(2m+1)$ tends to zero. Completeness therefore gives a common limit $S$, with

$$
S_{2m}\le S\le S_{2m+1},
\qquad
|S-S_N|\le\frac1{N+1}.
$$

Taking $N=1000$ guarantees an error smaller than $0.001$. The exact identification $S=\ln2$ follows by integrating a finite geometric identity and bounding the remainder; that connection belongs to [Chapter 11](#11-calculus-differential-equations-and-approximation). It is not needed for the convergence or error proof.

**Opposite monotone bounds can certify an infinite sum without first recognizing its exact value.** The estimate also exposes a practical limitation: this straightforward approximation converges slowly.

A series is `absolutely convergent` when $\sum\lvert a_n\rvert $ converges, and `conditionally convergent` when $\sum a_n$ converges but $\sum\lvert a_n\rvert $ does not. The alternating harmonic series is conditional. Absolute convergence controls every tail by

$$
\left|\sum_{n=p}^q a_n\right|
\le\sum_{n=p}^q|a_n|,
$$

so it implies convergence.

For absolutely convergent series, any rearrangement has the same sum: choose a finite collection containing all but a small absolute tail, and note that every sufficiently long rearranged partial sum includes that collection. *For a conditionally convergent series, changing the order can change the sum or destroy convergence.* [Problem 5](#107-classical-problems-and-extensions) gives an explicit rearrangement whose sum changes. Grouping consecutive terms of an already convergent series preserves its sum because the new partial sums form a subsequence; a rearrangement is a different operation.

### 10.5 Pointwise and Uniform Convergence

Suppose functions $f_n$ approximate a function $f$ on the same domain $D$. What does it mean for the approximation to improve?

In `pointwise convergence`,

$$
\forall x\in D\ \forall\varepsilon>0\
\exists N=N(x,\varepsilon)\
\forall n\ge N:\quad |f_n(x)-f(x)|<\varepsilon.
$$

Each input is held fixed while the index grows. In `uniform convergence`,

$$
\forall\varepsilon>0\ \exists N=N(\varepsilon)\
\forall x\in D\ \forall n\ge N:\quad
|f_n(x)-f(x)|<\varepsilon.
$$

The same cutoff must work for every input. Equivalently,

$$
\sup_{x\in D}|f_n(x)-f(x)|\longrightarrow0.
$$

The supremum may be infinite for some early indices; uniform convergence requires it to become finite and tend to zero. **Uniform convergence controls the worst error over the whole specified domain.**

**Worked example 10.6 — Where does the error go for $x^n$?**

On $\lbrack0,1\rbrack$, let $f_n(x)=x^n$, for $n\ge1$. For each fixed $x<1$, powers form a geometric sequence tending to zero, while $f_n(1)=1$. The pointwise limit is

$$
f(x)=
\begin{cases}
0,&0\le x<1,\\
1,&x=1.
\end{cases}
$$

Despite each $f_n$ being continuous, $f$ is discontinuous. Convergence cannot be uniform. Directly,

$$
\sup_{0\le x\le1}|f_n(x)-f(x)|=1
$$

for every $n$: errors approach $1$ as $x$ approaches $1$ from below, even though the error at $x=1$ itself is zero. This supremum is not attained.

A moving input makes the failure especially clear. Choose $x_n=2^{-1/n}$. Then $x_n<1$ and $x_n\to1$, but

$$
f_n(x_n)=\frac12,\qquad f(x_n)=0.
$$

Pointwise convergence does not control inputs that move with the approximation index.

On a smaller fixed interval $\lbrack0,a\rbrack$, where $0<a<1$, the situation changes:

$$
\sup_{0\le x\le a}|x^n|=a^n\to0.
$$

Convergence is uniform there. For instance, on $\lbrack0,0.8\rbrack$, every $n\ge11$ gives an error at most $0.8^{11}<0.1$. **The domain is part of a uniform-convergence claim; changing it can change the answer.**

![Powers x to the n converge pointwise on the full unit interval, but uniformly to zero on the smaller interval from zero to 0.8, where a common error bound applies.]({{site.img}}/mathematics/elementary-mathematics-reference/pointwise-uniform-convergence-diagram.svg)

The distinction explains why limits do not automatically preserve familiar properties. If continuous functions converge uniformly to $f$, then $f$ is continuous. At a point $c$, choose one index $N$ making both approximation errors less than $\varepsilon/3$ throughout the domain. Continuity of this single $f_N$ controls the middle term in

$$
|f(x)-f(c)|
\le |f(x)-f_N(x)|
+|f_N(x)-f_N(c)|
+|f_N(c)-f(c)|.
$$

This proves continuity of the limit. *A continuous limit does not conversely guarantee uniform convergence:* $x^n\to0$ pointwise on $\lbrack0,1)$, with supremum error still equal to $1$.

For integrable functions on a finite interval, uniform convergence also permits passage of the limit through the integral; the limit is integrable and

$$
\left|\int_a^b f_n(x)\,dx-\int_a^b f(x)\,dx\right|
\le(b-a)\sup_{x\in[a,b]}|f_n(x)-f(x)|.
$$

This estimate previews the integration theory of Chapter 11. Differentiation needs stronger hypotheses: $f_n(x)=\sin(nx)/n$ converges uniformly to zero on $\mathbb R$, but $f_n^{\prime}(0)=1$ for every $n$, whereas the derivative of the limit is zero. **Uniform control of function values alone does not control their slopes.**

For a series of functions, convergence means convergence of its partial-sum functions. The `Weierstrass M-test` gives a practical sufficient condition: if

$$
|u_n(x)|\le M_n\quad(x\in D),
\qquad
\sum_{n=0}^{\infty}M_n<\infty,
$$

then $\sum u_n(x)$ converges uniformly and absolutely on $D$. Every tail is bounded by the same numerical tail $\sum M_n$, independently of $x$.

For example, on $\lbrack-r,r\rbrack$ with $0<r<1$,

$$
\left|\frac1{1-x}-\sum_{n=0}^{N}x^n\right|
=\left|\frac{x^{N+1}}{1-x}\right|
\le\frac{r^{N+1}}{1-r}.
$$

Thus the geometric expansion is uniform on every such smaller interval. It is not uniform on the entire interval $(-1,1)$: for any fixed truncation, the error becomes arbitrarily large as $x\to1$.

More generally, a power series has a radius of convergence $R$, possibly zero or infinite. It converges absolutely inside that radius, diverges outside it, and converges uniformly on every closed interval strictly inside it. Endpoint behaviour must be checked separately. For instance,

$$
\sum_{n=1}^{\infty}\frac{(-1)^{n-1}x^n}{n}
$$

has radius $1$, converges conditionally at $x=1$, and diverges at $x=-1$.

The broader lesson is **to ask which error bound survives the proposed interchange of operations**. Fourier approximation near a jump raises exactly this issue: convergence at each fixed input need not give a small error throughout a neighbourhood of the jump. The detailed trigonometric approximation belongs to Chapter 11; the quantifier distinction is already visible in elementary powers.

### 10.6 Counting Infinite Sets

Does a larger-looking collection necessarily contain more elements? For finite sets, a proper subset has fewer elements. For infinite sets, that rule fails: $n\mapsto2n$ is a bijection from the positive integers to the positive even integers.

Two sets have the same `cardinality` if there is a bijection between them. A set is `countably infinite` if its elements can be listed as $x_1,x_2,\ldots$, with every element appearing exactly once. Here `countable` includes finite sets. An enumeration is an ordering chosen for listing; it need not respect numerical size.

The rational numbers are countable. Write each rational uniquely as $p/q$, with $q>0$ and $\gcd(\lvert p\rvert ,q)=1$, taking $0=0/1$. List the finitely many pairs at each height $\lvert p\rvert +q=1,2,3,\ldots$, in any fixed order within a height. Every rational appears at a finite stage.

This does not arrange the rationals increasingly. Between two distinct rationals lies another, so there is no “next rational” in their natural numerical order. **Density and countability answer different questions: one concerns position, the other the possibility of a listing.**

Finite lists of integers can likewise be enumerated, by bounding both length and the sizes of their entries. Consequently the nonzero polynomials with integer coefficients form a countable set. Each polynomial has finitely many real roots, so the set of all real `algebraic numbers` is countable.

The underlying device is diagonal listing: if countable sets come with enumerations $a_{i,j}$, visit pairs $(i,j)$ by increasing $i+j$ and omit duplicates. Every pair occurs after finitely many steps. This shows that a countable union of such enumerated sets is countable. It does not show that an infinite sequence of choices has only countably many possible outcomes.

**Worked example 10.7 — A number missing from any proposed list**

Suppose all real numbers in $(0,1)$ have been listed as

$$
x_1=0.d_{11}d_{12}d_{13}\ldots,\quad
x_2=0.d_{21}d_{22}d_{23}\ldots,\quad\ldots.
$$

Use the decimal representation that is not eventually all $9$s, so terminating decimals are written with trailing zeros. Define digits

$$
b_n=
\begin{cases}
2,&d_{nn}=1,\\
1,&d_{nn}\ne1,
\end{cases}
\qquad
y=0.b_1b_2b_3\ldots.
$$

Then $y\in(0,1)$ and differs from $x_n$ in the $n$th decimal place for every $n$. Its digits are only $1$ and $2$, so no terminating-decimal ambiguity can identify it with another displayed decimal. Thus $y$ is missing from the proposed complete list, a contradiction.

This is Cantor's `diagonal argument`. **Against every proposed enumeration, construct an object that disagrees with its $n$th entry at the $n$th place.** The argument does not merely find an omitted number in one poorly chosen list; it defeats every possible countable list.

Since $\mathbb R$ is uncountable but its algebraic numbers are countable, the `transcendental numbers` are uncountable. Otherwise the union of two countable sets would exhaust $\mathbb R$. This is an existence and cardinality argument. *It does not prove that a particular familiar constant is transcendental.* For example, $\sqrt2$ is irrational but algebraic because it satisfies $x^2-2=0$; the transcendence of $e$ and $\pi$ requires separate theorems.

The distinctions can now be kept together:

| Question | Relevant structure | Example |
| --- | --- | --- |
| Can the elements be listed? | Cardinality | $\mathbb Q$ is countable; $\mathbb R$ is not. |
| Are there points in every open interval? | Density in $\mathbb R$ | Both the rationals and the irrationals are dense. |
| Do Cauchy approximations have limits in the system? | Completeness | $\mathbb R$ is complete; $\mathbb Q$ is not. |
| Does a correspondence preserve neighbourhoods? | Continuity and topology | An arbitrary bijection need not preserve geometric structure. |

As a further theorem, a line segment and a square have the same cardinality. Yet there is no bijection between them that is continuous in both directions. Cardinality alone forgets dimension and adjacency. A naive proof by interleaving decimal digits also needs care: the conventions used to remove ambiguous decimal expansions can obstruct surjectivity, so an encoding must be checked rather than assumed to be a bijection.

The advanced standpoint is therefore precise: **infinity is studied through specified structures and operations—limits, order, distance, and bijection—not through a single vague notion of endlessness.**

### 10.7 Classical Problems and Extensions

Try the problems before reading the solution notes. Identify which step uses completeness, continuity, an error estimate, or a specified ordering of terms.

**Problems**

1. **Averages of a convergent sequence.** If $a_n\to L$, prove that

   $$
   c_n=\frac{a_1+\cdots+a_n}{n}\longrightarrow L.
   $$

   Split the sum into a fixed initial part and a uniformly small tail. Does convergence of $(c_n)$ force convergence of $(a_n)$?

2. **The Babylonian square-root algorithm.** Starting with $x_0=2$, define

   $$
   x_{n+1}=\frac12\left(x_n+\frac2{x_n}\right).
   $$

   Prove convergence to $\sqrt2$ and derive

   $$
   x_{n+1}-\sqrt2=\frac{(x_n-\sqrt2)^2}{2x_n}.
   $$

   Compute $x_1,x_2,x_3$, and obtain an entirely rational interval containing $\sqrt2$ from $x_3$.

3. **A fixed point on an interval.** Let $a<b$ and let $f:\lbrack a,b\rbrack\to\lbrack a,b\rbrack$ be continuous. Prove that $f(c)=c$ for some $c$ in the interval. Must the fixed point be unique? Show why replacing the closed interval by an open one can destroy existence.

4. **An exact remainder from telescoping.** Find the sum and the exact remainder after $N$ terms of

   $$
   \sum_{n=1}^{\infty}\frac1{n(n+1)}.
   $$

   How many terms suffice to make the remainder smaller than $10^{-4}$?

5. **A rearrangement that changes the sum.** Let

   $$
   S=1-\frac12+\frac13-\frac14+\cdots.
   $$

   Rearrange the terms by taking two positive terms, then one negative term:

   $$
   1+\frac13-\frac12+\frac15+\frac17-\frac14+\cdots.
   $$

   Prove that this rearranged series converges to $3S/2$. Work with finite partial sums before taking limits.

6. **Uniform control on an unbounded domain.** For $x\ge0$ and $n\ge1$, consider

   $$
   f_n(x)=\frac{x}{1+nx},
   \qquad
   g_n(x)=\frac{nx}{1+nx}.
   $$

   Find their pointwise limits and determine whether convergence is uniform on $\lbrack0,\infty)$. Explain why an unbounded domain does not automatically prevent uniform convergence.

7. **Finite descriptions and infinite choices.** Show that all finite strings of zeros and ones form a countable set, but all infinite binary sequences form an uncountable set. Then prove that

   $$
   (b_1,b_2,\ldots)\longmapsto
   \sum_{n=1}^{\infty}\frac{2b_n}{3^n},
   \qquad b_n\in\{0,1\},
   $$

   is an injection into $\lbrack0,1\rbrack$. Use the first differing digit and bound the remaining tail.

**Solution notes**

**1. Averages of a convergent sequence.** Given $\varepsilon>0$, choose $N$ so that $\lvert a_k-L\rvert <\varepsilon/2$ for every $k\ge N$. Put

$$
C=\sum_{k=1}^{N-1}|a_k-L|.
$$

For $n\ge N$,

$$
|c_n-L|
\le\frac{C}{n}
+\frac1n\sum_{k=N}^n|a_k-L|
\le\frac{C}{n}+\frac{\varepsilon}{2}.
$$

Taking $n$ sufficiently large that $C/n<\varepsilon/2$ proves the claim. **A finite initial error is diluted, while the remaining errors are uniformly small.**

The converse is false. For $a_n=(-1)^n$, the sequence does not converge, but its partial sums have absolute value at most $1$, so $\lvert c_n\rvert \le1/n\to0$. This is the basic example of Cesàro averaging: averaging preserves ordinary convergence and can also smooth some divergent oscillations. It does not make the original sequence convergent.

**2. The Babylonian square-root algorithm.** Positivity persists. For every positive $x$,

$$
\frac12\left(x+\frac2x\right)-\sqrt2
=\frac{(x-\sqrt2)^2}{2x}\ge0.
$$

Since $x_0=2>\sqrt2$, all iterates stay above $\sqrt2$. Moreover,

$$
x_{n+1}-x_n=\frac{2-x_n^2}{2x_n}<0.
$$

Thus the sequence decreases and is bounded below. Its limit $L\ge\sqrt2$ exists; continuity of the recurrence gives $L=(L+2/L)/2$, hence $L=\sqrt2$.

Writing $e_n=x_n-\sqrt2$ yields the requested identity. Because $2x_n\ge2\sqrt2$, it implies

$$
e_{n+1}\le\frac{e_n^2}{2\sqrt2}.
$$

**The next error is bounded by a constant times the square of the current error**, explaining the rapid improvement once the approximation is close.

Exact calculation gives

$$
x_1=\frac32,\qquad
x_2=\frac{17}{12},\qquad
x_3=\frac{577}{408}.
$$

Since $x_3>\sqrt2>0$, division gives $2/x_3<\sqrt2$, so

$$
\frac{816}{577}<\sqrt2<\frac{577}{408}.
$$

The width is exactly

$$
\frac{577}{408}-\frac{816}{577}
=\frac{577^2-2\cdot408^2}{408\cdot577}
=\frac1{235416}.
$$

The midpoint of this rational bracket has error less than $1/470832$. A numerical output is now accompanied by a certificate.

**3. A fixed point on an interval.** Let $g(x)=f(x)-x$. It is continuous, with $g(a)\ge0$ and $g(b)\le0$ because $f$ maps into the same interval. If either endpoint value is zero, the proof is complete; otherwise the intermediate value theorem gives an interior zero.

Uniqueness need not hold: $f(x)=x$ fixes every point. On $(0,1)$, the continuous self-map $f(x)=x/2$ has no fixed point in the domain, since its only solution to $f(x)=x$ is $x=0$. *The closed endpoints are part of the existence mechanism.*

**4. An exact remainder from telescoping.** The finite identity

$$
\sum_{n=1}^N\frac1{n(n+1)}
=\sum_{n=1}^N\left(\frac1n-\frac1{n+1}\right)
=1-\frac1{N+1}
$$

shows that the series sums to $1$, with

$$
R_N=\frac1{N+1}.
$$

For strict error $R_N<10^{-4}$, we need $N+1>10000$, so the least sufficient integer is $N=10000$. At $N=9999$ the error equals, rather than falls below, the tolerance. **A finite cancellation identity becomes an infinite sum only after its endpoint term is shown to vanish.**

**5. A rearrangement that changes the sum.** Write $H_m=\sum_{k=1}^m1/k$. The original even partial sums satisfy

$$
S_{2m}=H_{2m}-H_m.
$$

After $m$ complete blocks, the rearranged sum contains the first $2m$ positive odd-denominator terms and the first $m$ negative even-denominator terms. Therefore

$$
T_{3m}
=\left(H_{4m}-\frac12H_{2m}\right)-\frac12H_m
=S_{4m}+\frac12S_{2m}
\longrightarrow\frac32S.
$$

Partial sums ending inside a block differ from $T_{3m}$ by at most the next two positive terms, which tend to zero. Thus the full sequence of rearranged partial sums also converges to $3S/2$.

Every original term appears exactly once: all positive terms and all negative terms are used in their respective orders. Since $S\ge S_2=1/2>0$, the new sum differs from $S$. *Convergence without absolute convergence does not provide order-independent addition.*

**6. Uniform control on an unbounded domain.** For all $x\ge0$,

$$
0\le f_n(x)=\frac{x}{1+nx}<\frac1n.
$$

The supremum is $1/n$, approached as $x\to\infty$, so $f_n\to0$ uniformly even on the unbounded domain.

For $g_n$, the pointwise limit is

$$
g(x)=
\begin{cases}
0,&x=0,\\
1,&x>0.
\end{cases}
$$

For $x>0$, the error is $1/(1+nx)$, whose supremum is $1$ as $x\to0$ from above. Hence convergence is not uniform. Taking $x_n=1/n$ exhibits an error of $1/2$ at every stage.

**Uniform convergence is decided by the worst error, not by boundedness of the domain alone.**

**7. Finite descriptions and infinite choices.** There are $2^k$ binary strings of length $k$. List them by increasing length, and within each length lexicographically, including the empty string. Every finite string appears at a finite place.

If all infinite binary sequences were listed as $(b_{n,1},b_{n,2},\ldots)$, the sequence with $n$th digit $1-b_{n,n}$ would differ from the $n$th listed sequence. Thus no such enumeration exists.

The proposed ternary series converges absolutely and lies between $0$ and

$$
\sum_{n=1}^{\infty}\frac2{3^n}=1.
$$

For two distinct binary sequences, let $m$ be the first position where they differ. The contribution at that position has absolute value $2/3^m$. The later terms can compensate by at most

$$
\sum_{n=m+1}^{\infty}\frac2{3^n}=\frac1{3^m}.
$$

The encoded real numbers therefore differ by at least $1/3^m>0$. This proves injectivity without relying on an unqualified claim about uniqueness of positional notation.

The image is the classical ternary Cantor set. **Infinitely many choices form a different kind of collection from all finite strings, even when each individual choice has only two possibilities.**

## 11. Calculus, Differential Equations, and Approximation

How can local information determine a finite change? How can accumulated change recover the quantity that is changing? And when does replacing a function by a simpler one produce a useful answer?

Calculus connects these questions through limits, but its practical power comes from estimates. **A derivative supplies a local linear model; an integral accumulates contributions; an error bound determines where an approximation can be trusted.** Differential equations turn local laws into problems of reconstruction. Taylor and Fourier methods then provide two different ways to choose simpler approximating functions.

The [chapter-end problems](#117-classical-problems-and-extensions) develop these connections through optimization, motion, differential equations, numerical differentiation, and a classical Fourier calculation.

### 11.1 Differentiation as Local Linear Approximation

For a real function defined near $a$, the `derivative` is

$$
f^{\prime}(a)
=\lim_{h\to0}\frac{f(a+h)-f(a)}h,
$$

provided this limit exists as a finite real number. The quotient is an average rate over a finite increment. Its limit is the instantaneous rate.

An equivalent formulation exposes the structure more clearly:

$$
f(a+h)=f(a)+f^{\prime}(a)h+r(h),
\qquad
\frac{r(h)}h\longrightarrow0.
$$

The notation $r(h)=o(h)$ means exactly this last condition. **Differentiability means that a linear change accounts for the function's change, with an error negligible compared with the input increment.** This is stronger than merely having $r(h)\to0$.

The corresponding tangent line is

$$
y=f(a)+f^{\prime}(a)(x-a).
$$

A tangent need not lie on one side of a curve: the tangent $y=0$ to $y=x^3$ at zero crosses the curve. The relevant condition is agreement to first order, not the number of nearby intersections.

Differentiability implies continuity, because both $f^{\prime}(a)h$ and $r(h)$ tend to zero. The converse fails: $\lvert x\rvert $ is continuous at zero, but its right and left difference quotients are $1$ and $-1$. A vertical tangent can also fail to give a finite derivative; the difference quotient of $x^{1/3}$ at zero grows without bound.

**Worked example 11.1 — A square root and its linearization error**

For $f(x)=\sqrt{x}$, rationalization at $a=4$ gives

$$
\frac{\sqrt{4+h}-2}{h}
=\frac1{\sqrt{4+h}+2}\longrightarrow\frac14.
$$

Thus $\sqrt{4+h}\approx2+h/4$. To determine the accuracy, retain the exact remainder:

$$
\sqrt{4+h}-2-\frac h4
=-\frac{h^2}{4\bigl(\sqrt{4+h}+2\bigr)^2}.
$$

For $h\ge0$, the denominator is at least $64$, so

$$
0\le 2+\frac h4-\sqrt{4+h}\le\frac{h^2}{64}.
$$

At $h=0.04$, this yields

$$
2.009975\le\sqrt{4.04}\le2.01.
$$

The estimate comes from an exact identity, not from assuming that higher-order terms are harmless. **The linear term predicts the change; the remainder certifies the prediction.**

For $y=f(x)$, the `differential` at $a$ is the linear rule $dy=f^{\prime}(a)\,dx$. If $dx=h$, then $dy$ is the linear prediction, while the actual increment is $\Delta y=f(a+h)-f(a)$. In general $\Delta y\ne dy$; their difference is $o(h)$.

The notation $dy/dx$ records a limiting rate. Its fraction-like manipulations must be justified by rules such as the chain rule or change of variables. In a parameterized motion $x=x(t)$, $y=y(t)$, with $x^{\prime}(t)\ne0$,

$$
\frac{dy}{dx}=\frac{dy/dt}{dx/dt}.
$$

The nonzero denominator is essential.

This viewpoint extends to several variables: the derivative becomes a linear map, represented by a Jacobian matrix, which approximates the change caused by a small input vector. The scalar derivative is the one-dimensional instance of the [linear transformations in Chapter 7](#75-linear-systems-and-transformations).

### 11.2 Derivative Rules and Applications

The differentiation rules express how local linear models combine. If $u$ and $v$ are differentiable at the point concerned,

$$
(u+v)^{\prime}=u^{\prime}+v^{\prime},
\qquad
(uv)^{\prime}=u^{\prime}v+uv^{\prime},
$$

and, where $v\ne0$,

$$
\left(\frac uv\right)^{\prime}
=\frac{u^{\prime}v-uv^{\prime}}{v^2}.
$$

For a composition, differentiability of $g$ at $x$ and of $f$ at $g(x)$ gives

$$
(f\circ g)^{\prime}(x)=f^{\prime}(g(x))\,g^{\prime}(x).
$$

The `chain rule` composes the two linear changes. It remains valid when $g^{\prime}(x)=0$; a proof based only on cancelling finite increments can miss this case.

For the product rule, write $\Delta u=u(x+h)-u(x)$ and similarly for $v$. The exact identity

$$
\Delta(uv)=u\,\Delta v+v\,\Delta u+\Delta u\,\Delta v
$$

shows why there are two first-order terms. The last product is $o(h)$ when both functions are differentiable. *The derivative of a product is generally not the product of the derivatives.*

Here is a compact table; inverse trigonometric functions use their principal real branches.

| Function | Derivative | Domain qualification |
| --- | --- | --- |
| $x^p$ | $px^{p-1}$ | For arbitrary real $p$, take $x>0$; integer powers have their usual larger domains. |
| $e^x$, $a^x$ | $e^x$, $a^x\ln a$ | $a>0$. |
| $\ln\lvert x\rvert $, $\log_a x$ | $1/x$, $1/(x\ln a)$ | Respectively $x\ne0$; and $x>0$, $a>0$, $a\ne1$. |
| $\sin x$, $\cos x$ | $\cos x$, $-\sin x$ | Angles in radians. |
| $\tan x$ | $1/\cos^2x$ | $\cos x\ne0$. |
| $\arcsin x$, $\arccos x$ | $1/\sqrt{1-x^2}$, $-1/\sqrt{1-x^2}$ | $\lvert x\rvert <1$. |
| $\arctan x$ | $1/(1+x^2)$ | All real $x$. |

These formulas fit the earlier constructions: the logarithm as area has derivative $1/x$ by the fundamental theorem below; its inverse exponential then has derivative $e^x$. Trigonometric derivatives follow from angle-addition identities and the radian limit $\sin h/h\to1$.

For a continuously differentiable function near a point where its derivative is nonzero, a differentiable local inverse exists and

$$
(f^{-1})^{\prime}(f(x))=\frac1{f^{\prime}(x)}.
$$

The formula requires a suitable inverse branch and a nonzero derivative. For example, the inverse of $x^3$ exists everywhere but is not differentiable with a finite derivative at zero.

A particularly useful form of the chain rule is the `logarithmic derivative`:

$$
\frac{d}{dx}\ln|f(x)|=\frac{f^{\prime}(x)}{f(x)}
\qquad(f(x)\ne0).
$$

It measures relative change. Products become sums of logarithms, and variable exponents become products, provided the real logarithms used are defined.

**Worked example 11.2 — Differentiate and minimize $x^x$**

For $x>0$, let $y=x^x$. Taking logarithms gives $\ln y=x\ln x$, so

$$
\frac{y^{\prime}}y=\ln x+1,
\qquad
y^{\prime}=x^x(\ln x+1).
$$

The derivative is negative for $0<x<e^{-1}$ and positive for $x>e^{-1}$. Hence the unique global minimum is

$$
x=e^{-1},\qquad y=e^{-1/e}.
$$

**Logarithmic differentiation turns a variable exponent into a product, and a derivative sign chart converts the result into a global comparison.** The fixed-exponent formula $px^{p-1}$ cannot be applied with $p=x$ while ignoring the exponent's variation.

Why do derivative signs control finite changes? The `mean value theorem` states that if $f$ is continuous on $\lbrack a,b\rbrack$ and differentiable on $(a,b)$, with $a<b$, then some $c\in(a,b)$ satisfies

$$
f(b)-f(a)=f^{\prime}(c)(b-a).
$$

Subtract the secant line from $f$. The resulting function has equal endpoint values. Unless constant, it attains an interior maximum or minimum, where its derivative is zero. This is Rolle's theorem, and it gives the displayed formula. The existence of an attained extremum comes from [Chapter 10](#103-continuity-and-existence).

Consequently, on an interval, $f^{\prime}\ge0$ implies that $f$ is nondecreasing, $f^{\prime}>0$ implies strict increase, and $f^{\prime}=0$ everywhere implies constancy. If $\lvert f^{\prime}\rvert \le M$, then

$$
|f(b)-f(a)|\le M|b-a|.
$$

**The mean value theorem transfers local slope information to a bound on finite change.** Connectedness matters: a function can have derivative zero on each component of a disconnected domain and have different constants on different components.

At a differentiable interior local extremum, $f^{\prime}(c)=0$. The converse is false: $x^3$ has a stationary point at zero without an extremum. If $f$ is twice continuously differentiable near a stationary point, $f^{\prime\prime}(c)>0$ gives a strict local minimum and $f^{\prime\prime}(c)<0$ a strict local maximum; a zero second derivative is inconclusive. Global optimization also requires examining endpoints, nondifferentiable points, and behaviour near excluded boundaries.

Implicit equations require similar care. Differentiating $x^2+y^2=1$ along a differentiable branch gives $2x+2yy^{\prime}=0$, hence $y^{\prime}=-x/y$ where $y\ne0$. At $(\pm1,0)$, this formula does not give a finite slope; the circle is locally better expressed as $x$ in terms of $y$.

As a limit tool, `l'Hôpital's rule` applies to the indeterminate forms $0/0$ or $\infty/\infty$ under its hypotheses: on a one-sided approach interval, $f,g$ are differentiable, $g^{\prime}\ne0$, the indicated limits of $f,g$ hold, and $f^{\prime}/g^{\prime}$ has a limit, finite or infinite. Then $f/g$ has that limit. *This is a theorem about limits, not the quotient differentiation rule; it does not assert $f/g=f^{\prime}/g^{\prime}$.*

### 11.3 Integration and Accumulation

Suppose a quantity has density or rate $f(x)$. Over a short interval of width $\Delta x$, its contribution is approximately $f(x)\Delta x$. Integration asks whether these finite approximations settle on a value independently of the choices made.

For a bounded function on $\lbrack a,b\rbrack$, take a partition

$$
a=x_0<x_1<\cdots<x_n=b
$$

and tags $\xi_i\in\lbrack x_{i-1},x_i\rbrack$. The `Riemann sum` is

$$
\sum_{i=1}^n f(\xi_i)(x_i-x_{i-1}).
$$

The function is `Riemann integrable` if these sums approach one common limit as the largest subinterval width tends to zero, for every such choice of partitions and tags. That limit is $\int_a^b f(x)\,dx$.

Continuous functions on a closed bounded interval are integrable; bounded piecewise continuous functions with finitely many discontinuities are also integrable. Boundedness alone is insufficient. The function equal to $1$ on rational inputs and $0$ on irrational inputs has sums equal to either $b-a$ or $0$ according to the tags chosen. It has no Riemann integral when $a<b$.

**Worked example 11.3 — Obtain an integral from finite square sums**

For $f(x)=x^2$ on $\lbrack0,1\rbrack$, divide the interval into $n$ equal parts. Monotonicity gives lower and upper rectangle sums

$$
L_n=\frac1n\sum_{k=0}^{n-1}\left(\frac kn\right)^2
=\frac13-\frac1{2n}+\frac1{6n^2},
$$

$$
U_n=\frac1n\sum_{k=1}^{n}\left(\frac kn\right)^2
=\frac13+\frac1{2n}+\frac1{6n^2}.
$$

Their difference is $1/n$, and both tend to $1/3$. Since $x^2$ is continuous and its integral lies between these bounds,

$$
\int_0^1x^2\,dx=\frac13.
$$

**The finite summation formula and two-sided bounds determine the accumulated value.** No antiderivative was needed to obtain it.

An integral is a signed accumulation. If $v(t)$ is velocity, then $\int_a^b v(t)\,dt$ is displacement; total distance is $\int_a^b\lvert v(t)\rvert \,dt$. Likewise, the geometric area between curves $f$ and $g$ is $\int_a^b\lvert f-g\rvert \,dx$, assuming integrability. Using $\int(f-g)$ without checking which curve is above can introduce cancellation.

Linearity and interval addition follow from the finite sums:

$$
\int_a^b(\alpha f+\beta g)
=\alpha\int_a^b f+\beta\int_a^b g,
\qquad
\int_a^c f=\int_a^b f+\int_b^c f.
$$

We define $\int_b^a f=-\int_a^b f$ and $\int_a^a f=0$. For $a<b$,

$$
\left|\int_a^b f\right|\le\int_a^b|f|,
\qquad
m\le f\le M
\ \Longrightarrow\
m(b-a)\le\int_a^b f\le M(b-a).
$$

The units are those of the integrand multiplied by those of the variable. The average value of $f$ is $(b-a)^{-1}\int_a^b f$; for continuous $f$, it equals $f(c)$ for some $c\in\lbrack a,b\rbrack$.

Numerical integration makes the approximating sums part of the answer. With $h=(b-a)/n$ and $x_k=a+kh$, two common rules are

$$
M_n=h\sum_{k=0}^{n-1}f\left(x_k+\frac h2\right),
$$

$$
T_n=h\left(\frac{f(a)+f(b)}2+\sum_{k=1}^{n-1}f(x_k)\right).
$$

They are the composite midpoint and trapezoidal rules. If $f$ is twice continuously differentiable and $\lvert f^{\prime\prime}\rvert \le M_2$ on the interval, their errors satisfy

$$
\left|\int_a^b f-M_n\right|
\le\frac{M_2(b-a)^3}{24n^2},
\qquad
\left|\int_a^b f-T_n\right|
\le\frac{M_2(b-a)^3}{12n^2}.
$$

These bounds come from controlling the local interpolation errors and adding them. *A visually smooth plot or agreement of two approximate answers does not establish the required derivative bound.*

The advanced viewpoint is that integration is a linear operation on functions. It takes an entire distribution of local contributions and produces a total. Its relation to differentiation is a theorem, not part of the definition.

### 11.4 The Fundamental Theorem and Integration Methods

Why should finding a rate undo accumulation?

Let $f$ be continuous on $\lbrack a,b\rbrack$, and define

$$
A(x)=\int_a^x f(t)\,dt.
$$

For an interior point $x$,

$$
\frac{A(x+h)-A(x)}h
=\frac1h\int_x^{x+h}f(t)\,dt.
$$

This is the average value of $f$ over a shrinking interval. Its difference from $f(x)$ is at most the largest value of $\lvert f(t)-f(x)\rvert $ on that interval, which tends to zero by continuity. Hence

$$
A^{\prime}(x)=f(x).
$$

This is the first part of the `fundamental theorem of calculus`.

If $F$ is any antiderivative of $f$, then $(F-A)^{\prime}=0$, so the mean value theorem makes $F-A$ constant. Consequently,

$$
\int_a^b f(x)\,dx=F(b)-F(a).
$$

**Accumulation constructs an antiderivative; every other antiderivative differs from it by a constant on the interval.** This explains both the endpoint evaluation formula and the $+C$ in an indefinite integral.

The basic antiderivative formulas can now be read from the derivative table. In particular,

$$
\int x^p\,dx=\frac{x^{p+1}}{p+1}+C
\quad(p\ne-1),
\qquad
\int\frac{dx}{x}=\ln|x|+C.
$$

For arbitrary real $p$, the first formula is understood on $x>0$. The second holds on an interval avoiding zero; its constants may be chosen independently on the two components of $\mathbb R\setminus\lbrace 0\rbrace $. The exponent $-1$ is an exceptional case, not a value to insert into the first formula.

Two methods organize a large part of elementary integration.

For continuous $f$ and a continuously differentiable substitution $u=\phi(x)$ whose image stays in the domain of $f$,

$$
\int_a^b f(\phi(x))\phi^{\prime}(x)\,dx
=\int_{\phi(a)}^{\phi(b)}f(u)\,du.
$$

`Substitution` is the integrated chain rule. Transform the integrand, differential factor, and bounds together. This definite identity does not require $\phi$ to be one-to-one: repeated traversal is accounted for by the signed factor $\phi^{\prime}$. Solving separately for $x$ in terms of $u$ can require branch restrictions.

For continuously differentiable $u,v$,

$$
\int_a^b u(x)v^{\prime}(x)\,dx
=u(b)v(b)-u(a)v(a)-\int_a^b u^{\prime}(x)v(x)\,dx.
$$

`Integration by parts` is the integrated product rule. It is useful when differentiating one factor simplifies it and integrating the other is manageable.

**Worked example 11.4 — Integration by parts followed by division**

Evaluate $I=\int_0^1x\ln(1+x)\,dx$. Take $u=\ln(1+x)$ and $v^{\prime}=x$. Then

$$
I=\frac12\ln2-\frac12\int_0^1\frac{x^2}{1+x}\,dx.
$$

Polynomial division gives

$$
\frac{x^2}{1+x}=x-1+\frac1{1+x},
$$

so

$$
\int_0^1\frac{x^2}{1+x}\,dx=-\frac12+\ln2,
\qquad I=\frac14.
$$

**Choose a method that simplifies the remaining integral, then use algebra to expose standard antiderivatives.** The logarithms cancel only after their endpoint contributions have been retained.

Partial fractions are another algebraic bridge. After polynomial division, a real rational function can be decomposed using linear and irreducible quadratic factors of its denominator. Repeated factors must be included. The resulting integrals reduce to rational terms, logarithms, and inverse tangents; the factorization and decomposition belong to [Chapter 3](#3-algebraic-expressions-polynomials-and-equations).

A useful variable-endpoint form of the fundamental theorem is

$$
\frac{d}{dx}\int_{g(x)}^{h(x)}f(t)\,dt
=f(h(x))h^{\prime}(x)-f(g(x))g^{\prime}(x),
$$

when $f$ is continuous on the relevant range and $g,h$ are differentiable. Both endpoint motions contribute.

**Worked example 11.5 — Justify the logarithmic series from a finite identity**

For $N\ge1$ and $0\le t\le1$, finite geometric summation gives

$$
\frac1{1+t}
=\sum_{k=0}^{N-1}(-t)^k+\frac{(-t)^N}{1+t}.
$$

Integrate this finite identity from $0$ to $x$, where $0\le x\le1$:

$$
\ln(1+x)
=\sum_{n=1}^N\frac{(-1)^{n-1}x^n}{n}
+(-1)^N\int_0^x\frac{t^N}{1+t}\,dt.
$$

The remainder satisfies

$$
|R_N(x)|\le\int_0^x t^N\,dt
=\frac{x^{N+1}}{N+1}.
$$

At $x=1$, it tends to zero, proving

$$
\ln2=1-\frac12+\frac13-\frac14+\cdots.
$$

This completes the identification left open in [Chapter 10](#104-infinite-series-and-remainders). **Integrate a finite identity and bound what remains before passing to an infinite expansion.** No unproved interchange of an infinite sum and an integral is needed.

Endpoint evaluation also needs limits when an interval is unbounded or the integrand is unbounded. Such an `improper integral` is defined by the relevant one-sided limits. For example,

$$
\int_0^1\frac{dx}{\sqrt{x}}
=\lim_{\varepsilon\downarrow0}
\bigl(2-2\sqrt{\varepsilon}\bigr)=2,
$$

whereas $\int_0^1 dx/x$ diverges.

An interior singularity must be treated separately from each side. The two improper pieces of $\int_{-1}^1dx/x$ diverge, so the improper integral does not exist. Symmetric cutoffs yield zero, but that is a Cauchy principal value, a different limiting prescription. *Cancellation across a singularity cannot replace convergence of the two pieces.*

### 11.5 Differential Equations and Initial Data

A `differential equation` specifies a relation involving an unknown function and its derivatives. An initial-value problem adds the data needed to select a solution, for example

$$
y^{\prime}=F(t,y),\qquad y(t_0)=y_0.
$$

An explicit formula is one possible result. A qualitative description, an interval of existence, or a controlled numerical approximation can also answer the problem.

For a `separable equation` $y^{\prime}=a(t)b(y)$, work first on an interval where $b(y)\ne0$. If $B^{\prime}(y)=1/b(y)$, the chain rule gives

$$
\frac{d}{dt}B(y(t))=a(t),
\qquad
B(y(t))=\int a(t)\,dt+C.
$$

The familiar notation $dy/b(y)=a(t)\,dt$ summarizes this justified operation. *Dividing by $b(y)$ can discard equilibrium solutions at its zeros.* They must be checked separately.

For a `linear equation`

$$
y^{\prime}+p(t)y=q(t),
$$

with continuous $p,q$ on an interval containing $t_0$, set

$$
P(t)=\int_{t_0}^t p(s)\,ds.
$$

Multiplication by the integrating factor $e^{P(t)}$ turns the left side into a product derivative:

$$
\bigl(e^{P(t)}y(t)\bigr)^{\prime}=e^{P(t)}q(t).
$$

Thus the unique solution with $y(t_0)=y_0$ is

$$
y(t)=e^{-P(t)}
\left(y_0+\int_{t_0}^t e^{P(s)}q(s)\,ds\right).
$$

Uniqueness follows by applying the same calculation to the difference of two solutions with the same initial value. **An integrating factor converts the equation into an exact derivative that can be accumulated.**

Several familiar elementary functions can be characterized by differential equations.

| Law | Solution with data at $t=0$ | Meaning |
| --- | --- | --- |
| $y^{\prime}=ky$, $y(0)=y_0$ | $y=y_0e^{kt}$ | Constant proportional growth or decay. |
| $T^{\prime}=-k(T-T_a)$, $T(0)=T_0$, $k>0$ | $T=T_a+(T_0-T_a)e^{-kt}$ | Decay of displacement from a fixed equilibrium. |
| $y^{\prime\prime}+\omega^2y=0$, $y(0)=y_0$, $y^{\prime}(0)=v_0$, $\omega>0$ | $y=y_0\cos(\omega t)+(v_0/\omega)\sin(\omega t)$ | Undamped oscillation with position and velocity data. |

The first two laws connect to the [growth and logarithms of Chapter 5](#55-linearizing-multiplication-and-growth); the third explains why trigonometric functions describe more than triangle ratios. Two initial quantities appear in the second-order equation. For linear homogeneous equations, sums of solutions are again solutions; this is `superposition`.

**Worked example 11.6 — The pendulum and its linear model**

Model a pendulum as a point mass on a massless support of fixed length $\ell$, with uniform gravitational acceleration $g$, no friction, and planar motion. Its angle from the downward vertical satisfies

$$
\theta^{\prime\prime}+\frac g\ell\sin\theta=0.
$$

For small angles in radians, replace $\sin\theta$ by $\theta$. With $\omega=\sqrt{g/\ell}$ and initial data $\theta(0)=A$, $\theta^{\prime}(0)=0$, the linearized equation gives

$$
\theta(t)=A\cos(\omega t),
\qquad
T_0=\frac{2\pi}{\omega}=2\pi\sqrt{\frac\ell g}.
$$

The Taylor bound below gives $\lvert \sin\theta-\theta\rvert \le\lvert \theta\rvert ^3/6$. On an angular range $\lvert \theta\rvert \le\alpha$, the error in the equation's restoring term is therefore at most $(g/\ell)\alpha^3/6$.

This quantifies the local approximation in the equation. *It is not by itself a bound on the difference of the two trajectories over an arbitrarily long time.* The finite-amplitude nonlinear pendulum does not have exactly the amplitude-independent period $T_0$.

**Linearization reveals a solvable local model, while its remainder identifies what the model has neglected.** Superposition applies to the linearized equation, not to the original equation with $\sin\theta$.

Existence and uniqueness also have hypotheses. A standard sufficient local condition is that $F$ be continuous near $(t_0,y_0)$ and locally Lipschitz in $y$ there; for example, a continuous partial derivative with respect to $y$ suffices. Then a unique solution exists on some interval about $t_0$.

Continuity alone need not give uniqueness. For $t\ge0$, the problem

$$
y^{\prime}=2\sqrt{|y|},\qquad y(0)=0
$$

admits the zero solution and, for every $c\ge0$,

$$
y_c(t)=
\begin{cases}
0,&0\le t\le c,\\
(t-c)^2,&t\ge c.
\end{cases}
$$

Each function is differentiable at the joining point and satisfies the equation. The square-root dependence fails the required Lipschitz control near zero. Nor does local uniqueness imply existence for all time: $y^{\prime}=y^2$, $y(0)=1$, has solution $y=1/(1-t)$ on its maximal interval $t<1$, with blow-up at $t=1$.

For numerical work, the local linear model suggests the `Euler method` with step size $h>0$:

$$
t_{n+1}=t_n+h,\qquad
y_{n+1}=y_n+hF(t_n,y_n).
$$

Even a simple equation shows why the step size matters. For $y^{\prime}=-ky$, $k>0$, the exact solution decays, while Euler's method gives

$$
y_n=(1-kh)^n y_0.
$$

For $y_0\ne0$, its iterates tend to zero exactly when $0<kh<2$; the zero initial value stays zero for every step size. They alternate in sign when $1<kh<2$, remain in an undamped alternation at $kh=2$, and grow in magnitude when $kh>2$. For positive initial data, nonnegative iterates require $0<kh\le1$.

![Euler approximations to exponential decay: a small step follows the decay, an intermediate step produces artificial sign changes, and a large step produces growing oscillations.]({{site.img}}/mathematics/elementary-mathematics-reference/euler-decay-stability-diagram.svg)

**A stable differential equation can be approximated by an unstable discrete algorithm.** Accuracy, decay, and preservation of positivity impose different demands on the step size.

### 11.6 Taylor Polynomials, Remainders, and Periodic Approximation

What should a simple approximation preserve? A Taylor polynomial preserves derivatives at one point. A Fourier approximation preserves selected oscillatory components over an entire period. Their coefficients answer different questions, and their errors require different controls.

The degree-at-most-$n$ `Taylor polynomial` about $a$ is

$$
T_n(x)=\sum_{k=0}^n\frac{f^{(k)}(a)}{k!}(x-a)^k,
$$

where $f^{(0)}=f$. It is the unique polynomial of that degree matching $f$ and its first $n$ derivatives at $a$. The tangent line is the case $n=1$.

A polynomial with the right derivatives is not yet an accuracy guarantee. If $f$ has $n+1$ continuous derivatives on the interval between $a$ and $x$, Taylor's theorem gives

$$
f(x)=T_n(x)+R_n(x),
\qquad
R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}
$$

for some $\xi$ between $a$ and $x$. In particular, a bound $\lvert f^{(n+1)}\rvert \le M$ gives

$$
|R_n(x)|\le\frac{M|x-a|^{n+1}}{(n+1)!}.
$$

An equivalent integral remainder under these hypotheses is

$$
R_n(x)=\frac1{n!}\int_a^x (x-t)^n f^{(n+1)}(t)\,dt.
$$

Repeated integration by parts connects this formula to the fundamental theorem. **A finite Taylor approximation is justified by a derivative bound on the interval being used.**

**Worked example 11.7 — Certify a logarithm approximation**

For $f(x)=\ln(1+x)$ about zero,

$$
T_3(x)=x-\frac{x^2}{2}+\frac{x^3}{3},
\qquad
f^{(4)}(x)=-\frac6{(1+x)^4}.
$$

On $\lbrack0,0.1\rbrack$, the fourth derivative is negative and has magnitude at most $6$. Thus

$$
-\frac{x^4}{4}\le R_3(x)\le0.
$$

At $x=0.1$,

$$
T_3(0.1)=\frac{143}{1500},
\qquad
\frac{11437}{120000}
\le\ln(1.1)\le
\frac{143}{1500}.
$$

The error of the cubic approximation is at most $1/40000=0.000025$, with a known sign. **The next derivative controls both the direction and the magnitude of the error.**

An infinite Taylor series represents $f(x)$ only if $R_n(x)\to0$ as $n\to\infty$. The existence of all derivatives does not guarantee this. For example, define

$$
f(x)=
\begin{cases}
e^{-1/x^2},&x\ne0,\\
0,&x=0.
\end{cases}
$$

This function is infinitely differentiable, with every derivative at zero equal to zero. To see the mechanism, derivatives away from zero are polynomials in $1/x$ times $e^{-1/x^2}$, and the exponential tends to zero faster than any power of $1/\lvert x\rvert $ grows. Applying the difference-quotient definition successively gives the zero derivatives at the origin.

Its Taylor series at zero is therefore identically zero, yet $f(x)>0$ for $x\ne0$. **A Taylor series can converge everywhere and still fail to represent the smooth function from which it was obtained.** A function is `real analytic` when it agrees with its Taylor expansion in a neighbourhood of each point of its domain.

For the standard functions, the remainders or finite geometric identities do justify the familiar expansions:

| Function | Expansion about zero | Real inputs where the series equals the function |
| --- | --- | --- |
| $e^x$ | $\sum_{n=0}^{\infty}x^n/n!$ | All $x$. |
| $\sin x$ | $\sum_{n=0}^{\infty}(-1)^n x^{2n+1}/(2n+1)!$ | All $x$. |
| $\cos x$ | $\sum_{n=0}^{\infty}(-1)^n x^{2n}/(2n)!$ | All $x$. |
| $\ln(1+x)$ | $\sum_{n=1}^{\infty}(-1)^{n-1}x^n/n$ | $-1<x\le1$. |
| $\arctan x$ | $\sum_{n=0}^{\infty}(-1)^n x^{2n+1}/(2n+1)$ | $-1\le x\le1$. |

For sine, Taylor's theorem at degree two already gives $\lvert \sin x-x\rvert \le\lvert x\rvert ^3/6$, the bound used in the pendulum model. For the full exponential and trigonometric series, derivatives are bounded on any fixed finite interval, and the factorial denominator forces the remainder to zero. The inverse-tangent expansion follows by integrating the finite geometric identity for $1/(1+t^2)$; its remainder on $\lbrack0,1\rbrack$ has magnitude at most $x^{2N+3}/(2N+3)$ after the terms through $x^{2N+1}$. Negative inputs follow by oddness.

Why can a Taylor expansion fail beyond a finite distance even when the real function remains smooth? Consider

$$
\frac1{1+x^2}=\sum_{n=0}^{\infty}(-1)^n x^{2n},
\qquad |x|<1.
$$

The function is smooth for every real $x$, but the series diverges at and beyond $\lvert x\rvert =1$. In the complex plane, the denominator vanishes at $z=\pm i$, each one unit from the expansion centre. For an analytic function, the Taylor radius is limited by the nearest obstruction to holomorphic extension around that centre. **Complex singularities can determine the reach of a real-variable approximation.** Endpoint convergence is a separate question: integrating this example gives the inverse-tangent series, which does converge at both real endpoints.

![Taylor polynomials for one over one plus x squared on the real axis, alongside the complex singularities at plus and minus i that limit the radius of convergence to one.]({{site.img}}/mathematics/elementary-mathematics-reference/taylor-radius-diagram.svg)

The exponential series also completes a connection used in [Chapter 6](#65-complex-arithmetic-and-geometry). Define

$$
E(z)=\sum_{n=0}^{\infty}\frac{z^n}{n!}
\qquad(z\in\mathbb C).
$$

It converges absolutely for every complex $z$. Multiplying two absolutely convergent series and grouping by total degree, the binomial theorem gives $E(z+w)=E(z)E(w)$. On the real axis it equals $e^x$ by Taylor's theorem; separating even and odd terms at $z=ix$ gives

$$
E(ix)=\cos x+i\sin x.
$$

Thus the complex exponential and Euler's formula are supported by convergence and an explicit product calculation.

For periodic approximation, the data and objective are different. Suppose $f$ is a real, piecewise continuous, $2\pi$-periodic function. Among trigonometric polynomials of degree at most $N$, seek the one minimizing

$$
\int_{-\pi}^{\pi}|f(x)-T(x)|^2\,dx.
$$

The `Fourier coefficients` are

$$
a_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos(nx)\,dx
\quad(n\ge0),
\qquad
b_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin(nx)\,dx
\quad(n\ge1),
$$

and the corresponding partial sum is

$$
S_N(x)=\frac{a_0}{2}
+\sum_{n=1}^N\bigl(a_n\cos(nx)+b_n\sin(nx)\bigr).
$$

The constant, sine, and cosine modes are orthogonal under the product $\langle u,v\rangle=\int_{-\pi}^{\pi}uv$. The formulas make $f-S_N$ orthogonal to every retained mode. Therefore, for every competing $T$ of degree at most $N$,

$$
\int_{-\pi}^{\pi}(f-T)^2
=\int_{-\pi}^{\pi}(f-S_N)^2
+\int_{-\pi}^{\pi}(S_N-T)^2.
$$

This proves the unique minimum. **Fourier approximation is an orthogonal projection in a space of functions**, extending the least-squares geometry of [Chapter 8](#85-convexity-and-averages). Adding another mode does not change the coefficients already computed.

**Worked example 11.8 — A sawtooth and its periodic approximation**

Take $f(x)=x$ for $-\pi<x<\pi$, extend periodically, and assign the value zero at the jumps. Oddness gives $a_n=0$. Integration by parts gives, for $n\ge1$,

$$
b_n=\frac2\pi\int_0^\pi x\sin(nx)\,dx
=\frac{2(-1)^{n+1}}n.
$$

Thus

$$
S_N(x)=2\sum_{n=1}^N\frac{(-1)^{n+1}}n\sin(nx).
$$

For each finite $N$, the squared error is exactly

$$
\int_{-\pi}^{\pi}(f-S_N)^2\,dx
=\frac{2\pi^3}{3}-4\pi\sum_{n=1}^N\frac1{n^2}.
$$

This follows from the projection identity and the integral of $x^2$. It states what the chosen finite approximation optimizes.

A standard sufficient convergence theorem says that a periodic function which is continuously differentiable on each piece of a finite partition, with finite one-sided limits of both the function and its derivative, has Fourier sums converging to

$$
\frac{f(x^-)+f(x^+)}2.
$$

At a continuity point this is $f(x)$; at a jump it is the midpoint of the two one-sided values. Applied to the sawtooth, the limit equals $x$ for $-\pi<x<\pi$ and zero at the jumps.

![Fourier sums of a periodic sawtooth, with a close view of a jump showing that oscillations become narrower while overshoot persists.]({{site.img}}/mathematics/elementary-mathematics-reference/fourier-sawtooth-diagram.svg)

Near a jump, the partial sums exhibit `Gibbs's phenomenon`: the overshoot does not disappear in height as $N$ increases, although it occurs increasingly close to the jump. Convergence is not uniform over a full period. *Least squared error, pointwise convergence, and small maximum error are different requirements.*

Taylor and Fourier methods therefore should not be assessed by one interchangeable criterion. Taylor coefficients match local derivatives; Fourier coefficients minimize an integrated error over a period. Taylor approximation needs a remainder bound on the region of use; Fourier approximation needs a specified norm and appropriate convergence hypotheses.

Finally, practical approximation requires keeping different sources of error distinct.

| Issue | Question | Example |
| --- | --- | --- |
| Model error | How well does the mathematical law describe the situation? | Replacing $\sin\theta$ by $\theta$ in a pendulum equation. |
| Truncation error | What was lost by stopping a mathematical procedure? | A Taylor remainder or the discretization of an ODE. |
| Rounding error | How does finite-precision arithmetic alter the calculation? | Subtraction of nearly equal computed values. |
| Conditioning | How sensitive is the exact answer to changes in its input data? | Recovering a root near a multiple root. |
| Stability | How does the chosen algorithm propagate perturbations? | Euler iterates growing while the exact solution decays. |

For $y=f(x)$, the derivative gives a first-order absolute sensitivity $\lvert f^{\prime}(x)\rvert $. Where $x$ and $f(x)$ are nonzero, the corresponding relative condition number is

$$
\kappa(x)=\left|\frac{x f^{\prime}(x)}{f(x)}\right|.
$$

This is a local sensitivity description, not a rigorous finite-error bound by itself. Such a bound can come from the mean value theorem over an interval.

Even numerical differentiation shows the tradeoff. A smaller step reduces the truncation error in a difference quotient but magnifies errors in the two function values by division by that step. [Problem 7](#117-classical-problems-and-extensions) makes the balance explicit. **More terms, smaller steps, or more displayed digits improve an answer only when the relevant error mechanism is controlled.**

### 11.7 Classical Problems and Extensions

Try the problems before reading the solution notes. Keep domain restrictions, endpoint conditions, and approximation errors visible.

**Problems**

1. **The most economical closed cylinder.** A right circular cylinder with two lids has prescribed volume $V>0$. Find the radius and height minimizing its total surface area. Establish a global minimum, not merely a stationary point.

2. **Displacement and distance.** A particle has velocity $v(t)=t^2-3t+2$ for $0\le t\le3$. Find its displacement and total distance travelled. Identify every change of direction before integrating.

3. **A definite integral by symmetry.** Without finding an antiderivative, evaluate

   $$
   I=\int_0^{\pi/2}\frac{\sin x}{\sin x+\cos x}\,dx.
   $$

   Use the substitution $x=\pi/2-u$ to relate $I$ to another integral.

4. **Logistic growth and lost equilibria.** Let $r,K>0$ and

   $$
   y^{\prime}=ry\left(1-\frac yK\right),\qquad y(0)=y_0,\qquad 0<y_0<K.
   $$

   Solve the problem, identify all constant solutions, and show that the given solution increases to $K$. If $y_0<K/2$, when is its growth rate largest?

5. **Why Newton's method can converge quadratically.** Suppose $f(\alpha)=0$, $f$ is twice continuously differentiable on an interval $I$ about $\alpha$, and $\lvert f^{\prime}\rvert \ge m>0$, $\lvert f^{\prime\prime}\rvert \le M$ there. For

   $$
   x_{\mathrm{new}}=x-\frac{f(x)}{f^{\prime}(x)},
   $$

   prove

   $$
   |x_{\mathrm{new}}-\alpha|
   \le\frac{M}{2m}|x-\alpha|^2
   \qquad(x\in I).
   $$

   Explain why this gives convergence for sufficiently close starting points, but not for arbitrary ones.

6. **Sharp quadrature bounds for a parabola.** For $\int_0^1x^2\,dx$, find the exact errors of the composite midpoint and trapezoidal rules with $n$ equal subintervals. Show that the bounds in Section 11.3 are attained in magnitude. How many subintervals suffice for an error strictly smaller than $10^{-4}$?

7. **An optimal step for noisy differentiation.** Assume $\lvert f^{\prime\prime}\rvert \le M_2$ on the interval from $a$ to $a+h$, where $h>0$. Each computed value of $f$ has absolute error at most $\eta>0$; assume the subsequent subtraction and division are exact. Prove that the computed forward difference has error at most

   $$
   \frac{M_2h}{2}+\frac{2\eta}{h}.
   $$

   For $M_2>0$, minimize this bound over admissible positive $h$. Explain what happens if the minimizing step falls outside the interval where the derivative bound is known.

8. **A Fourier route to the sum of reciprocal squares.** Let $f(x)=\lvert x\rvert $ on $\lbrack-\pi,\pi\rbrack$, extended periodically. Find its Fourier series and justify its equality to $f$ and its uniform convergence. Evaluate at zero and then separate the odd and even terms to obtain

   $$
   \sum_{n=1}^{\infty}\frac1{n^2}=\frac{\pi^2}{6}.
   $$

**Solution notes**

**1. The most economical closed cylinder.** With radius $r>0$ and height $h>0$, the volume condition gives $h=V/(\pi r^2)$. The area is

$$
A(r)=2\pi r^2+2\pi rh
=2\pi r^2+\frac{2V}{r}.
$$

Its derivative vanishes exactly when

$$
4\pi r-\frac{2V}{r^2}=0,
\qquad
r^3=\frac{V}{2\pi}.
$$

Moreover $A^{\prime\prime}(r)=4\pi+4V/r^3>0$ throughout the domain, while $A(r)\to+\infty$ at both ends $r\downarrow0$ and $r\to+\infty$. The stationary point is the unique global minimum:

$$
r=\left(\frac{V}{2\pi}\right)^{1/3},
\qquad h=2r.
$$

**Eliminate the constraint, then use global derivative information to certify the optimum.** Omitting the lids would give a different optimization problem.

**2. Displacement and distance.** Factor $v(t)=(t-1)(t-2)$. Velocity is positive on $(0,1)$, negative on $(1,2)$, and positive on $(2,3)$. An antiderivative is

$$
F(t)=\frac{t^3}{3}-\frac{3t^2}{2}+2t.
$$

The relevant values are

$$
F(0)=0,\quad F(1)=\frac56,\quad
F(2)=\frac23,\quad F(3)=\frac32.
$$

Thus displacement is $F(3)-F(0)=3/2$, whereas distance is

$$
\bigl(F(1)-F(0)\bigr)
+\bigl(F(1)-F(2)\bigr)
+\bigl(F(3)-F(2)\bigr)
=\frac{11}{6}.
$$

**Integrate the signed rate for net change and its absolute value for total movement.**

**3. A definite integral by symmetry.** Substitution gives

$$
I=\int_0^{\pi/2}\frac{\cos u}{\sin u+\cos u}\,du.
$$

Adding this to the original integral,

$$
2I=\int_0^{\pi/2}1\,dx=\frac\pi2,
\qquad I=\frac\pi4.
$$

The denominator is positive throughout the interval. **A symmetry can determine an accumulated value without producing an explicit antiderivative.**

**4. Logistic growth and lost equilibria.** The constant solutions are $y=0$ and $y=K$. On $0<y<K$, separation and partial fractions give

$$
\frac{1}{y(1-y/K)}
=\frac1y+\frac1{K-y},
$$

and hence

$$
\ln\frac{y}{K-y}=rt+C.
$$

Using the initial value yields

$$
y(t)=\frac{K}{1+A e^{-rt}},
\qquad
A=\frac{K-y_0}{y_0}>0.
$$

For $t\ge0$, this stays between $0$ and $K$, increases, and tends to $K$. The formula and these bounds can also be checked directly in the equation.

The growth rate as a function of population is

$$
ry\left(1-\frac yK\right)
=\frac{rK}{4}-\frac rK\left(y-\frac K2\right)^2.
$$

It is largest at $y=K/2$. If $y_0<K/2$, this happens at the positive time

$$
t=\frac1r\ln A.
$$

The limiting population and the point of fastest growth are different. *Division by $y(K-y)$ would have lost both constant solutions unless they were restored separately.*

**5. Why Newton's method can converge quadratically.** Expand $f(\alpha)$ about the current point $x$:

$$
0=f(\alpha)
=f(x)+f^{\prime}(x)(\alpha-x)
+\frac12f^{\prime\prime}(\xi)(\alpha-x)^2.
$$

Rearrangement gives

$$
x-\frac{f(x)}{f^{\prime}(x)}-\alpha
=\frac{f^{\prime\prime}(\xi)}{2f^{\prime}(x)}(x-\alpha)^2,
$$

which proves the bound.

Put $C=M/(2m)$. If $M>0$, choose $\delta>0$ with $\lbrack\alpha-\delta,\alpha+\delta\rbrack\subset I$ and $C\delta<1$. Starting with $\lvert x_0-\alpha\rvert \le\delta$, the estimate keeps every iterate in that interval and gives

$$
|x_{n+1}-\alpha|
\le C\delta\,|x_n-\alpha|.
$$

The errors tend to zero, and the stronger squared-error estimate holds at every step. If $M=0$, the function is affine on the interval and one step gives the root exactly.

**Taylor's remainder explains both the rapid local convergence and the need to stay in a region where the derivative is bounded away from zero.** An arbitrary starting point need not satisfy these conditions. For $f(x)=x^2-2$, the iteration is precisely the Babylonian algorithm studied in Chapter 10.

**6. Sharp quadrature bounds for a parabola.** Finite sum formulas give

$$
M_n=\frac1n\sum_{k=0}^{n-1}
\left(\frac{k+1/2}{n}\right)^2
=\frac13-\frac1{12n^2},
$$

$$
T_n=\frac1n\left(
\frac12+\sum_{k=1}^{n-1}\left(\frac kn\right)^2
\right)
=\frac13+\frac1{6n^2}.
$$

Thus the midpoint rule underestimates by $1/(12n^2)$ and the trapezoidal rule overestimates by $1/(6n^2)$. Since $f^{\prime\prime}=2$, both general bounds are attained.

For strict error below $10^{-4}$, the least sufficient integers are $n=29$ for the midpoint rule and $n=41$ for the trapezoidal rule. **A derivative bound can determine the computational effort before the calculation is performed.**

**7. An optimal step for noisy differentiation.** Taylor's theorem gives

$$
\left|\frac{f(a+h)-f(a)}h-f^{\prime}(a)\right|
\le\frac{M_2h}{2}.
$$

Write the two computed values as $f(a+h)+e_1$ and $f(a)+e_0$, with $\lvert e_0\rvert ,\lvert e_1\rvert \le\eta$. Their contribution to the quotient error is at most $2\eta/h$, proving the proposed bound.

For $M_2>0$, differentiating the bound, or applying AM–GM, gives its unconstrained minimum at

$$
h_{\ast}=2\sqrt{\frac{\eta}{M_2}},
\qquad
\text{minimum bound}=2\sqrt{M_2\eta}.
$$

This choice is valid only if the smoothness bound applies throughout $\lbrack a,a+h_{\ast}\rbrack$ and the function evaluations are available there. If the permitted steps satisfy $0<h\le H<h_{\ast}$, the bound decreases throughout that range, so its minimum there is at $h=H$.

**Decreasing the truncation error and controlling the amplified data error are competing objectives.** The calculation concerns the stated absolute-error model; extra arithmetic errors or a step-dependent evaluation error require a revised estimate.

**8. A Fourier route to the sum of reciprocal squares.** Evenness gives $b_n=0$. Direct integration gives

$$
a_0=\frac2\pi\int_0^\pi x\,dx=\pi,
$$

and, for $n\ge1$,

$$
a_n=\frac2\pi\int_0^\pi x\cos(nx)\,dx
=\frac{2\bigl((-1)^n-1\bigr)}{\pi n^2}.
$$

Therefore

$$
|x|=\frac\pi2-\frac4\pi
\sum_{k=0}^{\infty}\frac{\cos((2k+1)x)}{(2k+1)^2}.
$$

The periodic function is continuous and piecewise continuously differentiable, so the Fourier convergence theorem identifies the sum with the function everywhere, including the joined endpoints. Moreover, the terms are bounded in absolute value by a constant times $1/(2k+1)^2$. Convergence of the $p$-series and the M-test give uniform convergence.

At $x=0$,

$$
\sum_{k=0}^{\infty}\frac1{(2k+1)^2}=\frac{\pi^2}{8}.
$$

Let $A=\sum_{n=1}^{\infty}1/n^2$, known to converge from Chapter 10. Its even terms sum to $A/4$, so

$$
A=\frac{\pi^2}{8}+\frac A4,
\qquad A=\frac{\pi^2}{6}.
$$

**Orthogonal expansion converts a function identity into a numerical summation formula, with convergence established before evaluation and regrouping.**

## 12. Probability, Data, and Statistical Reasoning

What makes a numerical statement about uncertainty justified? Counting outcomes requires a model of which outcomes are possible and how they are weighted. Learning from data requires an additional account of how those data were obtained.

The central method is **to state the experiment, the probability model, and the target of inference before calculating**. Probability derives consequences of a specified model; statistical reasoning uses observations to estimate, compare, or question models and parameters. Neither a long calculation nor a large dataset supplies missing assumptions.

The [chapter-end problems](#127-classical-problems-and-extensions) connect counting, expectation, dependence, repeated sampling, fitting, and Bayesian prediction.

### 12.1 Events and Probability Models

A `sample space` $\Omega$ describes the possible outcomes of an experiment at enough detail to determine the questions being asked. An `event` is a specified collection of outcomes. In a finite model, each outcome $\omega$ receives a weight $p_\omega\ge0$, with

$$
\sum_{\omega\in\Omega}p_\omega=1,
\qquad
P(A)=\sum_{\omega\in A}p_\omega.
$$

If all outcomes are equally likely, this reduces to

$$
P(A)=\frac{|A|}{|\Omega|}.
$$

**Counting gives probabilities only after equal weighting has been justified.** Two fair independent dice have $36$ equally likely ordered outcomes; their eleven possible sums are not equally likely. A sum of $7$ has six representations, while a sum of $2$ has only one.

In a general probability model, probabilities are assigned to a specified collection of measurable events. They are nonnegative, $P(\Omega)=1$, and are countably additive: for pairwise disjoint events,

$$
P\left(\bigcup_{i=1}^{\infty}A_i\right)
=\sum_{i=1}^{\infty}P(A_i).
$$

The measurable-event structure becomes important in more advanced probability. For the finite counting models here, every subset can be used as an event.

The basic rules follow from partitioning outcomes:

$$
P(A^{\mathrm c})=1-P(A),
$$

$$
P(A\cup B)=P(A)+P(B)-P(A\cap B).
$$

More generally, the `union bound` gives

$$
P\left(\bigcup_i A_i\right)\le\sum_iP(A_i).
$$

The union bound does not require independence. It is often useful when exact inclusion–exclusion is difficult.

**Worked example 12.1 — The problem of points**

Two players, A and B, win successive rounds with equal probability, independently from round to round. At the moment play stops, A still needs two wins to finish, while B needs one. What are their probabilities of eventually winning?

Imagine generating two further round outcomes, even when the contest would already have ended. The four equally likely strings are

$$
AA,\quad AB,\quad BA,\quad BB.
$$

Only $AA$ lets A finish first. Thus A's winning probability is $1/4$, and B's is $3/4$.

Why is the imaginary second round legitimate after an immediate B win? Splitting an already decided outcome into two equally likely continuations preserves its total probability. The actual terminal records are $B$, $AB$, and $AA$, with probabilities $1/2$, $1/4$, and $1/4$ respectively. Counting those three records as equally likely would give the wrong answer.

**Extend to a common set of equally weighted possibilities, then group outcomes according to the event of interest.** The same calculation can be organized recursively: A must win the next round, probability $1/2$, and then win the deciding round, probability $1/2$.

A probability model is not uniquely determined by the phrase “choose at random.” Selecting a length uniformly, an area uniformly, or an angle uniformly can produce different distributions. A sampling mechanism must specify which symmetry or weighting is intended.

Finally, an event of probability zero need not be impossible. Under a continuous uniform model on $\lbrack0,1\rbrack$, each particular point has probability zero although every realized outcome is a point. Conversely, an event of probability one can have exceptions of probability zero. *Probabilistic certainty and logical necessity are different notions.*

### 12.2 Conditioning and Independence

If $P(B)>0$, the `conditional probability` of $A$ given $B$ is

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}.
$$

Conditioning restricts attention to $B$ and rescales the remaining probability to one. Rearranging gives the multiplication rule

$$
P(A\cap B)=P(B)P(A\mid B).
$$

For several stages, apply this repeatedly. The factors are conditional probabilities, not automatically the original marginal probabilities.

Events $A$ and $B$ are `independent` when

$$
P(A\cap B)=P(A)P(B).
$$

For $P(B)>0$, this is equivalent to $P(A\mid B)=P(A)$. The product definition also covers zero-probability events without dividing by zero.

`Mutual exclusivity` says that the events cannot occur together. It does not say that learning one occurred leaves the other unchanged. Indeed, if $A\cap B=\varnothing$ and both probabilities are positive, they cannot be independent.

For three or more events, mutual independence requires the product rule for every finite subcollection. Pairwise independence alone is weaker; [Problem 2](#127-classical-problems-and-extensions) gives an explicit counterexample. Conditional independence given a variable or hypothesis is also distinct from independence before conditioning.

Suppose $H_1,\ldots,H_m$ form a disjoint exhaustive partition with positive probabilities. The `law of total probability` is

$$
P(E)=\sum_{i=1}^m P(E\mid H_i)P(H_i).
$$

If $P(E)>0$, `Bayes's rule` then gives

$$
P(H_j\mid E)
=\frac{P(E\mid H_j)P(H_j)}
{\sum_{i=1}^mP(E\mid H_i)P(H_i)}.
$$

The prior weight $P(H_j)$ and the likelihood $P(E\mid H_j)$ both contribute. The likelihood of evidence under a hypothesis is not the posterior probability of that hypothesis.

**Worked example 12.2 — A reliable flag can still have many false alarms**

Consider a hypothetical inspection system. An item is defective with probability $0.01$. The system flags $95\%$ of defective items and $5\%$ of sound items.

Let $D$ mean defective and $F$ mean flagged. Then

$$
P(D\mid F)
=\frac{0.95\cdot0.01}
{0.95\cdot0.01+0.05\cdot0.99}
=\frac{19}{118}\approx0.161.
$$

Expected frequencies in a hypothetical collection of $10000$ items make the denominator visible:

| Item status | Flagged | Not flagged | Total |
| --- | ---: | ---: | ---: |
| Defective | 95 | 5 | 100 |
| Sound | 495 | 9405 | 9900 |
| Total | 590 | 9410 | 10000 |

Among the expected $590$ flagged items, only $95$ are defective. These are model-derived expected counts, not guaranteed counts in an actual batch.

**Weight each route to the observed evidence before comparing explanations.** Confusing $P(F\mid D)=0.95$ with $P(D\mid F)$ ignores how much more common sound items are.

![A probability tree for a hypothetical inspection system: prior defect status, conditional flag probabilities, and the two routes contributing to flagged items.]({{site.img}}/mathematics/elementary-mathematics-reference/bayes-inspection-tree-diagram.svg)

For two competing hypotheses with nonzero relevant probabilities, Bayes's rule can also be written as

$$
\frac{P(H_1\mid E)}{P(H_2\mid E)}
=\frac{P(E\mid H_1)}{P(E\mid H_2)}
\frac{P(H_1)}{P(H_2)}.
$$

The likelihood ratio multiplies the prior odds. Repeated observations require their joint likelihood; multiplying separate likelihoods is justified only by the appropriate conditional independence assumption.

The observation protocol itself can carry information. “An item was selected uniformly and found defective” is a different experiment from “a defective item was deliberately selected and shown.” **Condition on how the evidence was produced, not only on its final description.**

### 12.3 Random Variables and Moments

A `random variable` is a numerical function of the outcome, $X:\Omega\to\mathbb R$. Its distribution describes the probabilities of its values. For a discrete variable,

$$
p_X(x)=P(X=x),\qquad
p_X(x)\ge0,\qquad \sum_xp_X(x)=1.
$$

The `expectation` is a probability-weighted average:

$$
E[X]=\sum_x x\,p_X(x).
$$

For infinitely many possible values, a finite expectation is guaranteed when $\sum_x\lvert x\rvert p_X(x)<\infty$. A finite expected value need not be a possible outcome: the mean of a fair die is $3.5$.

For a function $g$ of the variable,

$$
E[g(X)]=\sum_x g(x)p_X(x),
$$

when the expectation exists. It is generally not $g(E\lbrack X\rbrack )$. For instance, the difference between $E\lbrack X^2\rbrack $ and $(E\lbrack X\rbrack )^2$ is the variance.

If $X$ has a density $f_X$, the corresponding formulas use integrals:

$$
P(a\le X\le b)=\int_a^b f_X(x)\,dx,
\qquad
E[g(X)]=\int_{-\infty}^{\infty}g(x)f_X(x)\,dx,
$$

with the required integrability. A density is nonnegative and integrates to one. Its value at a point is not the probability of that point, and it can exceed one. Not every probability distribution has a density; discrete and mixed models also occur.

The key computational property is `linearity`:

$$
E[aX+bY+c]=aE[X]+bE[Y]+c.
$$

This requires existence of the relevant expectations, but **does not require independence**. It follows by distributing the finite weighted sums, or by the corresponding linearity theorem for integrable variables.

**Worked example 12.3 — The expected number of matches**

Randomly permute $n\ge1$ labeled objects, each of the $n!$ permutations equally likely. Let $X$ be the number left in their original positions. Define an indicator

$$
I_i=
\begin{cases}
1,&\text{object }i\text{ is in its original position},\\
0,&\text{otherwise}.
\end{cases}
$$

Since $P(I_i=1)=1/n$ and $X=I_1+\cdots+I_n$,

$$
E[X]=\sum_{i=1}^n E[I_i]
=n\cdot\frac1n=1.
$$

For $n\ge2$, the indicators are dependent, but their expectations still add. For $n\ge2$, no matches is possible; an expected count of one does not predict exactly one in each permutation.

**Write a complicated count as a sum of simple indicators.** In general, $E\lbrack \mathbf1_A\rbrack =P(A)$, making expectation a bridge between counting and probability. The [derangement calculation in Chapter 9](#97-classical-problems-and-extensions) answers the different question of the probability of no matches.

For a variable with finite second moment and mean $\mu$, its `variance` is

$$
\operatorname{Var}(X)
=E[(X-\mu)^2]
=E[X^2]-\mu^2.
$$

The `standard deviation` is $\sigma_X=\sqrt{\operatorname{Var}(X)}$. Variance is measured in squared units; standard deviation has the original units. Translation leaves variance unchanged, while scaling gives

$$
\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X).
$$

The `covariance` of variables with finite second moments is

$$
\operatorname{Cov}(X,Y)
=E[(X-E[X])(Y-E[Y])]
=E[XY]-E[X]E[Y].
$$

Consequently,

$$
\operatorname{Var}(X+Y)
=\operatorname{Var}(X)+\operatorname{Var}(Y)
+2\operatorname{Cov}(X,Y).
$$

Independent variables have zero covariance, so their variances add. *Zero covariance does not imply independence.* If $X$ is uniform on $\lbrace -1,0,1\rbrace $ and $Y=X^2$, then $\operatorname{Cov}(X,Y)=0$, yet $Y$ is determined by $X$.

When both standard deviations are positive, the `correlation` is

$$
\rho_{X,Y}
=\frac{\operatorname{Cov}(X,Y)}{\sigma_X\sigma_Y},
\qquad |\rho_{X,Y}|\le1.
$$

The bound is Cauchy–Schwarz applied to centered variables. Correlation summarizes linear association; it does not detect every dependence and does not establish causation.

Conditioning gives another way to calculate moments. For a finite partition into groups $H_j$ with $P(H_j)>0$, write

$$
w_j=P(H_j),\quad
\mu_j=E[X\mid H_j],\quad
\sigma_j^2=\operatorname{Var}(X\mid H_j).
$$

Then

$$
\mu=\sum_jw_j\mu_j,
\qquad
\operatorname{Var}(X)
=\sum_jw_j\sigma_j^2+\sum_jw_j(\mu_j-\mu)^2.
$$

The first term is average within-group variation; the second is variation between group means. Expanding $X-\mu=(X-\mu_j)+(\mu_j-\mu)$ within each group proves the identity, because the cross term has conditional mean zero.

**Expectation is a linear averaging operation; variance records both individual variation and dependence.** This connects probability with weighted means, integration, and the geometry of squared distances.

### 12.4 Repeated Trials

Repeated observations become mathematically useful only after their dependence and distributions are specified. A `Bernoulli trial` has outcomes $0$ and $1$, with success probability $p$. Its mean is $p$ and its variance is $p(1-p)$.

If $X$ counts successes in $n$ independent trials with the same success probability, then $X$ has a `binomial distribution`:

$$
P(X=k)=\binom nk p^k(1-p)^{n-k},
\qquad k=0,\ldots,n.
$$

Each specified pattern with $k$ successes has probability $p^k(1-p)^{n-k}$, and there are $\binom nk$ such patterns. The binomial theorem makes the probabilities sum to one. Writing $X$ as a sum of independent indicators gives

$$
E[X]=np,\qquad
\operatorname{Var}(X)=np(1-p).
$$

“Two outcomes on each trial” alone does not imply a binomial model: the trials must also have the stated common probability and independence.

Some useful distributions can be kept together:

| Distribution | Probability mass and support | Mean and variance |
| --- | --- | --- |
| Bernoulli$(p)$ | $P(X=1)=p$, $P(X=0)=1-p$ | $p$; $p(1-p)$. |
| Binomial$(n,p)$ | $\binom nk p^k(1-p)^{n-k}$, $0\le k\le n$ | $np$; $np(1-p)$. |
| Geometric$(p)$ | $p(1-p)^{k-1}$, $k=1,2,\ldots$ | $1/p$; $(1-p)/p^2$. |
| Poisson$(\lambda)$ | $e^{-\lambda}\lambda^k/k!$, $k=0,1,\ldots$ | $\lambda$; $\lambda$. |

The geometric convention here counts trials up to and including the first success, with $0<p<1$; another common convention counts failures before that success and has mean $(1-p)/p$. The Poisson parameter satisfies $\lambda>0$. Bernoulli and binomial endpoint parameters $p=0,1$ give degenerate distributions.

For geometric waiting, $P(T>m)=(1-p)^m$, and

$$
P(T>m+n\mid T>m)=(1-p)^n.
$$

This is the `memoryless property` of repeated independent trials. Waiting without success does not change the next trial's success probability. The moment formulas follow from geometric and weighted-geometric sums.

The Poisson distribution arises as a limit of binomial counts when $n\to\infty$, $p_n\to0$, and $np_n\to\lambda$. For each fixed $k$, the binomial probability tends to $e^{-\lambda}\lambda^k/k!$. This explains a common approximation for many independent rare opportunities. *Rarity alone does not justify it when events cluster or strongly affect one another.*

The generating-function connection is direct. For a nonnegative integer-valued variable, define $G_X(z)=E\lbrack z^X\rbrack $ where the expression is meaningful. Independence gives

$$
G_{X+Y}(z)=G_X(z)G_Y(z),
\qquad
G_{\operatorname{Bin}(n,p)}(z)=(1-p+pz)^n.
$$

Thus the convolution and coefficient methods of [Chapter 9](#96-generating-functions-as-an-extension) become calculations with probability weights.

Sampling without replacement changes the model. From a population of $N$ objects containing $K$ marked objects, choose uniformly a subset of size $n$. The marked count is `hypergeometric`:

$$
P(X=k)
=\frac{\binom Kk\binom{N-K}{n-k}}{\binom Nn},
$$

where $\max(0,n-(N-K))\le k\le\min(n,K)$. Put $p=K/N$. For $N>1$,

$$
E[X]=np,\qquad
\operatorname{Var}(X)=np(1-p)\frac{N-n}{N-1}.
$$

The factor $(N-n)/(N-1)$ is the finite-population correction. When $0<K<N$, indicators of different marked draws have negative covariance because taking one marked object reduces the number left. At $K=0$ or $K=N$, the count is deterministic.

**Worked example 12.4 — Replacement changes the uncertainty**

A batch contains $10$ objects, exactly $3$ marked. Select $4$ without replacement. The probability of selecting no marked object is

$$
\frac{\binom74}{\binom{10}4}
=\frac16,
$$

so the probability of at least one is $5/6$. The mean marked count is $4(3/10)=1.2$, and its variance is

$$
4\cdot\frac3{10}\cdot\frac7{10}\cdot\frac69=0.56.
$$

With replacement and independent draws, the mean remains $1.2$, but the variance is $0.84$ and the probability of no marked object is $(7/10)^4=0.2401$.

**The same marginal success rate can produce different distributions because the sampling mechanism changes dependence.**

For independent identically distributed variables $X_1,\ldots,X_n$, write

$$
\overline X_n=\frac1n\sum_{i=1}^nX_i.
$$

If their common mean is $\mu$ and their common finite variance is $\sigma^2$, then

$$
E[\overline X_n]=\mu,\qquad
\operatorname{Var}(\overline X_n)=\frac{\sigma^2}{n}.
$$

The standard deviation of the estimator $\overline X_n$, called its `standard error`, is $\sigma/\sqrt n$. To halve it under this model requires four times as many independent observations.

A general bound makes the convergence precise. For a nonnegative variable $Y$ and $t>0$, $E\lbrack Y\rbrack \ge tP(Y\ge t)$, yielding Markov's inequality. Apply it to $Y=(X-\mu)^2$ to obtain `Chebyshev's inequality`, for $\varepsilon>0$:

$$
P(|X-\mu|\ge\varepsilon)
\le\frac{\operatorname{Var}(X)}{\varepsilon^2}.
$$

Consequently,

$$
P(|\overline X_n-\mu|\ge\varepsilon)
\le\frac{\sigma^2}{n\varepsilon^2}\longrightarrow0.
$$

This proves a finite-variance version of the `weak law of large numbers`. The average converges in probability to the mean; the theorem does not assert exact agreement after a finite number of trials or compensation for past imbalances.

**Worked example 12.5 — A guaranteed accuracy bound for a proportion**

Let $\widehat p=X/n$ for $n$ independent Bernoulli trials with an unknown fixed probability $p$. Since $p(1-p)\le1/4$,

$$
P(|\widehat p-p|\ge0.05)
\le\frac{1}{4n(0.05)^2}
=\frac{100}{n}.
$$

Thus $n=2000$ is sufficient to guarantee

$$
P(|\widehat p-p|<0.05)\ge0.95
$$

for every $p\in\lbrack0,1\rbrack$ under the model. This is a conservative sufficient bound, not a claim that $2000$ is the smallest sample size. A calculation using the full binomial distribution can be sharper.

**A variance bound turns qualitative convergence into a finite sample-size guarantee.** Dependence, selection bias, or a changing success probability requires reconsidering the model before using the guarantee.

The `central limit theorem` asks a different question: what is the shape of the remaining fluctuations? For independent identically distributed variables with $0<\sigma^2<\infty$,

$$
\frac{\sqrt n(\overline X_n-\mu)}{\sigma}
\ \xrightarrow{\mathrm d}\ N(0,1).
$$

Convergence in distribution here means that the cumulative probabilities tend to those of the standard normal law, whose density and cumulative distribution are

$$
\phi(z)=\frac1{\sqrt{2\pi}}e^{-z^2/2},
\qquad
\Phi(z)=\int_{-\infty}^z\phi(t)\,dt.
$$

The theorem approximates the distribution of a standardized sum or average; it does not make the individual observations normally distributed. The weak law controls concentration, while the central limit theorem describes the scale and limiting shape of fluctuations. *Neither supplies a universal finite sample size beyond which every approximation is accurate.*

### 12.5 Describing Data

A dataset $x_1,\ldots,x_n$ is a collection of observed values. Before summarizing it, identify what one row represents: a person, an object, a trial, or a repeated measurement on the same object. Repeated readings are not automatically independent observations.

The `empirical distribution` assigns mass $1/n$ to each observation, counting repeated values repeatedly. Its mean and variance are

$$
\overline x=\frac1n\sum_{i=1}^n x_i,
\qquad
v_n=\frac1n\sum_{i=1}^n(x_i-\overline x)^2.
$$

These describe the observed dataset. Weighted data use nonnegative weights summing to one; relative frequencies supply such weights when observations are grouped.

Different summaries answer different questions:

| Summary | What it records | Limitation or convention |
| --- | --- | --- |
| Mean | The arithmetic balance point; it minimizes the sum of squared deviations. | Sensitive to large values; meaningful arithmetic requires an appropriate numerical scale. |
| Median | A middle ordered value; for even $n$, conventionally the average of the two middle values. | Less sensitive to a few extreme values; it need not track the total sum. |
| Mode | A most frequent value or category. | It need not be unique. |
| Range and interquartile range | Full spread and the spread of the middle half. | The range is sensitive to extremes; finite-sample quartile conventions can differ. |
| Variance and standard deviation | Average squared spread and its square root. | State the denominator and distinguish spread of observations from uncertainty of an estimated mean. |

For any real $c$,

$$
\sum_{i=1}^n(x_i-c)^2
=\sum_{i=1}^n(x_i-\overline x)^2+n(c-\overline x)^2.
$$

This proves the mean's least-squares property. A median instead minimizes the sum of absolute deviations. The choice of a summary therefore corresponds to a choice of loss, as in [Chapter 8](#87-classical-problems-and-extensions).

A second variance convention appears when estimating a population variance from a random sample:

$$
S^2=\frac1{n-1}\sum_{i=1}^n(X_i-\overline X)^2,
\qquad n\ge2.
$$

Write $s^2$ for its observed value and $s$ for the corresponding sample standard deviation. For independent identically distributed observations with finite variance $\sigma^2$, the estimator $S^2$ is unbiased. The proof uses

$$
\sum_{i=1}^n(X_i-\overline X)^2
=\sum_{i=1}^n(X_i-\mu)^2-n(\overline X-\mu)^2.
$$

Taking expectations gives $n\sigma^2-\sigma^2=(n-1)\sigma^2$. Estimating the mean has used one degree of freedom: the centered residuals sum to zero.

**The denominator $n$ describes the empirical spread; the denominator $n-1$ corrects bias when estimating a common population variance under the sampling assumptions.** Neither denominator is universally “the correct one” without stating the purpose. Taking a square root does not preserve unbiasedness, so the usual sample standard deviation $s$ is not generally an unbiased estimator of $\sigma$.

Nor should $s$ be confused with $s/\sqrt n$. The former estimates spread among observations; the latter estimates the standard error of their mean under the independent common-distribution model. More observations can reduce uncertainty about a mean while leaving the population's spread unchanged.

Grouping introduces another issue: averages must carry their denominators. If group $j$ contains $n_j$ observations with mean $\overline x_j$, then

$$
\overline x=\sum_j\frac{n_j}{n}\,\overline x_j,
\qquad n=\sum_jn_j.
$$

The unweighted average of group means is generally different. The within-group and between-group variance decomposition in Section 12.3 also holds exactly for empirical distributions.

**Worked example 12.6 — A reversal caused by unequal group weights**

Two algorithms are observed on easy and hard tasks. Suppose their success counts are:

| Task type | Algorithm A | Algorithm B |
| --- | ---: | ---: |
| Easy | $9/10=90\%$ | $80/100=80\%$ |
| Hard | $30/100=30\%$ | $2/10=20\%$ |
| All tasks | $39/110\approx35.5\%$ | $82/110\approx74.5\%$ |

A has a higher observed success rate within each task type, but B has the higher overall rate. The reason is the weighting: most of A's tasks are hard, while most of B's tasks are easy.

If the target comparison gives equal weight to the two task types, the standardized rates are

$$
\frac12(0.9)+\frac12(0.3)=0.6
\quad\text{for A},
$$

$$
\frac12(0.8)+\frac12(0.2)=0.5
\quad\text{for B}.
$$

The aggregate rates and these standardized rates summarize different task mixtures. This is an instance of `Simpson's paradox`.

![Success rates for two algorithms within easy tasks, within hard tasks, and in the pooled observations; unequal task mixtures reverse the overall comparison.]({{site.img}}/mathematics/elementary-mathematics-reference/simpson-task-mixtures-diagram.svg)

**Inspect group sizes and the population being compared before interpreting an aggregate rate.** The table establishes a descriptive reversal. It does not establish a causal advantage: task assignment and other differences may still matter even within the named groups.

Plots complement numerical summaries. A histogram's shape depends on binning; with unequal bin widths, bar area rather than raw height should represent frequency or probability. A box plot displays selected quantiles but can hide multiple clusters. A scatterplot can reveal curvature, changing spread, or influential points that a correlation coefficient alone conceals.

### 12.6 Fitting, Inference, and Model Assumptions

How can a fitted relationship become a statement about quantities beyond the observed data? First separate the algebra of fitting from the probability assumptions needed for inference.

For observed pairs $(x_i,y_i)$, ordinary `least squares` fits a line $\widehat y=\widehat\alpha+\widehat\beta x$ by minimizing

$$
Q(\alpha,\beta)=\sum_{i=1}^n(y_i-\alpha-\beta x_i)^2.
$$

Define

$$
S_{xx}=\sum_i(x_i-\overline x)^2,\qquad
S_{xy}=\sum_i(x_i-\overline x)(y_i-\overline y).
$$

If $S_{xx}>0$, the unique minimizer is

$$
\widehat\beta=\frac{S_{xy}}{S_{xx}},
\qquad
\widehat\alpha=\overline y-\widehat\beta\,\overline x.
$$

Differentiating $Q$ gives the normal equations

$$
\sum_i e_i=0,\qquad \sum_i x_i e_i=0,
\qquad e_i=y_i-\widehat\alpha-\widehat\beta x_i.
$$

These say that the residual vector is orthogonal to the vectors $(1,\ldots,1)$ and $(x_1,\ldots,x_n)$ in $\mathbb R^n$. The fitted vector is the orthogonal projection of the data vector onto their span. If all $x_i$ are equal, the span has dimension one and the slope and intercept are not separately determined.

**Worked example 12.7 — A small fit with its geometry exposed**

Fit a line to $(0,1)$, $(1,2)$, and $(2,2)$. Here

$$
\overline x=1,\qquad
\overline y=\frac53,\qquad
S_{xx}=2,\qquad S_{xy}=1.
$$

Therefore

$$
\widehat y=\frac76+\frac12x.
$$

The residuals are

$$
(e_1,e_2,e_3)=\left(-\frac16,\frac13,-\frac16\right).
$$

They satisfy both normal equations. Their squared sum is

$$
\operatorname{SSE}=\sum_i e_i^2=\frac16.
$$

The total squared deviation from $\overline y$ is $\operatorname{SST}=2/3$, so

$$
R^2=1-\frac{\operatorname{SSE}}{\operatorname{SST}}=\frac34.
$$

**The fitted line minimizes vertical squared residuals, with orthogonality taking place in the space of observation vectors.** The residual segments in an ordinary scatterplot are vertical, not perpendicular to the drawn line.

![Three data points and their least-squares line, with vertical residuals and the two normal-equation checks.]({{site.img}}/mathematics/elementary-mathematics-reference/least-squares-residuals-diagram.svg)

The coefficient $R^2$ describes the reduction in squared error relative to the constant mean fit, for least squares with an intercept and $\operatorname{SST}>0$. It does not establish a causal relation or guarantee accuracy on new observations. Outliers, curvature, and extrapolation can all matter despite a good fit on the available points.

A statistical interpretation adds a model such as

$$
Y_i=\alpha+\beta x_i+\varepsilon_i.
$$

For fixed nonconstant $x_i$, errors with mean zero, common finite variance, and zero pairwise covariance give the `Gauss–Markov` conclusion: the least-squares coefficient estimates have minimum variance among linear unbiased estimators. Normality is not needed for that conclusion. Normal-error assumptions support further exact distributional calculations; unequal variances, correlated errors, or error in the predictor require different analyses.

**Least-squares fitting is an optimization result; its inferential guarantees depend on the error model.** This is the same distinction between a projection and an approximation criterion that appeared for Fourier sums in Chapter 11.

An `estimator` is a function of random data, such as $\widehat p=X/n$ or $\overline X$. Its observed numerical value is an estimate. Repeating the sampling mechanism produces its `sampling distribution`.

A `likelihood` instead treats the data as fixed and the parameter as variable. For $k$ successes in $n$ independent Bernoulli trials,

$$
L(p)=\binom nk p^k(1-p)^{n-k}.
$$

For $0<k<n$, maximizing $k\ln p+(n-k)\ln(1-p)$ gives the maximum-likelihood estimate $\widehat p=k/n$. When $k=0$ or $k=n$, the maximum is at $p=0$ or $p=1$. *Likelihood is not a probability distribution over the parameter without an additional prior and normalization.*

A `confidence interval` is a random interval constructed to cover a fixed unknown parameter with a specified probability under repeated sampling. For independent normal observations with mean $\mu$ and known standard deviation $\sigma>0$,

$$
\frac{\overline X-\mu}{\sigma/\sqrt n}\sim N(0,1).
$$

Let $z_{0.975}=\Phi^{-1}(0.975)\approx1.96$. Then

$$
\overline X\ \pm\ z_{0.975}\frac{\sigma}{\sqrt n}
$$

is an exact $95\%$ confidence procedure when the exact quantile is used. With unknown variance under the same normal model and $n\ge2$,

$$
\frac{\overline X-\mu}{S/\sqrt n}\sim t_{n-1},
$$

so the corresponding interval uses $t_{n-1,0.975}S/\sqrt n$. Here $S^2$ uses the denominator $n-1$. The extra uncertainty from estimating $\sigma$ is represented by the Student $t$ distribution.

**The $95\%$ refers to coverage of the interval procedure over repeated samples.** It is not, by itself, a posterior probability that the fixed parameter lies in this one observed interval. A Bayesian credible interval has that latter interpretation within a specified prior-and-likelihood model.

For nonnormal data, suitable large-sample approximations can use the central limit theorem, but the accuracy must be assessed in the relevant setting. There is no universal rule that a particular sample size automatically repairs skewness, dependence, or heavy tails.

A `hypothesis test` begins with a null model $H_0$, an alternative, and a statistic defining what counts as evidence against the null. A `p-value` is the probability under $H_0$ of a statistic at least as extreme as the observed one, using that specified direction or extremeness rule.

**Worked example 12.8 — An exact one-sided coin test**

Before observing the data, specify $H_0:p=1/2$ against $p>1/2$, using the number of heads in ten independent tosses. Suppose nine heads are observed. The one-sided p-value is

$$
P_{H_0}(X\ge9)
=\frac{\binom{10}{9}+\binom{10}{10}}{2^{10}}
=\frac{11}{1024}\approx0.0107.
$$

This is evidence against the specified fair-coin model in the stated direction. It is not the probability that the null hypothesis is true, nor the probability that the observations were “caused by chance.”

For a nonrandomized test rejecting when the one-sided p-value is at most $0.05$, rejection occurs only at $X\ge9$, since

$$
P_{H_0}(X\ge8)=\frac{56}{1024}>0.05.
$$

Its actual probability of rejecting a true null is therefore $11/1024$, below the nominal $5\%$ level. Discreteness prevents this particular cutoff rule from attaining exactly $5\%$.

**A test calibrates a decision rule under a null model; it does not directly assign probabilities to competing hypotheses.** Choosing a one-sided direction only after seeing the outcome would require a different calibration.

A `Type I error` rejects a true null; a `Type II error` fails to reject under a specified alternative. The test's `power` is the probability of rejection under that alternative. A small p-value does not measure the size or practical importance of an effect, and a large one does not prove the null. Searching across many tests or analyses also changes the chance of finding an apparently unusual result; [Problem 7](#127-classical-problems-and-extensions) quantifies a simple case.

Finally, sampling and model errors can survive arbitrarily large datasets. Suppose

$$
X_i=\mu+b+\varepsilon_i,
$$

where $b$ is a fixed measurement bias and the independent errors have mean zero and variance $\sigma^2$. Then

$$
E[\overline X]=\mu+b,
\qquad
E[(\overline X-\mu)^2]=b^2+\frac{\sigma^2}{n}.
$$

Averaging reduces the random component but leaves $b^2$. Dependence can likewise prevent the expected $1/n$ reduction in variance.

Random sampling supports generalization to a target population. Random assignment supports causal comparisons by making allocation independent of pre-existing causes, subject to the design and follow-up assumptions. They are different operations. A convenient sample, selective nonresponse, unrecorded confounders, or treating repeated readings as independent can invalidate an otherwise correct calculation.

**Report what the data support under the stated assumptions, and keep model adequacy separate from arithmetic correctness.**

### 12.7 Classical Problems and Extensions

Try the problems before reading the solution notes. State the sample space, dependence assumptions, and meaning of every reported probability.

**Problems**

1. **The variance of the number of matches.** In a uniform random permutation of $n\ge2$ objects, let $X$ count objects in their original positions. Using the indicators from Worked example 12.3, prove $\operatorname{Var}(X)=1$. Explain what changes at $n=1$.

2. **Pairwise independence without mutual independence.** Toss two independent fair coins. Let $A$ be “the first is heads,” $B$ be “the second is heads,” and $C$ be “the two outcomes agree.” Show that the events are pairwise independent but not mutually independent. Are $A$ and $B$ independent after conditioning on $C$?

3. **The birthday coincidence.** Assume each of $m\le365$ people independently receives one of $365$ equally likely birthday labels. Find the probability that at least two labels agree, and evaluate it for $m=23$. Also find the expected number of agreeing pairs. Why are these two quantities different?

4. **Collecting every type.** Each independent draw produces one of $n$ equally likely coupon types. Find the expected number of draws needed to collect all types. Also find the expected number of distinct types present after $m\ge1$ draws. Give the collection-time mean for $n=6$.

5. **Combining measurements with unequal precision.** Independent measurements $X,Y$ both have mean $\mu$, with known positive variances $\sigma_X^2,\sigma_Y^2$. Among estimators

   $$
   \widehat\mu=wX+(1-w)Y,
   $$

   find the variance-minimizing weight and the minimum variance. Evaluate them for variances $1$ and $4$, and extend the weight rule to several independent measurements.

6. **A common error that averaging cannot remove.** Suppose

   $$
   X_i=\mu+Z+\varepsilon_i,
   $$

   where $Z$ has mean zero and variance $\tau^2$, the $\varepsilon_i$ are mutually independent with mean zero and variance $\sigma^2$, and they are independent of $Z$. Find the variance of $\overline X_n$ and the covariance between two different readings. Compare with the incorrect calculation that treats all $X_i$ as independent.

7. **Twenty opportunities for a false alarm.** Suppose twenty independent tests are performed, all their null hypotheses are true, and each test has probability exactly $0.05$ of rejection. Find the probability of at least one rejection. Then, without assuming independence, show how testing each of $m$ hypotheses at level at most $\alpha/m$ bounds the probability of any false rejection by $\alpha$.

8. **Prediction with an explicit prior.** Put a uniform prior density on a coin's head probability $p\in\lbrack0,1\rbrack$. Conditional on $p$, tosses are independent Bernoulli trials. After $k$ heads in $n$ tosses, derive the posterior density and the predictive probability of a head on the next toss. You may use, or prove by integration by parts,

   $$
   \int_0^1p^a(1-p)^b\,dp=\frac{a!\,b!}{(a+b+1)!}
   $$

   for nonnegative integers $a,b$.

**Solution notes**

**1. The variance of the number of matches.** For $i\ne j$, fixing both positions leaves $(n-2)!$ permutations, so

$$
E[I_iI_j]=P(I_i=I_j=1)=\frac1{n(n-1)}.
$$

Since $I_i^2=I_i$,

$$
E[X^2]
=\sum_i E[I_i]+2\sum_{i<j}E[I_iI_j]
=1+2\binom n2\frac1{n(n-1)}
=2.
$$

With $E\lbrack X\rbrack =1$, the variance is $2-1=1$. For $n=1$, $X$ is identically one and has variance zero. **The second moment needs pair information even though the first moment did not require independence.**

**2. Pairwise independence without mutual independence.** The four outcomes $HH,HT,TH,TT$ are equally likely. Each event has probability $1/2$, and each pairwise intersection contains only $HH$, so every pair has intersection probability $1/4=(1/2)(1/2)$.

But

$$
P(A\cap B\cap C)=\frac14\ne
P(A)P(B)P(C)=\frac18.
$$

After conditioning on $C$, only $HH$ and $TT$ remain, each with conditional probability $1/2$. Hence

$$
P(A\cap B\mid C)=\frac12,
\qquad
P(A\mid C)P(B\mid C)=\frac14.
$$

They are not conditionally independent. **Independence is a statement about a specified joint distribution and information state.**

**3. The birthday coincidence.** It is easier to count the complement. The first label is unrestricted; the next must avoid one label, the next two, and so on. Therefore

$$
P(\text{at least one agreement})
=1-\prod_{j=0}^{m-1}\left(1-\frac j{365}\right).
$$

For $m=23$, this is approximately $0.5073$.

Let $I_{ij}$ indicate agreement between people $i$ and $j$. Each pair agrees with probability $1/365$, so the expected number of agreeing pairs is

$$
E\left[\sum_{i<j}I_{ij}\right]
=\frac{\binom m2}{365}.
$$

For $m=23$, it is $253/365\approx0.6932$. A single outcome can contain several agreeing pairs, so their expected count is not the probability that at least one exists. *Neither independence of the pair indicators nor equality of these two quantities should be assumed.*

**4. Collecting every type.** When $k$ distinct types have been collected, the chance that the next draw gives a new type is $(n-k)/n$. The waiting time for that next new type has mean $n/(n-k)$. By linearity of expectation,

$$
E[T]=\sum_{k=0}^{n-1}\frac n{n-k}
=n\sum_{j=1}^n\frac1j=nH_n.
$$

For $n=6$, this is $6H_6=147/10=14.7$ draws.

For a fixed type, the probability of appearing at least once in $m$ draws is $1-(1-1/n)^m$. Summing its presence indicator over the $n$ types gives

$$
E[\text{number of distinct types}]
=n\left(1-\left(1-\frac1n\right)^m\right).
$$

**Waiting-time decomposition and indicator decomposition answer different counting questions with the same linearity principle.** The last few missing types account for the long collection time.

**5. Combining measurements with unequal precision.** Every stated estimator is unbiased. Independence gives

$$
\operatorname{Var}(\widehat\mu)
=w^2\sigma_X^2+(1-w)^2\sigma_Y^2.
$$

Completing the square or differentiating yields

$$
w=\frac{\sigma_Y^2}{\sigma_X^2+\sigma_Y^2},
\qquad
\operatorname{Var}(\widehat\mu)
=\frac{\sigma_X^2\sigma_Y^2}{\sigma_X^2+\sigma_Y^2}.
$$

For variances $1$ and $4$, use weights $4/5$ and $1/5$, giving variance $4/5$. Equal weights would give variance $5/4$.

For independent measurements with common mean and known positive variances $\sigma_i^2$, minimize $\sum_iw_i^2\sigma_i^2$ subject to $\sum_iw_i=1$. Cauchy–Schwarz gives

$$
1=\left(\sum_i(w_i\sigma_i)\frac1{\sigma_i}\right)^2
\le\left(\sum_iw_i^2\sigma_i^2\right)
\left(\sum_i\frac1{\sigma_i^2}\right).
$$

Equality holds for

$$
w_i=\frac{\sigma_i^{-2}}{\sum_j\sigma_j^{-2}},
$$

and the minimum variance is $(\sum_i\sigma_i^{-2})^{-1}$. **Precision weights are inverse variances under this model; they are not arbitrary preferences for particular observations.**

**6. A common error that averaging cannot remove.** The average is

$$
\overline X_n=\mu+Z+\frac1n\sum_i\varepsilon_i,
$$

so independence of $Z$ and the individual errors gives

$$
\operatorname{Var}(\overline X_n)
=\tau^2+\frac{\sigma^2}{n}.
$$

For $i\ne j$,

$$
\operatorname{Cov}(X_i,X_j)=\operatorname{Var}(Z)=\tau^2.
$$

Each reading has variance $\tau^2+\sigma^2$. Treating readings as independent would incorrectly predict $(\tau^2+\sigma^2)/n$, understating the true variance by $\tau^2(1-1/n)$.

**Repeated measurements reduce the individual error component but do not average away an error shared by all readings.**

**7. Twenty opportunities for a false alarm.** Under the stated independence and exact rejection probabilities, the probability of no rejection is $0.95^{20}$. Thus

$$
P(\text{at least one rejection})
=1-0.95^{20}\approx0.6415.
$$

For the second claim, let $A_i$ be false rejection of the $i$th true null. If each corresponding probability is at most $\alpha/m$, the union bound gives

$$
P\left(\bigcup_iA_i\right)
\le\sum_iP(A_i)\le m\frac{\alpha}{m}=\alpha.
$$

The same bound holds if fewer than $m$ nulls are true. This is the Bonferroni principle; independence is unnecessary. The family of opportunities being controlled must be specified. **The error rate for a collection of decisions is different from the error rate for one isolated decision.**

**8. Prediction with an explicit prior.** The binomial likelihood is proportional to $p^k(1-p)^{n-k}$ as a function of $p$. Multiplying by the uniform prior and normalizing gives

$$
\pi(p\mid k,n)
=\frac{(n+1)!}{k!(n-k)!}\,
p^k(1-p)^{n-k},
\qquad 0\le p\le1.
$$

This is the Beta$(k+1,n-k+1)$ density. The beta integral follows by repeated integration by parts, with the base case $\int_0^1(1-p)^b\,dp=1/(b+1)$.

Given $p$, the next head probability is $p$. Averaging over the posterior,

$$
P(\text{next head}\mid k,n)
=\int_0^1p\,\pi(p\mid k,n)\,dp
=\frac{k+1}{n+2}.
$$

Even if $k=0$, this predictive probability is positive. It reflects both the finite observations and the chosen prior. A different prior generally gives a different posterior and prediction.

**A posterior predictive probability averages a conditional prediction over parameter uncertainty.** The uniform prior is a model choice, not a consequence of the probability axioms or a universally neutral definition of ignorance.

## 13. Methods, Proof, and Cross-Topic Connections

What should remain after individual formulas have been forgotten? A useful mathematical habit is to recognize the kind of claim being made, choose a representation that exposes its structure, and check what the argument actually establishes.

This chapter reviews the language and methods of proof and provides routes back into the subject chapters. The [proof-method index](#132-proof-method-index) starts from the form of an argument; the [problem-to-method index](#133-problem-to-method-index) starts from an obstacle; the [connection index](#134-cross-topic-connection-index) follows ideas across subjects; and the [alphabetical index](#135-alphabetical-concept-index) locates concepts directly.

**An advanced standpoint makes elementary reasoning more transparent by identifying structures, assumptions, and connections.** It can include reflection on foundations, but it is broader than metamathematics. Studying formal proof systems themselves is a metamathematical task; recognizing the same projection in geometry, Fourier approximation, and least squares is a mathematical connection within the subject.

### 13.1 Statements, Sets, and Quantifiers

A mathematical statement needs a domain. “Every nonzero number has a multiplicative inverse” is true in $\mathbb Q$, $\mathbb R$, and $\mathbb C$, but false in $\mathbb Z$. The expression $x^2=1$ is a condition on a variable; it becomes a proposition after the variable is assigned a value or bound by a quantifier.

| Notation | Meaning | What must be established |
| --- | --- | --- |
| $\neg P$ | Not $P$ | $P$ is false. |
| $P\land Q$ | $P$ and $Q$ | Both assertions hold. |
| $P\lor Q$ | $P$ or $Q$ | At least one holds; this is inclusive “or.” |
| $P\Rightarrow Q$ | If $P$, then $Q$ | There is no case with $P$ true and $Q$ false. |
| $P\Longleftrightarrow Q$ | $P$ if and only if $Q$ | Both implications hold. |

In $P\Rightarrow Q$, $P$ is a `sufficient condition` for $Q$, and $Q$ is a `necessary condition` for $P$. For an integer $n$, divisibility by $4$ is sufficient for evenness, while evenness is necessary for divisibility by $4$. The converse fails at $n=2$.

The implication is logically equivalent to its `contrapositive`,

$$
P\Rightarrow Q
\quad\Longleftrightarrow\quad
\neg Q\Rightarrow\neg P.
$$

It is not generally equivalent to its converse $Q\Rightarrow P$ or its inverse $\neg P\Rightarrow\neg Q$. An implication with a false antecedent is true in classical logic. Accordingly, every member of the empty set satisfies any specified condition, but that does not assert that such a member exists.

Sets express the same logic through membership. With complements relative to a fixed universe $U$,

$$
x\in A\cap B\Longleftrightarrow(x\in A\land x\in B),
\qquad
x\in A\cup B\Longleftrightarrow(x\in A\lor x\in B).
$$

The difference $A\setminus B$ contains members of $A$ that are not in $B$. De Morgan's laws are

$$
(A\cup B)^{\mathrm c}=A^{\mathrm c}\cap B^{\mathrm c},
\qquad
(A\cap B)^{\mathrm c}=A^{\mathrm c}\cup B^{\mathrm c}.
$$

A proof of $A\subseteq B$ starts with an arbitrary $x\in A$ and proves $x\in B$. To prove equality, establish both inclusions. **Translate a set identity into a statement about an arbitrary element; the logic then becomes visible.**

The `universal quantifier` $\forall$ means “for every”; the `existential quantifier` $\exists$ means “there is at least one.” Negation reverses them:

$$
\neg(\forall x\in D,\ P(x))
\Longleftrightarrow
\exists x\in D,\ \neg P(x),
$$

$$
\neg(\exists x\in D,\ P(x))
\Longleftrightarrow
\forall x\in D,\ \neg P(x).
$$

The order of quantifiers controls dependence. Over the real numbers, $\forall x\ \exists y:\ y>x$ is true, since $y=x+1$ works. But $\exists y\ \forall x:\ y>x$ is false: no single real number exceeds every real number. *A choice made after seeing $x$ need not work independently of $x$.*

**Worked example 13.1 — Positive everywhere, without a positive uniform lower bound**

Let

$$
f(x)=\frac1{1+x^2},\qquad x\in\mathbb R.
$$

For each $x$, there exists $c>0$ such that $f(x)\ge c$: take $c=f(x)$. Does this imply that one positive $c$ works for every $x$?

No. Given any $c>0$, choose $x$ with $x^2>1/c$. Then $f(x)<c$. Thus

$$
\forall x\ \exists c>0:\ f(x)\ge c
$$

holds, whereas

$$
\exists c>0\ \forall x:\ f(x)\ge c
$$

does not. The infimum is $0$, but it is not attained. On the restricted interval $\lbrack -M,M\rbrack $, with $M\ge0$, the uniform bound $f(x)\ge1/(1+M^2)$ does hold.

**Write down which choices may depend on which variables.** The same issue separates [pointwise from uniform convergence](#105-pointwise-and-uniform-convergence), and separates a guarantee for each individual model from one uniform over a class of models.

`Existence` and `uniqueness` require different statements. The notation $\exists!x\,P(x)$ abbreviates existence together with

$$
P(u)\land P(v)\Rightarrow u=v.
$$

Showing that any two solutions coincide proves **at most one** solution. It does not prove that there is one: $x^2=-1$ has no real solution, yet it trivially has at most one real solution. Existence and uniqueness arguments may use completely different methods.

### 13.2 Proof-Method Index

Which method matches the logical form of the goal? The following index gives starting points, not mechanical rules for discovery.

| Method | Basic move | Main obligation | Examples and connections |
| --- | --- | --- | --- |
| Direct proof | Expand definitions and derive the conclusion. | Each step must follow from permitted assumptions. | [Divisibility](#21-divisibility-and-prime-factorization), [operation laws](#12-laws-of-operations). |
| Contraposition | Prove $\neg Q\Rightarrow\neg P$. | Negate the statements accurately. | Worked example 13.2; [congruences](#23-congruence-cancellation-and-decimal-periods). |
| Contradiction | Assume the premises and the negation of the conclusion. | Reach an actual logical contradiction. | [Irrationality of $\sqrt2$](#11-number-systems-and-closure). |
| Cases | Cover the domain by manageable alternatives. | Include every admissible case. | [Sign charts](#82-intervals-and-sign-charts), [inverse branches](#63-inverse-branches-and-equations). |
| Equivalence | Prove both directions or use reversible steps. | Preserve domains and exceptional cases. | [Equation transformations](#33-reversible-transformations). |
| Induction | Establish a starting case and a valid transition. | Prove the transition for every allowed index. | [Finite sums](#92-standard-finite-sums); Worked example 13.3. |
| Least counterexample or descent | Replace a smallest obstruction by a smaller one. | Use a well-founded size and preserve the defining properties. | [Integer structure](#2-divisibility-congruence-and-integer-structure); Problem 4. |
| Construction | Exhibit an object and verify its properties. | The recipe must actually work. | [Rational parametrization](#25-integer-equations-and-rational-points), [geometric constructions](#76-classical-construction-problems). |
| Counterexample | Produce an admissible object violating a universal claim. | Satisfy all hypotheses and fail the conclusion. | [Zero covariance without independence](#123-random-variables-and-moments); Worked example 13.1. |
| Double counting | Count the same collection in two ways. | Keep multiplicity and the counted objects consistent. | [Binomial identities](#95-binomial-identities-and-double-counting); Problem 5. |
| Pigeonhole principle | Put more objects into fewer classes. | Specify the classes and count correctly. | [Decimal periods](#23-congruence-cancellation-and-decimal-periods); Problem 2. |
| Invariant or monotone quantity | Track something preserved or ordered by every step. | Check every permitted move. | [Euclid's algorithm](#22-euclid-and-bezout); Worked example 13.5. |
| Extremal argument | Choose a smallest, largest, or best object. | Justify that an extremum is attained. | [Optimization](#86-local-and-global-optimization), [completeness](#102-completeness-of-the-real-numbers). |
| Bounding | Enclose the target between quantities of known behavior. | Check directions, equality cases, and limiting hypotheses. | [Comparison](#84-bounding-and-comparison), [error control](#101-limits-as-error-control). |

Cases may overlap in a proof: proving the conclusion twice causes no difficulty. Disjointness matters when adding counts or probabilities without correction. **Completeness of the cases is the essential proof requirement; disjointness is an additional counting requirement.**

**Worked example 13.2 — A contrapositive exposes the arithmetic**

Prove that if $n^2$ is even, then the integer $n$ is even. A direct attempt to extract the factor $2$ from a square may hide the very fact to be proved.

Instead, suppose $n$ is odd. Write $n=2k+1$. Then

$$
n^2=4k^2+4k+1=2(2k^2+2k)+1
$$

is odd. This proves the contrapositive and hence the original implication.

The converse needs its own argument: if $n=2k$, then $n^2=4k^2$ is even. Together these give an equivalence. The same expansion also shows that an odd square is congruent to $1$ modulo $8$, since one of $k,k+1$ is even.

**Choose the form of the assumption that admits a useful representation.** “Odd” immediately gives $2k+1$; an unexplained cancellation of divisibility does not.

For `induction`, distinguish a finite check from the transition mechanism. To prove $P(n)$ for all integers $n\ge n_0$, establish $P(n_0)$ and

$$
P(k)\Rightarrow P(k+1)\qquad(k\ge n_0).
$$

`Strong induction` allows all previous cases $P(n_0),\ldots,P(k)$ in proving $P(k+1)$. It is useful when an object decomposes into smaller pieces of unpredictable sizes. The two principles have the same strength: ordinary induction can be applied to the cumulative statement that all cases up to $k$ hold.

**Worked example 13.3 — Prime factorization exists, but uniqueness needs more**

Every integer $n\ge2$ is a product of primes. Use strong induction.

If $n$ is prime, it is already a one-factor product. Otherwise $n=ab$ with $2\le a,b<n$. The induction hypothesis factors both $a$ and $b$ into primes; combining those factorizations gives one for $n$. The initial case $n=2$ is prime.

This proves existence. It does not compare different factorizations. Uniqueness requires an additional fact: **a prime dividing a product divides at least one factor**, followed by cancellation and repetition. That fact is established from the arithmetic structure in [Chapter 2](#21-divisibility-and-prime-factorization).

The same existence proof can be written using a least counterexample. If a counterexample existed, choose the smallest $n\ge2$. It cannot be prime, and its smaller factors cannot be counterexamples, a contradiction. The shared principle is the `well-ordering` of nonnegative integers.

*Strict decrease alone does not guarantee finite termination in an arbitrary ordered set.* The positive real sequence $1,1/2,1/4,\ldots$ decreases forever. A descent argument needs a size that cannot support an infinite descending chain, such as a nonnegative integer.

Counterexamples reveal scope. The function $f(x)=x^3$ has $f^{\prime}(0)=0$ but no local extremum there, so a stationary point is not sufficient for an extremum. This suggests a repaired criterion involving a sign change or a suitable second derivative. **A failed conjecture can reveal which additional hypothesis would make a theorem possible.**

### 13.3 Problem-to-Method Index

Often the difficulty is seeing a useful first move. Start with what obstructs progress.

| What the problem presents | First structural move | Where to continue | What to check |
| --- | --- | --- | --- |
| Fractions, radicals, logarithms, or inverse functions | Record the domain before transforming. | [3.3](#33-reversible-transformations), [5.2](#52-powers-and-roots), [6.3](#63-inverse-branches-and-equations). | Denominators, signs, and branches. |
| A quadratic expression or squared distance | Complete the square or use a projection. | [3.4](#34-quadratic-equations-and-parameters), [7.4](#74-vectors-and-projection), [12.6](#126-fitting-inference-and-model-assumptions). | Degenerate cases and equality. |
| A reciprocal, symmetric, or homogeneous expression | Seek a substitution, invariant, or scaling. | [3.5](#35-roots-multiplicity-and-coefficients), [8.3](#83-standard-inequalities-with-equality-cases). | The transformed domain and lost information. |
| An integer impossibility or repeating process | Reduce modulo a suitable number. | [2.3](#23-congruence-cancellation-and-decimal-periods), [2.4](#24-simultaneous-remainder-conditions). | A residue obstruction is not a general existence test. |
| A geometric relation involving translations or rotations | Choose vectors, coordinates, or complex numbers. | [6.5](#65-complex-arithmetic-and-geometry), [7.3](#73-coordinate-descriptions-and-loci), [7.4](#74-vectors-and-projection). | Retain the geometric constraints. |
| Many finite terms | Look for telescoping, differences, or a recurrence. | [9.1](#91-sequence-definitions-and-recurrences), [9.3](#93-summation-transformations). | Initial terms and boundary contributions. |
| A complicated count or average | Use a bijection, double counting, or indicators. | [9.5](#95-binomial-identities-and-double-counting), [12.3](#123-random-variables-and-moments). | Which steps need independence? |
| An extremum with constraints | Combine a bound with an equality candidate. | [8.3](#83-standard-inequalities-with-equality-cases), [8.5](#85-convexity-and-averages), [8.6](#86-local-and-global-optimization). | Is the bound attainable? |
| A root with no useful exact formula | Bracket it, prove uniqueness, and approximate. | [3.6](#36-exact-formulas-and-numerical-root-finding), [10.3](#103-continuity-and-existence). | Error bounds and stopping criteria. |
| An infinite process | Work with a finite stage and estimate its remainder. | [10.4](#104-infinite-series-and-remainders), [11.6](#116-taylor-polynomials-remainders-and-periodic-approximation). | Permission to exchange operations. |
| An observed association or noisy estimate | Identify the sampling and error model. | [12.5](#125-describing-data), [12.6](#126-fitting-inference-and-model-assumptions). | Dependence, weighting, bias, and causal assumptions. |

**Worked example 13.4 — Reciprocal symmetry reduces a quartic**

Solve over $\mathbb R$:

$$
x^4-3x^3+4x^2-3x+1=0.
$$

The nonzero constant term excludes $x=0$. Dividing by $x^2$ reveals reciprocal pairs:

$$
\left(x^2+\frac1{x^2}\right)-3\left(x+\frac1x\right)+4=0.
$$

Set $t=x+1/x$, so $x^2+x^{-2}=t^2-2$. The equation becomes

$$
t^2-3t+2=0,\qquad t=1\ \text{or}\ t=2.
$$

But a real nonzero $x$ gives $t\ge2$ if $x>0$, and $t\le-2$ if $x<0$. Therefore $t=1$ is inadmissible. From $t=2$, $x^2-2x+1=0$, so the only real root is $x=1$. Indeed,

$$
x^4-3x^3+4x^2-3x+1=(x-1)^2(x^2-x+1).
$$

Over $\mathbb C$, $t=1$ instead gives two additional roots $(1\pm i\sqrt3)/2$.

**Use symmetry to reduce the number of independent expressions, then recover the original variable with its domain restrictions.** The substitution identifies the pair $x,1/x$; it is not globally one-to-one. Reconstruction is part of the method.

**Worked example 13.5 — An invariant proves that a tiling is impossible**

Remove two diagonally opposite corner squares from an $8\times8$ chessboard. Can the remaining $62$ squares be tiled by $31$ dominoes, each covering two squares sharing an edge?

Color the board in its usual alternating pattern. Each domino covers one dark and one light square, so every tiled region has equal numbers of the two colors. Opposite corners have the same color. Removing two dark corners leaves $30$ dark and $32$ light squares, an obstruction to any tiling.

![An eight-by-eight alternating board with two opposite dark corners removed; every domino covers one square of each color, but the remaining board has 30 dark and 32 light squares.]({{site.img}}/mathematics/elementary-mathematics-reference/domino-coloring-invariant-diagram.svg)

The useful quantity is the difference between the two color counts. Each domino contributes zero; the target region has a nonzero difference.

**Find a quantity respected by every legal piece or move, and compare it with the target.** This proves impossibility without enumerating arrangements. Equal color counts alone, however, do not guarantee a tiling for an arbitrary region; an invariant supplies an obstruction, not automatically a complete classification.

### 13.4 Cross-Topic Connection Index

The most useful connections carry a method from one setting into another while making its limits explicit.

**1. Equivalence and changes of representation.** Equivalent fractions represent the same rational number; a Cartesian pair and a complex number represent the same point of the plane; a logarithm converts multiplication of positive numbers into addition:

$$
\log(xy)=\log x+\log y,\qquad x,y>0.
$$

These are different kinds of correspondence. A change of coordinates may be invertible, while the substitution $t=x+1/x$ merges inputs. **Ask what information is retained, what is identified, and how an answer can be translated back.** Routes: [fractions](#13-fractions-and-place-value), [inverse functions](#43-composition-and-inverse-functions), [logarithms](#54-logarithms-as-inverses), [complex geometry](#65-complex-arithmetic-and-geometry).

**2. Symmetry and invariants.** Permuting roots does not change the coefficients of their polynomial; rotating a figure preserves distances; changing $(a,b)$ to $(b,a-qb)$ preserves their common divisors. These examples suggest searching for quantities that ignore irrelevant changes. Congruence reduces an integer to a residue class, while a roots-of-unity sum filters terms by their exponents modulo an integer. *A preserved quantity need not completely distinguish the possible configurations.* Routes: [roots and coefficients](#35-roots-multiplicity-and-coefficients), [roots of unity](#66-roots-of-unity-and-periodicity), [Euclid's algorithm](#22-euclid-and-bezout), [construction obstructions](#76-classical-construction-problems).

**3. Local versus global information.** A derivative describes local change; a global extremum compares all admissible inputs. A tangent approximation may be accurate near one point and poor elsewhere. Additional structure can connect the two scales: on an interval, a derivative of one sign gives monotonicity; convexity makes a tangent line a global supporting bound when the function is differentiable. An interval hypothesis matters: $f(x)=-1/x$ has $f^{\prime}(x)>0$ throughout its disconnected domain, yet $f(-1)>f(1)$. Routes: [monotonicity](#44-monotonicity-symmetry-and-periodicity), [convexity](#85-convexity-and-averages), [optimization](#86-local-and-global-optimization), [local linear approximation](#111-differentiation-as-local-linear-approximation).

**4. Finite versus infinite processes.** The identity

$$
(1-r)\sum_{k=0}^{N}r^k=1-r^{N+1}
$$

holds for every real or complex $r$. Passing to an infinite geometric sum requires $\lvert r\rvert <1$, which makes the remainder vanish. At $r=-1$, the partial sums alternate between $1$ and $0$; the infinite series has no ordinary sum, despite what unrestricted formal algebra might suggest.

Induction proves a statement for every finite integer index. It does not introduce an index “at infinity” or justify exchanging a limit with differentiation, integration, or summation. **Keep the finite identity and the limiting argument separate.** Routes: [finite sums](#92-standard-finite-sums), [generating functions](#96-generating-functions-as-an-extension), [series](#104-infinite-series-and-remainders), [uniform convergence](#105-pointwise-and-uniform-convergence).

**5. Existence versus construction.** Continuity can prove that a root exists without expressing it in radicals. A constructive algorithm may then locate that root, but its termination or error estimate needs proof. Conversely, a formula can exist while being numerically unstable. Geometric constructibility imposes a further restriction on the permitted operations: a real root need not be obtainable by straightedge and compass.

**6. Exactness versus approximation.** An exact answer can be a characterized number, not merely a short closed formula. An approximation is useful when its error is controlled for the intended purpose. Measurement error, truncation error, rounding error, and statistical uncertainty have different sources; a bound for one does not account for the others. Routes for both connections: [measured quantities](#16-exact-values-and-measured-quantities), [root finding](#36-exact-formulas-and-numerical-root-finding), [constructions](#76-classical-construction-problems), [Taylor remainders](#116-taylor-polynomials-remainders-and-periodic-approximation), [statistical models](#126-fitting-inference-and-model-assumptions).

**Worked example 13.6 — Existence, uniqueness, and an approximation certificate**

Consider

$$
f(x)=x^3+x-1.
$$

There is a root $\alpha\in(0,1)$ because $f$ is continuous and $f(0)=-1$, $f(1)=1$. It is the unique real root because $f^{\prime}(x)=3x^2+1>0$ for every real $x$.

Bisection maintains an interval containing $\alpha$. After $n$ interval halvings from $\lbrack 0,1\rbrack $, its length is $2^{-n}$, and its midpoint $m_n$ satisfies

$$
|m_n-\alpha|\le2^{-n-1}.
$$

After $20$ halvings the midpoint error is at most $2^{-21}<5\times10^{-7}$. The statement remains valid if a root is found exactly and retained thereafter. A numerical implementation must determine signs reliably to preserve the bracket.

There is also a residual certificate. By the mean value theorem, for any real $y$ there is a point $\xi$ between $y$ and $\alpha$ such that

$$
f(y)=f^{\prime}(\xi)(y-\alpha).
$$

Since $f^{\prime}(\xi)\ge1$,

$$
|y-\alpha|\le |f(y)|.
$$

For the exact decimal rational $y=0.682328$,

$$
f(y)=0.000000470168151552,
$$

so $\lvert y-\alpha\rvert <4.71\times10^{-7}$. A rounded residual would itself need an error bound before being used as a certificate.

**Existence identifies an object, uniqueness removes ambiguity, and an error estimate certifies an approximation.** These are three different achievements. A small residual alone is not universally enough: if $f(x)=\varepsilon(x-\alpha)$ with tiny $\varepsilon>0$, the residual may be small even far from the root. Here the lower derivative bound supplies the missing link.

One further connection appears repeatedly: `linearity and projection`. Dot products turn geometry into algebra; integrals and expectations are linear averaging operations; least squares projects data onto a chosen space of approximants. The same expansion of a squared norm yields Pythagoras, variance decompositions, and normal equations. Routes: [vectors](#74-vectors-and-projection), [integration](#113-integration-and-accumulation), [Fourier approximation](#116-taylor-polynomials-remainders-and-periodic-approximation), [moments](#123-random-variables-and-moments), [least squares](#126-fitting-inference-and-model-assumptions).

### 13.5 Alphabetical Concept Index

Use this index to locate a concept and its main qualification. The linked entries contain the definitions, derivations, and examples.

| Concept | What to recall | Main entry |
| --- | --- | --- |
| `Absolute value` | Distance from zero; split signs when necessary. | [1.5](#15-order-and-distance). |
| `Approximation` | Separate a numerical value from its certified error. | [1.6](#16-exact-values-and-measured-quantities). |
| `Bayes's rule` | Update prior weights using the likelihood of the evidence. | [12.2](#122-conditioning-and-independence). |
| `Binomial distribution` | Count independent Bernoulli trials with a common success probability. | [12.4](#124-repeated-trials). |
| `Binomial theorem` | Expand powers and interpret coefficients by counting. | [9.5](#95-binomial-identities-and-double-counting). |
| `Bisection` | Preserve a root bracket and halve its width. | [3.6](#36-exact-formulas-and-numerical-root-finding). |
| `Cauchy sequence` | Control distances between late terms without naming the limit. | [10.2](#102-completeness-of-the-real-numbers). |
| `Cauchy–Schwarz inequality` | Bound an inner product; retain the equality condition. | [8.3](#83-standard-inequalities-with-equality-cases). |
| `Central limit theorem` | Approximate standardized sums under the stated hypotheses. | [12.4](#124-repeated-trials). |
| `Completeness` | Supply limits or least upper bounds missing from the rationals. | [10.2](#102-completeness-of-the-real-numbers). |
| `Complex number` | Represent planar arithmetic and rotation using real pairs. | [6.5](#65-complex-arithmetic-and-geometry). |
| `Composition and inverse` | Track domains, codomains, and injectivity. | [4.3](#43-composition-and-inverse-functions). |
| `Conditional probability` | Restrict and renormalize the probability model. | [12.2](#122-conditioning-and-independence). |
| `Confidence interval` | Interpret coverage through the repeated-sampling procedure. | [12.6](#126-fitting-inference-and-model-assumptions). |
| `Congruence` | Work with residue classes; cancellation needs conditions. | [2.3](#23-congruence-cancellation-and-decimal-periods). |
| `Conic section` | Relate quadratic equations, loci, and metric constraints. | [7.3](#73-coordinate-descriptions-and-loci). |
| `Constructibility` | Specify the permitted geometric operations. | [7.6](#76-classical-construction-problems). |
| `Continued fraction` | Organize rational approximation by integer recurrences. | [2.6](#26-rational-approximation-by-continued-fractions). |
| `Continuity` | Turn control of inputs into control of outputs. | [10.3](#103-continuity-and-existence). |
| `Contraposition` | Prove the equivalent implication with both statements negated. | [13.2](#132-proof-method-index). |
| `Convexity` | Compare function values with chords, tangents, and averages. | [8.5](#85-convexity-and-averages). |
| `Countability` | Use a bijection or enumeration, not geometric size. | [10.6](#106-counting-infinite-sets). |
| `Counterexample` | Meet every hypothesis and violate the conclusion. | [13.2](#132-proof-method-index). |
| `Covariance and correlation` | Measure association while distinguishing it from independence. | [12.3](#123-random-variables-and-moments). |
| `Derivative` | Extract the best first-order local approximation. | [11.1](#111-differentiation-as-local-linear-approximation). |
| `Differential equation` | Relate a function to its rates of change; check initial data. | [11.5](#115-differential-equations-and-initial-data). |
| `Domain, codomain, and image` | Distinguish allowed inputs, declared outputs, and attained outputs. | [4.2](#42-domain-codomain-and-image). |
| `Double counting` | Count the same collection through different classifications. | [9.5](#95-binomial-identities-and-double-counting). |
| `Equality case` | Show when an inequality's bound is actually attained. | [8.3](#83-standard-inequalities-with-equality-cases). |
| `Equivalence` | Prove both directions and preserve the domain. | [3.3](#33-reversible-transformations). |
| `Euclidean algorithm and Bezout identity` | Combine a gcd invariant with finite descent and back-substitution. | [2.2](#22-euclid-and-bezout). |
| `Euler's formula` | Connect complex exponentials with circular functions. | [6.5](#65-complex-arithmetic-and-geometry). |
| `Expectation` | Use weighted averaging and linearity without assuming independence. | [12.3](#123-random-variables-and-moments). |
| `Exponential function` | Express multiplicative growth through an additive input. | [5.3](#53-exponential-functions). |
| `Factorization` | Translate zeros and divisibility into algebraic structure. | [3.2](#32-factorization-and-polynomial-division). |
| `Fourier approximation` | Project onto oscillatory components with convergence qualifications. | [11.6](#116-taylor-polynomials-remainders-and-periodic-approximation). |
| `Fundamental theorem of calculus` | Connect accumulation with differentiation under stated regularity. | [11.4](#114-the-fundamental-theorem-and-integration-methods). |
| `Generating function` | Encode a sequence by coefficients; distinguish formal and analytic uses. | [9.6](#96-generating-functions-as-an-extension). |
| `Geometric series` | Keep the finite identity separate from infinite convergence. | [10.4](#104-infinite-series-and-remainders). |
| `Independence` | Factor joint probabilities under a specified model. | [12.2](#122-conditioning-and-independence). |
| `Induction` | Prove initial cases and every required transition. | [13.2](#132-proof-method-index). |
| `Integral` | Accumulate quantities through a justified limiting process. | [11.3](#113-integration-and-accumulation). |
| `Invariant` | Track a quantity preserved by every allowed transformation. | [13.3](#133-problem-to-method-index). |
| `Law of large numbers` | Control sample averages under appropriate sampling assumptions. | [12.4](#124-repeated-trials). |
| `Least squares` | Minimize squared residuals and interpret the normal equations. | [12.6](#126-fitting-inference-and-model-assumptions). |
| `Limit` | Express approximation through quantified error control. | [10.1](#101-limits-as-error-control). |
| `Linearity` | Separate additivity of expectations from additivity of variances. | [12.3](#123-random-variables-and-moments). |
| `Logarithm` | Invert an exponential and convert multiplication into addition. | [5.4](#54-logarithms-as-inverses). |
| `Logarithmic derivative` | Use relative rates and product structure where the function is nonzero. | [11.2](#112-derivative-rules-and-applications). |
| `Monotonicity` | Compare ordered inputs on a specified domain. | [4.4](#44-monotonicity-symmetry-and-periodicity). |
| `Number systems` | Distinguish closure, inverses, solvability, order, and completeness. | [1.1](#11-number-systems-and-closure). |
| `Optimization` | Distinguish local candidates from global attained bounds. | [8.6](#86-local-and-global-optimization). |
| `Pigeonhole principle` | Compare objects with the number of available classes. | [13.7](#137-classical-problems-and-extensions). |
| `Polynomial root and multiplicity` | Separate the existence, location, and repeated order of a zero. | [3.5](#35-roots-multiplicity-and-coefficients). |
| `Power and root` | State the base domain and branch convention. | [5.2](#52-powers-and-roots). |
| `Prime factorization` | Distinguish the existence proof from the uniqueness proof. | [2.1](#21-divisibility-and-prime-factorization). |
| `Probability model` | Specify outcomes, events, and probability weights. | [12.1](#121-events-and-probability-models). |
| `Projection` | Resolve a vector into orthogonal components. | [7.4](#74-vectors-and-projection). |
| `Quantifier` | Track the order and dependence of choices. | [13.1](#131-statements-sets-and-quantifiers). |
| `Recurrence` | Combine a transition rule with enough initial data. | [9.1](#91-sequence-definitions-and-recurrences). |
| `Roots of unity` | Represent equally spaced rotations and periodic algebra. | [6.6](#66-roots-of-unity-and-periodicity). |
| `Scaling and similarity` | Separate shape from size and check dimensions. | [7.2](#72-similarity-and-measurement). |
| `Series and remainder` | Estimate the part omitted after a finite partial sum. | [10.4](#104-infinite-series-and-remainders). |
| `Set operations` | Translate membership into logical conditions. | [13.1](#131-statements-sets-and-quantifiers). |
| `Supremum` | Distinguish the least upper bound from an attained maximum. | [10.2](#102-completeness-of-the-real-numbers). |
| `Symmetry` | Identify transformations and the quantities they preserve. | [13.4](#134-cross-topic-connection-index). |
| `Taylor polynomial` | Pair the local polynomial with a remainder estimate. | [11.6](#116-taylor-polynomials-remainders-and-periodic-approximation). |
| `Telescoping` | Expose cancellation and retain the boundary terms. | [9.3](#93-summation-transformations). |
| `Trigonometric function` | Connect angle, rotation, periodicity, and inverse branches. | [6.1](#61-angles-and-circular-functions). |
| `Uniform convergence` | Use one approximation threshold for the whole domain. | [10.5](#105-pointwise-and-uniform-convergence). |
| `Variance and standard error` | Distinguish spread of observations from uncertainty of an estimate. | [12.5](#125-describing-data). |
| `Vector and linear transformation` | Express geometry through linear combinations and maps. | [7.5](#75-linear-systems-and-transformations). |
| `Well-ordering` | Justify induction, least counterexamples, and integer descent. | [13.2](#132-proof-method-index). |

### 13.6 Reading and Checking a Mathematical Argument

What deserves checking first in a proposed proof? Reconstruct its claim before inspecting individual calculations.

| Part of the argument | Question to ask |
| --- | --- |
| Statement | What are the domain, hypotheses, quantifiers, and exact conclusion? |
| Representation | Have any inputs been excluded, merged, or introduced? |
| Inference | Does the step give an implication or an equivalence? |
| Theorem use | Are all hypotheses satisfied, including interval, sign, rank, or independence conditions? |
| Existence or optimization | Is an object attained, or has only a bound or at-most-one statement been proved? |
| Algorithm or limit | What guarantees termination, convergence, and the claimed accuracy? |
| Final answer | Do the candidates satisfy the original problem, and are all candidates accounted for? |

It helps to distinguish `discovery` from `justification`. A graph, numerical experiment, analogy, or symbolic calculation can suggest a result. A proof explains why the result follows throughout its stated domain. Computation can also be part of a proof when its exact arithmetic, exhaustive coverage, or certified bounds are justified; its logical role must be stated.

**Worked example 13.7 — When do enough checks prove an identity?**

Suppose a proposed function agrees with $f(x)=x$ at the integers $1,\ldots,N$. Must it equal $x$ everywhere?

For any positive integer $N$, the polynomial

$$
g_N(x)=x+\prod_{j=1}^{N}(x-j)
$$

agrees at all those inputs, yet

$$
g_N(N+1)=N+1+N!\ne N+1.
$$

Thus any finite sample can be matched by a different polynomial if the degree is unrestricted.

There is a precise repair. If two polynomials each have degree at most $d$ and agree at $d+1$ distinct points, their difference has degree at most $d$ and at least $d+1$ roots. The [root bound](#32-factorization-and-polynomial-division) forces that difference to be zero.

**Finite verification can establish a general result when a theorem proves that the tested cases determine it.** The degree restriction is doing essential work; it cannot be inferred from the observations.

**Worked example 13.8 — A plausible induction with a missing transition**

Consider the false claim that every finite nonempty group of horses has a single common color.

The case of one horse holds. For a group of $n+1$ horses, remove the last horse; the remaining $n$ supposedly share one color. Remove the first horse instead; those $n$ supposedly share one color. If the two groups overlap, a horse in their intersection makes the colors agree.

Where does this fail? The overlap has $n-1$ horses. At the transition from $n=1$ to $n=2$, it is empty. The argument proves a conditional transition only for $n\ge2$, while the established base case is $n=1$. The missing case $n=2$ is precisely where the claim is false.

**Check the first transition at which every auxiliary construction is needed.** A correct base case and a convincing-looking general picture do not repair a gap in the induction step.

A useful final review is to change one assumption at a time. Replace “positive” by “nonnegative”; remove a closed endpoint; allow a repeated root; change independent trials to dependent ones. Does the proof still work? If not, identify whether the theorem becomes false or only the chosen proof becomes unavailable. *Failure of one proof is not itself a counterexample to the statement.*

### 13.7 Classical Problems and Extensions

Try the problems before reading the solutions. For each argument, identify its logical form, the main mathematical structure, and the assumption doing the most work.

**Problems**

1. **Unbounded is not the same as tending to infinity.** Write “the real sequence $(a_n)$ is bounded above” and its negation using quantifiers. Compare the negation with $a_n\to+\infty$. Use $a_n=(-1)^n n$, for $n\ge1$, to separate the two claims.

2. **Divisibility by the pigeonhole principle.** Choose any $n+1$ distinct integers from $1,2,\ldots,2n$, with $n\ge1$. Prove that one of the chosen numbers divides another. Show that $n$ chosen numbers need not have this property.

3. **Enough initial cases for an induction.** Prove that every integer $m\ge18$ can be written $m=4a+7b$ with nonnegative integers $a,b$. Explain why your initial cases cover the induction step. Show that $17$ cannot be represented.

4. **An algorithm needs both an invariant and termination.** For positive integers $a,b$, Euclid's algorithm repeatedly replaces $(a,b)$ by $(b,r)$, where $a=qb+r$ and $0\le r<b$, stopping when the second entry is zero. Prove that the gcd is preserved and that the process terminates. Apply it to $(1071,462)$ and find integers $u,v$ such that $1071u+462v=\gcd(1071,462)$. Why would decrease through positive real numbers alone not be enough?

5. **Two consequences of counting acquaintances.** In a finite simple undirected graph with $n\ge2$ vertices, prove that the number of vertices of odd degree is even. Then prove that two vertices have the same degree. A simple graph has no loops or multiple edges, and degree counts incident edges.

6. **A new telescoping remainder.** For $N\ge1$, find an exact formula for

   $$
   S_N=\sum_{k=1}^{N}\frac1{(2k-1)(2k+1)}.
   $$

   Deduce the infinite sum and its exact truncation error. Give a condition on $N$ ensuring error less than $\varepsilon>0$, and find the least $N$ for error below $10^{-6}$. Compare the cancellation pattern with the [telescoping exercise in Chapter 10](#107-classical-problems-and-extensions).

7. **Existence, uniqueness, and iteration.** Let $f:\lbrack 0,1\rbrack \to\lbrack 0,1\rbrack $ be continuous. Prove that $f$ has a fixed point. If additionally

   $$
   |f(x)-f(y)|\le q|x-y|,\qquad 0\le q<1,
   $$

   prove uniqueness and convergence of $x_{n+1}=f(x_n)$ from any $x_0\in\lbrack 0,1\rbrack $. For $f(x)=(x+1)/3$ and $x_0=0$, obtain an exact formula and error. Give an example showing that continuity alone does not imply uniqueness.

8. **Sharp bounds and optimal averaging.** Fix $n\ge1$, positive numbers $w_i$, and real coefficients $c_i$ that are not all zero. Find the smallest constant $C$ such that

   $$
   \left(\sum_{i=1}^n c_i x_i\right)^2
   \le C\sum_{i=1}^n w_i x_i^2
   $$

   for every real vector $x$. Determine all equality cases. Then minimize $\sum_iw_ix_i^2$ subject to $\sum_ic_ix_i=1$, and explain how the special choice $c_i=1$ recovers inverse-variance averaging. This extends the [weighted constant problem in Chapter 8](#87-classical-problems-and-extensions).

**Solution notes**

**1. Unbounded is not the same as tending to infinity.** Boundedness above means

$$
\exists M\in\mathbb R\ \forall n\ge1:\ a_n\le M.
$$

Its negation is

$$
\forall M\in\mathbb R\ \exists n\ge1:\ a_n>M.
$$

By contrast, divergence to positive infinity means

$$
\forall M\in\mathbb R\ \exists N\ge1\ \forall n\ge N:\ a_n>M.
$$

The second assertion requires a term above each threshold; the third requires every sufficiently late term to stay above it.

For $a_n=(-1)^n n$, the even-indexed terms exceed any fixed upper bound eventually, while the odd-indexed terms are negative. The sequence is unbounded above but does not tend to $+\infty$. **“Somewhere above” and “eventually always above” have different quantifier structures.**

**2. Divisibility by the pigeonhole principle.** Every positive integer has a unique representation $2^r u$, where $u$ is odd and $r\ge0$. For integers at most $2n$, the odd part $u$ belongs to

$$
1,3,5,\ldots,2n-1,
$$

a collection of $n$ possibilities. Two of the $n+1$ selected integers have the same odd part, say $2^r u$ and $2^s u$ with $r<s$. The first divides the second.

The $n$ integers $n+1,\ldots,2n$ contain no distinct divisibility pair: if $a<b$ and $a\mid b$, then $b\ge2a>2n$. Thus the threshold is sharp.

**Partition by a representation that turns a shared class into the desired relation.** Arbitrary boxes would not supply this divisibility conclusion.

**3. Enough initial cases for an induction.** Start with four consecutive values:

$$
18=4+7+7,\qquad 19=4+4+4+7,
$$

$$
20=5\cdot4,\qquad 21=3\cdot7.
$$

For $m\ge22$, the integer $m-4\ge18$ has a representation by strong induction; adding one more $4$ gives a representation of $m$. The four initial cases cover the four residue classes modulo $4$.

If $17=4a+7b$, reduction modulo $4$ gives $3b\equiv1\pmod4$, hence $b\equiv3\pmod4$. Nonnegativity would force $b\ge3$, so $7b\ge21>17$, impossible.

**The number of initial cases must match the step used by the argument.** An induction advancing by four cannot begin from only one residue class.

**4. An algorithm needs both an invariant and termination.** For any positive integer $d$,

$$
d\mid a\ \text{and}\ d\mid b
\quad\Longleftrightarrow\quad
d\mid b\ \text{and}\ d\mid(a-qb).
$$

Thus the sets of common divisors, and hence the gcds, coincide. Each nonfinal remainder is a strictly smaller positive integer than the previous second entry, so infinite continuation is impossible. When the second entry becomes zero, the first is the gcd.

Here,

$$
1071=2\cdot462+147,\quad
462=3\cdot147+21,\quad
147=7\cdot21.
$$

Therefore the gcd is $21$. Back-substitution gives

$$
21=462-3\cdot147=462-3(1071-2\cdot462)
=-3\cdot1071+7\cdot462,
$$

so $u=-3$, $v=7$.

The invariant proves that the answer is preserved; integer descent proves that an answer is reached. The real sequence $2^{-n}$ shows why a decreasing positive real quantity alone does not establish finite termination.

**5. Two consequences of counting acquaintances.** Count vertex-edge incidences in two ways. Every edge has two endpoints, so

$$
\sum_{v}\deg(v)=2|E|.
$$

Modulo $2$, the sum has the parity of the number of odd-degree vertices. That number must therefore be even.

For repeated degrees, the possible values are $0,1,\ldots,n-1$. But degree $0$ and degree $n-1$ cannot both occur: a vertex adjacent to every other vertex cannot coexist with an isolated vertex. Thus the $n$ vertices occupy at most $n-1$ available degree values, and the pigeonhole principle gives a repeated degree.

**Counting the same incidences yields parity; restricting the available degree classes yields repetition.** Neither argument depends on a particular drawing of the graph.

**6. A new telescoping remainder.** Partial fractions give

$$
\frac1{(2k-1)(2k+1)}
=\frac12\left(\frac1{2k-1}-\frac1{2k+1}\right).
$$

The intermediate odd-denominator terms cancel, leaving

$$
S_N=\frac12\left(1-\frac1{2N+1}\right)
=\frac{N}{2N+1}.
$$

Therefore the series sums to $1/2$, with exact remainder

$$
R_N=\frac1{2(2N+1)}.
$$

The strict inequality $R_N<\varepsilon$ is equivalent to $N>1/(4\varepsilon)-1/2$. For $\varepsilon=10^{-6}$, the least integer is $N=250000$; its remainder is $1/1000002$, whereas $N=249999$ gives $1/999998$.

**Cancellation is controlled by matching shifted denominators, not by requiring consecutive integer denominators.** The finite remainder determines both the infinite sum and the least sufficient truncation.

**7. Existence, uniqueness, and iteration.** Put $g(x)=f(x)-x$. It is continuous, with $g(0)\ge0$ and $g(1)\le0$. An endpoint may already be a zero; otherwise the intermediate value theorem gives a zero in $(0,1)$. Thus a fixed point $p$ exists.

If $p,r$ are both fixed points and the contraction bound holds, then

$$
|p-r|=|f(p)-f(r)|\le q|p-r|.
$$

Since $q<1$, this forces $p=r$.

The iterates remain in $\lbrack 0,1\rbrack $ because $f$ maps that interval into itself. Repeated application of the bound gives

$$
|x_n-p|\le q^n|x_0-p|\longrightarrow0.
$$

For $q=0$, the function is constant and the fixed point is reached after one step. For the particular function $f(x)=(x+1)/3$, the fixed point is $p=1/2$ and

$$
x_{n+1}-\frac12=\frac13\left(x_n-\frac12\right).
$$

With $x_0=0$,

$$
x_n=\frac12(1-3^{-n}),\qquad
|x_n-p|=\frac1{2\cdot3^n}.
$$

Continuity alone does not ensure uniqueness: $f(x)=x$ fixes every point of the interval. **The interval and continuity provide existence here; contraction supplies uniqueness and a convergence rate.**

**8. Sharp bounds and optimal averaging.** Apply Cauchy–Schwarz to $(\sqrt{w_i}x_i)_i$ and $(c_i/\sqrt{w_i})_i$:

$$
\left(\sum_i c_i x_i\right)^2
\le\left(\sum_iw_ix_i^2\right)
\left(\sum_i\frac{c_i^2}{w_i}\right).
$$

Thus $C=\sum_i c_i^2/w_i>0$ works. Equality holds exactly when

$$
x_i=t\,\frac{c_i}{w_i}\quad\text{for every }i,
\qquad t\in\mathbb R.
$$

For $t\ne0$, the squared linear expression is exactly $C$ times the weighted sum of squares, so no smaller constant works. The choice $w=(1,2,3)$ and $c=(1,1,1)$ recovers $11/6$ from Chapter 8.

Under the normalization $\sum_i c_i x_i=1$, the bound gives

$$
\sum_i w_i x_i^2\ge\frac1C.
$$

The equality condition now forces $tC=1$, so the unique minimizer is

$$
x_i=\frac{c_i/w_i}{\sum_j c_j^2/w_j}.
$$

For $c_i=1$ and $w_i=\sigma_i^2$, these coefficients sum to one and minimize the variance of an unbiased linear average of independent measurements with a common mean and positive variances $\sigma_i^2$. They are the [inverse-variance weights of Chapter 12](#127-classical-problems-and-extensions).

**A sharp inequality and a constrained minimum are two forms of the same geometric statement.** Rescaling by $\sqrt{w_i}$ identifies the relevant direction, while the equality condition constructs the optimal coefficients.

## 14. Sources, Scope, and Editorial Notes

**Primary material:** Felix Klein, [Elementary Mathematics from an Advanced Standpoint: Arithmetic, Algebra, Analysis][Klein]. Its organization and connecting arguments guide the advanced perspective; the reference supplies elementary reminders that Klein often assumes his readers already know.

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

The supplied historical works provide context and selected bridges where appropriate. Modern definitions and later developments are identified as such. Missing or damaged equations in the transcriptions will be reconstructed and checked; historical claims will not be treated as current mathematical definitions.

Each substantive entry combines a compact review statement, explicit hypotheses, an explanation, an advanced connection, a pitfall or counterexample, and links to related entries. In-text worked examples show the reasoning where it is needed. Chapter-end classical problems extend the methods, with the complete problem list preceding separate solution notes so that readers can try the questions first. Longer proofs are reserved for results that illuminate several topics.

The notation follows the established reading convention: selected terms in inline code, methods and important conclusions in bold, and obstacles or limitations in italics. Mathematical notation remains in math delimiters. Source locations and editorial remarks are collected in this final chapter.

A first review can proceed through Chapters 1–9 and 12, consulting Chapter 13 as needed. A second pass can follow the attached advanced connections into Chapters 10–11. Specialized extensions remain optional; the explanations of the elementary material are self-contained at their stated levels.

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


**Chapter 6: source map and explanatory additions**

| Entry | Principal connection to [Klein][Klein] | Treatment in this reference |
| --- | --- | --- |
| 6.1 Angles and circular functions | Part III, II.1, “Theory of the Goniometric Functions”: coordinates on the unit circle, sector area, periodicity, and the relation to arc measurement. | Radians and sector area are linked explicitly. The ratio table, exact standard values, quadrant example, and geometric small-angle bound supply the elementary review. |
| 6.2 Identities from rotation | Part III, II.1: addition and multiple-angle formulas, complex representation, and the parameter $\tan(\theta/2)$ obtained from a pencil of lines through the circle. | Rotation matrices organize the addition formulas; the amplitude–phase example and domain qualifications are independently developed. The half-angle parameter reconnects this chapter with Part I's rational-circle construction. |
| 6.3 Inverse branches and equations | Part III, II.1: inverse circular functions and their extension to complex function theory. | Real principal intervals, complete real solution families, and transformation pitfalls are made explicit. The full theory of complex inverse trigonometric functions is outside this chapter's scope. |
| 6.4 Triangle relations | Part III, II.3.A, “Trigonometry, in particular, spherical trigonometry.” | The plane sine and cosine laws, area derivations, and SSA example are supplementary elementary material that Klein largely assumes. The spherical octant example illustrates the dependence on geometry without importing his specialized oriented-angle conventions. |
| 6.5 Complex arithmetic and geometry | Part I, IV.1–3: formal and geometric foundations of complex numbers and quaternion rotations; Part III, II.1: circular and hyperbolic functions, exponential series, and Euler's formula. | Arithmetic formulas are reconstructed with the correct nonzero-denominator condition. The series argument for Euler's formula explicitly requires convergence. The optional quaternion extension uses the standard unit-quaternion action on pure vectors. |
| 6.6 Roots of unity and periodicity | Part III, II.1 on De Moivre's formula; Part I's discussion of regular polygons; Part III, II.3.C on finite trigonometric approximation and the distinction from infinite-series convergence. | Complete complex-root lists, the order criterion, the roots-of-unity filter, and the discrete Fourier transform are supplementary modern developments connecting these themes. The finite transform is not presented as Klein's continuous least-squares construction. |

The seven worked examples and seven chapter-end problems have independently written solutions. The pentagon, rational circle transformation, binomial filter, and quaternion examples are selected to connect elementary calculations with algebra, geometry, and periodic structure. The exponential-series proofs of analytic facts are cross-referenced to Chapter 11; infinite Fourier convergence is not inferred from a finite reconstruction formula.

The three SVGs are original mathematical diagrams. The unit-circle and sine panels use the same angle $\pi/3$; the SSA diagram shows both ray–circle intersections for $A=\pi/6$, $a=7$, $b=10$; the complex-root diagram places all three roots of $z^3=8i$ on the circle of radius $2$. Distances, arguments, exact values, branch choices, and the stated quaternion products are checked independently. Missing formulas and the erroneous division exception in the supplied complex-number transcription are not reproduced.


**Chapter 7: source map and explanatory additions**

| Entry | Principal connection to [Klein][Klein] | Treatment in this reference |
| --- | --- | --- |
| 7.1 Synthetic relations and geometric proof | “Concerning the Modern Development and the General Structure of Mathematics,” on connecting arithmetic, algebra, geometry, and analysis. | The congruence, similarity, triangle, and circle review is supplementary elementary geometry. Synthetic and coordinate proofs of power of a point exhibit the same invariant in different representations. |
| 7.2 Similarity and measurement | Part III, III.1, “General Considerations in Infinitesimal Calculus”: Cavalieri's principle and its relation to accumulation and calculus. | Area and volume formulas, the frustum example, and the hemisphere comparison are independently developed. Equal-area sections need not be congruent; the stronger claim suggested by the transcription's discussion of translated layers is not used. |
| 7.3 Coordinate descriptions and loci | Part II, I, on equations and their geometric interpretation; Part III, II.1, on circle and hyperbola parameterizations through pencils of lines. | The systematic locus and conic reference is supplementary. Focus–directrix equations, branch restrictions, quadratic classification, and the distinction between coordinates and metric are derived or qualified explicitly. |
| 7.4 Vectors and projection | Part I, IV.2–3: vector interpretations, orthogonal transformations, and the preservation or scaling of sums of squares. | Dot products, closest-point projection, normals, cross products, and Gram matrices provide a modern elementary linear-algebra connection. They are not presented as a systematic vector-space chapter from Klein. |
| 7.5 Linear systems and transformations | Part I, IV, on linear equations, determinants, rotations, and expansions; Part III, II.1, on a projective interpretation of circular and hyperbolic parameterizations. | Rank, kernels, affine solution sets, shear, homogeneous coordinates, and the line-at-infinity classification are supplementary explanations. The distinction between moving points and changing coordinate bases is explicit. |
| 7.6 Classical construction problems | Part I, III, “Concerning Special Properties of Integers”: regular polygons and the impossibility proof for the heptagon; Part II's discussion of angle trisection; the supplement on the transcendence of $e$ and $\pi$. | Missing heptagon equations are reconstructed from roots of unity. Quadratic towers and degree multiplication give a modern formulation of the square-root obstruction. The transcendence of $\pi$ is invoked as a theorem, without reproducing its proof. |

The seven worked examples and seven chapter-end problems have independently written solutions. Ceva's theorem, the sphere comparison, radical axes, ellipse tangency, the projective midpoint example, and the Euler line extend the supplementary geometry review. The construction arguments distinguish exact operations from approximation, individual trisectible angles from a universal procedure, and the necessary degree test from the full quadratic-tower criterion.

The three SVGs are original mathematical diagrams: focus–directrix descriptions of an ellipse, parabola, and hyperbola; the area-preserving shear $(x,y)\mapsto(x+2y,y)$; and the semicircle construction of a geometric mean with $a=4$, $b=1$. Each Cartesian panel has equal horizontal and vertical units. Equations, incidences, distances, volume calculations, and irreducible cubics are checked independently; no conclusion depends on measurement from a drawing.


**Chapter 8: source map and explanatory additions**

| Entry | Principal connection to [Klein][Klein] | Treatment in this reference |
| --- | --- | --- |
| 8.1 Order-preserving operations | Part I, I–II, on arithmetic laws, signs, and extension of number; Part III, I, on logarithms and their domains. | Order equivalences, sign-sensitive operations, and the radical-inequality example are supplementary elementary review, with cases stated before squaring or division. |
| 8.2 Intervals and sign charts | Part II, I, “Real Equations with Real Unknowns,” especially graphical intersections and changing numbers of real roots. | Rational sign charts, multiplicity, domain exclusions, and absolute-value inequalities are independently organized. Graphical intuition is separated from endpoint and sign verification. |
| 8.3 Standard inequalities with equality cases | Part I, IV, on norms and geometric interpretation; Part III, II.3.C, on squared-error approximation. | AM–GM, Cauchy–Schwarz, triangle inequalities, and the mean chain form a supplementary inequality reference. Projection and nonnegative squares explain the bounds and their equality conditions; these results are not attributed to a dedicated inequality chapter in Klein. |
| 8.4 Bounding and comparison | Part I, II, on enclosing irrational numbers and the distinction between exactness and approximation; Part III, III.2, on estimating approximation remainders. | The square-root enclosure is derived by an exact algebraic remainder, not an assumed truncated series. Error bounds distinguish residual size from error in the unknown. Historical claims about physical measurement limits are not adopted. |
| 8.5 Convexity and averages | Part III, II.3.C: finite trigonometric approximation by minimizing integrated squared error. | Convexity, Jensen's inequality, weighted AM–GM, Bernoulli bounds, and the variance identity supply a modern framework. General weighted fitting uses the corresponding weighted inner product, with zero-weight entries omitted. The constant-fitting example is a finite elementary analogue, not a transcription of Klein's trigonometric computation. |
| 8.6 Local and global optimization | Part III, III.1: the extreme value theorem and the reasoning behind a zero derivative at an interior extremum; Part III, II.3.C: the quadratic structure of the approximation objective. | Compactness, sharp but unattained bounds, convex global optimality, and orthogonality certificates distinguish existence, candidate generation, and proof of optimality. Calculus statements are explicit connections to Chapters 10–11. |

The seven worked examples and seven chapter-end problems have independently written solutions. The parameter inequality, Nesbitt inequality, weighted best constant, reflection path, logarithmic bounds, median comparison, and box-volume problem supply classical practice in method selection and equality conditions.

The Chinese classification reference labels the displayed inequality $f(\lambda x+(1-\lambda)y)\le\lambda f(x)+(1-\lambda)f(y)$ as concave. Under the convention used here, this is the defining direction for a convex function; concavity reverses it. The English treatment corrects that label and states the interval and weight assumptions. The separate Chinese file is used as a coverage reference.

The two SVGs are original mathematical plots. One compares chords and tangents for $x^2$ and $\sqrt{x}$; the other shows the supporting line $3x+4y=5$ for a closed disk and for an open disk. The plotted curves, tangent slopes, equality points, exact numerical enclosure, sign intervals, and optimal values are checked independently.


**Chapter 9: source map and explanatory additions**

| Entry | Principal connection to [Klein][Klein] | Treatment in this reference |
| --- | --- | --- |
| 9.1 Sequence definitions and recurrences | Part I, I, on mathematical induction in the discussion of arithmetic foundations; Part III, I.2, on the difference equations and geometric progressions underlying logarithmic tables. | Initial data, index conventions, fixed-point shifting, and the matrix representation of a second-order recurrence supply a modern elementary review. The retention example is independently constructed. |
| 9.2 Standard finite sums | Part III, I.2, on replacing a difference equation by a summation relation; Part III, III.2, on finite differences and their relation to calculus. | Arithmetic, geometric, square, and cube sums are derived explicitly. Finite identities and infinite limits are separated, with the geometric convergence condition stated. |
| 9.3 Summation transformations | Part III, III.2, especially the notation and algebra of successive finite differences. | Reindexing, telescoping, weighted geometric sums, summation by parts, and triangular double sums are supplementary explanations of discrete calculation. Endpoint terms and index shifts are retained throughout. |
| 9.4 Counting by cases and stages | Supplementary combinatorics, using the Chinese reference's coverage checklist. | Addition and multiplication principles, permutations, combinations, stars and bars, inclusion–exclusion, and pigeonhole arguments are independently developed. Counting conventions are stated before formulas are chosen. |
| 9.5 Binomial identities and double counting | Part III, I.2, on the binomial theorem and the need to justify limiting operations; Part III, III.2, on Newton interpolation at equally spaced points and binomial coefficients in difference tables. | Finite binomial expansion, marked subsets, Vandermonde's identity, and lattice-path arguments provide the combinatorial explanation. Newton's unit-step formula reconstructs equations missing in the transcription and retains the polynomial-degree hypothesis. |
| 9.6 Generating functions as an extension | Supplementary algebraic treatment, connected to Klein's recurrence, series, and finite-difference themes. | Formal power series, convolution, coefficient extraction, rational generating functions, and the tiling/Fibonacci example are modern explanatory additions. Coefficientwise identities are distinguished from analytic convergence and numerical evaluation. |

The seven worked examples and seven chapter-end problems have independently written solutions. The Tower of Hanoi, factorial telescoping, divisible consecutive block, derangements, nonadjacent selections, coin totals, and interpolation example develop recurrence, bijection, inclusion–exclusion, and model-assumption arguments. Systematic combinatorics and formal generating functions are supplementary to the main Klein volume, rather than presented as chapters it contains.

The finite binomial theorem is stated for nonnegative integer exponents and commuting quantities. The supplied material's broader discussions of binomial series do not remove convergence conditions or justify exchanging a limit with an unbounded sum. Missing formulas in the difference-table transcription are reconstructed from Pascal's identity and polynomial interpolation, with the step size fixed at one.

The two SVGs are original diagrams. The stars-and-bars drawing encodes the occupancy vector $(4,1,3)$ and distinguishes the unrestricted count from capacity restrictions. The lattice-path diagram shows a path from $(0,0)$ to $(8,4)$ crossing $x+y=5$ at $(3,2)$, supporting the stated Vandermonde decomposition. Finite-sum formulas, initial values, coefficient counts, recurrence identities, and numerical answers are checked independently.

**Chapter 10: source map and explanatory additions**

| Entry | Principal connection to [Klein][Klein] | Treatment in this reference |
| --- | --- | --- |
| 10.1 Limits as error control | Part I, II.3, on arbitrarily narrow rational enclosures and exactness; Part III, III.1, on the passage from geometric approximation to limit definitions. | Modern sequence and function definitions make the quantifier order explicit. Rationalization, squeeze arguments, and computable error bounds supply independently developed elementary review. |
| 10.2 Completeness of the real numbers | Part I, II.3, “Irrational Numbers,” especially Dedekind cuts; Supplement II.2, on order, density, and cuts. | Least upper bounds, the Cauchy criterion, nested intervals, and Bolzano–Weierstrass are stated in modern terminology. The nested radical separates existence of a limit, its identification, and an error bound. Historical uses of “closed” and “continuous” for ordered assemblages are not adopted as present-day definitions. |
| 10.3 Continuity and existence | Part III, III.1, on the extreme value theorem in the justification of the mean value theorem; Supplement II.2, on continuity and mappings. | Bisection, the intermediate value theorem, uniform continuity, and compactness are expanded as a modern explanation of the hypotheses behind existence and attainment. The cubic example is independently calculated. |
| 10.4 Infinite series and remainders | Part III, I.2, on Euler's limiting operations and the subsequent scrutiny of convergence; Part III, III.2, on remainders and approximation. | The tests, harmonic-series grouping, alternating bounds, and explicit rearrangement are supplementary systematic review. Infinite sums are defined by partial sums, and error estimates retain their index conventions. |
| 10.5 Pointwise and uniform convergence | Part III, II.3.C, on trigonometric partial sums, Dirichlet's convergence conditions, and Gibbs's phenomenon; the excursus on the general function concept. | The powers example, quantifier comparison, three-error continuity proof, M-test, and derivative counterexample provide a modern framework. The geometric-series remainder makes domain-dependent uniform control explicit. No general convergence theorem for Fourier series is inferred from continuity alone. |
| 10.6 Counting infinite sets | Supplement II.1, “The Power of an Assemblage”: rationals, algebraic numbers, the diagonal argument, and correspondences between a segment and a square; Supplement II.2, on order and continuous mappings. | Finite-height enumeration and the decimal diagonal proof reconstruct the reasoning explicitly. Canonical decimals exclude tails of nines, while the diagonal uses only digits 1 and 2. Cardinality, density, completeness, and topology are distinguished. |

The seven worked examples and seven chapter-end problems have independently written solutions. Cesàro averaging, the Babylonian iteration, interval fixed points, a telescoping remainder, a conditional rearrangement, uniform estimates on an unbounded domain, and binary-to-ternary encoding extend the chapter's methods. The systematic convergence tests, uniform-continuity proof, and M-test are explanatory additions rather than a transcription of a dedicated sequence-and-series chapter in Klein.

Some formulas and qualifications are damaged or missing in the supplied transcription. The treatment therefore reconstructs arguments from explicit finite identities and inequalities. In particular, a fixed-point equation is used only after convergence is proved; sign-changing brackets retain continuity; ratio and root tests leave the boundary value 1 undecided; and decimal ambiguities are resolved before diagonalization. Klein's discussion of graphical limiting behaviour near a Fourier jump is used as motivation, not as a claim that a discontinuous function acquires vertical segments as function values.

The two SVGs are original diagrams. The bisection drawing uses exact rational brackets for $x^3-x-1$, and the convergence drawing compares $x^n$ on $\lbrack0,1\rbrack$ with its restriction to $\lbrack0,0.8\rbrack$. The highlighted moving input and the uniform error threshold are calculated from the formulas. Root brackets, rational iterates, remainder indices, finite partial-sum identities, rendering, and image links are checked independently.

**Chapter 11: source map and explanatory additions**

| Entry | Principal connection to [Klein][Klein] | Treatment in this reference |
| --- | --- | --- |
| 11.1 Differentiation as local linear approximation | Part III, III.1, on secants, tangents, finite increments, limits, and Leibniz notation; III.2, on replacing a curve by its tangent and higher-order approximations. | The little-o formulation, exact square-root remainder, and derivative as a linear map give a modern explanation. Differentials are distinguished from actual finite increments. |
| 11.2 Derivative rules and applications | Part III, III.1, especially the mean value theorem as the bridge from derivatives to finite changes; Part III, I, on exponential and logarithmic functions. | The rule table, logarithmic differentiation, inverse and implicit differentiation, optimization tests, and qualified l'Hôpital statement supply systematic review. The mean value argument retains the continuity and differentiability hypotheses. |
| 11.3 Integration and accumulation | Part III, III.1, on quadrature, sums of narrow rectangles, and the distinction between intuitive approximation and a limiting definition. | Tagged Riemann sums, signed accumulation, the square-sum example, and midpoint/trapezoidal error bounds are independently developed. Numerical error bounds state their smoothness requirements. |
| 11.4 The fundamental theorem and integration methods | Part III, I, on the logarithm as an integral; Part III, III.1, on the foundations of differentiation and integration. | The shrinking-average proof, substitution, integration by parts, improper integrals, and logarithmic-series remainder organize the elementary methods. The alternating harmonic sum is identified by integrating a finite identity. |
| 11.5 Differential equations and initial data | Part III, II.3.B, “Theory of small oscillations, especially those of the pendulum”; Part III, I, on exponential dependence. | The pendulum equation and its missing formulas are reconstructed with explicit modeling assumptions. Separation, integrating factors, local existence and uniqueness, blow-up, and Euler stability are supplementary modern explanations. Restoring-force error is distinguished from a trajectory-error bound. |
| 11.6 Taylor polynomials, remainders, and periodic approximation | Part III, III.2, “Taylor's Theorem,” emphasizing finite polynomials, remainders, interpolation, and complex singularities; Part III, II.3.C, on finite trigonometric least squares, orthogonality, convergence, and Gibbs's phenomenon. | Finite error estimates precede infinite expansions. The smooth nonanalytic example, explicit complex exponential product, error classification, and conditioning formula supply modern connections. Fourier coefficients use the interval from $-\pi$ to $\pi$, with the constant term $a_0/2$. |

The eight worked examples and eight chapter-end problems have independently written solutions. The cylinder, signed motion, symmetry integral, logistic equation, Newton iteration, exact quadrature errors, noisy difference quotient, and Fourier derivation of the reciprocal-square sum extend the main methods. The calculus rule tables and ODE existence statements are supplementary reference material, not a claim that Klein supplies a modern introductory textbook in the same order.

The source's inverse-tangent discussion requires separating the radius of convergence from endpoint behaviour: the real series converges at both $x=1$ and $x=-1$, despite the radius being one. The rational example $1/(1+x^2)$ makes the complex singularities visible while also showing that endpoint behaviour can change after integration. Missing Taylor and Fourier equations are reconstructed with explicit normalizations and remainders. A Fourier jump is represented by separate one-sided branches, not by a vertical segment of function values.

The three SVGs are original diagrams: Euler approximations to exponential decay with three step sizes; real Taylor polynomials and the complex singularities that limit their radius; and periodic sawtooth sums with a close view of a jump. Polynomial values, differential-equation residuals, exact fractions, quadrature constants, coefficient signs, finite squared-error formulas, and error thresholds are checked independently.

**Chapter 12: source map and explanatory additions**

| Entry | Principal material | Treatment in this reference |
| --- | --- | --- |
| 12.1 Events and probability models | [Companion][Companion], 10.1 “Combinatorial Probability,” 10.2 “The Early Development of Mathematical Probability,” and 10.16 “Foundations of Probability.” | Finite weights, event algebra, and countable additivity use modern notation. The problem of points develops the distinction between equally weighted continuations and unequally weighted terminal records. |
| 12.2 Conditioning and independence | [Companion][Companion], 10.16, “Conditional Probability and Independence,” together with 10.2 on inverse probability. | Bayes's rule is derived from conditioning and a partition. The inspection example is hypothetical, with model-derived expected counts. Pairwise, mutual, and conditional independence are distinguished. |
| 12.3 Random variables and moments | [Companion][Companion], 10.2 on expectations and generating functions; 10.5 “Theory of Errors”; 10.6 “Russian Probability and Statistics Before Kolmogorov.” | Indicator variables, covariance, correlation, and the within/between variance decomposition provide a modern systematic review. The permutation calculation uses exact finite counting. |
| 12.4 Repeated trials | [Companion][Companion], 10.2 on Bernoulli and de Moivre; 10.6 on weak laws, the Chebyshev bound, central limits, and dependence; 10.14 “Statistical Control of Manufacture.” | Distribution conventions, the hypergeometric correction, and finite error bounds are reconstructed explicitly. The stated CLT uses independent identically distributed variables with finite positive variance; damaged historical formulas are not treated as current theorem statements. |
| 12.5 Describing data | The Chinese reference's descriptive-statistics checklist; [Companion][Companion], 10.4 “Estimating and Testing the Standard Linear Statistical Model,” 10.5 on error criteria, and 10.11 “Probability and Statistics in Agronomy.” | Empirical variance and the unbiased variance estimator use different symbols and stated purposes. The denominator correction is derived. Quantile conventions, group weights, and the hypothetical task-mixture reversal are supplementary explanations. |
| 12.6 Fitting, inference, and model assumptions | [Companion][Companion], 10.4 on least squares and finite-sample theory; 10.7 on observation and experiment; 10.11 on sampling distributions and design; 10.14 on testing risks. [Klein][Klein], Part III, II.3.C, supplies the earlier geometric connection through finite trigonometric least squares. | Normal equations are derived directly, with full-rank conditions. Gauss–Markov optimality, exact normal-model intervals, likelihood, p-values, and Bayesian uncertainty are given as modern explanatory connections with distinct assumptions. |

This chapter supplements the main Klein volume. The eight worked examples and eight chapter-end problems have independently written solutions. The birthday model assumes independent uniform labels; the inspection and algorithm examples are constructed examples, not empirical datasets. The coupon collector, inverse-variance weights, common-error model, multiple-testing bound, and beta-binomial prediction extend the elementary methods.

The supplied [Kline][Kline] passage “The Binomial Theorem and Allied Topics” connects combinations with early probability. Its label “Bernoulli's theorem” accompanies a binomial-tail statement. This reference separates that finite distribution identity from Bernoulli's law-of-large-numbers conclusion. The supplied historical discussions are used for their mathematical connections without adopting obsolete claims, damaged formulas, or conflicting priority dates.

The Chinese checklist uses the divisor $n$ for a descriptive variance and mentions $n-1$ for unbiased estimation. Here both conventions are retained with their purposes stated, and the unbiasedness claim is restricted to the independent common-distribution model with finite variance. Least-squares algebra, probabilistic optimality, and exact inference are kept distinct; normality is not added to the Gauss–Markov conclusion, while the exact Student interval does require the stated normal sampling model.

The three SVGs are original diagrams: conditional probabilities and expected frequencies in an inspection tree; group-specific and pooled rates for two task algorithms; and a least-squares line with vertical residuals and normal-equation checks. Conditional probabilities, finite-population variances, permutation moments, summary weights, exact test tails, multiple-test probabilities, and posterior normalizations are checked independently.

**Chapter 13: source map and explanatory additions**

| Entry | Principal material | Treatment in this reference |
| --- | --- | --- |
| 13.1 Statements, sets, and quantifiers | The Chinese reference, “Sets and Logic,” and its proof-method checklist. | Classical logical notation, quantifier dependence, vacuous truth, and existence versus uniqueness are stated explicitly. The positive-function example separates pointwise positivity from a uniform positive bound. |
| 13.2 Proof-method index | The Chinese reference, “Common Proof Methods in Elementary Mathematics,” including induction, descent, counting, invariants, and extremal arguments. | The index links to arguments in the subject chapters. Exhaustive cases need not be disjoint in a proof; the stronger requirement in the checklist is restricted to additive counting without overlap corrections. Prime-factorization existence is separated from uniqueness. |
| 13.3 Problem-to-method index | The Chinese reference's problem-solving strategies and subject-specific method checklist; [Klein][Klein], Introduction, on graphical methods and connections between fields. | The diagnostic table is an editorial synthesis. The reciprocal quartic and chessboard obstruction are independently worked examples, with domain restrictions and the limits of necessary conditions retained. |
| 13.4 Cross-topic connection index | [Klein][Klein], Introduction and “Concerning the Modern Development and the General Structure of Mathematics,” especially Plans A, B, and C. | The connections develop Klein's interplay of systematic organization, links between fields, and formal calculation. Quantified limits, computational certificates, and the explicit distinction from metamathematics are modern explanatory formulations. The numerical root certificate is checked by exact rational arithmetic. |
| 13.5 Alphabetical concept index | The completed subject chapters of this reference. | Seventy-three entries link to the relevant definitions, derivations, and examples. This is an editorial navigation aid, not a reproduction of the source book's index. |
| 13.6 Reading and checking an argument | The Chinese reference's review checklist; [Klein][Klein], Introduction, on the distinction between an accessible presentation and systematic logical organization, and the general-structure discussion of algorithmic discovery. | The audit questions, polynomial verification example, and failed-induction example are supplied as practical exercises in proof reading. Mathematical discovery, logical justification, and certified computation are distinguished. |

The eight worked examples and eight chapter-end problems have independently written explanations or solutions. The final problems connect quantifier order, divisibility, induction, Euclid's algorithm, graph counting, an odd-denominator telescoping sum, fixed points, and sharp bounds for linear functionals. The last exercise converts its equality condition into a constrained minimum and the inverse-variance averaging rule. Graphs are explicitly finite, simple, and undirected; the fixed-point argument states both the interval self-map condition and the additional contraction assumption. No general claim about arbitrary formal systems or decidability is inferred from elementary proof techniques.

The chessboard SVG is an original diagram. The corner colors and remaining counts, reciprocal factorization, exact root residual, Bezout coefficients, telescoping remainder, fixed-point formula, and best-constant equality cases are checked independently. The source descriptions locate the mathematical connections without reproducing damaged transcription formulas or historical claims unrelated to the chapter.

**Draft status:** Chapters 1–13 are written, including worked examples and chapter-end problems with solutions. Chapter 14 collects the source maps and editorial notes.


[Klein]: <../../../../todos/_10_materials/HistoryOfMathematics/Elementary Mathematics from an Advanced Standpoint Arithmetic, Algebra, Analysis (Felix Klein) (z-library.sk, 1lib.sk, z-lib.sk)/Elementary Mathematics from an Advanced Standpoint Arithmetic, Algebra, Analysis (Felix Klein) (z-library.sk, 1lib.sk, z-lib.sk).md>
[Companion]: <../../../../todos/_10_materials/HistoryOfMathematics/Companion Encyclopedia of the History and Philosophy of the Mathematical Sciences (I. Grattan-Guinness) (z-library.sk, 1lib.sk, z-lib.sk)/Companion Encyclopedia of the History and Philosophy of the Mathematical Sciences (I. Grattan-Guinness) (z-library.sk, 1lib.sk, z-lib.sk).md>
[Kline]: <../../../../todos/_10_materials/HistoryOfMathematics/Mathematical Thought from Ancient to Modern Times (3-volume-set) (Morris Kline) (z-library.sk, 1lib.sk, z-lib.sk)/Mathematical Thought from Ancient to Modern Times (3-volume-set) (Morris Kline) (z-library.sk, 1lib.sk, z-lib.sk).md>
