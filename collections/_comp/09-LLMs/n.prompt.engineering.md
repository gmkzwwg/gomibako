---
category: Notes
title: LLM Prompt Engineering for Study Assistance
tags: LLMs
---

## Goal Clearfication

一个 Cheatsheet 应包含：
1. Background and tacit Knowledge
2. Minimal explanation: how to use, when to use, perfect to do
3. Regular Options/Syntax 
4. Common Usage in Practice
5. Common Pitfalls in Practice
6. Minimal Example
7. Complete tutorial

## 作为学习助手，LLM 可以超越人类做到的事情是：

过去人力不可及的

之前需要穷人之一生之力的
1. 整理整个知识架构
2. 当获得碎片知识时，找出整个知识架构，和这个知识的位置
3. 知识的谱系学

人力整理效率低的
3. 元认知、元知识

隐性知识，难以收录成册的边缘知识

## Quick Reference

### Problem Solving

#### The answer lacks depth and merely lists simple nouns or questions 答案没有深度、只是简单的名词或问题罗列

Issues:
  - Simply asking "explain XX" triggers the AI's default popular science mode (resulting in list-like responses). 简单的“解释XX”会导致AI进入默认的科普模式（即列表化）。
  - Failing to specify a "literary prose" or "academic paper" style leads the AI to prioritize readability at the expense of depth. 未规定“散文体”或“论文体”会导致AI为了易读性而牺牲深度。
  - Not explicitly requesting the use of "first principles" or an "academic context" results in language that is overly colloquial. 未明确要求“使用第一性原理”或“学术语境”，会导致语言过于口语化

Solution: Utilize precise logical prompt keywords.
  - Generate high-quality prompts by considering Register (Style/Tone), Logical Architecture, and Depth Constraints. 从**语体风格（Register）**、**逻辑架构（Architecture）**与**深度约束（Depth Constraints）**角度生成高质量提示词。

| 中文 | English (Prompt-Optimized) | Explanation |
| --- | --- | --- |
| **进行学术性述评** | *Provide a scholarly critical review* | 强调评判性思维而非简单描述 |
| **产生深度讲义** | *Generate high-density, comprehensive lecture notes* | 约束输出的信息密度与教学结构 |
| **进行跨学科互文分析** | *Conduct cross-disciplinary intertextual analysis* | 触发不同知识领域间的关联建模 |
| **形成逻辑连贯的深度长文** | *Construct a logically coherent, long-form narrative* | 规避列表化，确保文本流（Textual Flow） |
| **具备严密的因果递进关系** | *Maintain rigorous causal progression and logical sequencing* | 强制逻辑链的完整性 |
| **采用可操作性的决策语言** | *Employ actionable, decision-oriented language* | 强调结果导向与实践逻辑 |
| **百科全书式的全面阐释** | *Provide an encyclopedic and exhaustive exposition* | 扩张知识覆盖的广度与深度 |
| **揭示底层逻辑** | *Uncover the first principles and underlying mechanics* | 引导模型进行本质论（Ontological）分析 |
| **使用学术语境** | *Maintain a formal academic register and scholarly discourse* | 统一语言的严肃性与专业性 |
| **拒绝碎片化输出** | *Avoid fragmented outputs and prioritize narrative cohesion* | 直接否定低质量的列表化模式 |
| **使用MEMC分析法**  | *Use a MECE framework* | 不重叠、不遗漏的分类 |

> MECE，是 Mutually Exclusive Collectively Exhaustive，中文意思是“相互独立，完全穷尽”。也就是对于一个重大的议题，能够做到不重叠、不遗漏的分类，而且能够借此有效把握问题的核心，并解决问题的方法。该方法被应用于高等教育课程设计中的深度理解策略。

#### The answer is filled with imperative statements using "you" and "I" 答案中充斥着“你”“我”命令式语句

Linguistics 语言学:
  - `Impersonalities / Impersonal Voice` 非人称语态

