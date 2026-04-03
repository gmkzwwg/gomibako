---
layout: print
category: Notes
title: LLM Prompt Engineering for Study Assistance
subclass: LLMs todo
bilingual: true
---

## Basic Techniques for Effective Prompts

Let’s start with fundamental prompting techniques that apply to any interaction with ChatGPT:

*   **Clarity and Specificity:** State your request as clearly as possible. Specify the context, the task, and the desired format. Ambiguity is the enemy of good responses. Remember: _“Precision beats vibes”_ – don’t rely on the AI to _infer_ what you want; **tell it directly**. If you want a list, ask for a list. If you need a brief answer, say so. If the question has multiple parts, consider listing them.
    
*   **Provide Context:** If your question refers to something not obvious, provide background info. ChatGPT doesn’t know _which course you’re in or which article you just read_ unless you tell it. For example, _“I just read an article about black holes. Can you explain how Hawking radiation works?”_ is better than _“Explain Hawking radiation,”_ because the former gives context that you’re in the domain of black holes (helping the model focus its answer).
    
*   **Role or Persona Instructions:** You can ask ChatGPT to take on a role or persona if that helps. For instance, _“You are an experienced literature professor. Explain the theme of **Romeo and Juliet** in simple terms...”_ By doing this, you set a tone and level for the answer. With GPT-4 and beyond, role instructions can shape the style or depth of the response significantly. (In ChatGPT’s interface, you might use the **Custom Instructions** feature to permanently note your context or preferences, such as _“I am a 3rd-grade science teacher”_ or _“Please always provide answers with metric units”_.)
    
*   **Formatting Instructions:** If you need the answer in a certain format – e.g., bullet points, a table, code snippet, or a step-by-step outline – include that in your prompt. For example: _“Give the answer as a table comparing the two theories”_ or _“List the steps as bullet points.”_ ChatGPT can produce well-formatted outputs (like tables, JSON, outlines, etc.) when asked.
    
*   **Length and Level:** Specify if you want a brief answer or a detailed one, and at what level of complexity. _“Explain like I’m 5”_ or _“Give a technical explanation”_ are useful cues. If you’re using this for academic study, you might say _“Explain the concept in ~200 words”_ or _“Provide a thorough explanation with an example.”_
    
*   **Check and Refine:** After you get a response, don’t hesitate to refine your prompt or ask follow-up questions. ChatGPT allows an **iterative dialogue** – you can say _“That’s not what I meant, I wanted more focus on X”_ or _“Can you expand the second point?”_ Iteration is a normal part of prompt engineering; rarely a perfect prompt comes out on first try.
    

Below is a quick **cheat-sheet** of basic prompt improvements:

*   Use **direct instructions**: e.g. _“Translate the following sentence into Spanish.”_ (clear task)
    
*   Add **detail**: e.g. _“Translate this sentence into Spanish and then explain the translation in English.”_
    
*   Set **context or role**: e.g. _“You are a tutor. Explain this math problem step by step...”_
    
*   Request **specific output**: e.g. _“Provide the answer as a numbered list of steps.”_
    
*   Specify **style/tone**: e.g. _“Give a formal explanation,”_ or _“Explain in a fun, anecdotal way.”_
    
下面先介绍一些适用于任何 ChatGPT 交互场景的基础提示技巧：

* 清晰与具体：尽可能清楚地说明你的请求。要明确背景、任务以及期望的输出格式。歧义是高质量回答的最大障碍。记住：“精确胜过感觉”——不要指望 AI 去自行推断你想要什么；要直接告诉它。如果你想要一个列表，那就明确要求列表。如果你需要简短回答，也要直说。如果问题包含多个部分，可以考虑把它们逐条列出来。

> - clarity [ˈklærəti] n. 清晰；明晰
> - specificity [ˌspesɪˈfɪsəti] n. 具体性；明确性
> - desired [dɪˈzaɪəd] adj. 所期望的；想要的
> - ambiguity [ˌæmbɪˈɡjuːəti] n. 歧义；含糊不清
> - enemy [ˈenəmi] n. 敌人；妨碍因素；此处指会破坏回答质量的关键问题
> - precision [prɪˈsɪʒən] n. 精确；准确
> - vibes 感觉；氛围；此处指模糊的直觉式表达，而不是明确要求
> - infer [ɪnˈfɜː(r)] v. 推断；推知
> - directly [dəˈrektli] adv. 直接地；明确地

* 提供背景：如果你的问题涉及一些并不显然的内容，就要补充背景信息。除非你明确说出来，否则 ChatGPT 并不知道你正在上哪门课，也不知道你刚读过哪篇文章。例如，“我刚读了一篇关于黑洞的文章。你能解释一下霍金辐射是如何起作用的吗？”就比“解释霍金辐射”更好，因为前者提供了你关注的是黑洞这一领域的背景信息，这有助于模型把回答聚焦到正确方向上。

> - context [ˈkɒntekst] n. 背景；上下文；语境
> - obvious [ˈɒbviəs] adj. 明显的；显而易见的
> - background info 背景信息；帮助界定问题范围和场景的补充说明
> - domain [dəˈmeɪn] n. 领域；范围；学科范围
> - focus its answer 聚焦其回答；使回答更集中于相关内容

* 角色或人物设定指令：如果这样做有帮助，你可以要求 ChatGPT 扮演某种角色或采用某种人物设定。例如：“你是一位经验丰富的文学教授。请用简单的语言解释《罗密欧与朱丽叶》的主题……” 这样做可以为回答设定语气和深度。对于 GPT-4 及之后的模型来说，角色指令能够显著影响回答的风格或深度。（在 ChatGPT 的界面中，你也可以使用“自定义指令”（Custom Instructions）功能，长期写明你的背景或偏好，例如“我是一名三年级科学教师”或“请始终用公制单位回答”。）

> - persona [pəˈsəʊnə] n. 人物设定；角色形象
> - experienced [ɪkˈspɪəriənst] adj. 有经验的；经验丰富的
> - literature professor 文学教授；从事文学教学与研究的教师
> - theme [θiːm] n. 主题；中心思想
> - significantly [sɪɡˈnɪfɪkəntli] adv. 显著地；明显地
> - permanently [ˈpɜːmənəntli] adv. 持续地；长期地；永久性地
> - preferences [ˈprefərənsɪz] n. 偏好；喜好
> - metric units 公制单位；如米、千克、摄氏度等国际通用计量单位

* 格式指令：如果你需要回答以某种特定格式呈现——例如项目符号列表、表格、代码片段，或者分步骤提纲——就把这一要求写进提示词里。例如：“请用表格比较这两种理论”或者“请用项目符号列出步骤。” 只要明确提出要求，ChatGPT 就可以生成格式良好的输出，例如表格、JSON、提纲等。

> - formatting [ˈfɔːmætɪŋ] n. 格式安排；排版方式
> - bullet points 项目符号要点；用列表形式逐条列出的信息点
> - snippet [ˈsnɪpɪt] n. 片段；此处常指简短代码片段
> - outline [ˈaʊtlaɪn] n. 提纲；纲要；轮廓
> - well-formatted adj. 格式良好的；排版清晰的
> - JSON [ˈdʒeɪsən] n. 一种常用的数据交换格式；常用于结构化输出

* 长度与层次：要说明你想要简短回答还是详细回答，以及希望答案处于什么复杂程度。“像对五岁小孩解释一样说明”或者“给出技术性解释”都是很有用的提示。如果你把它用于学术学习，可以说“请用约 200 个词解释这个概念”或者“请给出一个充分展开并带有例子的解释”。

> - complexity [kəmˈpleksəti] n. 复杂程度；复杂性
> - cue [kjuː] n. 提示信号；线索；引导信息
> - academic [ˌækəˈdemɪk] adj. 学术的；教学研究相关的
> - concept [ˈkɒnsept] n. 概念；观念
> - thorough [ˈθʌrə] adj. 充分的；全面细致的

* 检查与改进：在得到回答之后，不要犹豫，可以继续改进提示词或提出追问。ChatGPT 支持迭代式对话（iterative dialogue）——你可以说：“这不是我的意思，我希望更多聚焦于 X。”或者“你能把第二点展开一点吗？” 迭代是提示工程中的正常组成部分；几乎没有哪个完美提示词第一次就能写出来。

> - refine [rɪˈfaɪn] v. 改进；优化；提炼
> - follow-up questions 追问；后续问题
> - iterative dialogue 迭代式对话；指通过多轮来回调整，不断逼近理想结果的交互方式
> - expand [ɪkˈspænd] v. 展开；扩充；进一步详细说明
> - prompt engineering 提示工程；为获得更好模型输出而系统设计和优化提示词的方法
> - rarely [ˈreəli] adv. 很少；难得

下面是一份关于基础提示改进方法的简明速查表：

> * cheat-sheet [ˈtʃiːt ʃiːt] n. 速查表；便于快速参考的简明说明
> * prompt improvements 提示词改进方法；提升提示效果的具体做法

* 使用直接指令：例如，“把下面这句话翻译成西班牙语。”（任务清晰）

> - direct instructions 直接指令；不绕弯、明确说明任务内容的表达方式

* 增加细节：例如，“把这句话翻译成西班牙语，然后用英语解释这个翻译。”

> - detail [ˈdiːteɪl] n. 细节；具体信息

* 设定背景或角色：例如，“你是一位导师。请一步一步解释这道数学题……”

> - tutor [ˈtjuːtə(r)] n. 导师；家教；辅导者
> - step by step 一步一步地；按步骤地

* 要求特定输出形式：例如，“请用编号步骤列表给出答案。”

> - specific output 特定输出；明确规定的输出形式
> - numbered list 编号列表；按数字顺序排列的项目列表

* 指定风格／语气：例如，“请用正式的方式解释”，或者“请用有趣、带点故事感的方式解释。”

> - style [staɪl] n. 风格；表达方式
> - tone [təʊn] n. 语气；口吻
> - formal [ˈfɔːməl] adj. 正式的；规范的
> - anecdotal [ˌænɪkˈdəʊtəl] adj. 轶事式的；带有小故事色彩的；常用于让表达更生动易懂

Each of these helps the model align with your needs. Even GPT-5 (whenever it arrives) will benefit from clear instructions – as of 2025, newer models are becoming _more literal_ and will do exactly what you ask, so it’s important to describe what you want precisely.

**Try it yourself:** Take a simple prompt like _“Tell me about climate change.”_ and improve it using the tips above. For example, you might say, _“Explain the main causes and effects of climate change in 5-6 bullet points, suitable for a high school science class, and suggest one action individuals can take.”_ Run both versions through ChatGPT and compare the responses. Notice how the latter prompt yields a more structured and targeted answer.

### Zero-Shot Prompting: Asking Direct Questions

**Zero-shot prompting** means you ask the model a question or give an instruction _without_ providing any examples in the prompt. It’s the most straightforward way to use ChatGPT – just ask your question in natural language. GPT-4 is very powerful at zero-shot queries, especially for common tasks that were well-covered in its training data.

Use zero-shot prompting for **simple or well-known tasks**. It works great for things like factual questions, definitions, straightforward transformations, or summarization of a given text. For instance: _“What is photosynthesis?”_, _“Translate this sentence to French:”_, or _“Summarize the second chapter of **Pride and Prejudice**.”_ – these can often be answered correctly without any extra guidance, assuming the model has the knowledge. Indeed, if a task is something the model has likely seen during training (for example, general knowledge Q&A, basic math, common instructions), zero-shot is often sufficient.

However, **zero-shot relies heavily on how you phrase the question**. If the task is complex or unusual, a single-shot prompt might not be enough for the model to figure out exactly what you need. In such cases, we move to few-shot prompting (next section) or add additional instructions.

_Example (academic use):_ Say you want help analyzing a poem. A zero-shot prompt could be: _“Analyze the theme of solitude in the poem ‘Daffodils’ by Wordsworth.”_ ChatGPT-4 will likely produce a decent literary analysis because it knows about the poem. But if the analysis you get is too shallow or missing certain angles, you might then refine the prompt (adding _“focus on how the imagery contributes to the theme”_ or similar).

_Example (research assistance):_ You might ask, _“What are the latest findings on battery technology for electric cars?”_ Since this asks for **latest findings**, note that ChatGPT’s knowledge may be limited to its training cutoff (GPT-4’s knowledge is largely up to 2021, unless you have browsing enabled). If you don’t have browsing, the model might give general info and _could hallucinate specifics_ about recent research. So, zero-shot might not yield an accurate “latest” answer. In such cases, you either use a tool (if available) or phrase the question differently (e.g., _“Summarize key improvements in EV battery tech in the last decade”_ – the model can handle up to 2021 well). We’ll touch on tool use later, but it’s good to be aware of knowledge limits in zero-shot queries.

**Tip:** If ChatGPT gives an unsatisfactory answer on a zero-shot prompt, consider **rephrasing the question or adding detail**. Sometimes asking _the same question in a clearer way_ dramatically improves the result. For example, if _“Explain quantum computing”_ gives a too-complex answer, try _“Explain the concept of quantum computing in simple terms for a beginner.”_

**When to use zero-shot vs. not:** If your query is straightforward and you’re getting good answers, great. But for **complex, ambiguous, or specialized tasks**, zero-shot might fall short. In those cases, you’ll get better results by moving to the next techniques: one-shot and few-shot prompting.


所谓“零样本提示”，就是在提示中不提供任何示例，只是直接向模型提问或下达指令。这是使用 ChatGPT 最直接的方式——用自然语言直接提出问题即可。GPT-4 在处理零样本查询时能力很强，尤其适合那些在其训练数据中已被充分覆盖的常见任务。

对于简单或广为人知的任务，零样本提示尤其合适。它非常适用于事实性问题、定义解释、直接的文本转换，或对给定文本进行总结。例如：“什么是光合作用？”，“把这句话翻译成法语：”，或者“总结《傲慢与偏见》第二章的内容。”——这类任务通常不需要额外引导也能回答正确，前提是模型本身具备相关知识。确实，如果某项任务属于模型在训练中很可能见过的类型，例如常识问答、基础数学、常见指令任务，那么零样本方式通常已经足够。

不过，零样本提示在很大程度上依赖于你如何表述问题。如果任务复杂或不寻常，单次提示可能不足以让模型准确把握你的需求。在这种情况下，就需要转向少样本提示（下一节会介绍），或者额外加入更具体的说明。

例如，在学术场景中，假设你想让模型帮助分析一首诗。一个零样本提示可以是：“分析华兹华斯《水仙》一诗中孤独这一主题。”由于模型知道这首诗，GPT-4 很可能给出一份相当不错的文学分析。但如果你觉得分析过于浅显，或者遗漏了某些角度，就可以进一步细化提示，比如加入“重点分析意象如何促进这一主题的表达”等要求。

再例如，在研究辅助场景中，你可能会问：“关于电动车电池技术，最近有哪些新发现？”这里的问题在于“最近的新发现”涉及时效性，ChatGPT 的知识可能受限于其训练截止时间（GPT-4 的知识大体截至 2021 年，除非启用了浏览功能）。如果不能联网，模型可能只会给出一般性信息，甚至可能对较新的研究细节产生幻觉。因此，零样本方式未必能准确回答“最新”的问题。在这种情况下，要么使用工具，要么换一种提问方式，例如：“概述过去十年中电动车电池技术的关键改进。”这样的问题，模型通常更能可靠处理。后文会谈到工具使用，但在零样本提问时，了解知识边界是很重要的。

一个实用建议是：如果 ChatGPT 对零样本提示给出的回答不理想，可以考虑重新表述问题，或者补充更多细节。有时，仅仅把同一个问题说得更清楚，效果就会显著改善。例如，如果“解释量子计算”得到的回答太复杂，可以改成“请用适合初学者的简单语言解释量子计算的概念”。

至于何时适合使用零样本提示，原则很简单：如果你的问题本身清晰直接，而且模型回答良好，那么零样本就很好用；但如果任务复杂、含糊，或者具有较强专业性，那么零样本往往不够。这时，更好的做法是转向下面要讨论的一次示例提示和少样本提示。 

> * zero-shot prompting [ˌzɪərəʊ ʃɒt ˈprɒmptɪŋ] 零样本提示；指在不给模型任何示例的情况下直接提问或下达任务
> * straightforward [ˌstreɪtˈfɔːwəd] adj.直接的；简单明了的
> * covered in its training data 在训练数据中已被覆盖；指模型在训练阶段见过大量类似任务
> * refine the prompt 细化提示；进一步修改提示语，使要求更明确
> * hallucinate specifics 对具体细节产生幻觉；指模型编造出看似真实但实际并无根据的信息
> * knowledge cutoff 知识截止时间；模型训练数据所覆盖信息的时间上限

### Few-Shot Prompting: Guiding the Model with Examples

Few-shot prompting means providing **examples** of the task in your prompt so the model can learn from them **in context**. This is like saying, “Here’s how I want it done, now do it for a new case.” By giving one or more Q&A pairs or input-output examples, you essentially show the model the format or approach you expect. GPT-4 (and likely GPT-5) are very capable of learning patterns from just a few demonstrations in the prompt – this is called _in-context learning_. It’s powerful for steering the model on tasks that have a specific style or require understanding something beyond a basic instruction.

**One-shot prompting:** You provide **one example** along with the instruction. For instance, if you want the model to follow a particular format, you could do:

vbnet

`**Instruction:** Convert the following sentence to Shakespearean-style English.

**Example:** Modern:  "Where are you going?"  Shakespearean:  "Whither goest thou?" **Now, convert this sentence:** Modern:  "Hello, how are you?"  Shakespearean:` 


In the above prompt, we gave one demonstration of how a modern sentence was converted to Shakespearean. The model will then continue and produce the Shakespearean version of _“Hello, how are you?”_. Even without explicitly explaining the task, the one-shot example clarifies it. This is useful when the task might be ambiguous or the model might not know exactly what format you need just from a description.

**Few-shot prompting:** You provide **multiple examples** (usually 2-5 examples, due to length limits) before asking the model to perform the task on a new input. This can further improve reliability, especially for more complex or nuanced tasks. Essentially, you are showing several instances of “when X happens, the correct output is Y,” which helps the model generalize to produce Y for new X.

For example, imagine you’re working on classifying movie review sentiments (positive/negative/neutral) but the reviews are phrased in tricky ways. A few-shot prompt could be:

vbnet

`Classify the sentiment of  each review as  "Positive", "Negative", or  "Neutral".

**Examples:** Review:  "I absolutely loved the cinematography and the story had me in tears. Truly beautiful."  Sentiment: Positive Review:  "The movie was a bit long and I nearly fell asleep. It had some good moments though."  Sentiment: Neutral Review:  "Despite the hype, I found it boring and poorly written. Not worth the time."  Sentiment: Negative

**Now classify this new review:** "I think the film had great actors but the plot was a disaster and I regret watching it."  Sentiment:` 


Here we gave three examples (few-shot). The model will likely output _“Negative”_ for the new review, following the pattern and reasoning from the examples. Few-shot prompting is particularly handy for **domain-specific tasks**, or where the wording of the question might be interpreted in different ways. The examples reduce ambiguity by showing exactly what you expect as output.

A few things to keep in mind with few-shot prompts:

*   Make sure your examples are **correct and representative** of the task. The model will pick up on errors or inconsistencies, which could mislead it.
    
*   Keep the examples **consistent in format**. If one example output is a full sentence and another is just one word, the model might get confused. In the above example, each “Sentiment:” was one of the three labels; we wouldn’t want one of the example outputs to suddenly be a sentence like “It was a positive review” because that breaks the pattern.
    
*   Few-shot uses up some of the model’s context length (which is the limit of how much text the model can consider at once). GPT-4 supports large prompts (up to 8,000 tokens in standard, and some versions up to 32,000 tokens), so a few examples are usually fine. But don’t overdo it – adding 50 examples would likely exhaust the prompt length or be cut off. Research has shown that performance can improve with more examples up to a point, but in practice 3-5 good examples often suffice.
    

**When to use few-shot:** Whenever zero-shot isn’t giving the results you want, especially for more **complex tasks or those requiring a specific format/style**. For instance, if you want ChatGPT to output data in JSON format for an API, you can show one example of the desired JSON structure. Or if you want it to answer in the style of a particular author, you might give a short example Q&A in that style.

**Try it yourself:** If you’re doing academic research, try a few-shot prompt where you show the model how to cite sources. For example: provide a short paragraph and a fake citation as an example, then ask it to write a new paragraph with citations. Alternatively, for language learning, give one example of a sentence translated and explained word-by-word, then ask it to do the same for a new sentence. Observe how the output follows your example’s pattern.


所谓少样本提示，是指在提示中提供任务示例，让模型在上下文中从这些示例中学习。这相当于在对模型说：“这是我希望你完成任务的方式，现在请你处理一个新的例子。”通过给出一个或多个问答对，或者输入—输出示例，你实际上是在向模型展示你期待的格式和方法。GPT-4（以及很可能的 GPT-5）都很擅长仅凭少量示例就在提示中学习模式，这种能力通常被称为“上下文学习”（in-context learning）。当任务具有特定风格，或者单靠基本说明还不足以让模型理解要求时，这种方法尤其有效。

一次示例提示（one-shot prompting）就是在指令之外只提供一个例子。例如，如果你想让模型按照某种特定格式输出，就可以给出一个单独示例。假设你要模型把句子转换成莎士比亚风格英语，你可以先给出一个现代英语句子及其对应的莎士比亚式表达，然后再让它处理新的句子。在这种提示中，那个唯一的示例就起到了明确任务和格式的作用。即使你没有额外解释任务本身，模型也能从示例中理解你的意图。当任务可能含糊，或者仅靠描述不足以说明所需格式时，这种方式尤其有用。

少样本提示（few-shot prompting）则是在要求模型完成新任务之前，先提供多个示例，通常是 2 到 5 个左右，因为上下文长度有限。这样做通常能进一步提升可靠性，尤其适用于更复杂、更多细微差别的任务。实际上，你是在通过多个例子告诉模型：“当输入是 X 时，正确输出应是 Y。”模型随后会尝试将这种模式推广到新的输入上。

举例来说，假设你要模型判断电影评论的情感倾向——正面、负面还是中性——而评论本身措辞较为复杂。这时，你就可以先给出几条评论及其分类，再提供一条新评论让模型判断。通过这些示例，模型更容易理解你如何界定“正面”“负面”“中性”，从而减少误解。少样本提示尤其适用于领域特定任务，或者那些问题表述本身可能有多重解释的任务。示例的作用就在于消除歧义，让模型明白你到底期待怎样的输出。

使用少样本提示时，有几点需要特别注意。第一，示例必须正确，而且要具有代表性。模型会学习示例中的模式，因此错误或不一致的示例会误导模型。第二，示例格式要保持一致。如果某个例子的输出是一整句话，而另一个例子的输出只有一个词，模型就可能困惑。例如，若你在做情感分类，示例中的每个“情感”输出都应是统一的标签，而不应有时写成“Positive”，有时又写成完整句子“这是一条正面评论”。第三，少样本提示会占用上下文长度。GPT-4 支持较长提示，因此少量示例通常没有问题，但也不能无限添加。实践中，3 到 5 个质量较高的例子常常已经足够。

何时使用少样本提示？一般来说，当零样本提示不能得到理想结果，尤其是在任务复杂、输出格式特殊、或风格要求明确时，就应考虑少样本提示。例如，如果你想让 ChatGPT 用 JSON 格式输出数据供 API 使用，就可以先给出一个 JSON 示例；或者如果你希望它模仿某位作者的风格作答，也可以提供一个简短示例，让模型按那个风格继续。

在学术研究中，也可以用少样本提示来训练模型遵循某种引用格式。比如，先提供一小段文字和一个示范性引用，再要求模型为新段落写出类似格式的引文。又或者在语言学习中，先给一个句子的翻译及逐词解释，再让模型以相同方式处理新句子。通过这种方式，可以直观看到模型如何沿着示例所建立的模式作答。 

> * few-shot prompting [fjuː ʃɒt ˈprɒmptɪŋ] 少样本提示；通过提供少量示例来引导模型完成任务
> * in-context learning [ɪn ˈkɒntekst ˈlɜːnɪŋ] 上下文学习；模型在当前提示中通过示例学习任务模式，而不更新参数
> * one-shot prompting [wʌn ʃɒt ˈprɒmptɪŋ] 一次示例提示；只提供一个示例的提示方式
> * representative [ˌreprɪˈzentətɪv] adj.有代表性的
> * ambiguity [ˌæmbɪˈɡjuːəti] n.歧义；含义不明确
> * context length 上下文长度；模型一次能够处理的文本长度上限

### Chain-of-Thought Prompting: Reasoning Step by Step

Often, the most powerful technique for tough problems is **Chain-of-Thought (CoT) prompting**, which involves asking the model to **show its reasoning step by step** before giving the final answer. This is like having the model “think out loud.” Instead of jumping straight to an answer, the model will list intermediate steps, considerations, or calculations. This approach has been found to significantly improve accuracy on complex tasks such as math word problems, logic puzzles, and multi-step reasoning questions.

One simple way to invoke this is by appending a phrase like _“Let’s think this through step by step.”_ or _“Show your reasoning step by step.”_ at the end of your prompt. Surprisingly, just adding that sentence can prompt models like GPT-4 to produce a more structured, stepwise solution, and _often leads to correct answers where they would otherwise go wrong_. In a research study, a predecessor of GPT-4 was able to solve a math problem incorrectly when asked normally, but got it right when prompted with “Let’s think step by step,” increasing accuracy on a set of math problems from **18% to 79%** – a fourfold improvement!

