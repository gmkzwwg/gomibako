---
layout: print
title: Mumbagrrr OOO-RAGH Blubblub!
show_context_menu: false
permalink: /catelog
anticopy: true
---

## Roadmap

*A long-term inquiry into the limits of human knowledge and the nature of humanity and the world: what can be known, where knowing fails, and how human beings stand within reality.*

Notation: **[C] Core**, **[S] Support**, **[E] Extension**

### TRUNK 1 — The Logic–Computation–Language Axis (the spine)

#### 1.1 First convergence

* **[C]** Discrete Mathematics & Proof — proof construction; induction, relations, functions, and combinatorial arguments
* **[C]** Mathematical Logic — *Mathematical Logic and Computation* — syntax, satisfaction, consequence, soundness, and first-order completeness
* **[C]** Naive Set Theory — sets, functions, relations, countability, and cardinality
* **[C]** Theory of Computation — automata, Turing machines, decidability; distinguish computability from efficiency
* **[S]** Philosophy: Frege, early Russell, *Tractatus Logico-Philosophicus* (Tractatus) — logical analysis and the limits of representation; language branch in 4.1

#### 1.2 The Gödel Pivot

* **[S]** Hofstadter, *Gödel, Escher, Bach* — **Evergreen** — self-reference, recursion, formal systems, and cognition
* **[C]** Computability & Recursion Theory — reductions, enumerable sets, undecidability, and limits of effective procedures
* **[C]** Gödel's Incompleteness Theorems — effective axiomatization, arithmetic, consistency, and unprovability → 4.6 / 5.4
* **[S]** Read originals: Gödel 1931, Turing 1936, Church 1936 — arithmetization, effective procedure, and the original formulations of undecidability
* **[C]** Tarski on truth, semantic paradoxes — truth, definability, semantic paradoxes; distinguish object language from metalanguage
* **[C]** Elementary Model Theory & Limits of Axiomatization — structures, compactness, Löwenheim–Skolem, nonstandard models, and intended interpretations → 4.4
* **[C]** Proof Theory — natural deduction, inference rules, formal derivations; proof transformation connects to types in 1.3

#### 1.3 Lambda Calculus, Types & Proofs

* **[S]** *Structure and Interpretation of Computer Programs* (SICP) — interpreters, environments, evaluation, and abstraction [Link]({{ '/comp/n.SICP.Notes.ez/' | relative_url }})
* **[C]** Lambda Calculus & Combinatory Logic — binding, substitution, α-conversion, β-reduction, and confluence
* **[C]** Operational Semantics & Simple Types — *Types and Programming Languages* (TAPL) — evaluation rules, typing judgments, and simply typed terms
* **[C]** Type Safety & Normalization — progress, preservation, termination; distinguish safety from normalization
* **[C]** Curry–Howard Correspondence — propositions as types, proofs as terms, and proof reduction as computation
* **[S]** *Software Foundations*, Vol. 1: *Logical Foundations* (Rocq) — inductive definitions, propositions, and machine-checked proofs
* **[S]** *Mathematics in Lean* (Lean4 + Mathlib) — definitions, theorem statements, proof construction, and library use
* **[S]** Program Logics — Hoare triples, invariants, separation logic, and specifications
* **[S]** Formal Software Verification (CompCert, seL4 case studies) — specifications, correctness arguments, and the trusted computing base
* **[E]** Compilers — parsing, intermediate representations, translation, and preservation of program behavior

#### 1.4 Dependent Types, Semantics & Foundations

* **[C]** Dependent Type Theory — contexts, dependent functions and pairs, induction, identity types, and universes; foundations branch, after 1.3
* **[S]** Denotational Semantics — compositional interpretation, domains, fixed points, adequacy, and full abstraction; after operational semantics
* **[S]** Category Theory (Awodey) — objects, morphisms, functors, natural transformations, limits, and adjunctions
* **[S]** Categorical Logic & Curry–Howard–Lambek — Lawvere 1969 and selected papers; categorical interpretations of types, proofs, and logical operations
* **[S]** Linear Algebra — Categorical Perspective — vector spaces, linear maps, duality, tensor products; after linear algebra (2.1), categories, and functors
* **[S]** *Category Theory for Programmers* (Milewski) — functors, monads, effects, and categorical patterns in programs
* **[E]** Homotopy Type Theory — *Homotopy Type Theory: Univalent Foundations of Mathematics* (HoTT Book) — paths, univalence, higher inductive types, and cubical type theory; after dependent types → 4.4

#### 1.5 Feedback, Information & Complex Systems

* **[E]** Cybernetics & Systems Theory (Wiener, Ashby, Bateson) — feedback, regulation, communication, and self-organization → 6.3
* **[E]** Bateson, *Mind and Nature* / *Steps to an Ecology of Mind* — **Evergreen** — learning, ecology, and relational accounts of mind
* **[E]** Wiener, *The Human Use of Human Beings* — **Evergreen** — automation, communication, control, and human freedom
* **[E]** Information Theory (Shannon, MacKay) — entropy, coding, channel capacity; distinguish information measures from semantic meaning
* **[E]** Complexity Science (Mitchell, Holland) — emergence, adaptation, collective behavior, and limits of prediction

### TRUNK 2 — Mathematical Support & Exploration

#### 2.1 Algebraic core

* **[S]** Linear Algebra (Axler) — vector spaces, linear maps, eigenstructure, inner products, and canonical forms [Link]({{ '/math/n.Linear.Algebra.Overview.en/' | relative_url }})
* **[S]** Abstract Algebra (Aluffi, *Algebra: Chapter 0*) — groups, rings, modules, fields; structures, homomorphisms, and universal properties
* **[E]** Galois Theory — field extensions, symmetry groups, solvability, and the Galois correspondence
* **[E]** Commutative Algebra — ideals, modules, localization, prime spectra, and local algebra
* **[E]** Algebraic Geometry — polynomial equations, varieties, schemes, and the algebra–geometry correspondence
* **[E]** Algebraic Number Theory — algebraic integers, ideals, units, ramification, and local–global questions

#### 2.2 Analytic core

* **[E]** Mathematical Analysis I–II — limits, continuity, differentiation, integration, convergence, compactness, and metric spaces; after basic proof [Link]({{ '/math/n.Mathematical.Analysis.Overview.ez/' | relative_url }})
* **[E]** Real Analysis / Measure Theory — measurability, Lebesgue integration, convergence theorems, and function spaces
* **[E]** Complex Analysis — holomorphic functions, contour integration, analytic continuation, residues, and singularities
* **[E]** Functional Analysis — Banach and Hilbert spaces, linear operators, duality, and spectral theory
* **[E]** Constructive Analysis (Bishop) — constructive existence, effective approximation, and the computational content of analysis
* **[E]** Harmonic Analysis — Fourier representations, convolution, frequency localization, and function-space estimates

#### 2.3 Geometry & Topology

* **[S]** Point-Set Topology — open sets, continuity, compactness, connectedness, and product and quotient spaces
* **[E]** Differential Geometry / Manifolds — smooth manifolds, tangent spaces, differential forms, and coordinate-independent calculus
* **[E]** Algebraic Topology (Hatcher) — fundamental groups, covering spaces, homology, and homotopy invariants
* **[E]** Riemannian Geometry — metrics, connections, geodesics, curvature, and local–global geometric structure

#### 2.4 Probability & Statistics — the epistemology lab

* **[E]** Introductory Probability (Blitzstein or Ross) — conditional probability, independence, random variables, expectation, and limit laws; calculus for continuous distributions
* **[E]** Measure-theoretic Probability — probability spaces, conditional expectation, convergence modes, and probabilistic limit theorems
* **[E]** Mathematical Statistics — estimation, hypothesis testing, uncertainty quantification, and statistical model assumptions
* **[E]** Stochastic Processes / Martingales — random evolution, Markov processes, conditional expectation, stopping times, and convergence
* **[E]** Bayesian Inference & Decision Theory — prior assumptions, posterior updating, predictive inference, utility, and decision rules
* **[E]** Causal Inference & Model Evaluation — observation, intervention, confounding, identifiability, model checking, and sensitivity to assumptions → 4.5 / 4.6 / 6.3
* **[E]** Formal Epistemology — Bayesian confirmation, epistemic logic, belief revision, and formal learning theory
* **[E]** Information Geometry — statistical manifolds, Fisher information, divergence, and the geometry of inference

#### 2.5 Dynamical Systems, Differential Equations & Inverse Problems

* **[E]** Ordinary Differential Equations & Dynamical Systems — existence, stability, bifurcations, chaos, synchronization, and prediction
* **[E]** Partial Differential Equations — boundary conditions, well-posedness, weak solutions, and wave, diffusion, and equilibrium models
* **[E]** Calculus of Variations — functionals, stationary action, Euler–Lagrange equations, constraints, and variational principles
* **[E]** Inverse Problems & Uncertainty Quantification — identifiability, stability, regularization, sensitivity, and uncertainty propagation; after 2.4 and analysis → 4.5 / 5

### TRUNK 3 — Computer Science Support & Exploration

#### 3.1 Algorithms, Complexity & Computation

* **[S]** Algorithms & Data Structures — *Introduction to Algorithms* (CLRS) — problem decomposition, algorithmic correctness, data representation, and time–space tradeoffs
* **[S]** Computational Complexity (Arora–Barak) — resource bounds, reductions, complexity classes, randomness, hardness, and approximation
* **[E]** Cryptography — security definitions, computational assumptions, reductions, encryption, authentication, and protocols
* **[E]** Quantum Computing (Nielsen–Chuang) — qubits, quantum circuits, algorithms, entanglement, measurement, and error correction
* **[E]** Program Synthesis — specifications, program search, constraint solving, correctness, and synthesis from examples

#### 3.2 Learning, Representation & Understanding

* **[E]** Machine Learning (Bishop / Murphy) — inductive assumptions, learnability, generalization, interpolation, and model evaluation
* **[E]** Deep Learning & LLM internals — representations, optimization, attention, language-model training, inference, and scaling behavior
* **[E]** Mechanistic Interpretability — representations, interventions, causal abstraction, explanatory fidelity, and understanding → 4.2 / 4.6
* **[E]** AI Alignment — objectives, preferences, oversight, behavioral evaluation, and failure modes
* **[E]** Reinforcement Learning — sequential decisions, reward, exploration, value functions, and policy learning

#### 3.3 Systems & Engineering

* **[E]** Computer Architecture — instruction sets, processors, memory hierarchies, parallelism, and performance tradeoffs
* **[E]** Operating Systems — processes, concurrency, memory management, storage, isolation, and resource allocation
* **[E]** Computer Networks — layered protocols, routing, transport, congestion, and reliable communication
* **[E]** Databases — data models, query processing, indexing, transactions, and consistency guarantees
* **[E]** Distributed Systems — concurrency, partial failure, replication, consensus, and consistency models

### TRUNK 4 — Philosophy-of-Language Branch & Philosophical Extensions

#### 4.1 Sense, Reference & Logical Form — *language branch; background: basic logic*

* **[C]** Sense & Reference — Frege — sense, reference, compositionality, and logical form
* **[C]** Descriptions & Logical Analysis — Russell, “On Denoting” — definite descriptions, quantification, and logical analysis
* **[C]** Representation & the Limits of Language — Wittgenstein, *Tractatus Logico-Philosophicus* (Tractatus) — propositions, representation, logical form, and the limits of saying

#### 4.2 Truth, Reference & Language Use — *Tarski on the shared spine; other entries on the language branch*

* **[C]** Truth & Satisfaction — Tarski — truth, satisfaction, object language and metalanguage; connect formal semantics to 1.2
* **[S]** Context & Pragmatics — common ground, presupposition, assertion, and context update → 6.1
* **[C]** Analyticity, Translation & Holism — Quine, “Two Dogmas of Empiricism” + *Word and Object* — analyticity, translation, ontological commitment, and the web of belief
* **[C]** Reference, Modality & Rule-Following — Kripke, *Naming and Necessity* / *Wittgenstein on Rules and Private Language* — rigid designation; necessity versus a priori knowledge; rule-following and skeptical interpretations
* **[C]** Meaning as Use & Language Practice — Wittgenstein, *Philosophical Investigations* — meaning as use, language-games, rule-following, private language; behavior, mechanism, and understanding in LLMs → 3.2 / 4.6

#### 4.3 Epistemology — introductory and contemporary

* **[E]** Introductory Epistemology — knowledge, belief, justification, skepticism, evidence, and testimony
* **[E]** Williamson, *Knowledge and Its Limits* — knowledge-first epistemology, evidence, and the limits of luminosity
* **[E]** Hacking, *The Emergence of Probability* — the historical formation of probability, evidence, and rational expectation
* **[E]** Goldman / virtue epistemology — reliability, epistemic virtues, and the sources of justification
* **[E]** Formal Epistemology — confirmation, rational belief, epistemic logic, and belief revision → 2.4
* **[E]** Social Epistemology & Belief Networks — testimony, trust, communication, and collective inquiry → 6.3 / 6.5

#### 4.4 Philosophy of mathematics

*Background: basic proof and mathematical examples; additional logic, algebra, or analysis as required by the selected text.*

* **[S]** Shapiro, *Thinking About Mathematics* — logicism, formalism, intuitionism, structuralism, and mathematical ontology
* **[S]** Lakatos, *Proofs and Refutations* — **Evergreen** — proofs, counterexamples, concept revision, and mathematical practice
* **[S]** Benacerraf's papers — mathematical objects, reference, truth, and epistemic access
* **[S]** Structuralism, fictionalism, neologicism — what mathematical objects are; how formal frameworks bear on philosophical commitments → 1.2 / 1.4

#### 4.5 Philosophy of science — *after Trunk 2.4*

* **[E]** Godfrey-Smith, *Theory and Reality* — induction, evidence, explanation, scientific change, and realism
* **[E]** Kuhn, Lakatos (*The Methodology of Scientific Research Programmes*), Feyerabend — paradigms, research programmes, methodological pluralism, and theory choice
* **[E]** Cartwright, *How the Laws of Physics Lie* — idealization, causal capacities, laws, and the limits of models → 2.4
* **[E]** Scientific Representation & Models — representation, idealization, abstraction, robustness, and model–world relations → 1.2 / 2.4 / 5

#### 4.6 Philosophy of mind & cognitive science

* **[E]** Cognitive Science Basics — attention, memory, perception, representation, prediction, and cognitive bias
* **[E]** Evolution & Cognition — natural selection, adaptation, organism–environment relations, and the origins of cognitive capacities → 6.3
* **[E]** Dennett, *Consciousness Explained* — heterophenomenology, multiple drafts, and functional explanations of consciousness
* **[E]** Chalmers, *The Conscious Mind* — the hard problem, explanatory gaps, and arguments against reductive physicalism
* **[E]** Nagel, “What Is It Like to Be a Bat?” — subjective experience and the limits of an objective description
* **[E]** Comparing & Testing Theories of Consciousness — rival predictions, experimental measures, preregistration, and adversarial collaboration → 2.4 / 4.5
* **[E]** Marr, *Vision* — computational, algorithmic, and implementational levels of explanation
* **[E]** Computational Models of Cognition — resource rationality, memory, time, computational cost, and task performance; after probability → 3.2
* **[E]** Fodor, *The Language of Thought* — mental representation, compositionality, and the language-of-thought hypothesis
* **[E]** Clark, *Surfing Uncertainty* / 4E cognition — predictive processing and embodied, embedded, enactive, extended cognition
* **[E]** Merleau-Ponty, *Phenomenology of Perception* (selections) — embodiment, perception, motor intentionality, and lived experience

#### 4.7 Philosophical Extensions

* **[E]** Husserl (selections) — intentionality, phenomenological description, and the lifeworld
* **[E]** Foucault, Derrida (in French if possible) — genealogy, discourse, textual interpretation, and deconstruction
* **[E]** Deleuze, *Difference and Repetition* — difference, repetition, identity, and the production of concepts
* **[E]** Deleuze & Guattari, *A Thousand Plateaus* — **Evergreen** — assemblages, multiplicities, territorialization, and conceptual experimentation

### TRUNK 5 — Physics Support & Exploration

#### 5.1 Classical

* **[E]** Classical Mechanics (Taylor → Goldstein) — Newtonian dynamics, conservation laws, oscillations, and normal modes
* **[E]** Lagrangian & Hamiltonian Mechanics — variational principles, generalized coordinates, Hamiltonian flow, and symmetries
* **[E]** Electromagnetism (Griffiths → Jackson selections) — fields, Maxwell equations, electromagnetic waves, and radiation
* **[E]** Statistical Mechanics & Thermodynamics (Sethna) — microstates, ensembles, entropy, phase transitions, and emergence
* **[E]** Continuum Mechanics / Fluids — conservation laws, Euler and Navier–Stokes equations, vorticity, and flow

#### 5.2 Modern

