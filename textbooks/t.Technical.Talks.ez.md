---
title: Technical Talks
layout: post-vertical
categories: Notes
subclass: Software Engineering
---

## No Silver Bullet — Essence and Accident in Software Engineering

> **没有银弹：软件工程的本质性与附属性问题**

*Frederick P. Brooks, Jr.*  University of North Carolina at Chapel Hill[^1]

> 小弗雷德里克·P. 布鲁克斯，北卡罗来纳大学教堂山分校

> *There is no single development, in either technology or management technique, which by itself promises even one order-of-magnitude improvement within a decade in productivity, in reliability, in simplicity.*

> *无论是技术还是管理方法，都没有哪一项单独的发展，能够独力承诺在十年内使软件的生产率、可靠性或简洁性提高一个数量级。*

### Abstract

> **摘要**

All software construction involves essential tasks, the fashioning of the complex conceptual structures that compose the abstract software entity, and accidental tasks, the representation of these abstract entities in programming languages and the mapping of these onto machine languages within space and speed constraints. Most of the big past gains in software productivity have come from removing artificial barriers that have made the accidental tasks inordinately hard, such as severe hardware constraints, awkward programming languages, lack of machine time. How much of what software engineers now do is still devoted to the accidental, as opposed to the essential? Unless it is more than 9/10 of all effort, shrinking all the accidental activities to zero time will **NOT** give an order-of-magnitude improvement.

> 所有软件构建都包含两类任务：本质性任务，即塑造构成抽象软件实体的复杂概念结构；附属性任务，即用编程语言表示这些抽象实体，并在空间和速度的约束下，将其映射为机器语言。过去软件生产率的大幅提高，大多来自消除人为障碍，例如严苛的硬件限制、难用的编程语言，以及机时不足。这些障碍让附属性任务变得异常困难。软件工程师如今所做的工作，还有多少用于附属性任务，而非本质性任务？**除非附属性任务占全部工作量的九成以上，否则即使把这些活动的耗时降到零，也无法使生产率提高一个数量级。**

Therefore it appears that the time has come to address the essential parts of the software task, those concerned with fashioning abstract conceptual structures of great complexity. I suggest:

> 因此，看来我们已经到了必须正视软件任务本质部分的时候，也就是塑造高度复杂的抽象概念结构。我提出以下建议：

- Exploiting the mass market to avoid constructing what can be bought.

  > 利用大众市场，能买到的软件就不要自行构建。

- Using rapid prototyping as part of a planned iteration in establishing software requirements.

  > 在确定软件需求时，将快速原型纳入有计划的迭代过程。

- Growing software organically, adding more and more function to systems as they are run, used, and tested.

  > 让软件有机生长，在系统运行、使用和测试的过程中，不断增添功能。

- Identifying and developing the great conceptual designers of the rising generation.

  > 发现并培养新一代卓越的概念设计者。

### Introduction

> **引言**

Of all the monsters who fill the nightmares of our folklore, none terrify more than werewolves, because they transform unexpectedly from the familiar into horrors. For these, we seek bullets of silver that can magically lay them to rest.

> 在民间传说中那些让人噩梦连连的怪物里，没有什么比狼人更可怕，因为它会出人意料地从熟悉的模样变成恐怖之物。对付这种怪物，我们总想找到能够施展魔力、将它一举消灭的银弹。

The familiar software project has something of this character (at least as seen by the non-technical manager), usually innocent and straightforward, but capable of becoming a monster of missed schedules, blown budgets, and flawed products. So we hear desperate cries for a silver bullet, something to make software costs drop as rapidly as computer hardware costs do.

> 我们熟悉的软件项目也有些类似，至少在非技术背景的管理者眼中如此：它通常看起来无害而简单，却可能变成一个进度拖延、预算超支、产品漏洞百出的怪物。于是，我们听到人们急切地呼唤银弹，希望有什么办法能让软件成本像计算机硬件成本那样迅速下降。

But, as we look to the horizon of a decade hence, we see no silver bullet. **There is NO single development, in either technology or management technique, which by itself promises even one order-of-magnitude improvement in productivity, in reliability, in simplicity.** In this chapter we shall try to see why, by examining both the nature of the software problem and the properties of the bullets proposed.

> 然而，展望未来十年，我们看不到银弹。**无论是技术还是管理方法，都没有哪一项单独的发展，能够独力承诺使生产率、可靠性或简洁性提高一个数量级。**本章将同时考察软件问题的本性，以及人们提出的各种“银弹”的特性，尝试解释其中的原因。

Skepticism is **NOT** pessimism, however. Although we see no startling breakthroughs, and indeed, believe such to be inconsistent with the nature of software, many encouraging innovations are under way. A disciplined, consistent effort to develop, propagate, and exploit them should indeed yield an order-of-magnitude improvement. *There is no royal road, but there is a road.*

> 不过，怀疑**不等于**悲观。尽管我们看不到惊人的突破，而且确实认为这类突破与软件的本性不符，但许多令人鼓舞的创新正在发生。只要以严谨而持之以恒的努力去发展、推广和应用这些创新，就应当能够使生产率提高一个数量级。*没有康庄捷径，但仍有路可走。*

The first step toward the management of disease was replacement of demon theories and humours theories by the germ theory. That very step, the beginning of hope, in itself dashed all hopes of magical solutions. It told workers that progress would be made stepwise, at great effort, and that a persistent, unremitting care would have to be paid to a discipline of cleanliness. So it is with software engineering today.

> 人类控制疾病的第一步，是以病菌学说取代鬼神致病说和体液学说。这一步开启了希望，却也打破了对神奇疗法的一切幻想。它告诉人们：进步只能一步一步取得，必须付出巨大努力，并始终不懈地遵守清洁卫生的规范。今天的软件工程也是如此。

### Does It Have to Be Hard? — Essential Difficulties

> **软件非得这么难吗？本质性困难**

Not only are there no silver bullets now in view, the very nature of software makes it unlikely that there will be any—no inventions that will do for software productivity, reliability, and simplicity what electronics, transistors, and large-scale integration did for computer hardware. We cannot expect ever to see twofold gains every two years.

> 不仅眼下看不到银弹，软件本身的性质也使银弹不太可能出现：不会有什么发明，能像电子技术、晶体管和大规模集成电路之于计算机硬件那样，提升软件的生产率、可靠性和简洁性。我们不能指望软件也能每两年就取得翻倍的进步。

First, we must observe that the anomaly is **NOT** that software progress is so slow **BUT** that computer hardware progress is so fast. No other technology since civilization began has seen six orders of magnitude price-performance gain in 30 years. In no other technology can one choose to take the gain in either improved performance or in reduced costs. These gains flow from the transformation of computer manufacture from an assembly industry into a process industry.

> 首先，我们必须看到，反常的**不是**软件进步太慢，**而是**计算机硬件进步太快。自文明诞生以来，没有其他技术能在三十年内让性价比提高六个数量级；也没有其他技术能让人自由选择，将收益体现为性能提高，还是成本降低。这些进步源于计算机制造从装配型工业转变为流程型工业。

Second, to see what rate of progress we can expect in software technology, let us examine its difficulties. Following Aristotle, I divide them into essence—the difficulties inherent in the nature of the software—and accidents—those difficulties that today attend its production but that are not inherent.

> 其次，要判断软件技术有望以怎样的速度进步，我们需要考察它面临的困难。沿用亚里士多德的区分，我把困难分为两类：本质性的，即软件本性固有的困难；附属性的，即目前伴随软件生产而存在、却并非软件所固有的困难。

The accidents I discuss in the next section. First let us consider the essence.

> 附属性困难将在下一节讨论。先来看本质性困难。

The essence of a software entity is a construct of interlocking concepts: data sets, relationships among data items, algorithms, and invocations of functions. This essence is abstract, in that the conceptual construct is the same under many different representations. It is nonetheless highly precise and richly detailed.

> 软件实体的本质，是由相互联结的概念构成的结构：数据集、数据项之间的关系、算法，以及函数调用。这一本质是抽象的，因为无论采用哪一种表示方式，其概念结构都保持不变。但它同时又极为精确，包含丰富的细节。

**I believe the hard part of building software to be the specification, design, and testing of this conceptual construct, NOT the labor of representing it and testing the fidelity of the representation.** We still make syntax errors, to be sure; but they are fuzz compared to the conceptual errors in most systems.

> **我认为，构建软件的难点，在于对这种概念结构进行规格说明、设计和测试，而不在于把它表示出来，再检验这种表示是否忠实。**我们当然仍会犯语法错误，但与大多数系统中的概念错误相比，那些错误不过是细枝末节。

If this is true, building software will always be hard. There is inherently **NO SILVER BULLET**.

> 如果这个判断成立，构建软件就永远是困难的。从本质上说，**没有银弹**。

Let us consider the inherent properties of this irreducible essence of modern software systems: **complexity, conformity, changeability, and invisibility**.

> 下面考察现代软件系统这种无法再化约的本质所具有的四项固有属性：**复杂性、顺应性、可变性和不可见性**。

#### Complexity

> **复杂性**

Software entities are more complex for their size than perhaps any other human construct, because no two parts are alike (at least above the statement level). If they are, we make the two similar parts into one, a subroutine, open or closed. In this respect software systems differ profoundly from computers, buildings, or automobiles, where repeated elements abound.

> 相对于自身规模而言，软件实体或许比人类创造的其他任何东西都更复杂，因为其中没有两个部分完全相同，至少在语句以上的层次是如此。如果两个部分相同，我们就会把它们合并为一个子程序，无论是展开式的还是调用式的。在这一点上，软件系统与计算机、建筑或汽车有着根本差异，后者包含大量重复构件。

Digital computers are themselves more complex than most things people build; they have very large numbers of states. This makes conceiving, describing, and testing them hard. Software systems have orders of magnitude more states than computers do.

> 数字计算机本身就比人类制造的大多数东西更复杂，因为它具有极多的状态。这使得构思、描述和测试计算机都很困难。而软件系统的状态数量，又比计算机多出若干个数量级。

Likewise, a scaling-up of a software entity is not merely a repetition of the same elements in larger size; it is necessarily an increase in the number of different elements. In most cases, the elements interact with each other in some nonlinear fashion, and the complexity of the whole increases much more than linearly.

> 同样，扩大软件实体的规模，并不只是把相同元素重复堆叠起来；它必然意味着不同元素的数量增加。多数情况下，这些元素以某种非线性的方式相互作用，因此整体复杂性的增长远超线性。

The complexity of software is an **ESSENTIAL** property, **NOT** an accidental one. Hence descriptions of a software entity that abstract away its complexity often abstract away its essence. Mathematics and the physical sciences made great strides for three centuries by constructing simplified models of complex phenomena, deriving properties from the models, and verifying those properties experimentally. This worked because the complexities ignored in the models were not the essential properties of the phenomena. **It does NOT work when the complexities are the essence.**

> 软件的复杂性是**本质属性，而非附属属性**。因此，在描述软件实体时，如果把复杂性抽象掉，往往也就把它的本质抽象掉了。过去三个世纪里，数学和物理科学取得巨大进步，依靠的是为复杂现象建立简化模型，从模型中推导性质，再用实验验证。这种方法之所以有效，是因为模型忽略的复杂性，并不是现象的本质属性。**当复杂性本身就是本质时，这种方法就不再奏效。**

Many of the classical problems of developing software products derive from this essential complexity and its nonlinear increase with size. From the complexity comes the difficulty of communication among team members, which leads to product flaws, cost overruns, schedule delays. From the complexity comes the difficulty of enumerating, much less understanding, all the possible states of the program, and from that comes the unreliability. From the complexity of the functions comes the difficulty of invoking those functions, which makes programs hard to use. From complexity of structure comes the difficulty of extending programs to new functions without creating side effects. From the complexity of structure comes the unvisualized states that constitute security trapdoors.

> 软件产品开发中的许多经典问题，都源于这种本质性的复杂性，以及它随规模扩大的非线性增长。复杂性使团队成员难以沟通，进而导致产品缺陷、成本超支和进度延误；复杂性使人难以穷举程序的所有可能状态，更不用说理解这些状态，由此产生不可靠性。功能的复杂性使功能难以调用，因而程序难以使用。结构的复杂性使人难以扩展新功能而不引入副作用，也使某些未被察觉的状态成为安全后门。

Not only technical problems but management problems as well come from the complexity. This complexity makes overview hard, thus impeding conceptual integrity. It makes it hard to find and control all the loose ends. It creates the tremendous learning and understanding burden that makes personnel turnover a disaster.

> 复杂性带来的不仅是技术问题，还有管理问题。它使人难以把握全局，妨碍概念完整性；使人难以发现并控制所有尚未处理妥当的细节；还带来沉重的学习和理解负担，让人员流动变成一场灾难。

#### Conformity

> **顺应性**

Software people are not alone in facing complexity. Physics deals with terribly complex objects even at the "fundamental" particle level. The physicist labors on, however, in a firm faith that there are unifying principles to be found, whether in quarks or in unified field theories. Einstein repeatedly argued that there must be simplified explanations of nature, because God is not capricious or arbitrary.

> 面对复杂性的并不只有软件从业者。物理学即使在“基本”粒子的层次，也要处理极为复杂的对象。不过，无论研究夸克还是统一场论，物理学家都坚信存在可以发现的统一原理，并据此继续探索。爱因斯坦反复强调，自然界必定存在简洁的解释，因为上帝不会反复无常，也不会任意行事。

No such faith comforts the software engineer. Much of the complexity he must master is arbitrary complexity, forced without rhyme or reason by the many human institutions and systems to which his interfaces must conform. These differ from interface to interface, and from time to time, not because of necessity but only because they were designed by different people, rather than by God.

> 软件工程师却没有这样的信念可以慰藉自己。他必须驾驭的复杂性，有很大一部分是任意造成的：软件接口必须适应各种人为的机构和系统，而它们施加的要求往往毫无道理。这些要求因接口而异，也随时间变化，并非出于必然性，仅仅因为它们是由不同的人设计的，而不是由上帝设计的。

In many cases the software must conform because it has most recently come to the scene. In others it must conform because it is perceived as the most conformable. But in all cases, much complexity comes from conformation to other interfaces; this **CANNOT** be simplified out by any redesign of the software alone.

> 许多时候，软件必须适应其他系统，只因为它是最后加入的；另一些时候，则因为人们认为软件最容易调整。但无论是哪一种情况，大量复杂性都来自对其他接口的适应。**仅靠重新设计软件本身，无法消除这种复杂性。**

#### Changeability

> **可变性**

The software entity is constantly subject to pressures for change. Of course, so are buildings, cars, and computers. But manufactured things are infrequently changed after manufacture; they are superseded by later models, or essential changes are incorporated in later serial-number copies of the same basic design. Recalls of automobiles are really quite infrequent; field changes of computers somewhat less so. Both are much less frequent than modifications to fielded software.

> 软件实体不断承受变更压力。建筑、汽车和计算机当然也一样，但制造出来的产品在出厂后很少改动：它们通常由后续型号取代，或者将实质性改进纳入同一基本设计的后续批次。汽车召回实际上并不常见，计算机的现场改装略多一些，但两者都远不如已投入使用的软件修改频繁。

Partly this is because the software in a system embodies its function, and the function is the part that most feels the pressures of change. Partly it is because software can be changed more easily—it is pure thought-stuff, infinitely malleable. Buildings do in fact get changed, but the high costs of change, understood by all, serve to dampen the whim of the changers.

> 一部分原因是，软件承载着系统的功能，而功能正是最容易感受到变更压力的部分。另一部分原因是，软件比较容易修改：它是纯粹的思想产物，似乎可以无限塑造。建筑也确实会被改动，但人人都明白改建的代价很高，这会抑制那些随心所欲的修改念头。

**All successful software gets changed.** Two processes are at work. As a software product is found to be useful, people try it in new cases at the edge of, or beyond, the original domain. The pressures for extended function come chiefly from users who like the basic function and invent new uses for it.

> **所有成功的软件都会被修改。**这里有两个过程在起作用。首先，当一个软件产品被证明有用时，人们就会把它用于原定适用范围边缘、甚至范围之外的新情境。扩展功能的压力，主要来自喜欢其基本功能、并不断为它发现新用途的用户。

Second, successful software also survives beyond the normal life of the machine vehicle for which it is first written. If not new computers, then at least new disks, new displays, new printers come along; and the software must be conformed to its new vehicles of opportunity.

> 其次，成功软件的寿命，还会超过最初承载它的机器的正常使用寿命。即使没有换新计算机，至少也会出现新的磁盘、显示器和打印机；软件必须适应这些带来新机会的硬件载体。

In short, the software product is embedded in a cultural matrix of applications, users, laws, and machine vehicles. These all change continually, and their changes inexorably force change upon the software product.

> 总之，软件产品置身于由应用、用户、法律和硬件载体共同构成的文化环境中。这一切都在不断变化，而它们的变化必然迫使软件产品随之改变。

#### Invisibility

> **不可见性**

Software is invisible and unvisualizable. Geometric abstractions are powerful tools. The floor plan of a building helps both architect and client evaluate spaces, traffic flows, and views. Contradictions become obvious, omissions can be caught. Scale drawings of mechanical parts and stick-figure models of molecules, although abstractions, serve the same purpose. A geometric reality is captured in a geometric abstraction.