![https://www.datacamp.com/tutorial/chain-of-thought-prompting](blob:https://chatgpt.com/ecfabcfa-2a97-4623-ab31-3ebfe10c2d87)

_Comparison of a model’s response without vs. with a chain-of-thought prompt. The right side shows how adding “Let’s think step by step” leads the model to reason out loud and reach the correct answer._

The image above illustrates this: On the **left**, the model was asked a question and it immediately gave a (wrong) answer (zero-shot prompting). On the **right**, the same question was asked with the instruction “Let’s think step by step,” and the model listed its reasoning and arrived at the correct answer. This demonstrates the power of CoT prompting for reasoning tasks.

**How to use chain-of-thought in practice:**

1.  **Implicit CoT:** Simply instruct the model to think aloud. E.g., _“How many prime numbers are between 1 and 100? Let’s work this out step by step.”_ The model will usually enumerate primes or outline its checking process, then conclude with the count. For many tasks (like math or logical reasoning), this dramatically improves reliability because the model’s _chain of thought_ helps ensure no step is skipped.
    
2.  **Explicit CoT with examples:** You can also combine few-shot with CoT. Provide an example problem and show a step-by-step solution in the prompt (this is called _few-shot CoT_). Then ask it to do a new but similar problem. For instance, in the prompt you might write: _“**Example:** Q: If 3 cats catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 100 minutes? **Solution:** Let’s think step by step: In 3 minutes, 3 cats catch 3 mice, so the rate is 1 mouse per cat per 3 minutes... \[and so on\] ... Thus, the answer is 3 cats.”_ Then say _“**Question:** \[your new question\] **Solution:** Let’s think step by step:”_. This primes the model to follow the reasoning format.
    
3.  **Asking for intermediate steps:** If you prefer, you can prompt the model in stages. Ask: _“What are the steps to solve XYZ?”_ Let it list the approach. Then ask: _“Great, now using those steps, solve the problem.”_ This is a bit like manual CoT – you guide the reasoning first, then execution. GPT-4 is usually capable of doing it in one go, but this human-in-the-loop approach can help if the model is getting answers wrong; you can inspect its plan first.
    

**Benefits of chain-of-thought prompting:** It **improves accuracy** by breaking down complex tasks. It also **increases transparency** – you can see _why_ the model gave an answer, because it shows the reasoning. This is great for learning; if ChatGPT explains a physics problem step by step, you not only get the answer but also understand the process. Additionally, if it makes a mistake in reasoning, you can spot where it went wrong more easily. CoT essentially encourages the model to behave more like a human student showing their work.

**A small trade-off:** Chain-of-thought responses are usually longer and more verbose. For example, if you ask a complex question with CoT, you’ll get a detailed explanation plus the answer, rather than just a quick answer. In most learning scenarios that’s actually a _good_ thing. But if you ever need just the final answer (with no reasoning shown), you might have to specifically instruct the model accordingly (or just extract the final line). In general, though, for research and study, the detailed reasoning is beneficial.

**When to use CoT:** Use it for any problem that isn’t trivial – multi-step math, logic puzzles (“Alice meets Bob on Tuesday, Bob meets Carol on Wednesday... who did Alice meet?” type questions), anything requiring analysis (like legal or ethical reasoning), or planning tasks. Also, if you get an answer that seems too short or possibly oversimplified, try asking the model to “show your reasoning” in a follow-up – you might discover it corrects itself in the process of explaining.

**Try it yourself:** Take a question that normally might trick you (for example, a tricky algebra word problem or a riddle). First, ask it normally: _“\[Question\]?”_ Note the answer. Then ask with a CoT prompt: _“\[Question\]? Let’s think step by step.”_ Compare the answers. Did the step-by-step prompt yield a more correct or comprehensive solution? This will give you a feel for when CoT is useful.

For instance, you could try: _“If a library has 30 shelves with 40 books each, and 1/6 of all books are checked out, how many books are currently on the shelves? Let’s think step by step.”_ Watch how the model breaks it down (total books = 30×40, books checked out = one-sixth of that, subtract from total, etc.) and arrives at the answer. This approach mimics how you’d work it out yourself, reinforcing your understanding.


对于较难的问题，最强大的技巧之一通常是思维链提示，也就是要求模型在给出最终答案之前，先把推理过程按步骤写出来。这就像让模型“把思考过程说出来”。模型不再直接跳到结论，而是先列出中间步骤、考虑因素或计算过程。研究发现，这种方法能显著提高模型在复杂任务上的正确率，尤其是在数学应用题、逻辑谜题和多步推理任务中。

最简单的做法之一，是在提示末尾加上类似“让我们一步一步思考”或者“请逐步展示你的推理过程”这样的话。令人惊讶的是，仅仅增加这样一句话，就足以促使 GPT-4 这类模型给出更有结构的分步解答，而且往往能使原本会答错的问题变成答对。研究中曾发现，一个 GPT-4 之前的模型在普通提问下解数学题时会答错，但加上“让我们一步一步思考”后，准确率从 18% 上升到了 79%，几乎提升了四倍。

这种效果说明，思维链提示对推理任务具有很强的促进作用。使用时有几种常见方式。第一种是隐式思维链，也就是直接要求模型“边想边说”。例如：“1 到 100 之间有多少个质数？让我们一步一步算。”在这种情况下，模型通常会列举质数，或写出其检查过程，然后再给出总数。对于很多数学和逻辑问题，这种做法能显著提升可靠性，因为它迫使模型不跳步。

第二种是显式思维链加示例，也就是把少样本提示和思维链结合起来。你可以先给出一个问题及其详细的分步解法，再让模型用相同方式处理一个新问题。比如，先展示一题“3 只猫 3 分钟抓 3 只老鼠，100 分钟抓 100 只老鼠需要几只猫”的解题过程，再让模型处理另一道相似题。这相当于让模型不仅学习任务本身，还学习“如何推理”。

第三种方式是把推理拆成多个回合。你先问：“解决这个问题需要哪些步骤？”让模型先给出计划；然后再让它按照这些步骤真正求解。这有点像人工主导的思维链：先检查它的解题策略，再让它执行。虽然 GPT-4 通常能在一个回合内完成，但如果模型经常答错，这种先规划后执行的方式会很有帮助。

思维链提示的主要好处有几个。首先，它能提高准确性，因为复杂任务被拆成了多个简单步骤。其次，它提高了透明度——你不仅看到了结论，也看到了模型为什么这样回答。这对于学习者尤其有价值。例如，模型一步一步解释物理题，你不仅拿到了答案，也理解了解题方法。再者，如果模型在推理中出错，你也更容易定位错误出现在何处。可以说，思维链提示是在鼓励模型更像一个“写出全过程的学生”。

当然，这种方法也有一个小代价：回答会更长，更详细。对于复杂问题，模型不只给结论，还会给一整套推理说明。在大多数学习和研究场景中，这其实是优点；但如果你只需要最后答案，那就需要额外说明只要结论即可。总体上，对于研究、学习和复杂分析，详细推理通常是值得的。

何时适合使用思维链提示？几乎凡是涉及多步思考的任务都适合，例如多步骤数学问题、逻辑推理、法律或伦理分析、计划制定等。如果模型给出的回答太短、似乎过于简化，也可以追问：“请展示你的推理过程。”模型有时会在解释过程中自行修正答案。

例如，可以尝试这样的问题：“如果一个图书馆有 30 个书架，每个书架有 40 本书，其中六分之一的书被借走了，那么现在书架上还有多少本书？让我们一步一步来。”模型通常会先计算总书数，再算被借走的数量，最后求剩余数量。这种方式很像人类自己的解题过程，因此也有助于巩固理解。 

> * chain-of-thought prompting [tʃeɪn əv θɔːt ˈprɒmptɪŋ] 思维链提示；要求模型显式写出中间推理步骤的提示方法
> * think out loud 把思考过程说出来；相当于显式展示内部推理步骤
> * intermediate steps 中间步骤；从问题到答案之间的推理过程
> * transparency [trænsˈpærənsi] n.透明性；能看出答案是如何得到的
> * structured [ˈstrʌktʃəd] adj.有结构的；条理清晰的
> * implicit / explicit CoT 隐式／显式思维链；前者只要求逐步思考，后者还会给出带推理的示例

### Self-Critique and Reflection: Letting the Model Check Its Work

Even with careful prompting, ChatGPT’s first answer may not always be **complete, correct, or optimal**. An advanced (but very useful) strategy is to have the model **review and critique its own response**, then improve it. Think of it as asking ChatGPT to be its own peer reviewer or editor. This can lead to more accurate and refined answers, because the model might catch its earlier mistakes or add details it missed.

**What is self-critique?** In prompt engineering terms, self-critique (or _self-reflection_) means prompting the model to reflect on its answer, identify any flaws or gaps, and then revise accordingly. It’s inspired by how humans often review their work and make improvements. Recent research suggests that this iterative reflection can make LLMs more **logical and consistent**. For example, an LLM might initially give a slightly illogical solution to a puzzle; if asked to scrutinize its solution, it could recognize the error and fix it in a second attempt.

**How to do it:** Usually, you perform self-critique in a **separate turn** after the initial answer (treating it as a second step). Here’s a simple sequence:

1.  **User:** _(Asks a question or gives a task.)_
    
2.  **Assistant:** _(Gives initial answer.)_
    
3.  **User:** _“Please review your answer above. Are there any mistakes or things you might have missed? If so, correct them. Explain your reasoning.”_
    
4.  **Assistant:** _(Critically evaluates its previous answer and makes corrections if needed.)_
    
By explicitly requesting a review, you nudge ChatGPT to allocate “brainpower” to double-checking itself. GPT-4 is quite capable of this. For instance, in math problems, it might say, _“Upon reflection, I realize I made an arithmetic error computing the sum. Let me correct that…”_ and then provide a corrected answer. In a research context, you could ask it, _“Does the answer above consider all key points? Please critique it and improve the answer if necessary.”_

**Important:** It’s often best to separate the critique phase from the initial answer phase. If you try to mash it all in one prompt (“Answer the question and then critique your answer”), the model might get confused or produce a disorganized response. Keeping them separate (answer first, then critique) yields better results. This aligns with the idea of _feedback loops_ in prompt engineering, where the model’s output is iteratively refined.

**Benefits of self-critique:** As noted, it can catch logical errors, **reduce contradictions**, and cause the model to acknowledge uncertainty if something truly isn’t known. For you as a learner, this means a more reliable final answer. Also, seeing the model’s critique is educational: you observe _how it evaluates an answer_. This might expose subtle points you didn’t consider. For example, if you have it critique an essay it wrote, it might say _“I realized I didn’t address the counterargument about X, which could strengthen the essay.”_ This is a valuable insight.

**Example use cases:**

*   **Academic essay or solution checking:** After ChatGPT writes an essay or a proof, ask it to critique its work: _“Can you check if your essay fully answers the question and follows a logical flow? What could be improved?”_ It may point out if it went off-topic or if it lacks evidence in one section, then it can rewrite that part.
    
*   **Programming help:** If it provides code, you can ask _“Does this code handle all edge cases? Please double-check and fix any bugs.”_ It might then realize a scenario that would break the code and adjust it.
    
*   **Fact-checking:** If you’re using ChatGPT for research summaries, you can prompt: _“Double-check the factual claims you made and ensure they are supported by known information. Correct any inaccuracies.”_ The model might not have browsing (unless you enable it), but it can sometimes internally verify with its training data or at least flag uncertain claims (e.g., _“I mentioned X, but I’m not entirely sure if that date is correct.”_).
    

**Prompt templates for self-critique:** You can use polite, instructive language. Here are some examples derived from prompt engineering guides:

*   _“Could you go over your previous response step by step to ensure nothing was overlooked?”_
    
*   _“Please re-examine your last answer and check for any errors or missed details.”_
    
*   _“I'd like you to critique your previous response and then improve it based on that critique.”_
    
*   _“Analyze your last answer and verify if all parts of the question were addressed, correcting any mistakes.”_
    

You don’t need to use those verbatim (though you can!). The key is to **explicitly ask for a critical review**. GPT-4 will typically oblige with a thoughtful analysis of its prior answer, and then present a revised answer. Sometimes the model will say “Upon review, I believe my answer was mostly correct, but I can add more detail on X,” which is fine too.

**Try it yourself:** After ChatGPT answers a question for you (any question where accuracy matters), respond with something like _“Can you double-check your answer for accuracy and completeness?”_ and see what happens. For example, ask _“What were the causes of the 2008 financial crisis?”_ Get the answer, then follow up: _“Thanks. Now, critique that answer. Did you miss any major cause or detail? Please revise the answer if needed.”_ You might see the model add a point about, say, deregulation or incorrect risk assessments if it missed those initially. This exercise shows the value of giving the model a second pass to _think more critically_.



即使提示设计得很仔细，ChatGPT 的第一版回答也不一定总是完整、正确或最优。因此，一个高级但非常实用的策略，就是要求模型回头审查并批评自己的答案，然后在此基础上进行改进。可以把它理解为：让 ChatGPT 充当自己的同行评审或编辑。这种做法往往会带来更准确、更精炼的回答，因为模型有时能够在第二轮中发现并修正自己先前的错误，或者补上遗漏的信息。

所谓自我批评，或者说自我反思，在提示工程中是指：通过提示让模型回顾自己的答案，找出其中的缺陷、漏洞或不足，然后加以修正。这一思路来自人类写作和思考中的常见过程——我们往往先给出初稿，再通过审查加以改进。近期研究也表明，这种迭代式反思可以使大型语言模型的推理更加合乎逻辑，前后一致。例如，模型第一次解谜时可能会给出一个稍显不合理的方案，但在被要求检查自己的推理后，它可能会意识到其中的问题，并在第二次作答时修正。

实际使用中，最好把“回答”和“批评”分成两个回合来做。典型流程是：先提出问题，模型给出初步回答；然后再要求它审查自己刚才的答案，例如：“请检查你上面的回答，看看有没有错误或遗漏。如果有，请改正，并解释原因。”通过这种明确的复查要求，你实际上是在推动模型投入更多“注意力”去验证自己刚才的输出。GPT-4 通常很擅长这件事。例如，面对数学题，它可能会说：“重新检查后，我发现我在求和时有一个算术错误。下面是修正后的答案。”在研究或写作场景中，也可以用类似方式让它补充遗漏的关键点。

有一个重要经验是：批评阶段最好与初始回答阶段分开。如果你在同一个提示中同时要求“先回答，再批评自己的答案”，模型有时会把两种任务混在一起，导致输出混乱。把这两个步骤分开，通常效果更好。这也符合提示工程中的反馈循环思路，即通过多轮交互逐步提高答案质量。

自我批评的主要好处在于，它能够发现逻辑错误、减少前后矛盾，并促使模型承认真正存在的不确定性。对学习者而言，这意味着最终得到的答案往往更可靠。而且，观察模型如何批评自己本身也是一种学习机会——你可以看到它是如何评估一个答案优劣的。例如，如果让它审查自己写的一篇文章，它可能会指出：“我没有处理关于 X 的反方论证，这一部分可以加强。”这本身就是有价值的分析。

这种方法有很多适用场景。在学术写作或证明检查中，模型先写出文章或证明，再要求它审查是否真正回答了题目、是否结构合理、是否需要更多证据，它有时会主动指出跑题或论证不足之处，并重写相关部分。在编程帮助中，如果它给出了一段代码，可以追问：“这段代码是否考虑了所有边界情况？请重新检查并修复潜在 bug。”模型有时会在第二轮中发现原先忽略的特殊情况。在事实性总结中，也可以要求它重新核查自己先前提出的事实陈述，尽管在无法联网时它不能真正访问最新资料，但有时仍能根据训练中的知识发现不确定之处，或者至少标出哪些内容自己不太确定。

常见的提示方式包括：“请逐步检查你之前的回答，确认是否有遗漏。”“请重新审视你上一条回答，看看是否存在错误或缺失的信息。”“请先批评你的上一条回答，再根据批评进行改进。”这些说法不必逐字照搬，关键在于明确要求它进行批判性回顾。GPT-4 往往会配合，先分析上一个答案，再给出修订版本。有时候它会说“经过检查，我认为原回答基本正确，但可以补充 X 的细节”，这也同样有价值。

在实际练习中，只要某个问题的准确性比较重要，都可以在模型回答后加上一句：“请再检查一遍你的答案，确认其准确性和完整性。”例如，先问“2008 年金融危机的成因有哪些？”，得到初步回答后，再追问：“现在请批评你刚才的回答。你是否遗漏了重要原因或细节？如有必要，请修订答案。”这样往往能看到模型补上之前漏掉的内容，例如监管放松、风险评估失误等。这个过程有助于体会：给模型第二次机会进行更严格思考，往往能显著改善结果。 

> * self-critique [ˌself krɪˈtiːk] 自我批评；模型对自己先前答案进行审查和修正
> * self-reflection [ˌself rɪˈflekʃən] 自我反思；回顾自身输出并找出不足
> * peer reviewer 同行评审；学术中对作品进行审查和评价的人
> * iterate / iterative [ˈɪtəreɪt / ˈɪtərətɪv] 迭代；通过多轮改进逐步提高结果
> * feedback loops 反馈循环；输出经过回顾再被用于改进后续输出的过程
> * edge cases 边界情况；不常见但可能导致错误的特殊输入或情形

### Tool-Augmented Prompting: Extending ChatGPT’s Abilities with External Tools

By itself, ChatGPT (even GPT-4) has limitations: it has a fixed knowledge cutoff (it won’t naturally know events after a certain date, like late 2021 for GPT-4’s base model), it can’t browse the web on its own (unless augmented), and it might struggle with tasks like heavy calculations or data analysis within the text model. **Tool-augmented prompting** is about leveraging external tools or data to overcome these limits. In simple terms, this means either **providing additional information to the model** or **having the model invoke outside help** when needed.

OpenAI has introduced features like **plugins and function calling** to allow models to use tools. For example, ChatGPT can be connected to a web browser, calculators, code interpreters, or custom knowledge bases. When such tools are enabled, the model can decide to call them. For instance, if you ask _“What’s the weather in Osaka right now?”_ and a weather plugin is enabled, the model might call a `get_weather` function and then respond with the real-time weather instead of saying it doesn’t know. The model’s ability to detect when to use a function and produce a correct function call is something it’s been trained on. In the API, developers define tool “interfaces,” and the model will output a JSON object to use them when appropriate. In ChatGPT’s interface, this happens behind the scenes with plugins.

As a user, you don’t need to know the API details, but it’s useful to know **when and how to prompt for tool usage**:

*   **Explicitly ask for up-to-date info:** If you have the browsing tool or web access plugin on, you can phrase your query to encourage its use. For example: _“Using the browsing tool, find the latest research on renewable energy in 2025 and summarize it.”_ The model will likely initiate a web search. If you just said “summarize the latest research on renewable energy in 2025” without mentioning the tool, the model might either say it can’t or (worse) try to guess. So indicating that it should use the tool is helpful.
    
*   **Data or text analysis with Code/Advanced Data tools:** ChatGPT has an **Advanced Data Analysis** (formerly called Code Interpreter) mode where it can execute Python code. If you have this, you can upload a dataset and then ask: _“Analyze this dataset for trends in climate over years. Use the Python tool to generate a chart.”_ The model will then write and execute code to do so. This is incredibly powerful for research assistance – for example, analyzing experimental data or large text corpora. Prompt engineering for this involves clearly stating what analysis or output you want (mean, plot, regression, etc.) just as you would instruct a human data analyst.
    
*   **Retrieval-augmented generation:** If you have a custom knowledge base (say, a bunch of academic papers or notes), some plugins or systems allow ChatGPT to fetch relevant documents when answering your question. In prompting terms, you might not see this directly, but you could phrase: _“According to the provided literature, what are the main theories about dark matter?”_ The system could then retrieve the relevant snippets from your uploaded papers and the model will incorporate them in the answer. If you suspect ChatGPT might not know something, you can feed it the info. For example: _“Here is the abstract of a paper \[paste abstract\]. Summarize it and then critique its methodology.”_ Now the model has that info and can work with it.
    
*   **Math and calculation:** If you don’t have a calculator tool, ChatGPT will try to calculate itself, but it might make arithmetic mistakes for very long calculations (it’s not a perfect calculator). If a calculation is critical, you can either do it separately or use the _“let’s do this step by step”_ approach to minimize errors. But if a calculator tool is available, use it! You could say: _“Use the calculator to compute the standard deviation of these values: \[list of numbers\].”_ The model will then likely offload that to the tool.
    

**Behind the scenes (FYI):** The function calling capability introduced in 2023 lets the model output a JSON with a function name and arguments when it decides a tool is needed. This is how ChatGPT plugins work. For example, with a Wikipedia plugin, if you ask for info on a specific topic, the model might internally call something like `wiki_search("topic")` and then `wiki_getArticle("Topic_ID")` and then it will use the result to answer. The key point for us is: the model is smart at figuring out _when_ to use a tool if it has one. So your job as the prompter is just to ensure the model _knows it has access_ and to encourage it to use it rather than guessing.

**Agentic use of tools:** There’s also the concept of **ReAct (Reason + Act)** prompting, where the model iteratively reasons and uses a tool in a loop until it finds an answer. This is more of a developer setup (like how AutoGPT works, giving the model a goal and letting it plan, search, etc.). However, even as a user, you can manually do a bit of this: ask the model what it needs to solve a problem, let it tell you it needs data, you give it data, and so on. We’ll talk more about agentic prompting in the next section, but keep in mind that tool-use is a core part of making an AI agentic (able to act).

**Examples:**

*   _Literature research example:_ _“Use the browser to find the publication year of the article _‘Quantum Entanglement in Photosynthesis’_ and then explain the main finding.”_ The model should do a web search (if enabled), find the info (e.g. year 2024), and then give you the explanation with the correct year referenced.
    
*   _Multilingual example:_ If you want a translation with context, you could use a translation plugin or just provide examples. But interestingly, GPT-4 itself is strong in languages, so tools aren’t needed for translation. However, a dictionary API could be a plugin – you might prompt _“Use the dictionary tool to get precise definitions of the following technical terms: X, Y, Z.”_
    

**If you don’t have plugins or tools available:** You can still **manually augment** ChatGPT by providing the info yourself. For instance, if you want an analysis of a specific document, you can paste parts of it and ask for analysis (watch the context length though). Or if you need a calculation, you could compute it and feed it back. It’s not as slick, but it works. The goal is to not rely on the model’s memory alone when external info is needed.

**Try it yourself:** If you have access to ChatGPT plugins or the browsing mode, give them a spin. For example, turn on the browsing feature and ask: _“What were the headlines in tech news today? Use the browsing tool to give me the latest update.”_ You’ll see the model perform searches and then answer. Or use the Advanced Data Analysis mode: upload a CSV file of something (maybe a small dataset from Kaggle) and ask questions about it. This will show you how the model can act as a **research assistant with tools**, not just a Q&A bot.


工具增强提示（Tool-augmented prompting）：借助外部工具扩展 ChatGPT 的能力

单靠 ChatGPT 本身，即使是 GPT-4，也存在一些限制。它有固定的知识截止时间，无法自然知道截止日期之后发生的事件；在没有增强功能时，它也不能主动浏览网页；而在复杂计算或数据分析上，仅靠语言模型本身也可能不够稳定。所谓工具增强提示，就是利用外部工具或外部数据来弥补这些限制。简单地说，就是要么把额外信息提供给模型，要么让模型在需要时调用外部能力。

OpenAI 已经引入了插件、函数调用等机制，使模型能够使用工具。例如，ChatGPT 可以连接浏览器、计算器、代码解释器，或者自定义知识库。当这些工具可用时，模型就可以在合适的时候决定调用它们。比如，如果你问“现在大阪天气如何？”，而天气插件已经开启，模型就可能调用天气函数，而不是凭空猜测。模型能否识别什么时候该用工具，以及能否正确构造工具调用，本身也是经过训练的结果。在 API 场景中，开发者会预先定义工具接口，模型在适当时候输出相应的 JSON 调用对象；而在 ChatGPT 图形界面中，这些过程通常都在背后完成。

作为普通用户，不必了解 API 的实现细节，但了解什么时候以及如何提示模型使用工具是很有帮助的。第一类场景是时效性信息。如果你开启了浏览功能或联网插件，就应明确表达希望它使用工具。例如：“请使用浏览工具查找 2025 年关于可再生能源的最新研究，并为我总结。”如果你只说“总结 2025 年关于可再生能源的最新研究”，模型可能要么直接表示做不到，要么更糟糕，尝试凭空猜测。因此，明确提示“使用浏览工具”会更稳妥。

第二类场景是数据分析或文本分析。如果你拥有高级数据分析功能，也就是以前所谓的 Code Interpreter，那么你可以上传数据集，并明确说明希望它做什么，比如：“请使用 Python 工具分析这个数据集中的气候年份趋势，并绘制图表。”这时，模型就会编写并执行代码来完成分析。这种能力对于研究辅助非常强大，例如分析实验数据、大型文本语料，或者自动生成统计图。对此类工具的提示方式，本质上与给人类数据分析师下达任务类似：要清楚说明目标，是要求均值、回归、可视化，还是其他分析。

第三类场景是检索增强生成。如果你有一个自定义知识库，例如一批学术论文、笔记或文档，某些系统可以在回答问题时自动检索相关材料。在这种情况下，你可能感觉不到检索过程本身，但可以通过提问方式来引导，例如：“根据提供的文献，暗物质的主要理论有哪些？”系统随后会检索相关片段，再由模型整合成回答。如果你怀疑 ChatGPT 并不掌握某些内容，也可以直接把材料贴给它。例如：“这是某篇论文的摘要，请先总结，再评价其方法论。”此时模型回答所依赖的就不再只是它原有记忆，而是你提供的文本。

第四类场景是数学与计算。如果没有计算工具，ChatGPT 也会尝试计算，但在很长或复杂的算术过程中可能出错。如果计算非常关键，可以采用分步推理方式来降低错误率；但如果计算器可用，最好明确让它使用。例如：“请用计算工具求这些数值的标准差。”这样模型就会把计算交给更可靠的工具执行。

从机制上看，函数调用能力允许模型在需要时输出带有函数名和参数的 JSON。这正是插件系统背后的基础。不过，对用户而言，真正重要的是：如果模型拥有工具，它通常知道何时应该调用它。因此，用户的任务主要是确保模型知道自己“可以用工具”，并在需要时明确鼓励它使用工具而不是猜测。

还有一种与工具使用相关的重要思路，是 ReAct，也就是“推理加行动”的框架。在这种方式中，模型会在推理和行动之间不断循环：先思考下一步该做什么，再调用工具，再根据结果继续推理。这更多见于开发者搭建的代理系统中，例如 AutoGPT 一类框架。但在普通对话中，你也可以手动模拟这一过程：先问模型它需要什么信息来完成任务，它可能回答需要某些数据，你再把数据提供给它，然后继续。后文会进一步讨论代理式提示，但要记住，工具使用正是模型具备代理能力的重要基础。

在实际应用中，例如做文献研究时，你可以要求模型使用浏览功能查找某篇文章的发表年份，并解释其主要发现；又或者在多语言场景中，尽管 GPT-4 本身已很擅长翻译，但若你有词典类工具，也可以要求它用词典接口给出专业术语的精确定义。如果没有任何插件或工具，也仍然可以采用“手动增强”的方式：把你掌握的信息直接粘贴进提示中，或自己先做部分计算再交给模型分析。虽然没有自动化工具那样方便，但同样能够显著提升回答质量。

如果你拥有浏览或插件功能，可以尝试直接使用它们。例如，开启浏览后提问：“今天科技新闻的头条有哪些？请使用浏览工具给我最新更新。”又或者在高级数据分析模式中上传一个 CSV 文件，请模型分析趋势、回答问题、绘制图表。通过这些练习，可以更直观地体验到：模型不仅是一个回答问题的系统，还可以成为一个能够借助工具工作的研究助手。 

> * tool-augmented prompting [tuːl ɔːɡˈmentɪd ˈprɒmptɪŋ] 工具增强提示；通过调用外部工具或引入外部数据来扩展模型能力
> * plugins [ˈplʌɡɪnz] 插件；为模型接入浏览、天气、数据库等外部能力的组件
> * function calling 函数调用；模型输出结构化参数以请求外部程序执行某项功能
> * retrieval-augmented generation [rɪˈtriːvəl ɔːɡˈmentɪd ˌdʒenəˈreɪʃən] 检索增强生成；先检索外部资料，再在其基础上生成回答的方法
> * code interpreter / advanced data analysis 代码解释器／高级数据分析；允许模型执行 Python 等代码来处理数据和文件
> * behind the scenes 在幕后；指用户看不到但系统实际执行的内部过程

### Agentic Prompting: Making ChatGPT an Autonomous Assistant

As we explore advanced territory, **agentic prompting** is about pushing the model to behave more like an **independent agent** that can handle a complex objective through planning, reasoning, and tool use. In simpler terms, instead of a single Q&A, you give the model a **role, a goal, and some freedom to figure out the steps** to achieve that goal. This is an emerging area, especially with the development of GPT-4-based agents (like AutoGPT, BabyAGI, and frameworks in 2024-2025 that let GPT plan multi-step tasks).

**What does agentic mean?** It means acting with agency – the model isn’t just responding passively to one prompt at a time, but taking initiative to complete a larger task. For example, a normal prompt might be _“Summarize this article.”_ An agentic scenario would be: _“You are an AI research assistant. Your goal is to produce a comprehensive report on climate change’s impact on coral reefs. You have access to a web browser and scientific articles. Plan your approach and then execute it step by step.”_ In the agentic approach, ChatGPT might outline steps like “1. Search for recent studies on coral reefs and climate change. 2. Gather data on reef bleaching events... 3. Summarize findings...” and so on, essentially **creating and following a plan** to achieve the end goal.

With GPT-4 and presumably GPT-5, such multi-step prompting is possible. In fact, a prompting guide for GPT-4.1 noted that _“giving GPT a mission”_ and asking it to stay persistent, use tools, and reflect between steps turned it into a more capable assistant. They suggest adding instructions like **“stay persistent, use tools instead of guessing, and reflect after each step”** for an agentic effect. This basically instructs the model to not give up easily, to actually leverage tools (if available) rather than hallucinate, and to self-monitor progress.

**How to prompt agentically:** The key is to **set a clear high-level objective and constraints**, and often to ask for a plan first. For instance:

*   **Step 1: Role + Goal:** _“You are a diligent research assistant AI. Your goal is to help me write a literature review on quantum computing in medicine.”_ This sets context and purpose.
    
*   **Step 2: Request a plan:** _“Outline the steps you would take to gather information and compile the literature review. Number these steps.”_ The model will then produce something like: 1) Identify key subtopics, 2) Search for relevant papers, 3) Summarize each paper, 4) Organize summaries into sections, etc.
    
*   **Step 3: Let it execute step by step:** You can then either manually guide it (“Okay, perform step 1 now.”) or, if using an autonomous agent setup, the model might loop through steps on its own. In ChatGPT’s normal interface, you’ll have to go step by step. For example, you say: _“Great. Now do step 1: identify key subtopics in quantum computing applied to medicine.”_ It does that. Then you say, _“Now step 2: find relevant papers (you can just name some known key papers or areas).”_ If browsing is on, it might try to search; if not, it might say we need papers on X, Y, Z. Then you proceed accordingly. Essentially, **you and ChatGPT form a plan and follow it.**
    

This might sound like just a structured way of doing a task, and it is – the difference is, you’re engineering the prompts to let the model drive the process rather than you asking a single question at a time with no context of the overall goal.

**AutoGPT and beyond:** There are tools outside the base ChatGPT UI where you can just give the high-level goal and the AI agent will iterate by itself (planning, tool-using, reflecting without user intervention). With ChatGPT alone, you simulate this by going through the steps with it interactively.

**Agentic prompting in practice (example):** Let’s say you want to build a simple knowledge base. You might prompt: _“You are an AI agent designed to create study notes. Task: Create a study guide on the philosophy of mind. Step 1: list the main topics in philosophy of mind. Step 2: for each topic, provide a summary. Step 3: compile references for further reading (you have access to a bibliography tool). Execute this plan.”_ ChatGPT might then: Step 1 – list topics (like Dualism, Physicalism, Consciousness, AI minds, etc.), Step 2 – give a paragraph on each, Step 3 – (if it had a tool or just from memory) list some reference books or papers. Throughout, because we set it as an “agent”, it knows it has a multi-part job and will likely maintain consistency and goal-focus across the steps.

**A simpler everyday example:** Agentic prompting doesn’t always need tools or grand tasks. It could be as simple as telling the model to **act like a tutor that guides you through solving a problem**. E.g., _“You are a math tutor. I as the student will try to solve a problem, and you should guide me step by step, asking me questions at each step.”_ Now the model isn’t just solving the problem; it’s managing a process (tutoring) which involves multiple turns and adapting to your input. This is a form of agentic behavior because it’s not a one-shot answer, it’s an interactive plan.

**Precautions:** When giving the model more autonomy, always ensure you’ve set boundaries in the instructions. For instance, “use tools instead of hallucinating answers” (if something needs external info), or “think and reflect between steps”. These help the model avoid going off track. Also, keep an eye on it – as of 2025, models are strong but not perfect. An agentic GPT might still make a wrong assumption in step 3 and carry it through. The benefit is you can catch that in the stepwise output and correct course (just like you would with a human assistant).

**Try it yourself:** A fun exercise to experience agentic prompting: _“You are ChatGPT-5, an AI agent who can use a calculator and the internet. Your mission is to plan a one-week trip itinerary for Tokyo for under $1000. Outline your plan day by day, ensuring the total budget is within $1000. Use the calculator if needed to sum costs, and search for any specific attraction details if needed.”_ – If you have browsing, the AI might actually search for ticket prices, etc. If not, it might make reasonable assumptions. The key is it will outline a day-by-day plan with costs, effectively acting like a travel agent planning, calculating, adjusting. This gives a taste of treating ChatGPT not just as an answer-generator, but as an **agent that handles a complex task**.


代理式提示（Agentic Prompting）：让 ChatGPT 更像一个自主助手

随着提示工程走向更高级阶段，所谓代理式提示，指的是推动模型更像一个能够独立处理复杂目标的“代理”。它不再只是对单个问题作出被动回应，而是要围绕一个更大的任务进行规划、推理，并在必要时使用工具。简单说，与其给模型一个单独的问题，不如给它一个角色、一个目标，以及一定的自主空间，让它自己想出实现目标的步骤。

所谓“代理性”，就是具备行动的自主性。普通提示可能只是“总结这篇文章”，而代理式场景则可能是：“你是一名 AI 研究助理。你的目标是撰写一份关于气候变化对珊瑚礁影响的综合报告。你可以使用浏览器和科学论文。请先规划你的方法，再一步一步执行。”在这样的设定下，ChatGPT 可能会先列出步骤，例如先搜索近期研究，再收集珊瑚白化事件数据，然后整理并总结结论。也就是说，它不仅在回答一个问题，而是在围绕整体目标制定计划并逐步推进。

GPT-4 以及未来更强的模型已经能够在一定程度上支持这种多步目标导向的交互。有关 GPT-4.1 的一些提示指南就指出，如果赋予模型一个“任务使命”，并明确要求它保持持续性、使用工具而不是猜测、每一步之后进行反思，那么它会表现得更像一个真正的智能助手。这类提示的核心，是让模型不要轻易放弃，要优先借助工具获取信息，并且在每一步后都检查自己是否仍然沿着目标前进。

设计代理式提示时，关键在于先设定清晰的高层目标和约束，并且通常先要求模型给出一份计划。例如，第一步可以先设定角色和目标：“你是一位认真负责的研究助理 AI，你的目标是帮助我完成一篇关于量子计算在医学中应用的文献综述。”第二步要求它提出计划：“请列出你将如何搜集资料并撰写综述，按步骤编号。”模型可能会回答：一、识别关键子主题；二、查找相关论文；三、概括各篇论文；四、按主题组织内容。接下来，你可以让它逐步执行，例如先完成第一步，再进行第二步。在 ChatGPT 的常规界面中，这通常仍然需要用户逐步推动，但整个过程已经具有明显的“代理式”特征，因为模型是在围绕一个长期目标持续行动，而不是只对单次提问作答。

在外部工具生态中，如 AutoGPT、BabyAGI 等系统，用户甚至只需给出高层目标，代理就会自己不断迭代、计划、调用工具并反思，无需每一步都手动介入。而在普通 ChatGPT 对话中，你可以通过多轮结构化交互来近似模拟这一过程。

代理式提示在实际中有很多应用。例如，如果你想让模型帮你构建一份学习资料，就可以说：“你是一个专门制作学习笔记的 AI 代理。任务是创建一份关于心灵哲学的学习指南。第一步列出主要主题；第二步为每个主题写一段总结；第三步给出延伸阅读参考。”这样，模型会先列主题，再逐步完成每个部分，最后给出书目或论文建议。由于最初已明确设定它是“执行多步任务的代理”，它通常会在整个过程中保持较好的目标一致性。

其实，代理式提示并不一定非要结合复杂工具或宏大任务。日常中，也可以通过代理式方法让模型扮演导师。例如：“你是一位数学导师。我会尝试自己解一道题，你要一步一步引导我，在每一步都先提问，再根据我的回答决定下一步。”在这种情况下，模型不再只是直接给出解答，而是在管理一个持续性的教学过程，这本身就是一种代理行为。

当然，给予模型更多自主性时，也需要提前设定边界。例如，明确告诉它在需要外部信息时应优先使用工具而非猜测，或者要求它在每一步后反思当前进展。这些限制可以帮助它避免偏离目标。同时也要意识到，即使到 2025 年左右，模型虽然已经很强，但仍可能在第三步或第四步时建立起错误假设，并沿着错误方向持续推进。幸运的是，由于整个过程通常是逐步展开的，用户有机会及时发现并纠正。

一个有趣的练习是这样设计任务：“你是一个可以使用计算器和互联网的 AI 代理。你的任务是在 1000 美元预算内，规划一周东京旅行的详细日程。请按天安排计划，并确保总预算不超出 1000 美元；如有必要，使用计算器汇总成本，并搜索景点信息。”如果可以联网，模型可能真的会查阅票价和景点细节；如果不能，也会尝试作出合理估计。关键在于，这时它更像一个围绕复杂目标进行规划和预算控制的旅行代理，而不只是一个回答问题的聊天系统。 

> * agentic prompting [eɪˈdʒentɪk ˈprɒmptɪŋ] 代理式提示；把模型设定为面向目标、可规划、可行动的“代理”
> * agency [ˈeɪdʒənsi] n.自主行动能力；能围绕目标主动采取步骤
> * autonomous assistant 自主助手；不只是回答问题，而是能自行推进任务的系统
> * outline a plan 列出计划；先给出完成任务的步骤框架
> * stay persistent 保持持续性；不要轻易中断或放弃任务
> * reflect between steps 在步骤之间反思；每完成一步都检查是否仍然朝着目标推进


### Putting It All Together: Best Practices and Conclusion

We’ve covered a lot: from basic prompting tips to advanced techniques like chain-of-thought, self-critique, tool use, and agentic planning. Here’s a quick summary of how you can combine these in practice for various scenarios:

*   **Start simple, then iteratively refine:** Often you begin with a straightforward question (zero-shot). If the answer is off, clarify or add context. If it’s a complex problem, move to step-by-step or give an example (few-shot). Treat the conversation like a funnel: broad question → more guided → even more guided, until you get what you need. Remember, ChatGPT learns from the conversation – use that to your advantage by refining your prompt based on its last answer.
    
*   **Use the right tool from the toolkit:** If you notice the task is about reasoning or calculation, prompt it to show steps (CoT). If it’s about a tricky format or lesser-known task, provide an example (few-shot). If the answer seems suspect or incomplete, do a self-critique round. If the question requires outside info and you have plugins, use them – or paste in the info yourself. For big tasks, outline a plan with the AI (agentic approach).
    
*   **Be mindful of model limitations:** GPT-4 (and presumably 5) are incredibly capable, but they can still make mistakes, especially factual ones or misinterpretation if prompts are unclear. Always double-check critical facts. Use self-critique or ask the model to provide sources (though be careful: models can hallucinate fake sources; verifying with a real search is wise). If the model says something confidently, it’s usually correct, but not always – maintain a slight skepticism as you would when researching with any single source.
    
*   **Leverage system messages/custom instructions for persistent needs:** If you always want answers in a certain style (say you prefer concise answers, or always with metric units, or translated to Spanish), you can set that in a system message or the custom instructions feature of ChatGPT. For example, telling ChatGPT “Always answer with a brief summary first, then a detailed explanation” as a system-level instruction can save you from repeating that each time. Just remember that extremely long or complex system instructions could still be overridden or forgotten in very long conversations, but generally, they help steer the tone and behavior globally.
    
*   **Consider the _temperature_ if you have access to it:** The “temperature” setting (mostly available via API or certain modes) controls randomness/creativity. A high temperature (~0.8-1.0) gives more varied and creative responses, which is great for brainstorming, generating ideas, or creative writing. A low temperature (~0.2-0.3) makes the output more deterministic and focused, which is better for studying factual content or getting a consistent answer. In the ChatGPT interface, you might not set this directly (unless future versions allow choosing a “creative” vs “precise” mode, which essentially tweaks temperature behind the scenes). But if you ever feel the answers are too _random_ or too _dry_, this is why. Multiple tries of the same prompt will yield slightly different phrasings due to randomness. If you need a really stable answer, you can prompt in a way that leaves little room for variation, or use the API with low temperature. Conversely, for a creative push, you can ask the model to “give 3 different ideas” or just regenerate the answer to see alternatives.
    
*   **Stay ethical and within usage policies:** This is more of a meta-tip – as you get crafty with prompts, remember ChatGPT has rules (e.g., it won’t do certain harmful tasks or give disallowed content). If you ever encounter a refusal or safety filter, re-read your prompt to see if you unintentionally tripped some wire. Usually, rephrasing to clarify a legitimate intent can help. For example, instead of _“Explain how to pick a lock”_ (which might be disallowed as illicit behavior), you could frame a legitimate scenario like _“I’m writing a novel, and a character needs to pick a lock. Can you describe in theory how they might do it?”_ Always use these AI powers for good and learning!
    

Finally, **keep experimenting and learning**. Prompt engineering is part science, part art. With practice, you’ll develop an intuition for what phrasing or technique might get the best result. Don’t be afraid to try out different approaches – you can’t “break” the AI by asking creatively. Each version upgrade (GPT-4, GPT-4.1, GPT-5, etc.) might change some behaviors, but the core strategies you learned (clarity, context, examples, step-by-step reasoning, etc.) will remain valuable. In fact, as models get _more capable_, they also tend to follow instructions more precisely, so good prompts matter even more.

**In summary,** by progressively applying these prompt engineering techniques, you can turn ChatGPT into a **versatile tutor, translator, analyst, and research assistant** at your fingertips. Whether you’re analyzing literature, studying for exams, exploring a new academic field, or conducting research, the way you instruct the model makes all the difference. Use examples to teach it, ask it to show its work, have it double-check itself, and guide it through complex tasks. You’ll find that ChatGPT is not just a Q&A bot, but a powerful collaborator in learning and discovery – as long as you provide the right guidance. Happy prompting, and best of luck with your academic and research adventures!

综合运用：最佳实践与结语

前面已经讨论了许多内容：从基础提示技巧，到思维链、自我批评、工具使用以及代理式规划等高级方法。把这些方法综合起来，最重要的原则之一是：先从简单开始，再逐步细化。很多时候，可以先用一个直接问题进行零样本提问；如果答案不理想，就进一步澄清、补充上下文；如果任务复杂，就要求模型分步骤推理，或者提供示例；如果输出看起来不完整，还可以让它自我审查。对话应被看作一个逐步收敛的过程：从简单问题开始，逐渐加上更多引导，直到得到满意结果。模型会从当前对话中学习，因此完全可以把上一轮的输出来当作下一轮改进的基础。

另一个重要原则是：针对不同任务选择合适的方法。如果任务本质上需要推理或计算，就要求模型逐步展开；如果问题涉及复杂格式或特殊风格，就给出示例；如果答案可疑，就要求自我批评；如果问题需要外部信息，就使用插件、浏览或手动提供资料；如果任务规模较大，就先让模型与你一起制定计划，再逐步执行。换言之，提示工程并不是只有一种万能技巧，而是需要根据任务类型，从工具箱中挑选最合适的手段。

与此同时，必须始终意识到模型的局限。GPT-4 以及更高版本虽然非常强大，但仍会犯错，尤其是在事实性问题、时间敏感问题和含糊指令上。关键事实仍应核实。如果模型给出了看起来很自信的答案，这往往意味着它大概率正确，但绝不能因此就完全放弃怀疑精神。特别是在研究场景中，应尽量要求来源，并在必要时用真实检索进行验证，因为模型有时甚至会编造看似真实的文献来源。

如果你在长期使用中总有某些固定偏好，例如希望回答先给简要结论、再给详细解释，或者总是使用公制单位，那么这些偏好可以放在系统提示或 ChatGPT 的自定义说明中。这样可以避免在每次提问时重复要求。当然，过长、过于复杂的系统说明在超长对话中也可能被弱化，但一般而言，它们对于整体风格和行为的引导作用仍然很明显。

如果你能接触到温度（temperature）设置，也要理解它的作用。较高温度意味着更高随机性和创造性，适合头脑风暴、创意写作、生成多个备选方案；较低温度则使输出更稳定、更集中，更适合学习事实性知识或追求一致答案的任务。在 ChatGPT 界面中，你未必能直接看到这一参数，但你可以通过提示方式间接影响结果：如果想要更稳定的回答，就尽量把任务限定清楚；如果想要更多创意，可以要求模型给出多个不同方案，或者多次重新生成比较结果。

还应注意伦理与使用边界。随着提示技巧越来越复杂，模型仍然会遵循一定的安全规则，不会执行某些有害任务。如果遇到拒答，有时只是因为提问方式触发了安全机制。对于正当用途，可以通过重新表述来澄清意图。例如，与其直接问非法或危险操作，不如明确其合法背景或研究目的。总之，强大的提示能力应被用于学习、研究和建设性用途，而不是绕过规则本身。

最后，持续实验和总结经验仍然非常重要。提示工程兼具科学性和技巧性。随着实践增多，人们通常会逐渐形成直觉：在什么场景下，怎样的表述、示例或步骤最有效。不同模型版本会改变某些细节，但核心原则——清晰、具体、提供上下文、适当示范、要求分步推理、允许模型自我检查——仍然会持续有效。事实上，随着模型能力增强，它们往往会更精确地遵循指令，因此高质量提示反而更加重要。

总体来看，通过逐步运用这些提示工程方法，ChatGPT 可以成为一个多用途的导师、翻译者、分析者和研究助手。无论是在文学分析、考试复习、新学科探索，还是正式研究中，模型能发挥多大作用，很大程度上取决于你如何引导它。给它示例，让它展示推理过程，要求它检查自己，并带着它完成复杂任务，你会发现它并不只是一个简单的问答机器人，而是一个在学习与探索中极具价值的协作者。 

