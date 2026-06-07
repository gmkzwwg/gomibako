---
title: Calculus
layout: post
categories: Notes
subclass: Calculus
reference:
  - Calculus
---

# Calculus — Pre-Study Orientation

## 1. Identity & Core Question

Calculus is the mathematics of *change measured exactly* and *accumulation summed exactly*, achieved by controlling infinite processes rather than evading them. Its central trick is to extract a finite, definite answer from a question that naively requires dividing zero by zero (instantaneous rate) or adding infinitely many infinitely small pieces (total accumulation). The miracle the subject organizes itself around is that these two apparently unrelated operations are inverse to each other.

The core questions are three, and they collapse into one. (1) Given a quantity that varies, what is its rate of change at a single instant — not over an interval, but *at a point*? (2) Given a rate of change, or a curve, how much total quantity accumulates — area under a curve, distance from velocity? (3) Why are these two questions secretly the same question, so that solving one solves the other? The third question is the field's spine; everything before it is preparation and everything after is consequence.

The objects of study are *functions* (rules assigning outputs to inputs) and the *limit* operation applied to them. Functions are worth studying because almost every quantitative relationship in nature and economics is a function, and the limit is worth studying because it is the only known way to make "infinitely close" mean something precise rather than poetic.

---

## 2. Why It Exists — Motivation, History & Position

**The logical pressure.** Four classical problems could not be solved by algebra and geometry alone, and each demanded the *same* missing machinery: the tangent problem (the slope of a curve at a point, where the usual "rise over run" needs two points but a tangent touches only one), the area problem (the region under a curve, where the figure has no straight edges to triangulate), the velocity problem (speed at an instant, where distance-over-time needs a time interval but an instant has zero duration), and the extremum problem (where a function is largest or smallest). Each requires evaluating a ratio or a sum in a limit where the naive computation gives $0/0$ or an infinite number of terms. No finite algebraic manipulation reaches the answer; you need a controlled passage to a limit. That is the pressure that forced calculus into existence.

**The foundational crisis.** Calculus is the paradigm case of a field whose *applications preceded its foundations by roughly 150 years*, and the gap produced a genuine rupture. Newton and Leibniz (1660s–1680s) computed with "infinitesimals" — quantities treated as nonzero while you divided by them, then discarded as zero when convenient. This is logically incoherent: a number is either zero or it is not. Bishop Berkeley's 1734 polemic *The Analyst* named the contradiction precisely, mocking discarded infinitesimals as "the ghosts of departed quantities." The mathematics worked spectacularly while resting on a definition that could not survive scrutiny. The repair took until the 1820s–1870s: Cauchy reframed everything around limits, and Weierstrass gave the limit its modern precise definition (the "epsilon-delta" formulation) that mentions no infinitesimals at all — only ordinary numbers and a challenge-response logic ("for every error tolerance, there exists a closeness guarantee"). This repair was universally accepted and is what every rigorous course now teaches. The twist: in the 1960s Abraham Robinson showed (via *non-standard analysis*) that infinitesimals *can* be made fully rigorous after all — so Berkeley's targets were vindicated three centuries late, though the epsilon-delta framework remains standard.

**What became possible.** Before calculus, "instantaneous rate" and "area under an arbitrary curve" were not computable concepts — they were barely concepts at all. After it, the entire language of physical law became available: Newton's laws, electromagnetism, fluid flow, heat diffusion, and population dynamics are all statements *in* calculus (differential equations). Without it, none can even be written down.

**Position in mathematics.** Upstream sits **real analysis**, which supplies the property calculus secretly depends on: the *completeness* of the real numbers (every bounded set of reals has a least upper bound — the real line has no gaps). This is not optional decoration; the central existence theorems (a continuous function on a closed interval attains its maximum; the Fundamental Theorem) *fail* over the rationals precisely because the rationals have gaps. Also upstream: set theory and the formal definition of *function*. Downstream lie differential equations, differential geometry, and complex analysis. Parallel sits linear algebra, which fuses with calculus to produce multivariable calculus and, later, the whole apparatus of mathematical physics.

---

## 3. Foundational Assumptions & Interpretive Choices

