---
category: Notes
title: LLM Prompt Engineering
tags: Tips
---

## Quick Reference

Frequent use cases

## Prompt Engineering with ChatGPT 4 and 5: A Progressive Tutorial


**Welcome!** This tutorial will guide you step-by-step in using ChatGPT (version 4.x and the upcoming 5.x) as an effective learning and research assistant. Even if you have no background in computer science, AI, or programming, you’ll learn how to craft prompts (the instructions or questions you give to ChatGPT) to get the best possible responses. We’ll start with the basics and gradually move to advanced techniques. Along the way, we’ll cover practical examples for academic study, research, literature analysis, translation, and more. By the end, you’ll have a toolkit of prompt strategies that should generalize well to future models, not just GPT-4. Let’s dive in!

#### Introduction to Prompt Engineering and ChatGPT

Prompt engineering is the art of writing **effective instructions** that guide a language model like ChatGPT to produce the output you want. Large Language Models (LLMs) **do not automatically know what kind of answer you need** – they rely on your guidance. A poorly worded or vague prompt can lead to irrelevant or confusing answers. A clear, tailored prompt, on the other hand, helps ChatGPT understand your request and respond accurately.

**How ChatGPT works (in a nutshell):** ChatGPT is an AI that generates text by predicting likely words based on the input and its training. It has a conversation memory, meaning it remembers what you’ve said earlier in the chat (up to a limit), and it follows instructions given in the conversation. There are usually **three roles** in a ChatGPT conversation: a **system message** (background instructions that set the stage or behavior), the **user message** (your prompt or question), and the **assistant message** (ChatGPT’s reply). In the ChatGPT interface, you mostly provide user prompts, but you can also set persistent preferences through **custom instructions** (which function like a system message to tell ChatGPT about your needs or style for all responses). We’ll discuss these more soon.

**Why does prompt engineering matter?** Because by crafting better prompts, you can control the output’s content, style, and usefulness. For example, if you’re doing research, you might need a detailed, structured answer with sources. Or if you’re studying a topic, you might want a simple explanation or an analogy. A well-designed prompt can make ChatGPT behave like a helpful tutor, a translator, a brainstorming partner, or a research assistant as needed.

_Example:_ Imagine you want ChatGPT to summarize an article. You could simply say: _“Summarize this text.”_ But a more **engineered prompt** yields a better result. Compare these two prompts:

*   **Prompt A (generic):** _“Summarize this text.”_
    
*   **Prompt B (specific):** _“Summarize the following text in 3-5 bullet points, focusing on the main arguments and key takeaways. Keep the tone neutral and avoid any unnecessary filler.”_
    

Prompt B is likely to produce a much clearer and more useful summary, because it specifies **format** (bullet points, 3-5 of them), **content focus** (main arguments, key takeaways), and **tone** (neutral). In contrast, Prompt A leaves these to the model’s guesswork. This simple example shows how adding detail and structure to your prompt steers the model’s output.

**Key takeaway:** Always aim to be clear and specific about what you want. In the next sections, we’ll build on this idea and introduce various techniques – from basic prompting to advanced methods – that can greatly improve ChatGPT’s performance as your assistant.

#### Basic Techniques for Effective Prompts

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

#### Zero-Shot Prompting: Asking Direct Questions

**Zero-shot prompting** means you ask the model a question or give an instruction _without_ providing any examples in the prompt. It’s the most straightforward way to use ChatGPT – just ask your question in natural language. GPT-4 is very powerful at zero-shot queries, especially for common tasks that were well-covered in its training data.

Use zero-shot prompting for **simple or well-known tasks**. It works great for things like factual questions, definitions, straightforward transformations, or summarization of a given text. For instance: _“What is photosynthesis?”_, _“Translate this sentence to French:”_, or _“Summarize the second chapter of **Pride and Prejudice**.”_ – these can often be answered correctly without any extra guidance, assuming the model has the knowledge. Indeed, if a task is something the model has likely seen during training (for example, general knowledge Q&A, basic math, common instructions), zero-shot is often sufficient.

However, **zero-shot relies heavily on how you phrase the question**. If the task is complex or unusual, a single-shot prompt might not be enough for the model to figure out exactly what you need. In such cases, we move to few-shot prompting (next section) or add additional instructions.

_Example (academic use):_ Say you want help analyzing a poem. A zero-shot prompt could be: _“Analyze the theme of solitude in the poem ‘Daffodils’ by Wordsworth.”_ ChatGPT-4 will likely produce a decent literary analysis because it knows about the poem. But if the analysis you get is too shallow or missing certain angles, you might then refine the prompt (adding _“focus on how the imagery contributes to the theme”_ or similar).