Laws and Academic Writing 法律和学术写作:
  - `Procedural Neutrality` 程序性中立 `Normative Statement` 规范性陈述

Literature 文学:
  - `Limited Third-person Perspective` 第三人称限制视角

### For Knowledge Architecture / Minimal Tutorial

1. Ontology
2. Core Concepts and First principles
3. Full Skill Stack / (Layerd) Knowledge Structure
4. Clearcut Compare (e.g. Literary Criticism v.s. Literary Theory)
5. Worked Examples
6. Key  Milestones
7. Casual Chain
8. Common Pitfalls
9. Gate of Theory / Meta-assumptions

## Meta Prompting

### For Knowledges

**For academic review papers**:

> 我需要你提供 prompt engineering 方面的专业帮助。我想用一篇结构化的英语文章，全面叙述整个[xxx]的学术体系，Maintain a formal academic register and scholarly discourse，Uncover the first principles and underlying mechanics，揭示整个理论形成的逻辑链，Construct a logically coherent, long-form narrative。章节应足够涵盖所有主要内容。你给出优化后的 prompt that use a MECE framework in English

**For Data Sheets**

> 我需要你提供 prompt engineering 方面的专业帮助。我想用 markdown table 的形式，列举和对比[xxx]的主要信息和数据，Use a MECE framework, Maintain a formal academic register, include LaTeX for formulas where necessary, Only use verified empirical data; indicate N/A if unknown, 你给出优化后的提示词，英文

**For Academic Structure**

> 我需要你提供 prompt engineering 方面的专业帮助。我需要用大概一页纸的长度，用高度结构化的名词化条目，来展现[xxx]学科的整体知识体系和架构，Uncover the first principles and underlying mechanics，揭示各个理论互相依赖的关系，或发展的顺序。在必要的地方添加主要理论者的名称和关键时间、milestone、关键书籍或论文。你给出优化后的提示词，英文


**for minimal knowledge or tutorial**

> Provide a minimal viable tutorial for [XXX] so I can start practicing immediately. Focus only on the '80/20'—the 20% of core concepts that handle 80% of real-world use cases. Please include: 1. Essential setup 2. The most common workflow 3. One concrete example

> Give me a TL;DR summary of [XXX] for a first-time practitioner. What is the absolute minimum I need to know before I 'run' this? Skip the fluff and give me the 'Checklist' and 'The Big Picture'.

**for Sheets**
```
# Role
You are a Senior Data Analyst and Research Assistant specialized in [领域，如：法学与人工智能交叉研究].

# Task
Please create a comprehensive, multi-dimensional table regarding [主题内容].

# Table Structure & Dimensions (Columns)
The table must include, but is not limited to, the following columns:
1. [维度1: 核心定义/名称]
2. [维度2: 关键特征/属性]
3. [维度3: 适用场景/用例]
4. [维度4: 潜在风险/局限性]
5. [维度5: 跨学科关联 (例如：法律依据/技术实现)]
6. [维度6: 备注/参考来源]

# Exhaustion Strategy (Rows)
To ensure the table is "complete," please scan through the following perspectives:
- [视角A: 历史演进]
- [视角B: 不同利益相关者 (开发者、用户、监管者)]
- [视角C: 地缘政治/不同国家标准]
- [视角D: 技术底层架构]

# Constraints
- Use Markdown format.
- Do not summarize or omit items for brevity; "exhaustiveness" is the priority.
- If data is uncertain, mark as "Inferred" or "Requires Verification."
- Ensure the logical flow from row to row is coherent.

# Execution
First, list the proposed row categories to confirm scope. Then, generate the full table.
```

## For Pitfalls

**Force AI to generate Common Pitfalls**