**Primitive concepts.** The genuinely primitive notions are: the *real number system* (imported from real analysis / set theory, not built within calculus — calculus *assumes* the reals exist with their completeness property); the *function* (imported, a set-theoretic object: a rule pairing each input with exactly one output); and the *limit* (defined *within* calculus, and the one concept the subject actually constructs). Everything else — continuity, derivative, integral, series convergence — is *defined* from the limit. The derivative is the limit of a difference quotient; the integral is the limit of a sum; continuity is a statement about limits. If you understand the limit precisely, you hold the master key; if you do not, every later definition is a black box.

**Interpretive choices that shape everything.**

- *Limit-based vs. infinitesimal-based.* Standard analysis defines the derivative as a limit (Weierstrass); non-standard analysis defines it using genuine infinitesimal numbers (Robinson). At stake concretely: the *statements* of theorems are identical, but proofs differ radically, and certain arguments (especially in measure theory and probability) become dramatically shorter with infinitesimals. Pedagogy is split: nearly all textbooks use limits, but Keisler's well-known textbook teaches first-year calculus entirely with infinitesimals. The two are provably equivalent in what they can establish, so this is a choice of *machinery*, not of *content*.

- *Pointwise vs. uniform.* When a sequence of functions approaches a limit function, "approaches" can mean *pointwise* (at each input separately) or *uniformly* (everywhere at once, at a single rate). This looks like hairsplitting and is in fact the difference between true and false theorems: the limit of continuous functions is continuous *only* under uniform convergence; under mere pointwise convergence it can fail. Most of the subtle errors in 18th-century analysis trace to conflating these. Introductory calculus hides this distinction entirely, which is why series and limits of functions feel mysterious later.

- *Riemann vs. Lebesgue integral.* The standard introductory integral (Riemann) sums vertical strips; the research-standard integral (Lebesgue) sums by output-value level sets. At stake: which functions are integrable, and whether limits and integrals can be exchanged. The Lebesgue integral integrates badly-behaved functions the Riemann integral cannot touch and makes the convergence theorems clean — which is why all of probability theory and functional analysis uses it, while first courses use Riemann for its visual directness.

---

## 3-EXT. Philosophical & Foundational Position

**A. Ontological status of the core objects.**

*Platonism* treats the real line, functions, and limits as existing independently; the value of a definite integral is a fact *discovered*, not legislated. For calculus this commits you to regarding the completed real continuum — an uncountable infinity of points — as a genuine existing object, which is a strong commitment.

*Formalism* treats these as symbol systems whose existence means consistency. Calculus inherits its consistency from analysis, which is formalized within ZFC (standard set theory); it does *not* require axioms stronger than ZFC. So a formalist is on comfortable ground here — calculus has no independent foundational worries beyond those of set theory itself.

*Intuitionism/Constructivism* admits only objects you can exhibit by construction, and this bites hard. The **Intermediate Value Theorem** in its classical form (a continuous function changing sign must hit zero somewhere) is *non-constructive*: it guarantees a root exists without giving any procedure to locate it, and constructivists reject the standard proof. The **Extreme Value Theorem** (a continuous function on a closed interval attains its maximum) similarly fails constructively. What is lost is the right to assert existence without a method; constructive analysis recovers weakened versions that produce the point to any desired accuracy.

*Structuralism* fits awkwardly. Calculus leans heavily on the *specific* completeness structure of the reals, and while "complete ordered field" is a structural characterization (the reals are the *unique* one up to isomorphism, which is a clean structuralist statement), the daily practice of computing a particular derivative feels object-focused, not role-focused. The field admits a structuralist gloss at its foundation but resists it in its texture.

**B. Logical overhead.** Calculus proper is axiom-light: it lives inside ZFC and needs nothing exotic for its standard theorems. The Axiom of Choice enters not in calculus itself but one floor up, in measure theory (the existence of non-measurable sets, hence the Banach–Tarski paradox, requires Choice). A countable, weak fragment of Choice (*dependent choice*) is quietly used in some standard analysis proofs about sequences, but the core single-variable theorems can be proved without the full Axiom of Choice. Non-standard analysis is the exception: constructing the infinitesimals requires a non-constructive object (an ultrafilter) that depends on Choice — so the infinitesimal approach buys intuition at the price of heavier logical machinery.