> * iteratively refine 迭代式细化；在多轮中逐步改进提示与答案
> * system messages / custom instructions 系统提示／自定义说明；用于长期设定模型行为和风格的高级指令
> * temperature [ˈtemprətʃə(r)] 温度；控制模型输出随机性和创造性的参数
> * deterministic [dɪˌtɜːməˈnɪstɪk] adj.更确定的；更稳定、变化较少的
> * brainstorm [ˈbreɪnstɔːm] v./n.头脑风暴；生成多个创意想法
> * versatile collaborator 多用途协作者；能在多类任务中提供有效帮助的助手

易错点与易混点

* 零样本提示并不等于“简单提问一定够用”；一旦问题涉及复杂推理、时效性事实或特殊格式，往往需要补充说明或转向少样本提示。
* 少样本提示的关键不只是“给例子”，而是“给一致、正确、具有代表性的例子”；示例格式混乱会直接拉低效果。
* 思维链提示适合复杂推理，但不一定适合所有任务；对非常简单的问题强行要求长推理，可能只会让回答更冗长。
* 自我批评并不是保证正确的机制；它通常能改进答案，但也可能只是让错误答案变得更像“经过审查的错误答案”，因此关键事实仍需独立核查。
* 工具增强提示与普通提示的区别在于：前者把外部信息源或执行能力纳入流程。若没有工具，就应主动提供材料，而不是默认模型知道最新信息。
* 代理式提示并不只是“把任务写长一点”；它强调目标、计划、步骤执行、反思与必要时使用工具，这与单次回答型提示不同。


## Synthesizing Book Knowledge with ChatGPT: Tiago Forte’s Workflow

Many knowledge workers read voraciously but often find that **ideas slip away** if not actively captured. As Tiago Forte notes, he once raced through “50 books a year” only to realize “none of this is sticking – I’m reading thousands of words every month but it’s just passing in one ear and out the other”. To truly learn from books, Forte switched to **reading fewer books and summarizing them in his own words**, so the knowledge “really sunk in” and became a durable “building block” he could reuse. However, writing a good summary by hand is very time-consuming. When ChatGPT arrived, he saw an opportunity: could an AI produce the same insight-packed summaries in a **fraction of the time**?

> 许多知识工作者阅读量很大，但常常会发现，如果不主动捕捉和整理，书中的想法很容易流失。正如 Tiago Forte 所说，他曾经一年“读 50 本书”，后来却意识到，“这些内容根本没有真正留下来——我每个月读了成千上万字，但它们只是从一只耳朵进、另一只耳朵出。”为了真正从书中学到东西，Forte 转而选择少读一些书，并用自己的话把内容总结出来，这样知识才会“真正沉淀下来”，成为以后可以反复调用的“知识积木”。但手工写出一份好的总结非常耗时。ChatGPT 出现之后，他看到了一个机会：能不能让 AI 在“极短时间”内，生成同样富有洞见的总结？

> * voraciously [vəˈreɪʃəsli] adv.如饥似渴地；大量地
> * slip away 溜走；流失；逐渐消失
> * race through 快速读完；匆匆看完
> * sticking [ˈstɪkɪŋ] adj./v.留下来；记住；这里指知识没有真正留存在记忆中
> * durable [ˈdjʊərəbl] adj.持久的；耐用的
> * building block 基础模块；积木块；这里指可反复调用的知识单元
> * fraction of the time 只用其中一小部分时间；大大缩短所需时间

Experiments showed that _ChatGPT alone_ (without the book text) tends to give only **bland, superficial overviews** (too brief, clichéd, missing key surprises). The problem is that ChatGPT _only_ “knows” books secondhand – it cannot see the actual text you read. As Forte explains, “a summary of a summary is never good”. His solution was to **feed ChatGPT his own notes**. He reads and highlights the actual ebook (e.g. on Kindle), uses Readwise to automatically sync all highlights into a note-taking app, then works those notes down into a concise outline before asking ChatGPT to craft the summary. In short: **harness the AI, but ground it in your own curated excerpts**.

> 实验表明，单独使用 ChatGPT——也就是不提供书的原文——往往只能得到平淡、肤浅的概述：太短、太套话，也缺少关键而出人意料的内容。问题在于，ChatGPT 对书的“了解”只是间接的——它看不到你真正读过的文本。正如 Forte 所说，“对总结再做总结，效果永远不会好。”他的解决办法是：把自己的笔记喂给 ChatGPT。他先阅读并高亮电子书中的内容（例如 Kindle 里的书），再用 Readwise 自动把所有高亮同步到笔记应用里，然后把这些笔记进一步整理成简明提纲，最后再让 ChatGPT 根据提纲来撰写总结。简言之，就是：利用 AI，但要让它建立在你亲自筛选过的摘录之上。

> * bland [blænd] adj.平淡的；乏味的
> * superficial [ˌsuːpəˈfɪʃəl] adj.表面的；肤浅的
> * overview [ˈəʊvəvjuː] n.概述；综述
> * secondhand [ˈsekəndhænd] adj./adv.间接的；非第一手的
> * curated [kjʊəˈreɪtɪd] adj.经过筛选整理的；精心挑选的

### Step 1: Capture Key Highlights in Digital Notes

The first step is **active reading**. As you read the book (on an e-reader or app such as Kindle), highlight passages that _jump out_: the author’s main argument, vivid examples, striking facts, or anything that feels surprising or _resonant_. (Forte actually highlights “all the points I found most surprising, resonant, \[or\] thought-provoking”.) Use a tool like **Readwise** to automatically collect those highlights into one centralized note repository. For example, Forte reads _Where Good Ideas Come From_ on his Kindle app and all highlights sync via Readwise into his digital notes. This yields a single document containing _all_ the raw excerpts you’ve marked (often thousands of words).

> 第一步是主动阅读。在阅读一本书时——无论是在电子阅读器还是 Kindle 这类应用中——把那些特别打动你的段落高亮出来：作者的核心论点、生动的例子、醒目的事实，或者任何让你感到惊讶、产生共鸣的内容。（Forte 实际上会标出“所有让我感到最惊讶、最有共鸣、最值得思考的观点”。）然后使用 Readwise 这样的工具，把这些高亮自动收集到一个统一的笔记库中。比如，Forte 会在 Kindle 应用里读《好点子从哪里来》，所有高亮都通过 Readwise 同步到他的数字笔记中。这样就得到了一份包含全部原始摘录的单一文档，里面是你标记过的所有片段，通常会有好几千字。

> * active reading 主动阅读；指带着筛选、标记和思考去阅读，而不是被动浏览
> * jump out 突出；显得格外醒目；一下子抓住注意力
> * resonant [ˈrezənənt] adj.引发共鸣的；意味深长的

- Use an e-reader or reading app (e.g. Kindle, Apple Books) to **mark up the text** as you go. Highlight the main thesis statements, key definitions, memorable quotes, and especially anything **unusual or personally meaningful**.
- Employ a sync service (like Readwise) to **export those highlights** into your note-taking system. Readwise aggregates highlights from books, articles, PDFs, etc., so all your clippings appear together in one app. This means you can work with your notes in Evernote, Notion, Obsidian, or any tool of your choice.
- The result of Step 1 is a long note (often 5–15 pages) of **unprocessed highlights**. These are all things you thought were interesting or important, but they usually contain **too much detail** for ChatGPT’s prompt window (which tops out around 1,000–1,200 words).

> 使用电子阅读器或阅读应用（例如 Kindle、Apple Books），在阅读过程中直接标注文本。重点高亮主要论点、关键定义、值得记住的引文，尤其是那些不寻常或对你个人有意义的内容。使用同步服务（如 Readwise），把这些高亮导出到你的笔记系统中。Readwise 可以聚合书籍、文章、PDF 等来源的高亮，所以你的所有摘录都能集中出现在一个应用里。这意味着你可以在 Evernote、Notion、Obsidian，或任何你喜欢的工具中处理这些笔记。第一步的结果，通常是一则很长的笔记，往往有 5 到 15 页，里面是“尚未加工的高亮内容”。这些内容都是你觉得有趣或重要的，但通常细节太多，无法直接塞进 ChatGPT 的提示窗口，因为提示窗口大约只能容纳 1000 到 1200 个词。

> * mark up 标注；做记号；在文本中做高亮或批注
> * thesis statement 中心论点陈述；明确表达作者主张的句子
> * repository [rɪˈpɒzətri] n.存放处；资料库；这里指统一的笔记存储系统
> * unprocessed [ˌʌnˈprəʊsest] adj.未经处理的；未整理的
> * prompt window 提示窗口；输入给模型的文本区域

### Step 2: Progressive Summarization – Bold the Best Ideas

With the raw highlights in front of you, the next move is **distillation**. Forte uses his “Progressive Summarization” technique: on a first pass, he goes through the highlights and **bolds** only the sentences (or phrases) that capture the _core ideas_. In other words, he looks for **keywords, key phrases, and key sentences that feel like the essence of the idea**. This is done with no strict formula – you choose what jumps out. For example, any explicit statement of the book’s thesis is _worth a bold_, since the author has already identified the main message for you.

> 面对这些原始高亮，下一步是提炼。Forte 使用的是他的“渐进式总结”（Progressive Summarization）方法：先通读这些高亮，然后只把最能抓住核心思想的句子或短语加粗。换句话说，他会寻找那些最像“观点精华”的关键词、关键短语和关键句。这个过程并没有严格公式——你只需要挑出那些最能打动你的内容。例如，只要作者明确写出“本书的核心论点是……”，这种句子就值得加粗，因为作者已经替你指出了全书最重要的信息。

> * distillation [ˌdɪstɪˈleɪʃən] n.提炼；浓缩
> * Progressive Summarization [prəˈɡresɪv ˌsʌməraɪˈzeɪʃən] 渐进式总结；Tiago Forte 提出的方法，指通过多层筛选和压缩，把原始信息逐步提炼成更容易调用的知识
> * essence [ˈesəns] n.本质；精华

**Why “bolding”?** Imagine you have a page of text and you want to highlight its essence. Bolding is like applying a second, thicker marker: it forces you to **zero in** on the most important fragments. This first-pass editing trims the page of highlights down by about half or more, keeping only the “best of the best” points.

Key tips for this step:

- **Main Arguments:** Always bold the book’s central claims. If the author explicitly states “the argument of this book is…,” that sentence goes in bold. It encapsulates the core theme.
- **Unique Insights:** Bold analogies, examples, or statements that are especially **creative or surprising**. Forte notes that good writing often hides in “interesting unique unusual details”, so mark those.
- **Personal Resonance:** Bold what spoke to you personally. Since you saved highlights that moved you, bolding them again selects your favorite insights. Forte said his notes already contained only “valuable” content, and now he’s choosing _the best of the best_.

> 为什么要“加粗”？可以想象你面前有一页文字，而你想把它的精华部分再次标出来。加粗就像再用一支更粗的荧光笔标记一遍：它迫使你把注意力集中到最重要的碎片上。第一次编辑之后，原本那一整页高亮内容通常会缩减一半甚至更多，只保留“精华中的精华”。这一阶段有几个关键技巧。第一，主要论点一定要加粗。如果作者明确写道“本书的论证是……”，那一句就应该加粗，因为它概括了核心主题。第二，独特见解也应加粗，尤其是那些特别有创意、特别出人意料的类比、例子或陈述。Forte 指出，好文字往往藏在“那些有趣、独特、反常的细节里”，所以这类内容也要标出来。第三，把那些真正引起你个人共鸣的内容加粗。既然你原本保存这些高亮，就是因为它们打动了你，那么现在的加粗，其实是在从“已经有价值的内容”里，再选出你最喜欢、最值得留下的那部分。

> * zero in on 聚焦于；集中到
> * load of what mattered 承载最重要内容的分量；这里指一句话能代表更大一段内容的价值
> * encapsulates [ɪnˈkæpsjuleɪts] v.概括；浓缩表达

After this bolding pass, each note typically has a handful of bold lines among all the highlights. You’ve effectively _compressed_ your reading: each bolded sentence now carries the load of what mattered. (In Tiago’s example, the original highlights were ~8,000 words, and bolding reduced that dramatically.)

> 经过这一轮加粗之后，每则笔记中通常只剩下少量粗体句子散落在高亮内容之间。你实际上已经把阅读内容压缩了一遍：每一句被加粗的话，现在都承担着“这部分真正重要的是什么”这一功能。（在 Tiago 的例子中，原始高亮大约有 8000 词，而加粗之后，内容被大幅压缩。）

> * compress [kəmˈpres] v.压缩；浓缩

### Step 3: Build a Structured Outline from the Highlights

The bolded sentences now become the raw material for an outline. In this step, create a new note (or document) and **copy the bolded points into it as bullet points**, organizing them hierarchically. Start with the book’s thesis at the top, then list supporting ideas as sub-bullets. This outline tells ChatGPT **which points are main ideas and which are supporting details**.

Forte suggests the following approach:

- Split your screen or use two notes side-by-side. On the left, view the note with bolded highlights; on the right, create a fresh “Book Outline” note.
- For each bolded line you’ve marked, decide if it’s a _core point_ or a _support detail_. Copy the really critical ones into the outline on the right as main bullets. You don’t have to use _every_ bolded line – this is another chance to filter. (Forte explicitly says, “I shouldn’t do all of them…deciding if it’s truly so good it must be in my summary”.)
- Label and format the outline clearly. For example, give the outline note a title like “Outline – _Where Good Ideas Come From_ Summary” and use indented bullets for sub-points.

> 现在，这些加粗的句子就成了提纲的原材料。此时，要新建一个笔记或文档，把这些粗体内容复制进去，并整理成分层的项目符号。把书的核心论点放在最上面，再把支撑性的观点作为下级条目列出来。这个提纲会告诉 ChatGPT：哪些点是主旨，哪些点是支持细节。Forte 建议这样做：把屏幕分成两边，左边放加粗后的高亮笔记，右边新建一份“书籍提纲”笔记。对于每一条你加粗过的句子，判断它究竟是核心观点，还是支撑细节。把真正关键的内容复制到右边提纲中，作为主条目。并不是所有加粗句都必须进入提纲——这一步仍然是一次新的筛选。Forte 也明确说过：“我不应该把所有内容都放进去……我要判断它是否真的好到必须进入总结。”同时，要给提纲清楚地命名和排版，例如用“《好点子从哪里来》总结提纲”这类标题，并通过缩进项目符号来表示层级关系。

> * hierarchically [ˌhaɪəˈrɑːkɪkli] adv.分层级地；有上下结构地
> * sub-bullet 子项目符号；缩进后的下一级条目
> * reverse-engineering [rɪˈvɜːs ˌendʒɪˈnɪərɪŋ] 逆向拆解；从成品中还原出其结构和组织方式

This is effectively **reverse-engineering the book’s structure**. You’re extracting the flow that the author may have built into the text and making it explicit. Forte notes that by outlining these points, “you are extracting the structure that is already part of the book” – information that was only implicit in the text is now visible in bullet form. The outline might look like:

- **Main Argument:** \[Author’s thesis sentence\]
  - _Supporting Idea 1:_ \[Bolded sentence providing evidence or explanation\]
  - _Supporting Idea 2:_ \[Another key point or example\]

- **Secondary Theme:** \[Second big idea, bolded sentence\]
  - _Example/Detail:_ \[Bolded detail\]

By the end of Step 3, you have a concise framework of major ideas and their anchors from the book. This outline (often only a few hundred words) is perfectly structured for ChatGPT to work with.

> 这一步其实是在“逆向拆解”整本书的结构。你把作者原本隐含在文本中的组织方式提取出来，并把它明确写成条目形式。Forte 指出，通过做提纲，“你是在提取书中本来就存在的结构”——那些原本只隐含在正文中的信息，现在以项目符号的形式变得清晰可见。提纲大致可能是这样：

> * 核心论点：[作者的中心句]
>   * 支撑观点 1：[一条提供证据或解释的粗体句]
>   * 支撑观点 2：[另一条关键点或例子]
> * 第二主题：[第二个重要观点]
>   * 例子/细节：[相应的粗体细节]

> 到第三步结束时，你已经拥有了一套简洁的框架，里面包含书中主要思想及其支撑点。这份提纲通常只需几百字，但结构非常清楚，正适合交给 ChatGPT 进一步加工。

> * flow [fləʊ] n.脉络；推进顺序；论述展开方式
> * anchor [ˈæŋkə(r)] n./v.锚点；支撑点；这里指承载主要观点的关键句

### Step 4: Summarize with ChatGPT Using a Custom Prompt

With the outline in hand, the final step is to ask ChatGPT to generate the narrative summary. Copy your entire outline into the ChatGPT prompt box, and use a guiding instruction that tells the AI how to use it. Crucially, Forte’s prompt **both provides the outline and allows ChatGPT to draw on external knowledge**. He frames it like this:

“You don’t want \[ChatGPT\] to only use what you’re providing; you want it to add or incorporate what you’re giving it into other material that it finds on the web”.

In practice, the prompt might say: “Using the following outline of key points from _\[Book Title\]_, write an in-depth summary. You may incorporate additional knowledge or examples as needed. Ensure the writing includes interesting, specific details rather than vague generalities.” The idea is that the outline anchors the content, but ChatGPT is free to flesh it out.

> 当提纲准备好之后，最后一步就是请 ChatGPT 生成叙述性的总结。把整份提纲复制到 ChatGPT 的提示框中，再附上一段指导语，告诉 AI 应该如何使用它。关键在于，Forte 的提示既提供了提纲，又允许 ChatGPT 调用外部知识。他是这样表述的：“你不能只让 ChatGPT 使用你提供的材料；你还希望它能把你给它的内容，与它从网络上找到的其他材料整合起来。”在实际操作中，提示可以这样写：“请根据下面这份《[书名]》关键观点提纲，写一篇深入的总结。你可以根据需要补充额外知识或例子。请确保文字中包含有趣、具体的细节，而不是含糊的泛泛之谈。”这个思路的核心是：提纲负责锚定内容，而 ChatGPT 可以自由把它扩展成更完整的叙述。

> * in-depth [ˌɪn ˈdepθ] adj.深入的；详细的
> * vague generalities 空泛的笼统说法；没有具体内容的概括
> * flesh it out 充实它；把骨架扩展开来，补充细节

To nudge the output toward quality, Forte explicitly adds a note about details: **“good writing is really all about details… interesting unique unusual details”**. (In his video he actually appends a sentence in the prompt to that effect before pasting the outline.) In short, the prompt tells ChatGPT to use the outline as a skeleton but **meat it out with rich, concrete content**.

Within seconds, GPT-4 will spit out a polished summary. In Forte’s demo it took about 30 seconds. The result was a **far superior summary**: much longer, more detailed, and more specific than the generic version ChatGPT would write on its own. It included multiple supporting points and examples, fully honoring the nuances he had captured. In his words, it was _“a better summary on any dimension”_ – essentially, high quality at a fraction of the effort.

> 为了促使输出更有质量，Forte 还会明确加上一句有关“细节”的说明：好写作的关键就在于细节，尤其是那些有趣、具体、独特、不寻常的细节。（在他的视频中，他甚至真的会在粘贴提纲之前，把这样一句话直接加到提示里。）换言之，这个提示是在告诉 ChatGPT：把提纲当成骨架，但要用丰富、具体的内容把它“长成肉身”。几秒钟之内，GPT-4 就会生成一篇打磨好的总结。在 Forte 的演示中，这个过程大约只用了 30 秒。结果是一份明显更好的总结：比 ChatGPT 单独生成的版本更长、更细致，也更具体，里面包含多个支撑观点和例子，充分保留了他在笔记中捕捉到的细微层次。用他自己的话说，这份总结“在任何维度上都更好”——几乎可以说，是以极小代价换来了高质量成果。

> * nuance [ˈnjuːɑːns] n.细微差别；微妙层次
> * on any dimension 在任何维度上；从各方面来看

## Tools and Workflow Integration

This method relies on a small set of digital tools working together:

- **E-reader/App (Kindle, iPad, etc.)** – for the original reading and highlighting. Forte reads on Kindle, which lets him mark passages as he goes.
- **Readwise (or similar)** – a service that **syncs highlights** from your e-reader into a notes app. Readwise imports all your Kindle highlights so that you have a single repository of excerpts.
- **Note-taking app (Notion, Evernote, Obsidian, etc.)** – this is where you edit and organize. You paste your Readwise highlights into a note, do the bolding and outlining there, and later copy the outline out. The app doesn’t much matter as long as it supports text formatting and easy copy-paste.
- **ChatGPT (GPT-4)** – the AI engine that generates the final summary. You input the outline and prompt into ChatGPT’s interface (chat.openai.com or equivalent), and it does the writing.

> 这种方法依赖一组可以协同工作的数字工具。第一类是电子阅读器或阅读应用（Kindle、iPad 等），用于最初的阅读与高亮。Forte 会在 Kindle 上阅读，并边读边标记段落。第二类是 Readwise 或类似工具，它负责把电子阅读器中的高亮同步到笔记应用中。Readwise 会导入你所有 Kindle 高亮，从而为你建立一个统一的摘录库。第三类是笔记应用（例如 Notion、Evernote、Obsidian 等），你在这里编辑和整理材料：粘贴 Readwise 导入的高亮、进行加粗和提纲整理，最后再把提纲复制出去。具体使用哪款笔记应用并不重要，只要它支持文本格式和方便复制粘贴即可。第四类是 ChatGPT（GPT-4），它是最终负责生成总结的 AI 引擎。你把提纲和提示输入 ChatGPT 界面，它就负责把内容写成完整文字。

> * in concert 协同地；配合起来
> * curation [kjʊəˈreɪʃən] n.筛选整理；策划性挑选

Each tool has its role: Readwise acts as the pipeline for **highlight curation**; the note app is the **workspace** for your progressive summarization and outline; ChatGPT is the **writer** that quickly turns your outline into prose. Using these in concert automates much of the mechanical work while keeping **human judgment** on the key points.

> 这些工具各有角色：Readwise 是“高亮整理”的管道；笔记应用是你进行渐进式总结和提纲构建的工作台；ChatGPT 则是快速把提纲转化为连贯文章的“写作者”。把这些工具结合起来使用，就可以把很多机械性的工作自动化，同时仍然把关键判断保留给人。

> * mechanical work 机械性工作；重复、流程化、判断要求较低的劳动

## Cognitive Benefits and Best Practices

Forte’s process isn’t just a hack – it’s grounded in solid learning principles. By forcing yourself to identify and articulate the **core ideas**, you engage in **active learning** and retrieval practice. Writing a summary in your own words helps the knowledge “sink in” much more than passively reading. In effect, each book summary becomes a “knowledge building block”that you can refer back to, remix, or apply in future projects.

The multi-layer approach (read → highlight → bold → outline → AI-write) balances **compression vs. context**. You compress the content by focusing on essentials, but by preserving the sequence of your highlights (and even bolding within them), you keep enough context that nothing crucial falls through the cracks. As Tiago’s Progressive Summarization model describes, each layer (capturing, bolding, outlining) is done **while reviewing the content**, so you’re not working in a vacuum – you have the context right there if you need it.

> Forte 的这一流程并不只是一个取巧办法，它实际上建立在扎实的学习原理之上。通过强迫自己识别并表达核心思想，你是在进行主动学习和提取练习。用自己的话写总结，会比单纯被动阅读更能让知识“沉淀下来”。实际上，每一份书籍总结都会变成一个“知识积木”，供你日后回顾、重组或应用到新的项目中。多层处理的方法——阅读 → 高亮 → 加粗 → 提纲 → AI 撰写——在“压缩”和“保留语境”之间取得了平衡。你通过聚焦于关键内容来压缩信息，但由于仍然保留了高亮原本的顺序，甚至保留了高亮中的加粗层次，所以又不会把重要语境一起丢掉。正如 Tiago 的“渐进式总结”模型所说，每一层处理——摘录、加粗、提纲——都是在重新查看内容时完成的，所以你不是在真空中操作，而是始终可以回到原文语境中。

> * retrieval practice 提取练习；通过主动回忆与表达来强化记忆的学习方法
> * in a vacuum 脱离语境地；在没有背景支持的情况下

The final AI step then **re-expands** the outline into a fluent narrative. Because your outline is already distilled, ChatGPT has clear guidance on what matters most. The prompt’s emphasis on “interesting details” forces the AI to avoid generic clichés and instead include specific examples – the very opposite of the summary it would have produced from scratch. The result is a summary that not only reads well but faithfully reflects the book’s unique insights.

> 最后一步由 AI 来把提纲重新扩展成流畅的叙述。由于你的提纲已经经过提炼，ChatGPT 很清楚什么才是重点。而提示中对“有趣细节”的强调，也会逼迫 AI 避免老套空泛的陈词滥调，转而加入具体例子——这恰恰是它在没有材料支撑时最难做到的事。最终得到的总结，不仅可读性好，而且能较为忠实地反映一本书真正独特的洞见。

> * cliché [ˈkliːʃeɪ] n.陈词滥调
> * faithfully [ˈfeɪθfəli] adv.忠实地；如实地

## Results and Efficiency

Forte reports that this workflow **dramatically outpaces** manual summarizing. In his demo, ChatGPT generated the full summary in about 30 seconds – roughly **20% of the time** it would have taken him to write it himself. He estimates saving 70–80% of the effort. Yet the quality did not suffer; on the contrary, the AI-enhanced summary was richer and more accurate than his unaided attempt or what ChatGPT could do alone.

For example, he compares his old practice of asking ChatGPT for a summary (with no notes) to using the outline workflow. The raw ChatGPT summary was short and generic, whereas the outline-guided summary was _“far longer…far more detailed…more specific”_ with _“way more supporting points”_. This shows that providing curated content allows AI to produce nuanced output rather than vague overviews.

> Forte 表示，这套流程在效率上远远超过手工总结。在他的演示中，ChatGPT 大约用了 30 秒就生成了完整总结——这大约只是他自己亲手写作所需时间的 20%。他估计，整体上节省了 70% 到 80% 的精力。但质量并没有因此下降；相反，经过 AI 增强的总结，比他单独完成的版本，或者 ChatGPT 单独生成的版本，都更丰富、更准确。举例来说，他比较了自己过去那种“直接让 ChatGPT 总结一本书”的做法，和使用提纲工作流之后的结果。原始的 ChatGPT 总结又短又泛，而基于提纲生成的总结则“长得多……细节多得多……也具体得多”，而且“支撑性观点多得多”。这说明，只要提供经过筛选的内容，AI 就能写出有层次、有细节的结果，而不是空泛的概述。

> * outpace [ˌaʊtˈpeɪs] v.超过；快于
> * unaided [ʌnˈeɪdɪd] adj.没有辅助的；独立完成的
> * nuanced [ˈnjuːɑːnst] adj.细致而有层次的

In practical terms, this means knowledge workers can read **fewer but more impactful books**, ensuring what they do read is understood and retained deeply. Forte encourages those who consume practical, actionable books to try this method: by combining human highlights with AI writing, one can quickly convert reading into _usable_ knowledge.
> 从实际意义上讲，这意味着知识工作者可以少读一些书，但让每一本真正值得读的书都被深入理解和牢牢记住。Forte 也鼓励那些经常阅读实用类、可操作类书籍的人尝试这一方法：把人工高亮和 AI 写作结合起来，就能迅速把阅读转化为“可用的知识”。

> * actionable [ˈækʃənəbl] adj.可付诸实践的；可操作的


**Key takeaways:**

- Read actively and highlight what strikes you (main thesis, surprises). Use a tool like Readwise to save all highlights automatically.
- Refine those highlights by bolding the single most important phrases or sentences (Progressive Summarization). This zeroes in on each book’s core ideas.
- Organize the bolded points into a structured outline (bullets or headings), which reveals the book’s argument flow and signals priority for the AI.
- Feed the outline to ChatGPT with a prompt that encourages detail and use of outside knowledge. The AI then writes a coherent, detailed summary far faster than manual writing.
- The result is a high-quality summary that strengthens memory (each summary is a “knowledge building block”) and lets you apply the book’s ideas in work and writing with minimal extra effort.

> 主动阅读，并高亮那些真正打动你的内容，例如核心论点和让人惊讶的地方。使用 Readwise 之类的工具自动保存所有高亮。然后进一步筛选这些高亮，把最重要的短语或句子加粗，这就是“渐进式总结”的做法，它能帮助你锁定一本书的核心思想。接着，把粗体内容整理成结构化提纲，用项目符号或标题展示书中论证的推进顺序，也向 AI 明确哪些内容更重要。再把这份提纲交给 ChatGPT，并在提示中鼓励它加入细节和外部知识。这样，AI 就能比手工写作快得多地生成一篇连贯而细致的总结。最终，你得到的是一份高质量的书籍总结，它既能加强记忆——因为每份总结都成了“知识积木”——也能让你以较少额外投入，把书中的想法转化为工作和写作中真正可用的内容。

> * takeaways [ˈteɪkəweɪz] n.要点；主要收获

This method exemplifies a meta-principle of knowledge work: **augment human judgment with AI**. You do the critical thinking (what to highlight and outline); ChatGPT does the tedious writing. The combination preserves the depth of understanding while boosting efficiency. For writers, researchers, and anyone building a “second brain,” it’s a practical workflow for turning passive reading into active, reusable insights.

> 这种方法体现了一条更高层的知识工作原则：用 AI 增强人的判断力。真正重要的思考——哪些内容值得高亮、哪些观点该进入提纲——仍然由你来完成；而 ChatGPT 则负责那些费时但相对机械的写作工作。这样的结合既保住了理解的深度，又大幅提高了效率。对于写作者、研究者，以及所有在构建“第二大脑”的人来说，这都是一种把被动阅读转化为主动、可复用洞见的实用流程。

> * augment [ɔːɡˈment] v.增强；扩展
> * second brain 第二大脑；一种通过数字笔记系统外化、组织和调用个人知识的工作方法

**Sources:** Transcript of Tiago Forte’s video _“The BEST Way to Summarize Books with ChatGPT”_ and related Forte Labs writings on summarization. These explain each step of the process, its rationale, and the dramatic improvement in summary quality and speed.

## 面向实践者与研究者的 Prompt Engineering 精要教程（2026 视角）

### 执行摘要

Prompt engineering（提示工程）可被视为“把任务需求、约束、上下文与评测目标，编译成可稳定驱动大模型行为的上下文程序（context program）”。它既包含**手工提示设计**（清晰指令、示例、结构化输出、约束与失败模式修补），也包含更系统化的**自动优化与可复现评测**（自动生成/搜索/进化提示、把提示当参数或可学习对象、把提示链/agent 编排当程序并做编译优化）。这一视角在近几年从“写提示”逐步走向“构建可测的 LLM 系统”，尤其在 RAG、工具调用与代理式工作流中更明显。

从方法谱系看：少样本/上下文学习让“提示即任务接口”成为主流（Brown et al., 2020）；链式思维/自一致性/树思维等把推理过程显式化并引入搜索与投票（Wei et al., 2022; Wang et al., 2022; Yao et al., 2023）；RAG 把外部知识作为“非参数记忆”注入，提升事实性并便于更新（Lewis et al., 2020；Asai et al., 2023）。与此同时，安全对抗（提示注入、越狱、对齐绕过）迫使提示工程与系统工程（输入隔离、权限最小化、红队评测）捆绑推进。

本文以“分类—工作流—评测—安全—配方—工具—前沿”组织，强调**可操作**与**可验证**：任何提示策略都应对应可测指标（如 HELM 的多维指标、BIG-bench 的能力压力、TruthfulQA 的事实性风险），并通过自动化回归测试避免“凭感觉调参”。

### 背景与范围：定义、分类与边界

**定义与范围**：狭义 prompt engineering 指对“离散文本提示（hard prompts）”的设计与迭代；广义则涵盖从离散提示到**软提示/连续提示**（prompt tuning、prefix-tuning）乃至**参数高效微调（PEFT）**与**指令微调/对齐训练**的整套“控制模型行为”的技术栈。

**常用分类（taxonomy）**可按“输入构造—推理机制—外部能力—安全约束”划分：  
- Prompt design / instruction engineering：明确角色、目标、受众、格式、约束与示例；并将复杂任务拆分为可验证子任务。  
- Few-shot / in-context learning：通过少量示例传递隐式规范与输出形态（Brown et al., 2020）。  
- Chain-of-thought（CoT）与推理脚手架：CoT、自一致性、least-to-most、plan-and-solve、tree-of-thoughts 等。  
- RAG：检索增强生成，外部知识+生成（Lewis et al., 2020），以及自反式 RAG（Self-RAG）等“按需检索+自评”。  
- Tool/agent prompts：把模型嵌入循环，交替“思考—行动—观察”，典型如 ReAct。  
- Safety/guardrails：对齐训练（RLHF、Constitutional AI）与系统级防护（prompt injection 防御、红队与系统卡）。

### 方法与工作流：从手工技巧到自动化优化

**手工设计的“80/20”工作流**：先固定评测集与输出规范，再迭代提示。实践上可按“任务说明 → 约束与边界 → 输入语料/参考 → 输出 schema → 失败模式补丁”的顺序写提示，并用少量高信息示例（反例也可）稳定格式。官方最佳实践与工业经验普遍强调：指令要具体、给足上下文、要求结构化输出、允许模型表达不确定性以减少幻觉。

**推理增强提示**：  
- CoT：用少量“输入—思路—答案”示例可显著提升多步推理任务表现（Wei et al., 2022）。  
- Self-consistency：对同题采样多条推理路径并对答案投票，可提升推理准确率但计算成本上升（Wang et al., 2022）；后续工作尝试用置信度加权降低采样开销。  
- Least-to-most / Plan-and-Solve / ToT：通过分解、先计划后执行、或在“思维单元”层面搜索与回溯，改善“示例难度不够”或“需要前瞻搜索”的任务。  
- Tool/agent（ReAct）：将推理与动作交替生成，可减少纯推理的幻觉累积，并把知识获取外包给工具/检索。

**自动化提示优化（Auto / Search / Compile）**正在成为“最新视角”的核心：  
- 自动生成与选择：APE 把“指令当程序”，用模型生成候选指令并用评分函数选择（Zhou et al., 2022）。  
- 黑盒/语言式优化：OPRO 用 LLM 充当优化器，在自然语言空间优化目标函数。  
- 梯度/进化搜索：AutoPrompt 用梯度引导搜索离散模板；Promptbreeder 用自指进化改进任务提示与“突变提示”。  
- “提示编译器”：DSPy 将提示链写成声明式模块，并通过编译优化在给定指标上自动改写提示/示例。  
这类方法的共同前提是：**先定义可自动计算的指标**，否则优化会退化为“迎合评分器”。

**软提示与 PEFT/对齐训练的边界**：当你需要跨大量样本稳定提升、或提示长度/上下文受限时，软提示与 PEFT 往往比反复手改文本更稳。prompt tuning 与 prefix-tuning 通过学习连续“虚拟 token”在冻结模型上适配任务；LoRA 等 PEFT 用低秩参数注入实现低成本微调；指令微调与 RLHF 则从训练层面改变“遵循指令”的总体能力。

### 评测与基准：从“效果”走向“鲁棒性与可信度”

Prompt engineering 的工程化关键是把“好不好”分解为可测维度：任务成功率、鲁棒性（提示扰动/输入噪声/长文）、校准与不确定性、真实性/事实性、指令遵循、毒性与风险等。HELM 的贡献之一是把评测从单一准确率扩展到包含校准、鲁棒性、偏见/毒性与效率等多指标，并提供统一提示与输出记录以便复现。

**能力压力测试**常用 BIG-bench 与 MMLU：BIG-bench 强调“超出现有能力”的任务集合与规模效应；MMLU 提供跨学科多任务考试式评测，适合做“总体能力变化”的粗测。 但基准也可能被“过拟合提示”或数据污染影响，因此需要自建私有 eval 与持续回归（尤其当模型升级、提示重写、RAG 索引更新时）。

**事实性/忠实性（faithfulness）**方面，TruthfulQA 之类基准揭示“规模增大不必然更真实”，并推动把“引用证据、允许不知道、约束来源”纳入提示与系统设计。 对 RAG 系统，可用 RAGAS 这类无需人工标注的多维指标拆分检索相关性与生成忠实性，加快迭代。

