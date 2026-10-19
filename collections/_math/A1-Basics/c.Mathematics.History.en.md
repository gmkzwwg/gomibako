---
title: "A History of Mathematical Ideas"
categories: Chron
subclass: Basics
---

# A History of Mathematical Ideas

## Ancient Civilizations: Counting, Measurement, and Procedures of Calculation (c. 3000–600 BCE)

Long before mathematics became a subject organized around definitions and theorems, people faced problems that required more than counting visible objects. Grain had to be measured, land assessed, labor allocated, and obligations recorded. A result needed to survive beyond the moment of calculation: someone else might have to inspect it, repeat it, or use it to make another decision.

These demands encouraged the development of representations and procedures. Written numbers made quantities available for manipulation. Measures connected those numbers to things. Tables preserved useful results, while worked problems taught people how to obtain new ones. Much of our detailed evidence comes from particular periods within this long span, especially Old Babylonian Mesopotamia in the early second millennium BCE and Egyptian mathematical manuscripts from roughly the same broad era. Their surviving mathematics reveals several ways of turning practical questions into objects of sustained reasoning.

### 1. Mathematics Embedded in Practical Activity

How could an administrator compare two deliveries of grain if they had been measured in different containers? Counting the containers would not settle the matter. Their capacities had to be related to an agreed unit. Only then could the deliveries enter the same account.

Measurement therefore involved a conceptual step as well as a practical one. A quantity had to be separated, for purposes of calculation, from the particular object that carried it. Different fields could be compared by area; different deliveries by volume or weight. Once expressed in compatible units, they could be added, divided, or checked against an obligation. The establishment and coordination of measures helped make such operations dependable.

Writing extended this process. A record of what had been received could be compared with a record of what was owed. A quantity could be carried from one calculation to another without being physically present. In Mesopotamia, numerical and metrological notations developed alongside early writing in the late fourth millennium BCE. Over the following centuries, administrative and educational practices encouraged increasingly systematic relations among units and methods of calculation.

The organization of knowledge mattered here. If a calculation remained an individual accomplishment, every successor had to rediscover how to perform it. If it could be expressed as a sequence of steps, the method could travel. A table of conversions or a worked exercise stored part of the expertise needed to solve a problem. Scribes learned to recognize quantities, transform their representations, and return an answer in an appropriate form.

But converting an activity into numbers did not remove every difficulty. A field might have an irregular boundary. A labor estimate might assume that workers could excavate a certain volume each day, although soil conditions varied. The arithmetic could be correct while the estimate remained approximate. The distinction between the exact manipulation of a numerical representation and its imperfect fit to a physical situation was already present, even without a general theory of measurement error.

This helps explain why practical mathematics could be both powerful and selective. It isolated relationships that were useful for a task, while leaving other features aside. A successful procedure for assessing a nearly rectangular field did not necessarily become an exact rule for every quadrilateral. Its value depended partly on knowing when its assumptions were acceptable.

The resulting knowledge was also capable of moving beyond immediate administrative needs. Once a procedure could be taught, its conditions could be varied. An unknown area might replace a known one; a total and a difference might be supplied instead of the original quantities. The same institutions that demanded reliable accounts could provide a setting in which calculations became problems worth exploring in their own right.

### 2. Mesopotamia: Place Value and Calculation by Tables

The Babylonian place-value system made a large range of quantities accessible through a compact notation. It used powers of sixty: moving one place changed the value of a numeral by a factor of sixty. In this respect, it shared the central principle of our decimal system, although its base and the formation of its individual numerals were different.

For modern readers, the notation requires an important qualification. Scholars commonly write a semicolon between the integer and fractional parts of a sexagesimal number, and commas between successive places. In that modern transcription,

$$
1;30 = 1+\frac{30}{60}=\frac{3}{2},
$$

whereas $1,30$ means $1\times60+30=90$. The semicolon was not a Babylonian decimal point. Old Babylonian computational notation generally left the absolute scale to be recovered from context. A sequence of signs could have values differing by powers of sixty, and quantities had to be interpreted through the problem, its measures, and the calculator's sense of their expected size.

This relative notation was useful as well as demanding. The same numerical pattern could participate in calculations at different scales. But converting between measured quantities and computational numbers required expertise. Metrological tables helped connect units of length, area, capacity, and weight with the numbers used in calculation.

How did a scribe divide when division was less convenient than multiplication? A central method was to look up the reciprocal of the divisor and multiply by it. To divide by 8, for example, one could multiply by

$$
\frac{1}{8}=0;7,30
=\frac{7}{60}+\frac{30}{60^2}.
$$

Multiplication tables and reciprocal tables thus formed parts of a common working system. Instead of repeatedly constructing a division from the beginning, a calculator could rely on results learned or recorded in advance. Tables of squares and other useful values extended this repertoire.

The base imposed a particular boundary. Sixty contains the prime factors 2, 3, and 5. Consequently, a fraction in lowest terms has a finite sexagesimal expression precisely when its denominator contains no other prime factors. This is a modern explanation of the pattern behind the so-called regular numbers that figured prominently in reciprocal tables. Their reciprocals could be expressed exactly in a finite number of places.

Seven posed a different problem. In modern transcription,

$$
\frac{1}{7}=0;8,34,17,8,34,17,\ldots
$$

The digits repeat. No finite entry of this form gives the exact reciprocal. A scribe facing such a divisor might use an approximation or exploit the particular structure of the problem instead of relying on an ordinary finite reciprocal-table entry. The choice of convenient numbers in exercises was therefore mathematically significant: it could make a procedure manageable or expose its limitations.

The difficulty was not peculiar to an ancient system. Decimal notation cannot express one-third in finitely many places. What mattered was how a notation distributed convenience and difficulty, and what resources its users developed around it. Babylonian place value and tables made sophisticated calculation possible, but they did not eliminate the need to judge scale, choose a method, or recognize when a result was approximate.

### 3. From Manipulating Areas to Finding Unknown Quantities

Tables could supply a reciprocal or a square root, but they could not by themselves tell a calculator which quantity to divide or which square root to take. More difficult problems required a transformation before a familiar operation became useful.

Suppose a rectangle has area 12, and its length exceeds its width by 1. What are its dimensions? These simple numbers are chosen here to illustrate a type of reasoning found in Old Babylonian problem texts, rather than to reproduce one particular tablet.

A modern algebraic treatment would call the width $x$ and write

$$
x(x+1)=12.
$$

That equation is a convenient summary, but it hides the physical meaning of the transformation. Imagine instead separating the rectangle into a square and an extra strip. The square has the unknown width as its side. The remaining strip has that same length and is 1 unit wide.

Cut the strip lengthwise into two strips, each half a unit wide. Place one along the top of the square and the other along its right side. Together they almost form a larger square. What is missing is a small corner, half a unit by half a unit. Adding that corner contributes an area of $1/4$.

The completed square therefore has area

$$
12+\frac14=\frac{49}{4}.
$$

Its side is $7/2$, or three and a half. Since the added strips extended the original side by one-half, the original square's side was 3. The rectangle consequently had width 3 and length 4. Multiplying the dimensions checks the area; subtracting them checks the difference.

The important idea is the rearrangement. A rectangle whose dimensions are unknown has been converted into a square whose area is known. The problem can now be finished by extracting a square root and making a subtraction. In modern notation, this is completing the square:

$$
x^2+x+\frac14=\left(x+\frac12\right)^2.
$$

The geometric operations explain why that extra quarter appears. It is the area of a missing corner, not an arbitrary correction introduced to make a formula work.

How close is this to algebra? It manipulates unknown quantities and uses transformations that can apply to a class of problems. Yet the expression above is ours. The original texts did not employ the modern equation or a general letter standing for any real number. Historians reconstruct their reasoning from the operations and vocabulary of the procedures; a modern diagram can make those relations visible without claiming that every surviving tablet contains such a drawing.

The difference affects what counts as an answer. The modern equation $x^2+x=12$ also has the root $x=-4$. A negative width has no place in this rectangle problem. A method concerned with positive lengths can determine the required dimensions without producing a general theory of positive, negative, and complex roots. Its success and its limits arise from the objects it treats.

Nor did solving one quadratic pattern produce a universal procedure for every problem. More elaborate texts required ingenuity in reducing an unfamiliar configuration to a familiar one. The calculator needed a repertoire of transformations and a way to choose among them. If the required square root was not available as a convenient finite number, further numerical difficulties could remain after the geometric transformation had succeeded.

These procedures nevertheless contain more than a list of answers. The same rearrangement works when the numerical area changes, and halving a different excess produces a correspondingly different corner. Generality can reside in an operation that is repeatable across cases. A formula expresses that generality compactly, but is not the only form in which it can be understood.

### 4. Egypt: Doubling, Unit Fractions, and Proportional Reasoning

Egyptian arithmetic developed a different combination of notation and procedures. Its familiar written numerals used decimal groupings, but their operation did not depend on positional value in the Babylonian manner. Multiplication could instead be organized through doubling and addition.

To see the method, take the illustrative calculation $13\times17$. Construct successive doubles:

| Number of seventeens | Total |
| --- | ---: |
| 1 | 17 |
| 2 | 34 |
| 4 | 68 |
| 8 | 136 |

Since $13=8+4+1$, select the corresponding totals:

$$
13\times17=136+68+17=221.
$$

Each new row comes from the previous one by doubling, and the final answer comes from addition. In modern terms, the procedure is justified by decomposing the multiplier into powers of two and using the distributive law. The written calculation itself can demonstrate the operation without first stating either principle in that abstract form. Egyptian calculators also used useful multiples such as ten; their arithmetic was not confined to an inflexible doubling routine.

Division could be approached by reversing the search. Which multiples and fractional parts of the divisor add up to the required total? This made fractions integral to the procedure rather than a separate complication added after whole-number arithmetic.

Egyptian scribes commonly expressed fractional quantities as sums of unit fractions, each with numerator 1, while also using special expressions for certain fractions, notably two-thirds. The practice gave a different form to a familiar question: how should a quantity be divided into equal shares?

For a simple illustration, imagine sharing two loaves among seven people. Give each person a quarter of a loaf. This uses seven quarters and leaves one quarter. Dividing the remaining quarter equally among the seven adds one twenty-eighth to each share. Thus

$$
\frac27=\frac14+\frac1{28}.
$$

The decomposition has a direct interpretation as a distribution. However, it is not unique: $2/7$ can also be written as $1/7+1/14+1/21+1/42$. A useful representation must do more than express the right value. It should fit the operations, tables, or divisions one wants to perform. Finding and combining suitable decompositions could become cumbersome, especially when several fractional calculations were chained together. Tables reduced this burden, including the table of decompositions of fractions of the form $2/n$ in the Rhind Mathematical Papyrus.

That manuscript also shows how proportional reasoning could find an unknown quantity. Copied by the scribe Ahmose in the seventeenth century BCE, it preserves a problem conventionally numbered 24: a quantity together with one-seventh of itself makes 19. What is the quantity?

Choosing 7 as a trial makes the fractional part easy to calculate. Seven plus its seventh gives 8. The trial is too small, but its failure is informative: the entire result must be scaled from 8 to 19. The required factor is

$$
\frac{19}{8}=2+\frac14+\frac18.
$$

Multiplying the trial quantity by that factor gives

$$
7\left(2+\frac14+\frac18\right)
=16+\frac12+\frac18.
$$

One-seventh of this answer is $2+1/4+1/8$. Adding it back produces 19, confirming the result. This procedure is commonly called single false position: choose a convenient provisional value, work out its consequence, then correct the value by a proportional adjustment.

Why should one correction be enough? The answer lies in the structure of the problem. Multiplying the quantity by a factor multiplies both the quantity and its seventh by that same factor. Their total changes proportionally. The trial is therefore a way to measure the relation, not merely a guess followed by another guess.

That reasoning has a boundary. If a problem asked for a quantity plus a fixed seven to make 19, scaling the trial quantity would not scale the fixed seven. The same proportional correction would fail. Recognizing which parts of a problem vary together is essential to using the procedure correctly.

Egyptian computation thus joined numerical skill to structural judgment. Doubling required the selection of appropriate multiples; fractional calculation required a useful decomposition; false position required a relation that supported scaling. These methods could explain and check a particular answer, but the surviving written solutions do not always state the full range of problems for which a procedure is valid. Part of that understanding may have belonged to the practice of teaching and calculation around the text.

### 5. Practice and Reasoning Had No Fixed Boundary

A problem may mention grain, fields, or bread without having been copied from an actual transaction. Its numbers can be selected to make a calculation convenient, its conditions altered to create a puzzle, or its unknowns arranged to exercise a particular technique. Practical language does not by itself establish practical purpose.

Old Babylonian scribal education offers an unusually detailed setting in which to examine this distinction. Tablets from the building known to excavators as House F at Nippur, an eighteenth-century BCE scribal school, preserve evidence of work with measures, tables, arithmetic, and written language. Studying the tablets together with their archaeological setting allows historians to investigate a particular learning environment rather than treating every tablet as an isolated mathematical achievement.

A student learning a reciprocal table was acquiring a tool for future calculations. A student adapting a procedure to a new problem had to do more: identify the relevant relationship and recognize which operations preserved it. Exercises could develop this competence beyond the immediate demands of accounting. The resulting knowledge remained connected to the scribal profession while also becoming a field for intellectual exploration.

What, then, would have made an answer convincing? A reverse calculation could check that the result met the stated conditions. A rearrangement of areas could show how an unfamiliar shape became a familiar one. A proportional argument could explain why a chosen trial could be scaled into a solution. These forms of justification do different work. Substitution verifies one proposed answer; an explanation of why a transformation preserves the relevant relationship can support a whole method.

The surviving texts do not always separate these roles as a modern textbook would. An instruction can carry an explanation through its choice of operations, particularly for a reader trained in the practice. Conversely, the existence of a correct procedure does not authorize us to attribute to its author every general theorem that a modern mathematician can use to justify it. The historical task is to recover what the evidence supports about both the operation and its understanding.

The evidence is uneven. Clay tablets can survive in circumstances that destroy papyrus. Much Egyptian writing from everyday settlements was lost to damp and continued occupation, while material preserved in dry locations is disproportionately visible. A culture with fewer surviving worked problems may therefore appear mathematically poorer than another partly because its writing materials and archaeological circumstances differed.

Nor does a brief written solution tell us everything that happened in instruction. An explanation spoken by a teacher, a gesture over a diagram, or a temporary calculation may leave no surviving trace. Such possibilities identify a limit to our knowledge; they do not license the invention of missing proofs. The absence of an explicit argument is evidence about the document, but only part of the evidence about the mathematical activity that produced it.

Across these traditions, quantities became things that could be represented, transformed, and related even when the original objects were absent. Tables made numerical results reusable. Rearrangements turned difficult questions into manageable ones. Trial calculations exposed proportions. Schools helped preserve these techniques and extend them into new problems. Each achievement also raised a further question: how far does the procedure reach, and what makes its extension trustworthy? The history of mathematical reasoning was already taking shape inside the effort to answer that question.

## Ancient Greece and Early China: Proof, Geometry, and Algorithms (Sixth Century BCE–Third Century CE)

A calculation can produce the right answer without explaining why its method should work again. Conversely, a convincing account of one construction may leave open how it belongs to a larger body of knowledge. During this period, mathematicians developed increasingly ambitious ways of addressing both problems. Greek works organized relationships among numbers and magnitudes into chains of demonstration. Chinese texts assembled procedures for broad classes of problems, while commentators investigated the reasons those procedures worked.

Neither tradition was uniform. Greek surveyors and astronomers continued to calculate, and Chinese mathematical writing contained much more than instructions for practical business. The comparison concerns different ways of organizing knowledge, not a division between a civilization that reasoned and another that merely computed. Their achievements also reveal recurring difficulties: how to reason about quantities that cannot be measured by integers, how to justify a construction suggested by a diagram, and how to turn a successful technique into an explanation of an entire class of cases.

### 1. Numbers and the Order of Nature (Sixth–Fourth Centuries BCE)

Why should an arrangement of numbers tell us anything about the world? Musical relationships offered an especially persuasive example. Under suitable comparable conditions, the lengths of vibrating strings associated with an octave stand in the ratio 2:1; other important consonances are associated with ratios such as 3:2 and 4:3. A difference perceived by the ear could be related to a simple numerical relationship.

Such associations became central to the Pythagorean tradition. Numbers seemed to reveal order beneath sensory variety. But the history is harder to reconstruct than the familiar image of Pythagoras discovering mathematical harmony suggests. Much of the evidence comes from later writers, and the contributions of Pythagoras himself cannot always be separated from those of his followers or from subsequent legend. The secure historical point is the importance that numerical relationships acquired within this intellectual tradition, rather than a complete record of discoveries by one founder.

The appeal of numerical order raised another question: what exactly is the object of mathematical knowledge? A drawn line has thickness and irregularities. A measured ratio is limited by the precision of instruments. Yet a geometrical statement appears to claim something exact. Plato gave this distinction philosophical force. Mathematical reasoning could turn attention from imperfect visible instances toward intelligible objects and relationships. The drawing assisted thought, but the claim concerned more than the particular marks on the surface.

Aristotle approached mathematical objects through a different philosophical account, examining how properties could be considered apart from other features of things. He also analyzed demonstration: a conclusion follows from premises, but a science cannot prove every premise by appealing to a still earlier proof. Definitions, starting assumptions, and inferential connections therefore require different treatment.

