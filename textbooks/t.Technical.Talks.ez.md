---
title: Technical Talks
layout: post-vertical
categories: Notes
subclass: Software Engineering
---

## No Silver Bullet — Essence and Accident in Software Engineering

*Frederick P. Brooks, Jr.*  University of North Carolina at Chapel Hill[^1]

小弗雷德里克·P. 布鲁克斯，北卡罗来纳大学教堂山分校

> *There is no single development, in either technology or management technique, which by itself promises even one order-of-magnitude improvement within a decade in productivity, in reliability, in simplicity.*

> *无论是技术还是管理方法，都没有哪一项单独的发展，能够独力承诺在十年内使软件的生产率、可靠性或简洁性提高一个数量级。*

### Abstract / 摘要

All software construction involves essential tasks, the fashioning of the complex conceptual structures that compose the abstract software entity, and accidental tasks, the representation of these abstract entities in programming languages and the mapping of these onto machine languages within space and speed constraints. Most of the big past gains in software productivity have come from removing artificial barriers that have made the accidental tasks inordinately hard, such as severe hardware constraints, awkward programming languages, lack of machine time. How much of what software engineers now do is still devoted to the accidental, as opposed to the essential? Unless it is more than 9/10 of all effort, shrinking all the accidental activities to zero time will **NOT** give an order-of-magnitude improvement.

所有软件构建都包含两类任务：本质性任务，即塑造构成抽象软件实体的复杂概念结构；附属性任务，即用编程语言表示这些抽象实体，并在空间和速度的约束下，将其映射为机器语言。过去软件生产率的大幅提高，大多来自消除人为障碍，例如严苛的硬件限制、难用的编程语言，以及机时不足。这些障碍让附属性任务变得异常困难。软件工程师如今所做的工作，还有多少用于附属性任务，而非本质性任务？**除非附属性任务占全部工作量的九成以上，否则即使把这些活动的耗时降到零，也无法使生产率提高一个数量级。**

Therefore it appears that the time has come to address the essential parts of the software task, those concerned with fashioning abstract conceptual structures of great complexity. I suggest:

因此，看来我们已经到了必须正视软件任务本质部分的时候，也就是塑造高度复杂的抽象概念结构。我提出以下建议：

- Exploiting the mass market to avoid constructing what can be bought.

  利用大众市场，能买到的软件就不要自行构建。

- Using rapid prototyping as part of a planned iteration in establishing software requirements.

  在确定软件需求时，将快速原型纳入有计划的迭代过程。

- Growing software organically, adding more and more function to systems as they are run, used, and tested.

  让软件有机生长，在系统运行、使用和测试的过程中，不断增添功能。

- Identifying and developing the great conceptual designers of the rising generation.

  发现并培养新一代卓越的概念设计者。

### Introduction / 引言

Of all the monsters who fill the nightmares of our folklore, none terrify more than werewolves, because they transform unexpectedly from the familiar into horrors. For these, we seek bullets of silver that can magically lay them to rest.

在民间传说中那些让人噩梦连连的怪物里，没有什么比狼人更可怕，因为它会出人意料地从熟悉的模样变成恐怖之物。对付这种怪物，我们总想找到能够施展魔力、将它一举消灭的银弹。

The familiar software project has something of this character (at least as seen by the non-technical manager), usually innocent and straightforward, but capable of becoming a monster of missed schedules, blown budgets, and flawed products. So we hear desperate cries for a silver bullet, something to make software costs drop as rapidly as computer hardware costs do.

我们熟悉的软件项目也有些类似，至少在非技术背景的管理者眼中如此：它通常看起来无害而简单，却可能变成一个进度拖延、预算超支、产品漏洞百出的怪物。于是，我们听到人们急切地呼唤银弹，希望有什么办法能让软件成本像计算机硬件成本那样迅速下降。

But, as we look to the horizon of a decade hence, we see no silver bullet. **There is NO single development, in either technology or management technique, which by itself promises even one order-of-magnitude improvement in productivity, in reliability, in simplicity.** In this chapter we shall try to see why, by examining both the nature of the software problem and the properties of the bullets proposed.

然而，展望未来十年，我们看不到银弹。**无论是技术还是管理方法，都没有哪一项单独的发展，能够独力承诺使生产率、可靠性或简洁性提高一个数量级。**本章将同时考察软件问题的本性，以及人们提出的各种“银弹”的特性，尝试解释其中的原因。

Skepticism is **NOT** pessimism, however. Although we see no startling breakthroughs, and indeed, believe such to be inconsistent with the nature of software, many encouraging innovations are under way. A disciplined, consistent effort to develop, propagate, and exploit them should indeed yield an order-of-magnitude improvement. *There is no royal road, but there is a road.*

不过，怀疑**不等于**悲观。尽管我们看不到惊人的突破，而且确实认为这类突破与软件的本性不符，但许多令人鼓舞的创新正在发生。只要以严谨而持之以恒的努力去发展、推广和应用这些创新，就应当能够使生产率提高一个数量级。*没有康庄捷径，但仍有路可走。*

The first step toward the management of disease was replacement of demon theories and humours theories by the germ theory. That very step, the beginning of hope, in itself dashed all hopes of magical solutions. It told workers that progress would be made stepwise, at great effort, and that a persistent, unremitting care would have to be paid to a discipline of cleanliness. So it is with software engineering today.

人类控制疾病的第一步，是以病菌学说取代鬼神致病说和体液学说。这一步开启了希望，却也打破了对神奇疗法的一切幻想。它告诉人们：进步只能一步一步取得，必须付出巨大努力，并始终不懈地遵守清洁卫生的规范。今天的软件工程也是如此。

### Does It Have to Be Hard? — Essential Difficulties / 软件非得这么难吗？本质性困难

Not only are there no silver bullets now in view, the very nature of software makes it unlikely that there will be any—no inventions that will do for software productivity, reliability, and simplicity what electronics, transistors, and large-scale integration did for computer hardware. We cannot expect ever to see twofold gains every two years.

不仅眼下看不到银弹，软件本身的性质也使银弹不太可能出现：不会有什么发明，能像电子技术、晶体管和大规模集成电路之于计算机硬件那样，提升软件的生产率、可靠性和简洁性。我们不能指望软件也能每两年就取得翻倍的进步。

First, we must observe that the anomaly is **NOT** that software progress is so slow **BUT** that computer hardware progress is so fast. No other technology since civilization began has seen six orders of magnitude price-performance gain in 30 years. In no other technology can one choose to take the gain in either improved performance or in reduced costs. These gains flow from the transformation of computer manufacture from an assembly industry into a process industry.

首先，我们必须看到，反常的**不是**软件进步太慢，**而是**计算机硬件进步太快。自文明诞生以来，没有其他技术能在三十年内让性价比提高六个数量级；也没有其他技术能让人自由选择，将收益体现为性能提高，还是成本降低。这些进步源于计算机制造从装配型工业转变为流程型工业。

Second, to see what rate of progress we can expect in software technology, let us examine its difficulties. Following Aristotle, I divide them into essence—the difficulties inherent in the nature of the software—and accidents—those difficulties that today attend its production but that are not inherent.

其次，要判断软件技术有望以怎样的速度进步，我们需要考察它面临的困难。沿用亚里士多德的区分，我把困难分为两类：本质性的，即软件本性固有的困难；附属性的，即目前伴随软件生产而存在、却并非软件所固有的困难。

The accidents I discuss in the next section. First let us consider the essence.

附属性困难将在下一节讨论。先来看本质性困难。

The essence of a software entity is a construct of interlocking concepts: data sets, relationships among data items, algorithms, and invocations of functions. This essence is abstract, in that the conceptual construct is the same under many different representations. It is nonetheless highly precise and richly detailed.

软件实体的本质，是由相互联结的概念构成的结构：数据集、数据项之间的关系、算法，以及函数调用。这一本质是抽象的，因为无论采用哪一种表示方式，其概念结构都保持不变。但它同时又极为精确，包含丰富的细节。

**I believe the hard part of building software to be the specification, design, and testing of this conceptual construct, NOT the labor of representing it and testing the fidelity of the representation.** We still make syntax errors, to be sure; but they are fuzz compared to the conceptual errors in most systems.

**我认为，构建软件的难点，在于对这种概念结构进行规格说明、设计和测试，而不在于把它表示出来，再检验这种表示是否忠实。**我们当然仍会犯语法错误，但与大多数系统中的概念错误相比，那些错误不过是细枝末节。

If this is true, building software will always be hard. There is inherently **NO SILVER BULLET**.

如果这个判断成立，构建软件就永远是困难的。从本质上说，**没有银弹**。

Let us consider the inherent properties of this irreducible essence of modern software systems: **complexity, conformity, changeability, and invisibility**.

下面考察现代软件系统这种无法再化约的本质所具有的四项固有属性：**复杂性、顺应性、可变性和不可见性**。

#### Complexity / 复杂性

Software entities are more complex for their size than perhaps any other human construct, because no two parts are alike (at least above the statement level). If they are, we make the two similar parts into one, a subroutine, open or closed. In this respect software systems differ profoundly from computers, buildings, or automobiles, where repeated elements abound.

相对于自身规模而言，软件实体或许比人类创造的其他任何东西都更复杂，因为其中没有两个部分完全相同，至少在语句以上的层次是如此。如果两个部分相同，我们就会把它们合并为一个子程序，无论是展开式的还是调用式的。在这一点上，软件系统与计算机、建筑或汽车有着根本差异，后者包含大量重复构件。