> 软件是不可见的，也无法被直接可视化。几何抽象是强有力的工具：建筑平面图帮助建筑师和客户评估空间、通行路线与视野，矛盾因此显而易见，遗漏也容易发现。机械零件的比例图和分子的棒状模型虽然也是抽象，却有着同样的作用：它们用几何抽象捕捉几何现实。

The reality of software is not inherently embedded in space. Hence it has no ready geometric representation in the way that land has maps, silicon chips have diagrams, computers have connectivity schematics. As soon as we attempt to diagram software structure, we find it to constitute not one, but several, general directed graphs, superimposed one upon another. The several graphs may represent the flow of control, the flow of data, patterns of dependency, time sequence, name-space relationships. These are usually not even planar, much less hierarchical. Indeed, one of the ways of establishing conceptual control over such structure is to enforce link cutting until one or more of the graphs becomes hierarchical.[^2]

> 软件的现实本身并不嵌入空间之中。因此，它不像土地有地图、硅芯片有图样、计算机有连接示意图那样，具有现成的几何表示。一旦试图画出软件结构，我们就会发现，它不是一张普通有向图，而是多张相互叠加的有向图。这些图可能分别表示控制流、数据流、依赖模式、时间顺序或命名空间关系。它们通常连平面图都不是，更不用说层次结构。事实上，要从概念上驾驭这种结构，一种办法就是强制切断部分连接，直到其中一张或多张图变成层次结构。

In spite of progress in restricting and simplifying the structures of software, they remain inherently unvisualizable, thus depriving the mind of some of its most powerful conceptual tools. This lack not only impedes the process of design within one mind, it severely hinders communication among minds.

> 尽管我们在约束和简化软件结构方面取得了进步，这些结构在本质上仍难以可视化，因而使人失去了一些最强大的概念思考工具。这个缺陷不仅妨碍个人头脑中的设计过程，也严重妨碍人与人之间的沟通。

### Past Breakthroughs Solved Accidental Difficulties

> **过去的突破解决了附属性困难**

If we examine the three steps in software technology that have been most fruitful in the past, we discover that each attacked a different major difficulty in building software, but they have been the **ACCIDENTAL**, **NOT** the essential, difficulties. We can also see the natural limits to the extrapolation of each such attack.

> 回顾过去软件技术中最有成效的三项进展，可以发现，它们各自解决了一项重大的软件构建困难，但解决的都是**附属性困难，而非本质性困难**。我们也能看到，把每一种方法的成效继续外推，会遇到怎样的自然极限。

#### High-level languages

> **高级语言**

Surely the most powerful stroke for software productivity, reliability, and simplicity has been the progressive use of high-level languages for programming. Most observers credit that development with at least a factor of five in productivity, and with concomitant gains in reliability, simplicity, and comprehensibility.

> 逐步采用高级编程语言，无疑是提升软件生产率、可靠性和简洁性最有力的一步。大多数观察者认为，这项发展至少使生产率提高到原来的五倍，同时也提升了可靠性、简洁性和可理解性。

What does a high-level language accomplish? It frees a program from much of its accidental complexity. An abstract program consists of conceptual constructs: operations, data types, sequences, and communication. The concrete machine program is concerned with bits, registers, conditions, branches, channels, disks, and such. To the extent that the high-level language embodies the constructs wanted in the abstract program and avoids all lower ones, it eliminates a whole level of complexity that was never inherent in the program at all.

> 高级语言究竟做了什么？它让程序摆脱了大量附属性复杂性。抽象程序由操作、数据类型、执行顺序和通信等概念结构组成，而具体的机器程序却要处理位、寄存器、条件、分支、通道和磁盘等事物。高级语言只要能够体现抽象程序所需的结构，并避开低层细节，就能消除一整个原本并非程序固有的复杂性层次。

The most a high-level language can do is to furnish all the constructs the programmer imagines in the abstract program. To be sure, the level of our sophistication in thinking about data structures, data types, and operations is steadily rising, but at an ever-decreasing rate. And language development approaches closer and closer to the sophistication of users.

> 高级语言所能做到的极限，是提供程序员在抽象程序中所设想的全部结构。我们对数据结构、数据类型和操作的理解当然在持续深化，但深化的速度越来越慢。编程语言的发展，也越来越接近使用者的思考水平。

Moreover, at some point the elaboration of a high-level language becomes a burden that **INCREASES**, **NOT** reduces, the intellectual task of the user who rarely uses the esoteric constructs.

> 而且，到了一定程度，高级语言日益繁复反而会成为负担：对于很少使用那些深奥结构的用户，它会**增加，而非减少**思考的工作量。

#### Time-sharing

> **分时系统**

Most observers credit time-sharing with a major improvement in the productivity of programmers and in the quality of their product, although not so large as that brought by high-level languages.

> 大多数观察者认为，分时系统显著提高了程序员的生产率及其产品质量，尽管其贡献不及高级语言。

Time-sharing attacks a distinctly different difficulty. Time-sharing preserves immediacy, and hence enables us to maintain an overview of complexity. The slow turnaround of batch programming means that we inevitably forget the minutiae, if not the very thrust, of what we were thinking when we stopped programming and called for compilation and execution. This interruption of consciousness is costly in time, for we must refresh. The most serious effect may well be the decay of grasp of all that is going on in a complex system.

> 分时系统针对的是另一种截然不同的困难。它保留了即时反馈，使我们能够维持对复杂系统的整体把握。批处理编程的周转很慢：当我们停下编写，提交编译和运行时，原先思考的细节难免逐渐遗忘，甚至连思路的主线也可能丢失。思维被打断会耗费时间，因为我们必须重新唤起记忆；更严重的影响，可能是对复杂系统中各项活动的整体掌握随之减弱。

Slow turn-around, like machine-language complexities, is an accidental rather than an essential difficulty of the software process. The limits of the contribution of time-sharing derive directly. The principal effect is to shorten system response time. As it goes to zero, at some point it passes the human threshold of noticeability, about 100 milliseconds. Beyond that no benefits are to be expected.

> 缓慢的周转，与机器语言的复杂性一样，是软件过程中的附属性困难，而非本质性困难。因此，分时系统的贡献也有直接可见的上限。它的主要作用是缩短系统响应时间；当响应时间趋近于零时，总会越过人类能够察觉的阈值，大约是一百毫秒。再往下缩短，就不能指望还有收益了。

#### Unified programming environments

> **统一编程环境**

Unix and Interlisp, the first integrated programming environments to come into widespread use, are perceived to have improved productivity by integral factors. Why?

> Unix 和 Interlisp 是最早得到广泛使用的集成编程环境，人们认为它们使生产率获得了数倍提高。为什么？

They attack the accidental difficulties of using programs together, by providing integrated libraries, unified file formats, and pipes and filters. As a result, conceptual structures that in principle could always call, feed, and use one another can indeed easily do so in practice.

> 它们通过集成程序库、统一文件格式，以及管道和过滤器，解决了程序协同使用中的附属性困难。于是，那些在原理上本就可以相互调用、传递数据和利用的概念结构，在实践中也真正能够轻松协作了。

This breakthrough in turn stimulated the development of whole toolbenches, since each new tool could be applied to any programs by using the standard formats.

> 这一突破又推动了整套工具工作台的发展，因为借助标准格式，每一件新工具都可以应用于任何程序。

Because of these successes, environments are the subject of much of today's software engineering research. We will look at their promise and limitations in the next section.

> 由于这些成功，编程环境成了当今软件工程研究的重要主题。下一节将讨论它的潜力与局限。

### Hopes for the Silver

> **寄望成为银弹的技术**

Now let us consider the technical developments that are most often advanced as potential silver bullets. What problems do they address? Are they the problems of essence, or are they remainders of our accidental difficulties? Do they offer revolutionary advances, or incremental ones?

> 现在，让我们考察那些最常被视为潜在银弹的技术发展。它们解决什么问题？是本质性问题，还是残存的附属性困难？它们带来的是革命性突破，还是渐进式改进？

#### Ada and other high-level language advances

> **Ada 及其他高级语言进展**

One of the most touted recent developments is the programming language Ada, a general-purpose, high-level language of the 1980s. Ada indeed not only reflects evolutionary improvements in language concepts but embodies features to encourage modern design and modularization concepts. Perhaps the Ada philosophy is more of an advance than the Ada language, for it is the philosophy of modularization, of abstract data types, of hierarchical structuring.

> 近来最受推崇的发展之一，是 Ada 这种二十世纪八十年代的通用高级语言。Ada 不仅体现了语言概念的逐步改进，也包含鼓励现代设计和模块化思想的特性。或许，Ada 的理念比语言本身更具进步意义，因为它提倡模块化、抽象数据类型和层次化结构。

Ada is perhaps over-rich, the natural product of the process by which requirements were laid on its design. That is not fatal, for subset working vocabularies can solve the learning problem, and hardware advances will give us the cheap MIPS to pay for the compiling costs. Advancing the structuring of software systems is indeed a very good use for the increased MIPS our dollars will buy. Operating systems, loudly decried in the 1960s for their memory and cycle costs, have proved to be an excellent form in which to use some of the MIPS and cheap memory bytes of the past hardware surge.

> Ada 的功能可能过于丰富，这也是其设计不断承接各项需求的自然结果。但这并非致命问题：只选用一个功能子集，就能解决学习负担；硬件进步也会提供廉价的计算能力，抵消编译成本。用同样的钱可以买到更多每秒百万条指令的处理能力，将其用于改善软件系统的结构，无疑是明智的用途。操作系统在二十世纪六十年代曾因占用内存和处理器时间而受到猛烈批评，事实却证明，用它来消化硬件飞跃带来的一部分计算能力与廉价内存，是极好的选择。

Nevertheless, Ada will **NOT** prove to be the silver bullet that slays the software productivity monster. It is, after all, just another high-level language, and the biggest payoff from such languages came from the first transition, up from the accidental complexities of the machine into the more abstract statement of step-by-step solutions. Once those accidents have been removed, the remaining ones are smaller, and the payoff from their removal will surely be less.

> 尽管如此，Ada **不会**成为杀死软件生产率怪物的银弹。它毕竟只是另一种高级语言，而这类语言最大的收益，来自最初的跨越：从机器的附属性复杂性，提升到以更抽象的方式逐步描述解决方案。一旦这些附属性困难被清除，剩余问题就小得多，消除它们的收益也必然较小。

I predict that a decade from now, when the effectiveness of Ada is assessed, it will be seen to have made a substantial difference, but not because of any particular language feature, nor indeed because of all of them combined. Neither will the new Ada environment prove to be the cause of the improvements. Ada's greatest contribution will be that switching to it occasioned training programmers in modern software design techniques.

> 我预测，十年后评估 Ada 的成效时，人们会发现它确实带来了显著改变，但原因既不是某一项语言特性，也不是所有特性的总和，甚至不是新的 Ada 环境。Ada 最大的贡献将是：转向使用它，促使程序员接受了现代软件设计方法的训练。

#### Object-oriented programming

> **面向对象编程**

Many students of the art hold out more hope for object-oriented programming than for any of the other technical fads of the day.[^3] I am among them. Mark Sherman of Dartmouth notes that we must be careful to distinguish two separate ideas that go under that name: abstract data types and hierarchical types, also called classes. The concept of the abstract data type is that an object's type should be defined by a name, a set of proper values, and a set of proper operations, rather than its storage structure, which should be hidden. Examples are Ada packages (with private types) or Modula's modules.

> 许多研究软件技术的人，对面向对象编程寄予的希望，超过了当下其他任何技术潮流。我也在其中。达特茅斯的马克·谢尔曼提醒我们，必须仔细区分这一名称下的两个不同概念：抽象数据类型，以及又称为类的层次化类型。抽象数据类型的含义是：对象的类型应由名称、一组合法值和一组合法操作来定义，而不是由其存储结构定义；存储结构应该隐藏起来。Ada 中带私有类型的包，以及 Modula 的模块，都是例子。

Hierarchical types, such as Simula-67's classes, allow the definition of general interfaces that can be further refined by providing subordinate types. The two concepts are orthogonal—there may be hierarchies without hiding and hiding without hierarchies. Both concepts represent real advances in the art of building software.

> 层次化类型，例如 Simula-67 的类，允许先定义通用接口，再通过提供下级类型来进一步细化。这两个概念彼此独立：可以有层次而没有隐藏，也可以有隐藏而没有层次。两者都代表了软件构建技术的实质进步。

Each removes one more accidental difficulty from the process, allowing the designer to express the essence of his design without having to express large amounts of syntactic material that add no new information content. For both abstract types and hierarchical types, the result is to remove a higher-order sort of accidental difficulty and allow a higher-order expression of design.

> 它们各自消除了一种附属性困难，使设计者能够表达设计的本质，而不必写下大量不增加任何信息内容的语法材料。无论抽象类型还是层次化类型，其作用都是去除更高层次的附属性困难，让设计得以在更高层次上表达。

Nevertheless, such advances can do no more than to remove all the accidental difficulties from the expression of the design. **The complexity of the design itself is ESSENTIAL; and such attacks make NO change whatever in that.** An order-of-magnitude gain can be made by object-oriented programming **ONLY IF** the unnecessary underbrush of type specification remaining today in our programming language is itself responsible for nine-tenths of the work involved in designing a program product. I doubt it.

> 不过，这些进展至多只能消除设计表达中的全部附属性困难。**设计本身的复杂性属于本质，这些方法完全没有改变它。**面向对象编程**只有在**现有编程语言中那些不必要的类型说明负担，占到程序产品设计工作量的十分之九时，才可能带来一个数量级的提升。我对此表示怀疑。

#### Artificial intelligence

> **人工智能**

Many people expect advances in artificial intelligence to provide the revolutionary breakthrough that will give order-of-magnitude gains in software productivity and quality.[^4] I do **NOT**. To see why, we must dissect what is meant by "artificial intelligence" and then see how it applies.

> 许多人期待人工智能的进步带来革命性突破，使软件生产率和质量提高一个数量级。我**不这样认为**。要理解原因，必须先剖析“人工智能”的含义，再考察它如何应用。

Parnas has clarified the terminological chaos:

> 帕纳斯澄清了这一术语上的混乱：

> Two quite different definitions of AI are in common use today. AI-1: The use of computers to solve problems that previously could only be solved by applying human intelligence. AI-2: The use of a specific set of programming techniques known as heuristic or rule-based programming. In this approach human experts are studied to determine what heuristics or rules of thumb they use in solving problems… The program is designed to solve a problem the way that humans seem to solve it.

> 如今通常使用两种截然不同的人工智能定义。AI-1：利用计算机解决以往只能运用人类智能才能解决的问题。AI-2：使用一组特定的编程技术，即启发式编程或基于规则的编程。在后一种方法中，人们研究人类专家，弄清他们解决问题时采用哪些启发式方法或经验规则……然后设计程序，让它按照人类看起来所采用的方式解决问题。

> The first definition has a sliding meaning… Something can fit the definition of AI-1 today but, once we see how the program works and understand the problem, we will not think of it as AI anymore… Unfortunately I cannot identify a body of technology that is unique to this field… Most of the work is problem-specific, and some abstraction or creativity is required to see how to transfer it.[^5]

> 第一种定义的含义会不断移动……某件事今天可以符合 AI-1 的定义，但一旦我们看清程序如何工作、理解了问题，就不再把它视为人工智能……遗憾的是，我无法指出一套为这一领域所独有的技术体系……大多数工作都针对具体问题；要看出如何把它迁移到其他问题上，仍然需要一定的抽象能力或创造力。

I agree completely with this critique. The techniques used for speech recognition seem to have little in common with those used for image recognition, and both are different from those used in expert systems. I have a hard time seeing how image recognition, for example, will make any appreciable difference in programming practice. The same is true of speech recognition. **The hard thing about building software is deciding what to say, NOT saying it.** No facilitation of expression can give more than marginal gains.

> 我完全赞同这番批评。语音识别使用的技术，与图像识别的技术似乎没有多少共同之处，而这两者又都不同于专家系统所用的技术。例如，我很难看出图像识别会怎样给编程实践带来明显改变；语音识别也是如此。**构建软件的困难，在于决定要说什么，而不是把它说出来。**无论怎样便利表达，带来的收益都只能是有限的。

Expert systems technology, AI-2, deserves a section of its own.

> 专家系统技术，也就是 AI-2，值得单独讨论。

#### Expert systems

> **专家系统**

The most advanced part of the artificial intelligence art, and the most widely applied, is the technology for building expert systems. Many software scientists are hard at work applying this technology to the software-building environment.[^6] What is the concept, and what are the prospects?

> 人工智能技术中最先进、应用最广泛的部分，是构建专家系统的技术。许多软件科学家正努力将它应用于软件开发环境。这一概念是什么？前景又如何？

An expert system is a program containing a generalized inference engine and a rule base, designed to take input data and assumptions and explore the logical consequences through the inferences derivable from the rule base, yielding conclusions and advice, and offering to explain its results by retracing its reasoning for the user. The inference engines typically can deal with fuzzy or probabilistic data and rules in addition to purely deterministic logic.

> 专家系统是一种包含通用推理引擎和规则库的程序。它接收输入数据与假设，利用规则库中可推导的规则探索逻辑后果，得出结论和建议，并可向用户重现推理过程，解释结果。除了纯粹确定性的逻辑外，推理引擎通常还能够处理模糊或带概率的数据与规则。

Such systems offer some clear advantages over programmed algorithms for arriving at the same solutions to the same problems:

> 对于同样的问题，要得到同样的解答，这类系统相比直接编写算法有一些明显优势：

- Inference engine technology is developed in an application-independent way, and then applied to many uses. One can justify much more effort on the inference engines. Indeed, that technology is well advanced.

  > 推理引擎技术的开发独立于具体应用，随后可用于许多不同用途。因此，投入更多精力开发推理引擎是值得的。事实上，这项技术已经相当成熟。

- The changeable parts of the application-peculiar materials are encoded in the rule base in a uniform fashion, and tools are provided for developing, changing, testing, and documenting the rule base. This regularizes much of the complexity of the application itself.

  > 应用特有内容中容易变化的部分，以统一方式编码进规则库，并有工具支持规则库的开发、修改、测试和文档编写。这使应用本身的大量复杂性得以按统一规范处理。

Edward Feigenbaum says that the power of such systems does **NOT** come from ever-fancier inference mechanisms, **BUT** rather from ever-richer knowledge bases that reflect the real world more accurately. I believe the most important advance offered by the technology is the separation of the application complexity from the program itself.

> 爱德华·费根鲍姆说，这类系统的力量，**不是**来自越来越花哨的推理机制，**而是**来自越来越丰富、能够更准确反映现实世界的知识库。我认为，这项技术最重要的进步，是把应用的复杂性与程序本身分离开来。

How can this be applied to the software task? In many ways: suggesting interface rules, advising on testing strategies, remembering bug-type frequencies, offering optimization hints, etc.

> 它可以怎样用于软件工作？方式很多：提出接口规则建议、指导测试策略、记住各类缺陷的出现频率，以及提供优化提示等。

Consider an imaginary testing advisor, for example. In its most rudimentary form, the diagnostic expert system is very like a pilot's checklist, fundamentally offering suggestions as to possible causes of difficulty. As the rule base is developed, the suggestions become more specific, taking more sophisticated account of the trouble symptoms reported. One can visualize a debugging assistant that offers very generalized suggestions at first, but as more and more system structure is embodied in the rule base, becomes more and more particular in the hypotheses it generates and the tests it recommends.

> 例如，设想一个测试顾问。在最简陋的形式下，这种诊断专家系统很像飞行员的检查清单，主要提示困难可能来自哪些原因。随着规则库不断发展，它会更细致地考虑所报告的故障症状，给出越来越具体的建议。我们可以设想一个调试助手：起初只提供非常笼统的建议，但随着规则库纳入越来越多的系统结构信息，它提出的假设和推荐的测试会越来越有针对性。

Such an expert system may depart most radically from the conventional ones in that its rule base should probably be hierarchically modularized in the same way the corresponding software product is, so that as the product is modularly modified, the diagnostic rule base can be modularly modified as well.

> 这种专家系统与传统专家系统最大的不同，可能在于：它的规则库应当像对应的软件产品一样，采用层次化的模块结构。这样，当产品按模块修改时，诊断规则库也能按模块修改。

The work required to generate the diagnostic rules is work that will have to be done anyway in generating the set of test cases for the modules and for the system. If it is done in a suitably general manner, with a uniform structure for rules and a good inference engine available, it may actually reduce the total labor of generating bring-up test cases, as well as helping in lifelong maintenance and modification testing. In the same way, we can postulate other advisors—probably many of them, and probably simple ones—for the other parts of the software construction task.

> 生成诊断规则所需的工作，本来就必须在为模块和整个系统设计测试用例时完成。如果采用足够通用的方法，配合统一的规则结构和良好的推理引擎，就可能减少生成初次调试测试用例的总工作量，并有助于软件整个生命周期中的维护和修改测试。同理，我们也可以为软件构建的其他环节设想辅助顾问；它们可能数量很多，但每一个都比较简单。

Many difficulties stand in the way of early realization of useful expert advisors to the program developer. A crucial part of our imaginary scenario is the development of easy ways to get from program structure specification to the automatic or semi-automatic generation of diagnostic rules. Even more difficult and important is the twofold task of knowledge acquisition: finding articulate, self-analytical experts who know why they do things; and developing efficient techniques for extracting what they know and distilling it into rule bases. *The essential prerequisite for building an expert system is to have an expert.*

> 要尽快为程序开发者提供实用的专家顾问，仍有许多困难需要克服。在我们的设想中，一个关键环节是找到简便的方法，根据程序结构的规格说明，自动或半自动地生成诊断规则。更困难、也更重要的，是知识获取的双重任务：找到表达清楚、善于自我分析、知道自己为何这样做的专家；再开发有效方法，提取他们的知识，并将其提炼成规则库。*构建专家系统的首要前提，是先有专家。*

The most powerful contribution of expert systems will surely be to put at the service of the inexperienced programmer the experience and accumulated wisdom of the best programmers. This is no small contribution. The gap between the best software engineering practice and the average practice is very wide—perhaps wider than in any other engineering discipline. A tool that disseminates good practice would be important.

> 专家系统最有力的贡献，无疑是让经验不足的程序员也能利用顶尖程序员的经验和积累的智慧。这绝不是小贡献。软件工程中最佳实践与平均实践之间的差距非常大，可能比其他任何工程领域都大。能够传播良好实践的工具，必定十分重要。

#### “Automatic” programming

> **“自动”编程**

For almost 40 years, people have been anticipating and writing about "automatic programming", the generation of a program for solving a problem from a statement of the problem specifications. Some people today write as if they expected this technology to provide the next breakthrough.[^7]

> 将近四十年来，人们一直在期待和讨论“自动编程”：根据问题规格的陈述，自动生成解决该问题的程序。如今有些人的论述，仿佛仍在期待这项技术带来下一次突破。

Parnas implies that the term is used for glamour and not semantic content, asserting,

> 帕纳斯认为，这个术语主要是为了吸引人，而不是传达实质含义。他断言：

> *In short, automatic programming always has been a euphemism for programming with a higher-level language than was presently available to the programmer.*[^8]

> *简言之，所谓自动编程，一直不过是一个好听的说法，指的是用比程序员当时能够使用的语言更高级的语言编程。*

He argues, in essence, that in most cases it is the **SOLUTION METHOD**, **NOT** the problem, whose specification has to be given.

> 他的核心论点是：多数情况下，必须明确说明的**是解决方法，而非问题本身**。

Exceptions can be found. The technique of building generators is very powerful, and it is routinely used to good advantage in programs for sorting. Some systems for integrating differential equations have also permitted direct specification of the problem. The system assessed the parameters, chose from a library of methods of solution, and generated the programs.

> 当然也有例外。构建程序生成器是一种很有力的技术，已经经常用于生成排序程序，并取得良好效果。有些求解微分方程的系统，也允许直接描述问题：系统评估参数，从方法库中选择求解方法，然后生成程序。

These applications have very favorable properties:

> 这些应用具有十分有利的特点：

- The problems are readily characterized by relatively few parameters.

  > 只用相对较少的参数，就能清楚地刻画问题。

- There are many known methods of solution to provide a library of alternatives.

  > 已有许多已知的求解方法，可以组成备选方法库。

- Extensive analysis has led to explicit rules for selecting solution techniques, given problem parameters.

  > 经过大量分析，人们已经建立了明确规则，可以根据问题参数选择求解技术。

It is hard to see how such techniques generalize to the wider world of the ordinary software system, where cases with such neat properties are the exception. It is hard even to imagine how this breakthrough in generalization could conceivably occur.

> 很难看出这些技术如何推广到更广阔的普通软件系统领域，因为具有上述整齐特性的情况，在那里只是例外。甚至很难想象，究竟怎样才能在这种通用化上取得突破。

#### Graphical programming

> **图形化编程**

A favorite subject for Ph.D. dissertations in software engineering is graphical, or visual, programming, the application of computer graphics to software design.[^9] Sometimes the promise of such an approach is postulated from the analogy with VLSI chip design, where computer graphics plays so fruitful a role. Sometimes the approach is justified by considering flowcharts as the ideal program design medium, and providing powerful facilities for constructing them.

> 软件工程博士论文中的一个热门课题，是图形化或可视化编程，也就是将计算机图形技术用于软件设计。人们有时通过类比超大规模集成电路芯片设计，推测这种方法的潜力，因为计算机图形技术在芯片设计中发挥了卓越作用。另一些时候，人们把流程图视为理想的程序设计媒介，并以提供强大的流程图构建工具为由，支持这种方法。

Nothing even convincing, much less exciting, has yet emerged from such efforts. I am persuaded that nothing will.

> 这些努力至今还没有拿出令人信服的成果，更不用说令人兴奋的成果。我确信，今后也不会有。

In the first place, as I have argued elsewhere, the flow chart is a very poor abstraction of software structure.[^10] Indeed, it is best viewed as Burks, von Neumann, and Goldstine's attempt to provide a desperately needed high-level control language for their proposed computer. In the pitiful, multipage, connection-boxed form to which the flow chart has today been elaborated, it has proved to be essentially useless as a design tool: programmers draw flow charts **AFTER**, **NOT BEFORE**, writing the programs they describe.

> 首先，正如我在别处所论述的，流程图对软件结构的抽象十分糟糕。更恰当的理解是：伯克斯、冯·诺依曼和戈尔德斯坦，当时迫切需要一种高级控制语言来描述他们计划建造的计算机，流程图正是这种尝试的产物。如今，流程图演变成一种可怜的形式：跨越许多页面，布满连接框。事实证明，它作为设计工具基本无用：程序员往往在程序写完**之后，而非之前**，才补画描述该程序的流程图。

Second, the screens of today are too small, in pixels, to show both the scope and the resolution of any serious detailed software diagram. The so-called "desktop metaphor" of today's workstation is instead an "airplane-seat" metaphor. Anyone who has shuffled a lapful of papers while seated in a coach between two portly passengers will recognize the difference—one can see only a very few things at once. The true desktop provides overview of and random access to a score of pages. Moreover, when fits of creativity run strong, more than one programmer or writer has been known to abandon the desktop for the more spacious floor. The hardware technology will have to advance quite substantially before the scope of our scopes is sufficient to the software design task.

> 其次，以像素衡量，今天的屏幕太小，无法同时呈现一张真正详尽的软件图所需的范围和精度。如今工作站所谓的“桌面隐喻”，其实更像“飞机座位隐喻”。任何曾在经济舱里夹在两位胖乘客之间、翻动膝上一堆文件的人，都会明白其中差别：你一次只能看到寥寥几样东西。真正的桌面则能让你纵览二十来页材料，并随手取阅任何一页。此外，创作灵感旺盛时，不少程序员或作家还会离开桌面，转用更宽敞的地板。在显示设备的视野足以承担软件设计任务之前，硬件技术还必须取得相当大的进步。

More fundamentally, as I have argued above, software is very difficult to visualize. Whether we diagram control flow, variable scope nesting, variable cross-references, data flow, hierarchical data structures, or whatever, we feel only one dimension of the intricately interlocked software elephant. If we superimpose all the diagrams generated by the many relevant views, it is difficult to extract any global overview. The VLSI analogy is fundamentally misleading—a chip design is a layered two-dimensional object whose geometry reflects its essence. A software system is **NOT**.

> 更根本的是，正如前文所说，软件极难可视化。无论画的是控制流、变量作用域的嵌套、变量的交叉引用、数据流、层次化数据结构，还是其他内容，我们都只是摸到了这头结构交错的软件巨象的一个侧面。如果把各种相关视角生成的图全部叠加起来，也很难获得整体认识。拿超大规模集成电路作类比，从根本上就是误导：芯片设计是一个分层的二维对象，其几何结构反映了它的本质；**软件系统却不是。**

#### Program verification

> **程序验证**

Much of the effort in modern programming goes into the testing and repair of bugs. Is there perhaps a silver bullet to be found by eliminating the errors at the source, in the system design phase? Can both productivity and product reliability be radically enhanced by following the profoundly different strategy of proving designs correct before the immense effort is poured into implementing and testing them?

> 现代编程的大量工作，都花在测试和修复缺陷上。那么，能否在源头，也就是系统设计阶段，消除错误，从而找到银弹？如果采用一种截然不同的策略，在投入巨量实施与测试工作之前，先证明设计正确，是否就能大幅提升生产率与产品可靠性？

I do not believe we will find the magic here. Program verification is a very powerful concept, and it will be very important for such things as secure operating system kernels. The technology does not promise, however, to save labor. Verifications are so much work that only a few substantial programs have ever been verified.

> 我不认为这里会出现奇迹。程序验证是一个非常有力的概念，对于安全操作系统内核之类的系统，它将十分重要。不过，这项技术并不意味着节省人力。验证的工作量极大，因此真正经过验证的较大规模程序迄今只有少数。

Program verification does **NOT** mean error-proof programs. There is no magic here, either. Mathematical proofs also can be faulty. So whereas verification might reduce the program-testing load, it **CANNOT** eliminate it.

> 程序验证**不等于**程序绝不会出错。这里同样没有魔法，数学证明也可能有错。因此，验证或许能够减少程序测试的负担，却**不能**消除测试。

More seriously, **even perfect program verification can ONLY establish that a program meets its specification.** The hardest part of the software task is arriving at a complete and consistent specification, and much of the essence of building a program is in fact the debugging of the specification.

> 更重要的是，**即使程序验证完全正确，也只能证明程序符合规格说明。**软件任务最困难的部分，是获得完整且一致的规格说明；构建程序的许多本质性工作，实际上是在为规格说明“除错”。

#### Environments and tools

> **环境与工具**

How much more gain can be expected from the exploding researches into better programming environments? One's instinctive reaction is that the big-payoff problems were the first attacked, and have been solved: hierarchical file systems, uniform file formats so as to have uniform program interfaces, and generalized tools. Language-specific smart editors are developments not yet widely used in practice, but the most they promise is freedom from syntactic errors and simple semantic errors.

> 针对更好编程环境的研究正在激增，我们还能期待多大的收益？直觉上，那些回报最大的难题早已被优先处理并解决了：层次化文件系统、用统一文件格式实现统一程序接口，以及通用工具。面向特定语言的智能编辑器还未在实践中广泛应用，但它们最多也只是让人免于语法错误和简单的语义错误。

Perhaps the biggest gain yet to be realized in the programming environment is the use of integrated database systems to keep track of the myriads of details that must be recalled accurately by the individual programmer and kept current in a group of collaborators on a single system.

> 编程环境中尚待实现的最大收益，可能是利用集成数据库系统，追踪海量细节：单个程序员必须准确记住这些细节，共同开发一个系统的协作团队也必须让这些细节保持最新。

Surely this work is worthwhile, and surely it will bear some fruit in both productivity and reliability. But by its very nature, the return from now on must be marginal.

> 这项工作当然值得做，也必然会在生产率和可靠性上有所收获。但从其本性来看，今后的回报只能是有限的。

#### Workstations

> **工作站**

What gains are to be expected for the software art from the certain and rapid increase in the power and memory capacity of the individual workstation? Well, how many MIPS can one use fruitfully? The composition and editing of programs and documents is fully supported by today's speeds. Compiling could stand a boost, but a factor of 10 in machine speed would surely leave think-time the dominant activity in the programmer's day. Indeed, it appears to be so now.

> 个人工作站的计算能力和内存容量，必定会快速增长；这能给软件技术带来什么收益？人究竟能有效利用多少每秒百万条指令的处理能力？今天的速度已经足以支持程序和文档的撰写与编辑。编译还可以再快些，但如果机器速度提高十倍，程序员一天中占主导的活动，肯定就只剩思考了。事实上，如今似乎已经如此。

More powerful workstations we surely welcome. Magical enhancements from them we **CANNOT** expect.

> 更强大的工作站，我们当然欢迎；指望它带来神奇的提升，则**不可能**。

### Promising Attacks on the Conceptual Essence

> **直面概念本质的有望途径**

Even though no technological breakthrough promises to give the sort of magical results with which we are so familiar in the hardware area, there is both an abundance of good work going on now, and the promise of steady, if unspectacular progress.

> 虽然没有哪项技术突破，有望带来硬件领域中那些我们习以为常的神奇效果，但眼下仍有大量有价值的工作正在进行，也仍有希望取得稳步前进，尽管并不惊人。

All of the technological attacks on the accidents of the software process are fundamentally limited by the productivity equation:

> 所有针对软件过程中附属性困难的技术手段，都受到下面这个生产率公式的根本限制：

> Task time = Σᵢ (frequencyᵢ × timeᵢ)

> 任务总时间 = Σᵢ（第 i 项活动的发生次数 × 该项活动每次所需时间）

If, as I believe, the conceptual components of the task are now taking most of the time, then no amount of activity on the task components that are merely the expression of the concepts can give large productivity gains.

> 如果像我所认为的那样，任务中的概念性工作如今占据了大部分时间，那么，无论怎样改进那些仅仅用于表达概念的工作，都无法带来很大的生产率提升。

Hence we must consider those attacks that address the essence of the software problem, the formulation of these complex conceptual structures. Fortunately, some of these are very promising.

> 因此，我们必须考虑直接针对软件问题本质的方法，也就是针对这些复杂概念结构如何形成的方法。幸运的是，其中有些很有希望。

#### Buy versus build

> **购买还是自建**

*The most radical possible solution for constructing software is not to construct it at all.*

> *解决软件构建问题最彻底的办法，就是根本不去构建它。*

