---
title: Learner-Centered Use of Large Language Models
layout: bilingual
categories: Notes
subclass: LLMs
abbreviation: Learner-Centered LLMs
todos: drafting
---

## Introduction

Vibe coding is best understood as AI-first software development: the human specifies intent in natural language, the AI generates and edits substantial parts of the code, and the human steers by constraints, tests, review, and iteration. The term is widely traced to Andrej Karpathy’s February 2025 formulation, while more formal overviews now describe it as a development practice that makes app building accessible to less experienced programmers.

> Vibe coding 最好被理解为一种 AI 优先（AI-first）的软件开发方式：人类用自然语言说明意图，AI 负责生成并修改相当大一部分代码，而人类则通过约束、测试、审查和迭代来进行引导。“vibe coding”这一说法，通常被追溯到 Andrej Karpathy 在 2025 年 2 月的表述；而如今更正式的概述，则把它描述为一种让经验较少的程序员也能参与应用构建的开发实践。

> * AI-first [ˌeɪ aɪ ˈfɜːst] AI 优先；指把 AI 放在开发流程的核心位置，由 AI 承担主要生成与执行工作，人类更多负责目标设定、约束和校正
> * specifies intent 说明意图；明确表达自己希望系统完成什么
> * natural language [ˈnætʃrəl ˈlæŋɡwɪdʒ] 自然语言；人日常使用的语言，如英语、汉语，而不是编程语言
> * steers [stɪəz] v.引导；控制方向；在这里指人类不直接手写全部代码，而是通过反馈和限制来控制开发过程
> * constraints [kənˈstreɪnts] n.约束条件；对系统行为、代码风格、功能范围等提出的限制
> * iteration [ˌɪtəˈreɪʃən] n.迭代；不断修改、测试、再改进的循环过程
> * widely traced to 被普遍追溯到；通常认为来源于
> * formulation [ˌfɔːmjʊˈleɪʃən] n.表述；提法；概念被明确说出的方式
> * formal overviews 正式概述；较系统、较规范的介绍性说明
> * development practice 开发实践；在实际软件开发中采用的方法与工作方式
> * accessible to 对……更容易进入；降低使用门槛，使更多人能参与

A comprehensive introduction should separate three things that are often blurred together: the interaction model, the enabling technologies, and the production stack. The interaction model is “describe, generate, run, inspect, revise.” The enabling technologies are large language models, code-aware agents, tool calling, retrieval, testing, and deployment automation. The production stack is the actual frontend, backend, database, auth, storage, and hosting combination used to ship the app. Current platform documentation and 2026 ecosystem reports show that vibe coding is moving from simple autocomplete toward agentic workflows that can search a codebase, edit multiple files, run commands, and iterate on fixes.

> 一个完整的入门介绍，应当把三个经常被混在一起的东西区分开来：交互模型、使其成为可能的技术，以及生产栈（production stack）。交互模型是“描述、生成、运行、检查、修订”。使其成为可能的技术，包括大型语言模型、代码感知代理、工具调用、检索、测试以及部署自动化。生产栈则是实际用来把应用真正发布出去的前端、后端、数据库、身份认证、存储和托管组合。当前的平台文档和 2026 年的生态报告表明，vibe coding 正在从简单的自动补全，转向更具代理性的工作流；这种工作流能够搜索代码库、编辑多个文件、运行命令，并在修复问题时持续迭代。