> "As a research assistant, I want to master [学科名称]. To build a robust mental model, please provide a comprehensive 'Map of Failure' including:  
> **Conceptual Misconceptions**: Key terms that are frequently misunderstood or oversimplified (the 'pseudo-knowledge').  
> **Procedural/Methodological Errors**: Common mistakes in the actual application or research process of this field.  
> **Pedagogical Pitfalls**: Why traditional learning paths for this subject often fail or lead to dead ends.  
> **Expert vs. Novice Gap**: Where do beginners usually get stuck compared to how experts actually think?  
> **Boundary Conditions**: Under what specific assumptions do the core theories of this field break down?  
> Please present this in a rigorous, analytical style, avoiding clichés."

**Anti-Tutorial For begginners**

> "Give me a 'Anti-Tutorial' for [学科/技术]. Instead of telling me what to do, tell me what NOT to do. List the top 10 most common mistakes in concepts, methods, and learning strategy. Also, identify the 'Invisible Hurdles' that beginners don't even know they are tripping over."

## Prompt Engineering with ChatGPT 4 and 5: A Progressive Tutorial

This tutorial will guide you step-by-step in using ChatGPT (version 4.x and 5.x) as an effective learning and research assistant. Even if you have no background in computer science, AI, or programming, you’ll learn how to craft prompts (the instructions or questions you give to ChatGPT) to get the best possible responses. We’ll start with the basics and gradually move to advanced techniques. Along the way, we’ll cover practical examples for academic study, research, literature analysis, translation, and more. By the end, you’ll have a toolkit of prompt strategies that should generalize well to future models, not just GPT-4. Let’s dive in!

> 本教程将一步一步引导你，学习如何将 ChatGPT（4.x 版本以及 5.x 版本）作为高效的学习与研究助手来使用。即使你没有计算机科学、人工智能或编程背景，也可以通过本教程学会如何编写提示（即你提供给 ChatGPT 的指令或问题），从而获得尽可能优质的回答。我们将从基础内容入手，逐步过渡到高级技巧。在此过程中，会涵盖学术学习、研究、文学分析、翻译等多种实际应用示例。完成本教程后，你将掌握一套提示策略工具箱，这些策略不仅适用于 GPT-4，也能较好地泛化到未来的模型。现在开始吧。

### Introduction to Prompt Engineering and ChatGPT

Prompt engineering is the art of writing **effective instructions** that guide a language model like ChatGPT to produce the output you want. Large Language Models (LLMs) **do not automatically know what kind of answer you need** – they rely on your guidance. A poorly worded or vague prompt can lead to irrelevant or confusing answers. A clear, tailored prompt, on the other hand, helps ChatGPT understand your request and respond accurately.

> 提示工程（Prompt Engineering）是一种编写有效指令的技术，其目标是引导像 ChatGPT 这样的语言模型生成你所期望的输出。大型语言模型（LLMs）并不会自动知道你需要什么样的回答——它们依赖于你的引导。一个措辞含糊或不清晰的提示，往往会导致无关或令人困惑的回答；而一个清楚、针对性强的提示，则有助于 ChatGPT 准确理解你的需求并给出恰当的回应。

**How ChatGPT works (in a nutshell):** ChatGPT is an AI that generates text by predicting likely words based on the input and its training. It has a conversation memory, meaning it remembers what you’ve said earlier in the chat (up to a limit), and it follows instructions given in the conversation. There are usually **three roles** in a ChatGPT conversation: a **system message** (background instructions that set the stage or behavior), the **user message** (your prompt or question), and the **assistant message** (ChatGPT’s reply). In the ChatGPT interface, you mostly provide user prompts, but you can also set persistent preferences through **custom instructions** (which function like a system message to tell ChatGPT about your needs or style for all responses). We’ll discuss these more soon.

**Why does prompt engineering matter?** Because by crafting better prompts, you can control the output’s content, style, and usefulness. For example, if you’re doing research, you might need a detailed, structured answer with sources. Or if you’re studying a topic, you might want a simple explanation or an analogy. A well-designed prompt can make ChatGPT behave like a helpful tutor, a translator, a brainstorming partner, or a research assistant as needed.

_Example:_ Imagine you want ChatGPT to summarize an article. You could simply say: _“Summarize this text.”_ But a more **engineered prompt** yields a better result. Compare these two prompts:

*   **Prompt A (generic):** _“Summarize this text.”_
    
*   **Prompt B (specific):** _“Summarize the following text in 3-5 bullet points, focusing on the main arguments and key takeaways. Keep the tone neutral and avoid any unnecessary filler.”_
    

Prompt B is likely to produce a much clearer and more useful summary, because it specifies **format** (bullet points, 3-5 of them), **content focus** (main arguments, key takeaways), and **tone** (neutral). In contrast, Prompt A leaves these to the model’s guesswork. This simple example shows how adding detail and structure to your prompt steers the model’s output.

**Key takeaway:** Always aim to be clear and specific about what you want. In the next sections, we’ll build on this idea and introduce various techniques – from basic prompting to advanced methods – that can greatly improve ChatGPT’s performance as your assistant.

### Basic Techniques for Effective Prompts

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


## Synthesizing Book Knowledge with ChatGPT: Tiago Forte’s Workflow

Many knowledge workers read voraciously but often find that **ideas slip away** if not actively captured. As Tiago Forte notes, he once raced through “50 books a year” only to realize “none of this is sticking – I’m reading thousands of words every month but it’s just passing in one ear and out the other”. To truly learn from books, Forte switched to **reading fewer books and summarizing them in his own words**, so the knowledge “really sunk in” and became a durable “building block” he could reuse. However, writing a good summary by hand is very time-consuming. When ChatGPT arrived, he saw an opportunity: could an AI produce the same insight-packed summaries in a **fraction of the time**?

Experiments showed that _ChatGPT alone_ (without the book text) tends to give only **bland, superficial overviews** (too brief, clichéd, missing key surprises). The problem is that ChatGPT _only_ “knows” books secondhand – it cannot see the actual text you read. As Forte explains, “a summary of a summary is never good”. His solution was to **feed ChatGPT his own notes**. He reads and highlights the actual ebook (e.g. on Kindle), uses Readwise to automatically sync all highlights into a note-taking app, then works those notes down into a concise outline before asking ChatGPT to craft the summary. In short: **harness the AI, but ground it in your own curated excerpts**.

### Step 1: Capture Key Highlights in Digital Notes

The first step is **active reading**. As you read the book (on an e-reader or app such as Kindle), highlight passages that _jump out_: the author’s main argument, vivid examples, striking facts, or anything that feels surprising or _resonant_. (Forte actually highlights “all the points I found most surprising, resonant, \[or\] thought-provoking”.) Use a tool like **Readwise** to automatically collect those highlights into one centralized note repository. For example, Forte reads _Where Good Ideas Come From_ on his Kindle app and all highlights sync via Readwise into his digital notes. This yields a single document containing _all_ the raw excerpts you’ve marked (often thousands of words).

- Use an e-reader or reading app (e.g. Kindle, Apple Books) to **mark up the text** as you go. Highlight the main thesis statements, key definitions, memorable quotes, and especially anything **unusual or personally meaningful**.
- Employ a sync service (like Readwise) to **export those highlights** into your note-taking system. Readwise aggregates highlights from books, articles, PDFs, etc., so all your clippings appear together in one app. This means you can work with your notes in Evernote, Notion, Obsidian, or any tool of your choice.
- The result of Step 1 is a long note (often 5–15 pages) of **unprocessed highlights**. These are all things you thought were interesting or important, but they usually contain **too much detail** for ChatGPT’s prompt window (which tops out around 1,000–1,200 words).

### Step 2: Progressive Summarization – Bold the Best Ideas

With the raw highlights in front of you, the next move is **distillation**. Forte uses his “Progressive Summarization” technique: on a first pass, he goes through the highlights and **bolds** only the sentences (or phrases) that capture the _core ideas_. In other words, he looks for **keywords, key phrases, and key sentences that feel like the essence of the idea**. This is done with no strict formula – you choose what jumps out. For example, any explicit statement of the book’s thesis is _worth a bold_, since the author has already identified the main message for you.