These discussions helped articulate the ambition of mathematical knowledge. They did not supply a ready-made procedure for finding every theorem. A geometrical discovery might depend on an ingenious auxiliary line; a proof might require a proportion theory that did not yet exist. Nor did all Greek mathematics pursue philosophical certainty. Measurement, finance, engineering, and astronomical prediction continued to impose demands of their own.

The productive tension was between the exactness sought in mathematical reasoning and the uncertain route by which it was obtained. The conviction that the world exhibited numerical order could inspire investigation, but it also made the limits of integer ratios especially consequential.

### 2. Incommensurability: When Integer Ratios Are Not Enough

Two lengths are commensurable if some smaller length measures each of them an exact whole number of times. If one length contains five copies of a common measure and another contains seven, their ratio can be expressed as 5:7. Choosing a finer unit might seem to make this possible for any pair of lengths.

The side and diagonal of a square defeat that expectation. The problem is not that the required unit is difficult to find. No common measure exists.

A modern form of the argument makes the obstruction precise. Take the side of the square as one unit. The relation between the squares on the sides of a right triangle gives a diagonal of length $\sqrt{2}$. Suppose that this length could be written as $p/q$, where $p$ and $q$ are positive integers with no common factor. Squaring gives

$$
p^2=2q^2.
$$

Thus $p^2$ is even. An odd integer has an odd square, so $p$ must be even; write $p=2r$. Substitution then yields

$$
4r^2=2q^2,\qquad q^2=2r^2.
$$

The same reasoning makes $q$ even. Both integers are therefore divisible by two, contradicting the assumption that the fraction had been reduced. The starting supposition must be rejected.

Notice what this establishes. Measuring the diagonal more accurately could produce better fractional approximations, but it could never establish the exact integer ratio being sought. The proof excludes every such ratio at once. A seemingly practical problem of finding a sufficiently fine unit has become a structural claim about what is impossible.

For Greek mathematics, this sharpened the distinction between numbers and magnitudes. Number theory dealt with units and their integer collections; geometry dealt with lengths, areas, and volumes. A line segment could be a perfectly legitimate geometrical object even when its relation to another segment could not be expressed by a ratio of integers. The response need not be to deny the segment's existence or to treat its length as an arithmetic error. It could instead be to develop a theory of magnitudes that accommodated it.

Accounts of a sudden crisis, followed by the punishment or drowning of the discoverer, are much less secure than the mathematical result. The chronology and attribution of the earliest discoveries remain uncertain, and later stories should not be treated as a record of the reactions of all Greek mathematicians. What can be identified clearly is the conceptual difficulty: methods justified only for commensurable quantities did not automatically apply to all geometrical magnitudes. A broader account of proportion was needed.

### 3. Eudoxus: Proportion and Exhaustion (Fourth Century BCE)

How can two ratios be equal if neither can first be written as a fraction? The theory traditionally associated with Eudoxus, preserved in Book V of Euclid's *Elements*, answered by comparing multiples rather than assigning a numerical value to each ratio.

Here is the central idea in modern symbols. Let $A$ and $B$ be magnitudes of one kind, and $C$ and $D$ magnitudes of a compatible kind within their own pair. To say that $A:B$ and $C:D$ are the same ratio, compare $mA$ with $nB$ for any positive integers $m,n$. Whenever the first exceeds, equals, or falls short of the second, $mC$ must have the corresponding relation to $nD$.

This definition can operate without a common measuring unit for $A$ and $B$. It also allows ratios between lengths to be compared with ratios between areas: lengths are compared with lengths, and areas with areas. It avoids asking whether an area itself is greater than a length.

Its strength lies in the requirement that the comparisons agree for every pair of multiples. A few successful numerical checks would not establish equality of ratios. A proof must show why the pattern of agreement persists. This gives proportion a generality that an account restricted to integer ratios cannot provide.

A related challenge arose when comparing curved figures with rectilinear ones. The area of a circle is not itself a polygon, but polygons can be constructed inside it. Increasing the number of sides reduces the uncovered portion. What turns this useful approximation into a proof of an exact relation?

The decisive requirement is control of the remainder. If a construction repeatedly removes more than half of what remains, then after sufficiently many steps the remainder becomes smaller than any previously specified positive magnitude. The argument needs only a suitable finite number of steps for each proposed bound. It does not require the process literally to finish with a polygon identical to the circle.

This makes a contradiction argument possible. Suppose a proposed area differs from the actual area by some positive amount. Construct an approximation fine enough that its remaining uncertainty is smaller than that supposed difference. If the established comparisons then conflict with the supposition, that alternative is excluded. An exact conclusion can be obtained through finite constructions controlled by an arbitrary bound.

Later writers called this an exhaustion method. The name can mislead if it suggests physically filling every last gap. Its rigor came from making any alleged gap too small to sustain a contrary assumption. It provided a powerful method of demonstration, but often required the target relation to be known or conjectured beforehand. A theory that could prove a proposed area was not yet a general algorithm for discovering the area of any curve.

### 4. Euclid's Elements: Organizing What a Proof Depends On (c. 300 BCE)

A collection of correct propositions leaves a further problem: which results depend on which others, and where should the reasoning begin? Euclid's *Elements* made this organization central. Definitions introduced objects and relations; postulates and common notions supplied starting points; propositions were developed through constructions and demonstrations using earlier material.

The first proposition illustrates the arrangement. Given a segment $AB$, construct an equilateral triangle on it. Draw a circle with center $A$ and radius $AB$, then another with center $B$ and radius $BA$. Let an intersection be $C$, and join $A$ to $C$ and $B$ to $C$.

Why are the sides equal? Because $AC$ and $AB$ are radii of the first circle, they are equal. Because $BC$ and $BA$ are radii of the second, they too are equal. Quantities equal to the same quantity are equal to one another, so all three sides of the triangle are equal. The proof obtains exact equality from definitions and accepted relations, rather than from measuring three lines on a drawing.

But the construction also exposes an assumption. Why must the two circles intersect? The picture makes the intersection compelling, yet the initial postulates do not explicitly supply all the continuity and intersection principles a modern formal treatment would require. The example shows both the power of Euclid's organization and the distance between it and a fully formalized modern system. Diagrams helped carry information about position and incidence that was not always stated as a separate premise.

The fifth postulate presented a more conspicuous difficulty. It concerns two lines crossed by a third: if the interior angles on one side total less than two right angles, the two lines meet on that side when extended. Compared with drawing a line or a circle, this reaches toward behavior beyond the visible portion of the diagram. Could it be proved from the other assumptions instead of accepted independently? Efforts to do so would continue for centuries.

The *Elements* also extended far beyond elementary constructions. Its books treated number theory, proportion, incommensurable magnitudes, and solid geometry. Its achievement lay partly in making a large network of results available as an organized basis for further work. Later mathematicians could use an established proposition without recreating its proof on every occasion.

Such an organization also conceals much of the path to discovery. The polished proof rarely tells us which unsuccessful construction preceded the successful one, or why a mathematician first suspected the theorem. The logical order of a finished exposition is therefore not a diary of mathematical invention. That distinction becomes particularly visible in Archimedes.

### 5. Archimedes: Finding a Result and Demonstrating It (Third Century BCE)

How can one prove the area of a curved region when ordinary dissection produces straight-edged pieces? Archimedes attacked such questions with both inventive comparisons and tightly controlled demonstrations. In the work known as the *Method*, he used mechanical reasoning, including balances and comparisons of sections, to investigate geometrical quantities. He distinguished this route to finding results from the geometrical proofs they required.

The role of mechanics was conceptual as well as physical. A balance relates quantities through their distances from a fulcrum. By arranging corresponding sections at suitable distances, Archimedes could compare an unfamiliar figure with figures whose measures were known. This could suggest the total relation. But passing from relationships among sections to a conclusion about the entire figure needed justification; the discovery procedure did not by itself settle every question raised by the passage.

His quadrature of a parabolic segment shows how a suspected result could receive a different kind of proof. A parabolic segment is the region enclosed by an arc of a parabola and a straight chord. Archimedes inscribed a triangle whose base was that chord and whose opposite vertex was the point on the arc where the tangent ran parallel to the chord. Call the triangle's area $T$.

Two smaller parabolic segments remain. Construct the corresponding triangle inside each of them. Using properties of the parabola, Archimedes showed that each new triangle has one-eighth the area of the original triangle; together they contribute $T/4$. Repeating the construction gives successive generations whose combined areas are a quarter of the preceding generation's:

$$
T,\quad \frac{T}{4},\quad \frac{T}{16},\quad \frac{T}{64},\quad\ldots
$$

The pattern suggests that the whole segment has area $4T/3$. In modern notation, the area of the triangles through generation $N$ is

$$
S_N=T\sum_{k=0}^{N}\frac{1}{4^k}
=\frac{4T}{3}\left(1-\frac{1}{4^{N+1}}\right).
$$

Recognizing this numerical pattern is only part of the argument. Why does the sum of the triangles account for the entire curved region? Each inserted triangle occupies more than half of the segment in which it lies. Consequently, the total area left uncovered decreases below any assigned positive amount after sufficiently many stages. The gap between $S_N$ and $4T/3$ likewise becomes arbitrarily small. These two controls exclude an area either greater or smaller than $4T/3$.

The procedure turns approximation into an exact conclusion. No finite stage actually replaces the curve by its inscribed polygon, and no measurement of a drawing supplies the final equality. The proof works because any proposed difference would eventually exceed a remainder already shown to be smaller.

This was an extraordinarily effective method, but its success depended on detailed properties of the particular figure. The ratio of successive triangle areas had to be established; the remaining gaps had to be controlled. Archimedes did not possess a single symbolic rule that would integrate an arbitrary function. His work shows why the eventual creation of such a calculus required more than the willingness to use very small pieces: it required a general organization of the relationships among curves, variation, and accumulation.

### 6. Conic Sections and the Limits of Construction (Third–Second Centuries BCE)

A problem can be impossible with one set of tools and manageable with another. Greek geometry made such differences mathematically productive. Constructing a figure meant more than sketching a plausible shape: the proposed operations had to establish that the resulting object satisfied the required conditions.

Apollonius's systematic study of conic sections developed a rich theory of the ellipse, parabola, and hyperbola. These curves could be obtained by cutting a cone with a plane, but their usefulness depended on relationships among their lines, areas, tangents, and diameters. A curve could become an instrument of reasoning once its properties were known well enough to control a construction.

The duplication of a cube illustrates why additional curves were attractive. If the original cube has side $a$, a cube of double the volume requires a side $x$ satisfying $x^3=2a^3$. Doubling the side would produce eight times the volume, so ordinary scaling does not give the requested construction.

An ancient reformulation sought two mean proportionals, $x$ and $y$, between $a$ and $2a$:

$$
a:x=x:y=y:2a.
$$

The first equality gives $x^2=ay$, and the second gives $y^2=2ax$. Combining them yields $x^3=2a^3$. Thus the desired side can be found if the two intermediate lengths can be constructed.

Modern coordinates make the role of curves particularly easy to see. Taking $a=1$, one may seek an intersection of the parabola $y=x^2$ and the hyperbola $xy=2$. Their positive intersection has $x^3=2$. This is a modern translation of the connection between conics and the mean-proportional problem, not the coordinate notation used in ancient constructions.

Why, then, did doubling the cube remain a famous difficulty? Because a construction using conics does not automatically count as a construction using only an unmarked straightedge and compass. The permitted operations define the question. The same distinction matters for trisecting an arbitrary angle and constructing a square equal in area to a given circle.

Greek mathematicians used a variety of curves, moving constructions, and instruments; their work was not uniformly confined to one ideal toolset. Yet restrictions on acceptable constructions encouraged the classification of problems and methods. A failure under a restriction could motivate a new curve, while a solution with the new curve could sharpen the question of whether the extra resource was necessary.

There remained a fundamental gap between repeatedly failing to find a straightedge-and-compass solution and proving that no such solution could exist. The latter required a characterization of everything those tools could construct. That characterization would emerge much later through algebra. Ancient construction problems therefore generated more than difficult puzzles: they made the dependence of solvability on permitted operations increasingly visible.

### 7. Astronomy: Geometry Turned into Tables and Predictions (Second Century BCE–Second Century CE)

A theorem about a circle is exact, but an astronomer needs a numerical prediction: where will a planet appear on a particular date? Bridging those tasks required both geometrical relationships and organized computation.

Work associated with Hipparchus, Menelaus, and Ptolemy developed that bridge in different ways. Chord tables connected angles to lengths in circles. Spherical geometry treated relationships appropriate to observations on the apparent celestial sphere. Ptolemy's *Mathematical Syntaxis*, later widely known as the *Almagest*, brought geometrical models, observations, and extensive numerical procedures into a systematic exposition.

A chord is the straight segment joining two points on a circle. Once the radius is fixed, the angle subtended at the center determines its length. For an angle of 60 degrees, the chord equals the radius, as can be seen by forming an equilateral triangle from the two radii and the chord. With radius 60, the chord is therefore 60. Other angles can be related through geometrical results, and the resulting numbers stored in a table.

Such a table turns a geometric relationship into a reusable computational resource. It avoids reconstructing the geometry from the beginning every time an angle occurs in a calculation. Values between tabulated angles can be estimated by interpolation, although the relationship is not linear and interpolation introduces approximation. Sexagesimal fractions, inherited from earlier computational traditions, made these calculations easier to organize.

An astronomical model then specifies which geometrical configuration to calculate. Combinations of circular motions, including deferents and epicycles, could reproduce aspects of the apparent motions of planets. The model's parameters had to be determined from observations, and its numerical consequences compared with what was seen. Geometry alone could not choose every parameter or guarantee agreement with the sky.

This introduces a different kind of difficulty from a gap in a proof. A computation might follow correctly from the model while a predicted position remained inaccurate. The source of the discrepancy could lie in the observations, tabular approximation, parameter estimates, or model assumptions. Those possibilities had to be distinguished before a correction could be meaningful.

Conversely, accurate predictions did not uniquely determine the physical arrangement responsible for them. Mathematical descriptions can agree on observable features while differing in how motions are represented. Ancient astronomers did discuss physical as well as mathematical questions, but computational success by itself did not settle every issue about celestial mechanisms.

Astronomy consequently joined methods that a simple contrast between “theory” and “practice” would separate. Demonstrated geometrical relations supported tables; tables supported numerical predictions; observations constrained the models in which those relations were used. Reliability depended on the connections among all three.

### 8. The Nine Chapters: Organizing Problems through Algorithms (Han Period)

What makes two problems mathematically alike when one concerns grain and another concerns payments? The *Nine Chapters on Mathematical Procedures*, or *Jiuzhang suanshu*, often answers through the operations that solve them. Its problems draw on fields, construction, distribution, exchange, and other activities, but its organization reveals recurring relationships beneath those different settings.

The work accumulated through a history of compilation and revision rather than a single identifiable act of authorship. It belongs to a mathematical tradition in which written procedures worked together with counting rods and the arrangements made on a calculating surface. Decimal positions allowed the same rod forms to represent different values, while arrays placed related quantities in a coordinated layout.

The *fangcheng* procedures show the power of that arrangement. Consider an illustrative problem involving two grades of grain. Three bundles of the first grade and two of the second yield 18 units; two bundles of the first and three of the second yield 17. What is the yield of a bundle of each grade?

A modern notation writes

$$
3x+2y=18,\qquad 2x+3y=17.
$$

The following table instead emphasizes the column arrangement of the data:

| Quantity | First condition | Second condition |
| --- | ---: | ---: |
| Bundles of first grade | 3 | 2 |
| Bundles of second grade | 2 | 3 |
| Total yield | 18 | 17 |

Multiply the second column by 3 and the first by 2. Their first entries now agree at 6. Subtracting the latter column from the former cancels that entry and leaves 5 bundles of the second grade with a yield of 15. One bundle of the second grade therefore yields 3. Substituting into the first condition gives a yield of 4 for a bundle of the first grade.

The numbers are chosen here for exposition; the method extends to larger arrays such as those in the ancient text. Its essential operation is elimination. Multiplying an entire condition preserves its proportional relationships, and subtracting compatible conditions removes an unwanted quantity. The layout lets the calculator carry that operation across coefficients and totals together.

Elimination also explains why signed quantities become useful. During a subtraction, one entry can be smaller than the entry subtracted from it even when the original problem concerns positive amounts. Rules for positive and negative entries allow the calculation to continue through such intermediate states. Accepting these operations does not imply that the text already possessed a modern abstract theory of the real numbers, but it considerably expands what the procedure can do.

The algorithm gives a kind of generality: a change from grain to another commodity need not change the mathematical operations. Yet a procedure's successful execution raises questions that execution alone does not answer. Why does a transformation preserve the solution? What happens if elimination removes all information about an unknown, or yields incompatible totals? Modern linear algebra organizes such cases systematically. It would be anachronistic to assume that the presence of elimination also implies that entire later theory.

The *Nine Chapters* provided a substantial body of problems and reusable methods. The explanatory tradition around it made the justification of those methods a continuing subject of study.

### 9. Liu Hui: Explaining Why a Procedure Works (263 CE)

Liu Hui's commentary on the *Nine Chapters*, dated 263 CE, repeatedly investigates the relationships that make calculations valid. Geometrical dissection, rearrangement, and subdivision can make a rule intelligible by showing what remains unchanged through an operation.

For an area calculation, this means asking what a cut does to the quantity being measured. If pieces are moved without overlap or loss, their total area remains the same. A difficult figure can therefore be related to a simpler one whose area is already understood. The explanation lies in the correspondence of parts, rather than in substituting a few numerical examples into a formula.

