---
title: Agentic AI Course Transcripts
layout: print
categories: Notes
subclass: AI
---

## P1. Welcome

Welcome to this course on agentic AI. When I started using the term “agentic” to describe what I saw as an important and rapidly growing trend in how people were building LLM-based applications, I did not realize that marketers would get hold of the term and put it on almost everything in sight. That has caused the hype around agentic AI to skyrocket.

The good news is that, setting aside the hype, the number of truly valuable and useful applications built using agentic AI has also grown rapidly, even if not quite as rapidly as the hype. In this course, I would like to show you best practices for building agentic AI applications and open up new opportunities in terms of what you can build.

Today, agentic workflows are used to build customer support agents, conduct deep research and write insightful reports, process tricky legal documents, and examine patient information to suggest possible medical diagnoses. On many of my teams, a lot of the projects we have built would have been impossible without agentic workflows. Knowing how to build applications with them is an important and valuable skill in AI.

**One of the biggest differences between people who build agentic workflows effectively and those who struggle is the ability to drive a disciplined development process focused on evaluations and error analysis.** In this course, I will explain what that means and show you how to become good at building these workflows. These skills can open up job opportunities as well as opportunities to build useful software yourself.

With that, let's move on to the next video and dive into what agentic workflows are.

## P2. What Is Agentic AI?

What is agentic AI, and why are agentic workflows so powerful? Many of us use large language models, or LLMs, by prompting them to write an essay on a topic. I think of this as asking a human—or an AI—to type an essay from the first word to the last, all in one go, without ever using backspace. People do **NOT** do their best writing when forced to work in this completely linear order, and neither do AI models. Despite that constraint, LLMs do surprisingly well.

An agentic workflow looks different. You might first ask the model to write an essay outline and list the topics to cover. It can then decide whether it needs to do web research, download relevant pages, and write a first draft. After that, it can read the draft, identify parts that need revision or more research, and revise it. This process involves thinking, researching, revising, and thinking some more. It can take longer, but it often delivers a much better work product.

**An agentic AI workflow is a process in which an LLM-based application executes multiple steps to complete a task.** In this example, an LLM writes the initial outline and generates search terms for a web search API. You feed the downloaded pages into an LLM to write the first draft, then perhaps use another LLM to reflect on what needs revision. Depending on the design, you might add a human review step so the system can request help checking key facts before revising the draft.

One of the key skills you will learn in this course is how to take a complex task, such as writing an essay, and break it into smaller steps that an agentic workflow can execute. Knowing how to decompose the task and build components that perform each step well is a tricky but important skill. It determines your ability to build workflows for a wide range of applications.

A running example in this course, which you will build alongside me, is a research agent. You can enter a research topic such as, “How do I build a new rocket company to compete with SpaceX?” I do not personally want to compete with SpaceX, but if you do, you could ask a research agent to help with the background research.

The agent starts by planning the research, including calling a web search engine and downloading pages. It then synthesizes and ranks findings, drafts an outline, has an editor agent review it for coherence, and generates a comprehensive Markdown report. The report shown here covers the background, findings, and other considerations for building a rocket company. It appropriately points out that this would be a tough startup to build.

By finding and downloading multiple sources and examining the material carefully, this workflow produces a more thoughtful report than simply prompting an LLM to write an essay. In my work, I have built specialized research agents for legal documents and compliance, healthcare, and business or product research. I hope that this example teaches you general workflow skills and gives you ideas you can use if you ever build a custom research agent.

*Breaking a complex task into manageable steps can produce better results than asking a model to do everything in one pass.* Another frequently discussed question is how autonomous these agents should be. The example you just saw was relatively complex and highly autonomous, but simpler workflows can also be valuable. In the next video, we will look at degrees of autonomy and how they affect what you build and how difficult it is to build.

## P3. Degrees of Autonomy

Agents can be autonomous to different degrees. A few years ago, I noticed a growing debate in the AI community about what counts as an agent. Someone would write a paper saying, “I built an agent,” and others would respond, “That is not really a true agent.” I felt that this debate was unnecessary, which is why I started using “agentic” as an adjective. Instead of making a binary distinction, we can acknowledge that systems can be agentic to different degrees and get on with building them.

When I was preparing a talk on agentic reasoning, one of my team members said, “Hey, Andrew, we don't need another word. We already have ‘agent.’ Why are you using ‘agentic’?” I decided to use it anyway and later wrote about the idea in a newsletter and on social media. Rather than arguing over which systems to include or exclude as true agents, we could recognize different degrees of agentic behavior. I think that helped us move past the debate and focus on building useful systems.

Consider a relatively low-autonomy agent that writes an essay about black holes. An LLM generates a few search queries, and the developer specifies a fixed sequence: call a web search engine, fetch some pages, and use those pages to write the essay. The sequence of steps is predetermined, and this can work reasonably well.

Throughout this course, I will use red to denote user input, such as a query or an input document. Gray boxes denote calls to an LLM. Green boxes, such as the web search and web fetch boxes, indicate actions performed by other software—for example, calling a search API or running code to retrieve a page.

A more autonomous agent might decide whether it wants to search the web, search recent news, or look for research papers on arXiv. The LLM chooses which source to use. It may then decide how many pages to fetch and whether a downloaded PDF needs to be converted to text. After writing an essay, it can decide whether to reflect, revise, or go back and retrieve additional material before producing the final output.

Even within the research-agent example, there is a spectrum. A less autonomous system follows a sequence determined by a programmer. A more autonomous one makes more decisions itself, including decisions about the sequence of steps. **Autonomy is a matter of degree, rather than a binary label.**

For less autonomous systems, the steps and tool calls are usually predetermined. Most of the model's freedom lies in the text it generates. Semi-autonomous agents can make some decisions and choose among predefined tools. At the other end of the spectrum, highly autonomous agents may determine their own sequence of actions and even write new functions—sometimes described as creating new tools—to execute.

You will learn to build applications at different points on this spectrum. There are many valuable business applications at the less autonomous end. More autonomous applications are also being developed, but they are generally harder to control and more unpredictable. Building them remains an active area of research.

*An application does **NOT** need a high degree of autonomy to be valuable.* In the next video, we will look more closely at the benefits of agentic workflows and why they enable things that earlier LLM-based applications could not do.

## P4. Benefits of Agentic AI

I think the biggest benefit of agentic workflows is that they let us perform tasks effectively that previously were not possible. Other benefits include parallelism, which can make some operations faster, and modularity, which lets us combine effective components from different sources.

My team collected data on HumanEval, a coding benchmark that tests whether models can write programs to complete specified tasks. GPT-3.5, the model behind the first publicly available version of ChatGPT, got about 40% of the tasks right when asked to generate code directly. GPT-4 was a much better model and reached about 67% with the same non-agentic approach.

However, the improvement from GPT-3.5 to GPT-4 was smaller than the improvement we could achieve by putting GPT-3.5 into an agentic workflow. Using techniques you will learn later, we can ask it to write code, reflect on it, and improve it. That can bring performance to much higher levels. GPT-4 also performs better when used in an agentic workflow.

**In this example, improving the workflow made a bigger difference than moving from one generation of model to the next.** The model matters, but the way we organize its work can make an enormous difference too.

Another benefit is parallelism. Suppose an agent is writing an essay about black holes. We could run LLM calls in parallel to generate different search queries. Each search might identify three useful pages, giving us nine pages to retrieve. A person doing the research would typically work through the material sequentially, whereas the workflow can download all nine pages in parallel and feed the results into an LLM to write the essay.

An agentic workflow may take longer than a single direct-generation call, but it can still perform this research much faster than a person working through the sources one at a time. The relevant comparison depends on the task and the amount of work involved.

Modularity also gives us flexibility. When building a workflow, I often look at individual components and try alternatives. For web search, there are multiple options, including Google through Serper, Bing, DuckDuckGo, Tavily, and You.com. We can replace a search component or add a news search engine to find recent breakthroughs in black hole science.

Likewise, we do **NOT** have to use the same LLM for every step. I often try different models and providers to see which works best for each part of the system. One model might be effective at generating search queries, while another is better at synthesizing a final report.

*Agentic workflows offer better task performance, opportunities for parallel execution, and the flexibility to improve individual components.* Next, we will look at how to break useful applications into the steps that make up a workflow.

## P5. Task Decomposition: Identifying the Steps in a Workflow

People and businesses perform many useful tasks. How do we break those tasks into discrete steps that an agentic workflow can follow? Let's start with a research agent.

If you want an AI system to write an essay on a topic, you could simply prompt an LLM to generate it. But for a topic that needs deep research, you may find that the output covers only surface-level points or obvious facts. It does not go as deeply into the subject as you want.

At that point, consider how you would approach the task yourself. Would you sit down and write the whole essay immediately, or would you first make an outline, search the web, and then write using the information you found? This suggests an initial three-step workflow.