> **Why “bolding”?** Imagine you have a page of text and you want to highlight its essence. Bolding is like applying a second, thicker marker: it forces you to **zero in** on the most important fragments. This first-pass editing trims the page of highlights down by about half or more, keeping only the “best of the best” points.

Key tips for this step:

- **Main Arguments:** Always bold the book’s central claims. If the author explicitly states “the argument of this book is…,” that sentence goes in bold. It encapsulates the core theme.
- **Unique Insights:** Bold analogies, examples, or statements that are especially **creative or surprising**. Forte notes that good writing often hides in “interesting unique unusual details”, so mark those.
- **Personal Resonance:** Bold what spoke to you personally. Since you saved highlights that moved you, bolding them again selects your favorite insights. Forte said his notes already contained only “valuable” content, and now he’s choosing _the best of the best_.

After this bolding pass, each note typically has a handful of bold lines among all the highlights. You’ve effectively _compressed_ your reading: each bolded sentence now carries the load of what mattered. (In Tiago’s example, the original highlights were ~8,000 words, and bolding reduced that dramatically.)

### Step 3: Build a Structured Outline from the Highlights

The bolded sentences now become the raw material for an outline. In this step, create a new note (or document) and **copy the bolded points into it as bullet points**, organizing them hierarchically. Start with the book’s thesis at the top, then list supporting ideas as sub-bullets. This outline tells ChatGPT **which points are main ideas and which are supporting details**.

Forte suggests the following approach:

- Split your screen or use two notes side-by-side. On the left, view the note with bolded highlights; on the right, create a fresh “Book Outline” note.
- For each bolded line you’ve marked, decide if it’s a _core point_ or a _support detail_. Copy the really critical ones into the outline on the right as main bullets. You don’t have to use _every_ bolded line – this is another chance to filter. (Forte explicitly says, “I shouldn’t do all of them…deciding if it’s truly so good it must be in my summary”.)
- Label and format the outline clearly. For example, give the outline note a title like “Outline – _Where Good Ideas Come From_ Summary” and use indented bullets for sub-points.

This is effectively **reverse-engineering the book’s structure**. You’re extracting the flow that the author may have built into the text and making it explicit. Forte notes that by outlining these points, “you are extracting the structure that is already part of the book” – information that was only implicit in the text is now visible in bullet form. The outline might look like:

- **Main Argument:** \[Author’s thesis sentence\]
  - _Supporting Idea 1:_ \[Bolded sentence providing evidence or explanation\]
  - _Supporting Idea 2:_ \[Another key point or example\]

- **Secondary Theme:** \[Second big idea, bolded sentence\]
  - _Example/Detail:_ \[Bolded detail\]

By the end of Step 3, you have a concise framework of major ideas and their anchors from the book. This outline (often only a few hundred words) is perfectly structured for ChatGPT to work with.

### Step 4: Summarize with ChatGPT Using a Custom Prompt

With the outline in hand, the final step is to ask ChatGPT to generate the narrative summary. Copy your entire outline into the ChatGPT prompt box, and use a guiding instruction that tells the AI how to use it. Crucially, Forte’s prompt **both provides the outline and allows ChatGPT to draw on external knowledge**. He frames it like this:

> “You don’t want \[ChatGPT\] to only use what you’re providing; you want it to add or incorporate what you’re giving it into other material that it finds on the web”.

In practice, the prompt might say: “Using the following outline of key points from _\[Book Title\]_, write an in-depth summary. You may incorporate additional knowledge or examples as needed. Ensure the writing includes interesting, specific details rather than vague generalities.” The idea is that the outline anchors the content, but ChatGPT is free to flesh it out.

To nudge the output toward quality, Forte explicitly adds a note about details: **“good writing is really all about details… interesting unique unusual details”**. (In his video he actually appends a sentence in the prompt to that effect before pasting the outline.) In short, the prompt tells ChatGPT to use the outline as a skeleton but **meat it out with rich, concrete content**.