**C. Competing formalizations.** Yes — *standard (epsilon-delta) analysis* versus *non-standard analysis* (see §3). They are equivalent in deductive strength: any first-order statement provable in one is provable in the other (a consequence of the *transfer principle*). So neither can do something the other fundamentally cannot; they differ in expressive convenience, not power. Standard analysis dominates both research and pedagogy; non-standard analysis is a respected minority tool, sharpest in probability and certain areas of functional analysis. A second, partial split is *Riemann vs. Lebesgue integration*, which genuinely differ in expressive power — Lebesgue integrates strictly more functions.

**D. Philosophical pressure points.** First, the **completed infinity of the continuum**: calculus presupposes the real line as a finished, uncountable totality, and this was contested from Aristotle's distinction between potential and actual infinity through to the Cantor–Kronecker disputes; constructivists and finitists still regard the uncountable continuum as a fiction we reason about, not an object that exists. Second, the **status of non-constructive existence theorems** (IVT, EVT above): the controversy is not that they are counterintuitive — they are obvious — but that they assert a point *exists* while admitting no way to find it, which a substantial philosophical minority regards as asserting something without content.

---

## 4. Knowledge Topography — The Map

**Core concepts, in logical dependency order:**

1. **Real numbers & completeness** — the gap-free number line; *generates* everything, because limits need a place to land.
2. **Function** — a rule pairing each input to one output; the *object* on which all operations act.
3. **Limit** — the value a function approaches as the input approaches a target; *defined from* completeness, and the parent of every concept below.
4. **Continuity** — a function with no jumps; *defined as* the limit equalling the function's value.
5. **Derivative** — instantaneous rate of change; *defined as* the limit of the difference quotient (rise-over-run as run shrinks to zero).
6. **Rules of differentiation** — product, chain, quotient rules; *mechanize* the derivative so you never compute the limit by hand again.
7. **Mean Value Theorem** — somewhere the instantaneous rate equals the average rate; *the bridge theorem* that lets local derivative information control global behavior.
8. **Integral (definite)** — exact accumulation/area; *defined as* the limit of a sum of strips.
9. **Fundamental Theorem of Calculus** — differentiation and integration are inverse; *connects* concepts 5 and 8, the keystone of the whole edifice.
10. **Antiderivative & techniques of integration** — reversing differentiation; *the practical payoff* of concept 9.
11. **Sequences & series** — infinite sums and their convergence; *re-applies* the limit to discrete accumulation.
12. **Taylor series** — representing functions as infinite polynomials; *fuses* derivatives (5) and series (11) to approximate anything smooth.
13. **Multivariable extension** — derivatives and integrals for functions of several inputs; *generalizes* 5 and 8 by combining with linear algebra.
14. **Vector calculus** — div, grad, curl, and the higher-dimensional Fundamental Theorems (Green, Stokes, Divergence); *the multivariable echo* of concept 9.

**Where cognitive order diverges from logical order.** Completeness (1) is logically first but is genuinely understood *last* — you only see why it matters after a theorem fails without it. Standard courses correctly defer it: they teach you to *compute* limits, derivatives, and integrals for a year, then return to make the limit rigorous, because the motivation for rigor is invisible until you have felt the machinery work and wondered why. Trying to begin with epsilon-delta is the classic pedagogical error.

**Major sub-areas:** single-variable differential calculus; single-variable integral calculus; sequences and series; multivariable/vector calculus; ordinary differential equations (the immediate downstream application).

**Connections outward.** *Feeds in:* real analysis (supplies completeness and the rigorous limit) and linear algebra (supplies the framework for the multivariable derivative as a linear map). *Feeds into:* physics, via differential equations — Newton's $F=ma$ is a second-order differential equation whose solution *is* the motion; and probability, via the Lebesgue integral — a continuous random variable's expectation is an integral. The single transfer example each way: the **Fundamental Theorem of Calculus** generalizes outward into **Stokes' theorem**, which is the engine behind Maxwell's equations of electromagnetism.

---

## 5. Learning Trajectory

**Prerequisites — including the quiet ones.** The *logical* prerequisite is fluent algebra and the function concept; without these, proofs and even computations break. The *maturity* prerequisites are the ones that quietly wound you later. First, **trigonometry as a source of functions, not triangles** — students who know trig only as triangle-solving are blindsided when sine and cosine appear as the canonical oscillating functions whose derivatives cycle. Second, **comfort with inequalities and absolute value as distance** — the entire rigorous theory is phrased in inequalities ("$|f(x)-L|$ is small"), and students fluent only in equation-solving find the limit definition alien not because it is hard but because they have never reasoned with inequalities. Third, **algebraic stamina**: many calculus errors are not calculus errors but collapsed algebra three lines deep.