Every day this becomes easier, as more and more vendors offer more and better software products for a dizzying variety of applications. While we software engineers have labored on production methodology, the personal computer revolution has created not one, but many, mass markets for software. Every newsstand carries monthly magazines which, sorted by machine type, advertise and review dozens of products at prices from a few dollars to a few hundred dollars. More specialized sources offer very powerful products for the workstation and other Unix markets. Even software tools and environments can be bought off-the-shelf. I have elsewhere proposed a market place for individual modules.

> 这样做一天比一天容易，因为越来越多的供应商，正在为种类繁多的应用提供更多、更好的软件产品。就在我们这些软件工程师埋头研究生产方法时，个人计算机革命已经创造出不止一个，而是许多个软件大众市场。每个报刊亭都有月刊，按机器类型刊登广告和评论，介绍几十种价格从几美元到几百美元的软件产品。更专业的渠道则为工作站和其他 Unix 市场提供功能强大的产品。就连软件工具和开发环境，也可以买到现成的。我曾在别处提出，为单个软件模块建立一个市场。

Any such product is cheaper to buy than to build afresh. Even at a cost of \$100,000, a purchased piece of software is costing only about as much as one programmer-year. And delivery is immediate! Immediate at least for products that really exist, products whose developer can refer the prospect to a happy user. Moreover, such products tend to be much better documented and somewhat better maintained than homegrown software.

> 购买这些产品，总比从头构建便宜。即使花十万美元购买一套软件，也不过相当于一名程序员一年的成本。而且可以立即交付！至少，对那些真正存在、开发者能够向潜在客户介绍满意用户的产品而言，是如此。此外，这些产品的文档通常比自行开发的软件完善得多，维护也往往更好一些。

The development of the mass market is, I believe, the most profound long-run trend in software engineering. **The cost of software has always been development cost, NOT replication cost.** Sharing that cost among even a few users radically cuts the per-user cost. Another way of looking at it is that the use of n copies of a software system effectively multiplies the productivity of its developers by n. That is an enhancement of the productivity of the discipline and of the nation.

> 我认为，大众市场的发展，是软件工程最深刻的长期趋势。**软件的成本始终在于开发，而非复制。**即使只让少数用户分摊开发成本，也能大幅降低每位用户的成本。换个角度说，一个软件系统被使用 n 份，实际上就使其开发者的生产率放大了 n 倍。这既提升了整个行业的生产率，也提升了国家的生产率。

The key issue, of course, is applicability. Can I use an available off-the-shelf package to do my task? A surprising thing has happened here. During the 1950s and 1960s, study after study showed that users would not use off-the-shelf packages for payroll, inventory control, accounts receivable, etc. The requirements were too specialized, the case-to-case variation too high. During the 1980s, we find such packages in high demand and widespread use. What has changed?

> 关键问题当然是适用性：我能用现成的软件包完成自己的任务吗？在这方面，发生了一件令人惊讶的事。二十世纪五六十年代，一项又一项研究表明，用户不愿使用现成的工资、库存控制、应收账款等软件包，因为需求太特殊，不同场景之间的差异太大。到了八十年代，这些软件包却需求旺盛、应用广泛。究竟发生了什么变化？

Not really the packages. They may be somewhat more generalized and somewhat more customizable than formerly, but not much. Not really the applications, either. If anything, the business and scientific needs of today are more diverse, more complicated than those of 20 years ago.

> 主要并不是软件包变了。它们可能比过去更通用、更便于定制，但变化并不大。应用本身也没有发生那样的变化。真要说起来，今天的商业和科学需求，比二十年前还更多样、更复杂。

The big change has been in the hardware/software cost ratio. The buyer of a \$2 million machine in 1960 felt that he could afford \$250,000 more for a customized payroll program, one that slipped easily and nondisruptively into the computer-hostile social environment. Buyers of \$50,000 office machines today cannot conceivably afford customized payroll programs; so they adapt their payroll procedures to the packages available. Computers are now so commonplace, if not yet so beloved, that the adaptations are accepted as a matter of course.

> 真正显著的变化，是硬件与软件的成本比。1960 年购买一台两百万美元计算机的人，会觉得再花二十五万美元定制工资程序也负担得起，以便让它轻松融入那个对计算机怀有抵触的社会环境，而不引起扰动。今天购买五万美元办公计算机的人，则根本不可能负担定制工资程序，因此，他们会调整工资处理流程，适应现成的软件包。计算机如今已经十分普遍，即使还谈不上人见人爱，这类调整也已被视为理所当然。

There are dramatic exceptions to my argument that the generalization of the software packages has changed little over the years: electronic spreadsheets and simple database systems. These powerful tools, so obvious in retrospect and yet so late appearing, lend themselves to myriad uses, some quite unorthodox. Articles and even books now abound on how to tackle unexpected tasks with the spreadsheet. Large numbers of applications that would formerly have been written as custom programs in Cobol or Report Program Generator are now routinely done with these tools.

> 我说软件包的通用性多年来变化不大，也有突出的例外：电子表格和简单的数据库系统。这些强大工具，事后看来如此显而易见，却又出现得那么晚；它们能用于无数用途，其中一些相当出人意料。如今，讲解如何用电子表格完成意外任务的文章乃至书籍，已经大量出现。过去许多必须用 Cobol 或报表程序生成语言编写定制程序的应用，现在都可以惯常地用这些工具完成。

Many users now operate their own computers day in and day out on varied applications without ever writing a program. Indeed, many of these users cannot write new programs for their machines, but they are nevertheless adept at solving new problems with them.

> 许多用户如今每天都在自己的计算机上处理各种应用，却从来不写程序。事实上，其中很多人根本不会为计算机编写新程序，但仍善于用它解决新问题。

I believe the single most powerful software productivity strategy for many organizations today is to equip the computer-naïve intellectual workers on the firing line with personal computers and good generalized writing, drawing, file and spreadsheet programs, and turn them loose. The same strategy, with simple programming capabilities, will also work for hundreds of laboratory scientists.

> 我相信，对今天许多组织而言，提升软件生产率最有力的单一策略，是给一线那些不熟悉计算机的知识工作者配备个人计算机，以及优质、通用的文字处理、绘图、文件管理和电子表格程序，然后放手让他们去用。同样的策略，辅以简单编程能力，也适用于数以百计的实验室科学家。

#### Requirements refinement and rapid prototyping

> **需求细化与快速原型**

**The hardest single part of building a software system is deciding precisely what to build.** No other part of the conceptual work is so difficult as establishing the detailed technical requirements, including all the interfaces to people, to machines, and to other software systems. No other part of the work so cripples the resulting system if done wrong. No other part is more difficult to rectify later.

> **构建软件系统最困难的一件事，就是准确决定究竟要构建什么。**在概念性工作中，没有哪一部分比确定详细的技术需求更难，其中包括系统与人、机器及其他软件系统之间的全部接口。也没有哪一部分一旦做错，会给最终系统造成同样严重的损害；更没有哪一部分在事后同样难以补救。

Therefore the most important function that software builders do for their clients is the iterative extraction and refinement of the product requirements. For the truth is, the clients do not know what they want. They usually do not know what questions must be answered, and they almost never have thought of the problem in the detail that must be specified. Even the simple answer—"Make the new software system work like our old manual information-processing system" —is in fact too simple. Clients never want exactly that.

> 因此，软件构建者为客户提供的最重要服务，是反复提取和细化产品需求。事实是，客户并不知道自己究竟想要什么。他们通常不知道必须回答哪些问题，也几乎从未把问题思考到规格说明所要求的细致程度。即使是“让新软件系统像旧的人工信息处理系统那样工作”这个看似简单的答案，实际上也过于简单；客户从来不是原封不动地想要旧系统。

Complex software systems are, moreover, things that act, that move, that work. The dynamics of that action are hard to imagine. So in planning any software activity, it is necessary to allow for an extensive iteration between the client and the designer as part of the system definition.

> 而且，复杂软件系统会行动、会运转、会工作，其动态行为很难凭空想象。因此，在规划任何软件活动时，都必须把客户与设计者之间充分的反复迭代，纳入系统定义过程。

I would go a step further and assert that it is really **IMPOSSIBLE** for clients, even those working with software engineers, to specify completely, precisely, and correctly the exact requirements of a modern software product before having built and tried some versions of the product they are specifying.

> 我愿意进一步断言：在构建并试用过正在定义的产品的若干版本之前，客户即使与软件工程师一起工作，也**不可能**完整、精确且正确地说明现代软件产品的全部确切需求。

Therefore one of the most promising of the current technological efforts, and one which attacks the **ESSENCE**, **NOT** the accidents, of the software problem, is the development of approaches and tools for rapid prototyping of systems as part of the iterative specification of requirements.

> 因此，当前最有希望的技术努力之一，是开发用于系统快速原型的方法和工具，把它们纳入迭代式需求定义。这种努力针对的是软件问题的**本质，而非附属性困难**。

A prototype software system is one that simulates the important interfaces and performs the main functions of the intended system, while not being necessarily bound by the same hardware speed, size, or cost constraints. Prototypes typically perform the mainline tasks of the application, but make no attempt to handle the exceptions, respond correctly to invalid inputs, abort cleanly, etc. **The purpose of the prototype is to make real the conceptual structure specified, so that the client can test it for consistency and usability.**

> 软件原型系统会模拟目标系统的重要接口，实现主要功能，但不一定受同样的硬件速度、容量或成本约束。原型通常只执行应用的主要任务，不试图处理异常、正确响应无效输入，或干净地中止运行等。**原型的目的，是让规格说明中的概念结构变得可操作，使客户能够检验其一致性与可用性。**

Much of present-day software acquisition procedures rests upon the assumption that one can specify a satisfactory system in advance, get bids for its construction, have it built, and install it. I think this assumption is fundamentally wrong, and that many software acquisition problems spring from that fallacy. Hence they cannot be fixed without fundamental revision, one that provides for iterative development and specification of prototypes and products.

> 今天许多软件采购流程，建立在这样一个假设上：可以事先定义一个令人满意的系统，然后招标、构建并安装它。我认为，这个假设从根本上就是错误的，许多软件采购问题正源于这一谬误。因此，若不从根本上修订流程，为原型和产品的迭代开发与规格定义留出空间，这些问题就无法解决。

#### Incremental development—GROW, NOT BUILD, software

> **增量开发：让软件生长，而非把它建造出来**

I still remember the jolt I felt in 1958 when I first heard a friend talk about *building* a program, as opposed to *writing* one. In a flash he broadened my whole view of the software process. The metaphor shift was powerful, and accurate. Today we understand how like other building processes the construction of software is, and we freely use other elements of the metaphor, such as *specifications*, *assembly of components*, and *scaffolding*.

> 我至今还记得，1958 年第一次听朋友说“建造”程序，而不是“编写”程序时，自己受到的震动。那一瞬间，他拓宽了我对整个软件过程的认识。这种隐喻的变化既有力又准确。如今，我们已明白软件构建与其他建造过程有多么相似，也会自然使用这一隐喻中的其他词语，例如*规格说明*、*构件组装*和*脚手架*。

The building metaphor has outlived its usefulness. It is time to change again. If, as I believe, the conceptual structures we construct today are too complicated to be accurately specified in advance, and too complex to be built faultlessly, then we must take a radically different approach.

> “建造”这个隐喻已经完成了它的使命，现在该再次改变了。如果像我所认为的那样，我们今天构造的概念结构过于繁复，无法预先准确说明，又过于复杂，无法毫无差错地一次建成，那么就必须采用一种根本不同的方法。

Let us turn to nature and study complexity in living things, instead of just the dead works of man. Here we find constructs whose complexities thrill us with awe. The brain alone is intricate beyond mapping, powerful beyond imitation, rich in diversity, self-protecting, and self-renewing. The secret is that it is **GROWN**, **NOT BUILT**.

> 让我们转向自然，研究生命体中的复杂性，而不只研究人类制造的无生命之物。在那里，各种结构的复杂程度令人惊叹。单是大脑，就精密到难以描绘，强大到难以模仿，同时具有丰富的多样性、自我保护和自我更新能力。秘诀在于：它是**生长出来的，而非建造出来的**。

So it must be with our software systems. Some years ago Harlan Mills proposed that any software system should be grown by incremental development.[^11] That is, the system should first be made to run, even though it does nothing useful except call the proper set of dummy subprograms. Then, bit-by-bit it is fleshed out, with the subprograms in turn being developed into actions or calls to empty stubs in the level below.

> 软件系统也必须如此。若干年前，哈兰·米尔斯提出，任何软件系统都应通过增量开发逐步生长。也就是说，首先让系统运行起来，哪怕它除了调用一组适当的占位子程序之外，没有任何实际用途。然后再一点一点填充内容，依次把这些子程序发展为真正的操作，或者对下一层空桩程序的调用。

I have seen the most dramatic results since I began urging this technique on the project builders in my software engineering laboratory class. Nothing in the past decade has so radically changed my own practice, or its effectiveness. The approach necessitates top-down design, for it is a top-down growing of the software. It allows easy backtracking. It lends itself to early prototypes. Each added function and new provision for more complex data or circumstances grows organically out of what is already there.

> 自从我在软件工程实验课上，开始向承担项目的学生推荐这项技术以来，就看到了极为显著的成果。过去十年里，没有什么如此彻底地改变过我的实践及其成效。这种方法要求自顶向下设计，因为软件是自顶向下地生长的。它便于回退调整，也有利于尽早形成原型。每一项新增功能，以及每一种为更复杂的数据或情境提供的新支持，都从已有系统中有机地生长出来。

The morale effects are startling. Enthusiasm jumps when there is a running system, even a simple one. Efforts redouble when the first picture from a new graphics software system appears on the screen, even if it is only a rectangle. *One always has, at every stage in the process, a working system.* I find that teams can *grow* much more complex entities in four months than they can *build*.

> 它对士气的影响同样惊人。只要有一个能够运行的系统，哪怕十分简单，团队的热情就会高涨。新图形软件第一次在屏幕上显示图像时，即使只是一个矩形，也会让大家加倍努力。*在开发过程的每一个阶段，手里始终都有一个可工作的系统。*我发现，在同样四个月里，团队能“生长”出的系统，远比他们能一次“建造”出的系统复杂。

The same benefits can be realized on large projects as on my small ones.[^12]

> 这些好处不仅适用于我的小项目，也能在大型项目中实现。

#### Great designers

> **卓越的设计者**

The central question of how to improve the software art centers, as it always has, on people.

> 如何提高软件技术，其核心一如既往，最终仍落在人身上。

We can get good designs by following good practices instead of poor ones. Good design practices can be taught. Programmers are among the most intelligent part of the population, so they can learn good practice. Thus a major thrust in the United States is to promulgate good modern practice. New curricula, new literature, new organizations such as the Software Engineering Institute, all have come into being in order to raise the level of our practice from poor to good. This is entirely proper.

> 遵循良好的实践，而非糟糕的实践，就能获得良好的设计。良好的设计实践是可以教授的。程序员属于人群中最聪明的一部分，因此能够学会好的方法。美国的一项重要努力，就是推广良好的现代实践。新课程、新文献，以及软件工程研究所这样的新组织，都应运而生，旨在把我们的实践从差提升到好。这完全正确。

Nevertheless, I do not believe we can make the next step upward in the same way. Whereas the difference between poor conceptual designs and good ones may lie in the soundness of design method, the difference between good designs and great ones surely does not. **Great designs come from great designers.** Software construction is a creative process. Sound methodology can empower and liberate the creative mind; it **CANNOT** inflame or inspire the drudge.

> 尽管如此，我不认为还能用同样的方式再上一个台阶。差的概念设计与好的概念设计之间，差别可能在于设计方法是否健全；但好的设计与卓越的设计之间，差别肯定不在这里。**卓越的设计来自卓越的设计者。**软件构建是一种创造性活动。健全的方法可以赋能并解放富有创造力的头脑，却**不能**点燃只会机械苦干之人的创造激情。

The differences are not minor—it is rather like Salieri and Mozart. Study after study shows that the very best designers produce structures that are faster, smaller, simpler, cleaner, and produced with less effort. The differences between the great and the average approach an order of magnitude.

> 这些差异绝非微不足道，倒更像萨列里与莫扎特之间的差别。一项又一项研究表明，最优秀的设计者能够用更少的精力，创造出更快、更小、更简单、更清晰的结构。卓越水平与平均水平之间的差距，接近一个数量级。

A little retrospection shows that although many fine, useful software systems have been designed by committees and built by multipart projects, those software systems that have excited passionate fans are those that are the products of one or a few designing minds, great designers. Consider Unix, APL, Pascal, Modula, the Smalltalk interface, even Fortran; and contrast with Cobol, PL/I, Algol, MVS/370, and MS-DOS (fig. 1).

> 稍作回顾就会发现，虽然许多优良而实用的软件系统由委员会设计，并通过分头进行的项目建成，但那些能让用户成为热情拥护者的软件系统，往往出自一位或少数几位卓越设计者之手。想想 Unix、APL、Pascal、Modula、Smalltalk 的界面，乃至 Fortran，再与 Cobol、PL/I、Algol、MVS/370 和 MS-DOS 作一番对比，便可明白这一点，见图 1。

**Figure 1. Products that inspire passionate fans**

> **图 1：能否激发用户的热情拥护**

| Yes | No |
| --- | --- |
| Unix | Cobol |
| APL | PL/I |
| Pascal | Algol |
| Modula | MVS/370 |
| Smalltalk | MS-DOS |
| Fortran | — |