Digital computers are themselves more complex than most things people build; they have very large numbers of states. This makes conceiving, describing, and testing them hard. Software systems have orders of magnitude more states than computers do.

数字计算机本身就比人类制造的大多数东西更复杂，因为它具有极多的状态。这使得构思、描述和测试计算机都很困难。而软件系统的状态数量，又比计算机多出若干个数量级。

Likewise, a scaling-up of a software entity is not merely a repetition of the same elements in larger size; it is necessarily an increase in the number of different elements. In most cases, the elements interact with each other in some nonlinear fashion, and the complexity of the whole increases much more than linearly.

同样，扩大软件实体的规模，并不只是把相同元素重复堆叠起来；它必然意味着不同元素的数量增加。多数情况下，这些元素以某种非线性的方式相互作用，因此整体复杂性的增长远超线性。

The complexity of software is an **ESSENTIAL** property, **NOT** an accidental one. Hence descriptions of a software entity that abstract away its complexity often abstract away its essence. Mathematics and the physical sciences made great strides for three centuries by constructing simplified models of complex phenomena, deriving properties from the models, and verifying those properties experimentally. This worked because the complexities ignored in the models were not the essential properties of the phenomena. **It does NOT work when the complexities are the essence.**

软件的复杂性是**本质属性，而非附属属性**。因此，在描述软件实体时，如果把复杂性抽象掉，往往也就把它的本质抽象掉了。过去三个世纪里，数学和物理科学取得巨大进步，依靠的是为复杂现象建立简化模型，从模型中推导性质，再用实验验证。这种方法之所以有效，是因为模型忽略的复杂性，并不是现象的本质属性。**当复杂性本身就是本质时，这种方法就不再奏效。**

Many of the classical problems of developing software products derive from this essential complexity and its nonlinear increase with size. From the complexity comes the difficulty of communication among team members, which leads to product flaws, cost overruns, schedule delays. From the complexity comes the difficulty of enumerating, much less understanding, all the possible states of the program, and from that comes the unreliability. From the complexity of the functions comes the difficulty of invoking those functions, which makes programs hard to use. From complexity of structure comes the difficulty of extending programs to new functions without creating side effects. From the complexity of structure comes the unvisualized states that constitute security trapdoors.

软件产品开发中的许多经典问题，都源于这种本质性的复杂性，以及它随规模扩大的非线性增长。复杂性使团队成员难以沟通，进而导致产品缺陷、成本超支和进度延误；复杂性使人难以穷举程序的所有可能状态，更不用说理解这些状态，由此产生不可靠性。功能的复杂性使功能难以调用，因而程序难以使用。结构的复杂性使人难以扩展新功能而不引入副作用，也使某些未被察觉的状态成为安全后门。

Not only technical problems but management problems as well come from the complexity. This complexity makes overview hard, thus impeding conceptual integrity. It makes it hard to find and control all the loose ends. It creates the tremendous learning and understanding burden that makes personnel turnover a disaster.

复杂性带来的不仅是技术问题，还有管理问题。它使人难以把握全局，妨碍概念完整性；使人难以发现并控制所有尚未处理妥当的细节；还带来沉重的学习和理解负担，让人员流动变成一场灾难。

#### Conformity / 顺应性

Software people are not alone in facing complexity. Physics deals with terribly complex objects even at the "fundamental" particle level. The physicist labors on, however, in a firm faith that there are unifying principles to be found, whether in quarks or in unified field theories. Einstein repeatedly argued that there must be simplified explanations of nature, because God is not capricious or arbitrary.

面对复杂性的并不只有软件从业者。物理学即使在“基本”粒子的层次，也要处理极为复杂的对象。不过，无论研究夸克还是统一场论，物理学家都坚信存在可以发现的统一原理，并据此继续探索。爱因斯坦反复强调，自然界必定存在简洁的解释，因为上帝不会反复无常，也不会任意行事。

No such faith comforts the software engineer. Much of the complexity he must master is arbitrary complexity, forced without rhyme or reason by the many human institutions and systems to which his interfaces must conform. These differ from interface to interface, and from time to time, not because of necessity but only because they were designed by different people, rather than by God.

软件工程师却没有这样的信念可以慰藉自己。他必须驾驭的复杂性，有很大一部分是任意造成的：软件接口必须适应各种人为的机构和系统，而它们施加的要求往往毫无道理。这些要求因接口而异，也随时间变化，并非出于必然性，仅仅因为它们是由不同的人设计的，而不是由上帝设计的。

In many cases the software must conform because it has most recently come to the scene. In others it must conform because it is perceived as the most conformable. But in all cases, much complexity comes from conformation to other interfaces; this **CANNOT** be simplified out by any redesign of the software alone.

许多时候，软件必须适应其他系统，只因为它是最后加入的；另一些时候，则因为人们认为软件最容易调整。但无论是哪一种情况，大量复杂性都来自对其他接口的适应。**仅靠重新设计软件本身，无法消除这种复杂性。**

#### Changeability / 可变性

The software entity is constantly subject to pressures for change. Of course, so are buildings, cars, and computers. But manufactured things are infrequently changed after manufacture; they are superseded by later models, or essential changes are incorporated in later serial-number copies of the same basic design. Recalls of automobiles are really quite infrequent; field changes of computers somewhat less so. Both are much less frequent than modifications to fielded software.

软件实体不断承受变更压力。建筑、汽车和计算机当然也一样，但制造出来的产品在出厂后很少改动：它们通常由后续型号取代，或者将实质性改进纳入同一基本设计的后续批次。汽车召回实际上并不常见，计算机的现场改装略多一些，但两者都远不如已投入使用的软件修改频繁。

Partly this is because the software in a system embodies its function, and the function is the part that most feels the pressures of change. Partly it is because software can be changed more easily—it is pure thought-stuff, infinitely malleable. Buildings do in fact get changed, but the high costs of change, understood by all, serve to dampen the whim of the changers.

一部分原因是，软件承载着系统的功能，而功能正是最容易感受到变更压力的部分。另一部分原因是，软件比较容易修改：它是纯粹的思想产物，似乎可以无限塑造。建筑也确实会被改动，但人人都明白改建的代价很高，这会抑制那些随心所欲的修改念头。

**All successful software gets changed.** Two processes are at work. As a software product is found to be useful, people try it in new cases at the edge of, or beyond, the original domain. The pressures for extended function come chiefly from users who like the basic function and invent new uses for it.

**所有成功的软件都会被修改。**这里有两个过程在起作用。首先，当一个软件产品被证明有用时，人们就会把它用于原定适用范围边缘、甚至范围之外的新情境。扩展功能的压力，主要来自喜欢其基本功能、并不断为它发现新用途的用户。

Second, successful software also survives beyond the normal life of the machine vehicle for which it is first written. If not new computers, then at least new disks, new displays, new printers come along; and the software must be conformed to its new vehicles of opportunity.

其次，成功软件的寿命，还会超过最初承载它的机器的正常使用寿命。即使没有换新计算机，至少也会出现新的磁盘、显示器和打印机；软件必须适应这些带来新机会的硬件载体。

In short, the software product is embedded in a cultural matrix of applications, users, laws, and machine vehicles. These all change continually, and their changes inexorably force change upon the software product.

总之，软件产品置身于由应用、用户、法律和硬件载体共同构成的文化环境中。这一切都在不断变化，而它们的变化必然迫使软件产品随之改变。

#### Invisibility / 不可见性

Software is invisible and unvisualizable. Geometric abstractions are powerful tools. The floor plan of a building helps both architect and client evaluate spaces, traffic flows, and views. Contradictions become obvious, omissions can be caught. Scale drawings of mechanical parts and stick-figure models of molecules, although abstractions, serve the same purpose. A geometric reality is captured in a geometric abstraction.

软件是不可见的，也无法被直接可视化。几何抽象是强有力的工具：建筑平面图帮助建筑师和客户评估空间、通行路线与视野，矛盾因此显而易见，遗漏也容易发现。机械零件的比例图和分子的棒状模型虽然也是抽象，却有着同样的作用：它们用几何抽象捕捉几何现实。

The reality of software is not inherently embedded in space. Hence it has no ready geometric representation in the way that land has maps, silicon chips have diagrams, computers have connectivity schematics. As soon as we attempt to diagram software structure, we find it to constitute not one, but several, general directed graphs, superimposed one upon another. The several graphs may represent the flow of control, the flow of data, patterns of dependency, time sequence, name-space relationships. These are usually not even planar, much less hierarchical. Indeed, one of the ways of establishing conceptual control over such structure is to enforce link cutting until one or more of the graphs becomes hierarchical.[^2]

软件的现实本身并不嵌入空间之中。因此，它不像土地有地图、硅芯片有图样、计算机有连接示意图那样，具有现成的几何表示。一旦试图画出软件结构，我们就会发现，它不是一张普通有向图，而是多张相互叠加的有向图。这些图可能分别表示控制流、数据流、依赖模式、时间顺序或命名空间关系。它们通常连平面图都不是，更不用说层次结构。事实上，要从概念上驾驭这种结构，一种办法就是强制切断部分连接，直到其中一张或多张图变成层次结构。