> * comprehensive introduction 完整的入门介绍；覆盖核心结构与关键区别的系统说明
> * blurred together 混在一起；边界不清；容易被当成同一回事
> * interaction model 交互模型；人和 AI 在开发过程中如何来回配合的基本流程
> * enabling technologies 使其成为可能的技术；支撑这种开发方式运行的底层技术条件
> * production stack [prəˈdʌkʃən stæk] 生产栈；实际部署应用所使用的一整套技术组合，包括前端、后端、数据库等
> * describe, generate, run, inspect, revise 描述、生成、运行、检查、修订；这里概括了 vibe coding 的基本工作节奏
> * code-aware agents 代码感知代理；能够理解代码结构、项目上下文和开发任务的 AI 代理系统
> * tool calling 工具调用；模型或代理主动调用外部工具、命令或 API 来完成任务
> * retrieval [rɪˈtriːvəl] n.检索；从代码库、文档或外部资料中取回相关信息
> * deployment automation 部署自动化；把构建、测试、发布等流程自动化执行的技术
> * frontend [ˈfrʌntend] n.前端；用户直接看到和操作的界面部分
> * backend [ˈbækend] n.后端；处理业务逻辑、数据和服务响应的系统部分
> * auth [ɔːθ] n.身份认证；authentication 的常用简写，指登录、权限验证等机制
> * hosting [ˈhəʊstɪŋ] n.托管；把应用部署并运行在服务器或云平台上的服务
> * ecosystem reports 生态报告；对某一技术领域整体工具、平台和趋势的总结性报告
> * autocomplete [ˌɔːtəʊkəmˈpliːt] n.自动补全；根据上下文自动补出代码或文本
> * agentic workflows [eɪˈdʒentɪk ˈwɜːkfləʊz] 代理式工作流；由 AI 以较强自主性连续执行多个步骤的工作流程
> * codebase [ˈkəʊdbeɪs] n.代码库；一个项目的全部源代码及相关文件
> * iterate on fixes 围绕修复持续迭代；发现问题后不断修改、测试、再修正

### Core concept

At its strongest, vibe coding is not “letting AI write random code.” It is a workflow where specification becomes the primary interface. Instead of beginning with syntax, one begins with requirements: what should be built, for whom, with which constraints, and how success will be tested. Google’s overview frames this as a practice that broadens access to software creation, and Cursor’s agent documentation explicitly describes the agent as able to search code, edit multiple files, run terminal commands, and fix errors autonomously.

The human role therefore shifts, but it does not disappear. In the more serious form of vibe coding, the human is still responsible for scope control, architecture choice, correctness checks, and risk management. Anthropic’s 2026 report states that teams can “fully delegate” only a limited share of tasks and still need active supervision, validation, and judgment, especially for high-stakes work.

### elated key technologies

1. Foundation models for code  
The base layer is the code-capable large language model. These models turn natural-language requirements into source code, explanations, diffs, tests, and refactors. Their practical importance is that they compress the distance between idea and implementation. In vibe coding, the model is not merely completing a line; it is often drafting functions, files, routes, schemas, and test cases. Current tool ecosystems around Cursor, Replit Agent, and v0 all assume this model-centric workflow.

2. Agentic code editors and coding agents  
A major technical shift is from passive completion to active agents. Cursor’s Agent mode can search a codebase, edit multiple files, execute terminal commands, and fix errors. Replit Agent positions itself as a system that can take an app idea and build it automatically, while coordinating multiple tasks. This means vibe coding increasingly includes planning, execution, tool use, and iteration, not just code generation.

3. Tool calling and external system access  
Modern coding agents are useful only when they can act on the environment. That includes reading local files, calling APIs, querying databases, and invoking shell commands or browsers. Model Context Protocol, or MCP, has become a notable standardization effort here: its official docs describe it as an open standard for connecting AI applications to external systems, including data sources, tools, and workflows. This matters because vibe coding increasingly depends on reliable access to real project context rather than isolated chat prompts.

4. Retrieval and codebase context management  
As projects grow, the technical bottleneck becomes context management. The AI must understand repository structure, design intent, existing conventions, and dependencies. Tooling therefore increasingly emphasizes codebase search, file retrieval, and structured context injection. Cursor’s agent workflow and MCP both reflect this pattern: the model is most effective when grounded in files, docs, and environment state.

5. Agent orchestration frameworks  
When the task is larger than “generate one file,” orchestration becomes important. LangGraph’s official overview defines it as infrastructure for durable execution, streaming, and human-in-the-loop agent orchestration, and its workflow documentation distinguishes fixed workflows from dynamic agents. This is relevant because advanced vibe coding is gradually turning into workflow design: one step retrieves requirements, another drafts code, another runs tests, another reviews outputs.