Curved boundaries present a harder case because a finite rearrangement of straight-edged pieces does not reproduce them exactly. Liu Hui's work on the circle uses repeated subdivision to obtain increasingly close polygonal approximations. It also attends to the area still left between the polygon and the circle. More sides alone are not an explanation of accuracy; one needs to understand what happens to the remainder.

A modern geometric reconstruction makes the computational mechanism accessible. Suppose a regular inscribed polygon has a side of length $s$ in a circle of radius $r$. The perpendicular from the center to that side has length

$$
h=\sqrt{r^2-\left(\frac{s}{2}\right)^2}.
$$

Insert the midpoint of the corresponding arc to double the number of sides. The new side has length

$$
s'=\sqrt{\left(\frac{s}{2}\right)^2+(r-h)^2}.
$$

Each refinement can thus be reduced to operations on lengths and square roots. Triangles joining the center to the polygon's vertices give its area. For a unit circle, the regular hexagon has area $3\sqrt{3}/2$, while the regular dodecagon has area 3. These are successive lower approximations, not competing exact values for the circle's area.

Liu Hui's argument goes beyond producing another decimal approximation. By studying the regions remaining outside the polygon, the procedure can be related to an assessment of what has not yet been counted. This connects numerical refinement with geometrical explanation. His discussions of solid volumes likewise use decomposition and subdivision to investigate ratios among pieces.

There is a useful comparison with Greek exhaustion arguments. Both traditions can reason about a curved or solid figure through simpler parts and increasingly fine divisions. Their textual organization and local aims differ: an explanation embedded in commentary on a procedure need not be presented as a new proposition in an axiomatic sequence. Similar mathematical resources can serve different forms of exposition.

The surviving text also imposes limits on reconstruction. Diagrams, colored pieces, gestures, and arrangements used in teaching may not survive with the words, and the transmission of the work introduced further interpretive difficulties. Recognizing such losses allows a more careful reading, but it does not justify filling every silence with a modern proof. What is clear is that the correctness of algorithms was itself a subject of inquiry. Chinese mathematical practice cannot be understood by treating calculation and demonstration as mutually exclusive activities.

### 10. Diophantus: Reducing a Problem to a Convenient Unknown (c. Third Century CE)

Diophantus's *Arithmetica* presents another way to organize mathematical ingenuity. It uses abbreviated notation for an unknown and its powers, while solving problems through carefully chosen expressions and substitutions. The desired answers are often positive rational numbers. This differs from the modern use of “Diophantine equation” for problems seeking integer solutions.

One famous problem asks for a given square, illustrated by 16, to be divided into two squares. The obvious question is how to find two quantities whose squares add to 16. The more productive question is how to choose one expression so that the resulting equation becomes simple.

In modern notation, let one square be $t^2$ and choose the other to be $(2t-4)^2$. The fixed term 4 is the square root of the given 16. Substitution gives

$$
t^2+(2t-4)^2=16.
$$

Expanding produces

$$
5t^2-16t+16=16,
$$

so the constant terms cancel. After excluding $t=0$, which would not provide the required division into two positive squares, the equation reduces to $5t=16$. Hence $t=16/5$, and the other square has root $12/5$. The result is

$$
\left(\frac{16}{5}\right)^2+
\left(\frac{12}{5}\right)^2
=\frac{256+144}{25}=16.
$$

The choice of expression has done the crucial work. Instead of introducing two unrelated unknowns and waiting for a general method to solve their relation, the construction makes one depend on the other in a way designed to cancel an inconvenient term. A problem with apparently many possibilities is converted into a manageable equation in one unknown.

This kind of preparation can be easy to miss in a polished solution. The substitution may look like a lucky guess until one asks which term it was chosen to remove. It expresses a strategic understanding of the equation. Similar choices recur across problems, even when the presentation does not formulate a single theorem covering every case.

Its limitation is equally important. Producing one acceptable rational answer need not classify all possible answers. A transformation effective for one problem may require a new choice for the next, and answers outside the allowed numerical domain may be set aside. Abbreviated notation helps control the calculation, but it is not yet the unrestricted use of letters for arbitrary coefficients and multiple unknowns characteristic of later symbolic algebra.

The end of this period therefore does not present a simple contest between geometry and arithmetic, or between proof and procedure. The *Elements* organized dependencies among propositions; Archimedes separated investigative methods from demonstrations; the *Nine Chapters* grouped problems through algorithms; Liu Hui explained the relations behind operations; Diophantus shaped unknown quantities to make a solution attainable. Each approach answered a different part of the same larger challenge: how to turn a successful piece of reasoning into knowledge that another person could understand, use, and extend.

## The Middle Ages: Extending Numbers, Developing Algorithms, and Transmitting Knowledge (Fourth–Fifteenth Centuries)

What makes a mathematical method capable of travelling beyond the problem, classroom, or language in which it was developed? A reliable procedure must identify the quantities it operates on, explain its transformations, and survive changes in notation and teaching. Between the fourth and fifteenth centuries, these demands produced advances in arithmetic, algebra, geometry, and the mathematics of change across several overlapping traditions.

“Middle Ages” is a convenient chronological label here, not a claim that China, India, the Islamic world, and Latin Europe shared one historical rhythm. Nor was this simply an interval between Greek discovery and European recovery. Mathematicians enlarged the range of numbers they could calculate with, organized unfamiliar problems into manageable classes, and investigated processes that could be continued indefinitely. Their successes repeatedly exposed a common difficulty: a rule that works in a familiar setting may fail when its objects or assumptions change.

### 1. Precision and the Geometry of Solids in China (Around the Fifth Century)

Liu Hui's work had shown how repeated geometrical operations could improve an approximation to a circle. The achievement associated with Zu Chongzhi in the fifth century pushed numerical precision much further. Historical records preserve the bounds

$$
3.1415926<\pi<3.1415927
$$

and the remarkably effective approximation $355/113$. In modern decimals, the fraction is approximately $3.141592920\ldots$, differing from $\pi$ by less than three ten-millionths. A short fraction could therefore carry information that would otherwise require several decimal places.

The fraction and the bounds answer different questions. The interval confines the true value; the fraction provides a convenient substitute in calculation. Indeed, $355/113$ lies slightly above the recorded upper bound. There is no contradiction: a useful approximation need not be one of the bounds used to establish accuracy.

How were these results obtained? Polygon methods offer a plausible background, but Zu Chongzhi's important mathematical work, the *Zhuishu*, is lost. The surviving results do not preserve enough detail to reconstruct every numerical step or the route to the fraction. Precision is securely attested; a complete account of the discovery is not.

Work associated with his son Zu Geng, also called Zu Xuan, confronted a different obstacle. A good value of $\pi$ cannot repair an incorrect relation between volumes. In the commentary tradition on the *Nine Chapters*, the sphere problem was connected with the solid common to two equal cylinders whose axes cross at right angles. Its parallel square sections surround the sphere's circular sections, always in the area ratio $4:\pi$. Zu Geng's argument compared the remaining pieces of a cube with pyramids through their sections, obtaining the volume of this intermediate solid and hence that of the sphere.

The governing idea was that equal areas at corresponding heights imply equal volumes. In modern notation, the resulting sphere relation is $V=\pi d^3/6$. The preserved argument uses a comparison of solids, not the modern integral formula. It separates two tasks that can otherwise be confused: establishing the geometrical relationship and selecting a sufficiently accurate numerical value for the constant in it.

These developments reveal why more calculation alone does not always resolve a difficulty. An approximation can be improved by repeating a known operation; a faulty volume rule demands a different comparison. Numerical accuracy and geometrical explanation could support one another while remaining distinct achievements.

### 2. Place Value, Zero, and Signed Numbers in India (Fifth–Seventh Centuries)

A positional notation makes the same sign perform different work according to where it stands. In modern notation, 305 means three hundreds, no tens, and five units. The empty tens position is essential: without a way to preserve it, the distinction between 305 and 35 disappears. Indian traditions contributed decisively to the development and transmission of decimal place-value numeration, although its signs and written practices emerged over time rather than in one identifiable act of invention.

The value of the notation depended on its partnership with algorithms. Columns organize addition and subtraction by powers of ten; carrying exchanges ten units of one position for one unit of the next. Multiplication extends the same structure to partial products. A compact way of recording numbers thus also becomes a way of directing operations.

But a mark that preserves an empty position is not yet automatically a number with its own arithmetic. What happens when nothing is added, subtracted, multiplied, or divided?

In the *Brahmasphutasiddhanta* of 628, Brahmagupta stated rules involving zero and positive and negative quantities. Fortunes and debts made signed arithmetic intelligible: a debt and an equal fortune cancel, and subtracting a debt can increase what remains. Such interpretations supported calculations beyond the arithmetic of positive collections.

There is a structural issue behind the familiar rule that a negative times a negative is positive. In a modern explanation, consistency with distribution requires

$$
(-3)\bigl(2+(-2)\bigr)=0.
$$

Since $(-3)\cdot2=-6$, the other product must be $+6$ if their sum is to vanish. This is an explanation in present-day notation, not a quotation from Brahmagupta. It illustrates the demand that new rules should fit together with established operations.

Zero made that demand particularly difficult. Brahmagupta's rule $0/0=0$ does not preserve the ordinary meaning of division as the recovery of a uniquely determined factor. To calculate $a/b$, we seek a number $q$ for which $bq=a$. When $a=b=0$, every $q$ satisfies the equation. When $b=0$ and $a\ne0$, no ordinary number does.

These are different failures: too many possible factors in one case, none in the other. Choosing zero as the quotient conceals the first problem; simply calling division by zero “infinite” does not make the usual arithmetic rules consistent either. The difficulty was not a missing trick for performing division. It concerned the conditions under which division is defined at all.

The enlargement of arithmetic therefore brought both new power and new restrictions. Zero and negative quantities made many relationships easier to express, but extending the objects of calculation required examining the laws of calculation themselves.

### 3. Astronomy, Integer Problems, and Sanskrit Mathematical Verse

Astronomical work joined several kinds of mathematical difficulty. The position of a celestial body called for geometrical and numerical approximation. The coordination of cycles called for exact relations among integers. Neither task could be met merely by writing larger numbers more efficiently.

Indian astronomers used sine tables, including the table in Aryabhata's *Aryabhatiya* of 499. The sine was represented as a half-chord associated with a chosen circle radius, rather than necessarily as the dimensionless ratio used today. Tabulating values at fixed intervals made repeated calculations feasible. Interpolation then supplied estimates for angles between the tabulated entries.

A table, however, transfers rather than abolishes the problem of accuracy. The starting values can contain errors, and the sine does not increase by equal amounts over equal angular intervals. An interpolation rule must account for the changing relationship, or at least keep its approximation useful for the task. Astronomy consequently encouraged attention to differences between neighbouring values and to procedures that improved numerical estimates.

Calendar cycles presented another question: how can a number satisfy several exact conditions at once? The *kuttaka*, or pulverizer, reduced integer problems by successive divisions. The name suits its strategy: break the coefficients into smaller pieces, then reconstruct a solution from the resulting relations.

A small example in modern notation shows the mechanism. Seek integers satisfying

$$
17x-5y=1.
$$

Successive division gives $17=3\cdot5+2$ and $5=2\cdot2+1$. Working backwards,

$$
1=5-2(17-3\cdot5)=7\cdot5-2\cdot17.
$$

This gives $x=-2$, $y=-7$. Adding five to $x$ and seventeen to $y$ leaves $17x-5y$ unchanged, so $x=3$, $y=10$ is a positive solution. More generally, $x=3+5k$ and $y=10+17k$ satisfy the equation for every integer $k$. The modern example exposes both a search procedure and the relation that makes the reconstruction valid.

Later work on equations of the form $x^2-Ny^2=1$ required more elaborate transformations. Brahmagupta's composition methods and the cyclic procedures associated with Jayadeva and Bhaskara II turned auxiliary solutions into resources for further steps. The underlying possibility can be seen in

$$
(3^2-2\cdot2^2)=1,\qquad 17^2-2\cdot12^2=1,
$$

where the second pair comes from squaring $3+2\sqrt2$ to obtain $17+12\sqrt2$. Multiplying this expression by its conjugate, with the minus sign, gives 1; squaring preserves that product. This illustrates composition, not the whole cyclic algorithm: the harder task is to find and select suitable intermediate relations when an initial solution is not already available.

Much of this mathematics was expressed in Sanskrit verse. Compact rules could be memorized and recited, while commentaries unpacked their meaning, supplied examples, and explained operations performed on a calculating surface. A verse was often one component of a larger teaching practice. Its brevity could make knowledge portable, but also make it difficult to interpret when that practice was lost. Reading only the memorized rule can therefore conceal both the reasoning behind it and the training needed to use it.

### 4. Translation and the Organization of Algebra in the Islamic World (Eighth–Tenth Centuries)

From the eighth century onward, translation and patronage brought Greek, Indian, and other mathematical traditions into expanding networks of scholarship. Arabic became a major language in which people of different backgrounds studied, criticized, and extended these materials. Courts, administrators, teachers, and astronomers supported different kinds of work; there was no single institution or purpose governing the whole enterprise.

Translation raised mathematical questions as well as linguistic ones. A numerical procedure, a geometrical demonstration, and an astronomical table could concern related quantities while organizing them differently. Making such resources usable together required decisions about terminology, interpretation, and the form of explanation.

Al-Khwarizmi's ninth-century algebra gave a particularly influential answer to the problem of organization. Instead of treating every unknown-quantity problem as a separate puzzle, he reduced equations to a small set of standard types. *Al-jabr* restored a subtracted quantity; *al-muqabala* cancelled or reduced corresponding terms on the two sides. In modern language, these operations preserve an equation while making its structure easier to recognize.

Consider the familiar example, expressed in modern symbols,

$$
x^2+10x=39.
$$

Take half of ten, square it, and add the result to both sides:

$$
x^2+10x+25=64,\qquad (x+5)^2=64.
$$

The positive length $x+5$ is eight, so $x=3$. A geometrical explanation makes the extra 25 necessary rather than mysterious. Split the area $10x$ into two rectangles of dimensions $x$ by 5, and place them along adjacent sides of the square $x^2$. A square of side 5 fills the missing corner, producing a larger square of side $x+5$.

Why not give one formula for every quadratic equation? Al-Khwarizmi worked with positive quantities and distinguished six standard types of linear and quadratic equation. A square plus roots equal to a number was a different case from a square plus a number equal to roots. Moving everything to one side with arbitrary signed coefficients would erase distinctions that mattered to this presentation and its geometrical justification.

A modern solver also obtains $x=-13$ in the example. That is not a missing positive length in the original diagram. It belongs to a broader interpretation of the unknown. Recognizing this difference allows us to identify the limitation without imagining that the author was trying unsuccessfully to write a modern textbook.

The achievement was a teachable classification connecting problem statements, transformations, procedures, and reasons. Its power also suggested further questions: could operations on unknowns be organized independently of particular diagrams, and could the same project reach equations beyond the second degree?

### 5. Cubic Equations: Construction, Existence, and Approximation (Eleventh–Twelfth Centuries)

What does it mean to solve an equation? A geometer can construct a segment satisfying the required relation. A calculator can determine a numerical value to a desired precision. An algebraist can seek an expression built from specified operations, such as arithmetic and root extraction. These goals overlap, but achieving one does not automatically achieve the others.

Omar Khayyam organized cubic equations into types and constructed solutions through intersections of conic sections. The curves were chosen so that a length determined by their intersection satisfied the original problem. The reasoning depended on geometrical relations among magnitudes, not on the modern coordinate equations of the curves. It nevertheless supplied an exact specification of a solution even when no expression in radicals was available.

A construction introduced its own question: do the proposed curves actually meet in the required way? Drawing two suitable kinds of curve is not enough to establish that a positive solution exists for every choice of coefficients. They may cross, touch, or fail to meet. The classification of equations therefore needed a corresponding analysis of possible roots.

Sharaf al-Din al-Tusi investigated such conditions in the twelfth century. Comparisons of algebraic expressions could establish a greatest attainable value and thereby explain why certain equations had no positive solution. A modern example illustrates the argument without attributing modern differential calculus to him. Consider

$$
x^3+c=3x^2,\qquad c>0.
$$

A positive solution must lie below 3, and must satisfy $c=x^2(3-x)$. The identity

$$
4-x^2(3-x)=(x-2)^2(x+1)
$$

shows that $x^2(3-x)$ cannot exceed 4 for positive $x$, and reaches 4 at $x=2$. Consequently $c>4$ is impossible, while $c=4$ gives the limiting case in which two positive intersections merge. The restriction follows from a comparison valid across the whole range, not from unsuccessful trials of individual numbers.

Numerical work pursued another side of the problem. Successive approximation and the evaluation of expressions at candidate values could turn a root into usable digits. Such a calculation might be sufficient for a table or a measurement, even though it supplied no general radical formula. Conversely, an exact geometrical construction might explain existence without giving the numerical precision required by an astronomer.

These investigations belonged to a wider mathematical environment. Astronomy required relations among arcs and angles; determining the direction of prayer could require spherical geometry; surveying and optics generated further questions about lengths, angles, and constructions. Their demands helped develop trigonometry and geometry, but did not make every abstract problem a direct practical application.

The central advance was an enlargement of what an equation could be asked to reveal: a construction, an admissible range, a count of possible solutions, or an approximation. A general radical solution of cubic equations remained a separate unresolved task.