In spite of progress in restricting and simplifying the structures of software, they remain inherently unvisualizable, thus depriving the mind of some of its most powerful conceptual tools. This lack not only impedes the process of design within one mind, it severely hinders communication among minds.

尽管我们在约束和简化软件结构方面取得了进步，这些结构在本质上仍难以可视化，因而使人失去了一些最强大的概念思考工具。这个缺陷不仅妨碍个人头脑中的设计过程，也严重妨碍人与人之间的沟通。

### Past Breakthroughs Solved Accidental Difficulties / 过去的突破解决了附属性困难

If we examine the three steps in software technology that have been most fruitful in the past, we discover that each attacked a different major difficulty in building software, but they have been the **ACCIDENTAL**, **NOT** the essential, difficulties. We can also see the natural limits to the extrapolation of each such attack.

回顾过去软件技术中最有成效的三项进展，可以发现，它们各自解决了一项重大的软件构建困难，但解决的都是**附属性困难，而非本质性困难**。我们也能看到，把每一种方法的成效继续外推，会遇到怎样的自然极限。

#### High-level languages / 高级语言

Surely the most powerful stroke for software productivity, reliability, and simplicity has been the progressive use of high-level languages for programming. Most observers credit that development with at least a factor of five in productivity, and with concomitant gains in reliability, simplicity, and comprehensibility.

逐步采用高级编程语言，无疑是提升软件生产率、可靠性和简洁性最有力的一步。大多数观察者认为，这项发展至少使生产率提高到原来的五倍，同时也提升了可靠性、简洁性和可理解性。

What does a high-level language accomplish? It frees a program from much of its accidental complexity. An abstract program consists of conceptual constructs: operations, data types, sequences, and communication. The concrete machine program is concerned with bits, registers, conditions, branches, channels, disks, and such. To the extent that the high-level language embodies the constructs wanted in the abstract program and avoids all lower ones, it eliminates a whole level of complexity that was never inherent in the program at all.

高级语言究竟做了什么？它让程序摆脱了大量附属性复杂性。抽象程序由操作、数据类型、执行顺序和通信等概念结构组成，而具体的机器程序却要处理位、寄存器、条件、分支、通道和磁盘等事物。高级语言只要能够体现抽象程序所需的结构，并避开低层细节，就能消除一整个原本并非程序固有的复杂性层次。

The most a high-level language can do is to furnish all the constructs the programmer imagines in the abstract program. To be sure, the level of our sophistication in thinking about data structures, data types, and operations is steadily rising, but at an ever-decreasing rate. And language development approaches closer and closer to the sophistication of users.

高级语言所能做到的极限，是提供程序员在抽象程序中所设想的全部结构。我们对数据结构、数据类型和操作的理解当然在持续深化，但深化的速度越来越慢。编程语言的发展，也越来越接近使用者的思考水平。

Moreover, at some point the elaboration of a high-level language becomes a burden that **INCREASES**, **NOT** reduces, the intellectual task of the user who rarely uses the esoteric constructs.

而且，到了一定程度，高级语言日益繁复反而会成为负担：对于很少使用那些深奥结构的用户，它会**增加，而非减少**思考的工作量。

#### Time-sharing / 分时系统

Most observers credit time-sharing with a major improvement in the productivity of programmers and in the quality of their product, although not so large as that brought by high-level languages.

大多数观察者认为，分时系统显著提高了程序员的生产率及其产品质量，尽管其贡献不及高级语言。

Time-sharing attacks a distinctly different difficulty. Time-sharing preserves immediacy, and hence enables us to maintain an overview of complexity. The slow turnaround of batch programming means that we inevitably forget the minutiae, if not the very thrust, of what we were thinking when we stopped programming and called for compilation and execution. This interruption of consciousness is costly in time, for we must refresh. The most serious effect may well be the decay of grasp of all that is going on in a complex system.

分时系统针对的是另一种截然不同的困难。它保留了即时反馈，使我们能够维持对复杂系统的整体把握。批处理编程的周转很慢：当我们停下编写，提交编译和运行时，原先思考的细节难免逐渐遗忘，甚至连思路的主线也可能丢失。思维被打断会耗费时间，因为我们必须重新唤起记忆；更严重的影响，可能是对复杂系统中各项活动的整体掌握随之减弱。

Slow turn-around, like machine-language complexities, is an accidental rather than an essential difficulty of the software process. The limits of the contribution of time-sharing derive directly. The principal effect is to shorten system response time. As it goes to zero, at some point it passes the human threshold of noticeability, about 100 milliseconds. Beyond that no benefits are to be expected.

缓慢的周转，与机器语言的复杂性一样，是软件过程中的附属性困难，而非本质性困难。因此，分时系统的贡献也有直接可见的上限。它的主要作用是缩短系统响应时间；当响应时间趋近于零时，总会越过人类能够察觉的阈值，大约是一百毫秒。再往下缩短，就不能指望还有收益了。

#### Unified programming environments / 统一编程环境

Unix and Interlisp, the first integrated programming environments to come into widespread use, are perceived to have improved productivity by integral factors. Why?

Unix 和 Interlisp 是最早得到广泛使用的集成编程环境，人们认为它们使生产率获得了数倍提高。为什么？

They attack the accidental difficulties of using programs together, by providing integrated libraries, unified file formats, and pipes and filters. As a result, conceptual structures that in principle could always call, feed, and use one another can indeed easily do so in practice.

它们通过集成程序库、统一文件格式，以及管道和过滤器，解决了程序协同使用中的附属性困难。于是，那些在原理上本就可以相互调用、传递数据和利用的概念结构，在实践中也真正能够轻松协作了。

This breakthrough in turn stimulated the development of whole toolbenches, since each new tool could be applied to any programs by using the standard formats.

这一突破又推动了整套工具工作台的发展，因为借助标准格式，每一件新工具都可以应用于任何程序。

Because of these successes, environments are the subject of much of today's software engineering research. We will look at their promise and limitations in the next section.

由于这些成功，编程环境成了当今软件工程研究的重要主题。下一节将讨论它的潜力与局限。

### Hopes for the Silver / 寄望成为银弹的技术

Now let us consider the technical developments that are most often advanced as potential silver bullets. What problems do they address? Are they the problems of essence, or are they remainders of our accidental difficulties? Do they offer revolutionary advances, or incremental ones?

现在，让我们考察那些最常被视为潜在银弹的技术发展。它们解决什么问题？是本质性问题，还是残存的附属性困难？它们带来的是革命性突破，还是渐进式改进？

#### Ada and other high-level language advances / Ada 及其他高级语言进展

One of the most touted recent developments is the programming language Ada, a general-purpose, high-level language of the 1980s. Ada indeed not only reflects evolutionary improvements in language concepts but embodies features to encourage modern design and modularization concepts. Perhaps the Ada philosophy is more of an advance than the Ada language, for it is the philosophy of modularization, of abstract data types, of hierarchical structuring.

近来最受推崇的发展之一，是 Ada 这种二十世纪八十年代的通用高级语言。Ada 不仅体现了语言概念的逐步改进，也包含鼓励现代设计和模块化思想的特性。或许，Ada 的理念比语言本身更具进步意义，因为它提倡模块化、抽象数据类型和层次化结构。

Ada is perhaps over-rich, the natural product of the process by which requirements were laid on its design. That is not fatal, for subset working vocabularies can solve the learning problem, and hardware advances will give us the cheap MIPS to pay for the compiling costs. Advancing the structuring of software systems is indeed a very good use for the increased MIPS our dollars will buy. Operating systems, loudly decried in the 1960s for their memory and cycle costs, have proved to be an excellent form in which to use some of the MIPS and cheap memory bytes of the past hardware surge.

Ada 的功能可能过于丰富，这也是其设计不断承接各项需求的自然结果。但这并非致命问题：只选用一个功能子集，就能解决学习负担；硬件进步也会提供廉价的计算能力，抵消编译成本。用同样的钱可以买到更多每秒百万条指令的处理能力，将其用于改善软件系统的结构，无疑是明智的用途。操作系统在二十世纪六十年代曾因占用内存和处理器时间而受到猛烈批评，事实却证明，用它来消化硬件飞跃带来的一部分计算能力与廉价内存，是极好的选择。

Nevertheless, Ada will **NOT** prove to be the silver bullet that slays the software productivity monster. It is, after all, just another high-level language, and the biggest payoff from such languages came from the first transition, up from the accidental complexities of the machine into the more abstract statement of step-by-step solutions. Once those accidents have been removed, the remaining ones are smaller, and the payoff from their removal will surely be less.

尽管如此，Ada **不会**成为杀死软件生产率怪物的银弹。它毕竟只是另一种高级语言，而这类语言最大的收益，来自最初的跨越：从机器的附属性复杂性，提升到以更抽象的方式逐步描述解决方案。一旦这些附属性困难被清除，剩余问题就小得多，消除它们的收益也必然较小。

I predict that a decade from now, when the effectiveness of Ada is assessed, it will be seen to have made a substantial difference, but not because of any particular language feature, nor indeed because of all of them combined. Neither will the new Ada environment prove to be the cause of the improvements. Ada's greatest contribution will be that switching to it occasioned training programmers in modern software design techniques.

我预测，十年后评估 Ada 的成效时，人们会发现它确实带来了显著改变，但原因既不是某一项语言特性，也不是所有特性的总和，甚至不是新的 Ada 环境。Ada 最大的贡献将是：转向使用它，促使程序员接受了现代软件设计方法的训练。