6. Testing and browser automation  
Testing is not optional in vibe coding; it is the main antidote to plausible-looking but incorrect output. Playwright’s official site now explicitly presents it as useful for testing, scripting, and AI agents, and its best-practices documentation emphasizes cross-browser reliability. This is a key technical point: the more code is generated automatically, the more verification must be automated too.

1. Backend-as-a-service and infrastructure abstraction  
A large part of vibe coding’s speed comes from removing boilerplate infrastructure work. Supabase offers Postgres, Auth, Storage, Realtime, Functions, and vector embeddings in one platform. Firebase offers Firestore, Authentication, Hosting, and App Hosting for modern full-stack and AI web apps. Cloudflare Workers adds edge compute plus storage options such as D1, KV, and Durable Objects. These products matter because they let a model assemble a working application from standardized primitives instead of building every service manually.

1. Full-stack web frameworks  
Common vibe-coded applications are web apps, so full-stack frameworks matter. Next.js officially describes itself as a React framework for building full-stack web applications, and Vercel’s current positioning treats its platform as infrastructure for web apps and agentic workloads. In practice, this is why Next.js appears so often in AI-generated web projects: it gives the model a recognizable, structured target.

### Common technology stacks

The most useful way to think about stacks is by project type rather than by ideology.

1. Rapid SaaS or dashboard stack  
A very common stack is Next.js + Vercel + Supabase. Next.js handles the frontend and server-side application layer; Vercel provides deployment and operational simplicity; Supabase provides Postgres, auth, storage, and realtime services. This stack is popular because it is easy for both humans and models to reason about, and the interfaces are well documented and standardized. Use this when the project is a CRUD-heavy product, internal tool, admin panel, or lightweight SaaS.

1. Mobile/web prototype stack

A second common pattern is Firebase-centered: frontend framework of choice + Firebase Authentication + Firestore + Firebase Hosting or App Hosting. Firestore gives a managed NoSQL backend, while Hosting and App Hosting reduce operational work. Google’s recent Firebase material also shows increasing integration with AI-assisted app generation flows. Use this when fast cross-platform prototyping matters more than relational data modeling.

1. Edge-native real-time stack

Another increasingly relevant stack is frontend framework + Cloudflare Workers + D1 + Durable Objects + R2 or KV. Cloudflare documents Workers as the edge compute layer, D1 as serverless SQL, and Durable Objects as stateful coordination primitives for collaborative apps, chats, live systems, and AI agents. Use this when low-latency global behavior or real-time coordination is central.

1. All-in-one agentic builder stack

For users who want the highest abstraction, platforms such as Replit Agent and v0 are increasingly used as “prompt-to-app” environments. Replit markets AI-driven app and site creation from natural-language prompts, while Vercel’s new v0 is positioned toward production apps today and more end-to-end agentic workflows going forward. Use this when the goal is speed of prototyping, design iteration, or MVP exploration.

1. AI-agent application stack

For applications that themselves include AI agents, a common composition is frontend + backend or serverless runtime + model API + orchestration layer such as LangGraph + tool connectors via MCP + persistent storage. LangGraph’s official docs emphasize durable, stateful workflows and human-in-the-loop control, while MCP provides the interface to external systems. Use this when the product is not only built with AI, but also contains AI-driven behaviors.

### A practical layered view

Most vibe-coded systems can be mentally decomposed into six layers:

Intent layer: prompt, requirement, spec.
Generation layer: code model or coding agent.
Orchestration layer: workflow logic, tool calling, task decomposition.
Application layer: frontend and backend framework.
Data layer: SQL, NoSQL, object storage, vector storage.
Delivery layer: hosting, CI, testing, observability.

This layered view is more important than memorizing brand names, because specific tools will keep changing while the architecture pattern remains stable. The current trend reports and platform docs all point in this same direction: software creation is becoming a coordinated pipeline around AI rather than a purely manual coding activity.