> | 能 | 不能 |
> | --- | --- |
> | Unix | Cobol |
> | APL | PL/I |
> | Pascal | Algol |
> | Modula | MVS/370 |
> | Smalltalk | MS-DOS |
> | Fortran | — |

Hence, although I strongly support the technology transfer and curriculum development efforts now underway, I think the most important single effort we can mount is to develop ways to grow great designers.

> 因此，虽然我大力支持当前的技术转移与课程开发工作，但我认为，我们能采取的最重要的一项行动，是找到培养卓越设计者的方法。

No software organization can ignore this challenge. Good managers, scarce though they be, are no scarcer than good designers. Great designers and great managers are both very rare. Most organizations spend considerable effort in finding and cultivating the management prospects; I know of none that spends equal effort in finding and developing the great designers upon whom the technical excellence of the products will ultimately depend.

> 任何软件组织都不能忽视这一挑战。优秀管理者固然稀缺，却并不比优秀设计者更加稀缺；卓越的设计者和卓越的管理者则都极为罕见。大多数组织花费大量精力，发现和培养有管理潜力的人才；但据我所知，没有哪家组织会付出同等努力，去发现和培养卓越设计者，而产品最终能达到怎样的技术水准，恰恰取决于他们。

My first proposal is that each software organization must determine and proclaim that **great designers are as important to its success as great managers are, and that they can be expected to be similarly nurtured and rewarded.** Not only salary, but the perquisites of recognition—office size, furnishings, personal technical equipment, travel funds, staff support—must be fully equivalent.

> 我的第一项建议是，每个软件组织都必须明确认定并公开宣告：**卓越设计者对组织成功的重要性，与卓越管理者相同，也应获得同等的培养和回报。**不仅是薪酬，所有体现认可的待遇——办公室大小、陈设、个人技术设备、差旅经费和人员支持——也必须完全等同。

How to grow great designers? Space does not permit a lengthy discussion, but some steps are obvious:

> 怎样培养卓越的设计者？篇幅所限，无法详谈，但有些步骤显而易见：

- Systematically identify top designers as early as possible. The best are often not the most experienced.

  > 尽早、有系统地识别顶尖设计人才。最优秀的人，往往并不是经验最丰富的人。

- Assign a career mentor to be responsible for the development of the prospect, and keep a careful career file.

  > 指定一位职业导师，对培养对象的发展负责，并认真维护其职业档案。

- Devise and maintain a career development plan for each prospect, including carefully selected apprenticeships with top designers, episodes of advanced formal education, and short courses, all interspersed with solo design and technical leadership assignments.

  > 为每位培养对象制定并持续维护职业发展计划，包括精心安排的向顶尖设计者学习的机会、阶段性的高等正规教育和短期课程，并在其间穿插独立设计及技术领导任务。

- Provide opportunities for growing designers to interact with and stimulate each other.

  > 为成长中的设计者提供相互交流、彼此启发的机会。

### References

> **参考文献**

[^1]:
    > Frederick P. Brooks, Jr., *The Mythical Man-Month: Anniversary Edition*, Addison-Wesley, 1995（《人月神话》周年纪念版，新增四章）。本文据该版转载；原载 H.-J. Kugler 编，*Proceedings of the IFIP Tenth World Computing Conference*（第十届 IFIP 世界计算机大会论文集），Elsevier Science B.V., Amsterdam, 1986, pp. 1069–1076。