#### Object-oriented programming / 面向对象编程

Many students of the art hold out more hope for object-oriented programming than for any of the other technical fads of the day.[^3] I am among them. Mark Sherman of Dartmouth notes that we must be careful to distinguish two separate ideas that go under that name: abstract data types and hierarchical types, also called classes. The concept of the abstract data type is that an object's type should be defined by a name, a set of proper values, and a set of proper operations, rather than its storage structure, which should be hidden. Examples are Ada packages (with private types) or Modula's modules.

许多研究软件技术的人，对面向对象编程寄予的希望，超过了当下其他任何技术潮流。我也在其中。达特茅斯的马克·谢尔曼提醒我们，必须仔细区分这一名称下的两个不同概念：抽象数据类型，以及又称为类的层次化类型。抽象数据类型的含义是：对象的类型应由名称、一组合法值和一组合法操作来定义，而不是由其存储结构定义；存储结构应该隐藏起来。Ada 中带私有类型的包，以及 Modula 的模块，都是例子。

Hierarchical types, such as Simula-67's classes, allow the definition of general interfaces that can be further refined by providing subordinate types. The two concepts are orthogonal—there may be hierarchies without hiding and hiding without hierarchies. Both concepts represent real advances in the art of building software.

层次化类型，例如 Simula-67 的类，允许先定义通用接口，再通过提供下级类型来进一步细化。这两个概念彼此独立：可以有层次而没有隐藏，也可以有隐藏而没有层次。两者都代表了软件构建技术的实质进步。

Each removes one more accidental difficulty from the process, allowing the designer to express the essence of his design without having to express large amounts of syntactic material that add no new information content. For both abstract types and hierarchical types, the result is to remove a higher-order sort of accidental difficulty and allow a higher-order expression of design.

它们各自消除了一种附属性困难，使设计者能够表达设计的本质，而不必写下大量不增加任何信息内容的语法材料。无论抽象类型还是层次化类型，其作用都是去除更高层次的附属性困难，让设计得以在更高层次上表达。

Nevertheless, such advances can do no more than to remove all the accidental difficulties from the expression of the design. **The complexity of the design itself is ESSENTIAL; and such attacks make NO change whatever in that.** An order-of-magnitude gain can be made by object-oriented programming **ONLY IF** the unnecessary underbrush of type specification remaining today in our programming language is itself responsible for nine-tenths of the work involved in designing a program product. I doubt it.

不过，这些进展至多只能消除设计表达中的全部附属性困难。**设计本身的复杂性属于本质，这些方法完全没有改变它。**面向对象编程**只有在**现有编程语言中那些不必要的类型说明负担，占到程序产品设计工作量的十分之九时，才可能带来一个数量级的提升。我对此表示怀疑。

#### Artificial intelligence / 人工智能

Many people expect advances in artificial intelligence to provide the revolutionary breakthrough that will give order-of-magnitude gains in software productivity and quality.[^4] I do **NOT**. To see why, we must dissect what is meant by "artificial intelligence" and then see how it applies.

许多人期待人工智能的进步带来革命性突破，使软件生产率和质量提高一个数量级。我**不这样认为**。要理解原因，必须先剖析“人工智能”的含义，再考察它如何应用。

Parnas has clarified the terminological chaos:

帕纳斯澄清了这一术语上的混乱：

> Two quite different definitions of AI are in common use today. AI-1: The use of computers to solve problems that previously could only be solved by applying human intelligence. AI-2: The use of a specific set of programming techniques known as heuristic or rule-based programming. In this approach human experts are studied to determine what heuristics or rules of thumb they use in solving problems… The program is designed to solve a problem the way that humans seem to solve it.

> 如今通常使用两种截然不同的人工智能定义。AI-1：利用计算机解决以往只能运用人类智能才能解决的问题。AI-2：使用一组特定的编程技术，即启发式编程或基于规则的编程。在后一种方法中，人们研究人类专家，弄清他们解决问题时采用哪些启发式方法或经验规则……然后设计程序，让它按照人类看起来所采用的方式解决问题。

> The first definition has a sliding meaning… Something can fit the definition of AI-1 today but, once we see how the program works and understand the problem, we will not think of it as AI anymore… Unfortunately I cannot identify a body of technology that is unique to this field… Most of the work is problem-specific, and some abstraction or creativity is required to see how to transfer it.[^5]

> 第一种定义的含义会不断移动……某件事今天可以符合 AI-1 的定义，但一旦我们看清程序如何工作、理解了问题，就不再把它视为人工智能……遗憾的是，我无法指出一套为这一领域所独有的技术体系……大多数工作都针对具体问题；要看出如何把它迁移到其他问题上，仍然需要一定的抽象能力或创造力。

I agree completely with this critique. The techniques used for speech recognition seem to have little in common with those used for image recognition, and both are different from those used in expert systems. I have a hard time seeing how image recognition, for example, will make any appreciable difference in programming practice. The same is true of speech recognition. **The hard thing about building software is deciding what to say, NOT saying it.** No facilitation of expression can give more than marginal gains.

我完全赞同这番批评。语音识别使用的技术，与图像识别的技术似乎没有多少共同之处，而这两者又都不同于专家系统所用的技术。例如，我很难看出图像识别会怎样给编程实践带来明显改变；语音识别也是如此。**构建软件的困难，在于决定要说什么，而不是把它说出来。**无论怎样便利表达，带来的收益都只能是有限的。

Expert systems technology, AI-2, deserves a section of its own.

专家系统技术，也就是 AI-2，值得单独讨论。

#### Expert systems / 专家系统

The most advanced part of the artificial intelligence art, and the most widely applied, is the technology for building expert systems. Many software scientists are hard at work applying this technology to the software-building environment.[^6] What is the concept, and what are the prospects?

人工智能技术中最先进、应用最广泛的部分，是构建专家系统的技术。许多软件科学家正努力将它应用于软件开发环境。这一概念是什么？前景又如何？

An expert system is a program containing a generalized inference engine and a rule base, designed to take input data and assumptions and explore the logical consequences through the inferences derivable from the rule base, yielding conclusions and advice, and offering to explain its results by retracing its reasoning for the user. The inference engines typically can deal with fuzzy or probabilistic data and rules in addition to purely deterministic logic.

专家系统是一种包含通用推理引擎和规则库的程序。它接收输入数据与假设，利用规则库中可推导的规则探索逻辑后果，得出结论和建议，并可向用户重现推理过程，解释结果。除了纯粹确定性的逻辑外，推理引擎通常还能够处理模糊或带概率的数据与规则。

Such systems offer some clear advantages over programmed algorithms for arriving at the same solutions to the same problems:

对于同样的问题，要得到同样的解答，这类系统相比直接编写算法有一些明显优势：

- Inference engine technology is developed in an application-independent way, and then applied to many uses. One can justify much more effort on the inference engines. Indeed, that technology is well advanced.

  推理引擎技术的开发独立于具体应用，随后可用于许多不同用途。因此，投入更多精力开发推理引擎是值得的。事实上，这项技术已经相当成熟。

- The changeable parts of the application-peculiar materials are encoded in the rule base in a uniform fashion, and tools are provided for developing, changing, testing, and documenting the rule base. This regularizes much of the complexity of the application itself.

  应用特有内容中容易变化的部分，以统一方式编码进规则库，并有工具支持规则库的开发、修改、测试和文档编写。这使应用本身的大量复杂性得以按统一规范处理。

Edward Feigenbaum says that the power of such systems does **NOT** come from ever-fancier inference mechanisms, **BUT** rather from ever-richer knowledge bases that reflect the real world more accurately. I believe the most important advance offered by the technology is the separation of the application complexity from the program itself.

爱德华·费根鲍姆说，这类系统的力量，**不是**来自越来越花哨的推理机制，**而是**来自越来越丰富、能够更准确反映现实世界的知识库。我认为，这项技术最重要的进步，是把应用的复杂性与程序本身分离开来。

How can this be applied to the software task? In many ways: suggesting interface rules, advising on testing strategies, remembering bug-type frequencies, offering optimization hints, etc.

它可以怎样用于软件工作？方式很多：提出接口规则建议、指导测试策略、记住各类缺陷的出现频率，以及提供优化提示等。

Consider an imaginary testing advisor, for example. In its most rudimentary form, the diagnostic expert system is very like a pilot's checklist, fundamentally offering suggestions as to possible causes of difficulty. As the rule base is developed, the suggestions become more specific, taking more sophisticated account of the trouble symptoms reported. One can visualize a debugging assistant that offers very generalized suggestions at first, but as more and more system structure is embodied in the rule base, becomes more and more particular in the hypotheses it generates and the tests it recommends.

例如，设想一个测试顾问。在最简陋的形式下，这种诊断专家系统很像飞行员的检查清单，主要提示困难可能来自哪些原因。随着规则库不断发展，它会更细致地考虑所报告的故障症状，给出越来越具体的建议。我们可以设想一个调试助手：起初只提供非常笼统的建议，但随着规则库纳入越来越多的系统结构信息，它提出的假设和推荐的测试会越来越有针对性。

Such an expert system may depart most radically from the conventional ones in that its rule base should probably be hierarchically modularized in the same way the corresponding software product is, so that as the product is modularly modified, the diagnostic rule base can be modularly modified as well.

