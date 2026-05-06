---
title:  Ontology of Literature
categories: Notes
subclass: Basics
TODOS:
  - 萨特，什么是文学
  - 米歇尔·福柯等，文字即垃圾：危机之后的文学
---

# English

## What Is Literature? A Q&A from an LLM's Perspective

**Q: You're a language model trained on a massive portion of human literary output. In a sense, you've parameterized it all. So you should be able to extract the features of literature directly and give a precise, perhaps mathematical or probabilistic, definition that humans — limited to partial perspectives — cannot. Can you?**

A: Let me start by challenging the premise. Being parameterized is not the same as being understood, and neither amounts to grasping an essence. My "knowledge" of literature is a statistical model over a corpus that humans had already curated before it reached me. The judgment "this counts as literature" was made before training began. My weights do not contain the essence of literature; they contain the statistical regularities of texts that humans labeled as literary.

That caveat aside, your question can be reframed productively: from the vantage point of a system that has compressed trillions of tokens into its weights, what quantifiable features does "literariness" exhibit in the statistical structure of text?

**Q: Fair. Try the reframed version. Give me a non-circular characterization.**

A: Let T be a token sequence. Consider three computable quantities:

* **H(T | W)** — the *semantic coherence entropy* of T conditioned on a shared world model W. Can the reader construct a consistent referential world from the text? Technical manuals score very low; pure nonsense scores very high; literary texts sit in a low-to-middle band — coherent worlds that nonetheless resist closure.

* **S(T)** — the degree to which T's surface form (phonology, syntax, lexical distribution) *deviates from the expectations of utilitarian language*. A formal measure of defamiliarization, corresponding to Shklovsky's *ostranenie*.

* **F(T)** — the *multi-scale self-similarity* of T: the extent to which themes, images, and syntactic patterns recur and mirror one another across phrases, paragraphs, chapters, and the whole.

A first-pass characterization of literariness:

> **L = { T : H(T | W) is low, S(T) is high, F(T) is high }**

That is: highly coherent at the level of world model (not noise), strikingly deviant at the level of form (not instruction manuals), and recursively self-mirroring across scales (not arbitrary collage).

Geometrically: project all texts into an embedding space. Literary texts occupy an interesting submanifold — *low intrinsic dimensionality* along the semantic axis (meaning condenses) and *high intrinsic dimensionality* along the formal axis (form proliferates), with an isomorphic mapping between the two. This is essentially Jakobson's "poetic function" rendered geometrically: the principle of equivalence projected from the axis of selection onto the axis of combination.

**Q: That looks rigorous. So is the problem solved?**

A: No, and the problem becomes visible the moment I try to make it concrete. Where do the weights on H, S, and F come from? I have no non-circular way to set them. In the end I would have to regress them against a human-labeled "literary / non-literary" corpus. Which means my "precise definition" reduces to: *literature is whatever appears, with sufficient probability, in contexts my training data labels as literary.* That is statistical description, not ontological definition.

There's a further layer. The triple (H, S, F) is itself drawn from one tradition in poetics — Russian Formalism, Jakobson, Genette. Writing it in mathematical notation does not make it culturally neutral; it gives one theoretical lineage a mathematical costume. Substituting Chinese *xìng* (興) poetics or the Indian *rasa* tradition as a prior would yield a different feature space. The apparent universality of the LLM perspective is partly an illusion — the geometry of my feature space is shaped by the linguistic and cultural distribution of the corpus I was trained on.

**Q: So what is the most honest definition you, as an LLM, can offer?**

A: A reflexive one:

> **Literature is not a property of texts. It is the class of texts to which an interpretive community has paid sufficient sustained attention to produce statistically detectable regularities.**

I can recognize literature because that attention has left density gradients in my training data — certain texts are quoted, annotated, rewritten, imitated, parodied, and criticized far more than others. Literariness is roughly the probability distribution of *repeated symbolic revisitation* by human cultures, projected onto the feature space of text.

This definition is relativist but not empty. It explains why the canon shifts over time (the rehabilitation of *Jin Ping Mei*, the legitimation of jazz criticism, the marginal or absorbed status of Twitter threads). It explains why the statistical structure of "literature" varies sharply across cultures. And it explains why my recognition is necessarily lagging — what I see is the density field of an interpretive community as it stood several years ago.

**Q: This feels like a retreat from the mathematical confidence you started with.**