**Recommended order and its reasons.** Limits → continuity → derivatives → applications of derivatives → integrals → Fundamental Theorem → techniques of integration → sequences/series → multivariable. Each precedes the next by necessity: continuity is *defined* via limits; the derivative *is* a limit; the integral is a *different* limit; the Fundamental Theorem cannot be stated until both derivative and integral exist; series need the limit concept matured; multivariable needs single-variable plus linear algebra. The one place logical and cognitive order diverge sharply is the **epsilon-delta limit**: logically it belongs first, cognitively it belongs *after* a year of computation. Recommendation: learn to compute limits intuitively now, and postpone the rigorous definition until you have a reason to want it.

**Taught early but better deferred:** the formal epsilon-delta definition (deferred for the reason above); and exhaustive *integration-technique drilling* (trig substitution, partial fractions ad nauseam) — most are now done by software, and grinding them early buys mechanical skill at the cost of conceptual time better spent on the Fundamental Theorem's meaning.

**Deferred but better front-loaded:** the **Fundamental Theorem of Calculus as the organizing idea** — many courses treat it as a late, technical result, but knowing from day one that differentiation and integration are inverses gives every earlier topic its purpose. Also, **a rough early exposure to differential equations** — seeing that the whole point is to model change motivates the derivative far better than abstract slope problems.

**Realistic effort.** For a serious self-learner with the prerequisites: roughly **80–120 hours** to introductory computational fluency (single-variable, comfortable solving standard problems); roughly **300–500 hours** to genuine command (multivariable, series, the rigorous limit, and the ability to read why theorems are true rather than only apply them).

---

## 6. The Outsider's QA Sheet

**Q1. [DEF] Why is the derivative defined as a limit rather than just "the slope at a point"?**
A point has no slope — slope is a property of a line through two points, and a single point gives you $0/0$. The limit is the only way to assign a slope to a single point: take the slope through the point and a neighbor, then watch what that slope approaches as the neighbor slides in. The limit *defines* the otherwise undefined object.