**For each proposed step, ask whether it can be carried out by an LLM, a piece of code, or an available tool.** An LLM can probably write a decent outline on many topics. It can also generate search terms for a web search API. Once the search results are available, it can use them to write an essay. That gives us a reasonable first workflow for going deeper than direct generation.

After implementing it, however, we might find that the output is still not good enough. This happened to me with one research agent: the essays felt disjointed. The beginning was not entirely consistent with the middle or the end. Again, we can ask how a person would deal with that problem.

One option is to break the writing step into smaller steps. Instead of asking for a finished essay in one pass, ask for a first draft, then a critique identifying what needs revision, and then a revised draft. Reading and critiquing a draft is another task an LLM can often do reasonably well. Feeding that critique into a revision step can improve the coherence of the final essay.

We started with direct generation, expanded it into three steps, and then decomposed one of those steps into three more. The result is a richer process. Depending on how satisfied we are with the output, we might modify it further. Task decomposition is something we can refine as we learn where the system falls short.

Now consider responding to basic customer order inquiries. A human customer service representative might first extract key information from an email: who sent it, what they ordered, and the order number. These are tasks an LLM can perform.

The next step is to find the relevant customer records. An LLM can generate an appropriate database query and, with a tool for querying the orders database, retrieve information about what was ordered and when it shipped. After that, it can use the records to write a response and call an email API to send it.

This gives us another three-step workflow: extract information, retrieve records, and respond. Each step appears feasible with an LLM or an LLM connected to a suitable function. The decomposition makes it clear what capabilities we need to implement.

For a third example, consider invoice processing. After converting a PDF invoice to text, we need to extract the biller's name, address, due date, amount due, and other required fields. An LLM should be able to do that. We can then check the extracted information and use a function to save it as a new database entry. This suggests a workflow with an extraction step followed by a database update.

When building these systems, I think of myself as having several kinds of building blocks. One is a large language model, or a multimodal model if the task involves images or audio. These models can generate text, extract information, and decide which functions to call.

For specialized tasks, we may use other AI models, such as a model for converting PDFs to text, generating speech, or analyzing images. We also have ordinary software tools and APIs for web search, real-time weather information, email, calendars, and other services.

Retrieval tools let us pull records from a database or implement retrieval-augmented generation, or RAG, by finding relevant passages in a large text collection. Code execution is another building block: an LLM can write code, and the application can run it to perform a wide range of tasks. We will examine the most important tools in more detail later in the course.

Much of the work in designing an agentic workflow is to look at what a person or business does and figure out how to sequence these building blocks to accomplish it. Understanding which building blocks are available helps you envision what you can build by combining them.

If a proposed step cannot be implemented with the tools available, ask how a human would do it. Can it be broken into even smaller steps that are more suitable for an LLM or a software tool? *Decompose a task until its individual steps are practical to implement, then refine the decomposition based on actual results.*

You do not need to master this immediately. We will work through many more examples. In practice, an initial decomposition is usually followed by several rounds of iteration before the workflow reaches the desired level of performance. To guide that improvement, we need to know how to evaluate the system. That is the topic of the next video.

## P6. Evaluating Agentic AI

I have worked with many teams building agentic workflows, and one of the strongest predictors of how effectively they work is whether they can drive a disciplined evaluation process. **Your ability to evaluate a workflow makes a substantial difference to your ability to improve it.** We will explore this in depth later, but let's begin with an overview.

After building a workflow, such as one that responds to customer order inquiries, it is difficult to know in advance everything that could go wrong. I recommend looking at its outputs and manually identifying things you wish it did better.

For example, you might discover that it mentions competitors unexpectedly. It might say, “I'm glad you shopped with us. We're much better than CompCo,” or, “Sure, here's your refund. Unlike RivalCo, we make returns easy.” Your business may consider those remarks inappropriate, but this might be a problem you would not have anticipated before building the system.

The practical approach is to build an initial version, inspect its behavior, and then find ways to evaluate and improve the aspects that are unsatisfactory. If competitor mentions are an error, we can create an evaluation to track how frequently they occur.

Given a list of competitors—say CompCo, RivalCo, and TheOtherCo—we can write code to search the generated responses for those names. We can then calculate the fraction of responses that contain an unwanted mention. This is an objective criterion: either one of those names appears or it does not.

Some criteria are harder to evaluate with code because they involve subjective judgments about free-form text. A common approach is to use an LLM as a judge. For a research agent, we might ask another model to read the generated essay and assign a quality score from one to five, where one is worst and five is best.

We could run the research agent on topics such as recent developments in black hole science or using robots to harvest fruit. Perhaps the judge gives one essay a three and another a four. As we improve the system, we would hope to see the scores increase.

However, LLMs are **NOT** particularly reliable at assigning loosely defined one-to-five ratings. You can try this as an initial evaluation, and some people do, but I tend not to rely on it much. Later, we will discuss techniques that produce more useful and accurate scores by giving the judge clearer criteria.

There are two other distinctions we will explore. End-to-end evaluations measure the quality of the entire agent's output. Component-level evaluations measure the quality of an individual step. They help with different parts of the development process.

I also spend time examining intermediate outputs, often called traces, to understand where the workflow falls short. Reading through the steps to find opportunities for improvement is error analysis. *Evaluations tell us how well a system is doing; error analysis helps us understand where to improve it.* These are central skills, and we will spend much of the fourth module on them.

Before finishing this introductory module, let's look at the main design patterns used to build agentic workflows.

## P7. Agentic Design Patterns

We build agentic workflows by combining building blocks into more complex processes. Four important design patterns help organize those combinations: **reflection, tool use, planning, and multi-agent collaboration.** We will study them in depth later; for now, let's see what each means.

Reflection starts with an initial output. Suppose we ask an LLM to write a Python function for a task. We can then put that code into another prompt and ask the model to check it carefully for correctness, style, and efficiency, and to provide constructive criticism. The same model, prompted this way, may identify problems in its own output.

We can feed the critique back to the model and ask it to fix the problems. If we can execute the code, we can also return error messages or test results and ask for another revision. The process might produce a second or third version that works better than the first.

Reflection is **NOT** magic, and it does **NOT** make everything work 100% of the time. It can, however, give a useful performance improvement. It is often more effective when the model receives external information, such as results from actually running the code.

I have described this as one model being prompted repeatedly, but we can also think of a separate critic agent. That agent is an LLM prompted to take on a role: “Your role is to critique code. Check this code carefully.” It might identify errors or run unit tests. A coding agent and a critic agent can then go back and forth to improve the result. This begins to connect reflection with multi-agent workflows.

The second pattern is tool use. We can give LLMs tools—functions they can request the application to call—to help them get work done. If you ask which coffee maker reviewers recommend, a web search tool lets the model find information online. If you ask about compound interest on an investment, a code execution tool lets it calculate the result.

Developers have built tools for mathematics, data analysis, web retrieval, database access, email, calendars, image processing, and many other tasks. Letting the model decide which tool to use expands the range of work it can perform.

The third pattern is planning. An example from HuggingGPT asks the system to generate an image of a girl reading a book in the same pose as a boy in a supplied image, then describe the new image aloud. To complete the request, the system can determine that it needs pose estimation, pose-to-image generation, image-to-text description, and text-to-speech generation, in that order.

In planning, the LLM decides the sequence of actions needed to accomplish the task. Here, those actions are API calls. The developer does **NOT** have to specify that exact sequence in advance. Systems that plan can be harder to control and are somewhat more experimental, but they can also produce useful and sometimes delightful results.

The fourth pattern is multi-agent collaboration. A human manager might hire several people with different specialties for a complex project. Similarly, we can create several agents with different roles and have them work together.

ChatDev illustrates this idea with agents acting as a chief executive officer, programmer, tester, designer, and other members of a virtual software company. They collaborate on software development tasks. For a marketing brochure, we might instead use a researcher to gather information, a marketer to write copy, and an editor to polish the result.

Multi-agent workflows can also be harder to control because we do not always know ahead of time what the agents will do. Research has nevertheless found benefits on complex tasks, including writing biographies and deciding on chess moves. We will examine these workflows later in the course.

*Design patterns give us ways to combine components; evaluations help us determine whether those combinations actually work.* With this overview in place, let's move on to a deeper look at reflection, a relatively simple technique that can sometimes give a useful performance boost.

## P8. Reflection to Improve the Output of a Task

The reflection design pattern is something I have used in many applications, and it is surprisingly easy to implement. Just as people can review their own work and find ways to improve it, so can LLMs.

Suppose I write an email quickly. My first draft might use the vague phrase “next month,” contain a typo, and omit my signature. Reading it again, I might realize that I should be more specific about the dates and revise it to say, “Hey, Tommy, are you free for dinner on the 5th to the 7th?” Reviewing the draft gives me an opportunity to catch those problems.