Within seconds, GPT-4 will spit out a polished summary. In Forte’s demo it took about 30 seconds. The result was a **far superior summary**: much longer, more detailed, and more specific than the generic version ChatGPT would write on its own. It included multiple supporting points and examples, fully honoring the nuances he had captured. In his words, it was _“a better summary on any dimension”_ – essentially, high quality at a fraction of the effort.

## Tools and Workflow Integration

This method relies on a small set of digital tools working together:

- **E-reader/App (Kindle, iPad, etc.)** – for the original reading and highlighting. Forte reads on Kindle, which lets him mark passages as he goes.
- **Readwise (or similar)** – a service that **syncs highlights** from your e-reader into a notes app. Readwise imports all your Kindle highlights so that you have a single repository of excerpts.
- **Note-taking app (Notion, Evernote, Obsidian, etc.)** – this is where you edit and organize. You paste your Readwise highlights into a note, do the bolding and outlining there, and later copy the outline out. The app doesn’t much matter as long as it supports text formatting and easy copy-paste.
- **ChatGPT (GPT-4)** – the AI engine that generates the final summary. You input the outline and prompt into ChatGPT’s interface (chat.openai.com or equivalent), and it does the writing.

Each tool has its role: Readwise acts as the pipeline for **highlight curation**; the note app is the **workspace** for your progressive summarization and outline; ChatGPT is the **writer** that quickly turns your outline into prose. Using these in concert automates much of the mechanical work while keeping **human judgment** on the key points.

## Cognitive Benefits and Best Practices

Forte’s process isn’t just a hack – it’s grounded in solid learning principles. By forcing yourself to identify and articulate the **core ideas**, you engage in **active learning** and retrieval practice. Writing a summary in your own words helps the knowledge “sink in” much more than passively reading. In effect, each book summary becomes a “knowledge building block”that you can refer back to, remix, or apply in future projects.

The multi-layer approach (read → highlight → bold → outline → AI-write) balances **compression vs. context**. You compress the content by focusing on essentials, but by preserving the sequence of your highlights (and even bolding within them), you keep enough context that nothing crucial falls through the cracks. As Tiago’s Progressive Summarization model describes, each layer (capturing, bolding, outlining) is done **while reviewing the content**, so you’re not working in a vacuum – you have the context right there if you need it.

The final AI step then **re-expands** the outline into a fluent narrative. Because your outline is already distilled, ChatGPT has clear guidance on what matters most. The prompt’s emphasis on “interesting details” forces the AI to avoid generic clichés and instead include specific examples – the very opposite of the summary it would have produced from scratch. The result is a summary that not only reads well but faithfully reflects the book’s unique insights.

## Results and Efficiency

Forte reports that this workflow **dramatically outpaces** manual summarizing. In his demo, ChatGPT generated the full summary in about 30 seconds – roughly **20% of the time** it would have taken him to write it himself. He estimates saving 70–80% of the effort. Yet the quality did not suffer; on the contrary, the AI-enhanced summary was richer and more accurate than his unaided attempt or what ChatGPT could do alone.

For example, he compares his old practice of asking ChatGPT for a summary (with no notes) to using the outline workflow. The raw ChatGPT summary was short and generic, whereas the outline-guided summary was _“far longer…far more detailed…more specific”_ with _“way more supporting points”_. This shows that providing curated content allows AI to produce nuanced output rather than vague overviews.

In practical terms, this means knowledge workers can read **fewer but more impactful books**, ensuring what they do read is understood and retained deeply. Forte encourages those who consume practical, actionable books to try this method: by combining human highlights with AI writing, one can quickly convert reading into _usable_ knowledge.

**Key takeaways:**