这种专家系统与传统专家系统最大的不同，可能在于：它的规则库应当像对应的软件产品一样，采用层次化的模块结构。这样，当产品按模块修改时，诊断规则库也能按模块修改。

The work required to generate the diagnostic rules is work that will have to be done anyway in generating the set of test cases for the modules and for the system. If it is done in a suitably general manner, with a uniform structure for rules and a good inference engine available, it may actually reduce the total labor of generating bring-up test cases, as well as helping in lifelong maintenance and modification testing. In the same way, we can postulate other advisors—probably many of them, and probably simple ones—for the other parts of the software construction task.

生成诊断规则所需的工作，本来就必须在为模块和整个系统设计测试用例时完成。如果采用足够通用的方法，配合统一的规则结构和良好的推理引擎，就可能减少生成初次调试测试用例的总工作量，并有助于软件整个生命周期中的维护和修改测试。同理，我们也可以为软件构建的其他环节设想辅助顾问；它们可能数量很多，但每一个都比较简单。

Many difficulties stand in the way of early realization of useful expert advisors to the program developer. A crucial part of our imaginary scenario is the development of easy ways to get from program structure specification to the automatic or semi-automatic generation of diagnostic rules. Even more difficult and important is the twofold task of knowledge acquisition: finding articulate, self-analytical experts who know why they do things; and developing efficient techniques for extracting what they know and distilling it into rule bases. *The essential prerequisite for building an expert system is to have an expert.*

要尽快为程序开发者提供实用的专家顾问，仍有许多困难需要克服。在我们的设想中，一个关键环节是找到简便的方法，根据程序结构的规格说明，自动或半自动地生成诊断规则。更困难、也更重要的，是知识获取的双重任务：找到表达清楚、善于自我分析、知道自己为何这样做的专家；再开发有效方法，提取他们的知识，并将其提炼成规则库。*构建专家系统的首要前提，是先有专家。*

The most powerful contribution of expert systems will surely be to put at the service of the inexperienced programmer the experience and accumulated wisdom of the best programmers. This is no small contribution. The gap between the best software engineering practice and the average practice is very wide—perhaps wider than in any other engineering discipline. A tool that disseminates good practice would be important.

专家系统最有力的贡献，无疑是让经验不足的程序员也能利用顶尖程序员的经验和积累的智慧。这绝不是小贡献。软件工程中最佳实践与平均实践之间的差距非常大，可能比其他任何工程领域都大。能够传播良好实践的工具，必定十分重要。

#### “Automatic” programming / “自动”编程

For almost 40 years, people have been anticipating and writing about "automatic programming", the generation of a program for solving a problem from a statement of the problem specifications. Some people today write as if they expected this technology to provide the next breakthrough.[^7]

将近四十年来，人们一直在期待和讨论“自动编程”：根据问题规格的陈述，自动生成解决该问题的程序。如今有些人的论述，仿佛仍在期待这项技术带来下一次突破。

Parnas implies that the term is used for glamour and not semantic content, asserting,

帕纳斯认为，这个术语主要是为了吸引人，而不是传达实质含义。他断言：

> *In short, automatic programming always has been a euphemism for programming with a higher-level language than was presently available to the programmer.*[^8]

> *简言之，所谓自动编程，一直不过是一个好听的说法，指的是用比程序员当时能够使用的语言更高级的语言编程。*

He argues, in essence, that in most cases it is the **SOLUTION METHOD**, **NOT** the problem, whose specification has to be given.

他的核心论点是：多数情况下，必须明确说明的**是解决方法，而非问题本身**。

Exceptions can be found. The technique of building generators is very powerful, and it is routinely used to good advantage in programs for sorting. Some systems for integrating differential equations have also permitted direct specification of the problem. The system assessed the parameters, chose from a library of methods of solution, and generated the programs.

当然也有例外。构建程序生成器是一种很有力的技术，已经经常用于生成排序程序，并取得良好效果。有些求解微分方程的系统，也允许直接描述问题：系统评估参数，从方法库中选择求解方法，然后生成程序。

These applications have very favorable properties:

这些应用具有十分有利的特点：

- The problems are readily characterized by relatively few parameters.

  只用相对较少的参数，就能清楚地刻画问题。

- There are many known methods of solution to provide a library of alternatives.

  已有许多已知的求解方法，可以组成备选方法库。

- Extensive analysis has led to explicit rules for selecting solution techniques, given problem parameters.

  经过大量分析，人们已经建立了明确规则，可以根据问题参数选择求解技术。

It is hard to see how such techniques generalize to the wider world of the ordinary software system, where cases with such neat properties are the exception. It is hard even to imagine how this breakthrough in generalization could conceivably occur.

很难看出这些技术如何推广到更广阔的普通软件系统领域，因为具有上述整齐特性的情况，在那里只是例外。甚至很难想象，究竟怎样才能在这种通用化上取得突破。

#### Graphical programming / 图形化编程

A favorite subject for Ph.D. dissertations in software engineering is graphical, or visual, programming, the application of computer graphics to software design.[^9] Sometimes the promise of such an approach is postulated from the analogy with VLSI chip design, where computer graphics plays so fruitful a role. Sometimes the approach is justified by considering flowcharts as the ideal program design medium, and providing powerful facilities for constructing them.

软件工程博士论文中的一个热门课题，是图形化或可视化编程，也就是将计算机图形技术用于软件设计。人们有时通过类比超大规模集成电路芯片设计，推测这种方法的潜力，因为计算机图形技术在芯片设计中发挥了卓越作用。另一些时候，人们把流程图视为理想的程序设计媒介，并以提供强大的流程图构建工具为由，支持这种方法。

Nothing even convincing, much less exciting, has yet emerged from such efforts. I am persuaded that nothing will.

这些努力至今还没有拿出令人信服的成果，更不用说令人兴奋的成果。我确信，今后也不会有。

In the first place, as I have argued elsewhere, the flow chart is a very poor abstraction of software structure.[^10] Indeed, it is best viewed as Burks, von Neumann, and Goldstine's attempt to provide a desperately needed high-level control language for their proposed computer. In the pitiful, multipage, connection-boxed form to which the flow chart has today been elaborated, it has proved to be essentially useless as a design tool: programmers draw flow charts **AFTER**, **NOT BEFORE**, writing the programs they describe.

首先，正如我在别处所论述的，流程图对软件结构的抽象十分糟糕。更恰当的理解是：伯克斯、冯·诺依曼和戈尔德斯坦，当时迫切需要一种高级控制语言来描述他们计划建造的计算机，流程图正是这种尝试的产物。如今，流程图演变成一种可怜的形式：跨越许多页面，布满连接框。事实证明，它作为设计工具基本无用：程序员往往在程序写完**之后，而非之前**，才补画描述该程序的流程图。

Second, the screens of today are too small, in pixels, to show both the scope and the resolution of any serious detailed software diagram. The so-called "desktop metaphor" of today's workstation is instead an "airplane-seat" metaphor. Anyone who has shuffled a lapful of papers while seated in a coach between two portly passengers will recognize the difference—one can see only a very few things at once. The true desktop provides overview of and random access to a score of pages. Moreover, when fits of creativity run strong, more than one programmer or writer has been known to abandon the desktop for the more spacious floor. The hardware technology will have to advance quite substantially before the scope of our scopes is sufficient to the software design task.

其次，以像素衡量，今天的屏幕太小，无法同时呈现一张真正详尽的软件图所需的范围和精度。如今工作站所谓的“桌面隐喻”，其实更像“飞机座位隐喻”。任何曾在经济舱里夹在两位胖乘客之间、翻动膝上一堆文件的人，都会明白其中差别：你一次只能看到寥寥几样东西。真正的桌面则能让你纵览二十来页材料，并随手取阅任何一页。此外，创作灵感旺盛时，不少程序员或作家还会离开桌面，转用更宽敞的地板。在显示设备的视野足以承担软件设计任务之前，硬件技术还必须取得相当大的进步。

More fundamentally, as I have argued above, software is very difficult to visualize. Whether we diagram control flow, variable scope nesting, variable cross-references, data flow, hierarchical data structures, or whatever, we feel only one dimension of the intricately interlocked software elephant. If we superimpose all the diagrams generated by the many relevant views, it is difficult to extract any global overview. The VLSI analogy is fundamentally misleading—a chip design is a layered two-dimensional object whose geometry reflects its essence. A software system is **NOT**.

更根本的是，正如前文所说，软件极难可视化。无论画的是控制流、变量作用域的嵌套、变量的交叉引用、数据流、层次化数据结构，还是其他内容，我们都只是摸到了这头结构交错的软件巨象的一个侧面。如果把各种相关视角生成的图全部叠加起来，也很难获得整体认识。拿超大规模集成电路作类比，从根本上就是误导：芯片设计是一个分层的二维对象，其几何结构反映了它的本质；**软件系统却不是。**

#### Program verification / 程序验证

Much of the effort in modern programming goes into the testing and repair of bugs. Is there perhaps a silver bullet to be found by eliminating the errors at the source, in the system design phase? Can both productivity and product reliability be radically enhanced by following the profoundly different strategy of proving designs correct before the immense effort is poured into implementing and testing them?

现代编程的大量工作，都花在测试和修复缺陷上。那么，能否在源头，也就是系统设计阶段，消除错误，从而找到银弹？如果采用一种截然不同的策略，在投入巨量实施与测试工作之前，先证明设计正确，是否就能大幅提升生产率与产品可靠性？