We can use a similar process with an LLM. First, prompt it to write an email, producing version one. Then pass that draft to the same model, or another model, with a prompt asking it to reflect and write an improved second draft. This is a simple, predetermined workflow: generate once, then reflect and revise.

The same pattern applies to code. Ask a model to write code for a task, then ask it to check for bugs and produce an improved version. Different models have different strengths, so I sometimes use one model for the first draft and another for reflection. Reasoning models, sometimes called thinking models, can be good at finding bugs. I may therefore generate the initial code with one model and use a reasoning model to review it.

**Reflection becomes more powerful when it receives new information from outside the model.** For code, one way to obtain that information is simply to run it and examine the output, including any error messages. This can provide useful evidence about what needs to change.

In the example shown here, the initial code produces a syntax error. Passing the code, output, and error logs back to an LLM gives it concrete feedback for writing a better second version. It no longer has to rely solely on examining the same information it already had.

Reflection does **NOT** guarantee a correct answer every time. It can give a modest improvement, and external feedback can make that improvement more substantial. When code output or error messages are available, they help the model identify what went wrong and revise more effectively than it could without that information.

*Whenever a reflection step can receive additional relevant information, consider making that information part of the workflow.* Next, we will compare reflection more systematically with direct generation.

## P9. Why Not Just Direct Generation?

Why might we use a reflection workflow instead of prompting an LLM once and accepting its answer? With direct generation, we give the model an instruction and let it produce the output. We might ask it to write an essay about black holes or a Python function that calculates compound interest, and then stop after the first response.

The examples shown here also use zero-shot prompting. “Zero-shot” means the prompt contains no examples of the desired input-output behavior. By contrast, one-shot prompting includes one example, and few-shot prompting includes a small number of examples. Direct generation and zero-shot prompting describe different aspects of the interaction; in these examples, we are using both: no examples and a single generation step.

Studies have found that reflection can improve performance on a variety of tasks. In the chart shown here, each pair of light and dark bars compares a model using zero-shot direct generation with the same model using reflection. The colors represent different models, including GPT-3.5 and GPT-4. For many tasks, the darker reflection bar is higher. The size of the benefit, however, depends on the application.

Structured output is one area where reflection may help. An LLM generating an HTML table might make formatting errors, and a reflection prompt can ask it to validate the HTML. Basic HTML may already be easy enough that reflection adds little, but a complicated JSON structure with substantial nesting can offer more opportunities to catch mistakes.

Reflection can also help with instructions. If a model generates steps for brewing a cup of tea, it might omit something. Asking it to review the instructions for coherence and completeness can help it identify missing steps.

Another example comes from work at AI Fund, where we have used LLMs to brainstorm domain names for startups. A generated name may have an unintended meaning or be difficult to pronounce. We have used reflection prompts to check for problematic connotations and pronunciation before selecting a shortlist.

For domain names, a reflection prompt might ask the model to review its suggestions, check whether each name is easy to pronounce, consider whether it has a negative meaning in English or other languages, and return only the names that satisfy those criteria.

For an email, we might ask it to review the first draft, check the tone, and verify that facts, dates, and promises are accurate. That instruction makes sense when the relevant facts have already been supplied in the model's context. The model can then use any problems it identifies to produce a revised draft.

**A useful reflection prompt clearly asks for a review and specifies the criteria that matter.** “Check the tone and verify the dates” gives the model more guidance than a vague request to improve the text. Likewise, pronunciation and negative connotations are concrete criteria for evaluating domain names.

One way I have learned to write better prompts is by reading prompts written by other people. I sometimes download an open-source package that I respect and look through its code to find the authors' prompts. Seeing how experienced developers express their criteria helps me improve my own prompting.

*Reflection is worth trying when a clear review process can reveal defects in the first draft, but its benefit should be measured on the actual task.* Next, we will look at a multimodal example in which a model reviews an image generated by code.

## P10. Chart Generation Workflow

In this module's coding lab, you will experiment with a chart generation workflow. An agent writes code to create a visualization, and reflection can improve the quality of the result.

The example uses coffee machine sales data. The spreadsheet records when drinks such as lattes, hot chocolate, and cappuccinos were sold and at what price. We want a plot comparing first-quarter sales in 2024 and 2025. We can prompt an LLM to write Python code using the data stored in a CSV, or comma-separated values, file.

When I ran the first version of the generated code, it produced a stacked bar chart. The chart was not especially clear, and the comparison was harder to read than I wanted. We can give both the code and the resulting image to a multimodal LLM—a model that accepts image inputs—and ask it to examine the chart, critique it, and update the code to make a clearer visualization.

The model can use visual reasoning to inspect the actual result. In this example, the revised code produced a grouped bar chart that separated the 2024 and 2025 sales. I found that version clearer and more visually pleasing. When you get to the lab, try changing the prompts to see whether you can produce an even better chart.

Different models have different strengths, so we can use one model for initial generation and another for reflection. An initial prompt might ask an OpenAI model such as GPT-4 or GPT-5 to write Python code for the visualization. The reflection prompt might ask a model to act as an expert data analyst providing constructive feedback.

Give the reflection model the first version of the code, the generated plot, and perhaps the conversation that led to it. Ask it to assess specific criteria, such as **readability, clarity, and completeness**, and then write new code implementing its improvements. Clear criteria help the model understand what to evaluate.

A reasoning model may work better for the reflection step in some cases. You can experiment with different combinations of models for generation and review, along with different prompts.

However, reflection does **NOT** improve every application by the same amount. Studies show small gains on some tasks, large gains on others, and very little improvement on others. We need a way to measure its effect in our own application and to choose between different prompts and model configurations. That brings us to evaluations for reflection workflows.

## P11. Evaluating the Impact of Reflection

Reflection often improves a system, but before keeping it in a workflow, I usually want to check how much it helps. It adds another step and therefore some latency. **The decision to keep reflection should depend on measured improvement.**

Consider a retail application that answers questions such as, “Which product color has the highest total sales?” An LLM can generate a database query, perhaps in SQL, to retrieve the relevant information. Instead of executing that query immediately, we can ask the same model or another model to review it and produce an improved version. We then run the revised query and use the returned data to answer the user.

To test whether that reflection step helps, collect questions with known answers. Examples include, “How many items were sold in May 2025?”, “What is the most expensive item in the inventory?”, and “How many styles does the store carry?” For an initial evaluation, ten or fifteen prompts with ground-truth answers may be enough to start.

Run the workflow both without reflection, using the first query, and with reflection, using the revised query. Then compare the percentage of correct answers. In the illustrative results shown here, the workflow without reflection achieves 87%, while the version with reflection achieves 95%. That would suggest a meaningful improvement in retrieving the correct information.

Once this evaluation exists, we can also use it to test prompt changes. Perhaps we want the reflection prompt to ask for a faster query or a clearer query, or we have a different way of phrasing the initial generation prompt. We can try those ideas and measure their effect. Evaluations give us a systematic basis for choosing among prompts.

This database example supports objective evaluation. If the correct number of items sold is 1,201, we can check whether the returned answer matches. A visualization presents a more subjective problem. I may prefer the grouped chart to the stacked chart, but charts can differ along several dimensions. How do we measure which one is better?

One approach is to use a multimodal LLM as a judge. We can provide both images and ask which is better, perhaps adding criteria such as clarity and appearance. However, pairwise comparisons can be unreliable. The result may depend on the precise wording of the prompt, and the ranking may not agree with an expert's judgment.

Models can also have position bias. Some tend to prefer whichever option is presented first; others may prefer the second. I have worked with models that repeatedly chose the first option even when I reversed the order of the inputs. A preference from an LLM is **NOT** automatically a reliable quality measure.

Grading each output against a rubric can give more consistent results. For a chart, the rubric might ask whether there is a clear title, whether axis labels are present, and whether the chart type is appropriate. Instead of asking for an uncalibrated one-to-five rating, ask for several binary judgments.

With five criteria scored zero or one, we can add the results to obtain a score from zero to five. Ten binary criteria produce a score from zero to ten. Breaking the judgment into specific decisions tends to be more consistent than asking for a single overall rating.

We can gather ten or fifteen visualization requests, generate charts with and without reflection, and score each chart using the rubric. That lets us check whether reflection improves the results according to the qualities we care about. We can then rerun the same evaluation whenever we change the generation prompt or reflection prompt.

Objective criteria are usually easier to evaluate with code. In the database example, we assembled known answers and checked them directly. Subjective tasks often call for an LLM judge, but the judge needs more tuning. We have to think through the rubric and check whether its scores are reliable.

*Use explicit evaluation criteria to compare workflow changes instead of relying only on an impression that one output looks better.* Next, we will examine how external information can make reflection more effective.