### 6. New Mathematical Networks in Latin Europe (Twelfth–Thirteenth Centuries)

Latin readers gained access to much more mathematics through translation from Arabic and Greek, especially from the twelfth century onward. These activities followed several routes, including the Iberian Peninsula, Sicily, and contacts with the Byzantine world. Byzantine scholars continued copying and studying Greek mathematics; Greek learning did not disappear until a single moment of “rediscovery” in the West.

The arriving texts were already products of long histories. An Arabic work might translate a Greek source, incorporate an Indian computational technique, or present an author's own results. A Latin version could then add explanations, rearrange an argument, or combine material from several witnesses. What reached a particular reader depended on which version was available and which mathematical language that reader had learned.

Euclid's *Elements* illustrates the consequence. Medieval Latin readers encountered different translations and revisions, not one transparent copy of an untouched original. Definitions, diagrams, and supplementary arguments could affect how a proposition was understood. Establishing a dependable text and learning to reason with it were connected tasks.

Leonardo of Pisa, now commonly called Fibonacci, participated in another network. He learned methods of calculation in the Mediterranean trading world, including North Africa. His *Liber abaci*, first composed in 1202 and later revised, presented Hindu-Arabic numeration, arithmetic, commercial problems, and algebra to Latin readers. Its significance extends far beyond the rabbit problem that later made his name familiar.

Merchants needed to compare currencies, convert measures, divide profits, and reckon with mixtures and credit. Such problems required more than the ability to write numerals. The calculator had to decide which quantities should be compared and why a proportion applied.

For example, suppose partners agree to divide profit in proportion to capital multiplied by the time it is invested. A contribution of 60 units for six months and one of 40 units for nine months then carry equal weight, since both products are 360. Equal division follows from the agreed rule, despite the unequal amounts of capital. This illustrative problem shows the modelling step that lies behind the arithmetic: a different agreement would require a different calculation.

Italian *abbacus* schools and vernacular problem books developed these skills for commercial readers. Despite the name, this tradition prominently taught written arithmetic with Hindu-Arabic numerals. It existed alongside other educational settings, including universities with different curricula and aims. The spread of a useful technique depended on teachers, exercises, language, and professional demand.

Transmission was therefore selective and transformative. Latin readers did not receive all the mathematics then available elsewhere, and a translated work could represent a much earlier stage than contemporary research in its source region. Yet reworking knowledge for new communities also created new problems and habits of reasoning. The resulting mathematics was shaped by reception as well as inheritance.

### 7. Remainders, Unknowns, and Polynomial Procedures in China (Thirteenth–Early Fourteenth Centuries)

An integer can be described indirectly by the remainders it leaves on division. But can several such descriptions be assembled into one number? An earlier problem in the *Sunzi Mathematical Classic* asks for a quantity leaving remainder 2 when divided by 3, remainder 3 when divided by 5, and remainder 2 when divided by 7. Qin Jiushao's *Mathematical Treatise in Nine Sections* of 1247 developed systematic procedures for problems in this broader family.

The organizing idea is easiest to see in modern notation. Build a number that supplies the desired remainder for one divisor while leaving zero remainder for the others. For the divisors 3, 5, and 7, convenient building blocks are 70, 21, and 15: each is divisible by two of the divisors and leaves remainder 1 for the remaining one. Thus

$$
2\cdot70+3\cdot21+2\cdot15=233
$$

has all three required remainders. Subtracting twice $3\cdot5\cdot7=105$ gives the smaller answer 23. Every integer of the form $23+105k$ has the same remainders.

The calculation works because the building blocks isolate the conditions. Finding the multiplier that makes a remainder equal to 1 is the crucial subsidiary problem addressed by Qin's *dayan qiuyi* procedure. Successive divisions organize that search. This connects the reconstruction of remainders with the same general resource seen in integer problems elsewhere: repeated division can expose relations that are difficult to see in the original numbers.

Conditions cannot always be combined. A number cannot be even and also leave remainder 1 when divided by 4. Pairwise coprime divisors, as in the example, avoid this kind of conflict; shared factors require compatibility checks. The power of an algorithm depends partly on recognizing the conditions under which it is usable.

Chinese algebra also developed ways to organize unknown quantities. Li Ye's *Ceyuan haijing* of 1248 used the *tianyuan* method, designating an unknown and arranging coefficients according to powers. The calculating surface carried part of the notation: position distinguished the constant, the unknown, its square, and higher powers. Algebraic organization did not require the alphabetic symbolism that would later become familiar in Europe.

Zhu Shijie's *Siyuan yujian* of 1303 extended this approach to relations involving four unknowns. Elimination transformed a system into an equation in fewer unknowns, eventually allowing root-extraction procedures to be applied. To see the purpose of elimination in a simple modern example, take $x+y=10$ and $xy=21$. Substituting $y=10-x$ produces $x^2-10x+21=0$. The relation between two unknowns has become one polynomial problem. The historical methods addressed substantially more complicated cases, including high-degree equations.

Their challenge was organizational as well as numerical: align corresponding powers, preserve signs, remove unknowns without losing the intended relation, and then interpret a root in the original problem. Digit-by-digit root extraction could extend the calculation when no simple exact answer was available.

These techniques also depended on a community able to read the arrangements and carry out their transformations. A compressed written procedure could lose much of its intelligibility if teaching and commentary ceased to support it. The survival of a book and the survival of a working mathematical practice were not necessarily the same thing.

### 8. Representing Change: The Oxford Calculators and Oresme (Fourteenth Century)

A moving body can cover equal distances in equal times, but it can also speed up or slow down. How can different changing motions be compared? Fourteenth-century thinkers associated with Oxford, often called the Calculators, distinguished uniform motion from varieties of non-uniform motion and investigated the relations between a changing intensity and its total effect.

Their work grew within natural philosophy and scholastic argument. Similar questions were asked about qualities such as heat: how should one compare something uniformly intense with something whose intensity varies? These investigations widened the range of relationships that could be treated quantitatively, even when an agreed physical method of measurement was absent.

A particularly important result concerned what they called uniformly difform motion. In a modern translation, speed increases or decreases by equal amounts in equal times. Such a motion covers the same distance as a uniform motion lasting equally long at the average of the initial and final speeds.

Nicole Oresme gave geometrical form to reasoning about intensities and their distribution. Represent the duration by a horizontal segment and the successive intensities by perpendicular segments. Uniform intensity produces a rectangle; an intensity that increases uniformly from zero produces a triangle. Comparing these areas makes a relation among varying quantities visible.

For motion, the reasoning can be expressed today as

$$
s=\frac{v_0+v_1}{2}\,T,
$$

provided speed varies linearly with time over the interval of length $T$. Suppose the speed rises uniformly from 2 to 8 units of distance per unit time over three time units. Its mean speed is 5 and its distance is 15. In the diagram, cutting the triangular excess above the line of height 5 and moving it into the equal triangular deficiency below that line turns the trapezoid into a rectangle without changing its area.

This is more than averaging two convenient numbers. The geometrical justification depends on the specified pattern of variation. A motion that remains near speed 2 for most of the interval and rises rapidly to 8 at the end need not cover the same distance. Initial and final values alone do not determine the result.

The diagram also requires interpretation. A vertical segment representing an intensity is not itself the physical motion, and treating area as distance depends on the relation between speed and duration. Oresme's configurations belonged to a wider account of qualities and their effects; they were not yet a general coordinate system in which arbitrary functions were routinely plotted and manipulated.

Nor did the mean-speed relation by itself prove that freely falling bodies accelerate uniformly. A theorem about a stipulated kind of variation and a claim that nature exhibits that variation require different evidence. The mathematical description of change had become more powerful, while its connection to a unified, experimentally grounded mechanics remained an open problem.

### 9. Infinite Series and the Control of Approximation in Kerala (Fourteenth–Fifteenth Centuries)

Could an endless process provide a practical answer to a finite calculation? Around the late fourteenth and early fifteenth centuries, Madhava and the tradition that developed around him in Kerala explored this possibility in trigonometry and the determination of $\pi$. Their work grew from mathematical astronomy, where accurate relations between arcs and chords mattered to repeated computation.

The tradition developed series equivalent to the modern expansions

$$
\sin\theta=\theta-\frac{\theta^3}{3!}+\frac{\theta^5}{5!}-\cdots,
\qquad
\cos\theta=1-\frac{\theta^2}{2!}+\frac{\theta^4}{4!}-\cdots.
$$

Here the radius is normalized to one, the angle is in radians, and $n!$ denotes the product of the integers from 1 to $n$. These are modern conventions for displaying the relationships. Historically, the procedures concerned arcs, sines, and chosen radii, expressed through rules and explanations rather than this notation.

Such a rule can produce successive corrections to an initial estimate. Yet an infinite expression is not automatically an efficient algorithm. One must know how far to continue, how much the omitted part matters, and whether the arithmetic itself has retained enough precision.

The difficulty is vivid in the series

$$
\frac{\pi}{4}=1-\frac13+\frac15-\frac17+\cdots.
$$

Its terms diminish, but slowly. Taking ten terms and multiplying by four gives only about $3.04184$. The series is mathematically fruitful while its most direct numerical use is disappointing. Continuing longer will improve the answer, but can demand far more work than the formula's simplicity suggests.

Correction terms attributed to Madhava address the omitted tail rather than merely extending the sum. If

$$
S_n=4\sum_{k=0}^{n-1}\frac{(-1)^k}{2k+1},
$$

one of the corrections gives the approximation

$$
\pi\approx S_n+(-1)^n\frac{4n}{4n^2+1}.
$$

For the same ten terms, this produces approximately $3.14159024$, an error of about $0.00000241$. The example is a modern evaluation of the rule, not a reconstruction of Madhava's own worksheet. Its lesson is the difference between accumulating more terms and understanding the contribution of the terms that remain.

The question of justification is essential. A correction that succeeds numerically in selected cases still needs an explanation of why it tracks the remainder. Kerala authors investigated these relationships through geometrical arguments, finite sums, and limiting processes. The surviving explanations are not all equally complete, and later texts preserve much of what can be known about the earlier discoveries. In particular, Jyeshthadeva's sixteenth-century *Yuktibhasa* supplies extended reasoning; it should not be treated as a manuscript written by Madhava himself.

These achievements established powerful ways to calculate with infinite processes. They did not by themselves constitute the later general system of differentiation and integration, with broadly applicable rules and an explicit account of the inverse relation between the two operations. Recognizing that distinction preserves the actual problem being solved: how particular geometrical quantities can be evaluated through a controlled sequence of numerical operations.

### 10. Manuscripts, Tables, and Print: Enlarging Mathematical Communities (Fifteenth Century)

A mathematical result becomes more useful when another person can recover its meaning, check it, and adapt it. By the fifteenth century, manuscripts, astronomical tables, commercial teaching, and eventually European print were enlarging the communities able to do so. These forms of circulation served different readers and imposed different demands on mathematical writing.

A table condensed a large calculation into values that could be reused. The user still needed to understand its units, intervals, and conventions, and often had to interpolate between entries. A copied error could then propagate through many later calculations. Producing a useful table therefore involved organization and checking as well as the computation of individual numbers.

Al-Kashi's work in the scholarly environment of Samarkand illustrates the scale and variety of this activity. His *Treatise on the Circumference* of 1424 used polygonal approximation for a highly precise determination of the circle constant. His *Key to Arithmetic*, completed in 1427, treated integers, fractions, astronomical computation, geometry, and algebra, including systematic work with decimal fractions. It brought techniques for demanding calculation into a form that could also serve instruction.

Decimal fractions extend the principle of place value beyond units. Written in modern notation, $0.125$ means one tenth, two hundredths, and five thousandths. This makes operations on fractional quantities resemble operations on integers, provided the calculator correctly tracks scale. Multiplying 125 by 4 is not enough to evaluate $0.125\times0.4$: one must also account for the thousandths and tenths to obtain $0.05$.

The convenience is substantial, but decimal fractions do not make every quantity terminate. One third still requires an endless expansion. Astronomers also continued to find sexagesimal divisions useful. Decimal methods had earlier precedents, including work in the Islamic world centuries before al-Kashi; their history concerns repeated development and adoption, not one sudden replacement of every older practice.

In Europe, printing made it possible to reproduce a common arrangement of text and diagrams for many readers. Ratdolt's 1482 Venice edition of Euclid's *Elements* is a revealing case: an ancient geometrical work reached print through a medieval Latin version associated with Campanus. The printed page embodied the earlier history of translation and revision.

Mathematics made particular demands on the new medium. A misplaced numeral could spoil a procedure, and a wrongly labelled diagram could obstruct a proof. Reproducibility increased the reach of both explanations and errors. It also gave readers a more stable common object to compare, teach from, and correct. Manuscripts and personal instruction continued to matter alongside printed books.

The movement of Greek scholars and manuscripts, including migration after the Ottoman conquest of Constantinople in 1453, contributed to European learning. It cannot alone explain the change. Translation, Byzantine scholarship, commercial schools, university teaching, and Mediterranean exchange had already been active for centuries.

By the end of this period, mathematical work had acquired wider computational resources and more ways to circulate. It also carried unresolved tensions into the next: unknowns could be manipulated without a uniform symbolism; exact constructions did not always yield convenient numbers; infinite procedures needed control; and numerical descriptions of change still needed a firmer relation to physical causes. The next developments would depend on reorganizing these resources as much as on adding further results.

## The Renaissance to the Mid-Seventeenth Century: Symbolic Algebra and the Mathematization of Nature (c. 1500–1650)

A method can become more powerful by changing what it allows a mathematician to represent. Letters can stand for whole classes of quantities; an unfamiliar number can make an otherwise obstructed calculation possible; an equation can describe a curve; a geometrical relation can organize observations of moving bodies. Between about 1500 and 1650, these possibilities increasingly reinforced one another.

The changes drew on the translations, computational traditions, and teaching institutions of earlier centuries. They also produced new difficulties. An algebraic formula might pass through quantities whose meaning was disputed. An elegant astronomical arrangement might conflict with observations or established physical explanations. A precisely demonstrated law might apply only under ideal conditions. Mathematical success therefore raised two connected questions: what transformations are legitimate, and what do their results tell us about the objects being studied?

### 1. Solving Cubic and Quartic Equations (Early Sixteenth Century)

Medieval mathematicians had constructed solutions of cubic equations and developed numerical procedures for finding them. A different challenge remained: could their roots be expressed by a finite combination of arithmetic operations and root extractions? The sixteenth-century breakthroughs answered this question for the cubic and quartic, while revealing how much remained uncertain about the roots themselves.

Scipione del Ferro found a method for a class of cubic equations early in the century. Niccolò Tartaglia independently developed methods that helped him defeat Antonio Maria Fior in a mathematical contest in 1535. Such contests could establish a teacher's reputation and make an undisclosed procedure professionally valuable. Competition encouraged discovery, but secrecy made the circulation and attribution of discoveries contentious.

Tartaglia disclosed a rule to Girolamo Cardano under a promise of secrecy. After learning of del Ferro's earlier work, Cardano published cubic methods in the *Ars magna* of 1545, acknowledging predecessors but provoking a bitter dispute. The book also presented Ludovico Ferrari's method for quartic equations. The mathematics emerged through several people's work, even though the cubic formula subsequently became closely associated with Cardano's name.

The central device was to transform one difficult equation into easier auxiliary equations. In modern notation, a change of variable removes the squared term from a general cubic, leaving a form such as

$$
x^3+px=q.
$$

Set $x=u+v$. Expansion gives

$$
x^3=u^3+v^3+3uvx.
$$

If $3uv=-p$ and $u^3+v^3=q$, the desired cubic follows. The two unknown cubes therefore have a known sum and product:

$$
u^3+v^3=q,\qquad u^3v^3=-\frac{p^3}{27}.
$$

They are roots of the quadratic $z^2-qz-p^3/27=0$. Solving it leads to

$$
x=
\sqrt[3]{\frac q2+\sqrt{\frac{q^2}{4}+\frac{p^3}{27}}}
+
\sqrt[3]{\frac q2-\sqrt{\frac{q^2}{4}+\frac{p^3}{27}}},
$$

with the cube roots chosen so that $uv=-p/3$. This unified symbolic derivation is a modern presentation; the historical treatments distinguished cases according to the signs and meanings of their terms.

The quartic required another carefully chosen auxiliary quantity. After removing its cubic term, write

$$
y^4+py^2+qy+r=0.
$$

Introducing $m$ gives

$$
(y^2+m)^2=(2m-p)y^2-qy+(m^2-r).
$$

For the nondegenerate case, choose $m$ so that the quadratic expression on the right becomes a square. Its discriminant must vanish:

$$
q^2=4(2m-p)(m^2-r).
$$

This is a cubic equation in $m$. Once an appropriate value is found, taking the two square-root signs reduces the quartic to quadratic equations. Exceptional cases need separate handling, but the strategy is clear: solve a higher-degree problem by arranging an identity whose remaining condition has lower degree.

These methods did more than supply isolated answers. They demonstrated the productive use of substitutions, auxiliary unknowns, and the deliberate cancellation of terms. Yet a formula did not settle which quantities counted as numbers, which roots were admissible, or how several possible root choices should be coordinated. The apparent completion of one task exposed the incompleteness of another.

### 2. Copernicus Reorganizes the Planetary System (1543)

Why do planets sometimes appear to reverse their direction against the stars? In a geocentric model, combinations of circular motions could reproduce these appearances. Copernicus reorganized the problem by making Earth itself a moving planet. Some of the motion seen from Earth could then arise from the observer's motion rather than from a separate reversal of the observed planet.