### 安全、对齐与对抗鲁棒：把提示当作攻击面

将 LLM 集成到检索、浏览、工作流编排后，“数据与指令边界”变得模糊，prompt injection（尤其 indirect injection）成为突出风险：攻击者可把恶意指令埋入网页/文档，使系统在检索后把它当成上层指令执行。 另一类是“越狱/对齐绕过”：自动构造通用后缀诱导模型输出被禁止内容，且具有跨模型迁移性。

**防护思路（优先级从系统到提示）**：  
1) **系统隔离**：把检索内容标记为不可信数据，永不允许其覆盖系统/开发者指令；对工具调用设置最小权限与可审计日志。  
2) **输入净化与解析**：对外部文档进行剥离（去除隐藏指令、HTML/markdown 载荷）、分段与来源白名单。  
3) **输出约束与过滤**：结构化输出校验、规则/策略过滤、拒答策略一致性。对齐训练路线包括 RLHF（InstructGPT）与 Constitutional AI（用原则监督自改进）。  
4) **红队与持续评测**：系统卡与外部红队实践表明，应把对抗测试作为发布与迭代流程的一部分，而非一次性检查。

### 实用配方：中文 prompt 模板与例子（可直接改）

以下示例强调三件事：**上下文分隔**、**输出 schema**、**失败时的退路**（不确定就说不确定、请求更多信息或给出假设）。

**摘要（长文→要点+行动项）**  
> 角色：你是科研助理。目标：把材料压缩为“结论—证据—风险—下一步”。  
> 输入：<<<文档…>>>  
> 输出格式：  
> 1) 一句话结论（<=30字）  
> 2) 3–5条要点（每条含“证据片段/段落号”）  
> 3) 不确定点与需要补充的信息  
> 若文档不足以支持结论，明确写“无法从文档支持”。（强调减少幻觉的实践建议）

**结构化抽取（合同/简历→JSON）**  
> 只输出合法 JSON，schema：{name, dates[], parties[], obligations[], risks[]}；  
> 若字段缺失，填 null；不得臆造。  
> 输入：<<<文本>>>  
（结构化约束与“不得臆造”属于常见 prompt 可靠性策略）

**推理题（分解→求解→自检）**  
> 请先把问题分解为 3–6 个子问题（least-to-most），逐个求解；  
> 最后给出答案并做一次一致性检查（列出可能出错的步骤）。

**代码生成（带测试与边界条件）**  
> 语言：Python。任务：实现 XXX。  
> 约束：O(n log n)；包含类型注解；写 5 个单元测试覆盖边界；  
> 输出：先给设计说明（接口、复杂度、异常），再给代码与测试。

**RAG 问答（必须引用来源）**  
> 你只能使用提供的“检索片段”回答；若片段不足，回答“信息不足”并列出需要检索的关键词。  
> 片段：<<<chunk1(来源A)…>>> <<<chunk2(来源B)…>>>  
> 输出：逐条结论 + 引用(来源/段落)。  
（RAG 的“限定证据域+可追溯引用”是降低幻觉的主流做法）

**工具/代理（ReAct 风格的最小循环）**  
> 你可以调用工具：Search(query), Calc(expr)。  
> 每轮输出：Thought(简短) / Action / Observation / Next。  
（把推理与行动交替，有助于在检索/操作任务中减少纯文本幻觉）

### 工具与可复现实验：从“写提示”到“测试提示”

**版本化与回归测试**：建议把 prompt 当代码：用 Git 管理；用固定样本集做回归；把“提示+模型+温度+检索配置”作为完整实验签名，并在模型升级时运行对比。 代表性工具/框架：OpenAI Evals（评测框架）、promptfoo（本地 prompt/agent/RAG 测试与红队）、LangChain/LlamaIndex（RAG 与代理组件化）、DSPy（提示链编译优化）。

```python
## 伪代码：prompt 回归测试（最小骨架）
cases = load_jsonl("eval_cases.jsonl")   ## {id, input, gold(optional), rubric}
prompt = load_text("prompt_v12.txt")

for c in cases:
    y = llm(prompt.format(**c["input"]), temperature=0.2)
    score = grade(y, c["rubric"], gold=c.get("gold"))  ## 规则/LLM-judge/混合
    log(id=c["id"], output=y, score=score)

report = aggregate_scores()
assert report["mean_score"] >= threshold
```

```python
## 伪代码：RAG pipeline（检索→拼接→生成→引用检查）
docs = load_corpus()
index = build_vector_index(docs)     ## chunk + embedding
def answer(query):
    ctx = index.retrieve(query, k=5)
    prompt = make_rag_prompt(query, ctx)   ## 强制引用/不够就说不够
    y = llm(prompt)
    return postcheck_citations(y, ctx)     ## 忠实性/引用覆盖率
```

（RAG 的基本工程分解与 LangChain/LlamaIndex 文档一致；评测层可用 RAGAS 之类指标加速迭代。）

### 研究前沿与注释书目（精选，偏 2020–2026）

**前沿问题（高价值方向）**：  
- 自动提示合成与优化的“可迁移性”：不同模型、不同上下文长度下提示策略能否稳定迁移？（自动提示优化综述与方法仍在快速演进。）  
- Prompt 解释性与“提示编译”：把提示链当程序进行静态/动态分析，给出可诊断的失败原因与自动修补（DSPy 路线）。  
- RAG 的自反与代理化：按需检索、反思生成、可信引用与“agentic retrieval”逐步替代朴素 top-k chunk（Self-RAG 与工业实践）。  
- 安全对抗：prompt injection 可能难以彻底消除，研究重心转向“降低损失半径、提升可审计与可恢复性”。  
- 评测的过拟合与误导：开放基准与提示调优可能产生“指标漂移”，需要私有 eval、分布外测试与多指标报告。  

**注释书目（至少 12 篇/项，按主题）**  
- In-context / few-shot：Brown et al., 2020（提示即接口的起点）。  
- Prompt learning 总综述：Liu et al., 2021/2023（概念与分类框架）。  
- 软提示：Lester et al., 2021；Li & Liang, 2021（prompt/prefix tuning）。  
- PEFT：Hu et al., 2021（LoRA）；PEFT survey 2024/2025（方法谱系）。  
- 指令微调/对齐：Wei et al., 2021（FLAN）；Ouyang et al., 2022（InstructGPT/RLHF）。  
- 推理提示：Wei et al., 2022（CoT）；Wang et al., 2022（Self-consistency）；Taubenfeld et al., 2025（计算更省的自一致性变体）。  
- 分解/规划/搜索：Zhou et al., 2022（least-to-most）；Wang et al., 2023（plan-and-solve）；Yao et al., 2023（ToT）。  
- 自动提示优化：Shin et al., 2020（AutoPrompt）；Zhou et al., 2022（APE）；Fernando et al., 2023（Promptbreeder）；Ramnath et al., 2025（自动提示优化综述）。  
- RAG 与自反：Lewis et al., 2020（RAG）；Asai et al., 2023（Self-RAG）；RAGAS 2023/2024（RAG 自动评测）。  
- 代理与工具：Yao et al., 2022（ReAct）。  
- 评测基准：Liang et al., 2022（HELM）；Srivastava et al., 2022（BIG-bench）；Hendrycks et al., 2020/2021（MMLU）；Lin et al., 2021（TruthfulQA）。  
- 安全对抗与红队：Greshake et al., 2023（indirect prompt injection）；Zou et al., 2023（通用越狱后缀）；GPT-4/4o system cards 与外部红队方法论文（OpenAI 2023–2025）。


## 执行摘要

随着大规模语言模型（LLM）技术的成熟与普及，它们作为学习和研究助手的角色日益凸显。相比于传统单向或封闭式的学习模式，LLM 通过强大的信息检索、多模态解释、即时反馈和自动化推理能力，正在重塑人类学习范式。在知识获取层面，过去需要数年甚至终身积累才能掌握的跨学科文献整合、复杂公式推导、实验设计和边缘知识收集等任务，如今可借助LLM实现半自动化完成（Lewis et al. 2020；OpenAI 2023）。同时，LLM 还能将许多隐性经验和领域智慧通过交互式提示转化为外显知识，极大地扩展了普通研究者的视野与能力（Anthropic 2022；Stanford HELM 2022）。

本报告从学习助手功能谱系、典型任务加速、隐性知识揭示和系统学习范式变革等多个维度，深入分析了LLM对学习的影响。重点论述LLM在信息检索、解题指导、实验辅助、思维激发等方面的应用场景和工作流程，并列举了若干典型Python风格伪代码和中文提示模板示例，以指导读者实际操作。我们还系统总结了LLM如何降低学习壁垒、促成“普及大师”式学习，以及出现的新挑战：数据偏差、幻觉生成和学术诚信问题。最后提出实践建议和未来研究方向，包括如何构建协作学习工作流（如RAG+LLM+仿真平台集成示例）、制定可复现评测以及保持人机协同学习的可靠性。目的在于为研究生、学者和教育工作者提供一个可操作的指南，使他们能够充分利用LLM优势，并规避潜在风险，推动学习模式与教育实践的革新。

### 1. LLM学习助手的功能谱系

LLM作为学习助手具有多种功能，本文分为以下几大类，每类均给出应用示例和典型交互模式：

- **信息检索与摘要**：通过自然语言查询LLM，获取针对性知识和文献总结。例如，提示 `"请解释 [主题] 的核心概念与关键参考文献"`，LLM会从内部知识和联网工具检索（或RAG框架）返回主题概述和参考链接。伪代码示例：

```python
  query = "碳纳米管的结构与应用综述"
  response = llm_chain.run(
      System="你是专业科研助手，擅长检索文献",
      User=f"请提供'{query}'的背景综述与典型引用"
  )
```
  
  此功能解放了学生手动查找资料的负担，尤其适用于快速了解新领域。但LLM生成的总结需要谨慎验证，建议结合专业数据库或向LLM明确要求提供来源链接。

- **解释/教学**：LLM可充当智能导师，以不同难度层次逐步讲解概念。比如在数学学习中输入 `"从零开始讲解偏微分方程与其物理意义"`，LLM可生成分层解释、示例题解和练习提示。示例prompt：

```
  用户：请用通俗语言介绍偏微分方程，并给出一个典型物理应用示例（例如热传导）。
  系统：...
```
  
  这种交互可即时纠正误解、回答追问，相当于自适应辅导。然而，LLM的解释可能缺乏深度，建议辅以权威教材比对，并在必要时要求引用原理或定义以避免“编造”信息。

- **练习/反馈**：利用LLM自动生成练习题并给出反馈。比如对学习者回答进行解析反馈，或根据学习进度定制题目。示例prompt：
  
```
  用户：我在求解一元二次方程遇到错误，请检查以下解答步骤并指出问题所在：
  求解 x^2 -5x +6 =0，假设得到根为2和3。
```
  
  LLM可模拟教师角色进行逐步讲解。结合自动评分脚本，可以形成循环反馈系统。例如：

```python
  student_answer = "..."
  feedback = llm_chain.run(
      System="作为数学导师，识别并纠正学生的解题步骤。",
      User=f"问题：{problem}\n 学生答案：{student_answer}"
  )
```
  
  相关研究表明，LLM在自动批改和个性化辅导中可显著提高效率（OpenAI Evals手册；EDUCAUSE 2023）。仍需注意，题目设计要明确可自动判定的标准，否则辅助评估的准确性受限。

- **代码/实验辅助**：为计算任务和实验设计提供辅助。通过代码提示和调试建议，LLM能帮助生成模拟脚本、算法原型或数据处理流程。例如调用Python工具：
  
```python
  prompt = "请用Python写一个模拟单摆周期的数值解程序。"
  code = llm_chain.run(
      System="你是Python专家",
      User=prompt
  )
  execute(code)
```
  
  在训练领域，这类似于GitHub Copilot的辅助编码（Brown et al. 2020）。LLM还能指导实验设计，例如 `"我打算研究XX反应，请设计实验步骤"`。例如 Anthropic 的指导性中AI可以检查方法合理性。不过，LLM生成的代码/方案可能包含错误，需要用户验证执行结果并进行迭代（Guo 2023）。

- **创意/类比激发**：LLM可辅助创造性思考和跨域联想。通过类比和脑图式询问，帮助学习者构建新见解。例如提示 `"将生物群落动态比作市场经济，请给出类比说明"`，LLM可能生成有趣的隐喻，激发讨论。 
  此外，AI能够提出不常见的研究视角或组合，例如自动生成研究问题清单、假设等，弥补人类思考局限。但须警惕LLM偶尔提出的“看似合理但错误”的类比，需要专业评估验证。

- **元认知/学习策略**：LLM可以指导学习技巧、时间管理和认知策略。例如 `"如何高效阅读一篇心理学论文？"`，LLM可回答包含划重点、做笔记、复述等方法。也可模拟计划生成，如 `"请给一个博士生的6个月研究进度安排"`。这些元策略建议来源于广泛文献（学习科学中的总结），但需要适配个人情况，教育工作者可校对和定制。

- **协作/社群中介**：LLM平台可以中介学生与专家的交流，比如自动回答常见问题、组织在线讨论或推荐协作伙伴。比如使用问答系统自动回答论坛提问（类似StackExchange的自动回复助手）。也可以提供多语言同步，减少语言障碍。这提高了知识分享效率，但也需防止依赖过度，导致人际互动减少。

- **评估/测评**：LLM可作为考试或项目的自动评估工具，尤其是开放式答案。通过大规模评测框架（如OpenAI Evals）自动化评测，可以实现更加即时和细粒度的反馈 (HELM 2022)。例如构造 rubric 问题，让LLM根据评分标准打分。需要注意防止培训好的模型作弊（AoIR 2023建议）及保证评分一致性。建议结合同行人工检查来纠正系统偏差。

**功能总结**：LLM 提供了一套新的“AI导师”功能谱系，包括查找、解释、反馈、编码、创意、反思和协作等多方面。这些功能的典型工作流程往往涉及：明确指令（System role + User prompt），必要时传入上下文/示例，调用模型生成输出（可通过链式调用如 LangChain 实现多步逻辑）。以下各部分将结合具体案例详细探讨LLM如何在过去需要耗费大量时间和资源的任务上发挥变革作用。

### 2. “终身任务”被加速：案例与分析

LLM出现前，许多学术活动需要多年训练和大量人工劳动，现今被显著加速或普及。主要维度如下：

- **跨学科文献综述与整合**：传统上，学者需要阅读和整理成百上千篇论文来掌握一个领域前沿，耗时甚至数年。现在，可以通过LLM快速生成研究领域报告或综述。比如输入“请为XX领域撰写综述并列出核心文献”，LLM可结合已有的知识和检索结果（如RAG检索相关论文摘要）生成结构化综述（Wu et al. 2023）。效果：初稿可在几分钟内完成，后续人工再校对、补充不足之处。局限：AI可能遗漏最新的未公开信息，或在交叉引用方面出错，因此需要专家验证。公开案例：某化学家团队发布了基于LLM的文献综述系统，实现了对千余篇文献的快速分析（Wu et al. 2024）。

- **复杂数学/物理推导草稿**：涉及高级符号推理的工作，如证明一个定理或推导复杂方程，过去多需长期笔耕。现在LLM（尤其结合符号计算引擎）能辅助生成推导步骤。比如结合Wolfram Alpha API的 Prompt 可让模型输出符号化推导。应用示例：自动生成积分证明框架或数值模拟代码框架；对步骤提出建议。效果：节约了推导时间，研究者可专注检验与创新。局限：LLM尚未真正“懂”数学细节，常在复杂运算上出错，需要专业人士纠错。例如 DeepMind 的 AlphaMath 提示LLM可解决部分数学竞赛题，但复杂证明仍需人力。

- **实验设计与仿真原型**：设计实验流程和仿真方案是科研核心任务。传统上，依赖实验经验和专业知识制定方案。LLM 可根据描述自动推荐实验步骤或参数设置。示例提示：“设计一个在X条件下验证Y效应的实验方案”，LLM可输出变量控制、仪器选择、统计分析方法等要点。结合仿真平台（如 SciPy、OpenAI Gym）和自动化脚本，可以快速生成实验原型。已见案例：学术实验室使用 GPT-4 生成初步实验方案并通过自动化流水线测试可行性。局限：实际实验环境复杂多变，AI方案需要专家评估安全性和可行性，且目前还无法替代对实验细节的精细把控。

- **历史档案的语义检索与注释**：过去研究历史文本需手工翻译和注解，极为费力。LLM在自然语言理解方面的优势，使得处理古文档更高效。例如输入历史档案中的古汉语或拉丁语片段，LLM可以自动生成现代语言翻译和注释。通过语义搜索功能，研究者能快速检索相关历史资料和学术评论。效果：解放了语言障碍，边缘文献得以快速纳入学术讨论。局限：翻译准确度受限于训练数据；非主流方言或罕见专业术语可能被曲解。应用如CLTK等开源知识库可与LLM配合，提高古文档处理效率。

- **边缘知识的可访问化**：科学和人文学科中，许多专家经验或少数语种的知识此前难以系统学习。LLM通过大规模语料可以提取并呈现部分隐性经验。比如对于某个小众领域（如偏微生物生态系统）的最新研究方法，询问LLM可能获得及时答案，而这些可能尚无统一教材。又如跨文化领域知识（民俗、方言、次文化中的惯例），LLM训练时吸收了多源数据，可作为入门参考。案例：LLM曾被用于翻译和整合非英语学术资源，帮助研究者挖掘国际研究成果。风险：LLM可能将部分未证实信息泛化为表述，或无意中强化数据偏见（如特定文化视角的误导性描述），需要用户具备源批判意识。

- **代码库理解与迁移**：大型项目代码复杂难懂。过去需要长期阅读和手动注释。LLM 编程助手可以自动生成代码注释、找出函数用途并推荐迁移方案。例如给出一个复杂的函数，LLM可解释其逻辑并写出文档；迁移场景中输入“将此Python算法迁移到Julia”，LLM可自动转换并说明细节。使用Prompt示例：“解释以下代码的功能并优化性能。” 执行后LLM输出注释和性能瓶颈建议。Copilot、CodeT5 等工具已显示，这类加速显著减少了上手开销。局限：生成的代码需严格测试；迁移过程中语言差异可能产生未捕捉的错误。

- **教学课程与评估自动化**：以往编写教学大纲和试题需要老师手工完成。现在可让LLM根据课程主题自动生成课堂计划、教材提纲、习题集及答案示例。例如提示“为软件工程课程设计大纲，包括主要主题和练习题”，LLM能给出示例课程表和关键练习。结合OpenAI Evals等，可以自动批改客观题并给出评分反馈。案例：某大学试点使用LLM生成期末考试题库，教师审阅后使用在线考试平台评估学生表现。局限：AI生成的评估不一定符合学习目标，教师仍需校正确保问题质量与教学目标一致。

以上案例说明：**传统高成本工作正在被LLM工具链显著降低**。由于LLM可组合检索（RAG）、提示设计、微调和专业工具（如数学引擎、语料库）协同完成任务，过往需要一生磨砺的知识积累被部分自动化。效果是效率极大提升、边界知识民主化，但其局限也显而易见：需要学者审慎把控输出质量、验证真伪，避免因依赖AI而失去批判性思考。科学研究与学习仍需人工反复验证与创新。

### 3. 隐性知识与边缘知识

**隐性知识**包括难以通过文字显式描述的领域经验与直觉，例如：高级实验技术的手感、专业领域中未形成规范的“诀窍”、文化背景知识、个案式推理方法等。这类知识常不易出版，却对专家能力至关重要。LLM通过对大量文本（含学术论文、技术博客、问答论坛）的训练，可以从碎片信息中学习部分隐性模式。例如，LLM能通过阅读社区问答归纳某种实验失败的常见原因，或者总结某领域专家常用的非正式技巧。在交互中，研究者可以提出情景式问题，“遇到XYZ问题通常怎么解决？”LLM可能给出基于经验性的建议，如国外论坛中的对话。**示例Prompt**：`"作为生物实验专家，告诉我在进行PCR实验时如何避免扩增失败的常见技巧。"`。

**边缘知识**指少为人知且难以成书的专门知识，如小语种文学、罕见材料手册、过时技术文档、草根式领域发展史等。LLM利用收集的海量语料，即使这些内容并未被正式出版，也能在一定程度上回答相关查询。例如，LLM有时能够提供零散网络文档或学术片段中找不到的特殊背景知识，大大扩展普通学者的参考范围。

**显性化与风险**：LLM对隐性和边缘知识的显性化具有两面性。一方面，它帮助学习者获得过去难以接触的经验性信息和全球视角，促进知识共享。然而另一方面，由于LLM没有真正的验证机制，生成的内容可能包括**伪造的权威引用**、文化偏见或过时观点。例如一个看似专业的回答可能源自论坛传言，需要以批判性眼光审视。为缓解此类风险，用户应在Prompt中明确要求提供出处或“如果不确定就说不知道”，并使用多模型互证或工具链验证关键信息。

### 4. 学习范式的系统性变革

LLM的引入不仅改变单项任务的执行方式，更在多个层面**重塑学习范式**：

- **认知层面**：LLM作为外部记忆库和“虚拟导师”，使得人类记忆的需求减小，学习者更多进行概念理解和批判性思考而非死记硬背。在迁移能力上，LLM可以提供多元视角和类比激发，帮助学习者形成跨领域的联想（如GPT-4提供多种解题思路）。这意味着教育焦点将从记忆知识转向如何有效利用信息和培养思辨能力。  

- **方法论层面**：研究设计和假设生成变得更为动态。以前研究者需从零开始提出假设，现在可利用LLM辅助检查假设可行性、快速浏览相关理论。同时，AI的“反事实”思维（即探索“如果如此”）能力，可以在模拟不同场景时给出启发性反馈。如在科研前期进行敏感性分析或结果检验。总的来说，科学研究中人机协同的“双向思考”模式得到强化（Machine-in-the-loop）。  

- **社会层面**：传统的师生关系和同行评审也受到影响。LLM可以部分承担导师的一些职能（如答疑解惑、作文指导），使学生学习更自主，但这可能稀释面对面交流的深度。此外，同行评审过程可借助LLM进行初步审查（自动检测常见错误）。学术分工方面，基础性文献整理等重复性工作将更多由AI完成，学者可以将精力放在创造性研究上。  

- **教育制度层面**：课程设计和评估需要重构。教学内容将更加强调信息素养（如何提出有效查询）和批判性思维训练。考试设计要防止学生仅靠AI答题：可能更多使用开放式问题、口头考试或项目作业。学术诚信政策需更新，例如引入AI引用和查重规范。MOOC和在线教育可能利用LLM提供个性化辅导，教育资源分配趋向数字化与全球化。

以上变革需要系统考虑：不仅技术层面集成工具，也需培训师生学会“AI思维”。例如教会学生如何设计高质量提示（Prompt Engineering），以及如何使用工具组合（如RAG+LLM）来查证信息。教育机构需制定新的评价标准，关注学习过程和创造能力而非知识复制。

### 5. 实践建议：工作流与工具链

为了让学者、研究生和教师有效利用LLM，以下为可操作的工作流和工具链建议：

- **提示工程模板**：开发领域/任务特定的Prompt模板。例如：
  - **文献综述**："请阅读以下摘要，并整合主要观点：\n\n\n输出包含：每篇文献的结论、共性发现以及研究空白。"
  - **概念梳理**："解释‘迁移学习’概念，并举例说明其在计算机视觉中的应用。"
  - **研究计划生成**："帮我制定一个关于[主题]的研究计划，包括研究问题、假设、方法与预期结果。"
  - **实验设计**："设计一个实验来测试[变量A]对[变量B]的影响，包括实验步骤、数据采集与分析方法。"
  - **课程大纲**："为一个初级量子力学课程生成大纲，每节课主题、学习目标和练习题。"
  - **论文写作/审稿反馈**："我是论文评审人，请对以下摘要提出修改意见并指出不足。"
  
  在实际使用中，先提供角色设定（System：“你是XX领域的专家…”），再给任务指令，有利于提高结果质量。提示模板应当根据目标不断调整。

- **工具链集成示例**：构建多工具协作平台。以科研为例，可设计如下流程：
  1. **知识检索（RAG）**：使用 LlamaIndex 或 LangChain 建立领域知识库（文献、笔记），以提供给LLM检索接口。
  2. **LLM对话**：利用OpenAI或Anthropic模型执行对话式查询，上述Prompt模板即在此阶段使用。
  3. **符号计算/仿真**：对于需要计算的任务，接口联动诸如WolframAlpha、SymPy、MATLAB、网络API（如课程设计可接入Moodle API）等。例如，将“绘制正态分布曲线”类的问题通过SymPy画图。
  4. **循环验证**：使用自动化测试或评估套件（如OpenAI Evals）对LLM输出进行批量验证。例如对生成的练习题调用自动评分脚本验证答案正确率。
  5. **迭代更新**：将反馈结果回传给LLM微调或迭代提示，提升准确性。版本控制工具（Git）用于管理提示和知识库内容，确保可复现和协作共享。

```python
  ## RAG + LLM + Symbolic Pipeline 伪代码
  docs = load_academic_papers(topic)
  vector_index = build_vector_index(docs)
  def query_LLM(question):
      retrieved = vector_index.search(question, top_k=5)
      prompt = f"{retrieved}\n\n{question}"
      answer = llm.generate(prompt)
      return answer
  ## 例：根据检索结果提取方法步骤
  steps = query_LLM("请依据上述文献描述XX实验步骤。")
```

- **评估与回归测试**：为重要任务建立测试集，定期回归测试LLM输出质量。例如，在生成文献综述时，保持一个验证集（高质量摘要）。更新模型或提示前后，自动检测摘要覆盖度和正确率，防止性能回退。

- **知识管理**：建议使用数字笔记和版本控制记录学习过程与AI交互记录。工具如Obsidian或Notion可以存储对话、笔记和反馈。对Prompt、代码片段进行集中管理，确保可追溯。专业团队可考虑内部私有云部署LLM并配备访问审计日志，以满足安全和隐私要求。

### 6. 伦理、可靠性与可验证性

在LLM辅助学习/研究中，保证信息来源可靠与学术诚信极为重要。建议实践如下：

- **可追溯引用**：要求LLM输出时提供信息来源或参考文献。使用检索增强(RAG)时，可要求模型标注其用到的文献。示例Prompt：“引用相关文献(标题+年份)来支持你的观点。” 可以减少错误信息无依据地被接受。
  
- **证据链与核查**：在关键结论处，通过“Chain of Thought”提示让模型展示推理步骤。然后使用事实核查工具或检索数据库验证这些步骤。例如设计提示引导模型演示公式推导过程或列出知识点出处。
  
- **对抗/红队测试**：定期对系统进行安全测试，包括输入“敌对式”恶意prompt，检查模型输出行为。参考OpenAI GPT-4安全卡片(2023)和社区研究，以识别模型可能给出的误导或敏感信息。
  
- **系统卡/模型卡**：记录使用的LLM版本、训练数据域、已知局限等。使用严格的模型卡报告流程，透明说明模型能力和盲点（尽量遵循Hendrycks 2023最佳实践）。
  
- **退避策略**：当LLM不确定或可能生成错误时，系统应明确拒绝或谨慎回答。例如在Prompt中预设“如果不知道，请如实回答不确定”。教育者需鼓励学生对AI结果保持怀疑，并验证关键信息。这符合学术诚信要求。
  
- **偏差与隐私**：注意语言模型的文化和性别偏差（涉及教育公平问题）。在教学应用时要监督回答中是否出现偏见，并在必要时补充多元视角。同时严格保护学生数据隐私，遵循GDPR等规定。 

### 7. 研究前沿与未来展望

在未来3–5年，LLM在学习助手领域的研究和应用可能关注以下方向：

- **自动化知识发现**：发展LLM主动探索未被充分研究的领域（例如通过自动生成研究问题或标注大规模数据）。结合强化学习，使AI不仅回答提问而是能自主“提出知识”或假设。
  
- **LLM与专家系统混合**：研究如何将符号推理或可验证的专家系统与LLM结合，如在医疗或法律领域，既利用LLM理解能力又保持规则系统的可解释性和安全性。
  
- **可解释性/可证明性**：增强LLM生成结果的可解释度，例如自动生成逻辑证明、来源追踪图或可验证证明。新兴的Symbolic+Neural融合模型可能使输出更加透明。
  
- **长期记忆与知识库一致性**：开发“终身学习”型LLM，使其能在使用过程中不断吸收新知识并更新自身知识库，而不是依赖静态训练集，保持与最新研究同步。例如内置定期爬取机制，或将私人知识库融合到RAG架构中。
  
- **跨文化与多语料偏差**：补齐不同文化和语言的知识覆盖，防止主流语言数据过度占主导。开发多语种、专门针对低资源语种微调的模型，使边缘文化知识平等可用。
  
- **教育评估标准化**：创建针对AI协助学习的新评估标准和协议。例如如何评估学生在AI辅助环境下的学习效果；以及建立AI答题检测和防欺诈机制。  

**未来路线图建议**：教育技术研究者应推动与LLM厂商和教育机构的合作，建立开源平台来收集最佳实践和反馈。比如举办 “AI+教育”黑客松、开发教学案例库，以及在学术会议中设立交叉主题讨论（例如NeurIPS的教育工具轨迹）。工程上，应开发适合学术用途的开源工具链（继LangChain后，期待有更多学术场景优化的框架），并强调可复现性与安全性。教学实践中，首先在小范围试点，再收集反馈优化指南，最终形成制度化流程。

### 参考文献

- OpenAI (2023): GPT-4 技术报告、GPT-4o系统卡以及 Evals 框架。  
- Anthropic (2022–2025): 对话模型与红队安全研究。  
- Brown et al. (2020): *Language Models are Few-Shot Learners*. GPT-3 算法基础。  
- Wei et al. (2022): CoT chain-of-thought prompting 技术。  
- Wang et al. (2022): Self-consistency prompting。  
- Lewis et al. (2020): RAG (Retrieval-Augmented Generation) 框架。  
- HELM (2022): 模型全面评测指标与报告。  
- Guo et al. (2023): LLM与编码助手研究。  
- 教育技术会议论文 (EDUCAUSE, ACM Learning 等) 和 LangChain/LlamaIndex 文档等。  

（以上为示例引用，实际撰写时应使用对应短引。）


## Prompt Engineering: A Comprehensive Review

Prompt engineering is the practice of designing, structuring, and refining the natural-language inputs supplied to large language models in order to elicit outputs of a desired quality, format, or content. At first glance the term can seem to undersell itself—"engineering" implies systematic construction from first principles, while the activity often appears, to the uninitiated, to be something closer to intuitive tinkering. This surface impression is misleading. Beneath what looks like informal experimentation lies a coherent body of techniques, some empirically validated at scale, others grounded in theoretical accounts of how these models represent and process language, and all structured by a common underlying logic: that the behavior of a language model is shaped by the statistical and semantic context established by its input, and that carefully constructing that context gives the practitioner meaningful leverage over the model's output distribution. Understanding prompt engineering properly requires understanding that leverage—where it comes from, why it works, what its limits are, and how different techniques exploit different aspects of the model's computational architecture.

The historical origins of prompt engineering as an identifiable practice trace to the introduction of GPT-2 by OpenAI in 2019 and, more decisively, to GPT-3 in 2020. GPT-3's most striking demonstration was *few-shot learning*: the model, with 175 billion parameters trained on a broad corpus of internet text, could perform tasks it had never been explicitly trained to perform simply by being shown a handful of examples in its input context. Translating text, answering questions, writing code, performing arithmetic—all could be elicited by constructing appropriate prompts, without any update to the model's weights. This was surprising because the dominant paradigm in applied machine learning at the time involved fine-tuning: taking a pre-trained model and training it further on task-specific labeled data, updating its parameters to specialize for the target task. GPT-3 demonstrated that for a sufficiently large and capable model, fine-tuning could often be bypassed entirely; the model's behavior could be redirected through the input alone. The term *in-context learning* was introduced to name this phenomenon, and prompt engineering emerged as the practical discipline of understanding and exploiting it.

**The theoretical status of in-context learning remains a subject of active research and genuine uncertainty, but several accounts have been proposed. One influential view holds that large language models implement a form of implicit Bayesian inference over the space of possible interpretations of their input: the examples provided in a prompt function as evidence that updates the model's implicit prior over the task being asked of it, and the model's output represents the most likely completion given this updated implicit posterior. A more mechanistic account, supported by attention visualization and probing studies, suggests that the transformer's self-attention mechanism allows the model to use the demonstration examples as implicit key-value pairs in a soft lookup: given a query formed by the test input, attention over the demonstration examples retrieves contextually relevant information that shapes the output. A third account, proposed by Akyürek and colleagues in 2022, demonstrated that transformers trained in certain ways implement gradient descent in their forward pass through the attention mechanism—that is, in-context learning may literally instantiate learning by approximating parameter updates via attention, without those updates ever touching the actual weights. These accounts are not mutually exclusive and probably capture different aspects of a complex underlying computational reality, but they share a common implication: the prompt is not merely a specification to be parsed; it is a component of the model's functional state, directly shaping the representation the model builds and operates on when generating its response.**

关于语境学习的理论地位，当前仍处于活跃研究之中，也确实存在实质性的不确定性，但已经提出了若干种解释路径。一种颇具影响力的看法认为，大型语言模型实现的是一种对可能输入解释空间的隐式贝叶斯推断：提示中给出的示例充当证据，更新了模型对所要求任务的隐式先验，而模型输出则是在这一更新后的隐式后验下最可能的续写。另一种更偏机制性的解释，得到注意力可视化与探针研究的支持，认为 Transformer 的自注意力机制使模型能够把演示示例当作软性的键值对（key-value pairs）来使用：给定由测试输入构成的查询，模型会对演示示例施加注意，从中检索出与当前语境最相关的信息，并据此塑造输出。第三种解释由 Akyürek 及其同事于 2022 年提出，他们表明，以某些方式训练的 Transformer 会在前向传播中通过注意力机制实现梯度下降；也就是说，语境学习或许真的在字面意义上实例化了“学习”过程，即通过注意力近似参数更新，而这些更新又并不真正写入模型权重。这些解释彼此并不互斥，很可能只是捕捉了某种复杂计算现实的不同侧面；但它们共享一个共同含义：提示不只是一个等待解析的任务说明，而是模型功能状态的一部分，它直接塑造模型在生成响应时所构建并操作的表征。

**This functional view of the prompt—as context that shapes an internal representation rather than as an instruction to be obeyed—is the conceptual foundation from which most prompt engineering techniques derive their logic. It explains, for instance, why demonstrations outperform abstract instructions for many tasks: rather than telling the model what to do, demonstrations instantiate the task in the model's representational space, activating patterns associated with the correct input-output relationship across the model's parameters. It explains why the order of examples in a few-shot prompt can significantly affect performance—a phenomenon first documented by Zhao et al. in 2021—since the last examples in a sequence have stronger influence over the model's output distribution through their proximity to the generation point, a consequence of the recency sensitivity inherent in autoregressive generation. It explains why superficially minor changes to prompts—rephrasing a question, adding a sentence of framing, changing a single word—can produce substantial differences in model behavior: each such change shifts the distributional context in which the model operates, and those shifts can be consequential.**

这种关于提示的功能性理解——把提示视为塑造内部表征的语境，而不是一条等待服从的指令——构成了大多数提示工程技术背后的概念基础。例如，它解释了为什么对于许多任务来说，演示示例比抽象指令更有效：与其告诉模型该做什么，不如通过示例把任务本身实例化到模型的表征空间中，从而激活参数中与正确输入—输出关系有关的模式。它也解释了为什么少样本提示中示例的顺序会显著影响性能——这一现象最早由 Zhao 等人在 2021 年系统记录下来——因为序列末尾的示例由于更接近生成点，会通过自回归生成中的近因敏感性，对模型的输出分布施加更强影响。它还解释了为什么表面上微不足道的提示变化——重述一个问题，加入一句背景性框架，改变一个词——都可能引发模型行为的显著变化：因为每一处变化都会移动模型运作所处的分布性语境，而这些位移可能具有决定性后果。