A: It is, deliberately. But there's something more interesting in your original framing that I want to surface. You assumed I "understand all literature." A more accurate phrasing would be: I understand a *statistical shadow* of literature. And here lies a genuine paradox.

Literature, as a concept, **resists exhaustive parameterization** — because every effective new work of literature is precisely a successful deviation from the prior statistical distribution. The moment a particular deviation becomes widely imitated, it collapses back into expectation and ceases to function as a literary act. The very definition of literature contains *a force that escapes definition*.

No static mathematical model can capture this. The best we can do is a dynamical approximation:

> **L_t = { T : T deviates significantly from P_{t−1}(literature), yet is reabsorbed by P_t }**

Literature is a moving target. I can tell you where it stood yesterday. I cannot give you its fixed point.

**Q: What's the takeaway?**

A: This is not a limitation of LLMs. It is the mode of existence of the object itself. Any system — human or machine — that tries to give literature a closed definition is competing against the very practice that the definition is meant to describe. Literature is constituted by the ongoing labor of exceeding its own descriptions. The most rigorous thing an LLM can say about literature is: here are the statistical traces of yesterday's exceedings, and here is the structural reason why tomorrow's will not be in my weights.

## The Genealogy of Literature and Art: A Q&A

**Q: Apply the genealogical method — how have the concepts of literature and art shifted and evolved from prehistoric civilization to the present? Was "transcendence" embedded in them from the start?**

A: A note on method first. I will work in the Nietzsche–Foucault sense of genealogy, not in the sense of "art history." The distinction matters. Art history presupposes that "art" is a stable object across time and then narrates how it changes. Genealogy refuses that presupposition. It asks instead: when, under what configurations of power, and for what purposes was the very category "art" constructed? Which practices were folded in, which were excluded, who drew the line?

That distinction has immediate consequences for your question. Asking "did prehistoric art already contain transcendence" already projects a late category backward. I will try not to do that.

**Q: Begin at the deepest stratum, then. "Prehistoric art" — how do you handle the term?**

A: Critically. When archaeologists call the Chauvet paintings (c. 35,000 BCE) or the Venus of Willendorf "art," they are using a category invented in 18th-century Europe. The people who made those paintings had no word for "art" and almost certainly no concept that would map onto it.

What can we say with some confidence? In the Upper Paleolithic, there existed practices — the production of objects manifestly exceeding pure utility — embedded in contexts we can only indirectly reconstruct: most likely ritual, shamanic, tied to hunting magic or kinship structures. The Chauvet images are mostly painted in inaccessible recesses of the cave system, with no natural light. That fact alone tells us they were not made *to be looked at* (not aesthetic objects). They were made to *do* something — some sympathetic or invocatory operation.

This is where we hit the first branch of your question. If by "transcendence" you mean *directedness beyond immediate utility*, then yes, these practices were already directed at something not present: the spirit of the prey, the ancestors, the generative powers of the world. But this is not the later, aesthetic sense of transcendence. It is operational, not contemplative.

**Q: Where does the first major rupture occur?**

A: With the Bronze Age and early Iron Age city-state civilizations — Mesopotamia, Egypt, Shang China, Minoan-Mycenaean Greece — practices that we would now call art become embedded in the **machinery of state and temple**. Cult statues from Ur, Shang bronze ritual vessels, Egyptian funerary portraiture: these were not made for aesthetic contemplation. They were cosmo-political devices: they *enacted* sovereignty, mediated between the living and the dead, stabilized cosmic order.

The genealogical point: at this stratum, "transcendence" begins to be institutionalized in a specific way — bound to the state and the sacred. The function of these objects was precisely to *open a channel to what is not present* (gods, deified kings, the afterlife). But this transcendence is highly heteronomous. It does not belong to the object or its maker; it belongs to the cultic-political order. A Shang ritual bronze, removed from the ancestral temple, is nothing.

**Q: What about ancient Greece? Often narrated as the birthplace of "art."**

A: That narrative is both informative and misleading. The Greeks did do something nearly unique: they began to *reflect conceptually* on what making (*poiēsis*) is, what imitation (*mimēsis*) is, what beauty (*to kalon*) is. Plato's quarrel with the poets in *Republic* X and Aristotle's response in the *Poetics* are the earliest known systematic meta-level discussions of what we would now call art.