* **[E]** Special Relativity — Lorentz transformations, spacetime intervals, causality, and relativistic kinematics
* **[E]** Quantum Mechanics (Griffiths → Sakurai) — states, amplitudes, observables, dynamics, and entanglement; after waves, differential equations, and linear algebra
* **[E]** General Relativity (Carroll) — curved spacetime, geodesics, Einstein equations, and gravitation
* **[E]** Quantum Field Theory (Tong's lecture notes — *primary*; Peskin & Schroeder as [E] follow-up) — fields, quantization, interactions, and renormalization; after quantum mechanics, special relativity, and Lagrangian mechanics
* **[E]** Effective Theories, Scales & Emergence — scale separation, degrees of freedom, universality, approximation, and validity; after quantum mechanics, QFT as needed → 4.5

#### 5.3 Frontier Topics

* **[E]** Standard Model — gauge symmetry, particle content, symmetry breaking, and experimental tests
* **[E]** String Theory (Polchinski I–II / Becker–Becker–Schwarz) — worldsheets, spectra, extra dimensions, and candidate quantum-gravity descriptions
* **[E]** M-Theory & Dualities — dualities, branes, and relations among conjectured quantum-gravity descriptions
* **[E]** Cosmology (Baumann / Mukhanov / Weinberg) — expansion, thermal history, perturbations, observational constraints, and model dependence → 2.4
* **[E]** Loop Quantum Gravity — quantum geometry, spin networks, and an alternative approach to quantum gravity

#### 5.4 Foundational physics & philosophy

* **[E]** Foundations of Quantum Mechanics — measurement, Bell correlations, decoherence, and interpretations
* **[E]** Quantum Contextuality & Operational Reconstructions — contextuality, operational principles, experimental constraints, and alternative theories; after quantum basics → 3.1
* **[E]** Philosophy of Physics (Maudlin, Wallace) — laws, spacetime, probability, ontology, and what physical theories explain
* **[E]** Penrose, *The Road to Reality* — **Evergreen** — mathematical structures, physical theories, and foundational proposals; distinguish established results from speculation

### TRUNK 6 — Secondary Humanities

* **[E]** French (reading-focused) — reading comprehension, grammatical structure, terminology, and sustained engagement with original texts

#### 6.1 Linguistics — *after Trunk 4.2*

* **[S]** Saussure, *Course in General Linguistics* — linguistic signs, differential value, langue and parole, synchronic and diachronic analysis
* **[S]** Natural-Language Formal Semantics — composition, types, lambda abstraction, quantification, and scope; after basic logic → 1.3 / 4.2
* **[S]** Pinker, *The Language Instinct* — language acquisition, grammatical structure, and the case for innate linguistic capacities
* **[E]** Chomsky, *Syntactic Structures* / minimalism — generative grammars, transformations, syntactic structure, and the minimalist program
* **[E]** Cognitive linguistics (Lakoff) — conceptual metaphor, categorization, embodiment, and relations between language and cognition

#### 6.2 Psychoanalysis (Lacanian) — *after Trunks 4.2 + 6.1*

* **[E]** Fink, *The Lacanian Subject* — subject formation, the unconscious, desire, and Lacanian conceptual distinctions
* **[E]** Lacan, *Écrits* (selected) — the mirror stage, signifiers, desire, and the divided subject
* **[E]** Lacan, *Seminars* II, XI, XX — ego, unconscious, repetition, transference, desire, jouissance, and sexuation
* **[E]** Žižek as bridge to ideology critique — ideology, fantasy, enjoyment, and the contradictions of social identification

#### 6.3 Sociology — *background: 2.4; 6.2 for psychoanalytic approaches*

* **[E]** Empirical Social Research — observation, surveys, experiments, measurement, and research design → 2.4 / 4.3
* **[E]** Weber, *The Protestant Ethic and the Spirit of Capitalism* + *Economy and Society* (selections) — social action, rationalization, authority, religion, capitalism, and interpretive explanation
* **[E]** Bourdieu, *Distinction* + *The Logic of Practice* — habitus, fields, capital, distinction, practice, and social reproduction
* **[E]** Luhmann, *Social Systems* — communication, autopoiesis, system–environment distinctions, complexity, and functional differentiation
* **[E]** Foucault, *Discipline and Punish* / *The History of Sexuality* — disciplinary power, normalization, sexuality, knowledge, and the formation of subjects
* **[E]** Cultural Evolution & Cooperation — social learning, cumulative culture, norms, and cooperation → 4.6

#### 6.4 History

* **[E]** Big-picture: Hobsbawm tetralogy / 许倬云 — historical change, institutions, modernization, and connections across societies
* **[E]** Intellectual history: Tony Judt, Isaiah Berlin — political ideas, historical contexts, intellectual commitments, liberty, and pluralism
* **[E]** History of science: Kuhn, Galison — scientific change, paradigms, instruments, practices, and coordination across research traditions

#### 6.5 Media & communication — *background: feedback and communication concepts from 1.5*

* **[E]** McLuhan, *Understanding Media* — media forms, sensory organization, cultural change, and technologies as extensions
* **[E]** Kittler, *Gramophone, Film, Typewriter* — recording technologies, technical materiality, discourse networks, and conditions of cultural production

### TRUNK 7 — Literary Output

* **[S]** Writing as Practice — research questions, evidence, argument, sentence craft, and revision
* **[E]** Possible Worlds, Narrative & Fiction — fictional worlds, reader inference, modality, and narrative form → 4.2 / 6.5
* **[E]** Calvino, *Six Memos for the Next Millennium* / *Cosmicomics* / *If on a winter's night a traveler* — **Evergreen** — precision, lightness, multiplicity, formal constraint, and cosmological imagination
* **[E]** Models — sense-makers: Borges (*Ficciones* / *El Aleph*, **Evergreen**), Sebald, Lispector, Bolaño short fiction, Annie Dillard, John Berger — voice, perception, memory, narrative form, and the interpretation of experience
* **[E]** Models — formal-constraint tradition: Calvino (see Evergreen entry), Perec *Life: A User's Manual*, Queneau *Exercises in Style*, OuLiPo selections — combinatorial structures, formal constraints, narrative possibilities, and literary experimentation
* **[E]** Models — math/philosophy-saturated fiction: Wallace, *Infinite Jest* / Chiang, *Exhalation* — philosophical premises, narrative causality, and human consequences
* **[E]** Personal essay / short fiction practice — develop inquiry into evidence-led essays or premises into scenes, choices, and consequences
* **[E]** Long-form attempt — sustain a larger argument or narrative through structure, development, and revision

## Explanation

### The Two Goals as One Question

The two goals meet in one question: **How can human beings, themselves part of the world, understand it—and what enables and limits that understanding?** The first goal examines the conditions, capacities, and limits of knowledge. The second investigates the physical, living, and social world, including the beings who seek to know it.

Language, reasoning, and models extend our ability to understand the world while shaping what we can represent, infer, and explain. The claims they support depend on how they relate to what they describe. Observation, experiment, and historical inquiry can expose their failures and lead us to revise our concepts and methods. The relationship runs both ways: we investigate the world through our ways of knowing, and investigate those ways as activities within the world. Understanding the limits of a method clarifies its use; it does not settle what reality must be.

Axis 1 investigates formal expression, inference, computation, and meaning. Axis 2 investigates the world through distinct forms of inquiry, including those that study cognition itself. Their crossings examine how structures acquire interpretations, how explanations earn support, and how the assumptions and limits of one approach matter when it enters another domain.

### Axis 1: The Limits of Formal Expression

The first axis is a specific historical sequence of thinkers, working between roughly 1879 and 1980, who collectively discovered something unprecedented: that the apparatus of formal expression itself has internal limits, and that these limits can be precisely characterized.

The sequence is **Frege → Hilbert → Gödel → Turing → Church → Tarski → Wittgenstein → Quine → Kripke**. It does not tell one simple story. It traces several related limits: formal proof, mechanical procedure, truth-definition, linguistic meaning, holism, and reference.

Frege, beginning in 1879 with the *Begriffsschrift*, invented modern formal logic. His project was to show that mathematics is reducible to logic and that natural-language meaning has an underlying logical structure that can be made precise. He achieved enough of this to make the project credible and shape the next century of philosophy.

Hilbert, working from the early 1900s through the 1920s, extended Frege's project into a comprehensive program: to formalize all of mathematics in axiomatic systems and to prove, by purely finitary methods, that these systems are consistent and complete. The Hilbert program was the most ambitious attempt in human history to demonstrate that the formal apparatus can fully capture mathematical truth.

Gödel, in 1931, proved that the Hilbert program could not succeed. His incompleteness theorems showed that any formal system rich enough to express arithmetic contains true statements that the system itself cannot prove, and that no such system can demonstrate its own consistency. **This is the foundational limit.** Formal systems are not closed; they cannot fully reach what they are about.

Turing, in 1936, gave the same limit a computational form. He defined what it means for a procedure to be mechanical, identified the halting problem as algorithmically unsolvable, and produced the conceptual framework — the Turing machine — within which "computation" itself became a precise mathematical object. The limit Gödel found in formal proof, Turing found in mechanical procedure.

Church, in the same year and independently, produced an equivalent limit using the lambda calculus. The Church-Turing thesis, as it came to be called, holds that all sufficiently general notions of computation coincide. The same boundary appears from multiple independent directions, and this convergence is itself evidence of how fundamental the boundary is.

Wittgenstein, before and after these technical results, was working on the same question from a different direction — the limits of language. The early *Tractatus* (1921) tried to map exactly what language can express and concluded with the famous injunction that what cannot be said clearly must be passed over in silence. The late *Philosophical Investigations* (published posthumously in 1953) overturned the early picture and showed that meaning lives not in formal correspondence to facts but in embedded social practices of rule-following — and that **the question of what it means to follow a rule** is itself irreducibly difficult, in ways that complicate the entire project of formalization.

Quine, in 1951's *Two Dogmas of Empiricism*, dismantled the analytic-synthetic distinction that had been the conceptual foundation of much 20th-century philosophy of language and logic. The result was that no clean separation between the formal-conceptual and the empirical-substantive can be maintained; our beliefs face the world as a holistic web rather than as separable claims, and this is a further limit on the extent to which any specific formal apparatus can be cleanly evaluated.

Kripke, in 1970's *Naming and Necessity*, showed that the descriptivist theory of reference inherited from Frege and Russell was wrong. Reference is fixed by causal-historical chains, not by associated descriptions; some truths are necessary but a posteriori, others contingent but a priori; the modal structure of language and the world does not align with what the formal tradition had assumed. **This was the final dismantling of a particular formalist picture** — one which had dominated the field for nearly a century.

The cumulative shape of this axis is not one theorem but a family of pressures on the dream of complete formalization. The failure is not a defect to be repaired but a structural feature of the apparatus. The axis names that feature.

### How Trunks 1 Through 4 Implement Axis 1

The protected chain is **proof and logic → computability and incompleteness → models and semantics → an interest-selected branch in type theory or philosophy of language**. [C] marks this chain. [S] supplies background, tools, and companions; [E] opens independent or advanced directions.

Trunk 1.1 supplies proof techniques, elementary set theory, first-order logic, and the definitions of computation. Satisfaction and elementary semantics enter with logic; they need not wait until incompleteness has been studied.

Trunk 1.2 develops computability and incompleteness, then deepens the distinction between derivation and truth in a structure through model theory and Tarski. Basic proof theory makes derivations and inference rules explicit; advanced proof transformations are supporting depth. The original papers are [S] historical and technical companions, not substitutes for understanding the results through an accessible treatment.

The type-theory branch in 1.3 proceeds from lambda calculus and operational semantics to simple types, type safety, normalization, and Curry–Howard. The foundations direction in 1.4 introduces dependent types; denotational and categorical semantics supply further interpretations, while HoTT and cubical type theory explore identity and its computational content. SICP and proof assistants support these investigations.

The philosophy-of-language branch uses 4.1–4.2 to investigate sense, reference, truth, meaning, and rule-following through Frege, Russell, Wittgenstein, Quine, and Kripke. Tarski is shared with the technical spine. Stalnaker supplies a supporting account of context, while natural-language formal semantics in 6.1 applies models, types, and lambda calculus to linguistic evidence. The logic provides tools for reading these arguments, while the philosophical positions must be assessed on their own terms; incompleteness does not by itself settle questions of meaning or reference.

Trunk 1.5 opens separate questions about feedback, information, and collective behavior. Trunk 2 supplies mathematics as needed, including dynamics, causal inference, and inverse problems. Trunk 3 distinguishes computational resources (3.1), learning and understanding (3.2), and systems engineering (3.3). Philosophy of mathematics supplies [S] reflection on proof, mathematical objects, and formalization. Epistemology, cognitive science, physics, and the other [E] domains offer further inquiry when chosen, without becoming obligations on the main chain.

### Axis 2: The Apparatus Applied to the World

The first axis examines forms of representation and inference. The second investigates the world, including the cognitive and social processes through which inquiry takes place.

The world the apparatus is applied to is not a single thing. It is the cosmos in its physical structure (Trunk 5), the human being in its embodied and cognitive structure (Trunks 4.6, 6.1, 6.2), and the human collective in its social and historical structure (Trunks 6.3, 6.4, 6.5). Each of these is its own domain, and each is the subject of a sustained sub-tradition of inquiry. The roadmap's second axis is the integrated study of these domains, but always in light of what Axis 1 has revealed about the apparatus we use to study them.

The cosmic side of Axis 2 offers several directions, from mechanics and quantum theory to cosmology and quantum gravity. The mathematical background depends on the treatment: introductory mechanics uses calculus and differential equations, electromagnetism uses vector calculus and waves, and quantum mechanics uses complex amplitudes, differential equations, and linear algebra. Differential geometry, functional analysis, and gauge theory support more specialized formulations. Effective theories in 5.2 examine scale and applicability; cosmological research in 5.3 shows how observations constrain models. Trunk 5.4 connects these studies to measurement, contextuality, operational principles, and physical ontology; reaching string theory or M-theory is one possible exploration rather than the endpoint of every route.

The human side of Axis 2 offers further questions when interest turns toward cognition, subjectivity, or society. Trunk 4.6 takes up the philosophy of mind, bringing its introductory cognitive-science resources into dialogue with the more advanced philosophical texts rather than floating directly into metaphysics. Dennett, Chalmers, Nagel, Marr, Fodor, Andy Clark, and Merleau-Ponty ask what cognition is, how it relates to computation, what consciousness is, and what limits constrain a cognitive system from understanding itself. The cognitive-science layer supplies empirical and computational pressure: attention, working memory, perception, predictive processing, and levels of analysis. Evolution asks how cognitive capacities arise; resource-rational models examine finite computational budgets; comparisons of consciousness theories ask which predictions can distinguish rival accounts. Trunk 6.1 (linguistics) gives the empirical complement to the philosophy of language from Axis 1. Trunk 6.2 (Lacanian psychoanalysis) approaches the human subject from the most heterodox angle — through the Freudian unconscious read structurally, after Saussure — and makes available a whole register of phenomena (desire, identification, the symbolic order) that the analytic tradition systematically underweights.

The collective side of Axis 2 runs through Trunks 6.3 (sociology), 6.4 (history), and 6.5 (media theory). Weber and Bourdieu give you the most sophisticated accounts of how social structures produce and reproduce themselves. Luhmann gives you the systems-theoretic view of society as an autopoietic network of communications. Foucault gives you the analysis of power as productive of subjects rather than merely constraining them. Empirical social research supplies tools for evaluating observations, surveys, and experiments. Cultural evolution examines how learning and cooperation accumulate across generations; social epistemology in 4.3 examines how trust and communication shape collective inquiry. History gives you the empirical reservoir of cases. Media theory (McLuhan, Kittler) gives you the analysis of how the technologies of communication structure the cultures and cognitions they make possible.

These subjects use different forms of evidence and explanation: mathematical models, experiments, historical records, and interpretation. **Their common question is how a particular account gains support from the world it describes.** Axis 1 helps clarify representation and inference; Axis 2 tests their scope and investigates the biological and social conditions of inquiry. A limit proved for a formal system bears on an empirical domain only through an argument that connects them.

### The Crossing

Connections take different forms: formal correspondences, empirical applications, and philosophical comparisons. Some connect the two axes; others clarify relationships within Axis 1. Each connection needs its own assumptions and standards of evidence.

**The Gödel-Penrose-Lucas crossing.** *Philosophical argument.* Incompleteness concerns formal theories under specific consistency, effectiveness, and arithmetic assumptions. Applying it to human mathematical understanding requires additional claims about what a mind can know and whether its reasoning can be represented by such a theory. Read Penrose with Franzén to identify those bridging premises; the theorem alone does not establish that minds exceed computation.

**The Wittgenstein-LLM crossing.** *Philosophical comparison informed by empirical work.* Rule-following raises questions about what distinguishes following a rule from merely agreeing with it in observed cases. Relating this to LLMs requires separating behavioral regularity, internal mechanism, semantic understanding, and participation in language practices. Wittgenstein and Kripke supply the philosophical arguments; Mitchell and Krakauer map competing accounts of machine understanding; causal abstraction in 3.2 supplies a framework for testing mechanistic explanations. Cognitive science offers further models and evidence. The connection helps formulate questions; it does not settle them by analogy.

**The Lacan-Gödel crossing.** Lacan, in his late seminars, became fascinated with mathematical formalism, attempting to use Borromean knots and topology to model the structure of the subject. Most mathematicians regard this work as not really mathematics; many philosophers regard the appeal to mathematics as theatrical rather than substantive. The roadmap places you in a position to make your own judgment from a position of competence in both directions: you have done the mathematics, you have read Lacan with Bruce Fink's guidance, you can evaluate what is happening when a continental theorist invokes set theory or topology. The same competence allows the inverse: to evaluate what is happening when a mathematician makes claims about the human subject, the nature of mind, or the meaning of consciousness. **Both directions of evaluation require both axes**, and the roadmap is designed to give you both.

**The probability-epistemology crossing.** Trunk 2.4 gives you measure-theoretic probability and the major interpretive options (frequentist, Bayesian, decision-theoretic). Trunk 4.3 gives you contemporary epistemology with Williamson, Hacking, and the structures of justification. Reading Jaynes alongside Hacking — the most aggressive technical claim that probability *is* the normative theory of rationality alongside the historical demonstration that probability *as a concept* was invented in the 17th century — produces a question that neither side, alone, can answer. **What is the relation between the formal apparatus we have for reasoning under uncertainty and the historical, contingent, embodied process of human inquiry?** The roadmap places you at the crossing where this question becomes precise.

**The category-theory-structuralism crossing.** *Formal results and philosophical interpretation.* Structuralism treats mathematical objects as positions in structures. Category theory emphasizes structure-preserving maps, while univalent foundations provide formal principles relating equivalence and identity. For suitable structures, structure-identity results hold within a specified framework and under assumptions such as univalence. Their philosophical significance remains an argument to examine; a theorem within that framework does not by itself establish structuralism as the uniquely correct philosophy of mathematics.

**The cybernetics-Luhmann crossing.** *Theoretical application and intellectual history.* Feedback, communication, and self-organization provide part of the background for Luhmann's account of social systems. Ask which concepts retain a precise meaning in the social setting, which are transformed, and what observations or historical material support the resulting explanations. Intellectual lineage establishes a connection, while the explanatory value of the application needs separate assessment.

**The model-theory-philosophy crossing.** Model theory shows that formal languages can have unintended, nonstandard, or structurally surprising models. Compactness and Löwenheim–Skolem are not just technical theorems; they force a philosophical question about the gap between axiomatization and intended structure. Button and Walsh connect these results to reference, realism, and intended interpretations. This crossing matters for philosophy of mathematics, semantics, structuralism, and the limits of formal characterization.

**The proof-theory-type-theory crossing.** *Formal correspondence within Axis 1.* In specified logical systems and typed calculi, proof rules correspond to type formation and term construction, while proof reduction corresponds to computation. Simple-type normalization provides an accessible example. The correspondence must identify the systems and rules involved; it does not assert that all proofs, programs, and mathematical structures are interchangeable.

**The formal-epistemology-probability crossing.** Probability theory gives the mathematics of uncertainty; formal epistemology asks whether rational belief should obey that mathematics. Bayesian confirmation, decision theory, belief revision, and epistemic logic turn vague claims about evidence into testable structures. This crossing is where epistemology stops being only conceptual analysis and becomes a theory of constrained rational agents.

**The causal-model-world crossing.** *Empirical inference.* Probability describes uncertainty; causal models add assumptions about interventions and mechanisms. Trunk 2.4 connects these models to evidence, measurement, prediction, and explanation in 4.5, cognition in 4.6, and social research in 6.3. Inverse problems in 2.5 add questions of uniqueness, stability, and uncertainty; scientific representation in 4.5 asks how an idealized model bears on its target. Ask what is identifiable from the available data, how sensitive the conclusion is to modeling assumptions, and which observations could distinguish competing accounts.

**The cognitive-science-philosophy-of-mind crossing.** Philosophy of mind without cognitive science risks becoming unconstrained speculation; cognitive science without philosophy risks losing the question of what its models mean. Attention, memory, perception, predictive processing, and Marr's levels of analysis give empirical structure to debates about consciousness, representation, rule-following, and machine understanding. This crossing is especially important for evaluating LLMs: not merely as engineering artifacts, but as systems that force old questions about cognition into new forms.

**The scale-model-world crossing.** *Physical modeling and philosophical interpretation.* Effective theories connect limited microscopic information to predictions at a chosen scale. Statistical mechanics, renormalization, and cosmological inference make approximation and model dependence concrete. Ask which details matter for a prediction, which can be omitted, and how the applicable scale is established.

**The language-narrative crossing.** *Formal analysis and literary interpretation.* Natural-language semantics investigates composition and interpretation; possible-worlds narratology examines how readers construct and compare fictional situations. These frameworks can clarify narrative choices without equating a literary world with a formal model. Trunk 7 turns an inquiry into an argument, or a premise into choices and consequences.

The significance of each connection depends on its assumptions, evidence, and scope; a useful comparison need not establish a shared mechanism.

## Suggested Resources

### TRUNK 1.1 — First Convergence

This is where the three threads (logic, set theory, computation) first braid together. The trap here is reading three separate textbooks; the win is recognizing they describe one phenomenon from three angles.

#### [C] Discrete Mathematics & Proof

| Resource | Notes |
| :--- | :--- |
| **Kenneth Rosen, *Discrete Mathematics and Its Applications*** | The standard, broad coverage. |
| **Daniel Velleman, *How to Prove It*** | The pure proof-technique book. **Read this first** if proof writing isn't already automatic. |
| **László Lovász, *Discrete Mathematics: Elementary and Beyond*** | Sharper, more elegant, more mathematical. Use after Rosen if you want depth. |
| **Pólya, *How to Solve It*** | Problem-solving heuristics, analogy, and mathematical discovery. |

**Tips:** This is the first technical instrument. The goal is not discrete mathematics as a topic list but proof fluency: induction, contradiction, contrapositive, relations, functions, equivalence classes, recursion, graph arguments, counting arguments. If proof writing is already solid, skim Rosen and use Velleman/Lovász selectively. If proof writing is not automatic, this node comes before mathematical logic, analysis, and serious theory of computation.

#### [C] Mathematical Logic

| Resource | Notes |
| :--- | :--- |
| **Jeremy Avigad, *Mathematical Logic and Computation*** (2022; [publisher](https://www.cambridge.org/core/books/mathematical-logic-and-computation/300504EAD8410522CE0C27595D2825A2)) | A unified main-text option for logic, proof theory, computability, incompleteness, and finite types; connects the existing core nodes rather than adding a new course. |
| **Dirk van Dalen, *Logic and Structure*** | An alternative main text with complete soundness and completeness proofs. |
| **Herbert Enderton, *A Mathematical Introduction to Logic*** | Classic alternative. More verbose; some find it friendlier. |
| **Peter Smith, *An Introduction to Formal Logic*** + his *Logic Matters* site (free) | Smith's *Teach Yourself Logic Guide* is the best self-study map of the entire logic landscape — read it before choosing a textbook. |
| **Shoenfield, *Mathematical Logic*** | Reference-grade; come back to it later, not now. |

**Tips:** Avigad provides a unified route through deductive systems, syntax and semantics, computability, and formal foundations. Use van Dalen or Enderton as alternative entries and Smith for orientation; the books need not form a serial reading list. Reconstruct soundness and completeness arguments, then use compactness in a concrete non-axiomatizability example. Keep satisfaction in a structure distinct from derivability in a theory.

#### [C] Naive Set Theory

| Resource | Notes |
| :--- | :--- |
| **Paul Halmos, *Naive Set Theory*** | 100 pages, perfect, sufficient. |
| **Herbert Enderton, *Elements of Set Theory*** | If you want the axiomatic version now rather than later. |

**Tips:** Halmos gives an entry to sets, functions, and cardinality. Enderton provides a more axiomatic alternative. After Gödel, independence questions may motivate a return to the axioms and their strength.

#### [C] Theory of Computation

| Resource | Notes |
| :--- | :--- |
| **Michael Sipser, *Introduction to the Theory of Computation*** | An accessible main text for automata, computability, and an introduction to complexity. |
| **Hopcroft, Motwani & Ullman, *Introduction to Automata Theory, Languages and Computation*** | Older, denser; consult only for specific gaps. |
| **Sanjeev Arora & Boaz Barak, *Computational Complexity: A Modern Approach*** | Use the selected complexity topics in Trunk 3.1 when resource bounds become relevant. |

**Tips:** Use Sipser as an entry through automata, Turing machines, decidability, and reductions, selecting exercises that let you reconstruct the arguments. Hopcroft–Motwani–Ullman offers further formal-language detail. Complexity in 3.1 asks a separate question about resources required by computable problems.

#### [S] Philosophy: Frege, early Russell, *Tractatus*

Supporting orientation alongside logic; the sustained readings are core within the selected language branch in 4.1.

| Resource | Notes |
| :--- | :--- |
| **van Heijenoort, ed., *From Frege to Gödel*** | Anthology of original papers. Frege 1879 (*Begriffsschrift*) selections, Russell on classes, the rest of 20th-c logic-foundations. **One book replaces five.** |
| **Frege, *Foundations of Arithmetic*** (Austin trans.) | A direct entry into Frege’s account of arithmetic. |
| **Russell, *On Denoting*** (1905, free online) | A compact primary source on descriptions and denotation. |
| **Wittgenstein, *Tractatus Logico-Philosophicus*** (Pears & McGuinness trans.) | The text itself. |
| **G. E. M. Anscombe, *An Introduction to Wittgenstein's Tractatus*** | The companion that makes the *Tractatus* legible. Read in parallel. |
| **Michael Beaney, *Frege: Making Sense*** | Best secondary source on Frege if you want depth. |

**Tips:** Frege’s *Foundations of Arithmetic* and Russell’s *On Denoting* provide concrete arguments to reconstruct. Read the *Tractatus* with Anscombe when the compressed presentation needs clarification. The historical sources support the sustained language branch in 4.1–4.2; compare their accounts of logic, reference, and representation.

### TRUNK 1.2 — The Gödel Pivot

Computability, incompleteness, truth, models, and formal derivations give distinct ways to examine the expressive limits of a formal system.

#### [S] Hofstadter — Evergreen

| Resource | Notes |
| :--- | :--- |
| **Douglas Hofstadter, *Gödel, Escher, Bach: An Eternal Golden Braid*** | **Evergreen.** Self-reference, recursion, cognition, and formal systems. |
| **Hofstadter, *I Am a Strange Loop*** | The 30-years-later distillation of the consciousness and self-reference theme. |
| **Hofstadter, *Le Ton beau de Marot*** | Translation, language, analogy, and cognition. |
| **Hofstadter & Sander, *Surfaces and Essences: Analogy as the Fuel and Fire of Thinking*** | Mature theoretical statement on analogy as the core mechanism of thought. |

**Tips:** *Gödel, Escher, Bach* connects self-reference, recursion, formal systems, music, cognition, AI, and consciousness. It is an Evergreen companion within Trunk 1.2. Technical passages benefit from basic logic and proof; consult the relevant background when needed. *I Am a Strange Loop* develops the selfhood theme, *Le Ton beau de Marot* explores translation and analogy, and *Surfaces and Essences* develops the account of analogy in cognition. Follow the questions that make each text useful.

#### [C] Computability & Recursion Theory

| Resource | Notes |
| :--- | :--- |
| **Jeremy Avigad, *Mathematical Logic and Computation*** | Continue the main text from 1.1 through primitive recursion, computability, and undecidability; BBJ and Cutland provide alternative explanations and focused exercises. |
| **George Boolos, John Burgess & Richard Jeffrey, *Computability and Logic*** (BBJ) | An alternative integrated treatment of computability, Gödel, Church, and Tarski. |
| **Nigel Cutland, *Computability: An Introduction to Recursive Function Theory*** | Cleaner, more focused on recursion theory specifically. Pair with BBJ. |
| **Robert Soare, *Turing Computability*** | Modern reformulation; advanced; for after BBJ if you want to go deeper. |

**Tips:** Continue Avigad or use BBJ for the combined logical and computational picture. Cutland supports focused work on primitive recursion, partial recursion, and the s-m-n and recursion theorems; Soare offers further depth. Reconstruct a reduction and a self-reference argument, identifying exactly what is computable and where the impossibility result applies.

#### [C] Gödel's Incompleteness Theorems

| Resource | Notes |
| :--- | :--- |
| **Jeremy Avigad, *Mathematical Logic and Computation*** | The incompleteness chapters continue the same syntactic and computational framework; consult the specialized books below as needed. |
| **Boolos, Burgess & Jeffrey, *Computability and Logic*** (chapters on incompleteness) | Standard rigorous proof. |
| **Raymond Smullyan, *Gödel's Incompleteness Theorems*** | The elegant version. Smullyan's diagonal-lemma treatment is unmatched. |
| **Peter Smith, *An Introduction to Gödel's Theorems*** (2nd ed.) | Best single-author treatment for self-learners. Smith holds your hand without being patronizing. |
| **Torkel Franzén, *Gödel's Theorem: An Incomplete Guide to Its Use and Abuse*** | Read **after** the technical proof. Inoculates you against the philosophical misuses (and there are many). |
| **Hofstadter, *Gödel, Escher, Bach*** (incompleteness chapters) | Best informal exposition ever written. **Evergreen.** See the Hofstadter entry in this section. |

**Tips:** Use Avigad or Smith as a main treatment, with BBJ and Smullyan as alternatives or sources of further examples. Reconstruct the diagonal argument and state the effectiveness, consistency, and arithmetic assumptions involved. Read Franzén alongside the philosophical applications to distinguish the theorems from additional claims about minds or knowledge.


#### [S] Read Originals: Gödel 1931, Turing 1936 & Church 1936

| Resource | Notes |
| :--- | :--- |
| **Gödel 1931, *On Formally Undecidable Propositions of Principia Mathematica and Related Systems I*** (in van Heijenoort) | The original. |
| **Alan Turing, *On Computable Numbers, with an Application to the Entscheidungsproblem*** (1936) | The original. |
| **Charles Petzold, *The Annotated Turing*** | Page-by-page commentary. Use it. |
| **Alonzo Church, *An Unsolvable Problem of Elementary Number Theory*** (1936) | Shorter, denser. |
| **Martin Davis, ed., *The Undecidable*** | Anthology containing Turing, Church, Post, Kleene originals. |

**Tips:** Read the original arguments alongside a modern treatment when their historical formulation becomes useful. Avigad, Smith, or BBJ supplies background for Gödel's arithmetization; Petzold annotates Turing's construction. Lambda calculus in 1.3 helps with Church's argument. Track how the papers formulate effective procedure and undecidability, and check unfamiliar notation against the text and its commentary. The originals are companions to the technical spine, with different emphases and assumptions.

#### [C] Tarski on Truth

| Resource | Notes |
| :--- | :--- |
| **Alfred Tarski, *The Semantic Conception of Truth*** (1944, free online) | The accessible version. |
| **Tarski, *The Concept of Truth in Formalized Languages*** (1933/1956) | The full technical version. |
| **Scott Soames, *Understanding Truth*** | Best modern philosophical commentary. |

**Tips:** Read the 1944 paper first — it's a 50-page philosophical essay, beautifully written, accessible. The 1933 paper is the technical monograph; sample it after the 1944 one. Tarski's undefinability theorem is Gödel's twin, and once you see them as twins, the territory clicks.

#### [C] Elementary Model Theory & Limits of Axiomatization

| Resource | Notes |
| :--- | :--- |
| **Tim Button & Sean Walsh, *Philosophy and Model Theory*** (2018; [publisher](https://academic.oup.com/book/3087)) | [S] Companion connecting elementary model theory to reference, realism, categoricity, and sameness of theories and structures; after introductory logic. |
| **David Marker, *Model Theory: An Introduction*** | Use the elementary chapters selectively; the full graduate treatment assumes substantial algebra. |
| **Wilfrid Hodges, *A Shorter Model Theory*** | More conceptual and broader in flavor; excellent as a second perspective. |
| **Bruno Poizat, *A Course in Model Theory*** | More idiosyncratic, elegant, and French in style. Use after Marker if the subject catches fire. |
| **Chang & Keisler, *Model Theory*** | Classical reference. Not the first book. |
| **Peter Smith, *An Introduction to Formal Logic* / *Teach Yourself Logic Guide*** | Use only for orientation if the model-theoretic jump feels abrupt. |

**Tips:** After first-order logic and completeness, focus on structures, satisfaction, compactness, Löwenheim–Skolem, and representative nonstandard models. Dense linear orders and nonstandard arithmetic make the limits of axiomatization concrete. Use Button–Walsh to examine the philosophical significance of these results without making the technical theorem do the work of an additional philosophical argument. Marker’s deeper algebraic applications and stability theory are extensions; the core does not require completing his graduate curriculum.

#### [C] Proof Theory

Core scope: inference rules, derivations, and the relation between proof and semantics. The type-theory branch in 1.3 adds normalization for simple types and its relation to proof reduction; general cut elimination and stronger consistency results supply further depth.

| Resource | Notes |
| :--- | :--- |
| **Jeremy Avigad, *Mathematical Logic and Computation*** | Reuse the deductive-system and cut-elimination material from the main logic text; the specialized works below supply alternative presentations and further depth. |
| **Sara Negri & Jan von Plato, *Structural Proof Theory*** | Best entry for sequent calculus and structural rules. Clear and proof-centered. |
| **Jean-Yves Girard, Yves Lafont & Paul Taylor, *Proofs and Types*** | Essential bridge to type theory and Curry–Howard. Short, dense, free online. |
| **Troelstra & Schwichtenberg, *Basic Proof Theory*** | The serious reference. Use after an entry text. |
| **Takeuti, *Proof Theory*** | Classical and difficult. Reference, not entry. |
| **Prawitz, *Natural Deduction*** | Historically central. Use selectively if natural deduction becomes important. |

**Tips:** Use Avigad for continuity with the logic core, Negri–von Plato for structural proof theory, and Girard–Lafont–Taylor for the transition to types. The core concerns inference rules, derivations, and their relation to semantics; selected cut-elimination and normalization arguments show how proofs can be transformed. Stronger consistency results remain further depth. Ask whether a proof is being treated as a certificate, a construction, or a process, and specify the formal system.

### TRUNK 1.3 — Lambda Calculus, Types & Proofs

Terms and evaluation → simple types → type safety, normalization, and Curry–Howard.

#### [S] Structure and Interpretation of Computer Programs (SICP)

| Resource | Notes |
| :--- | :--- |
| **Abelson & Sussman, *Structure and Interpretation of Computer Programs*** (2nd ed., MIT, free online) | Optional bridge through interpreters and abstraction; use the relevant chapters if needed. |
| **MIT 6.001 video lectures** (1986, Abelson & Sussman themselves) | Watch the first 5 lectures even if you read the book. The energy is irreplaceable. |
| **Brian Harvey's Berkeley CS61A lectures** (older versions, on YouTube) | Best supplement when stuck. |
| *Composing Programs* (Berkeley, online) | Python-flavored SICP if Scheme genuinely blocks you — but **try Scheme first**. |

**Tips:** Do exercises from Chapters 1–4. Chapter 5 (register machines) is optional unless you want to feel the SICP→compiler bridge. **The metacircular evaluator (Ch. 4) provides an interpreter-based bridge to lambda calculus and TAPL** if that concrete route helps you. Racket with `#lang sicp` is a clean implementation choice.

#### [C] Lambda Calculus & Combinatory Logic

| Resource | Notes |
| :--- | :--- |
| **Henk Barendregt, *Lambda Calculus: Its Syntax and Semantics*** | The standard reference. Encyclopedic. Reference, not read-through. |
| **J. Roger Hindley & Jonathan Seldin, *Lambda-Calculus and Combinators: An Introduction*** | The right textbook. Read this. |
| **Greg Michaelson, *An Introduction to Functional Programming Through Lambda Calculus*** | Gentlest entry; only if Hindley-Seldin feels too dense. |
| **Raymond Smullyan, *To Mock a Mockingbird*** | Combinatory logic as puzzle book. Read for joy after the technical material. |

**Tips:** Implement an untyped λ-calculus interpreter in your language of choice (200 lines of Python or Racket). Then implement β-reduction, then α-conversion, then the SKI combinator translator. **Do this before reading Church-Rosser** — the proof becomes obvious once you've felt the syntax in your hands. The connection back to SICP's metacircular evaluator should make you grin.

#### [C] Operational Semantics & Simple Types — TAPL

Core within the selected type-theory branch. Lambda calculus, substitution, and elementary operational semantics provide the starting background; an entire SICP or proof-assistant course is not required.

| Resource | Notes |
| :--- | :--- |
| **Benjamin Pierce, *Types and Programming Languages*** (TAPL) | A main-text option centered on small calculi, operational semantics, and type systems. |
| **Pierce, ed., *Advanced Topics in Types and Programming Languages*** (ATTAPL) | Sequel. Save for after TAPL + Software Foundations. |
| **Robert Harper, *Practical Foundations for Programming Languages*** (PFPL, 2nd ed., free draft online) | More mathematical than TAPL, less hand-holding. The serious alternative. |
| **Glynn Winskel, *The Formal Semantics of Programming Languages*** | Cleaner on operational/denotational semantics specifically. |

**Tips:** Work through terms, substitution, small-step evaluation, typing rules, progress, and preservation. TAPL develops these through untyped and simply typed calculi, with later chapters on richer type systems. Its §30.5 is a brief dependent-types outlook; use the Dependent Type Theory entry in 1.4 for that direction. Keep logical satisfaction in 1.2 distinct from a program’s evaluation semantics.

#### [C] Type Safety & Normalization

| Resource | Notes |
| :--- | :--- |
| **Benjamin Pierce, *Types and Programming Languages*** | Progress and preservation in the simple type systems; Chapter 12 for normalization. |
| **Jean-Yves Girard, Yves Lafont & Paul Taylor, *Proofs and Types*** | Proof reduction and normalization for typed calculi. |
| **Software Foundations Vol. 2: *Programming Language Foundations*** | Mechanized examples of evaluation, typing, and type soundness. |

**Tips:** Keep three claims separate: a well-typed term does not get stuck, evaluation preserves its type, and every reduction sequence terminates. Type safety alone does not establish termination. Prove the relevant results for a small calculus and compare term reduction with the elimination of detours in natural deduction.


#### [C] Curry–Howard Correspondence

Core within the selected type-theory branch: propositions as types and proofs as programs. The Lambek/categorical interpretation is developed in 1.4.

| Resource | Notes |
| :--- | :--- |
| **Sørensen & Urzyczyn, *Lectures on the Curry–Howard Isomorphism*** | The textbook treatment. Comprehensive. |
| **Philip Wadler, *Propositions as Types*** (paper, free online) | The 13-page essay everyone should read. **Start here.** |

**Tips:** Use Wadler and Sørensen–Urzyczyn to relate intuitionistic propositions, proof rules, types, and terms. Reconstruct the correspondence for implication and products, then examine how proof reduction relates to computation. The categorical interpretation is a supporting direction in 1.4; specify which logical system and typed calculus each correspondence concerns.

#### [S] Software Foundations Vol. 1 (Rocq)

Optional formalization route. Choose this or a Lean introduction according to the examples you want to check; completing both is not required.

| Resource | Notes |
| :--- | :--- |
| **Pierce et al., *Software Foundations*, Vol. 1: *Logical Foundations*** (free online) | Select the chapters on inductive definitions, propositions, and proofs that support the current inquiry. |
| **Software Foundations Vol. 2: *Programming Language Foundations*** | Continuation. After Vol. 1, optional but valuable. |
| **Adam Chlipala, *Certified Programming with Dependent Types*** (CPDT, free online) | More advanced; tactic-heavy; for after Vol. 1 if you want Rocq mastery. |

**Tips:** Use Vol. 1 for inductive definitions, propositions, and proof construction in Rocq. Vol. 2 develops operational semantics, typing, and program properties. Choose examples that support the current argument; the course is a formalization route, not a prerequisite for reading the type-theory texts.

#### [S] Mathematics in Lean (Lean4 + Mathlib)

Optional formalization route. Select exercises that serve the current mathematical question; keeping Lean open for every mathematical reading is not a condition of progress.

| Resource | Notes |
| :--- | :--- |
| **Avigad, Massot et al., *Mathematics in Lean*** (free, online, continuously updated) | A mathematical introduction to Lean; select material around the definitions and proofs you want to formalize. |
| **Theorem Proving in Lean 4** (free, online) | Companion: language-focused rather than math-focused. |
| **The Mechanics of Proof** (Heather Macbeth, free) | Beautiful introductory text using Lean — gentlest entry. |
| **Mathlib documentation + source** | Your real long-term reference once *Mathematics in Lean* is done. |
| **Kevin Buzzard's Xena Project blog & lectures** | The cultural center of the Lean math community. |
| **Lean Zulip chat** (free) | Where the community actually lives. Lurk first. |

**Tips:** *The Mechanics of Proof* offers an entry, while *Mathematics in Lean* and *Theorem Proving in Lean 4* provide mathematical and language-focused routes. Choose a small theorem from your current reading—such as irrationality of √2, infinitude of primes, or Cantor’s theorem—and make its assumptions and proof steps explicit. Use Mathlib and community resources as needed; formalization should clarify the mathematical question.

Use Lean selectively to check definitions and proofs that matter to the current core question. Library exploration and formalization should clarify that question; defer them when they become a separate project.

#### [S] Program Logics

| Resource | Notes |
| :--- | :--- |
| **Glynn Winskel, *Formal Semantics*** (Hoare logic chapters) | Adequate intro. |
| **Peter O'Hearn et al. — separation logic survey papers** (free online) | The modern essential. |
| **Software Foundations Vol. 2: *Programming Language Foundations*** (Hoare chapters) | The applied path. |
| **Software Foundations Vol. 6: *Separation Logic Foundations*** | The right way to learn separation logic. |

**Tips:** Skip directly to Software Foundations Vol. 2 + 6 if you've already done Vol. 1. Hoare logic feels trivial until you try to verify a real program; then it bites. Separation logic was epoch- invention — its compositional treatment of mutable state is one of the truly beautiful ideas in CS, and you should appreciate that explicitly.

#### [S] Formal Software Verification

| Resource | Notes |
| :--- | :--- |
| **Xavier Leroy et al., *CompCert* papers** | The verified C compiler. The papers are the textbook. |
| **Gerwin Klein et al., *seL4* papers** | The verified OS kernel. Same idea. |
| **Adam Chlipala, *Formal Reasoning About Programs*** (FRAP, free online) | Gentler entry to the same world. |

**Tips:** This is supporting [S] material for the type-theory branch — read the high-level papers, skim the proofs, internalize that *industrial-scale verification is real*. You don't need to do CompCert yourself; you need to know the world it inhabits, because it's the world your Lean/Rocq fluency lives in.

#### [E] Compilers

| Resource | Notes |
| :--- | :--- |
| **Andrew Appel, *Modern Compiler Implementation in ML*** | The right book if you do this. |
| **Aho, Lam, Sethi, Ullman, *Compilers: Principles, Techniques, and Tools*** ("Dragon Book") | Reference. Don't read through. |
| **Bob Nystrom, *Crafting Interpreters*** (free online) | Joyful, modern, project-based. **Best for the [E] tag.** |

**Tips:** Nystrom offers a project-based entry through a tree-walking interpreter and a bytecode VM; Appel connects implementation to a more systematic compiler treatment. Select a project that clarifies evaluation, representation, or translation. Deeper optimization and correctness questions can be pursued through the relevant PL and verification material.

### TRUNK 1.4 — Dependent Types, Semantics & Foundations

Two directions after 1.3: dependent types and mathematical foundations; denotational and categorical interpretations. HoTT is a further extension.

#### [C] Dependent Type Theory

Core within the mathematical-foundations direction, after simple types and Curry–Howard.

| Resource | Notes |
| :--- | :--- |
| **Daniel P. Friedman & David Thrane Christiansen, *The Little Typer*** (2018; [publisher](https://mitpress.mit.edu/9780262351003/the-little-typer/)) | [S] Optional example-based entry through a small Lisp-like language; supports intuition for dependent types without replacing a systematic theoretical treatment. |
| **Egbert Rijke, *Introduction to Homotopy Type Theory*** | The opening development of Martin-Löf dependent type theory; the later HoTT material belongs to the extension below. |
| **The HoTT Book** (Univalent Foundations Program, free online) | Chapter 1 for dependent functions, pairs, identity types, and universes. |
| **Theorem Proving in Lean 4** | Concrete examples of dependent functions, inductive types, and universes; distinguish the proof assistant’s foundations from HoTT. |

**Tips:** Learn contexts, judgments, dependent products and sums, induction, identity types, and universes. Follow how a proposition with parameters becomes a type and how its proof becomes a term. Univalence and higher inductive types are further choices; ordinary dependent type theory does not require adopting them.


#### [S] Denotational Semantics

After operational semantics, consult the order, fixed-point, or domain-theoretic background needed by the selected interpretation.

| Resource | Notes |
| :--- | :--- |
| **Glynn Winskel, *The Formal Semantics of Programming Languages*** | Already mentioned; the right book for this section specifically. |
| **Robert Harper, *PFPL*** (the semantics chapters) | Modern alternative. |
| **Carl Gunter, *Semantics of Programming Languages*** | Classical, more mathematical, denotational-heavy. |

**Tips:** Ask what mathematical object a program denotes and how that interpretation relates to observable evaluation. Work through a small example of compositional interpretation; distinguish denotational equality from operational or contextual equivalence. Adequacy and full abstraction express different relationships between the model and program behavior.

#### [S] Category Theory

| Resource | Notes |
| :--- | :--- |
| **Steve Awodey, *Category Theory*** (2nd ed.) | Best self-study. Logically motivated, exercises are tractable. |
| **Emily Riehl, *Category Theory in Context*** (free online) | More mathematician-flavored alternative. Read after Awodey for breadth. |
| **Saunders Mac Lane, *Categories for the Working Mathematician*** | The classic. Read **after** Awodey + Riehl, not before. Mac Lane assumes maturity. |
| **Tom Leinster, *Basic Category Theory*** (free online) | Slimmer, gentler than Awodey. Good third option. |
| **Bartosz Milewski, *Category Theory for Programmers*** (free online + YouTube) | The applied face. Read in parallel with Awodey if you're learning best with concrete examples. |

**Tips:** Awodey + Milewski is the magic pair: Awodey gives you the math, Milewski makes every concept land in code. **Compute things by hand**: products in **Set**, in **Top**, in **Grp**; pullbacks; small limits and colimits explicitly. The Yoneda lemma deserves serious focus — don't rush it. Adjunctions are the actual deepest concept (Mac Lane's "adjoint functors arise everywhere" is correct), and you'll feel them most viscerally in the Galois connection / free-forgetful examples.

#### [S] Categorical Logic & Curry–Howard–Lambek

| Resource | Notes |
| :--- | :--- |
| **F. William Lawvere, *Adjointness in Foundations*** (1969, free online) | The 14-page paper that reframes set theory. |
| **F. William Lawvere & Stephen Schanuel, *Conceptual Mathematics*** | Lawvere's pedagogical book. Easier than the papers, often underestimated. |
| **Goldblatt, *Topoi: The Categorial Analysis of Logic*** (Dover) | The right textbook for categorical logic specifically. Topoi as the unification of logic and geometry. |
| **Saunders Mac Lane & Ieke Moerdijk, *Sheaves in Geometry and Logic*** | The serious follow-up. Save for if you fall in love. |
| **Joachim Lambek & Phil Scott, *Introduction to Higher-Order Categorical Logic*** | The full Curry–Howard–Lambek triangle, including the categorical leg. Hard but essential if you want the complete picture. |

**Tips:** After categories, functors, and adjunctions, examine categorical interpretations of logical connectives and typed calculi. Lambek–Scott develops the categorical side of Curry–Howard; Lawvere and the topos texts explore other foundations. State the structures and assumptions involved rather than treating every logic as the internal language of an arbitrary topos.

#### [S] Linear Algebra — Categorical Perspective

| Resource | Notes |
| :--- | :--- |
| **Sergei Treil, *Linear Algebra Done Wrong*** (free online) | More categorical/structural than Axler. |
| **Roman, *Advanced Linear Algebra*** | Module-theoretic and categorical perspectives. The right second-pass book. |
| **Selected chapters of Aluffi *Chapter 0*** | Vector spaces as an example of modules over a field; revisit after first reading 2.1. |

**Tips:** Prerequisites are linear algebra from Trunk 2.1 and familiarity with categories and functors. The point is to **see vector spaces as a category**, **see linear maps as morphisms**, **see direct sums as coproducts and tensor products as a monoidal structure**. Roman gets you there. Selected sections in Roman and Aluffi’s chapters on modules connect these constructions to concrete algebra. This is what "viewing through a categorical lens" actually means in practice.

#### [S] Category Theory for Programmers

| Resource | Notes |
| :--- | :--- |
| **Bartosz Milewski, *Category Theory for Programmers*** (free book + YouTube) | Already mentioned. Listed separately because it's also the right book for the **applied** dimension after the theoretical work. |
| **Brent Yorgey, *The Typeclassopedia*** (online, free) | Haskell-flavored summary of practical category theory. |
| **Eugenio Moggi, *Notions of Computation and Monads*** (1991, free online) | The original monads-for-effects paper. Read after Milewski's monad chapters. |

**Tips:** This is your bridge from the abstraction back to actual code. After the theoretical work, **rewrite a small program of yours using free monads / tagless final / extensible effects**. The point isn't the engineering benefit — it's that you'll feel category theory as a programming methodology, not just a meta-mathematical curiosity. Moggi's paper is short, clear, and historically the moment functional programming and category theory officially merged.

#### [E] Homotopy Type Theory

| Resource | Notes |
| :--- | :--- |
| **Cyril Cohen, Thierry Coquand, Simon Huber & Anders Mörtberg, “Cubical Type Theory: A Constructive Interpretation of the Univalence Axiom”** (2018; [formal proceedings](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.TYPES.2015.5)) | Optional extension on a cubical system in which univalence is provable, with a constructive semantic interpretation. The linked TYPES 2015 proceedings were published in 2018. |
| **The HoTT Book** (Univalent Foundations Program, free online) | The reference. Written by a community in a year, and it shows in the best way. |
| **Egbert Rijke, *Introduction to Homotopy Type Theory*** | The best textbook for self-learners; gentler ramp than the HoTT Book. |
| **Robert Harper, *Homotopy Type Theory* lectures (CMU, on YouTube)** | Excellent video supplement. |
| **Dan Licata, Robert Harper lectures (OPLSS, on YouTube)** | More advanced; for the second pass. |
| **Voevodsky's lectures on Univalent Foundations (online)** | Hear the founder. Hard but historically essential. |

**Tips:** After the dependent-type foundations, study identity types as paths, univalence, and higher inductive types through Rijke or the HoTT Book. Distinguish the univalence axiom from results derived using it. Structure-identity principles concern specified classes of structures within the chosen foundation; their philosophical interpretation connects to 4.4 without settling that debate by itself. For the computational content of univalence, the cubical paper develops a different formal system and its semantics; distinguish that construction from simply adding an axiom to an existing proof assistant.

### TRUNK 1.5 — Feedback, Information & Complex Systems

An optional branch on feedback, information, and collective behavior. Connections to cognition, physics, or society need their own models and evidence.

#### [E] Cybernetics & Systems Theory

| Resource | Notes |
| :--- | :--- |
| **Norbert Wiener, *Cybernetics: or Control and Communication in the Animal and the Machine*** | The founding text. Read selectively. |
| **W. Ross Ashby, *An Introduction to Cybernetics*** (free online) | Most readable. Cleaner than Wiener. **The best entry point.** |
| **Gregory Bateson, *Steps to an Ecology of Mind*** | The humanistic-philosophical extension. Essential for the cross-link to Trunks 4 and 6. |
| **Stafford Beer, *Designing Freedom*** | Short, lectures, beautiful. Optional but rewarding. |

**Tips:** Ashby provides an entry through regulation and feedback; Wiener supplies technical and historical context, while Bateson develops connections to human interaction and ecology. Relate these concepts to the dynamical models in 2.5. When reading Luhmann in 6.3, distinguish intellectual inheritance from evidence that a particular feedback or systems model explains a social phenomenon.

#### [E] Bateson — Evergreen

| Resource | Notes |
| :--- | :--- |
| **Gregory Bateson, *Steps to an Ecology of Mind*** | **Evergreen.** Major essay collection. |
| **Bateson, *Mind and Nature: A Necessary Unity*** | **Evergreen.** Mature systematic statement. |
| **Mary Catherine Bateson, *With a Daughter's Eye*** | Biography by his daughter. Affecting and useful. |
| **Bateson & Bateson, *Angels Fear*** | Late collaboration with Mary Catherine Bateson. |

**Tips:** Useful background is feedback and regulation from cybernetics, together with the cognitive-science vocabulary in Trunk 4.6; the relevant concepts support the comparison. His central phrase — "the pattern that connects" — names one of the goals of the whole roadmap. The conceptual core is that mind is not simply inside brains but in patterns of relation across organisms, environments, communication systems, and ecologies. Read in dialogue with cybernetics, Andy Clark, systems theory, ecology, psychiatry, and media theory. Bateson is not a substitute for technical cybernetics; he is the anthropological-philosophical expansion of it.

#### [E] Wiener — Evergreen

| Resource | Notes |
| :--- | :--- |
| **Norbert Wiener, *The Human Use of Human Beings*** | **Evergreen.** Popular-philosophical companion to technical cybernetics. |
| **Wiener, *Cybernetics*** | Technical source; belongs mainly with Trunk 1.5 cybernetics. |
| **Wiener, *God and Golem, Inc.*** | Late, strange, prophetic short book. |
| **Flo Conway & Jim Siegelman, *Dark Hero of the Information Age*** | Biography. |

**Tips:** *The Human Use of Human Beings* is accessible without completing the technical cybernetics material; consult feedback and communication concepts as needed, with Bateson as a related perspective. Where *Cybernetics* is technical, *Human Use* asks what cybernetic understanding means for human freedom, automation, religion, labor, communication, and social control. Its core claim is that human beings are message-processing systems whose freedom and dignity depend on the communicative environments they inhabit. The book is old and still feels current.

#### [E] Information Theory

| Resource | Notes |
| :--- | :--- |
| **David MacKay, *Information Theory, Inference, and Learning Algorithms*** (free online) | An integrated treatment of Bayesian inference, coding, and learning. |
| **Claude Shannon, *A Mathematical Theory of Communication*** (1948, free) | The original paper. Read after MacKay's first 5 chapters. |
| **Cover & Thomas, *Elements of Information Theory*** | The standard reference. Use if MacKay leaves you wanting more rigor. |

**Tips:** MacKay's book is one of the few textbooks where the author's voice carries genuine intellectual joy. The opening chapters provide an entry through probability, coding, and inference. The link from information theory to thermodynamics (entropy in two senses) and to inference (Bayesian updates as code lengths) is the deep payoff — both feed Trunk 2.4 (probability) and Trunk 5.1 (statistical mechanics).

#### [E] Complexity Science

| Resource | Notes |
| :--- | :--- |
| **Melanie Mitchell, *Complexity: A Guided Tour*** | The right entry point. Broad, intelligent, non-mathematical-but-rigorous-enough. |
| **John Holland, *Hidden Order*** + *Signals and Boundaries* | Holland is the source. Slim, direct. |
| **Stuart Kauffman, *At Home in the Universe*** | Beautiful, speculative; read after Mitchell. |
| **Santa Fe Institute lectures (free, online)** | Highest-quality video material on emergence, networks, scaling. |

**Tips:** Mitchell and selected SFI lectures introduce emergence, adaptation, and collective behavior; Holland and Kauffman offer distinct further directions. Pair a conceptual claim with a specific model or observed system. Nonlinear dynamics in 2.5 provides tools for stability, bifurcations, and sensitive dependence, which should not be conflated with undecidability or with one another.

### TRUNK 2.1 — Algebraic Core

Linear algebra provides an entry point without category theory. Abstract algebra supplies concrete examples of algebraic structures; Aluffi's categorical treatment introduces the categorical language it uses. The categorical perspective on linear algebra in Trunk 1.4 requires both linear algebra and familiarity with categories and functors.

#### [S] Linear Algebra

Support role: concrete examples of structures and linear maps for model theory and categorical interpretations. Consult the relevant concepts rather than completing the whole subject before the core.

| Resource | Notes |
| :--- | :--- |
| **Sheldon Axler, *Linear Algebra Done Right*** (4th ed., free online) | Determinant-last approach. The right book for someone who'll later see categorical linear algebra. |
| **3Blue1Brown, *Essence of Linear Algebra* (YouTube)** | Watch before Axler. Builds geometric intuition Axler assumes. |
| **Gilbert Strang's MIT 18.06 lectures** | If Axler ever feels too austere, Strang re-grounds you. |

**Tips:** Use Axler for proof-based understanding, selecting proofs and computations that expose the structures you need. This node is foundational because vector spaces, linear maps, eigenstructure, duality, inner products, and adjoints recur in analysis, probability, quantum mechanics, functional analysis, geometry, statistics, machine learning, and category-theoretic reformulations. For the categorical perspective in Trunk 1.4, the prerequisites are familiarity with vector spaces and linear maps, together with categories and functors.

#### [S] Abstract Algebra

Support role: groups, rings, and fields provide examples for structures, theories, and models. Algebraic depth beyond the examples currently needed remains an extension.

| Resource | Notes |
| :--- | :--- |
| **Paolo Aluffi, *Algebra: Chapter 0*** | The right book. Categorical from page one. |
| **Serge Lang, *Algebra*** | The encyclopedic reference. Use as lookup, not as text. |
| **Dummit & Foote, *Abstract Algebra*** | The computational alternative. More exercises, less elegant. |
| **Michael Artin, *Algebra*** | Geometric flavor; lovely for second exposure. |
| **Aluffi, *Algebra: Notes from the Underground*** | Aluffi's gentler intro book; only if Chapter 0 stalls. |

**Tips:** Aluffi’s categorical treatment connects algebraic structures, homomorphisms, universal properties, and free constructions. Use the categorical interludes when that perspective helps; the introductory alternatives supply more concrete routes. Groups, rings, modules, and fields can be selected according to the examples needed in logic, geometry, or physics.

#### [E] Galois Theory

| Resource | Notes |
| :--- | :--- |
| **Ian Stewart, *Galois Theory*** (4th ed.) | The right self-study book. Beautiful pacing, full proofs. |
| **Emil Artin, *Galois Theory*** (Dover) | Tiny, elegant, the original modern formulation. Read after Stewart. |
| **Aluffi, *Chapter 0*** (Galois chapter) | Sufficient if Stewart feels like overkill. |
| **Jean-Pierre Tignol, *Galois' Theory of Algebraic Equations*** | Historical-mathematical; for after the technical work. Stunning. |

**Tips:** Stewart, then Artin, then Tignol — three passes, three flavors. Galois theory is the first place in your math education where the **deep equivalence between two ostensibly different categories** (field extensions ↔ subgroups) is made visible. You're seeing categorical duality in the wild, before you've named it. By Aluffi+Stewart you should be able to *prove* the unsolvability of the quintic on your own. Do it.

#### [E] Commutative Algebra

| Resource | Notes |
| :--- | :--- |
| **Atiyah & Macdonald, *Introduction to Commutative Algebra*** | The standard. Slim, terse, perfect. |
| **David Eisenbud, *Commutative Algebra with a View Toward Algebraic Geometry*** | The encyclopedia. Use selectively. |
| **Miles Reid, *Undergraduate Commutative Algebra*** | The gentlest entry. Use if Atiyah-Macdonald feels brutal. |

**Tips:** Atiyah-Macdonald has roughly 1.5 sentences per page and demands you supply the missing 8.5. Use exercises to reconstruct the results you rely on. This is where you confront localizations, tensor products, and Noetherian conditions for real, and where you suddenly understand why algebraic geometry exists at all. If you're not planning to do AG, **stop after chapter 7**.

#### [E] Algebraic Geometry

| Resource | Notes |
| :--- | :--- |
| **Ravi Vakil, *The Rising Sea: Foundations of Algebraic Geometry*** (free online) | The modern self-study standard. Vakil teaches AG the way Grothendieck would have wanted. |
| **Robin Hartshorne, *Algebraic Geometry*** (Ch. I–II) | The classic. Hard, ungenerous, essential as reference. |
| **Karen Smith et al., *An Invitation to Algebraic Geometry*** | The gentle entry. Read first if AG is foreign. |
| **David Mumford, *The Red Book of Varieties and Schemes*** | Beautifully written; out of print but findable. |

**Tips:** This is the time-sink warning section. **Don't enter unless you have a concrete philosophical reason** — Grothendieck's reformulation of geometry, the étale topology, motives. If you do enter, Vakil over Hartshorne. Vakil also runs a community of self-learners; you can submit problem sets and get feedback. The full treatments are substantial; choose sections around a particular mathematical question. Worth it for the philosophical payoff (this is the most thoroughgoing example of mathematics-as-categorical-restructuring), but only if you mean it.

#### [E] Algebraic Number Theory

| Resource | Notes |
| :--- | :--- |
| **Daniel Marcus, *Number Fields*** | The best self-study entry. Concrete and motivated. |
| **Jürgen Neukirch, *Algebraic Number Theory*** | The serious modern reference. Read after Marcus. |
| **Pierre Samuel, *Algebraic Theory of Numbers*** (Dover) | Slim, classical, beautifully structured. |

**Tips:** This [E] is genuinely optional unless you plan to engage with class field theory or modern number theory. Marcus alone is enough exposure for cultural literacy. The payoff for your roadmap is small unless you're drawn in — the connections back to logic and computation are real but distant.

### TRUNK 2.2 — Analytic Core

#### [E] Mathematical Analysis I–II

| Resource | Notes |
| :--- | :--- |
| **Terence Tao, *Analysis I & II*** | Best for self-learners. Builds real analysis from the foundations. |
| **Walter Rudin, *Principles of Mathematical Analysis*** ("Baby Rudin") | Classical alternative; terser, more elegant, less hand-holding. |
| **Stephen Abbott, *Understanding Analysis*** | Gentlest of the three. Use only if Tao feels heavy. |

**Tips:** Choose a main text and use the alternatives to resolve specific difficulties. Bouncing between analysis books is one of the most common time wastes. Tao is the safest self-study choice; Rudin is better if terse elegance is motivating rather than demoralizing. The conceptual core is rigor around limit, convergence, continuity, compactness, completeness, metric spaces, and interchange of limiting operations. Give metric spaces enough attention to work with concrete examples and counterexamples. Most downstream confusion in functional analysis, probability, manifolds, and PDE begins as weak metric-space fluency.

#### [E] Real Analysis / Measure Theory

| Resource | Notes |
| :--- | :--- |
| **Terence Tao, *Analysis II*** (the measure theory chapters) + **Tao, *An Introduction to Measure Theory*** | The right self-study sequence. |
| **Walter Rudin, *Real and Complex Analysis*** ("Papa Rudin") | The standard. Beautifully terse. |
| **Gerald Folland, *Real Analysis: Modern Techniques and Their Applications*** | The encyclopedic alternative. More accessible than Rudin, more comprehensive than Tao. |
| **Elias Stein & Rami Shakarchi, *Real Analysis*** (Princeton Lectures III) | The most pedagogically clear. Best if you want to actually enjoy the subject. |

**Tips:** **Stein-Shakarchi for first read, Folland for reference.** Skip Papa Rudin unless you're masochistic or aesthetically obligated. Measure theory is where many self-learners burn out — it's the first time mathematics demands large-scale technical fluency without offering equal pedagogical generosity. Pace yourself. The Carathéodory extension theorem is a useful point at which to reconstruct a proof and examine how measures are built. After this, you have the toolkit for measure-theoretic probability (2.4) and functional analysis (next).

#### [E] Complex Analysis

| Resource | Notes |
| :--- | :--- |
| **Elias Stein & Rami Shakarchi, *Complex Analysis*** (Princeton Lectures II) | The right book. Beautifully written. |
| **Lars Ahlfors, *Complex Analysis*** | The classic. Concise, more demanding. |
| **Tristan Needham, *Visual Complex Analysis*** | Read **alongside** Stein-Shakarchi. Needham gives you intuition no other book offers. |
| **Reinhold Remmert, *Theory of Complex Functions*** | Historical-mathematical; for after the standard treatment. Beautiful. |

**Tips:** Stein-Shakarchi + Needham is the magic pair. Needham makes complex analysis *feel* the way Riemann saw it — geometric, fluid, alive. Without Needham you'll learn the theorems; with him you'll feel why they're true. Spend real time on conformal maps and the Riemann mapping theorem; the geometric content carries enormous weight downstream (Riemann surfaces → algebraic geometry → string theory).

#### [E] Functional Analysis

| Resource | Notes |
| :--- | :--- |
| **Peter Lax, *Functional Analysis*** | Modern, mathematician's choice. The right serious book. |
| **Erwin Kreyszig, *Introductory Functional Analysis with Applications*** | The right gentle entry. |
| **Walter Rudin, *Functional Analysis*** | The classical reference. Use after Lax. |
| **Brezis, *Functional Analysis, Sobolev Spaces and PDEs*** | The PDE-oriented modern text. Useful if you take 2.5 seriously. |

**Tips:** Kreyszig first, Lax second. Functional analysis is where measure theory and linear algebra fuse — Hilbert spaces, Banach spaces, operator theory. The four big theorems (Hahn-Banach, Open Mapping, Closed Graph, Uniform Boundedness) are the technical core; learn each cold. **The spectral theorem is the deep payoff**, and it's the bridge to quantum mechanics — when you study QM later, you'll already speak its language.

#### [E] Constructive Analysis

| Resource | Notes |
| :--- | :--- |
| **Errett Bishop, *Foundations of Constructive Analysis*** | The original. Read selectively. |
| **Bishop & Bridges, *Constructive Analysis*** | Updated version of the original. |
| **Douglas Bridges & Luminita Vita, *Techniques of Constructive Analysis*** | The modern textbook treatment. |
| **Andrej Bauer's blog and lectures (online)** | The contemporary advocate. Excellent free material. |

**Tips:** Don't read this as a substitute for classical analysis; read it as **philosophy made into mathematics**. After Bishop, the choice between classical and constructive math stops being abstract — you'll see exactly which theorems require excluded middle, which require choice, and what kind of mathematics survives without them. This couples directly to your interests in formal verification (proofs that compute) and the philosophy of mathematics (Trunk 4.4). Andrej Bauer's contemporary work bridges this with HoTT and computability — perfect for your spine.

#### [E] Harmonic Analysis

| Resource | Notes |
| :--- | :--- |
| **Stein & Shakarchi, *Fourier Analysis*** (Princeton Lectures I) | The right entry. |
| **Yitzhak Katznelson, *An Introduction to Harmonic Analysis*** | The standard. Slim and beautiful. |
| **Stein, *Harmonic Analysis: Real-Variable Methods, Orthogonality, and Oscillatory Integrals*** | The serious follow-up; only if drawn in. |

**Tips:** This [E] is small but valuable for cross-connection. Fourier analysis is the bridge to PDEs (2.5), computational applications in Trunk 3, and quantum mechanics (5.2). Stein-Shakarchi I alone is enough exposure. Read selectively — chapters on Fourier series, Fourier transforms, and the Plancherel theorem are essentials; everything else is bonus.

### TRUNK 2.3 — Geometry & Topology

Geometry and topology are where the categorical machinery of 1.4 meets concrete spaces. This is also where the bridge to physics finally has a real road on it.

#### [S] Point-Set Topology

Support role: order/topological language can clarify selected denotational-semantic models. Learn the concepts required by that treatment rather than making a topology course an entrance gate.

| Resource | Notes |
| :--- | :--- |
| **James Munkres, *Topology*** (2nd ed.) | The standard. Clear, paced, complete. |
| **John Lee, *Introduction to Topological Manifolds*** (Part I) | Modern alternative; sets up directly for differential topology. |
| **Stephen Willard, *General Topology*** (Dover) | The classical reference. More demanding. |
| **John Kelley, *General Topology*** | Old-school masterpiece. Use as reference. |

**Tips:** Use Munkres or Lee for open sets, continuity, compactness, and product and quotient spaces, selecting material needed by the current semantic or geometric model. Compactness provides a useful connection to logic, while Tychonoff’s theorem exposes the role of choice in the relevant formulation. Algebraic-topology material is a separate extension.

#### [E] Differential Geometry / Manifolds

| Resource | Notes |
| :--- | :--- |
| **John Lee, *Introduction to Smooth Manifolds*** (2nd ed.) | The right self-study book. Comprehensive, careful, paced. |
| **Loring Tu, *An Introduction to Manifolds*** | Gentler entry. Use if Lee feels heavy. |
| **Michael Spivak, *Calculus on Manifolds*** | The slim classic. Read first to get the flavor. |
| **Spivak, *A Comprehensive Introduction to Differential Geometry*, Vol. 1–5** | Spivak's epic. Vol. 1 is right for self-study; the rest is for falling in love. |
| **Theodore Frankel, *The Geometry of Physics*** | The physics-flavored treatment. Read **after** Lee, as the bridge to GR/gauge theory. |

**Tips:** Spivak’s *Calculus on Manifolds* provides a compact route; Lee’s *Smooth Manifolds* offers a fuller development. Lee's book is the modern self-study standard for a reason — every concept gets the treatment it deserves. Pay special attention to the chapters on tangent spaces, vector bundles, and differential forms — these are the conceptual heart. **Once you can prove Stokes' theorem in its general form, you've crossed the threshold.** Frankel's book at the end is the payoff: he shows you that Maxwell's equations, the Yang-Mills equations, and Einstein's equations are all just statements about differential forms on appropriate bundles.

#### [E] Algebraic Topology

| Resource | Notes |
| :--- | :--- |
| **Allen Hatcher, *Algebraic Topology*** (free online) | The standard. The book that shaped a generation. |
| **Tammo tom Dieck, *Algebraic Topology*** | Modern, categorical, more demanding. Read after Hatcher for breadth. |
| **Glen Bredon, *Topology and Geometry*** | The unification — point-set, differential, algebraic, all in one volume. |
| **Peter May, *A Concise Course in Algebraic Topology*** (free online) | Categorical-flavored. The right second book. |

**Tips:** Hatcher first, May second. Hatcher's book is famously gentle in tone, brutal in exercises — embrace this. The fundamental group → covering spaces → homology → cohomology arc is the spine; spend extra time on covering spaces (the categorical analogue of Galois theory shows up here in plain sight). The deep payoff: **algebraic topology is the original site where category theory was invented**, and reading Hatcher after Awodey lets you watch the abstraction crystallize from the concrete. By the time you finish, the link back to HoTT (Trunk 1.4) becomes vivid: types-as-spaces is not a metaphor; it's *this* mathematics, formalized.

#### [E] Riemannian Geometry

| Resource | Notes |
| :--- | :--- |
| **John Lee, *Introduction to Riemannian Manifolds*** (2nd ed.) | The right self-study book. Direct continuation of *Smooth Manifolds*. |
| **Manfredo do Carmo, *Riemannian Geometry*** | Classical, beautifully written. The alternative. |
| **Peter Petersen, *Riemannian Geometry*** | Modern, more advanced; for after Lee. |
| **Sylvestre Gallot, Dominique Hulin & Jacques Lafontaine, *Riemannian Geometry*** | The encyclopedic French treatment. |

**Tips:** Lee or do Carmo, your choice — both are excellent. The conceptual climb is metric → connection → curvature → geodesic; once you have curvature, you understand what general relativity is *about*. Do every computation by hand at least once: parallel transport on a sphere, Gaussian curvature of standard surfaces, Ricci tensor of FLRW. The abstract theory means nothing until you've made these computations live in your fingers.

### TRUNK 2.4 — Probability & Statistics: The Epistemology Lab

This is the most underrated section of the whole roadmap for your stated goals. Probability is *the* mathematical language for reasoning under uncertainty, which is to say: it's where epistemology becomes computable.

#### [E] Introductory Probability

| Resource | Notes |
| :--- | :--- |
| **Joseph Blitzstein & Jessica Hwang, *Introduction to Probability*** | Best modern intro. Story-based, builds Bayesian intuition naturally. |
| **Harvard Stat 110 lectures (Blitzstein, YouTube, free)** | Pair with the book. |
| **Sheldon Ross, *A First Course in Probability*** | Classical alternative. Drier. |

**Tips:** Measure theory is not a prerequisite for this introduction; calculus is needed for continuous distributions. The purpose is to acquire intuition for uncertainty: conditional probability, independence, expectation, variance, Bayes' theorem, common distributions, limit theorems, and probabilistic modeling. These intuitions later support measure-theoretic probability, statistics, formal epistemology, scientific inference, cognitive bias, Bayesian reasoning, and AI. If you do Blitzstein, skip Ross unless you want extra exercises.

#### [E] Measure-theoretic Probability

| Resource | Notes |
| :--- | :--- |
| **David Williams, *Probability with Martingales*** | The right book. Slim, sharp, beautifully written. |
| **Rick Durrett, *Probability: Theory and Examples*** (5th ed., free online) | Comprehensive modern textbook. |
| **Patrick Billingsley, *Probability and Measure*** | The classical. Heavy but complete. |
| **Achim Klenke, *Probability Theory: A Comprehensive Course*** | Modern encyclopedic alternative. |

**Tips:** Williams first, then Durrett for breadth. Williams treats martingales as the *organizing principle* of probability rather than a technical tool, and after his book you'll understand why martingales matter in everything from Brownian motion to mathematical finance to information theory. Use selected exercises to test the definitions. The conceptual core is conditional expectation as projection — when this clicks, statistics suddenly becomes geometry.

#### [E] Mathematical Statistics

| Resource | Notes |
| :--- | :--- |
| **George Casella & Roger Berger, *Statistical Inference*** | The standard. Solid. |
| **Erich Lehmann & George Casella, *Theory of Point Estimation*** | The classical reference. Use selectively. |
| **Larry Wasserman, *All of Statistics*** | The compressed modern version. Useful for fast review. |
| **Larry Wasserman, *All of Nonparametric Statistics*** | Sequel, for a broader view. |

**Tips:** Casella & Berger as backbone, Wasserman as supplement. The frequentist-Bayesian split becomes visible here for the first time, and you should read it as a philosophical question, not a technical one. **Every chapter should be cross-checked against your Bayesian intuition** — does the frequentist construction here have a Bayesian counterpart? When does it differ in answer, and why? This is exactly the epistemological lab work you came for.

#### [E] Stochastic Processes / Martingales

| Resource | Notes |
| :--- | :--- |
| **Williams, *Probability with Martingales*** (already covered) | Sufficient for foundations. |
| **Bernt Øksendal, *Stochastic Differential Equations*** | The right introduction to SDEs. Beautiful. |
| **Daniel Stroock & S.R. Srinivasa Varadhan, *Multidimensional Diffusion Processes*** | The serious treatment. Save for if you fall in love. |
| **Jean-François Le Gall, *Brownian Motion, Martingales, and Stochastic Calculus*** | Modern, clean, French-school. |

**Tips:** This is optional depth; pursue only if SDEs/finance/physics call. Øksendal alone gives you everything you need to understand Itô calculus, which underlies modern mathematical finance, statistical mechanics, and stochastic optimization. The deep insight: **Brownian motion is the universal noise object** the way the integers are the universal arithmetic object. This perspective links downstream to physics (5.1 stat mech) and ML (3.2 diffusion models).

#### [E] Bayesian Inference & Decision Theory

| Resource | Notes |
| :--- | :--- |
| **Andrew Gelman et al., *Bayesian Data Analysis*** (3rd ed.) | The standard. The right one to actually do. |
| **Edwin Jaynes, *Probability Theory: The Logic of Science*** | The philosophical masterwork. Polemical, opinionated, essential. |
| **David MacKay, *Information Theory, Inference, and Learning Algorithms*** | Already on your list; read the inference chapters again with full attention here. |
| **Leonard Savage, *The Foundations of Statistics*** | Classical decision theory. Read after Jaynes. |

**Tips:** **Jaynes is the book to read for your goals.** It is one of the most philosophically serious mathematical books of the 20th century, and its claim — that probability theory is a normative theory of reasoning under uncertainty, full stop — is precisely the position you need to evaluate for your epistemology work. Read Jaynes alongside Hacking (Trunk 4.3); they're in conversation across decades. The Causal Inference & Model Evaluation entry below distinguishes probabilistic prediction from causal claims and makes their additional assumptions explicit. By the end of this section you'll have a defensible, technically grounded position on what knowledge under uncertainty *is*.

#### [E] Causal Inference & Model Evaluation

After introductory probability and relevant statistical inference.

| Resource | Notes |
| :--- | :--- |
| **Miguel A. Hernán & James M. Robins, *Causal Inference: What If*** (2020; [author’s online edition](https://miguelhernan.org/whatifbook)) | An entry through causal questions, study design, exchangeability, positivity, consistency, and selection bias. 2020 is the authors’ requested citation year for this continuously updated online book. |
| **Judea Pearl, *Causality*** | Causal graphs, interventions, counterfactuals, confounding, and identifiability. |
| **Andrew Gelman et al., *Bayesian Data Analysis*** | Reuse the model-checking and predictive-assessment material from Bayesian Inference & Decision Theory. |
| **Peter Godfrey-Smith, *Theory and Reality*** | Connect evidence, explanation, realism, and models to Trunk 4.5. |
| **Nancy Cartwright, *How the Laws of Physics Lie*** | A philosophical counterpoint on idealization and the scope of models; see Trunk 4.5. |

**Tips:** Hernán–Robins offers an entry through study design and identification assumptions; Pearl supplies the structural causal perspective. Part I of *What If* develops causal inference without statistical models, with later parts adding models and longitudinal data. Distinguish a prediction from an intervention claim. Draw a small causal graph, state the assumptions that would identify the effect of interest, and check what the available observations can support. Examine model fit, sensitivity to assumptions, and the gap between a measured variable and the phenomenon it represents. Use this topic at the crossings with scientific explanation (4.5), cognition (4.6), and social research (6.3); a formal result is conditional on the model, while the model’s applicability needs evidence.

#### [E] Formal Epistemology

| Resource | Notes |
| :--- | :--- |
| **Branden Fitelson, *Studies in Bayesian Confirmation Theory*** | Best technical entry into Bayesian confirmation if you want the confirmation-theory core. |
| **Richard Bradley, *Decision Theory with a Human Face*** | Good bridge between decision theory, rational agency, and philosophical interpretation. |
| **Brian Skyrms, *Choice and Chance*** | Classic bridge between probability, induction, and philosophy of science. |
| **Kevin Kelly, *The Logic of Reliable Inquiry*** | Formal learning theory; deeper, more specialized, but directly relevant to inquiry under uncertainty. |
| **van Benthem, *Logical Dynamics of Information and Interaction*** | For epistemic logic and information change. Advanced; use selectively. |

**Tips:** Read this after Bayesian inference and decision theory, not before. The central question is: **what formal constraints should rational belief obey?** Bayesian confirmation gives one answer; epistemic logic gives another; belief revision gives another; formal learning theory gives yet another. Do not treat these as replacements for ordinary epistemology. Treat them as pressure tests. Every philosophical claim about evidence, justification, testimony, disagreement, or inquiry should be asked: can this be represented formally, and what is lost when we represent it?

#### [E] Information Geometry

| Resource | Notes |
| :--- | :--- |
| **Shun-ichi Amari, *Information Geometry and Its Applications*** | The standard. Read first. |
| **Amari & Hiroshi Nagaoka, *Methods of Information Geometry*** | The deeper treatment. After Amari's later book. |
| **Frank Nielsen, *An Elementary Introduction to Information Geometry*** (paper, free online) | The 50-page primer. Start here. |

**Tips:** This is a wonderful [E] for your roadmap because it sits exactly at the intersection of probability, differential geometry, and information theory. Statistical models become Riemannian manifolds; the Fisher information *is* the metric; KL divergence is a (non-symmetric) distance. After this, you understand statistical inference as geometry, which links it back to physics (variational methods) and ML (natural gradient methods). Optional but high-yield if you have Trunks 2.3 and 2.4 already in hand.

### TRUNK 2.5 — Dynamical Systems, Differential Equations & Inverse Problems

Study how models evolve, when predictions are stable, and what observations can identify about an underlying system. Differential equations describe forward models; inverse problems and uncertainty quantification examine what can be inferred from their outputs.

#### [E] Ordinary Differential Equations & Dynamical Systems

| Resource | Notes |
| :--- | :--- |
| **Steven H. Strogatz, *Nonlinear Dynamics and Chaos: With Applications to Physics, Biology, Chemistry, and Engineering*** (3rd ed., 2024; [publisher](https://www.routledge.com/Nonlinear-Dynamics-and-Chaos/Strogatz/p/book/9780367026509)) | An applied entry through phase portraits, stability, bifurcations, chaos, and collective behavior; complements the more geometric and analytic texts. |
| **Vladimir Arnold, *Ordinary Differential Equations*** | The book. Geometric, beautiful, demanding. |
| **Morris Hirsch, Stephen Smale & Robert Devaney, *Differential Equations, Dynamical Systems, and an Introduction to Chaos*** | The right modern alternative. Pedagogically generous. |
| **Lawrence Perko, *Differential Equations and Dynamical Systems*** | More technical; for follow-up. |
| **Gerald Teschl, *Ordinary Differential Equations and Dynamical Systems*** (free online) | The clean modern treatment. |

**Tips:** Strogatz provides an applied entry; Arnold and Hirsch–Smale–Devaney develop geometric and qualitative perspectives. Follow equilibria, stability, phase portraits, bifurcations, and sensitivity to initial conditions in a specific system. Calculus, linear algebra, and elementary differential equations support the examples. Use solution techniques as needed, and distinguish deterministic dynamics from practical predictability.

#### [E] Partial Differential Equations

| Resource | Notes |
| :--- | :--- |
| **Lawrence Evans, *Partial Differential Equations*** (2nd ed.) | The standard. The right serious book. |
| **Walter Strauss, *Partial Differential Equations: An Introduction*** | The right gentle entry. |
| **Fritz John, *Partial Differential Equations*** | Classical, slim, beautiful. |
| **Michael Taylor, *Partial Differential Equations*, Vol. 1–3** | The encyclopedic modern reference. Use selectively. |

**Tips:** Strauss for first read, Evans for serious work. Evans is famous for being simultaneously rigorous and accessible — rare in PDE textbooks. The three classical equations (Laplace, heat, wave) get the bulk of the attention; learn each cold. **The maximum principle, energy methods, and Fourier methods** are the technical core. Once you can solve the heat equation on the line and the Laplace equation on a disk from scratch, you're ready for physics. Functional analysis (Trunk 2.2) and distributions become indispensable here — if you didn't internalize them earlier, this is the moment they bite.

#### [E] Calculus of Variations

| Resource | Notes |
| :--- | :--- |
| **I. M. Gelfand & S. V. Fomin, *Calculus of Variations*** (Dover) | The classical. Slim, perfect, cheap. |
| **Bruce van Brunt, *The Calculus of Variations*** | The right modern textbook. |
| **Bernard Dacorogna, *Direct Methods in the Calculus of Variations*** | The serious modern follow-up; advanced. |

**Tips:** Gelfand–Fomin is a compact entry, with van Brunt as an alternative and Dacorogna for further depth. Derive the Euler–Lagrange equations and distinguish stationary points from minima. This supports Lagrangian and Hamiltonian mechanics in 5.1 and the variational characterization of geodesics in geometry. Keep the assumptions and boundary conditions visible when translating a physical model into a variational problem.

#### [E] Inverse Problems & Uncertainty Quantification

After probability, linear algebra, and the analysis needed by the chosen forward model.

| Resource | Notes |
| :--- | :--- |
| **T. J. Sullivan, *Introduction to Uncertainty Quantification*** (2015; [publisher](https://link.springer.com/book/10.1007/978-3-319-23395-6)) | Bayesian inverse problems, sensitivity analysis, model reduction, uncertainty propagation, and distributional uncertainty; some developments use Banach and Hilbert spaces. |

**Tips:** Ask whether observations determine a unique solution and how much the inference changes when data or assumptions change. Distinguish measurement noise, uncertain parameters, model discrepancy, and numerical approximation. Work through a small inverse problem, identify instability, and examine what regularization or a prior contributes. This connects probability in 2.4 to physical inference in Trunk 5 and to model evaluation in 4.5; uncertainty quantified within a model does not establish that the model is adequate.

### TRUNK 3.1 — Algorithms, Complexity & Computation

Algorithms and resource bounds support the computational spine. Cryptography, quantum computation, and synthesis provide optional applications and alternative computational models.

#### [S] Algorithms & Data Structures

| Resource | Notes |
| :--- | :--- |
| **Cormen, Leiserson, Rivest, Stein, *Introduction to Algorithms*** (CLRS, 4th ed.) | The standard. Use as backbone. |
| **Jeff Erickson, *Algorithms*** (free online) | The right modern alternative — sharper, leaner, funnier than CLRS. **Many serious self-learners now prefer this.** |
| **Sedgewick & Wayne, *Algorithms*** (4th ed.) | The implementation-flavored alternative. |
| **Kleinberg & Tardos, *Algorithm Design*** | The best book on *algorithmic thinking* as a skill. Read after CLRS/Erickson. |
| **Skiena, *The Algorithm Design Manual*** | The pragmatic reference. Use as lookup. |

**Tips:** Erickson + Kleinberg-Tardos is the modern pairing. Erickson teaches the algorithms; Kleinberg-Tardos teaches the *design discipline*. Skip the trivial chapters (sorting, basic data structures) and spend serious time on dynamic programming, network flow, NP-completeness, randomized algorithms. **Dynamic programming is the single algorithmic technique most worth fluency** — it's the bridge to control theory, RL, and computational biology. CLRS as reference only; treating it as a read-through is a common time sink.

#### [S] Computational Complexity

| Resource | Notes |
| :--- | :--- |
| **Sanjeev Arora & Boaz Barak, *Computational Complexity: A Modern Approach*** | The standard. Modern, comprehensive, well-written. |
| **Christos Papadimitriou, *Computational Complexity*** | The classical. Read after Arora-Barak for breadth. |
| **Sipser** (already on your list) | The intro. By now insufficient on its own. |
| **Oded Goldreich, *Computational Complexity: A Conceptual Perspective*** | The conceptual alternative — emphasizes *why* over *how*. |

**Tips:** Use selected parts of Arora–Barak for reductions, complexity classes, randomness, and resource bounds; Goldreich provides a conceptual alternative. Interactive proofs, PCP, derandomization, and approximation hardness offer further directions. Distinguish proven lower bounds from conjectured separations, and resource limits from the undecidability results in 1.2.

#### [E] Cryptography

| Resource | Notes |
| :--- | :--- |
| **Jonathan Katz & Yehuda Lindell, *Introduction to Modern Cryptography*** (3rd ed.) | **The right book.** Definition-driven, rigorous, modern. |
| **Dan Boneh & Victor Shoup, *A Graduate Course in Applied Cryptography*** (free online) | The serious modern follow-up. Free. |
| **Bruce Schneier, *Cryptography Engineering*** | The applied perspective. Read for engineering reality. |
| **Boneh's Stanford course (online, free)** | The right video course. |

**Tips:** Katz-Lindell is the book — it's the one that actually treats crypto as the *theory of provable security* rather than a bag of tricks. The definition-driven approach (every primitive is defined by what game an adversary plays) is the right way to think about all of crypto. After Katz-Lindell, Boneh-Shoup for breadth. The connection back to your spine: cryptography is **complexity theory made into engineering** — every assumption is a hardness assumption from complexity, and every proof is a reduction. This is the direct application path of Trunk 1.2 you wanted.

#### [E] Quantum Computing

| Resource | Notes |
| :--- | :--- |
| **Michael Nielsen & Isaac Chuang, *Quantum Computation and Quantum Information*** | The standard. Comprehensive. |
| **Phillip Kaye, Raymond Laflamme, Michele Mosca, *An Introduction to Quantum Computing*** | The gentler entry. |
| **John Preskill's Caltech lecture notes (free online)** | The serious physicist's perspective. |
| **Andy Matuschak & Michael Nielsen, *Quantum Country*** (free online) | The brilliantly designed introduction with built-in spaced repetition. |

**Tips:** Quantum Country offers an accessible entry, with Nielsen–Chuang, Kaye–Laflamme–Mosca, and Preskill supplying different levels of detail. Compare circuit models, algorithmic resources, and measurement assumptions. Shor’s and Grover’s algorithms provide concrete cases; distinguish known speedups from conjectured separations between complexity classes. This connects physical models of computation to the resource questions in 3.1.

#### [E] Program Synthesis

| Resource | Notes |
| :--- | :--- |
| **Sumit Gulwani, Oleksandr Polozov, Rishabh Singh, *Program Synthesis*** (FNT survey, free online) | The right entry point. |
| **The Sketch project papers (Bodik, MIT)** | The classical sketching approach. |
| **Recent neurosymbolic papers (DreamCoder etc.)** | The modern frontier — synthesis + neural networks. |

**Tips:** The FNT survey introduces specifications, search, constraints, and synthesis from examples; Sketch and selected neurosymbolic papers develop different approaches. Compare what a specification states, what examples leave underdetermined, and which properties a synthesized program is actually checked to satisfy. This connects formal methods in 1.3 to learning in 3.2 without making successful code generation a sufficient test of semantic understanding.

### TRUNK 3.2 — Learning, Representation & Understanding

Learning guarantees, model mechanisms, and claims about understanding answer different questions. Relate them through explicit assumptions and evidence.

#### [E] Machine Learning

| Resource | Notes |
| :--- | :--- |
| **Mikhail Belkin, “Fit without Fear: Remarkable Mathematical Phenomena of Deep Learning through the Prism of Interpolation”** (2021; [paper](https://arxiv.org/abs/2105.14368)) | Extension on interpolation, overparameterization, generalization, and optimization; read alongside classical learning theory, not as a complete theory of deep learning. |
| **Christopher Bishop, *Pattern Recognition and Machine Learning*** (PRML) | The classical mathematician's choice. Bayesian flavor. |
| **Kevin Murphy, *Probabilistic Machine Learning: An Introduction* + *Advanced Topics*** | **The modern standard.** Two volumes; the new Bishop. |
| **Trevor Hastie, Robert Tibshirani, Jerome Friedman, *The Elements of Statistical Learning*** (ESL, free online) | The statistical-learning perspective. The classical reference. |
| **Shai Shalev-Shwartz & Shai Ben-David, *Understanding Machine Learning: From Theory to Algorithms*** (free online) | The theoretical foundations. Read for PAC learning, VC theory, generalization. |
| **Andrew Ng, Stanford CS229 lectures** (YouTube) | The right intro video course. |

**Tips:** Murphy offers a broad probabilistic route; Bishop and ESL remain useful alternatives and references. Shalev-Shwartz–Ben-David develops PAC learning, VC dimension, and the assumptions behind generalization guarantees. Belkin examines why interpolation and overparameterization complicate familiar intuitions about fitting and generalization. Keep the learning setting, distributional assumptions, hypothesis class, and guarantee explicit; this is the connection to inquiry under uncertainty in 2.4.

#### [E] Deep Learning & LLM Internals

| Resource | Notes |
| :--- | :--- |
| **Ian Goodfellow, Yoshua Bengio, Aaron Courville, *Deep Learning*** (free online) | The standard intro. Now slightly dated but foundational. |
| **Simon Prince, *Understanding Deep Learning*** (free online) | The right modern textbook. Beautiful. |
| **Andrej Karpathy's *Zero to Hero* lectures (YouTube)** | **The single best learning resource for transformer-era ML.** Karpathy implements GPT from scratch on video. |
| **Sebastian Raschka, *Build a Large Language Model (From Scratch)*** | The book version of the same idea. |
| **Jay Alammar's blog** ("The Illustrated Transformer," "The Illustrated GPT-2") | Best visual explanations of transformer internals. |

**Tips:** Prince supplies a mathematical entry; Karpathy and Raschka offer implementation-based routes, with Goodfellow–Bengio–Courville and Alammar as references and alternatives. Building a small transformer can clarify attention, training objectives, and inference. Distinguish understanding the architecture from understanding what a particular trained network has learned; the latter motivates mechanistic interpretability.

#### [E] Mechanistic Interpretability

After neural-network fundamentals; causal models from 2.4 support the intervention-based analyses.

| Resource | Notes |
| :--- | :--- |
| **Anthropic's Transformer Circuits Thread** (free online) | A sequence of research case studies; select those that address the mechanism or method under investigation. |
| **Neel Nanda, *A Comprehensive Mechanistic Interpretability Explainer & Glossary*** (free online) | The right entry point. |
| **Neel Nanda's YouTube tutorials and ARENA curriculum** | The right hands-on training. |
| **Atticus Geiger et al., “Causal Abstraction: A Theoretical Foundation for Mechanistic Interpretability”** (2025; [JMLR](https://jmlr.org/papers/v26/23-0058.html)) | A formal account of how higher-level mechanisms can faithfully abstract lower-level computations; the journal version develops connections among intervention-based interpretability methods. |
| **Melanie Mitchell & David C. Krakauer, “The Debate over Understanding in AI’s Large Language Models”** (2023; [PNAS](https://www.pnas.org/doi/10.1073/pnas.2215907120)) | A perspective on competing claims about understanding, the evidence invoked, and the need to distinguish different forms of competence. |

**Tips:** Nanda and ARENA provide practical entry points; use selected Transformer Circuits studies as worked investigations. Geiger and colleagues sharpen the question of whether an explanation faithfully represents a model’s mechanisms. Compare behavior, internal interventions, and alternative explanations; Mitchell–Krakauer helps separate these findings from claims about understanding. This supports the crossings with 4.2 and 4.6 without making a discovered circuit sufficient evidence for humanlike cognition.

#### [E] AI Alignment

| Resource | Notes |
| :--- | :--- |
| **Stuart Russell, *Human Compatible*** | The accessible alignment overview. |
| **Brian Christian, *The Alignment Problem*** | The journalistic intro. Read first if the field is foreign. |
| **Hubinger et al., *Risks from Learned Optimization*** (2019, paper) | The conceptual alignment. |
| **AI Alignment Forum** (free online) | The actual research community. Read selectively. |

**Tips:** Christian supplies an accessible overview, Russell examines the specification of objectives, and Hubinger and colleagues distinguish training objectives from possible learned optimization processes. Follow a concrete question about desired behavior, incentives, evaluation, or failure modes. Interpretability can inform this inquiry, but identifying a mechanism and deciding which behavior should be pursued are different tasks. Treat research-community discussions as proposals to assess rather than an additional compulsory syllabus.

#### [E] Reinforcement Learning

| Resource | Notes |
| :--- | :--- |
| **Richard Sutton & Andrew Barto, *Reinforcement Learning: An Introduction*** (2nd ed., free online) | A main-text option for value functions, policy learning, and sequential decisions. |
| **DeepMind & UCL RL course (David Silver, YouTube)** | The standard video course. |
| **Spinning Up in Deep RL** (OpenAI, free online) | The applied modern entry. |

**Tips:** Use Sutton & Barto Part I for Bellman equations, policy iteration, and value iteration. The conceptual depth — Bellman equations, policy iteration, value iteration — is more important than the deep RL machinery for your goals. RL is also the closest computational analogue to several philosophical concepts (decision theory under uncertainty, agency, reward hacking), so the Sutton-Barto exposure pays philosophical dividends.

### TRUNK 3.3 — Systems & Engineering

Explore systems according to professional needs or interest. These topics do not impose a complete engineering refresh before the logical or philosophical branches.

#### [E] Computer Architecture

| Resource | Notes |
| :--- | :--- |
| **Patterson & Hennessy, *Computer Organization and Design*** (RISC-V edition, 2nd) | The right textbook. The RISC-V edition is the modern choice. |
| **Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*** (6th ed.) | The advanced sequel. For after the basics. |
| **Bryant & O'Hallaron, *Computer Systems: A Programmer's Perspective*** (CS:APP, 3rd ed.) | The bridge book — architecture *as it appears to a programmer*. **Highest leverage for your goals.** |
| **Charles Petzold, *Code: The Hidden Language of Computer Hardware and Software*** | The gentlest possible entry. Read for joy. |
| **Onur Mutlu's CMU lectures (YouTube)** | The best video material. |

**Tips:** CS:APP offers a programmer-facing route through machine representation, memory, and performance; Patterson–Hennessy provides more architectural detail. Select labs or examples that expose a concrete interface between software and hardware. The engineering depth depends on the system you want to understand.

#### [E] Operating Systems

| Resource | Notes |
| :--- | :--- |
| **Remzi & Andrea Arpaci-Dusseau, *Operating Systems: Three Easy Pieces*** (OSTEP, free online) | An entry organized around virtualization, concurrency, and persistence. |
| **Tanenbaum & Bos, *Modern Operating Systems*** | The classical comprehensive alternative. |
| **Silberschatz, Galvin, Gagne, *Operating System Concepts*** | The "dinosaur book." Reference only. |
| **MIT 6.S081 / xv6 (free online)** | The hands-on companion: a tiny real OS to read and modify. |

**Tips:** OSTEP and xv6 offer complementary conceptual and implementation-based entries. Select a subsystem—scheduling, virtual memory, or a filesystem—and relate its invariants and failure modes to concrete code. The MIT course and labs support a deeper implementation project when it serves your interests.

#### [E] Computer Networks

| Resource | Notes |
| :--- | :--- |
| **Kurose & Ross, *Computer Networking: A Top-Down Approach*** (8th ed.) | The right textbook. Top-down beats bottom-up for self-learners. |
| **Tanenbaum & Wetherall, *Computer Networks*** | The classical comprehensive alternative. |
| **W. Richard Stevens, *TCP/IP Illustrated*, Vol. 1** | The definitive practical reference. Use as deep-dive after Kurose-Ross. |
| **Beej's Guide to Network Programming** (free online) | The right way to actually *write* networking code. |

**Tips:** Kurose-Ross + Beej is the magic pair. Kurose-Ross teaches the principles; Beej forces you to write a real client/server in C with sockets. **Do not skip the application-layer chapters** even if they look easy — HTTP, DNS, and TLS are the protocols you'll actually deal with. Stevens' TCP/IP for selective deep dives later when you specifically need to debug something.

#### [E] Databases

| Resource | Notes |
| :--- | :--- |
| **Garcia-Molina, Ullman, Widom, *Database Systems: The Complete Book*** (2nd ed.) | The standard. Comprehensive. |
| **Hellerstein & Stonebraker, *Readings in Database Systems*** ("the Red Book," free online) | The curated paper anthology. **Highest leverage.** |
| **Martin Kleppmann, *Designing Data-Intensive Applications*** (DDIA) | An integrative reference on data models, storage, and distributed-system tradeoffs. |
| **Andy Pavlo's CMU 15-445/645 lectures (YouTube)** | The best video material on database internals. |

**Tips:** DDIA links storage, data models, and distributed-system tradeoffs; Pavlo’s lectures provide a route into buffer pools, query processing, concurrency control, and recovery. Use the Red Book for selected primary papers and Garcia-Molina–Ullman–Widom for reference. Follow a concrete question about correctness, consistency, performance, or the representation of data.

#### [E] Distributed Systems

| Resource | Notes |
| :--- | :--- |
| **Martin Kleppmann, *Designing Data-Intensive Applications*** | Same book; the distributed-systems chapters are foundational. |
| **Maarten van Steen & Andrew Tanenbaum, *Distributed Systems*** (3rd ed., free online) | The right textbook. |
| **MIT 6.824 lectures (YouTube)** | The best video course. |
| **The classic papers** (Lamport, Paxos, Raft, Dynamo, Spanner, MapReduce) — read directly | Most of distributed systems lives in papers, not textbooks. |
| **Diego Ongaro & John Ousterhout, *In Search of an Understandable Consensus Algorithm* (Raft paper)** | The single most readable systems paper. |

**Tips:** DDIA, then 6.824, then the papers. Distributed systems is the field where reading the original papers genuinely is the textbook — Lamport's *Time, Clocks, and the Ordering of Events* is a 7-page paper that changed how we think about concurrency and is more illuminating than any textbook chapter. The 6.824 labs (implementing Raft, a sharded KV store) are the right hands-on work.


### TRUNK 4 — Philosophy-of-Language Branch & Philosophical Extensions

Sections 4.1–4.2 form the philosophy-of-language branch; Tarski's account of truth also belongs to the shared models-and-semantics spine. The other sections provide supporting perspectives or independent exploration. Use the background needed for a particular argument rather than requiring completion of entire trunks.

### TRUNK 4.1 — Sense, Reference & Logical Form

Language-branch core. Basic logic helps with Frege, Russell, and the early Wittgenstein; the technical material in 1.1 supplies that background.

#### [C] Sense & Reference — Frege

| Resource | Notes |
| :--- | :--- |
| **Gottlob Frege, *The Foundations of Arithmetic*** (Austin trans.) | The most readable Frege. Select passages for the question at hand. |
| **Gottlob Frege, *Begriffsschrift*** (in van Heijenoort) | Excerpts. The first modern formal logic. |
| **Frege, *On Sense and Reference*** (1892) | The 30-page essay that founded modern philosophy of language. |
| **Frege, *Function and Concept*** (1891) + **Frege, *On Concept and Object*** (1892) | The companion short essays. |
| **Michael Beaney, ed., *The Frege Reader*** | A useful anthology — every essential Frege text in one volume. |
| **Michael Dummett, *Frege: Philosophy of Language*** | The classic secondary work. Demanding, monumental. |
| **Joan Weiner, *Frege Explained*** | A gentle secondary source. |

**Tips:** *Foundations of Arithmetic* + *On Sense and Reference* are the irreducible core. Use the primary texts with a commentary when a particular argument needs clarification. The single most important idea is the **context principle** ("never ask for the meaning of a word in isolation, but only in the context of a proposition") — this seemingly simple thought ramifies forward through Wittgenstein, Quine, and the entire 20th century. The *On Sense and Reference* distinction (Sinn vs Bedeutung) is the second great idea; trace its consequences forward into Kripke (4.2). Beaney's *The Frege Reader* is your reference.

#### [C] Descriptions & Logical Analysis — Russell

| Resource | Notes |
| :--- | :--- |
| **Bertrand Russell, *On Denoting*** (1905, free online) | A short paper on descriptions and logical form. |
| **Russell, *The Principles of Mathematics*** (1903, free online) | Selectively. The book that reformulated mathematics in logical-philosophical terms. |
| **Russell, *Introduction to Mathematical Philosophy*** | The accessible mid-career summary. Beautifully written. |
| **Russell & Whitehead, *Principia Mathematica*** | Reference only. Don't read; know it exists. |
| **A. C. Grayling, *Russell: A Very Short Introduction*** | A useful secondary entry. |
| **Ray Monk, *Bertrand Russell: The Spirit of Solitude* (Vol. 1)** | The biography that contextualizes the philosophy. Optional but rewarding. |

**Tips:** Use *On Denoting* to reconstruct the logical analysis of a definite description; *Introduction to Mathematical Philosophy* offers a gentler route into Russell's notation and aims. Russell's theory of descriptions is the founding move of analytic philosophy as a method: take an apparently simple linguistic surface ("the present King of France is bald") and show that its logical structure is radically different from what grammar suggests. This program — distrust grammatical surface, find logical depth — is the methodological backbone of Trunks 4.1–4.2. *Introduction to Mathematical Philosophy* is the friendly companion and Russell at his pedagogical best.

#### [C] Representation & the Limits of Language — Wittgenstein, *Tractatus*

| Resource | Notes |
| :--- | :--- |
| **Ludwig Wittgenstein, *Tractatus Logico-Philosophicus*** (Pears & McGuinness trans.) | The standard translation. The Ogden translation is also good and more historically grounded. |
| **G. E. M. Anscombe, *An Introduction to Wittgenstein's Tractatus*** | The companion. Read in parallel. |
| **Michael Morris, *Wittgenstein and the Tractatus*** (Routledge) | Modern accessible commentary. |
| **H. O. Mounce, *Wittgenstein's Tractatus: An Introduction*** | A gentle entry. |
| **Marie McGinn, *Elucidating the Tractatus*** | The "resolute" reading — controversial, illuminating. |
| **Ray Monk, *Ludwig Wittgenstein: The Duty of Genius*** | The biography. Indispensable for understanding Wittgenstein. |

**Tips:** The numbered architecture matters: seven main propositions branch into remarks that clarify their relationships. An overview can reveal that structure; Anscombe, Mounce, Morris, or McGinn can support close reading of a particular passage. **The famous closing — "what we cannot speak about we must pass over in silence" — gives one formulation of the problem of expression.** Compare the account of representation with the later *Philosophical Investigations* in 4.2 when questions about use and practice arise; the contrast concerns the relation between representation and use.

### TRUNK 4.2 — Truth, Reference & Language Use

Tarski's truth and satisfaction material continues the shared spine from 1.2. Quine, Kripke, and the later Wittgenstein belong to the language branch. Relevant prerequisites are logical vocabulary and the positions each author addresses; completing incompleteness or the type-theory branch is not a blanket entrance requirement.

#### [C] Truth & Satisfaction — Tarski

| Resource | Notes |
| :--- | :--- |
| **Alfred Tarski, *The Semantic Conception of Truth*** (1944, free online) | The accessible version. |
| **Tarski, *The Concept of Truth in Formalized Languages*** (1933/1956) | The full technical version. |
| **Scott Soames, *Understanding Truth*** | Modern philosophical commentary. |
| **Donald Davidson, *Inquiries into Truth and Interpretation*** | Davidson's extension of Tarski into philosophy of language. Essential follow-up. |
| **Wolfgang Künne, *Conceptions of Truth*** | The encyclopedic survey. Use as reference. |

**Tips:** Tarski 1944 first — it's a 50-page essay that reads beautifully. Then sample the 1933 monograph for its technical machinery (you have the logic now). The undefinability theorem (truth-in-L is not definable in L) is Gödel's twin — both arise from the same diagonalization, both express the same essential limit of formal systems. Davidson then extends Tarski's apparatus from formal to natural languages, which is the move that makes truth-conditional semantics the dominant 20th-century theory of meaning. **Read Davidson's *Truth and Meaning* (1967, the founding paper) as your bridge from Tarski to contemporary philosophy of language.**

#### [S] Context & Pragmatics

| Resource | Notes |
| :--- | :--- |
| **Robert Stalnaker, *Context*** (2014) | Common ground, presupposition, assertion, and the changing background of a conversation. [Publisher](https://academic.oup.com/book/9317) |

**Tips:** What does a sentence contribute, and what must its speakers already take for granted? Stalnaker develops a formal account of shared background information and its revision through discourse. Read the chapters on common ground, presupposition, or compositionality according to the problem at hand. This supports the move from Tarski's truth conditions to language use without treating semantic content and conversational effects as identical. Natural-Language Formal Semantics in Trunk 6.1 supplies worked analyses; the Wittgenstein entry supplies a different philosophical perspective on practice.

#### [C] Analyticity, Translation & Holism — Quine

| Resource | Notes |
| :--- | :--- |
| **W. V. O. Quine, *From a Logical Point of View*** | The essay collection containing *Two Dogmas of Empiricism*. Essential. |
| **Quine, *Word and Object*** | A central text. Slow and dense; read selectively. |
| **Quine, *Ontological Relativity and Other Essays*** | The follow-up collection. |
| **Quine, *The Roots of Reference*** | The mature epistemological statement. |
| **Peter Hylton, *Quine*** (Routledge) | A useful secondary work. |
| **Roger Gibson, *The Cambridge Companion to Quine*** | The reference anthology. |

**Tips:** *Two Dogmas of Empiricism* is the essay everyone reads, and rightly so — it's the 1951 paper that demolished the analytic-synthetic distinction and reorganized 20th-century epistemology around the **web of belief** image. *Word and Object* introduces radical translation and the **indeterminacy of translation thesis** — these are central to your "limits of language" interest. Don't try to read all of Quine; read *Two Dogmas* + the first three chapters of *Word and Object* + selected later essays. The Quine-Duhem thesis (theories face the tribunal of experience as wholes, not piecemeal) is the philosophical scaffolding for everything that follows in philosophy of science (4.5).

#### [C] Reference, Modality & Rule-Following — Kripke

| Resource | Notes |
| :--- | :--- |
| **Saul Kripke, *Naming and Necessity*** | Select passages for the question at hand. |
| **Kripke, *Wittgenstein on Rules and Private Language*** | The 1982 monograph. The "Kripkenstein" interpretation. Controversial, illuminating. |
| **Scott Soames, *Reference and Description*** | A useful secondary work on Kripke's reference theory. |

**Tips:** *Naming and Necessity* is a useful entry through three lectures; the prose is conversational and surprisingly accessible given its philosophical importance. The core moves: (1) reference is fixed by causal-historical chains, not by descriptions; (2) some truths are necessary but a posteriori (water = H₂O), and some are contingent but a priori (the meter stick); (3) this collapses the inherited Kantian alignment of necessary/a priori and contingent/a posteriori. **The third move is the conceptual revolution.** Read Kripke after Frege+Russell+Quine and the structure becomes clear: he is rejecting the descriptivist tradition Frege+Russell built and that Quine accepted. *Wittgenstein on Rules* is a separate masterpiece on rule-following that prefigures Trunk 4.6 (philosophy of mind) and connects directly to your interest in formalization (what does it *mean* to follow a rule?).

#### [C] Meaning as Use & Language Practice — Wittgenstein, *Philosophical Investigations*

| Resource | Notes |
| :--- | :--- |
| **Ludwig Wittgenstein, *Philosophical Investigations*** (Hacker-Schulte 4th ed.) | The standard translation. |
| **Marie McGinn, *Wittgenstein and the Philosophical Investigations*** (Routledge) | The right modern guide. |
| **P. M. S. Hacker, *Wittgenstein: Connections and Controversies*** | The deep secondary literature. |
| **Stanley Cavell, *The Claim of Reason*** | The American philosophical reading. Demanding but rewarding. |
| **David Pears, *The False Prison*, Vol. 2** | Continuation of Pears' classic study of both Wittgensteins. |

**Tips:** This is a central philosophical text for the language branch. Select remarks around a question and use a commentary where the surrounding argument matters. The *Investigations* is structured as numbered remarks, often only loosely connected — Wittgenstein called it "an album." Don't try to systematize. The central sequences to absorb: rule-following (§§138–242), private language (§§243–315), aspect-seeing (Part II §xi). **The rule-following passages are the bombshell** — they question whether anything in your mental state could possibly determine the correct application of a rule in a new case. This problem links directly to Trunk 1.3 (formal systems and computation), Trunk 4.6 (philosophy of mind, machine understanding), and your central question about the limits of formalization. The shift from *Tractatus* to *Investigations* — picture theory of meaning replaced by use theory of meaning — is the most consequential intellectual movement in 20th-century philosophy. Hold the two books in your mind together.

### TRUNK 4.3 — Epistemology — Introductory and Contemporary

The introductory readings require no advanced mathematics. Probability and statistics from Trunk 2.4 support formal approaches where needed; prerequisites depend on the text and argument.

#### [E] Introductory Epistemology

| Resource | Notes |
| :--- | :--- |
| **Duncan Pritchard, *What Is This Thing Called Knowledge?*** | An accessible entry. Clear and analytic. |
| **Robert Audi, *Epistemology: A Contemporary Introduction to the Theory of Knowledge*** | More systematic and textbook-like. |
| **Jonathan Dancy, Ernest Sosa & Matthias Steup, eds., *A Companion to Epistemology*** | Reference, not first read. |
| **SEP: Epistemology** | Use as a map, not as a textbook. |
| **Polanyi, *Personal Knowledge*** | Tacit understanding, personal judgment, and the limits of fully explicit accounts of knowledge. |

**Tips:** The goal is not to solve epistemology early. The goal is to acquire the basic vocabulary: knowledge, belief, justification, skepticism, evidence, testimony, perception, internalism/externalism, reliabilism. Polanyi adds a perspective on tacit understanding and the role of personal judgment. This node connects formal epistemology to philosophical accounts of knowledge and justification. No advanced mathematics is required for this introduction. Probability and statistics become relevant when pursuing the formal approaches in Trunk 2.4.

#### [E] Williamson

| Resource | Notes |
| :--- | :--- |
| **Timothy Williamson, *Knowledge and Its Limits*** | A central text. The most influential epistemology monograph of the 21st century. |
| **Williamson, *The Philosophy of Philosophy*** | Williamson's metaphilosophical follow-up. Essential for your project. |
| **Williamson, *Tetralogue: I'm Right, You're Wrong*** | The popular-form version. Read first if Williamson's prose feels heavy. |
| **Patrick Greenough & Duncan Pritchard, eds., *Williamson on Knowledge*** | The critical commentary anthology. |

**Tips:** *Knowledge and Its Limits* is the book that made "knowledge first" epistemology — the thesis that knowledge is conceptually and explanatorily prior to belief, evidence, and justification, rather than analyzable in their terms. **This is the strongest contemporary anti-reductionist position in epistemology**, and you should engage with it seriously even (especially) if you find yourself instinctively reductionist. *The Philosophy of Philosophy* is the more important book for your roadmap — it argues against the linguistic turn and for philosophy as a science continuous with the others. This is the live methodological question for *anyone* trying to do interdisciplinary work, which is exactly your project.

#### [E] Hacking

| Resource | Notes |
| :--- | :--- |
| **Ian Hacking, *The Emergence of Probability*** | A central text. Select passages for the question at hand. |
| **Hacking, *The Taming of Chance*** | The sequel; how probability transformed 19th-century social science. Read after the first. |
| **Hacking, *An Introduction to Probability and Inductive Logic*** | The textbook. Useful as a reference. |
| **Hacking, *Representing and Intervening*** | His philosophy of science book; covers experimental realism. Already on your list for 4.5. |

**Tips:** *The Emergence of Probability* is one of the most genre-redefining books in philosophy of science. Hacking shows that probability *as a concept* was invented in the mid-17th century, that it had to be invented, and that its invention restructured rationality itself. **This single book reframes the question of what a "rational concept" is** — concepts have histories, and so do the standards of reason that depend on them. Read in dialogue with Jaynes (Trunk 2.4): Jaynes thinks probability is the unique normative theory of rationality; Hacking shows that this normative theory is itself a historical product. You don't have to choose; you have to hold the tension.

#### [E] Goldman / Virtue Epistemology

| Resource | Notes |
| :--- | :--- |
| **Alvin Goldman, *Epistemology and Cognition*** | A useful entry. Reliabilism formalized. |
| **Ernest Sosa, *A Virtue Epistemology*** | The right virtue-epistemology entry. |
| **Linda Zagzebski, *Virtues of the Mind*** | The Aristotelian-flavored alternative. |
| **John Greco, *Achieving Knowledge*** | The contemporary synthesis. |

**Tips:** Engage with reliabilism and virtue epistemology enough to understand the contemporary alternatives to Williamson, with particular attention to their different accounts of justification and epistemic agency. The conceptual point is that 20th-century epistemology bifurcated into externalist (Goldman, reliabilism) and internalist (classical evidentialism) camps, with virtue epistemology emerging as a third way that relocates epistemic normativity into the agent rather than the belief. This is exactly the philosophical territory where AI alignment debates live (Trunk 3.2 interpretability), and reading Sosa or Greco gives you the conceptual toolkit those debates need.

#### [E] Formal Epistemology Cross-Reference

| Resource | Notes |
| :--- | :--- |
| **See Trunk 2.4: Formal Epistemology** | The technical version belongs there, after probability and statistics. |
| **James Joyce, *The Foundations of Causal Decision Theory*** | Use if decision theory becomes central. |
| **Isaac Levi, *The Fixation of Belief and Its Undoing*** | Belief revision and epistemic commitment. |
| **Erik Olsson, *Against Coherence*** | Useful corrective against overly elegant coherence-based pictures. |

**Tips:** Keep this as a cross-reference, not a duplicate track. In Trunk 4.3, the question is philosophical: what are knowledge, justification, evidence, and rational belief? In Trunk 2.4, the question is formal: what structures model belief, updating, confirmation, and inquiry? The two should irritate each other. If the formal model is too clean, bring in Hacking and Goldman. If the philosophy becomes too verbal, bring in Bayesian confirmation or belief revision.

#### [E] Social Epistemology & Belief Networks

| Resource | Notes |
| :--- | :--- |
| **Cailin O'Connor & James Owen Weatherall, *The Misinformation Age: How False Beliefs Spread*** (2019) | An accessible account of social learning, trust, and the spread of belief. [Publisher](https://yalebooks.yale.edu/book/9780300251852/the-misinformation-age/) |
| **Kevin J. S. Zollman, "The Communication Structure of Epistemic Communities"** (2007) | A simulation-based study of how communication networks affect collective inquiry. [Paper](https://doi.org/10.1086/525605) · [Author manuscript](https://www.kevinzollman.com/uploads/5/0/3/6/50361245/zollman_-_communication_structure_revised_version.pdf) |

**Tips:** How does a group acquire knowledge when each member sees only part of the evidence and relies on others? O'Connor and Weatherall provide an entry through examples; Zollman makes one set of network and updating assumptions available for inspection. Relate these models to probability in Trunk 2.4 and media in 6.5. A result about an idealized network establishes a conditional possibility, not a general rule that more or less communication is always better. Empirical Social Research in 6.3 provides methods for investigating actual communities.

### TRUNK 4.4 — Philosophy of Mathematics

Background requirements vary by text. Basic proof and elementary mathematical examples support the introductory readings and Lakatos; logic, algebra, analysis, and type theory can be consulted where a particular argument requires them.

#### [S] Shapiro

| Resource | Notes |
| :--- | :--- |
| **Stewart Shapiro, *Thinking About Mathematics*** | An accessible survey of philosophy of mathematics. |
| **Shapiro, *Philosophy of Mathematics: Structure and Ontology*** | His positive structuralist proposal. Read after the survey. |
| **Shapiro, ed., *The Oxford Handbook of Philosophy of Mathematics and Logic*** | The encyclopedia. Reference. |

**Tips:** *Thinking About Mathematics* offers a survey organized around positions such as logicism, formalism, intuitionism, structuralism, and fictionalism, with mathematical examples. It can serve as an entry or a reference alongside Lakatos. Shapiro's positive proposal in *Structure and Ontology* connects to questions about identity and structure in category theory and HoTT (1.4). Keep the philosophical claim that mathematical objects are positions in structures distinct from formal results about identity or equivalence under specified assumptions; one does not simply prove the other.

#### [S] Lakatos — Evergreen

| Resource | Notes |
| :--- | :--- |
| **Imre Lakatos, *Proofs and Refutations*** | **Evergreen.** Proofs, counterexamples, and conceptual repair. |
| **Lakatos, *Philosophical Papers Vol. 1: The Methodology of Scientific Research Programmes*** | Edited by John Worrall and Gregory Currie; connects to philosophy of science in Trunk 4.5. |
| **Lakatos, *Philosophical Papers Vol. 2: Mathematics, Science and Epistemology*** | The supplementary essays on math. |
| **Thurston, “On Proof and Progress in Mathematics”** | Corrects the idea that proof is only formal certification. |
| **Gowers, “The Two Cultures of Mathematics”** | Distinguishes problem-solving from theory-building. |

**Tips:** Basic familiarity with mathematical proof and elementary geometric examples is sufficient to enter *Proofs and Refutations*; completing model theory, analysis, or HoTT is not required. Its fictional classroom follows Euler's polyhedron formula through proofs, counterexamples, concept-stretching, and reformulation. The dialogue and historical footnotes illuminate how mathematical inquiry develops before its results acquire a polished formal presentation. Thurston examines the role of proof in mathematical understanding; Gowers distinguishes problem-solving and theory-building traditions. Together these texts connect formal results with mathematical practice.

#### [S] Benacerraf

| Resource | Notes |
| :--- | :--- |
| **Paul Benacerraf, *What Numbers Could Not Be*** (1965, paper) | The classic. 20 pages. |
| **Benacerraf, *Mathematical Truth*** (1973, paper) | The other classic. The Benacerraf dilemma. |
| **Paul Benacerraf & Hilary Putnam, eds., *Philosophy of Mathematics: Selected Readings*** | A useful anthology. The standard course companion. |

**Tips:** Two papers, both essential, both short. *What Numbers Could Not Be* is the founding paper of mathematical structuralism — the argument that since multiple set-theoretic constructions equally well "are" the natural numbers, numbers cannot be any specific set, and therefore must be positions in a structure. *Mathematical Truth* poses the Benacerraf dilemma: a uniform semantics for mathematical and non-mathematical statements seems to require knowable abstract objects, but our standard epistemology can't deliver them. **This dilemma frames every subsequent debate in philosophy of math.** Compare the two arguments as questions about ontology and epistemic access.

#### [S] Structuralism, Fictionalism, Neologicism

| Resource | Notes |
| :--- | :--- |
| **Stewart Shapiro, *Structure and Ontology*** (already listed) | Structuralism. |
| **Hartry Field, *Science Without Numbers*** | The fictionalist masterwork. Demanding. |
| **Mark Colyvan, *An Introduction to the Philosophy of Mathematics*** | Modern survey, gentler than Shapiro. |
| **Bob Hale & Crispin Wright, *The Reason's Proper Study*** | The neologicist position. |
| **Penelope Maddy, *Defending the Axioms*** | On set-theoretic methodology. Indispensable. |
| **Michael Detlefsen, ed., *Proof, Logic and Formalization*** | Anthology covering formalist and proof-theoretic positions. |

**Tips:** Field's *Science Without Numbers* is the most ambitious philosophical project in this whole subsection — to show that mathematics is *strictly speaking false* but indispensably useful, and to nominalize physics to demonstrate it. Whether or not you find his argument compelling, the **execution** of nominalizing physics is one of the most impressive philosophical exercises of the 20th century. Maddy's *Defending the Axioms* is essential because it engages with the actual practice of foundational mathematicians — what considerations actually drive set theorists to prefer certain axioms? — rather than from-the-armchair speculation. Read these as a portfolio: structuralism (Shapiro), fictionalism (Field), neologicism (Hale-Wright), naturalism (Maddy). You don't need to commit to one; you need to hold them all.

### TRUNK 4.5 — Philosophy of Science

*Read after Trunk 2.4.* Philosophy of science needs Bayesian and statistical apparatus to be done well today.

#### [E] Godfrey-Smith

| Resource | Notes |
| :--- | :--- |
| **Peter Godfrey-Smith, *Theory and Reality*** (2nd ed.) | **An accessible survey.** Broad coverage of scientific explanation and evidence. |
| **Feynman, “Cargo Cult Science”** | A short entry into the problem of self-deception in inquiry. |
| **Hamming, *The Art of Doing Science and Engineering*** | Problem selection, research judgment, and the relation between scientific and engineering inquiry. |

**Tips:** *Theory and Reality* offers a broad entry; chapters on Bayesianism, realism, explanation, or naturalism can be selected according to the problem being pursued. The second edition includes more recent debates. Feynman and Hamming offer perspectives from scientific and engineering practice. The Scientific Representation & Models entry below develops the model–world relationship, while Godfrey-Smith's *Philosophy of Biology* is listed under Evolution & Cognition in 4.6.

#### [E] Kuhn, Lakatos, Feyerabend

| Resource | Notes |
| :--- | :--- |
| **Thomas Kuhn, *The Structure of Scientific Revolutions*** (50th anniversary ed., with Hacking's intro) | Select passages for the question at hand. |
| **Imre Lakatos, *The Methodology of Scientific Research Programmes*** | The Lakatos-on-science book. |
| **Paul Feyerabend, *Against Method*** | The provocateur. Read for joy. |
| **Kuhn, *The Essential Tension*** | The follow-up essay collection. Essential. |
| **Steve Fuller, *Kuhn vs. Popper*** | A useful secondary contextualizer. |

**Tips:** Kuhn first, then Lakatos's response, then Feyerabend's deeper rejection of method altogether. **This is one of the great three-cornered debates in 20th-century philosophy**, and reading the original texts in sequence is more illuminating than any secondary survey. In Kuhn's *Structure*, the famous concept of paradigm shifts is so culturally diffused that the book feels familiar before you read it, but the actual argument is more careful and historically grounded than the popular version suggests. Lakatos tries to rescue Popperian rationalism from Kuhn by introducing "research programmes" — read this and judge whether you find the rescue successful. Feyerabend goes the other direction and argues that *no* methodology adequately captures successful science. Take all three seriously; rest with the one that best survives your scrutiny.

#### [E] Cartwright

| Resource | Notes |
| :--- | :--- |
| **Nancy Cartwright, *How the Laws of Physics Lie*** | A central text. |
| **Cartwright, *The Dappled World*** | The metaphysical follow-up. |
| **Cartwright, *Hunting Causes and Using Them*** | Modern Cartwright on causation. |

**Tips:** Cartwright is the philosopher who made it respectable to ask whether the universal "laws of physics" actually obtain in reality or are idealizations that hold only in carefully prepared experimental conditions. *How the Laws of Physics Lie* is the manifesto. The connection back to your roadmap: this is exactly the question that arises naturally if you take Lakatos seriously about how mathematics works (mathematical laws as ideal limits of dialectical practice) and ask the analogous question about physics. Cartwright's later work on causation is also essential reading alongside Pearl (Trunk 2.4) — both argue for taking causation as an irreducible primitive, but from very different methodological starting points.

#### [E] Scientific Representation & Models

| Resource | Notes |
| :--- | :--- |
| **Roman Frigg, *Models and Theories: A Philosophical Inquiry*** (2022) | Syntactic and semantic views of theories, scientific representation, idealization, and the use of multiple models. [Publisher](https://www.routledge.com/Models-and-Theories-A-Philosophical-Inquiry/Frigg/p/book/9781003285106) |

**Tips:** A formal structure can be well defined while its application to the world remains uncertain. Frigg makes the model–world relationship the object of inquiry: what is represented, which features are idealized, and what licenses an inference from model to target? Select chapters on representation, abstraction, approximation, or model comparison alongside the causal-inference work in Trunk 2.4. This supplies a bridge from formal semantics and model theory to physical, cognitive, and social models; a model of a formal theory and a model used to investigate a real system need not have the same role.

### TRUNK 4.6 — Philosophy of Mind & Cognitive Science

*Extensions into cognition and the philosophy of mind.* This is where your "limits of human knowledge" question becomes "limits of human (and machine) cognition." It connects to AI interpretability (Trunk 3.2) and to Lacan (Trunk 6.2) from opposite ends.

The introductory resources supply empirical vocabulary for attention, memory, perception, and cognitive models; the other entries develop particular theories, methods, and philosophical perspectives.

#### [E] Cognitive Science Basics

| Resource | Notes |
| :--- | :--- |
| **José Luis Bermúdez, *Cognitive Science: An Introduction to the Science of the Mind*** | Best broad entry. Philosophy-friendly but empirically grounded. |
| **Paul Thagard, *Mind: Introduction to Cognitive Science*** | Clear synthetic map of classical cognitive science. |
| **Stanislas Dehaene, *Consciousness and the Brain*** | Empirical constraint on consciousness debates. |
| **Andy Clark, *Surfing Uncertainty*** | Predictive-processing bridge; detailed resources appear under Andy Clark in this section. |

**Tips:** This is an introductory entry within Trunk 4.6. The point is to stop treating "human cognition" as a pure abstraction. Learn attention, working memory, cognitive bias, perception, prediction, representation, and Marr's levels of analysis. The other entries in Trunk 4.6 deepen these questions through Dennett, Chalmers, Nagel, Marr, Fodor, Clark, and Merleau-Ponty.

#### [E] Evolution & Cognition

| Resource | Notes |
| :--- | :--- |
| **Godfrey-Smith, *Philosophy of Biology*** | An entry into selection, adaptation, explanation, and the conceptual structure of biology. |
| **Dennett, *Darwin's Dangerous Idea*** | Evolutionary explanation applied to design, mind, and meaning; a philosophical synthesis to examine alongside biological evidence. |

**Tips:** What changes when cognition is understood as the activity of organisms with an evolutionary history? Use Godfrey-Smith for the distinctions between selection, adaptation, development, and levels of explanation, and Dennett for the wider philosophical argument. Keep an account of a capacity's evolutionary origin distinct from an account of its present mechanism or its epistemic justification. The other entries in 4.6 investigate mechanisms and experience; Cultural Evolution & Cooperation in 6.3 asks what social transmission adds to individual cognition.

#### [E] Dennett

| Resource | Notes |
| :--- | :--- |
| **Daniel Dennett, *Consciousness Explained*** | A central text. Polemical, brilliant, controversial. |
| **Dennett, *The Intentional Stance*** | The earlier conceptual foundation. |
| **Dennett, *From Bacteria to Bach and Back*** | The mature synthesis. |
| **Don Ross, Andrew Brook, David Thompson, eds., *Dennett's Philosophy: A Comprehensive Assessment*** | The critical anthology. |

**Tips:** Read *Consciousness Explained* knowing that it's one side of a debate, not the verdict. Dennett's heterophenomenology, multiple-drafts model, and dismissal of qualia are the most aggressive deflationary moves in philosophy of mind. The book is enormously fun to read — Dennett writes with novelistic energy. **Compare with Chalmers** (next entry) to examine the disagreement about explanation and experience. *Darwin's Dangerous Idea* is the more important book for your roadmap because it connects evolutionary explanation to cognition and meaning at the deepest level, and the chapter on Gödel and Penrose is directly relevant to your spine.

#### [E] Chalmers

| Resource | Notes |
| :--- | :--- |
| **David Chalmers, *The Conscious Mind*** | A central text. The hard problem stated. |
| **Chalmers, *Constructing the World*** | The mature metaphysical project. Demanding. |
| **Chalmers, *Reality+*** | Chalmers on virtual reality and simulation. The accessible recent book. |
| **Chalmers, *Philosophy of Mind: Classical and Contemporary Readings*** | A useful anthology — the standard course companion. |

**Tips:** *The Conscious Mind* is the book that revived consciousness as a respectable philosophical topic in the 1990s. Chalmers' core move: distinguish the *easy problems* of consciousness (explainable in functional terms) from the *hard problem* (why is there subjective experience at all?), and argue that no functional explanation can solve the hard problem. **Whether you accept the argument or not, you need to understand it precisely** — it's the central problem of contemporary philosophy of mind. Read in dialogue with Dennett. Their disagreement supplies one influential philosophical contrast. Comparing & Testing Theories of Consciousness below introduces a wider empirical landscape.

#### [E] Nagel

| Resource | Notes |
| :--- | :--- |
| **Thomas Nagel, *What Is It Like to Be a Bat?*** (1974, paper) | A short argument about subjective experience and objective description. |
| **Nagel, *The View from Nowhere*** | The mature monograph on objectivity and subjectivity. |
| **Nagel, *Mind and Cosmos*** | The provocative late book. Controversial; read for intellectual honesty more than agreement. |
| **Nagel, *Mortal Questions*** | The essay collection containing the bat paper. Excellent overall. |

**Tips:** Use *What Is It Like to Be a Bat?* as an entry into the relation between subjective and objective descriptions. The argument is so compressed and the prose so clear that you need to slow yourself down — the paper *appears* to be saying something obvious, but it's saying something subtly different from what most people remember. Then *The View from Nowhere*, which extends the argument into a full theory of how the subjective and objective standpoints relate. Nagel is one of the most stylistically precise philosophical writers; reading him is also a writing lesson.

#### [E] Comparing & Testing Theories of Consciousness

| Resource | Notes |
| :--- | :--- |
| **Anil K. Seth & Tim Bayne, "Theories of consciousness"** (2022) | A survey of major theoretical approaches, their explanatory targets, and problems of theory comparison. [Review](https://www.nature.com/articles/s41583-022-00587-4) |
| **Cogitate Consortium et al., "Adversarial testing of global neuronal workspace and integrated information theories of consciousness"** (2025) | A preregistered comparison of predictions from two theories using several neural measurement methods. [Research article](https://www.nature.com/articles/s41586-025-08888-1) |

**Tips:** Which observations would distinguish competing explanations of consciousness? The review maps the alternatives; the adversarial study shows how proponents can specify predictions and interpretation before inspecting the results. Track the operational measures, auxiliary assumptions, supported predictions, and challenges to each theory. This complements Dennett, Chalmers, Nagel, and Dehaene with an example of empirical theory testing, and connects directly to model evaluation in 2.4 and philosophy of science in 4.5. Testing these predictions does not by itself settle the metaphysics of experience or establish a final winner.

#### [E] Marr

| Resource | Notes |
| :--- | :--- |
| **David Marr, *Vision*** | A central text. Select passages for the question at hand. |
| **Jeff Hawkins, *On Intelligence*** | An alternative account of intelligence and cortical organization; compare its proposals with Marr's framework. |
| **Shimon Ullman, *High-Level Vision*** | Continuation of Marr's research program. |

**Tips:** Marr's three levels of analysis (computational, algorithmic, implementational) is one of the most influential conceptual frameworks in cognitive science. The *computational level* asks what problem the system is solving and why; the *algorithmic level* asks how it's solved; the *implementational level* asks how it's physically realized. **This trichotomy is probably the right framework for thinking about LLMs as well** — most current confusion in AI discussion is the result of running the levels together. Marr died young; *Vision* is his only complete book and it's a singular intellectual achievement.

#### [E] Computational Models of Cognition

| Resource | Notes |
| :--- | :--- |
| **Falk Lieder & Thomas L. Griffiths, "Resource-rational analysis: Understanding human cognition as the optimal use of limited computational resources"** (2020; first published online 2019) | *Behavioral and Brain Sciences* 43, e1. A framework linking cognitive strategies to the costs and benefits of computation. [Paper](https://doi.org/10.1017/S0140525X1900061X) |

**Tips:** What can a cognitive system accomplish with limited time, memory, and computation? Read the proposed models alongside Marr's levels of analysis and the probability and decision-theory material in 2.4. Distinguish impossibility in principle from performance under resource constraints, then ask whether the assumed constraints fit behavioral evidence. Resource-rational analysis offers a way to construct and compare explanations; a successful fit does not establish that every human decision is optimal. The connection to algorithms and learning in Trunks 3.1–3.2 is a shared modeling problem, not a claim that human and artificial systems have the same mechanisms.

#### [E] Fodor

| Resource | Notes |
| :--- | :--- |
| **Jerry Fodor, *The Language of Thought*** | A central text. The classical computational theory of mind. |
| **Fodor, *The Modularity of Mind*** | The shorter, more accessible companion. |
| **Fodor, *LOT 2: The Language of Thought Revisited*** | The mature reconsideration. |
| **Fodor & Zenon Pylyshyn, *Connectionism and Cognitive Architecture*** (1988, paper) | The famous critique of connectionism. |

**Tips:** Fodor articulated the strongest version of the **computational theory of mind**: that mental states are computational states defined over a language-of-thought, and that thinking is computation. *The Language of Thought* is the founding statement. Whether you accept this view or not, it's the position against which all contemporary alternatives (connectionism, dynamicism, embodied cognition) define themselves. **The 1988 critique of connectionism with Pylyshyn is the philosophical text that has aged most interestingly** in the LLM era — many of the criticisms there can be reread now as predictions about what current LLMs can and cannot do.

#### [E] Andy Clark

| Resource | Notes |
| :--- | :--- |
| **Andy Clark, *Surfing Uncertainty*** | A useful entry. The predictive-processing view. |
| **Clark, *Supersizing the Mind*** | The earlier extended-mind argument. |
| **Clark, *Being There*** | The original 1990s book on embodied cognition. |
| **Clark & David Chalmers, *The Extended Mind*** (1998, paper) | The classic 10-page paper. |
| **Evan Thompson, *Mind in Life*** | The phenomenological-biological complement to Clark. |

**Tips:** Clark is the contemporary philosopher most directly engaged with how cognition might fundamentally not look like classical computation — where it's distributed across body and environment, structured by prediction rather than representation, and continuous with the dynamics of living systems. **Predictive processing is one influential research framework in cognitive science**, and *Surfing Uncertainty* offers a philosophical entry. The Clark-Chalmers extended mind paper is also essential — only 10 pages, and it's been one of the most-discussed papers in philosophy of mind of the past 25 years.

#### [E] Merleau-Ponty (selected)

| Resource | Notes |
| :--- | :--- |
| **Maurice Merleau-Ponty, *Phenomenology of Perception*** (Landes trans.) | Selections. The body-perception chapters. |
| **Merleau-Ponty, *The Visible and the Invisible*** | The unfinished late work. For the brave. |
| **Taylor Carman, *Merleau-Ponty*** (Routledge) | A useful secondary work. |
| **Hubert Dreyfus, *What Computers Still Can't Do*** | The classical critique of AI from a phenomenological-Heideggerian perspective. |

**Tips:** Merleau-Ponty is the philosophical bridge between phenomenology (Husserl) and embodied cognitive science (Clark, Thompson, Varela). Read selections — the chapters on the body, motor intentionality, and perception. Don't try to read the whole *Phenomenology of Perception*; it's enormous and the relevant sections are clearly identifiable. Dreyfus's *What Computers Still Can't Do* is the philosophical critique of classical AI from this lineage, and rereading it now in the LLM era is genuinely instructive — many of his arguments have been complicated, but few have been refuted.

### TRUNK 4.7 — Philosophical Extensions

These are the optional deep dives. Each is excellent if it calls you, but none is structurally required.

#### [E] Husserl

| Resource | Notes |
| :--- | :--- |
| **Edmund Husserl, *Cartesian Meditations*** | A useful entry. Slim, programmatic. |
| **Husserl, *Ideas I*** | The systematic work. Demanding. |
| **Husserl, *The Crisis of European Sciences and Transcendental Phenomenology*** | The late masterpiece. |
| **Dan Zahavi, *Husserl's Phenomenology*** | The right modern guide. |

**Tips:** *Cartesian Meditations* offers an entry, with Zahavi as a possible companion. Husserl is the founder of phenomenology and the conceptual ancestor of Merleau-Ponty, Heidegger, and contemporary philosophy of mind from the continental side. The phenomenological method (bracketing, eidetic reduction, intentionality) is genuinely useful as a *cognitive technique* even outside the metaphysical commitments. *Crisis* connects directly to Trunk 4.5 (philosophy of science) — Husserl argued the European sciences had lost their meaning by becoming purely technical, and his diagnosis is uncannily prescient.

#### [E] Foucault, Derrida

| Resource | Notes |
| :--- | :--- |
| **Michel Foucault, *Discipline and Punish*** | A useful entry to Foucault. |
| **Foucault, *The Order of Things*** | The structural-archaeological masterpiece. Demanding. |
| **Foucault, *History of Sexuality*, Vol. 1: *The Will to Knowledge*** | The conceptually densest. Short. |
| **Jacques Derrida, *Of Grammatology*** | The major work. Read with secondary support. |
| **Derrida, *Writing and Difference*** | The essay collection. *Structure, Sign, and Play* (the closing essay) is essential. |
| **Gary Gutting, *Foucault: A Very Short Introduction*** | A useful entry-level secondary work. |
| **Geoffrey Bennington & Jacques Derrida, *Jacques Derrida*** | The companion-and-autobiography Derrida wrote with his student. Brilliant. |

**Tips:** Foucault first, Derrida second — Foucault's prose is more lucid and the historical material gives it grip. *Discipline and Punish* is the most-read Foucault for good reason; the analysis of power, surveillance, and the construction of the modern subject is one of the major intellectual achievements of the 20th century. *The Order of Things* is the more philosophically ambitious book — read after *Discipline*. For Derrida, *Of Grammatology* is the book everyone names but few finish; *Structure, Sign, and Play* (a 30-page essay) is what to read first, and it's a perfect entry. Read in French if your French (Trunk 6, French reading) is up to it — these are the writers where translation hurts most.

#### [E] Deleuze

| Resource | Notes |
| :--- | :--- |
| **Gilles Deleuze, *Difference and Repetition*** | The major work. Read with help. |
| **Deleuze, *The Logic of Sense*** | The companion. More accessible in style. |
| **Daniel W. Smith, *Essays on Deleuze*** | A useful secondary work for serious reading. |
| **James Williams, *Gilles Deleuze's Difference and Repetition: A Critical Introduction and Guide*** | The companion guide. |

**Tips:** Deleuze is the most technically demanding of the late-20th-century continental philosophers, and *Difference and Repetition* is famous for being unreadable on first attempt. Use Williams' guide alongside it. The thesis — that difference is conceptually prior to identity, and that repetition produces difference rather than sameness — sounds gnomic until you trace its consequences through the book's engagements with Kant, Bergson, Spinoza, and structural mathematics. **A possible connection to your roadmap concerns relations, objects, and individuation.** Compare the philosophical use of these concepts with their mathematical definitions in category theory; an analogy is not a formal correspondence. The discussions of differential calculus can also be read against the mathematical history they invoke. Optional but rewarding for the philosophically adventurous.

#### [E] Deleuze & Guattari — Evergreen

| Resource | Notes |
| :--- | :--- |
| **Gilles Deleuze & Félix Guattari, *A Thousand Plateaus*** | **Evergreen.** Select plateaus according to the question being pursued. |
| **Deleuze & Guattari, *Anti-Oedipus*** | Earlier volume. |
| **Brian Massumi, *A User's Guide to Capitalism and Schizophrenia*** | Best reader's guide. |
| **Eugene Holland, *Deleuze and Guattari's A Thousand Plateaus: A Reader's Guide*** | Companion. |

**Tips:** *A Thousand Plateaus* deliberately refuses ordinary philosophical argument structure; it proceeds by plateaus, concepts, and dense intertextual movement. Relevant background includes structuralism, psychoanalytic vocabulary, and systems concepts, depending on the plateau selected. Use the guides to identify missing context rather than treating completion of whole trunks as an entrance requirement. Its discussions of relations, multiplicities, and becoming are points of inquiry, not substitutes for the technical subjects they invoke.

### TRUNK 5 — Physics Support & Exploration

The philosophy of this trunk: every section connects to mathematics you've already done. Physics, taught well, is the most spectacular application of the differential geometry, functional analysis, PDEs, and probability you've built. Taught badly, it's a procedural discipline of pattern-matching to similar problems. Choose books that emphasize the structural-mathematical view.

### TRUNK 5.1 — Classical

#### [E] Classical Mechanics

| Resource | Notes |
| :--- | :--- |
| **John Taylor, *Classical Mechanics*** | An introductory route through dynamics, conservation laws, and physical examples. |
| **Herbert Goldstein, Charles Poole, John Safko, *Classical Mechanics*** (3rd ed.) | A graduate treatment; useful after an introductory mechanics text. |
| **David Morin, *Introduction to Classical Mechanics*** | Problem-solving heavy. Excellent companion. |
| **Leonard Susskind & George Hrabovsky, *The Theoretical Minimum: Classical Mechanics*** | The right gentle entry if Taylor feels heavy. |

**Tips:** Taylor offers an entry through Newtonian dynamics; Goldstein extends the treatment to canonical transformations, Hamilton-Jacobi theory, and perturbation methods. Morin supplies additional problems, while Susskind and Hrabovsky offer a shorter orientation. Connect Newton's equations to stationary action through the Euler-Lagrange equations, then compare the formulations on a pendulum, central-force problem, or rigid body. The variational background in Trunk 2.5 helps explain why these descriptions agree.

#### [E] Lagrangian & Hamiltonian Mechanics

| Resource | Notes |
| :--- | :--- |
| **Vladimir Arnold, *Mathematical Methods of Classical Mechanics*** | Geometric mechanics through symplectic structure and Hamiltonian flow. |
| **Jorge Marsden & Tudor Ratiu, *Introduction to Mechanics and Symmetry*** | Symmetry, symplectic reduction, and geometric mechanics. |
| **R. Abraham & J. Marsden, *Foundations of Mechanics*** | The encyclopedic reference. |
| **Theodore Frankel, *The Geometry of Physics*** | Already on your list (Trunk 2.3). The chapters on classical mechanics are the right complement to Arnold. |

**Tips:** Arnold develops mechanics through symplectic geometry and Hamiltonian flow. Read after an introductory mechanics treatment and differential geometry (Trunk 2.3), consulting Frankel for geometric background. Marsden and Ratiu extend the study of symmetry and reduction; Abraham and Marsden serve as a reference. Follow a question such as how a symmetry produces a conserved quantity, or how phase-space geometry constrains dynamics, through more than one formulation.

#### [E] Electromagnetism

| Resource | Notes |
| :--- | :--- |
| **David Griffiths, *Introduction to Electrodynamics*** (4th ed.) | An entry through vector calculus, fields, potentials, and Maxwell equations. |
| **John David Jackson, *Classical Electrodynamics*** (3rd ed.) | The graduate standard. Read selectively. |
| **Andrew Zangwill, *Modern Electrodynamics*** | The modern alternative to Jackson. More pedagogically generous. |
| **Frankel, *The Geometry of Physics*** (electromagnetism chapters) | The differential-forms reformulation. **The conceptual payoff.** |

**Tips:** Griffiths provides an entry through fields, potentials, and Maxwell's equations. Jackson and Zangwill offer alternative routes into radiation, multipole expansions, and scattering. Frankel recasts the equations using differential forms and connects electromagnetism to gauge theory. Comparing the vector-calculus and geometric formulations can clarify which structure belongs to the field and which belongs to a choice of coordinates or potential.

#### [E] Statistical Mechanics & Thermodynamics

| Resource | Notes |
| :--- | :--- |
| **R. K. Pathria & Paul Beale, *Statistical Mechanics*** (3rd ed.) | The standard. Solid, comprehensive. |
| **Mehran Kardar, *Statistical Physics of Particles*** + ***Statistical Physics of Fields*** | Complementary treatments of particles, fields, phase transitions, and renormalization. |
| **L. D. Landau & E. M. Lifshitz, *Statistical Physics*, Vol. 5** | The classical. Demanding. |
| **James Sethna, *Statistical Mechanics: Entropy, Order Parameters, and Complexity*** (free online) | A useful entry for the roadmap: entropy, order parameters, universality, information, and emergence. |
| **Herbert Callen, *Thermodynamics and an Introduction to Thermostatistics*** | The right book for **classical thermodynamics specifically** — axiomatic, conceptually clean. |

**Tips:** Sethna is a useful entry for this roadmap because order parameters, universality, renormalization, and emergence connect directly to the question of what a model retains or discards. Callen develops thermodynamic principles; Kardar supplies complementary treatments of particles and fields; Pathria and Landau-Lifshitz provide broader references. Relate entropy to information theory in Trunk 1.5 while distinguishing thermodynamic entropy, statistical ensembles, and Shannon entropy: their mathematical connections require attention to units, probabilities, and coarse-graining. The Effective Theories, Scales & Emergence entry in 5.2 extends this investigation across levels of description.

#### [E] Continuum Mechanics / Fluids

| Resource | Notes |
| :--- | :--- |
| **G. K. Batchelor, *An Introduction to Fluid Dynamics*** | The classical. |
| **Pijush Kundu, Ira Cohen, David Dowling, *Fluid Mechanics*** (6th ed.) | The right textbook. |
| **L. D. Landau & E. M. Lifshitz, *Fluid Mechanics*, Vol. 6** | The classical Landau-Lifshitz. Compact, beautiful. |

**Tips:** Use Kundu for a textbook route or Batchelor and Landau-Lifshitz for more compressed treatments. Conservation laws, the Euler and Navier-Stokes equations, vorticity, viscosity, and turbulence provide a manageable set of questions. Relate the continuum approximation to molecular descriptions and identify where it ceases to be adequate. Questions about existence and regularity of three-dimensional Navier-Stokes solutions also connect the physical model to the PDE work in Trunk 2.5.

### TRUNK 5.2 — Modern

#### [E] Special Relativity

| Resource | Notes |
| :--- | :--- |
| **Edwin Taylor & John Archibald Wheeler, *Spacetime Physics*** (2nd ed.) | An introduction organized around spacetime geometry. |
| **Wolfgang Rindler, *Introduction to Special Relativity*** | The classical alternative. Physicist's perspective. |
| **George Naber, *The Geometry of Minkowski Spacetime*** | The mathematical treatment. For after Taylor-Wheeler. |
| **Albert Einstein, *Relativity: The Special and General Theory*** | Einstein's own popular exposition. Read for joy and historical context. |

**Tips:** Taylor and Wheeler introduce the subject through spacetime geometry; Rindler offers a complementary physical treatment, and Naber develops the mathematical structure. Minkowski diagrams help separate coordinate descriptions from invariant intervals and causal relations. The Lorentz group preserves the Minkowski metric. Work with concrete clock, light-signal, and acceleration examples to see how the geometry organizes observable predictions.

#### [E] Quantum Mechanics

| Resource | Notes |
| :--- | :--- |
| **David Griffiths, *Introduction to Quantum Mechanics*** (3rd ed.) | An introductory treatment organized around physical models and applications. |
| **J. J. Sakurai & Jim Napolitano, *Modern Quantum Mechanics*** (3rd ed.) | An advanced route after introductory quantum mechanics. |
| **Ramamurti Shankar, *Principles of Quantum Mechanics*** (2nd ed.) | An alternative entry with explicit mathematical foundations. |
| **Asher Peres, *Quantum Theory: Concepts and Methods*** | The conceptually careful treatment — emphasizes measurement, information, foundations. |
| **Leonard Susskind, *The Theoretical Minimum: Quantum Mechanics*** | The gentle entry. |
| **P. A. M. Dirac, *The Principles of Quantum Mechanics*** | Dirac's original masterpiece. Read selectively, for style. |

**Tips:** Griffiths offers an entry through physical examples; Shankar is an alternative with an explicit linear-algebra introduction. Sakurai develops a more advanced treatment, while Peres accompanies the formalism with questions about measurement and information. Useful background is waves, differential equations, and linear algebra; functional analysis supports more specialized questions about operators and infinite-dimensional spaces. Follow states and observables through spin, the harmonic oscillator, identical particles, perturbation theory, and scattering as needed. The foundations and contextuality entries in 5.4 can be approached alongside the corresponding finite-dimensional examples.

#### [E] General Relativity

| Resource | Notes |
| :--- | :--- |
| **Sean Carroll, *Spacetime and Geometry*** | Spacetime geometry, general relativity, and physical applications. |
| **Robert Wald, *General Relativity*** | The serious mathematical treatment. Read after Carroll if you want depth. |
| **Charles Misner, Kip Thorne, John Wheeler, *Gravitation*** (MTW) | The encyclopedic classic. Use selectively. |
| **Bernard Schutz, *A First Course in General Relativity*** | The right gentle entry. |
| **Eric Poisson, *A Relativist's Toolkit*** | The advanced techniques. Save for if you continue. |

**Tips:** Schutz offers an entry with more gradual mathematical development; Carroll provides a route through spacetime geometry and physical applications. Wald, MTW, and Poisson support deeper or more specialized questions. Read after special relativity and with differential geometry (Trunk 2.3) and differential equations (Trunk 2.5) as background. Compare the Einstein field equations, their formulation through the Einstein-Hilbert action on a Lorentzian spacetime, and a concrete solution such as Schwarzschild. Relate geometric features to measurements, geodesics, and causal structure.

#### [E] Quantum Field Theory

| Resource | Notes |
| :--- | :--- |
| **David Tong, *Lectures on Quantum Field Theory*** (free online) | Freely available lecture notes for an entry into relativistic quantum fields. |
| **Anthony Zee, *Quantum Field Theory in a Nutshell*** | Conceptual orientation and connections across quantum field theory. |
| **Mark Srednicki, *Quantum Field Theory*** (free online) | A comprehensive treatment in relatively modular chapters. |
| **Peskin & Schroeder, *An Introduction to Quantum Field Theory*** | The standard graduate text. Save as [E] follow-up. |
| **Steven Weinberg, *The Quantum Theory of Fields*, Vol. 1–3** | The encyclopedic, conceptually demanding alternative. Magisterial. |
| **Anthony Duncan, *The Conceptual Framework of Quantum Field Theory*** | A sustained treatment of the conceptual framework of quantum field theory. |

**Tips:** Tong offers an entry into scalar fields and canonical quantization; Zee supplies conceptual orientation, while Srednicki, Peskin-Schroeder, and Weinberg provide alternative levels of technical development. Duncan focuses on the conceptual framework. Read after quantum mechanics, special relativity, and Lagrangian mechanics. Scalar, spinor, and gauge fields organize different kinds of dynamics and symmetry; perturbative calculations connect the formalism to scattering predictions. The following effective-theory entry asks which degrees of freedom and approximations are appropriate at a given scale.

#### [E] Effective Theories, Scales & Emergence

| Resource | Notes |
| :--- | :--- |
| **C. P. Burgess, *Introduction to Effective Field Theory*** (2020) | Scale separation, effective actions, power counting, matching, and applications across particle, condensed-matter, and gravitational physics. [Publisher](https://www.cambridge.org/core/books/introduction-to-effective-field-theory/A9CDB35F4AA7921E3A9CFD573EBA8B64) |
| **Alexander Franklin & Eleanor Knox, "Emergence without Limits: The Case of Phonons"** (2018) | A concrete philosophical case study of emergence through changes of variables and approximation. [Paper and open-access version](https://kclpure.kcl.ac.uk/portal/en/publications/emergence-without-limits-the-case-of-phonons/) |

**Tips:** Ask how reliable predictions can survive incomplete knowledge of microscopic details. Burgess develops the tools for identifying relevant degrees of freedom, specifying a domain of validity, and estimating corrections; undergraduate quantum mechanics is an entry background, with QFT useful for the more technical applications. Sethna in 5.1 connects this question to coarse-graining, universality, and renormalization. Franklin and Knox provide a smaller case to examine alongside vibrations and normal modes. Compare the derivation, approximation, and explanatory role of each level of description with models and explanation in Trunk 4.5; emergence needs a specified example and relation between descriptions.

### TRUNK 5.3 — Frontier Topics

#### [E] Standard Model

| Resource | Notes |
| :--- | :--- |
| **Mark Thomson, *Modern Particle Physics*** | Particle physics with experimental and theoretical perspectives. |
| **John Donoghue, Eugene Golowich, Barry Holstein, *Dynamics of the Standard Model*** | The serious treatment. After Thomson. |
| **Howard Georgi, *Lie Algebras in Particle Physics*** | The math foundation. Essential. |
| **Anthony Zee, *Group Theory in a Nutshell for Physicists*** | The accessible companion. |
| **Steven Weinberg, *The Quantum Theory of Fields*, Vol. 2** | Weinberg on gauge theory. Magisterial. |

**Tips:** Thomson connects the theoretical structure to experiments; Georgi and Zee supply representation-theoretic background. Donoghue-Golowich-Holstein and Weinberg extend the field-theoretic treatment. Study the gauge group SU(3) × SU(2) × U(1), particle representations, symmetry breaking, and anomaly cancellation alongside the observations that constrain them. Distinguish the model's successful predictions from questions it leaves open, and use the effective-theory perspective to examine how new interactions would appear in low-energy measurements.

#### [E] String Theory

| Resource | Notes |
| :--- | :--- |
| **Joseph Polchinski, *String Theory*, Vols. 1–2** | The standard. Demanding. |
| **Katrin Becker, Melanie Becker, John Schwarz, *String Theory and M-Theory*** | A textbook route through string theory, dualities, and M-theory. |
| **Barton Zwiebach, *A First Course in String Theory*** | An entry to string theory with substantial worked development. |
| **David Tong, *Lectures on String Theory*** (free online) | The right free supplement. |
| **Michael Green, John Schwarz, Edward Witten, *Superstring Theory*, Vols. 1–2** | The classical. Use as reference. |
| **Brian Greene, *The Elegant Universe*** | The popular exposition. Read for cultural context, not technical content. |

**Tips:** Zwiebach offers an entry; Tong's notes provide a freely available companion, while Becker-Becker-Schwarz and Polchinski develop the theory further. Green-Schwarz-Witten is a historical and technical reference. Worldsheet dynamics, spectra, compactification, and the appearance of gravitational degrees of freedom are possible organizing questions. Distinguish mathematical results within particular models from claims that those models describe nature. Connections such as mirror symmetry can be studied for their mathematical content without treating string theory as the endpoint of the physics route.

#### [E] M-Theory & Dualities

| Resource | Notes |
| :--- | :--- |
| **Edward Witten, *String Theory Dynamics in Various Dimensions*** (1995, paper) | The founding paper of M-theory. |
| **Becker-Becker-Schwarz, *String Theory and M-Theory*** (M-theory chapters) | Same book, M-theory sections. |
| **Joseph Polchinski, Vol. 2 (D-brane and duality chapters)** | The standard textbook material. |
| **John Schwarz lectures (online, various)** | Pedagogically clear video lectures by one of the field's founders. |

**Tips:** Use Witten's 1995 paper as a historical entry into the relations among string theories, with Becker-Becker-Schwarz and Polchinski for technical support. M-theory is a conjectured eleven-dimensional framework; its proposed formulations and limits do not amount to a complete general construction. Choose a particular duality, identify the theories and regimes involved, and ask what is mapped between them. AdS/CFT supplies a further setting for comparing bulk gravitational and boundary field-theoretic descriptions; the status and domain of each correspondence need to be stated.

#### [E] Cosmology

| Resource | Notes |
| :--- | :--- |
| **Steven Weinberg, *Cosmology*** | The graduate standard. |
| **Viatcheslav Mukhanov, *Physical Foundations of Cosmology*** | The right pedagogically modern textbook. |
| **Daniel Baumann, *Cosmology*** (free online lecture notes, also published) | An entry through cosmological dynamics, perturbations, and observations. |
| **Edward Kolb & Michael Turner, *The Early Universe*** | The classical. |
| **Scott Dodelson & Fabian Schmidt, *Modern Cosmology*** | The right book on cosmological perturbation theory and observational cosmology. |
| **Planck Collaboration, "Planck 2018 Results. VI. Cosmological Parameters"** (2020) | A baseline case of inferring cosmological parameters from CMB data within specified models. [Open paper](https://www.aanda.org/articles/aa/abs/2020/09/aa33910-18/aa33910-18.html) |
| **DESI Collaboration, "DESI DR2 Results II: Measurements of Baryon Acoustic Oscillations and Cosmological Constraints"** (2025) | A more recent case of BAO constraints and their combination with other observations; useful for examining model and dataset dependence. [Open paper](https://arxiv.org/abs/2503.14738) |

**Tips:** Baumann's notes and published text offer an entry; Mukhanov, Weinberg, and Dodelson-Schmidt support different questions about dynamics, perturbations, and observations. Trace a prediction from an FLRW background, thermal history, or primordial-fluctuation model to an observable such as a CMB spectrum or a BAO distance measurement. Inflation is a framework to examine through its assumptions and observational constraints, rather than an inference established by elegance alone. Use Planck as a worked baseline and DESI DR2 as a more recent case of parameter inference: distinguish measured quantities, model parameters, data combinations, uncertainty, and sensitivity to assumptions. Read alongside probability, Bayesian inference, and model evaluation in Trunk 2.4. Evidence favoring a changing dark-energy model in a particular analysis is not by itself a settled discovery of evolving dark energy.

#### [E] Loop Quantum Gravity

| Resource | Notes |
| :--- | :--- |
| **Carlo Rovelli, *Quantum Gravity*** | A technical treatment of quantum-gravity approaches. |
| **Carlo Rovelli & Francesca Vidotto, *Covariant Loop Quantum Gravity*** | The modern formulation. |
| **Carlo Rovelli, *Reality Is Not What It Seems*** | The popular exposition. |
| **Lee Smolin, *Three Roads to Quantum Gravity*** | The accessible comparison of approaches. |

**Tips:** Rovelli's popular exposition offers an orientation; the technical books develop canonical and covariant approaches. Within these frameworks, area and volume operators can have discrete spectra; their relation to spacetime dynamics and empirical observations remains part of the research problem. Compare a specific construction or question with another quantum-gravity approach, identifying what is derived within the framework and what would connect it to observed physics.

### TRUNK 5.4 — Foundational Physics & Philosophy

This is the section where physics meets the philosophical questions you actually care about. It's the bridge from Trunk 5 back into Trunk 4.

#### [E] Foundations of Quantum Mechanics

| Resource | Notes |
| :--- | :--- |
| **Travis Norsen, *Foundations of Quantum Mechanics*** | A pedagogical route into the mathematical and conceptual issues of quantum foundations. |
| **David Albert, *Quantum Mechanics and Experience*** | A compact philosophical treatment of the measurement problem. |
| **Tim Maudlin, *Philosophy of Physics: Quantum Theory*** | The contemporary philosopher's treatment. |
| **David Wallace, *The Emergent Multiverse*** | The mature defense of Everettian (many-worlds) interpretation. |
| **Asher Peres, *Quantum Theory: Concepts and Methods*** | Already on your QM list. The information-theoretic perspective. |
| **John Bell, *Speakable and Unspeakable in Quantum Mechanics*** | Collected primary papers on quantum foundations. |

**Tips:** Norsen and Albert offer different entries into the measurement problem; Maudlin and Wallace develop competing accounts of quantum ontology and measurement. Bell's papers and Peres's treatment help keep the mathematical claims and physical assumptions explicit. Compare a specified set of alternatives by their dynamics, ontology, probability rules, and possible experimental differences. Some proposals modify the dynamics and may differ empirically; others disagree about interpretation while agreeing on the predictions under discussion. The following entry adds operational reconstruction and contextuality to this investigation.

#### [E] Quantum Contextuality & Operational Reconstructions

| Resource | Notes |
| :--- | :--- |
| **Costantino Budroni, Adán Cabello, Otfried Gühne, Matthias Kleinmann & Jan-Åke Larsson, "Kochen-Specker Contextuality"** (2022) | A review of contextuality theorems, different notions of contextuality, experimental tests, and quantum-information applications. [Open paper](https://arxiv.org/abs/2102.13036) |
| **Giulio Chiribella & Robert W. Spekkens, eds., *Quantum Theory: Informational Foundations and Foils*** (2016) | A research collection on operational alternatives, information-theoretic reconstructions, and constraints on quantum correlations. [Publisher](https://link.springer.com/book/10.1007/978-94-017-7303-4) |

**Tips:** Read after linear algebra, probability, and finite-dimensional quantum mechanics. Begin with a concrete contextuality proof or an operational reconstruction and state its assumptions: which measurements are compatible, what is meant by a noncontextual model, or which operational principles select a theory. Separate a theorem within that framework from an experimental test of its premises and consequences. The review can guide a choice of question; the collection supplies alternative approaches to explore selectively. Relate information-processing consequences to Quantum Computing in Trunk 3.1 without treating quantum contextuality as a general claim that all truth or knowledge is context-dependent.

#### [E] Philosophy of Physics

| Resource | Notes |
| :--- | :--- |
| **Tim Maudlin, *Philosophy of Physics: Space and Time*** | A companion to his quantum-theory volume, centered on spacetime. |
| **Maudlin, *The Metaphysics Within Physics*** | Deeper philosophical. |
| **David Wallace, *The Emergent Multiverse*** (already listed) | The Everettian masterpiece. |
| **Lawrence Sklar, *Space, Time, and Spacetime*** | The classical philosophical text on space-time philosophy. |
| **Hans Reichenbach, *The Philosophy of Space and Time*** | The historical-philosophical foundation. |
| **Michael Friedman, *Foundations of Space-Time Theories*** | The serious modern philosophical treatment. |

**Tips:** Use Maudlin, Wallace, Sklar, Reichenbach, and Friedman according to the question: spacetime structure, probability, physical laws, ontology, or explanation. Separate the mathematical representation of a theory from the physical claims made with it. Cartwright in Trunk 4.5 and the effective-theory and cosmology entries above provide cases for examining how a theory's domain, approximations, and evidential support constrain its interpretation.

#### [E] Penrose — Evergreen

| Resource | Notes |
| :--- | :--- |
| **Roger Penrose, *The Road to Reality*** | **Evergreen.** A panoramic mathematical-physics companion; prerequisites depend on the chapter. |
| **Penrose, *The Emperor's New Mind*** | The earlier book — Penrose's argument that consciousness is non-computable, with extensive Gödel discussion. |
| **Penrose, *Shadows of the Mind*** | The follow-up, with his Orchestrated Objective Reduction proposal. |
| **Penrose, *Cycles of Time*** | His conformal cyclic cosmology. Speculative, beautifully written. |
| **Penrose, *Fashion, Faith, and Fantasy in the New Physics of the Universe*** | His critique of string theory, inflation, and quantum mechanics. |
| **Torkel Franzén, *Gödel's Theorem: An Incomplete Guide to Its Use and Abuse*** | Corrective companion before accepting any Gödel-mind claim. |

**Tips:** *The Road to Reality* ranges from elementary geometry through advanced mathematical physics and foundational speculation. Select material according to your questions and available background: technical chapters draw on analysis, linear algebra, geometry, differential equations, and the relevant physical theories. The corresponding Trunk 2 and Trunk 5 resources supply that background. To evaluate the Gödel/consciousness arguments in *The Emperor's New Mind* and *Shadows of the Mind*, understand the incompleteness theorems and use Franzén as a corrective. Distinguish established mathematics and physics from Penrose's own proposals.

### TRUNK 6 — Secondary Humanities

The strategic point of this trunk: each subject is a **lens on the same phenomenon** (humans as language-using, meaning-producing, system-embedded beings), and reading them in the right order with the technical spine in place reveals their convergence rather than their fragmentation. These are not your core domains, but they are the domains where your core knowledge gets *humanized* — where formal systems meet the speaking subject, the social order, and history.

#### [E] French (reading-focused)

| Resource | Notes |
| :--- | :--- |
| **Assimil, *French with Ease*** + **Assimil, *Using French*** | Best self-study sequence for reading-oriented French. |
| **Anki — French Frequency 5000 deck** | High-frequency vocabulary, no excuses. |
| **Lawless French** | Grammar reference. |
| Bridge readers, in order: **Camus, *L'Étranger*** → **Saint-Exupéry, *Le Petit Prince*** → **Foucault short essays** → **Lacan, *Écrits* (selected)** | Each is a real step up. |

**Tips:** Aim for B1 reading first, not speaking. Daily practice matters more than long sessions. Switch to real texts the moment you can stumble through Camus with a dictionary. The payoff is not generic bilingualism but direct contact with French philosophy, theory, psychoanalysis, sociology, and literature: Lacan, Foucault, Bourdieu, Bergson, Merleau-Ponty, Derrida, Deleuze, and French literary prose.

### TRUNK 6.1 — Linguistics

*Read after Trunk 4.2 (mid-analytic philosophy of language).* You'll already have Frege, Russell, Tarski, Quine, Kripke, and Wittgenstein in hand. Linguistics now becomes the empirical complement to that philosophical work.

#### [S] Saussure

| Resource | Notes |
| :--- | :--- |
| **Ferdinand de Saussure, *Course in General Linguistics*** (Harris trans.) | The right translation. Slim. |
| **Jonathan Culler, *Saussure*** (Fontana Modern Masters) | A useful secondary work. Brief and excellent. |
| **Roland Barthes, *Elements of Semiology*** | The structuralist application. Read after Saussure. |

**Tips:** Saussure offers an entry into structural linguistics, with Culler as a possible companion. The book is reconstructed from student notes after his death and reads jaggedly, but the foundational ideas are unmistakable: **language as a system of differences, the arbitrariness of the sign, the synchronic vs diachronic distinction, langue vs parole, signifier vs signified**. These conceptual pairs are the structuralist toolkit, and they propagate forward into every continental thinker on your roadmap (Lacan, Foucault, Derrida, Barthes). **The deep insight is that meaning is structural, not referential** — a sign means what it means by virtue of its place in a system of contrasts, not by virtue of its connection to a thing in the world. Hold this against Frege's referential semantics; the tension is the engine of 20th-century philosophy of language.

#### [S] Natural-Language Formal Semantics

| Resource | Notes |
| :--- | :--- |
| **Elizabeth Coppock & Lucas Champollion, *Invitation to Formal Semantics*** (draft of September 2, 2026) | A free, evolving textbook manuscript on compositional, model-theoretic semantics, with exercises in typed lambda calculus. [Author draft](https://eecoppock.info/bootcamp/semantics-boot-camp.pdf) |

**Tips:** How do word meanings combine into the meaning of a sentence, and which linguistic evidence favors one analysis over another? The text makes quantification, composition, entailment, and presupposition concrete through derivations and examples. Logic and models from 1.1–1.2 and lambda calculus from 1.3 provide useful background; the manuscript also develops the tools it uses. This is a technical entry alongside the historical and theoretical perspectives below. Context & Pragmatics in 4.2 addresses shared information and discourse; the formal analysis does not exhaust the social uses of language. The linked manuscript may change, so the date identifies the version reviewed here.

#### [S] Pinker

| Resource | Notes |
| :--- | :--- |
| **Steven Pinker, *The Language Instinct*** | A viewpoint-driven popular introduction from a broadly generative and evolutionary perspective. |
| **Pinker, *Words and Rules*** | The technical follow-up on morphology. |
| **Pinker, *The Stuff of Thought*** | Pinker on language and conceptual structure. |
| **Ray Jackendoff, *Foundations of Language*** | The right serious modern textbook. |

**Tips:** Pinker offers an accessible argument for language as a biological cognitive capacity; read it as a position with empirical commitments, not as a neutral survey of every linguistic framework. *Words and Rules* focuses on morphology, while *The Stuff of Thought* connects language with conceptual structure. Jackendoff offers a more systematic synthesis of language and cognition. Compare their proposals with the linguistic analyses in Natural-Language Formal Semantics and the alternatives under Cognitive Linguistics. The connection to 4.6 concerns representation, cognitive architecture, and what language use can tell us about the mind.

#### [E] Chomsky

| Resource | Notes |
| :--- | :--- |
| **Noam Chomsky, *Syntactic Structures*** | The 1957 monograph that founded modern linguistics. Slim. |
| **Chomsky, *Aspects of the Theory of Syntax*** | The 1965 monograph. The Standard Theory. |
| **Chomsky, *The Minimalist Program*** | The mature program. Demanding. |
| **Andrew Radford, *Minimalist Syntax: Exploring the Structure of English*** | A textbook. |
| **Liliane Haegeman, *Introduction to Government and Binding Theory*** | A textbook for the older Government-Binding framework. |

**Tips:** *Syntactic Structures* offers a compact historical entry. Then sample *Aspects* and skip to a contemporary textbook (Radford or Haegeman) for the actual technical work. Chomsky's research program has gone through several iterations (Standard Theory, Government-Binding, Principles-and-Parameters, Minimalism), and trying to read his work chronologically is unrewarding. **Pick one framework and learn it well.** Minimalism is the contemporary one. The connection back to Trunks 1.1 and 1.3 (formal languages and computation): Chomsky's hierarchy (regular, context-free, context-sensitive, recursively enumerable) is the same hierarchy you've already met as the foundation of formal language theory. The fact that the same hierarchy emerged from linguistics and from computability theory is one of the great unifications of mid-20th-century thought.

#### [E] Cognitive Linguistics

| Resource | Notes |
| :--- | :--- |
| **George Lakoff & Mark Johnson, *Metaphors We Live By*** | The accessible founding text. |
| **George Lakoff, *Women, Fire, and Dangerous Things*** | The mature theoretical statement. Demanding. |
| **Ronald Langacker, *Foundations of Cognitive Grammar*, Vol. 1: *Theoretical Prerequisites*** | The serious cognitive grammar treatment. |
| **William Croft & D. Alan Cruse, *Cognitive Linguistics*** | A modern textbook. |
| **Mark Johnson, *The Body in the Mind*** | The embodied-cognition foundation from the linguistic side. |

**Tips:** Lakoff & Johnson's *Metaphors We Live By* offers a compact conceptual entry. The thesis: **abstract concepts are systematically structured by metaphors grounded in embodied experience** (life is a journey, argument is war, more is up). Then *Women, Fire, and Dangerous Things* for the deeper theoretical commitments. Cognitive linguistics is the empirically grounded alternative to Chomskyan generative linguistics — it rejects the autonomy of syntax, the modularity of language, and the universal grammar hypothesis in favor of language as continuous with general cognition and grounded in embodied experience. **Connection to your roadmap**: cognitive linguistics is the linguistic face of embodied cognition (Trunk 4.6, Andy Clark, Merleau-Ponty), and it's the empirical complement to Lakoff's *Philosophy in the Flesh* (which argues that all of philosophy is structured by embodied conceptual metaphors). Whether you accept this view or remain Chomskyan, knowing the alternative is essential.

### TRUNK 6.2 — Psychoanalysis (Lacanian)

*Read after Trunks 4.2 + 6.1.* Lacan reads philosophy and structural linguistics through Freud, and is intelligible only with both in hand.

#### [E] Bruce Fink

| Resource | Notes |
| :--- | :--- |
| **Bruce Fink, *The Lacanian Subject*** | **A central text.** A useful entry to Lacan. |
| **Fink, *A Clinical Introduction to Lacanian Psychoanalysis*** | The clinical companion. |
| **Fink, *Lacan to the Letter: Reading Écrits Closely*** | The reader's guide to the *Écrits*. |
| **Fink, *Fundamentals of Psychoanalytic Technique*** | The practical Lacanian therapy book. |

**Tips:** Fink offers a relatively accessible route into Lacanian theory and clinical practice. *The Lacanian Subject* develops the three registers (Imaginary, Symbolic, Real), the Other, the objet a, jouissance, and the phallus as signifier; *Lacan to the Letter* supports close reading of particular essays. Consult the clinical books when the question concerns technique or the interpretation of cases. These texts supply a theoretical and interpretive perspective, whose conceptual claims should be distinguished from evidence about mechanisms or treatment outcomes.

#### [E] Lacan, *Écrits*

| Resource | Notes |
| :--- | :--- |
| **Jacques Lacan, *Écrits: The First Complete Edition in English*** (Fink trans.) | The right edition. |
| **Lacan, *The Mirror Stage as Formative of the I Function*** (1949 essay) | Read first. |
| **Lacan, *The Function and Field of Speech and Language in Psychoanalysis*** (the "Rome Discourse," 1953) | The founding manifesto. |
| **Lacan, *The Instance of the Letter in the Unconscious, or Reason Since Freud*** (1957) | The key linguistic essay. |
| **Lacan, *The Subversion of the Subject and the Dialectic of Desire*** (1960) | The theoretical climax. |
| **Lacan, *On a Question Prior to Any Possible Treatment of Psychosis*** (1958) | The clinical-theoretical synthesis. |

**Tips:** Read the four-or-five essays listed above, in order, with Fink's *Lacan to the Letter* in parallel. Don't try to read the whole *Écrits*. Lacan's prose is famously difficult — partly because the ideas are hard, partly because Lacan's style is deliberately performative, enacting the unconscious processes he describes. **Read in French if your French (Trunk 6, French reading) is up to it** — Lacan is one of the writers most damaged by translation. The Mirror Stage essay is the conceptual entry; the Rome Discourse establishes the linguistic-structural reading of Freud; the Instance of the Letter develops it; the Subversion of the Subject crystallizes the theoretical framework. **Connection to Trunk 6.1 (Saussure)**: Lacan's central move is reading Freud through Saussure, treating the unconscious as structured like a language. Connection to Trunk 4.2 (Wittgenstein, rule-following): the Lacanian subject is constituted by its place in the symbolic order, which is precisely the kind of rule-governed structure that Wittgenstein questions. The connections are real and rich.

#### [E] Lacan's Seminars

| Resource | Notes |
| :--- | :--- |
| **Jacques Lacan, *Seminar II: The Ego in Freud's Theory and in the Technique of Psychoanalysis*** | The right second-step seminar. |
| **Lacan, *Seminar VII: The Ethics of Psychoanalysis*** | The famous one. The death drive, the Thing, sublimation. |
| **Lacan, *Seminar XI: The Four Fundamental Concepts of Psychoanalysis*** | A useful entry-level seminar. The accessible Lacan. |
| **Lacan, *Seminar XX: Encore*** | The late Lacan on feminine sexuality and topology. |
| **Lacan, *Seminar XVII: The Other Side of Psychoanalysis*** | The political Lacan. The four discourses. |

**Tips:** Seminar XI is the right entry — it's the seminar Lacan delivered just after his official excommunication from the IPA, and the energy is correspondingly high. The four fundamental concepts (the unconscious, repetition, the transference, the drive) are the conceptual core of psychoanalysis as Lacan reformulates it. Seminar VII (ethics) is the seminar that connects most directly to philosophy and is the most-cited in continental philosophy. Seminar XX (Encore) is famously where Lacan gets mathematical — Borromean knots, topology, feminine sexuality — and it connects unexpectedly to Trunk 2.3 (topology). **The seminars are how Lacan actually taught** and the prose is more conversational than the *Écrits*. Read them slowly. Bruce Fink's translation of Seminar XX is the right one.

#### [E] Žižek

| Resource | Notes |
| :--- | :--- |
| **Slavoj Žižek, *The Sublime Object of Ideology*** | The book that made Žižek's reputation. |
| **Žižek, *The Parallax View*** | The mature theoretical statement. Demanding. |
| **Žižek, *Less Than Nothing*** | The 1000-page magnum opus on Hegel and Lacan. For obsessives. |
| **Tony Myers, *Slavoj Žižek*** (Routledge Critical Thinkers) | A useful secondary entry. |
| **Sarah Kay, *Žižek: A Critical Introduction*** | The right critical companion. |

**Tips:** *The Sublime Object of Ideology* offers an entry into the relation between ideology and enjoyment. Žižek is the contemporary thinker who has done the most to transmit Lacanian theory into broader cultural and political discourse. His method — reading Hollywood films, jokes, and political phenomena as illustrations of Lacanian and Hegelian concepts — is divisive but pedagogically effective. The thesis of *The Sublime Object*: ideology functions not by deceiving us about reality but by structuring our enjoyment of reality, and ideological critique is therefore not just a matter of demystification but of confronting how we are libidinally invested in our subjugation. **Connection to Trunk 6.3 (sociology)**: this is one of the most important contemporary contributions to social theory, and it bridges psychoanalysis, philosophy (Hegel, Lacan), and political theory in a way that nothing else does.

### TRUNK 6.3 — Sociology

*Read after Trunks 2.4 + 6.2.* Sociology is most powerful when read with both quantitative-statistical fluency and an understanding of subjects-in-language.

#### [E] Empirical Social Research

| Resource | Notes |
| :--- | :--- |
| **Matthew J. Salganik, *Bit by Bit: Social Research in the Digital Age*** (published 2017; copyright 2018) | Research design for observing behavior, asking questions, running experiments, and organizing mass collaboration. [Author's free edition](https://www.bitbybitbook.com/) · [University publication record](https://collaborate.princeton.edu/en/publications/bit-by-bit-social-research-in-the-digital-age/) |

**Tips:** What evidence could distinguish a social explanation from an attractive interpretation? Choose chapters on observation, surveys, or experiments to match the question, and examine sampling, measurement, selection, and research ethics as parts of the design. Probability and causal inference in 2.4 help assess the resulting claims; computational tools help implement a study. Use this methodological perspective when reading Weber, Bourdieu, or Foucault, while recognizing that historical interpretation and statistical estimation answer different kinds of questions.

#### [E] Weber

| Resource | Notes |
| :--- | :--- |
| **Max Weber, *The Protestant Ethic and the Spirit of Capitalism*** (Parsons trans. or the newer Kalberg) | A central text. Select passages for the question at hand. |
| **Weber, *Economy and Society*** (selections) | The encyclopedic theoretical work. Use selectively. |
| **Weber, *The Vocation Lectures*** (*Politics as a Vocation* + *Science as a Vocation*) | Two lectures. Essential. |
| **H. H. Gerth & C. Wright Mills, eds., *From Max Weber: Essays in Sociology*** | A useful anthology for orientation. |
| **Stephen Kalberg, *Max Weber's Comparative-Historical Sociology*** | A useful secondary work. |

**Tips:** *The Protestant Ethic* provides a focused historical argument. The thesis — that the ascetic religious ethics of Reformed Protestantism contributed to the development of modern capitalism — is more historically nuanced and intellectually careful than its caricatures suggest. Then the *Vocation Lectures*, especially *Science as a Vocation*, which is one of the most philosophically penetrating short texts in 20th-century social theory. Weber's conceptual framework (rationalization, ideal types, charismatic vs traditional vs legal authority, the iron cage of bureaucratic rationality) is foundational for everything that follows. **Connection to Trunk 4.5 (philosophy of science)**: Weber's methodology — *Verstehen*, ideal types, value-relevance — is one of the great alternative methodologies to the natural-scientific approach, and it's the philosophical foundation of the social sciences as a separate domain.

#### [E] Bourdieu

| Resource | Notes |
| :--- | :--- |
| **Pierre Bourdieu, *Distinction: A Social Critique of the Judgement of Taste*** | A central text. Select passages for the question at hand. |
| **Bourdieu, *The Logic of Practice*** | The theoretical statement. |
| **Bourdieu, *Outline of a Theory of Practice*** | The earlier theoretical work. |
| **Bourdieu & Loïc Wacquant, *An Invitation to Reflexive Sociology*** | A useful entry — Bourdieu in dialogue, accessible. |
| **David Swartz, *Culture and Power: The Sociology of Pierre Bourdieu*** | A useful secondary work. |

**Tips:** Use *Distinction* to connect a social explanation with the evidence and analytical method behind it. The book is enormous (600+ pages) but the thesis becomes unmistakable in the first 100: aesthetic preferences are systematically structured by class, and what feels like personal taste is in fact a coded enactment of social position. The empirical core is Bourdieu's correspondence analysis of survey data on 1960s French taste, and **reading this book with Trunk 2.4 in hand transforms the experience** — you can see the statistical infrastructure as a working epistemology rather than a decoration. *Reflexive Sociology* is the right entry for the conceptual framework: habitus, field, capital (economic, cultural, social, symbolic), doxa, symbolic violence. Bourdieu's central insight: **social structure is reproduced through the bodies and dispositions of agents**, who experience their structurally-conditioned actions as freely chosen. This is one of the most important social-theoretical insights of the 20th century.

#### [E] Luhmann

| Resource | Notes |
| :--- | :--- |
| **Niklas Luhmann, *Social Systems*** (Bednarz & Baecker trans.) | A central text. Demanding. |
| **Luhmann, *Introduction to Systems Theory*** | The lectures. The right pedagogical entry. |
| **Luhmann, *Theory of Society***, Vols. 1–2 | The mature synthesis. |
| **Hans-Georg Moeller, *Luhmann Explained*** | A gentle secondary work. |
| **Hans-Georg Moeller, *The Radical Luhmann*** | The provocative reading. |

**Tips:** Moeller's *Luhmann Explained* first, then the *Introduction to Systems Theory* lectures, then *Social Systems*. **Luhmann is the philosopher-sociologist who took cybernetics most seriously as social theory.** His framework: society is a self-referential, autopoietic system of communications (not actions, not individuals — communications). Social subsystems (law, economy, science, religion, art, education) are functionally differentiated and operate according to their own internal codes (legal/illegal, profitable/unprofitable, true/false, etc.). **Connection to your roadmap**: this is the explicit application of systems theory and cybernetics (Trunk 1.5) to society, and it's the contemporary alternative to action-theoretic sociology (Weber, Habermas). Luhmann is famously difficult, but the conceptual payoff is enormous — once you have the framework, the modern world becomes legible as a network of self-organizing communicative systems, and many otherwise-puzzling features of contemporary life (the autonomy of legal reasoning from morality, the decoupling of economic logic from social welfare, the inability of any subsystem to control any other) become intelligible.

#### [E] Foucault

| Resource | Notes |
| :--- | :--- |
| **Michel Foucault, *Discipline and Punish*** | Already on your list (Trunk 4.7). A useful entry. |
| **Foucault, *The History of Sexuality*, Vol. 1: *The Will to Knowledge*** | The conceptually densest. Short. |
| **Foucault, *Madness and Civilization*** | The early masterwork. |
| **Foucault, *The Birth of the Clinic*** | The medical-archaeological companion. |
| **Foucault, *Society Must Be Defended*** | The lectures on biopolitics and war. |
| **Foucault, *The Birth of Biopolitics*** | The lectures on neoliberalism. |
| **Paul Rabinow, ed., *The Foucault Reader*** | A useful anthology. |

**Tips:** Foucault appears here again because his work is essential for sociology specifically, beyond philosophy. Read *Discipline and Punish* and *History of Sexuality Vol. 1* as a pair — they're the two most influential books for contemporary social theory. The conceptual core: **power is not primarily repressive but productive** — it produces subjects, knowledges, behaviors, and bodies through specific historically-situated apparatuses (the prison, the clinic, the school, the confessional, the census). *Society Must Be Defended* and *The Birth of Biopolitics* are the lectures where Foucault develops his concepts of biopolitics and neoliberalism, and these have become the most influential contemporary frameworks for thinking about power in the late 20th and 21st centuries. **Read in French if you can.**

#### [E] Cultural Evolution & Cooperation

| Resource | Notes |
| :--- | :--- |
| **Robert Boyd, *A Different Kind of Animal: How Culture Transformed Our Species*** (2018) | Cultural learning, cumulative adaptation, social norms, and large-scale cooperation, with critical responses from other scholars. [Publisher edition](https://www.jstor.org/stable/j.ctvc7799z) |

**Tips:** How can a population know more than any individual could discover, and how are cooperative practices sustained? Boyd supplies a cultural-evolutionary explanation to compare with the accounts of institutions, power, and social reproduction above. Read the accompanying criticisms as part of the argument: the role of learning, selection, and inference remains something to investigate. This connects Evolution & Cognition in 4.6 with social learning and belief networks in 4.3, without treating cultural transmission as a guarantee of truth or adaptation.

### TRUNK 6.4 — History

History supplies cases, contexts, and records against which broader explanations can be assessed.

#### [E] Big-Picture History

| Resource | Notes |
| :--- | :--- |
| **Eric Hobsbawm, *The Age of Revolution* / *The Age of Capital* / *The Age of Empire* / *The Age of Extremes*** | The tetralogy. The right modern world history. |
| **William McNeill, *The Rise of the West*** | The classical world-historical synthesis. |
| **许倬云 (Hsu Cho-yun), *万古江河 / Rivers of the Ten Thousand Ages*** | The Chinese-civilizational synthesis. |
| **Yuval Harari, *Sapiens*** | The popular synthesis. Read for entry, not for depth. |
| **Felipe Fernández-Armesto, *The World: A History*** | The right encyclopedic textbook. |

**Tips:** Hobsbawm's tetralogy is the right modern world history — Marxist in framework, but readable, comprehensive, beautifully written. *The Age of Extremes* (the 20th-century volume) is the most personally invested. 许倬云 is the corrective — most Western historiography systematically underweights non-Western developments, and 许倬云 is one of the few historians writing in Chinese with global synthetic ambition. Read these as **slow, recreational background** as questions arise. The point is to accumulate historical material that can be brought to bear when interpreting philosophical and sociological claims.

#### [E] Intellectual History

| Resource | Notes |
| :--- | :--- |
| **Tony Judt, *Postwar*** | The book on post-1945 Europe. Magisterial. |
| **Tony Judt, *Reappraisals: Reflections on the Forgotten Twentieth Century*** | The essay collection. |
| **Isaiah Berlin, *Russian Thinkers*** | A useful entry to Berlin. |
| **Isaiah Berlin, *Against the Current*** | The intellectual-history essays. |
| **Isaiah Berlin, *The Roots of Romanticism*** | The Mellon Lectures. Beautiful. |
| **Mark Lilla, *The Reckless Mind*** | The right modern intellectual history. |
| **Louis Menand, *The Metaphysical Club*** | American pragmatism in narrative form. Pulitzer-winning. |

**Tips:** Judt's *Postwar* offers a broad account of postwar Europe; select periods and themes according to the question. Berlin in any quantity is rewarding — he's one of the great essayists of the 20th century, and his work on Russian intellectual history, romanticism, and the history of liberalism is enormously valuable for any reader of philosophy. Menand's *Metaphysical Club* is the rare intellectual history that reads like a novel. **Connection to your roadmap**: intellectual history is the corrective to the systematic ahistoricality of analytic philosophy. The names you've been reading (Frege, Russell, Wittgenstein, Quine, Kripke) didn't appear in a vacuum, and reading their context recontextualizes the work itself.

#### [E] History of Science

| Resource | Notes |
| :--- | :--- |
| **Thomas Kuhn, *The Copernican Revolution*** | Kuhn's earlier history-of-science book. More careful than *Structure*. |
| **Steven Shapin, *The Scientific Revolution*** | The right contemporary history of the scientific revolution. |
| **Peter Galison, *Image and Logic*** | The major history-of-physics monograph on detector and instrument cultures. |
| **Galison, *Einstein's Clocks, Poincaré's Maps*** | Beautiful book on the conceptual prehistory of relativity. |
| **Lorraine Daston & Peter Galison, *Objectivity*** | The conceptual history of scientific objectivity. |

**Tips:** Shapin's *Scientific Revolution* offers an overview; Galison's *Einstein's Clocks* provides a focused case about measurement, technology, and concepts. Galison and Daston are the most important contemporary historians of science, and their work has substantially complicated the philosophical pictures from Trunk 4.5. **Connection to Trunk 4.5**: history of science as actually practiced shows that the philosophical models (Popper, Kuhn, Lakatos, Feyerabend) are all simplifications of an enormously messier historical reality, and reading Galison alongside the philosophers is corrective.

### TRUNK 6.5 — Media & Communication

*After Trunk 1.5 (feedback, systems, and communication).* Media theory asks how communication technologies shape cultural practices; cybernetics provides one useful comparison.

#### [E] McLuhan

| Resource | Notes |
| :--- | :--- |
| **Marshall McLuhan, *Understanding Media: The Extensions of Man*** | A central text. |
| **McLuhan, *The Gutenberg Galaxy*** | The earlier work on print culture. |
| **McLuhan & Quentin Fiore, *The Medium Is the Massage*** | The visual experiment. Fast read. |
| **Eric McLuhan & Frank Zingrone, eds., *Essential McLuhan*** | A useful anthology. |

**Tips:** *Understanding Media* offers an entry into media as extensions of human faculties. McLuhan's prose is gnomic, aphoristic, and famously hard to extract a thesis from — but the central insights (the medium is the message; media as extensions of human faculties; hot vs cool media; the global village) are foundational for everything that follows in media theory. **Connection to Trunk 1.5 (cybernetics)**: compare McLuhan's account of media and feedback with Wiener and Bateson, identifying the assumptions added when technical concepts enter cultural explanation. Social Epistemology & Belief Networks in 4.3 supplies a complementary account of belief transmission, trust, and communication networks.

#### [E] Kittler

| Resource | Notes |
| :--- | :--- |
| **Friedrich Kittler, *Gramophone, Film, Typewriter*** | A central text. |
| **Kittler, *Discourse Networks 1800/1900*** | The major theoretical work. |
| **Kittler, *Optical Media*** | The lectures. The right pedagogical entry. |
| **Geoffrey Winthrop-Young, *Kittler and the Media*** | A useful secondary work. |

**Tips:** *Optical Media* first (the lectures are clearer than the books), then *Gramophone, Film, Typewriter*. Kittler is the post-Foucauldian, post-McLuhan theorist who took the materiality of media most seriously — his thesis is that **media don't represent culture; they constitute the conditions of possibility for culture**, and that the history of culture is in significant part the history of recording and transmission technologies. Kittler is famously rigorous about technical detail (he writes about the actual engineering of the gramophone and film camera with engineering-level precision), and reading him after Trunk 3.3 (systems and engineering) gives the engineering content traction.

### TRUNK 7 — Literary Output

This trunk runs alongside the others. Research essays make questions, evidence, and arguments available for inspection; fiction and literary essays explore how thought takes shape in voice, perception, and narrative. The resources include practical guides, narrative theory, and works to study for their formal choices.

Writing can begin with the material already at hand. Finished pieces provide occasions to discover gaps in an argument, test a form, and revise an account of experience.

#### [S] Writing as Practice

Support role: clear definitions, proof explanations, reconstructed philosophical arguments, and research essays. The craft resources also support fiction and the literary projects below.

| Resource | Notes |
| :--- | :--- |
| **Wayne C. Booth, Gregory G. Colomb, Joseph M. Williams, Joseph Bizup & William T. FitzGerald, *The Craft of Research*** (5th ed., 2024) | Research questions, source evaluation, claims, reasons, evidence, objections, and communication. An argument-building companion to the style guides. [Publisher](https://press.uchicago.edu/ucp/books/book/chicago/C/bo215874008) |
| **William Strunk Jr. & E. B. White, *The Elements of Style*** | Reference, not gospel. |
| **William Zinsser, *On Writing Well*** | **Evergreen.** Nonfiction craft, clarity, and the relation between subject, writer, and reader. |
| **Verlyn Klinkenborg, *Several Short Sentences About Writing*** | Sentence-level attention and revision; useful for working in small, concrete units. |
| **Stephen King, *On Writing*** | Half memoir, half manual. Both halves valuable. |
| **Annie Dillard, *The Writing Life*** | Short, lyrical, essential. |

**Tips:** *The Craft of Research* supports research essays and reconstructed arguments: move from a topic to a question, formulate a claim, connect it to reasons and evidence, and consider objections and limitations. Zinsser, Strunk-White, and Klinkenborg address expression at different scales; consult them for clarity, structure, and sentence-level revision. King and Dillard offer perspectives on literary practice. Choose the guide that addresses the current difficulty: a polished sentence cannot substitute for a supported claim, and a sound argument still needs a form readers can follow.

#### [E] Possible Worlds, Narrative & Fiction

| Resource | Notes |
| :--- | :--- |
| **Alice Bell & Marie-Laure Ryan, eds., *Possible Worlds Theory and Contemporary Narratology*** (2019) | Fictionality, narrative worlds, and methods of analysis across literary and digital narratives, games, and other media. [Publisher](https://www.nebraskapress.unl.edu/nebraska/9781496213051/possible-worlds-theory-and-contemporary-narratology/) |

**Tips:** Use a familiar narrative to ask what is true in its fictional world, what its characters believe or imagine, and what readers infer beyond what is stated. Modality and reference in Trunk 4.2 offer useful background, while media studies in 6.5 helps compare how different media construct and disclose a world. Narrative theory adapts possible-worlds ideas for its own questions; a literary world is not automatically a model in the formal-logical sense. Move between the theoretical distinctions and a concrete passage or scene, asking what the analysis reveals about the work's form.

#### [E] Calvino — Evergreen

| Resource | Notes |
| :--- | :--- |
| **Italo Calvino, *Six Memos for the Next Millennium*** | **Evergreen.** The five Charles Eliot Norton lectures (he died before writing the sixth). |
| **Calvino, *The Uses of Literature*** | The essay collection. Companion to the *Memos*. |
| **Calvino, *Why Read the Classics?*** | The other essay collection. |
| **Calvino, *Cosmicomics*** | Mathematics and physics as fiction. |
| **Calvino, *If on a winter's night a traveler*** | Recursive metafiction. |
| **Calvino, *Invisible Cities*** | Catalogue, combinatorics, and metaphysical cities. |
| **Calvino, *Mr Palomar*** | The phenomenologist as protagonist. |
| **Calvino, *t zero*** | More mathematical-physical fictions. |

**Tips:** *Six Memos* offers five working values for prose: Lightness, Quickness, Exactitude, Visibility, and Multiplicity. Its readings of Lucretius, Cavalcanti, Galileo, Borges, and Kafka are examples of reading as a writer. *Cosmicomics* and *t zero* turn mathematical and cosmological premises into fiction; *Invisible Cities* explores catalogue and combinatorial forms; *If on a winter's night a traveler* uses recursive narrative architecture; *Mr Palomar* attends to observation. These are Evergreen companions within Trunk 7. Mathematical and physical context can enrich particular readings, but it is not an entrance requirement for the fiction.

#### [E] Models — sense-makers

| Resource | Notes |
| :--- | :--- |
| **Jorge Luis Borges, *Ficciones* + *El Aleph*** | **Evergreen.** Fiction as an exploration of infinity, language, memory, and formal worlds. |
| **W. G. Sebald, *The Rings of Saturn* + *Austerlitz*** | Essayistic fiction involving memory, history, perception, and documentary forms. |
| **Clarice Lispector, *The Passion According to G.H.* + *Água Viva*** | The right model for philosophical-mystical first-person prose. |
| **Roberto Bolaño, *Last Evenings on Earth* (short fiction) + *2666*** | The model for politically-engaged dark fiction. |
| **Annie Dillard, *Pilgrim at Tinker Creek* + *Holy the Firm*** | The right model for sustained nature-philosophical prose. |
| **John Berger, *Ways of Seeing* + *G.* + *Bento's Sketchbook*** | The right model for art-philosophy-essay hybrid forms. |
| **Borges, *Other Inquisitions*** | Essays. Indispensable. |
| **Borges, *Selected Non-Fictions*** (Penguin, ed. Weinberger) | An English anthology of essays, criticism, lectures, and other nonfiction. |
| **Edna Aizenberg, *Borges and His Successors*** | Useful secondary work. |

**Tips:** Borges offers examples of how citation, invented documents, infinity, and conceptual puzzles can shape fiction. Sebald connects associative prose to memory and historical traces; Lispector explores philosophical inwardness; Berger works across art, politics, and observation. Read for pleasure or examine a formal decision in detail: how does a narrator establish authority, what does a document contribute, and when does a change of voice alter what can be known? The authors offer different approaches to serious thought in literature.

*The Library of Babel*, *Tlön, Uqbar, Orbis Tertius*, *The Garden of Forking Paths*, *Funes the Memorious*, and *The Aleph* explore meaning, infinity, memory, and possible worlds through fiction. Connections to logic, philosophy, and cognitive science can be pursued when useful; those subjects are not prerequisites for reading the stories.

#### [E] Models — formal-constraint tradition

For Calvino’s *Cosmicomics*, *If on a winter's night a traveler*, and *Invisible Cities*, see the Calvino — Evergreen entry above.

| Resource | Notes |
| :--- | :--- |
| **Georges Perec, *Life: A User's Manual*** | The masterpiece of OuLiPo. |
| **Perec, *A Void*** | The novel without the letter *e*. |
| **Perec, *Species of Spaces and Other Pieces*** | The essay collection. |
| **Raymond Queneau, *Exercises in Style*** | The same anecdote told 99 different ways. |
| **Queneau, *Zazie in the Metro*** | The novel. |
| **Daniel Levin Becker, *Many Subtle Channels: In Praise of Potential Literature*** | The right secondary work on OuLiPo. |
| **Harry Mathews & Alastair Brotchie, eds., *Oulipo Compendium*** | The reference. |

**Tips:** OuLiPo explores formal constraints as generators of literary possibilities. Compare the same narrative material under different constraints, using Queneau's variations or Perec's compositional structures as examples. French is helpful for examining effects tied to the language, while translations offer their own solutions to constraints. Levin Becker provides context, and the compendium supplies techniques to investigate. The connection with mathematical practice is a comparison to make explicit: a generative literary rule, a compositional procedure, and a formal proof have different purposes and standards of success.

#### [E] Models — math/philosophy-saturated fiction

| Resource | Notes |
| :--- | :--- |
| **David Foster Wallace, *Infinite Jest*** | An extended example of recursive narrative, attention, entertainment, and philosophical inquiry. |
| **Wallace, *Brief Interviews with Hideous Men*** | The short fiction. |
| **Wallace, *Consider the Lobster* + *A Supposedly Fun Thing I'll Never Do Again*** | The essay collections. |
| **Wallace, *Everything and More: A Compact History of Infinity*** | A literary treatment of infinity and set theory; compare technical claims with mathematical sources. |
| **Wallace, *The Pale King*** | The unfinished novel. Philosophically dense. |
| **D. T. Max, *Every Love Story Is a Ghost Story*** | A biography to consult for questions about Wallace and his work. |
| **Ted Chiang, *Exhalation*** (2019) | Short fiction exploring scientific discovery, counterfactual worlds, choice, and the consequences of speculative premises for human experience. [Publisher](https://www.penguinrandomhouse.com/books/538034/exhalation-by-ted-chiang/) |

**Tips:** Wallace's essays and shorter fiction offer manageable examples of voice, qualification, attention, and recursive form; the novels extend these questions over larger structures. His *Fate, Time, and Language* supplies a separate example of philosophical argument. *Everything and More* can be read as an attempt to convey the emotional and philosophical force of mathematics, with technical claims checked against mathematical sources. Chiang offers another route: a limited speculative premise changes what characters can know, choose, remember, or regret. Compare how a premise affects narrative causality and character rather than functioning as background exposition. Fiction can explore consequences of an assumption without providing evidence that the assumption is true.

#### [E] Personal essay / short fiction practice

| Resource | Notes |
| :--- | :--- |
| **Phillip Lopate, ed., *The Art of the Personal Essay*** | The right anthology of the form, from Seneca to Sontag. |
| **John D'Agata, ed., *The Lost Origins of the Essay*** | The historical-experimental anthology. |
| **Charles D'Ambrosio, *Loitering*** | Contemporary essays. The right model for contemporary American literary essay. |
| **Joan Didion, *The White Album* + *Slouching Towards Bethlehem*** | The classical model. |
| **Susan Sontag, *Against Interpretation*** | The intellectual-critical essay form. |

**Tips:** Distinguish two practices. In a research-informed or personal essay, connect observation and memory to a question, distinguish recollection from documented claims, and make the relevant reasons or evidence available to the reader; *The Craft of Research* can support the argumentative parts. In short fiction, let a premise, viewpoint, or formal constraint generate situations and choices, then examine whether those choices produce convincing narrative consequences. Lopate, D'Agata, D'Ambrosio, Didion, and Sontag offer varied essay forms; the fiction collections above supply complementary examples. A piece might begin with a concept, a place, a memory, or an unresolved question, and find the length its treatment requires.

#### [E] Long-form attempt

| Resource | Notes |
| :--- | :--- |
| **John Gardner, *The Art of Fiction*** | The right craft manual for novelists. |
| **James Wood, *How Fiction Works*** | The right book on the technical resources of the novel. |
| **E. M. Forster, *Aspects of the Novel*** | The classical. Slim, brilliant. |
| **Milan Kundera, *The Art of the Novel*** | The novelist-philosopher's account. |

**Tips:** Use Gardner, Wood, Forster, and Kundera for questions about character, perspective, development, and the possibilities of the novel. Shorter pieces can expose questions of voice or structure that recur in longer forms. A chapter, outline, sequence of scenes, or linked set of essays can reveal whether the material supports a larger form. Let the project grow when its argument or narrative needs the space, and use revision to test how its parts depend on one another.