## P12. Using External Feedback

Reflection with external feedback can be much more powerful than reflection that relies only on the LLM. When I build an application using direct generation, prompt tuning often improves performance at first. Eventually, however, the gains flatten out. I may keep revising the prompt without obtaining much improvement.

At that point, adding reflection may move performance upward. The gain can be small or large, and the extra step adds complexity. But rather than spending all my time tuning the original prompt, I can also improve the reflection prompt.

External feedback creates another opportunity. The reflection model is no longer limited to reconsidering the same information. If we provide new evidence from outside the model and tune how that evidence is used, we may reach a much higher level of performance.

*When prompt tuning reaches diminishing returns, consider whether reflection—and especially reflection with external feedback—can help.* We have already seen one example: execute generated code, collect its output or error messages, and give those results to the model so it can revise the code.

For email generation, suppose the model sometimes mentions a competitor when it should not. We can write a tool that searches the output for competitor names, perhaps using regular expressions. If it finds a name, we feed that result into the reflection step and ask the model to rewrite the email without the unwanted mention.

For factual writing, we can use web search or another trusted source to check a claim. Suppose a research agent says that the Taj Mahal was built in 1648. The example discussed here distinguishes between its commissioning in 1631 and its completion in 1648. The original sentence may not be entirely wrong, but it fails to convey the construction history precisely. Supplying a relevant source excerpt gives the reflection model information it can use to write a more accurate account.

A third example is a word limit. An LLM writing a blog post or research abstract may exceed the requested length. Models are **NOT** always reliable at following exact word counts. A simple tool can count the words precisely. If the draft exceeds the limit, provide that count to the model and ask it to revise.

In each example, software produces additional information about the initial output: a detected competitor name, a source passage, or an exact word count. **Concrete feedback gives the reflection step a better basis for deciding what to change.**

I hope you find reflection useful in your own work. In the next module, we will build on these examples and look systematically at tool use: how to let an LLM request different functions and use their results to make an application more capable.

## P13. What Are Tools?

In this module, you will learn about tool use: letting an LLM decide when to request a function call to take an action, gather information, or perform another operation. People can accomplish more with tools than with their bare hands. Likewise, LLMs can do more when they have access to functions they can ask an application to execute.

Suppose you ask a model trained months ago, “What time is it right now?” The trained model does not know the current time. Ideally, it would tell you that it lacks access to that information. If we implement a function that returns the current time and make it available, however, the model can use it to answer the question.

The sequence is straightforward. The user asks for the time. The LLM examines its available tools and requests `get_current_time`. The application calls the function and adds the result to the conversation history. The model then uses that result to answer, for example, “It is 3:20 p.m.”

**Tools are functions that an LLM can request the application to execute.** The model can choose whether to request a tool at all. If the user instead asks how much caffeine is in green tea, the current time is irrelevant, so the model can answer without requesting `get_current_time`.

In the slides, a dashed box above an LLM indicates a set of tools the model can choose from. This differs from earlier workflows in which the developer specified that a web search would always happen at a particular point. Here, the tool call is **NOT** predetermined; the model decides whether it needs one.

For another example, a restaurant recommendation application could have a web search tool. If asked to find restaurants near Mountain View, California, the model can search for relevant places and use the returned information to produce its answer.

A retail application might receive the request, “Show me customers who bought white sunglasses.” With a database query tool, the model can retrieve the relevant sales records and use them to answer. A finance assistant asked about depositing $500 for ten years at 5% interest could use a dedicated interest calculation function. Alternatively, it could write code for the calculation and have that code executed.

As a developer, think about the work your application should perform and provide the functions it needs. A restaurant recommender, a retail question-answering system, and a finance assistant are likely to need different tools.

So far, most examples have exposed one function, but an application can offer several. A calendar assistant might have tools to check a calendar, create an appointment, and delete an appointment. Given the request, “Find a free slot on Thursday and make an appointment with Alice,” the model can choose the appropriate sequence.

First, it requests a calendar check. The returned availability becomes part of its context. It might then choose 3 p.m. and request the appointment-creation function to send an invitation to Alice and add the event to the calendar. Once it receives confirmation that the operation succeeded, it can tell the user that the appointment is set for Thursday at 3 p.m. The deletion tool is available but unnecessary for this request.

*Giving a model appropriate tools lets it combine language generation with information retrieval and actions.* Next, we will look at how to implement a function and make it available as a tool.

## P14. Creating a Tool

At first, tool use may seem mysterious. An LLM is trained to generate text tokens, so how can it call a function? Let's walk through the process step by step.

Tools are code or functions that a model can request to have executed. Modern models are trained to use tools directly, but it is helpful to understand how developers implemented this before native tool-calling support became common. The older approach used explicit prompting and text parsing.

Suppose we have implemented `get_current_time`. We could tell the model, “You have access to a tool called `get_current_time`. To use it, output `FUNCTION: get_current_time`.” That special text tells our application that the model wants the function called.

When the user asks for the time, the model outputs the requested marker. Our code checks the response, extracts the function name, calls the function, and obtains a result—say 8 a.m. The application then adds that result to the conversation history, along with the user's question and the model's tool request. Seeing that context, the model can produce the final response: “It is 8 a.m.”

The LLM does **NOT** execute the function directly. It produces an output in a recognizable format, and application code executes the function and returns the result. This distinction is central to understanding tool use.

We could extend the same approach to three or four functions by asking the model to output the marker, the requested function's name, and any arguments. Let's consider a slightly more complex version of the time function that accepts a time zone.

Suppose I want to know the time in New Zealand before calling my aunt. We can describe the `get_current_time` function and explain how to supply the time-zone argument. The model might respond with a request containing the function name and `Pacific/Auckland`, a time-zone identifier for New Zealand.

Our code again looks for the function-call marker, extracts the function name and argument, and executes `get_current_time` with `Pacific/Auckland`. If the result is 4 a.m., we feed that information back to the model. It can then answer, “It is 4 a.m. in New Zealand.”

The general process is to implement a function, tell the model that it is available, recognize the model's request to use it, execute it, and return the result. The model can then decide what to do next. In these examples, it gives a final answer, but it may instead request another tool and continue the process.

The `FUNCTION:` syntax is somewhat clunky. Modern models use a specific tool-calling format that they have been trained to produce, so we no longer need to explain this ad hoc marker in every prompt. The underlying division of responsibilities remains the same. In the next video, we will look at that modern syntax.

## P15. Tool Syntax

Let's look at how to write code that enables an LLM to request tools. We will use the `get_current_time` function and the open-source `aisuite` library, which some friends and I developed to make it easier to work with multiple model providers.

As we saw in the previous video, the model technically requests that a tool be called. Developers often shorten that to “the LLM calls the tool,” even though the application performs the execution.

The `aisuite` syntax resembles the OpenAI client syntax. The example calls `client.chat.completions.create`, selects a model such as GPT-4o, provides the conversation through `messages`, and supplies a list of functions through `tools`. In this example, the list contains just `get_current_time`. You will work through the details in the coding labs.

The example also sets `max_turns` to five. After one tool returns, the model may request another, and then another. This parameter sets a ceiling on that process so it cannot continue indefinitely. In many ordinary examples, the workflow finishes before reaching the limit.

With `aisuite`, the function is described to the model automatically. You do not have to write a long prompt manually explaining what `get_current_time` does. The library uses information including the function's docstring to construct the description.

Behind the scenes, it creates a JSON schema containing the function name, a description, and any parameters. The description helps the model decide when the function is useful. Some interfaces require developers to construct this schema themselves, while this library does that work for the example shown here.

For the version of `get_current_time` that accepts a time zone, the schema also describes that parameter. The documentation tells the model that an argument should look like `America/New_York`, `Pacific/Auckland`, or another suitable time-zone identifier.

When the client call runs, the library sends the model the messages and tool descriptions. If the model requests a function, the library calls it, obtains the result, and feeds the result back to the model. It continues within the configured turn limit and returns the response.

**The tool description tells the model what it can request; the client implementation handles the actual execution loop.** Some other interfaces require you to implement that loop manually. In this example, it is wrapped into the client call.

Providing a few functions and seeing the model choose how to use them can be exciting, especially if you have not tried it before. The model can gather information or take actions to fulfill a request. Among the tools we can provide, one is especially powerful: code execution. Letting a model write code and having a tool execute that code gives it access to a broad range of operations. That is our next topic.

## P16. Code Execution

In several agentic applications, I have given the model the option to write code to accomplish a task. I have sometimes been surprised by the cleverness of the solutions it generated. If you have not used code execution much, you may find that it expands what your applications can do.

Suppose we are building an application to solve mathematical word problems. We might start with tools for addition, subtraction, multiplication, and division. A request to add 13.2 and 18.9 can use the addition tool. But what happens when someone asks for the square root of two?