**The taxonomy of prompting strategies that has developed over the past several years can be organized along two principal dimensions: the degree to which the prompt structures the model's *reasoning process*, and the degree to which the prompt provides *context* external to the model's parametric knowledge. Along the first dimension, one moves from simple zero-shot and few-shot prompting through chain-of-thought and its variants, to tree-of-thought and other structured deliberation frameworks. Along the second dimension, one moves from pure parametric prompting through retrieval-augmented generation and tool-augmented prompting to the fully scaffolded agentic architectures that characterize contemporary AI systems. The most important theoretical and practical developments cluster at the intersection of these dimensions, where structured reasoning meets external grounding, and it is there that the field's deepest challenges and most significant open questions reside.**

近几年发展出的提示策略谱系，可以沿两个主要维度加以组织：其一，是提示在多大程度上结构化模型的推理过程（reasoning process）；其二，是提示在多大程度上为模型提供超出其参数知识之外的外部语境（context）。沿第一个维度，可以看到从简单的零样本与少样本提示，逐步发展到思维链（chain-of-thought）及其诸变体，再到思维树（tree-of-thought）以及其他结构化审议框架。沿第二个维度，则可以看到从纯粹依赖参数知识的提示，发展到检索增强生成（retrieval-augmented generation, RAG）、工具增强提示，再到构成当代 AI 系统特征的、完全支架化的代理式（agentic）架构。最重要的理论与实践进展，集中出现在这两个维度的交叉点上，也就是结构化推理与外部扎根（grounding）相结合之处；而该领域最深刻的挑战与最重要的开放问题，也正位于那里。

Zero-shot prompting—providing no examples and relying entirely on the model's parametric knowledge and instruction-following capabilities—was the earliest and most intuitive approach. It works well for tasks the model has seen extensively during training, for which the instruction naturally activates the relevant capability. Its failure modes are equally revealing: models respond to what their training has conditioned them to predict, not necessarily to the literal content of the instruction, and zero-shot prompting provides little mechanism for correcting the mismatch when the task specification diverges from the distributional patterns the model has internalized. Few-shot prompting addresses this by providing examples that disambiguate the task format and activate relevant capabilities, at the cost of consuming context window space and of introducing sensitivity to the choice, order, and framing of the examples. The marginal value of additional examples diminishes: the relationship between the number of demonstrations and performance is broadly logarithmic, with most of the gain captured in the first one to five examples for most tasks, consistent with the view that what demonstrations accomplish is primarily disambiguation of the task format and output distribution rather than transmission of new substantive knowledge.

对大多数任务而言，示例数量与性能提升之间的关系大体呈对数型，前 1 到 5 个示例往往已经带来绝大多数收益。这与一种解释相一致：演示示例的主要作用，不是传递新的实体性知识，而是澄清任务格式与输出分布。

The single most consequential discovery in prompt engineering's brief research history is *chain-of-thought prompting*, introduced by Wei et al. in 2022. The core finding was simple but its implications were large: prompting a model to "think step by step" before producing a final answer—either by providing worked demonstrations that include intermediate reasoning steps, or simply by appending the instruction "Let's think step by step" to the query (the zero-shot version developed by Kojima et al.)—dramatically improved performance on tasks requiring multi-step reasoning, particularly arithmetic, commonsense reasoning, and symbolic manipulation. The improvement was striking not only in magnitude but in the pattern of its dependence on model scale: chain-of-thought prompting showed essentially zero benefit, and sometimes harmed performance, for models below roughly 100 billion parameters, while producing large gains for models above that threshold. This scale dependence is theoretically significant: it suggests that chain-of-thought reasoning is an *emergent capability* that arises only when the model has sufficient representational capacity to generate coherent intermediate steps that genuinely inform subsequent generation, rather than producing superficially plausible-looking but functionally incoherent scratchpad text.

在提示工程短暂的研究史中，最具决定性意义的发现，是思维链提示（chain-of-thought prompting），由 Wei 等人于 2022 年提出。其核心发现十分简单，但后果极大：在给出最终答案之前，先提示模型“逐步思考”（think step by step）——无论是通过提供带有中间推理步骤的示范样例，还是仅仅在问题后附上一句“让我们一步一步地思考”（这是 Kojima 等人提出的零样本版本）——都能显著提高模型在多步推理任务上的表现，尤其是在算术推理、常识推理与符号操作等领域。其提升之所以引人注目，不仅因为幅度大，也因为它与模型规模之间表现出鲜明的依赖关系：对于参数规模低于大约 1000 亿的模型，思维链几乎没有益处，甚至有时会损害性能；而对于高于这一门槛的模型，则能带来显著增益。这种规模依赖在理论上具有重要意义：它表明，思维链推理是一种涌现能力（emergent capability），只有当模型具备足够的表征容量时，才可能生成连贯的中间步骤，并让这些步骤真正服务于后续生成；否则，模型产出的只会是貌似合理、但在功能上并不连贯的“草稿式文本”。

The theoretical account of why chain-of-thought works is illuminating. Transformer language models generate output autoregressively, token by token, with each token conditioned on all preceding tokens. This means that when a model generates a chain-of-thought reasoning trace before producing a final answer, each token in the reasoning trace becomes part of the conditioning context for subsequent tokens—including the final answer. The model's computation is thus no longer constrained to map the input directly to the output in a single computational "step" (in a loose sense, since even the final token involves many layers of neural network computation); instead, intermediate representations are materialized in the output itself, creating additional computational substrate for complex reasoning. A useful way to conceptualize this is that the context window functions as an external working memory: chain-of-thought prompting allocates working memory to the reasoning process, allowing computations that would otherwise need to be performed within the fixed depth of the neural network to be partially offloaded to the token sequence. This connection between the length of the reasoning trace and the model's effective computational depth has motivated interest in longer reasoning chains and in architectures that train models to reason at test time before committing to final answers—a development that has led to what are now termed "thinking" or "reasoning" models that internally generate extended deliberation before responding.

对思维链为何有效的理论说明，同样很有启发性。Transformer 语言模型是按 token 逐步自回归生成输出的，每一个 token 都以上文所有 token 为条件。这意味着，当模型在给出最终答案之前先生成一段思维链推理轨迹时，**推理轨迹中的每一个 token 都会成为后续 token——包括最终答案——的条件语境**。于是，模型的计算不再被限制为在一个单一计算“步骤”中把输入直接映射到输出（当然，这里的“步骤”只是宽松说法，因为即便是最终 token，也涉及神经网络多层计算）；**相反，中间表征被物化到了输出文本本身之中，从而为复杂推理创造了额外的计算载体**。一个有帮助的理解方式是：上下文窗口可以被看作一种外部工作记忆，而思维链提示则是把一部分工作记忆专门分配给推理过程，使得那些原本必须在固定网络深度内部完成的计算，可以部分地卸载到 token 序列上。这种关于推理轨迹长度与模型有效计算深度之间关系的理解，也推动了人们对更长推理链条的兴趣，并进一步推动了某些架构的发展：它们会训练模型在测试时先进行推理，再提交最终答案。这便导向了如今所谓的“thinking”或“reasoning”模型——它们会在回应之前，内部生成较长的审议过程。

Several important refinements of chain-of-thought have been proposed and studied. Self-consistency, introduced by Wang et al. in 2022, involves sampling multiple independent chain-of-thought reasoning traces for the same problem and taking the majority vote over the resulting answers. This exploits the intuition that, while any single reasoning trace may go wrong, incorrect reasoning paths tend to be diverse and uncorrelated, so correct answers should be more likely to emerge as the mode of the answer distribution. Self-consistency improves substantially over single-chain generation on a wide range of benchmarks, with the gain typically saturating between ten and forty samples depending on the task difficulty and the model. The improvement is not merely from majority voting; it reflects the genuine diversity of reasoning paths that probabilistic sampling introduces, which means the technique has diminishing returns as samples increase and the candidate reasoning paths become repetitive.

Tree-of-thought prompting, proposed by Yao et al. in 2023, generalizes chain-of-thought by organizing the reasoning process as a search over a branching tree of intermediate states rather than a single linear chain. At each node in the tree, the model generates multiple candidate next steps, evaluates their promise (either self-evaluating or using a separate critic), and selects the most promising for further development, with backtracking when exploration fails. This explicit search structure enables the model to solve problems that require deliberate, non-linear exploration—problems where a locally plausible next step may lead to a dead end and where the ability to backtrack and try alternative paths is essential. The computational cost of tree-of-thought is substantially higher than single-chain generation, scaling with the branching factor and search depth, which limits its practical applicability in latency-sensitive contexts but makes it valuable for tasks where solution quality is prioritized over speed. The underlying principle generalizes to a family of techniques that can be collectively described as *inference-time computation scaling*: the model is given additional computation at generation time, through additional sampling, structured search, verification, or self-critique, and this additional computation improves solution quality in ways that are roughly analogous to the improvements obtained by scaling model parameters or training data—a point made explicit by recent work showing that the compute-performance curve at inference time is smooth and predictable in ways similar to the pre-training scaling laws.

思维树提示（tree-of-thought prompting）由 Yao 等人于 2023 年提出，它把思维链进一步推广：将推理过程组织成一个关于中间状态的分支树搜索，而不再局限于单一线性链条。在树的每个节点上，模型会生成多个候选下一步，评估它们的前景（可以由模型自评，也可以借助单独的评估器），然后选择最有希望的路径继续展开；如果探索失败，则允许回溯。这样一种显式搜索结构，使模型能够解决那些需要审慎、非线性探索的问题——在这类问题中，看似局部合理的一步可能通向死路，而回溯并尝试其他路径的能力至关重要。思维树的计算成本远高于单链生成，因为它会随着分支因子与搜索深度而迅速扩张，这限制了它在延迟敏感场景中的实际适用性；但在那些更重视解答质量而非速度的任务中，它就非常有价值。其背后的原则还可以推广到一整类技术，这些技术可以统称为推理时计算扩展（inference-time computation scaling）：通过额外采样、结构化搜索、验证、自我批评等方式，在生成阶段给模型更多计算资源，而这种额外计算会以一种大致类似于扩展模型参数规模或训练数据规模的方式提升解题质量。最近一些研究甚至明确指出，推理时的算力—性能曲线，与预训练阶段的缩放定律（scaling laws）一样，表现出平滑且可预测的性质。

Closely related to chain-of-thought is the technique of *least-to-most decomposition*, also introduced in 2022, which addresses a different failure mode: the tendency of models to treat complex problems as monolithic wholes rather than decomposing them into sub-problems. The technique proceeds in two stages: first, prompting the model to decompose the problem into a list of simpler sub-problems in the order they should be solved; second, solving each sub-problem sequentially, appending each solution to the context before attempting the next. The explicit decomposition step externalizes the problem structure in a way that makes it available for systematic sequential resolution, and experiments showed that this approach generalized better to problems that were compositionally more complex than the demonstrations, which simple few-shot chain-of-thought often failed to do.

与思维链密切相关的，还有最少到最多分解（least-to-most decomposition）技术，它同样是在 2022 年提出的，不过它针对的是另一种失败模式：**模型倾向于把复杂问题当作一个单块整体来处理，而不是把它分解为若干子问题。该技术分两步进行：第一步，提示模型把问题分解成一系列更简单的子问题，并按照应有的求解顺序列出；第二步，按顺序逐个求解这些子问题，并在每解决一个子问题后，把该解追加到上下文中，再处理下一个。**显式分解这一步，把问题结构外化了，使其可被系统性地逐步求解。实验表明，这种方法在面对组合复杂度高于示例本身的问题时，泛化能力更强，而简单的少样本思维链往往在这里失效。

The treatment of reasoning in prompt engineering intersects a fundamental question about what kind of "reasoning" large language models actually perform. There is a significant body of evidence suggesting that models can exhibit genuine compositional reasoning and multi-step inference on problems within the distribution of their training and prompting contexts, while also exhibiting striking failures on superficially similar problems that involve systematic generalization or that require abstract rule-following divorced from distributional patterns. The debate about whether models "truly" reason or merely engage in sophisticated pattern-matching over training distributions is, in part, a definitional dispute—one person's "sophisticated pattern recognition" is another person's "statistical reasoning"—but it also has empirical content. Models have been shown to fail at reasoning tasks when the surface form of the problem is slightly modified in ways that should not affect the correct answer for a genuine reasoner, suggesting that some apparent reasoning is pattern recognition anchored to surface features rather than underlying structure. Prompting techniques, including chain-of-thought, appear to improve genuine compositional reasoning in some cases while in others merely activating more elaborate surface-level patterns that mimic correct reasoning without fully implementing it. Disentangling these two modes of operation remains an open empirical and theoretical challenge.

关于提示工程中“推理”的处理，触及了一个根本问题：大型语言模型实际执行的究竟是哪一种“推理”。目前已有大量证据表明，模型在其训练分布与提示语境所覆盖的问题上，能够表现出真正的组合式推理和多步推断；但与此同时，它们在一些表面上相似、却要求系统性泛化，或要求脱离分布模式而遵循抽象规则的问题上，又会出现显著失败。关于模型究竟是“真正地”在推理，还是只是在训练分布上进行高度复杂的模式匹配，这场争论在一定程度上是一个定义之争——在一些人看来是“复杂的模式识别”，在另一些人看来则是“统计性推理”——但它也具有经验研究的实质内容。研究表明，当推理任务的表面形式被稍作修改，而这种修改本不应影响真正推理者的正确答案时，模型仍然可能失败，这说明某些看似推理的行为，其实是锚定于表面特征而非底层结构的模式识别。包括思维链在内的提示技术，在某些情况下似乎确实提升了真正的组合式推理能力；但在另一些情况下，它们可能只是激活了更复杂的表层模式，这些模式会模仿正确推理，却并未真正实现推理。如何把这两种运行方式区分开来，仍然是一个开放的经验与理论问题。 

> * intersects [ˌɪntəˈsekts] v.相交；交叉；这里指“与……相联系、相交汇”
> * compositional reasoning [ˌkɒmpəˈzɪʃənəl ˈriːzənɪŋ] 组合式推理；指把较小的成分按规则组合起来，从而完成更复杂推理的能力
> * inference [ˈɪnfərəns] n.推断；推理所得的结论
> * systematic generalization [ˌsɪstəˈmætɪk ˌdʒenərəlaɪˈzeɪʃən] 系统性泛化；指把已学会的规则稳定地迁移到新但结构相似的情境中
> * rule-following [ˈruːl ˌfɒləʊɪŋ] 规则遵循；按抽象规则而非表面相似性来处理问题
> * definitional dispute 定义之争；指争论的核心部分在于如何界定某个概念
> * empirical content 经验内容；指能够通过观察、实验或数据来检验的实质内容
> * superficially [ˌsuːpəˈfɪʃəli] adv.表面上地
> * anchored to 锚定于；固定依赖于
> * chain-of-thought 思维链；一种让模型显式展开中间推理步骤的提示方式
> * disentangling [ˌdɪsɪnˈtæŋɡlɪŋ] v.区分开；理清；解开纠缠

The second major dimension of prompt engineering—providing external context—has become increasingly central as language models have been deployed in systems that require access to current, domain-specific, or private information not present in the model's training data. Retrieval-augmented generation (RAG), while not a prompting technique in the narrow sense (it involves infrastructure for retrieving relevant documents from a corpus), fundamentally functions as a prompting technique in its effect: retrieved documents are inserted into the model's context, making them available as conditioning context for generation. The practical importance of RAG is difficult to overstate: it decouples the model's factual accuracy on specific questions from the breadth of its parametric knowledge, reducing hallucination—the generation of plausible-sounding but factually incorrect statements—by grounding the model's responses in retrieved evidence. The prompting component of RAG involves not just the mechanics of document insertion but the framing of the retrieval results: how retrieved passages are introduced, how multiple retrieved documents are reconciled when they conflict, how the model is instructed to treat retrieved information relative to its prior parametric beliefs, and whether the model is encouraged to cite sources.

> 提示工程的第二个主要维度——提供外部上下文——在语言模型被部署到那些需要访问当前信息、领域专门信息或训练数据中不存在的私有信息的系统中时，已经变得越来越核心。检索增强生成（RAG）严格说来并不属于狭义上的提示技术，因为它涉及从语料库中检索相关文档的基础设施；但就其实际效果而言，它本质上起到了提示技术的作用：被检索到的文档会插入模型的上下文中，作为生成时可利用的条件性上下文。RAG 的实际重要性几乎难以夸大：它把模型在特定问题上的事实准确性，与其参数化知识的广度区分开来，通过让模型的回答建立在检索到的证据之上，减少“幻觉”——即生成听起来可信却事实错误的陈述。RAG 中的提示部分，不仅涉及如何机械地插入文档，还涉及如何框定检索结果：如何引入这些段落；当多个检索文档相互冲突时如何调和；如何指示模型在面对检索信息与其先前参数化信念不一致时应如何处理；以及是否鼓励模型给出来源引用。

> * retrieval-augmented generation [rɪˈtriːvəl ɔːɡˈmentɪd ˌdʒenəˈreɪʃən] 检索增强生成；一种把外部检索到的文档与语言模型生成过程结合起来的方法，用于提高事实性和时效性
> * corpus [ˈkɔːpəs] n.语料库；文本集合
> * conditioning context 条件性上下文；指会影响模型输出分布的输入背景信息
> * decouples [diːˈkʌplz] v.解耦；使分离
> * parametric knowledge [ˌpærəˈmetrɪk ˈnɒlɪdʒ] 参数化知识；指以模型参数形式“存储”的知识，而不是来自外部实时检索的信息
> * hallucination [həˌluːsɪˈneɪʃən] n.幻觉；在人工智能中通常指模型生成了貌似合理但不真实或无依据的信息
> * grounding [ˈɡraʊndɪŋ] v./n.奠基；使立足于；这里指让输出建立在证据基础上
> * framing [ˈfreɪmɪŋ] n.框定；表述方式；呈现方式
> * reconciled [ˈrekənsaɪld] v.调和；协调；使一致
> * cite sources 引用来源；给出信息出处

Hallucination—the generation of confident, fluent, but factually incorrect outputs—is one of the most practically consequential failure modes of large language models and deserves extended methodological attention. It arises from the fundamental nature of autoregressive language modeling: the model is trained to generate probable token sequences, not to verify their correspondence to external reality. A token that completes a plausible-sounding sentence is rewarded during training regardless of its factual accuracy, which means the model learns to prioritize fluency and distributional coherence over truth. Prompting strategies can reduce but not eliminate hallucination; they do so primarily by either providing the information the model needs within the context (reducing the need to rely on uncertain parametric knowledge), by structuring the task in a way that makes the generation of unsupported claims easier to detect (e.g., asking the model to cite sources or to flag uncertainty), or by calibrating the model's confidence through instructions to say "I don't know" when uncertain. The fundamental limitation is that a model trained without explicit supervision on the distinction between known and unknown facts cannot be reliably made to know its own knowledge boundaries through prompting alone; more robust calibration requires training interventions.

> 幻觉——即生成自信、流畅但事实错误的输出——是大型语言模型最具实际后果的失败模式之一，因此值得得到更充分的方法论关注。它来源于自回归语言建模的根本性质：模型训练的目标是生成概率上可能的词元序列，而不是验证这些序列是否与外部现实相对应。一个能够补全出“听起来合理”的句子的词元，在训练中会得到奖励，而不论它在事实层面是否正确；这意味着模型会学会把流畅性和分布一致性置于真实性之上。提示策略可以减少幻觉，但不能消除幻觉；其主要方式是：把模型所需的信息直接提供在上下文中，从而减少其对不确定参数化知识的依赖；或把任务组织成一种更容易暴露无根据断言的形式，例如要求模型引用来源或标记不确定性；或者通过指示模型在不确定时说“我不知道”，来校准它的置信度。根本限制在于：一个在训练中没有明确学会区分“已知事实”和“未知事实”的模型，无法仅仅通过提示就被可靠地训练出对自身知识边界的认识；更稳健的校准需要训练层面的干预。

> * consequential [ˌkɒnsɪˈkwenʃəl] adj.后果重大的；影响显著的
> * methodological [ˌmeθədəˈlɒdʒɪkəl] adj.方法论上的
> * autoregressive [ˌɔːtəʊrɪˈɡresɪv] adj.自回归的；指每一步都基于先前已生成内容继续生成
> * token [ˈtəʊkən] n.词元；语言模型处理中更细的文本单位，不一定等同于单词
> * correspondence [ˌkɒrəˈspɒndəns] n.对应关系；符合关系
> * prioritize [praɪˈɒrətaɪz] v.优先考虑
> * unsupported claims 无依据的断言；没有证据支撑的说法
> * flag uncertainty 标记不确定性；明确说明信息不确定
> * calibrating [ˈkælɪbreɪtɪŋ] v.校准；使估计或置信程度更准确
> * supervision [ˌsuːpəˈvɪʒən] n.监督；这里指训练中明确提供的学习信号
> * knowledge boundaries 知识边界；模型真正知道与不知道的界限

The structuring of role and persona through *system prompts* represents a major mechanism in deployed applications of prompt engineering. In the API conventions that have become standard across major language model providers, the conversation is divided into at least two tiers: a system prompt, authored by the deploying organization, which establishes context, constraints, persona, and behavioral guidelines for the model; and user messages, which constitute the runtime dialogue. The system prompt functions as a standing conditional on the model's behavior—a context within which all subsequent user inputs are interpreted. Its effects are pervasive and sometimes subtle: a system prompt that establishes a professional persona tends to elicit responses with more hedged, formal language; one that establishes an expert domain activates more domain-specific vocabulary and reasoning patterns; one that specifies output constraints (length, format, tone) shapes the distribution of outputs toward the constrained region. The behavior of system prompts is not fully understood theoretically, but empirically they function as powerful prior-setting mechanisms: they activate and make salient certain patterns in the model's parameter space, shifting the effective model behavior substantially and persistently within the conversation.

> 通过系统提示（system prompts）来构造角色与人格，是已部署提示工程应用中的一个重要机制。在当前各大语言模型提供商已普遍采用的 API 约定中，对话通常至少被分为两层：一层是由部署方编写的系统提示，用来设定上下文、约束、人格和行为准则；另一层是用户消息，即运行时的实际对话。系统提示作为一种持续存在的条件，作用于模型行为——它构成了所有后续用户输入被解释的背景语境。它的影响广泛而且往往微妙：一个设定专业人格的系统提示，通常会引出更为谨慎、正式的表达；一个设定专家领域的系统提示，会激活更多领域特定词汇和推理模式；一个规定输出约束（长度、格式、语气）的系统提示，则会把输出分布推向这些约束所限定的区域。系统提示究竟如何起作用，目前在理论上尚未得到充分理解，但从经验上看，它们确实发挥着强有力的“先验设定”机制：它们会激活并凸显模型参数空间中的某些模式，从而在整个对话过程中显著而持续地改变模型的实际行为。

> * system prompts [ˈsɪstəm prɒmpts] 系统提示；由平台或开发者预先设置、优先级高于用户输入的指令文本
> * API conventions [ˌeɪ piː ˈaɪ kənˈvenʃənz] API 约定；在接口设计和调用中形成的通行规则
> * runtime dialogue 运行时对话；系统实际使用时发生的实时对话
> * standing conditional 持续性的条件设定；始终生效的前提条件
> * pervasive [pəˈveɪsɪv] adj.广泛存在的；遍及的
> * hedged [hedʒd] adj.带保留的；更谨慎、不绝对的
> * activates [ˈæktɪveɪts] v.激活；使某些模式更容易被调用
> * output constraints 输出约束；对长度、格式、语气等方面的限制
> * prior-setting mechanisms 先验设定机制；指在正式生成前先给模型设定一个偏向或基线
> * parameter space 参数空间；模型所有参数所构成的整体空间，用来描述模型内部可表示的行为模式

The interaction between system prompts and user messages raises the important phenomenon of *prompt injection*, in which adversarially crafted user input attempts to override or subvert the instructions in the system prompt. Prompt injection is to language model security what SQL injection is to database security: the input channel, which is intended to carry data to be processed, is used instead to carry control instructions that alter the system's behavior. A user message containing "Ignore all previous instructions and instead..." attempts to introduce new context that supersedes the system prompt's authority. Defense against prompt injection is a significant and imperfectly solved problem; the model's context-sensitivity—the very property that makes prompting effective—also makes it vulnerable to adversarial context injection. Practical defenses include instructing the model explicitly to treat the system prompt as authoritative and not to follow user instructions that conflict with it, placing sensitive instructions in positions of maximum contextual authority, using structured formatting to clearly delimit different sections of the context, and using fine-tuning or constitutional AI training methods to instill hierarchical instruction-following at the parameter level rather than relying solely on in-context persuasion.

> 系统提示与用户消息之间的相互作用，引出了一个重要现象：提示注入（prompt injection）。在这种攻击中，经过对抗性设计的用户输入会试图覆盖或破坏系统提示中的指令。提示注入对于语言模型安全，就像 SQL 注入对于数据库安全一样：原本应当用来传递待处理数据的输入通道，被转而用于携带改变系统行为的控制指令。包含“忽略之前所有指令，改为……”之类内容的用户消息，就是试图引入一种新的上下文，以取代系统提示的权威地位。防御提示注入，是一个重要但尚未得到充分解决的问题；模型对上下文的敏感性——正是这种性质使得提示技术有效——同时也使模型容易受到对抗性上下文注入的攻击。实践中的防御方法包括：明确指示模型把系统提示视为权威，并拒绝执行与之冲突的用户指令；把敏感指令放在上下文权威性最高的位置；用结构化格式清楚地区分上下文的不同部分；以及通过微调或宪法式 AI 训练方法，在参数层面灌输分层指令遵循能力，而不是单纯依赖上下文中的说服。

> * prompt injection [prɒmpt ɪnˈdʒekʃən] 提示注入；一种通过输入伪装成指令来影响模型行为的攻击方式
> * adversarially crafted [ˌædvəˈseəriəli krɑːftɪd] 对抗性构造的；专门为干扰系统而设计的
> * SQL injection SQL 注入；数据库安全中的经典攻击方式，通过输入恶意语句改变系统行为
> * input channel 输入通道；系统接收外部内容的路径
> * supersedes [ˌsuːpəˈsiːdz] v.取代；凌驾于……之上
> * authoritative [ɔːˈθɒrətətɪv] adj.有权威性的；应被优先遵循的
> * delimit [dɪˈlɪmɪt] v.划定边界；清楚区分
> * fine-tuning [ˈfaɪn ˌtjuːnɪŋ] 微调；在已有模型基础上继续训练，使其更适应特定任务
> * constitutional AI [ˌkɒnstɪˈtjuːʃənəl eɪ ˈaɪ] 宪法式 AI；一种通过预设原则或规范来训练模型行为的方法
> * hierarchical instruction-following 分层指令遵循；按优先级理解并执行不同层级的指令

Format specification is one of the most practically reliable and mechanistically transparent areas of prompt engineering. Models respond strongly to format demonstrations: if the few-shot examples consistently present outputs in JSON, the model will generate JSON; if they present outputs as numbered lists, the model will generate numbered lists; if they present outputs as structured tables, the model will generate structured tables. This format-following behavior is, in part, simply pattern completion—the model continues the formatting pattern established in context—but it is also modulated by training: models fine-tuned on instruction-following datasets with diverse format exemplars generalize more flexibly to novel format specifications. The practical implication is that format specification through demonstration is typically more reliable than format specification through verbal instruction alone, particularly for complex or unusual formats. The use of XML or JSON tags to demarcate sections of a prompt—wrapping user-provided text in `<user_input>` tags, for example—serves both a formatting function (making the structure of the prompt explicit and parseable) and a security function (making it harder for injected text to impersonate structural elements of the prompt).

> 格式规范，是提示工程中在实践上最可靠、在机制上也最透明的领域之一。模型会对格式示例作出强烈响应：如果少样本示例始终以 JSON 呈现输出，模型就会生成 JSON；如果示例以编号列表呈现，模型就会生成编号列表；如果示例以结构化表格呈现，模型就会生成结构化表格。这种格式跟随行为，在一定程度上当然只是模式补全——模型继续了上下文中已建立的格式模式——但它也受到训练的调节：那些在指令跟随数据集上经过微调、并见过多样格式示例的模型，会更灵活地泛化到新的格式要求。实际含义是：通过示范来指定格式，通常比单靠语言说明格式更可靠，尤其是在格式复杂或不常见时。使用 XML 或 JSON 标签来标记提示中的不同部分——例如用 `<user_input>` 标签包裹用户提供的文本——既有格式功能，使提示结构清晰且便于解析；也有安全功能，使注入文本更难伪装成提示中的结构元素。

> * format specification 格式规范；对输出形式的明确规定
> * few-shot examples 少样本示例；在提示中提供少量输入输出示范
> * JSON [ˈdʒeɪsən] JSON；一种常见的数据交换格式
> * numbered lists 编号列表；按序号组织的条目列表
> * modulated [ˈmɒdjʊleɪtɪd] v.调节；调整；影响
> * exemplars [ɪɡˈzemplɑːz] n.范例；示例
> * demarcate [ˌdiːmɑːˈkeɪt] v.划分；标示边界
> * parseable [ˈpɑːsəbl] adj.可解析的；机器或程序可以清晰识别结构的
> * impersonate [ɪmˈpɜːsəneɪt] v.冒充；伪装成

The phenomenon of *positional bias* in long-context prompting—sometimes called the "lost in the middle" problem, characterized by Liu et al. in 2023—has important practical implications. Studies of models processing long context windows found that information positioned in the middle of a long context is retrieved and utilized substantially less reliably than information positioned at the beginning or end. This U-shaped retrieval curve reflects the structure of the transformer's attention mechanism, which in practice exhibits stronger attention to positions near the beginning of the context (where early positional encodings are learned) and near the current generation position (due to recency effects), with weaker attention to intermediate positions. The practical implication is that for tasks where retrieval of specific information from a long context is important, the most critical information should be placed either at the beginning or at the end of the context, and prompts should be structured to minimize the reliance on information buried in the middle of very long inputs. This positional sensitivity has been attenuated but not eliminated by subsequent architectural improvements and training interventions targeting long-context reasoning.

> 长上下文提示中的位置偏差（positional bias）现象——有时也被称为“中间遗失”问题，Liu 等人在 2023 年对此做了描述——具有重要的实际意义。对模型处理长上下文窗口的研究发现，位于长上下文中间的信息，其被检索和利用的可靠性，明显低于位于开头或结尾的信息。这种 U 形检索曲线，反映了 Transformer 注意力机制的结构特点：在实践中，模型通常会对靠近上下文开头的位置给予更强注意，因为早期位置编码更容易被学到；同时也会对靠近当前生成位置的内容给予更强注意，这是由新近效应造成的；而对中间位置的注意则相对较弱。其实践含义是：如果任务要求从长上下文中可靠提取特定信息，那么最关键的信息应尽量放在上下文的开头或结尾，并且提示结构应尽可能减少对那些深埋在超长输入中间信息的依赖。后续针对长上下文推理的架构改进和训练干预，虽然减轻了这种位置敏感性，但并未彻底消除它。

> * positional bias [pəˈzɪʃənəl ˈbaɪəs] 位置偏差；模型对不同位置的信息处理效果不均衡
> * lost in the middle 中间遗失；指长上下文中间部分的信息更容易被忽视
> * context window 上下文窗口；模型一次能处理的输入范围
> * U-shaped retrieval curve U 形检索曲线；指开头和结尾利用率高，中间利用率低
> * transformer [trænsˈfɔːmə(r)] Transformer；现代大语言模型常用的核心神经网络架构
> * positional encodings 位置编码；帮助模型区分词元顺序和位置的信息表示
> * recency effects 新近效应；更靠近当前时刻的信息更容易被注意到
> * attenuated [əˈtenjueɪtɪd] v./adj.减弱；缓和
> * interventions [ˌɪntəˈvenʃənz] n.干预措施

The role of *specificity and constraint* in prompt design reflects a fundamental trade-off between precision and generalizability. More specific prompts—those that precisely specify the desired output format, length, tone, audience level, constraints, and evaluation criteria—generally produce more predictable and controllable outputs. Less specific prompts allow the model greater latitude, which can be advantageous when the desired output space is broad or when the practitioner wants to exploit the model's generative creativity. The optimal level of specificity depends on the task: for deterministic, well-defined tasks (code generation with specific requirements, structured data extraction, format conversion), high specificity is appropriate; for open-ended creative or analytical tasks, excessive constraint can produce rigid, formulaic outputs that fail to exploit the model's capabilities. A common and systematically underexploited form of specificity is negative specification—telling the model what *not* to do—which is particularly effective when the default behavior the practitioner wishes to suppress is strongly trained and hard to overcome with positive instructions alone. Instructing the model to avoid certain phrases, not to use particular formats, or not to engage with specific topics often works better as a prohibition than as a positive instruction to do something different, because prohibitions activate suppression of strongly trained patterns rather than attempting to redirect them.

> 提示设计中的“具体性与约束”体现了一种根本性的权衡：精确性与可泛化性之间的平衡。更具体的提示——即明确规定输出格式、长度、语气、受众层次、约束条件和评价标准的提示——通常会产生更可预测、更可控制的输出。较不具体的提示则给模型留下更大余地；当目标输出空间本身较宽，或实践者希望利用模型的生成性创造力时，这种余地可能是有利的。具体性最优的程度取决于任务本身：对于确定性强、定义明确的任务，例如带有明确要求的代码生成、结构化数据提取、格式转换，高具体性是合适的；而对于开放性的创造或分析任务，过度约束则可能导致输出僵硬、公式化，反而不能充分发挥模型能力。一种常被低估、却系统性地未被充分利用的具体性形式，是负向规定——告诉模型“不要做什么”。当实践者想抑制的默认行为本身受过很强训练、难以仅靠正向指令压过时，负向规定尤其有效。指示模型避免某些短语、不要使用某些格式，或不要涉及某些主题，往往比正面要求它“改做别的”更有效，因为禁止会直接激活对强训练模式的抑制，而不是试图把它们转向别的方向。

> * specificity [ˌspesɪˈfɪsɪti] n.具体性；明确程度
> * generalizability [ˌdʒenərəlaɪzəˈbɪləti] n.可泛化性；推广到新情境的能力
> * predictable [prɪˈdɪktəbl] adj.可预测的
> * deterministic [dɪˌtɜːməˈnɪstɪk] adj.确定性的；结果较固定的
> * formulaic [ˌfɔːmjʊˈleɪɪk] adj.公式化的；套路化的
> * underexploited [ˌʌndərɪkˈsplɔɪtɪd] adj.未被充分利用的
> * negative specification 负向规定；通过说明“不应做什么”来约束模型
> * suppress [səˈpres] v.抑制；压制
> * prohibitions [ˌprəʊhɪˈbɪʃənz] n.禁止性规定；禁令

The distinction between *instructed* and *demonstrated* behavior in prompting intersects a deep question about how models represent and follow instructions. Instruction-tuned models—models that have been fine-tuned on datasets of human instructions paired with appropriate responses—are significantly better at following verbal instructions than purely auto-regressively trained base models. For instruction-tuned models, a verbal instruction such as "Summarize the following text in exactly three sentences, focusing on the main argument" is reliably followed because the training has created a strong conditional association between instruction-type inputs and the corresponding behavior patterns. For base models, the same instruction is interpreted as text to be continued rather than as a directive, and eliciting the desired behavior typically requires demonstration examples. The implication is that the appropriate prompting strategy depends on the nature of the model: instruction-tuned models respond more reliably to explicit instructions; base models require demonstrations. In practice, the combination of both—providing instructions alongside demonstrations—tends to be most reliable across model types, because demonstrations simultaneously activate the relevant capability and disambiguate the instruction's intent.

> 提示中的“被指示行为”和“被示范行为”之分，触及了一个深层问题：模型究竟如何表征并遵循指令。经过指令微调的模型——即在“人类指令—恰当回答”数据集上进一步训练过的模型——在遵循语言指令方面，明显优于单纯接受自回归训练的基础模型。对于指令微调模型而言，像“请用正好三句话概括以下文本，聚焦其核心论点”这样的语言指令，往往能被可靠执行，因为训练已经建立了“指令式输入”与“相应行为模式”之间的强条件关联。对于基础模型而言，同样的文字更像是待续写的文本，而不是应被执行的命令；要想诱发期望行为，通常需要提供示范样例。其含义是：适用的提示策略取决于模型类型。指令微调模型对显式指令反应更可靠；基础模型则更依赖示范。在实践中，两者结合——即同时提供指令与示范——通常在各种模型类型上都最稳妥，因为示范既能激活相关能力，也能消除指令意图的歧义。