_Example (research assistance):_ You might ask, _“What are the latest findings on battery technology for electric cars?”_ Since this asks for **latest findings**, note that ChatGPT’s knowledge may be limited to its training cutoff (GPT-4’s knowledge is largely up to 2021, unless you have browsing enabled). If you don’t have browsing, the model might give general info and _could hallucinate specifics_ about recent research. So, zero-shot might not yield an accurate “latest” answer. In such cases, you either use a tool (if available) or phrase the question differently (e.g., _“Summarize key improvements in EV battery tech in the last decade”_ – the model can handle up to 2021 well). We’ll touch on tool use later, but it’s good to be aware of knowledge limits in zero-shot queries.

**Tip:** If ChatGPT gives an unsatisfactory answer on a zero-shot prompt, consider **rephrasing the question or adding detail**. Sometimes asking _the same question in a clearer way_ dramatically improves the result. For example, if _“Explain quantum computing”_ gives a too-complex answer, try _“Explain the concept of quantum computing in simple terms for a beginner.”_

**When to use zero-shot vs. not:** If your query is straightforward and you’re getting good answers, great. But for **complex, ambiguous, or specialized tasks**, zero-shot might fall short. In those cases, you’ll get better results by moving to the next techniques: one-shot and few-shot prompting.

#### Few-Shot Prompting: Guiding the Model with Examples

Few-shot prompting means providing **examples** of the task in your prompt so the model can learn from them **in context**. This is like saying, “Here’s how I want it done, now do it for a new case.” By giving one or more Q&A pairs or input-output examples, you essentially show the model the format or approach you expect. GPT-4 (and likely GPT-5) are very capable of learning patterns from just a few demonstrations in the prompt – this is called _in-context learning_. It’s powerful for steering the model on tasks that have a specific style or require understanding something beyond a basic instruction.

**One-shot prompting:** You provide **one example** along with the instruction. For instance, if you want the model to follow a particular format, you could do:

```vbnet

`**Instruction:** Convert the following sentence to Shakespearean-style English.

**Example:** Modern:  "Where are you going?"  Shakespearean:  "Whither goest thou?" **Now, convert this sentence:** Modern:  "Hello, how are you?"  Shakespearean:` 
```

In the above prompt, we gave one demonstration of how a modern sentence was converted to Shakespearean. The model will then continue and produce the Shakespearean version of _“Hello, how are you?”_. Even without explicitly explaining the task, the one-shot example clarifies it. This is useful when the task might be ambiguous or the model might not know exactly what format you need just from a description.

**Few-shot prompting:** You provide **multiple examples** (usually 2-5 examples, due to length limits) before asking the model to perform the task on a new input. This can further improve reliability, especially for more complex or nuanced tasks. Essentially, you are showing several instances of “when X happens, the correct output is Y,” which helps the model generalize to produce Y for new X.

For example, imagine you’re working on classifying movie review sentiments (positive/negative/neutral) but the reviews are phrased in tricky ways. A few-shot prompt could be:

```vbnet

`Classify the sentiment of  each review as  "Positive", "Negative", or  "Neutral".

**Examples:** Review:  "I absolutely loved the cinematography and the story had me in tears. Truly beautiful."  Sentiment: Positive Review:  "The movie was a bit long and I nearly fell asleep. It had some good moments though."  Sentiment: Neutral Review:  "Despite the hype, I found it boring and poorly written. Not worth the time."  Sentiment: Negative

**Now classify this new review:** "I think the film had great actors but the plot was a disaster and I regret watching it."  Sentiment:` 
```

Here we gave three examples (few-shot). The model will likely output _“Negative”_ for the new review, following the pattern and reasoning from the examples. Few-shot prompting is particularly handy for **domain-specific tasks**, or where the wording of the question might be interpreted in different ways. The examples reduce ambiguity by showing exactly what you expect as output.

A few things to keep in mind with few-shot prompts:

*   Make sure your examples are **correct and representative** of the task. The model will pick up on errors or inconsistencies, which could mislead it.
    
*   Keep the examples **consistent in format**. If one example output is a full sentence and another is just one word, the model might get confused. In the above example, each “Sentiment:” was one of the three labels; we wouldn’t want one of the example outputs to suddenly be a sentence like “It was a positive review” because that breaks the pattern.
    
*   Few-shot uses up some of the model’s context length (which is the limit of how much text the model can consider at once). GPT-4 supports large prompts (up to 8,000 tokens in standard, and some versions up to 32,000 tokens), so a few examples are usually fine. But don’t overdo it – adding 50 examples would likely exhaust the prompt length or be cut off. Research has shown that performance can improve with more examples up to a point, but in practice 3-5 good examples often suffice.
    

**When to use few-shot:** Whenever zero-shot isn’t giving the results you want, especially for more **complex tasks or those requiring a specific format/style**. For instance, if you want ChatGPT to output data in JSON format for an API, you can show one example of the desired JSON structure. Or if you want it to answer in the style of a particular author, you might give a short example Q&A in that style.

**Try it yourself:** If you’re doing academic research, try a few-shot prompt where you show the model how to cite sources. For example: provide a short paragraph and a fake citation as an example, then ask it to write a new paragraph with citations. Alternatively, for language learning, give one example of a sentence translated and explained word-by-word, then ask it to do the same for a new sentence. Observe how the output follows your example’s pattern.