I do not believe we will find the magic here. Program verification is a very powerful concept, and it will be very important for such things as secure operating system kernels. The technology does not promise, however, to save labor. Verifications are so much work that only a few substantial programs have ever been verified.

我不认为这里会出现奇迹。程序验证是一个非常有力的概念，对于安全操作系统内核之类的系统，它将十分重要。不过，这项技术并不意味着节省人力。验证的工作量极大，因此真正经过验证的较大规模程序迄今只有少数。

Program verification does **NOT** mean error-proof programs. There is no magic here, either. Mathematical proofs also can be faulty. So whereas verification might reduce the program-testing load, it **CANNOT** eliminate it.

程序验证**不等于**程序绝不会出错。这里同样没有魔法，数学证明也可能有错。因此，验证或许能够减少程序测试的负担，却**不能**消除测试。

More seriously, **even perfect program verification can ONLY establish that a program meets its specification.** The hardest part of the software task is arriving at a complete and consistent specification, and much of the essence of building a program is in fact the debugging of the specification.

更重要的是，**即使程序验证完全正确，也只能证明程序符合规格说明。**软件任务最困难的部分，是获得完整且一致的规格说明；构建程序的许多本质性工作，实际上是在为规格说明“除错”。

#### Environments and tools / 环境与工具

How much more gain can be expected from the exploding researches into better programming environments? One's instinctive reaction is that the big-payoff problems were the first attacked, and have been solved: hierarchical file systems, uniform file formats so as to have uniform program interfaces, and generalized tools. Language-specific smart editors are developments not yet widely used in practice, but the most they promise is freedom from syntactic errors and simple semantic errors.

针对更好编程环境的研究正在激增，我们还能期待多大的收益？直觉上，那些回报最大的难题早已被优先处理并解决了：层次化文件系统、用统一文件格式实现统一程序接口，以及通用工具。面向特定语言的智能编辑器还未在实践中广泛应用，但它们最多也只是让人免于语法错误和简单的语义错误。

Perhaps the biggest gain yet to be realized in the programming environment is the use of integrated database systems to keep track of the myriads of details that must be recalled accurately by the individual programmer and kept current in a group of collaborators on a single system.

编程环境中尚待实现的最大收益，可能是利用集成数据库系统，追踪海量细节：单个程序员必须准确记住这些细节，共同开发一个系统的协作团队也必须让这些细节保持最新。

Surely this work is worthwhile, and surely it will bear some fruit in both productivity and reliability. But by its very nature, the return from now on must be marginal.

这项工作当然值得做，也必然会在生产率和可靠性上有所收获。但从其本性来看，今后的回报只能是有限的。

#### Workstations / 工作站

What gains are to be expected for the software art from the certain and rapid increase in the power and memory capacity of the individual workstation? Well, how many MIPS can one use fruitfully? The composition and editing of programs and documents is fully supported by today's speeds. Compiling could stand a boost, but a factor of 10 in machine speed would surely leave think-time the dominant activity in the programmer's day. Indeed, it appears to be so now.

个人工作站的计算能力和内存容量，必定会快速增长；这能给软件技术带来什么收益？人究竟能有效利用多少每秒百万条指令的处理能力？今天的速度已经足以支持程序和文档的撰写与编辑。编译还可以再快些，但如果机器速度提高十倍，程序员一天中占主导的活动，肯定就只剩思考了。事实上，如今似乎已经如此。

More powerful workstations we surely welcome. Magical enhancements from them we **CANNOT** expect.

更强大的工作站，我们当然欢迎；指望它带来神奇的提升，则**不可能**。

### Promising Attacks on the Conceptual Essence / 直面概念本质的有望途径

Even though no technological breakthrough promises to give the sort of magical results with which we are so familiar in the hardware area, there is both an abundance of good work going on now, and the promise of steady, if unspectacular progress.

虽然没有哪项技术突破，有望带来硬件领域中那些我们习以为常的神奇效果，但眼下仍有大量有价值的工作正在进行，也仍有希望取得稳步前进，尽管并不惊人。

All of the technological attacks on the accidents of the software process are fundamentally limited by the productivity equation:

所有针对软件过程中附属性困难的技术手段，都受到下面这个生产率公式的根本限制：

> Task time = Σᵢ (frequencyᵢ × timeᵢ)

> 任务总时间 = Σᵢ（第 i 项活动的发生次数 × 该项活动每次所需时间）

If, as I believe, the conceptual components of the task are now taking most of the time, then no amount of activity on the task components that are merely the expression of the concepts can give large productivity gains.

如果像我所认为的那样，任务中的概念性工作如今占据了大部分时间，那么，无论怎样改进那些仅仅用于表达概念的工作，都无法带来很大的生产率提升。

Hence we must consider those attacks that address the essence of the software problem, the formulation of these complex conceptual structures. Fortunately, some of these are very promising.

因此，我们必须考虑直接针对软件问题本质的方法，也就是针对这些复杂概念结构如何形成的方法。幸运的是，其中有些很有希望。

#### Buy versus build / 购买还是自建

*The most radical possible solution for constructing software is not to construct it at all.*

*解决软件构建问题最彻底的办法，就是根本不去构建它。*

Every day this becomes easier, as more and more vendors offer more and better software products for a dizzying variety of applications. While we software engineers have labored on production methodology, the personal computer revolution has created not one, but many, mass markets for software. Every newsstand carries monthly magazines which, sorted by machine type, advertise and review dozens of products at prices from a few dollars to a few hundred dollars. More specialized sources offer very powerful products for the workstation and other Unix markets. Even software tools and environments can be bought off-the-shelf. I have elsewhere proposed a market place for individual modules.

这样做一天比一天容易，因为越来越多的供应商，正在为种类繁多的应用提供更多、更好的软件产品。就在我们这些软件工程师埋头研究生产方法时，个人计算机革命已经创造出不止一个，而是许多个软件大众市场。每个报刊亭都有月刊，按机器类型刊登广告和评论，介绍几十种价格从几美元到几百美元的软件产品。更专业的渠道则为工作站和其他 Unix 市场提供功能强大的产品。就连软件工具和开发环境，也可以买到现成的。我曾在别处提出，为单个软件模块建立一个市场。

Any such product is cheaper to buy than to build afresh. Even at a cost of \$100,000, a purchased piece of software is costing only about as much as one programmer-year. And delivery is immediate! Immediate at least for products that really exist, products whose developer can refer the prospect to a happy user. Moreover, such products tend to be much better documented and somewhat better maintained than homegrown software.

购买这些产品，总比从头构建便宜。即使花十万美元购买一套软件，也不过相当于一名程序员一年的成本。而且可以立即交付！至少，对那些真正存在、开发者能够向潜在客户介绍满意用户的产品而言，是如此。此外，这些产品的文档通常比自行开发的软件完善得多，维护也往往更好一些。

The development of the mass market is, I believe, the most profound long-run trend in software engineering. **The cost of software has always been development cost, NOT replication cost.** Sharing that cost among even a few users radically cuts the per-user cost. Another way of looking at it is that the use of n copies of a software system effectively multiplies the productivity of its developers by n. That is an enhancement of the productivity of the discipline and of the nation.

我认为，大众市场的发展，是软件工程最深刻的长期趋势。**软件的成本始终在于开发，而非复制。**即使只让少数用户分摊开发成本，也能大幅降低每位用户的成本。换个角度说，一个软件系统被使用 n 份，实际上就使其开发者的生产率放大了 n 倍。这既提升了整个行业的生产率，也提升了国家的生产率。

The key issue, of course, is applicability. Can I use an available off-the-shelf package to do my task? A surprising thing has happened here. During the 1950s and 1960s, study after study showed that users would not use off-the-shelf packages for payroll, inventory control, accounts receivable, etc. The requirements were too specialized, the case-to-case variation too high. During the 1980s, we find such packages in high demand and widespread use. What has changed?

关键问题当然是适用性：我能用现成的软件包完成自己的任务吗？在这方面，发生了一件令人惊讶的事。二十世纪五六十年代，一项又一项研究表明，用户不愿使用现成的工资、库存控制、应收账款等软件包，因为需求太特殊，不同场景之间的差异太大。到了八十年代，这些软件包却需求旺盛、应用广泛。究竟发生了什么变化？

Not really the packages. They may be somewhat more generalized and somewhat more customizable than formerly, but not much. Not really the applications, either. If anything, the business and scientific needs of today are more diverse, more complicated than those of 20 years ago.

主要并不是软件包变了。它们可能比过去更通用、更便于定制，但变化并不大。应用本身也没有发生那样的变化。真要说起来，今天的商业和科学需求，比二十年前还更多样、更复杂。

The big change has been in the hardware/software cost ratio. The buyer of a \$2 million machine in 1960 felt that he could afford \$250,000 more for a customized payroll program, one that slipped easily and nondisruptively into the computer-hostile social environment. Buyers of \$50,000 office machines today cannot conceivably afford customized payroll programs; so they adapt their payroll procedures to the packages available. Computers are now so commonplace, if not yet so beloved, that the adaptations are accepted as a matter of course.