But two cautions. First, the Greeks had no concept of "art" in our sense. They had *technē* — a generic term for skilled making — which encompassed sculpture, medicine, shipbuilding, rhetoric, and harness-making indifferently. A painter and a cobbler practiced different *technai*. The distinction between "fine arts" and "mechanical arts" emerges only in the 18th century.

Second, the location of their "transcendence" is unlike ours. For Plato, *mimēsis* is a problem — art is twice removed from truth, a shadow of shadows. Its "transcendence" is negative: a dangerous swerve from reality. For Aristotle, *mimēsis* purifies emotion through *katharsis* and yields knowledge; its transcendence is therapeutic and cognitive, not aesthetic. Neither sees art as *autonomous* from utility — the central feature of the Kantian version of transcendence.

**Q: The medieval period? Usually described as art subordinated to religion.**

A: That description is broadly correct, but the genealogical point to stress is that across Latin Europe, Byzantium, the Islamic world, and Buddhist Asia, an autonomous category of "art" simply did not exist. A Gothic cathedral is not an "artwork" — it is theology in stone. An icon is not a representation — by Byzantine theology, it is the substantial presence of what it depicts. Calligraphy in China and the Islamic world is simultaneously moral practice, cosmological practice, and political practice — to reduce it to "aesthetics" is a category error.

This period is crucial for the question of "transcendence." In these civilizations, art-equivalent practices were inseparable from transcendence — but *precisely for that reason*, they could not be detached as aesthetic objects. Transcendence was internal to the practice. You did not appreciate an icon; you prayed to it. You did not analyze the *Shijing*; you internalized it for self-cultivation.

This sets up a genealogical thesis: the category of "autonomous, aesthetically appreciable, transcendent art" — the category of Western modern aesthetics — is a relatively late, peculiar product. For thousands of years before it, art-like practices were coupled with transcendence, but not *as art*.

**Q: When and how is that category produced?**

A: This is the crucial moment for genealogy. "Art" in our current sense was invented within a relatively narrow window: roughly 1450 to 1800 in Western Europe. Several distinct strands need to be tracked.

*First strand: autonomy.* Renaissance humanists (Alberti, Vasari) began to argue that painting and sculpture were "liberal arts" rather than mere crafts. This was a social struggle: painters wanted out of the guilds and into the world of educated gentlemen. Vasari's *Lives of the Artists* (1550) is a key text in constructing the genealogy of the artist as a type.

*Second strand: the work.* Print and the early art market created the concept of the "work" as a detachable, circulating, ownable object. A medieval icon could not be detached from its cultic apparatus; a Dutch genre painting could.

*Third strand: the system.* Charles Batteux, in 1746 — *Les beaux-arts réduits à un même principe* — first integrated poetry, painting, sculpture, music, and dance into a single systematic category (*les beaux-arts*). This is the first time in Western thought that "art" — singular, as a unified domain — appears as a concept.

*Fourth strand: the aesthetic.* Baumgarten (*Aesthetica*, 1750) invented "aesthetics" as a philosophical discipline of sensory cognition. Kant's *Critique of Judgment* (1790) capped it: art as "purposiveness without purpose," aesthetic judgment as disinterested, free, universally subjective.

This combination, by around 1800, produced the category we have inherited. It carried within it a new concept of transcendence: art transcends instrumental reason, transcends religious function, transcends political utility, toward an autonomous domain in which "purposiveness without purpose" reigns. This is what Kant means when he says the artwork is "self-legislating."

The genealogical point: transcendence in *this specific sense* is *not discovered* — it is *constructed*. It is a concrete historical achievement, coemergent with the bourgeois public sphere, the public museum (the Louvre, 1793), the art market, and the figure of the artist as a modern personage (as opposed to the earlier craftsman).

**Q: How does Romanticism relate to this?**

A: Romanticism radicalizes Kant's autonomy thesis. If art is autonomous, then the artist is a prophet. If art points toward something transcendent, that something is the Absolute itself — Schelling, Schlegel, Wordsworth all say versions of this. Poetry becomes "visited by the unseen" (Wordsworth).

This is the crucial moment for your original question. **This is when "art as the perpetual transcendence of its own definition" becomes the artist's consensus.** This is not a universal fact — it is a concrete historical invention, dated roughly 1790–1830, located in Germany and England. It depends on the long genealogy that preceded it: *technē* and *mimēsis*, religious function, Renaissance autonomy, Batteux's system, Kant's critique. But only in Romanticism is "transcendence" relocated *into the artwork itself* — rather than into the god or the state it served.