- Read actively and highlight what strikes you (main thesis, surprises). Use a tool like Readwise to save all highlights automatically.
- Refine those highlights by bolding the single most important phrases or sentences (Progressive Summarization). This zeroes in on each book’s core ideas.
- Organize the bolded points into a structured outline (bullets or headings), which reveals the book’s argument flow and signals priority for the AI.
- Feed the outline to ChatGPT with a prompt that encourages detail and use of outside knowledge. The AI then writes a coherent, detailed summary far faster than manual writing.
- The result is a high-quality summary that strengthens memory (each summary is a “knowledge building block”) and lets you apply the book’s ideas in work and writing with minimal extra effort.

This method exemplifies a meta-principle of knowledge work: **augment human judgment with AI**. You do the critical thinking (what to highlight and outline); ChatGPT does the tedious writing. The combination preserves the depth of understanding while boosting efficiency. For writers, researchers, and anyone building a “second brain,” it’s a practical workflow for turning passive reading into active, reusable insights.

**Sources:** Transcript of Tiago Forte’s video _“The BEST Way to Summarize Books with ChatGPT”_ and related Forte Labs writings on summarization. These explain each step of the process, its rationale, and the dramatic improvement in summary quality and speed.

# 面向实践者与研究者的 Prompt Engineering 精要教程（2026 视角）

## 执行摘要

Prompt engineering（提示工程）可被视为“把任务需求、约束、上下文与评测目标，编译成可稳定驱动大模型行为的上下文程序（context program）”。它既包含**手工提示设计**（清晰指令、示例、结构化输出、约束与失败模式修补），也包含更系统化的**自动优化与可复现评测**（自动生成/搜索/进化提示、把提示当参数或可学习对象、把提示链/agent 编排当程序并做编译优化）。这一视角在近几年从“写提示”逐步走向“构建可测的 LLM 系统”，尤其在 RAG、工具调用与代理式工作流中更明显。

从方法谱系看：少样本/上下文学习让“提示即任务接口”成为主流（Brown et al., 2020）；链式思维/自一致性/树思维等把推理过程显式化并引入搜索与投票（Wei et al., 2022; Wang et al., 2022; Yao et al., 2023）；RAG 把外部知识作为“非参数记忆”注入，提升事实性并便于更新（Lewis et al., 2020；Asai et al., 2023）。与此同时，安全对抗（提示注入、越狱、对齐绕过）迫使提示工程与系统工程（输入隔离、权限最小化、红队评测）捆绑推进。

本文以“分类—工作流—评测—安全—配方—工具—前沿”组织，强调**可操作**与**可验证**：任何提示策略都应对应可测指标（如 HELM 的多维指标、BIG-bench 的能力压力、TruthfulQA 的事实性风险），并通过自动化回归测试避免“凭感觉调参”。

## 背景与范围：定义、分类与边界

**定义与范围**：狭义 prompt engineering 指对“离散文本提示（hard prompts）”的设计与迭代；广义则涵盖从离散提示到**软提示/连续提示**（prompt tuning、prefix-tuning）乃至**参数高效微调（PEFT）**与**指令微调/对齐训练**的整套“控制模型行为”的技术栈。

**常用分类（taxonomy）**可按“输入构造—推理机制—外部能力—安全约束”划分：  
- Prompt design / instruction engineering：明确角色、目标、受众、格式、约束与示例；并将复杂任务拆分为可验证子任务。  
- Few-shot / in-context learning：通过少量示例传递隐式规范与输出形态（Brown et al., 2020）。  
- Chain-of-thought（CoT）与推理脚手架：CoT、自一致性、least-to-most、plan-and-solve、tree-of-thoughts 等。  
- RAG：检索增强生成，外部知识+生成（Lewis et al., 2020），以及自反式 RAG（Self-RAG）等“按需检索+自评”。  
- Tool/agent prompts：把模型嵌入循环，交替“思考—行动—观察”，典型如 ReAct。  
- Safety/guardrails：对齐训练（RLHF、Constitutional AI）与系统级防护（prompt injection 防御、红队与系统卡）。

## 方法与工作流：从手工技巧到自动化优化

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

## 评测与基准：从“效果”走向“鲁棒性与可信度”