真正显著的变化，是硬件与软件的成本比。1960 年购买一台两百万美元计算机的人，会觉得再花二十五万美元定制工资程序也负担得起，以便让它轻松融入那个对计算机怀有抵触的社会环境，而不引起扰动。今天购买五万美元办公计算机的人，则根本不可能负担定制工资程序，因此，他们会调整工资处理流程，适应现成的软件包。计算机如今已经十分普遍，即使还谈不上人见人爱，这类调整也已被视为理所当然。

There are dramatic exceptions to my argument that the generalization of the software packages has changed little over the years: electronic spreadsheets and simple database systems. These powerful tools, so obvious in retrospect and yet so late appearing, lend themselves to myriad uses, some quite unorthodox. Articles and even books now abound on how to tackle unexpected tasks with the spreadsheet. Large numbers of applications that would formerly have been written as custom programs in Cobol or Report Program Generator are now routinely done with these tools.

我说软件包的通用性多年来变化不大，也有突出的例外：电子表格和简单的数据库系统。这些强大工具，事后看来如此显而易见，却又出现得那么晚；它们能用于无数用途，其中一些相当出人意料。如今，讲解如何用电子表格完成意外任务的文章乃至书籍，已经大量出现。过去许多必须用 Cobol 或报表程序生成语言编写定制程序的应用，现在都可以惯常地用这些工具完成。

Many users now operate their own computers day in and day out on varied applications without ever writing a program. Indeed, many of these users cannot write new programs for their machines, but they are nevertheless adept at solving new problems with them.

许多用户如今每天都在自己的计算机上处理各种应用，却从来不写程序。事实上，其中很多人根本不会为计算机编写新程序，但仍善于用它解决新问题。

I believe the single most powerful software productivity strategy for many organizations today is to equip the computer-naïve intellectual workers on the firing line with personal computers and good generalized writing, drawing, file and spreadsheet programs, and turn them loose. The same strategy, with simple programming capabilities, will also work for hundreds of laboratory scientists.

我相信，对今天许多组织而言，提升软件生产率最有力的单一策略，是给一线那些不熟悉计算机的知识工作者配备个人计算机，以及优质、通用的文字处理、绘图、文件管理和电子表格程序，然后放手让他们去用。同样的策略，辅以简单编程能力，也适用于数以百计的实验室科学家。

#### Requirements refinement and rapid prototyping / 需求细化与快速原型

**The hardest single part of building a software system is deciding precisely what to build.** No other part of the conceptual work is so difficult as establishing the detailed technical requirements, including all the interfaces to people, to machines, and to other software systems. No other part of the work so cripples the resulting system if done wrong. No other part is more difficult to rectify later.

**构建软件系统最困难的一件事，就是准确决定究竟要构建什么。**在概念性工作中，没有哪一部分比确定详细的技术需求更难，其中包括系统与人、机器及其他软件系统之间的全部接口。也没有哪一部分一旦做错，会给最终系统造成同样严重的损害；更没有哪一部分在事后同样难以补救。

Therefore the most important function that software builders do for their clients is the iterative extraction and refinement of the product requirements. For the truth is, the clients do not know what they want. They usually do not know what questions must be answered, and they almost never have thought of the problem in the detail that must be specified. Even the simple answer—"Make the new software system work like our old manual information-processing system" —is in fact too simple. Clients never want exactly that.

因此，软件构建者为客户提供的最重要服务，是反复提取和细化产品需求。事实是，客户并不知道自己究竟想要什么。他们通常不知道必须回答哪些问题，也几乎从未把问题思考到规格说明所要求的细致程度。即使是“让新软件系统像旧的人工信息处理系统那样工作”这个看似简单的答案，实际上也过于简单；客户从来不是原封不动地想要旧系统。

Complex software systems are, moreover, things that act, that move, that work. The dynamics of that action are hard to imagine. So in planning any software activity, it is necessary to allow for an extensive iteration between the client and the designer as part of the system definition.

而且，复杂软件系统会行动、会运转、会工作，其动态行为很难凭空想象。因此，在规划任何软件活动时，都必须把客户与设计者之间充分的反复迭代，纳入系统定义过程。

I would go a step further and assert that it is really **IMPOSSIBLE** for clients, even those working with software engineers, to specify completely, precisely, and correctly the exact requirements of a modern software product before having built and tried some versions of the product they are specifying.

我愿意进一步断言：在构建并试用过正在定义的产品的若干版本之前，客户即使与软件工程师一起工作，也**不可能**完整、精确且正确地说明现代软件产品的全部确切需求。

Therefore one of the most promising of the current technological efforts, and one which attacks the **ESSENCE**, **NOT** the accidents, of the software problem, is the development of approaches and tools for rapid prototyping of systems as part of the iterative specification of requirements.

因此，当前最有希望的技术努力之一，是开发用于系统快速原型的方法和工具，把它们纳入迭代式需求定义。这种努力针对的是软件问题的**本质，而非附属性困难**。

A prototype software system is one that simulates the important interfaces and performs the main functions of the intended system, while not being necessarily bound by the same hardware speed, size, or cost constraints. Prototypes typically perform the mainline tasks of the application, but make no attempt to handle the exceptions, respond correctly to invalid inputs, abort cleanly, etc. **The purpose of the prototype is to make real the conceptual structure specified, so that the client can test it for consistency and usability.**

软件原型系统会模拟目标系统的重要接口，实现主要功能，但不一定受同样的硬件速度、容量或成本约束。原型通常只执行应用的主要任务，不试图处理异常、正确响应无效输入，或干净地中止运行等。**原型的目的，是让规格说明中的概念结构变得可操作，使客户能够检验其一致性与可用性。**

Much of present-day software acquisition procedures rests upon the assumption that one can specify a satisfactory system in advance, get bids for its construction, have it built, and install it. I think this assumption is fundamentally wrong, and that many software acquisition problems spring from that fallacy. Hence they cannot be fixed without fundamental revision, one that provides for iterative development and specification of prototypes and products.

今天许多软件采购流程，建立在这样一个假设上：可以事先定义一个令人满意的系统，然后招标、构建并安装它。我认为，这个假设从根本上就是错误的，许多软件采购问题正源于这一谬误。因此，若不从根本上修订流程，为原型和产品的迭代开发与规格定义留出空间，这些问题就无法解决。

#### Incremental development—GROW, NOT BUILD, software / 增量开发：让软件生长，而非把它建造出来

I still remember the jolt I felt in 1958 when I first heard a friend talk about *building* a program, as opposed to *writing* one. In a flash he broadened my whole view of the software process. The metaphor shift was powerful, and accurate. Today we understand how like other building processes the construction of software is, and we freely use other elements of the metaphor, such as *specifications*, *assembly of components*, and *scaffolding*.

我至今还记得，1958 年第一次听朋友说“建造”程序，而不是“编写”程序时，自己受到的震动。那一瞬间，他拓宽了我对整个软件过程的认识。这种隐喻的变化既有力又准确。如今，我们已明白软件构建与其他建造过程有多么相似，也会自然使用这一隐喻中的其他词语，例如*规格说明*、*构件组装*和*脚手架*。

The building metaphor has outlived its usefulness. It is time to change again. If, as I believe, the conceptual structures we construct today are too complicated to be accurately specified in advance, and too complex to be built faultlessly, then we must take a radically different approach.

“建造”这个隐喻已经完成了它的使命，现在该再次改变了。如果像我所认为的那样，我们今天构造的概念结构过于繁复，无法预先准确说明，又过于复杂，无法毫无差错地一次建成，那么就必须采用一种根本不同的方法。

Let us turn to nature and study complexity in living things, instead of just the dead works of man. Here we find constructs whose complexities thrill us with awe. The brain alone is intricate beyond mapping, powerful beyond imitation, rich in diversity, self-protecting, and self-renewing. The secret is that it is **GROWN**, **NOT BUILT**.

让我们转向自然，研究生命体中的复杂性，而不只研究人类制造的无生命之物。在那里，各种结构的复杂程度令人惊叹。单是大脑，就精密到难以描绘，强大到难以模仿，同时具有丰富的多样性、自我保护和自我更新能力。秘诀在于：它是**生长出来的，而非建造出来的**。

So it must be with our software systems. Some years ago Harlan Mills proposed that any software system should be grown by incremental development.[^11] That is, the system should first be made to run, even though it does nothing useful except call the proper set of dummy subprograms. Then, bit-by-bit it is fleshed out, with the subprograms in turn being developed into actions or calls to empty stubs in the level below.

软件系统也必须如此。若干年前，哈兰·米尔斯提出，任何软件系统都应通过增量开发逐步生长。也就是说，首先让系统运行起来，哪怕它除了调用一组适当的占位子程序之外，没有任何实际用途。然后再一点一点填充内容，依次把这些子程序发展为真正的操作，或者对下一层空桩程序的调用。

I have seen the most dramatic results since I began urging this technique on the project builders in my software engineering laboratory class. Nothing in the past decade has so radically changed my own practice, or its effectiveness. The approach necessitates top-down design, for it is a top-down growing of the software. It allows easy backtracking. It lends itself to early prototypes. Each added function and new provision for more complex data or circumstances grows organically out of what is already there.

自从我在软件工程实验课上，开始向承担项目的学生推荐这项技术以来，就看到了极为显著的成果。过去十年里，没有什么如此彻底地改变过我的实践及其成效。这种方法要求自顶向下设计，因为软件是自顶向下地生长的。它便于回退调整，也有利于尽早形成原型。每一项新增功能，以及每一种为更复杂的数据或情境提供的新支持，都从已有系统中有机地生长出来。