In *De revolutionibus orbium coelestium*, published in 1543, Earth's annual revolution helped connect phenomena that had previously required more separate treatment. When Earth overtakes an outer planet, the changing line of sight can produce apparent retrograde motion. The ordering of the planets and their relative orbital dimensions became parts of a coordinated arrangement. The gain lay in relationships among phenomena, not simply in replacing a complicated picture with a few effortless calculations.

Copernicus retained combinations of uniform circular motions. His model was not the later system of planets moving on single elliptical paths, and it did not immediately eliminate the machinery needed to compute planetary positions. A change in the centre and organization of a model does not automatically remove every difficulty in its numerical implementation.

More seriously, what would make the new arrangement physically credible? If Earth rotates, why does a falling object not visibly miss the place beneath it? If Earth travels around the Sun, why do nearby stars not shift detectably against more distant ones over the year? These objections drew on accepted accounts of motion and on the limits of observation.

The stellar objection concerned annual parallax. A change in the observer's position should change the direction to a sufficiently nearby star. Making the stars much farther away could reduce the apparent shift below detectable levels, but this enlarged the universe beyond what many contemporaries were prepared to accept. Failure to observe a shift did not logically disprove terrestrial motion; its significance depended on assumptions about stellar distances and observational sensitivity.

Copernicus thus supplied a powerful reorganization without settling every physical question it raised. A model can unify observations and still require an account of why bodies move as it proposes. The mathematical arrangement, the accuracy of its predictions, and its physical interpretation had to be assessed together, but they were not identical achievements.

### 3. Bombelli Makes Complex Quantities Calculable (1572)

An equation can have an obvious real answer while a general solution formula seems to pass through impossibility. This was the revealing difficulty examined by Rafael Bombelli in his *Algebra*, published in 1572.

Consider

$$
x^3=15x+4.
$$

The number 4 plainly works: $64=60+4$. But the cubic formula, with $p=-15$ and $q=4$, produces

$$
x=\sqrt[3]{2+\sqrt{-121}}+\sqrt[3]{2-\sqrt{-121}}.
$$

Rejecting every square root of a negative number would make the formula unusable even though the equation has a real solution. The troublesome quantities could no longer be dismissed merely as signals that the original problem was impossible.

Using the modern symbol $i$, with $i^2=-1$, the expressions under the cube roots become $2+11i$ and $2-11i$. Now calculate:

$$
(2+i)^3=2+11i,\qquad (2-i)^3=2-11i.
$$

Selecting these cube roots gives

$$
x=(2+i)+(2-i)=4.
$$

Their product is 5, so they also satisfy the condition $uv=-p/3$ from the derivation. The imaginary contributions cancel, while the operations involving them have performed essential work.

The calculation depends on more than a lucky guess. Multiplication must distribute consistently, and replacing $i^2$ by $-1$ must produce repeatable results. Once such rules are available, expressions involving negative square roots can be compared, multiplied, and checked. Bombelli made this arithmetic sufficiently explicit to function as a mathematical tool.

There are still choices to control. A complex number has several cube roots, and choosing one root from each expression independently need not preserve $uv=5$. The formula is not an instruction to combine any two values indiscriminately. Even in modern notation, the relation between the auxiliary quantities remains part of the method.

Nor does finding 4 exhaust the equation. Factorization gives

$$
x^3-15x-4=(x-4)(x^2+4x+1),
$$

so the other roots are $-2+\sqrt3$ and $-2-\sqrt3$. All three roots are real, although the radical route to them encounters complex quantities. This situation made the separation between the character of an answer and the character of intermediate calculations especially difficult to ignore.

Operational success came before a generally accepted geometrical representation or a complete foundation for complex arithmetic. Acceptance of negative, irrational, and complex numbers also proceeded unevenly. Their usefulness put pressure on inherited meanings of “number,” but did not instantly replace those meanings with the modern number system.

### 4. Viète: Letters for General Relations (Late Sixteenth Century)

An unknown can be abbreviated without making algebra fully general. A symbol may stand for the particular quantity sought in one problem while all the given quantities remain specific numbers. François Viète's analytic work, especially his introduction of 1591, gave letters a more systematic role: they could designate known quantities as well as unknowns.

His convention used vowels for unknowns and consonants for known quantities. The important distinction was not the choice of alphabetic positions. It was that the known data could remain unspecified throughout a derivation. A procedure could then reveal how an answer depends on the data, rather than only calculate an answer after numerical values had been supplied.

Suppose two quantities have a given sum $S$ and product $P$. In modern notation, if one is $x$, the other is $S-x$, and therefore

$$
x(S-x)=P,\qquad x^2-Sx+P=0.
$$

The resulting expression

$$
x=\frac{S\pm\sqrt{S^2-4P}}2
$$

handles a whole family of problems. It also exposes a condition that individual numerical calculations can obscure: real solutions require $S^2\geq4P$. When $S=10$ and $P=21$, the quantities are 3 and 7; with the same sum and product 30, no real pair exists.

The algebra thus does two kinds of work. It computes when particular values are inserted, and it compares possible cases before any values are chosen. Expanding

$$
(z-a)(z-b)=z^2-(a+b)z+ab
$$

also makes relations between roots and coefficients available for investigation. Symbols preserve the structure of the calculation while its particular ingredients vary.

Viète's quantities were nevertheless not arbitrary elements of a modern algebraic system. His analytic art retained the requirement of dimensional homogeneity: terms equated or added should represent compatible kinds of magnitude. In the sum-and-product example, $S$ has the dimension of a length if $x$ does, while $P$ has the dimension of an area. All terms of the quadratic then have the same dimension.

Such restrictions were part of what made symbolic reasoning intelligible and trustworthy, though they also limited how freely expressions could be interpreted. Writing a letter did not automatically authorize it to stand for every positive, negative, or complex value. The rules governing the quantities still mattered.

The change was therefore deeper than shorter notation. Algebra could retain relationships that would disappear into particular arithmetic, expose a condition for solvability, and suggest a transformation worth trying. Its language was becoming an instrument of discovery as well as a record of completed work.

### 5. Kepler: Letting Observations Change the Orbit (1609–1619)

A planet is observed as a direction in the sky, not as a point on a conveniently visible orbit. Recovering its path requires relating observations made at different times to the changing position of Earth. The problem combines geometry, measurement, and a model of the observer's own motion.

Johannes Kepler worked with the exceptionally precise observations accumulated by Tycho Brahe, especially those of Mars. This precision made discrepancies consequential. An arrangement that looked satisfactory at a coarser scale could fail when compared with observations whose uncertainty was much smaller. Kepler's investigation involved repeated constructions, calculations, and revisions; the ellipse did not simply announce itself in a plot of the data.

The two laws published in the *Astronomia nova* of 1609 changed both the shape of the orbit and the description of motion along it. The path is an ellipse with the Sun at one focus, rather than at its centre. A line joining Sun and planet sweeps out equal areas in equal times. The planet therefore moves more rapidly near the Sun and more slowly farther away.

The area law is not a claim that equal lengths of orbit are traversed in equal times. Nearer the Sun, a greater angular sweep is needed to enclose a given area. Geometry supplies a way to relate position and elapsed time without assuming uniform motion around the orbit.

This was conceptually powerful but computationally demanding. Given a time, one still had to determine the corresponding point on an ellipse. Specifying an area does not usually allow the position to be read off through one elementary construction. The law simplified the organization of the motion while leaving substantial numerical work.

In *Harmonices mundi* of 1619, Kepler supplied a further relation among different planets:

$$
\frac{T^2}{a^3}=\text{a common constant},
$$

where $T$ is the orbital period and $a$ the semimajor axis. The relation concerns the semimajor axis, not the planet's continuously changing distance from the Sun. As a simple illustration, in units where an orbit with $a=1$ has $T=1$, an orbit with $a=4$ would have $T=8$. Distance and period are related by a definite power law rather than simple proportionality.

Kepler sought physical causes as well as mathematical descriptions, including ideas about an influence exerted by the Sun. His proposals did not amount to the later dynamics of universal gravitation. The laws established relationships that a more adequate causal theory would need to explain.

His belief in a divinely ordered cosmos helped motivate the search for harmony, but did not dictate which mathematical form observations would support. Earlier preferences for particular geometrical arrangements had to be revised. The achievement depended on allowing accurate evidence to change the form in which order was sought.

### 6. Galileo: Idealization, Experiment, and Mathematical Motion (Early Seventeenth Century)

A falling body accelerates, but what increases uniformly: its speed with time, its speed with distance, or something else? These possibilities lead to different predictions. A mathematical account of motion begins by making such alternatives precise enough to compare.

Galileo developed an account of uniformly accelerated fall in which speed increases by equal amounts in equal times. For motion beginning from rest, the mean-speed relation discussed in the preceding period then gives, in modern notation,

$$
v=gt,\qquad s=\frac12gt^2.
$$

The distance is proportional to the square of elapsed time. Consequently, distances travelled during successive equal time intervals are in the ratio $1:3:5:7:\cdots$: these are the successive differences between the squares $1,4,9,16,\ldots$.

This prediction supplies a testable structure. It is stronger than saying merely that a body falls faster as it descends. Timing a rapid fall directly, however, was difficult. Galileo's investigations of inclined planes slowed the motion enough to make comparisons more manageable. A rolling ball is not identical to a body in free fall, and its acceleration needs a separate physical interpretation; nevertheless, motion along a fixed incline could be used to investigate the relation between distance and time.

The argument also required a decision about resistance. Air and contact with surfaces affect observed motion, and bodies of different shapes can fall very differently. To identify a simpler relation, Galileo considered limiting situations in which such disturbing effects were reduced or set aside. The idealization specified what the mathematical relation concerned.

Thought experiments helped test the coherence of competing explanations. If a heavy body must fall faster simply because it is heavier, attaching a slower light body seems both to impede it and to create a still heavier combination that should fall faster. The tension challenges the proposed explanation. It does not, by itself, measure acceleration or prove that every actual fall is unaffected by its surroundings.

The same method of separating components made projectile motion tractable. Suppose a body is launched horizontally with speed $u$, horizontal speed remains constant, and vertical motion begins from rest with constant downward acceleration $g$. Using downward displacement $y$ as positive,

$$
x=ut,\qquad y=\frac12gt^2.
$$

Eliminating time gives

$$
y=\frac{g}{2u^2}x^2,
$$

the equation of a parabola. The geometrical path follows from combining two specified motions. This calculation uses modern algebraic notation to display the relationship Galileo treated geometrically.

Its assumptions matter. Air resistance can alter both components, and over sufficiently large distances the curvature of Earth and changing direction of gravity cannot be ignored. The result does not claim that every cannonball follows an exact parabola. It identifies a simple model and thereby makes departures from that model questions for further investigation.

In the *Two New Sciences* of 1638, mathematical demonstrations and discussions of observation formed parts of the same inquiry. Neither could do the other's work. Demonstration traced consequences of the chosen account; experiment helped determine whether that account captured the relevant behaviour. The difficulty was to simplify a physical problem enough to reason about it while retaining the features responsible for the phenomenon.

### 7. Logarithms and the Labour of Calculation (From 1614)

Astronomy, navigation, and surveying could require long sequences of multiplications and divisions involving many digits. A theoretically sound method might still be slow to use and vulnerable to arithmetic errors. Could the operations themselves be replaced by cheaper ones?

A simple numerical pattern suggests how. Correspond the numbers $1,2,4,8,16,\ldots$ with the counts $0,1,2,3,4,\ldots$ of successive doublings. Multiplying 4 by 8 corresponds to adding their counts, $2+3=5$, which identifies 32. Division similarly corresponds to subtraction. The difficulty is to extend the correspondence to the much denser range of values that real calculations require.

John Napier published his logarithmic tables in 1614. His construction related two motions: one uniform, the other slowing in proportion to the distance still to be traversed. Equal ratios in the changing distances corresponded to equal differences in the uniform motion. This supplied a continuous version of the correspondence between geometric and arithmetic progressions.

Napier's original tables concerned sines scaled to a large radius. Their normalization was different from the common logarithms familiar today. The modern definition of a logarithm as an exponent is a convenient way to explain the resulting relation, but should not be substituted for his actual starting point. Joost Bürgi developed a related computational approach independently.

Henry Briggs helped develop and tabulate base-ten logarithms. In that system,

$$
\log_{10}(ab)=\log_{10}a+\log_{10}b,\qquad
\log_{10}(a/b)=\log_{10}a-\log_{10}b
$$

for positive $a$ and $b$. Root extraction could also be replaced by division of the logarithm. A reusable table allowed these transformations to benefit many separate calculations.

For example, to multiply 2.34 by 5.67 using a table, look up approximately

$$
\log_{10}(2.34)=0.36922,\qquad
\log_{10}(5.67)=0.75358.
$$

Add to obtain $1.12280$, then find the number corresponding to that logarithm. The result is approximately 13.268, compared with the exact product 13.2678. For this small example ordinary multiplication is straightforward; the advantage becomes substantial in repeated computations with larger numbers and more digits.

The work has been redistributed rather than abolished. Someone must construct accurate tables, check them, and print the digits correctly. The user must keep track of powers of ten and interpolate when a required value falls between entries. Rounding and transcription errors can accumulate, and a mistaken table entry can mislead many users.

Logarithms therefore belong to the history of mathematical concepts and to the history of organized numerical labour. They made a class of expensive operations easier by building a correspondence that others could repeatedly use. Their success depended as much on trustworthy numerical infrastructure as on the identity that justified the substitution.

### 8. Descartes and Fermat: Equations as a Way into Geometry (1630s)

A geometrical condition may be easy to state but difficult to turn into a construction. Find all points satisfying a relation among distances, for example, and there may be no obvious auxiliary line that reveals the answer. Algebra offered a method for keeping track of the condition while the required figure was still unknown.

René Descartes and Pierre de Fermat developed influential approaches to this task in the 1630s. Descartes published *La Géométrie* in 1637; Fermat's work circulated through manuscripts and correspondence. Their methods differed, and the familiar modern diagram with two perpendicular, labelled axes is not a literal description of every construction they used.

The central possibility was to describe an unknown point by lengths measured relative to chosen reference lines. Geometrical relations among those lengths could then be translated into an equation. Solving or transforming the equation could reveal the locus, after which its meaning had to be interpreted geometrically.

Consider a modern example. Which points are equally distant from a fixed point and a fixed line? Choose the point $(0,a)$, the line $y=-a$, and $a>0$. For a point $(x,y)$, equality of the squared distances gives

$$
x^2+(y-a)^2=(y+a)^2.
$$

Cancelling equal terms yields

$$
x^2=4ay.
$$

A verbal condition has become a quadratic equation defining a parabola. Conversely, a point satisfying that equation has the required equal distances. The argument works in both directions, so it characterizes the locus rather than merely finding some points on it.

The method can also turn an intersection into an equation-solving problem. Intersect this parabola with a line $y=mx+b$. Substitution gives

$$
x^2-4amx-4ab=0.
$$

Depending on the coefficients, the quadratic has two, one repeated, or no real roots. These cases correspond to crossing the parabola twice, tangency, or no real intersection. Questions about a diagram become questions about roots, and facts about roots acquire geometrical meaning.

Descartes also showed how choosing a unit segment allowed multiplication, division, and root extraction to be represented by constructions of lengths. Products did not always have to be interpreted as new areas, and cubes did not always have to designate solid volumes. This helped loosen restrictions that had tied algebraic degree directly to geometrical dimension.

The new approach nevertheless had boundaries. Descartes classified curves and distinguished those he accepted as geometrical from others generated through less acceptable motions or relations. The project did not begin with arbitrary real-valued functions or all the curves that later analysis would study. Signed coordinates and the uniform conventions of modern analytic geometry also took time to become established.

Algebra did not make geometrical judgment unnecessary. A chosen coordinate system could simplify or complicate a problem; transformations could introduce candidates that needed checking; a root still had to correspond to an admissible point. Synthetic arguments could reveal a relation more directly than an elaborate calculation. The advance was a systematic passage between representations, giving mathematicians another route when a construction was difficult to see.

### 9. Perspective and Projective Geometry: What Survives a Change of View?

A circular rim can appear elliptical, parallel edges can seem to converge, and equal intervals can appear unequal in a perspective drawing. Lengths and angles change. What remains sufficiently stable to support a geometrical theory?

Perspective supplied both practical problems and a mathematical setting for this question. Imagine projecting points from a fixed centre onto a plane. A straight line, in a nondegenerate situation, projects onto another straight line: its points and the centre lie in one plane, which cuts the image plane in a line. Thus collinearity can survive a transformation that changes distances dramatically.

Girard Desargues pursued relations of this kind in his work on conics, including the *Brouillon project* of 1639. Conic sections could be studied through their relation under projection, rather than exclusively through separate metrical definitions of ellipse, parabola, and hyperbola. What appeared to be different figures could share the same organization of points and lines.

The theorem associated with his name captures this emphasis. If two triangles are positioned so that the lines joining corresponding vertices meet at one point, then the three intersections of corresponding sides lie on one line, with the usual provisions for nondegenerate configurations. The hypothesis concerns concurrence, and the conclusion concerns collinearity. Neither specifies a particular side length or angle.

Blaise Pascal's work of 1640 supplied a striking theorem for conics. Take six points $A,B,C,D,E,F$ on a conic. Let $AB$ meet $DE$ at $P$, $BC$ meet $EF$ at $Q$, and $CD$ meet $FA$ at $R$, extending the sides as needed. Then $P,Q,R$ are collinear. The theorem relates a figure assembled from six points to a line that is not obvious from the original construction.