### Technology development trends

1. From autocomplete to autonomous or semi-autonomous agents  
The clearest trend is that AI coding is moving beyond inline suggestion. Cursor documents agentic editing and command execution; Replit highlights task sequencing and parallel execution; Anthropic’s 2026 report explicitly frames 2026 around agentic coding. The workflow is shifting from “assist me while I type” to “take this task, work through the repo, run checks, and return a proposed result.”

1. From code generation to full software lifecycle assistance  
The agent is increasingly expected to help with planning, debugging, testing, deployment, and maintenance, not just draft source files. Vercel’s messaging now includes building, deploying, and scaling AI-powered and agentic workloads, and Playwright presents itself as infrastructure not only for tests but also for agent workflows.

1. More abstraction around backend and infrastructure  
BaaS and serverless platforms are becoming even more central because they offer stable primitives the model can assemble quickly. Supabase, Firebase, and Cloudflare all reduce the amount of custom infrastructure the human must design and the AI must hallucinate. This favors stacks built from composable platform services rather than bespoke infrastructure from day one.

1. Stronger standardization of tool access  
MCP is part of a broader trend toward standard interfaces between AI systems and external tools. The more software generation depends on real context, the more important standard and permission-aware tool access becomes. This trend matters for interoperability, enterprise integration, and security review.

1. Growth of multi-agent and workflow-based architectures  
As tasks become more complex, one model call is often replaced by a workflow: planner, coder, tester, reviewer, deployer. LangGraph’s positioning around durable execution and workflow/agent distinctions reflects this broader architectural shift. Anthropic’s report also points toward multi-agent coordination as an emerging pattern.

1. Greater emphasis on verification, evals, and human review  
The more code is generated, the more important evaluation becomes. Anthropic’s report stresses supervision and validation, while Playwright’s official materials underline reliable test automation. The future of vibe coding is therefore not pure automation; it is automation plus verification.

1. Expansion beyond engineers  
A notable ecosystem trend is that these tools increasingly target product managers, founders, designers, analysts, and domain experts, not only professional programmers. Google’s overview emphasizes broader accessibility, and Replit explicitly markets no-code-needed app creation from natural-language prompts.

1. Tension between speed and reliability  
The strategic tension is now clear: these systems can accelerate prototyping and internal-tool creation, but correctness, maintainability, and security remain limiting factors. Anthropic’s report does not present fully autonomous coding as solved; it presents a constrained, supervised collaboration model. That is the realistic trend line.

### How to think about the field in 2026

The best summary is this: vibe coding is evolving from a prompt trick into an engineering paradigm. The paradigm combines natural-language specification, agentic execution, standardized tool access, high-level platforms, and automated verification. The strongest near-term use cases are prototypes, internal tools, startup MVPs, research utilities, and small-to-medium web products. The weaker use cases remain high-assurance systems where security, compliance, or performance constraints require deep manual control.

For learning, the most important conclusion is that one should study vibe coding at two levels simultaneously: as a workflow and as a stack. At the workflow level, learn prompting, decomposition, repo steering, debugging, and testing. At the stack level, learn one frontend framework, one backend pattern, one database model, one hosting platform, and one testing tool. Today, a very practical beginner-professional path would be Next.js + Vercel + Supabase + Playwright, because those tools map well onto how current coding agents build and verify modern web apps.

### Common mistakes and easily confused points

Vibe coding is not identical to ordinary AI-assisted coding. If the human carefully reviews and understands everything, that is closer to disciplined AI-assisted development than to the stronger sense of “vibe coding” discussed in public definitions.

A tool stack is not the same as the enabling technologies. Next.js or Supabase are stack components; code models, agents, MCP, and orchestration frameworks are enabling technologies.

Fast prototyping is not the same as production readiness. Current reports and platform docs support speed and automation, but they do not remove the need for testing, review, and architecture decisions.

“Natural language programming” does not mean programming knowledge has become irrelevant. It means the locus of skill is moving upward: toward problem framing, system design, validation, and integration.
