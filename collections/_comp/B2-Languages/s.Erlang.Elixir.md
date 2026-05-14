---
title: Erlang / Elixir - Quick Reference
abbreviation: Erlang / Elixir
categories: Notes
subclass: Languages
---

## PART 1 — Language Identity, Design Philosophy, and Problem Space

### Target Assumptions — versions, runtime, implementation, and density strategy

This guide treats **Erlang / Elixir** as one combined learning target: a **BEAM / OTP language family**, not two separate tutorials. Erlang supplies the historical, semantic, and OTP-native foundation; Elixir supplies the modern syntax, tooling, macro system, and major contemporary ecosystem layer. This follows the supplied coverage contract for a unified Erlang / Elixir guide. 

**Version and runtime assumptions:** This guide targets **Erlang/OTP 28.x** and **Elixir 1.19.x** as the current mainstream professional baseline. Erlang’s official site lists **Erlang/OTP 28.5** as a release from April 23, 2026, and Elixir’s official documentation lists **Elixir v1.19** as stable, with supported Erlang/OTP versions **26, 27, and 28**. ([Erlang.org][1])

**Runtime assumption:** Both languages run on the **BEAM**, the Erlang virtual machine. Elixir’s official site describes Elixir as a dynamic, functional language that runs on the Erlang VM, which is known for low-latency, distributed, and fault-tolerant systems. ([The Elixir programming language][2])

**Implementation assumption:** Unless stated otherwise, “Erlang” means the standard Erlang/OTP implementation, and “Elixir” means the standard Elixir compiler and toolchain targeting BEAM bytecode.

**Density strategy:** adaptive — Erlang / Elixir require deep treatment where the shared BEAM / OTP model changes ordinary programming assumptions, and more concise treatment where a feature is only syntactic surface or ecosystem convention.

### What Erlang / Elixir Is — BEAM family, functional language pair, and OTP system

Erlang / Elixir is best understood as a **language family organized around one runtime and one architectural tradition**.

The runtime is `BEAM`.

The architectural tradition is `OTP`.

The programming model is mostly functional, message-passing, process-oriented, fault-tolerant, and distribution-aware.

Erlang and Elixir are not related in the way two merely similar languages are related. They are related more directly:

| Layer              | Erlang’s role                                          | Elixir’s role                                          | Shared foundation                                        |
| ------------------ | ------------------------------------------------------ | ------------------------------------------------------ | -------------------------------------------------------- |
| Runtime            | Native historical language of the BEAM ecosystem       | Compiles to BEAM bytecode                              | BEAM VM                                                  |
| Concurrency        | Original process/message-passing model                 | Same process/message-passing model with modern syntax  | Lightweight processes, mailboxes, links, monitors        |
| Fault tolerance    | Original OTP supervision tradition                     | Uses and extends OTP ergonomically                     | Supervisors, applications, behaviours                    |
| Syntax             | Prolog-influenced, compact, older                      | Ruby-influenced, modern, macro-friendly                | Pattern matching, immutability, functional decomposition |
| Ecosystem          | OTP libraries, telecom heritage, mature infrastructure | Mix, Hex, ExUnit, Phoenix, LiveView, DSL-heavy tooling | Interoperability through BEAM modules and data types     |
| Design personality | Conservative, reliability-oriented                     | Expressive, developer-experience-oriented              | Actor-style concurrency and fault tolerance              |

**Core definition:** Erlang / Elixir is a **dynamic, strongly typed, functional, concurrent, actor-model-influenced language family for building reliable, long-running, distributed systems on the BEAM virtual machine**.

That sentence needs careful qualification.

**Dynamic typing** means type checking happens primarily at runtime rather than by a complete static type checker before execution. Elixir’s recent type-system work and Erlang/Elixir `typespec` tooling improve static analysis, but they do not turn the system into ML, Haskell, Rust, Java, or TypeScript-style static typing.

**Strong typing** here means values are not silently coerced in arbitrary ways. An integer, atom, tuple, binary, list, PID, function, and map remain distinct runtime categories. However, “strong typing” is not a formal guarantee of program correctness. It is a practical description, not a proof of soundness.

**Functional** means programs are primarily built from functions, immutable values, recursion, pattern matching, and transformations over data. It does not mean the language is pure. Erlang / Elixir programs perform I/O, mutate process state, send messages, write databases, crash, restart, and interact with external systems.

**Concurrent** means many independent flows of execution can make progress conceptually at the same time. It is not the same as **parallelism**, which means actual simultaneous execution on multiple CPU cores. BEAM supports both concurrent process modeling and parallel scheduler execution, but they are distinct ideas.

**Actor-model-influenced** means the programming model is built around isolated processes communicating by messages. BEAM processes are not OS processes, and they are not ordinary objects. They are lightweight runtime entities with their own heap, mailbox, and lifecycle.

### Why Erlang Exists — reliability, telecom systems, and long-running services

Erlang was created for systems where failure is normal, downtime is costly, and concurrent communication is central. Its historical home was telecom infrastructure: systems with many concurrent connections, long uptimes, incremental upgrades, distribution, and strict reliability expectations.

This background explains several otherwise unusual design choices.

| Historical pressure                      | Erlang / BEAM response                | Practical consequence                                                                                         |
| ---------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Many simultaneous communication sessions | Lightweight processes                 | Model each conversation, connection, worker, or state machine independently                                   |
| Hardware and network failures            | Supervision trees                     | Design recovery paths explicitly instead of assuming no crash                                                 |
| Long-running systems                     | Hot code loading and release handling | Support controlled evolution of running systems, though modern deployment often uses rolling restarts instead |
| Complex shared-state bugs                | Process isolation and message passing | Reduce shared mutable state; move coordination into explicit messages                                         |
| Operational reliability                  | “Let it crash” philosophy             | Distinguish local failure from system failure                                                                 |
| Distributed services                     | Node-level distribution primitives    | Make distributed computation possible, though not magically safe                                              |

The important point is that Erlang was not designed primarily as a language for local scripts, numerical computing, browser apps, or low-level systems programming. It was designed around **availability**, **concurrency**, and **fault containment**.

That origin still shapes Elixir. Elixir did not discard the Erlang model. It made the model more approachable and expressive for modern developers.

### Why Elixir Exists — modern syntax, tooling, metaprogramming, and ecosystem expansion

Elixir exists because BEAM / OTP is powerful, but Erlang’s syntax, tooling style, and ecosystem culture can feel unfamiliar to programmers coming from Ruby, Python, JavaScript, or modern web frameworks.

Elixir’s design response was not to replace BEAM. It was to make BEAM more ergonomic.

| Problem Elixir addresses         | Elixir design response                                            | Cost introduced                                                             |
| -------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Erlang syntax can feel alien     | Ruby-like syntax, pipe operator, clearer module syntax            | Surface syntax may hide the fact that BEAM semantics remain unchanged       |
| OTP can be conceptually heavy    | Friendly wrappers around `GenServer`, `Supervisor`, `Application` | Beginners may use abstractions before understanding processes and mailboxes |
| Erlang tooling feels traditional | `Mix`, `Hex`, `ExUnit`, project generators                        | More ecosystem convention to learn                                          |
| Need expressive DSLs             | Hygienic macro system                                             | Macros can obscure control flow and compile-time/runtime boundaries         |
| Need modern web ecosystem        | Phoenix, Plug, Ecto, LiveView                                     | Framework conventions can be mistaken for language semantics                |

Elixir is therefore a **modern BEAM language**, not a BEAM alternative. Elixir programs still run on the Erlang VM. Elixir modules can call Erlang modules directly. Erlang libraries remain foundational in Elixir applications.

A professional learner should therefore avoid the mistake of thinking:

> “I am learning Elixir instead of Erlang.”

The better mental model is:

> “I am learning BEAM / OTP through Elixir’s modern interface, while learning enough Erlang to read the original ecosystem.”

### The Central Organizing Principle — BEAM first, Erlang and Elixir second

The cleanest way to learn Erlang / Elixir is not to put two language tutorials side by side. That produces duplication and confusion.

The correct hierarchy is:

```text
BEAM / OTP foundation
├── Erlang-native language and ecosystem layer
└── Elixir modern language and ecosystem layer
```

This guide will therefore classify each concept as one of the following:

| Concept kind                | Example                                                    | Why the distinction matters                                  |
| --------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| Shared BEAM behavior        | processes, PIDs, mailboxes, schedulers, garbage collection | Same runtime semantics in Erlang and Elixir                  |
| OTP architectural pattern   | `GenServer`, `Supervisor`, `Application`                   | Same architectural foundation, different syntax and wrappers |
| Erlang language syntax      | `case`, `receive`, records, `-module`, `-behaviour`        | Needed for reading Erlang docs and old systems               |
| Elixir language syntax      | `defmodule`, `def`, pipe operator, sigils, protocols       | Needed for modern Elixir code and frameworks                 |
| Erlang standard library     | `:timer`, `:gen_tcp`, `:crypto`, `ets`                     | Often called directly from Elixir                            |
| Elixir standard library     | `Enum`, `Stream`, `Task`, `Agent`, `Registry`              | Provides idiomatic Elixir interfaces over BEAM capabilities  |
| Elixir ecosystem convention | Phoenix routes, Ecto schemas, LiveView callbacks           | Important in practice but not core language semantics        |

This distinction prevents a common learning error: treating Elixir syntax as if it changes the underlying runtime model. It does not. The pipe operator does not change evaluation into lazy streaming. `GenServer` does not eliminate mailbox risks. Phoenix does not make distributed systems simple. Macros do not remove the need to understand generated code.

### Language Personality — design dimensions and tradeoffs

Erlang / Elixir has a sharply defined personality. It is not a general-purpose “best at everything” language family. It excels when the problem matches the BEAM model.

| Design dimension  | Erlang / Elixir choice                             | Practical consequence                                  | Tradeoff                                                                       |
| ----------------- | -------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Typing            | Dynamic, strong, with optional specs and analysis  | Fast iteration; runtime flexibility                    | Some errors appear only at runtime or through separate analysis tools          |
| Core paradigm     | Functional, concurrent, process-oriented           | Clear data transformation and failure isolation        | Less natural for mutation-heavy object modeling                                |
| State model       | Immutable values plus process-local state          | Avoids shared mutable-memory bugs                      | State must be modeled explicitly through recursion or processes                |
| Concurrency model | Lightweight isolated processes and message passing | Natural for many independent tasks                     | Overload, mailbox growth, and backpressure require discipline                  |
| Error model       | Return tuples, exceptions, exits, supervision      | Supports local error handling and systemic recovery    | Misuse leads to either defensive clutter or reckless crashing                  |
| Runtime           | Managed VM with schedulers and per-process GC      | Good latency profile for many soft real-time workloads | Not ideal for CPU-bound tight loops without native/dirty scheduler care        |
| Metaprogramming   | Strong in Elixir, more limited in Erlang           | Enables DSLs and expressive APIs                       | Can obscure code generation and control flow                                   |
| Distribution      | Built-in distributed Erlang primitives             | Makes node communication part of the model             | Distributed systems remain hard: partitions, security, serialization, ordering |
| Tooling           | Erlang/OTP tools plus Elixir Mix/Hex/ExUnit        | Strong project workflow in Elixir                      | Mixed Erlang/Elixir environments require cross-ecosystem literacy              |

**Key tradeoff:** Erlang / Elixir optimizes for **fault-tolerant concurrent systems**, not for maximum single-threaded numeric speed, static type guarantees, low-level memory control, or minimal runtime footprint.

### What It Makes Easy — concurrent services, fault boundaries, and long-running systems

Erlang / Elixir makes certain tasks unusually natural.

| Easy or natural task          | Why it is natural                                             | Example domain                                    |
| ----------------------------- | ------------------------------------------------------------- | ------------------------------------------------- |
| Many independent workers      | Lightweight processes are cheap compared with OS threads      | chat systems, connection handling, job processing |
| Stateful servers              | `GenServer` encapsulates state and message handling           | session state, caches, coordinators               |
| Fault isolation               | Process crashes do not automatically corrupt global memory    | resilient services                                |
| Supervised recovery           | Supervisors encode restart policy                             | long-running background systems                   |
| Soft real-time responsiveness | BEAM scheduling favors responsiveness under many workloads    | messaging, telecom-style systems, live web apps   |
| Distributed coordination      | BEAM nodes can communicate directly                           | clusters, distributed workers                     |
| Web real-time interaction     | Phoenix and LiveView exploit BEAM concurrency                 | dashboards, collaborative interfaces              |
| Operational introspection     | Runtime tools expose processes, mailboxes, reductions, memory | debugging production systems                      |

The most important benefit is not “it has actors.” Many systems can implement actors. The benefit is that **actors, fault tolerance, and runtime scheduling are integrated into the language ecosystem and standard architecture**.

### What It Makes Hard — CPU-bound computation, global mutation, and static guarantees

Erlang / Elixir also makes some things less natural.

| Harder task                     | Why it is harder                                       | Better interpretation                                                                  |
| ------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Tight CPU-bound numeric loops   | BEAM is not primarily a numeric HPC runtime            | Use native extensions carefully, external services, or specialized libraries           |
| Shared mutable data structures  | The model discourages shared-memory mutation           | Use process ownership, ETS, persistent data, or databases                              |
| Compile-time type proof         | Dynamic typing is core to the language family          | Use specs, Dialyzer, Elixir type checking improvements, tests, and boundary validation |
| Low-level memory layout control | BEAM is a managed VM                                   | Use NIFs or ports only when the boundary is justified                                  |
| Simple global state             | Global mutable state conflicts with fault isolation    | Model state ownership explicitly                                                       |
| Naive distributed consistency   | Node messaging is easy; distributed correctness is not | Treat distribution as a systems problem, not a syntax feature                          |
| Macro-heavy readability         | Elixir macros can hide generated code                  | Use macros for language-building, not ordinary abstraction                             |

This is why Erlang / Elixir is often excellent for **concurrent orchestration**, but not automatically the best choice for **number crunching**, **embedded minimal binaries**, **compiler-enforced domain modeling**, or **large static type-driven refactoring**.

### What It Deliberately Discourages — shared mutable state and defensive monoliths

Erlang / Elixir discourages several habits that are common in other language ecosystems.

| Discouraged habit                                | Why it conflicts with the model                                         | Better BEAM habit                                                                |
| ------------------------------------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Sharing mutable objects across threads           | BEAM processes do not share heap state in the ordinary way              | Own state inside a process; communicate by messages                              |
| Treating a process as an object                  | A process has lifecycle, mailbox, failure behavior, and scheduling cost | Use processes for concurrency, isolation, state ownership, or failure boundaries |
| Catching every exception defensively             | Supervision exists to recover from certain failures                     | Let appropriate processes crash; validate expected errors locally                |
| Building one large process that knows everything | Large process state becomes bottleneck and failure concentration        | Split supervision and ownership boundaries                                       |
| Using macros for ordinary functions              | Macro expansion hides runtime logic                                     | Prefer functions unless syntax generation is the actual goal                     |
| Creating atoms from untrusted input              | Atoms are not garbage-collected in the usual safe way                   | Convert untrusted names to strings or existing atoms only with care              |
| Ignoring mailbox size                            | Message passing is not automatic backpressure                           | Monitor mailbox growth and design demand/control protocols                       |

The language family rewards a design style where **state has an owner**, **failure has a boundary**, and **communication is explicit**.

### What It Leaves to Programmer Discipline — boundaries, overload, and data validity

Erlang / Elixir provides strong runtime architecture, but it does not solve every engineering problem.

| Area left to discipline | What the language gives                                 | What it does not guarantee                                                  |
| ----------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------- |
| Data validity           | Pattern matching, guards, tagged tuples, structs, specs | Full static validation of domain invariants                                 |
| API contracts           | Behaviours, protocols, specs, tests                     | Complete compile-time interface soundness                                   |
| Backpressure            | Mailboxes, process monitoring, libraries                | Automatic overload safety                                                   |
| Distribution            | Node communication, serialization, process names        | Correctness under partitions, latency, deployment drift                     |
| Resource safety         | Processes, supervisors, `try/after`, OTP patterns       | RAII-style deterministic cleanup for all resources                          |
| Security                | Runtime isolation between BEAM processes                | Security isolation equivalent to OS processes or containers                 |
| Macro maintainability   | Hygienic macro tools                                    | Automatic readability or debuggability                                      |
| Performance             | Efficient concurrency runtime                           | Free speed regardless of message volume, binaries, ETS use, or NIF behavior |

This matters because BEAM beginners often overgeneralize the slogans.

“Let it crash” does not mean “do not handle errors.”

“Processes are cheap” does not mean “spawn a process for every tiny expression.”

“Message passing avoids shared-state bugs” does not mean “message systems cannot overload.”

“Distributed Erlang exists” does not mean “distributed systems are easy.”

### Interdisciplinary Foundations — actor model, runtime systems, and metaprogramming

The supplied learning target explicitly calls for three specialized lenses: actor-model fault tolerance, BEAM runtime concepts, and Elixir metaprogramming/ecosystem design. These lenses should clarify the language, not replace ordinary syntax and practice.

| Lens or external field              | Core idea                                                                   | Language features clarified                                            | Practical programming consequence                                               | Where it appears in the guide          | Limit of the lens                                                            |
| ----------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------- |
| Actor model and distributed systems | Independent entities communicate by messages                                | processes, mailboxes, `send`, `receive`, links, monitors, distribution | Design around ownership, isolation, explicit communication, and failure domains | PART 1, PART 4, PART 5, PART 7, PART 9 | BEAM processes are actor-like but not identical to every formal actor model  |
| Fault-tolerance engineering         | Systems should contain, detect, and recover from failures                   | supervisors, restart strategies, exits, “let it crash”                 | Move from local defensive coding to systemic recovery design                    | PART 1, PART 5, PART 7, PART 9         | Supervision does not replace validation, observability, or capacity planning |
| Runtime systems                     | Language behavior depends on VM scheduling, memory, GC, and execution model | schedulers, reductions, per-process GC, binaries, NIFs                 | Reason about latency, memory, process count, and overload                       | PART 7, PART 9, PART 10                | Runtime knowledge does not automatically imply good API design               |
| Metaprogramming                     | Programs can generate or transform program structure                        | Elixir macros, DSLs, compile-time expansion                            | Build expressive frameworks and domain-specific APIs                            | PART 4, PART 6, PART 9                 | Macro power can damage clarity if ordinary functions would suffice           |
| Ecosystem analysis                  | Tools and conventions shape what the language feels like in practice        | Mix, Hex, ExUnit, Phoenix, Ecto, Erlang/OTP libraries                  | Distinguish language semantics from framework convention                        | PART 6, PART 8, PART 9                 | Ecosystem trends change faster than core BEAM semantics                      |

**Interdisciplinary Lens: actor-model systems**

**What it clarifies:** Erlang / Elixir concurrency is based on isolated processes communicating by messages rather than shared-memory threads.

**Language feature involved:** `spawn`, `send`, `receive`, PIDs, mailboxes, links, monitors, `GenServer`.

**Practical consequence:** When designing a system, ask which process owns which state, which messages it accepts, what happens if it crashes, and who supervises it.

**Limit of the lens:** The actor model does not automatically solve ordering, overload, distributed consensus, schema evolution, or security.

### Design Philosophy — isolation, recovery, and explicit communication

The core philosophy of Erlang / Elixir can be summarized as follows:

```text
Isolate state.
Communicate explicitly.
Fail locally.
Recover structurally.
Keep the system responsive.
```

Each phrase corresponds to a design mechanism.

| Philosophy             | Mechanism                              | Practical meaning                                           |
| ---------------------- | -------------------------------------- | ----------------------------------------------------------- |
| Isolate state          | Process-local heaps and immutable data | Avoid uncontrolled shared mutation                          |
| Communicate explicitly | Messages and function calls            | Make coordination visible                                   |
| Fail locally           | Process crashes and exits              | Keep failure from corrupting unrelated work                 |
| Recover structurally   | Supervisors and restart strategies     | Put recovery policy in architecture                         |
| Keep responsive        | BEAM scheduling and reductions         | Prefer many small schedulable units over long blocking work |

This design philosophy is different from the default approach in many mainstream languages.

In Java, Go, Python, or JavaScript, concurrency is often introduced as a feature added to a general programming model. In Erlang / Elixir, concurrency is closer to the center of the language’s identity.

In Rust, a major theme is memory safety and ownership. In Erlang / Elixir, the major theme is process isolation and fault recovery.

In Haskell, a major theme is purity and static type-driven abstraction. In Erlang / Elixir, the major theme is practical reliability in dynamic, concurrent systems.

In Ruby, a major theme is expressive developer happiness. Elixir inherits some of that surface expressiveness, but under BEAM constraints and OTP discipline.

### The Error Philosophy — return values, exceptions, exits, and supervision

Erlang / Elixir does not have only one error mechanism. It has several, each belonging to a different layer.

| Error mechanism       | Typical form                        | Meaning                                    | Best use                             |
| --------------------- | ----------------------------------- | ------------------------------------------ | ------------------------------------ |
| Tagged return value   | `{:ok, value}` / `{:error, reason}` | Expected recoverable outcome               | File reads, parsing, external calls  |
| Pattern match failure | unmatched pattern                   | Programmer asserted a shape that was false | Fail fast when invariant is expected |
| Exception             | `raise`, `try/rescue`               | Exceptional local failure                  | Boundary handling, library errors    |
| Throw/catch           | non-local control escape            | Specialized control flow                   | Rare; avoid in ordinary code         |
| Exit                  | process termination signal          | Process-level failure or shutdown          | OTP lifecycle and linked processes   |
| Supervisor restart    | architectural recovery              | Replace failed process according to policy | Long-running systems                 |

The tempting but wrong mental model is:

> “Good code catches all errors.”

In Erlang / Elixir, better code distinguishes **expected errors**, **invalid assumptions**, and **process failures**.

Expected errors should often be represented as data.

Invalid assumptions may be allowed to crash.

Process failures should be placed inside a supervision structure.

The correct question is not “Should this error be caught?” The correct question is:

> “At what boundary should this failure become data, and at what boundary should it become a crash?”

### The Concurrency Philosophy — processes are cheap, but not free

BEAM processes are lightweight compared with OS threads, but they still have cost. They have memory, scheduling overhead, mailboxes, heap growth, garbage collection behavior, and lifecycle complexity.

| Claim                         | Correct interpretation                                             | Dangerous overinterpretation                   |
| ----------------------------- | ------------------------------------------------------------------ | ---------------------------------------------- |
| Processes are cheap           | It is reasonable to model many independent activities as processes | Spawn processes for every trivial computation  |
| Processes are isolated        | A crashing process need not corrupt another process’s heap         | Ignore all coordination and observability      |
| Message passing is safe       | It avoids many shared-memory data races                            | It cannot overload or deadlock                 |
| Supervision recovers failures | Restart policies can restore service components                    | Restarting always fixes the underlying problem |
| BEAM is distributed           | Nodes can communicate using built-in mechanisms                    | Network partitions and security disappear      |

**Failure-first explanation:** A beginner may create a process for every entity because “BEAM processes are cheap.” The system works in tests, then fails under load because mailboxes grow, processes retain large binaries, or supervisors restart too aggressively. The correct semantic explanation is that a process is a concurrency and fault-isolation unit, not a free object. The professional rule is to create processes where there is independent state, lifecycle, blocking behavior, fault boundary, or scheduling value. The boundary changes when a library or framework supplies a higher-level abstraction, such as `Task`, `GenServer`, `Registry`, `DynamicSupervisor`, or Broadway-style pipelines.

### The Data Philosophy — immutable values, explicit shape, and tagged meaning

Erlang / Elixir data modeling often relies on **simple runtime values with explicit shape**.

The most important shapes include atoms, tuples, lists, maps, binaries, structs, records, PIDs, refs, and functions.

| Modeling need        | Common Erlang form                | Common Elixir form                  | Meaning                                   |
| -------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------- |
| Named status         | `{ok, Value}` / `{error, Reason}` | `{:ok, value}` / `{:error, reason}` | Tagged outcome                            |
| Product data         | tuple or record                   | map or struct                       | Fixed fields or named fields              |
| Sequence             | list                              | list                                | Linked list, good for head/tail recursion |
| Key-value data       | map / proplist                    | map / keyword list                  | Associative data                          |
| Text/binary protocol | binary                            | binary/string                       | Byte-oriented or UTF-8 data               |
| Process identity     | PID                               | PID                                 | Runtime process handle                    |
| Unique reference     | reference                         | reference                           | Correlation token, monitor ref            |
| Behavior contract    | behaviour callback                | behaviour or protocol               | Abstraction boundary                      |

The design tradeoff is that Erlang / Elixir data is often transparent and easy to pattern-match, but the language does not enforce all domain invariants statically. A tuple like `{:ok, user}` is easy to produce and match; the compiler generally does not prove that every caller handled every possible tagged variant.

That creates a professional habit: **validate at boundaries, pattern-match at trusted interiors, and use supervisors for failure domains**.

### The Type-System Personality — dynamic, strong, analyzable, but not fully static

Erlang / Elixir is dynamically typed. This means that type information belongs primarily to runtime values, not to statically enforced variable declarations.

However, the system is not “anything goes.” Runtime values have clear types, operations expect certain types, pattern matching enforces shapes, guards restrict acceptable checks, and optional tools such as specs and Dialyzer add analysis.

| Type-system property         | Erlang / Elixir behavior                                         | Practical consequence                                                                      |
| ---------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Dynamic typing               | Types checked primarily at runtime                               | Fast iteration; some bugs appear late                                                      |
| Strong runtime distinctions  | Values do not freely coerce across unrelated categories          | Fewer silent conversion bugs                                                               |
| Pattern-based shape checking | Function clauses and matches enforce structure                   | Data contracts can be encoded in patterns                                                  |
| Optional specs               | `-spec` in Erlang, `@spec` in Elixir                             | Documentation and static analysis support                                                  |
| Dialyzer-style analysis      | Finds discrepancies but is not a conventional sound type checker | Useful for large systems, but not a substitute for full static typing                      |
| Elixir type-system evolution | Recent Elixir releases continue improving type checking          | The ecosystem is moving toward more compile-time feedback, while remaining BEAM-compatible |

Elixir’s recent releases have emphasized type-checking improvements; the official Elixir v1.19 release announcement describes enhanced type checking and faster compilation for large projects. ([The Elixir programming language][3])

The important professional judgment is to avoid two extremes.

One extreme says: “It is dynamic, so types do not matter.” False. Erlang / Elixir code is full of implicit and explicit shape contracts.

The other extreme says: “Specs make it statically typed.” Also false. Specs and analysis help, but they do not make the language equivalent to Rust, OCaml, Haskell, Java, or TypeScript.

### The Object Model Question — processes are not objects

Erlang / Elixir is not object-oriented in the ordinary class-instance-inheritance sense. Elixir has structs and protocols. Erlang has modules, records, and behaviours. OTP has processes that hold state. None of these is the same as classical OOP.

A common but dangerous analogy is:

> “A `GenServer` is like an object.”

This analogy is partially useful and mostly dangerous.

| OOP concept     | Similar BEAM concept             | What transfers                 | What changes                                                      |
| --------------- | -------------------------------- | ------------------------------ | ----------------------------------------------------------------- |
| Object identity | PID or registered process name   | There can be a stable handle   | The handle refers to a running process with lifecycle and mailbox |
| Instance state  | `GenServer` state                | State can be encapsulated      | State is accessed by messages, not direct method calls            |
| Method call     | `GenServer.call` / `cast`        | Public operations can be named | Calls may block, fail, timeout, queue, or cross nodes             |
| Constructor     | process start function           | Initialization exists          | Startup is part of supervision and lifecycle                      |
| Inheritance     | behaviours/protocols/composition | Shared contracts exist         | Inheritance hierarchy is not the primary reuse model              |

**Failure-first explanation:** The wrong mental model treats every domain entity as a process-object. This creates thousands or millions of long-lived processes with tiny state, unnecessary serialization, mailbox risks, and complex supervision. The correct explanation is that a process is a unit of concurrency, state ownership, failure isolation, and lifecycle — not merely a data container. The rule of thumb is: use plain data for passive facts; use a process when independent execution, failure behavior, or serialized access to state matters.

### Erlang and Elixir Compared — same runtime, different surface and ecosystem

Erlang and Elixir differ most at the syntax, tooling, metaprogramming, and ecosystem layers.

| Dimension           | Erlang                                                | Elixir                                    | Shared reality                                        |
| ------------------- | ----------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------- |
| Syntax style        | Compact, Prolog-influenced                            | Ruby-like, pipeline-oriented              | Both compile to BEAM                                  |
| Module declaration  | `-module(name).`                                      | `defmodule Name do ... end`               | Modules become BEAM modules                           |
| Function definition | `foo(X) -> ... .`                                     | `def foo(x), do: ...`                     | Pattern matching and clauses are central              |
| Atoms               | `ok`, `error`                                         | `:ok`, `:error`                           | Same atom table                                       |
| Strings             | Historically charlists and binaries depending context | UTF-8 binaries by default                 | Binary/string distinctions still matter               |
| Records/structs     | Records are compile-time tuple abstraction            | Structs are maps with module identity     | Both are runtime data conventions over BEAM values    |
| Behaviour contracts | `-behaviour(gen_server).`                             | `@behaviour GenServer` or `use GenServer` | OTP behaviours define callback contracts              |
| Tooling             | `rebar3`, `erl`, Common Test, EUnit                   | `mix`, `iex`, ExUnit, Hex                 | Mixed projects are common                             |
| Metaprogramming     | Parse transforms exist but are less central           | Macros are central and hygienic           | Generated BEAM code must still obey runtime semantics |

Elixir is usually easier for modern application development. Erlang is often clearer when reading low-level OTP documentation, old infrastructure, telecom-style systems, and BEAM-native APIs.

Professional competence in Elixir therefore includes **reading enough Erlang**.

Professional competence in Erlang increasingly benefits from understanding **Elixir ecosystem patterns**, especially where BEAM adoption is driven by Phoenix, LiveView, data pipelines, Nerves, or modern tooling.

### Relationship to Adjacent Languages — similarities and non-equivalences

Erlang / Elixir is often compared to Ruby, Go, Akka, Scala, Haskell, Rust, Node.js, and Clojure. These comparisons are useful only if their limits are clear.

| Adjacent language or ecosystem | Similarity                                                   | Important difference                                                                                              |
| ------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Ruby                           | Elixir syntax and developer ergonomics feel partly Ruby-like | Runtime model, immutability, pattern matching, and OTP are fundamentally different                                |
| Go                             | Both are used for concurrent services                        | Go uses goroutines and channels; BEAM uses isolated processes, mailboxes, supervision, and VM scheduling          |
| Akka / actor systems           | Actor-like message-passing model                             | BEAM actor-style processes are built into the runtime and OTP tradition                                           |
| Scala                          | Functional and concurrent abstractions                       | Scala is statically typed and JVM-based; BEAM optimizes different failure and scheduling assumptions              |
| Haskell                        | Functional programming and pattern matching                  | Haskell emphasizes purity and static types; Erlang / Elixir emphasizes fault-tolerant runtime systems             |
| Rust                           | Strong reliability culture                                   | Rust emphasizes memory safety and zero-cost abstractions; BEAM emphasizes fault isolation and managed concurrency |
| Node.js                        | Evented network services and high concurrency                | Node centers on event loop and async callbacks/promises; BEAM centers on many preemptively scheduled processes    |
| Python                         | Dynamic productivity                                         | Python lacks BEAM’s native process model and OTP supervision architecture                                         |
| Clojure                        | Immutable data and functional style                          | Clojure is hosted mainly on JVM/JS/CLR; BEAM has a different process and fault model                              |

The essential distinction is that Erlang / Elixir is not merely “functional Ruby” or “Go with actors.” It is a runtime-centered ecosystem whose abstractions make the most sense when viewed through BEAM and OTP.

### Transfer Map — what to keep, adjust, and unlearn

| Source-language habit or concept | How it appears in Erlang / Elixir        | What transfers                        | What changes                                        | Common failure mode                                 | Better mental model                                  |
| -------------------------------- | ---------------------------------------- | ------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------- |
| Ruby expressive syntax           | Elixir syntax, blocks, DSLs              | Readable APIs and expressive code     | Data is immutable; concurrency model is different   | Writing Ruby-style mutable object logic             | Think transformations plus processes                 |
| Python dynamic programming       | Runtime values, flexible data            | Fast iteration and simple data shapes | Pattern matching and atoms are more central         | Treating maps/dicts as unvalidated everywhere       | Validate boundaries, pattern-match interiors         |
| Java objects and services        | Modules, structs, `GenServer`s           | Encapsulation and public APIs         | No class inheritance model for normal design        | Treating `GenServer` as an object                   | Processes are lifecycle/failure units                |
| Go goroutines                    | BEAM processes                           | Lightweight concurrency               | Mailboxes, links, monitors, supervision differ      | Assuming channels and BEAM mailboxes are equivalent | Design ownership and restart boundaries              |
| JavaScript async                 | `Task`, processes, messages              | Non-blocking service thinking         | BEAM uses preemptive scheduling, not one event loop | Thinking all concurrency is promise-like            | Think many isolated processes                        |
| Rust reliability                 | Explicit boundaries and failure thinking | Discipline around correctness         | No ownership/borrow checker                         | Expecting compile-time memory/domain proof          | Use process isolation, specs, tests, validation      |
| Haskell pattern matching         | Function clauses and data decomposition  | Functional decomposition              | No purity and no full static type system            | Assuming type-level exhaustiveness                  | Treat patterns as runtime shape contracts            |
| Akka actors                      | Actor-style design                       | Message-passing architecture          | BEAM actors are runtime-native and OTP-supervised   | Importing Akka-specific patterns mechanically       | Learn OTP supervision and process semantics directly |

### Mature, Emerging, and Overhyped Trends — current ecosystem interpretation

Erlang / Elixir is mature, but not static. Some trends are stable and central; others are emerging; some are overhyped when detached from BEAM realities.

| Trend category             | Trend                                         | Status                         | Driving pressure                                  | Caveat                                                      |
| -------------------------- | --------------------------------------------- | ------------------------------ | ------------------------------------------------- | ----------------------------------------------------------- |
| Mature                     | OTP supervision and process architecture      | Core practice                  | Need reliable long-running services               | Must still design failure boundaries correctly              |
| Mature                     | Phoenix for web systems                       | Mainstream Elixir ecosystem    | Productive real-time web development              | Phoenix conventions are not BEAM semantics                  |
| Mature                     | Mix, Hex, ExUnit workflow                     | Standard Elixir workflow       | Modern project ergonomics                         | Erlang projects may use different tooling                   |
| Mature                     | Observability and runtime introspection       | Operationally central          | Production debugging of concurrent systems        | Tools do not replace good architecture                      |
| Emerging                   | Elixir type-system improvements               | Active development             | More compile-time feedback in large codebases     | Still not a fully static type system                        |
| Emerging                   | Numerical Elixir / ML / native interop        | Growing                        | Demand for data and numerical workloads           | BEAM remains less natural for raw numeric kernels           |
| Emerging                   | Portable and interoperable Elixir deployments | Growing                        | Edge, embedded, notebooks, multi-runtime pressure | Portability can expose runtime boundary complexity          |
| Overhyped if misunderstood | “Let it crash”                                | Valid but often oversimplified | Desire for robust systems                         | Crashing without supervision design is negligence           |
| Overhyped if misunderstood | “Processes are free”                          | False slogan                   | Lightweight process enthusiasm                    | Processes are cheap, not free                               |
| Overhyped if misunderstood | “Elixir replaces Erlang”                      | Incorrect                      | Modern syntax preference                          | Erlang/OTP remains foundational                             |
| Overhyped if misunderstood | “Distributed Erlang solves distribution”      | Incorrect                      | Built-in clustering appeal                        | Consensus, partitions, deployment, and security remain hard |

Elixir’s official development page states that Elixir 1.0 was released in September 2014 and that minor versions are released roughly every six months. That cadence helps explain why Elixir feels more rapidly evolving at the tooling and language-feature level than the deeper BEAM/OTP foundation. ([The Elixir programming language][4])

### Strengths and Costs — the central tradeoff table

| Strength                | Capability gained                     | Cost introduced                             | Programs that benefit               | Programs that suffer                   |
| ----------------------- | ------------------------------------- | ------------------------------------------- | ----------------------------------- | -------------------------------------- |
| Lightweight processes   | Many isolated concurrent activities   | Requires process design discipline          | messaging, web sockets, job systems | tiny scripts, CPU kernels              |
| Supervision trees       | Structured failure recovery           | Requires architectural planning             | long-running services               | short one-off scripts                  |
| Immutability            | Less accidental shared-state mutation | More allocation and transformation thinking | concurrent services                 | mutation-heavy simulations             |
| Pattern matching        | Clear data-shape control flow         | Runtime failures if assumptions are wrong   | parsers, protocols, callbacks       | code with vague data contracts         |
| Dynamic typing          | Flexibility and fast iteration        | Weaker compile-time guarantees              | evolving systems, DSLs              | type-heavy domain modeling             |
| BEAM scheduling         | Responsiveness under many workloads   | Long native or CPU-bound work needs care    | soft real-time systems              | raw computation                        |
| Macro system in Elixir  | Powerful DSLs                         | Potential opacity                           | frameworks, query DSLs, routing     | simple business logic if overused      |
| Erlang interoperability | Huge mature OTP foundation            | Need to read two syntaxes                   | production BEAM systems             | learners expecting one-language purity |

The professional question is never “Is Erlang / Elixir good?” The correct question is:

> “Does the problem benefit from isolated concurrency, supervision, immutable data, and runtime fault tolerance enough to justify BEAM’s tradeoffs?”

### Common Misconceptions at the Identity Level — better first principles

| Misconception                              | Why it is wrong or incomplete                                           | Better mental model                                             |
| ------------------------------------------ | ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| Elixir is a replacement for Erlang         | Elixir runs on BEAM and depends heavily on Erlang/OTP                   | Elixir is a modern BEAM language layered on Erlang’s foundation |
| Erlang is obsolete because Elixir exists   | Erlang remains the native language of much OTP infrastructure           | Erlang literacy is still part of BEAM literacy                  |
| BEAM processes are OS processes            | They are lightweight VM processes                                       | Treat them as runtime concurrency and isolation units           |
| Process state is object state              | A process has mailbox, lifecycle, failure behavior, and scheduling      | Use processes for ownership and isolation, not passive data     |
| “Let it crash” means ignore errors         | It means crash at the correct boundary under supervision                | Validate expected failures; supervise unexpected failures       |
| Dynamic typing means no type discipline    | Shape contracts appear through patterns, guards, specs, and conventions | Treat types as runtime contracts plus analyzable documentation  |
| OTP is optional advanced material          | Professional BEAM systems depend on OTP architecture                    | Learn OTP early after basic syntax                              |
| Distributed Erlang makes distribution easy | It gives primitives, not correctness guarantees                         | Treat distributed behavior as a systems design problem          |
| Macros are advanced functions              | Macros generate code at compile time                                    | Use them for syntax and DSLs, not ordinary abstraction          |
| Phoenix is the language                    | Phoenix is a framework built on Elixir and BEAM                         | Separate framework conventions from language semantics          |

### What the Rest of the Guide Must Preserve — macro mental model

Part 1 establishes the mental model that later parts will refine.

Part 2 should teach syntax as a way to read and write BEAM-family code, not as a disconnected grammar list.

Part 3 should teach data modeling as runtime shape design: atoms, tuples, maps, structs, records, binaries, tagged outcomes, and domain validation.

Part 4 should teach behavior through function clauses, pattern matching, recursion, higher-order functions, processes, `receive`, `Task`, `GenServer`, protocols, behaviours, and macros.

Part 5 should teach boundaries: modules, applications, error values, exits, supervision, resources, external input, NIFs, ports, and trust boundaries.

Part 6 should teach libraries and ecosystem by task: collections, text, files, time, serialization, testing, logging, networking, Phoenix, Ecto, Mix, Hex, and Erlang/OTP libraries.

Part 7 should explain the runtime: BEAM execution, scheduling, reductions, heaps, per-process garbage collection, binaries, message copying, ETS, NIFs, distribution, and cost model.

Part 8 should explain why the system evolved from Erlang telecom reliability into modern Elixir application development.

Part 9 should teach professional workflow and failure analysis: project structure, releases, testing, tracing, profiling, observability, deployment, code review, and misconceptions.

Part 10 should consolidate expert pathways and BEAM-specific review indexes.

The unifying theme is:

```text
Erlang / Elixir is not primarily syntax.
It is a way of designing reliable concurrent systems on BEAM / OTP.
```

### Part 1 Summary — core mental model

Erlang / Elixir should be learned as a **unified BEAM / OTP system**.

Erlang is the origin: historically grounded, OTP-native, conservative, and reliability-focused.

Elixir is the modern interface: expressive, tool-rich, macro-capable, and ecosystem-expanding.

The shared foundation is more important than either syntax alone: lightweight processes, immutable data, message passing, pattern matching, supervision, process isolation, per-process garbage collection, and fault-aware architecture.

The main design tradeoff is clear: Erlang / Elixir gives unusually strong tools for building concurrent, fault-tolerant, long-running systems, but it does not give full static type guarantees, low-level memory control, automatic backpressure, or effortless distributed correctness.

The best first principle is therefore:

```text
Model data explicitly.
Own state deliberately.
Communicate by messages.
Supervise failure boundaries.
Use Elixir for ergonomic modern development.
Read Erlang to understand the BEAM / OTP foundation.
```
## PART 2 — Core Syntax and Semantic Primitives Reference

### Part Scope — surface syntax, primitive semantics, and BEAM-family reading competence

Part 2 is a **source-reading reference**. Its goal is not to explain every library, every data-modeling decision, or every OTP architecture pattern. Those belong mainly to Parts 3–7. Here the focus is narrower: the syntax and primitive semantics needed to read Erlang and Elixir code confidently.

Because this guide treats Erlang / Elixir as a unified BEAM / OTP learning target, this part does not write two unrelated syntax tours. Shared semantics are explained once; Erlang and Elixir syntax are compared when the surface form differs. This follows the tutorial’s requirement to teach Erlang / Elixir as a coherent language-design system rather than a shallow syntax list. 

| Area             | Shared BEAM / OTP meaning                 | Erlang surface                       | Elixir surface                                | Why it matters                                                  |
| ---------------- | ----------------------------------------- | ------------------------------------ | --------------------------------------------- | --------------------------------------------------------------- |
| Values           | Runtime values with BEAM types            | atoms, tuples, lists, maps, binaries | atoms, tuples, lists, maps, binaries, structs | Same underlying data model, different notation and conventions  |
| Binding          | Single assignment within a match context  | variables begin uppercase            | variables begin lowercase                     | Avoid importing mutation-based assignment assumptions           |
| Pattern matching | Shape-based binding and assertion         | `=` as match operator                | `=` as match operator                         | Central to function clauses, control flow, messages, and errors |
| Functions        | Clauses selected by pattern and guard     | `foo(X) -> ... .`                    | `def foo(x) do ... end`                       | Function heads are semantic filters, not just signatures        |
| Control flow     | Expression-oriented branching             | `case`, `if`, `receive`              | `case`, `if`, `cond`, `with`, `receive`       | Branching often means matching data shape                       |
| Modules          | Compilation and namespace units           | `-module`, `-export`                 | `defmodule`, `def`, `defp`                    | Module syntax differs; BEAM module model is shared              |
| Errors           | Values, exceptions, exits, match failures | `throw`, `error`, `exit`             | `raise`, `throw`, `exit`                      | Error syntax maps to different failure layers                   |
| Concurrency      | Process/message primitives                | `spawn`, `!`, `receive`              | `spawn`, `send`, `receive`                    | Syntax is simple; semantics are runtime-deep                    |

A central discipline for this part is distinguishing **syntax** from **semantics**. Erlang and Elixir often express the same BEAM idea differently. Elixir’s syntax may feel more modern, but it does not erase the underlying semantics: immutable values, pattern matching, message passing, runtime typing, process isolation, and explicit failure boundaries remain.

### Lexical Structure — tokens, punctuation, endings, whitespace, and source shape

Erlang and Elixir differ sharply in surface notation.

Erlang syntax is punctuation-sensitive in a way that often surprises new readers. Elixir syntax is more block-oriented and familiar to programmers coming from Ruby-like languages, but it still maps to BEAM concepts.

| Construct                   | Erlang                                             | Elixir                                                        | Semantic meaning                                                 | Common pitfall                                                     |
| --------------------------- | -------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------ |
| Statement or form separator | `,` between expressions                            | newline or `;` often separates expressions                    | Sequential expression evaluation within a block or function body | Treating Erlang commas like English punctuation rather than syntax |
| Function clause separator   | `;`                                                | multiple `def` clauses or multiple anonymous function clauses | Alternative clause selection by pattern and guard                | Putting `.` too early in Erlang and ending the function            |
| Form terminator             | `.`                                                | usually not required                                          | End of Erlang module attribute or function definition            | Forgetting final `.` in Erlang source                              |
| Block delimiter             | `begin ... end`, `case ... end`, `receive ... end` | `do ... end`, `fn ... end`, `case ... do ... end`             | Structured expression                                            | Assuming Elixir blocks are statements rather than expressions      |
| Comments                    | `% comment`                                        | `# comment`                                                   | Ignored source text                                              | Confusing Erlang `%` comments with Elixir interpolation syntax     |
| Module attributes           | `-module`, `-export`, `-spec`                      | `@moduledoc`, `@spec`, custom attributes                      | Compile-time metadata or declarations                            | Treating all attributes as runtime variables                       |

Erlang source has several punctuation rules that are worth memorizing early:

```erlang
-module(counter).
-export([increment/1, reset/0]).

increment(N) ->
    N + 1.

reset() ->
    0.
```

The `.` ends module attributes and function definitions. The `,` separates expressions inside a sequence. The `;` separates clauses.

Elixir source usually reads more like structured blocks:

```elixir
defmodule Counter do
  def increment(n) do
    n + 1
  end

  def reset do
    0
  end
end
```

**Language-design note:** Erlang’s punctuation reflects an older logic-programming-influenced syntax lineage. Elixir’s syntax is optimized for modern readability, macro expansion, and DSL construction. The same underlying BEAM module/function/value model is expressed through two very different surface grammars.

**Common Pitfalls:** In Erlang, a common syntax error is using `.` where `;` is needed between clauses, or using `;` where `.` should end a definition. In Elixir, a common readability error is relying too heavily on optional parentheses and compact one-line forms until macro-heavy code becomes visually ambiguous.

### Comments and Documentation Syntax — ordinary comments, module docs, function docs, and specs

Comments and documentation are not only presentation devices. In Erlang / Elixir ecosystems, documentation syntax interacts with tooling, generated docs, static analysis, and public API design.

| Purpose                 | Erlang syntax                             | Elixir syntax                    | Tooling role                              | Practical rule                                                                   |
| ----------------------- | ----------------------------------------- | -------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------- |
| Ordinary comment        | `% text`                                  | `# text`                         | Human-only explanation                    | Use for local clarification, not API contracts                                   |
| Module documentation    | `%%` comments, EDoc tags, module comments | `@moduledoc """..."""`           | Generated documentation                   | Explain module responsibility and boundaries                                     |
| Function documentation  | EDoc comments before function             | `@doc """..."""`                 | Generated docs, IDE display               | Document public functions, not every private helper                              |
| Type/spec documentation | `-spec`, `-type`, `-opaque`               | `@spec`, `@type`, `@opaque`      | Dialyzer, docs, contracts                 | Treat specs as analyzable contracts, not enforcement equivalent to static typing |
| Disabling docs          | Not usually same convention               | `@moduledoc false`, `@doc false` | Hide internal modules/functions from docs | Useful for internal implementation modules                                       |

Erlang example:

```erlang
%% Adds one to a non-negative counter.
-spec increment(non_neg_integer()) -> non_neg_integer().
increment(N) when is_integer(N), N >= 0 ->
    N + 1.
```

Elixir example:

```elixir
defmodule Counter do
  @moduledoc """
  Counter operations for monotonic integer counters.
  """

  @doc """
  Adds one to a non-negative counter.
  """
  @spec increment(non_neg_integer()) :: non_neg_integer()
  def increment(n) when is_integer(n) and n >= 0 do
    n + 1
  end
end
```

**Design meaning:** Erlang / Elixir specs are not the same as full static type declarations in languages such as Rust, Java, OCaml, or Haskell. They are documentation and analysis inputs. They can catch many inconsistencies, but they do not define a fully sound static type regime.

**Professional use case:** Public library functions should usually have clear docs and specs. Internal functions often need specs when their data shape is non-obvious, their return protocol is important, or Dialyzer feedback is valuable.

**Common Pitfalls:** A frequent mistake is treating comments as the authoritative contract while code patterns, guards, and specs say something else. In professional BEAM code, the best contract is aligned across documentation, pattern heads, guards, return shape, tests, and supervision boundary.

### Naming Conventions — variables, atoms, modules, functions, predicates, and arity

Names encode semantic categories differently in Erlang and Elixir.

| Entity                     | Erlang convention            | Elixir convention                             | Meaning                        | Common pitfall                                                                   |
| -------------------------- | ---------------------------- | --------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------- |
| Variable                   | `Name`, `UserId`, `_Ignored` | `name`, `user_id`, `_ignored`                 | Bindable local name            | Erlang variables must start uppercase or `_`; Elixir variables usually lowercase |
| Atom                       | `ok`, `error`, `'user-name'` | `:ok`, `:error`, :"user-name"                 | Literal symbolic value         | Dynamically creating atoms from untrusted input is dangerous                     |
| Module                     | `counter`, `my_app_counter`  | `Counter`, `MyApp.Counter`                    | Namespace and compilation unit | Elixir module names compile to atoms                                             |
| Function                   | `increment`, `parse_user`    | `increment`, `parse_user`                     | Callable function name         | Function identity includes arity                                                 |
| Predicate                  | `is_integer`, `is_binary`    | `is_integer`, `is_binary`; sometimes `valid?` | Boolean-returning function     | Only some predicates are allowed in guards                                       |
| Destructive-looking update | Often `NewState` variables   | `new_state` variables                         | New value, not mutation        | Names like `updated_user` are clearer than pretending mutation occurred          |
| Ignored binding            | `_` or `_Name`               | `_` or `_name`                                | Intentionally unused           | `_` cannot be read as a normal variable                                          |

Function names in BEAM systems are identified by **module, name, and arity**. Arity means the number of arguments.

In Erlang, this appears explicitly:

```erlang
-export([find/1, find/2]).
```

This exports two different functions: `find/1` and `find/2`.

In Elixir, it is also part of function identity:

```elixir
def find(id), do: find(id, [])

def find(id, opts), do: {:ok, {id, opts}}
```

The two functions are `find/1` and `find/2`.

**Language-design note:** Arity-based identity is important because BEAM functions do not use overloading by type. Multiple functions can share the same name if they have different arities, but not because the type checker selects among typed overloads. Clause selection inside a function of the same arity happens by pattern and guard.

**Common Pitfalls:** Programmers from Java or TypeScript sometimes expect overload-like type dispatch. Erlang / Elixir dispatch does not work that way. The function call target is determined by module, name, and arity; then clauses are tried by pattern and guard.

### Atoms as Names and Values — symbolic constants, module identities, tags, and atom table risk

Atoms are one of the most important primitive concepts in Erlang / Elixir. An atom is a literal symbolic value. It is commonly used for status tags, option names, module names, message tags, and finite-domain labels.

| Use case          | Erlang                          | Elixir               | Meaning                                 |
| ----------------- | ------------------------------- | -------------------- | --------------------------------------- |
| Success tag       | `ok`                            | `:ok`                | Symbolic success marker                 |
| Error tag         | `error`                         | `:error`             | Symbolic error marker                   |
| Tagged return     | `{ok, Value}`                   | `{:ok, value}`       | Tuple tagged by atom                    |
| Boolean-like atom | `true`, `false`                 | `true`, `false`      | Booleans are atoms                      |
| Nil-like atom     | often `undefined` by convention | `nil`                | Absence marker; Elixir `nil` is an atom |
| Module name       | `lists`                         | `Enum`, `MyApp.User` | Module names are atoms internally       |
| Option key        | `{timeout, 5000}`               | `timeout: 5000`      | Symbolic option name                    |

Erlang:

```erlang
read_config(Path) ->
    case file:read_file(Path) of
        {ok, Binary} ->
            {ok, Binary};
        {error, Reason} ->
            {error, Reason}
    end.
```

Elixir:

```elixir
def read_config(path) do
  case File.read(path) do
    {:ok, binary} ->
      {:ok, binary}

    {:error, reason} ->
      {:error, reason}
  end
end
```

The atom `:ok` or `ok` is not a string. It is not a variable. It is a symbolic value.

**Failure-first explanation:** The tempting wrong mental model is to treat atoms like interned strings and freely convert user input into atoms. The surprising bug is that the VM can run out of atom table capacity when untrusted input creates too many new atoms. The correct explanation is that atoms are intended for known symbolic names, not arbitrary external data. The professional rule is: use atoms for closed sets known by the program; use strings or binaries for open external names. The boundary changes only when conversion is restricted to already-existing atoms or controlled finite mappings.

**Common Pitfalls:** In Elixir, `String.to_atom/1` on untrusted input is a serious anti-pattern. Prefer `String.to_existing_atom/1` only when the set of atoms is already safely loaded and failure is acceptable, or better, use an explicit mapping.

### Literals and Primitive Values — integers, floats, atoms, booleans, nil, tuples, lists, maps, binaries

Erlang and Elixir share BEAM value categories, but the syntax differs.

| Value kind  | Erlang syntax                           | Elixir syntax       | Meaning                    | Practical caveat                                                                              |
| ----------- | --------------------------------------- | ------------------- | -------------------------- | --------------------------------------------------------------------------------------------- |
| Integer     | `42`, `16#FF`                           | `42`, `0xFF`        | Arbitrary-size integer     | Very large integers allocate                                                                  |
| Float       | `3.14`                                  | `3.14`              | Floating-point number      | Use care for exact money/domain values                                                        |
| Atom        | `ok`, `'user-name'`                     | `:ok`, :"user-name" | Symbolic constant          | Atom table risk for dynamic creation                                                          |
| Boolean     | `true`, `false`                         | `true`, `false`     | Atoms used as booleans     | Only `false` and `nil` are falsy in Elixir; Erlang boolean contexts are stricter by construct |
| Nil/absence | convention-dependent, often `undefined` | `nil`               | Absence marker             | Absence modeling is often better with tagged tuples                                           |
| Tuple       | `{ok, Value}`                           | `{:ok, value}`      | Fixed-size ordered product | Good for tagged returns; poor for unclear large records                                       |
| List        | `[A, B, C]`                             | `[a, b, c]`         | Linked list                | Prepend is cheap; random access is not                                                        |
| Map         | `#{key => Value}`                       | `%{key => value}`   | Key-value structure        | Key access semantics differ by syntax                                                         |
| Binary      | `<<1, 2, 3>>`                           | `<<1, 2, 3>>`       | Sequence of bytes/bits     | Central for strings, protocols, files                                                         |
| Function    | `fun(X) -> X + 1 end`                   | `fn x -> x + 1 end` | Anonymous function         | Captures environment; call syntax differs                                                     |

Elixir also has syntactic conveniences:

```elixir
%{name: "Ada", active: true}
```

This is shorthand for atom keys:

```elixir
%{:name => "Ada", :active => true}
```

Erlang map syntax uses `=>` to associate keys:

```erlang
#{name => <<"Ada">>, active => true}
```

**Design meaning:** BEAM values are immutable. A map “update” creates a new map value, possibly sharing internal structure. A list “prepend” creates a new cons cell pointing to the old list. A binary operation may share or copy depending on representation and operation. These runtime details are reserved for Part 7, but the syntax should already be read as value transformation, not mutation.

**Common Pitfalls:** Programmers from mutable languages often read `%{user | active: true}` or `Map.put(user, :active, true)` as mutation. It is not mutation. It returns a new value. If the return value is ignored, the change is lost.

### Strings, Binaries, and Charlists — text notation, byte sequences, and Unicode expectations

Strings are a major source of confusion because Erlang and Elixir conventions differ.

In BEAM, binaries are fundamental. A binary is a sequence of bytes or bits. Elixir strings are UTF-8 binaries by convention. Erlang historically often used lists of character codepoints, called charlists, though modern Erlang code also uses binaries heavily.

| Concept             | Erlang syntax                                         | Elixir syntax                              | Runtime shape    | Typical use                         |
| ------------------- | ----------------------------------------------------- | ------------------------------------------ | ---------------- | ----------------------------------- |
| Binary              | `<<65, 66>>`                                          | `<<65, 66>>`                               | binary           | Protocols, files, network data      |
| UTF-8 binary string | `<<"AB">>`                                            | `"AB"`                                     | binary           | Most Elixir text                    |
| Charlists           | `"AB"` in Erlang shell/source contexts as list syntax | `'AB'`                                     | list of integers | Erlang APIs, legacy text, char data |
| Codepoint           | `$A`                                                  | `?A`                                       | integer          | Character code operations           |
| Bitstring           | `<<1:1, 0:1>>`                                        | `<<1::1, 0::1>>` or binary syntax variants | bitstring        | Binary protocols                    |

Erlang example:

```erlang
Binary = <<"hello">>,
Charlist = "hello".
```

Elixir example:

```elixir
binary = "hello"
charlist = 'hello'
```

In Elixir:

```elixir
is_binary("hello")
# true

is_list('hello')
# true
```

**Failure-first explanation:** The tempting wrong mental model is that `"hello"` means the same thing in Erlang and Elixir. The surprising behavior is that Erlang `"hello"` is commonly a list of integers, while Elixir `"hello"` is a binary. The correct semantic explanation is that both languages share BEAM value types, but their string literal conventions differ. The professional rule is: when interacting across Erlang and Elixir APIs, always check whether the API expects a binary, charlist, or iodata. The boundary changes in APIs that deliberately accept multiple text-like forms, especially I/O-related APIs.

**Common Pitfalls:** Passing an Elixir binary string to an Erlang API that expects a charlist can fail or behave unexpectedly. Conversely, treating a charlist as a string in Elixir can produce confusing inspection output.

### Variables and Binding — single assignment, rebinding, matching, and names as patterns

The most important syntax rule is that `=` is not ordinary mutation assignment. It is the **match operator**.

This must be understood differently in Erlang and Elixir because both languages use pattern matching, but Elixir allows rebinding in ordinary contexts while Erlang variables are single-assignment within a scope.

| Concept                         | Erlang                                           | Elixir                | Semantic meaning                                               |
| ------------------------------- | ------------------------------------------------ | --------------------- | -------------------------------------------------------------- |
| First binding                   | `X = 10`                                         | `x = 10`              | Bind variable through matching                                 |
| Rebinding same name             | Not allowed in same match scope as a new binding | Allowed by default    | Elixir can bind a new value to the same variable name          |
| Match against existing variable | Already-bound variable matches its value         | Use pin operator `^x` | Assert equality with previous value                            |
| Ignored value                   | `_`                                              | `_`                   | Match anything and do not bind                                 |
| Named ignored value             | `_Reason`                                        | `_reason`             | Bind-like readability, usually treated as intentionally unused |
| Destructuring                   | `{ok, X} = Result`                               | `{:ok, x} = result`   | Match shape and bind inner values                              |

Erlang:

```erlang
X = 10,
X = 10.
```

This succeeds because the second match checks that `X` is already `10`.

```erlang
X = 10,
X = 11.
```

This fails because `X` is already bound.

Elixir:

```elixir
x = 10
x = 11
```

This succeeds because Elixir permits rebinding in a new match expression.

To match against an existing Elixir binding, use the pin operator:

```elixir
x = 10
^x = 10
```

This succeeds.

```elixir
x = 10
^x = 11
```

This fails.

**Design meaning:** Erlang’s single-assignment variables make dataflow visually strict and are close to the logic-programming feel of the language. Elixir allows rebinding for ergonomic sequential code, but the underlying values remain immutable. Rebinding changes the name-to-value association in source-level scope; it does not mutate the old value.

**Failure-first explanation:** The tempting wrong mental model is to treat `x = x + 1` in Elixir as mutation. The surprising behavior appears when old values are still referenced elsewhere, such as inside closures or data structures. The correct explanation is that Elixir creates a new binding for the name `x`; it does not modify the old integer. The professional rule is: read rebinding as “from now on, this name refers to a new value,” not as “this object changed.” The boundary changes when the state is held inside a process, ETS table, database, Agent, or external resource; then the operation may cause real state change outside ordinary variable binding.

**Common Pitfalls:** In Elixir, forgetting `^` inside patterns can accidentally rebind instead of compare. This is especially important in tests, `case`, `receive`, and pattern-heavy code.

### The Match Operator — assertion, destructuring, and failure

The match operator is one of the central semantic primitives of Erlang / Elixir. It does three jobs at once:

| Role               | Meaning                           | Erlang example     | Elixir example      |
| ------------------ | --------------------------------- | ------------------ | ------------------- |
| Bind               | Give a name to a value            | `X = 1`            | `x = 1`             |
| Destructure        | Extract parts from a shape        | `{ok, X} = Result` | `{:ok, x} = result` |
| Assert             | Require a value or shape to match | `{ok, _} = Result` | `{:ok, _} = result` |
| Fail fast          | Crash if the shape is wrong       | `badmatch`         | `MatchError`        |
| Document invariant | Make expected shape visible       | `{ok, Config}`     | `{:ok, config}`     |

Erlang:

```erlang
{ok, Binary} = file:read_file("config.json").
```

Elixir:

```elixir
{:ok, binary} = File.read("config.json")
```

This is not ordinary error handling. It asserts that reading the file must succeed. If it does not, the process crashes.

The safer local handling form is branching:

```elixir
case File.read("config.json") do
  {:ok, binary} ->
    {:ok, binary}

  {:error, reason} ->
    {:error, {:config_read_failed, reason}}
end
```

**Language-design note:** Pattern matching makes expected data shape part of executable code. This is expressive and concise, but it means many “type-like” or “shape-like” errors appear as runtime match failures unless caught by analysis, tests, or careful boundary design.

**Professional use case:** Use direct match assertion when failure means “this process cannot correctly continue.” Use `case`, `with`, or explicit tagged returns when failure is an expected domain outcome.

**Common Pitfalls:** A common anti-pattern is writing direct match assertions against external input, file systems, network calls, or user data without deciding whether failure should crash the process or return a recoverable error. Match assertion is powerful, but it is still a failure policy.

### Patterns — literals, variables, tuples, lists, maps, binaries, guards, and ignored positions

Patterns appear in variable binding, function heads, `case`, `receive`, list operations, binary parsing, and many OTP callbacks.

| Pattern kind    | Erlang                  | Elixir                        | Meaning                                             |     |                      |
| --------------- | ----------------------- | ----------------------------- | --------------------------------------------------- | --- | -------------------- |
| Literal atom    | `ok`                    | `:ok`                         | Match exact atom                                    |     |                      |
| Variable        | `X`                     | `x`                           | Bind or match depending on language/binding context |     |                      |
| Ignored value   | `_`                     | `_`                           | Match anything                                      |     |                      |
| Tuple pattern   | `{ok, X}`               | `{:ok, x}`                    | Match tuple shape                                   |     |                      |
| List head/tail  | `[H                     | T]`                           | `[h                                                 | t]` | Match non-empty list |
| Empty list      | `[]`                    | `[]`                          | Match empty list                                    |     |                      |
| Map pattern     | `#{id := Id}`           | `%{id: id}` or `%{:id => id}` | Match required key and bind value                   |     |                      |
| Binary pattern  | `<<A, B, Rest/binary>>` | `<<a, b, rest::binary>>`      | Match bytes/bits                                    |     |                      |
| Guarded clause  | `when is_integer(X)`    | `when is_integer(x)`          | Add restricted condition                            |     |                      |
| Pinned variable | Not needed in same way  | `^x`                          | Match previous Elixir binding                       |     |                      |

Tuple pattern:

```elixir
{:ok, user} = fetch_user(id)
```

List pattern:

```elixir
[head | tail] = users
```

Map pattern:

```elixir
%{id: id, name: name} = user
```

Binary pattern:

```elixir
<<version, type, payload::binary>> = packet
```

Erlang binary pattern:

```erlang
<<Version, Type, Payload/binary>> = Packet.
```

**Design meaning:** Patterns make control flow data-directed. Instead of asking “which class is this object?” or “which if-chain should I run?”, Erlang / Elixir often asks “which shape does this value have?”

**Common Pitfalls:** Map patterns match required keys but do not require the map to contain only those keys. For example, `%{id: id}` matches a map with an `:id` key even if it has many other keys. This is useful for flexible data, but dangerous if full schema validation is expected.

### Guards — restricted predicates, clause refinement, and runtime-check boundaries

Guards are restricted boolean expressions used to refine pattern matching. They are allowed in function clauses, `case`, `receive`, and similar constructs.

The key point is that guards are not arbitrary code. Only certain guard-safe operations are allowed. This restriction helps keep clause selection predictable and safe from side effects.

| Purpose             | Erlang example              | Elixir example                                              | Meaning               |
| ------------------- | --------------------------- | ----------------------------------------------------------- | --------------------- |
| Type refinement     | `when is_integer(X)`        | `when is_integer(x)`                                        | Only match integers   |
| Numeric condition   | `when N > 0`                | `when n > 0`                                                | Match positive values |
| Binary check        | `when is_binary(Bin)`       | `when is_binary(bin)`                                       | Match binary values   |
| List check          | `when is_list(X)`           | `when is_list(x)`                                           | Match lists           |
| Multiple conditions | `when is_integer(N), N > 0` | `when is_integer(n) and n > 0`                              | Refine pattern        |
| Alternative guard   | `when X =:= a; X =:= b`     | `when x in [:a, :b]` with guard restrictions depending form | Allow multiple cases  |

Erlang:

```erlang
classify(N) when is_integer(N), N > 0 ->
    positive;
classify(0) ->
    zero;
classify(N) when is_integer(N), N < 0 ->
    negative.
```

Elixir:

```elixir
def classify(n) when is_integer(n) and n > 0 do
  :positive
end

def classify(0), do: :zero

def classify(n) when is_integer(n) and n < 0 do
  :negative
end
```

**Language-design note:** Guards create a boundary between pattern matching and arbitrary computation. Pattern matching handles shape; guards handle simple safe refinements. More complex validation belongs in function bodies, dedicated validators, or boundary modules.

**Common Pitfalls:** Trying to call arbitrary user-defined functions in guards fails. The professional solution is not to fight guards, but to keep guards simple and move complex checks into normal code paths.

### Equality and Comparison — exact equality, numeric equality, ordering, and structural comparison

Erlang and Elixir have multiple equality operators. Understanding them prevents subtle bugs in pattern-heavy and numeric code.

| Concept              | Erlang               | Elixir               | Meaning                                                 |
| -------------------- | -------------------- | -------------------- | ------------------------------------------------------- |
| Exact equality       | `=:=`                | `===`                | Same value and same numeric type distinction            |
| Non-exact equality   | `==`                 | `==`                 | Numeric comparison may ignore integer/float distinction |
| Exact inequality     | `=/=`                | `!==`                | Not exactly equal                                       |
| Non-exact inequality | `/=`                 | `!=`                 | Not loosely equal                                       |
| Less/greater         | `<`, `=<`, `>`, `>=` | `<`, `<=`, `>`, `>=` | Term comparison                                         |
| Match                | `=`                  | `=`                  | Pattern match, not equality operator                    |

Erlang:

```erlang
1 == 1.0.     % true
1 =:= 1.0.   % false
```

Elixir:

```elixir
1 == 1.0
# true

1 === 1.0
# false
```

Structural comparison works across terms according to BEAM term ordering. This is useful for sorting but can be semantically misleading if treated as domain ordering.

**Design meaning:** Equality is runtime structural comparison, not object identity in an OOP sense. For most immutable BEAM values, structural equality is the relevant concept. PIDs, refs, ports, and functions are runtime values with their own comparison behavior.

**Failure-first explanation:** The tempting wrong mental model is that `==` is always “the correct equality operator.” The surprising behavior is that `1 == 1.0` is true while exact equality says false. The correct explanation is that non-exact equality permits numeric equivalence across integer/float representation. The professional rule is: use exact equality when representation matters, especially in tests, protocol logic, and pattern-related assertions. The boundary changes in ordinary domain comparisons where numeric equivalence is intentionally acceptable.

**Common Pitfalls:** Do not use general term ordering as a domain model unless arbitrary BEAM term order is actually intended. Sorting mixed values may be deterministic, but determinism is not the same as semantic correctness.

### Truthiness and Boolean Contexts — `true`, `false`, `nil`, and conditional expectations

Elixir and Erlang differ in how conditionals treat truth-like values.

In Elixir, only `false` and `nil` are falsy. Everything else is truthy.

```elixir
if [] do
  :truthy
else
  :falsy
end
```

This returns `:truthy`.

In Erlang, constructs such as `if` and guards expect guard expressions that evaluate to boolean-like conditions. Erlang does not use the same broad truthiness convention as Elixir.

| Concept        | Erlang                               | Elixir                                     | Practical meaning                    |
| -------------- | ------------------------------------ | ------------------------------------------ | ------------------------------------ |
| Boolean true   | `true`                               | `true`                                     | Atom representing truth              |
| Boolean false  | `false`                              | `false`                                    | Atom representing falsehood          |
| Nil-like value | no universal `nil`; conventions vary | `nil`                                      | Atom treated as falsy                |
| Truthiness     | More restricted by construct         | `false` and `nil` are falsy; others truthy | Elixir permits broad condition tests |
| Empty list     | `[]`                                 | `[]`                                       | Not false in Elixir                  |

Elixir example:

```elixir
if user do
  {:ok, user}
else
  {:error, :not_found}
end
```

This is idiomatic if `user` is either a meaningful value or `nil`.

But this is often clearer:

```elixir
case fetch_user(id) do
  {:ok, user} -> {:ok, user}
  {:error, :not_found} -> {:error, :not_found}
end
```

**Language-design note:** Elixir’s truthiness improves convenience, especially for `nil` checks, but it can weaken explicitness if used where tagged outcomes would be clearer. Erlang’s stricter style pushes code toward explicit boolean conditions and pattern matching.

**Common Pitfalls:** Do not treat `[]`, `0`, or `""` as falsy in Elixir. They are truthy. This is a frequent source of bugs for programmers coming from JavaScript, Python, or Ruby.

### Immutability Basics — values, rebinding, structural sharing, and state illusion

Erlang / Elixir values are immutable. A function does not modify a list, tuple, map, binary, or integer in place from the programmer’s perspective. It returns another value.

| Operation                    | Mutable-language interpretation | Erlang / Elixir interpretation          |                                                |
| ---------------------------- | ------------------------------- | --------------------------------------- | ---------------------------------------------- |
| `x = x + 1` in Elixir        | Mutate variable storage         | Rebind name to a new integer value      |                                                |
| `Map.put(user, :name, name)` | Mutate map                      | Return a new map                        |                                                |
| `[item                       | list]`                          | Modify list                             | Construct a new list cell pointing to old list |
| `%{user                      | name: name}`                    | Modify struct/map                       | Return updated copy-like value                 |
| Process state update         | Mutate global object            | Return new loop state or callback state |                                                |

Elixir example:

```elixir
user = %{id: 1, name: "Ada"}
Map.put(user, :name, "Grace")
user
# %{id: 1, name: "Ada"}
```

The result was ignored. The original value did not change.

Correct:

```elixir
user = %{id: 1, name: "Ada"}
user = Map.put(user, :name, "Grace")
```

Erlang equivalent pattern:

```erlang
User = #{id => 1, name => <<"Ada">>},
UpdatedUser = User#{name => <<"Grace">>}.
```

**Design meaning:** Immutability supports process isolation and reasoning about dataflow. It also means that “state” in Erlang / Elixir is usually modeled by passing a new value into the next recursive call, returning a new value from a function, or storing a new value inside a process loop or OTP callback.

**Common Pitfalls:** The most common beginner error is ignoring the returned value of an update function. A more advanced error is using a process merely to simulate mutable variables when plain immutable data transformation would be simpler.

### Scope Basics — lexical scope, function scope, clause scope, and captured variables

Scope determines where a binding is visible. Erlang and Elixir both have lexical scoping, but their exact rules and ergonomics differ.

| Scope concept              | Erlang                                                        | Elixir                                                 | Practical consequence                                           |
| -------------------------- | ------------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------- |
| Function scope             | Variables are scoped within function clauses                  | Variables are scoped lexically within functions/blocks | Avoid assuming global local variables                           |
| Clause variables           | Clause-local                                                  | Clause-local with Elixir-specific block behavior       | Pattern variables do not automatically leak everywhere          |
| Anonymous function capture | `fun() -> X end` captures `X`                                 | `fn -> x end` captures `x`                             | Captured value is the value of binding, not a mutable reference |
| Case branch scope          | Variables may have constraints across branches depending form | Variables bound inside branches have lexical behavior  | Keep branch outputs explicit                                    |
| Module attributes          | Compile-time declarations/metadata                            | Compile-time attributes; some accumulate               | Not normal mutable module variables                             |

Elixir example:

```elixir
prefix = "user"

formatter =
  fn id ->
    "#{prefix}:#{id}"
  end
```

The anonymous function captures `prefix`.

If `prefix` is rebound later:

```elixir
prefix = "user"

formatter =
  fn id ->
    "#{prefix}:#{id}"
  end

prefix = "account"

formatter.(1)
```

The function still uses the captured value from the earlier binding context.

**Language-design note:** Captures are lexical, not dynamic. This matters for callbacks, closures, task spawning, and delayed execution. A closure does not follow future rebindings as if the name were a mutable cell.

**Common Pitfalls:** In Elixir, rebinding can make scope look mutable even though values are immutable. When closures are involved, read the code by binding occurrence, not by variable name alone.

### Basic Expression Model — expressions, sequencing, return values, and block results

Erlang / Elixir code is expression-oriented. Most constructs produce values.

| Construct     | Erlang result             | Elixir result             | Meaning                               |
| ------------- | ------------------------- | ------------------------- | ------------------------------------- |
| Function body | Result of last expression | Result of last expression | No explicit `return` in normal style  |
| `case`        | Value of selected branch  | Value of selected branch  | Branch expression                     |
| `if`          | Value of selected branch  | Value of selected branch  | Conditional expression                |
| Block         | Result of last expression | Result of last expression | Sequential expression                 |
| Match         | Matched value             | Matched value             | Can be used inside larger expressions |
| Function call | Return value              | Return value              | Ordinary expression                   |

Erlang:

```erlang
Result =
    case file:read_file(Path) of
        {ok, Binary} ->
            {ok, Binary};
        {error, Reason} ->
            {error, Reason}
    end.
```

Elixir:

```elixir
result =
  case File.read(path) do
    {:ok, binary} ->
      {:ok, binary}

    {:error, reason} ->
      {:error, reason}
  end
```

The value of the `case` expression is assigned to `result`.

**Design meaning:** Expression orientation encourages direct composition and explicit return values. It also makes control-flow syntax part of dataflow, not a separate statement-only system.

**Common Pitfalls:** Programmers from C-like languages sometimes look for `return`. In idiomatic Erlang / Elixir, the last expression is the return value. Early exit is usually expressed with pattern matching, branching, `with` in Elixir, exceptions for exceptional cases, or process exits at the OTP level.

### Arithmetic and Operators — numeric operations, boolean operations, list operations, and operator meaning

Operators are syntax for function-like operations with fixed precedence and semantics. Erlang and Elixir share many concepts but differ in exact operator names.

| Category               | Erlang             | Elixir                                                                | Meaning                   | Pitfall                                                                             |                                   |                                   |
| ---------------------- | ------------------ | --------------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------- | --------------------------------- | --------------------------------- |
| Arithmetic             | `+`, `-`, `*`, `/` | `+`, `-`, `*`, `/`                                                    | Numeric operations        | `/` returns float-like division; integer division uses separate functions/operators |                                   |                                   |
| Integer division       | `div`, `rem`       | `div/2`, `rem/2`                                                      | Quotient and remainder    | Do not assume `/` truncates                                                         |                                   |                                   |
| Exact equality         | `=:=`              | `===`                                                                 | Exact equality            | Prefer when numeric type distinction matters                                        |                                   |                                   |
| Loose numeric equality | `==`               | `==`                                                                  | Numeric equivalence       | `1 == 1.0` can be true                                                              |                                   |                                   |
| Boolean and            | `andalso`          | `and`                                                                 | Short-circuit boolean and | Elixir `and` expects booleans; `&&` uses truthiness                                 |                                   |                                   |
| Boolean or             | `orelse`           | `or`                                                                  | Short-circuit boolean or  | Elixir `or` expects booleans; `                                                     |                                   | ` uses truthiness                 |
| Not                    | `not`              | `not`, `!`                                                            | Negation                  | Know boolean vs truthy forms                                                        |                                   |                                   |
| List prepend           | `[H                | T]`                                                                   | `[h                       | t]`                                                                                 | Construct or match list head/tail | Tail must be list for proper list |
| List concatenation     | `++`               | `++`                                                                  | Concatenate lists         | Cost proportional to left list                                                      |                                   |                                   |
| List subtraction       | `--`               | `--`                                                                  | Remove elements           | Not a set operation in the mathematical sense                                       |                                   |                                   |
| Send message           | `Pid ! Msg`        | `send(pid, msg)` or `send self(), msg`; `pid <- msg` is not BEAM send | Send to process mailbox   | Message delivery semantics require Part 7 detail                                    |                                   |                                   |

Elixir distinguishes strict boolean operators from truthy operators:

```elixir
true and false
# false

nil || :fallback
# :fallback
```

`and` and `or` expect booleans. `&&` and `||` work with truthiness.

**Language-design note:** Operator syntax can hide cost. For example, `left ++ right` copies the left list spine. In recursive or loop-like code, repeated append can produce avoidable cost. This belongs to the cost model in Part 7, but the syntax should already be read with list structure in mind.

**Common Pitfalls:** Do not build lists by repeatedly appending to the end with `++` in a loop-like transformation. Prefer prepending and reversing, comprehensions, or library functions such as `Enum.map` where appropriate.

### Lists and Cons Syntax — linked lists, proper lists, improper lists, and head-tail patterns

Lists are linked lists, not arrays. This affects both syntax and performance intuition.

| Operation         | Erlang      | Elixir      | Meaning              |         |                               |
| ----------------- | ----------- | ----------- | -------------------- | ------- | ----------------------------- |
| Empty list        | `[]`        | `[]`        | Empty list           |         |                               |
| Literal list      | `[1, 2, 3]` | `[1, 2, 3]` | Proper list          |         |                               |
| Head-tail pattern | `[H         | T]`         | `[h                  | t]`     | Match or construct cons cell  |
| Prepend           | `[Item      | Items]`     | `[item               | items]` | Cheap construction            |
| Concatenate       | `A ++ B`    | `a ++ b`    | Copy left list spine |         |                               |
| Improper list     | `[a         | b]`         | `[:a                 | :b]`    | Cons whose tail is not a list |

Elixir:

```elixir
[head | tail] = [1, 2, 3]
# head = 1
# tail = [2, 3]
```

Erlang:

```erlang
[Head | Tail] = [1, 2, 3].
```

Proper lists end in `[]`. Improper lists do not.

```elixir
[:a | :b]
```

This is a valid cons structure but not a proper list. Many list functions expect proper lists.

**Design meaning:** Lists are excellent for recursive head-tail processing and prepend-heavy construction. They are poor as random-access arrays.

**Common Pitfalls:** Treating lists as arrays leads to inefficient indexing, repeated append, and unclear performance. When random access or keyed access matters, use maps, tuples, arrays, ETS, or other structures depending on the task.

### Tuples — fixed-size ordered products, tagged tuples, and positional meaning

Tuples are fixed-size ordered collections. They are especially important for tagged results and compact internal data.

| Use case                 | Erlang                  | Elixir                   | Meaning                       |
| ------------------------ | ----------------------- | ------------------------ | ----------------------------- |
| Tagged success           | `{ok, Value}`           | `{:ok, value}`           | Operation succeeded           |
| Tagged failure           | `{error, Reason}`       | `{:error, reason}`       | Operation failed              |
| Small product            | `{X, Y}`                | `{x, y}`                 | Pair or coordinate-like value |
| Internal compact data    | `{State, Count, Ref}`   | `{state, count, ref}`    | Positional structure          |
| Function return protocol | `{reply, Reply, State}` | `{:reply, reply, state}` | OTP callback shape            |

Elixir:

```elixir
case authenticate(credentials) do
  {:ok, user} ->
    {:ok, user}

  {:error, :invalid_password} ->
    {:error, :unauthorized}
end
```

Erlang:

```erlang
case authenticate(Credentials) of
    {ok, User} ->
        {ok, User};
    {error, invalid_password} ->
        {error, unauthorized}
end.
```

**Design meaning:** Tagged tuples are a substitute for many small algebraic-data-like cases in a dynamically typed setting. The tag atom provides the variant name; the tuple positions carry data.

**Professional use case:** Use tagged tuples for return values that callers must branch on. They are especially idiomatic for operations that may fail: parsing, lookup, file access, external service calls.

**Common Pitfalls:** Large untagged tuples become unreadable. If positions require comments to understand, use a map, struct, record, or named abstraction.

### Maps — key-value structures, required-key matching, updates, and atom-key shorthand

Maps are general key-value collections. Both Erlang and Elixir have maps, but Elixir uses them heavily for application data and structs.

| Operation             | Erlang                            | Elixir                                         | Meaning                    |                     |
| --------------------- | --------------------------------- | ---------------------------------------------- | -------------------------- | ------------------- |
| Create map            | `#{id => 1, name => <<"Ada">>}`   | `%{id: 1, name: "Ada"}`                        | New map                    |                     |
| Access known atom key | `maps:get(name, User)` or pattern | `user.name` or `user[:name]` depending context | Retrieve value             |                     |
| Match required key    | `#{id := Id}`                     | `%{id: id}`                                    | Require key and bind value |                     |
| Update existing key   | `Map#{name := New}`               | `%{user                                        | name: new}`                | Update existing key |
| Add or update key     | `Map#{name => New}`               | `Map.put(user, :name, new)`                    | Return new map with key    |                     |
| Dynamic key access    | `maps:get(Key, Map)`              | `Map.get(map, key)`                            | Runtime key                |                     |

Erlang distinguishes `:=` and `=>` in map updates:

```erlang
Updated = User#{name := <<"Grace">>}.
```

This requires the key to already exist.

```erlang
Updated = User#{name => <<"Grace">>}.
```

This can add or update.

Elixir’s update syntax requires existing keys:

```elixir
updated = %{user | name: "Grace"}
```

For add-or-update:

```elixir
updated = Map.put(user, :name, "Grace")
```

**Design meaning:** Map syntax lets BEAM languages represent open or semi-structured data. Elixir structs, explained more fully in Part 3, are maps with a `__struct__` key and compile-time conveniences.

**Common Pitfalls:** In Elixir, `%{id: id}` matches any map with an `:id` key; it does not assert that the map has only that key or that it is a particular struct. For struct matching, use `%User{id: id}`.

### Binaries and Bit Syntax — byte-level structure, protocol parsing, and text foundations

Binary syntax is one of the most powerful primitive syntaxes in Erlang / Elixir. It allows construction and pattern matching on bytes and bits.

| Task                 | Erlang                                  | Elixir                                     | Meaning                  |
| -------------------- | --------------------------------------- | ------------------------------------------ | ------------------------ |
| Construct bytes      | `<<1, 2, 3>>`                           | `<<1, 2, 3>>`                              | Binary of bytes          |
| Match first byte     | `<<First, Rest/binary>>`                | `<<first, rest::binary>>`                  | Decompose binary         |
| Match fixed fields   | `<<Version:8, Type:8, Payload/binary>>` | `<<version::8, type::8, payload::binary>>` | Parse protocol-like data |
| UTF-8 segment        | syntax varies by specifier              | `<<codepoint::utf8, rest::binary>>`        | Match UTF-8 codepoint    |
| Size-qualified field | `<<Len:16, Data:Len/binary>>`           | `<<len::16, data::binary-size(len)>>`      | Length-prefixed parsing  |

Elixir:

```elixir
def parse_packet(<<version, type, payload::binary>>) do
  {:ok, %{version: version, type: type, payload: payload}}
end

def parse_packet(_) do
  {:error, :invalid_packet}
end
```

Erlang:

```erlang
parse_packet(<<Version, Type, Payload/binary>>) ->
    {ok, #{version => Version, type => Type, payload => Payload}};
parse_packet(_) ->
    {error, invalid_packet}.
```

**Design meaning:** Binary pattern matching makes protocol parsing part of ordinary pattern syntax. This is one reason BEAM languages are strong for networking, messaging, and binary protocols.

**Common Pitfalls:** Binary matching can retain references to larger binaries through sub-binaries. This is a runtime/memory issue, not just syntax. It will be treated in the Part 7 cost model, but syntax readers should already recognize long-lived sub-binaries as a possible memory-retention risk.

### Function Calls and Arity — module calls, local calls, anonymous calls, and call identity

Function identity in BEAM systems is based on name and arity, usually within a module.

| Call kind                 | Erlang                      | Elixir                                         | Meaning                            |
| ------------------------- | --------------------------- | ---------------------------------------------- | ---------------------------------- |
| Local named call          | `foo(X)`                    | `foo(x)`                                       | Call function in same module/scope |
| Remote module call        | `lists:reverse(List)`       | `Enum.reverse(list)` or `:lists.reverse(list)` | Call function from module          |
| Erlang module from Elixir | N/A                         | `:timer.sleep(1000)`                           | Direct Erlang module call          |
| Anonymous function call   | `Fun(X)`                    | `fun.(x)`                                      | Call function value                |
| Capture/reference         | `fun module:function/arity` | `&Module.function/arity`                       | Function reference                 |
| Arity notation            | `foo/2`                     | `foo/2`                                        | Name plus argument count           |

Elixir calls Erlang modules by atom module names:

```elixir
:timer.sleep(1000)
:crypto.hash(:sha256, "hello")
```

Elixir module calls use aliases:

```elixir
String.upcase("beam")
Enum.map([1, 2, 3], fn n -> n * 2 end)
```

Anonymous function call in Elixir requires dot syntax:

```elixir
double = fn n -> n * 2 end
double.(10)
```

This differs from named function calls.

Erlang:

```erlang
Double = fun(N) -> N * 2 end,
Double(10).
```

**Design meaning:** Named functions and anonymous functions are not merely syntactic variants. They interact differently with module compilation, captures, recursion, and readability. In Elixir especially, `fun.(x)` visually reminds the reader that `fun` is a value.

**Common Pitfalls:** In Elixir, forgetting the dot when calling an anonymous function is common. Another common mistake is confusing `&Module.function/arity` capture with actually calling the function.

### Anonymous Functions and Captures — closures, environment capture, and shorthand forms

Anonymous functions are values. They can be passed, returned, stored, and called.

| Feature                 | Erlang                                     | Elixir                                   | Meaning                          |
| ----------------------- | ------------------------------------------ | ---------------------------------------- | -------------------------------- |
| Anonymous function      | `fun(X) -> X + 1 end`                      | `fn x -> x + 1 end`                      | Function value                   |
| Multiple clauses        | `fun({ok, X}) -> X; ({error, R}) -> R end` | `fn {:ok, x} -> x; {:error, r} -> r end` | Pattern-based anonymous function |
| Capture named function  | `fun lists:reverse/1`                      | `&Enum.reverse/1`                        | Function reference               |
| Capture shorthand       | less central                               | `&(&1 + 1)`                              | Compact anonymous function       |
| Call anonymous function | `F(X)`                                     | `f.(x)`                                  | Invoke function value            |

Elixir:

```elixir
normalize =
  fn
    {:ok, value} -> value
    {:error, _reason} -> nil
  end
```

Erlang:

```erlang
Normalize =
    fun
        ({ok, Value}) -> Value;
        ({error, _Reason}) -> undefined
    end.
```

Elixir capture shorthand:

```elixir
Enum.map([1, 2, 3], &(&1 * 2))
```

This is equivalent to:

```elixir
Enum.map([1, 2, 3], fn n -> n * 2 end)
```

**Language-design note:** Anonymous functions support higher-order programming, callbacks, collection transformations, and pipeline-friendly design. In Elixir, the capture shorthand is concise, but excessive shorthand can harm readability.

**Common Pitfalls:** Do not use capture shorthand when naming parameters would clarify domain meaning. `fn user -> user.email end` is often better than `& &1.email` in business logic, especially in multi-step transformations.
### Named Functions and Clauses — definitions, arity, pattern dispatch, guards, public/private visibility

Named functions are the main unit of executable behavior in Erlang and Elixir. A function is identified by **name plus arity** inside a module. Clause selection is based on **pattern matching** and then **guard evaluation**, not on static overload resolution.

This section continues the requested Part 2 role: a focused syntax and primitive-semantics reference before the deeper task-pattern treatment in Parts 3–6. 

| Feature                     | Erlang                                    | Elixir                                   | Meaning                          | Common pitfall                                                  |
| --------------------------- | ----------------------------------------- | ---------------------------------------- | -------------------------------- | --------------------------------------------------------------- |
| Public function declaration | `-export([name/arity]).`                  | `def name(args) do ... end`              | Public API function              | In Erlang, defining a function does not export it automatically |
| Private function            | Defined but not exported                  | `defp name(args) do ... end`             | Module-internal function         | In Elixir, `def` exports; use `defp` for internal helpers       |
| Multiple clauses            | Same function name/arity separated by `;` | Multiple `def`/`defp` heads              | Pattern-dispatched alternatives  | Clause order matters                                            |
| Guarded clause              | `f(X) when is_integer(X) -> ...`          | `def f(x) when is_integer(x) do ... end` | Pattern plus runtime refinement  | Guards are restricted; arbitrary calls are not allowed          |
| Arity distinction           | `find/1`, `find/2`                        | `find/1`, `find/2`                       | Different functions              | Not the same as type-based overloading                          |
| Return value                | Last expression                           | Last expression                          | Function body is expression-like | Do not look for ordinary `return` statements                    |

Erlang:

```erlang
-module(classifier).
-export([classify/1]).

classify({user, Id}) when is_integer(Id) ->
    {ok, user};
classify({admin, Id}) when is_integer(Id) ->
    {ok, admin};
classify(_) ->
    {error, unknown}.
```

Elixir:

```elixir
defmodule Classifier do
  def classify({:user, id}) when is_integer(id) do
    {:ok, :user}
  end

  def classify({:admin, id}) when is_integer(id) do
    {:ok, :admin}
  end

  def classify(_) do
    {:error, :unknown}
  end
end
```

Clause order is semantic. The runtime tries clauses in order and selects the first one whose pattern matches and whose guard succeeds.

Bad Elixir example:

```elixir
def classify(_), do: {:error, :unknown}

def classify({:user, id}) when is_integer(id), do: {:ok, :user}
```

The second clause is effectively unreachable because the first clause matches everything.

Bad Erlang example:

```erlang
classify(_) ->
    {error, unknown};
classify({user, Id}) when is_integer(Id) ->
    {ok, user}.
```

The same problem occurs.

**Language-design note:** Function clauses make data shape part of dispatch. This is different from object dispatch, typeclass dispatch, protocol dispatch, or overloaded methods. Function clause dispatch is local, ordered, runtime pattern matching.

**Professional use case:** Use multiple clauses when the shape of input is central to the function’s meaning. Use a single function body with `case` when the branching is secondary or when local variables need to be shared across branches.

**Common Pitfalls:** A broad catch-all clause placed too early hides later clauses. In public functions, this can silently convert invalid input into generic fallback behavior, making bugs harder to detect.

### Function Heads and Defaults — arity expansion, wrappers, optional arguments, and API clarity

Default arguments are handled differently in Erlang and Elixir.

Erlang does not have default arguments in the same syntactic sense. The common pattern is to define a smaller-arity function that calls a larger-arity function with defaults.

```erlang
-export([find/1, find/2]).

find(Id) ->
    find(Id, []).

find(Id, Options) ->
    {ok, {Id, Options}}.
```

Elixir has default argument syntax:

```elixir
def find(id, opts \\ []) do
  {:ok, {id, opts}}
end
```

This creates callable arities such as `find/1` and `find/2`.

| Task                     | Erlang pattern               | Elixir pattern                | Design meaning                          | Pitfall                                                    |
| ------------------------ | ---------------------------- | ----------------------------- | --------------------------------------- | ---------------------------------------------------------- |
| Provide defaults         | Wrapper function             | `\\` default value            | Smaller arity delegates to fuller arity | Default expansion can interact badly with multiple clauses |
| Public simple API        | Export `find/1`              | `def find(id, opts \\ [])`    | Ergonomic call site                     | Hidden arity generation                                    |
| Internal full API        | `find/2`                     | `def find(id, opts)`          | Central implementation                  | Duplicating logic across arities                           |
| Multiple clause defaults | Manual wrappers are explicit | Use function head declaration | Avoid conflicting defaults              | Defining defaults repeatedly across clauses                |

Elixir multi-clause functions with defaults usually need a function head:

```elixir
def find(id, opts \\ [])

def find(id, opts) when is_integer(id) do
  {:ok, {id, opts}}
end

def find(_, _) do
  {:error, :invalid_id}
end
```

This separates the default declaration from the clause bodies.

**Failure-first explanation:** The tempting wrong mental model is that Elixir default arguments are only local syntactic sugar. The surprising behavior is that defaults create multiple arities and may conflict with multi-clause definitions. The correct explanation is that `\\` participates in function head generation. The professional rule is: for public multi-clause functions, declare defaults once in a head, then write ordinary clauses below. The boundary changes for small one-clause functions where inline defaults are clear and harmless.

**Common Pitfalls:** Do not duplicate default values across multiple clauses. It creates ambiguity, warnings, or maintenance drift. Prefer a single declaration head.

### Private Helpers and API Boundaries — exported functions, internal functions, and callback visibility

Visibility is central to module design. Erlang and Elixir express it differently.

In Erlang, functions are private unless exported.

```erlang
-module(accounts).
-export([normalize/1]).

normalize(User) ->
    normalize_name(User).

normalize_name(#{name := Name} = User) ->
    User#{name := string:trim(Name)}.
```

Only `normalize/1` is exported. `normalize_name/1` is internal.

In Elixir, `def` defines a public function and `defp` defines a private function.

```elixir
defmodule Accounts do
  def normalize(user) do
    normalize_name(user)
  end

  defp normalize_name(%{name: name} = user) do
    %{user | name: String.trim(name)}
  end
end
```

| Boundary decision       | Erlang                                                           | Elixir                                              | Meaning                                 |
| ----------------------- | ---------------------------------------------------------------- | --------------------------------------------------- | --------------------------------------- |
| Public API              | Listed in `-export`                                              | `def`                                               | Callable from outside the module        |
| Internal helper         | Not exported                                                     | `defp`                                              | Callable only inside module             |
| Callback implementation | Exported when required by behaviour                              | Often public, sometimes generated by `use`          | Framework/OTP contract                  |
| Documentation           | EDoc and specs                                                   | `@doc`, `@spec`                                     | Public-facing contract                  |
| Testing                 | Often test public behavior; internal via module only if exported | Private functions usually tested through public API | Avoid exposing internals only for tests |

**Design meaning:** A module boundary is both a namespace boundary and a maintenance boundary. Erlang’s export list makes the public API explicit. Elixir’s `def`/`defp` makes visibility local to function definitions.

**Common Pitfalls:** Exposing internal helper functions because tests need them often indicates poor boundary design. Usually test through public functions, or split a coherent internal concept into a separate module with a deliberate public API.

### Case Expressions — pattern-driven branching and exhaustive thinking

`case` is the most important general branching construct. It branches by pattern and guard.

Erlang:

```erlang
case file:read_file(Path) of
    {ok, Binary} ->
        decode(Binary);
    {error, enoent} ->
        {error, not_found};
    {error, Reason} ->
        {error, {read_failed, Reason}}
end.
```

Elixir:

```elixir
case File.read(path) do
  {:ok, binary} ->
    decode(binary)

  {:error, :enoent} ->
    {:error, :not_found}

  {:error, reason} ->
    {:error, {:read_failed, reason}}
end
```

| Feature         | Erlang                            | Elixir                            | Meaning                                  | Pitfall                                    |
| --------------- | --------------------------------- | --------------------------------- | ---------------------------------------- | ------------------------------------------ |
| Branch by shape | `case Expr of Pattern -> ... end` | `case expr do pattern -> ... end` | Match expression result against patterns | Missing case causes runtime failure        |
| Guards          | `Pattern when Guard ->`           | `pattern when guard ->`           | Refine branch                            | Guard failures fall through                |
| Catch-all       | `_ ->`                            | `_ ->`                            | Fallback branch                          | Too broad fallback can hide invalid states |
| Return value    | Selected branch result            | Selected branch result            | `case` is expression-like                | Branch return shapes should be consistent  |

**Professional rule:** Use `case` when the code is fundamentally about **which shape or tag a value has**. Use separate function clauses when the whole function is defined by those shapes. Use `if` or `cond` only when shape matching is not the core issue.

**Common Pitfalls:** Do not add `_ -> nil` reflexively. A catch-all branch should represent a real domain fallback, not a way to silence unexpected states. In many cases, allowing a `CaseClauseError` or match failure is better during development because it exposes missing cases.

### If Expressions — boolean branching and guard-like conditions

`if` exists in both languages but has different idiomatic weight.

In Erlang, `if` uses guard expressions and has no implicit fallback unless provided.

```erlang
if
    N > 0 ->
        positive;
    N < 0 ->
        negative;
    true ->
        zero
end.
```

In Elixir:

```elixir
if n > 0 do
  :positive
else
  :not_positive
end
```

| Use                      | Erlang                | Elixir                             | Better alternative when                                |
| ------------------------ | --------------------- | ---------------------------------- | ------------------------------------------------------ |
| Simple boolean condition | `if Guard -> ... end` | `if condition do ... else ... end` | Use `case` when matching data shape                    |
| Multiple conditions      | Erlang `if` clauses   | Elixir `cond`                      | Use function clauses when input shape defines behavior |
| Fallback                 | `true -> ...`         | `else`                             | Avoid generic fallback if invalid state should crash   |
| Truthiness               | Guard-based           | `false` and `nil` are falsy        | Use explicit comparisons when ambiguity matters        |

Elixir’s `unless` is the inverse of `if`:

```elixir
unless valid? do
  {:error, :invalid}
end
```

Use `unless` sparingly. It can reduce readability when the condition is complex.

**Design meaning:** `if` is less central in Erlang / Elixir than in many imperative languages. Pattern matching often produces clearer code because many branches are about value shape rather than boolean flags.

**Common Pitfalls:** In Elixir, remember that `0`, `[]`, and `""` are truthy. In Erlang, remember that `if` clauses are guards; arbitrary function calls are not permitted.

### Cond Expressions in Elixir — ordered boolean clauses and fallback discipline

Elixir provides `cond` for multiple boolean conditions.

```elixir
cond do
  score >= 90 ->
    :excellent

  score >= 60 ->
    :pass

  true ->
    :fail
end
```

There is no direct Erlang `cond` syntax; Erlang usually uses `case`, `if`, or function clauses.

| Construct        | Best use                               | Design meaning                  | Common pitfall                                          |
| ---------------- | -------------------------------------- | ------------------------------- | ------------------------------------------------------- |
| `cond`           | Ordered boolean conditions             | First true branch wins          | Using it for shape matching that should be `case`       |
| `case`           | Pattern and tag branching              | Match value shape               | Writing complex boolean guards instead of patterns      |
| Function clauses | Whole-function dispatch by input shape | Declarative function definition | Spreading one conceptual branch across too many clauses |
| `if`             | Simple two-way condition               | Boolean branch                  | Nesting many `if`s                                      |

**Professional use case:** Use `cond` for ranges, priority rules, and ordered predicates.

Good:

```elixir
cond do
  age < 0 ->
    {:error, :invalid_age}

  age < 18 ->
    {:ok, :minor}

  age >= 18 ->
    {:ok, :adult}
end
```

Less good:

```elixir
cond do
  match?({:ok, _}, result) ->
    ...

  match?({:error, _}, result) ->
    ...
end
```

Use `case` instead:

```elixir
case result do
  {:ok, value} -> ...
  {:error, reason} -> ...
end
```

**Common Pitfalls:** `cond` without a fallback raises if no condition is true. That may be correct when missing a branch indicates a bug. Do not add `true -> nil` unless `nil` is truly part of the return contract.

### With Expressions in Elixir — linear success paths, tagged failures, and control-flow compression

Elixir’s `with` is a syntactic tool for chaining pattern matches where each step depends on the previous success.

```elixir
with {:ok, binary} <- File.read(path),
     {:ok, decoded} <- Jason.decode(binary),
     {:ok, user} <- validate_user(decoded) do
  {:ok, user}
else
  {:error, reason} ->
    {:error, reason}

  :invalid ->
    {:error, :invalid_user}
end
```

Erlang does not have direct `with` syntax. Equivalent Erlang code is usually nested `case`, helper functions, or newer style with explicit control-flow functions depending on project conventions.

Erlang nested form:

```erlang
load_user(Path) ->
    case file:read_file(Path) of
        {ok, Binary} ->
            case decode(Binary) of
                {ok, Decoded} ->
                    validate_user(Decoded);
                {error, Reason} ->
                    {error, Reason}
            end;
        {error, Reason} ->
            {error, Reason}
    end.
```

| `with` feature     | Meaning                          | Professional use               | Pitfall                                                  |
| ------------------ | -------------------------------- | ------------------------------ | -------------------------------------------------------- |
| `<-` pattern match | Continue only if pattern matches | Chain tagged success values    | Failure returns unmatched value unless `else` handles it |
| `=` match          | Assert inside chain              | Bind values that must match    | Crash if wrong                                           |
| `else`             | Normalize failures               | Convert heterogeneous failures | Can become a hidden second control-flow tree             |
| Final `do`         | Success path                     | Keep happy path linear         | Return shape should align with failure shape             |

**Language-design note:** `with` is not monadic syntax in a formal Haskell sense, but it serves a similar practical role for linearizing tagged success/failure flows. Its meaning remains pattern matching, not typeclass sequencing.

**Failure-first explanation:** The tempting wrong mental model is that `with` automatically handles all errors. The surprising behavior is that an unmatched value may pass to `else`, or if no `else` exists, become the value of the whole `with`. The correct explanation is that `with` is pattern-based control flow. The professional rule is: use `with` when each step returns a compatible tagged shape, and normalize failures deliberately. The boundary changes when failure cases need distinct local handling; then ordinary `case` is clearer.

**Common Pitfalls:** Do not use `with` when every step needs a different error branch. That creates an unreadable `else`. Use `case` or split into helper functions.

### Receive Expressions — mailboxes, selective receive, timeout, and message patterns

`receive` is the primitive syntax for reading messages from the current process mailbox. It is central to Erlang and available in Elixir, though idiomatic Elixir code often uses OTP abstractions before writing raw `receive` in application code.

Erlang:

```erlang
receive
    {ok, Value} ->
        {ok, Value};
    {error, Reason} ->
        {error, Reason}
after 5000 ->
    {error, timeout}
end.
```

Elixir:

```elixir
receive do
  {:ok, value} ->
    {:ok, value}

  {:error, reason} ->
    {:error, reason}
after
  5_000 ->
    {:error, :timeout}
end
```

| Feature       | Erlang                       | Elixir                          | Meaning                           | Pitfall                                         |
| ------------- | ---------------------------- | ------------------------------- | --------------------------------- | ----------------------------------------------- |
| Message match | `receive Pattern -> ... end` | `receive do pattern -> ... end` | Scan mailbox for matching message | Selective receive can leave old messages behind |
| Timeout       | `after Millis -> ...`        | `after millis -> ...`           | Fallback after waiting            | Timeout is not cancellation of sender           |
| Catch-all     | `_ -> ...`                   | `_ -> ...`                      | Match any message                 | Can consume protocol messages accidentally      |
| Pattern tags  | `{Tag, Data}`                | `{:tag, data}`                  | Message protocol shape            | Untagged messages become ambiguous              |

Raw `receive` is useful for teaching and for certain low-level code. But most production code uses OTP abstractions such as `GenServer`, `Task`, `receive` wrappers, or library-managed processes.

**Language-design note:** `receive` is where pattern matching meets concurrency. The current process does not simply pop the first message. It looks for the first message matching one of the receive patterns, preserving non-matching messages. This is powerful and dangerous.

**Common Pitfalls:** Selective receive can create mailbox buildup if old messages never match future receives. This can become a latency and memory problem. Part 7 will treat the runtime mechanics; for syntax reading, recognize `receive` as a protocol definition against the process mailbox.

### Message Sending Syntax — asynchronous delivery, process identifiers, and protocol shape

Message sending is syntactically simple and semantically important.

Erlang:

```erlang
Pid ! {hello, self()}.
```

Elixir:

```elixir
send(pid, {:hello, self()})
```

Elixir also supports the `send/2` function as the normal explicit form. Do not confuse it with channel-like syntax from other languages.

| Concept            | Erlang        | Elixir           | Meaning                                    |
| ------------------ | ------------- | ---------------- | ------------------------------------------ |
| Current process    | `self()`      | `self()`         | PID of current process                     |
| Send message       | `Pid ! Msg`   | `send(pid, msg)` | Put message in target process mailbox      |
| Message shape      | `{tag, Data}` | `{:tag, data}`   | Protocol-level convention                  |
| Return value       | Sent message  | Sent message     | Sending does not imply receiver handled it |
| Delivery semantics | Asynchronous  | Asynchronous     | Sender continues after send                |

Example:

```elixir
parent = self()

spawn(fn ->
  send(parent, {:done, 42})
end)

receive do
  {:done, value} -> value
end
```

Erlang equivalent:

```erlang
Parent = self(),
spawn(fun() ->
    Parent ! {done, 42}
end),
receive
    {done, Value} -> Value
end.
```

**Design meaning:** Messages are ordinary BEAM values sent to process mailboxes. The message shape is not enforced by a type checker. Protocol correctness is a matter of conventions, patterns, tests, and OTP abstractions.

**Failure-first explanation:** The tempting wrong mental model is that sending a message is like calling a method. The surprising behavior is that the sender does not know whether the receiver processed the message, crashed, ignored it, or will process it much later. The correct explanation is that send is asynchronous mailbox insertion. The professional rule is: if a response is needed, design a request-response protocol with references, monitors, timeouts, or use `GenServer.call`/`Task.await`. The boundary changes when using OTP abstractions that implement these protocols for you.

**Common Pitfalls:** Do not send untagged messages such as `42` or `"done"` in nontrivial systems. Use tagged tuples with correlation data when necessary.

### Spawn, Self, Links, and Monitors — primitive process syntax before OTP abstractions

Process primitives create and observe BEAM processes. These primitives are important for understanding OTP, even if application code often uses higher-level constructs.

| Task                  | Erlang                          | Elixir                                    | Meaning                                 |
| --------------------- | ------------------------------- | ----------------------------------------- | --------------------------------------- |
| Current process PID   | `self()`                        | `self()`                                  | Return current process identifier       |
| Spawn anonymous work  | `spawn(fun() -> ... end)`       | `spawn(fn -> ... end)`                    | Start new BEAM process                  |
| Spawn module function | `spawn(Module, Function, Args)` | `spawn(Module, :function, args)`          | Start process by MFA                    |
| Link process          | `spawn_link(...)`, `link(Pid)`  | `spawn_link(...)`, `Process.link(pid)`    | Failure propagation relationship        |
| Monitor process       | `erlang:monitor(process, Pid)`  | `Process.monitor(pid)`                    | Receive `DOWN` message on process death |
| Sleep                 | `timer:sleep(Ms)`               | `Process.sleep(ms)` or `:timer.sleep(ms)` | Suspend current process                 |

Elixir example with monitor:

```elixir
parent = self()

pid =
  spawn(fn ->
    send(parent, {:result, 10})
  end)

ref = Process.monitor(pid)

receive do
  {:result, value} ->
    {:ok, value}

  {:DOWN, ^ref, :process, ^pid, reason} ->
    {:error, reason}
end
```

Erlang equivalent:

```erlang
Parent = self(),
Pid = spawn(fun() ->
    Parent ! {result, 10}
end),
Ref = erlang:monitor(process, Pid),
receive
    {result, Value} ->
        {ok, Value};
    {'DOWN', Ref, process, Pid, Reason} ->
        {error, Reason}
end.
```

Notice the Erlang atom `'DOWN'` is quoted because it is uppercase. In Elixir it is usually written as `:DOWN`.

**Design meaning:** Links and monitors are not just syntax. They are the low-level foundation of OTP supervision, task monitoring, process lifecycle management, and fault boundaries.

**Common Pitfalls:** `spawn` without linking or monitoring can create orphaned failures. The spawned process may crash silently from the caller’s perspective unless the system has other observability or supervision in place.

### Recursion Syntax — base cases, recursive clauses, and tail position

Erlang / Elixir do not use mutation-based loops as the central primitive. Recursion, higher-order functions, comprehensions, and library abstractions handle repetition.

Erlang:

```erlang
sum([]) ->
    0;
sum([H | T]) ->
    H + sum(T).
```

Elixir:

```elixir
def sum([]), do: 0

def sum([h | t]) do
  h + sum(t)
end
```

Tail-recursive Erlang:

```erlang
sum(List) ->
    sum(List, 0).

sum([], Acc) ->
    Acc;
sum([H | T], Acc) ->
    sum(T, Acc + H).
```

Tail-recursive Elixir:

```elixir
def sum(list), do: sum(list, 0)

defp sum([], acc), do: acc

defp sum([h | t], acc), do: sum(t, acc + h)
```

| Pattern             | Use                     | Meaning                          | Pitfall                                                       |
| ------------------- | ----------------------- | -------------------------------- | ------------------------------------------------------------- |
| Base clause         | Stop recursion          | Defines terminal shape           | Missing base case causes infinite recursion or clause failure |
| Recursive clause    | Decompose input         | Process head and recurse on tail | Not all recursion is tail recursion                           |
| Accumulator         | Preserve running state  | Tail-recursive loop style        | Accumulator order may require final reverse                   |
| Library alternative | `lists:map`, `Enum.map` | Use existing traversal           | Hiding cost in chained traversals                             |

**Language-design note:** Recursion expresses repetition through data shape. Tail recursion matters for long-running loops and process receive loops. However, in Elixir especially, high-level functions such as `Enum.map`, `Enum.reduce`, and `Stream` are often clearer than manual recursion for ordinary collection processing.

**Common Pitfalls:** Do not manually recurse over collections when a standard library function expresses the task more clearly. But also do not chain many eager `Enum` transformations blindly in performance-sensitive paths; Part 6 and Part 7 will separate clarity from cost.

### Comprehensions — list generation, filtering, binary generation, and transformation syntax

Both Erlang and Elixir support comprehensions. They combine generation, filtering, and transformation.

Erlang list comprehension:

```erlang
Squares = [X * X || X <- [1, 2, 3, 4], X rem 2 =:= 0].
```

Elixir comprehension:

```elixir
squares =
  for x <- [1, 2, 3, 4],
      rem(x, 2) == 0 do
    x * x
  end
```

| Feature              | Erlang                        | Elixir                                     | Meaning                 |                                              |                           |
| -------------------- | ----------------------------- | ------------------------------------------ | ----------------------- | -------------------------------------------- | ------------------------- |
| Generator            | `X <- List`                   | `x <- enumerable`                          | Draw values from source |                                              |                           |
| Filter               | boolean guard-like expression | boolean expression                         | Keep matching values    |                                              |                           |
| Yield                | expression before `           |                                            | `                       | body after `do`                              | Produced value            |
| Binary comprehension | `<< <<X>>                     |                                            | <<X>> <= Bin >>`        | `for <<x <- binary>>, into: <<>>, do: <<x>>` | Iterate/generate binaries |
| Target collection    | list by default               | list by default, configurable with `:into` | Output shape            |                                              |                           |

Elixir example with map output:

```elixir
for {key, value} <- pairs, into: %{} do
  {key, normalize(value)}
end
```

**Design meaning:** Comprehensions are declarative transformation syntax. They are useful when the code is naturally “generate, filter, transform.” They are less useful when stateful error handling or early exits dominate.

**Common Pitfalls:** Do not use comprehensions for complex business workflows with many side effects. Use `Enum.reduce`, `with`, `case`, or explicit functions when control flow matters more than generation.

### Pipe Operator in Elixir — data-first composition and readability constraints

The pipe operator `|>` is Elixir-specific syntax. It takes the value on the left and inserts it as the first argument of the function call on the right.

```elixir
"  ada  "
|> String.trim()
|> String.upcase()
```

Equivalent:

```elixir
String.upcase(String.trim("  ada  "))
```

| Use                   | Example                | Meaning                      | Pitfall                                    |                                        |                                         |
| --------------------- | ---------------------- | ---------------------------- | ------------------------------------------ | -------------------------------------- | --------------------------------------- |
| Data transformation   | `data                  | > normalize()                | > validate()`                              | Linear transformation pipeline         | Function APIs must fit data-first style |
| Collection processing | `users                 | > Enum.map(...)              | > Enum.filter(...)`                        | Chain enumerable operations            | Repeated eager traversals may cost      |
| Framework DSLs        | Phoenix/Ecto pipelines | Compose macro/function calls | Can hide generated code or query semantics |                                        |                                         |
| Debug insertion       | `                      | > dbg()`or`IO.inspect()`     | Observe intermediate values                | Leaving debug calls in production code |                                         |

The pipe inserts into the first argument by default:

```elixir
value |> f(a, b)
```

means:

```elixir
f(value, a, b)
```

It does not mean:

```elixir
f(a, b, value)
```

**Language-design note:** The pipe operator encourages APIs where the main data subject is the first argument. This is a major Elixir style pressure. Erlang code often uses nested calls or explicit intermediate variables instead.

**Failure-first explanation:** The tempting wrong mental model is that pipes always improve readability. The surprising result is a pipeline where each step uses anonymous functions, positional hacks, or macros that obscure what is being passed. The correct explanation is that the pipe is only clear when each step reads as transformation of the same conceptual subject. The professional rule is: use pipelines for linear data transformation; use named intermediate variables when the subject changes or when branching matters.

**Common Pitfalls:** Do not force awkward functions into a pipeline using unnecessary anonymous wrappers. If a step needs complex arguments or changes conceptual subject, break the pipeline.

### Module Syntax — compilation units, namespaces, exports, and BEAM module identity

Modules are the primary namespace and compilation unit in both languages.

Erlang:

```erlang
-module(accounts).
-export([normalize/1]).

normalize(User) ->
    User.
```

Elixir:

```elixir
defmodule Accounts do
  def normalize(user) do
    user
  end
end
```

| Module feature         | Erlang                         | Elixir                                       | Meaning                              |
| ---------------------- | ------------------------------ | -------------------------------------------- | ------------------------------------ |
| Module declaration     | `-module(accounts).`           | `defmodule Accounts do ... end`              | Defines module name                  |
| Public function export | `-export([f/1]).`              | `def f(arg)`                                 | Public API                           |
| Private helper         | Function not exported          | `defp`                                       | Internal function                    |
| Module attributes      | `-spec`, `-type`, `-behaviour` | `@spec`, `@type`, `@behaviour`, custom attrs | Compile-time metadata                |
| Namespacing            | Atoms like `my_app_accounts`   | Aliased atoms like `MyApp.Accounts`          | Elixir module names compile to atoms |
| Remote call            | `accounts:normalize(User)`     | `Accounts.normalize(user)`                   | Module function call                 |

Elixir module names are atoms internally. For example, `String` corresponds to an atom-like module identity. Erlang modules are also atoms, typically lowercase.

Elixir can call Erlang modules directly:

```elixir
:lists.reverse([1, 2, 3])
:erlang.term_to_binary({:ok, 1})
```

**Design meaning:** Elixir’s nested module names are namespace conventions over BEAM module atoms, not nested runtime objects in the OOP sense.

**Common Pitfalls:** Do not assume `MyApp.Accounts.User` implies a runtime nested class under `MyApp.Accounts`. It is a module name convention.

### Module Attributes and Compile-Time Metadata — declarations, docs, specs, and macros

Module attributes exist in both languages, but Elixir uses them more visibly.

Erlang attributes:

```erlang
-module(accounts).
-export([normalize/1]).
-spec normalize(map()) -> map().
```

Elixir attributes:

```elixir
defmodule Accounts do
  @moduledoc "Account-related operations."
  @default_timeout 5_000

  @spec timeout() :: non_neg_integer()
  def timeout do
    @default_timeout
  end
end
```

| Use         | Erlang                    | Elixir                                    | Meaning                                         |
| ----------- | ------------------------- | ----------------------------------------- | ----------------------------------------------- |
| Module name | `-module(name).`          | `defmodule` syntax                        | Compilation unit identity                       |
| Export list | `-export([...]).`         | `def` exports automatically               | Public functions                                |
| Specs       | `-spec`                   | `@spec`                                   | Type/documentation/analyzer contract            |
| Types       | `-type`, `-opaque`        | `@type`, `@opaque`                        | Named type documentation and analysis           |
| Behaviour   | `-behaviour(gen_server).` | `@behaviour Behaviour` or `use GenServer` | Callback contract                               |
| Docs        | EDoc comments             | `@moduledoc`, `@doc`                      | Generated documentation                         |
| Constants   | Macros or functions       | Module attributes often used              | Compile-time value, not mutable global variable |

Elixir module attributes are often used like constants, but they are compile-time constructs.

```elixir
defmodule Config do
  @timeout 5_000

  def timeout do
    @timeout
  end
end
```

**Language-design note:** Module attributes blur several roles: metadata, documentation, compile-time constants, macro inputs, accumulated attributes, and behaviour declarations. Their meaning depends on context.

**Common Pitfalls:** Do not treat Elixir module attributes as runtime mutable variables. If runtime configuration is needed, use application environment, function arguments, process state, persistent term, ETS, or a proper configuration mechanism depending on the case.

### Alias, Import, Require, and Use in Elixir — namespace convenience versus macro expansion

Elixir has four commonly confused module-related directives: `alias`, `import`, `require`, and `use`.

| Directive | Meaning                                         | Example                       | When to use                               | Common pitfall                                      |
| --------- | ----------------------------------------------- | ----------------------------- | ----------------------------------------- | --------------------------------------------------- |
| `alias`   | Shorten module name                             | `alias MyApp.Accounts.User`   | Improve readability for module references | Over-aliasing makes origin unclear                  |
| `import`  | Bring functions/macros into local scope         | `import Enum, only: [map: 2]` | Use sparingly for DSLs or common helpers  | Hides where functions come from                     |
| `require` | Ensure module is compiled so macros can be used | `require Logger`              | Use macros from module                    | Forgetting macros require compile-time availability |
| `use`     | Invoke `__using__` macro from module            | `use GenServer`               | Adopt framework/behaviour boilerplate     | Thinking `use` is a simple import                   |

Examples:

```elixir
alias MyApp.Accounts.User

def normalize(%User{} = user) do
  user
end
```

```elixir
require Logger

Logger.info("started")
```

```elixir
defmodule Worker do
  use GenServer
end
```

`use GenServer` is macro expansion. It injects or configures code according to `GenServer.__using__/1`.

**Design meaning:** `use` is one of the main entry points into Elixir’s macro-based ecosystem. It is powerful because frameworks can create concise DSLs and conventions. It is risky because behavior may be hidden behind compile-time expansion.

**Failure-first explanation:** The tempting wrong mental model is that `use SomeModule` means “import this module.” The surprising behavior is that `use` can define functions, set attributes, import functions, register callbacks, and alter compilation. The correct explanation is that `use M` calls `M.__using__(opts)` as a macro. The professional rule is: every `use` should be treated as a significant dependency on compile-time behavior. The boundary changes in well-known conventions such as `use GenServer`, `use ExUnit.Case`, or Phoenix modules, where the macro contract is stable and documented.

**Common Pitfalls:** Excessive `import` and `use` can make source code difficult to audit. Prefer `alias` for namespacing; reserve `import` and `use` for places where they clearly improve a DSL or framework integration.

### Erlang Includes, Defines, and Imports — header files, macros, and legacy conventions

Erlang has its own compile-time facilities.

| Directive              | Example                                    | Meaning                          | Professional caution                         |
| ---------------------- | ------------------------------------------ | -------------------------------- | -------------------------------------------- |
| Include header         | `-include("records.hrl").`                 | Insert header file               | Common for records and macros                |
| Include library header | `-include_lib("kernel/include/file.hrl").` | Include from application library | Depends on code path and app structure       |
| Define macro           | `-define(TIMEOUT, 5000).`                  | Compile-time macro               | Can obscure constants and logic              |
| Use macro              | `?TIMEOUT`                                 | Expand macro                     | Not a runtime variable                       |
| Import functions       | `-import(lists, [map/2]).`                 | Bring function into local scope  | Often avoided because it hides module origin |

Erlang macro example:

```erlang
-define(DEFAULT_TIMEOUT, 5000).

timeout() ->
    ?DEFAULT_TIMEOUT.
```

Records are often declared in header files:

```erlang
-record(user, {id, name}).
```

Then used in modules that include the header.

**Design meaning:** Erlang’s preprocessor is older and more textual than Elixir’s hygienic macro system. It is important for reading legacy and OTP-style code, but it should not be confused with Elixir macros.

**Common Pitfalls:** Overusing `-import` can make Erlang code harder to read because calls lose their module qualifier. In professional code, explicit `module:function(...)` calls are often clearer.

### Records and Structs as Syntax Preview — named fields over underlying data

Records and structs are mostly Part 3 topics, but their syntax appears early in real code.

Erlang records are compile-time abstractions over tuples.

```erlang
-record(user, {id, name}).

User = #user{id = 1, name = <<"Ada">>},
Name = User#user.name,
Updated = User#user{name = <<"Grace">>}.
```

Elixir structs are maps with a `__struct__` key and compile-time field checks.

```elixir
defmodule User do
  defstruct [:id, :name]
end

user = %User{id: 1, name: "Ada"}
name = user.name
updated = %User{user | name: "Grace"}
```

| Feature                  | Erlang record                                     | Elixir struct                                          |             |
| ------------------------ | ------------------------------------------------- | ------------------------------------------------------ | ----------- |
| Underlying runtime shape | Tuple                                             | Map with `__struct__`                                  |             |
| Declaration              | `-record(user, {...}).`                           | `defstruct [...]`                                      |             |
| Field access             | `User#user.name`                                  | `user.name`                                            |             |
| Update                   | `User#user{name = New}`                           | `%User{user                                            | name: new}` |
| Pattern match            | `#user{id = Id}`                                  | `%User{id: id}`                                        |             |
| Main pitfall             | Runtime tuple shape hidden by compile-time syntax | Struct is still a map, but not every map is the struct |             |

**Language-design note:** Erlang records are efficient and historically important but awkward across module boundaries because record definitions are compile-time. Elixir structs are more ergonomic and common in modern domain modeling, but they do not provide full static type guarantees.

**Common Pitfalls:** Do not treat Erlang records as runtime dictionaries. Do not treat Elixir structs as classes with methods. They are data shapes; behavior remains in functions and protocols.

### Error Syntax Overview — values, match failures, exceptions, throws, exits

Erlang / Elixir has multiple failure mechanisms. Part 5 will treat error design by task pattern. Here the goal is to recognize syntax.

| Mechanism          | Erlang syntax           | Elixir syntax            | Meaning                    | Normal use                       |
| ------------------ | ----------------------- | ------------------------ | -------------------------- | -------------------------------- |
| Tagged error value | `{error, Reason}`       | `{:error, reason}`       | Error as data              | Expected recoverable failures    |
| Match failure      | `{ok, X} = Result`      | `{:ok, x} = result`      | Assertion failed           | Invariant violation or fail-fast |
| Raise/error        | `erlang:error(Reason)`  | `raise "message"`        | Exception-like failure     | Exceptional local failure        |
| Throw              | `throw(Term)`           | `throw(term)`            | Non-local control transfer | Rare, specialized                |
| Exit               | `exit(Reason)`          | `exit(reason)`           | Process exit signal        | Process lifecycle/failure        |
| Try/catch          | `try ... catch ... end` | `try/rescue/catch/after` | Handle failure locally     | Boundary handling                |

Erlang:

```erlang
try dangerous() of
    Value ->
        {ok, Value}
catch
    error:Reason ->
        {error, Reason};
    throw:Reason ->
        {throw, Reason};
    exit:Reason ->
        {exit, Reason}
end.
```

Elixir:

```elixir
try do
  dangerous()
rescue
  exception ->
    {:error, exception}
catch
  :throw, reason ->
    {:throw, reason}

  :exit, reason ->
    {:exit, reason}
after
  cleanup()
end
```

**Design meaning:** Error syntax maps to different semantic layers. A tagged tuple is ordinary data. A raised exception is local exceptional control flow. An exit is process-level failure. Supervision acts above individual function calls.

**Common Pitfalls:** Do not collapse all failures into exceptions. Erlang / Elixir code commonly represents expected failures as data and unexpected process failure as crashes under supervision.

### Try, Rescue, Catch, and After in Elixir — local exception handling and cleanup

Elixir separates `rescue`, `catch`, and `after`.

```elixir
try do
  File.read!(path)
rescue
  e in File.Error ->
    {:error, e.reason}
after
  cleanup()
end
```

| Clause   | Handles                    | Meaning                             | Caution                                            |
| -------- | -------------------------- | ----------------------------------- | -------------------------------------------------- |
| `rescue` | Exceptions                 | Handle raised exceptions            | Not for ordinary tagged errors                     |
| `catch`  | Throws and exits           | Catch non-exception control signals | Rare in ordinary code                              |
| `after`  | Always-run cleanup         | Cleanup after try block             | Does not change return unless structured carefully |
| `else`   | Successful result matching | Refine non-exception success        | Less common; can improve clarity in narrow cases   |

Example with `else`:

```elixir
try do
  parse!(text)
rescue
  e in ArgumentError ->
    {:error, e.message}
else
  parsed ->
    {:ok, parsed}
end
```

**Professional use case:** Use `try/rescue` at boundaries where an exception-raising API must be converted into tagged return values, HTTP responses, logs, or controlled process failure.

**Common Pitfalls:** Wrapping large blocks in broad `rescue` hides bugs. Prefer narrow rescue clauses around known exception-raising operations.

### Try and Catch in Erlang — classifying `throw`, `error`, and `exit`

Erlang’s `try ... catch` can distinguish classes of failure.

```erlang
try parse(Text) of
    Parsed ->
        {ok, Parsed}
catch
    error:badarg ->
        {error, badarg};
    throw:Reason ->
        {error, {thrown, Reason}};
    exit:Reason ->
        {error, {exit, Reason}}
after
    cleanup()
end.
```

| Failure class | Erlang catch pattern | Meaning                            |
| ------------- | -------------------- | ---------------------------------- |
| Runtime error | `error:Reason`       | Exception-like error               |
| Throw         | `throw:Reason`       | Non-local return-style control     |
| Exit          | `exit:Reason`        | Process exit signal caught locally |
| Any class     | `Class:Reason`       | Captures failure class and reason  |

**Language-design note:** Erlang’s error system predates many modern exception conventions. It is deeply integrated with process exits and fault tolerance. This is why the same word “error” can refer to several distinct levels: error value, runtime error, process exit reason, or supervision event.

**Common Pitfalls:** Catching exits casually can interfere with intended failure propagation. In OTP systems, ask whether the process should really continue after this failure or whether the supervisor should handle it.

### Bang Functions and Non-Bang Functions in Elixir — convention for raising versus tagged returns

Elixir commonly uses a naming convention: functions ending in `!` often raise on failure, while non-bang versions return tagged values or fallback forms.

| Task            | Non-bang form             | Bang form                  | Meaning                            |
| --------------- | ------------------------- | -------------------------- | ---------------------------------- |
| Read file       | `File.read(path)`         | `File.read!(path)`         | Tagged result vs raise             |
| Fetch map key   | `Map.fetch(map, key)`     | `Map.fetch!(map, key)`     | `{:ok, value}` / `:error` vs raise |
| Parse or decode | Library-dependent         | Library-dependent          | Usually tagged vs raise convention |
| App config      | `Application.fetch_env/2` | `Application.fetch_env!/2` | Controlled missing config behavior |

Example:

```elixir
File.read("config.json")
# {:ok, binary} or {:error, reason}

File.read!("config.json")
# binary or raises File.Error
```

**Design meaning:** The `!` suffix is a convention, not a special language operator. It signals that the function may raise or is unsafe under ordinary failure. This convention helps call sites communicate failure policy.

**Common Pitfalls:** Do not use bang functions merely to avoid handling errors. Use them when failure means the current process should not continue or when a higher-level boundary will handle the exception/crash.

### Boolean Predicate Naming — `is_`, `?`, and guard-compatible checks

Predicate naming differs across languages and contexts.

| Predicate kind             | Erlang                                   | Elixir                          | Meaning                                   |
| -------------------------- | ---------------------------------------- | ------------------------------- | ----------------------------------------- |
| Guard-safe type checks     | `is_integer(X)`, `is_binary(X)`          | `is_integer(x)`, `is_binary(x)` | Runtime type predicates allowed in guards |
| Domain predicates          | `valid_user(User)` or project convention | `valid_user?(user)`             | Boolean domain function                   |
| Macro-generated predicates | Less common in syntax                    | Framework-dependent             | Compile-time generated checks             |
| Guard custom composition   | limited                                  | `defguard` / `defguardp`        | Define reusable guard macros              |

Elixir convention uses `?` for boolean-returning domain predicates:

```elixir
def active?(%User{active: true}), do: true
def active?(_), do: false
```

Guard-safe functions use `is_`:

```elixir
def normalize(id) when is_integer(id) do
  {:ok, id}
end
```

Elixir can define custom guards:

```elixir
defguard is_positive_integer(value)
         when is_integer(value) and value > 0
```

**Design meaning:** Guard-compatible checks are syntactically and semantically restricted. Domain predicates are normal functions and cannot be used in guards unless defined through guard macros.

**Common Pitfalls:** Do not expect `valid_user?(user)` to work in a guard. Use a guard-safe expression or move validation into the function body.

### Sigils in Elixir — literal forms, regex, strings, charlists, and custom syntax

Elixir has sigils: special literal syntax beginning with `~`.

| Sigil         | Meaning                                | Example                    | Common use            |
| ------------- | -------------------------------------- | -------------------------- | --------------------- |
| `~s`          | String                                 | `~s(hello "world")`        | Avoid escaping quotes |
| `~S`          | Raw string                             | `~S(no #{interpolation})`  | Literal text          |
| `~c` / `~C`   | Charlists depending version/convention | `~c"abc"`                  | Explicit charlists    |
| `~r`          | Regex                                  | `~r/^\d+$/`                | Regular expressions   |
| `~w`          | Word list                              | `~w(foo bar baz)`          | List of strings       |
| `~W`          | Raw word list                          | `~W(foo #{bar})`           | No interpolation      |
| Custom sigils | User-defined                           | `~p"/users"` in frameworks | DSLs                  |

Example:

```elixir
regex = ~r/^\d+$/

Regex.match?(regex, "123")
```

Phoenix and other frameworks use custom sigils, such as path or template sigils, through macro mechanisms.

**Language-design note:** Sigils are a metaprogramming-friendly literal system. They support DSLs while keeping syntax compact. They are Elixir-specific and should not be mistaken for BEAM runtime primitives.

**Common Pitfalls:** Custom sigils can hide compile-time behavior. When reading framework code, identify whether a sigil creates a string, regex, charlist, route, query fragment, template, or some other DSL object.

### Keyword Lists in Elixir and Proplists in Erlang — option syntax and ordered pairs

Elixir keyword lists and Erlang proplists are related conventions for lists of key-value pairs.

Elixir:

```elixir
opts = [timeout: 5_000, retries: 3]
```

This is syntax for:

```elixir
opts = [{:timeout, 5_000}, {:retries, 3}]
```

Erlang proplist:

```erlang
Opts = [{timeout, 5000}, {retries, 3}].
```

| Feature                | Elixir keyword list                       | Erlang proplist                       |
| ---------------------- | ----------------------------------------- | ------------------------------------- |
| Runtime shape          | List of two-element tuples with atom keys | List of tuples or atoms by convention |
| Order preserved        | Yes                                       | Yes                                   |
| Duplicate keys allowed | Yes                                       | Yes                                   |
| Common use             | Options, DSLs, macro arguments            | Options, legacy APIs                  |
| Key type convention    | Atom keys                                 | Usually atoms                         |
| Random access          | Linear scan                               | Linear scan                           |

Elixir function call option syntax:

```elixir
start_link(name: MyServer, timeout: 5_000)
```

This passes a keyword list as the final argument.

**Design meaning:** Keyword lists are not maps. They are ordered lists, can contain duplicate keys, and are common where order or DSL readability matters. Maps are better for general key-value data when uniqueness and lookup semantics matter.

**Common Pitfalls:** Do not use keyword lists as general dictionaries. Use maps for general associative data. Use keyword lists for options and DSL-like call syntax.

### Access Syntax in Elixir — dot access, bracket access, and failure behavior

Elixir provides multiple access syntaxes with different semantics.

| Access form     | Example                        | Works for                                       | Failure behavior                       |
| --------------- | ------------------------------ | ----------------------------------------------- | -------------------------------------- |
| Dot access      | `user.name`                    | Maps/structs with atom keys known syntactically | Raises if key missing in many contexts |
| Bracket access  | `user[:name]`                  | Access protocol, maps, keyword lists            | Often returns `nil` if missing         |
| Function access | `Map.fetch(user, :name)`       | Maps                                            | `{:ok, value}` or `:error`             |
| Bang fetch      | `Map.fetch!(user, :name)`      | Maps                                            | Raises if missing                      |
| Nested access   | `get_in(data, [:user, :name])` | Access-compatible structures                    | Depends on access path                 |

Example:

```elixir
user = %{name: "Ada"}

user.name
# "Ada"

user[:email]
# nil

Map.fetch(user, :email)
# :error
```

**Design meaning:** Different access forms encode different failure policies. Dot access is assertive. Bracket access is permissive. `fetch` makes absence explicit as data.

**Common Pitfalls:** Do not use bracket access when missing data should be treated as an error. Silent `nil` can propagate until the actual bug is far from the source.

### Basic Import and Remote Call Style in Erlang — explicit modules and readability

Erlang commonly favors explicit remote calls:

```erlang
lists:map(fun normalize/1, Users).
maps:get(name, User).
file:read_file(Path).
```

The `-import` directive exists:

```erlang
-import(lists, [map/2]).
```

Then:

```erlang
map(fun normalize/1, Users).
```

But explicit module qualification is often clearer.

| Style                | Example            | Advantage       | Cost           |
| -------------------- | ------------------ | --------------- | -------------- |
| Explicit remote call | `lists:map(F, Xs)` | Origin is clear | More verbose   |
| Imported function    | `map(F, Xs)`       | Shorter         | Origin hidden  |
| Local wrapper        | `map_users(Users)` | Domain meaning  | Extra function |

**Professional rule:** In Erlang, prefer explicit remote calls unless importing is a well-established local convention. Module prefixes improve source-reading and code review.

**Common Pitfalls:** Over-importing from common modules can make code ambiguous, especially for readers moving between Erlang and Elixir.

### Basic Type and Spec Syntax Preview — `-spec`, `@spec`, named types, and documentation contracts

Full type modeling belongs to Part 3, but spec syntax appears in ordinary source.

Erlang:

```erlang
-type user_id() :: non_neg_integer().
-spec find_user(user_id()) -> {ok, map()} | {error, not_found}.
```

Elixir:

```elixir
@type user_id :: non_neg_integer()
@spec find_user(user_id()) :: {:ok, map()} | {:error, :not_found}
```

| Concept           | Erlang                           | Elixir                           | Meaning                            |                   |                        |
| ----------------- | -------------------------------- | -------------------------------- | ---------------------------------- | ----------------- | ---------------------- |
| Function spec     | `-spec f(type()) -> type().`     | `@spec f(type()) :: type()`      | Document/analyze function contract |                   |                        |
| Public type       | `-type name() :: ... .`          | `@type name :: ...`              | Named type visible in docs         |                   |                        |
| Opaque type       | `-opaque name() :: ... .`        | `@opaque name :: ...`            | Hide representation contract       |                   |                        |
| Built-in type     | `integer()`, `binary()`, `pid()` | `integer()`, `binary()`, `pid()` | Type language terms                |                   |                        |
| Union             | `a                               | b`                               | `a                                 | b`                | One of several types   |
| Tagged tuple type | `{ok, T}                         | {error, Reason}`                 | `{:ok, t}                          | {:error, reason}` | Common result protocol |

**Design meaning:** Specs are part of professional communication. They help readers, tools, and maintainers understand intended shapes. They are not the same as mandatory compile-time type declarations.

**Common Pitfalls:** Specs that lie are worse than no specs. If implementation, tests, and spec diverge, the spec becomes false documentation. Keep specs close to actual behavior.

### Behaviour Syntax Preview — callback contracts and OTP-adjacent declarations

Behaviours define callback contracts. They are essential in OTP and in some Elixir libraries.

Erlang behavior declaration:

```erlang
-behaviour(gen_server).
```

Elixir behavior declaration:

```elixir
@behaviour GenServer
```

More idiomatic Elixir often uses:

```elixir
defmodule MyServer do
  use GenServer
end
```

A custom Elixir behaviour:

```elixir
defmodule Parser do
  @callback parse(binary()) :: {:ok, term()} | {:error, term()}
end
```

Implementation:

```elixir
defmodule JsonParser do
  @behaviour Parser

  @impl true
  def parse(binary) do
    Jason.decode(binary)
  end
end
```

| Feature             | Erlang                     | Elixir                             | Meaning                           |
| ------------------- | -------------------------- | ---------------------------------- | --------------------------------- |
| Declare behavior    | `-behaviour(Name).`        | `@behaviour Name`                  | Module promises callbacks         |
| Define callback     | `-callback`                | `@callback`                        | Contract for implementing modules |
| Mark implementation | Not same convention        | `@impl true`                       | Declare callback implementation   |
| OTP behavior        | `gen_server`, `supervisor` | `GenServer`, `Supervisor` wrappers | Standard process patterns         |

**Design meaning:** Behaviours are not interfaces in a nominal OO type system, but they serve a related contract role. They define expected callback functions and allow tooling to warn when callbacks are missing.

**Common Pitfalls:** `use GenServer` is not the same as understanding `GenServer`. It injects conveniences and sets up callback expectations, but the process lifecycle and mailbox semantics still matter.

### Basic I/O Syntax Preview — inspection, printing, and debugging forms

I/O and debugging functions are used constantly while learning syntax.

| Task                 | Erlang                       | Elixir                                 | Meaning                     |
| -------------------- | ---------------------------- | -------------------------------------- | --------------------------- |
| Print formatted text | `io:format("~p~n", [Value])` | `IO.puts(value)` / `IO.inspect(value)` | Output to console           |
| Inspect term         | `io:format("~p~n", [Term])`  | `IO.inspect(term)`                     | Show runtime representation |
| Debug pipeline       | N/A direct equivalent        | `dbg(value)` or `IO.inspect`           | Inspect intermediate data   |
| Read file            | `file:read_file(Path)`       | `File.read(path)`                      | Tagged result               |
| Write file           | `file:write_file(Path, Bin)` | `File.write(path, binary)`             | Tagged result               |

Elixir:

```elixir
users
|> Enum.map(&normalize/1)
|> IO.inspect(label: "normalized users")
|> Enum.filter(&active?/1)
```

Erlang:

```erlang
io:format("Users: ~p~n", [Users]).
```

**Design meaning:** Inspection displays BEAM terms, which helps distinguish binaries, charlists, atoms, tuples, maps, PIDs, and refs. In Elixir, `IO.inspect/2` returns the inspected value, making it pipeline-friendly.

**Common Pitfalls:** Do not rely on printed representation to infer exact type without checking. Charlists, strings, binaries, and lists can display in surprising ways depending on printable contents and inspection options.

### Basic Compilation and Shell Forms — reading source versus interactive evaluation

Erlang and Elixir both have interactive shells, but their syntax and compilation workflows differ.

| Task                    | Erlang                          | Elixir                         |
| ----------------------- | ------------------------------- | ------------------------------ |
| Interactive shell       | `erl`                           | `iex`                          |
| Compile module in shell | `c(module).`                    | `c("file.ex")` or Mix workflow |
| Run expression          | Erlang expression ending in `.` | Elixir expression              |
| Project tool            | `rebar3` commonly               | `mix`                          |
| File extension          | `.erl`, `.hrl`                  | `.ex`, `.exs`                  |
| Script file             | `escript` or shell usage        | `.exs` scripts                 |

Erlang shell expressions end with `.`:

```erlang
1 + 2.
```

Elixir shell expressions do not require that terminator:

```elixir
1 + 2
```

**Design meaning:** The shell is not the language. Some shell conveniences differ from source files. Still, shells are important for exploring runtime values, process behavior, module calls, and library APIs.

**Common Pitfalls:** Do not overgeneralize shell display conventions to source semantics. For example, printed lists may appear as strings or charlists depending on content and shell formatting.

### Basic File and Script Structure — source file expectations and project conventions

Source files differ by language and toolchain.

| Aspect              | Erlang                        | Elixir                                                     |
| ------------------- | ----------------------------- | ---------------------------------------------------------- |
| Module file         | Usually `module_name.erl`     | Usually `snake_case_file.ex` containing `CamelCase.Module` |
| Header/include file | `.hrl`                        | Rare equivalent; macros/modules used differently           |
| Script file         | `escript` or evaluated forms  | `.exs`                                                     |
| Test files          | EUnit/Common Test conventions | `*_test.exs` with ExUnit                                   |
| Build metadata      | `.app.src`, `rebar.config`    | `mix.exs`                                                  |
| Dependency tool     | `rebar3`                      | Mix/Hex                                                    |

Elixir project structure commonly contains:

```text
lib/
test/
mix.exs
config/
```

Erlang project structure varies more by tool and age, but `src/`, `include/`, `test/`, and application resource files are common.

**Design meaning:** File structure is toolchain convention, not core language semantics. However, professional code reading requires recognizing these conventions because module loading, documentation, tests, and releases depend on them.

**Common Pitfalls:** Do not assume Elixir file names and module names map exactly like Java packages/classes. The convention is strong, but the module identity is a BEAM module name, not a file-system class object.

### Macro Syntax Preview in Elixir — `quote`, `unquote`, and compile-time code construction

Elixir macros are a major topic for Part 4 and Part 6, but their syntax appears early in framework code.

Basic macro definition:

```elixir
defmodule MyMacros do
  defmacro unless_nil(value, do: block) do
    quote do
      if !is_nil(unquote(value)) do
        unquote(block)
      end
    end
  end
end
```

| Syntax             | Meaning                                      | Stage                                            |
| ------------------ | -------------------------------------------- | ------------------------------------------------ |
| `defmacro`         | Define macro                                 | Compile time                                     |
| `quote do ... end` | Represent code as data                       | Compile time                                     |
| `unquote(expr)`    | Insert generated value/code into quoted code | Compile time                                     |
| `use Module`       | Invoke `Module.__using__/1` macro            | Compile time                                     |
| custom sigils      | Often macro-backed syntax                    | Compile time or runtime depending implementation |

**Design meaning:** Elixir macros operate on code representation before runtime. They enable DSLs but also introduce a compile-time layer that ordinary function calls do not have.

**Common Pitfalls:** Do not reach for macros to avoid passing functions, modules, or data. Most abstraction should be ordinary functions. Macros are for changing syntax, generating code, or building DSLs where runtime functions are insufficient.

### Basic Operator Precedence and Parentheses — readable calls, ambiguity, and macro-heavy code

Elixir often permits optional parentheses; Erlang has its own precedence rules. In professional code, explicitness matters.

Elixir examples:

```elixir
String.trim " ada "
```

This is valid in some contexts, but the more readable form is:

```elixir
String.trim(" ada ")
```

In pipelines:

```elixir
data
|> normalize()
|> validate()
```

Parentheses clarify function calls and macro invocations, especially when arguments are complex.

Erlang tends to require clearer punctuation:

```erlang
Result = lists:map(Fun, Items).
```

| Issue                     | Erlang                                            | Elixir                      | Professional rule                                    |
| ------------------------- | ------------------------------------------------- | --------------------------- | ---------------------------------------------------- |
| Function call parentheses | Often syntactically required by form              | Sometimes optional          | Use parentheses when ambiguity is possible           |
| Macro calls               | Parse-transform/preprocessor less visually common | DSLs often omit parentheses | Know whether a form is macro or function             |
| Operators                 | Fixed precedence                                  | Fixed precedence            | Do not rely on reader remembering obscure precedence |
| Pipeline                  | Not applicable                                    | Common                      | Keep each step visually simple                       |

**Common Pitfalls:** Parentheses-free Elixir can become hard to read in nested macro and DSL contexts. Code that looks elegant in a small example may be costly in a large module.

### Minimal Syntax Recognition Table — high-frequency forms across Erlang and Elixir

This table is a compact recognition aid for the syntax covered so far.

| Meaning            | Erlang                    | Elixir                                   | Notes                           |     |                       |
| ------------------ | ------------------------- | ---------------------------------------- | ------------------------------- | --- | --------------------- |
| Atom               | `ok`                      | `:ok`                                    | Booleans are atoms too          |     |                       |
| Tuple              | `{ok, X}`                 | `{:ok, x}`                               | Common for tagged results       |     |                       |
| List               | `[H                       | T]`                                      | `[h                             | t]` | Linked list head/tail |
| Map                | `#{id => Id}`             | `%{id: id}`                              | Key-value structure             |     |                       |
| Binary             | `<<A, B>>`                | `<<a, b>>`                               | Byte/bit sequence               |     |                       |
| Match              | `Pattern = Value`         | `pattern = value`                        | Binding/assertion/destructuring |     |                       |
| Exact equality     | `=:=`                     | `===`                                    | Distinguishes `1` and `1.0`     |     |                       |
| Function clause    | `f(X) -> ...`             | `def f(x) do ... end`                    | Pattern-dispatched              |     |                       |
| Guard              | `when is_integer(X)`      | `when is_integer(x)`                     | Restricted condition            |     |                       |
| Case               | `case X of ... end`       | `case x do ... end`                      | Pattern branch                  |     |                       |
| Receive            | `receive ... end`         | `receive do ... end`                     | Mailbox pattern branch          |     |                       |
| Send               | `Pid ! Msg`               | `send(pid, msg)`                         | Async message send              |     |                       |
| Anonymous function | `fun(X) -> ... end`       | `fn x -> ... end`                        | Function value                  |     |                       |
| Anonymous call     | `F(X)`                    | `f.(x)`                                  | Elixir dot required             |     |                       |
| Remote call        | `lists:reverse(X)`        | `Enum.reverse(x)` / `:lists.reverse(x)`  | Module call                     |     |                       |
| Public function    | `-export([f/1])`          | `def f(x)`                               | Erlang export separate          |     |                       |
| Private function   | not exported              | `defp f(x)`                              | Internal helper                 |     |                       |
| Spec               | `-spec f(T) -> U.`        | `@spec f(t) :: u`                        | Analysis/documentation          |     |                       |
| Behaviour          | `-behaviour(gen_server).` | `@behaviour GenServer` / `use GenServer` | Callback contract               |     |                       |
| Raise/error        | `erlang:error(Reason)`    | `raise "message"`                        | Exception-like failure          |     |                       |
| Exit               | `exit(Reason)`            | `exit(reason)`                           | Process-level failure           |     |                       |
| Try                | `try ... catch ... end`   | `try/rescue/catch/after`                 | Local failure handling          |     |                       |
### Erlang Function References and MFA — module, function, arity as a runtime address

Erlang code often refers to functions through `MFA`: **module, function, arity**. This is both a notation and a runtime habit.

```erlang
{Module, Function, Args} = {lists, reverse, [[1, 2, 3]]},
apply(Module, Function, Args).
```

The common notation `module:function/arity` identifies a function shape:

```erlang
lists:reverse/1
gen_server:call/2
file:read_file/1
```

Elixir also uses function capture notation:

```elixir
&Enum.reverse/1
&String.trim/1
&MyApp.Worker.run/2
```

Calling Erlang functions from Elixir uses atom module names:

```elixir
:lists.reverse([1, 2, 3])
:file.read_file('config.json')
:erlang.term_to_binary({:ok, 1})
```

| Concept                 | Erlang                  | Elixir                                              | Meaning                               |
| ----------------------- | ----------------------- | --------------------------------------------------- | ------------------------------------- |
| Function identity       | `Module:Function/Arity` | `Module.function/arity` or `:module.function/arity` | Function address by module/name/arity |
| Dynamic apply           | `apply(M, F, Args)`     | `apply(module, function, args)`                     | Runtime function invocation           |
| Capture local function  | `fun local/1`           | `&local/1`                                          | Function value                        |
| Capture remote function | `fun lists:reverse/1`   | `&Enum.reverse/1` or `&:lists.reverse/1`            | Remote function value                 |
| Spawn by MFA            | `spawn(M, F, Args)`     | `spawn(module, function, args)`                     | Start process running function        |

**Design meaning:** `MFA` reflects BEAM’s module/function/arity execution model. It is also central to stack traces, error messages, callback definitions, supervision specs, and dynamic dispatch patterns.

**Common Pitfalls:** Dynamic `apply/3` is powerful but weakens static readability and tooling. Prefer direct calls unless the code genuinely needs dynamic dispatch, plugin behavior, or callback invocation.

### Elixir Capture Syntax — `&`, positional arguments, named captures, and readability limits

Elixir’s capture operator `&` has two main uses: capturing existing functions and creating short anonymous functions.

Capture existing function:

```elixir
trim = &String.trim/1
trim.("  ada  ")
```

Capture anonymous expression:

```elixir
double = &(&1 * 2)
double.(10)
```

Multiple positional arguments:

```elixir
add = &(&1 + &2)
add.(1, 2)
```

Capture Erlang function:

```elixir
reverse = &:lists.reverse/1
reverse.([1, 2, 3])
```

| Capture form              | Meaning                  | Good use                   | Bad use                                  |
| ------------------------- | ------------------------ | -------------------------- | ---------------------------------------- |
| `&Module.function/arity`  | Existing named function  | Passing callbacks          | None if readable                         |
| `&local/arity`            | Existing local function  | Local callback             | Ambiguous if local function is far away  |
| `&(&1 + 1)`               | Short anonymous function | Tiny transformation        | Multi-step business logic                |
| `&{&1, &2}`               | Build value from args    | Compact tuple construction | Complex nested structures                |
| `&:erlang.function/arity` | Erlang function capture  | Interop callback           | Hiding unfamiliar Erlang module behavior |

Readable:

```elixir
Enum.map(users, &normalize_user/1)
```

Less readable:

```elixir
Enum.map(users, &Map.put(&1, :name, String.trim(&1.name)))
```

Clearer:

```elixir
Enum.map(users, fn user ->
  Map.put(user, :name, String.trim(user.name))
end)
```

**Language-design note:** Capture syntax improves concise higher-order code. It becomes harmful when it hides parameter meaning or repeats positional placeholders in nontrivial expressions.

**Common Pitfalls:** `&String.trim/1` captures a function; `&String.trim(&1)` builds an anonymous function that calls `String.trim/1`. They are often equivalent in effect but not identical in syntax or intent.

### Erlang Anonymous Function Clauses — `fun` with multiple branches and pattern selection

Erlang anonymous functions can have multiple pattern-matching clauses.

```erlang
Handler =
    fun
        ({ok, Value}) ->
            {ok, Value};
        ({error, Reason}) ->
            {error, Reason}
    end.
```

Elixir equivalent:

```elixir
handler =
  fn
    {:ok, value} ->
      {:ok, value}

    {:error, reason} ->
      {:error, reason}
  end
```

| Feature                    | Erlang                                 | Elixir                               | Meaning                               |
| -------------------------- | -------------------------------------- | ------------------------------------ | ------------------------------------- |
| Single anonymous clause    | `fun(X) -> ... end`                    | `fn x -> ... end`                    | One input shape                       |
| Multiple anonymous clauses | `fun (P1) -> ...; (P2) -> ... end`     | `fn p1 -> ...; p2 -> ... end`        | Pattern-dispatched anonymous function |
| Guarded anonymous clause   | `fun(X) when is_integer(X) -> ... end` | `fn x when is_integer(x) -> ... end` | Refined callback                      |
| Failure                    | `function_clause`                      | `FunctionClauseError`                | No anonymous clause matched           |

Example in collection processing:

```elixir
Enum.map(results, fn
  {:ok, value} -> value
  {:error, _reason} -> nil
end)
```

**Design meaning:** Anonymous functions are not second-class callbacks with weak semantics. They have the same pattern-matching style as named functions, making them useful for local protocol handling.

**Common Pitfalls:** Multi-clause anonymous functions can become hard to read when they encode a whole domain decision table. If the logic has a name, move it into a named function.

### Function Clause Failure — no matching clause, guard failure, and diagnostic reading

When no function clause matches, the runtime raises a function-clause failure.

Elixir:

```elixir
defmodule Mathy do
  def half(n) when is_integer(n) do
    div(n, 2)
  end
end

Mathy.half("10")
```

This fails because the pattern and guard combination does not match.

Erlang equivalent:

```erlang
half(N) when is_integer(N) ->
    N div 2.
```

Calling `half("10")` fails because the guard rejects the argument.

| Cause                | Surface symptom                    | Correct reading                             |
| -------------------- | ---------------------------------- | ------------------------------------------- |
| Wrong arity          | undefined function or bad call     | Function with that name/arity not available |
| Wrong shape          | function clause failure            | No pattern matched                          |
| Guard rejected       | function clause failure            | Pattern may have matched, but guard failed  |
| Clause order problem | unexpected earlier clause selected | Broad clause came before specific clause    |
| Visibility problem   | undefined function from outside    | Function exists but is private/not exported |

**Failure-first explanation:** The tempting wrong mental model is that a function clause error means the function does not exist. The surprising behavior is that the function exists, but no clause accepted the given values. The correct explanation is that Erlang / Elixir functions are ordered pattern-and-guard decision lists. The professional rule is: when debugging a function clause error, check arity first, then input shape, then guards, then clause order. The boundary changes when the failure occurs inside generated code or a macro; then expansion and stack trace interpretation matter.

**Common Pitfalls:** Catch-all clauses can prevent useful function clause errors. A catch-all that returns `nil` or `:error` may turn a clear bug into a later, less obvious failure.

### Pattern Matching in Function Heads versus Inside Bodies — API contract placement

A pattern can appear in a function head or inside the function body. The location changes the readability and failure boundary.

Pattern in the function head:

```elixir
def display_name(%{name: name}) do
  name
end
```

Pattern inside the body:

```elixir
def display_name(user) do
  %{name: name} = user
  name
end
```

Erlang equivalents:

```erlang
display_name(#{name := Name}) ->
    Name.
```

or:

```erlang
display_name(User) ->
    #{name := Name} = User,
    Name.
```

| Placement      | Meaning                               | Best use                               | Pitfall                                          |
| -------------- | ------------------------------------- | -------------------------------------- | ------------------------------------------------ |
| Function head  | Input contract is part of dispatch    | Public shape variants, clear clauses   | Too much destructuring can make heads unreadable |
| Body match     | Assert internal invariant after setup | Local invariant or intermediate result | Failure location may be less obvious             |
| `case` branch  | Handle multiple possible shapes       | Expected variants                      | Missing branch raises                            |
| `with` pattern | Linear success chain                  | Tagged success flow                    | Failure normalization may become unclear         |

**Design meaning:** Function-head patterns expose the accepted shape as part of the function’s interface. Body patterns expose local assumptions. Neither is inherently superior; the question is where the contract should be visible.

**Common Pitfalls:** Overloading a public function with many deeply nested head patterns can make the API brittle. Prefer shallow public heads plus internal normalization when external data is messy.

### Pinning in Elixir Patterns — comparing against an existing binding

Elixir rebinding makes the pin operator `^` necessary when a pattern should match an existing variable’s value.

```elixir
expected_id = 10

case {:user, 10, "Ada"} do
  {:user, ^expected_id, name} ->
    {:ok, name}

  _ ->
    {:error, :wrong_user}
end
```

Without `^`, this would rebind `expected_id` inside the pattern:

```elixir
expected_id = 10

case {:user, 11, "Ada"} do
  {:user, expected_id, name} ->
    {:ok, {expected_id, name}}
end
```

This matches and binds `expected_id` to `11` in that pattern context.

Erlang does not need an equivalent pin operator in the same way because an already-bound variable in a pattern matches against its current value:

```erlang
ExpectedId = 10,
case {user, 10, <<"Ada">>} of
    {user, ExpectedId, Name} ->
        {ok, Name};
    _ ->
        {error, wrong_user}
end.
```

| Situation                    | Elixir behavior                        | Erlang behavior        |
| ---------------------------- | -------------------------------------- | ---------------------- |
| New variable in pattern      | Binds                                  | Binds                  |
| Existing variable in pattern | Rebinds unless pinned in many contexts | Matches existing value |
| Compare with prior binding   | Use `^name`                            | Use `Name`             |
| Ignore value                 | `_`                                    | `_`                    |

**Language-design note:** Pinning is the syntactic cost of Elixir’s ergonomic rebinding. It makes comparison against prior bindings explicit.

**Common Pitfalls:** In tests and `receive` blocks, forgetting `^` can cause false positives. This is especially dangerous when matching correlation IDs, monitor references, expected PIDs, or expected domain IDs.

### Match Contexts — where patterns occur and what they mean

Patterns are not limited to `=`. They appear across the language.

| Context                   | Erlang example       | Elixir example        | Meaning                             |
| ------------------------- | -------------------- | --------------------- | ----------------------------------- |
| Match expression          | `{ok, X} = Result`   | `{:ok, x} = result`   | Assert/destructure                  |
| Function head             | `f({ok, X}) ->`      | `def f({:ok, x}) do`  | Dispatch by shape                   |
| Case clause               | `{error, R} ->`      | `{:error, r} ->`      | Branch by shape                     |
| Receive clause            | `{reply, Ref, X} ->` | `{:reply, ref, x} ->` | Match message                       |
| Anonymous function clause | `fun({ok, X}) ->`    | `fn {:ok, x} ->`      | Callback dispatch                   |
| Comprehension generator   | `{K, V} <- Pairs`    | `{k, v} <- pairs`     | Filter/destructure generated values |
| `with` clause             | Not direct syntax    | `{:ok, x} <- expr`    | Continue on match                   |
| Rescue/catch pattern      | `Class:Reason ->`    | `:exit, reason ->`    | Failure-shape handling              |

In Elixir comprehensions, pattern mismatch in a generator filters out non-matching values:

```elixir
pairs = [{:ok, 1}, {:error, :bad}, {:ok, 2}]

for {:ok, value} <- pairs do
  value
end
```

Result:

```elixir
[1, 2]
```

This is not a crash; it is generator filtering.

**Design meaning:** Pattern matching has context-sensitive consequences. A failed match in `=` raises. A failed function head moves to the next clause. A failed comprehension generator skips. A failed `with` clause diverts control. A failed `receive` pattern leaves the message in the mailbox and keeps searching.

**Common Pitfalls:** Do not assume “pattern mismatch” always has the same control-flow effect. Always ask: *which syntactic context is this pattern inside?*

### Guards in Function Heads and Case Clauses — refinement without arbitrary computation

Guards refine pattern matches. They are deliberately limited.

Elixir:

```elixir
def classify(n) when is_integer(n) and n > 0 do
  :positive_integer
end
```

Erlang:

```erlang
classify(N) when is_integer(N), N > 0 ->
    positive_integer.
```

A failed guard is not the same as a raised exception. It means the clause does not match, so the runtime tries the next clause.

```elixir
def classify(n) when is_integer(n), do: {:integer, n}
def classify(n) when is_binary(n), do: {:binary, n}
def classify(_), do: :unknown
```

| Guard role             | Example                   | Meaning                                  |
| ---------------------- | ------------------------- | ---------------------------------------- |
| Type refinement        | `is_integer(x)`           | Accept only runtime integers             |
| Range refinement       | `x > 0`                   | Accept only values satisfying comparison |
| Binary size refinement | `byte_size(bin) > 0`      | Accept non-empty binaries                |
| List check             | `is_list(xs)`             | Accept lists                             |
| Compound check         | `is_integer(x) and x > 0` | Combine restrictions                     |

**Design meaning:** Guards keep dispatch predictable and side-effect-free. They are not general validation functions.

**Common Pitfalls:** Complex domain validation does not belong entirely in guards. Guards should identify simple clause eligibility. Deeper validation belongs in named functions, validators, or explicit boundary code.

### Elixir `defguard` and `defguardp` — reusable guard syntax

Elixir allows reusable guard macros.

```elixir
defmodule Guards do
  defguard is_non_empty_binary(value)
           when is_binary(value) and byte_size(value) > 0
end
```

Use:

```elixir
defmodule Parser do
  import Guards

  def parse(value) when is_non_empty_binary(value) do
    {:ok, value}
  end
end
```

Private guard:

```elixir
defguardp is_positive_count(value)
          when is_integer(value) and value > 0
```

| Feature            | Meaning                      | Use                                   |
| ------------------ | ---------------------------- | ------------------------------------- |
| `defguard`         | Public reusable guard macro  | Shared validation predicate in guards |
| `defguardp`        | Private reusable guard macro | Local guard readability               |
| Guard restriction  | Body must be guard-safe      | Cannot call arbitrary functions       |
| Import requirement | Guard macro must be in scope | Use carefully                         |

**Language-design note:** `defguard` is macro-based. It does not make arbitrary functions guard-safe. It packages guard-safe expressions into reusable syntax.

**Common Pitfalls:** Do not define a normal function and expect to call it from a guard. Use `defguard` only when the expression can be expressed using allowed guard operations.

### Elixir `case`, `cond`, `if`, and `with` — choosing the correct branching form

Elixir has several branching forms. Their difference is semantic, not stylistic only.

| Form             | Primary question answered                 | Best when                                 | Avoid when                               |
| ---------------- | ----------------------------------------- | ----------------------------------------- | ---------------------------------------- |
| `case`           | What shape/value is this?                 | Tagged tuples, variants, pattern matching | Only simple boolean condition            |
| `cond`           | Which condition is first true?            | Ordered predicates or ranges              | Matching structured data                 |
| `if`             | Is this one condition truthy?             | Simple two-way branch                     | Multi-variant branching                  |
| `unless`         | Is this one condition falsy?              | Very simple negative condition            | Complex conditions                       |
| `with`           | Can this linear chain of matches succeed? | Chained tagged outcomes                   | Each failure needs different local logic |
| Function clauses | Which input shape defines this function?  | Whole function varies by input shape      | Branching is only a local detail         |

Example decision:

```elixir
case File.read(path) do
  {:ok, binary} -> decode(binary)
  {:error, reason} -> {:error, reason}
end
```

Better than:

```elixir
if match?({:ok, _}, File.read(path)) do
  ...
end
```

For range-like predicates:

```elixir
cond do
  score >= 90 -> :a
  score >= 80 -> :b
  score >= 70 -> :c
  true -> :f
end
```

For linear success flow:

```elixir
with {:ok, binary} <- File.read(path),
     {:ok, data} <- decode(binary),
     {:ok, user} <- validate(data) do
  {:ok, user}
end
```

**Common Pitfalls:** Using `with` as a replacement for all nested `case` expressions can make error logic opaque. Using `cond` for shape matching throws away the main strength of pattern matching.

### Erlang `case`, `if`, and Function Clauses — choosing the correct branching form

Erlang has fewer surface branching constructs but the same basic decision exists.

| Form             | Primary use                    | Example                                               |
| ---------------- | ------------------------------ | ----------------------------------------------------- |
| Function clauses | Define behavior by input shape | `parse({json, Bin}) -> ...; parse({xml, Bin}) -> ...` |
| `case`           | Branch on expression result    | `case file:read_file(Path) of ... end`                |
| `if`             | Branch on guard conditions     | `if N > 0 -> ...; true -> ... end`                    |
| `receive`        | Branch on mailbox message      | `receive {reply, Ref, X} -> ... end`                  |

Erlang:

```erlang
handle_result({ok, Value}) ->
    {ok, Value};
handle_result({error, enoent}) ->
    {error, not_found};
handle_result({error, Reason}) ->
    {error, Reason}.
```

This is clearer than:

```erlang
handle_result(Result) ->
    case Result of
        {ok, Value} ->
            {ok, Value};
        {error, enoent} ->
            {error, not_found};
        {error, Reason} ->
            {error, Reason}
    end.
```

when the entire function is just result-shape handling.

**Common Pitfalls:** Erlang `if` is often overused by programmers coming from imperative languages. In Erlang, `case` and function clauses are frequently clearer because they use pattern matching directly.

### Module-Level Code and Compile-Time Behavior — what runs when

Erlang and Elixir modules are compiled. Not all top-level-looking syntax is runtime code.

Elixir:

```elixir
defmodule Example do
  @value expensive_compile_time_expression()

  def value do
    @value
  end
end
```

Module attributes are evaluated during compilation in their context. Macro calls also happen during compilation.

Erlang:

```erlang
-module(example).
-define(VALUE, 10).

value() ->
    ?VALUE.
```

Preprocessor macros expand before compilation.

| Syntax kind                  | Erlang stage                    | Elixir stage                    | Meaning                                  |
| ---------------------------- | ------------------------------- | ------------------------------- | ---------------------------------------- |
| Module declaration           | Compile time                    | Compile time                    | Defines module                           |
| Export declaration           | Compile time                    | Function definition metadata    | Public API                               |
| Specs/types                  | Compile-time metadata           | Compile-time metadata           | Docs/analysis                            |
| Macros                       | Preprocessor / parse transforms | Compile-time AST transformation | Code generation                          |
| Function body                | Runtime when called             | Runtime when called             | Executable behavior                      |
| Module attribute as constant | Compile time                    | Compile time                    | Inlined or stored metadata depending use |

**Design meaning:** Elixir makes compile-time programming more accessible than Erlang. This is powerful but creates a second semantic layer: code that runs while compiling and code that runs when the application runs.

**Common Pitfalls:** Do not put runtime-dependent values into module attributes expecting them to refresh dynamically. If a value depends on runtime configuration, environment, database state, or process state, a module attribute is usually the wrong place.

### Elixir `use` Expansion — behaviour adoption, imports, aliases, and generated code

`use` is compact but semantically large.

```elixir
defmodule MyServer do
  use GenServer
end
```

This is equivalent in broad terms to invoking a macro:

```elixir
require GenServer
GenServer.__using__(...)
```

The exact generated code depends on the module being used.

| `use` target             | Typical effect                                                      | Why it exists               |
| ------------------------ | ------------------------------------------------------------------- | --------------------------- |
| `use GenServer`          | Sets behaviour, imports conveniences, may define defaults           | OTP callback module setup   |
| `use Supervisor`         | Sets up supervisor behaviour helpers                                | OTP supervisor module setup |
| `use ExUnit.Case`        | Imports test macros and setup conventions                           | Testing DSL                 |
| `use Phoenix.Controller` | Imports controller functions, plugs, view helpers depending version | Framework DSL               |
| `use Ecto.Schema`        | Imports schema macros                                               | Data/schema DSL             |

**Design meaning:** `use` is a DSL-adoption mechanism. It makes framework code concise, but it can hide imports, aliases, callbacks, generated functions, and module attributes.

**Professional rule:** Every `use` line should be understood as “this module is entering a compile-time contract with another module.” In code review, `use` deserves more attention than an ordinary alias.

**Common Pitfalls:** When behavior is mysterious, inspect the documentation for `__using__/1`, generated callbacks, imported macros, and required module attributes. Do not assume `use` merely shortens names.

### Erlang Behaviours and Callback Syntax — `gen_server` as syntactic contract

Erlang behaviours are callback contracts. A `gen_server` module declares:

```erlang
-behaviour(gen_server).
```

It then exports required callbacks:

```erlang
-export([init/1, handle_call/3, handle_cast/2, handle_info/2]).
```

Skeleton:

```erlang
-module(counter_server).
-behaviour(gen_server).

-export([start_link/0, increment/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2]).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

increment() ->
    gen_server:call(?MODULE, increment).

init([]) ->
    {ok, 0}.

handle_call(increment, _From, State) ->
    NewState = State + 1,
    {reply, NewState, NewState}.

handle_cast(_Msg, State) ->
    {noreply, State}.

handle_info(_Msg, State) ->
    {noreply, State}.
```

Elixir equivalent style:

```elixir
defmodule CounterServer do
  use GenServer

  def start_link(_) do
    GenServer.start_link(__MODULE__, 0, name: __MODULE__)
  end

  def increment do
    GenServer.call(__MODULE__, :increment)
  end

  @impl true
  def init(state) do
    {:ok, state}
  end

  @impl true
  def handle_call(:increment, _from, state) do
    new_state = state + 1
    {:reply, new_state, new_state}
  end
end
```

This belongs more deeply to Parts 4–7, but the syntax is common enough to recognize now.

| Callback shape           | Meaning                           |
| ------------------------ | --------------------------------- |
| `init/1`                 | Initialize server state           |
| `handle_call/3`          | Handle synchronous request        |
| `handle_cast/2`          | Handle asynchronous request       |
| `handle_info/2`          | Handle ordinary mailbox messages  |
| `{:reply, reply, state}` | Reply and continue with new state |
| `{:noreply, state}`      | Continue without replying         |
| `{:stop, reason, state}` | Stop server                       |

**Common Pitfalls:** A `GenServer` is still a process with a mailbox. Syntax like `GenServer.call/2` does not eliminate timeouts, slow handlers, mailbox buildup, or bad state design.

### Process Dictionary Syntax — implicit process-local storage and why it is suspicious

Both Erlang and Elixir expose the process dictionary, a process-local key-value store.

Erlang:

```erlang
put(user_id, 10),
get(user_id).
```

Elixir:

```elixir
Process.put(:user_id, 10)
Process.get(:user_id)
```

| Feature                            | Meaning                                     | Caution                        |
| ---------------------------------- | ------------------------------------------- | ------------------------------ |
| Process-local                      | Stored in current BEAM process              | Not shared globally            |
| Dynamically keyed                  | Any term can be key                         | Hard to track                  |
| Implicit dependency                | Functions can read without argument         | Reduces clarity                |
| Sometimes used by frameworks/tools | Logging metadata, tracing, special contexts | Use only with clear convention |

**Design meaning:** The process dictionary is an escape hatch from explicit dataflow. It can be useful for framework metadata, logging, tracing, or context propagation, but it conflicts with ordinary functional clarity.

**Common Pitfalls:** Do not use the process dictionary as a substitute for passing arguments or maintaining explicit process state. Hidden dependencies make testing and reasoning harder.

### Special Forms in Elixir — forms that are not ordinary function calls

Elixir has special forms that are part of the language core or compiler, not ordinary functions.

Examples include:

```elixir
case value do
  pattern -> result
end

fn x -> x + 1 end

quote do
  x + 1
end

try do
  dangerous()
rescue
  _ -> :error
end
```

| Special form                        | Role                                  |
| ----------------------------------- | ------------------------------------- |
| `case`                              | Pattern branching                     |
| `cond`                              | Ordered condition branching           |
| `if` / `unless`                     | Conditional branching                 |
| `fn`                                | Anonymous function                    |
| `receive`                           | Mailbox receive                       |
| `try`                               | Exception/throw/exit handling         |
| `quote` / `unquote`                 | Macro/code representation             |
| `alias`, `import`, `require`, `use` | Compile/module environment directives |
| `for`                               | Comprehension                         |
| `with`                              | Pattern chain                         |

**Design meaning:** Special forms define core syntax and compiler behavior. They cannot be understood only as functions because they control evaluation, binding, scope, compilation, or pattern contexts.

**Common Pitfalls:** Treating `use`, `quote`, `case`, or `receive` like ordinary functions leads to incorrect assumptions about evaluation order and binding.

### Erlang Special Forms and Built-In Functions — language core versus library call

Erlang also has language constructs and built-in functions.

| Erlang form                   | Kind             | Meaning                                  |
| ----------------------------- | ---------------- | ---------------------------------------- |
| `case ... of ... end`         | Special form     | Pattern branching                        |
| `receive ... end`             | Special form     | Mailbox receive                          |
| `fun ... end`                 | Special form     | Anonymous function                       |
| `try ... catch ... end`       | Special form     | Failure handling                         |
| `begin ... end`               | Special form     | Group expressions                        |
| `catch Expr`                  | Older catch form | Catch exits/throws/errors in older style |
| `self()`                      | BIF              | Current process PID                      |
| `spawn(...)`                  | BIF              | Create process                           |
| `is_integer(...)`             | BIF/guard        | Type check                               |
| `element(N, Tuple)`           | BIF              | Tuple element access                     |
| `setelement(N, Tuple, Value)` | BIF              | Return modified tuple copy               |

**Design meaning:** Some operations are language forms because they affect control flow or binding. Others are BIFs, implemented by the runtime and callable like functions.

**Common Pitfalls:** BIF availability in guards is restricted. A function being built-in does not automatically mean every use is valid in every syntactic context.

### Attribute and Annotation-Like Syntax — do not import Java annotation assumptions

Elixir module attributes may look like annotations:

```elixir
@moduledoc false
@doc "Parses a user."
@spec parse(binary()) :: {:ok, map()} | {:error, term()}
@impl true
```

Erlang attributes may look like declarations:

```erlang
-module(parser).
-export([parse/1]).
-spec parse(binary()) -> {ok, map()} | {error, term()}.
```

They are not Java/C# annotations. They are compile-time module metadata, declarations, or macro inputs depending on the specific attribute.

| Attribute    | Language | Meaning                        |
| ------------ | -------- | ------------------------------ |
| `@moduledoc` | Elixir   | Module documentation           |
| `@doc`       | Elixir   | Function documentation         |
| `@spec`      | Elixir   | Function spec                  |
| `@impl`      | Elixir   | Callback implementation marker |
| `@behaviour` | Elixir   | Behaviour declaration          |
| `-module`    | Erlang   | Module name                    |
| `-export`    | Erlang   | Public function list           |
| `-spec`      | Erlang   | Function spec                  |
| `-behaviour` | Erlang   | Behaviour declaration          |
| `-record`    | Erlang   | Record declaration             |

**Common Pitfalls:** Do not assume attributes are runtime reflection metadata available in the same way as Java annotations. Their availability and meaning depend on compiler behavior, documentation tools, and macros.

### Elixir Struct Update and Map Update — syntactic similarity, semantic distinction

Elixir map update and struct update use related syntax.

Map update:

```elixir
user = %{id: 1, name: "Ada"}
updated = %{user | name: "Grace"}
```

Struct update:

```elixir
user = %User{id: 1, name: "Ada"}
updated = %User{user | name: "Grace"}
```

| Form                       | Meaning                         | Constraint                           |                                |
| -------------------------- | ------------------------------- | ------------------------------------ | ------------------------------ |
| `%{map                     | key: value}`                    | Update existing map key              | Key must already exist         |
| `%Struct{struct            | key: value}`                    | Update existing struct field         | Struct and field must be valid |
| `Map.put(map, key, value)` | Add or update                   | Key may be new                       |                                |
| `struct(existing, attrs)`  | Build/update struct dynamically | Field handling depends on API        |                                |
| `Map.merge(map, attrs)`    | Merge maps                      | Can introduce arbitrary keys in maps |                                |

**Design meaning:** Update syntax is assertive. It says the key or field should already be part of the shape. That is useful for catching mistakes.

**Common Pitfalls:** Use `%{map | key: value}` when missing keys should be an error. Use `Map.put/3` when adding a key is intended. Do not choose based only on brevity.

### Erlang Map Update Syntax — `:=` versus `=>`

Erlang map update has a crucial distinction.

```erlang
Map1 = #{name => <<"Ada">>},
Map2 = Map1#{name := <<"Grace">>},
Map3 = Map1#{email => <<"ada@example.com">>}.
```

| Operator | Meaning             | Failure behavior                   |
| -------- | ------------------- | ---------------------------------- |
| `:=`     | Update existing key | Fails if key does not exist        |
| `=>`     | Add or update key   | Succeeds whether key exists or not |

Pattern matching also uses `:=` for required keys:

```erlang
#{name := Name} = User.
```

**Design meaning:** Erlang separates “this key must already exist” from “add or replace this key.” This gives the programmer a small but useful shape assertion.

**Common Pitfalls:** Accidentally using `=>` when the key should already exist can hide misspelled or unexpected keys.

### Binary Pattern Segment Options — size, type, signedness, endian, and unit

Binary syntax can specify how segments are interpreted.

Elixir:

```elixir
<<version::8, length::16-big, payload::binary-size(length)>> = packet
```

Erlang:

```erlang
<<Version:8, Length:16/big, Payload:Length/binary>> = Packet.
```

| Segment concern   | Elixir example         | Erlang example   | Meaning                    |
| ----------------- | ---------------------- | ---------------- | -------------------------- |
| Size              | `x::8`                 | `X:8`            | Segment bit size           |
| Binary tail       | `rest::binary`         | `Rest/binary`    | Remaining binary           |
| Fixed binary size | `data::binary-size(n)` | `Data:N/binary`  | N-byte segment             |
| Integer endian    | `n::16-big`            | `N:16/big`       | Big-endian integer         |
| Signed integer    | `n::signed`            | `N/signed`       | Signed interpretation      |
| UTF-8             | `cp::utf8`             | `Cp/utf8`        | Codepoint segment          |
| Bitstring         | `bits::bitstring`      | `Bits/bitstring` | Non-byte-aligned remainder |

**Design meaning:** Bit syntax makes protocol structure executable. It combines parsing, validation, and binding in a compact form.

**Common Pitfalls:** Binary patterns fail if the data does not fit the specified shape. Use multiple clauses or `case` when malformed input is expected and should become `{:error, reason}` rather than a crash.

### Iodata Syntax Awareness — nested lists and binaries for efficient output

`iodata` is not a special literal syntax, but it is a common BEAM data convention that appears in I/O and web code.

Elixir:

```elixir
iodata = ["hello ", user.name, "\n"]
```

Erlang:

```erlang
IoData = [<<"hello ">>, Name, <<"\n">>].
```

Iodata is a nested structure of binaries and byte lists that can be written efficiently by many I/O APIs.

| Concept          | Meaning                                          |
| ---------------- | ------------------------------------------------ |
| `iodata()`       | Nested binaries/lists representing output data   |
| `iolist()`       | Similar but often char/list-oriented terminology |
| Flattening       | Converting to one binary when necessary          |
| Efficient output | Avoid repeated binary concatenation              |
| Common APIs      | sockets, files, HTTP responses, templates        |

**Design meaning:** BEAM libraries often accept structured output instead of requiring immediate concatenation. This fits immutable data and efficient I/O.

**Common Pitfalls:** Do not eagerly concatenate large binaries in loops when iodata is accepted. But also do not pass arbitrary nested terms; iodata has a specific shape.

### Character and Codepoint Literals — integer representation of characters

Character literal syntax differs.

Erlang:

```erlang
$A.
```

Elixir:

```elixir
?A
```

Both produce the integer codepoint for `A`.

| Character task          | Erlang    | Elixir           | Result           |
| ----------------------- | --------- | ---------------- | ---------------- |
| ASCII/codepoint literal | `$A`      | `?A`             | integer          |
| Newline codepoint       | `$\n`     | `?\n`            | integer          |
| Binary string           | `<<"A">>` | `"A"`            | binary           |
| Charlists               | `"A"`     | `'A'` or `~c"A"` | list of integers |

**Design meaning:** A “character” is usually an integer codepoint at the primitive level, while strings are binaries or lists depending on language convention. Unicode text processing requires more than assuming one byte equals one character.

**Common Pitfalls:** Do not use `byte_size/1` as character count for UTF-8 text. Use appropriate string functions when semantic text length matters.

### Elixir String Interpolation — binary construction and expression evaluation

Elixir supports interpolation in double-quoted strings:

```elixir
name = "Ada"
"Hello, #{name}"
```

Interpolation calls string conversion protocols as needed.

```elixir
count = 3
"count=#{count}"
```

Erlang does not have the same string interpolation syntax. It usually uses formatting functions or binary construction.

```erlang
io_lib:format("count=~p", [Count]).
```

| Feature            | Elixir                            | Meaning                                              |
| ------------------ | --------------------------------- | ---------------------------------------------------- |
| Interpolation      | `"Hello, #{expr}"`                | Evaluate expression and insert string representation |
| Binary string      | `"..."`                           | UTF-8 binary                                         |
| Raw string         | `~S"..."`                         | No interpolation or escapes                          |
| Format alternative | `:io_lib.format(...)` / libraries | More controlled formatting                           |

**Design meaning:** Interpolation is convenient, but formatting and serialization are distinct tasks. Interpolation is suitable for human-readable strings, not structured protocols.

**Common Pitfalls:** Do not build SQL, shell commands, or wire protocols by casual interpolation. Use parameterized APIs or explicit encoders.

### Erlang Formatting Syntax — `io:format` and control sequences

Erlang uses format control strings.

```erlang
io:format("User: ~p~n", [User]).
```

Common controls:

| Control | Meaning                                |
| ------- | -------------------------------------- |
| `~p`    | Print Erlang term                      |
| `~w`    | Write term in standard syntax          |
| `~s`    | String/list output                     |
| `~n`    | Newline                                |
| `~B`    | Integer in base 10                     |
| `~ts`   | Unicode string output in many contexts |

Example:

```erlang
io:format("id=~B name=~ts~n", [Id, Name]).
```

**Design meaning:** Formatting makes representation explicit. It is common in Erlang diagnostics and shell examples.

**Common Pitfalls:** Wrong format controls can produce confusing output or crashes. Be especially careful with binaries versus charlists and Unicode text.

### Elixir Inspect Protocol and Display — source-like representation versus user text

Elixir separates user-facing string conversion from inspection.

```elixir
IO.puts("hello")
IO.inspect({:ok, %{id: 1}})
```

| Function             | Purpose                           | Output style               |
| -------------------- | --------------------------------- | -------------------------- |
| `IO.puts/1`          | User-facing output                | String/chardata            |
| `IO.inspect/2`       | Developer inspection              | Elixir term representation |
| `inspect/2`          | Convert term to inspect string    | Protocol-based             |
| `Kernel.to_string/1` | Convert to string where supported | String.Chars protocol      |
| `dbg/2`              | Debug expression with context     | Development/debugging      |

**Design meaning:** Display is protocol-based in Elixir. A value may be inspectable but not convertible to a user-facing string.

**Common Pitfalls:** Do not assume every term can be passed to `IO.puts/1`. Use `IO.inspect/2` for arbitrary terms.

### Elixir Protocol Syntax Preview — polymorphism by data type

Protocols belong mainly to Part 3 and Part 4, but their syntax is common.

```elixir
defprotocol Size do
  def size(value)
end
```

Implementation:

```elixir
defimpl Size, for: BitString do
  def size(value), do: byte_size(value)
end

defimpl Size, for: List do
  def size(value), do: length(value)
end
```

Use:

```elixir
Size.size("abc")
Size.size([1, 2, 3])
```

| Protocol feature          | Meaning                                                                 |
| ------------------------- | ----------------------------------------------------------------------- |
| `defprotocol`             | Define polymorphic function contract                                    |
| `defimpl`                 | Implement protocol for a type                                           |
| `for:`                    | Target type/module                                                      |
| Dispatch                  | Runtime dispatch by first argument type                                 |
| Difference from behaviour | Protocol dispatches on data; behaviour defines module callback contract |

**Design meaning:** Elixir protocols solve a different problem from OTP behaviours. Protocols are data-polymorphism mechanisms. Behaviours are module callback contracts.

**Common Pitfalls:** Do not use protocols when a behaviour or plain function parameter is the better abstraction. Protocols are useful when behavior should vary by data type.

### Erlang Behaviour Syntax versus Elixir Protocol Syntax — two kinds of contracts

Erlang behaviours and Elixir protocols are easy to confuse if both are called “interfaces.” They are not the same.

| Contract type         | Erlang / Elixir syntax          | Dispatch model                     | Best use                       |
| --------------------- | ------------------------------- | ---------------------------------- | ------------------------------ |
| Behaviour             | `-behaviour(...)`, `@behaviour` | Module promises callback functions | OTP servers, adapters, plugins |
| Protocol              | `defprotocol`, `defimpl`        | Dispatch by data type              | Data-specific operations       |
| Function clauses      | Multiple clauses                | Ordered pattern matching           | Local shape-based behavior     |
| Higher-order function | Function argument               | Caller supplies behavior           | Local customization            |
| Macro DSL             | `use`, `defmacro`               | Compile-time code generation       | Syntax/framework construction  |

Example behaviour-like adapter:

```elixir
defmodule Storage do
  @callback put(binary(), binary()) :: :ok | {:error, term()}
end
```

Example protocol-like data polymorphism:

```elixir
defprotocol Renderable do
  def render(value)
end
```

**Design meaning:** Choosing the correct contract mechanism is a design decision, not a syntactic preference. Behaviours organize modules. Protocols organize data-type polymorphism. Function clauses organize local pattern variation.

**Common Pitfalls:** Creating protocols for every domain concept can overcomplicate code. Creating behaviours for simple local callbacks can also overcomplicate code.

### Importing Erlang Concepts into Elixir Source — atoms, tuples, and lowercase modules

When reading Elixir code, Erlang modules appear as atoms:

```elixir
:ets.new(:cache, [:set, :public])
:gen_tcp.listen(4040, [:binary, active: false])
:crypto.strong_rand_bytes(32)
```

| Elixir call                 | Erlang module     | Meaning                    |
| --------------------------- | ----------------- | -------------------------- |
| `:ets.new(...)`             | `ets`             | Erlang Term Storage        |
| `:gen_tcp.listen(...)`      | `gen_tcp`         | TCP API                    |
| `:crypto.hash(...)`         | `crypto`          | Crypto library             |
| `:timer.sleep(...)`         | `timer`           | Timer functions            |
| `:erlang.phash2(...)`       | `erlang`          | Runtime BIF module         |
| `:persistent_term.get(...)` | `persistent_term` | VM persistent term storage |

**Design meaning:** Elixir did not wrap every Erlang API. Direct Erlang calls are normal, especially for lower-level OTP, VM, networking, crypto, storage, and runtime functions.

**Common Pitfalls:** Elixir strings are binaries, while some Erlang APIs may expect charlists or iodata. Always check the expected type shape when calling Erlang modules from Elixir.

### Reading Stack Traces — module, function, arity, and generated code hints

Stack traces are syntax-adjacent because they expose the BEAM execution model.

Elixir stack trace entries often look like:

```text
(MyApp 0.1.0) lib/my_app/parser.ex:12: MyApp.Parser.parse/1
```

Erlang stack traces expose module, function, arity, and location:

```text
parser:parse/1
```

| Stack trace item         | Meaning                                                        |
| ------------------------ | -------------------------------------------------------------- |
| Module                   | BEAM module where call occurred                                |
| Function                 | Function name                                                  |
| Arity                    | Number of arguments                                            |
| File/line                | Source location if debug info exists                           |
| Anonymous function       | Generated function or closure                                  |
| Macro-generated location | May point to generated or caller code depending macro metadata |
| Process crash report     | Error occurred in a BEAM process, not necessarily whole VM     |

**Design meaning:** Stack traces reinforce that BEAM identifies code by module/function/arity. In macro-heavy Elixir, source locations may reflect expansion behavior.

**Common Pitfalls:** A process crash stack trace is not necessarily an application crash. Under supervision, a process may be restarted. The correct question is which process failed, why, whether it was expected, and what supervision policy handled it.

### Pattern-Driven API Shape — common return forms and how to read them

Many Erlang / Elixir APIs use conventional return shapes.

| Shape                                  | Meaning                                    | Example use                             |
| -------------------------------------- | ------------------------------------------ | --------------------------------------- |
| `{:ok, value}` / `{ok, Value}`         | Success with value                         | File read, parse, lookup                |
| `:ok` / `ok`                           | Success without value                      | Write operation, side-effect completion |
| `{:error, reason}` / `{error, Reason}` | Recoverable failure                        | External resources, validation          |
| `:error` / `error`                     | Failure without detail                     | Simple lookup                           |
| `{:reply, reply, state}`               | GenServer callback reply                   | OTP server                              |
| `{:noreply, state}`                    | GenServer continues without reply          | OTP server                              |
| `{:stop, reason, state}`               | Process should stop                        | OTP callback                            |
| `{:DOWN, ref, :process, pid, reason}`  | Monitor notification                       | Process monitoring                      |
| `{:EXIT, pid, reason}`                 | Exit signal as message when trapping exits | Process lifecycle                       |

Elixir example:

```elixir
case Map.fetch(user, :email) do
  {:ok, email} -> {:ok, email}
  :error -> {:error, :missing_email}
end
```

Erlang example:

```erlang
case maps:find(email, User) of
    {ok, Email} ->
        {ok, Email};
    error ->
        {error, missing_email}
end.
```

**Design meaning:** Return shapes are informal but powerful protocols. They enable pattern matching to serve as lightweight control-flow typing.

**Common Pitfalls:** Inconsistent return shapes make pattern matching brittle. Avoid functions that sometimes return `{:ok, value}`, sometimes raw `value`, sometimes `nil`, and sometimes raise, unless there is a very clear convention.

### Clause Ordering as Semantics — specific before general

Clause order matters in functions, `case`, `receive`, and anonymous functions.

Good:

```elixir
def classify({:admin, id}) when is_integer(id), do: :admin
def classify({:user, id}) when is_integer(id), do: :user
def classify(_), do: :unknown
```

Bad:

```elixir
def classify(_), do: :unknown
def classify({:admin, id}) when is_integer(id), do: :admin
```

The second and third clauses are unreachable.

Erlang equivalent:

```erlang
classify({admin, Id}) when is_integer(Id) ->
    admin;
classify({user, Id}) when is_integer(Id) ->
    user;
classify(_) ->
    unknown.
```

| Ordering rule                            | Applies to       | Reason                                                |
| ---------------------------------------- | ---------------- | ----------------------------------------------------- |
| Specific before general                  | Function clauses | First matching clause wins                            |
| Tagged variants before catch-all         | `case`           | Preserve meaningful cases                             |
| Protocol messages before generic receive | `receive`        | Avoid consuming unintended messages                   |
| Guarded before unguarded if same shape   | Function clauses | Let refined case win                                  |
| Timeout after receive clauses            | `receive`        | Timeout only when no matching message arrives in time |

**Common Pitfalls:** In `receive`, a broad `_ ->` can consume messages intended for other parts of the process. In concurrent code, broad receive clauses are more dangerous than broad `case` clauses because they mutate the process mailbox by removing messages.

### `receive` Timeout Syntax and Zero-Time Polling — waiting versus checking

A `receive` can include an `after` timeout.

Elixir:

```elixir
receive do
  {:reply, value} ->
    {:ok, value}
after
  5_000 ->
    {:error, :timeout}
end
```

Erlang:

```erlang
receive
    {reply, Value} ->
        {ok, Value}
after 5000 ->
    {error, timeout}
end.
```

A timeout of zero checks the mailbox without waiting.

Elixir:

```elixir
receive do
  msg -> {:ok, msg}
after
  0 -> :no_message
end
```

Erlang:

```erlang
receive
    Msg -> {ok, Msg}
after 0 ->
    no_message
end.
```

**Design meaning:** `receive` timeout is a mailbox operation, not a cancellation mechanism for other processes. It controls how long the current process waits for a matching message.

**Common Pitfalls:** Timing out does not stop the sender, cancel a task, or remove non-matching messages. If cancellation is required, design it explicitly with monitors, exits, task APIs, or protocol messages.

### Trapping Exits Syntax Preview — process signals as messages

Processes can trap exits, converting exit signals into messages. This is advanced and belongs mainly to Part 5 and Part 7, but syntax may appear in OTP-adjacent code.

Erlang:

```erlang
process_flag(trap_exit, true).
```

Elixir:

```elixir
Process.flag(:trap_exit, true)
```

Then exit signals may arrive as messages:

Erlang:

```erlang
receive
    {'EXIT', Pid, Reason} ->
        {exit_from, Pid, Reason}
end.
```

Elixir:

```elixir
receive do
  {:EXIT, pid, reason} ->
    {:exit_from, pid, reason}
end
```

| Concept                | Meaning                                           |
| ---------------------- | ------------------------------------------------- |
| Link                   | Failure signal relationship                       |
| Trap exits             | Convert exit signal to message                    |
| `{:EXIT, pid, reason}` | Exit message shape                                |
| Supervisor usage       | Supervisors use controlled process-exit semantics |
| Risk                   | Can interfere with normal crash propagation       |

**Common Pitfalls:** Do not trap exits casually. It changes failure semantics and can undermine supervision if used without clear lifecycle design.

### Process Names and Registration Syntax — local names, global names, and tuples

Processes can be registered under names.

Erlang:

```erlang
register(counter, Pid),
counter ! increment.
```

Elixir:

```elixir
Process.register(pid, :counter)
send(:counter, :increment)
```

GenServer registration:

```elixir
GenServer.start_link(MyServer, [], name: MyServer)
GenServer.call(MyServer, :get)
```

Erlang `gen_server` registration:

```erlang
gen_server:start_link({local, counter_server}, ?MODULE, [], []).
gen_server:call(counter_server, get).
```

| Name kind                   | Meaning                      | Caveat                                      |
| --------------------------- | ---------------------------- | ------------------------------------------- |
| Local atom name             | Registered on current node   | Atom must be known; name collision possible |
| Module name as process name | Common Elixir convention     | One process per module name per node        |
| `Registry` name             | Elixir registry-based lookup | Requires registry process                   |
| Global name                 | Distributed registration     | Distribution complexity                     |
| Via tuple                   | Pluggable process lookup     | Common in OTP abstractions                  |

**Design meaning:** A process name is a lookup mechanism, not the process itself. Process identity remains the PID; names can be registered, unregistered, or resolved differently by registry mechanisms.

**Common Pitfalls:** Registering processes under dynamic atoms can create atom table risk. Use registries or tuple-based names for dynamic identities.

### Imports and Name Collisions — local namespace management

Name collisions happen when local functions, imports, macros, and aliases overlap.

Elixir:

```elixir
import List, only: [flatten: 1]
```

Now `flatten(xs)` can refer to `List.flatten/1`.

But if a local `flatten/1` exists, ambiguity can arise or local definitions may take precedence depending context.

Erlang:

```erlang
-import(lists, [flatten/1]).
```

Then `flatten(Xs)` refers to `lists:flatten/1` unless local definitions conflict.

| Namespace action     | Benefit                 | Risk                                  |
| -------------------- | ----------------------- | ------------------------------------- |
| Explicit remote call | Clear origin            | Verbose                               |
| Alias                | Shortens module names   | Too many aliases obscure architecture |
| Import               | Shortens function calls | Origin hidden                         |
| Require              | Enables macros          | Compile-time coupling                 |
| Use                  | Adopts DSL/behavior     | Generated code hidden                 |

**Professional rule:** In ordinary application code, prefer explicit module calls and aliases. Use imports when a module intentionally provides a DSL or when a small set of functions is so common that qualification harms readability.

**Common Pitfalls:** Wildcard imports in Elixir can make macro-heavy code difficult to audit. Prefer `only:` or `except:` when importing.

### Naming and Arity in Error Messages — interpreting `undefined function`

An error saying a function is undefined may mean several things.

| Possible cause       | Example                              | Diagnostic question                      |
| -------------------- | ------------------------------------ | ---------------------------------------- |
| Wrong module         | `Foo.bar()`                          | Is the module loaded/available?          |
| Wrong function name  | `String.trimmm/1`                    | Is the function spelled correctly?       |
| Wrong arity          | `String.trim("x", :extra)`           | Does the called arity exist?             |
| Private function     | Calling `defp` externally            | Is it public/exported?                   |
| Missing import/alias | `User.new()` when module not aliased | Is the full module name needed?          |
| Macro not required   | Calling macro without `require`      | Is this macro available at compile time? |

Elixir function arity in errors:

```text
undefined function MyModule.foo/2
```

This means the runtime/compiler looked for `foo` with exactly two arguments.

**Common Pitfalls:** Adding a default argument may create `foo/1` and `foo/2`, but not arbitrary arities. Always check the arity.

### Semicolon, Comma, and Period in Erlang — punctuation as semantic structure

Erlang punctuation is not decorative.

```erlang
f(0) ->
    zero;
f(N) when N > 0 ->
    positive;
f(_) ->
    other.
```

| Punctuation | Role                 | Example                                |
| ----------- | -------------------- | -------------------------------------- |
| `,`         | Sequence expressions | `A = 1, B = 2, A + B`                  |
| `;`         | Separate clauses     | `f(0) -> zero; f(_) -> other.`         |
| `.`         | End form             | `-module(x).`, function definition end |
| `->`        | Clause body          | `Pattern -> Expr`                      |
| `when`      | Guard                | `f(N) when N > 0 -> ...`               |

Incorrect:

```erlang
f(0) ->
    zero.
f(N) when N > 0 ->
    positive.
```

This defines or attempts to define separate forms incorrectly for the same function, depending context, instead of clauses of one function.

**Design meaning:** Erlang punctuation encodes parse structure. Learning it early avoids many source-reading errors.

**Common Pitfalls:** The final clause of a function ends with `.`, not `;`. Intermediate clauses use `;`.

### `do ... end` and Keyword Blocks in Elixir — syntax sugar over keyword arguments

Many Elixir block forms are syntax over keyword lists.

Example:

```elixir
if valid? do
  :ok
else
  :error
end
```

Conceptually relates to passing `do:` and `else:` blocks.

One-line form:

```elixir
if valid?, do: :ok, else: :error
```

Custom macros can use the same style:

```elixir
transaction do
  create_user(attrs)
end
```

This often passes a `do` block to a macro or function, depending definition.

| Syntax        | Meaning                           |
| ------------- | --------------------------------- |
| `do ... end`  | Block syntax                      |
| `do:`         | Keyword form for short block      |
| `else:`       | Keyword branch in supported forms |
| Custom blocks | Often macro-driven DSL            |
| Nested blocks | Need indentation discipline       |

**Design meaning:** Elixir’s block syntax supports DSLs. Many constructs look language-native but may be macro calls receiving keyword blocks.

**Common Pitfalls:** Not every `do ... end` form is a built-in language construct. In framework code, it may be a macro-defined DSL.

### `__MODULE__`, `__ENV__`, and Compile-Time Introspection in Elixir

Elixir exposes compile-time environment helpers.

```elixir
defmodule MyApp.Worker do
  def module_name do
    __MODULE__
  end
end
```

`__MODULE__` expands to the current module.

Common examples:

```elixir
GenServer.start_link(__MODULE__, initial_state, name: __MODULE__)
```

| Form         | Meaning                  | Common use                             |
| ------------ | ------------------------ | -------------------------------------- |
| `__MODULE__` | Current module           | GenServer callbacks, struct references |
| `__ENV__`    | Compile-time environment | Macros, diagnostics                    |
| `__DIR__`    | Current file directory   | File-relative paths at compile time    |
| `__CALLER__` | Macro caller environment | Macro definitions                      |

**Design meaning:** These forms are compile-time-aware. They help macros, generated code, and module-relative definitions.

**Common Pitfalls:** `__MODULE__` in nested modules refers to the current nested module, not necessarily the outer module intended by the reader.

### Erlang `?MODULE`, `?LINE`, and Macro Variables

Erlang has predefined macros.

```erlang
?MODULE
?LINE
?FILE
```

Example:

```erlang
gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).
```

| Macro             | Meaning                                          |
| ----------------- | ------------------------------------------------ |
| `?MODULE`         | Current module name                              |
| `?LINE`           | Current source line                              |
| `?FILE`           | Current file                                     |
| `?FUNCTION_NAME`  | Current function name in modern Erlang contexts  |
| `?FUNCTION_ARITY` | Current function arity in modern Erlang contexts |

**Design meaning:** Erlang predefined macros support logging, callback setup, and generated identifiers. They expand at compile time.

**Common Pitfalls:** Macros are not variables. They are expanded by the preprocessor/compiler.

### Assertion-Like Match Style — when direct matching is idiomatic

Direct matching is often idiomatic when failure means the current code path is invalid.

Elixir:

```elixir
{:ok, pid} = MyServer.start_link([])
```

Erlang:

```erlang
{ok, Pid} = my_server:start_link([]).
```

This says: this operation must succeed for the current process to continue.

| Direct match use      | Good when                            | Bad when                           |
| --------------------- | ------------------------------------ | ---------------------------------- |
| Startup invariant     | Application cannot proceed otherwise | User input may fail normally       |
| Test assertion        | The expected result should occur     | Test needs to inspect error branch |
| Internal trusted call | Prior validation guarantees shape    | External resource is unreliable    |
| OTP callback return   | Required callback shape              | Multiple outcomes need handling    |

**Design meaning:** Match assertions make invariants executable. They are not a replacement for user-facing error handling.

**Common Pitfalls:** Directly matching on file, network, or database results in request-handling code can crash processes. That may be acceptable under supervision, but it must be a deliberate boundary choice.

### Basic Nullability and Absence Syntax — `nil`, `undefined`, `:error`, and tagged options

Erlang has no universal `nil` with Elixir’s semantics. Elixir has `nil`, which is an atom and falsy.

| Absence style  | Erlang                                                   | Elixir                                               | Meaning                |         |                          |
| -------------- | -------------------------------------------------------- | ---------------------------------------------------- | ---------------------- | ------- | ------------------------ |
| Nil-like value | Often `undefined` by convention                          | `nil`                                                | Missing or empty value |         |                          |
| Lookup miss    | `error`, `undefined`, or `{error, Reason}` depending API | `nil`, `:error`, or `{:error, reason}` depending API | API-specific           |         |                          |
| Tagged option  | `{ok, Value}                                             | error`                                               | `{:ok, value}          | :error` | Explicit optional result |
| Error result   | `{error, Reason}`                                        | `{:error, reason}`                                   | Failure with reason    |         |                          |

Elixir:

```elixir
Map.get(user, :email)
# value or nil

Map.fetch(user, :email)
# {:ok, value} or :error
```

Erlang:

```erlang
maps:get(email, User, undefined).
maps:find(email, User).
```

**Design meaning:** Absence is not unified by the language into one static `Option` type. APIs choose return conventions. Professional code should choose conventions consistently.

**Common Pitfalls:** Using `nil` for every kind of failure loses information. Prefer tagged results when the caller must distinguish missing, invalid, unauthorized, unavailable, and failed states.

### Basic State Syntax — recursion, process state, and rebinding are different things

State appears in several forms.

| State form                 | Syntax                        | Meaning                                            |
| -------------------------- | ----------------------------- | -------------------------------------------------- |
| Rebinding                  | `state = new_state` in Elixir | New local binding                                  |
| Recursive parameter        | `loop(new_state)`             | Next iteration state                               |
| GenServer callback state   | `{:noreply, new_state}`       | Process continues with new state                   |
| ETS table                  | `:ets.insert(table, item)`    | Runtime mutable storage outside ordinary variables |
| Process dictionary         | `Process.put(key, value)`     | Implicit process-local storage                     |
| Database/external resource | library call                  | External state                                     |

Elixir `GenServer` state:

```elixir
def handle_cast({:set, value}, _state) do
  {:noreply, value}
end
```

Erlang `gen_server` state:

```erlang
handle_cast({set, Value}, _State) ->
    {noreply, Value}.
```

**Design meaning:** Erlang / Elixir does not mutate local variables, but systems still have state. State is made explicit through recursion, process loops, OTP callback returns, tables, or external resources.

**Common Pitfalls:** Saying “Erlang/Elixir has no state” is false. The correct statement is that ordinary values are immutable and state transitions are explicit.

### Source-Reading Pattern: Recognizing a Public API Function

A typical public Elixir function:

```elixir
@doc "Fetches a user by ID."
@spec fetch_user(pos_integer()) :: {:ok, User.t()} | {:error, :not_found}
def fetch_user(id) when is_integer(id) and id > 0 do
  ...
end
```

A typical public Erlang function:

```erlang
%% Fetches a user by ID.
-spec fetch_user(pos_integer()) -> {ok, user()} | {error, not_found}.
fetch_user(Id) when is_integer(Id), Id > 0 ->
    ...
```

Exported in Erlang:

```erlang
-export([fetch_user/1]).
```

| Signal            | Meaning                                   |
| ----------------- | ----------------------------------------- |
| Documentation     | Human-facing contract                     |
| Spec              | Type/shape contract for tools and readers |
| Public visibility | API boundary                              |
| Guard             | Runtime accepted-value refinement         |
| Tagged return     | Caller must handle success/failure        |
| Function name     | Domain operation                          |

**Common Pitfalls:** In Erlang, a documented/spec’d function is not callable outside the module unless exported. In Elixir, a `def` function is public by default.

### Source-Reading Pattern: Recognizing an OTP Callback Module

Elixir:

```elixir
defmodule Cache do
  use GenServer

  def start_link(opts) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  @impl true
  def init(opts) do
    {:ok, opts}
  end

  @impl true
  def handle_call({:get, key}, _from, state) do
    {:reply, Map.get(state, key), state}
  end
end
```

Erlang:

```erlang
-module(cache).
-behaviour(gen_server).

-export([start_link/1]).
-export([init/1, handle_call/3]).

start_link(Opts) ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, Opts, []).

init(Opts) ->
    {ok, Opts}.

handle_call({get, Key}, _From, State) ->
    {reply, maps:get(Key, State, undefined), State}.
```

| Syntax signal                                  | Meaning                               |
| ---------------------------------------------- | ------------------------------------- |
| `use GenServer` / `-behaviour(gen_server)`     | OTP server callback module            |
| `start_link`                                   | Supervision-compatible start function |
| `init`                                         | Initial state callback                |
| `handle_call`                                  | Synchronous request handler           |
| `handle_cast`                                  | Asynchronous cast handler             |
| `handle_info`                                  | Plain message handler                 |
| `{:reply, ..., state}` / `{reply, ..., State}` | Callback return protocol              |

**Common Pitfalls:** Do not call callback functions directly as ordinary API unless intentionally testing or factoring internals. Public API functions should usually wrap `GenServer.call`, `cast`, or startup behavior.

### Source-Reading Pattern: Recognizing Elixir DSL Code

Elixir DSLs often use macros, `use`, sigils, and `do` blocks.

Example style:

```elixir
schema "users" do
  field :name, :string
  field :email, :string
end
```

or:

```elixir
test "normalizes names" do
  assert normalize(" Ada ") == "Ada"
end
```

or:

```elixir
get "/users/:id", UserController, :show
```

| DSL signal                             | Likely mechanism                  |
| -------------------------------------- | --------------------------------- |
| Bare words that look like declarations | Imported macros                   |
| `use SomeFramework` at top             | Macro setup                       |
| `do ... end` around declarations       | Macro block                       |
| Custom sigils                          | Macro or sigil function           |
| Compile-time validation                | Macro expansion or generated code |

**Design meaning:** Elixir’s syntax is intentionally DSL-friendly. Framework code may look declarative because macros convert declarations into functions, metadata, routes, schemas, tests, or callbacks.

**Common Pitfalls:** Do not assume DSL lines are ordinary function calls. When behavior is unclear, locate the `use`, imported macros, or generated code documentation.

### Source-Reading Pattern: Recognizing Erlang Legacy or OTP-Heavy Code

Erlang OTP-heavy code has recurring syntax markers.

```erlang
-include_lib("kernel/include/logger.hrl").
-behaviour(gen_server).
-record(state, {socket, buffer = <<>>}).
-define(TIMEOUT, 5000).
```

| Marker                      | Meaning                        |
| --------------------------- | ------------------------------ |
| `-include` / `-include_lib` | Header dependency              |
| `-record`                   | Compile-time record definition |
| `?MACRO`                    | Preprocessor macro             |
| `-behaviour`                | Callback contract              |
| `init/1`, `handle_call/3`   | OTP callbacks                  |
| `{ok, State}`               | Callback return protocol       |
| `Pid ! Msg`                 | Raw message send               |
| `receive`                   | Raw mailbox handling           |

**Common Pitfalls:** Erlang records are not maps. Macro expansion can hide constants or code. Header dependencies can make source understanding require looking at `.hrl` files.

### Basic Anti-Pattern Recognition at Syntax Level — syntax that often signals design trouble

Not every suspicious syntax is wrong, but some forms deserve attention.

| Syntax smell                              | Why it may be a problem      | Better question                                                |
| ----------------------------------------- | ---------------------------- | -------------------------------------------------------------- |
| `String.to_atom(user_input)`              | Atom table exhaustion risk   | Is the atom set closed and trusted?                            |
| Broad `rescue _ ->`                       | Hides bugs                   | Which exception is expected?                                   |
| Broad `receive _ ->`                      | Consumes unrelated messages  | What protocol messages should this process accept?             |
| Many `use` directives                     | Hidden compile-time behavior | What code is being injected/imported?                          |
| Process per passive entity                | Processes used as objects    | Does this entity need lifecycle/concurrency/failure isolation? |
| Long pipeline with branching hacks        | Pipe overuse                 | Should this be named intermediate steps or `case`?             |
| Deep anonymous capture                    | Placeholder unreadability    | Would `fn` with named args be clearer?                         |
| Catch-all function clause returning `nil` | Hides invalid inputs         | Should invalid shape crash or return tagged error?             |
| Repeated `++` in recursion                | Costly list construction     | Can prepend/reverse or `Enum` express this better?             |
| `Process.put/get` in business logic       | Hidden state                 | Should state be explicit?                                      |

**Design meaning:** Syntax often reveals design assumptions. Expert reading is not only parsing forms; it is recognizing what kind of boundary, state, failure, or abstraction the code is implying.

### Failure-First Syntax Checklist — common surprises and correct explanations

| Surprise                                 | Tempting wrong model                    | Correct semantic explanation                                | Professional rule                                   |
| ---------------------------------------- | --------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------- |
| `x = 2` after `x = 1` works in Elixir    | Variable mutation                       | Rebinding name to new immutable value                       | Read rebinding as new association                   |
| `^x` is needed in Elixir pattern         | Pattern variables compare automatically | Unpinned names bind/rebind                                  | Pin when comparing to prior binding                 |
| `1 == 1.0` but `1 !== 1.0`               | Equality is always exact                | Non-exact numeric equality differs from exact equality      | Use exact equality when representation matters      |
| `"abc"` differs across Erlang/Elixir     | String syntax is universal              | Erlang and Elixir have different string literal conventions | Check binary vs charlist                            |
| A `case` without matching branch crashes | Branches are optional                   | Pattern branch failure raises                               | Handle all expected variants                        |
| `with` returns an unmatched value        | `with` catches all errors               | It chains pattern matches                                   | Normalize failures deliberately                     |
| `send` does not wait                     | Send is method call                     | Message delivery is asynchronous                            | Use call/monitor/ref protocol when response matters |
| `receive` ignores old messages           | Receive pops first message always       | Selective receive scans for matching message                | Design mailbox protocol carefully                   |
| `use` imports too much magic             | `use` is simple import                  | It invokes compile-time macro expansion                     | Audit every `use`                                   |
| Specs prevent wrong calls                | Specs are enforced static types         | Specs help docs and analysis                                | Use specs plus tests and validation                 |

### Core Syntax Decision Table — choosing the right primitive form

| Need                              | Prefer                            | Because                          | Avoid                                        |
| --------------------------------- | --------------------------------- | -------------------------------- | -------------------------------------------- |
| Branch on tagged result           | `case`                            | Pattern matching is direct       | `if match?(...)`                             |
| Chain tagged successes in Elixir  | `with`                            | Linear success path              | Deeply nested `case` if failures are uniform |
| Define behavior by input shape    | Function clauses                  | Dispatch is declarative          | One function with huge internal branch       |
| Check simple condition            | `if` / `cond`                     | Boolean logic is central         | Artificial pattern matching                  |
| Transform collection              | `Enum`, comprehension, recursion  | Expresses traversal              | Manual recursion for trivial mapping         |
| Parse binary protocol             | Binary pattern matching           | Shape and parsing are unified    | Manual byte indexing                         |
| Assert invariant                  | Direct match                      | Crash exposes impossible state   | Silent fallback                              |
| Handle expected external failure  | Tagged return + `case`/`with`     | Failure is data                  | Broad exception rescue                       |
| Start supervised stateful process | OTP child spec / `start_link`     | Lifecycle belongs to supervision | Raw `spawn` without monitor/link             |
| Build DSL in Elixir               | Macro/sigil only if syntax needed | Compile-time syntax extension    | Macro for ordinary function abstraction      |

### Syntax Boundary: What Part 2 Does Not Yet Fully Explain

Part 2 establishes recognition competence. Several forms have appeared only as syntax previews and will receive deeper treatment later:

| Topic                                                                        | Why not fully treated here             | Main later part |
| ---------------------------------------------------------------------------- | -------------------------------------- | --------------- |
| Structs, records, maps, tagged tuples as modeling choices                    | Requires data-modeling task patterns   | Part 3          |
| Protocols, behaviours, higher-order functions, macros as abstraction choices | Requires abstraction design comparison | Part 4          |
| Errors, exits, supervision, resources, trust boundaries                      | Requires boundary-management design    | Part 5          |
| Standard library, Phoenix, Mix, ExUnit, Erlang OTP modules                   | Requires ecosystem task map            | Part 6          |
| BEAM scheduling, GC, binary memory, mailbox cost, ETS, NIFs                  | Requires runtime cost model            | Part 7          |
| Historical reasons for syntax and ecosystem split                            | Requires evolution analysis            | Part 8          |
| Tooling, profiling, debugging, code review                                   | Requires professional workflow context | Part 9          |

The syntax should now be readable enough to support the next layer: **data, types, and modeling by task pattern**.
## PART 3 — Data, Types, and Modeling Reference by Task Pattern

### Part Scope — data shape, runtime types, modeling choices, and contract boundaries

Part 3 moves from syntax recognition to **modeling judgment**. Erlang / Elixir code is not designed by choosing classes first. It is usually designed by choosing **value shapes**, **message shapes**, **return protocols**, **process state boundaries**, and **failure representations**.

Because Erlang and Elixir share the BEAM runtime, many modeling decisions are shared: atoms, tuples, lists, maps, binaries, PIDs, references, functions, and tagged return values have the same broad runtime identity. But Erlang and Elixir differ in conventions: Erlang often uses records, tagged tuples, proplists, and OTP-native callback shapes; Elixir more often uses structs, maps, protocols, keyword lists, and macro-backed DSLs. This follows the guide’s requirement to treat Erlang / Elixir as one coherent BEAM / OTP learning target rather than as two separate tutorials. 

The central question in this part is:

> Given a modeling task, which BEAM-family representation should be used, what does it guarantee, what does it fail to guarantee, and what failure mode does it create?

| Modeling task                    | Common Erlang choices         | Common Elixir choices                        | Primary design question                             |
| -------------------------------- | ----------------------------- | -------------------------------------------- | --------------------------------------------------- |
| Represent finite symbolic states | atoms                         | atoms                                        | Is the set closed and trusted?                      |
| Return success/failure           | tagged tuples                 | tagged tuples                                | Should failure be data or crash?                    |
| Represent structured domain data | records, maps, tagged tuples  | structs, maps                                | Is shape fixed, open, internal, or public?          |
| Represent options                | proplists, maps               | keyword lists, maps                          | Is order or duplicate key behavior needed?          |
| Represent sequences              | lists, binaries               | lists, binaries, streams                     | Is the data linked, byte-oriented, or lazy?         |
| Represent text                   | binaries, charlists           | binaries/strings, charlists                  | Which APIs expect which text shape?                 |
| Represent external data          | maps, binaries, decoded terms | maps, structs after validation               | Where is the trust boundary?                        |
| Represent process identity       | PIDs, registered names, refs  | PIDs, registered names, refs, Registry names | Is identity stable, local, dynamic, or distributed? |
| Represent behavior contracts     | behaviours                    | behaviours, protocols                        | Is the abstraction module-based or data-based?      |
| Represent type contracts         | `-spec`, `-type`, `-opaque`   | `@spec`, `@type`, `@opaque`                  | What should tools and readers know?                 |

### Type-System Frame — dynamic, strong, shape-oriented, and analyzable

Erlang / Elixir is dynamically typed: values carry runtime types, and most type errors are discovered at runtime. But the code is not unstructured. Patterns, guards, specs, behaviours, protocols, and conventions create a strong **shape discipline**.

| Property             | Erlang / Elixir reality                                                       | Practical consequence                        | Common misunderstanding                                |
| -------------------- | ----------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------ |
| Dynamic typing       | No complete mandatory static type checker controls ordinary compilation       | Fast iteration and flexible data             | “Types do not matter”                                  |
| Strong runtime types | Atoms, tuples, binaries, maps, PIDs, functions, integers, floats are distinct | Fewer silent coercions                       | “Strong” means statically proven                       |
| Pattern matching     | Runtime shape checks are executable                                           | Function heads and `case` encode contracts   | Pattern matching is only destructuring                 |
| Guards               | Runtime refinements with restricted expressions                               | Simple type/value constraints are visible    | Guards are arbitrary validators                        |
| Specs                | Documentation and analyzer input                                              | Better maintenance and Dialyzer feedback     | Specs are enforced like Java/Rust types                |
| Behaviours           | Module callback contracts                                                     | OTP and plugin architecture become checkable | Behaviours are full interfaces with type-safe dispatch |
| Protocols            | Elixir runtime dispatch by data type                                          | Data-polymorphic operations                  | Protocols replace all behaviours                       |

**Design meaning:** Erlang / Elixir type discipline is not primarily declaration-first. It is **value-shape-first**. Good code makes the expected shapes clear through patterns, return protocols, specs, and module boundaries.

**Failure-first explanation:** The tempting wrong model is “because the language is dynamic, anything can flow anywhere.” The surprising behavior is that pattern matching, guards, and OTP callbacks fail immediately when shape assumptions are wrong. The correct explanation is that the language lacks full static enforcement but has strong runtime shape enforcement. The professional rule is: treat public boundaries as validation zones and internal trusted paths as pattern-matching zones. The boundary changes when static analysis tools, generated code, or framework conventions add extra checks.

**Common Pitfalls:** Do not use maps with arbitrary keys everywhere and call that flexibility. Without explicit validation and shape conventions, dynamic maps become untyped blobs.

### Task Pattern: Represent Finite States — atoms, tagged values, and closed symbolic sets

Finite symbolic states are usually modeled with atoms.

Erlang:

```erlang
Status = active.
```

Elixir:

```elixir
status = :active
```

Atoms are ideal when the possible values are known and finite:

```elixir
def transition(:pending, :approve), do: {:ok, :approved}
def transition(:pending, :reject), do: {:ok, :rejected}
def transition(:approved, _), do: {:error, :already_final}
def transition(:rejected, _), do: {:error, :already_final}
```

Erlang equivalent:

```erlang
transition(pending, approve) ->
    {ok, approved};
transition(pending, reject) ->
    {ok, rejected};
transition(approved, _) ->
    {error, already_final};
transition(rejected, _) ->
    {error, already_final}.
```

| Option              | Use when                              | Strength                              | Cost                                     | Pitfall                                       |
| ------------------- | ------------------------------------- | ------------------------------------- | ---------------------------------------- | --------------------------------------------- |
| Atom                | State set is closed and known         | Compact, pattern-matchable, idiomatic | Atom table risk if generated dynamically | Converting untrusted strings to atoms         |
| Tagged tuple        | State needs payload                   | Explicit variant plus data            | No static exhaustiveness guarantee       | Inconsistent tuple shapes                     |
| Struct              | State belongs to richer domain entity | Named fields and module identity      | More verbose than atom                   | Treating struct as class                      |
| Map                 | State comes from external/open data   | Flexible                              | Weak shape guarantee                     | Misspelled or missing keys                    |
| Integer/string code | External protocol requires it         | Compatible with wire/database format  | Less expressive internally               | Using external code throughout internal logic |

**Design meaning:** Atoms work like lightweight enum labels, but they are not scoped enum types. `:active` can appear anywhere. The language does not enforce that only a declared set of atoms is used.

**Professional rule:** Use atoms internally for closed states. Convert external strings or codes to atoms only through explicit mappings.

Good Elixir boundary conversion:

```elixir
def parse_status("pending"), do: {:ok, :pending}
def parse_status("approved"), do: {:ok, :approved}
def parse_status("rejected"), do: {:ok, :rejected}
def parse_status(_), do: {:error, :invalid_status}
```

Bad:

```elixir
def parse_status(input), do: String.to_atom(input)
```

**Common Pitfalls:** Atoms are not garbage-collected in the same ordinary way as short-lived data. Dynamically creating atoms from open input can exhaust the VM atom table. Use strings or binaries for open names and atoms for known symbolic labels.

### Task Pattern: Represent Success and Failure — tagged tuples, bang functions, exceptions, and process crashes

The most common BEAM result protocol is the tagged tuple.

Erlang:

```erlang
{ok, Value}
{error, Reason}
```

Elixir:

```elixir
{:ok, value}
{:error, reason}
```

This is not just style. It makes success and failure visible to pattern matching.

```elixir
case fetch_user(id) do
  {:ok, user} ->
    {:ok, normalize(user)}

  {:error, :not_found} ->
    {:error, :user_not_found}

  {:error, reason} ->
    {:error, {:fetch_failed, reason}}
end
```

| Failure representation | Erlang form                       | Elixir form                         | Use when                                     | Cost                                    |
| ---------------------- | --------------------------------- | ----------------------------------- | -------------------------------------------- | --------------------------------------- |
| Success/failure tuple  | `{ok, Value}` / `{error, Reason}` | `{:ok, value}` / `{:error, reason}` | Failure is expected and caller should branch | Verbose chaining without helpers        |
| Simple optional result | `{ok, Value}` / `error`           | `{:ok, value}` / `:error`           | Missing value has no detailed reason         | Loses detail                            |
| Bang function          | usually function-specific         | `read!`, `fetch!` convention        | Failure should raise                         | Caller must know crash/exception policy |
| Exception/error        | `erlang:error(Reason)`            | `raise`                             | Exceptional local failure                    | Overuse makes control flow implicit     |
| Process exit           | `exit(Reason)`                    | `exit(reason)`                      | Process should terminate                     | Needs supervision/lifecycle design      |
| Supervisor restart     | OTP child failure                 | OTP child failure                   | Component recovery                           | Requires correct restart strategy       |

**Design meaning:** Erlang / Elixir distinguishes **error as data** from **error as failure**. A tagged tuple says “this is an expected outcome.” A crash says “this process cannot continue correctly.”

**Failure-first explanation:** The tempting wrong model is “always return `{:error, reason}` because crashes are bad.” The surprising result is code that defensively checks every impossible condition and still fails badly when state is corrupted. The correct explanation is that Erlang / Elixir systems rely on both local error values and process-level failure recovery. The professional rule is: expected domain failures should be data; violated invariants may crash; repeated or external failures need boundary design and observability. The boundary changes inside OTP callback processes, where crashing may be preferable if the supervisor can restore a clean state.

**Common Pitfalls:** Do not mix return protocols casually. A function that sometimes returns `{:ok, value}`, sometimes returns raw `value`, sometimes returns `nil`, and sometimes raises forces callers to know too much.

### Task Pattern: Represent Optional or Missing Values — `nil`, `undefined`, `:error`, and explicit option shapes

Absence is not modeled by a single universal type in Erlang / Elixir. APIs choose conventions.

Elixir map access:

```elixir
Map.get(user, :email)
# value or nil

Map.fetch(user, :email)
# {:ok, value} or :error
```

Erlang map access:

```erlang
maps:get(email, User, undefined).
maps:find(email, User).
```

| Absence model          | Erlang                           | Elixir                       | Use when                    | Pitfall                                                               |                     |                    |
| ---------------------- | -------------------------------- | ---------------------------- | --------------------------- | --------------------------------------------------------------------- | ------------------- | ------------------ |
| Sentinel atom          | `undefined`, `none`, `not_found` | `nil`, `:none`, `:not_found` | Absence is simple and local | Sentinel may collide with valid value                                 |                     |                    |
| Optional tagged result | `{ok, Value}                     | error`                       | `{:ok, value}               | :error`                                                               | Caller must branch  | No detailed reason |
| Error tagged result    | `{ok, Value}                     | {error, Reason}`             | `{:ok, value}               | {:error, reason}`                                                     | Absence has meaning | More verbose       |
| Empty list             | `[]`                             | `[]`                         | Query returns many values   | Cannot distinguish “not found” from “found empty set” unless intended |                     |                    |
| Exception/bang         | API-specific                     | `fetch!`, `read!`            | Absence violates invariant  | Overuse creates crashes at weak boundaries                            |                     |                    |

**Design meaning:** Absence modeling should follow caller needs. If absence is normal, return data that forces the caller to decide. If absence means a violated invariant, direct match or bang function may be appropriate.

Good Elixir domain API:

```elixir
def find_user(id) do
  case Repo.get(User, id) do
    nil -> {:error, :not_found}
    user -> {:ok, user}
  end
end
```

Good Erlang domain API:

```erlang
find_user(Id) ->
    case lookup_user(Id) of
        undefined ->
            {error, not_found};
        User ->
            {ok, User}
    end.
```

**Common Pitfalls:** In Elixir, `nil` is convenient but can be too weak for public APIs. If callers must know why a value is absent, use a tagged error.

### Task Pattern: Define Structured Domain Data — tuples, maps, records, structs, and tagged products

Structured data is usually modeled by choosing between tuples, maps, records, and structs.

| Representation | Erlang                      | Elixir                  | Best use                         | Main cost                                       |
| -------------- | --------------------------- | ----------------------- | -------------------------------- | ----------------------------------------------- |
| Tuple          | `{X, Y}`                    | `{x, y}`                | Small fixed positional data      | Positions become unclear                        |
| Tagged tuple   | `{user, Id, Name}`          | `{:user, id, name}`     | Compact variant with payload     | Weak field names                                |
| Map            | `#{id => Id, name => Name}` | `%{id: id, name: name}` | Flexible key-value data          | Shape not fully enforced                        |
| Record         | `#user{id = Id}`            | Not typical             | Erlang internal fixed-shape data | Compile-time tuple abstraction; header coupling |
| Struct         | Not Erlang-native           | `%User{id: id}`         | Elixir fixed domain shape        | Runtime is still map; no full static guarantee  |
| Opaque type    | `-opaque user() :: ...`     | `@opaque t :: ...`      | Hide representation behind API   | Requires discipline and specs                   |

Erlang record:

```erlang
-record(user, {id, name, email = undefined}).

new_user(Id, Name) ->
    #user{id = Id, name = Name}.
```

Elixir struct:

```elixir
defmodule User do
  defstruct [:id, :name, email: nil]
end

user = %User{id: 1, name: "Ada"}
```

**Task decision table:**

| Task                                    | Preferred shape                                    | Why                                                            |
| --------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------- |
| Return operation result                 | Tagged tuple                                       | Pattern matching and convention                                |
| Represent a small internal pair         | Tuple                                              | Compact and simple                                             |
| Represent open decoded JSON             | Map with string keys or atom keys after validation | External data is open                                          |
| Represent stable Elixir domain entity   | Struct                                             | Named fields and module identity                               |
| Represent stable Erlang internal entity | Record or map                                      | Records are common in Erlang internals; maps are more flexible |
| Represent public hidden abstraction     | Opaque type plus API                               | Prevent callers from depending on representation               |
| Represent state machine variant         | Atom or tagged tuple                               | Simple matching                                                |

**Failure-first explanation:** The tempting wrong model is “use maps for everything because they are flexible.” The surprising failure is that invalid shapes travel through the system until a late pattern match or key access fails. The correct explanation is that maps provide flexible structure but weak domain guarantees unless paired with validation and conventions. The professional rule is: use maps at open boundaries, structs/records for stable internal shapes, and opaque APIs when representation should not leak. The boundary changes in highly dynamic code, DSLs, or serialization layers where open maps are appropriate.

**Common Pitfalls:** Do not use positional tuples with many fields in public APIs. A tuple like `{user, Id, Name, Email, Status, CreatedAt}` is compact but fragile. Use a map, struct, record, or opaque constructor.

### Task Pattern: Choose Between Map and Struct in Elixir — open data versus named domain shape

In Elixir, maps and structs are syntactically close but semantically different.

Map:

```elixir
user = %{id: 1, name: "Ada"}
```

Struct:

```elixir
defmodule User do
  defstruct [:id, :name]
end

user = %User{id: 1, name: "Ada"}
```

| Choice        | Use map when                               | Use struct when                              |
| ------------- | ------------------------------------------ | -------------------------------------------- |
| Shape         | Keys may vary                              | Fields are known                             |
| Boundary      | Data is external, decoded, or intermediate | Data is part of domain model                 |
| Validation    | Validation still pending                   | Construction implies some shape expectation  |
| Pattern match | `%{id: id}` is enough                      | `%User{id: id}` matters                      |
| Protocols     | Generic map behavior is enough             | Type-specific protocol implementation needed |
| Docs/specs    | Shape is local/simple                      | Public type deserves module docs/specs       |

Struct matching is stronger than map matching:

```elixir
def display_name(%User{name: name}) do
  name
end
```

This requires the value to be a `User` struct.

Map matching:

```elixir
def display_name(%{name: name}) do
  name
end
```

This accepts any map with a `:name` key.

**Design meaning:** A struct is a domain claim. It says “this map belongs to this module-defined shape.” It does not prove all invariants. It does not make methods. It does not make the language statically typed.

**Common Pitfalls:** Do not treat structs as classes. Behavior belongs in module functions and protocols, not inside the struct as methods.

### Task Pattern: Choose Between Record and Map in Erlang — compile-time structure versus runtime flexibility

Erlang records and maps solve overlapping but different problems.

Record:

```erlang
-record(state, {socket, buffer = <<>>, status = idle}).
```

Map:

```erlang
State = #{socket => Socket, buffer => <<>>, status => idle}.
```

| Choice           | Record                                                        | Map                                          |
| ---------------- | ------------------------------------------------------------- | -------------------------------------------- |
| Runtime shape    | Tuple                                                         | Map                                          |
| Field names      | Compile-time only                                             | Runtime keys                                 |
| Access           | Fast positional tuple access through syntax                   | Key-based access                             |
| Cross-module use | Requires shared `.hrl` or duplicated definition               | No header required                           |
| Evolution        | Field changes require recompilation of dependent record users | More flexible                                |
| Introspection    | Looks like tuple at runtime                                   | Keys visible at runtime                      |
| Common use       | OTP state, legacy code, internal fixed data                   | Newer flexible data, external-ish structures |

Record example:

```erlang
handle_call(get_status, _From, State = #state{status = Status}) ->
    {reply, Status, State}.
```

Map example:

```erlang
handle_call(get_status, _From, State = #{status := Status}) ->
    {reply, Status, State}.
```

**Design meaning:** Erlang records are a compile-time convenience over tuples. This makes them efficient and common in older code but less flexible across boundaries. Maps are more dynamic and self-describing at runtime.

**Professional rule:** Records are still common for internal Erlang state and legacy code. Maps are often better for flexible data, public-ish structures, or when avoiding header coupling matters.

**Common Pitfalls:** Do not pass records as if other modules can understand their field names unless they share the exact record definition at compile time.

### Task Pattern: Model Variants and State Machines — atoms, tagged tuples, structs, and callback states

Finite variants are central to Erlang / Elixir. A variant can be a simple atom or a tagged tuple with payload.

Simple variant:

```elixir
:idle
:running
:stopped
```

Payload variant:

```elixir
{:connected, socket}
{:backing_off, retry_count, next_time}
{:failed, reason}
```

State machine example in Elixir:

```elixir
def next_state(:idle, :start), do: {:ok, :running}
def next_state(:running, :stop), do: {:ok, :stopped}
def next_state(:running, {:fail, reason}), do: {:ok, {:failed, reason}}
def next_state(state, event), do: {:error, {:invalid_transition, state, event}}
```

Erlang equivalent:

```erlang
next_state(idle, start) ->
    {ok, running};
next_state(running, stop) ->
    {ok, stopped};
next_state(running, {fail, Reason}) ->
    {ok, {failed, Reason}};
next_state(State, Event) ->
    {error, {invalid_transition, State, Event}}.
```

| Variant shape         | Use when                | Example                                   | Pitfall                                    |
| --------------------- | ----------------------- | ----------------------------------------- | ------------------------------------------ |
| Atom                  | No payload              | `:idle`                                   | Cannot carry data                          |
| Tagged tuple          | Payload needed          | `{:failed, reason}`                       | Positional payload can become unclear      |
| Struct per variant    | Rich domain state       | `%Failed{reason: reason}`                 | More modules and boilerplate               |
| Map with `:type` key  | External JSON-like data | `%{type: "failed"}`                       | Stringly typed internally                  |
| Process state variant | Runtime lifecycle state | `{:connected, socket}` in GenServer state | Process becomes complex if too many states |

**Design meaning:** Tagged tuples approximate algebraic data variants in a dynamic language. They are expressive and pattern-matchable, but the compiler generally does not enforce exhaustive handling.

**Common Pitfalls:** A state machine represented as a loose map with flags such as `%{running: true, failed: false, connected: true}` can allow impossible combinations. Prefer one explicit state variant.

### Task Pattern: Constrain Input — patterns, guards, validation functions, and boundary modules

Input constraints should be placed at the correct boundary. Erlang / Elixir provides patterns, guards, explicit validators, and constructor functions.

| Constraint mechanism     | Example                          | Best use                        | Limit                                            |
| ------------------------ | -------------------------------- | ------------------------------- | ------------------------------------------------ |
| Function-head pattern    | `def f(%User{} = user)`          | Required shape                  | Cannot express complex validation                |
| Guard                    | `when is_integer(id) and id > 0` | Simple runtime refinements      | Guard expressions restricted                     |
| Direct match             | `{:ok, x} = result`              | Assert trusted invariant        | Crashes on mismatch                              |
| `case` validation        | Branch over forms                | Expected variants               | More verbose                                     |
| Constructor function     | `User.new(attrs)`                | Centralize validation           | Must be used consistently                        |
| Changeset/schema library | Ecto changesets, validation libs | External data validation        | Framework-specific                               |
| Opaque type/API          | Hide representation              | Enforce construction discipline | Runtime can still bypass if representation leaks |

Elixir constructor-style validation:

```elixir
defmodule User do
  defstruct [:id, :name]

  def new(%{"id" => id, "name" => name})
      when is_integer(id) and is_binary(name) and byte_size(name) > 0 do
    {:ok, %User{id: id, name: name}}
  end

  def new(_) do
    {:error, :invalid_user}
  end
end
```

Erlang equivalent style:

```erlang
new_user(#{<<"id">> := Id, <<"name">> := Name})
  when is_integer(Id), is_binary(Name), byte_size(Name) > 0 ->
    {ok, #{id => Id, name => Name}};
new_user(_) ->
    {error, invalid_user}.
```

**Design meaning:** Boundary validation transforms **unknown data** into **trusted internal shape**. After validation, internal code can use pattern matching more assertively.

**Failure-first explanation:** The tempting wrong model is “validate everywhere to be safe.” The surprising result is repetitive code that still misses boundary cases and obscures invariants. The correct explanation is that validation should be concentrated at trust boundaries, while internal code should rely on established shapes. The professional rule is: validate external input once, convert it into internal representation, and preserve that representation through clear APIs. The boundary changes when data can be mutated externally, stored/reloaded, or received from untrusted processes.

**Common Pitfalls:** Do not accept external maps and pass them through the whole system unchanged. Decode, validate, normalize, and convert to a domain representation early.

### Task Pattern: Validate External Data — strings, JSON-like maps, atom keys, and trust boundaries

External data usually arrives as binaries, strings, JSON maps, query params, database rows, messages, or protocol packets. It should not be trusted as internal domain data.

Typical Elixir JSON-decoded data often has string keys:

```elixir
%{"id" => 1, "name" => "Ada"}
```

Internal Elixir domain data might use atoms or structs:

```elixir
%User{id: 1, name: "Ada"}
```

| External shape               | Internal target          | Conversion rule                                  |
| ---------------------------- | ------------------------ | ------------------------------------------------ |
| String-key map               | Struct                   | Validate required fields, types, and constraints |
| String status                | Atom status              | Explicit finite mapping                          |
| Binary protocol              | Tagged tuple/map/struct  | Binary pattern match plus validation             |
| Query params                 | Validated command struct | Normalize strings, numbers, booleans             |
| Database row                 | Domain struct/map        | Check nils and expected types                    |
| Message from another process | Tagged protocol          | Match tag, validate payload if untrusted         |
| File content                 | Parsed domain shape      | Decode then validate                             |

Bad Elixir atom conversion:

```elixir
def parse_kind(%{"kind" => kind}) do
  {:ok, String.to_atom(kind)}
end
```

Better:

```elixir
def parse_kind(%{"kind" => "user"}), do: {:ok, :user}
def parse_kind(%{"kind" => "admin"}), do: {:ok, :admin}
def parse_kind(_), do: {:error, :invalid_kind}
```

**Design meaning:** The external/internal boundary is one of the most important type-safety boundaries in dynamic languages. Erlang / Elixir gives excellent pattern matching tools, but does not automatically validate decoded external data.

**Common Pitfalls:** Do not convert JSON keys or values to atoms indiscriminately. Do not pattern-match external decoded maps as if they were trusted structs.

### Task Pattern: Choose the Right Collection — lists, maps, tuples, binaries, ETS, streams, and queues

Collection choice determines readability and performance.

| Need                        | Erlang choice                          | Elixir choice                       | Why                                    |
| --------------------------- | -------------------------------------- | ----------------------------------- | -------------------------------------- |
| Sequential traversal        | list                                   | list / `Enum`                       | Natural head-tail and map/reduce       |
| Random keyed lookup         | map                                    | map                                 | Key-value access                       |
| Fixed small product         | tuple                                  | tuple                               | Compact positional data                |
| Text/bytes                  | binary                                 | binary/string                       | Efficient byte-oriented representation |
| Ordered options             | proplist                               | keyword list                        | Ordered pairs and duplicate keys       |
| Large mutable/shared lookup | ETS                                    | ETS via `:ets`                      | Runtime table outside process heap     |
| Lazy transformation         | custom/lists/streams depending context | `Stream`                            | Avoid eager intermediate collections   |
| FIFO queue                  | `queue` module                         | `:queue` or appropriate abstraction | Efficient queue operations             |
| Process registry            | `gproc`/registry libs/OTP mechanisms   | `Registry`                          | Dynamic process lookup                 |

**List example:**

```elixir
Enum.map(users, &normalize_user/1)
```

**Map example:**

```elixir
users_by_id = Map.new(users, fn user -> {user.id, user} end)
```

**ETS example in Elixir:**

```elixir
table = :ets.new(:cache, [:set, :private])
:ets.insert(table, {:user_count, 10})
:ets.lookup(table, :user_count)
```

**Design meaning:** BEAM values are immutable, but the runtime includes specialized facilities such as ETS for shared, mutable, VM-managed tables. Collection modeling is therefore not only about syntax; it is also about ownership, mutability, visibility, and cost.

**Common Pitfalls:** Do not use a process as a key-value store when ETS or a map inside a properly designed process would be clearer. Do not use ETS merely to avoid understanding state ownership.

### Task Pattern: Model Text and Binary Data — binaries, strings, charlists, iodata, and encodings

Text and binary modeling is especially important in a mixed Erlang/Elixir environment.

| Data need              | Erlang common shape | Elixir common shape                  | Notes                                 |
| ---------------------- | ------------------- | ------------------------------------ | ------------------------------------- |
| UTF-8 application text | binary              | string, which is binary              | Elixir `"text"` is binary             |
| Erlang legacy text     | charlist            | charlist with `'text'` or `~c"text"` | Some Erlang APIs expect charlists     |
| File/network bytes     | binary              | binary                               | Protocols and files are byte-oriented |
| Efficient output       | iolist/iodata       | iodata                               | Avoid unnecessary concatenation       |
| Character codepoint    | `$A`                | `?A`                                 | Integer codepoint                     |
| Regex text processing  | `re` module         | `Regex`                              | API conventions differ                |
| Binary protocol        | bit syntax          | bit syntax                           | Use pattern matching                  |

Elixir text example:

```elixir
name = "José"
byte_size(name)
String.length(name)
```

These are not the same question. `byte_size/1` counts bytes; `String.length/1` counts graphemes in Elixir’s string model.

Erlang binary text:

```erlang
Name = <<"José"/utf8>>,
byte_size(Name).
```

**Design meaning:** BEAM distinguishes bytes, codepoints, charlists, binaries, and iodata. Elixir makes UTF-8 binary strings the default, but Erlang interop still requires knowing the older conventions.

**Common Pitfalls:** Do not assume text length equals byte length. Do not assume Erlang `"abc"` and Elixir `"abc"` have the same runtime shape.

### Task Pattern: Model Binary Protocols — bit syntax, tagged parsing results, and malformed data

Binary pattern matching is one of the strongest BEAM modeling tools.

Elixir:

```elixir
def parse_packet(<<version, type, length::16, payload::binary-size(length), rest::binary>>) do
  {:ok, %{version: version, type: type, payload: payload}, rest}
end

def parse_packet(_) do
  {:error, :invalid_packet}
end
```

Erlang:

```erlang
parse_packet(<<Version, Type, Length:16, Payload:Length/binary, Rest/binary>>) ->
    {ok, #{version => Version, type => Type, payload => Payload}, Rest};
parse_packet(_) ->
    {error, invalid_packet}.
```

| Modeling decision   | Recommended pattern                      | Reason                                        |
| ------------------- | ---------------------------------------- | --------------------------------------------- |
| Valid binary packet | Binary pattern clause                    | Parsing and shape check together              |
| Malformed packet    | Fallback clause returning tagged error   | Failure is expected for external data         |
| Protocol version    | Atom/integer after parsing               | Keep wire format separate from internal state |
| Remaining bytes     | Return `rest` explicitly                 | Supports streaming parsers                    |
| Large payload       | Be aware of sub-binary retention         | Runtime memory concern                        |
| Unknown type        | Return tagged error or preserve raw code | Avoid uncontrolled atom creation              |

**Design meaning:** Binary matching lets the programmer describe the structure of data directly. But external binary data is untrusted; malformed input should usually be handled as a tagged error, not by an accidental crash, unless the process is intentionally crash-boundary-isolated.

**Common Pitfalls:** Do not parse untrusted binary protocols with direct match assertions unless process crash is the intended failure policy. Use multi-clause functions or `case`.

### Task Pattern: Represent Options and Configuration — keyword lists, proplists, maps, application env, and structs

Options are usually not the same as domain data.

Elixir option list:

```elixir
start_link(name: MyServer, timeout: 5_000)
```

Runtime shape:

```elixir
[{:name, MyServer}, {:timeout, 5_000}]
```

Erlang proplist:

```erlang
start_link([{name, my_server}, {timeout, 5000}]).
```

| Option representation   | Use when                        | Strength                     | Pitfall                                               |
| ----------------------- | ------------------------------- | ---------------------------- | ----------------------------------------------------- |
| Keyword list            | Function options, DSLs          | Ordered, concise call syntax | Duplicate keys; linear lookup                         |
| Proplist                | Erlang options, legacy APIs     | Flexible, conventional       | Shape can be loose                                    |
| Map                     | Larger option sets, config maps | Unique keys, clearer lookup  | Less idiomatic for simple final-arg options in Elixir |
| Struct                  | Validated configuration object  | Explicit domain shape        | More setup                                            |
| Application environment | Runtime/config system           | Central app config           | Overuse creates hidden dependencies                   |
| Module attribute        | Compile-time config             | Fast and simple constants    | Not dynamic runtime config                            |

Elixir keyword validation:

```elixir
def start_link(opts) do
  name = Keyword.get(opts, :name, __MODULE__)
  timeout = Keyword.get(opts, :timeout, 5_000)
  GenServer.start_link(__MODULE__, %{timeout: timeout}, name: name)
end
```

For complex config, normalize into a struct:

```elixir
defmodule WorkerConfig do
  defstruct [:name, timeout: 5_000, retries: 3]
end
```

**Design meaning:** Options are often a public API surface. A loose keyword list is ergonomic; a validated struct is safer for complex configuration.

**Common Pitfalls:** Do not allow arbitrary options silently unless the API explicitly forwards them. Unknown options should often be rejected to catch misspellings.

### Task Pattern: Model IDs, References, and Correlation — integers, binaries, refs, PIDs, and names

IDs appear at different semantic levels.

| Identity kind           | BEAM representation          | Use                           | Caveat                                              |
| ----------------------- | ---------------------------- | ----------------------------- | --------------------------------------------------- |
| Domain ID               | integer, binary, UUID string | Database/user/entity identity | Validate at boundary                                |
| Process identity        | PID                          | Runtime process handle        | Local to VM/node semantics                          |
| Unique runtime token    | reference                    | Correlation, monitors         | Meaningful during runtime, not persistent domain ID |
| Registered process name | atom, tuple, via name        | Lookup process                | Name lifecycle differs from PID lifecycle           |
| External correlation ID | binary/string                | Logs, requests, tracing       | Propagate explicitly                                |
| Module identity         | atom/module                  | Compile/runtime code identity | Elixir modules compile to atoms                     |

Correlation example:

```elixir
ref = make_ref()
send(pid, {:request, self(), ref, payload})

receive do
  {:reply, ^ref, result} -> {:ok, result}
after
  5_000 -> {:error, :timeout}
end
```

Erlang:

```erlang
Ref = make_ref(),
Pid ! {request, self(), Ref, Payload},
receive
    {reply, Ref, Result} ->
        {ok, Result}
after 5000 ->
    {error, timeout}
end.
```

**Design meaning:** A reference is excellent for runtime correlation because it is unique enough for process protocols. It is not a persistent business ID. A PID identifies a process, not the entity the process may represent.

**Common Pitfalls:** Do not use PIDs as durable domain identifiers. Processes die and restart; a registered name or supervisor may produce a new PID.

### Task Pattern: Model Process Messages — tagged tuples, refs, caller PIDs, and protocol boundaries

Messages are ordinary terms. Therefore message design is data modeling.

Basic message:

```elixir
{:increment, 1}
```

Request-response message:

```elixir
{:get, self(), ref, key}
```

Response:

```elixir
{:reply, ref, value}
```

Erlang equivalent:

```erlang
{get, self(), Ref, Key}
{reply, Ref, Value}
```

| Message field       | Purpose                         |
| ------------------- | ------------------------------- |
| Tag atom            | Identify protocol action        |
| Sender PID          | Allow response                  |
| Reference           | Correlate response              |
| Payload             | Carry request data              |
| Version/tag variant | Support evolution               |
| Timeout policy      | Caller-side handling            |
| Error shape         | Make protocol failures explicit |

Elixir example:

```elixir
def request(pid, key) do
  ref = make_ref()
  send(pid, {:get, self(), ref, key})

  receive do
    {:reply, ^ref, value} ->
      {:ok, value}

    {:error, ^ref, reason} ->
      {:error, reason}
  after
    5_000 ->
      {:error, :timeout}
  end
end
```

**Design meaning:** Message protocols are not statically checked. The shape must be documented, tested, and ideally hidden behind API functions.

**Failure-first explanation:** The tempting wrong model is “messages are flexible, so any process can send any term.” The surprising failure is that processes receive unexpected messages, mailbox growth occurs, or a broad receive consumes the wrong message. The correct explanation is that message passing needs protocol design. The professional rule is: tag every nontrivial message, include correlation refs for request-response, hide raw messages behind functions, and monitor or time out where needed. The boundary changes when using `GenServer.call`, `Task`, or other OTP abstractions that implement protocol structure.

**Common Pitfalls:** Do not expose raw message formats across many modules. Provide functions such as `get(pid, key)` or `increment(pid)` that own the protocol.

### Task Pattern: Model Process State — plain values, maps, structs, records, and state variants

Process state is usually just a BEAM value passed through a receive loop or OTP callback.

Elixir `GenServer` state as map:

```elixir
def init(_) do
  {:ok, %{count: 0, status: :idle}}
end

def handle_call(:increment, _from, state) do
  new_state = %{state | count: state.count + 1}
  {:reply, new_state.count, new_state}
end
```

State as struct:

```elixir
defmodule CounterState do
  defstruct count: 0, status: :idle
end
```

Erlang state as record:

```erlang
-record(state, {count = 0, status = idle}).

init([]) ->
    {ok, #state{}}.

handle_call(increment, _From, State = #state{count = Count}) ->
    NewState = State#state{count = Count + 1},
    {reply, Count + 1, NewState}.
```

| State representation      | Use when                     | Strength                              | Pitfall                                   |
| ------------------------- | ---------------------------- | ------------------------------------- | ----------------------------------------- |
| Integer/atom/simple tuple | State is minimal             | Very clear                            | Hard to extend                            |
| Map                       | Flexible state               | Easy incremental fields               | Misspelled keys, weak shape               |
| Struct                    | Stable Elixir state shape    | Clear module-owned state              | May be overkill for tiny state            |
| Record                    | Stable Erlang internal state | Efficient and conventional            | Header coupling                           |
| Tagged state variant      | State machine                | Prevents impossible flag combinations | Needs careful clause coverage             |
| ETS table                 | Large/shared mutable state   | Efficient lookup outside process heap | Requires ownership and cleanup discipline |

**Design meaning:** State belongs to a process because the process serializes access and owns lifecycle. The state value itself is immutable; each callback returns the next state.

**Common Pitfalls:** A `GenServer` should not be used merely to wrap a map if there is no concurrency, lifecycle, or failure-isolation reason. Plain data plus functions may be enough.

### Task Pattern: Model Public APIs — return shape, accepted input shape, and caller obligations

A public API should make caller obligations explicit.

Elixir public function:

```elixir
@spec fetch_user(pos_integer()) :: {:ok, User.t()} | {:error, :not_found | :invalid_id}
def fetch_user(id) when is_integer(id) and id > 0 do
  ...
end

def fetch_user(_) do
  {:error, :invalid_id}
end
```

Erlang public function:

```erlang
-spec fetch_user(pos_integer()) -> {ok, user()} | {error, not_found | invalid_id}.
fetch_user(Id) when is_integer(Id), Id > 0 ->
    ...;
fetch_user(_) ->
    {error, invalid_id}.
```

| API design decision | Good signal                                    | Weak signal                       |                           |
| ------------------- | ---------------------------------------------- | --------------------------------- | ------------------------- |
| Accepted input      | Patterns, guards, docs, specs                  | Only comments                     |                           |
| Failure mode        | Tagged return, bang name, documented exception | Hidden exception                  |                           |
| Domain result       | Struct/record/opaque type                      | Loose map without docs            |                           |
| Optional result     | `{:ok, value}                                  | :error`                           | `nil` without explanation |
| Side effect         | Function name and docs                         | Surprising write/send             |                           |
| Process interaction | API wrapper around message/call                | Raw message exposed               |                           |
| Compatibility       | Stable return shape                            | Changing tuple/map shape silently |                           |

**Design meaning:** In dynamic languages, API shape clarity replaces some of the role played by static signatures in other ecosystems.

**Common Pitfalls:** Do not expose public functions whose return shape changes based on internal convenience. Caller code will become fragile.

### Task Pattern: Express Behavioral Contracts — behaviours, protocols, callbacks, and function arguments

Erlang / Elixir has several ways to model “something that can do X.”

| Contract mechanism    | Erlang                               | Elixir                                  | Use when                          |
| --------------------- | ------------------------------------ | --------------------------------------- | --------------------------------- |
| Behaviour             | `-callback`, `-behaviour`            | `@callback`, `@behaviour`               | A module must implement callbacks |
| OTP behaviour         | `gen_server`, `supervisor`           | `GenServer`, `Supervisor`               | Process architecture callbacks    |
| Protocol              | N/A in same Elixir sense             | `defprotocol`, `defimpl`                | Operation varies by data type     |
| Higher-order function | `fun` argument                       | `fn` argument                           | Behavior is local and simple      |
| Module argument       | `Module:function` or callback module | Module parameter implementing callbacks | Plugin/adapter pattern            |
| Macro DSL             | parse transforms/macros less common  | `use`, `defmacro`                       | Need syntax extension             |

Example Elixir behaviour:

```elixir
defmodule Storage do
  @callback put(binary(), binary()) :: :ok | {:error, term()}
  @callback get(binary()) :: {:ok, binary()} | {:error, :not_found | term()}
end
```

Implementation:

```elixir
defmodule MemoryStorage do
  @behaviour Storage

  @impl true
  def put(_key, _value), do: :ok

  @impl true
  def get(_key), do: {:error, :not_found}
end
```

Protocol:

```elixir
defprotocol Render do
  def render(value)
end
```

**Design meaning:** Behaviours model module-level contracts. Protocols model data-type polymorphism. Higher-order functions model local behavior injection. Macros model syntax extension. Choosing among them is a design decision.

**Common Pitfalls:** Do not create a behaviour when passing a function is enough. Do not create a protocol when the variation is by module/adapter rather than by data type.

### Task Pattern: Define Type Aliases and Opaque Types — documentation, analysis, and representation hiding

Specs do not make Erlang / Elixir fully statically typed, but they are important for professional code.

Erlang:

```erlang
-type user_id() :: pos_integer().
-opaque user() :: #{id := user_id(), name := binary()}.

-spec new_user(user_id(), binary()) -> user().
```

Elixir:

```elixir
@type user_id :: pos_integer()
@opaque t :: %__MODULE__{id: user_id(), name: String.t()}

@spec new(user_id(), String.t()) :: t()
```

| Type form     | Erlang                       | Elixir                | Use                              |
| ------------- | ---------------------------- | --------------------- | -------------------------------- |
| Type alias    | `-type name() :: ... .`      | `@type name :: ...`   | Name common shape                |
| Opaque type   | `-opaque name() :: ... .`    | `@opaque name :: ...` | Hide representation from callers |
| Function spec | `-spec f(T) -> U.`           | `@spec f(t) :: u`     | Document/analyze contract        |
| Callback spec | `-callback f(T) -> U.`       | `@callback f(t) :: u` | Behaviour contract               |
| Private type  | convention/tooling-dependent | `@typep`              | Internal type documentation      |

**Design meaning:** Opaque types are a tool-backed way to say “callers should not rely on the representation.” They work best when modules provide constructors and accessors.

Elixir opaque style:

```elixir
defmodule UserId do
  @opaque t :: pos_integer()

  @spec new(integer()) :: {:ok, t()} | {:error, :invalid}
  def new(id) when is_integer(id) and id > 0, do: {:ok, id}
  def new(_), do: {:error, :invalid}
end
```

**Common Pitfalls:** An opaque type is not magical runtime protection. If callers can construct the raw representation and ignore the API, discipline and tooling are still needed.

### Task Pattern: Convert, Parse, and Normalize Values — explicit transformation across boundaries

Conversion is where many dynamic-language bugs enter.

| Task                                  | Preferred approach                 | Avoid                                            |
| ------------------------------------- | ---------------------------------- | ------------------------------------------------ |
| String to integer                     | Parse with explicit error handling | Assuming valid input                             |
| String to atom                        | Explicit finite mapping            | `String.to_atom/1` on untrusted input            |
| JSON map to struct                    | Validate then construct            | Blind `struct!/2` on untrusted data              |
| External status code to internal atom | Mapping table/function             | Passing external string through all layers       |
| Binary to term                        | Safe decoding if trusted           | `binary_to_term` on untrusted input              |
| Term to binary                        | Explicit serialization boundary    | Treating internal term format as public protocol |
| Map key normalization                 | Controlled key conversion          | Atomizing arbitrary keys                         |

Elixir parse example:

```elixir
def parse_positive_integer(text) when is_binary(text) do
  case Integer.parse(text) do
    {n, ""} when n > 0 -> {:ok, n}
    _ -> {:error, :invalid_integer}
  end
end
```

Erlang parse style:

```erlang
parse_positive_integer(Bin) when is_binary(Bin) ->
    case string:to_integer(binary_to_list(Bin)) of
        {N, []} when N > 0 ->
            {ok, N};
        _ ->
            {error, invalid_integer}
    end.
```

The exact Erlang parsing API can vary by string representation and project convention; the modeling point is explicit success/failure.

**Design meaning:** Parsing converts unknown representation into trusted internal representation. Good parsers return tagged results and avoid partial conversion.

**Common Pitfalls:** Do not parse and silently default unless the default is a real domain rule. Silent defaults hide input errors.

### Task Pattern: Handle Unknown or Untrusted Data — boundary-first modeling

Unknown data includes user input, decoded JSON, external messages, file contents, database rows, network packets, environment variables, and messages from less-trusted processes.

| Boundary         | Unknown shape                          | Recommended first step                    |
| ---------------- | -------------------------------------- | ----------------------------------------- |
| HTTP params      | String-key map                         | Validate and normalize                    |
| JSON body        | String-key map/list/scalars            | Decode, validate schema, convert          |
| File             | Binary                                 | Parse and return tagged result            |
| Network packet   | Binary                                 | Binary pattern match safely               |
| Database         | Rows/maps/structs with nullable fields | Normalize nils and constraints            |
| Environment      | Strings                                | Parse types explicitly                    |
| Process message  | Any term                               | Match tag and validate payload            |
| Distributed node | Serialized terms/messages              | Treat as trust and compatibility boundary |

Elixir boundary module pattern:

```elixir
defmodule UserParams do
  def parse(%{"id" => id_text, "name" => name})
      when is_binary(id_text) and is_binary(name) do
    with {:ok, id} <- parse_id(id_text),
         :ok <- validate_name(name) do
      {:ok, %{id: id, name: String.trim(name)}}
    end
  end

  def parse(_) do
    {:error, :invalid_user_params}
  end

  defp parse_id(text) do
    case Integer.parse(text) do
      {id, ""} when id > 0 -> {:ok, id}
      _ -> {:error, :invalid_id}
    end
  end

  defp validate_name(name) do
    if String.trim(name) == "" do
      {:error, :invalid_name}
    else
      :ok
    end
  end
end
```

**Design meaning:** Boundary modules isolate messy external representation from clean internal data. This is especially valuable in dynamic languages because internal code otherwise inherits all external uncertainty.

**Common Pitfalls:** Do not scatter parameter parsing across business logic. It creates inconsistent rules and makes validation incomplete.

### Task Pattern: Model Domain Commands — command structs, tagged requests, and validation

A command represents an intended operation, often after external input has been validated.

Elixir command struct:

```elixir
defmodule CreateUser do
  defstruct [:name, :email]

  @type t :: %__MODULE__{name: String.t(), email: String.t()}

  def new(%{"name" => name, "email" => email})
      when is_binary(name) and is_binary(email) do
    name = String.trim(name)
    email = String.trim(email)

    if name != "" and email != "" do
      {:ok, %__MODULE__{name: name, email: email}}
    else
      {:error, :invalid_create_user}
    end
  end

  def new(_), do: {:error, :invalid_create_user}
end
```

Erlang command as map:

```erlang
new_create_user(#{<<"name">> := Name, <<"email">> := Email})
  when is_binary(Name), is_binary(Email) ->
    {ok, #{type => create_user, name => Name, email => Email}};
new_create_user(_) ->
    {error, invalid_create_user}.
```

| Command representation | Use when                  | Strength                | Pitfall                     |
| ---------------------- | ------------------------- | ----------------------- | --------------------------- |
| Tagged tuple           | Small internal command    | Easy pattern match      | Positional fields unclear   |
| Map                    | Flexible command          | Easy extension          | Weak shape unless validated |
| Struct                 | Stable Elixir command     | Named and module-scoped | Extra module                |
| Record                 | Erlang internal command   | Fixed and efficient     | Header coupling             |
| Behaviour callback     | Command handled by module | Adapter/plugin systems  | More indirection            |

**Design meaning:** Commands separate “raw request data” from “validated intention.” This is useful for web systems, message processors, job systems, and domain services.

**Common Pitfalls:** Do not let raw external params become the command. The command should represent a trusted operation, not an unvalidated map.

### Task Pattern: Model Domain Events — tagged facts, payloads, and versioning

Events represent something that happened.

Elixir:

```elixir
{:user_created, %{id: id, email: email}}
```

Erlang:

```erlang
{user_created, #{id => Id, email => Email}}
```

More structured Elixir:

```elixir
defmodule UserCreated do
  defstruct [:id, :email, :occurred_at]
end
```

| Event shape     | Use when               | Strength              | Pitfall                     |
| --------------- | ---------------------- | --------------------- | --------------------------- |
| Tagged tuple    | Internal simple event  | Easy matching         | Payload shape informal      |
| Map payload     | Extensible fields      | Easy evolution        | Requires schema discipline  |
| Struct          | Stable event type      | Clear module identity | Versioning still needed     |
| Binary/JSON     | External event bus     | Interoperable         | Must encode/decode/validate |
| Versioned event | Long-lived integration | Handles evolution     | More boilerplate            |

**Design meaning:** Events often cross time or system boundaries. Their representation needs stronger compatibility discipline than short-lived internal values.

**Common Pitfalls:** Do not casually change event payload keys or tuple positions if events are stored, logged, or consumed by other services.

### Task Pattern: Model Errors as Domain Data — reason atoms, structured reasons, and error taxonomies

Error reasons deserve modeling. A generic `:error` is sometimes too weak.

| Error reason shape | Example                                 | Use when                               |
| ------------------ | --------------------------------------- | -------------------------------------- |
| Simple atom        | `:not_found`                            | Small finite reason set                |
| Tagged reason      | `{:invalid_field, :email}`              | Error has structured detail            |
| Map reason         | `%{field: :email, code: :invalid}`      | Many details, external response        |
| Exception struct   | `%File.Error{}`                         | Exception-raising API                  |
| Error list         | `[{:email, :invalid}, {:name, :blank}]` | Validation can produce multiple errors |

Elixir:

```elixir
{:error, {:invalid_field, :email}}
```

Erlang:

```erlang
{error, {invalid_field, email}}
```

Validation example:

```elixir
def validate_email(email) when is_binary(email) do
  if String.contains?(email, "@") do
    :ok
  else
    {:error, {:invalid_field, :email}}
  end
end
```

**Design meaning:** Error data is part of the API. If the caller must branch on the reason, make the reason stable and documented.

**Common Pitfalls:** Avoid using human-readable strings as primary internal error identifiers. Use atoms or structured terms internally; convert to text at presentation boundaries.

### Task Pattern: Model Trust Boundaries — internal atoms, external strings, and safe conversion

A recurring BEAM design problem is deciding where atoms are safe.

| Source                          | Safe internal representation        | Unsafe shortcut                |
| ------------------------------- | ----------------------------------- | ------------------------------ |
| Known code path                 | Atom                                | N/A                            |
| User input status               | Explicit atom mapping               | `String.to_atom/1`             |
| JSON keys                       | String keys or controlled atom keys | Atomize all keys               |
| Database enum                   | Explicit mapping                    | Direct dynamic atom conversion |
| Message tag from trusted module | Atom                                | Usually fine                   |
| Message tag from external node  | Validate                            | Blind trust                    |
| Config file                     | Parse into finite atoms             | Arbitrary atom conversion      |

Explicit mapping:

```elixir
@status_map %{
  "pending" => :pending,
  "approved" => :approved,
  "rejected" => :rejected
}

def parse_status(text) do
  case Map.fetch(@status_map, text) do
    {:ok, status} -> {:ok, status}
    :error -> {:error, :invalid_status}
  end
end
```

**Design meaning:** Atoms are excellent internal symbols but dangerous open-world identifiers. This is one of the sharpest Erlang / Elixir data-modeling boundaries.

**Common Pitfalls:** `String.to_existing_atom/1` is safer than `String.to_atom/1` but still not a general validation strategy. It depends on atoms already existing and can fail unexpectedly. Explicit mapping is clearer.

### Task Pattern: Model Resource Handles — PIDs, ports, sockets, files, refs, and ownership

Resource handles are not ordinary domain data. They represent access to runtime or external resources.

| Resource handle | Representation                                      | Ownership question                          |
| --------------- | --------------------------------------------------- | ------------------------------------------- |
| Process         | PID                                                 | Who supervises it?                          |
| Monitor         | reference                                           | Who receives `DOWN`?                        |
| File            | file descriptor/process/resource term depending API | Who closes it?                              |
| Socket          | port/socket term                                    | Which process owns active/passive mode?     |
| ETS table       | table identifier/name                               | Who creates, owns, deletes it?              |
| Port            | port identifier                                     | Who handles external process communication? |
| NIF resource    | resource object                                     | What native lifetime rules apply?           |

Elixir process monitor:

```elixir
ref = Process.monitor(pid)
```

Erlang:

```erlang
Ref = erlang:monitor(process, Pid).
```

**Design meaning:** Handles should be modeled with lifecycle and ownership. Passing a PID or socket around is passing operational authority, not just data.

**Common Pitfalls:** Do not store PIDs or sockets in long-lived external data as if they remain valid forever. Processes and resources have lifetimes.

### Task Pattern: Model Shared or Large State — process ownership, ETS, persistent_term, and external stores

Most state should have a clear owner. Sometimes plain process state is not the right shape.

| State strategy                | Use when                                  | Strength                  | Cost                                    |
| ----------------------------- | ----------------------------------------- | ------------------------- | --------------------------------------- |
| Function-local immutable data | Computation is local                      | Simple                    | Not shared                              |
| GenServer state               | Serialized access and lifecycle needed    | Clear owner               | Bottleneck risk                         |
| ETS                           | Large/shared read-heavy or mutable lookup | Fast VM table             | Ownership and consistency complexity    |
| `persistent_term`             | Rarely changing global data               | Very fast reads           | Expensive updates; global impact        |
| Database                      | Durable state                             | Persistence and query     | External failure/latency                |
| Cache process                 | Coordinated cache behavior                | Encapsulated policy       | Process bottleneck unless designed well |
| Registry                      | Process lookup                            | Dynamic process discovery | Not a general database                  |

Elixir ETS example:

```elixir
table = :ets.new(:users, [:set, :public, read_concurrency: true])
:ets.insert(table, {1, %{name: "Ada"}})
:ets.lookup(table, 1)
```

**Design meaning:** BEAM process state is excellent for ownership and fault isolation, but not every shared data problem should become one `GenServer`. ETS exists partly because a single process can become a bottleneck for large concurrent lookup workloads.

**Common Pitfalls:** Do not use `persistent_term` as a general mutable config store. It is optimized for rare writes and frequent reads.

### Task Pattern: Model Collections by Transformation — eager lists, streams, comprehensions, and reducers

Collection modeling is also about processing strategy.

Elixir eager pipeline:

```elixir
users
|> Enum.map(&normalize_user/1)
|> Enum.filter(&active?/1)
```

Elixir lazy stream:

```elixir
users
|> Stream.map(&normalize_user/1)
|> Stream.filter(&active?/1)
|> Enum.take(10)
```

Erlang list processing:

```erlang
ActiveUsers =
    lists:filter(fun active/1,
        lists:map(fun normalize_user/1, Users)).
```

| Processing model             | Use when                                        | Strength                             | Pitfall                       |
| ---------------------------- | ----------------------------------------------- | ------------------------------------ | ----------------------------- |
| `Enum` / `lists` eager       | Data is reasonably sized                        | Simple and clear                     | Intermediate lists            |
| `Stream`                     | Potentially large/infinite or early termination | Lazy composition                     | Delayed errors, complexity    |
| Comprehension                | Generate/filter/transform                       | Compact declarative syntax           | Poor for complex branching    |
| `reduce`/fold                | Accumulation                                    | General and explicit                 | Accumulator complexity        |
| Recursion                    | Custom traversal/control                        | Precise                              | Reinventing library functions |
| Flow/Broadway-like ecosystem | Concurrent data processing                      | Throughput and backpressure patterns | Framework complexity          |

**Design meaning:** Erlang / Elixir encourages transformation over mutation. The key modeling choice is whether data should be processed eagerly, lazily, recursively, or through a concurrent pipeline.

**Common Pitfalls:** Do not assume `|>` creates laziness. In Elixir, `Enum` is eager; `Stream` is lazy.

### Task Pattern: Model Numeric Data — integers, floats, decimals, and domain precision

BEAM integers are arbitrary precision; floats are floating-point. Domain precision still matters.

| Numeric need                           | Representation                         | Use                           |
| -------------------------------------- | -------------------------------------- | ----------------------------- |
| Count/index                            | integer                                | Natural BEAM integer          |
| Measurement with approximate precision | float                                  | Scientific/approximate values |
| Money/decimal precision                | decimal library or integer minor units | Avoid float errors            |
| Ratio                                  | tuple or decimal/rational library      | Exact ratio if needed         |
| External numeric string                | parse explicitly                       | Boundary validation           |
| Binary protocol number                 | bit syntax with size/endian            | Wire compatibility            |

Elixir:

```elixir
10 / 3
div(10, 3)
rem(10, 3)
```

Erlang:

```erlang
10 / 3.
10 div 3.
10 rem 3.
```

**Design meaning:** Dynamic typing does not remove numeric domain decisions. Money, counters, percentages, durations, timestamps, and binary protocol fields have different correctness requirements.

**Common Pitfalls:** Do not use floats for exact financial values. Do not assume `/` performs integer division.

### Task Pattern: Model Time and Dates — calendar values, durations, monotonic time, and timestamps

Time modeling requires distinguishing wall-clock time from durations and monotonic measurement.

| Need                  | Erlang/Elixir concept                            | Use                                  |
| --------------------- | ------------------------------------------------ | ------------------------------------ |
| Calendar date         | `Date` in Elixir, calendar modules               | Domain date                          |
| Date-time             | `DateTime`, Erlang calendar/time APIs            | Timestamp with timezone/UTC handling |
| Naive date-time       | `NaiveDateTime`                                  | Date-time without timezone           |
| Duration              | integer in native/millisecond/etc units          | Timeouts, intervals                  |
| Monotonic measurement | `System.monotonic_time`, `erlang:monotonic_time` | Measuring elapsed time               |
| System time           | `System.system_time`, `erlang:system_time`       | Wall-clock-ish timestamp             |
| Timeout               | milliseconds in many APIs                        | Process receive/call timeout         |

Elixir:

```elixir
started = System.monotonic_time(:millisecond)
# work
elapsed = System.monotonic_time(:millisecond) - started
```

**Design meaning:** Wall-clock time can change. Monotonic time is for measuring durations. Timeouts are operational values and should be modeled separately from calendar dates.

**Common Pitfalls:** Do not use wall-clock time to measure elapsed duration in systems code. Use monotonic time.

### Task Pattern: Model Module-Level Constants and Configuration — compile-time versus runtime

Elixir module attribute constant:

```elixir
defmodule Worker do
  @default_timeout 5_000

  def default_timeout, do: @default_timeout
end
```

Erlang macro:

```erlang
-define(DEFAULT_TIMEOUT, 5000).

default_timeout() ->
    ?DEFAULT_TIMEOUT.
```

| Configuration kind    | Use                                   | Avoid                                         |
| --------------------- | ------------------------------------- | --------------------------------------------- |
| Compile-time constant | Truly stable value                    | Runtime environment-dependent values          |
| Application env       | App-level configuration               | Hidden global dependency everywhere           |
| Function argument     | Local explicit configuration          | Excessive parameter threading if truly global |
| Process state         | Runtime mutable component config      | Global unrelated config                       |
| Struct/config object  | Complex validated config              | Loose keyword list across many layers         |
| `persistent_term`     | Rarely changed global read-heavy data | Frequently changing values                    |

**Design meaning:** Configuration is data modeling plus lifecycle. A compile-time constant and runtime config value have different update behavior and operational meaning.

**Common Pitfalls:** Do not read application environment deep inside business logic everywhere. Normalize configuration near startup or boundary modules when possible.

### Task Pattern: Model Interop Data Between Erlang and Elixir — same terms, different conventions

Erlang and Elixir share BEAM terms, but not all conventions.

| Concept      | Erlang convention                      | Elixir convention     | Interop rule                                    |
| ------------ | -------------------------------------- | --------------------- | ----------------------------------------------- |
| Atom         | `ok`                                   | `:ok`                 | Same runtime atom                               |
| Module       | `my_module`                            | `MyModule`            | Both module names are atoms                     |
| String       | often charlist or binary depending API | UTF-8 binary          | Check API expectations                          |
| Options      | proplist                               | keyword list          | Both often list of tuples                       |
| Record       | common                                 | uncommon              | Elixir can read tuple shape only with knowledge |
| Struct       | not native convention                  | map with `__struct__` | Erlang sees it as map                           |
| Maps         | `#{key => value}`                      | `%{key => value}`     | Same runtime type                               |
| Binaries     | `<<...>>`                              | `<<...>>`             | Shared                                          |
| Return tuple | `{ok, Value}`                          | `{:ok, value}`        | Shared shape                                    |

Elixir calling Erlang:

```elixir
:gen_tcp.listen(4040, [:binary, active: false])
```

This passes an Elixir keyword list/proplist-like option list to an Erlang API.

**Design meaning:** Interop is easy because terms are shared, but conventions still matter. The hardest interop problems are often text representation, records, options, and documentation assumptions.

**Common Pitfalls:** Do not assume an Erlang API accepts Elixir structs or Elixir-style strings unless documented. At runtime a struct is a map, but the Erlang library may not know or care about Elixir struct conventions.
### Task Pattern: Derive Types from Values — structs, maps, pattern heads, and runtime shape inference

In Erlang / Elixir, “derive type from value” usually means **recognize runtime shape** and then route behavior through patterns, guards, protocols, or explicit checks. There is no TypeScript-like `typeof` / `keyof` type-level derivation system. The usual mechanism is runtime shape analysis plus specs for documentation and tools.

| Need                       | Erlang / Elixir mechanism               | Example                         | Limit                                  |
| -------------------------- | --------------------------------------- | ------------------------------- | -------------------------------------- |
| Recognize primitive type   | Guard predicates                        | `is_integer(x)`, `is_binary(x)` | Guard set is restricted                |
| Recognize tuple variant    | Pattern match on tag                    | `{:ok, value}`                  | No static exhaustiveness               |
| Recognize struct type      | Struct pattern                          | `%User{} = user`                | Elixir-specific; runtime is map        |
| Recognize map shape        | Required-key pattern                    | `%{id: id}`                     | Extra keys allowed                     |
| Recognize record shape     | Record syntax                           | `#user{id = Id}`                | Compile-time record knowledge required |
| Recognize process message  | Tagged tuple pattern                    | `{:reply, ref, value}`          | Protocol not statically enforced       |
| Recognize behavior support | Behaviour declaration / callback module | `@behaviour Storage`            | Module-level, not value-level dispatch |
| Recognize protocol support | Elixir protocol dispatch                | `String.Chars.to_string(value)` | Only for implemented protocols         |

Elixir runtime shape routing:

```elixir
def normalize(%User{} = user), do: normalize_user(user)
def normalize(%Admin{} = admin), do: normalize_admin(admin)
def normalize(%{type: :guest} = guest), do: normalize_guest(guest)
def normalize(_), do: {:error, :unsupported_shape}
```

Erlang shape routing:

```erlang
normalize({user, Id, Name}) ->
    normalize_user(Id, Name);
normalize({admin, Id, Name}) ->
    normalize_admin(Id, Name);
normalize(#{type := guest} = Guest) ->
    normalize_guest(Guest);
normalize(_) ->
    {error, unsupported_shape}.
```

**Design meaning:** The language encourages **value-directed programming**. Shape is not hidden behind class hierarchies. It is visible in patterns.

**Professional rule:** Derive behavior from value shape when the data variants are local and explicit. Use protocols or behaviours when the variation is architectural and should be extensible.

**Common Pitfalls:** Do not simulate a static type switch with large fragile `case` blocks over many unrelated shapes. If new variants should be added by other modules, a protocol or behaviour may be better.

### Task Pattern: Narrow Values — from broad input to trusted internal shape

Narrowing means taking a broad value and proving enough about it to treat it as a narrower domain value.

In statically typed languages, narrowing may happen in the compiler’s type system. In Erlang / Elixir, narrowing is usually runtime pattern matching, guards, and validation.

Elixir:

```elixir
def normalize_id(value) when is_integer(value) and value > 0 do
  {:ok, value}
end

def normalize_id(value) when is_binary(value) do
  case Integer.parse(value) do
    {id, ""} when id > 0 -> {:ok, id}
    _ -> {:error, :invalid_id}
  end
end

def normalize_id(_) do
  {:error, :invalid_id}
end
```

Erlang:

```erlang
normalize_id(Value) when is_integer(Value), Value > 0 ->
    {ok, Value};
normalize_id(Value) when is_binary(Value) ->
    case string:to_integer(binary_to_list(Value)) of
        {Id, []} when Id > 0 ->
            {ok, Id};
        _ ->
            {error, invalid_id}
    end;
normalize_id(_) ->
    {error, invalid_id}.
```

| Narrowing target        | Mechanism               | Good result shape    |                             |
| ----------------------- | ----------------------- | -------------------- | --------------------------- |
| Positive integer        | Guard and parse         | `{:ok, id}           | {:error, :invalid_id}`      |
| Known atom status       | Explicit mapping        | `{:ok, :pending}     | {:error, :invalid_status}`  |
| Non-empty string/binary | Guard + size check      | `{:ok, binary}       | {:error, :blank}`           |
| Valid struct            | Constructor             | `{:ok, %User{}}      | {:error, reason}`           |
| Valid message           | Pattern + payload check | `{:ok, message}      | {:error, :invalid_message}` |
| Valid binary packet     | Binary pattern          | `{:ok, packet, rest} | {:error, reason}`           |

**Design meaning:** Narrowing is a boundary operation. Once narrowed, internal code should not repeatedly re-validate the same facts unless the value crosses a new trust boundary.

**Failure-first explanation:** The tempting wrong model is to accept `term()` everywhere and then use defensive checks at every call site. The surprising result is duplicated, inconsistent validation. The correct explanation is that dynamic languages need disciplined narrowing boundaries. The professional rule is: normalize broad input into narrow domain values as early as possible, then keep the internal representation stable. The boundary changes if values are serialized, stored, received from another process, or modified by external systems.

**Common Pitfalls:** Avoid functions whose spec is effectively `term() -> term()` unless the function is truly generic. Overly broad input and output shapes erase design information.

### Task Pattern: Cast Values — why “casting” is usually parsing or conversion

Erlang / Elixir does not have cast syntax like C, Java, or TypeScript. Most “casting” is one of four different operations:

| Operation               | Meaning                                | Example                |
| ----------------------- | -------------------------------------- | ---------------------- |
| Parsing                 | External text/binary to internal value | `"123"` to `123`       |
| Conversion              | One internal representation to another | charlist to binary     |
| Assertion               | Require a value to have a shape        | `%User{} = value`      |
| Coercion by API         | Library accepts multiple shapes        | iodata accepted by I/O |
| Unsafe reinterpretation | Rare / native / binary-level           | NIFs, binary protocols |

Elixir examples:

```elixir
String.to_integer("123")
Integer.parse("123")
List.to_string(~c"abc")
String.to_charlist("abc")
```

Erlang examples:

```erlang
binary_to_list(<<"abc">>).
list_to_binary("abc").
```

**Decision table:**

| Need                        | Prefer                              | Avoid                                              |
| --------------------------- | ----------------------------------- | -------------------------------------------------- |
| External text to integer    | `Integer.parse/1` or checked parser | Blind `String.to_integer/1` if failure is expected |
| Known finite string to atom | Explicit mapping                    | Dynamic atom creation                              |
| Binary to term              | Safe decoder only for trusted data  | `binary_to_term` on untrusted data                 |
| Struct from map             | Validating constructor              | Blindly trusting arbitrary map                     |
| List to binary              | Explicit conversion                 | Assuming strings/lists are interchangeable         |
| Runtime shape assertion     | Pattern match                       | Fake “cast” terminology                            |

**Design meaning:** The absence of cast syntax is a useful signal. Erlang / Elixir wants conversion to be explicit and ordinary, not a type-system escape hatch.

**Common Pitfalls:** Do not describe `String.to_atom/1` as a harmless cast. It creates or refers to VM atoms and has runtime consequences.

### Task Pattern: Define Public Domain Types — modules as type owners

A common Elixir pattern is to let a module own a struct and its type.

```elixir
defmodule Email do
  @opaque t :: %__MODULE__{value: String.t()}

  defstruct [:value]

  @spec new(String.t()) :: {:ok, t()} | {:error, :invalid_email}
  def new(value) when is_binary(value) do
    value = String.trim(value)

    if String.contains?(value, "@") do
      {:ok, %__MODULE__{value: value}}
    else
      {:error, :invalid_email}
    end
  end

  def new(_), do: {:error, :invalid_email}

  @spec to_string(t()) :: String.t()
  def to_string(%__MODULE__{value: value}), do: value
end
```

Equivalent Erlang style might use an opaque type over a binary:

```erlang
-opaque email() :: binary().

-spec new_email(binary()) -> {ok, email()} | {error, invalid_email}.
new_email(Value) when is_binary(Value) ->
    case valid_email(Value) of
        true -> {ok, Value};
        false -> {error, invalid_email}
    end;
new_email(_) ->
    {error, invalid_email}.

-spec email_to_binary(email()) -> binary().
email_to_binary(Email) ->
    Email.
```

| Design goal                    | Tool                      | Why                             |
| ------------------------------ | ------------------------- | ------------------------------- |
| Prevent arbitrary construction | Opaque type + constructor | Callers use API                 |
| Document domain meaning        | Named type                | More meaningful than `binary()` |
| Validate once                  | `new/1` or constructor    | Creates trusted value           |
| Hide representation            | `@opaque` / `-opaque`     | Allows future changes           |
| Provide safe access            | Functions                 | Avoid exposing raw structure    |

**Design meaning:** A domain type is not only a data shape. It is a module boundary plus construction rules plus documentation plus optional analyzer support.

**Common Pitfalls:** Defining a struct without a validating constructor may provide field names but not domain integrity. A `%Email{value: "not email"}` is still possible unless construction is controlled by convention and API discipline.

### Task Pattern: Use Opaque Types to Protect Representation — promise, not prison

Opaque types are a contract with tools and readers: external callers should not rely on the representation.

Elixir:

```elixir
defmodule Token do
  @opaque t :: %__MODULE__{value: binary()}

  defstruct [:value]

  @spec new(binary()) :: t()
  def new(value) when is_binary(value) do
    %__MODULE__{value: value}
  end

  @spec value(t()) :: binary()
  def value(%__MODULE__{value: value}), do: value
end
```

Erlang:

```erlang
-opaque token() :: binary().

-spec new_token(binary()) -> token().
new_token(Value) when is_binary(Value) ->
    Value.

-spec token_value(token()) -> binary().
token_value(Token) ->
    Token.
```

| Opaque type benefit               | Cost                                   |
| --------------------------------- | -------------------------------------- |
| Allows representation changes     | Requires API functions                 |
| Communicates abstraction boundary | Not fully enforced at runtime          |
| Helps Dialyzer-style analysis     | Tooling must be configured and trusted |
| Reduces caller coupling           | More boilerplate                       |
| Supports domain vocabulary        | Requires discipline                    |

**Design meaning:** Opaqueness is a **maintenance boundary**, not a security boundary. It is designed to prevent representation coupling, not malicious access.

**Common Pitfalls:** Do not expose the raw struct fields everywhere and still expect `@opaque` to preserve abstraction in practice. Tooling helps, but API design matters more.

### Task Pattern: Use Specs Without Pretending They Are Full Static Types

Specs are indispensable for professional Erlang / Elixir, but they must be understood correctly.

Elixir:

```elixir
@spec fetch_user(pos_integer()) :: {:ok, User.t()} | {:error, :not_found}
def fetch_user(id) do
  ...
end
```

Erlang:

```erlang
-spec fetch_user(pos_integer()) -> {ok, user()} | {error, not_found}.
fetch_user(Id) ->
    ...
```

| Spec role             | What it provides                                     | What it does not provide                   |
| --------------------- | ---------------------------------------------------- | ------------------------------------------ |
| Documentation         | Shows expected input/output                          | Does not force all callers at compile time |
| Static analysis input | Dialyzer and related tools can detect contradictions | Not a conventional sound type checker      |
| API contract          | Helps maintainers and users                          | Can become stale                           |
| Callback contract     | Documents behaviours                                 | Runtime dispatch still dynamic             |
| Opaque boundary       | Helps hide representation                            | Runtime can still expose raw values        |

**Language-design note:** Dialyzer uses success typing, which aims to find definite discrepancies rather than enforce a full static discipline. This is valuable but different from Hindley–Milner inference, Rust’s borrow/type system, Java’s nominal static checking, or TypeScript’s structural checking.

**Failure-first explanation:** The tempting wrong model is “I wrote an `@spec`, so wrong calls are prevented.” The surprising behavior is that the program can still compile and run until runtime failure if analysis is not run or cannot prove the issue. The correct explanation is that specs are contracts for readers and analyzers, not mandatory type barriers. The professional rule is: write accurate specs for public APIs and complex internal functions; run analysis in CI where appropriate; still validate external data at runtime. The boundary changes as Elixir’s type-checking work evolves, but the BEAM ecosystem remains fundamentally runtime-value based.

**Common Pitfalls:** Do not write overly broad specs such as `term() -> term()` unless the function is truly generic. They provide little design information.

### Task Pattern: Choose Between Behaviour, Protocol, Struct, and Function Argument

Many design mistakes come from choosing the wrong abstraction mechanism.

| Need                                        | Best fit                  | Reason                     |
| ------------------------------------------- | ------------------------- | -------------------------- |
| A module must implement callbacks           | Behaviour                 | Module-level contract      |
| Data type controls operation implementation | Elixir protocol           | Dispatch by data type      |
| Data has named fields and identity          | Struct                    | Domain shape               |
| Local custom behavior                       | Function argument         | Simple and explicit        |
| Runtime process with state/lifecycle        | GenServer / process       | Concurrency and ownership  |
| Compile-time DSL                            | Macro                     | Syntax generation          |
| External adapter                            | Behaviour + module config | Swappable implementation   |
| Simple variant handling                     | Function clauses          | Pattern matching is enough |

Example: storage adapter as behaviour.

```elixir
defmodule Storage do
  @callback put(binary(), binary()) :: :ok | {:error, term()}
  @callback get(binary()) :: {:ok, binary()} | {:error, :not_found | term()}
end
```

Example: rendering by data type as protocol.

```elixir
defprotocol Render do
  def render(value)
end
```

Example: one-off customization as function argument.

```elixir
def sort_users(users, ranking_fun) when is_function(ranking_fun, 1) do
  Enum.sort_by(users, ranking_fun)
end
```

**Design meaning:** Not all polymorphism is the same. Erlang / Elixir gives several mechanisms because BEAM systems need module contracts, data contracts, callback contracts, process contracts, and syntax-level DSLs.

**Common Pitfalls:** Avoid using `GenServer` as a polymorphism mechanism. A process is not a substitute for a function, protocol, or behaviour.

### Task Pattern: Model Generic Helpers — higher-order functions, protocols, behaviours, and specs

A generic helper should make its assumptions explicit.

Elixir higher-order helper:

```elixir
@spec index_by(Enumerable.t(), (term() -> term())) :: map()
def index_by(items, key_fun) when is_function(key_fun, 1) do
  Map.new(items, fn item -> {key_fun.(item), item} end)
end
```

Erlang higher-order helper:

```erlang
-spec index_by([T], fun((T) -> K)) -> #{K => T}.
index_by(Items, KeyFun) ->
    maps:from_list([{KeyFun(Item), Item} || Item <- Items]).
```

| Genericity mechanism  | Use when                                 | Example                                                    |
| --------------------- | ---------------------------------------- | ---------------------------------------------------------- |
| Higher-order function | Behavior is local                        | mapper, predicate, key extractor                           |
| Protocol              | Operation varies by data type            | render, encode, inspect                                    |
| Behaviour             | Module provides swappable implementation | storage, transport, parser                                 |
| Macro                 | Need syntax or compile-time generation   | schema, route, test DSL                                    |
| Spec type variable    | Document generic relation                | `@spec first([t]) :: t when t: var` style depending syntax |
| Pattern + guard       | Small runtime genericity                 | handle integers and binaries separately                    |

**Design meaning:** Generic code in Erlang / Elixir is usually runtime-generic, not statically parametric in the ML/Haskell/Rust sense. Specs can describe generic relationships, but runtime remains dynamic.

**Common Pitfalls:** Avoid “generic” helpers that accept anything and fail with unclear errors. Generic code should still have clear accepted shapes.

### Task Pattern: Model Collections with Domain Meaning — not every list is just a list

A list of users, a queue of jobs, a set of IDs, and a sequence of bytes have different semantics. Data structure choice should express that.

| Domain meaning            | Good representation                       | Weak representation                     |
| ------------------------- | ----------------------------------------- | --------------------------------------- |
| Ordered sequence of items | list                                      | map with numeric keys                   |
| Unique set of IDs         | `MapSet` in Elixir, `sets`/maps in Erlang | list with manual duplicate checks       |
| FIFO queue                | `:queue` / Erlang `queue`                 | repeated list append                    |
| Lookup by ID              | map or ETS                                | list search everywhere                  |
| Byte payload              | binary                                    | list of integers unless API requires it |
| Output chunks             | iodata                                    | repeated binary concatenation           |
| Stream of records         | `Stream`/producer abstraction             | eager full list if huge                 |
| Process registry          | `Registry`/ETS/OTP registry patterns      | global dynamic atoms                    |

Elixir set:

```elixir
ids = MapSet.new([1, 2, 3])
MapSet.member?(ids, 2)
```

Erlang map-as-set style:

```erlang
Ids = #{1 => true, 2 => true, 3 => true},
maps:is_key(2, Ids).
```

**Design meaning:** A collection’s representation should communicate the operations expected on it. Lists are not universal containers.

**Common Pitfalls:** Do not use lists for repeated membership checks over large collections. Use maps, sets, or ETS depending on size, sharing, and lifecycle.

### Task Pattern: Model Key Types — atom keys, string keys, tuple keys, and composite keys

Map keys can be many term types. Key choice is a modeling decision.

| Key type          | Use when                | Example                           | Pitfall                                    |
| ----------------- | ----------------------- | --------------------------------- | ------------------------------------------ |
| Atom key          | Internal known field    | `%{id: 1}`                        | Unsafe if generated from external input    |
| String/binary key | External JSON/user data | `%{"id" => 1}`                    | Less ergonomic internally                  |
| Integer key       | Numeric identity        | `%{123 => user}`                  | Domain meaning must be clear               |
| Tuple key         | Composite identity      | `%{{tenant_id, user_id} => user}` | Can become unreadable                      |
| Struct key        | Rare, domain-specific   | `%{date => events}`               | Requires equality/hash semantics awareness |
| PID/ref key       | Runtime correlation     | `%{ref => caller}`                | Runtime-only lifecycle                     |

Elixir composite key:

```elixir
sessions = %{{tenant_id, user_id} => session}
```

Erlang:

```erlang
Sessions = #{{TenantId, UserId} => Session}.
```

**Design meaning:** Because BEAM maps allow many key types, key discipline matters. The key type should reveal whether data is external, internal, composite, runtime-only, or persistent.

**Common Pitfalls:** Mixing atom and string keys in the same map causes subtle bugs.

```elixir
%{"id" => 1, id: 2}
```

This map has two different keys.

### Task Pattern: Model Nested Data — deep maps, structs, lenses, and update discipline

Nested data is common in decoded JSON and domain structures.

Elixir nested update:

```elixir
put_in(user.profile.name, "Ada")
update_in(user.stats.login_count, &(&1 + 1))
get_in(data, ["user", "profile", "name"])
```

| Task                | Elixir tool                 | Use                    |
| ------------------- | --------------------------- | ---------------------- |
| Get nested value    | `get_in/2`                  | Safe traversal         |
| Put nested value    | `put_in/2`                  | Nested update          |
| Update nested value | `update_in/2`               | Transform nested value |
| Access dynamic path | `get_in(data, path)`        | Runtime path           |
| Struct field access | `user.profile.name`         | Known fields           |
| Manual match        | `%{profile: %{name: name}}` | Required nested shape  |

Erlang often uses nested pattern matching or maps functions:

```erlang
#{profile := #{name := Name}} = User.
```

**Design meaning:** Deep nested maps are flexible but can become weakly modeled. If nested structure is stable and domain-important, structs or smaller modules may improve clarity.

**Common Pitfalls:** Overusing `get_in` with long dynamic paths can hide missing schema design. Sometimes a named function like `user_display_name(User)` is clearer.

### Task Pattern: Model Versioned Data — compatibility, evolution, and tagged schemas

Long-lived data needs versioning: persisted events, external messages, distributed protocol payloads, cache formats, and serialized terms.

| Versioning strategy                 | Example                       | Use when                   |
| ----------------------------------- | ----------------------------- | -------------------------- |
| Version field                       | `%{version: 2, ...}`          | External/persisted maps    |
| Tagged tuple version                | `{:user_created, 2, payload}` | Internal/external events   |
| Module versioning                   | `UserV2`                      | Major representation split |
| Migration function                  | `upgrade(data)`               | Reading old stored data    |
| Backward-compatible optional fields | map with defaults             | Additive changes           |
| Protocol negotiation                | version exchange              | Distributed systems        |

Elixir event:

```elixir
%{
  type: :user_created,
  version: 2,
  id: id,
  email: email,
  occurred_at: occurred_at
}
```

Erlang:

```erlang
#{
    type => user_created,
    version => 2,
    id => Id,
    email => Email,
    occurred_at => OccurredAt
}
```

**Design meaning:** Internal short-lived data can evolve freely. Persisted or distributed data cannot. Once data crosses time or service boundaries, representation is part of a compatibility contract.

**Common Pitfalls:** Do not store raw internal structs or Erlang terms as long-term public formats unless versioning and migration are planned.

### Task Pattern: Serialize and Deserialize Terms — external formats versus BEAM terms

Serialization is a boundary decision.

| Format                      | Use when                     | Strength                    | Risk                                     |
| --------------------------- | ---------------------------- | --------------------------- | ---------------------------------------- |
| JSON                        | Web/external APIs            | Interoperable               | Loses atoms/tuples/PIDs                  |
| Erlang external term format | BEAM-to-BEAM trusted systems | Preserves BEAM terms        | Unsafe if decoded from untrusted sources |
| MessagePack/CBOR/etc.       | Compact external data        | Interoperable/typed options | Library and schema discipline            |
| Binary protocol             | Performance/protocol control | Compact and explicit        | More manual parsing                      |
| Database rows               | Persistence                  | Queryable/durable           | Schema mismatch                          |
| Plain text                  | Human-facing config/logs     | Simple                      | Ambiguous parsing                        |

Elixir:

```elixir
binary = :erlang.term_to_binary({:ok, %{id: 1}})
term = :erlang.binary_to_term(binary)
```

**Security boundary:** Decoding arbitrary external term format can be dangerous. Treat it as trusted-only unless using safe options and understanding the limits.

**Design meaning:** Serialization often destroys or changes type information. A tuple may become a JSON array; atom keys may become strings; PIDs may not be meaningful outside the VM. Design the serialized schema deliberately.

**Common Pitfalls:** Do not expose Erlang external term format as a public API format unless the clients are trusted BEAM nodes and compatibility/security are understood.

### Task Pattern: Model Database Data — persistence shape versus domain shape

Database records are not automatically domain models.

| Database concern   | Domain concern                       |
| ------------------ | ------------------------------------ |
| Nullable column    | Optional domain value                |
| Foreign key        | Associated identity or loaded entity |
| Enum column        | Internal atom or tagged state        |
| Timestamp          | Date/time domain value               |
| JSON column        | Unknown nested data until validated  |
| Row struct/schema  | Persistence representation           |
| Transaction result | Operation result protocol            |

In Elixir, Ecto schemas often become the practical persistence/domain boundary, but Ecto is an ecosystem tool, not core language semantics. The modeling distinction still matters:

```elixir
case Repo.get(UserSchema, id) do
  nil -> {:error, :not_found}
  schema -> {:ok, User.from_schema(schema)}
end
```

**Design meaning:** A database schema may be close to a domain struct, but it is shaped by persistence concerns. Treat conversion between persistence and domain as a boundary when invariants differ.

**Common Pitfalls:** Do not let database nullability leak everywhere as `nil` if the domain should have a stronger absence model.

### Task Pattern: Model JSON and API Data — string keys, atom keys, and schema conversion

JSON does not have atoms, tuples, PIDs, refs, or structs. Decoding JSON into BEAM terms is a lossy conceptual conversion.

JSON object:

```json
{"id": 1, "status": "active"}
```

Typical decoded Elixir map:

```elixir
%{"id" => 1, "status" => "active"}
```

Internal domain:

```elixir
%User{id: 1, status: :active}
```

| JSON concept  | BEAM internal candidate       | Conversion concern           |
| ------------- | ----------------------------- | ---------------------------- |
| Object        | map/struct                    | Key type and required fields |
| Array         | list                          | Element validation           |
| String enum   | atom through explicit mapping | Atom safety                  |
| Number        | integer/float/decimal         | Precision and range          |
| Null          | `nil` or tagged absence       | Meaning of absence           |
| Boolean       | boolean atoms                 | Usually direct               |
| Nested object | nested map/struct             | Schema validation            |

**Design meaning:** JSON decoding is not validation. It only converts syntax into generic data. Domain modeling begins after decoding.

**Common Pitfalls:** Do not use atom-key JSON decoding on untrusted arbitrary keys unless the decoder and options are explicitly safe and bounded.

### Task Pattern: Model Security-Sensitive Data — secrets, tokens, and accidental inspection

Secrets are data with handling constraints.

| Data kind             | Modeling concern                                                 |
| --------------------- | ---------------------------------------------------------------- |
| Password              | Never store plaintext; avoid logging                             |
| Token                 | Avoid accidental `inspect` output                                |
| API key               | Keep out of process crash logs                                   |
| Session ID            | Treat as secret identifier                                       |
| Private key           | Use specialized libraries and memory care                        |
| Authentication result | Avoid leaking reason details if sensitive                        |
| User input            | Validate before atom conversion, command use, or deserialization |

Elixir structs can implement protocols to control inspection:

```elixir
defmodule Secret do
  defstruct [:value]

  defimpl Inspect do
    def inspect(_secret, _opts), do: "#Secret<redacted>"
  end
end
```

**Design meaning:** BEAM makes values easy to inspect, log, send, and crash-report. That is excellent for debugging and dangerous for secrets.

**Common Pitfalls:** Do not put raw secrets into ordinary structs/maps that are freely logged or inspected. Redaction should be part of the data model.

### Task Pattern: Model Effects in Return Values — pure transformation versus side-effectful operation

A function’s data model should reveal whether it performs effects.

| Function kind       | Example return          | Meaning                          |                             |
| ------------------- | ----------------------- | -------------------------------- | --------------------------- |
| Pure transformation | `new_value`             | No external effect expected      |                             |
| Validation          | `:ok                    | {:error, reason}`                | Checks input                |
| Lookup              | `{:ok, value}           | :error`                          | May miss                    |
| External I/O        | `{:ok, result}          | {:error, reason}`                | Failure expected            |
| Process call        | `reply` or timeout/exit | Runtime process interaction      |                             |
| Start process       | `{:ok, pid}             | {:error, reason}`                | Resource/lifecycle creation |
| Bang operation      | value or raises         | Failure is exceptional/invariant |                             |

Example naming distinction:

```elixir
normalize_user(user)
save_user(user)
start_user_worker(user)
```

The names should indicate increasing effect level.

**Design meaning:** Erlang / Elixir is not pure. Effects are common. Good APIs make effects visible through naming, return shapes, and module boundaries.

**Common Pitfalls:** Do not hide external I/O behind a function that looks like a pure getter. `user_name(id)` that calls a database is misleading; `fetch_user_name(id)` is clearer.

### Task Pattern: Model Process-Oriented APIs — hiding messages behind functions

Raw message shapes should usually be hidden behind module functions.

Bad public style:

```elixir
send(pid, {:increment, 1})
send(pid, {:get, self(), make_ref()})
```

Better:

```elixir
Counter.increment(pid, 1)
Counter.get(pid)
```

Implementation can use `GenServer`, raw messages, or another mechanism internally.

```elixir
def increment(pid, amount) do
  GenServer.cast(pid, {:increment, amount})
end

def get(pid) do
  GenServer.call(pid, :get)
end
```

Erlang style:

```erlang
increment(Pid, Amount) ->
    gen_server:cast(Pid, {increment, Amount}).

get(Pid) ->
    gen_server:call(Pid, get).
```

| API layer                | Exposes                 | Hides                   |
| ------------------------ | ----------------------- | ----------------------- |
| Public function          | Domain operation        | Message tuple shape     |
| GenServer callback       | Protocol implementation | Caller details          |
| Supervisor child spec    | Startup contract        | Process internals       |
| Registry lookup function | Name resolution         | Registry implementation |

**Design meaning:** Process APIs should look like domain operations, not mailbox manipulation. The message protocol is an implementation detail unless the module is explicitly a low-level protocol module.

**Common Pitfalls:** If many modules construct the same message tuples, changing the protocol becomes hard. Centralize message construction.

### Task Pattern: Model Supervision Data — child specs, restart strategies, and process identity

Supervision configuration is data too.

Elixir child spec examples:

```elixir
children = [
  {Registry, keys: :unique, name: MyApp.Registry},
  {MyWorker, arg}
]
```

Erlang supervision specs are more tuple/map-heavy depending OTP version and style.

| Supervision data | Meaning                        |
| ---------------- | ------------------------------ |
| Child ID         | Identifies child in supervisor |
| Start MFA        | How to start process           |
| Restart strategy | When to restart                |
| Shutdown timeout | How to terminate               |
| Child type       | worker or supervisor           |
| Registered name  | How others find process        |
| Initial argument | Startup configuration          |

**Design meaning:** A supervised process is modeled by startup data plus lifecycle policy. This is not ordinary function-call configuration; it defines failure behavior.

**Common Pitfalls:** Do not treat child specs as boilerplate. Restart policy and child identity affect system behavior under failure.

### Task Pattern: Model Distributed Data — node-local terms, serialization, and compatibility

Distributed Erlang can send terms between nodes, but distributed data remains a compatibility and trust problem.

| Distributed concern | Modeling consequence                                        |
| ------------------- | ----------------------------------------------------------- |
| Node boundary       | Treat incoming messages as less trusted                     |
| Version skew        | Use versioned message shapes                                |
| Serialization       | Avoid sending nonportable assumptions                       |
| PIDs across nodes   | Remote process identity has lifecycle/network risk          |
| Atoms               | Atom compatibility and atom table risk matter               |
| Network partitions  | Message success does not mean global consistency            |
| Security            | Node cookies are not application-level authorization design |

Message example:

```elixir
{:user_event, 1, %{id: id, type: :created}}
```

The `1` can be a protocol version.

**Design meaning:** BEAM makes distributed messaging syntactically easy. It does not remove schema evolution, security, ordering, partition, or compatibility concerns.

**Common Pitfalls:** Do not send arbitrary internal structs across long-lived distributed boundaries without versioning. Today’s internal shape becomes tomorrow’s compatibility burden.

### Task Pattern: Model Equality and Identity — structural equality, exact equality, PIDs, refs, and names

Erlang / Elixir values are compared structurally in most cases.

| Concept                | Use                                | Example                                  |
| ---------------------- | ---------------------------------- | ---------------------------------------- |
| Structural equality    | Compare immutable values           | `%{id: 1} == %{id: 1}`                   |
| Exact numeric equality | Preserve integer/float distinction | `1 === 1.0` is false in Elixir           |
| PID equality           | Same process identifier            | `pid1 == pid2`                           |
| Ref equality           | Same unique reference              | `ref == expected_ref`                    |
| Registered name        | Lookup alias                       | Name may resolve to process              |
| Domain identity        | Business ID                        | `user.id`                                |
| Object identity        | Not ordinary model                 | Avoid importing OOP identity assumptions |

Elixir:

```elixir
1 == 1.0
1 === 1.0
```

Erlang:

```erlang
1 == 1.0.
1 =:= 1.0.
```

**Design meaning:** Do not confuse domain identity, runtime process identity, and structural equality. A user struct with the same fields may compare equal; that is not the same as “the same user session process.”

**Common Pitfalls:** Do not use PIDs as domain identity. Do not use structural equality where a domain ID comparison is intended if irrelevant fields may differ.

### Task Pattern: Model Ordering and Sorting — term order versus domain order

BEAM has a general term ordering, but domain sorting should usually be explicit.

Elixir:

```elixir
Enum.sort(users)
```

This may work structurally but may not express domain intent.

Better:

```elixir
Enum.sort_by(users, & &1.inserted_at)
```

Erlang:

```erlang
lists:sort(Users).
```

Better:

```erlang
lists:sort(fun(A, B) -> user_created_at(A) =< user_created_at(B) end, Users).
```

| Ordering need                 | Good model                       |
| ----------------------------- | -------------------------------- |
| Sort users by creation time   | Explicit key function            |
| Sort priorities               | Explicit priority rank           |
| Sort statuses                 | Mapping from atom to rank        |
| Stable protocol order         | Defined comparator               |
| Arbitrary deterministic order | General term order if documented |
| Data structure key order      | Understand map/list semantics    |

**Design meaning:** General term ordering is a runtime facility, not a domain model. Use explicit ordering where business meaning matters.

**Common Pitfalls:** Sorting atoms alphabetically or by term order may not match workflow order. Define a rank map.

### Task Pattern: Model Sets and Membership — `MapSet`, maps, ordsets, and ETS

Membership checks should not always be list scans.

Elixir:

```elixir
allowed = MapSet.new([:read, :write])
MapSet.member?(allowed, :read)
```

Erlang options include maps, `sets`, `ordsets`, or ETS depending need:

```erlang
Allowed = #{read => true, write => true},
maps:is_key(read, Allowed).
```

| Set representation | Use when                           | Pitfall                         |
| ------------------ | ---------------------------------- | ------------------------------- |
| List               | Tiny set, preserve order           | Linear membership               |
| `MapSet`           | Elixir ordinary set                | Not ordered                     |
| Map-as-set         | Erlang or custom performance needs | Values are dummy                |
| `ordsets`          | Erlang ordered-set convention      | Requires ordered representation |
| ETS                | Large/shared/runtime mutable set   | More lifecycle complexity       |

**Design meaning:** Membership is a data-structure question. Lists are semantically sequences, not ideal sets.

**Common Pitfalls:** Repeated `x in list` checks over large lists are easy to write and easy to miss in review.

### Task Pattern: Model Queues and Work Buffers — lists are not always queues

A common beginner pattern is appending to lists as a queue.

Bad Elixir queue-like pattern:

```elixir
queue = queue ++ [item]
```

Better use `:queue` or a domain abstraction:

```elixir
queue = :queue.in(item, queue)
{{:value, item}, queue} = :queue.out(queue)
```

Erlang:

```erlang
Queue1 = queue:in(Item, Queue0),
{{value, Item}, Queue2} = queue:out(Queue1).
```

| Buffer need       | Representation                                              |
| ----------------- | ----------------------------------------------------------- |
| Stack-like LIFO   | List head                                                   |
| FIFO queue        | `:queue` / `queue`                                          |
| Priority queue    | specialized structure/library                               |
| Shared work queue | supervised process, Broadway-like ecosystem, external queue |
| Bounded buffer    | Explicit capacity and backpressure protocol                 |
| Mailbox           | Process mailbox, but not general queue API                  |

**Design meaning:** Mailboxes are queues, but they are not general-purpose application data structures. They are process communication mechanisms with selective receive semantics.

**Common Pitfalls:** Do not use a process mailbox as an unbounded work queue without backpressure and observability.

### Task Pattern: Model Backpressure Data — demand, capacity, and acknowledgments

Backpressure is not automatic. It must be represented in protocol data or handled by libraries/frameworks.

| Backpressure signal | Example                 |
| ------------------- | ----------------------- |
| Demand count        | `{:demand, n}`          |
| Acknowledgment      | `{:ack, ref}`           |
| Rejection           | `{:error, :overloaded}` |
| Queue length        | metric or state field   |
| Window size         | integer capacity        |
| Timeout             | caller-side failure     |
| Retry instruction   | `{:retry_after, ms}`    |

Simple message protocol:

```elixir
send(worker, {:work, self(), ref, payload})

receive do
  {:ack, ^ref} -> :ok
  {:reject, ^ref, :overloaded} -> {:error, :overloaded}
after
  1_000 -> {:error, :timeout}
end
```

**Design meaning:** BEAM message passing prevents shared-memory races, not overload. Data models for demand and acknowledgment are part of robust concurrent design.

**Common Pitfalls:** Do not assume `GenServer.cast/2` provides backpressure. Cast is asynchronous; callers can overwhelm a slow server.

### Task Pattern: Model Telemetry and Observability Data — events, measurements, metadata

Observability data should have stable shapes.

Elixir telemetry-style event:

```elixir
event = [:my_app, :user, :created]
measurements = %{duration: duration}
metadata = %{user_id: user_id}
```

| Observability data   | Representation                    |
| -------------------- | --------------------------------- |
| Event name           | list of atoms                     |
| Measurements         | map of numeric values             |
| Metadata             | map of contextual values          |
| Log metadata         | keyword list or map depending API |
| Trace/correlation ID | binary/string                     |
| Error reason         | atom or structured term           |

**Design meaning:** Observability is a boundary. Logs and metrics may persist or feed external systems. Use stable keys and avoid high-cardinality or secret data accidentally.

**Common Pitfalls:** Do not put raw user input, secrets, huge payloads, or dynamic atoms into telemetry/log metadata.

### Task Pattern: Model Test Data — factories, fixtures, explicit shapes, and invariant preservation

Test data should respect the same domain shapes as production data.

| Test data strategy    | Good use                   | Risk                              |
| --------------------- | -------------------------- | --------------------------------- |
| Literal tagged tuples | Small protocol tests       | Drift from real constructors      |
| Struct literals       | Simple valid fixtures      | Can bypass validation             |
| Factory functions     | Reusable valid data        | Over-complex factories            |
| Boundary fixtures     | External raw params        | Good for parser tests             |
| Property generators   | Invariant exploration      | Requires careful generator design |
| Mocks/stubs           | Behaviour-based boundaries | Can diverge from real modules     |

Elixir test helper:

```elixir
def user_fixture(attrs \\ %{}) do
  attrs =
    Map.merge(%{id: 1, name: "Ada", email: "ada@example.com"}, attrs)

  struct!(User, attrs)
end
```

Better when validation matters:

```elixir
def valid_user(attrs \\ %{}) do
  params = Map.merge(%{"id" => "1", "name" => "Ada"}, attrs)
  {:ok, user} = UserParams.parse(params)
  user
end
```

**Design meaning:** Tests should not create impossible states unless the test is specifically about impossible-state handling.

**Common Pitfalls:** Bypassing constructors in tests can hide the fact that production code relies on validation.

### Task Pattern: Model Configuration as Data — validated config structs and startup normalization

Configuration should be normalized once.

Elixir:

```elixir
defmodule WorkerConfig do
  defstruct [:name, timeout: 5_000, retries: 3]

  def new(opts) when is_list(opts) do
    timeout = Keyword.get(opts, :timeout, 5_000)
    retries = Keyword.get(opts, :retries, 3)

    cond do
      not is_integer(timeout) or timeout <= 0 ->
        {:error, :invalid_timeout}

      not is_integer(retries) or retries < 0 ->
        {:error, :invalid_retries}

      true ->
        {:ok, %__MODULE__{timeout: timeout, retries: retries}}
    end
  end
end
```

| Config stage        | Data shape                             |
| ------------------- | -------------------------------------- |
| Raw config          | keyword list, map, environment strings |
| Parsed config       | typed values                           |
| Validated config    | struct or known map                    |
| Runtime state       | process state includes config          |
| Public option API   | keyword list with docs                 |
| Internal config API | struct or opaque type                  |

**Design meaning:** Startup is a trust boundary. Environment variables and config files are external data.

**Common Pitfalls:** Do not parse environment variables throughout the system. Parse once near startup and pass validated values into components.

### Task Pattern: Model Macros as Data Transformation Over Code — AST as quoted terms

Elixir macros treat code as data. This is modeling at compile time.

```elixir
quote do
  x + 1
end
```

Quoted code is represented as Elixir terms, often nested tuples.

A macro receives AST and returns AST:

```elixir
defmacro log_value(expr) do
  quote do
    value = unquote(expr)
    IO.inspect(value, label: "value")
    value
  end
end
```

| Macro data concept | Meaning                           |
| ------------------ | --------------------------------- |
| AST                | Code represented as terms         |
| `quote`            | Build AST                         |
| `unquote`          | Insert AST/value into quoted code |
| Macro argument     | Unevaluated syntax                |
| Macro expansion    | Compile-time transformation       |
| Hygiene            | Avoid accidental variable capture |

**Design meaning:** Elixir’s metaprogramming is not string substitution. It is structured code-data transformation. This enables DSLs but creates a compile-time modeling layer.

**Common Pitfalls:** Do not use macros to model ordinary runtime data. If a function can solve the problem, prefer a function.

### Task Pattern: Model Schema-Like Data Without Overcommitting to Frameworks

Schema-like modeling appears in validation, serialization, database code, APIs, and message protocols. The core language gives maps, structs, specs, and pattern matching; frameworks add richer schema tools.

| Schema need              | Core option                | Ecosystem option                |
| ------------------------ | -------------------------- | ------------------------------- |
| Required fields          | Struct / pattern match     | Ecto changeset, validation libs |
| Field types              | Specs + runtime validation | Schema libraries                |
| External JSON validation | Custom parser              | JSON schema / OpenAPI tools     |
| Database schema          | Struct-like module         | Ecto schema                     |
| Command validation       | Constructor                | Changeset-like validation       |
| Error accumulation       | Error list                 | Validation framework            |
| Documentation            | `@type`, docs              | Generated schema docs           |

**Design meaning:** Do not confuse schema tools with the language type system. They are runtime or compile-time ecosystem layers built on BEAM terms.

**Common Pitfalls:** A framework schema does not automatically validate every value everywhere. Know when validation runs and what shape is produced afterward.

### Task Pattern: Define Type-Safety Boundaries — where guarantees start and stop

A type-safety boundary is where unknown data becomes trusted data, or where trusted data leaves the system.

| Boundary           | What to do                                |
| ------------------ | ----------------------------------------- |
| External input     | Decode, validate, normalize               |
| Public API         | Specify accepted shapes and return shapes |
| Process message    | Pattern-match tag and validate payload    |
| Database read      | Normalize nulls/enums/fields              |
| Serialization      | Version and encode explicitly             |
| Native boundary    | Validate before NIF/port call             |
| Macro boundary     | Validate compile-time inputs              |
| Dynamic dispatch   | Restrict allowed modules/functions        |
| Atom conversion    | Use explicit finite mapping               |
| Long-lived storage | Version representation                    |

**Design meaning:** Erlang / Elixir’s dynamic nature makes boundaries more important, not less. Internal code can be clean and assertive only if boundaries are strict.

**Failure-first explanation:** The tempting wrong model is that adding specs to internal functions creates safety. The surprising failure is that bad external data still reaches internal code and crashes in unrelated places. The correct explanation is that specs document expectations but do not sanitize input. The professional rule is: make every trust boundary explicit; after the boundary, use clear internal representations. The boundary changes in highly trusted internal modules where direct matches and crashes are acceptable.

**Common Pitfalls:** Do not validate after side effects if invalid data should prevent the side effect. Validate before writing, sending, spawning, or persisting.

### Type/Data Modeling Decision Table — compact reference

| Modeling problem             | Prefer                                 | Avoid                                        |                                 |
| ---------------------------- | -------------------------------------- | -------------------------------------------- | ------------------------------- |
| Closed symbolic state        | Atom                                   | Dynamic atom creation                        |                                 |
| Success/failure              | Tagged tuple                           | Mixed raw/nil/error/raise return             |                                 |
| Optional lookup              | `{:ok, value}                          | :error` when caller must branch              | Silent `nil` if absence matters |
| External params              | String-key map to validated struct/map | Atomizing arbitrary keys                     |                                 |
| Stable Elixir domain data    | Struct + constructor/spec              | Loose map everywhere                         |                                 |
| Stable Erlang internal data  | Record or map with clear conventions   | Large positional tuple                       |                                 |
| Public hidden representation | Opaque type + API                      | Exposing raw fields everywhere               |                                 |
| Data-type polymorphism       | Protocol                               | Behaviour if dispatch is by value type       |                                 |
| Module adapter               | Behaviour                              | Protocol if dispatch is by module capability |                                 |
| One-off customization        | Function argument                      | Behaviour/macro overengineering              |                                 |
| Process protocol             | Tagged tuple + ref + API wrapper       | Untagged messages                            |                                 |
| Large shared lookup          | ETS with owner strategy                | One bottleneck GenServer by default          |                                 |
| Output chunks                | Iodata                                 | Repeated binary concatenation                |                                 |
| Queue                        | `:queue` / `queue`                     | Repeated list append                         |                                 |
| Runtime correlation          | Reference                              | Domain ID or PID misuse                      |                                 |
| Persisted event              | Versioned map/struct                   | Raw unversioned internal term                |                                 |

### Common Data Modeling Anti-Patterns — BEAM-specific sharp edges

| Anti-pattern                         | Why it fails                      | Better model                                   |
| ------------------------------------ | --------------------------------- | ---------------------------------------------- |
| Atomizing user input                 | Atom table exhaustion             | Explicit mapping or strings                    |
| Maps everywhere                      | Weak domain shape                 | Structs, records, constructors, specs          |
| Large positional tuples              | Unreadable and fragile            | Struct/map/record/tagged shape                 |
| GenServer as object                  | Process overhead and bottleneck   | Plain data/functions unless lifecycle needed   |
| `nil` as universal failure           | Loses reason                      | Tagged errors                                  |
| Raw messages across modules          | Protocol coupling                 | Public API wrapper                             |
| Unbounded `cast` workload            | Mailbox growth                    | Demand, call, queue, backpressure library      |
| Structs as classes                   | Wrong mental model                | Data in structs, behavior in modules/protocols |
| Specs as enforcement                 | False safety                      | Specs + validation + tests + analysis          |
| Records as public runtime data       | Header coupling and tuple opacity | Maps or opaque API                             |
| JSON shape as domain shape           | External uncertainty leaks inward | Decode/validate/normalize                      |
| Repeated list append                 | Poor cost profile                 | Prepend/reverse, queue, comprehension, Enum    |
| Persistent terms for changing config | Expensive global updates          | Process state or config normalization          |
| Untyped external term decoding       | Security risk                     | Trusted-only or safer format                   |
| Catch-all fallback in modeling       | Hides invalid states              | Explicit variants and failure                  |

### What Experienced Erlang / Elixir Programmers Usually Notice

Experienced BEAM programmers tend to read data shapes as architectural signals.

| Code signal                         | Expert question                                                   |
| ----------------------------------- | ----------------------------------------------------------------- |
| `{:ok, value}` / `{:error, reason}` | Is this failure expected and documented?                          |
| `%{}` at boundary                   | Has this external data been validated?                            |
| `%Struct{}`                         | Is construction controlled?                                       |
| `String.to_atom`                    | Is input closed and trusted?                                      |
| `send(pid, msg)`                    | Is there a protocol, ref, timeout, monitor?                       |
| `GenServer.cast`                    | Can the receiver be overloaded?                                   |
| `Agent`                             | Is this real state ownership or just mutable-variable simulation? |
| `@spec`                             | Does implementation actually match it?                            |
| `@opaque`                           | Is representation really hidden by API?                           |
| `use SomeModule`                    | What compile-time code or contracts are injected?                 |
| `:ets`                              | Who owns the table and lifecycle?                                 |
| `binary_to_term`                    | Is the source trusted?                                            |
| Deep map access                     | Is there a missing domain type?                                   |
| Many flags in state                 | Should this be a state variant instead?                           |

### Cross-Language Transfer for Data Modeling — what changes

| Source habit          | What transfers         | What changes in Erlang / Elixir                                       | Common failure                        |
| --------------------- | ---------------------- | --------------------------------------------------------------------- | ------------------------------------- |
| Java classes          | Encapsulation idea     | Data and behavior are separated into structs/modules/protocols        | Treating structs as objects           |
| TypeScript interfaces | Shape thinking         | Shapes are runtime-checked by patterns/specs, not erased static types | Believing specs enforce all calls     |
| Rust enums            | Variant modeling       | Use atoms/tagged tuples/structs without exhaustiveness checking       | Missing variant handling              |
| Python dicts          | Flexible maps          | Need stricter boundary validation                                     | Map blobs everywhere                  |
| Ruby symbols          | Atom-like readability  | Atom table risk matters                                               | Dynamic atom creation                 |
| Go structs/channels   | Simple data/messages   | BEAM messages are arbitrary terms plus mailbox semantics              | Untagged messages and no backpressure |
| Haskell ADTs          | Pattern matching       | Dynamic runtime variants, no full static exhaustiveness               | Overtrusting pattern coverage         |
| JSON-first APIs       | Map/list/scalar shapes | JSON is external representation, not domain model                     | String keys leak everywhere           |

### Practical Modeling Workflow — from external data to internal behavior

For a serious Erlang / Elixir module, a typical modeling workflow is:

| Step                          | Question                                | Typical tool                                         |
| ----------------------------- | --------------------------------------- | ---------------------------------------------------- |
| Identify boundary             | Where does data come from?              | Module boundary, parser, controller, process receive |
| Decode syntax                 | Is it JSON, binary, term, query params? | Decoder/parser                                       |
| Validate shape                | Are required fields present and typed?  | Pattern, guards, validator                           |
| Normalize representation      | What should internal code use?          | Struct, record, tagged tuple, map                    |
| Name domain type              | Does this need a module/type?           | `@type`, `@opaque`, `-type`, `-opaque`               |
| Define failure protocol       | How do callers handle failure?          | Tagged tuples, bang function, exception              |
| Encapsulate construction      | Can invalid values be created?          | Constructor functions                                |
| Hide representation if needed | Should callers depend on fields?        | Opaque types, API functions                          |
| Define behavior contract      | Does implementation vary?               | Behaviour, protocol, function argument               |
| Add tests and specs           | Can tools/readers verify intent?        | ExUnit/EUnit/Common Test, specs, Dialyzer            |
| Observe runtime cost          | Is representation too costly?           | Profiling, memory inspection, Part 7 cost model      |

This workflow reflects the broader tutorial contract: Erlang / Elixir should be taught as a coherent BEAM-family system with shared runtime data, OTP process architecture, and language-specific surface conventions. 
## PART 4 — Control Flow, Functions, Abstraction, and Composition by Task Pattern

### Part Scope — behavior modeling before architecture

Part 4 explains how Erlang / Elixir programs express **behavior**: branching, function design, recursion, transformation, composition, callbacks, abstraction boundaries, and metaprogramming. This continues the combined BEAM / OTP approach: shared semantic ideas are explained once, while Erlang and Elixir syntax are distinguished only where it affects practical programming judgment. 

Part 2 explained how to read syntax. Part 3 explained how to model data. Part 4 now asks: once the data shape is chosen, **how should behavior be organized around it?**

In Erlang / Elixir, behavior is usually organized through:

| Behavioral need                  | Common mechanism                                    | Main design question                                                |
| -------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------- |
| Branch by data shape             | Function clauses, `case`, pattern matching          | Is the whole function defined by shape, or only one local decision? |
| Branch by condition              | Guards, `if`, `cond`                                | Is this genuinely boolean logic rather than structural matching?    |
| Repeat work                      | Recursion, `Enum`, `Stream`, comprehensions, folds  | Is the transformation eager, lazy, custom, or stateful?             |
| Compose small operations         | Function calls, pipelines, higher-order functions   | Is the dataflow still clear?                                        |
| Encapsulate stateful behavior    | Process loops, `GenServer`, `Agent`, `Task`         | Is state ownership or lifecycle needed?                             |
| Define callback contract         | Behaviours                                          | Should a module implement a known interface?                        |
| Define data-polymorphic behavior | Elixir protocols                                    | Should behavior vary by data type?                                  |
| Build DSL or generated code      | Elixir macros, Erlang parse transforms/preprocessor | Is syntax extension truly needed?                                   |
| Design public API                | Modules, specs, return protocols                    | What does the caller need to know, handle, or trust?                |

The central warning for this part is simple: **do not turn every behavior into a process, every abstraction into a macro, or every branch into a `case`.** Erlang / Elixir gives several abstraction layers; good code chooses the smallest one that accurately represents the problem.

### Task Pattern: Branch by Data Shape — function clauses versus `case`

The most common BEAM-family control-flow decision is whether to branch using **function clauses** or a **local `case`**.

Use **function clauses** when the whole function’s meaning depends on input shape.

Elixir:

```elixir
def normalize_result({:ok, value}), do: {:ok, value}
def normalize_result({:error, :enoent}), do: {:error, :not_found}
def normalize_result({:error, reason}), do: {:error, reason}
```

Erlang:

```erlang
normalize_result({ok, Value}) ->
    {ok, Value};
normalize_result({error, enoent}) ->
    {error, not_found};
normalize_result({error, Reason}) ->
    {error, Reason}.
```

Use `case` when branching is a local decision inside a larger function.

Elixir:

```elixir
def load_config(path) do
  case File.read(path) do
    {:ok, binary} ->
      decode_config(binary)

    {:error, :enoent} ->
      {:error, :missing_config}

    {:error, reason} ->
      {:error, {:read_failed, reason}}
  end
end
```

Erlang:

```erlang
load_config(Path) ->
    case file:read_file(Path) of
        {ok, Binary} ->
            decode_config(Binary);
        {error, enoent} ->
            {error, missing_config};
        {error, Reason} ->
            {error, {read_failed, Reason}}
    end.
```

| Task                                    | Prefer                            | Why                                       | Failure mode if wrong                       |
| --------------------------------------- | --------------------------------- | ----------------------------------------- | ------------------------------------------- |
| Whole function varies by argument shape | Function clauses                  | Dispatch is part of the function contract | A large internal `case` hides the API shape |
| One expression result has variants      | `case`                            | Branch is local to a step                 | Function heads become fragmented            |
| Message handling                        | `receive` or OTP callback clauses | Mailbox/callback protocol is shape-driven | Generic branches consume wrong messages     |
| External result handling                | `case` / `with`                   | Failure is expected data                  | Direct match crashes unintentionally        |
| Domain state transition                 | Function clauses or `case`        | Variants are explicit                     | Catch-all hides invalid transition          |

**Design meaning:** Function clauses make shape part of the public or local callable contract. `case` makes shape part of a local expression decision.

**Common Pitfalls:** Do not write public function clauses that destructure external input too aggressively before validation. For messy external data, a shallow public function plus internal validation often produces clearer failure behavior.

### Task Pattern: Branch by Boolean Condition — guards, `if`, `cond`, and when not to use them

Boolean branching is useful, but it should not replace pattern matching where shape is the main issue.

Elixir:

```elixir
def classify_score(score) when is_integer(score) do
  cond do
    score >= 90 -> :excellent
    score >= 60 -> :pass
    score >= 0 -> :fail
    true -> :invalid
  end
end
```

Erlang:

```erlang
classify_score(Score) when is_integer(Score) ->
    if
        Score >= 90 ->
            excellent;
        Score >= 60 ->
            pass;
        Score >= 0 ->
            fail;
        true ->
            invalid
    end.
```

| Branching form   | Best use                          | Avoid when                           |
| ---------------- | --------------------------------- | ------------------------------------ |
| Guard            | Simple clause refinement          | Complex validation or side effects   |
| Elixir `if`      | One simple truthy/falsy condition | Multiple variants or structured data |
| Elixir `cond`    | Ordered predicate/range checks    | Tagged tuple branching               |
| Erlang `if`      | Guard-based condition choices     | Data-shape matching                  |
| `case`           | Pattern and value branching       | Pure numeric/range predicate chains  |
| Function clauses | Input-shape-defined behavior      | Local conditional step only          |

**Failure-first explanation:** The tempting wrong model is “`if` is the normal branching tool.” The surprising result is Erlang / Elixir code with many nested boolean checks over values that have clear shapes. The correct explanation is that BEAM-family code usually branches by **shape first**, then by boolean refinement. The professional rule is: if the data has tags, use pattern matching; if the logic is range or predicate priority, use guards, `if`, or `cond`. The boundary changes when a branch condition requires side effects or complex validation; then use ordinary function bodies.

**Common Pitfalls:** In Elixir, `0`, `[]`, and `""` are truthy. Avoid truthiness when the domain requires explicit boolean meaning.

### Task Pattern: Handle Linear Success Paths — Elixir `with`, nested `case`, and Erlang equivalents

Many functions perform a sequence of operations where each step may fail. Elixir’s `with` is designed for this.

Elixir:

```elixir
def load_user(path) do
  with {:ok, binary} <- File.read(path),
       {:ok, decoded} <- Jason.decode(binary),
       {:ok, user} <- User.new(decoded) do
    {:ok, user}
  else
    {:error, reason} ->
      {:error, reason}

    :invalid ->
      {:error, :invalid_user}
  end
end
```

Erlang usually uses nested `case`, helper functions, or result-pipeline conventions.

```erlang
load_user(Path) ->
    case file:read_file(Path) of
        {ok, Binary} ->
            case decode(Binary) of
                {ok, Decoded} ->
                    new_user(Decoded);
                {error, Reason} ->
                    {error, Reason}
            end;
        {error, Reason} ->
            {error, Reason}
    end.
```

A flatter Erlang style uses helper functions:

```erlang
load_user(Path) ->
    bind(file:read_file(Path),
         fun(Binary) ->
             bind(decode(Binary),
                  fun(Decoded) ->
                      new_user(Decoded)
                  end)
         end).

bind({ok, Value}, Fun) ->
    Fun(Value);
bind({error, Reason}, _Fun) ->
    {error, Reason}.
```

| Situation                                                               | Best option                            | Why                      |
| ----------------------------------------------------------------------- | -------------------------------------- | ------------------------ |
| Elixir chain with compatible `{:ok, value}` / `{:error, reason}` shapes | `with`                                 | Linear success path      |
| Each failure needs special local recovery                               | `case`                                 | Branch-specific clarity  |
| Erlang simple two-step chain                                            | nested `case`                          | Explicit and idiomatic   |
| Erlang many repeated chains                                             | helper functions or library convention | Reduce nesting carefully |
| Failure should crash                                                    | direct match                           | Assert invariant         |
| Failure is expected external outcome                                    | tagged return                          | Caller handles data      |

**Design meaning:** `with` compresses success-oriented control flow, but it does not create a static effect system. It is still pattern matching.

**Common Pitfalls:** Do not force `with` when each failure branch needs different context. A huge `else` block can become less readable than nested `case`.

### Task Pattern: Express Repetition — recursion, library iteration, comprehensions, and process loops

Erlang / Elixir has no ordinary mutable `for` loop as the central repetition mechanism. Repetition is usually expressed through recursion, higher-order functions, comprehensions, streams, or long-running process loops.

| Repetition task           | Elixir mechanism                   | Erlang mechanism                           | Use when                       |
| ------------------------- | ---------------------------------- | ------------------------------------------ | ------------------------------ |
| Transform each item       | `Enum.map/2`                       | `lists:map/2`                              | One output per input           |
| Filter items              | `Enum.filter/2`                    | `lists:filter/2`                           | Keep selected values           |
| Accumulate result         | `Enum.reduce/3`                    | `lists:foldl/3` / `lists:foldr/3`          | Build aggregate                |
| Generate/filter/transform | `for` comprehension                | list comprehension                         | Declarative traversal          |
| Lazy transformation       | `Stream`                           | custom/lazy libraries or process pipelines | Avoid eager work               |
| Custom traversal          | recursion                          | recursion                                  | Control not covered by library |
| Infinite server loop      | `receive` recursion or `GenServer` | `receive` recursion or `gen_server`        | Stateful process behavior      |
| Concurrent work           | `Task`, processes, OTP libraries   | `spawn`, OTP behaviours                    | Work should run independently  |

Elixir recursion:

```elixir
def sum(list), do: sum(list, 0)

defp sum([], acc), do: acc
defp sum([h | t], acc), do: sum(t, acc + h)
```

Erlang recursion:

```erlang
sum(List) ->
    sum(List, 0).

sum([], Acc) ->
    Acc;
sum([H | T], Acc) ->
    sum(T, Acc + H).
```

Elixir library version:

```elixir
Enum.reduce(numbers, 0, fn n, acc -> n + acc end)
```

Erlang library version:

```erlang
lists:foldl(fun(N, Acc) -> N + Acc end, 0, Numbers).
```

**Design meaning:** Repetition is expressed as **transformation over immutable data** or **state transition through recursive calls/process callbacks**. There is no hidden mutation of a loop variable.

**Common Pitfalls:** Do not manually recurse over a list when a standard library function makes the intent clearer. But do not chain many eager transformations in hot paths without understanding cost.

### Task Pattern: Choose Between `map`, `filter`, `reduce`, and Comprehension

Collection transformations should communicate intent.

| Task                          | Elixir                                  | Erlang                            | Meaning                    |
| ----------------------------- | --------------------------------------- | --------------------------------- | -------------------------- |
| Convert each item             | `Enum.map(items, fun)`                  | `lists:map(Fun, Items)`           | Same cardinality           |
| Keep selected items           | `Enum.filter(items, pred)`              | `lists:filter(Pred, Items)`       | Subset                     |
| Accumulate one result         | `Enum.reduce(items, acc, fun)`          | `lists:foldl(Fun, Acc, Items)`    | Aggregation                |
| Transform and filter together | `for` / `Enum.flat_map` depending shape | list comprehension                | Combined generation        |
| Stop early                    | `Enum.reduce_while`                     | explicit recursion or custom fold | Early termination          |
| Flatten mapped lists          | `Enum.flat_map`                         | `lists:flatmap`                   | One-to-many transformation |

Elixir:

```elixir
active_emails =
  users
  |> Enum.filter(& &1.active)
  |> Enum.map(& &1.email)
```

Erlang:

```erlang
ActiveEmails =
    lists:map(
      fun user_email/1,
      lists:filter(fun is_active_user/1, Users)).
```

Elixir comprehension alternative:

```elixir
active_emails =
  for %{active: true, email: email} <- users do
    email
  end
```

This uses pattern matching in the generator and filters out non-matching values.

| Use this      | When                                                      |
| ------------- | --------------------------------------------------------- |
| `map`         | Every input produces exactly one output                   |
| `filter`      | The output is a subset of input                           |
| `reduce`      | The output is structurally different or accumulated       |
| `flat_map`    | Each input produces zero or more outputs                  |
| comprehension | Generation/filter/transformation is naturally declarative |
| recursion     | Need custom control, early exit, or nonstandard traversal |
| stream        | Need laziness or large pipeline behavior                  |

**Failure-first explanation:** The tempting wrong model is “`reduce` can do everything, so use it everywhere.” The surprising result is code whose accumulator hides the actual purpose. The correct explanation is that `reduce` is general but less specific. The professional rule is: choose the most intention-revealing traversal. Use `reduce` when the output is genuinely an accumulated structure or when other combinators do not express the task.

**Common Pitfalls:** Do not use `Enum.map` for side effects and ignore the result. Use `Enum.each` in Elixir or `lists:foreach` in Erlang when the purpose is side effects.

### Task Pattern: Compose Functions — nesting, intermediate variables, pipelines, and named helpers

Function composition can be expressed in several ways.

Nested Elixir:

```elixir
String.upcase(String.trim(name))
```

Pipeline Elixir:

```elixir
name
|> String.trim()
|> String.upcase()
```

Intermediate variables:

```elixir
trimmed = String.trim(name)
String.upcase(trimmed)
```

Named helper:

```elixir
def normalize_name(name) do
  name
  |> String.trim()
  |> String.upcase()
end
```

Erlang commonly uses nesting or variables:

```erlang
normalize_name(Name) ->
    Trimmed = string:trim(Name),
    string:uppercase(Trimmed).
```

| Composition form         | Best use                        | Cost                         |
| ------------------------ | ------------------------------- | ---------------------------- |
| Nested call              | Very small expression           | Becomes unreadable when deep |
| Intermediate variable    | Clarifies stages                | More lines                   |
| Elixir pipeline          | Linear data transformation      | Awkward when subject changes |
| Named helper             | Reusable domain operation       | More functions/modules       |
| Higher-order composition | Callbacks and reusable behavior | Can obscure simple logic     |
| Macro DSL                | Syntax-level composition        | Compile-time complexity      |

**Design meaning:** Elixir’s pipe operator is a readability tool, not a semantic revolution. It encourages data-first APIs, but it does not make eager operations lazy, safe, or concurrent.

**Common Pitfalls:** Do not build pipelines where each step changes the conceptual subject. A pipeline should read as one value being transformed, not as a way to avoid naming intermediate states.

### Task Pattern: Design Function Signatures — argument order, data-first style, options, and return shape

Function signatures are part of API design. Erlang and Elixir conventions differ.

Elixir often prefers the main data structure as the first argument to support pipelines:

```elixir
Enum.map(users, fun)
Map.get(user, :name)
String.trim(name)
```

Erlang standard library functions vary but often also take the subject data in conventional positions:

```erlang
lists:map(Fun, List).
maps:get(Key, Map).
binary:split(Binary, Pattern).
```

| Signature choice     | Elixir tendency         | Erlang tendency              | Design question                      |
| -------------------- | ----------------------- | ---------------------------- | ------------------------------------ |
| Main data argument   | Often first             | Depends on module convention | Should this function pipe well?      |
| Callback function    | Usually after data      | Often before data in `lists` | Which convention matches ecosystem?  |
| Options              | Final keyword list      | Final proplist/map           | Are options optional and extensible? |
| Return tagged result | Common for fallible ops | Common for fallible ops      | Should caller branch?                |
| Bang version         | Elixir convention       | Less uniform                 | Should failure raise/crash?          |
| Module argument      | Adapter patterns        | Callback module patterns     | Is behavior swappable?               |

Elixir API example:

```elixir
@spec normalize(User.t(), keyword()) :: {:ok, User.t()} | {:error, term()}
def normalize(user, opts \\ []) do
  ...
end
```

Erlang API example:

```erlang
-spec normalize(user(), [option()]) -> {ok, user()} | {error, term()}.
normalize(User, Options) ->
    ...
```

**Professional rules:**

| Rule                                                | Reason                                                     |
| --------------------------------------------------- | ---------------------------------------------------------- |
| Put the main data subject in a predictable position | Improves composition and call-site readability             |
| Put options last                                    | Conventional and extensible                                |
| Use tagged returns for expected failure             | Forces caller decision                                     |
| Use names that reveal effects                       | `fetch`, `load`, `save`, `start_link` communicate behavior |
| Keep public signatures stable                       | Caller code depends on shape                               |
| Avoid many positional arguments                     | Use options, maps, structs, or domain types                |

**Common Pitfalls:** Functions with many positional arguments are fragile. If the call site needs comments to explain argument order, introduce a struct, options, or a clearer domain abstraction.

### Task Pattern: Use Closures — captured context, callbacks, and delayed execution

Closures capture values from lexical scope.

Elixir:

```elixir
prefix = "user"

format_id = fn id ->
  "#{prefix}:#{id}"
end
```

Erlang:

```erlang
Prefix = <<"user">>,
FormatId = fun(Id) ->
    <<Prefix/binary, ":", (integer_to_binary(Id))/binary>>
end.
```

| Closure use           | Example                               | Good use                |
| --------------------- | ------------------------------------- | ----------------------- |
| Callback with context | `fn user -> allowed?(user, role) end` | Local policy            |
| Mapper/filter         | `Enum.map(items, fn item -> ... end)` | Data transformation     |
| Deferred work         | `Task.async(fn -> work(arg) end)`     | Concurrent execution    |
| Test helper           | anonymous assertion helpers           | Local test clarity      |
| Resource callback     | transaction functions                 | Boundary-local behavior |

**Design meaning:** A closure captures values, not mutable variables. In Elixir, later rebinding a name does not mutate what an already-created closure captured.

Example:

```elixir
prefix = "user"
format = fn id -> "#{prefix}:#{id}" end
prefix = "account"
format.(1)
```

The closure uses the earlier captured value.

**Failure-first explanation:** The tempting wrong model is “closures see the latest value of the variable.” The surprising behavior is that rebinding does not update captured values. The correct explanation is lexical capture of immutable values. The professional rule is: read closures by the binding occurrence they capture, not merely by variable name. The boundary changes when the closure itself performs effects against external state, process state, ETS, or a database.

**Common Pitfalls:** Avoid long closures that capture many local variables. They become hidden parameter lists. Name the operation or pass explicit arguments.

### Task Pattern: Use Higher-Order Functions — callbacks as local abstraction

Higher-order functions accept or return functions. They are common in both Erlang and Elixir.

Elixir:

```elixir
def retry(times, fun) when times > 0 and is_function(fun, 0) do
  case fun.() do
    {:ok, value} ->
      {:ok, value}

    {:error, _reason} when times > 1 ->
      retry(times - 1, fun)

    {:error, reason} ->
      {:error, reason}
  end
end
```

Erlang:

```erlang
retry(Times, Fun) when Times > 0, is_function(Fun, 0) ->
    case Fun() of
        {ok, Value} ->
            {ok, Value};
        {error, _Reason} when Times > 1 ->
            retry(Times - 1, Fun);
        {error, Reason} ->
            {error, Reason}
    end.
```

| Use higher-order function when       | Prefer another abstraction when                    |
| ------------------------------------ | -------------------------------------------------- |
| Behavior is local and simple         | Behavior is a long-term module contract            |
| Caller supplies small transformation | Behavior needs supervision/lifecycle               |
| No named adapter module is needed    | Many callbacks must be implemented together        |
| Function composition is enough       | Syntax extension is needed                         |
| Test customization is simple         | Data type should control behavior through protocol |

**Design meaning:** Higher-order functions are the lightest abstraction mechanism for behavior variation. They avoid overbuilding behaviours, protocols, or processes.

**Common Pitfalls:** Do not use anonymous callbacks when the behavior has domain meaning and deserves a name. A named function improves tracing, testing, and error messages.

### Task Pattern: Choose Between Function Clauses and Higher-Order Functions

Both function clauses and higher-order functions express behavioral variation, but they solve different problems.

Function clauses vary behavior based on **input shape**:

```elixir
def price({:book, amount}), do: amount
def price({:subscription, monthly, months}), do: monthly * months
```

Higher-order functions vary behavior based on **caller-supplied operation**:

```elixir
def total(items, price_fun) do
  Enum.reduce(items, 0, fn item, acc -> acc + price_fun.(item) end)
end
```

| Need                           | Prefer                | Reason                         |
| ------------------------------ | --------------------- | ------------------------------ |
| Known variants in local data   | Function clauses      | Shape is explicit              |
| Caller decides transformation  | Higher-order function | Behavior is parameter          |
| Data type owns behavior        | Protocol              | Open data-polymorphic dispatch |
| Module implements strategy     | Behaviour             | Swappable module contract      |
| Process owns stateful behavior | GenServer/process     | Lifecycle and serialization    |
| Syntax should be extended      | Macro                 | Compile-time syntax need       |

**Common Pitfalls:** Passing a function for every tiny decision can make code abstract without benefit. Conversely, hardcoding every variation in function clauses can make extension difficult.

### Task Pattern: Design Reusable Helpers — small pure functions versus module-level abstractions

Reusable helpers should usually start as ordinary functions.

Elixir:

```elixir
def normalize_name(name) when is_binary(name) do
  name
  |> String.trim()
  |> String.downcase()
end
```

Erlang:

```erlang
normalize_name(Name) when is_binary(Name) ->
    string:lowercase(string:trim(Name)).
```

| Helper type         | Use when                                 | Warning                               |
| ------------------- | ---------------------------------------- | ------------------------------------- |
| Private function    | Used inside one module                   | Do not expose just for tests          |
| Public function     | Meaningful API                           | Document/spec stable behavior         |
| Higher-order helper | Caller supplies small behavior           | Keep callback contract clear          |
| Module abstraction  | Cohesive group of operations             | Avoid utility dumping ground          |
| Behaviour           | Multiple modules implement same contract | Do not overuse for one implementation |
| Protocol            | Operation varies by data type            | Do not use for one-off branch         |
| Macro               | Syntax or compile-time generation needed | Avoid for normal reuse                |

**Design meaning:** Erlang / Elixir rewards small named functions. They compose well with pattern matching, specs, tests, and pipelines.

**Common Pitfalls:** A module named `Utils`, `Helpers`, or `Common` often becomes a dumping ground. Prefer domain-specific modules such as `UserName`, `Email`, `PacketParser`, or `RetryPolicy`.

### Task Pattern: Build Public APIs — thin surface, stable shapes, and hidden internals

A public API should hide internal representation and expose stable operations.

Elixir example:

```elixir
defmodule Counter do
  @opaque t :: %__MODULE__{value: non_neg_integer()}

  defstruct [:value]

  @spec new(non_neg_integer()) :: {:ok, t()} | {:error, :invalid_counter}
  def new(value) when is_integer(value) and value >= 0 do
    {:ok, %__MODULE__{value: value}}
  end

  def new(_), do: {:error, :invalid_counter}

  @spec increment(t()) :: t()
  def increment(%__MODULE__{value: value}) do
    %__MODULE__{value: value + 1}
  end

  @spec value(t()) :: non_neg_integer()
  def value(%__MODULE__{value: value}), do: value
end
```

Erlang equivalent with opaque representation:

```erlang
-opaque counter() :: non_neg_integer().

-spec new(non_neg_integer()) -> {ok, counter()} | {error, invalid_counter}.
new(Value) when is_integer(Value), Value >= 0 ->
    {ok, Value};
new(_) ->
    {error, invalid_counter}.

-spec increment(counter()) -> counter().
increment(Value) ->
    Value + 1.

-spec value(counter()) -> non_neg_integer().
value(Value) ->
    Value.
```

| API design issue | Good practice                             |
| ---------------- | ----------------------------------------- |
| Construction     | Constructor validates                     |
| Mutation/update  | Return new value                          |
| Failure          | Stable tagged result                      |
| Representation   | Hide if callers should not depend on it   |
| Docs/specs       | Public functions documented and specified |
| Internal helpers | Private or unexported                     |
| Versioning       | Do not casually change return shape       |
| Effects          | Names reveal effect level                 |

**Design meaning:** In a dynamic functional language, public API design is a central safety mechanism. Stable shapes substitute for some compile-time interface enforcement.

**Common Pitfalls:** Do not expose raw struct fields as the only API if invariants matter. Field access is convenient, but it couples callers to representation.

### Task Pattern: Avoid Over-Abstraction — when plain functions are enough

Erlang / Elixir makes abstraction easy, especially in Elixir with macros, protocols, behaviours, and `use`. This creates over-abstraction risk.

| Temptation                                | Usually better first step                          |
| ----------------------------------------- | -------------------------------------------------- |
| Create a behaviour for one implementation | Use a module and functions                         |
| Create a protocol for one struct          | Use ordinary functions                             |
| Create a macro for repeated expression    | Use a function                                     |
| Create a GenServer for a map              | Use plain data unless lifecycle/concurrency needed |
| Create dynamic dispatch by module names   | Pass a function or explicit module if needed       |
| Create DSL for simple config              | Use data structures                                |
| Create deep pipeline                      | Use named intermediate values                      |

Bad abstraction:

```elixir
defprotocol Activatable do
  def active?(value)
end

defimpl Activatable, for: User do
  def active?(user), do: user.active
end
```

If only `User` exists and no extension is needed, this may be simpler:

```elixir
def active?(%User{active: active}), do: active
```

**Design meaning:** Abstraction has cost: indirection, documentation, testing surface, and mental load. Use it when it reduces coupling or expresses a real variation point.

**Common Pitfalls:** Do not design for hypothetical future variants before current variation exists. BEAM code can be refactored into behaviours or protocols later.

### Task Pattern: Avoid Under-Abstraction — when repeated shape logic needs a name

Under-abstraction is the opposite problem: repeated raw patterns, message shapes, and validation logic spread everywhere.

Repeated raw protocol:

```elixir
send(pid, {:get_user, self(), ref, id})
```

Better:

```elixir
UserServer.get_user(pid, id)
```

Repeated validation:

```elixir
case params do
  %{"id" => id, "name" => name} when is_binary(id) and is_binary(name) ->
    ...
end
```

Better:

```elixir
UserParams.parse(params)
```

| Under-abstraction signal                 | Better abstraction          |
| ---------------------------------------- | --------------------------- |
| Same tagged tuple built in many modules  | Constructor/helper function |
| Same validation repeated                 | Boundary parser/validator   |
| Same process message repeated            | Public process API          |
| Same map keys accessed everywhere        | Struct/domain module        |
| Same callback group expected             | Behaviour                   |
| Same data-polymorphic operation repeated | Protocol                    |
| Same complex pipeline copied             | Named function              |
| Same option parsing repeated             | Config struct/normalizer    |

**Design meaning:** Good abstraction names a repeated domain idea, not merely a repeated sequence of tokens.

**Common Pitfalls:** Do not wait until every module knows an internal protocol before extracting an API. Message formats and validation rules should usually be centralized early.

### Task Pattern: Use Pipelines Without Hiding Control Flow

Elixir pipelines are best for linear transformation.

Good:

```elixir
def normalize_email(email) do
  email
  |> String.trim()
  |> String.downcase()
end
```

Less good:

```elixir
user
|> maybe_fetch_profile()
|> case do
  {:ok, profile} -> ...
  {:error, reason} -> ...
end
```

This is not valid in that exact form without special constructs, but it illustrates the common smell: forcing branching into pipeline shape.

Better:

```elixir
case maybe_fetch_profile(user) do
  {:ok, profile} ->
    build_response(user, profile)

  {:error, reason} ->
    {:error, reason}
end
```

| Pipeline is good when                        | Pipeline is weak when                     |
| -------------------------------------------- | ----------------------------------------- |
| Each step transforms same conceptual subject | Subject changes every step                |
| Function names are clear                     | Anonymous functions dominate              |
| Failure is not branching at every step       | Many steps return different tagged errors |
| Data-first function APIs fit naturally       | Arguments need awkward reordering         |
| Intermediate states do not need names        | Names would clarify meaning               |

**Design meaning:** The pipe operator encourages readable dataflow. It should not suppress necessary branching, naming, or error handling.

**Common Pitfalls:** Long pipelines with `then`, anonymous functions, `tap`, `case` wrappers, and side effects often indicate that the code wants ordinary named steps.

### Task Pattern: Use `tap` and `then` Carefully in Elixir

Elixir includes helpers such as `then/2` and `tap/2`.

```elixir
value
|> then(fn x -> transform(x) end)
```

`then` passes the value into a function and returns the function result.

```elixir
value
|> tap(fn x -> IO.inspect(x) end)
```

`tap` performs a side-effecting function and returns the original value.

| Helper       | Meaning                                     | Good use                            | Pitfall                             |
| ------------ | ------------------------------------------- | ----------------------------------- | ----------------------------------- |
| `then/2`     | Transform through arbitrary function        | Awkward one-off transformation      | Hides simpler named helper          |
| `tap/2`      | Side effect while preserving original value | Debugging, logging, instrumentation | Side effects hidden inside pipeline |
| `dbg`        | Debugging                                   | Development inspection              | Leaving debug calls                 |
| `IO.inspect` | Inspect value and return it                 | Pipeline debugging                  | Production noise                    |

Example:

```elixir
user
|> normalize_user()
|> tap(fn user -> Logger.debug("normalized user #{user.id}") end)
|> save_user()
```

This can be acceptable, but logging inside pipelines should remain deliberate.

**Design meaning:** `tap` and `then` are composition aids. They are not substitutes for good function design.

**Common Pitfalls:** Overusing `then` often means the pipeline no longer has natural data-first functions. Consider a named helper.

### Task Pattern: Express Side Effects — naming, return shape, and containment

Erlang / Elixir is not pure. Side effects include file I/O, network calls, database writes, sending messages, logging, spawning processes, ETS writes, and external system calls.

| Effect               | Typical function naming    | Return shape                             |                   |
| -------------------- | -------------------------- | ---------------------------------------- | ----------------- |
| Read external data   | `read`, `fetch`, `load`    | `{:ok, value}                            | {:error, reason}` |
| Write external data  | `write`, `save`, `put`     | `:ok                                     | {:error, reason}` |
| Start process        | `start`, `start_link`      | `{:ok, pid}                              | {:error, reason}` |
| Send async request   | `cast`, `notify`, `send_*` | usually `:ok`                            |                   |
| Sync process request | `call`, `get`, `fetch`     | reply or error/exit/timeout              |                   |
| Log                  | `log`, `debug`, `info`     | usually `:ok` or original value in `tap` |                   |
| Mutate ETS           | `insert`, `delete`         | API-specific                             |                   |
| External command     | `run`, `exec`              | result with status                       |                   |

**Design meaning:** Pure transformations and effects should be visually distinguishable. Names and return shapes are the main signals.

Example:

```elixir
def normalize_user(user), do: ...
def save_user(user), do: ...
def notify_user_created(user), do: ...
```

**Common Pitfalls:** Do not hide database writes or process sends in functions that look like pure transformations. A function named `format_user/1` should not send emails.

### Task Pattern: Compose Error-Returning Functions — local decisions and API clarity

Many functions return tagged errors. Composition should preserve clarity.

Elixir `with`:

```elixir
def register_user(params) do
  with {:ok, attrs} <- UserParams.parse(params),
       {:ok, user} <- User.new(attrs),
       :ok <- UserRepo.insert(user),
       :ok <- UserNotifier.notify_created(user) do
    {:ok, user}
  end
end
```

This is concise but failure shapes should be compatible.

If errors need annotation:

```elixir
def register_user(params) do
  with {:parse, {:ok, attrs}} <- {:parse, UserParams.parse(params)},
       {:build, {:ok, user}} <- {:build, User.new(attrs)},
       {:insert, :ok} <- {:insert, UserRepo.insert(user)} do
    {:ok, user}
  else
    {:parse, {:error, reason}} -> {:error, {:invalid_params, reason}}
    {:build, {:error, reason}} -> {:error, {:invalid_user, reason}}
    {:insert, {:error, reason}} -> {:error, {:insert_failed, reason}}
  end
end
```

At that point, separate functions or `case` may be clearer.

Erlang equivalent often benefits from helper functions.

**Design meaning:** Error composition is not only syntax. It is API design. The caller should receive an error shape that is stable and useful.

**Common Pitfalls:** Letting arbitrary internal error reasons leak out of public APIs can couple callers to implementation details.

### Task Pattern: Choose Between Returning Errors and Raising

Elixir example:

```elixir
File.read(path)
File.read!(path)
```

The non-bang function returns tagged data. The bang function raises.

| Use tagged return when              | Use raise/bang when                                      |
| ----------------------------------- | -------------------------------------------------------- |
| Failure is expected                 | Failure violates invariant                               |
| Caller can recover                  | Caller cannot meaningfully recover here                  |
| External resource may fail normally | Startup/config must exist                                |
| Public API should force branching   | Crash should be handled by supervisor or higher boundary |
| Multiple failure reasons matter     | Failure is exceptional and should be visible             |

Elixir:

```elixir
def load_optional_config(path) do
  File.read(path)
end

def load_required_config!(path) do
  File.read!(path)
end
```

Erlang has less uniform bang naming but the same design distinction exists through tagged results versus errors/exits.

**Design meaning:** Raising is a control-flow and failure-boundary decision. It should not be used merely to avoid writing a `case`.

**Common Pitfalls:** Public library APIs that raise for ordinary invalid user input are harder to compose. Conversely, returning `{:error, reason}` for impossible internal invariants can hide bugs.

### Task Pattern: Use Processes for Behavior — only when lifecycle, concurrency, or isolation matters

A BEAM process is a behavioral abstraction with state, mailbox, lifecycle, scheduling, and failure semantics.

Use a process when at least one of these is true:

| Reason to use process   | Example                                  |
| ----------------------- | ---------------------------------------- |
| Independent lifecycle   | connection handler                       |
| Serialized state access | counter server, session state            |
| Fault isolation         | worker that may crash independently      |
| Blocking or waiting     | process owns socket or external resource |
| Concurrent work         | task or worker pool                      |
| Supervision needed      | long-running component                   |
| Message protocol needed | server/client interaction                |
| Runtime identity needed | registered service or dynamic worker     |

Do not use a process merely because a thing exists in the domain.

Bad mental model:

```text
one user = one process
one document = one process
one setting = one process
```

Sometimes this is correct. Often it is not.

**Design meaning:** Processes are not objects. They are units of concurrency, isolation, state ownership, and failure behavior.

**Failure-first explanation:** The tempting wrong model is “processes are cheap, so each entity can be a process.” The surprising failure is mailbox growth, supervision overload, memory retention, registration complexity, and difficult state recovery. The correct explanation is that processes are cheap relative to OS threads, not free relative to plain data. The professional rule is: use a process when runtime behavior requires process semantics. The boundary changes in actor-like domains where each entity genuinely has independent lifecycle and communication.

**Common Pitfalls:** A `GenServer` that only wraps a map and performs pure transformations is often unnecessary.

### Task Pattern: Write a Raw Receive Loop — educational primitive, not default application style

A raw process loop makes state transitions explicit.

Elixir:

```elixir
defmodule CounterLoop do
  def start do
    spawn(fn -> loop(0) end)
  end

  defp loop(count) do
    receive do
      {:increment, amount} when is_integer(amount) ->
        loop(count + amount)

      {:get, caller, ref} ->
        send(caller, {:counter_value, ref, count})
        loop(count)

      :stop ->
        :ok
    end
  end
end
```

Erlang:

```erlang
start() ->
    spawn(fun() -> loop(0) end).

loop(Count) ->
    receive
        {increment, Amount} when is_integer(Amount) ->
            loop(Count + Amount);
        {get, Caller, Ref} ->
            Caller ! {counter_value, Ref, Count},
            loop(Count);
        stop ->
            ok
    end.
```

| Loop element           | Meaning                      |
| ---------------------- | ---------------------------- |
| Function parameter     | Current state                |
| `receive`              | Message protocol             |
| Recursive call         | Continue with next state     |
| Missing recursive call | Stop process                 |
| Timeout branch         | Idle behavior                |
| Message tag            | Protocol action              |
| Caller PID/ref         | Request-response correlation |

**Design meaning:** A process loop is a state machine. OTP behaviours such as `GenServer` formalize this pattern.

**Common Pitfalls:** Raw loops lack the standard observability, supervision integration, system messages, code-change hooks, and conventions of OTP behaviours. Use raw loops for low-level or educational cases; prefer OTP behaviours for ordinary long-running servers.

### Task Pattern: Use `Task` for Concurrent Work — result-oriented processes

Elixir `Task` is a higher-level abstraction for running work concurrently.

```elixir
task =
  Task.async(fn ->
    expensive_fetch()
  end)

case Task.yield(task, 5_000) || Task.shutdown(task) do
  {:ok, result} -> {:ok, result}
  nil -> {:error, :timeout}
end
```

Simpler:

```elixir
task = Task.async(fn -> expensive_fetch() end)
Task.await(task, 5_000)
```

| Use `Task` when                    | Prefer another abstraction when          |
| ---------------------------------- | ---------------------------------------- |
| Work has a result                  | Long-running stateful server needed      |
| Caller owns lifecycle              | Work should be supervised independently  |
| Parallel computation or I/O call   | Need backpressure/work queue             |
| Temporary process is enough        | Need named process                       |
| Failure should propagate to caller | Failure should be isolated and restarted |

Erlang has lower-level process primitives and OTP libraries; Elixir’s `Task` is a common modern convenience over BEAM processes.

**Design meaning:** `Task` is for concurrent work, not general state ownership.

**Common Pitfalls:** `Task.async` links the task to the caller in common usage. Failure semantics matter. Do not start tasks casually inside request processes without understanding timeouts, links, and supervision.

### Task Pattern: Use `Agent` Carefully — simple state wrapper, not default state model

Elixir `Agent` wraps state in a process with a simple API.

```elixir
{:ok, pid} = Agent.start_link(fn -> 0 end)

Agent.update(pid, fn count -> count + 1 end)
Agent.get(pid, fn count -> count end)
```

| Use `Agent` when                          | Prefer `GenServer` when                             |
| ----------------------------------------- | --------------------------------------------------- |
| State operations are simple               | Need custom protocol                                |
| No complex message handling               | Need validation per operation                       |
| No sophisticated lifecycle logic          | Need timeouts, replies, casts, side effects         |
| State transformation functions are enough | Need multiple state transitions with domain meaning |
| Prototype or small component              | Production component with behavior complexity       |

**Design meaning:** Agent separates state storage from transformation functions. It is convenient but can hide domain behavior in anonymous functions passed by callers.

**Common Pitfalls:** If callers pass arbitrary functions to mutate state, the owner module may not control invariants. A `GenServer` or module API may be better for domain state.

### Task Pattern: Use `GenServer` for Stateful Server Behavior — callback abstraction over process loops

`GenServer` formalizes a common server loop: initialize state, handle synchronous calls, handle asynchronous casts, handle ordinary messages, return new state.

Elixir:

```elixir
defmodule CounterServer do
  use GenServer

  def start_link(opts) do
    GenServer.start_link(__MODULE__, 0, opts)
  end

  def increment(pid, amount) do
    GenServer.cast(pid, {:increment, amount})
  end

  def get(pid) do
    GenServer.call(pid, :get)
  end

  @impl true
  def init(count) do
    {:ok, count}
  end

  @impl true
  def handle_cast({:increment, amount}, count) do
    {:noreply, count + amount}
  end

  @impl true
  def handle_call(:get, _from, count) do
    {:reply, count, count}
  end
end
```

Erlang:

```erlang
-module(counter_server).
-behaviour(gen_server).

-export([start_link/0, increment/2, get/1]).
-export([init/1, handle_cast/2, handle_call/3]).

start_link() ->
    gen_server:start_link(?MODULE, 0, []).

increment(Pid, Amount) ->
    gen_server:cast(Pid, {increment, Amount}).

get(Pid) ->
    gen_server:call(Pid, get).

init(Count) ->
    {ok, Count}.

handle_cast({increment, Amount}, Count) ->
    {noreply, Count + Amount}.

handle_call(get, _From, Count) ->
    {reply, Count, Count}.
```

| `GenServer` part     | Meaning                            |
| -------------------- | ---------------------------------- |
| `start_link`         | Start under caller/supervisor link |
| Public API functions | Hide message protocol              |
| `init`               | Initialize state                   |
| `handle_call`        | Synchronous request                |
| `handle_cast`        | Asynchronous request               |
| `handle_info`        | Ordinary messages                  |
| Return tuple         | Next process action and state      |

**Design meaning:** `GenServer` is not “an object.” It is a standardized process behavior with mailbox, state, and lifecycle semantics.

**Common Pitfalls:** Do not put long blocking work in `handle_call` without understanding that the server cannot handle other messages while blocked. Offload work, use tasks, split processes, or redesign flow if needed.
### Task Pattern: Choose Between `call`, `cast`, and Plain Messages — synchronous request, asynchronous command, and mailbox protocol

A `GenServer` exposes two major interaction styles: synchronous `call` and asynchronous `cast`. Raw process messages also remain possible through ordinary `send`.

Elixir:

```elixir
GenServer.call(pid, {:get, key}, 5_000)
GenServer.cast(pid, {:put, key, value})
send(pid, {:custom_message, payload})
```

Erlang:

```erlang
gen_server:call(Pid, {get, Key}, 5000).
gen_server:cast(Pid, {put, Key, Value}).
Pid ! {custom_message, Payload}.
```

| Interaction          | Elixir                  | Erlang                  | Meaning                             | Main risk                          |
| -------------------- | ----------------------- | ----------------------- | ----------------------------------- | ---------------------------------- |
| Synchronous request  | `GenServer.call/2,3`    | `gen_server:call/2,3`   | Caller waits for reply              | Timeout, server bottleneck         |
| Asynchronous command | `GenServer.cast/2`      | `gen_server:cast/2`     | Caller does not wait                | No backpressure, mailbox growth    |
| Plain message        | `send/2`                | `!`                     | Ordinary mailbox message            | Protocol can bypass server API     |
| Reply later          | `GenServer.reply/2`     | `gen_server:reply/2`    | Decouple reply from callback return | More complex lifecycle             |
| Direct function call | `Module.function(args)` | `module:function(Args)` | No process interaction              | No concurrency/lifecycle semantics |

Use `call` when the caller needs a result and should know if the server cannot respond in time.

```elixir
def get(pid, key) do
  GenServer.call(pid, {:get, key})
end
```

Use `cast` when the command is fire-and-forget and the caller does not need confirmation.

```elixir
def put(pid, key, value) do
  GenServer.cast(pid, {:put, key, value})
end
```

Use plain messages sparingly for messages that are genuinely outside the public `call`/`cast` API, such as system messages, monitor notifications, or integration with lower-level process protocols.

```elixir
@impl true
def handle_info({:DOWN, ref, :process, pid, reason}, state) do
  {:noreply, handle_worker_down(ref, pid, reason, state)}
end
```

**Design meaning:** `call`, `cast`, and `send` are not style variants. They encode different synchronization and backpressure semantics.

**Failure-first explanation:** The tempting wrong model is “use `cast` for speed because it does not block.” The surprising failure is that callers can send faster than the server can process, causing mailbox growth and stale state. The correct explanation is that `cast` removes caller waiting but not server work. The professional rule is: use `cast` only when losing immediate feedback is acceptable and overload is controlled elsewhere. The boundary changes when a queue, demand protocol, pool, or backpressure library manages load.

**Common Pitfalls:** Do not use `cast` when the caller must know whether the operation succeeded. An asynchronous command returning `:ok` only means the message was sent, not that the server performed the operation.

### Task Pattern: Handle Ordinary Process Messages in OTP — `handle_info` and hidden mailbox traffic

A `GenServer` receives more than `call` and `cast`. It also receives ordinary messages through `handle_info`.

Elixir:

```elixir
@impl true
def handle_info(:tick, state) do
  schedule_tick()
  {:noreply, refresh(state)}
end
```

Erlang:

```erlang
handle_info(tick, State) ->
    schedule_tick(),
    {noreply, refresh(State)}.
```

Common sources of `handle_info` messages:

| Source                            | Typical message shape                                  | Why it appears                   |
| --------------------------------- | ------------------------------------------------------ | -------------------------------- |
| `send/2` or `!`                   | any term                                               | Ordinary process message         |
| Timer                             | `:tick`, custom message, timer ref tuple depending API | Scheduled work                   |
| Monitor                           | `{:DOWN, ref, :process, pid, reason}`                  | Monitored process died           |
| Linked process with trapped exits | `{:EXIT, pid, reason}`                                 | Exit signal converted to message |
| Socket active mode                | socket messages                                        | Network data                     |
| Port                              | port messages                                          | External process communication   |
| Library/framework                 | documented callback messages                           | Integration protocol             |

Example with monitor in Elixir:

```elixir
@impl true
def handle_info({:DOWN, ref, :process, pid, reason}, state) do
  state = remove_worker(ref, pid, reason, state)
  {:noreply, state}
end
```

Erlang:

```erlang
handle_info({'DOWN', Ref, process, Pid, Reason}, State) ->
    NewState = remove_worker(Ref, Pid, Reason, State),
    {noreply, NewState}.
```

**Design meaning:** `GenServer` does not remove the mailbox. It standardizes how mailbox messages are handled. Every server still needs a protocol for unexpected or ordinary messages.

**Common Pitfalls:** A catch-all `handle_info(_msg, state)` that silently ignores everything can hide serious protocol bugs. If unexpected messages are possible, logging or telemetry may be appropriate, but avoid log spam under attack or overload.

### Task Pattern: Defer Work Without Blocking a Server — reply later, spawn task, or split process

A `GenServer` callback runs inside the server process. Long work blocks the server from handling other messages.

Bad pattern:

```elixir
@impl true
def handle_call(:expensive, _from, state) do
  result = very_slow_external_call()
  {:reply, result, state}
end
```

Better options depend on the required semantics.

| Need                                          | Option                               | Tradeoff                               |
| --------------------------------------------- | ------------------------------------ | -------------------------------------- |
| Caller waits but work should not block server | Save `from`, start task, reply later | More state and failure handling        |
| Work is independent and supervised            | Use supervised worker/task           | More architecture                      |
| Work belongs in another service               | Split into another process           | More message protocol                  |
| Result can be stale or cached                 | Return cached state, refresh async   | Consistency tradeoff                   |
| Work must be serialized                       | Keep in server                       | Accept bottleneck or redesign capacity |

Elixir reply-later sketch:

```elixir
@impl true
def handle_call(:expensive, from, state) do
  task =
    Task.async(fn ->
      very_slow_external_call()
    end)

  state =
    state
    |> put_in([:pending, task.ref], from)
    |> put_in([:tasks, task.ref], task)

  {:noreply, state}
end

@impl true
def handle_info({ref, result}, state) do
  {from, state} = pop_in(state, [:pending, ref])
  GenServer.reply(from, result)
  {:noreply, state}
end
```

This is incomplete without proper `:DOWN` handling, but it shows the shape: the server does not block on the slow work.

**Design meaning:** A `GenServer` serializes its callbacks. That is good for state consistency and bad for long blocking work. Concurrency should be explicit.

**Common Pitfalls:** Spawning unsupervised tasks inside a server can create hidden failures. If tasks matter, monitor them, supervise them, or use `Task.Supervisor`.

### Task Pattern: Use `Task.Supervisor` for Supervised Temporary Work

Elixir’s `Task.Supervisor` is useful when concurrent tasks should be linked to supervision rather than to an arbitrary caller.

```elixir
{:ok, pid} =
  Task.Supervisor.start_child(MyApp.TaskSupervisor, fn ->
    expensive_work()
  end)
```

Async supervised task:

```elixir
task =
  Task.Supervisor.async_nolink(MyApp.TaskSupervisor, fn ->
    expensive_work()
  end)
```

| Task style                     | Use when                                          | Failure behavior               |
| ------------------------------ | ------------------------------------------------- | ------------------------------ |
| `Task.async`                   | Caller owns task and wants result                 | Linked to caller in common use |
| `Task.await`                   | Caller waits for result                           | May exit on timeout/failure    |
| `Task.yield`                   | Caller polls with timeout                         | More controlled timeout        |
| `Task.Supervisor.start_child`  | Fire-and-forget supervised work                   | Supervisor owns lifecycle      |
| `Task.Supervisor.async_nolink` | Caller wants result but not link failure directly | Must handle monitor result     |

**Design meaning:** Supervised tasks are temporary processes with explicit lifecycle management. They are not replacements for persistent servers.

**Common Pitfalls:** Starting many tasks without concurrency limits can overload the system. Supervision is not backpressure.

### Task Pattern: Use Supervisors as Behavioral Composition — not only fault recovery

Supervision is formally Part 5 and Part 7 territory, but it also affects behavior composition. A supervision tree defines which components exist, how they start, and how they recover.

Elixir:

```elixir
children = [
  {Registry, keys: :unique, name: MyApp.Registry},
  {DynamicSupervisor, strategy: :one_for_one, name: MyApp.WorkerSupervisor},
  MyApp.Cache
]

Supervisor.start_link(children, strategy: :one_for_one)
```

Erlang supervision is configured through supervisor callbacks or child specs.

| Behavioral role    | Supervision contribution                                 |
| ------------------ | -------------------------------------------------------- |
| Startup order      | Children start under a parent                            |
| Failure reaction   | Restart strategy defines recovery behavior               |
| Component boundary | Child process becomes an architectural unit              |
| Dynamic behavior   | `DynamicSupervisor` manages runtime children             |
| Fault containment  | Crashes are localized to supervised subtrees             |
| API design         | Public modules often expose `start_link` for supervisors |

**Design meaning:** Supervision is not merely “restart on crash.” It is behavioral architecture: it defines ownership, lifecycle, and recovery relationships.

**Common Pitfalls:** Do not supervise everything blindly. A process that repeatedly crashes may be restarted until the supervisor itself escalates. Restart intensity, state recovery, and external effects matter.

### Task Pattern: Use `DynamicSupervisor` for Runtime Process Sets

Use a dynamic supervisor when children are started at runtime rather than as a fixed static list.

Elixir:

```elixir
DynamicSupervisor.start_child(
  MyApp.WorkerSupervisor,
  {MyApp.Worker, worker_arg}
)
```

| Use dynamic supervision when          | Avoid when                                    |
| ------------------------------------- | --------------------------------------------- |
| Number of children changes at runtime | Fixed known child list                        |
| Each child has independent lifecycle  | Plain data would be enough                    |
| Children need fault isolation         | Work is one short calculation                 |
| Children should be restartable        | Restart would duplicate external side effects |
| There is a clear child spec           | Startup is ad hoc and untracked               |

**Design meaning:** Dynamic supervision is behavior modeling for a population of processes. It is not a collection data structure; it is lifecycle management.

**Common Pitfalls:** Do not use dynamically supervised processes as a default substitute for maps, structs, or database rows. Use them when independent runtime behavior exists.

### Task Pattern: Use Behaviours for Module-Level Contracts

A behaviour defines callbacks a module must implement. It is the right abstraction when **modules** are interchangeable implementations of a contract.

Elixir behaviour:

```elixir
defmodule Storage do
  @callback put(binary(), binary()) :: :ok | {:error, term()}
  @callback get(binary()) :: {:ok, binary()} | {:error, :not_found | term()}
end
```

Implementation:

```elixir
defmodule MemoryStorage do
  @behaviour Storage

  @impl true
  def put(_key, _value), do: :ok

  @impl true
  def get(_key), do: {:error, :not_found}
end
```

Erlang behaviour declaration in an implementation:

```erlang
-behaviour(storage).
```

A custom Erlang behaviour module can define callbacks:

```erlang
-callback put(binary(), binary()) -> ok | {error, term()}.
-callback get(binary()) -> {ok, binary()} | {error, not_found | term()}.
```

| Use behaviour when                                   | Prefer something else when               |
| ---------------------------------------------------- | ---------------------------------------- |
| Multiple modules implement the same callback set     | Only one implementation exists           |
| Runtime/config selects implementation module         | Simple local function argument is enough |
| Framework calls callbacks                            | Data type dispatch is needed             |
| OTP-style lifecycle callback exists                  | Plain data transformation is enough      |
| You need compile/tool warnings for missing callbacks | Syntax extension is the real need        |

**Design meaning:** A behaviour is a module contract, not a class, not an object, and not runtime type dispatch over values.

**Common Pitfalls:** Do not create a behaviour just to make code “testable.” Passing a module or function may be enough. Behaviours are best when the callback contract is stable and meaningful.

### Task Pattern: Use `@impl true` — callback clarity and drift detection in Elixir

Elixir’s `@impl true` marks a function as implementing a callback.

```elixir
@impl true
def init(state) do
  {:ok, state}
end
```

It is common in `GenServer`, `Supervisor`, protocols, and custom behaviours.

| Benefit                  | Meaning                                      |
| ------------------------ | -------------------------------------------- |
| Reader clarity           | This function is part of a callback contract |
| Compiler warnings        | Helps detect callback mismatch               |
| Documentation discipline | Separates callbacks from ordinary public API |
| Refactoring help         | Changing behaviour callbacks becomes visible |

Example:

```elixir
defmodule Worker do
  use GenServer

  @impl true
  def init(arg) do
    {:ok, arg}
  end

  @impl true
  def handle_call(:get, _from, state) do
    {:reply, state, state}
  end
end
```

**Design meaning:** `@impl true` is small syntax with large maintenance value. It makes callback implementation explicit.

**Common Pitfalls:** Do not omit `@impl true` in callback-heavy modules. Without it, ordinary functions and callback functions blur together.

### Task Pattern: Use Protocols for Data-Polymorphic Behavior in Elixir

A protocol defines operations implemented by different data types.

```elixir
defprotocol Render do
  def render(value)
end
```

Implementations:

```elixir
defimpl Render, for: BitString do
  def render(value), do: value
end

defimpl Render, for: User do
  def render(%User{name: name}), do: "User: #{name}"
end
```

Use:

```elixir
Render.render("hello")
Render.render(%User{name: "Ada"})
```

| Use protocol when                              | Avoid protocol when                           |
| ---------------------------------------------- | --------------------------------------------- |
| Operation varies by data type                  | Only one data type exists                     |
| New types should implement same operation      | Variation is by module/service                |
| API should be open to extension                | A simple function clause is local and enough  |
| Data type owns rendering/encoding/etc.         | Behavior depends on runtime configuration     |
| Dispatch by first argument type is appropriate | Multiple arguments jointly determine behavior |

**Design meaning:** Protocols are Elixir’s main data-polymorphism mechanism. They are closer to Clojure protocols or typeclass-like ad hoc polymorphism than to classical inheritance.

**Common Pitfalls:** Do not use protocols to model service adapters. If the interchangeable thing is a module implementing callbacks, use a behaviour.

### Task Pattern: Choose Between Protocol and Function Clause

A function clause is local and closed. A protocol is extensible and dispatched by data type.

Function clause:

```elixir
def render(%User{name: name}), do: "User: #{name}"
def render(%Admin{name: name}), do: "Admin: #{name}"
```

Protocol:

```elixir
defprotocol Render do
  def render(value)
end
```

| Criterion    | Function clauses           | Protocol                           |
| ------------ | -------------------------- | ---------------------------------- |
| Variant set  | Known locally              | Open/extensible                    |
| Dispatch     | Ordered pattern matching   | Protocol dispatch by data type     |
| Location     | One module                 | Implementations distributed        |
| Best for     | Internal domain variation  | Cross-type operation               |
| Cost         | Simple but less extensible | More structure                     |
| Failure mode | Missing function clause    | Protocol undefined/not implemented |

**Design meaning:** Function clauses are direct and excellent when the domain variants belong together. Protocols are better when types from different modules should participate in a shared operation.

**Common Pitfalls:** Do not prematurely make every multi-clause function into a protocol. Protocols add indirection and can make local behavior harder to see.

### Task Pattern: Choose Between Behaviour and Protocol

This is a central Elixir abstraction decision.

| Question         | Behaviour                                      | Protocol                                           |
| ---------------- | ---------------------------------------------- | -------------------------------------------------- |
| What varies?     | Module implementation                          | Data type                                          |
| Who calls whom?  | Framework or caller invokes callback module    | Protocol dispatch invokes implementation for value |
| Typical examples | storage adapter, parser adapter, OTP callbacks | `String.Chars`, `Inspect`, `Enumerable`            |
| Contract shape   | Several callbacks possible                     | Functions over first argument                      |
| Configuration    | Often selected by module name                  | Selected by runtime data type                      |
| Extension point  | Add implementation module                      | Add implementation for type                        |

Behaviour example:

```elixir
defmodule Parser do
  @callback parse(binary()) :: {:ok, term()} | {:error, term()}
end
```

Protocol example:

```elixir
defprotocol ToMessage do
  def to_message(value)
end
```

**Professional rule:** Use a behaviour when the abstraction is “this module knows how to do X.” Use a protocol when the abstraction is “this value type supports operation X.”

**Common Pitfalls:** An adapter pattern implemented as a protocol usually becomes awkward because the value being dispatched on is not the real implementation choice. Use behaviours for adapters.

### Task Pattern: Use Macros for Syntax, Not Ordinary Reuse

Elixir macros generate code at compile time. They are powerful and should be used for problems ordinary functions cannot solve cleanly.

Function:

```elixir
def unless_nil(value, fun) do
  if value != nil do
    fun.(value)
  end
end
```

Macro:

```elixir
defmacro unless_nil(value, do: block) do
  quote do
    if !is_nil(unquote(value)) do
      unquote(block)
    end
  end
end
```

| Use macro when                    | Prefer function when                  |
| --------------------------------- | ------------------------------------- |
| Need to control evaluation        | Ordinary eager evaluation is fine     |
| Need to introduce syntax          | Function call syntax is acceptable    |
| Need compile-time code generation | Runtime behavior is enough            |
| Need DSL declarations             | Data structure config is enough       |
| Need caller environment           | Explicit arguments work               |
| Need pattern of definitions       | Higher-order function or module works |

**Design meaning:** Macros are compile-time abstraction, not “stronger functions.” They change code before it runs.

**Failure-first explanation:** The tempting wrong model is “macro avoids repetition, so it is better.” The surprising failure is code that is hard to trace, debug, and refactor because behavior is generated invisibly. The correct explanation is that macros create a compile-time layer. The professional rule is: use macros when syntax or compile-time generation is the real requirement; otherwise use functions. The boundary changes in framework and DSL code, where macros create a coherent language for users.

**Common Pitfalls:** Do not hide runtime side effects in macros unless the DSL clearly documents it. Macro users often cannot see what code is generated.

### Task Pattern: Read and Design DSLs — Elixir `use`, macros, sigils, and declarative blocks

Elixir DSLs are usually built from macros, `use`, custom sigils, module attributes, and `do` blocks.

Example style:

```elixir
defmodule UserSchema do
  use SomeSchemaDSL

  field :name, :string
  field :email, :string
end
```

This may expand into functions, metadata, validations, or compile-time structures.

| DSL feature         | Likely mechanism            | Reader question                       |
| ------------------- | --------------------------- | ------------------------------------- |
| `use SomeModule`    | `__using__` macro           | What does it import/define/configure? |
| Bare declarations   | Imported macros             | What code or metadata is generated?   |
| `do` block          | Macro receives quoted block | When is the block evaluated?          |
| Custom sigil        | Sigil macro/function        | What does the literal become?         |
| Module attributes   | Compile-time metadata       | Is it consumed by a macro?            |
| Generated functions | Macro expansion             | Are callbacks or APIs created?        |

**Design meaning:** DSLs can make domain code concise and declarative. They can also conceal control flow and create compile-time coupling.

**Professional rule:** A good DSL should make a real domain clearer than ordinary code, have stable expansion rules, produce understandable errors, and document generated behavior.

**Common Pitfalls:** A DSL that only saves a few characters while hiding ordinary function calls is usually not worth the macro complexity.

### Task Pattern: Use Elixir `quote` and `unquote` Safely — code as structured data

Elixir macros manipulate AST, not raw strings.

```elixir
quote do
  1 + 2
end
```

Macro example:

```elixir
defmacro debug_expr(expr) do
  quote do
    value = unquote(expr)
    IO.inspect(value, label: unquote(Macro.to_string(expr)))
    value
  end
end
```

| Macro concept      | Meaning                                        |
| ------------------ | ---------------------------------------------- |
| `quote`            | Turn code into AST                             |
| `unquote`          | Insert AST/value into quoted code              |
| Hygiene            | Avoid accidental variable capture              |
| Caller environment | Compile-time context of macro call             |
| Expansion          | Generated code replaces macro call             |
| `bind_quoted`      | Safer binding of unquoted values in many cases |

Safer pattern:

```elixir
defmacro debug_value(expr) do
  label = Macro.to_string(expr)

  quote bind_quoted: [expr: expr, label: label] do
    value = expr
    IO.inspect(value, label: label)
    value
  end
end
```

**Design meaning:** Macro hygiene and evaluation control are the central difficulty. Macros are code-generation programs.

**Common Pitfalls:** Repeated `unquote(expr)` can evaluate generated code multiple times if not handled carefully. Use `bind_quoted` when appropriate.

### Task Pattern: Use Erlang Macros and Parse Transforms with Caution

Erlang has preprocessor macros and parse transforms. They are less central to ordinary Erlang than Elixir macros are to Elixir’s ecosystem, but they appear in real code.

Macro:

```erlang
-define(DEFAULT_TIMEOUT, 5000).

timeout() ->
    ?DEFAULT_TIMEOUT.
```

Parameterized macro:

```erlang
-define(LOG(Term), io:format("~p~n", [Term])).
```

| Tool            | Meaning                         | Caution                                  |
| --------------- | ------------------------------- | ---------------------------------------- |
| `-define`       | Preprocessor macro              | Textual/code expansion can obscure logic |
| `?MACRO`        | Macro use                       | Not a variable                           |
| `-include`      | Insert header file              | Header coupling                          |
| `-include_lib`  | Include dependency header       | Build path dependency                    |
| Parse transform | Compile-time AST transformation | Can severely harm readability/tooling    |

**Design meaning:** Erlang macros are often used for constants, records, logging helpers, and compatibility. Parse transforms can create powerful DSL-like behavior but are controversial because they make source code less direct.

**Common Pitfalls:** Do not use Erlang macros for ordinary functions. Prefer functions unless compile-time substitution is genuinely needed.

### Task Pattern: Design Callback APIs — caller-supplied behavior with clear contracts

A callback API lets the caller provide behavior.

Elixir:

```elixir
@spec around(term(), (term() -> {:ok, term()} | {:error, term()})) ::
        {:ok, term()} | {:error, term()}
def around(value, fun) when is_function(fun, 1) do
  case before_step(value) do
    {:ok, prepared} -> fun.(prepared)
    {:error, reason} -> {:error, reason}
  end
end
```

Erlang:

```erlang
-spec around(term(), fun((term()) -> {ok, term()} | {error, term()})) ->
    {ok, term()} | {error, term()}.
around(Value, Fun) when is_function(Fun, 1) ->
    case before_step(Value) of
        {ok, Prepared} ->
            Fun(Prepared);
        {error, Reason} ->
            {error, Reason}
    end.
```

| Callback design question               | Good answer                                       |
| -------------------------------------- | ------------------------------------------------- |
| What arity is expected?                | Check or document `is_function(fun, n)`           |
| What should callback return?           | Specify tagged result or plain value              |
| Can callback raise?                    | Decide and document                               |
| Is callback called once or many times? | Important for side effects                        |
| Is callback called synchronously?      | Important for process and resource assumptions    |
| Does callback run in same process?     | Important for process dictionary, messages, exits |
| Are errors wrapped?                    | Important for caller handling                     |

**Design meaning:** A function argument is a lightweight behavior contract. It still needs a clear return protocol.

**Common Pitfalls:** Do not call user-supplied callbacks inside critical server state without considering blocking, crashes, and reentrancy-like effects.

### Task Pattern: Compose Modules — explicit dependency, configured module, or application environment

Modules can be composed by direct calls, dependency injection, behaviour-based callbacks, or runtime configuration.

Direct call:

```elixir
UserRepo.fetch(id)
```

Configured module:

```elixir
def fetch(id, repo \\ UserRepo) do
  repo.fetch(id)
end
```

Application environment:

```elixir
repo = Application.fetch_env!(:my_app, :user_repo)
repo.fetch(id)
```

Behaviour-backed module:

```elixir
@callback fetch(pos_integer()) :: {:ok, User.t()} | {:error, term()}
```

| Composition style  | Use when                             | Risk                           |
| ------------------ | ------------------------------------ | ------------------------------ |
| Direct module call | Dependency is stable                 | Harder to substitute           |
| Function argument  | Local substitution                   | Can clutter signatures         |
| Module argument    | Adapter-like dependency              | Need behaviour/spec discipline |
| Application env    | App-wide configurable implementation | Hidden global dependency       |
| Process lookup     | Runtime service                      | Failure/availability issues    |
| Macro injection    | Framework convention                 | Hidden compile-time dependency |

**Design meaning:** Module composition is dependency modeling. Erlang / Elixir does not force a class-based dependency injection framework. Simpler explicit dependencies are often enough.

**Common Pitfalls:** Do not overuse application environment for ordinary dependencies. It makes code harder to reason about and test if dependencies are hidden.

### Task Pattern: Design Public Process APIs — functions first, callbacks hidden

A process module should expose domain functions and hide OTP callback details.

Good Elixir:

```elixir
defmodule Cache do
  use GenServer

  def start_link(opts) do
    GenServer.start_link(__MODULE__, %{}, opts)
  end

  def put(server, key, value) do
    GenServer.call(server, {:put, key, value})
  end

  def get(server, key) do
    GenServer.call(server, {:get, key})
  end

  @impl true
  def init(state), do: {:ok, state}

  @impl true
  def handle_call({:put, key, value}, _from, state) do
    {:reply, :ok, Map.put(state, key, value)}
  end

  @impl true
  def handle_call({:get, key}, _from, state) do
    {:reply, Map.fetch(state, key), state}
  end
end
```

Caller:

```elixir
Cache.put(CacheServer, :x, 1)
Cache.get(CacheServer, :x)
```

Not:

```elixir
GenServer.call(CacheServer, {:put, :x, 1})
```

| Layer                | Should be public?                | Reason                          |
| -------------------- | -------------------------------- | ------------------------------- |
| `start_link`         | Yes                              | Supervision/startup contract    |
| Domain functions     | Yes                              | Stable API                      |
| `init`               | Callback, usually not caller API | OTP calls it                    |
| `handle_call`        | Callback, not caller API         | Message protocol implementation |
| Raw message tuples   | Usually no                       | Internal protocol               |
| State representation | Usually no                       | Internal implementation         |

**Design meaning:** OTP callbacks are implementation details of process behavior. Public functions preserve API stability even if internals change from `GenServer` to ETS, another process, or pure functions.

**Common Pitfalls:** If application code outside the server module calls `GenServer.call(pid, {:some_internal_tuple, ...})`, the internal protocol has leaked.

### Task Pattern: Use `Supervisor`, `GenServer`, `Task`, and `Agent` by Behavioral Role

Elixir’s common process abstractions should be chosen by behavior, not familiarity.

| Abstraction         | Behavioral role                  | Use when                              | Avoid when                   |
| ------------------- | -------------------------------- | ------------------------------------- | ---------------------------- |
| `GenServer`         | Stateful server with protocol    | Need serialized state and calls/casts | Pure data transformation     |
| `Supervisor`        | Static fault/lifecycle parent    | Fixed child set                       | Dynamic many children        |
| `DynamicSupervisor` | Runtime child manager            | Children start/stop dynamically       | Children are just data       |
| `Task`              | Temporary concurrent computation | Need result or concurrent side work   | Long-lived state             |
| `Task.Supervisor`   | Supervised temporary work        | Tasks need supervision                | Need queue/backpressure      |
| `Agent`             | Simple state wrapper             | Very simple state access              | Complex domain behavior      |
| `Registry`          | Process lookup                   | Dynamic names                         | General database             |
| Raw `spawn`         | Low-level process                | Educational or custom primitive       | Ordinary supervised app code |

**Design meaning:** These abstractions are not interchangeable. Each encodes different lifecycle, state, communication, and failure assumptions.

**Common Pitfalls:** Choosing `Agent` or `GenServer` because “state exists” is too weak. State can be plain immutable data. A process is justified by runtime behavior.

### Task Pattern: Avoid Callback Hell in OTP Code — keep callback bodies small and named

OTP callbacks can become large if business logic is embedded directly.

Bad:

```elixir
@impl true
def handle_call({:register, params}, _from, state) do
  with {:ok, attrs} <- parse_params(params),
       {:ok, user} <- build_user(attrs),
       :ok <- validate_capacity(state),
       {:ok, state} <- insert_user(state, user),
       :ok <- notify(user) do
    {:reply, {:ok, user}, state}
  else
    {:error, reason} ->
      {:reply, {:error, reason}, state}
  end
end
```

Better structure:

```elixir
@impl true
def handle_call({:register, params}, _from, state) do
  case register_user(params, state) do
    {:ok, user, new_state} ->
      {:reply, {:ok, user}, new_state}

    {:error, reason} ->
      {:reply, {:error, reason}, state}
  end
end

defp register_user(params, state) do
  ...
end
```

| Callback design rule                    | Why                                   |
| --------------------------------------- | ------------------------------------- |
| Keep callback as protocol adapter       | Separates OTP shape from domain logic |
| Move domain logic to private functions  | Easier testing and reading            |
| Keep state transitions explicit         | Avoid hidden mutation assumptions     |
| Avoid long blocking work                | Server remains responsive             |
| Normalize return shapes                 | Public API remains stable             |
| Handle unexpected messages deliberately | Avoid silent mailbox bugs             |

**Design meaning:** OTP callbacks are boundary functions between generic process machinery and domain behavior. Treat them as adapters.

**Common Pitfalls:** Massive `handle_call` and `handle_cast` functions become process-oriented monoliths. Split by domain operation.

### Task Pattern: Structure Recursive Algorithms — base case, recursive case, accumulator, and library replacement

Recursion in Erlang / Elixir should make the data shape obvious.

Elixir:

```elixir
def reverse(list), do: reverse(list, [])

defp reverse([], acc), do: acc
defp reverse([h | t], acc), do: reverse(t, [h | acc])
```

Erlang:

```erlang
reverse(List) ->
    reverse(List, []).

reverse([], Acc) ->
    Acc;
reverse([H | T], Acc) ->
    reverse(T, [H | Acc]).
```

| Recursive component  | Purpose                        |
| -------------------- | ------------------------------ |
| Public wrapper       | Establish initial accumulator  |
| Base case            | Stop traversal                 |
| Recursive case       | Decompose input                |
| Accumulator          | Carry state                    |
| Tail call            | Allows loop-like execution     |
| Final transformation | Often reverse accumulated list |

**Design meaning:** Recursion is explicit state transition through function arguments. It is the functional equivalent of a loop, but with pattern matching over data shape.

**Common Pitfalls:** Do not build lists by appending at the end in recursive loops. Prefer prepending and reversing, or use library functions.

### Task Pattern: Use Tail Recursion Correctly — when it matters and when it does not

Tail recursion means the recursive call is the last operation.

Tail-recursive:

```elixir
defp sum([], acc), do: acc
defp sum([h | t], acc), do: sum(t, acc + h)
```

Not tail-recursive:

```elixir
def sum([]), do: 0
def sum([h | t]), do: h + sum(t)
```

| Question                                         | Practical answer                               |
| ------------------------------------------------ | ---------------------------------------------- |
| Is tail recursion always faster?                 | Not always; clarity and data structure matter  |
| Is tail recursion important for infinite loops?  | Yes, process loops need tail calls             |
| Should every recursive function use accumulator? | No, only when depth/cost matters               |
| Are library functions usually preferable?        | Often, for standard list transformations       |
| Does BEAM optimize tail calls?                   | Tail-recursive loops are central to BEAM style |
| Can tail recursion change output order?          | Yes, accumulator patterns often reverse order  |

**Design meaning:** Tail recursion matters most for long-running loops and large traversals. It is not a moral requirement for every small recursive definition.

**Common Pitfalls:** Tail-recursive code that requires repeated `++` may be worse than a clear non-tail form for small inputs or a library function.

### Task Pattern: Use Comprehensions for Declarative Generation

Elixir:

```elixir
for user <- users,
    user.active,
    do: user.email
```

Pattern matching in generator:

```elixir
for %{active: true, email: email} <- users do
  email
end
```

Erlang:

```erlang
[Email || #{active := true, email := Email} <- Users].
```

| Comprehension use    | Good when                | Avoid when                        |
| -------------------- | ------------------------ | --------------------------------- |
| Map + filter         | Transformation is simple | Complex error handling            |
| Cartesian product    | Multiple generators      | Large unbounded combinations      |
| Binary generation    | Protocol construction    | Complex parser state              |
| Map output in Elixir | `into: %{}`              | Duplicate key semantics matter    |
| Side-effect loop     | Rarely ideal             | Use `Enum.each` / `lists:foreach` |

Elixir `into`:

```elixir
for {key, value} <- pairs, into: %{} do
  {key, normalize(value)}
end
```

**Design meaning:** Comprehensions express data generation. They should not become hidden imperative loops.

**Common Pitfalls:** Pattern mismatch in generators filters values rather than crashing. This is useful but can hide unexpected shapes if the programmer expected strict validation.

### Task Pattern: Use Lazy Streams in Elixir — delayed computation and bounded work

`Stream` composes lazy transformations. `Enum` executes eager transformations.

```elixir
users
|> Stream.map(&normalize_user/1)
|> Stream.filter(&active?/1)
|> Enum.take(10)
```

| Use `Stream` when              | Prefer `Enum` when               |
| ------------------------------ | -------------------------------- |
| Input is large                 | Data is small                    |
| Early termination matters      | Simplicity matters               |
| Infinite sequence possible     | Full materialization is intended |
| Avoiding intermediates matters | Debuggability is more important  |
| Transformation chain is long   | One or two steps are enough      |

**Design meaning:** `Stream` changes evaluation timing. Errors may occur later than where the stream is built, because work happens when the stream is consumed.

**Failure-first explanation:** The tempting wrong model is “`Stream.map` maps now, just more efficiently.” The surprising behavior is that side effects or errors do not happen until enumeration. The correct explanation is lazy composition. The professional rule is: use streams when delayed evaluation is intentional; do not use them just because they sound faster.

**Common Pitfalls:** Do not put side effects in streams unless delayed execution is explicitly understood.

### Task Pattern: Separate Pure Core from Effectful Shell

A robust BEAM design often separates pure transformation from side-effect boundaries.

```elixir
def register_user(params) do
  with {:ok, command} <- parse_create_user(params),
       {:ok, user} <- build_user(command),
       :ok <- save_user(user),
       :ok <- notify_user(user) do
    {:ok, user}
  end
end

defp build_user(command) do
  User.new(command)
end
```

More separated:

```elixir
def prepare_user(params) do
  with {:ok, command} <- CreateUser.new(params),
       {:ok, user} <- User.new(command) do
    {:ok, user}
  end
end

def persist_user(user) do
  UserRepo.insert(user)
end
```

| Layer                      | Behavior                                 |
| -------------------------- | ---------------------------------------- |
| Parsing/validation         | Converts external data to internal shape |
| Pure domain transformation | Builds/updates values                    |
| Effectful boundary         | Database, file, network, process         |
| Orchestration              | Sequences pure and effectful steps       |
| Supervision                | Manages process failure and lifecycle    |

**Design meaning:** Erlang / Elixir is not pure, but pure cores are easier to test and reason about. Effects should be explicit at boundaries.

**Common Pitfalls:** Putting database calls inside small domain transformation functions makes them harder to test and reuse.

### Task Pattern: Use Pattern Matching for API Clarity, Not Cleverness

Pattern matching can make code elegant or cryptic.

Clear:

```elixir
def full_name(%User{first_name: first, last_name: last}) do
  "#{first} #{last}"
end
```

Potentially too clever:

```elixir
def process({:ok, [%{a: {_, [x | _]}} | _]}), do: x
```

| Good pattern use                 | Bad pattern use                      |
| -------------------------------- | ------------------------------------ |
| Exposes expected public shape    | Deeply extracts unrelated internals  |
| Separates meaningful variants    | Encodes too much in function head    |
| Clarifies message protocol       | Makes errors hard to diagnose        |
| Keeps invalid states out         | Depends on fragile nested structure  |
| Matches stable domain structures | Matches raw external data too deeply |

**Design meaning:** Pattern matching is a contract language. Overly deep patterns create brittle contracts.

**Common Pitfalls:** If a pattern needs explanation in a comment, consider breaking it into named helper functions or intermediate matches.

### Task Pattern: Design Domain-Specific Return Shapes

Return shape is behavioral design.

| Function purpose                     | Good return shape                           |                       |
| ------------------------------------ | ------------------------------------------- | --------------------- |
| Pure transformation that cannot fail | value                                       |                       |
| Validation                           | `:ok                                        | {:error, reason}`     |
| Constructor                          | `{:ok, value}                               | {:error, reason}`     |
| Lookup without reason                | `{:ok, value}                               | :error`               |
| Lookup with reason                   | `{:ok, value}                               | {:error, :not_found}` |
| External I/O                         | `{:ok, result}                              | {:error, reason}`     |
| Start process                        | `{:ok, pid}                                 | {:error, reason}`     |
| Async command                        | `:ok` if send accepted                      |                       |
| Synchronous process call             | reply or exit/timeout depending abstraction |                       |

Example:

```elixir
def validate_user(user) do
  cond do
    user.name == "" -> {:error, :blank_name}
    user.email == "" -> {:error, :blank_email}
    true -> :ok
  end
end
```

**Design meaning:** Return shapes drive caller behavior. A good return shape makes correct handling natural.

**Common Pitfalls:** Avoid returning booleans when the caller needs a reason. `false` is too weak for validation failures that must be displayed, logged, or handled differently.

### Task Pattern: Design Function Names Around Behavior

Names should reveal whether behavior is pure, effectful, fallible, process-oriented, or dangerous.

| Naming pattern | Typical meaning                                         |
| -------------- | ------------------------------------------------------- |
| `new`          | Construct value, often validates                        |
| `new!`         | Construct or raise                                      |
| `parse`        | Convert external representation, may fail               |
| `parse!`       | Parse or raise                                          |
| `fetch`        | Lookup that may fail explicitly                         |
| `get`          | Retrieve, often may return nil/default or process state |
| `put`          | Store/update                                            |
| `save`         | Persist externally                                      |
| `start_link`   | Start process linked for supervision                    |
| `handle_*`     | Callback implementation                                 |
| `to_*`         | Conversion, often total if input shape known            |
| `from_*`       | Construction/conversion from representation             |
| `normalize`    | Convert to canonical form                               |
| `validate`     | Check constraints                                       |

**Design meaning:** In dynamic languages, naming carries semantic weight. Names help compensate for fewer compile-time guarantees.

**Common Pitfalls:** Do not name an effectful function like a pure accessor. `user(id)` is weaker than `fetch_user(id)` if it queries a database.

### Task Pattern: Maintain Abstraction Boundaries in Modules

A module should have a coherent responsibility.

| Module smell                                           | Better direction                                 |
| ------------------------------------------------------ | ------------------------------------------------ |
| `Utils` with unrelated functions                       | Split by domain concept                          |
| Process callbacks mixed with large domain logic        | Move domain logic to private or separate modules |
| Public functions expose internal tuples                | Wrap in stable API                               |
| Many unrelated `alias` lines                           | Reconsider module scope                          |
| Many `use` macros                                      | Clarify framework roles                          |
| Deep dependencies                                      | Split orchestration from pure transformation     |
| Private functions only used by one branch but far away | Group related logic                              |
| Repeated validation in many modules                    | Boundary module                                  |

**Design meaning:** Modules are the main unit of namespacing and API design. Erlang / Elixir does not use classes as the organizing unit; modules carry that burden.

**Common Pitfalls:** A module that both parses HTTP params, validates domain objects, performs database writes, sends emails, and owns process state likely has too many responsibilities.

### Task Pattern: Compose Across Erlang and Elixir — call style and abstraction mismatch

Elixir can call Erlang directly:

```elixir
:crypto.hash(:sha256, "hello")
:ets.lookup(table, key)
:gen_tcp.send(socket, data)
```

Erlang can call compiled Elixir modules, though naming and conventions differ.

| Interop issue | Practical rule                                                    |
| ------------- | ----------------------------------------------------------------- |
| Module naming | Elixir modules compile to BEAM module atoms                       |
| Atoms         | Same runtime atoms                                                |
| Strings       | Check binary versus charlist expectations                         |
| Options       | Elixir keyword lists often work as Erlang proplists               |
| Records       | Elixir sees tuples unless record definition knowledge is supplied |
| Structs       | Erlang sees maps with `__struct__` key                            |
| Errors        | Return tuple conventions often align                              |
| Processes     | Same PIDs, refs, messages                                         |

**Design meaning:** Interop is runtime-natural but convention-sensitive. The abstraction mismatch is usually not “can these languages call each other?” but “does the caller understand the expected data shape?”

**Common Pitfalls:** Do not wrap every Erlang function just to make it look Elixir-like. Wrap when the wrapper improves data conventions, error shape, documentation, or domain meaning.

### Task Pattern: Avoid Importing Object-Oriented Control Flow

BEAM systems do not usually model behavior through classes, inheritance, and mutable object methods.

| OOP habit                     | BEAM-family alternative                                          |
| ----------------------------- | ---------------------------------------------------------------- |
| Object owns mutable fields    | Process owns state, or struct holds immutable data               |
| Method call mutates object    | Function returns new value or process call changes process state |
| Inheritance hierarchy         | Behaviours, protocols, composition, function clauses             |
| Interface implementation      | Behaviour or protocol depending dispatch                         |
| Constructor with side effects | `new` for data, `start_link` for processes                       |
| Global singleton object       | Supervised named process or explicit module                      |
| Object identity               | Domain ID, PID, ref, or structural value depending meaning       |

**Design meaning:** Processes are not objects, structs are not classes, and modules are not classes with static methods in the same conceptual model. They can look similar at the surface, but the semantics differ.

**Common Pitfalls:** Do not create one process per passive domain object unless independent lifecycle and concurrency are required.

### Task Pattern: Avoid Importing Promise/Event-Loop Assumptions

Programmers from JavaScript often misread BEAM concurrency as async/promise concurrency.

| JavaScript/event-loop idea | BEAM-family difference                                                    |
| -------------------------- | ------------------------------------------------------------------------- |
| Single event loop          | BEAM has many scheduled processes                                         |
| Promise chain              | `Task`, message passing, `with`, and callbacks are different mechanisms   |
| Await result               | `Task.await`, `GenServer.call`, `receive` have process semantics          |
| Nonblocking by default     | BEAM process blocking does not block whole VM, but it blocks that process |
| Callback queue             | Each process has a mailbox                                                |
| Event emitter              | Message protocols are explicit terms                                      |
| Worker threads             | BEAM processes are runtime processes, not OS threads                      |

**Design meaning:** BEAM concurrency is process-oriented, not promise-oriented. Blocking a BEAM process may be acceptable if that process is designed to wait, but blocking a central server callback can harm system behavior.

**Common Pitfalls:** Do not treat `Task.async` as a direct equivalent of JavaScript `Promise`. Links, exits, monitors, timeouts, and supervision matter.

### Task Pattern: Avoid Importing Go Channel Assumptions

Go goroutines and BEAM processes are often compared, but their communication models differ.

| Go concept               | BEAM-family concept              | Difference                                              |
| ------------------------ | -------------------------------- | ------------------------------------------------------- |
| Goroutine                | BEAM process                     | BEAM process has mailbox, PID, links/monitors           |
| Channel                  | Mailbox/message protocol         | Each process has one mailbox; selective receive differs |
| Context cancellation     | Exits, monitors, custom messages | Cancellation is not automatic                           |
| Panic/recover            | Crash/exits/supervision          | Supervision is architectural                            |
| Interface                | Behaviour/protocol/function      | Dynamic runtime model differs                           |
| Shared memory with locks | Discouraged; ETS/process state   | Different state model                                   |

**Design meaning:** BEAM message passing is not channel passing. A process mailbox receives all messages for that process; protocol design is crucial.

**Common Pitfalls:** Do not assume senders naturally block when receivers are slow. Ordinary sends can grow mailboxes.

### Task Pattern: Avoid Importing Rust-Type Guarantees

Rust programmers may expect compile-time enforcement of ownership, lifetimes, and exhaustive enum handling. Erlang / Elixir provides different reliability tools.

| Rust expectation                       | Erlang / Elixir reality                                          |
| -------------------------------------- | ---------------------------------------------------------------- |
| Exhaustive enum matching               | Runtime patterns; no full static exhaustiveness in ordinary code |
| Borrow checker prevents alias mutation | Immutability and process isolation reduce shared mutation        |
| `Result<T, E>` statically visible      | Tagged tuples by convention/spec                                 |
| Ownership controls memory              | BEAM GC and process heaps                                        |
| Traits                                 | Behaviours/protocols, but dynamically different                  |
| Panic as exceptional                   | Process crash may be normal under supervision                    |
| Zero-cost abstraction                  | BEAM abstractions have runtime costs                             |

**Design meaning:** Erlang / Elixir reliability is not primarily compile-time memory/type safety. It is runtime isolation, supervision, simple data, and operational introspection.

**Common Pitfalls:** Do not overtrust pattern coverage because a tagged tuple looks like an enum. Add tests and consider specs/analysis.

### Task Pattern: Avoid Importing Haskell Purity Assumptions

Erlang / Elixir uses functional syntax, but it is not pure.

| Haskell-like concept | Erlang / Elixir version                                       |
| -------------------- | ------------------------------------------------------------- |
| Pattern matching     | Runtime pattern matching                                      |
| Algebraic data types | Atoms/tagged tuples/structs by convention                     |
| Typeclasses          | Elixir protocols partly similar                               |
| Monads for effects   | Tagged tuples/with/case by convention                         |
| Purity               | Not enforced                                                  |
| Lazy evaluation      | Strict/eager by default; Elixir `Stream` is explicit laziness |
| Exhaustiveness       | Not statically guaranteed generally                           |

**Design meaning:** Functional style in Erlang / Elixir serves clarity and concurrency, not mathematical purity.

**Common Pitfalls:** Do not assume `with` is a full monadic system with type-level guarantees. It is pattern-matching syntax.

### Task Pattern: Build Abstractions Around Failure Boundaries

In Erlang / Elixir, abstraction should often follow failure boundaries.

| Boundary                  | Abstraction                               |
| ------------------------- | ----------------------------------------- |
| External API request      | Parser/validator module                   |
| Database access           | Repo/storage behaviour or module          |
| External service          | Client module with tagged errors          |
| Long-running state        | Supervised process                        |
| Temporary concurrent work | Task/Task.Supervisor                      |
| Many dynamic workers      | DynamicSupervisor                         |
| Process lookup            | Registry                                  |
| Protocol parsing          | Parser returning tagged results           |
| Untrusted binary          | Decoder with explicit error data          |
| Invariant violation       | Match assertion or crash under supervisor |

**Design meaning:** Because BEAM systems are fault-aware, abstractions should answer: “What happens if this fails?” not only “How do I reuse this code?”

**Common Pitfalls:** A clean-looking abstraction that collapses all errors into `:error` may be unusable for real recovery.

### Task Pattern: Organize Control Flow Around Trust Level

Trusted internal data and untrusted boundary data should use different control-flow styles.

| Data trust level         | Good control flow                  |
| ------------------------ | ---------------------------------- |
| Untrusted external input | `case`, validation, tagged errors  |
| Validated domain value   | Function clauses, direct patterns  |
| Internal invariant       | Direct match or specific clause    |
| External I/O result      | Tagged return handling             |
| Process protocol message | Tagged match plus fallback         |
| Unknown message          | Log/drop/handle explicitly         |
| Framework callback       | Return required callback shape     |
| Crash boundary           | Let process fail under supervision |

Example:

```elixir
def handle_external(params) do
  case UserParams.parse(params) do
    {:ok, command} ->
      handle_command(command)

    {:error, reason} ->
      {:error, reason}
  end
end

defp handle_command(%CreateUser{} = command) do
  {:ok, build_user(command)}
end
```

**Design meaning:** Good BEAM code is often defensive at boundaries and assertive internally.

**Common Pitfalls:** Being defensive everywhere produces noisy code. Being assertive at boundaries crashes on normal bad input. Put each style in the right place.

### Abstraction Mechanism Decision Table — professional selection guide

| Need                           | Prefer                | Why                            | Common wrong choice                          |
| ------------------------------ | --------------------- | ------------------------------ | -------------------------------------------- |
| Branch by known input shapes   | Function clauses      | Direct and readable            | Protocol too early                           |
| Branch locally on result       | `case`                | Keeps decision near expression | Function clauses that fragment logic         |
| Chain success results          | `with` in Elixir      | Linear success path            | Deep nesting or opaque `else`                |
| Simple repeated transformation | Function              | Clear and testable             | Macro                                        |
| Caller supplies local behavior | Higher-order function | Lightweight                    | Behaviour                                    |
| Module adapter                 | Behaviour             | Callback contract              | Protocol                                     |
| Data-type polymorphism         | Protocol              | Dispatch by value type         | Behaviour                                    |
| Stateful server                | `GenServer`           | Process protocol and state     | Agent or plain module if behavior is complex |
| Simple state wrapper           | `Agent`               | Minimal state process          | GenServer with boilerplate                   |
| Temporary concurrent result    | `Task`                | Process with result            | GenServer                                    |
| Supervised temporary work      | `Task.Supervisor`     | Lifecycle supervision          | Raw spawn                                    |
| Dynamic process population     | `DynamicSupervisor`   | Runtime child lifecycle        | Map of PIDs without owner                    |
| Syntax extension               | Macro                 | Compile-time generation        | Function if syntax not needed                |
| Domain DSL                     | Macro + documentation | Declarative user syntax        | Hidden magic without payoff                  |
| Large shared lookup            | ETS                   | Concurrent table               | One bottleneck server                        |

### Composition and Control-Flow Pitfall Index

| Pitfall                                    | Why it happens             | Better practice                                            |
| ------------------------------------------ | -------------------------- | ---------------------------------------------------------- |
| Broad catch-all clause first               | Clause order misunderstood | Specific before general                                    |
| `with` for complex error logic             | Desire to flatten nesting  | Use `case` or helper functions                             |
| `cast` for operations needing confirmation | Avoid blocking             | Use `call` or explicit ack protocol                        |
| Long blocking `handle_call`                | Server used as worker      | Offload, split, or reply later                             |
| Process as object                          | OOP transfer               | Use process only for lifecycle/concurrency/state ownership |
| Macro for ordinary reuse                   | DRY overapplied            | Use function                                               |
| Protocol for one type                      | Premature extensibility    | Use function clause                                        |
| Behaviour for one small callback           | Overengineering            | Pass function                                              |
| Agent for domain logic                     | State wrapper convenience  | Use GenServer or pure data                                 |
| Pipeline hides branching                   | Pipe overuse               | Use `case`, `with`, or intermediate names                  |
| Anonymous function too large               | Local convenience          | Name it                                                    |
| Raw messages everywhere                    | Protocol leakage           | Public process API                                         |
| Ignored task failures                      | Unsafely spawned work      | Monitor or supervise                                       |
| Streams with hidden side effects           | Laziness misunderstood     | Use `Enum.each` or explicit execution                      |
| Specs without validation                   | False type safety          | Validate at boundaries                                     |
## PART 5 — Modules, Errors, Effects, Resources, and Boundaries by Task Pattern

### Part Scope — boundary management, failure policy, and operational contracts

Part 5 explains how Erlang / Elixir programs define and protect **boundaries**. A boundary is any place where one part of the system depends on another under a contract: module APIs, OTP applications, process messages, supervision trees, external input, files, sockets, databases, NIFs, ports, configuration, serialization, and distributed nodes.

Part 2 covered syntax. Part 3 covered data modeling. Part 4 covered behavior and abstraction. Part 5 now asks: **where should responsibility, failure, trust, side effects, resource ownership, and compatibility be located?**

In Erlang / Elixir, boundary design is unusually important because BEAM systems are often long-running, concurrent, fault-tolerant, and operationally observable. A good boundary does not merely hide code; it defines **what happens when something goes wrong**. This follows the guide’s requirement to treat errors, effects, resources, modules, trust boundaries, and OTP failure semantics as central rather than peripheral. 

| Boundary kind          | Main Erlang / Elixir mechanism                     | Primary design question                                    |
| ---------------------- | -------------------------------------------------- | ---------------------------------------------------------- |
| Module boundary        | exported functions, `def`/`defp`, specs, docs      | What is public, stable, and supported?                     |
| Application boundary   | OTP application, supervision tree, config          | What starts, stops, and recovers together?                 |
| Process boundary       | messages, calls, casts, links, monitors            | Who owns state and failure?                                |
| Error boundary         | tagged returns, exceptions, exits, supervisors     | Is this failure expected, exceptional, or process-fatal?   |
| Resource boundary      | files, sockets, ports, ETS, NIFs                   | Who owns, closes, supervises, or cleans up the resource?   |
| Trust boundary         | external input, distributed messages, decoded data | What must be validated before internal use?                |
| Compatibility boundary | public API, persisted data, messages, config       | What shape must remain stable over time?                   |
| Unsafe/native boundary | NIFs, ports, external commands                     | What can crash, block, or corrupt the VM?                  |
| Framework boundary     | Phoenix, Ecto, Plug, Mix tasks                     | Which behavior is language, which is framework convention? |

### Task Pattern: Declare Module Boundaries — public API, private helpers, and supported contracts

A module boundary separates **what callers may rely on** from **what the implementation may change**.

Erlang makes this explicit through `-export`.

```erlang
-module(accounts).
-export([normalize/1, fetch/1]).

-spec normalize(map()) -> map().
normalize(User) ->
    normalize_name(User).

fetch(Id) ->
    do_fetch(Id).

normalize_name(User) ->
    User.

do_fetch(Id) ->
    {error, {not_found, Id}}.
```

Only `normalize/1` and `fetch/1` are public. The helper functions are not exported.

Elixir uses `def` and `defp`.

```elixir
defmodule Accounts do
  @spec normalize(map()) :: map()
  def normalize(user) do
    normalize_name(user)
  end

  def fetch(id) do
    do_fetch(id)
  end

  defp normalize_name(user) do
    user
  end

  defp do_fetch(id) do
    {:error, {:not_found, id}}
  end
end
```

| Boundary decision | Erlang                       | Elixir                                | Practical consequence                      |
| ----------------- | ---------------------------- | ------------------------------------- | ------------------------------------------ |
| Public function   | `-export([f/n])`             | `def f(...)`                          | Caller may depend on it                    |
| Private helper    | not exported                 | `defp f(...)`                         | Implementation detail                      |
| Public type       | `-type`                      | `@type`                               | Caller may reference it                    |
| Opaque type       | `-opaque`                    | `@opaque`                             | Caller should not depend on representation |
| Callback          | `-callback`                  | `@callback`                           | Implementing module contract               |
| Documentation     | EDoc/comments/specs          | `@moduledoc`, `@doc`, `@spec`         | API explanation                            |
| Internal module   | convention and app structure | `@moduledoc false`, naming convention | Not stable public surface                  |

**Design meaning:** A module boundary is a maintenance contract. A public function is not just “callable”; it is a promise about behavior, return shape, failure mode, and future compatibility.

**Professional rule:** Keep public APIs small and stable. Move complex implementation into private functions or internal modules. If external users rely on a shape, document and spec it.

**Common Pitfalls:** In Elixir, using `def` by default can accidentally expose helpers as public API. Use `defp` unless callers should rely on the function.

### Task Pattern: Separate Public API from Implementation Details — façade functions and internal modules

A common BEAM design is to expose a clean module API while hiding process protocols, storage choices, and validation details.

Good Elixir boundary:

```elixir
defmodule Cache do
  def get(cache, key) do
    GenServer.call(cache, {:get, key})
  end

  def put(cache, key, value) do
    GenServer.call(cache, {:put, key, value})
  end

  @impl true
  def handle_call({:get, key}, _from, state) do
    {:reply, Map.fetch(state, key), state}
  end

  @impl true
  def handle_call({:put, key, value}, _from, state) do
    {:reply, :ok, Map.put(state, key, value)}
  end
end
```

Callers use:

```elixir
Cache.get(pid, :user)
Cache.put(pid, :user, user)
```

They do not construct raw messages.

Bad boundary:

```elixir
GenServer.call(pid, {:put, :user, user})
```

from all over the application.

| Internal detail                    | Public boundary should expose        |
| ---------------------------------- | ------------------------------------ |
| `GenServer.call(pid, {:get, key})` | `Cache.get(pid, key)`                |
| Raw validation map                 | `UserParams.parse(params)`           |
| ETS table lookup                   | `Cache.lookup(key)`                  |
| External HTTP client call          | `PaymentClient.charge(command)`      |
| Binary parsing clauses             | `Packet.parse(binary)`               |
| Supervisor child spec details      | `WorkerSupervisor.start_worker(arg)` |
| Framework changeset internals      | `Accounts.create_user(params)`       |

**Design meaning:** Hiding internals is not object-oriented encapsulation in the classical sense. It is contract management. The caller should know the operation, not the message tuple, table name, or storage mechanism.

**Failure-first explanation:** The tempting wrong model is “raw tuples are simple, so exposing them is fine.” The surprising failure is that protocol changes require edits across the whole codebase. The correct explanation is that message shapes and storage choices are implementation details. The professional rule is: expose named functions for operations; keep raw messages and storage structure local. The boundary changes only for deliberately low-level protocol libraries whose public contract is the message format itself.

**Common Pitfalls:** A public API that leaks internal message shapes prevents refactoring from `GenServer` to ETS, from ETS to database, or from local process to remote service.

### Task Pattern: Organize Files and Packages — modules, OTP applications, Mix projects, and Erlang apps

Erlang / Elixir code is not just individual files. Production BEAM systems are usually organized as OTP applications.

Elixir project structure commonly looks like:

```text
mix.exs
lib/
  my_app.ex
  my_app/
    accounts.ex
    accounts/user.ex
test/
config/
```

Erlang project structure often looks like:

```text
rebar.config
src/
  my_app.app.src
  accounts.erl
include/
test/
```

| Organizational unit  | Erlang                      | Elixir                                        | Meaning                                 |
| -------------------- | --------------------------- | --------------------------------------------- | --------------------------------------- |
| Source file          | `.erl`                      | `.ex`                                         | Compiled module source                  |
| Header/script        | `.hrl`, escript             | `.exs`                                        | Includes/scripts/tests/config-like code |
| Project tool         | `rebar3`                    | `mix`                                         | Build, test, deps, releases             |
| Application metadata | `.app.src`                  | generated from `mix.exs` / application config | OTP application definition              |
| Supervision entry    | application callback module | application module / supervision tree         | Runtime startup                         |
| Dependency           | OTP app dependency          | Hex/Mix dependency or Erlang app              | Code and application dependency         |
| Release              | OTP release                 | Mix release / Erlang release                  | Deployable system artifact              |

**Design meaning:** A BEAM “application” is not merely a business application. It is an OTP unit with modules, dependencies, environment, and possibly a supervision tree.

**Professional rule:** Organize modules by responsibility and boundary, not only by technical layer. A process module, a parser module, a domain module, and a client module have different boundary roles.

**Common Pitfalls:** Do not put all business logic into the application callback module or one top-level context module. Application startup, domain behavior, and external API orchestration should remain separable.

### Task Pattern: Define OTP Application Boundaries — what starts and recovers together

An OTP application groups code and runtime behavior. In Elixir, a typical application module starts a supervision tree.

```elixir
defmodule MyApp.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {Registry, keys: :unique, name: MyApp.Registry},
      MyApp.Cache,
      {DynamicSupervisor, strategy: :one_for_one, name: MyApp.WorkerSupervisor}
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: MyApp.Supervisor)
  end
end
```

Erlang application callback:

```erlang
-module(my_app_app).
-behaviour(application).

-export([start/2, stop/1]).

start(_Type, _Args) ->
    my_app_sup:start_link().

stop(_State) ->
    ok.
```

| Application boundary question          | Design implication                                 |
| -------------------------------------- | -------------------------------------------------- |
| What processes start with the app?     | Supervisor children                                |
| What is permanent infrastructure?      | Static child specs                                 |
| What starts dynamically?               | Dynamic supervisors                                |
| What config is required at boot?       | Validate before starting children                  |
| What should crash the app?             | Application start failure or supervisor escalation |
| What external dependencies are needed? | Clients, pools, sockets, databases                 |
| What should stop cleanly?              | `terminate`, shutdown strategy, resource owners    |

**Design meaning:** An OTP application boundary is a lifecycle boundary. It defines startup, supervision, dependencies, and shutdown behavior.

**Common Pitfalls:** Do not start processes ad hoc from random modules if they belong to the application lifecycle. Put them under supervision.

### Task Pattern: Control Visibility and Stability — internal modules, public modules, and compatibility promises

Not every module in a project should be treated as public.

Elixir conventions:

```elixir
defmodule MyApp.Accounts do
  @moduledoc """
  Public account API.
  """
end

defmodule MyApp.Accounts.UserParser do
  @moduledoc false
end
```

Erlang conventions often rely on naming, exports, docs, and app-level structure.

| Module kind             | Public?                          | Stability expectation                |
| ----------------------- | -------------------------------- | ------------------------------------ |
| Top-level domain API    | Yes                              | Stable                               |
| Process API module      | Usually yes                      | Stable operation functions           |
| OTP callback module     | Sometimes internal               | Callback shape stable for OTP        |
| Parser/validator module | Often internal unless documented | Can change                           |
| Struct/type module      | Often public if returned         | Fields may or may not be stable      |
| Repo/client adapter     | Often internal behind public API | Can change                           |
| Test support module     | No                               | Test-only                            |
| Macro DSL module        | Public if used by callers        | Very stable; compile-time dependency |

**Design meaning:** Publicness is not only `def` or `-export`. It is also documentation, naming, package exposure, and user expectation.

**Common Pitfalls:** Returning an internal struct from a public function effectively makes that struct part of the public API unless it is opaque and callers are disciplined.

### Task Pattern: Handle Expected Failure — tagged returns as boundary contracts

Expected failure should usually be represented as data.

Elixir:

```elixir
def fetch_user(id) do
  case Repo.get(User, id) do
    nil -> {:error, :not_found}
    user -> {:ok, user}
  end
end
```

Erlang:

```erlang
fetch_user(Id) ->
    case repo:get_user(Id) of
        undefined ->
            {error, not_found};
        User ->
            {ok, User}
    end.
```

| Expected failure             | Good representation                 |
| ---------------------------- | ----------------------------------- |
| Missing record               | `{:error, :not_found}`              |
| Invalid external input       | `{:error, {:invalid_field, field}}` |
| Permission denied            | `{:error, :forbidden}`              |
| Parse failure                | `{:error, :invalid_format}`         |
| External service unavailable | `{:error, {:unavailable, reason}}`  |
| Timeout                      | `{:error, :timeout}`                |
| Duplicate value              | `{:error, :already_exists}`         |

**Design meaning:** A tagged return says: “The caller is expected to decide what to do.”

**Professional rule:** If a failure is part of ordinary domain flow, do not hide it in an exception. Return a stable error shape.

**Common Pitfalls:** Returning `false` or `nil` for every failure discards information. Use a reason when the caller needs to branch, log, display, retry, or audit.

### Task Pattern: Handle Unexpected Failure — crash, exit, and supervision

Unexpected failure is different from expected failure. If a process reaches a state where it cannot safely continue, crashing may be correct.

Elixir direct assertion:

```elixir
{:ok, config} = load_required_config()
```

Erlang:

```erlang
{ok, Config} = load_required_config().
```

If this fails, the process crashes. In a supervised process, the supervisor may restart it according to policy.

| Unexpected failure example                          | Likely policy                            |
| --------------------------------------------------- | ---------------------------------------- |
| Required startup config missing                     | Fail startup                             |
| Corrupted internal state                            | Crash process                            |
| Impossible callback return from internal helper     | Crash or explicit bug report             |
| Database unavailable during optional request        | Return tagged error                      |
| Database unavailable in mandatory startup migration | Fail startup                             |
| Worker processing one bad job                       | Fail job/process depending worker design |
| Repeated external service failure                   | Circuit/backoff/supervision/queue policy |

**Design meaning:** Erlang / Elixir reliability comes from locating crashes at the correct boundary. A crash inside a supervised worker can be safer than continuing with corrupted state.

**Failure-first explanation:** The tempting wrong model is “all crashes are bad.” The surprising lesson in BEAM systems is that a local crash can protect the rest of the system. The correct explanation is that process isolation and supervision make some crashes recoverable architectural events. The professional rule is: crash when the local process cannot continue correctly and a supervisor or caller boundary can handle the failure. The boundary changes when the failure is caused by ordinary user input, where returning an error is usually better.

**Common Pitfalls:** “Let it crash” does not mean “ignore validation.” Validate expected external failures. Crash on violated internal invariants or unrecoverable local state.

### Task Pattern: Distinguish Error Values, Exceptions, Throws, and Exits

Erlang / Elixir has multiple failure channels. They should not be collapsed.

| Failure channel         | Erlang                 | Elixir             | Meaning                    | Typical use                        |
| ----------------------- | ---------------------- | ------------------ | -------------------------- | ---------------------------------- |
| Tagged error value      | `{error, Reason}`      | `{:error, reason}` | Ordinary data              | Expected failure                   |
| Simple error value      | `error`                | `:error`           | No-detail miss/failure     | Simple lookup                      |
| Runtime error/exception | `erlang:error(Reason)` | `raise`            | Exceptional failure        | Bug or exceptional local condition |
| Throw                   | `throw(Term)`          | `throw(term)`      | Non-local control flow     | Rare/specialized                   |
| Exit                    | `exit(Reason)`         | `exit(reason)`     | Process termination signal | Process failure/lifecycle          |
| Supervisor restart      | OTP supervisor         | OTP supervisor     | Architectural recovery     | Long-running components            |

Elixir example:

```elixir
def parse_user(data) do
  case validate_user(data) do
    :ok -> {:ok, build_user(data)}
    {:error, reason} -> {:error, reason}
  end
end
```

This is error-as-data.

```elixir
def parse_user!(data) do
  case parse_user(data) do
    {:ok, user} -> user
    {:error, reason} -> raise ArgumentError, "invalid user: #{inspect(reason)}"
  end
end
```

This converts error data into an exception for callers who want a fail-fast API.

**Design meaning:** The choice of failure channel is a boundary decision. It tells the caller whether to pattern-match, rescue, monitor, or rely on supervision.

**Common Pitfalls:** Do not use `throw` as a general-purpose exception system. In ordinary Elixir code, `throw` is rare; tagged returns and exceptions are clearer.

### Task Pattern: Convert Exceptions to Tagged Errors at Boundaries

Sometimes a library raises, but the public API should return tagged errors.

Elixir:

```elixir
def read_config(path) do
  try do
    {:ok, File.read!(path)}
  rescue
    e in File.Error ->
      {:error, e.reason}
  end
end
```

Often better: use the non-bang function directly.

```elixir
def read_config(path) do
  File.read(path)
end
```

Erlang:

```erlang
safe_parse(Text) ->
    try parse_unsafe(Text) of
        Value ->
            {ok, Value}
    catch
        error:Reason ->
            {error, Reason}
    end.
```

| Boundary                                        | Conversion direction                   |
| ----------------------------------------------- | -------------------------------------- |
| Exception-raising internal helper to public API | exception → tagged error               |
| Tagged result to bang function                  | tagged error → raise                   |
| Process crash to caller                         | exit → monitored `DOWN` or task result |
| External library exception                      | rescue and normalize                   |
| Startup required failure                        | tagged error → crash/start failure     |
| HTTP boundary                                   | domain error → response status/body    |

**Design meaning:** Public boundaries should present failure in the form that callers can use. Internal implementation details should not leak unless intentionally part of the API.

**Common Pitfalls:** Broad `rescue _ -> {:error, :failed}` hides bugs. Rescue known exception types and preserve useful reason information.

### Task Pattern: Convert Tagged Errors to Exceptions Deliberately — bang APIs

Elixir bang functions are conventionally fail-fast versions.

```elixir
def fetch_user!(id) do
  case fetch_user(id) do
    {:ok, user} -> user
    {:error, reason} -> raise "could not fetch user: #{inspect(reason)}"
  end
end
```

| Bang function appropriate when         | Non-bang function appropriate when |
| -------------------------------------- | ---------------------------------- |
| Failure violates caller invariant      | Failure is normal                  |
| Setup/config must exist                | User input can be invalid          |
| Test should fail loudly                | Caller should branch               |
| Higher-level boundary rescues/logs     | Error should remain data           |
| Process should crash under supervision | Process should continue            |

**Design meaning:** Bang functions make a failure policy visible in the name. The `!` is convention, not magic.

**Common Pitfalls:** Do not expose only bang APIs for ordinary external failures. Provide a non-bang API when callers can reasonably recover.

### Task Pattern: Use `try/rescue/catch/after` and `try/catch/after` Sparingly

Local failure handling is useful, but broad local catching can fight supervision.

Elixir:

```elixir
try do
  dangerous()
rescue
  e in ArgumentError ->
    {:error, e.message}
after
  cleanup()
end
```

Erlang:

```erlang
try dangerous() of
    Value ->
        {ok, Value}
catch
    error:badarg ->
        {error, badarg}
after
    cleanup()
end.
```

| Clause                 | Use                                  | Caution                                    |
| ---------------------- | ------------------------------------ | ------------------------------------------ |
| `rescue`               | Handle exceptions                    | Do not catch all bugs                      |
| `catch`                | Handle throws/exits                  | Rare; can interfere with process semantics |
| `after`                | Cleanup                              | Does not mean successful recovery          |
| `else` in Elixir `try` | Match successful result              | Can improve narrow flows but may obscure   |
| Erlang `catch` class   | Distinguish `throw`, `error`, `exit` | Broad catches are dangerous                |

**Design meaning:** Local failure handling is a boundary. If the process cannot safely continue, do not rescue just to return a generic error.

**Common Pitfalls:** Catching exits inside OTP processes can interfere with intended failure propagation. Use only with clear lifecycle reasoning.

### Task Pattern: Represent Recoverable and Unrecoverable Errors

Recoverability is contextual. The same failure may be recoverable in one boundary and unrecoverable in another.

| Failure                 | In request handler         | In application startup        | In supervised worker                 |
| ----------------------- | -------------------------- | ----------------------------- | ------------------------------------ |
| Missing user            | `{:error, :not_found}`     | Usually irrelevant            | Job may fail or skip                 |
| Missing required config | likely bug                 | fail startup                  | crash worker if required             |
| External timeout        | return/retry               | maybe fail dependency startup | retry/backoff/crash depending design |
| Invalid user input      | return validation error    | irrelevant                    | mark job failed                      |
| Corrupt internal state  | crash process              | fail startup                  | crash and restart                    |
| Database unavailable    | return service unavailable | fail or degraded startup      | retry/backoff                        |
| Bad code assumption     | crash                      | crash                         | crash                                |

**Design meaning:** Recoverability is not a property of the error alone. It is a property of the error at a boundary.

**Professional rule:** Decide error policy at the boundary where enough context exists.

**Common Pitfalls:** A low-level module should not always decide final user-facing behavior. It should return meaningful errors; higher-level boundaries decide response, retry, crash, or escalation.

### Task Pattern: Manage Resources — ownership, cleanup, and failure coupling

Resources include files, sockets, ports, ETS tables, external processes, database connections, tasks, and native resources. Every resource should have an owner.

| Resource      | Owner question                             | Cleanup question                   |
| ------------- | ------------------------------------------ | ---------------------------------- |
| File handle   | Which process opened it?                   | Who closes it?                     |
| Socket        | Which process receives data?               | What happens on disconnect?        |
| ETS table     | Which process owns table?                  | Is it deleted on owner death?      |
| Port          | Which process manages external OS process? | How is port closed?                |
| Task          | Who awaits/monitors it?                    | What if caller dies?               |
| NIF resource  | Native library/VM                          | Can it block or crash VM?          |
| DB connection | Pool process/library                       | How are checkout failures handled? |
| Timer         | Process that scheduled it                  | Should timer be canceled?          |

Elixir file example with scoped function:

```elixir
File.open(path, [:read], fn file ->
  IO.read(file, :all)
end)
```

This style delegates closing to the file API.

Manual resource style requires cleanup:

```elixir
{:ok, file} = File.open(path, [:read])

try do
  IO.read(file, :all)
after
  File.close(file)
end
```

**Design meaning:** Resource safety in Erlang / Elixir is not RAII like C++ or Rust. It is usually handled through process ownership, library APIs, `try/after`, supervision, and careful lifecycle design.

**Common Pitfalls:** Do not open resources in a process and pass handles widely without ownership rules. If the owner dies, resource behavior must be understood.

### Task Pattern: Manage Files and Paths — expected failure and binary/text distinction

File operations frequently fail and should usually return tagged results.

Elixir:

```elixir
case File.read(path) do
  {:ok, binary} ->
    parse(binary)

  {:error, reason} ->
    {:error, {:read_failed, reason}}
end
```

Erlang:

```erlang
case file:read_file(Path) of
    {ok, Binary} ->
        parse(Binary);
    {error, Reason} ->
        {error, {read_failed, Reason}}
end.
```

| File boundary concern | Modeling rule                                    |
| --------------------- | ------------------------------------------------ |
| Missing file          | Expected error unless file is required invariant |
| Permission error      | Tagged error with reason                         |
| Path input            | Validate or normalize if external                |
| Text encoding         | Decide binary/string/chardata handling           |
| Large file            | Stream or chunk if needed                        |
| Temporary file        | Define owner and cleanup                         |
| Required config       | May use bang/direct match at startup             |

**Design meaning:** File systems are external and unreliable. Even if the code is correct, the file may be missing, locked, inaccessible, or malformed.

**Common Pitfalls:** Do not use `File.read!` or direct match in request-level code unless crashing the process is deliberate and acceptable.

### Task Pattern: Manage Sockets and Network Connections — process ownership and active/passive modes

Network sockets are resource and process boundaries at the same time.

Erlang and Elixir often use Erlang networking modules directly or through libraries.

Elixir example calling Erlang API:

```elixir
{:ok, socket} = :gen_tcp.connect('example.com', 80, [:binary, active: false])
:ok = :gen_tcp.send(socket, "GET / HTTP/1.0\r\n\r\n")
```

| Network boundary concern | Design consequence                      |
| ------------------------ | --------------------------------------- |
| Connection owner process | Determines who receives socket messages |
| Active mode              | Socket sends messages to process        |
| Passive mode             | Process explicitly receives data        |
| Packet framing           | Need protocol parser                    |
| Timeout                  | Expected failure                        |
| Disconnect               | Expected message/error                  |
| Backpressure             | Must be designed                        |
| TLS/security             | Use proper libraries/options            |
| Supervision              | Connection processes often supervised   |

**Design meaning:** A socket is not just a value. It is a live external resource attached to process behavior.

**Common Pitfalls:** Active socket modes can flood a process mailbox if incoming data is faster than processing. Understand active/passive and backpressure behavior.

### Task Pattern: Manage Timers — messages, cancellation, monotonic time, and stale events

Timers usually send messages. That makes them part of process protocol design.

Elixir:

```elixir
ref = Process.send_after(self(), :tick, 1_000)
```

Erlang:

```erlang
Ref = erlang:send_after(1000, self(), tick).
```

Canceling:

```elixir
Process.cancel_timer(ref)
```

Erlang:

```erlang
erlang:cancel_timer(Ref).
```

| Timer issue            | Design rule                              |
| ---------------------- | ---------------------------------------- |
| Timer sends a message  | Handle it in `receive` or `handle_info`  |
| Cancel may race        | Stale timer messages may still exist     |
| Repeating timer        | Reschedule after handling                |
| Timeout duration       | Use explicit units                       |
| Measuring elapsed time | Use monotonic time                       |
| Many timers            | Consider timer volume and process design |

Elixir GenServer tick:

```elixir
defp schedule_tick do
  Process.send_after(self(), :tick, 1_000)
end

@impl true
def handle_info(:tick, state) do
  schedule_tick()
  {:noreply, refresh(state)}
end
```

**Design meaning:** A timer is not a background thread. It is usually a scheduled message. Therefore timer design is mailbox design.

**Common Pitfalls:** Canceling a timer does not always mean no timer message will be observed, depending on race timing. Design handlers to tolerate stale messages when necessary.

### Task Pattern: Manage ETS Tables — mutable shared storage with owner process semantics

ETS is Erlang Term Storage: VM-managed tables usable from Erlang and Elixir.

Elixir:

```elixir
table = :ets.new(:cache, [:set, :private])
:ets.insert(table, {:count, 1})
:ets.lookup(table, :count)
```

Erlang:

```erlang
Table = ets:new(cache, [set, private]),
ets:insert(Table, {count, 1}),
ets:lookup(Table, count).
```

| ETS design question     | Why it matters                                                           |
| ----------------------- | ------------------------------------------------------------------------ |
| Who owns the table?     | Table usually dies with owner process unless transferred/heir configured |
| Visibility mode?        | `private`, `protected`, `public` affect access                           |
| Named or anonymous?     | Named table is globally findable on node                                 |
| Read/write concurrency? | Performance tuning                                                       |
| Data shape?             | Tuples with key position are typical                                     |
| Cleanup?                | Owner death and lifecycle                                                |
| Consistency?            | ETS operations are mutable and concurrent                                |
| Supervision?            | Owner process should be managed if table is critical                     |

**Design meaning:** ETS is mutable shared storage inside the BEAM VM. It bypasses the ordinary immutable-process-state model for performance and sharing reasons.

**Common Pitfalls:** Do not use ETS as an unstructured global variable. Define an owner module/API, table lifecycle, access mode, and data schema.

### Task Pattern: Manage Process Registry and Names — stable lookup without dynamic atoms

Process names are boundary objects. They decide how other code finds a process.

Elixir local name:

```elixir
GenServer.start_link(__MODULE__, state, name: __MODULE__)
```

Registry name:

```elixir
GenServer.start_link(__MODULE__, state, name: {:via, Registry, {MyApp.Registry, key}})
```

Erlang local name:

```erlang
gen_server:start_link({local, my_server}, ?MODULE, State, []).
```

| Naming strategy         | Use when                            | Risk                                  |
| ----------------------- | ----------------------------------- | ------------------------------------- |
| PID                     | Caller already has process identity | PID changes on restart                |
| Local atom name         | One known process per node          | Atom names must be finite/static      |
| Module name             | Singleton service convention        | One instance only                     |
| Registry                | Dynamic names                       | Requires registry lifecycle           |
| `:via` tuple            | Abstract lookup mechanism           | More complexity                       |
| Global/distributed name | Cross-node lookup                   | Distribution and partition complexity |

**Design meaning:** A name is not the process. It is a lookup boundary. Restart, distribution, and registration conflicts must be considered.

**Common Pitfalls:** Do not create atoms dynamically for process names. Use Registry or tuple names for dynamic identities.

### Task Pattern: Isolate Unsafe, Dynamic, or Unchecked Behavior

Some operations deserve containment because they weaken ordinary safety or reliability.

| Risky operation                    | Why risky                 | Boundary strategy                      |
| ---------------------------------- | ------------------------- | -------------------------------------- |
| Dynamic atom creation              | Atom table exhaustion     | Explicit mapping                       |
| `binary_to_term` on untrusted data | Unsafe deserialization    | Trusted-only or safe alternatives      |
| Dynamic `apply`                    | Hidden dispatch           | Restrict allowed modules/functions     |
| NIF call                           | Can block/crash VM        | Dirty schedulers, ports, review        |
| Port/external command              | OS-level failure/security | Validate args, supervise port owner    |
| Broad exception rescue             | Hides bugs                | Rescue narrow types                    |
| Process dictionary                 | Hidden state              | Restrict to framework/logging contexts |
| ETS public writes                  | Shared mutable state      | API/owner discipline                   |
| Distributed node messages          | Trust/version issues      | Validate and version                   |
| Macro expansion                    | Hidden compile-time code  | Document and test expansion            |

**Design meaning:** Erlang / Elixir safety is strongest when behavior is explicit. Dynamic features are useful, but they should be isolated behind narrow modules.

**Common Pitfalls:** Do not allow arbitrary module/function names from user input into `apply/3`. That is a capability leak.

### Task Pattern: Manage Native Boundaries — NIFs, ports, and external commands

Native integration can break BEAM assumptions.

| Integration            | Meaning                           | Risk                                   | Safer when                               |
| ---------------------- | --------------------------------- | -------------------------------------- | ---------------------------------------- |
| NIF                    | Native code loaded into VM        | Can crash/block VM                     | Small, safe, dirty scheduler if blocking |
| Dirty NIF              | Native work on dirty scheduler    | Still native risk                      | CPU/blocking work with care              |
| Port                   | External OS process communication | Serialization and OS process lifecycle | Isolates VM from native crash            |
| C-node / external node | External BEAM-compatible node     | Distributed complexity                 | Strong boundary needed                   |
| Command execution      | Run OS command                    | Security, injection, lifecycle         | Arguments validated and isolated         |

**Design meaning:** BEAM’s fault tolerance does not fully protect against unsafe native code inside the VM. A bad NIF can compromise the whole VM, not only one lightweight process.

**Professional rule:** Prefer ports or external services when native code is risky or blocking. Use NIFs when performance/interop justifies the risk and the native code is carefully engineered.

**Common Pitfalls:** Do not put long blocking work in a normal NIF. It can harm scheduler responsiveness.

### Task Pattern: Define Trust Boundaries for External Input

External input includes HTTP params, JSON, files, sockets, environment variables, database rows, command-line args, and distributed messages.

| Input source                        | First boundary action             |
| ----------------------------------- | --------------------------------- |
| HTTP params                         | Validate string-key map           |
| JSON body                           | Decode, validate schema, convert  |
| File content                        | Parse and return tagged result    |
| Socket packet                       | Binary pattern match safely       |
| Environment variable                | Parse type explicitly             |
| Database row                        | Normalize nulls/enums             |
| Process message from unknown sender | Match tag and validate payload    |
| Distributed node message            | Validate version and trust        |
| CLI args                            | Parse and validate                |
| External term binary                | Treat as trusted-only unless safe |

Elixir boundary parser:

```elixir
def parse_limit(%{"limit" => limit}) when is_binary(limit) do
  case Integer.parse(limit) do
    {n, ""} when n > 0 and n <= 100 -> {:ok, n}
    _ -> {:error, :invalid_limit}
  end
end

def parse_limit(_) do
  {:ok, 20}
end
```

**Design meaning:** A trust boundary is where dynamic values become internal assumptions. Validation belongs there.

**Common Pitfalls:** Do not validate after starting side effects. Parse and validate before writing, spawning, sending, or persisting.

### Task Pattern: Handle External Input Without Atom Leaks

Atom safety is a specific trust-boundary issue.

Bad:

```elixir
def parse_status(%{"status" => status}) do
  {:ok, String.to_atom(status)}
end
```

Good:

```elixir
def parse_status(%{"status" => "pending"}), do: {:ok, :pending}
def parse_status(%{"status" => "approved"}), do: {:ok, :approved}
def parse_status(%{"status" => "rejected"}), do: {:ok, :rejected}
def parse_status(_), do: {:error, :invalid_status}
```

Erlang equivalent mapping:

```erlang
parse_status(#{<<"status">> := <<"pending">>}) ->
    {ok, pending};
parse_status(#{<<"status">> := <<"approved">>}) ->
    {ok, approved};
parse_status(#{<<"status">> := <<"rejected">>}) ->
    {ok, rejected};
parse_status(_) ->
    {error, invalid_status}.
```

| External data        | Internal representation         | Safe conversion                 |
| -------------------- | ------------------------------- | ------------------------------- |
| `"pending"`          | `:pending` / `pending`          | Explicit clause/map             |
| JSON keys            | strings or controlled atom keys | Avoid atomizing arbitrary keys  |
| Dynamic process name | registry key                    | Avoid dynamic atom registration |
| External event type  | internal atom variant           | Versioned explicit mapping      |
| Unknown tag          | error tuple                     | Do not create atom              |

**Common Pitfalls:** `String.to_existing_atom/1` is not a general parser. It can be useful only when the allowed atoms are known to exist and failure behavior is acceptable. Explicit mapping is usually clearer.

### Task Pattern: Define Compatibility Boundaries — public API, messages, events, and persisted data

Compatibility matters whenever data or functions outlive one internal implementation.

| Boundary             | Compatibility concern                   |
| -------------------- | --------------------------------------- |
| Public function      | Return shape and error reasons          |
| Public struct        | Field names and meaning                 |
| Opaque type          | Constructor/accessor behavior           |
| Process message      | Tag and payload shape                   |
| Event                | Version, payload schema                 |
| Database row         | Migration and nullability               |
| Serialized term      | Format version and decoder              |
| Config               | Option names and defaults               |
| Framework DSL        | Macro expansion and generated functions |
| Distributed protocol | Node version skew                       |

Versioned event example:

```elixir
%{
  type: :user_created,
  version: 2,
  id: user.id,
  email: user.email
}
```

**Design meaning:** Once a shape crosses a boundary, it becomes a contract. Internal code can change freely; boundary shapes change slowly and deliberately.

**Common Pitfalls:** Persisting raw internal structs or Erlang terms can freeze internal implementation details into long-term storage.

### Task Pattern: Design Error Reason Compatibility

Error reasons are part of public API.

```elixir
{:error, :not_found}
{:error, :invalid_id}
{:error, {:external_service_failed, reason}}
```

| Error reason type       | Compatibility level       |
| ----------------------- | ------------------------- |
| Documented atom reason  | Stable public contract    |
| Structured tuple reason | Stable if documented      |
| Raw exception struct    | Coupled to implementation |
| Raw database reason     | Leaks dependency          |
| Human-readable string   | Poor for branching        |
| Generic `:error`        | Too weak for many APIs    |

**Professional rule:** Public APIs should return stable, documented error reasons. Internal modules may use richer implementation-specific errors, but higher-level boundaries should normalize them.

**Common Pitfalls:** Changing `{:error, :not_found}` to `{:error, {:not_found, id}}` can break callers. Add new API or document versioning if necessary.

### Task Pattern: Design Side-Effect Boundaries — pure core, effect shell, and process edge

Effects should be located deliberately.

| Effect           | Boundary module pattern            |
| ---------------- | ---------------------------------- |
| Database write   | Repo or storage module             |
| HTTP call        | Client module                      |
| File I/O         | File loader/parser module          |
| Message send     | Process API module                 |
| Logging          | Boundary or instrumentation module |
| Metrics          | Telemetry wrapper                  |
| External command | Command module                     |
| Email            | Mailer module                      |
| Config read      | Startup/config module              |
| Native call      | Narrow native wrapper              |

Example:

```elixir
defmodule UserRegistration do
  def prepare(params) do
    with {:ok, command} <- CreateUser.new(params),
         {:ok, user} <- User.new(command) do
      {:ok, user}
    end
  end

  def commit(user) do
    with :ok <- UserRepo.insert(user),
         :ok <- UserNotifier.created(user) do
      :ok
    end
  end
end
```

**Design meaning:** Pure core / effect shell is not enforced by the language, but it is a powerful design discipline.

**Common Pitfalls:** If a pure-looking function sends messages, writes to ETS, logs secrets, or performs I/O, callers cannot reason locally about it.

### Task Pattern: Manage Logging Boundaries — useful diagnostics without leaking secrets

Logging is an effect and a data boundary.

Elixir:

```elixir
Logger.info("created user", user_id: user.id)
```

Avoid:

```elixir
Logger.info("created user #{inspect(user)}")
```

if `user` may contain secrets or large data.

| Logging decision       | Rule                       |
| ---------------------- | -------------------------- |
| Include IDs            | Good if not sensitive      |
| Include secrets        | Avoid                      |
| Include raw params     | Usually avoid or redact    |
| Include error reason   | Useful if stable and safe  |
| Include large payloads | Avoid or sample/truncate   |
| Include dynamic atoms  | Avoid generating them      |
| Use metadata           | Prefer structured metadata |
| Log in hot loops       | Rate-limit or avoid noise  |

**Design meaning:** BEAM systems are observable, but observability can leak data or overload logs.

**Common Pitfalls:** Crash reports and `inspect` output may expose sensitive fields. Implement redaction for secret-bearing structs.

### Task Pattern: Manage Telemetry Boundaries — stable event names and metadata shapes

Telemetry-style instrumentation is a public-ish internal boundary. Other code may subscribe to events.

Elixir-style telemetry event shape:

```elixir
event = [:my_app, :repo, :query]
measurements = %{duration: duration}
metadata = %{source: source}
```

| Telemetry component   | Rule                                     |
| --------------------- | ---------------------------------------- |
| Event name            | Stable list of atoms                     |
| Measurements          | Numeric values                           |
| Metadata              | Bounded, safe, useful context            |
| High-cardinality data | Use carefully                            |
| Secrets               | Never include                            |
| Payloads              | Avoid large raw payloads                 |
| Versioning            | Changing event shapes can break handlers |

**Design meaning:** Telemetry events become integration contracts inside a system. Treat them like APIs.

**Common Pitfalls:** Do not create event names dynamically from user input. Use fixed atom lists.

### Task Pattern: Manage Configuration Boundaries — parse once, pass validated values

Runtime configuration often begins as strings or loose terms. Normalize it near startup.

Elixir:

```elixir
defmodule MyApp.Config do
  def load! do
    timeout =
      System.get_env("WORKER_TIMEOUT_MS", "5000")
      |> parse_positive_integer!("WORKER_TIMEOUT_MS")

    %{worker_timeout_ms: timeout}
  end

  defp parse_positive_integer!(value, name) do
    case Integer.parse(value) do
      {n, ""} when n > 0 -> n
      _ -> raise ArgumentError, "#{name} must be a positive integer"
    end
  end
end
```

| Config source         | Boundary action                                 |
| --------------------- | ----------------------------------------------- |
| Environment variable  | Parse string into typed value                   |
| Config file           | Decode and validate                             |
| Application env       | Fetch and normalize                             |
| CLI arg               | Parse and validate                              |
| Secret store          | Load and protect                                |
| Runtime update        | Define owner/process                            |
| Compile-time constant | Use module attribute only if truly compile-time |

**Design meaning:** Configuration errors are often startup errors. It is better to fail early than run with invalid configuration.

**Common Pitfalls:** Reading and parsing the same environment variable in many modules creates inconsistent behavior and makes tests harder.

### Task Pattern: Manage Dependency Boundaries — direct modules, behaviours, and explicit injection

Dependencies can be fixed or swappable.

| Dependency kind          | Good boundary                    |
| ------------------------ | -------------------------------- |
| Stable internal module   | Direct call                      |
| External service client  | Client module with tagged errors |
| Swappable implementation | Behaviour + configured module    |
| Local algorithm callback | Function argument                |
| Framework dependency     | Narrow wrapper if needed         |
| Test double              | Behaviour or explicit argument   |
| Native library           | Narrow wrapper module            |
| Runtime process          | Public process API               |

Elixir behaviour-backed dependency:

```elixir
defmodule PaymentGateway do
  @callback charge(map()) :: {:ok, map()} | {:error, term()}
end
```

Using configured module:

```elixir
def charge(command, gateway \\ RealPaymentGateway) do
  gateway.charge(command)
end
```

**Design meaning:** Dependency abstraction should match real variability. Not every dependency needs a behaviour.

**Common Pitfalls:** Over-abstracting all dependencies makes code harder to navigate. Under-abstracting unstable external services makes testing and failure handling harder.

### Task Pattern: Manage Database and External Service Boundaries

External systems fail independently. Model that in return shapes.

```elixir
def fetch_user(id) do
  case Repo.get(UserSchema, id) do
    nil -> {:error, :not_found}
    schema -> {:ok, User.from_schema(schema)}
  end
rescue
  e in DBConnection.ConnectionError ->
    {:error, {:database_unavailable, e}}
end
```

| External boundary concern | API consequence                               |
| ------------------------- | --------------------------------------------- |
| Timeout                   | Return timeout or raise at chosen boundary    |
| Unavailable service       | Tagged error, retry, circuit breaker          |
| Invalid response          | Parse error                                   |
| Partial success           | Explicit structured result                    |
| Duplicate write           | Idempotency strategy                          |
| Transaction failure       | Tagged error or exception normalization       |
| Retryable error           | Mark reason as retryable or use policy module |

**Design meaning:** External services are not just function calls. They are failure domains.

**Common Pitfalls:** Do not let raw client/library exceptions propagate through all layers unless the boundary deliberately exposes them.

### Task Pattern: Manage Message Boundary Between Processes — protocol validation and unexpected messages

Every process has a mailbox. Message boundaries must be explicit.

Raw receive:

```elixir
receive do
  {:request, from, ref, payload} ->
    ...
end
```

GenServer:

```elixir
@impl true
def handle_info({:request, from, ref, payload}, state) do
  ...
end
```

| Message boundary rule                           | Reason                    |
| ----------------------------------------------- | ------------------------- |
| Tag every meaningful message                    | Avoid ambiguity           |
| Include sender/ref for replies                  | Correlate responses       |
| Validate payload if sender is not fully trusted | Avoid internal corruption |
| Handle monitor/exit messages explicitly         | Lifecycle correctness     |
| Avoid broad catch-all consumption               | Prevent mailbox bugs      |
| Hide protocol behind API                        | Maintainability           |
| Observe mailbox growth                          | Overload detection        |

**Design meaning:** Message protocols are APIs. The compiler will not enforce them. Patterns, wrappers, tests, and specs must carry the contract.

**Common Pitfalls:** A `receive` clause that matches `_` can consume messages intended for later logic. This is especially dangerous in processes with multiple protocols.

### Task Pattern: Manage Selective Receive Boundaries — ordering, stale messages, and protocol isolation

Selective receive scans the mailbox for a matching message. Non-matching messages remain.

Elixir:

```elixir
receive do
  {:reply, ^ref, value} -> {:ok, value}
after
  5_000 -> {:error, :timeout}
end
```

Messages with other refs stay in the mailbox.

| Selective receive issue           | Boundary consequence                            |
| --------------------------------- | ----------------------------------------------- |
| Old unmatched messages            | Can accumulate                                  |
| Wrong catch-all                   | Can consume unrelated protocol                  |
| Response without ref              | May match wrong request                         |
| Timeout                           | Does not remove future late response            |
| Multiple protocols in one process | Harder to reason about                          |
| Long mailbox                      | Receive gets slower for matching later messages |

**Design meaning:** Selective receive is powerful because it lets a process wait for specific protocol messages. It is dangerous because it can create hidden mailbox state.

**Common Pitfalls:** Always use correlation refs when waiting for a specific response. Otherwise, late or unrelated replies may be mistaken for current ones.

### Task Pattern: Manage Links and Monitors — failure signal boundaries

Links and monitors define process failure relationships.

| Mechanism       | Meaning                            | Use when                                        |
| --------------- | ---------------------------------- | ----------------------------------------------- |
| Link            | Bidirectional failure relationship | Processes should fail together or be supervised |
| Monitor         | One-way observation                | Caller wants `DOWN` without failing with target |
| Trap exits      | Convert linked exits into messages | Special lifecycle processes                     |
| Supervisor link | Parent-child failure management    | OTP supervision                                 |
| Task link       | Caller/task fate coupled           | Simple async ownership                          |
| Monitor ref     | Correlates `DOWN` message          | Track specific process                          |

Elixir monitor:

```elixir
ref = Process.monitor(pid)

receive do
  {:DOWN, ^ref, :process, ^pid, reason} ->
    {:down, reason}
end
```

Erlang:

```erlang
Ref = erlang:monitor(process, Pid),
receive
    {'DOWN', Ref, process, Pid, Reason} ->
        {down, Reason}
end.
```

**Design meaning:** Links and monitors are failure-boundary tools. They are more fundamental than many high-level abstractions.

**Common Pitfalls:** Monitoring without handling the `DOWN` message creates mailbox noise. Linking without understanding exit propagation can crash the caller unexpectedly.

### Task Pattern: Manage Shutdown Boundaries — graceful stop, brutal kill, and cleanup

Shutdown policy matters in long-running systems.

| Shutdown concern          | Design question                |
| ------------------------- | ------------------------------ |
| Process stop reason       | Normal, shutdown, error?       |
| Cleanup                   | Should resources be closed?    |
| Timeout                   | How long before forceful kill? |
| Supervisor child shutdown | Worker versus supervisor       |
| In-flight work            | Complete, cancel, or retry?    |
| External side effects     | Idempotency needed?            |
| Trap exits                | Is graceful cleanup needed?    |

Elixir `GenServer.stop`:

```elixir
GenServer.stop(pid, :normal, 5_000)
```

`terminate/2` callback exists but should not be used as the only cleanup strategy unless lifecycle semantics are understood.

```elixir
@impl true
def terminate(reason, state) do
  cleanup(state)
  :ok
end
```

**Design meaning:** Cleanup is a lifecycle boundary. In BEAM systems, process death often cleans up process-owned resources, but external side effects and native resources may need explicit handling.

**Common Pitfalls:** Do not rely blindly on `terminate/2` for all cleanup. It is not called in every possible termination scenario unless process trapping and shutdown conditions align.

### Task Pattern: Manage Resource Cleanup with `try/after`

Use `try/after` when a local resource must be cleaned regardless of success or failure.

Elixir:

```elixir
{:ok, file} = File.open(path, [:read])

try do
  IO.read(file, :all)
after
  File.close(file)
end
```

Erlang:

```erlang
{ok, File} = file:open(Path, [read]),
try
    io:get_chars(File, '', all)
after
    file:close(File)
end.
```

| Use `try/after` when                     | Prefer another pattern when                |
| ---------------------------------------- | ------------------------------------------ |
| Resource is local to function            | Library provides scoped function           |
| Cleanup must happen after exceptions     | Process ownership handles lifecycle        |
| File/socket/temporary handle needs close | Resource should live with a server process |
| Short-lived resource                     | Long-running resource under supervision    |

**Design meaning:** `try/after` is a local resource boundary. Process supervision is a systemic resource boundary. Choose based on lifecycle.

**Common Pitfalls:** If a resource should outlive the function call, `try/after` is the wrong boundary. It should probably be owned by a process.
### Task Pattern: Manage Supervision Boundaries — restart policy, failure scope, and escalation

Supervision is the central BEAM mechanism for turning process failure into architectural recovery. A supervisor boundary answers: **which process is allowed to fail, who notices, what restarts, and when escalation occurs?**

Elixir supervision child list:

```elixir
children = [
  MyApp.Cache,
  {DynamicSupervisor, strategy: :one_for_one, name: MyApp.WorkerSupervisor},
  {Registry, keys: :unique, name: MyApp.Registry}
]

Supervisor.start_link(children, strategy: :one_for_one, name: MyApp.Supervisor)
```

Erlang supervisor callback style:

```erlang
init([]) ->
    Children = [
        #{id => cache,
          start => {cache, start_link, []},
          restart => permanent,
          shutdown => 5000,
          type => worker,
          modules => [cache]}
    ],
    {ok, {{one_for_one, 5, 10}, Children}}.
```

| Supervision concept | Meaning                                      | Design question                                    |
| ------------------- | -------------------------------------------- | -------------------------------------------------- |
| Child process       | Supervised runtime unit                      | Does this component deserve independent lifecycle? |
| Restart strategy    | How children restart after failure           | Should siblings restart too?                       |
| Restart intensity   | How many restarts before supervisor gives up | Is repeated failure a local or systemic problem?   |
| Shutdown timeout    | Graceful termination window                  | How long can cleanup take?                         |
| Child type          | worker or supervisor                         | Is this process a leaf or subtree root?            |
| Supervisor tree     | Nested recovery structure                    | Where should failure containment stop?             |

Common restart strategies:

| Strategy                         | Meaning                                         | Use when                              |
| -------------------------------- | ----------------------------------------------- | ------------------------------------- |
| `:one_for_one` / `one_for_one`   | Restart only failed child                       | Children are independent              |
| `:one_for_all` / `one_for_all`   | Restart all children if one fails               | Children share tightly coupled state  |
| `:rest_for_one` / `rest_for_one` | Restart failed child and later-started siblings | Later children depend on earlier ones |
| Dynamic supervision              | Children created at runtime                     | Worker population changes dynamically |

**Design meaning:** Supervision is not a generic “make it reliable” switch. It encodes dependency structure. If dependencies are wrong, restarts may preserve the wrong state, duplicate side effects, or hide repeated failure.

**Failure-first explanation:** The tempting wrong model is “put it under a supervisor and reliability is solved.” The surprising failure is a restart loop, duplicated jobs, lost in-memory state, or cascading termination. The correct explanation is that a supervisor only knows how to restart processes according to declared policy; it does not know domain correctness. The professional rule is: supervise components whose lifecycle and recovery behavior are well-defined. The boundary changes when failure must be persisted, retried, deduplicated, or compensated externally.

**Common Pitfalls:** Do not supervise a process that performs non-idempotent side effects without deciding what happens if it crashes after the side effect but before acknowledging completion.

### Task Pattern: Choose Restart Policy — permanent, transient, temporary

Restart type controls whether a child is restarted after termination.

| Restart type               | Meaning                       | Use when                                          |
| -------------------------- | ----------------------------- | ------------------------------------------------- |
| `:permanent` / `permanent` | Always restart                | Infrastructure service should always run          |
| `:transient` / `transient` | Restart only on abnormal exit | Worker may finish normally                        |
| `:temporary` / `temporary` | Never restart                 | One-off task or intentionally short-lived process |

Elixir child spec example:

```elixir
%{
  id: MyApp.Worker,
  start: {MyApp.Worker, :start_link, [arg]},
  restart: :transient,
  shutdown: 5_000,
  type: :worker
}
```

| Process kind                                    | Likely restart type          |
| ----------------------------------------------- | ---------------------------- |
| Cache server                                    | `:permanent`                 |
| Registry                                        | `:permanent`                 |
| Long-running connection acceptor                | `:permanent`                 |
| Job worker that exits normally after completion | `:transient` or `:temporary` |
| Fire-and-forget task                            | often `:temporary`           |
| Dynamic session process                         | depends on session semantics |
| Supervisor child                                | usually `:permanent`         |

**Design meaning:** Restart policy is a statement about whether process death is normal, abnormal, or always unacceptable.

**Common Pitfalls:** Marking every child `:permanent` can restart processes that intentionally completed. Marking important infrastructure `:temporary` can make it silently disappear.

### Task Pattern: Design Failure Boundaries in Job Processing — retry, crash, skip, or poison

Job processing exposes a classic BEAM boundary problem: a worker crash is easy to restart, but the job’s side effects and retry semantics are domain-specific.

| Failure case                         | Possible policy              |
| ------------------------------------ | ---------------------------- |
| Invalid job payload                  | Mark failed; do not retry    |
| Temporary network failure            | Retry with backoff           |
| External service timeout             | Retry or circuit-break       |
| Non-idempotent side effect completed | Do not blindly retry         |
| Worker bug                           | Crash and alert              |
| Poison message                       | Move to dead-letter handling |
| Queue unavailable                    | Backoff or fail subsystem    |
| Overload                             | Apply backpressure           |

Elixir sketch:

```elixir
def perform(job) do
  with {:ok, command} <- JobCommand.new(job),
       :ok <- ExternalClient.send(command) do
    :ok
  else
    {:error, :invalid_job} ->
      {:discard, :invalid_job}

    {:error, :timeout} ->
      {:retry, :timeout}

    {:error, reason} ->
      {:fail, reason}
  end
end
```

**Design meaning:** A job worker’s process failure and a job’s business failure are different. Process supervision handles runtime failure; job semantics need explicit domain policy.

**Common Pitfalls:** Letting a worker crash on every bad input may create infinite retry loops if the queue system treats crashes as retryable failures.

### Task Pattern: Define Resource Ownership by Process — owner, users, and cleanup

A BEAM process often owns a resource. Other processes interact with the owner rather than the resource directly.

| Resource                 | Typical owner                      | Boundary rule                                   |
| ------------------------ | ---------------------------------- | ----------------------------------------------- |
| Socket                   | Connection process                 | Owner receives data and controls mode           |
| ETS table                | Owner process                      | Table lifecycle tied to owner unless configured |
| Port                     | Port owner process                 | Owner receives port messages                    |
| File handle              | Opening process or scoped function | Close explicitly or via owner lifecycle         |
| Timer                    | Scheduling process                 | Message delivered to owner                      |
| Task                     | Caller or task supervisor          | Await, monitor, or supervise                    |
| External connection pool | Pool supervisor/processes          | Use pool API                                    |
| Registry                 | Registry process                   | Lookup via API                                  |

Example: ETS owner module in Elixir:

```elixir
defmodule CacheTable do
  use GenServer

  def start_link(opts) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  def lookup(key) do
    :ets.lookup(__MODULE__, key)
  end

  @impl true
  def init(_opts) do
    :ets.new(__MODULE__, [:named_table, :protected, read_concurrency: true])
    {:ok, %{}}
  end
end
```

Here the table is named, but the owner process controls lifecycle.

**Design meaning:** Resource ownership prevents “who closes this?” and “who receives this message?” ambiguity. In concurrent systems, resource ownership is more important than mere lexical scope.

**Common Pitfalls:** Public ETS tables with writes from many modules can become implicit global mutable state. Prefer a narrow API even when the table itself is accessible.

### Task Pattern: Handle Ports and External OS Processes — isolation with protocol cost

Ports let BEAM communicate with external OS processes. They isolate the VM from native crashes better than NIFs, but introduce serialization, protocol, and lifecycle complexity.

Conceptual Elixir shape:

```elixir
port =
  Port.open({:spawn_executable, path}, [
    :binary,
    args: args,
    packet: 4
  ])
```

Receiving port data:

```elixir
receive do
  {^port, {:data, data}} ->
    handle_data(data)

  {^port, {:exit_status, status}} ->
    handle_exit(status)
end
```

| Port boundary concern | Design question                       |
| --------------------- | ------------------------------------- |
| Protocol framing      | How are messages separated?           |
| Serialization         | What format crosses the boundary?     |
| OS process lifecycle  | Who kills/restarts it?                |
| Backpressure          | What if external process is slow?     |
| Security              | Are executable path and args trusted? |
| Crash behavior        | How is exit status handled?           |
| Supervision           | Is the port owner supervised?         |

**Design meaning:** A port is often safer than a NIF for risky native integration because the external process can crash without taking down the VM. The cost is explicit communication protocol design.

**Common Pitfalls:** Do not build shell command strings from untrusted input. Use executable plus argument lists where possible and validate inputs.

### Task Pattern: Handle NIF Boundaries — native power with VM-level risk

NIFs run native code inside the BEAM VM. This can be very fast, but the safety boundary is much sharper.

| NIF risk                      | Why it matters                           |
| ----------------------------- | ---------------------------------------- |
| VM crash                      | Bad native code can crash the whole VM   |
| Scheduler blocking            | Long NIFs can harm responsiveness        |
| Memory unsafety               | Native bugs bypass BEAM memory safety    |
| Dirty scheduler misuse        | Still consumes runtime resources         |
| Upgrade/deployment complexity | Native binaries must match environment   |
| Debug difficulty              | Failures cross language/runtime boundary |

| Use NIF when                        | Prefer port/external service when     |
| ----------------------------------- | ------------------------------------- |
| Native performance is essential     | Isolation matters more than raw speed |
| Operation is short and safe         | Operation may block long              |
| Library is mature and well-reviewed | Native code is experimental           |
| Dirty scheduler use is understood   | Crash containment is required         |
| Data crossing cost is acceptable    | Protocol boundary is acceptable       |

**Design meaning:** BEAM fault tolerance is process-oriented. NIFs can violate the assumption that a process failure is contained. Therefore a NIF boundary is a high-trust boundary.

**Common Pitfalls:** Do not assume “let it crash” protects the VM from unsafe native code. It usually does not.

### Task Pattern: Handle Distributed Node Boundaries — messaging is easy, correctness is not

Distributed Erlang lets BEAM nodes communicate, but distribution remains a systems problem.

| Distributed boundary issue | Consequence                                             |
| -------------------------- | ------------------------------------------------------- |
| Node connectivity          | Remote process may disappear                            |
| Network partition          | Messages and global assumptions may fail                |
| Version skew               | Message shapes may differ                               |
| Atom sharing               | Atom table and compatibility matter                     |
| Security cookie            | Node-level authentication is not full app authorization |
| Serialization              | Terms cross node boundary                               |
| Global names               | Name conflicts and partition behavior                   |
| Ordering                   | Local guarantees do not solve distributed protocols     |
| Backpressure               | Remote sends can still overload receivers               |

Example message shape with version:

```elixir
{:user_event, 1, %{id: id, type: :created}}
```

**Design meaning:** BEAM distribution provides primitives, not application-level distributed correctness. The language makes remote messaging possible; it does not solve consensus, partition tolerance, schema evolution, or security design.

**Common Pitfalls:** Do not send arbitrary internal structs or messages across distributed boundaries without versioning. Treat remote messages as compatibility contracts.

### Task Pattern: Define Serialization Boundaries — public formats versus internal terms

Serialization freezes data shape. Choose format according to trust, compatibility, and interoperability.

| Format                      | Good for                    | Risk                                           |
| --------------------------- | --------------------------- | ---------------------------------------------- |
| JSON                        | Public APIs, web interop    | Loses atoms/tuples/PIDs, string-key conversion |
| Erlang external term format | Trusted BEAM-to-BEAM data   | Unsafe if untrusted; compatibility concerns    |
| Binary protocol             | Compact controlled protocol | Manual parser/versioning                       |
| MessagePack/CBOR            | Compact interoperable data  | Library/schema discipline                      |
| Database rows               | Durable queryable storage   | Migration needed                               |
| Plain text config           | Human-editable              | Parsing ambiguity                              |
| Internal struct             | Short-lived internal use    | Bad public long-term format                    |

Elixir external term format:

```elixir
binary = :erlang.term_to_binary({:ok, %{id: 1}})
term = :erlang.binary_to_term(binary)
```

**Professional rule:** Use external term format only for trusted contexts unless safe decoding options and the security model are fully understood. For public APIs, use explicit schemas and versioned formats.

**Common Pitfalls:** Persisting raw internal BEAM terms makes future migrations harder because internal representation becomes storage schema.

### Task Pattern: Define Version and Migration Boundaries

Any long-lived boundary needs evolution strategy.

| Boundary             | Versioning strategy                                     |
| -------------------- | ------------------------------------------------------- |
| Persisted events     | Include event version                                   |
| External API         | Version endpoint or schema                              |
| Distributed messages | Include protocol version                                |
| Config files         | Support old fields or migrate                           |
| Database schema      | Migrations                                              |
| Public structs       | Additive changes when possible                          |
| Error reasons        | Document and preserve                                   |
| Process protocol     | Avoid changing message shape without controlled rollout |

Event version example:

```elixir
%{
  type: :user_created,
  version: 2,
  id: id,
  email: email,
  occurred_at: occurred_at
}
```

Migration function:

```elixir
def normalize_event(%{type: :user_created, version: 1} = event) do
  {:ok, upgrade_user_created_v1(event)}
end

def normalize_event(%{type: :user_created, version: 2} = event) do
  {:ok, event}
end

def normalize_event(_) do
  {:error, :unknown_event}
end
```

**Design meaning:** Internal code can change quickly; persisted and distributed data cannot. Compatibility is a boundary discipline.

**Common Pitfalls:** A catch-all decoder that “best effort” parses old data without version checks can silently corrupt meaning.

### Task Pattern: Define Configuration Compatibility — option names, defaults, and deprecation

Options and configuration are public APIs.

Elixir option parsing:

```elixir
def start_link(opts) do
  name = Keyword.get(opts, :name, __MODULE__)
  timeout = Keyword.get(opts, :timeout, 5_000)

  validate_start_options!(name, timeout)

  GenServer.start_link(__MODULE__, %{timeout: timeout}, name: name)
end
```

| Config change       | Compatibility concern     |
| ------------------- | ------------------------- |
| Rename option       | Existing callers break    |
| Change default      | Behavior changes silently |
| Remove option       | Startup failures          |
| Add option          | Usually safe              |
| Change units        | Severe hidden bugs        |
| Change env var name | Deployment break          |
| Change type         | Parsing failures          |

**Professional rule:** Document units explicitly. `timeout: 5_000` should state milliseconds if the API uses milliseconds.

**Common Pitfalls:** Changing timeout units from seconds to milliseconds or vice versa without renaming causes production-scale failures.

### Task Pattern: Isolate Framework Boundaries — Phoenix, Ecto, Plug, and DSLs are not the language

Modern Elixir often uses framework DSLs. They should be treated as framework boundaries, not core language semantics.

| Framework-like boundary | Core concern                                  |
| ----------------------- | --------------------------------------------- |
| Phoenix routes          | Macro-generated dispatch table                |
| Plug pipeline           | Function/connection transformation convention |
| Ecto schema             | Persistence/data validation convention        |
| Ecto changeset          | Validation and casting data structure         |
| LiveView callbacks      | Process and UI lifecycle convention           |
| ExUnit tests            | Macro DSL for tests                           |
| Mix tasks               | Build/tooling convention                      |
| Telemetry events        | Observability contract                        |

Example DSL shape:

```elixir
schema "users" do
  field :name, :string
  field :email, :string
end
```

This is not ordinary core syntax. It is macro-backed framework code.

**Design meaning:** Frameworks create additional boundaries: generated code, callback contracts, lifecycle rules, and data structures. Understanding BEAM semantics helps, but each framework adds conventions.

**Common Pitfalls:** Do not assume a Phoenix controller, Ecto changeset, or LiveView callback is a core Elixir construct. Learn the framework boundary separately.

### Task Pattern: Define Trust Boundary for Macros and Generated Code

Macros execute at compile time and generate code. This creates special boundary risks.

| Macro boundary issue | Design question                                    |
| -------------------- | -------------------------------------------------- |
| Caller input         | Is AST validated?                                  |
| Generated functions  | Are names documented?                              |
| Evaluation count     | Is an expression evaluated once or multiple times? |
| Hygiene              | Can variables collide?                             |
| Error messages       | Are compile-time errors understandable?            |
| Dependency           | Does macro create hidden imports/aliases?          |
| Upgrade              | Does generated code change across versions?        |
| Security             | Are external compile-time inputs trusted?          |

Safer macro pattern with `bind_quoted`:

```elixir
defmacro log_and_return(expr) do
  label = Macro.to_string(expr)

  quote bind_quoted: [expr: expr, label: label] do
    value = expr
    IO.inspect(value, label: label)
    value
  end
end
```

**Design meaning:** A macro boundary is both an API boundary and a compiler boundary. Users depend on expansion behavior, not just function behavior.

**Common Pitfalls:** A macro that evaluates an argument multiple times can duplicate side effects. This is one of the most common macro correctness bugs.

### Task Pattern: Handle Dynamic Dispatch Boundaries — `apply`, module names, and capability control

Dynamic calls are sometimes needed, but they weaken readability and control.

Elixir:

```elixir
apply(module, function, args)
```

Erlang:

```erlang
apply(Module, Function, Args).
```

| Dynamic dispatch use  | Safer boundary                 |
| --------------------- | ------------------------------ |
| Plugin module         | Behaviour + whitelist/config   |
| User-chosen action    | Explicit command mapping       |
| Framework callback    | Documented callback contract   |
| Test double           | Behaviour or function argument |
| RPC-like call         | Restrict module/function/arity |
| Internal generic code | Keep private and spec’d        |

Bad:

```elixir
def call_from_params(%{"module" => module, "function" => function, "args" => args}) do
  apply(String.to_atom(module), String.to_atom(function), args)
end
```

Better:

```elixir
@commands %{
  "activate" => {AccountCommands, :activate, 1},
  "suspend" => {AccountCommands, :suspend, 1}
}

def call_from_params(%{"command" => command, "args" => args}) do
  case Map.fetch(@commands, command) do
    {:ok, {module, function, arity}} when length(args) == arity ->
      apply(module, function, args)

    _ ->
      {:error, :unknown_command}
  end
end
```

**Design meaning:** Dynamic dispatch turns data into authority. Restrict it explicitly.

**Common Pitfalls:** Never let untrusted input choose arbitrary modules, functions, atoms, or arguments.

### Task Pattern: Handle Process Dictionary Boundaries — hidden process-local state

The process dictionary is process-local storage.

Elixir:

```elixir
Process.put(:request_id, request_id)
Process.get(:request_id)
```

Erlang:

```erlang
put(request_id, RequestId),
get(request_id).
```

| Appropriate-ish use                   | Risky use                        |
| ------------------------------------- | -------------------------------- |
| Logging metadata                      | Business logic state             |
| Tracing context                       | Function inputs                  |
| Framework internals                   | Domain invariants                |
| Temporary instrumentation             | Cross-module hidden dependencies |
| Process-local cache with strict scope | Long-lived implicit state        |

**Design meaning:** The process dictionary bypasses explicit arguments and state. It is a boundary escape hatch.

**Common Pitfalls:** If a function’s result depends on process dictionary state, that dependency is invisible in the function signature and hard to test.

### Task Pattern: Boundary-Test Error and Resource Behavior

Testing boundaries requires testing failure, not only success.

| Boundary         | Test failure cases                       |
| ---------------- | ---------------------------------------- |
| Parser           | malformed input                          |
| Config           | missing/invalid env                      |
| Public API       | documented error reasons                 |
| Process API      | timeout, unknown message                 |
| GenServer        | crash/restart behavior where appropriate |
| Supervisor       | child restart behavior                   |
| External client  | timeout/unavailable response             |
| File loader      | missing/permission/malformed file        |
| Serializer       | old version/new version/invalid data     |
| NIF/port wrapper | external process failure                 |
| Registry         | missing process/name collision           |
| ETS owner        | owner death/table absence                |

Elixir test style:

```elixir
test "returns error for invalid status" do
  assert {:error, :invalid_status} = Parser.parse_status(%{"status" => "bad"})
end
```

**Design meaning:** Boundary correctness is most visible under failure. A boundary not tested under failure is often only a happy-path wrapper.

**Common Pitfalls:** Do not test only that a supervised child starts. Test what happens when it dies if restart behavior is important.

### Task Pattern: Code Review Boundary Checklist

When reviewing Erlang / Elixir code, boundaries should be inspected explicitly.

| Review question                              | Why it matters                          |
| -------------------------------------------- | --------------------------------------- |
| What is public API?                          | Stability and caller contract           |
| Are return shapes stable?                    | Caller pattern matching depends on them |
| Are errors expected or exceptional?          | Determines tagged return versus crash   |
| Is external input validated before use?      | Trust boundary                          |
| Are atoms created from untrusted data?       | VM safety                               |
| Are messages tagged and correlated?          | Process protocol correctness            |
| Are resources owned and cleaned?             | Lifecycle correctness                   |
| Is long work inside a server callback?       | Responsiveness                          |
| Is `cast` used where confirmation is needed? | Lost failure feedback                   |
| Is supervision policy domain-correct?        | Recovery correctness                    |
| Does generated code hide behavior?           | Macro boundary                          |
| Are NIFs/ports isolated?                     | VM and OS boundary                      |
| Are logs/telemetry safe?                     | Secret and cardinality control          |
| Is persisted data versioned?                 | Future compatibility                    |

### Boundary Task Decision Table

| Boundary problem      | Prefer                                    | Avoid                              |
| --------------------- | ----------------------------------------- | ---------------------------------- |
| Public module API     | Small documented `def`/exports with specs | Exposing helpers accidentally      |
| Internal helper       | `defp` or unexported function             | Public helper just for tests       |
| Expected failure      | Tagged return                             | Exception for ordinary domain flow |
| Violated invariant    | Direct match/crash under correct boundary | Silent fallback                    |
| External input        | Parse/validate/normalize                  | Passing raw maps everywhere        |
| Unknown status string | Explicit mapping                          | `String.to_atom`                   |
| Process operation     | Public wrapper function                   | Raw message tuples across app      |
| Need response         | `call` or ref/monitor protocol            | Blind `cast`                       |
| Fire-and-forget       | `cast` only if overload handled           | `call` when no reply needed        |
| Long work in server   | Task/worker/split process                 | Blocking callback                  |
| Dynamic workers       | `DynamicSupervisor`                       | Untracked raw spawn                |
| Shared lookup         | ETS with owner API                        | One overloaded GenServer by habit  |
| Native integration    | Port or careful NIF                       | Long unsafe NIF                    |
| Serialization         | Versioned external schema                 | Raw internal term as public format |
| Config                | Parse once at startup                     | Runtime string parsing everywhere  |
| Logging               | Structured safe metadata                  | Raw `inspect` of sensitive data    |
| Macro API             | Documented expansion contract             | Macro for ordinary function reuse  |

### Boundary Anti-Pattern Index

| Anti-pattern                                     | Why it is dangerous                  | Better alternative                      |
| ------------------------------------------------ | ------------------------------------ | --------------------------------------- |
| `String.to_atom` on user input                   | Atom table exhaustion                | Explicit finite mapping                 |
| Raw `GenServer.call` tuples throughout app       | Protocol leakage                     | Public API functions                    |
| `cast` for important writes                      | No confirmation/backpressure         | `call`, ack protocol, queue             |
| Catch-all `rescue _`                             | Hides bugs                           | Rescue known exceptions                 |
| Catch-all `handle_info` silently ignoring        | Hides protocol errors                | Log/handle known messages carefully     |
| One giant GenServer                              | Bottleneck and failure concentration | Split ownership/failure domains         |
| Process per passive object                       | Resource/lifecycle overhead          | Plain data unless behavior exists       |
| Public ETS writes from everywhere                | Global mutable state                 | Owner module/API                        |
| Broad dynamic `apply`                            | Capability leak                      | Whitelist/behaviour                     |
| Unversioned persisted structs                    | Migration burden                     | Versioned schema                        |
| NIF for blocking work                            | Scheduler/VM risk                    | Dirty scheduler, port, external service |
| Process dictionary for domain state              | Hidden dependency                    | Explicit args/state                     |
| Logging raw params/secrets                       | Data leak                            | Redaction and structured metadata       |
| Supervision as retry policy without domain logic | Duplicate effects/restart loops      | Explicit job retry semantics            |
| Treating framework DSL as language               | Misplaced assumptions                | Learn framework boundary                |

### Boundary Mental Model — the BEAM-specific rule

A good Erlang / Elixir boundary answers five questions:

| Question                               | Example                                            |
| -------------------------------------- | -------------------------------------------------- |
| What shape crosses this boundary?      | tuple, map, struct, binary, message                |
| Who owns the state or resource?        | process, supervisor, table owner, external service |
| What happens on expected failure?      | tagged return, retry, validation error             |
| What happens on unexpected failure?    | crash, exit, restart, escalation                   |
| What must remain compatible over time? | public API, event schema, config, message protocol |

This is where Erlang / Elixir differs from many ordinary application-language tutorials. Boundary design is not only about “clean code.” It is about **runtime survival**, **failure containment**, **message correctness**, **resource ownership**, and **operational maintainability**.
## PART 6 — Standard Library and Core Ecosystem Reference by Task Pattern

### Part Scope — task-oriented library fluency across Erlang, Elixir, OTP, and ecosystem layers

Part 6 is a **task-pattern reference** for the Erlang / Elixir standard library and core ecosystem. The purpose is not to list every module. The purpose is to answer: **when a professional BEAM programmer needs to perform a task, which standard module, OTP facility, Elixir wrapper, or ecosystem tool should be considered first?**

This part keeps the same combined-language policy: shared BEAM / OTP facilities are treated as the foundation; Erlang modules are included because Elixir code often calls them directly; Elixir modules are included because they define the modern application-development workflow; framework tools are separated from core language/runtime semantics. This follows the original tutorial contract to teach Erlang / Elixir as a unified BEAM / OTP learning target rather than two unrelated tutorials. 

Erlang’s official description emphasizes massively scalable soft real-time systems, high availability, and built-in runtime support for concurrency, distribution, and fault tolerance; that explains why many “library” decisions in this ecosystem are really runtime-and-OTP decisions rather than ordinary utility-module choices. ([Erlang.org][1]) Mix, by contrast, is Elixir’s project/build/test/dependency workflow tool; its official documentation describes it as handling project creation, compilation, testing, dependencies, and related tasks. ([Hexdocs][2]) Hex is the package manager for the Erlang ecosystem and is usable with Elixir’s Mix and Erlang’s Rebar3, so the package ecosystem is shared even though project workflows differ. ([Hex][3])

| Task area             | Erlang / OTP foundation                             | Elixir layer                                                                 | Ecosystem layer                             | Main boundary question                                                 |
| --------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------- |
| Project workflow      | `erl`, `rebar3`, OTP apps/releases                  | `mix`, `iex`, Mix projects/releases                                          | Hex, HexDocs, ExDoc                         | Is this source code, package workflow, or deployment artifact?         |
| Collections           | `lists`, `maps`, `sets`, `queue`, `ets`             | `Enum`, `Stream`, `Map`, `MapSet`, `Keyword`                                 | Flow/Broadway-like libraries where needed   | Is the data eager, lazy, shared, or process-owned?                     |
| Text and binaries     | `binary`, `string`, `unicode`, `re`                 | `String`, `Regex`, binaries, sigils                                          | Parser/format libraries                     | Is this UTF-8 text, charlist, iodata, or raw binary?                   |
| Files and paths       | `file`, `filename`                                  | `File`, `Path`                                                               | File watcher/libs as needed                 | Is failure expected and is the file large?                             |
| Time                  | `erlang:monotonic_time`, `calendar`, `timer`        | `Date`, `Time`, `DateTime`, `NaiveDateTime`, `Calendar`, `System`, `Process` | Timezone libraries where needed             | Is this wall time, duration, timeout, or calendar data?                |
| Serialization         | `term_to_binary`, `binary_to_term`                  | protocol wrappers, JSON libraries via ecosystem                              | Jason, Poison legacy, MessagePack/CBOR libs | Is the data trusted, public, or versioned?                             |
| Testing               | EUnit, Common Test                                  | ExUnit                                                                       | StreamData, Mox and others                  | Is this unit, integration, property, or boundary testing?              |
| Logging/observability | `logger`, tracing tools                             | `Logger`, `dbg`, telemetry ecosystem                                         | Telemetry, OpenTelemetry                    | Is this local debugging, structured logging, metric, or trace?         |
| Concurrency           | `spawn`, `gen_server`, `supervisor`, `ets`, `timer` | `Task`, `Agent`, `GenServer`, `Supervisor`, `Registry`                       | Oban, Broadway, Phoenix.PubSub, etc.        | Is this temporary work, stateful server, queue, or lifecycle boundary? |
| Networking            | `gen_tcp`, `gen_udp`, `ssl`, `httpc`                | Erlang modules directly, wrappers                                            | Finch, Mint, Req, Bandit, Cowboy/Phoenix    | Is this low-level socket, HTTP client/server, or framework boundary?   |

### Task Pattern: Create and Manage Projects — Mix, Rebar3, OTP applications, and dependency files

Elixir’s standard project workflow is built around `mix`. Erlang projects commonly use `rebar3`. Both ultimately target OTP applications and BEAM artifacts, but their developer ergonomics differ.

Elixir project creation:

```bash
mix new my_app
mix new my_app --sup
```

The `--sup` form creates a supervision-ready application skeleton.

Typical Elixir project files:

```text
mix.exs
lib/
test/
config/
```

Typical Erlang project files:

```text
rebar.config
src/
include/
test/
```

| Task              | Elixir / Mix        | Erlang / Rebar3 / OTP                  | Design meaning                             |
| ----------------- | ------------------- | -------------------------------------- | ------------------------------------------ |
| Create project    | `mix new app`       | `rebar3 new app app_name`              | Tooling convention, not language semantics |
| Compile           | `mix compile`       | `rebar3 compile`                       | Compile to BEAM bytecode                   |
| Run tests         | `mix test`          | `rebar3 eunit`, `rebar3 ct`            | Test framework choice                      |
| Fetch deps        | `mix deps.get`      | `rebar3 get-deps` or compile workflow  | Dependency resolution                      |
| Interactive shell | `iex -S mix`        | `rebar3 shell`, `erl`                  | Runtime exploration                        |
| Release           | `mix release`       | `rebar3 release` / OTP release tooling | Deployment artifact                        |
| Package source    | Hex package via Mix | Hex package via Rebar3                 | Shared BEAM package ecosystem              |

Example `mix.exs` dependency section:

```elixir
defp deps do
  [
    {:jason, "~> 1.4"}
  ]
end
```

**Design meaning:** Mix and Rebar3 are not merely build tools; they encode ecosystem workflow. A learner should distinguish **language syntax**, **OTP application structure**, **build tool behavior**, and **package ecosystem convention**.

**Common Pitfalls:** Do not assume every Elixir dependency is “Elixir-only.” Hex packages can include Erlang libraries, Elixir libraries, NIFs, Mix tasks, or documentation tooling. Conversely, Erlang projects can consume Hex dependencies through Rebar3.

### Task Pattern: Use the Interactive Shell — `iex`, `erl`, runtime exploration, and process inspection

Interactive shells are central to BEAM learning and debugging.

| Task                | Elixir                                 | Erlang                       | Notes                                             |
| ------------------- | -------------------------------------- | ---------------------------- | ------------------------------------------------- |
| Start shell         | `iex`                                  | `erl`                        | Bare runtime shell                                |
| Start project shell | `iex -S mix`                           | `rebar3 shell`               | Loads project code/deps                           |
| Compile file        | `c("file.ex")` in IEx for simple cases | `c(module).`                 | Project builds should use Mix/Rebar3              |
| Inspect value       | `IO.inspect(value)`                    | `io:format("~p~n", [Value])` | Display term shape                                |
| Current process     | `self()`                               | `self()`                     | Same BEAM concept                                 |
| Send message        | `send(pid, msg)`                       | `Pid ! Msg`                  | Shell process has mailbox                         |
| Receive message     | `receive do ... end`                   | `receive ... end`            | Useful for learning mailbox semantics             |
| Load helper         | `import`, `alias`, `require`           | compile/import/module calls  | Shell convenience differs from source conventions |

Elixir example:

```elixir
parent = self()

spawn(fn ->
  send(parent, {:hello, self()})
end)

receive do
  {:hello, pid} -> {:got_message, pid}
end
```

Erlang example:

```erlang
Parent = self(),
spawn(fun() ->
    Parent ! {hello, self()}
end),
receive
    {hello, Pid} -> {got_message, Pid}
end.
```

**Design meaning:** The shell is a live BEAM process. This is different from shells that merely evaluate isolated expressions. It can receive messages, spawn processes, inspect PIDs, and interact with loaded modules.

**Common Pitfalls:** Do not overgeneralize shell conveniences to production code. Shell experiments are useful, but project structure, supervision, configuration, and test workflow belong in Mix/Rebar3/OTP application context.

### Task Pattern: Manage Dependencies — Hex, version constraints, lock files, and dependency boundaries

Hex is the shared package manager for the Erlang ecosystem and works with Elixir’s Mix and Erlang’s Rebar3. ([Hex][3]) In Elixir, dependency declarations usually live in `mix.exs`.

```elixir
defp deps do
  [
    {:jason, "~> 1.4"},
    {:plug, "~> 1.16"}
  ]
end
```

Then:

```bash
mix deps.get
mix deps.compile
mix deps.tree
```

| Dependency task         | Elixir / Mix          | Erlang / Rebar3                  | Professional concern  |
| ----------------------- | --------------------- | -------------------------------- | --------------------- |
| Declare dependency      | `deps` in `mix.exs`   | `deps` in `rebar.config`         | Version constraints   |
| Fetch dependency        | `mix deps.get`        | Rebar3 dependency workflow       | Reproducibility       |
| Lock dependency         | `mix.lock`            | lock file depending Rebar3 setup | Stable builds         |
| Inspect dependency tree | `mix deps.tree`       | `rebar3 tree` where available    | Transitive risk       |
| Update dependency       | `mix deps.update dep` | Rebar3 update workflow           | Compatibility         |
| Publish package         | Mix/Hex tooling       | Rebar3/Hex tooling               | Public API discipline |
| Documentation           | HexDocs / ExDoc       | EDoc/ExDoc depending package     | Discoverability       |

**Design meaning:** A dependency is a boundary. It can bring transitive code, NIFs, compile-time macros, runtime applications, configuration requirements, and version constraints.

**Common Pitfalls:** Do not treat dependency addition as a pure code import. In BEAM projects, a dependency may also define OTP applications that must start, configuration keys, logger behavior, telemetry events, protocols, macros, or native code.

### Task Pattern: Work with Collections — `Enum`, `Stream`, `lists`, `maps`, `MapSet`, `queue`, and `ets`

Collection choice in Erlang / Elixir must account for data shape, evaluation strategy, access pattern, and ownership.

| Task                   | Elixir first choice | Erlang / OTP first choice               | Use when                              |
| ---------------------- | ------------------- | --------------------------------------- | ------------------------------------- |
| Map each item          | `Enum.map/2`        | `lists:map/2`                           | Eager transformation                  |
| Filter items           | `Enum.filter/2`     | `lists:filter/2`                        | Eager subset                          |
| Reduce/fold            | `Enum.reduce/3`     | `lists:foldl/3`, `lists:foldr/3`        | Accumulation                          |
| Lazy pipeline          | `Stream`            | custom/lazy process or library patterns | Avoid eager intermediate work         |
| Key-value structure    | `Map`               | `maps`                                  | In-memory immutable lookup            |
| Set                    | `MapSet`            | `sets`, `ordsets`, maps-as-set          | Membership semantics                  |
| Ordered options        | `Keyword`           | proplists                               | Option lists and DSLs                 |
| FIFO queue             | `:queue`            | `queue`                                 | Efficient queue operations            |
| Shared mutable table   | `:ets`              | `ets`                                   | Large/shared/runtime table            |
| Persistent global data | `:persistent_term`  | `persistent_term`                       | Rarely changed global read-heavy data |

Elixir eager transformation:

```elixir
users
|> Enum.filter(& &1.active)
|> Enum.map(& &1.email)
```

Elixir lazy transformation:

```elixir
users
|> Stream.filter(& &1.active)
|> Stream.map(& &1.email)
|> Enum.take(100)
```

Erlang eager transformation:

```erlang
Emails =
    lists:map(
      fun user_email/1,
      lists:filter(fun user_active/1, Users)).
```

Queue example from Elixir using Erlang `:queue`:

```elixir
queue = :queue.new()
queue = :queue.in(:job1, queue)
{{:value, job}, queue} = :queue.out(queue)
```

ETS example:

```elixir
table = :ets.new(:cache, [:set, :protected, read_concurrency: true])
:ets.insert(table, {:count, 1})
:ets.lookup(table, :count)
```

**Design meaning:** `Enum` and `lists` operate on immutable collections. `Stream` changes evaluation timing. `ETS` changes ownership and mutability assumptions. These are not interchangeable “collection APIs.”

**Failure-first explanation:** The tempting wrong model is “use `Enum` for everything collection-shaped.” The surprising failure is excessive intermediate lists, expensive repeated traversals, or poor lookup performance. The correct explanation is that traversal, lookup, laziness, and shared state are different tasks. The professional rule is: choose the collection tool by access pattern and lifecycle. The boundary changes when data becomes large, shared, concurrent, or persistent.

**Common Pitfalls:** Do not use `Enum.map/2` for side effects while ignoring the result. Use `Enum.each/2` in Elixir or `lists:foreach/2` in Erlang when side effects are the intention.

### Task Pattern: Use `Enum` and `lists` — eager collection transformation

`Enum` is Elixir’s general eager enumeration module. Erlang’s `lists` module is the traditional list-processing foundation.

Elixir:

```elixir
Enum.map([1, 2, 3], fn n -> n * 2 end)
Enum.filter(users, fn user -> user.active end)
Enum.reduce(numbers, 0, fn n, acc -> n + acc end)
```

Erlang:

```erlang
lists:map(fun(N) -> N * 2 end, [1, 2, 3]).
lists:filter(fun(User) -> user_active(User) end, Users).
lists:foldl(fun(N, Acc) -> N + Acc end, 0, Numbers).
```

| Task                 | Elixir                            | Erlang            | Return shape            |
| -------------------- | --------------------------------- | ----------------- | ----------------------- |
| Transform            | `Enum.map/2`                      | `lists:map/2`     | List                    |
| Filter               | `Enum.filter/2`                   | `lists:filter/2`  | List                    |
| Accumulate           | `Enum.reduce/3`                   | `lists:foldl/3`   | Accumulator             |
| Iterate side effects | `Enum.each/2`                     | `lists:foreach/2` | `:ok` / `ok` convention |
| Any?                 | `Enum.any?/2`                     | `lists:any/2`     | Boolean                 |
| All?                 | `Enum.all?/2`                     | `lists:all/2`     | Boolean                 |
| Sort                 | `Enum.sort/1,2`, `Enum.sort_by/2` | `lists:sort/1,2`  | List                    |

**Design meaning:** `Enum` works with any Elixir enumerable, not only lists. Erlang’s `lists` works with lists. That difference matters when Elixir code processes ranges, maps, streams, `MapSet`s, and custom enumerable types.

**Common Pitfalls:** `Enum` is eager. A pipeline of several `Enum.map` and `Enum.filter` calls may allocate intermediate collections. Use `Stream`, `reduce`, or a single comprehension when that cost matters.

### Task Pattern: Use `Stream` — lazy transformations and delayed execution

Elixir’s `Stream` builds lazy transformations that run when consumed.

```elixir
stream =
  users
  |> Stream.map(&normalize_user/1)
  |> Stream.filter(&active?/1)

Enum.take(stream, 10)
```

| Use `Stream` when                   | Avoid `Stream` when                    |
| ----------------------------------- | -------------------------------------- |
| Input is large                      | Data is small and clarity matters      |
| Early termination matters           | Full result is immediately needed      |
| Intermediate collections are costly | Debugging timing matters               |
| Infinite sequence is useful         | Side effects should happen immediately |
| File or network data is streamed    | Data must be materialized anyway       |

**Design meaning:** Laziness changes when errors and side effects occur. A `Stream.map` does not execute until the stream is enumerated.

Example of delayed effect:

```elixir
stream =
  Stream.map([1, 2, 3], fn n ->
    IO.inspect(n)
    n * 2
  end)

# Nothing printed yet.

Enum.to_list(stream)
```

**Common Pitfalls:** Do not put important side effects in streams unless delayed execution is intentional. This is a frequent source of confusing tests and debugging sessions.

### Task Pattern: Work with Maps, Keywords, and Proplists — associative data and options

Elixir has `Map` and `Keyword`. Erlang has `maps` and proplist conventions.

Elixir map:

```elixir
user = %{id: 1, name: "Ada"}
Map.fetch(user, :name)
Map.put(user, :email, "ada@example.com")
```

Erlang map:

```erlang
User = #{id => 1, name => <<"Ada">>},
maps:find(name, User),
User#{email => <<"ada@example.com">>}.
```

Elixir keyword list:

```elixir
opts = [timeout: 5_000, retries: 3]
Keyword.get(opts, :timeout)
```

Erlang proplist:

```erlang
Opts = [{timeout, 5000}, {retries, 3}],
proplists:get_value(timeout, Opts).
```

| Need                       | Prefer                      | Reason                              |
| -------------------------- | --------------------------- | ----------------------------------- |
| General key-value data     | Map                         | Unique keys and efficient lookup    |
| Function options in Elixir | Keyword list                | Conventional final argument syntax  |
| Legacy Erlang options      | Proplist                    | Common in Erlang APIs               |
| Ordered duplicate keys     | Keyword/proplist            | Maps cannot preserve duplicate keys |
| Required key match         | Map pattern                 | Express shape                       |
| Dynamic updates            | `Map.put`, `maps` functions | Clear add/update semantics          |
| Struct-like domain data    | Struct/record               | Stronger domain signal              |

**Design meaning:** Keyword lists are lists, not maps. They preserve order and allow duplicate keys. That is useful for options and DSLs but weak for general dictionaries.

**Common Pitfalls:** Do not use keyword lists for large random-access dictionaries. Lookups are linear.

### Task Pattern: Work with Text — `String`, `binary`, `unicode`, charlists, and iodata

Text handling is one of the most important Erlang/Elixir interop areas. Elixir strings are UTF-8 binaries. Erlang code may use binaries, charlists, or iodata depending on API and age.

Elixir:

```elixir
String.trim("  José  ")
String.downcase("HELLO")
String.length("José")
byte_size("José")
```

Erlang binary/string-related examples:

```erlang
string:trim(<<"  hello  ">>).
unicode:characters_to_binary("hello").
binary:split(<<"a,b,c">>, <<",">>, [global]).
```

| Task                 | Elixir                               | Erlang / OTP                           | Caveat                                 |
| -------------------- | ------------------------------------ | -------------------------------------- | -------------------------------------- |
| Trim/downcase/upcase | `String`                             | `string`                               | Representation expectations matter     |
| Byte operations      | binary pattern matching, `byte_size` | `binary` module, bit syntax            | Bytes are not graphemes                |
| Regex                | `Regex`                              | `re`                                   | Match return shapes differ             |
| Unicode conversion   | `String`, `:unicode`                 | `unicode`                              | Be explicit at boundaries              |
| Charlists            | `~c"text"`, `String.to_charlist/1`   | ordinary string literal often charlist | Interop with older APIs                |
| Iodata output        | lists/binaries                       | iolists                                | Efficient output without concatenation |
| Binary protocol      | bit syntax                           | bit syntax                             | Pattern matching can validate shape    |

**Design meaning:** A “string” is not a universal BEAM type. The runtime has binaries and lists; Elixir’s string convention is UTF-8 binary; Erlang conventions vary.

**Failure-first explanation:** The tempting wrong model is that `"abc"` means the same runtime thing in Erlang and Elixir. The surprising behavior is charlist/binary mismatch. The correct explanation is shared BEAM terms with different language literal conventions. The professional rule is: check whether an API expects binary, charlist, string, iodata, or chardata. The boundary changes when a library deliberately accepts multiple forms.

**Common Pitfalls:** Do not use `byte_size/1` as a user-facing character count. For UTF-8 text, byte count and text length are different questions.

### Task Pattern: Use Regex — `Regex` in Elixir and `re` in Erlang

Elixir provides `Regex` as the usual interface.

```elixir
regex = ~r/^\d+$/
Regex.match?(regex, "123")
Regex.run(~r/^user:(\d+)$/, "user:42")
```

Erlang uses the `re` module:

```erlang
re:run(<<"user:42">>, <<"^user:(\\d+)$">>, [{capture, all_but_first, binary}]).
```

| Task          | Elixir                                    | Erlang                              |
| ------------- | ----------------------------------------- | ----------------------------------- |
| Compile regex | `Regex.compile/1`                         | `re:compile/1`                      |
| Literal regex | `~r/.../`                                 | no equivalent literal in same style |
| Match boolean | `Regex.match?/2`                          | `re:run/2` and inspect result       |
| Capture       | `Regex.run/2,3`, `Regex.named_captures/2` | `re:run` options                    |
| Replace       | `Regex.replace/3`                         | `re:replace/3,4`                    |
| Split         | `Regex.split/2,3`                         | `re:split/2,3`                      |

**Design meaning:** Regex is useful for lexical text patterns, not full parsing of complex nested languages. For structured protocols, parsers or binary pattern matching may be better.

**Common Pitfalls:** Do not use regex as a replacement for validation logic when the domain has semantic rules beyond text shape.

### Task Pattern: Work with Binaries and Bitstrings — protocol parsing and byte-level operations

Both Erlang and Elixir have excellent binary pattern matching.

Elixir:

```elixir
def parse(<<version, type, length::16, payload::binary-size(length), rest::binary>>) do
  {:ok, %{version: version, type: type, payload: payload}, rest}
end

def parse(_) do
  {:error, :invalid_packet}
end
```

Erlang:

```erlang
parse(<<Version, Type, Length:16, Payload:Length/binary, Rest/binary>>) ->
    {ok, #{version => Version, type => Type, payload => Payload}, Rest};
parse(_) ->
    {error, invalid_packet}.
```

| Task                      | Tool                                              | Use                               |
| ------------------------- | ------------------------------------------------- | --------------------------------- |
| Parse fixed binary layout | Bit syntax                                        | Protocols, file formats           |
| Split binary              | `String.split` for text, `binary:split` for bytes | Choose text/byte semantics        |
| Match UTF-8               | `::utf8` / `/utf8` segments                       | Codepoint parsing                 |
| Build binary              | `<<...>>`                                         | Packet construction               |
| Efficient output          | iodata                                            | Avoid repeated concatenation      |
| Large binary handling     | runtime awareness                                 | Avoid sub-binary retention issues |

**Design meaning:** Binary syntax lets parsing and validation happen together. This is one of the most distinctive practical strengths of Erlang / Elixir.

**Common Pitfalls:** Do not treat all binaries as UTF-8 strings. Network packets, hashes, compressed data, and encrypted payloads are bytes, not text.

### Task Pattern: Work with Files and Paths — `File`, `Path`, `file`, and `filename`

Elixir provides `File` and `Path`. Erlang provides `file` and `filename`.

Elixir:

```elixir
File.read(path)
File.write(path, binary)
Path.join([base, "config", "app.json"])
File.stream!(path)
```

Erlang:

```erlang
file:read_file(Path).
file:write_file(Path, Binary).
filename:join([Base, "config", "app.json"]).
```

| Task            | Elixir                           | Erlang                       | Failure model              |
| --------------- | -------------------------------- | ---------------------------- | -------------------------- |
| Read whole file | `File.read/1`                    | `file:read_file/1`           | Tagged return              |
| Read and raise  | `File.read!/1`                   | direct match or custom       | Crash/exception            |
| Write file      | `File.write/2`                   | `file:write_file/2`          | Tagged return              |
| Stream file     | `File.stream!/1`                 | file APIs / custom streaming | Resource/lazy concern      |
| Path join       | `Path.join/1,2`                  | `filename:join/1,2`          | Avoid string concatenation |
| Temp files      | `Briefly` ecosystem or file APIs | file APIs                    | Cleanup discipline         |

Elixir example with expected failure:

```elixir
def load(path) do
  case File.read(path) do
    {:ok, binary} -> parse(binary)
    {:error, reason} -> {:error, {:read_failed, reason}}
  end
end
```

**Design meaning:** File systems are external resources. Reads, writes, permissions, encodings, and path validity are boundary issues.

**Common Pitfalls:** Do not use bang file functions in user-facing request paths unless crash is the deliberate boundary policy.

### Task Pattern: Work with Dates, Times, Durations, and Timeouts

Elixir has `Date`, `Time`, `DateTime`, `NaiveDateTime`, `Calendar`, and `System`. Erlang/OTP provides time functions through `erlang`, `calendar`, and related modules.

| Need                  | Elixir                            | Erlang / OTP                      | Rule                        |
| --------------------- | --------------------------------- | --------------------------------- | --------------------------- |
| Calendar date         | `Date`                            | `calendar`                        | Domain date                 |
| Time of day           | `Time`                            | `calendar`                        | Domain time                 |
| Date-time with zone   | `DateTime`                        | calendar/time APIs plus libraries | Be careful with time zones  |
| Naive date-time       | `NaiveDateTime`                   | tuple/calendar conventions        | No timezone                 |
| Monotonic duration    | `System.monotonic_time/1`         | `erlang:monotonic_time/1`         | Measure elapsed time        |
| System timestamp      | `System.system_time/1`            | `erlang:system_time/1`            | Wall-clock-ish              |
| Sleep current process | `Process.sleep/1`                 | `timer:sleep/1`                   | Blocks current process only |
| Timeout               | integer milliseconds in many APIs | integer milliseconds in many APIs | Document units              |

Elixir elapsed-time example:

```elixir
started = System.monotonic_time(:millisecond)
result = do_work()
elapsed = System.monotonic_time(:millisecond) - started
{result, elapsed}
```

Timer message:

```elixir
Process.send_after(self(), :tick, 1_000)
```

Erlang:

```erlang
erlang:send_after(1000, self(), tick).
```

**Design meaning:** Calendar time, monotonic duration, and process timeout are different concepts. Mixing them creates subtle bugs.

**Common Pitfalls:** Do not measure elapsed time with wall-clock time. Use monotonic time.

### Task Pattern: Serialize and Deserialize Data — internal terms, JSON, binary protocols, and trust

Serialization is a boundary decision. The BEAM can serialize terms directly, but that does not mean term serialization is appropriate for public or untrusted data.

| Serialization task                 | Tool category                                      | Use when                      |
| ---------------------------------- | -------------------------------------------------- | ----------------------------- |
| BEAM-internal trusted term storage | `:erlang.term_to_binary`, `:erlang.binary_to_term` | Trusted BEAM-only boundary    |
| JSON API                           | JSON ecosystem library such as Jason               | Public/web interoperability   |
| Binary protocol                    | Bit syntax and explicit encoder/decoder            | Compact protocol control      |
| Config format                      | JSON/TOML/YAML/etc. ecosystem                      | Human or deployment config    |
| Database representation            | Database driver/ORM layer                          | Durable queryable persistence |
| External event                     | Versioned map/JSON/binary schema                   | Long-lived compatibility      |
| Logging                            | Inspect/JSON/structured log encoding               | Human/observability boundary  |

Elixir term serialization:

```elixir
binary = :erlang.term_to_binary({:ok, %{id: 1}})
term = :erlang.binary_to_term(binary)
```

**Design meaning:** Erlang external term format preserves BEAM-specific terms better than JSON, but that is exactly why it is not a neutral public format. It may preserve atoms, tuples, and other terms that external systems do not understand.

**Common Pitfalls:** Do not decode untrusted external term binaries casually. Treat `binary_to_term` as a trust boundary.

### Task Pattern: Work with Configuration — `Application`, Mix config, runtime config, and environment parsing

Configuration appears at compile time, release time, runtime, and process startup. These are different boundaries.

Elixir examples:

```elixir
Application.fetch_env!(:my_app, :worker_timeout)
Application.get_env(:my_app, :optional_setting, :default)
```

Runtime environment parsing:

```elixir
def fetch_timeout! do
  "WORKER_TIMEOUT_MS"
  |> System.fetch_env!()
  |> parse_positive_integer!()
end
```

| Config task           | Elixir tool                     | Erlang / OTP equivalent idea | Boundary concern             |
| --------------------- | ------------------------------- | ---------------------------- | ---------------------------- |
| App env read          | `Application.get_env/fetch_env` | `application:get_env`        | Hidden global dependency     |
| Compile-time config   | config files / module attrs     | app env / macros             | May not change at runtime    |
| Runtime env           | `System.get_env/fetch_env`      | `os:getenv`                  | Strings need parsing         |
| Startup normalization | app `start/2` or config module  | application callback         | Fail early on invalid config |
| Per-process config    | init argument/state             | supervisor child args        | Owned by process             |
| Secret config         | env/secret store                | deployment-specific          | Avoid logging                |

**Design meaning:** Configuration is external input. Parse and validate it like external input, preferably near startup.

**Common Pitfalls:** Do not scatter `System.get_env` and `Application.get_env` throughout domain code. It creates hidden dependencies and inconsistent parsing.

### Task Pattern: Log and Inspect — `Logger`, `io`, `IO.inspect`, `dbg`, and structured metadata

Elixir’s `Logger` is the usual logging interface. Erlang/OTP has the `logger` facility. For local debugging, Elixir uses `IO.inspect/2` and `dbg`; Erlang often uses `io:format`.

Elixir:

```elixir
require Logger

Logger.info("user created", user_id: user.id)
IO.inspect(user, label: "user")
```

Erlang:

```erlang
logger:info("user created: ~p", [UserId]).
io:format("User: ~p~n", [User]).
```

| Task                  | Elixir                        | Erlang                                      | Use                |
| --------------------- | ----------------------------- | ------------------------------------------- | ------------------ |
| Application log       | `Logger`                      | `logger`                                    | Production logging |
| Local inspect         | `IO.inspect/2`                | `io:format("~p~n", [...])`                  | Debugging          |
| Pipeline debug        | `IO.inspect/2`, `dbg`         | intermediate `io:format`                    | Development        |
| Structured metadata   | Logger metadata               | logger metadata/report maps depending usage | Searchable logs    |
| Capture logs in tests | ExUnit capture helpers/config | Common Test/EUnit/log capture patterns      | Test isolation     |

**Design meaning:** Logging is an effect and a boundary. Logs persist, cross systems, and may expose sensitive data.

**Common Pitfalls:** Do not `inspect` entire structs or params in production logs if they may contain secrets, tokens, personal data, or huge payloads.

### Task Pattern: Test Code — ExUnit, EUnit, Common Test, and boundary-focused testing

Elixir’s standard testing framework is `ExUnit`, normally run through `mix test`. Erlang commonly uses EUnit for unit tests and Common Test for larger/system-style tests.

Elixir test:

```elixir
defmodule ParserTest do
  use ExUnit.Case

  test "parses valid status" do
    assert {:ok, :active} = Parser.parse_status("active")
  end
end
```

Erlang EUnit-style sketch:

```erlang
parse_status_test() ->
    ?assertEqual({ok, active}, parser:parse_status(<<"active">>)).
```

| Testing task            | Elixir                           | Erlang                                     | Good focus                              |
| ----------------------- | -------------------------------- | ------------------------------------------ | --------------------------------------- |
| Unit test pure function | ExUnit                           | EUnit                                      | Input/output shape                      |
| Boundary parser test    | ExUnit                           | EUnit/Common Test                          | Invalid input and error reasons         |
| OTP process test        | ExUnit with supervised processes | Common Test/EUnit with OTP helpers         | Calls, casts, crashes, restart behavior |
| Integration/system test | ExUnit + app supervision tools   | Common Test                                | Runtime interactions                    |
| Log capture             | ExUnit facilities                | logger/Common Test patterns                | Avoid noisy tests                       |
| Property test           | StreamData and ecosystem tools   | PropEr / QuickCheck-style tools            | Invariants                              |
| Mocking behaviour       | Mox and behaviour-based patterns | Meck or explicit modules depending context | Boundary contracts                      |

**Design meaning:** BEAM testing should not only test pure functions. It should test process APIs, supervision behavior, message protocols, timeouts, and failure boundaries when those are part of the design.

**Common Pitfalls:** Do not test `handle_call/3` directly as the primary test of a server’s public behavior. Test through the public process API unless callback details are the unit under test.

### Task Pattern: Document Code — ExDoc, EDoc, specs, generated docs, and examples

Documentation is part of API design. Elixir’s documentation ecosystem commonly uses ExDoc and HexDocs; Erlang has EDoc and module/spec documentation conventions. Hex documentation hosting is a central part of the shared package ecosystem. ([Hex][3])

Elixir:

```elixir
defmodule Email do
  @moduledoc """
  Validated email value.
  """

  @doc """
  Creates an email value from a string.
  """
  @spec new(String.t()) :: {:ok, t()} | {:error, :invalid_email}
  def new(value) do
    ...
  end
end
```

Erlang:

```erlang
%% Creates an email value from a binary.
-spec new_email(binary()) -> {ok, email()} | {error, invalid_email}.
new_email(Value) ->
    ...
```

| Documentation task | Elixir                           | Erlang                   | Purpose                    |
| ------------------ | -------------------------------- | ------------------------ | -------------------------- |
| Module docs        | `@moduledoc`                     | EDoc/module comments     | Responsibility             |
| Function docs      | `@doc`                           | EDoc comments            | Public API behavior        |
| Specs              | `@spec`                          | `-spec`                  | Contract for tools/readers |
| Types              | `@type`, `@opaque`               | `-type`, `-opaque`       | Data model                 |
| Examples           | doctests / docs examples         | EDoc examples where used | Usage clarity              |
| Hide internal docs | `@moduledoc false`, `@doc false` | convention               | Internal modules/functions |

**Design meaning:** In dynamic languages, docs and specs carry real API-contract weight. They should describe accepted shapes, return values, failure modes, side effects, and process behavior.

**Common Pitfalls:** Do not document only the happy path. For BEAM APIs, failure shape and process behavior are often more important than the success example.
### Task Pattern: Analyze Types and Contracts — Dialyzer, specs, behaviours, and Elixir type tooling

Specs are not only documentation. They can be consumed by static analysis tools, especially `Dialyzer`, and by editor tooling, documentation generators, and reviewers.

Erlang specs:

```erlang
-type user_id() :: pos_integer().
-spec fetch_user(user_id()) -> {ok, map()} | {error, not_found}.
```

Elixir specs:

```elixir
@type user_id :: pos_integer()

@spec fetch_user(user_id()) :: {:ok, map()} | {:error, :not_found}
def fetch_user(id) do
  ...
end
```

| Task                    | Erlang / OTP                        | Elixir layer                                | Purpose                     |
| ----------------------- | ----------------------------------- | ------------------------------------------- | --------------------------- |
| Function contract       | `-spec`                             | `@spec`                                     | Document input/output shape |
| Named type              | `-type`                             | `@type`                                     | Give domain name to shape   |
| Opaque type             | `-opaque`                           | `@opaque`                                   | Hide representation         |
| Callback contract       | `-callback`                         | `@callback`                                 | Define behaviour            |
| Callback implementation | behaviour callbacks                 | `@impl true`                                | Mark implementation         |
| Static analysis         | `dialyzer`                          | Dialyzer via Mix tools/ecosystem            | Detect discrepancies        |
| Runtime validation      | manual validation, patterns, guards | manual validation, changesets, constructors | Validate external data      |

Typical Elixir project workflow may include Dialyzer through project configuration and ecosystem tooling. The important conceptual point is not the exact tool command, but the role: **specs help analysis, but do not replace runtime validation.**

**Design meaning:** Specs are a contract layer. They help readers and tools understand the intended shape of a function, but they do not make Erlang / Elixir equivalent to Rust, OCaml, Haskell, Java, or TypeScript.

**Common Pitfalls:** Do not write specs only after the fact as decoration. A wrong spec is actively harmful because it lies to tools and readers. Keep specs synchronized with actual return shapes.

### Task Pattern: Debug Runtime Behavior — `dbg`, `IO.inspect`, tracing, Observer, and process introspection

Debugging BEAM systems often means inspecting **values**, **processes**, **mailboxes**, **supervision trees**, and **runtime behavior**, not only stepping through sequential code.

Elixir local debugging:

```elixir
value
|> normalize()
|> IO.inspect(label: "after normalize")
|> validate()
```

Elixir `dbg` style:

```elixir
user
|> normalize()
|> dbg()
|> validate()
```

Erlang local debugging:

```erlang
io:format("State: ~p~n", [State]).
```

| Debugging need           | Elixir / Erlang tool category      | What it reveals                    |
| ------------------------ | ---------------------------------- | ---------------------------------- |
| Inspect value            | `IO.inspect`, `io:format`          | Runtime term shape                 |
| Inspect pipeline stage   | `IO.inspect`, `dbg`                | Intermediate value                 |
| Inspect process identity | `self()`, PIDs                     | Current process                    |
| Inspect process info     | `Process.info/1`, `process_info/1` | Mailbox, memory, reductions, links |
| Inspect app supervision  | Observer / runtime tools           | Process tree and state             |
| Trace calls/messages     | tracing tools                      | Runtime execution behavior         |
| Inspect ETS              | `:ets.i`, ETS APIs                 | Table contents                     |
| Inspect logs             | `Logger`, `logger`                 | Runtime events                     |

Elixir process inspection:

```elixir
Process.info(pid, [:message_queue_len, :memory, :links])
```

Erlang:

```erlang
process_info(Pid, [message_queue_len, memory, links]).
```

**Design meaning:** BEAM debugging is process-aware. A slow or broken system may not have a single stack trace; it may have a growing mailbox, blocked server, crashed child, restarted supervisor, overloaded ETS table, or stuck external resource.

**Common Pitfalls:** Do not debug a `GenServer` only by inspecting its state. Also inspect mailbox length, call latency, linked processes, monitors, and whether callbacks block.

### Task Pattern: Profile and Measure — reductions, scheduler behavior, memory, and bottleneck location

Performance work in Erlang / Elixir starts with measurement. BEAM systems can bottleneck in places that ordinary sequential profiling misses: a single hot process, mailbox growth, binary memory retention, ETS contention, scheduler pressure, or a blocking NIF.

| Measurement target       | Why it matters                            |
| ------------------------ | ----------------------------------------- |
| Function runtime         | Find expensive code                       |
| Process memory           | Identify state growth or binary retention |
| Mailbox length           | Detect overload                           |
| Reductions               | Approximate process execution work        |
| Scheduler utilization    | Detect CPU pressure                       |
| ETS table size/access    | Detect shared table bottleneck            |
| Binary memory            | Detect large binary retention             |
| GC behavior              | Detect allocation pressure                |
| NIF/port latency         | Detect unsafe external boundary           |
| External service latency | Detect non-BEAM bottleneck                |

Elixir process info:

```elixir
Process.info(pid, [:reductions, :memory, :message_queue_len, :garbage_collection])
```

Erlang:

```erlang
process_info(Pid, [reductions, memory, message_queue_len, garbage_collection]).
```

**Design meaning:** In BEAM systems, “the program is slow” often means “one process is overloaded” or “messages accumulate faster than they are consumed.” This differs from profiling a single-threaded script or an object-oriented request handler.

**Common Pitfalls:** Do not optimize pure functions before checking whether the bottleneck is actually a server mailbox, database call, external HTTP call, ETS contention, or logging overhead.

### Task Pattern: Use Concurrency Libraries — raw primitives, OTP behaviours, `Task`, `Registry`, and beyond

Erlang / Elixir concurrency should be chosen by task shape.

| Need                      | Erlang / OTP                       | Elixir layer                      | Use when                           |
| ------------------------- | ---------------------------------- | --------------------------------- | ---------------------------------- |
| Start low-level process   | `spawn`, `spawn_link`              | `spawn`, `spawn_link`             | Learning or custom primitive       |
| Synchronous server        | `gen_server`                       | `GenServer`                       | Stateful server with request/reply |
| Supervision               | `supervisor`                       | `Supervisor`, `DynamicSupervisor` | Fault/lifecycle management         |
| Temporary concurrent work | process + monitor                  | `Task`, `Task.Supervisor`         | Work has result/lifecycle          |
| Simple state wrapper      | process/agent pattern              | `Agent`                           | Very simple state process          |
| Process lookup            | `global`, registries, ETS patterns | `Registry`                        | Dynamic process names              |
| Shared mutable table      | `ets`                              | `:ets`                            | Large/shared lookup                |
| Publish/subscribe         | libraries / framework tools        | Phoenix.PubSub or other ecosystem | Broadcast events                   |
| Job queues                | libraries                          | Oban/Broadway-style ecosystem     | Persistent/retriable jobs          |
| Flow processing           | custom processes/libraries         | Broadway/Flow-like ecosystem      | Demand/backpressure processing     |

**Design meaning:** `spawn`, `Task`, `GenServer`, `Agent`, and `Supervisor` are not variants of the same idea. They model different relationships between caller, state, result, lifecycle, and failure.

**Common Pitfalls:** Do not use raw `spawn` for important production processes unless they are linked, monitored, supervised, or intentionally fire-and-forget. Orphaned processes and silent crashes are difficult to operate.

### Task Pattern: Use `Registry` and Process Discovery — names without dynamic atoms

Elixir’s `Registry` is commonly used for dynamic process lookup. It avoids the common mistake of registering unbounded dynamic atom names.

```elixir
children = [
  {Registry, keys: :unique, name: MyApp.Registry}
]
```

Start process with registry name:

```elixir
GenServer.start_link(
  MyWorker,
  arg,
  name: {:via, Registry, {MyApp.Registry, worker_id}}
)
```

Call process:

```elixir
GenServer.call({:via, Registry, {MyApp.Registry, worker_id}}, :get)
```

| Need                              | Better choice                             |
| --------------------------------- | ----------------------------------------- |
| One known singleton process       | Local atom/module name                    |
| Many dynamic process names        | `Registry`                                |
| Cross-node process discovery      | Distributed registry/cluster-aware design |
| Lookup by ID with data only       | Map/ETS/database                          |
| Process group membership          | Registry or PubSub-like system            |
| Runtime workers under supervision | Registry + DynamicSupervisor              |

**Design meaning:** Process discovery is not data storage. A registry finds live processes. It does not replace a database, ETS table, or durable index.

**Common Pitfalls:** Do not use atoms for dynamic process names such as user IDs, room IDs, or job IDs. Use a registry key.

### Task Pattern: Use ETS — shared runtime storage, not a database replacement

ETS is a powerful runtime storage facility. Elixir normally accesses it through Erlang’s `:ets` module.

```elixir
table = :ets.new(:cache, [:set, :protected, read_concurrency: true])
:ets.insert(table, {:user_count, 10})
:ets.lookup(table, :user_count)
```

Erlang:

```erlang
Table = ets:new(cache, [set, protected, {read_concurrency, true}]),
ets:insert(Table, {user_count, 10}),
ets:lookup(Table, user_count).
```

| ETS table type  | Use                                           |
| --------------- | --------------------------------------------- |
| `set`           | One object per key                            |
| `ordered_set`   | Ordered keys                                  |
| `bag`           | Multiple objects per key, no duplicate object |
| `duplicate_bag` | Multiple duplicate objects per key            |
| `private`       | Owner only                                    |
| `protected`     | Owner writes, others read                     |
| `public`        | Any process can read/write                    |
| named table     | Lookup by atom name                           |
| anonymous table | Table identifier passed around                |

**Design meaning:** ETS changes the usual process-state model. It introduces shared mutable VM storage with its own ownership and access rules.

**Common Pitfalls:** Do not choose ETS just because it is fast. First define table owner, access mode, schema, cleanup, and consistency assumptions.

### Task Pattern: Work with HTTP and Web — low-level OTP, clients, Plug, Phoenix, and server stack

HTTP is mostly ecosystem territory in Elixir, not core language syntax. Erlang/OTP has lower-level networking tools; Elixir web work commonly uses Plug/Phoenix and HTTP client libraries.

| Task             | Low-level / Erlang        | Elixir ecosystem                     | Use when                          |
| ---------------- | ------------------------- | ------------------------------------ | --------------------------------- |
| TCP socket       | `gen_tcp`                 | direct `:gen_tcp`                    | Protocol-level networking         |
| TLS socket       | `ssl`                     | direct `:ssl` / libraries            | Secure transport                  |
| HTTP server      | Cowboy/Bandit ecosystem   | Phoenix/Plug stack                   | Web applications                  |
| HTTP client      | `httpc`, `ssl`, `gen_tcp` | Req/Finch/Mint/Tesla-style libraries | External HTTP requests            |
| Request pipeline | N/A as core syntax        | Plug                                 | Composable request transformation |
| Real-time web    | WebSocket/server libs     | Phoenix Channels/LiveView            | Interactive web apps              |
| Routing          | Framework-level           | Phoenix Router / Plug.Router         | HTTP dispatch                     |

Phoenix and Plug are not core Elixir semantics. They are framework/ecosystem layers built on BEAM processes, functions, macros, and supervision.

Plug-like conceptual shape:

```elixir
conn
|> authenticate()
|> load_user()
|> respond()
```

Phoenix-style router/controller code is macro-backed DSL code, not a new runtime outside BEAM.

**Design meaning:** Web programming in Elixir is powerful because it combines BEAM concurrency with framework abstractions. But `conn`, routes, controllers, sockets, and LiveView callbacks are framework boundary objects.

**Common Pitfalls:** Do not assume a Phoenix route, Ecto schema, or LiveView callback is plain language syntax. Identify which module’s macros and behaviours define the contract.

### Task Pattern: Work with Databases — Ecto ecosystem, drivers, pooling, and boundary normalization

Database work in Elixir is commonly done through Ecto and database drivers, but this is ecosystem-level, not core language. Erlang projects may use database-specific libraries directly.

| Database task      | Elixir ecosystem             | Boundary concern                      |
| ------------------ | ---------------------------- | ------------------------------------- |
| Schema mapping     | Ecto schema                  | Persistence shape versus domain shape |
| Validation/casting | Ecto changeset               | External input normalization          |
| Query construction | Ecto query DSL               | Macro-generated query representation  |
| Transaction        | Repo transaction APIs        | Error/rollback semantics              |
| Connection pooling | DBConnection-based libraries | Checkout failure, timeout             |
| Raw SQL            | adapter APIs                 | Injection and result shape            |
| Migration          | Ecto migrations              | Compatibility and data evolution      |

Conceptual Elixir example:

```elixir
def create_user(params) do
  params
  |> User.changeset()
  |> Repo.insert()
end
```

**Design meaning:** Ecto changesets are a validation/casting abstraction, not the Elixir type system. Ecto schemas are persistence representations, not automatically pure domain models.

**Common Pitfalls:** Do not let raw database errors, changeset internals, or nullable persistence details leak through every layer of the application. Normalize at boundary modules.

### Task Pattern: Use JSON and External Data Libraries — decoding is not validation

JSON support is usually provided by ecosystem libraries such as Jason. The modeling rule from Part 3 remains: decoding turns bytes into generic terms; it does not validate the domain.

Typical Elixir flow:

```elixir
with {:ok, data} <- Jason.decode(binary),
     {:ok, command} <- CreateUser.new(data) do
  {:ok, command}
end
```

| Step                   | Meaning                                 |
| ---------------------- | --------------------------------------- |
| Read bytes             | File/socket/HTTP body boundary          |
| Decode JSON            | Syntax to generic maps/lists/scalars    |
| Validate schema        | Required fields/types                   |
| Normalize              | Convert strings to internal atoms/types |
| Construct domain value | Struct/command/event                    |
| Act                    | Save/send/process                       |

**Design meaning:** JSON maps often use string keys. Internal Elixir code often uses atom keys or structs. The conversion boundary must be explicit.

**Common Pitfalls:** Do not atomize arbitrary JSON keys. Do not pass decoded JSON maps deep into business logic as if they were validated domain values.

### Task Pattern: Use Cryptography and Randomness — Erlang `:crypto`, secure boundaries, and binary data

Elixir commonly calls Erlang’s `:crypto` module directly.

```elixir
hash = :crypto.hash(:sha256, "hello")
bytes = :crypto.strong_rand_bytes(32)
```

| Task                | Tool category                        | Boundary concern                   |
| ------------------- | ------------------------------------ | ---------------------------------- |
| Hashing             | `:crypto.hash`                       | Binary input/output                |
| Secure random bytes | `:crypto.strong_rand_bytes`          | Token generation                   |
| HMAC/signature      | `:crypto.mac` or appropriate library | Algorithm and key handling         |
| Password hashing    | dedicated password hashing library   | Do not use plain SHA for passwords |
| Encoding            | `Base` in Elixir                     | Text representation of binary      |
| Token comparison    | constant-time compare where needed   | Timing leaks                       |
| Key storage         | secret management                    | Avoid logs/inspect                 |

Elixir base encoding:

```elixir
token =
  32
  |> :crypto.strong_rand_bytes()
  |> Base.url_encode64(padding: false)
```

**Design meaning:** Crypto APIs are byte-oriented and security-sensitive. Algorithm choice, key handling, encoding, and comparison behavior matter.

**Common Pitfalls:** Do not use general-purpose hashes such as SHA-256 as password hashing. Passwords need dedicated slow password-hashing algorithms through appropriate libraries.

### Task Pattern: Work with Base Encoding and Binary/Text Boundaries

Elixir provides `Base` for encoding binary data as text.

```elixir
Base.encode64(<<1, 2, 3>>)
Base.decode64("AQID")
Base.url_encode64(:crypto.strong_rand_bytes(32), padding: false)
```

| Encoding        | Use                                    |
| --------------- | -------------------------------------- |
| Base64          | General binary-to-text                 |
| URL-safe Base64 | Tokens in URLs                         |
| Hex             | Debugging, hashes, compact readability |
| Raw binary      | Internal protocols/storage             |
| UTF-8 string    | Human text                             |
| Iodata          | Efficient output chunks                |

**Design meaning:** Encoding is representation conversion. A hash, token, or encrypted payload is binary; Base64 or hex is a text representation of that binary.

**Common Pitfalls:** Do not treat encoded text as adding security. Encoding is not encryption.

### Task Pattern: Work with System Commands and OS Environment — `System`, ports, and safety

Elixir’s `System` module and Erlang’s OS/port facilities interact with the external operating system.

Elixir:

```elixir
System.get_env("HOME")
System.cmd("echo", ["hello"])
```

Erlang:

```erlang
os:getenv("HOME").
```

| Task                   | Elixir                     | Erlang           | Boundary concern             |
| ---------------------- | -------------------------- | ---------------- | ---------------------------- |
| Environment variable   | `System.get_env/fetch_env` | `os:getenv`      | Strings need parsing         |
| Run command            | `System.cmd`               | ports / `os:cmd` | Validate executable and args |
| Current working dir    | `File.cwd`                 | `file:get_cwd`   | Runtime environment          |
| Halt VM                | `System.halt`              | `erlang:halt`    | Severe lifecycle action      |
| OS process integration | ports                      | ports            | Protocol and supervision     |

**Design meaning:** OS interaction is an external boundary. It can fail for permissions, environment differences, missing executables, injection risks, and deployment-specific behavior.

**Common Pitfalls:** Avoid shell-string construction with untrusted input. Prefer argument lists and explicit executable paths.

### Task Pattern: Work with Supervision and Application Tools — `Application`, `Supervisor`, releases, and runtime config

Application lifecycle is part of the standard BEAM ecosystem.

| Task                       | Elixir                             | Erlang / OTP                 | Meaning                  |
| -------------------------- | ---------------------------------- | ---------------------------- | ------------------------ |
| Start app children         | `Application` callback             | `application` behaviour      | Runtime startup          |
| Supervise fixed children   | `Supervisor`                       | `supervisor`                 | Static process tree      |
| Supervise dynamic children | `DynamicSupervisor`                | dynamic supervisor patterns  | Runtime child population |
| App config                 | `Application.get_env`              | `application:get_env`        | OTP app environment      |
| Build release              | `mix release`                      | OTP release tooling / Rebar3 | Deployable artifact      |
| Runtime shell              | `iex -S mix`, release remote shell | `erl`, release shell         | Operational inspection   |
| Stop app                   | application APIs                   | application APIs             | Controlled lifecycle     |

**Design meaning:** OTP applications and releases are deployment/runtime units. They are not merely code folders.

**Common Pitfalls:** Do not start important long-lived processes outside supervision. If a process matters, it belongs in a supervision tree.

### Task Pattern: Build Releases and Deploy — runtime artifact, configuration, and operational shell

A release packages a BEAM system for deployment. Elixir’s `mix release` is the common Elixir workflow; Erlang has OTP release tooling and Rebar3 release workflows.

| Release concern       | Why it matters                             |
| --------------------- | ------------------------------------------ |
| Included applications | Required OTP apps must be present          |
| Runtime config        | Config must be available after compilation |
| Secrets               | Must not be baked into source accidentally |
| OS target             | Native dependencies may differ             |
| Remote shell          | Operational introspection                  |
| Start/stop commands   | Deployment lifecycle                       |
| Upgrades              | Release management strategy                |
| Logs                  | Runtime observability                      |
| Clustering            | Node names/cookies/config                  |

**Design meaning:** A release is where source-code assumptions meet operations. Configuration, NIFs, ports, environment variables, node names, and external dependencies become concrete.

**Common Pitfalls:** Code that works in `iex -S mix` may fail in a release if it assumes source paths, dev-only dependencies, compile-time config, or local environment variables.

### Task Pattern: Use Documentation Sites and Source Reading — HexDocs, Erlang docs, and source code

Professional BEAM work often requires reading both Elixir and Erlang documentation.

| Need                    | Where to look                         |
| ----------------------- | ------------------------------------- |
| Elixir standard modules | Elixir docs / HexDocs                 |
| Erlang/OTP modules      | Erlang official docs                  |
| Hex package docs        | HexDocs                               |
| Source behavior         | GitHub/source repository              |
| Callback contracts      | Behaviour docs                        |
| Macro behavior          | `__using__`, docs, generated examples |
| OTP return tuples       | Official Erlang/Elixir docs           |
| Runtime flags           | Erlang/OTP docs                       |
| Version compatibility   | Package docs and changelogs           |

**Design meaning:** Elixir developers must be able to read Erlang module docs because Elixir often calls Erlang modules directly: `:ets`, `:gen_tcp`, `:crypto`, `:timer`, `:persistent_term`, `:erlang`, `:queue`, and many OTP behaviours.

**Common Pitfalls:** Do not assume that an Elixir wrapper exists or is preferable. Sometimes the correct Elixir code is a direct Erlang module call with clear data conversion.

### Task Pattern: Choose a Library — stability, maintenance, OTP behavior, and boundary risk

Library choice in the BEAM ecosystem should consider more than stars or convenience.

| Evaluation question                       | Why it matters             |
| ----------------------------------------- | -------------------------- |
| Is it actively maintained?                | Security and compatibility |
| Does it use NIFs?                         | Deployment and VM risk     |
| Does it start OTP applications?           | Supervision/runtime impact |
| Does it define macros?                    | Compile-time coupling      |
| Does it expose telemetry?                 | Observability              |
| Does it handle backpressure?              | Production load            |
| Does it normalize errors?                 | Caller API stability       |
| Does it support your OTP/Elixir versions? | Compatibility              |
| Does it hide important process behavior?  | Debuggability              |
| Is the API stable?                        | Upgrade safety             |
| Does it have docs/specs/tests?            | Maintenance confidence     |

**Design meaning:** A BEAM dependency can affect compile time, runtime supervision, application startup, native code loading, telemetry, logging, and release packaging.

**Common Pitfalls:** Do not add a library for a small task if the standard library already handles it clearly. Conversely, do not hand-roll complex security, database, HTTP, or protocol features where mature libraries are appropriate.

### Task Pattern: Separate Core, OTP, and Framework Knowledge

A strong Erlang / Elixir learner should classify tools by layer.

| Layer                 | Examples                                                                                  | Stability                     |
| --------------------- | ----------------------------------------------------------------------------------------- | ----------------------------- |
| BEAM runtime          | processes, PIDs, refs, mailboxes, ETS, schedulers                                         | Deep foundation               |
| Erlang/OTP core       | `gen_server`, `supervisor`, `application`, `logger`, `ets`, `gen_tcp`                     | Very stable                   |
| Elixir core           | `Enum`, `Stream`, `Task`, `Agent`, `GenServer`, `Supervisor`, `Registry`, `Mix`, `ExUnit` | Stable but evolving           |
| Package ecosystem     | Hex packages                                                                              | Varies                        |
| Web framework         | Phoenix, Plug, Ecto, LiveView                                                             | Strong but framework-specific |
| Operational ecosystem | releases, telemetry, OpenTelemetry, deployment tools                                      | Environment-dependent         |
| Project convention    | folder layout, naming, config style                                                       | Team/project-specific         |

**Design meaning:** Not every thing commonly seen in Elixir code is part of Elixir itself. Some things are BEAM, some are Erlang/OTP, some are Elixir standard library, some are Hex packages, and some are framework DSLs.

**Common Pitfalls:** Treating Phoenix/Ecto conventions as language semantics causes confusion when reading non-web Elixir or Erlang code.

### Task Pattern: Build a Practical Standard-Library Learning Path

For a combined Erlang / Elixir learner, library study should follow the runtime structure.

| Stage | Learn                                                                   | Why                             |
| ----- | ----------------------------------------------------------------------- | ------------------------------- |
| 1     | `Enum`, `Map`, `String`, pattern matching, tagged tuples                | Basic Elixir fluency            |
| 2     | Erlang terms and direct calls: `:erlang`, `:timer`, `:crypto`, `:queue` | Interop and runtime familiarity |
| 3     | `Task`, `Agent`, `GenServer`, `Supervisor`, `Registry`                  | Modern Elixir concurrency layer |
| 4     | Erlang OTP modules: `gen_server`, `supervisor`, `application`, `ets`    | Native foundation               |
| 5     | Files, binaries, regex, JSON, serialization                             | Boundary work                   |
| 6     | ExUnit, logging, docs, Mix, Hex                                         | Professional workflow           |
| 7     | ETS, process inspection, tracing, releases                              | Production awareness            |
| 8     | Phoenix/Ecto/Plug or domain-specific ecosystem                          | Application specialization      |

**Design meaning:** Learn Elixir’s ergonomic surface, but repeatedly map it back to BEAM and Erlang/OTP. This prevents the common mistake of learning framework syntax without understanding runtime behavior.

### Task Pattern: Standard Library Decision Table

| Task                  | First tool to consider      | Alternative / lower-level tool        |
| --------------------- | --------------------------- | ------------------------------------- |
| Transform collection  | `Enum`                      | `lists`, recursion                    |
| Lazy transformation   | `Stream`                    | custom producer/process               |
| Key-value data        | `Map`                       | `maps`, ETS                           |
| Options               | `Keyword`                   | proplist                              |
| Set membership        | `MapSet`                    | `sets`, maps                          |
| FIFO queue            | `:queue`                    | process queue / external queue        |
| UTF-8 text            | `String`                    | `unicode`, `binary`                   |
| Byte protocol         | bit syntax                  | `binary` module                       |
| Regex                 | `Regex`                     | `re`                                  |
| File read/write       | `File`                      | `file`                                |
| Path handling         | `Path`                      | `filename`                            |
| Sleep current process | `Process.sleep`             | `:timer.sleep`                        |
| Send timer message    | `Process.send_after`        | `:erlang.send_after`                  |
| Measure duration      | `System.monotonic_time`     | `:erlang.monotonic_time`              |
| Secure random bytes   | `:crypto.strong_rand_bytes` | crypto library wrapper                |
| Hash                  | `:crypto.hash`              | dedicated crypto library where needed |
| JSON                  | Jason-style ecosystem       | custom decoder only if justified      |
| Start temporary work  | `Task`                      | `spawn` + monitor                     |
| Stateful server       | `GenServer`                 | raw receive loop                      |
| Supervise processes   | `Supervisor`                | Erlang `supervisor`                   |
| Dynamic children      | `DynamicSupervisor`         | custom supervisor pattern             |
| Dynamic names         | `Registry`                  | ETS/global/other registry             |
| Testing               | ExUnit                      | EUnit/Common Test                     |
| Build project         | Mix                         | Rebar3                                |
| Package dependency    | Hex                         | Git/path deps                         |
| Document package      | ExDoc/HexDocs               | EDoc                                  |
| Runtime shared table  | ETS                         | process state/database                |

### Core Ecosystem Anti-Pattern Index

| Anti-pattern                                   | Why it fails                   | Better choice                                               |
| ---------------------------------------------- | ------------------------------ | ----------------------------------------------------------- |
| Use `Enum` for huge pipelines by habit         | Eager intermediates            | `Stream`, `reduce`, comprehension, or better data structure |
| Use list as queue                              | Repeated append cost           | `:queue`                                                    |
| Use keyword list as dictionary                 | Linear lookup/duplicate keys   | Map                                                         |
| Use map for every domain object                | Weak shape                     | Struct/record/opaque type                                   |
| Use ETS as global dumping ground               | Hidden mutable state           | Owner module/API                                            |
| Use `cast` as fast write                       | No confirmation/backpressure   | `call`, ack, queue, demand protocol                         |
| Use raw `spawn` for important process          | Unsupervised failure           | `Task`, `Task.Supervisor`, supervisor                       |
| Use `String.to_atom` for JSON                  | Atom table risk                | Explicit mapping                                            |
| Use `binary_to_term` on public input           | Unsafe deserialization         | JSON/versioned schema/safe format                           |
| Use `IO.inspect` in production                 | Log noise/secrets              | `Logger` with structured metadata                           |
| Use framework DSL without knowing macro source | Hidden behavior                | Read `use` and docs                                         |
| Add dependency for trivial helper              | Extra maintenance/runtime risk | Standard library                                            |
| Hand-roll crypto/password hashing              | Security risk                  | Dedicated mature libraries                                  |
| Assume `iex -S mix` equals release             | Environment mismatch           | Test release/runtime config                                 |
| Treat Ecto/Phoenix as language                 | Concept confusion              | Separate framework from core Elixir/BEAM                    |

### Part 6 Summary — library fluency means boundary-aware tool choice

Part 6 should be read as a map of practical choices, not as a memorization list.

Elixir gives the modern ergonomic layer: `Mix`, `ExUnit`, `Enum`, `Stream`, `String`, `File`, `Path`, `Logger`, `Task`, `Agent`, `GenServer`, `Supervisor`, `Registry`, and documentation tooling.

Erlang/OTP gives the deep runtime and infrastructure layer: `ets`, `gen_server`, `supervisor`, `application`, `gen_tcp`, `ssl`, `crypto`, `timer`, `queue`, `logger`, `file`, `binary`, `re`, and the VM-level `erlang` module.

The ecosystem adds powerful framework and domain layers: Hex packages, Phoenix, Plug, Ecto, telemetry tooling, job queues, HTTP clients, database drivers, JSON libraries, and release/deployment tools.

The professional rule is:

```text
Choose the tool by task shape:
data transformation,
text processing,
binary parsing,
external boundary,
process lifecycle,
supervision,
shared storage,
testing,
documentation,
deployment,
or framework integration.
```

The mistake to avoid is treating every library as just a convenience wrapper. In Erlang / Elixir, many libraries encode assumptions about **process ownership**, **failure**, **runtime lifecycle**, **evaluation timing**, **trust boundaries**, and **operational behavior**.
## PART 7 — BEAM Runtime, Process Semantics, Memory, Scheduling, and Cost Model

### Part Scope — runtime behavior behind Erlang / Elixir source code

Part 7 explains the runtime layer that makes Erlang / Elixir different from ordinary functional scripting languages. Syntax, data, modules, and OTP abstractions all ultimately run on the **BEAM virtual machine**. A professional Erlang / Elixir programmer needs enough BEAM knowledge to reason about concurrency, latency, memory, crashes, mailboxes, binaries, ETS, NIFs, distribution, and performance.

This part is not a VM implementation manual. It is a **runtime cost and behavior reference** for writing better Erlang / Elixir systems.

The main rule is:

```text
Erlang / Elixir code should be read not only as functions over values,
but also as processes scheduled by BEAM, communicating through mailboxes,
owning heaps, copying or sharing data according to runtime rules,
and failing inside a supervision architecture.
```

| Runtime topic      | Why it matters                                                           |
| ------------------ | ------------------------------------------------------------------------ |
| BEAM process       | Basic unit of concurrency, isolation, scheduling, and failure            |
| Scheduler          | Determines how many runnable processes share CPU time                    |
| Reductions         | Approximate execution budget used for preemption                         |
| Mailbox            | Message queue, selective receive, overload risk                          |
| Per-process heap   | Most process data is isolated                                            |
| Garbage collection | Usually per-process, affecting latency and memory                        |
| Message passing    | Copies most data between process heaps, with important binary exceptions |
| Binaries           | Large binaries can be reference-counted and shared                       |
| ETS                | Shared mutable VM table outside ordinary process heap                    |
| NIFs               | Native code can bypass BEAM safety assumptions                           |
| Ports              | External OS process communication boundary                               |
| Distribution       | BEAM node messaging across machines                                      |
| Supervision        | Runtime failure containment and restart architecture                     |

### Runtime Mental Model — processes first, threads second, objects never

The central runtime abstraction is the **BEAM process**. A BEAM process is not an operating-system process. It is not a thread in the ordinary shared-memory sense. It is not an object. It is a lightweight runtime entity with its own identity, heap, stack, mailbox, links, monitors, and execution state.

| Concept    | BEAM meaning                             | Not the same as             |
| ---------- | ---------------------------------------- | --------------------------- |
| Process    | Lightweight VM-managed concurrent entity | OS process                  |
| PID        | Runtime process identifier               | Persistent domain ID        |
| Mailbox    | Queue of messages sent to process        | Go channel                  |
| Heap       | Process-local memory area                | Global shared heap          |
| Scheduler  | Runtime executor for BEAM processes      | One process per OS thread   |
| Reduction  | Approximate unit of BEAM execution work  | Exact CPU instruction count |
| Link       | Failure-propagation relation             | Function call               |
| Monitor    | One-way process death observation        | Subscription to all events  |
| Exit       | Process termination signal               | Ordinary return value       |
| Supervisor | Process that restarts children by policy | Exception handler           |

A BEAM system should be imagined as many small isolated processes, each advancing in small scheduled steps, communicating through explicit messages, and being restarted or observed through OTP structures.

**Design meaning:** The runtime encourages a design style where **state is owned**, **messages are explicit**, **failures are local**, and **long-running services are supervised**.

**Common Pitfalls:** Do not think of a `GenServer` as an object with methods. A `GenServer` is a process with a mailbox, callback loop, state value, failure semantics, and scheduling behavior.

### BEAM Process Anatomy — PID, heap, stack, mailbox, dictionary, links, monitors

A BEAM process has several important runtime components.

| Component              | Meaning                              | Why it matters                                          |
| ---------------------- | ------------------------------------ | ------------------------------------------------------- |
| PID                    | Process identifier                   | Used for sending messages, linking, monitoring          |
| Heap                   | Process-local memory                 | Most values live here; GC is usually local              |
| Stack                  | Call frames and execution state      | Deep recursion and calls consume stack/heap space       |
| Mailbox                | Incoming message queue               | Overload and selective receive risk                     |
| Process dictionary     | Hidden process-local key-value store | Useful for framework metadata, risky for business state |
| Links                  | Bidirectional failure relationships  | Crashes can propagate                                   |
| Monitors               | One-way death observations           | Caller receives `DOWN` message                          |
| Trap exit flag         | Converts linked exits into messages  | Changes failure behavior                                |
| Registered name        | Optional lookup alias                | Name is not the process itself                          |
| Current function/state | Runtime execution location           | Useful in inspection/debugging                          |

Elixir inspection:

```elixir
Process.info(pid, [
  :current_function,
  :message_queue_len,
  :memory,
  :links,
  :monitors,
  :monitored_by,
  :dictionary
])
```

Erlang inspection:

```erlang
process_info(Pid, [
    current_function,
    message_queue_len,
    memory,
    links,
    monitors,
    monitored_by,
    dictionary
]).
```

**Design meaning:** A process is a runtime container for behavior and state. It is cheap enough to use liberally for concurrency and fault boundaries, but it is not free.

**Common Pitfalls:** A growing `message_queue_len` usually indicates a process is receiving messages faster than it can process them, is blocked, or is selectively receiving only some messages while leaving others behind.

### Process Creation Cost — cheap, not free

BEAM processes are lightweight compared with OS threads, but each process still has memory, scheduling, mailbox, and lifecycle cost.

Elixir:

```elixir
pid =
  spawn(fn ->
    do_work()
  end)
```

Erlang:

```erlang
Pid = spawn(fun() ->
    do_work()
end).
```

| Cost dimension     | What exists                                          |
| ------------------ | ---------------------------------------------------- |
| Initial heap       | Process starts with a small heap                     |
| Stack              | Process needs execution stack                        |
| Mailbox            | Process can receive messages                         |
| Scheduler metadata | Runtime must track it                                |
| Links/monitors     | Runtime relations may be stored                      |
| Garbage collection | Each process eventually collects its heap            |
| Supervision        | Supervised process adds lifecycle structure          |
| Registration       | Named process has lookup overhead and collision risk |

**Professional rule:** Use a process when there is a reason for **independent execution**, **state ownership**, **fault isolation**, **blocking/waiting**, **message protocol**, or **supervised lifecycle**.

Good reasons:

```text
connection handler
session process with real lifecycle
worker performing independent task
stateful cache server
supervised external resource owner
protocol parser with mailbox interaction
dynamic worker under DynamicSupervisor
```

Weak reasons:

```text
one process per passive database row
one process per tiny immutable value
one process only to avoid passing arguments
one process as mutable variable wrapper
one process for pure calculation with no concurrency benefit
```

**Failure-first explanation:** The tempting wrong model is “BEAM processes are cheap, so they are free.” The surprising failure is a system with too many idle processes, large retained state, many mailboxes, or expensive supervision churn. The correct explanation is that processes are cheap relative to OS threads, not free relative to plain data. The professional rule is: model behavior and lifecycle with processes; model passive facts with values.

### Scheduler Model — many BEAM processes over scheduler threads

BEAM runs many lightweight processes over a smaller number of scheduler threads. Each scheduler executes runnable BEAM processes, preempting them after they consume execution budget.

| Runtime concept       | Meaning                                                      |
| --------------------- | ------------------------------------------------------------ |
| Scheduler             | Runtime executor that runs BEAM processes                    |
| Runnable process      | Process ready to execute                                     |
| Waiting process       | Process blocked waiting for message, timer, I/O, etc.        |
| Preemption            | Runtime stops one process and runs another                   |
| Reduction budget      | Approximate execution budget before yielding                 |
| Run queue             | Queue of runnable processes for scheduler                    |
| Scheduler utilization | How busy schedulers are                                      |
| Dirty scheduler       | Special scheduler for certain blocking/CPU-heavy native work |

**Design meaning:** A BEAM process can block waiting for a message without blocking the whole VM. But a process that performs long CPU-heavy work can still consume scheduler time. Native blocking work can be worse if not isolated properly.

**Common Pitfalls:** “The BEAM handles concurrency” does not mean every CPU-bound algorithm is magically parallel or cheap. CPU-heavy code still competes for schedulers.

### Reductions — BEAM’s preemption budget

A **reduction** is an approximate unit of BEAM work. The VM uses reductions to decide when to preempt a process and let another process run.

This matters because BEAM is designed for responsiveness. Long-running processes should not monopolize a scheduler indefinitely under normal BEAM code.

| Concept           | Meaning                                                  |
| ----------------- | -------------------------------------------------------- |
| Reduction         | Approximate execution step budget                        |
| Preemption        | Process yields after using budget                        |
| Fairness          | Many processes get execution opportunities               |
| Latency           | Small processes can remain responsive                    |
| CPU-bound process | Still consumes many reductions                           |
| Native work       | May not behave like normal reductions if unsafe/blocking |

Inspect reductions:

```elixir
Process.info(pid, :reductions)
```

Erlang:

```erlang
process_info(Pid, reductions).
```

**Design meaning:** BEAM’s reduction-based scheduling supports soft real-time responsiveness. It is one reason many concurrent lightweight processes can coexist.

**Common Pitfalls:** Reductions are not exact CPU instructions or wall-clock time. They are a runtime scheduling metric, not a precise performance unit.

### Blocking Behavior — blocking one process versus blocking the VM

A key BEAM advantage is that many blocking operations block only the current process, not the entire VM. But not all blocking is equal.

| Operation                                     | Usually blocks                             | Runtime concern                    |
| --------------------------------------------- | ------------------------------------------ | ---------------------------------- |
| `receive` waiting for message                 | Current process                            | Normal                             |
| `GenServer.call` waiting for reply            | Caller process                             | Timeout needed                     |
| `Process.sleep`                               | Current process                            | Normal if intended                 |
| File/network I/O through BEAM-managed drivers | Current process / async runtime mechanisms | Usually acceptable                 |
| Long pure CPU computation                     | Scheduler time                             | May reduce responsiveness          |
| Long unsafe NIF                               | Scheduler or VM responsiveness             | Dangerous                          |
| External port communication                   | Port owner process / external process      | Protocol and lifecycle needed      |
| Slow `handle_call` callback                   | Server process                             | Blocks all requests to that server |

Example: sleeping a process is not globally blocking.

```elixir
spawn(fn ->
  Process.sleep(10_000)
  IO.puts("done")
end)
```

The spawned process sleeps; other BEAM processes continue.

But blocking a central server callback is different:

```elixir
@impl true
def handle_call(:slow, _from, state) do
  Process.sleep(10_000)
  {:reply, :ok, state}
end
```

That `GenServer` cannot handle other messages during the sleep.

**Design meaning:** In BEAM design, ask **which process is blocked**, not only “is this blocking?”

**Common Pitfalls:** A slow `handle_call` can look harmless because the VM remains responsive, while the server’s clients time out because that particular process is blocked.

### Mailboxes — message queues, ordering, selective receive, and overload

Every BEAM process has a mailbox. Sending a message appends a message to the target process’s mailbox.

Elixir:

```elixir
send(pid, {:work, payload})
```

Erlang:

```erlang
Pid ! {work, Payload}.
```

Basic receive:

```elixir
receive do
  {:work, payload} ->
    handle(payload)
end
```

Erlang:

```erlang
receive
    {work, Payload} ->
        handle(Payload)
end.
```

| Mailbox property          | Meaning                                                                           |
| ------------------------- | --------------------------------------------------------------------------------- |
| Per process               | Each process has its own mailbox                                                  |
| Asynchronous send         | Sender continues after send                                                       |
| Message order             | Messages from one sender to one receiver preserve order in ordinary local sending |
| Selective receive         | Receiver scans for matching messages                                              |
| Non-matching messages     | Stay in mailbox                                                                   |
| Unbounded risk            | Mailbox can grow if receiver is slow                                              |
| No automatic backpressure | Sending usually does not wait for processing                                      |
| Message shape             | Ordinary BEAM term                                                                |

**Design meaning:** Mailboxes are powerful because they decouple processes. They are dangerous because decoupling can hide overload.

**Failure-first explanation:** The tempting wrong model is “message passing solves concurrency.” The surprising failure is a process with a million queued messages and increasing latency. The correct explanation is that message passing avoids shared-memory races but does not automatically regulate demand. The professional rule is: design protocols with backpressure, timeouts, acknowledgments, bounded queues, or flow-control libraries where load matters.

**Common Pitfalls:** `GenServer.cast/2` is especially easy to overuse because it returns immediately. It can overload the receiver’s mailbox.

### Selective Receive — powerful protocol matching with hidden cost

Selective receive lets a process wait for a specific message shape while leaving other messages in the mailbox.

Elixir:

```elixir
receive do
  {:reply, ^ref, value} ->
    {:ok, value}
after
  5_000 ->
    {:error, :timeout}
end
```

Erlang:

```erlang
receive
    {reply, Ref, Value} ->
        {ok, Value}
after 5000 ->
    {error, timeout}
end.
```

If the mailbox contains many messages that do not match, the process may scan past them.

| Selective receive issue           | Runtime consequence                      |
| --------------------------------- | ---------------------------------------- |
| Many unmatched messages           | Receive may scan more messages           |
| Stale replies                     | Late messages can remain                 |
| Missing correlation ref           | Wrong reply may match                    |
| Broad catch-all                   | May consume unintended protocol messages |
| Multiple protocols in one process | Harder mailbox reasoning                 |
| Long mailbox                      | Latency and memory risk                  |

Good request-response pattern:

```elixir
ref = make_ref()
send(pid, {:request, self(), ref, payload})

receive do
  {:response, ^ref, result} ->
    {:ok, result}
after
  5_000 ->
    {:error, :timeout}
end
```

**Design meaning:** Selective receive is a low-level protocol tool. OTP abstractions such as `GenServer.call` implement common request-response behavior so ordinary application code does not constantly hand-roll it.

**Common Pitfalls:** A timeout does not remove a future late response. If a response arrives after timeout, it may sit in the mailbox unless handled.

### Message Passing Cost — copied terms, shared binaries, and process isolation

BEAM process heaps are isolated. When one process sends a message to another, most data is copied into the receiver’s heap. This preserves isolation and avoids shared mutable state.

However, large binaries have special behavior: large reference-counted binaries may be shared between processes, with smaller heap objects referring to them.

| Data kind            | Typical message behavior        | Design consequence                        |
| -------------------- | ------------------------------- | ----------------------------------------- |
| Small integers/atoms | Cheap                           | Fine for tags and IDs                     |
| Tuples/lists/maps    | Generally copied                | Large structures can be expensive to send |
| PIDs/refs            | Cheap handles                   | Good for protocol correlation             |
| Small binaries       | May be copied                   | Usually fine                              |
| Large binaries       | Often reference-counted/shared  | Efficient but can create retention issues |
| Functions/closures   | Terms with captured environment | Be careful with large captured data       |
| Structs              | Maps at runtime                 | Same copying concerns as maps             |

Example risk:

```elixir
large = File.read!("huge.bin")
send(pid, {:process, large})
```

This may avoid copying the entire large binary in the naive way, but it can also keep the large binary alive as long as references exist.

**Design meaning:** Process isolation has a cost model. Passing huge nested maps repeatedly between processes may be expensive. Passing large binaries has different memory-retention risks.

**Common Pitfalls:** Do not send large full state maps between processes repeatedly if only a small piece is needed. Send IDs, refs, or smaller payloads where possible.

### Large Binaries and Sub-Binary Retention — efficient sharing with memory traps

Large binaries are often stored outside ordinary process heaps and reference-counted. Slicing or pattern matching can create sub-binaries that reference the original large binary.

Example:

```elixir
<<header::binary-size(10), rest::binary>> = large_binary
```

If `rest` or `header` references the original binary, the original large binary may remain alive longer than expected.

| Binary behavior           | Why it matters                                |
| ------------------------- | --------------------------------------------- |
| Large binary sharing      | Avoids huge copies between processes          |
| Sub-binary references     | Can retain original binary                    |
| Long-lived process state  | May keep huge binary alive                    |
| Message passing           | Large binary ref may be shared                |
| Copying small needed part | Sometimes necessary to release large original |
| Protocol parsing          | Be aware of retained payloads                 |

For small extracted data that must live long-term, copying may be useful:

```elixir
field = binary_part(large_binary, 0, 10)
field = :binary.copy(field)
```

Use copying deliberately, not reflexively.

**Design meaning:** BEAM binary optimization improves performance but creates a memory-retention boundary. Long-lived processes should avoid accidentally holding references to huge binaries.

**Common Pitfalls:** A server that stores a tiny field extracted from a massive request binary may keep the massive binary alive if the field remains a sub-binary reference.

### Per-Process Garbage Collection — isolation, latency, and process-local memory

BEAM garbage collection is usually per-process. Since each process has its own heap, a process can collect its own memory without stopping all processes globally in the ordinary way many other runtimes might.

| GC property           | Design consequence                                     |
| --------------------- | ------------------------------------------------------ |
| Per-process heaps     | Small processes can GC independently                   |
| Short-lived processes | Memory is reclaimed when process exits                 |
| Long-lived processes  | Need attention to state growth                         |
| Message copying       | Receiver owns copied data                              |
| Large binaries        | Reference-counted and may outlive process heap details |
| Process-local GC      | Helps latency isolation                                |
| Huge process heap     | One process GC can still be expensive for that process |

This is one reason BEAM style often favors many processes with isolated state instead of one huge global mutable structure.

**Design meaning:** Process isolation and per-process GC support fault and latency isolation. But a single process with large state can still suffer from expensive GC and become a bottleneck.

**Common Pitfalls:** A long-lived `GenServer` accumulating a large map can become both a memory and latency problem. Consider ETS, sharding, process splitting, or different ownership.

### Process State Size — small state, large state, and bottleneck state

`GenServer` state is a normal BEAM value held by one process. That process serializes access to it.

Small state is fine:

```elixir
%{status: :ready, count: 42}
```

Large state may be problematic:

```elixir
%{
  users_by_id: huge_map,
  sessions_by_id: huge_map,
  logs: huge_list
}
```

| State design                   | Runtime implication                |
| ------------------------------ | ---------------------------------- |
| Small immutable state          | Simple and clear                   |
| Large map in one process       | Potential bottleneck and GC cost   |
| Frequently updated large state | Copy/update and GC pressure        |
| Read-heavy shared state        | ETS may be better                  |
| Partitionable state            | Shard across processes/tables      |
| Persistent durable state       | Database may be better             |
| Append-only history            | External log/storage may be better |

**Design meaning:** A process is a state owner, but not every amount of state should be placed behind one process.

**Common Pitfalls:** A single `GenServer` used as an application-wide database often becomes a bottleneck. BEAM makes state ownership easy; it does not make centralized state free.

### Copy-on-Update Semantics — immutable values and structural sharing

Erlang / Elixir values are immutable. Updating a map, list, tuple, or struct returns a new value.

Elixir:

```elixir
new_user = %{user | name: "Grace"}
```

Erlang:

```erlang
NewUser = User#{name := <<"Grace">>}.
```

The runtime can share structure internally where possible, but the semantic model is a new value.

| Structure     | Update intuition                                          |
| ------------- | --------------------------------------------------------- |
| List prepend  | Cheap; creates new cons cell                              |
| List append   | Copies left list spine                                    |
| Tuple update  | Creates updated tuple value                               |
| Map update    | Creates updated map value with internal sharing/structure |
| Struct update | Map update with struct constraints                        |
| Binary append | May allocate new binary depending context                 |
| ETS update    | Mutates table outside ordinary immutable value model      |

**Design meaning:** Immutability makes reasoning safer, but performance depends on data structure. Do not assume every update is constant-cost.

**Common Pitfalls:** Repeated `list ++ [item]` in a loop-like function is inefficient because it repeatedly copies the left list.

### Lists Runtime Cost — linked structure, prepend, append, length, and traversal

Lists are linked lists. They are excellent for recursive head-tail processing and poor for random access.

| Operation         | Cost intuition   | Comment                           |                        |
| ----------------- | ---------------- | --------------------------------- | ---------------------- |
| Prepend `[x       | xs]`             | Cheap                             | Preferred construction |
| Head/tail match   | Cheap            | Natural recursion                 |                        |
| Append `xs ++ ys` | Copies left list | Avoid repeated append             |                        |
| `length(xs)`      | Traverses list   | Not stored                        |                        |
| Random access     | Traversal        | Use other structures if frequent  |                        |
| Map/filter/reduce | Traversal        | Standard                          |                        |
| Reverse           | Traversal        | Common after prepend accumulation |                        |
| Membership        | Traversal        | Use set/map for repeated checks   |                        |

Good accumulation:

```elixir
def collect(items), do: collect(items, [])

defp collect([], acc), do: Enum.reverse(acc)
defp collect([h | t], acc), do: collect(t, [transform(h) | acc])
```

Bad repeated append:

```elixir
acc ++ [transform(item)]
```

**Design meaning:** Lists are sequence-processing structures, not arrays. Use them when traversal is the natural operation.

**Common Pitfalls:** Calling `length(list)` repeatedly inside recursion or loops can turn linear work into quadratic work.

### Maps Runtime Cost — key lookup, small maps, large maps, and update design

Maps are general key-value structures. They are appropriate for domain structs, dictionaries, and lookup tables, but cost depends on size and access pattern.

| Map use                              | Good fit?        | Reason                                      |
| ------------------------------------ | ---------------- | ------------------------------------------- |
| Small fixed domain shape             | Yes              | Struct/map pattern matching                 |
| Medium key-value data                | Yes              | Good lookup/update ergonomics               |
| Huge read-heavy shared table         | Maybe not        | ETS may be better                           |
| Frequently updated centralized state | Maybe not        | Single-process bottleneck                   |
| Public external JSON                 | As decoded shape | Validate/normalize first                    |
| Dynamic dictionary                   | Yes              | Better than keyword list                    |
| Ordered data                         | No               | Use list/ordered structure if order matters |

Elixir:

```elixir
Map.fetch(map, key)
Map.put(map, key, value)
```

Erlang:

```erlang
maps:find(Key, Map).
Map#{Key => Value}.
```

**Design meaning:** Maps are extremely useful, but a map inside one process is still owned and accessed through that process if hidden behind a server. For concurrent shared lookup, ETS may be appropriate.

**Common Pitfalls:** Do not use keyword lists as maps for large data. Do not use one huge process-owned map as a global database without understanding contention.

### Tuples Runtime Cost — fixed-size positional data

Tuples are fixed-size ordered structures. They are common for tagged returns and compact internal data.

| Tuple use                     | Good fit  | Bad fit                |
| ----------------------------- | --------- | ---------------------- |
| `{:ok, value}`                | Excellent | N/A                    |
| Small coordinate/pair         | Good      | If field names matter  |
| OTP callback return           | Excellent | Must match exact shape |
| Large record-like structure   | Weak      | Use record/struct/map  |
| Random access by position     | Possible  | Can be unreadable      |
| Frequent size-changing update | Bad       | Tuples are fixed-size  |

Elixir:

```elixir
{:ok, value}
{:reply, reply, state}
```

Erlang:

```erlang
{ok, Value}
{reply, Reply, State}
```

**Design meaning:** Tuples are ideal when the number and meaning of positions are stable and conventional. Tagged tuples are central to BEAM APIs.

**Common Pitfalls:** Large untagged tuples are hard to maintain. If a tuple has more than a few fields and no strong convention, use a named representation.

### ETS Runtime Model — shared mutable tables outside process heaps

ETS tables live in the VM and are owned by a process, but can be read or written by other processes depending on access mode.

Elixir:

```elixir
table = :ets.new(:cache, [:set, :protected, read_concurrency: true])
:ets.insert(table, {:user, user})
:ets.lookup(table, :user)
```

| ETS property        | Meaning                                                  |
| ------------------- | -------------------------------------------------------- |
| Mutable             | Operations change table contents                         |
| Shared              | Other processes can access depending permissions         |
| Owner process       | Table lifecycle usually tied to owner                    |
| Table type          | `set`, `ordered_set`, `bag`, `duplicate_bag`             |
| Access mode         | `private`, `protected`, `public`                         |
| Named table         | Globally addressable by atom name on node                |
| Anonymous table     | Referenced by table identifier                           |
| Concurrency options | Tune read/write behavior                                 |
| Not durable         | Data disappears with VM/table unless persisted elsewhere |

**Design meaning:** ETS is a deliberate escape from pure process-local state. It is powerful for read-heavy caches, registries, indexes, and shared runtime tables.

**Failure-first explanation:** The tempting wrong model is “ETS is faster state, so use it instead of `GenServer`.” The surprising failure is global mutable data with unclear ownership, race conditions at the application level, and missing cleanup. The correct explanation is that ETS provides shared mutable storage, not domain consistency. The professional rule is: wrap ETS behind an owner module/API and define table lifecycle and access policy. The boundary changes for low-level infrastructure code where direct ETS access is part of the contract.

**Common Pitfalls:** `:public` ETS tables are rarely the best default. They allow any process to write.

### Persistent Term — fast global reads with expensive updates

`:persistent_term` / `persistent_term` stores terms globally for very fast reads, optimized for rarely changing data.

Elixir:

```elixir
:persistent_term.put({MyApp, :config}, config)
:persistent_term.get({MyApp, :config})
```

| Good use                       | Bad use                       |
| ------------------------------ | ----------------------------- |
| Rarely changing global config  | Frequently updated counters   |
| Lookup tables built at startup | Per-request data              |
| Static routing tables          | Mutable application state     |
| Read-heavy constants           | User sessions                 |
| VM-wide reference data         | Anything with frequent writes |

**Design meaning:** Persistent term is a specialized tool. Its update behavior can be expensive because the VM must handle global visibility and memory effects.

**Common Pitfalls:** Do not use persistent term as a convenient global variable store. It is for rare writes and frequent reads.

### Atoms Runtime Model — global atom table and exhaustion risk

Atoms are stored in a VM-wide atom table. They are excellent for known symbolic values and dangerous for unbounded external input.

Good:

```elixir
{:ok, :active}
```

Bad:

```elixir
String.to_atom(user_input)
```

| Atom use                          | Safe? | Reason                  |
| --------------------------------- | ----- | ----------------------- |
| Static status tags                | Yes   | Finite and known        |
| Module names                      | Yes   | Known code atoms        |
| OTP callback tags                 | Yes   | Conventional            |
| Dynamic user names                | No    | Unbounded               |
| JSON keys from arbitrary input    | No    | Unbounded               |
| Dynamic process names from IDs    | No    | Use Registry            |
| External event type after mapping | Yes   | Explicit finite mapping |

**Design meaning:** Atoms are runtime symbols, not ordinary garbage-collected strings. Atom creation is a VM-level resource concern.

**Common Pitfalls:** `String.to_existing_atom/1` is safer than `String.to_atom/1` but still not a full parser. Explicit mapping is usually better.

### Function Values and Closure Cost — captured environment matters

Functions are values. Anonymous functions can capture surrounding values.

Elixir:

```elixir
large_context = build_large_context()

fun =
  fn item ->
    process(item, large_context)
  end
```

The function captures `large_context`.

| Closure issue           | Runtime consequence                                               |
| ----------------------- | ----------------------------------------------------------------- |
| Captures large data     | Data may be retained                                              |
| Sent to another process | Captured environment may be copied/shared according to term rules |
| Long-lived callback     | Captured data remains alive                                       |
| Many closures           | Allocation and readability cost                                   |
| Named function capture  | Often lighter/clearer                                             |
| Capturing process state | Can hide dependencies                                             |

Better if only a small piece is needed:

```elixir
config_id = large_context.config_id

fun =
  fn item ->
    process(item, config_id)
  end
```

**Design meaning:** Closures are convenient, but their captured environment is data. Treat it with the same memory and boundary discipline as other data.

**Common Pitfalls:** A closure stored in a long-lived process state can accidentally retain large data from the creation context.

### Process Dictionary Runtime Cost — hidden state and debugging difficulty

The process dictionary is process-local mutable storage.

Elixir:

```elixir
Process.put(:request_id, request_id)
Process.get(:request_id)
```

Erlang:

```erlang
put(request_id, RequestId),
get(request_id).
```

| Use                     | Risk                       |
| ----------------------- | -------------------------- |
| Logger metadata context | Hidden but conventional    |
| Tracing/debug metadata  | Acceptable with discipline |
| Framework internals     | Common                     |
| Business state          | Hidden dependency          |
| Caching arbitrary data  | Memory retention           |
| Cross-cutting context   | Harder testing/debugging   |

**Design meaning:** The process dictionary bypasses explicit function arguments and process state structures. It is runtime-local but semantically global within a process.

**Common Pitfalls:** If ordinary domain logic reads from the process dictionary, behavior depends on invisible state.

### Links and Monitors Runtime Semantics — failure propagation versus observation

Links and monitors are runtime relationships between processes.

| Mechanism             | Direction                              | On target death                       | Use                          |
| --------------------- | -------------------------------------- | ------------------------------------- | ---------------------------- |
| Link                  | Bidirectional                          | Exit signal propagates unless trapped | Processes share fate         |
| Monitor               | One-way                                | Monitoring process receives `DOWN`    | Observe without sharing fate |
| Trap exits            | Process flag                           | Exit signals become messages          | Special lifecycle handling   |
| Supervisor-child link | Supervisor controls child failure      | Restart/escalate by policy            | OTP supervision              |
| Task link             | Caller and task linked in common usage | Failure can propagate                 | Short-lived coupled work     |

Elixir monitor:

```elixir
ref = Process.monitor(pid)

receive do
  {:DOWN, ^ref, :process, ^pid, reason} ->
    {:down, reason}
end
```

Erlang:

```erlang
Ref = erlang:monitor(process, Pid),
receive
    {'DOWN', Ref, process, Pid, Reason} ->
        {down, Reason}
end.
```

**Design meaning:** Links are about shared failure. Monitors are about observation. Choosing the wrong one changes fault boundaries.

**Common Pitfalls:** Monitoring a process without ever handling the `DOWN` message creates mailbox clutter. Linking to a process without understanding exit propagation can crash the caller.

### Exit Signals — normal, abnormal, trapping, and supervision behavior

An exit signal is not the same as an exception value. It is a process lifecycle signal.

| Exit reason              | Typical meaning                           |
| ------------------------ | ----------------------------------------- |
| `:normal` / `normal`     | Normal termination                        |
| `:shutdown` / `shutdown` | Intentional shutdown                      |
| `{:shutdown, term}`      | Intentional shutdown with detail          |
| other reason             | Abnormal termination                      |
| `:kill`                  | Untrappable kill signal in BEAM semantics |
| exception reason         | Process crashed due to error              |

Elixir:

```elixir
exit(:normal)
exit(:shutdown)
exit(:some_error)
```

Erlang:

```erlang
exit(normal).
exit(shutdown).
exit(some_error).
```

**Design meaning:** OTP supervisors interpret exits according to child restart policy and reason. The same exit reason can be normal or restart-worthy depending on child spec.

**Common Pitfalls:** Trapping exits changes failure behavior. Use it only when the process must transform linked process deaths into messages for lifecycle management.

### GenServer Runtime Cost — serialized callbacks and mailbox backpressure

A `GenServer` is one process. It handles one callback at a time.

| Property             | Runtime consequence                                                 |
| -------------------- | ------------------------------------------------------------------- |
| One process          | One mailbox                                                         |
| Serialized callbacks | State consistency but possible bottleneck                           |
| `call`               | Caller waits for reply                                              |
| `cast`               | Caller does not wait                                                |
| Long callback        | Server cannot process other messages                                |
| Large state          | GC/memory pressure in one process                                   |
| Many clients         | Mailbox can grow                                                    |
| Crash                | Supervisor may restart and state may reset/recover depending design |

Bad slow callback:

```elixir
@impl true
def handle_call(:refresh, _from, state) do
  new_state = slow_external_fetch()
  {:reply, :ok, new_state}
end
```

Better options:

```text
offload slow work to Task
split external client process
use reply-later pattern
cache stale data and refresh asynchronously
shard state across processes
use ETS for read-heavy state
```

**Design meaning:** `GenServer` gives a safe serialized state owner. It does not give infinite throughput.

**Common Pitfalls:** A `GenServer` often becomes the accidental bottleneck because all calls go through one process.

### Task Runtime Semantics — links, monitors, and result ownership

Elixir `Task` wraps a process used for concurrent work.

```elixir
task = Task.async(fn -> expensive_work() end)
Task.await(task, 5_000)
```

| Task concern      | Runtime implication                       |
| ----------------- | ----------------------------------------- |
| Task is a process | Has PID, heap, mailbox, exit reason       |
| `Task.async`      | Commonly linked to caller                 |
| `Task.await`      | Caller waits; may exit on failure/timeout |
| `Task.yield`      | Polls for result with timeout             |
| `Task.shutdown`   | Attempts to stop task                     |
| `Task.Supervisor` | Moves lifecycle under supervisor          |
| Many tasks        | Can overload schedulers/external services |

**Design meaning:** A task is not just a promise. It is a BEAM process with failure semantics.

**Common Pitfalls:** Starting many tasks for external HTTP/database work can overload the external system even if the BEAM VM is fine. Concurrency needs limits.

### Agent Runtime Semantics — simple process state with caller-supplied functions

An `Agent` is a process that stores state and applies caller-supplied functions to get or update it.

```elixir
{:ok, pid} = Agent.start_link(fn -> %{} end)

Agent.update(pid, fn state ->
  Map.put(state, :x, 1)
end)

Agent.get(pid, fn state ->
  Map.fetch(state, :x)
end)
```

| Agent property            | Runtime implication                      |
| ------------------------- | ---------------------------------------- |
| One process               | Serialized state access                  |
| Caller-supplied functions | State logic may be spread across callers |
| Simple API                | Good for small state                     |
| No rich protocol          | Weak for domain behavior                 |
| Long functions            | Block agent                              |
| Large state               | Same process bottleneck/GC issues        |

**Design meaning:** Agent is convenient for simple state but weak for enforcing invariants if arbitrary callers update state with arbitrary functions.

**Common Pitfalls:** If state transitions have domain rules, use a module API or `GenServer`, not arbitrary external update functions.