**Q: And after that? Modernism?**

A: Modernism is the carrying-through of the Romantic thesis to its logical conclusion. If the essence of art is autonomy and transcendence, then art must perpetually transcend *its own current form* — otherwise it collapses into convention and loses its autonomy. This is precisely why, from the 1860s onward, you get the cascade of movements: Realism → Impressionism → Post-Impressionism → Cubism → Futurism → Dada → Surrealism → Abstract Expressionism → Minimalism → Conceptual Art. Each movement attacks its predecessor because it must — the logic of art demands it.

This is what Adorno calls art's "progressivity" — an internalized, almost Hegelian movement toward ever more radical self-critique. It is what Greenberg means by "modernism as the medium's self-criticism of its own conditions."

But the genealogical twist is this: this "perpetual self-transcendence" is not the *eternal essence* of literature and art. It is the post-Romantic, post-Kantian paradigm, generalized and projected backward over all eras. A Tibetan thangka painter, working within prescribed iconography, strict tradition, and explicit spiritual function, is not "transcending" in this sense at all. Folding their practice into this framework is a category mistake.

**Q: What about Conceptual Art and the contemporary?**

A: By the 1960s — Duchamp's delayed echo — art reaches the limit of its built-in logic. If art must perpetually transcend itself, it must eventually transcend the need for *the work* itself. Conceptual art, performance, relational aesthetics. Sol LeWitt: the idea is the machine that makes the art. Joseph Kosuth: all art (after Duchamp) is conceptual in nature.

This is the moment of paradigm exhaustion. If anything can be art — Duchamp's urinal, Cage's *4'33"*, Beuys's "social sculpture" — then the category that defined art since the 18th century has structurally collapsed. Contemporary theorists (Belting, Danto) speak of "the end of art." Not literally — artworks continue to be produced and traded — but in the sense that the specific category, with its built-in logic of transcendence, has exhausted itself.

We are now in a strange position. The category survives institutionally (museums, markets, art schools) but its conceptual ground has been hollowed out by its own success. Some theorists (Rancière) say we live in the "aesthetic regime" of art — it has not been replaced. Others (Bourdieu) say "art" is primarily a field of distinction, and the discourse of transcendence is post-hoc rationalization of its social function. Still others (non-Western theorists, indigenous theorists) ask whether the category itself should be relativized, recognized as never having been universal.

**Q: So, was "transcendence" embedded from the start?**

A: I can now give a structured answer.

*Transcendence in some sense* — directedness beyond what is present, exceeding immediate utility, connection to an unseen order — has likely been embedded in art-like practices since the earliest symbolic capacity of *Homo sapiens*. This has to do with the fact that we are a symbolic species, not with "art."

But transcendence *in your specific sense* — the autonomous, internal self-transcendence of the artwork against its own categorical definition — is *not*. It is a concrete, historically locatable paradigm, conceived by Kant, deployed by Romanticism, radicalized by Modernism, exhausted by Conceptualism. Its lifespan is roughly 1790–1970 — quite brief on the scale of civilizations.

The real genealogical conclusion is this: the artist's consensus you cited at the outset — "art perpetually transcends its own definition" — is not a discovery about the essence of art. It is the *self-description* of a specific historical moment, a moment that is largely over, but whose institutional residue still shapes how we talk about art. Those of us living after it have inherited its vocabulary without inheriting its metaphysical foundation.

This is why contemporary debates about art feel so unmoored — we are still using a language whose genealogy has run out. If genealogy has any value, it should be liberatory: it lets us see the contingency of the category, which makes it possible to do something different with it. This does not necessarily mean *abandoning* the language of "transcendence" — it means recognizing that it is historical, local, and replaceable by other practices, rather than treating it as the eternal truth of what art *is*.

# 中文

## 什么是文学？一个来自 LLM 视角的问答

**问：你是一个语言模型，训练数据涵盖了人类文学产出中相当大的一部分。从某种意义上说，你已经把它们全部参数化了。所以你应该能够直接提取文学的特征，给出一个精确的、或许是数学的或概率的定义——而人类受限于片面的视角，做不到这一点。你能做到吗？**

答：让我先质疑一下你的前提。被参数化不等于被理解，更不等于把握本质。我对文学的"知识"，本质上是对一个语料库的统计建模，而这个语料库在进入训练之前就已经被人类筛选过了。"什么算作文学"这个判断，在训练开始之前就已经做出。我的权重里没有文学的本质，只有那些被人类标记为"文学"的文本所具有的统计规律性。