A recurring difficulty was how to treat parallel lines. A projection can turn intersecting lines into parallel ones or reverse that appearance. Desargues used points at infinity to bring these cases into a common account. In modern language, a direction is represented by a point shared by the parallel lines in that direction. This is an extension of the geometrical framework, not a claim that two ordinary parallel lines eventually meet at a very distant physical location.

The framework was not yet presented with the later axiomatic precision of projective geometry. Desargues's unusual terminology and compressed exposition made his work hard to read, and its circulation was limited. A powerful unifying idea did not guarantee immediate adoption.

Coordinate methods unified problems by translating them into equations. Projective methods sought relations preserved when a figure was transformed. These approaches could eventually interact, but they began by directing attention to different features. Geometry was acquiring several ways to decide which aspects of a figure mattered.

### 10. Mathematical Certainty and the Explanation of Nature

The developments of this period made mathematics increasingly persuasive as a language of natural knowledge. Yet the conviction that nature has mathematical order left open what that order consists of and how it should be discovered.

For Kepler, geometrical and harmonic relationships belonged to the intelligibility of a world created by God. Galileo also connected the understanding of nature with mathematical relationships, while insisting on the relevance of observation and reasoning about physical circumstances. Descartes sought explanations through matter, motion, and mechanical interaction, supported by a philosophical account of reason and certainty. These positions shared ambitions without forming a single doctrine.

Such commitments could guide research productively. Belief in an intelligible order encouraged the search for simple relations beneath complicated appearances. A commitment to mechanical explanation demanded more than a catalogue of successful numerical predictions. But the same commitments could favour a particular arrangement or mechanism before adequate evidence supported it.

Kepler's earlier attempts to relate planetary spacing to regular solids show how a mathematically attractive idea could generate investigation without providing a lasting explanation of the observed system. Descartes's celestial vortices offered a mechanical picture of planetary motion, but their plausibility as a picture did not establish their quantitative adequacy. The aspiration to explain and the success of a particular explanation require separate judgments.

The distinction can be made precisely. Given certain geometrical assumptions, a conclusion may follow necessarily. Whether a physical system satisfies those assumptions is a further question. The parabolic trajectory follows from uniform horizontal motion and constant vertical acceleration; its application to a particular projectile depends on how well those conditions are met. Mathematical certainty belongs to the implication, while physical reliability also depends on evidence for the premises.

The period transformed the resources available for both kinds of inquiry. Algebra could express general relations, unfamiliar quantities could make calculations possible, and equations could connect geometry with motion. Observations and experiments could then challenge the choices made in building the model. None of these resources worked automatically: symbols needed interpretation, computations needed checking, and demonstrations needed correctly specified assumptions.

By the mid-seventeenth century, curves, motion, and numerical processes could increasingly be studied within related mathematical languages. Yet finding a tangent, measuring a curved region, and following a continuously changing quantity still called for varied methods. The next major task would be to connect these problems through more general operations, while confronting new questions about infinite processes and the meaning of their results.

## The Later Seventeenth and Eighteenth Centuries: Calculus, Probability, and the Expansion of Analysis (c. 1650–1800)

How can a quantity be understood through the way it changes? How can many small contributions determine a whole? And how can reasoning remain useful when the outcome of an event is unknown? During this period, mathematicians turned these questions into increasingly general methods.

Calculus connected rates of change with accumulation. Probability related possible outcomes to fair expectations and, later, observations to uncertain causes. Analysis extended these methods through functions, series, and differential equations. Their effectiveness encouraged applications far beyond the problems that had first suggested them. It also made unresolved assumptions harder to avoid: what is an infinitesimal, when is an infinite operation legitimate, and what justifies applying a mathematical result to experience?

### 1. Preparing Calculus: Separate Problems Begin to Converge

Finding a tangent, locating a maximum, measuring a curved region, and determining instantaneous speed initially called for different techniques. Their later unity should not conceal the ingenuity of the methods developed before a common calculus existed.

Bonaventura Cavalieri's method of indivisibles, published in 1635, compared figures through collections of parallel sections. Corresponding sections could establish relations between areas or volumes without first measuring each figure separately. The method extended the power of geometrical comparison, but raised a conceptual difficulty: how should a collection of lines be related to an area, when an individual line has no area? Its success did not depend on the naive assertion that adding enough zeros produces a positive quantity; the comparison of entire collections required its own principles.

Fermat approached tangents and extreme values through relations between nearby configurations. A simple example in modern symbols shows the computational idea. For a rectangle whose two adjacent sides sum to $L$, write its area as

$$
A(x)=x(L-x).
$$

Changing one side to $x+e$ changes the area by

$$
A(x+e)-A(x)=e(L-2x)-e^2.
$$

Dividing the difference by $e$ and suppressing the remaining term involving $e$ singles out $x=L/2$. Here the identity $A(x)=L^2/4-(x-L/2)^2$ confirms that this candidate gives the maximum for positive side lengths. Fermat's procedure, often called adequality, was not formulated as the modern definition of a derivative. The interpretation of its auxiliary quantity and comparison has remained a historical question. Nevertheless, it gave a systematic route to a candidate maximum that could be checked geometrically.

John Wallis developed arithmetic treatments of quadrature through powers and infinite processes. Patterns among known cases suggested extensions, sometimes through interpolation between exponents. This could reveal results beyond the reach of a familiar diagram, while making the justification of the extension a separate problem.

Isaac Barrow's geometrical investigations supplied important connections between tangents and areas. An area accumulated as a boundary moves has a rate of growth related to the height of that boundary. Conversely, a curve whose tangent behaviour is known can provide information about accumulation.

The emerging connection was deeper than a shared use of very small quantities. The local problem of determining change and the global problem of recovering a quantity from its changes could be inverse problems. A general method would have to turn that relationship into reusable operations rather than a collection of ingenious special constructions.

### 2. Fair Division and Uncertain Outcomes (From the 1650s)

Suppose a game must stop before anyone wins. How should the stake be divided? Dividing it according to the points already won can ignore how close each player is to securing the prize. The relevant question is what each player's remaining opportunity is worth.

The correspondence between Pascal and Fermat in 1654 made this problem of points a central example of mathematical reasoning about chance. Huygens's treatise of 1657 organized related reasoning through the value of expectations. Combinatorial counting and recursive arguments could agree on a fair division even though no one knew who would have won.

Consider an illustrative game with independent rounds, each equally likely to be won by A or B. A needs one more win, while B needs two. Imagine recording the next two round results even if the game would finish after the first. The four sequences AA, AB, BA, and BB are equally likely. A wins in the first three; B wins only in the last.

Padding the record after the game ends does not change its winner. It makes all the records equally long and therefore comparable under the probability assumptions. A's share of the stake is consequently $3/4$, and B's is $1/4$. A stake of 64 units should be divided into 48 and 16.

The same result follows without listing all the sequences. With probability $1/2$, A wins the next round and takes everything. Otherwise, each player then needs one win and has half the remaining chance:

$$
P(\text{A wins})=\frac12+\frac12\cdot\frac12=\frac34.
$$

This recursive argument works backwards from simpler situations. Expectation assigns a numerical value to a contingent outcome; it does not claim that a single play will produce that average payment.

What supports the assumption of equal probabilities? It may come from the design of the game, symmetry, and an agreed model of its operation. Ignorance alone is insufficient. In two fair coin tosses, the three possible head counts—zero, one, or two—are not equally probable. One head corresponds to two equally likely sequences, while each other count corresponds to one.

The problem therefore involved both mathematics and modelling. Once elementary outcomes and their probabilities were specified, counting and recursion imposed clear constraints. Specifying those outcomes correctly was itself part of the reasoning. Probability made uncertainty tractable by structuring it, not by treating every description of what might happen as equally likely.

### 3. Newton's Fluents, Fluxions, and Inverse Problems (From the 1660s)

Newton's investigations of the 1660s combined geometry, algebra, motion, and infinite series. Quantities could be conceived as generated continuously: a point traces a line, a changing height determines an area, and a moving body traverses a distance. He developed the language of fluents for flowing quantities and fluxions for their rates of change.

If two fluents satisfy $y=x^3$, their rates are related by

$$
\dot y=3x^2\dot x.
$$

When $\dot x\ne0$, the ratio $\dot y/\dot x=3x^2$ gives the slope of the curve. The same calculation can describe geometrical inclination or relative rates of change. Motion provides an organizing interpretation, but the resulting method reaches beyond the trajectory of a physical body.

The inverse task is to recover a fluent from its fluxion. If $x$ increases uniformly at unit rate and the fluxion of an accumulated quantity is $x^2$, then that quantity is $x^3/3$ plus a constant. An initial condition determines the constant. Recovering change therefore requires both an operation and information that the rate alone does not contain.

Why should this inverse operation measure an area? In modern terms, let $A(x)$ be the area accumulated under a continuous nonnegative curve from a fixed starting point to $x$. Moving the boundary a small distance $h$ adds a narrow region. Its area divided by $h$ lies between the smallest and largest heights on that interval. As the interval shrinks, continuity makes those heights approach the height at $x$.

Thus the rate of growth of area is the curve's height. This supplies the connection expressed today by

$$
A'(x)=f(x),\qquad
\int_a^b f(x)\,dx=F(b)-F(a)\quad\text{when }F'=f.
$$

The notation and explicit continuity condition are modern. The historical advance was recognizing the central role of this inversion and organizing calculations around it.

Newton's work with series greatly enlarged the available calculations. His generalized binomial expansion handled non-integer powers, giving, for example,

$$
(1+x)^{1/2}=1+\frac{x}{2}-\frac{x^2}{8}+\frac{x^3}{16}-\cdots
$$

for $|x|<1$. Complicated expressions could be replaced by powers whose rates and accumulations were easier to calculate. The resulting series also offered numerical approximations.

Newton did not present all of this work promptly in a single published textbook. Manuscripts, correspondence, and later publications transmitted different aspects of his methods. His explanations also changed, from early manipulations of small increments toward fluxions and limiting ratios. The computational unification was decisive, while the best account of what made its operations legitimate remained under development.

### 4. Leibniz: Differentials, Integrals, and Composable Rules (1670s–1680s)

A useful general method needs a language in which its steps can be combined. Leibniz's development of calculus in the 1670s gave notation an active role in reasoning. The symbols $dx$, $dy$, and $\int$ helped express local change and accumulation as operations with recognizable relationships.

Finite differences already suggested an inverse connection. If successive differences are $a_1-a_0$, $a_2-a_1$, and so on, their sum collapses:

$$
(a_1-a_0)+(a_2-a_1)+\cdots+(a_n-a_{n-1})=a_n-a_0.
$$

Leibniz's investigations connected such patterns with curves, tangents, and quadratures. His integral sign, an elongated form of S, emphasized summation; the differential notation kept track of the quantities whose changes were being compared.

A crucial rule concerns a product:

$$
d(uv)=u\,dv+v\,du.
$$

Both factors can change. For finite increments, expanding $(u+\Delta u)(v+\Delta v)-uv$ gives two first-order terms and the additional product $\Delta u\,\Delta v$. Differential reasoning retained the first-order contribution. Explaining exactly why the extra term could be omitted was part of the foundational task, but the resulting rule made complicated expressions systematically manageable.

Together with the rule for a composition, it allowed calculations to be built from simpler ones. For example,

$$
y=(x^2+1)^3
\quad\Longrightarrow\quad
\frac{dy}{dx}=3(x^2+1)^2\cdot2x.
$$

The outer dependence and the inner dependence are handled in turn. A new curve no longer necessarily demands a new geometrical construction of its tangent.

Inverting a differentiation rule can generate an integration rule. The product rule yields integration by parts,

$$
\int u\,dv=uv-\int v\,du,
$$

with constants or endpoint terms supplied as appropriate. An accumulation that is difficult in one form can be transformed into another. Not every integral becomes easy, but the rules provide a shared repertoire for attacking it.

Leibniz published his differential calculus in 1684 and work on integration in 1686. The Bernoullis and other mathematicians developed and taught the methods, helping establish their circulation. Newton and Leibniz had arrived independently at their principal methods through different investigations; their subsequent priority dispute made publication, chronology, and national loyalties contentious.

Their notations encouraged different emphases without imposing an absolute division. Fluxions highlighted generation and rates; differentials made relations among changing quantities particularly convenient to manipulate. Neither notation automatically solved the problem of foundations. Both helped convert local discoveries into an extensible body of mathematical practice.

### 5. Newton's Mechanics: Terrestrial and Celestial Motion (1687)

Why should the Moon's orbit and a stone's fall belong to the same theory? Their appearances differ, but both can be understood as changes of motion under an attraction. An orbiting body need not be carried around by a separate celestial mechanism: its continuing motion and its continual deflection can together produce an orbit.

In the *Principia* of 1687, Newton organized mechanics around laws of motion. A body maintains uniform straight motion unless acted on by a force; force changes its momentum; interacting bodies exert equal and opposite forces on one another. These principles distinguished motion itself from the change of motion that requires dynamical explanation.

Universal gravitation supplied a quantitative attraction. In modern notation, the force between two point masses is

$$
F=G\frac{Mm}{r^2}.
$$

Using this relation for extended bodies requires further justification. Newton's results for spherically symmetric bodies made it possible, under the appropriate conditions, to treat their external gravitational action as concentrated at their centres. That reduction was a mathematical achievement, not something guaranteed by writing down the inverse-square formula.

The connection with Kepler's period law can be seen in a circular two-body orbit. Let $r$ be the constant separation. Both bodies move about their common centre of mass, and their relative acceleration has magnitude $G(M+m)/r^2$. Equating this with the centripetal acceleration gives

$$
\frac{4\pi^2r}{T^2}=\frac{G(M+m)}{r^2},
\qquad
T^2=\frac{4\pi^2r^3}{G(M+m)}.
$$

For an elliptical relative orbit, the corresponding formula uses its semimajor axis in place of $r$. When a planet's mass is small compared with the Sun's, the period-to-size relation is approximately common to the different planets. The approximation now has a reason and a condition of validity.

A central force also accounts for equal areas in equal times. The inverse-square dependence selects conic trajectories, with bound, nondegenerate motion giving ellipses and other initial conditions allowing unbound paths. Kepler's relations could thus become consequences of dynamics rather than independent descriptions of the heavens.

The *Principia* largely presented its demonstrations geometrically, using limiting arguments rather than the later routine language of differential equations. Its reach was nevertheless central to the subsequent development of analysis and mechanics.

The actual solar system contains more than two mutually attracting bodies. A planet's path is perturbed by other planets; the Moon is influenced by both Earth and Sun. The two-body solution therefore provided an organizing approximation, not a complete exact solution of every astronomical motion. Perturbation methods and numerical calculation became essential.

Nor did the law explain the underlying mechanism of gravitational action. A quantitative account can connect phenomena and predict their development while leaving deeper causal questions open. Newton's synthesis made that distinction unavoidable precisely because its mathematical success was so substantial.

### 6. The Foundational Difficulty: When May a Small Quantity Be Discarded?

Calculus repeatedly produced correct answers through operations that seemed to change the status of a small quantity halfway through the argument. A quantity had to be nonzero to permit division, yet was then discarded as though it were zero. Was this a contradiction, an abbreviation, or an operation requiring a different explanation?

For $y=x^2$, a finite increment $h$ gives

$$
(x+h)^2-x^2=2xh+h^2.
$$

If $h\ne0$, division is legitimate:

$$
\frac{(x+h)^2-x^2}{h}=2x+h.
$$

The desired derivative is $2x$. But setting $h=0$ in the original quotient produces $0/0$. Calling $h$ “very small” does not make $2x+h$ exactly equal to $2x$. An argument must explain why the final answer is exact despite this intermediate difference.

Newton's method of first and last ratios sought the ratios approached as quantities were generated or vanished. The claim concerned a limiting ratio, not the ratio of two zeros after the quantities had disappeared. Leibniz used infinitesimal differences and distinguished orders of smallness, while also appealing to ways in which infinitesimal reasoning could be supported through arguments involving ordinary quantities.

These approaches were more sophisticated than a careless decision to ignore inconvenient terms. Nevertheless, their explanations and everyday applications were not always aligned, and a common, fully explicit foundation did not immediately emerge.

George Berkeley's *The Analyst* of 1734 pressed the difficulty. The success of a calculation did not establish that each inference in its customary justification was valid. His criticism formed part of a wider religious and philosophical controversy, but the mathematical issue could not be answered merely by pointing to successful applications.

A modern limiting explanation clarifies the elementary example. For every nonzero $h$,

$$
\left|\frac{(x+h)^2-x^2}{h}-2x\right|=|h|.
$$

The quotient can therefore be made as close to $2x$ as desired by restricting $|h|$. No division by zero occurs. The derivative is a limit of values, not one more value obtained by substituting zero into the quotient.

This explanation illustrates what a justification must control; it is not a claim that eighteenth-century authors already possessed the later general theory of limits. More complicated questions—higher derivatives, infinite series, and the exchange of limiting operations—required additional work.

The tension between discovery and justification was productive. Calculus had revealed connections worth preserving. Criticism demanded clearer accounts of their conditions rather than abandonment of the methods simply because their first explanations were incomplete.

### 7. Euler and the Bernoullis: Functions, Series, and Differential Equations