**Q2. [DEF] Why does continuity get defined through limits instead of "you can draw it without lifting your pen"?**
The pen criterion is a picture, not a definition, and it fails for functions too wild to draw. The limit definition (the function's value equals the limit of its nearby values) is precise and handles functions no hand can sketch. It also rules out exactly the right pathologies: jumps, holes, and blow-ups all violate it.

**Q3. [NOT] Why are there so many notations for the derivative ($f'$, $dy/dx$, $\dot{y}$)?**
They encode different emphases and lineages. $dy/dx$ (Leibniz) treats the derivative as a ratio of small changes and is unbeatable for the chain rule and for physics, where units matter ($dy/dx$ shows them). $f'$ (Lagrange) treats differentiation as an operation on a function and is cleaner for stating theorems. $\dot{y}$ (Newton) means specifically *rate with respect to time* and survives in physics and engineering. The notation tells you who is speaking and what they care about.

**Q4. [NOT] Why does $dx$ persist in the integral sign if infinitesimals were banished?**
It is a *fossil* of Leibniz's infinitesimal-sum picture, retained because it works and labels the variable of integration. In the rigorous theory $\int f\,dx$ is a single indivisible symbol for a limit of sums, not a product of $f$ and a quantity $dx$ — but the notation deliberately *looks* like the old sum so the intuition transfers, even though the foundations underneath were rebuilt.

**Q5. [NAÏVE] Is $0.999\ldots$ really equal to $1$, or just very close?**
Exactly equal. The repeating decimal *is* a limit — the limit of $0.9, 0.99, 0.999, \ldots$ — and that limit is exactly $1$. The discomfort comes from imagining the decimal as a process that never finishes; but the notation denotes the completed limit, not the process, and the completed value is $1$ with no gap remaining. This single example is calculus in miniature.

**Q6. [NAÏVE] If the derivative involves dividing by something that becomes zero, why isn't it always $0/0$?**
Because you simplify *before* taking the limit. The difference quotient algebraically cancels the shrinking quantity from numerator and denominator while it is still nonzero, leaving an expression with a perfectly finite limit. You never actually divide by zero — you divide by something small, simplify, and *then* let it vanish. The whole art of the limit is to do the dangerous division and the vanishing in the right order.

**Q7. [NOT-THIS] What is calculus *not* — how does it differ from "analysis"?**
Calculus is the computational and intuitive layer: you learn to *find* derivatives and integrals and apply them. Real analysis is the rigorous foundation: you *prove* that the limits exist and that the theorems hold, building everything from the completeness of the reals. Calculus uses the Fundamental Theorem; analysis proves it and finds the exact hypotheses under which it can fail. Same territory, opposite direction.

**Q8. [NOT-THIS] Isn't calculus just the same as differential equations?**
No. Calculus gives you the *operations* (differentiation, integration). Differential equations is the downstream subject of *solving for an unknown function* given a relationship among its derivatives — a far harder and largely separate enterprise. Calculus is the alphabet; differential equations is using it to model and solve the dynamics of the physical world.

**Q9. [PROGRESS] What does a calculus researcher even do — isn't it all 300 years old?**
Nobody researches single-variable calculus; it is closed. "Research in calculus" means its living descendants: partial differential equations (existence, smoothness, and behavior of solutions — one of these, Navier–Stokes regularity, is a million-dollar open problem), numerical analysis (computing these limits accurately on machines), and the calculus of variations. The elementary subject is settled; its frontier moved downstream.

**Q10. [WHY-HARD] Why did it take 150 years to make calculus rigorous when it worked the whole time?**
Because the working version relied on infinitesimals, which are logically incoherent under the number concept available at the time, and *nobody had the limit concept* to replace them. The repair required first inventing a precise notion of "approaches" (Cauchy, then Weierstrass's epsilon-delta) and, underneath that, a precise construction of the real numbers themselves (Dedekind, Cantor). You could not make calculus rigorous until you had rigorously built the number line it stands on — and that machinery simply did not exist yet.

**Q11. [WHY-HARD] Why is the limit of continuous functions not always continuous?**
Because "the functions get close to a limit function" can be true *at each point separately* while the closeness happens at wildly different rates across points — and a continuity-destroying kink can sneak through in the limit. This is the pointwise-versus-uniform distinction: only when the approach is uniform (one rate everywhere) does continuity survive. The 18th century missed this and proved false theorems; pinning it down was a major motivation for rigor.

**Q12. [BRIDGE] How is integration connected to probability?**
A continuous probability distribution is described by a density function, and the probability of landing in a range is the *integral* of that density over the range — area under the curve equals probability. Expected value is an integral; variance is an integral. Once distributions become continuous, probability theory is *written in* integral calculus, and its rigorous version uses the Lebesgue integral specifically.

**Q13. [BRIDGE] What do practitioners see between the Fundamental Theorem and the great theorems of physics?**
That they are the same theorem in different dimensions. The Fundamental Theorem says integrating a derivative over an interval gives the difference of values at the endpoints — the interior is controlled by the boundary. Green's, the Divergence, and Stokes' theorems say exactly this in two and three dimensions, and Maxwell's equations are statements in that language. Working physicists see "boundary controls interior" as one idea; textbooks present four separate theorems.

**Q14. [META] Should beginners learn limits rigorously first, or compute first and rigorize later?**
Genuine disagreement. The "rigor first" camp (common in honors and European traditions) argues that computing without understanding the limit builds bad habits and mystifies everything. The "compute first" camp (dominant in US calculus) argues that epsilon-delta is unmotivated and demoralizing before students have seen what it is *for*, and that intuition must precede formalism. Most large courses choose compute-first; most proof-based programs revisit with rigor afterward.

**Q15. [META] Riemann or Lebesgue integral — why do courses teach the one researchers don't use?**
The Riemann integral (vertical strips) is visual and needs no measure theory, so it is teachable to beginners; the Lebesgue integral (grouping by output value) requires building a theory of "size" of sets first. Researchers use Lebesgue because its convergence theorems are clean and it integrates functions Riemann cannot. The pedagogical bet is that visual intuition must come before the more powerful but more abstract tool — a bet some reformers contest.

**Q16. [HIST] Why does the modern definition of the limit mention no infinitely small quantities at all?**
Because it was built specifically to *exclude* them. Berkeley's 1734 attack showed infinitesimals to be incoherent, and Weierstrass's epsilon-delta definition was engineered to capture "approaches" using only ordinary numbers and quantified inequalities — no infinitely small anything. The conspicuous *absence* of infinitesimals in the standard definition is a direct scar from that crisis; the definition is shaped by what it was designed to avoid.

**Q17. [HIST] Why is the Mean Value Theorem treated as a big deal when it looks obvious?**
Because it is the precise tool that converts the crisis-era hand-waving ("the function rises, so somewhere it rises at the average rate") into a provable statement, and almost every rigorous result about derivatives (that a zero derivative means constant, that the sign of the derivative controls increase) is *proved through it*. It looks obvious for the same reason the IVT does — but making the obvious provable was the entire post-Berkeley project, and the MVT is where that work is concentrated.

**Q18. [PHIL] In what sense does the area under a curve "exist" before we compute it?**
This is the constructive-versus-classical fault line made concrete. The classical view: the area is a definite real number that exists whether or not we ever evaluate the integral. The constructive view: it exists only insofar as we can produce a procedure approximating it to any accuracy — which, for nice functions, we can, so here the camps mostly agree. The disagreement sharpens for the existence theorems (Q19) where no such procedure is guaranteed.

**Q19. [PHIL] When the Intermediate Value Theorem says a root "exists," what kind of existence is that?**
Pure classical existence with no construction attached: the theorem guarantees a crossing point but its standard proof gives no way to find it. Constructivists reject this as asserting existence without content and replace it with a weaker theorem that locates the root to any desired precision. So even this most intuitive of theorems sits on contested philosophical ground — its truth depends on which logic you accept.

**Q20. [DEF] Why define the integral as a limit of sums rather than just "the area"?**
Because "area" is only defined for simple shapes (rectangles, triangles) — a region with a curved top has no prior definition of area at all. The limit of sums of rectangles *defines* what area under a curve even means; it does not compute a pre-existing quantity, it constructs the concept. This is why the integral's definition looks like a procedure: the procedure is the definition.

**Q21. [NAÏVE] Why can some infinite sums have a finite total?**
Because the terms can shrink fast enough that the *running total* approaches a ceiling it never exceeds — and that ceiling, a limit, is the sum. $1/2 + 1/4 + 1/8 + \cdots = 1$ because each step covers half the remaining gap to $1$. "Infinite sum" denotes the limit of the partial sums, not an endless act of addition, and limits can be finite even when the process behind them never stops.

**Q22. [NOT] Why do mathematicians write $\lim_{x\to a}$ with an arrow instead of just plugging in $x=a$?**
Because the entire point is the behavior *near* $a$ without ever using the value *at* $a$ — and often the function is undefined exactly at $a$ (the difference quotient is $0/0$ there). The arrow notation insists you approach but never arrive, which is precisely what lets the limit extract information a direct substitution would destroy.

**Q23. [PROGRESS] What is genuinely settled versus open in this whole area?**
Settled: all of single- and multivariable calculus, the foundations, the existence and properties of the standard limits and integrals — none of this is in doubt. Open: the deep behavior of the differential equations calculus produces, especially nonlinear partial differential equations (fluid flow's Navier–Stokes existence-and-smoothness problem remains unsolved). The tools are finished; what you can *do* with them is not.

**Q24. [BRIDGE] How does linear algebra secretly run multivariable calculus?**
The multivariable derivative is not a number or a slope — it is the *best linear approximation* to the function at a point, which is a matrix (the Jacobian) and hence a linear-algebra object. Differentiation in many dimensions *is* finding the linear map that locally mimics the function. Practitioners see multivariable calculus as linear algebra applied pointwise; textbooks often obscure this by leading with partial derivatives instead.

**Q25. [WHY-HARD] Why is "instantaneous velocity" not a contradiction in terms?**
Because velocity at an instant is defined as a limit, not as distance divided by an elapsed time of zero (which is meaningless). You take average velocity over shrinking intervals and ask what value those averages approach; that limit is the instantaneous velocity. The phrase sounds paradoxical only if you insist on the elementary-school formula; the limit dissolves the paradox by replacing division-by-zero with a controlled approach.