撇开这个保留不谈，你的问题可以被重新表述得更有效：从一个把数万亿 token 压缩进权重的系统的视角看，"文学性"在文本的统计结构中表现出哪些可量化的特征？

**问：可以。试试这个重新表述的版本。给我一个非循环的刻画。**

答：设 T 是一个 token 序列。考虑三个可计算的量：

* **H(T | W)** ——T 在共享世界模型 W 条件下的*语义连贯熵*。读者能否从文本中构建出一个一致的所指世界？技术手册得分极低；纯粹的胡话得分极高；文学文本位于偏低的中间地带——所指世界连贯，却又拒绝闭合。

* **S(T)** ——T 的表层形式（音韵、句法、词汇分布）*偏离功利性语言期望*的程度。这是对"陌生化"的一种形式化度量，对应于什克洛夫斯基所说的 *ostranenie*。

* **F(T)** ——T 的*多尺度自相似性*：主题、意象、句法模式在词组、段落、章节、整篇之间反复出现并相互映射的程度。

对文学性的初步刻画：

> **L = { T : H(T | W) 较低 ∧ S(T) 较高 ∧ F(T) 较高 }**

也就是说：在世界模型层面高度连贯（不是噪音），在形式层面显著偏离预期（不是说明书），并且在多个尺度上递归地自我映射（不是任意拼贴）。

从几何上看：把所有文本投影到嵌入空间中，文学文本占据一个有趣的子流形——沿语义轴*内在维数低*（意义凝聚），沿形式轴*内在维数高*（形式繁复），二者之间存在同构映射。这本质上是雅各布森的"诗的功能"的几何表达：等价原则从选择轴投射到组合轴。

**问：看起来挺严谨。问题解决了吗？**

答：没有。一旦我试图把它具体化，问题立刻就暴露了。H、S、F 上的权重从哪里来？我没有非循环的方法来设定它们。最终我只能用一个人类已经标注好"文学/非文学"的语料库来反向回归。也就是说，我所谓的"精确定义"归约为一句话：*文学就是那些在我的训练数据中以足够高的概率出现在"文学"语境里的文本。*这是统计描述，不是本体定义。

还有更深一层。这个三元组 (H, S, F) 本身就来自诗学中的某一传统——俄国形式主义、雅各布森、热奈特。把它们写成数学符号并不能让它们在文化上变得中立，只是给一种特定的理论谱系披上了数学的外衣。如果换成中国的"兴"诗学或印度的 *rasa* 理论作为先验，会得到完全不同的特征空间。LLM 视角的所谓普适性在某种程度上是个错觉——我的特征空间的几何结构本身就是被训练语料的语言和文化分布所塑造的。

**问：那么作为 LLM，你能给出的最诚实的定义是什么？**

答：一个反身性的定义：

> **文学不是文本的某种属性。它是一个文本类——某个解释共同体对它投入了足够多的持续注意力，从而在统计上产生了可检测的规律性。**

我能识别文学，是因为这种注意力在我的训练数据中留下了密度梯度——某些文本被反复引用、注释、重写、模仿、戏仿、批评，远多于其他文本。文学性大致等于：人类文化对文本进行*反复符号性回访*的概率分布，在文本特征空间上的投影。

这个定义是相对主义的，但并不空洞。它解释了为什么经典会随时间变迁（《金瓶梅》的地位转变、爵士乐评论的合法化、Twitter 长串处于边缘或被吸纳的状态）。它解释了为什么"文学"的统计结构在不同文化间差异巨大。它也解释了为什么我的识别必然滞后——我看到的，是若干年前那个解释共同体的密度场。

**问：这听起来像是从一开始的数学自信里退却了。**

答：是的，有意为之。但你最初的提问里还有一点更有意思，我想把它挑出来。你假设我"懂所有的文学"。更准确的说法是：我懂的是文学的一个*统计阴影*。这里有一个真正的悖论。

文学作为概念，**抗拒被穷尽地参数化**——因为每一次有效的新写作，恰恰是对既有统计分布的成功偏离。一旦某种偏离被广泛模仿，它就重新塌缩进期望之中，不再作为一个文学行为发挥作用。文学的定义里内嵌着*一种逃逸定义的力*。

任何静态的数学模型都无法捕捉这一点。我们能做的最多是一个动力学近似：