The morale effects are startling. Enthusiasm jumps when there is a running system, even a simple one. Efforts redouble when the first picture from a new graphics software system appears on the screen, even if it is only a rectangle. *One always has, at every stage in the process, a working system.* I find that teams can *grow* much more complex entities in four months than they can *build*.

它对士气的影响同样惊人。只要有一个能够运行的系统，哪怕十分简单，团队的热情就会高涨。新图形软件第一次在屏幕上显示图像时，即使只是一个矩形，也会让大家加倍努力。*在开发过程的每一个阶段，手里始终都有一个可工作的系统。*我发现，在同样四个月里，团队能“生长”出的系统，远比他们能一次“建造”出的系统复杂。

The same benefits can be realized on large projects as on my small ones.[^12]

这些好处不仅适用于我的小项目，也能在大型项目中实现。

#### Great designers / 卓越的设计者

The central question of how to improve the software art centers, as it always has, on people.

如何提高软件技术，其核心一如既往，最终仍落在人身上。

We can get good designs by following good practices instead of poor ones. Good design practices can be taught. Programmers are among the most intelligent part of the population, so they can learn good practice. Thus a major thrust in the United States is to promulgate good modern practice. New curricula, new literature, new organizations such as the Software Engineering Institute, all have come into being in order to raise the level of our practice from poor to good. This is entirely proper.

遵循良好的实践，而非糟糕的实践，就能获得良好的设计。良好的设计实践是可以教授的。程序员属于人群中最聪明的一部分，因此能够学会好的方法。美国的一项重要努力，就是推广良好的现代实践。新课程、新文献，以及软件工程研究所这样的新组织，都应运而生，旨在把我们的实践从差提升到好。这完全正确。

Nevertheless, I do not believe we can make the next step upward in the same way. Whereas the difference between poor conceptual designs and good ones may lie in the soundness of design method, the difference between good designs and great ones surely does not. **Great designs come from great designers.** Software construction is a creative process. Sound methodology can empower and liberate the creative mind; it **CANNOT** inflame or inspire the drudge.

尽管如此，我不认为还能用同样的方式再上一个台阶。差的概念设计与好的概念设计之间，差别可能在于设计方法是否健全；但好的设计与卓越的设计之间，差别肯定不在这里。**卓越的设计来自卓越的设计者。**软件构建是一种创造性活动。健全的方法可以赋能并解放富有创造力的头脑，却**不能**点燃只会机械苦干之人的创造激情。

The differences are not minor—it is rather like Salieri and Mozart. Study after study shows that the very best designers produce structures that are faster, smaller, simpler, cleaner, and produced with less effort. The differences between the great and the average approach an order of magnitude.

这些差异绝非微不足道，倒更像萨列里与莫扎特之间的差别。一项又一项研究表明，最优秀的设计者能够用更少的精力，创造出更快、更小、更简单、更清晰的结构。卓越水平与平均水平之间的差距，接近一个数量级。

A little retrospection shows that although many fine, useful software systems have been designed by committees and built by multipart projects, those software systems that have excited passionate fans are those that are the products of one or a few designing minds, great designers. Consider Unix, APL, Pascal, Modula, the Smalltalk interface, even Fortran; and contrast with Cobol, PL/I, Algol, MVS/370, and MS-DOS (fig. 1).

稍作回顾就会发现，虽然许多优良而实用的软件系统由委员会设计，并通过分头进行的项目建成，但那些能让用户成为热情拥护者的软件系统，往往出自一位或少数几位卓越设计者之手。想想 Unix、APL、Pascal、Modula、Smalltalk 的界面，乃至 Fortran，再与 Cobol、PL/I、Algol、MVS/370 和 MS-DOS 作一番对比，便可明白这一点，见图 1。

**Figure 1. Products that inspire passionate fans / 图 1：能否激发用户的热情拥护**

| Yes / 能 | No / 不能 |
| --- | --- |
| Unix | Cobol |
| APL | PL/I |
| Pascal | Algol |
| Modula | MVS/370 |
| Smalltalk | MS-DOS |
| Fortran | — |

Hence, although I strongly support the technology transfer and curriculum development efforts now underway, I think the most important single effort we can mount is to develop ways to grow great designers.

因此，虽然我大力支持当前的技术转移与课程开发工作，但我认为，我们能采取的最重要的一项行动，是找到培养卓越设计者的方法。

No software organization can ignore this challenge. Good managers, scarce though they be, are no scarcer than good designers. Great designers and great managers are both very rare. Most organizations spend considerable effort in finding and cultivating the management prospects; I know of none that spends equal effort in finding and developing the great designers upon whom the technical excellence of the products will ultimately depend.

任何软件组织都不能忽视这一挑战。优秀管理者固然稀缺，却并不比优秀设计者更加稀缺；卓越的设计者和卓越的管理者则都极为罕见。大多数组织花费大量精力，发现和培养有管理潜力的人才；但据我所知，没有哪家组织会付出同等努力，去发现和培养卓越设计者，而产品最终能达到怎样的技术水准，恰恰取决于他们。

My first proposal is that each software organization must determine and proclaim that **great designers are as important to its success as great managers are, and that they can be expected to be similarly nurtured and rewarded.** Not only salary, but the perquisites of recognition—office size, furnishings, personal technical equipment, travel funds, staff support—must be fully equivalent.

我的第一项建议是，每个软件组织都必须明确认定并公开宣告：**卓越设计者对组织成功的重要性，与卓越管理者相同，也应获得同等的培养和回报。**不仅是薪酬，所有体现认可的待遇——办公室大小、陈设、个人技术设备、差旅经费和人员支持——也必须完全等同。

How to grow great designers? Space does not permit a lengthy discussion, but some steps are obvious:

怎样培养卓越的设计者？篇幅所限，无法详谈，但有些步骤显而易见：

- Systematically identify top designers as early as possible. The best are often not the most experienced.

  尽早、有系统地识别顶尖设计人才。最优秀的人，往往并不是经验最丰富的人。

- Assign a career mentor to be responsible for the development of the prospect, and keep a careful career file.

  指定一位职业导师，对培养对象的发展负责，并认真维护其职业档案。

- Devise and maintain a career development plan for each prospect, including carefully selected apprenticeships with top designers, episodes of advanced formal education, and short courses, all interspersed with solo design and technical leadership assignments.

  为每位培养对象制定并持续维护职业发展计划，包括精心安排的向顶尖设计者学习的机会、阶段性的高等正规教育和短期课程，并在其间穿插独立设计及技术领导任务。

- Provide opportunities for growing designers to interact with and stimulate each other.

  为成长中的设计者提供相互交流、彼此启发的机会。

### References / 参考文献

[^1]: Frederick P. Brooks, Jr., *The Mythical Man-Month: Anniversary Edition*, Addison-Wesley, 1995（《人月神话》周年纪念版，新增四章）。本文据该版转载；原载 H.-J. Kugler 编，*Proceedings of the IFIP Tenth World Computing Conference*（第十届 IFIP 世界计算机大会论文集），Elsevier Science B.V., Amsterdam, 1986, pp. 1069–1076。

[^2]: David L. Parnas, “[Designing Software for Ease of Extension and Contraction](https://users.ece.utexas.edu/~perry/education/SE-Intro/parnas.pdf)”（《为便于扩展和裁剪而设计软件》），*IEEE Transactions on Software Engineering*, SE-5(2), March 1979, pp. 128–138。

[^3]: Grady Booch, “Object-Oriented Design”（《面向对象设计》），载 *Software Engineering with Ada*（《使用 Ada 的软件工程》），Benjamin/Cummings, Menlo Park, California, 1983。

[^4]: Jack Mostow, ed., Special Issue on Artificial Intelligence and Software Engineering（人工智能与软件工程专刊），*IEEE Transactions on Software Engineering*, 11(11), November 1985。

[^5]: David L. Parnas, “Software Aspects of Strategic Defense Systems”（《战略防御系统的软件问题》），*Communications of the ACM*, 28(12), December 1985, pp. 1326–1335；另载 *American Scientist*, 73(5), September–October 1985, pp. 432–440。

[^6]: Robert Balzer, “A 15-Year Perspective on Automatic Programming”（《自动编程的十五年回顾》），载 Mostow 主编的专刊，见注 4。

[^7]: Mostow 主编的人工智能与软件工程专刊，见注 4。

[^8]: Parnas, “Software Aspects of Strategic Defense Systems”，见注 5。

[^9]: G. Raeder, “A Survey of Current Graphical Programming Techniques”（《当前图形化编程技术综述》），载 R. B. Grafton 与 T. Ichikawa 主编的可视化编程专刊，*Computer*, 18(8), August 1985, pp. 11–25。

[^10]: Brooks, *The Mythical Man-Month: Anniversary Edition*，1995，第 15 章，见注 1。

[^11]: Harlan D. Mills, “Top-Down Programming in Large Systems”（《大型系统中的自顶向下编程》），载 R. Rustin 编，*Debugging Techniques in Large Systems*（《大型系统调试技术》），Prentice-Hall, Englewood Cliffs, New Jersey, 1971。

[^12]: Barry W. Boehm, “[A Spiral Model of Software Development and Enhancement](https://doi.org/10.1109/2.59)”（《软件开发与改进的螺旋模型》），*Computer*, 21(5), May 1988, pp. 61–72。