We could add a square-root function, then another for exponentiation, and so on. A scientific calculator has many buttons, and there are many more mathematical operations we might want. Creating a separate tool for every operation can become cumbersome.

An alternative is to ask the model to write Python code. The prompt might request code enclosed in opening and closing `execute_python` tags. For the square root of two, the model can return a short program. Application code can use pattern matching, such as a regular expression, to extract the program between those tags and execute it.

The result, approximately 1.4142, is then passed back to the LLM, which can give the user a nicely formatted answer. The same approach can handle interest calculations and much more complex mathematical tasks.

There are several ways to execute the generated code. Python's built-in `exec` function runs code supplied to it, while other tools can run code in a sandbox. This capability is powerful, but the execution environment matters.

We can also combine execution with reflection. If the generated program fails, return its error message to the model and ask it to revise the code. One or two additional attempts can sometimes produce a correct solution.

Running arbitrary generated code can cause problems. Recently, one of my team members used an agentic coding system that deleted the Python files matching `*.py` in a project directory. The agent later apologized, but the apology did not restore the files. Fortunately, the team member had the code backed up in a GitHub repository, so there was no lasting harm. Without that backup, the mistake would have been much more serious.

**The best practice discussed here is to execute generated code in a sandbox.** An isolated environment can reduce the risk of data loss or exposure of sensitive information if the model generates bad code. Docker-based environments and services such as E2B are examples of approaches developers use for this purpose.

In practice, many developers run generated code with limited checking, and a single execution may appear low risk. But the fact that code usually works does **NOT** remove the possibility of a damaging mistake. The environment should limit what an erroneous program can affect.

Code execution is important enough that model developers put substantial effort into making their models good at it. Adding it to your available tools can make an application much more capable.

So far, we have discussed creating individual tools and making them available one at a time. Many teams need similar integrations, which can lead to repeated work. The Model Context Protocol, or MCP, provides a standard way to expose tools and information. Let's look at it next.

## P17. MCP

MCP, the Model Context Protocol, was proposed by Anthropic and adopted by other companies and developers as a way to give applications access to context and tools. Its ecosystem provides resources that can be useful when building an agentic application.

Consider the integration problem it addresses. A developer might want an application to work with Slack, Google Drive, GitHub, and a PostgreSQL database. Without a shared interface, the developer writes custom wrappers around each service's APIs. Another team building a different application may repeat the same work.

If there are M applications and N services, the community can end up building roughly M × N integrations. **A common protocol changes the integration pattern from M × N custom connections toward M + N implementations:** applications implement support for the protocol, and services expose capabilities through that protocol.

MCP's initial design emphasized providing context to models and retrieving data. Its resource mechanism exposes information, while tools provide callable capabilities, including operations that retrieve data or take actions. The protocol supports access to both information and functions.

MCP clients are the parts of applications that connect to these capabilities. MCP servers expose tools and resources, often by wrapping services such as Slack, GitHub, or Google Drive. There is a growing range of clients that consume capabilities and servers that provide them. Your own application could use an MCP client, or you could build a server to make capabilities available to other developers.

The demonstration here uses Claude Desktop connected to a GitHub MCP server. I ask it to summarize the README from the `aisuite` repository. The application uses the server to request the file, receives the content, and supplies it to the LLM as context. The model then writes a summary.

Next, I ask for the latest pull requests. The model requests a different tool from the same server to list pull requests for the repository, sorted by update time, with a limit of twenty. The returned information goes back into the model's context, and it produces a readable summary.

These examples show how the same client can use several capabilities exposed through a standard interface. DeepLearning.AI also has a short course that goes further into MCP if you want to explore the protocol after finishing this course.

This concludes our module on tool use. I hope that connecting models to useful tools lets you build more capable applications. Next, we will turn to evaluations and error analysis. In my experience, the ability to drive a disciplined evaluation process is one of the main things that distinguishes effective teams. The next module may be the most important part of the course for improving your development process.

## P18. Evaluations

In this module, I want to share practical tips for building agentic workflows effectively. When developing a system, it is difficult to know in advance where it will work well and where it will fall short. That makes it hard to decide where to focus your effort before you have something to examine.

A common piece of advice is to build a quick initial version, try it, and look at what needs improvement. Spending weeks theorizing about everything that might go wrong is often less useful than building a responsible prototype and learning from its behavior. The prototype gives you a basis for prioritizing further development.

Let's return to invoice processing. The workflow extracts four required fields and saves them in a database. After building it, we might inspect ten or twenty invoices and their outputs to see what worked and what did not.

Perhaps the first invoice is processed correctly, but the second confuses the invoice's issue date with its due date. We want the due date so that payments can be made on time. We record that mistake in a document or spreadsheet. The next few invoices may be fine, but as we continue, we notice several other examples of the same date confusion.

This review identifies a common failure mode. We can now work on improving due-date extraction and create an evaluation to measure progress. If we had instead found problems with biller names or addresses—perhaps unusual names or international addresses using different writing systems—we might have focused our evaluation there. **Inspecting actual outputs helps determine what is worth evaluating.**

For a due-date evaluation, I might collect ten to twenty invoices and manually annotate the correct due date for each one. An invoice due on August 20, 2025, would receive the label `2025-08-20`. I would also prompt the model to return dates in the same `YYYY-MM-DD` format so the result is easy to check with code.

We can use a regular expression to extract the returned date: four digits for the year, two for the month, and two for the day. We then compare it with the ground-truth annotation. With a small evaluation set, we can track the percentage of correct dates as we change prompts, try different models, or modify other parts of the workflow.

The development loop is to build a system, inspect its outputs, identify an important problem, and measure that problem while trying improvements. If you already know how to fix an error, fix it. If solving it requires a longer process, an evaluation can help guide that process.

The first evaluation set does **NOT** have to be final. If twenty examples are too few or fail to cover important cases, we can add examples over time. The goal is to make the evaluation increasingly representative of the performance we actually care about.

For a second example, consider a marketing assistant writing Instagram captions. Suppose the marketing team wants captions of at most ten words. The model receives a product image, such as sunglasses, and a request to write a caption promoting it.

There are many ways this system could fail. Perhaps the captions generally sound good, but they are sometimes too long. A sunglasses caption might contain seventeen words, a blue-shirt caption fourteen, and a blender caption eleven, while the coffee-machine and styling examples satisfy the limit. Those observations suggest that length compliance is worth evaluating.

We can collect ten to twenty caption requests, run them through the system, and write code to count the words in each output. A caption passes if its word count is **AT MOST** ten. We can then measure how often the workflow follows the length requirement and check whether changes improve that rate.

Unlike the invoice example, this evaluation does not require a different ground-truth answer for each input. The same ten-word maximum applies to every caption. Invoice extraction needed a custom due-date label for each invoice; caption length uses one shared criterion. Although this example has a simple generation workflow, the same evaluation can be applied to a more complex one.

For a third example, return to the research agent. Suppose its report on recent breakthroughs in black hole science omits a prominent finding that received substantial coverage. Its report on renting versus buying in Seattle looks good, but its report on fruit-harvesting robots fails to mention a leading equipment company. The recurring problem is missing important points that an expert would have included.

We can create an evaluation set of research prompts and identify three to five gold-standard discussion points for each. Here, there is per-example ground truth: a black-hole report and a robotics report need to cover different points.

An LLM judge can read the generated essay and count how many of those points it covers. The prompt might provide the original research question, the essay, and five gold-standard points, then ask for a JSON object with two keys: a score from zero to five and an explanation. That gives us a score for each evaluation example.

We use an LLM judge because the same idea can be expressed in many ways. Simple pattern matching may not tell us whether an essay adequately discusses a topic such as event horizons. The judgment requires interpreting meaning, which makes it less straightforward than comparing dates or counting words.

These examples suggest two useful axes for thinking about evaluations. One is **how the output is scored**: objective code-based checks or more subjective judgments by an LLM. The other is **whether there is ground truth specific to each example**.

Invoice due-date extraction uses code and a different ground-truth date for each invoice. Caption length uses code but a shared rule. Research coverage uses an LLM judge and topic-specific gold-standard points. The fourth combination is an LLM judge with a shared rubric and no per-example target answer.

We saw that fourth combination when evaluating coffee-sales charts. Every chart can be checked against the same rubric—for example, whether the axes are clearly labeled and the chart type is appropriate. The model judges each chart against common criteria rather than comparing it with a separately annotated answer for that particular request.

These are end-to-end evaluations: they measure the final output of the complete system, starting from the input query or document. The two-by-two framework can help you decide what type of evaluation is appropriate for a particular problem.

A few practical tips are worth emphasizing. First, a rough initial evaluation is fine. Some teams delay because they imagine evaluations must be a large, multiweek project. But you can start with ten, fifteen, or twenty examples and a small amount of code or an initial judge prompt. Just as the workflow improves through iteration, so can its evaluation.