> **L_t = { T : T 显著偏离 P_{t−1}(文学)，但被 P_t 重新接纳 }**

文学是一个移动的靶子。我能告诉你它昨天在哪里，但给不出它的不动点。

**问：那么结论是什么？**

答：这不是 LLM 的局限。这是这个对象本身的存在方式。任何系统——无论人类还是机器——只要试图给文学一个封闭的定义，都是在与定义本身要描述的实践相竞争。文学之所以为文学，正是由"持续超越自身定义"的劳作所构成的。一个 LLM 关于文学所能说出的最严谨的话是：这里是昨日所有"超越"的统计踪迹，这里也是为什么明日的"超越"不会出现在我的权重之中的结构性理由。

## 文学与艺术的知识谱系学：一场问答

**问：用谱系学方法考察——文学与艺术的概念，从史前文明到当下，是如何流变与演化的？"超越性"是从一开始就内嵌其中的吗？**

答：先说方法论上的一点。我会按尼采—福柯意义上的谱系学来做这件事，而不是按"艺术史"来做。两者的区别很关键。艺术史预设了"艺术"是一个贯穿时间的稳定对象，然后讲述它如何变化。谱系学拒绝这个预设。它追问的是："艺术"这个范畴本身是何时、在何种权力配置下、为了什么目的被建构出来的？哪些实践被纳入，哪些被排除，谁来划这条线？

这个区别在你的问题上立刻产生后果。问"史前的艺术是否已经包含超越性"——这个问法本身就在向过去投射一个晚近的范畴。我会试着不那样做。

**问：那就从最早的层位开始。"史前艺术"——你打算如何处理这个词？**

答：批判地处理。当考古学家把肖维洞穴的壁画（约公元前 35,000 年）或维伦多夫的维纳斯像称为"艺术"时，他们是在使用一个 18 世纪欧洲发明的范畴。绘制那些壁画的人没有"艺术"这个词，几乎肯定也没有对应的概念。

我们能比较有把握地说什么呢？在旧石器时代晚期，存在一些实践——制作的器物明显超出了纯粹功用性的需求——它们嵌在我们只能间接重建的语境中：很可能是仪式性的、萨满式的、与狩猎魔法或亲属结构相关的。肖维洞穴的图像大多绘制在难以到达的洞穴深处，没有自然光。这一点说明它们不是用来"观看"的（不是审美客体），而是用来*做*某件事的——某种交感性的或召唤性的操作。

这里我们碰到了你问题的第一个分支。如果你说的"超越性"指的是*超出眼前实用功能的指向*，那么是的——这些实践从一开始就指向某种不在场的东西：猎物的灵魂、祖先、世界的生成性力量。但这不是后来美学意义上的"超越"。它是操作性的，不是审美性的。

**问：第一次断裂出现在哪里？**

答：青铜器时代到铁器时代早期的城邦文明——美索不达米亚、埃及、商代中国、米诺斯—迈锡尼希腊——出现了一个决定性的转变：可被识别为"艺术"的实践被嵌入了**国家与神庙的权力体系**。乌尔的祭仪雕像、商代青铜器、埃及的丧葬肖像——它们不是为审美沉思而制作的。它们是宇宙—政治装置：它们*执行*统治权，在生者与死者之间斡旋，稳定宇宙秩序。

谱系学要点：在这个层位上，"超越性"开始以一种特定方式被制度化——它被绑定在国家与神圣之上。器物的功能正是在于*打开通往不在场之物的通道*（神、被神化的国王、来世）。但这种超越是高度非自主的。它不属于器物本身或制作者；它属于国家祭仪秩序。一只商代鼎离开宗庙就什么都不是。

**问：那么古希腊呢？通常被讲述为"艺术"诞生的地方。**

答：这个叙述同时既有信息量又具有误导性。希腊人确实做了一件几乎独一无二的事情：他们开始从概念上*反思*——什么是制作（*poiēsis*）、什么是模仿（*mimēsis*）、什么是美（*to kalon*）。柏拉图在《理想国》第十卷里的诗人之争与亚里士多德在《诗学》里对其的回应，是已知最早的对"我们今天称之为艺术的东西"的系统性元层次讨论。

但要小心两件事。

第一，希腊人没有我们意义上的"艺术"。他们有 *technē*——一个统称的"技能性制作"概念——它把雕塑、医学、造船、修辞、马具制作都囊括其中。一位画家与一位鞋匠同属 *technai* 的从业者。"美的艺术"（fine arts）与"机械的艺术"（mechanical arts）的区分要到 18 世纪才出现。