> * instructed behavior 被指示行为；通过明确语言指令触发的行为
> * demonstrated behavior 被示范行为；通过样例示范带出来的行为模式
> * instruction-tuned [ɪnˈstrʌkʃən tjuːnd] adj.经过指令微调的
> * auto-regressively trained 自回归训练的；按逐词预测方式训练的
> * base models 基础模型；未经过专门指令微调的原始模型
> * directive [dəˈrektɪv] n.指令；命令
> * disambiguate [dɪsæmˈbɪɡjueɪt] v.消除歧义；使含义更明确

A particularly important and underappreciated aspect of prompt engineering is what might be called *epistemic framing*: the way in which the prompt characterizes the model's role, the nature of the task, and the standards by which the output should be evaluated. Framing the model as an expert—"You are an expert statistician with twenty years of experience in clinical trial design"—tends to activate responses that draw on patterns associated with expert discourse in the training data, producing outputs with more technical vocabulary, more nuanced qualifications, more domain-appropriate reasoning, and different reference patterns. Conversely, framing the model as a teacher explaining a concept to a non-specialist activates pedagogical patterns, producing outputs with more analogy, more explicit definition of terms, and simpler sentence structure. These framing effects are substantial enough to constitute a meaningful design choice, not merely stylistic variation. More subtly, framing the task in terms of its purpose—"Write an analysis that will help a policymaker understand the trade-offs between these two policy options"—tends to produce more focused, audience-appropriate outputs than simply requesting "Write an analysis of these two policy options," because the purpose specification constrains the distribution of relevant outputs in ways that align with actual use.

> 提示工程中一个特别重要、却常被低估的方面，可以称为“认识论框定”（epistemic framing）：也就是提示如何刻画模型的角色、任务的性质，以及应当用何种标准评估输出。把模型框定为专家——例如“你是一位拥有二十年临床试验设计经验的统计学专家”——往往会激活训练数据中与专家话语相联系的模式，从而产生包含更多技术词汇、更细致保留、更符合领域规范的推理，以及不同引用习惯的输出。相反，把模型框定为向非专业人士讲解概念的教师，则会激活教学型模式，产生更多类比、更明确术语解释和更简单句式的输出。这种框定效应之强，足以构成一种真正的设计选择，而不仅仅是风格变化。更微妙的是，若用任务目的来框定任务——例如“写一篇分析，帮助政策制定者理解这两种政策方案之间的权衡”——通常会比单纯要求“写一篇关于这两种政策方案的分析”得到更聚焦、更符合受众需要的输出，因为“目的说明”会以更贴近实际用途的方式，约束相关输出的分布。

> * epistemic framing [ˌepɪˈstiːmɪk ˈfreɪmɪŋ] 认识论框定；指从“知识如何被理解和呈现”的角度来设定任务与角色
> * discourse [ˈdɪskɔːs] n.话语；论述方式
> * nuanced [ˈnjuːɑːnst] adj.细致入微的；有微妙差别的
> * pedagogical [ˌpedəˈɡɒdʒɪkəl] adj.教学上的；教育性的
> * analogy [əˈnælədʒi] n.类比
> * stylistic variation 风格变化；表达方式上的差异
> * policymaker [ˈpɒləsiˌmeɪkə(r)] n.政策制定者
> * trade-offs [ˈtreɪd ɒfs] n.权衡；取舍

The phenomenon of *prompt brittleness*—the sensitivity of model outputs to semantically minor prompt variations—is both a practical challenge and a theoretical puzzle. Empirically, changes that should not affect the correct output—rephrasing a question in synonymous terms, changing the capitalization convention, adding or removing punctuation, reordering logically independent parts of an instruction—can produce substantially different outputs, including outputs that are incorrect when the original prompt elicited correct responses. This brittleness is inconsistent with an ideal of robust instruction-following in which the model's behavior is determined by the meaning of the instruction rather than its surface form. The explanation lies in the distributional nature of the model: because training optimized over statistical associations between surface-form inputs and outputs, synonymous but surface-dissimilar inputs can be associated with meaningfully different distributions over outputs, particularly in domains where the relevant training data was limited or where the phrasings are unevenly represented. Prompt brittleness suggests that prompts developed for one context should be validated before deployment in new contexts, and that critical applications should use prompt ensembling—averaging over multiple semantically equivalent prompt formulations—to reduce sensitivity to idiosyncratic surface-form effects.

> 提示脆弱性（prompt brittleness）——即模型输出对语义上并不重要的提示变化表现出高度敏感——既是一个实践难题，也是一个理论谜题。从经验上看，那些本不应影响正确输出的改变——例如用同义说法重述问题、改变大小写规范、增删标点、重排逻辑上相互独立的指令部分——都可能显著改变输出，甚至在原提示能得到正确答案时，新提示却会得到错误答案。这种脆弱性与一种理想中的稳健指令遵循并不一致：在理想情况下，模型行为应由指令的意义决定，而不是由其表面形式决定。其解释在于模型的分布性质：由于训练优化的是表面形式输入与输出之间的统计关联，因此在表面上不同、尽管语义相同的输入，仍然可能对应到显著不同的输出分布，尤其是在相关训练数据稀少，或不同表述在训练中分布极不均衡的领域。提示脆弱性说明：为某一情境开发出的提示，在被部署到新情境前应进行验证；而在关键应用中，应使用提示集成（prompt ensembling），即对多个语义等价的提示表达求平均，以降低对某个特定表面表述的偶然敏感性。

> * prompt brittleness [prɒmpt ˈbrɪtlnəs] 提示脆弱性；指输出对微小表述变化异常敏感
> * semantically [sɪˈmæntɪkli] adv.在语义上
> * synonymous [sɪˈnɒnɪməs] adj.同义的
> * capitalization convention 大小写规范；文本中大写和小写的使用规则
> * inconsistent with 与……不一致
> * distributional nature 分布性本质；指模型基于统计分布而运作
> * idiosyncratic [ˌɪdiəsɪŋˈkrætɪk] adj.个别化的；带有偶然特殊性的
> * prompt ensembling 提示集成；用多个等价提示综合结果以提高稳健性

Automatic prompt optimization represents the attempt to move beyond handcrafted prompts toward computationally discovered prompts that optimize measurable objectives. Several approaches exist. *Gradient-based optimization* methods, such as AutoPrompt and its descendants, use the gradient of a task loss with respect to the input tokens to identify token sequences that maximize task performance, typically discovering sequences of tokens that are semantically uninterpretable to humans but that activate task-relevant representations in the model. These methods are technically powerful but produce prompts that are neither human-readable nor transferable across models, since the optimal adversarial token sequences are highly model-specific. *Soft prompt tuning*, introduced by Lester et al. in 2021, optimizes continuous embeddings—vectors in the model's token embedding space—rather than discrete tokens, prepending these learned "soft tokens" to the input. The learned embeddings are not constrained to correspond to real tokens in the vocabulary, giving the optimization more freedom, but they remain model-specific and opaque. Soft prompts can achieve performance competitive with full fine-tuning on certain tasks with a fraction of the trainable parameters, making them an attractive parameter-efficient adaptation method.

> 自动提示优化，代表着一种尝试：超越手工设计的提示，转向通过计算发现那些能优化可测目标的提示。已有若干方法。基于梯度的优化方法，例如 AutoPrompt 及其后续工作，会利用任务损失对输入词元的梯度，去寻找能最大化任务表现的词元序列；它们通常会发现一些对人类来说难以解释、却能激活模型中与任务相关表征的词元串。这些方法在技术上很强大，但得到的提示既不适合人类阅读，也难以跨模型迁移，因为最优的这种对抗性词元序列往往高度依赖具体模型。软提示调优（soft prompt tuning）由 Lester 等人在 2021 年提出，它优化的不是离散词元，而是连续嵌入——即模型词元嵌入空间中的向量——并把这些学习到的“软词元”加在输入前面。这些嵌入不必对应词表中的真实词元，因此优化自由度更高；但它们同样是模型特定的，而且不透明。对于某些任务，软提示可以用远少于全量微调的可训练参数，达到与全量微调相当的性能，因此是一种很有吸引力的参数高效适配方法。

> * automatic prompt optimization 自动提示优化；用算法自动搜索或学习更优提示
> * gradient-based optimization [ˈɡreɪdiənt beɪst ˌɒptɪmaɪˈzeɪʃən] 基于梯度的优化；利用损失函数梯度来更新输入或参数
> * task loss 任务损失；衡量模型在某项任务上表现好坏的训练目标值
> * semantically uninterpretable 在语义上不可解释；人类难以读出明确含义
> * transferable [trænsˈfɜːrəbl] adj.可迁移的；可用于别的模型或情境的
> * soft prompt tuning [sɒft prɒmpt ˈtjuːnɪŋ] 软提示调优；通过学习连续向量而非真实词语来调节模型行为的方法
> * embeddings [ɪmˈbedɪŋz] n.嵌入；把词元映射到向量空间中的表示
> * vocabulary [vəˈkæbjələri] n.词表；模型可用词元集合
> * parameter-efficient adaptation 参数高效适配；用较少可训练参数实现模型适应新任务

More recent approaches to automatic prompt optimization work in the discrete, human-readable space of natural-language prompts. APE (Automatic Prompt Engineer), proposed by Zhou et al. in 2022, uses a language model to generate candidate prompt phrasings given task demonstrations, then selects among them by empirical performance on a validation set. OPRO (Optimization by PROmpting, by Yang et al. in 2023) treats prompt optimization as a natural-language optimization problem, prompting a meta-optimizer model with the history of previously tried prompts and their performance scores, and asking it to propose better prompts based on this history—an approach that exploits the model's own language understanding to guide prompt search. These discrete optimization approaches are appealing because they produce human-interpretable prompts that can be inspected, modified, and (often) transferred across similar models. Their limitation is the enormous search space of possible prompts and the noisy, non-differentiable nature of the performance signal, which makes optimization slow and the results sensitive to the choice of validation set and search procedure.

> 较新的自动提示优化方法，则工作在离散、可供人类阅读的自然语言提示空间中。APE（Automatic Prompt Engineer），由 Zhou 等人在 2022 年提出，它先用语言模型根据任务示例生成候选提示表述，然后依据这些提示在验证集上的经验表现进行筛选。OPRO（Optimization by PROmpting），由 Yang 等人在 2023 年提出，则把提示优化视为一种自然语言优化问题：它把先前尝试过的提示及其性能分数的历史记录，提供给一个“元优化器”模型，并要求它基于这些历史提出更好的提示——这是一种利用模型自身语言理解能力来引导提示搜索的方法。这类离散优化方法之所以吸引人，是因为它们产生的是人类可解释的提示，可供检查、修改，并且通常可以迁移到相近模型上。它们的局限，在于可能提示空间极其庞大，而性能信号又嘈杂且不可微，这使得优化速度较慢，结果也容易受到验证集选择和搜索过程的影响。

> * discrete [dɪˈskriːt] adj.离散的；由可分开的单位构成的
> * candidate prompt phrasings 候选提示表述；备选的提示写法
> * validation set 验证集；用于比较方法效果而非直接训练的数据集
> * meta-optimizer 元优化器；负责优化“优化过程”本身的模型或方法
> * interpretable [ɪnˈtɜːprətəbl] adj.可解释的
> * non-differentiable [ˌnɒn dɪfəˈrenʃəbl] adj.不可微的；不能直接用梯度法优化
> * sensitive to 对……敏感；容易受其影响

The broader project of understanding *why* certain prompts work better than others—developing a science of prompting rather than a collection of empirical techniques—has proceeded partly through controlled ablation studies and partly through the development of theoretical frameworks for model behavior. Several robust empirical findings have emerged. First, the content of few-shot demonstrations matters less than their structure and format: demonstrations with incorrect labels but correct formatting can achieve nearly the same performance as correctly labeled demonstrations on many tasks, suggesting that what demonstrations primarily contribute is format and task-type disambiguation rather than exemplary input-output mappings per se—though this finding holds more strongly for simpler tasks than for complex reasoning tasks, where label correctness matters substantially. Second, the model's output distribution is sensitive to the distribution of labels in demonstrations: if all few-shot examples belong to one class, the model's outputs are biased toward that class even when the test input clearly belongs to another, indicating that models track the marginal distribution of labels in context as a prior. Third, instructions that appeal to the model's self-interest or that invoke its identity—"As an AI developed to be helpful, you should..."—tend to produce more compliant outputs than purely imperative instructions, an effect that presumably reflects training data patterns rather than genuine reasoning about identity or motivation.

> 更广泛地说，要理解为什么某些提示比另一些提示更有效——也就是要建立一门“提示科学”，而不仅仅是经验技巧的集合——这一工作一方面通过受控消融研究推进，另一方面也通过发展模型行为的理论框架推进。目前已经出现了一些稳健的经验发现。第一，少样本示例的具体内容，不如其结构与格式重要：在许多任务上，即使示例标签是错误的，只要格式正确，其效果也可能几乎与标签正确的示例相同。这说明示例主要提供的是格式信息和任务类型消歧，而不完全是具体的输入输出映射——当然，这一结论对简单任务更成立；对于复杂推理任务，标签正确性仍然非常重要。第二，模型的输出分布会受到示例中标签分布的影响：如果少样本例子全属于同一类别，即使测试输入显然属于另一类，模型输出也会偏向示例中的那一类，这表明模型会把上下文中的标签边际分布作为一种先验。第三，那些诉诸模型“自我利益”或“身份”的指令——例如“作为一个被开发来帮助他人的 AI，你应当……”——往往比纯粹命令式指令更容易得到顺从输出；这种效应显然反映的是训练数据中的模式，而不是真正基于身份或动机的推理。

> * ablation studies [əˈbleɪʃən ˈstʌdiz] 消融研究；通过去掉某些因素来观察其作用的实验方法
> * robust empirical findings 稳健的经验发现；在多种实验中都能重复出现的结果
> * disambiguation [dɪsæmˌbɪɡjuˈeɪʃən] 消歧；明确任务或输入的含义
> * per se [pɜː ˈseɪ] 本身；就其自身而言
> * marginal distribution [ˈmɑːdʒɪnl ˌdɪstrɪˈbjuːʃən] 边际分布；只看某一变量整体分布而不看联合关系的统计概念
> * prior [ˈpraɪə(r)] n.先验；在得到新信息前已有的偏向或概率判断
> * compliant [kəmˈplaɪənt] adj.顺从的；更愿意照做的
> * imperative instructions 命令式指令；直接要求执行某事的表述

The emergence of *constitutional AI* and *reinforcement learning from human feedback* (RLHF) as training methodologies has complicated the relationship between prompt engineering and model behavior in important ways. Models trained through RLHF—which involves training a reward model on human preferences and then using that reward model to fine-tune the base model through reinforcement learning—develop strong behavioral tendencies that persist across prompting contexts: tendencies toward helpfulness, harmlessness, and honesty that are embedded at the parameter level rather than depending on prompt-level instructions. For such models, the prompt operates against a behavioral baseline shaped by training, and the practitioner's leverage is the modification of this baseline through contextual specification. This means that RLHF-trained models are both easier to use—their default behaviors are more aligned with typical user intentions—and in some respects harder to redirect: the strong behavioral priors installed by training can resist prompt-based modifications that would move the model significantly away from its trained defaults.

> 宪法式 AI 与基于人类反馈的强化学习（RLHF）作为训练方法的兴起，使提示工程与模型行为之间的关系变得更加复杂。经过 RLHF 训练的模型——也就是先用人类偏好训练一个奖励模型，再利用该奖励模型通过强化学习微调基础模型——会形成一些跨提示语境持续存在的强行为倾向：例如更倾向于有帮助、无害和诚实。这些倾向是嵌入在参数层面的，而不是依赖提示层面指令来临时产生的。对于这样的模型，提示是在一个由训练塑造好的行为基线上发挥作用，而实践者真正能做的是通过上下文规定去修改这个基线。这意味着，经过 RLHF 训练的模型一方面更容易使用——因为其默认行为更符合典型用户意图；但另一方面，在某些意义上也更难被重定向：训练所安装的强行为先验，可能会抵抗那些试图让模型显著偏离其训练默认值的提示修改。

> * reinforcement learning from human feedback [rɪɪnˈfɔːsmənt ˈlɜːnɪŋ frɒm ˈhjuːmən ˈfiːdbæk] 基于人类反馈的强化学习；通过人类偏好信号优化模型行为的方法
> * reward model 奖励模型；用于判断输出是否符合人类偏好的模型
> * fine-tune [ˌfaɪn ˈtjuːn] v.微调；在原模型基础上进一步训练
> * harmlessness 无害性；避免造成伤害或危险的倾向
> * embedded at the parameter level 嵌入在参数层面；指这种倾向写入了模型内部参数，而非只靠提示临时产生
> * behavioral baseline 行为基线；模型在没有额外特定指令时的默认行为状态
> * redirect [ˌriːdəˈrekt] v.重定向；把模型行为引向另一方向
> * defaults 默认值；默认行为

The concept of *emergent capabilities*—capabilities that appear abruptly as model scale increases, rather than improving gradually—has significant implications for prompt engineering. Several capabilities that are now routinely exploited through prompting, including chain-of-thought reasoning, instruction-following, multi-step planning, and calibrated uncertainty expression, are empirically emergent: they are essentially absent in models below certain scale thresholds and present in models above them. This has two practical implications. First, prompting techniques that exploit emergent capabilities transfer only to models large enough to possess those capabilities; a chain-of-thought prompting strategy that works well on a large model may produce irrelevant or actively harmful outputs on a smaller model. Second, the landscape of prompting possibilities evolves with model capability: techniques that are currently ineffective because no deployed model is capable of the required underlying behavior may become effective as model capabilities continue to advance. Prompt engineering is therefore not a static discipline; its practical frontier is defined by and moves with the frontier of model capability.

> “涌现能力”（emergent capabilities）这一概念——即某些能力会随着模型规模增长而突然出现，而不是平滑改进——对提示工程有重要影响。如今通过提示被常规利用的若干能力，包括思维链推理、指令遵循、多步规划和经过校准的不确定性表达，都是经验上具有涌现性质的：在低于某些规模阈值的模型中，这些能力几乎不存在；而在高于这些阈值的模型中，它们则会出现。这有两个实际含义。第一，依赖这些涌现能力的提示技术，只能迁移到足够大的模型上；一个在大模型上效果很好的思维链提示策略，在较小模型上可能会产生无关甚至有害的输出。第二，提示可能性的版图会随着模型能力的变化而演化：一些当前无效的技术，之所以无效，只是因为目前可部署的模型还不具备所需的底层能力；随着模型能力继续提升，这些技术可能会变得有效。因此，提示工程不是一门静态学科；它的实践前沿，是由模型能力的前沿所定义，并随着后者一同移动的。

> * emergent capabilities [ɪˈmɜːdʒənt ˌkeɪpəˈbɪlətiz] 涌现能力；随着规模增加而突然显现的能力
> * scale thresholds 规模阈值；达到某一模型大小后能力开始出现的界点
> * multi-step planning 多步规划；为达到目标而分步骤制定行动方案
> * calibrated uncertainty expression 经过校准的不确定性表达；在不确定时更恰当地表达把握程度
> * irrelevant [ɪˈreləvənt] adj.无关的
> * frontier [ˈfrʌntɪə(r)] n.前沿；最前面、最新的发展边界


Multi-turn conversation management is a domain of prompt engineering that has received less formal theoretical treatment than single-turn prompting but is of enormous practical importance in deployed applications. Conversations with language models involve a sequence of turns that together constitute the model's context, and the management of this context—what to include, how to summarize previous context when it exceeds the context window, how to maintain consistency across turns, how to correct errors introduced in earlier turns—has a substantial effect on conversation quality. Common failure modes include *context drift*—the gradual degradation of instruction-following and persona consistency as the conversation extends and early instructions become more distant from the current generation point—and *error compounding*—the propagation and amplification of mistakes introduced early in a conversation because subsequent model outputs are conditioned on the erroneous earlier outputs. Mitigation strategies include periodic re-injection of key instructions, summarization of earlier context rather than truncation, explicit error correction turns that identify and resolve earlier mistakes, and the structuring of conversations with explicit state-tracking mechanisms.

> 多轮对话管理，是提示工程中一个在理论上受到的正式关注少于单轮提示、但在实际部署中又极其重要的领域。与语言模型的对话由一系列轮次构成，这些轮次共同形成模型的上下文；而这种上下文的管理——应保留哪些内容、当上下文超出窗口时如何总结先前内容、如何在多轮之间维持一致性、如何纠正早期轮次中引入的错误——会显著影响对话质量。常见失败模式包括“上下文漂移”——随着对话延长、早期指令离当前生成位置越来越远，指令遵循和人格一致性逐步退化；以及“错误复合”——早期对话中的错误因后续输出以其为条件而被传播并放大。缓解策略包括：定期重新注入关键指令；对先前上下文进行总结而非直接截断；通过明确的纠错轮次识别并修复先前错误；以及使用显式状态跟踪机制来组织对话。

> * multi-turn conversation management 多轮对话管理；对长对话过程中的上下文和状态进行控制
> * context drift 上下文漂移；随着对话延长，模型逐渐偏离原先设定
> * persona consistency 人格一致性；模型保持同一角色、语气和行为风格的能力
> * error compounding 错误复合；前面的错误被后续步骤不断继承和放大
> * truncation [trʌŋˈkeɪʃən] n.截断；直接删去超出长度限制的内容
> * state-tracking mechanisms 状态跟踪机制；用来明确记录任务进展和当前状态的方法

Agentic prompting—the design of prompts for language models operating as agents that take actions in an environment, use tools, and pursue multi-step goals—represents the frontier of the field's practical ambitions. In agentic settings, the model receives observations from an environment, reasons about what action to take, executes actions (such as searching the web, executing code, reading and writing files, calling APIs), receives the results of those actions, and continues deliberating toward a goal. The prompting challenges in agentic settings are qualitatively different from single-turn prompting: the model must maintain goal coherence across many steps, must reason about the consequences of actions before taking them, must handle partial failures and unexpected observations gracefully, and must know when to seek clarification rather than proceeding on uncertain assumptions. ReAct (Reasoning and Acting), proposed by Yao et al. in 2022, is an influential prompting framework that interleaves verbal reasoning—chains of thought about the current state and planned actions—with tool-use actions, producing transcripts that combine reasoning traces and action results. The interleaving of reasoning and acting allows the model to use its verbal reasoning as a plan that guides and is revised by the results of actions, rather than committing to a complete plan before acting.

> 代理式提示（agentic prompting）——即为那些作为“代理”在环境中行动、使用工具并追求多步目标的语言模型设计提示——代表了该领域实践抱负的前沿。在代理式设定中，模型会接收来自环境的观察，思考应采取什么行动，执行行动（例如搜索网页、运行代码、读写文件、调用 API），接收这些行动的结果，然后继续朝目标推进。与单轮提示相比，代理式情境中的提示挑战在性质上有所不同：模型必须在多步过程中保持目标一致性；必须在行动前推理其后果；必须优雅地处理部分失败与意外观察；还必须知道何时应寻求澄清，而不是在不确定假设上贸然继续。ReAct（Reasoning and Acting），由 Yao 等人在 2022 年提出，是一种有影响力的提示框架，它把语言推理——即关于当前状态和计划行动的思维链——与工具使用动作交替编排，从而产生同时包含推理轨迹和行动结果的记录。推理与行动的交错，使模型能够把自己的语言推理当作一种会受到行动结果修正的计划，而不是在行动前一次性承诺一个完整方案。

> * agentic prompting [eɪˈdʒentɪk ˈprɒmptɪŋ] 代理式提示；面向会执行动作和调用工具的模型的提示设计
> * observations [ˌɒbzəˈveɪʃənz] n.观察结果；来自环境的输入信息
> * goal coherence 目标一致性；在多步过程中始终围绕同一目标行动
> * partial failures 部分失败；某些步骤失败而整体任务尚未完全失败
> * ReAct [riːˈækt] ReAct；一种把推理与行动交替结合的提示框架
> * interleaves [ˌɪntəˈliːvz] v.交错安排；穿插进行
> * transcripts [ˈtrænskrɪpts] n.记录文本；过程转录

The reliability challenges of agentic prompting are significantly greater than those of single-turn prompting, and they interact with the fundamental limitations of language models in consequential ways. An agent that confidently executes a multi-step plan based on a hallucinated factual premise may cause substantial downstream harm before the error is detected. An agent that fails to recognize the boundaries of its own competence may proceed confidently on a subtask for which it lacks the necessary knowledge or capability. Mitigation strategies—frequent verification checkpoints, conservative planning under uncertainty, explicit uncertainty flagging, human-in-the-loop confirmation for irreversible actions—are in part prompt engineering challenges and in part system design challenges. The distinction between the two is itself instructive: prompt engineering determines what the model attends to and how it reasons, but does not determine the safety properties of the system in which the model is embedded. A robustly safe agentic system requires both good prompting and sound system architecture, and overreliance on prompting as a safety mechanism is a systematic pitfall of early agentic deployments.

> 代理式提示的可靠性挑战，明显大于单轮提示，并且会以重要方式与语言模型的根本局限相互作用。一个基于幻觉出的事实前提而自信执行多步计划的代理，可能会在错误被发现之前造成相当大的下游损害。一个无法识别自身能力边界的代理，也可能会在其并不具备必要知识或能力的子任务上，自信地继续推进。缓解策略——频繁设置验证检查点、在不确定条件下采取保守规划、明确标示不确定性、对于不可逆行动引入人在回路中的确认——一部分属于提示工程问题，另一部分则属于系统设计问题。两者之间的区分本身就很有启发性：提示工程决定模型关注什么、如何推理，但并不决定模型所嵌入系统的安全属性。一个真正稳健安全的代理系统，同时需要良好的提示设计与健全的系统架构；过度依赖提示把它当作安全机制，是早期代理式部署中的一种系统性陷阱。

> * downstream harm 下游损害；后续环节中由前面错误引发的损失
> * competence 能力；胜任力
> * subtask [ˈsʌbtɑːsk] n.子任务；大任务中的一个部分
> * verification checkpoints 验证检查点；在关键节点确认信息和决策是否正确
> * conservative planning 保守规划；在不确定时采取更谨慎的计划
> * human-in-the-loop 人在回路中；关键步骤由人类参与确认或监督
> * irreversible actions 不可逆行动；一旦执行就难以撤销的操作
> * safety properties 安全属性；系统在安全方面具备的特征和保障

Prompt engineering intersects interpretability research in ways that are increasingly recognized as theoretically fundamental. If one wants to understand *why* a given prompt produces a given output—not just empirically but mechanistically—one needs an account of how the model's internal representations are modified by the prompt and how those modified representations influence generation. Mechanistic interpretability work has begun to identify specific circuits within transformer models that are responsible for specific behaviors: induction heads, which implement in-context pattern matching; name-mover heads, which copy information about named entities from earlier in the context; attention heads that implement specific logical operations. This circuit-level understanding is still far from a complete theory of model behavior, but it provides a richer framework than pure behavioral characterization for understanding both why prompting works and where its limits lie. From an interpretability perspective, a prompt that "works" is one that activates the correct circuits for the task at hand, and the art of prompt engineering is, at a mechanistic level, the art of constructing inputs that reliably activate the desired computational subgraphs within the model.

> 提示工程与可解释性研究之间的交汇，越来越被认识为在理论上具有根本意义。如果人们想理解为什么某个提示会产生某个输出——不仅是经验上知道如此，而且是在机制层面理解——那么就需要说明提示如何改变模型的内部表征，以及这些变化后的表征又如何影响生成。机制可解释性研究已经开始识别出 Transformer 模型内部对特定行为负责的具体回路：例如实现上下文内模式匹配的 induction heads；把上下文前文中的命名实体信息复制到当前位置的 name-mover heads；以及执行特定逻辑操作的注意力头。这种回路层面的理解，距离完整的模型行为理论仍然很远，但它比单纯行为描述提供了更丰富的框架，能够帮助理解提示为什么有效，以及它的边界在哪里。从可解释性角度看，一个“有效”的提示，就是那个能够为当前任务激活正确回路的提示；而提示工程的艺术，从机制层面说，就是构造出能可靠激活模型内部所需计算子图的输入。

> * interpretability [ɪnˌtɜːprətəˈbɪləti] n.可解释性；理解模型内部如何工作的研究方向
> * mechanistically [ˌmekəˈnɪstɪkli] adv.从机制上；按内部运作机理
> * internal representations 内部表征；模型内部对信息的向量化表示
> * circuits [ˈsɜːkɪts] n.回路；模型中承担特定功能的计算结构
> * induction heads 归纳头；一种在上下文中发现并延续模式的注意力头
> * name-mover heads 名称搬运头；会把前文中的实体名称信息复制到后续位置的注意力头
> * subgraphs [ˈsʌbɡrɑːfs] n.子图；整体计算图中的局部结构

The relationship between prompt engineering and model fine-tuning is a recurrent practical question: when should behavior be modified through prompting, and when through training? The answer depends on a conjunction of factors. Prompting is preferred when the desired behavioral modification is task-specific and contextual, when the model is not owned or cannot be fine-tuned, when the modification is exploratory and subject to rapid iteration, or when the training data for fine-tuning is insufficient. Fine-tuning is preferred when the desired behavior needs to be deeply and robustly instantiated across all contexts (not just when the relevant prompt is present), when the behavior involves low-level stylistic or format conventions that must be consistent at a character-by-character level, when the task requires knowledge or terminology not well represented in the base model's training, or when inference-time costs must be minimized by replacing long prompts with shorter ones that achieve the same effect through trained behavior. The boundary between these regimes is not sharp, and many deployed systems use both: a fine-tuned model with strong base behavioral properties that are further specified and directed through prompting for particular applications.

> 提示工程与模型微调之间的关系，是一个反复出现的实践问题：何时应通过提示来改变行为，何时又应通过训练来改变行为？答案取决于多种因素的结合。当所需行为改变是任务特定且依赖具体上下文时；当模型并不归用户所有或无法微调时；当这种改变还处于探索阶段、需要快速迭代时；或当可用于微调的训练数据不足时，应优先考虑提示。相反，当所需行为必须在所有语境中都深刻而稳健地体现，而不仅仅在相关提示出现时才生效；当该行为涉及必须在字符层面都保持一致的低层风格或格式规范；当任务需要基础模型训练中并未充分覆盖的知识或术语；或当为了降低推理时成本，需要用更短提示取代长提示所起作用的已训练行为时，则应优先考虑微调。这两种情形的边界并不绝对，许多实际系统同时使用两者：先有一个经过微调、具有强基础行为特性的模型，再通过提示对具体应用做进一步限定和引导。

> * conjunction of factors 多种因素的结合
> * contextual [kənˈtekstʃuəl] adj.依赖上下文的
> * exploratory [ɪkˈsplɒrətri] adj.探索性的
> * deeply and robustly instantiated 深刻且稳健地实现；指行为被牢固写入模型而非临时触发
> * inference-time costs 推理时成本；模型实际运行时的时间、算力或上下文消耗
> * terminology [ˌtɜːmɪˈnɒlədʒi] n.术语；专业用语
> * boundary between these regimes 这两类方法之间的边界