Prompt engineering 的工程化关键是把“好不好”分解为可测维度：任务成功率、鲁棒性（提示扰动/输入噪声/长文）、校准与不确定性、真实性/事实性、指令遵循、毒性与风险等。HELM 的贡献之一是把评测从单一准确率扩展到包含校准、鲁棒性、偏见/毒性与效率等多指标，并提供统一提示与输出记录以便复现。

**能力压力测试**常用 BIG-bench 与 MMLU：BIG-bench 强调“超出现有能力”的任务集合与规模效应；MMLU 提供跨学科多任务考试式评测，适合做“总体能力变化”的粗测。 但基准也可能被“过拟合提示”或数据污染影响，因此需要自建私有 eval 与持续回归（尤其当模型升级、提示重写、RAG 索引更新时）。

**事实性/忠实性（faithfulness）**方面，TruthfulQA 之类基准揭示“规模增大不必然更真实”，并推动把“引用证据、允许不知道、约束来源”纳入提示与系统设计。 对 RAG 系统，可用 RAGAS 这类无需人工标注的多维指标拆分检索相关性与生成忠实性，加快迭代。

## 安全、对齐与对抗鲁棒：把提示当作攻击面

将 LLM 集成到检索、浏览、工作流编排后，“数据与指令边界”变得模糊，prompt injection（尤其 indirect injection）成为突出风险：攻击者可把恶意指令埋入网页/文档，使系统在检索后把它当成上层指令执行。 另一类是“越狱/对齐绕过”：自动构造通用后缀诱导模型输出被禁止内容，且具有跨模型迁移性。

**防护思路（优先级从系统到提示）**：  
1) **系统隔离**：把检索内容标记为不可信数据，永不允许其覆盖系统/开发者指令；对工具调用设置最小权限与可审计日志。  
2) **输入净化与解析**：对外部文档进行剥离（去除隐藏指令、HTML/markdown 载荷）、分段与来源白名单。  
3) **输出约束与过滤**：结构化输出校验、规则/策略过滤、拒答策略一致性。对齐训练路线包括 RLHF（InstructGPT）与 Constitutional AI（用原则监督自改进）。  
4) **红队与持续评测**：系统卡与外部红队实践表明，应把对抗测试作为发布与迭代流程的一部分，而非一次性检查。

## 实用配方：中文 prompt 模板与例子（可直接改）

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

## 工具与可复现实验：从“写提示”到“测试提示”

**版本化与回归测试**：建议把 prompt 当代码：用 Git 管理；用固定样本集做回归；把“提示+模型+温度+检索配置”作为完整实验签名，并在模型升级时运行对比。 代表性工具/框架：OpenAI Evals（评测框架）、promptfoo（本地 prompt/agent/RAG 测试与红队）、LangChain/LlamaIndex（RAG 与代理组件化）、DSPy（提示链编译优化）。

```python
# 伪代码：prompt 回归测试（最小骨架）
cases = load_jsonl("eval_cases.jsonl")   # {id, input, gold(optional), rubric}
prompt = load_text("prompt_v12.txt")

for c in cases:
    y = llm(prompt.format(**c["input"]), temperature=0.2)
    score = grade(y, c["rubric"], gold=c.get("gold"))  # 规则/LLM-judge/混合
    log(id=c["id"], output=y, score=score)

report = aggregate_scores()
assert report["mean_score"] >= threshold
```

```python
# 伪代码：RAG pipeline（检索→拼接→生成→引用检查）
docs = load_corpus()
index = build_vector_index(docs)     # chunk + embedding
def answer(query):
    ctx = index.retrieve(query, k=5)
    prompt = make_rag_prompt(query, ctx)   # 强制引用/不够就说不够
    y = llm(prompt)
    return postcheck_citations(y, ctx)     # 忠实性/引用覆盖率
```

（RAG 的基本工程分解与 LangChain/LlamaIndex 文档一致；评测层可用 RAGAS 之类指标加速迭代。）

## 研究前沿与注释书目（精选，偏 2020–2026）

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