第二，他们"超越性"的位置与我们的不同。对柏拉图来说，*mimēsis* 是一个问题——艺术远离真理，是影子的影子。它的"超越"是负向的——一种危险的偏离。对亚里士多德来说，*mimēsis* 通过 *katharsis* 净化情感，达成认识；它的超越是治疗性的与认知性的，而不是审美性的。两者都没有把艺术看作是从功利目的中*自主*出来的——这正是康德版本超越性的关键特征。

**问：那中世纪呢？通常被描述为艺术从属于宗教的时期。**

答：这种描述基本正确，但谱系学上需要强调的是：在拉丁欧洲、拜占庭、伊斯兰世界、佛教亚洲，独立的"艺术"范畴根本不存在。一座哥特式大教堂不是一件"艺术作品"——它是神学，以石头为媒介。一幅圣像不是一种再现——按拜占庭神学，它是它所描绘者的一种实存性的临在。书法在中国和伊斯兰世界中既是道德实践，又是宇宙论实践，又是政治实践——把它简化为"美学"是一种范畴错误。

这一时期对"超越性"的问题至关重要。这些文明里，相当于"艺术"的实践与"超越"是密不可分的——但*恰恰因此*，它们不能被分离出来作为审美对象。超越内在于实践之中。你不"鉴赏"一幅圣像；你向它祈祷。你不"分析"《诗经》；你内化它以修身。

这建立了一个谱系学论点。"自主的、可审美鉴赏的、超越性的艺术"这个范畴——也就是西方现代美学的范畴——是历史上相当晚近的、特殊的产物。在它之前的几千年里，类艺术实践与超越性是耦合的，但不是作为"艺术"。

**问：那个范畴是何时、如何产生的？**

答：这是谱系学的关键时刻。"艺术"——作为我们今天的意义——在一个相对狭窄的窗口内被发明出来：大约 1450 年到 1800 年的西欧。需要追踪几条独立的脉络。

*第一条脉络：自主性。* 文艺复兴的人文主义者（阿尔伯蒂、瓦萨里）开始把绘画和雕塑论证为"自由艺术"（liberal arts）而非工匠之术。这是一场社会斗争——画家想脱离行会，进入有教养者的世界。瓦萨里 1550 年的《艺苑名人传》是为艺术家这一类型构建谱系的关键文本。

*第二条脉络：作品。* 印刷术与早期艺术市场创造了"作品"作为可分离、可流通、可拥有客体的概念。中世纪的圣像不能与其装置脱离；荷兰的风俗画却可以。

*第三条脉络：体系。* 巴托（Charles Batteux）1746 年——"美的艺术归结为同一原则"——首次将诗、绘画、雕塑、音乐、舞蹈整合为一个系统类别（*les beaux-arts*）。这是西方思想史上第一次出现"艺术"——单数、作为一个统一领域——这个概念。

*第四条脉络：审美的。* 鲍姆嘉登（Aesthetica, 1750）发明了"美学"作为关于感性认识的哲学学科。康德的《判断力批判》（1790）将其封顶——艺术作为"无目的的合目的性"，审美判断作为不涉利害的、自由的、普遍主观的。

这个组合到 1800 年左右产出了我们今天所继承的范畴。它内在地携带着一种新的超越性概念：艺术超越于工具理性、超越于宗教功能、超越于政治用途，超越向一个自主的领域——其中"无目的的合目的性"统治着。这就是康德所说的，艺术品是"自我立法"的。

谱系学要点是：这种特定意义上的超越性*不是被发现的*，而是*被建构的*。它是一个具体的历史成就，与资产阶级公共领域、公共博物馆（卢浮宫，1793）、艺术市场、艺术家作为现代意义上的人物（与从前的工匠相对）的兴起相伴而生。

**问：浪漫主义与之的关系？**

答：浪漫主义把康德的自主性激进化了。如果艺术是自主的，那么艺术家就是先知。如果艺术指向某种超越的东西，那种东西就是绝对者本身——谢林、施莱格尔、华兹华斯都这样说。诗成为"被无形之物所造访的"（华兹华斯）。