At first, combine those metrics with manual inspection. As the evaluation becomes more reliable, you can place more trust in it and spend less time rereading hundreds of outputs after every prompt change.

Second, improve the evaluation when it fails to reflect meaningful differences. You may update a system, inspect its outputs, and conclude that it is substantially better, while the evaluation shows no gain. That is a reason to investigate the evaluation. You might need a larger set of examples or a better scoring method. The metric should increasingly correspond to the quality you are trying to achieve.

Third, compare the system with what a human expert could do. Many agentic workflows automate tasks people already perform. Looking for cases where the system does substantially worse than an expert often suggests useful directions for improvement.

*Start with a small evaluation that measures a real problem, and improve both the workflow and the evaluation as you learn.* Beyond tracking overall quality, we also need to know which component deserves attention. That is the purpose of error analysis, which we will examine next.

## P19. Error Analysis and Prioritizing Next Steps

Suppose you have built an agentic workflow and it does not yet work as well as you want. That happens to me frequently. The question is where to focus effort. A workflow can contain many components, and improving some may help much more than improving others.

**A disciplined error analysis process helps identify the changes most likely to improve the whole system.** The ability to choose where to work makes a large difference to development speed.

In the research-agent example, we found that reports sometimes miss important points. Several components could cause that. The model might generate poor search terms, the search engine might return weak results, or the model might choose the wrong pages to download. Even if retrieval works, the final writing step could ignore relevant information in the fetched pages.

Some teams choose a component based on intuition. Sometimes that works, but it can also lead to weeks or months of effort with little effect on overall quality. Looking at the intermediate outputs gives us a better basis for deciding.

Consider a report on recent developments in black hole science. The first model generates terms involving black hole theories, Einstein, the Event Horizon Telescope, and radio observations. A human expert might judge those search terms reasonable.

Next, inspect the search results. Perhaps one is an article from a source called Astro Kid News claiming that an elementary school student solved a thirty-year-old black hole mystery. Looking through the returned pages, we might find too many casual blogs or popular articles and too few rigorous scientific sources for the report we want.

We should inspect later steps as well. The source-selection model might choose pages from Astro Kid News, Spaceball 2000, and Space Fun News because those are the best options in the returned set. Looking through each intermediate result helps us understand where quality first deteriorated.

The record of an agent run, including its intermediate steps and outputs, is often called a trace. A span represents an individual operation within that trace. These terms come from software observability. I will use “trace” frequently in this course, though you may encounter both terms elsewhere.

Reading traces gives an informal sense of where the system struggles. For a more systematic analysis, focus on examples with unsatisfactory final outputs. Put aside the cases that already work well and examine the failures to identify which components contributed to them.

A spreadsheet can make this process more explicit. For each failed example, record whether each component performed substantially worse than a human expert could have performed **GIVEN THE SAME INPUT**. That qualification matters.

In the black-hole example, the selected sources may be poor, but the source-selection model may still have done a reasonable job. If all the available search results were weak, even an expert could not have selected strong scientific papers from that list. We should **NOT** blame the selector for failing to choose sources it never received.

Continue across different prompts. A report on renting versus buying in Seattle might miss a well-known blog. A fruit-harvesting robotics report might begin with overly generic search terms and also receive poor search results. Record the relevant issues and count how often each component performs poorly.

In the illustrative spreadsheet, search terms are unsatisfactory in 5% of the analyzed cases, while search results are unsatisfactory in 45%. Before drawing a conclusion, I would check again that bad queries are not the underlying reason for the weak results. If the queries really are reasonable, I would focus on the search engine and its configuration.

That might mean changing providers or tuning parameters to retrieve more relevant, higher-quality material. The analysis points to a specific component instead of leaving us to guess among all the steps.

It is useful to build a habit of reading traces after constructing a workflow. A more systematic spreadsheet analysis adds counts that help us see which components fail most frequently. But frequency is not the only consideration: we should also consider where we have practical ideas for improvement.

A component may cause many problems while offering no obvious way forward. Another may have both frequent errors and promising fixes. *Prioritize by combining the frequency of a problem with the feasibility of improving it.*

In a complex system, it is easy to spend a long time improving something that has little effect on the final output. Error analysis helps avoid that waste and makes development more efficient. Because this skill is so important, let's work through two more examples.

## P20. More Error Analysis Examples

Seeing several examples helps develop intuition for error analysis. We will look at invoice processing and customer email responses.

The invoice workflow extracts four fields and records them in a database. Earlier, we found that it often returned the wrong due date. Two possible causes are the PDF-to-text conversion and the LLM's extraction of a date from the converted text.

To investigate, collect examples where the returned date is incorrect. We might inspect somewhere between ten and one hundred failed invoices, setting aside the ones that were processed correctly. For each failure, compare the PDF, the extracted text, and the date returned by the model.

Perhaps the conversion step damaged the text so badly that even a person could not determine the due date. Or perhaps the converted text is perfectly adequate, but the model selects the issue date instead of the due date. A spreadsheet can record which problem occurs in each case.

If most errors arise during LLM extraction, that suggests focusing on that component. Without this analysis, a team might spend weeks tuning PDF conversion and discover that it barely improves the final result.

The percentages for different error categories do **NOT** have to add up to 100%. The categories are not mutually exclusive: more than one component can make an error in the same example.

For the customer email workflow, the model reads a request about an order, retrieves order information from a database, and drafts a response for a human to review. Again, collect cases where the final draft is unsatisfactory and inspect the intermediate steps.

One possible failure is an incorrect database query. Another is inaccurate data in the database, even when the query is appropriate. A third is a poorly written email despite having the correct order information.

For the first email, perhaps the model queries the wrong table. For another, the database contains an error, and the final email also handles the available information poorly. Record the problems separately rather than forcing each example into just one category.

In the illustrative analysis, database-query generation accounts for 75% of the failed cases. The database has relatively few data errors, while the email-writing step has problems in roughly 30% of the failures. The overlap is possible because one case can contain multiple errors.

Those percentages describe **THE FAILED CASES**, not all requests the system receives. The system may answer many requests correctly. Among the cases that are unsatisfactory, however, query generation appears to be the largest source of trouble, with email writing a secondary priority.

*Trace a bad final result back to the component that could have handled its input better.* Once error analysis identifies a component to improve, a component-level evaluation can make work on that component faster and more precise. Let's look at that next.

## P21. Component-Level Evaluations

In our research-agent example, the system sometimes missed key points, and error analysis suggested that web search was a problem. We could rerun the entire workflow every time we changed the search engine, but that can be expensive. Randomness in other components may also obscure a small improvement in search quality.

An alternative is to build an evaluation specifically for web search. For a handful of queries, have an expert identify authoritative pages that a good search should find. These become gold-standard web resources.

We can then write code to compare the search results with those resources. Standard information-retrieval metrics, such as the F1 score, can measure the overlap. You do not need to know the details of those metrics here; the important point is that we now have a way to evaluate the search component directly.

This lets us quickly try different search engines, such as Google, Bing, DuckDuckGo, Tavily, or You.com. We can also change the number of results or the date range and check whether the component's output improves.

**Component-level evaluations provide a clearer signal about the component being changed.** They reduce the cost and noise of running the full workflow for every experiment. If separate teams own different components, each team can work toward a focused metric without having to account for every other part of the system.

Before declaring the work complete, however, we should **STILL** run an end-to-end evaluation to confirm that the changes improve overall performance. A component metric helps during tuning; it does not replace checking the final system.

*Use a focused evaluation to improve a component efficiently, then verify the effect on the complete workflow.* Once we have chosen a component and a metric, how do we make that component better? We will consider several options in the next video.

## P22. How to Address Problems You Identify

An agentic workflow can contain many types of components, so the techniques for improving them vary. Let's look at some common patterns, starting with components that are not based on an LLM.

These might include a web search engine, a text retrieval component in a RAG system, a code execution environment, or a separately trained model for speech recognition or detecting people in images. Some expose parameters or hyperparameters that we can tune.

For web search, we can change the number of results or the date range. For text retrieval, we might adjust the similarity threshold used to select relevant passages or the size of the chunks into which documents are divided. For person detection, changing the detection threshold affects sensitivity and the trade-off between false positives and false negatives.

You do not need to follow every technical detail of those examples. The general point is that components often have settings that affect their behavior. We can also replace a component entirely. I frequently try different search engines or RAG providers to see whether another implementation works better.

Because non-LLM components are so diverse, the improvement strategy depends heavily on what a particular component does. For LLM-based components, there are several recurring options.

The first is to improve the prompt. We might make the instructions more explicit or use few-shot prompting by adding examples of inputs and desired outputs. Those examples can help the model understand the behavior we want. DeepLearning.AI short courses cover these prompting techniques in more detail.