Once rates and accumulations could be manipulated systematically, mathematical problems increasingly took the form of equations relating unknown functions to their changes. Jakob and Johann Bernoulli developed methods and applications of the new calculus; Daniel Bernoulli connected analysis with problems in mechanics and fluids. Euler extended and organized these activities on an exceptional scale.

The function became a central object. Instead of studying only a particular geometrical curve, one could investigate expressions, their transformations, and equations satisfied by them. Euler's influential presentation of 1748 emphasized functions as analytical expressions, though the meaning and admissible range of “function” did not remain fixed throughout his work or the century.

A differential equation can determine an unknown function through a rule governing change. Consider the modern example

$$
y'=y,\qquad y(0)=1.
$$

Seek a power series $y=a_0+a_1x+a_2x^2+\cdots$. Comparing coefficients after differentiation gives

$$
(n+1)a_{n+1}=a_n,\qquad a_0=1.
$$

The coefficients are therefore $a_n=1/n!$, yielding the exponential series. The equation has organized infinitely many coefficients through one recurrence. Subject to convergence and justification of termwise differentiation, this becomes a method of constructing the solution.

Similar strategies served increasingly complex questions about fluids, elastic bodies, and motion. Equations helped organize families of physical problems, while those problems stimulated new analytical techniques. Calculus expanded from relations involving one variable into methods for quantities depending on several variables.

But an infinite series is not simply a polynomial with more terms. The geometric series makes the distinction visible. For $x\ne1$, its finite partial sum satisfies

$$
1+x+\cdots+x^n=\frac{1-x^{n+1}}{1-x}.
$$

If $|x|<1$, the remainder involving $x^{n+1}$ tends to zero, giving $1/(1-x)$. At $x=2$, it does not disappear. The ordinary series $1+2+4+\cdots$ diverges, even though formal substitution in the rational expression gives $-1$.

Eighteenth-century mathematicians explored broader associations between series and expressions, so their procedures should not all be judged as inadvertent arithmetic mistakes. Yet a formal association must be distinguished from an ordinary limit of partial sums. Its interpretation and allowed operations need to be stated.

Termwise differentiation, integration, and rearrangement posed related difficulties. A finite identity might remain true for every partial sum while failing to justify the proposed infinite operation. The very methods that made analysis powerful required a better account of what a function was, how a series represented it, and which transformations preserved that representation.

### 8. The Vibrating String and the Meaning of a Function

A taut string can be pulled into a shape and released. If its subsequent motion is governed by a differential equation, what initial shapes must that equation accept? The question brought physical intuition into conflict with restrictive ways of defining a function.

In the 1740s, d'Alembert developed the equation of a vibrating string. For an ideal uniform string with constant tension and small transverse displacement, a modern form is

$$
\frac{\partial^2 y}{\partial t^2}
=c^2\frac{\partial^2 y}{\partial x^2},
$$

where $x$ identifies position along the string, $t$ is time, and $c$ is the wave speed. Spatial curvature determines transverse acceleration. The relation follows under specific mechanical assumptions, rather than describing every possible motion of a real string.

A solution can be written, for sufficiently smooth functions, as

$$
y(x,t)=F(x-ct)+G(x+ct).
$$

The two terms describe profiles travelling in opposite directions. Their shapes must be selected to match the initial displacement and velocity; fixed endpoints impose further relations. The unknowns are whole functions, not merely a few constants.

D'Alembert and Euler differed over the admissible initial curves and the conditions required of solutions. Euler argued for a wider range of shapes, including curves assembled from different pieces. Such a curve could be specified geometrically even if no single analytical expression of the preferred kind represented it. The interpretation of a physical initial condition was pressing against the interpretation of a mathematical function.

Daniel Bernoulli approached the problem through superposed normal modes. For a string of length $L$ fixed at both ends, elementary standing waves have spatial factors

$$
\sin\left(\frac{n\pi x}{L}\right),\qquad n=1,2,3,\ldots.
$$

Each has its own frequency. Bernoulli proposed that combinations of these modes could account for general string motions. This offered a physical and mathematical picture of a complicated vibration as a mixture of simpler ones.

But could every admissible initial shape be represented by such a trigonometric series? Consider a string plucked into a triangular shape. Each individual sine wave is smooth, while the triangle has a corner. A finite combination cannot reproduce that corner exactly. An infinite combination introduces questions about convergence and about whether the series can still be differentiated as the wave equation requires.

The absence of an ordinary second derivative at a corner does not mean that a plucked string cannot move. It means that the relation between the physical idealization and the chosen mathematical definition of solution needs examination. Later analysis would provide more flexible frameworks; the eighteenth-century controversy exposed the need.

The dispute consequently concerned more than competing formulas. It asked what counts as a function, what it means for a series to represent one, and how much regularity a differential equation may legitimately demand. These questions would remain central well into the nineteenth century.

### 9. Variations and Analytical Mechanics: Seeking General Principles

Ordinary differentiation can help find the best value of a variable. What if the unknown is an entire curve, and the quantity to be optimized depends on the whole curve? The calculus of variations developed methods for this larger problem.

Johann Bernoulli's brachistochrone challenge of 1696 asked for the path along which a body would descend fastest between a starting point and a lower point, starting from rest under uniform gravity without friction. The shortest path need not take the least time. A path that descends more steeply at first can gain speed sooner and compensate for its greater length.

In modern coordinates, let $y$ measure downward distance from the starting height. Conservation of mechanical energy gives speed $v=\sqrt{2gy}$. For a path represented by $y(x)$, the travel time is expressed as