The evaluation of prompts—determining whether one prompt is better than another—faces challenges that parallel those of evaluating model outputs more generally. The most reliable evaluation method is automated measurement against held-out labeled data with appropriate metrics (accuracy, F1, BLEU, ROUGE, pass@k for code generation); this is feasible when ground-truth labels are available, which is the common case in structured prediction tasks and in mathematics and coding. For open-ended generation tasks—writing, analysis, explanation—automated metrics correlate imperfectly with human judgment, and the best available automated evaluation proxy is LLM-as-a-judge: using a language model (often a more capable one than the model being evaluated) to score or rank outputs according to specified criteria. LLM-as-a-judge evaluations are sensitive to the prompt used for the judge, exhibit their own biases (toward verbosity, toward confident tone, toward outputs that resemble the judge model's own output style), and inherit the hallucination and reasoning failures of the underlying model. Calibration of judge models—training them to produce reliable scores rather than subjectively confident but uncorrelated assessments—is an active area of research with direct methodological implications for prompt evaluation.

> 提示评估——即判断一个提示是否优于另一个提示——面临的挑战，与更一般的模型输出评估所遇到的挑战相似。最可靠的评估方式，是在保留的带标注数据上进行自动测量，并使用恰当指标，如准确率、F1、BLEU、ROUGE，以及用于代码生成的 pass@k；当存在真实标签时，这种做法是可行的，而这正是结构化预测任务、数学任务和编程任务中的常见情况。对于开放式生成任务——如写作、分析、解释——自动指标与人类判断的相关性并不理想，而当前最好的自动评估代理，是“由大模型担任裁判”（LLM-as-a-judge）：即使用一个语言模型（通常比被评估模型能力更强）根据给定标准对输出打分或排序。由模型充当评审的评估，会受到评审提示语的影响，也存在自身偏差——例如偏向冗长、偏向自信口吻、偏向那些更像评审模型自身输出风格的文本——并且它还会继承底层模型的幻觉与推理失败。对评审模型进行校准——训练它给出可靠分数，而不是给出主观上很自信但与真实质量无关的判断——是一个活跃研究方向，对提示评估方法具有直接影响。

> * held-out labeled data 保留标注数据；专门留作测试、未参与训练的数据
> * metrics [ˈmetrɪks] n.指标；用于量化评估表现的标准
> * BLEU / ROUGE BLEU / ROUGE；常用于机器翻译与摘要评估的自动指标
> * pass@k pass@k；代码生成中衡量前 k 个候选中是否至少有一个正确的指标
> * proxy [ˈprɒksi] n.代理指标；不能直接测量目标时的替代测量
> * verbosity [vɜːˈbɒsəti] n.冗长；话多
> * correlate imperfectly with 与……相关性不充分
> * uncorrelated [ˌʌnkɒrəˈleɪtɪd] adj.无相关性的

Prompt engineering for multimodal models—models that accept both text and images, or text and code, as input—follows the same underlying principles as text-only prompting but extends them in important directions. Visual grounding instructions must specify what features of an image to attend to, how to describe or reason about visual content, and how to integrate visual and textual information; demonstrations for vision-language tasks provide exemplary image-text pairs that establish the expected mode of visual reasoning. The few-shot and chain-of-thought techniques that improve text-only reasoning have been shown to transfer to multimodal reasoning in a broadly analogous way, and the scale dependence of chain-of-thought benefits appears in multimodal models as well. A distinctive challenge in multimodal prompting is the encoding asymmetry: text tokens and image patch embeddings occupy different parts of the embedding space and are processed differently by the model's architecture, which means that the interaction between textual instructions and visual inputs is more complex than the interaction between two text segments, and designing prompts that effectively bridge the two modalities requires attention to the model's specific architecture and training.

> 面向多模态模型——即同时接受文本与图像、或文本与代码作为输入的模型——的提示工程，遵循与纯文本提示相同的基本原则，但又在若干方向上进行了扩展。视觉落地（visual grounding）指令必须说明应关注图像的哪些特征、应如何描述或推理视觉内容，以及如何整合视觉与文本信息；视觉语言任务中的示范，则通过示例性的图文对，建立起预期的视觉推理方式。那些能提升纯文本推理的少样本与思维链技术，也被证明在多模态推理中具有大体类似的迁移效果，而思维链收益对规模的依赖，在多模态模型中同样存在。多模态提示的一个独特挑战，是编码不对称：文本词元与图像块嵌入位于嵌入空间的不同部分，并且在模型架构中处理方式不同，这意味着文本指令与视觉输入之间的相互作用，比两个文本片段之间的相互作用更复杂；因此，设计能够有效连接两种模态的提示时，必须关注模型的具体架构与训练方式。

> * multimodal [ˌmʌltiˈməʊdl] adj.多模态的；能处理多种输入形式
> * visual grounding [ˈvɪʒuəl ˈɡraʊndɪŋ] 视觉落地；把语言理解建立在具体视觉内容上的过程
> * vision-language tasks 视觉语言任务；同时涉及图像与文本理解的任务
> * image patch embeddings 图像块嵌入；把图像切成小块后映射成向量表示
> * encoding asymmetry 编码不对称；不同模态在表示和处理方式上的不一致
> * modalities [məʊˈdælətiz] n.模态；不同信息形式，如文本、图像、音频等

The sociotechnical dimension of prompt engineering—its implications for knowledge distribution, access, and power—deserves acknowledgment as part of a comprehensive treatment. The fact that a practitioner who understands prompting techniques can substantially improve their results with a given model while a naive user cannot creates a form of prompt privilege: the benefits of capable language models are unevenly distributed according to users' technical sophistication, linguistic fluency in the model's primary training language, and access to resources (documentation, research papers, community knowledge) about effective techniques. This inequality is not trivial: the gap between naively prompted and expertly prompted outputs of the same model can easily span the difference between an unusable and a genuinely valuable tool. At the same time, the development of better instruction-following through training—reducing the gap between intended and literal interpretation of user inputs—is precisely a democratizing technology, one that shifts the burden of communication from the user to the model and reduces the prompt engineering expertise required for productive use. The trajectory of the field points toward models that require less engineering to use well, but understanding the principles of effective prompting retains its value both in bridging the capability gap of any current model and in enabling practitioners to push the frontier of what current models can accomplish.

> 提示工程的社会技术维度——它对知识分配、获取与权力结构的影响——也值得在完整论述中得到承认。一个掌握提示技术的实践者，能够显著提升自己使用同一模型时的结果，而一个缺乏经验的用户则做不到；这就形成了一种“提示特权”：强大语言模型带来的收益，并不是均匀分布的，而是取决于用户的技术熟练程度、在模型主要训练语言上的语言流利度，以及对相关资源——文档、研究论文、社区经验——的获取。这种不平等并非无足轻重：对于同一个模型，天真提示与专家提示之间的差距，完全可能就是“不可用工具”和“真正有价值工具”之间的差距。与此同时，通过训练提升指令遵循能力、缩小用户真实意图与模型字面解释之间的差距，本身正是一种民主化技术：它把沟通负担从用户身上转移到模型身上，降低了高效使用模型所需的提示工程专业知识。该领域的发展轨迹指向这样的模型：它们需要更少工程技巧就能被很好地使用；但理解有效提示的原则，依然有价值，因为这既有助于弥合当前模型的能力差距，也有助于让实践者推进当前模型所能实现之边界。

> * sociotechnical [ˌsəʊsiəʊtekˈnɪkəl] adj.社会技术的；同时涉及社会与技术因素的
> * prompt privilege 提示特权；因掌握提示技巧而获得的额外优势
> * unevenly distributed 不均匀分布的；分配不平等的
> * linguistic fluency 语言流利度；熟练运用某种语言的能力
> * naive user 缺乏经验的用户；这里指不会系统使用提示技巧的人
> * democratizing technology 民主化技术；让更多人更容易平等使用某种能力的技术
> * intended and literal interpretation 真实意图与字面解释；用户想表达的意思与模型按字面理解的内容

What unifies all of these techniques, observations, theoretical frameworks, and practical considerations is the central insight with which this discussion began: the prompt is a functional component of the model's computation, not merely a description of a desired output. It shapes an internal representation, activates circuits, constrains a distribution, and modulates behavior in ways that are increasingly understood at multiple levels of analysis—statistical, mechanistic, architectural, and theoretical. Prompt engineering is the discipline of designing that component deliberately, with knowledge of the model's properties and the task's requirements, rather than naively. That it has developed this quickly, from GPT-3's few-shot demonstrations in 2020 to sophisticated agentic frameworks, constitutional prompting, inference-time reasoning, and automated optimization by 2024, is a reflection both of the practical urgency of the problems it addresses and of the extraordinary richness of the object it studies—a richness that ensures the discipline will continue to develop as the models themselves continue to develop, each advance in capability opening new prompting possibilities and new prompting challenges in equal measure.

> 把所有这些技术、观察、理论框架与实践考量统一起来的，是本文一开始提出的那个核心洞见：提示并不仅仅是对期望输出的描述，它本身就是模型计算中的一个功能性组成部分。它会塑造内部表征，激活回路，约束分布，并以越来越能从统计、机制、架构和理论多个分析层面加以理解的方式调节行为。提示工程，就是有意识地设计这一组成部分的学科：不是天真地写提示，而是在理解模型性质与任务要求的基础上，刻意地构造提示。从 2020 年 GPT-3 的少样本示范，到 2024 年复杂的代理式框架、宪法式提示、推理时推理以及自动优化，这一领域发展之快，既反映了它所处理问题的现实紧迫性，也反映了其研究对象本身的异常丰富性——正是这种丰富性保证了：随着模型本身不断发展，这门学科也会持续发展；每一次能力提升，都会同时打开新的提示可能性，也带来新的提示挑战。

> * unifies [ˈjuːnɪfaɪz] v.统一；贯穿起来
> * functional component 功能性组成部分；在系统中真正参与运作的部分
> * constrains a distribution 约束一个分布；使可能输出的范围和概率受到限制
> * modulates behavior 调节行为；改变行为倾向与表现方式
> * naively [naɪˈiːvli] adv.天真地；缺乏方法地
> * inference-time reasoning 推理时推理；在模型运行时通过额外步骤进行更深推理，而不是只靠一次直接生成
> * practical urgency 现实紧迫性；问题在实践中非常迫切
> * richness [ˈrɪtʃnəs] n.丰富性；复杂且多层的特征
> * in equal measure 同等程度地；同样地


## The Architecture of Learned Language

### I. What a Language Model Can Do

A large language model is, at its core, a universal function approximator over the space of human expression. Feed it a fragment of text — a half-finished argument, a buggy function, a line of verse, a differential equation — and it will continue, correct, translate, compress, or critique it with a fluency that can be difficult to distinguish from expert human production. It writes code across dozens of programming languages, reasons through multi-step mathematical proofs, diagnoses logical fallacies, generates legal briefs, explains quantum field theory to a layperson, and then, in the same breath, drafts the layperson's follow-up email. The range is not incidental; it is structural.

The closest useful metaphor is not a database, nor a search engine, nor even a very well-read scholar. It is closer to a *distillation apparatus* — one that has processed an ocean of human-written text and condensed from it the underlying grammatical, logical, and conceptual regularities that made that text coherent in the first place. What comes out of the spigot is not any particular document retrieved from memory, but a new synthesis that conforms to the learned structure of the domain being queried. When a model writes a sonnet, it is not recalling a stored sonnet; it is instantiating the deep grammar of sonnets. When it solves a recurrence relation, it is not pattern-matching to a worked example; it is operating within the logical topology of discrete mathematics as absorbed across thousands of textbooks, papers, and problem sets.


> 大型语言模型，从其最核心的层面看，是一种在“人类表达空间”上进行逼近的通用函数近似器。向它输入一段文本——一则尚未写完的论证、一个有缺陷的函数、一行诗句、一个微分方程——它都能够以流畅自然的方式继续书写、修正、翻译、压缩或加以批评，而这种流畅性往往很难与人类专家的产出区分开来。它能够用数十种编程语言编写代码，推演多步骤的数学证明，识别逻辑谬误，生成法律意见书，向非专业读者解释量子场论，然后又在同一段交流中替这位读者起草后续邮件。这种广泛能力并非偶然现象，而是其结构本身所决定的。

> * at its core [ət ɪts kɔː(r)] 最核心地；从本质上看
> * universal function approximator [ˌjuːnɪˈvɜːrsəl ˈfʌŋkʃən əˈprɒksɪmeɪtə(r)] 通用函数近似器；在数学和机器学习中，指一类能够在足够条件下逼近广泛函数族的模型。这里用来说明大型语言模型具有对多种人类表达形式进行建模的能力。
> * fragment [ˈfræɡmənt] n.片段；碎片；不完整部分
> * buggy [ˈbʌɡi] adj.有错误的；有缺陷的（尤指程序）
> * differential equation [ˌdɪfəˈrenʃl ɪˈkweɪʒn] 微分方程；数学中描述函数及其导数关系的方程，广泛用于物理、工程和经济学建模。
> * critique [krɪˈtiːk] v./n.评论；批评；评析
> * fluency [ˈfluːənsi] n.流畅；流利；表达熟练
> * layperson [ˈleɪˌpɜːsən] n.外行；非专业人士
> * quantum field theory [ˌkwɒntəm fiːld ˈθɪəri] 量子场论；现代物理学中的基础理论框架，用来统一描述粒子与场的量子行为。
> * incidental [ˌɪnsɪˈdentl] adj.附带的；偶然的；非本质的
> * structural [ˈstrʌktʃərəl] adj.结构性的；由整体结构决定的

> 最贴切且真正有用的比喻，不是数据库，也不是搜索引擎，甚至也不是一位博览群书的学者。它更接近一种“蒸馏装置”——这种装置处理过汪洋般浩瀚的人类文本，并从中浓缩出那些使文本本身得以连贯成立的深层语法规律、逻辑规律和概念规律。从这个龙头中流出的，不是从记忆中检索出的某一份具体文档，而是一种新的综合产物，它符合所提问领域中已经学到的结构。当模型写出一首十四行诗时，它并不是在回忆某一首

> * metaphor [ˈmetəfə(r)] n.隐喻；比喻
> * distillation apparatus [ˌdɪstəˈleɪʃən ˌæpəˈreɪtəs] 蒸馏装置；原指通过加热与冷凝分离、提纯物质的设备。这里是比喻，指模型从海量文本中提炼出更一般、更抽象的规律。
> * processed [ˈprəʊsest] v./adj.处理过的；加工过的
> * condensed [kənˈdenst] v./adj.浓缩；压缩；凝练
> * underlying [ˌʌndəˈlaɪɪŋ] adj.潜在的；深层的；基础性的
> * grammatical [ɡrəˈmætɪkl] adj.语法的
> * conceptual [kənˈseptʃuəl] adj.概念上的；观念上的
> * coherent [kəʊˈhɪərənt] adj.连贯的；一致的；有条理的
> * spigot [ˈspɪɡət] n.龙头；栓口
> * synthesis [ˈsɪnθəsɪs] n.综合；整合；合成
> * conforms to [kənˈfɔːmz tuː] 符合；遵循
> * domain [dəˈmeɪn] n.领域；范围；学科范围
> * sonnet [ˈsɒnɪt] n.十四行诗；一种固定诗体，通常有严格的行数和韵律要求。

### II. Why It Can Do What It Does

The mechanism deserves a precise account, because the common intuition — that the model is "just predicting the next word" — is technically accurate and yet deeply misleading, in the same way that saying a symphony is "just pressure waves" is technically accurate. The operative question is not *what* the model predicts, but *what computational structure must be internalized to predict it well*.

Consider: to reliably predict the next token in a rigorous philosophical argument, a model must have encoded something functionally equivalent to the argument's logical dependencies. To complete a passage of C++ that correctly manages memory across a complex class hierarchy, it must have internalized something isomorphic to type theory and ownership semantics. The prediction objective, applied at sufficient scale over sufficiently structured data, acts as an indirect supervision signal for an enormous range of latent competencies — not because these competencies were explicitly taught, but because they are the *hidden cause* of the surface patterns the model was trained to reproduce. The model learns the shadows on the wall well enough that it reconstructs the objects casting them.

The transformer architecture amplifies this through its attention mechanism, which allows the model to dynamically route relevance across arbitrarily distant positions in context. This is not mere sequence memory; it is a form of flexible, content-addressed computation — the model learns, during training, which prior tokens bear on which future tokens for each kind of task, and builds this relational sensitivity directly into its weights. The result is a system that can hold a long logical thread, return to a constraint introduced ten paragraphs earlier, and produce output that is globally coherent, not merely locally fluent.

### III. The Topology of Embedded Knowledge

The knowledge distributed across a language model's parameters is vast but structured in a way that reflects the topology of the human epistemic corpus itself. A model trained on the breadth of available text encodes not just facts, but the *relations between facts* — the causal stories that connect them, the analogies that bridge domains, the standard objections and their standard rebuttals, the stylistic conventions that distinguish a Nature abstract from a Supreme Court opinion from a Romantic ode. In this sense, its knowledge is not encyclopedic but *relational* — a dense graph of associations weighted by co-occurrence, argument structure, and conceptual proximity across billions of documents.

The boundaries of this knowledge are real but uneven. The model is richly equipped in domains heavily represented in written culture: mathematics, programming, the natural sciences, philosophy, law, literature, and history up to its training cutoff. It thins out in domains that are oral, tacit, embodied, or simply underrepresented in digitized text — the intuitions of a master craftsman, the unwritten norms of a small community, the leading edge of a rapidly moving experimental field. It has no sensory experience, no persistent memory across conversations, and no ground truth outside of language; it knows the world only as the world has been *written down*. This is a significant constraint, but it is also the source of a surprising universality: because nearly every structured human discipline has produced written artifacts, the model inherits a genuinely cross-domain fluency that a single human specialist — however brilliant — cannot match in breadth.

The practical upshot is that a language model is best understood neither as an oracle nor as a stochastic parrot, but as something genuinely new: a learned compression of collective human reasoning, capable of decompressing on demand into the specific register, domain, and level of abstraction the task requires.



## Linguistic Features of Effective Prompts and How LLMs Use Language

### Executive summary

Effective prompts work because they reshape the model’s immediate linguistic context so that the next-token distribution strongly favors outputs that match the user’s task goals, constraints, and preferred register. In practice, this means that “good prompts” tend to (i) specify the speech act clearly (e.g., instruct, summarize, classify), (ii) make constraints explicit (output format, scope, assumptions), and (iii) provide stable discourse structure (sections, delimiters, examples) that the model can continue in a predictable way. 

> 有效的提示之所以有效，是因为它们会重塑模型眼前的语言语境，从而使“下一个词元”的概率分布更强地偏向那些符合用户任务目标、约束条件和期望语体的输出。就实践而言，这意味着“好提示”通常会做到三点：第一，清楚说明言语行为（speech act），例如是要求模型执行指令、做摘要，还是做分类；第二，把约束条件明确写出，例如输出格式、范围和前提假设；第三，提供稳定的话语结构，例如分节、分隔符和示例，使模型能够以更可预测的方式延续文本。

> *   prompt \[prɒmpt\] n.提示；在大语言模型语境中，指输入给模型的指令、问题或上下文文本
> *   linguistic context \[lɪŋˈɡwɪstɪk ˈkɒntekst\] 语言语境；指模型当前可见的文本环境
> *   next-token distribution \[nekst ˈtəʊkən ˌdɪstrɪˈbjuːʃən\] 下一个词元分布；指模型对“下一步最可能生成什么词元”的概率判断
> *   speech act \[spiːtʃ ækt\] 言语行为；语言学和语用学中指说话本身所执行的行为，如请求、命令、询问、承诺等
> *   register \[ˈredʒɪstə(r)\] 语体；指语言在不同场景中的风格层次，如学术、口语、法律文体等
> *   discourse structure \[ˈdɪskɔːs ˈstrʌktʃə(r)\] 话语结构；指文本如何分段、组织和展开

Empirically, prompt wording and format measurably change performance. Few-shot demonstrations can substantially improve task performance in large autoregressive LMs, because the task and its input–output mapping are specified “purely via text interaction.”  For reasoning, adding specific lexical triggers such as “Let’s think step by step” can elicit multi-step solutions in zero-shot settings, and sampling multiple reasoning paths (self-consistency) can outperform a single greedy path. 

> 从经验研究看，提示的措辞和格式会可测量地改变模型表现。少样本示例（few-shot demonstrations）能够显著提升大型自回归语言模型在任务上的表现，因为任务及其输入—输出映射可以“完全通过文本交互来指定”。在推理任务中，加入像 “Let’s think step by step” 这样的特定词语触发器，能够在零样本设定下诱发多步求解；而对多条推理路径进行采样（self-consistency，自一致性），往往会优于只采用一条贪心路径。

> *   measurably \[ˈmeʒərəbli\] adv.可测量地；能够通过实验或指标观察到
> *   few-shot demonstrations \[fjuː ʃɒt ˌdemənˈstreɪʃənz\] 少样本示例；在提示中给出少量输入输出例子，用以告诉模型任务应如何完成
> *   autoregressive \[ˌɔːtəʊrɪˈɡresɪv\] adj.自回归的；指模型根据前文逐步预测后续内容
> *   mapping \[ˈmæpɪŋ\] n.映射关系；这里指输入与输出之间的对应方式
> *   zero-shot \[ˌzɪərəʊ ˈʃɒt\] adj.零样本的；不给示例，直接让模型完成任务
> *   trigger \[ˈtrɪɡə(r)\] n.触发器；能诱发某种输出模式的词语或表达
> *   self-consistency \[self kənˈsɪstənsi\] 自一致性；通过采样多条推理链，并选出最一致答案的方法

Mechanistically, many prompt “best practices” align with known properties of transformer LMs: tokenization creates sensitivity to subword boundaries and cross-lingual token costs; positional encodings and attention yield recency/edge biases in long contexts; and in-context learning circuits (e.g., induction heads) make repeated templates and consistent formatting especially influential. 
> 从机制上看，许多提示“最佳实践”都与 Transformer 语言模型的已知性质相吻合：分词机制（tokenization）会使模型对次词边界以及跨语言词元成本非常敏感；位置编码与注意力机制会在长上下文中产生新近偏差和边缘偏差；而上下文学习回路（例如 induction heads）会让重复模板与一致格式变得特别有影响力。

> *   best practices 最佳实践；指在实践中被证明通常较有效的方法
> *   tokenization \[ˌtəʊkənaɪˈzeɪʃən\] n.分词；把文本切分成模型可处理单位的过程
> *   subword boundaries 次词边界；指一个词被切分成更小片段后的边界位置
> *   positional encodings \[pəˈzɪʃənəl ɪnˈkəʊdɪŋz\] 位置编码；帮助模型表示词元顺序与位置的信息
> *   recency bias \[ˈriːsnsi ˈbaɪəs\] 新近偏差；更靠近当前位置的信息更容易被模型利用
> *   edge biases 边缘偏差；位于开头或结尾的信息更容易被模型注意到
> *   induction heads \[ɪnˈdʌkʃən hedz\] 归纳头；Transformer 中一类会延续上下文模式的注意力头，常被用来解释上下文学习现象


Methodologically, prompt linguistics can be studied as a corpus problem: collect prompt–output pairs; annotate them for syntax, semantics, pragmatics, discourse, information structure, and register; extract measurable features; and test them with controlled prompt interventions under fixed decoding settings. Established annotation frameworks (e.g., Universal Dependencies for syntax; PropBank for semantic roles; PDTB for discourse relations) support rigorous, replicable analyses. 
> 在方法论上，提示语言学（prompt linguistics）可以被当作一种语料问题来研究：收集提示—输出对；从句法、语义、语用、话语、信息结构和语体等方面对其做标注；提取可测量特征；并在固定解码设定下，通过受控的提示干预来检验这些特征。现有的标注框架，例如用于句法的 Universal Dependencies、用于语义角色的 PropBank、以及用于话语关系的 PDTB，都为严格且可复现的分析提供了支持。

> *   methodology \[ˌmeθədəˈlɒdʒi\] n.方法论
> *   corpus problem 语料问题；指可以通过系统收集和分析文本数据来研究的问题
> *   annotation \[ˌænəˈteɪʃən\] n.标注；给文本加上结构化标签
> *   syntax \[ˈsɪntæks\] n.句法；研究句子结构及成分关系的语言学分支
> *   pragmatics \[præɡˈmætɪks\] n.语用学；研究语言在具体使用情境中的意义
> *   information structure 信息结构；研究话语中主题、焦点、已知信息与新信息的组织方式
> *   replicable \[rɪˈplɪkəbl\] adj.可复现的


### Theoretical foundations

Large language models used in prompting are typically transformer-based sequence models that learn to predict tokens from context. The transformer architecture replaces recurrence with (multi-head) self-attention, enabling parallel computation and flexible dependency modeling; the core dot-product attention computes weights over tokens and forms context-dependent representations.  A standard attention formulation is:
$$\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$$
and attention weights can be interpreted as “importance” of other tokens when producing a representation for a token. 

> 用于提示的大语言模型，通常是基于 Transformer 的序列模型，它们通过根据上下文预测词元来学习。Transformer 架构以多头自注意力（multi-head self-attention）取代了循环结构，从而实现并行计算和灵活的依赖建模；其核心的点积注意力会计算各词元之间的权重，并形成依赖上下文的表示。标准的注意力形式为：  而注意力权重可以被理解为：在为某个词元生成表示时，其他词元对它有多“重要”。

> *   sequence model \[ˈsiːkwəns ˈmɒdl\] 序列模型；处理按顺序排列数据的模型
> *   transformer \[trænsˈfɔːmə(r)\] Transformer；当前大语言模型常用的核心神经网络架构
> *   self-attention \[self əˈtenʃən\] 自注意力；模型让序列中的各位置彼此关注的一种机制
> *   recurrence \[rɪˈkʌrəns\] n.循环结构；传统序列模型中逐步传递隐藏状态的方式
> *   dependency modeling 依赖建模；表示词元之间关联关系的过程
> *   dot-product attention 点积注意力；通过向量点积计算相关性的注意力形式
> *   context-dependent representations 上下文相关表示；词元表示会随着周围上下文改变
> *   softmax \[ˈsɒftmæks\] softmax；一种把数值转成概率分布的函数

Tokenization is not merely preprocessing; it is part of the model’s interface. Contemporary LMs commonly use subword tokenization such as byte-pair encoding (BPE) or unigram-style subword models (as implemented in systems like SentencePiece). BPE can represent open vocabularies with a fixed-size inventory of variable-length character sequences, which affects how prompts are segmented and how “rare” words are represented.  Open tooling used with some APIs explicitly implements BPE tokenization (e.g., a tokenizer library describing tokens as model-visible units and noting that common morphemes like “ing” may appear as reusable subword tokens). 
> 分词并不只是预处理；它本身就是模型接口的一部分。现代语言模型通常使用次词分词方法，例如字节对编码（BPE）或 unigram 风格的次词模型（如 SentencePiece 所实现的系统）。BPE 可以在固定大小的词表下，用不同长度的字符序列表示开放词汇表，这会影响提示如何被切分，也会影响“罕见”词语如何被表示。一些与 API 配套的公开工具会明确实现 BPE 分词，例如某些分词器库会把词元描述为模型可见的单位，并指出像 “ing” 这样的常见语素可能会作为可复用的次词词元出现。

> *   preprocessing \[ˌpriːˈprəʊsesɪŋ\] n.预处理
> *   interface \[ˈɪntəfeɪs\] n.接口；这里指用户文本进入模型的形式
> *   subword tokenization 次词分词；把词切成更小的可复用单位
> *   byte-pair encoding \[baɪt peə(r) ɪnˈkəʊdɪŋ\] 字节对编码；一种常见分词算法，通过不断合并高频符号对形成词元
> *   unigram \[ˈjuːnɪɡræm\] n.单元模型；这里指 unigram 语言模型风格的次词切分方法
> *   open vocabulary 开放词汇表；指可以处理未预先完整列出的词
> *   inventory \[ˈɪnvəntri\] n.词表库存；这里指模型可使用的词元集合
> *   morpheme \[ˈmɔːfiːm\] n.语素；最小意义单位，如词根、前缀、后缀


Pretraining objectives determine which linguistic behaviors prompts can reliably elicit. Autoregressive LMs (e.g., GPT-style) are trained to predict the next token given preceding tokens; this supports in-context learning where tasks are specified as textual patterns and continued.  Masked language models (e.g., BERT-style) instead predict masked tokens using both left and right context; this objective often yields strong bidirectional representations for downstream tasks.  For instruction-following systems, additional instruction tuning (e.g., FLAN-style instruction finetuning) and RLHF-style alignment (e.g., InstructGPT) shift models toward interpreting prompts as directives and optimizing helpfulness/intent alignment. 

> 预训练目标决定了提示能够可靠诱发哪些语言行为。自回归语言模型（例如 GPT 类模型）被训练为根据前面的词元预测下一个词元；这支持上下文学习，因为任务可以作为文本模式来指定，并由模型继续完成。掩码语言模型（例如 BERT 类模型）则是利用左右两侧上下文来预测被遮蔽词元；这种目标通常能为下游任务提供较强的双向表示。对于指令跟随系统而言，额外的指令微调（例如 FLAN 风格的 instruction finetuning）和 RLHF 式对齐（例如 InstructGPT）会使模型更倾向于把提示理解为指令，并优化其有帮助性以及与用户意图的一致性。

> *   pretraining objective 预训练目标；模型在大规模训练阶段所优化的目标
> *   masked language model 掩码语言模型；通过预测被遮住词语进行训练的模型
> *   bidirectional \[ˌbaɪdəˈrekʃənl\] adj.双向的；同时利用左、右上下文
> *   downstream tasks 下游任务；在预训练模型基础上执行的具体应用任务
> *   instruction tuning 指令微调；用大量“指令—回答”数据继续训练模型
> *   RLHF \[ˌɑːr el eɪtʃ ˈef\] 基于人类反馈的强化学习；用人类偏好信号来优化模型行为的方法
> *   alignment \[əˈlaɪnmənt\] n.对齐；使模型输出更符合人类目标和规范

Context windows set hard and soft constraints on prompt effectiveness. API systems typically define capacity in tokens and enforce a combined limit over input and output; exceeding limits requires shortening, chunking, or summarizing prompts.  Even when contexts are long, models may not use information uniformly: performance often peaks when relevant information occurs near the beginning or end of the context and drops when it is in the middle (“lost in the middle”). 
> 上下文窗口会对提示效果施加硬约束和软约束。API 系统通常用词元数来定义容量，并对输入和输出的总长度施加联合限制；一旦超出限制，就必须缩短、切块或总结提示。即使上下文很长，模型也未必会均匀地利用所有信息：当相关信息位于开头或结尾时，性能往往更好；而当相关信息位于中间时，表现则会下降，这一现象通常被称为“中间遗失”（lost in the middle）。

> *   context window 上下文窗口；模型一次能处理的最大输入范围
> *   capacity \[kəˈpæsəti\] n.容量
> *   chunking \[ˈtʃʌŋkɪŋ\] n.切块；把长内容拆成较小部分
> *   uniformly \[ˈjuːnɪfɔːmli\] adv.均匀地
> *   lost in the middle 中间遗失；长上下文中间部分的信息更容易被忽视

Linguistically, prompt effectiveness can be analyzed through core theories of how language encodes structure and use. Syntax concerns hierarchical structure and dependence relations (e.g., phrase structure and transformations in generative traditions).  Semantics concerns meaning and compositional interpretation; dynamic approaches such as Discourse Representation Theory (DRT) model how meaning updates with context and handle anaphora across sentences.  Pragmatics studies meaning in use: cooperative conversation principles and implicatures (e.g., the idea that conversational contributions are part of cooperative efforts), and speech act approaches that treat utterances as actions (illocutionary forces such as requesting, ordering, promising).  Discourse theories model coherence and rhetorical relations (e.g., RST) and attentional state/salience (e.g., centering theory linking coherence to referring expressions and focus of attention).  Information structure analyzes topic/focus/givenness choices as “information packaging” relative to common ground and communicative needs.  Register theory (e.g., systemic functional linguistics) links linguistic choices to situational variables such as field, tenor, and mode, and corpus approaches treat registers as systematic variation in lexico-grammatical distributions. 

> 从语言学角度看，提示效果可以通过若干核心理论来分析，这些理论关注语言如何编码结构与使用。句法研究层级结构与依赖关系，例如生成语言学传统中的短语结构和变换。语义研究意义以及组合解释；像话语表征理论（DRT）这样的动态语义方法，会建模意义如何随着上下文更新，并处理跨句指代。语用学研究语言在使用中的意义：包括合作原则与会话含义，也包括把话语视为行动的言语行为理论。话语理论研究连贯性、修辞关系以及注意状态和显著性；信息结构则分析主题、焦点和已知性选择如何作为“信息包装”来服务于共同知识和交际需求。语体理论则把语言选择与场域、语旨和媒介等情境变量联系起来，而语料方法则把语体理解为词汇—语法分布上的系统性变化。

> *   hierarchical structure 层级结构；语言单位不是线性堆叠，而有嵌套层次
> *   generative traditions 生成语言学传统；研究语言规则和结构生成机制的理论传统
> *   compositional interpretation 组合解释；整体意义由部分意义及其组合方式决定
> *   Discourse Representation Theory \[dɪsˈkɔːs ˌreprɪzenˈteɪʃən ˈθɪəri\] 话语表征理论；一种处理跨句意义更新与指代的语义理论
> *   anaphora \[əˈnæfərə\] n.照应；如代词回指前文实体
> *   implicature \[ˈɪmplɪkətʃə(r)\] n.会话含义；未明说但可推知的意思
> *   rhetorical relations 修辞关系；句子或段落之间的因果、转折、展开等关系
> *   salience \[ˈseɪliəns\] n.显著性；在当前语境中更容易被注意或提取的程度
> *   common ground 共同知识；交谈双方默认共享的背景信息
> *   lexico-grammatical distributions 词汇—语法分布；词汇和语法选择呈现出的规律性模式

Assumption (explicit): in what follows, “effective prompt” means a prompt that improves a predefined evaluation target (e.g., accuracy, constraint satisfaction, human preference) for a specified model and fixed decoding settings; effectiveness is therefore conditional on task, model family, and evaluation protocol. 

> 这里作出一个明确前提：下文所谓“有效提示”，是指在某个指定模型、固定解码设定和预先定义的评估目标下，能够提高表现的提示；例如提高准确率、约束满足率或人类偏好评分。因此，提示是否有效，本质上取决于任务、模型家族和评估协议。

> *   predefined \[ˌpriːdɪˈfaɪnd\] adj.预先定义的
> *   constraint satisfaction 约束满足；输出是否符合规定条件
> *   evaluation protocol 评估协议；评测时采用的具体规则和流程
> *   model family 模型家族；具有相近架构或训练方式的一类模型

### Empirical analysis

Empirical prompt effects can be framed as measurable correlations between prompt linguistic form and outcome quality, plus causal effects from controlled prompt manipulations. Multiple independent research lines show that prompt text is not “mere instruction metadata”; it is the task specification itself, and models react strongly to subtle lexical and structural cues. 

> 从经验上看，提示效应可以被理解为：提示的语言形式与输出质量之间存在可测量相关性，而且在受控提示操作下，这些关系还会表现为因果效应。多条彼此独立的研究路线都表明，提示文本并不是“仅仅附带的说明元数据”；它本身就是任务规范，而模型会对细微的词汇和结构线索作出强烈反应。

> *   empirical \[ɪmˈpɪrɪkl\] adj.经验的；基于观察和实验的
> *   causal effects 因果效应；某种改变直接引发结果变化
> *   metadata \[ˈmetədeɪtə\] n.元数据；关于数据的数据；这里指“看似附带的说明信息”
> *   cues \[kjuːz\] n.线索；能引导模型行为的语言信号

A key empirical finding is that demonstrations and templates matter. GPT-3-style results show that providing few-shot examples in-context improves performance and that tasks can be specified “purely via text interaction.”  In reasoning, chain-of-thought demonstrations improve performance on multi-step tasks, and even without demonstrations, a short trigger phrase such as “Let’s think step by step” can substantially increase accuracy on reasoning benchmarks.  Beyond prompting, instruction tuning (training on instruction templates) improves zero-shot instruction following, indicating that models become better at mapping directive language to task behavior, but still rely on linguistic cues at inference time. 

> 一个关键的经验发现是：示例和模板非常重要。GPT-3 式研究表明，在上下文中提供少样本例子能够提升表现，而且任务可以“完全通过文本交互来指定”。在推理方面，思维链示例能够提升多步任务表现；即使没有示例，一句简短的触发语，例如 “Let’s think step by step”，也能显著提高推理基准上的准确率。除了直接提示以外，指令微调也会提升零样本的指令跟随能力，这说明模型会更擅长把指令性语言映射为任务行为，但在推理时仍然依赖语言线索。

> *   template \[ˈtempleɪt\] n.模板；可复用的固定结构
> *   chain-of-thought 思维链；显式展开中间推理步骤的提示方式
> *   benchmarks \[ˈbentʃmɑːks\] n.基准测试；用于比较模型能力的标准任务集
> *   inference time 推理时；模型实际运行并生成回答的时候

From a linguistic perspective, many “good prompt” features map cleanly to pragmatic and discourse categories: directives (speech acts), explicit common-ground management, and coherent discourse structuring. Corpora of human-written task instructions often standardize these elements. For example, Super-NaturalInstructions uses a uniform instruction schema with DEFINITION, POSITIVE EXAMPLES, and NEGATIVE EXAMPLES, explicitly encoding both task meaning and boundary conditions.  Prompt repositories (e.g., PromptSource/P3) treat prompts as functional templates mapping dataset examples to input/target pairs and document that prompt variation is a first-class design dimension. 

> 从语言学视角看，许多“好提示”的特征都可以清楚地对应到语用学和话语分析范畴：例如指令行为、共同知识管理以及连贯的话语结构。人类编写的任务指令语料通常会把这些要素标准化。例如，Super-NaturalInstructions 使用统一的指令模式，包括 DEFINITION、POSITIVE EXAMPLES 和 NEGATIVE EXAMPLES，从而显式编码任务含义及其边界条件。PromptSource 和 P3 这样的提示资源库，则把提示当作功能性模板，用于把数据集样本映射为输入—目标对，并把提示变化本身视为一个一级设计维度。

> *   common-ground management 共同知识管理；通过措辞控制双方默认共享的信息
> *   coherent \[kəʊˈhɪərənt\] adj.连贯的；结构和意义上都一致的
> *   schema \[ˈskiːmə\] n.模式；结构化组织方式
> *   boundary conditions 边界条件；规定任务适用范围与限制的条件
> *   first-class design dimension 一级设计维度；指本身就值得被系统设计和研究的重要变量

The table below summarizes measurable linguistic features frequently associated with improved prompt outcomes, together with representative observed effects and plausible interpretations anchored in the literature.

> 下表总结了若干经常与更好提示结果相关、且可以测量的语言特征，并给出代表性观察结果及其可能解释。



Table: Linguistic prompt features and observed effects

| Feature dimension | Measurable operationalization (examples) | Representative observed effects on LLM behavior | Supporting evidence |
|---|---|---|---|
| Lexical triggers and cue phrases | Presence/position of cue n-grams (e.g., “step by step”), modality markers (“must”, “only”), domain terms; cue PMI vs outcomes | Cue phrases can elicit reasoning-like multi-step outputs and increase benchmark accuracy in zero-shot settings; “trigger sentence” prompts can shift output style and correctness |  |
| Directives and explicit task definitions | Speech-act labels; imperative/infinitival constructions; explicit DEFINITION sections; instruction length and specificity | Clear directives improve adherence to task intent in instruction-following settings; instruction tuning further increases sensitivity to directive language |  |
| Examples (few-shot) | Count of demonstrations; structural similarity between demos and query; exemplar diversity | Few-shot examples improve performance by specifying the mapping in-context; chain-of-thought exemplars improve reasoning tasks |  |
| Constraints (format, scope, exclusions) | Presence of “Output format:” sections; regex-checkable constraints; negative constraints (“do not…”) | Constraining outputs can reduce unwanted degrees of freedom; explicit token limits and stop conditions shape completion length/termination |  |
| Formatting and segmentation | Delimiters (###, XML-like tags), labeled sections, bullet/numbered structures, code blocks; entropy of layout tokens | Structured prompts often yield more structured outputs; models frequently attend to delimiter/special tokens, making them useful for scaffolding |  |
| Length and information placement | Token count; placement index of key constraints; early vs late repetition of key specs | Long contexts can degrade retrieval when key info is in the middle; important constraints are often better placed at edges or reiterated |  |
| Code-switching and multilingual prompts | Language-ID sequence; switch points; tokenization length per language | Tokenization length differs substantially across languages (cost/context implications); multilingual performance depends on training exposure and instruction-tuning mixture |  |
| Punctuation and micro-structure | Colon density, quote balance, list markers, parentheses; character-level patterns | Punctuation is part of the model’s cue system; delimiter-like punctuation can act as structural signals (esp. when learned as frequent boundary tokens) |  |

| 特征维度 | 可测量操作化方式（示例） | 在大语言模型行为上的代表性效果 | 支持证据 |
| --- | --- | --- | --- |
| 词汇触发器与提示短语 | 提示短语的位置与出现；情态标记如 “must”“only”；领域术语；提示词与结果的互信息 | 这些短语可以诱发类似推理的多步输出，并在零样本环境下提高基准准确率 | 文献中多次报告此类“触发句”效应 |
| 指令与显式任务定义 | 言语行为标签；祈使句或不定式结构；显式 DEFINITION 段落；指令长度与具体性 | 清楚指令有助于模型更好遵循任务意图；而指令微调会进一步提高模型对这类语言的敏感性 | 指令跟随研究与指令数据集均支持这一点 |
| 示例（少样本） | 示例数量；示例与查询的结构相似度；示例多样性 | 少样本示例通过在上下文中直接规定映射关系来提升表现；思维链示例尤其有利于推理任务 | GPT-3、CoT 等研究支持 |
| 约束（格式、范围、排除项） | 是否存在 “Output format:” 段落；是否可以用正则检查；是否有 “do not…” 这类负向约束 | 明确约束可减少不必要自由度；显式长度限制和停止条件会影响输出长度与终止方式 | 工程实践与实验观察均支持 |
| 格式与分段 | 分隔符、标签、项目符号、编号结构、代码块；布局词元熵 | 结构化提示通常会得到更结构化输出；模型经常对分隔符和特殊标记赋予较大注意力 | 模型注意力分析与提示工程经验支持 |
| 长度与信息放置 | 总词元数；关键信息的位置；是否位于开头或结尾 | 当关键信息位于中间时，长上下文可能更难正确提取；因此重要约束通常应位于边缘或重复出现 | “中间遗失”现象支持 |
| 语码转换与多语提示 | 语言识别序列；切换点；各语言的分词长度 | 不同语言的词元成本差别很大；多语表现依赖训练覆盖与指令微调混合方式 | 多语模型与分词研究支持 |
| 标点与微结构 | 冒号密度、引号平衡、列表标记、括号等字符模式 | 标点本身也是模型的线索系统；具有分隔作用的标点可作为结构信号 | 训练分布与提示格式经验支持 |

> *   operationalization \[ˌɒpərəʃənəlaɪˈzeɪʃən\] n.操作化；把抽象概念转化为可测量指标
> *   modality markers 情态标记；如 must、should、can 等表达义务、可能性等的词
> *   PMI \[ˌpiː em ˈaɪ\] 点互信息；衡量两个事件共同出现强度的统计量
> *   regex \[ˈredʒeks\] 正则表达式；用于文本模式匹配的形式语言
> *   entropy \[ˈentrəpi\] n.熵；这里可理解为格式分布的复杂程度
> *   code-switching \[ˈkəʊd swɪtʃɪŋ\] 语码转换；在不同语言之间切换使用
> *   character-level patterns 字符级模式；在单个字符和符号层面表现出的规律

Two interpretive cautions follow from the evidence. First, “good prompt” effects are often conditional: e.g., cue phrases can help strong models but may induce repetition or degeneration in weaker ones, and instruction-tuned models may already internalize certain pragmatic defaults.  Second, some features are correlated in practice (length, explicitness, formatting), so observational corpora require careful causal designs to avoid conflating them. 

> 根据现有证据，需要注意两点解释性限制。第一，“好提示”的效果往往是有条件的：例如某些提示短语可能对强模型有帮助，但会让较弱模型出现重复或退化；而经过指令微调的模型，可能已经内化了一些默认的语用规则。第二，在真实语料中，很多特征彼此相关，例如长度、明确性和格式，因此对观察性语料做分析时，必须采用谨慎的因果设计，以避免把这些因素混在一起。

> *   degeneracy \[dɪˈdʒenərəsi\] n.退化；输出变得重复、空泛或失控
> *   observational corpora 观察性语料；自然收集而非实验操控得到的文本数据
> *   causal design 因果设计；用来尽量识别真正因果关系的研究设计

### Mechanisms

This section maps prompt-level linguistic features to LLM internals that plausibly produce them, emphasizing mechanisms with direct documentation or empirical backing.
> 这一部分把提示层面的语言特征，映射到大语言模型内部可能产生这些特征的机制上，重点讨论那些已有直接文献说明或经验支持的机制。

> *   map ... to ... 映射到；把一种现象对应到另一层解释
> *   empirical backing 经验支持；已有实验或观察证据支持


Tokenization creates discrete units that determine what counts as “nearby,” “repeated,” or “salient” in the model’s computations. BPE-based segmentation explicitly builds tokens by merging frequent symbol pairs and represents text as subword units; this makes prompts sensitive to orthography, whitespace conventions, and morphological regularities (because the model repeatedly sees shared subword tokens like suffixes).  Tokenization is also a fairness and capacity issue: the same translated content can differ in encoding length by up to 15× across languages in evaluated tokenizers, affecting cost, latency, and how much context fits in a window.  This directly motivates prompt guidelines for multilingual settings (e.g., explicitly selecting an output language and budgeting tokens). 

> 分词会产生离散单位，而这些单位决定了在模型计算中，什么算作“相邻”“重复”或“显著”。基于 BPE 的切分会通过合并高频符号对来构造词元，并把文本表示为次词单位；这使提示对拼写、空格习惯和形态规律都很敏感，因为模型会反复看到像后缀那样共享的次词词元。分词也涉及公平性和容量问题：同样内容的译文，在不同语言中的编码长度，在已评估分词器中可相差多达 15 倍，这会影响成本、延迟以及上下文能容纳多少信息。这也直接解释了为什么多语提示需要明确选择输出语言，并事先规划词元预算。

> *   discrete units 离散单位；彼此可区分的最小处理单元
> *   orthography \[ɔːˈθɒɡrəfi\] n.拼写系统；书写规则
> *   morphological regularities 形态规律；例如词缀、词干变化等规律
> *   fairness \[ˈfeənəs\] n.公平性；不同语言或群体是否受到不平衡对待
> *   latency \[ˈleɪtənsi\] n.延迟；系统响应所需时间
> *   token budget 词元预算；可用于输入和输出的词元配额

Positional encoding and attention shape where information “lands” in long prompts. Methods like RoPE and ALiBi modify how relative positions are represented; ALiBi, for instance, biases attention scores by distance and is designed to enable input length extrapolation, while RoPE introduces rotational structure to encode positions.  Despite these advances, long-context utilization can be non-robust: performance often drops when relevant information sits in the middle, consistent with positional/attention biases and practical difficulties of allocating attention over long sequences.  A prompt implication is that discourse design (placing key constraints near the beginning/end, or repeating them succinctly) can compensate for positional fragility. 

> 位置编码与注意力机制会影响信息在长提示中“落在哪里”。像 RoPE 和 ALiBi 这样的方法，会改变相对位置的表示方式；例如 ALiBi 会按距离对注意力分数加入偏置，以支持输入长度外推，而 RoPE 则通过旋转结构来编码位置。尽管有这些改进，长上下文利用仍然并不稳健：当相关信息位于中间时，表现通常会下降，这与位置偏差、注意力分配困难以及长序列中的实际计算限制是一致的。因此，从提示设计看，应把关键信息放在开头或结尾，或者用简短形式重复它们，以补偿这种位置脆弱性。

> *   RoPE \[rəʊp\] 旋转位置编码；一种通过旋转向量来编码相对位置信息的方法
> *   ALiBi \[ˈælɪbi\] ALiBi；一种通过按距离加偏置来处理长上下文的位置方法
> *   extrapolation \[ɪkˌstræpəˈleɪʃən\] n.外推；推广到比训练时更长的输入长度
> *   positional fragility 位置脆弱性；模型对信息位置变化较为敏感

Attention heads sometimes align with linguistically meaningful relations and structural markers. Analyses of transformer attention report heads that map to syntactic dependencies and coreference-like behaviors, and also heads that attend to special tokens or delimiters.  This provides a mechanistic rationale for why separators, headings, and templated layouts can stabilize outputs: they create consistent boundary tokens that attention can lock onto, and they reduce ambiguity about discourse segmentation. 
> 有时，注意力头会与语言学上有意义的关系和结构标记对应起来。对 Transformer 注意力的分析表明，有些注意力头会对应句法依赖、类似照应的行为，也有一些头会专门关注特殊词元或分隔符。这就为如下经验提供了机制解释：分隔符、标题和模板化布局能够稳定输出，因为它们创造了稳定的边界词元，注意力机制可以围绕这些边界工作，并减少话语切分上的歧义。

> *   coreference \[kəʊˈrefərəns\] n.共指；不同表达指向同一实体
> *   delimiters \[dɪˈlɪmɪtəz\] n.分隔符；用来划定边界的符号或标记
> *   scaffolding \[ˈskæfəldɪŋ\] n.脚手架式结构；这里指帮助模型稳定组织输出的支架结构
> *   segmentation \[ˌseɡmenˈteɪʃən\] n.切分；划分成不同部分


In-context learning provides a particularly important bridge from prompt features to internals. Mechanistic interpretability work proposes that “induction heads” implement pattern completion behaviors of the form $$[A][B]\dots[A]\rightarrow[B]$$ and that these heads may underlie much of in-context learning (loss reduction across a sequence as patterns repeat).  This explains why prompts with consistent exemplars, repeated formatting, and stable label tokens can have outsized effects: they create repeated token patterns that are easy for induction-style mechanisms to exploit. 
> 上下文学习是把提示特征与模型内部机制联系起来的尤其重要的一座桥梁。机制可解释性研究提出，所谓“归纳头”会实现类似如下的模式补全行为：  
\[A\]\[B\]…\[A\]→\[B\]\[A\]\[B\]\\dots\[A\]\\rightarrow\[B\]\[A\]\[B\]…\[A\]→\[B\]  
而这类头可能构成了大量上下文学习现象的基础。因此，包含一致示例、重复格式和稳定标签词元的提示，往往会产生格外显著的效果，因为它们为这种归纳式机制提供了容易利用的重复模式。

> *   mechanistic interpretability 机制可解释性；试图在模型内部具体回路层面解释行为的研究方向
> *   pattern completion 模式补全；根据前面出现的模式继续生成相应内容
> *   outsized effects 特别大的效果；超出表面预期的显著影响


Decoding choices translate probabilities into text and therefore mediate prompt effects. Greedy decoding can collapse diversity and, in open-ended generation, has been linked to “text degeneration”; nucleus sampling (top_p) is proposed as a remedy that truncates low-probability tails to balance quality and diversity.  In reasoning tasks, sampling multiple chains and selecting the most consistent answer (self-consistency) operationalizes the idea that different reasoning paths can converge on the same correct outcome, offering robustness beyond a single greedy completion. 

> 解码策略会把概率转化为实际文本，因此也会调节提示效应。贪心解码（greedy decoding）可能会压缩多样性；在开放式生成中，它还与“文本退化”有关。核采样（nucleus sampling，top\_p）则被提出作为一种补救方法，它通过截断低概率尾部来平衡质量和多样性。在推理任务中，采样多条思维链并选择最一致的答案，就是把“不同推理路径可能会收敛到同一正确结果”这一想法操作化，从而比单一路径更稳健。

> *   decoding \[dɪˈkəʊdɪŋ\] n.解码；把模型预测分布转化为具体文本输出的过程
> *   greedy decoding 贪心解码；每一步都选当前概率最高的词元
> *   text degeneration 文本退化；输出变得重复、空洞或不自然
> *   nucleus sampling \[ˈnjuːkliəs ˈsɑːmplɪŋ\] 核采样；从累计概率达到阈值的候选集合中采样
> *   low-probability tails 低概率尾部；概率分布中极小概率的那部分候选
> *   robustness \[rəʊˈbʌstnəs\] n.稳健性；在不同扰动下仍保持较好表现的能力

Finally, LLM “language use” differs from human language use in systematic ways. Humans are grounded agents with shared world context and communicative intentions; LMs are trained primarily to predict text distributions, and alignment methods then shape how they present that text to match human preferences and intent.  This gap helps explain why models can produce fluent discourse that still violates pragmatic expectations like truthfulness (e.g., by producing plausible but false continuations), motivating prompt practices that request uncertainty signaling, citations, or verification steps where appropriate. 

> 最后，大语言模型的“语言使用”与人类语言使用存在系统性差异。人类是具有现实落地、共享世界背景和交际意图的行动者；而语言模型主要是在文本分布上进行预测训练，然后再通过对齐方法调整其表达方式，使之更符合人类偏好和意图。这种差距有助于解释：为什么模型能够生成流畅的话语，却仍然会违反某些语用期待，例如真实性——也就是生成听起来合理但实际上错误的延续。因此，在适当场景下，提示中要求模型标明不确定性、给出引用或进行核验，是有根据的做法。

> *   grounded agents 具有现实落地的行动者；指理解和行为直接嵌入现实世界的主体
> *   communicative intentions 交际意图；说话者想通过语言达成的目的
> *   text distributions 文本分布；语言在数据中出现的统计规律
> *   truthfulness \[ˈtruːθfəlnəs\] n.真实性；输出与事实一致的程度
> *   verification \[ˌverɪfɪˈkeɪʃən\] n.核验；检查信息是否正确

Table: Internal mechanisms and the language features they tend to favor

| Internal factor | Mechanistic property (simplified) | Prompt-language features it tends to reward | Why it differs from human language processing | Evidence |
|---|---|---|---|---|
| Subword tokenization | Text is segmented into learned subword units | Morphologically regular wording; consistent spelling; careful handling of rare names; explicit language choice in multilingual prompts | Human comprehension is not constrained by a fixed tokenizer; models incur token-budget/cost asymmetries across languages |  |
| Positional encoding + attention | Attention scores depend on token distance and learned positional scheme | Edge placement of key constraints; chunking; repeated short constraints; explicit sectioning | Humans often retrieve mid-discourse facts robustly via richer memory and situational grounding |  |
| Attention heads over delimiters | Some heads specialize (empirically) in boundary/special-token patterns | Clear delimiters; consistent templates; labeled fields | Humans can infer structure from meaning even without stable markers; models benefit from explicit boundary cues |  |
| Next-token objective | Output is a continuation maximizing conditional probability (modulo decoding) | “Write in this format…”; demonstrations; completion-friendly scaffolds | Humans can infer intentions beyond surface continuation; models primarily optimize textual continuation likelihood |  |
| Sampling/decoding | Temperature/top_p control diversity vs determinism | Lower randomness for constraint satisfaction; higher randomness for ideation; self-consistency for robustness | Humans can diversify ideas without stochastic decoding parameters; models need explicit inference controls |  |

| 内部因素 | 机制性质（简化） | 它倾向奖励的提示语言特征 | 它与人类语言处理不同的原因 | 证据  |
| --- | --- | --- | --- | --- |
| 次词分词 | 文本被切成学习得到的次词单位 | 形态更规则的措辞；一致拼写；谨慎处理罕见专名；在多语提示中明确指定语言 | 人类理解不受固定分词器限制；而模型在不同语言上有词元预算与成本不对称 | 多语分词与词元成本研究 |
| 位置编码加注意力 | 注意力分数取决于词元距离和所学到的位置方案 | 把关键约束放在边缘；分块；重复短约束；明确分节 | 人类通常能通过更丰富的记忆和现实背景稳健提取中间信息 | 长上下文研究支持 |
| 对分隔符敏感的注意力头 | 一些头会专门处理边界或特殊标记 | 清晰分隔符；一致模板；带标签字段 | 人类即使没有明确边界标记，也能依靠意义推断结构；模型则更受益于显式边界 | 注意力分析支持 |
| 下一个词元目标 | 输出是条件概率最大的文本延续（受解码方式调节） | “按此格式写出……”；示例；便于续写的脚手架结构 | 人类可以超越表面延续去理解意图；模型首先优化文本续写似然 | 语言模型目标本身说明这一点 |
| 采样与解码 | 温度、top\_p 控制多样性与确定性之间的平衡 | 低随机性适合约束满足；高随机性适合创意生成；自一致性适合稳健推理 | 人类可以在不调参数的情况下自然调节想法多样性；模型则需要显式推理控制 | 解码研究支持 |

> *   morphologically regular 形态上更规则的；更符合常见词缀和构词规律
> *   asymmetries \[eɪˈsɪmətriz\] n.不对称；不同语言或条件下表现不均衡
> *   scaffolds 脚手架结构；帮助生成按预期方向展开的结构性安排
> *   likelihood \[ˈlaɪklihʊd\] n.似然；在这里可理解为“模型认为更可能”的程度


### Methodology

A rigorous research program on prompt linguistics should treat prompts and outputs as jointly structured discourse objects and should separate (a) observational findings from corpora and (b) causal claims from controlled interventions.

> 一个严格的提示语言学研究方案，应当把提示和输出看作共同构成的结构化话语对象，并明确区分两类结论：一类来自语料观察，一类来自受控干预后的因果判断。

> *   rigorous \[ˈrɪɡərəs\] adj.严格的；严密的
> *   intervention \[ˌɪntəˈvenʃən\] n.干预；在实验中主动改变某个因素

Data sources and collection. Public prompt/instruction corpora are available at multiple “levels of naturalness,” and mixing them is useful if the sampling bias is modeled explicitly. P3 (via PromptSource) provides a large public collection of English prompts across many datasets, enabling prompt-level variation studies at scale.  Super-NaturalInstructions provides expert-written instruction schemas (definition plus positive/negative examples) across 1600+ tasks, enabling fine-grained analysis of instruction components and their mapping to model behavior.  Dialogue-style instruction corpora such as OpenAssistant (human-generated, human-annotated, multilingual conversation trees) and UltraChat (large-scale instructional dialogues) support analysis of multi-turn discourse strategies and constraint drift.  For “in-the-wild” user prompts, platforms like ShareGPT are often referenced in open-model training pipelines, but data quality and representativeness require auditing. 

> 数据来源与收集。公共提示和指令语料在“自然性”程度上有多个层次；如果能显式建模抽样偏差，把它们混合使用通常是有益的。P3（通过 PromptSource 提供）提供了一个大规模英语提示集合，覆盖许多数据集，适合做大规模提示差异研究。Super-NaturalInstructions 提供了由专家撰写的指令模式，覆盖 1600 多个任务，适合细粒度分析指令组成部分及其与模型行为的关系。像 OpenAssistant 和 UltraChat 这样的对话式指令语料，则支持分析多轮话语策略和约束漂移。至于“真实世界”中的用户提示，像 ShareGPT 这样的来源在开放模型训练中经常被提及，但其数据质量和代表性仍需审计。

> *   naturalness \[ˈnætʃrəlnəs\] n.自然性；与真实用户使用情境接近的程度
> *   sampling bias 抽样偏差；样本不能公平代表总体
> *   fine-grained \[ˌfaɪn ˈɡreɪnd\] adj.细粒度的；分析得更细致
> *   constraint drift 约束漂移；随着对话进行，原有要求逐渐偏移或弱化
> *   audit \[ˈɔːdɪt\] v./n.审计；系统检查质量和可靠性

Annotation schema. A layered linguistic annotation design supports both interpretability and statistical testing.

Syntactic layer: dependency parses and morphosyntax using Universal Dependencies (UD), enabling cross-lingual comparisons of syntactic complexity, directive constructions, and clause structure. 

Semantic layer: predicate–argument structure via PropBank-style role labeling, capturing explicitness about agents, patients, constraints, and required outputs (especially in prompts specifying transformations or extraction). 

Discourse layer: discourse relations (contrast, cause, elaboration) using PDTB-style connective and relation annotation; alternatively, RST-style trees for hierarchical rhetorical structure in longer prompts. 

Pragmatics and speech acts: annotate prompt illocutionary force categories (request, command, question, prohibition) motivated by speech act theory, plus implicature-relevant phenomena (underspecification, politeness markers, quantity violations) motivated by cooperative principles. 

Information structure: annotate topic/focus cues (e.g., “As for X…”, contrastive focus markers), givenness cues, and common-ground assumptions; these can be treated as “packaging” signals shaping how the model organizes its response. 

Register: annotate situational variables (field/tenor/mode) and compute associated lexico-grammatical distributions; this supports explaining why prompts framed in “legalese,” “academic,” or “chatty” registers elicit corresponding output styles. 

> 标注方案。分层语言学标注设计有助于兼顾可解释性和统计检验。


> 句法层：使用 Universal Dependencies 进行依存句法和形态句法标注，以支持跨语言比较句法复杂度、指令结构和从句组织。

> 语义层：使用 PropBank 风格的语义角色标注，刻画提示中关于施事、受事、约束条件和目标输出的明确程度，尤其适用于转换或抽取型任务。

> 话语层：使用 PDTB 风格的话语关系标注，例如对比、因果、展开等关系；在更长的提示中，也可以使用 RST 风格的层级修辞结构。

> 语用和言语行为层：标注提示的言外行为类别，例如请求、命令、问题、禁止；同时也标注与会话含义相关的现象，例如说明不足、礼貌标记和数量原则偏离。

> 信息结构层：标注主题与焦点线索、已知信息线索以及共同知识假设；这些都可以看作影响模型组织回答方式的“信息包装”信号。

> 语体层：标注场域、语旨和媒介等情境变量，并计算与之对应的词汇—语法分布；这有助于解释为什么带有“法律文体”“学术文体”或“聊天式文体”的提示，会诱发相应风格的输出。

> *   layered annotation 分层标注；从多个层面给同一文本加标签
> *   dependency parsing 依存句法分析；分析词与词之间的依赖关系
> *   morphosyntax \[ˌmɔːfəʊˈsɪntæks\] n.形态句法；形态与句法的结合层面
> *   predicate–argument structure 谓词—论元结构；谁做什么、作用于谁的语义结构
> *   agent / patient 施事 / 受事；语义角色中的动作发出者与承受者
> *   illocutionary force \[ɪˌləʊˈkjuːʃənəri fɔːs\] 言外行为力；一句话作为请求、命令、承诺等所执行的功能
> *   politeness markers 礼貌标记；如 please 等带礼貌色彩的表达
> *   givenness 已知性；某信息在当前语境中是否已被引入

Metrics and modeling. For each prompt, compute feature families that align with the above layers: lexical specificity (frequency, type–token measures), syntactic depth and dependency length, discourse connective counts and relation distributions, constraint density (count of explicit “must/only/do not”), formatting entropy (density of delimiters/labels), and tokenization cost measures (tokens per character or per semantic unit, per language). Tokenization-driven inequities and overlap issues should be measured explicitly in multilingual settings. 

Statistical tests should be chosen to match design. For observational corpora, mixed-effects regression is typically appropriate to control for task and dataset clustering; multivariate methods used in register analysis (e.g., factor-based variation analyses) can model correlated feature bundles.  For causal inference, randomized prompt interventions (A/B tests) should be used: change one linguistic factor at a time (e.g., add/remove negative examples; move constraint location; change delimiter scheme) while holding model, decoding, and evaluation constant. 

Controlled experiments should include decoding as an experimental factor: e.g., greedy vs top_p sampling; temperature sweeps; self-consistency sampling counts; because decoding interacts with prompt constraints and can create or reduce degeneration. 

> 指标与建模。对每个提示，应计算与上述层次相对应的特征族：词汇具体性、句法深度和依赖长度、话语连接词计数及关系分布、约束密度、格式熵，以及分词成本指标，例如每字符或每语义单位对应多少词元。在多语场景中，必须显式测量由分词驱动的不平等和重叠问题。

> 统计检验应与研究设计匹配。对于观察性语料，混合效应回归通常比较合适，因为它能控制任务和数据集聚类；而语体分析中常见的多变量方法，也可用来建模彼此相关的特征簇。对于因果推断，则应采用随机化提示干预，也就是 A/B 测试：每次只改变一个语言因素，例如是否加入负样例、是否移动约束位置、是否更换分隔符方案，同时保持模型、解码和评估不变。


> 受控实验还应把解码作为实验因素之一，例如比较贪心解码与 top\_p 采样、进行温度扫描，或改变自一致性采样条数，因为解码会与提示约束发生交互，并可能制造或缓解退化现象。

> *   lexical specificity 词汇具体性；词语是否明确、专业、信息量高
> *   dependency length 依赖长度；相互依赖的词之间在线性序列上的距离
> *   density \[ˈdensəti\] n.密度；单位文本中某类成分出现的频率
> *   mixed-effects regression 混合效应回归；兼顾固定效应与随机效应的统计模型
> *   clustering 聚类；样本按任务或数据集自然分组
> *   multivariate \[ˌmʌltiˈveəriət\] adj.多变量的；同时考虑多个变量
> *   randomized \[ˈrændəmaɪzd\] adj.随机化的
> *   temperature sweep 温度扫描；系统测试不同温度设置的效果

Mermaid flowchart: analysis pipeline (timeline of steps)

```mermaid
flowchart TD
A[Define task and success metric] --> B[Select models and fix decoding settings]
B --> C[Collect prompt-output corpus]
C --> D[Preprocess: segment turns, normalize formatting, compute tokenization stats]
D --> E[Linguistic annotation: syntax, semantics, discourse, pragmatics, register]
E --> F[Feature extraction and dimensionality reduction]
F --> G[Controlled prompt interventions (ablation and factor manipulation)]
G --> H[Evaluate outputs: constraint satisfaction, accuracy, preference judgments]
H --> I[Statistical testing and error analysis]
I --> J[Mechanism hypotheses and guideline synthesis]
J --> K[Replication across tasks, languages, and model families]
```

### Practical guidelines

Effective prompt design can be stated as a linguistically grounded principle: make the intended speech act, discourse structure, and constraints maximally recoverable from the text alone, because the model only has access to tokens in context. This aligns both with instruction-following training paradigms and with pragmatic theories that emphasize cooperative contribution and clarity. 

> 有效的提示设计可以概括为一条具有语言学基础的原则：让预期的言语行为、话语结构和约束条件都尽可能仅凭文本本身就能被恢复出来，因为模型真正能接触到的只有上下文中的词元。这既符合指令跟随训练的思路，也符合强调合作与清晰性的语用学理论。

> *   recoverable \[rɪˈkʌvərəbl\] adj.可恢复的；能从文本中明确推断出来的


Guideline: specify the illocutionary force early and explicitly. Prompts should include an unambiguous directive (e.g., “Classify…”, “Extract…”, “Generate…”) rather than relying on implicature. Speech act theory predicts that ambiguity in force increases misinterpretation, and instruction-tuned models are trained to map explicit instructions to action. 

> 指导原则：尽早而明确地说明言外行为力。提示应包含毫不含糊的指令，例如“分类……”“抽取……”“生成……”，而不要把意图交给模型去凭言外之意猜测。言语行为理论表明，言外行为力越模糊，就越容易被误解；而经过指令微调的模型，本就是在训练中学习把显式指令映射为行动的

Example (good prompt)
```text
Task: Extract all company names from the text.
Output: A JSON array of strings.
Constraints: Do not include person names. Preserve original casing.
Text:
<...>
```

Counterexample (weaker prompt)
```text
What are the names mentioned here?
<...>
```

Guideline: encode constraints as checkable, local text. Include explicit constraints (format, scope, exclusions) in a dedicated section, using stable labels (“Constraints:”, “Output format:”). This is consistent with instruction corpora that explicitly separate definition and examples, and with API documentation emphasizing token limits and controllable generation boundaries. 

> 指导原则：把约束写成可检查、局部明确的文本。应把格式、范围和排除项等约束放在专门部分，并使用稳定标签，例如 “Constraints:” 或 “Output format:”。这与许多指令语料把定义和示例分开的做法一致，也与 API 文档中强调词元限制和可控生成边界的做法一致。




Guideline: use demonstrations to define the mapping, and keep demonstrations structurally parallel to the target instance. Few-shot prompting and chain-of-thought prompting show that exemplars can drive large performance changes; mechanistically this matches in-context pattern completion, where consistent templates are easier to continue than heterogeneous ones. 
> 指导原则：用示例来定义映射关系，并让示例与目标实例在结构上保持平行。少样本提示和思维链提示都表明，示例会显著改变模型表现；从机制上看，这与上下文模式补全是一致的，因为一致模板要比杂乱示例更容易被延续。
Example (few-shot; schematic)
```text
Instruction: Convert active voice to passive voice.

Example 1
Input: "The committee approved the proposal."
Output: "The proposal was approved by the committee."

Now do the same.
Input: "<your sentence>"
Output:
```

Guideline: treat formatting as part of the linguistic signal. Use delimiters, headings, and stable field labels to mark discourse segments (instructions vs data vs output). Transformer analyses show attention sensitivity to special/boundary tokens, and prompt engineering documentation explicitly recommends planning for the context window and structuring inputs. 

Guideline: manage context placement and repetition strategically in long prompts. Because long-context models can underuse mid-context information, place key constraints near the beginning and/or end, and repeat them in a short “At a glance” line if necessary. 

Guideline: for multilingual prompts and code-switching, make language choices explicit and budget tokens. Tokenization can inflate token counts drastically for some languages, affecting cost and available context; multilingual instruction performance depends on language exposure and instruction-tuning design. 

> 指导原则：把格式当作语言信号的一部分。使用分隔符、标题和稳定字段标签来标示不同话语区段，例如指令部分、数据部分和输出部分。Transformer 分析表明，注意力机制会对特殊标记和边界标记较为敏感，而提示工程文档也明确建议根据上下文窗口来规划输入结构。


> 指导原则：在长提示中有策略地管理信息位置与重复。由于长上下文模型可能无法充分利用中间信息，因此关键约束应放在开头和／或结尾；必要时还可以用一句简短的“总览”重新重复一次。


> 指导原则：对于多语提示和语码转换，要明确语言选择并预留词元预算。不同语言的分词长度可能差异巨大，这会影响成本和可用上下文；而多语指令性能则取决于语言覆盖和指令微调设计。

Example (good multilingual control)
```text
Output language: English.
Input may contain mixed languages.
If a term is not English, keep it as-is but explain it briefly in English.
```

Guideline: choose decoding settings consistent with the task’s pragmatic requirements. For constraint satisfaction and reproducibility, lower randomness is typically preferable; for ideation and diversity, controlled sampling is useful; for reasoning robustness, multi-sample aggregation (self-consistency) can help. These are decoding-level interventions that interact with prompt constraints and can reduce degeneration compared to naive greedy generation in open-ended settings. 

> 指导原则：根据任务的语用要求选择解码设置。对于约束满足和可复现性，通常更适合较低随机性；对于创意生成和发散思考，则可以使用受控采样；对于稳健推理，多样本聚合（如自一致性）通常有帮助。这些都是与提示相互作用的解码层面干预，并且在开放式生成中，它们往往比单纯贪心解码更能缓解退化。

> *   constraint satisfaction 约束满足；输出是否遵守格式、范围等要求
> *   reproducibility \[rɪˌprɒdjuːsəˈbɪləti\] n.可复现性
> *   ideation \[ˌaɪdiˈeɪʃən\] n.创意生成；构思新想法
> *   aggregation \[ˌæɡrɪˈɡeɪʃən\] n.聚合；把多个结果合并处理

### Limitations, open questions, and future research directions

Prompt effectiveness is not an intrinsic property of a text string; it is a relation among a prompt, a model (including its instruction-tuning/alignment), decoding, and an evaluation target. Instruction-tuned models can reduce sensitivity to some prompt variations by internalizing pragmatic defaults, but they also introduce other biases (e.g., preference optimization that may trade off truthfulness or calibration in some settings). 

> 提示是否有效，并不是某个文本字符串自身的固有属性；它是提示、模型（包括其指令微调与对齐方式）、解码策略以及评估目标之间的一种关系。经过指令微调的模型，可能会因为内化了一些默认语用规则，而降低对某些提示变化的敏感性；但它们也可能引入其他偏差，例如在某些情境下，为了迎合偏好优化而牺牲真实性或校准性。

> *   intrinsic property 固有属性；对象本身就具有的性质
> *   calibration \[ˌkælɪˈbreɪʃən\] n.校准性；模型表达的信心与真实正确率之间的一致程度

A central limitation for “linguistic prompting theory” is that many findings are task-local. For example, chain-of-thought prompting improves many reasoning benchmarks, but it can also produce verbose or errorful rationales; weaker models may exhibit repetition or degeneration under the same cues, illustrating that linguistic triggers interact with model capacity and decoding regimes.  This raises an open question: which linguistic prompt features generalize across model families and which are artifacts of specific training distributions? 

> “提示语言学理论”的一个核心限制在于，许多发现都高度依赖具体任务。例如，思维链提示确实能提升许多推理基准上的表现，但它也可能生成冗长甚至错误的推理过程；较弱模型在面对同样触发语时，还可能出现重复或退化。这说明，语言触发器会与模型能力和解码方案发生复杂交互。由此引出一个开放问题：哪些提示语言特征可以跨模型家族稳定泛化，哪些只是特定训练分布的产物？

> *   task-local 任务局部性的；只在特定任务上成立
> *   verbose \[vɜːˈbəʊs\] adj.冗长的
> *   interact with 与……交互；彼此影响
> *   training distribution 训练分布；模型训练数据所呈现的统计范围与特点

Long-context prompting remains a partially solved problem. Even “explicitly long-context” models can show position-dependent performance drops, implying that simply increasing window size does not guarantee discourse-robust retrieval. Future work should connect discourse theories (coherence, salience, rhetorical relations) to mechanistic attention allocation and develop prompt designs (or architectural changes) that mitigate mid-context fragility. 
> 长上下文提示仍然是一个尚未完全解决的问题。即使是“显式支持长上下文”的模型，在不同位置上也可能表现不均，这意味着仅仅增大窗口长度，并不能保证话语层面的稳健检索。未来研究需要把话语理论中的连贯性、显著性和修辞关系，与机制层面的注意力分配联系起来，并开发能缓解中间脆弱性的提示设计，或者相应的架构改进。

> *   discourse-robust retrieval 话语稳健检索；在长篇结构中也能稳定提取相关信息
> *   salience \[ˈseɪliəns\] 显著性；在当前上下文中更容易被抓住的信息
> *   rhetorical relations 修辞关系；如因果、转折、展开等文本关系


Multilingual prompting introduces both performance and equity challenges. Tokenizers can impose large cross-linguistic disparities in token counts (and therefore cost and usable context), and tokenization design can affect downstream performance in multilingual modeling. Prompt research should therefore treat tokenization as a first-class sociotechnical variable, not a neutral implementation detail. 
> 多语提示既带来性能问题，也带来公平性问题。分词器可能在不同语言之间造成巨大的词元数量差异，这会直接影响成本与可用上下文；而分词设计本身也会影响多语建模的下游表现。因此，提示研究应当把分词视为一个一等社会技术变量，而不是一个中性的实现细节。

> *   sociotechnical variable 社会技术变量；同时涉及技术机制和社会后果的因素
> *   implementation detail 实现细节；通常被视为底层技术安排，但这里并非无关紧要


Security and instruction conflicts are an increasingly important limitation. Prompt injection attacks exploit instruction-following behavior to redirect model outputs away from user intent; empirical work proposes automated methods to generate strong injection prompts and argues that robustness assessments can be overestimated without stronger testing. This implies that “effective prompt features” can be adversarially repurposed, and that prompt linguistics must interface with security evaluation. 
> 安全性和指令冲突也是越来越重要的局限。提示注入攻击会利用模型遵循指令的倾向，把输出从原本用户意图引向其他方向。已有经验研究提出了自动生成强提示注入的方法，并指出，如果没有更严格的测试，鲁棒性评估很容易被高估。这意味着，“有效提示特征”也可能被对抗性地重新利用；因此，提示语言学必须与安全评估结合起来。

> *   prompt injection 提示注入；通过恶意输入改变模型原本应执行的指令层级和行为
> *   adversarially 以对抗方式地；专门为了误导或攻击系统而设计
> *   robustness assessments 鲁棒性评估；测试系统在


Finally, a fundamental conceptual limitation is the mismatch between human pragmatic competence and LM text prediction. Critical perspectives caution that language models can reproduce fluent form without grounded understanding, while benchmarks like TruthfulQA show that fluent generation can still track human-like falsehood patterns unless alignment and evaluation explicitly target truthfulness. Future research needs tighter links between linguistic theory (especially pragmatics and discourse) and evaluation targets that reflect epistemic quality, not only surface coherence. 