A second option is to try another model. Libraries such as `aisuite` make it easier to compare providers, and evaluations help us choose the model that works best for the application.

A third option is to decompose a difficult step. If a single prompt asks the model to follow a long, complex set of instructions, the task may be too much for one call. We could split it into smaller steps or separate generation from reflection. Two or three focused calls may follow the instructions more accurately.

A fourth option is fine-tuning. With suitable training data, a custom model can perform better than prompting alone. However, fine-tuning usually requires more developer time and can be more expensive to implement than the other options.

I tend to consider fine-tuning **ONLY AFTER** exploring the simpler approaches. For a mature application that remains at perhaps 90% or 95% performance after substantial work, fine-tuning may help obtain the last few percentage points. Its cost makes it less attractive as an early default.

Beyond these individual techniques, it helps to develop intuition about the capabilities of different models. You can always try several models, but experience helps you choose promising candidates and write prompts that suit their strengths.

Consider a task that asks a model to identify and redact personally identifiable information, or PII, from customer-call summaries. A summary might include a customer's name, Social Security number, address, and support-ticket details. We may want to remove that information before using the summaries for statistical analysis of why customers contact support.

We can prompt the model to identify PII and return the redacted text in a specified format. In the example shown here, a smaller open-weight Llama 3.1 model with eight billion parameters struggles to follow all the instructions. It produces an unwanted list, returns additional material, misses the person's name, and fails to redact part of the address.

A more capable model follows the requested format and redacts the relevant information correctly in the example. The point is not the exact text on the slide, but that following several detailed instructions can require capabilities beyond answering a simple factual question.

Different models specialize in different tasks. Some are stronger at coding, some at following instructions, and some at particular kinds of factual knowledge. **Choose models according to the work they actually need to perform.** Building intuition about these differences can make your decisions more efficient.

One way to develop that intuition is to try different models frequently. When a new model is released, I often experiment with questions, using both proprietary and open-weight models. A personal set of evaluation questions can help calibrate how well each handles different tasks.

Another habit is reading other people's prompts. Developers sometimes publish prompts online, and I read them to understand their practices. I also compare notes with friends at different companies, including model developers. Sometimes I download an open-source package written by people I respect and search through it to find the prompts.

Reading those prompts helps me understand how to express instructions and what models can follow reliably. It is a technique I use often and encourage you to try. You can learn from the details of how other developers specify roles, criteria, and desired outputs.

Trying models inside your own workflows is equally valuable. Examine traces for an informal assessment, or use component-level and end-to-end evaluations for a more systematic comparison. Over time, you develop intuition about performance as well as price and speed.

One reason I use `aisuite` is that it makes swapping models easier. Being able to test alternatives quickly helps me assess which models fit different parts of a workflow.

So far, we have focused on improving output quality. For many teams, that is the first priority: does the application produce sufficiently good results? Once it works well and moves into production, there is often value in reducing latency and cost. We will look at those optimizations next.

## P23. Latency and Cost Optimization

When building agentic workflows, I often advise teams to focus first on high-quality outputs and optimize cost and latency later. This does not mean that cost and latency are unimportant. Getting the output quality high enough is usually the hardest part, so that is where I tend to concentrate initially.

A few times, my team has shipped a workflow and been fortunate enough to attract so many users that cost became a problem. We then had to scramble to bring it down, but that was a good problem to have. I do not ignore cost; it is usually lower on my list until usage makes the cost per user more consequential. I also pay attention to latency, while keeping output quality as the main concern early on.

Once optimization becomes a priority, start by measuring the workflow. In the research-agent example, generating search terms might take seven seconds, web search five seconds, other steps three and eleven seconds, and the final essay eighteen seconds. A timeline of the individual steps reveals where there is room to reduce total latency.

If some operations can run independently, consider parallel execution. Fetching multiple pages is one example. If an LLM step is slow, try a smaller model that might still be capable enough, or another provider that serves the model faster. Some providers use specialized hardware and can return tokens more quickly.

**Measure latency by component so that optimization targets the steps that actually take time.** Without that information, it is easy to work on a step that contributes little to the overall delay.

Cost analysis follows a similar pattern. Model providers may charge for input and output tokens, APIs may charge per call, and computation has costs related to server capacity or service pricing. Estimate the cost of each step to see which ones matter most.

In the illustrative breakdown, one LLM step might cost 0.04 cents in tokens, while each search API call might cost 1.6 cents. Other entries include page retrieval, PDF conversion, and the tokens used to generate the final essay. The exact amounts depend on the components, but the breakdown tells us where cheaper alternatives might have the greatest effect.

Sometimes this exercise shows that a component is **NOT WORTH** optimizing because its contribution to total latency or cost is too small. That is useful information too.

*Measure the cost and latency of individual steps before deciding where to optimize.* We are nearly at the end of this module. Thank you for working through these ideas with me; they provide a practical basis for improving an agentic system.

## P24. Planning Workflows

Welcome to the final module. We will look at design patterns for building highly autonomous agents that can decide which steps to take rather than relying on a sequence specified entirely in advance. We will start with planning and then examine multi-agent systems.

Suppose you run a sunglasses store with inventory information in a database. A customer asks, “Do you have any round sunglasses in stock for under $100?” Answering requires examining product descriptions, checking inventory, and comparing prices. How can we build an agent that handles this and many other kinds of customer requests?

We can give the model tools to retrieve item descriptions, check inventory, get prices, inspect past transactions, process returns, and process sales. Some tools will be irrelevant to this request but useful for others.

The prompt describes the available tools and asks the model to return a step-by-step plan for fulfilling the user's request. A reasonable plan would first identify round sunglasses from their descriptions, then check which are in stock, and finally determine which of the available items cost less than $100.

After the model generates the plan, we can ask it to execute each step. For the first step, pass the instruction along with the original query, tool descriptions, and relevant background context. The model can request item descriptions and identify the round sunglasses.

The result of that step becomes context for the second step. If we found two pairs of round sunglasses, the model can request inventory information for those items. The next call receives that output and the instruction to check prices. Finally, the model uses the gathered information to answer the customer.

The slide simplifies the plan into short descriptions. In practice, the instructions may be more detailed. The basic workflow is to generate a plan and then execute its steps in turn, providing the context each step needs.

**Planning lets the model determine the sequence of actions for a particular request.** We did **NOT** have to specify this exact combination of tool calls in advance.

A different customer might say, “I would like to return the gold-frame glasses I purchased, but not the metal-frame ones.” The model can devise a different plan: inspect past purchases, use item descriptions to identify the relevant pair, and call the return-processing tool. This flexibility expands the range of tasks an agent can handle.

For another example, consider an email assistant. I might ask it to reply to Bob's dinner invitation in New York, confirm that I will attend, and archive the email. The assistant has tools to search, move, delete, and send emails.

Given those tools, it can plan to find Bob's message, generate and send the confirmation, and then move the original message to the archive folder. We execute the plan step by step. The search result gives the next step the information needed to compose a reply, and the successful send result provides context before the archive operation.

Planning is already useful in highly agentic coding systems. A request to build a complex application may produce a plan to implement several components and a checklist for completing them one at a time. This can work well for building increasingly substantial software.

In other applications, planning is still more experimental. One challenge is control: as a developer, you may not know what plan the system will produce at runtime. The greater flexibility also makes behavior harder to predict.

*Planning trades some predictability for the ability to choose a task-specific sequence of actions.* In the next video, we will look more closely at how to represent a plan and execute it systematically.

## P25. Creating and Executing LLM Plans

Let's examine how to prompt an LLM to generate a plan and how to read, interpret, and execute that plan. The customer service example used simple, high-level descriptions, but a structured representation can make the instructions clearer for downstream software.

Many developers ask the model to output a plan in JSON. The prompt describes the available tools and specifies a JSON structure for the step-by-step plan. Models can then produce a list in which each item includes a step description, the tool to use, and the relevant arguments.

For example, the first list item can identify the first task, name the tool, and provide its arguments. The next item describes the second task and its tool. **A structured plan makes it easier for application code to identify and execute the intended steps unambiguously.**

JSON is not the only option. XML tags can also mark the steps and their numbers clearly. Some developers use Markdown, though it may require more interpretation, and plain text is generally the least structured option discussed here. JSON or XML can be useful when you want the plan to be easy to parse.

Once the model outputs the plan, downstream code can parse it and execute the steps systematically. There is also another powerful way to express a plan: have the model write code that represents the sequence of actions. That is the topic of the next video.

## P26. Planning with Code Execution

Planning with code execution means asking a model to express its plan as a program. Instead of returning JSON that another process interprets one step at a time, the model writes code that calls functions in sequence. Executing that code carries out the plan.