#### Chain-of-Thought Prompting: Reasoning Step by Step

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

#### Self-Critique and Reflection: Letting the Model Check Its Work

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

Tool-Augmented Prompting: Extending ChatGPT’s Abilities with External Tools
---------------------------------------------------------------------------

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

#### Agentic Prompting: Making ChatGPT an Autonomous Assistant

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

#### Putting It All Together: Best Practices and Conclusion

We’ve covered a lot: from basic prompting tips to advanced techniques like chain-of-thought, self-critique, tool use, and agentic planning. Here’s a quick summary of how you can combine these in practice for various scenarios:

*   **Start simple, then iteratively refine:** Often you begin with a straightforward question (zero-shot). If the answer is off, clarify or add context. If it’s a complex problem, move to step-by-step or give an example (few-shot). Treat the conversation like a funnel: broad question → more guided → even more guided, until you get what you need. Remember, ChatGPT learns from the conversation – use that to your advantage by refining your prompt based on its last answer.
    
*   **Use the right tool from the toolkit:** If you notice the task is about reasoning or calculation, prompt it to show steps (CoT). If it’s about a tricky format or lesser-known task, provide an example (few-shot). If the answer seems suspect or incomplete, do a self-critique round. If the question requires outside info and you have plugins, use them – or paste in the info yourself. For big tasks, outline a plan with the AI (agentic approach).
    
*   **Be mindful of model limitations:** GPT-4 (and presumably 5) are incredibly capable, but they can still make mistakes, especially factual ones or misinterpretation if prompts are unclear. Always double-check critical facts. Use self-critique or ask the model to provide sources (though be careful: models can hallucinate fake sources; verifying with a real search is wise). If the model says something confidently, it’s usually correct, but not always – maintain a slight skepticism as you would when researching with any single source.
    
*   **Leverage system messages/custom instructions for persistent needs:** If you always want answers in a certain style (say you prefer concise answers, or always with metric units, or translated to Spanish), you can set that in a system message or the custom instructions feature of ChatGPT. For example, telling ChatGPT “Always answer with a brief summary first, then a detailed explanation” as a system-level instruction can save you from repeating that each time. Just remember that extremely long or complex system instructions could still be overridden or forgotten in very long conversations, but generally, they help steer the tone and behavior globally.
    
*   **Consider the _temperature_ if you have access to it:** The “temperature” setting (mostly available via API or certain modes) controls randomness/creativity. A high temperature (~0.8-1.0) gives more varied and creative responses, which is great for brainstorming, generating ideas, or creative writing. A low temperature (~0.2-0.3) makes the output more deterministic and focused, which is better for studying factual content or getting a consistent answer. In the ChatGPT interface, you might not set this directly (unless future versions allow choosing a “creative” vs “precise” mode, which essentially tweaks temperature behind the scenes). But if you ever feel the answers are too _random_ or too _dry_, this is why. Multiple tries of the same prompt will yield slightly different phrasings due to randomness. If you need a really stable answer, you can prompt in a way that leaves little room for variation, or use the API with low temperature. Conversely, for a creative push, you can ask the model to “give 3 different ideas” or just regenerate the answer to see alternatives.
    
*   **Stay ethical and within usage policies:** This is more of a meta-tip – as you get crafty with prompts, remember ChatGPT has rules (e.g., it won’t do certain harmful tasks or give disallowed content). If you ever encounter a refusal or safety filter, re-read your prompt to see if you unintentionally tripped some wire. Usually, rephrasing to clarify a legitimate intent can help. For example, instead of _“Explain how to pick a lock”_ (which might be disallowed as illicit behavior), you could frame a legitimate scenario like _“I’m writing a novel, and a character needs to pick a lock. Can you describe in theory how they might do it?”_ Always use these AI powers for good and learning!
    

Finally, **keep experimenting and learning**. Prompt engineering is part science, part art. With practice, you’ll develop an intuition for what phrasing or technique might get the best result. Don’t be afraid to try out different approaches – you can’t “break” the AI by asking creatively. Each version upgrade (GPT-4, GPT-4.1, GPT-5, etc.) might change some behaviors, but the core strategies you learned (clarity, context, examples, step-by-step reasoning, etc.) will remain valuable. In fact, as models get _more capable_, they also tend to follow instructions more precisely, so good prompts matter even more.

**In summary,** by progressively applying these prompt engineering techniques, you can turn ChatGPT into a **versatile tutor, translator, analyst, and research assistant** at your fingertips. Whether you’re analyzing literature, studying for exams, exploring a new academic field, or conducting research, the way you instruct the model makes all the difference. Use examples to teach it, ask it to show its work, have it double-check itself, and guide it through complex tasks. You’ll find that ChatGPT is not just a Q&A bot, but a powerful collaborator in learning and discovery – as long as you provide the right guidance. Happy prompting, and best of luck with your academic and research adventures!