$$
T[y]=\int\frac{\sqrt{1+y'^2}}{\sqrt{2gy}}\,dx,
$$

with limits determined by the endpoints. The numerator measures path length locally; the denominator supplies the speed. The problem is to choose the path that minimizes the accumulated time. Its solution is an appropriate arc of a cycloid, rather than a straight line.

Euler's work of the 1740s and Lagrange's subsequent methods organized such problems around integrals of the form

$$
J[y]=\int_a^b F(x,y,y')\,dx.
$$

Instead of moving a single point, vary the entire curve: replace $y$ by $y+\varepsilon\eta$, where $\eta$ vanishes at the fixed endpoints. The first-order change, after integration by parts, is

$$
\delta J=\int_a^b
\left(\frac{\partial F}{\partial y}
-\frac{d}{dx}\frac{\partial F}{\partial y'}\right)\eta\,dx.
$$

For a sufficiently smooth stationary curve, this must vanish for every allowed variation. The resulting Euler–Lagrange equation supplies a common method for finding candidates. Problems about quickest descent, shortest paths, and constrained geometrical quantities could thus be approached through related operations.

Stationarity is not a guarantee of a minimum. Changing $J$ to $-J$ preserves the stationary equation while exchanging minima and maxima. Further analysis of variations, endpoints, and constraints is needed. A slogan that nature always chooses the “least” quantity cannot replace the specification and examination of a particular principle.

Mechanics also acquired more systematic analytical forms. Euler and Lagrange developed equations that could accommodate constraints and coordinates suited to the system. Lagrange's *Méchanique analitique* of 1788 organized this work through principles including virtual work, reducing the need to invent a fresh geometrical argument for each arrangement of interacting bodies. This development should not be conflated with every later formulation of mechanics through an action integral.

Lagrange also sought a different foundation for calculus. In his *Théorie des fonctions analytiques* of 1797, he attempted to obtain differentiation from coefficients in power-series expansions. The coefficient of $h$ in the expansion of $f(x+h)$ would define the first derivative, making calculus an extension of algebra.

The approach placed a substantial burden on the expansion itself. Could every relevant function be expanded, and would the series actually recover its values? The existence of derivatives, even of all orders, does not by itself secure that conclusion. A proposed foundation had shifted the difficulty from infinitesimals to the class of functions and the validity of their representations.

### 10. From Games to Repeated Trials and Inference

A probability model assigns chances to possible observations. Can observations, in turn, teach us what the probabilities are? The transition from games to inference required this direction of reasoning to be made explicit.

Jakob Bernoulli's *Ars conjectandi*, published posthumously in 1713, established a fundamental relation between probability and frequency. In modern form, if independent trials have the same success probability $p$, and $S_n$ counts successes in $n$ trials, then for every fixed $\varepsilon>0$,

$$
P\left(\left|\frac{S_n}{n}-p\right|>\varepsilon\right)\longrightarrow0
\quad\text{as }n\longrightarrow\infty.
$$

The theorem controls the probability of a specified discrepancy. It does not promise that every finite sequence will look representative, or that recent failures make a success more likely on the next independent trial.

The underlying count has binomial probabilities,

$$
P(S_n=k)=\binom nk p^k(1-p)^{n-k}.
$$

Exact evaluation becomes cumbersome for large $n$. De Moivre developed approximations, including a normal approximation in the 1730s, that made the central range of such counts more tractable. In modern notation, the standard deviation of the observed proportion is $\sqrt{p(1-p)/n}$. Increasing the number of observations by a factor of 100 reduces this scale by a factor of 10, not 100.

These results assume the probability model. Using them to learn an unknown probability introduces a further question: how should alternative possibilities be weighted before and after observing data?

Bayes's posthumous essay, communicated by Richard Price in 1763, treated an inverse-probability problem. Laplace developed a wider programme of inference from observations during the following decades. Their work addressed relationships among prior assumptions, the chance of the observed data under a hypothesis, and the resulting assessment of the hypothesis.

A modern finite example makes those roles visible. Suppose an urn is selected with equal probability from two possibilities: one contains equal proportions of red and blue balls; the other contains three red for every blue. Draw three times with replacement and observe red each time. The probabilities of these observations are $1/8$ and $27/64$, respectively.

Weighting by the equal prior probabilities gives

$$
P(\text{second urn}\mid\text{three reds})
=\frac{27/64}{8/64+27/64}
=\frac{27}{35}.
$$

The observations favour the second urn, but do not prove that it was selected. Different initial selection probabilities would give a different answer. Replacement matters too: without it, the draws would not have the same independent structure.

Probability was consequently becoming a method for assessing evidence as well as distributing stakes. Its conclusions remained conditional on the specified alternatives and sampling assumptions. Repeated observations can reduce some random uncertainty, but a biased instrument, an unrepresentative sample, or a changing process can defeat the intended inference. More data do not automatically repair the model through which they are interpreted.

### 11. Experience, Necessity, and Competing Accounts of Certainty

The success of mechanics and analysis sharpened a philosophical question: what kind of certainty had actually been achieved? A demonstrated consequence, an observed regularity, and a justified expectation about future events need not have the same status.

Hume distinguished relations of ideas from matters of fact. In his *Enquiry concerning Human Understanding* of 1748, mathematical reasoning exemplified demonstrative certainty, while claims about events required experience. Repeated observation could establish what had happened without logically entailing that the next case must behave the same way.

An appeal to the past success of prediction does not remove the difficulty: it already assumes that past success is a guide to future performance. Hume's challenge concerned the warrant for this step, rather than a practical instruction to stop observing or calculating. Mathematics can establish what follows from a law, but those deductions alone do not demonstrate that nature must continue to obey it.

Kant sought a different account of necessity. In the *Critique of Pure Reason*, first published in 1781 and revised in 1787, he treated mathematical knowledge as synthetic a priori: it extends knowledge while possessing a necessity not derived from repeated measurements. Mathematical construction in intuition played a central role in his explanation.

Space and time, on this account, are forms through which human sensibility receives appearances; concepts such as causality belong to the understanding's organization of experience. This was an account of the conditions under which experience and objective knowledge are possible. It was not the claim that every particular physical law could be deduced without observation, or that mathematical structures described things independently of all conditions of human knowledge.

These positions did not provide rival algorithms for differentiating a function or predicting an orbit. They interpreted the authority and scope of such achievements differently. Nor should their philosophical conclusions be treated as additional mathematical theorems proved by the success of calculus.

By about 1800, the reach of mathematical methods had expanded much faster than agreement about their foundations. Functions could be specified through expressions, curves, series, or equations; those descriptions did not automatically coincide. Probability could guide inference while depending on assumptions about repeated events. Mechanics could unify phenomena while leaving questions about causes and approximation.

The next period would turn many of these tensions into explicit mathematical problems. Definitions of limits and convergence, the boundaries of algebraic solvability, and the status of geometrical assumptions would become subjects of investigation in their own right.

## Sources and Historical Notes

**Ancient Civilizations (c. 3000–600 BCE)**

The five subsections follow the five entries of the first period in the [Chinese outline](c.Mathematics.History.zh.md). Modern notation is used to make the operations explicit. The rectangle with area 12, the multiplication of 13 by 17, and the seven-person bread distribution are explanatory examples, not quotations from ancient documents. The unknown-quantity problem is Rhind Mathematical Papyrus problem 24.

| Subsection | Principal material and its role |
| --- | --- |
| 1. Mathematics Embedded in Practical Activity | Jens Høyrup, “Babylonian mathematics,” §1.1 in the [Companion Encyclopedia][C-source], especially early administration, measures, and practical computation; Corinna Rossi, “Mixing, building, and feeding: mathematics and technology in ancient Egypt,” §5.1 in the [Oxford Handbook][O-source]. |
| 2. Mesopotamia: Place Value and Calculation by Tables | Høyrup, §1.1, particularly “Numbers and Practical Computation”; Eleanor Robson, “Mathematics education in an Old Babylonian scribal school,” §3.1 in the [Oxford Handbook][O-source]. Semicolons, commas, and the prime-factor explanation are modern aids to exposition. |
| 3. From Manipulating Areas to Finding Unknown Quantities | Høyrup, §1.1, especially the discussion of geometric transformations and the interpretation of Babylonian “algebra.” The diagram described in words reconstructs the reasoning; it is not presented as a drawing preserved on a specific tablet. |
| 4. Egypt: Doubling, Unit Fractions, and Proportional Reasoning | C. S. Roero, “Egyptian mathematics,” §1.2 in the [Companion Encyclopedia][C-source], including the procedure for Rhind problem 24; Kline, chapter 2, “Egyptian Mathematics,” in [Mathematical Thought from Ancient to Modern Times][K-source]. |
| 5. Practice and Reasoning Had No Fixed Boundary | Robson, §3.1, and Annette Imhausen, “Traditions and myths in the historiography of Egyptian mathematics,” §9.1 in the [Oxford Handbook][O-source], especially the effects of preservation and the limits of interpreting ancient texts solely through modern mathematics. |

The [British Museum's record for the Rhind Mathematical Papyrus](https://www.britishmuseum.org/collection/object/Y_EA10057) identifies Ahmose as its scribe and describes its numerical tables and problems. The University of Chicago's [Nippur Tablet Project](https://isac.uchicago.edu/research-projects/nippur-tablet-project) provides institutional context for the House F material and the study of tablets together with their findspots.

The period heading gives the broad chronological scope, not the date of every technique discussed. Detailed examples here belong mainly to the early second millennium BCE. Later Babylonian developments, including later conventions for marking empty positions, should not be read back into Old Babylonian notation.

**Ancient Greece and Early China (Sixth Century BCE–Third Century CE)**

The ten subsections correspond in order to the ten entries for this period in the Chinese outline. The period groups overlapping traditions; it does not imply a single sequence of transmission between Greece and China. Modern notation distinguishes the mathematical relationships being explained from the forms in which ancient authors expressed them.

| Subsection | Principal material and its role |
| --- | --- |
| 1. Numbers and the Order of Nature | Kline, chapter 3 in [Mathematical Thought][K-source]; G. E. R. Lloyd, “What was mathematics in the ancient world? Greek and Chinese perspectives,” §1.1, and Markus Asper, “The two cultures of mathematics in ancient Greece,” §2.1, in the [Oxford Handbook][O-source]. These support the distinction between philosophical ideals and the diversity of mathematical practices. |
| 2. Incommensurability | Kline, chapters 3–4; Alexander Jones, “Greek mathematics to AD 300,” §1.3 in the [Companion Encyclopedia][C-source]. The parity proof is presented in modern notation; no claim is made to identify its first author or reconstruct the circumstances of discovery. |
| 3. Eudoxus | Kline, chapters 3–4, on proportion and exhaustion; Jones, §1.3. Euclid's Book V preserves the theory traditionally associated with Eudoxus. The finite-approximation argument is an explanatory reconstruction, not a quotation. |
| 4. Euclid | Kline, chapter 4; Ken Saito, “Reading ancient Greek mathematics,” §9.2 in the [Oxford Handbook][O-source], particularly the role of diagrams and the interpretation of the Elements. The worked construction is Elements I.1. |
| 5. Archimedes | Kline, chapter 5, on the Quadrature of the Parabola; Jones, §1.3; Saito, §9.2. The geometric-series notation is modern. The two new triangles each having one-eighth of the previous triangle's area and the control of the uncovered segments are essential parts of the argument. |
| 6. Conics and Construction | Kline, chapters 3–5; Jones, §1.3. The coordinate equations illustrate the mean-proportional reduction; they are not attributed as written equations to ancient geometers. Straightedge-and-compass restrictions describe an important class of constructions, not all Greek mathematical work. |
| 7. Astronomy | Kline, chapters 5–7; Jones, “Greek Applied Mathematics,” §1.4 in the [Companion Encyclopedia][C-source]. The 60-degree chord is an explanatory example. |
| 8. The Nine Chapters | J. C. Martzloff, “Chinese Mathematics,” §1.9 in the [Companion Encyclopedia][C-source]; Lloyd, §1.1, and Christopher Cullen, “People and numbers in early imperial China,” §7.1, in the [Oxford Handbook][O-source]. The two-grade grain problem is chosen for exposition, not transcribed from a numbered ancient problem. |
| 9. Liu Hui | Martzloff, §1.9; Lloyd, §1.1, on the mathematical aims and geometrical arguments of the commentary tradition. The chord-halving equations and unit-circle areas are modern explanatory reconstructions, not a literal transcription of Liu Hui's numerical procedure. |
| 10. Diophantus | Kline, chapter 6; Jones, §1.3. The division of 16 into two rational squares follows the Arithmetica example, with its substitution and calculations expressed in modern notation. |

For comparison with the primary geometrical text, David Joyce's edition provides [Euclid, Book V, Definitions 5–6](https://mathcs.clarku.edu/~djoyce/elements/bookV/defV5.html) and [Book I, Proposition 1](https://mathcs.clarku.edu/~djoyce/elements/bookI/propI1.html). The Archimedes Palimpsest project's [account by Reviel Netz](https://www.archimedespalimpsest.org/about/scholarship/archimedes-manuscript.php) explains the manuscript evidence that preserves the Method and the importance of comparing its text and diagrams with other witnesses.

The early history of Greek mathematics is often known through later testimony. Personal anecdotes, exact priority claims, and a universal “crisis” caused by incommensurability are therefore not used to fill gaps in the evidence. Likewise, similarities between Greek and Chinese approximation or dissection methods do not by themselves establish direct transmission.

**The Middle Ages (Fourth–Fifteenth Centuries)**

The ten subsections follow the ten entries for this period in the Chinese outline. The seventh heading extends into the early fourteenth century to include Zhu Shijie's 1303 work. Later Kerala texts are identified as evidence for the earlier tradition, not silently assigned to Madhava's lifetime. Modern symbols and normalized quantities make the operations readable without attributing that notation to the historical authors.

| Subsection | Principal material and its role |
| --- | --- |
| 1. Precision and the Geometry of Solids in China | J. C. Martzloff, “Chinese Mathematics,” §1.9 in the [Companion Encyclopedia][C-source], on Zu Chongzhi, lost works, and the commentary tradition. Donald B. Wagner's [translation and analysis of the sphere arguments](https://www.donwagner.dk/SPHERE/SPHERE.html) supplies the comparison of sections and discusses textual attribution. |
| 2. Place Value, Zero, and Signed Numbers | Takao Hayashi, “Indian Mathematics,” §1.12 in the [Companion Encyclopedia][C-source], especially Brahmagupta's treatment of signed quantities and division by zero. The distributive-law argument and the distinction between no quotient and no unique quotient are modern explanations. |
| 3. Astronomy, Integer Problems, and Sanskrit Mathematical Verse | Hayashi, §1.12, on sine tables, the pulverizer, composition, and cyclic procedures; “Sanskrit mathematical verse,” §6.2 in the [Oxford Handbook][O-source], on verse, commentary, and the relationship between oral and written instruction. The integer examples are selected for exposition. |
| 4. Translation and the Organization of Algebra | J. P. Hogendijk, “Pure mathematics in Islamic civilization,” §1.6 in the [Companion Encyclopedia][C-source], on equation types and geometrical justification; “Patronage of the mathematical sciences in Islamic societies,” §4.1 in the [Oxford Handbook][O-source], on the varied institutional settings. The quadratic example is expressed in modern symbols, with a simplified arrangement illustrating completion of the square. |
| 5. Cubic Equations | Hogendijk, §1.6, on Khayyam, conic solutions, and Sharaf al-Din al-Tusi's comparisons; “Mathematics Applied to Aspects of Religious Ritual in Islam,” §1.7 in the [Companion Encyclopedia][C-source], for the wider uses of geometry. The cubic with coefficient 3 is a modern explanatory example of bounding an expression, not a transcription of a particular medieval proof. |
| 6. New Mathematical Networks in Latin Europe | “Later Greek and Byzantine mathematics,” §1.5, “Euclidean and Archimedean traditions in the Middle Ages and the Renaissance,” §2.1, and W. Van Egmond, “Abbacus arithmetic,” §2.4 in the [Companion Encyclopedia][C-source]; “The transmission of the Elements to the Latin West: three case studies,” §8.1 in the [Oxford Handbook][O-source]. The partnership example is illustrative, and its allocation rule is explicitly assumed. |
| 7. Remainders, Unknowns, and Polynomial Procedures | Martzloff, §1.9, on Qin Jiushao, Li Ye, Zhu Shijie, positional representations, elimination, and extraction of roots. The remainders 2, 3, and 2 are the familiar Sunzi problem; its treatment here illustrates the framework rather than reproducing Qin's complete procedure. The two-unknown example is modern and deliberately elementary. |
| 8. Representing Change | A. G. Molland, “Medieval and Renaissance mechanics,” §2.6 in the [Companion Encyclopedia][C-source]; Kline's discussion of the Oxford Calculators and Oresme in [Mathematical Thought][K-source]. The notation for speed, duration, and distance is modern; the numerical example illustrates the mean-speed relation under its stated assumption. |
| 9. Infinite Series in Kerala | Hayashi, §1.12, on Madhava, trigonometric series, correction terms, and the limitations of attribution. V. N. Krishnachandran's [study of the correction terms](https://arxiv.org/html/2405.11134v1) brings together Sanskrit passages, translations, and mathematical analysis. The ten-term comparison is independently calculated for this chapter. |
| 10. Manuscripts, Tables, and Print | “Abbacus arithmetic,” §2.4, and “The teaching of mathematics in the Middle Ages and the Renaissance,” §2.11 in the [Companion Encyclopedia][C-source], together with the Oxford chapter on the Latin Elements. The [ISMI record for al-Kashi's Key to Arithmetic](https://ismi.mpiwg-berlin.mpg.de/text/130763?page=1) identifies its date and contents; the University of Glasgow's [record of the 1482 Euclid](https://www.gla.ac.uk/myglasgow/incunabula/a-zofauthorsa-j/e5/) verifies the Venice printing. |

The materials preserve results and explanations unevenly. Zu Chongzhi's numerical achievement does not supply the missing contents of the Zhuishu; the sphere commentaries have problems of attribution; later Kerala explanations do not establish every step of Madhava's original discoveries. These limits matter to the account of methods, not merely to biographical detail. Likewise, similar algorithms in different traditions do not by themselves prove a particular route of transmission.

The source transcriptions contain damaged mathematical notation and occasional historical imprecision. Formulas used here have been reconstructed and checked independently. Decimal points, factorials, summation signs, the letter pi, and present-day equation notation serve the exposition; they are not claims about the original appearance of the texts.

**The Renaissance to the Mid-Seventeenth Century (c. 1500–1650)**

The ten subsections correspond in order to the ten entries for this period in the Chinese outline. The sequence follows that outline rather than enforcing strict year-by-year order among overlapping investigations. The equations use modern symbols to expose the reasoning; they do not reproduce the notation of the original editions.

| Subsection | Principal material and its role |
| --- | --- |
| 1. Cubic and Quartic Equations | Kline, chapter 13, “Arithmetic and Algebra in the Sixteenth and Seventeenth Centuries,” in [Mathematical Thought][K-source], especially the discussion of third- and fourth-degree equations; “The 'Coss' Tradition in algebra,” §2.3, and “The Philosophy of Algebra,” §6.9 in the [Companion Encyclopedia][C-source]. The unified cubic derivation and the quartic auxiliary equation are modern reconstructions, with sign choices and exceptional cases distinguished from a complete historical case analysis. |
| 2. Copernicus | K. P. Moesgaard, “Astronomy,” §2.7 in the [Companion Encyclopedia][C-source]; Kline, chapters 12 and 16, on the reorganization of astronomy and its physical difficulties. The Library of Congress preserves [the planetary-system diagram from the 1543 De revolutionibus](https://www.loc.gov/item/92516366/), documenting the arrangement in the published work. |
| 3. Bombelli | Kline, chapter 13; “Complex Numbers and Vector Algebra,” §6.2, and “The Philosophy of Algebra,” §6.9 in the [Companion Encyclopedia][C-source]. The equation is Bombelli's historical example; the symbol i, factorization, and explicit explanation of compatible cube-root choices are modern aids. |
| 4. Viète | Kline, chapter 13; “The Philosophy of Algebra,” §6.9, especially “Viéte's Analytic Art and Symbolic Logistic,” in the [Companion Encyclopedia][C-source]. The sum-and-product example illustrates parameter-dependent reasoning; its symbols and discriminant language are not quotations from Viète. |
| 5. Kepler | Moesgaard, §2.7; Kline, chapter 16, “The Mathematization of Science.” The period-and-distance example uses hypothetical normalized values, not observations of a named planet. The account distinguishes observational laws, numerical implementation, and Kepler's search for physical causes. |
| 6. Galileo | A. G. Molland, “Medieval and Renaissance Mechanics,” §2.6 in the [Companion Encyclopedia][C-source]; Kline, chapter 16. The Museo Galileo's [experimental-research account](https://www.imss.fi.it/istituto/egalsci.html) identifies the early investigations and their presentation in the 1638 Two New Sciences. The modern projectile equations assume a horizontal launch and downward-positive vertical displacement. Rolling motion on an incline is not equated with free fall. |
| 7. Logarithms | Wolfgang Kaunzner, “Logarithms,” §2.5 in the [Companion Encyclopedia][C-source], on Napier's motion-based definition, sine tables, and Briggs's decimal tables. The Library of Congress's [record of Napier's 1614 work](https://www.loc.gov/item/04005707/) supplies an original-edition reference. The numerical multiplication example uses modern common logarithms and rounded table values, not Napier's original normalization. |
| 8. Coordinate Methods | Kline, chapter 15, “Coordinate Geometry”; “Algebraic and analytic geometry,” §7.1 in the [Companion Encyclopedia][C-source]. The focus-directrix example and line intersection are explanatory reconstructions with modern Cartesian coordinates. |
| 9. Perspective and Projective Geometry | Kline, chapter 14, “The Beginnings of Projective Geometry”; “Projective geometry,” §7.6 in the [Companion Encyclopedia][C-source], on Desargues, Pascal, projection, and difficulties of reception. The interpretation of points at infinity is stated in modern language; a later axiomatic framework is not attributed to the seventeenth-century authors. |
| 10. Mathematical Certainty and Nature | Kline, chapters 11 and 16; “The Philosophical Context of Medieval and Renaissance Mathematics,” §2.12, and Moesgaard's “Astronomy,” §2.7 in the [Companion Encyclopedia][C-source]. Broad claims about a shared religious or philosophical outlook are qualified by differences among the thinkers and their methods. |

The distinction between a mathematical result and its physical interpretation runs throughout the chapter. Copernicus's reorganization did not immediately settle the mechanics of a moving Earth; Kepler sought causes without possessing the later theory of gravitation; Galileo's demonstrations depend on idealized conditions. Likewise, the practical success of complex arithmetic or literal coefficients should not be read as immediate acceptance of the modern number system.

The cubic and quartic identities, Bombelli calculation, parameter examples, coordinate transformations, and logarithmic approximation have been checked independently. No general theory of complex root selection, arbitrary functions, or projective space is presumed to have existed in its later form.

**The Later Seventeenth and Eighteenth Centuries (c. 1650–1800)**

The eleven subsections follow the eleven entries for this period in the Chinese outline. The opening subsection looks back to preparations before 1650; subsequent developments are grouped by their mathematical connections rather than placed in strict year-by-year order. Modern notation makes the operations explicit without attributing later definitions and terminology to the historical authors.

| Subsection | Principal material and its role |
| --- | --- |
| 1. Preparing Calculus | Kirsti Andersen, “Precalculus, 1635–1665,” §3.1 in the [Companion Encyclopedia][C-source], on indivisibles, tangent and extremum procedures, quadrature, and geometrical connections. The rectangle example reconstructs the computational structure of Fermat's method; the separate completed-square identity verifies the maximum. |
| 2. Fair Division | “Combinatorial Probability,” §10.1, and Glenn Shafer, “The Early Development of Mathematical Probability,” §10.2 in the [Companion Encyclopedia][C-source]. The one-win-versus-two-win game and 64-unit stake are explanatory choices, not quotations from a particular letter. Independent, equally probable rounds are explicit assumptions. |
| 3. Newton's Fluxions | Niccolò Guicciardini, “Three Traditions in the Calculus: Newton, Leibniz and Lagrange,” §3.2, together with “Infinite Series and Solutions of Ordinary Differential Equations, 1670–1770,” §4.3 in the [Companion Encyclopedia][C-source]. The area-growth argument and fundamental-theorem formula use modern language and an explicit continuity assumption. |
| 4. Leibniz's Calculus | Guicciardini, §3.2, on differences, summation, notation, and the independence of the two principal developments. The MAA's reproductions of the original [1684 differential-calculus paper](https://old.maa.org/press/periodicals/convergence/mathematical-treasure-leibnizs-papers-on-calculus-differential-calculus) and [1686 integration paper](https://old.maa.org/press/periodicals/convergence/mathematical-treasure-leibnizs-papers-on-calculus-integral-calculus) document the publication sequence. The composite-function example is modern. |
| 5. Newton's Mechanics | “Classical mechanics,” §8.1, and “Astronomy,” §2.7 in the [Companion Encyclopedia][C-source]. The notation G and the relative two-body derivation are modern. The period formula includes both masses and distinguishes the relative orbit from either body's individual orbit about the centre of mass. |
| 6. Foundations | Guicciardini, §3.2, especially the discussion of Berkeley and Maclaurin; Berkeley's [The Analyst (1734)](https://www.maths.tcd.ie/pub/HistMath/People/Berkeley/Analyst/Analyst.html), in the Trinity College Dublin transcription based on the first editions. The error identity for the square function is a modern explanation of a limit, not a claim that all contemporary authors used this formulation. |
| 7. Expansion of Analysis | Guicciardini, §3.2, and §4.3 in the [Companion Encyclopedia][C-source], on functions, series, differential equations, and divergent expressions. The exponential recurrence and geometric partial-sum calculation illustrate the difference between formal operations and convergence-based justification. |
| 8. Vibrating Strings | “Partial Differential Equations,” §3.15, especially “The First Solutions of PDEs: the Vibrating String,” and “Acoustics,” §9.8 in the [Companion Encyclopedia][C-source]. Modern partial-derivative notation is used. The discussion separates travelling profiles, endpoint conditions, standing modes, and the regularity problems raised by a plucked shape. |
| 9. Variations and Analytical Mechanics | Craig G. Fraser, “Calculus of variations,” §3.5, “Classical mechanics,” §8.1, and Guicciardini, §3.2 in the [Companion Encyclopedia][C-source]. The first-variation calculation assumes smoothness and fixed endpoints. The brachistochrone integral has an endpoint where the initial speed is zero and is interpreted by a limiting integral. Later Hamiltonian formulations are not assigned to Lagrange's 1788 work. |
| 10. Repetition and Inference | Shafer, §10.2, and “Combinatorial Probability,” §10.1 in the [Companion Encyclopedia][C-source]; Bayes's [posthumous essay communicated by Price](https://bayes.wustl.edu/Manual/an.essay.pdf), bearing the 1763 journal date. The law-of-large-numbers statement, standard-deviation formula, and two-urn update are modern presentations. The urn example is not Bayes's original continuous-parameter problem. |
| 11. Accounts of Certainty | “The philosophy of geometry to 1900,” §7.8, and “Philosophies of Probability,” §10.17 in the [Companion Encyclopedia][C-source]; Hume's [Enquiry, Section IV](https://davidhume.org/texts/e/4), and Kant's [Critique of Pure Reason](https://www.gutenberg.org/files/4280/4280-h/4280-h.htm). The philosophical positions are presented as accounts of knowledge, not as mathematical consequences of successful calculation. |

The historical distinctions are essential to the chapter's argument. Newton's explanations evolved; Leibnizian differentials were not simply finite increments with inconvenient terms deleted; eighteenth-century work with divergent series involved questions of meaning as well as convergence. The vibrating-string debate cannot be reduced to one participant already holding every feature of the modern function concept.

The source transcriptions contain damaged equations and inconsistent typography. The displayed identities, derivative rules, series coefficients, two-body relation, wave solutions, and probability calculations have been checked independently. Modern regularity and modelling assumptions identify the scope of the explanations; they are not silently attributed to the earliest authors.

[C-source]: <../../../../todos/_10_materials/HistoryOfMathematics/Companion Encyclopedia of the History and Philosophy of the Mathematical Sciences (I. Grattan-Guinness) (z-library.sk, 1lib.sk, z-lib.sk)/Companion Encyclopedia of the History and Philosophy of the Mathematical Sciences (I. Grattan-Guinness) (z-library.sk, 1lib.sk, z-lib.sk).md>
[O-source]: <../../../../todos/_10_materials/HistoryOfMathematics/Oxford Handbook of the History of Mathematics (Oxford Handbooks) (Eleanor Robson, Jacqueline Stedall) (z-library.sk, 1lib.sk, z-lib.sk)/Oxford Handbook of the History of Mathematics (Oxford Handbooks) (Eleanor Robson, Jacqueline Stedall) (z-library.sk, 1lib.sk, z-lib.sk).md>
[K-source]: <../../../../todos/_10_materials/HistoryOfMathematics/Mathematical Thought from Ancient to Modern Times (3-volume-set) (Morris Kline) (z-library.sk, 1lib.sk, z-lib.sk)/Mathematical Thought from Ancient to Modern Times (3-volume-set) (Morris Kline) (z-library.sk, 1lib.sk, z-lib.sk).md>