Consider a system that answers questions about coffee machine sales using a spreadsheet. We might initially provide tools to find a column's maximum, mean, minimum, or median; filter rows; and sum values. Those functions can answer several questions about the data.

But suppose the user asks, “Which month had the highest sales of hot chocolate?” With this tool set, the model may need to filter January's hot chocolate transactions, compute the total, repeat for February, then March, and continue through December before comparing the results. We can assemble a solution, but it becomes cumbersome.

Other questions reveal gaps. “How many unique transactions were there last week?” might require a new tool for unique entries. “What were the amounts of the last five transactions?” might require another. I have seen teams keep adding tools as new queries reveal more edge cases. The approach can become brittle and inefficient.

An alternative is to prompt the model to write Python code that solves the user's question. It can return code between `execute_python` tags, load the CSV with a library such as pandas, and carry out the necessary operations.

For the last-five-transactions question, the program might load the data, parse the date column, sort by date, select the last five transactions, and display the price column. Those are the steps of a plan, expressed in executable code.

Python and its libraries provide hundreds or thousands of relevant functions. Models have seen many examples of these functions in training, so they can often select and combine them appropriately. **Code gives the model a rich vocabulary for expressing a sequence of operations.**

For the unique-transactions question, the program can read the CSV, parse dates, define the time window for last week, filter the rows, remove duplicates, and count the result. The comments and operations in the generated code make the plan visible, and execution produces the answer.

For tasks that can reasonably be solved with software, this can be a powerful approach. The execution considerations from the tool-use module still apply: a sandbox can limit the effects of erroneous generated code. Some developers do run code without one, but that is not the best practice discussed here.

The research comparison shown on the slide evaluates code as an action format against JSON-based and plain-text approaches. For the models and tasks examined, expressing actions in code performs better than expressing them in JSON, and JSON generally performs better than plain text. The result illustrates why code can be an effective planning representation.

Code is **NOT** the right interface for every application. Some tasks are better served by a defined set of custom tools. But where code execution fits the task, it can let a model express and carry out complex plans.

One strong use case is agentic software development. A coding assistant may plan to build one component, then another, test them along the way, and work through a checklist. This already works well for increasingly complex software tasks.

For other applications, the use of planning is still developing. Because the developer does not determine every action in advance, behavior can be harder to control and predict. In exchange, the model can attempt a wider range of approaches.

*When a task is naturally programmable, executable code can serve as both the plan and the means of carrying it out.* That concludes our discussion of planning. We will now look at workflows in which multiple agents collaborate on a task.

## P27. Multi-Agent Workflows

So far, we have mostly discussed a single agent completing a task. In a multi-agent workflow, several agents collaborate. A common initial question is, “Why do I need multiple agents if I am just prompting the same LLM repeatedly on one computer?”

A useful analogy is software running on a single computer. Even on one machine, we organize work into different processes, threads, and programs. That decomposition can make the software easier to design. Similarly, thinking in terms of several agents can make it easier to organize a complex task.

Instead of asking what one person you would hire to do everything, ask whether a team with three or four different roles would make sense. This offers another way to identify subtasks and build them separately. **Multiple agents provide a way to divide responsibilities, even when they use the same underlying model.**

For a sunglasses marketing brochure, we might want a researcher to study market trends and competitors, a graphic designer to create visuals, and a writer to assemble the brochure. A research article might need a researcher, statistician, lead writer, and editor. A legal case might involve associates, paralegals, and an investigator. These are tasks we already tend to divide among people with different skills.

Let's examine the marketing example. The researcher analyzes trends and competing products. When designing that agent, ask what tools it needs. Web search is an obvious candidate, just as a human researcher would use online sources.

The graphic designer creates visualizations and artwork. That agent may need image-generation or manipulation APIs, or code execution to generate charts like the coffee-sales visualizations. The writer turns the research into report text and marketing copy and may need no tool beyond the model's text-generation capability.

In these slides, purple boxes represent agents. We build an individual agent by prompting an LLM to take on a role and providing the appropriate tools. For the researcher, the prompt might say, “You are a research agent with expertise in analyzing market trends and competitors. Research trends for this sunglasses product and summarize what competitors are offering.” Similar role-specific instructions define the graphic designer and writer.

One way to coordinate the agents is a linear workflow. A request for a summer sunglasses campaign first goes to the researcher, which produces a report on current trends and competing offerings. The graphic designer receives that report and creates visualizations or artwork options. The writer then receives both the research and visual assets and produces the final brochure.

This structure lets us focus on one role at a time. I might work on improving the graphic designer while collaborators build the researcher and writer. We then connect those components into a complete system.

Agents may also be reusable. A graphic designer developed for marketing brochures might be adapted to social media posts or webpage illustrations. Thinking about roles can reveal components that are useful across several applications.

A linear workflow is not the only option. We can also use planning to coordinate multiple agents. Earlier, we gave an LLM a collection of tools; now we can give it access to a collection of agents that can perform different tasks.

A manager prompt might say, “You are a marketing manager. Here is the team of agents available to you,” followed by descriptions of the researcher, designer, and writer. We then ask the manager to generate a step-by-step plan for the user's request.

It might plan to ask the researcher for current sunglasses trends, ask the designer to create images, ask the writer for a report, and finally review and improve the result. Executing the plan passes the relevant instructions and outputs through those agents, followed by the manager's final reflection.

Viewed this way, the coordinating LLM is a fourth agent: a marketing manager that sets direction and delegates work. The complete system includes the manager and its three specialists.

We have now seen two communication patterns: a linear sequence and a manager coordinating several agents. *Designing a multi-agent workflow involves both defining the roles and deciding how information moves between them.* Communication patterns are an active area of development, and we will examine several common ones next.

## P28. Communication Patterns for Multi-Agent Systems

Human teams can communicate in complex ways, and designing an organizational structure is not simple. The same is true for multi-agent systems. Let's look at some common communication patterns.

In the linear marketing workflow, the researcher works first, then the graphic designer, then the writer. The research output goes to the designer, and the writer can receive both the research and the graphic assets. This is a straightforward, largely linear pattern and one of the most common approaches.

Another common pattern is hierarchical coordination. A marketing manager communicates with several specialists and coordinates their work. It asks the researcher for a report, receives the result, passes the relevant information to the graphic designer, and then works with the writer.

When implementing this hierarchy, it is often simpler to have specialists return results to the manager instead of sending them directly to one another. **The manager acts as the central coordinator for the other agents' work.**

A more advanced option is a deeper hierarchy. The marketing manager might still oversee a researcher, designer, and writer, but some of those agents have their own sub-agents. The researcher could call on a web researcher and a fact-checker. The writer could use a drafting agent and a citation checker, while the designer works independently.

This lets one agent delegate to another level of specialists, but it is more complex than a single-level hierarchy. I see it in some applications, though less frequently than simpler arrangements.

A final pattern is all-to-all communication. Each agent can communicate with any other agent. In a four-agent system, every agent is told about the other three and can decide to send them messages. A message is added to the receiving agent's context, and that agent can respond when it has something to contribute.

The agents may collaborate until they each indicate that their work is complete, or until a designated agent, such as the writer, decides the result is ready. The system then produces the final output.

In practice, I find all-to-all behavior difficult to predict. An application that can tolerate variation might run the workflow and inspect the result. If a marketing brochure is unsatisfactory, the user might simply try another run. But this flexibility comes with less control over the process.

More communication does **NOT** automatically make the workflow easier to manage. All-to-all arrangements are most plausible in applications where some unpredictability is acceptable, and I see them mainly in more experimental projects.

Software frameworks can help implement these communication patterns, so you may find them useful when exploring your own multi-agent system. *Choose the communication pattern according to how the task is divided and how much coordination and predictability it requires.* We have now reached the final video of the module and the course.

## P29. Conclusion

Welcome to the final video. We have covered a lot together, starting with the applications that agentic AI makes possible and the ways to break complex tasks into workflows.

We then explored reflection, a relatively simple design pattern that can sometimes improve output quality. Tool use, or function calling, expanded the range of work an application can perform, with code execution as an especially powerful example.

We spent substantial time on evaluations and error analysis: how to build a disciplined process for examining behavior, identifying problems, and improving performance efficiently. **These development skills are among the most useful ideas to carry into future agentic AI projects.** I hope you will keep using them as you build more systems.

In the final module, we looked at planning and multi-agent collaboration. These patterns can enable more capable applications, while sometimes making them harder to control and predict.

With the skills from this course, you can now build a broad range of agentic AI applications. When my team and other teams interview candidates, they often assess many of the same capabilities you have been learning here. I hope the course opens professional opportunities as well as giving you new things to explore and build for yourself.

Whether you use these skills for fun or in practical professional work, I hope you enjoy what they make possible. Thank you for spending this time with me. *Take what you have learned, use it responsibly, and go build useful things.*