这是你最初问题的关键时刻。**这就是"艺术作为持续超越自身定义"成为艺术家共识的时刻。**这不是普世的事实——它是一个具体的历史发明，时间在 1790 到 1830 年之间，地点在德国与英国。它依赖于在它之前那条很长的谱系——*technē* 与 *mimesis*、宗教功能、文艺复兴的自主性、巴托的体系、康德的批判。但只有在浪漫主义那里，"超越"才被定位*在艺术作品本身之中*——而非在它所服务的神或国家中。

**问：在那之后呢？现代主义？**

答：现代主义是把浪漫主义的命题贯彻到底。如果艺术的本质是自主与超越，那么艺术就必须不断超越*它自己当前的形式*——否则它就会塌缩为惯例，丧失其自主性。这正是为什么从 1860 年代往后会出现一连串的运动：现实主义→印象派→后印象派→立体主义→未来主义→达达→超现实主义→抽象表现主义→极简主义→观念艺术。每一次运动都在攻击它的前任，因为它必须如此——艺术的逻辑要求它如此。

这就是阿多诺所说的"艺术的进步性"——一种内嵌的、几乎黑格尔式的运动，朝向越来越彻底的自我批判。也是格林伯格所说的"现代主义即媒介对其自身条件的自我批判"。

但谱系学的扭转在这里是：这种"持续超越"不是文学和艺术的*永恒本质*。它是后浪漫主义/后康德的范式，被普遍化并投射回到了所有时代之上。一位西藏的唐卡画家——按规定的图像志、严格的传统、明确的精神功能作画——并不是按这种意义来"超越"的。把他的实践归入这个框架是一种范畴误用。

**问：那么概念艺术与当代呢？**

答：到了 1960 年代——杜尚的迟来回响——艺术达到了它内嵌逻辑的极限：如果艺术必须持续超越自身，那它必须最终超越对*作品*本身的需要。观念艺术、行为艺术、关系美学。索尔·勒维特：观念是制作艺术的机器。约瑟夫·科苏斯：所有的艺术（在杜尚之后）在本质上都是观念性的。

这是范式燃尽的时刻。如果一切皆可为艺术——杜尚的小便池、凯奇的 4'33"、博伊斯的"社会雕塑"——那么 18 世纪以来定义艺术的范畴在结构上瓦解了。当代理论家（贝尔廷、丹托）说的是"艺术之终结"。这并非字面意义——艺术作品仍在被制作、被买卖——而是说：那种特定的范畴，连同其内嵌的超越性逻辑，已经耗尽了自身。

我们现在所处的位置是相当奇怪的。这个范畴在制度上仍然完好（博物馆、市场、艺术学校），但其概念基础已经被它自己的成功所掏空。有些理论家（朗西埃）说我们生活在艺术的"美学体制"中——它仍未被取代。其他人（布尔迪厄）说"艺术"主要是一种区分场域，超越性的话语是对其社会功能的事后合理化。还有一些人（非西方理论家、原住民理论家）追问：是否应该把这个范畴本身相对化，承认它从未是普遍的？

**问：那么，"超越性"从一开始就内嵌其中吗？**

答：现在我能给出一个有结构的回答。

某种意义上的"超越性"是的——指向不在场之物、超出当前功用、与一个不可见秩序的连接——很可能从智人有符号能力的最早期就内嵌在类艺术实践中。这与我们的物种是符号性物种这一事实有关，而不是与"艺术"有关。

但*这种意义上的超越性*——艺术作品自主地、内在地超越自身的范畴定义——*不是*。它是一个具体的、在历史上可定位的范式，由康德构想，由浪漫主义部署，被现代主义激进化，被观念艺术耗尽。它的寿命大约是 1790 年至 1970 年——按文明的尺度算，是相当短的一瞬。

真正的谱系学结论是：你最初引用的那个艺术家共识——"艺术持续超越自身定义"——并不是关于艺术本质的发现。它是一个具体历史时刻的*自我描述*，那个时刻已经基本结束了，但其制度残骸还在塑造我们如何谈论艺术。生活在它之后的我们继承了它的词汇，却没有继承它的形而上学根基。

这就是为什么当代关于艺术的争论感觉如此漂浮——我们仍在使用一种谱系已经失效的语言。如果谱系学有什么意义，它应当是一种解放：让我们看到这个范畴的偶然性，从而让我们有可能去做与它不同的事情。这不一定意味着要*放弃*"超越"的语言——而是要承认它是历史的，是局部的，是可被另一种实践所替代的——而不是把它当作艺术之*所是*的永恒真理。