[^2]:
    > David L. Parnas, “[Designing Software for Ease of Extension and Contraction](https://users.ece.utexas.edu/~perry/education/SE-Intro/parnas.pdf)”（《为便于扩展和裁剪而设计软件》），*IEEE Transactions on Software Engineering*, SE-5(2), March 1979, pp. 128–138。

[^3]:
    > Grady Booch, “Object-Oriented Design”（《面向对象设计》），载 *Software Engineering with Ada*（《使用 Ada 的软件工程》），Benjamin/Cummings, Menlo Park, California, 1983。

[^4]:
    > Jack Mostow, ed., Special Issue on Artificial Intelligence and Software Engineering（人工智能与软件工程专刊），*IEEE Transactions on Software Engineering*, 11(11), November 1985。

[^5]:
    > David L. Parnas, “Software Aspects of Strategic Defense Systems”（《战略防御系统的软件问题》），*Communications of the ACM*, 28(12), December 1985, pp. 1326–1335；另载 *American Scientist*, 73(5), September–October 1985, pp. 432–440。

[^6]:
    > Robert Balzer, “A 15-Year Perspective on Automatic Programming”（《自动编程的十五年回顾》），载 Mostow 主编的专刊，见注 4。

[^7]:
    > Mostow 主编的人工智能与软件工程专刊，见注 4。

[^8]:
    > Parnas, “Software Aspects of Strategic Defense Systems”，见注 5。

[^9]:
    > G. Raeder, “A Survey of Current Graphical Programming Techniques”（《当前图形化编程技术综述》），载 R. B. Grafton 与 T. Ichikawa 主编的可视化编程专刊，*Computer*, 18(8), August 1985, pp. 11–25。

[^10]:
    > Brooks, *The Mythical Man-Month: Anniversary Edition*，1995，第 15 章，见注 1。

[^11]:
    > Harlan D. Mills, “Top-Down Programming in Large Systems”（《大型系统中的自顶向下编程》），载 R. Rustin 编，*Debugging Techniques in Large Systems*（《大型系统调试技术》），Prentice-Hall, Englewood Cliffs, New Jersey, 1971。

[^12]:
    > Barry W. Boehm, “[A Spiral Model of Software Development and Enhancement](https://doi.org/10.1109/2.59)”（《软件开发与改进的螺旋模型》），*Computer*, 21(5), May 1988, pp. 61–72。

## No Silver Bullet, Forty Years On: Revisited by Claude Opus-5.5

*An essay in the spirit of Frederick P. Brooks Jr.'s "No Silver Bullet" (1986): what an author of his temperament might argue in 2026, with his original claims set beside the present.*

> *本文承袭小弗雷德里克·P. 布鲁克斯《没有银弹》（1986）的精神：设想一位具有他那样气质的作者，在 2026 年会提出怎样的论述，并将他当年的主张与今日的现实并置考察。*

*There is now a single development in technology which, within a decade, promises an order-of-magnitude improvement in the production of code. By itself, it promises none in the production of software.*

> *如今，确实有一项单独的技术发展，有望在十年内使代码生产的效率提高一个数量级。但单凭它本身，软件生产却无望获得同等幅度的提升。*

### Abstract

> **摘要**

In 1986 Brooks divided the work of software into two parts. The **essential** part is fashioning the complex conceptual structures that make up a software system. The **accidental** part is representing those structures in programming languages and mapping them onto machines. He showed by simple arithmetic that unless accidental work were more than nine-tenths of the whole, abolishing it could not yield a tenfold gain.

> 1986 年，布鲁克斯把软件工作分成两部分。**本质性**工作，是塑造构成软件系统的复杂概念结构；**附属性**工作，则是用编程语言表示这些结构，再将它们映射到机器上。他用简单的算术说明：除非附属性工作占总工作量的九成以上，否则即使将其完全消除，也无法带来十倍的提升。

That argument has now been tested by the largest assault on accidental difficulty in the field's history. Language models write most new code at several large firms. Yet across the industry, measured delivery has improved by roughly 10 to 25 percent, which is almost exactly what Brooks's arithmetic predicts.

> 如今，这一论断经受了软件领域有史以来对附属性困难最猛烈的一次进攻。在几家大型企业，语言模型已经编写了大部分新增代码。然而，整个行业实测的软件交付提升幅度大约只有 10% 至 25%，几乎恰好符合布鲁克斯的算术预测。

The machines have also done something Brooks did not foresee. They have absorbed much of what he counted as essential: the known patterns of design. What remains is narrower and harder. It is deciding what a system is for, fitting it to an arbitrary human world, stating precisely what it must do, and judging whether what was built is what was meant.

> 机器还做到了布鲁克斯未曾预见的事：它们吸收了许多被他归入本质性工作的内容，也就是那些已经为人所知的设计模式。剩下的工作范围更窄，却也更难：决定系统为何而建，使它适应一个充满人为约定的人类世界，准确说明它必须做什么，以及判断建成的系统是否就是原本想要的系统。

**Code has become cheap. Software has not.** The bound on productivity is no longer the speed of writing. It is the speed at which people can decide and verify. I therefore suggest:

> **代码已经变得廉价，软件却没有。**生产率的上限不再取决于编写速度，而取决于人们做出决定并完成验证的速度。因此，我提出以下建议：

- Treating the specification as the primary artifact of software, and code as its compiled form.

  > 将规格说明视为软件的主要产物，将代码视为它编译后的形式。

- Making verification (tests, properties, proofs) the price of every delegation to a machine.

  > 每次把工作交给机器，都必须付出验证的成本，包括测试、性质检验和证明。

- Using the near-zero cost of prototypes to discover requirements, and throwing prototypes away freely.

  > 利用原型近乎为零的成本来发现需求，并毫不吝惜地丢弃原型。

- Growing systems organically, but pruning them as deliberately as we extend them.

  > 让系统有机生长，同时像有意识地扩展它那样，有意识地修剪它。

- Preferring the maintained component to the generated duplicate.

  > 优先使用有人维护的组件，而不是生成一个重复版本。

- Designing, on purpose, the apprenticeship that will produce the next generation of great designers, because the old one is being automated away.

  > 有意设计培养下一代卓越设计者的学徒训练，因为旧有的培养过程正在被自动化取代。

### Introduction: the apprentice's broom

> **引言：魔法学徒的扫帚**

Brooks began with the werewolf, the familiar thing that turns without warning into a horror. The software project of 1986 was such a creature: innocent at the start, then a monster of missed schedules, blown budgets, and flawed products. People cried out for a silver bullet to make software costs fall as fast as hardware costs.

> 布鲁克斯以狼人开篇：一种熟悉的事物，毫无预警地变成了恐怖之物。1986 年的软件项目正是这样的生物：起初看起来无害，后来却变成进度拖延、预算超支、产品漏洞百出的怪物。人们呼唤银弹，希望软件成本能像硬件成本一样快速下降。

Our folklore has changed. The figure that haunts 2026 is Goethe's sorcerer's apprentice. He enchants a broom to carry water, cannot make it stop, and splits it with an axe, only to find he now has two brooms carrying water.

> 我们的传说变了。萦绕在 2026 年人们心头的，是歌德笔下的魔法学徒。他给扫帚施法，让它搬运水，却无法令它停下；他用斧头把扫帚劈开，结果发现现在有两把扫帚在搬水。

The fear is no longer that software is too hard to produce. It is that code now arrives faster than anyone can understand, review, or stop it. At Anthropic, merged changes rose from about 2,500 a day in May 2026 to over 30,000 a day by September, and the company had to replace its version control system to cope \[1\]. GitHub went from roughly one billion commits in all of 2025 to about 275 million a week by mid-2026 \[2\]. Code-block duplication across the industry rose 81% between 2023 and 2026 \[3\]: the broom, split, carrying water twice.

> 人们害怕的，不再是软件太难生产，而是代码涌来的速度，已经超过任何人理解、审查或阻止它的速度。在 Anthropic，每日合并的变更从 2026 年 5 月的约 2,500 次，增加到 9 月的 30,000 多次，公司不得不更换版本控制系统来应对 \[1\]。GitHub 的提交量从 2025 年全年的约 10 亿次，增长到 2026 年年中的每周约 2.75 亿次 \[2\]。2023 年至 2026 年间，整个行业的重复代码块增加了 81% \[3\]：扫帚被劈成两半，搬来的水也成了双份。

In 1986 people asked for a silver bullet. In 2026 many believe it has been fired. I will argue that it has struck something squarely, namely the accident, and that this makes the essence matter more, not less.

> 1986 年，人们渴求一颗银弹。2026 年，许多人相信它已经射出。我将论证，它确实准确命中了某个目标，也就是附属性困难；而这使本质性问题变得更加重要，而非不再重要。

Brooks compared the software engineer to the physician before the germ theory. The germ theory dashed hopes of magic, but in exchange gave a discipline. A better comparison for our moment is penicillin. It was the nearest thing medicine has had to a silver bullet: dramatic, real, and transformative against one large class of disease. It did not abolish diagnosis, and careless use bred resistance.

> 布鲁克斯把软件工程师比作病菌学说出现之前的医生。病菌学说打破了人们对魔法的幻想，却带来了一套严谨的方法。对我们这个时代，更恰当的比喻或许是青霉素。它是医学中最接近银弹的东西：对于一大类疾病，它的效果显著、真实，而且具有变革性。但它没有让诊断变得多余，滥用它还会催生耐药性。

Language models are the penicillin of software. They are decisive against one large class of difficulty. They leave the diagnosis, which is deciding what to build, as hard as it ever was. And used carelessly, they breed resistance of their own: duplicated code, unreviewed change, and engineers who no longer understand what they ship.

> 语言模型就是软件领域的青霉素。对一大类困难，它们有决定性的效果。但诊断，也就是决定究竟要构建什么，依旧和从前一样困难。如果使用不当，它们也会滋生自己的“耐药性”：重复的代码、未经审查的变更，以及不再理解自己所交付内容的工程师。

Skepticism, Brooks wrote, is not pessimism. Neither is enthusiasm a measurement. What follows tries to keep both in their place.

> 布鲁克斯写道，怀疑不等于悲观。同样，热情也不等于测量。以下论述试图让两者各归其位。

### Does it still have to be hard? The essential difficulties

> **软件仍然非得这么难吗？本质性困难**

Brooks located the difficulty of software in the specification, design, and testing of a conceptual construct, not in the labor of representing it. In 2026 the labor of representing it is nearly free. That is a rare gift to the theorist: the essence can now be observed with most of the accident stripped away. All four of his essential properties survive, and each has taken a new form.

> 布鲁克斯认为，软件的困难在于对概念结构进行规格说明、设计和测试，而不在于将其表示出来的劳动。到了 2026 年，表示它的劳动几乎已经免费。对于理论研究者，这是难得的机会：大部分附属性困难被剥离之后，本质终于可以更清楚地显现出来。他提出的四种本质特性依然存在，而且都呈现了新的形态。

**Complexity.** Brooks observed that no two parts of a program are alike, so complexity grows faster than size. Descriptions that abstract away the complexity also abstract away the essence. Today a typical commercial application is over 70% open source and draws on about 981 components \[4\].

> **复杂性。**布鲁克斯观察到，程序的任意两个部分都不完全相同，因此复杂性的增长快于规模的增长。把复杂性抽象掉的描述，也会把本质一并抽象掉。如今，一个典型商业应用中，开源部分占比超过 70%，并且依赖大约 981 个组件 \[4\]。

The new twist is that a prompt is exactly such a description. The model fills the omitted detail with defaults, roughly the most common choice in what it has read. For the common case that is right; for the particular case it is silently wrong. Complexity has not been removed. It has been deferred to the moment a default proves wrong, which is usually in production.

> 新的变化在于：提示词恰好就是这样一种描述。模型用默认选择填补被省略的细节，而这些默认选择，大体就是它读过的材料中最常见的做法。对于一般情形，这可能是对的；对于特定情形，它却可能悄无声息地出错。复杂性并未消失，只是被推迟到默认选择被证明错误的那一刻，而那一刻通常发生在生产环境中。

Generation also manufactures complexity. Between 2023 and 2026, duplicated code blocks rose 81%, while the connectivity of new code to existing code fell 35% \[3\]. Systems now grow outward in self-contained pieces rather than inward through reuse.

> 生成过程本身也在制造复杂性。2023 年至 2026 年间，重复代码块增加了 81%，而新增代码与现有代码之间的连接程度下降了 35% \[3\]。系统如今更多地通过一个个自成一体的部分向外扩张，而不是通过复用在内部整合。

**Conformity.** Brooks noted that much of the engineer's complexity is arbitrary, imposed by human institutions designed by different people rather than by God. In July 2024, a CrowdStrike template defined 21 input fields while the code that called it supplied 20, and about 8.5 million Windows machines crashed \[6\]. Nothing in that failure was algorithmically hard. Two artifacts disagreed about a convention.

> **顺应性。**布鲁克斯指出，工程师面对的许多复杂性是人为约定造成的，来自不同的人设计的人类制度，而不是上帝制定的自然法则。2024 年 7 月，CrowdStrike 的一个模板定义了 21 个输入字段，但调用它的代码只提供了 20 个，导致约 850 万台 Windows 计算机崩溃 \[6\]。这次故障没有任何算法上的难题，只是两个产物在某项约定上不一致。

Agents read interface documentation in seconds, but reading is not reconciling. Meanwhile the arbitrary world keeps growing: two-thirds of audited codebases now carry open source license conflicts, and new regulation adds obligations of its own \[5\]. The models were not designed by God either. Their behavior is a new interface to which everything else must conform.

> 智能体几秒钟就能读完接口文档，但读懂不等于协调一致。与此同时，这个人为约定的世界仍在不断膨胀：接受审计的代码库中，如今有三分之二存在开源许可证冲突，而新的监管要求又增加了新的义务 \[5\]。模型同样不是上帝设计的。它们的行为本身成了一种新接口，其他一切都必须适应它。

**Changeability.** Brooks wrote that all successful software gets changed, because it is pure thought-stuff and its function feels every pressure. With buildings, the high cost of change dampens whim. In software that cost has fallen again, and whim has risen to meet it.

> **可变性。**布鲁克斯写道，所有成功的软件都会被修改，因为软件是纯粹的思想产物，其功能会承受来自各方的压力。对于建筑，高昂的修改成本会抑制随意变更的念头。软件的修改成本如今再次下降，而随意变更的冲动也随之上升。

The change now flows outward, not backward. Updates to code older than a year fell 74% between 2023 and 2026 \[3\], and 90% of audited codebases contain components more than four years out of date \[4\]. Systems change at their edges and calcify at their cores.

> 现在，变更向外扩散，却不向后回溯。2023 年至 2026 年间，对一年以上旧代码的更新减少了 74% \[3\]；接受审计的代码库中，有 90% 含有已落后最新版本四年以上的组件 \[4\]。系统的边缘不断变化，核心却逐渐僵化。

**Invisibility.** Brooks argued that software has no ready geometric representation; it is several directed graphs superimposed. That remains true. It is telling that the high-level medium which finally won was natural language, not diagrams. The construct is conceptual, closer to speech than to geometry, as his argument implied.

> **不可见性。**布鲁克斯认为，软件没有现成的几何表示；它是若干有向图的叠加。这一点依旧成立。最终胜出的高级表达媒介是自然语言，而非图示，这很能说明问题。软件结构是概念性的，相较于几何，它更接近语言，正如他的论证所暗示的那样。

There is also a new invisibility: code that no human has read. In February 2025 Andrej Karpathy described a way of coding in which one forgets that the code even exists; a year later he renamed the disciplined version "agentic engineering," with humans as overseers \[7\]. A structure both unvisualizable and unread is invisible twice. It cannot be pictured, and no mind has walked through it.

> 此外，又出现了一种新的不可见性：从未有人读过的代码。2025 年 2 月，Andrej Karpathy 描述了一种编程方式，使用者甚至会忘记代码的存在；一年后，他把其中遵循严格方法的版本重新命名为“智能体工程”，由人类担任监督者 \[7\]。一种既无法可视化、又无人阅读的结构，具有双重的不可见性：它无法被画出来，也从未被任何人的头脑完整梳理过。

**A fifth property: answerability.** I would add, cautiously, a fifth essential property. Software acts in the world on someone's behalf. It grants loans, routes ambulances, and chooses what a child sees, and every behavior embodies a decision for which someone must be able to give reasons.

> **第五种特性：可问责性。**我想谨慎地补充第五种本质特性。软件代表某个人在世界中采取行动：它批准贷款、安排救护车路线、选择儿童看到的内容。每一种行为都体现着一项决定，而必须有人能够说明这项决定的理由。

In 1986 this property was hidden, because whoever wrote a line was presumed to have decided it. When a machine writes the line, the decision must be located explicitly: in a specification, a review, or a named owner. That locating is not accidental work. It belongs to the nature of software as an instrument of human purposes.

> 1986 年，这种特性隐藏在幕后，因为人们默认，写下某行代码的人也做出了其中的决定。当代码由机器编写时，决定究竟由谁、在何处做出，就必须明确落实到规格说明、审查过程，或一位具名负责人身上。这种落实并非附属性工作。软件是实现人类目的的工具，而明确决定的归属，属于它的本性。

### The great assault on accident

> **对附属性困难的大举进攻**

Brooks credited three past breakthroughs: high-level languages, time-sharing, and unified programming environments. Each attacked a different accidental difficulty, and each had a natural ceiling. Since 1986 three more have arrived. The first two behaved exactly as his theory predicts. The third is different in degree, and the degree is large enough to change what is left.

> 布鲁克斯肯定了过去的三次突破：高级语言、分时系统，以及统一编程环境。它们各自解决了一种附属性困难，也各自有天然的上限。1986 年以来，又出现了三次突破。前两次完全符合他的理论预测。第三次在程度上有所不同，而且幅度之大，足以改变余下工作的面貌。

**The mass market, then open source.** Brooks called the mass market the most profound long-run trend in software engineering. The cost of software is development, not replication, so a system used n times multiplies its developers' productivity by n. He was right beyond his own expectation. Open source extended the mass market from finished products to components, and it now appears in 98% of audited commercial codebases \[5\].

> **大众市场，以及随后的开源。**布鲁克斯把大众市场称为软件工程中最深刻的长期趋势。软件的成本在于开发，而非复制；因此，一个系统被使用 n 次，就使其开发者的生产率放大了 n 倍。他的判断正确得超出了自己的预期。开源把大众市场从成品扩展到了组件，如今，接受审计的商业代码库中有 98% 使用了开源代码 \[5\]。

Measured over forty years, this is probably the largest productivity gain the field has known. It fails his test only in form: it was no single development, and it took longer than a decade. Its price is conformity at scale. In one year, the mean number of open source vulnerabilities per audited codebase more than doubled \[5\].

> 从四十年的尺度来看，这很可能是软件领域有史以来最大的生产率提升。它只在形式上不符合布鲁克斯的检验标准：它不是一项单独的发展，而且花费了不止十年。其代价，是大规模的顺应性负担。仅仅一年，接受审计的每个代码库所含开源漏洞的平均数量就增加了一倍以上 \[5\]。

**Memory-safe languages.** Android's Rust code shows roughly a thousandfold lower density of memory-safety vulnerabilities than its C and C++, and memory-safety bugs fell below 20% of Android's vulnerabilities in 2025 \[8\]. Medium and large Rust changes are rolled back about four times less often \[8\]. This is as clean a reliability gain as the field has seen.

> **内存安全语言。**Android 的 Rust 代码中，内存安全漏洞的密度大约只有 C 和 C++ 代码的千分之一；2025 年，内存安全漏洞在 Android 全部漏洞中的占比已降至 20% 以下 \[8\]。中大型 Rust 变更发生回滚的频率，大约只有其他相关代码变更的四分之一 \[8\]。这是软件领域罕有的、效果如此明确的可靠性提升。

It is also Brooks's arithmetic in miniature. Google's own chart marks about 70% as the typical industry share of vulnerabilities due to memory safety \[8\]. A thousandfold improvement on seven-tenths of the problem can shrink the whole by at most about threefold:

> 这也是布鲁克斯算术推理的一个缩影。谷歌自己的图表将内存安全问题在行业漏洞中的典型占比标为约 70% \[8\]。即使把十分之七的问题改善一千倍，整体最多也只能改善约三倍：

```latex
\frac{1}{(1 - 0.7) + 0.7/1000} \;\approx\; 3.3
```

The vulnerabilities that remain are logical and conceptual. They are flaws of design, which no type system can see.

> 余下的漏洞属于逻辑和概念层面。它们是设计缺陷，任何类型系统都无法看见。

**Language models.** Brooks wrote that the most a high-level language can do is furnish all the constructs the programmer imagines. Language models go further: they furnish the program that the programmer only gestures at. They are the first tool to attack representation wholesale.

> **语言模型。**布鲁克斯写道，高级语言所能做的，至多是提供程序员能够设想的一切构造。语言模型更进一步：它们能够给出程序员只是含糊示意的程序。这是第一种全面进攻表示工作的工具。

His caution about languages applies with new force. As languages approached the sophistication of their users, he said, returns diminished, and over-rich languages could add to the user's burden. A model's output can approach the sophistication of the user's intent, but it cannot exceed what the user can specify or recognize. And the apparatus around it, from context files and orchestration to token budgets and review queues, is becoming an over-rich language of its own.

> 他对编程语言的警告，如今有了更强的现实意义。他说，当语言的复杂程度接近使用者的能力水平时，收益就会递减；过于丰富的语言，甚至会加重使用者的负担。模型的输出可以接近使用者意图的复杂程度，但无法超越使用者能够明确说明或识别的范围。而模型周围的配套机制，从上下文文件、任务编排，到 token 预算和审查队列，正在形成另一套过于丰富的语言。

The mass market and memory safety attacked accidents and stopped there. Language models are the first tool that also reaches across the line into the essence. That is the subject of the sections that follow.

> 大众市场和内存安全攻克了附属性困难，便止步于此。语言模型则是第一种跨过这条界线、同时触及本质的工具。下面几节将讨论这一点。

### The productivity equation, rerun

> **重新计算生产率方程**

Brooks bounded every attack on accident with one equation:

> 布鲁克斯用一个方程，为所有针对附属性困难的改进划定了上限：

```latex
\text{Task time} \;=\; \sum_i \text{frequency}_i \times \text{time}_i
```

> 任务耗时 = 各项活动的「发生频率 × 单次耗时」之和。

If the conceptual components take most of the time, he wrote, no amount of work on mere expression can give large gains. In 1986 this was an assertion. In 2026 we can put numbers in it.

> 他写道，如果概念性部分占去了大部分时间，那么只在表达上做再多改进，也无法带来大幅收益。1986 年，这还是一种判断；到了 2026 年，我们可以代入实际数字。

Microsoft research, cited by DX, finds that developers spend about 14% of their time writing code \[9\]. Suppose machines made that part instantaneous:

> DX 引用的微软研究发现，开发者约有 14% 的时间用于编写代码 \[9\]。假设机器能让这一部分瞬间完成：

```latex
S_{\max} \;=\; \frac{1}{1 - 0.14} \;\approx\; 1.16
```

Now compare what was observed. Most organizations in DX's sample saw pull-request throughput rise 10 to 15%, with a median near 8% \[9\]. Microsoft's rollout of two coding agents raised merged pull requests about 24% over four months \[10\]. Faros found 21% more tasks and 98% more merged pull requests, but also 91% longer reviews and no measurable gain at the company level; its authors name Amdahl's law themselves \[11\]. METR's 2025 randomized trial found experienced developers 19% slower with AI. Its 2026 follow-up points to speedups, but the study broke down because developers would no longer work without AI \[12\].

> 现在来看实际观测。DX 样本中的大多数组织，拉取请求吞吐量提高了 10% 至 15%，中位数接近 8% \[9\]。微软在推出两款编程智能体后，四个月内合并的拉取请求增加了约 24% \[10\]。Faros 发现，完成的任务增加了 21%，合并的拉取请求增加了 98%，但审查时间也延长了 91%，公司层面没有可测量的收益；报告作者自己也点名提到了阿姆达尔定律 \[11\]。METR 在 2025 年开展的随机试验发现，经验丰富的开发者使用 AI 后反而慢了 19%。2026 年的后续研究指向了提速，但由于开发者已不愿在没有 AI 的情况下工作，研究未能按原设计继续进行 \[12\]。

The much-discussed "AI productivity paradox" is no paradox. It is Brooks's equation with a small accelerable fraction.

> 被广泛讨论的“AI 生产率悖论”，其实并不是悖论。它只是布鲁克斯的方程中，可加速部分占比较小的情形。

**The term Brooks did not need.** The 1986 equation lacks a term that now dominates. When a person writes code, writing and understanding are fused into one act. When a machine writes it, understanding becomes a separate task, and its cost grows with the volume generated:

> **布鲁克斯当年不需要的一项。**1986 年的方程缺少一个如今占据主导地位的项。人编写代码时，编写与理解融为同一个行为。机器编写代码时，理解成了一项独立任务，其成本随着生成量而增长：

```latex
T \;=\; T_{\text{decide}} + T_{\text{generate}} + v \cdot N
```

> 总耗时 T = 决策耗时 + 生成耗时 + 单位验证成本 v × 生成的变更量 N。

Here N is the volume of generated change and v the cost of verifying each unit. As generation time falls toward zero, total time approaches deciding plus verifying. If volume rises faster than verification cost falls, total time goes up, not down. That is the apprentice's broom in arithmetic, and the 91% rise in review time is its first measurement.

> 这里，N 表示生成的变更量，v 表示验证每单位变更的成本。当生成时间趋近于零，总耗时便趋近于决策与验证耗时之和。如果生成量的增长快于验证成本的下降，总耗时就会上升，而非下降。这就是用算术表达的魔法学徒扫帚，而审查时间增加 91%，正是它的第一个测量结果。

The law for 2026 is therefore this: **productivity is bounded by the rate at which people can decide what they want and verify that they got it.** There are two ways to raise the bound. Shrink v, through automated review, tests, and proofs. Shrink the time to decide, through better specification and faster discovery of requirements.

> 因此，2026 年的规律是：**生产率的上限，取决于人们决定自己想要什么，以及验证自己是否得到了它的速度。**提高上限有两种办法：通过自动审查、测试和证明，降低 v；通过更好的规格说明和更快的需求发现，缩短决策时间。

**The frontier escapes, and how.** At Anthropic, Claude authored more than 80% of merged code by May 2026, and engineers merged about eight times as much code per day as in 2024. The company itself calls that figure an overstatement of real productivity, and its research staff estimate a median of about fourfold \[2\]. It also reports that human review became the bottleneck, and it too names Amdahl's law \[2\].

> **前沿实践如何突破上限。**在 Anthropic，截至 2026 年 5 月，Claude 编写了合并代码的 80% 以上，工程师每天合并的代码量约为 2024 年的八倍。公司自己也承认，这个数字夸大了实际生产率的提升，其研究人员给出的提升幅度中位数约为四倍 \[2\]。公司还报告称，人工审查已成为瓶颈，并同样提到了阿姆达尔定律 \[2\]。

It escaped the bound in three ways. It shrank v: an automated reviewer that, applied retrospectively, would have caught about a third of the bugs behind past incidents. It delegated method as well as typing: on open-ended problems, the agent's success rate reached 76% by May 2026. And it did work that would otherwise never have been done: more than 800 fixes that cut one class of API errors a thousandfold, estimated at four years of human effort \[2\].

> 它通过三种方式突破了上限。第一，降低 v：部署自动审查工具；如果回溯应用于过去，这种工具本可以发现约三分之一引发事故的缺陷。第二，不仅委托代码输入，也委托解决方法：截至 2026 年 5 月，智能体在开放式问题上的成功率达到 76%。第三，完成原本根本不会去做的工作：实施了 800 多项修复，使某一类 API 错误减少到原来的千分之一；据估计，这些修复相当于四年的人力投入 \[2\]。

The last breaks the equation's frame. Cheap work raises its own frequency, so a per-task speedup understates the change. But none of the three is a property of the tool alone. Each required reorganizing the work around it. Brooks's definition of a silver bullet included management technique, and where a bullet exists today it is half technology and half reorganization.

> 最后一点突破了方程本身的框架。工作变得廉价，会提高它自身发生的频率，因此，以单项任务的提速衡量，会低估整体变化。但这三种方式，没有一种仅仅是工具本身的属性。每一种都要求围绕工具重新组织工作。布鲁克斯对银弹的定义包含管理方法；而今天若有银弹存在，它也是一半技术，一半组织方式的重构。

For the industry as a whole, measured gains fall short of tenfold by a factor of about eight. At the frontier, on some kinds of work, tenfold is plausible. Most of that evidence is self-reported by an interested party, and it awaits independent measurement.

> 对于整个行业，实测提升距离十倍仍有约八倍的差距。在前沿实践的某些工作中，十倍提升是有可能的。但相关证据大多来自利益相关方的自行报告，仍有待独立测量。

### Hopes for the silver, revisited

> **重新审视那些银弹希望**

Brooks examined the technologies most often advanced as silver bullets and asked of each whether it addressed essence or accident. Several of those hopes have returned in new clothing. It is instructive to hold them against his original verdicts.

> 布鲁克斯考察了最常被推举为银弹的技术，并逐一追问：它解决的是本质性困难，还是附属性困难？其中一些希望如今换上新装，再次归来。把它们与他当年的判断对照，很有启发。

#### Artificial intelligence

> **人工智能**

Following Parnas, Brooks distinguished two meanings of AI. AI-1 meant solving problems that once required human intelligence, a definition that slides as each solved problem stops being called AI. AI-2 meant rule-based, heuristic programming modeled on human experts. He found no body of technology unique to the field and doubted that speech or image recognition would change programming.

> 沿着 Parnas 的思路，布鲁克斯区分了 AI 的两种含义。AI-1 指解决那些曾经需要人类智能的问题；每当一个问题得到解决、不再被称为 AI，这一定义的边界就会移动。AI-2 则指以人类专家为范本、基于规则的启发式编程。他没有发现一套专属于 AI 领域的技术体系，也怀疑语音或图像识别能否改变编程。

The sliding definition held perfectly: code completion was "AI" in 2021 and is plumbing in 2026. The claim of no shared technology did not hold. One learned architecture now handles speech, images, and code. What arrived was a third kind, which we might call AI-3: competence learned statistically from a corpus of human work.

> 不断移动的定义完全应验了：2021 年，代码补全还是“AI”，到了 2026 年，它已成了基础设施。但“不存在共同技术体系”的判断没有成立。如今，一种通过学习训练而成的架构，就能处理语音、图像和代码。到来的其实是第三种 AI，我们不妨称为 AI-3：通过对人类工作成果的语料进行统计学习而获得的能力。

His core objection survives intact. The hard thing about building software is deciding what to say, not saying it. What he could not foresee is that saying it would become so cheap that the deciding would be laid bare.

> 他的核心异议完整地保留了下来。构建软件的困难，在于决定要说什么，而不是把它说出来。他未能预见的是，“说出来”会变得如此廉价，以至于“做决定”的困难完全暴露出来。

#### Expert systems

> **专家系统**

Brooks's most hopeful passage concerned expert systems. Their greatest contribution, he predicted, would be to put the experience of the best programmers at the service of the inexperienced, because the gap between best and average practice is wider in software than in any other engineering discipline. The obstacle was knowledge acquisition, and the prerequisite was to have an expert.

> 布鲁克斯最抱希望的一段讨论，是关于专家系统的。他预测，专家系统最大的贡献，是把最优秀程序员的经验提供给缺乏经验的人，因为软件领域中最佳实践与平均实践之间的差距，比任何其他工程领域都大。障碍在于知识获取，而前提是先有一位专家。

The prediction came true by a route he did not imagine. There are no knowledge engineers; the corpus became the expert. Two corrections follow. First, a corpus records average practice at least as faithfully as best practice, so the model spreads what is common, which is not the same as what is good. Second, his prerequisite returns at the other end: to use an assistant safely, one must be expert enough to judge it.

> 这一预测通过他未曾设想的路径成了真。没有知识工程师，语料库成了专家。由此需要作出两点修正。第一，语料库记录普通做法的忠实程度，至少不亚于它记录最佳实践的程度；因此，模型传播的是常见做法，而常见不等于优秀。第二，他所说的前提在另一端重新出现：要安全地使用助手，使用者必须具备足够的专业能力来判断它。

In a randomized trial, developers learning a new library with AI scored 17% lower on comprehension than those who coded by hand, with the widest gap on debugging \[13\]. The tool that spreads expertise can also prevent its formation.

> 在一项随机试验中，使用 AI 学习新程序库的开发者，其理解测试得分比手写代码者低 17%，调试方面的差距最大 \[13\]。传播专业知识的工具，也可能阻碍专业能力的形成。

#### "Automatic" programming

> **“自动”编程**

Parnas called automatic programming a euphemism for programming in a higher-level language than the one currently available. Brooks added that in most cases it is the solution method, not the problem, that must be specified. Generators worked only where problems had few parameters, many known methods, and explicit rules for choosing among them.

> Parnas 把自动编程称为一种委婉说法，实际含义是用一种比当前可用语言更高级的语言编程。布鲁克斯补充道，大多数时候，必须明确说明的是求解方法，而不是问题本身。只有当问题参数较少、已知解法很多，而且选择解法的规则明确时，生成器才能奏效。

Parnas's line is now literally true. The higher-level language is structured English plus examples, and its compiler is probabilistic. Spec-driven development, which runs from specification to plan to tasks to implementation, is the explicit form; GitHub's Spec Kit passed 100,000 stars within months \[16\]. Because a model's library of methods is the whole corpus, far more problems now resemble Brooks's favorable cases. Novel and particular problems still do not, and for them the method must still be supplied or discovered.

> Parnas 的话如今在字面上成了现实。更高级的语言，是结构化的英语加示例；它的编译器则是概率性的。从规格说明到计划、任务，再到实现的规格驱动开发，是这一方式的显式形态；GitHub 的 Spec Kit 在数月内就获得了超过 10 万颗星标 \[16\]。由于模型的方法库是整个语料库，更多问题开始符合布鲁克斯所说的有利条件。但新颖而特殊的问题仍不符合，对于这些问题，方法依然需要人来提供或发现。

#### Program verification

> **程序验证**

Brooks granted verification real power but denied that it saves labor. Proofs can be wrong, and even a perfect proof shows only that a program meets its specification. Much of building a program, he wrote, is debugging the specification.

> 布鲁克斯承认验证的力量，却不认为它能节省劳动。证明本身可能出错，而且，即便证明完美无缺，它也只能说明程序满足了规格说明。他写道，构建程序的大量工作，其实是在调试规格说明。

The labor objection is collapsing. The verified seL4 kernel required about 20 person-years and 23 lines of proof for each line of C \[14\]. Off-the-shelf models now produce verified code for 82% of the Dafny tasks in a 12,504-specification benchmark, though only 27% of the Lean tasks \[15\]. Kleppmann predicts verification will go mainstream because models can write proofs and checkers reject the nonsense \[14\].

> 关于劳动成本的异议正在瓦解。经过验证的 seL4 内核，曾耗费约 20 人年的工作量，每行 C 代码对应 23 行证明 \[14\]。如今，在一个包含 12,504 份规格说明的基准中，现成模型能够为 82% 的 Dafny 任务生成通过验证的代码，尽管 Lean 任务的通过率只有 27% \[15\]。Kleppmann 预测，形式化验证将走向主流，因为模型可以编写证明，而检查器会拒绝无效内容 \[14\]。

The deeper objection stands, and becomes central. When proof is cheap, all remaining risk sits in the specification. Debugging the specification is the job description of the coming decade.

> 更深一层的异议依然成立，而且成为了核心。当证明变得廉价，余下的所有风险便都落在规格说明上。调试规格说明，将是未来十年的岗位职责。

#### Graphical programming

> **图形化编程**

Brooks was certain that graphical programming would disappoint: flowcharts are poor abstractions, screens too small, and software is not geometric. He was right, and the outcome confirms his reasoning. The high-level medium that finally won was language, not pictures. Low-code tools thrived for forms and workflows, but no one designs general systems by drawing them.

> 布鲁克斯确信图形化编程会令人失望：流程图不是好的抽象，屏幕太小，而软件本身也不是几何对象。他是对的，结果印证了他的推理。最终胜出的高级媒介是语言，而不是图像。低代码工具在表单和工作流领域蓬勃发展，但没有人靠画图来设计通用系统。

#### Workstations

> **工作站**

Brooks asked how many MIPS one could use fruitfully, and expected think-time to remain the dominant activity in a programmer's day. It is, more than ever. But compute found a use he could not foresee: it now converts directly into code, and agent token spend can reach millions of dollars a year in a large organization \[10\]. Machines no longer merely support the programmer. They substitute for part of the programmer's work.

> 布鲁克斯曾问，一个人究竟能有效利用多少 MIPS，并预期思考时间仍将占据程序员一天中的主要部分。如今，这一点比以往更加明显。但计算资源找到了他未曾预见的用途：它可以直接转化为代码，而大型组织每年为智能体消耗 token 的支出，可以达到数百万美元 \[10\]。机器不再只是辅助程序员，而是在替代程序员的一部分工作。

### Where the essence went

> **本质去了哪里**

Brooks borrowed his distinction from Aristotle. For Aristotle, the essence of a thing is what it must have to be what it is; its accidents are properties it merely happens to have. Applied to software, the conceptual construct is the essence, and its representation in some language is accident. This is an ontological claim, and it remains true. The construct is the same under every representation.

> 布鲁克斯借用了亚里士多德的区分。对亚里士多德而言，一件事物的本质，是它之所以成为它自身所必须具备的东西；附属性质，则是它碰巧拥有的属性。应用到软件上，概念结构是本质，用某种语言表示它则属于附属性问题。这是一个本体论命题，而且依然成立：无论采用何种表示，概念结构都相同。

But Brooks put the distinction to a second use: locating effort. "The hard part" is a claim about where human labor goes. Labor depends on what is already known and what tools exist, so this second line is not fixed by the nature of software. **The ontological line is fixed. The operational line moves.**

> 但布鲁克斯又赋予这一区分第二种用途：确定工作量落在哪里。“困难的部分”是在判断人类劳动花在何处。劳动取决于已有知识和可用工具，因此，这条第二意义上的界线，并不由软件的本性固定下来。**本体论的界线是固定的，实际工作中的界线却会移动。**

Language models moved the operational line without touching the ontological one. Much of what a typical engineer did when "designing" was rediscovering known solutions: a standard schema, a familiar architecture, a well-known algorithm. That work is essential to the artifact, which would not be what it is without it. It is not new to the world, and a model that has read the world's code can supply it.

> 语言模型没有触动本体论的界线，却移动了实际工作中的界线。普通工程师在“设计”时所做的许多事，其实是在重新发现已知的解决方案：一种标准的数据模式、一种熟悉的架构、一个众所周知的算法。对于软件产物，这些工作属于本质，因为没有它们，产物就不再是那个产物。但它们对世界而言并不新颖，而读过世界上大量代码的模型，就能够提供它们。

I would therefore restate Brooks's distinction for our time: **whatever has been done before and written down tends toward accident; what is new to the world, or particular to the situation, remains essence.** The essence has layers, and the machines are absorbing them from the bottom up.

> 因此，我愿为今天重新表述布鲁克斯的区分：**凡是已经有人做过并记录下来的工作，都趋向于成为附属性工作；对世界而言新颖，或对具体情境而言独特的部分，仍然属于本质。**本质具有层次，而机器正从底部向上吸收这些层次。

&#91;embedded content: Figure 2. The layers of the essence, 2026 · four layers, two lines\]

> ［嵌入内容：图 2。2026 年的本质层次——四个层次，两条界线。］

The bottom layer is known design, and models increasingly supply it. The middle layer is situated design: fitting this system to these interfaces, these laws, these users, and this legacy. Here the work is shared; the model reads context quickly, but people own the conformity decisions. The top layer is purpose: deciding what to build and whether it is right. Anthropic itself reports that its largest remaining gap is judgment in choosing goals \[2\].

> 最底层是已知的设计，模型越来越多地提供这一层。中间层是针对具体情境的设计：使这个系统适应这些接口、这些法律、这些用户，以及这些遗留系统。在这一层，工作由双方共同承担；模型可以迅速读取上下文，但顺应性方面的决定由人负责。最顶层是目的：决定要构建什么，以及它是否正确。Anthropic 自己也报告，其仍然存在的最大差距，是选择目标时的判断力 \[2\]。

Will the line keep rising? Probably, as more situated knowledge is written down and read. Models are already improving at judgments made within a goal, such as choosing the next step in an investigation \[2\]. But purpose is different in kind. Choosing a system's goal is deciding whose interests it serves. That stays with people not because machines cannot compute an answer, but because the answer is ours to give. This is the fifth property, answerability, seen from above.

> 这条界线还会继续上移吗？很可能会，随着更多情境知识被写下来并被模型读取。模型已经在改进既定目标内的判断，例如选择一项调查的下一步 \[2\]。但目的在性质上有所不同。选择系统的目标，就是决定它为谁的利益服务。这仍然由人负责，不是因为机器算不出答案，而是因为这个答案应由我们来给出。从上层看，这正是第五种特性：可问责性。

The residual essence, then, is close to what Brooks called the hardest single part of building a software system: deciding precisely what to build. It is now joined by two companions. One is situated conformity to an arbitrary human world. The other is the judgment of whether what was built is what was meant.

> 因此，剩下的本质，已经接近布鲁克斯所谓构建软件系统中最困难的单项工作：准确决定究竟要构建什么。如今，它又有了两个伴随者：一是在具体情境中顺应一个充满人为约定的人类世界，二是判断建成的系统是否就是原本想要的系统。

### Promising attacks on the conceptual essence

> **直面概念本质的有望途径**

Brooks proposed four attacks on the essence: buy rather than build, refine requirements through rapid prototyping, grow software incrementally, and develop great designers. All four were vindicated. I keep three of them with amendments, add two, and give the fourth its own section.

> 布鲁克斯提出了四条直面本质的途径：购买而非自建，通过快速原型细化需求，以增量方式让软件生长，以及培养卓越的设计者。这四条都得到了验证。我保留其中三条并作修订，新增两条，再将第四条单列一节。

#### 1. Buy, and prefer the maintained to the generated

> **1. 购买，并优先选择有人维护的组件，而非生成的副本**

Brooks's most radical solution was not to construct software at all. That advice now faces a new temptation: generating a private copy instead of reusing a shared one. Every generated duplicate is a fork that no community maintains and no upstream patches. The data already show the drift: duplicated blocks up 81%, updates to legacy code down 74% \[3\].

> 布鲁克斯最激进的办法，是根本不要自行构建软件。这条建议如今面临一种新的诱惑：不复用共享组件，而是生成一个私有副本。每个生成的重复版本，都是一个没有社区维护、也得不到上游修补的分支。数据已经表明了这种趋势：重复代码块增加了 81%，对旧代码的更新减少了 74% \[3\]。

The rule should be to search before generating. Generated code is best used as glue between maintained components, not as a substitute for them. And buying now requires an inventory, because the mass market brought its own conformity burden: vulnerabilities per audited codebase more than doubled in a year \[5\].

> 规则应该是先搜索，再生成。生成代码最适合充当有人维护的组件之间的连接代码，而不是替代它们。如今，购买软件还需要维护一份清单，因为大众市场带来了自己的顺应性负担：接受审计的每个代码库所含漏洞的数量，一年内增加了一倍以上 \[5\]。

#### 2. Prototype to discover, then throw the prototype away

> **2. 用原型发现需求，然后丢弃原型**

Brooks held that clients cannot specify a modern system completely and correctly before trying some versions of it. The purpose of a prototype, he wrote, is to make the conceptual structure real so the client can test it for consistency and usability.

> 布鲁克斯认为，在试用过系统的若干版本之前，客户不可能完整、正确地说明一个现代系统的需求。他写道，原型的目的，是让概念结构成为可体验的现实，使客户可以检验其一致性和可用性。

A working prototype now costs minutes. The term "vibe coding" was coined for exactly this kind of throwaway exploration \[7\]. This is the most direct attack on the essence that models offer, and it is underused next to production code generation. Requirements can now be discovered in a loop of disposable prototypes shown to real users, many in a single week.

> 如今，一个可运行的原型只需几分钟。“氛围编程”（vibe coding）这个词，最初正是为这种可以随时丢弃的探索而创造的 \[7\]。这是模型所提供的、最直接触及本质的方式，但与生产代码生成相比，它的应用还远远不足。现在，人们可以在一轮轮可丢弃的原型中发现需求，把原型展示给真实用户，一周内完成许多轮这样的循环。

Brooks once advised planning to throw one away, and later judged that advice too simple in favor of incremental growth. In 2026 we can throw many away at almost no cost. The discipline lies in actually discarding them. His own list of what prototypes omit (exceptions, invalid inputs, clean failure) is precisely what a prototype promoted to production carries with it.

> 布鲁克斯曾建议预先计划丢弃一个版本，后来又认为这条建议过于简单，转而主张增量生长。2026 年，我们几乎不花成本，就能丢弃许多版本。真正需要自律的，是确实把它们丢掉。他自己列出的原型所省略的内容——异常、无效输入、妥善的失败处理——恰好就是原型直接升格为生产系统时会带入的缺陷。

#### 3. Specify first (new)

> **3. 先写规格说明（新增）**

The specification should become the primary artifact of software, and code its compiled form. Specifications, worked examples, and acceptance tests are the source; review them as rigorously as we once reviewed code. Tools for spec-driven development already exist \[16\]. The rule for maintenance follows: when behavior must change, the specification changes first.

> 规格说明应成为软件的主要产物，代码则是它编译后的形式。规格说明、具体示例和验收测试才是源头；我们应像过去审查代码那样严格地审查它们。规格驱动开发的工具已经存在 \[16\]。由此也可以推出维护规则：需要改变行为时，先修改规格说明。

#### 4. Verify every delegation (new)

> **4. 验证每一次委托（新增）**

When a machine writes code that no person reads, tests, properties, and proofs are the only evidence that it is correct. The verification cost per unit of change is the coefficient that sets the bound on productivity, so that is where investment pays.

> 当机器编写的代码无人阅读时，测试、性质检验和证明，就是它正确性的唯一证据。单位变更的验证成本，是决定生产率上限的系数，因此，投资于此才有回报。

Automated review already catches a meaningful share of defects; at Anthropic, applied retrospectively, about a third of the bugs behind past incidents \[2\]. Property-based tests and formal proofs, newly affordable, belong on the critical paths \[14\]\[15\]. The reviewer may now be a machine. The standard may not be lowered.

> 自动审查已经能发现相当一部分缺陷；在 Anthropic，回溯评估表明，它可以发现约三分之一引发过去事故的缺陷 \[2\]。如今成本已变得可承受的基于性质的测试和形式化证明，应当用于关键路径 \[14\]\[15\]。审查者可以变成机器，但标准不能降低。

#### 5. Grow, and prune

> **5. 生长，也要修剪**

Brooks's most important practical lesson was to grow software rather than build it: get a skeleton running, then flesh it out, so that there is always a working system. Teams, he found, could grow more complex entities than they could build. That advice became orthodoxy.

> 布鲁克斯最重要的实践经验，是让软件生长，而非把它建造出来：先让骨架运行起来，再逐渐为它添上血肉，从而始终保持一个可工作的系统。他发现，团队能以生长方式做出的复杂实体，超过了他们能一次建造出的实体。这条建议后来成为了公认的方法。

It needs an amendment. Living things grow, but they also shed, repair, and defend themselves. In software, pruning is refactoring, and the immune system is tests and rollbacks. Refactored code fell from 21% of changed lines in 2022 to 3.8% in 2026, while copy-and-paste rose from 9.4% to 15.7% \[3\]. A codebase that only accretes is not growing in Brooks's sense. It is swelling.

> 它需要一项补充。生命体会生长，也会脱落、修复和自我防御。在软件中，修剪就是重构，免疫系统则是测试和回滚。重构代码在变更行数中的占比，从 2022 年的 21% 降到了 2026 年的 3.8%；与此同时，复制粘贴的占比从 9.4% 升到了 15.7% \[3\]。只会不断堆积的代码库，并不是在布鲁克斯所说的意义上生长，而是在膨胀。

Pruning should therefore be budgeted, not left to conscience: a fixed share of capacity, set in advance and defended, for consolidation, deletion, and the upkeep of old code. And it should be measured by the structure of the system, not by the volume of what was added.

> 因此，修剪应纳入预算，而不是仅凭自觉：预先划出固定比例的工作能力，并确保不被挪用，用于整合、删除和维护旧代码。衡量它的标准应是系统的结构，而不是新增内容的数量。

### Great designers, and how they will now be made

> **卓越的设计者，以及今后如何培养他们**

Brooks closed on people. Good design practice can be taught, he argued, and it lifts poor designs to good ones. But the difference between good designs and great ones does not lie in method. Great designs come from great designers, and the gap between the great and the average approaches an order of magnitude, as between Salieri and Mozart.

> 布鲁克斯最后把目光转向人。他认为，良好的设计实践可以传授，也能把糟糕的设计提升为良好的设计。但良好设计与卓越设计之间的差别，不在方法。卓越的设计出自卓越的设计者；卓越者与普通人之间的差距接近一个数量级，就像萨列里与莫扎特之间的差距。

Nothing in 2026 refutes this, and much confirms it. **Tools amplify; they do not level.** GitClear finds that heavy AI users out-produce non-users fourfold to tenfold, but most of that gap existed before AI; measured against their own past, the gain is about 25% \[3\]. DORA's 2025 report describes AI as an amplifier of whatever strengths and weaknesses an organization already has \[17\]. A great designer now directs a team of agents. An average one directs agents toward average results, faster.

> 2026 年的现实没有推翻这一点，反而有许多证据印证了它。**工具会放大差异，不会抹平差异。**GitClear 发现，重度 AI 使用者的产出是非使用者的四至十倍，但这一差距大多在 AI 出现前就存在；与他们自己的过去相比，提升幅度约为 25% \[3\]。DORA 的 2025 年报告把 AI 描述为一种放大器，会放大组织已有的优势和弱点 \[17\]。卓越的设计者如今指挥一支智能体团队；普通设计者则指挥智能体，更快地做出普通的结果。

There is an irony here that Brooks would have enjoyed. In *The Mythical Man-Month* he endorsed Harlan Mills's surgical team: one chief designer, supported by specialists who extend that single mind's reach. He prized conceptual integrity above every other property of a system, and he believed it came from one mind or a few minds in agreement. The surgical team was rarely staffed as described. In 2026 it is being staffed with agents. For the first time, one designer can direct the volume of work that once required a department, without dividing the design among many minds.

> 这里有一种布鲁克斯大概会欣赏的反讽。在《人月神话》中，他赞同 Harlan Mills 的“外科手术团队”：由一位首席设计者主导，其他专家提供支持，扩展这一个头脑的能力范围。他把概念完整性看得比系统的任何其他属性都重要，并相信它来自一个头脑，或少数达成共识的头脑。过去，这种外科手术团队很少按设想配置人员。到了 2026 年，它正由智能体填补角色。一个设计者首次能够指挥过去需要一个部门才能完成的工作量，而不必将设计分散给许多个头脑。

The danger lies upstream. The old road to greatness ran through thousands of hours of writing, reading, and debugging code, and machines now do much of that work. In a randomized trial, learners who delegated to AI averaged below 40% on a comprehension test, while those who used it to ask conceptual questions kept high scores \[13\]. Whether AI makes designers or unmakes them depends on how it is used during the apprenticeship.

> 危险存在于更上游。过去，通往卓越的道路，要经过成千上万小时的代码编写、阅读和调试；如今，机器承担了其中许多工作。在一项随机试验中，把任务交给 AI 的学习者，理解测试平均得分不足 40%；而使用 AI 提出概念性问题的人，则维持了较高的得分 \[13\]。AI 究竟是在造就设计者，还是在削弱他们，取决于学徒训练期间如何使用它。

Brooks proposed concrete steps for growing great designers. They still hold, and I would add the following:

> 布鲁克斯提出了培养卓越设计者的具体步骤。它们仍然有效，我还想补充以下几点：

- **Identify designers by judgment, not by volume.** The most prolific operator of agents is not necessarily the best designer, just as the most experienced engineer was not, in Brooks's observation, necessarily the best.

  > **根据判断力识别设计者，而不是根据产出量。**操作智能体最为高产的人，未必是最好的设计者；正如布鲁克斯观察到的，经验最丰富的工程师，也未必是最优秀的工程师。

- **Require prediction before acceptance.** A novice should state what generated code must do, and why, before reading it, and then compare.

  > **要求先预测，再接受。**新手应在阅读生成代码之前，先说明它必须做什么，以及为什么；随后再进行比较。

- **Keep the dissection table.** Medical residents still learn anatomy by dissection, though imaging exists. Novices should still spend time reading and debugging code without assistance.

  > **保留解剖台。**尽管已有影像技术，住院医师仍通过解剖学习人体结构。同样，新手仍应花时间在没有辅助的情况下阅读和调试代码。

- **Apprentice at the specification, not only the code.** Novices learn where decisions are made by sitting beside great designers while specifications are argued.

  > **不仅在代码层面学徒，也在规格说明层面学徒。**让新手坐在卓越设计者身旁，参与规格说明的讨论，学习决定究竟是在何处做出的。

- **Give great designers authority over what the agents are told to build.** Brooks asked that designers be rewarded like managers. In 2026 they should also govern the specification, because that is where the essence now lives.

  > **赋予卓越设计者决定智能体构建什么的权力。**布鲁克斯要求设计者获得与管理者相当的回报。到了 2026 年，他们还应主导规格说明，因为本质如今就落在这里。

### Conclusion: the road

> **结语：道路**

In 1986 Brooks saw no silver bullet and judged that the nature of software made one unlikely. Forty years later a bullet has been fired, and it has struck the accident almost entirely. Representing concepts in languages and mapping them onto machines is on its way to costing nothing.

> 1986 年，布鲁克斯看不到银弹，并判断软件的本性使银弹不太可能出现。四十年后，一颗子弹已经射出，几乎全面命中了附属性困难。用语言表示概念，再将它们映射到机器上，这些工作正走向零成本。

This vindicates Brooks more than it refutes him. His arithmetic predicted that abolishing the accident would bring modest gains unless the accident were nearly all the work, and the industry's measurements match that prediction closely. Where gains are larger, they come from reaching into the lowest layer of the essence and from reorganizing work around the new tools. That is a management technique as much as a technology, which his own definition allowed.

> 与其说这推翻了布鲁克斯，不如说它更多地证明了他的正确。他的算术预测是：除非附属性工作几乎占据全部工作，否则消除它也只能带来有限的收益；行业测量结果与这一预测十分吻合。在收益更大的地方，提升来自触及本质的最底层，以及围绕新工具重新组织工作。这既是技术，也是管理方法，而他自己的定义本就容纳了后者。

The werewolf has not died; it has changed shape. The monster of 1986 was the project that could not be finished on time. The monster of 2026 is the system finished faster than anyone can understand it: the apprentice's broom, carrying water no one asked for into a house no one can see.

> 狼人没有死，它只是变了形。1986 年的怪物，是无法按时完成的项目。2026 年的怪物，是完成速度超过任何人理解速度的系统：魔法学徒的扫帚，把无人要求的水，不断搬进一座无人看得清的房子。

Brooks ended in hope. There was no royal road, he wrote, but there was a road. The road is still there. We now travel it in a far faster vehicle, so steering matters more than ever, and the map, the specification of what we mean, must still be drawn by us.

> 布鲁克斯以希望作结。他写道，没有康庄捷径，但仍有路可走。路依然在那里。如今我们乘坐的交通工具快得多，因此掌舵比以往任何时候都更重要；而地图，也就是对我们真实意图的规格说明，仍然必须由我们亲手绘制。

**Code has become cheap. Software has not. Understanding was always the expensive part, and we can no longer pretend otherwise.**

> **代码已经变得廉价，软件却没有。理解始终是昂贵的部分，而我们再也无法假装事实并非如此。**

*This essay was written by Claude, an AI model made by Anthropic. Several figures it cites come from Anthropic's own reports, which are self-reported by an interested party.*

> *本文由 Anthropic 开发的 AI 模型 Claude 撰写。文中引用的若干数字来自 Anthropic 自身的报告，属于利益相关方的自行报告。*

### Figure 1. 1986 and 2026, side by side

> **图 1：1986 年与 2026 年的并列比较**

Most of Brooks's positions stand; what changes is where they bind.

> 布鲁克斯的大部分观点仍然成立；变化的是，它们在何处构成约束。

1. **Where the difficulty lies**
   - 1986: In specifying, designing, and testing the conceptual construct.
   - 2026: In deciding, specifying, and verifying; generation is nearly free.

   > **困难在哪里**
   >
   > - 1986：在于对概念结构进行规格说明、设计和测试。
   > - 2026：在于决策、明确说明和验证；生成几乎已经免费。

2. **Essence and accident**
   - 1986: A fixed division, given by the nature of software.
   - 2026: Fixed ontologically but moving operationally; known design drifts toward accident.

   > **本质与附属**
   >
   > - 1986：由软件本性决定的固定区分。
   > - 2026：本体论上的界线固定，实际工作中的界线移动；已知设计逐渐转为附属性工作。

3. **Essential properties**
   - 1986: Complexity, conformity, changeability, invisibility.
   - 2026: The same four, now intensified, plus answerability.

   > **本质特性**
   >
   > - 1986：复杂性、顺应性、可变性、不可见性。
   > - 2026：同样四种特性进一步增强，并增加了可问责性。

4. **The bound on gains**
   - 1986: No tenfold gain unless accidental work exceeds nine-tenths of the total.
   - 2026: Productivity is bounded by the rate at which people decide and verify.

   > **提升的上限**
   >
   > - 1986：除非附属性工作超过总量的九成，否则无法实现十倍提升。
   > - 2026：生产率受限于人们决策和验证的速度。

5. **Artificial intelligence**
   - 1986: No technology unique to the field; marginal for programming.
   - 2026: A general learned technology; decisive on accident, partial on essence.

   > **人工智能**
   >
   > - 1986：没有专属于该领域的技术，对编程的作用有限。
   > - 2026：一种通过学习获得的通用技术；对附属性困难作用决定性，对本质性困难则只能部分奏效。

6. **Expert systems**
   - 1986: Would spread the best programmers' experience to novices.
   - 2026: Corpus-trained models do so, and can also stop novices from learning.

   > **专家系统**
   >
   > - 1986：将把最优秀程序员的经验传授给新手。
   > - 2026：语料训练出的模型确实能做到这一点，也可能让新手无法学到东西。

7. **Automatic programming**
   - 1986: A euphemism for programming in a higher-level language.
   - 2026: Literally true; the language is now structured English.

   > **自动编程**
   >
   > - 1986：用更高级语言编程的一种委婉说法。
   > - 2026：字面上已经成立；这种语言如今就是结构化的英语。

8. **Program verification**
   - 1986: Powerful but costly, and proves only conformance to a specification.
   - 2026: Becoming cheap, so the specification carries all the risk.

   > **程序验证**
   >
   > - 1986：力量强大，但成本高昂，而且只能证明符合规格说明。
   > - 2026：正在变得廉价，因此所有风险都落到了规格说明上。

9. **Reuse**
   - 1986: Buy rather than build; the mass market is the deepest long-run trend.
   - 2026: Vindicated; now prefer the maintained component to the generated copy.

   > **复用**
   >
   > - 1986：购买而非自建；大众市场是最深刻的长期趋势。
   > - 2026：已得到验证；如今应优先使用有人维护的组件，而不是生成的副本。

10. **Process**
    - 1986: Grow software; don't build it.
    - 2026: Grow it, and prune it.

    > **过程**
    >
    > - 1986：让软件生长，而非把它建造出来。
    > - 2026：让它生长，也要修剪它。

11. **People**
    - 1986: Great designs come from great designers.
    - 2026: Truer than ever, and the apprenticeship must be rebuilt.

    > **人**
    >
    > - 1986：卓越的设计出自卓越的设计者。
    > - 2026：比以往更加正确，而学徒培养机制必须重建。

12. **The monster**
    - 1986: The project that cannot be finished on time.
    - 2026: The system finished faster than anyone can understand it.

    > **怪物**
    >
    > - 1986：无法按时完成的项目。
    > - 2026：完成速度超过任何人理解速度的系统。

### References

> **参考文献**

**The original.** Frederick P. Brooks Jr., "No Silver Bullet: Essence and Accident in Software Engineering," *Proceedings of the IFIP Tenth World Computing Conference*, 1986; reprinted with "No Silver Bullet Refired" and "The Mythical Man-Month after 20 Years" in *The Mythical Man-Month: Anniversary Edition*, Addison-Wesley, 1995. The apprentice is from Goethe's "Der Zauberlehrling" (1797).

> **原作。**小弗雷德里克·P. 布鲁克斯，《没有银弹：软件工程的本质性与附属性问题》，载《第十届 IFIP 世界计算机大会论文集》，1986 年；后与《再论“没有银弹”》及《〈人月神话〉二十年后》一同收入《人月神话》周年纪念版，Addison-Wesley，1995 年。魔法学徒的典故出自歌德《魔法学徒》（1797）。

1. [Slashdot, via The Register: Anthropic reinvents source control as Claude floods the world with code](https://developers.slashdot.org/story/26/10/14/0244248/anthropic-reinvents-source-control-as-claude-floods-the-world-with-code) (14 Oct 2026)

   > Slashdot 转引 The Register：Anthropic 重造源码管理系统，应对 Claude 带来的海量代码（2026 年 10 月 14 日）。

2. [Anthropic Institute: When AI builds itself](https://www.anthropic.com/institute/recursive-self-improvement) (Jun 2026, updated 18 Sep 2026)

   > Anthropic Institute：《当 AI 构建自身》（2026 年 6 月，2026 年 9 月 18 日更新）。

3. [GitClear: Write-Only Mode, AI Code Quality in 2026](https://www.gitclear.com/write_only_mode_ai_research)

   > GitClear：《只写模式：2026 年 AI 代码质量研究》。

4. [Black Duck: The OSSRA report, 10 years later](https://www.blackduck.com/blog/10-years-of-ossra-report-insights.html)

   > Black Duck：《OSSRA 报告十年回顾》。

5. [Black Duck: OSSRA 2026](https://www.blackduck.com/ossra) and [VMblog summary of OSSRA 2026](https://vmblog.com/news/black-duck-research-shows-open-source-vulnerabilities-have-doubled-as-ai-accelerates-code-creation/)

   > Black Duck：《OSSRA 2026》，以及 VMblog 对《OSSRA 2026》的摘要。

6. [Help Net Security: CrowdStrike details causes of massive outage](https://www.helpnetsecurity.com/2024/08/07/crowdstrike-outage-causes/) (Aug 2024)

   > Help Net Security：《CrowdStrike 详述大规模宕机的原因》（2024 年 8 月）。

7. [The New Stack: Vibe coding is passé; Karpathy on agentic engineering](https://thenewstack.io/vibe-coding-is-passe/) (10 Feb 2026)

   > The New Stack：《氛围编程已过时：Karpathy 谈智能体工程》（2026 年 2 月 10 日）。

8. [Google: Rust in Android, move fast and fix things](https://blog.google/security/rust-in-android-move-fast-fix-things/) (13 Nov 2025)

   > 谷歌：《Android 中的 Rust：快速前进，修复问题》（2025 年 11 月 13 日）。

9. [DX: The current impact of AI on engineering velocity](https://getdx.com/podcast/current-impact-of-ai-on-engineering-velocity/)

   > DX：《AI 目前对工程交付速度的影响》。

10. [Murphy-Hill, Butler, Savelieva: Adoption and Impact of Command-Line AI Coding Agents](https://arxiv.org/abs/2607.01418) (Microsoft, 1 Jul 2026)

    > Murphy-Hill、Butler、Savelieva：《命令行 AI 编程智能体的采用及影响》（微软，2026 年 7 月 1 日）。

11. [Faros AI: The AI Productivity Paradox Report 2025](https://www.faros.ai/blog/ai-software-engineering)

    > Faros AI：《2025 年 AI 生产率悖论报告》。

12. [METR: We are Changing our Developer Productivity Experiment Design](https://metr.org/blog/2026-02-24-uplift-update/) (24 Feb 2026)

    > METR：《我们正在调整开发者生产率实验的设计》（2026 年 2 月 24 日）。

13. [Anthropic: How AI assistance impacts the formation of coding skills](https://www.anthropic.com/research/AI-assistance-coding-skills)

    > Anthropic：《AI 辅助如何影响编程技能的形成》。

14. [Martin Kleppmann: Prediction, AI will make formal verification go mainstream](https://martin.kleppmann.com/2025/12/08/ai-formal-verification.html) (8 Dec 2025)

    > Martin Kleppmann：《预测：AI 将推动形式化验证走向主流》（2025 年 12 月 8 日）。

15. [A Benchmark for Vericoding: Formally Verified Program Synthesis](https://arxiv.org/abs/2509.22908)

    > 《验证式编程基准：形式化验证的程序合成》。

16. [GitHub Spec Kit](https://github.github.com/spec-kit/)

    > GitHub Spec Kit（规格驱动开发工具包）。

17. [InfoQ: DORA report finds AI is an amplifier in software development](https://www.infoq.com/news/2025/09/dora-state-of-ai-in-dev-2025) and [Google: Inside the 2025 DORA report](https://blog.google/technology/developers/dora-report-2025/)

    > InfoQ：《DORA 报告发现：AI 是软件开发中的放大器》，以及谷歌：《解读 2025 年 DORA 报告》。
